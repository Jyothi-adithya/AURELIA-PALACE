import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../common/Container';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const VenueIntro = () => (
  <section className="py-28 md:py-36 bg-brand-ivory overflow-hidden">
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image block */}
        <motion.div {...fadeUp(0)} className="relative">
          <div className="img-hover aspect-[3/4] max-w-md mx-auto lg:mx-0">
            <img
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=85"
              alt="Aurelia Palace exterior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Floating stat badge */}
          <motion.div
            {...fadeUp(0.4)}
            className="absolute -bottom-6 -right-0 lg:-right-8 bg-white p-6 shadow-sm border-l-2 border-brand-gold max-w-[180px]"
          >
            <p className="font-serif text-4xl text-brand-charcoal mb-1">25+</p>
            <p className="text-xs text-brand-muted font-light leading-snug uppercase tracking-wide">Years of Extraordinary Events</p>
          </motion.div>
          {/* Gold accent block */}
          <div className="absolute -z-10 -bottom-4 -left-4 w-48 h-64 bg-brand-stone/30" />
        </motion.div>

        {/* Text block */}
        <div className="lg:pt-8">
          <motion.p {...fadeUp(0.1)} className="label-xs mb-4">The Heritage</motion.p>
          <span className="gold-rule mb-8 block" />

          <motion.h2 {...fadeUp(0.2)} className="font-serif text-display-lg text-brand-charcoal mb-8 text-balance">
            Where Elegance Meets Extraordinary
          </motion.h2>

          <motion.div {...fadeUp(0.3)} className="space-y-5 text-brand-muted font-light leading-loose text-[1.0625rem] mb-10">
            <p>
              Nestled in the heart of the heritage district, Aurelia Palace stands as a testament to timeless architecture and modern luxury.
            </p>
            <p>
              For over two decades, we have been the backdrop to life's most precious moments — offering an ambiance that whispers sophistication and spaces that roar with grandeur. Every archway, chandelier, and garden path has been curated to make your event extraordinary.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.4)}>
            <Link
              to="/venue"
              className="link-underline text-brand-charcoal hover:text-brand-gold"
            >
              Discover Our Story →
            </Link>
          </motion.div>
        </div>
      </div>
    </Container>
  </section>
);

export default VenueIntro;
