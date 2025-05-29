import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Please fill in all fields');
      return;
    }

    login(name, email); // Set user in context
    navigate('/bookings'); // Redirect after sign up
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Your Name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Your Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Complete Sign Up</button>
      </form>
    </div>
  );
}
