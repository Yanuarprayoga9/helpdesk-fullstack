import React from 'react'
import { ProjectEditDialog } from '../[projectId]/edit/components/dialog-fom'
type CellActionProps = {
    projectId:string
}
const CellAction:React.FC<CellActionProps>= ({projectId}) => {

  return (
    <div>
        <ProjectEditDialog projectId={projectId}  />
    </div>
  )
}

export default CellAction
