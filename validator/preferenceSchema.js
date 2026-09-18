import * as z from "zod";

const preferenceBodySchema = z.object({

    skills: z
        .array(
            z.string()
                .trim()
                .min(1, "Skill cannot be empty")
        )
        .optional(),

    jobTypes: z
        .array(
            z.enum(["full-time", "internship"], {
                errorMap: () => ({
                    message: "Job type must be either 'full-time' or 'internship'"
                })
            })
        )
        .optional(),

    experienceLevels: z
        .array(
            z.enum(["fresher", "junior", "mid", "senior"], {
                errorMap: () => ({
                    message: "Invalid experience level"
                })
            })
        )
        .optional(),

    preferredLocations: z
        .array(
            z.string()
                .trim()
                .min(1, "Location cannot be empty")
        )
        .optional(),

    salary: z
        .object({

            min: z
                .number()
                .nonnegative("Minimum salary cannot be negative")
                .nullable()
                .optional(),

            max: z
                .number()
                .nonnegative("Maximum salary cannot be negative")
                .nullable()
                .optional(),

        })
        .optional(),

}).strict();

export const updatePreferenceSchema = z.object({
    body: preferenceBodySchema
});