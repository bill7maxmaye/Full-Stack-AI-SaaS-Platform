import { z } from "zod";

// Zod validation schemas for different transformation types
export const validationSchemas = {
  fill: z.object({
    title: z.string().min(1, "Image title is required"),
    aspectRatio: z.string().min(1, "Aspect ratio is required"),
  }),
  restore: z.object({
    title: z.string().min(1, "Image title is required"),
  }),
  removeBackground: z.object({
    title: z.string().min(1, "Image title is required"),
  }),
  objectRemove: z.object({
    title: z.string().min(1, "Image title is required"),
    prompt: z.string().min(1, "Object description is required"),
  }),
  objectRecolor: z.object({
    title: z.string().min(1, "Image title is required"),
    prompt: z.string().min(1, "Object description is required"),
    color: z.string().min(1, "Color is required"),
  }),
};

export type ValidationSchemaType = keyof typeof validationSchemas;
