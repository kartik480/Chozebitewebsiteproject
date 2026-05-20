import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import '../styles/Footer.css';

const LINKS = {
  Shop: ['All Products', 'New Arrivals', 'Best Sellers', 'Deals & Offers', 'Gift Bundles'],
  Company: ['About Us', 'Our Story', 'Blog', 'Careers', 'Press'],
  Support: ['Help Center', 'Track Order', 'Returns', 'Shipping Info', 'Contact Us'],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">

        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon">🔥</span>
            <span>
              <span className="footer__logo-choze">CHOZE</span>
              <span className="footer__logo-bite">BITE</span>
            </span>
          </Link>
          <p className="footer__tagline">
            Premium snacks, artisan bites, and guilt-free indulgences —
            delivered straight to your door.
          </p>
          <div className="footer__socials">
            {[
              { Icon: FiInstagram, label: 'Instagram' },
              { Icon: FiTwitter, label: 'Twitter' },
              { Icon: FiFacebook, label: 'Facebook' },
              { Icon: FiYoutube, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <a key={label} href="#" className="footer__social" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(LINKS).map(([section, links]) => (
          <div key={section} className="footer__col">
            <h4 className="footer__col-title">{section}</h4>
            <ul className="footer__col-links">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="footer__col-link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__col">
          <h4 className="footer__col-title">Contact</h4>
          <ul className="footer__contact-list">
            <li><FiMapPin size={14} /><span>42 Snack Street, Flavour City, FC 90210</span></li>
            <li><FiPhone size={14} /><a href="tel:+18005556789">+1 800 555 6789</a></li>
            <li><FiMail size={14} /><a href="mailto:hello@chozebite.com">hello@chozebite.com</a></li>
          </ul>
          <div className="footer__payment">
            <span className="footer__payment-label">We accept</span>
            <div className="footer__payment-icons">
              {['VISA', 'MC', 'AMEX', 'PAYPAL'].map(p => (
                <span key={p} className="footer__payment-badge">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p className="footer__copy">
          © {new Date().getFullYear()} Choze Bite. All rights reserved.
        </p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
