"use client";
import React, { useEffect, useState } from "react";
import { TabNav } from "./tab-nav";
import { UserType } from "@/@types/user";
import { TabContent } from "./tab-content";
import { Tabs } from "@/components/ui/tabs";
import {  useRouter, useSearchParams } from "next/navigation";
import { TicketType } from "@/@types/ticket";

interface AppTabProps {
    assignedUsers?: UserType[];
    ticket: TicketType;
}

export const AppTab = ({ ticket, assignedUsers }: AppTabProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const defaultTab = searchParams.get("tabActive") || "detail";
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("tabActive", tab);
        router.push(`?${searchParams.toString()}`, { scroll: false });
    };

    return (
        <div>
            {/* Navigation Tabs */}
            <Tabs value={activeTab} className="mb-6" onValueChange={handleTabChange}>
                <TabNav TeamRegisteredCount={assignedUsers?.length || 0} />
                <TabContent ticket={ticket} assignedUsers={assignedUsers} />
            </Tabs>
        </div>
    );
};
