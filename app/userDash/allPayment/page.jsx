'use client';
import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import ChildSelectorDropDown from '../../Components/Common/ChildSelectorDropDown';
import { reportService } from '@/app/services';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: status === 'succeeded' ? '#e3f2fd' : '#fff3e0',
  color: status === 'succeeded' ? '#1976d2' : '#ed6c02',
  fontWeight: 600,
}));

export default function PaymentsPage() {
  const [tabValue, setTabValue] = useState('all');
  const [selectedChild, setSelectedChild] = useState('all');
  const [payments, setPayments] = useState([]);
  const snackRef = useRef();

  useEffect(() => {
    handleGetAllPayment();
  }, [selectedChild]);

  const handleGetAllPayment = async () => {
    try {
      const response = await reportService.getMyAllPayment({ childId: selectedChild });
      if (response.data) {
        const coursePayments = response.data.myData.myBuyCourse.map(payment => ({
          ...payment,
          id: payment._id,
          type: 'course',
        }));
        const mockPayments = response.data.myData.myBuyMock.map(payment => ({
          ...payment,
          id: payment._id,
          type: 'mock',
        }));
        setPayments([...coursePayments, ...mockPayments]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      snackRef.current?.handleSnack({ message: 'Failed to fetch payments.', variant: 'error' });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredPayments = payments.filter(payment => {
    if (tabValue === 'all') return true;
    return tabValue === payment.paymentStatus.toLowerCase();
  });

  const columns = [
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.value === 'course' ? (
            <SchoolIcon color="primary" />
          ) : (
            <QuizIcon color="secondary" />
          )}
          {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
        </Box>
      ),
    },
    {
      field: 'paymentDate',
      headerName: 'Date',
      width: 160,
      valueGetter: (params) => moment(params.value).format('DD MMM YYYY'),
    },
    {
      field: 'amountPaid',
      headerName: 'Amount',
      width: 120,
      valueGetter: (params) => `£${params.value}`,
    },
    {
      field: 'paymentStatus',
      headerName: 'Status',
      width: 140,
      renderCell: (params) => (
        <StatusChip
          label={params.value}
          status={params.value}
          size="small"
        />
      ),
    },
    {
      field: 'childName',
      headerName: 'Child Name',
      width: 150,
    },
    {
      field: 'courseName',
      headerName: 'Course/Test Name',
      width: 200,
      valueGetter: (params) => params.value || 'Mock Test',
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 100,
    },
    {
      field: 'paymentIntent',
      headerName: 'Payment ID',
      width: 220,
    },
    {
      field: 'invoiceLink',
      headerName: 'Invoice',
      width: 120,
      renderCell: (params) => (
        <Typography
          component="a"
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
        >
          View Invoice
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <StyledCard>
        <CardContent>
          <Grid container spacing={2} alignItems="center" mb={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h1" fontWeight="bold">
                Payment History
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <ChildSelectorDropDown
                  selectedChild={selectedChild}
                  setSelectedChild={setSelectedChild}
                />
              </Box>
            </Grid>
          </Grid>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab label="All" value="all" />
            <Tab label="Succeeded" value="succeeded" />
            <Tab label="Pending" value="formFilled" />
          </Tabs>

          <Box sx={{ height: 600 }}>
            <DataGrid
              rows={filteredPayments}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f0f0f0',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f5f5f5',
                  borderBottom: 'none',
                },
              }}
            />
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
}