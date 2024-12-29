'use client';
import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import FilterListIcon from '@mui/icons-material/FilterList';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: status === 'formFilled' ? '#e3f2fd' : '#fff3e0',
  color: status === 'formFilled' ? '#1976d2' : '#ed6c02',
  fontWeight: 600,
}));

export default function PaymentsPage() {
  const [tabValue, setTabValue] = useState('all');
  const [selectedChild, setSelectedChild] = useState('all');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
  };

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
      field: 'date',
      headerName: 'Date',
      width: 160,
      valueGetter: (params) => moment(params.value).format('DD MMM YYYY'),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      valueGetter: (params) => `£${params.value}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params) => (
        <StatusChip
          label={params.value === 'formFilled' ? 'Success' : 'Pending'}
          status={params.value}
          size="small"
        />
      ),
    },
    {
      field: 'paymentIntent',
      headerName: 'Payment ID',
      width: 220,
    },
  ];

  // Sample data - you'll need to transform your actual data to match this structure
  const rows = [
    {
      id: 1,
      type: 'course',
      date: '2024-10-29',
      amount: 120,
      status: 'formFilled',
      paymentIntent: 'pi_3PuqWk2x6R10KRrh0W08K2By',
    },
    {
      id: 2,
      type: 'mock test',
      date: '2024-11-13',
      amount: 240,
      status: 'pending',
      paymentIntent: 'pi_3Puzb12x6R10KRrh172A71HB',
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
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={selectedChild}
                    onChange={handleChildChange}
                    displayEmpty
                    startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
                  >
                    <MenuItem value="all">All Children</MenuItem>
                    <MenuItem value="child1">Child 1</MenuItem>
                    <MenuItem value="child2">Child 2</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab label="All" value="all" />
            <Tab label="Success" value="success" />
            <Tab label="Pending" value="pending" />
          </Tabs>

          <Box sx={{ height: 400 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
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