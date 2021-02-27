import React from 'react'

import { Input } from 'antd'

const { Search } = Input

export const FilterComponent = ({onSearch}) => {
    return (
        <div>
            <Search 
                placeholder="Search by student ID" 
                enterButton="Search" 
                size="large" 
                onSearch={onSearch}
            />
        </div>
    )
}