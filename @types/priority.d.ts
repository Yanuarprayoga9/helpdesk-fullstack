export type PriorityType = {
    id: string;
    color: string;
    name: string;
}
export enum PriorityLevel {
    Critical = 'Critical', // Operasi berhenti
    High = 'High',         // Urgensi tinggi
    Medium = 'Medium',     // Tidak mendesak
    Low = 'Low'            // Perbaikan minor
}
