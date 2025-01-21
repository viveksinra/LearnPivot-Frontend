import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Grid,
  Button
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MockPayButton from "./MockPayButton";
import { mockTestService } from "@/app/services";

const MtBatchSelector = ({ 
  data, 
  setStep,
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

  const [loading, setLoading] = useState(true);
  const [alreadyBoughtBatch, setAlreadyBoughtBatch] = useState([]);
console.log({data})
  useEffect(() => {
    const upcomingBatch = data.batch.find(batch => new Date(batch.date) >= today && !batch.filled && !alreadyBoughtBatch.some(b => b._id === batch._id));
    if (upcomingBatch && !selectedBatch.some(b => b._id === upcomingBatch._id)) {
      setSelectedBatch([...selectedBatch, upcomingBatch]);
    }
    console.log({upcomingBatch})
  }, [ alreadyBoughtBatch]);

  useEffect(() => {
    const newTotalAmount = selectedBatch.reduce((sum, batch) => {
      return sum + Number(batch.oneBatchprice);
    }, 0);
    setTotalAmount(newTotalAmount);
  }, [selectedBatch]);

  const handleCheckboxChange = (batch) => {
    const isSelected = selectedBatch.some(b => b._id === batch._id);
    if (isSelected) {
      setSelectedBatch(selectedBatch.filter(b => b._id !== batch._id));
    } else if (!batch.filled && new Date(batch.date) >= today) {
      setSelectedBatch([...selectedBatch, batch]);
    }
  };

  const isBatchSelectable = (batch) => {
    return !batch.filled && new Date(batch.date) >= today && !alreadyBoughtBatch.some(b => b._id === batch._id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

    async function getBoughtBatch() {
      setLoading(true)
    try{
      let res = await mockTestService.alreadyBoughtMock({childId:selectedChild._id,id:`${data._id}`});
    
      if (res.variant === "success") {
        setAlreadyBoughtBatch(res.data)
        setSelectedBatch([])
      } else {
        alert(res);
        console.log(res);
      }
    }catch (error) {
      console.error("Error fetching data:", error);
    }   
      setLoading(false)

    }
    useEffect(() => {
  
 
        getBoughtBatch();
    }, [selectedChild]);
  

  return (
    <Box sx={{ position: 'relative', pb: '80px' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => setStep(2)}

          sx={{ 
            width: '20%',
            minWidth: 'auto',
            color: 'white', backgroundColor: '#fc7658', '&:hover': { backgroundColor: 'darkred' }
          }}
        >
          Back
        </Button>
        <Typography variant="h5" sx={{ width: '80%', fontWeight: 400 }}>
          Select Batches for child:  <span style={{ fontWeight: 'bold' }}>{selectedChild.childName}</span>
        </Typography>
      </Box>

      {/* Batch list */}
      <Grid container spacing={2}>
        {data.batch.map((batch) => {
          const isSelected = selectedBatch.some(b => b._id === batch._id);
          const isSelectable = isBatchSelectable(batch);
          const isAlreadyBought = alreadyBoughtBatch?.some(b => b._id === batch._id);

          return (
            <Grid item xs={12} key={batch._id} >
              <Paper
                elevation={isSelected ? 3 : 1}
                sx={{
                  p: 2.5,
                  backgroundColor: isSelected ? '#F0F9FF' : '#ffffff',
                  border: '1px solid',
                  borderColor: isSelected ? '#BAE6FD' : isSelectable ? '#059669' : '#DC2626',
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
                    <Grid container spacing={2} >
                      {/* Date and Time */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, }}>
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
                          <CurrencyPoundIcon sx={{ color: '#64748B' }} />
                            <Typography 
                              sx={{ 
                                color: '#059669',
                                fontWeight: 600,
                                fontSize: '0.875rem'
                              }}
                            >
                              {batch.oneBatchprice}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Seats and Price */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>    
                         
                      <Typography 
                        sx={{ 
                          color: isSelectable ? '#059669' : '#DC2626',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          mt: 1
                        }}
                      >
                        {isSelectable? "Available" : isAlreadyBought ? `Already Booked for ${selectedChild.childName}` : 'Booking Full'}
                      </Typography>
                        
                          {/* <GroupIcon sx={{ color: '#64748B' }} />
                            <Typography 
                              sx={{ 
                                color: '#64748B',
                                fontSize: '0.875rem'
                              }}
                            >
                             Total Seats: {batch.totalSeat}
                            </Typography> */}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Status Message */}
             
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Sticky Payment Button */}
      <Box 
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTop: '1px solid #E5E7EB',
          padding: 2,
          zIndex: 1000,
        }}
      >
        <MockPayButton
          data={data}
          setSubmitted={setSubmitted}
          setSubmittedId={setSubmittedId}
          setTotalAmount={setTotalAmount}
          totalAmount={totalAmount}
          selectedBatch={selectedBatch}
          selectedChild={selectedChild}
        />
      </Box>
    </Box>
  );
};

export default MtBatchSelector;