const getTopLevelContent = () => [
  {
    label: "Policy Number",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 6,
  },
  {
    label: "Insured Name",
    name: "InsuredName",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 6,
  },

  {
    label: "Claimant",
    name: "Claimant",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    label: "Claim Intimation Date",
    visible: true,
    name: "ClaimIntimationDate",

    path: "",
    InputProps: { readOnly: true },
    spacing: 3,
  },
  {
    label: "Claim Status",
    name: "ClaimStatus",
    value: "Claim Registration",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    label: "Surveryor Name",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    label: "Surveryor Fee",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    label: "Assessed Amount",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    label: "Claim Advance Paid",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    name: "Claim Withdrawal",
    disabled: false,
    visible: true,
    background: "#ffe6e6",
    fontColor: "#000000",
  },
];

const getMenus = () => [{ label: "Claim Withdrawal", icon: "", visible: true }];

const getAccordions = ({ menuIndex }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [{ label: "Claim Withdrawal", visible: true }];
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
            type: "AutoComplete",
            label: "U/W Year",
            visible: true,
            path: "",
            spacing: 6,
          },
          {
            type: "MDDatePicker",
            label: "Approved Date",
            visible: true,
            path: "",
            spacing: 6,
          },
          {
            type: "DataGrid",
            spacing: 12,
            columns: [
              { field: "RIBreak", headerName: "RI Break Down", width: 200 },
              { field: "TotalSI", headerName: "%", width: 200 },
              { field: "UtilizedSI", headerName: "Actual", width: 200 },
              { field: "AvailSI", headerName: "Previous", width: 200 },
              { field: "NoOfClaims", headerName: "Blance", width: 230 },
            ],
            rows: [],
            rowId: "Benefit",
            visible: true,
            // onRowClick:
          },

          {
            type: "Checkbox",
            label: "Stop Backward Calculation",
            visible: true,
            path: "",
            spacing: 12,
            // InputProps: { readOnly: true },
          },

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
            type: "Button",
            label: "Approve",
            visible: true,
            path: "",
            spacing: 3,
          },
          {
            type: "Button",
            label: "Disapprove",
            visible: true,
            path: "",
            spacing: 3,
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

const getPolicyDto = () => ({
  claimNo: "1234567890",
  masterClaimNo: "123456789",
  policyNo: "123456789",
});

const getMasters = () => ({
  gender: [{ mValue: "male" }, { mValue: "female" }],
});

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
