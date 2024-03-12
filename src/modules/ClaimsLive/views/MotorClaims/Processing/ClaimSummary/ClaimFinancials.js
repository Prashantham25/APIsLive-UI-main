import React from "react";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, amt) {
  return { name, amt };
}

const tablerows = [
  createData("Last updated reserve amount	", "67660.00"),
  createData("Paid amount	", "67660.00"),
  createData("Paid amount as % of Last updated reserve amount	", "100%"),
  createData("Number of Reserve Changes", "6"),
  createData("% Reserve Change from Initial Reserve", "6"),
  createData("Unit/LOS", ""),
];

function ClaimFinancials() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
            <TableBody>
              {tablerows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.amt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default ClaimFinancials;
