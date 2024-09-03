"use client";
import React, { Suspense, useEffect, useState } from "react";
import "./classes.css";
import { Container, Typography, Grid, Breadcrumbs, Divider, Tabs, Tab, TablePagination, CircularProgress } from "@mui/material";
import Footer from "../Components/Footer/Footer";
import OneMockTest from "../Components/PublicPage/MockTest/OneMockTest";
import { Dialog, useMediaQuery, useTheme, Button, DialogActions, DialogContent } from "@mui/material";
import Slide from '@mui/material/Slide';
import { mockTestService, myCourseService } from "../services";
import Loading from "../Components/Loading/Loading";
import NoResult from "../Components/NoResult/NoResult";

import FilterDialog from "../Components/PublicPage/ClassMockComm/FilterDialog";
import FilterComponent from "../Components/PublicPage/ClassMockComm/FilterComponent";

function MultiMockPage() {
  const [filterData, setFilterData] = useState([
    {
      title: "Class",
      link:"courseClass",
      tags: [
        { label: "Class 4", id: "4" },
        { label: "Class 5", id: "5" },
        { label: "Class 6", id: "6" },
      ]
    },
    {
      title: "Type",
      link:"courseType",

      tags: [
        { label: "Full Course", id: "fullCourse" },
        { label: "Crash Course", id: "crashCourse" },
      ]
    },
    {
      title: "Duration",
      link:"duration",
      tags: [
        { label: "3 Months", id: "3months" },
        { label: "6 Months", id: "6months" },
        { label: "1 Years", id: "1years" },
      ]
    },
  ]);
  const [selectedFilter, setSelectedFilter] = useState([
    {
      link:"courseClass",
      ids:[]
    },
    {
      link:"courseType",
      ids:[]
    },
    {
      link:"duration",
      ids:[]
    },

  ]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [sortBy, setSort]= useState("newToOld");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [totalCount,setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true)
      let response = await mockTestService.publicGetAll(
        {sortBy,page,rowsPerPage,searchText,totalCount,selectedFilter}
        );
     console.log(response)
      if(response.variant === "success"){
        setLoading(false)
        setRows(response.data)
        setTotalCount(response.totalCount)
      }else {console.log(response); setLoading(false)}
    }
    fetchAllData()
  }, [rowsPerPage,page,searchText,sortBy,selectedFilter])

  return (
    <>
            <Grid container spacing={3}>
            {fullScreen? (
       
       <FilterDialog filterData={filterData} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
    
     ):(
       <Grid item xs={2}>
       <FilterComponent filterData={filterData} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
     </Grid>
     )}
          <Grid item xs={fullScreen ? 12 : 10}>
      
        {/* <Typography style={{marginBottom:"10px"}} variant="h3" component="h5" color="#000945">
        Mock Test
</Typography> */}
        {loading ? 
        <div className="center" style={{flexDirection:"column"}}><CircularProgress size={30}/> <Typography color="slateblue" style={{fontFamily: 'Courgette'}} variant='h6' align='center'>Loading Classes...</Typography>  </div> : rows.length === 0 ? <NoResult label="No MyClass Available"/> :  
            rows &&
              rows.map((p, j) => (
                <OneMockTest data={p} key={p._id} />
              ))
          }
</Grid>
        </Grid>
        <TablePagination
                rowsPerPageOptions={[5,10,15,100]}
                component="div"
                count={totalCount}
                sx={{overflowX:"hidden"}}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e,v)=>setPage(v)}
                onRowsPerPageChange={e=>{
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0)
                }}
              />
    </>

  );
}

export default MultiMockPage;