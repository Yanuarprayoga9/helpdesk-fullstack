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
            "Tidak dapat membuat data penting seperti Tiket, Master Project, atau User - proses kerja terhenti total.",
            "Bug pada tombol 'Create' menyebabkan form tidak bisa disubmit.",
            "Data master tidak tersedia, sehingga seluruh fitur turunannya tidak bisa digunakan.",
            "Validasi gagal di semua form penting tanpa pesan error yang jelas.",
          ]
          : [
            "Unable to create critical data such as Ticket, Project, or User - all operations blocked.",
            "'Create' button bug prevents form submission.",
            "Master data missing, causing all dependent features to fail.",
            "Validation failure in all major forms with no clear feedback.",
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
            "Fungsi upload file (Minio) tidak berjalan, padahal dibutuhkan untuk lampiran penting.",
            "Perhitungan penilaian ahli (SME) salah atau tidak konsisten.",
            "User tidak dapat melihat peran (role) yang seharusnya dimiliki.",
            "Tidak bisa mengakses halaman forum diskusi padahal data tersedia.",
          ]
          : [
            "File upload function (Minio) is not working, needed for important attachments.",
            "SME scoring calculation is wrong or inconsistent.",
            "User roles (admin, badiklat) not displayed correctly.",
            "Unable to access forum detail page despite data being available.",
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
            "Developer masih kebingungan cara mengimplementasikan logika tertentu seperti perhitungan SME.",
            "Belum ada utility notifikasi, tapi sistem utama tetap berjalan.",
            "Proses integrasi belum lengkap, tapi tidak berdampak ke pengguna akhir.",
            "Data tampil tetapi formatnya belum sempurna (misal: role tampil ID, bukan nama).",
          ]
          : [
            "Developer unsure how to implement certain logic like SME scoring.",
            "Notification utility missing, but core system works.",
            "Integration incomplete, but no impact on end users.",
            "Data shown with incorrect format (e.g., role shows ID instead of name).",
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
            "Perubahan tampilan UI yang tidak memengaruhi fungsionalitas.",
            "Update dokumentasi cara setup project.",
            "Permintaan ganti nama field atau label.",
            "Tambahan fitur minor seperti filter tambahan di tabel.",
            "Update warna atau padding untuk keseragaman desain.",
          ]
          : [
            "UI changes that don't affect functionality.",
            "Documentation updates for project setup.",
            "Request to rename field or label.",
            "Minor feature additions like extra table filters.",
            "UI polish: color or padding adjustments for consistency.",
          ],
      icon: <Info className="h-4 w-4 text-blue-500" />,
      color: "bg-blue-100 text-blue-800",
    },
  ];

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
