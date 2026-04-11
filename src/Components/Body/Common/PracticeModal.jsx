import React from 'react';
import { Button, Typography, Card } from '../../Common';

const PracticeModal = ({ isOpen, onClose, title, subtitle, modes = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose}></div>
      
      <Card className="relative z-10 w-full max-w-md shadow-2xl p-8 space-y-8 animate-fade-in border-accent-main/20">
        <div className="text-center space-y-2">
          <Typography variant="h3">{title || 'Select Practice Mode'}</Typography>
          <Typography variant="bodySmall">{subtitle || 'Choose how you want to take this interview.'}</Typography>
        </div>

        <div className="grid grid-cols-1 gap-4 text-left">
          {modes.map((mode, index) => (
            <Button 
              key={index}
              onClick={mode.onClick} 
              variant={mode.variant || 'primary'} 
              className={`justify-start gap-4 h-16 !rounded-xl ${mode.variant === 'primary' ? '' : 'border-border-main/50'}`}
            >
              <div className="w-10 h-10 rounded-lg bg-black/10 flex items-center justify-center text-xl">
                {mode.icon}
              </div>
              {mode.name}
            </Button>
          ))}
        </div>

        <Button variant="ghost" fullWidth onClick={onClose} className="text-text-subtle">
          Cancel
        </Button>
      </Card>
    </div>
  );
};

export default PracticeModal;
