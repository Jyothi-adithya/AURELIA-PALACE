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
  const [total, newCount, contactedCount, closedCount, eventTypes] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: 'NEW' } }),
    prisma.enquiry.count({ where: { status: 'CONTACTED' } }),
    prisma.enquiry.count({ where: { status: 'CLOSED' } }),
    prisma.eventType.findMany({
      select: {
        name: true,
        _count: {
          select: { enquiries: true }
        }
      }
    })
  ]);

  const byEventType = eventTypes
    .filter(et => et._count.enquiries > 0)
    .map(et => ({
      name: et.name,
      count: et._count.enquiries
    }))
    .sort((a, b) => b.count - a.count);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29); // 30 days including today

  const recentEnquiries = await prisma.enquiry.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' }
  });

  const timelineMap = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    timelineMap[dateStr] = 0;
  }

  recentEnquiries.forEach(enq => {
    const dateStr = enq.createdAt.toISOString().split('T')[0];
    if (timelineMap[dateStr] !== undefined) {
      timelineMap[dateStr]++;
    }
  });

  const timeline = Object.keys(timelineMap).map(date => ({
    date,
    count: timelineMap[date]
  }));

  return {
    total,
    new: newCount,
    contacted: contactedCount,
    closed: closedCount,
    byEventType,
    timeline,
  };
};

module.exports = {
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  getDashboardStats,
};
