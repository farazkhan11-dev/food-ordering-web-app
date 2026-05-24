import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './StarRating';

export default function RestaurantCard({ restaurant, index = 0 }) {

  // Used to go to a different page
  const navigate = useNavigate();

  // Get wishlist functions from context
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Destructure restaurant details
  const { id, name, category, image, rating, deliveryTime, description } = restaurant;


  // WISHLIST TOGGLE 
  // Add or remove restaurant from wishlist and show a notification
  const handleWishlist = (e) => {
    e.stopPropagation();

    const action = toggleWishlist(restaurant);

    if (action === 'added') {
      toast.success(`❤️ ${name} added to wishlist!`);
    } else {
      toast.error(`💔 ${name} removed from wishlist`);
    }
  };


  
  // Show filled heart if wishlisted, empty heart if not
  let wishlistIcon;
  if (isWishlisted(id)) {
    wishlistIcon = '❤️';
  } else {
    wishlistIcon = '🤍';
  }

  // Wishlist button title (tooltip text)
  let wishlistTitle;
  if (isWishlisted(id)) {
    wishlistTitle = 'Remove from wishlist';
  } else {
    wishlistTitle = 'Add to wishlist';
  }


  //  ANIMATION SETTINGS
  const animationInitial = { opacity: 0, y: 30 };
  const animationAnimate = { opacity: 1, y: 0 };
  const animationTransition = { duration: 0.4, delay: index * 0.08, ease: 'easeOut' };
  const animationHover = { y: -4, boxShadow: '0 20px 40px rgba(255,79,26,0.15)' };


  
  return (
    <motion.div
      className="card cursor-pointer group"
      onClick={() => navigate(`/restaurant/${id}`)}
      initial={animationInitial}
      animate={animationAnimate}
      transition={animationTransition}
      whileHover={animationHover}
    >

      {/* ── Restaurant Image ── */}
      <div className="relative overflow-hidden h-44">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category badge on image */}
        <span className="absolute top-3 left-3 bg-[#FF4F1A] text-white badge p-1 rounded-2xl">
          {category}
        </span>

        {/* Wishlist button on image */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:scale-110 transition-transform"
          title={wishlistTitle}
        >
          {wishlistIcon}
        </button>
      </div>

      {/* ── Restaurant Info ── */}
      <div className="p-4">

        <h3 className="font-bold text-lg text-[#1a1a2e] group-hover:text-[#FF4F1A] transition-colors duration-200">
          {name}
        </h3>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>

        <div className="mt-3">
          <StarRating rating={rating} />
        </div>

        {/* Delivery time and View Menu */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            🕒 {deliveryTime}
          </span>
          <span className="text-xs font-semibold text-[#FF4F1A]">View Menu →</span>
        </div>

      </div>

    </motion.div>
  );
}