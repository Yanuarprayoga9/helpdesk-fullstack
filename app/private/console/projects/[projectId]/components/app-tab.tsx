"use client";
import React, { useEffect, useState } from "react";
import { TabNav } from "./tab-nav";
import { UserType } from "@/@types/user";
import { ProjectType } from "@/@types/project";
import { TabContent } from "./tab-content";
import { Tabs } from "@/components/ui/tabs";
import {  useRouter, useSearchParams } from "next/navigation";

interface AppTabProps {
    users?: UserType[];
    project: ProjectType;
}

export const AppTab = ({ project, users }: AppTabProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const defaultTab = searchParams.get("tabActive") || "code";
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
                <TabNav TeamRegisteredCount={users?.length || 0} />
                <TabContent project={project} users={users} />
            </Tabs>
        </div>
    );
};
