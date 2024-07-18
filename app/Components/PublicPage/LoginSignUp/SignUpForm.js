"use client";
import { useState, useRef, useContext } from "react";
import { Container, Grid, TextField, MenuItem, Fab, FormControl, InputLabel, Select, InputAdornment, IconButton } from '@mui/material/';
import { FcFeedback } from "react-icons/fc";
import { authService, myCourseService } from "@/app/services";
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
  const [showPassword, setShowPass] = useState(false);
  const [password, setPass] = useState("");
  const router = useRouter();
  const snackRef = useRef();
  const { dispatch } = useContext(MainContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEnquiry = async (e) => {
    e.preventDefault();
    const signUpData = {
      ...formData,
      password: password,
    };

    try {
      const res = await authService.signUp(signUpData);
      console.log('SignUp data:', signUpData);
      console.log('Response:', res);

      if (res.success && res.token) {
        dispatch({ type: LOGIN_USER, payload: res });
        snackRef.current.handleSnack({
          message: "Login Successful! Please Wait",
          variant: "success",
        });
        if (isRedirectToDashboard == true) {
          router.push("/dashboard");
          window.location.reload();
        }
      } else {
        snackRef.current.handleSnack({
          message: "Invalid Login Credentials. Please enter correct credentials.",
          variant: "error",
        });
      }
      snackRef.current.handleSnack(res);
    } catch (error) {
      console.error("Error submitting data:", error);
      snackRef.current.handleSnack({ message: "Failed to submit data.", variant: "error" });
    }
  };

  const allMarketing = [
    "Web Search / Google", 
    "Friend or colleague Recommendation", 
    "Social Media", 
    "Direct Mailer", 
    "Family Member", 
    "Email", 
    "Blog or Publication"
  ];

  return (
    <form onSubmit={handleEnquiry} id="enquiryForm" style={{ marginLeft: "40px" }}>
      <Grid container spacing={2}>
        {[
          { name: "firstName", label: "First Name", type: "text", required: true },
          { name: "lastName", label: "Last Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "mobile", label: "Phone", type: "number", required: true },
          { name: "address", label: "Address", type: "text", required: false },
        ].map(({ name, label, type, required }, index) => (
          <Grid item xs={12} md={6} key={index}>
            <TextField
              fullWidth
              name={name}
              value={formData[name]}
              required={required}
              onChange={handleChange}
              label={label}
              type={type}
              placeholder={`Enter your ${label}`}
              variant="outlined"
            />
          </Grid>
        ))}

<Grid item xs={12} md={6}>
            <TextField
              id="loginPass"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              label="Password"
              variant="outlined"
              inputProps={{ autoComplete: "on" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPass(!showPassword)}
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
        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <Fab variant="extended" size="medium" color="primary" aria-label="add" type="submit">
            <FcFeedback style={{ fontSize: 24, marginRight: 10 }} />
            Register Now
          </Fab>
        </Grid>
      </Grid>
      <MySnackbar ref={snackRef} />

    </form>
  );
};

export default SignUpForm;
