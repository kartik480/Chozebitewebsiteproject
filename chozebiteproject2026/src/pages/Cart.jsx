import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  const shipping = cartTotal >= 30 ? 0 : 4.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <motion.div
          className="cart-empty"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        >
          <div className="cart-empty__icon"><FiShoppingBag size={64} /></div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Let's fix that!</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-page__header">
          <Link to="/products" className="cart-page__back">
            <FiArrowLeft size={16} /> Continue Shopping
          </Link>
          <h1>Shopping Cart</h1>
          <button className="cart-page__clear" onClick={clearCart}>Clear all</button>
        </div>

        <div className="cart-page__layout">
          <div className="cart-page__items">
            {cart.map(item => (
              <motion.div
                key={item.id}
                className="cart-page-item"
                layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <img src={item.image} alt={item.name} className="cart-page-item__img" />
                <div className="cart-page-item__body">
                  <div className="cart-page-item__top">
                    <div>
                      <p className="cart-page-item__cat">{item.category}</p>
                      <h3 className="cart-page-item__name">{item.name}</h3>
                      <p className="cart-page-item__weight">{item.weight}</p>
                    </div>
                    <button
                      className="cart-page-item__remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <div className="cart-page-item__bottom">
                    <div className="cart-page-item__qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <FiMinus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <span className="cart-page-item__price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="cart-summary__title">Order Summary</h2>

            {cartTotal < 30 && (
              <div className="cart-summary__ship-notice">
                <p>Add <strong>${(30 - cartTotal).toFixed(2)}</strong> more for FREE shipping!</p>
                <div className="cart-summary__ship-bar">
                  <div style={{ width: `${Math.min((cartTotal / 30) * 100, 100)}%` }} />
                </div>
              </div>
            )}

            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Subtotal ({cart.reduce((s,i)=>s+i.quantity,0)} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="cart-summary__free">Free 🎉</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="cart-summary__row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="cart-summary__divider" />
            <div className="cart-summary__total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="cart-summary__checkout">
              Proceed to Checkout
            </button>

            <div className="cart-summary__trust">
              <span>🔒 Secure checkout</span>
              <span>🚚 Free returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
