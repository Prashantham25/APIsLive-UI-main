import Travelimg from "assets/images/BrokerPortal/Travel/Travel.png";
import CustEngage from "assets/images/BrokerPortal/CustEngage.png";

const getIndexPageContent = () => {
  const obj = {
    heading1: "When you're ready to travel, we're here for you",
    subHeading1: "Avail best-in-class travel insurance online to secure you and your family.",
    heading2: "Get Travel Insurance to your trip in Minutes..!!",
    subHeading2: "Compare & Buy Customised Travel Plans",
    stepsCount: 4,
    sideImage: Travelimg,
    EngageCustomerImg: CustEngage,
  };
  return obj;
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
    case 1:
      data = [
        {
          type: "Typography",
          visible: true,
          label: "Tell us between which dates you are travelling",
          spacing: 12,
        },
        { type: "AutoComplete", visible: true, label: "Trip Type", options: [] },
        { type: "MDDatePicker", visible: true, label: "Policy Start Date " },
        { type: "MDDatePicker", visible: true, label: "Policy End Date" },
        {
          type: "Typography",
          visible: true,
          label: "Trip duration :",
          spacing: 12,
        },
        {
          type: "AutoComplete",
          visible: true,
          label: "Sum Insured",
          options: [],
        },
      ];
      break;
    case 2:
      data = [
        {
          type: "Typography",
          visible: true,
          label: "Tell us the age of all the travellers",
          spacing: 12,
        },
        {
          type: "Mapper2",
          visible: true,
          spacing: 12,
          renderControl: [
            [
              { type: "Input", visible: true, label: "Name" },
              { type: "MDDatePicker", visible: true, label: "DOB" },
            ],
            [
              { type: "Input", visible: true, label: "Name" },
              { type: "MDDatePicker", visible: true, label: "DOB" },
            ],
            [
              { type: "Input", visible: true, label: "Name" },
              { type: "MDDatePicker", visible: true, label: "DOB" },
            ],
          ],
        },
      ];
      break;
    case 3:
      data = [
        {
          type: "Typography",
          visible: true,
          label: "Tell us if any of the traveller having any pre-existing medical condition?",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "Does any of the travellers have any pre-existing medical condition?",
          spacing: 12,
        },
        {
          type: "RadioGroup",
          required: true,
          visible: true,
          radioLabel: {
            label: "Please select the travellers who have a pre-existing medical condition",
            labelVisible: true,
          },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "",
          spacing: 12,
        },
        {
          type: "Mapper1",
          visible: true,
          spacing: 12,
          renderControl: [
            { type: "Checkbox", visible: true, label: "Name", spacing: 3 },
            { type: "Checkbox", visible: true, label: "Name", spacing: 3 },
            { type: "Checkbox", visible: true, label: "Name", spacing: 3 },
          ],
        },
      ];
      break;
    case 4:
      data = [
        {
          type: "Typography",
          visible: true,
          label: "Please check the details and proceed for plans",
          variant: "h6",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "One more step to view plans",
          variant: "h6",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "Travel Details",
          color: "error",
          variant: "h6",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "Travellers Details",
          color: "error",
          variant: "h6",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "Pre-Existing Medical Condition",
          color: "error",
          variant: "h6",
          spacing: 12,
        },
      ];
      break;
    case 5:
      data = [
        {
          type: "Typography",
          visible: true,
          label: "Engage your customer",
          variant: "h1",
          align: "center",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "Please fill Customer Details",
          variant: "h4",
          align: "center",
          spacing: 12,
        },
        {
          type: "Input",
          visible: true,
          label: "First Name",
        },
        {
          type: "Input",
          visible: true,
          label: "Last Name",
        },
        {
          type: "Input",
          visible: true,
          label: "Phone Number",
        },
        {
          type: "Input",
          visible: true,
          label: "Email ID",
        },
        {
          type: "Typography",
          visible: true,
          label: "GET OTP",
          align: "center",
          color: "primary",
          spacing: 12,
        },
        {
          type: "Input",
          visible: true,
          label: "Verify OTP",
        },
      ];
      break;

    default:
      data = [];
  }
  return data;
};
export { getIndexPageContent, getStepContent };
