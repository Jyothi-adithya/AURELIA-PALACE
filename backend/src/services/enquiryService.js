const prisma = require('../lib/prisma');
const emailService = require('./emailService');

const createEnquiry = async (data) => {
  // 1. Save enquiry to database FIRST — this is the source of truth
  const enquiry = await prisma.enquiry.create({
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

  // 2. Fetch the event type name for the email
  let emailSent = false;
  try {
    const eventType = await prisma.eventType.findUnique({
      where: { id: data.eventTypeId },
      select: { name: true },
    });

    // 3. Attempt to send confirmation email (never throws)
    const emailResult = await emailService.sendEnquiryConfirmation({
      name: data.name,
      email: data.email,
      eventTypeName: eventType?.name || 'Event',
      eventDate: data.eventDate,
      guestCount: data.guestCount,
    });

    emailSent = emailResult.success;
  } catch (error) {
    // If even the eventType lookup fails, log and continue
    console.error('[enquiryService] Email step failed:', error.message || error);
  }

  return { ...enquiry, emailSent };
};

module.exports = {
  createEnquiry,
};
