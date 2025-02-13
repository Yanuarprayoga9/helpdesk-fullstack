export const ROLES = ['Developer', 'DevOps', 'Admin', 'Manager'] as const;
export type Role = (typeof ROLES)[number];

export const CATEGORIES = [
    'Bug Sistem',
    'Gangguan Infrastruktur',
    'Permintaan Deployment',
    'Permintaan Perubahan',
] as const;
export type Category = (typeof CATEGORIES)[number];

export const TICKET_STATUSES = [
    'Open',
    'InProgress',
    'Escalated',
    'Resolved',
    'Reopened',
    'Closed',
    'OnHold',
] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];
