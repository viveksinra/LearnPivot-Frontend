'use client';
import "../../payment/paymentStyle.css";
import React,{useEffect, useState, useRef} from 'react';
import {allStates,allGenders} from "../../../Components/StaticData";
import {Grid,TextField,Typography,InputAdornment,CircularProgress, Button,Input ,Avatar,List,ListItem,ListItemAvatar,ListItemText,ListItemButton,TablePagination, Divider,Tooltip, Chip,Collapse} from '@mui/material/';
import {todayDate} from "../../../Components/StaticData";
import Autocomplete from '@mui/material/Autocomplete';
import { FcFullTrash,FcSearch } from "react-icons/fc";
import { MdDoneAll,MdClearAll } from "react-icons/md";
import { useImgUpload } from '@/app/hooks/auth/useImgUpload'; 
import { ledgerService } from "../../../services/";
import NoResult from "@/app/Components/NoResult/NoResult";
import MySnackbar from "../../../Components/MySnackbar/MySnackbar";


function Ledger() {
  const [_id, setId] = useState("");
  const [createDate, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg]= useState(false);
  const [ledgerImage, setImgUrl] = useState("");
  const [voucher, setVoucher] = useState("");
  const [cb, setCb] = useState("");
  const [ledger, setLedger]= useState("");
  const [group, setGroup] = useState(null);
  const [openingBal, setOB] = useState("");
  const [isDr,setIsDr]= useState(true);
  const [gender, setGender] = useState(null);
  const [street, setStreet] = useState("");
  const [unit, setUnit] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [loadingCity, setLoadingCity] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState(null);
  const [remark, setRemark] = useState("");
  const [more, setMore] = useState(true);
  const [url, setDocUrl]= useState("");
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [bankName, setBankName] = useState("");
  const [holderName,setHN] = useState("");
  const [accountNo,setAcNo]= useState("");
  const [Aba, setAba] = useState("");
  const [swift, setSwift] = useState("");
  const [branch, setBranch] = useState("");

  const snackRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [totalCount,setTotalCount] = useState(0);
  const [allGroups, setAllGroups] = useState([]);
  const [result,setResult] = useState([]);
 
  const getResult = async()=>{
    setLoading(true)
    let baseUrl = `api/v1/account/ledger/getLedger/getDataWithPage/${rowsPerPage}/${page}/${searchText}`;
    let res = await ledgerService.getLedger(baseUrl);
    if(res.variant === "success"){
        setLoading(false);
        setResult(res.data);      
        setTotalCount(res.totalCount);
     }else {snackRef.current.handleSnack(res);setLoading(false); console.log(res)};   
  }

  useEffect(() => {
    getResult()
    return () => {
      setResult([])
    }
  }, [searchText,page,rowsPerPage,_id])
  
  useEffect(() => {
    // Getting all the Groups
    async function getData(){ 
      let res = await ledgerService.getLedger("api/v1/account/group/getGroup/getAll");
      if(res.variant === "success"){
        setAllGroups(res.data)
      }else {snackRef.current.handleSnack(res); console.log(res)};    
     }
     getData()
   }, [])
  const imgUpload= async (e)=>{
    setLoadingImg(true)
    let url = await useImgUpload(e);
    if(url){
      setImgUrl(url);
      setLoadingImg(false)
    } else {
      snackRef.current.handleSnack({message:"Image Not Selected", info:"warning"}); 
      setLoadingImg(false)}
  }
  useEffect(() => {
    setDate(todayDate()) 
  }, [])

  const handleClear = (d) =>{
    setId(d ? d?._id : "");
    setDate(d ? d?.createDate : todayDate());
    setLoadingImg(false);
    setImgUrl(d? d?.ledgerImage : "");
    setVoucher(d? d?.voucher : "");
    setCb("");
    setLedger(d ? d?.ledger : "");
    setGroup(d ? d?.group : null);
    setOB(d ? d?.openingBal : "");
    setIsDr(d ? d?.isDr : true);
    setGender(d ? d?.gender : null);
    setStreet(d ? d?.street :"");
    setUnit(d ? d?.unit : "");
    setMobile(d ? d?.mobile : "");
    setEmail(d ? d?.email : "");
    setZip(d ? d?.zip : "");
    setLoadingCity(false);
    setCity(d ? d?.city :"");
    setState(d ? d?.state : null);
    setRemark(d ? d?.remark : "");
    setDocUrl(d ? d?.url : "");
    setBankName(d ? d?.bankName : "");
    setHN(d ? d?.holderName : "");
    setAcNo(d ? d?.accountNo : "");
    setAba(d ? d?.Aba : "");
    setSwift(d ? d?.swift : "");
    setBranch(d ? d?.branch : "");
  }
  const handleSubmit = async ()=>{
    let ledgerData = {_id,createDate,ledgerImage,voucher,cb,ledger,group,openingBal,isDr,gender,street,unit,mobile,email,zip,city,state,remark,remark,url,bankName,holderName,accountNo,Aba,swift,branch};
    let res = await ledgerService.saveLedger(`api/v1/account/ledger/addLedger`, _id,ledgerData);
    if(res.variant === "success"){
      getResult()
      snackRef.current.handleSnack(res);
      handleClear()
    }else {snackRef.current.handleSnack(res); console.log(res)}; 
  }

  async function getZIPData(){
    if(zip.length===5){
      setLoadingCity(true)
      await axios.get(`/api/public/zipToLocation?zipCode=${zip}`).then(res=>{
        setCity(res.data.city)
        let obj = allStates.find(o=>o.id ===res.data.state)
        setState(obj)
        setLoadingCity(false)
      }).catch(err=>{
        console.log(err);
        snackRef.current.handleSnack({message:"Plesae enter correct ZIP code.", variant:"error"});
        setZip("");
        setCity("");
        setState(null)
        setLoadingCity(false)
      })
    }
    }
    async function deleteData(){
      let y = confirm(`Are you sure, you want to delete - ${ledger} ?`)
      if (y){
        let res = await ledgerService.deleteLedger(`/api/v1/account/ledger/addLedger/deleteOne/${_id}`);
        if(res.variant === "success"){
          getResult()
          snackRef.current.handleSnack(res);
          handleClear()
        }else {snackRef.current.handleSnack(res); console.log(res)}; 
      }
    }
  
  return (
    <main >
    <Grid container>
        <Grid item xs={12} md={8} sx={{background:"#fff", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius:"10px", padding:"10px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>{_id ? "Update Ledger" : "Create Ledger"}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth value={createDate} sx={{maxWidth:"130px"}} onChange={e=>setDate(e.target.value)} label="Create Date" size='small' type="date" focused variant="standard" />   
            </Grid>
            <Grid item xs={12} md={4} className="center">
            {
            loadingImg ?  <CircularProgress /> :  <label htmlFor="LedgerImg">
            <input type="file" id="LedgerImg" style={{display:"none"}} onChange={(e) => imgUpload(e.target.files[0])}  accept="image/*"  />
            <Tooltip title="Upload Contact Photo" arrow>
            <Avatar alt="LedgerImage" sx={{cursor: "pointer",width: 112, height: 112, border:"4px solid #d9fdd3"}} src={ledgerImage}/>
            </Tooltip>
            </label>
            } 
            </Grid>
            <Grid item xs={12} md={4}>
            {voucher && <Typography color="teal" sx={{fontFamily: 'Courgette'}} variant='body1' align='right'>Voucher No :  {voucher}</Typography>}
            {cb && <Typography color="tomato" sx={{fontFamily: 'Courgette'}} variant='body1' align='right'>Current Balance : $  {cb}</Typography>}
            </Grid>
            <Grid item xs={12}><br/></Grid>
            <Grid item xs={12} md={4}>
            <TextField fullWidth value={ledger} placeholder="Enter Ledger Name..." onChange={e=>setLedger(e.target.value)} label="Ledger Name" size='small'  variant="standard" />   
            </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
            isOptionEqualToValue={(option, value) => option._id === value._id}
            options={allGroups}
            onChange={(e, v) => {
            setGroup(v);
            }}
            value={group}
            groupBy={(option) => option?.natureOfGroup?.label}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option._id}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} variant="standard" fullWidth label="Under Group"/>}
            /> 
            </Grid>
            <Grid item xs={12} md={4}>
            <TextField fullWidth value={openingBal} onChange={e=>setOB(e.target.value)} label="Opening Balance ($)" placeholder="Type Opening Balance" type="number" size='small' variant="standard" InputProps={{
            endAdornment: <InputAdornment position="start"><Chip color="info" onClick={()=>setIsDr(!isDr)} size="small" label={isDr ? "DR" : "CR"} /> </InputAdornment>,
          }} />   
            </Grid>
            <Grid item xs={12} md={8}>
            <TextField fullWidth value={remark} onChange={e=>setRemark(e.target.value)} label="Narration / Remark" placeholder="Type any Remark here..."  size='small' variant="standard" />   
            </Grid>
            <Grid item xs={12} md={4}>
            <TextField label="Document (If Any)" size='small' disabled={loadingDoc} helperText="PDF and Image Files are allowed" inputProps={{ accept:"image/*, application/pdf" }}  InputProps={{
            endAdornment: <InputAdornment position="start">{loadingDoc && <CircularProgress size={25}/>} </InputAdornment>,
          }} onChange={(e) => imgUpload(e.target.files[0])}  type="file" focused fullWidth/>
            </Grid>
            <Grid item xs={12}>
            <Collapse in={more} timeout="auto" unmountOnExit>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
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
                    <Grid item xs={12} md={4}>
                    <TextField fullWidth value={mobile} type='number' onChange={e=>setMobile(e.target.value)} label="Mobile Number" placeholder='Type Mobile Number' variant="standard" /> 
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <TextField fullWidth value={email} type='email' onChange={e=>setEmail(e.target.value)} label="Email Id" placeholder='Email Id' variant="standard" /> 
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <TextField fullWidth label="Street Address" value={street} onChange={e=>setStreet(e.target.value)} placeholder='Street Address' variant="standard" />  
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <TextField fullWidth label="Unit" value={unit} onChange={e=>setUnit(e.target.value)} placeholder='Unit' variant="standard" />    
                    </Grid>
                   
                    <Grid item xs={12} md={4}>
                    <TextField fullWidth value={zip} onChange={e=> setZip(e.target.value)} onBlur={getZIPData} disabled={loadingCity} InputProps= {{
                    endAdornment: (
                    <InputAdornment position="end">
                    {loadingCity && <CircularProgress size={25}/>}  
                    </InputAdornment>
                    ),
                    }}  label="ZIP Code" type="number"  placeholder="ZIP Code" variant="standard" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <TextField fullWidth value={city} onChange={e=>setCity(e.target.value)} label="City" helperText="Just type ZIP Code" disabled placeholder="City" variant="standard" />
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                        value={state}
                        disabled
                        renderInput={(params) => <TextField {...params} variant="standard" helperText="Just type ZIP Code"  fullWidth label="State"/>}
                        />
                    </Grid>
                </Grid>
            </Collapse>
            </Grid>
            <Grid item xs={12}>
            <Collapse in={more} timeout="auto" unmountOnExit>
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
            </Grid>
            </Collapse>
            </Grid>
            <Grid item xs={12} sx={{marginTop:"20px"}}>
              <Grid container justifyContent="space-between">
              <Button variant="outlined" onClick={()=>handleClear()} startIcon={<MdClearAll />}>Clear</Button>
              <Button variant="contained" onClick={()=>handleSubmit()} startIcon={<MdDoneAll />} sx={{color:"#fff",borderRadius:"20px",padding:"0px 30px"}}>Save</Button>
              <Button variant="outlined" onClick={()=>deleteData()} disabled={!_id} startIcon={<FcFullTrash />}>Delete</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} md={0.2} className='center'>
        <Divider variant="fullWidth" orientation="vertical" />
        </Grid>
       
        <Grid item xs={12} md={3.5} className="boxEffect">
          <Grid container>
            <Grid item xs={12} sx={{padding:"10px"}}>
              <Input autoFocus disableUnderline onChange={e=>setSearchText(e.target.value)} sx={{padding:"10px", fontSize:"14px"}} className="boxEffect" startAdornment={<FcSearch style={{fontSize:"24px", marginRight:"10px"}}/>} fullWidth  placeholder="Search By : Party Name / Group Name" /> 
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{margin:"10px 0px"}}>Search Result ({totalCount})</Divider>
              {loading ? <div className="center"><CircularProgress size={30}/> </div> : loading === false && result.length === 0 ? <NoResult label="No Result Available"/> : null} 
              <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {result.map((r,i)=>
                <ListItem key={i} divider disableGutters>
                  <ListItemButton alignItems="flex-start" onClick={()=>handleClear(r)} >
                  <ListItemAvatar>
                <Avatar alt={r?.ledger} src={r?.ledgerImage}/> 
                </ListItemAvatar>
                <ListItemText primary={<div style={{display: "flex", justifyContent: "space-between"}}> <Typography color="darkgreen" variant="body2">{r?.ledger}</Typography> <Typography color="darkcyan" align="right" variant="body2">SL {(page*rowsPerPage)+(i+1)}</Typography></div>
                  } secondary={`Group : ${r?.group?.label}, Since : ${r?.createDate}`} />
                  </ListItemButton>
              </ListItem>
              )}
              </List>
             
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                sx={{overflowX:"hidden"}}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e,v)=>setPage(v)}
                onRowsPerPageChange={e=>{
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
    </Grid>
    <MySnackbar ref={snackRef} />
    </main>
  )
}

export default Ledger