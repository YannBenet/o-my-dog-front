import { z } from 'zod';

const CitySchema = z.object({
  nom: z.string(),
  code: z.string(),
  _score: z.number(),
  departement: z.object({
    code: z.string(),
    nom: z.string(),
  }),
});

export default CitySchema;
