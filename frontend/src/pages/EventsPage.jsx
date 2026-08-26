import { useFetch } from '../hooks/useFetch';
import { eventService } from '../services/eventService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EventsPage = () => {
  const { data: events, loading, error } = useFetch(eventService.getAll);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message="Could not load event types." />;

  return (
    <div className="bg-brand-ivory py-20 min-h-screen">
      <Container>
        <SectionHeading 
          title="Celebrations We Host" 
          subtitle="Event Types" 
          centered 
        />
        
        <div className="space-y-24 mt-16">
          {events?.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <Link to={`/events/${event.slug}`} className="block overflow-hidden relative aspect-[4/3] group">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-4xl font-serif text-brand-charcoal mb-6">{event.name}</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {event.description}
                </p>
                <div>
                  <Link 
                    to={`/events/${event.slug}`}
                    className="inline-flex items-center gap-2 text-brand-charcoal font-medium tracking-widest uppercase text-sm hover:text-brand-gold transition-colors"
                  >
                    Explore details <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default EventsPage;
