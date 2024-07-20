import React, { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Typography,
  Checkbox,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import MockPayButton from "./MockPayButton";

const MtBatchSelector = ({ data, setSubmitted, setSubmittedId, selectedChild, setTotalAmount, totalAmount, selectedBatch, setSelectedBatch }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date

  useEffect(() => {
    // Automatically select the next available batch based on today's date
    const upcomingBatch = data.batch.find(batch => new Date(batch.date) >= today && !batch.filled);
    if (upcomingBatch && !selectedBatch.some(b => b._id === upcomingBatch._id)) {
      setSelectedBatch([...selectedBatch, upcomingBatch]);
    }
  }, [ ]);

  const handleCheckboxChange = (batch) => {
    const isSelected = selectedBatch.some(b => b._id === batch._id);

    if (isSelected) {
      setSelectedBatch(selectedBatch.filter(b => b._id !== batch._id));
    } else if (!batch.filled && new Date(batch.date) >= today) {
      setSelectedBatch([...selectedBatch, batch]);
    }
  };

  const isBatchSelectable = (batch) => {
    return !batch.filled && new Date(batch.date) >= today;
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: "10px", marginBottom: "20px" }}>
        {data.batch.map((batch) => (
          <Grid item xs={12} key={batch._id}>
            <Paper elevation={3} style={{ padding: "10px" }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">{`Date: ${batch.date}`}</Typography>
                  <Typography>{`Time: ${batch.startTime} - ${batch.endTime}`}</Typography>
                  <Typography>{`Total Seats: ${batch.totalSeat}`}</Typography>
                  <Typography>{`Total Price: ${batch.oneBatchprice}`}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Checkbox
                    checked={selectedBatch.some(b => b._id === batch._id)}
                    onChange={() => handleCheckboxChange(batch)}
                    disabled={!isBatchSelectable(batch)}
                  />
                  <Typography color="error">
                    {!isBatchSelectable(batch) ? "Booking Full" : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <MockPayButton
        data={data}
        setSubmitted={setSubmitted}
        setSubmittedId={setSubmittedId}
        setTotalAmount={setTotalAmount}
        totalAmount={totalAmount}
        selectedBatch={selectedBatch}
        selectedChild={selectedChild}
      />
    </>
  );
};

export default MtBatchSelector;
