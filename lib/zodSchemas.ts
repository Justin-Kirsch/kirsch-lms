import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
    "Development", 
    "Business", 
    "IT & Software", 
    "Design", 
    "Health & Fitness", 
    "Lifestyle", 
    "Sports", 
    "Music", 
    "Teaching & Academics", 
    "Travel", 
    "Other"] as const;


export const courseSchema= z.object({
    title: z
    .string()
    .min(3, {message: "Title must be at least 3 characters long"})
    .max(100, {message: "Title must be at most 100 characters long"}),

    description: z
    .string()
    .min(3, {message: "Description must be at least 3 characters long"})
    .max(3500, {message: "Description must be at most 3500 characters long"}),

    fileKey: z
    .string()
    .min(1, {message: "File is required"}),

    price: z.coerce
    .number()
    .min(0, {message: "Price must be at least 0"}),

    duration: z.coerce
    .number()
    .min(1, {message: "Duration must be at least 1 hour long"})
    .max(500, {message: "Duration must be at most 500 hours long"}),

    level: z.enum(courseLevels, {
        message: "Level is required",
    }),

    category: z.enum(courseCategories, {
        message: "Category is required",
    }),

    smallDescription: z
    .string()
    .min(3, {message: "Small description must be at least 3 characters long"})
    .max(300, {message: "Small description must be at most 300 characters long"}),

    slug: z
    .string()
    .min(3, {message: "Slug must be at least 3 characters long"})
    .max(100, {message: "Slug must be at most 100 characters long"}),

    status: z.enum(courseStatus, {
        message: "Status is required",
    }),
});

export const chapterSchema = z.object({
    name: z
    .string()
    .min(3, {message: "Name must be at least 3 characters long"}),
    courseId: z.string().uuid({message: "Invalid course id"}),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
