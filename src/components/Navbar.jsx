import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/courts" style={{ marginRight: '1rem' }}>Courts</Link>
      <Link to="/bookings" style={{ marginRight: '1rem' }}>Bookings</Link>
      <Link to="/profile" style={{ marginRight: '1rem' }}>Profile</Link>

      {user ? (
        <span style={{ fontWeight: 'bold' }}>{user.name}</span>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
