
export enum Category {
    BugSistem = 'Bug Sistem',
    GangguanInfrastruktur = 'Gangguan Infrastruktur',
    PermintaanDeployment = 'Permintaan Deployment',
    PermintaanPerubahan = 'Permintaan Perubahan'
}
export enum PriorityLevel {
    Critical = 'Critical', // Operasi berhenti
    High = 'High',         // Urgensi tinggi
    Medium = 'Medium',     // Tidak mendesak
    Low = 'Low'            // Perbaikan minor
}

export enum Role {
    Developer = 'Developer',
    DevOps = 'DevOps',
    Admin = 'Admin',
    Manager = 'Manager'
}
