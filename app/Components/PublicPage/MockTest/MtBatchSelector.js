import React, { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Typography,
  Checkbox,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MockPayButton from "./MockPayButton";

const MtBatchSelector = ({ 
  data, 
  setSubmitted, 
  setSubmittedId, 
  selectedChild, 
  setTotalAmount, 
  totalAmount, 
  selectedBatch, 
  setSelectedBatch 
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const upcomingBatch = data.batch.find(batch => new Date(batch.date) >= today && !batch.filled);
    if (upcomingBatch && !selectedBatch.some(b => b._id === upcomingBatch._id)) {
      setSelectedBatch([...selectedBatch, upcomingBatch]);
    }
  }, []);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
        {data.batch.map((batch) => {
          const isSelected = selectedBatch.some(b => b._id === batch._id);
          const isSelectable = isBatchSelectable(batch);

          return (
            <Grid item xs={12} key={batch._id}>
              <Paper
                elevation={isSelected ? 3 : 1}
                sx={{
                  p: 2.5,
                  backgroundColor: isSelected ? '#F0F9FF' : '#ffffff',
                  border: '1px solid',
                  borderColor: isSelected ? '#BAE6FD' : '#E5E7EB',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  cursor: isSelectable ? 'pointer' : 'default',
                  opacity: isSelectable ? 1 : 0.7,
                  '&:hover': isSelectable ? {
                    borderColor: '#7DD3FC',
                    backgroundColor: '#F0F9FF',
                    transform: 'translateY(-2px)',
                  } : {},
                }}
                onClick={() => isSelectable && handleCheckboxChange(batch)}
              >
                <Grid container spacing={2}>
                  {/* Checkbox Column */}
                  <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton 
                      disabled={!isSelectable}
                      size="large"
                      sx={{ color: isSelected ? '#0EA5E9' : '#94A3B8' }}
                    >
                      {isSelected ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                    </IconButton>
                  </Grid>

                  {/* Info Column */}
                  <Grid item xs={11}>
                    <Grid container spacing={2}>
                      {/* Date and Time */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventIcon sx={{ color: '#64748B' }} />
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                color: '#1E293B',
                                fontWeight: 500
                              }}
                            >
                              {formatDate(batch.date)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon sx={{ color: '#64748B' }} />
                            <Typography 
                              sx={{ 
                                color: '#64748B',
                                fontSize: '0.875rem'
                              }}
                            >
                              {batch.startTime} - {batch.endTime}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Seats and Price */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupIcon sx={{ color: '#64748B' }} />
                            <Typography 
                              sx={{ 
                                color: '#64748B',
                                fontSize: '0.875rem'
                              }}
                            >
                              Total Seats: {batch.totalSeat}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AttachMoneyIcon sx={{ color: '#64748B' }} />
                            <Typography 
                              sx={{ 
                                color: '#059669',
                                fontWeight: 600,
                                fontSize: '0.875rem'
                              }}
                            >
                              £{batch.oneBatchprice}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Status Message */}
                    {!isSelectable && (
                      <Typography 
                        sx={{ 
                          color: '#DC2626',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          mt: 1
                        }}
                      >
                        Booking Full
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
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