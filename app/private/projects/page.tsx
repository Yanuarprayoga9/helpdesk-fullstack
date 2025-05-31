export const dynamic = "force-dynamic"

import { Header } from "@/components/header"
import { ProjectForm } from "./components/project-form"
import { getUsers } from "@/@data/users"
import Loader from "@/components/loader"
import { Suspense } from "react"
import { ConsoleWrapper } from "@/components/layouts/console-wrapper"
import { ConsoleContainer } from "@/components/layouts/console-container"
import { ProjectDisplay } from "./components/display"
import { getProjects } from "@/@data/project"

const Page = async () => {
    const fetchprojects = await getProjects(false)
    const fetchUsers = await getUsers()

    const userMapped = fetchUsers.users?.map(user => ({ label: user.name, value: user.id }))

    if (!fetchprojects.success) {
        return (
            <div className="flex flex-col">
                <Header
                    title="Projects"
                    desc="Manage all your projects in one place. Organize tasks, track progress, and collaborate with your team efficiently."
                />
                <p className="text-red-500">Error: {fetchprojects.message}</p>
            </div>
        )
    }

    return (
        <Suspense fallback={<Loader />}>
            <ConsoleContainer
                title="Projects"
                desc="Manage all your projects in one place. Organize tasks, track progress, and collaborate with your team efficiently."

           >
                {/* Grid/List toggle & display */}
                <ProjectDisplay projects={fetchprojects.projects || []} />

                {/* Form column */}
                <ConsoleWrapper
                    title="Create New Project"
                    desc="Fill in the form to create a new project."
                    className="w-full lg:w-3/12"
                >
                    <ProjectForm userMapped={userMapped} />
                </ConsoleWrapper>
            </ConsoleContainer>
        </Suspense>
    )
}

export default Page
