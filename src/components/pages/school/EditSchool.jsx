import React, { useEffect, useState } from 'react'

import { Box, Button, Grid, IconButton, TextField } from '@mui/material'
import { Typography } from '@mui/material'
import Close from "@mui/icons-material/Close"
import Swal from 'sweetalert2';
import { db } from '../../../firebase-config'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore'
import { useAppStore } from '../../../appStore';


export default function EditSchool({ fid, closeEvent }) {

    const [schoolname, setSchoolName] = useState('');
    const [board, setBoard] = useState('');
    const [medium, setMedium] = useState('');
    const [classA, setClassA] = useState('');


    useEffect(() => {
        console.log(fid, "1111111111111111111111111111111");
        setSchoolName(fid.name)
        setBoard(fid.board)
        setMedium(fid.medium)
        setClassA(fid.classA)
    }, [])

    const setRows = useAppStore((state) => state.setRows);


    const schoolCollectionRef = collection(db, 'schools');


    const getSchools = async () => {
        const data = await getDocs(schoolCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }


    const handleNameChange = (event) => {
        setSchoolName(event.target.value)
    }

    const handleBoardChange = (event) => {
        setBoard(event.target.value)
    }
    const handleMediumChange = (event) => {
        setMedium(event.target.value)
    }

    const handleClassChange = (event) => {
        setClassA(event.target.value)
    }

    const editSchool = async () => {
        const schoolDoc = doc(db, "schools", fid.id)
        const newFields = {
            schoolname: schoolname,
            board: board,
            medium: medium,
            classA: classA
        };
        await updateDoc(schoolDoc, newFields);
        getSchools();
        closeEvent();
        Swal.fire("Submitted")
    }


    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit School
            </Typography>
            <IconButton
                style={{ position: "absolute", top: "0", right: "0" }}
                onClick={closeEvent}>
                <Close />
            </IconButton>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label='School Name' onChange={handleNameChange} value={schoolname} id="outlined-basic" sx={{ minWidth: "100%" }} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Board Name' onChange={handleBoardChange} value={board} id="outlined-basic" sx={{ minWidth: "100%" }} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Medium' onChange={handleMediumChange} value={medium} id="outlined-basic" sx={{ minWidth: "100%" }} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Class' onChange={handleClassChange} value={classA} id="outlined-basic" sx={{ minWidth: "100%" }} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button varient="contained" onClick={editSchool}>Submit</Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 4 }} />
        </>
    )
}
