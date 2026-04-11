import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:translate-y-[-2px]';
  
  const variants = {
    primary: 'bg-accent-main text-black hover:bg-opacity-95 shadow-sm hover:shadow-[0_8px_20px_-8px_rgba(50,208,200,0.5)]',
    secondary: 'bg-accent-bg text-accent-main border border-accent-border hover:bg-accent-main hover:text-black shadow-sm',
    outline: 'border border-border-main text-text-main hover:border-accent-main hover:text-accent-main hover:bg-accent-main/5',
    ghost: 'text-text-subtle hover:text-text-main hover:bg-white/5',
    danger: 'bg-error text-white hover:bg-opacity-90 hover:shadow-[0_8px_20px_-8px_rgba(239,68,68,0.5)]',
    google: 'bg-google-bg text-gray-800 hover:bg-google-hover border border-gray-200 shadow-sm',
  };


  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
