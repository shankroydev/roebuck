import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">RoeBuck Inn</h3>
            <div className="footer-info">
              <div className="info-item">
                <MapPin size={16} />
                <span>Droxford Road Soberton PO17 5AY (A32 nr Wickham)</span>
              </div>
              <div className="info-item">
                <Phone size={16} />
                <span>+44 20 1234 5678</span>
              </div>
              <div className="info-item">
                <Mail size={16} />
                <span>info@roebuckinn.com</span>
              </div>
            </div>
            <div className="opening-hours">
              <h4>Opening Hours</h4>
              <div className="hours-item">
                <span>Check-in:</span>
                <span>2:00 PM</span>
              </div>
              <div className="hours-item">
                <span>Check-out:</span>
                <span>11:00 AM</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/rooms" className="footer-link">
                Rooms
              </Link>
              <Link to="/gallery" className="footer-link">
                Gallery
              </Link>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
            </nav>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p className="footer-description">
              Experience luxury and comfort at its finest. Book your stay with
              us today.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 RoeBuck Inn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
