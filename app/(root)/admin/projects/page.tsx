
import { Header } from "@/components/header";
import { getProjects } from "@/actions/project";
import { ProjectList } from "@/components/project/project-list";
import { ProjectForm } from "./components/project-form";
import { getUsers } from "@/actions/users";
import Loader from "@/components/loader";
import { Suspense } from "react";



const page = async () => {
    const fetchprojects = await getProjects(false);
    const fetchUsers = await getUsers()

    const userMapped = fetchUsers.users?.map((user) => (
        {
            label: user.name,
            value: user.id
        }
    ))
    if (!fetchprojects.success) {
        return (
            <div className='flex flex-col'>
                <Header
                    title="Projects"
                    desc="Manage all your projects in one place. Organize tasks, track progress, and collaborate with your team efficiently."
                />
                <p className="text-red-500">Error: {fetchprojects.message}</p>
            </div>
        );
    }

    return (
        <Suspense fallback={<Loader />}>

            <div className='flex flex-col'>
                <Header
                    title="Projects"
                    desc="Manage all your projects in one place. Organize tasks, track progress, and collaborate with your team efficiently."
                />
                <ProjectForm userMapped={userMapped} />
                <ProjectList projects={fetchprojects.projects} />
            </div>
        </Suspense>
    );
};

export default page;
