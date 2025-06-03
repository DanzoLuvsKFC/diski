import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Nav.css';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <div className="nav-left">
          <Link to="/" className="brand-logo">DiSK!</Link>

          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <Link to="/courts" onClick={() => setMenuOpen(false)}>Courts</Link>
            <Link to="/bookings" onClick={() => setMenuOpen(false)}>Bookings</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>

            <div className="nav-auth mobile-auth">
              {user ? (
                <>
                  <span className="nav-user">{user.name}</span>
                  <button className="auth-button" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <span className="nav-guest">Guest</span>
                  <Link to="/login" className="auth-button" onClick={() => setMenuOpen(false)}>Login</Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="nav-right desktop-auth">
          {user ? (
            <>
              <span className="nav-user">{user.name}</span>
              <button className="auth-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <span className="nav-guest">Guest</span>
              <Link to="/login" className="auth-button" onClick={() => setMenuOpen(false)}>Login</Link>
            </>
          )}
        </div>

        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
