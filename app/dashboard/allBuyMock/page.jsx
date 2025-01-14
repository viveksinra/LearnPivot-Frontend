'use client';
import "./addMockTestStyle.css";
import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';
import {
  Typography, 
  Fab, 
  styled, 
  CircularProgress, 
  Grid, 
  AppBar, 
  Toolbar,
  Tooltip, 
  IconButton,
  Tab,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Button
} from '@mui/material/';
import { 
  DataGrid, 
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { MdModeEdit, MdOutlineMail, MdOutlineClose } from "react-icons/md";
import { FcOk, FcNoIdea, FcOrgUnit, FcTimeline } from "react-icons/fc";
import { BsTable } from "react-icons/bs";
import Loading from "../../Components/Loading/Loading";
import NoResult from "@/app/Components/NoResult/NoResult";
import Search from "../../Components/Search";
import LiveAvatar from "@/app/Components/Common/LiveAvatar";
import { registrationService } from "@/app/services";
import { formatDateToShortMonth } from "@/app/utils/dateFormat";
import MulSelCom from "./MulSelCom";
import { TabContext, TabList } from "@mui/lab";

const SendEmailCom = lazy(() => import("./SendEmailCom"));

// Custom Pagination Component
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <ButtonGroup variant="text" color="primary" aria-label="pagination button group">
      <Button
        onClick={() => apiRef.current.setPage(page - 1)}
        disabled={page === 0}
      >
        Previous
      </Button>
      <Button disabled>Page {page + 1} of {pageCount}</Button>
      <Button
        onClick={() => apiRef.current.setPage(page + 1)}
        disabled={page >= pageCount - 1}
      >
        Next
      </Button>
    </ButtonGroup>
  );
}

// Styled Components
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .status-succeeded': {
    backgroundColor: '#e8f5e9',
    '&:hover': {
      backgroundColor: '#c8e6c9',
    },
  },
  '& .status-pending': {
    backgroundColor: '#fff3e0',
    '&:hover': {
      backgroundColor: '#ffe0b2',
    },
  },
}));

const ToggleFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -25,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const StyledCard = styled('div')(({ status }) => ({
  backgroundColor: status === 'succeeded' ? '#e3ffea' : '#ffffe6',
  borderRadius: '8px',
  padding: '20px',
  position: 'relative',
  marginBottom: '20px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
}));

function MyMockTest() {
  const [viewTabular, toggleView] = useState(true);
  const [id, setId] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const entryRef = useRef();

  return (
    <main>
      {viewTabular ? (
        <Suspense fallback={<Loading />}>
          <SearchArea 
            selectedItems={selectedItems} 
            setSelectedItems={setSelectedItems} 
            handleEdit={(id) => { 
              toggleView(false); 
              setId(id); 
            }} 
          />
        </Suspense>
      ) : (
        <Suspense fallback={null}>
          <SendEmailCom 
            selectedItems={selectedItems} 
            ref={entryRef} 
            id={id} 
            setId={setId} 
          />
        </Suspense>
      )}
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: "#d6f9f7" }}>
        <Toolbar variant="dense">
          <span style={{ flexGrow: 0.2 }} />
          <span style={{ flexGrow: 0.3 }} />
          {selectedItems.length >= 1 && (
            <Tooltip arrow title={viewTabular ? "Send Email to selected" : "Show List"}>
              <ToggleFab onClick={() => toggleView(!viewTabular)} color="secondary" size="medium">
                {viewTabular ? <MdOutlineMail style={{ fontSize: 24 }} /> : <BsTable style={{ fontSize: 24 }} />}
              </ToggleFab>
            </Tooltip>
          )}
          <span style={{ flexGrow: 0.3 }} />
        </Toolbar>
      </AppBar>
    </main>
  );
}

function SearchArea({ handleEdit, selectedItems, setSelectedItems }) {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [tabular, setView] = useState(true);
  const sortOptions = [
    { label: "New First", value: "newToOld" }, 
    { label: "Old First", value: "oldToNew" }
  ];
  const [sortBy, setSort] = useState("newToOld");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [selectedMockTests, setSelectedMockTests] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [successOnly, setSuccessOnly] = useState(true);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    address: false,
    mobileNo: false
  });

  const columns = [
    {
      field: 'mockTestTitle',
      headerName: 'Mock Test Title',
      width: 200,
      valueGetter: (params) => params.row.mockTestId.mockTestTitle,
      filterable: true,
    },
    {
      field: 'parentName',
      headerName: 'Parent Name',
      width: 150,
      valueGetter: (params) => `${params.row.user.firstName} ${params.row.user.lastName}`,
      filterable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      valueGetter: (params) => params.row.user.email,
      filterable: true,
    },
    {
      field: 'childName',
      headerName: 'Child Name',
      width: 150,
      valueGetter: (params) => params.row.childId.childName,
      filterable: true,
    },
    {
      field: 'childGender',
      headerName: 'Child Gender',
      width: 120,
      valueGetter: (params) => params.row.childId.childGender,
      filterable: true,
    },
    {
      field: 'batchDates',
      headerName: 'Batch Dates',
      width: 120,
      valueGetter: (params) => formatDateToShortMonth(params.row.selectedBatch.date),
      filterable: true,
    },
    {
      field: 'batchTimes',
      headerName: 'Batch Times',
      width: 150,
      valueGetter: (params) => `${params.row.selectedBatch.startTime}-${params.row.selectedBatch.endTime}`,
      filterable: true,
    },
    {
      field: 'bookingDate',
      headerName: 'Booking Date',
      width: 120,
      valueGetter: (params) => formatDateToShortMonth(params.row.date),
      filterable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={params.row.status === 'succeeded' ? 'success' : 'default'}
          variant="outlined"
          size="small"
        />
      ),
      filterable: true,
      sortable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 120,
      valueGetter: (params) => params.row.user.address,
      filterable: true,
    },
    {
      field: 'mobileNo',
      headerName: 'Mobile Number',
      width: 120,
      valueGetter: (params) => params.row.user.mobile,
      filterable: true,
    },


  ];

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      try {
        let response = await registrationService.getMockWithFilter({ 
          sortBy, 
          rowsPerPage, 
          page, 
          searchText, 
          selectedMockTests, 
          selectedBatches, 
          successOnly 
        });
        if (response.variant === "success") {
          setRows(response.data);
          setTotalCount(response.totalCount);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, [rowsPerPage, page, searchText, sortBy, selectedMockTests, selectedBatches, successOnly]);

  const handleSelectionChange = (newSelection) => {
    const selectedRows = rows.filter(row => newSelection.includes(row._id));
    setSelectedItems(selectedRows);
  };

  return (
    <main style={{ 
      background: "#fff", 
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", 
      borderRadius: 8, 
      padding: 20 
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography 
            color="primary" 
            variant='h5' 
            gutterBottom
          >
            All Mock Tests
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Search 
            onChange={e => setSearchText(e.target.value)} 
            value={searchText} 
            fullWidth 
            placeholder="Search mock tests..."
            endAdornment={
              searchText && (
                <IconButton 
                  size="small" 
                  onClick={() => setSearchText("")}
                >
                  <MdOutlineClose />
                </IconButton>
              )
            } 
          />
        </Grid>
        <Grid item xs={12}>
          <MulSelCom 
            selectedMockTests={selectedMockTests} 
            setSelectedMockTests={setSelectedMockTests} 
            selectedBatches={selectedBatches} 
            setSelectedBatches={setSelectedBatches} 
            successOnly={successOnly} 
            setSuccessOnly={setSuccessOnly} 
          />
        </Grid>
        <Grid item xs={12}>
          <TabContext value={sortBy}>
            <TabList 
              onChange={(e, v) => setSort(v)} 
              aria-label="Sort options"
            >
              {sortOptions.map((option) => (
                <Tab 
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </TabList>
          </TabContext>
        </Grid>
      </Grid>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </div>
      ) : rows.length === 0 ? (
        <NoResult label="No Mock Tests Available" />
      ) : (
        <div style={{ height: 600, width: '100%', marginTop: 20 }}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            pagination
            pageSize={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            rowCount={totalCount}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => {
              setRowsPerPage(newPageSize);
              setPage(0);
            }}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={handleSelectionChange}
            selectionModel={selectedItems.map(item => item._id)}
            loading={loading}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  address: false,
                  mobileNo: false,
                }
              }
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => {
              setColumnVisibilityModel(newModel);
            }}
            components={{
              Toolbar: GridToolbar,
              Pagination: CustomPagination,
            }}
            componentsProps={{
              toolbar: {
                csvOptions: { 
                  allColumns: true,
                  fileName: 'MockTests_Export'
                },
                printOptions: { 
                  disableToolbarButton: true 
                },
                filterButton: true,
                showQuickFilter: true,
              },
            }}
            getRowClassName={(params) => `status-${params.row.status}`}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
              },
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
            }}
          />

        </div>
      )}
    </main>
  );
}

export default MyMockTest;