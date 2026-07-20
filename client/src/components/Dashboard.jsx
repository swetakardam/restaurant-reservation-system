import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [reservationData, setReservationData] = useState({
    date: '',
    time: '7:00 PM',
    guests: 2,
    name: '',
    phone: '',
  });

  const API_URL = 'https://restaurant-reservation-system-ajrr.onrender.com';
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/reservation');
    } else {
      fetchReservations();
    }
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/reservations/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setReservations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReservationChange = (e) => {
    setReservationData({ ...reservationData, [e.target.name]: e.target.value });
  };

  const changeGuests = (delta) => {
    setReservationData((prev) => ({
      ...prev,
      guests: Math.max(1, prev.guests + delta),
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/reservation');
  };

  const resetForm = () => {
    setReservationData({ date: '', time: '7:00 PM', guests: 2, name: '', phone: '' });
    setEditingId(null);
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const url = editingId ? `${API_URL}/api/reservations/${editingId}` : `${API_URL}/api/reservations`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(editingId ? 'Reservation updated — see it below.' : 'Reservation confirmed — see it below.');
        resetForm();
        fetchReservations();
      } else {
        setMessage(data.message || 'Reservation failed');
      }
    } catch (err) {
      setMessage('Server error, try again');
    }
    setLoading(false);
  };

  const handleEdit = (res) => {
    setReservationData({
      date: res.date,
      time: res.time,
      guests: res.guests,
      name: res.name,
      phone: res.phone,
    });
    setEditingId(res._id);
    setMessage('');
  };

  const confirmDelete = (res) => setDeleteTarget(res);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/reservations/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteTarget(null);
      fetchReservations();
    } catch (err) {
      console.log(err);
    }
  };

  const formatDateBadge = (dateStr) => {
    const d = new Date(dateStr);
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = d.getDate();
    return { month, day };
  };

  const userName = localStorage.getItem('userName') || 'Guest';
  const upcomingCount = reservations.filter((r) => new Date(r.date) >= new Date()).length;

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Saffron House</h1>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </header>

      <div className="dashboard-welcome">
        <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
        <div>
          <h2>Welcome back, {userName}</h2>
          <p>Manage your upcoming reservations or book a new table.</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <span className="stat-pill pink">{upcomingCount} Upcoming</span>
        <span className="stat-pill blue">{reservations.length} Total Reservations</span>
      </div>

      <div className="dashboard-content">
        <div className="new-reservation-card">
          <div className="card-title-row">
            <h3>{editingId ? 'Edit Reservation' : 'New Reservation'}</h3>
            {editingId && (
              <span className="cancel-edit-link" onClick={resetForm}>Cancel</span>
            )}
          </div>

          <form onSubmit={handleReservationSubmit}>
            <div className="form-row">
              <div>
                <label>Date</label>
                <input type="date" name="date" value={reservationData.date} onChange={handleReservationChange} required />
              </div>
              <div>
                <label>Time</label>
                <select name="time" value={reservationData.time} onChange={handleReservationChange}>
                  <option>6:00 PM</option>
                  <option>6:30 PM</option>
                  <option>7:00 PM</option>
                  <option>7:30 PM</option>
                  <option>8:00 PM</option>
                  <option>8:30 PM</option>
                  <option>9:00 PM</option>
                </select>
              </div>
            </div>

            <label>Guests</label>
            <div className="guest-counter">
              <button type="button" onClick={() => changeGuests(-1)}>−</button>
              <span>{reservationData.guests}</span>
              <button type="button" onClick={() => changeGuests(1)}>+</button>
              <span className="guest-label">guests</span>
            </div>

            <div className="form-row">
              <div>
                <label>Name</label>
                <input type="text" name="name" placeholder="Full name" value={reservationData.name} onChange={handleReservationChange} required />
              </div>
              <div>
                <label>Phone</label>
                <input type="tel" name="phone" placeholder="(555) 000-0000" value={reservationData.phone} onChange={handleReservationChange} required />
              </div>
            </div>

            <button type="submit" className="confirm-btn" disabled={loading}>
              {loading ? 'Please wait...' : editingId ? 'Update Reservation' : 'Confirm Reservation'}
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>

        <div className="reservations-list-card">
          <h3>Your Reservations</h3>
          {reservations.length === 0 && <p className="empty-text">No reservations yet.</p>}
          {reservations.map((r) => {
            const { month, day } = formatDateBadge(r.date);
            const isUpcoming = new Date(r.date) >= new Date();
            return (
              <div className="reservation-item" key={r._id}>
                <div className="date-badge">
                  <span className="badge-month">{month}</span>
                  <span className="badge-day">{day}</span>
                </div>
                <div className="reservation-info">
                  <p className="res-time">{r.time} · {r.guests} guests</p>
                  <p className="res-name">{r.name}</p>
                </div>
                <span className={`status-pill ${isUpcoming ? 'upcoming' : ''}`}>
                  {isUpcoming ? 'Upcoming' : 'Completed'}
                </span>
                <button className="link-btn" onClick={() => handleEdit(r)}>Edit</button>
                <button className="link-btn delete" onClick={() => confirmDelete(r)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>

      {deleteTarget && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Cancel this reservation?</h3>
            <p>
              This will permanently remove your reservation for{' '}
              <strong>{formatDateBadge(deleteTarget.date).month} {formatDateBadge(deleteTarget.date).day}, {deleteTarget.time}</strong>.
              This cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="keep-btn" onClick={cancelDelete}>Keep Reservation</button>
              <button className="delete-btn-confirm" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;