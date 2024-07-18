"use client";

import { useState, useRef, useContext } from "react";


import MySnackbar from "../../MySnackbar/MySnackbar";
import ComLogSigForm from "../LoginSignUp/ComLogSigForm";
import MainContext from "../../Context/MainContext";
import { Avatar, Button, Grid } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import DateSelector from "../Classes/DateSelector";

function CourseEnqForm({data, totalAmount, selectedDates,setSelectedDates}) {
  const snackRef = useRef();
  
  // Context
  const { state } = useContext(MainContext);
  const currentUser = Cookies.get("currentUser");
  return (
   <>
          {(state?.isAuthenticated && currentUser) ? (
                         <Grid item xs={12}>
                         {totalAmount? (
                             <Typography variant="h4" gutterBottom>
                             Proceed to pay Amount: € {totalAmount}
                           </Typography>
                         ): ( <DateSelector data={data} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>)}
                        </Grid>
              ) : (
                <ComLogSigForm isRedirectToDashboard={false}/>
              )}

      <MySnackbar ref={snackRef} />
    </>
  );
}

export default CourseEnqForm;
