import { Link } from 'react-router-dom';
import '../styles/ReservationSection.css';

function ReservationSection() {
  return (
    <section className="reservation-section-preview" id="reservation">
      <h2>Reserve a Table</h2>
      <p>
        Sign in to your Saffron House account to book a table and manage your
        reservations.
      </p>
      <Link to="/reservation" className="login-btn">Log In to Reserve</Link>
    </section>
  );
}

export default ReservationSection;