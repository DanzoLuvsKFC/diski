import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Link to="/">Home</Link>
      <Link to="/courts">Courts</Link>
      <Link to="/bookings">Bookings</Link>
      <Link to="/profile">Profile</Link>

      {/* This span keeps the layout consistent */}
      <div style={{ display: 'inline-block' }}>
        {user ? (
          <span style={{ fontWeight: 'bold' }}>{user.name}</span>
        ) : (
          <span style={{ color: '#888' }}>Guest</span>
        )}
      </div>

      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
