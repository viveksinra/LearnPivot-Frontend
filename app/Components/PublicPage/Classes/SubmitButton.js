// components/ProceedToPayButton.js

import React from 'react';
import Button from '@mui/material/Button';
import { styled, keyframes } from '@mui/system';
import {  myCourseService } from '@/app/services';
import AnimatedButton from '../../Common/AnimatedButton';


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
