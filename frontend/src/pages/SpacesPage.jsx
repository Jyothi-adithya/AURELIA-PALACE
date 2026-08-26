import { useFetch } from '../hooks/useFetch';
import SEO from '../components/common/SEO';
import { spaceService } from '../services/spaceService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { motion } from 'framer-motion';

const SpacesPage = () => {
  const { data: spaces, loading, error } = useFetch(spaceService.getAll);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message="Could not load spaces." />;

  return (
    <div className="bg-brand-ivory py-20 min-h-screen">
      <SEO title="Our Spaces" description="Explore our signature event spaces — from the Grand Ballroom to the Garden Pavilion — each designed for magnificence." />
      <Container>
        <SectionHeading 
          title="Our Venues" 
          subtitle="Explore Spaces" 
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {spaces?.map((space, index) => (
            <motion.div 
              key={space.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                title={space.name}
                subtitle={`Capacity: ${space.capacity} Guests`}
                description={space.description}
                image={space.image}
                to={`/spaces/${space.slug}`}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SpacesPage;
