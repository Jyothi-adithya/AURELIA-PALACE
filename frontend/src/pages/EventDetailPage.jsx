import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { eventService } from '../services/eventService';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import Button from '../components/common/Button';
import { ArrowLeft } from 'lucide-react';

const EventDetailPage = () => {
  const { slug } = useParams();
  const { data: event, loading, error } = useFetch(() => eventService.getBySlug(slug), [slug]);

  if (loading) return <Loader fullScreen />;
  if (error || !event) return <ErrorState message="Could not load event details." />;

  return (
    <div className="bg-brand-ivory pb-20">
      <SEO title={event.name} description={event.description.substring(0, 155)} />
      {/* Hero */}
      <div className="relative h-[60vh] flex items-end overflow-hidden mb-16">
        <img 
          src={event.image} 
          alt={event.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />
        <Container className="relative z-10 text-white pb-16 w-full">
          <Link to="/events" className="inline-flex items-center gap-2 text-sm text-brand-gold hover:text-white mb-6 transition-colors tracking-widest uppercase">
            <ArrowLeft size={16} /> Back to Events
          </Link>
          <h1 className="text-5xl md:text-7xl font-serif mb-4">{event.name}</h1>
        </Container>
      </div>

      <Container className="max-w-4xl">
        <div className="bg-white p-8 md:p-12 shadow-sm -mt-32 relative z-20 rounded-sm mb-16">
          <h2 className="text-2xl font-serif text-brand-gold mb-6">About Our {event.name}</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-10">
            {event.description}
          </p>
          
          <div className="border-t border-gray-100 pt-8 text-center">
            <p className="text-brand-charcoal font-serif text-xl mb-6">
              Ready to start planning your {event.name.toLowerCase()}?
            </p>
            <Button to="/enquiry" variant="primary" size="lg">
              Enquire Now
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EventDetailPage;
