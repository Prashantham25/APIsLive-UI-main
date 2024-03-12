// import { GetProdPartnermasterData, Quotations } from "./data/APIs/USGIWCApi";
import { Quotations, GenericApi, GetDocumentByType } from "../../data/Apis";
import { PolicyJson } from "./data/Json/MarineSTOP";

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

const getProcessSteps = () => {
  const steps = [
    "Policy Details & Certificate Details",
    "Certificate Premium Calculation",
    "Certificate Issue",
  ];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        {
          name: "Policy Details & Certificate Details",
          visible: true,
        },
      ];
      break;
    case 1:
      steps = [{ name: "Certificate Premium Calculation", visible: true }];
      break;
    case 2:
      steps = [{ name: "Certificate Issue", visible: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ dto, activeStep }) => {
  let data = [];

  const onEmailCOI = async () => {
    // await Proposals(dto);
  };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  const onDownloadCOI = async () => {
    await GetDocumentByType({
      refenceNumber: `${dto.PolicyNo}.pdf`,
      documentType: "",
      emailId: "",
    }).then((x) => {
      generateFile(x.documentDetails[0].data, dto.PolicyNo);
    });

    // await Proposals(dto);
  };
  const onGoToHome = async () => {
    // await Proposals(dto);
  };

  switch (activeStep) {
    case 0:
      data = [
        [
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
            label: "Declaration Frequency",
            path: "DeclarationFrequency",
            spacing: 3,
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "Typography",
            visible: true,
            // required: false,
            label: "Total Premium",
            spacing: 6,
          },
          {
            type: "TypographyVal",
            visible: true,
            // required: false,
            path: "Total Premium",
            spacing: 6,
          },
          {
            type: "Typography",
            visible: true,
            // required: false,
            label: "Service Tax",
            spacing: 6,
          },
          {
            type: "TypographyVal",
            visible: true,
            // required: false,
            path: "Service Tax if applicable",
            spacing: 6,
          },
          {
            type: "Typography",
            visible: true,
            // required: false,
            label: "Total",
            spacing: 6,
          },
          {
            type: "TypographyVal",
            visible: true,
            // required: false,
            path: "Total",
            spacing: 6,
          },
          {
            type: "Checkbox",
            visible: true,
            required: true,
            label:
              "Premium on certificate not to be displayed, the certificate will only display 'As Agreed' against the premium field",
            path: "Premium on certificate not to be displayed, the certificate will only display 'As Agreed' against the premium field",
            checkedVal: "true",
            spacing: 12,
          },
        ],
        [],
        [],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Typography",
            visible: true,
            // required: false,
            label: "Certificated Issued Successfully",
            spacing: 12,
          },
          {
            type: "Typography",
            visible: true,
            // required: false,
            label: "COI No.",
            spacing: 6,
          },
          {
            type: "TypographyVal",
            visible: true,
            // required: false,
            path: "PolicyNo",
            spacing: 6,
          },
          {
            type: "Typography",
            visible: true,
            // required: false,
            label: "Insured Name",
            spacing: 6,
          },
          {
            type: "TypographyVal",
            visible: true,
            // required: false,
            path: "InsurableItem.0.RiskItems.0.Name",
            spacing: 6,
          },
          {
            type: "Button",
            visible: true,
            // required: false,
            label: "Email COI",
            onClick: onEmailCOI,
          },
          {
            type: "Button",
            visible: true,
            // required: false,
            label: "Download COI",
            onClick: onDownloadCOI,
          },
          {
            type: "Button",
            visible: true,
            // required: false,
            label: "Go To Home",
            onClick: onGoToHome,
          },
        ],
        [],
        [],
      ];
      break;
    case 3:
      data = [[], [], []];
      break;
    case 4:
      data = [[], [], []];
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
        fun = true;
      }

      break;
    case 1:
      {
        const res1 = await GenericApi("MarineSTOPPolicyCertificate", "MarineSTOPPolicy", dto);
        lDto.PolicyNo = res1.finalResult.id;
        setDto({ ...lDto });
        fun = true;
      }

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
        next: { label: "Calculate Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false, loader: "backDrop" },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
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
