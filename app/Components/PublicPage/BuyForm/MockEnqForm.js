"use client";

import { useState, useRef, useContext, useEffect } from "react";
import MySnackbar from "../../MySnackbar/MySnackbar";
import ComLogSigForm from "../LoginSignUp/ComLogSigForm";
import MainContext from "../../Context/MainContext";
import Cookies from "js-cookie";
import ChildSelector from "../LoginSignUp/ChildSelector";
import { Typography } from "@mui/material"; // Assuming you are using Material-UI for Typography
import MtBatchSelector from "../MockTest/MtBatchSelector";

function MockEnqForm({ data, setSubmitted, setSubmittedId, setTotalAmount, totalAmount, selectedBatch, setSelectedBatch, selectedChild, setSelectedChild }) {
  const snackRef = useRef();
  
  // Context
  const { state } = useContext(MainContext);
  const currentUser = Cookies.get("currentUser");
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Check for authentication and set step
    if (state?.isAuthenticated && currentUser) {
      setStep(2);
    } else {
      setStep(1);
    } 
  }, [state, currentUser]);

  return (
    <>
      {step === 1 && <ComLogSigForm isRedirectToDashboard={false} />}
      {step === 2 && (
        <>
          <ChildSelector selectedChild={selectedChild} setSelectedChild={setSelectedChild} setStep={setStep} />
        </>
      )}
      {step === 3 && (
        <>
          {totalAmount ? (
            <Typography variant="h4" gutterBottom>
              Proceed to pay Amount: € {totalAmount}
            </Typography>
          ) : (
    
           <>
          <MtBatchSelector
           data={data} 
           selectedChild={selectedChild}
            selectedBatch={selectedBatch}
             setSelectedBatch={setSelectedBatch}
             setSubmitted={setSubmitted}
             setSubmittedId={setSubmittedId}
             setTotalAmount={setTotalAmount}
             totalAmount={totalAmount}             
             />
   
           </>
                    
          )}
        </>
      )}
      <MySnackbar ref={snackRef} />
    </>
  );
}

export default MockEnqForm;
