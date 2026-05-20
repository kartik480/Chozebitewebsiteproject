import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import '../styles/FeaturedProducts.css';

const FILTERS = ['All', 'Chips & Crisps', 'Chocolates', 'Nuts & Seeds', 'Health Bites'];

export default function FeaturedProducts() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? products.slice(0, 8)
    : products.filter(p => p.category === active).slice(0, 8);

  return (
    <section className="featured">
      <div className="container">
        <div className="section-header">
          <p className="section-label">⚡ Hot Right Now</p>
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Our best-selling snacks, handpicked and loved by thousands.
          </p>
        </div>

        <div className="featured__filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`featured__filter ${active === f ? 'featured__filter--active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          className="featured__grid"
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </motion.div>

        <div className="featured__cta">
          <Link to="/products" className="btn-outline">
            View All Products <FiArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
