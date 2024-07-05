'use client';
import React, {useState,useEffect} from 'react'
import {Grid, Typography,Container,Table,TableHead,TableRow,TableCell,TableBody, CircularProgress } from '@mui/material/';
import {authService} from "../../../services/index"

const textDesign = {backgroundColor:"#f2faf6",borderLeft:"2px solid green",padding:"4px 6px",borderTopRightRadius:"5px",borderBottomRightRadius:"5px" };

function PaymentInvoice({params}) {
  const [loading, setLoading] = useState(false);
  const [ledger, setLedger] = useState({label:"John Patter", address:"305, 3rd Floor Orion Mail, Bengaluru", city:"Karnataka", state:"Tamilnadu", zip:"56005", mobile:"+1 1654 5415 5451", email:"studio412.sk@gmail.com"})
  const [tranDate,setDate] = useState("Aug-22-2023");
  const [reminderDate,setReminder] = useState("Sep-28-2023");
  const [mode, setMode] = useState("Cash")
  const [amount,setAmount]=useState("");
  const [remark, setRemark] = useState("");
  const [inWords, setInWords] = useState("");
  const [account, setAcc] = useState({bankName:"Chase Bank", holderName:"Chelmsford Manors Inc", accountNo:"54613256412154",ifsc:"SDONC1651651",swift:"sdsw152ssd", zelle:"Chelmsford@zelle.com"})
  const [terms, setTerms] = useState([{term:"Please pay the dues amount within 15 days from date of invoice, overdue interest @ 14% annaully will be charged on the delayed payment."},{term:"Please quote invoice number when remitting funds."},{term:"Any kind of alteration or complaint regarding this invoice will be subject to consider within 7 days from the date of this invoice."}])
  const [qr, setQR] = useState("https://qrcodedynamic.com/themes/altum/assets/images/qr_code.svg");

  useEffect(() => {
    // Getting all the data
    async function getData(){
      setLoading(true);
      let baseUrl = "";
          if(params?.trans === "payment"){
            baseUrl = `api/v1/account/payment/getPayment/getByVoucher/payment/${params?.id}`;
          }else if (params?.trans === "receipt"){
            baseUrl = `api/v1/account/payment/getPayment/getByVoucher/receipt/${params?.id}`;
          }
      let res = await authService.get(baseUrl);
      if(res.variant === "success"){
        setLoading(false);
        setLedger(res.data?.ledgerP);
        setDate(res.data?.tranDateP);
        setReminder(res.data?.reminderDateP);
        setMode(res.data?.mode?.label);
        setAmount(res.data?.amount);
        setInWords(res.data?.inWords);
        setTerms(res.data?.terms);
        setAcc(res.data?.account);
        setInWords(`${res.data?.dollar} Dollar and ${res.data?.cent} cent.`)
        setQR(res.data?.qr)
        setRemark(res.data?.remark)
        setTimeout(function(){
          window.print();
         }, 2000);
       
      }else {console.log(res);setLoading(false)};    
     }
     if(params?.id){getData()}
  
   }, [params?.id])
   
  if(loading){
    return <div className='center' style={{width:"100%", height:"800px", flexDirection:"column"}}> <CircularProgress/><Typography variant="h6" color="teal">Loading Preview...</Typography></div>
  } else
  return (
    <main style={{backgroundImage:"url(\"https://res.cloudinary.com/oasismanors/image/upload/v1693995987/a4-size_cnhzvz.png\")",display:"block", backgroundPosition: "center", backgroundRepeat:"no-repeat",backgroundSize: "cover",width:"100%", height:"100%", minHeight:"1118px",padding:"37.6562px 45.1875px 56.4844px", backgroundColor:"#fff", overflowY:"hidden"}}>
     <Grid container>
        <Grid item xs={8} className='center' sx={{flexDirection:"column"}}>
        <img src="https://res.cloudinary.com/qualifier/image/upload/v1706185907/Logo/chelmsford-high-resolution-logo_vc9ewh.svg" alt="Chelmsford" style={{width:"200px", height:"80px"}} />
        <Typography variant="subtitle1" color="darkgreen" style={{fontFamily: 'Courgette', border:"1px solid darkgreen", padding:"5px 10px", borderRadius:"25px"}} align='center'>{params?.trans==="payment" ? "Payment" : params?.trans==="receipt" ? "Receipt" : null} Acknowledgement</Typography>
        </Grid>
        <Grid item xs={4} style={{paddingTop:"20px"}}>
        <Typography variant="body2" color="grey" style={{fontFamily: 'Courgette'}} >Billed By :-</Typography>
        <Typography variant="h6" color="primary" style={{fontFamily: 'Courgette'}} >Chelmsford</Typography>
        <Typography variant="caption">15116, Roxford St, Sylmar, CA - 91342</Typography><br/>
        <Typography variant="caption">✆ 984-617-3905</Typography><br/>
        <Typography variant="caption">📧 contact@oasismanors.com</Typography><br/>
        <Typography variant="caption">🌐 OasisManors.com</Typography>
        </Grid>
        </Grid>
        <Container maxWidth="md">
        <Grid container style={{marginTop:"20px",paddingLeft:"60px"}} className='center'>
        <Grid item xs={6}>
        <Typography variant="caption" style={...textDesign}>{params?.trans==="payment" ? "Paid To" : params?.trans==="receipt" ? "Received From" : null}</Typography><br/>
        <Typography variant="h6" color="primary" style={{fontFamily: 'Courgette'}}>{ledger?.label}</Typography>
        <Typography variant="caption">{`${ledger?.address}`}</Typography><br/>
        <Typography variant="caption">{`${ledger?.city}, ${ledger?.state} - ${ledger?.zip}`}</Typography><br/>
        {ledger?.mobile && <Typography variant="caption">✆ {`${ledger?.mobile}`}</Typography>} <br/>
        {ledger?.email && <Typography variant="caption">📧 {`${ledger?.email}`}</Typography>}
        </Grid>
        <Grid item xs={6}>
        <Typography variant="caption" style={...textDesign}>Invoice Details</Typography><br/><br/>
        <Grid container sx={{maxWidth:"260px"}}>
          <Grid item xs={5}><Typography variant="caption">Payment Mode :</Typography></Grid>
          <Grid item xs={7}><Typography variant="subtitle2" color="darkgreen"><b>{mode}</b></Typography></Grid>
          <Grid item xs={5}><Typography variant="caption">Payment Date :</Typography></Grid>
          <Grid item xs={7}><Typography variant="subtitle2" color="darkgreen">{tranDate}</Typography></Grid>
          <Grid item xs={5}><Typography variant="caption">Voucher No. #</Typography></Grid>
          <Grid item xs={7}><Typography variant="subtitle2">{params?.id}</Typography></Grid>
          <Grid item xs={5}><Typography variant="caption">Reminder Date #</Typography></Grid>
          <Grid item xs={7}><Typography variant="subtitle2" color="purple">{reminderDate}</Typography></Grid>
        </Grid>
        </Grid>
        <Grid item xs={12}>
        <Table size="small" sx={{marginTop:"10px"}} aria-label="Account Table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Amount ($)</TableCell>
            <TableCell align="right">In Words</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
            <TableCell align="center"> <Typography variant="h6" color="teal" sx={{fontWeight:"bold"}}>{amount}</Typography></TableCell>
            <TableCell align="right">{inWords}</TableCell>
          </TableRow>
          </TableBody>
        </Table>
        <Grid item xs={12}>
          <br/>
        <Typography variant="caption" style={...textDesign}>Remarks</Typography><br/><br/>
        <Typography variant="caption">{remark}</Typography><br/>
        </Grid>
        <br/><br/>
        <Grid item xs={12}>
          <Grid container>
          <Grid item xs={7}>
          <Typography variant="caption" style={...textDesign}>Terms & Conditions</Typography>
          <ul style={{marginLeft:"20px", marginTop:"5px"}}>
            <ol>
            {terms.map((t,j)=> <li  key={j}><Typography variant="caption">{t.term}</Typography></li>)}
            </ol>
          </ul>
          </Grid>
          <Grid item xs={5}>
          <Typography variant="caption" sx={{marginLeft:"20px"}} style={...textDesign}>Bank & Account Details</Typography>
          <Table size="small" sx={{maxWidth:"280px",marginTop:"10px"}} aria-label="Account Table">
            <TableBody>
            <TableRow>
            <TableCell align="right"> <Typography variant="caption">Bank Name</Typography></TableCell>
            <TableCell align="left"> <Typography variant="caption">{account.bankName}</Typography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="right"> <Typography variant="caption">Holder Name</Typography></TableCell>
            <TableCell align="left"> <Typography variant="caption">{account.holderName}</Typography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="right"> <Typography variant="caption">Account No.</Typography></TableCell>
            <TableCell align="left"> <Typography variant="caption">{account.accountNo}</Typography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="right"> <Typography variant="caption">Swift</Typography></TableCell>
            <TableCell align="left"> <Typography variant="caption">{account.swift}</Typography></TableCell>
            </TableRow>
            </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12}><br/></Grid>
          <Grid item xs={4}>
            <br/>
            <Typography variant="subtitle2">For any Enquiry, Email us on </Typography>
            <Typography variant="subtitle2">Contact@Oasismanors.com</Typography>
            <Typography variant="subtitle2">+1 54561515415</Typography>
          </Grid>
          <Grid item xs={4} className='center' sx={{flexDirection:"column"}}>
            <br/>
              <img src={qr} alt="QR" style={{width:"100px"}} />
              <Typography align='center'>Scan me to Pay</Typography>
          </Grid>
          <Grid item xs={4} className='center'>
          <Typography align='center' variant="subtitle2" sx={{fontFamily:"Courgette"}} color="teal">Thanks for business with us!</Typography>
          </Grid>
          </Grid>
        </Grid>
        </Grid>
        </Grid>
      </Container>
    </main>
  )
}


export default PaymentInvoice
