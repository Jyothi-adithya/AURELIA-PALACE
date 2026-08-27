const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Admin User
  // In production, set ADMIN_SEED_PASSWORD in your environment before running seed.
  // Default 'admin123' is for local development only — CHANGE THIS before going live.
  const seedPassword = process.env.ADMIN_SEED_PASSWORD || 'admin123';
  if (process.env.NODE_ENV === 'production' && !process.env.ADMIN_SEED_PASSWORD) {
    throw new Error('FATAL: Set ADMIN_SEED_PASSWORD env var before seeding in production.');
  }
  const passwordHash = await bcrypt.hash(seedPassword, 12);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@aureliapalace.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@aureliapalace.com',
      passwordHash,
    },
  });
  console.log('Admin created:', admin.email);

  // 2. Event Types
  const eventTypes = [
    {
      name: 'Weddings',
      slug: 'weddings',
      description: 'Experience the magic of a timeless celebration. Our wedding packages are crafted to make your special day unforgettable with elegant spaces and exceptional service.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      featured: true,
    },
    {
      name: 'Receptions',
      slug: 'receptions',
      description: 'Host a grand reception in our luxurious ballrooms. Perfect for welcoming your guests in style with premium catering and sophisticated decor.',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
      featured: true,
    },
    {
      name: 'Engagements',
      slug: 'engagements',
      description: 'Celebrate the beginning of your journey together with an intimate and beautiful engagement ceremony.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80',
      featured: false,
    },
    {
      name: 'Naming Ceremonies',
      slug: 'naming-ceremonies',
      description: 'Welcome the newest member of your family in a warm and joyful setting. Our venues provide the perfect ambiance for this special occasion.',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200&q=80',
      featured: false,
    },
    {
      name: 'Private Celebrations',
      slug: 'private-celebrations',
      description: 'From milestone birthdays to exclusive anniversaries, celebrate your private events with unmatched elegance.',
      image: 'https://images.unsplash.com/photo-1533174000273-e1f4ceb6bf8e?w=1200&q=80',
      featured: true,
    },
    {
      name: 'Corporate Events',
      slug: 'corporate-events',
      description: 'Impress your clients and colleagues with our professional yet luxurious corporate event spaces, equipped with modern amenities.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
      featured: false,
    },
  ];

  for (const et of eventTypes) {
    await prisma.eventType.upsert({
      where: { slug: et.slug },
      update: {},
      create: et,
    });
  }
  console.log('Event types seeded.');

  // 3. Spaces
  const spaces = [
    {
      name: 'The Grand Ballroom',
      slug: 'the-grand-ballroom',
      description: 'A breathtaking ballroom with crystal chandeliers, high ceilings, and a spacious dance floor. Perfect for grand weddings and large receptions.',
      capacity: 500,
      features: ['Crystal Chandeliers', 'Dance Floor', 'AV System', 'Private Bar', 'Stage'],
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80'
      ],
      featured: true,
    },
    {
      name: 'The Garden Pavilion',
      slug: 'the-garden-pavilion',
      description: 'An outdoor haven surrounded by lush greenery and floral arrangements. Ideal for daytime events, ceremonies, and elegant evening gatherings under the stars.',
      capacity: 300,
      features: ['Outdoor Setting', 'Lush Gardens', 'Fairy Lights', 'Weather Backup'],
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80'
      ],
      featured: true,
    },
    {
      name: 'The Ivory Suite',
      slug: 'the-ivory-suite',
      description: 'An intimate, elegantly designed space with classic architecture. Perfect for smaller engagements, VIP corporate meetings, and private dinners.',
      capacity: 100,
      features: ['Classic Architecture', 'Intimate Setting', 'Premium Lounge', 'Dedicated Butler'],
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80',
      galleryImages: [],
      featured: false,
    },
    {
      name: 'The Terrace Lounge',
      slug: 'the-terrace-lounge',
      description: 'A chic rooftop venue offering stunning views. A wonderful choice for cocktail hours, exclusive parties, and modern celebrations.',
      capacity: 150,
      features: ['Rooftop View', 'Cocktail Bar', 'Lounge Seating', 'Ambient Lighting'],
      image: 'https://images.unsplash.com/photo-1582103287241-2762adba6c36?w=1200&q=80',
      galleryImages: [],
      featured: true,
    },
  ];

  for (const space of spaces) {
    await prisma.space.upsert({
      where: { slug: space.slug },
      update: {},
      create: space,
    });
  }
  console.log('Spaces seeded.');

  // 4. Services
  const services = [
    {
      name: 'Premium Catering',
      slug: 'premium-catering',
      description: 'Curated menus featuring global cuisines, prepared by our award-winning chefs.',
      category: 'Catering',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80',
      active: true,
    },
    {
      name: 'Floral & Decor',
      slug: 'floral-decor',
      description: 'Bespoke floral arrangements and luxurious decor to match your unique vision.',
      category: 'Decor',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      active: true,
    },
    {
      name: 'Event Coordination',
      slug: 'event-coordination',
      description: 'Our expert planners will handle every detail, ensuring a seamless and stress-free event.',
      category: 'Planning',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
      active: true,
    },
    {
      name: 'Photography Support',
      slug: 'photography-support',
      description: 'Access to the most picturesque spots in the palace for your professional shoots.',
      category: 'Media',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80',
      active: true,
    },
    {
      name: 'Guest Experience',
      slug: 'guest-experience',
      description: 'Dedicated hospitality team to welcome, guide, and assist your guests throughout the event.',
      category: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
      active: true,
    },
    {
      name: 'Venue Styling',
      slug: 'venue-styling',
      description: 'Transformative lighting, draping, and architectural enhancements for any theme.',
      category: 'Decor',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80',
      active: true,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log('Services seeded.');

  // Fetch event types for relations
  const weddings = await prisma.eventType.findUnique({ where: { slug: 'weddings' } });
  const receptions = await prisma.eventType.findUnique({ where: { slug: 'receptions' } });

  // 5. Gallery Items
  await prisma.galleryItem.deleteMany({}); // reset gallery to avoid duplicates without complex upserts
  const galleryItems = [
    { title: 'Elegant Table Setting', category: 'Weddings', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', caption: 'Gold accented table decor.', eventTypeId: weddings?.id },
    { title: 'The Grand Entrance', category: 'Architecture', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', caption: 'Our stunning foyer.', eventTypeId: null },
    { title: 'Garden Ceremony', category: 'Weddings', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', caption: 'An outdoor vow exchange.', eventTypeId: weddings?.id },
    { title: 'Champagne Toast', category: 'Receptions', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', caption: 'Celebrating the newlyweds.', eventTypeId: receptions?.id },
    { title: 'Intimate Lounge', category: 'Architecture', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', caption: 'Cozy seating area.', eventTypeId: null },
    { title: 'Evening Lights', category: 'Celebrations', image: 'https://images.unsplash.com/photo-1582103287241-2762adba6c36?w=800&q=80', caption: 'The terrace at dusk.', eventTypeId: null },
    { title: 'Culinary Masterpiece', category: 'Catering', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80', caption: 'Gourmet appetizers.', eventTypeId: null },
    { title: 'Corporate Setup', category: 'Corporate', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', caption: 'Conference in the Ivory Suite.', eventTypeId: null },
    { title: 'Floral Arch', category: 'Weddings', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', caption: 'Custom floral design.', eventTypeId: weddings?.id },
    { title: 'First Dance', category: 'Receptions', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', caption: 'Magical moments in the Ballroom.', eventTypeId: receptions?.id },
    { title: 'Gala Dinner', category: 'Corporate', image: 'https://images.unsplash.com/photo-1533174000273-e1f4ceb6bf8e?w=800&q=80', caption: 'Annual corporate gala.', eventTypeId: null },
    { title: 'Bridal Suite', category: 'Architecture', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', caption: 'Private preparation room.', eventTypeId: null },
  ];

  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }
  console.log('Gallery items seeded.');

  // 6. Stories
  const stories = [
    {
      title: 'A Royal Affair: The Sharma Wedding',
      slug: 'sharma-wedding',
      excerpt: 'Discover how we transformed the Grand Ballroom into a royal palace for this spectacular wedding.',
      content: 'A detailed look at the Sharma wedding, featuring insights into the decor, catering, and the magical moments captured. The night was filled with joy, laughter, and an unforgettable celebration of love.',
      coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
      publishedDate: new Date('2023-10-15'),
      published: true,
    },
    {
      title: 'Corporate Excellence: The Tech Summit',
      slug: 'tech-summit-2023',
      excerpt: 'Hosting 300 executives for a three-day summit requiring seamless tech and premium hospitality.',
      content: 'Our team ensured that every presentation went smoothly, while providing five-star catering during breaks. The Terrace Lounge offered the perfect networking environment.',
      coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
      publishedDate: new Date('2023-11-05'),
      published: true,
    },
    {
      title: 'Spring Garden Engagements',
      slug: 'spring-garden-engagements',
      excerpt: 'Why the Garden Pavilion is the most sought-after venue for spring celebrations.',
      content: 'As flowers bloom, our pavilion becomes a natural paradise. We explore top decor trends and menu choices for a flawless spring event.',
      coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
      publishedDate: new Date('2024-03-20'),
      published: true,
    },
    {
      title: 'The Art of the Perfect Menu',
      slug: 'art-perfect-menu',
      excerpt: 'An interview with our Executive Chef on curating menus that delight every guest.',
      content: 'Chef Thomas shares his philosophy on sourcing local ingredients, balancing flavors, and presenting dishes that are both beautiful and delicious.',
      coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80',
      publishedDate: new Date('2024-05-12'),
      published: true,
    },
  ];

  for (const story of stories) {
    await prisma.story.upsert({
      where: { slug: story.slug },
      update: {},
      create: story,
    });
  }
  console.log('Stories seeded.');

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
