import React, { useState } from "react";
import { Paper, TextField, Button, Grid, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function LabResultsForm() {
  const [formData, setFormData] = useState({
    date: "",
    testName: "",
    result: "",
    referenceRange: "",
    unit: "",
  });

  const [submittedData, setSubmittedData] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({
      date: "",
      testName: "",
      result: "",
      referenceRange: "",
      unit: "",
    });
  };

  return (
    <>
      <Paper sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Submit Lab Results
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Test Name"
                name="testName"
                value={formData.testName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Result Obtained"
                name="result"
                value={formData.result}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Reference Range"
                name="referenceRange"
                value={formData.referenceRange}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {submittedData.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="lab results table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Test Name</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Reference Range</TableCell>
                <TableCell>Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.testName}</TableCell>
                  <TableCell>{data.result}</TableCell>
                  <TableCell>{data.referenceRange || "N/A"}</TableCell>
                  <TableCell>{data.unit || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default LabResultsForm;
