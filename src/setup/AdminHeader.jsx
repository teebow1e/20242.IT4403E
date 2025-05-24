import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { logout } from '../features/UserSlice';

function AdminHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <header
        className={`top-0 w-full z-50 transition-all duration-300 ${'bg-white shadow-md'}`}
    >
        <nav className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center">
            <Link to="/" className="mr-4">
                <img src="/logo.svg" alt="Meowbucks" className="h-16 w-16" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex">
                <ul className="flex items-center">
                <li className="mr-6">
                    <Link
                    to="/admin/manage-users"
                    className={`text-sm font-bold uppercase tracking-wide ${location.pathname.includes('/admin/manage-users')
                        ? 'text-[#006241]'
                        : 'text-[#212529] hover:text-[#006241]'
                        }`}
                    >
                    Manage users
                    </Link>
                </li>
                <li className="mr-6">
                    <Link
                    to="#"
                    className="text-sm font-bold uppercase tracking-wide text-[#212529] hover:text-[#006241]"
                    >
                    Manage products
                    </Link>
                </li>
                </ul>
            </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center">
            {/* Admin Actions */}
            <div className="flex items-center">
                <Link
                    to="/"
                    onClick={handleLogout}
                    className="px-4 py-1.5 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition"
                    >
                    Sign out
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden ml-4 focus:outline-none"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                <div
                className={`w-6 h-5 flex flex-col justify-between relative ${mobileMenuOpen ? 'transform' : ''
                    }`}
                >
                <span
                    className={`w-6 h-0.5 bg-black transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                ></span>
                <span
                    className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''
                    }`}
                ></span>
                <span
                    className={`w-6 h-0.5 bg-black transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                ></span>
                </div>
            </button>
            </div>
        </div>
        </nav>

        {/* Mobile Menu */}
        <div
        className={`fixed top-20 left-0 right-0 bottom-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
        <div className="p-6">
            <ul className="mb-6 border-b border-gray-200 pb-6">
            <li className="mb-4">
                <Link
                to="/admin/manage-users"
                className="text-xl font-medium"
                onClick={toggleMobileMenu}
                >
                Manage users
                </Link>
            </li>
            <li className="mb-4">
                <Link
                to="#"
                className="text-xl font-medium"
                onClick={toggleMobileMenu}
                >
                Manage products
                </Link>
            </li>
            </ul>

            <div className="flex flex-col">
            <div className="flex mt-4 gap-3">
                <Link
                    to="/"
                    onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                    }}
                    className="flex-1 px-4 py-2 text-center bg-black text-white rounded-full hover:bg-gray-800 transition"
                    >
                    Sign out
                </Link>
            </div>
            </div>
        </div>
        </div>
    </header>
  );
}

export default AdminHeader;
