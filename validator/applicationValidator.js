import * as z from "zod";

export const updateApplicationStatusSchema = z.object({
  status: z.enum([
    "applied",
    "interview",
    "selected",
    "rejected",
  ]),
});
