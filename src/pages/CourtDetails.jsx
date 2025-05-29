import { useParams } from 'react-router-dom';
import courts from '../data/courts';
import { useState } from 'react';

export default function CourtDetails() {
  const { id } = useParams();
  const court = courts.find(c => c.id === id);

  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!court) return <p>Court not found</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot || !name || !email) {
      setError('Please fill in all fields');
      setSuccess('');
    } else {
      // Simulate booking logic
      console.log(`Booking made: ${name}, ${email}, slot: ${selectedSlot}, court: ${court.name}`);
      setSuccess(`Booking confirmed for ${selectedSlot}`);
      setError('');
      setName('');
      setEmail('');
      setSelectedSlot('');
    }
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
        <div>
          <label>Your Name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Your Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Book Now</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}