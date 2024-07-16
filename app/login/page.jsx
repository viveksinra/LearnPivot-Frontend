"use client";
import "./loginStyle.css";
import { TopAbstract } from "../MyApp";
import { LOGIN_USER } from "../Components/Context/types";
import { MainContext } from "../Components/Context/MainContext";
import MySnackbar from "../Components/MySnackbar/MySnackbar";
import { useState, useRef, useContext } from "react";
import {
  Tabs,
  Tab,
  Grid,
  Typography,
  TextField,
  Fab,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { FcKey } from "react-icons/fc";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/auth/useLogin";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../Components/ITStartup/Common/Navbar/Navbar";
import LoginForm from "../Components/PublicPage/LoginSignUp/LoginForm";
// import { useCurrentUser } from "../hooks/auth/useCurrentUser";

function Login() {
  // const [tabVal, setTabs] = useState(0);
  const [showPassword, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(MainContext);
  const { login } = useLogin();
  // const {user} = useCurrentUser()

  const router = useRouter();
  const snackRef = useRef();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      console.log(res);
      if (res.success && res.token) {
        dispatch({ type: LOGIN_USER, payload: res });
        snackRef.current.handleSnack({
          message: "Login Successful! redirecting to dashboard.",
          variant: "success",
        });
        setLoading(false);
        router.push("/dashboard");
        window.location.reload();
      } else {
        snackRef.current.handleSnack({
          message:
            "Invalid Login Credentials. Please enter correct credentials.",
          variant: "error",
        });
      }
    } catch (error) {
      console.log(error);
      snackRef.current.handleSnack({
        message: "Something went wrong. Please try again.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  // if (state.isAuthenticated) {
  //   // return router.push('/dashboard');
  // } else
  return (
    <main>
      <Navbar />
      <TopAbstract />
      <div id="loginBg" style={{ backgroundColor: "#fff" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            className="center"
            style={{ flexDirection: "column" }}
          >
            <Typography color="primary" gutterBottom variant="h6">
              Login
            </Typography>
            <div className="center">
              <Typography
                style={{ color: "#000", marginRight: 20 }}
                variant="subtitle1"
              >
                Don't have an account?{" "}
              </Typography>
              <Link href="/#enquiry">
                {" "}
                <Typography color="secondary" variant="subtitle1">
                  Register New
                </Typography>
              </Link>
            </div>
            <LoginForm isRedirectToDashboard={true}/>
      
                    
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
      <MySnackbar ref={snackRef} />
    </main>
  );
}

export default Login;
