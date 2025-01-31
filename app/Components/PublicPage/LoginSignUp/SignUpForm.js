"use client";
import { useState, useRef, useContext } from "react";
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
  CircularProgress,
} from "@mui/material/"; // Added CircularProgress import
import { FcFeedback } from "react-icons/fc";
import { authService } from "@/app/services";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import MainContext from "../../Context/MainContext";
import { LOGIN_USER } from "../../Context/types";
import axios from "axios";

const API_KEY = "ak_m6kgz2ix8p1AE5DW6pLG78Hf9LE6L"; // Replace with your actual API key

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
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { dispatch } = useContext(MainContext);

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
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

   // Updated phone number validation
   const phoneRegex = /^0\d{10}$/;
   if (formData.mobile) {
     if (!phoneRegex.test(formData.mobile)) {
       newErrors.mobile = "Phone number must be 11 digits and start with 0";
     }
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

    if (name === "address") {
      fetchAddressSuggestions(value);
    }
  };

  const fetchAddressSuggestions = async (query) => {
    if (!query.trim()) {
      setAddressSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?api_key=${API_KEY}&query=${query}`
      );
      setAddressSuggestions(res.data?.result?.hits || []);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setAddressSuggestions([]);
    }
    setLoading(false);
  };

  const handleAddressSelect = (selectedAddress) => {
    setFormData((prev) => ({ ...prev, address: selectedAddress }));
    setAddressSuggestions([]);
  };

  const handleSendOtpClick = async () => {
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
        if (res.message) {
          setAlert({ message: res.message, severity: "error" });
        } else {
        setAlert({ message: "Failed to send OTP. Please try again later.", severity: "error" });
        }
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setAlert({ message: "Failed to send OTP. Please try again later.", severity: "error" });
    }
  };

  const handleSignUpClick = async () => {
    if (!otp.trim()) {
      setAlert({ message: `Please enter OTP sent to ${formData.email}`, severity: "error" }); // Fixed template literal
      return;
    }

    const signUpData = {
      ...formData,
      password,
      otp
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
          <Alert severity={alert.severity} >
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
          <TextField
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleChange}
            label="Address"
            required
            error={!!errors.address}
            helperText={errors.address}
            autoComplete="off"
          />
          {loading && <CircularProgress size={20} sx={{ marginLeft: 1 }} />}
          {addressSuggestions.length > 0 && (
            <Box mt={1} sx={{ background: "#f9f9f9", borderRadius: "5px", maxHeight: 200, overflowY: "auto" }}>
              {addressSuggestions.map((onesugest, index) => (
                <MenuItem key={index} onClick={() => handleAddressSelect(onesugest.suggestion)}>
                  <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {onesugest.suggestion}
                  </Box>
                </MenuItem>
              ))}
            </Box>
          )}
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
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
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

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Fab
                variant="extended"
                color="primary"
                onClick={handleSendOtpClick}
              >
                <FcFeedback style={{ marginRight: 8 }} />
                Send Email OTP
              </Fab>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6} sx={{ mx: 'auto' }}>
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
              <Box sx={{ textAlign: 'center', color: 'text.secondary', mb: 2 }}>
                Check your email spam/junk folder if OTP is not received in inbox.
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Fab
                variant="extended"
                color="primary"
                onClick={handleSignUpClick}
              >
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