"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { 
  Box, 
  Button, 
  CircularProgress, 
  Paper,
  Typography,
  Container,
  Divider
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./mockStripePayStyle.css";
import { mockTestService } from "../../services";
import MockCheckoutForm from "./MockCheckoutForm";

const stripePromise = loadStripe("pk_live_51OutBL02jxqBr0evcB8JFdfck1DrMljCBL9QaAU2Qai5h3IUdGgh22m3DCu1VMmWvn4tqEFcFdwfT34l0xh8e28s00YTdA2C87");
// const stripePromise = loadStripe("pk_test_51OutBL02jxqBr0ev5h0jPo7PWCsg0z3dDaAtKPF3fm8flUipuFtX7GFTWO2eLwVe6JzsJOZJ0f2tQ392tCgDWwdt00iCW9Qo66");

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

export default function MockStripePay({isMobile, setStep,data,selectedChild, selectedBatch, submittedId, totalAmount, setSubmitted, setSubmittedId }) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [buyMockId, setBuyMockId] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  // Format the date and time
  const formatBatchDateTime = (batch) => {
    if (!batch || !batch.date) return null;
    
    const dateObj = new Date(batch.date);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });

    return `${formattedDate} @ ${batch.startTime} - ${batch.endTime}`;
  };

  const handlePaymentClick = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      setError("");
      const response = await mockTestService.getPaymentIntentApi({
        items: [{ id: submittedId }],
      });
      if (response.variant === "success") {
        setClientSecret(response.clientSecret);
        setBuyMockId(response.buyMockId);
      } else {
        if (response.message){
          setError(response.message);
         } else {
           setError("Failed to initialize payment. Please try again.");

         }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const handleUpdateBatch = () => {
    setStep(3);
    setSubmitted(false);
  };

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#1976d2",
      colorBackground: "#ffffff",
      borderRadius: "4px",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    < >

          {!clientSecret ? (
                //  <StyledPaper elevation={3}>
                 <Box sx={{ 
                   display: "flex", 
                   flexDirection: "column",
                   alignItems: "flex-start",
                   gap: 2 ,
                  padding: isMobile? "20px" : "1px"
                 }}>
          
                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                 <Button
                   startIcon={<ArrowBackIcon />}
                   onClick={handleUpdateBatch}
         
                   sx={{ 
                     width: '20%',
                     minWidth: 'auto',
                     color: 'white', backgroundColor: '#fc7658', '&:hover': { backgroundColor: 'darkred' }
                   }}
                 >
                   Back
                 </Button>
                 <Typography variant="h7" sx={{ width: '80%', fontWeight: 400 }}>
                   Book {data.testType?.label} Mock Test for child:  <span style={{ fontWeight: 'bold' }}>{selectedChild.childName}</span>
                 </Typography>
               </Box>
                   <Box sx={{ 
                     display: "flex", 
                     justifyContent: "space-between", 
                     width: "100%" 
                   }}>
                     <Typography variant="h6" component="h2" gutterBottom>
                       Secure Payment
                     </Typography>
                     <CloseIcon onClick={handleUpdateBatch} style={{ cursor: 'pointer' }} />
                   </Box>
              
              {/* Batch Details Display */}
              {selectedBatch && selectedBatch[0] && (
                <Box sx={{ 
                  width: '100%', 
                  mb: 2,
                  p: 2,
                  bgcolor: '#f8fafc',
                  borderRadius: 1,
                  border: '1px solid #e2e8f0'
                }}>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Selected Batches
                  </Typography>
                  {selectedBatch.map((batch, index) => ( 
                       <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
                       {formatBatchDateTime(batch)}
                     </Typography>
                  ))
                  }
             
                </Box>
              )}
              
              {/* Amount Display */}
              <Box sx={{ 
                width: '100%', 
                mb: 2,
                p: 2,
                bgcolor: '#f8fafc',
                borderRadius: 1,
                border: '1px solid #e2e8f0'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 1
                }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Total Amount
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                    £{totalAmount?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ width: '100%', my: 1 }} />

              <Button
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CreditCardIcon />}
                onClick={handlePaymentClick}
                disabled={buttonDisabled || loading}
                sx={{
                  minWidth: 240,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                {loading ? "Processing..." : `Pay £${totalAmount?.toFixed(2)} with Debit Card`}
              </Button>
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
                </Box>
                // </StyledPaper>
          ) : (

     <Elements options={options} stripe={stripePromise} style={{ width: '100%', backgroundColor:"green"}}>
              <MockCheckoutForm data={data} setClientSecret={setClientSecret} selectedChild={selectedChild} buyMockId={buyMockId} totalAmount={totalAmount} />
            </Elements>
         
          )}
    
    </>
  );
}