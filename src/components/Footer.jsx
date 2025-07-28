import { useRef, useEffect } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    // Simple fade-in animation for letters
    if (window.innerWidth >= 1024 && lettersRef.current.length > 0) {
      lettersRef.current.forEach((letter, index) => {
        if (letter) {
          letter.style.transform = 'translateY(20px)';
          letter.style.opacity = '0';
          setTimeout(() => {
            letter.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            letter.style.transform = 'translateY(0)';
            letter.style.opacity = '0.05';
          }, index * 30);
        }
      });
    }
  }, []);

  const renderLetters = (text) =>
    text.split('').map((char, index) => (
      <span
        key={index}
        ref={(el) => (lettersRef.current[index] = el)}
        className="inline-block text-[8vw] lg:text-[6vw] font-bold leading-none text-white pointer-events-none select-none"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#2A1B3D] w-full min-h-screen text-white px-6 lg:px-12 py-12 lg:py-20 font-sans overflow-hidden flex flex-col justify-between"
    >
      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 flex-1">
        
        {/* Company Information */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-4">Digital Supremacy</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-base">
                We empower brands through bold digital strategies, innovative storytelling, and creative excellence.
              </p>
              <p className="text-sm opacity-90">
                We believe in authenticity, growth, and making meaningful impact—online and beyond. From branding and content to high-performance campaigns, we help businesses rise above the noise.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Address */}
            <div className="space-y-3">
              <h4 className="font-medium text-white text-lg">Address</h4>
              <address className="text-gray-300 text-sm leading-relaxed not-italic">
                60, Pandit Colony,<br />
                above Ananda Laundry,<br />
                Nashik-422002
              </address>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h4 className="font-medium text-white text-lg">Contact</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p>
                  <a href="mailto:info@digitalsupermacy.in" className="hover:text-white transition-colors">
                    info@digitalsupermacy.in
                  </a>
                </p>
                <p>
                  <a href="tel:+919689772863" className="hover:text-white transition-colors">
                    +91 96897 72863
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h4 className="font-medium text-white text-lg">Follow Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/digitalsupremacy.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-base" />
              </a>
              <a 
                href="https://www.linkedin.com/company/digital-supremacy-in/" 
                className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-base" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Text - Desktop */}
      <div className="absolute bottom-8 left-0 w-full px-0 z-0 hidden lg:block">
        <div className="overflow-hidden w-full">
          <h1 className="whitespace-nowrap w-full text-center font-light">
            {renderLetters('Digital Supremacy')}
          </h1>
        </div>
      </div>

      {/* Background Text - Mobile */}
      <div className="lg:hidden text-center text-white/5 text-[12vw] font-light select-none leading-none mt-12">
        Digital Supremacy
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;