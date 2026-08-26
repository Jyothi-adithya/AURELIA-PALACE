import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';

const VenuePage = () => {
  return (
    <div className="bg-brand-ivory pb-20">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20">
        <img 
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80" 
          alt="Aurelia Palace Exterior" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-charcoal/50" />
        <Container className="relative z-10 text-center text-white mt-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-4">The Venue</h1>
          <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto">
            A timeless masterpiece designed for unforgettable moments.
          </p>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <SectionHeading title="Our Story" subtitle="Heritage & Legacy" />
            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p>
                Established as a beacon of luxury, Aurelia Palace has hosted thousands of breathtaking events over the decades. What began as a grand private estate has been transformed into a premier destination for those seeking elegance and exclusivity.
              </p>
              <p>
                Our architecture blends classic design with modern amenities, ensuring that while the ambiance feels historic and majestic, the facilities offer everything required for a flawless contemporary event.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80" 
              alt="Architecture detail" 
              className="w-full aspect-[4/5] object-cover shadow-xl rounded-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-center">
          {[
            { title: "25+ Years", desc: "Of delivering exceptional hospitality and memorable experiences." },
            { title: "4 Unique Spaces", desc: "From grand ballrooms to lush outdoor garden pavilions." },
            { title: "5-Star Service", desc: "Dedicated butlers, planners, and culinary masters." }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-brand-charcoal/10 rounded-sm bg-white">
              <h3 className="text-3xl font-serif text-brand-gold mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <SectionHeading title="Experience the Magic" subtitle="Visit Us" centered />
          <p className="text-gray-600 mb-8">
            We invite you to experience the grandeur of Aurelia Palace in person. Schedule a private tour with our event directors to explore the spaces and discuss your vision.
          </p>
          <Button to="/enquiry">Book a Private Tour</Button>
        </div>
      </Container>
    </div>
  );
};

export default VenuePage;
