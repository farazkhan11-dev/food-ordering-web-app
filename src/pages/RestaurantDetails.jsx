import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { restaurants } from '../data/restaurants';
import { foodItems } from '../data/foodItems';
import FoodItemCard from '../components/FoodItemCard';
import StarRating from '../components/StarRating';
import { useWishlist } from '../context/WishlistContext';

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === Number(id));
  const menu = foodItems[Number(id)] || [];

  const { toggleWishlist, isWishlisted } = useWishlist();

  // Get unique categories from menu and add 'All' at the start
  const menuCategories = ['All', ...new Set(menu.map((item) => item.category))];

  const [activeCategory, setActiveCategory] = useState('All');
  const [userRating, setUserRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // When user clicks a star rating
  const handleRate = (star) => {
    setUserRating(star);
    setRatingSubmitted(true);
    toast.success(`⭐ You rated ${restaurant.name} ${star} stars!`);
  };

  // When user clicks wishlist button
  const handleWishlist = () => {
    const action = toggleWishlist(restaurant);
    if (action === 'added') {
      toast.success(`❤️ ${restaurant.name} added to wishlist!`);
    } else {
      toast.error(`💔 ${restaurant.name} removed from wishlist`);
    }
  };

  // If restaurant not found, show error screen
  if (!restaurant) {
    return (
      <div className="text-center py-32">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Restaurant not found</h2>
        <button onClick={() => navigate('/restaurants')} className="btn-primary">
          Back to Restaurants
        </button>
      </div>
    );
  }

  // Filter menu by selected category
  let filteredMenu;
  if (activeCategory === 'All') {
    filteredMenu = menu;
  } else {
    filteredMenu = menu.filter((item) => item.category === activeCategory);
  }

  // Show "1 item" or "3 items"
  let itemCountLabel;
  if (filteredMenu.length === 1) {
    itemCountLabel = '1 item';
  } else {
    itemCountLabel = filteredMenu.length + ' items';
  }

  // Wishlist button icon and tooltip
  let wishlistIcon;
  let wishlistTitle;
  if (isWishlisted(restaurant.id)) {
    wishlistIcon = '❤️';
    wishlistTitle = 'Remove from wishlist';
  } else {
    wishlistIcon = '🤍';
    wishlistTitle = 'Add to wishlist';
  }

  // Category button style
  function getCategoryStyle(cat) {
    if (activeCategory === cat) {
      return 'px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 bg-[#FF4F1A] text-white shadow';
    } else {
      return 'px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 bg-white border border-gray-200 text-gray-600 hover:border-[#FF4F1A]';
    }
  }

  // Rating section — show thank you message or star rating
  let ratingSection;
  if (ratingSubmitted) {
    ratingSection = (
      <motion.p
        className="text-[#FF4F1A] font-semibold text-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        ✅ Thanks for rating {userRating}.0 stars!
      </motion.p>
    );
  } else {
    ratingSection = <StarRating rating={0} interactive onRate={handleRate} />;
  }

  // Food grid — show items or empty message
  let foodGrid;
  if (filteredMenu.length > 0) {
    foodGrid = (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07 } },
        }}
      >
        {filteredMenu.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
            }}
          >
            <FoodItemCard item={item} />
          </motion.div>
        ))}
      </motion.div>
    );
  } else {
    foodGrid = <p className="text-center text-gray-400 py-16">No items in this category.</p>;
  }

  return (
    <div>
      {/* Banner */}
      <motion.div
        className="relative h-56 md:h-72 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img src={restaurant.banner} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate('/restaurants')}
          className="absolute top-4 left-4 bg-white/90 hover:bg-white text-[#1a1a2e] font-semibold text-sm px-4 py-2 rounded-full shadow transition-all"
        >
          ← Back
        </button>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow transition-all hover:scale-110"
          title={wishlistTitle}
        >
          {wishlistIcon}
        </button>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-end justify-between">
            <div>
              <span className="badge bg-[#FF4F1A] text-white mb-2 inline-block p-1 rounded-2xl">
                {restaurant.category}
              </span>
              <h1
                className="text-3xl md:text-4xl font-extrabold text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {restaurant.name}
              </h1>
              <p className="text-gray-300 text-sm mt-1">{restaurant.description}</p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1 text-white">
              <span className="text-sm text-gray-300">🕒 {restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rating Section */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="bg-white rounded-2xl shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">Overall Rating</p>
            <StarRating rating={restaurant.rating} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">Rate this Restaurant</p>
            {ratingSection}
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1a1a2e]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Menu
          </h2>
          <span className="text-sm text-gray-400">{itemCountLabel}</span>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={getCategoryStyle(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        {foodGrid}
      </div>
    </div>
  );
}