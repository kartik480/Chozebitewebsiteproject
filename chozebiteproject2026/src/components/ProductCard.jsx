import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const BADGE_COLORS = {
  SALE: '#EF4444',
  NEW: '#22C55E',
  POPULAR: '#FF6B00',
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 1000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/products/${product.id}`} className="product-card__img-wrap">
        <img src={product.image} alt={product.name} className="product-card__img" loading="lazy" />

        {product.badge && (
          <span
            className="product-card__badge"
            style={{ background: BADGE_COLORS[product.badge] || '#FF6B00' }}
          >
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="product-card__discount">-{discount}%</span>
        )}

        <div className="product-card__overlay">
          <button
            className={`product-card__wish ${wished ? 'product-card__wish--active' : ''}`}
            onClick={(e) => { e.preventDefault(); setWished(w => !w); }}
            aria-label="Wishlist"
          >
            <FiHeart size={16} />
          </button>
          <Link
            to={`/products/${product.id}`}
            className="product-card__view"
            aria-label="Quick view"
          >
            <FiEye size={16} />
          </Link>
        </div>
      </Link>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>

        <div className="product-card__rating">
          <FiStar size={13} className="product-card__star" />
          <span className="product-card__rating-num">{product.rating}</span>
          <span className="product-card__reviews">({product.reviews})</span>
        </div>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <span className="product-card__price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-card__original">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <motion.button
            className={`product-card__cart-btn ${adding ? 'product-card__cart-btn--added' : ''}`}
            onClick={handleAddToCart}
            whileTap={{ scale: 0.9 }}
            aria-label="Add to cart"
          >
            {adding ? '✓' : <FiShoppingCart size={16} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
