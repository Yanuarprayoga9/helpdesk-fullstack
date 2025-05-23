"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TabsContent } from "@/components/ui/tabs";
import { UserType } from "@/@types/user";
import TicketDetailCard from "../ticket-detail-card";
import { TicketType } from "@/@types/ticket";
import { usePathname } from "next/navigation";

interface TabContentProps {
  assignedUsers?: UserType[] | null;
  ticket: TicketType;
}

export const TabContent = ({ assignedUsers, ticket }: TabContentProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentTab = segments[segments.length - 1] || "detail";

  console.log({currentTab})
  return (
    <>
      {currentTab === "detail" && (
        <TabsContent value="detail" className="mt-6">
          <TicketDetailCard ticket={ticket} />
        </TabsContent>
      )}

      {currentTab === "issues" && (
        <TabsContent value="issues">
          <div className="p-6 text-center text-muted-foreground">
            Issues content goes here.
          </div>
        </TabsContent>
      )}

      {currentTab === "team" && (
        <TabsContent value="team">
          <div className="border rounded-md p-6">
            <h3 className="text-lg font-medium mb-4">Team Members</h3>
            {assignedUsers && assignedUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignedUsers.map((user, index) => (
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
        </TabsContent>
      )}

      {currentTab === "settings" && (
        <TabsContent value="settings">
          <div className="border rounded-md p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Settings</h3>
            <p className="text-muted-foreground">Project settings would go here</p>
          </div>
        </TabsContent>
      )}
    </>
  );
};
