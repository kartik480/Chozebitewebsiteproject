import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import '../styles/Deals.css';

function useCountdown(targetHours = 8) {
  const [time, setTime] = useState({ h: targetHours, m: 0, s: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Pad({ n }) {
  return <span className="deals__digit">{String(n).padStart(2, '0')}</span>;
}

export default function Deals() {
  const { h, m, s } = useCountdown(11);

  return (
    <section className="deals">
      <div className="deals__inner container">
        <div className="deals__content">
          <motion.p
            className="deals__label"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            🔥 Limited Time Offer
          </motion.p>
          <motion.h2
            className="deals__title"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
          >
            Get <span>40% OFF</span> on<br />Premium Bundles
          </motion.h2>
          <motion.p
            className="deals__desc"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            Grab our exclusive snack bundles at an unbeatable price. Handpicked
            favourites, delivered fresh to your door.
          </motion.p>

          <motion.div
            className="deals__timer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
          >
            <div className="deals__timer-block">
              <Pad n={h} />
              <span className="deals__timer-label">Hours</span>
            </div>
            <span className="deals__colon">:</span>
            <div className="deals__timer-block">
              <Pad n={m} />
              <span className="deals__timer-label">Mins</span>
            </div>
            <span className="deals__colon">:</span>
            <div className="deals__timer-block">
              <Pad n={s} />
              <span className="deals__timer-label">Secs</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
          >
            <Link to="/products" className="deals__btn">
              Claim Deal <FiArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="deals__visual"
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="deals__badge-pct">40%<br /><span>OFF</span></div>
          <img
            src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=80"
            alt="Deal product"
            className="deals__img"
          />
        </motion.div>
      </div>
    </section>
  );
}
