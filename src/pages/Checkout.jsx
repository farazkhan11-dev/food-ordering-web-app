import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Fixed delivery fee
const DELIVERY_FEE = 2.99;

// List of payment options
const paymentMethods = [
  { id: 'card',   label: '💳 Credit / Debit Card' },
  { id: 'cash',   label: '💵 Cash on Delivery' },
  { id: 'wallet', label: '📱 Digital Wallet' },
];

// List of form fields for delivery information
const formFields = [
  { name: 'name',    label: 'Full Name',       placeholder: 'John Doe',          colSpan: false },
  { name: 'email',   label: 'Email Address',   placeholder: 'john@example.com',  colSpan: false },
  { name: 'phone',   label: 'Phone Number',    placeholder: '+1 234 567 8900',   colSpan: false },
  { name: 'address', label: 'Street Address',  placeholder: '123 Main Street',   colSpan: true  },
  { name: 'city',    label: 'City',            placeholder: 'New York',          colSpan: false },
  { name: 'zip',     label: 'ZIP Code',        placeholder: '10001',             colSpan: false },
];

export default function Checkout() {

  
  const navigate = useNavigate();

  // Get cart data and clearCart function from context
  const { cartItems, totalPrice, clearCart } = useCart();


  
  // Stores what the user types in each input field
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  // Stores the selected payment method
  const [payment, setPayment] = useState('card');

  // True when order has been placed successfully
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Stores any validation error messages
  const [errors, setErrors] = useState({});


  

  // Tax is 8% of total price
  const tax = totalPrice * 0.08;

  // Grand total = subtotal + delivery fee + tax
  const grandTotal = totalPrice + DELIVERY_FEE + tax;


  //  HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const fieldName  = e.target.name;
    const fieldValue = e.target.value;

    // Update the form with the new value
    setForm({ ...form, [fieldName]: fieldValue });

    // Clear the error for this field if it exists
    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: '' });
    }
  };


  // VALIDATE FORM 
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim())    newErrors.name    = 'Full name is required';
    if (!form.email.trim())   newErrors.email   = 'Email is required';
    if (!form.phone.trim())   newErrors.phone   = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim())    newErrors.city    = 'City is required';
    if (!form.zip.trim())     newErrors.zip     = 'ZIP code is required';

    return newErrors;
  };


  // PLACE ORDER 
  // Validates the form and places the order if everything is correct
  const handlePlaceOrder = () => {

    // If cart is empty, go to restaurants page
    if (cartItems.length === 0) {
      navigate('/restaurants');
      return;
    }

    // Check for validation errors
    const validation = validate();
    const hasErrors  = Object.keys(validation).length > 0;

    if (hasErrors) {
      // Show errors and stop
      setErrors(validation);
      return;
    }

    // All good — clear cart and show success screen
    clearCart();
    setOrderPlaced(true);
  };


  
  // Show this screen after order is placed successfully
  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-6 animate-bounce">🎉</div>
        <h2
          className="text-4xl font-extrabold text-[#1a1a2e] mb-3"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Order Placed!
        </h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          Thank you, <strong>{form.name}</strong>! Your order is being prepared and will arrive soon.
        </p>
        <div className="bg-[#FF4F1A]/10 rounded-2xl px-8 py-4 mb-8 text-[#FF4F1A] font-bold text-lg">
          Estimated delivery: 30–45 min 🕒
        </div>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }


  // CHECKOUT FORM 
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[#FF4F1A] text-sm font-semibold uppercase tracking-widest mb-1">
          Almost there!
        </p>
        <h1 className="section-title">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

    
        <div className="lg:col-span-2 space-y-8">

          {/* Delivery Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3
              className="font-bold text-[#1a1a2e] text-lg mb-5"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Delivery Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formFields.map(({ name, label, placeholder, colSpan }) => {

                // Input border — red if there's an error, gray if not
                let inputBorder;
                if (errors[name]) {
                  inputBorder = 'border-red-400';
                } else {
                  inputBorder = 'border-gray-200';
                }

                return (
                  <div key={name} className={colSpan ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F1A] transition ${inputBorder}`}
                    />
                    {/* Show error message if field has an error */}
                    {errors[name] && (
                      <p className="text-red-400 text-xs mt-1">{errors[name]}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3
              className="font-bold text-[#1a1a2e] text-lg mb-5"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Payment Method
            </h3>

            <div className="space-y-3">
              {paymentMethods.map((method) => {

                // Highlight selected payment method with orange border
                let methodStyle;
                if (payment === method.id) {
                  methodStyle = 'border-[#FF4F1A] bg-orange-50';
                } else {
                  methodStyle = 'border-gray-100 hover:border-gray-300';
                }

                return (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${methodStyle}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={payment === method.id}
                      onChange={() => setPayment(method.id)}
                      className="accent-[#FF4F1A]"
                    />
                    <span className="font-medium text-sm text-[#1a1a2e]">{method.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Card fields — only shown if card payment is selected */}
            {payment === 'card' && (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F1A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F1A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F1A]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        
        <div>
          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
            <h3
              className="text-xl font-bold text-[#1a1a2e] mb-5"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Order Summary
            </h3>

            {/* List of items in cart */}
            <div className="space-y-3 mb-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span className="truncate flex-1 mr-2">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1a1a2e] text-base pt-2 border-t">
                <span>Total</span>
                <span className="text-[#FF4F1A]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            
            <button
              onClick={handlePlaceOrder}
              className="btn-primary w-full mt-6 text-center"
            >
              Place Order 🎉
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}