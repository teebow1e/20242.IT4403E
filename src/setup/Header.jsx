import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/UserSlice';
import { auth } from '../firebase';
import CartIcon from '../components/CartIcon';
import UserMenu from '../components/UserMenu';
import InstallPrompt from '../components/InstallPrompt';
import { logout } from '../features/UserSlice';
import { getRedirectByRole } from '../utils/RoleBasedRedirect';

function Header({ menuPage }) {
  const user = useSelector(selectUser);
  const location = useLocation();
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
    <>
      {user?.role === "waiter" || user?.role === "admin"
        ?
        <header
          className={`top-0 w-full z-50 transition-all duration-300 ${'bg-white shadow-md'}`}
        >
          <nav className="px-4 md:px-8 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              {/* Logo */}
              <div className="flex items-center">
                <img src="/logo.svg" alt="Meowbucks" className="h-16 w-16" />
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-3">
                {/* Install App Button for Waiter/Admin */}
                <InstallPrompt />

                {/* Back to Role Specific Page */}
                <Link
                  to={getRedirectByRole(user.role)}
                  className="px-4 py-1.5 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition"
                >
                  Go back
                </Link>
              </div>
            </div>
          </nav>
        </header>
        :
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
                        to="/menu"
                        className={`text-sm font-bold uppercase tracking-wide ${location.pathname.includes('/menu')
                          ? 'text-[#006241]'
                          : 'text-[#212529] hover:text-[#006241]'
                          }`}
                      >
                        Menu
                      </Link>
                    </li>
                    <li className="mr-6">
                      <Link
                        to="#"
                        className="text-sm font-bold uppercase tracking-wide text-[#212529] hover:text-[#006241]"
                      >
                        Rewards
                      </Link>
                    </li>
                    <li className="mr-6">
                      <Link
                        to="#"
                        className="text-sm font-bold uppercase tracking-wide text-[#212529] hover:text-[#006241]"
                      >
                        Gift Cards
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center">
                {/* Store Locator */}
                <Link
                  to="#"
                  className="hidden md:flex items-center mr-4 text-[#212529] hover:text-[#006241]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm">Find a store</span>
                </Link>

                {/* Install App Button - Desktop */}
                <div className="hidden md:block mr-4">
                  <InstallPrompt />
                </div>

                {/* User Actions */}
                <div className="flex items-center">
                  {user && (
                    <div className="mr-4">
                      <CartIcon />
                    </div>
                  )}

                  {!user ? (
                    <div className="flex items-center">
                      <Link
                        to="/account/signin"
                        className="mr-3 px-4 py-1.5 text-sm font-medium border border-black rounded-full hover:bg-gray-100 transition"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/account/create"
                        className="px-4 py-1.5 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition"
                      >
                        Join now
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {!menuPage ? (
                        <Link
                          to="/menu"
                          className="mr-3 px-4 py-1.5 text-sm font-medium bg-[#006241] text-white rounded-full hover:bg-[#1e3932] transition"
                        >
                          Order now
                        </Link>
                      ) : null}
                      <UserMenu />
                    </div>
                  )}
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
                    to="/menu"
                    className="text-xl font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Menu
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="#"
                    className="text-xl font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Rewards
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="#"
                    className="text-xl font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Gift Cards
                  </Link>
                </li>
              </ul>

              <div className="flex flex-col">
                <Link
                  to="#"
                  className="flex items-center mb-6 text-[#212529]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Find a store</span>
                </Link>

                {/* Install App Button - Mobile */}
                <div className="mb-6">
                  <InstallPrompt />
                </div>

                <div className="flex mt-4 gap-3">
                  {!user ? (
                    <>
                      <Link
                        to="/account/signin"
                        className="flex-1 px-4 py-2 text-center border border-black rounded-full hover:bg-gray-100 transition"
                        onClick={toggleMobileMenu}
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/account/create"
                        className="flex-1 px-4 py-2 text-center bg-black text-white rounded-full hover:bg-gray-800 transition"
                        onClick={toggleMobileMenu}
                      >
                        Join now
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/cart"
                        className="flex-1 px-4 py-2 text-center border border-black rounded-full hover:bg-gray-100 transition"
                        onClick={toggleMobileMenu}
                      >
                        View cart
                      </Link>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      }
    </>
  );
}

export default Header;
