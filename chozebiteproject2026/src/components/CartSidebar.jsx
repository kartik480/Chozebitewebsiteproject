import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartSidebar.css';

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  const shipping = cartTotal >= 30 ? 0 : 4.99;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            className="cart-sidebar"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="cart-sidebar__header">
              <div>
                <h2 className="cart-sidebar__title">Your Cart</h2>
                <p className="cart-sidebar__count">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
              </div>
              <button className="cart-sidebar__close" onClick={() => setIsCartOpen(false)}>
                <FiX size={22} />
              </button>
            </div>

            {cartTotal < 30 && cartTotal > 0 && (
              <div className="cart-sidebar__free-ship">
                <span>Add <strong>${(30 - cartTotal).toFixed(2)}</strong> more for free shipping! 🚚</span>
                <div className="cart-sidebar__progress">
                  <div style={{ width: `${(cartTotal / 30) * 100}%` }} className="cart-sidebar__progress-fill" />
                </div>
              </div>
            )}

            <div className="cart-sidebar__items">
              {cart.length === 0 ? (
                <div className="cart-sidebar__empty">
                  <FiShoppingBag size={56} />
                  <p>Your cart is empty</p>
                  <button className="cart-sidebar__shop-btn" onClick={() => setIsCartOpen(false)}>
                    <Link to="/products">Start Shopping</Link>
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div
                    key={item.id}
                    className="cart-item"
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <img src={item.image} alt={item.name} className="cart-item__img" />
                    <div className="cart-item__info">
                      <p className="cart-item__name">{item.name}</p>
                      <p className="cart-item__weight">{item.weight}</p>
                      <div className="cart-item__row">
                        <span className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                        <div className="cart-item__qty">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus size={12} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus size={12} /></button>
                        </div>
                        <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-sidebar__footer">
                <div className="cart-sidebar__row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="cart-sidebar__row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="cart-sidebar__free">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="cart-sidebar__divider" />
                <div className="cart-sidebar__row cart-sidebar__row--total">
                  <span>Total</span>
                  <span>${(cartTotal + shipping).toFixed(2)}</span>
                </div>
                <Link
                  to="/cart"
                  className="cart-sidebar__checkout-btn"
                  onClick={() => setIsCartOpen(false)}
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
