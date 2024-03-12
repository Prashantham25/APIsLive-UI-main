// import { IsNumeric, LengthEqualTo } from "../../../../../Common/Validations";
// import fetchMMasterData from "../data/motorIndex";
// import { useState, useEffect } from "react";
import { useDataController } from "../../../../../BrokerPortal/context/index";

const getTopLevelContent = () => {
  // const ClaimsJson = GetClaimJson();
  const [controller] = useDataController();
  // const { ClaimsJson, policyData, GenericClaimsMaster } = controller;
  const { ClaimsJson } = controller;

  const topLevelContent = [
    {
      type: "Input",
      label: "COI No",
      name: "policyNo",
      value: ClaimsJson.policyNo,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
    },
    {
      type: "Input",
      label: "Claim Number",
      name: "claimNo",
      value: ClaimsJson.claimNumber,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
    },
  ];
  return topLevelContent;
};
const getBottomContent = () => {
  const data = [
    {
      type: "Button",
      label: "Save",
      // name: "claimNo",
      // value: ClaimsJson.claimNumber,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      // path: "",
    },
  ];
  return data;
};
const getMenuList = () => {
  const menus = [
    "Claim Details",
    "View Document",
    "Estimation Billing",
    "CIS",
    "Validation",
    "Claim Processing",
    "Claim History",
  ];
  return menus;
};

const getMenuContent = (id) => {
  let accordians = [];
  switch (id) {
    case 0:
      accordians = ["Policy Details", "Member Details", "Claim Details"];
      break;
    case 1:
      accordians = ["View Document"];
      break;
    case 2:
      accordians = ["Billing Details", "Lumpsum Billing Details", "Breakup Billing Details"];
      break;
    case 3:
      accordians = ["CIS"];
      break;
    case 4:
      accordians = ["Validation"];
      break;
    case 5:
      accordians = ["Claim Processing", "Payment Details"];
      break;
    case 6:
      accordians = ["Claim History"];
      break;
    default:
      accordians = [];
      break;
  }
  return accordians;
};

function getAccordianContents(x, ClaimsJson) {
  let data = [];
  switch (x) {
    case "Claim Details":
      data = [
        {
          type: "Input",
          label: "Hospital Name",
          name: "hospitalName",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Hospital Address",
          name: "hospitalAddress",
          //   value:
          // ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalAddress,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Hospital City",
          name: "hospitalCity",
          //   value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalCity,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Hospital State",
          name: "hospitalState",
          //   value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalState,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Hospital Pincode",
          name: "hospitalPincode",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "DateTime",
          label: "Date Of Addmission",
          visible: true,
          name: "doa",
          //   value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
          path: "hospitalizationDetails",
        },
        {
          type: "DateTime",
          label: "Date Of Discharge",
          visible: true,
          name: "dod",
          //   value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.dod,
          path: "hospitalizationDetails",
        },
        {
          type: "Input",
          label: "Ailment",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "ICD Level 4 Code",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "ICD Level Description",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Diagnosis",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Admission Type",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Treatment Type",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Benefit Type",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Room Days",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Room Amount",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "ICU Days",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "ICU Amount",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Pay-Out Option",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Deductible",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "LoS",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Hospital Payout Amount",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Expense Payout",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Claim Action",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "Internal Remarks",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
        {
          type: "Input",
          label: "External Remarks",
          name: "hospitalAddress",
          // value: Obj.insuredName,
          visible: true,
          path: "hospitalDetails",
        },
      ];
      //   data = [
      //     [
      //       {
      //         type: "Input",
      //         label: "2222222222",
      //         name: "comPerc",
      //         // value: Obj.insuredName,
      //         visible: true,
      //         onChangeFuncs: [IsNumeric],
      //         parameters: [5],
      //         InputProps: { readOnly: true },
      //       },
      //     ],

      //     [
      //       {
      //         type: "AutoComplete",
      //         label: "Transaction Type",
      //         visible: true,
      //         name: "tranType",
      //         // value: Obj.insurerClaimNo,
      //         InputProps: { focused: true },
      //         options: [],
      //       },
      //     ],
      //     [],
      //   ];
      break;
    case "Payment Details":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "payeeName", headerName: "Payee Name", width: 200 },
            { field: "payeeType", headerName: "Payee Type", width: 200 },
            { field: "utilisedSI", headerName: "Pay-Out Type", width: 200 },
            { field: "bsi", headerName: "Approved Amount", width: 200 },
            { field: "bcount", headerName: "Paid Amount", width: 230 },
            { field: "utrNo", headerName: "UTR Number", width: 230 },
            { field: "sublimit", headerName: "UTR Date", width: 230 },
            { field: "availClaims", headerName: "Status", width: 230 },
          ],
          rows: [],
          rowId: "utrNo",
          visible: true,
          // onRowClick:
        },
        // {
        //   type: "Input",
        //   label: "Payee Name",
        //   name: "payeeName",
        //   // value: Obj.insuredName,
        //   visible: true,
        //   path: "paymentObj",
        // },
        // {
        //   type: "Input",
        //   label: "Payee Type",
        //   name: "payeeType",
        //   // value: Obj.insuredName,
        //   visible: true,
        //   path: "paymentObj",
        // },
        // {
        //   type: "Input",
        //   label: "Pay-Out Type",
        //   name: "hospitalAddress",
        //   // value: Obj.insuredName,
        //   visible: true,
        //   path: "hospitalDetails",
        // },
        // {
        //   type: "Input",
        //   label: "Approved Amount",
        //   name: "hospitalAddress",
        //   // value: Obj.insuredName,
        //   visible: true,
        //   path: "hospitalDetails",
        // },
        // {
        //   type: "Input",
        //   label: "Paid Amount",
        //   name: "hospitalAddress",
        //   // value: Obj.insuredName,
        //   visible: true,
        //   path: "hospitalDetails",
        // },
        // {
        //   type: "Input",
        //   label: "UTR Number",
        //   name: "hospitalAddress",
        //   // value: Obj.insuredName,
        //   visible: true,
        //   path: "hospitalDetails",
        // },
        // {
        //   type: "Input",
        //   label: "UTR Date",
        //   name: "hospitalAddress",
        //   // value: Obj.insuredName,
        //   visible: true,
        //   path: "hospitalDetails",
        // },
        // {
        //   type: "Input",
        //   label: "Status",
        //   name: "hospitalAddress",
        //   // value: Obj.insuredName,
        //   visible: true,
        //   path: "hospitalDetails",
        // },
      ];
      //   data = [
      //     [
      //       {
      //         type: "Input",
      //         label: "33311",
      //         name: "comPerc",
      //         // value: Obj.insuredName,
      //         visible: true,
      //         onChangeFuncs: [IsNumeric],
      //         parameters: [5],
      //         InputProps: { readOnly: true },
      //       },
      //     ],

      //     [
      //       {
      //         type: "AutoComplete",
      //         label: "Transaction Type",
      //         visible: true,
      //         name: "tranType",
      //         // value: Obj.insurerClaimNo,
      //         InputProps: { focused: true },
      //         options: [],
      //       },
      //     ],
      //   ];
      break;
    case "Claim History":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "benefit", headerName: "Benefit", width: 200 },
            { field: "totalSumInsured", headerName: "Total Sum Insured", width: 200 },
            { field: "utilisedSI", headerName: "Utilized Sum Insured", width: 200 },
            { field: "bsi", headerName: "Available Sum Insured", width: 200 },
            { field: "bcount", headerName: "No. of claims per year", width: 230 },
            { field: "utilizedCount", headerName: "Utilized Claim", width: 230 },
            { field: "sublimit", headerName: "Sub-limit per Claim", width: 230 },
            { field: "availClaims", headerName: "Available claims", width: 230 },
          ],
          rows: [],
          rowId: "benefit",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "View Document":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "slno", headerName: "S.No", width: 200 },
            { field: "docName", headerName: "Document Name", width: 200 },
            { field: "docView", headerName: "Document View", width: 200 },
            { field: "uploadedBy", headerName: "Uploaded By", width: 200 },
          ],
          rows: [],
          rowId: "slno",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "Validation":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "slNo", headerName: "Sl No", width: 200 },
            { field: "roleName", headerName: "Role Name", width: 200 },
            { field: "userName", headerName: "User Name", width: 200 },
            { field: "action", headerName: "Action", width: 200 },
          ],
          rows: [],
          rowId: "roleName",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "CIS":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            { field: "slNo", headerName: "Sl No", width: 200 },
            { field: "roleNme", headerName: "Role Name", width: 200 },
            { field: "userName", headerName: "User Name", width: 200 },
            { field: "action", headerName: "Action", width: 200 },
            { field: "proccDate", headerName: "Processed Date & Time", width: 200 },
            { field: "intRemarks", headerName: "Internal Remarks", width: 230 },
            { field: "commLetters", headerName: "Communication Letters", width: 230 },
            { field: "dateTime", headerName: "Date & Time of Communication Sent", width: 230 },
            { field: "download", headerName: "Download/Email", width: 230 },
            { field: "resend", headerName: "Resend Yes/No", width: 230 },
          ],
          rows: [],
          rowId: "userName",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    default:
      data = [
        [
          {
            type: "Input",
            label: "Insurer Claim No",
            visible: true,
            name: "insurerClaimNo",
            // value: Obj.insurerClaimNo,
            InputProps: { focused: true },
            // onChangeFuncs: [IsNumeric, LengthEqualTo],
            // parameters: [5],
          },
        ],
      ];
      break;
  }
  return data;
}

function getMasterData() {
  // const [masterData, setMasterData] = useState({ ailment: [] });
  const masterData = [
    { mID: 1, mValue: "Cataract" },
    { mID: 2, mValue: "Stones in biliary and urinary systems" },
    { mID: 3, mValue: "Hydrocele/Hernia" },
    { mID: 4, mValue: "Hysterectomy for any benign disorder" },
    { mID: 5, mValue: "Lumps / cysts / nodules / polyps / internal tumours" },
    { mID: 6, mValue: "Gastric and Duodenal Ulcers" },
    { mID: 7, mValue: "Surgery on tonsils / adenoids" },
  ];
  return masterData;
}
const getMasterList = () => {
  const masterList = [
    { MasterType: "Gender", filterCriteria: ["Gender"] },
    { MasterType: "MaritalStatus", filterCriteria: ["MaritalStatus"] },
  ];
  return masterList;
};
export {
  getMenuList,
  getMenuContent,
  getAccordianContents,
  getTopLevelContent,
  getBottomContent,
  getMasterData,
  getMasterList,
};
