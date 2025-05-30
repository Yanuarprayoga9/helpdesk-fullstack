export const translations = {
  id: {
    // Header
    title: "Sistem Manajemen Tiket",
    subtitle: "Panduan referensi untuk status tiket, prioritas, dan kategori",

    // Tabs
    statusTypes: "Tipe Status",
    priorityLevels: "Level Prioritas",
    categories: "Kategori",
    workflow: "Alur Kerja",

    // Status Reference
    statusDescription: "Deskripsi:",
    statusActivity: "Aktivitas:",
    statusExample: "Contoh:",

    // Status Types
    statusNew: "New",
    statusNewDesc: "Tiket baru dibuat oleh pelapor dan belum ditangani oleh tim.",
    statusNewActivity: "Menunggu agen atau tim mengambil tiket untuk ditangani.",
    statusNewExample: "Server staging down sejak pukul 10:00.",

    statusInProgress: "In Progress",
    statusInProgressDesc: "Tiket sedang ditangani oleh agen atau tim yang ditugaskan.",
    statusInProgressActivity:
      "Tim mulai menganalisis dan memperbaiki masalah. Dapat memerlukan diskusi lebih lanjut dengan pelapor.",
    statusInProgressExample: "Bug di fitur login sedang dalam proses debugging.",

    statusOnHold: "On Hold",
    statusOnHoldDesc: "Tiket tidak dapat dilanjutkan sementara karena menunggu informasi atau sumber daya tambahan.",
    statusOnHoldActivity: "Menunggu klarifikasi dari pelapor. Menunggu approval dari manajer atau akses tertentu.",
    statusOnHoldExample: "Menunggu akses ke database untuk melanjutkan investigasi.",

    statusRequestHelp: "requestHelp",
    statusRequestHelpDesc:
      "Tiket dinaikkan ke tim yang lebih berpengalaman atau memiliki otoritas lebih tinggi untuk menangani masalah kompleks.",
    statusRequestHelpActivity:
      "Tim level 1 menyerahkan tiket ke level 2 atau 3. Biasanya untuk masalah dengan prioritas tinggi atau kritis.",
    statusRequestHelpExample: "Masalah keamanan kritis diteruskan ke tim keamanan IT.",

    statusResolved: "Resolved",
    statusResolvedDesc: "Solusi telah diterapkan, dan masalah dianggap selesai.",
    statusResolvedActivity:
      "Menunggu verifikasi dari pelapor atau tim QA. Menyertakan dokumentasi penyelesaian di tiket.",
    statusResolvedExample: "Bug pada fitur login telah diperbaiki, menunggu konfirmasi dari pelapor.",

    statusReopened: "Reopened",
    statusReopenedDesc:
      "Tiket yang sebelumnya dianggap selesai dibuka kembali karena masalah belum benar-benar terselesaikan.",
    statusReopenedActivity: "Tim kembali menangani tiket dan memulai investigasi ulang.",
    statusReopenedExample: "Masalah pada login muncul kembali setelah deployment terbaru.",

    statusClosed: "Closed",
    statusClosedDesc:
      "Tiket secara resmi ditutup setelah pelapor atau tim QA mengonfirmasi bahwa masalah benar-benar telah diselesaikan.",
    statusClosedActivity: "Tidak ada tindakan lebih lanjut pada tiket. Dokumentasi lengkap diarsipkan.",
    statusClosedExample: "Bug login telah diverifikasi dan tidak ada masalah lagi.",

    // Priority Reference
    priorityTableTitle: "Tabel Ringkasan Prioritas di DevOps",
    priorityTableDesc: "Panduan cepat untuk menentukan prioritas tiket",
    priorityImpact: "Dampak",
    priorityResponse: "Respon Awal",
    priorityResolution: "Resolusi SLA",

    priorityCritical: "Critical",
    priorityCriticalDesc:
      "Masalah yang memengaruhi seluruh operasional bisnis atau sistem inti secara langsung dan membutuhkan tindakan segera.",
    priorityCriticalImpact: "Menghentikan layanan utama",

    priorityHigh: "High",
    priorityHighDesc:
      "Masalah yang berdampak signifikan pada sebagian besar layanan atau sistem tetapi tidak menghentikan seluruh operasi.",
    priorityHighImpact: "Mengganggu layanan penting",

    priorityMedium: "Medium",
    priorityMediumDesc:
      "Masalah atau permintaan yang berdampak pada sebagian kecil layanan atau tim tetapi tidak memengaruhi operasional utama.",
    priorityMediumImpact: "Masalah minor yang memengaruhi sebagian",

    priorityLow: "Low",
    priorityLowDesc:
      "Permintaan atau masalah minor yang tidak memengaruhi operasional tetapi perlu diselesaikan untuk peningkatan atau kemudahan kerja tim.",
    priorityLowImpact: "Tidak berdampak langsung pada operasional",

    // Categories
    categoryBugSystem: "Bug Sistem",
    categoryBugSystemDesc: "Masalah teknis pada aplikasi atau sistem yang menyebabkan malfungsi.",

    categoryInfrastructure: "Gangguan Infrastruktur",
    categoryInfrastructureDesc: "Masalah pada infrastruktur seperti server, jaringan, atau layanan cloud.",

    categoryDeployment: "Permintaan Deployment",
    categoryDeploymentDesc: "Permintaan untuk memindahkan fitur baru atau update ke lingkungan tertentu.",

    categoryChangeRequest: "Permintaan Perubahan",
    categoryChangeRequestDesc: "Permintaan untuk mengubah konfigurasi, pipeline CI/CD, atau lingkungan sistem.",

    categoryAccessRequest: "Permintaan Akses",
    categoryAccessRequestDesc: "Permintaan hak akses ke sistem tertentu atau penyesuaian izin.",

    categoryDatabase: "Masalah Database",
    categoryDatabaseDesc: "Error atau gangguan pada database.",

    categoryMonitoring: "Permintaan Monitoring atau Logging",
    categoryMonitoringDesc: "Permintaan untuk menambahkan atau menyesuaikan monitoring dan logging.",

    categoryBackup: "Permintaan Backup atau Restore",
    categoryBackupDesc: "Permintaan untuk membuat atau mengembalikan data dari backup.",

    categoryIntegration: "Permintaan Integrasi",
    categoryIntegrationDesc: "Masalah atau permintaan terkait integrasi antar sistem.",

    // Workflow
    workflowTitle: "Alur Perubahan Status Tiket",
    workflowDesc: "Proses standar perubahan status tiket dari awal hingga selesai",
    workflowNormal: "Proses Normal",
    workflowNormalDesc: "(Proses normal ketika masalah langsung terselesaikan)",
    workflowWithInfo: "Proses dengan Informasi Tambahan",
    workflowWithInfoDesc: "(Jika membutuhkan informasi tambahan sebelum melanjutkan)",
    workflowWithEscalation: "Proses dengan Eskalasi",
    workflowWithEscalationDesc: "(Jika masalah harus ditangani oleh tim yang lebih senior)",
    workflowWithReopen: "Proses dengan Pembukaan Kembali",
    workflowWithReopenDesc: "(Jika masalah yang sama muncul kembali)",

    businessProcessTitle: "Proses Bisnis Manajemen Tiket Internal",
    businessProcessDesc: "Alur kerja lengkap dari pembuatan hingga penutupan tiket",

    // Common
    status: "Status",
    priority: "Prioritas",
    category: "Kategori",
    description: "Deskripsi",
    examples: "Contoh",
    trigger: "Trigger",
    activities: "Aktivitas",
    output: "Output",
  },
  en: {
    // Header
    title: "Ticket Management System",
    subtitle: "Reference guide for ticket statuses, priorities, and categories",

    // Tabs
    statusTypes: "Status Types",
    priorityLevels: "Priority Levels",
    categories: "Categories",
    workflow: "Workflow",

    // Status Reference
    statusDescription: "Description:",
    statusActivity: "Activity:",
    statusExample: "Example:",

    // Status Types
    statusNew: "New",
    statusNewDesc: "New ticket created by reporter and not yet handled by the team.",
    statusNewActivity: "Waiting for agent or team to take the ticket for handling.",
    statusNewExample: "Staging server down since 10:00 AM.",

    statusInProgress: "In Progress",
    statusInProgressDesc: "Ticket is being handled by assigned agent or team.",
    statusInProgressActivity:
      "Team starts analyzing and fixing the issue. May require further discussion with reporter.",
    statusInProgressExample: "Login feature bug is in debugging process.",

    statusOnHold: "On Hold",
    statusOnHoldDesc: "Ticket cannot be continued temporarily due to waiting for additional information or resources.",
    statusOnHoldActivity: "Waiting for clarification from reporter. Waiting for manager approval or specific access.",
    statusOnHoldExample: "Waiting for database access to continue investigation.",

    statusRequestHelp: "Request Help",
    statusRequestHelpDesc: "Ticket escalated to more experienced team or higher authority to handle complex issues.",
    statusRequestHelpActivity:
      "Level 1 team hands over ticket to level 2 or 3. Usually for high priority or critical issues.",
    statusRequestHelpExample: "Critical security issue forwarded to IT security team.",

    statusResolved: "Resolved",
    statusResolvedDesc: "Solution has been implemented, and the issue is considered resolved.",
    statusResolvedActivity:
      "Waiting for verification from reporter or QA team. Including resolution documentation in ticket.",
    statusResolvedExample: "Login feature bug has been fixed, waiting for confirmation from reporter.",

    statusReopened: "Reopened",
    statusReopenedDesc: "Previously resolved ticket reopened because the issue has not been truly resolved.",
    statusReopenedActivity: "Team handles the ticket again and starts re-investigation.",
    statusReopenedExample: "Login issue appeared again after latest deployment.",

    statusClosed: "Closed",
    statusClosedDesc:
      "Ticket officially closed after reporter or QA team confirms that the issue has been truly resolved.",
    statusClosedActivity: "No further action on ticket. Complete documentation archived.",
    statusClosedExample: "Login bug has been verified and no more issues.",

    // Priority Reference
    priorityTableTitle: "DevOps Priority Summary Table",
    priorityTableDesc: "Quick guide to determine ticket priority",
    priorityImpact: "Impact",
    priorityResponse: "Initial Response",
    priorityResolution: "Resolution SLA",

    priorityCritical: "Critical",
    priorityCriticalDesc:
      "Issues that directly affect entire business operations or core systems and require immediate action.",
    priorityCriticalImpact: "Stops main services",

    priorityHigh: "High",
    priorityHighDesc: "Issues that significantly impact most services or systems but do not stop entire operations.",
    priorityHighImpact: "Disrupts important services",

    priorityMedium: "Medium",
    priorityMediumDesc:
      "Issues or requests that impact a small portion of services or teams but do not affect main operations.",
    priorityMediumImpact: "Minor issues affecting some parts",

    priorityLow: "Low",
    priorityLowDesc:
      "Minor requests or issues that do not affect operations but need to be resolved for improvement or team convenience.",
    priorityLowImpact: "No direct impact on operations",

    // Categories
    categoryBugSystem: "System Bug",
    categoryBugSystemDesc: "Technical issues in applications or systems that cause malfunction.",

    categoryInfrastructure: "Infrastructure Issues",
    categoryInfrastructureDesc: "Issues with infrastructure such as servers, networks, or cloud services.",

    categoryDeployment: "Deployment Request",
    categoryDeploymentDesc: "Request to move new features or updates to specific environments.",

    categoryChangeRequest: "Change Request",
    categoryChangeRequestDesc: "Request to change configuration, CI/CD pipeline, or system environment.",

    categoryAccessRequest: "Access Request",
    categoryAccessRequestDesc: "Request for access rights to specific systems or permission adjustments.",

    categoryDatabase: "Database Issues",
    categoryDatabaseDesc: "Errors or disruptions in database.",

    categoryMonitoring: "Monitoring or Logging Request",
    categoryMonitoringDesc: "Request to add or adjust monitoring and logging.",

    categoryBackup: "Backup or Restore Request",
    categoryBackupDesc: "Request to create or restore data from backup.",

    categoryIntegration: "Integration Request",
    categoryIntegrationDesc: "Issues or requests related to system integration.",

    // Workflow
    workflowTitle: "Ticket Status Change Flow",
    workflowDesc: "Standard process of ticket status changes from start to finish",
    workflowNormal: "Normal Process",
    workflowNormalDesc: "(Normal process when issue is directly resolved)",
    workflowWithInfo: "Process with Additional Information",
    workflowWithInfoDesc: "(If additional information is needed before continuing)",
    workflowWithEscalation: "Process with Escalation",
    workflowWithEscalationDesc: "(If issue must be handled by more senior team)",
    workflowWithReopen: "Process with Reopening",
    workflowWithReopenDesc: "(If the same issue appears again)",

    businessProcessTitle: "Internal Ticket Management Business Process",
    businessProcessDesc: "Complete workflow from ticket creation to closure",

    // Common
    status: "Status",
    priority: "Priority",
    category: "Category",
    description: "Description",
    examples: "Examples",
    trigger: "Trigger",
    activities: "Activities",
    output: "Output",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.id
