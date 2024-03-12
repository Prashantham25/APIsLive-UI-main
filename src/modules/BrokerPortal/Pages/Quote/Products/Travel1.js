const getProcessSteps = () => {
  const steps = ["Proposer Details", "Traveller Details", "CKYC", "Policy Summary"];
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
          label: "Tell us your destination and how many members are travelling to",
          spacing: 12,
        },
        { type: "AutoComplete", visible: true, label: "Policy Type", options: [] },
        { type: "Input", visible: true, label: "No of Travellers ", typeOf: "number" },
        { type: "AutoComplete", visible: true, label: "Geography", options: [] },
        { type: "AutoComplete", visible: true, label: "List of Destination", options: [] },
        {
          type: "Typography",
          visible: true,
          label: "By clicking proceed i agree to * terms & conditions and Privacy policy",
          fontSize: 12,
          spacing: 12,
        },
      ];
      break;

    default:
      data = [];
  }
  return data;
};

export { getProcessSteps, getStepContent };
