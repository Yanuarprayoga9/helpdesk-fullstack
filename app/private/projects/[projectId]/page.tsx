

export const dynamic = "force-dynamic";

import Image from "next/image"

import { getProjectById, getUsersByProjectId } from "@/actions/project"
import { AppTab } from "./components/app-tab"
import { FileText } from "lucide-react"


type PageParams = {
    params: Promise<{ projectId: string }>;
  };
  
  export default async function ProfilePage({ params }:PageParams) {
    const { projectId } = await params; // Awaiting the params Promise
    
    const fetchproject = await getProjectById(projectId)
    const fetchprojectusers = await getUsersByProjectId(projectId)


    if(!fetchproject.project){
        throw Error
    }
   

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            {/* Project Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
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
                    <AppTab project={fetchproject.project } users={fetchprojectusers.users}/>
                </div>
            </div>

            
        </div>
    )
}

