import React, { useEffect, useRef, useState } from 'react';

function Testimonials( {toggleContactForm}) {
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  // Testimonials data - 6 cards now
  const testimonials = [
    {
      id: "eonx",
      name: 'EONX',
      role: 'Digital Transformation',
      content: 'Transform your brand\'s digital presence with data-driven strategies that deliver measurable ROI and sustainable growth across all channels.',
      avatar: 'src/assets/images/eonx logo.png',
      rating: 5
    },
    {
      id: "qualicom",
      name: 'QUALICOM',
      role: 'SEO Solutions',
      content: 'Maximize your online visibility with SEO strategies that dominate search rankings and drive qualified traffic to your business.',
      avatar: 'src/assets/images/QUALICOM.jpg',
      rating: 5
    },
    {
      id: "bnb",
      name: 'B&B POLYMORES',
      role: 'Content Strategy',
      content: 'Create compelling content that tells your brand story and builds authentic connections with your target audience across digital platforms.',
      avatar: 'src/assets/images/BNB.jpg',
      rating: 5
    },
    {
      id: "justo",
      name: 'JUSTO',
      role: 'Marketing Automation',
      content: 'Leverage advanced analytics and marketing automation to optimize campaigns and deliver personalized experiences at scale.',
      avatar: 'src/assets/images/JUSTO.webp',
      rating: 5
    },
    {
      id: "nexo",
      name: 'NEXO',
      role: 'PPC Campaigns',
      content: 'Drive immediate results with targeted PPC campaigns that maximize ad spend efficiency and accelerate business growth.',
      avatar: 'src/assets/images/NEXO.jpg',
      rating: 5
    },
    {
      id: "trading-monk",
      name: 'TRADING MONK',
      role: 'Email Marketing',
      content: 'Build powerful email marketing funnels that nurture leads, increase customer lifetime value, and boost revenue consistently.',
      avatar: 'src/assets/images/MONK.jpg',
      rating: 5
    }
  ];

  // Initialize cardRefs
  useEffect(() => {
    cardRefs.current = Array(testimonials.length).fill(null);
  }, [testimonials.length]);

  // Setup animations after all components are mounted and images are loaded
  useEffect(() => {
    // Pre-load images to prevent layout shifts
    const imagePromises = testimonials.map(testimonial => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = testimonial.avatar;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    // Wait for all images to load
    Promise.all(imagePromises).then(() => {
      setIsLoaded(true);
    });
  }, [testimonials]);

  // Set up scroll animations after everything is loaded
  useEffect(() => {
    if (!isLoaded) return;

    const cardsContainer = cardsContainerRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate heading
            if (headingRef.current) {
              headingRef.current.style.opacity = '1';
              headingRef.current.style.transform = 'translateY(0)';
            }
            
            // Animate subheading with delay
            setTimeout(() => {
              if (subheadingRef.current) {
                subheadingRef.current.style.opacity = '1';
                subheadingRef.current.style.transform = 'translateY(0)';
              }
            }, 200);

            // Animate cards with stagger
            cardRefs.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                }, 400 + (index * 100));
              }
            });
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '-10% 0px'
      }
    );

    if (cardsContainer) {
      observer.observe(cardsContainer);
    }

    return () => {
      if (cardsContainer) {
        observer.unobserve(cardsContainer);
      }
    };
  }, [isLoaded]);

  const handleCardHover = (index) => {
    setActiveCard(index);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  // Handle touch events for mobile
  const handleCardTouch = (index) => {
    if (activeCard === index) {
      setActiveCard(null);
    } else {
      setActiveCard(index);
    }
  };

  return (
    <div 
      id='testimonials'
      className='bg-gray-200 flex flex-col min-h-screen my-12 sm:my-16 md:my-20 items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8'
      ref={cardsContainerRef}
    >
      <div className="h-fit w-full text-center pb-2 pt-4 sm:pt-6 md:pt-8 overflow-hidden px-2 sm:px-4">
        <h3 
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black pb-2 font-bold tracking-wide leading-tight sm:leading-none transition-all duration-800 ease-out opacity-0 transform translate-y-12'
          ref={headingRef}
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          WHAT OUR <br /> CLIENTS SAY
        </h3>
        <span 
          className='text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl transition-all duration-600 ease-out opacity-0 transform translate-y-8 block mt-2 sm:mt-3 md:mt-4'
          ref={subheadingRef}
          style={{ fontFamily: 'cursive' }}
        >
          Real stories from satisfied clients.
        </span>
      </div>

      <div 
        className="w-full max-w-7xl py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-2 sm:px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        ref={cardsWrapperRef}
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id}
            className="rounded-xl border border-gray-700/30 overflow-hidden bg-gradient-to-br from-violet-900 to-violet-800 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer opacity-0 transform translate-y-20"
            ref={el => cardRefs.current[index] = el}
            style={{ 
              height: activeCard === index ? 
                (window.innerWidth < 640 ? '28rem' : 
                 window.innerWidth < 768 ? '30rem' : 
                 '32rem') : '24rem',
              zIndex: activeCard === index ? 10 : 1,
              transitionDuration: '800ms'
            }}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
            onTouchStart={() => handleCardTouch(index)}
          >
            <div className="relative h-full w-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
                <div className="h-full w-full flex items-center justify-center flex-col">
                  {/* Avatar */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 sm:mb-4 border-2 border-gray-200/30 flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>

                  {/* Name and Role */}
                  <div className="text-center mb-3 sm:mb-4 flex-shrink-0">
                    <h4 className="text-gray-200 text-base sm:text-lg md:text-xl font-semibold leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base mt-1">
                      {testimonial.role}
                    </p>
                  </div>

                  {/* Show description only for active card */}
                  {activeCard === index && (
                    <div className="text-center transition-all duration-300 ease-in-out animate-fadeIn flex-1 flex flex-col justify-center px-2 sm:px-0">
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-3 sm:mb-4 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg sm:text-xl">★</span>
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-gray-100/90 text-center text-xs sm:text-sm md:text-base leading-relaxed line-height-normal">
                        "{testimonial.content}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-6 px-4 sm:px-6 md:px-8">
        <div className="mt-4">
          <div className="bg-white hover:bg-violet-800 hover:scale-95 active:bg-gray-200 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-3 sm:gap-4 overflow-hidden transition-all ease-in duration-300 group cursor-pointer">
            <a 
              onClick={toggleContactForm}
              // href="https://sales.radianmedia.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 sm:gap-4"
            >
              <span className="font-semibold text-amber-900 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
                JOIN THEM
              </span>
              
              <div className='p-1.5 sm:p-2 rounded-full transition-all ease-in duration-300 group-hover:-rotate-45 bg-violet-900 group-hover:bg-white'>
                <svg 
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-amber-900 transition-colors duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Custom responsive adjustments */
        @media (max-width: 640px) {
          .line-height-normal {
            line-height: 1.4;
          }
        }

        @media (max-width: 480px) {
          .line-height-normal {
            line-height: 1.3;
          }
        }

        /* Ensure touch targets are accessible on mobile */
        @media (max-width: 768px) {
          .cursor-pointer {
            touch-action: manipulation;
          }
        }

        /* Handle very small screens */
        @media (max-width: 360px) {
          .text-3xl {
            font-size: 1.75rem;
          }
          
          .text-lg {
            font-size: 1rem;
          }
        }

        /* Handle landscape mobile devices */
        @media (max-height: 500px) and (orientation: landscape) {
          .min-h-screen {
            min-height: auto;
          }
          
          .py-8 {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Testimonials;