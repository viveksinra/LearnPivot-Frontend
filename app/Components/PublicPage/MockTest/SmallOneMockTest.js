import React from "react";
import { Box, Card, CardMedia, Typography, Chip, useTheme, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { styled } from '@mui/material/styles';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  '&.batch-chip': {
    backgroundColor: '#F3E8FF',
    color: '#6B21A8',
    fontWeight: 500,
    fontSize: '0.875rem',
    '& .MuiChip-icon': {
      color: '#6B21A8',
    }
  },
  '&.info-chip': {
    backgroundColor: '#EFF6FF',
    color: '#1D4ED8',
    height: '28px',
    fontSize: '0.875rem',
    '& .MuiChip-icon': {
      color: '#1D4ED8',
    }
  }
}));

const SmallOneMockTest = ({ data, totalAmount, selectedBatch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledCard style={{ marginTop: isMobile ? '40px' : '' }}>
      <Box sx={{ position: 'relative', width: '100%', height: isMobile ? '200px' : '300px' }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          style={{ height: '100%' }}
        >
          {data.imageUrls.map((image, index) => (
            <SwiperSlide key={index}>
              <CardMedia
                component="img"
                image={image}
                alt={`${data.mockTestTitle} - Image ${index + 1}`}
                sx={{
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box sx={{ p: 2.5 }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            fontWeight: 600,
            color: '#0F172A',
            mb: 2,
            lineHeight: 1.4,
            fontFamily: '"Adequate", "Helvetica Neue", Helvetica, sans-serif',
          }}
        >
          {data.mockTestTitle}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 
        }}>
          {selectedBatch.length > 0 && (
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1 
            }}>
              {selectedBatch.map((batch) => (
                <StyledChip
                  key={batch.id}
                  icon={<CalendarTodayIcon />}
                  className="batch-chip"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography component="span" sx={{ fontSize: '0.875rem' }}>
                        {batch.date}
                      </Typography>
                      <AccessTimeIcon sx={{ fontSize: '1rem' }} />
                      <Typography component="span" sx={{ fontSize: '0.875rem' }}>
                        {batch.startTime} - {batch.endTime}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Box>
          )}

          {data.testType?.label && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <StyledChip
                icon={<SchoolIcon />}
                className="info-chip"
                label={data.testType.label}
              />
            </Box>
          )}
        </Box>
      </Box>
    </StyledCard>
  );
};

export default SmallOneMockTest;