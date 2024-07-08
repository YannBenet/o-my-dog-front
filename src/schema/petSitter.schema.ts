import { z } from 'zod';

export const PetSitterSchema = z.object({
  user_id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  city: z.string(),
  announcement_id: z.number(),
  date_start: z.string(),
  date_end: z.string(),
  mobility: z.boolean(),
  home: z.boolean(),
  description: z.string(),
  animal_label: z.array(z.string()),
});

export const PetSittersSchema = z.array(PetSitterSchema);

export const PetSittersResponseSchema = z.object({
  petSitters: PetSittersSchema,
});
export const UserSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  city: z.string(),
  phone_number: z.string(),
});
export const PetSitterResponseSchema = z.object({
  petSitter: UserSchema,
});

export const PetSitterSelection = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  city: z.string(),
  phone_number: z.string(),
  date_start: z.string(),
  date_end: z.string(),
  mobility: z.boolean(),
  home: z.boolean(),
  description: z.string(),
  animal_label: z.array(z.string()),
});
export const PetSitterSelectionSchema = z.object({
  petSitter: PetSitterSelection,
});
