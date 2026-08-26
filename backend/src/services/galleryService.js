const prisma = require('../lib/prisma');

const getGalleryItems = async (filters = {}) => {
  const where = {};
  
  if (filters.category) {
    where.category = filters.category;
  }
  
  if (filters.eventTypeId) {
    where.eventTypeId = parseInt(filters.eventTypeId, 10);
  }

  return prisma.galleryItem.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      eventType: {
        select: { name: true, slug: true }
      }
    }
  });
};

module.exports = {
  getGalleryItems,
};
