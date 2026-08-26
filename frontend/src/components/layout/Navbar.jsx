import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import Container from '../common/Container';
import Button from '../common/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Venue', path: '/venue' },
    { name: 'Events', path: '/events' },
    { name: 'Spaces', path: '/spaces' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Stories', path: '/stories' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-brand-ivory/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-serif text-brand-charcoal flex items-center gap-2">
            <span className="text-brand-gold">❖</span>
            Aurelia Palace
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={cn(
                  "text-sm tracking-wide uppercase transition-colors hover:text-brand-gold",
                  location.pathname.startsWith(link.path) ? "text-brand-gold font-medium" : "text-brand-charcoal"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button to="/enquiry" variant="primary" size="sm">
              Enquire Now
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-brand-charcoal p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-brand-ivory z-40 lg:hidden overflow-y-auto">
          <div className="flex flex-col px-6 py-8 gap-6">
            {links.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-2xl font-serif text-brand-charcoal border-b border-brand-charcoal/10 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <Button to="/enquiry" variant="primary" size="lg" className="mt-4 w-full">
              Enquire Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
