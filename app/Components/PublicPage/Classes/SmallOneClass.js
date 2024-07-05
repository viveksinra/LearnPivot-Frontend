import React, { useState } from "react";
import { Divider, Grid, Typography, Chip, Button } from "@mui/material";
import DateSelector from "./DateSelector";
const SmallOneClass = ({ data,totalAmount, selectedDates,setSelectedDates }) => {
console.log({ data,totalAmount, selectedDates,setSelectedDates })
  return (
    <Grid container key={data._id} spacing={4}>
      <Grid item xs={12} md={4}>
        <img
          src={data.url}
          className="creativeImg"
          alt={data.courseTitle}
          style={{ width: '100%', height: '100%' }} 
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography
          color="#082952"
          gutterBottom
          sx={{
            fontSize: { xs: "18px", md: "20px" },
            fontWeight: 600,
            lineHeight: "20px", // reduced the line height
            fontFamily: "Adequate, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
         {data.courseTitle}
        </Typography>
        <Typography
  color="#082952"
  gutterBottom
  sx={{
    fontSize: { xs: "12px", md: "15px" },
    fontWeight: 200,
    fontFamily: "Adequate, Helvetica Neue, Helvetica, sans-serif",
  }}
>
  Selected Date: {selectedDates.join(", ")}
</Typography>
        <Typography
          color="#333"
          sx={{
            fontFamily: "acumin-pro, sans-serif",
            fontWeight: 100,
            fontSize: { xs: "11px", md: "14px" },
            lineHeight: "1.8rem",
          }}
        >      
          <div style={{ display: "flex", marginTop: "10px" }}>
          <Chip
                label={`Class: ${data.courseClass?.label}`}
                color="primary"
                variant="contained"
                sx={{ marginRight: "8px" }}
              />
                <Chip
                label={`Type: ${data.courseType?.label}`}
                color="primary"
                variant="contained"
                sx={{ marginRight: "8px" }}
              />
                <Chip
                label={`Duration: ${data.duration?.label}`}
                color="primary"
                variant="contained"
                sx={{ marginRight: "8px" }}
              />
          </div>
        </Typography>
        <br />
       
      </Grid>
     
      <Grid item xs={12}>
        <Divider sx={{ marginTop: "-20px", marginBottom:"5px" }} />
      </Grid>
      <Grid item xs={12}>
       {totalAmount? (
           <Typography variant="h4" gutterBottom>
           Proceed to pay Amount: € {totalAmount}
         </Typography>
       ): ( <DateSelector data={data} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>)}
      </Grid>
    </Grid>
  );
};

export default SmallOneClass;
