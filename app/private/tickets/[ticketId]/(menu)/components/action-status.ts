export const getAvailableActions = (status: string) => {
  switch (status) {
    case 'New':
      return [{ label: 'Take Ticket', nextStatus: 'InProgress' }];
    case 'InProgress':
      return [
        { label: 'Put On Hold', nextStatus: 'OnHold' },
        { label: 'Mark as Resolve', nextStatus: 'Resolved' },
      ];
    case 'OnHold':
      return [{ label: 'Resume', nextStatus: 'InProgress' }];
    case 'Resolved':
      return [
        { label: 'Close Ticket', nextStatus: 'Closed' },
        { label: 'Reopen', nextStatus: 'Reopened' },
      ];
    case 'Closed':
      return [{ label: 'Reopen', nextStatus: 'Reopened' }];
    case 'Reopened':
      return [{ label: 'Resume', nextStatus: 'InProgress' }];
    default:
      return [];
  }
};
