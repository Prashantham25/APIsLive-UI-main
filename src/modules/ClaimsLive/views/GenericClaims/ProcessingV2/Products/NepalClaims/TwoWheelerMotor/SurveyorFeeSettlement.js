const getTopLevelContent = () => [
  { label: "Claim No", path: "claimNo", visible: true },
  { label: "Master Claim No", path: "masterClaimNo", visible: true },
  { label: "Policy No", path: "policyNo", visible: true },
];

const getMenus = () => [{ label: "Surveyor Fee Settlement", icon: "", visible: true }];

const getAccordions = ({ menuIndex }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [{ label: "Survyor Fee Settlement", visible: true }];
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
            type: "Typography",
            label: "Bank/Petty Cash Code",
            visible: true,
            path: "",
            spacing: 8,
            InputProps: { readOnly: true },
          },
          {
            type: "Checkbox",
            label: "Claim Full Settlement",
            visible: true,
            checkedVal: true,
            path: "FullSettlement",
            spacing: 8,
          },

          {
            type: "Button",
            label: "Surveyor Fee Breakdown (New)",
            visible: true,
            path: "",
          },
          {
            type: "AutoComplete",
            label: "Payment Type",
            visible: true,
            path: "",
          },
          {
            type: "AutoComplete",
            label: "Bank Name",
            visible: true,
            path: "",
          },
          {
            type: "MDDatePicker",
            label: "Cheque Date",
            visible: true,
            path: "",
          },
          { type: "Input", required: false, label: "Cheque No", visible: true },
          {
            type: "Typography",
            label: "",
            visible: true,
            path: "",
            spacing: 8,
            InputProps: { readOnly: true },
          },
          {
            type: "Button",
            required: true,
            label: "Save",
            visible: true,
            spacing: 2,
          },
          {
            type: "Button",
            required: true,
            label: "Cancel",
            visible: true,
            spacing: 2,
          },

          {
            type: "Button",
            required: true,
            label: "Print Voucher ",
            visible: true,
            spacing: 2.5,
          },
          {
            type: "Button",
            required: true,
            label: "Generate Voucher",
            visible: true,
            spacing: 3,
          },
          {
            type: "Button",
            required: true,
            label: "Print Cheque",
            spacing: 2.5,
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

const getPolicyDto = () => ({
  claimNo: "1234567890",
  masterClaimNo: "123456789",
  policyNo: "123456789",
});

const getMasters = () => ({
  gender: [{ mValue: "male" }, { mValue: "female" }],
});

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
