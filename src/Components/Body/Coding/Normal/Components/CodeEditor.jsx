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

  // Helper to register IntelliSense once
  const registerIntellisense = (monaco) => {
    if (window.__monaco_intellisense_registered) return;
    window.__monaco_intellisense_registered = true;

    languages.forEach(lang => {
      const monacoLang = lang === 'cpp' ? 'cpp' : lang;
      
      monaco.languages.registerCompletionItemProvider(monacoLang, {
        provideCompletionItems: (model, position) => {
          const suggestions = [
            {
              label: 'interview_hint',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '// Hint: Consider using a ${1:sliding window} approach for ${2:O(n)} performance.',
              insertTextRules: monaco.languages.CompletionItemProviderProperty.InsertAsSnippet,
              documentation: 'Standard optimization for subarray problems.',
              detail: 'InterviewAI Snippet',
              range: null 
            },
            {
              label: 'binary_search',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                'left, right = 0, len(${1:arr}) - 1',
                'while left <= right:',
                '    mid = (left + right) // 2',
                '    if ${1:arr}[mid] == ${2:target}:',
                '        return mid',
                '    elif ${1:arr}[mid] < ${2:target}:',
                '        left = mid + 1',
                '    else:',
                '        right = mid - 1'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemProviderProperty.InsertAsSnippet,
              documentation: 'Classic Binary Search implementation.',
              detail: 'InterviewAI Snippet',
              range: null
            },
            {
              label: 'optimize_space',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'hash_map',
              documentation: 'Using a hash map can optimize search time to O(1).',
              detail: 'Optimization Suggestion',
              range: null
            }
          ];
          return { suggestions: suggestions };
        }
      });
    });
  };

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('midnight-ai', themeConfig);
    registerIntellisense(monaco);
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
