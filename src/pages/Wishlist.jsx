import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';
import StarRating from '../components/StarRating';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  // Remove restaurant from wishlist and show notification
  const handleRemove = (restaurant) => {
    removeFromWishlist(restaurant.id);
    toast.error(`💔 Removed ${restaurant.name} from wishlist`);
  };

  // Show "1 restaurant" or "3 restaurants"
  let savedLabel;
  if (wishlist.length === 1) {
    savedLabel = '1 restaurant saved';
  } else {
    savedLabel = wishlist.length + ' restaurants saved';
  }

  // If wishlist is empty, show empty message
  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[#FF4F1A] text-sm font-semibold uppercase tracking-widest mb-1">Saved</p>
          <h1 className="section-title">My Wishlist</h1>
          <p className="text-gray-500 mt-1">{savedLabel}</p>
        </div>

        {/* Empty message */}
        <div className="text-center py-24">
          <p className="text-7xl mb-4">🤍</p>
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-8">Save your favourite restaurants for later.</p>
          <button onClick={() => navigate('/restaurants')} className="btn-primary">
            Browse Restaurants
          </button>
        </div>

      </div>
    );
  }

  // If wishlist has items, show the grid
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[#FF4F1A] text-sm font-semibold uppercase tracking-widest mb-1">Saved</p>
        <h1 className="section-title">My Wishlist</h1>
        <p className="text-gray-500 mt-1">{savedLabel}</p>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((restaurant, i) => (
          <motion.div
            key={restaurant.id}
            className="card group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >

            {/* Image */}
            <div
              className="relative overflow-hidden h-44"
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#FF4F1A] text-white badge">
                {restaurant.category}
              </span>

              {/* Remove from wishlist button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(restaurant);
                }}
                className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-red-50 transition-colors"
                title="Remove from wishlist"
              >
                ❤️
              </button>
            </div>

            {/* Content */}
            <div
              className="p-4"
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
              <h3 className="font-bold text-lg text-[#1a1a2e] group-hover:text-[#FF4F1A] transition-colors">
                {restaurant.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{restaurant.description}</p>
              <div className="mt-3">
                <StarRating rating={restaurant.rating} />
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">🕒 {restaurant.deliveryTime}</span>
                <span className="text-xs font-semibold text-[#FF4F1A]">View Menu →</span>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
}