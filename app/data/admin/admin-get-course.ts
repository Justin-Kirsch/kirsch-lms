import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export async function adminGetCourse(id: string) {
    await requireAdmin();

    const data = await prisma.course.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            title: true,
            description: true,
            smallDescription: true,
            category: true,
            duration: true,
            price: true,
            level: true,
            status: true,
            fileKey: true,
            slug: true,
            chapter: {
                select: {
                    id: true,
                    title: true,
                    position: true,
                    lessons: {
                        select: {
                            id: true,
                            title: true,
                            thumbnailKey: true,
                            videoKey: true,
                            position: true,
                        }
                    }
                }
            },
        },
    });

    if(!data) {
        return notFound();
    }

    return data;
}

export type AdminCourseSingularType = Awaited<ReturnType<typeof adminGetCourse>>