import React, { useEffect, useRef, useState } from 'react';

function Services() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const servicesListRef = useRef(null);
  const imageBoxRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const services = [
    {
      title: "Video Production & Editing",
      description: "Professional video content that tells your story effectively",
      type: "single",
      images: [
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop&q=80"
      ]
    },
    {
      title: "Creative Strategy & Design",
      description: "Comprehensive brand development and visual identity systems",
      type: "single",
      images: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80"
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
          images: ["#6366F1"] // Professional indigo
        },
        {
          name: "Poster Design", 
          type: "poster",
          count: 2,
          images: ["#8B5CF6", "#06B6D4"] // Purple and cyan
        },
        {
          name: "Instagram Posts",
          type: "instagram",
          count: 3,
          images: ["#10B981", "#F59E0B", "#EF4444"] // Green, amber, red
        }
      ]
    },
    {
      title: "Content Strategy & Copywriting",
      description: "Compelling narratives that resonate with your audience",
      type: "single",
      images: [
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&q=80"
      ]
    },
  ];

  useEffect(() => {
    // Check device type
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  const handleMouseEnter = (index) => {
    setCurrentImage(index);
    setIsHovered(true);
  };

  const handleMouseLeave = (index) => {
    setIsHovered(false);
  };

  const handleClick = (index) => {
    if (isMobile || isTablet) {
      setCurrentImage(index);
      setIsHovered(true);
    }
  };

  const renderSingleImage = (service) => (
    <div className="w-full h-full relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6 z-20">
        <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white leading-tight">
          {service.title}
        </h4>
        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm md:text-sm text-neutral-300 leading-relaxed">
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
    <div className="w-full h-full p-2 sm:p-3 md:p-4 lg:p-5 overflow-y-auto flex items-center">
      <div className="w-full space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        {service.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2 sm:space-y-3 md:space-y-4">
            <h5 className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-white mb-2 sm:mb-3">{section.name}</h5>
            
            {/* Thumbnail - Single large image */}
            {section.type === 'thumbnail' && (
              <div className="w-full">
                <div 
                  className="w-full h-16 sm:h-18 md:h-20 lg:h-24 rounded-lg flex flex-col items-center justify-center text-white font-medium text-xs sm:text-sm"
                  style={{ backgroundColor: section.images[0] }}
                >
                  <span>Thumbnail Design</span>
                  <span className="text-xs opacity-75 mt-0.5">16:9 Ratio</span>
                </div>
              </div>
            )}

            {/* Posters - Two vertical images side by side */}
            {section.type === 'poster' && (
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                {section.images.map((color, imageIndex) => (
                  <div 
                    key={imageIndex}
                    className="aspect-[3/4] rounded-lg flex flex-col items-center justify-center text-white font-medium text-xs sm:text-sm"
                    style={{ backgroundColor: color }}
                  >
                    <span>Poster {imageIndex + 1}</span>
                    <span className="text-xs opacity-75 mt-0.5">3:4 Ratio</span>
                  </div>
                ))}
              </div>
            )}

            {/* Instagram Posts - Three square images */}
            {section.type === 'instagram' && (
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
                {section.images.map((color, imageIndex) => (
                  <div 
                    key={imageIndex}
                    className="aspect-square rounded-lg flex flex-col items-center justify-center text-white font-medium text-xs"
                    style={{ backgroundColor: color }}
                  >
                    <span>Post {imageIndex + 1}</span>
                    <span className="text-xs opacity-75 mt-0.5">1:1</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Service info overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-t from-neutral-900 via-neutral-900/90 to-transparent">
        <h4 className="text-sm sm:text-base md:text-lg font-medium text-white leading-tight">
          {service.title}
        </h4>
        <p className="mt-0.5 sm:mt-1 text-neutral-300 text-xs sm:text-sm leading-relaxed">
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
        className="services-container min-h-screen w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col justify-center"
        ref={containerRef}
      >
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h3 
            ref={titleRef}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight text-neutral-100 leading-tight"
          >
            Our <span className="text-[#7e72e0]">Services</span>
          </h3>
          <p className="mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Comprehensive solutions tailored to elevate your brand's digital presence
          </p>
        </div>

        {/* Mobile Layout (< 768px) */}
        <div className="w-full md:hidden">
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Services List - Top section for mobile */}
            <div 
              ref={servicesListRef}
              className="w-full flex flex-col space-y-0"
            >
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`relative py-2.5 sm:py-3 group cursor-pointer ${
                    currentImage === index ? 'bg-neutral-800/30' : ''
                  } transition-all duration-300 rounded-lg`}
                  onClick={() => handleClick(index)}
                >
                  <div className={`absolute left-0 top-0 h-full w-1 bg-[#7e72e0] transition-opacity duration-300 rounded-r ${
                    currentImage === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  <div className="pl-3 sm:pl-4">
                    <h4 className={`text-sm sm:text-base font-medium text-neutral-100 transition-all duration-300 leading-tight ${
                      currentImage === index ? 'text-[#7e72e0] italic font-bold' : ''
                    }`}>
                      {service.title}
                    </h4>
                    <p className={`mt-0.5 sm:mt-1 text-neutral-400 text-xs sm:text-sm transition-opacity duration-300 leading-relaxed ${
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
              className="w-full h-[50vh] sm:h-[55vh] rounded-xl overflow-hidden shadow-2xl border border-neutral-800/50 bg-neutral-900 transition-all duration-500 relative"
            >
              {currentService.type === 'single' 
                ? renderSingleImage(currentService)
                : renderMultiImage(currentService)
              }
            </div>
          </div>
        </div>

        {/* Tablet Layout (768px - 1024px) */}
        <div className="w-full hidden md:block lg:hidden">
          <div className="flex flex-col gap-6">
            {/* Services List - Top section for tablet */}
            <div 
              ref={servicesListRef}
              className="w-full grid grid-cols-2 gap-4"
            >
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`relative p-4 group cursor-pointer ${
                    currentImage === index ? 'bg-neutral-800/30' : ''
                  } transition-all duration-300 rounded-lg border border-neutral-800/30`}
                  onClick={() => handleClick(index)}
                >
                  <div className={`absolute left-0 top-0 h-full w-1 bg-[#7e72e0] transition-opacity duration-300 rounded-r ${
                    currentImage === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  <div className="pl-2">
                    <h4 className={`text-base font-medium text-neutral-100 transition-all duration-300 leading-tight ${
                      currentImage === index ? 'text-[#7e72e0] italic font-bold' : ''
                    }`}>
                      {service.title}
                    </h4>
                    <p className="mt-1.5 text-neutral-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Section - Bottom section for tablet */}
            <div 
              ref={imageBoxRef}
              className="w-full h-[60vh] rounded-xl overflow-hidden shadow-2xl border border-neutral-800/50 bg-neutral-900 transition-all duration-500 relative"
            >
              {currentService.type === 'single' 
                ? renderSingleImage(currentService)
                : renderMultiImage(currentService)
              }
            </div>
          </div>
        </div>

        {/* Desktop Layout (>= 1024px) */}
        <div className="w-full hidden lg:flex flex-row gap-8 xl:gap-12 items-stretch">
          <div 
            ref={servicesListRef}
            className="w-1/2 flex flex-col justify-center space-y-1"
          >
            {services.map((service, index) => (
              <div 
                key={index}
                className="relative py-4 xl:py-5 group cursor-pointer transition-all duration-300"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className={`absolute left-0 top-0 h-full w-1 bg-[#7e72e0] transition-opacity duration-300 ${
                  isHovered && currentImage === index ? 'opacity-100' : 'opacity-0'
                }`}></div>
                <div className="pl-6 xl:pl-8">
                  <h4 className="text-2xl xl:text-3xl font-medium text-neutral-100 transition-all duration-300 leading-tight group-hover:text-[#7e72e0] group-hover:italic group-hover:font-bold">
                    {service.title}
                  </h4>
                  <p className="mt-1.5 xl:mt-2 text-neutral-400 text-sm xl:text-base transition-opacity duration-300 leading-relaxed opacity-0 group-hover:opacity-100">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div 
            ref={imageBoxRef}
            className={`w-1/2 h-[65vh] xl:h-[70vh] sticky top-24 rounded-xl overflow-hidden shadow-2xl border border-neutral-800/50 bg-neutral-900 transition-all duration-500 relative ${
              isHovered ? 'shadow-yellow-300/20' : ''
            }`}
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