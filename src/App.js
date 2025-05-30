import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courts from './pages/Courts';
import CourtDetails from './pages/CourtDetails';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar shows on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/courts/:id" element={<CourtDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<Login />} />      
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;