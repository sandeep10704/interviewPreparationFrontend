import React from 'react';

const Typography = ({ 
  variant = 'body', 
  children, 
  className = '', 
  as,
  ...props 
}) => {
  const variants = {
    h1: 'text-5xl lg:text-6xl font-semibold text-text-heading tracking-tight leading-tight',
    h2: 'text-3xl lg:text-4xl font-semibold text-text-heading tracking-tight',
    h3: 'text-xl lg:text-2xl font-semibold text-text-heading',
    body: 'text-base lg:text-lg text-text-main leading-relaxed',
    bodySmall: 'text-sm text-text-subtle',
    label: 'text-sm font-medium text-text-subtle uppercase tracking-wider',
    error: 'text-sm text-error',
  };

  const Component = as || (
    variant.startsWith('h') ? variant : 
    variant === 'label' ? 'span' : 'p'
  );

  return (
    <Component 
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
