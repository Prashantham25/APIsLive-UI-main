import { useEffect } from "react";
import { Grid, TextField } from "@mui/material";
// import swal2 from "sweetalert2";
import {
  SearchClaimDetailsByClaimNo,
  GetPayLoadByQueryDynamic,
} from "../../../../../HealthClaims/data";

const getTopLevelContent = () => [
  {
    type: "Typography",
    label: "Claim Number",
    path: "claimNumber",
    visible: true, // SD ,RI,cl app,
    InputProps: { readOnly: true },
    spacing: 6,
  },
  {
    type: "Input",
    label: "Policy Number",
    visible: true,
    InputProps: { readOnly: true },
    path: "policyNo",
    spacing: 3,
  },
  {
    type: "Input",
    label: "Insured Name",
    name: "InsuredName",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },

  {
    type: "DateTime",
    label: "Claim Intimation Date",
    visible: true,
    name: "ClaimIntimationDate",
    path: "",
    InputProps: { readOnly: true },
    spacing: 3,
  },
  {
    type: "Input",
    label: "Claim Status",
    name: "ClaimStatus",
    value: "Claim Registration",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    type: "Input",
    label: "Endorsement Number",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },

  {
    type: "Input",
    label: "Surveryor Name",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    type: "Input",
    label: "Surveryor Fee",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    type: "Input",
    label: "Assessed Amount",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    type: "Input",
    label: "Claim Advance Paid",

    visible: true, // cl app,CW

    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
];

const getMenus = () => [
  { label: "Claim Approval", icon: "", visible: true },
  { label: "RI Details", ico: "", visible: true },
];

const getAccordions = ({ menuIndex }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [{ label: "Claim Approval", visible: true }];
      break;
    case 1:
      data = [{ label: "Actual Reinsurance Details", visible: true }];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getControls = ({ menuIndex, dto, setDto }) => {
  let data = [];
  useEffect(async () => {
    const obj = {
      reportname: "NepalClaimTreatyBreakDown",
      paramList: [
        {
          ParameterName: "endorsementno",
          ParameterValue: "",
        },
        {
          ParameterName: "PolicyNo",
          ParameterValue: dto.policyNo,
        },
        {
          ParameterName: "Treaty",
          ParameterValue: "",
        },
      ],
    };
    const gridData1 = await GetPayLoadByQueryDynamic(obj);
    setDto({ ...dto, RIDetails: gridData1.data.finalResult });
  }, []);

  switch (menuIndex) {
    case 0:
      data = [
        [
          {
            type: "Checkbox",
            label: "Include Surveyor Fee",
            name: "includeSurveyorFee",
            visible: true,
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: "transactionDataDTO.0.transactionDetails.claimApproval.includeSurveyorFee",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Total Amount",
            visible: true,
            disable: true,
            path: "approvedClaimAmount",
          },
          {
            type: "Input",
            label: "Salvage Recovery",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.salvagerecovery",
          },
          {
            type: "Input",
            label: "RI Approval Status",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.riApprovalStatus",
          },
          {
            type: "Input",
            label: "RI Approved By",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.riApprovedby",
          },
          {
            type: "Input",
            label: "Your Approved Limit",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.approvedLimit",
          },
          {
            type: "MDDatePicker",
            label: "Approved Date",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.approvedDate",
          },
          {
            type: "Input",
            label: "Approved Authority",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.approvedAuthority",
          },
          {
            type: "Input",
            label: "Approved Amount",
            visible: true,
            path: "transactionDataDTO.0.approvedAmount",
          },
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.remarks",
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Remarks (if any)"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Input",
            label: "Nepal RI(%)",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.nepalRI",
          },

          // Need to add grid
          {
            type: "Input",
            label: "Sl No",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.slNo",
          },
          {
            type: "Input",
            label: "Recommended By",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.recommendedBy",
          },
          {
            type: "DateTime",
            label: "Recommended Date",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.recommendedDate",
          },
          {
            type: "Input",
            label: "Remarks",
            visible: true,
            path: "transactionDataDTO.0.transactionDetails.claimApproval.remark",
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 9,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },
          {
            type: "Button",
            label: "Print Approval Slip",
            visible: true,
            spacing: 4,
          },
          {
            type: "Button",
            label: "Approve",
            visible: true,
            spacing: 4,
            // onclick: handleApprove(),
          },
          {
            type: "Button",
            label: "Disapprove",
            visible: true,
            spacing: 4,
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "DataGrid",
            spacing: 12,
            columns: [
              { field: "Type", headerName: "Type", width: 350 },
              { field: "Share", headerName: "Percentage", width: 350 },
              { field: "AllocatedAmt", headerName: "Amount", width: 350 },
            ],
            path: "RIDetails",
            rowId: "Type",
            visible: true,
          },
        ],
      ];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getPolicyDto = async ({ genericInfo }) => {
  const res = await SearchClaimDetailsByClaimNo(genericInfo.claimNo);
  console.log("res", res.finalResult);
  // dto.transactionDataDTO[0].transactionDetails.claimApproval.approvedDate = new Date();
  return res.finalResult;
};

const getMasters = () => ({
  gender: [{ mValue: "male" }, { mValue: "female" }],
});

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
