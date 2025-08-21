import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, X, User, LogOut } from "lucide-react";
import "./Header.css";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <div className="logo-icon">🏨</div>
            <span className="logo-text">RoeBuck Inn</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className={`nav-link ${isActive("/rooms") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Rooms
            </Link>
            <Link
              to="/gallery"
              className={`nav-link ${isActive("/gallery") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
              onClick={closeMenu}
            >
              About Us
            </Link>
          </nav>

          <div className="auth-section">
            {user ? (
              <div className="user-menu">
                <Link
                  to="/manage-bookings"
                  className="btn btn-outline"
                  onClick={closeMenu}
                >
                  <User size={16} />
                  <span>My Bookings</span>
                </Link>
                <button
                  className="btn btn-outline logout-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link
                  to="/login"
                  className="btn btn-outline"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
