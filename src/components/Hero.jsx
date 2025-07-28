import { useState, useRef, useCallback, useMemo, useEffect } from 'react';

const Hero = ({ toggleContactForm }) => {
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const vslContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const navigationRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const [isVslHovered, setIsVslHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsVslHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsVslHovered(false), []);

  // Title words configuration
  const TITLE_WORDS = useMemo(() => ({
    mobile: ['D', 'i', 'g', 'i', 't', 'a', 'l', ' ', 'S', 'u', 'p', 'r', 'e', 'm', 'a', 'c', 'y'],
    desktop: [
      ['D', 'i', 'g', 'i', 't', 'a', 'l'],
      ['S', 'u', 'p', 'r', 'e', 'm', 'a', 'c', 'y']
    ]
  }), []);

  // Check for mobile and tablet on mount and resize
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 640); // sm breakpoint
      setIsTablet(width > 640 && width <= 1024); // between sm and lg
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Simplified animation effect
  useEffect(() => {
    const animateElements = () => {
      const titleContainer = textRef.current?.children[0]?.querySelector('h1');
      const navigationElements = navigationRef.current?.children;
      
      if (overlayRef.current) {
        overlayRef.current.style.opacity = '0.5';
      }
      
      if (navigationElements) {
        Array.from(navigationElements).forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
      
      if (titleContainer) {
        setTimeout(() => {
          const letters = titleContainer.querySelectorAll('span');
          letters.forEach((letter, index) => {
            setTimeout(() => {
              letter.style.opacity = '1';
              letter.style.transform = 'translateY(0) rotateX(0)';
            }, index * 50);
          });
        }, 400);
      }
      
      if (vslContainerRef.current) {
        setTimeout(() => {
          vslContainerRef.current.style.opacity = '1';
          vslContainerRef.current.style.transform = 'translateY(0)';
        }, 800);
      }
    };

    const timer = setTimeout(animateElements, 100);
    return () => clearTimeout(timer);
  }, [isMobile, isTablet]);

  // Get responsive text size class
  const getTextSizeClass = () => {
    if (isMobile) {
      return 'text-5xl xs:text-6xl sm:text-7xl';
    } else if (isTablet) {
      return 'text-7xl md:text-8xl lg:text-9xl';
    } else {
      return 'text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] 3xl:text-[14rem]';
    }
  };

  // Get VSL container size
  const getVslContainerClass = () => {
    if (isMobile) {
      return 'mt-3 w-[90%] max-w-sm';
    } else if (isTablet) {
      return 'mt-4 w-[70%] max-w-lg';
    } else {
      return 'mt-5 w-[35%] max-w-xl';
    }
  };

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ 
        minHeight: '100vh',
        height: '100vh'
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            transform: 'scale(1.02)',
            animation: 'subtle-zoom 8s ease-in-out infinite alternate'
          }}
        >
          <source src="https://cdn.yourcreative.com.au/wp-content/uploads/2024/11/12061906/V1-Draft.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-zinc-300 transition-opacity duration-800"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Bottom Gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-5"
        style={{
          height: 'clamp(6rem, 12vh, 12rem)',
          backgroundImage: 'linear-gradient(to top, rgba(40, 40, 40, 0.8), transparent)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)'
        }}
      />

      {/* Navigation */}
      <div 
        ref={navigationRef}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 flex items-center gap-2 sm:gap-3 md:gap-4 z-20"
      >
        <button 
          ref={buttonRef}
          onClick={toggleContactForm}
          className="border border-gray-800 text-gray-800 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full flex items-center hover:bg-gray-800 hover:text-white transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap"
          style={{ 
            opacity: 0, 
            transform: 'translateY(30px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          CONTACT <span className="ml-1 md:ml-2">→</span>
        </button>
        
        <a 
          href="https://www.instagram.com/digitalsupremacy.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
          className="text-gray-800 hover:text-gray-600 transition-colors duration-300 text-sm sm:text-base md:text-lg p-1" 
          aria-label="Instagram"
          style={{ 
            opacity: 0, 
            transform: 'translateY(30px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a 
          href="https://www.linkedin.com/company/digital-supremacy-in/" 
          className="text-gray-800 hover:text-gray-600 transition-colors duration-300 text-sm sm:text-base md:text-lg p-1" 
          aria-label="LinkedIn"
          style={{ 
            opacity: 0, 
            transform: 'translateY(30px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>

      {/* Main Content */}
      <div 
        className="flex flex-col items-center justify-center h-full px-3 sm:px-4 md:px-6 lg:px-8 z-10"
        ref={textRef}
      >
        <div className="overflow-hidden w-full text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className={`font-bold text-black leading-tight ${getTextSizeClass()}`}>
            {isMobile || isTablet ? (
              <div className="flex justify-center whitespace-nowrap flex-wrap">
                {TITLE_WORDS.mobile.map((letter, index) => (
                  <span 
                    key={`mobile-title-${index}`} 
                    className="inline-block transition-all duration-600 ease-out"
                    style={{
                      width: letter === ' ' ? '0.2em' : 'auto',
                      opacity: 0,
                      transform: 'translateY(20px) rotateX(-90deg)',
                      transformOrigin: 'center bottom'
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            ) : (
              <div className="space-y-2 lg:space-y-4">
                <div className="block">
                  {TITLE_WORDS.desktop[0].map((letter, index) => (
                    <span 
                      key={`digital-${index}`} 
                      className="inline-block transition-all duration-600 ease-out"
                      style={{
                        opacity: 0,
                        transform: 'translateY(40px) rotateX(-90deg)',
                        transformOrigin: 'center bottom'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <div className="block">
                  {TITLE_WORDS.desktop[1].map((letter, index) => (
                    <span 
                    
                      key={`supremacy-${index}`} 
                      className="inline-block transition-all duration-600 ease-out"
                      style={{
                        opacity: 0,
                        transform: 'translateY(40px) rotateX(-90deg)',
                        transformOrigin: 'center bottom'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </h1>
        </div>
        
        {/* VSL Container */}
        <div
          ref={vslContainerRef}
          className={`${getVslContainerClass()} aspect-video bg-gray-300 rounded-lg overflow-hidden transition-all duration-800 ease-out`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            height: 'clamp(200px, 40vh, 400px)'
          }}
        >
          <video
            controls={isVslHovered}
            className="w-full h-full object-cover"
            playsInline
            preload="metadata"
            autoPlay
            muted
            loop
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <style jsx>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.05); }
        }
        
        @media (max-width: 480px) {
          .xs\\:text-4xl {
            font-size: 2.25rem;
            line-height: 2.5rem;
          }
        }
        
        @media (min-width: 1536px) {
          .3xl\\:text-\\[10rem\\] {
            font-size: 10rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;