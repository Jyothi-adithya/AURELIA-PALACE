import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetch } from '../../hooks/useFetch';
import { eventService } from '../../services/eventService';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { CardSkeleton } from '../common/Skeleton';

const EventTypesSection = () => {
  const { data: events, loading } = useFetch(eventService.getAll);

  return (
    <section className="py-28 md:py-36 bg-brand-charcoal overflow-hidden">
      <Container>
        <SectionHeading
          title="Celebrations We Host"
          subtitle="Event Types"
          light
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  to={`/events/${event.slug}`}
                  className="group relative block overflow-hidden"
                  style={{ aspectRatio: i === 0 ? '4/5' : '4/3.5' }}
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 p-7 w-full">
                    <p className="label-xs text-brand-gold mb-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                      Explore →
                    </p>
                    <h3 className="font-serif text-display-sm text-white">{event.name}</h3>
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

export default EventTypesSection;
