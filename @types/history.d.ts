export enum TicketHistoryActionEnum {
  ChangeStatus = "changeStatus",
  EditTicket = "editTicket",
  AddMember = "addMember",
}

export type HistoryType = {
  id: string;
  ticketId: string;
  changedById: string
  oldStatusId: string
  newStatusId: string
  action: TicketHistoryActionEnum
  changeNotes: string;
  changedAt: Date | string
}
export type HistoryShowType = {
  id: string;
  ticketId: string;
  changedByName: string
  oldStatus: string
  newStatus: string
  action: string
  changeNotes: string;
  changedAt: Date | string
}


export interface HistoriesShowReturn extends ActionResult {
  histories?: HistoryShowType[]
}

export interface HistoryReturn extends ActionResult {
  history?: HistoryType
}
export interface HistoriesReturn extends ActionResult {
  Histories?: HistoryType[]
}