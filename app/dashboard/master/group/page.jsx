'use client';
import "../../payment/paymentStyle.css";
import React,{useEffect, useState, useRef} from 'react';
import {Grid,TextField,Typography,FormControlLabel,CircularProgress, Button,Input ,Avatar,List,ListItem,ListItemAvatar,ListItemText,ListItemButton,TablePagination, Divider,Checkbox, } from '@mui/material/';
import {todayDate} from "../../../Components/StaticData";
import Autocomplete from '@mui/material/Autocomplete';
import { FcFullTrash,FcSearch } from "react-icons/fc";
import { MdDoneAll,MdClearAll } from "react-icons/md";
import { ledgerService } from "../../../services/";
import NoResult from "@/app/Components/NoResult/NoResult";
import MySnackbar from "../../../Components/MySnackbar/MySnackbar";


function Group() {
  const [_id, setId] = useState("");
  const [createDate, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [label, setLabel]= useState("");
  const [under, setUnder] = useState(null);
  const [natureOfGroup, setNature] = useState(null);
  const [remark, setRemark] = useState("");
  const [forPurInvoice, setPurInvoice] = useState(null);
  const [isSubLedger, setIsSubLedger]= useState(false);
  const [netBalance, setNetBalance] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
 
  const snackRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [totalCount,setTotalCount] = useState(0);
  const [allRoot, setAllGroups] = useState([]);
  const [allNatureOfGroup] = useState([{label:"Assets", id:"assets"}, {label:"Expenses", id:"expenses"}, {label:"Income", id:"income"},{label:"Liabilities", id:"liabilities"}]);
  const [allPurInvoice] = useState([{label:"Not Applicable", id:"notApplicable"}, {label:"Appropriate By Qty", id:"appropriateByQty"},{label:"Appropriate By Value", id:"appropriateByValue"}]);
  const [result,setResult] = useState([]);
 
  const getPGroup=async()=>{
    let res = await ledgerService.getLedger("api/v1/account/group/getGroup/dropDown/getAll");
    if(res.variant === "success"){  
      setAllGroups(res.data)
    }else {snackRef.current.handleSnack(res); console.log(res)};  
  }
  useEffect(() => {
    // Getting all the Groups
    getPGroup()
    setDate(todayDate()) 
   }, [])

  const getResult = async()=>{
    setLoading(true)
    let baseUrl = `api/v1/account/group/getGroup/getDataWithPage/${rowsPerPage}/${page}/${searchText}`;
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
  },[searchText,page,rowsPerPage,_id])

  const handleClear = (d) =>{
    setId(d ? d?._id : "");
    setDate(d ? d?.date : todayDate());
    setLabel(d ? d?.label : "");
    setUnder(d ? d?.under : null);
    setNature(d ? d?.natureOfGroup : null);
    setRemark(d ? d?.remark : "");
    setPurInvoice(d ? d.forPurInvoice : null);
    setIsSubLedger(d ? d?.isSubLedger : false);
    setNetBalance(d ? d?.netBalance : false);
    setCanDelete(d ? d?.canDelete : false);
    setShowAddress(d ? d?.showAddress : false);
  }
  const handleSubmit = async ()=>{
    let y = confirm("Any Change in Group can affect your account structure. Consult with your Accountant / CA, First. Are you pretty sure that you need to change in this Group ?")
    if (y){
      let groupData = {_id,createDate,label,under,natureOfGroup,forPurInvoice,isSubLedger,netBalance,canDelete,showAddress,remark};
      console.log(groupData)
      let res = await ledgerService.saveLedger(`api/v1/account/group/addGroup`, _id, groupData);
      if(res.variant === "success"){
        getResult()
        snackRef.current.handleSnack(res);
        handleClear()
        getPGroup()
      }else {snackRef.current.handleSnack(res); console.log(res)}; 
    }    
  }

    async function deleteData(){
      let y = confirm(`Deleting any Group can affect your account structure. Consult with your Accountant / CA, First. Are you pretty sure, you want to Delete - ${label} ?`)
      if (y){
        let res = await ledgerService.deleteLedger(`api/v1/account/group/addGroup/deleteOne/${_id}`);
        if(res.variant === "success"){
          getResult()
          snackRef.current.handleSnack(res);
          handleClear();
          getPGroup();
        }else {snackRef.current.handleSnack(res); console.log(res)}; 
      }
    }
  
  return (
    <main >
    <Grid container>
        <Grid item xs={12} md={8} sx={{background:"#fff", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius:"10px", padding:"10px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>{_id ? "Update Group" : "Create Group"}</Typography>
            <Typography color="darkslateblue" style={{fontFamily: 'Courgette'}} variant="subtitle2" align='center'>Groups help you organise the Ledger accounts.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Typography color="green" style={{fontFamily: 'Courgette'}} variant="subtitle2">Create Date : {createDate}</Typography>

            </Grid>
            <Grid item xs={12} md={4}/>
            <Grid item xs={12} md={4} />
            <Grid item xs={12}><br/></Grid>
            <Grid item xs={12} md={4}>
            <TextField fullWidth value={label} placeholder="Type Name of The Group..." inputProps={{maxLength: "50"}} onChange={e=>setLabel(e.target.value)} label="Group Name" size='small'  variant="standard" />  
            </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
            isOptionEqualToValue={(option, value) => option._id === value._id}
            options={allRoot}
            onChange={(e, v) => {
                setUnder(v);
            }}
            value={under}
            groupBy={(option) => option?.natureOfGroup?.label}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option._id}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} variant="standard" fullWidth label="Under Parent Group"/>}
            /> 
            </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={allNatureOfGroup}
            onChange={(e, v) => {
                setNature(v);
            }}
            value={natureOfGroup}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} variant="standard" fullWidth label="Nature of Group"/>}
            /> 
            </Grid>
        
                <Grid item xs={12} md={8}>
                <TextField fullWidth value={remark} onChange={e=>setRemark(e.target.value)} inputProps={{maxLength: "150"}} label="Narration / Remark" placeholder="Type any Remark here..."  size='small' variant="standard" />   
                </Grid>
                <Grid item xs={12} md={4}>
                <Autocomplete
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={allPurInvoice}
                renderOption={(props, option) => {
                    return (
                    <li {...props} key={option.id}>
                        {option.label}
                    </li>
                    );
                }}
                onChange={(e, v) => {
                setPurInvoice(v);
                }}
                value={forPurInvoice}
                renderInput={(params) => <TextField {...params} variant="standard"  fullWidth label="Allocate in Purchase Invoice"/>}
                /> 
                </Grid>
                <Grid item xs={12}>
                    <br/>
                </Grid>
                <Grid item xs={6} md={3}>
                <FormControlLabel control={<Checkbox checked={isSubLedger} onChange={()=>setIsSubLedger(!isSubLedger)} />} label={<Typography color="gray" variant="body2">Act As Sub Ledger</Typography>} />
                </Grid>
                <Grid item xs={6} md={3}>
                <FormControlLabel control={<Checkbox checked={netBalance} onChange={()=>setNetBalance(!netBalance)} />} label={<Typography color="gray" variant="body2">Balance for Reporting</Typography>} />
                </Grid>
                <Grid item xs={6} md={3}>
                <FormControlLabel control={<Checkbox checked={canDelete} onChange={()=>setCanDelete(!canDelete)} />} label={<Typography color="gray" variant="body2">Delete Allowed</Typography>} />
                </Grid>
                <Grid item xs={6} md={3}>
                <FormControlLabel control={<Checkbox checked={showAddress} onChange={()=>setShowAddress(!showAddress)} />} label={<Typography color="gray" variant="body2">Show Address</Typography>}/>
                </Grid>
        
            <Grid item xs={12} sx={{marginTop:"20px"}}>
              <Grid container justifyContent="space-between">
              <Button variant="outlined" onClick={()=>handleClear()} startIcon={<MdClearAll />}>Clear</Button>
              <Button variant="contained" onClick={()=>handleSubmit()} startIcon={<MdDoneAll />} sx={{color:"#fff",borderRadius:"20px",padding:"0px 30px"}}>Save</Button>
              <Button variant="outlined" onClick={()=>deleteData()} disabled={!_id || canDelete===false} startIcon={<FcFullTrash />}>Delete</Button>
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
              <Input autoFocus disableUnderline onChange={e=>setSearchText(e.target.value)} sx={{padding:"10px", fontSize:"14px"}} className="boxEffect" startAdornment={<FcSearch style={{fontSize:"24px", marginRight:"10px"}}/>} fullWidth  placeholder="Search By : Group Name / Primary Group" /> 
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{margin:"10px 0px"}}>Search Result ({totalCount})</Divider>
              {loading ? <div className="center"><CircularProgress size={30}/> </div> : loading === false && result.length === 0 ? <NoResult label="No Result Available"/> : null} 
              <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {result.map((r,i)=>
                <ListItem key={i} divider disableGutters>
                  <ListItemButton alignItems="flex-start" onClick={()=>handleClear(r)} >
                  <ListItemAvatar>
                <Avatar alt={r?.label} src={r?.groupImg}/> 
                </ListItemAvatar>
                <ListItemText primary={<div style={{display: "flex", justifyContent: "space-between"}}> <Typography color="darkgreen" variant="body2">{r?.label}</Typography> <Typography color="darkcyan" align="right" variant="body2">SL {(page*rowsPerPage)+(i+1)}</Typography></div>
                  } secondary={`Primary Group : ${r?.under?.label}, Nature : ${r?.natureOfGroup?.label}`} />
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

export default Group