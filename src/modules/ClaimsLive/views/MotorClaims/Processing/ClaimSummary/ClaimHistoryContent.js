import React from "react";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, info) {
  return { name, info };
}

const tablerows = [
  createData("Claim No	", ""),
  createData("Loss Date	", ""),
  createData("Intimation Date		", ""),
  createData("Description of Loss	", ""),
  createData("% Reserve Change from Initial Reserve", ""),
  createData("Claim Handler Name	", ""),
  createData("Surveyor Name	", ""),
  createData("Claim Status(Paid,Open,Closed)	", ""),
  createData("Amount Paid (Indemnity)	", ""),
  createData("Closure Reason	", ""),

  createData("ADDON 1 description	", ""),
  createData("ADDON 1 amount", ""),
  createData("ADDON 2 description	", ""),
  createData("ADDON 2 amount", ""),
  createData("ADDON 3 description	", ""),
  createData("ADDON 3 amount", ""),
  createData("ADDON 4 description	", ""),
  createData("ADDON 4 amount", ""),
  createData("ADDON 5 description	", ""),
  createData("ADDON 5 amount", ""),
  createData("ADDON 6 description	", ""),
  createData("ADDON 6 amount", ""),
  createData("ADDON 7 description	", ""),
  createData("ADDON 7 amount", ""),
  createData("ADDON 8 description	", ""),
  createData("ADDON 8 amount", ""),
  createData("ADDON 9 description	", ""),
  createData("ADDON 9 amount", ""),
  createData("ADDON 10 description	", ""),
  createData("ADDON 10 amount", ""),

  createData("ADDON 11 description	", ""),
  createData("ADDON 11 amount	", ""),
];

function ClaimHistoryContent() {
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
                  <TableCell align="right">{row.info}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default ClaimHistoryContent;
