import React from "react";
import { Grid, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

function WelcomeContent() {
  const columns = [
    {
      field: "kitdate",
      headerName: "Kit Generation Date",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "couriername",
      headerName: "Courier Name",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "dispatchno",
      headerName: "Dispatch No",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "dispatchdate",
      headerName: "Dispatch date",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
  ];
  const [rows] = React.useState([]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Kit Date" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" Courier Name" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Dispatch No & POD" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Dispatch Date" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            width: "100%",
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
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row">
          <MDButton color="info" sx={{ mr: 2, mt: 2 }}>
            SUBMIT
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default WelcomeContent;
