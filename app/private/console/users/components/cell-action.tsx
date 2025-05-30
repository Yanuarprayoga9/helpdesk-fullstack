import React from 'react'
import { UserFormEdit } from './user-update-form'
import { UserDeleteForm } from './user-delete-form'
interface ICellAction {
  userId: string
}
const CellAction: React.FC<ICellAction> = ({ userId }) => {
  return (
    <div>
      <UserFormEdit userId={userId} />
      <UserDeleteForm userId={userId} />
    </div>
  )
}

export default CellAction
