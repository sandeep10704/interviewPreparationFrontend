import React, { useEffect } from 'react';
import Typography from './Typography';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, maxWidth = '500px' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        className="relative w-full bg-card border border-border-main rounded-3xl shadow-2xl overflow-hidden animate-slide-up"
        style={{ maxWidth }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-main flex items-center justify-between bg-white/[0.02]">
          <Typography variant="h3" className="!mb-0">
            {title}
          </Typography>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors group"
          >
            <svg 
              className="w-5 h-5 text-text-subtle group-hover:text-text-main" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
