import React from 'react';
import Editor from '@monaco-editor/react';
import { Button, Typography } from '../../../../Common';
import { PlayIcon, SendIcon, RotateIcon, SettingsIcon } from './Icons';
import EditorHeader from './EditorHeader';
import EditorFooter from './EditorFooter';

const CodeEditor = ({ code, setCode, language, setLanguage, onSubmit, onRun }) => {
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
      'editor.background': '#030E17',
      'editor.foreground': '#F8F8F2',
      'editor.lineHighlightBackground': '#0F1B26',
      'editor.selectionBackground': '#44475a55',
      'editorLineNumber.foreground': '#4B5563',
      'editorLineNumber.activeForeground': '#26D0CE',
      'editorIndentGuide.background': '#192530',
      'editorIndentGuide.activeBackground': '#26D0CE55',
    }
  };

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('midnight-ai', themeConfig);

    // Registering custom completion suggestions to demonstrate control
    languages.forEach(lang => {
       monaco.languages.registerCompletionItemProvider(lang === 'cpp' ? 'cpp' : lang, {
        provideCompletionItems: (model, position) => {
          const suggestions = [
            {
              label: 'interview_hint',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '// Hint: Consider using a sliding window approach for O(n) performance.',
              documentation: 'Standard optimization for subarray problems.',
              range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: position.column - 1,
                endColumn: position.column
              }
            },
            {
              label: 'optimize_space',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'hash_map',
              documentation: 'Using a hash map can optimize search time to O(1).',
               range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: position.column - 1,
                endColumn: position.column
              }
            }
          ];
          return { suggestions: suggestions };
        }
      });
    });
  };

  const editorOptions = {
    fontSize: 13,
    minimap: { enabled: false },
    padding: { top: 15 },
    scrollBeyondLastLine: false,
    cursorSmoothCaretAnimation: "on",
    smoothScrolling: true,
    fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
    fontLigatures: true,
    bracketPairColorization: { enabled: true },
    // IntelliSense & Autocomplete stability settings
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "on",
    tabCompletion: "on",
    wordBasedSuggestions: true,
    parameterHints: {
      enabled: true
    },
    formatOnType: true,
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    folding: true,
    lineNumbersMinChars: 3
  };

  return (
    <div className="flex flex-col h-full bg-[#030E17]">
      <EditorHeader 
        language={language} 
        setLanguage={setLanguage} 
        languages={languages} 
      />

      {/* Actual Editor */}
      <div className="flex-1 overflow-hidden relative group">
        <Editor
          height="100%"
          language={language === 'cpp' ? 'cpp' : language}
          value={code}
          theme="midnight-ai"
          beforeMount={handleEditorWillMount}
          onChange={(value) => setCode(value)}
          loading={<div className="flex items-center justify-center h-full text-text-subtle font-mono text-xs animate-pulse italic">Initializing IntelliSense...</div>}
          options={editorOptions}
        />
      </div>

      <EditorFooter 
        onRun={onRun} 
        onSubmit={onSubmit} 
      />
    </div>
  );
};

export default CodeEditor;
