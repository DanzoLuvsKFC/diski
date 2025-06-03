import { useAuth } from '../context/AuthContext';
import { useState } from 'react';


export default function Profile() {
  const { user, profile, setProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  if (!user) {
    return <p>Please sign in to see your profile.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Enforce rating max of 99
    if (name === 'rating') {
      const num = parseInt(value);
      if (num > 99) return; // Don't update if value exceeds 99
    }

    setTempProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      <h2>Soccer Profile</h2>

      {!isEditing ? (
        <div style={{ lineHeight: '1.8' }}>
          <p><strong>Preferred Foot:</strong> {profile.preferredFoot || 'Not set'}</p>
          <p><strong>Position:</strong> {profile.position || 'Not set'}</p>
          <p><strong>Club:</strong> {profile.club || 'Not set'}</p>
          <p><strong>Overall Rating:</strong> {profile.rating || 'Not set'}</p>
          <p><strong>Goals:</strong> {profile.goals || 'Not set'}</p>
          <p><strong>Assists:</strong> {profile.assists || 'Not set'}</p>
          <button onClick={handleEdit}>Edit Preferences</button>
        </div>
      ) : (
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '400px',
            marginTop: '1rem'
          }}
        >
          <div>
            <label>Preferred Foot:</label>
            <select name="preferredFoot" value={tempProfile.preferredFoot} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div>
            <label>Position:</label>
            <select name="position" value={tempProfile.position} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Left-back">Left-back</option>
              <option value="Right-back">Right-back</option>
              <option value="Center-back">Center-back</option>
              <option value="Wing-back">Wing-back</option>
              <option value="Defensive Midfielder">Defensive Midfielder</option>
              <option value="Central Midfielder">Centre Midfielder</option>
              <option value="Attacking Midfielder">Attacking Midfielder</option>
              <option value="Winger">Winger</option>
              <option value="Striker">Striker</option>
            </select>
          </div>

          <div>
            <label>Club:</label>
            <input
              type="text"
              name="club"
              value={tempProfile.club}
              onChange={handleChange}
              placeholder="e.g. FC Thriftball"
            />
          </div>

          <div>
            <label>Overall Rating (1–99):</label>
            <input
              type="number"
              name="rating"
              value={tempProfile.rating}
              onChange={handleChange}
              min="1"
              max="99"
            />
          </div>

          <div>
            <label>Goals Scored:</label>
            <input
              type="number"
              name="goals"
              value={tempProfile.goals}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Assists:</label>
            <input
              type="number"
              name="assists"
              value={tempProfile.assists}
              onChange={handleChange}
            />
          </div>

          <button type="button" onClick={handleSave}>Save</button>
        </form>
      )}
    </div>
  );
}
