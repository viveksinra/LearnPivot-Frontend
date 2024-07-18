// components/ProceedToPayButton.js

import React from 'react';
import Button from '@mui/material/Button';
import { styled, keyframes } from '@mui/system';
import { mockTestService, myCourseService } from '@/app/services';

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(123, 31, 162, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(123, 31, 162, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(123, 31, 162, 0);
  }
`;

const AnimatedButton = styled(Button)`
  background: linear-gradient(45deg, #0D47A1 30%, #7B1FA2 90%);
  border: 0;
  border-radius: 3px;
  color: white;
  height: 48px;
  padding: 0 30px;
  animation: ${pulse} 2s infinite;
`;

const ProceedToPayButton = ({setSubmitted,setSubmittedId,setTotalAmount}) => {

    const handleCoEnquiry = async (e) => {
        e.preventDefault();
        const buyData = {
          mockTestId: data._id,
          selectedBatch,
          enquiryFor,
          firstName,
          lastName,
          email,
          mobile,
          address,
          marketing,
          message,
        };
      
        try {
          let response = await myCourseService.buyStepOne(buyData);
      
          if (response.variant === "success") {
            setSubmitted(true);
            setSubmittedId(response._id);
            setTotalAmount(response.totalAmount);
            // snackRef.current.handleSnack(response);
          } else {
            // snackRef.current.handleSnack(response);
          }
        } catch (error) {
          console.error("Error submitting data:", error);
          snackRef.current.handleSnack({ message: "Failed to submit data.", variant: "error" });
        }
      };

  return (
    <AnimatedButton variant="contained" onClick={() => handleCoEnquiry()}>
      Proceed to Pay
    </AnimatedButton>
  );
};

export default ProceedToPayButton;
