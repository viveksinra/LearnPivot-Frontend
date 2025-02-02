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
  
  const links =[
    {label:"About Us",link:"about"},
    {label:"Contact Us",link:"contact"},
    {label:"Terms & Conditions",link:"policy/termandcondition"},
    {label:"Privacy Policy",link:"policy/privacyPolicy"},
  ]
 
  return (
    <section className="footerBg">
        <Container maxWidth="xl">
          <Grid container>
          <Grid item xs={12} md={1}>
            </Grid>
            <Grid item xs={12} md={3}>
            <Link href="/">
            <Image width={160} height={60} src="https://res.cloudinary.com/qualifier/image/upload/v1706185907/Logo/chelmsford-high-resolution-logo_vc9ewh.svg" alt="Chelmsford" loading="lazy"/>
        </Link><br/><br/>
        <Typography color="black" variant="subtitle1">Embark on a journey of knowledge, innovation, and personal growth with our cutting-edge e-learning platform. Here, empowerment flourishes, and your educational aspirations take center stage.</Typography>
<br />
<Typography variant="body2" color="secondary">Our Platform - Igniting Minds, Shaping Futures</Typography>

            </Grid>
            <Grid item xs={12} md={1}>
            </Grid>
            <Grid item xs={12} md={3}>
            <Typography variant="h5" color="primary" style={{fontFamily: 'Courgette'}}>Our Amenities :-</Typography>
            <ul id="amenitiesUl">
                {amenities.map(d=><li key={d}>{d}</li>)}
              </ul>
            </Grid>
            {/* <Grid item xs={12} md={3}>
            <Typography variant="h5" color="primary" style={{fontFamily: 'Courgette'}}> Quick Links :- </Typography>
            <ul id="quickUl">
              {links.map(l=><li key={l.label}><Link href={`/${l.link}`} >{l.label} ↠</Link></li> )}
            </ul>   
            </Grid> */}
            <Grid item xs={12} md={3}>
            <Typography variant="h5" color="primary" style={{fontFamily: 'Courgette'}}> Quick Links :- </Typography>
            <ul id="quickUl">
              {links.map(l=><li key={l.label}><Link href={`/${l.link}`} >{l.label} ↠</Link></li> )}
            </ul>   
            </Grid>
            <Grid item xs={12} md={1}>
            </Grid>
          </Grid>
        </Container>
    </section>
  )
}




export default Footer