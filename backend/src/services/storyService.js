const prisma = require('../lib/prisma');

const getAllStories = async () => {
  return prisma.story.findMany({
    where: { published: true },
    orderBy: { publishedDate: 'desc' },
  });
};

const getStoryBySlug = async (slug) => {
  return prisma.story.findUnique({
    where: { slug, published: true },
  });
};

module.exports = {
  getAllStories,
  getStoryBySlug,
};
