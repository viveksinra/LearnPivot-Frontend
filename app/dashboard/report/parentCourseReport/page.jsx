"use client";
import { registrationService } from '@/app/services';
import React, { useState, useEffect } from 'react';
import { Alert, Box, Container, Skeleton, Paper } from '@mui/material';
import CourseParentTable from './Comp/CourseParentTable';

const parentCourseReportPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      setError(null);
      try {
        let response = await registrationService.getCourseParentNumbersApi();
        if (response.variant === "success") {
          const processedData = response.data.map(course => {
            try {
              const totalDates = course.courseDateSets.reduce((acc, set) => 
                acc + (set.dates?.filter(date => isValidDate(date.date))?.length || 0), 0);
              
              const purchasePercentage = totalDates > 0 
                ? ((course.totalPurchasedDates / totalDates) * 100).toFixed(1)
                : '0.0';

              return {
                ...course,
                totalDates,
                purchasePercentage
              };
            } catch (err) {
              console.error('Error processing course data:', err);
              return {
                ...course,
                totalDates: 0,
                purchasePercentage: '0.0'
              };
            }
          });
          setRows(processedData);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}
        
        {loading ? (
          <Box sx={{ width: '100%' }}>
            <Skeleton height={60} />
            <Skeleton height={400} />
          </Box>
        ) : (
          <CourseParentTable data={rows} />
        )}
      </Paper>
    </Container>
  );
};

export default parentCourseReportPage;
