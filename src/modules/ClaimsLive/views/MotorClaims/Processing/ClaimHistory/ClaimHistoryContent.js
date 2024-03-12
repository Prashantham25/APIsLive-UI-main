import React from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../components/MDBox";

function ClaimHistoryContent() {
  const columns = [
    {
      field: "claimno",
      headerName: " Claim No.",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "occurrence",
      headerName: " Occurrence",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "claimtype",
      headerName: " Claim Type",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "policyno",
      headerName: " Policy No",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "vehicleno",
      headerName: "  Vehicle No",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "claimintimationdate",
      headerName: "Claim Intimation Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "indidentdate",
      headerName: " Incident Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "incidenttime",
      headerName: " Incident Time",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "incidentlocation",
      headerName: " Incident Location",
      width: 250,
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

export default ClaimHistoryContent;
