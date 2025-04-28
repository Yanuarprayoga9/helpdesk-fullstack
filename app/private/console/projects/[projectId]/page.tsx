

export const dynamic = "force-dynamic";

import Image from "next/image"

import { getProjectById, getUsersByProjectId } from "@/actions/project"
import { AppTab } from "./components/app-tab"
import { FileText } from "lucide-react"
import Loader from "@/components/loader";
import { Suspense } from "react";
import { ConsoleContainer } from "@/components/console-container";
import { ConsoleWrapper } from "@/components/console-wrapper";


type PageParams = {
    params: Promise<{ projectId: string }>;
};

export default async function ProfilePage({ params }: PageParams) {
    const { projectId } = await params; // Awaiting the params Promise

    const fetchproject = await getProjectById(projectId)
    const fetchprojectusers = await getUsersByProjectId(projectId)


    if (!fetchproject.project) {
        throw Error
    }


    return (
        <Suspense fallback={<Loader />}>
            <ConsoleContainer
                title="Projects"
                desc="Manage all your projects in one place. Organize tasks, track progress, and collaborate with your team efficiently."
            >
                <ConsoleWrapper
                    title="Create New Project"
                    desc="Fill in the form to create a new project."
                    className="w-11/12 "
                >

                    <div className="flex items-center gap-3 my-4">
                        {fetchproject.project?.imageUrl ? (
                            <div className="relative h-10 w-10 rounded-md overflow-hidden">
                                <Image src={fetchproject.project?.imageUrl || "/placeholder.svg"} alt={fetchproject.project?.name} fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="h-10 w-10 bg-muted flex items-center justify-center rounded-md">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                        )}
                        <h1 className="text-2xl font-bold">{fetchproject.project?.name}</h1>
                        {/* <Badge variant="outline" className="ml-2">
                        Public
                    </Badge> */}
                    </div>
                    <div className="">
                        <AppTab project={fetchproject.project} users={fetchprojectusers.users} />
                    </div>
                </ConsoleWrapper>

            </ConsoleContainer>
        </Suspense>
    )
}

