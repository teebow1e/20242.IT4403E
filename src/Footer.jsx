import './Footer.css'

function Footer () {
    return (
        <footer className="footer">
        <div className="footer-container">
            <div className="social">
                <a href="https://spotify.com">
                    <img src="./public/social-spotify.svg" alt="" />
                </a>
                <a href="https://facebook.com">
                    <img src="./public/social-facebook.svg" alt="" />
                </a>
                <a href="https://pinterest.com">
                    <img src="./public/social-pinterest.svg" alt="" />
                </a>
                <a href="https://instagram.com">
                    <img src="./public/social-instagram.svg" alt="" />
                </a>
                <a href="https://youtube.com">
                    <img src="./public/social-youtube.svg" alt="" />
                </a>
                <a href="https://twitter.com">
                    <img src="./public/social-twitter.svg" alt="" />
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
