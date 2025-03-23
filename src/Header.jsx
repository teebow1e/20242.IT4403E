function Header() {
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
            </header>
        </>
    );
}

export default Header;
