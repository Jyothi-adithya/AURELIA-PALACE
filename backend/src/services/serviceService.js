const prisma = require('../lib/prisma');

const getAllServices = async () => {
  return prisma.service.findMany({
    where: { active: true },
    orderBy: { category: 'asc' },
  });
};

const getServiceBySlug = async (slug) => {
  return prisma.service.findUnique({
    where: { slug, active: true },
  });
};

module.exports = {
  getAllServices,
  getServiceBySlug,
};
