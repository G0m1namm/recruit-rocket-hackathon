from methods import uploafPdfs, masterCreator, queryPrompt, getAllPdfsNames, resetMaster,deletePdf

from entities import UserPrompt, AiResponse
from typing import List
from fastapi import FastAPI, UploadFile, File


app = FastAPI(
    title="Recruit Rocket",
    description="Power up your **recruitment power**",
    version="0.0.1",
)


@app.get("/")
def index() -> str:
    """Hello world

    Returns:
        str: Hello world
    """
    return "Hola Mundo"


@app.post("/ask/prompt")
def getPromptResponse(prompt: UserPrompt) -> AiResponse:
    """Get the ai response based on the prompt provided by the user

    Args:
        prompt (UserPrompt): promt information

    Returns:
        AiResponse: Formatted response from the AI
    """
    contentResponse = queryPrompt(prompt)
    return AiResponse(role="ai", content=contentResponse)


@app.post("/dummie")
def postDummie():
    """Im a dummy endpoint

    Returns:
        Dict: A dummy response with trash information
    """
    return [{"role":"ai", "content":"Hola bb"}]


@app.get("/generate/master")
def generateMasterPdf():
    """Generate the master PDF with the information of all the
    other CV's. This is the file used to create the embeds for the
    model.

    Returns:
        (str | HTTPException): String with the status of the execution.
    """
    return masterCreator()


@app.post("/upload/pdfs")
async def upload(files: List[UploadFile] = File(...)):
    """Method to upload the PDF files

    Args:
        files (List[UploadFile], optional): PDFs containing the CV information. Defaults to File(...).

    Returns:
        (str | HTTPException): String with the status of the execution.
    """
    return await uploafPdfs(files)


@app.get("/list/pdfs")
def getPdfsList():
    """Return a list with the name of the CV's already loaded

    Returns:
        List[str]: array of string with the PDF names
    """
    return getAllPdfsNames()


@app.get("/reset/master")
def resetMasterCall():
    return resetMaster()


@app.delete("/delete/pdf")
def deletePdfCall(pdfName: str):
    return deletePdf(pdfName)