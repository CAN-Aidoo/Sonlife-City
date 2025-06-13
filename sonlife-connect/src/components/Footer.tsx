import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-college-blue text-morning-blue relative overflow-hidden border-t border-persian-blue/20">
      {/* Decorative background elements (subtle, less visual noise) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-persian-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-picton-blue/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Branding & Social */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana" aria-label="Sonlife City Church">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-yellow-banana transition-all duration-300 group-hover:border-picton-blue">
                <div className="absolute inset-0 bg-persian-blue flex items-center justify-center transition-all duration-300 group-hover:bg-picton-blue">
                  <span className="text-morning-blue font-serif font-bold text-lg">SL</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold leading-tight text-morning-blue">Sonlife</span>
                <span className="text-xs font-medium leading-tight text-morning-blue/70">City Church HQ</span>
              </div>
            </Link>
            <p className="text-morning-blue/80 text-sm max-w-xs">
              Bringing believers to the full Knowledge of Christ, taking the full gospel to every nation, everybody, everyday.
            </p>
            <div className="flex space-x-3 mt-4" aria-label="Social media links">
              <a href="#" aria-label="Facebook" className="rounded-full p-2 text-morning-blue/70 hover:text-yellow-banana focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-full p-2 text-morning-blue/70 hover:text-yellow-banana focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-full p-2 text-morning-blue/70 hover:text-yellow-banana focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="rounded-full p-2 text-morning-blue/70 hover:text-yellow-banana focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-banana">Quick Links</h3>
            <ul className="space-y-2" aria-label="Quick links">
              <li>
                <Link to="/" className="block px-2 py-1 rounded hover:bg-persian-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/about" className="block px-2 py-1 rounded hover:bg-persian-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link to="/live-service" className="block px-2 py-1 rounded hover:bg-persian-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">Live Service</Link>
              </li>
              <li>
                <Link to="/community" className="block px-2 py-1 rounded hover:bg-persian-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">Community</Link>
              </li>
              <li>
                <Link to="/give" className="block px-2 py-1 rounded hover:bg-persian-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">Give</Link>
              </li>
              <li>
                <Link to="/salvation" className="block px-2 py-1 rounded hover:bg-persian-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">Salvation</Link>
              </li>
            </ul>
          </div>
          {/* Service Times */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-banana">Service Times</h3>
            <ul className="space-y-3" aria-label="Service times">
              <li className="flex items-center space-x-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-morning-blue/10 mr-2"><ClockIcon /></span>
                <div>
                  <span className="font-medium text-morning-blue">Sunday Service</span>
                  <span className="block text-morning-blue/70 text-sm">07:00 AM - 10:00 AM</span>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-morning-blue/10 mr-2"><ClockIcon /></span>
                <div>
                  <span className="font-medium text-morning-blue">Wednesday Service</span>
                  <span className="block text-morning-blue/70 text-sm">17:45 PM - 19:00 PM</span>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-morning-blue/10 mr-2"><ClockIcon /></span>
                <div>
                  <span className="font-medium text-morning-blue">Monday Prayer</span>
                  <span className="block text-morning-blue/70 text-sm">17:45 PM - 19:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-banana">Contact Us</h3>
            <ul className="space-y-3" aria-label="Contact info">
              <li className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-picton-blue shrink-0 mt-0.5" />
                <span className="text-morning-blue/80">SonLife City Church, Holy Grounds Auditorium, opposite Residency off Sunyani Road</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-picton-blue shrink-0" />
                <span className="text-morning-blue/80">+233 54 000 0000</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-picton-blue shrink-0" />
                <span className="text-morning-blue/80">info@sonlifecitychurch.org</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-persian-blue/30 flex flex-col md:flex-row justify-between items-center gap-4 fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-morning-blue/60 text-sm">
            &copy; {new Date().getFullYear()} Sonlife City Church HQ. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-morning-blue/60 hover:text-yellow-banana text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms-of-use" className="text-morning-blue/60 hover:text-yellow-banana text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana transition-colors duration-200">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Simple clock icon for service times
function ClockIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
  );
}

export default Footer;
