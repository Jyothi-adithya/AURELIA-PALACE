import { motion } from 'framer-motion';
import Container from '../common/Container';
import Button from '../common/Button';

const VenueIntro = () => {
  return (
    <section className="py-24 bg-brand-ivory overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" 
                alt="Aurelia Palace Architecture" 
                className="w-full aspect-[4/5] object-cover rounded-sm shadow-xl"
              />
              <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square bg-brand-gold -z-10 rounded-sm" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-brand-gold font-sans font-bold tracking-widest uppercase text-sm mb-4 block">
              The Heritage
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-6 leading-tight">
              Where Elegance Meets Extraordinary
            </h2>
            <div className="space-y-6 text-gray-600 mb-10 text-lg font-light leading-relaxed">
              <p>
                Nestled in the heart of the heritage district, Aurelia Palace stands as a testament to timeless architecture and modern luxury. 
              </p>
              <p>
                For over two decades, we have been the backdrop to life's most precious moments, offering an ambiance that whispers sophistication and spaces that roar with grandeur. Every archway, chandelier, and garden path has been curated to make your event truly extraordinary.
              </p>
            </div>
            <Button to="/venue" variant="outline">
              Discover Our Story
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default VenueIntro;
