"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/store/language-context"
import { StatusReference } from "./status-reference"
import { PriorityReference } from "./priority-reference"
import { CategoryReference } from "./category-reference"
import { WorkflowReference } from "./workflow-reference"

export default function TicketReference() {
  const [activeTab, setActiveTab] = useState("status")
  const { t } = useLanguage()

  return (
    <Tabs defaultValue="status" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="status">{t("statusTypes")}</TabsTrigger>
        <TabsTrigger value="priority">{t("priorityLevels")}</TabsTrigger>
        <TabsTrigger value="category">{t("categories")}</TabsTrigger>
        <TabsTrigger value="workflow">{t("workflow")}</TabsTrigger>
      </TabsList>
      <TabsContent value="status">
        <StatusReference />
      </TabsContent>
      <TabsContent value="priority">
        <PriorityReference />
      </TabsContent>
      <TabsContent value="category">
        <CategoryReference />
      </TabsContent>
      <TabsContent value="workflow">
        <WorkflowReference />
      </TabsContent>
    </Tabs>
  )
}
