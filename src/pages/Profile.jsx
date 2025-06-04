import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profilestyle.css';

export default function Profile() {
  const { user, profile, setProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signup');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rating') {
      const num = parseInt(value);
      if (num > 99) return;
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
    <div className="profile-container">
      <h1>{user?.name}</h1>
      

      <h2>Player Card</h2>

      {!isEditing ? (
        <div className="preferences-wrapper">
          <div className="preferences-container">
            <div className="performance-metrics">
              <div className="bento-box labelled">
                <strong>Overall</strong>
                <div className="large">{profile.rating || 'N/A'}</div>
              </div>

              <div className="bento-box labelled">
                <strong>Goals</strong>
                <div className="large">{profile.goals || 0}</div>
              </div>

              <div className="bento-box labelled">
                <strong>Assists</strong>
                <div className="large">{profile.assists || 0}</div>
              </div>
            </div>

            <div className="personal-info">
              <div className="bento-box">
                <strong>Preferred Foot:</strong>
                <span>{profile.preferredFoot || 'Not set'}</span>
              </div>
              <div className="bento-box">
                <strong>Position:</strong>
                <span>{profile.position || 'Not set'}</span>
              </div>
              <div className="bento-box">
                <strong>Club:</strong>
                <span>{profile.club || 'Not set'}</span>
              </div>
            </div>
          </div>
          <button className="edit-btn" onClick={handleEdit}>Edit Preferences</button>
        </div>
      ) : (
        <form className="profile-form">
          <label>Preferred Foot:
            <select name="preferredFoot" value={tempProfile.preferredFoot} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
              <option value="Both">Both</option>
            </select>
          </label>

          <label>Position:
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
          </label>

          <label>Club:
            <input type="text" name="club" value={tempProfile.club} onChange={handleChange} placeholder="e.g. FC Thriftball" />
          </label>

          <label>Overall Rating (1–99):
            <input type="number" name="rating" value={tempProfile.rating} onChange={handleChange} min="1" max="99" />
          </label>

          <label>Goals Scored:
            <input type="number" name="goals" value={tempProfile.goals} onChange={handleChange} />
          </label>

          <label>Assists:
            <input type="number" name="assists" value={tempProfile.assists} onChange={handleChange} />
          </label>

          <button type="button" className="save-btn" onClick={handleSave}>Save</button>
        </form>
      )}
    </div>
  );
}
