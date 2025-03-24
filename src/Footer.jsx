import './Footer.css'

function Footer () {
    return (
        <footer class="footer">
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
                <p>Privacy Notice</p>
                <p>Consumer Health Privacy Notice</p>
                <p>Terms of Use</p>
                <p>Do Not Share My Personal Information</p>
                <p>CA Supply Chain Act</p>
                <p>Accessibility</p>
                <p>Cookie Preferences</p>
            </div>
            <p className="copyright">© {new Date().getFullYear()} Starbucks Coffee Company. All rights reserved.</p>

        </div>
    </footer>
    )
}

export default Footer