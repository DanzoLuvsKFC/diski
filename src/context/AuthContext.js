import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // New: profile data
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

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      bookings,
      addBooking,
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
