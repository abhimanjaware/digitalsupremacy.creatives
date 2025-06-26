import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ContactForm = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.set([formRef.current, overlayRef.current], { display: 'block' });
      gsap.fromTo(
        formRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
    } else {
      gsap.to(formRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          gsap.set([formRef.current, overlayRef.current], { display: 'none' });
        }
      });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden"
        onClick={onClose}
      />

      {/* Form */}
      <div
        ref={formRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 hidden w-[95%] sm:w-[90%] md:w-[80%] lg:w-full max-w-md px-4 sm:px-6"
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-500 to-violet-700 p-4 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl font-bold">Get in Touch</h2>
            <p className="opacity-90 text-sm sm:text-base">We'd love to hear from you!</p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm sm:text-base"
                placeholder="abc@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm sm:text-base"
                placeholder="+91 0000000000"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">
                Business/Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="business"
                name="business"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Acme Inc."
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Tell us about your project or inquiry..."
              ></textarea>
            </div>

            {/* Actions */}
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
