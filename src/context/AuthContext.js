import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  const login = (name, email) => {
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
  };

  const addBooking = (court, slot) => {
    if (!user) return;
    setBookings(prev => [...prev, { court, slot }]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, bookings, addBooking }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
