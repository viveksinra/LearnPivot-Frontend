import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { AssignmentOutlined, Book, CalendarToday } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const quickLinks = [
  {
    id: 1,
    title: 'Book New Classes',
    link: "/course",
    icon: <Book sx={{ fontSize: 28, color: 'white' }} />,
    bgColor: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)'
  },
  {
    id: 2,
    title: 'Book Mock Tests',
    link: "/mockTest",
    icon: <AssignmentOutlined sx={{ fontSize: 28, color: 'white' }} />,
    bgColor: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)'
  },

];

export const QuickLinks = () => {
  const router = useRouter();

  const handleCardClick = (link) => {
    router.push(link);
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Quick Links</Typography>
      <Grid container spacing={2}>
        {quickLinks.map((link) => (
          <Grid item xs={4} key={link.id}>
            <Box
              onClick={() => handleCardClick(link.link)}
              sx={{
                background: link.bgColor,
                borderRadius: 2,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                height: 140,
                transition: 'transform 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                }
              }}
            >
              {link.icon}
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mt: 1, 
                  color: 'white', 
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              >
                {link.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};