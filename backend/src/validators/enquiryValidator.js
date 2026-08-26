const { z } = require('zod');

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required (min 2 characters)').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  eventTypeId: z.number().int().positive('Valid Event Type is required'),
  eventDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Valid event date is required',
  }),
  guestCount: z.number().int().positive('Guest count must be positive'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

module.exports = { enquirySchema };
