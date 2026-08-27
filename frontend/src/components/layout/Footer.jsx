import { Link } from 'react-router-dom';
import Container from '../common/Container';

const col1 = [
  { name: 'The Venue',    path: '/venue' },
  { name: 'Event Types',  path: '/events' },
  { name: 'Our Spaces',   path: '/spaces' },
  { name: 'Services',     path: '/services' },
  { name: 'Gallery',      path: '/gallery' },
  { name: 'Our Stories',  path: '/stories' },
];

const col2 = [
  { name: 'Submit an Enquiry', path: '/enquiry' },
  { name: 'Admin Portal',      path: '/admin/login' },
];

const Footer = () => (
  <footer className="bg-brand-charcoal text-white">
    {/* Top band */}
    <div className="border-b border-white/10">
      <Container>
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link to="/" className="font-serif text-3xl text-white inline-block mb-6">
              Aurelia <span className="text-brand-gold italic">Palace</span>
            </Link>
            <p className="text-white/50 text-sm font-light leading-loose max-w-xs">
              A destination for celebrations that deserve more than a venue. Experience unparalleled luxury and meticulous service in the heart of the heritage district.
            </p>
            <div className="mt-8">
              <p className="label-xs text-brand-gold/70 mb-2">Contact</p>
              <a href="mailto:enquiries@aureliapalace.com" className="text-white/60 text-sm hover:text-brand-gold transition-colors duration-300 block mb-1">
                enquiries@aureliapalace.com
              </a>
              <a href="tel:+12345678900" className="text-white/60 text-sm hover:text-brand-gold transition-colors duration-300">
                +1 (234) 567-8900
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-3">
            <p className="label-xs text-brand-gold/60 mb-6">Explore</p>
            <ul className="space-y-3">
              {col1.map(l => (
                <li key={l.name}>
                  <Link to={l.path} className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="label-xs text-brand-gold/60 mb-6">Quick Links</p>
            <ul className="space-y-3">
              {col2.map(l => (
                <li key={l.name}>
                  <Link to={l.path} className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="label-xs text-brand-gold/60 mb-6">Address</p>
            <address className="not-italic text-sm text-white/50 leading-loose font-light">
              123 Royal Boulevard<br />
              Heritage District<br />
              HD 10203
            </address>
          </div>
        </div>
      </Container>
    </div>

    {/* Bottom bar */}
    <Container>
      <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
        <p>&copy; {new Date().getFullYear()} Aurelia Palace. All rights reserved. (Fictional Venue — Interview Project)</p>
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-brand-gold/50 inline-block" />
          <span>Crafted with precision</span>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
