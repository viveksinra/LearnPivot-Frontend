"use client";
import { useEffect, useState, useRef } from "react";
import { useMediaQuery,Container,useTheme, Grid, Select, Dialog, DialogContent, DialogTitle, Button } from '@mui/material/';
import { FcFeedback, FcApproval } from "react-icons/fc";
import MySnackbar from "../../MySnackbar/MySnackbar";
import { mockTestService } from "@/app/services";
import SmallOneMockTest from "../MockTest/SmallOneMockTest";
import MockEnqForm from "../BuyForm/MockEnqForm";
import CloseIcon from '@mui/icons-material/Close';
import AnimatedButton from "../../Common/AnimatedButton";

const MtBuyComponent = ({data}) => {
  const snackRef = useRef();  
  const [submitted, setSubmitted] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(true);

  const [submittedId, setSubmittedId] = useState("");
  const [selectedChild, setSelectedChild] = useState(null);
  const [step, setStep] = useState(1);

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          {!isMobile && (  <SmallOneMockTest data={data} selectedChild={selectedChild} totalAmount={totalAmount} selectedBatch={selectedBatch} /> )}
          </Grid>
          {!isMobile && (
            <Grid item xs={12} lg={6}>
         
                <MockEnqForm 
              isMobile={true}

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
              <MockEnqForm 
              isMobile={true}
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
               {/* <AnimatedButton variant="contained" color="primary" style={{ marginTop: 16 }}  onClick={handleOpenDialog}>
               Book Now
        </AnimatedButton> */}

          {/* <Dialog fullScreen open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'darkblue', color: 'white' }}>
              {`Book Now`}
              <CloseIcon onClick={handleCloseDialog} style={{ cursor: 'pointer' }} />
            </DialogTitle>
            <DialogContent style={{ width: '100%', padding: 0 }}>
             
              <MockEnqForm 
              isMobile={true}
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
          </Dialog> */}
        </>
      )}
      <MySnackbar ref={snackRef} />
    </section>
  );
}

export default MtBuyComponent;
