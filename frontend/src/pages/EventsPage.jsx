import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { eventService } from '../services/eventService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import SEO from '../components/common/SEO';

const EventsPage = () => {
  const { data: events, loading, error } = useFetch(eventService.getAll);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message="Could not load event types." />;

  return (
    <div className="bg-brand-ivory min-h-screen">
      <SEO title="Event Types" description="From intimate weddings to grand corporate galas, Aurelia Palace hosts every celebration with unparalleled luxury." />

      {/* Hero */}
      <div className="pt-36 pb-20 bg-brand-charcoal text-center">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="label-xs mb-4">Celebrations</motion.p>
        <span className="gold-rule mx-auto mb-7 block" />
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="font-serif text-display-xl text-white">
          Events We Host
        </motion.h1>
      </div>

      {/* Alternating editorial sections */}
      <div className="py-20 md:py-28">
        {events?.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-24 last:mb-0"
          >
            <Container>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:flex lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <Link to={`/events/${event.slug}`} className="group block img-hover overflow-hidden aspect-[4/3]">
                  <img
                    src={event.image}
                    alt={event.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Text */}
                <div>
                  <p className="label-xs mb-4">0{i + 1}</p>
                  <span className="gold-rule mb-7 block" />
                  <h2 className="font-serif text-display-lg text-brand-charcoal mb-5">{event.name}</h2>
                  <p className="text-brand-muted font-light leading-loose mb-8">{event.description}</p>
                  <Link to={`/events/${event.slug}`} className="link-underline text-brand-charcoal hover:text-brand-gold">
                    Explore Details
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
