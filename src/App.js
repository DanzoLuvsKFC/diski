import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Courts from './pages/Courts';
import CourtDetails from './pages/CourtDetails';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router basename='/diski'>
      
      <div className="app-layout">
        <Navbar />
        
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courts" element={<Courts />} />
            <Route path="/courts/:id" element={<CourtDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
