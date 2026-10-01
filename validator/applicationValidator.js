import * as z from "zod";

export const updateApplicationStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      "applied",
      "interview",
      "selected",
      "rejected",
    ]),
  }),
});

export const applicationFilterSchema = z.object({
  query: z.object({
    status: z
      .enum([
        "applied",
        "interview",
        "selected",
        "rejected",
      ])
      .optional(),
  }),
});