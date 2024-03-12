import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, FormControlLabel, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";

import RadioGroup from "@mui/material/RadioGroup";

import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";

function createData(name) {
  return { name };
}

const tablerows = [
  createData("L4- Code"),
  createData("L4- Description"),
  createData("Hospital Code"),
  createData("Code Description"),
  createData("Charges"),
  createData("Unit/LOS"),
  createData("Room name Mapping"),
];

function ConfigureSoc() {
  const [setPED, setPEDFlag] = React.useState(true);
  const [value, setValue] = React.useState("No");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (value === "No") setPEDFlag(false);
    else setPEDFlag(true);
  });
  const [rows, setrows] = React.useState([]);
  const [rowsid, setrowsid] = React.useState(0);

  const handleAddRow = () => {
    setrows([...rows, { id: rowsid + 1 }]);

    setrowsid(rowsid + 1);
  };
  const columns = [
    {
      field: "roomname",
      headerName: "Room Name",
      width: 280,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDInput />,
    },

    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 150,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rows.filter((row) => row.id !== param.id);

          setrows([...newArray]);
        };

        return <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Configure SOC ?
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChange(event)} value={value}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      {setPED && (
        <>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 1 }}>
              Add Hospital room (for Excel SOC)
            </MDTypography>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox
                sx={{
                  mt: 2,
                  width: "80%",
                  "& .super-app-theme--header": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <DataGrid
                  autoHeight
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </MDBox>
            </Grid>

            <Stack justifyContent="right" direction="row" spacing={1} sx={{ mr: 8, mt: 2 }}>
              <MDButton color="info" onClick={handleAddRow}>
                ADD
              </MDButton>
              <MDButton color="info">Save</MDButton>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Standard Column in Excel</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablerows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      )}

      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDInput label="DEO Remarks" sx={{ mt: 2 }} />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row" spacing={1} sx={{ mt: 2 }}>
          <MDButton color="info">SUBMIT</MDButton>
          <MDButton color="info">CANCEL</MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ConfigureSoc;
