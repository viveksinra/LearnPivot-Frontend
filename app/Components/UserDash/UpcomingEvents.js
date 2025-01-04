// UpcomingEvents.js
import React, { useEffect, useState } from 'react';
import { Grid, Card, Box, Chip, Typography, Stack } from '@mui/material';
import { PersonOutline, CalendarToday, AccessTimeOutlined } from '@mui/icons-material';
import moment from 'moment';
import { reportService } from '@/app/services';

const EventCard = ({ item, type, getSubjectColor }) => (
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
      <Chip 
        label={item.subject}
        size="small"
        sx={{ 
          mb: 2,
          bgcolor: `${getSubjectColor(item.subject)}15`,
          color: getSubjectColor(item.subject),
          fontWeight: 500
        }}
      />
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        {type === 'class' ? item.title : `${item.subject} Mock Test`}
      </Typography>
      {type === 'class' ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
            <PersonOutline sx={{ fontSize: 20 }} />
            <Typography>{item.teacher}</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Chip 
              icon={<CalendarToday sx={{ fontSize: 18 }} />} 
              label={moment(item.date).format('MMM DD')}
              size="small"
              sx={{ bgcolor: 'grey.100' }}
            />
            <Chip 
              icon={<AccessTimeOutlined sx={{ fontSize: 18 }} />} 
              label={item.time}
              size="small"
              sx={{ bgcolor: 'grey.100' }}
            />
          </Stack>
        </>
      ) : (
        <>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {item.totalQuestions} Questions • {item.duration}
          </Typography>
          <Chip 
            icon={<CalendarToday sx={{ fontSize: 18 }} />} 
            label={moment(item.date).format('MMM DD, YYYY')}
            size="small"
            sx={{ bgcolor: 'grey.100' }}
          />
        </>
      )}
    </Box>
  </Card>
);
  const getSubjectColor = (subject) => {
    const colors = {
      Mathematics: theme.palette.primary.main,
      Physics: theme.palette.success.main,
      Science: theme.palette.error.main
    };
    return colors[subject] || theme.palette.grey[600];
  };
export const UpcomingEvents = ({ selectedChild }) =>{ 

  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [mockTests, setMockTests] = useState([]);
  
    useEffect(() => {
      handleGetAllPayment();
    }, [selectedChild]);
  
    const handleGetAllPayment = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await reportService.getUpcomingEvent({ childId: selectedChild });
        if (response?.myData) {

        if (response?.myData?.upcomingBookings) {
          const { myBuyCourse, myBuyMock } = response?.myData?.upcomingBookings;
          console.log('formattedPayments');
  
          const formattedPayments = await formatPaymentData(myBuyCourse, myBuyMock);
          console.log('formattedPayments', formattedPayments);
          setPayments(formattedPayments);
        }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch payment history. Please try again later.');
        snackRef.current?.handleSnack({ 
          message: 'Failed to fetch payment history.', 
          variant: 'error' 
        });
      } finally {
        setLoading(false);
      }
    };

    
  return (
  <>
    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Upcoming Classes</Typography>
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {classes.map((class_) => (
        <Grid item xs={12} md={6} lg={4} key={class_.id}>
          <EventCard item={class_} type="class" getSubjectColor={getSubjectColor} />
        </Grid>
      ))}
    </Grid>

    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Upcoming Mock Tests</Typography>
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {mockTests.map((test) => (
        <Grid item xs={12} md={6} lg={4} key={test.id}>
          <EventCard item={test} type="test" getSubjectColor={getSubjectColor} />
        </Grid>
      ))}
    </Grid>
  </>
)};