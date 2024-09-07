'use client';
import React,{useState,useEffect,lazy,Suspense} from 'react'
import "./dashboardStyle.css"
import {Button, Chip, Grid,DialogActions,CircularProgress,Typography,Dialog,Table,TableBody,TableRow,TableCell, Tooltip, Divider, Avatar,List,ListItem,ListItemText,ListItemAvatar} from '@mui/material/';
import { dashboardService } from '../services';
import { subDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import CommingSoon from '../Components/Common/CommingSoon';


function   Dashboard () {
  const [showDate, setShowData] = useState(false)
  const router = useRouter();
  const [totalCount, setTCount] = useState([{label:"Payment", number:"$0", bgColor:"#f08ff7",link:"/dashboard/payment", icon: "https://res.cloudinary.com/oasismanors/image/upload/v1693075190/paymentSVG_enp0ca.svg"},
                                            {label:"Receipt", number:"$0", bgColor:"#a9fcc0",link:"/dashboard/receipt", icon: "https://res.cloudinary.com/oasismanors/image/upload/v1693075277/receiptSVG_wtg3b7.svg"},
                                            {label:"Prospect", number:"0", bgColor:"#9155FD",link:"/dashboard/prospect", icon: "https://res.cloudinary.com/oasismanors/image/upload/v1693075342/prospectSVG_u807w7.svg" }, 
                                            {label:"Residents", number:"0", bgColor:"#56CA00",link:"/dashboard/residents",icon: "https://res.cloudinary.com/oasismanors/image/upload/v1693075437/ResidentSVG_zefqhd.svg" },
                                            {label:"Employee", number:"0", bgColor:"#b5eeff",link:"/dashboard/employee",icon: "https://res.cloudinary.com/oasismanors/image/upload/v1693075501/EmpSVG_r8xfre.svg"},
                                            {label:"Tasks", number:"0", bgColor:"#FFB400",link:"/dashboard/task", icon: "https://res.cloudinary.com/oasismanors/image/upload/v1693075578/TaskSVG_x8zgef.svg"},
                                          ]) 
  const [date, setDate] = useState([{
      startDate: subDays(new Date(), 365),
      endDate: new Date(),
      key: 'selection'
    }]);
  const [heading, setHeading] = useState({msg: "Welcome",taskCount: 0,subMsg: "Congratulation, You have 0 pending task",firstName: "Guest",lastName: "",designation:"Role"})
  const [task, setTask]= useState([])
  const [receipt,setReceipt]= useState([])
  const [payment,setPayment]= useState([])
  
  useEffect(() => {
     // Getting Heading Data
     async function getHeading(){
      let res = await dashboardService.getData(`api/v1/dashboard/getDashboard/welcomeMsg`);
      if(res.variant === "success"){
        setHeading(res.data)
      }else {console.log(res)};    
     }
     getHeading()
   }, [])

  useEffect(() => {
    // Getting all summary Data
    async function getSummary(){
      let res = await dashboardService.saveData(`api/v1/dashboard/getDashboard/summaryData`,"", date[0]);
      if(res.variant === "success"){
        setTCount(res.data)
      }else {console.log(res)};    
     }
     getSummary()
   }, [date])

   useEffect(() => {
    // Getting Last 5 Task Data
    async function getTask(){
      let res = await dashboardService.getData(`api/v1/dashboard/getDashboard/pendingTask`);
      if(res.variant === "success"){
        setTask(res.data)
      }else {console.log(res)};    
     }
     getTask()
   }, [])

   useEffect(() => {
    // Getting Last 4 Receipt / Payment Data
    async function getResPay(){
      let res = await dashboardService.getData(`api/v1/dashboard/getDashboard/someReceiptAndPayment`);
      if(res.variant === "success"){
        setReceipt(res?.data?.someReceipt)
        setPayment(res?.data?.somePayment)
      }else {console.log(res)};    
     }
     getResPay()
   }, [])
 
  return (
    <main>
      <Grid container spacing={2} sx={{marginTop:{xs:"8px",md:"-20px"}}}>
        <Grid item xs={12} md={4} sx={{marginLeft:{xs:"8px",md:"0px"},marginRight:{xs:"8px", md:"0px"}}}>
          <div style={{height:"170px", padding:"20px", boxShadow:"rgba(58, 53, 65, 0.1) 0px 2px 10px 0px", width:"100%",backgroundColor:"#fff",borderRadius:"10px",overflow:"hidden"}} id="topBoxBg">
            <Typography variant="h6" color="teal" className='headingText'>{`Welcome, ${heading?.firstName}!`}</Typography>
            <Typography variant="subtitle2" color="darkviolet">{heading.designation}</Typography>
            <div id="trophy"/>
            {/* <Typography variant="caption" gutterBottom color="grey">{heading?.subMsg}</Typography> */}
            <div style={{display:"flex",marginTop:"10px"}}>
            {/* <Typography variant="h5" gutterBottom color="darkviolet">{heading?.taskCount} </Typography> */}
            {/* <Link href="/dashboard/invoice"> <Button size='small' sx={{marginLeft:"20px"}} variant="outlined">View Invoices</Button></Link>  */}
            </div>
          </div>
        </Grid>
     
      </Grid>
<CommingSoon />
     
      <br/> 
        <Dialog onClose={()=>setShowData(false)} maxWidth="md" open={showDate}>
        <Suspense fallback={<div className='center'><CircularProgress /></div>}>
          <DateRangePicker
          onChange={item => {setDate([item.selection])}}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={date}
          direction="horizontal"
          />
          <DialogActions>
          <Button variant="text" color="inherit" onClick={()=>setShowData(false)}>Cancel</Button>
          <span style={{flexGrow:0.1}}/>
          <Button variant="contained" color="success" onClick={()=>setShowData(false)}>Filter Now</Button>
          <span style={{flexGrow:0.1}}/>
          </DialogActions>
          </Suspense>
        </Dialog>
    </main>
  )
}



export default Dashboard;