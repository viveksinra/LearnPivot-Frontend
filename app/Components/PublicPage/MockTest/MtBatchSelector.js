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

const MtBatchSelector = ({ data, selectedBatch, setSelectedBatch }) => {
  const today = new Date();

  const handleCheckboxChange = (batch) => {
    const isSelected = selectedBatch.some((b) => b._id === batch._id);

    if (isSelected) {
      setSelectedBatch(selectedBatch.filter((b) => b._id !== batch._id));
    } else if (!batch.filled && new Date(batch.date) >= today) {
      setSelectedBatch([...selectedBatch, batch]);
    }
  };

  const isBatchSelectable = (batch) => {
    if (batch.filled || new Date(batch.date) < today) {
      return false;
    }
    const isDateSelected = selectedBatch.some((b) => b.date === batch.date);
    return !isDateSelected;
  };

  return (
    <Grid container spacing={2}>
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
                  checked={selectedBatch.some((b) => b._id === batch._id)}
                  onChange={() => handleCheckboxChange(batch)}
                  disabled={!isBatchSelectable(batch)}
                />
                <Typography color="error">
                  {batch.filled || new Date(batch.date) < today
                    ? "Filled"
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MtBatchSelector;
