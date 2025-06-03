// CourtDetails.jsx

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import courts from '../data/courts';
import './CourtDetailsstyling.css';

export default function CourtDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addBooking } = useAuth();

  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundCourt = courts.find(c => c.id === id);
      setCourt(foundCourt);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      setError('Please select a time slot');
      setSuccess('');
      return;
    }

    if (!user) {
      navigate('/signup');
      return;
    }

    addBooking(court, selectedSlot);
    setSuccess(`Booking confirmed for ${selectedSlot}`);
    setError('');
    setSelectedSlot('');
  };

  if (loading) return <p style={{ padding: '1rem' }}>Loading court details...</p>;
  if (!court) return <p style={{ padding: '1rem' }}>Court not found</p>;

  return (
    <div className="court-details-container">
      <div>
        <img src={court.image} alt={court.name} className="court-image" />
      </div>

      <div className="court-content">
        <div className="court-info">
          <h2>{court.name}</h2>
          <p>{court.location}</p>
          <p>Price: R{court.price}</p>
          <p>Rating: {court.rating} ⭐</p>
          <p><strong>Amenities:</strong> {court.amenities?.join(', ')}</p>
          <p><strong>Contact:</strong> {court.contact}</p>
        </div>

        <div className="time-slot-section">
          <h3>Time slots</h3>
          <div className="time-slots-grid">
            {court.availableSlots.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSlot(slot)}
                className={`time-slot-button ${selectedSlot === slot ? 'selected' : ''}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="confirm-booking">
        <form onSubmit={handleSubmit}>
          <button type="submit">Confirm booking</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
}
