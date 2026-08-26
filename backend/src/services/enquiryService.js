const prisma = require('../lib/prisma');

const createEnquiry = async (data) => {
  return prisma.enquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      eventTypeId: data.eventTypeId,
      eventDate: new Date(data.eventDate),
      guestCount: data.guestCount,
      message: data.message,
    },
  });
};

module.exports = {
  createEnquiry,
};
