import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import courts from '../data/courts';

export default function CourtDetails() {
  const { id } = useParams();
  const court = courts.find(c => c.id === id);
  const navigate = useNavigate();
  const { user, addBooking } = useAuth();

  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!court) return <p>Court not found</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      setError('Please select a time slot');
      setSuccess('');
      return;
    }

    if (!user) {
      // Redirect to signup page
      navigate('/signup');
      return;
    }

    // Add booking to global context
    addBooking(court, selectedSlot);
    setSuccess(`Booking confirmed for ${selectedSlot}`);
    setError('');
    setSelectedSlot('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{court.name}</h1>
      <img src={court.image} alt={court.name} style={{ width: '100%', maxWidth: '500px' }} />
      <p>Location: {court.location}</p>
      <p>Price: R{court.price}</p>
      <p>Rating: {court.rating} ⭐</p>

      <h3>Book This Court</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select a time slot:</label><br />
          <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
            <option value="">-- Select --</option>
            {court.availableSlots.map((slot, idx) => (
              <option key={idx} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Book Now</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}
