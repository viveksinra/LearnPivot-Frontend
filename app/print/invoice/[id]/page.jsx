'use client';
import React, {useState,useEffect} from 'react'
import {Grid, Typography,Container,Table,TableHead,TableRow,TableCell,TableBody, Divider,} from '@mui/material/';
import {invoiceService} from "../../../services/index"

const textDesign = {backgroundColor:"#f2faf6",borderLeft:"2px solid green",padding:"4px 6px",borderTopRightRadius:"5px",borderBottomRightRadius:"5px" };

function PrintInvoice({ params }) {
  const [payer,setPayer] = useState({label:"",address:"305, 3rd Floor Orion Mail, Bengaluru", city:"Karnataka", state:"Tamilnadu", zip:"56005", mobile:"+1 1654 5415 5451", email:"studio412.sk@gmail.com"})
  const [ledger, setLedger] = useState({label:""})
  const [tranDate,setDate] = useState("Aug-22-2023");
  const [dueDate,setDueDate] = useState("Sep-28-2023")
  const [rows, setRows] = useState([{label:"Rent of August - Single Bed",issuedOn:"September 1, 2023",price:"300/Mon",qty:"10 Days",amount:"96.77",taxPercent:"0",taxValue:"0"},{item:"Care 1 - Little care",issuedOn:"August 1, 2023",price:"5000/Mon",qty:"12 Days",amount:"2090.32",taxPercent:"8",taxValue:"154.84"}]);
  const [payment, setPayment] = useState([{payDate:"Aug-20-2023", mode:"Cash", amount:"510"},{payDate:"Aug-21-2023", mode:"Zelle", amount:"210"}]);
  const [itemCost,setItemCost]=useState("");
  const [tax,setTax]=useState("");
  const [freight, setFreight] = useState("200");
  const [discount, setDiscount] = useState("10");
  const [netAmount, setAmount] = useState("")
  const [paid, setPaid] = useState("");
  const [dues, setDues] = useState("");
  const [inWords, setInWords] = useState("");
  const [terms,setTerms] = useState([{term:"Please pay the dues amount within 15 days from date of invoice, overdue interest @ 14% annaully will be charged on the delayed payment."},{term:"Please quote invoice number when remitting funds."},{term:"Any kind of alteration or complaint regarding this invoice will be subject to consider within 7 days from the date of this invoice."}])
  const [account,setAcc] = useState({bankName:"", holderName:"", accountNo:"",ifsc:"",swift:"", zelle:""})
  const [qr, setQR] = useState("");
  useEffect(() => {
    // Getting all the data
    async function getData(){
      let res = await invoiceService.getLedger(`api/v1/residence/invoice/getInvoice/printInvoice/type1/${params?.id}`);
      if(res.variant === "success"){
        setPayer(res.data?.payer);
        setLedger(res.data?.ledger);
        setDate(res.data?.tranDate);
        setDueDate(res.data?.dueDate);
        setRows(res.data?.rows);
        setPayment(res.data?.payment);
        setFreight(res.data?.freight);
        setDiscount(res.data?.discount);
        setItemCost(res.data?.itemCost);
        setTax(res.data?.tax);
        setAmount(res.data?.netAmount);
        setPaid(res.data?.paid);
        setDues(res.data?.dues);
        setTerms(res.data?.terms);
        setAcc(res.data?.account);
        setInWords(`${res.data?.dollar} Dollar and ${res.data?.cent} cent.`)
        setQR(res.data?.qr)
        setTimeout(function(){
          window.print();
         }, 3000);
       
      }else {console.log(res)};    
     }
     if(params?.id){getData()}
  
   }, [])
   

  return (
    <main style={{backgroundColor:"#fff",width:"100%", overflowY:"hidden"}}>
      <section style={{backgroundColor:"#f2faf6", height:"180px"}}>
        <Grid container>
        <Grid item xs={3} className='center'>
        <img src="https://res.cloudinary.com/qualifier/image/upload/v1706185907/Logo/chelmsford-high-resolution-logo_vc9ewh.svg" alt="Chelmsford" style={{width:"160px", height:"80px"}} />
        </Grid>
        <Grid item xs={5} style={{paddingTop:"30px"}}>
          <Typography variant="h6" color="darkgreen" style={{fontFamily: 'Courgette'}} align='center'>Invoice</Typography>
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
      </section>
      <Container maxWidth="xl">
        <Grid container style={{paddingTop:"10px"}}>
        <Grid item xs={4}>
        <Typography variant="caption" style={...textDesign}>Billed To</Typography><br/>
        <Typography variant="h6" color="primary" style={{fontFamily: 'Courgette'}}>{payer?.label}</Typography>
        <Typography variant="caption">{`${payer?.address}`}</Typography><br/>
        <Typography variant="caption">{`${payer?.city}, ${payer?.state} - ${payer?.zip}`}</Typography><br/>
        {payer?.mobile && <Typography variant="caption">✆ {`${payer?.mobile}`}</Typography>} <br/>
        {payer?.email && <Typography variant="caption">📧 {`${payer?.email}`}</Typography>}
        </Grid>
        <Grid item xs={4}>
        <Typography variant="caption" style={...textDesign}>Invoice Details</Typography><br/><br/>
        <Grid container sx={{maxWidth:"220px"}}>
          <Grid item xs={5}><Typography variant="caption">On behalf of :</Typography></Grid>
          <Grid item xs={7}><Typography variant="caption"><b>{ledger?.label}</b></Typography></Grid>
          <Grid item xs={5}><Typography variant="caption">Invoice #</Typography></Grid>
          <Grid item xs={7}><Typography variant="caption">{params?.id}</Typography></Grid>
          <Grid item xs={5}><Typography variant="caption">Invoice Date :</Typography></Grid>
          <Grid item xs={7}><Typography variant="caption">{tranDate}</Typography></Grid>
        </Grid>
        </Grid>
        <Grid item xs={4}>
        <Typography variant="caption" style={...textDesign}>Payment Record</Typography><br/><br/>
        <Grid container sx={{maxWidth:"260px"}}>
          <Grid item xs={5}><Typography gutterBottom variant="body2">Paid Amount  :</Typography></Grid>
          <Grid item xs={7}><Typography gutterBottom color="teal" variant="body2">$ {paid}</Typography></Grid>
          <Grid item xs={5}><Typography gutterBottom variant="body2">Due Amount :</Typography></Grid>
          <Grid item xs={7}><Typography gutterBottom color="secondary" variant="body2">$ {dues}</Typography></Grid>
          {dueDate && <> <Grid item xs={5}><Typography variant="body2">Due Date :</Typography></Grid>
          <Grid item xs={7}><Typography variant="body2">{dueDate}</Typography></Grid></>}
        </Grid>
        </Grid>
        <Grid item xs={12}>
          <Table sx={{ minWidth: 650,maxWidth:"1320px", marginTop:"25px", borderRadius:"20px", boxShadow:"4px 0px 8px 3px rgba(0,0,0,0.1)" }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow sx={{backgroundColor:"lightcyan"}}>
              <TableCell>SL</TableCell>
                <TableCell>Billing Item</TableCell>
                <TableCell align="center">Issued On</TableCell>
                <TableCell align="center">Unit&nbsp;Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Tax</TableCell>
                <TableCell align="center">Amount&nbsp;($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row,i) => (
                <TableRow
                  key={i}
                  hover
                  sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" sx={{width:30}} scope="row">
                  {i+1}
                  </TableCell>
                  <TableCell component="th" sx={{minWidth:180}} scope="row">
                  {row.label}
                  </TableCell>
                  <TableCell align="center" sx={{minWidth:120}}>{row.issuedOn}</TableCell>
                  <TableCell align="center" sx={{minWidth:80}}>{row.price}</TableCell>
                  <TableCell align="center" sx={{minWidth:80}}>{row.qty}</TableCell>
                  <TableCell align="center" sx={{minWidth:110}}>{`${row.taxValue} (${row.taxPercent}%)`}</TableCell>
                  <TableCell align="center" sx={{minWidth:80}}>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Grid>

          <Grid item xs={8} sx={{marginTop:"30px"}}>
          <Typography variant="caption" style={...textDesign}>Invoice Total in Words</Typography><br/>
          <Typography variant="subtitle1" style={{fontFamily: 'Courgette'}} color="teal">{inWords}</Typography><br/>
          <Typography variant="caption" style={...textDesign}>Payment Chart</Typography>
          <Table size="small" sx={{maxWidth:"400px",marginTop:"10px"}} aria-label="Payment Table">
            <TableHead>
              <TableRow sx={{backgroundColor:"azure"}}>
                <TableCell align="left" sx={{width:"110px"}}><Typography variant="caption">Date</Typography></TableCell>
                <TableCell align="center" sx={{maxWidth:"150px"}}><Typography variant="caption">Mode</Typography></TableCell>
                <TableCell align="center" sx={{maxWidth:"50px"}}><Typography variant="caption">Amount</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>                      
            {payment.map((row,i) => (
              <TableRow
                key={i}
                hover
                sx={{'&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" sx={{width:"110px"}}>
                <Typography variant="caption">{row.payDate}</Typography>
                </TableCell>
                <TableCell align="center"><Typography variant="caption">{row.mode}</Typography></TableCell>
                <TableCell align="center"> <Typography variant="caption">{row.amount}</Typography></TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
          </Grid>
          <Grid item xs={4} sx={{marginTop:"30px"}}>
              <Typography variant="caption">Item Cost : $ {itemCost}</Typography><br/>
              <Typography variant="caption">Tax (Inclusive) : $ {tax}</Typography><br/>
              <Typography variant="caption">Freight : (+) $ {freight}</Typography><br/>
              <Typography variant="caption">Discount : (-) $ {discount}</Typography><br/>
              <Divider sx={{maxWidth:150}} light/>
              <Typography variant="body2" color="teal">Net Amount : $ {netAmount}</Typography>
              <Typography variant="body2" color="darkgreen">Total Paid : $ {paid}</Typography>
              <Typography variant="body2" color="secondary">Dues : $ {dues}</Typography>
          </Grid>
      </Grid>
      </Container>
      <section style={{backgroundColor:"#f2faf6", marginTop:"20px", padding:"20px"}}>
      <Container maxWidth="xl">
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
            <TableCell align="left"> <Typography variant="subtitle2">{account.bankName}</Typography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="right"> <Typography variant="caption">Holder Name</Typography></TableCell>
            <TableCell align="left"> <Typography variant="subtitle2">{account.holderName}</Typography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="right"> <Typography variant="caption">Account No.</Typography></TableCell>
            <TableCell align="left"> <Typography variant="subtitle2">{account.accountNo}</Typography></TableCell>
            </TableRow>
            <TableRow>
            <TableCell align="right"> <Typography variant="caption">Swift</Typography></TableCell>
            <TableCell align="left"> <Typography variant="subtitle2">{account.swift}</Typography></TableCell>
            </TableRow>
            </TableBody>
            </Table>
          </Grid>
          <Grid item xs={4}>
            <br/>
            <Typography variant="subtitle1">For any Enquiry, Email us on </Typography>
            <Typography variant="subtitle1">Contact@Oasismanors.com</Typography>
            <Typography variant="subtitle1">+1 54561515415</Typography>
          </Grid>
          <Grid item xs={4} className='center' sx={{flexDirection:"column"}}>
            <br/>
              <img src={qr} alt="QR" style={{width:"150px"}} />
              <Typography align='center'>Scan me to Pay</Typography>
          </Grid>
          <Grid item xs={4} className='center'>
          <Typography align='center' variant="subtitle1" sx={{fontFamily:"Courgette"}} color="teal">Thanks for business with us!</Typography>
          </Grid>
        </Grid>

      </Container>
      </section>
      
    </main>
  )
}


export default PrintInvoice