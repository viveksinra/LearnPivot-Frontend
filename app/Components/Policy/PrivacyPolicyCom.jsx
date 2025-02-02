import React from "react";
import Image from "next/image";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  List,
  ListItem,
  ListItemText,
  styled
} from "@mui/material";

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
}));

const StyledSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StyledImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& img': {
    borderRadius: theme.spacing(1),
  }
}));

const PrivacyPolicyCom = () => {
  return (
    <Box py={4}>
      <Container>
        <Grid container spacing={4}>

          {/* Content Column */}
          <Grid item xs={12} md={12}>
            <StyledPaper elevation={2}>
              <Typography variant="h4" component="h1" gutterBottom>
                Privacy Policy
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Last Updated: 02 Feb 2025
              </Typography>

              <Typography paragraph>
                Welcome to Chelmsford 11 Plus. Your privacy is important to us, and we are
                committed to protecting your personal information. This Privacy Policy explains how we
                collect, use, store, and protect your data when you visit our website
                www.chelmsford11plus.com or use our services.
              </Typography>

              <StyledSection>
                <Typography variant="h5" gutterBottom>
                  1. Information We Collect
                </Typography>
                <Typography paragraph>
                  We may collect the following types of information:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Personal Information"
                      secondary="Name, email address, phone number, and any other details provided when signing up or making a booking."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Payment Information"
                      secondary="Payment details are processed securely through third-party payment providers. We do not store credit/debit card information."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Usage Data"
                      secondary="Information on how you use our website, including IP addresses, browser type, and pages visited."
                    />
                  </ListItem>
                </List>
              </StyledSection>

              <StyledSection>
                <Typography variant="h5" gutterBottom>
                  2. How We Use Your Information
                </Typography>
                <Typography paragraph>
                  We use the collected data to:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Process bookings and payments" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Provide customer support and respond to inquiries" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Improve our website and services" />
                  </ListItem>
                </List>
              </StyledSection>

              <StyledSection>
                <Typography variant="h5" gutterBottom>
                  3. Data Protection & Security
                </Typography>
                <Typography paragraph>
                  We implement strict security measures to safeguard your personal data against
                  unauthorized access, alteration, disclosure, or destruction.
                </Typography>
              </StyledSection>

              <StyledSection>
                <Typography variant="h5" gutterBottom>
                  4. Sharing Your Information
                </Typography>
                <Typography paragraph>
                  We do not sell, rent, or trade your personal information. We may share your data only
                  with:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Service providers (such as payment processors) who help us operate our business" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Legal authorities, if required by law" />
                  </ListItem>
                </List>
              </StyledSection>

              <StyledSection>
                <Typography variant="h5" gutterBottom>
                  5. Contact Us
                </Typography>
                <Typography paragraph>
                  If you have any questions or concerns regarding this Privacy Policy, please contact us at:
                </Typography>
                <Typography
                  component="a"
                  href="mailto:info@chelmsford11plus.com"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  info@chelmsford11plus.com
                </Typography>
              </StyledSection>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyCom;