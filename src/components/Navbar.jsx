import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/courts" style={{ marginRight: '1rem' }}>Courts</Link>
      <Link to="/bookings" style={{ marginRight: '1rem' }}>Bookings</Link>
      <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
      <Link to="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
    </nav>
  );
}