import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import download from 'downloadjs';
import { reportService } from '@/app/services';

const DownReceipt = ({

}) => {
  const [posData, setPosData] = useState({});
  // Fetch POS data when the component mounts
  const fetchPosData = async () => {
    try {
            const response = await reportService.getMyAllPayment(
              // { childId: selectedChild }
            );
      
      if (response.data.variant === 'success') {
        setPosData(response.data.myData);
      } else {
        console.log('Failed to fetch POS data');
      }
    } catch (error) {
      console.log('Failed to fetch POS data');
    }
  };

  useEffect(() => {
    fetchPosData();
  }, []);

  const formatMyDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const downloadAgreement = async () => {
    try {
      // i want date in dd/mm/yyyy format
      const myAgreementDate = formatMyDate(posData.aggrementSignedDate);

      // getting address 2
      let myAddress = '';
      if (posData?.pincode) {
        myAddress = `${posData?.district} ${posData?.state} ${posData?.pincode}`;
      }

      // Load the existing PDF from local path
      const url = '/assets/pdf/aggreData.pdf';
      const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the form containing the fields in the PDF
      const form = pdfDoc.getForm();

      // Get individual fields using their names
      const agreementDate = form.getTextField('agreementDate');
      const posName = form.getTextField('posName');
      const panNumber = form.getTextField('panNumber');
      const aadhar = form.getTextField('aadhar');
      const address = form.getTextField('address');
      const education = form.getTextField('education');
      const account = form.getTextField('account');
      const holderName = form.getTextField('holderName');
      const ifsc = form.getTextField('ifsc');

      // Fill in the fields with the fetched data
      agreementDate.setText(myAgreementDate);
      posName.setText(`${posData?.firstName} ${posData?.middleName} ${posData?.lastName}` || 'N/A');
      address.setText(myAddress || 'N/A');
      panNumber.setText(posData?.panNumber || 'N/A');
      aadhar.setText(posData?.aadharNumber || 'N/A');
      education.setText('Verified' || 'N/A');
      account.setText(posData?.accountNumber || 'N/A');
      holderName.setText(posData?.holderName || 'N/A');
      ifsc.setText(posData?.ifscCode || 'N/A');

      // Flatten the form to make the fields non-editable
      form.flatten();

      // Serialize the PDFDocument to bytes (which can be downloaded)
      const pdfBytes = await pdfDoc.save();

      // Download the PDF with filled data
      await download(pdfBytes, 'insofy_agreement.pdf', 'application/pdf');
    } catch (error) {
      console.log(error);
      alert('Failed to generate the certificate');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: '10px',
      }}
    >
      <Button
        variant="contained"
        style={{ backgroundColor: '#18B5AC' }}
        onClick={downloadAgreement}
      >
        View Receipt
      </Button>
    </Box>
  );
};

export default DownReceipt;
