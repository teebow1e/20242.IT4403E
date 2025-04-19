import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/UserSlice';
import { auth } from '../firebase';

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
      <nav className="w-full bg-white p-5 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <Link to="/">
              <img src="/logo.svg" alt="Starbucks" className="w-12 h-12" />
            </Link>
          </div>

          <ul className="flex items-center uppercase flex-1 ml-5">
            <li className="mx-4 font-bold"><Link to="/menu" className="no-underline hover:text-green-700">Menu</Link></li>
            <li className="mx-4 font-bold"><Link to="#" className="no-underline hover:text-green-700">Rewards</Link></li>
            <li className="mx-4 font-bold"><Link to="#" className="no-underline hover:text-green-700">Gift Cards</Link></li>
          </ul>

          <ul className="flex items-center">
            {!user ? (
              <>
                <li className="mx-4 font-bold">
                  <Link to="/account/signin" className="cursor-pointer inline-block border border-black rounded-full px-4 py-2 leading-tight text-center no-underline text-black hover:bg-black/5">Sign in</Link>
                </li>
                <li className="mx-1 font-bold">
                  <Link to="/account/create" className="cursor-pointer inline-block border border-black rounded-full px-4 py-2 leading-tight text-center no-underline bg-black text-white hover:bg-gray-800">Join now</Link>
                </li>
              </>
            ) : (
              <>
                {!menuPage ? (
                  <>
                    <li className="mx-4 font-bold">
                      <Link to="/menu" className="cursor-pointer inline-block border border-black rounded-full px-4 py-2 leading-tight text-center no-underline text-black hover:bg-black/5">Order Now</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="mx-4 font-bold">
                      <Link to="/" onClick={handleLogout} className="cursor-pointer inline-block border border-black rounded-full px-4 py-2 leading-tight text-center no-underline bg-black text-white hover:bg-gray-800">Logout</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>

          {/* Hamburger Menu */}
          <button type="button" className="relative w-6 h-6 z-10 transition-all hidden md:block cursor-pointer bg-transparent border-none" id="menu-btn">
            <span className="absolute top-0 left-0 w-6 h-0.5 bg-black transform rotate-0 transition-all duration-500 hamburger-top"></span>
            <span className="absolute top-0 left-0 w-6 h-0.5 bg-black transform translate-y-2 transition-all duration-500 hamburger-middle"></span>
            <span className="absolute top-0 left-0 w-6 h-0.5 bg-black transform translate-y-4 transition-all duration-500 hamburger-bottom"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="fixed top-[85px] right-0 bg-white text-black w-[90%] h-full p-8 shadow-inner transition-all duration-300 translate-x-full" id="menu">
        <ul className="leading-loose border-b border-gray-400 pb-3 mb-8">
          <li><Link to="#" className="no-underline text-xl hover:text-green-700">Menu</Link></li>
          <li><Link to="#" className="no-underline text-xl hover:text-green-700">Rewards</Link></li>
          <li><Link to="#" className="no-underline text-xl hover:text-green-700">Gift Cards</Link></li>
        </ul>
        <div className="mt-5 flex gap-3">
          <Link to="/account/signin" className="cursor-pointer inline-block border border-black rounded-full px-4 py-2 leading-tight text-center no-underline text-black hover:bg-black/5">Sign in</Link>
          <Link to="/account/create" className="cursor-pointer inline-block border border-black rounded-full px-4 py-2 leading-tight text-center no-underline bg-black text-white hover:bg-gray-800">Join now</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
