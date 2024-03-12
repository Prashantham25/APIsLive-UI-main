import React from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../components/MDBox";

function BreTrggerLog() {
  const columns = [
    {
      field: "rulename",
      headerName: "Rule Name",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "message",
      headerName: "Message",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "executiondate",
      headerName: "Execution Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "contstableCompromisable",
      headerName: "Contstable/Compromisable",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "severity",
      headerName: "Severity",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "latestscore",
      headerName: "Latest Score",
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

export default BreTrggerLog;
