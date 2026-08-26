import { useFetch } from '../hooks/useFetch';
import SEO from '../components/common/SEO';
import { serviceService } from '../services/serviceService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  const { data: services, loading, error } = useFetch(serviceService.getAll);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message="Could not load services." />;

  // Group services by category
  const groupedServices = services?.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <div className="bg-brand-ivory py-20 min-h-screen">
      <SEO title="Premium Services" description="Discover our curated premium services — from fine dining and florals to audiovisual production — all under one roof." />
      <Container>
        <SectionHeading 
          title="Premium Experiences" 
          subtitle="Our Services" 
          centered 
        />
        
        <div className="mt-16 space-y-24">
          {Object.entries(groupedServices || {}).map(([category, items], categoryIndex) => (
            <div key={category}>
              <h2 className="text-3xl font-serif text-brand-gold border-b border-brand-charcoal/10 pb-4 mb-10">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {items.map((service, idx) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row gap-6 bg-white p-6 shadow-sm border border-gray-100 rounded-sm"
                  >
                    <div className="sm:w-1/3 shrink-0">
                      <img loading="lazy" 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full aspect-square object-cover rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-xl font-serif text-brand-charcoal mb-3">{service.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                      <div className="mt-auto">
                        <Button to="/enquiry" variant="ghost" size="sm" className="px-0">
                          Enquire Now &rarr;
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ServicesPage;
