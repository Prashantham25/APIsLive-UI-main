import React from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../components/MDBox";

function SurveyorReport() {
  const columns = [
    {
      field: "select",
      headerName: "Select",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "surveyrefernecid",
      headerName: "Survey Reference ID",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "surveytype",
      headerName: "Survey Type",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "surveyortype",
      headerName: "Surveyor Type",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "assignmentdate",
      headerName: "Date Of Assignment",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "surveyorname",
      headerName: "Surveyor Name",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "surveycompletedate",
      headerName: "Survey Complete Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "status",
      headerName: "Status",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "edit",
      headerName: "Edit",
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];
  const rows = [{ id: 1 }];
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
      <MDBox
        sx={{
          mt: 3,

          width: "100%",
          "& .super-app-theme--header": {
            backgroundColor: "#64b5f6",
          },
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
  );
}

export default SurveyorReport;
