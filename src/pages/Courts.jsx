import courts from '../data/courts';
import { Link } from 'react-router-dom';

export default function Courts() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Available Courts</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {courts.map(court => (
          <div key={court.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '300px' }}>
            <img src={court.image} alt={court.name} style={{ width: '100%' }} />
            <h3>{court.name}</h3>
            <p>{court.location}</p>
            <p>Price: R{court.price}</p>
            <p>Rating: {court.rating} ⭐ ({court.reviews} reviews)</p>
            <Link to={`/courts/${court.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}