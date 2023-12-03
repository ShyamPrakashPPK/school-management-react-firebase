import React from 'react'
import SideNav from './SideNav'
import { Box } from '@mui/material'

import SchoolTable from './pages/school/SchoolTable';


export default function Dashboard() {
    return (
        <>
            <main className='bodyy'>
                <Box sx={{ display: 'flex' }}>

                    <Box height={70}>
                        <Box sx={{ display: "flex" }}>
                            <SideNav />

                            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                                <SchoolTable />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </main>
        </>
    )
}
