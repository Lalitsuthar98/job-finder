import * as z from "zod";
// Reusable Field Schemas
const emailschema = z 
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Email must be valid")); 
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(30, "Password maximum length is 30")
  .regex(/[A-Z]/, "Password must have one capital letter")
  .regex(/[a-z]/, "Password must have one small letter")
  .regex(/[0-9]/, "Password must have one number")
  .regex(
    /[!`@#$%^&*(),.\-+=<>{}:;'?]/,
    "Password must have one special character"
  );

const ageSchema = z
  .coerce
  .number()
  .int("Age must be a whole number")
  .min(18, "Age must be at least 18") 
  .max(100, "Age must be less than or equal to 100");

// 1. NEW: Reusable Phone Schema
const phoneSchema = z
  .string()
  .trim()
  .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits");


export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Minimum length of name must be 3"),

  age: ageSchema,

  email: emailschema,

  password: passwordSchema,

  phone: phoneSchema, 
});

export const loginSchema = z.object({
  email: emailschema,
  password: passwordSchema,
});