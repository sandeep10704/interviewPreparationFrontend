import React from 'react';
import { RotateIcon, SettingsIcon } from './Icons';

const EditorHeader = ({ language, setLanguage, languages }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border-main/50 bg-[#01080E]/50">
      <div className="flex items-center gap-4">
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-background border border-border-main/50 text-text-main text-[10px] font-bold font-mono px-2 py-1 rounded outline-none focus:border-accent-main/50 transition-colors uppercase tracking-widest cursor-pointer hover:border-accent-main/30"
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang === 'cpp' ? 'C++' : lang.toUpperCase()}</option>
          ))}
        </select>
        <div className="flex items-center gap-2 group cursor-pointer text-text-subtle hover:text-text-main transition-colors">
          <RotateIcon />
          <span className="text-[9px] font-bold uppercase tracking-widest">Reset</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-1.5 text-text-subtle hover:text-text-main hover:bg-white/5 rounded transition-all active:scale-95">
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
