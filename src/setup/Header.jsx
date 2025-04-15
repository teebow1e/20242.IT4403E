import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
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
      nav.classList.toggle('hidden');
      document.body.classList.toggle('no-scroll');
    }

    btn.addEventListener('click', navToggle);

    return () => {
      btn.removeEventListener('click', navToggle);
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/logo.svg" alt="Starbucks" />
            </Link>
          </div>

          <ul className="navbar-nav-left">
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="#">Rewards</Link></li>
            <li><Link to="#">Gift Cards</Link></li>
          </ul>

          <ul className="navbar-nav-right">
            {!user ? (
              <>
                <li>
                  <Link to="/account/signin" className="btn btn-dark-outline">Sign in</Link>
                </li>
                <li>
                  <Link to="/account/create" className="btn btn-dark">Join now</Link>
                </li>
              </>
            ) : (
              <>
                {!menuPage ? (
                  <>
                    <li>
                      <Link to="/menu" className="btn btn-dark-outline">Order Now</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/" className="btn btn-dark" onClick={handleLogout}>Logout</Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>

          {/* Hamburger Menu */}
          <button type="button" className="hamburger" id="menu-btn">
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu hidden" id="menu">
        <ul>
          <li><Link to="#">Menu</Link></li>
          <li><Link to="#">Rewards</Link></li>
          <li><Link to="#">Gift Cards</Link></li>
        </ul>

        <div className="mobile-menu-bottom">
          <Link to="/account/signin" className="btn btn-dark-outline">Sign in</Link>
          <Link to="/account/create" className="btn btn-dark">Join now</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
