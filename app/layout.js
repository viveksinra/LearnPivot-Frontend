import React from 'react';
import LayoutWrapper from './LayoutWrapper'; 
import "swiper/css/bundle";

// Global CSS
import "../styles/style.css";
import "../styles/responsive.css";
import './globals.css';

import Head from 'next/head';
import Image from 'next/image';

export const metadata = {
  title: 'Chelmsford 11 Plus - Preparing for Success in the 11 Plus Exam',
  description: 'Help your child excel in the 11 Plus exam with expertly designed classes and mock tests tailored for Year 5-6 students. Book sessions now and prepare them for a brighter future. For more details, reach us at info@chelmsford11plus.com.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Courgette&display=swap" 
          as="style" 
          onload="this.onload=null;this.rel='stylesheet'"
        />
        <link 
          rel="preload" 
          href="https://db.onlinewebfonts.com/c/0d49fc455f4a8951a42daf952412a713?family=Helvetica+Neue+Regular" 
          as="style" 
          onload="this.onload=null;this.rel='stylesheet'"
        />

        {/* Lazy load non-critical CSS */}
        <link 
          rel="stylesheet" 
          href="https://use.typekit.net/jny4fhu.css" 
          media="print" 
          onload="this.onload=null;this.media='all'"
        />
      </Head>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
