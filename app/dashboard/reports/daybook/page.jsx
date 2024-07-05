'use client';
import React, {useState,Suspense, useEffect} from 'react'
import {Grid,Typography,Chip,Dialog,DialogActions,Divider,CircularProgress,Button,Table,TableHead,TableRow,TableBody,TableCell } from '@mui/material/';
// import { subDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import { dashboardService } from '../../../services';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {getTodayDateRangeWithTime} from "../../../Components/StaticData"
import NoResult from "../../../Components/NoResult/NoResult";
import { useRouter } from 'next/navigation';



function Daybook({ledgerId}) {
  const todayDate = new Date();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [rows,setRows] = useState([]);
  const [ledger, setLedger] = useState("");
  const [subTitle, setSubTi] = useState("");
  const [date, setDate] = useState([{
    startDate: getTodayDateRangeWithTime(todayDate).startDate,
    endDate: getTodayDateRangeWithTime(todayDate).endDate,
    key: 'selection'
  }]);
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
      setLoading(true);
      let myData = {};let baseUrl="";
      if(today){
        myData = getTodayDateRangeWithTime(todayDate)
      }else myData = date[0];
    if(ledgerId){
      baseUrl = `api/v1/account/report/getReport/ledgerBook/${ledgerId}`
    }else baseUrl = `api/v1/account/report/getReport/dayBook`;
     let res = await dashboardService.saveData(baseUrl,"", myData);
     if(res.variant === "success"){
       setLoading(false);
       setSubTi(res.subTitle)
       setRows(res.data)
       setLedger(res.ledger)
     }else {console.log(res);setLoading(false);};    
    }
    getData()
  }, [today,date])
  const handleLink = (d)=>{
    if(d.type === "Payment"){
      router.push(`/dashboard/payment/${d?.voucherNo}`)
    }else if(d.type === "Receipt"){
      router.push(`/dashboard/receipt/${d?.voucherNo}`)
    }
  }
  
  return (
    <main style={{background:"#fff",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",borderRadius:8,padding:10}}>
    <Grid container>
      <Grid item xs={12} md={4}/>
      <Grid item xs={12} md={4}>
      <Typography color="slateblue" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>{ledgerId ? `Ledger - ${ledger}` : "Day Book"}</Typography>
      <center><Typography color="teal" variant="caption" align='center'>{subTitle}</Typography></center> 
      <center><Divider sx={{width:"200px"}}/></center> 
      </Grid>
      <Grid item xs={12} md={4} style={{display:"flex",justifyContent:"end"}}>
      <Chip label="Today" size="small" sx={{cursor:"pointer"}} color={today ? "success" : "default"} onClick={()=>setToday(true)} />
      <Chip label="Date Range" size="small"  sx={{marginLeft:"15px",cursor:"pointer"}} color={!today ? "success" : "default"} onClick={()=>{setToday(false);setOpenFilter(true)}} variant="outlined" />
      </Grid>
      <Grid item xs={12}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="daybook table">
        <TableHead>
          <TableRow>
            <TableCell align="left" padding="none">Sl No.</TableCell>
            <TableCell align="left" padding="none">Date</TableCell>
            <TableCell align="left">Particulars</TableCell>
            <TableCell align="left">Voucher Type</TableCell>
            <TableCell align="left">Voucher No.</TableCell>
            {!ledgerId && <TableCell align="left">Mode</TableCell>}
            <TableCell align="right">Debit Amount</TableCell>
            <TableCell align="right">Credit Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow
              key={i}
              hover
              onClick={()=>handleLink(row)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },cursor:"pointer" }}
            >
              <TableCell align="left" padding="none">{i+1}</TableCell>
              <TableCell align="left" padding="none">{row.date}</TableCell>
              <TableCell component="th" scope="row">
                {row.particulars}
              </TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left">{row.voucherNo}</TableCell>
              {row.mode && <TableCell align="left">{row.mode}</TableCell>}
              <TableCell align="right">{row.dr}</TableCell>
              <TableCell align="right">{row.cr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Grid>
      <Grid item xs={12}>
      {loading ? <div className="center"><CircularProgress size={30}/> </div> : loading === false && rows.length === 0 ? <NoResult label="No Prospect Available"/> : null} 
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

export default Daybook