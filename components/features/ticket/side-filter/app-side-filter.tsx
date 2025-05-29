import { SelectorsType } from '@/lib/utils';
import React from 'react'
import CategoriesMenu from './categories';
import StatusMenu from './status';
import MyTicketToggle from './my-ticket';
import AssignToMeToggle from './assign-to-me';
import PriotityMenu from './priority';
interface IAppSideFilter {
    // children: React.ReactNode;
    // userOptions: SelectorsType[]
    categoryOptions: SelectorsType[]
    // priorityOptions: SelectorsType[]
    // statusOptions: SelectorsType[]
    // projectOptions: SelectorsType[]
}
const AppSideFilter: React.FC<IAppSideFilter> = ({ categoryOptions }) => {

    return (
        <div>
            <CategoriesMenu categoryOptions={categoryOptions} />
            <StatusMenu />
            <PriotityMenu/>
            <MyTicketToggle />
            <AssignToMeToggle />
        </div>
    )
}

export default AppSideFilter
