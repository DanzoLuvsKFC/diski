import courts from '../data/courts';
import { Link } from 'react-router-dom';
import './Home.css'; // We'll create this

export default function Home() {
  // Sort courts by review count and get top 9
  const topCourts = [...courts].sort((a, b) => b.reviews - a.reviews).slice(0, 3);

  return (
    <div className="home">
      {/* SECTION 1: Hero/Parallax Placeholder */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>Welcome to DISKI</h1>
          <p>Your go-to app for 5-a-side football bookings</p>
        </div>
      </section>

      {/* SECTION 2: Carousel of popular courts */}
      <section className="home-carousel">
        <h2>Popular Courts</h2>
        <div className="carousel-container">
          {topCourts.map(court => (
            <div key={court.id} className="court-card">
              <img src={court.image} alt={court.name} />
              <h3>{court.name}</h3>
              <p>{court.location}</p>
              <p>Price: R{court.price}</p>
              <p>Rating: {court.rating} ⭐ ({court.reviews} reviews)</p>
              <Link to={`/courts/${court.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Call-to-action */}
      <section className="home-cta">
        <h2>Find courts near you</h2>
        <Link to="/courts" className="cta-button">Browse Courts</Link>
      </section>
    </div>
  );
}
