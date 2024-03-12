const getTopLevelContent = () => [
  { label: "Claim No", path: "claimNo", visible: true },
  { label: "Master Claim No", path: "masterClaimNo", visible: true },
  { label: "Policy No", path: "policyNo", visible: false },
];

const getMenus = () => [
  { label: "Menu 1", icon: "view_cozy", visible: true },
  { label: "Menu 2", icon: "", visible: true },
  { label: "Menu 3", icon: "key", visible: false },
  { label: "Menu 4", icon: "delete", visible: true },
];

const getAccordions = ({ menuIndex }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [
        { label: "Menu 1 Accordion 1", visible: true },
        { label: "Menu 1 Accordion 2", visible: true },
        { label: "", visible: true },
      ];
      break;
    case 1:
      data = [
        { label: "Menu 2 Accordion 1", visible: true },
        { label: "Menu 2 Accordion 2", visible: true },
        { label: "Menu 2 Accordion 3", visible: true },
      ];
      break;
    case 2:
      data = [
        { label: "Menu 3 Accordion 1", visible: true },
        { label: "Menu 3 Accordion 2", visible: true },
        { label: "Menu 3 Accordion 3", visible: true },
      ];
      break;
    case 3:
      data = [
        { label: "Menu 4 Accordion 1", visible: true },
        { label: "Menu 4 Accordion 2", visible: true },
        { label: "Menu 4 Accordion 3", visible: true },
      ];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getControls = ({ menuIndex, masters }) => {
  let data = [];

  const onFunction1 = () => {
    // alert(flag.toString());
  };

  switch (menuIndex) {
    case 0:
      data = [
        [
          {
            path: "path1",
            visible: true,
            type: "Input",
            label: "Menu1 Accordion1 control1",
            onChangeFuncs: ["IsNumeric"],
            required: true,
          },
          {
            path: "path2",
            visible: true,
            type: "AutoComplete",
            label: "Menu1 Accordion1 control2",
            options: masters.gender,
          },
          { path: "path3", visible: true, type: "Input", label: "Menu1 Accordion1 control3" },
          { path: "path4", visible: true, type: "Input", label: "Menu1 Accordion1 control4" },
          { path: "path5", visible: true, type: "Input", label: "Menu1 Accordion1 control5" },
          { path: "path6", visible: true, type: "Input", label: "Menu1 Accordion1 control6" },
          {
            path: "path7",
            visible: true,
            type: "Input",
            label: "Menu1 Accordion1 control7",
            validationId: 1,
            required: true,
          },

          { path: "path9", visible: true, type: "Input", label: "Menu1 Accordion1 control9" },
          { path: "path10", visible: true, type: "Input", label: "Menu1 Accordion1 control10" },
        ],
        [
          { path: "path11", visible: true, type: "Input", label: "Menu1 Accordion2 control1" },
          {
            validationId: 1,
            path: "path12",
            visible: true,
            required: true,
            type: "Input",
            label: "Menu1 Accordion2 control2",
          },
          { path: "path11", visible: true, type: "Input", label: "Menu1 Accordion2 control1" },
          { path: "path12", visible: true, type: "Input", label: "Menu1 Accordion2 control2" },
          { path: "path11", visible: true, type: "Input", label: "Menu1 Accordion2 control1" },
          { path: "path12", visible: true, type: "Input", label: "Menu1 Accordion2 control2" },
        ],
        [
          // { path: "path13", visible: true, type: "Input", label: "Menu1 Accordion3 control1" },
          // { path: "path14", visible: true, type: "Input", label: "Menu1 Accordion3 control2" },
          {
            visible: true,
            type: "ValidationControl",
            validationId: 1,
            subType: "Button",
            label: "Menu1 Accordion1 control8",
            onClick: onFunction1,
            justifyContent: "right",
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          { visible: true, type: "Input", label: "Menu2 Accordion1 control1" },
          { visible: true, type: "Input", label: "Menu2 Accordion1 control2" },
        ],
        [
          { visible: true, type: "Input", label: "Menu2 Accordion2 control1" },
          { visible: true, type: "Input", label: "Menu2 Accordion2 control2" },
        ],
        [
          { visible: true, type: "Input", label: "Menu2 Accordion3 control1" },
          { visible: true, type: "Input", label: "Menu2 Accordion3 control2" },
        ],
      ];
      break;
    case 2:
      data = [
        [
          { visible: true, type: "Input", label: "Menu3 Accordion1 control1" },
          { visible: true, type: "Input", label: "Menu3 Accordion1 control2" },
        ],
        [
          { visible: true, type: "Input", label: "Menu3 Accordion2 control1" },
          { visible: true, type: "Input", label: "Menu3 Accordion2 control2" },
        ],
        [
          { visible: true, type: "Input", label: "Menu3 Accordion3 control1" },
          { visible: true, type: "Input", label: "Menu3 Accordion3 control2" },
        ],
      ];
      break;
    case 3:
      data = [
        [
          { visible: true, type: "Input", label: "Menu4 Accordion1 control1" },
          { visible: true, type: "Input", label: "Menu4 Accordion1 control2" },
        ],
        [
          { visible: true, type: "Input", label: "Menu4 Accordion2 control1" },
          { visible: true, type: "Input", label: "Menu4 Accordion2 control2" },
        ],
        [
          { visible: true, type: "Input", label: "Menu4 Accordion3 control1" },
          { visible: true, type: "Input", label: "Menu4 Accordion3 control2" },
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
  claimNo: "123456789",
  masterClaimNo: "123456789",
  policyNo: "123456789",
});

const getMasters = () => ({
  gender: [{ mValue: "male" }, { mValue: "female" }],
});

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
