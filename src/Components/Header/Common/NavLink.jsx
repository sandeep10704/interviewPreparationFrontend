import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, children, className = '' }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link 
      to={to}
      className={`relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full hover:text-text-main ${
        isActive ? 'text-text-main bg-white/10 shadow-sm' : 'text-text-subtle'
      } ${className}`}
    >
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-main rounded-full blur-[1px]"></span>
      )}
      {children}
    </Link>
  );
};

export default NavLink;
