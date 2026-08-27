import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { serviceService } from '../services/serviceService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import SEO from '../components/common/SEO';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const { data: services, loading, error } = useFetch(serviceService.getAll);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message="Could not load services." />;

  const grouped = services?.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {}) || {};

  return (
    <div className="bg-brand-ivory min-h-screen">
      <SEO title="Premium Services" description="Discover our curated premium services — fine dining, florals, and production — all at Aurelia Palace." />

      {/* Hero */}
      <div className="pt-36 pb-20 bg-brand-charcoal text-center">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="label-xs mb-4">Offerings</motion.p>
        <span className="gold-rule mx-auto mb-7 block" />
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="font-serif text-display-xl text-white">
          Premium Services
        </motion.h1>
      </div>

      <Container className="py-20 max-w-editorial">
        {Object.entries(grouped).map(([category, items], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="mb-20 last:mb-0"
          >
            {/* Category header */}
            <div className="flex items-center gap-6 mb-10 border-b border-brand-stone/40 pb-6">
              <span className="gold-rule shrink-0" />
              <h2 className="font-serif text-display-sm text-brand-charcoal">{category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="group flex gap-6 bg-white border border-brand-stone/30 p-6 hover:border-brand-gold/40 transition-colors duration-400"
                >
                  <div className="shrink-0 w-28 h-28 overflow-hidden img-hover">
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h3 className="font-serif text-[1.25rem] text-brand-charcoal mb-2">{service.name}</h3>
                    <p className="text-brand-muted text-sm font-light leading-relaxed mb-4 line-clamp-2">{service.description}</p>
                    <Link to="/enquiry" className="link-underline text-brand-charcoal group-hover:text-brand-gold">
                      Enquire
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </Container>
    </div>
  );
};

export default ServicesPage;
