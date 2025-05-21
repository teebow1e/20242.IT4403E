import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/UserSlice';

function WaiterHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    auth.signOut();
    dispatch(logout());
  };

  // Handle scroll event to create sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`top-0 w-full z-50 transition-all duration-300 ${'bg-white shadow-md'
        }`}
    >
      <nav className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.svg" alt="Meowbucks" className="h-16 w-16" />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center">
            {/* Waiter Action */}
            <div className="flex items-center">
              <Link
                to="/"
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default WaiterHeader;
