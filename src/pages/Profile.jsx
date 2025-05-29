import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Profile() {
  const { user, profile, setProfile } = useAuth();

  if (!user) {
    return <p>Please sign in to see your profile.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      <h2>Soccer Profile</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <div>
          <label>Preferred Foot:</label>
          <select name="preferredFoot" value={profile.preferredFoot} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div>
          <label>Position:</label>
          <select name="position" value={profile.position} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Attacker">Attacker</option>
          </select>
        </div>

        <div>
          <label>Club:</label>
          <input
            type="text"
            name="club"
            value={profile.club}
            onChange={handleChange}
            placeholder="e.g. FC Thriftball"
          />
        </div>

        <div>
          <label>Overall Rating (1–10):</label>
          <input
            type="number"
            name="rating"
            value={profile.rating}
            onChange={handleChange}
            min="1"
            max="10"
          />
        </div>

        <div>
          <label>Goals Scored:</label>
          <input
            type="number"
            name="goals"
            value={profile.goals}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Assists:</label>
          <input
            type="number"
            name="assists"
            value={profile.assists}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}
