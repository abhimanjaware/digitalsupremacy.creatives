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

// Scroll to top on route change
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

  return (
    <Router>
      <ScrollToTop />
      {isLoading ? (
        <Loader onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen flex overflow-x-hidden bg-white flex-col">
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero toggleContactForm={toggleContactForm} />
                    <Services />
                    <Work toggleContactForm={toggleContactForm}/>
                    {/* <Clients />
                    <Testimonials toggleContactForm={toggleContactForm} /> */}
                    <ContactForm
                      isOpen={isContactFormOpen}
                      onClose={() => setIsContactFormOpen(false)}
                    />{" "}
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
