import { useState, useMemo, useEffect } from 'react';
import SEO from '../components/common/SEO';
import { useFetch } from '../hooks/useFetch';
import { galleryService } from '../services/galleryService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const GalleryPage = () => {
  const { data: items, loading, error } = useFetch(galleryService.getAll);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedImage) setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);


  const categories = useMemo(() => {
    if (!items) return ['All'];
    const cats = new Set(items.map(item => item.category));
    return ['All', ...Array.from(cats)].sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (activeCategory === 'All') return items;
    return items.filter(item => item.category === activeCategory);
  }, [items, activeCategory]);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message="Could not load gallery." />;

  return (
    <div className="bg-brand-ivory py-20 min-h-screen">
      <SEO title="Gallery" description="Browse our curated portfolio of weddings, galas, and corporate events held at Aurelia Palace." />
      <Container>
        <SectionHeading 
          title="A Glimpse of Magic" 
          subtitle="Gallery" 
          centered 
        />
        
        {/* Filters */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 md:gap-4 justify-start md:justify-center mb-12 pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                activeCategory === cat 
                  ? 'bg-brand-charcoal text-brand-gold border-brand-charcoal' 
                  : 'bg-transparent text-brand-charcoal border-brand-charcoal/20 hover:border-brand-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-ish Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="relative group cursor-pointer aspect-square overflow-hidden rounded-sm"
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <h4 className="font-serif text-xl text-brand-gold mb-1">{item.title}</h4>
                  {item.caption && <p className="text-sm text-gray-200">{item.caption}</p>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="w-full max-h-[80vh] object-contain mx-auto"
            />
            <div className="text-center mt-6 text-white">
              <h4 className="font-serif text-2xl text-brand-gold mb-2">{selectedImage.title}</h4>
              {selectedImage.caption && <p className="text-gray-300">{selectedImage.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
