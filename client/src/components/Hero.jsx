 import { Link } from "react-router-dom";
 import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-overlay">
        <h1 className="hero-title">A Modern Taste of India</h1>
        <p className="hero-subtitle">
          Refined Indian cuisine, seasonal ingredients, and warm hospitality
          in the heart of the city.
        </p>
        <div className="hero-buttons">
          <a href="#menu" className="btn btn-outline">View Menu</a>
          <Link to="/reservation" className="btn btn-gold">Reserve Now</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;