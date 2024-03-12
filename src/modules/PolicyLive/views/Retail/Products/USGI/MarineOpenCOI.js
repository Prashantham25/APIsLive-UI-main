// import { GetProdPartnermasterData, Quotations } from "./data/APIs/USGIWCApi";
import swal from "sweetalert2";
import IssueCertificate from "./IssueCertificate";
import { Quotations } from "../../data/Apis";
import { PolicyJson } from "./data/Json/MarineOpenCOIJson";

const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

const getProcessSteps = () => [];

const getPageContent = () => [];

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ dto, activeStep }) => {
  let data = [];

  switch (activeStep) {
    case 0:
      data = [
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Policy No",
          path: "PolicyNo",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Broker/Agent/Direct",
          path: "BrokerAgentDirect",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Name of Insured",
          path: "NameOfInsured",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Address",
          path: "Address",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Subject Matter Insured",
          path: "SubjectMatterInsured",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Basis of Valuation",
          path: "BasisOfValuation",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Cargo Sum Insured (in INR)",
          path: "CargoSumInsuredInINR",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Currency Type",
          path: "CurrencyType",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: true,
          label: "Cargo Sum Insured (Foreign Currency)",
          path: "CargoSumInsuredForeignCurrency",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Duty Sum Insured",
          path: "DutySumInsured",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Containerized (LCL/FCL)",
          path: "ContainerizedLCLFCL",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Container No",
          path: "ContainerNo",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Marks Numbers",
          path: "MarksNumbers",
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          visible: true,
          required: false,
          label: "Expected Date of Transit",
          path: "ExpectedDateOfTransit",
          spacing: 3,
          altFormat: "Y-m-d",
          dateFormat: "Y-m-d",
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Invoice No",
          path: "InvoiceNo",
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          visible: true,
          required: false,
          label: "Invoice Date",
          path: "InvoiceDate",
          spacing: 3,
          altFormat: "Y-m-d",
          dateFormat: "Y-m-d",
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Type of Transit",
          path: "TypeOfTransit",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Mode of Transit",
          path: "ModeOfTransit",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Transit From",
          path: "TransitFrom",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Transit To",
          path: "TransitTo",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          visible: true,
          required: false,
          label: "Country of Loading",
          path: "CountryOfLoading",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          visible: true,
          required: false,
          label: "Destination Country",
          path: "DestinationCountry",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          visible: true,
          required: false,
          label: "Port of Loading",
          path: "PortOfLoading",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          visible: true,
          required: false,
          label: "Port of Destination",
          path: "PortOfDestination",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "No of Packages",
          path: "NoOfPackages",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          visible: true,
          required: false,
          label: "Type of Packing",
          path: "TypeOfPacking",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Vessel Name",
          path: "VesselName",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "IMO Name",
          path: "IMOName",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Voyage Number",
          path: "VoyageNumber",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "AWBBLLRRRConsignement Note No",
          path: "AWBBLLRRRConsignementNoteNo",
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          visible: true,
          required: false,
          label: "Date",
          path: "AWBBLLRRRConsignementNoteNoDate",
          spacing: 3,
          altFormat: "Y-m-d",
          dateFormat: "Y-m-d",
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Consignee Name",
          path: "ConsigneeName",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Consignee Address",
          path: "ConsigneeAddress",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Cosignee Contact No",
          path: "CosigneeContactNo",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Excess",
          path: "Excess",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Additional Information",
          path: "AdditionalInformation",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "LC No",
          path: "LCNo",
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          visible: true,
          required: false,
          label: "LC Date",
          path: "LCDate",
          spacing: 3,
          altFormat: "Y-m-d",
          dateFormat: "Y-m-d",
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Survey Agent",
          path: "SurveyAgent",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Settling Agent",
          path: "SettlingAgent",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Balance SI Before Current Certificate",
          path: "BalanceSIBeforeCurrentCertificate",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Balance Premium Before Current Certificate",
          path: "BalancePremiumBeforeCurrentCertificate",
          spacing: 3,
        },
        {
          type: "Input",
          visible: true,
          required: false,
          label: "Declaration Frequency",
          path: "DeclarationFrequency",
          spacing: 3,
        },
      ];
      break;
    case 1:
      data = [
        {
          type: "Custom",
          visible: true,
          spacing: 12,
          return: <IssueCertificate dto={dto} />,
        },
      ];
      break;

    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ dto, setDto, activeStep }) => {
  const lDto = dto;
  let fun = true;
  switch (activeStep) {
    case 0:
      {
        const res = await Quotations(dto);
        lDto.Total = res.finalResult.PremiumIncludingGST;
        lDto["Total Premium"] = res.finalResult.PremiumExcludingGST;
        lDto["Service Tax if applicable"] = res.finalResult.GST;
        setDto({ ...lDto });

        fun = swal
          .fire({
            input: "checkbox",
            title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
            html: `<div style="display: flex; flex-direction: row;">
          <div style="flex: 2; text-align: left; margin-left: 2rem" ">
          <div>Total Premium</div>
          <div>Service Tax</div>
          <div><b>Total</b></div>
         
          </div>
          <div style="flex: 1.7; text-align: right;font-size:16.3px; margin-right: 0.5rem" ">
          <div>₹</div>
          <div>₹</div>
          <div><b>₹</b></div>
       
          </div>
          <div style="flex: 1.3; text-align: right; margin-right: 1rem">
          <div> ${formater.format(res.finalResult.PremiumExcludingGST)}</div>
          <div> ${formater.format(res.finalResult.GST)}</div>
          <div><b> ${formater.format(res.finalResult.PremiumIncludingGST)}</b></div> 
          </div> </div>`,
            inputPlaceholder: `<p style="margin-left: 1rem">Premium on certificate not to be displayed, the certificate will only display 'As Agreed' against the premium field</p>`,
            inputAttributes: {
              id: "checkbox",
              style: "transform:scale(1.8);",
            },
            showConfirmButton: true,
            confirmButtonText: "Submit",
            allowOutsideClick: false,
            showCancelButton: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              if (result.value) return true;
            }
            return false;
          });
      }

      break;
    case 1:
      fun = true;

      break;
    case 2:
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Calculate Premium", visible: true },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async () => {
  const mst = {};
  return mst;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
