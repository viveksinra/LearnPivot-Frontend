// components/MockPayButton.js

import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled, keyframes } from '@mui/system';
import {  mockTestService, myCourseService } from '@/app/services';
import AnimatedButton from '../../Common/AnimatedButton';


const MockPayButton = ({data,setSubmitted,setSubmittedId,setTotalAmount,totalAmount,selectedBatch,selectedChild}) => {

    const handleCoEnquiry = async (e) => {
  console.log({data,setSubmitted,setSubmittedId,setTotalAmount,totalAmount,selectedBatch,selectedChild})

        // e.preventDefault();
        const buyData = {
          mockTestId: data._id,
          selectedBatch,
          selectedChild,
        };
      
        try {
          let response = await mockTestService.buyMockStepOne(buyData);
      
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
      Proceed to Pay {totalAmount&& (`Amount: € ${totalAmount}`)}
    </AnimatedButton>
  );
};

export default MockPayButton;
