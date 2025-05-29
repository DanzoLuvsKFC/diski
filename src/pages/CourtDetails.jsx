import { useParams } from 'react-router-dom';
import courts from '../data/courts';

export default function CourtDetails() {
  const { id } = useParams();
  const court = courts.find(c => c.id === id);

  if (!court) return <p>Court not found</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{court.name}</h1>
      <img src={court.image} alt={court.name} style={{ width: '100%', maxWidth: '500px' }} />
      <p>Location: {court.location}</p>
      <p>Price: R{court.price}</p>
      <p>Rating: {court.rating} ⭐</p>
      <p>Available Slots:</p>
      <ul>
        {court.availableSlots.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>
    </div>
  );
}