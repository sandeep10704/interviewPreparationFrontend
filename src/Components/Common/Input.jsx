import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '', 
  containerClassName = '',
  leftIcon,
  rightIcon,
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 text-left ${containerClassName}`}>
      {label && (
        <label className="text-sm font-medium text-text-subtle ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle group-focus-within:text-accent-main transition-colors">
            {leftIcon}
          </div>
        )}
        
        <input
          className={`
            w-full bg-input-bg border border-border-main rounded-lg px-4 py-2.5 
            text-text-main placeholder:text-text-subtle/50
            focus:border-accent-main focus:ring-1 focus:ring-accent-main/20 outline-none
            transition-all duration-200
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error ? 'border-error focus:border-error focus:ring-error/10' : ''}
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle group-focus-within:text-accent-main transition-colors">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs text-error ml-1 mt-0.5 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
