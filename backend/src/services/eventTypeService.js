const prisma = require('../lib/prisma');

const getAllEventTypes = async () => {
  return prisma.eventType.findMany({
    orderBy: { featured: 'desc' },
  });
};

const getEventTypeBySlug = async (slug) => {
  return prisma.eventType.findUnique({
    where: { slug },
  });
};

module.exports = {
  getAllEventTypes,
  getEventTypeBySlug,
};
