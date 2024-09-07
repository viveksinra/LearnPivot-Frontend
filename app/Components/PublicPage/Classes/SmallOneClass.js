import React from "react";
import { Divider, Grid, Typography, Chip } from "@mui/material";
import ProceedToPayButton from "./SubmitButton";

const formatDateToShortMonth = (dates) => {
  return dates.map(date => new Date(date).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' }));
};

const SmallOneClass = ({ data, totalAmount, selectedDates, setSelectedDates }) => {

  const formattedDates = formatDateToShortMonth(selectedDates);

  return (
    <Grid container key={data._id} spacing={2} direction="column" sx={{ marginTop:'10px',padding: '10px' }}>
      <Grid item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <img
          src={data.url}
          className="creativeImg"
          alt={data.courseTitle}
          style={{
            width: '100%', 
            height: 'auto', 
            maxWidth: '100%', 
            borderRadius: '8px', // To add a little styling to image
            objectFit: 'contain', // Ensure the image fits within its container
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          color="#082952"
          gutterBottom
          sx={{
            fontSize: { xs: "16px", md: "20px" },
            fontWeight: 600,
            lineHeight: "24px",
            fontFamily: "Adequate, Helvetica Neue, Helvetica, sans-serif",
            textAlign: { xs: "center", md: "left" }, // Center text on mobile for better alignment
          }}
        >
          {data.courseTitle}
        </Typography>
        </Grid>

        <Grid item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "10px", marginBottom: "10px" }}>
          <Chip
            label={`Class: ${data.courseClass?.label}`}
            color="primary"
            variant="contained"
            sx={{ marginRight: "8px", marginBottom: "8px" }}
          />
          <Chip
            label={`Type: ${data.courseType?.label}`}
            color="primary"
            variant="contained"
            sx={{ marginRight: "8px", marginBottom: "8px" }}
          />
          <Chip
            label={`Duration: ${data.duration?.label}`}
            color="primary"
            variant="contained"
            sx={{ marginRight: "8px", marginBottom: "8px" }}
          />
        </div>
        </Grid>
        <Grid item xs={12}>
        <Typography
          color="#082952"
          gutterBottom
          sx={{
            fontSize: { xs: "12px", md: "15px" },
            fontWeight: 200,
            fontFamily: "Adequate, Helvetica Neue, Helvetica, sans-serif",
          }}
        >
          Selected Date: {selectedDates?.length ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {formattedDates.map((date, index) => (
                <Chip key={index} label={date} variant="outlined" />
              ))}
            </div>
          ) : 'No date selected'}
        </Typography>

        <Divider sx={{ marginTop: "10px", marginBottom: "5px" }} />
        
        {totalAmount && (
          <Typography variant="h6" gutterBottom sx={{ textAlign: { xs: "center", md: "left" } }}>
            Proceed to pay Amount: £ {totalAmount}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default SmallOneClass;
