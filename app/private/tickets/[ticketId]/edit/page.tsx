import { getCategories } from '@/@data/category'
import { getPriorities } from '@/actions/priotity'
import { getStatuses } from '@/actions/status'
import { getUsers } from '@/@data/users'
import { ConsoleContainer } from '@/components/layouts/console-container'
import { mapAndSort } from '@/lib/utils'
import React from 'react'
import { ConsoleWrapper } from '@/components/layouts/console-wrapper'
import { TicketForm } from '../../components/ticket-form'
import { getTicketByid } from '@/@data/ticket'
import { getUsersTicketByTicketId } from '@/@data/ticket-assignee'
import { getProjects } from '@/@data/project'

interface IEditTicketPage {
  params: Promise<{ ticketId: string }>
}


const page = async ({ params }: IEditTicketPage) => {

  const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await

  // ✅ Fetch semua data terkait ticket
  const [ticketData, ticketUsers, userData, categoryData, priorityData, statusData, projectData] =
    await Promise.all([
      getTicketByid(ticketId),
      getUsersTicketByTicketId(ticketId),
      getUsers(),
      getCategories(false),
      getPriorities(),
      getStatuses(),
      getProjects(false),
    ]);

  // ✅ Map ke options
  const userOptions = mapAndSort(userData.users, user => user.name, user => user.id);
  const categoryOptions = mapAndSort(categoryData.categories, cat => cat.name, cat => cat.id);
  const priorityOptions = mapAndSort(priorityData.priorities, p => p.name, p => p.id);
  const statusOptions = mapAndSort(statusData.statuses, s => s.name, s => s.id);
  const projectOptions = mapAndSort(projectData.projects, p => p.name, p => p.id);

  const ticket = ticketData.ticket;

  const initialData = {
    title: ticket?.title || "",
    description: ticket?.description || "",
    category: ticket?.category?.id || "",
    priority: ticket?.priority?.id || "",
    status: ticket?.status?.id || "",
    project: ticket?.project?.id || "",
    images: ticket?.imageUrl ? [{ url: ticket.imageUrl }] : [],
    assignees: ticketUsers?.users?.map(a => a.id) || [],
    id: ticketId,
  };

  return (
    <ConsoleContainer title="" desc="" className="flex">
      <ConsoleWrapper>
        <TicketForm
          statusOptions={statusOptions}
          categoryOptions={categoryOptions}
          userOptions={userOptions}
          priorityOptions={priorityOptions}
          projectOptions={projectOptions}
          initialData={initialData}
        />
      </ConsoleWrapper>
    </ConsoleContainer>
  );
};

export default page;
