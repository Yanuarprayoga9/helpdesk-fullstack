"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, AlertOctagon, AlertCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/store/language-context"

export function PriorityReference() {
  const { t, language } = useLanguage()

  const priorities = [
    {
      name: t("priorityCritical"),
      description: t("priorityCriticalDesc"),
      response: "15 " + (language === "id" ? "menit" : "minutes"),
      resolution: "< 2 " + (language === "id" ? "jam" : "hours"),
      examples:
        language === "id"
          ? [
              "Server Produksi Down - Server aplikasi tidak dapat diakses sejak pukul 08:00, semua layanan berhenti.",
              "Kegagalan Database Utama - Replikasi database gagal, menyebabkan transaksi tidak dapat disimpan.",
              "Jaringan Internal Putus - Cluster Kubernetes kehilangan konektivitas antar node.",
              "Eksploitasi Keamanan Sedang Berlangsung - Kerentanan log4j ditemukan di server produksi, segera tambal.",
              "Pipeline CI/CD Produksi Gagal Total - Deployment aplikasi tidak dapat dilakukan akibat error di Jenkins.",
            ]
          : [
              "Production Server Down - Application server inaccessible since 08:00, all services stopped.",
              "Main Database Failure - Database replication failed, causing transactions unable to be saved.",
              "Internal Network Disconnected - Kubernetes cluster lost connectivity between nodes.",
              "Ongoing Security Exploitation - log4j vulnerability found on production server, patch immediately.",
              "Production CI/CD Pipeline Total Failure - Application deployment cannot be done due to Jenkins error.",
            ],
      icon: <AlertOctagon className="h-6 w-6 text-red-500" />,
      color: "bg-red-100 text-red-800",
    },
    {
      name: t("priorityHigh"),
      description: t("priorityHighDesc"),
      response: "1 " + (language === "id" ? "jam" : "hour"),
      resolution: "< 6 " + (language === "id" ? "jam" : "hours"),
      examples:
        language === "id"
          ? [
              "Layanan API Lambat - API gateway membutuhkan waktu 10 detik untuk merespons permintaan GET.",
              "Load Balancer Error - Load balancer hanya mengarahkan traffic ke satu server, menyebabkan overload.",
              "Kesalahan Konfigurasi Infrastruktur - Volume storage pada satu instance penuh, layanan terganggu.",
              "Job Scheduler Tidak Berjalan - Backup otomatis database tidak berjalan selama 3 hari terakhir.",
              "Masalah Cache - Redis cache corrupt, menyebabkan peningkatan latency di aplikasi.",
            ]
          : [
              "Slow API Service - API gateway takes 10 seconds to respond to GET requests.",
              "Load Balancer Error - Load balancer only directs traffic to one server, causing overload.",
              "Infrastructure Configuration Error - Storage volume on one instance full, service disrupted.",
              "Job Scheduler Not Running - Automatic database backup not running for the last 3 days.",
              "Cache Issues - Redis cache corrupt, causing increased latency in application.",
            ],
      icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-100 text-orange-800",
    },
    {
      name: t("priorityMedium"),
      description: t("priorityMediumDesc"),
      response: "4 " + (language === "id" ? "jam" : "hours"),
      resolution: "< 24 " + (language === "id" ? "jam" : "hours"),
      examples:
        language === "id"
          ? [
              "Kesalahan pada Monitoring - Grafana tidak menampilkan metrik untuk service tertentu.",
              "Request Pembaruan Script Deployment - Tambahkan validasi baru dalam script deployment untuk mengecek environment variables.",
              "Masalah Log - Log dari microservice X tidak terindeks di Elasticsearch.",
              "Permintaan Akses SSH - Developer baru meminta akses ke server staging untuk debugging.",
              "Gangguan Minor di CDN - Beberapa file statis tidak di-cache di CDN regional tertentu.",
            ]
          : [
              "Monitoring Error - Grafana not displaying metrics for specific service.",
              "Deployment Script Update Request - Add new validation in deployment script to check environment variables.",
              "Log Issues - Logs from microservice X not indexed in Elasticsearch.",
              "SSH Access Request - New developer requests access to staging server for debugging.",
              "Minor CDN Disruption - Some static files not cached in specific regional CDN.",
            ],
      icon: <AlertCircle className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      name: t("priorityLow"),
      description: t("priorityLowDesc"),
      response: "1 " + (language === "id" ? "hari" : "day"),
      resolution: "< 7 " + (language === "id" ? "hari" : "days"),
      examples:
        language === "id"
          ? [
              "Permintaan Update Dokumentasi - Update README.md untuk menjelaskan cara setup lokal.",
              "Perubahan Nama Resource - Ubah nama bucket S3 agar sesuai dengan standar penamaan terbaru.",
              "Cleanup Resource Lama - Hapus server development lama yang tidak digunakan.",
              "Permintaan Perubahan Grafana Dashboard - Tambahkan metrik baru pada panel CPU usage di dashboard.",
              "Automasi Tambahan - Tambahkan step otomatis untuk memvalidasi PR ke branch staging.",
            ]
          : [
              "Documentation Update Request - Update README.md to explain local setup.",
              "Resource Name Change - Change S3 bucket name to match latest naming standards.",
              "Old Resource Cleanup - Delete old unused development servers.",
              "Grafana Dashboard Change Request - Add new metrics to CPU usage panel in dashboard.",
              "Additional Automation - Add automatic step to validate PR to staging branch.",
            ],
      icon: <Info className="h-4 w-4 text-blue-500" />,
      color: "bg-blue-100 text-blue-800",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {priorities.map((priority, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              {priority.icon}
              <div>
                <CardTitle className="text-xl">{priority.name}</CardTitle>
                <Badge className={priority.color}>{t("priority")}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">{t("statusDescription")}</h4>
                  <p className="text-sm text-muted-foreground">{priority.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="font-medium">{t("priorityResponse")}:</h4>
                    <p className="text-sm text-muted-foreground">{priority.response}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t("priorityResolution")}:</h4>
                    <p className="text-sm text-muted-foreground">{priority.resolution}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">{language === "id" ? "Contoh Kasus:" : "Example Cases:"}</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    {priority.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("priorityTableTitle")}</CardTitle>
          <CardDescription>{t("priorityTableDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("priority")}</TableHead>
                <TableHead>{t("priorityImpact")}</TableHead>
                <TableHead>{t("priorityResponse")}</TableHead>
                <TableHead>{t("priorityResolution")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="h-4 w-4 text-red-500" />
                    {t("priorityCritical")}
                  </div>
                </TableCell>
                <TableCell>{t("priorityCriticalImpact")}</TableCell>
                <TableCell>15 {language === "id" ? "menit" : "minutes"}</TableCell>
                <TableCell>{"< 2 " + (language === "id" ? "jam" : "hours")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    {t("priorityHigh")}
                  </div>
                </TableCell>
                <TableCell>{t("priorityHighImpact")}</TableCell>
                <TableCell>1 {language === "id" ? "jam" : "hour"}</TableCell>
                <TableCell>{"< 6 " + (language === "id" ? "jam" : "hours")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    {t("priorityMedium")}
                  </div>
                </TableCell>
                <TableCell>{t("priorityMediumImpact")}</TableCell>
                <TableCell>4 {language === "id" ? "jam" : "hours"}</TableCell>
                <TableCell>{"< 24 " + (language === "id" ? "jam" : "hours")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    {t("priorityLow")}
                  </div>
                </TableCell>
                <TableCell>{t("priorityLowImpact")}</TableCell>
                <TableCell>1 {language === "id" ? "hari" : "day"}</TableCell>
                <TableCell>{"< 7 " + (language === "id" ? "hari" : "days")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
