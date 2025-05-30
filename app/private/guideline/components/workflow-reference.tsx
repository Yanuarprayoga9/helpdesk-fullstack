"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/store/language-context"
import { AlertCircle, Clock, CheckCircle, PauseCircle, HelpCircle, RefreshCcw, XCircle, ArrowRight } from "lucide-react"

export function WorkflowReference() {
  const { t, language } = useLanguage()

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("workflowTitle")}</CardTitle>
          <CardDescription>{t("workflowDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">{t("workflowNormal")}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <AlertCircle className="h-4 w-4" />
                  <span>{t("statusNew")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>{t("statusInProgress")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t("statusResolved")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
                  <XCircle className="h-4 w-4" />
                  <span>{t("statusClosed")}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t("workflowNormalDesc")}</p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">{t("workflowWithInfo")}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <AlertCircle className="h-4 w-4" />
                  <span>{t("statusNew")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>{t("statusInProgress")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                  <PauseCircle className="h-4 w-4" />
                  <span>{t("statusOnHold")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t("statusResolved")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
                  <XCircle className="h-4 w-4" />
                  <span>{t("statusClosed")}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t("workflowWithInfoDesc")}</p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">{t("workflowWithEscalation")}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <AlertCircle className="h-4 w-4" />
                  <span>{t("statusNew")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>{t("statusInProgress")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  <HelpCircle className="h-4 w-4" />
                  <span>{t("statusRequestHelp")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t("statusResolved")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
                  <XCircle className="h-4 w-4" />
                  <span>{t("statusClosed")}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t("workflowWithEscalationDesc")}</p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">{t("workflowWithReopen")}</h3>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <AlertCircle className="h-4 w-4" />
                  <span>{t("statusNew")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>{t("statusInProgress")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t("statusResolved")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
                  <RefreshCcw className="h-4 w-4" />
                  <span>{t("statusReopened")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t("statusResolved")}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-1 bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
                  <XCircle className="h-4 w-4" />
                  <span>{t("statusClosed")}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t("workflowWithReopenDesc")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("businessProcessTitle")}</CardTitle>
          <CardDescription>{t("businessProcessDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">
                1. {language === "id" ? "Pembuatan Tiket (Ticket Creation)" : "Ticket Creation"}
              </h3>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium">{t("trigger")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id"
                      ? "Developer atau anggota tim DevOps menghadapi error atau masalah teknis."
                      : "Developer or DevOps team member encounters error or technical issues."}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("activities")}:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>
                      {language === "id" ? "Developer/DevOps masuk ke sistem." : "Developer/DevOps logs into system."}
                    </li>
                    <li>
                      {language === "id" ? "Mengisi form tiket dengan:" : "Fill ticket form with:"}
                      <ul className="list-circle pl-5">
                        <li>
                          {language === "id" ? "Judul masalah: Singkat dan jelas." : "Issue title: Short and clear."}
                        </li>
                        <li>
                          {language === "id"
                            ? "Deskripsi masalah: Langkah reproduksi atau kronologi."
                            : "Issue description: Reproduction steps or chronology."}
                        </li>
                        <li>{language === "id" ? "Kategori: (user bisa crud)" : "Category: (user can crud)"}</li>
                        <li>
                          {language === "id"
                            ? "Prioritas: Critical, High, Medium, Low"
                            : "Priority: Critical, High, Medium, Low"}
                        </li>
                        <li>
                          {language === "id" ? "Attachment: (Log, Screenshot)." : "Attachment: (Log, Screenshot)."}
                        </li>
                      </ul>
                    </li>
                    <li>
                      {language === "id" ? "Tiket dibuat dengan status: Open." : "Ticket created with status: Open."}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("output")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id"
                      ? "Tiket terdaftar di sistem helpdesk dengan notifikasi ke DevOps atau tim terkait."
                      : "Ticket registered in helpdesk system with notification to DevOps or related team."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">
                2. {language === "id" ? "Penugasan Tiket (Ticket Assignment)" : "Ticket Assignment"}
              </h3>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium">{t("trigger")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id" ? "Tiket baru dibuat oleh pengguna." : "New ticket created by user."}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("activities")}:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>
                      {language === "id"
                        ? "Tiket diprioritaskan berdasarkan urgensi dan kategori."
                        : "Ticket prioritized based on urgency and category."}
                    </li>
                    <li>
                      {language === "id"
                        ? "Sistem atau manager DevOps menugaskan tiket ke:"
                        : "System or DevOps manager assigns ticket to:"}
                      <ul className="list-circle pl-5">
                        <li>
                          {language === "id"
                            ? "Agen khusus (berdasarkan kategori tiket)."
                            : "Specific agent (based on ticket category)."}
                        </li>
                        <li>
                          {language === "id"
                            ? "Developer tertentu (untuk bug terkait kode)."
                            : "Specific developer (for code-related bugs)."}
                        </li>
                        <li>
                          {language === "id"
                            ? "Tim lain jika diperlukan eskalasi."
                            : "Other team if escalation needed."}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("output")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id"
                      ? "Tiket ditugaskan ke personel yang relevan."
                      : "Ticket assigned to relevant personnel."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">
                3. {language === "id" ? "Penanganan Tiket (Ticket Handling)" : "Ticket Handling"}
              </h3>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium">{t("trigger")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id"
                      ? "Tiket telah ditugaskan ke Developer/DevOps."
                      : "Ticket has been assigned to Developer/DevOps."}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("activities")}:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>
                      {language === "id" ? "Developer/DevOps menganalisis tiket:" : "Developer/DevOps analyzes ticket:"}
                      <ul className="list-circle pl-5">
                        <li>{language === "id" ? "Membaca log dan deskripsi." : "Reading logs and description."}</li>
                        <li>
                          {language === "id"
                            ? "Melakukan debugging, perbaikan, atau penyelidikan lebih lanjut."
                            : "Performing debugging, fixes, or further investigation."}
                        </li>
                      </ul>
                    </li>
                    <li>
                      {language === "id"
                        ? "Jika masalah memerlukan kolaborasi, agen meminta klarifikasi dari pelapor atau eskalasi ke tim lain."
                        : "If issue requires collaboration, agent requests clarification from reporter or escalates to other team."}
                    </li>
                    <li>
                      {language === "id" ? "Status tiket diperbarui:" : "Ticket status updated:"}
                      <ul className="list-circle pl-5">
                        <li>
                          {language === "id"
                            ? "In Progress: Masih dalam penanganan."
                            : "In Progress: Still being handled."}
                        </li>
                        <li>
                          {language === "id"
                            ? "Escalated: Memerlukan bantuan pihak lain."
                            : "Escalated: Requires help from others."}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("output")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id"
                      ? "Progres tercatat di tiket dan masalah ditangani secara kolaboratif."
                      : "Progress recorded in ticket and issue handled collaboratively."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">
                4. {language === "id" ? "Resolusi Tiket (Ticket Resolution)" : "Ticket Resolution"}
              </h3>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium">{t("trigger")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id" ? "Masalah teknis selesai ditangani." : "Technical issue has been handled."}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("activities")}:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>
                      {language === "id" ? "Developer/DevOps mencatat:" : "Developer/DevOps records:"}
                      <ul className="list-circle pl-5">
                        <li>
                          {language === "id"
                            ? "Solusi teknis (langkah perbaikan yang dilakukan)."
                            : "Technical solution (repair steps taken)."}
                        </li>
                        <li>{language === "id" ? "Penyebab masalah (jika diketahui)." : "Root cause (if known)."}</li>
                      </ul>
                    </li>
                    <li>
                      {language === "id"
                        ? 'Tiket diubah ke status "Resolved" dan dikirim ke pelapor untuk verifikasi.'
                        : 'Ticket changed to "Resolved" status and sent to reporter for verification.'}
                    </li>
                    <li>
                      {language === "id"
                        ? "Jika pelapor menerima solusi, tiket ditutup."
                        : "If reporter accepts solution, ticket is closed."}
                    </li>
                    <li>
                      {language === "id"
                        ? 'Jika solusi belum sesuai, tiket kembali ke status "In Progress".'
                        : 'If solution is not suitable, ticket returns to "In Progress" status.'}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("output")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id"
                      ? "Masalah selesai dengan dokumentasi teknis untuk evaluasi mendatang."
                      : "Issue resolved with technical documentation for future evaluation."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">
                5. {language === "id" ? "Penutupan Tiket (Ticket Closure)" : "Ticket Closure"}
              </h3>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium">{t("trigger")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id"
                      ? "Pelapor memverifikasi bahwa masalah telah terselesaikan."
                      : "Reporter verifies that the issue has been resolved."}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("activities")}:</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    <li>
                      {language === "id"
                        ? "Pelapor memberikan konfirmasi bahwa solusi telah diterima."
                        : "Reporter provides confirmation that solution has been accepted."}
                    </li>
                    <li>
                      {language === "id"
                        ? "Sistem mencatat evaluasi performa dan feedback."
                        : "System records performance evaluation and feedback."}
                    </li>
                    <li>
                      {language === "id"
                        ? 'Tiket ditutup secara otomatis dengan status "Closed".'
                        : 'Ticket automatically closed with "Closed" status.'}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{t("output")}:</h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "id"
                      ? "Tiket selesai dengan arsip yang dapat digunakan untuk pelaporan atau knowledge base."
                      : "Ticket completed with archive that can be used for reporting or knowledge base."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
