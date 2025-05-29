import { useAuth } from '../context/AuthContext';

export default function Bookings() {
  const { user, bookings, bookingHistory, markAsPlayedOrCancelled } = useAuth();

  if (!user) {
    return <p>Please sign in to view your bookings.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Your Bookings</h1>

      {/* 🔜 UPCOMING BOOKINGS */}
      <h2>Upcoming</h2>
      {bookings.length === 0 ? (
        <p>No upcoming bookings.</p>
      ) : (
        <ul>
          {bookings.map((b, index) => (
            <li key={index} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <strong>{b.court.name}</strong><br />
              Location: {b.court.location}<br />
              Time Slot: {b.slot}<br />
              <button onClick={() => markAsPlayedOrCancelled(index)} style={{ marginRight: '0.5rem' }}>
                Played Already
              </button>
              <button onClick={() => markAsPlayedOrCancelled(index)}>
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ BOOKING HISTORY */}
      <h2>History</h2>
      {bookingHistory.length === 0 ? (
        <p>No past bookings yet.</p>
      ) : (
        <ul>
          {bookingHistory.map((b, index) => (
            <li key={index} style={{ marginBottom: '1rem' }}>
              <strong>{b.court.name}</strong><br />
              Location: {b.court.location}<br />
              Time Slot: {b.slot}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
