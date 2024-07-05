import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import {
    TextField, Grid, ButtonGroup, Button, Typography, Accordion, AccordionSummary, AccordionDetails,
    IconButton, InputAdornment, CircularProgress, Stack, Checkbox, FormControlLabel, Paper
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { FcNoIdea, FcOk, FcExpand } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";
import { mockTestService } from "../../services";
import { todayDate } from "../../Components/StaticData";
import { useImgUpload } from "@/app/hooks/auth/useImgUpload";

const AddMockEntryArea = forwardRef((props, ref) => {
    const snackRef = useRef();
    const [isPublished, setIsPublished] = useState(false);
    const [mockTestTitle, setMockTestTitle] = useState("");
    const [mockTestLink, setMockTestLink] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [testClass, setTestClass] = useState(null);
    const [testType, setTestType] = useState(null);
    const [duration, setDuration] = useState(null);
    const [fullDescription, setFullDescription] = useState("");
    const [totalSeat, setTotalSeat] = useState("");
    const [url, setUrl] = useState("");
    const [loadingDoc, setLoadingDoc] = useState(false);
    const [batch, setBatch] = useState([{ date: todayDate(), startTime: "", endTime: "", totalSeat: 100,oneBatchprice:40, filled: false }]);
    const [PAccordion, setPAccordion] = useState(false);

    const allClass = [{ label: "4", id: "4" }, { label: "5", id: "5" }];
    const allTestType = [{ label: "FSCE", id: "fsce" }, { label: "CSSE", id: "csse" }];
    const allDuration = [
        { label: "30 Minutes", id: "30minutes" },
        { label: "1 Hour", id: "1hour" },
        { label: "1 Hour 30 Minutes", id: "1hour30minutes" },
        { label: "2 Hours", id: "2hours" },
        { label: "2 Hours 30 Minutes", id: "2hours30minutes" },
        { label: "3 Hours", id: "3hours" }
    ];

    function convertToSlug(text) {
        return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    const onTitleChange = (e) => {
        setMockTestTitle(e.target.value);
        setMockTestLink(convertToSlug(e.target.value));
    };

    useEffect(() => {
        async function getOneData() {
            try {
                const res = await mockTestService.getOne(props.id);
                if (res.variant === "success") {
                    const {
                        isPublished, mockTestTitle, mockTestLink, shortDescription,
                        testClass, testType, duration, url, fullDescription, totalSeat, batch
                    } = res.data;
                    setIsPublished(isPublished);
                    setMockTestTitle(mockTestTitle);
                    setMockTestLink(mockTestLink);
                    setShortDescription(shortDescription);
                    setTestClass(testClass);
                    setTestType(testType);
                    setDuration(duration);
                    setUrl(url);
                    setFullDescription(fullDescription);
                    setTotalSeat(totalSeat);
                    setBatch(batch.map(b => ({
                        ...b,
                        date: b.date.split('T')[0] // Ensure the date is in the correct format
                    })));
                    setPAccordion(true);
                    snackRef.current.handleSnack(res);
                } else {
                    snackRef.current.handleSnack(res);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                snackRef.current.handleSnack({ fullDescription: "Failed to fetch data.", variant: "error" });
            }
        }
    
        if (props.id) {
            getOneData();
        }
    }, [props.id]);
    

    const handleClear = () => {
        props.setId("");
        setIsPublished(false);
        setMockTestTitle("");
        setMockTestLink("");
        setShortDescription("");
        setTestClass(null);
        setTestType(null);
        setDuration(null);
        setFullDescription("");
        setTotalSeat("");
        setUrl("");
        setBatch([{ date: todayDate(), startTime: "", endTime: "", totalSeat: 0,oneBatchprice:0, filled: false }]);
        setPAccordion(true);
    };

    useImperativeHandle(ref, () => ({
        handleSubmit: async () => {
            try {
                const myMockTestData = {
                    _id: props.id, mockTestTitle, mockTestLink, shortDescription,
                    testClass, testType, duration, fullDescription, totalSeat,
                    url, isPublished, batch
                };
                const response = await mockTestService.add(props.id, myMockTestData);
                if (response.variant === "success") {
                    snackRef.current.handleSnack(response);
                    handleClear();
                } else {
                    snackRef.current.handleSnack(response);
                }
            } catch (error) {
                console.error("Error submitting data:", error);
                snackRef.current.handleSnack({ fullDescription: "Failed to submit data.", variant: "error" });
            }
        },
        handleClear: () => handleClear()
    }));

    const imgUpload = async (e) => {
        setLoadingDoc(true);
        const url = await useImgUpload(e);
        if (url) {
            setUrl(url);
            setLoadingDoc(false);
        } else {
            snackRef.current.handleSnack({ message: "Image Not Selected", info: "warning" });
            setLoadingDoc(false);
        }
    };

    const handleDelete = async () => {
        try {
            const yes = window.confirm(`Do you really want to permanently delete ${mockTestTitle}?`);
            if (yes) {
                const response = await mockTestService.delete(`api/v1/publicMaster/mockTest/addMockTest/deleteOne/${props.id}`);
                if (response.variant === "success") {
                    snackRef.current.handleSnack(response);
                    handleClear();
                } else {
                    snackRef.current.handleSnack(response?.response?.data);
                }
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            snackRef.current.handleSnack({ fullDescription: "Failed to delete data.", variant: "error" });
        }
    };

    const deleteImage = () => setUrl("");

    const showImage = () => {
        if (url) {
            window.open(url, '_blank');
        }
    };
    const handleBatchChange = (index, field, value) => {
        const updatedBatch = [...batch];
        updatedBatch[index][field] = value;
        setBatch(updatedBatch);
    };
    
    const addBatchEntry = () => {
        setBatch([...batch, { date: todayDate(), startTime: "", endTime: "", totalSeat: 0,oneBatchprice:0, filled: false }]);
    };
    
    const removeBatchEntry = (index) => {
        const updatedBatch = batch.filter((_, i) => i !== index);
        setBatch(updatedBatch);
    };
    

    return (
        <main style={{ background: "#fff", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius: "10px", padding: 20 }}>
            <Grid sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between" }}>
                <Typography color="secondary" style={{ fontFamily: 'Courgette' }} align='center' variant='h6'>Create MockTest</Typography>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button startIcon={isPublished ? <FcOk /> : <FcNoIdea />} onClick={() => setIsPublished(!isPublished)}>{isPublished ? "Published" : "Un-Publish"}</Button>
                    <Button endIcon={<MdDeleteForever />} onClick={handleDelete} disabled={!props.id} color="error">Delete</Button>
                </ButtonGroup>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="MockTest Title"
                        value={mockTestTitle}
                        onChange={onTitleChange}
                        inputProps={{ minLength: "2", maxLength: "30" }}
                        placeholder='MockTest Title'
                        variant="standard"
                        required={true}
                    />
                    <Typography variant="subtitle2" gutterBottom>Link- {mockTestLink}</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    {!url ? (
                        <TextField
                            label="Thumbnail Image"
                            size="small"
                            required={true}
                            disabled={loadingDoc}
                            helperText="Only Image Files are allowed"
                            inputProps={{ accept: "image/*" }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        {loadingDoc && <CircularProgress size={25} />}{" "}
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => imgUpload(e.target.files[0])}
                            type="file"
                            focused
                            fullWidth
                        />
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="success" onClick={showImage}>Show Image</Button>
                            <Button variant="outlined" color="error" onClick={deleteImage}>Delete Image</Button>
                        </Stack>
                    )}
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        fullWidth
                        label="Short Description"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        inputProps={{ minLength: "2", maxLength: "100" }}
                        placeholder='Short Description'
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allClass}
                        value={testClass}
                        onChange={(e, v) => setTestClass(v)}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>{option.label}</li>
                        )}
                        renderInput={(params) => <TextField {...params} label="Class" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allTestType}
                        value={testType}
                        onChange={(e, v) => setTestType(v)}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>{option.label}</li>
                        )}
                        renderInput={(params) => <TextField {...params} label="Test Type" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allDuration}
                        value={duration}
                        onChange={(e, v) => setDuration(v)}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>{option.label}</li>
                        )}
                        renderInput={(params) => <TextField {...params} label="Duration" variant="standard" />}
                    />
                </Grid>
            </Grid>
            <div style={{ margin: '45px' }}></div>

            {batch.map((entry, index) => (
                <Paper variant="outlined" style={{ padding: '15px', marginBottom: '10px', borderRadius: '10px' }} key={index}>
                    <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>Batch {index + 1}</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Date"
                                type="date"
                                value={entry.date}
                                onChange={(e) => handleBatchChange(index, 'date', e.target.value)}
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField
                                label="Start Time"
                                type="time"
                                value={entry.startTime}
                                onChange={(e) => handleBatchChange(index, 'startTime', e.target.value)}
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField
                                label="End Time"
                                type="time"
                                value={entry.endTime}
                                onChange={(e) => handleBatchChange(index, 'endTime', e.target.value)}
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6} md={1}>
                            <TextField
                                label="Total Seats"
                                type="number"
                                value={entry.totalSeat}
                                onChange={(e) => handleBatchChange(index, 'totalSeat', e.target.value)}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <TextField
                                label="One Batch Price"
                                type="number"
                                value={entry.oneBatchprice}
                                onChange={(e) => handleBatchChange(index, 'oneBatchprice', e.target.value)}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={entry.filled}
                                        onChange={(e) => handleBatchChange(index, 'filled', e.target.checked)}
                                    />
                                }
                                label="Filled"
                            />
                        </Grid>
                        {batch.length > 1 && (
                            <Grid item xs={12} md={1}>
                                <Button variant="outlined" color="error" onClick={() => removeBatchEntry(index)}>Delete</Button>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            ))}

            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={addBatchEntry}
                    disabled={!batch[batch.length - 1].date || !batch[batch.length - 1].startTime || !batch[batch.length - 1].endTime || !batch[batch.length - 1].totalSeat}
                >
                    Add Batch Entry
                </Button>
            </Grid>

            <br /> <br />
            <Accordion expanded={PAccordion} onClick={() => setPAccordion(!PAccordion)}>
                <AccordionSummary
                    expandIcon={<IconButton><FcExpand /></IconButton>}
                    aria-controls="ProspectInformation"
                    id="ProspectInformation"
                >
                    <Typography>Additional Optional Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Full Description"
                                value={fullDescription}
                                inputProps={{ maxLength: "4000" }}
                                onChange={(e) => setFullDescription(e.target.value)}
                                placeholder="Write the Long Description about the MockTest"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <MySnackbar ref={snackRef} />
        </main>
    );
});

export default AddMockEntryArea;
