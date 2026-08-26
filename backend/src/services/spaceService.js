const prisma = require('../lib/prisma');

const getAllSpaces = async () => {
  return prisma.space.findMany({
    orderBy: { featured: 'desc' },
  });
};

const getSpaceBySlug = async (slug) => {
  return prisma.space.findUnique({
    where: { slug },
  });
};

module.exports = {
  getAllSpaces,
  getSpaceBySlug,
};
