import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import '../styles/Hero.css';

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } };

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-blob hero__bg-blob--1" />
      <div className="hero__bg-blob hero__bg-blob--2" />

      <div className="hero__inner container">

        <div className="hero__content">
          <motion.div
            className="hero__badge"
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.5 }}
          >
            🎉 Free shipping on orders over $30
          </motion.div>

          <motion.h1
            className="hero__title"
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Bite Into <span className="hero__title-highlight">Something</span>{' '}
            <span className="hero__title-outline">Amazing</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our handpicked collection of premium snacks, artisan chocolates,
            and guilt-free bites — crafted for people who refuse to settle for ordinary.
          </motion.p>

          <motion.div
            className="hero__actions"
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/products" className="btn-primary hero__cta-main">
              Shop Now <FiArrowRight size={18} />
            </Link>
            <button className="hero__cta-video">
              <span className="hero__play-btn"><FiPlay size={14} /></span>
              Watch Story
            </button>
          </motion.div>

          <motion.div
            className="hero__stats"
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { num: '500+', label: 'Products' },
              { num: '50K+', label: 'Happy Customers' },
              { num: '4.9★', label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-num">{stat.num}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          variants={fadeRight} initial="hidden" animate="show"
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="hero__img-wrapper">
            <img
              src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=700&q=80"
              alt="Premium snacks"
              className="hero__img"
            />
            <div className="hero__img-glow" />
          </div>

          <motion.div
            className="hero__card hero__card--rating"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="hero__card-stars">⭐⭐⭐⭐⭐</span>
            <span className="hero__card-text">Trusted by 50k+ snack lovers</span>
          </motion.div>

          <motion.div
            className="hero__card hero__card--order"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <span className="hero__card-emoji">🚀</span>
            <div>
              <p className="hero__card-title">Fast Delivery</p>
              <p className="hero__card-desc">Same-day dispatch</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
