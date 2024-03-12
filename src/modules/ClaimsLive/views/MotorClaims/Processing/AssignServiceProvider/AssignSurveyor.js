import React from "react";
import { Grid, Autocomplete } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDButton from "../../../../../../components/MDButton";
import MDBox from "../../../../../../components/MDBox";
import MDInput from "../../../../../../components/MDInput";
import MDDatePicker from "../../../../../../components/MDDatePicker";

function AssignSurveyor() {
  const columns = [
    {
      field: "status",
      headerName: "   Status",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "surveyorname",
      headerName: " Surveyor Name	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "Surveyorid",
      headerName: " Surveyor ID",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "Surveyortype",
      headerName: " Surveyor Type	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => <MDInput {...params} sx={{ mb: 1 }} />}
        />
      ),
    },

    {
      field: "	Surveyorcontact",
      headerName: "  	Surveyor Contact",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDInput />,
    },

    {
      field: "surveytype",
      headerName: " Survey Type	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => <MDInput {...params} sx={{ mb: 1 }} />}
        />
      ),
    },

    {
      field: "assigneddate",
      headerName: "  Assigned Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDDatePicker />,
    },

    {
      field: "assignedtime",
      headerName: " 	Assigned Time",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "rating",
      headerName: " Performance Rating",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDInput />,
    },

    {
      field: "targetdate",
      headerName: " Target Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDDatePicker />,
    },

    {
      field: "remark",
      headerName: " 	Remark",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDInput />,
    },
    {
      field: "approve",
      headerName: " 	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];
  const rows = [{ id: 1 }];
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDButton>Search Surveyor</MDButton>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDButton>Customer Self-Survey</MDButton>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            mt: 3,

            width: "100%",
          }}
        >
          <DataGrid
            autoHeight
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default AssignSurveyor;
