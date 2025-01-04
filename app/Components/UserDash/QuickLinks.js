import React from 'react';
import { Grid, Card, Typography, Stack } from '@mui/material';
import { AssignmentOutlined, Book, CalendarToday } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const quickLinks = [
    {
      id: 1,
      title: 'Classes',
      link: "/course",
      icon: <Book sx={{ fontSize: 40, color: 'primary.main' }} />
    },
    {
      id: 2,
      title: 'Mock Tests',
      link: "/mockTest",
      icon: <AssignmentOutlined sx={{ fontSize: 40, color: 'success.main' }} />
    },
    {
      id: 3,
      title: 'Payments',
      link: "/userDash/allPayment",
      icon: <CalendarToday sx={{ fontSize: 40, color: 'warning.main' }} />
    }
  ];

export const QuickLinks = () => {
  const router = useRouter();

  const handleCardClick = (link) => {
    router.push(link);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Quick Links</Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {quickLinks.map((link) => (
          <Grid item xs={12} sm={6} md={3} key={link.id}>
            <Card
              onClick={() => handleCardClick(link.link)}
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
    </>
  );
};