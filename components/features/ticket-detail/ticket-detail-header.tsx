import React from 'react'
import {format} from "date-fns"
interface ITicketDetailHeader {
    title:string;
    id:string;
    createdBy:string;
    category:string;
    createdAt:Date;
}
export const TicketDetailHeader:React.FC<ITicketDetailHeader> = ({id,category,createdBy,title,createdAt}) => {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-semibold">  {title} #{id}</h1>
            <div className="mt-1 text-sm">
                <span className="text-muted-foreground"> {createdBy} started this conversation in {format(createdAt,"MMM d, yyyy")}</span>
                <span className="font-medium"> {category}</span>
            </div>
        </div>
    )
}

