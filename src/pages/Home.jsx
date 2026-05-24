import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';

const foodCategories = [
  { icon: '🍔', label: 'Burgers' },
  { icon: '🍕', label: 'Pizza' },
  { icon: '🍣', label: 'Sushi' },
  { icon: '🌮', label: 'Mexican' },
  { icon: '🍝', label: 'Pasta' },
  { icon: '🍛', label: 'Curry' },
];

const popularDishes = [
  {
    name: 'BBQ Bacon Burger',
    restaurant: 'Burger Barn',
    price: '$12.49',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&auto=format&fit=crop',
  },
  {
    name: 'Pepperoni Feast',
    restaurant: 'Pizza Palace',
    price: '$14.99',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&auto=format&fit=crop',
  },
  {
    name: 'Dragon Roll',
    restaurant: 'Sushi Spot',
    price: '$16.99',
    image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400&auto=format&fit=crop',
  },
  {
    name: 'Mutton Handi',
    restaurant: 'Lahore grill',
    price: '$13.99',
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop",
  },
  {
    name: 'Margherita Pasta',
    restaurant: 'Italian Bistro',
    price: '$11.99',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&auto=format&fit=crop',
  },
  {
    name: 'Crispy Fried Chicken',
    restaurant: 'Southern Kitchen',
    price: '$15.49',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400&auto=format&fit=crop',
  },
  {
    name: 'Loaded Nachos',
    restaurant: 'Tex Mex Grill',
    price: '$10.99',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&auto=format&fit=crop',
  },
  {
    name: 'Chocolate Lava Cake',
    restaurant: 'Sweet Treats',
    price: '$8.49',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/restaurants?search=${searchQuery}`);
  };

  return (
    <div>
      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)', /* inline style, no change needed */
        }}
      >


        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FF4F1A, transparent)' }}></div>
        <div className="absolute top-0 left-0 w-52 h-52 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FFB347, transparent)' }}></div>

        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-block bg-[#FF4F1A]/20 text-[#FF4F1A] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
              🔥 Fast Delivery Available
            </span>
            <h1
              className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Crave It.
              <br />
              <span className="text-[#FF4F1A]">Order It.</span>
              <br />
              Feast On It.
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Discover the best restaurants near you and get your favourite meals delivered hot and fresh.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Search restaurants or food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4F1A] text-white"
              />
              <button type="submit" className="btn-primary px-6 text-white">
                Search
              </button>
            </form>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            className="hidden md:flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-[#FF4F1A]/20 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop"
                alt="Hero food"
                className="relative w-full h-full object-cover rounded-full border-4 border-[#FF4F1A]/30 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Food Categories ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#FF4F1A] text-sm font-semibold uppercase tracking-widest mb-1">Browse by</p>
            <h2 className="section-title">Food Categories</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {foodCategories.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => navigate(`/restaurants?category=${label}`)}
              className="flex flex-col items-center gap-2 bg-white hover:bg-[#FF4F1A] group rounded-2xl py-5 px-3 shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <span className="text-3xl">{icon}</span>
              <span className="text-xs font-semibold text-gray-600 group-hover:text-white transition-colors">
                {label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Restaurants ── */}
      <section className="max-w-7xl mx-auto px-4 py-6 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#FF4F1A] text-sm font-semibold uppercase tracking-widest mb-1">Top Picks</p>
            <h2 className="section-title">Featured Restaurants</h2>
          </div>
          <button
            onClick={() => navigate('/restaurants')}
            className="btn-outline text-sm hidden md:block"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.slice(0, 6).map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <button onClick={() => navigate('/restaurants')} className="btn-outline">
            View All Restaurants
          </button>
        </div>
      </section>

      {/* ── Popular Dishes ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-[#FF4F1A] text-sm font-semibold uppercase tracking-widest mb-1">Must Try</p>
            <h2 className="section-title">Popular Dishes</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.map((dish) => (
              <div key={dish.name} className="card group">
                <div className="overflow-hidden h-40">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-[#1a1a2e]">{dish.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{dish.restaurant}</p>
                  <p className="text-[#FF4F1A] font-bold mt-2">{dish.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="py-20 text-center"
        style={{
          background: 'linear-gradient(135deg, #FF4F1A, #FFB347)',
        }}
      >
        <h2
          className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Hungry? Let's Fix That.
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Explore hundreds of restaurants and dishes.
        </p>
        <button
          onClick={() => navigate('/restaurants')}
          className="bg-white text-[#FF4F1A] font-bold px-10 py-3 rounded-full hover:bg-[#1a1a2e] hover:text-white transition-all duration-200 shadow-lg"
        >
          Order Now
        </button>
      </section>
    </div>
  );
}