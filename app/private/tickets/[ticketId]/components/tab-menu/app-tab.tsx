"use client";
import React from "react";
import { TabNav } from "./tab-nav";
import { UserType } from "@/@types/user";
import { TabContent } from "./tab-content";
import { Tabs } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";
import { TicketType } from "@/@types/ticket";

interface AppTabProps {
  assignedUsers?: UserType[];
  ticket: TicketType;
}

export const AppTab = ({ ticket, assignedUsers }: AppTabProps) => {
  const pathname = usePathname();

  // Ambil nama tab dari URL, contoh: "/project/123/detail"
  const segments = pathname.split("/");
  const currentTab = segments[segments.length - 1] || "detail";

  return (
    <div>
      <Tabs value={currentTab} className="mb-6">
        <TabNav TeamRegisteredCount={assignedUsers?.length || 0} />
        <TabContent ticket={ticket} assignedUsers={assignedUsers} />
      </Tabs>
    </div>
  );
};
