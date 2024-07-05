"use client";
import "./footerStyle.css";
import {Container,Divider,Grid,Typography } from '@mui/material/';
import Image from 'next/image';
import Link from 'next/link';
import { FaAccessibleIcon,FaHospitalAlt,FaFacebook  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  const amenities = [
    "Expert Instructor Team",
    "Interactive Learning Plans",
    "Progress Tracking",
    "24/7 Learning Access",
    "Engaging Exercises",
    "Inspiring Virtual Environment"
  ];
  
  const links =[{label:"About Us",link:"about"},{label:"Amenities",link:"amenities"},{label:"Gallery",link:"gallery"},{label:"Pricing",link:"pricing"},{label:"Contact Us",link:"contact"},{label:"Privacy Policy",link:"privacy"}]
 
  return (
    <section className="footerBg">
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12} md={3}>
            <Link href="/">
            <Image priority width={160} height={60} src="https://res.cloudinary.com/qualifier/image/upload/v1706185907/Logo/chelmsford-high-resolution-logo_vc9ewh.svg" alt="Chelmsford"/>
        </Link><br/><br/>
        <Typography color="black" variant="subtitle1">Embark on a journey of knowledge, innovation, and personal growth with our cutting-edge e-learning platform. Here, empowerment flourishes, and your educational aspirations take center stage.</Typography>
<br />
<Typography variant="body2" color="secondary">Your Platform - Igniting Minds, Shaping Futures</Typography>

            </Grid>
            <Grid item xs={12} md={3}>
            <Typography variant="h5" color="primary" style={{fontFamily: 'Courgette'}}>Our Amenities :-</Typography>
            <ul id="amenitiesUl">
                {amenities.map(d=><li key={d}>{d}</li>)}
              </ul>
            </Grid>
            <Grid item xs={12} md={3}>
            <Typography variant="h5" color="primary" style={{fontFamily: 'Courgette'}}> -:  Quick Links :- </Typography>
            <ul id="quickUl">
              {links.map(l=><li key={l.label}><Link href={`/${l.link}`} >{l.label} ↠</Link></li> )}
            </ul>   
            </Grid>
            <Grid item xs={12} md={3}>
            <iframe id="gMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.9704340892345!2d87.45392117526717!3d26.13250697712083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef8eb5cc5a504b%3A0x896724491d04db5a!2sAraria%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1706385663725!5m2!1sen!2sin" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Grid>
          </Grid>
        </Container>
    </section>
  )
}


export const NewFooter = () => {
  const amenities=["Best Team Care","Healthy Diet Plan", "Online Reports","Doctor on Call","Exercise & Fitness", "Peaceful Environment"];
  const links =[{label:"About Us",link:"about"},{label:"Amenities",link:"amenities"},{label:"Gallery",link:"gallery"},{label:"Pricing",link:"pricing"},{label:"Contact Us",link:"contact"},{label:"Privacy Policy",link:"privacy"}]
 
  return (
    <section id="newFooterBg">
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
            
              <Link href="/">
                <img src="https://res.cloudinary.com/qualifier/image/upload/v1706185947/Logo/chelmsford-high-resolution-logo_vmqknh.png" style={{height:"101px"}} alt="Chelmsford" />
              </Link>
            
         
              <Typography sx={{fontSize:"20px",lineHeight:"30px",fontWeight:200,marginTop:"20px", marginBottom:"28px",fontFamily:"Acumin-Pro,Helvetica Neue,Helvetica,\"sans-serif\""}}>As the only Life Plan community in the Sylmar, Chelmsford provides an active campus-like experience with a true neighborhood feel.</Typography>
              <Link href="/contact"> <button id="footerBtn">Schedule a Visit</button></Link>  
            </Grid>
            <Grid item xs={12} md={1}/>
            <Grid item xs={12} md={2}>
              <Link href="/" className="footerTitle">Communities</Link>
              <ul>
                <li><Link href="/">A Siwa Chelmsford</Link></li>
                <li><Link href="/">A Mara Chelmsford</Link></li>
                <li><Link href="/">A Timia Chelmsford</Link></li>
                <li><Link href="/">An Ubari Chelmsford</Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} md={2}>
              <Link className="footerTitle" href="/">Legacy</Link>
            <ul>
                <li><Link href="/">History of Helping</Link></li>
                <li><Link href="/">Financial Strength</Link></li>
                <li><Link href="/">Board of Directors</Link></li>
                <li><Link href="/">Careers & Volunteers</Link></li>
              </ul>
            </Grid>
            <Grid item xs={12} md={3}><Link className="footerTitle" href="/">Contact Us</Link>
            <ul>
                <li><Link href="tel:984-617-3905">(310) 995-4859</Link></li>
                <li>15116 Roxford St,</li>
                <li>Sylmar, CA 91342</li>
              </ul>
            </Grid>
            <Grid item xs={12} sx={{marginTop:"90px"}}>
              <Typography color="#8bcbd2" sx={{fontSize:{xs:"14px",md:"20px"},marginBottom:"20px", lineHeight:"1.2", fontWeight:300, fontFamily: "Adequate,Helvetica,\"sans-serif\""}}>Chelmsford is a RCFE Senior Living Community. </Typography>
              <Divider sx={{background:"#8bcbd2",height:"1px"}}/>
            </Grid>
            <Grid item xs={12} sx={{display:"flex"}}>
            <FaAccessibleIcon style={{fontSize:"25px"}} /> <FaHospitalAlt style={{fontSize:"25px",marginLeft:"20px"}} /> <span style={{flexGrow:1}}/> 
            <Link target='_blank' href="https://twitter.com/oasismanors"><FaXTwitter style={{fontSize:"25px"}}/></Link>   <Link target='_blank' href="https://www.facebook.com/oasismanors"><FaFacebook style={{fontSize:"25px",marginLeft:"20px"}}/></Link>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" sx={{fontFamily:"Acumin-Pro,Helvetica Neue,Helvetica,\"sans-serif\"",lineHeight:1.4}} >Chelmsford, Sylmar RCFE 191-603774, COA 257
                    ©2024 <br/> Episcopal Communities & Services. All Rights Reserved. A website by Softechinfra.</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ul style={{display:"flex",justifyContent:"flex-end"}}>
                    <li><Link style={{fontSize:"1rem",padding:"0px 14px",borderRight:"1px solid #8bcbd2"}} href="/">Press</Link></li>
                    <li><Link style={{padding:"0px 14px", fontSize:"1rem",borderRight:"1px solid #8bcbd2",lineHeight:1.2,}} href="/">Financial Strength</Link></li>
                    <li><Link style={{padding:"0px 14px",fontSize:"1rem",borderRight:"1px solid #8bcbd2",lineHeight:1.2}} href="/">Privacy Policy</Link></li>
                    <li><Link style={{padding:"0px 14px",fontSize:"1rem",lineHeight:1.2,}} href="/">Sitemap</Link></li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>
            <div className="copyright-area">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-6 col-md-6">
                <p>
                  Copyright &copy;{currentYear} Softechinfra. All rights reserved{" "}
                  <a href="https://Softechinfra.com/" target="_blank">
                    Softechinfra
                  </a>
                </p>
              </div>

              <div className="col-lg-6 col-sm-6 col-md-6">
                <ul>
                  <li>
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </Grid>
         
        </Container>
    </section>
  )
}

export default Footer