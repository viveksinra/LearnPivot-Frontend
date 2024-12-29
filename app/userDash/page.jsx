"use client";
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  IconButton,
  Stack,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  NotificationsOutlined,
  PersonOutline,
  CalendarToday,
  AccessTimeOutlined,
  ArrowForwardIos,
  Book,
  AssignmentOutlined
} from '@mui/icons-material';
import moment from 'moment';

const Dashboard = () => {
  const [selectedChild, setSelectedChild] = useState('all');
  const theme = useTheme();

  const children = [
    { id: 1, name: 'John Smith', grade: '8th' },
    { id: 2, name: 'Sarah Smith', grade: '6th' },
  ];

  const paymentDues = [
    {
      id: 1,
      title: 'Next Batch Payment Due',
      description: 'Secure your spot for the upcoming semester starting January 2025',
      amount: '$999',
      dueDate: '2024-12-31'
    },

  ];

  const upcomingClasses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      date: '2024-12-28',
      time: '10:00 AM',
      teacher: 'Dr. Johnson',
      subject: 'Mathematics'
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      date: '2024-12-29',
      time: '2:00 PM',
      teacher: 'Prof. Williams',
      subject: 'Physics'
    },
    {
      id: 3,
      title: 'Chemistry Lab',
      date: '2024-12-30',
      time: '3:00 PM',
      teacher: 'Dr. Miller',
      subject: 'Science'
    }
  ];

  const mockTests = [
    {
      id: 1,
      subject: 'Science',
      date: '2024-12-30',
      duration: '2 hours',
      totalQuestions: 50
    },
    {
      id: 2,
      subject: 'Mathematics',
      date: '2024-12-31',
      duration: '1.5 hours',
      totalQuestions: 40
    },
    {
      id: 3,
      subject: 'Physics',
      date: '2025-01-02',
      duration: '2 hours',
      totalQuestions: 45
    }
  ];

  const moreClasses = [
    {
      id: 1,
      title: 'Biology Fundamentals',
      subject: 'Science',
      duration: '1.5 hours',
      price: '$49'
    },
    {
      id: 2,
      title: 'Algebra Mastery',
      subject: 'Mathematics',
      duration: '2 hours',
      price: '$59'
    }
  ];

  const moreMockTests = [
    {
      id: 1,
      title: 'Chemistry Mock Test',
      subject: 'Science',
      questions: 60,
      price: '$29'
    },
    {
      id: 2,
      title: 'Physics Comprehensive',
      subject: 'Physics',
      questions: 75,
      price: '$39'
    }
  ];

  const quickLinks = [
    {
      id: 1,
      title: 'Study Materials',
      icon: <Book sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      id: 2,
      title: 'Past Tests',
      icon: <AssignmentOutlined sx={{ fontSize: 40, color: 'success.main' }} />
    },
    {
      id: 3,
      title: 'Schedule',
      icon: <CalendarToday sx={{ fontSize: 40, color: 'warning.main' }} />
    },
    {
      id: 4,
      title: 'Profile',
      icon: <PersonOutline sx={{ fontSize: 40, color: 'error.main' }} />
    }
  ];

  const studyProgress = [
    {
      id: 1,
      name: 'Mathematics',
      completedTopics: 24,
      totalTopics: 30
    },
    {
      id: 2,
      name: 'Physics',
      completedTopics: 18,
      totalTopics: 25
    },
    {
      id: 3,
      name: 'Science',
      completedTopics: 15,
      totalTopics: 20
    }
  ];

  const getSubjectColor = (subject) => {
    const colors = {
      Mathematics: theme.palette.primary.main,
      Physics: theme.palette.success.main,
      Science: theme.palette.error.main
    };
    return colors[subject] || theme.palette.grey[600];
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(90deg, #1976D2 0%, #1565C0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Good Morning, Parent!
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              Track your children's educational journey
            </Typography>
          </Box>
          <Stack direction="row" spacing={3} alignItems="center">
            <FormControl sx={{ minWidth: 220 }}>
              <InputLabel>Select Child</InputLabel>
              <Select
                value={selectedChild}
                label="Select Child"
                onChange={(e) => setSelectedChild(e.target.value)}
                sx={{ '& .MuiSelect-select': { py: 1.5 } }}
              >
                <MenuItem value="all">All Children</MenuItem>
                {children.map((child) => (
                  <MenuItem key={child.id} value={child.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonOutline color="primary" />
                      {child.name} - {child.grade}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton 
              sx={{ 
                bgcolor: 'primary.light',
                '&:hover': { bgcolor: 'primary.main', color: 'white' }
              }}
            >
              <NotificationsOutlined />
            </IconButton>
          </Stack>
        </Box>

        {/* Payment Alerts */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {paymentDues.map((payment) => (
            <Grid item xs={12} md={12} key={payment.id}>
              <Card 
                sx={{ 
                  p: 3,
                  background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(255, 152, 0, 0.2)',
                  borderRadius: 3
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                      {payment.title}
                    </Typography>
                    <Typography sx={{ opacity: 0.9, mb: 1 }}>
                      {payment.description}
                    </Typography>
                    <Typography variant="h6">
                      {payment.amount}
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      bgcolor: 'white',
                      color: '#F57C00',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem'
                    }}
                  >
                    Pay Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Upcoming Classes */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Upcoming Classes
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {upcomingClasses.map((class_) => (
            <Grid item xs={12} md={6} lg={4} key={class_.id}>
              <Card 
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box>
                  <Chip 
                    label={class_.subject}
                    size="small"
                    sx={{ 
                      mb: 2,
                      bgcolor: `${getSubjectColor(class_.subject)}15`,
                      color: getSubjectColor(class_.subject),
                      fontWeight: 500
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {class_.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
                    <PersonOutline sx={{ fontSize: 20 }} />
                    <Typography>{class_.teacher}</Typography>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <Chip 
                      icon={<CalendarToday sx={{ fontSize: 18 }} />} 
                      label={moment(class_.date).format('MMM DD')}
                      size="small"
                      sx={{ bgcolor: 'grey.100' }}
                    />
                    <Chip 
                      icon={<AccessTimeOutlined sx={{ fontSize: 18 }} />} 
                      label={class_.time}
                      size="small"
                      sx={{ bgcolor: 'grey.100' }}
                    />
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Mock Tests */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Upcoming Mock Tests
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {mockTests.map((test) => (
            <Grid item xs={12} md={6} lg={4} key={test.id}>
              <Card 
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box>
                  <Chip 
                    label={test.subject}
                    size="small"
                    sx={{ 
                      mb: 2,
                      bgcolor: `${getSubjectColor(test.subject)}15`,
                      color: getSubjectColor(test.subject),
                      fontWeight: 500
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {test.subject} Mock Test
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {test.totalQuestions} Questions • {test.duration}
                  </Typography>
                  <Chip 
                    icon={<CalendarToday sx={{ fontSize: 18 }} />} 
                    label={moment(test.date).format('MMM DD, YYYY')}
                    size="small"
                    sx={{ bgcolor: 'grey.100' }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* More Classes */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          More Classes
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {moreClasses.map((class_) => (
            <Grid item xs={12} md={6} lg={4} key={class_.id}>
              <Card 
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box>
                  <Chip 
                    label={class_.subject}
                    size="small"
                    sx={{ 
                      mb: 2,
                      bgcolor: `${getSubjectColor(class_.subject)}15`,
                      color: getSubjectColor(class_.subject),
                      fontWeight: 500
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {class_.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="text.secondary">
                      {class_.duration}
                    </Typography>
                    <Typography color="primary" variant="h6" sx={{ fontWeight: 600 }}>
                      {class_.price}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIos />}
                    fullWidth
                    sx={{
                      mt: 2,
                      borderColor: getSubjectColor(class_.subject),
                      color: getSubjectColor(class_.subject),
                      '&:hover': {
                        borderColor: getSubjectColor(class_.subject),
                        bgcolor: `${getSubjectColor(class_.subject)}10`
                      }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* More Mock Tests */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          More Mock Tests
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {moreMockTests.map((test) => (
            <Grid item xs={12} md={6} lg={4} key={test.id}>
              <Card 
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box>
                  <Chip 
                    label={test.subject}
                    size="small"
                    sx={{ 
                      mb: 2,
                      bgcolor: `${getSubjectColor(test.subject)}15`,
                      color: getSubjectColor(test.subject),
                      fontWeight: 500
                    }}
                  />
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    {test.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AssignmentOutlined sx={{ fontSize: 18 }} />
                      {test.questions} Questions
                    </Typography>
                    <Typography color="primary" variant="h6" sx={{ fontWeight: 600 }}>
                      {test.price}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIos />}
                      fullWidth
                      sx={{
                        bgcolor: getSubjectColor(test.subject),
                        '&:hover': {
                          bgcolor: getSubjectColor(test.subject),
                          opacity: 0.9
                        }
                      }}
                    >
                      Start Test
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: getSubjectColor(test.subject),
                        color: getSubjectColor(test.subject),
                        '&:hover': {
                          borderColor: getSubjectColor(test.subject),
                          bgcolor: `${getSubjectColor(test.subject)}10`
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Links */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Quick Links
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {quickLinks.map((link) => (
            <Grid item xs={12} sm={6} md={3} key={link.id}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Stack alignItems="center" spacing={2}>
                  {link.icon}
                  <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>
                    {link.title}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Study Progress */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Study Progress
        </Typography>
        <Grid container spacing={3}>
          {studyProgress.map((subject) => (
            <Grid item xs={12} md={4} key={subject.id}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {subject.name}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {subject.completedTopics} of {subject.totalTopics} topics completed
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: getSubjectColor(subject.name) }}>
                    {Math.round((subject.completedTopics / subject.totalTopics) * 100)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(subject.completedTopics / subject.totalTopics) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: `${getSubjectColor(subject.name)}15`,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getSubjectColor(subject.name)
                    }
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;