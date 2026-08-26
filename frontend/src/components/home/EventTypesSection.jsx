import { useFetch } from '../../hooks/useFetch';
import { eventService } from '../../services/eventService';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import Loader from '../common/Loader';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EventTypesSection = () => {
  const { data: events, loading } = useFetch(eventService.getAll);

  if (loading) return <Loader />;
  if (!events || events.length === 0) return null;

  return (
    <section className="py-24 bg-brand-charcoal text-brand-ivory">
      <Container>
        <SectionHeading 
          title="Curated Celebrations" 
          subtitle="Event Types" 
          light
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/events/${event.slug}`}
                className="group relative block h-80 overflow-hidden rounded-sm"
              >
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:opacity-80" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-3xl font-serif mb-2">{event.name}</h3>
                  <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300">
                    <p className="text-sm text-gray-300 line-clamp-2 mt-2 border-t border-brand-gold pt-3">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default EventTypesSection;
