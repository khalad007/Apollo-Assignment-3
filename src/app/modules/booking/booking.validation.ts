import { z } from 'zod';

const BookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    carId: z.string(),
    startTime: z.string(),
    endTime: z.string().nullable().default(null).optional(),
    totalCost: z.number().min(0).default(0),
  }),
});

export const BookingValidation = {
  BookingValidationSchema,
};
