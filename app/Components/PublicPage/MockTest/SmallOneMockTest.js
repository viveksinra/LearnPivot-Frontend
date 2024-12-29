import React from "react";
import { Divider, Grid, Typography, Chip } from "@mui/material";
import MtBatchSelector from "./MtBatchSelector";
import ImageCarousel from "../../Common/ImageCarousel";
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import TimerIcon from '@mui/icons-material/Timer';
import EventIcon from '@mui/icons-material/Event';

const StyledChip = styled(Chip)(({ theme }) => ({
  '&.batch-chip': {
    backgroundColor: '#F3E8FF',
    color: '#6B21A8',
    fontWeight: 500,
    '& .MuiChip-icon': {
      color: '#6B21A8',
    }
  },
  '&.info-chip': {
    backgroundColor: '#EFF6FF',
    color: '#1D4ED8',
    height: '28px',
    '& .MuiChip-icon': {
      color: '#1D4ED8',
    }
  }
}));

const SmallOneMockTest = ({ data, totalAmount, selectedBatch }) => {
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
        {/* Title Section */}
        <Typography
          color="#0F172A"
          gutterBottom
          sx={{
            fontSize: { xs: "18px", md: "20px" },
            fontWeight: 600,
            lineHeight: 1.3,
            fontFamily: "Adequate, Helvetica Neue, Helvetica, sans-serif",
            mb: 2,
          }}
        >
          {data.mockTestTitle}
        </Typography>

        {/* Selected Batches with icon */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          {selectedBatch.map((batch) => (
            <StyledChip
              key={batch.id}
              icon={<EventIcon />}
              className="batch-chip"
              label={`${batch.date} (${batch.startTime} - ${batch.endTime})`}
            />
          ))}
        </div>

        {/* Test Information with icons */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "8px",
        }}>

          {data.testType?.label && (
            <StyledChip
              icon={<SchoolIcon />}
              className="info-chip"
              label={data.testType.label}
              size="small"
            />
          )}
 
        </div>
      </Grid>
      
      {/* Divider remained unchanged as requested */}
      <Grid item xs={12}>
        <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
      </Grid>
    </Grid>
  );
};

export default SmallOneMockTest;