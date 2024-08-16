"use client";
import "../contactStyle.css";
import { TopAbstract } from "../../MyApp";
import { Container, } from "@mui/material";
import {NewFooter} from "../../Components/Footer/Footer";
import Enquiry from "../../Components/Enquiry/Enquiry";
import Navbar from "@/app/Components/ITStartup/Common/Navbar/Navbar";

function Careers() {
    return (
    <main style={{backgroundColor:"#fff"}}>
            <Navbar />

      <TopAbstract/>
      <div className="topBg" id="careergBg">
      </div>
      <Container className="sectionMargin" >
        <br/>
      </Container>
      <Enquiry/>
      <NewFooter/>
    </main>
  )
}

export default Careers
