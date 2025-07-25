import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { TextField, Grid, ButtonGroup, Button, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, InputAdornment, CircularProgress, Stack, Checkbox, FormControlLabel, FormControl, InputLabel, OutlinedInput, FilledInput, Switch, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { FcNoIdea, FcOk, FcExpand } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";
import { dashboardService, myCourseService } from "../../services";
import { useImgUpload } from "@/app/hooks/auth/useImgUpload";
import DateSelector from './dateSelector';
import MultiImageUpload from '@/app/Components/Common/MultiImageUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FiCopy } from "react-icons/fi";
import frontKey from "@/app/utils/frontKey";

const stripeKeys = frontKey.stripeKeys || (frontKey.default ? frontKey.default.stripeKeys : []);

const EntryArea = forwardRef((props, ref) => {
    const snackRef = useRef();
    const [isPublished, setIsPublished] = useState(false);
    const [allBatch, setAllBatch] = useState([{
        oneBatch: [''],
        hide: false,
        bookingFull: false
    }]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [courseLink, setCourseLink] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [oneClassPrice, setOneClassPrice] = useState("");
    const [discountOnFullClass, setDiscountOnFullClass] = useState("0");
    const [courseClass, setCourseClass] = useState(null);
    const [courseType, setCourseType] = useState(null);
    const [duration, setDuration] = useState(null);
    const [subject, setSubject] = useState(null);
    const [fullDescription, setFullDescription] = useState("");
    const [totalSeat, setTotalSeat] = useState("0");
    const [filledSeat, setFilledSeats] = useState("");
    const [showRemaining, setShowRemaining] = useState(false);
    const [imageUrls, setImageUrls] = useState([""]); // Start with one empty slot
    const [selectedUser, setSelectedUser] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [onlySelectedParent, setOnlySelectedParent] = useState(false);
    const [restrictOnTotalSeat, setRestrictOnTotalSeat] = useState(false);
    const [viewMode, setViewMode] = useState('editor'); // 'editor', 'html', or 'preview'
    const [restrictStartDateChange, setRestrictStartDateChange] = useState(false);
    const [forcefullBuyCourse, setForcefullBuyCourse] = useState(false);
    const [sortDate, setSortDate] = useState("");
    const [allowBackDateBuy, setAllowBackDateBuy] = useState(false);
    const [backDayCount, setBackDayCount] = useState("0");
    const [stopSkipSet, setStopSkipSet] = useState(false);
    const [allowWaitingList, setAllowWaitingList] = useState(false);
    const [stripeAccount, setStripeAccount] = useState(null);

    const getAllUsers = async () => {
        let res = await dashboardService.getAllUserForDropDown();
        if (res.variant === "success") {
            setAllUsers(res.data);
        } else {
            snackRef.current.handleSnack(res);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const [privateAccordion, setPrivateAccordion] = useState(false);
    const [descriptionAccordion, setDescriptionAccordion] = useState(false);
    const allYear = [
        { label: "Year 4", id: "4" },
        { label: "Year 5", id: "5" },
        { label: "Year 6", id: "6" },
        ];
    const allCourseType = [
        { label: "Full Course", id: "fullCourse" },
         { label: "Crash Course", id: "crashCourse" },
        ];
    const allSubject = [
        { label: "Maths", id: "maths" },
        { label: "English", id: "english" },      
        { label: "Other", id: "other" }
    ];
    const allDuration = [
        { label: "< 1 Month", id: "lessThan1Month" },
        { label: "1-3 Months", id: "1to3Months" },
        { label: "3-6 Months", id: "3to6Months" },
        { label: "6+ Months", id: "moreThan6Months" },
    ];
    
    const [loadingDoc, setLoadingDoc] = useState(false);
    function convertToSlug(text) {
        return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      }
    const onTitleChange = (e) => {
        setCourseTitle(e)
        let link = convertToSlug(e)
        setCourseLink(link)
    }
  
    useEffect(() => {
        async function getOneData() {
            try {
                let res = await myCourseService.getOne(props.id);
                if (res.variant === "success") {
                    const { _id, isPublished, allBatch, startTime,sortDate,
                        endTime, courseTitle, courseLink, shortDescription, oneClassPrice, discountOnFullClass,
                        courseClass, courseType, duration, subject, stripeAccount: stripeAccountData, imageUrls, fullDescription, totalSeat, filledSeat, showRemaining,
                        onlySelectedParent: selectedParent, selectedUsers, restrictOnTotalSeat: restrictSeat, restrictStartDateChange, forcefullBuyCourse, allowBackDateBuy: backDateBuy, backDayCount: days, stopSkipSet, allowWaitingList: waitingList } = res.data;
                    props.setId(_id);
                    setIsPublished(isPublished);
                    setAllBatch(allBatch || [{
                        oneBatch: [''],
                        hide: false,
                        bookingFull: false
                    }]);     
                    setSortDate(sortDate);          
                    setStartTime(startTime);               
                    setEndTime(endTime);   
                    setCourseTitle(courseTitle);
                    setCourseLink(courseLink);
                    setShortDescription(shortDescription);
                    setOneClassPrice(oneClassPrice);
                    setDiscountOnFullClass(discountOnFullClass);
                    setCourseClass(courseClass);
                    setCourseType(courseType);
                    setDuration(duration);
                    setSubject(subject);
                    setStripeAccount(stripeAccountData || null);
                    setImageUrls(imageUrls?.length ? imageUrls : [""]);
                    setFullDescription(fullDescription);
                    setTotalSeat(totalSeat);
                    setFilledSeats(filledSeat);
                    setShowRemaining(showRemaining);
                    setPrivateAccordion(true);
                    setOnlySelectedParent(selectedParent || false);
                    setSelectedUser(selectedUsers || []);
                    setRestrictOnTotalSeat(restrictSeat || false);
                    setRestrictStartDateChange(restrictStartDateChange || false);
                    setForcefullBuyCourse(forcefullBuyCourse || false);
                    setAllowBackDateBuy(backDateBuy || false);
                    setBackDayCount(days || "0");
                    setStopSkipSet(stopSkipSet || false);
                    setAllowWaitingList(waitingList || false);
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
        if (props.id || courseTitle || shortDescription || imageUrls.some(url => url !== "")) {
            let yes = window.confirm("Are you sure you want to clear all fields? This will reset the form.");
            if (!yes) return;
        }
        props.setId("");
        setIsPublished(false);
        setAllBatch([{
            oneBatch: [''],
            hide: false,
            bookingFull: false
        }]);
        setSortDate("");
        setStartTime("");
        setEndTime("");
        setCourseTitle("");
        setCourseLink("");
        setShortDescription("");
        setOneClassPrice("");
        setDiscountOnFullClass("0");
        setCourseClass(null);
        setCourseType(null);
        setDuration(null);
        setSubject(null);
        setFullDescription("");
        setTotalSeat("0");
        setFilledSeats("");
        setShowRemaining(false);
        setImageUrls([""]);
        setPrivateAccordion(true);
        setSelectedUser([]);
        setOnlySelectedParent(false);
        setRestrictOnTotalSeat(false);
        setRestrictStartDateChange(false);
        setForcefullBuyCourse(false);
        setAllowBackDateBuy(false);
        setBackDayCount("0");
        setStopSkipSet(false);
        setAllowWaitingList(false);
        setStripeAccount(null);
    };
    

    useImperativeHandle(ref, () => ({
        handleSubmit: async () => {
            try {
                let myCourseData = {
                    _id: props.id,
                    allBatch,
                    sortDate,  // Remove the override, use the user-set date
                    startTime,
                    endTime,
                    courseTitle,
                    courseLink,
                    shortDescription,
                    oneClassPrice,
                    discountOnFullClass,
                    courseClass,
                    courseType,
                    duration,
                    subject,
                    stripeAccount,
                    fullDescription,
                    totalSeat,
                    restrictOnTotalSeat,
                    filledSeat,
                    showRemaining,
                    imageUrls,
                    isPublished,
                    onlySelectedParent,
                    selectedUsers: selectedUser, // Add selected users to the submission
                    restrictStartDateChange,
                    forcefullBuyCourse,
                    allowBackDateBuy,
                    backDayCount,
                    stopSkipSet,
                    allowWaitingList,
                };
                let response = await myCourseService.add(props.id, myCourseData);
                              
                if (response.variant === "success") {
                    snackRef.current.handleSnack(response);
                    handleClear();
                    // Call the onSaveSuccess callback after successful save
                    if (props.onSaveSuccess) {
                        props.onSaveSuccess();
                    }
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


    const handleDelete = async () => {
        try {
            let courseDisplayName = courseTitle || 'this course'; // Fallback if title is empty
            let yes = window.confirm(`Are you sure you want to permanently delete "${courseDisplayName}"?\n\nThis action cannot be undone.`);
            if (yes) {
                let response = await myCourseService.deleteClass(`api/v1/publicMaster/course/addCourse/deleteOne/${props.id}`);
                if (response.variant === "success") {
                    snackRef.current.handleSnack(response);
                    handleClear();
                    // Call the onSaveSuccess callback after successful deletion
                    if (props.onSaveSuccess) {
                        props.onSaveSuccess();
                    }
                } else {
                    snackRef.current.handleSnack(response?.response?.data);
                }
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            snackRef.current.handleSnack({ fullDescription: "Failed to delete data.", variant: "error" });
        }
    };



    // Replace the findUserDetails function
    const findUserDetails = (userId) => {
        const user = allUsers.find(user => user._id === userId);
        return user || { 
            firstName: 'User',
            lastName: 'not found', 
            email: 'No email', 
            mobile: 'No mobile',
            _id: userId 
        };
    };

    // Replace the renderUserSelect function
    const renderUserSelect = () => {
        if (!onlySelectedParent) return null;

        // Sort users by firstName
        const sortedUsers = [...allUsers].sort((a, b) => {
            const nameA = (a.firstName || '').toLowerCase();
            const nameB = (b.firstName || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });

        return (
            <Grid item xs={12}>
                <Autocomplete
                    multiple
                    id="user-select"
                    options={sortedUsers}
                    value={selectedUser.map(userId => findUserDetails(userId))
                        .sort((a, b) => (a.firstName || '').localeCompare(b.firstName || ''))}
                    onChange={(event, newValue) => {
                        setSelectedUser(newValue.map(user => user._id));
                    }}
                    getOptionLabel={(option) => {
                        const childrenNames = option.children?.map(child => child.childName).join(', ') || '';
                        return `${option.firstName || ''} ${option.lastName || ''} (${option.email || ''}) ${childrenNames ? `[Children: ${childrenNames}]` : ''}`;
                    }}
                    disableCloseOnSelect
                    filterOptions={(options, { inputValue }) => {
                        const searchTerms = inputValue.toLowerCase().split(' ');
                        return options.filter(option => 
                            searchTerms.every(term =>
                                option.firstName?.toLowerCase().includes(term) ||
                                option.lastName?.toLowerCase().includes(term) ||
                                option.email?.toLowerCase().includes(term) ||
                                option.mobile?.toLowerCase().includes(term) ||
                                // Add filter by children names
                                option.children?.some(child => 
                                    child.childName?.toLowerCase().includes(term)
                                )
                            )
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Select Users"
                            placeholder="Search by name, email, mobile or child name"
                        />
                    )}
                    renderOption={(props, option) => {
                        const isSelected = selectedUser.includes(option._id);
                        return (
                            <li {...props} key={option._id}>
                                <Checkbox
                                    checked={isSelected}
                                    style={{ marginRight: 8 }}
                                />
                                <div>
                                    <Typography>
                                        {option.firstName} {option.lastName}
                                        <Typography component="span" color="textSecondary" sx={{ ml: 1 }}>
                                            ({option.mobile}) • {option.email}
                                        </Typography>
                                    </Typography>
                                    {option.children && option.children.length > 0 && (
                                        <Typography variant="body2" color="primary" sx={{ ml: 3 }}>
                                            Children: {option.children.map(child => child.childName).join(', ')}
                                        </Typography>
                                    )}
                                </div>
                            </li>
                        );
                    }}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                />
            </Grid>
        );
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'color', 'background',
        'align',
        'link', 'image'
    ];

    const handleCopy = () => {
        // Prepend "Copy of " to the course title
        setCourseTitle(`Copy of ${courseTitle}`);
        // Update the course link based on new title
        setCourseLink(convertToSlug(`Copy of ${courseTitle}`));
        // Reset the sortDate to current date
        setSortDate("");
        // Remove the _id by setting it to empty
        props.setId("");
        // Show success message
        snackRef.current.handleSnack({
            message: "Course copied! You can now save this as a new course.",
            variant: "success"
        });
    };

    /* -----------------------------
       Stripe Account dropdown
    ------------------------------*/

    const renderStripeAccountSelect = () => (
        <Grid item xs={12} md={3}>
            <Autocomplete
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                options={stripeKeys}
                value={stripeAccount}
                onChange={(e, v) => setStripeAccount(v)}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>{option.label}</li>
                )}
                renderInput={(params) => <TextField {...params} label="Stripe Account" variant="standard" />}
            />
        </Grid>
    );

    return (
        <main style={{ background: "#fff", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius: "10px", padding: 20 }}>
            <Grid sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between" }}>
                <Typography color="secondary" style={{ fontFamily: 'Courgette' }} align='center' variant='h6'>Create Course</Typography>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button startIcon={isPublished ? <FcOk /> : <FcNoIdea />} onClick={() => setIsPublished(!isPublished)}>{isPublished ? "Published" : "Un-Publish"}</Button>
                    {props.id && (
                        <>
                            <Button 
                                startIcon={<FiCopy />} 
                                onClick={handleCopy} 
                                color="primary"
                            >
                                Copy Course
                            </Button>
                            <Button 
                                endIcon={<MdDeleteForever />} 
                                onClick={handleDelete} 
                                color="error"
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </ButtonGroup>
            </Grid>
            <Grid container spacing={2} style={{marginBottom:"20px"}}>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth label="Course Title" value={courseTitle} onChange={(e) => onTitleChange(e.target.value)} inputProps={{ minLength: "2", maxLength: "50" }} placeholder='Course Title' variant="standard" />
                    <Typography variant="subtitle2" gutterBottom>
                    Link- {courseLink}
                    </Typography>                    
                </Grid>
                
                {/* Replace the Typography with an editable DateTime field */}
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        label="Sort Date"
                        type="datetime-local"
                        value={sortDate ? new Date(sortDate).toISOString().slice(0, 16) : ''} // Better date handling
                        onChange={(e) => {
                            const date = e.target.value ? new Date(e.target.value).toISOString() : '';
                            setSortDate(date);
                        }}
                        variant="standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                       {/* Stripe Account Selection */}
                       {renderStripeAccountSelect()}
      
                <Grid item xs={12} md={12}>
                    <MultiImageUpload
                        images={imageUrls}
                        onImagesChange={setImageUrls}
                        uploadFunction={useImgUpload}
                        maxImages={5}
                        required={true}
                        title="Thumbnail Images"
                        helperText="Drag images to reorder. First image will be used as cover."
                    />
                </Grid>
        <Grid item xs={12} md={2}>
                    <TextField focused type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} fullWidth label="Start Time :" variant="standard" />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField focused type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} fullWidth label="End Time :" variant="standard" />
                </Grid>
                  <Grid item xs={12} md={2}>
                <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">One Class Price</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">£</InputAdornment>}
            label="oneClassPrice"
            type='number'
            value={oneClassPrice} 
                    onChange={(e) => setOneClassPrice(e.target.value)} 
                    inputProps={{ minLength: "1", maxLength: "5" }} 
                    placeholder='Enter one class price' 
          />
        </FormControl>
            
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Short Description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} inputProps={{ minLength: "2", maxLength: "100" }} placeholder='Short Description' variant="standard" />
                </Grid>
              
                {/* <Grid item xs={12} md={3}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Discount On Full Course</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">£</InputAdornment>}
            type='number'
            value={discountOnFullClass} 
                    onChange={(e) => setDiscountOnFullClass(e.target.value)} 
                    inputProps={{ minLength: "1", maxLength: "5" }} 
                    placeholder='Enter Discount Price' 
          />
        </FormControl>
                </Grid> */}
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allYear}
                        value={courseClass}
                        onChange={(e, v) => {
                            setCourseClass(v);
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.label}
                                </li>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Course" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allCourseType}
                        value={courseType}
                        onChange={(e, v) => {
                            setCourseType(v);
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.label}
                                </li>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Course Type" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allDuration}
                        value={duration}
                        onChange={(e, v) => {
                            setDuration(v);
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.label}
                                </li>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Duration" variant="standard" />}
                    />
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allSubject}
                        value={subject}
                        onChange={(e, v) => {
                            setSubject(v);
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.label}
                                </li>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Subject" variant="standard" />}
                    />
                </Grid>
                
         
                
                <br/>
                
         
            </Grid>
            <Accordion expanded={privateAccordion} style={{marginBottom:"30px"}}>
                <AccordionSummary
                    expandIcon={<IconButton > <FcExpand /> </IconButton>}
                    aria-controls="PrivateInformation"
                    id="PrivateInformation"
                    onClick={() => setPrivateAccordion(!privateAccordion)}
                >
                    <Typography>Make it Private or Public</Typography>
                </AccordionSummary>
                <AccordionDetails>
         <Grid container spacing={2}>
        
                <Grid item xs={12} md={3}>
                     <FormControlLabel control={
                           <Checkbox
                           checked={restrictStartDateChange}
                           onChange={() => setRestrictStartDateChange(!restrictStartDateChange)}
                           inputProps={{ 'aria-label': 'controlled' }}
                         />               
                     } label={`Restrict Start Date Change`} />
                  
                </Grid>
                <Grid item xs={12} md={3}>
                     <FormControlLabel control={
                           <Checkbox
                           checked={forcefullBuyCourse}
                           onChange={() => setForcefullBuyCourse(!forcefullBuyCourse)}
                           inputProps={{ 'aria-label': 'controlled' }}
                         />               
                     } label={`Force Full Buy Course`} />
                  
                </Grid>
                <Grid item xs={12} md={4}>
                     <FormControlLabel control={
                           <Checkbox
                           checked={stopSkipSet}
                           onChange={() => setStopSkipSet(!stopSkipSet)}
                           inputProps={{ 'aria-label': 'controlled' }}
                         />               
                     } label={`Force Continuous Set Buy`} />
                  
                </Grid>
                <Grid item xs={12} md={4}>
                     <FormControlLabel control={
                           <Checkbox
                           checked={allowWaitingList}
                           onChange={() => setAllowWaitingList(!allowWaitingList)}
                           inputProps={{ 'aria-label': 'controlled' }}
                         />               
                     } label={`Allow Waiting List`} />
                  
                </Grid>
                <Grid item xs={0} md={2}></Grid>
{/* make a line here */}
    {/* <div style={{borderBottom: '1px solid #000', width: '100%'}}></div> */}
                <Grid item xs={12} md={4}>
                     <FormControlLabel control={
                           <Checkbox
                           checked={allowBackDateBuy}
                           onChange={() => setAllowBackDateBuy(!allowBackDateBuy)}
                           inputProps={{ 'aria-label': 'controlled' }}
                         />               
                     } label={`Allow Back Date Buy`} />
                  
                </Grid>
                <Grid item xs={12} md={8}>
                    <TextField 
                        fullWidth
                        label="Back Days" 
                        type="number"
                        value={backDayCount} 
                        onChange={(e) => {
                            const value = Math.max(0, parseInt(e.target.value) || 0);
                            setBackDayCount(value.toString());
                        }} 
                        inputProps={{ min: "0", step: "1" }}
                        variant="outlined" 
                    />
                </Grid>                     
                <Grid item xs={12} md={4}>
                     <FormControlLabel control={
                           <Checkbox
                           checked={restrictOnTotalSeat}
                           onChange={() => setRestrictOnTotalSeat(!restrictOnTotalSeat)}
                           inputProps={{ 'aria-label': 'controlled' }}
                         />               
                     } label={`Restrict On Total-Seat`} />
                  
                </Grid>
                <Grid item xs={12} md={8}>
                    <TextField 
                        fullWidth
                        label="Total Seat" 
                        type="number"
                        value={totalSeat} 
                        onChange={(e) => {
                            // Ensure value is never less than 0
                            const value = Math.max(0, parseInt(e.target.value) || 0);
                            setTotalSeat(value.toString());
                        }}
                        inputProps={{ 
                            min: "0",
                            step: "1"
                        }} 
                        placeholder='Total Seat'
                        variant="outlined"
                    />
                </Grid>                     
                <Grid item xs={12} md={4}>
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <FormControlLabel control={
                             <Checkbox
                             checked={onlySelectedParent}
                             onChange={() => setOnlySelectedParent(!onlySelectedParent)}
                             inputProps={{ 'aria-label': 'controlled' }}
                           />               
                       } label={`Only Selected Parent `} />
                       {onlySelectedParent && (
                         <Typography variant="caption" color="primary" sx={{ ml: 1, fontWeight: 600 }}>
                           + {selectedUser.length}
                         </Typography>
                       )}
                     </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                {renderUserSelect()}
                </Grid>                     
         </Grid>
       
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={descriptionAccordion} style={{marginBottom:"30px"}}>
                <AccordionSummary
                    expandIcon={<IconButton > <FcExpand /> </IconButton>}
                    aria-controls="DescriptionInformation"
                    id="DescriptionInformation"
                    onClick={() => setDescriptionAccordion(!descriptionAccordion)}
                >
                    <Typography>Long Rich Text Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    value={viewMode}
                                    onChange={(e) => setViewMode(e.target.value)}
                                >
                                    <FormControlLabel 
                                        value="editor" 
                                        control={<Radio />} 
                                        label="Editor" 
                                    />
                                    <FormControlLabel 
                                        value="html" 
                                        control={<Radio />} 
                                        label="HTML" 
                                    />
                                    <FormControlLabel 
                                        value="preview" 
                                        control={<Radio />} 
                                        label="Preview" 
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {viewMode === 'editor' && (
                                <div style={{ backgroundColor: '#f8f9fa' }}>
                                    <ReactQuill
                                        theme="snow"
                                        value={fullDescription}
                                        onChange={setFullDescription}
                                        modules={modules}
                                        formats={formats}
                                        style={{ 
                                            height: '300px', 
                                            marginBottom: '50px',
                                            backgroundColor: '#fff'
                                        }}
                                        placeholder="Write the Long Description about the courses..."
                                    />
                                </div>
                            )}
                            {viewMode === 'html' && (
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={12}
                                    value={fullDescription}
                                    onChange={(e) => setFullDescription(e.target.value)}
                                    variant="outlined"
                                    InputProps={{
                                        style: { 
                                            fontFamily: 'monospace',
                                            backgroundColor: '#282c34',
                                            color: '#abb2bf',
                                        }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#3e4451',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#528bff',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#528bff',
                                            },
                                        },
                                    }}
                                />
                            )}
                            {viewMode === 'preview' && (
                                <div 
                                    style={{ 
                                        border: '1px solid #ddd', 
                                        borderRadius: '4px', 
                                        padding: '16px',
                                        minHeight: '300px',
                                        backgroundColor: '#fff'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: fullDescription }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <DateSelector allBatch={allBatch} setAllBatch={setAllBatch} />
            <br/> <br/>
         
            <MySnackbar ref={snackRef} />
        </main>
    );
});

export default EntryArea;
