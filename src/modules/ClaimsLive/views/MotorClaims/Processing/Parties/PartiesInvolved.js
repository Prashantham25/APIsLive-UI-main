import React from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";

function PartiesInvolved() {
  const columns = [
    {
      field: "chk",
      headerName: "CheckBox",
      width: 100,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "requestreferencenumber",
      headerName: "Request Reference number",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "clientid",
      headerName: "Client ID",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "payeetype",
      headerName: "Payee Type",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "payeename",
      headerName: "Payee Name",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "payeecontact",
      headerName: "Payee Contact Number",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "accountholdername",
      headerName: "Account Holder Name",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "accountnumber",
      headerName: "Account Number",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "typeofaccount",
      headerName: "Type Of Account",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "ifsccode",
      headerName: "IFSC Code",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "bankname",
      headerName: "Bank Name",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "requestremark",
      headerName: "Request Remark",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "neftrequeststatus",
      headerName: "NEFT Request Status",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "approveremark",
      headerName: "Approve Remark",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "actiondate",
      headerName: "Action Date",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "neftmandat",
      headerName: "NEFT Mandate",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "cancelledcheque",
      headerName: "Cancelled Cheque",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "addressproof",
      headerName: "Address Proof",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "identityproof",
      headerName: "Identity Proof",
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
    {
      field: "delete",
      headerName: "Delete",
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];
  const rows = [{ id: 1 }];
  return (
    <Grid container>
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

      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDButton>Search Existing Client</MDButton>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDButton>Financier/Claimant/Beneficiary</MDButton>
      </Grid>
    </Grid>
  );
}

export default PartiesInvolved;
