import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { spaceService } from '../../services/spaceService';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { CardSkeleton } from '../common/Skeleton';

const FeaturedSpaces = () => {
  const { data: spaces, loading } = useFetch(spaceService.getAll);

  const display = spaces
    ? (spaces.filter(s => s.featured).length > 0
        ? spaces.filter(s => s.featured).slice(0, 3)
        : spaces.slice(0, 3))
    : [];

  return (
    <section className="py-28 md:py-36 bg-brand-ivory-dark">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            title="Signature Spaces"
            subtitle="The Venues"
            className="mb-0"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/spaces" className="link-underline text-brand-muted hover:text-brand-charcoal">
              View All Spaces
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {display.map((space, i) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link to={`/spaces/${space.slug}`} className="group block bg-white overflow-hidden h-full">
                  <div className="img-hover overflow-hidden aspect-[4/3]">
                    <img
                      src={space.image}
                      alt={space.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-7 border-t border-brand-stone/40">
                    <p className="label-xs text-brand-muted mb-2">Up to {space.capacity} guests</p>
                    <h3 className="font-serif text-display-sm text-brand-charcoal mb-3">{space.name}</h3>
                    <span className="link-underline text-brand-charcoal group-hover:text-brand-gold text-[0.65rem]">
                      View Details
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedSpaces;
