import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { palette } from '../theme/palette';
import { useDispatch } from "react-redux";
import { loginWithEmail, loginWithGoogle } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(
          loginWithEmail({
            email: formData.email,
            password: formData.password
          })
        ).unwrap();

        navigate("/");   // redirect to home
      } catch (err) {
        console.log(err);
      }
    }
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
        <div style={{ textAlign: 'left', marginBottom: '32px' }}>
          <h1 style={{
            color: palette.textHeading,
            fontSize: '28px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            fontFamily: 'var(--heading)'
          }}>
            Welcome Back
          </h1>
          <p style={{
            color: palette.text,
            margin: '0',
            fontSize: '16px'
          }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
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
              placeholder="Enter your password"
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

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '14px',
              color: palette.subtleText
            }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                style={{
                  marginRight: '8px',
                  accentColor: palette.accent
                }}
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              style={{
                color: palette.accent,
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Forgot password?
            </Link>
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
            Sign In
          </button>
          <button
            type="button"
            onClick={async () => {
              await dispatch(loginWithGoogle()).unwrap();
              navigate("/");
            }}
          >
            Sign in with Google
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            color: palette.text,
            margin: '0',
            fontSize: '14px'
          }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: palette.accent,
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
