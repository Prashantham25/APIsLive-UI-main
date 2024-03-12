import React, { useState } from "react";
import { Grid, Card } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import ClaimsDetails from "./JsonData";

// import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
// import MDButton from "../../../../../components/MDButton";

function SurveyorFeeApproval() {
  const navigate = useNavigate();
  // const redAsterisk = {
  //   "& .MuiFormLabel-asterisk": {
  //     color: "red",
  //   },
  // };
  const [claimJson, setClaimJson] = useState(ClaimsDetails);
  const handleNavigate = (claimno) => {
    claimJson.claimsMenuId = 8;
    console.log(claimno);
    setClaimJson({ ...ClaimsDetails }); // might need to comment
    navigate(`/Claim/Processing`, {
      state: {
        gridData: { ...claimJson },
        productCode: "NepalMotorTwoWheeler",
      },
    });
  };
  const rows = [
    {
      ClaimNo: "PRO1/KTM/MC/000001/23/242",
      Name: "Ram",
      Amount: "10000",
      ClaimAmount: "50000",
    },
    {
      ClaimNo: "PRO1/KTM/MC/000001/23/243",
      Name: "Ram",
      Amount: "10000",
      ClaimAmount: "50000",
    },
    {
      ClaimNo: "PRO1/KTM/MC/000001/23/244",
      Name: "Ram",
      Amount: "10000",
      ClaimAmount: "50000",
    },
    {
      ClaimNo: "PRO1/KTM/MC/000001/23/245",
      Name: "Ram",
      Amount: "10000",
      ClaimAmount: "50000",
    },
  ];
  const tableColumns = [
    {
      field: "ClaimNo",
      headerName: "Claim Number",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const Claimno = params.value;
        return (
          <button
            type="button"
            style={{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate(Claimno)}
          >
            {Claimno}
          </button>
        );
      },
    },
    {
      field: "Name",
      headerName: "Surveyor Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Amount",
      headerName: "Surveyor fee Amount",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ClaimAmount",
      headerName: "Claim Amount",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
  ];
  // const handlesearch = () => {
  //   claimJson.claimsMenuId = 8;
  //   setClaimJson({ ...ClaimsDetails }); // might need to comment
  //   navigate(`/Claim/Processing`, {
  //     state: {
  //       gridData: { ...claimJson },
  //       productCode: "NepalMotorTwoWheeler",
  //     },
  //   });
  // };

  return (
    <Card>
      <Grid container p={2}>
        <Grid container alignItems="center">
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography variant="h6" color="primary">
              Surveyor Fee Approval
            </MDTypography>
          </Grid>
          {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} textAlign="right">
            <MDButton variant="contained">Claim File Movement</MDButton>
          </Grid> */}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.ClaimNo}
            // onRowClick={(param) => handleMemberClick(param)}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default SurveyorFeeApproval;
