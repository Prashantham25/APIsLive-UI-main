const getProcessSteps = () => {
  const steps = [
    "Proposer Details",
    "Member Details",
    "Medical Details",
    "Nominee Details",
    "CKYC",
  ];
  return steps;
};
const getStepContent = (activeStep) => {
  let data = [];

  switch (activeStep) {
    case 0:
      data = [
        {
          type: "Typography",
          visible: true,
          label: "Proposer Details",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label:
            "Proposer is the person who the insurance company will pay the benefits of the insurance policy cover to, should a claim arise and claim for tax exemption under section 80D",
          spacing: 12,
        },
        { type: "AutoComplete", visible: true, label: "Title", options: [] },
        { type: "Input", visible: true, label: "First Name" },
        { type: "Input", visible: true, label: "Last Name" },
        { type: "MDDatePicker", visible: true, label: "Last Name" },
        { type: "Input", visible: true, label: "Occupation" },
        { type: "Input", visible: true, label: "PAN Card No" },
      ];
      break;

    default:
      data = [];
  }
  return data;
};

export { getProcessSteps, getStepContent };
