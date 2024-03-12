import React from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../components/MDBox";

function InvoiceGridDetails() {
  const columns = [
    {
      field: "surveyorname",
      headerName: "Surveyor Name",
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
      field: "invoicenumber",
      headerName: "Invoice Number",
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
      field: "taxableamount",
      headerName: "Taxable Amount",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "tax",
      headerName: "Tax",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "netamount",
      headerName: "Net Amount",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "delete",
      headerName: "Delete",
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

export default InvoiceGridDetails;
