import React from "react";
import { Divider, Grid, Typography, Chip } from "@mui/material";
import ProceedToPayButton from "./SubmitButton";

const formatDateToShortMonth = (dates) => {
  return dates.map(date => new Date(date).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' }));
};

const SmallOneClass = ({ data, totalAmount, selectedDates, setSelectedDates }) => {
  console.log({ data, totalAmount, selectedDates, setSelectedDates });

  const formattedDates = formatDateToShortMonth(selectedDates);

  return (
    <Grid container key={data._id} spacing={4} direction="column">
      <Grid item xs={12}>
        <img
          src={data.url}
          className="creativeImg"
          alt={data.courseTitle}
          style={{ width: '100%', height: 'auto' }} 
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
          {data.courseTitle}
        </Typography>
        <div style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {formattedDates.map((date, index) => (
                <Chip key={index} label={date} variant="outlined" />
              ))}
            </div>
          ) : 'No date selected'}
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
      
        </Typography>
        <Divider sx={{ marginTop: "10px", marginBottom: "5px" }} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <ProceedToPayButton />
        </div>
        <Divider sx={{ marginTop: "10px", marginBottom: "5px" }} />
        {totalAmount && (
          <Typography variant="h4" gutterBottom>
            Proceed to pay Amount: € {totalAmount}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default SmallOneClass;
