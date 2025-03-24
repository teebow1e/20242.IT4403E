import { useEffect } from 'react';
import './Header.css'

function Header() {
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
        <>
            <header>
                <nav className="navbar">
                    <div className="navbar-container">
                        <div className="navbar-brand">
                            <a href="index.html">
                                <img src="public/logo.svg" alt="Starbucks" />
                            </a>
                        </div>

                        <ul className="navbar-nav-left">
                            <li>
                                <a href="#">Menu</a>
                            </li>
                            <li>
                                <a href="#">Rewards</a>
                            </li>
                            <li>
                                <a href="#">Gift Cards</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav-right">
                            {/* <li>
                                <a href="#">
                                    <img src="public/marker.svg" alt="" />
                                    <span>Find a store</span>
                                </a>
                            </li> */}
                            <li>
                                <button className="btn btn-dark-outline">Sign in</button>
                            </li>
                            <li>
                                <button className="btn btn-dark">Join now</button>
                            </li>
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
                <div class="mobile-menu hidden" id="menu">
                    <ul>
                        <li> <a href="#">Menu</a> </li>
                        <li> <a href="#">Rewards</a> </li>
                        <li> <a href="#">Gift Cards</a> </li>
                    </ul>

                    <div className="mobile-menu-bottom">
                        <button className="btn btn-dark-outline">Sign in</button>
                        <button className="btn btn-dark">Join now</button>
                        {/* <div>
                            <a href="#">
                                <img src="img/marker.svg" alt="" />
                                <span>Find a store</span>
                            </a>
                        </div> */}
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
