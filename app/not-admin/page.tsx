import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShieldX } from "lucide-react";
import Link from "next/link";

export default function NotAdminRoute() {
    return <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full py-12 g">
            <CardHeader className="text-center flex flex-col gap-6 items-center">
                <div className="bg-destructive/10 p-4 rounded-full w-fit mx-auto">
                    <ShieldX className="size-16 text-destructive"/>
                </div>
                <div className="text-center flex flex-col gap-4">
                    <CardTitle className="text-2xl">Access Restricted!</CardTitle>
                    <CardDescription className="max-w-xs mx-auto">You do not have permission to access this page.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Link href="/" className={buttonVariants({className: "w-full"})}>
                    <ArrowLeft className="mr-1 size-4" />
                    Back to Home
                </Link>
            </CardContent>
        </Card>
    </div>;
}