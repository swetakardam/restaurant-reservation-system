import "../styles/Testimonials.css";

const REVIEWS = [
  {
    text: "The butter chicken tastes like it was made by my grandmother — but the room feels like the future.",
    name: "Priya Nair",
  },
  {
    text: "Best biryani I have had outside of India. The service matched the food perfectly.",
    name: "James Okafor",
  },
  {
    text: "Elegant space, bold flavors, and the staff clearly know the menu inside out.",
    name: "Meredith Chase",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2>What Guests Are Saying</h2>
      <div className="testimonials-grid">
        {REVIEWS.map((r) => (
          <div className="testimonial-card" key={r.name}>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">"{r.text}"</p>
            <p className="testimonial-name">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;