import React from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import MDBox from "../../../../../components/MDBox";

function auditContent() {
  const columns = [
    {
      field: "workflowstep",
      headerName: "Work Flow Step",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "username",
      headerName: "UserName",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "datetime",
      headerName: "date & Time",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
  ];
  const [rows] = React.useState([]);
  return (
    <Grid container spacing={2}>
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
    </Grid>
  );
}

export default auditContent;
