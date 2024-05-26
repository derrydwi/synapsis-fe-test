import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  post_id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  body: z.string().min(1),
});

export type Comment = z.infer<typeof commentSchema>;
