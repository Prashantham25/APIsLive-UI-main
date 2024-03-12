import {
  GetNPCommonMaster,
  GetPayLoadByQueryDynamic,
} from "../../../../../../../PolicyLive/views/Retail/Products/NepalProds/data/APIs/MotorCycleApi";
import ClaimsDetails from "../../../../../HealthClaims/NepalClaims/JsonData";
import { DateFormatFromStringDate } from "../../../../../../../../Common/Validations";

const getTopLevelContent = () => [
  { label: "Claim No", path: "claimNumber", visible: true },
  { label: "Master Claim No", path: "", value: "N/A", visible: true },
  { label: "Policy No", path: "policyNo", visible: true },
  {
    label: "Insured Name",
    path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.claimDetails.insuredName",
    visible: true,
  },
  { label: "Intimation Date", path: "createdDate", visible: true },
  { label: "Endorsement No", path: "Endorsement No", visible: true },
  { label: "Sum Insured", path: "Sum Insured", visible: true },
  { label: "Sum Insured Balance", path: "Sum Insured Balance", visible: true },
  {
    label: "Surveyor Name",
    path: "transactionDataDTO.0.transactionDetails.SurveyorDetails.surveyorName",
    visible: true,
  },
  {
    label: "Business Type",
    path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.claimDetails.businessType",
    visible: true,
  },
  {
    label: "Date of Loss",
    path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.claimDetails.dateOfLoss",
    visible: true,
  },
  { label: "Claim Type", path: "Claim Type", visible: true },
  {
    label: "Nature of Loss",
    path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.claimDetails.natureOfLoss",
    visible: true,
  },
  {
    label: "Claim Advance Paid",
    path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.AdvancePayment.TotalAmountinAdvance",
    visible: true,
  },
  {
    label: "Estimated Sur. Fee",
    path: "transactionDataDTO.0.transactionDetails.SurveyorDetails.surveyorFeeDetails.totalSurveyFeeVAT",
    visible: true,
  },
  { label: "Actual Sur. Fee", path: "Actual Sur. Fee", visible: true },
  {
    label: "Estimated Amount",
    path: "transactionDataDTO.0.transactionDetails.SurveyorDetails.estimatedAmount",
    visible: true,
  },
  { label: "Assessed Amount", path: "Assessed Amount", visible: true },
  { label: "Total Estimated Amount", path: "Total Estimated Amount", visible: true },
  { label: "Total Assessed", path: "Total Assessed", visible: true },
];

const getMenus = () => [{ label: "RI Approval", icon: "", visible: true }];

const getAccordions = ({ menuIndex }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [{ label: "RI Approval", visible: true }];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getControls = ({ menuIndex }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [
        [
          {
            type: "Input",
            label: "U/W Year",
            visible: true,
            path: "transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.claimFiscalYear",
            disabled: true,
            spacing: 6,
          },
          {
            type: "MDDatePicker",
            label: "Approved Date",
            visible: true,
            path: "RIApproval.ApprovedDate",
            spacing: 6,
            disabled: true,
            // maxDate: new Date(),
          },
          {
            type: "DataGrid",
            rowId: "Type",
            visible: true,
            columns: [
              { field: "Type", headerName: "RI Break Down", width: 200 },
              { field: "Share", headerName: "%", width: 200 },
              { field: "AllocatedAmt", headerName: "Actual", width: 200 },
              { field: "Previous", headerName: "Previous", width: 200 },
              { field: "Balance", headerName: "Balance", width: 230 },
            ],
            path: "RIBreakDown",
            spacing: 12,
          },

          // {
          //   type: "Checkbox",
          //   label: "Stop Backward Calculation",
          //   visible: true,
          //   path: "",
          //   spacing: 12,
          //   // InputProps: { readOnly: true },
          // },

          {
            type: "Button",
            label: "Print Expected Voucher",
            visible: true,
            path: "",
            spacing: 3,
          },
          {
            type: "Button",
            label: "Print Recovery Slip",
            visible: true,
            path: "",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            path: "",
            spacing: 2.2,
          },
          {
            type: "Button",
            label: "Approve",
            visible: true,
            path: "",
            spacing: 1.8,
            color: "success",
          },
          {
            type: "Button",
            label: "Disapprove",
            visible: true,
            path: "",
            spacing: 2,
            color: "error",
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

const getPolicyDto = ({ location }) => {
  let dto = ClaimsDetails();
  if (location?.state?.ClaimJson) {
    dto = { ...dto, ...location?.state?.ClaimJson };
    dto.RIApproval.ApprovedDate = new Date();
    dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.dateOfLoss =
      DateFormatFromStringDate(
        dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.dateOfLoss,
        "m/d/y",
        "d-m-y"
      );
    dto.createdDate = DateFormatFromStringDate(dto.createdDate.split("T")[0], "y-m-d", "d-m-y");
  }
  return dto;
};

const getMasters = async ({ dto, setDto }) => {
  const lDto = dto;
  const masters = {
    // Salutation: [],
    // Gender: [],
    // State: [],
    // BranchDetailsComponets: [],
    // Commercial: [],
    // SubClass: [],
    // placeMasters: [{ district: [], municipality: [] }],
    // IssuingBranch: [],
    // Company: "",
    // BankDetails: [],
    // BankorFinancialInstituionNameinEnglish: [],
    // BranchMasters: [],
    "Fiscal Year": [],
  };
  await GetNPCommonMaster().then((r) => {
    r.forEach((x) => {
      masters[x.mType] = x.mdata;
    });
  });

  const obj = {
    reportname: "NepalClaimTreatyBreakDown",
    paramList: [
      {
        ParameterName: "endorsementno",
        ParameterValue: dto?.EndoPolicyNo === undefined ? "" : dto?.EndoPolicyNo,
      },
      {
        ParameterName: "policyno",
        ParameterValue: dto?.policyNo,
      },
      {
        ParameterName: "Treaty",
        ParameterValue: "",
      },
    ],
  };
  const treatyBreakdown = await GetPayLoadByQueryDynamic(obj);
  const obj1 = {
    reportname: "NepalClaimInsuredDetails",
    paramList: [
      {
        ParameterName: "policyno",
        ParameterValue: dto?.policyNo,
      },
    ],
  };
  const Name = await GetPayLoadByQueryDynamic(obj1);
  lDto.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.insuredName =
    Name?.data?.finalResult.InsuredDetails;
  lDto.transactionDataDTO[0].transactionDetails.ClaimsInfo.claimDetails.businessType =
    Name?.data?.finalResult.BusinessType;
  setDto({
    ...lDto,
    RIBreakDown: treatyBreakdown?.data?.finalResult,
  });
  return masters;
};

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
