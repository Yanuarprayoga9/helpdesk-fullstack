import React from 'react'
import { SidebarContent } from '../ui/sidebar'
import { SearchComponent } from '../search'

const SidebarSearchComponent = () => {
    return (
        <SidebarContent className="max-w-full my-4 ">
            <SearchComponent />
        </SidebarContent>
    )
}

export default SidebarSearchComponent
