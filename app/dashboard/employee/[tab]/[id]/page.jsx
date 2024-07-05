'use client';
import React, { forwardRef,useImperativeHandle,useContext } from 'react'
import { useState,useEffect,useRef} from 'react';
import MySnackbar from "../../../../Components/MySnackbar/MySnackbar";
import {Typography, Stepper,Step,StepLabel,StepContent, Button, Grid,TextField, Tooltip,Avatar, IconButton,Divider, FormControlLabel,Switch,Accordion,AccordionSummary, AccordionDetails,InputAdornment,CircularProgress} from '@mui/material/';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import {allStates,allGenders, allJobRole} from "../../../../Components/StaticData";
import { useImgUpload } from '@/app/hooks/auth/useImgUpload';
import { FcDeleteRow, FcExternal,FcExpand,FcApproval,FcSearch } from "react-icons/fc";
import { DataGrid } from '@mui/x-data-grid';
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { employeeService,prospectService } from "../../../../services";
import axios from 'axios';

const PersonalInfo = forwardRef((props, ref)=>{
    const snackRef = useRef();
    const [loadingImg, setLoadingImg]= useState(false);
    const [userImage, setImgUrl] = useState("")
    const [firstName, setFN] = useState("");
    const [lastName, setLN] = useState(""); 
    const [gender, setGender] = useState(null);
    const [dob, setDob] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [jobRole, setJobRole] = useState(null)
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [status, setStatus] = useState(null);
    const [salary, setSalary] = useState("");
    const [salaryTenure,setSalTenure] = useState(null)
    const [street, setStreet] = useState("");
    const [unit, setUnit] = useState("");
    const [zip, setZip] = useState("");
    const [loadingCity, setLoadingCity] = useState(false);
    const [city, setCity] = useState(null);
    const [allCity, setAllCity] = useState([]);
    const [stateName, setState] = useState(null);
    const [loginAllowed, setAllow] = useState(true);
    const [password, setPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [showCPas, setShowCPass] = useState(false);
    const [match, setMatch] = useState(true);
    const [building, setBuilding] = useState(null);
    const [reportingTo, setReportingTo] = useState(null);
    const [allBuildings, setAllBulding] = useState([]);
    const [allSenior, setAllSenior] = useState([]);
    const router = useRouter();
    
    const allStatus = [{label:"Fresh enquiry", id:"fresh"}, {label:"Inprogress", id:"Inprogress"},{label:"Hired", id:"Hired"},{label:"Discharged", id:"Discharged"},{label:"Blacklisted", id:"Blacklisted"}  ]
    
    useEffect(() => {
      async function getData(){
        if(props.id){
          let res = await employeeService.getEmployee("api/v1/employee/basic/getEmployee/getAll", props.id );
          if(res.variant === "success"){
            setImgUrl(res.data.userImage);
            setFN(res.data.firstName);
            setLN(res.data.lastName);
            setGender(res.data.gender);
            setDob(res.data.dob);
            setHireDate(res.data.hireDate);
            setJobRole(res.data.jobRole);
            setEmail(res.data.email);
            setMobile(res.data.mobile);
            setStatus(res.data.status);
            setSalary(res.data.salary);
            setSalTenure(res.data.salaryTenure); 
            setStreet(res.data.street);
            setUnit(res.data.unit);
            setZip(res.data.zip);
            setCity({city:res.data.city});
            setState(res.data.state);
            setAllow(res.data.loginAllowed);
            setPass(res.data.value);
            setConfirmPass(res.data.value);
            snackRef.current.handleSnack(res);
          }else snackRef.current.handleSnack(res);
        }
     }
     if(props.id){getData()}
    }, [props.id])

    useEffect(() => {
      async function getBuildingData(){
        if(building===null){
          let res = await prospectService.moveToResident("api/v1/main/seat/getSeat/get/building", "",);
          setAllBulding([{_id:"all",houseNo:"All",label:"All Buildings"},...res.data]);
        }
     }
     getBuildingData()
    }, [])

    useEffect(() => {
      async function getSenior(){
        if(jobRole){
          let res = await prospectService.getAll(`api/v1/employee/empLeave/getEmpLeave/dropDown/getByRole/${jobRole?.id}`, "",);
          if(res?.variant ==="success"){
            setAllSenior(res.data)
          }
        }
        }
    getSenior()
    }, [jobRole])
    
    

    async function getZIPData() {
      if(zip.length===5){
        setLoadingCity(true)
        await axios.get(`/api/public/zipToLocation?zipCode=${zip}`).then(res=>{
          setAllCity(res.data)
          let obj = allStates.find(o=>o.id ===res.data[0].state)
          setState(obj)
          setLoadingCity(false)
        }).catch(err=>{
          console.log(err);
          alert("Plesae enter correct ZIP code.");
          setZip("");
          setCity(null);
          setAllCity([]);
          setState(null)
          setLoadingCity(false)
        })
      }
    }
    const imgUpload= async (e)=>{
      setLoadingImg(true)
      let url = await useImgUpload(e);
      if(url){
        setImgUrl(url);
        setLoadingImg(false)
      } else {
        snackRef.current.handleSnack({message:"Employee Image Not Selected", info:"warning"}); 
        setLoadingImg(false)}
    }
    const checkMatch =()=>{
      if(password === confirmPass){
        setMatch(true)
      }else {
        setMatch(false)
      }
    }
    const handleClear = ()=>{
      props.setId("");
      setLoadingImg(false);
      setImgUrl("");
      setFN("");
      setLN("");
      setGender(null);
      setDob("");
      setHireDate("");
      setJobRole(null);
      setRole([]);
      setEmail("");
      setMobile("");
      setStatus(null);
      setSalary("");
      setSalTenure(null); 
      setStreet("");
      setUnit("");
      setZip("");
      setLoadingCity(false);
      setCity(null);
      setState(null);
      setAllow(true);
      setPass("");
      setShowPass(false);
      setConfirmPass("");
      setShowCPass(false);
      setMatch(true);
    }
    useImperativeHandle(ref, () => ({
      stepData: async () => {
        if(password === confirmPass){
          try {
            let data={userImage,firstName,lastName,gender,dob,hireDate,jobRole,email,mobile,status,salary,salaryTenure:salaryTenure ? salaryTenure.label : "", street,unit,zip,city: city ? city.city : "", state:stateName,loginAllowed,building,reportingTo, password}
            let response;
                response = await employeeService.saveEmployee("api/v1/employee/basic/addEmployee", props.id, data)
                if(response.variant === "success"){
                snackRef.current.handleSnack(response);
                router.push(`/dashboard/employee/1/${props.id}`)
                // props.handleNext()
                }else snackRef.current.handleSnack(response);            
             } catch (error) {
              console.log(error);
              snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.response.data.message, variant:"error"});
             } 
         }else {
           return snackRef.current.handleSnack({message:"Password Not Okay.", variant:"error"});
         }
     },
     handleClear: () => handleClear() 
 }));
  return <section>
  <Grid container spacing={2}>
      <Grid item xs={12} md={4}/>
      <Grid item xs={12} md={4} className='center'>
        {
        loadingImg ?  <CircularProgress /> :  <label htmlFor="employeeImg">
        <input type="file" id="employeeImg" style={{display:"none"}} onChange={(e) => imgUpload(e.target.files[0])}  accept="image/*"  />
        <Tooltip title="Upload Contact Photo" arrow>
        <Avatar alt={firstName} sx={{cursor: "pointer",width: 112, height: 112, border:"4px solid #d9fdd3"}} src={userImage}/>
        </Tooltip>
        </label>
        } 
      </Grid>

      <Grid item xs={12} md={4} className='center'> 
      <FormControlLabel checked={loginAllowed} control={<Switch onChange={e=>setAllow(!loginAllowed)} value={loginAllowed}/>} label={loginAllowed ? "Login Allowed" : "Login Disabled" }/>
      </Grid>

      <Grid item xs={12} md={2}>
      <TextField fullWidth value={firstName} onChange={e=>setFN(e.target.value)} label="First Name" placeholder='Employee First Name' variant="standard" />   
      </Grid>
      <Grid item xs={12} md={2}>
       <TextField fullWidth value={lastName} onChange={e=>setLN(e.target.value)} label="Last Name" placeholder='Employee Last Name' variant="standard" />   
      </Grid>
      <Grid item xs={12} md={2}>
      <Autocomplete
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={allGenders}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            );
          }}
          onChange={(e, v) => {
          setGender(v);
          }}
          value={gender}
          renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="Gender"/>}
          /> 
      </Grid>
      <Grid item xs={12} md={2}>
          <TextField fullWidth focused label="Date of Birth" value={dob} onChange={e=>setDob(e.target.value)} type='date' placeholder='Date of Birth' variant="standard" />
      </Grid>
      <Grid item xs={12} md={2}>
          <TextField fullWidth focused label="Hire Date" value={hireDate} onChange={e=>setHireDate(e.target.value)} type='date' placeholder='Hire Date' variant="standard" />
      </Grid>
      <Grid item xs={12} md={2}>
      <Autocomplete
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {option.label}
              </li>
            );
          }}
          options={allStatus}
          onChange={(e, v) => {
          setStatus(v);
          }}
          value={status}
          renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="Employee Status"/>}
          /> 
      </Grid>
      <Grid item xs={12} md={2}>
      <Autocomplete
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          options={allJobRole}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option?.id}>
                {option?.label}
              </li>
            );
          }}
          onChange={(e, v) => {
          setJobRole(v);
          }}
          value={jobRole}
          renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="Job Role"/>}
          /> 
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField fullWidth value={email} type='email' onChange={e=>setEmail(e.target.value)} helperText="Required to Login" label="Email Id" placeholder='Email Id' variant="standard" />   
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField fullWidth value={mobile} type='number' onChange={e=>setMobile(e.target.value)} helperText="Required to Login" label="Mobile No" placeholder='Cell phone Number' variant="standard" />   
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField fullWidth value={salary} type='number' onChange={e=>setSalary(e.target.value)} label="Salary ($)" placeholder='($) Salary' variant="standard" />   
      </Grid>
      <Grid item xs={12} md={2}>
      <Autocomplete
          isOptionEqualToValue={(option, value) => option?.label === value?.label}
          options={[{label:"Hourly"},{label:"Daily"},{label:"Weekly"},{label:"Monthly"},{label:"On Commission"}]}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option?.label}>
                {option?.label}
              </li>
            );
          }}
          onChange={(e, v) => {
            setSalTenure(v);
          }}
          value={salaryTenure}
          renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="Salary Tenure"/>}
          /> 
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField fullWidth label="Street Address" value={street} onChange={e=>setStreet(e.target.value)} placeholder='Street Address' variant="standard" />   
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField fullWidth label="Unit" value={unit} onChange={e=>setUnit(e.target.value)} placeholder='Unit' variant="standard" />   
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField fullWidth value={zip} onChange={e=> setZip(e.target.value)} onBlur={getZIPData} disabled={loadingCity} InputProps= {{
            endAdornment: (
            <InputAdornment position="end">
            {loadingCity ? <CircularProgress size={25}/> : zip?.length > 4 ? <IconButton size="medium" onClick={()=>getZIPData()}><FcSearch/></IconButton> : null}  
            </InputAdornment>
            ),
          }}  label="ZIP Code" type="number" placeholder="ZIP Code" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={2}>
        <Autocomplete
          id="all-City"
          getOptionLabel={(option) => option.city ?? option}
          // isOptionEqualToValue={(option, value) => option.city === city.city}
          options={allCity}
          disabled={allCity?.length===0}
          onChange={(e, v) => {
            setCity(v);
          }}
          value={city}
          renderInput={(params) => <TextField {...params} fullWidth helperText="Just type ZIP Code" variant="standard" label="City" placeholder="City"/>}
          />
      </Grid>
      <Grid item xs={12} md={2}>
      <Autocomplete
        id="allStates"
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option?.id}>
              {option?.label}
            </li>
          );
        }}
        options={allStates}
        onChange={(e, v) => {
          setState(v);
        }}
        value={stateName}
        disabled
        renderInput={(params) => <TextField {...params} variant="standard" helperText="Just type ZIP Code"  fullWidth label="State"/>}
        />
      </Grid>
     
  </Grid>
  <br />
  <Divider variant="inset"> <Typography variant='caption'>Allocate Building & Team</Typography></Divider>
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <Autocomplete
          isOptionEqualToValue={(option, value) => option?._id === value?._id}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option._id}>
                {option.label}
              </li>
            );
          }}
          groupBy={(option) => option.houseNo}
          options={allBuildings}
          onChange={(e, v) => {
            setBuilding(v)
          }}
          value={building}
          renderInput={(params) => <TextField {...params} variant="standard" label="Building Name"/>}
          /> 
    </Grid>
    <Grid item xs={12} md={6}>
      <Autocomplete
          isOptionEqualToValue={(option, value) => option?._id === value?._id}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option._id}>
                {option.label}
              </li>
            );
          }}
          // groupBy={(option) => option.houseNo}
          options={allSenior}
          onChange={(e, v) => {
            setReportingTo(v)
          }}
          value={reportingTo}
          renderInput={(params) => <TextField {...params} helperText="As per the Job Role" variant="standard" label="Reporting To Senior"/>}
          /> 
    </Grid>
  </Grid>
  <br />

  <br />
  <Divider variant="inset"> <Typography variant='caption'>User Name is your Email or Mobile No.</Typography> </Divider>
  <br />
      <Grid container spacing={2} sx={{display:"flex",justifyContent:"center"}}>
        <Grid item xs={12} md={3}>
        <TextField fullWidth value={password} type={showPass ? "text" : "password"} InputProps={{ endAdornment: (
          <InputAdornment onClick={()=>setShowPass(!showPass)} position="end">
          {showPass ? <MdVisibilityOff style={{fontSize:24}}/> : <MdVisibility style={{fontSize:24}} />}
          </InputAdornment>),}} onChange={e=>setPass(e.target.value)} label="Set Password" helperText="New Passward for Employee Login" placeholder="Password" variant="outlined" />
        </Grid>
    
        <Grid item xs={12} md={3}>
        <TextField fullWidth value={confirmPass} error={!match} onBlur={checkMatch} type={showCPas ? "text" : "password"} InputProps={{ endAdornment: (
          <InputAdornment onClick={()=>setShowCPass(!showCPas)} position="end">
          {showCPas ? <MdVisibilityOff style={{fontSize:24}}/> : <MdVisibility style={{fontSize:24}} />}
          </InputAdornment>),}} onChange={e=>setConfirmPass(e.target.value)} label="Confirm Password" helperText={match ? "" :"Password Not Matched"} placeholder="Confirm Password" variant="outlined" />
        </Grid>
      </Grid>
      <MySnackbar ref={snackRef} />
</section>
})
  

// Upload Docs 

const UploadDocs = forwardRef((props, ref)=>{
  const snackRef = useRef();
  const [id, setId] = useState("");
  const [documentName, setDocName] = useState("")
  const [documentUrl, setDocUrl] = useState("");
  const [expiryDate, setExpiryDate ] = useState("");
  const [loadingDoc, setLoadDoc] = useState(false);
  const [complianceRow, setRow]= useState([]);

  const complianceColumn = [
    {
      field: 'documentName',
      headerName: 'Document Name',
      width: 200,
    },
    {
      field: 'documentUrl',
      headerName: 'Document Link',
      width: 150,
      renderCell: props=> <Link href={`${props?.row?.documentUrl}`} target="_blank">Click Here  ➡ </Link>,
    },
    {
      field: 'expiryDate',
      headerName: 'Expiry Date',
      type: 'text',
      width: 150,
    },
    {
        field: 'date',
        headerName: 'Upload Date',
        sortable: false,
        width: 160,
      },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      sortable: false,
      renderCell: props=>  <IconButton onClick={()=>handleDelete(props?.row?._id, props?.row?.documentName)}> <FcDeleteRow/> </IconButton> ,
    },
  ];
  async function getData(){
    let res = await employeeService.getEmployee("api/v1/employee/document/getDocument/getAll", props.id);
    if(res.variant === "success"){
      setRow(res.data);
    }else snackRef.current.handleSnack(res);    
   }
  useEffect(() => {
   if(props.id){getData()}
  }, [props.id])

  const imgUpload= async (e)=>{
    setLoadDoc(true)
    let url = await useImgUpload(e);
    if(url){
      setDocUrl(url);
      setLoadDoc(false)
    } else {
      snackRef.current.handleSnack({message:"Employee Documents Not Selected", variant:"warning"}); 
      setLoadDoc(false)}
  }
  const handleSubmit = async ()=>{
    try {
      setLoadDoc(true)
      let data = {documentName,documentUrl,expiryDate, userId:props.id};
      let response;
        response = await employeeService.saveEmployee("api/v1/employee/document/addDocument", id, data);
        if(response.variant === "success"){
          setLoadDoc(false);
          handleClear();
          getData();
          snackRef.current.handleSnack(response);
        } else {
          setLoadDoc(false);
          snackRef.current.handleSnack(response?.response?.data);
        };            
       } catch (error) {
        setLoadDoc(false);
        console.log(error);
        snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.response.data.message, variant:"error"});
       } 
  }
  const handleClear = ()=>{
    setId("");
    setDocName("");
    setDocUrl("");
    setExpiryDate(""); 
  }
  const handleDelete = async (docId, documentName)=>{
    try {
      let yes = confirm(`Do you really want to Delete  - ${documentName} ?`)
      if(yes){
        let response = await employeeService.deleteDocument(docId);
        if(response.variant === "success"){
          handleClear();
          getData();
          snackRef.current.handleSnack(response);
        } else snackRef.current.handleSnack(response?.response?.data); 
      }
       } catch (error) {
        console.log(error);
        snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.response.data.message, variant:"error"});
       } 
  }
  useImperativeHandle(ref, () => ({
    stepData: () => handleSubmit(),
    handleClear: () => handleClear() 
}));


return <section>
  <br/>
<Grid container spacing={2}>
<Grid item xs={12} md={3}>
<TextField fullWidth value={documentName} onChange={e=>setDocName(e.target.value)} label="Document Name" placeholder='DL, Resume, Other...' variant="outlined" />
</Grid>
  <Grid item xs={12} md={3}>
    <TextField label="Upload Resume" disabled={loadingDoc} helperText="PDF and Image Files are allowed" inputProps={{ accept:"image/*, application/pdf" }}  InputProps={{
    endAdornment: <InputAdornment position="start">{loadingDoc ? <CircularProgress size={25}/> : documentUrl ? <FcApproval style={{fontSize:26}}/> : null  } </InputAdornment>,
   }} onChange={(e) => imgUpload(e.target.files[0])}  type="file" focused fullWidth/>
  </Grid>
  <Grid item xs={12} md={3}>
    <TextField fullWidth type="date" value={expiryDate} onChange={e=>setExpiryDate(e.target.value)} focused label="Expiry Date (If Any)" variant="standard" />               
    </Grid>
  <Grid item xs={12} md={3} sx={{display:"flex", justifyContent:"center"}}>
    <div>
    <LoadingButton variant="outlined" color="secondary" loading={loadingDoc && documentUrl} onClick={handleSubmit} startIcon={<FcExternal style={{fontSize:24}}/>}>Upload Document</LoadingButton>
    </div>
  </Grid>
</Grid>

<br/>   <br/>
<Grid display="flex" flexDirection="column" justifyContent="center">
<Divider> <Typography color="primary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>All Uploaded Documents</Typography> </Divider>
<br/>
<DataGrid
rows={complianceRow}
sx={{maxWidth:800,alignSelf:"center"}}
columns={complianceColumn}
getRowId={(row) => row._id}
initialState={{
  pagination: {
    paginationModel: {
      pageSize: 5,
    },
  },
}}
pageSizeOptions={[5]}

/>
</Grid>

<MySnackbar ref={snackRef} />
    <br/>
</section>
})


// Bank Info Step

const BankInfo = forwardRef((props, ref)=>{
    const snackRef = useRef();
    const [id, setId] = useState("");
    const [bankName, setBankName] = useState("");
    const [holderName, setHN] = useState("");
    const [accountNo, setAcNo] = useState("");
    const [Aba, setAba] = useState("");
    const [swift, setSwift] = useState("");
    const [branch, setBranch] = useState("");
    const [zelle, setZelle] = useState("");
    const [payPal, setPayPal] = useState("");
    const [googlePay, setGPay] = useState("");
    const [EAccordion, setEAccordion] = useState(true)
    const [eName, setEName]= useState("");
    const [eEmail, setEEmail] = useState("");
    const [eMobile, setEMobile] = useState("");
    const [eStreet, setEStreet] = useState("");
    const [eUnit, setEUnit] = useState("");
    const [eZip, setEZip] = useState("");
    const [loadingECity, setLoadECity] = useState(false);
    const [eCity, setECity] = useState("");
    const [eState, setEState] = useState(null);
    const [loading, setLoading] =useState(false)
  async function getData(){
    let res = await employeeService.getEmployee("api/v1/employee/profile/getProfile/getOne", props.id);
    if(res.variant === "success"){
      console.log(res)
    }else snackRef.current.handleSnack(res);    
   }
  useEffect(() => {
   if(props.id){getData()}
  }, [props.id])
  async function getZIPData(){
    if(eZip.length===5){
      setLoadECity(true)
      await axios.get(`/api/public/zipToLocation?zipCode=${eZip}`).then(res=>{
        setECity(res.data.city)
        let obj = allStates.find(o=>o.id ===res.data.state)
        setEState(obj)
        setLoadECity(false)
      }).catch(err=>{
        console.log(err);
        snackRef.current.handleSnack({message:"Plesae enter correct ZIP code.", variant:"error"});
        setEZip("");
        setECity("");
        setEState(null)
        setLoadECity(false)
      })
    }
    }

  const handleSubmit = async ()=>{
    try {
      setLoading(true)
      let data = {bankName,holderName,accountNo, Aba,swift,branch,zelle,payPal,googlePay,eName,eEmail,eMobile,eStreet,eUnit,eZip,eCity,eState };
      let response;
        response = await employeeService.saveEmployee("api/v1/employee/profile/addProfile", props.id, data);
        if(response.variant === "success"){
          setLoading(false);
          handleClear();
          getData();
          snackRef.current.handleSnack(response);
        } else {
          setLoading(false);
          snackRef.current.handleSnack(response?.response?.data);
        };            
       } catch (error) {
        setLoadDoc(false);
        console.log(error);
        snackRef.current.handleSnack({message:"Failed to fetch Data. " + error.response.data.message, variant:"error"});
       } 
  }
  const handleClear = ()=>{
    setId("");
    setBankName("");
    setHN("");
    setAcNo(""); 
    setAba("");
    setSwift("");
    setBranch("");
    setZelle("");
    setPayPal("");
    setGPay("");
    setEAccordion(true);
    setEName("");
    setEEmail("");
    setEMobile("");
    setEStreet("");
    setEUnit("");
    setEZip("");
    setECity("");
    setEState(null);
  }
  useImperativeHandle(ref, () => ({
    stepData: () => handleSubmit(),
    handleClear: () => handleClear() 
}));


return <section>
<Grid container spacing={2}>
  <Grid item xs={12} lg={5.5}>
  <Divider variant="fullWidth" flexItem> Bank Details</Divider> 
  <br/>
  <Accordion expanded={EAccordion}>
    <AccordionSummary
expandIcon={<IconButton onClick={()=>setEAccordion(!EAccordion)}> <FcExpand /> </IconButton> }
aria-controls="EmergencyContact"
id="EmergencyContact"
>
<Typography>Bank & Finance Details</Typography>

</AccordionSummary>
<AccordionDetails>
<Grid container spacing={2}>
      <Grid item xs={12} md={4}>
      <TextField fullWidth value={bankName} onChange={e=>setBankName(e.target.value)} label="Bank Name" helperText="Bank / Financial Company" placeholder="Bank Name" variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}>
      <TextField fullWidth value={holderName} onChange={e=>setHN(e.target.value)} label="A/c Holder Name" variant="standard" />
      </Grid>
      
      <Grid item xs={12} md={4}>
      <TextField fullWidth value={accountNo} onChange={e=>setAcNo(e.target.value)} label="Account Number" type='number' placeholder="A/c No." variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}>
      <TextField fullWidth value={Aba} onChange={e=>setAba(e.target.value)} label="ABA - ACH No."  placeholder="ABA - ACH No." variant="standard" />
      </Grid>
      <Grid item xs={12} md={4}>
      <TextField fullWidth value={swift} onChange={e=>setSwift(e.target.value)} label="Swift"  placeholder="Swift" variant="standard" />
      </Grid>
      <Grid item xs={12} md={4}>
      <TextField fullWidth value={branch} onChange={e=>setBranch(e.target.value)} label="Branch Address"  placeholder="Bank Branch" variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}>
      <TextField fullWidth value={zelle} onChange={e=>setZelle(e.target.value)} label="Zelle Id"  placeholder="Zelle" variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}> 
      <TextField fullWidth value={payPal} onChange={e=>setPayPal(e.target.value)} label="PayPal Id"  placeholder="PayPal Id" variant="standard" />
      </Grid>
      <Grid item xs={12} md={4}> 
      <TextField fullWidth value={googlePay} onChange={e=>setGPay(e.target.value)} label="Google Pay Id"  placeholder="Google Pay" variant="standard" />
      </Grid>
    </Grid>
</AccordionDetails>
    </Accordion>

  </Grid>
  <Divider variant="fullWidth" sx={{marginLeft:2}} flexItem orientation="vertical"/> 
  <Grid item xs={12} lg={5.5}>
  <Divider variant="fullWidth" flexItem> Emergency Contact</Divider> 
  <br/>
  <Accordion expanded={EAccordion}>
    <AccordionSummary
expandIcon={<IconButton onClick={()=>setEAccordion(!EAccordion)}> <FcExpand /> </IconButton> }
aria-controls="EmergencyContact"
id="EmergencyContact"
>
<Typography>Emergency Contact</Typography>

</AccordionSummary>
<AccordionDetails>
<Grid container spacing={2}>
      <Grid item xs={12} md={4}>
      <TextField fullWidth value={eName} onChange={e=>setEName(e.target.value)} label="Full Name" helperText="Emergency Contact" placeholder="Full Name" variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}>
      <TextField fullWidth value={eEmail} onChange={e=>setEEmail(e.target.value)} label="Email Id" variant="standard" />
      </Grid>
      
      <Grid item xs={12} md={4}>
      <TextField fullWidth value={eMobile} onChange={e=>setEMobile(e.target.value)} label="Mobile Number" placeholder="Mobile No." variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}>
      <TextField fullWidth value={eStreet} onChange={e=>setEStreet(e.target.value)} label="Street Address"  placeholder="Full Address" variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}>
      <TextField fullWidth value={eUnit} onChange={e=>setEUnit(e.target.value)} label="Unit"  placeholder="Unit" variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}>
      <TextField fullWidth value={eZip} onBlur={getZIPData} onChange={e=> setEZip(e.target.value)} disabled={loadingECity} InputProps= {{
    endAdornment: (
    <InputAdornment position="end">
    {loadingECity && <CircularProgress size={25}/>}  
    </InputAdornment>
    ),
    }}  label="ZIP Code" type="number"  placeholder="ZIP Code" variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}> 
      <TextField fullWidth value={eCity} onChange={e=>setECity(e.target.value)} label="City" helperText="Just type ZIP Code" disabled placeholder="City" variant="standard" />
      </Grid>

      <Grid item xs={12} md={4}>
          <Autocomplete
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={allStates}
              onChange={(e, v) => {
                setEState(v);
              }}
              value={eState}
              disabled
              renderInput={(params) => <TextField {...params} variant="standard" helperText="Just type ZIP Code"  fullWidth label="State"/>}
              />
    </Grid>
    </Grid>
  </AccordionDetails>
    </Accordion>
  </Grid>

</Grid>
<br />
<MySnackbar ref={snackRef} />
</section>
})


function EntryArea({params}) {
  const snackRef = useRef();
  const step1Ref = useRef();
  const step2Ref = useRef();
  const step3Ref = useRef();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if(params){
      setActiveStep(+params?.tab)
    }
  }, [params])
  
    const handleNext = () =>{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
    const steps = [
      {
        label: 'Personal Information',
        description: `Fill out the general information of employee as per the document.`,
        component: <PersonalInfo tab={+params?.tab} id={params ? params.id==="new" ? "": params.id : ""} ref={step1Ref} handleNext={()=>handleNext()}/>
      },
      {
        label: 'Upload Documents (Resume)',
        description: 'Covid-19 certificate, DL, Resume and Other Documents.',
        component: <UploadDocs tab={+params?.tab} id={params ? params.id==="new" ? "": params.id : ""} ref={step2Ref} handleNext={()=>handleNext()}/>
      },
      {
        label: 'Bank & Emergency Details',
        description: `Enter bank and Emergency details.`,
        component:<BankInfo id={params ? params.id :""} ref={step3Ref} handleNext={()=>handleNext()}/>
      },
    ];
  
  const handleSubmit = ()=>{
    if(activeStep===0){
       step1Ref.current.stepData()
    }else if(activeStep===1){
      handleNext();
      // step2Ref.current.stepData() 
    }else if (activeStep===2){
      step3Ref.current.stepData()
      console.log("Final Submit Calling")
    }
  }
  const handleClear =()=>{
    if(activeStep===0){
      step1Ref.current.handleClear() 
   }else if(activeStep===1){ 
     step2Ref.current.handleClear()
   }else if (activeStep===2){
    step3Ref.current.handleClear() 
     console.log("Final Clear Calling")
   }
  }

  // useImperativeHandle(ref, () => ({
  //      handleSubmit: ()=> handleSubmit(),
  //      handleClear: () => handleClear() 
  // }));

  return (
  <main style={{background:"#fff", borderRadius:"10px", padding:20}}> 
  <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>Add New Employee</Typography>
  {/* <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel optional={<Typography variant="body2">{step.description}</Typography>}>
           <Typography variant="subtitle1" color="primary">{step.label}</Typography>
          </StepLabel>
          <StepContent>
            {step.component}
              <div>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
              </div>
          </StepContent>
        </Step>
      ))}
    </Stepper> */}
  <MySnackbar ref={snackRef} />
</main>
  )
}

export default EntryArea;