// Courts.jsx
import { useEffect, useState } from 'react';
import courtsData from '../data/courts';
import { Link } from 'react-router-dom';
import './Courtstyle.css';

export default function Courts() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <div className="loading">
        ⚽ Loading courts...
      </div>
    );
  }

  return (
    <div className="courts-container">
      <h1>Available Courts in Johannesburg</h1>
      <div className="court-grid">
        {courts.map((court) => (
          <div key={court.id} className="court-card">
            <img src={court.image} alt={court.name} className="court-image" />
            <h3>{court.name}</h3>
            <p>{court.location}</p>
            <p>Price: R{court.price}</p>
            <p>Rating: {court.rating} ⭐ ({court.reviews} reviews)</p>
            <Link to={`/courts/${court.id}`} className="details-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
