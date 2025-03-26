
import { PageHeader } from "@/components/header";
import { getProjects } from "@/actions/project";
import { ProjectList } from "@/components/project/project-list";
import { ProjectForm } from "./components/project-form";
import { getUsers } from "@/actions/users";



const page = async () => {
    const fetchprojects = await getProjects(false);
    const fetchUsers = await getUsers()

    const userMapped = fetchUsers.users?.map((user)=>(
        {
            label : user.name,
            value: user.id
        }
    ))
    if (!fetchprojects.success) {
        return (
            <div className='flex flex-col'>
                <PageHeader title='Category' desc='Category page' />
                <p className="text-red-500">Error: {fetchprojects.message}</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col'>
            <PageHeader title='Category' desc='Category page' />
            <ProjectForm userMapped={userMapped}/>
            <ProjectList projects={fetchprojects.projects} />
        </div>
    );
};

export default page;
