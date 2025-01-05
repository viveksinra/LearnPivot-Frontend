import React, { useEffect, useRef, useState } from 'react';
import { 
  Card, Box, Chip, Typography, Stack, Button, 
  Skeleton, Container, useTheme, useMediaQuery 
} from '@mui/material';
import { 
  PersonOutline, CalendarToday, AccessTimeOutlined, 
  LocationOn, School, QuizOutlined 
} from '@mui/icons-material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { reportService } from '@/app/services';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const LoadingSkeleton = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  
  return (
    <Swiper
      slidesPerView={isMobile ? 1.2 : 3}
      spaceBetween={24}
      centeredSlides={isMobile}
      initialSlide={0}
    >
      {[1, 2, 3].map((item) => (
        <SwiperSlide key={item}>
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const EmptyState = ({ type, onButtonClick }) => {
  const isClass = type === 'class';
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  
  return (
    <Card 
      sx={{ 
        p: isMobile ? 3 : 4, 
        textAlign: 'center',
        borderRadius: 3,
        bgcolor: 'grey.50'
      }}
    >
      <Box sx={{ mb: 3 }}>
        {isClass ? (
          <School sx={{ fontSize: isMobile ? 36 : 48, color: 'primary.main', mb: 2 }} />
        ) : (
          <QuizOutlined sx={{ fontSize: isMobile ? 36 : 48, color: 'secondary.main', mb: 2 }} />
        )}
        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
          No Upcoming {isClass ? 'Classes' : 'Mock Tests'}
        </Typography>
        <Typography 
          color="text.secondary" 
          sx={{ mb: 3 }}
          variant={isMobile ? "body2" : "body1"}
        >
          {isClass 
            ? "Ready to start learning? Book your first class today!" 
            : "Practice makes perfect. Book a mock test to assess your progress!"}
        </Typography>
        <Button
          variant="contained"
          color={isClass ? "primary" : "secondary"}
          onClick={() => onButtonClick(isClass ? '/course' : '/mockTest')}
          size={isMobile ? "small" : "medium"}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            px: isMobile ? 3 : 4
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isClass = item.type === 'class';
  
  return (
    <Card sx={{ 
      p: isMobile ? 2 : 3,
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
      <Stack spacing={2}>
        <Box>
          <Chip 
            label={isClass ? "Class" : "Mock Test"}
            size="small"
            sx={{ 
              bgcolor: isClass ? 'primary.lighter' : 'secondary.lighter',
              color: isClass ? 'primary.dark' : 'secondary.dark',
              fontWeight: 600,
              mb: 1.5
            }}
          />
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            sx={{ 
              fontWeight: 700, 
              mb: 1, 
              lineHeight: 1.4,
              fontSize: isMobile ? '1rem' : 'inherit'
            }}
          >
            {isClass ? item.courseTitle : item.testTitle}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          color: 'text.secondary' 
        }}>
          <PersonOutline sx={{ fontSize: isMobile ? 16 : 20 }} />
          <Typography 
            variant={isMobile ? "caption" : "body2"} 
            sx={{ fontWeight: 500 }}
          >
            {item.studentName} ({item.studentYear})
          </Typography>
        </Box>

        <Stack spacing={1}>
          <Chip 
            icon={<CalendarToday sx={{ fontSize: isMobile ? 14 : 16 }} />}
            label={moment(item.date).format('ddd, MMM DD')}
            size="small"
            sx={{ 
              bgcolor: 'grey.50',
              '& .MuiChip-label': {
                fontSize: isMobile ? '0.75rem' : '0.875rem'
              }
            }}
          />
          <Chip 
            icon={<AccessTimeOutlined sx={{ fontSize: isMobile ? 14 : 16 }} />}
            label={`${item.startTime} - ${item.endTime}`}
            size="small"
            sx={{ 
              bgcolor: 'grey.50',
              '& .MuiChip-label': {
                fontSize: isMobile ? '0.75rem' : '0.875rem'
              }
            }}
          />
          {!isClass && item.location && (
            <Chip 
              icon={<LocationOn sx={{ fontSize: isMobile ? 14 : 16 }} />}
              label={item.location}
              size="small"
              sx={{ 
                bgcolor: 'grey.50',
                '& .MuiChip-label': {
                  fontSize: isMobile ? '0.75rem' : '0.875rem'
                }
              }}
            />
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

const EventList = ({ items, type }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  
  return (
    <Swiper
      slidesPerView={isMobile ? 1.2 : 3}
      spaceBetween={24}
      centeredSlides={isMobile}
      initialSlide={0}
      style={{ paddingBottom: '24px' }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.bookingId}>
          <EventCard item={{ ...item, type }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const UpcomingEvents = ({ selectedChild }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState({ classes: [], mockTests: [] });
  const router = useRouter();
  const snackRef = useRef();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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
      <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 4 }}>
        <Typography variant={isMobile ? "h6" : "h5"} sx={{ mb: 3, fontWeight: 700 }}>
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
          py: isMobile ? 4 : 8,
          px: 2
        }}
      >
        <Typography 
          color="error" 
          variant={isMobile ? "subtitle1" : "h6"} 
          gutterBottom
        >
          {error}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleGetAllEvents}
          size={isMobile ? "small" : "medium"}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: isMobile ? 2 : 4,
        px: isMobile ? 1 : 3
      }}
    >
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        sx={{ 
          mb: 3, 
          fontWeight: 700,
          px: isMobile ? 2 : 0
        }}
      >
        Upcoming Classes
      </Typography>
      {events.classes.length > 0 ? (
        <Box sx={{ mb: 4 }}>
          <EventList items={events.classes} type="class" />
        </Box>
      ) : (
        <Box sx={{ mb: 4 }}>
          <EmptyState type="class" onButtonClick={handleNavigate} />
        </Box>
      )}

      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        sx={{ 
          mb: 3, 
          fontWeight: 700,
          px: isMobile ? 2 : 0
        }}
      >
        Upcoming Mock Tests
      </Typography>
      {events.mockTests.length > 0 ? (
        <EventList items={events.mockTests} type="mock" />
      ) : (
        <EmptyState type="mock" onButtonClick={handleNavigate} />
      )}
    </Container>
  );
};

export default UpcomingEvents;