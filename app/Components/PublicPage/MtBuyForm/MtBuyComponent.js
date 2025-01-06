"use client";
import { useEffect, useState, useRef } from "react";
import { useMediaQuery,Container,useTheme, Grid, Typography, TextField, RadioGroup, FormControlLabel, Radio, MenuItem, Fab, Alert, FormControl, InputLabel, Select } from '@mui/material/';
import { FcFeedback, FcApproval } from "react-icons/fc";
import StripePay from "../../courseStripePay/StripePay";
import MySnackbar from "../../MySnackbar/MySnackbar";
import { mockTestService } from "@/app/services";
import SmallOneMockTest from "../MockTest/SmallOneMockTest";
import MockStripePay from "../../mockStripePay/MockStripePay";
import MockEnqForm from "../BuyForm/MockEnqForm";

const MtBuyComponent = ({data}) => {
  const snackRef = useRef();  
  const [submitted, setSubmitted] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");


  const [submittedId, setSubmittedId] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <section style={{ marginBottom: "10px", paddingTop:isMobile? "0px":"20px" }} id="enquiry">
      <Container maxWidth="xl" style={{   marginTop:"40px"  }}>
        <Grid container>
          <Grid style={{  paddingRight: isMobile? "0px":"20px"}} item xs={12} lg={6}>
            <SmallOneMockTest data={data} totalAmount={totalAmount} selectedBatch={selectedBatch} />
          </Grid>
          <Grid  item xs={12} lg={6}>
            {submitted ? (
              <MockStripePay submittedId={submittedId} />
            ) : (
          <MockEnqForm 
          data={data} 
          setSubmitted={setSubmitted}
          setSubmittedId={setSubmittedId}
          setTotalAmount={setTotalAmount}                
          totalAmount={totalAmount} 
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
           selectedChild={selectedChild} 
           setSelectedChild={setSelectedChild} 
          
          
          />
            )}
          </Grid>
        </Grid>
      </Container>
      <MySnackbar ref={snackRef} />
    </section>
  );
}

export default MtBuyComponent;
