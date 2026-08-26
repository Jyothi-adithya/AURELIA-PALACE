import { Link } from 'react-router-dom';
import Container from '../common/Container';

const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-brand-ivory pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="text-3xl font-serif text-brand-gold flex items-center gap-2 mb-6">
              ❖ Aurelia
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A destination for celebrations that deserve more than a venue. Experience unparalleled luxury and meticulous service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif mb-6 text-white">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/venue" className="hover:text-brand-gold transition-colors">The Venue</Link></li>
              <li><Link to="/events" className="hover:text-brand-gold transition-colors">Event Types</Link></li>
              <li><Link to="/spaces" className="hover:text-brand-gold transition-colors">Our Spaces</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-gold transition-colors">Gallery</Link></li>
              <li><Link to="/stories" className="hover:text-brand-gold transition-colors">Stories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>123 Royal Boulevard</li>
              <li>Heritage District, HD 10203</li>
              <li><a href="mailto:enquiries@aureliapalace.com" className="hover:text-brand-gold transition-colors">enquiries@aureliapalace.com</a></li>
              <li><a href="tel:+12345678900" className="hover:text-brand-gold transition-colors">+1 (234) 567-8900</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-serif mb-6 text-white">Follow Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Aurelia Palace. All rights reserved. (Fictional Venue)</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/admin/login" className="hover:text-brand-gold transition-colors">Admin Login</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
