import React from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../components/MDBox";

function RandomAudit() {
  const columns = [
    {
      field: "auditresult",
      headerName: "Audit Result",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "createddate",
      headerName: "Created Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "username",
      headerName: "User Name",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "download",
      headerName: "Download",
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

export default RandomAudit;