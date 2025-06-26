import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Clients = () => {
  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);

  // Logo paths
  const NEXO = 'src/assets/images/NEXO.jpg';
  const MONK = 'src/assets/images/MONK.jpg';
  const JUSTO = 'src/assets/images/JUSTO.webp';
  const QUALICOM = 'src/assets/images/QUALICOM.jpg';
  const SURYA = 'src/assets/images/SURYA.png';
  const CODEHUB = 'src/assets/images/codehub_logo-removebg-preview.png';

  const clients = [
    { name: 'Apple', logo: NEXO },
    { name: 'Google', logo: MONK },
    { name: 'Microsoft', logo: JUSTO },
    { name: 'Amazon', logo: QUALICOM },
    { name: 'Facebook', logo: SURYA },
    { name: 'Tesla', logo: CODEHUB },
  ];

  useEffect(() => {
    const animateLoop = (el, direction = 1) => {
      const duration = 30;
      const xPercent = -50 * direction;

      gsap.fromTo(
        el,
        { xPercent: 0 },
        {
          xPercent,
          ease: 'none',
          duration,
          repeat: -1,
          modifiers: {
            xPercent: gsap.utils.wrap(-50, 0),
          },
        }
      );
    };

    if (marqueeRef1.current) animateLoop(marqueeRef1.current, 1);
    if (marqueeRef2.current) animateLoop(marqueeRef2.current, -1);
  }, []);

  const renderClientLogos = () =>
    [...clients, ...clients].map((client, index) => (
      <div
        key={`${client.name}-${index}`}
        className="relative aspect-square bg-secondary rounded-xl p-3 flex items-center justify-center min-w-[90px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] pointer-events-none select-none"
      >
        <img
          src={client.logo}
          alt={client.name}
          className="w-[60%] h-[60%] object-contain object-center transition-none"
          draggable="false"
          style={{ maxWidth: '72px', maxHeight: '72px' }}
        />
        <div className="absolute inset-0 border-2 border-transparent rounded-xl" />
      </div>
    ));

  return (
    <section className="py-16 sm:py-20 bg-secondary overflow-hidden select-none pointer-events-none">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-10 sm:mb-16">
          Trusted By Industry Leaders
        </h2>

        <div className="space-y-6 sm:space-y-8">
          <div className="flex overflow-hidden">
            <div
              ref={marqueeRef1}
              className="flex whitespace-nowrap w-max gap-4 sm:gap-6"
            >
              {renderClientLogos()}
            </div>
          </div>

          <div className="flex overflow-hidden">
            <div
              ref={marqueeRef2}
              className="flex whitespace-nowrap w-max gap-4 sm:gap-6"
            >
              {renderClientLogos()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
