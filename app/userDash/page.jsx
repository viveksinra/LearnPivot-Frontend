"use client";
import React, { useState } from 'react';
import { Box, Container, Typography, Stack, useTheme } from '@mui/material';
import ChildSelectorDropDown from '../Components/Common/ChildSelectorDropDown';
import { PaymentAlert } from '../Components/UserDash/PaymentAlert';
import { UpcomingEvents } from '../Components/UserDash/UpcomingEvents';
import { MoreContent } from '../Components/UserDash/MoreContent';
import { QuickLinks } from '../Components/UserDash/QuickLinks';


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
    }
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
            <ChildSelectorDropDown selectedChild={selectedChild} setSelectedChild={setSelectedChild} />
          </Stack>
        </Box>

        {/* Payment Alert */}
   {"sdf" == "SDyF" &&     <PaymentAlert payment={paymentDues[0]} />}

        {/* Upcoming Events */}
        <UpcomingEvents 
selectedChild={selectedChild}
        />

        {/* More Content */}
        {"sdf" == "SDyF" &&    <MoreContent 
          classes={moreClasses} 
          tests={moreMockTests} 
          getSubjectColor={getSubjectColor} 
        />}

        {/* Quick Links */}
        <QuickLinks />
      </Container>
    </Box>
  );
};

export default Dashboard;