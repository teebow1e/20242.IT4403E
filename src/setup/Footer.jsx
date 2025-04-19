function SocialLogo({ href, src, alt = '' }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <img src={src} alt={alt} className="w-[30px] h-[30px]" />
        </a>
    );
}

function FooterLink({ href, children }) {
    return (
        <a href={href} className="hover:underline whitespace-nowrap">
            {children}
        </a>
    );
}

function Footer() {
    return (
        <footer className="mx-[50px]">
            <div className='border-t border-black/10'></div>
            <div className="footer-max-w-[1440px] w-full mx-auto my-10 px-5 flex flex-col items-start">
                <div className="flex items-center gap-5 my-5 flex-wrap">
                    <SocialLogo href="https://spotify.com" src="/social-spotify.svg" />
                    <SocialLogo href="https://facebook.com" src="/social-facebook.svg" />
                    <SocialLogo href="https://pinterest.com" src="/social-pinterest.svg" />
                    <SocialLogo href="https://instagram.com" src="/social-instagram.svg" />
                    <SocialLogo href="https://youtube.com" src="/social-youtube.svg" />
                    <SocialLogo href="https://twitter.com" src="/social-twitter.svg" />

                </div>

                <div className="flex flex-col gap-[10px] font-semibold mt-5">
                    <FooterLink href="/#">Privacy Notice</FooterLink>
                    <FooterLink href="/#">Consumer Health Privacy Notice</FooterLink>
                    <FooterLink href="/#">Terms of Use</FooterLink>
                    <FooterLink href="/#">Do Not Share My Personal Information</FooterLink>
                    <FooterLink href="/#">CA Supply Chain Act</FooterLink>
                    <FooterLink href="/#">Accessibility</FooterLink>
                    <FooterLink href="/#">Cookie Preferences</FooterLink>
                </div>

                <p className="text-center mt-5 opacity-70 text-sm">© {new Date().getFullYear()} Starbucks Coffee Company. All rights reserved.</p>

            </div>
        </footer>
    )
}

export default Footer
