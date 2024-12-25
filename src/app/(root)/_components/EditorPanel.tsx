"use client"
import { Editor } from '@monaco-editor/react';
import axios from 'axios';

import React, { useState } from 'react'

const EditorPanel = () => {
  const [code,setCode] = useState<string>("// Write your code here!")
  const [language,setLanguage] = useState<string>("javascript")
  const [output,setOutput] = useState<string>("Still Nothing!")

  const handleCodeChange = (value?:string)=>{
    setCode(value || "")
  }

  const runCode = async ()=>{
    try {
      const response = await axios.post("/api/piston",{
        language,
        source: code
      })

      setOutput(response.data)
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
    <div>EditorPanel</div>
    <Editor height="60vh" theme='vs-dark' defaultLanguage="javascript" defaultValue="// some comment" value={code} onChange={handleCodeChange}/>
    <button onClick={runCode}>Run Code</button>
    {output}
    </>

  )
}

export default EditorPanel