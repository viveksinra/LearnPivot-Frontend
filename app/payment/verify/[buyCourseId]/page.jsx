"use client";
import React, { Fragment, useEffect } from 'react'
import { useState,Suspense  } from "react";
import Navbar from '../../../Components/ITStartup/Common/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import Loading from '../../../Components/Loading/Loading';
import PaymentCom from '../../../Components/ITStartup/payment/PaymentCom';
import { myCourseService } from '@/app/services';

function MyPayment({params}) {  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

   // Getting date from Voucher in URL
   async function getPaymentDetails() {
    setLoading(true)
  try{
    let res = await myCourseService.publicVerifyOnePayment(`${params.buyCourseId}`);
    if (res.variant === "success") {
      setData(res.myData)
      snackRef.current.handleSnack(res);
    } else {
      snackRef.current.handleSnack(res);
    }
  }catch (error) {
    console.error("Error fetching data:", error);
  }   
    setLoading(false)

  }


  useEffect(() => {
  

 
    getPaymentDetails();
  }, [params]);
  return (
    <Fragment>
      <Navbar />
      <Suspense fallback={<Loading />}>
      <PaymentCom data={data} isLoading={loading} onRefresh={getPaymentDetails} />
      <Footer />

      </Suspense>
    </Fragment>
  );
  }



 
export default MyPayment