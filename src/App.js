import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courts from './pages/Courts';
import CourtDetails from './pages/CourtDetails';
import Bookings from './pages/Bookings';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar shows on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/courts/:id" element={<CourtDetails />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Router>
  );
}

export default App;