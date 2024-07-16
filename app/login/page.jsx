"use client";

import "./loginStyle.css";
import { useState, useRef } from "react";


import MySnackbar from "../Components/MySnackbar/MySnackbar";
import Navbar from "../Components/ITStartup/Common/Navbar/Navbar";
import ComLogSigForm from "../Components/PublicPage/LoginSignUp/ComLogSigForm";

function Login() {
  const snackRef = useRef();
  return (
    <main>
      <Navbar />
<ComLogSigForm />
      <MySnackbar ref={snackRef} />
    </main>
  );
}

export default Login;
