'use client';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { useState, useRef } from 'react'

export default function Page() {
  const [file, setFile] = useState<File>()
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the file input

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())

      // Clear the file input by resetting the form
     if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset the file input value to clear it
      }

      toast.success('File ' + file?.name + ' was uploaded successfully')
      setFile(undefined)
    } catch (e: any) {
      // Handle errors here
      toast.error('The file couldn\'t be uploaded')
      console.error(e)
    }
  }
    
  return <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <form onSubmit={onSubmit}>
     <section className="hero-section container relative">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="from-primary h-56 bg-gradient-to-br to-purple-400 blur-[106px] dark:from-blue-700"></div>
          <div className="h-32 bg-gradient-to-r from-cyan-400 to-sky-300 blur-[106px] dark:to-indigo-600"></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-6">
          <div className="relative ml-auto pt-10">
            <div className="mx-auto text-center lg:w-2/3">
              <h1 className="flex flex-col justify-center text-3xl font-bold text-gray-900 dark:text-white md:text-5xl xl:text-6xl">
                Let's start your hiring process{' '}
               
              </h1>
              

              <h2  className="flex flex-col justify-center text-3xl font-bold text-gray-700 dark:text-white mt-8">
                

              How to Use the Portal:
              </h2>
              <p className="mt-8 text-gray-700 dark:text-gray-300">
              <ol className="list-none">
                <li className="mb-7">
                  Click the "Choose File" button to upload the candidate's CV in PDF format.
                </li>
                <li>
                  Click the "Upload" button to update candidate's CV.
                </li>
              </ol>

              </p>
              <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-4">
               
              </div>
            </div>
            <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6"></div>
          </div>
        </div>
      </section>
      <section className="w-300">
     <div className="justify-center flex flex-wrap justify-center gap-x-6 gap-y-4">

       <Label htmlFor="cv" className="mt-15">CV File</Label>
       <Input id="cv" type="file" name="file" 
        onChange={(e) => setFile(e.target.files?.[0])}
        accept=".pdf"
        ref={fileInputRef}
        className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-250 content-center" />
      
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-4">
        <Button type="submit"  variant="outline" value="Upload" 
        
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Upload</Button>
        </div>
      </section>
    </form>
  </main>
}