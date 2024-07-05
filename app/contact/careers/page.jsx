"use client";
import Header from "../../Components/Header1/Header";
import "../contactStyle.css";
import { TopAbstract } from "../../MyApp";
import { Container, } from "@mui/material";
import {NewFooter} from "../../Components/Footer/Footer";
import Enquiry from "../../Components/Enquiry/Enquiry";

function Careers() {
    return (
    <main style={{backgroundColor:"#fff"}}>
      <Header/>
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
