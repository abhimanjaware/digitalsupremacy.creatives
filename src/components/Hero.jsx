import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = ({ toggleContactForm }) => {
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const vslContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const navigationRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    const titleContainer = textRef.current?.children[0]?.querySelector('h1');
    const navigationElements = navigationRef.current?.children;

    gsap.set([
      navigationElements,
      overlayRef.current,
      vslContainerRef.current
    ], { 
      opacity: 0, 
      y: 30
    });

    // Animate letters based on screen size
    if (isMobile && titleContainer) {
      const letters = titleContainer.querySelectorAll('span');
      gsap.set(letters, { 
        opacity: 0, 
        y: 20,
        rotationX: -90,
        transformOrigin: 'center bottom'
      });

      tl.to(overlayRef.current, {
        opacity: 0.5,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(navigationElements, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1
      }, "-=0.4")
      .to(letters, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        ease: 'back.out(1.2)',
        stagger: 0.05
      }, "-=0.2");
    } else if (titleContainer) {
      const digitalLetters = titleContainer.children[0]?.children;
      const supremacyLetters = titleContainer.children[1]?.children;
      
      if (digitalLetters && supremacyLetters) {
        gsap.set([...digitalLetters, ...supremacyLetters], { 
          opacity: 0, 
          y: 40,
          rotationX: -90,
          transformOrigin: 'center bottom'
        });

        tl.to(overlayRef.current, {
          opacity: 0.5,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
        .to(navigationElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1
        }, "-=0.4")
        .to([...digitalLetters, ...supremacyLetters], {
          opacity: 1,
          y: -40,
          rotationX: 0,
          duration: 0.6,
          ease: 'back.out(1.2)',
          stagger: 0.08
        }, "-=0.2");
      }
    }

    // VSL animation
    tl.to(vslContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.4");

    // Background video animation
    gsap.to(videoRef.current, {
      scale: 1.05,
      duration: 8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    // Desktop-specific scroll animation for VSL
    if (!isMobile) {
      gsap.fromTo(vslContainerRef.current, 
        { 
          width: '30%',
          height: '40vh'
        },
        { 
          width: '90%',
          height: '80vh',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        }
      );
    }

    return () => {
      tl?.kill();
    };
  }, [isMobile]);

  return (
    <section
      ref={heroSectionRef}
      className="relative w-screen px-4 py-8 overflow-hidden"
      style={{ 
        minHeight: '120vh', // Maintained original height
        maxHeight: '120vh'
      }}
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="https://cdn.yourcreative.com.au/wp-content/uploads/2024/11/12061906/V1-Draft.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-zinc-300"
        ></div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 h-48 z-5"
        style={{
          backgroundImage: 'linear-gradient(to top, rgba(40, 40, 40, 0.8), transparent)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)'
        }}
      ></div>

      <div 
        ref={navigationRef}
        className="absolute top-4 md:top-8 right-4 md:right-8 flex items-center space-x-2 md:space-x-4 z-20"
      >
        <button 
          ref={buttonRef}
          onClick={toggleContactForm}
          className="border border-gray-800 text-gray-800 px-3 py-1 md:px-4 md:py-2 rounded-full flex items-center hover:bg-gray-800 hover:text-white transition-colors duration-300 text-sm md:text-base"
        >
          CONTACT <span className="ml-1 md:ml-2">→</span>
        </button>
        
        <a href="https://www.instagram.com/digitalsupremacy.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-800 hover:text-gray-600 transition-colors duration-300 text-sm md:text-base" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/company/digital-supremacy-in/" className="text-gray-800 hover:text-gray-600 transition-colors duration-300 text-sm md:text-base" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
        {/* <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors duration-300 text-sm md:text-base" aria-label="Search">
          <i className="fas fa-search"></i>
        </a> */}
      </div>

      <div 
        className="sticky top-0 h-screen flex flex-col items-center justify-center z-10"
        ref={textRef}
        style={{ 
          paddingTop: isMobile ? '5vh' : '5vh',
          paddingBottom: isMobile ? '5vh' : '0'
        }}
      >
        <div className="overflow-hidden w-full px-2 md:px-0">
          <h1 className={`
            ${isMobile ? 'text-4xl sm:text-7xl' : 
              'text-7xl md:text-8xl  lg:text-[10rem] xl:text-[12rem] 2xl:text-[16rem]'}
            font-bold text-black ${isMobile ? 'leading-tight' : 'leading-none'}
          `}>
            {isMobile ? (
              <div className="flex justify-center  flex-wrap w-full">
                {TITLE_WORDS.mobile.map((letter, index) => (
                  <span 
                    key={`mobile-title-${index}`} 
                    className="inline-block"
                    style={letter === ' ' ? { width: '0.3em' } : {}}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            ) : (
              <>
                <div className="block whitespace-nowrap text-left">
                  {TITLE_WORDS.desktop[0].map((letter, index) => (
                    <span key={`digital-${index}`} className="inline-block">
                      {letter}
                    </span>
                  ))}
                </div>
                <div className="block whitespace-nowrap text-right -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8">
                  {TITLE_WORDS.desktop[1].map((letter, index) => (
                    <span key={`supremacy-${index}`} className="inline-block">
                      {letter}
                    </span>
                  ))}
                </div>
              </>
            )}
          </h1>
        </div>
        
        <div
          ref={vslContainerRef}
          className={`${isMobile ? 'mt-6 w-[90%] h-[40vh]' : 'mt-8 w-[30%] h-[40vh]'} aspect-video bg-gray-300 rounded-lg overflow-hidden z-10`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
            <source src="https://cdn.yourcreative.com.au/wp-content/uploads/2024/11/13104040/slowreel_wip_13jul10am_1.mp4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Hero;