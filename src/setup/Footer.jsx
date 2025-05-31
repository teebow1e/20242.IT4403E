import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SocialLogo({ href, icon, alt = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200"
    >
      {icon}
    </a>
  );
}

function FooterAccordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10 py-4 md:border-none md:py-0">
      <button
        className="flex items-center justify-between w-full text-left md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-base font-semibold text-black/90">{title}</h2>
        <span className="md:hidden">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      <div className={`mt-3 space-y-3 ${isOpen ? 'block' : 'hidden'} md:block`}>
        {children}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white mt-8 mx-[20px] sm:mx-[50px]">
      <div className="container mx-auto">
        <div className='border-t border-black/10'></div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 py-8 border-b border-black/10">
          {/* About Us */}
          <FooterAccordion title="About Us">
            <div className="flex flex-col space-y-4 text-black/60 text-sm">
              <Link to="#" className="hover:text-[#00653e]">Our Company</Link>
              <Link to="#" className="hover:text-[#00653e]">Our Coffee</Link>
              <Link to="#" className="hover:text-[#00653e]">Stories and News</Link>
              <Link to="#" className="hover:text-[#00653e]">Meowbucks Archive</Link>
              <Link to="#" className="hover:text-[#00653e]">Investor Relations</Link>
              <Link to="#" className="hover:text-[#00653e]">Customer Service</Link>
            </div>
          </FooterAccordion>

          {/* Careers */}
          <FooterAccordion title="Careers">
            <div className="flex flex-col space-y-4 text-black/60 text-sm">
              <Link to="#" className="hover:text-[#00653e]">Culture and Values</Link>
              <Link to="#" className="hover:text-[#00653e]">Inclusion, Diversity, and Equity</Link>
              <Link to="#" className="hover:text-[#00653e]">College Achievement Plan</Link>
              <Link to="#" className="hover:text-[#00653e]">Alumni Community</Link>
              <Link to="#" className="hover:text-[#00653e]">U.S. Careers</Link>
              <Link to="#" className="hover:text-[#00653e]">International Careers</Link>
            </div>
          </FooterAccordion>

          {/* Social Impact */}
          <FooterAccordion title="Social Impact">
            <div className="flex flex-col space-y-4 text-black/60 text-sm">
              <Link to="#" className="hover:text-[#00653e]">People</Link>
              <Link to="#" className="hover:text-[#00653e]">Planet</Link>
              <Link to="#" className="hover:text-[#00653e]">Environmental and Social Impact Reporting</Link>
            </div>
          </FooterAccordion>

          {/* For Business Partners */}
          <FooterAccordion title="For Business Partners">
            <div className="flex flex-col space-y-4 text-black/60 text-sm">
              <Link to="#" className="hover:text-[#00653e]">Landlord Support Center</Link>
              <Link to="#" className="hover:text-[#00653e]">Suppliers</Link>
              <Link to="#" className="hover:text-[#00653e]">Corporate Gift Card Sales</Link>
              <Link to="#" className="hover:text-[#00653e]">Office and Foodservice Coffee</Link>
            </div>
          </FooterAccordion>

          {/* Order and Pickup */}
          <FooterAccordion title="Order and Pickup">
            <div className="flex flex-col space-y-4 text-black/60 text-sm">
              <Link to="/menu" className="hover:text-[#00653e]">Order on the App</Link>
              <Link to="/menu" className="hover:text-[#00653e]">Order on the Web</Link>
              <Link to="#" className="hover:text-[#00653e]">Delivery</Link>
              <Link to="#" className="hover:text-[#00653e]">Order and Pickup Options</Link>
              <Link to="#" className="hover:text-[#00653e]">Explore and Find Coffee for Home</Link>
            </div>
          </FooterAccordion>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-5 my-5 flex-wrap py-6 border-b border-black/10">
          <SocialLogo
            href="https://spotify.com"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            }
            alt="Spotify"
          />
          <SocialLogo
            href="https://facebook.com"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            }
            alt="Facebook"
          />
          <SocialLogo
            href="https://pinterest.com"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            }
            alt="Pinterest"
          />
          <SocialLogo
            href="https://instagram.com"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            }
            alt="Instagram"
          />
          <SocialLogo
            href="https://youtube.com"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            }
            alt="YouTube"
          />
          <SocialLogo
            href="https://twitter.com"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            }
            alt="Twitter"
          />
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-[10px] font-semibold mt-5 py-6">
          <Link to="#" className="hover:text-[#00653e] hover:underline">Privacy Notice</Link>
          <Link to="#" className="hover:text-[#00653e] hover:underline">Consumer Health Privacy Notice</Link>
          <Link to="#" className="hover:text-[#00653e] hover:underline">Terms of Use</Link>
          <Link to="#" className="hover:text-[#00653e] hover:underline">Do Not Share My Personal Information</Link>
          <Link to="#" className="hover:text-[#00653e] hover:underline">CA Supply Chain Act</Link>
          <Link to="#" className="hover:text-[#00653e] hover:underline">Accessibility</Link>
          <Link to="#" className="hover:text-[#00653e] hover:underline">Cookie Preferences</Link>
        </div>

        {/* Copyright */}
        <p className="mt-5 opacity-70 text-sm pb-8">© {new Date().getFullYear()} Meowbucks Coffee Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
