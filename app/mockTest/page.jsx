"use client";
import React, { Suspense, useEffect, useState } from "react";
import "./classes.css";
import { Container, Typography, Grid, Breadcrumbs, Divider, Tabs, Tab, TablePagination, CircularProgress } from "@mui/material";
import Footer from "../Components/Footer/Footer";
import { useRouter } from "next/navigation";
import Enquiry from "@/app/Components/Enquiry/Enquiry";
import OneMockTest from "../Components/PublicPage/MockTest/OneMockTest";
import FilterComponent from "../Components/PublicPage/Classes/FilterComponent"; 
import FilterDialog from "../Components/PublicPage/Classes/FilterDialog"; 
import { Dialog, useMediaQuery, useTheme, Button, DialogActions, DialogContent } from "@mui/material";
import Slide from '@mui/material/Slide';
import { mockTestService, myCourseService } from "../services";
import Loading from "../Components/Loading/Loading";
import NoResult from "../Components/NoResult/NoResult";
import Navbar from "../Components/ITStartup/Common/Navbar/Navbar";
import MtFilterDialog from "../Components/PublicPage/MockTest/MtFilterDialog";
import MtFilterComponent from "../Components/PublicPage/MockTest/MtFilterComponent";

function Events() {

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
        {sortBy,page,rowsPerPage,searchText,totalCount}
        );
     console.log(response)
      if(response.variant === "success"){
        setLoading(false)
        setRows(response.data)
        setTotalCount(response.totalCount)
      }else {console.log(response); setLoading(false)}
    }
    fetchAllData()
  }, [rowsPerPage,page,searchText,sortBy])

  return (
    <main style={{ backgroundColor: "#fff" }}>
      <Navbar />
    
      <Container style={{ marginTop:"100px" }}>
        <Grid container spacing={3}>
        {fullScreen? (
       
        <MtFilterDialog  />

      ):(
        <Grid item xs={2}>
        <MtFilterComponent />
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
      </Container>
      <Footer />
    </main>
  );
}

export default Events;
