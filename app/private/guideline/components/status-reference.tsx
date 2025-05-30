"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Clock, CheckCircle, PauseCircle, HelpCircle, RefreshCcw, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/store/language-context"

export function StatusReference() {
  const { t } = useLanguage()

  const statuses = [
    {
      name: t("statusNew"),
      description: t("statusNewDesc"),
      activity: t("statusNewActivity"),
      example: t("statusNewExample"),
      icon: <AlertCircle className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: t("statusInProgress"),
      description: t("statusInProgressDesc"),
      activity: t("statusInProgressActivity"),
      example: t("statusInProgressExample"),
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-100 text-amber-800",
    },
    {
      name: t("statusOnHold"),
      description: t("statusOnHoldDesc"),
      activity: t("statusOnHoldActivity"),
      example: t("statusOnHoldExample"),
      icon: <PauseCircle className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-100 text-orange-800",
    },
    {
      name: t("statusRequestHelp"),
      description: t("statusRequestHelpDesc"),
      activity: t("statusRequestHelpActivity"),
      example: t("statusRequestHelpExample"),
      icon: <HelpCircle className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: t("statusResolved"),
      description: t("statusResolvedDesc"),
      activity: t("statusResolvedActivity"),
      example: t("statusResolvedExample"),
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      color: "bg-green-100 text-green-800",
    },
    {
      name: t("statusReopened"),
      description: t("statusReopenedDesc"),
      activity: t("statusReopenedActivity"),
      example: t("statusReopenedExample"),
      icon: <RefreshCcw className="h-6 w-6 text-rose-500" />,
      color: "bg-rose-100 text-rose-800",
    },
    {
      name: t("statusClosed"),
      description: t("statusClosedDesc"),
      activity: t("statusClosedActivity"),
      example: t("statusClosedExample"),
      icon: <XCircle className="h-6 w-6 text-slate-500" />,
      color: "bg-slate-100 text-slate-800",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {statuses.map((status, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            {status.icon}
            <div>
              <CardTitle className="text-xl">{status.name}</CardTitle>
              <Badge className={status.color}>{t("status")}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{t("statusDescription")}</h4>
                <p className="text-sm text-muted-foreground">{status.description}</p>
              </div>
              <div>
                <h4 className="font-medium">{t("statusActivity")}</h4>
                <p className="text-sm text-muted-foreground">{status.activity}</p>
              </div>
              <div>
                <h4 className="font-medium">{t("statusExample")}</h4>
                <p className="text-sm text-muted-foreground italic">"{status.example}"</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
