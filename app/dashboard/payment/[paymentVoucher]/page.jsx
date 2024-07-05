import React from 'react'
import Payment from "../page"
function page({params}) {
  return (
    <Payment paymentVoucher={params.paymentVoucher}/>
  )
}

export default page