// components/ProceedToPayButton.js

import React, { useEffect, useState,useRef } from 'react';
import Button from '@mui/material/Button';
import { styled, keyframes } from '@mui/system';
import { myCourseService } from '@/app/services';
import AnimatedButton from '../../Common/AnimatedButton';
import { Typography } from '@mui/material';
import MySnackbar from '../../MySnackbar/MySnackbar';

const ProceedToPayButton = ({ data, setSubmitted, setSubmittedId, setTotalAmount, totalAmount, selectedDates, selectedChild }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const snackRef = useRef();  

  useEffect(()=>{
    if (!selectedDates || selectedDates.length === 0) {
      MySnackbar({message: 'Please select a batch',variant:"error"})

      setErrorMessage('Kindly choose a batch to continue.')
      return;
    } else if (selectedDates && selectedDates.length >=1 ) {
      setErrorMessage('');
    }
  },[selectedDates])

  const handleCoEnquiry = async () => {
    if (!selectedDates || selectedDates.length === 0) {
      setErrorMessage('Please select a batch to proceed.');
      return;
    }

    const buyData = {
      courseId: data._id,
      selectedDates,
      selectedChild,
    };

    try {
      let response = await myCourseService.buyStepOne(buyData);

      if (response.variant === 'success') {
        setSubmitted(true);
        setSubmittedId(response._id);
        setTotalAmount(response.totalAmount);
        setErrorMessage(''); // Clear the error message if the request is successful
      } else {
        MySnackbar(response)
        setErrorMessage(response.message); // Clear the error message if the request is successful
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setErrorMessage('Failed to submit data.');
    }
  };

  return (
    <div style={{width:'100%'}}>
      <AnimatedButton variant="contained" onClick={handleCoEnquiry}>
        Proceed to Pay {totalAmount && `Amount: £ ${totalAmount}`}
      </AnimatedButton>
      {errorMessage && (
        <Typography color="red" variant="body2" style={{ marginTop: '8px' }}>
          {errorMessage}
        </Typography>
      )}
      <MySnackbar ref={snackRef} />

    </div>
  );
};

export default ProceedToPayButton;
