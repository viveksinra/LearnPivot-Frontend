"use client";

import { useState } from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";


import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function ComLogSigForm() {
  const [isLogin, setIsLogin] = useState(true);


  return (
   
      <div id="loginBg" style={{ backgroundColor: "#fff" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            className="center"
            style={{ flexDirection: "column", padding: "20px" }}
          >
            <Typography color="primary" gutterBottom variant="h6">
              {isLogin ? "Login" : "Sign Up"}
            </Typography>
            <div style={{marginBottom:"20px"}} className="center">
              <Typography
                style={{ color: "#000", marginRight: 20 }}
                variant="subtitle1"
              >
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              </Typography>
              <Link href="#" onClick={() => setIsLogin(!isLogin)}>
                <Typography color="secondary" variant="subtitle1">
                  {isLogin ? "Register New" : "Login"}
                </Typography>
              </Link>
            </div>
            {isLogin ? (
              <LoginForm isRedirectToDashboard={true} />
            ) : (
              <SignUpForm isRedirectToDashboard={true} />
            )}
          </Grid>
          <Grid item xs={12} md={6} id="LoginImgSide">
            <img
              src="https://res.cloudinary.com/oasismanors/image/upload/v1696145088/Login2_pvckvi.svg"
              style={{ width: "100%", height: "400px" }}
              alt="Login-Img"
            />
          </Grid>
        </Grid>
      </div>
    
  );
}

export default ComLogSigForm;
