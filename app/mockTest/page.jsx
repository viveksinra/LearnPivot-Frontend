import React from 'react'
import MultiMockPage from './MultiMockPage'
import Navbar from '../Components/ITStartup/Common/Navbar/Navbar'
import { Container } from '@mui/material'
import Footer from '../Components/Footer/Footer'

function page() {
  return (
    <main style={{ backgroundColor: "#fff" }}>
    <Navbar />
  
    <Container style={{ marginTop:"100px" }}>
<MultiMockPage />
    </Container>
    <Footer />
  </main>
  )
}

export default page