import { motion } from 'framer-motion';
import '../styles/WhyUs.css';

const features = [
  {
    emoji: '🚚',
    title: 'Free Delivery',
    desc: 'Free shipping on all orders over $30. Same-day dispatch on orders before 2 PM.',
    color: '#FF6B00',
  },
  {
    emoji: '🌿',
    title: 'Premium Quality',
    desc: 'Every snack is sourced from trusted suppliers and held to the highest standards.',
    color: '#22C55E',
  },
  {
    emoji: '↩️',
    title: 'Easy Returns',
    desc: 'Not happy? Return within 30 days, hassle-free. No questions asked.',
    color: '#3B82F6',
  },
  {
    emoji: '🔒',
    title: 'Secure Payment',
    desc: 'Your data is safe. We use bank-level encryption for every transaction.',
    color: '#8B5CF6',
  },
];

export default function WhyUs() {
  return (
    <section className="whyus">
      <div className="container">
        <div className="section-header">
          <p className="section-label">💛 Why Choose Us</p>
          <h2 className="section-title">The Choze Bite Difference</h2>
          <p className="section-subtitle">
            We don't just sell snacks — we deliver an experience worth savoring.
          </p>
        </div>

        <div className="whyus__grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="whyus__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="whyus__icon" style={{ background: `${f.color}18`, color: f.color }}>
                <span>{f.emoji}</span>
              </div>
              <h3 className="whyus__card-title">{f.title}</h3>
              <p className="whyus__card-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
