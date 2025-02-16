export type TicketStatusChangeType = {
    id: string;
    ticketId: string;
    changedById: string;
    oldStatus: string;
    newStatus: string;
    changeNotes: string;
    changedAt: string;
    changedBy: string;
}
export enum TicketStatus {
    Open = 'Open',
    InProgress = 'InProgress',
    Escalated = 'Escalated',
    Resolved = 'Resolved',
    Reopened = 'Reopened',
    Closed = 'Closed',
    OnHold = 'OnHold'
}




export type StatusType = {
    id: string;
    color: string;
    name: string;
}
