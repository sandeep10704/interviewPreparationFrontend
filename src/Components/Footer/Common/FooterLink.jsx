import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink = ({ to, children, href }) => {
  const baseClasses = "text-text-subtle hover:text-accent-main transition-colors text-sm";
  
  if (href) {
    return (
      <li>
        <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    </li>
  );
};

export default FooterLink;
