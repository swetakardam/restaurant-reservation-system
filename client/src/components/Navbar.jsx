import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Saffron House</div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#reservation">Reservation</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <Link to="/reservation" className="book-btn">Book a Table</Link>
    </nav>
  );
}

export default Navbar;