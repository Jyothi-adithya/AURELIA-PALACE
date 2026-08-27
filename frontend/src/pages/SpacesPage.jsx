import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { spaceService } from '../services/spaceService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import SEO from '../components/common/SEO';

const SpacesPage = () => {
  const { data: spaces, loading, error } = useFetch(spaceService.getAll);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message="Could not load spaces." />;

  return (
    <div className="bg-brand-ivory min-h-screen">
      <SEO title="Our Spaces" description="Explore our signature event spaces — from the Grand Ballroom to the Garden Pavilion — each designed for magnificence." />

      {/* Hero */}
      <div className="pt-36 pb-20 bg-brand-charcoal text-center">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="label-xs mb-4">The Venues</motion.p>
        <span className="gold-rule mx-auto mb-7 block" />
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="font-serif text-display-xl text-white">
          Our Spaces
        </motion.h1>
      </div>

      <Container className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {spaces?.map((space, i) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={i === 0 ? 'md:col-span-2' : ''}
            >
              <Link to={`/spaces/${space.slug}`} className="group block bg-white border border-brand-stone/30 overflow-hidden">
                <div className="img-hover overflow-hidden" style={{ aspectRatio: i === 0 ? '21/9' : '4/3' }}>
                  <img
                    src={space.image}
                    alt={space.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex items-end justify-between gap-6 border-t border-brand-stone/30">
                  <div>
                    <p className="label-xs text-brand-muted mb-2">Up to {space.capacity} Guests</p>
                    <h2 className="font-serif text-display-sm text-brand-charcoal">{space.name}</h2>
                  </div>
                  <span className="link-underline text-brand-charcoal group-hover:text-brand-gold shrink-0">
                    View Space
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SpacesPage;
