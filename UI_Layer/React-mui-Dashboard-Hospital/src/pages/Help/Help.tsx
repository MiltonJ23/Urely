import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Help = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Help & Frequently Asked Questions (FAQs)
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="faq1">
          <Typography variant="h6">How do I reset my password?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To reset your password, go to the login page and click on "Forgot
            Password." Follow the instructions sent to your email to reset your
            password.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="faq2">
          <Typography variant="h6">
            How can I contact customer support?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can contact customer support by emailing support@domain.com or
            calling our hotline at +1 800 123 4567.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="faq3">
          <Typography variant="h6">
            What should I do if I encounter an error?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you encounter an error, please try refreshing the page or logging
            out and back in. If the issue persists, contact customer support
            with a detailed description of the error.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="faq4">
          <Typography variant="h6">
            How do I update my profile information?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can update your profile information by going to the "Profile"
            section in the app and editing your details.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h5" sx={{ marginTop: "30px" }}>
        Other Important Information
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "10px" }}>
        - Ensure that your contact information is always up-to-date to receive
        important notifications.
        <br />
        - Regularly check the system for updates and new features.
        <br />- If you have any additional questions, don't hesitate to reach
        out to support.
      </Typography>
    </Box>
  );
};

export default Help;
