import { z } from "zod";

const errorLiteral = (label: string) => {
  return {
    errorMap: () => ({
      message: `Invalid ${label}`,
    }),
  };
};

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  gender: z.union([
    z.literal("male", errorLiteral("gender")),
    z.literal("female", errorLiteral("gender")),
  ]),
  status: z.union([
    z.literal("active", errorLiteral("status")),
    z.literal("inactive", errorLiteral("status")),
  ]),
});

export type User = z.infer<typeof userSchema>;
