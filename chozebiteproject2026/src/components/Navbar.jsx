import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Deals', path: '/deals' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🔥</span>
          <span className="navbar__logo-text">
            <span className="navbar__logo-choze">CHOZE</span>
            <span className="navbar__logo-bite">BITE</span>
          </span>
        </Link>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            className={`navbar__icon-btn ${searchOpen ? 'navbar__icon-btn--active' : ''}`}
            onClick={() => setSearchOpen(o => !o)}
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>
          <button className="navbar__icon-btn" aria-label="Wishlist">
            <FiHeart size={20} />
          </button>
          <button className="navbar__icon-btn" aria-label="Account">
            <FiUser size={20} />
          </button>
          <button
            className="navbar__cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
          >
            <FiShoppingCart size={20} />
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </button>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar__search container">
          <div className="navbar__search-box">
            <FiSearch size={18} className="navbar__search-icon" />
            <input
              type="text"
              placeholder="Search for snacks, chocolates, nuts..."
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
