"use client";
import { useEffect, useState, useRef } from "react";
import { useMediaQuery,Container,useTheme, Grid, Typography, TextField, RadioGroup, FormControlLabel, Radio, MenuItem, Fab, Alert, FormControl, InputLabel, Select, Dialog, DialogContent, DialogTitle, Button } from '@mui/material/';
import { FcFeedback, FcApproval } from "react-icons/fc";
import StripePay from "../../courseStripePay/StripePay";
import MySnackbar from "../../MySnackbar/MySnackbar";
import { mockTestService } from "@/app/services";
import SmallOneMockTest from "../MockTest/SmallOneMockTest";
import MockStripePay from "../../mockStripePay/MockStripePay";
import MockEnqForm from "../BuyForm/MockEnqForm";
import CloseIcon from '@mui/icons-material/Close';

const MtBuyComponent = ({data}) => {
  const snackRef = useRef();  
  const [submitted, setSubmitted] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [submittedId, setSubmittedId] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);
  const [step, setStep] = useState(1);

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <section style={{ marginBottom: "10px", paddingTop:isMobile? "0px":"20px" }} id="enquiry">
      <Container maxWidth="xl" style={{   marginTop:"40px"  }}>
        <Grid container>
          <Grid style={{  paddingRight: isMobile? "0px":"20px"}} item xs={12} lg={6}>
            <SmallOneMockTest data={data} totalAmount={totalAmount} selectedBatch={selectedBatch} />
          </Grid>
          {!isMobile && (
            <Grid item xs={12} lg={6}>
         
                <MockEnqForm 
                  data={data} 
                  setStep={setStep}
                  step={step}
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                  submittedId={submittedId}

                  setSubmittedId={setSubmittedId}
                  setTotalAmount={setTotalAmount}                
                  totalAmount={totalAmount} 
                  selectedBatch={selectedBatch}
                  setSelectedBatch={setSelectedBatch}
                  selectedChild={selectedChild} 
                  setSelectedChild={setSelectedChild} 
                />
           
            </Grid>
          )}
        </Grid>
      </Container>
      {isMobile && (
        <>
          <Button 
            variant="contained" 
            color="primary" 
            style={{ position: 'fixed', bottom: '10px', width: '90%', left: '5%' }} 
            onClick={handleOpenDialog}
          >
            Book Now
          </Button>
          <Dialog fullScreen open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'darkblue', color: 'white' }}>
              {`Book Now`}
              <CloseIcon onClick={handleCloseDialog} style={{ cursor: 'pointer' }} />
            </DialogTitle>
            <DialogContent>
            <MockEnqForm 
                  data={data} 
                  setStep={setStep}
                  step={step}
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                  submittedId={submittedId}
                  setSubmittedId={setSubmittedId}
                  setTotalAmount={setTotalAmount}                
                  totalAmount={totalAmount} 
                  selectedBatch={selectedBatch}
                  setSelectedBatch={setSelectedBatch}
                  selectedChild={selectedChild} 
                  setSelectedChild={setSelectedChild} 
                />
            </DialogContent>
          </Dialog>
        </>
      )}
      <MySnackbar ref={snackRef} />
    </section>
  );
}

export default MtBuyComponent;
