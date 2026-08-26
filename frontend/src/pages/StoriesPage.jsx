import { useFetch } from '../hooks/useFetch';
import { storyService } from '../services/storyService';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import ErrorState from '../components/common/ErrorState';
import { motion } from 'framer-motion';

const StoriesPage = () => {
  const { data: stories, loading, error } = useFetch(storyService.getAll);

  if (loading) return <Loader fullScreen />;
  if (error) return <ErrorState message="Could not load stories." />;

  return (
    <div className="bg-brand-ivory py-20 min-h-screen">
      <Container>
        <SectionHeading 
          title="Tales of Elegance" 
          subtitle="Our Stories" 
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {stories?.map((story, index) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                title={story.title}
                subtitle={new Date(story.publishedDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                description={story.excerpt}
                image={story.coverImage}
                to={`/stories/${story.slug}`}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default StoriesPage;
