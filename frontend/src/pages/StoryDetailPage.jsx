import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { storyService } from '../services/storyService';
import SEO from '../components/common/SEO';
import Container from '../components/common/Container';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { ArrowLeft } from 'lucide-react';

const StoryDetailPage = () => {
  const { slug } = useParams();
  const { data: story, loading, error } = useFetch(() => storyService.getBySlug(slug), [slug]);

  if (loading) return <Loader fullScreen />;
  if (error || !story) return <ErrorState message="Could not load the story." />;

  return (
    <div className="bg-brand-ivory pb-20">
      <SEO title={story.title} description={story.excerpt.substring(0, 155)} />
      <div className="relative h-[60vh] flex items-end overflow-hidden mb-16">
        <img 
          src={story.coverImage} 
          alt={story.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />
        <Container className="relative z-10 text-white pb-16 w-full text-center">
          <Link to="/stories" className="inline-flex items-center gap-2 text-sm text-brand-gold hover:text-white mb-6 transition-colors tracking-widest uppercase">
            <ArrowLeft size={16} /> All Stories
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif max-w-4xl mx-auto">{story.title}</h1>
          <p className="mt-6 text-brand-gold font-medium tracking-widest uppercase text-sm">
            {new Date(story.publishedDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </Container>
      </div>

      <Container className="max-w-3xl">
        <div className="bg-white p-8 md:p-12 shadow-sm -mt-32 relative z-20 rounded-sm mb-16">
          <div 
            className="prose prose-lg prose-headings:font-serif prose-headings:text-brand-charcoal text-gray-700 leading-loose mx-auto"
            dangerouslySetInnerHTML={{ __html: `<p>${story.content.replace(/\n/g, '</p><p>')}</p>` }}
          />
        </div>
      </Container>
    </div>
  );
};

export default StoryDetailPage;
