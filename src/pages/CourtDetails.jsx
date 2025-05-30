import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import courts from '../data/courts';

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
    // Simulate data loading
    const timer = setTimeout(() => {
      const foundCourt = courts.find(c => c.id === id);
      setCourt(foundCourt);
      setLoading(false);
    }, 3000); // 1.5 second simulated delay

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
