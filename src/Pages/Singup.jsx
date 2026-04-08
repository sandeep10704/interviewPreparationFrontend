import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { palette } from '../theme/palette';

const Singup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle signup logic here
      console.log('Signup data:', formData);
      // You can add API call here
    }
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log('Google signup clicked');
    // You can add Google OAuth logic here
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: palette.background,
      padding: '20px'
    }}>
      <div style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: palette.shadow,
        textAlign: 'left'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            color: palette.textHeading,
            fontSize: '28px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            fontFamily: 'var(--heading)'
          }}>
            Create Account
          </h1>
          <p style={{
            color: palette.text,
            margin: '0',
            fontSize: '16px'
          }}>
            Join our interview preparation platform
          </p>
        </div>

        <button
          onClick={handleGoogleSignup}
          style={{
            width: '100%',
            padding: '14px',
            background: palette.googleBg,
            color: '#333',
            border: `1px solid ${palette.border}`,
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
          onMouseOver={(e) => {
            e.target.style.background = palette.googleHover;
            e.target.style.borderColor = palette.borderSecondary;
          }}
          onMouseOut={(e) => {
            e.target.style.background = palette.googleBg;
            e.target.style.borderColor = palette.border;
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            flex: 1,
            height: '1px',
            background: palette.border
          }}></div>
          <span style={{
            padding: '0 16px',
            color: palette.text,
            fontSize: '14px'
          }}>
            or
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            background: palette.border
          }}></div>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="fullName"
              style={{
                display: 'block',
                color: palette.textHeading,
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px'
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.fullName ? palette.error : palette.border}`,
                borderRadius: '8px',
                fontSize: '16px',
                background: palette.inputBg,
                color: palette.textHeading,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p style={{
                color: palette.error,
                fontSize: '14px',
                margin: '4px 0 0 0'
              }}>
                {errors.fullName}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                color: palette.textHeading,
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px'
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.email ? palette.error : palette.border}`,
                borderRadius: '8px',
                fontSize: '16px',
                background: palette.inputBg,
                color: palette.textHeading,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p style={{
                color: palette.error,
                fontSize: '14px',
                margin: '4px 0 0 0'
              }}>
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                color: palette.textHeading,
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px'
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.password ? palette.error : palette.border}`,
                borderRadius: '8px',
                fontSize: '16px',
                background: palette.inputBg,
                color: palette.textHeading,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="Create a password"
            />
            {errors.password && (
              <p style={{
                color: palette.error,
                fontSize: '14px',
                margin: '4px 0 0 0'
              }}>
                {errors.password}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="confirmPassword"
              style={{
                display: 'block',
                color: palette.textHeading,
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px'
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.confirmPassword ? palette.error : palette.border}`,
                borderRadius: '8px',
                fontSize: '16px',
                background: palette.inputBg,
                color: palette.textHeading,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p style={{
                color: palette.error,
                fontSize: '14px',
                margin: '4px 0 0 0'
              }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: palette.accent,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => e.target.style.background = palette.accentBorder}
            onMouseOut={(e) => e.target.style.background = palette.accent}
          >
            Create Account
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            color: palette.text,
            margin: '0',
            fontSize: '14px'
          }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: palette.accent,
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Singup;
