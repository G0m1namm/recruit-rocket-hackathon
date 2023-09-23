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
       <Label htmlFor="cv">CV File</Label>
       <Input id="cv" type="file" name="file" 
        onChange={(e) => setFile(e.target.files?.[0])}
        accept=".pdf"
        ref={fileInputRef}
        className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
     
      <Button type="submit"  variant="outline" value="Upload">Upload</Button>
    </form>
  </main>
}