import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Reservation.css';

function Reservation() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const API_URL = 'https://restaurant-reservation-system-ajrr.onrender.com';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Account created!');
        setIsLogin(true);
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (err) {
      setMessage('Server error, try again');
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        navigate('/dashboard');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setMessage('Server error, try again');
    }
    setLoading(false);
  };

  return (
    <div className="reservation-page">
      <div className="reservation-left">
        <Link to="/" className="back-link">Back to site</Link>
        <div className="left-content">
          <h1>Saffron House</h1>
          <p className="tagline">Modern Indian Dining</p>
          <div className="quote">
            "Every dish is built around a house-ground spice blend, prepared
            fresh daily by our culinary team."
          </div>
        </div>
      </div>

      <div className="reservation-right">
        <div className="form-box">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="subtitle">
            {isLogin ? 'Sign in to your Saffron House account to book a table' : 'Sign up to start booking tables'}
          </p>
          <form onSubmit={isLogin ? handleLogin : handleSignup}>
            {!isLogin && (
              <>
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </>
            )}
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />

            <button type="submit" disabled={loading}>
              {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          {message && <p className="message">{message}</p>}

          <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Reservation;