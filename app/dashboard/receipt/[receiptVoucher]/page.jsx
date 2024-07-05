import React from 'react'
import Payment from "../../payment/page"
function page({params}) {
  return (
    <Payment receiptVoucher={params.receiptVoucher} receipt={true}/>
  )
}

export default page