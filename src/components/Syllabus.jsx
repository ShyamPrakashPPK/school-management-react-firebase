import React from 'react'
import SideNav from './SideNav'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import SyllabusTable from './pages/SyllabusTable';


export default function Syllabus() {
    return (
        <>

            <section className='body'>
                <Box sx={{ display: 'flex' }}>
                    <SideNav />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                        <SyllabusTable/>

                    </Box>
                </Box>
            </section>

        </>
    )
}
