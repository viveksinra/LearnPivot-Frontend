import React, { useEffect, useRef, useState } from 'react';
import { 
  Grid, Card, Box, Chip, Typography, Stack, Button, 
  Skeleton, Container, useTheme 
} from '@mui/material';
import { 
  PersonOutline, CalendarToday, AccessTimeOutlined, 
  LocationOn, School, QuizOutlined 
} from '@mui/icons-material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { reportService } from '@/app/services';

const LoadingSkeleton = () => (
  <Grid container spacing={3}>
    {[1, 2, 3].map((item) => (
      <Grid item xs={12} md={6} lg={4} key={item}>
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" width={80} height={24} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width="80%" />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="60%" />
            <Stack spacing={1}>
              <Skeleton variant="rectangular" height={32} width="100%" />
              <Skeleton variant="rectangular" height={32} width="100%" />
              <Skeleton variant="rectangular" height={32} width="100%" />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const EmptyState = ({ type, onButtonClick }) => {
  const isClass = type === 'class';
  
  return (
    <Card 
      sx={{ 
        p: 4, 
        textAlign: 'center',
        borderRadius: 3,
        bgcolor: 'grey.50'
      }}
    >
      <Box sx={{ mb: 3 }}>
        {isClass ? (
          <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        ) : (
          <QuizOutlined sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
        )}
        <Typography variant="h6" gutterBottom>
          No Upcoming {isClass ? 'Classes' : 'Mock Tests'}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {isClass 
            ? "Ready to start learning? Book your first class today!" 
            : "Practice makes perfect. Book a mock test to assess your progress!"}
        </Typography>
        <Button
          variant="contained"
          color={isClass ? "primary" : "secondary"}
          onClick={() => onButtonClick(isClass ? '/course' : '/mockTest')}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            px: 4
          }}
        >
          Browse {isClass ? 'Courses' : 'Mock Tests'}
        </Button>
      </Box>
    </Card>
  );
};

const EventCard = ({ item }) => {
  const theme = useTheme();
  const isClass = item.type === 'class';
  
  return (
    <Card sx={{ 
      p: 3,
      height: '100%',
      borderRadius: 3,
      position: 'relative',
      overflow: 'visible',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        bgcolor: isClass ? 'primary.main' : 'secondary.main',
        borderRadius: '3px 3px 0 0'
      },
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[10]
      }
    }}>
      <Stack spacing={2.5}>
        <Box>
          <Chip 
            label={isClass ? "Class" : "Mock Test"}
            size="small"
            sx={{ 
              bgcolor: isClass ? 'primary.lighter' : 'secondary.lighter',
              color: isClass ? 'primary.dark' : 'secondary.dark',
              fontWeight: 600,
              mb: 2
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.4 }}>
            {isClass ? item.courseTitle : item.testTitle}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          color: 'text.secondary' 
        }}>
          <PersonOutline sx={{ fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {item.studentName} ({item.studentYear})
          </Typography>
        </Box>

        <Stack spacing={1.5}>
          <Chip 
            icon={<CalendarToday />}
            label={moment(item.date).format('dddd, MMM DD, YYYY')}
            size="small"
            sx={{ 
              bgcolor: 'grey.50',
              '& .MuiChip-icon': { fontSize: 16 }
            }}
          />
          <Chip 
            icon={<AccessTimeOutlined />}
            label={`${item.startTime} - ${item.endTime}`}
            size="small"
            sx={{ 
              bgcolor: 'grey.50',
              '& .MuiChip-icon': { fontSize: 16 }
            }}
          />
          {!isClass && item.location && (
            <Chip 
              icon={<LocationOn />}
              label={item.location}
              size="small"
              sx={{ 
                bgcolor: 'grey.50',
                '& .MuiChip-icon': { fontSize: 16 }
              }}
            />
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export const UpcomingEvents = ({ selectedChild }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState({ classes: [], mockTests: [] });
  const router = useRouter();
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

  const handleNavigate = (path) => {
    router.push(path);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          <Skeleton width={200} />
        </Typography>
        <LoadingSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
          px: 2
        }}
      >
        <Typography color="error" variant="h6" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleGetAllEvents}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
        Upcoming Classes
      </Typography>
      {events.classes.length > 0 ? (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {events.classes.map((class_) => (
            <Grid item xs={12} md={6} lg={4} key={class_.bookingId}>
              <EventCard item={class_} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ mb: 6 }}>
          <EmptyState type="class" onButtonClick={handleNavigate} />
        </Box>
      )}

      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
        Upcoming Mock Tests
      </Typography>
      {events.mockTests.length > 0 ? (
        <Grid container spacing={3}>
          {events.mockTests.map((test) => (
            <Grid item xs={12} md={6} lg={4} key={test.bookingId}>
              <EventCard item={test} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState type="mock" onButtonClick={handleNavigate} />
      )}
    </Container>
  );
};

export default UpcomingEvents;