import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]); 
  const [profile, setProfile] = useState({
    preferredFoot: '',
    position: '',
    club: '',
    rating: '',
    goals: '',
    assists: ''
  });

  const login = (name, email) => {
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    setBookingHistory([]);
    setProfile({
      preferredFoot: '',
      position: '',
      club: '',
      rating: '',
      goals: '',
      assists: ''
    });
  };

  const addBooking = (court, slot) => {
    if (!user) return;
    setBookings(prev => [...prev, { court, slot }]);
  };

 
  const markAsPlayedOrCancelled = (index) => {
    const bookingToMove = bookings[index];
    setBookings(prev => prev.filter((_, i) => i !== index));
    setBookingHistory(prev => [...prev, bookingToMove]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      bookings,
      addBooking,
      bookingHistory,
      markAsPlayedOrCancelled,
      profile,
      setProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
