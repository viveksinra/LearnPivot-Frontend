import React, { useState } from "react";
import { Divider, Grid, Typography, Chip, Button } from "@mui/material";
import MtBatchSelector from "./MtBatchSelector";
const SmallOneMockTest = ({ data,totalAmount, selectedBatch,setSelectedBatch }) => {
console.log({ data,totalAmount, selectedBatch,setSelectedBatch })
  return (
    <Grid container key={data._id} spacing={4}>
      <Grid item xs={12} md={4}>
        <img
          src={data.url}
          className="creativeImg"
          alt={data.mockTestTitle}
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
         {data.mockTestTitle}
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
  Selected Batch: {selectedBatch
    .map((batch) => `${batch.date} (${batch.startTime} - ${batch.endTime})`)
    .join(", ")}
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
                label={`Class: ${data.testClass?.label}`}
                color="primary"
                variant="contained"
                sx={{ marginRight: "8px" }}
              />
                <Chip
                label={`Type: ${data.testType?.label}`}
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
       ): ( 
        <>
       <MtBatchSelector data={data} selectedBatch={selectedBatch} setSelectedBatch={setSelectedBatch}/>

        </>
       )}
      </Grid>
    </Grid>
  );
};

export default SmallOneMockTest;
