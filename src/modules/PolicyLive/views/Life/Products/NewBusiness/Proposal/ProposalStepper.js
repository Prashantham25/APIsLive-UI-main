import { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Popover,
  Icon,
  Stack,
  Radio,
  Card,
  RadioGroup,
  // FormControlLabel,
  // Checkbox,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import Swal from "sweetalert2";

import {
  ExecuteProcedure,
  DocumentUpload,
  DeleteDocument,
  GetDocumentById,
  GetQuoteDetails,
  GetMasters,
  GetMasterLocation,
  GetProductMasterAVO,
  GetQuotationMaster,
  GenericApi,
  GetProdPartnerMasterDataWithID,
  GetProdPartnerMasterData,
  Proposals,
  SaveOpportunity,
  AllocationLogic,
  UpdateProposalDetails,
  // GeneratePDF,
  LICMailRequest,
  // GetQuestionnaire,
  GetOpportunity,
  NotificationsVerifyOTP,
  SaveUploadDocumentDetails,
} from "../data";
import PolicyJson from "./Json/InsurableItemJson";
// import LifeStepper from "../LifeStepper";
// import getViewProposalStepper from "./ViewProposal";
import {
  IsEmail,
  // IsNumeric,
  IsMobileNumber,
  // IsPan,
  // IsPassport,
  DateFormatFromStringDate,
  DateFormatFromDateObject,
  IsPan,
  IsIFSCode,
  arrayRange,
  formatCurrency,
  buildForm,
  IsCKYC,
  // AgeCalculator1,
} from "../../../../../../../Common/Validations";
// import { getOcrData } from "../../../../../../BaseSetup/views/MachineLearning/data";
// import { CkycResponse } from "../../../../Retail/Products/NBRetail/data/APIs/NBTravelApi";
import MDBox from "../../../../../../../components/MDBox";
import { set, get } from "../../../../../../../Common/RenderControl/objectPath";
import MDTypography from "../../../../../../../components/MDTypography";
// import { useDataController } from "../../../../../../BrokerPortal/context";
// import MDInput from "../../../../../../../components/MDInput";
import FetchCKYC from "../data/FetchCKYC";
import CKYCDetails from "../data/CKYCDetails";
import MSPCard from "../data/MSPCard";
import DocumentUploadCard from "../data/DocumentUploadCard";
import {
  OrderingArrayElementsByIds,
  // ParentChildNodeOrder,
} from "../../../../../../../Common/RenderControl/Version3/RenderControlFunctions";
import { GetQuestionsControls } from "../data/DynamicContent";
import MDInput from "../../../../../../../components/MDInput";
import PPDetailsModal from "../data/PPDetailsModal";
import ProposalFormArr from "./ProposalForm";
import NomineeDetailsModal from "../data/NomineeDetailsModal";
import PremiumSummaryCard from "../data/PremiumSummaryCard";
import DownloadProposalPDF from "../data/DownloadProposalPDF";
import MDButton from "../../../../../../../components/MDButton";
import { GetProposalByNumber } from "../../../../Retail/data/Apis";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import RulesForUAT from "../data/RulesForUAT";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import Disclaimer from "../data/Disclaimer";
import GetAnnexure from "../data/GetAnnexure";
import PlanWiseData from "./PlanWiseData";
import DocumentList from "../data/DocumentList";

const checkForValue = (value) => value === "" || value === undefined || value === null;

const arrayUniqueByKey = (array, key) => [
  ...new Map(array.map((item) => [item[key], item])).values(),
];

const gridStyle = {
  boxShadow: 2,
  border: 2,
  borderColor: "primary.light",
  "& .MuiDataGrid-cell:hover": {
    color: "primary.main",
  },
};

const altFormat = "d-m-Y";

const sumAll = (arr) => {
  let sum = 0;
  if (Array.isArray(arr))
    arr.forEach((x) => {
      sum += parseFloat(x, 10);
    });
  return sum;
};

const paymentOptions = [
  {
    label: "BOC",
    description: "On click please enter BOC details",
    value: "BOC",
  },
  {
    label: "Online Payment",
    description: "To send payment link to customer",
    value: "Online",
  },
];

const getDocumentMonthYear = (label) => {
  let lb = label;
  if (lb.replace(" ", "").includes("Current year")) {
    const v1 = lb.split("Current year");
    const v2 = v1[0];
    const v3 = parseInt(lb[lb.length - 1], 10);

    const v4 = new Date().getMonth() > 3; // next financial year;
    const v5 = new Date().getFullYear();

    if (v4 === true) lb = `${v2} (${v5 - v3 + 1}-${v5 - v3 + 2})`;
    else lb = `${v2} (${v5 - v3}-${v5 - v3 + 1})`;
  }
  if (lb.replace(" ", "").includes("current month")) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const v1 = lb.split("current month");
    const v2 = v1[0];
    const v3 = parseInt(lb[lb.length - 1], 10);
    const v4 = new Date().getMonth();

    if (v4 - v3 >= 0) lb = `${v2} (${months[v4 - v3]})`;
    else {
      lb = `${v2} (${months[12 + v4 - v3]})`;
    }
  }

  return lb;
};

// const getTemplateName = (product) =>
//   ({
//     "LIC's Jeevan Labh": "ProposalForm_EndowmentPlan_T",
//     "Jeevan Akshay": "ProposalForm_PensionPlan_T",
//     "Cancer Cover": "ProposalForm_HealthPlan_T",
//     "LIC's Bima Jyoti": "LICBhimJyothi",
//   }[product]);

const DownloadFile = (content, fileName) => {
  console.log("content", content);
  const src = `data:application/pdf;base64,${content}`;
  const link = document.createElement("a");
  link.href = src;
  link.download = fileName;
  console.log("FilenameQuote", link.download);

  link.click();
};

function ProposalSummary({ dto, flowId, setLoading }) {
  const [PaymentMode, setPaymentMode] = useState("");
  const [BOC, setBOC] = useState([{ BOCNumber: "", BOCDate: "", DevCode: "", BranchCode: "" }]);

  const sendPaymentLink = async () => {
    const req = LICMailRequest;
    req.message.to[0].email = dto.ProposerDetails.EmailId;
    req.message.to[0].name = dto.ProposerDetails.Name;
    req.message.html = `<p>Dear <strong>${dto.ProposerDetails.Name}</strong></br></br>
    We thank you for choosing LIC as your preferred Life Insurance Partner. The transaction has been initiated basis the details provided by you. We request you to review the proposal(s), provide your consent and complete the payment process if the details are as per your requirement. To check your proposal, please <a href="${window.location.origin}/CustomerEConsent?OpportunityId=${dto.opportunityId}">Click</a> The payment link will be valid for 48 hours. We request you to make the premium payment at the earliest to avoid the expiry of the proposal. The policy will be issued post successful premium payment</p>`;

    GenericApi("LifeInsurance", "LIC_EmailAPI", LICMailRequest).then((res) => {
      if (res.responseMessage === "Success") {
        Swal.fire({
          text: `Mail sent to ${dto.ProposerDetails.EmailId} successfully`,
          icon: "success",
        });
      }
    });
  };

  try {
    const onProceedPayment = () => {
      dto.QuotationData.forEach((x) => {
        UpdateProposalDetails({
          ...x,
          PaymentDetails: {
            PaymentMode,
            PaymentMethod: "",
            BOC,
          },
        });
      });

      if (PaymentMode === "Online") sendPaymentLink();
    };

    const onBOCDetails = (value, name, i) => {
      BOC[i][name] = value;
      setBOC([...BOC]);
    };
    const onAddBOC = () => {
      setBOC([...BOC, { BOCNumber: "", BOCDate: "", DevCode: "", BranchCode: "" }]);
    };
    const onBOCBlur = async (value, name, i) => {
      BOC[i][name] = value;
      if (
        BOC[i].BOCDate !== "" &&
        BOC[i].BOCNumber !== "" &&
        BOC[i].BranchCode !== "" &&
        BOC[i].DevCode !== ""
      ) {
        setLoading(true);

        await GenericApi("LifeInsurance", "LICBOCEnquiryApi", {
          BranchCode: BOC[i].BranchCode,
          BOCDate: BOC[i].BOCDate,
          BOCNumber: BOC[i].BOCNumber,
          AgencyCode: "00944891",
          ApplicationNo: "129544126       ",
          TransactionNumber: "50000312",
        }).then((res) => {
          setLoading(false);
          if (typeof res.finalResult === "object") {
            BOC[i] = { ...BOC[i], ...res.finalResult };
          }
        });
      }
      setBOC([...BOC]);
    };

    return (
      <Grid container spacing={2} pt="1rem">
        <Grid item xs={12} sm={12} md={6} lg={7.5} xl={7.5} xxl={7.5}>
          <Grid container spacing={1} sx={{ px: "0.75rem", pb: "1rem" }}>
            {paymentOptions.map((x) => (
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                {flowId === 1 && (
                  <Card sx={{ bgcolor: PaymentMode === x.value ? "#90caf9" : "#e3f2fd" }}>
                    <Stack justifyContent="center" spacin g={1} p={2}>
                      <RadioGroup value={PaymentMode} onChange={() => setPaymentMode(x.value)}>
                        <Radio value={x.value} />
                      </RadioGroup>
                      <MDTypography
                        sx={{
                          textAlign: "center",
                          color: PaymentMode === x.value ? "#1D4E9E" : "#000000",
                        }}
                        variant="h5"
                      >
                        {x.label}
                      </MDTypography>
                      <MDTypography
                        sx={{
                          fontSize: "1rem",
                          textAlign: "center",
                          color: PaymentMode === x.value ? "#1D4E9E" : "#000000",
                        }}
                      >
                        {x.description}
                      </MDTypography>
                    </Stack>
                  </Card>
                )}
              </Grid>
            ))}
            {PaymentMode === "BOC" && (
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <MDButton onClick={onAddBOC}>Add BOC</MDButton>
              </Grid>
            )}
            {PaymentMode === "BOC" &&
              BOC.map((x, i) => (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {flowId === 1 && (
                    <Grid container spacing={1} mt={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDTypography variant="h5">{`BOC ${i + 1}`}</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="BOC Number"
                          name="BOCNumber"
                          value={x.BOCNumber}
                          onChange={(e) => onBOCDetails(e.target.value, "BOCNumber", i)}
                          onBlur={(e) => onBOCBlur(e.target.value, "BOCNumber", i)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDDatePicker
                          fullWidth
                          options={{
                            dateFormat: "Ymd",
                            altFormat,
                            altInput: true,

                            disableMobile: true,
                          }}
                          input={{
                            label: "BOC Date",
                            value: x.BOCDate,
                          }}
                          value={x.BOCDate}
                          onChange={(e, a) => onBOCDetails(a, "BOCDate", i)}
                          onBlur={(e, a) => onBOCBlur(a, "BOCDate", i)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Dev Code"
                          name="DevCode"
                          value={x.DevCode}
                          onChange={(e) => onBOCDetails(e.target.value, "DevCode", i)}
                          onBlur={(e) => onBOCBlur(e.target.value, "DevCode", i)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Branch"
                          value={x.BranchCode}
                          onChange={(e) => onBOCDetails(e.target.value, "BranchCode", i)}
                          onBlur={(e) => onBOCBlur(e.target.value, "BranchCode", i)}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              ))}
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton onClick={onProceedPayment}>Proceed</MDButton>
            </MDBox>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4.5} xl={4.5} xxl={4.5}>
          <PremiumSummaryCard QuotationData={dto.QuotationData} />
        </Grid>
      </Grid>
    );
  } catch (ex) {
    return <MDBox />;
  }
}

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

const getProcessSteps = ({ flowId }) => {
  if (flowId === 1)
    return [
      "CKYC Details",
      "Insurable Details",
      "Proposals",
      "Documents",
      "ACR",
      "Premium & Payment",
    ];
  return ["CKYC Details", "Insurable Details", "Proposals", "Documents", "Disclaimer"];
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto, masters, flowId }) => {
  const { tab } = masters;
  const proposerFlag = !(
    dto.RiskItems[tab]?.Relation === "Self" && dto.ProposerSameAsInsurable === "No"
  );

  let PremiumWaiverFlag = false;
  // let ProposerIsLifeAssured = "No";
  // Proposer
  // Proposer + Minor life
  // Proposer + Life to be Assured
  dto.QuotationData.forEach((x1) => {
    x1.InsurableItem[0].RiskItems.forEach((x2) => {
      // if (x2.Relation === "Self") ProposerIsLifeAssured = "Yes";
      if (x2.PremiumWaiver === "Yes") PremiumWaiverFlag = true;
    });
  });

  let PlanWiseFlag1 = false;

  dto.QuotationData.forEach((x) => {
    if (
      !checkForValue(x.PlanNumber) &&
      x.PlanNumber !== "858" &&
      x.PlanNumber !== "862" &&
      x.PlanNumber !== "867" &&
      x.PlanNumber !== "857"
    )
      PlanWiseFlag1 = true;
  });

  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        ...dto.RiskItems.map((x) => ({
          name: `${x.Relation === "Self" ? "Proposer" : x.Relation} KYC Details`,
          visible: true,
        })),
      ];
      break;
    case 1:
      steps = [
        { name: "", visible: true },
        { name: "Personal", visible: true },
        { name: "Address Details", visible: true },
        { name: "Additional Info", visible: dto.RiskItems?.[tab]?.Relation === "Self" },
        {
          name: dto.RiskItems?.[tab]?.Age > 12 ? "Occupation Details" : "Educational Details",
          visible: true,
        },
        {
          name: `Previous Policy Details ${dto.RiskItems?.[tab]?.Age >= 18 ? "" : "(Minor)"}`,
          visible: PlanWiseFlag1 && (proposerFlag || PremiumWaiverFlag),
        },
        {
          name: `Previous Policy Details (Family Members)`,
          visible:
            PlanWiseFlag1 &&
            (dto.RiskItems?.[tab]?.Age < 18 ||
              (dto.RiskItems?.[tab]?.Gender === "Female" &&
                dto.RiskItems?.[tab]?.Occupation?.SourceOfIncomeCode === "H")),
        },
        { name: "Family History", visible: PlanWiseFlag1 && proposerFlag },
        {
          name: "Bank Account Details",
          visible: dto.RiskItems?.[tab]?.Relation === "Self",
        },
        {
          name: "Questionnaires",
          visible: true,
          // dto.RiskItems[tab]?.Relation === "Self"
          //   ? ProposerIsLifeAssured === "Yes" || PremiumWaiverFlag === "Yes"
          //   : true,
        },
        { name: "Nominee Details", visible: false },
      ];
      break;
    case 2:
      steps = [
        { name: "", visible: true, endorsement: true },
        { name: "Product Details", visible: true, endorsement: true },
        { name: "Proposer Details", visible: true, endorsement: true },
        { name: "Address Details", visible: true, endorsement: true },
        { name: "Occupation Details", visible: true, endorsement: true },
        { name: "Previous Policy Details", visible: true, endorsement: true },
        { name: "Family History", visible: true, endorsement: true },
        { name: "Bank Account Details", visible: true, endorsement: true }, // hideButtons === true
        { name: "Questionnaire", visible: true, endorsement: true },
        { name: "Nominees", visible: true, defaultExpanded: true },
        { name: "", visible: true },
      ];
      break;
    case 3:
      steps = [
        { name: "", visible: true },
        ...dto.RiskItems.map((x) => ({
          name: `Document Section for ${x.Name}`,
          visible: true,
        })),
      ];
      break;
    case 4:
      steps = [{ name: flowId === 1 ? "Agent Confidential Report" : "", visible: true }];
      break;
    case 5:
      steps = [{ name: "", visible: true }];
      break;
    case 6:
      steps = [{ name: "Medical Service Provider Allocation", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({
  masters,
  activeStep,
  // styles,
  setLoading,
  dto,
  setDto,
  setMasters,
  flowId,
  navigate,
  setActiveStep,
  QuestionVisitFlag,
  setQuestionVisitFlag,
  setNextCount,
  setNextFlag,
}) => {
  let data = [];
  const lDto = dto;
  const lMasters = masters;
  const { tab } = masters;
  const [memberTab, setMemberTab] = useState(0);
  const matchesMd = useMediaQuery("(min-width:992px)");

  // const [tab, setTab] = useState(0);

  const currYear = new Date().getFullYear();

  const [subTypeTab, setSubTypeTab] = useState(0);
  const [updateState, setUpdateState] = useState(1);
  const [DrawerFlag, setDrawerFlag] = useState(false);

  // const getTemplateId = (product) => ({ "512N304V02": 212, "512N314V03": 218 }[product]);

  // const [quotationList, setQuotationList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const [img, setImg] = useState("");
  const [timer, setTimer] = useState(0);

  const [DocumentListFlag, setDocumentListFlag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimer(timer + 1);
    }, 1000 * 30);
  });

  useEffect(() => {
    setUpdateState(updateState + 1);
    SaveOpportunity({
      opportunityId: lDto.opportunityId,

      isAutoSave: true,
      AutoSave: {
        ChannelType: flowId === 3 ? "D2C" : "A2C",
        PremiumDetails: {
          TotalPremium: sumAll(dto.QuotationData.map((x) => x.PremiumDetails["Total Premium"])),
        },
        productDetails: [
          {
            Product: dto?.QuotationData?.[0]?.Product,
            PlanNumber: dto?.QuotationData?.[0]?.PlanNumber,
          },
        ],
        currentDate: DateFormatFromDateObject(new Date(), "m-d-y"),
        opportunityId: lDto.opportunityId,
        RiskItems: lDto.RiskItems,
        QuotationList: lDto.QuotationList,
        ProposerSameAsInsurable: lDto.ProposerSameAsInsurable,
        ChannelDetails: lDto.ChannelDetails,
        ProposalList: lDto.ProposalList,
        ProposerContactNo: lDto.ProposerDetails.ContactNo,
        Category: lDto.Category,
        MHRAllocation: lDto.MHRAllocation,
        workflowStage: "proposal",
      },
      ChannelDetails: lDto.ChannelDetails,
      MHRAllocation: lDto.MHRAllocation,
      stageStatusId: lDto.isMHR === "Yes" ? 2 : 0,
    });
  }, [timer, activeStep]);

  const idValueMap = {
    contactType: "contactTypeId",
    Salutation: "SalutationId",
    Gender: "GenderId",
    MaritalStatus: "MaritalStatusId",
    Currency: "CurrencyId",
    Country: "CountryId",
    State: "StateId",
    District: "DistrictId",
    City: "CityId",
    Pincode: "PincodeId",

    // Product Masters
    Product: "ProductId",
    Plan: "PlanId",
    PolicyTerm: "PolicyTermId",
    PreferredMode: "PreferredModeId",
    DrawDownPeriod: "DrawDownPeriodId",
    BenefitOption: "BenefitOptionId",
  };

  const getMaster = (name) => masters[name];

  const assignValueId = (a, path, valueParam) => {
    const idParam = idValueMap[valueParam];
    if (path === "") {
      if (a !== null) setDto({ ...dto, [valueParam]: a.mValue, [idParam]: a.mID });
      else setDto({ ...dto, [valueParam]: "", [idParam]: "" });
    } else {
      const dummy = get(dto, path);
      if (a !== null)
        set(dto, path, { ...dummy, [valueParam]: a.mValue, [idParam]: a.mID }, setDto);
      else set(dto, path, { ...dummy, [valueParam]: "", [idParam]: "" }, setDto);
    }
  };

  const locationMasters = async (masterType, newValue, path) => {
    const order = ["Country", "State", "District", "City", "Pincode"];
    const keyOrder = ["Country", "State", "District", "City", "Pincode"];
    const ind = keyOrder.indexOf(masterType);
    const newAddress = get(dto, path);
    keyOrder.forEach((x, index) => {
      if (index > ind) {
        setMasters((prevState) => ({ ...prevState, [x]: [] }));
        newAddress[x] = "";
        newAddress[idValueMap[x]] = "";
      }
    });

    if (newValue) {
      newAddress[masterType] = newValue.mValue;
      newAddress[idValueMap[masterType]] = newValue.mID;
      if (masterType !== "Pincode") {
        setLoading(true);
        await GetMasterLocation(order[ind + 1], newValue.mID).then((res) => {
          setLoading(false);
          if (!checkForValue(res[0]))
            setMasters((prevState) => ({ ...prevState, [keyOrder[ind + 1]]: res[0].mdata }));
        });
      }
    } else {
      newAddress[masterType] = "";
      newAddress[idValueMap[masterType]] = "";
    }
    set(dto, path, newAddress, setDto);
  };

  const getAge = (basePath, value) => {
    const birthdate = new Date(value);
    const diff = Date.now() - birthdate.getTime();
    const Age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    if (basePath === "") setDto({ ...dto, DOB: value, Age });
    else {
      const dummy = get(dto, basePath);
      set(dto, basePath, { ...dummy, DOB: value, Age }, setDto);
    }
  };

  useEffect(() => {
    let mst = {};
    Promise.all([
      GetMasters(), // 0
      GetProdPartnerMasterData("LICCountry", []), // 1
      GetProductMasterAVO("Product", "0"), // 2
      GetProductMasterAVO("Preffered Mode", "0"), // 3
      GetQuotationMaster(""), // 4
      GetProdPartnerMasterDataWithID(
        "Occupation",
        { Plan: lDto?.QuotationData?.[0]?.PlanNumber },
        1274
      ), // 5
      GetProdPartnerMasterDataWithID(
        "PreviousPolicyInsurer",
        { MasterType: "PreviousPolicyInsurer" },
        1274
      ), // 6
      GetProdPartnerMasterDataWithID("LifeFamilyRelationship", {}, 1274), // 7
      GetProdPartnerMasterDataWithID("LifeNomineeRelation", {}, 1274), // 8
      GetProdPartnerMasterDataWithID("LifeAppointeeRelationship", {}, 1274), // 9
    ]).then((res) => {
      if (res && res[0]) {
        const dummy = mst;
        res[0].forEach((elem) => {
          // if (elem.mType === "Type") dummy.contactType = elem.mdata;
          if (elem.mType === "Salutation") dummy.Salutation = elem.mdata;
          if (elem.mType === "Gender") dummy.Gender = elem.mdata;
          if (elem.mType === "MaritalStatus") dummy.MaritalStatus = elem.mdata;
          if (elem.mType === "BankAccoutType") dummy.BankAccoutType = elem.mdata;
          if (elem.mType === "CauseOfDeath") dummy.CauseOfDeath = elem.mdata;
          if (elem.mType === "ResidentStatus") dummy.ResidentStatus = elem.mdata;
        });
        res[4].forEach((elem) => {
          if (elem.mType === "BankAccoutType") dummy.BankAccoutType = elem.mdata;
          if (elem.mType === "StateOfHealth") dummy.StateOfHealth = elem.mdata;
        });
        mst = {
          ...dummy,
          Country: res[1],
          Product: res[2],
          PreferredMode: res[3],
          Occupation: res[5],
          PreviousPolicyInsurer: res[6],
          LifeFamilyRelationship: res[7],
          LifeNomineeRelation: res[8],

          LifeAppointeeRelation: res[9],
        };
      }
      setMasters({ ...masters, ...mst });
    });
  }, []);

  let showOccupationQuestionsPlanWise1 = false;

  lDto.QuotationData.forEach((x) => {
    if (!checkForValue(x.PlanNumber) && x.PlanNumber === "954")
      showOccupationQuestionsPlanWise1 = true;
  });

  const getFileSize = (file) => {
    // const k = 1000;
    // const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    // const i = Math.floor(Math.log(file.size) / Math.log(k));
    // const KBSize = parseFloat((file.size / k ** i).toFixed(2));
    console.log("file.size / 1024", file.size / 1024);
    return file.size / 1024;
  };
  const getFileName = (file) => file.name.split(".").pop().toLowerCase();

  const onUploadPhoto = (event) => {
    const file = event.target.files[0];
    console.log(getFileName(file));
    if (getFileName(file) !== "jpeg" && getFileName(file) !== "jpg") {
      Swal.fire({ icon: "info", text: "File type should be JPEG" });
    } else if (getFileSize(file) > 500) {
      Swal.fire({ icon: "info", text: "File size should be less then 500KB" });
    } else {
      const reader = new FileReader();

      reader.onloadend = () => {
        /* eslint-disable */
        lDto.RiskItems[tab].CKYCDetails.image = `data:image/jpg;base64,${
          reader.result.split(",")[1]
        }`;
        /* eslint-enable */
        setDto({ ...lDto });

        const data2 = reader.result.split(",")[1];
        const binaryBlob = atob(data2);
        console.log("Encoded Binary File String:", binaryBlob);
      };
      reader.readAsDataURL(file);
      setDto({ ...lDto });
    }
  };
  const handleFileUpload = async (event, memberInd, docInd) => {
    const file = event.target.files[0];
    if (getFileName(file) !== "pdf") {
      Swal.fire({ icon: "info", text: "File type should be PDF" });
    } else if (getFileSize(file) > 500) {
      Swal.fire({ icon: "info", text: "File size should be less then 500KB" });
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append(file.name, file, file.name);
      await DocumentUpload(formData).then((result) => {
        setLoading(false);
        if (result.dMSDTOs[0].fileName !== null) {
          const DocObj = {
            ...lDto.RiskItems[memberInd].DocumentDetails[docInd],
            fileName: file.name,
            UploadDocDate: new Date().toLocaleDateString(),
            fileUploadStatus: true,
            fileId: result.dMSDTOs[0].fileName,
            fileExtension: file.name.split(".").pop().toLowerCase(),
          };

          lDto.RiskItems[memberInd].DocumentDetails[docInd] = DocObj;
          setDto({ ...lDto });
          Swal.fire({
            icon: "success",
            text: "Document uploaded successfully",
          });
        }
      });
    }
  };

  const handleDocFileDelete = async (memberInd, docInd) => {
    setLoading(true);
    const fileId = dto.RiskItems[memberInd]?.DocumentDetails[docInd].fileId.toString();
    lDto.RiskItems[memberInd].DocumentDetails[docInd] = {
      ...lDto.RiskItems[memberInd].DocumentDetails[docInd],
      fileName: "",
      UploadDocDate: "",
      fileUploadStatus: false,
      fileId: "",
      fileExtension: "",
    };
    await DeleteDocument(fileId).then(() => {
      setLoading(false);
    });
    setDto({ ...lDto });
  };

  const generateFile = async (e, fileName, fileExtension) => {
    setLoading(true);
    setAnchorEl(e.currentTarget);
    await GetDocumentById(fileName).then((res) => {
      setLoading(false);

      if (fileExtension.toLowerCase() === "pdf") {
        DownloadFile(res.data, "Document");
      } else {
        const src = `data:application/img;base64,${res.data}`;
        setImg(src);
      }
    });
  };

  const [ckycModalFlag, setCkycModalFlag] = useState(lDto.RiskItems.map(() => false));

  const onClickEKYC = async (i) => {
    setTimer(10);
    const DateObj = new Date();
    const transactionid = `${DateObj.getMinutes()}5${DateObj.getHours()}1${DateObj.getDate()}2${DateObj.getSeconds()}${flowId}${i}`;
    const res = await GenericApi("LifeInsurance", "eKYCRedirectionApi", {
      transactionid,
      accessid: dto.opportunityId,
    });
    console.log("res", res);
    // debugger;
    const form = buildForm({
      action: res.finalResult.redirectionURL,
      params: res.finalResult.requestBody,
    });
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  const LICGetCKYCDetails = async (flag, details, ind, SearchCategory, Searchinput) => {
    const ckycCodes = { Z: "CKYC", E: "Aadhaar", C: "PAN" };

    const checkOnBlurValidation = () => {
      let onBlurFlag = true;
      if (SearchCategory === "Z") if (IsCKYC(Searchinput) !== true) onBlurFlag = false;
      if (SearchCategory === "C") if (IsPan(Searchinput) !== true) onBlurFlag = false;
      if (SearchCategory === "E") onBlurFlag = true;

      return onBlurFlag;
    };

    if (flag && checkOnBlurValidation() === true) {
      const commCode = { Y: true, N: false };
      setLoading(true);
      const res = await GenericApi("LifeInsurance", "LICCkycSearch", {
        Name: details.Name ? details.Name : `${details?.FirstName} ${details?.LastName}`,
        DOB: DateFormatFromStringDate(details.DOB, "y-m-d", "d-m-y"),
        Gender: details.Gender[0],
        SourceID: "IT",
        ProposalKey: "111-1111-1131-111111-111",
        Master_Key: "111-1111-1131-111111-111",
        SearchCategory,
        Searchinput,
        ReferenceID: "11111111280920230001",
        "Product Code": "LifeInsurance",
        ProductCode: "LifeInsurance",
      });
      setLoading(false);

      if (res.finalResult?.message === "Success" && res.finalResult?.error_cd === "000") {
        // console.log("test 11");
        setLoading(true);
        const res1 = await GenericApi("LifeInsurance", "LICCkycDownload", {
          ckycnumber: res.finalResult.ckyc_data[0].ckyc_number,
          DOB: DateFormatFromStringDate(details.DOB, "y-m-d", "d-m-y"),
          ProposalKey: "111-1111-1131-111111-111",
          Master_Key: "111-1111-1131-111111-111",
          SourceID: "IT",
          ReferenceID: "11111111280920230001",
          "Product Code": "LifeInsurance",
          ProductCode: "LifeInsurance",
        });
        setLoading(false);
        if (res1.finalResult?.message === "Success" && res1.finalResult?.error_cd === "000") {
          const CKYCPersonalDetails = res1.finalResult.personaldetails;
          if (
            CKYCPersonalDetails.GENDER === lDto.RiskItems[ind].Gender[0] &&
            CKYCPersonalDetails.DOB ===
              DateFormatFromStringDate(lDto.RiskItems[ind].DOB, "y-m-d", "d-m-y")
          ) {
            if (
              (CKYCPersonalDetails.MOB_NUM === "" ||
                CKYCPersonalDetails.MOB_NUM === null ||
                CKYCPersonalDetails.MOB_NUM === undefined) &&
              (CKYCPersonalDetails.EMAIL === "" ||
                CKYCPersonalDetails.EMAIL === null ||
                CKYCPersonalDetails.EMAIL === undefined)
            ) {
              Swal.fire({
                icon: "warning",
                text: "Email-ID and Mobile Number unable to find in CKYC response",
                allowOutsideClick: false,
              }).then(() => {
                setTimer(10);

                onClickEKYC(ind);
              });
            } else {
              lDto.RiskItems[ind].CKYCThrough = ckycCodes[SearchCategory];
              const PermanentAddress = {
                AddressLine1: CKYCPersonalDetails.PERM_LINE1,
                AddressLine2: CKYCPersonalDetails.PERM_LINE2,
                AddressLine3: CKYCPersonalDetails.PERM_LINE3,
                Landmark: "",
                City: CKYCPersonalDetails.PERM_CITY,
                District: CKYCPersonalDetails.PERM_DIST,
                State: CKYCPersonalDetails.PERM_STATE,
                Country: CKYCPersonalDetails.PERM_COUNTRY,
                Pincode: CKYCPersonalDetails.PERM_PIN,
              };
              const CommunicationAddress = {
                AddressLine1: CKYCPersonalDetails.CORRES_LINE1,
                AddressLine2: CKYCPersonalDetails.CORRES_LINE2,
                AddressLine3: CKYCPersonalDetails.CORRES_LINE3,
                Landmark: "",
                City: CKYCPersonalDetails.CORRES_CITY,
                District: CKYCPersonalDetails.CORRES_DIST,
                State: CKYCPersonalDetails.CORRES_STATE,
                Country: CKYCPersonalDetails.CORRES_COUNTRY,
                Pincode: CKYCPersonalDetails.CORRES_PIN,
              };
              lDto.RiskItems[ind].sameComAddress =
                commCode[CKYCPersonalDetails.PERM_CORRES_SAMEFLAG];
              lDto.RiskItems[ind].CKYCNo = CKYCPersonalDetails.CKYC_NO;
              lDto.RiskItems[ind].Salutation = CKYCPersonalDetails.PREFIX;
              lDto.RiskItems[ind].FirstName = CKYCPersonalDetails.FNAME;
              lDto.RiskItems[ind].LastName = CKYCPersonalDetails.LNAME;
              lDto.RiskItems[ind].MiddleName = CKYCPersonalDetails.MNAME;
              lDto.RiskItems[ind].Name = CKYCPersonalDetails.FULLNAME;
              lDto.RiskItems[ind].BankDetails.HolderName = CKYCPersonalDetails.FULLNAME;
              lDto.RiskItems[ind].BankDetails.NachHolderName = CKYCPersonalDetails.FULLNAME;
              // if (CKYCPersonalDetails.MOB_NUM !== "" && CKYCPersonalDetails.MOB_NUM !== null) {
              lDto.RiskItems[ind].ContactNo = CKYCPersonalDetails.MOB_NUM;
              lDto.RiskItems[ind].MobileNo = CKYCPersonalDetails.MOB_NUM;
              // }
              // if (CKYCPersonalDetails.EMAIL !== "" && CKYCPersonalDetails.EMAIL !== null)
              lDto.RiskItems[ind].EmailId = CKYCPersonalDetails.EMAIL?.toString()?.toLowerCase();
              lDto.RiskItems[ind].FatherName = CKYCPersonalDetails.FATHER_FULLNAME;
              lDto.RiskItems[ind].MotherName = CKYCPersonalDetails.MOTHER_FULLNAME;

              lDto.RiskItems[ind].CKYCDetails = {
                ...res.finalResult.ckyc_data[0],
                ...CKYCPersonalDetails,
              };
              lDto.RiskItems[ind].PermanentAddress = { ...PermanentAddress };
              lDto.RiskItems[ind].CommunicationAddress = { ...CommunicationAddress };
              setDto({ ...lDto });
              ckycModalFlag[ind] = true;
              setCkycModalFlag([...ckycModalFlag]);
            }
          } else {
            Swal.fire({
              icon: "error",
              text: "CKYC details are not matching !",
              allowOutsideClick: false,
            });
          }
        } else
          Swal.fire({
            icon: "error",
            text: "c-KYC details not fetched!",
            allowOutsideClick: false,
          }).then(() => {
            // res1.finalResult?.message
            setTimer(10);
            onClickEKYC(ind);
          });
      } else {
        Swal.fire({
          icon: "error",
          text: "c-KYC details not fetched!",
          allowOutsideClick: false,
        }).then(() => {
          // res.finalResult?.message
          setTimer(10);
          onClickEKYC(ind);
        });
      }
    }
    setTimer(10);
  };

  const onPanEnter = (e, i) => {
    lDto.RiskItems[i].PANNo = e.target.value.toUpperCase();
    setDto({ ...lDto });
  };
  const spreadCKYCControls = () => {
    const arr = [];

    lDto.RiskItems.forEach((x, i) => {
      arr.push([
        {
          type: "RadioGroup",
          visible: x.Age <= 12 && x.EKYCDeclaration !== "Yes",
          spacing: 12,
          path: `RiskItems.${i}.KYCThrough`,
          radioLabel: { labelVisible: true, label: "How would you like to proceed KYC?" },
          radioList: [
            { label: "c-KYC", value: "ckyc" },
            { label: "e-KYC", value: "ekyc" },
          ],
        },
        {
          type: "Typography",
          label: "If you do not have Ckyc or Ekyc information you can proceed without verification",
          visible: x.Age <= 12 && x.KYCThrough !== "ekyc",
          color: "error",
          spacing: 12,
          variant: "h6",
        },
        {
          type: "Typography",
          label:
            "Note: You need to upload Minor life Birth Certificate in Document Upload section.",
          visible: x.Age <= 12 && x.KYCThrough !== "ekyc",

          color: "error",
          spacing: 12,
          variant: "h6",
        },
        {
          type: "RadioGroup",
          visible: x.KYCThrough === "ckyc",
          spacing: 12,
          path: `RiskItems.${i}.DoYouKnowYourCKYCNumber`,
          radioLabel: { labelVisible: true, label: "Do you Know your CKYC Number?" },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          disabled: x.CKYCDeclaration === "Yes",
        },

        {
          type: "Typography",
          visible: x.DoYouKnowYourCKYCNumber === "No" && x.KYCThrough === "ckyc",
          label: "Please Proceed by giving either PAN or Aadhaar details",
          spacing: 12,
          color: "error",
          variant: "h6",
          sx: { fontSize: "1rem" },
        },
        {
          type: "Tabs",
          value: masters.memberPanAadhaarIndex?.[i],
          visible: x.DoYouKnowYourCKYCNumber === "No" && x.KYCThrough === "ckyc",
          customOnChange: (e, newValue) => {
            lMasters.memberPanAadhaarIndex[i] = newValue;
            setMasters({ ...lMasters });
          },
          tabs: [
            { value: "PAN", label: "PAN Details" },
            { value: "Aadhaar", label: "Aadhaar Details" },
          ],
          spacing: 6,
        },
        { type: "Typography", spacing: 6, visible: x.DoYouKnowYourCKYCNumber === "No" },

        {
          type: "Input",
          label: "CKYC No",
          required: true,
          validationId: i + 1,
          visible: x.DoYouKnowYourCKYCNumber === "Yes" && x.KYCThrough === "ckyc",
          path: `RiskItems.${i}.CKYCNo`,
          onBlurFuncs: ["IsCKYC"],
          keepValueOnBlur: true,
          onChangeFuncs: ["IsNumeric"],
          disabled: x.CKYCDeclaration === "Yes",
          validationDisableOnProceed: true,
          maxLength: 14,
        },

        {
          type: "Input",
          label: "PAN No",
          validationId: i + 1,
          required: true,
          visible:
            lMasters.memberPanAadhaarIndex[i] === "PAN" &&
            x.DoYouKnowYourCKYCNumber === "No" &&
            x.KYCThrough === "ckyc",
          spacing: 3,
          path: `RiskItems.${i}.PANNo`,
          onBlurFuncs: ["IsPan"],
          keepValueOnBlur: true,
          disabled: x.CKYCDeclaration === "Yes",
          validationDisableOnProceed: true,
          placeholder: "AAAAA0000A",
          maxLength: 10,
          customOnChange: (e) => onPanEnter(e, i),
        },

        {
          type: "Input",
          label: "Aadhaar No. (Last 4 digits)",
          required: true,
          validationId: i + 1,
          visible:
            lMasters.memberPanAadhaarIndex[i] === "Aadhaar" &&
            x.DoYouKnowYourCKYCNumber === "No" &&
            x.KYCThrough === "ckyc",
          spacing: 2.4,
          path: `RiskItems.${i}.AadhaarNo`,
          onChangeFuncs: ["IsNumeric"],
          maxLength: 4,
          disabled: x.CKYCDeclaration === "Yes",
          validationDisableOnProceed: true,
        },

        {
          type: "Input",
          label: "Name (as per Aadhaar)",
          visible:
            x.DoYouKnowYourCKYCNumber === "No" &&
            lMasters.memberPanAadhaarIndex[i] === "Aadhaar" &&
            x.KYCThrough === "ckyc",
          path: `RiskItems.${i}.Name`,
          disabled: x.CKYCDeclaration === "Yes",
          spacing: 2.4,
        },
        {
          type: "Input",
          label: "Gender",
          visible:
            x.DoYouKnowYourCKYCNumber === "No" &&
            lMasters.memberPanAadhaarIndex[i] === "Aadhaar" &&
            x.KYCThrough === "ckyc",
          path: `RiskItems.${i}.Gender`,
          disabled: true,
          spacing: 2.4,
        },

        {
          type: "MDDatePicker",
          label: "Date of Birth",
          visible:
            x.KYCThrough === "ckyc" &&
            (x.DoYouKnowYourCKYCNumber === "No" || x.DoYouKnowYourCKYCNumber === "Yes"),
          dateFormat: "Y-m-d",
          altFormat,
          allowInput: true,
          value: x.DOB,
          // path: `RiskItems.${i}.DOB`,
          disabled: true,
          spacing: 2.4,
        },

        /* eslint-disable  */
        {
          type: "ValidationControl",
          subType: "Button",
          label: "Fetch KYC Details",
          visible:
            x.KYCThrough === "ckyc" &&
            (x.DoYouKnowYourCKYCNumber === "Yes" || x.DoYouKnowYourCKYCNumber === "No"),
          validationId: i + 1,
          variant: "outlined",
          spacing: 2.4,
          disabled: x.CKYCDeclaration === "Yes",
          startIcon: "search",

          onClick: (e) =>
            LICGetCKYCDetails(
              e,
              x,
              i,
              x.DoYouKnowYourCKYCNumber === "Yes"
                ? "Z"
                : lMasters.memberPanAadhaarIndex[i] === "PAN"
                ? "C"
                : "E",

              x.DoYouKnowYourCKYCNumber === "Yes"
                ? x.CKYCNo
                : lMasters.memberPanAadhaarIndex[i] === "PAN"
                ? x.PANNo
                : x.AadhaarNo
            ),
        },
        /* eslint-enable  */
        {
          type: "Button",
          label: "Click to Initiate E-KYC",
          visible: x.KYCThrough === "ekyc" && x.EKYCDeclaration !== "Yes",
          onClick: () => onClickEKYC(i),
          spacing: 12,
          justifyContent: "center",
        },
        {
          visible: x.EKYCDeclaration === "Yes",
          type: "Typography",
          label: "E-KYC Details Fetched Successfully",
          color: "success",
          sx: { textAlign: "center" },
          variant: "h5",
          spacing: 12,
        },

        {
          type: "Modal",
          visible: true,
          open: ckycModalFlag[i],
          return: (
            <FetchCKYC
              dto={dto}
              setDto={setDto}
              tab={i}
              onClose={() => {
                ckycModalFlag[i] = false;
                setCkycModalFlag([...ckycModalFlag]);
              }}
              setLoading={setLoading}
              flowId={flowId}
              setTimer2={setTimer}
            />
          ),
          sx: {
            top: "5%",
            left: matchesMd ? "20%" : "0%",
            width: matchesMd ? "60%" : "100%",
            height: "90%",
            overflowY: "scroll",
            bgcolor: ColorsSetting().secondary.focus,
          },
          onSideClose: true,
          spacing: 0.1,
        },

        // {
        //   type: "ValidationControl",
        //   subType: "Button",
        //   validationId: `1${i + 1}`,
        //   label: "Get CKYC Details",
        //   visible: "visibleDetails",
        //   visibleDetails: { path: `RiskItems.${i}.DoYouKnowYourCKYCNumber`, value: "Yes" },
        //   variant: "outlined",
        //   spacing: 3,
        //   onClick: (e) => LICGetCKYCDetails(e, dto.RiskItems[i], i, "Z", dto.RiskItems[i].CKYCNo),
        // },
      ]);
    });
    return arr;
  };

  const onFamilyHistoryAge = (e, i, x, y) => {
    lDto.RiskItems[tab].FamilyHistory[i].Age = e.target.value;

    if (y === "Living" && (x === "Mother" || x === "Father")) {
      if (parseInt(e.target.value, 10) < dto.RiskItems?.[tab]?.Age) {
        Swal.fire({ icon: "warning", text: `Age of ${x} can not be less than Life Insured` });
        lDto.RiskItems[tab].FamilyHistory[i].Age = "";
      }
    }
    //  else if (false && (x === "Mother" || x === "Father")) {
    //   if (parseInt(e.target.value, 10) < 18) {
    //     Swal.fire({ icon: "warning", text: `Age of ${x} can not be less than 18 years` });
    //     lDto.RiskItems[tab].FamilyHistory[i].Age = "";
    //   }
    // }

    setDto({ ...lDto });

    // lDto.RiskItems[tab].FamilyHistory[i].Age = e.target.value;
    // if (x === "Mother" || x === "Father") {
    //   if (parseInt(e.target.value, 10) < dto.RiskItems?.[tab]?.Age) {
    //     Swal.fire({ icon: "warning", text: `Age of ${x} can not be less than Life Insured` });
    //     lDto.RiskItems[tab].FamilyHistory[i].Age = "";
    //   }
    // }
    setDto({ ...lDto });
  };

  const SpreadDoclist = (docs, mID) => {
    const arr = [];

    const onAddDocToDocDetails = (e, docType, docInd, DocObj) => {
      lDto.RiskItems[mID].DocumentList[docType][docInd].isSelected = e.target.checked;
      if (e.target.checked === true) {
        lDto.RiskItems[mID].DocumentDetails.push({ ...DocObj });
      } else {
        lDto.RiskItems[mID].DocumentDetails = lDto.RiskItems[mID].DocumentDetails.filter(
          (x2) => x2.DocumentId !== DocObj.DocumentId
        );
      }
      setDto({ ...lDto });
    };

    Object.keys(docs || {}).forEach((x1) => {
      // type: "AutoComplete",
      // label: x1,
      // visible: true,
      // path: `RiskItems.${tab}.DocumentDetails.${i1}.DocumentName`,
      // options: dto.RiskItems?.[tab]?.DocumentList?.[x1]?.map((x2) => ({
      //   mValue: x2.DocumentName,
      // })),

      arr.push({
        type: "Typography",
        visible: true,
        spacing: 12,
        label: `${x1}${
          docs[x1][0].SubdocumentCount === 0
            ? `( Optional )`
            : `( upload any ${docs[x1][0].SubdocumentCount} document )`
        }`,
      });
      docs[x1].forEach((x2, i2) => {
        arr.push({
          type: "Checkbox",
          visible: true,
          spacing: 4,
          label: getDocumentMonthYear(x2.DocumentName),
          checkedVal: true,
          unCheckedVal: false,
          path: `RiskItems.${mID}.DocumentList.${x1}.${i2}.isSelected`,
          customOnChange: (e) => onAddDocToDocDetails(e, x1, i2, x2),
        });
      });
    });

    return arr;
  };

  const spreadFamilyHistory = () => {
    const arr = [];
    lDto.RiskItems[tab]?.FamilyHistory?.forEach((x, i) => {
      arr.push(
        {
          type: "AutoComplete",
          visible: true,
          label: "Relation",
          required: true,
          path: `RiskItems.${tab}.FamilyHistory.${i}.Relation`,
          disabled: i <= 1,
          options: masters.LifeFamilyRelationship?.filter(
            (x1) => x1.mValue !== "Father" && x1.mValue !== "Mother" && x1.mValue !== "Self"
          ),
        },
        {
          type: "AutoComplete",
          visible: true,
          required: true,
          label: "Living / Dead",
          path: `RiskItems.${tab}.FamilyHistory.${i}.LivingDead`,
          options: [{ mValue: "Living" }, { mValue: "Dead" }],
        },
        {
          type: "Input",
          visible: true,
          required: true,
          label: `Age ${x.LivingDead === "Dead" ? "at Death" : ""}`,
          spacing: 2.5,
          path: `RiskItems.${tab}.FamilyHistory.${i}.Age`,
          onChangeFuncs: ["IsNumeric"],
          maxLength: 2,
          customOnBlur: (e) => onFamilyHistoryAge(e, i, x.Relation, x.LivingDead),
        },
        {
          type: "Typography",
          label: "",
          visible: x.LivingDead !== "Living" && x.LivingDead !== "Dead",
          spacing: 2.5,
        },
        {
          type: "AutoComplete",
          label: "State of Health",
          visible: x.LivingDead === "Living",
          required: true,
          spacing: 2.5,
          options: masters.StateOfHealth,
          path: `RiskItems.${tab}.FamilyHistory.${i}.HealthStatus`,
        },
        {
          type: "Input",
          label: "Cause of Death",
          visible: x.LivingDead === "Dead",
          required: true,
          spacing: 2.5,
          options: masters.CauseOfDeath,
          path: `RiskItems.${tab}.FamilyHistory.${i}.CauseOfDeath`,
        },

        {
          type: "IconButton",
          visible: true,
          disabled: i <= 1,
          icon: "delete",
          spacing: 1,
          onClick: () => {
            const FamilyHistory1 = lDto.RiskItems[tab].FamilyHistory.filter((x1, i1) => i !== i1);
            lDto.RiskItems[tab].FamilyHistory = FamilyHistory1;
            setDto({ ...lDto });
          },
        }
      );
    });
    return arr;
  };

  const setSameAddress = (e) => {
    lDto.RiskItems[tab].sameComAddress = e.target.checked;
    if (e.target.checked === true) {
      lDto.RiskItems[tab].CommunicationAddress.modified = false;
      lDto.RiskItems[tab].CommunicationAddress.IsCommAddressChanged = "false";
      lDto.RiskItems[tab].IsCommAddressChanged = "false";
      lDto.RiskItems[tab].CommunicationAddress = { ...lDto.RiskItems[tab].PermanentAddress };
    }
    setDto({ ...lDto });
  };

  const onCommunicationAddress = (e, name) => {
    lDto.RiskItems[tab].CommunicationAddress[name] = e.target.value;
    lDto.RiskItems[tab].CommunicationAddress.IsCommAddressChanged = "true";
    lDto.RiskItems[tab].IsCommAddressChanged = "true";
    lDto.RiskItems[tab].CommunicationAddress.modified = true;
    setDto({ ...lDto });
  };
  const setSameAddressForMinor = (e) => {
    try {
      lDto.RiskItems[tab].MinorAddressSame = e.target.checked;
      lDto.RiskItems[tab].CommunicationAddress.IsCommAddressChanged = "true";
      lDto.RiskItems[tab].IsCommAddressChanged = "true";
      const selfNode = lDto.RiskItems.filter((x) => x.Relation === "Self")[0];
      if (e.target.checked === true) {
        lDto.RiskItems[tab].PermanentAddress = { ...selfNode.PermanentAddress };
        lDto.RiskItems[tab].CommunicationAddress = { ...selfNode.CommunicationAddress };
        lDto.RiskItems[tab].sameComAddress = selfNode.sameComAddress;
        lDto.RiskItems[tab].ForeignAddress = { ...selfNode.ForeignAddress };
      }
    } catch {
      //
    }
    setDto({ ...lDto });
  };
  // const addPolicy = () => {
  //   const newPolicy = {
  //     PolicyNumber: "",
  //     TypeofPolicy: "",
  //     NameoftheInsurer: "",
  //     Planname: "",
  //     Terminyears: "",
  //     Sumassured: "",
  //     TermRiderSumAssured: "",
  //     CIRiderSumAssured: "",
  //     ABADDBSumassured: "",
  //     DateofCommencement: "",
  //     DateofRevival: "",
  //   };
  //   lDto.RiskItems[tab].PreviousPolicyDetails.push(newPolicy);
  //   setDto({ ...lDto });
  // };

  // const deletePolicy = (index) => {
  //   const noOfPolicy = dto.RiskItems[tab]?.PreviousPolicyDetails.length;
  //   const newPolicyDetails = dto.RiskItems[tab]
  //     ? [...dto.RiskItems[tab].PreviousPolicyDetails]
  //     : [];
  //   for (let i = index; i < noOfPolicy - 1; i += 1)
  //     newPolicyDetails[i] = { ...newPolicyDetails[i + 1] };
  //   lDto.RiskItems[tab].PreviousPolicyDetails = [...newPolicyDetails.slice(0, -1)];
  //   setDto({ ...lDto });
  // };

  // const onPanNo = (e) => {
  //   lDto.ProposerDetails.PanNo = e.target.value.toUpperCase();
  //   setDto({ ...lDto });
  // };

  const onFetchPPD = async (Relation) => {
    setLoading(true);
    const genderCode = lDto.RiskItems[tab].Gender[0];
    const dob = lDto.RiskItems[tab].DOB;
    // const ppNoLength = dto?.RiskItems?.[tab]?.customerid_policyno?.length;
    const arr = [...lDto.RiskItems[tab].PreviousPolicyDetails];

    const obj1 = {
      customerid_policyno: dto.RiskItems[tab].customerid_policyno,
    };
    const obj2 = {
      customerid_policyno: dto.RiskItems[tab].family_customerid_policyno,
    };

    const TermsOfAcceptanceMap = {
      "01": "Accepted at OR",
      "02": "Accepted With Extra",
      "03": "Accepted on Modified Terms",
      "04": "Accepted with Occupation Extra",
      "05": "Accepted with Health Extra or Lean",
      "06": "Accepted with H.E/Lean/Occupation Extras",
      "07": "Accepted with Clause 4B",
      "08": "Accepted with Clause 4B and Occupation Extras.",
      "09": "Accepted with Age Extra",
    };

    const res1 = await GenericApi(
      "LifeInsurance",
      "LICPreviousPolicyCustomerID",
      Relation === "Self" ? obj1 : obj2
    );

    if (Array.isArray(res1.finalResult) && res1.finalResult.length > 0) {
      if (Relation === "Self") {
        const arr1 = res1.finalResult.filter((x) => x.sex === genderCode && x.birthdt === dob);
        const arr2 = arr1.filter(
          (x) =>
            parseInt(x.statuscd, 10) === 21 ||
            parseInt(x.statuscd, 10) === 31 ||
            parseInt(x.statuscd, 10) === 32 ||
            parseInt(x.statuscd, 10) === 33
        );
        if (arr1.length === 0) {
          Swal.fire({ icon: "info", text: "Details not matching with insurable person" });
        } else if (arr2.length === 0) console.log("");
        else {
          lDto.RiskItems[tab].PreviousPolicyDetails = arrayUniqueByKey(
            [
              ...arr,
              ...arr2.map((x) => ({
                ...x,
                acceptance_Name: TermsOfAcceptanceMap[x.acceptance_CD],
                Noofyears: new Date().getFullYear() - new Date(x.commencementdate).getFullYear(),
                InsurerType: "LIC",
                Relation,
              })),
            ],
            "policyno"
          );

          setDto({ ...lDto });
        }
      } else {
        const arr4 = [...lDto.RiskItems[tab].FamilyPreviousPolicyDetails];

        // const arr2 = arr1.filter(
        //   (x) =>
        //     parseInt(x.statuscd, 10) === 21 ||
        //     parseInt(x.statuscd, 10) === 31 ||
        //     parseInt(x.statuscd, 10) === 32 ||
        //     parseInt(x.statuscd, 10) === 33
        // );
        lDto.RiskItems[tab].FamilyPreviousPolicyDetails = arrayUniqueByKey(
          [
            ...arr4,
            ...res1.finalResult.map((x) => ({
              ...x,
              Noofyears: new Date().getFullYear() - new Date(x.commencementdate).getFullYear(),
              InsurerType: "LIC",
              Relation,
            })),
          ],
          "policyno"
        );

        setDto({ ...lDto });
      }
    } else Swal.fire({ icon: "warning", text: "Details not found !" });

    setLoading(false);
    if (false) setUpdateState(updateState + 1);
  };

  const dummyData = {
    RegistrationSource: "M",
    FinancialYear: "2023",
    SatteliteBranchCode: "",
    ApplicationNumber: "564345",
    OtherInsurersSA: "",
    LICDABSA: "",
    OtherInsurersDAB: "",
    OtherGroupDAB: "",
    PACode: "",
    SubPACode: "",
    DepartmentCode: "",
    EmployeeCode: "",
    TransactionDate: "",
    RegistrationDate: "20240111",
    VestingDate: "",
    VestingAge: "",
    PranNo: "",
    DeathSettlementOptionId: "N",
    DeathSettlementYears: "",
    DeathSettlementFullPart: "",
    DeathSettlementAmount: "",
    DeathSettlementPercentage: "",
    DeathSettlementMode: "",
    MaturitySettlementOptionId: "N",
    MaturitySettlementYears: "",
    MaturitySettlementFullPart: "",
    MaturitySettlementAmount: "",
    MaturitySettlementPercentage: "",
    MaturitySettlementMode: "",
    Relationship: "",
    CurrentDate: "20240111",
    PurposeOfInsurance: "S",
    AgeProof: "U",
    RuralUrban: "U",
    ResidenceGroup: "",
    PEP: "N",
    EKYC: "D",
    PanStatus: "Y",
    SmokerFlag: "",
    FemaleCategory: "",
    NRIOccupationClass: "",
    BelowA1: "",
    Caesareans: "",
    MSPCode: "",
    NoOfCigarettes: "",
    ChewableTobacco: "",
    CIExceed: "",
    FemaleDisease: "",
    MedicalCode: "S",
    PreviousPolicyTRSA: "",
    PreviousPolicySUC: "",
    ProposalsCount: "",
    SamePlanCount: "",
    SamePlanSA: "",
    ProposalYear: "2024",
    CentreCode: "",
    CreatingBranch: "",
    CreatedYear: "",
    NachType: "",
    MandateDate: "",
    SAOption: "",
    CmplnMode: "",
    PersonCode: "",
    CRMId: "",
    OnlineReceipt: "",
    POISPId: "",
    PaymentDate: "20240111",
    PaymentTime: "202401",
    BankAutoDebit: "",
    BranchCode: "891 ",
    ApplicationNo: "987637283       ",
    TransactionNumber: "60000001",
  };

  useEffect(async () => {
    const arr1 = [];
    let IsNach = "No";
    let ProposerSameAsInsurable = "No";
    if (Array.isArray(Object.keys(lDto.ProposalList))) {
      Object.keys(lDto.ProposalList)?.forEach(async (quoteNo) => {
        // setLoading(true);
        if (lDto.ProposalList[quoteNo].length === 0) {
          await GetQuoteDetails(quoteNo).then((res) => {
            // setLoading(false);
            if (res.quotationDetail?.QuotationDetails) {
              const quoteCount = res.quotationDetail.QuotationDetails.proposalCount;
              if (quoteCount) {
                arrayRange(1, parseInt(quoteCount, 10), 1).forEach(() => {
                  arr1.push({
                    ...res.quotationDetail.QuotationDetails,
                    QuoteNo: res.quotationDetail.QuoteNo,
                    AvailableNomineePercentage: 100,
                    ...dummyData,
                  });
                });
              } else {
                arr1.push({
                  ...res.quotationDetail.QuotationDetails,
                  QuoteNo: res.quotationDetail.QuoteNo,
                  AvailableNomineePercentage: 100,
                  ...dummyData,
                });
              }
            }
            lDto.QuotationData = arr1;

            arr1.forEach((x3) => {
              x3.InsurableItem[0].RiskItems.forEach((x4) => {
                if (x4.Relation === "Self") ProposerSameAsInsurable = "Yes";
              });
            });

            arr1.forEach((x) => {
              if (x.Nach === "Yes with 1 Due" || x.Nach === "Yes with 2 Due" || x.Nach === "Yes") {
                IsNach = "Yes";
              }
            });
            lDto.RiskItems = lDto.RiskItems.map((x) => ({ ...x, IsNach }));
            lDto.ProposerSameAsInsurable = ProposerSameAsInsurable;
            setDto({ ...lDto });
          });
        } else {
          lDto.ProposalList[quoteNo].forEach(async (proposalNo) => {
            await GetProposalByNumber(proposalNo).then((res) => {
              arr1.push({ ...res[0].policyDetails, proposalNumber: proposalNo });
            });
            lDto.QuotationData = arr1;
            setDto({ ...lDto });
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (false)
      lDto.RiskItems[0] = { ...dto.RiskItems[0], ...dto.QuotationData[0]?.ProposerDetails };
    setDto({ ...lDto });
  }, [dto?.QuotationData?.[0]]);

  const getQuoteInsurer = (RI) => {
    const arr = [];
    if (Array.isArray(RI)) {
      RI.forEach((x1) => {
        dto.RiskItems.forEach((x2, i2) => {
          if (
            x1.Name?.toLowerCase() === x2.Name?.toLowerCase() ||
            x1.Name?.trim() === x2.NameAtQuotation?.toString()?.trim() ||
            (x1.DOB === x2.DOB && x1.Gender === x2.Gender && x1.Relation && x2.Relation)
          )
            arr.push({
              ...x1,
              ...x2,

              Questionnare: [
                ...x2.Questionnare.map(
                  (x3) => dto.RiskItems[i2].Questionnare.filter((x4) => x4.QId === x3.QId)[0]
                ),
              ],
            });
        });
      });
    }
    return arr;
  };
  // x1=QuotationData RI,   x2 =RI
  // var arr1 = [1, 2, 3, 4],
  //   arr2 = [2, 4],
  //   res = arr1.filter((item) => !arr2.includes(item));
  // console.log(res);

  // const getQuoteProposer = () => {
  //   const self = dto.RiskItems.filter((x) => x.Relation === "Self")[0];
  //   return { ...dto.ProposerDetails, ...self };
  // };

  useEffect(() => {
    /* eslint-disable */
    lDto.ProposerDetails = lDto.RiskItems.filter(
      (x) => x.Relation === "Self"
    )[0]; /* eslint-enable */

    if (activeStep !== 0 && activeStep >= 1) {
      const arr = lDto.QuotationData.map((elem, index) => ({
        ...elem,

        // ProposalNo: "",
        // proposalTemplateId: getTemplateId(elem.ProductCode) ? getTemplateId(elem.ProductCode) : 218,
        docId: index + 10,
        src: "",
        signedSrc: "",
        envelopeId: "",
        opportunityId: dto.opportunityId,
        OpportunityNumber: dto.OpportunityNumber,
        ProposerDetails: lDto.ProposerDetails,
        InsurableItem: [
          {
            RiskItems: [
              ...getQuoteInsurer(elem.InsurableItem[0].RiskItems),
              // ...dto.QuotationWiseDetails[index].RiskItems.map((x1, i1) => ({
              //   ...x1,
              //   Questionnare: [
              //     ...x1.Questionnare.map(
              //       (x2) => dto.RiskItems[i1].Questionnare.filter((x3) => x3.QId === x2.QId)[0]
              //     ),
              //   ],
              //   DocumentDetails: [
              //     ...x1.DocumentDetails.map(
              //       (x2) =>
              //         dto.RiskItems[i1].DocumentDetails.filter(
              //           (x3) => x3.DocumentId === x2.DocumentId
              //         )[0]
              //     ),
              //   ],
              //   Occupation: { ...dto.RiskItems[i1].Occupation },
              //   PreviousPolicyDetails: [...dto.RiskItems[i1].PreviousPolicyDetails],
              // })),
            ],
          },
        ],
        // envelopeId: "bb1cdaa7-dc4e-4995-a744-03a25c619121",
      }));
      // setQuotationList(arr);
      lDto.QuotationData = arr;
      // setDto({ ...lDto });
    }

    try {
      lDto.QuotationData.forEach((x1, i1) => {
        const ppd = [];

        const memberId = {
          0: "first",
          1: "second",
          2: "third",
          3: "fourth",
          4: "fifth",
        };

        x1.InsurableItem[0].RiskItems.forEach((x2, i2) => {
          ppd.push(...x2.PreviousPolicyDetails.map((x3) => ({ ...x3, memberId: memberId[i2] })));
          ppd.push(
            ...x2.NonLICPreviousPolicyDetails.map((x3) => ({ ...x3, memberId: memberId[i2] }))
          );
          ppd.push(
            ...x2.FamilyPreviousPolicyDetails.map((x3) => ({ ...x3, memberId: memberId[i2] }))
          );
          ppd.push(
            ...x2.FamilyNonLICPreviousPolicyDetails.map((x3) => ({ ...x3, memberId: memberId[i2] }))
          );
        });
        lDto.QuotationData[i1].PreviousPolicyDetails = [...ppd];
      });
    } catch {
      //
    }

    // setMasters({ ...masters, tab: 0 });

    // if (lActiveStep === 0)
  }, [activeStep, updateState, dto]);

  const onScheduleAppointment = async () => {
    await GenericApi("LifeInsurance", "MSP000007_SchedulingApi", {
      accessid: "123465789",
      nameoftheproposer: dto.ProposerDetails?.Name,
      mobileNumber: dto.ProposerDetails?.ContactNo,
      emailId: dto.ProposerDetails?.EmailId,
      proposalnumber: "800001",
      proposalYear: `${new Date().getFullYear()}`,
      branchCode: "V089",
      pincode: `${dto.ProposerDetails?.PermanentAddress?.Pincode}`,
      listofprepolicymedicalreportstobeconducted: dto.MSP.TestsToPerform,
      dccode: dto.MSP.DCCode,
      appointmentdate: dto.MSP.AppointmentDate,
      appointmenttime: dto.MSP.AppointmentTime,
      schedulingtype: dto.MSP?.ScheduleType,
    });
    Swal.fire({ icon: "success", text: "Appointment scheduled successfully " });
  };

  const onMSPClick = (x) => {
    if (x !== null && x !== undefined) {
      lDto.MSP.DCCode = x.dccode;
      lDto.MSP.Address = x.dcaddress;
      lDto.MSP.MSPName = x.mspname;
      lDto.MSP.MSPCode = x.mspcode;
      lDto.MSP.MSPContactNo = x.contactMobileNumber;
      lDto.MSP.SpoCMobileNo = x.contactMobileNumber;
      lDto.MSP.SpoCName = x.contactPersonName;
    }

    lDto.MSP.TestsToPerform =
      "Video MER, Rest ECG, SBT 13, RUA, Haemogram, HbA1C, Urine Cotinine test, RUA, Lipidogram, ELISA for HIV, Hb%";
    setDto({ ...lDto });
  };

  // const [otp, setOtp] = useState("");
  // const [otp1, setOtp1] = useState("");

  // const [transactionNo, setTransactionNo] = useState(0);
  // const [otpStatus, setOtpStatus] = useState(false);
  const [timer1, setTimer1] = useState(100);
  const [resentOtp, setResentOtp] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (timer1 <= 60 && timer1 > 0) {
      setTimeout(() => {
        setTimer1(timer1 - 1);
      }, 1000);
    }
  }, [timer1]);

  const onSendOTP = async (i) => {
    setLoading(true);
    await GenericApi("LifeInsurance", "SendOtpAPi", {
      email: dto.RiskItems?.[i]?.EmailId,
      contactNo: dto.RiskItems?.[i]?.ContactNo,
      MasterType: "ProposalConsent",
      whatsAppNo: dto.RiskItems?.[i]?.ContactNo,
      addtionalDetails: {
        isEmail: "true",
        isSMS: "true",
        isWhatsApp: "true",
      },
    }).then((res) => {
      setLoading(false);
      if (res.status === 1 && res.finalResult?.TransactionNo) {
        // setTransactionNo(res.finalResult?.TransactionNo);
        lDto.RiskItems[i].OTPTransactionNo = res.finalResult?.TransactionNo;
        lDto.QuotationData = lDto.QuotationData.map((x1) => ({
          ...x1,
          ClientIPAddr: res.finalResult?.AddtionalDetails,
        }));
        setDto({ ...lDto });
        setTimer(60);
        resentOtp[i] += 1;
        setResentOtp([...resentOtp]);

        Swal.fire({
          icon: "success",
          text: `OTP sent to ${dto.RiskItems?.[i]?.EmailId} and ${dto.RiskItems?.[i]?.ContactNo}`,
        });
      } else Swal.fire({ icon: "warning", text: "Please retry !" });
    });
    setLoading(false);
  };

  const onVerifyOTP = async (i) => {
    setLoading(true);

    await NotificationsVerifyOTP({
      otp: lDto.RiskItems?.[i]?.OTPforVerify,
      transactionNo: lDto.RiskItems[i].OTPTransactionNo,
    }).then((res) => {
      setLoading(false);
      if (lDto?.ProposerDisclaimerConsent !== true)
        Swal.fire({
          text: "Please give consent",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
      else if (res.status === 1) {
        lDto.RiskItems[i].OTPVerifyStatus = true;
        let OPTStatusFlag = true;
        setDto({ ...lDto });

        lDto.RiskItems.forEach((x4) => {
          if (x4.Age > 18) if (x4.OTPVerifyStatus !== true) OPTStatusFlag = false;
        });
        if (OPTStatusFlag) {
          setLoading(true);
          setTimer(0);
          try {
            Promise.all(
              lDto.QuotationData.map((res4) =>
                UpdateProposalDetails({
                  ...res4,
                  OTPVerifyStatus: true,
                  PaymentDetails: {
                    PaymentMode: "Online",
                    PaymentMethod: "",
                    BOC: [],
                  },
                })
              )
            ).then(() => {
              Promise.all(
                lDto.QuotationData.map((pJson) =>
                  // create recored in document table
                  SaveUploadDocumentDetails({
                    TxnId: pJson.proposalId,
                    TxnType: "Proposal",
                    TxnNo: pJson.ProposalNo,
                    DocumentDetails: {
                      DocumentDetails: [
                        {
                          DocumentType: "Proposal PDF",
                          DocumentId: `${pJson.ProposalNo}.pdf`,
                          DocumentName: "LICProposalForm300PDF.pdf",
                          ContentType: "application/pdf",
                        },
                      ],
                    },
                  })
                )
              ).then(() => {
                setLoading(false);

                SaveOpportunity({
                  opportunityId: lDto.opportunityId,

                  isAutoSave: true,
                  AutoSave: {
                    ChannelType: flowId === 3 ? "D2C" : "A2C",
                    PremiumDetails: {
                      TotalPremium: sumAll(
                        dto.QuotationData.map((x) => x.PremiumDetails["Total Premium"])
                      ),
                    },
                    productDetails: [
                      {
                        Product: dto?.QuotationData?.[0]?.Product,
                        PlanNumber: dto?.QuotationData?.[0]?.PlanNumber,
                      },
                    ],
                    currentDate: DateFormatFromDateObject(new Date(), "m-d-y"),
                    opportunityId: lDto.opportunityId,
                    RiskItems: lDto.RiskItems,
                    QuotationList: lDto.QuotationList,
                    ProposerSameAsInsurable: lDto.ProposerSameAsInsurable,
                    ChannelDetails: lDto.ChannelDetails,
                    ProposalList: lDto.ProposalList,
                    ProposerContactNo: lDto.ProposerDetails.ContactNo,
                    Category: lDto.Category,
                    MHRAllocation: lDto.MHRAllocation,
                    workflowStage: "payment",
                  },
                  ChannelDetails: lDto.ChannelDetails,
                  MHRAllocation: lDto.MHRAllocation,
                  stageStatusId: lDto.isMHR === "Yes" ? 2 : 0,
                });

                lDto.QuotationData.forEach((x) => {
                  x.NomineeDetails.forEach((x1) => {
                    if (x1.NomineeAge <= 18) {
                      GenericApi("LifeInsurance", "GenericMailAPi", {
                        communicationId: "383",
                        ProposalNo: x.ProposalNo,
                        EmailID: x1.AppointeeEmailId,
                      });
                      GenericApi("LifeInsurance", "AppointeeConsentSMS", {
                        contactNo: x1.AppointeeMobileNo,
                        accessId: lDto.OpportunityNumber,
                        ProposalNo: x.ProposalNo,
                      });
                    }
                  });
                });

                // Generate Document and save to DMS
                // lDto.QuotationData.map((pJson1) =>
                //   GenericApi("LifeInsurance", "PrpoposalUploadApi", {
                //     opportunityId: lDto.opportunityId,
                //     communicationId: "365",
                //     ProposalNo: pJson1.ProposalNo,
                //     EmailID: pJson1.ProposerDetails.EmailID,
                //   })
                // );

                setLoading(true);
                // GenericApi("LifeInsurance", "LICProposalEmailApi", dto?.QuotationData?.[0]);

                if (flowId === 2 || flowId === 3) {
                  GenericApi("LifeInsurance", "GenericMailAPi", {
                    opportunityId: lDto.opportunityId,
                    communicationId: "365",
                    ProposalNo: lDto.QuotationData[0].ProposalNo,
                    EmailID: lDto.ProposerDetails.EmailId,
                  });
                  // lDto.QuotationData.forEach((x) => {
                  //   UpdateProposalDetails({
                  //     ...x,
                  //   });
                  // });
                  navigate(`/LifeCustomerPayment?OpportunityId=${lDto.opportunityId}`);
                }
              });
            });
          } catch {
            //
          }

          // Swal.fire({ icon: "success", text: "OTP verified successfully" });
          // setOtpStatus(true);
        }
      } else
        Swal.fire({
          // icon: "error",
          text: res.responseMessage,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
    });
    setDto({ ...lDto });
    setLoading(false);
  };

  const SpreadLifeVerificationControls = () => {
    const arr = [];

    lDto.RiskItems.forEach((x, i) => {
      if (x.Age > 18) {
        arr.push(
          {
            type: "Typography",
            visible: true,
            label:
              x.Relation === "Self"
                ? "Proposer/Main Life Verification"
                : "Second Life Verification",
            splitId: 4,
            spacing: 12,
          },
          {
            type: "Typography",
            visible: x.OTPVerifyStatus === true,
            label: "OTP Successfully Verified",
            splitId: 4,
            spacing: 12,
            color: "success",
            sx: { textAlign: "center" },
            variant: "h6",
          },
          {
            type: "Input",
            visible:
              !checkForValue(lDto?.RiskItems?.[i]?.OTPTransactionNo) && x.OTPVerifyStatus !== true,
            label: "Enter OTP",
            splitId: 4,
            spacing: 4,
            path: `RiskItems.${i}.OTPforVerify`,
            enableAtEndorsement: true,
            // customOnChange: (e) => setOtp(e.target.value),
          },
          {
            type: "Button",
            visible: x.OTPVerifyStatus !== true,
            label: resentOtp[i] === 0 ? `Send OTP` : "Resend OTP",
            variant: "outlined",
            splitId: 4,
            spacing: 4,
            onClick: () => onSendOTP(i),
          },
          {
            type: "Button",
            visible:
              !checkForValue(lDto?.RiskItems?.[i]?.OTPTransactionNo) && x.OTPVerifyStatus !== true,
            label: "Verify OTP",
            splitId: 4,
            spacing: 4,
            onClick: () => onVerifyOTP(i),
          }
        );
      }
    });

    return arr;
  };

  const onOccupation = async (e, a) => {
    if (a !== null) {
      lDto.RiskItems[tab].Occupation.PresentOccupation = a.mValue;
      lDto.RiskItems[tab].Occupation.PresentOccupationId = a.mID;
      lDto.RiskItems[tab].Occupation.LengthOfServiceFlag = a.LengthOfService;
      lDto.RiskItems[tab].Occupation.PresentOccupationCode = a.mCode.toString().trim();
      lDto.RiskItems[tab].Occupation.NatureOfDutyCode = "";
      lDto.RiskItems[tab].Occupation.SourceOfIncomeCode = "";
      lDto.RiskItems[tab].Occupation.NatureOfDuty = "";
      lDto.RiskItems[tab].Occupation.SourceOfIncome = "";
      lDto.RiskItems[tab].Occupation.EducationalQualification = "";
      lDto.RiskItems[tab].Occupation.Questionnare = [];
      setLoading(true);
      const res = await GetProdPartnerMasterDataWithID(
        "NatureOfDuty",
        { OccupationID: a.mID, Plan: lDto?.QuotationData?.[0]?.PlanNumber },
        1274
      );

      setLoading(false);

      lMasters.NatureOfDuty[tab] = res;
      lMasters.SourceOfIncome[tab] = [];
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
  };

  const onNatureOfDuty = async (e, a) => {
    if (a !== null) {
      lDto.RiskItems[tab].Occupation.NatureOfDuty = a.mValue;
      lDto.RiskItems[tab].Occupation.NatureOfDutyId = a.mID;
      lDto.RiskItems[tab].Occupation.NatureOfDutyCode = a.mCode.toString().trim();
      lDto.RiskItems[tab].Occupation.SourceOfIncome = "";
      lDto.RiskItems[tab].Occupation.SourceOfIncomeCode = "";
      lDto.RiskItems[tab].Occupation.EducationalQualification = "";
      lDto.RiskItems[tab].Occupation.Questionnare = [];
      setLoading(true);

      const res = await GetProdPartnerMasterDataWithID(
        "SourceOfIncome",
        {
          OccupationID: lDto.RiskItems[tab].Occupation.PresentOccupationId,
          NatureOfDuty: a.mID,
          Plan: lDto?.QuotationData?.[0]?.PlanNumber,
        },
        1274
      );
      setLoading(false);

      lMasters.SourceOfIncome[tab] = res;
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
  };

  const onSourceOfIncome = async (e, a) => {
    setUpdateState(updateState + 1);

    if (a !== null) {
      lDto.RiskItems[tab].Occupation.SourceOfIncome = a.mValue;
      lDto.RiskItems[tab].Occupation.SourceOfIncomeCode = a.mCode.toString().trim();
      lDto.RiskItems[tab].Occupation.EducationalQualification = "";
      setLoading(true);

      const res = await GetProdPartnerMasterDataWithID(
        "Qualification",
        {
          OccupationID: lDto.RiskItems[tab].Occupation.PresentOccupationId,
          NatureOfDuty: lDto.RiskItems[tab].Occupation.NatureOfDutyId,
          SourceOfIncome: a.mID,
          Plan: lDto?.QuotationData?.[0]?.PlanNumber,
        },
        1274
      );
      setLoading(false);

      const res1 = await ExecuteProcedure("po.usp_GetLifeDependentQuestionnaire", {
        Type: "Occupation",
        Occupation: lDto.RiskItems[tab].Occupation.PresentOccupationCode,
        SourceOfIncome: a.mCode.toString().trim(),
        NatureOfDuty: lDto.RiskItems[tab].Occupation.NatureOfDutyCode,
        ProductId: "",
        MaritalStatus: lDto.RiskItems[tab].MaritalStatus,
        Gender: lDto.RiskItems[tab].Gender,
        HazardousOccupation: "",
      });
      if (Array.isArray(res1.finalResult))
        lDto.RiskItems[tab].Occupation.Questionnare = OrderingArrayElementsByIds(res1.finalResult);
      else lDto.RiskItems[tab].Occupation.Questionnare = [];

      lMasters.EducationalQualification[tab] = res;
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
  };

  const getLengthOfServiceText = () => {
    const Experience = dto.RiskItems[tab]?.Occupation.Experience;
    if (Experience !== "" && Experience !== null && Experience !== undefined) {
      const ExperienceInt = parseInt(Experience, 10);
      if (ExperienceInt % 12 === 0) return `${ExperienceInt / 12} Years `;
      return `${parseInt(ExperienceInt / 12, 10)} Years and ${ExperienceInt % 12} Month`;
    }
    return "";
  };

  const onLengthOfService = (e, n) => {
    try {
      lDto.RiskItems[tab].Occupation[n] = e.target.value;
      const YY = lDto.RiskItems?.[tab]?.Occupation?.ExperienceYears;
      const MM = lDto.RiskItems?.[tab]?.Occupation?.ExperienceMonths;
      lDto.RiskItems[tab].Occupation.Experience = parseInt(YY, 10) * 12 + parseInt(MM, 10);
    } catch {
      //
    }
    setDto({ ...lDto });
    setUpdateState(updateState + 1);
  };
  const onLengthOfServiceBlur = (e) => {
    if (parseInt(e.target.value, 10) > 12) {
      // const los = lDto.RiskItems[tab].Occupation.Experience;
      // if (parseInt(los, 10) < 3)
      //   Swal.fire({
      //     icon: "warning",
      //     text: `Not eligible currently. Apply after the total service of 3 months`,
      //   });

      lDto.RiskItems[tab].Occupation.ExperienceMonths = 12;
      setDto({ ...lDto });
    }
  };

  const onChangeIFSCode = (e, name) => {
    lDto.RiskItems[tab].BankDetails[name] = e.target.value.toUpperCase();
    if (name === "NachIFSCode") {
      lDto.RiskItems[tab].BankDetails.NachBranchAddress = "";
      lDto.RiskItems[tab].BankDetails.NachBranch = "";
      lDto.RiskItems[tab].BankDetails.NachBankName = "";
    } else {
      lDto.RiskItems[tab].BankDetails.BranchAddress = "";
      lDto.RiskItems[tab].BankDetails.Branch = "";
      lDto.RiskItems[tab].BankDetails.BankName = "";
    }
    setDto({ ...lDto });
  };

  const onIFSCCode = async (e, a, setErrorFlag, setErrorText) => {
    if (IsIFSCode(e.target.value) === true) {
      setErrorFlag(false);
      setErrorText("");

      const res = await GetProdPartnerMasterDataWithID(
        "LICBankDetails",
        { IFSCode: e.target.value },
        null
      );

      const res1 = await GetProdPartnerMasterDataWithID(
        "eNachBankMaster",
        { BankId: e.target.value.substring(0, 4) },
        1274
      );

      if (a === "Nach") {
        if (Array.isArray(res) && res.length > 0) {
          if (res1?.[0]?.DebitCardFlag === "Active" || res1?.[0]?.NetBankFlag === "Active") {
            lDto.RiskItems[tab].BankDetails.NachBankName = res[0].BankName;
            lDto.RiskItems[tab].BankDetails.NachBranch = res[0].BankBranch;
            lDto.RiskItems[tab].BankDetails.NachBranchAddress = res[0].BankBranch;
            if (a === "") {
              lDto.RiskItems[tab].BankDetails.NachSameAsNeft = "No";
            }
            setDto({ ...lDto });
          }
        }
      } else if (Array.isArray(res) && res.length > 0) {
        lDto.RiskItems[tab].BankDetails.BankName = res[0].BankName;
        lDto.RiskItems[tab].BankDetails.Branch = res[0].BankBranch;
        lDto.RiskItems[tab].BankDetails.BranchAddress = res[0].BankBranch;
        if (a === "") {
          lDto.RiskItems[tab].BankDetails.NachSameAsNeft = "No";
        }
        setDto({ ...lDto });
      }

      // .then(async (res1) => {
      //   if (res1[0].DebitCardFlag === "Active" || res1[0].NetBankFlag === "") {
      //   }
      // });
    } else {
      setErrorFlag(true);
      setErrorText(IsIFSCode(e.target.value));
    }
    // setUpdateState(updateState + 1);
  };

  const spreadOccupationQuestions = () => {
    let controlsObject = [];
    const QArr = dto.RiskItems[tab]?.Occupation?.Questionnare;
    if (Array.isArray(QArr) && QArr.length > 0)
      controlsObject = GetQuestionsControls({
        questions: OrderingArrayElementsByIds(QArr),
        tab,
        node1: "RiskItems",
        node2: "Occupation.Questionnare",
        setDto,
        dto,
        isRequired: true,
      });
    const controlsArr =
      controlsObject[
        Object.keys(
          GetQuestionsControls({
            questions: QArr,
            tab,
            node1: "RiskItems",
            node2: "Occupation.Questionnare",
            setDto,
            dto,
            isRequired: true,
          })
        )[0]
      ];
    console.log("controlsArr", controlsArr);
    if (false && Array.isArray(controlsArr))
      return controlsArr.map((x) => ({ ...x, splitId: false }));
    return [];
  };
  const spreadMaritalQuestions1 = () => {
    const flag = lDto.RiskItems?.[tab]?.Gender === "Female" && lDto.RiskItems?.[tab]?.Age > 18;
    const flag1 = lDto.RiskItems?.[tab]?.MaritalStatus === "Married";
    // const flag3 = false;

    // lDto?.QuotationDetails.forEach(x=>{
    //   if(x.)
    // })

    const onDeliveryDate = (e, a) => {
      lDto.RiskItems[tab].DateOfLastDelivery = a;
      const from = new Date(e);
      const to = new Date();
      const diffYears = to.getFullYear() - from.getFullYear();
      const diffMonths = diffYears * 12 + to.getMonth() - from.getMonth();

      lDto.RiskItems[tab].DeliveryMonths = diffMonths;

      setDto({ ...lDto });
      setUpdateState(updateState + 1);
    };

    const radioList = [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ];

    let showFlag = false;

    lDto.QuotationData.forEach((x) => {
      if (
        !checkForValue(x.PlanNumber) &&
        x.PlanNumber !== "858" &&
        x.PlanNumber !== "862" &&
        x.PlanNumber !== "867" &&
        x.PlanNumber !== "857"
      )
        showFlag = true;
    });
    if (showFlag)
      return [
        { type: "Typography", visible: flag, label: "For Female Life only", spacing: 12 },
        {
          type: "RadioGroup",
          visible: flag,
          path: `RiskItems.${tab}.Pregnant`,
          radioLabel: {
            labelVisible: true,
            label: "Are you pregnant now?",
            fontSize: "1rem",
            fontWeight: 600,
          },
          radioList,
          justifyContent: "space-between",
          spacing: 8,
          required: true,
        },

        {
          type: "RadioGroup",
          visible: flag,
          path: `RiskItems.${tab}.DeliveryHistory`,
          radioLabel: {
            labelVisible: true,
            label: "Have you had any delivery history?",
            fontSize: "1rem",
            fontWeight: 600,
          },
          radioList,
          justifyContent: "space-between",
          spacing: 8,
          required: true,
        },
        {
          label: "Date of last delivery",
          path: `RiskItems.${tab}.DateOfLastDelivery`,
          visible: flag && lDto?.RiskItems?.[tab]?.DeliveryHistory === "Yes",
          type: "MDDatePicker",
          altFormat,
          dateFormat: "Y-m-d",
          allowInput: true,
          required: true,
          customOnChange: onDeliveryDate,
        },
        {
          type: "RadioGroup",
          visible: flag,
          path: `RiskItems.${tab}.Abortion`,
          radioLabel: {
            labelVisible: true,
            label: "Have you had any abortion or miscarriage or Cesarean section?",
            fontSize: "1rem",
            fontWeight: 600,
          },
          radioList,
          justifyContent: "space-between",
          spacing: 8,
          required: true,
        },
        {
          type: "Input",
          visible: flag && lDto?.RiskItems?.[tab]?.Abortion === "Yes",
          path: `RiskItems.${tab}.AbortionDetails`,
          required: true,
          label: "Enter Details",
        },
        {
          type: "RadioGroup",
          visible: flag,
          path: `RiskItems.${tab}.Gynecologist`,
          radioLabel: {
            labelVisible: true,
            label:
              "Have you ever consulted a gynecologist or undergone any investigation, treatment for any gynaec ailment?",
            fontSize: "1rem",
            fontWeight: 600,
          },
          radioList,
          justifyContent: "space-between",
          spacing: 8,
          required: true,
        },
        {
          type: "Input",
          visible: flag && lDto?.RiskItems?.[tab]?.Gynecologist === "Yes",
          path: `RiskItems.${tab}.GynecologistDetails`,
          required: true,
          label: "Enter Details",
        },
        { type: "Typography", visible: flag && flag1, label: "Husband’s details", spacing: 12 },
        {
          type: "Input",
          visible: flag && flag1,
          path: `RiskItems.${tab}.HusbandFullName`,
          required: true,
          label: "Husband’s full Name",
        },
        {
          type: "Input",
          visible: flag && flag1,
          path: `RiskItems.${tab}.HusbandOccupation`,
          required: true,
          label: "His Occupation",
        },
        {
          type: "CurrencyInput",
          visible: flag && flag1,
          path: `RiskItems.${tab}.HusbandAnnualIncome`,
          required: true,
          label: "His Annual Income",
        },
      ];
    return [];
  };
  const spreadMaritalQuestions = () => {
    let controlsObject = [];
    const QArr = dto.RiskItems[tab]?.MaritalQuestionnare;
    if (Array.isArray(QArr) && QArr.length > 0)
      controlsObject = GetQuestionsControls({
        questions: OrderingArrayElementsByIds(QArr),
        tab,
        node1: "RiskItems",
        node2: "MaritalQuestionnare",
        setDto,
        dto,
        isRequired: true,
      });
    const controlsArr =
      controlsObject[
        Object.keys(
          GetQuestionsControls({
            questions: QArr,
            tab,
            node1: "RiskItems",
            node2: "MaritalQuestionnare",
            setDto,
            dto,
            isRequired: true,
          })
        )[0]
      ];
    console.log("controlsArr", controlsArr);
    if (Array.isArray(controlsArr)) return controlsArr.map((x) => ({ ...x, splitId: false }));
    return [];
  };

  const riskQuestion = dto.RiskItems?.[tab]?.Questionnare;
  const proposalQuestions =
    dto.QuotationData?.[tab]?.InsurableItem?.[0].RiskItems[memberTab]?.Questionnare;
  const ACRQuestions = dto.RiskItems[tab]?.ACR;

  const RiskQuestionControls = GetQuestionsControls({
    questions: riskQuestion,
    tab,
    node1: "RiskItems",
    node2: "Questionnare",
    setDto,
    dto,
    isRequired: true,
  });

  useEffect(() => {
    try {
      const arr = dto.RiskItems.map((x1, i1) =>
        Object.keys(
          GetQuestionsControls({
            questions: x1.Questionnare,
            tab: i1,
            node1: "RiskItems",
            node2: "Questionnare",
            setDto,
            dto,
            isRequired: true,
          })
        ).map((x2, i2) => (i2 === 0 ? 1 : 0))
      );
      setQuestionVisitFlag([...arr]);
    } catch {
      //
    }
  }, []);
  console.log("QuestionVisitFlag", QuestionVisitFlag);

  const ProposalQuestionControls = GetQuestionsControls({
    questions: proposalQuestions,
    tab: memberTab,
    node1: `QuotationData.${tab}.InsurableItem.0.RiskItems`,
    node2: "Questionnare",
    setDto,
    dto,
  });
  const ACRQuestionsControls = GetQuestionsControls({
    questions: ACRQuestions,
    tab,
    node1: "RiskItems",
    node2: "ACR",
    setDto,
    dto,
    isRequired: true,
  });
  const spreadRiskQuestionControls = () => {
    let arr = [];
    try {
      console.log("RiskQuestionControls", RiskQuestionControls);
      if (Array.isArray(Object.keys(RiskQuestionControls))) {
        Object.keys(RiskQuestionControls).forEach((x, i) => {
          console.log(i, x);
          arr = [
            ...arr,
            ...RiskQuestionControls[x].map((x1) => ({ ...x1, hide: i !== subTypeTab, QTab: i })),
          ];
        });
        // const res = RiskQuestionControls[Object.keys(RiskQuestionControls)[subTypeTab]];
        // return Array.isArray(res) ? res : [];
      }
    } catch {
      //
    }
    console.log("RiskQuestionControls1", arr);

    return arr;
  };
  const spreadProposalQuestionControls = () => {
    if (Array.isArray(Object.keys(ProposalQuestionControls))) {
      const res = ProposalQuestionControls[Object.keys(ProposalQuestionControls)[subTypeTab]];
      if (Array.isArray(res)) return res;
    }

    return [];
  };
  const spreadACRQuestionsControls = () => {
    if (ACRQuestionsControls?.ACR) {
      return ACRQuestionsControls.ACR.map((x) => ({ ...x, splitId: false }));
    }
    return [];
  };

  const onNachSameAsNeft = async (e) => {
    if (e.target.value === "Yes") {
      const res1 = await GetProdPartnerMasterDataWithID(
        "eNachBankMaster",
        { BankId: lDto.RiskItems[tab].BankDetails.IFSCode.substring(0, 4) },
        1274
      );
      if (res1?.[0]?.DebitCardFlag === "Active" || res1?.[0]?.NetBankFlag === "Active") {
        lDto.RiskItems[tab].BankDetails.NachSameAsNeft = "Yes";
        lDto.RiskItems[tab].BankDetails.NachIFSCode = lDto.RiskItems[tab].BankDetails.IFSCode;
        lDto.RiskItems[tab].BankDetails.NachAccountNo = lDto.RiskItems[tab].BankDetails.AccountNo;
        lDto.RiskItems[tab].BankDetails.NachAccountType =
          lDto.RiskItems[tab].BankDetails.AccountType;
        lDto.RiskItems[tab].BankDetails.NachAccountTypeId =
          lDto.RiskItems[tab].BankDetails.AccountTypeId;
        lDto.RiskItems[tab].BankDetails.NachHolderName = lDto.RiskItems[tab].BankDetails.HolderName;
        lDto.RiskItems[tab].BankDetails.NachBranch = lDto.RiskItems[tab].BankDetails.Branch;
        lDto.RiskItems[tab].BankDetails.NachBankName = lDto.RiskItems[tab].BankDetails.BankName;
        lDto.RiskItems[tab].BankDetails.NachBranchAddress =
          lDto.RiskItems[tab].BankDetails.BranchAddress;
      }
    } else {
      lDto.RiskItems[tab].BankDetails.NachSameAsNeft = "No";
      lDto.RiskItems[tab].BankDetails.NachIFSCode = "";
      lDto.RiskItems[tab].BankDetails.NachAccountNo = "";
      lDto.RiskItems[tab].BankDetails.NachAccountType = "";
      lDto.RiskItems[tab].BankDetails.NachHolderName = "";
      lDto.RiskItems[tab].BankDetails.NachBranch = "";
      lDto.RiskItems[tab].BankDetails.NachBranchAddress = "";
      lDto.RiskItems[tab].BankDetails.NachBankName = "";
    }
    setDto({ ...lDto });
  };
  const onSaveProposal = async () => {
    if (
      lDto.QuotationData?.[tab]?.NomineeDetails?.length === 0 ||
      !lDto.QuotationData?.[tab]?.NomineeDetails
    )
      Swal.fire({ icon: "warning", text: "Please add atleast one nominee" });
    else if (lDto.QuotationData[tab].AvailableNomineePercentage !== 0)
      Swal.fire({ icon: "warning", text: "Total percentage of Nominee share to be 100%" });
    else if (lDto.QuotationData?.[tab]?.proposalNumber) {
      setLoading(true);
      lMasters.saveProposal = 1;
      setMasters({ ...lMasters });
      await UpdateProposalDetails(lDto.QuotationData?.[tab]).then(() => {
        Swal.fire({ icon: "success", text: "Application Updated Successfully" }); // res.responseMessage
      });

      setLoading(false);
    } else {
      setLoading(true);
      lMasters.saveProposal = 1;
      setMasters({ ...lMasters });

      const NomineeAppointee = [];
      lDto.QuotationData[tab].NomineeDetails.forEach((x) => {
        NomineeAppointee.push({
          Type: "Nominee",
          Name: x.NomineeName,
          DOB: x.NomineeDOB,
          Age: x.NomineeAge,
          Relationship: x.NomineeRelationWithProposer,
          PercentageOfShare: x.PercentageOfShare,
          AddressLine1: x.NomineeAddressLine1,
          AddressLine2: x.NomineeAddressLine2,
          AddressLine3: x.NomineeAddressLine3,
          City: x.NomineeCity,
          State: x.NomineeState,
          PinCode: x.NomineePincode,
        });
        if (x.NomineeAge < 18)
          NomineeAppointee.push({
            Type: "Appointee",
            Name: x.AppointeeName,
            DOB: x.AppointeeDOB,
            Age: x.AppointeeAge,
            Relationship: x.RelationshipWithAppointee,
            PercentageOfShare: "",
            AddressLine1: "",
            AddressLine2: "",
            AddressLine3: "",
            City: "",
            State: "",
            PinCode: "",
          });
      });

      lDto.QuotationData[tab].NomineeAppointee = [...NomineeAppointee];

      const res = await Proposals({
        ...dto.QuotationData[tab],
        PolicyStartDate: DateFormatFromDateObject(new Date(), "m/d/y"),
        PolicyEndDate: DateFormatFromDateObject(new Date(), "m/d/y"),
      });

      setLoading(false);
      if (
        res.status === 1 &&
        res.finalResult.ProposalResponse.proposalNumber !== null &&
        res.finalResult.ProposalResponse.proposalNumber !== undefined
      ) {
        lDto.QuotationData[tab].ProposalNo = res.finalResult.ProposalResponse.proposalNumber;
        lDto.QuotationData[tab].proposalNumber = res.finalResult.ProposalResponse.proposalNumber;
        lDto.QuotationData[tab].proposalId = res.finalResult.ProposalResponse.id;
        setLoading(true);

        lDto.ProposalList = {
          ...lDto.ProposalList,
          [lDto.QuotationData[tab].QuoteNo]: [
            ...lDto.ProposalList[lDto.QuotationData[tab].QuoteNo],
            res.finalResult.ProposalResponse.proposalNumber,
          ],
        };

        const opportunityJson = {
          opportunityId: dto.opportunityId !== undefined ? dto.opportunityId : 0,
          needAnalysisJson: null,
          stageId: 4,
          stageStatusId: 1,
          txnType: "",
          txnValue: res.finalResult.ProposalResponse.proposalNumber,
          txnValueId: res.finalResult.ProposalResponse.id,
        };
        await SaveOpportunity(opportunityJson);
        setLoading(false);
        if (res.finalResult.ProposalResponse.proposalNumber)
          Swal.fire({
            text: "Application saved successfully",
            icon: "success",
          });
        else
          Swal.fire({
            text: res.finalResult?.ProposalResponse.responseMessage,
            icon: "success",
          });

        if (
          false &&
          res.finalResult.DeviationDetails !== undefined &&
          res.finalResult.DeviationDetails.outcome === "Fail"
        ) {
          setLoading(true);
          await AllocationLogic(
            res.finalResult.ProposalResponse.proposalNumber,
            res.finalResult.DeviationDetails
          ).then(() => setLoading(false));
        }
        // swal({ icon: "success", text: res.finalResult.responseMessage });
      } else {
        Swal.fire({
          icon: "error",
          text: res.finalResult.ProposalResponse.errors[0].errorMessage,
        });
      }
      setDto({ ...lDto });
    }
    setTimer(10);
  };

  const onAccountType = (value, name) => {
    lDto.RiskItems[tab].BankDetails[name] = value.mValue;
    if (value.mValue === "Savings") lDto.RiskItems[tab].BankDetails[`${name}Id`] = "1";
    else lDto.RiskItems[tab].BankDetails[`${name}Id`] = "2";
    setDto({ ...lDto });
  };

  // const onViewDraftProposal = async () => {
  //   setLoading(true);
  //   const res = await GeneratePDF(
  //     getTemplateName(dto.QuotationData[tab].Product)
  //       ? getTemplateName(dto.QuotationData[tab].Product)
  //       : "LICBhimJyothi",
  //     dto.QuotationData[tab]
  //   );
  //   setLoading(false);
  //   DownloadFile(res.fileUploadResp?.fileData, "proposerForm");
  // };
  const [downProposalPDFModalFlag, setDownProposalPDFModalFlag] = useState(false);
  const [nomineeFlg, setNomineeFlg] = useState(false);
  const [EditFlg, setEditFlg] = useState(false);
  const [nomineeObj, setNomineeObj] = useState({
    NomineeName: "",
    NomineeDOB: "",
    NomineeRelationWithProposer: "",
    NomineeRelationWithProposerCode: "",
    PercentageOfShare: "",
    RelationshipWithAppointee: "",
    RelationshipWithAppointeeCode: "",
    IsNomineeAddressSameAsProposer: "",
    AppointeeName: "",
    AppointeeDOB: "",
    AppointeeEmailId: "",
    AppointeeMobileNo: "",
    NomineeAddressLine1: "",
    NomineeAddressLine2: "",
    NomineeCity: "",
    NomineeState: "",
    NomineePincode: "",
  });
  const dNomineeObj = {
    NomineeName: "",
    NomineeDOB: "",
    NomineeRelationWithProposer: "",
    PercentageOfShare: "",
    RelationshipWithAppointee: "",
    IsNomineeAddressSameAsProposer: "",
    AppointeeName: "",
    AppointeeDOB: "",
    AppointeeEmailId: "",
    AppointeeMobileNo: "",
    NomineeAddressLine1: "",
    NomineeAddressLine2: "",
    NomineeCity: "",
    NomineeState: "",
    NomineePincode: "",
  };
  useEffect(() => {
    setNomineeObj({
      ...nomineeObj,
      PercentageOfShare: dto.QuotationData?.[tab]?.AvailableNomineePercentage,
    });
  }, [tab, activeStep]);
  const onAddNominee = () => {
    try {
      lDto.QuotationData[tab].NomineeDetails = [
        ...(lDto.QuotationData[tab].NomineeDetails ? lDto.QuotationData[tab].NomineeDetails : []),
        nomineeObj,
      ];
      let percent = 0;
      lDto.QuotationData[tab].NomineeDetails.forEach((x) => {
        percent += parseInt(x.PercentageOfShare, 10);
      });
      lDto.QuotationData[tab].IsNomineeSameForAll = false;
      lDto.QuotationData[tab].AvailableNomineePercentage = 100 - percent;
      setDto({ ...lDto });
      setNomineeObj({
        ...dNomineeObj,
        PercentageOfShare: 100 - percent,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onUpdateNominee = () => {
    try {
      lDto.QuotationData[tab].NomineeDetails[nomineeObj.id] = nomineeObj;
      let percent = 0;
      lDto.QuotationData[tab].NomineeDetails.forEach((x) => {
        percent += parseInt(x.PercentageOfShare, 10);
      });
      lDto.QuotationData[tab].IsNomineeSameForAll = false;
      lDto.QuotationData[tab].AvailableNomineePercentage = 100 - percent;
      setDto({ ...lDto });
      setNomineeObj({ ...dNomineeObj, PercentageOfShare: 100 - percent });
    } catch (e) {
      console.log(e);
    }
  };
  const closeNomineeModal = () => {
    setNomineeObj({
      ...dNomineeObj,
      PercentageOfShare: dto.QuotationData?.[tab]?.AvailableNomineePercentage,
    });
    setNomineeFlg(false);
  };

  const deleteNominee = (index) => {
    try {
      lDto.QuotationData[tab].NomineeDetails = lDto.QuotationData[tab].NomineeDetails.filter(
        (x, i) => i !== index
      );
      lDto.QuotationData[tab].IsNomineeSameForAll = false;
      let percent = 0;
      lDto.QuotationData[tab].NomineeDetails.forEach((x) => {
        percent += parseInt(x.PercentageOfShare, 10);
      });
      lDto.QuotationData[tab].AvailableNomineePercentage = 100 - percent;
      setNomineeObj({ ...dNomineeObj, PercentageOfShare: 100 - percent });

      setDto({ ...lDto });
    } catch (e) {
      console.log(e);
    }
  };

  const onNomineeSame = (e) => {
    try {
      lDto.QuotationData[tab].IsNomineeSameForAll = e.target.checked;
      if (e.target.checked === true) {
        lDto.QuotationData = lDto.QuotationData.map((x) => ({
          ...x,
          IsNomineeSameForAll: true,
          AvailableNomineePercentage: lDto.QuotationData[tab].AvailableNomineePercentage,
          NomineeDetails: lDto.QuotationData[tab].NomineeDetails,
        }));
      }
      setDto({ ...lDto });
    } catch (ex) {
      console.log(ex);
    }
  };

  const onEditNominee = (x) => {
    setNomineeObj({ ...x });
    setEditFlg(true);
    setNomineeFlg(true);
  };
  const [ppdFlag, setPpdFlag] = useState(false);
  const [PPDObj, setPPDObj] = useState({
    policyno: "",
    custid: "",
    name: "",
    plancd: "",
    policyterm: "",
    premiumpayingterm: "",
    sumassured: "",
    commencementdate: "",
    premiummode: "",
    premiummodedesc: "",
    statuscd: "",
    medicalflag: null,
    instpremium: "",
    fupdt: "",
    sex: "",
    birthdt: "",
    revival_DT: "",
    sum_ASSURED_OPTION: "",
    decision: "",
    acceptance_CD: "",
    ta_SUM_ASSURED: "",
    ci_SUM_ASSURED: "",
    net_NCO: "",
    pwb_OPTED: "",
    tabular_RATE: "",
    ab_SUMASSURED: "",
    addb_SUMASSURED: "",
    annuity_OPTION: "",
    mode_ANNUITY: "",
    current_ANNUITY_INST: "",
    Noofyears: 0,
    InsurerType: "LIC",
  });
  const dPPDObj = {
    policyno: "",
    custid: "",
    name: "",
    plancd: "",
    policyterm: "",
    premiumpayingterm: "",
    sumassured: "",
    commencementdate: "",
    premiummode: "",
    premiummodedesc: "",
    statuscd: "",
    medicalflag: null,
    instpremium: "",
    fupdt: "",
    sex: "",
    birthdt: "",
    revival_DT: "",
    sum_ASSURED_OPTION: "",
    decision: "",
    acceptance_CD: "",
    ta_SUM_ASSURED: "",
    ci_SUM_ASSURED: "",
    net_NCO: "",
    pwb_OPTED: "",
    tabular_RATE: "",
    ab_SUMASSURED: "",
    addb_SUMASSURED: "",
    annuity_OPTION: "",
    mode_ANNUITY: "",
    current_ANNUITY_INST: "",
    Noofyears: 0,
    InsurerType: "LIC",
  };

  const onAddPPD = () => {
    lDto.RiskItems[tab].PreviousPolicyDetails.push({ ...PPDObj });
    setDto({ ...lDto });
    setPPDObj({ ...dPPDObj });
  };

  const onNonLICPPD = (flg, flg1) => {
    if (flg === true && flg1 === "Self") {
      lDto.RiskItems[tab].NonLICPreviousPolicyDetails.push({ ...dto.ppd, InsurerType: "NONLIC" });
      setDto({ ...lDto });
    }
    if (flg === true && flg1 === "Family") {
      lDto.RiskItems[tab].FamilyNonLICPreviousPolicyDetails.push({
        ...dto.familyPpd,
        InsurerType: "NONLIC",
      });
      setDto({ ...lDto });
    }
  };

  const PPDColumns = [
    {
      field: "policyno",
      headerName: "Policy Number",
    },
    // {
    //   field: "insurer",
    //   headerName: "Insurer",
    // },
    {
      field: "plancd",
      headerName: "Plan",
    },
    {
      field: "sumassured",
      headerName: "Sum Assured",
      align: "right",
    },
    {
      field: "policyterm",
      headerName: "Term",
    },
    {
      field: "premiumpayingterm",
      headerName: "Premium Paying Term",
    },

    {
      field: "ta_SUM_ASSURED",
      headerName: "Term Rider",
    },
    {
      field: "ci_SUM_ASSURED",
      headerName: "CI Rider",
    },
    {
      field: "ab_SUMASSURED",
      headerName: "AD Sum Assured",
    },
    {
      field: "addb_SUMASSURED",
      headerName: "ADDB Sum Assured",
    },
    {
      field: "commencementdate",
      headerName: "D.O.C",
    },
    {
      field: "pwb_OPTED",
      headerName: "PWB Opted",
    },
    {
      field: "tabular_RATE",
      headerName: "Tabular Rate",
    },
    {
      field: "annuity_OPTION",
      headerName: "Annuity Option",
    },
    {
      field: "acceptance_Name",
      headerName: "Terms of Acceptance",
    },
    // {
    //   field: "insurer",
    //   headerName: "Extract Details",
    // },
    // {
    //   field: "fupdt",
    //   headerName: "FUP Date of Surrender",
    // },
    // {
    //   field: "insurer",
    //   headerName: "Remarks",
    // },
  ].map((x) => ({ align: "center", headerAlign: "center", width: 150, ...x }));

  const NonPPDColumns = [
    {
      field: "policyno",
      headerName: "Policy Number",
    },
    {
      field: "insurer",
      headerName: "Insurer",
    },

    {
      field: "sumassured",
      headerName: "Sum Assured",
      align: "right",
      width: 180,
    },
  ].map((x) => ({ align: "center", headerAlign: "center", width: 250, ...x }));

  const onMaritalStatus = async (e, a) => {
    // assignValueId(a, `RiskItems.${tab}`, "MaritalStatus");
    lDto.RiskItems[tab].MaritalStatus = a.mValue;
    lDto.RiskItems[tab].MaritalStatusId = a.mID;

    ExecuteProcedure("po.usp_GetLifeDependentQuestionnaire", {
      Type: "MarriedFemale",
      Occupation: "",
      SourceOfIncome: "",
      NatureOfDuty: "",
      ProductId: "",
      MaritalStatus: a.mValue,
      Gender: lDto.RiskItems[tab].Gender,
      HazardousOccupation: "",
    }).then((res) => {
      if (Array.isArray(res.finalResult))
        lDto.RiskItems[tab].MaritalQuestionnare = OrderingArrayElementsByIds(res.finalResult);
      else lDto.RiskItems[tab].MaritalQuestionnare = [];
      setDto({ ...lDto });
    });

    setDto({ ...lDto });
  };

  const onProceedDisclaimer = () => {
    // if (otpStatus === false) {
    if (false) {
      Swal.fire({ icon: "warning", text: "Please enter OTP and Verify" });
    } else if (dto?.ProposerDisclaimerConsent !== true)
      Swal.fire({ icon: "warning", text: "Please give consent" });
    else {
      try {
        dto.QuotationData.forEach((x) => {
          UpdateProposalDetails(x);
        });
        GenericApi("LifeInsurance", "LICProposalEmailApi", dto?.QuotationData?.[0]);
        if (flowId === 2 || flowId === 3) {
          navigate(`/LifeCustomerPayment?OpportunityId=${dto.opportunityId}`);
        }
      } catch {
        //
      }
    }
  };

  const onInsurableName = (e, name) => {
    lDto.RiskItems[tab][name] = e.target.value;
    lDto.RiskItems[tab].Name = [
      lDto.RiskItems[tab].FirstName,
      lDto.RiskItems[tab].MiddleName,
      lDto.RiskItems[tab].LastName,
    ]
      .join(" ")
      .trim();
    setDto({ ...lDto });
  };

  const onPAN2 = (e) => {
    lDto.RiskItems[tab].PANNo = e.target.value.toUpperCase();
    setDto({ ...lDto });
  };

  const onPanNumber = (e, a, setErrFlag, setErrText) => {
    if (IsPan(e.target.value) === true) {
      setErrFlag(false);
      setErrText("");
      GenericApi("LifeInsurance", "LIC_PANVerification", {
        Pan: e.target.value,
        CustomerName: lDto.RiskItems[tab].Name,
      }).then((res) => {
        if (res.finalResult.PanResponse) {
          lDto.RiskItems[tab].NameAsPerPAN = [
            res.finalResult.PanResponse.FirstName,
            res.finalResult.PanResponse.MiddleName,
            res.finalResult.PanResponse.LastName,
          ]
            .join(" ")
            .trim();
          setDto({ ...lDto });
        }
      });
    } else {
      setErrFlag(true);
      setErrText("Enter valid PAN number");
    }
  };

  const planData = PlanWiseData({ planCode: dto?.QuotationData?.[0]?.PlanNumber });

  const onObjectiveOfInsurance = (e, a) => {
    lDto.RiskItems[tab].SuitabiltyAnalysis.ObjectiveInsurance = a.mValue;
    lDto.RiskItems[tab].SuitabiltyAnalysis.Category = planData.Category;
    lDto.RiskItems[tab].SuitabiltyAnalysis.RiskProfile = planData.RiskProfile;
    setDto({ ...lDto });
  };

  const kycFlagDisable =
    dto.RiskItems?.[tab]?.KYCThrough === "ckyc" || dto.RiskItems?.[tab]?.KYCThrough === "ekyc";
  const sameComAddressFlag = dto.RiskItems[tab]?.sameComAddress === true;
  const minorAddressDisable = dto.RiskItems?.[tab]?.MinorAddressSame === true;
  const majorFlag = dto.RiskItems?.[tab]?.Age > 12;

  // const AnnexureCode = `${ON.PresentOccupationCode}${ON.NatureOfDutyCode}${ON.SourceOfIncomeCode}`;

  const onEmailIdChanges = (e) => {
    lDto.RiskItems[tab].EmailId = e.target.value.toLowerCase();
    setDto({ ...lDto });
  };

  const getAnnexureCode = () => {
    const occ = dto.RiskItems?.[tab]?.Occupation;

    let annexureCode = "";

    if (occ.NatureOfDutyCode === "12") annexureCode = "Mining";
    if (occ.NatureOfDutyCode === "13") annexureCode = "OilNatural";
    if (occ.NatureOfDutyCode === "14") annexureCode = "Sewage";
    if (occ.NatureOfDutyCode === "15") annexureCode = "ConstructionTunneling";
    if (occ.PresentOccupationCode === "E9") annexureCode = "MerchantMarine";
    if (occ.NatureOfDutyCode === "2") annexureCode = "Army";
    if (occ.NatureOfDutyCode === "3") annexureCode = "Navy";
    if (occ.NatureOfDutyCode === "4") annexureCode = "Civil";
    if (occ.NatureOfDutyCode === "5") annexureCode = "AirForce";
    // if (occ.NatureOfDutyCode === "5") annexureCode = "Army";
    if (occ.PresentOccupationCode === "S5") annexureCode = "Manufacture";

    if (
      dto.RiskItems?.[tab]?.Gender === "Female" &&
      ["S1", "S5", "S2", "S6", "S7", "S3"].includes(occ.SourceOfIncomeCode) &&
      occ.ITAssessess === "No"
    )
      annexureCode = "PFQ";
    return annexureCode;
  };

  switch (activeStep) {
    case 0:
      data = [...spreadCKYCControls()];
      break;
    case 1:
      data = [
        // 0
        [
          ...lDto.RiskItems.map((x, i) => ({
            type: "Custom",
            visible: x.KYCThrough === "ekyc" || x.KYCThrough === "ckyc",
            spacing: 12,
            return: <CKYCDetails dto={dto} tab={i} />,
          })),
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => {
              setSubTypeTab(0);

              setMasters({ ...masters, tab: newValue });
              setNextFlag(true);
              setNextCount((prev) => prev + 1);
            },
            tabs: dto.RiskItems.map((elem, index) => ({
              value: index,
              label: elem.Age > 12 ? elem.Name : `${elem.Name} (Minor)`,
            })),
            spacing: dto.RiskItems.length * 2.4,
          },
        ],
        // 1 Personal
        [
          {
            label: "Full Name",
            visible: dto.RiskItems[tab].KYCThrough === "ekyc",
            path: `RiskItems.${tab}.Name`,
            type: "Input",
            disabled: true,
          },
          {
            label: "First Name",
            visible: dto.RiskItems[tab].KYCThrough !== "ekyc",
            path: `RiskItems.${tab}.FirstName`,
            type: "Input",
            required: !kycFlagDisable,
            disabled: kycFlagDisable,
            customOnChange: (e) => onInsurableName(e, "FirstName"),
          },
          {
            label: "Middle Name",
            visible: dto.RiskItems[tab].KYCThrough !== "ekyc",
            path: `RiskItems.${tab}.MiddleName`,
            type: "Input",
            disabled: kycFlagDisable,
            customOnChange: (e) => onInsurableName(e, "MiddleName"),
          },
          {
            label: "Last Name",
            visible: dto.RiskItems[tab].KYCThrough !== "ekyc",
            path: `RiskItems.${tab}.LastName`,
            type: "Input",
            required: !kycFlagDisable,
            disabled: kycFlagDisable,
            customOnChange: (e) => onInsurableName(e, "LastName"),
          },
          {
            label: "Father Name",
            visible: true,
            path: `RiskItems.${tab}.FatherName`,
            type: "Input",
            required: !(dto.RiskItems?.[tab]?.KYCThrough === "ckyc"),
            disabled: dto.RiskItems?.[tab]?.KYCThrough === "ckyc",
          },
          {
            label: "Mother Name",
            visible: true,
            path: `RiskItems.${tab}.MotherName`,
            type: "Input",
            required: !(dto.RiskItems?.[tab]?.KYCThrough === "ckyc"),
            disabled: dto.RiskItems?.[tab]?.KYCThrough === "ckyc",
          },
          {
            label: "Mobile No.",
            visible: majorFlag,
            path: `RiskItems.${tab}.ContactNo`,
            type: "Input",
            onBlurFuncs: [IsMobileNumber],
            disabled: kycFlagDisable,
            required: !kycFlagDisable,
            endAdornmentIcon: "smartphone",
          },
          {
            label: "Alternative Mobile No",
            visible: majorFlag,
            path: `RiskItems.${tab}.AlternativeContactNo`,
            type: "Input",
            onChangeFuncs: ["IsNumeric"],
            maxLength: 10,
            endAdornmentIcon: "smartphone",
          },
          {
            label: "Email Id",
            visible: majorFlag,
            path: `RiskItems.${tab}.EmailId`,
            type: "Input",
            required: true,
            onBlurFuncs: [IsEmail],
            customOnChange: onEmailIdChanges,
            // endAdornmentIcon: "mail",
          },
          {
            label: "Gender",
            path: `RiskItems.${tab}.Gender`,
            visible: true,
            type: "AutoComplete",
            options: getMaster("Gender"),
            customOnChange: (e, a) => assignValueId(a, `RiskItems.${tab}`, "Gender"),
            // required: true,
            disabled: true,
          },
          {
            label: "Date of Birth",
            path: `RiskItems.${tab}.DOB`,
            visible: true,
            type: "MDDatePicker",
            altFormat,
            dateFormat: "Y-m-d",
            customOnChange1: (e, value) => getAge(`RiskItems.${tab}`, value),
            disabled: true,
            allowInput: true,
          },

          // {
          //   label: "Place",
          //   visible: true,
          //   path: `RiskItems.${tab}.Place`,
          //   type: "Input",
          //   required: true,
          // },

          {
            label: "Marital Status",
            path: `RiskItems.${tab}.MaritalStatus`,
            visible: lDto?.RiskItems?.[tab]?.Age >= 18,
            type: "AutoComplete",
            options: getMaster("MaritalStatus"),
            // customOnChange: (e, a) => assignValueId(a, `RiskItems.${tab}`, "MaritalStatus"),
            customOnChange: onMaritalStatus,
            required: true,
          },
          {
            label: "Spouse Name",
            path: `RiskItems.${tab}.SpouseName`,
            visible: lDto?.RiskItems?.[tab]?.MaritalStatus === "Married",
            type: "Input",
            required: lDto?.RiskItems?.[tab]?.MaritalStatus === "Married",
            customOnChange: ["IsAlphaSpace"],
          },
          {
            label: "Place of Birth ",
            path: `RiskItems.${tab}.BirthPlace`,
            visible: true,
            type: "Input",
            required: true,
            customOnChange: ["IsAlphaSpace"],
          },
          {
            label: "Resident Status",
            visible: true,
            path: `RiskItems.${tab}.ResidentStatus`,
            type: "AutoComplete",
            options: masters.ResidentStatus,
            required: true,
            disabled: dto.RiskItems?.[tab]?.Relation === "Self",
          },
          {
            label: "Country of Residency",
            visible:
              dto.RiskItems?.[tab]?.ResidentStatus !== "Resident Indian" &&
              !checkForValue(dto.RiskItems?.[tab]?.ResidentStatus),
            required: dto.RiskItems?.[tab]?.ResidentStatus !== "Resident Indian",
            path: `RiskItems.${tab}.CountryOfResidency`,
            type: "AutoComplete",
            options: masters.Country,
            paths: [
              { path: `RiskItems.${tab}.CountryOfResidencyGroup`, parameter: "RESIDENCEGROUP" },
            ],
            disabled: dto.RiskItems?.[tab]?.Relation === "Self",
          },
          // {
          //   label: "Passport",
          //   visible: true,
          //   path: `RiskItems.${tab}.PassportNo`,
          //   type: "Input",
          //   onBlurFuncs: [IsPassport],
          // },
          {
            path: `RiskItems.${tab}.Occupation.ITAssessess`,
            label: "IT Assessee",
            visible: lDto?.RiskItems?.[tab]?.Age >= 18,
            type: "AutoComplete",
            required: true,
            options: [{ mValue: "Yes" }, { mValue: "No" }],
          },
          {
            label: "PAN No.",
            visible: true,
            path: `RiskItems.${tab}.PANNo`,
            type: "Input",
            required:
              (lDto?.RiskItems?.[tab]?.Age >= 18 &&
                !(lDto?.RiskItems?.[tab]?.CKYCThrough === "PAN")) ||
              dto.RiskItems?.[tab]?.Occupation?.ITAssessess === "Yes",
            onBlurFuncs: [IsPan],
            placeholder: "AAAAA0000A",
            maxLength: 10,
            keepValueOnBlur: true,
            disabled: lDto?.RiskItems?.[tab]?.CKYCThrough === "PAN",
            customOnBlur: onPanNumber,
            customOnChange: onPAN2,
          },

          {
            label: "Name as per PAN",
            visible: !(lDto?.RiskItems?.[tab]?.CKYCThrough === "PAN"),
            path: `RiskItems.${tab}.NameAsPerPAN`,
            type: "Input",
            disabled: true,
          },
          { type: "Custom", visible: true, return: null, spacing: 12 },

          {
            type: "RadioGroup",
            visible: lDto?.RiskItems?.[tab]?.Age >= 18,
            path: `RiskItems.${tab}.isGSTIN`,
            radioLabel: {
              labelVisible: true,
              label: "Are you registered under GST Act:",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            spacing: 6,
          },

          {
            label: "GSTIN",
            visible: lDto?.RiskItems?.[tab]?.Age >= 18 && lDto?.RiskItems?.[tab]?.isGSTIN === "Yes",
            path: `RiskItems.${tab}.GSTIN`,
            type: "Input",
            required: lDto?.RiskItems?.[tab]?.isGSTIN === "Yes",
          },

          { type: "Custom", visible: true, spacing: 12, return: null },
          {
            type: "Img",
            spacing: 2,
            visible: !majorFlag && lDto?.RiskItems?.[tab]?.KYCThrough === "nokyc",
            src: lDto.RiskItems?.[tab]?.CKYCDetails?.image,
          },
          { type: "Custom", visible: true, spacing: 12, return: null },
          {
            type: "Custom",
            visible: !majorFlag && lDto?.RiskItems?.[tab]?.KYCThrough === "nokyc",
            spacing: 2,
            return: (
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDButton component="label">
                  <input type="file" hidden accept="*image/*" onChange={onUploadPhoto} />
                  Upload Photo
                </MDButton>
              </MDBox>
            ),
          },
          { type: "Custom", visible: true, spacing: 12, return: null },
          {
            type: "Typography",
            visible: majorFlag && lDto?.RiskItems?.[tab]?.KYCThrough === "nokyc",
            spacing: 2,
            label: "File type JPEG, max file size 500KB",
            sx: { fontSize: "0.8rem", textAlign: "center" },
          },

          { type: "Custom", visible: true, spacing: 12, return: null },

          spreadMaritalQuestions(),
          ...spreadMaritalQuestions1(),
          {
            type: "RadioGroup",
            visible: lDto.RiskItems?.[tab]?.Relation === "Self",
            path: `RiskItems.${tab}.Occupation.TaxResidency`,
            radioLabel: {
              labelVisible: true,
              label: "Is the Tax Residency outside India?",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            spacing: 12,
            required: true,
            // disabled: minorAddressDisable,
          },
          ...(lDto?.RiskItems?.[tab]?.Occupation?.TaxResidency === "Yes"
            ? GetAnnexure({
                code: "Tax",
                dto,
                path: `RiskItems.${tab}.Occupation.Annuxure`,
                setDto,
                Country: masters.Country,
              })
            : []),
        ],
        // 2 address
        [
          {
            type: "Checkbox",
            spacing: 12,
            visible: !majorFlag && dto.RiskItems[tab].CKYCDeclaration !== "Yes",
            label: "Is Minor address same as Proposer Address",
            path: `RiskItems.${tab}.MinorAddressSame`,
            checkedVal: true,
            unCheckedVal: false,
            customOnChange: setSameAddressForMinor,
          },
          { type: "Typography", label: "Permanent Address", spacing: 12, visible: true },
          {
            label: "Address 1",
            path: `RiskItems.${tab}.PermanentAddress.AddressLine1`,
            visible: true,
            type: "Input",
            required: !kycFlagDisable && !minorAddressDisable,
            disabled: kycFlagDisable || minorAddressDisable,
          },
          {
            label: "Address 2",
            path: `RiskItems.${tab}.PermanentAddress.AddressLine2`,
            visible: true,
            type: "Input",
            required: !kycFlagDisable && !minorAddressDisable,
            disabled: kycFlagDisable || minorAddressDisable,
          },
          {
            label: "Address 3",
            path: `RiskItems.${tab}.PermanentAddress.AddressLine3`,
            visible: true,
            type: "Input",
            disabled: kycFlagDisable || minorAddressDisable,
          },
          {
            label: "Country",
            path: `RiskItems.${tab}.PermanentAddress.Country`,
            visible: true,
            type: "Input",
            required: !kycFlagDisable && !minorAddressDisable,
            options: getMaster("Country"),
            customOnChange1: (e, a) =>
              locationMasters("Country", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: kycFlagDisable || minorAddressDisable,
          },
          {
            label: "State",
            path: `RiskItems.${tab}.PermanentAddress.State`,
            visible: true,
            type: "Input",
            required: !kycFlagDisable && !minorAddressDisable,
            options: getMaster("State"),
            // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.Country),
            customOnChange1: (e, a) =>
              locationMasters("State", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: kycFlagDisable || minorAddressDisable,
          },
          {
            label: "District",
            path: `RiskItems.${tab}.PermanentAddress.District`,
            visible: true,
            type: "Input",
            required: !kycFlagDisable && !minorAddressDisable,
            options: getMaster("District"),
            // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.State),
            customOnChange1: (e, a) =>
              locationMasters("District", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: kycFlagDisable || minorAddressDisable,
          },
          {
            label: "City",
            path: `RiskItems.${tab}.PermanentAddress.City`,
            visible: true,
            type: "Input",
            required: !kycFlagDisable && !minorAddressDisable,
            options: getMaster("City"),
            // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.District),
            customOnChange1: (e, a) =>
              locationMasters("City", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: kycFlagDisable || minorAddressDisable,
          },
          {
            label: "Pincode",
            path: `RiskItems.${tab}.PermanentAddress.Pincode`,
            visible: true,
            type: "Input",
            required: !kycFlagDisable && !minorAddressDisable,
            // options: getMaster("Pincode"),
            // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.City),
            // customOnChange: (e, a) =>
            //   locationMasters("Pincode", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: kycFlagDisable || minorAddressDisable,
          },
          { type: "Typography", label: "Communication Address", spacing: 12, visible: true },
          {
            type: "Checkbox",
            spacing: 12,
            visible: true,
            label: "Is communication address same as permanent address?",
            path: `RiskItems.${tab}.sameComAddress`,
            checkedVal: true,
            unCheckedVal: false,
            customOnChange: (e) => setSameAddress(e),
            disabled: minorAddressDisable,
          },
          {
            label: "Address 1",
            path: `RiskItems.${tab}.CommunicationAddress.AddressLine1`,
            visible: true,
            required: !sameComAddressFlag && !minorAddressDisable,
            type: "Input",
            disabled: sameComAddressFlag || minorAddressDisable,
            customOnChange: (e) => onCommunicationAddress(e, "AddressLine1"),
          },
          {
            label: "Address 2",
            path: `RiskItems.${tab}.CommunicationAddress.AddressLine2`,
            visible: true,
            required: !sameComAddressFlag && !minorAddressDisable,
            type: "Input",
            disabled: sameComAddressFlag || minorAddressDisable,
            customOnChange: (e) => onCommunicationAddress(e, "AddressLine2"),
          },
          {
            label: "Address 3",
            path: `RiskItems.${tab}.CommunicationAddress.AddressLine3`,
            visible: true,
            type: "Input",
            disabled: sameComAddressFlag || minorAddressDisable,
            customOnChange: (e) => onCommunicationAddress(e, "AddressLine3"),
          },
          {
            label: "Country",
            path: `RiskItems.${tab}.CommunicationAddress.Country`,
            visible: true,
            required: !sameComAddressFlag && !minorAddressDisable,
            type: "Input",
            disabled: sameComAddressFlag || minorAddressDisable,
            customOnChange: (e) => onCommunicationAddress(e, "Country"),
          },
          {
            label: "State",
            path: `RiskItems.${tab}.CommunicationAddress.State`,
            visible: true,
            required: !sameComAddressFlag && !minorAddressDisable,
            type: "Input",
            disabled: sameComAddressFlag || minorAddressDisable,
            customOnChange: (e) => onCommunicationAddress(e, "State"),
          },
          {
            label: "District",
            path: `RiskItems.${tab}.CommunicationAddress.District`,
            visible: true,
            required: !sameComAddressFlag && !minorAddressDisable,
            type: "Input",
            disabled: sameComAddressFlag || minorAddressDisable,
            customOnChange: (e) => onCommunicationAddress(e, "District"),
          },
          {
            label: "City",
            path: `RiskItems.${tab}.CommunicationAddress.City`,
            visible: true,
            required: !sameComAddressFlag && !minorAddressDisable,
            type: "Input",
            disabled: sameComAddressFlag || minorAddressDisable,
            customOnChange: (e) => onCommunicationAddress(e, "City"),
          },
          {
            label: "Pincode",
            path: `RiskItems.${tab}.CommunicationAddress.Pincode`,
            visible: true,
            required: !sameComAddressFlag && !minorAddressDisable,
            type: "Input",
            disabled: sameComAddressFlag || minorAddressDisable,
            customOnChange: (e) => onCommunicationAddress(e, "Pincode"),
          },

          {
            type: "RadioGroup",
            visible:
              lDto.RiskItems[tab].ResidentStatus === "F.N.I.O." ||
              lDto.RiskItems[tab].ResidentStatus === "O.C.I.",
            path: `RiskItems.${tab}.ForeignAddress.OCI`,
            radioLabel: {
              labelVisible: true,
              label: "Are you holding valid Overseas Citizen of India card(OCI Card)",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            justifyContent: "space-between",
            spacing: 8,
            disabled: minorAddressDisable,
          },
          {
            type: "Typography",
            label: "Address outside India (Applicable only for NRI/FNIO)",
            spacing: 12,
            visible: dto.RiskItems[tab]?.ForeignAddress?.OCI === "Yes",
            // &&              dto.RiskItems[tab]?.ResidentStatus !== "Resident Indian",
          },
          ...[
            {
              label: "Address 1",
              path: `RiskItems.${tab}.ForeignAddress.AddressLine1`,
              type: "Input",
            },
            {
              label: "Address 2",
              path: `RiskItems.${tab}.ForeignAddress.AddressLine2`,
              type: "Input",
            },
            {
              label: "Address 3",
              path: `RiskItems.${tab}.ForeignAddress.AddressLine3`,
              type: "Input",
            },
            {
              label: "Country",
              path: `RiskItems.${tab}.ForeignAddress.Country`,
              type: "Input",
            },
            {
              label: "State",
              path: `RiskItems.${tab}.ForeignAddress.State`,
              type: "Input",
            },
            {
              label: "District",
              path: `RiskItems.${tab}.ForeignAddress.District`,
              type: "Input",
            },
            {
              label: "City",
              path: `RiskItems.${tab}.ForeignAddress.City`,
              type: "Input",
            },
            {
              label: "Pincode",
              path: `RiskItems.${tab}.ForeignAddress.Pincode`,
              type: "Input",
            },
          ].map((x) => ({
            ...x,
            visible: dto.RiskItems[tab]?.ForeignAddress?.OCI === "Yes",
            //  &&    dto.RiskItems[tab]?.ResidentStatus !== "Resident Indian",
            required: dto.RiskItems[tab]?.ForeignAddress?.OCI === "Yes",
            disabled: minorAddressDisable,
          })),
          ...GetAnnexure({
            code:
              dto.RiskItems?.[tab]?.ResidentStatus !== "Resident Indian" &&
              dto.RiskItems?.[tab]?.ResidentStatus !== null &&
              dto.RiskItems?.[tab]?.ResidentStatus !== undefined
                ? "NRI"
                : "",
            dto,
            path: `RiskItems.${tab}.Occupation.Annuxure`,
          }),
        ],
        [
          {
            type: "AutoComplete",
            visible: true,
            label: "Objective of Insurance",
            options: planData.Objective.map((x) => ({ mValue: x })),
            required: true,
            path: `RiskItems.${tab}.SuitabiltyAnalysis.ObjectiveInsurance`,
            customOnChange: onObjectiveOfInsurance,
          },
          {
            type: "Input",
            visible: true,
            label: "Risk Profile",
            path: `RiskItems.${tab}.SuitabiltyAnalysis.RiskProfile`,
            disabled: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Category",
            path: `RiskItems.${tab}.SuitabiltyAnalysis.Category`,
            disabled: true,
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "Tax Bracket",
            options: ["0%", "10%", "15%", "20%", "25%", "30%"].map((x) => ({ mValue: x })),
            path: `RiskItems.${tab}.SuitabiltyAnalysis.TaxBracket`,
          },
          {
            type: "CurrencyInput",
            visible: true,
            label: "Secured Loan",
            path: `RiskItems.${tab}.SuitabiltyAnalysis.SecuredLoan`,
          },
          {
            type: "CurrencyInput",
            visible: true,
            label: "Unsecured Loan",
            path: `RiskItems.${tab}.SuitabiltyAnalysis.UnsecuredLoan`,
          },
          {
            type: "Typography",
            visible: true,
            label: "Provide Proposers Yearly income from the sources given",
            spacing: 12,
          },
          {
            type: "CurrencyInput",
            visible: true,
            label: "Employment",
            path: `RiskItems.${tab}.SuitabiltyAnalysis.EmploymentIncome`,
          },
          {
            type: "CurrencyInput",
            visible: true,
            label: "Business Profession",
            path: `RiskItems.${tab}.SuitabiltyAnalysis.BusinessProfessionIncome`,
          },
          {
            type: "CurrencyInput",
            visible: true,
            label: "HUF",
            path: `RiskItems.${tab}.SuitabiltyAnalysis.HUFInsource`,
          },
          {
            type: "CurrencyInput",
            visible: true,
            label: "Other sources",
            path: `RiskItems.${tab}.SuitabiltyAnalysis.OtherSourcesIncome`,
          },
          {
            type: "CurrencyInput",
            visible: true,
            label: "Life Insured Income",
            path: `RiskItems.${tab}.SuitabiltyAnalysis.LifeInsuarnceIncome`,
          },
        ],

        // 3 occupation
        [
          ...(majorFlag
            ? [
                {
                  path: `RiskItems.${tab}.Occupation.PresentOccupation`,
                  label: "Present Occupation",
                  visible: true,
                  type: "AutoComplete",
                  spacing: 3,
                  options: masters.Occupation,
                  required: true,
                  customOnChange: onOccupation,
                },
                {
                  path: `RiskItems.${tab}.Occupation.NatureOfDuty`,
                  label: "Exact Nature of duties",
                  visible: true,
                  type: "AutoComplete",
                  spacing: 3,
                  required: true,
                  options: masters.NatureOfDuty[tab],
                  customOnChange: onNatureOfDuty,
                },
                {
                  path: `RiskItems.${tab}.Occupation.SourceOfIncome`,
                  label: "Source of Income",
                  visible: true,
                  type: "AutoComplete",
                  spacing: 3,
                  options: masters.SourceOfIncome[tab],
                  required: true,
                  customOnChange: onSourceOfIncome,
                },

                {
                  path: `RiskItems.${tab}.Occupation.EducationalQualification`,
                  label: "Educational qualification",
                  visible: true,
                  type: "AutoComplete",
                  spacing: 3,
                  options: masters.EducationalQualification[tab],
                  required: true,
                  paths: [
                    {
                      path: `RiskItems.${tab}.Occupation.EducationalQualificationCode`,
                      parameter: "mCode",
                    },
                  ],
                  endAdornmentIcon: "school",
                  disableClearable: true,
                },
                {
                  label: "Length of service",
                  visible:
                    lDto?.RiskItems?.[tab]?.Occupation?.SourceOfIncomeCode === "S1" ||
                    (lDto?.RiskItems?.[tab]?.Occupation?.PresentOccupationCode === "P5" &&
                      lDto?.RiskItems?.[tab]?.Occupation?.NatureOfDutyCode === "7"),
                  type: "Typography",
                  spacing: 1.5,
                },
                {
                  path: `RiskItems.${tab}.Occupation.ExperienceYears`,
                  label: "",
                  visible:
                    lDto?.RiskItems?.[tab]?.Occupation?.SourceOfIncomeCode === "S1" ||
                    (lDto?.RiskItems?.[tab]?.Occupation?.PresentOccupationCode === "P5" &&
                      lDto?.RiskItems?.[tab]?.Occupation?.NatureOfDutyCode === "7"),
                  type: "Input",
                  onChangeFuncs: ["IsNumeric"],
                  spacing: 0.75,
                  required: true,
                  helperText: "Years",
                  maxLength: 2,
                  customOnChange: (e) => onLengthOfService(e, "ExperienceYears"),
                },
                {
                  path: `RiskItems.${tab}.Occupation.ExperienceMonths`,
                  label: "",
                  visible:
                    lDto?.RiskItems?.[tab]?.Occupation?.SourceOfIncomeCode === "S1" ||
                    (lDto?.RiskItems?.[tab]?.Occupation?.PresentOccupationCode === "P5" &&
                      lDto?.RiskItems?.[tab]?.Occupation?.NatureOfDutyCode === "7"),
                  type: "Input",
                  onChangeFuncs: ["IsNumeric"],
                  spacing: 0.75,
                  required: true,
                  helperText: "Months",
                  maxLength: 2,
                  customOnChange: (e) => onLengthOfService(e, "ExperienceMonths"),
                  customOnBlur: onLengthOfServiceBlur,
                },
                {
                  path: `RiskItems.${tab}.Occupation.Experience`,
                  label: "Length of service (Months)",
                  visible: false && lDto?.RiskItems?.[tab]?.Occupation?.LengthOfServiceFlag === 1,
                  type: "Input",
                  onChangeFuncs: ["IsNumeric"],
                  spacing: 3,
                  required: true,
                  helperText: getLengthOfServiceText(),
                },

                {
                  path: `RiskItems.${tab}.Occupation.EmployerName`,
                  label: "Name of the present employer",
                  visible: true,
                  type: "Input",
                  spacing: 3,
                  onChangeFuncs: ["IsAlphaSpace"],
                },

                {
                  path: `RiskItems.${tab}.Occupation.AnnualIncome1`,
                  label: `Annual Income ${currYear - 1}-${currYear}`,
                  visible: true,
                  type: "CurrencyInput",
                  spacing: 3,
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.AnnualIncome2`,
                  label: `Annual Income ${currYear - 2}-${currYear - 1}`,
                  visible: true,
                  type: "CurrencyInput",
                  spacing: 3,
                },
                {
                  path: `RiskItems.${tab}.Occupation.AnnualIncome3`,
                  label: `Annual Income ${currYear - 3}-${currYear - 2}`,
                  visible: true,
                  type: "CurrencyInput",
                  spacing: 3,
                },
                {
                  type: "RadioGroup",
                  visible: showOccupationQuestionsPlanWise1,
                  spacing: 12,
                  path: `RiskItems.${tab}.TravelOutsideIndiaTotal90Days`,
                  radioLabel: {
                    labelVisible: true,
                    label: "Do you travel outside India for total 90 days  or more in a year ?",
                  },
                  radioList: [
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ],
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.TravelFromDate`,
                  label: `From date`,
                  visible: lDto.RiskItems?.[tab]?.TravelOutsideIndiaTotal90Days === "Yes",
                  type: "MDDatePicker",
                  spacing: 3,
                  altFormat,
                  dateFormat: "Y-m-d",
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.TravelToDate`,
                  label: `To date`,
                  visible: lDto.RiskItems?.[tab]?.TravelOutsideIndiaTotal90Days === "Yes",
                  type: "MDDatePicker",
                  spacing: 3,
                  altFormat,
                  dateFormat: "Y-m-d",
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.TravelStartDestination`,
                  label: `Start destination from country of permanent residence`,
                  visible: lDto.RiskItems?.[tab]?.TravelOutsideIndiaTotal90Days === "Yes",
                  type: "Input",
                  spacing: 6,
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.TravelEndDate`,
                  label: `End destination country`,
                  visible: lDto.RiskItems?.[tab]?.TravelOutsideIndiaTotal90Days === "Yes",
                  type: "Input",
                  spacing: 3,
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.TravelPlacesVisited`,
                  label: `Places visited`,
                  visible: lDto.RiskItems?.[tab]?.TravelOutsideIndiaTotal90Days === "Yes",
                  type: "Input",
                  spacing: 3,
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.StayDuration`,
                  label: `Duration of stay`,
                  visible: lDto.RiskItems?.[tab]?.TravelOutsideIndiaTotal90Days === "Yes",
                  type: "Input",
                  spacing: 3,
                  required: true,
                },
                {
                  type: "RadioGroup",
                  visible: showOccupationQuestionsPlanWise1,
                  spacing: 12,
                  path: `RiskItems.${tab}.EmployeedArmedParmilitaryPoliceForce`,
                  radioLabel: {
                    labelVisible: true,
                    label: "Are you employed in armed forces, paramilitary & police force ? ",
                  },
                  radioList: [
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ],
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.Wing`,
                  label: `Wing`,
                  visible: lDto.RiskItems?.[tab]?.EmployeedArmedParmilitaryPoliceForce === "Yes",
                  type: "Input",
                  spacing: 3,
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.Rank`,
                  label: `Rank`,
                  visible: lDto.RiskItems?.[tab]?.EmployeedArmedParmilitaryPoliceForce === "Yes",
                  type: "Input",
                  spacing: 3,
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.NatureOfWork`,
                  label: `Nature of work`,
                  visible: lDto.RiskItems?.[tab]?.EmployeedArmedParmilitaryPoliceForce === "Yes",
                  type: "Input",
                  spacing: 3,
                  required: true,
                },

                ...GetAnnexure({
                  code: getAnnexureCode(),
                  dto,
                  path: `RiskItems.${tab}.Occupation.Annuxure`,
                  setDto,
                  tab,
                }),
                ...spreadOccupationQuestions(),
              ]
            : [
                {
                  type: "RadioGroup",
                  visible: true,
                  path: `RiskItems.${tab}.Occupation.IsChildStudying`,
                  radioLabel: {
                    labelVisible: true,
                    label: "Is the child studying? ",
                    fontSize: "1rem",
                    fontWeight: 600,
                  },
                  radioList: [
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ],
                  spacing: 5,
                  required: true,
                },
                {
                  path: `RiskItems.${tab}.Occupation.EducationalQualification`,
                  label: "State the class and /or type of course",
                  visible: dto?.RiskItems?.[tab]?.Occupation?.IsChildStudying === "Yes",
                  type: "Input",
                  spacing: 3,
                  required: dto?.RiskItems?.[tab]?.Occupation?.IsChildStudying === "Yes",
                },
              ]),
        ],

        // 4 ppd
        [
          {
            type: "Typography",
            visible: true,
            label: "LIC Previous Policy",
            variant: "h5",
            spacing: 12,
          },
          {
            type: "Checkbox",
            spacing: 12,
            visible: lDto?.RiskItems?.[tab]?.PreviousPolicyDetails?.length === 0,
            label:
              "I hereby declare that I do not have any existing policies in-force or lapsed policies with LIC.",
            path: `RiskItems.${tab}.LICPPDDeclaration`,
            checkedVal: true,
            unCheckedVal: false,
          },
          {
            type: "Input",
            visible: lDto?.RiskItems?.[tab]?.LICPPDDeclaration !== true,
            label: "Customer ID / Policy Number",
            path: `RiskItems.${tab}.customerid_policyno`,
            validationId: 11,
            required: true,
            validationDisableOnProceed: true,
          },
          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 11,
            visible: lDto?.RiskItems?.[tab]?.LICPPDDeclaration !== true,
            variant: "outlined",
            label: "Fetch Details",
            startIcon: "search",
            onClick: (e) => {
              if (e === true) onFetchPPD("Self");
            },
            // justifyContent: "right",
          },

          {
            type: "Button",
            validationId: 2,
            visible: lDto?.RiskItems?.[tab]?.LICPPDDeclaration !== true,
            label: "Add LIC Previous Policy",
            variant: "outlined",
            startIcon: "add",
            spacing: 3,
            onClick: () => setPpdFlag(true),
            // justifyContent: "right",
          },

          {
            type: "DataGrid",
            visible: lDto.RiskItems[tab]?.PreviousPolicyDetails?.length > 0,
            spacing: 12,
            columns: PPDColumns,
            value: lDto.RiskItems?.[tab]?.PreviousPolicyDetails
              ? lDto.RiskItems[tab].PreviousPolicyDetails.map((x, i) => ({
                  ...x,
                  id: i,
                  insurer: "LIC",
                  policyno: `XXXXXX${x.policyno?.slice(-3)}`,
                  sumassured: formatCurrency(x.sumassured),
                  commencementdate: DateFormatFromStringDate(x.commencementdate, "y-m-d", "d/m/y"),
                }))
              : [],
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            rowId: "id",
            sx: gridStyle,
          },

          {
            type: "Divider",
            visible: true,
            spacing: 12,
          },

          {
            type: "Typography",
            visible: true,
            label: "Other Insurer Previous Policy",
            variant: "h5",
            spacing: 12,
          },
          {
            type: "Checkbox",
            spacing: 12,
            visible: lDto?.RiskItems?.[tab]?.NonLICPreviousPolicyDetails?.length === 0,
            label:
              "I hereby declare that I do not have any existing policies in force or lapsed policies with other Insurers.",
            path: `RiskItems.${tab}.NonLICPPDDeclaration`,
            checkedVal: true,
            unCheckedVal: false,
          },
          {
            type: "AutoComplete",
            visible: lDto?.RiskItems?.[tab]?.NonLICPPDDeclaration !== true,
            label: "Insurer",
            path: "ppd.insurer",
            required: true,
            options: masters.PreviousPolicyInsurer,
            validationId: 2,
            validationDisableOnProceed: true,
          },
          {
            type: "Input",
            visible: lDto?.RiskItems?.[tab]?.NonLICPPDDeclaration !== true,
            label: "Policy Number",
            path: "ppd.policyno",
            validationId: 2,
            required: true,
            validationDisableOnProceed: true,
          },
          {
            type: "CurrencyInput",
            visible: lDto?.RiskItems?.[tab]?.NonLICPPDDeclaration !== true,
            label: "Sum Assured",
            path: "ppd.sumassured",
            validationId: 2,
            required: true,
            validationDisableOnProceed: true,
          },

          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 2,
            visible: lDto?.RiskItems?.[tab]?.NonLICPPDDeclaration !== true,
            label: "Add",
            variant: "outlined",
            // onClick: (e) => {
            //   if (e === true) {
            //     lDto.RiskItems[tab].NonLICPreviousPolicyDetails.push({ ...lDto.ppd });
            //     setDto({ ...lDto });
            //     setPpdFlag(true)
            //   }
            // },
            spacing: 3,
            onClick: (x) => onNonLICPPD(x, "Self"),
          },

          {
            type: "Modal",
            visible: true,
            spacing: 12,
            open: ppdFlag,

            return: (
              <PPDetailsModal
                dto={PPDObj}
                setDto={setPPDObj}
                setPpdFlag={setPpdFlag}
                onAddPPD={onAddPPD}
                PPInsures={masters.PreviousPolicyInsurer}
                DOB={dto?.RiskItems?.[tab]?.DOB}
                Gender={dto?.RiskItems?.[tab]?.Gender}
                setLoading={setLoading}
                AddedPPDDetails={dto?.RiskItems?.[tab]?.PreviousPolicyDetails}
              />
            ),
            sx: {
              top: "10%",
              left: matchesMd ? "15%" : "0%",
              width: matchesMd ? "70%" : "100%",
              height: "80%",
              overflowY: "scroll",
              bgcolor: ColorsSetting().secondary.focus,
            },
          },

          {
            type: "DataGrid",
            visible: lDto.RiskItems[tab]?.NonLICPreviousPolicyDetails?.length > 0,
            spacing: 12,
            columns: [
              ...NonPPDColumns.filter((x) => x.headerName !== "Tabular Rate"),
              {
                field: "delete",
                headerName: "Delete",
                width: 70,
                renderCell: (p) => (
                  <IconButton
                    disabled={p.row.Agency === "LIC"}
                    onClick={() => {
                      const ppd = lDto.RiskItems[tab]?.NonLICPreviousPolicyDetails.filter(
                        (x, i) => p.row.id !== i
                      );
                      lDto.RiskItems[tab].NonLICPreviousPolicyDetails = ppd;
                      setDto({ ...lDto });
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                ),
              },
            ],

            value: lDto.RiskItems[tab]?.NonLICPreviousPolicyDetails?.map((x, i) => ({
              ...x,
              id: i,
              sumassured: formatCurrency(x.sumassured),
            })),
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            rowId: "id",
            sx: gridStyle,
          },
        ],
        [
          // {
          //   type: "Typography",
          //   visible: true,
          //   label: "LIC Previous Policy",
          //   variant: "h5",
          //   spacing: 12,
          // },
          {
            type: "Input",
            visible: true,
            label: "Customer ID / Policy Number",
            path: `RiskItems.${tab}.family_customerid_policyno`,
            validationId: 13,
            required: true,
            validationDisableOnProceed: true,
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "Relationship",
            path: `RiskItems.${tab}.tempRelationForPPD`,
            validationId: 13,
            required: true,
            validationDisableOnProceed: true,
            options:
              dto.RiskItems?.[tab]?.Age < 18
                ? [
                    { mValue: "Father" },
                    { mValue: "Mother" },
                    { mValue: "Brother" },
                    { mValue: "Sister" },
                  ]
                : [{ mValue: "Husband" }],
          },
          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 13,
            visible: true,
            variant: "outlined",
            label: "Fetch Details",
            startIcon: "search",
            onClick: (e) => {
              if (e === true) onFetchPPD(lDto?.RiskItems?.[tab]?.tempRelationForPPD);
            },
            // justifyContent: "right",
          },
          {
            type: "Button",
            visible: false, // dto.RiskItems[tab]?.NonLICPreviousPolicyExist === "Yes",
            label: "Add LIC Previous Policy",
            variant: "outlined",
            startIcon: "add",
            spacing: 3,
            onClick: () => setPpdFlag(true),
            // justifyContent: "right",
          },
          {
            type: "DataGrid",
            visible: lDto.RiskItems[tab]?.FamilyPreviousPolicyDetails?.length > 0,
            spacing: 12,
            columns: PPDColumns,
            value: lDto.RiskItems?.[tab]?.FamilyPreviousPolicyDetails
              ? lDto.RiskItems[tab].FamilyPreviousPolicyDetails.map((x, i) => ({
                  ...x,
                  id: i,
                  insurer: "LIC",
                  policyno: `XXXXXX${x.policyno?.slice(-3)}`,
                  sumassured: formatCurrency(x.sumassured),
                  commencementdate: DateFormatFromStringDate(x.commencementdate, "y-m-d", "d/m/y"),
                }))
              : [],
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            rowId: "id",
            sx: gridStyle,
          },

          {
            type: "Divider",
            visible: true,
            spacing: 12,
          },

          {
            type: "Typography",
            visible: true,
            label: "Other Insurer Previous Policy",
            variant: "h5",
            spacing: 12,
          },

          {
            type: "AutoComplete",
            visible: true,
            label: "Insurer",
            path: "familyPpd.insurer",
            required: true,
            options: masters.PreviousPolicyInsurer,
            validationId: 21,
            validationDisableOnProceed: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Policy Number",
            path: "familyPpd.policyno",
            validationId: 21,
            required: true,
            validationDisableOnProceed: true,
          },
          {
            type: "CurrencyInput",
            visible: true,
            label: "Sum Assured",
            path: "familyPpd.sumassured",
            validationId: 21,
            required: true,
            validationDisableOnProceed: true,
          },

          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 21,
            visible: true,
            label: "Add",
            variant: "outlined",
            spacing: 3,
            onClick: (x) => onNonLICPPD(x, "Family"),
          },

          {
            type: "DataGrid",
            visible: lDto.RiskItems[tab]?.FamilyNonLICPreviousPolicyDetails?.length > 0,
            spacing: 12,
            columns: [
              ...NonPPDColumns.filter((x) => x.headerName !== "Tabular Rate"),
              {
                field: "delete",
                headerName: "Delete",
                width: 70,
                renderCell: (p) => (
                  <IconButton
                    disabled={p.row.Agency === "LIC"}
                    onClick={() => {
                      const ppd = lDto.RiskItems[tab]?.FamilyNonLICPreviousPolicyDetails?.filter(
                        (x, i) => p.row.id !== i
                      );
                      lDto.RiskItems[tab].FamilyNonLICPreviousPolicyDetails = ppd;
                      setDto({ ...lDto });
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                ),
              },
            ],

            value: lDto.RiskItems[tab]?.FamilyNonLICPreviousPolicyDetails?.map((x, i) => ({
              ...x,
              id: i,
              sumassured: formatCurrency(x.sumassured),
            })),
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            rowId: "id",
            sx: gridStyle,
          },
        ],
        // 5 Family History
        [
          {
            type: "Button",
            visible: true,
            label: "Add Member",
            variant: "outlined",
            spacing: 12,
            startIcon: "family_restroom",
            justifyContent: "right",
            onClick: () => {
              lDto.RiskItems[tab].FamilyHistory.push({});
              setDto({ ...lDto });
            },
          },
          ...spreadFamilyHistory(),
        ],

        // 6 bank details
        [
          { type: "Typography", visible: true, label: "NEFT", spacing: 12, variant: "h5" },
          {
            type: "Input",
            visible: true,
            label: "IFS Code",
            path: `RiskItems.${tab}.BankDetails.IFSCode`,
            customOnBlur: (e, a, ef, et) => onIFSCCode(e, "", ef, et),
            customOnChange: (e) => onChangeIFSCode(e, "IFSCode"),
            required: true,
            onChangeFuncs: ["IsAlphaNum"],
            placeholder: "AAAA0000000",
            maxLength: 11,
          },
          {
            type: "Input",
            visible: true,
            label: "Account Number",
            path: `RiskItems.${tab}.BankDetails.AccountNo`,
            required: true,
            onChangeFuncs: ["IsNumeric"],
          },
          {
            type: "Input",
            visible: true,
            label: "Account Holder's Name",
            path: `RiskItems.${tab}.BankDetails.HolderName`,
            required: true,
            onChangeFuncs: ["IsAlphaSpace"],
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "Account Type",
            path: `RiskItems.${tab}.BankDetails.AccountType`,
            options: masters.BankAccoutType,
            required: true,
            customOnChange: (e, a) => onAccountType(a, "AccountType"),
          },
          {
            type: "Input",
            visible: true,
            label: "Bank Name",
            path: `RiskItems.${tab}.BankDetails.BankName`,
            disabled: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Bank Branch",
            path: `RiskItems.${tab}.BankDetails.Branch`,
            disabled: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Branch Address",
            path: `RiskItems.${tab}.BankDetails.BranchAddress`,
            disabled: true,
          },
          {
            type: "Typography",
            visible: dto.RiskItems[tab]?.IsNach === "Yes",
            label: "NACH",
            spacing: 12,
            variant: "h5",
          },

          {
            type: "RadioGroup",
            visible: dto.RiskItems[tab]?.IsNach === "Yes",
            path: `RiskItems.${tab}.BankDetails.NachSameAsNeft`,
            radioLabel: {
              labelVisible: true,
              label: "Is NACH Account same as NEFT?",
              fontSize: "1rem",
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            spacing: 12,
            required: true,
            customOnChange: onNachSameAsNeft,
          },

          ...[
            {
              type: "Input",
              label: "IFS Code",
              path: `RiskItems.${tab}.BankDetails.NachIFSCode`,
              customOnBlur: (e, a, ef, et) => onIFSCCode(e, "Nach", ef, et),
              customOnChange: (e) => onChangeIFSCode(e, "NachIFSCode"),
              required: true,
              onChangeFuncs: ["IsAlphaNum"],
              placeholder: "AAAA0000000",
              maxLength: 11,
            },
            {
              type: "Input",
              label: "Account Number",
              path: `RiskItems.${tab}.BankDetails.NachAccountNo`,
              required: true,
              onChangeFuncs: ["IsNumeric"],
            },
            {
              type: "Input",
              label: "Account Holder's Name",
              path: `RiskItems.${tab}.BankDetails.NachHolderName`,
              required: true,
              onChangeFuncs: ["IsAlphaSpace"],
            },
            {
              type: "AutoComplete",
              label: "Account Type",
              path: `RiskItems.${tab}.BankDetails.NachAccountType`,
              required: true,
              options: masters.BankAccoutType,
              customOnChange: (e, a) => onAccountType(a, "NachAccountType"),
            },
            {
              type: "Input",
              label: "Bank Name",
              path: `RiskItems.${tab}.BankDetails.NachBankName`,
              disabled: true,
            },
            {
              type: "Input",
              label: "Bank Branch",
              path: `RiskItems.${tab}.BankDetails.NachBranch`,
              disabled: true,
            },
            {
              type: "Input",
              label: "Branch Address",
              path: `RiskItems.${tab}.BankDetails.NachBranchAddress`,
              disabled: true,
            },
          ].map((x) => ({
            ...x,
            visible: dto.RiskItems[tab]?.IsNach === "Yes",
          })),
        ],
        // 7 Questions
        [
          {
            type: "Split",
            visible: true,
            split: [
              { md: 3, lg: 3, xl: 3, xxl: 3, splitId: 1 },
              { md: 9, lg: 9, xl: 9, xxl: 9, splitId: 2 },
            ],
            spacing: 12,
          },
          {
            type: "Tabs",
            value: subTypeTab,
            visible: true,
            orientation: "vertical",
            customOnChange: (e, newValue) => {
              setSubTypeTab(newValue);
              const lQuestionVisitFlag = QuestionVisitFlag;
              lQuestionVisitFlag[tab][newValue] = 1;
              setQuestionVisitFlag([...lQuestionVisitFlag]);
            },
            tabs: Object.keys(RiskQuestionControls)?.map((elem, index) => ({
              value: index,
              label: elem,
              icon: QuestionVisitFlag?.[tab]?.[index] === 1 ? "done" : "",
            })),

            spacing: 12,
            splitId: 1,
          },
          ...spreadRiskQuestionControls().map((QControls) => ({
            ...QControls,
            setQTab: setSubTypeTab,
          })),
        ],

        // 10 habits
        [
          {
            type: "Button",
            label: "Add Nominee",
            variant: "outlined",
            visible: true,
            startIcon: <Icon>add</Icon>,
            onClick: () => {
              setEditFlg(false);
              setNomineeFlg(true);
            },
            spacing: 12,
            justifyContent: "right",
            disabled:
              lDto.QuotationData?.[tab]?.NomineeDetails?.length >= 3 ||
              lDto.QuotationData?.[tab]?.AvailableNomineePercentage === 0,
          },
          {
            type: "DataGrid",
            visible: true,
            spacing: 12,
            rowId: "id",
            sx: gridStyle,
            columns: [
              { field: "NomineeName", headerName: "Nominee Name", width: 200 },
              { field: "NomineeRelationWithProposer", headerName: "Relationship", width: 200 },
              { field: "PercentageOfShare", headerName: "Share", width: 200 },
              // { field: "date", headerName: "Address", width: 200 },
              // { field: "remarks", headerName: "Pincode", width: 200 },

              {
                field: "action",
                headerName: "Action",
                width: 200,
                renderCell: (p) => (
                  <Stack direction="row" spacing={1}>
                    {/* <IconButton>
                    <Icon>visibility</Icon>
                  </IconButton> */}
                    <IconButton
                      onClick={() => onEditNominee(p.row)}
                      // disabled={lDto.QuotationData?.[tab]?.ProposalNo}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => deleteNominee(p.row.id)}
                      // disabled={lDto.QuotationData?.[tab]?.ProposalNo}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </Stack>
                ),
              },
            ],
            value: lDto.QuotationData?.[tab]?.NomineeDetails?.map((x, i) => ({ ...x, id: i })),
          },
        ],
        // 11 Family medical details
        [],
        // 12 Member History
        [],
        // 13 Ailment Details
        [],
        // 14 Document Detials

        [],
        [],
        [],
        [],
        [],
        [],

        [],

        [],
      ];
      // .map((x1) => x1.map((x2) => ({ ...x2, RiskItemsLength: dto?.RiskItems?.length })));
      break;
    case 2:
      data = [
        [
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setMasters({ ...masters, tab: newValue }),
            tabs: dto.QuotationData.map((elem, index) => ({
              value: index,
              label: elem.Product,
              inactiveColor: elem.ProposalNo ? "#00796b" : "rgba(105, 105, 116, 0.6)",
            })),
            spacing: dto.QuotationData.length * 2.4,
          },
        ],
        ...ProposalFormArr({ tab, dto, PPDColumns, NonPPDColumns, memberTab, setMemberTab }),
        [
          {
            type: "Tabs",
            value: memberTab,
            visible: true,
            customOnChange: (e, newValue) => setMemberTab(newValue),
            tabs: dto.QuotationData?.[tab]?.InsurableItem?.[0].RiskItems.map((elem, index) => ({
              value: index,
              label: elem.Name !== "" ? elem.Name : "Main Life",
            })),
            spacing: dto.QuotationData[tab]
              ? dto.QuotationData[tab].InsurableItem[0].RiskItems.length * 2.4
              : 12,
          },
          {
            type: "Split",
            visible: true,
            split: [
              { md: 3, lg: 3, xl: 3, xxl: 3, splitId: 1 },
              { md: 9, lg: 9, xl: 9, xxl: 9, splitId: 2 },
            ],
            spacing: 12,
          },
          {
            type: "Tabs",
            value: subTypeTab,
            visible: true,
            orientation: "vertical",
            customOnChange: (e, newValue) => setSubTypeTab(newValue),
            tabs: Object.keys(ProposalQuestionControls)?.map((elem, index) => ({
              value: index,
              label: elem,
            })),

            spacing: 12,
            splitId: 1,
          },
          ...spreadProposalQuestionControls(),
        ],
        [
          {
            type: "Typography",
            visible: false,
            label: `${dto.QuotationData?.[tab]?.AvailableNomineePercentage}% share is available`,
            color: "error",
            variant: "h5",
          },

          {
            type: "Button",
            label: "Add Nominee",
            variant: "outlined",
            visible: true,
            startIcon: <Icon>add</Icon>,
            onClick: () => {
              setEditFlg(false);
              setNomineeFlg(true);
            },
            spacing: 12,
            justifyContent: "right",
            disabled:
              lDto.QuotationData?.[tab]?.NomineeDetails?.length >= 3 ||
              // lDto.QuotationData?.[tab]?.ProposalNo ||
              lDto.QuotationData?.[tab]?.AvailableNomineePercentage === 0,
          },
          {
            type: "DataGrid",
            visible: true,
            spacing: 12,
            rowId: "id",
            sx: gridStyle,
            columns: [
              { field: "NomineeName", headerName: "Nominee Name", width: 200 },
              { field: "NomineeRelationWithProposer", headerName: "Relationship", width: 200 },
              { field: "NomineeAge", headerName: "Nominee Age", width: 200 },
              { field: "PercentageOfShare", headerName: "Share", width: 200 },
              {
                field: "Address",
                headerName: "Address",
                width: 500,
                renderCell: (p) =>
                  `${p.row.NomineeAddressLine1} ${p.row.NomineeAddressLine2} ${p.row.NomineeCity} ${p.row.NomineeState} ${p.row.NomineePincode}`,
              },
              // { field: "date", headerName: "Address", width: 200 },
              // { field: "remarks", headerName: "Pincode", width: 200 },

              {
                field: "action",
                headerName: "Action",
                width: 200,
                renderCell: (p) => (
                  <Stack direction="row" spacing={1}>
                    {/* <IconButton>
                      <Icon>visibility</Icon>
                    </IconButton> */}
                    <IconButton
                      onClick={() => onEditNominee(p.row)}
                      // disabled={lDto.QuotationData?.[tab]?.ProposalNo}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                    //  disabled={lDto.QuotationData?.[tab]?.ProposalNo}
                    >
                      <Icon onClick={() => deleteNominee(p.row.id)}>delete</Icon>
                    </IconButton>
                  </Stack>
                ),
              },
            ],
            value: lDto.QuotationData?.[tab]?.NomineeDetails?.map((x, i) => ({ ...x, id: i })),
          },
          {
            type: "Checkbox",
            spacing: 4,
            visible: lDto.QuotationData?.length > 1 && false,
            label: "Nominee same for all Proposals",
            path: `QuotationData.${tab}.IsNomineeSameForAll`,
            customOnChange: onNomineeSame,
            checkedVal: true,
            unCheckedVal: false,
            // return: (
            //   <FormControlLabel
            //     control={<Checkbox />}
            //     label="Nominee same for all Proposals"
            //     onChange={onNomineeSame}
            //   />
            // ),
          },
          {
            type: "Modal",
            visible: true,
            spacing: 12,
            open: nomineeFlg,
            return: (
              <NomineeDetailsModal
                dto={{
                  ...nomineeObj,
                }}
                setDto={setNomineeObj}
                setNomineeFlg={setNomineeFlg}
                onAddNominee={onAddNominee}
                EditFlg={EditFlg}
                onUpdateNominee={onUpdateNominee}
                closeNomineeModal={closeNomineeModal}
                AvailableNomineePercentage={dto?.QuotationData?.[tab]?.AvailableNomineePercentage}
                proposerAddress={dto.ProposerDetails.PermanentAddress}
                LifeNomineeRelation={masters.LifeNomineeRelation}
                LifeAppointeeRelation={masters.LifeAppointeeRelation}
                proposalJson={dto?.QuotationData?.[tab]}
              />
            ),
            sx: {
              top: "10%",
              left: matchesMd ? "15%" : "0%",
              width: matchesMd ? "70%" : "100%",
              height: "80%",
              overflowY: "scroll",
              bgcolor: ColorsSetting().secondary.focus,
            },
          },
        ],

        [
          { type: "Typography", visible: true, spacing: 12, sx: { mt: 2 } },
          {
            type: "Button",
            visible: true,
            spacing: 12,
            label: lDto.QuotationData?.[tab]?.proposalNumber ? "Update Proposal" : "Save Proposal",
            justifyContent: "center",
            onClick: onSaveProposal,
          },
          // {
          //   type: "GroupButton",
          //   visible: false,
          //   spacing: 12,
          //   justifyContent: "center",
          //   buttons: [
          //     {
          //       label: "Save Proposal",
          //       visible: true,
          //       onClick: onSaveProposal,
          //       startIcon: "save",
          //     },
          //     {
          //       label: "View Draft Proposal",
          //       visible: false,
          //       onClick: onViewDraftProposal,
          //       disabled: dto.QuotationData?.[tab]?.ProposalNo === undefined,
          //       startIcon: "download",
          //     },
          //   ],
          // },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "Button",
            spacing: 12,
            visible:
              window.location.origin === "https://esalesuat.licindia.in" ||
              process.env.NODE_ENV === "development",
            justifyContent: "right",
            variant: "outlined",
            label: "triggered Rules",
            onClick: () => setDrawerFlag(true),
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <Drawer
                sx={{
                  width: "80vw",
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: "80vw",
                    boxSizing: "border-box",
                  },
                }}
                anchor="left"
                open={DrawerFlag}
                onClose={() => setDrawerFlag(false)}
              >
                <MDBox>
                  <RulesForUAT dto={dto} setDrawerFlag={setDrawerFlag} />
                </MDBox>
              </Drawer>
            ),
          },
          {
            type: "Tabs",
            value: tab,
            visible: false,
            customOnChange: (e, newValue) => setMasters({ ...masters, tab: newValue }),
            tabs: dto.RiskItems.map((elem, index) => ({
              value: index,
              label: elem.Name !== "" ? elem.Name : "Main Life",
            })),
            spacing: dto.RiskItems.length * 2.4,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <DocumentList
                setOpen={setDocumentListFlag}
                open={DocumentListFlag}
                doc="Income/Investment Proof"
              />
            ),
          },
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            return: (
              <Popover
                open={open}
                onClick={() => {
                  setAnchorEl(null);
                  setImg("");
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
              >
                {img !== "" && (
                  <MDBox sx={{ border: "3px solid" }}>
                    <MDBox width="800px" height="500px" component="img" src={img} alt="" />
                  </MDBox>
                )}
              </Popover>
            ),
          },

          // ...Object.keys(dto.RiskItems?.[tab]?.DocumentList || {}).map((x1, i1) => ({
          //   type: "AutoComplete",
          //   label: x1,
          //   visible: true,
          //   path: `RiskItems.${tab}.DocumentDetails.${i1}.DocumentName`,
          //   options: dto.RiskItems?.[tab]?.DocumentList?.[x1]?.map((x2) => ({
          //     mValue: x2.DocumentName,
          //   })),
          //   // required: flowId === 2 || flowId === 3,
          // })),
          // { type: "Typography", spacing: 12, visible: true },
          // ...(Array.isArray(dto.RiskItems[tab]?.DocumentDetails)
          //   ? dto.RiskItems[tab].DocumentDetails.filter((x) => x.DocumentName).map((x, i) => ({
          //       type: "Custom",
          //       visible: true,
          //       spacing: 6.1,
          //       return: (
          //         <DocumentUploadCard
          //           details={x}
          //           index={i}
          //           handleFileUpload={handleFileUpload}
          //           handleDocFileDelete={handleDocFileDelete}
          //           generateFile={generateFile}
          //         />
          //       ),
          //     }))
          //   : []),
        ],

        ...dto.RiskItems.map((x3, i3) => [
          ...SpreadDoclist(x3.DocumentList, i3),

          { type: "Typography", spacing: 12, visible: true },
          ...x3.DocumentDetails.map((x4, i4) => ({
            type: "Custom",
            visible: true,
            spacing: 6,
            return: (
              <DocumentUploadCard
                details={x4}
                index={i4}
                handleFileUpload={(e) => handleFileUpload(e, i3, i4)}
                handleDocFileDelete={() => handleDocFileDelete(i3, i4)}
                generateFile={generateFile}
                getDocumentMonthYear={getDocumentMonthYear}
                setDocumentListFlag={setDocumentListFlag}
              />
            ),
          })),
        ]),
      ];
      break;

    case 4:
      data = [
        flowId === 1
          ? [
              {
                type: "Input",
                visible: true,
                label: "Agent Code",
                path: "ChannelDetails.agency_code",
                disabled: true,
              },
              {
                type: "Input",
                visible: true,
                label: "DO/CIIA Mentor Code",
                path: "ChannelDetails.dev_off_code",
                disabled: true,
              },
              {
                type: "Input",
                visible: true,
                label: "Branch Code",
                path: "ChannelDetails.ag_branch",
                disabled: true,
              },
              {
                type: "Input",
                visible: true,
                label: "Agent Name",
                path: "ChannelDetails.agent_name",
                disabled: true,
              },
              {
                type: "Input",
                visible: true,
                label: "Agent Mobile",
                path: "ChannelDetails.ag_mobileno",
                disabled: true,
              },
              {
                type: "Input",
                visible: true,
                label: "Agent Email",
                path: "ChannelDetails.ag_emailid",
                disabled: true,
              },
              { type: "Typography", visible: true, label: "", spacing: 12 },
              {
                type: "Tabs",
                value: tab,
                visible: true,
                customOnChange: (e, newValue) => setMasters({ ...masters, tab: newValue }),
                tabs: dto.RiskItems.map((elem, index) => ({
                  value: index,
                  label: elem.Name !== "" ? elem.Name : "Main Life",
                })),
                spacing: dto.RiskItems.length * 2.4,
              },
              ...spreadACRQuestionsControls(),
            ]
          : [
              ...Disclaimer({ dto }),

              {
                type: "Custom",
                visible: true,
                spacing: 12,
                splitId: 4,
                // accordionId: 4,
                return: (
                  <PremiumSummaryCard
                    QuotationData={dto.QuotationData}
                    DownloadFile={DownloadFile}
                    setDownProposalPDFModalFlag={() => setDownProposalPDFModalFlag(true)}
                    setActiveStep={() => setActiveStep(1)}
                    showDownloadAndEditButtons="true"
                    OTPVerifyStatus={lDto?.RiskItems}
                  />
                ),
                variant: "h6",
              },
              {
                type: "Checkbox",
                visible: true,
                spacing: 12,
                splitId: 4,
                // accordionId: 4,
                path: "ProposerDisclaimerConsent",
                enableAtEndorsement: true,
                checkedVal: true,
                unCheckedVal: false,
                label:
                  "I have fully understood the terms and conditions of the plan(s) propose to take and hereby",
              },
              {
                type: "Typography",
                visible: true,
                spacing: 12,
                splitId: 4,
                label:
                  "Please validate yourself through an OTP, Click Send OTP and Enter the recevied OTP to get verified and check the consent to Proceed",
                color: "error",
                variant: "h6",
              },

              {
                type: "Modal",
                visible: true,
                spacing: 12,
                open: downProposalPDFModalFlag,
                return: (
                  <DownloadProposalPDF
                    QuotationData={dto.QuotationData}
                    DownloadFile={DownloadFile}
                    closeModal={() => setDownProposalPDFModalFlag(false)}
                  />
                ),
                sx: {
                  top: "10%",
                  left: matchesMd ? "15%" : "0%",
                  width: matchesMd ? "70%" : "100%",
                  height: "80%",
                  overflowY: "scroll",
                  bgcolor: ColorsSetting().secondary.focus,
                },
              },
              // {
              //   type: "Button",
              //   visible: true,
              //   label: "Download Proposal",
              //   variant: "outlined",
              //   splitId: 4,
              //   spacing: 6,
              //   onClick: () => setDownProposalPDFModalFlag(true),
              // },

              // {
              //   type: "Button",
              //   visible: true,
              //   label: "Edit Proposal",
              //   variant: "outlined",
              //   splitId: 4,
              //   spacing: 6,
              //   onClick: () => setActiveStep(1),
              //   justifyContent: "right",
              // },

              ...SpreadLifeVerificationControls(),

              {
                type: "Typography",
                visible: false,
                spacing: 12,
                color: "success",
                sx: { fontSize: "1rem" },
                label: `Click On Resend OTP in  ${timer}`,
              },

              {
                type: "Button",
                visible: false,
                label: "Proceed",
                splitId: 4,
                spacing: 12,
                justifyContent: "center",
                onClick: onProceedDisclaimer,
              },
            ],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "Tabs",
            value: tab,
            visible: false,
            customOnChange: (e, newValue) => setMasters({ ...masters, tab: newValue }),
            tabs: dto.QuotationData?.map((elem, index) => ({
              value: index,
              label: elem.Product,
            })),
            spacing: dto.QuotationData.length * 2.4,
          },
          {
            type: "Custom",
            return: (
              <ProposalSummary
                QuotationData={dto.QuotationData[tab]}
                QuotationList={dto.QuotationData}
                dto={dto}
                setDto={setDto}
                flowId={flowId}
                setLoading={setLoading}
              />
            ),
            visible: true,
            spacing: 12,
          },
        ],
      ];
      break;
    case 6:
      data = [
        [
          {
            type: "RadioGroup",
            path: `MSP.MSPScheduleType`,
            radioLabel: {
              labelVisible: true,
              label: "How would you like to schedule your appointment",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Self", value: "Self" },
              { label: "Auto", value: "Auto" },
            ],
            spacing: 12,
            visible: true,
            // customOnChange: onMSPAllocation,
          },

          ...masters.MSPList.map((x) => ({
            type: "Custom",
            visible: dto.MSP.MSPScheduleType === "Self",
            return: <MSPCard onClick={() => onMSPClick(x)} data={x} value={dto.MSP} />,
          })),
          {
            type: "Typography",
            label: "Schedule Details",
            visible: dto.MSP.MSPScheduleType === "Self",
            spacing: 12,
          },

          {
            type: "MDDatePicker",
            label: "Appointment Date",
            path: "MSP.AppointmentDate",
            visible: dto.MSP.MSPScheduleType === "Self",
            minDate: new Date(),
          },
          {
            type: "MDTimePicker",
            label: "Appointment Time",
            path: "MSP.AppointmentTime",
            visible: dto.MSP.MSPScheduleType === "Self",
          },
          {
            type: "Button",
            visible: true,
            justifyContent: "right",
            label: "Schedule Appointment",
            spacing: 10,
            variant: "outlined",
            onClick: onScheduleAppointment,
          },
        ],
      ];
      break;

    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({
  activeStep,
  dto,
  setDto,
  masters,
  setMasters,
  flowId,
  navigate,
  QuestionVisitFlag,
}) => {
  let fun = true;
  const lDto = dto;
  const lMasters = masters;

  let PlanWiseFlag1 = false;
  dto.QuotationData.forEach((x) => {
    if (
      !checkForValue(x.PlanNumber) &&
      x.PlanNumber !== "858" &&
      x.PlanNumber !== "862" &&
      x.PlanNumber !== "867" &&
      x.PlanNumber !== "857"
    )
      PlanWiseFlag1 = true;
  });

  switch (activeStep) {
    case 0:
      dto.RiskItems.forEach((x, i) => {
        if (x.Age > 12) {
          if (
            x.KYCThrough === "nokyc" ||
            x.KYCThrough === "" ||
            x.KYCThrough === undefined ||
            x.KYCThrough === null ||
            (x.KYCThrough === "ckyc" && x.CKYCDeclaration !== "Yes") ||
            (x.KYCThrough === "ekyc" && x.EKYCDeclaration !== "Yes")
          )
            fun = false;
        } else if (
          (x.KYCThrough === "ekyc" && x.EKYCDeclaration !== "Yes") ||
          (x.KYCThrough === "ckyc" && x.CKYCDeclaration !== "Yes")
        )
          lDto.RiskItems[i].KYCThrough = "nokyc";
      });
      setDto({ ...lDto });

      if (fun === false) Swal.fire({ icon: "warning", text: "KYC is mandatory" });

      break;
    case 1:
      {
        if (QuestionVisitFlag)
          QuestionVisitFlag.forEach((x1, i1) => {
            x1.forEach((x2) => {
              if (x2 === 0) {
                Swal.fire({ icon: "warning", text: "Please visit all questionnare sets" });
                if (fun === true) setMasters({ ...masters, tab: i1 });
                fun = false;
              }
            });
          });

        let PremiumWaiverFlag = "No";
        let ProposerIsLifeAssured = "No";
        const TaxResidency = "No";
        let StateOfHealth = "Good";
        let TechTermFlag = "No";
        let minorStudy = "Yes";
        let lengthOfService = "Yes";
        let Educational = "Yes";
        let FemaleLifeHusbandNoPPD = "No";
        let PPDcheck = "Yes";
        let ProposerPPDcheck = "Yes";

        // Proposer
        // Proposer + Minor life
        // Proposer + Life to be Assured

        dto.QuotationData.forEach((x1) => {
          x1.InsurableItem[0].RiskItems.forEach((x2) => {
            if (x2.PremiumWaiver === "Yes") PremiumWaiverFlag = "Yes";
          });
        });

        dto.QuotationData.forEach((x1) => {
          x1.InsurableItem[0].RiskItems.forEach((x2) => {
            if (x2.Relation === "Self") ProposerIsLifeAssured = "Yes";
          });
          if (x1.PlanNumber === "954") {
            x1.InsurableItem[0].RiskItems.forEach((x2) => {
              if (
                x2.Gender === "Female" &&
                x2.Age > 18 &&
                (x2.Pregnant === "Yes" || (x2.DeliveryHistory === "Yes" && x2.DeliveryMonths <= 6))
              )
                TechTermFlag = "Yes";
              if (
                (x2.Occupation.SourceOfIncomeCode === "S1" ||
                  (x2.Occupation.PresentOccupationCode === "P5" &&
                    x2.Occupation.NatureOfDutyCode === "7")) &&
                x2.Occupation.Experience < 3
              )
                lengthOfService = "No";
              if (parseInt(x2.Occupation.EducationalQualificationCode, 10) <= 3) Educational = "No";
            });
          }
        });

        dto.RiskItems.forEach((x1) => {
          if (
            x1.Relation !== "Self" &&
            ((x1.NonLICPPDDeclaration === false && x1.NonLICPreviousPolicyDetails?.length === 0) ||
              (x1.LICPPDDeclaration === false && x1.PreviousPolicyDetails?.length === 0))
          ) {
            PPDcheck = "No";
          }
          if (
            x1.Relation === "Self" &&
            (PremiumWaiverFlag === "Yes" || dto.ProposerSameAsInsurable === "Yes") &&
            ((x1.NonLICPPDDeclaration === false && x1.NonLICPreviousPolicyDetails?.length === 0) ||
              (x1.LICPPDDeclaration === false && x1.PreviousPolicyDetails?.length === 0))
          ) {
            ProposerPPDcheck = "No";
          }
          if (Array.isArray(x1.Questionnare)) {
            const arr1 = x1.Questionnare.filter(
              (x2) => x2.QSubType === "State of Health" && x2.ControlType === "LabelAndDropDown"
            );
            if (x1.Relation === "Self") {
              if (ProposerIsLifeAssured === "Yes" || PremiumWaiverFlag === "Yes")
                if (arr1.length > 0 && arr1[0].Answer === "Not Good") StateOfHealth = "Not Good";
            } else if (arr1.length > 0 && arr1[0].Answer === "Not Good") StateOfHealth = "Not Good";
            //
          }
          // if (x1.Occupation.TaxResidency === "Yes") TaxResidency = "Yes";
          if (
            x1.Gender === "Female" &&
            x1.Occupation?.SourceOfIncomeCode === "H" &&
            !(
              x1.FamilyPreviousPolicyDetails?.length > 0 ||
              x1.FamilyNonLICPreviousPolicyDetails?.length > 0
            )
          ) {
            FemaleLifeHusbandNoPPD = "Yes";
          }
          if (x1.Age >= 5 && x1.Age <= 18 && x1.Occupation.IsChildStudying === "No")
            minorStudy = "No";
          // if (x1.Occupation.LengthOfServiceFlag === 1 && x1.Occupation.Experience < 3)
          //   lengthOfService = "No";
        });

        if (StateOfHealth === "Not Good") {
          Swal.fire({
            icon: "warning",
            text: "Cannot Proceed, as state of health is not good for Proposer/Life to be Assured",
          });
          fun = false;
        } else if (minorStudy === "No") {
          Swal.fire({
            icon: "warning",
            text: "Cannot Proceed, as minor is not studying!",
          });
          fun = false;
        } else if (lengthOfService === "No") {
          Swal.fire({
            icon: "warning",
            text: "Not eligible currently. Apply after the total service of 3 months",
          });
          fun = false;
        } else if (false && TaxResidency === "Yes") {
          Swal.fire({
            icon: "warning",
            text: "Cannot Proceed, because Tax residency is Outside India",
          });
          fun = false;
        } else if (TechTermFlag === "Yes") {
          Swal.fire({
            icon: "warning",
            text: "Cannot proceed. Pregnant or Delivery before 6 months",
          });
          fun = false;
        } else if (false && Educational === "No") {
          Swal.fire({
            icon: "warning",
            text: "Qualification should be more then SSC to proceed",
          });
          fun = false;
        } else if (PlanWiseFlag1 && FemaleLifeHusbandNoPPD === "Yes") {
          Swal.fire({
            icon: "warning",
            text: "Please add Previous Policies for Husband to proceed",
          });
          fun = false;
        } else if (PlanWiseFlag1 && PPDcheck === "No") {
          Swal.fire({
            icon: "warning",
            text: "Please Fill Previous Policy Details Section For Life to be Assured ",
          });
          fun = false;
        } else if (PlanWiseFlag1 && ProposerPPDcheck === "No") {
          Swal.fire({
            icon: "warning",
            text: "Please Fill Previous Policy Details Section For Proposer",
          });
          fun = false;
        } else {
          setMasters({ ...masters, tab: 0 });
        }

        // if(Array.isArray(dyndata[7]))
        // dyndata[7].forEach((x)=>{

        // })
        if (false) {
          dto.QuotationData.forEach((x, i) => {
            GenericApi(x.ProductCode, "SUCRating", x).then((y) => {
              if (y?.finalResult?.SUCTRSACalculation) lDto.QuotationData[i].SUC = y.finalResult;
              else
                lDto.QuotationData[i].SUC = {
                  "SUCTRSACalculation.G1SUCASASum": "0",
                  "SUCTRSACalculation.G2SUCASASum": "0",
                  "SUCTRSACalculation.TRSAASASum": "0",
                  "SUCTRSACalculation.SUCASASum": "0",
                  G1SUCASA: "0",
                  G2SUCASA: "0",
                  TRSAASA: "0",
                  SUCASA: "0",
                  SUCTRSACalculation: {
                    G1SUCASASum: 0,
                    G2SUCASASum: 0,
                    TRSAASASum: 0,
                    SUCASASum: 0,
                    output: [],
                  },
                };
              setDto({ ...lDto });
            });
          });
        }
      }

      break;
    case 2:
      {
        fun = true;
        let proposalProceed = false;
        dto.QuotationData.forEach((x) => {
          if (!x.ProposalNo) proposalProceed = true;
        });

        if (proposalProceed) {
          if (dto.QuotationData.length === 1)
            Swal.fire({ icon: "warning", text: "Please save proposal form before proceeding" });
          else
            Swal.fire({
              icon: "warning",
              text: "Please save all proposals form before proceeding",
            });
          fun = false;
        } else if (flowId !== 2 && lMasters.saveProposal === 1) {
          try {
            const res1 = await ExecuteProcedure("po.usp_GetLifeProposalCommonDetails", {
              OpportunityId: dto.opportunityId,
              Type: "ACR",
            });
            const res2 = await ExecuteProcedure("po.usp_GetLifeProposalCommonDetails", {
              OpportunityId: dto.opportunityId,
              Type: "SMHR",
              RunRules: "true",
            });

            if (res2.finalResult?.Category?.IsMHR === "Yes")
              SaveOpportunity({
                opportunityId: lDto.opportunityId,
                isAutoSave: true,
                AutoSave: {
                  PremiumDetails: {
                    TotalPremium: sumAll(
                      dto.QuotationData.map((x) => x.PremiumDetails["Total Premium"])
                    ),
                  },

                  currentDate: DateFormatFromDateObject(new Date(), "m-d-y"),
                  opportunityId: lDto.opportunityId,
                  RiskItems: lDto.RiskItems,
                  QuotationList: lDto.QuotationList,
                  ProposerSameAsInsurable: lDto.ProposerSameAsInsurable,
                  ChannelDetails: lDto.ChannelDetails,
                  ProposalList: lDto.ProposalList,
                  ProposerContactNo: lDto.ProposerDetails.ContactNo,
                  Category: res2.finalResult?.Category,
                  MHRAllocation: lDto.MHRAllocation,
                  workflowStage: "proposal",
                },
                ChannelDetails: lDto.ChannelDetails,
                Category: res2.finalResult?.Category,
                MHRAllocation: lDto.MHRAllocation,
                stageStatusId: 2,
              });

            lDto.MHRAllocation = res2.finalResult?.MHRAllocation;
            lDto.Category = res2.finalResult?.Category;
            lDto.isMHR = res2.finalResult?.Category?.IsMHR;

            lDto.QuotationData = lDto.QuotationData.map((x) => ({
              ...x,
              Category: res2.finalResult?.Category,
            }));

            lMasters.isMSP = res2.finalResult?.Category?.IsMedical === "Yes";
            if (Array.isArray(res2?.finalResult?.QuotationWiseDetails)) {
              res1?.finalResult?.QuotationWiseDetails.forEach((x1) => {
                lDto.QuotationData.forEach((x2, i2) => {
                  console.log("loop Entered");
                  if (x1.QuoteNo === x2.ProposalNo) {
                    console.log("loop 1");
                    x1.RiskItems.forEach((x3) => {
                      x2.InsurableItem[0].RiskItems.forEach((x4, i4) => {
                        if (x3.name === x4.Name) {
                          console.log("loop 2");

                          lDto.QuotationData[i2].InsurableItem[0].RiskItems[i4] = {
                            ...x4,
                            SUCDetails: x3.SUCDetails,
                          };
                        }
                      });
                    });
                  }
                  setDto({ ...lDto });
                });
                setDto({ ...lDto });
              });
            }

            if (Array.isArray(res1?.finalResult?.RiskItems))
              res1.finalResult.RiskItems.forEach((x1, i1) => {
                lDto.RiskItems.forEach((x2, i2) => {
                  if (
                    x1.Name?.toString().replace(" ", "").toLowerCase() ===
                    x2.Name?.toString().replace(" ", "").toLowerCase()
                  ) {
                    lDto.RiskItems[i2].ACR = flowId === 3 ? [] : x1.Questionnare;
                    if (typeof res2.finalResult?.RiskItems?.[i1]?.Category === "object")
                      lDto.RiskItems[i2].Category = {
                        ...res2.finalResult?.RiskItems?.[i1]?.Category,
                        MedicalReports: res2.finalResult?.RiskItems?.[i1]?.Category?.MedicalReports,
                        // ?.toString()
                        //   .replace("Video MER", "MER")
                        //   .replace("MER", "Video MER")
                        //   .replace("SBT-13", "SBT 13")
                        //   .replace(".", ""),
                      };
                    let docArray = res2.finalResult?.RiskItems?.[i1]?.DocumentDetails;
                    if (Array.isArray(docArray)) {
                      docArray = docArray.map((x4) => ({
                        ...x4,
                        localType: `${x4.DocumentType} ${x4.DocumentSubType}`,
                        SubdocumentCount:
                          x4.SubdocumentCount === "" ? 1 : parseInt(x4.SubdocumentCount, 10),
                      }));
                      lDto.RiskItems[i2].DocumentDetails = docArray.filter(
                        (x6) => parseInt(x6.IsMandatory, 10) === 1
                      );
                      const mandatorySet = docArray.filter(
                        (x6) => parseInt(x6.IsMandatory, 10) === 0
                      );

                      lDto.RiskItems[i2].DocumentList = mandatorySet.reduce((group1, product) => {
                        const group = group1;
                        const { localType } = product;
                        group[localType] = group[localType] ?? [];
                        group[localType].push(product);
                        return group;
                      }, {});

                      // Object.keys(lDto.RiskItems[i2].DocumentList).forEach((x6) => {});
                    } else lDto.RiskItems[i2].DocumentList = {};

                    // lDto.RiskItems[i2].DocumentDetails = Object.keys(
                    //   lDto.RiskItems[i2].DocumentList
                    // ).map((x4) => ({ DocumentType: x4 }));
                    setDto({ ...lDto });
                  }
                });
              });
            lMasters.saveProposal = 0;
            console.log("lllDto", lDto);

            setDto({ ...lDto });
            setMasters({ ...lMasters });
            lDto.QuotationData.forEach((x) => {
              UpdateProposalDetails(x);
            });
          } catch (e) {
            console.log("Exception at SMHR", e);
            fun = true;
          }
        }
      }
      break;
    case 3:
      try {
        let docFlag = true;
        const docIncomeProofFlags = [];
        let docSetName = "";
        let docMinSetCount = "";
        const docOtherIncomeProofFlags = [];

        let docIncPrfFinalFlag = true;
        let docOtherIncPrfFinalFlag = true;

        if (flowId === 2 || flowId === 3) {
          dto.RiskItems.forEach((x1, i1) => {
            docIncomeProofFlags.push([]);
            docOtherIncomeProofFlags.push([]);
            if (typeof x1.DocumentList === "object") {
              Object.keys(x1.DocumentList).forEach((x2) => {
                const selectFlag = [];
                let count = 0;
                let DocumentType = "";
                let SetMinCount = 0;
                x1.DocumentList[x2].forEach((x3, i3) => {
                  if (i3 === 0) {
                    count = parseInt(x3.SubdocumentCount, 10);
                    DocumentType = x3.DocumentType;
                    SetMinCount = checkForValue(x3.DocumentSubType)
                      ? 1
                      : parseInt(x3.SetMinCount, 10);
                  }
                  if (x3.isSelected === true) selectFlag.push(true);
                });
                docIncomeProofFlags[i1].push({
                  setUploaded: selectFlag.length >= count,
                  DocumentType,
                  SetMinCount,
                });
                // if (
                //   x2.includes("IncomeProof") &&
                //   x1.DocumentList?.[x2]?.[0]?.DocumentSubType !== ""
                // ) {
                //   const selectFlag = [];
                //   let count = 0;
                //   x1.DocumentList[x2].forEach((x3, i3) => {
                //     if (i3 === 0) count = parseInt(x3.SubdocumentCount, 10);
                //     if (x3.isSelected === true) selectFlag.push(true);
                //   });
                //   docIncomeProofFlags[i1].push(selectFlag.length >= count);
                // } else {
                //   const selectFlag = [];
                //   let count = 0;
                //   x1.DocumentList[x2].forEach((x3, i3) => {
                //     if (i3 === 0) count = parseInt(x3.SubdocumentCount, 10);
                //     if (x3.isSelected === true) selectFlag.push(true);
                //   });
                //   docOtherIncomeProofFlags[i1].push(selectFlag.length >= count);
                // }
              });
            }
          });
          console.log("docIncomeProofFlags1", docIncomeProofFlags);
          docIncomeProofFlags.forEach((x1) => {
            if (Array.isArray(x1)) {
              if (x1.length > 0) {
                const obj1 = x1.reduce((group1, product) => {
                  const group = group1;
                  const { DocumentType } = product;
                  group[DocumentType] = group[DocumentType] ?? [];
                  group[DocumentType].push(product);
                  return group;
                }, {});
                console.log("docIncomeProofFlags2", obj1);

                Object.keys(obj1).forEach((x2) => {
                  if (
                    obj1[x2].filter((x3) => x3.setUploaded === true).length <
                    obj1[x2][0].SetMinCount
                  ) {
                    docSetName = obj1[x2][0].DocumentType;
                    docMinSetCount = obj1[x2][0].SetMinCount;
                    docIncPrfFinalFlag = false;
                  }
                });
              }

              // if (x1.length > 0 && x1.filter((x2) => x2 === true).length === 0)
            }
          });
          if (false)
            docOtherIncomeProofFlags.forEach((x1) => {
              if (Array.isArray(x1)) {
                if (x1.length > 0 && x1.filter((x2) => x2 === false).length !== 0)
                  docOtherIncPrfFinalFlag = false;
              }
            });

          dto.RiskItems.forEach((x1) => {
            if (Array.isArray(x1.DocumentDetails))
              x1.DocumentDetails.forEach((x2) => {
                if (x2.fileName === "" || x2.fileName === null || x2.fileName === undefined)
                  docFlag = false;
              });
          });
        }

        if (docIncPrfFinalFlag === false) {
          Swal.fire({
            icon: "info",
            text: `Please select ${docMinSetCount} ${docSetName} set documents and upload`,
          });
          fun = false;
        } else if (docOtherIncPrfFinalFlag === false) {
          Swal.fire({
            icon: "info",
            text: "Please select documents and upload",
          });
          fun = false;
        } else if (docFlag === false) {
          fun = false;
          Swal.fire({ icon: "warning", text: "Please upload all mandatory documents" });
        } else {
          dto.QuotationData.forEach((x) => {
            UpdateProposalDetails(x);
          });
          fun = true;
        }
      } catch (e) {
        console.log("document Exception", e);
        fun = false;
      }
      // fun = true;

      break;
    case 9:
      try {
        dto.QuotationData.forEach((x) => {
          UpdateProposalDetails(x);
        });
        if (flowId === 2 || flowId === 3) {
          navigate(`/LifeCustomerPayment?OpportunityId=${dto.opportunityId}`);
        }
        fun = true;
      } catch {
        //
      }
      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep, flowId, dto }) => {
  let btnDetails = {};

  let proposalProceed = true;
  dto.QuotationData.forEach((x) => {
    if (!x.ProposalNo) proposalProceed = false;
  });

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true, customOnNext: true },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed",
          visible: proposalProceed || process.env.NODE_ENV === "development",
          loader: "backDrop1",
        },
      };
      break;
    case 4:
      btnDetails = {
        prev: {
          label: "Previous",
          visible: flowId === 1 || process.env.NODE_ENV === "development",
        },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: flowId === 1 },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: process.env.NODE_ENV === "development" },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async ({ setDto, selectedId, setLoading, navigate }) => {
  // const dto = getPolicyDto();
  const defaultValues = {
    Tax_CountryDetails: [],
    TaxDeclaration: "",
    Tax_26: "no",
    Tax_23: "no",
    Tax_25: "no",
    Tax_28: "no",
    Tax_22: "no",
    Tax_20: "no",
    Tax_19: "no",
    Civil_8: "no",
    Civil_23: "no",
    Civil_28: "no",
    Civil_30: "no",
    Civil_32: "no",
    Civil_33: "no",
    Civil_36: "no",
    Civil_37: "no",
    Civil_39: "no",
    Civil_41: "no",
    Civil_42: "no",
    Civil_43: "no",
    Civil_45: "no",
    Civil_47: "no",
    Civil_48: "no",
    Mining_7: "no",
    Mining_11: "no",
    OilNatural_7: "no",
    OilNatural_8: "no",
    OilNatural_9: "no",
    OilNatural_11: "no",
    OilNatural_12: "no",
    Sewage_6: "yes",
    Sewage_7: "yes",
    Army_7: "no",
    Army_9: "no",
    Army_11: "no",
    Army_13: "no",
    Army_15: "no",
    Army_17: "no",
    Army_19: "no",
    Army_21: "no",
    Navy_2: "no",
    Navy_4: "no",
    Navy_6: "no",
    Navy_8: "no",
    Navy_10: "no",
    Navy_11: "no",
    Navy_12: "no",
    Navy_13: "no",
    Navy_16: "no",
    Navy_18: "no",
    Navy_20: "no",
    Manufacture_6: "no",
    Manufacture_7: "no",
    Manufacture_8: "no",
    Manufacture_9: "no",
    PFQ_PersonalEarnings: [
      {
        id: 0,
        Particulars: "Salary(including bonuses) or package",
        Year1: "",
        Year2: "",
        Year3: "",
      },
      { id: 1, Particulars: "Income from House Property", Year1: "", Year2: "", Year3: "" },
      { id: 2, Particulars: "Income from Business", Year1: "", Year2: "", Year3: "" },
      { id: 3, Particulars: "Income/Commission from Profession", Year1: "", Year2: "", Year3: "" },
      {
        id: 4,
        Particulars: "Share of Profit from Partnership Firms",
        Year1: "",
        Year2: "",
        Year3: "",
      },
      { id: 5, Particulars: "Dividends", Year1: "", Year2: "", Year3: "" },
      { id: 6, Particulars: "Interest from Tax Free Bonds", Year1: "", Year2: "", Year3: "" },
      { id: 7, Particulars: "Income from Export Firms", Year1: "", Year2: "", Year3: "" },
      { id: 8, Particulars: "Agricultural Income", Year1: "", Year2: "", Year3: "" },
      { id: 9, Particulars: "Other Income(Please give details)", Year1: "", Year2: "", Year3: "" },
    ],

    PFQ_Turnover: [
      {
        id: 0,
        Year: "",
        Turnover: "",
        GrossProfit: "",
        NetProfit: "",
      },
      {
        id: 1,
        Year: "",
        Turnover: "",
        GrossProfit: "",
        NetProfit: "",
      },
      {
        id: 2,
        Year: "",
        Turnover: "",
        GrossProfit: "",
        NetProfit: "",
      },
      {
        id: 3,
        Year: "Projected figures for next Financial year",
        Turnover: "",
        GrossProfit: "",
        NetProfit: "",
      },
    ],
    PFQ_AssetsLiabilities: [
      {
        id: 0,
        Assets: "House/Apartment",
        AssetsValue: "",
        Liabilities: "Outstanding personal loans",
        LiabilityValue: "",
      },
      {
        id: 1,
        Assets: "Land/Real Estate",
        AssetsValue: "",
        Liabilities: "Mortgages on property",
        LiabilityValue: "",
      },
      {
        id: 2,
        Assets: "Bank Deposits(Fixed)",
        AssetsValue: "",
        Liabilities: "Other liabilities(Please Give details)",
        LiabilityValue: "",
      },
      {
        id: 3,
        Assets: "Bank Deposits(Savings)",
        AssetsValue: "",
        Liabilities: "",
        LiabilityValue: "",
      },
      {
        id: 4,
        Assets: "Shares, Bonds(including RBI and Other Tax Free Bonds)",
        AssetsValue: "",
        Liabilities: "",
        LiabilityValue: "",
      },
      { id: 5, Assets: "Mutual Funds", AssetsValue: "", Liabilities: "", LiabilityValue: "" },
      {
        id: 6,
        Assets: "Post Office Savings (NSC,Indira/Kisan Vikas Patra,etc.)",
        AssetsValue: "",
        Liabilities: "",
        LiabilityValue: "",
      },
      { id: 7, Assets: "Vehicles", AssetsValue: "", Liabilities: "", LiabilityValue: "" },
      {
        id: 8,
        Assets: "Other(Please give details)",
        AssetsValue: "",
        Liabilities: "",
        LiabilityValue: "",
      },
    ],
  };
  const mst = {
    tab: 0,
    contactType: [],
    Salutation: [],
    Gender: [],
    MaritalStatus: [],
    Currency: [],
    Country: [],
    State: [],
    District: [],
    City: [],
    Pincode: [],
    StateOfHealth: [],
    CauseOfDeath: [],
    BankAccoutType: [],
    LifeFamilyRelationship: [],

    // Product Details masters
    DrawDownPeriod: [],
    PreferredMode: [],
    PolicyTerm: [],
    Plan: [],
    Product: [],
    BenefitOption: [],
    relation: [
      { mID: 1, mValue: "Self" },
      { mID: 2, mValue: "Spouse" },
      { mID: 3, mValue: "Child" },
    ],
    questions: [],
    memberPanAadhaarIndex: ["PAN", "PAN", "PAN", "PAN", "PAN", "PAN"],
    CKYCDeclaration: "No",
    MSPList: [],
    Occupation: [],
    SourceOfIncome: [[], [], [], [], []],
    EducationalQualification: [[], [], [], [], []],
    NatureOfDuty: [[], [], [], [], []],
    IFSCMasters: [],
    PreviousPolicyInsurer: [],
    saveProposal: 0,
  };

  const commonDetails = await GetOpportunity(selectedId);
  if (commonDetails.AdditionalDetailsJson?.AutoSave?.workflowStage === "proposal") {
    setDto({
      opportunityId: selectedId,
      OpportunityNumber: commonDetails.OpportunityNumber,
      ProposerDisclaimerConsent: true,
      ProposerDetails: commonDetails.AdditionalDetailsJson.AutoSave.RiskItems.filter(
        (x) => x.Relation === "Self"
      )[0],
      // ProposerSameAsInsurable: commonDetails.AdditionalDetailsJson.AutoSave.ProposerSameAsInsurable,
      // QuotationList: commonDetails.AdditionalDetailsJson.AutoSave.QuotationList,
      // ProposalList: commonDetails.AdditionalDetailsJson.AutoSave.ProposalList,
      QuotationData: [],
      isMSP: false,
      // ChannelDetails: commonDetails.AdditionalDetailsJson.AutoSave.ChannelDetails,
      // RiskItems: commonDetails.AdditionalDetailsJson.AutoSave.RiskItems,
      MSP: {
        ProposerName: "",
        ProposerPincode: "",
        ProposalNo: "800001",
        AgentBranchCode: "V089",
        ProposerContact: "",
        ProposerEmail: "",
        DCCode: "",
        AllocationType: "",
        MSPName: "",
        TestsToPerform: "",
        Address: "", //  { Address1: "", Address2: "", City: "", State: "", Pincode: "" },
        SpoCName: "",
        SpoCMobileNo: "",
        ScheduleType: "",
        AppointmentDate: "",
        AppointmentTime: "",
        dccode: "",
      },
      ACR: {},
      ppd: {},
      familyPpd: {},
      OTP: {},
      Payment: {
        PaymentMode: "",
        BOCDetails: [{ BOCNumber: "", BOCDate: "", DevCode: "", Branch: "" }],
      },
      ...commonDetails.AdditionalDetailsJson.AutoSave,
    });
  } else if (commonDetails.AdditionalDetailsJson?.AutoSave?.workflowStage === "payment") {
    navigate(`/LifeCustomerPayment?OpportunityId=${selectedId}`);
  } else if (commonDetails.AdditionalDetailsJson?.AutoSave?.workflowStage === "postPayment") {
    navigate(`/LifePostPayment?OpportunityId=${selectedId}`);
  } else {
    setLoading(true);
    const res1 = await ExecuteProcedure("po.usp_GetLifeProposalCommonDetails", {
      OpportunityId: selectedId,
    });
    setLoading(false);
    // const res2 = await ExecuteProcedure("po.usp_GetLifeProposalCommonDetails", {
    //   OpportunityId: selectedId,
    //   Type: "ACR",
    // });

    let ProposerDetails = {};
    let ChannelDetails = {};
    if (res1.finalResult !== undefined && res1.finalResult.QuotationList !== undefined) {
      const res3 = await GetQuoteDetails(res1.finalResult.QuotationList[0]);
      ProposerDetails = res3.quotationDetail?.QuotationDetails?.ProposerDetails;
      ChannelDetails = res3.quotationDetail?.QuotationDetails?.ChannelDetails;
    }

    if (Array.isArray(res1.finalResult?.RiskItems)) {
      const RiskArr2 = res1.finalResult.RiskItems;
      let RiskArr1 = [];
      try {
        RiskArr1.push({
          ...RiskArr2.filter((x) => x.Relation === "Self")[0],
          CountryOfResidency: ProposerDetails?.CountryOfResidency,
          CountryOfResidencyGroup: ProposerDetails?.CountryOfResidencyGroup,
        });
      } catch {
        //
      }
      RiskArr2.forEach((x) => {
        if (x.Relation !== "Self") RiskArr1.push(x);
      });

      // let RiskArr2 = res2.finalResult.RiskItems;
      const SelfItem = RiskArr1.filter((x) => x.Relation === "Self");
      if (SelfItem.length === 0) {
        // Proposer diff from Insurer
        RiskArr1 = [
          {
            Relation: "Self",
            DocumentDetails: [],
            Questionnare: [],
            ACR: [],
            ...ProposerDetails,
            CountryOfResidency: ProposerDetails?.CountryOfResidency,
            CountryOfResidencyGroup: ProposerDetails?.CountryOfResidencyGroup,
          },
          ...RiskArr1,
        ];
        // RiskArr2 = [
        //   {
        //     Relation: "Self",
        //     DocumentDetails: [],
        //     Questionnare: [],
        //     ACR: [],
        //     ...ProposerDetails,
        //   },
        //   ...RiskArr2,
        // ];
      }

      RiskArr1.forEach((x, i) => {
        if (x.Relation === "Self") {
          RiskArr1[i] = { ...x, ...ProposerDetails };
        }
      });

      let arr1 = Array.isArray(RiskArr1)
        ? RiskArr1.map((x) =>
            OrderingArrayElementsByIds(x.Questionnare.filter((y) => Object.keys(y).length > 0))
          )
        : [];
      // let arr2 = Array.isArray(RiskArr2)
      //   ? RiskArr2.map((x) => OrderingArrayElementsByIds(x.Questionnare))
      //   : [];
      arr1 = arr1.map((x1) => x1.map((x2) => ({ ...x2, Answer: x2.DefaultValue })));
      // arr2 = arr2.map((x1) => x1.map((x2) => ({ ...x2, Answer: x2.DefaultValue })));

      // console.log("test12", ParentChildNodeOrder(arr1));

      // const getParentQuestion = (childData, i1) => {
      //   // console.log("test called", childData);
      //   let visibleDetails = { path: "", value: "" };
      //   arr1[i1].forEach((x2, i2) => {
      //     if (x2.QId === childData.QParentId) {
      //       // console.log("Test34", childData, x2);
      //       visibleDetails = {
      //         path: `RiskItems.${i1}.Questionnare.${i2}.Answer`,
      //         value: childData.OnChangeVal,
      //       };
      //     }
      //   });
      //   return visibleDetails;
      // };

      arr1.forEach((x1, i1) => {
        const getRenderQuestion = (x, i2) => {
          const arr = [];

          if (x.ControlType === "Radio")
            arr1[i1][i2].Answer = x.DefaultValue ? x.DefaultValue.toLowerCase() : "";
          else if (x.ControlType === "GridView") arr1[i1][i2].Answer = [{}, {}, {}, {}, {}];
          else arr1[i1][i2].Answer = x.DefaultValue ? x.DefaultValue : "";
          if (x.DetailsLabel) arr1[i1][i2][x.DetailsLabel] = "";
          return arr;
        };

        x1.reduce((group1, product, index) => {
          const group = group1;
          const { QSubType } = product;
          group[QSubType] = group[QSubType] ?? [];
          group[QSubType] = [...group[QSubType], ...getRenderQuestion(product, index)];
          return group;
        }, {});
      });

      // let RiskArr = res1.finalResult.RiskItems.map((x, i) => ({
      //   ...riskObject,
      //   ...x,
      //   Questionnare: arr1[i],
      // }));

      // const SelfItem = RiskArr.filter((x) => x.Relation === "Self");
      // if (SelfItem.length === 0) {
      //   // Proposer diff from Insurer
      //   RiskArr = [
      //     {
      //       ...riskObject,
      //       Relation: "Self",
      //       DocumentDetails: [],
      //       Questionnare: [],
      //       ...ProposerDetails,
      //     },
      //     ...RiskArr,
      //   ];
      // }

      let ProposalList = {};
      res1.finalResult.QuotationList.forEach((x) => {
        ProposalList = { ...ProposalList, [x]: [] };
      });
      const GenderMaster = {
        Male: "Male",
        Minor_Male: "Male",
        Female: "Female",
        Minor_Female: "Female",
        "Third Gender": "Third Gender",
        "Minor_Third Gender": "Third Gender",
      };

      setDto({
        opportunityId: selectedId,
        OpportunityNumber: commonDetails.OpportunityNumber,
        ProposerDisclaimerConsent: true,
        ProposerDetails,
        ProposerSameAsInsurable: SelfItem.length === 0 ? "No" : "Yes",
        QuotationList: res1.finalResult.QuotationList,
        ProposalList,
        QuotationData: [],
        isMSP: false,
        ChannelDetails,
        MHRAllocation: {},
        RiskItems: RiskArr1.map((x, i) => ({
          KYCThrough: x.Age <= 12 ? "nokyc" : "ckyc",
          CKYCThrough: "",
          CKYCDeclaration: "",
          isGSTIN: "No",
          GSTIN: "",
          CKYCDetails: {},
          SuitabiltyAnalysis: {},
          Pregnant: "No",
          DeliveryHistory: "No",
          Gynecologist: "No",
          Abortion: "No",
          NameAtQuotation: x.Name,

          Occupation: {
            EducationalQualification: "",
            EducationalQualificationCode: "",
            PresentOccupation: "",
            PresentOccupationCode: "",
            SourceOfIncome: "",
            SourceOfIncomeCode: "",
            NatureOfDuty: "",
            NatureOfDutyCode: "",
            EmployerName: "",
            Experience: "",
            AnnualIncome1: "",
            AnnualIncome2: "",
            AnnualIncome3: "",
            ITAssessess: "",
            Questionnare: [],
            ActiveAgent: "No",
            Annuxure: { ...defaultValues },
            TaxResidency: "No",
          },

          CommunicationAddress: {
            AddressLine1: "",
            AddressLine2: "",
            AddressLine3: "",
            Country: "",
            State: "",
            District: "",
            City: "",
            Pincode: "",
          },
          sameComAddress: "",
          PermanentAddress: {
            AddressLine1: "",
            AddressLine2: "",
            AddressLine3: "",
            Country: "",
            State: "",
            District: "",
            City: "",
            Pincode: "",
          },
          ForeignAddress: {
            OCI: "No",
            AddressLine1: "",
            AddressLine2: "",
            AddressLine3: "",
            City: "",
            District: "",
            State: "",
            Country: "",
            Pincode: "",
          },

          PreviousPolicyDetails: [],
          NonLICPreviousPolicyDetails: [],
          NonLICPreviousPolicyExist: "No",
          FamilyPreviousPolicyDetails: [],
          FamilyNonLICPreviousPolicyDetails: [],
          NonLICPPDDeclaration: false,
          LICPPDDeclaration: false,
          FamilyHistory: [{ Relation: "Father" }, { Relation: "Mother" }],
          BankDetails: {
            IFSCode: "",
            AccountNo: "",
            AccountType: "Savings",
            AccountTypeId: "1",
            HolderName: "",
            BankName: "",
            Branch: "",
            BranchAddress: "",
            NachSameAsNeft: "No",
            NachIFSCode: "",
            NachAccountNo: "",
            NachAccountType: "Savings",
            NachAccountTypeId: "1",
            NachHolderName: "",
            NachBankName: "",
            NachBranch: "",
            NachBranchAddress: "",
            NachBankType: "eNach", // nach // eNach
          },

          ...x,
          MobileNo: x.ContactNo,
          Gender: GenderMaster[x.Gender],
          DocumentList: {},
          DocumentDetails: [],

          Questionnare: arr1[i],
          // ACR: arr2[i],
          ACR: [],
          Category: {},
        })),
        MSP: {
          ProposerName: "",
          ProposerPincode: "",
          ProposalNo: "800001",
          AgentBranchCode: "V089",
          ProposerContact: "",
          ProposerEmail: "",
          DCCode: "",
          AllocationType: "",
          MSPName: "",
          TestsToPerform: "",
          Address: "", //  { Address1: "", Address2: "", City: "", State: "", Pincode: "" },
          SpoCName: "",
          SpoCMobileNo: "",
          ScheduleType: "",
          AppointmentDate: "",
          AppointmentTime: "",
          dccode: "",
        },
        ACR: {},
        Payment: {
          PaymentMode: "",
          BOCDetails: [{ BOCNumber: "", BOCDate: "", DevCode: "", Branch: "" }],
        },
        ppd: {},

        familyPpd: {},
        OTP: {},
      });
    }
  }
  return mst;
};

const getProposalStepper = {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
};

export default getProposalStepper;
