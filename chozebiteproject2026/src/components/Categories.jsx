import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import '../styles/Categories.css';

export default function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <div className="section-header">
          <p className="section-label">🍕 Browse Categories</p>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            From crunchy chips to silky chocolates — find your perfect bite.
          </p>
        </div>

        <div className="categories__grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="cat-card">
                <div className="cat-card__emoji">{cat.emoji}</div>
                <h3 className="cat-card__name">{cat.name}</h3>
                <p className="cat-card__count">{cat.count} items</p>
                <span className="cat-card__arrow">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
