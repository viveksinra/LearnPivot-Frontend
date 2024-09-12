"use client";

import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgetPassword from "./ForgetPassword";

function ComLogSigForm({ isRedirectToDashboard }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForget, setIsForget] = useState(false);

  return (
    <div style={{marginTop:"20px"}}>
      <Typography 
        align="center" 
        color="primary" 
        gutterBottom 
        variant="h6" 
      >
        {isLogin ? "Login" : "Sign Up"}
      </Typography>
      <Grid container justifyContent="center" sx={{ marginBottom: 2 }}>
        <Typography color="textPrimary" variant="subtitle1" sx={{ marginRight: 2 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
        </Typography>
        <Link href="#" onClick={() => setIsLogin(!isLogin)} passHref>
          <Typography color="secondary" variant="subtitle1" component="a">
            {isLogin ? "Register New" : "Login"}
          </Typography>
        </Link>
      </Grid>
      {isLogin ? (
        <>
        {
          isForget? <ForgetPassword setIsForget={setIsForget} /> : <LoginForm isRedirectToDashboard={isRedirectToDashboard} />
        }
        <Grid container justifyContent="right" sx={{ marginBottom: 2 }}>
        <Link style={{marginRight:"2px"}} href="#" onClick={() => setIsForget(!isForget)} passHref>
        <Typography color="secondary" variant="subtitle1" component="a">
          
          {isForget ? "Back to Login" : "Forget Password?"}
        </Typography>
      </Link>
      </Grid>
      </>
      ) : (
        <SignUpForm isRedirectToDashboard={isRedirectToDashboard} />
      )}
    </div>
  );
}

export default ComLogSigForm;
