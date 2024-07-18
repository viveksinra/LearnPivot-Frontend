"use client";

import { useState, useRef, useContext } from "react";


import MySnackbar from "../../MySnackbar/MySnackbar";
import ComLogSigForm from "../LoginSignUp/ComLogSigForm";
import MainContext from "../../Context/MainContext";
import { Avatar, Button } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";

function CourseEnqForm() {
  const snackRef = useRef();
  
  // Context
  const { state } = useContext(MainContext);
  const currentUser = Cookies.get("currentUser");
  return (
   <>
          {(state?.isAuthenticated && currentUser) ? (
                   <h1>Hello work</h1> 
              ) : (
                <ComLogSigForm />
              )}

      <MySnackbar ref={snackRef} />
    </>
  );
}

export default CourseEnqForm;
