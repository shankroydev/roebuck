import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./Auth.css";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError("");
      await signup(data.name, data.email, data.password);
      navigate("/");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join us for an unforgettable experience</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <div className="input-group">
                <User size={20} className="input-icon" />
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`form-input ${errors.name ? "error" : ""}`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

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

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group">
                <Lock size={20} className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className={`form-input ${
                    errors.confirmPassword ? "error" : ""
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-secondary auth-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
