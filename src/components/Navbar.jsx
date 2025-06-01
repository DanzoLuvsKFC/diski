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
      <div className="nav-left">
        {/* Logo */}
        <Link to="/" className="brand-logo">DiSK!</Link>

        {/* Nav links - visible on desktop, toggled on mobile */}
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/courts" onClick={() => setMenuOpen(false)}>Courts</Link>
          <Link to="/bookings" onClick={() => setMenuOpen(false)}>Bookings</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
        </div>
      </div>

      {/* Right side login/logout */}
      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <span className="nav-guest">Guest</span>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </>
        )}
      </div>

      {/* Hamburger icon for mobile only */}
      <div className="hamburger" onClick={toggleMenu}>☰</div>
    </nav>
  );
}
