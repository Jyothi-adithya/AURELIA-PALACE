import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { storyService } from '../services/storyService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import SEO from '../components/common/SEO';

const StoriesPage = () => {
  const { data: stories, loading, error } = useFetch(storyService.getAll);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message="Could not load stories." />;

  const [featured, ...rest] = stories || [];

  return (
    <div className="bg-brand-ivory min-h-screen">
      <SEO title="Stories" description="Read stories of celebrations, love, and unforgettable moments at Aurelia Palace." />

      {/* Hero */}
      <div className="pt-36 pb-20 bg-brand-charcoal text-center">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="label-xs mb-4">Stories</motion.p>
        <span className="gold-rule mx-auto mb-7 block" />
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="font-serif text-display-xl text-white">
          Tales of Elegance
        </motion.h1>
      </div>

      <Container className="py-20 max-w-editorial">
        {/* Featured story */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <Link to={`/stories/${featured.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-white overflow-hidden border border-brand-stone/30">
              <div className="img-hover overflow-hidden aspect-[4/3]">
                <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <p className="label-xs mb-3">Featured Story</p>
                <h2 className="font-serif text-display-md text-brand-charcoal mb-4 text-balance">{featured.title}</h2>
                <p className="text-brand-muted font-light leading-loose text-sm mb-8">{featured.excerpt}</p>
                <span className="label-xs text-brand-muted">{new Date(featured.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="link-underline mt-6 text-brand-charcoal group-hover:text-brand-gold">Read Story</span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Rest */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <Link to={`/stories/${story.slug}`} className="group block bg-white border border-brand-stone/30 overflow-hidden h-full">
                  <div className="img-hover overflow-hidden aspect-[16/9]">
                    <img src={story.coverImage} alt={story.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-7">
                    <p className="label-xs text-brand-muted mb-3">{new Date(story.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    <h3 className="font-serif text-display-sm text-brand-charcoal mb-3">{story.title}</h3>
                    <p className="text-brand-muted text-sm font-light leading-loose mb-6 line-clamp-3">{story.excerpt}</p>
                    <span className="link-underline text-brand-charcoal group-hover:text-brand-gold">Read Story</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default StoriesPage;
