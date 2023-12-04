import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    TextField,
    Typography,
    MenuItem,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { db } from '../../../firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function AddSyllabus({ closeEvent }) {
    const [board, setBoard] = useState('');
    const [classA, setClassA] = useState('');
    const [subject, setSubject] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [topics, setTopics] = useState([]);
    const [description, setDescription] = useState('');
    const [subtopics, setSubtopics] = useState('');
    const [subtopicsDescription, setSubtopicsDescription] = useState('');
    const [syllabusData, setSyllabusData] = useState([]);

    const syllabusCollectionRef = collection(db, 'syllabus');

    useEffect(() => {
        getSyllabusData();
    }, []);

    const getSyllabusData = async () => {
        const data = await getDocs(syllabusCollectionRef);
        setSyllabusData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const handleBoardChange = (event) => {
        setBoard(event.target.value);
    };

    const handleClassChange = (event) => {
        setClassA(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleAcademicYearChange = (event) => {
        setAcademicYear(event.target.value);
    };

    const handleAddTopic = () => {
        if (subtopics || subtopicsDescription) {
            const newTopic = {
                subtopics,
                subtopicsDescription,
            };

            setTopics([...topics, newTopic]);
            setSubtopics('');
            setSubtopicsDescription('');
        }
    };

    const handleRemoveTopic = (index) => {
        const updatedTopics = [...topics];
        updatedTopics.splice(index, 1);
        setTopics(updatedTopics);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate if there are topics before submitting
        if (topics.length === 0) {
            Swal.fire('Please add at least one topic before submitting.');
            return;
        }

        await addDoc(syllabusCollectionRef, {
            board,
            class: classA,
            subject,
            academicYear,
            topics,
        });

        // Clear form fields
        setBoard('');
        setClassA('');
        setSubject('');
        setAcademicYear('');
        setTopics([]);
        setDescription('');
        setSubtopics('');
        setSubtopicsDescription('');

        // Refresh syllabus data
        getSyllabusData();
    };


    const flattenTopics = (topics) => {
        // Check if topics is an array or an object
        if (Array.isArray(topics)) {
            return topics;
        } else if (typeof topics === 'object' && topics !== null) {
            // If it's an object, convert it to an array of objects
            return Object.keys(topics).map((key) => topics[key]);
        } else {
            return [];
        }
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Syllabus
                </Typography>
           
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Board"
                                value={board}
                                onChange={handleBoardChange}
                                id="outlined-basic"
                                sx={{ width: '100%' }}
                                variant="outlined"
                            >
                                <MenuItem value="ICSE">ICSE</MenuItem>
                                <MenuItem value="CBSE">CBSE</MenuItem>
                                {/* Add more board options as needed */}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Class"
                                value={classA}
                                onChange={handleClassChange}
                                id="outlined-basic"
                                sx={{ width: '100%' }}
                                variant="outlined"
                            >
                                <MenuItem value="Class 1">Class 1</MenuItem>
                                <MenuItem value="Class 2">Class 2</MenuItem>
                                <MenuItem value="Class 2">Class 3</MenuItem>
                                <MenuItem value="Class 2">Class 4</MenuItem>
                                <MenuItem value="Class 2">Class 5</MenuItem>
                                <MenuItem value="Class 2">Class 6</MenuItem>
                                <MenuItem value="Class 2">Class 7</MenuItem>
                                <MenuItem value="Class 2">Class 8</MenuItem>
                                <MenuItem value="Class 2">Class 9</MenuItem>
                                <MenuItem value="Class 2">Class 10</MenuItem>

                                {/* Add more class here */}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Subject"
                                value={subject}
                                onChange={handleSubjectChange}
                                id="outlined-basic"
                                sx={{ width: '100%' }}
                                variant="outlined"
                            >
                                <MenuItem value="Math">Math</MenuItem>
                                <MenuItem value="Science">Science</MenuItem>
                                <MenuItem value="Science">English</MenuItem>
                                <MenuItem value="Science">Hindi</MenuItem>
                                <MenuItem value="Science">Social</MenuItem>


                                {/* Add more subject here*/}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                label="Academic Year"
                                value={academicYear}
                                onChange={handleAcademicYearChange}
                                id="outlined-basic"
                                sx={{ minWidth: '100%' }}
                                variant="outlined"
                            >
                                <MenuItem value="2022-2023">2022-2023</MenuItem>
                                <MenuItem value="2023-2024">2023-2024</MenuItem>
                                {/* Add more academic year here */}
                            </TextField>
                        </Grid>

                        {topics.map((topic, index) => (
                            <Grid item key={index} xs={12} sx={{ marginLeft: '1rem', marginTop: '1rem' }}>
                                <Chip
                                    label={`Topic ${index + 1}`}
                                    onDelete={() => handleRemoveTopic(index)}
                                />
                                <Typography sx={{ marginTop: '0.5rem' }}>Subtopics: {topic.subtopics}</Typography>
                                <Typography>Description: {topic.subtopicsDescription}</Typography>
                            </Grid>
                        ))}
                        <Grid item xs={12} sx={{ marginLeft: '1rem', marginTop: '1rem' }}>
                            <TextField
                                label="Topics"
                                value={subtopics}
                                onChange={(e) => setSubtopics(e.target.value)}
                                id="outlined-basic"
                                sx={{ minWidth: '100%' }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ marginLeft: '1rem' }}>
                            <TextField
                                label="Description"
                                value={subtopicsDescription}
                                onChange={(e) => setSubtopicsDescription(e.target.value)}
                                multiline
                                rows={4}
                                sx={{ minWidth: '100%' }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                onClick={handleAddTopic}
                                sx={{ marginTop: '1rem' }}
                            >
                                Add Topic
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="center">
                                <Button type="submit" variant="contained">
                                    Submit
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>

                <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Board</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Academic Year</TableCell>
                                <TableCell>Topics</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {syllabusData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.board}</TableCell>
                                    <TableCell>{item.class}</TableCell>
                                    <TableCell>{item.subject}</TableCell>
                                    <TableCell>{item.academicYear}</TableCell>
                                    <TableCell>
                                        {flattenTopics(item.topics).map((topic, index) => (
                                            <Chip
                                                key={index}
                                                label={`Topic ${index + 1}: ${topic.subtopics}`}
                                                sx={{ margin: '0.2rem' }}
                                            />
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </CardContent>
        </Card>
    );
}
