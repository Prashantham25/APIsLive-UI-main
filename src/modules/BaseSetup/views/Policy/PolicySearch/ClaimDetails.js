import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function ClaimDetails({ claimsDetails }) {
  const [tableRows, setTableRows] = useState([]);
  const tableColumns = [
    {
      field: "ClaimNo",
      headerName: "Claim No",
      width: 200,
    },
    {
      field: "TransactionNo",
      headerName: "Transaction No",
      width: 200,
    },
    {
      field: "TransactionStatus",
      headerName: "Transaction Status",
      width: 200,
    },
    {
      field: "InsurerName",
      headerName: "Insurer Name",
      width: 200,
    },
    {
      field: "ClaimantName",
      headerName: "Claimant Name",
      width: 200,
    },
    {
      field: "ContactNo",
      headerName: "Contact No",
      width: 200,
    },
    {
      field: "SubmittedOn",
      headerName: "Submitted On",
      width: 200,
    },
    {
      field: "ReasonForRejection",
      headerName: "Reason For Rejection",
      width: 200,
    },
    {
      field: "QueryDetails",
      headerName: "Query Details",
      width: 200,
    },
    {
      field: "ApprovedAmount",
      headerName: "Appoved Amount",
      width: 200,
    },
    {
      field: "Deduction",
      headerName: "Deduction",
      width: 200,
    },
    {
      field: "ReasonOfDeduction",
      headerName: "Reason Of Deduction",
      width: 200,
    },
  ];

  useEffect(() => {
    const arr = [];
    if (claimsDetails.length > 0) {
      claimsDetails.forEach((itemi) => {
        itemi.claimTransactionDTO.forEach((itemj) => {
          arr.push({
            //   travelStartDate: itemi.basicDetails.claimDetails.travelStartDate,
            //   travelEndDate: itemi.basicDetails.claimDetails.travelEndDate,
            TransactionNo: itemj.transactionNumber,
            ClaimNo: itemi.claimNumber,
            TransactionStatus: itemj.status,
            InsurerName: itemi.basicDetails.memberDetails.insuredName,
            ClaimantName: itemj.transactionDetailsDto.claimantContactName,
            ContactNo: itemj.transactionDetailsDto.claimantContactNo,
            SubmittedOn: new Date(itemj.createdDateTime).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            ReasonForRejection:
              itemj.transactionDetailsDto.paymentObj.action === "Rejected"
                ? itemj.transactionDetailsDto.paymentObj.remarks
                : "",
            ApprovedAmount: itemj.transactionDetailsDto.paymentObj.approvedAmount,
            Deduction:
              itemj.transactionDetailsDto.benefitDetails.length === 0
                ? ""
                : itemj.transactionDetailsDto.benefitDetails[0].deductible,
            ReasonOfDeduction:
              itemj.transactionDetailsDto.benefitDetails.length === 0
                ? ""
                : itemj.transactionDetailsDto.benefitDetails[0].remarks,
            //   claimType: itemj.transactionDetailsDto.claimCategory,
            //   claimSubType: itemj.transactionDetailsDto.claimSubType,
          });
        });
      });
      setTableRows([...arr]);
    }
  }, []);
  return (
    <Grid container spacing={4} p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <DataGrid
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={tableRows}
          columns={tableColumns}
          disableSelectionOnClick
          getRowId={(row) => row.TransactionNo}
        />
      </Grid>
    </Grid>
  );
}

export default ClaimDetails;
