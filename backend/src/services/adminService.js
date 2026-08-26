const prisma = require('../lib/prisma');

const getEnquiries = async (filters = {}, page = 1, limit = 20) => {
  const where = {};
  if (filters.status) where.status = filters.status;
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { email: { contains: filters.search } },
    ];
  }

  const skip = (page - 1) * limit;

  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        eventType: { select: { name: true } },
      },
    }),
    prisma.enquiry.count({ where }),
  ]);

  return {
    enquiries,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getEnquiryById = async (id) => {
  return prisma.enquiry.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      eventType: { select: { name: true } },
    },
  });
};

const updateEnquiryStatus = async (id, status) => {
  return prisma.enquiry.update({
    where: { id: parseInt(id, 10) },
    data: { status },
  });
};

const getDashboardStats = async () => {
  const [total, newCount, contactedCount, closedCount] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: 'NEW' } }),
    prisma.enquiry.count({ where: { status: 'CONTACTED' } }),
    prisma.enquiry.count({ where: { status: 'CLOSED' } }),
  ]);

  return {
    total,
    new: newCount,
    contacted: contactedCount,
    closed: closedCount,
  };
};

module.exports = {
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  getDashboardStats,
};
