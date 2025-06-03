import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate

export default function Bookings() {
  const { user, bookings, bookingHistory, markAsPlayedOrCancelled } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ initialize navigate

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/signup');
    }
  }, [user, navigate]);

  // Simulate loading delay (2 seconds) only once
  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('bookingsLoaded');

    if (alreadyLoaded) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('bookingsLoaded', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', fontSize: '2rem', color: 'purple' }}>
        📝 Loading your bookings...
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Your Bookings</h1>

      <h2>Upcoming</h2>
      {bookings.length === 0 ? (
        <p>No upcoming bookings.</p>
      ) : (
        <ul>
          {bookings.map((b, index) => (
            <li
              key={index}
              style={{
                marginBottom: '1rem',
                borderBottom: '1px solid #ccc',
                paddingBottom: '1rem'
              }}
            >
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
