// layout.js

import React from 'react';
import LayoutWrapper from './LayoutWrapper'; 

import "../styles/bootstrap.min.css";
// import "../styles/fontawesome.min.css";
// import "../styles/animate.min.css";
// import "../styles/flaticon.css";
// import "../styles/boxicons.min.css";
// import "react-accessible-accordion/dist/fancy-example.css";
// import "react-tabs/style/react-tabs.css";
// import "swiper/css";
import "swiper/css/bundle";

// Global CSS
import "../styles/style.css";
import "../styles/responsive.css";

import  './globals.css';

export const metadata = {
  title: 'Chelmsford - Assisted Living Facility at Mahavir Nagar, Araria',
  description: 'Best Assisted Living Facility for Elderly. Get Nutritious homestyle meals and furnished rooms. Emergency call system and 24-hour supervision. Low-impact wellness program in pool and spa. Games, walks, local visits, shopping and regular yoga activities. Grab all facilities at one place - Chelmsford. Call 984-617-3905',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper> 
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
