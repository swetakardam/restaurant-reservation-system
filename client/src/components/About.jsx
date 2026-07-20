import "../styles/About.css";

const DINING_IMG = "https://images.unsplash.com/photo-1746652762397-c846bf1f9351?w=800&q=80&auto=format&fit=crop";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-text">
        <h2>Rooted in Tradition, Reimagined for Today</h2>
        <p>
          Saffron House brings together heirloom recipes from across India
          with contemporary technique and locally sourced produce. Our open
          kitchen, warm woods, and hand-glazed tile pay homage to the
          subcontinent's spice markets — reinterpreted for a modern dining
          room.
        </p>
        <p>
          Every dish is built around a house-ground spice blend, prepared
          fresh daily by our culinary team.
        </p>
      </div>
      <img src={DINING_IMG} alt="Dining room ambience" className="about-image" />
    </section>
  );
}

export default About;