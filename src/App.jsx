import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Clients from "./components/Clients";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const toggleContactForm = () => {
    setIsContactFormOpen(!isContactFormOpen);
  };

  useEffect(() => {
    if (!isLoading) {
      ScrollTrigger.normalizeScroll(true);
      ScrollTrigger.refresh();

      // Smooth mouse scroll logic
      let currentScroll = window.scrollY;
      let targetScroll = window.scrollY;
      let ticking = false;

      const lerp = (a, b, n) => a * (1 - n) + b * n;

      const smoothScroll = () => {
        currentScroll = lerp(currentScroll, targetScroll, 0.1);
        window.scrollTo(0, currentScroll);
        if (Math.abs(currentScroll - targetScroll) > 0.5) {
          requestAnimationFrame(smoothScroll);
        } else {
          ticking = false;
        }
      };

      const onWheel = (e) => {
        if (Math.abs(e.deltaY) > 5) {
          e.preventDefault();

          // ✅ Apply slow factor to wheel scroll speed (e.g. 0.2)
          targetScroll += e.deltaY * 1;

          // Clamp scroll within bounds
          targetScroll = Math.max(
            0,
            Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
          );

          if (!ticking) {
            ticking = true;
            requestAnimationFrame(smoothScroll);
          }
        }
      };

      window.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", onWheel);
        ScrollTrigger.killAll();
      };
    }
  }, [isLoading]);

  return (
    <Router>
      <ScrollToTop />
      {isLoading ? (
        <Loader onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen flex flex-col overflow-x-hidden bg-white" id="app">
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero toggleContactForm={toggleContactForm} />
                    <Services />
                    <Work toggleContactForm={toggleContactForm} />
                    {/* <Clients />
                    <Testimonials toggleContactForm={toggleContactForm} /> */}
                    <ContactForm
                      isOpen={isContactFormOpen}
                      onClose={() => setIsContactFormOpen(false)}
                    />
                  </>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
