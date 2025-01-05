import React, { useEffect, useRef, useState } from 'react';
import { Grid, Card, Box, Chip, Typography, Stack } from '@mui/material';
import { PersonOutline, CalendarToday, AccessTimeOutlined, LocationOn } from '@mui/icons-material';
import moment from 'moment';
import { reportService } from '@/app/services';

const EventCard = ({ item, getSubjectColor }) => {
  const isClass = item.type === 'class';
  
  return (
    <Card sx={{ 
      p: 3,
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
      }
    }}>
      <Box>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip 
            label={isClass ? "Class" : "Mock Test"}
            size="small"
            sx={{ 
              bgcolor: isClass ? 'primary.light' : 'secondary.light',
              color: isClass ? 'primary.main' : 'secondary.main',
              fontWeight: 500
            }}
          />

        </Stack>

        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          {isClass ? item.courseTitle : item.testTitle}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
          <PersonOutline sx={{ fontSize: 20 }} />
          <Typography>{item.studentName} ({item.studentYear})</Typography>
        </Box>

        <Stack direction="column" spacing={1}>
          <Chip 
            icon={<CalendarToday sx={{ fontSize: 18 }} />} 
            label={moment(item.date).format('MMM DD, YYYY')}
            size="small"
            sx={{ bgcolor: 'grey.100' }}
          />
          <Chip 
            icon={<AccessTimeOutlined sx={{ fontSize: 18 }} />} 
            label={`${item.startTime} - ${item.endTime}`}
            size="small"
            sx={{ bgcolor: 'grey.100' }}
          />
          {!isClass && item.location && (
            <Chip 
              icon={<LocationOn sx={{ fontSize: 18 }} />} 
              label={item.location}
              size="small"
              sx={{ bgcolor: 'grey.100' }}
            />
          )}
        </Stack>
        

      </Box>
    </Card>
  );
};

export const UpcomingEvents = ({ selectedChild }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState({ classes: [], mockTests: [] });
  const snackRef = useRef();

  useEffect(() => {
    handleGetAllEvents();
  }, [selectedChild]);

  const handleGetAllEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reportService.getUpcomingEvent({ childId: selectedChild });
      
      if (response?.myData?.upcomingBookings) {
        setEvents(response.myData.upcomingBookings);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch upcoming events. Please try again later.');
      snackRef.current?.handleSnack({ 
        message: 'Failed to fetch upcoming events.', 
        variant: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Upcoming Classes</Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {events.classes.map((class_) => (
          <Grid item xs={12} md={6} lg={4} key={class_.bookingId}>
            <EventCard item={class_} />
          </Grid>
        ))}
        {events.classes.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">No upcoming classes</Typography>
          </Grid>
        )}
      </Grid>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Upcoming Mock Tests</Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {events.mockTests.map((test) => (
          <Grid item xs={12} md={6} lg={4} key={test.bookingId}>
            <EventCard item={test} />
          </Grid>
        ))}
        {events.mockTests.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">No upcoming mock tests</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default UpcomingEvents;