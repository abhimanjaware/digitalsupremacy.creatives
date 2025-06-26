import { useEffect, useRef, useLayoutEffect, useCallback } from 'react';

// ⚠️ Replace with real gsap in production
const gsap = {
  to: (target, options) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const { duration = 1, delay = 0, onStart, onComplete, ease, ...props } = options;

    if (onStart) setTimeout(onStart, delay * 1000);

    setTimeout(() => {
      let transform = element.style.transform || '';

      Object.keys(props).forEach((prop) => {
        if (prop === 'x') transform += ` translateX(${props[prop]})`;
        else if (prop === 'y') transform += ` translateY(${props[prop]})`;
        else if (prop === 'scale') transform += ` scale(${props[prop]})`;
        else if (prop === 'opacity') element.style.opacity = props[prop];
      });

      element.style.transition = `all ${duration}s ${ease || 'ease'}`;
      element.style.transform = transform.trim();

      if (onComplete) onComplete();
    }, delay * 1000 + duration * 1000);
  },
};

const MARQUEE_TEXT = 'LOADING DIGITAL';
const ROWS = 7;
const COLUMNS = 10;

const Loader = ({ onLoadingComplete }) => {
  const marqueeRefs = useRef([]);
  const loaderRef = useRef(null);
  const glowRef = useRef(null);
  const whiteWipeRef = useRef(null);

  const marqueeGrid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLUMNS }, () => MARQUEE_TEXT)
  );

  useLayoutEffect(() => {
    marqueeRefs.current.forEach((row, i) => {
      if (!row) return;

      const isEvenRow = i % 2 === 0;
      const duration = 25 + i * 2;

      row.style.transform = isEvenRow ? 'translateX(0%)' : 'translateX(-100%)';

      row.animate(
        [
          { transform: isEvenRow ? 'translateX(0%)' : 'translateX(-100%)' },
          { transform: isEvenRow ? 'translateX(-100%)' : 'translateX(0%)' },
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          easing: 'linear',
        }
      );

      gsap.to(row, {
        opacity: 0.3,
        duration: 0.6,
        delay: i * 0.05,
        ease: 'ease-out',
      });
    });
  }, []);

  const startExitAnimation = useCallback(() => {
    marqueeRefs.current.forEach((row, i) => {
      gsap.to(row, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.07,
        ease: 'ease-in-out',
      });
    });

    gsap.to(glowRef.current, {
      scale: 0.3,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.out',
    });

    gsap.to(whiteWipeRef.current, {
      y: '-100%',
      scale: 1.1,
      opacity: 1,
      duration: 1.1,
      delay: 1.0,
      ease: 'cubic-bezier(0.77, 0, 0.175, 1)',
    });

    gsap.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 2.1,
      ease: 'ease-in',
      onComplete: () => {
        if (onLoadingComplete) onLoadingComplete();
      },
    });
  }, [onLoadingComplete]);

  useEffect(() => {
    const timer = setTimeout(startExitAnimation, 3000);
    return () => clearTimeout(timer);
  }, [startExitAnimation]);

  return (
    <div
      ref={loaderRef}
      className="loader-container fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Full-screen Marquee Grid */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between items-center select-none pointer-events-none">
        {marqueeGrid.map((row, rowIdx) => (
          <div
            key={rowIdx}
            ref={(el) => (marqueeRefs.current[rowIdx] = el)}
            className="flex whitespace-nowrap w-full flex-1 items-center opacity-0"
            style={{
              fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
              willChange: 'transform, opacity',
              fontSize: 'clamp(52px, 12vw, 14.5vh)',
              letterSpacing: '0.2em',
              WebkitTextStroke: '5px #333',
              color: 'transparent',
              textStroke: '3px #333',
              minWidth: '200%',
              lineHeight: 1,
              justifyContent: 'center',
            }}
          >
            {[...row, ...row, ...row].map((text, colIdx) => (
              <span
                key={colIdx}
                className="mx-[2.5vw] sm:mx-[3vw] md:mx-[4vw] inline-block"
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Blue Glow */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />

      {/* White Wipe Transition */}
      <div
        ref={whiteWipeRef}
        className="fixed bottom-0 left-0 w-full h-full bg-white z-[100] pointer-events-none"
        style={{
          transform: 'translateY(100%)',
          willChange: 'transform, opacity',
          transition:
            'transform 1.2s cubic-bezier(0.77, 0, 0.175, 1), scale 1.2s, opacity 1.2s',
        }}
      />

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&display=swap');

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }

        .loader-container * {
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Loader;
