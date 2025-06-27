import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      gsap.fromTo(
        lettersRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 0.08,
          stagger: 0.05,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
          },
        }
      );
    }
  }, []);

  const renderLetters = (text) =>
    text.split('').map((char, index) => (
      <span
        key={index}
        ref={(el) => (lettersRef.current[index] = el)}
        className="inline-block text-[10vw] lg:text-[8vw] font-extrabold leading-none text-white pointer-events-none select-none"
      >
        {char}
      </span>
    ));

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#3C0073] h-[100vh] text-white px-4 sm:px-6 py-8 lg:py-16 rounded-tl-3xl rounded-tr-3xl font-sans overflow-hidden flex flex-col justify-between"
    >
      {/* Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-12 flex-1 items-start lg:items-stretch">
        {/* LEFT */}
        <div className="space-y-6 text-sm sm:text-base md:text-lg flex flex-col justify-between">
          <div className="space-y-3">
            <p>
              We acknowledge the Wurundjeri Woi-wurrung people as the traditional custodians of the lands, waterways, and skies
              of Merri-bek.
            </p>
            <p className="hidden sm:block">
              We pay respect to Elders past, present and emerging, and to all Aboriginal and Torres Strait Islander people.
            </p>
            <p className="hidden lg:block">
              We are committed to anti-oppression, transformative justice, and solidarity with BIPOC and LGBTQIA+ communities.
            </p>
          </div>
        </div>

        {/* CENTER */}
        <div className="space-y-6 text-sm sm:text-base flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-base mb-1">Address</h4>
              <p>
                60, Pandit Colony, <br />
                above Ananda Laundry,  <br />
                Nashik-422002.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base mb-1">New Business</h4>
              <p className="break-all">
                info@digitalsupermacy.in <br />
                +919689772863
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base mb-1">Connect</h4>
              <div className="flex space-x-3 mt-1">
                <a href="https://www.instagram.com/digitalsupremacy.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="border border-white p-2 rounded-full hover:opacity-80 transition-opacity">
                  <FaInstagram className="text-sm" />
                </a>
                <a href="https://www.linkedin.com/company/digital-supremacy-in/" className="border border-white p-2 rounded-full hover:opacity-80 transition-opacity">
                  <FaLinkedin className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex flex-col justify-between text-sm sm:text-base">
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold mb-2">Keep in touch</h4>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-md w-full max-w-sm">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent text-white placeholder-white text-sm flex-1 outline-none"
                />
                <button className="ml-4 text-sm font-semibold text-white/80 hover:text-white transition-colors">
                  JOIN →
                </button>
              </div>
            </div>

            {/* <div>
              <h4 className="text-base font-semibold mb-2">Proudly partners of:</h4>
              <div className="flex flex-col gap-3 text-white/80">
                <span className="flex items-center gap-2">
                  <img src="https://logos-world.net/wp-content/uploads/2021/09/Mr-Beast-Logo.png" className="h-4" alt="UN" />
                  United Nations Global Compact
                </span>
                <span className="flex items-center gap-2">
                  <img src="https://pngimg.com/uploads/apple_logo/apple_logo_PNG19673.png" className="h-3" alt="Carbon" />
                  Carbon Neutral Certified
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Full-width animated title - desktop only */}
      <div className="absolute bottom-0 left-0 w-full px-0 z-0 hidden lg:block">
        <div className="overflow-hidden w-full">
          <h1 className="whitespace-nowrap w-full text-center">{renderLetters('Digital Supremacy')}</h1>
        </div>
      </div>

      {/* Minimal title - mobile */}
      <div className="lg:hidden text-center text-white/10 text-[9vw] font-extrabold select-none leading-none">
        Digital Supremacy
      </div>

      {/* TM tag */}
      {/* <span className="absolute bottom-1 right-2 text-xs text-white/40 z-10">TM</span> */}
    </footer>
  );
};

export default Footer;
