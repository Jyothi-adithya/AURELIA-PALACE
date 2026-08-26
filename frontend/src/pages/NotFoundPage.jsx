import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-ivory py-20 text-center px-4">
      <Container>
        <h1 className="text-8xl font-serif text-brand-gold mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-4">Page Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button to="/">Return Home</Button>
      </Container>
    </div>
  );
};

export default NotFoundPage;
