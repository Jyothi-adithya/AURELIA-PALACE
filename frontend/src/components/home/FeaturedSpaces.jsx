import { useFetch } from '../../hooks/useFetch';
import { spaceService } from '../../services/spaceService';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import Loader from '../common/Loader';
import ErrorState from '../common/ErrorState';
import { motion } from 'framer-motion';

const FeaturedSpaces = () => {
  const { data: spaces, loading, error } = useFetch(spaceService.getAll);

  if (loading) return <Loader text="Loading Spaces..." />;
  if (error) return <ErrorState message="Could not load venue spaces." />;

  // Filter for featured spaces (fallback to first 3 if none featured)
  const featured = spaces?.filter(s => s.featured).slice(0, 3) || [];
  const displaySpaces = featured.length > 0 ? featured : spaces?.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading 
          title="Signature Spaces" 
          subtitle="The Venues" 
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displaySpaces?.map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                title={space.name}
                subtitle={`Up to ${space.capacity} Guests`}
                description={space.description.substring(0, 120) + '...'}
                image={space.image}
                to={`/spaces/${space.slug}`}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedSpaces;
