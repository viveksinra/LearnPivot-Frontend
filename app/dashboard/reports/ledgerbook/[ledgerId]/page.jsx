'use client';
import React from 'react'
import Daybook from "../../daybook/page"
import { useSearchParams } from 'next/navigation'

function MyLegerBook({ params }) {
  const searchParams = useSearchParams()
  console.log(searchParams.get('date'))
    return (<Daybook ledgerId={params.ledgerId}/>   
  )
}

export default MyLegerBook