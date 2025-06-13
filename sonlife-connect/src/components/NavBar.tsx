import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Trap focus in mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableEls = mobileMenuRef.current.querySelectorAll('a,button');
      if (focusableEls.length) (focusableEls[0] as HTMLElement).focus();
    }
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Live Service', path: '/live-service' },
    { name: 'Pastors', path: '/community' },
    { name: 'Give', path: '/give' },
    { name: 'Salvation', path: '/salvation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-4'
      }`}
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center z-50 transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana"
          aria-label="Sonlife City Church Home"
        >
          <img 
            src="/sonlife-logo.png" 
            alt="Sonlife City Church" 
            className="h-12 w-auto md:h-14"
          />
          <span className="ml-2 font-serif font-bold text-lg text-morning-blue hidden sm:inline"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2" aria-label="Primary">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative px-3 py-2 font-medium tracking-wide text-morning-blue transition-all duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana ${
                isActive(item.path)
                  ? 'text-yellow-banana font-semibold after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:w-6 after:h-1 after:bg-yellow-banana after:rounded-full after:content-[""]' 
                  : 'hover:text-yellow-banana'
              }`}
              tabIndex={0}
              aria-current={isActive(item.path) ? 'page' : undefined}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/account" className="ml-2">
            <Button 
              variant="secondary" 
              className="font-semibold border-yellow-banana hover:border-sonlife-gold focus-visible:ring-2 focus-visible:ring-yellow-banana"
            >
              Sign In
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-50 p-2 text-morning-blue bg-persian-blue rounded-full transition-all duration-300 hover:bg-picton-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`fixed inset-0 bg-college-blue/98 backdrop-blur-lg z-40 transition-transform duration-500 ease-in-out transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden flex flex-col`}
          tabIndex={-1}
          aria-modal={isMobileMenuOpen}
          role="dialog"
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-persian-blue text-morning-blue hover:bg-picton-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-7 w-7" />
          </button>
          <div className="flex flex-col h-full justify-center items-center p-8 space-y-8">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-2xl font-medium transition-all duration-300 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-banana ${
                  isActive(item.path) ? 'text-yellow-banana font-semibold underline underline-offset-8' : 'text-morning-blue hover:text-yellow-banana'
                }`}
                style={{ transitionDelay: `${index * 0.1 + 0.2}s` }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-current={isActive(item.path) ? 'page' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/account"
              className="w-full flex justify-center"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              style={{ transitionDelay: '0.8s' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button 
                variant="secondary" 
                size="lg"
                className="mt-6 font-semibold w-full focus-visible:ring-2 focus-visible:ring-yellow-banana"
              >
                Sign In
              </Button>
            </Link>
          </div>
          {/* Mobile menu background animation */}
          <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute h-32 w-32 rounded-full bg-persian-blue/30 -top-10 -right-10 animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute h-24 w-24 rounded-full bg-picton-blue/20 bottom-20 left-10 animate-float" style={{ animationDelay: '1.5s' }} />
            <div className="absolute h-48 w-48 rounded-full bg-middle-blue/10 -bottom-20 -right-20 animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
