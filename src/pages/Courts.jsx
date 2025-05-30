import { useEffect, useState } from 'react';
import courtsData from '../data/courts';
import { Link } from 'react-router-dom';

export default function Courts() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we've already loaded courts, don't show loader again
    const alreadyLoaded = sessionStorage.getItem('courtsLoaded');

    if (alreadyLoaded) {
      setCourts(courtsData);
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setCourts(courtsData);
        setLoading(false);
        sessionStorage.setItem('courtsLoaded', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', fontSize: '2rem', color: 'teal' }}>
        ⚽ Loading courts...
      </div>
    );
  }

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
