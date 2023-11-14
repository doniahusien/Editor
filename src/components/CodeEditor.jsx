import React, { useState, useRef, useEffect } from 'react';
import './CodeEditor.css';

const CodeEditor = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [livePreview, setLivePreview] = useState('');

  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const jsRef = useRef(null);
  const previewRef = useRef(null);

  const handleCodeChange = (language, code) => {
    switch (language) {
      case 'html':
        setHtmlCode(code);
        break;
      case 'css':
        setCssCode(code);
        break;
      case 'js':
        setJsCode(code);
        break;
      default:
        break;
    }
  }
  
    useEffect(() => {
      const newPreview = `
        <html>
          <head>
            <style>
              body {
                color: white;
              }
              ${cssCode}
            </style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
        </html>
      `;
      setLivePreview(newPreview);
    }, [htmlCode, cssCode, jsCode]);

    const handleMouseDown = (e, language, resizeRef) => {
      const startX = e.clientX;
      const startWidth = resizeRef.current.clientWidth;
    
      const handleMouseMove = (e) => {
        const newWidth = startWidth + (e.clientX - startX);
        resizeRef.current.style.width = `${newWidth}px`;
   
        const remainingWidth = document.body.clientWidth - newWidth;
        document.querySelector('.output').style.width = `${remainingWidth}px`;
      };    
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleMouseMove);
      });
    };

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.srcdoc = livePreview;
    }
  }, [livePreview]);

  return (
    <div className="code-editor">
      <div className="editor" ref={htmlRef}>
        <h2>HTML:</h2>
        <textarea
          value={htmlCode}
          onChange={(e) => handleCodeChange('html', e.target.value)}
          placeholder="// Write your HTML code here"
        />
        <div
          className="resize-handle"
          onMouseDown={(e) => handleMouseDown(e, 'html', htmlRef)}
        />
      </div>
      <div className="editor" ref={cssRef}>
        <h2>CSS:</h2>
        <textarea
          value={cssCode}
          onChange={(e) => handleCodeChange('css', e.target.value)}
          placeholder="// Write your CSS code here"
        />
        <div
          className="resize-handle"
          onMouseDown={(e) => handleMouseDown(e, 'css', cssRef)}
        />
      </div>
      <div className="editor" ref={jsRef}>
        <h2>JavaScript:</h2>
        <textarea
          value={jsCode}
          onChange={(e) => handleCodeChange('js', e.target.value)}
          placeholder="// Write your JavaScript code here"
        />
        <div
          className="resize-handle"
          onMouseDown={(e) => handleMouseDown(e, 'js', jsRef)}
        />
      </div>
      <div className="output">
        <h2>Preview:</h2>
        <iframe
          ref={previewRef}
          title="output"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
