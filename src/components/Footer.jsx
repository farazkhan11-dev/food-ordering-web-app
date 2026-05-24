import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300 pt-14 pb-6 mt-20">
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🍔</span>

            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              FeastRush
            </span>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Delicious food delivered to your doorstep.
            Fast, fresh, and always flavourful.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-xl">

            <FaFacebook className="cursor-pointer hover:text-[#FF4F1A] hover:scale-110 transition duration-300" />

            <FaInstagram className="cursor-pointer hover:text-[#FF4F1A] hover:scale-110 transition duration-300" />

            <FaTwitter className="cursor-pointer hover:text-[#FF4F1A] hover:scale-110 transition duration-300" />

            <FaLinkedin className="cursor-pointer hover:text-[#FF4F1A] hover:scale-110 transition duration-300" />

          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
            Quick Links
          </h4>

          <ul className="space-y-2 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/restaurants', label: 'Restaurants' },
              { to: '/cart', label: 'Cart' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-[#FF4F1A] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
            Contact
          </h4>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>📧 farazkhan3456@gmail.com</li>
            <li>📞 +1 (800) 123-4567</li>
            <li>📍 123 Food Street, Flavour City</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} FeastRush. Built by FarazAhmad
      </div>

    </footer>
  );
}