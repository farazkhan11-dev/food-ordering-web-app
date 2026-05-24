import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { restaurants, categories } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Restaurants() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const searchFromURL = searchParams.get('search');
    const categoryFromURL = searchParams.get('category');
    if (searchFromURL) setSearch(searchFromURL);
    if (categoryFromURL) setSelectedCategory(categoryFromURL);
  }, [searchParams]);

  const filtered = restaurants.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'All' || r.category === selectedCategory;
    return matchSearch && matchCategory;
  });


  //  RESULT COUNT LABEL
  let resultLabel;
  if (filtered.length === 1) {
    resultLabel = '1 restaurant found';
  } else {
    resultLabel = filtered.length + ' restaurants found';
  }


  // CLEAR FILTERS
  // Resets search and category back to default
  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
  };


  // RESTAURANT GRID OR EMPTY MESSAGE
  let restaurantGrid;
  if (filtered.length > 0) {
    restaurantGrid = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r, i) => (
          <RestaurantCard key={r.id} restaurant={r} index={i} />
        ))}
      </div>
    );
  } else {
    restaurantGrid = (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-6xl mb-4">🍽️</p>
        <h3 className="text-xl font-bold text-gray-600 mb-2">No results found</h3>
        <p className="text-gray-400 text-sm">Try a different search or category.</p>
        <button onClick={clearFilters} className="btn-primary mt-6">
          Clear Filters
        </button>
      </motion.div>
    );
  }
  
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

    
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-[#FF4F1A] text-sm font-semibold uppercase tracking-widest mb-1">Explore</p>
        <h1 className="section-title">All Restaurants</h1>
        <p className="text-gray-500 mt-1">{resultLabel}</p>
      </motion.div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-lg">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search by name or cuisine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF4F1A] text-sm shadow-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={(cat) => setSelectedCategory(cat)}
        />
      </div>

      {/* Restaurant Grid or Empty Message */}
      {restaurantGrid}

    </div>
  );
}