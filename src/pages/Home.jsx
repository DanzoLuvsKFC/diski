import courts from '../data/courts';
import { Link } from 'react-router-dom';
import './Home.css'; 
import MagnetLines from '../components/MagnetLines'; 
import DotGrid from '../components/DotGrid';



export default function Home() {
  // Sort courts by review count and get top 9
  const topCourts = [...courts].sort((a, b) => b.reviews - a.reviews).slice(0, 3);

  return (
    <div className="home">
      <section
        className="home-hero"
        style={{ position: 'relative', height: '600px', overflow: 'hidden' }}
      >
        {/* DotGrid background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <DotGrid
            dotSize={10}
            gap={15}
            baseColor="#ffffff"
            activeColor="#5db075"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Hero content on top */}
        <div
          className="hero-content"
          style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center' }}
        >
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

      <section className="home-cta">
        {/* Background effect */}
        <div className="magnet-background">
          <MagnetLines
            rows={15}
            columns={15}
            containerSize="100%"
            lineColor="#5db075"
            lineWidth="0.8vmin"
            lineHeight="5vmin"
            baseAngle={0}
          />
        </div>

        {/* Foreground CTA */}
        <div className="cta-content">
          <h2>Find courts near you</h2>
          <Link to="/courts" className="cta-button">Browse Courts</Link>
        </div>
      </section>

    </div>
  );
}
