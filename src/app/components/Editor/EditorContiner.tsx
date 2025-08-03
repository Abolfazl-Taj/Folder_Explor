"use client"
import { Editor } from "@monaco-editor/react"
import { useState } from "react"

const EditorContiner = ({ defaultValue = "", language = "javascript", ref }: {
  defaultValue?: any
  language?: any
  ref?: any
}) => {
  const [themeSet, setThemeSet] = useState(false)

  const handleEditorWillMount = (monaco: any) => {
    if (themeSet) return

    monaco.editor.defineTheme("apollo-glass", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "", foreground: "ffffff" }, // default text
        { token: "delimiter.bracket", foreground: "9f0712" }, // [], (), {}
        { token: "delimiter.array", foreground: "9f0712" },   // for arrays
        { token: "delimiter", foreground: "9f0712" },         // fallback
        { token: "keyword.operator", foreground: "9f0712" },  // =, =>
        { token: "keyword", foreground: "999999" },
        { token: "string", foreground: "f1fa8c" },
        { token: "number", foreground: "bd93f9" },
        { token: "comment", foreground: "666666" },
      ],
      colors: {
        "editor.background": "#11111100", // transparent glass
        "editorLineNumber.foreground": "#460809",
        "editorLineNumber.activeForeground": "#9f0712",
        "editorCursor.foreground": "#ff5555",
        "editorIndentGuide.background": "#fff",
        "editorIndentGuide.activeBackground": "#fff",
      },
    })

    setThemeSet(true)
  }
  const mountHandler = (editor: any) => {
    ref.current = editor
  }
  return (
    <Editor
    key={language}
      height="50vh"
      theme="apollo-glass"
      defaultLanguage={language}
      defaultValue={defaultValue}
      onMount={mountHandler}
      beforeMount={handleEditorWillMount}
      options={{
        fontSize: 14,
        fontFamily: "Fira Code, monospace",
        minimap: { enabled: false },
        wordWrap: "on",
        lineNumbers: "on",
        renderLineHighlight: "line",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        cursorSmoothCaretAnimation: "on",
        cursorBlinking: "phase",
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  )
}

export default EditorContiner
