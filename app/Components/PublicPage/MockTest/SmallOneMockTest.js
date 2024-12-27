import React from "react";
import { Divider, Grid, Typography, Chip } from "@mui/material";
import MtBatchSelector from "./MtBatchSelector";
import ImageCarousel from "../../Common/ImageCarousel";

const SmallOneMockTest = ({ data, totalAmount, selectedBatch }) => {
  console.log({ data, totalAmount, selectedBatch });

  return (
    <Grid container key={data._id} spacing={4} direction="column">
      <Grid item xs={12} style={{maxWidth:"500px"}}>
      <ImageCarousel
          images={data.imageUrls}
          title={data.mockTestTitle}
          height="300px"
          autoplayDelay={6000}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          color="#082952"
          gutterBottom
          sx={{
            fontSize: { xs: "18px", md: "20px" },
            fontWeight: 600,
            lineHeight: "20px",
            fontFamily: "Adequate, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          {data.mockTestTitle}
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
          {selectedBatch.map((batch) => (
            <Chip
              key={batch.id}
              label={`${batch.date} (${batch.startTime} - ${batch.endTime})`}
              color="primary"
              variant="outlined"
            />
          ))}
        </div>
        <Typography
          color="#333"
          sx={{
            fontFamily: "acumin-pro, sans-serif",
            fontWeight: 100,
            fontSize: { xs: "11px", md: "14px" },
            lineHeight: "1.8rem",
            marginTop: "20px"
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <Chip
              label={`Class: ${data.testClass?.label}`}
              color="primary"
              variant="contained"
            />
            <Chip
              label={`Type: ${data.testType?.label}`}
              color="primary"
              variant="contained"
            />
            <Chip
              label={`Duration: ${data.duration?.label}`}
              color="primary"
              variant="contained"
            />
          </div>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
      </Grid>
    </Grid>
  );
};

export default SmallOneMockTest;
