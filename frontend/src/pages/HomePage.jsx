import HeroSection from '../components/home/HeroSection';
import VenueIntro from '../components/home/VenueIntro';
import FeaturedSpaces from '../components/home/FeaturedSpaces';
import EventTypesSection from '../components/home/EventTypesSection';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <VenueIntro />
      <EventTypesSection />
      <FeaturedSpaces />
      
      {/* Simple Call to Action for Enquiries */}
      <section className="py-24 bg-brand-gold text-brand-charcoal text-center">
        <Container>
          <SectionHeading 
            title="Begin Your Journey" 
            subtitle="Let's Talk" 
            centered 
            className="text-brand-charcoal"
          />
          <p className="max-w-2xl mx-auto text-lg mb-10 text-brand-charcoal/80">
            Our dedicated team is ready to help you plan the perfect event. Contact us today to check availability or schedule a private tour.
          </p>
          <Button to="/enquiry" variant="primary" size="lg" className="bg-brand-charcoal text-brand-gold hover:bg-black hover:text-white border-transparent">
            Submit an Enquiry
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
