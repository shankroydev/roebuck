import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./Auth.css";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-group">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-secondary auth-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <p className="demo-text">Email: demo@example.com</p>
            <p className="demo-text">Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
