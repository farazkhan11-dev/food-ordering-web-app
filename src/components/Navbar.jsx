import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {

  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/restaurants', label: 'Restaurants' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/cart', label: 'Cart' },
  ];


  
  function desktopLinkStyle({ isActive }) {
    if (isActive) {
      return 'font-medium text-sm transition-colors duration-200 text-[#FF4F1A] border-b-2 border-[#FF4F1A] pb-0.5';
    } else {
      return 'font-medium text-sm transition-colors duration-200 text-gray-600 hover:text-[#FF4F1A]';
    }
  }

  // Mobile link style — orange if active, gray if not
  function mobileLinkStyle({ isActive }) {
    if (isActive) {
      return 'font-medium text-sm text-[#FF4F1A]';
    } else {
      return 'font-medium text-sm text-gray-600';
    }
  }


  // HAMBURGER ICON
  let hamburgerIcon;
  if (menuOpen) {
    hamburgerIcon = (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  } else {
    hamburgerIcon = (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  }


  // MOBILE MENU DROPDOWN 
  // Only shown when hamburger is clicked
  let mobileMenu;
  if (menuOpen) {
    mobileMenu = (
      <div className="md:hidden bg-white border-t border-orange-100 px-4 py-4 flex flex-col gap-4">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMenuOpen(false)}
            className={mobileLinkStyle}
          >
            {label}
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍔</span>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: 'Playfair Display, serif', color: '#FF4F1A' }}
          >
            Foodie Hub
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={desktopLinkStyle}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Desktop Right Icons (Wishlist + Cart) ── */}
        <div className="hidden md:flex items-center gap-3">

          {/* Wishlist button with badge */}
          <button
            onClick={() => navigate('/wishlist')}
            className="relative text-xl p-2 hover:bg-orange-50 rounded-full transition-colors"
            title="Wishlist"
          >
            ❤️
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF4F1A] text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart button with badge */}
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 btn-primary relative"
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-[#1a1a2e] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

        </div>

        {/* ── Mobile Icons (Wishlist + Cart + Hamburger) ── */}
        <div className="flex md:hidden items-center gap-3">

          {/* Mobile wishlist button with badge */}
          <button onClick={() => navigate('/wishlist')} className="relative text-xl">
            ❤️
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF4F1A] text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Mobile cart button with badge */}
          <button onClick={() => navigate('/cart')} className="relative text-2xl">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF4F1A] text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger button — opens/closes mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {hamburgerIcon}
          </button>

        </div>

      </div>

      {/* ── Mobile Menu Dropdown ── */}
      {mobileMenu}

    </nav>
  );
}