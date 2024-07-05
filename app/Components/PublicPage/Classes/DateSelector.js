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

const DateSelector = ({ data,selectedDates,setSelectedDates }) => {
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
//   const dates = [
//     ["2024-03-11", "2024-03-15", "2024-03-19","2024-03-24"],
//     ["2024-04-02", "2024-04-09", "2024-04-14"]
//   ];

  // Get today's date
  const today = new Date();

  useEffect(() => {
    // Find the first date that is after today
    for (let batchIndex = 0; batchIndex < data?.dates.length; batchIndex++) {
      for (let dateIndex = 0; dateIndex < data?.dates[batchIndex].length; dateIndex++) {
        const date = new Date(data?.dates[batchIndex][dateIndex]);
        if (date > today) {
          setSelectedBatches([batchIndex]);
          setStartDate(data?.dates[batchIndex][dateIndex]);
          setAvailableDates(data?.dates[batchIndex].slice(dateIndex));
          setSelectedDates(data?.dates[batchIndex].slice(dateIndex));
          return;
        }
      }
    }
  }, []);

  const handleBatchSelect = (batchIndex) => {
    if (selectedBatches.includes(batchIndex)) {
      setSelectedBatches(selectedBatches.filter(index => index !== batchIndex));
    } else {
      setSelectedBatches([...selectedBatches, batchIndex].sort());
    }
  };

  useEffect(() => {
    if (selectedBatches.length > 0) {
      const batchDates = data?.dates[selectedBatches[0]].filter(date => new Date(date) > today);
      setAvailableDates(batchDates);
      if (batchDates.length > 0) {
        setStartDate(batchDates[0]);
      }
      const selBaDates = selectedBatches.flatMap(batchIndex => 
        data?.dates[batchIndex].filter(date => new Date(date) > today)
      );         
      if (selBaDates.length > 0) {
        setSelectedDates(selBaDates);
      }
    }
  }, [selectedBatches]);

  const isBatchSelected = (batchIndex) => {
    return selectedBatches.includes(batchIndex);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    const selBaDates = selectedBatches.flatMap(batchIndex => 
        data?.dates[batchIndex].filter(date => new Date(date) >= new Date(event.target.value))
      );         
      if (selBaDates.length > 0) {
        setSelectedDates(selBaDates);
      }
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="start-date-label">Start Date</InputLabel>
          <Select
            labelId="start-date-label"
            id="start-date-select"
            value={startDate}
            onChange={handleStartDateChange}
          >
            {availableDates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {data?.dates.map((batch, batchIndex) => (
        <Grid item xs={12} key={batchIndex}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              backgroundColor: isBatchSelected(batchIndex)
                ? "#f0f0f0"
                : "inherit"
            }}
          >
            <Grid container alignItems="center">
              <Checkbox
                checked={isBatchSelected(batchIndex)}
                onChange={() => handleBatchSelect(batchIndex)}
              />
              <Typography variant="h6">Batch {batchIndex + 1}</Typography>
            </Grid>
            <Divider style={{ margin: "8px 0" }} />
            <Grid container spacing={2}>
              {batch.map((date, dateIndex) => (
                <Grid item xs={4} key={date}>
                  <Typography variant="body1">{date}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      ))}
  
    </Grid>
  );
};

export default DateSelector;
