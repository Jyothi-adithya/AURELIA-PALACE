import { motion } from 'framer-motion';
import Button from '../common/Button';
import Container from '../common/Container';

const HeroSection = () => {
  return (
    <div className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden -mt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80" 
          alt="Aurelia Palace Grand Ballroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
      </div>

      <Container className="relative z-10 text-center text-white mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-brand-gold font-sans font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-6 block">
            Welcome to Aurelia Palace
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 drop-shadow-lg">
            A Destination for <br className="hidden md:block"/> Celebrations
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-10 font-light drop-shadow-md">
            Experience unparalleled luxury, meticulous service, and unforgettable moments in our premium event spaces.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/enquiry" variant="primary" size="lg" className="w-full sm:w-auto">
              Plan Your Event
            </Button>
            <Button to="/spaces" variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-brand-charcoal">
              Explore Spaces
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default HeroSection;
