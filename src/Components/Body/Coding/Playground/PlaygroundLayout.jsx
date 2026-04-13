import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaygroundNavbar from './Components/PlaygroundNavbar';
import EditorSection from './Components/EditorSection';
import IOSection from './Components/IOSection';
import { runPlayground, clearPlayground } from '../../../../store/playgroundSlice';

const PlaygroundLayout = () => {
  const dispatch = useDispatch();
  const { loading, result, error } = useSelector((state) => state.playground);

  const [code, setCode] = useState("def main():\n    print(\"Hello World\")\n\nif __name__ == \"__main__\":\n    main()");
  const [language, setLanguage] = useState('python');
  const [stdin, setStdin] = useState("");

  // Resizing logic (Vertical now)
  const [editorHeight, setEditorHeight] = useState(65); // Initial 65% height
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const onResize = useCallback((e) => {
    if (!isResizing || !containerRef.current) return;
    
    const containerHeight = containerRef.current.offsetHeight;
    const offsetTop = containerRef.current.getBoundingClientRect().top;
    const mousePos = e.clientY - offsetTop;
    const newHeight = (mousePos / containerHeight) * 100;
    
    // Limits
    if (newHeight > 20 && newHeight < 80) {
      setEditorHeight(newHeight);
    }
  }, [isResizing]);

  useEffect(() => {
    const handleGlobalMouseUp = () => stopResizing();
    const handleGlobalMouseMove = (e) => onResize(e);

    if (isResizing) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    } else {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isResizing, onResize, stopResizing]);

  const handleRun = () => {
    dispatch(runPlayground({ code, language, stdin }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-background overflow-hidden">
      <PlaygroundNavbar onRun={handleRun} loading={loading} />

      <div ref={containerRef} className="flex-1 flex flex-col overflow-hidden relative select-none">
        {/* Interaction Shield (Prevents Monaco from hijacking resize) */}
        {isResizing && (
          <div className="absolute inset-0 z-[100] cursor-row-resize bg-transparent" />
        )}

        {/* Editor Section (TOP) */}
        <div 
          className="shrink-0 min-h-0 w-full relative" 
          style={{ height: `${editorHeight}%` }}
        >
          <EditorSection 
            code={code} 
            setCode={setCode} 
            language={language} 
            setLanguage={setLanguage} 
          />
        </div>

        {/* Vertical Resizer Handle */}
        <div 
          className="h-1.5 w-full cursor-row-resize z-[110] group flex items-center justify-center bg-[#01080E] border-y border-border-main/10 relative"
          onMouseDown={startResizing}
        >
          <div className="w-full h-[1px] bg-transparent group-hover:bg-accent-main/40 transition-colors"></div>
          <div className="absolute h-1 w-16 rounded-full bg-border-main/20 group-hover:bg-accent-main group-hover:w-24 transition-all shadow-sm"></div>
        </div>

        {/* I/O Section (BOTTOM) */}
        <div className="flex-1 min-h-0 w-full bg-[#01080E]">
          <IOSection 
            stdin={stdin} 
            setStdin={setStdin} 
            result={result || (error ? { stderr: error } : null)} 
            loading={loading} 
            onRun={handleRun} 
          />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundLayout;
