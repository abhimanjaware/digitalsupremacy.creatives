import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Long-form YouTube Videos',
    sectionTitle: 'Make Every Second Count – Long-Form Video Editing That Engages',
    description: 'We craft compelling long-form content that keeps viewers hooked till the very end.',
    whatWeDo: ['Multi-cam sync', 'Smooth transitions & B-roll', 'Title cards & lower thirds', 'Color grading & sound design'],
    cta: "🎬 Let's turn your raw footage into binge-worthy content.",
    videos: [
      { url: 'src/assets/videos/yt1dhan ipo investing.mp4', thumbnail: 'src/assets/images/yt1dhan ipo investing.jpg', title: 'Documentary Style', description: 'Cinematic storytelling approach' },
      { url: 'src/assets/videos/yt2dhan small cap.mp4', thumbnail: 'src/assets/images/yt2dhan small cap.jpg', title: 'Educational Content', description: 'Clear visual explanations' },
      { url: 'src/assets/videos/yt3dhan today in markets.mp4', thumbnail: 'src/assets/images/yt3Dhan today in markets.jpg', title: 'Vlog Production', description: 'Personal brand storytelling' }
    ]
  },
  {
    title: 'Podcast Editing',
    sectionTitle: 'From Audio to Impact – Pro-Level Podcast Videos',
    description: 'Give your podcast the visual edge. We turn your recorded sessions into polished video episodes.',
    whatWeDo: ['Multi-angle visual sync', 'Branded intros/outros', 'Subtitles & waveform animations', 'Noise reduction & mastering'],
    cta: "🎧 Let your podcast look as good as it sounds.",
    videos: [
      { url: 'src/assets/videos/p1army podcast trailer.mp4', thumbnail: 'src/assets/images/p1army podcast.jpeg', title: 'Audio Cleanup', description: 'Noise reduction & enhancement' },
      { url: 'src/assets/videos/p2brahmos podcast.mp4', thumbnail: 'src/assets/images/p2brahmos podcast.jpg', title: 'Multi-track Mixing', description: 'Perfect audio balance' },
      { url: 'src/assets/videos/p3grow podcast.mp4', thumbnail: 'src/assets/images/p3groww podcast.jpg', title: 'Video Podcast', description: 'Synchronized video editing' }
    ]
  },
  {
    title: 'Commercial Ads',
    sectionTitle: 'Ads That Convert – Cinematic, Branded, Powerful',
    description: 'We create high-impact video ads designed to sell.',
    whatWeDo: ['Scripting support (if needed)', 'Product highlights & animations', 'Call-to-action visuals', 'Soundtracks & SFX'],
    cta: "🔥 Ready to create scroll-proof ads that convert like crazy?",
    videos: [
      { url: 'src/assets/videos/ca1hardik raja ppt.MP4', thumbnail: 'src/assets/images/hardikhhtumb.png', title: 'Brand Commercial', description: 'Corporate identity videos' },
      { url: 'src/assets/videos/ca2qualicom ad.mp4', thumbnail: 'src/assets/images/freepik__expand__52420.png', title: 'Product Launch', description: 'High-conversion advertising' },
      { url: 'src/assets/videos/ca3THERMAX ad.mp4', thumbnail: 'src/assets/images/thermaxthumb.png', title: 'Social Media Ads', description: 'Platform-specific optimization' }
    ]
  },
  {
    title: 'Short-form Content',
    sectionTitle: 'Scroll-Stopping Shorts – Built for Virality',
    description: 'Short-form content is king. We design punchy, fast-paced edits that are optimized for Instagram Reels, YouTube Shorts, and TikTok.',
    whatWeDo: ['Hook-focused editing', 'Captions & emojis', 'Zoom cuts & kinetic effects', 'Sound syncing to trends'],
    cta: "🚀 Let's make your brand go viral in under 60 seconds.",
    videos: [
      { 
        url: 'src/assets/videos/shorts111111.mp4', 
        title: 'Instagram Reel Edit', 
        description: 'Quick cuts with trending music',
        style: { 
          objectFit: 'cover',
          height: '100%',
          width: '100%',
          alignSelf: 'flex-start'
        }
      },
      { 
        url: 'src/assets/videos/sh2codehub ad jan.mp4', 
        title: 'TikTok Viral Edit', 
        description: 'Hook within first 3 seconds',
        style: { 
          objectFit: 'cover',
          height: '100%',
          width: 'auto',
          aspectRatio: '9/16',
          margin: '0 auto',
          display: 'block'
        }
      },
      { 
        url: 'src/assets/videos/sh3EONX_English.mp4', 
        title: 'YouTube Shorts', 
        description: 'Vertical format optimization',
        style: { 
          objectFit: 'cover',
          height: '100%',
          width: 'auto',
          aspectRatio: '9/16',
          margin: '0 auto',
          display: 'block'
        }
      }
    ]
  },
  {
    title: 'Graphic Design',
    sectionTitle: 'Visual Identity That Speaks Volumes – Designs That Define Brands',
    description: 'From logos to complete brand identities, we create stunning visuals that make your brand unforgettable and instantly recognizable.',
    whatWeDo: ['Brand identity & logo design', 'Social media graphics & templates', 'Print design & marketing materials', 'UI/UX design elements'],
    cta: "🎨 Let's create a visual identity that sets you apart from the competition.",
    videos: [
      { 
        title: 'Brand Identity Design', 
        description: 'Complete visual brand transformation',
        images: [
          'src/assets/images/graphicsthumbnail.png'
        ]
      },
      { 
        title: 'Marketing Posters', 
        description: 'Eye-catching promotional materials',
        images: [
          'src/assets/images/graphicsposter1.jpg',
          'src/assets/images/graphicsposter2.jpg'
        ]
      },
      { 
        title: 'Social Media Posts', 
        description: 'Consistent brand presence across platforms',
        images: [
          'src/assets/images/graphicspost1.png',
          'src/assets/images/graphicspost2.png.jpg',
        ]
      }
    ]
  }
];

const Work = ({ toggleContactForm }) => {
  const refs = {
    container: useRef(null),
    leftSec: useRef([]),
    rightSec: useRef([]),
    ourWork: useRef(null),
    letters: useRef([]),
    serviceContainers: useRef([]),
    cta: useRef(null),
    videoContainers: useRef([])
  };

  const ourWorkLetters = useMemo(() => "OUR WORK".split(""), []);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    
    // Performance optimizations
    gsap.config({
      force3D: false,
      autoSleep: 60,
      nullTargetWarn: false
    });

    const ctx = gsap.context(() => {
      // Optimized initial setup
      gsap.set(refs.letters.current, { 
        opacity: 0, 
        y: 50,
        rotationX: -45,
        scale: 0.8,
        filter: "blur(5px)",
        transformOrigin: "center bottom"
      });
      
      // Faster stagger animations
      refs.serviceContainers.current.forEach(section => {
        if (!section) return;
        const left = section.querySelector('.left-section');
        const mobileTitle = section.querySelector('.mobile-title');
        if (left?.children) gsap.set(left.children, { opacity: 0, x: -50, stagger: 0.05 });
        if (mobileTitle?.children) gsap.set(mobileTitle.children, { opacity: 0, y: 30 });
      });

      if (refs.cta.current?.children) gsap.set(refs.cta.current.children, { opacity: 0, scale: 0.9, y: 30 });

      // Optimized ScrollTrigger animations
      refs.rightSec.current.forEach((section) => {
        if (!section) return;
        const [video, info] = [section.querySelector('.video-container'), section.querySelector('.video-info')];
        if (video && info) gsap.set([video, info], { opacity: 0, y: 50, scale: 0.98 });
        
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: section,
            start: "top bottom-=50",
            end: "bottom top+=50",
            onEnter: () => {
              gsap.to(section, { autoAlpha: 1, duration: 0.3 });
            },
            onLeaveBack: () => {
              gsap.to(section, { autoAlpha: 1, duration: 0.3 });
            }
          });
        }
      });

      if (!isMobile) {
        ScrollTrigger.create({
          trigger: refs.ourWork.current,
          start: "top top",
          end: "+=1500",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: self => {
            const progress = self.progress;
            refs.letters.current.forEach((letter, i) => {
              if (!letter) return;
              const letterProgress = Math.max(0, Math.min(1, (progress - i * 0.05) * 4));
              gsap.to(letter, {
                opacity: letterProgress,
                y: 50 - (letterProgress * 50),
                rotationX: -45 + (letterProgress * 45),
                scale: 0.8 + (letterProgress * 0.2),
                filter: `blur(${5 - (letterProgress * 5)}px)`,
                duration: 0.1,
                ease: "power1.out"
              });
            });
          }
        });
      } else {
        // Faster mobile animation
        gsap.to(refs.letters.current, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.05,
          ease: "power1.out",
          scrollTrigger: {
            trigger: refs.ourWork.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }

      // Optimized section animations
      refs.serviceContainers.current.forEach((section, i) => {
        if (!section) return;
        const left = section.querySelector('.left-section');
        const mobileTitle = section.querySelector('.mobile-title');
        
        ScrollTrigger.create({
          trigger: section,
          start: isMobile ? "top 85%" : "top 75%",
          onEnter: () => {
            if (left?.children) gsap.to(left.children, { 
              opacity: 1, 
              x: 0, 
              duration: 0.8,
              stagger: 0.1,
              ease: "power1.out"
            });
            if (mobileTitle?.children) gsap.to(mobileTitle.children, { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              stagger: 0.1,
              ease: "power1.out"
            });
          },
          onLeaveBack: () => {
            if (left?.children) gsap.to(left.children, { 
              opacity: 0, 
              x: -50,
              duration: 0.5,
              stagger: 0.05,
              ease: "power1.in"
            });
            if (mobileTitle?.children) gsap.to(mobileTitle.children, { 
              opacity: 0, 
              y: 30,
              duration: 0.5,
              stagger: 0.05,
              ease: "power1.in"
            });
          }
        });

        if (!isMobile) {
          const rights = refs.rightSec.current.slice(i * 3, (i + 1) * 3);
          if (refs.leftSec.current[i] && rights[0] && rights[2]) {
            ScrollTrigger.create({
              trigger: rights[0],
              start: "top top",
              end: () => `+=${rights[2].offsetHeight * 2.5}`,
              pin: refs.leftSec.current[i],
              pinSpacing: false,
              anticipatePin: 1
            });
          }
        }
      });

      // Optimized video animations
      refs.rightSec.current.forEach(section => {
        if (!section) return;
        const [video, info] = [section.querySelector('.video-container'), section.querySelector('.video-info')];
        ScrollTrigger.create({
          trigger: section,
          start: isMobile ? "top 85%" : "top 80%",
          onEnter: () => {
            gsap.to(video, { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              duration: 0.8,
              ease: "power1.out"
            }, 'a');
            gsap.to(info, { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 0.8,
              ease: "power1.out"
            }, 'a');
          },
          onLeaveBack: () => gsap.to([video, info], { 
            opacity: 0, 
            y: 50,
            scale: 0.98,
            duration: 0.5,
            ease: "power1.in"
          })
        });
      });

      // Faster CTA animation
      if (refs.cta.current?.children) {
        ScrollTrigger.create({
          trigger: refs.cta.current,
          start: "top 80%",
          onEnter: () => gsap.to(refs.cta.current.children, { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.4)"
          }),
          onLeaveBack: () => gsap.to(refs.cta.current.children, { 
            opacity: 0, 
            scale: 0.9, 
            y: 30,
            duration: 0.4,
            stagger: 0.05,
            ease: "power1.in"
          })
        });
      }

      // Performance optimizations
      ScrollTrigger.normalizeScroll(true);
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
      });
      ScrollTrigger.refresh();
    }, refs.container);

    return () => ctx.revert();
  }, [refs.container, refs.cta, refs.leftSec, refs.letters, refs.ourWork, refs.rightSec, refs.serviceContainers]);

  const VideoThumbnail = ({ video, serviceTitle, index }) => {
    const videoContainerRef = useRef(null);
    const thumbnailHiddenRef = useRef(false);
    const isShortForm = serviceTitle === 'Short-form Content';
    const isImage = video.url && (video.url.includes('placeholder') || video.url.match(/\.(jpg|jpeg|png|gif|webp)$/i));
    const isGraphicDesign = serviceTitle === 'Graphic Design';

    if (isGraphicDesign && video.images) {
      const imageCount = video.images.length;
      const gridClass = imageCount === 1 ? 'grid-cols-1' : 
                       imageCount === 2 ? 'grid-cols-2' : 
                       'grid-cols-3';

      return (
        <div 
          ref={videoContainerRef}
          className="video-container relative overflow-hidden rounded-xl shadow-2xl h-[60vw] sm:h-[50vw] md:h-[40vw] lg:h-[29vw] group cursor-pointer transform transition-all duration-500 bg-gradient-to-br from-purple-100 to-blue-100 p-2 sm:p-4"
        >
          <div className={`grid ${gridClass} gap-2 sm:gap-4 md:gap-6 h-full`}>
            {video.images.map((imageUrl, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-lg bg-white border-2 border-white hover:border-purple-300 transition-all duration-300"
              >
                <img 
                  src={imageUrl} 
                  alt={`Design ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isShortForm) {
      return (
        <div 
          ref={el => {
            videoContainerRef.current = el;
            refs.videoContainers.current[index] = el;
          }}
          className="video-container relative rounded-xl h-[60vw] sm:h-[50vw] md:h-[40vw] lg:h-[29vw] group cursor-pointer transform transition-all duration-500"
          style={{ background: 'transparent' }}
        >
          <video 
            className="w-full h-full"
            style={video.style || {}}
            src={video.url} 
            controls 
            preload="auto"
            playsInline
            muted
            autoPlay
            loop
          />
        </div>
      );
    }

    return (
      <div 
        ref={el => {
          videoContainerRef.current = el;
          refs.videoContainers.current[index] = el;
        }}
        className="video-container relative overflow-hidden rounded-xl shadow-2xl h-[60vw] sm:h-[50vw] md:h-[40vw] lg:h-[29vw] group cursor-pointer transform transition-all duration-500"
        onMouseEnter={e => {
          if (isImage) {
            const imgEl = e.currentTarget.querySelector('img');
            gsap.to(imgEl, { 
              scale: 1.05, 
              duration: 0.3, 
              ease: "power1.out" 
            });
            return;
          }

          if (thumbnailHiddenRef.current) return;
          
          const videoEl = e.currentTarget.querySelector('video');
          const imgEl = e.currentTarget.querySelector('img');
          
          if (videoEl) {
            videoEl.load();
            gsap.to(imgEl, { 
              opacity: 0, 
              duration: 0.3, 
              ease: "power1.out",
              onComplete: () => {
                thumbnailHiddenRef.current = true;
                imgEl.style.pointerEvents = 'none';
              }
            });
            gsap.to(videoEl, { 
              duration: 0.3, 
              ease: "power1.out" 
            });
          }
        }}
        onMouseLeave={e => {
          if (isImage) {
            const imgEl = e.currentTarget.querySelector('img');
            gsap.to(imgEl, { 
              scale: 1, 
              duration: 0.3, 
              ease: "power1.out" 
            });
            return;
          }

          if (!thumbnailHiddenRef.current) return;
          
          const videoEl = e.currentTarget.querySelector('video');
          if (videoEl) {
            gsap.to(videoEl, { 
              scale: 1, 
              duration: 0.3, 
              ease: "power1.out" 
            });
          }
        }}>
        
        {!isImage && (
          <video 
            className="w-full h-full object-contain absolute inset-0 transform transition-transform duration-300" 
            src={video.url} 
            controls 
            preload="metadata" 
            loading="lazy"
          />
        )}
        
        <img 
          src={video.thumbnail || video.url} 
          alt={video.title} 
          className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-out ${!isImage ? 'z-10' : 'z-0'}`} 
        />
      </div>
    );
  };

  return (
    <div className="overflow-hidden relative" ref={refs.container}>
      <style jsx>{`
        .video-container {
          background: transparent;
          will-change: transform, opacity;
        }
        .video-container video {
          max-height: 100%;
          max-width: 100%;
          background: transparent;
          transform: translateZ(0);
        }
        @media (max-width: 1023px) {
          .mobile-content {
            justify-content: flex-start !important;
            align-items: flex-start !important;
            text-align: left !important;
          }
          .mobile-content .video-info {
            text-align: left !important;
          }
          .mobile-content .flex {
            justify-content: flex-start !important;
          }
          * {
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    
      <div ref={refs.ourWork} className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white sticky top-0 z-10 px-4 sm:px-6">
        <div className="sub-desc absolute top-4 sm:top-6 right-4 sm:right-6 lg:right-10 w-[40%] sm:w-[30%] lg:max-w-[20%]">
          <p className='text-black capitalize text-xs sm:text-sm md:text-[18px]'>
            <span className='font-bold'>Our Clients -</span> are enterprenuers, civic change - makers & corporate brand doing good. 
          </p>
        </div>
        <div className="text-center w-full px-2">
          <h2 className="text-black font-bold text-[40px] xs:text-[50px] sm:text-[60px] md:text-[80px] lg:text-[120px] xl:text-[220px] leading-none tracking-wide">
            {ourWorkLetters.map((l, i) => (
              <span 
                key={i} 
                ref={el => (refs.letters.current[i] = el)} 
                className="inline-block origin-bottom transform-gpu will-change-transform"
                style={{ display: 'inline-block' }}
              >
                {l === " " ? "\u00A0" : l}
              </span>
            ))}
          </h2>
        </div>
      </div>

      {services.map((service, i) => (
        <div key={i} className="flex flex-col lg:flex-row min-h-[100vh] lg:min-h-[300vh]" ref={el => (refs.serviceContainers.current[i] = el)}>
          <div ref={el => (refs.leftSec.current[i] = el)} className="w-full lg:w-[35vw] bg-gradient-to-br from-purple-900 to-blue-900 hidden lg:flex items-center justify-start sticky top-0 h-screen">
            <div className="text-left px-6 xl:px-8 left-section max-w-md">
              <h3 className="text-zinc-300 font-[Bebas_Neue] text-[1.8vw] xl:text-[2vw] leading-none whitespace-nowrap uppercase">{service.title.split(" ")[0]}</h3>
              <h4 className="text-white font-[Bebas_Neue] whitespace-nowrap text-[3.2vw] xl:text-[3.8vw] mt-[-5px] uppercase leading-none mb-4 xl:mb-6">{service.title.split(" ").slice(1).join(" ")}</h4>
              <p className="text-white/80 font-[Quicksand] text-base xl:text-lg leading-tight mb-6 xl:mb-8">{service.description}</p>
              <div className="mb-6 xl:mb-8">
                <h5 className="text-white font-[Bebas_Neue] text-lg xl:text-xl mb-3 xl:mb-4">What We Do:</h5>
                <ul className="space-y-2 text-white/80 font-[Quicksand] text-sm xl:text-base">
                  {service.whatWeDo.map((item, idx) => (
                    <li key={idx} className="flex items-center"><span className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0"></span>{item}</li>
                  ))}
                </ul>
              </div>       
              <div className="mt-6 xl:mt-8">
                <button onClick={toggleContactForm} className="bg-white text-purple-900 px-4 xl:px-6 py-2 xl:py-3 my-6 xl:my-8 rounded-full font-bold text-xs xl:text-sm hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">Get Started Now</button>
                <p className="text-white/60 font-[Quicksand] text-xs xl:text-sm mt-3 leading-relaxed">{service.cta}</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[70vw]">
            {service.videos.map((video, j) => (
              <div 
                key={j} 
                ref={el => (refs.rightSec.current[i * 3 + j] = el)} 
                className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 ${service.title === 'Short-form Content' ? 'bg-transparent' : (j % 2 === 0 ? "bg-white" : "bg-zinc-50")}`}
              >
                <div className="lg:hidden w-full mb-4 sm:mb-6 md:mb-8 text-left mobile-title">
                  <h3 className="text-purple-800 font-[Bebas_Neue] text-[32px] xs:text-[36px] sm:text-[40px] md:text-[50px] lg:text-[60px] mb-2 leading-tight">{service.title}</h3>
                  <p className="font-[Quicksand] text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{service.description}</p>
                </div>
                <div className="w-full max-w-4xl px-2 sm:px-4 mobile-content">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8">
                    <VideoThumbnail video={video} serviceTitle={service.title} index={i * 3 + j} />
                    <div className="video-info space-y-2 sm:space-y-3 md:space-y-4 text-center lg:text-left">
                      <div>
                        <span className="text-purple-600 font-bold text-xs sm:text-sm uppercase tracking-wider">{service.title === 'Graphic Design' ? 'Design' : 'Video'} {j + 1}</span>
                        <h4 className="text-xl sm:text-2xl md:text-3xl font-[Bebas_Neue] text-gray-900 mt-1">{video.title}</h4>
                      </div>
                      <p className="text-gray-600 font-[Quicksand] text-sm sm:text-base md:text-lg leading-relaxed">{video.description}</p>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 pt-2 sm:pt-3 md:pt-4">
                        {/* <button className="bg-purple-900 text-white px-4 sm:px-5 md:px-6 py-1 sm:py-2 rounded-full hover:bg-purple-800 transition-colors duration-300 font-medium text-xs sm:text-sm md:text-base">
                          {service.title === 'Graphic Design' ? 'View Portfolio' : 'Watch Demo'}
                        </button> */}
                        <button onClick={toggleContactForm} className="border-2 border-purple-900 text-purple-900 px-4 sm:px-5 md:px-6 py-1 sm:py-2 rounded-full hover:bg-purple-900 hover:text-white transition-colors duration-300 font-medium text-xs sm:text-sm md:text-base">Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>   
              </div>
            ))}
          </div>
        </div>
      ))}

      <div ref={refs.cta} className="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-50">
        <div className="text-center text-white max-w-4xl px-4">
          <h3 className="font-[Bebas_Neue] text-[36px] xs:text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] xl:text-[120px] leading-none mb-4 sm:mb-6">Ready to Create?</h3>
          <p className="font-[Quicksand] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's bring your vision to life with professional video editing that captivates and converts your audience.
          </p>
          <button onClick={toggleContactForm} className="bg-white text-purple-900 px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-colors duration-300">Start Your Project</button>
        </div>
      </div>
    </div>
  );
};

export default Work;