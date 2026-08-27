import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { galleryService } from '../services/galleryService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import SEO from '../components/common/SEO';
import { CardSkeleton } from '../components/common/Skeleton';

const GalleryPage = () => {
  const { data: items, loading, error } = useFetch(galleryService.getAll);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = useMemo(() => {
    if (!items) return ['All'];
    return ['All', ...Array.from(new Set(items.map(i => i.category))).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    if (!items) return [];
    return activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
  }, [items, activeCategory]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && selectedImage) setSelectedImage(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedImage]);

  return (
    <div className="bg-brand-ivory min-h-screen">
      <SEO title="Gallery" description="Browse our curated portfolio of weddings, galas, and corporate events at Aurelia Palace." />

      {/* Hero */}
      <div className="pt-36 pb-20 bg-brand-charcoal text-center">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="label-xs mb-4">Gallery</motion.p>
        <span className="gold-rule mx-auto mb-7 block" />
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="font-serif text-display-xl text-white">
          A Glimpse of Magic
        </motion.h1>
      </div>

      <Container className="py-20">
        {/* Category filters */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-14 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 text-[0.65rem] font-semibold tracking-widest uppercase whitespace-nowrap transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-brand-charcoal text-brand-gold border-brand-charcoal'
                  : 'bg-transparent text-brand-muted border-brand-stone hover:border-brand-charcoal hover:text-brand-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <ErrorState message="Could not load gallery." />
        ) : (
          <motion.div layout className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map(item => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group relative cursor-pointer break-inside-avoid overflow-hidden"
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full block transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                    <h4 className="font-serif text-lg text-white mb-1">{item.title}</h4>
                    {item.caption && <p className="text-xs text-white/60">{item.caption}</p>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImage.image} alt={selectedImage.title} className="w-full max-h-[80vh] object-contain" />
              <div className="pt-4">
                <h4 className="font-serif text-xl text-white/90 mb-1">{selectedImage.title}</h4>
                {selectedImage.caption && <p className="text-sm text-white/45">{selectedImage.caption}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
