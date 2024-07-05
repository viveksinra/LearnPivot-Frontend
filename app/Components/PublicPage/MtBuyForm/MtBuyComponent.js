"use client";
import { useEffect, useState, useRef } from "react";
import { Container, Grid, Typography, TextField, RadioGroup, FormControlLabel, Radio, MenuItem, Fab, Alert, FormControl, InputLabel, Select } from '@mui/material/';
import { FcFeedback, FcApproval } from "react-icons/fc";
import StripePay from "../../courseStripePay/StripePay";
import MySnackbar from "../../MySnackbar/MySnackbar";
import { mockTestService } from "@/app/services";
import SmallOneMockTest from "../MockTest/SmallOneMockTest";
import { set } from "mongoose";
import MockStripePay from "../../mockStripePay/MockStripePay";

const MtBuyComponent = ({data}) => {
  const snackRef = useRef();

  const [enquiryFor, setEnquiryFor] = useState("self");
  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState(""); 
  const [marketing, setMarketing] = useState("");
  const [message, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [submittedId, setSubmittedId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
 
// myCourse.service.js

const handleMoEnquiry = async (e) => {
  e.preventDefault();
  const buyData = {
    mockTestId: data._id,
    selectedBatch,
    enquiryFor,
    firstName,
    lastName,
    email,
    mobile,
    address,
    marketing,
    message,
  };

  try {
    let response = await mockTestService.buyMockStepOne(buyData);
    console.log('Buy mo data:', buyData);
    console.log('Response:', response);

    if (response.variant === "success") {
      setSubmitted(true);
      setSubmittedId(response._id);
      setTotalAmount(response.totalAmount);
      // snackRef.current.handleSnack(response);
    } else {
      // snackRef.current.handleSnack(response);
    }
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
    <section style={{ backgroundColor: "#fff", marginBottom: "10px", marginTop:"20px"  }} id="enquiry">
      <Container maxWidth="xl" style={{ marginTop:"40px"  }}>
        <Grid container>
          <Grid style={{  paddingRight:"20px"}} item xs={12} lg={6}>
            <SmallOneMockTest data={data} totalAmount={totalAmount} selectedBatch={selectedBatch} setSelectedBatch={setSelectedBatch} />
          </Grid>
          <Grid  item xs={12} lg={6}>
            {submitted ? (
              <MockStripePay submittedId={submittedId} />
            ) : (
              <form onSubmit={handleMoEnquiry} id="enquiryForm" style={{ marginLeft: "40px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth value={firstName} required onChange={e => setFName(e.target.value)} label="First Name" placeholder="First Name..." variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth value={lastName} required onChange={e => setLName(e.target.value)} label="Last Name" placeholder="Last Name..." variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth value={email} required type="email" onChange={e => setEmail(e.target.value)} label="Email" placeholder="Enter your Email" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth value={mobile} required onChange={e => setMobile(e.target.value)} label="Phone" type="number" placeholder="Enter your Mobile No" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth value={age} onChange={e => setAge(e.target.value)} label="Age" type="number" placeholder="Enter your Age" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={e => setGender(e.target.value)}
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField fullWidth value={address} onChange={e => setAddress(e.target.value)} label="Address" placeholder="Enter your Address" variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth value={marketing} select onChange={e => setMarketing(e.target.value)} label="How did you hear about us?" variant="outlined">
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
            )}
          </Grid>
        </Grid>
      </Container>
      <MySnackbar ref={snackRef} />
    </section>
  );
}

export default MtBuyComponent;
