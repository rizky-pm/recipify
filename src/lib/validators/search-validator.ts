import { z } from 'zod';

export const SearchTermValidator = z.object({
  search: z.string().min(1, { message: "Search term can't be empty." }),
});

export type TSearchTermValidator = z.infer<typeof SearchTermValidator>;
