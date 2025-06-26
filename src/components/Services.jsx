import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Services() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const servicesListRef = useRef(null);
  const imageBoxRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
     {
      title: "Video Production & Editing",
      description: "Professional video content that tells your story effectively",
      type: "single",
      images: [
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Creative Strategy & Design",
      description: "Comprehensive brand development and visual identity systems",
      type: "single",
      images: [
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Creative Asset Design",
      description: "High-quality digital assets for all your marketing needs",
      type: "multi",
      sections: [
        {
          name: "Thumbnail Design",
          type: "thumbnail",
          count: 1,
          images: ["#FF6B6B"] // Using colors as placeholders
        },
        {
          name: "Poster Design", 
          type: "poster",
          count: 2,
          images: ["#4ECDC4", "#45B7D1"]
        },
        {
          name: "Instagram Posts",
          type: "instagram",
          count: 3,
          images: ["#96CEB4", "#FFEAA7", "#DDA0DD"]
        }
      ]
    },
    {
      title: "Content Strategy & Copywriting",
      description: "Compelling narratives that resonate with your audience",
      type: "single",
      images: [
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop"
      ]
    },
   
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Set initial styles
    gsap.set([titleRef.current, servicesListRef.current?.children, imageBoxRef.current], {
      opacity: 1,
      y: 0
    });

    // Create animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.from(titleRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(servicesListRef.current.children, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.3")
    .from(imageBoxRef.current, {
      opacity: 0,
      x: isMobile ? 0 : 40,
      y: isMobile ? 40 : 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");

    return () => {
      window.removeEventListener('resize', checkMobile);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleMouseEnter = (index) => {
    setCurrentImage(index);
    setIsHovered(true);
    
    if (!isMobile) {
      gsap.to(imageBoxRef.current, {
        scale: 1.03,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(servicesListRef.current.children[index], {
        x: 15,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (index) => {
    setIsHovered(false);
    
    if (!isMobile) {
      gsap.to(imageBoxRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(servicesListRef.current.children[index], {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleClick = (index) => {
    if (isMobile) {
      setCurrentImage(index);
      setIsHovered(true);
    }
  };

  const renderSingleImage = (service) => (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 z-20">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-medium text-white leading-tight">
          {service.title}
        </h4>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-neutral-300 leading-relaxed">
          {service.description}
        </p>
      </div>
      <img 
        src={service.images[0]}
        alt={service.title}
        className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
      />
    </div>
  );

  const renderMultiImage = (service) => (
    <div className="w-full h-full p-3 sm:p-4 lg:p-6 overflow-y-auto flex items-center">
      <div className="w-full space-y-6 sm:space-y-8 lg:space-y-12">
        {service.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3 sm:space-y-4 lg:space-y-6">
            <h5 className="text-sm sm:text-base lg:text-lg font-medium text-white mb-3 sm:mb-4 lg:mb-6">{section.name}</h5>
            
            {/* Thumbnail - Single large image */}
            {section.type === 'thumbnail' && (
              <div className="w-full">
                <div 
                  className="w-full h-20 sm:h-24 lg:h-32 rounded-lg flex flex-col items-center justify-center text-white font-medium text-xs sm:text-sm lg:text-base"
                  style={{ backgroundColor: section.images[0] }}
                >
                  <span>Thumbnail Design</span>
                  <span className="text-xs opacity-75 mt-1">16:9 Ratio</span>
                </div>
              </div>
            )}

            {/* Posters - Two vertical images side by side */}
            {section.type === 'poster' && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {section.images.map((color, imageIndex) => (
                  <div 
                    key={imageIndex}
                    className="aspect-[3/4] rounded-lg flex flex-col items-center justify-center text-white font-medium text-xs sm:text-sm lg:text-base"
                    style={{ backgroundColor: color }}
                  >
                    <span>Poster {imageIndex + 1}</span>
                    <span className="text-xs opacity-75 mt-1">3:4 Ratio</span>
                  </div>
                ))}
              </div>
            )}

            {/* Instagram Posts - Three square images */}
            {section.type === 'instagram' && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-5">
                {section.images.map((color, imageIndex) => (
                  <div 
                    key={imageIndex}
                    className="aspect-square rounded-lg flex flex-col items-center justify-center text-white font-medium text-xs"
                    style={{ backgroundColor: color }}
                  >
                    <span>Post {imageIndex + 1}</span>
                    <span className="text-xs opacity-75 mt-1">1:1 Ratio</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Service info overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 bg-gradient-to-t from-neutral-900 via-neutral-900/90 to-transparent">
        <h4 className="text-base sm:text-lg lg:text-xl font-medium text-white leading-tight">
          {service.title}
        </h4>
        <p className="mt-1 text-neutral-300 text-xs sm:text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );

  const currentService = services[currentImage];

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 to-transparent pointer-events-none"></div>
      
      <div 
        className="services-container min-h-screen lg:h-screen w-full max-w-[95vw] sm:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 flex flex-col justify-center"
        ref={containerRef}
      >
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-100 leading-tight"
          >
            Our <span className="text-[#7e72e0]">Services</span>
          </h3>
          <p className="mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base lg:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Comprehensive solutions tailored to elevate your brand's digital presence
          </p>
        </div>

        {/* Mobile Layout - Vertical stacked */}
        <div className="w-full lg:hidden">
          <div className="flex flex-col gap-6">
            {/* Services List - Top section for mobile */}
            <div 
              ref={servicesListRef}
              className="w-full flex flex-col space-y-0"
            >
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`relative py-3 sm:py-4 group cursor-pointer ${
                    currentImage === index ? 'bg-neutral-800/30' : ''
                  } transition-all duration-300 rounded-lg`}
                  onClick={() => handleClick(index)}
                >
                  <div className={`absolute left-0 top-0 h-full w-1 bg-[#7e72e0] transition-opacity duration-300 rounded-r ${
                    currentImage === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  <div className="pl-4 sm:pl-6">
                    <h4 className={`text-lg sm:text-xl font-medium text-neutral-100 transition-all duration-300 leading-tight ${
                      currentImage === index ? 'text-[#7e72e0] italic font-bold' : ''
                    }`}>
                      {service.title}
                    </h4>
                    <p className={`mt-1 sm:mt-2 text-neutral-400 text-sm transition-opacity duration-300 leading-relaxed ${
                      currentImage === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Section - Bottom section for mobile */}
            <div 
              ref={imageBoxRef}
              className="w-full h-[60vh] sm:h-[65vh] rounded-xl overflow-hidden shadow-2xl border border-neutral-800/50 bg-neutral-900 transition-all duration-500 relative"
            >
              {currentService.type === 'single' 
                ? renderSingleImage(currentService)
                : renderMultiImage(currentService)
              }
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original layout */}
        <div className="w-full hidden lg:flex flex-row gap-12 items-stretch">
          <div 
            ref={servicesListRef}
            className="w-1/2 flex flex-col justify-center space-y-1"
          >
            {services.map((service, index) => (
              <div 
                key={index}
                className="relative py-6 group cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className={`absolute left-0 top-0 h-full w-1 bg-[#7e72e0] transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}></div>
                <div className="pl-8">
                  <h4 className="text-4xl font-medium text-neutral-100 transition-all duration-300 leading-tight group-hover:text-[#7e72e0] group-hover:italic group-hover:font-bold">
                    {service.title}
                  </h4>
                  <p className="mt-2 text-neutral-400 text-base transition-opacity duration-300 leading-relaxed opacity-0 group-hover:opacity-100">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div 
            ref={imageBoxRef}
            className={`w-1/2 h-[70vh] sticky top-24 rounded-xl overflow-hidden shadow-2xl border border-neutral-800/50 bg-neutral-900 transition-all duration-500 relative ${
              isHovered ? 'shadow-yellow-300/20' : ''
            }`}
            style={{ maxWidth: '110%' }}
          >
            {currentService.type === 'single' 
              ? renderSingleImage(currentService)
              : renderMultiImage(currentService)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;