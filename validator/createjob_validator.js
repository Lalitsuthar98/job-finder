import * as z from "zod";

const jobBodySchema = z.object({

        title: z
            .string({ required_error: "Job title is required" })
            .trim()
            .min(1, "Job title cannot be empty"),

        company: z
            .string({ required_error: "Company name is required" })
            .trim()
            .min(1, "Company name cannot be empty"),

        location: z
            .string({ required_error: "Location is required" })
            .trim()
            .min(1, "Location cannot be empty"),

        skills: z
            .array(z.string().trim())
            .default([]),

        jobType: z
            .enum(["full-time", "internship"], {
                errorMap: () => ({
                    message: "Job type must be either 'full-time' or 'internship'"
                })
            }),

        experience: z
            .string()
            .trim()
            .optional(),

        salary: z
            .string()
            .trim()
            .optional(),

        description: z
            .string()
            .trim()
            .optional(),

        applyUrl: z
            .string({ required_error: "Apply URL is required" })
            .trim()
            .url("Please enter a valid application URL"),

        source: z
            .string({ required_error: "Source is required" })
            .trim()
            .min(1, "Source cannot be empty"),

        postedAt: z
            .string({ required_error: "Posted date is required" })
            .datetime({
                message: "Please enter a valid ISO date string"
            })
    })
export const createJobSchema = z.object({
    body: jobBodySchema
});

export const updateJobSchema = z.object({
  body: jobBodySchema.partial() // Makes every field inside jobBodySchema optional
});
