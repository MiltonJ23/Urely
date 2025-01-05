import React from "react";
import { Paper } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function LabResultsTableData({ labResults = [] }: { labResults?: any[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="lab results table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell>TYPE</TableCell>
            <TableCell>RESULT</TableCell>
            <TableCell>REFERENCE RANGE</TableCell>
            <TableCell>UNIT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labResults.length > 0 ? (
            labResults.map((labResult: any, index: any) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{labResult.type}</TableCell>
                <TableCell>{labResult.result}</TableCell>
                <TableCell>{labResult.referenceRange || "N/A"}</TableCell>
                <TableCell>{labResult.unit || "N/A"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No lab results available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LabResultsTableData;
