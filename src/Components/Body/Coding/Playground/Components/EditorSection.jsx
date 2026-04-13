import React from 'react';
import Editor from '@monaco-editor/react';
import { Typography } from '../../../../Common';

const EditorSection = ({ code, setCode, language, setLanguage }) => {
  const languages = ['python', 'javascript', 'java', 'cpp'];

  const themeConfig = {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff79c6' },
      { token: 'number', foreground: 'bd93f9' },
      { token: 'string', foreground: 'f1fa8c' },
    ],
    colors: {
      'editor.background': '#03101B',
      'editor.foreground': '#F8F8F2',
      'editor.lineHighlightBackground': '#0F1B26',
      'editor.selectionBackground': '#44475a55',
      'editorLineNumber.foreground': '#4B5563',
      'editorLineNumber.activeForeground': '#26D0CE',
    }
  };

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('midnight-ai', themeConfig);
  };

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    padding: { top: 20 },
    scrollBeyondLastLine: false,
    cursorSmoothCaretAnimation: "on",
    smoothScrolling: true,
    fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
    bracketPairColorization: { enabled: true },
    formatOnType: true,
    autoClosingBrackets: "always",
  };

  return (
    <div className="flex flex-col h-full bg-[#03101B]">
      {/* Local Header */}
      <div className="h-12 border-b border-border-main/10 flex items-center justify-between px-4 bg-[#01080E]/40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Typography className="text-[10px] font-black tracking-widest text-text-subtle uppercase">Language</Typography>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] font-bold text-accent-main outline-none focus:border-accent-main/50 transition-all cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang} value={lang} className="bg-[#01080E] text-text-main">{lang.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <Editor
          height="100%"
          language={language === 'cpp' ? 'cpp' : language}
          value={code}
          theme="midnight-ai"
          beforeMount={handleEditorWillMount}
          onChange={(value) => setCode(value || "")}
          options={editorOptions}
          loading={<div className="flex items-center justify-center h-full text-text-subtle text-xs animate-pulse italic">Loading Editor Experience...</div>}
        />
      </div>
    </div>
  );
};

export default EditorSection;
