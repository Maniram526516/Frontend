import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close mobile menu
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <span className="navbar-title">DEALERS PORTAL</span>
        </div>

        <div className="navbar-links">
          <Link to="/Home">Home</Link>
          {!isAuthenticated ? (
            <Link to="/login">Login</Link>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          )}
        </div>

        <div className="navbar-hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div className={isOpen ? "line line1 rotate45" : "line"}></div>
          <div className={isOpen ? "line line2 fade" : "line"}></div>
          <div className={isOpen ? "line line3 -rotate45" : "line"}></div>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <Link to="/Home" onClick={() => setIsOpen(false)}>Home</Link>
          {!isAuthenticated ? (
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          ) : (
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
