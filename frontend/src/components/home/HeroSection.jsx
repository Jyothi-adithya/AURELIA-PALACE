import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../common/Container';

const HeroSection = () => (
  <section className="relative h-screen min-h-[640px] max-h-[1000px] flex items-center overflow-hidden">
    {/* Full-bleed image */}
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85"
        alt="Aurelia Palace Grand Ballroom"
        className="w-full h-full object-cover"
        fetchpriority="high"
      />
      {/* Layered overlays: dark base + vignette bottom */}
      <div className="absolute inset-0 bg-brand-charcoal/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/10 to-transparent" />
    </div>

    {/* Content */}
    <Container className="relative z-10 flex flex-col justify-end h-full pb-20 md:pb-28">
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="label-xs text-brand-gold mb-6"
        >
          Heritage District · Est. 2001
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-display-2xl text-white text-balance leading-[1.04] mb-8"
        >
          Where Celebrations<br className="hidden sm:block" /> Become Legacy
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-white/65 text-base md:text-lg font-light leading-relaxed max-w-lg mb-10"
        >
          An extraordinary venue where timeless architecture meets impeccable service. Every detail curated for moments that endure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap gap-4"
        >
          <Link
            to="/enquiry"
            className="inline-flex items-center border border-brand-gold bg-brand-gold/10 text-brand-gold text-[0.65rem] font-semibold tracking-widest uppercase px-9 py-4 hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-500"
          >
            Plan Your Event
          </Link>
          <Link
            to="/spaces"
            className="inline-flex items-center border border-white/40 text-white text-[0.65rem] font-semibold tracking-widest uppercase px-9 py-4 hover:border-white hover:bg-white/10 transition-all duration-500"
          >
            Explore Spaces
          </Link>
        </motion.div>
      </div>
    </Container>

    {/* Bottom scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
      className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 text-white/40"
    >
      <span className="label-xs text-[0.55rem]" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
      <motion.div
        className="w-px h-12 bg-white/30 origin-top"
        animate={{ scaleY: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  </section>
);

export default HeroSection;
