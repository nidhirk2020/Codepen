import logo from './logo.svg';
import './App.css';
import Editor from './Editor'
import React,{useState , useEffect}  from "react";
import useLocalStorage from './hooks/useLocalStorage';
function App() {
  // to set html in first editor
  const [html , setHtml] = useLocalStorage('html','')
   const [css , setCss] = useLocalStorage('css','')
   const [js , setJs] = useLocalStorage('js','')
   const [srcDoc,setSrcDoc]=useLocalStorage('')
    // to avoid running code continously so as the browser doent slows down

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)
//if we make changes after the timeout so it will cancel the timeout and start again
    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;