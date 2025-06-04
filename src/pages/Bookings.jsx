import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bookingstyle.css';

export default function Bookings() {
  const { user, bookings, bookingHistory, markAsPlayedOrCancelled } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signup');
    }
  }, [user, navigate]);

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
      <div className="booking-loading">
        <div className="spinner"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <h1 className="booking-title">📅 Your Bookings</h1>

      <section className="booking-section">
        <h2>Upcoming</h2>
        {bookings.length === 0 ? (
          <p className="empty-text">No upcoming bookings.</p>
        ) : (
          <ul className="booking-list">
            {bookings.map((b, index) => (
              <li className="booking-card upcoming" key={index}>
                <h3>{b.court.name}</h3>
                <p><strong>Location:</strong> {b.court.location}</p>
                <p><strong>Time Slot:</strong> {b.slot}</p>
                <div className="booking-buttons">
                  <button onClick={() => markAsPlayedOrCancelled(index)} className="btn played">
                    Played Already
                  </button>
                  <button onClick={() => markAsPlayedOrCancelled(index)} className="btn cancel">
                    Cancel Booking
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="booking-section">
        <h2>History</h2>
        {bookingHistory.length === 0 ? (
          <p className="empty-text">No past bookings yet.</p>
        ) : (
          <ul className="booking-list">
            {bookingHistory.map((b, index) => (
              <li className="booking-card past" key={index}>
                <h3>{b.court.name}</h3>
                <p><strong>Location:</strong> {b.court.location}</p>
                <p><strong>Time Slot:</strong> {b.slot}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
