"use client";
import React from "react";
import { TabNav } from "./tab-nav";
import { UserType } from "@/@types/user";
import { TabContent } from "./tab-content";
import { Tabs } from "@/components/ui/tabs";


interface AppTabProps {
  assignedUsers?: UserType[];
  
  children:React.ReactNode
  pageName:string;
}

export const AppTab = ({  assignedUsers,children,pageName }: AppTabProps) => {
 

  return (
    <div>
      <Tabs value={pageName} className="mb-6">
        <TabNav TeamRegisteredCount={assignedUsers?.length || 0} />
        <TabContent pageName={pageName}  >
            {children}
        </TabContent>
      </Tabs>
    </div>
  );
};
