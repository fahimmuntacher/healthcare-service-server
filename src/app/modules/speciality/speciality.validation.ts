import z from "zod";

export const createSpecialtyZodSchema = z.object({
  body: z.object({
    title: z.string("Title is required"),
    // If description is optional in DB, use .optional()
    description: z.string("Description is required").optional(),
  }),
});
