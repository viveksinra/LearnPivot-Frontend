'use client';
import React, {useState,useEffect} from 'react'
import {Divider, Grid,Typography,TextField, Button } from '@mui/material/';
import Autocomplete from '@mui/material/Autocomplete';
import { payReceiveService } from "@/app/services"; 
import { useRouter } from 'next/navigation';


function LegerBook() {
const [allLedgers, setAllLed] = useState([])
const [ledger, setLedger]= useState(null);
const router = useRouter();

const handleLedger=()=>{
    if(ledger){
         router.push(`/dashboard/reports/ledgerbook/${ledger?._id}`)
    }
}
useEffect(() => {
    // Getting all the Ledgers
    async function getLedger(){
      let res = await payReceiveService.getPayRec(`api/v1/account/payment/getPayment/dropdown/getLedger`);
      if(res.variant === "success"){
        setAllLed(res.data)
      }else {snackRef.current.handleSnack(res); console.log(res)};    
     }
     getLedger()
   }, [])

  return (
    <main style={{background:"#fff",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",borderRadius:8,padding:10}}>
    <Grid container>
    <Grid item xs={12}>
    <Typography color="secondary" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>Ledger Book</Typography>
      <center><Typography color="teal" variant="caption" align='center'>Select the Ledger you want to grab.</Typography></center> 
     <center><Divider sx={{maxWidth:"400px"}}/></center> <br/>
     <Autocomplete
            isOptionEqualToValue={(option, value) => option._id === value._id}
            options={allLedgers}
            onChange={(e, v) => {
            setLedger(v);
            }}
            value={ledger}
            groupBy={(option) => option.group}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option._id}>
                  {option.label}
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} variant="standard" placeholder='Type Ledger Name...'  label="Select Ledger"/>}
            />
<br/>
    </Grid>
    <Grid item xs={12}>
    <Button variant="outlined" disabled={ledger===null} onClick={()=>handleLedger()}>Get Leger Book</Button>
    </Grid>
    </Grid>
    </main>
  )
}

export default LegerBook