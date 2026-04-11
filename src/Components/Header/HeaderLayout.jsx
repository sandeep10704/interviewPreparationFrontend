import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typography, Button } from '../Common';
import NavLink from './Common/NavLink';

const HeaderLayout = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'HR Prep', path: '/hr' },
    { name: 'Technical', path: '/technical' },
    { name: 'Coding', path: '/coding' },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-border-main/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-accent-main flex items-center justify-center text-black font-black text-xl group-hover:rotate-6 transition-all duration-300 shadow-[0_0_20px_rgba(50,208,200,0.3)]">
            A
          </div>
          <Typography variant="h3" className="hidden lg:block !text-2xl font-black tracking-tighter">
            Interview<span className="text-accent-main">AI</span>
          </Typography>
        </Link>

        {/* Navigation Links - Centered */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1.5 rounded-full backdrop-blur-xl shadow-inner">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link to="/login" className="hidden sm:block text-sm font-bold text-text-subtle hover:text-accent-main transition-colors tracking-wide">
            Log in
          </Link>
          <Link to="/signup">
            <Button size="md" className="!rounded-full px-7 shadow-[0_8px_20px_-8px_rgba(50,208,200,0.5)] !font-bold">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;