"use client";

import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function ComLogSigForm({ isRedirectToDashboard }) {
  const [isLogin, setIsLogin] = useState(true);

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
        <LoginForm isRedirectToDashboard={isRedirectToDashboard} />
      ) : (
        <SignUpForm isRedirectToDashboard={isRedirectToDashboard} />
      )}
    </div>
  );
}

export default ComLogSigForm;
