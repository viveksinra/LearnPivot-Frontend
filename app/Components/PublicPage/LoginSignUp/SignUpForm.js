"use client";
import { useState, useRef, useContext } from "react";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Fab,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  IconButton,
} from "@mui/material/";
import { FcFeedback } from "react-icons/fc";
import { authService } from "@/app/services";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import MySnackbar from "../../MySnackbar/MySnackbar";
import { useRouter } from "next/navigation";
import MainContext from "../../Context/MainContext";
import { LOGIN_USER } from "../../Context/types";

const SignUpForm = ({ isRedirectToDashboard }) => {
  const [formData, setFormData] = useState({
    enquiryFor: "self",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    marketing: "",
    message: "",
    selectedDates: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const router = useRouter();
  const snackRef = useRef();
  const { dispatch } = useContext(MainContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignUpClick = async () => {
    const signUpData = {
      ...formData,
      password,
      otp
    };

    try {
      const res = await authService.signUp(signUpData);

      if (res.success && res.token) {
        dispatch({ type: LOGIN_USER, payload: res });
        snackRef.current.handleSnack({
          message: "Login Successful! Redirecting...",
          variant: "success",
        });
        if (isRedirectToDashboard) {
          router.push("/dashboard");
          window.location.reload();
        } else {
          router.refresh();
        }
      } else {
        snackRef.current.handleSnack({
          message: res.message || "Invalid Login Credentials.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      snackRef.current.handleSnack({
        message: "Failed to submit data.",
        variant: "error",
      });
    }
  };

  const handleSendOtpClick = async () => {
    const emailOtpData = {
      ...formData,
      password,
      email: formData.email,
      purpose: "signup",
    };

    try {
      const res = await authService.sendOtp(emailOtpData);
      if (res.variant == "success") {
        setOtpSent(true);
        snackRef.current.handleSnack({
          message: "OTP Sent Successfully!",
          variant: "success",
        });
      } else {
        snackRef.current.handleSnack({
          message: "Failed to send OTP to Email. Try again later.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      snackRef.current.handleSnack({
        message: "Failed to send OTP to Email.",
        variant: "error",
      });
    }
  };

  const allMarketing = [
    "Web Search / Google",
    "Friend or colleague Recommendation",
    "Social Media",
    "Direct Mailer",
    "Family Member",
    "Email",
    "Blog or Publication",
  ];

  return (
    <Container >
      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
  <TextField
    fullWidth
    name="firstName"
    value={formData.firstName}
    required
    onChange={handleChange}
    label="First Name"
    type="text"
    placeholder="Enter your First Name"
    variant="outlined"
  />
</Grid>

<Grid item xs={12} md={6}>
  <TextField
    fullWidth
    name="lastName"
    value={formData.lastName}
    required
    onChange={handleChange}
    label="Last Name"
    type="text"
    placeholder="Enter your Last Name"
    variant="outlined"
  />
</Grid>

<Grid item xs={12} md={6}>
  <TextField
    fullWidth
    name="email"
    value={formData.email}
    required
    onChange={handleChange}
    label="Email"
    type="email"
    placeholder="Enter your Email"
    variant="outlined"
    disabled={otpSent}  // Disable field when OTP is sent
  />
</Grid>

<Grid item xs={12} md={6}>
  <TextField
    fullWidth
    name="mobile"
    value={formData.mobile}
    required
    onChange={handleChange}
    label="Phone"
    type="number"
    placeholder="Enter your Phone"
    variant="outlined"
  />
</Grid>

<Grid item xs={12} md={12}>
  <TextField
    fullWidth
    name="address"
    value={formData.address}
    onChange={handleChange}
    label="Address"
    type="text"
    placeholder="Enter your Address"
    variant="outlined"
  />
</Grid>


        <Grid item xs={12} md={6}>
          <TextField
            id="loginPass"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            label="Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="start"
                  >
                    {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>


        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            name="marketing"
            value={formData.marketing}
            onChange={handleChange}
            label="How did you hear about us?"
            variant="outlined"
          >
            {allMarketing.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {  otpSent &&      <Grid item xs={12} md={6}>
          <TextField
            id="loginPass"
            fullWidth
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter Email Otp"
            label="Email Otp"
            variant="outlined"
          
          />
        </Grid>}

    {!otpSent &&    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <Fab variant="extended" size="medium" color="primary" aria-label="send-otp" onClick={handleSendOtpClick}>
            <FcFeedback style={{ fontSize: 24, marginRight: 10 }} />
            Send Email OTP
          </Fab>
        </Grid>}

        {otpSent && (
          <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <Fab variant="extended" size="medium" color="primary" aria-label="sign-up" onClick={handleSignUpClick}>
              <FcFeedback style={{ fontSize: 24, marginRight: 10 }} />
              Register Now
            </Fab>
          </Grid>
        )}
      </Grid>
      <MySnackbar ref={snackRef} />
    </Container>
  );
};

export default SignUpForm;
