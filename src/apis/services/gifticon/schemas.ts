import { z } from 'zod';

import { GifticonSchema } from '@/atoms/schemas';

export const PostClaimGifticonResponseSchema = GifticonSchema;

export const CreateEventResponseSchema = z.object({
  message: z.string(),
  eventId: z.number(),
  gifticonId: z.number(),
});
