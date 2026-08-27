import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import Container from '../common/Container';

const links = [
  { name: 'Venue',    path: '/venue' },
  { name: 'Events',   path: '/events' },
  { name: 'Spaces',   path: '/spaces' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery',  path: '/gallery' },
  { name: 'Stories',  path: '/stories' },
];

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Is this a page with a hero? Use transparent navbar on hero pages
  const heroPages = ['/', '/venue', '/events', '/spaces', '/gallery', '/stories'];
  const isHeroPage = heroPages.some(p =>
    p === '/' ? location.pathname === '/' : location.pathname.startsWith(p)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navBg = scrolled
    ? 'bg-brand-ivory/98 backdrop-blur-md border-b border-brand-stone/40 py-4'
    : isHeroPage
      ? 'bg-transparent py-7'
      : 'bg-brand-ivory border-b border-brand-stone/40 py-5';

  const linkColor = scrolled || !isHeroPage
    ? 'text-brand-charcoal hover:text-brand-gold'
    : 'text-white/90 hover:text-brand-gold';

  const logoColor = scrolled || !isHeroPage ? 'text-brand-charcoal' : 'text-white';

  return (
    <>
      <header className={cn('fixed top-0 w-full z-50 transition-all duration-500', navBg)}>
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className={cn('font-serif text-xl md:text-2xl tracking-tight transition-colors duration-500', logoColor)}
            >
              Aurelia <span className="text-brand-gold italic">Palace</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-9" aria-label="Main navigation">
              {links.map(link => {
                const isActive = link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      'text-[0.65rem] font-semibold tracking-widest uppercase transition-colors duration-300',
                      linkColor,
                      isActive && '!text-brand-gold'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <Link
                to="/enquiry"
                className={cn(
                  'text-[0.65rem] font-semibold tracking-widest uppercase border px-7 py-3 transition-all duration-400',
                  scrolled || !isHeroPage
                    ? 'border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-gold'
                    : 'border-white/60 text-white hover:bg-white hover:text-brand-charcoal'
                )}
              >
                Enquire Now
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className={cn('lg:hidden p-2 transition-colors duration-300', linkColor)}
              onClick={() => setIsOpen(v => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-brand-charcoal flex flex-col pt-24 px-8 pb-12 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 mb-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className="block font-serif text-4xl text-white/90 hover:text-brand-gold py-4 border-b border-white/10 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/enquiry"
                className="inline-flex items-center border border-brand-gold text-brand-gold text-[0.65rem] font-semibold tracking-widest uppercase px-8 py-4 hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-400 w-full justify-center"
              >
                Enquire Now
              </Link>
              <p className="text-white/30 text-xs mt-8 tracking-wide">
                enquiries@aureliapalace.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
