import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { spaceService } from '../services/spaceService';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import Button from '../components/common/Button';
import { ArrowLeft, Users, CheckCircle2 } from 'lucide-react';

const SpaceDetailPage = () => {
  const { slug } = useParams();
  const { data: space, loading, error } = useFetch(() => spaceService.getBySlug(slug), [slug]);

  if (loading) return <Loader fullScreen />;
  if (error || !space) return <ErrorState message="Could not load space details." />;

  const features = typeof space.features === 'string' ? JSON.parse(space.features) : space.features;
  const gallery = typeof space.galleryImages === 'string' ? JSON.parse(space.galleryImages) : space.galleryImages;

  return (
    <div className="bg-brand-ivory pb-20">
      <SEO title={space.name} description={`${space.name} accommodates up to ${space.capacity} guests. ${space.description.substring(0, 100)}...`} />
      <div className="relative h-[60vh] flex items-end overflow-hidden mb-16">
        <img 
          src={space.image} 
          alt={space.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />
        <Container className="relative z-10 text-white pb-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link to="/spaces" className="inline-flex items-center gap-2 text-sm text-brand-gold hover:text-white mb-6 transition-colors tracking-widest uppercase">
              <ArrowLeft size={16} /> All Spaces
            </Link>
            <h1 className="text-5xl md:text-6xl font-serif">{space.name}</h1>
          </div>
          <div className="bg-brand-charcoal/60 backdrop-blur-sm p-4 rounded-sm border border-white/10 flex items-center gap-4">
            <Users className="text-brand-gold" />
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-300">Capacity</p>
              <p className="text-xl font-medium">Up to {space.capacity}</p>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif text-brand-charcoal mb-6">About the Space</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-10 whitespace-pre-line">
              {space.description}
            </p>
            
            {gallery && gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-serif text-brand-charcoal mb-6">Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((img, i) => (
                    <div key={i} className="aspect-[4/3] overflow-hidden">
                      <img src={img} alt={`${space.name} view ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-sm sticky top-28">
              <h3 className="text-xl font-serif text-brand-charcoal mb-6">Features & Amenities</h3>
              <ul className="space-y-4 mb-8">
                {features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="text-brand-gold shrink-0 mt-0.5" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button to="/enquiry" variant="primary" className="w-full">
                Book This Space
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SpaceDetailPage;
