"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug, Server, Upload, Settings, Key, Database, BarChart3, Save, Link } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/store/language-context"

export function CategoryReference() {
  const { t, language } = useLanguage()

  const categories = [
    {
      name: t("categoryBugSystem"),
      description: t("categoryBugSystemDesc"),
      examples:
        language === "id"
          ? ["API tidak merespons setelah update terakhir.", "Fitur pencarian error dengan kode 500."]
          : ["API not responding after latest update.", "Search feature error with code 500."],
      icon: <Bug className="h-6 w-6 text-red-500" />,
      color: "bg-red-100 text-red-800",
    },
    {
      name: t("categoryInfrastructure"),
      description: t("categoryInfrastructureDesc"),
      examples:
        language === "id"
          ? ["Server staging down sejak pukul 10:00.", "Load balancer tidak mendistribusikan trafik dengan benar."]
          : ["Staging server down since 10:00.", "Load balancer not distributing traffic correctly."],
      icon: <Server className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-100 text-orange-800",
    },
    {
      name: t("categoryDeployment"),
      description: t("categoryDeploymentDesc"),
      examples:
        language === "id"
          ? [
              "Tolong deploy branch feature/login ke production.",
              "Rollback deployment karena masalah pada versi terbaru.",
            ]
          : [
              "Please deploy branch feature/login to production.",
              "Rollback deployment due to issues in latest version.",
            ],
      icon: <Upload className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: t("categoryChangeRequest"),
      description: t("categoryChangeRequestDesc"),
      examples:
        language === "id"
          ? ["Tambahkan variable baru di environment staging.", "Update versi library di Dockerfile ke versi terbaru."]
          : ["Add new variable in staging environment.", "Update library version in Dockerfile to latest version."],
      icon: <Settings className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: t("categoryAccessRequest"),
      description: t("categoryAccessRequestDesc"),
      examples:
        language === "id"
          ? ["Minta akses ke bucket S3 untuk tim backend.", "Tingkatkan izin user ke admin di Jenkins."]
          : ["Request access to S3 bucket for backend team.", "Upgrade user permission to admin in Jenkins."],
      icon: <Key className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      name: t("categoryDatabase"),
      description: t("categoryDatabaseDesc"),
      examples:
        language === "id"
          ? ["Query timeout pada tabel transaksi.", "Perubahan skema menyebabkan error di aplikasi."]
          : ["Query timeout on transaction table.", "Schema changes causing errors in application."],
      icon: <Database className="h-6 w-6 text-emerald-500" />,
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      name: t("categoryMonitoring"),
      description: t("categoryMonitoringDesc"),
      examples:
        language === "id"
          ? ["Tambahkan monitoring untuk endpoint /auth/login.", "Perlu log tambahan untuk debug error deployment."]
          : ["Add monitoring for endpoint /auth/login.", "Need additional logs for debugging deployment errors."],
      icon: <BarChart3 className="h-6 w-6 text-indigo-500" />,
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      name: t("categoryBackup"),
      description: t("categoryBackupDesc"),
      examples:
        language === "id"
          ? [
              "Restore database ke snapshot tanggal 10 Desember 2024.",
              "Tolong backup data sebelum deploy major update.",
            ]
          : [
              "Restore database to snapshot from December 10, 2024.",
              "Please backup data before major update deployment.",
            ],
      icon: <Save className="h-6 w-6 text-cyan-500" />,
      color: "bg-cyan-100 text-cyan-800",
    },
    {
      name: t("categoryIntegration"),
      description: t("categoryIntegrationDesc"),
      examples:
        language === "id"
          ? ["Integrasi webhook dengan Slack tidak berjalan.", "Tambahkan integrasi monitoring ke Grafana."]
          : ["Webhook integration with Slack not working.", "Add monitoring integration to Grafana."],
      icon: <Link className="h-6 w-6 text-pink-500" />,
      color: "bg-pink-100 text-pink-800",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            {category.icon}
            <div>
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <Badge className={category.color}>{t("category")}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{t("statusDescription")}</h4>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <div>
                <h4 className="font-medium">{t("examples")}:</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {category.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
