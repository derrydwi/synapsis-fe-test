import { z } from "zod";

export const postSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export type Post = z.infer<typeof postSchema>;
