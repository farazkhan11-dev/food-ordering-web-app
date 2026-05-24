import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();
  const { id, name, image, price, quantity } = item;

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
      
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-xl shrink-0"/>

      
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[#1a1a2e] truncate">{name}</h4>
        <p className="text-[#FF4F1A] font-semibold text-sm mt-0.5">
          ${(price * quantity).toFixed(2)}
        </p>
        <p className="text-xs text-gray-400">${price.toFixed(2)} each</p>
      </div>

      {/* Qty Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => decreaseQty(id)}
          className="w-8 h-8 rounded-full bg-orange-100 text-[#FF4F1A] font-bold flex items-center justify-center hover:bg-[#FF4F1A] hover:text-white transition-colors"
        >
          −
        </button>
        <span className="font-bold text-[#1a1a2e] w-4 text-center">{quantity}</span>
        <button
          onClick={() => increaseQty(id)}
          className="w-8 h-8 rounded-full bg-orange-100 text-[#FF4F1A] font-bold flex items-center justify-center hover:bg-[#FF4F1A] hover:text-white transition-colors"
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(id)}
        className="text-gray-300 hover:text-red-500 transition-colors text-lg ml-2"
        title="Remove item"
      >
        ✕
      </button>
    </div>
  );
}