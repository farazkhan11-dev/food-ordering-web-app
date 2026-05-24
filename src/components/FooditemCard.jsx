import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

export default function FoodItemCard({ item }) {

  // Get cart functions from context
  const { addToCart, cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  // Destructure item details
  const { id, name, description, price, image } = item;

  // Check if this item is already in the cart
  const cartItem = cartItems.find((i) => i.id === id);


  // ADD TO CART
  // Adds the item and shows a success notification
  const handleAdd = () => {
    addToCart(item);
    toast.success(`🛒 ${name} added to cart!`);
  };


  // DECREASE QUANTITY
  const handleDecrease = () => {
    if (cartItem.quantity === 1) {
      removeFromCart(id);
      toast.error(`🗑️ ${name} removed from cart`);
    } else {
      decreaseQty(id);
    }
  };


  
  // Show + / quantity / - buttons if item is in cart
  // Show "Add to Cart" button if item is not in cart
  let cartControls;
  if (cartItem) {
    cartControls = (
      <div className="flex items-center gap-3">

        {/* Decrease or remove button */}
        <button
          onClick={handleDecrease}
          className="w-8 h-8 rounded-full bg-orange-100 text-[#FF4F1A] font-bold flex items-center justify-center hover:bg-[#FF4F1A] hover:text-white transition-colors"
        >
          −
        </button>

        {/* Current quantity */}
        <span className="font-bold text-[#1a1a2e] w-4 text-center">
          {cartItem.quantity}
        </span>

        
        <button
          onClick={() => increaseQty(id)}
          className="w-8 h-8 rounded-full bg-orange-100 text-[#FF4F1A] font-bold flex items-center justify-center hover:bg-[#FF4F1A] hover:text-white transition-colors"
        >
          +
        </button>

      </div>
    );
  } else {
    cartControls = (
      <button
        onClick={handleAdd}
        className="btn-primary w-full text-sm py-2"
      >
        + Add to Cart
      </button>
    );
  }


  
  return (
    <div className="card flex flex-col">

      
      <div className="relative overflow-hidden h-40">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        
        <span className="absolute bottom-2 right-2 bg-white text-[#FF4F1A] font-bold text-sm px-3 py-0.5 rounded-full shadow">
          ${price.toFixed(2)}
        </span>
      </div>

      {/* Food Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          
          <h4 className="font-bold text-[#1a1a2e]">{name}</h4>
          
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>
        </div>

        {/* Cart Controls */}
        <div className="mt-4">
          {cartControls}
        </div>
      </div>

    </div>
  );
}