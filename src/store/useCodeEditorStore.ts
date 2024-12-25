// import { Monaco } from "@monaco-editor/react"
// import {create} from "zustand"
// import { LANGUAGE_CONFIG } from "@/app/(root)/_constants"
// import {CodeEditorState} from "./../types/index"


// const getInitialState = ()=>{
// // Check if we're on browser or server. if server, then return these default valie. *windoe===undefined means we are in the server
//     if(typeof window==="undefined"){
//         return{
//             language:"javascript",
//             fontSize: 16,
//             theme:"vs-dark",
//         }
//     }

//     const savedLanguage = localStorage.getItem("editor-language") || "javascript"
//     const savedTheme = localStorage.getItem("editor-theme") || "vs-dark"
//     const savedFontSize = localStorage.getItem("editor-font-size") || 16

//     return{
//         language: savedLanguage,
//         theme: savedTheme,
//         fontSize: Number(savedFontSize)
//     }

// }

//  export const useCodeEditorStore = create<CodeEditorState>((set,get)=>{
//     const initialState = getInitialState();

//     return {
//         ...initialState,
//         output:"",
//         isRunning:false,
//         error:null,
//         editor:null,
//         executionResult:null,

//         getCode: ()=> get().editor?.getValue() || ""
//     }
//  })