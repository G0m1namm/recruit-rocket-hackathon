from os import listdir,getcwd, remove
from os.path import isfile, join, exists
from dotenv import load_dotenv

from entities import UserPrompt

import aiofiles
from PyPDF2 import PdfReader, PdfMerger

from fastapi import UploadFile, HTTPException, File
from typing import List

from langchain.callbacks import get_openai_callback
from langchain.chains.question_answering import load_qa_chain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter

load_dotenv()
PATH = getcwd()
MASTER_FILE_NAME = "master.pdf"
MASTER_NAME = "master"

async def uploafPdfs(files: List[UploadFile] = File(...)) -> dict:
    
    for file in files:
        try:
            contents = await file.read()
            async with aiofiles.open(file.filename, 'wb') as f:
                await f.write(contents)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"There was an error saving the file {[file.filename]}, error:{str(e)}"
            )
        finally:
            await file.close()

    return {"message": f"Successfuly uploaded {[file.filename for file in files]}"}


def masterCreator() -> str | HTTPException:
    files = getAllPdfsNames()

    merger = PdfMerger()
    try: 
        for file in files:
            pdfFileObj = open(file,'rb')               
            pdfReader = PdfReader(pdfFileObj) 
            merger.append(pdfReader)

        merger.write(MASTER_FILE_NAME)
        merger.close()
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"There was an error concatenating the files to create {MASTER_NAME}, error:{str(e)}"
        )
    
    finally:
        merger.close()

    return "The PDF master has been created correctly"
    

def queryPrompt(userPrompt: UserPrompt) -> str | HTTPException:
    pdf = "".join(join(PATH,f) for f in listdir(PATH) if isfile(join(PATH, f)) and join(PATH, f).endswith('.pdf') and MASTER_NAME in f)

    if pdf is not None:
        pdf_reader = PdfReader(pdf)
        
        # Text variable will store the pdf text
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()

        # Create the knowledge base object
        knowledgeBase = process_text(text)

        try:
            if userPrompt.mainPrompt:

                finalPrompt = createFinalPrompt(userPrompt)

                docs = knowledgeBase.similarity_search(finalPrompt)

                llm = OpenAI()
                chain = load_qa_chain(llm, chain_type='stuff')
                
                with get_openai_callback() as cost:
                    response = chain.run(input_documents=docs, question=finalPrompt)
                    print(cost)
                    
                return(response)
            
            else:
                raise HTTPException (status_code=404, detail="The query can't be empty string")
            
        except Exception as e:
            raise HTTPException (status_code=503, detail=f"Is possible that the OpenIa quaota has been reached, please use a new token or wait for the time restriction. Error: {e}")
        
    else:
        raise HTTPException (status_code=404, detail="There is no master.pdf file to load")
    

def createFinalPrompt(userPrompt:UserPrompt) -> str:
    if userPrompt.filters is None:
        finalPrompt = userPrompt.mainPrompt

    else:
        finalPrompt =  f"{userPrompt.mainPrompt}. Only use the information from people that have these skills: " + ",".join(userPrompt.filters)
    
    return finalPrompt
                


def getAllPdfsNames() -> List[str]:
    return [f for f in listdir(PATH) if isfile(join(PATH, f)) and join(PATH, f).endswith('.pdf') and MASTER_NAME not in f]


def process_text(text) -> FAISS:
    # Split the text into chunks using Langchain's CharacterTextSplitter
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    
    # Convert the chunks of text into embeddings to form a knowledge base
    embeddings = OpenAIEmbeddings()
    knowledgeBase = FAISS.from_texts(chunks, embeddings)
    
    return knowledgeBase

def masterExists() -> bool:
    return exists(join(PATH,MASTER_FILE_NAME))

def resetMaster() -> str | HTTPException:
    
    if masterExists():
        try:
            remove(join(PATH,MASTER_FILE_NAME))
            return masterCreator()
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"There was a problem deleting the master PDF. Error: {e}")
    
    else:
        raise HTTPException(status_code=404, detail=f"There was no master PDF")


def deletePdf(pdfName: str) -> str | HTTPException:
    if pdfName in getAllPdfsNames():
        try:
            remove(join(PATH,pdfName))
            return f"The PDF file {pdfName=} was deleted"
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"There was an error tryng to delete the PDF. Error: {e}")
        
    else:
        raise HTTPException(status_code=404, detail=f"There was no PDF found with the name {pdfName=}")