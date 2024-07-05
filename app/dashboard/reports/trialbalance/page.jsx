'use client';
import React, {useState,Suspense, useEffect} from 'react'
import {Grid,Typography,Chip,Dialog,DialogActions,CircularProgress,Button,Table,TableHead,TableRow,TableBody,TableCell, Divider,List,ListSubheader,ListItem,ListItemText } from '@mui/material/';
import { DateRangePicker } from 'react-date-range';
import { dashboardService } from '../../../services';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {getTodayDateRangeWithTime} from "../../../Components/StaticData";
import NoResult from "../../../Components/NoResult/NoResult";
import { useRouter } from 'next/navigation';



function TrialBalance() {
  const todayDate = new Date();
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState(true);
  const [hideZero, setHideZero] = useState(false)
  const [openFilter, setOpenFilter] = useState(false);
  const [rows,setRows] = useState([]);
  const [subTitle, setSubTi] = useState("");
  const [date, setDate] = useState([{
    startDate: getTodayDateRangeWithTime(todayDate).startDate,
    endDate: getTodayDateRangeWithTime(todayDate).endDate, 
    key: 'selection'
  }]);
  const router = useRouter();
  async function changeDate(data){
    data.forEach((md => {
      if(md.startDate === md.endDate){
        md.startDate = getTodayDateRangeWithTime(md.startDate).startDate
        md.endDate = getTodayDateRangeWithTime(md.endDate).endDate
      }
    }))
    setDate(data)
  }
  
  useEffect(() => {
    // Getting Data 
    async function getData(){
        setLoading(true)
      let myData = {};
      if(today){
        myData = getTodayDateRangeWithTime(todayDate)
      }else myData = date[0];
     let res = await dashboardService.saveData(`api/v1/account/report/getReport/trialBalance`,"", myData);
     if(res.variant === "success"){
       setLoading(false)
       setSubTi(res.subTitle)
       setRows(res.data)
     }else {console.log(res);setLoading(false)};    
    }
    getData()
  }, [today,date])

  // useEffect(() => {
  //   if(allData.length > 0){
  //     if(hideZero){
  //      let filtArr = allData.filter(f=>f.ledgers.map(l=> l.openingBalance !==0 && l.nettTransaction !== 0 && l.closingBalance !==0 ))
  //      console.log(filtArr)
  //     }else {
  //       setRows(allData)
  //     }
  //   }
  // }, [hideZero,allData])
  
  
  return (
    <main style={{background:"#fff",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",borderRadius:8,padding:10}}>
    <Grid container>
      <Grid item xs={12} md={4}/>
      <Grid item xs={12} md={4}>
      <Typography color="slateblue" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>Trial Balance</Typography>
      <center><Typography color="teal" variant="caption" align='center'>{subTitle}</Typography></center> 
      <center><Divider sx={{width:"200px"}}/></center> 
      </Grid>
      <Grid item xs={12} md={4} sx={{display:"flex", justifyContent:"space-evenly", marginTop:{xs:"10px", md:"0px"}}}>
      <Chip label={hideZero ? "Show Zero Ledgers"  : "Hide Zero Ledgers"} size="small" sx={{cursor:"pointer"}} color={hideZero ? "success" : "default"} onClick={()=>setHideZero(!hideZero)} />
      <Chip label="Today" size="small" sx={{cursor:"pointer"}} color={today ? "success" : "default"} onClick={()=>setToday(true)} />
      <Chip label="Date Range" size="small"  sx={{cursor:"pointer"}} color={!today ? "success" : "default"} onClick={()=>{setToday(false);setOpenFilter(true)}} variant="outlined" />
      </Grid>
      <Grid item xs={12}>
      <Table sx={{ minWidth: 650, display:{xs:"none", md:"inline-table"} }} size="small" aria-label="daybook table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{minWidth:400}}>Particulars</TableCell>
            <TableCell align="left">Opening Balance</TableCell>
            <TableCell align="left">Nett Transactions</TableCell>
            <TableCell align="right">Closing Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <>
            <TableRow
              key={row.group}
              sx={{border: 0}}
            > 
            <TableCell align="center" colSpan={1} sx={{color:"teal"}} padding="none">{row.group}</TableCell>
            </TableRow>
            {row.ledgers && row.ledgers.map((r,j)=> <TableRow
              key={j}
              hover
              // onClick={()=>console.log(row)}
              onClick={()=> router.push(`/dashboard/reports/ledgerbook/${r?._id}?date=${r.date}`)} 
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor:"pointer"}}
            >
              <TableCell component="th" align="left" sx={{minWidth:400}} scope="row">
                {r.particulars}
              </TableCell>
              <TableCell align="left">{`${r.openingBalance} ${r.opType}`}</TableCell>
              <TableCell align="left">{`${r.nettTransaction} ${r.nettTranType}`}</TableCell>
              <TableCell align="right">{`${r.closingBalance} ${r.closingBalType}`}</TableCell>
            </TableRow> )}
            </>
          ))}
        </TableBody>
      </Table>

      {/* Mobile View */}
        <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          position: 'relative',
          display:{xs:"block", md:"none"},
          overflow: 'auto',
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {rows && rows.map((row,i)=> <li key={i}> <ul>
        <Divider><ListSubheader sx={{color:"teal"}}>{row.group}</ListSubheader></Divider> 
        {row.ledgers && row.ledgers.map(l=> <ListItem key={l._id}>
        <ListItemText primary={l.particulars} secondary={`Opening: $${l.openingBalance}, Current: $${l.nettTransaction}, Closing: $${l.closingBalance}`} />
        </ListItem>)}
          </ul> </li>)}
      </List>
      </Grid>
      <Grid item xs={12}>
      {loading ? <div className="center" style={{marginTop:"20px"}}><CircularProgress size={30}/> </div> : loading === false && rows.length === 0 ? <NoResult label="No Prospect Available"/> : null} 
      </Grid>
    </Grid>

    <Dialog onClose={()=>setToday(false)} maxWidth="md" open={openFilter}>
        <Suspense fallback={<div className='center'><CircularProgress /></div>}>
          <DateRangePicker
          onChange={item => {changeDate([item.selection])}}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={date}
          direction="horizontal"
          />
          <DialogActions>
          <Button variant="text" color="inherit" onClick={()=>setOpenFilter(false)}>Cancel</Button>
          <span style={{flexGrow:0.1}}/>
          <Button variant="contained" color="success" onClick={()=>setOpenFilter(false)}>Filter Now</Button>
          <span style={{flexGrow:0.1}}/>
          </DialogActions>
          </Suspense>
        </Dialog>
    </main>
  )
}

export default TrialBalance