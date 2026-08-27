const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing broken images...');

  // 1. Private Celebrations
  const privateC = await prisma.eventType.updateMany({
    where: { slug: 'private-celebrations' },
    data: { image: 'https://images.unsplash.com/photo-1533174000273-e1f4ceb6bf8e?w=1200&q=80' }
  });
  console.log(`Updated Private Celebrations: ${privateC.count}`);

  // 2. The Terrace Lounge
  const terrace = await prisma.space.updateMany({
    where: { slug: 'the-terrace-lounge' },
    data: { image: 'https://images.unsplash.com/photo-1582103287241-2762adba6c36?w=1200&q=80' }
  });
  console.log(`Updated The Terrace Lounge: ${terrace.count}`);

  // 3. Venue Styling
  const styling = await prisma.service.updateMany({
    where: { slug: 'venue-styling' },
    data: { image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80' }
  });
  console.log(`Updated Venue Styling: ${styling.count}`);

  // 4. Update any Gallery items using the broken link
  const brokenLink = 'https://images.unsplash.com/photo-1530103862676-de8892bc952f';
  const gallery = await prisma.galleryItem.updateMany({
    where: { image: { startsWith: brokenLink } },
    data: { image: 'https://images.unsplash.com/photo-1582103287241-2762adba6c36?w=800&q=80' }
  });
  console.log(`Updated Gallery Items: ${gallery.count}`);

  console.log('All broken images replaced.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
