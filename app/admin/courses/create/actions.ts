"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/zodSchemas";
import { detectBot, fixedWindow } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
    detectBot({
        mode: 'LIVE',
        allow: [],
    })
).withRule(
    fixedWindow({
        mode: 'LIVE',
        window: '1m',
        max: 10,
    })
);

export async function CreateCourse(data: CourseSchemaType): Promise<ApiResponse> {
    const session = await requireAdmin();
    
    try {
          // Access request data that Arcjet needs when you call `protect()` similarly
        // to `await headers()` and `await cookies()` in `next/headers`
        const req = await request();
        const decision = await aj.protect(req, {
            fingerprint: session.user.id,
        });

        if (decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                return {
                    status: 'error',
                    message: 'You have been blocked due to rate limiting'
                };
            } else {
                return {
                    status: 'error',
                    message: "Bot detected! If this is a mistake, please contact our Support"
                }
            } 
        }
        
        const validation = courseSchema.safeParse(data);

        if(!validation.success) {
            return {
                status: "error",
                message: "Invadif Form Data",
            }
        }

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session?.user.id as string,
            }
        });
        return {
            status: "success",
            message: "Course created successfully",
        }
    } catch {
        return {
            status: "error",
            message: "Failed to create course",
        }

    }
}
