import Health from "assets/images/BrokerPortal/Health/Health.png";
import CustEngage from "assets/images/BrokerPortal/CustEngage.png";

const getIndexPageContent = () => {
  const obj = {
    heading1: "Live More Relaxed with Health Insurance",
    subHeading1:
      "Having health insurance is a smart choice, where you can have many benefits form it",
    heading2: "Get Health Insurance to your Family in Minutes..!!",
    subHeading2: "Compare & Buy Customised Health Plans",
    sideImage: Health,
    EngageCustomerImg: CustEngage,
    stepsCount: 4,
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
          label: "Select members you want to insure",
          spacing: 12,
        },
        {
          type: "CardButton",
          visible: true,
          label: "Self",
          spacing: 3,
        },
        {
          type: "CardButton",
          visible: true,
          label: "Spouse",
          spacing: 3,
        },
        {
          type: "CardCountButton",
          visible: true,
          label: "Son",
          spacing: 3,
        },
        {
          type: "CardCountButton",
          visible: true,
          label: "Daughter",
          spacing: 3,
        },
        {
          type: "CardButton",
          visible: true,
          label: "Father",
          spacing: 3,
        },
        {
          type: "CardButton",
          visible: true,
          label: "Mother",
          spacing: 3,
        },
        {
          type: "CardButton",
          visible: true,
          label: "Father-in-law",
          spacing: 3,
        },
        {
          type: "CardButton",
          visible: true,
          label: "Mother-in-law",
          spacing: 3,
        },
        {
          type: "Typography",
          visible: true,
          label: "Disclaimer: You can add maximum of 4 children",
          color: "error",
          fontSize: 12,
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "By clicking, I agree to *terms & conditions and privacy policy.",
          fontSize: 12,
          spacing: 12,
        },
      ];
      break;
    case 1:
      data = [
        {
          type: "AutoComplete",
          visible: true,
          label: "Self Gender",
          options: [],
        },
        { type: "AutoComplete", visible: true, label: "Spouse Gender", options: [] },
        {
          type: "Mapper2",
          visible: true,
          spacing: 12,
          renderControl: [
            [
              { type: "MDDatePicker", visible: true, label: "Self DOB", spacing: 4 },
              { type: "Input", visible: true, label: "Self Age", spacing: 2 },
            ],
            [
              { type: "MDDatePicker", visible: true, label: "Self DOB", spacing: 4 },
              { type: "Input", visible: true, label: "Self Age", spacing: 2 },
            ],
            [
              { type: "MDDatePicker", visible: true, label: "Self DOB", spacing: 4 },
              { type: "Input", visible: true, label: "Self Age", spacing: 2 },
            ],
            [
              { type: "MDDatePicker", visible: true, label: "Self DOB", spacing: 4 },
              { type: "Input", visible: true, label: "Self Age", spacing: 2 },
            ],
            [
              { type: "MDDatePicker", visible: true, label: "Self DOB", spacing: 4 },
              { type: "Input", visible: true, label: "Self Age", spacing: 2 },
            ],
          ],
        },
        {
          type: "Typography",
          visible: true,
          label: "Disclaimer: Age gap between parent and child should be 18 years or above",
          color: "error",
          fontSize: 12,
          spacing: 12,
        },
      ];
      break;
    case 2:
      data = [
        {
          type: "Typography",
          visible: true,
          label: "Tell us where do you & your family members live",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "Where do you live?",
          spacing: 4,
        },
        {
          type: "Input",
          visible: true,
          label: "Pincode you live",
          spacing: 4,
        },
      ];
      break;
    case 3:
      data = [
        {
          type: "Typography",
          visible: true,
          label: "Tell us your family Medical History",
          spacing: 12,
        },
        {
          type: "RadioGroup",
          required: true,
          visible: true,
          radioLabel: {
            label: "Does any member have an existing illness or medical history?",
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
          label: "Select the Existing medical diseases",
          spacing: 12,
        },
        {
          type: "Mapper1",
          visible: true,
          spacing: 12,
          renderControl: [
            { type: "Checkbox", visible: true, label: "Diabetes", spacing: 3 },
            { type: "Checkbox", visible: true, label: "Blood pressure", spacing: 3 },
            { type: "Checkbox", visible: true, label: "Heart Disease", spacing: 3 },
            { type: "Checkbox", visible: true, label: "BP/Hypertension", spacing: 3 },
            { type: "Checkbox", visible: true, label: "Thyroid Disorder", spacing: 3 },
            { type: "Checkbox", visible: true, label: "Asthma", spacing: 3 },
            { type: "Checkbox", visible: true, label: "Surgical procedure", spacing: 3 },
            { type: "Checkbox", visible: true, label: "Covid 19", spacing: 3 },
            { type: "Checkbox", visible: true, label: "Any other", spacing: 3 },
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
          label: "Basic Details",
          color: "error",
          variant: "h6",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "Location Details(Pincode)",
          color: "error",
          variant: "h6",
          spacing: 12,
        },
        {
          type: "Typography",
          visible: true,
          label: "Medical Details",
          color: "error",
          variant: "h6",
          spacing: 12,
        },
      ];
      break;
    default:
      data = [];
  }
  return data;
};
export { getIndexPageContent, getStepContent };
