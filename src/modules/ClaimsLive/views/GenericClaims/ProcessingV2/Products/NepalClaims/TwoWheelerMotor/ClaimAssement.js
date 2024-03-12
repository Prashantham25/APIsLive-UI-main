// import { setClaimsJson } from "../../../../../../../BrokerPortal/context";

// let Assessmentflag = false;
// let Totallossflag = false;
// let CashLossflag = false;
// let ConstructiveTotal = false;
// console.log("Assessment", Assessmentflag);

const getTopLevelContent = () => [
  {
    type: "Typography",
    label: "Claim Number :",
    value: "",
    visible: true, // SD ,RI,cl app,
    InputProps: { readOnly: true },
    path: "",
    spacing: 6,
  },

  {
    type: "Input",
    label: "Policy Number",
    visible: true,
    InputProps: { readOnly: true },
    path: "",
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
    label: "Year",
    visible: true, // Claim ass
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    type: "Input",
    label: "Month",
    visible: true, // Claim ass
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    type: "Input",
    label: "Day",
    visible: true, // Claim ass
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    type: "Input",
    label: "Total Month",

    visible: true, // Claim ass

    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    type: "DateTime",
    label: "Loss Date",

    visible: true, // Claim ass

    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
  {
    type: "Input",
    label: "Estimated Amount",
    visible: true, // Claim ass
    InputProps: { readOnly: true },
    path: "",
    spacing: 3,
  },
];

const getMenus = () => [
  { label: "Claim Assessment", icon: "", visible: true },
  { label: "Repair/Human Casualty Basis", icon: "", visible: true },
  { label: "Total Loss Basis", icon: "", visible: true },
  { label: "Cash Loss Basis", icon: "", visible: true },
  { label: "Constructive Total Loss ", icon: "", visible: true },
  { label: "Master Calculation", icon: "", visible: true },
];

const getAccordions = ({ menuIndex }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [{ label: "Claim Assessment", visible: true }];
      break;
    case 1:
      data = [{ label: "Repair/Human Casualty Basis", visible: true }];
      break;
    case 2:
      data = [{ label: "Total Loss Basis", visible: true }];
      break;
    case 3:
      data = [{ label: "Cash Loss Basis", visible: true }];
      break;
    case 4:
      data = [{ label: "Constructive Total Loss ", visible: true }];
      break;
    case 5:
      data = [{ label: "Master Calculation", visible: true }];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getControls = ({ menuIndex }) => {
  //   const handleCheckbox = (e) => {
  //     // debugger;
  //     if (e.target.name === "Repair") {
  //       if (e.target.checked === true) {
  //         Assessmentflag = true;
  //       } else if (e.target.checked === false) {
  //         Assessmentflag = false;
  //       }
  //     }
  // if (e.target.name === "TLB") {
  //   if (e.target.checked === true) {
  //     Totallossflag = true;
  //     Assessmentflag = true;
  //   } else if (e.target.checked === false) {
  //     Totallossflag = false;
  //   }
  // }
  // if (e.target.name === "CashLoss") {
  //   if (e.target.checked === true) {
  //     CashLossflag = true;
  //     Totallossflag = true;
  //     Assessmentflag = true;
  //   } else if (e.target.checked === false) {
  //     CashLossflag = false;
  //   }
  // }
  // if (e.target.name === "ConstructiveTotal") {
  //   if (e.target.checked === true) {
  //     ConstructiveTotal = true;
  //     CashLossflag = true;
  //     Totallossflag = true;
  //     Assessmentflag = true;
  //   } else if (e.target.checked === false) {
  //     ConstructiveTotal = false;
  //   }
  // }
  // setClaimsJson((prev) => ({ ...prev, dto }));
  //   };

  let data = [];

  switch (menuIndex) {
    case 0:
      data = [
        [
          {
            type: "Checkbox",
            label: "Total Theft",
            visible: true,
            path: "",
            spacing: 4,
          },
          {
            type: "Checkbox",
            label: "Total Loss",
            visible: true,
            path: "",
            spacing: 4,
          },
          {
            type: "Input",
            label: "Detail of Loss",
            visible: true,
            path: "",
            spacing: 4,
          },

          {
            type: "Input",
            label: "Claim Documents List",
            visible: true,
            path: "",
          },
          {
            type: "Typography",
            label: "Assessment Basis",
            visible: true,
            path: "",
            spacing: 12,
          },
          {
            type: "Checkbox",
            label: "Repair/Human Casualty Basis",
            name: "Repair",
            visible: true,
            checkedVal: true,
            path: "CasualtyBasis",
            spacing: 6,
          },
          {
            type: "Checkbox",
            label: "Total Loss Basis",
            name: "TLB",
            visible: true,
            checkedVal: true,
            path: "TotalLossBasis",
            spacing: 6,
          },
          {
            type: "Checkbox",
            label: "Cash Loss Basis",
            name: "CashLoss",
            visible: true,
            checkedVal: true,
            path: "CashLossBasis",
            spacing: 6,
          },
          {
            type: "Checkbox",
            label: "Constructive Total Basis",
            visible: true,
            name: "ConstructiveTotal",
            checkedVal: true,
            path: "ConstructiveTotal",
            spacing: 6,
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Loss Type",
            visible: true,
            path: "",
          },
          {
            type: "AutoComplete",
            label: "Sub Loss Type",
            visible: true,
            path: "",
          },
          {
            type: "AutoComplete",
            label: "Material Type",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "TP Vehicle Number",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Particulars (English)",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Claimed Amount",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Bill Amount",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Survey Assessment Amount",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Assessed Amount",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Depreciation",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Depreciation Amount",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Salvage/Deduction",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Salvage/Deduction Amount",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Apply Average Clause (-) Rate%",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Amount after Avg Clause",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
          },
          {
            type: "Input",
            label: "Net Assessment",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
          },
          {
            type: "Checkbox",
            label: "Non VAT",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Remarks",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Member Details",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "DeathSumInsured",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Medical SumInsured",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
          {
            type: "Button",
            label: "Add",
            visible: true,
            path: "",
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Input",
            label: "Market Value/Sum Insured",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Sum Insured",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Less Description",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Amount",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Less Salvage",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Net Assessment",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "Input",
            label: "Cash Loss Amount",
            visible: true,
            path: "",
          },

          {
            type: "Input",
            label: "Policy Excess(-)",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },

          {
            type: "Input",
            label: "Salvage(-)",
            visible: true,
            path: "",
          },

          {
            type: "Input",
            label: "Net Assessment",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
        ],
      ];
      break;
    case 4:
      data = [
        [
          {
            type: "Input",
            label: "Cash Loss Amount",
            visible: true,
            path: "",
          },

          {
            type: "Input",
            label: "Policy Excess(-)",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },

          {
            type: "Input",
            label: "Salvage(-)",
            visible: true,
            path: "",
          },

          {
            type: "Input",
            label: "Net Assessment",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
        ],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "Input",
            label: "Total",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "VAT",
            visible: true,
            path: "",
            InputProps: { readOnly: true },
          },
          {
            type: "Checkbox",
            label: "Apply Average Clause (+)",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Sum Insured",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
          },
          {
            type: "Input",
            label: "Lump Sum Disc.(-)",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
          },
          {
            type: "Input",
            label: "Market Value",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Non Standard Charge (-)",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Compulsory Excess (-)",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
          },
          {
            type: "Input",
            label: "Policy (Voluntary) Excess (-)",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
          },
          {
            type: "Input",
            label: "Remarks",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Towing Charge (+) ",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Amount",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Lifting Charge (+)",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "NetPayable(WithoutSurveyFee)",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
          },
          {
            type: "Input",
            label: "Reinstate Premium(-)",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "Sub Total",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
          },
          {
            type: "Input",
            label: "Surveyor Fee (+)",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
          },
          {
            type: "Input",
            label: "Net Payable (Including Survey Fee)",
            visible: true,
            InputProps: { readOnly: true },
            path: "",
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
  salutation: [{ mValue: "male" }, { mValue: "female" }],
});

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
