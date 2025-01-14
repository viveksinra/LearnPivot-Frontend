import React from 'react';
import { mockTestService } from '@/app/services';
import { Button } from '@/components/ui/button';

const MockPayButton = ({
  data,
  setSubmitted,
  setSubmittedId,
  setTotalAmount,
  totalAmount,
  selectedBatch,
  selectedChild
}) => {
  const handleCoEnquiry = async () => {
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
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Determine button text based on totalAmount
  const buttonText = totalAmount === 0 
    ? "Please select at least one item" 
    : `Proceed to Pay (£${totalAmount})`;

  return (
    <Button
      variant={totalAmount === 0 ? "secondary" : "default"}
      disabled={totalAmount === 0}
      onClick={handleCoEnquiry}
      className={`w-full ${totalAmount === 0 ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      {buttonText}
    </Button>
  );
};

export default MockPayButton;