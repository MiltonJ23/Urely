import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const FeedbackForm: React.FC = () => {
  // State to store submitted feedback
  const [feedback, setFeedback] = useState<string | null>(null);

  // Initial values for the feedback form
  const initialValues = {
    firstRendezvousFeedback: "",
    experienceFeedback: "",
  };

  // Validation schema for feedback form
  const validationSchema = Yup.object({
    firstRendezvousFeedback: Yup.string().required("Feedback is required"),
    experienceFeedback: Yup.string().required(
      "Experience feedback is required"
    ),
  });

  // Form submission handler
  const onSubmit = (values: typeof initialValues) => {
    setFeedback(
      `First Rendezvous Feedback: ${values.firstRendezvousFeedback}\nExperience Feedback: ${values.experienceFeedback}`
    );
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Patient Feedback Form</Typography>
        </Toolbar>
      </AppBar>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name=" RendezvousFeedback"
                  label="How was the first rendezvous?"
                  fullWidth
                  multiline
                  rows={4}
                  error={
                    touched.firstRendezvousFeedback &&
                    Boolean(errors.firstRendezvousFeedback)
                  }
                  helperText={<ErrorMessage name="firstRendezvousFeedback" />}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="experienceFeedback"
                  label="Describe your experience"
                  fullWidth
                  multiline
                  rows={4}
                  error={
                    touched.experienceFeedback &&
                    Boolean(errors.experienceFeedback)
                  }
                  helperText={<ErrorMessage name="experienceFeedback" />}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      {/* Display feedback after form submission */}
      {feedback && (
        <div style={{ marginTop: 20 }}>
          <Typography variant="h6" gutterBottom>
            Submitted Feedback:
          </Typography>
          <pre>{feedback}</pre>
        </div>
      )}
    </Container>
  );
};

export default FeedbackForm;
