import { motion } from 'framer-motion';
import '../styles/Testimonials.css';

const reviews = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Fitness Coach',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    rating: 5,
    text: "The almond mix is absolutely incredible! I order it every single week. Best snack I've ever had — wholesome and so flavourful.",
  },
  {
    id: 2,
    name: 'James Okafor',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    rating: 5,
    text: "Lightning fast delivery and everything arrived fresh. The dark chocolate bites are dangerously good — had to re-order the same day!",
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    rating: 5,
    text: "I was skeptical at first but Choze Bite has completely replaced my grocery snack run. The quality is unmatched and the packaging is gorgeous.",
  },
  {
    id: 4,
    name: 'Carlos Rivera',
    role: 'Chef',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    rating: 5,
    text: "As a chef, I'm very picky about ingredients. These are the real deal — premium sourcing shows in every bite. Highly recommend the nut selection.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <p className="section-label">❤️ Customer Love</p>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't take our word for it — hear from the people who snack with us daily.
          </p>
        </div>

        <div className="testimonials__grid">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="review-card__stars">
                {'⭐'.repeat(r.rating)}
              </div>
              <p className="review-card__text">"{r.text}"</p>
              <div className="review-card__author">
                <img src={r.avatar} alt={r.name} className="review-card__avatar" />
                <div>
                  <p className="review-card__name">{r.name}</p>
                  <p className="review-card__role">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
