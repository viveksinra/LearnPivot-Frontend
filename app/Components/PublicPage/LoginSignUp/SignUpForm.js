"use client";
import { useState, useContext } from "react";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Fab,
  IconButton,
  InputAdornment,
  Box,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { FcFeedback } from "react-icons/fc";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import MainContext from "../../Context/MainContext";
import { LOGIN_USER } from "../../Context/types";
import { authService } from "@/app/services";
import AddressInput from "./AddressInput"; // Adjust the path as needed

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
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [acceptedTnC, setAcceptedTnC] = useState(false);

  const router = useRouter();
  const { dispatch } = useContext(MainContext);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Phone number is required";
    if (!password.trim()) newErrors.password = "Password is required";

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone number validation: must be 11 digits and start with 0
    const phoneRegex = /^0\d{10}$/;
    if (formData.mobile && !phoneRegex.test(formData.mobile)) {
      newErrors.mobile = "Phone number must be 11 digits and start with 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSendOtpClick = async () => {
    // Ensure Terms & Conditions are accepted
    if (!acceptedTnC) {
      setAlert({ message: "Please accept the Terms and Conditions", severity: "error" });
      return;
    }

    if (!validateForm()) {
      return;
    }

    const emailOtpData = {
      ...formData,
      password,
      email: formData.email,
      purpose: "signup",
    };

    try {
      const res = await authService.sendOtp(emailOtpData);
      if (res.variant === "success") {
        setOtpSent(true);
        setAlert({ message: `OTP Sent to ${formData.email}`, severity: "success" });
      } else {
        setAlert({ message: res.message || "Failed to send OTP. Please try again later.", severity: "error" });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setAlert({ message: "Failed to send OTP. Please try again later.", severity: "error" });
    }
  };

  const handleSignUpClick = async () => {
    if (!otp.trim()) {
      setAlert({ message: `Please enter OTP sent to ${formData.email}`, severity: "error" });
      return;
    }

    const signUpData = {
      ...formData,
      password,
      otp,
    };

    try {
      const res = await authService.signUp(signUpData);
      if (res.success && res.token) {
        dispatch({ type: LOGIN_USER, payload: res });
        setAlert({ message: "Registration successful!", severity: "success" });
        if (isRedirectToDashboard) {
          router.push("/userDash");
          window.location.reload();
        } else {
          router.refresh();
        }
      } else {
        setAlert({ message: res.message || "Registration failed. Please try again.", severity: "error" });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setAlert({ message: "Registration failed. Please try again.", severity: "error" });
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
    <Container>
      {alert && (
        <Box mb={2}>
          <Alert severity={alert.severity}>
            {alert.message}
          </Alert>
        </Box>
      )}

      <Grid container spacing={2}>
        {!otpSent ? (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                label="First Name"
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
                disabled={otpSent}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                label="Last Name"
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
                disabled={otpSent}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                required
                error={!!errors.email}
                helperText={errors.email}
                disabled={otpSent}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                label="Phone"
                required
                error={!!errors.mobile}
                helperText={errors.mobile}
                disabled={otpSent}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <AddressInput
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                helperText={errors.address}
                disabled={otpSent}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                required
                error={!!errors.password}
                helperText={errors.password}
                disabled={otpSent}
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                disabled={otpSent}
                autoComplete="off"
              >
                {allMarketing.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acceptedTnC}
                    onChange={(e) => setAcceptedTnC(e.target.checked)}
                    name="acceptedTnC"
                  />
                }
                label={
                  <span>
                    I accept the{" "}
                    <a href="/policy/termandcondition" target="_blank" rel="noopener noreferrer">
                      Terms and Conditions
                    </a>
                  </span>
                }
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Fab variant="extended" color="primary" onClick={handleSendOtpClick}>
                <FcFeedback style={{ marginRight: 8 }} />
                Send Email OTP
              </Fab>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6} sx={{ mx: "auto" }}>
              <TextField
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                label="Enter Email OTP"
                required
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}>
                Check your email spam/junk folder if OTP is not received in inbox.
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Fab variant="extended" color="primary" onClick={handleSignUpClick}>
                <FcFeedback style={{ marginRight: 8 }} />
                Register Now
              </Fab>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default SignUpForm;
