// components/ProceedToPayButton.js

import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled, keyframes } from '@mui/system';
import {  myCourseService } from '@/app/services';
import AnimatedButton from '../../Common/AnimatedButton';


const ProceedToPayButton = ({data,setSubmitted,setSubmittedId,setTotalAmount,totalAmount,selectedDates,selectedChild}) => {

    const handleCoEnquiry = async (e) => {
  console.log({data,setSubmitted,setSubmittedId,setTotalAmount,totalAmount,selectedDates,selectedChild})

        // e.preventDefault();
        const buyData = {
          courseId: data._id,
          selectedDates,
          selectedChild,
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
      Proceed to Pay {totalAmount&& (`Amount: £ ${totalAmount}`)}
    </AnimatedButton>
  );
};

export default ProceedToPayButton;
