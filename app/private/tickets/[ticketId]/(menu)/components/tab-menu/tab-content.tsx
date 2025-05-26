"use client";
import React from "react";
import { TabsContent } from "@/components/ui/tabs";

interface TabContentProps {
    children: React.ReactNode
    pageName:string
}

export const TabContent = ({ pageName,children }: TabContentProps) => {

    return (
        <>
            <TabsContent value={pageName} className="mt-6">
                {children}
            </TabsContent>
        </>
    );
};
