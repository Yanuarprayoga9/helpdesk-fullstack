import React from 'react'
import { SearchFilters } from './search-filters'
import NewTicketButton from './new-ticket-button'
import { ActiveFilters } from './active-filters'

const AppTopFilter = () => {
    return (
        <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <SearchFilters />
                <NewTicketButton />
            </div>
            <ActiveFilters />
        </div>
    )
}

export default AppTopFilter
