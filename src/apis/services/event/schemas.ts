import { z } from 'zod';

export const GetEventResponseSchema = z.object({
  isAvailable: z.boolean(),
  message: z.string(),
});

export const GetEventStatusResponseSchema = z.object({
  isAvailable: z.boolean(),
  message: z.string(),
});

export const CreateEventResponseSchema = z.object({
  message: z.string(),
  eventId: z.number(),
});

export const PostApplyEventResponseSchema = z.object({
  isAvailable: z.boolean(),
  message: z.string(),
  userId: z.number().optional(),
});

export const PostDarwEventResponseSchema = z.object({
  isWinner: z.boolean(),
  message: z.string(),
  userId: z.number(),
  eventId: z.number(),
});
