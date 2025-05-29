import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to signup page automatically
    navigate('/signup');
  }, [navigate]);

  return null;
}