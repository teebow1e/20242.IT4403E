import './Footer.css'

function Footer () {
    return (
        <footer class="footer">
            <div className='seperator'></div>
            <div className="footer-container">
                <div className="social">
                    <a href="https://spotify.com">
                        <img src="/social-spotify.svg" alt="" />
                    </a>
                    <a href="https://facebook.com">
                        <img src="/social-facebook.svg" alt="" />
                    </a>
                    <a href="https://pinterest.com">
                        <img src="/social-pinterest.svg" alt="" />
                    </a>
                    <a href="https://instagram.com">
                        <img src="/social-instagram.svg" alt="" />
                    </a>
                    <a href="https://youtube.com">
                        <img src="/social-youtube.svg" alt="" />
                    </a>
                    <a href="https://twitter.com">
                        <img src="/social-twitter.svg" alt="" />
                    </a>
                </div>

                <div className="more-info">
                    <a href="/#">Privacy Notice</a>
                    <a href="/#">Consumer Health Privacy Notice</a>
                    <a href="/#">Terms of Use</a>
                    <a href="/#">Do Not Share My Personal Information</a>
                    <a href="/#">CA Supply Chain Act</a>
                    <a href="/#">Accessibility</a>
                    <a href="/#">Cookie Preferences</a>
                </div>

                <p className="copyright">© {new Date().getFullYear()} Starbucks Coffee Company. All rights reserved.</p>

            </div>
        </footer>
    )
}

export default Footer