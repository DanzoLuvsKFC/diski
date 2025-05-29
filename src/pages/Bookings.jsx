import { useAuth } from '../context/AuthContext';

export default function Bookings() {
  const { bookings, user } = useAuth();

  if (!user) {
    return <p>Please sign up to view your bookings.</p>;
  }

  if (bookings.length === 0) {
    return <p>You have no bookings yet.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Your Bookings</h1>
      <ul>
        {bookings.map((b, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            <strong>{b.court.name}</strong><br />
            Location: {b.court.location}<br />
            Time Slot: {b.slot}
          </li>
        ))}
      </ul>
    </div>
  );
}
