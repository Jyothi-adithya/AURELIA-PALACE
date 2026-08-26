const { z } = require('zod');

const statusUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CLOSED'], {
    errorMap: () => ({ message: 'Status must be NEW, CONTACTED, or CLOSED' }),
  }),
});

module.exports = { statusUpdateSchema };
