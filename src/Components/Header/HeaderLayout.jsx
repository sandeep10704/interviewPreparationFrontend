import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '../Common';
import NavLink from './Common/NavLink';
import { logout } from '../../store/authSlice';

const HeaderLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'HR Prep', path: '/hr' },
    { name: 'Technical', path: '/technical' },
    { name: 'Coding', path: '/coding' },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

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
        <div className="flex items-center gap-3 lg:gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-3 group">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-xs font-bold text-text-main group-hover:text-accent-main transition-colors">
                    {user?.displayName || 'My Profile'}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 p-0.5 group-hover:border-accent-main transition-all">
                  <img 
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=192530&color=26D0CE`} 
                    className="w-full h-full rounded-[10px] object-cover" 
                    alt="avatar" 
                  />
                </div>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="!text-[10px] !rounded-lg border-white/10 hover:border-error hover:text-error transition-all"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="hidden sm:block text-xs font-bold text-text-subtle hover:text-accent-main transition-colors tracking-widest uppercase">
                Login
              </Link>
              <Link to="/signup">
                <Button size="sm" className="!rounded-lg px-6 shadow-[0_8px_20px_-8px_rgba(50,208,200,0.5)] !font-bold !text-[10px] uppercase tracking-widest">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;