import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ContactForm = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const formEl = formRef.current;
    const overlayEl = overlayRef.current;

    if (isOpen) {
      gsap.killTweensOf([formEl, overlayEl]); // kill previous tweens if any

      gsap.set([formEl, overlayEl], {
        pointerEvents: 'auto',
        display: 'flex',
      });

      gsap.fromTo(
        overlayEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power1.out' }
      );

      gsap.fromTo(
        formEl,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          onStart: () => {
            const input = formEl.querySelector('input, textarea');
            if (input) input.focus();
          }
        }
      );
    } else {
      gsap.to(overlayEl, {
        opacity: 0,
        duration: 0.2,
        ease: 'power1.in',
        onComplete: () => {
          gsap.set(overlayEl, { pointerEvents: 'none' });
        }
      });

      gsap.to(formEl, {
        opacity: 0,
        y: 40,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(formEl, { pointerEvents: 'none' });
        }
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    onClose();
  };

  return (
    <>
      {/* Overlay (always rendered) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 opacity-0 pointer-events-none transition-opacity"
      />

      {/* Form Container (always rendered) */}
      <div
        ref={formRef}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 sm:px-6 opacity-0 pointer-events-none"
      >
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500 to-violet-700 p-4 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl font-bold">Get in Touch</h2>
            <p className="opacity-90 text-sm sm:text-base">We'd love to hear from you!</p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                placeholder="abc@example.com"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                placeholder="+91 0000000000"
              />
            </div>

            <div>
              <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">
                Business/Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="business"
                name="business"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-gray-900 text-sm sm:text-base"
                placeholder="Tell us about your project or inquiry..."
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-2 sm:space-y-0">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-md hover:from-violet-700 hover:to-violet-900 transition-colors shadow-md text-sm sm:text-base"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
