import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Nav.css'; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Left links */}
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/courts">Courts</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/profile">Profile</Link>
      </div>

      {/* Right user actions */}
      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <span className="nav-guest">Guest</span>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
