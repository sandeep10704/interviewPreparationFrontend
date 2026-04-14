import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginWithEmail, loginWithGoogle } from "../store/authSlice";
import { Button, Input, Typography } from '../Components/Common';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

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

        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">

      <div className="w-full max-w-6xl rounded-2xl shadow-lg bg-card p-8 animate-fadeIn">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT IMAGE */}
          <div className="hidden md:flex justify-center">
            <img
              src="/loginImage.png"
              alt="login"
              className="w-full max-w-lg rounded-2xl animate-float"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="max-w-md w-full mx-auto animate-slideUp">

            {/* LOGO + TEXT */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <img
                src="/logo.png"
                alt="logo"
                className="h-12 animate-pop"
              />

              <Typography variant="h2">
                Interview<span className="text-accent-main">AI</span>
              </Typography>

            </div>

            <Typography variant="h2" className="mb-2 text-center">
              Welcome Back
            </Typography>

            <Typography variant="bodySmall" className="mb-6 text-center">
              Sign in to your account
            </Typography>

            <form onSubmit={handleSubmit} className="space-y-5">

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                error={errors.password}
              />

              <div className="flex items-center justify-between pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <Typography variant="bodySmall">
                    Remember me
                  </Typography>
                </label>

                <Link to="/forgot-password">
                  <Typography variant="bodySmall" className="text-accent-main">
                    Forgot password?
                  </Typography>
                </Link>
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>

              <Button
                type="button"
                variant="google"
                className="w-full"
                leftIcon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                }
                onClick={async () => {
                  try {
                    await dispatch(loginWithGoogle()).unwrap();
                    navigate("/");
                  } catch (err) {
                    console.error("Google login error:", err);
                  }
                }}
              >
                Continue with Google
              </Button>

            </form>

            <div className="mt-6 text-center">
              <Typography variant="bodySmall">
                Don't have an account?{" "}
                <Link to="/signup">
                  <span className="text-accent-main">
                    Sign up
                  </span>
                </Link>
              </Typography>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;