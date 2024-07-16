"use client";

import { useState, useRef } from "react";


import MySnackbar from "../../MySnackbar/MySnackbar";
import ComLogSigForm from "../LoginSignUp/ComLogSigForm";

function CourseEnqForm() {
  const snackRef = useRef();
  return (
   <>
<ComLogSigForm />
      <MySnackbar ref={snackRef} />
    </>
  );
}

export default CourseEnqForm;
