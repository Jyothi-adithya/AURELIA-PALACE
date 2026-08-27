import HeroSection from '../components/home/HeroSection';
import VenueIntro from '../components/home/VenueIntro';
import EventTypesSection from '../components/home/EventTypesSection';
import FeaturedSpaces from '../components/home/FeaturedSpaces';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';

const stats = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '4',   label: 'Signature Spaces' },
  { value: '500+', label: 'Events Hosted' },
  { value: '5★',  label: 'Service Standard' },
];

const HomePage = () => (
  <div>
    <SEO title="Luxury Event Venue" description="Experience unparalleled luxury and meticulous service at Aurelia Palace — a destination for celebrations that deserve more." />

    <HeroSection />

    {/* Stats ticker */}
    <div className="bg-brand-charcoal-light border-t border-white/5">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="py-8 px-6 text-center"
            >
              <p className="font-serif text-3xl text-brand-gold mb-1">{s.value}</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>

    <VenueIntro />
    <EventTypesSection />
    <FeaturedSpaces />

    {/* Final CTA band */}
    <section className="relative py-28 md:py-36 bg-brand-ivory overflow-hidden">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="label-xs mb-4"
          >
            Begin Your Journey
          </motion.p>
          <span className="gold-rule mx-auto mb-8 block" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-display-lg text-brand-charcoal mb-6"
          >
            Your Vision, Our Canvas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-muted font-light leading-loose mb-10"
          >
            Our dedicated team is ready to transform your vision into reality. Contact us to check availability or schedule a private tour of the palace.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/enquiry"
              className="inline-flex items-center border border-brand-charcoal bg-brand-charcoal text-brand-gold text-[0.65rem] font-semibold tracking-widest uppercase px-10 py-4 hover:bg-brand-gold hover:text-brand-charcoal hover:border-brand-gold transition-all duration-500"
            >
              Submit an Enquiry
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center border border-brand-charcoal/30 text-brand-charcoal text-[0.65rem] font-semibold tracking-widest uppercase px-10 py-4 hover:border-brand-charcoal transition-all duration-400"
            >
              View Gallery
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  </div>
);

export default HomePage;
