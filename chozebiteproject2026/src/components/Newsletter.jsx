import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import '../styles/Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="newsletter">
      <div className="newsletter__bg-blob" />
      <div className="newsletter__bg-blob newsletter__bg-blob--2" />

      <div className="container">
        <motion.div
          className="newsletter__inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="newsletter__icon">📬</div>
          <h2 className="newsletter__title">
            Get Exclusive Deals & New Arrivals
          </h2>
          <p className="newsletter__subtitle">
            Join 25,000+ snack lovers and get first access to deals, new flavours,
            and secret drops. Unsubscribe anytime.
          </p>

          {submitted ? (
            <motion.div
              className="newsletter__success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              🎉 You're in! Watch your inbox for something delicious.
            </motion.div>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="newsletter__input"
                required
              />
              <motion.button
                type="submit"
                className="newsletter__btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe <FiSend size={16} />
              </motion.button>
            </form>
          )}

          <p className="newsletter__note">
            🔒 No spam, ever. Your email stays private.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
