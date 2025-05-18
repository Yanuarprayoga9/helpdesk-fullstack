import { SelectorsType } from '@/lib/utils';
import React from 'react'
import CategoriesMenu from './categories';
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
            <CategoriesMenu categoryOptions={categoryOptions}/>
        </div>
    )
}

export default AppSideFilter
