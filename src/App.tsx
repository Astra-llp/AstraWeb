import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingControls } from './components/FloatingControls';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Team } from './pages/Team';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Instructions } from './pages/Instructions';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen text-slate-800 dark:text-slate-100 bg-brand-light dark:bg-brand-dark transition-colors duration-500 font-sans antialiased">
          
          {/* Global Sticky Navbar */}
          <Navbar />
          
          {/* Main App Page Viewport */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/team" element={<Team />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/instructions" element={<Instructions />} />
            </Routes>
          </main>
          
          {/* Global Interactive Footer */}
          <Footer />

          {/* Floating Assist widgets (WhatsApp, elevator arrow, magnetic trail cursor) */}
          <FloatingControls />
          
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
