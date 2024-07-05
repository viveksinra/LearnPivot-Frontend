import React, { useState } from "react";
import { Divider, Grid, Typography, Chip, Button } from "@mui/material";
import Link from "next/link";
const OneClass = ({ data }) => {

  return (
    <Grid container key={data._id} spacing={4}>
      <Grid item xs={12} md={4}>
        <img
          src={data.url}
          className="creativeImg"
          alt={data.courseTitle}
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
          from {data.firstDate} @ {data.startTime} to {data.endTime}
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
        {data.shortDescription}
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
        <div style={{ display: "flex" }}>
        <Link href={"/course/buy/" + data._id}>
        <button className="viewBtn">Quick Buy</button></Link>
          <span style={{ flexGrow: 0.1 }} />
          
        </div>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginTop: "-20px", marginBottom:"15px" }} />
      </Grid>
    </Grid>
  );
};

export default OneClass;
