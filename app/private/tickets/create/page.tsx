import { ConsoleContainer } from '@/components/layouts/console-container';
import { getUsers } from '@/@data/users';
import { getCategories } from '@/@data/category';
import { getPriorities } from '@/@data/priotity';
import { getStatuses } from '@/@data/status';
import { ConsoleWrapper } from '@/components/layouts/console-wrapper';
import { mapAndSort } from '@/lib/utils';
import { TicketForm } from '../components/ticket-form';
import { getProjects } from '@/@data/project';

const Page = async () => {
  const { users } = await getUsers();
  const { categories } = await getCategories(false);
  const { priorities } = await getPriorities();
  const { statuses } = await getStatuses();
  const { projects } = await getProjects(false);

const userOptions = mapAndSort(users, user => user.name, user => user.id);
const categoryOptions = mapAndSort(categories, cat => cat.name, cat => cat.id);
const priorityOptions = mapAndSort(priorities, p => p.name, p => p.id);
const statusOptions = mapAndSort(statuses, s => s.name, s => s.id);
const projectOptions = mapAndSort(projects, s => s.name, s => s.id);

  return (
    <ConsoleContainer title="" desc="" className="flex">
      <ConsoleWrapper 
      >
        <TicketForm
        statusOptions={statusOptions || []}
        categoryOptions={categoryOptions || []}
        userOptions={userOptions || []}
        priorityOptions={priorityOptions || []}
        projectOptions={projectOptions || []}
      />
      </ConsoleWrapper>
    </ConsoleContainer>
  );
};

export default Page;
