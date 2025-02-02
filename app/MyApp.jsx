// MyApp.js
"use client";
import React, { Fragment, useEffect, useState, Suspense } from 'react';
import "./pageStyle.css";
import Enquiry from "./Components/Enquiry/Enquiry";
import Footer from "./Components/Footer/Footer";
import { Box } from '@mui/material';
import Loading from "./Components/Loading/Loading";
import Navbar from './Components/ITStartup/Common/Navbar/Navbar';
import Banner from './Components/ITStartup/BannerCom/Banner';
import ServiceCom from './Components/ITStartup/ServiceOverview/ServiceCom';
import FaqCom from './Components/ITStartup/Faq/FaqCom';
import TawkToChat from './Components/Common/TawkToChat';

// CookieNotice Component with white background
const CookieNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if cookie notice has already been accepted
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.noticeContainer}>
      <p style={styles.noticeText}>
        <strong>Cookies Notice</strong><br />
        We use cookies to enhance your browsing experience. No personal information is stored. By continuing to use our website, you agree to our&nbsp;
        <a href="/privacy-policy" style={styles.link}>use of cookies</a>.
      </p>
      <button style={styles.button} onClick={handleAccept}>Okay</button>
    </div>
  );
};

const styles = {
  noticeContainer: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff', // White background
    color: '#333',      // Dark text for contrast
    padding: '15px 20px',
    borderRadius: '5px',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Optional: add a subtle shadow for depth
    maxWidth: '90%',
  },
  noticeText: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.5',
  },
  button: {
    background: '#333', // Dark button background
    color: '#fff',       // White text on button
    border: 'none',
    borderRadius: '3px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  link: {
    color: '#0073e6',    // Blue link color
    textDecoration: 'underline'
  }
};

function MyApp() {
  const [value, setValue] = useState(0);
  const [hero, setHero] = useState({
    btn: "Show Gallery",
    link: "/about/gallery",
    text: "Bring out the best in you.",
    bgImg: "https://res.cloudinary.com/oasismanors/image/upload/v1706128914/Oasis2_clq4l3.webp"
  });
  const [allItems] = useState([
    { btn: "Amenities", link: "/amenities", text: "Live life on your terms.", bgImg: "https://res.cloudinary.com/oasismanors/image/upload/v1706128914/Oasis1_rwtkv6.webp" },
    { btn: "Show Gallery", link: "/about/gallery", text: "Bring out the best in you.", bgImg: "https://res.cloudinary.com/oasismanors/image/upload/v1706128914/Oasis2_clq4l3.webp" },
    { btn: "Our Meal", link: "/amenities/menu", text: "Feel right at home.", bgImg: "https://res.cloudinary.com/oasismanors/image/upload/v1706128914/Oasis3_biy68f.webp" },
    { btn: "Supportive Services", link: "/lifestyle", text: "Support you can count on.", bgImg: "https://res.cloudinary.com/oasismanors/image/upload/v1706128915/Oasis4_anftz6.webp" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (value < allItems.length - 1) {
        setHero(allItems[value + 1]);
        setValue(value + 1);
      } else {
        setHero(allItems[0]);
        setValue(0);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [value, allItems]);

  return (
    <Fragment>
      <Navbar />
      {/* Cookie Notice - Only displays if not accepted */}
      <CookieNotice />

      <Suspense fallback={<Loading />}>
        <Banner />
        <div className="service-component-wrapper">
          <ServiceCom />
        </div>
        <Box>
          <Suspense fallback={<Loading />}>
            <FaqCom dataType={"faqData"} />
            <Suspense fallback={<Loading />}>
              <Enquiry />
              <Suspense fallback={<Loading />}>
                <Footer />
                <TawkToChat />
              </Suspense>
            </Suspense>
          </Suspense>
        </Box>
      </Suspense>

      <style jsx global>{`
        /* Hide ServiceCom on mobile devices */
        @media (max-width: 768px) {
          .service-component-wrapper {
            display: none !important;
          }
        }

        /* Show ServiceCom on desktop */
        @media (min-width: 769px) {
          .service-component-wrapper {
            display: block;
          }
        }
      `}</style>
    </Fragment>
  );
}

export function TopAbstract() {
  return (
    <div id="topAbstract" />
  );
}

export default MyApp;
