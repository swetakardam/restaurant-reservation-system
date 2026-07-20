import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        <div>
          <h3>Saffron House</h3>
          <p>
            128 Marigold Lane
            <br />
            Riverdale District
            <br />
            New York, NY 10012
          </p>
        </div>
        <div>
          <h4>HOURS</h4>
          <p>
            Mon–Thu: 5pm–10pm
            <br />
            Fri–Sat: 5pm–11pm
            <br />
            Sunday: 4pm–9pm
          </p>
        </div>
        <div>
          <h4>CONTACT</h4>
          <p>
            (212) 555-0148
            <br />
            hello@saffronhouse.com
          </p>
        </div>
        <div>
          <h4>EXPLORE</h4>
          <p>
            <a href="#menu">Menu</a>
            <br />
            <a href="#reservation">Reservations</a>
            <br />
            <a href="#about">About</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Saffron House. All rights reserved.</p>
        <div className="socials">
          <span>IG</span>
          <span>FB</span>
          <span>TW</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;