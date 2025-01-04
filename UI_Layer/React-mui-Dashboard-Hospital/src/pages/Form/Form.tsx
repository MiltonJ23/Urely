import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  FormControl,
  Container,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PatientForm: React.FC = () => {
  // Initial values for the form
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: "",
    address: "",
    bloodGroup: "",
    referredByDoctor: "",
    referredByDoctorEmail: "",
    referredByDoctorPhoneNumber: "",
    diseases: "",
    patientHistory: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be a valid phone number"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be an integer"),
    address: Yup.string().required("Address is required"),
    bloodGroup: Yup.string().required("Blood group is required"),
    referredByDoctor: Yup.string().required("Doctor name is required"),
    referredByDoctorEmail: Yup.string()
      .email("Invalid email address")
      .required("Doctor email is required"),
    referredByDoctorPhoneNumber: Yup.string()
      .required("Doctor phone number is required")
      .matches(/^[0-9]+$/, "Must be a valid phone number"),
    diseases: Yup.string().required("Diseases field is required"),
    patientHistory: Yup.string().required("Patient history is required"),
  });

  // Form submission handler
  const onSubmit = (values: typeof initialValues) => {
    console.log("Form submitted:", values);
    alert("Form submitted successfully!");
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Patient Examination Form</Typography>
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
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="firstName"
                  label="First Name"
                  fullWidth
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={<ErrorMessage name="firstName" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={<ErrorMessage name="lastName" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={<ErrorMessage name="email" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={<ErrorMessage name="phoneNumber" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="age"
                  label="Age"
                  fullWidth
                  error={touched.age && Boolean(errors.age)}
                  helperText={<ErrorMessage name="age" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="address"
                  label="Address"
                  fullWidth
                  error={touched.address && Boolean(errors.address)}
                  helperText={<ErrorMessage name="address" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={touched.bloodGroup && Boolean(errors.bloodGroup)}
                >
                  <InputLabel id="blood-group-label">Blood Group</InputLabel>
                  <Field
                    as={Select}
                    name="bloodGroup"
                    labelId="blood-group-label"
                  >
                    <MenuItem value="">Select Blood Group</MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                  </Field>
                  <FormHelperText>
                    <ErrorMessage name="bloodGroup" />
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="referredByDoctor"
                  label="Referred By Doctor"
                  fullWidth
                  error={
                    touched.referredByDoctor && Boolean(errors.referredByDoctor)
                  }
                  helperText={<ErrorMessage name="referredByDoctor" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="referredByDoctorEmail"
                  label="Doctor's Email"
                  fullWidth
                  error={
                    touched.referredByDoctorEmail &&
                    Boolean(errors.referredByDoctorEmail)
                  }
                  helperText={<ErrorMessage name="referredByDoctorEmail" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="referredByDoctorPhoneNumber"
                  label="Doctor's Phone Number"
                  fullWidth
                  error={
                    touched.referredByDoctorPhoneNumber &&
                    Boolean(errors.referredByDoctorPhoneNumber)
                  }
                  helperText={
                    <ErrorMessage name="referredByDoctorPhoneNumber" />
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="diseases"
                  label="Diseases"
                  fullWidth
                  multiline
                  rows={3}
                  error={touched.diseases && Boolean(errors.diseases)}
                  helperText={<ErrorMessage name="diseases" />}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="patientHistory"
                  label="Patient History"
                  fullWidth
                  multiline
                  rows={3}
                  error={
                    touched.patientHistory && Boolean(errors.patientHistory)
                  }
                  helperText={<ErrorMessage name="patientHistory" />}
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
    </Container>
  );
};

export default PatientForm;
