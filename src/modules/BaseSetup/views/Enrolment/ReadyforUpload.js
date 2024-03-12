import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDDatePicker from "components/MDDatePicker";
import MDInput from "../../../../components/MDInput";

function ReadyforUpload() {
  const [tableRows] = useState([]);
  const tableColumns = [
    {
      field: "EducationLoanAccountNo",
      headerName: "Education Loan Account No",
      width: 100,
      //   renderCell: (param) => (
      //     <Radio
      //       onClick={(e) => onPolicyRowSelect(e, param.row.policyNumber, param.row.productIdPk)}
      //     />
      //   ),
    },
    {
      field: "PolicyNo",
      headerName: "Policy Number",
      width: 250,
    },
    {
      field: "Serial No",
      headerName: "Serial No",
      width: 150,
    },
    {
      field: "Parent Id",
      headerName: "Parent Id",
      width: 150,
    },
    {
      field: "Policy Start Date",
      headerName: "Policy Start Date",
      width: 150,
    },
    {
      field: "policyEndDate",
      headerName: "Policy End Date",
      width: 150,
    },
    {
      field: "plan",
      headerName: "plan",
      width: 100,
      //   renderCell: (param) => (
      //     <MDButton
      //       size="medium"
      //       variant="text"
      //       onClick={(e) => handleEmail(e, param.row, true)}
      //       startIcon={<EmailIcon fontSize="large" variant="contained" />}
      //       textAlign="center"
      //     />
      //   ),
    },
    {
      field: "TripType",
      headerName: "TripType",
      width: 150,
    },
    {
      field: "Geography",
      headerName: "Geography",
      width: 150,
    },
    {
      field: "No of Days",
      headerName: "No of Days",
      width: 150,
    },
    {
      field: "ProductCode",
      headerName: "ProductCode",
      width: 150,
    },
    {
      field: "List of Destination",
      headerName: "List of Destination",
      width: 150,
    },
    {
      field: "SumInsured",
      headerName: "SumInsured",
      width: 150,
    },
    {
      field: "Trip Start Date",
      headerName: "Trip Start Date",
      width: 150,
    },
    {
      field: "Trip End Date",
      headerName: "Trip End Date",
      width: 150,
    },
    {
      field: "Salutation",
      headerName: "Salutation",
      width: 150,
    },
    {
      field: "Proposer Name",
      headerName: "Proposer Name",
      width: 150,
    },
    {
      field: "Proposer Gender",
      headerName: "Proposer Gender",
      width: 150,
    },
    {
      field: "Proposer DOB",
      headerName: "Proposer DOB",
      width: 150,
    },
    {
      field: "Proposer EmailId",
      headerName: "Proposer EmailId",
      width: 150,
    },
    {
      field: "Proposer ContactNo",
      headerName: "Proposer ContactNo",
      width: 150,
    },
    {
      field: "download",
      headerName: "Download",
      width: 100,
      //   renderCell: (param) => (
      //     <MDButton
      //       size="medium"
      //       variant="text"
      //       onClick={(e) => handleDownload(e, param.row.policyNumber)}
      //       startIcon={<DownloadIcon fontSize="large" variant="contained" />}
      //       textAlign="center"
      //     />
      //   ),
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="body1" color="primary">
          Ready For Upload
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Education Loan Account No" name="partnerAddressLine1" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker input={{ label: "From Date" }} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker input={{ label: "To Date" }} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row">
          <MDButton sx={{ justifyContent: "right" }} variant="contained">
            Search
          </MDButton>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <DataGrid
          autoHeight
          rows={tableRows}
          columns={tableColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row.policyNumber}
        />
      </Grid>
    </Grid>
  );
}

export default ReadyforUpload;
