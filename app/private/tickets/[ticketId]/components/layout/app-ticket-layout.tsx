import React from 'react'

interface IAppTicketLayout {
    children:React.ReactNode
}
export const AppTicketLayout:React.FC<IAppTicketLayout> = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

