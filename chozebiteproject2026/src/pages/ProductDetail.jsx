import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiShoppingCart, FiHeart, FiShare2,
  FiStar, FiPlus, FiMinus, FiCheck, FiTruck, FiShield, FiRefreshCw
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/ProductDetail.css';

const BADGE_COLORS = { SALE: '#EF4444', NEW: '#22C55E', POPULAR: '#FF6B00' };

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === Number(id));

  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="pd-notfound">
        <h2>Product not found</h2>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating));

  return (
    <div className="pd-page">
      <div className="container">

        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span className="pd-breadcrumb__current">{product.name}</span>
        </nav>

        <div className="pd-layout">

          {/* Left — Image */}
          <motion.div
            className="pd-gallery"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="pd-img-wrap">
              <img src={product.image} alt={product.name} className="pd-img" />
              {product.badge && (
                <span className="pd-badge" style={{ background: BADGE_COLORS[product.badge] }}>
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="pd-discount-badge">-{discount}%</span>
              )}
              <button
                className={`pd-wish-btn ${wished ? 'pd-wish-btn--active' : ''}`}
                onClick={() => setWished(w => !w)}
                aria-label="Wishlist"
              >
                <FiHeart size={20} />
              </button>
            </div>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            className="pd-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="pd-category">{product.category}</p>
            <h1 className="pd-title">{product.name}</h1>

            {/* Rating row */}
            <div className="pd-rating-row">
              <div className="pd-stars">
                {stars.map((filled, i) => (
                  <FiStar
                    key={i}
                    size={16}
                    className={filled ? 'pd-star--filled' : 'pd-star--empty'}
                  />
                ))}
              </div>
              <span className="pd-rating-num">{product.rating}</span>
              <span className="pd-reviews">({product.reviews} reviews)</span>
              {product.inStock
                ? <span className="pd-stock pd-stock--in">✓ In Stock</span>
                : <span className="pd-stock pd-stock--out">✗ Out of Stock</span>
              }
            </div>

            {/* Price */}
            <div className="pd-pricing">
              <span className="pd-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="pd-original">${product.originalPrice.toFixed(2)}</span>
                  <span className="pd-save">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                </>
              )}
            </div>

            <p className="pd-description">{product.description}</p>

            {/* Weight */}
            <div className="pd-meta">
              <div className="pd-meta-item">
                <span className="pd-meta-label">Weight</span>
                <span className="pd-meta-value">{product.weight}</span>
              </div>
              <div className="pd-meta-item">
                <span className="pd-meta-label">Category</span>
                <span className="pd-meta-value">{product.category}</span>
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="pd-actions">
              <div className="pd-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">
                  <FiMinus size={16} />
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} aria-label="Increase">
                  <FiPlus size={16} />
                </button>
              </div>

              <motion.button
                className={`pd-cart-btn ${added ? 'pd-cart-btn--added' : ''}`}
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                disabled={!product.inStock}
              >
                {added
                  ? <><FiCheck size={18} /> Added to Cart</>
                  : <><FiShoppingCart size={18} /> Add to Cart</>
                }
              </motion.button>

              <button className="pd-share-btn" aria-label="Share">
                <FiShare2 size={18} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="pd-trust">
              <div className="pd-trust-item">
                <FiTruck size={18} />
                <span>Free delivery over $30</span>
              </div>
              <div className="pd-trust-item">
                <FiRefreshCw size={18} />
                <span>30-day returns</span>
              </div>
              <div className="pd-trust-item">
                <FiShield size={18} />
                <span>Secure payment</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="pd-tabs">
          <div className="pd-tabs__nav">
            {['description', 'details', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`pd-tabs__btn ${activeTab === tab ? 'pd-tabs__btn--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="pd-tabs__body">
            {activeTab === 'description' && (
              <div className="pd-tab-content">
                <p>{product.description}</p>
                <p>
                  Each batch is carefully crafted using only premium ingredients with no artificial
                  preservatives or additives. We believe great snacks should taste as good as they
                  are made — which is why every product goes through a rigorous quality check before
                  it reaches your door.
                </p>
                <ul>
                  <li>No artificial colours or flavours</li>
                  <li>Responsibly sourced ingredients</li>
                  <li>Resealable packaging to keep it fresh</li>
                  <li>Suitable for on-the-go snacking</li>
                </ul>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="pd-tab-content">
                <table className="pd-details-table">
                  <tbody>
                    <tr><td>Weight</td><td>{product.weight}</td></tr>
                    <tr><td>Category</td><td>{product.category}</td></tr>
                    <tr><td>Availability</td><td>{product.inStock ? 'In Stock' : 'Out of Stock'}</td></tr>
                    <tr><td>Shelf Life</td><td>6 months from production date</td></tr>
                    <tr><td>Storage</td><td>Store in a cool, dry place</td></tr>
                    <tr><td>Allergens</td><td>May contain traces of nuts, milk, and gluten</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="pd-tab-content pd-reviews-list">
                <div className="pd-reviews-summary">
                  <div className="pd-reviews-big-num">{product.rating}</div>
                  <div>
                    <div className="pd-stars">
                      {stars.map((filled, i) => (
                        <FiStar key={i} size={18} className={filled ? 'pd-star--filled' : 'pd-star--empty'} />
                      ))}
                    </div>
                    <p>{product.reviews} verified reviews</p>
                  </div>
                </div>
                {[
                  { name: 'Alex T.', rating: 5, text: 'Absolutely love this product! Will definitely order again.', date: '2 days ago' },
                  { name: 'Maria K.', rating: 5, text: 'Best snack I have had in a long time. The quality is outstanding.', date: '1 week ago' },
                  { name: 'David R.', rating: 4, text: 'Really good flavour, packaging was excellent. Slightly pricey but worth it.', date: '2 weeks ago' },
                ].map((r, i) => (
                  <div key={i} className="pd-review-card">
                    <div className="pd-review-header">
                      <div className="pd-review-avatar">{r.name[0]}</div>
                      <div>
                        <p className="pd-review-name">{r.name}</p>
                        <p className="pd-review-date">{r.date}</p>
                      </div>
                      <div className="pd-review-stars">{'⭐'.repeat(r.rating)}</div>
                    </div>
                    <p className="pd-review-text">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="pd-related">
            <h2 className="pd-related__title">You Might Also Like</h2>
            <div className="pd-related__grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
