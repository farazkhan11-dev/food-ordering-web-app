import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';


const DELIVERY_FEE = 2.99;

export default function Cart() {

  const { cartItems, totalPrice, clearCart } = useCart();

  const navigate = useNavigate();

  const isEmpty = cartItems.length === 0;

  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + DELIVERY_FEE + tax;


  // ITEM COUNT LABEL
  let itemCountLabel;
  if (cartItems.length === 1) {
    itemCountLabel = '1 item';
  } else {
    itemCountLabel = cartItems.length + ' items';
  }


  // EMPTY CART
  // If cart is empty, show a message and button to browse restaurants
  if (isEmpty) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">

        
        <div className="mb-8">
          <p className="text-[#FF4F1A] text-sm font-semibold uppercase tracking-widest mb-1">
            Your Order
          </p>
          <h1 className="section-title">Cart</h1>
        </div>

        
        <div className="text-center py-24">
          <p className="text-7xl mb-4">🛒</p>
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
          <button onClick={() => navigate('/restaurants')} className="btn-primary">
            Browse Restaurants
          </button>
        </div>

      </div>
    );
  }


  // CART WITH ITEMS
  // If cart has items, show the cart list and order summary
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      
      <div className="mb-8">
        <p className="text-[#FF4F1A] text-sm font-semibold uppercase tracking-widest mb-1">
          Your Order
        </p>
        <h1 className="section-title">Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      
        <div className="lg:col-span-2 space-y-4">

          {/* Item count and Clear All button */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">{itemCountLabel}</span>
            <button
              onClick={clearCart}
              className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* List of cart items */}
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

        </div>

        
        <div>
          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">

            <h3
              className="text-xl font-bold text-[#1a1a2e] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Order Summary
            </h3>

            {/* Price breakdown */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold">${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-[#1a1a2e] font-bold text-base">
                <span>Total</span>
                <span className="text-[#FF4F1A]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            
            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full mt-6 text-center"
            >
              Proceed to Checkout
            </button>

            
            <button
              onClick={() => navigate('/restaurants')}
              className="w-full mt-3 text-sm text-gray-400 hover:text-[#FF4F1A] transition-colors text-center"
            >
              + Add More Items
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}