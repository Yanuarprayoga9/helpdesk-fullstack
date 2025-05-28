export const dynamic = "force-dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getTicketByid } from "@/@data/ticket";
import { getUsersTicketByTicketId } from "@/@data/ticket-assignee";
import { AppTab } from "../../@tab-menu/app-tab";

interface IEditTicketPage {
  params: Promise<{ ticketId: string }>
}


const page = async ({ params }: IEditTicketPage) => {
  const ticketId = (await params).ticketId; // ✅ Sudah benar, tidak perlu await

  const ticket = await getTicketByid(ticketId);
  const ticketUsers = await getUsersTicketByTicketId(ticketId);

  if (!ticket.ticket || !ticketUsers.users) return "ERROR";

  // User ID yang sudah terdaftar pada tiket



  return (
    <AppTab assignedUsers={ticketUsers.users} pageName="team">

      <div className="border rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Team Members</h3>
        {ticketUsers.users && ticketUsers.users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ticketUsers.users.map((user, index) => (
              <div
                key={user?.id || index}
                className="flex items-center gap-3 p-3 border rounded-md"
              >
                <Avatar>
                  <AvatarImage src={user?.imageUrl || ""} alt={user?.name || ""} />
                  <AvatarFallback>
                    {user?.name ? user.name.substring(0, 2).toUpperCase() : "UN"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user?.name || "Unknown User"}</div>
                  <div className="text-sm text-muted-foreground">
                    {user?.email || "No email"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            No team members yet
          </div>
        )}
      </div>
    </AppTab>

  )
}
export default page;
