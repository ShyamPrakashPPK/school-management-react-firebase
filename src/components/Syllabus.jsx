import React from 'react'
import SideNav from './SideNav'
import { Box } from '@mui/material'
import SyllabusTable from './pages/SyllabusTable';
import AddSyllabus from './pages/syllabus/AddSyllabus';


export default function Syllabus() {
    return (
        <>
            <div className='body' style={{ backgroundColor: 'rgb(44, 121, 173)', height: '100vh' }}>
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <Box sx={{ display: "flex" }}>
                            <SideNav />
                            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                <SyllabusTable />
                                <AddSyllabus/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    )
}
