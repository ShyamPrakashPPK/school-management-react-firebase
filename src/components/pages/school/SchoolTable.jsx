import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Divider, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import Autocomplete from '@mui/material/Autocomplete';


import { AddCircle } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { db } from '../../../firebase-config'
import {
    collection,
    getDocs,
    addDocs,
    updateDocs,
    deleteDoc,
    doc
} from 'firebase/firestore'
import { Edit } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';

import Modal from '@mui/material/Modal';
import AddSchool from './AddSchool';
import { useAppStore } from '../../../appStore';
import EditSchool from './EditSchool';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function SchoolTable() {
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const setRows = useAppStore((state) => state.setRows);
    const rows = useAppStore((state) => state.rows);

    const [open, setOpen] = useState(false);
    const [formid, setFormid] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editopen, setEditOpen] = useState(false)

    const handleEditOpen = () => setEditOpen(true);

    const handleEditClose = () => setEditOpen(false);

    const schoolCollectionRef = collection(db, 'schools');

    useEffect(() => {
        getSchools();
    }, []);

    const getSchools = async () => {
        const data = await getDocs(schoolCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const editSchooldata = (id, schoolname, board, medium, classA)=> {
        const data = {
            id: id,
            name: schoolname,
            board: board,
            medium: medium,
            classA: classA
        };
        setFormid(data);
        handleEditOpen();
    };

    const deleteSchool = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes.. delete it!"
        }).then((result) => {
            if (result.value) {
                deleteApi(id)
            }
        })
    }

    const deleteApi = async (id) => {
        const schoolDoc = doc(db, "schools", id);
        await deleteDoc(schoolDoc);
        Swal.fire("Deleted!");
        getSchools();
    }

    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            setRows([]);
            getSchools();
        }
    }

    return (
        <>

            <div className='schooltable'>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddSchool closeEvent={handleClose} />
                    </Box>
                </Modal>

                <Modal
                    open={editopen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditSchool closeEvent={handleEditClose} fid={formid} />
                    </Box>
                </Modal>
            </div>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography
                    gutterBottom
                    variant='h5'
                    component='div'
                    sx={{ padding: '20px' }}>
                    School List
                </Typography>

                <Divider />

                <Box height={10} />
                <Stack direction="row" spacing={2} className='marginforsearch'>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(rows) => rows.schoolname || ""}
                        renderInput={(params) => <TextField {...params} label="Serach school" />}
                    />
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
                    <Button onClick={handleOpen} variant='contained' endIcon={<AddCircle />}>Add</Button>

                </Stack>



                <TableContainer sx={{ maxHeight: 440, width: '80vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow >
                                <TableCell align="left" style={{ minWidth: '100px' }}>
                                    School Name
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: '100px' }}>
                                    Board
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: '100px' }}>
                                    Medium
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: '100px' }}>
                                    Class
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: '100px' }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} >
                                            <TableCell key={row.id} align='left'>
                                                {row.schoolname}
                                            </TableCell>
                                            <TableCell key={row.id} align='left'>
                                                {row.board}
                                            </TableCell>
                                            <TableCell key={row.id} align='left'>
                                                {row.medium}
                                            </TableCell>
                                            <TableCell key={row.id} align='left'>
                                                {row.class}
                                            </TableCell>
                                            <TableCell key={row.id} align='left'>
                                                <Stack spacing={2} direction="row">
                                                    <Edit
                                                        style={{
                                                            fontSize: '20px',
                                                            color: 'blue',
                                                            cursor: 'pointer'
                                                        }}
                                                        className='point'
                                                        onClick={() =>
                                                            editSchooldata(row.id, row.schoolname, row.board, row.medium, row.class)
                                                        }
                                                    />
                                                    <Delete
                                                        style={{
                                                            fontSize: '20px',
                                                            color: 'darker',
                                                            cursor: 'pointer'
                                                        }}
                                                        className='point'
                                                        onClick={() =>
                                                            deleteSchool(row.id)
                                                        }
                                                    />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}