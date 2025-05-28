
// export type RequestAssignmentType = {
//   id: string;
//   ticketId: string;
//   requestedById: string
//   status: string
//   notes: string;
//   requestedAt: Date | string
// }
export type RequestAssignmentShowType = {
  id: string;
  ticketId: string;
  requestedById: string
  requestedBy: string
  status: string
  notes: string;
  requestedAt: Date | string
}


export interface RequestAssignmentsShowTypeReturn extends ActionResult {
  RequestAssignments?: RequestAssignmentShowType[]
}

export interface RequestAssignmentShowTypeReturn extends ActionResult {
  RequestAssignment?: RequestAssignmentType
}
