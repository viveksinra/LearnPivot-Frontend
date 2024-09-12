import React, { useState } from "react";
import { Divider, Grid, Typography, Chip, Button, Dialog, Paper } from "@mui/material";
import Link from "next/link";

const OneClass = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper 
      elevation={3}
      sx={{ padding: "20px", marginBottom: "20px", borderRadius: "8px", transition: "transform 0.2s", '&:hover': { transform: "scale(1.02)" }}}
    >
      <Grid container key={data._id} spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={data.url}
            className="creativeImg"
            alt={data.courseTitle}
            onClick={handleClickOpen}
            style={{ cursor: "pointer", transition: "transform 0.2s", maxWidth: "100%", height: "auto" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Grid>

        <Grid item xs={12} md={8}>
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
            <Grid container spacing={0} sx={{ marginTop: "10px" }}>
              <Grid item xs={12} sm={2.3} sx={{ marginTop: "10px" }}>
                <Chip
                  label={`Class: ${data.courseClass?.label}`}
                  color="primary"
                  variant="contained"
                  sx={{ marginRight: "8px" }}
                />
              </Grid>
              <Grid item xs={12} sm={3} sx={{ marginTop: "10px" }}>
                <Chip
                  label={`Type: ${data.courseType?.label}`}
                  color="primary"
                  variant="contained"
                  sx={{ marginRight: "8px" }}
                />
              </Grid>
              <Grid item xs={12} sm={3.5} sx={{ marginTop: "10px" }}>
                <Chip
                  label={`Duration: ${data.duration?.label}`}
                  color="primary"
                  variant="contained"
                  sx={{ marginRight: "8px" }}
                />
              </Grid>
            </Grid>
          </Typography>
          <br />
          <div style={{ display: "flex" }}>
            <Link href={"/course/buy/" + data._id}>
              <button className="viewBtn">Quick Buy</button>
            </Link>
            <span style={{ flexGrow: 0.1 }} />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ marginTop: "-20px", marginBottom: "15px" }} />
        </Grid>

        {/* Dialog for image enlargement */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="xl" // Setting maxWidth to extra-large
          fullWidth // Allowing the dialog to take the full width
        >
          <img
            src={data.url}
            alt={data.courseTitle}
            style={{
              width: "100%", // Take full width of the dialog
              height: "auto", // Maintain aspect ratio
              maxHeight: "90vh", // Ensure it doesn't exceed the viewport height
            }}
          />
        </Dialog>
      </Grid>
    </Paper>
  );
};

export default OneClass;
