"use client";
import { useState, useRef } from "react";
import { Container, Grid, TextField, MenuItem, Fab, FormControl, InputLabel, Select } from '@mui/material/';
import { FcFeedback } from "react-icons/fc";
import { myCourseService } from "@/app/services";

const SignUpForm = ({ data, setSubmitted, setSubmittedId, setTotalAmount, snackRef }) => {
  const [formData, setFormData] = useState({
    enquiryFor: "self",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    age: "",
    gender: "",
    address: "",
    marketing: "",
    message: "",
    selectedDates: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEnquiry = async (e) => {
    e.preventDefault();
    const buyData = {
      courseId: data._id,
      ...formData,
    };

    try {
      const response = await myCourseService.buyStepOne(buyData);
      console.log('Buy data:', buyData);
      console.log('Response:', response);

      if (response.variant === "success") {
        setSubmitted(true);
        setSubmittedId(response._id);
        setTotalAmount(response.totalAmount);
      }
      snackRef.current.handleSnack(response);
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
          { name: "age", label: "Age", type: "number", required: false },
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
          <FormControl fullWidth>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              name="gender"
              value={formData.gender}
              label="Gender"
              onChange={handleChange}
            >
              {["male", "female", "other"].map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
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
    </form>
  );
};

export default SignUpForm;
