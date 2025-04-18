import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/UserSlice';
import { auth } from '../Firebase';

function Header({ menuPage }) {
  const user = useSelector(selectUser);

  const handleLogout = () => {
    auth.signOut();
  }

  useEffect(() => {
    const btn = document.getElementById('menu-btn');
    const nav = document.getElementById('menu');

    function navToggle() {
      btn.classList.toggle('open');
      nav.classList.toggle('translate-x-full');
      document.body.classList.toggle('overflow-hidden');
    }

    btn.addEventListener('click', navToggle);

    return () => {
      btn.removeEventListener('click', navToggle);
    };
  }, []);

  return (
    <header>
      <nav className="w-full bg-white py-5 shadow-md h-auto header-box-shadow">
        <div className="flex justify-between items-center max-w-[1440px] mx-auto px-4">
          <div>
            <Link to="/">
              <img src="/logo.svg" alt="Starbucks" className="w-[50px] h-[50px]"/>
            </Link>
          </div>

          <ul className="md:flex items-center uppercase font-bold flex-1 ml-5-nav-left">
            <li className="mx-4 hover:text-green-700"><Link to="/menu">Menu</Link></li>
            <li className="mx-4 hover:text-green-700"><Link to="#">Rewards</Link></li>
            <li className="mx-4 hover:text-green-700"><Link to="#">Gift Cards</Link></li>
          </ul>

          <ul className="md:flex items-center">
            {!user ? (
              <>
                <li>
                  <Link to="/account/signin" className="inline-block border border-black rounded-full px-4 py-2 leading-tight text-center hover:bg-black/5">Sign in</Link>
                </li>
                <li>
                  <Link to="/account/create" className="inline-block bg-black text-white border border-black rounded-full px-4 py-2 leading-tight text-center hover:bg-gray-800">Join now</Link>
                </li>
              </>
            ) : (
              <>
                {!menuPage ? (
                  <>
                    <li>
                      <Link to="/menu" className="inline-block border border-black rounded-full px-4 py-2 leading-tight text-center hover:bg-black/5">Order Now</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/" className="inline-block bg-black text-white border border-black rounded-full px-4 py-2 leading-tight text-center hover:bg-gray-800" onClick={handleLogout}>Logout</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>

          {/* Hamburger Menu */}
          <button type="button" className="md:hidden relative w-6 h-6 bg-transparent border-none z-10 transition-all duration-250" id="menu-btn">
            <span className="absolute top-0 left-0 w-6 h-0.5 bg-black transform rotate-0 transition-all duration-500"></span>
            <span className="absolute top-0 left-0 w-6 h-0.5 bg-black transform translate-y-2 transition-all duration-500"></span>
            <span className="absolute top-0 left-0 w-6 h-0.5 bg-black transform translate-y-4 rotate-0 transition-all duration-500"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div id="menu" className="fixed top-[85px] right-0 bg-white w-[90%] h-full px-8 py-6 shadow-inner transform translate-x-full transition-all duration-300">
        <ul className="border-b border-gray-400 pb-3 mb-8 leading-loose">
          <li className="text-xl hover:text-green-700"><Link to="#">Menu</Link></li>
          <li className="text-xl hover:text-green-700"><Link to="#">Rewards</Link></li>
          <li className="text-xl hover:text-green-700"><Link to="#">Gift Cards</Link></li>
        </ul>
        <div className="flex gap-2.5 mt-5">
          <Link to="/account/signin" className="inline-block border border-black rounded-full px-4 py-2 leading-tight text-center hover:bg-black/5">Sign in</Link>
          <Link to="/account/create" className="inline-block bg-black text-white border border-black rounded-full px-4 py-2 leading-tight text-center hover:bg-gray-800">Join now</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
