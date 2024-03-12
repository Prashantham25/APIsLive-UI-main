import swal from "sweetalert";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Stack, TableRow, Table } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

// import { isValid, addMonths } from "date-fns";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { GetProposalByNumber } from "../../../BLUS/data/index";
// import { endOfYear } from "date-fns";
// import { useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";
import { PolicyJson, riskItems, AgeCalculator1, risk } from "./data/Json/CyberInsurance";
import { Quotations } from "../../data/Apis";
import {
  GetProdPartnermasterData,
  callSaveQuoteMethod,
  callUpdateQuoteMethod,
  calculateProposal,
  fetchPaymentURL,
  downloadQuote,
  NSTPPincodeData,
  SendSMS,
  getQuoteSummary,
  // SKproposerEamil,
} from "./data/APIs/USGIWCApi";
import { addDays } from "../../../../../../Common/Validations";
import { formatDateKYC, formatPolDate } from "./data/Json/USGIWCJson";
// import MDInput from "../../../../../../components/MDInput";
import MDButton from "../../../../../../components/MDButton";
import Payment from "./components/Payment";
import CyberQuote from "./components/CyberQuote";
import ProposalDetails from "./components/ProposalDetails";

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

// let topNavigate = null;

const getProcessSteps = () => {
  const steps = [
    "Quick Quote",
    "Full Quote",
    "Proposer Details",
    "Payment Details",
    "Policy Details",
  ];
  return steps;
};

const getPageContent = ({ dto, activeStep }) => {
  let steps = [];

  const spreedInsurersComponents = () => {
    const arr = [];
    dto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push({ name: `Insured Member ${i + 1}`, visible: true });
    });
    return arr;
  };
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Quote Generation", visible: true, defaultExpanded: true },
        { name: "Proposer Details", visible: true, defaultExpanded: true },
        { name: "Policy Details", visible: true, defaultExpanded: true },
        { name: "Cover Details", visible: true, defaultExpanded: true },
      ];
      break;
    case 1:
      steps = [
        { name: "Additional Information", visible: true, defaultExpanded: true },
        ...spreedInsurersComponents(),
      ];
      break;
    case 2:
      steps = [
        { name: "", visible: true, defaultExpanded: true },
        { name: "Proposer Details", visible: true, defaultExpanded: true },
        { name: "CKYC/Permanent Address", visible: true, defaultExpanded: true },
        { name: "Communication Address", visible: true, defaultExpanded: true },
        { name: "", visible: false, defaultExpanded: true },
        { name: "", visible: false, defaultExpanded: true },
        { name: "Document Details", visible: true, defaultExpanded: true },
        { name: "Proposal Consent", visible: true, defaultExpanded: true },
      ];
      break;
    case 3:
      steps = [{ name: "", visible: true }];
      break;
    case 4:
      steps = [{ name: "", visible: true }];
      break;
    // case 4:
    //   steps = [
    //     { name: "e1", visible: true },
    //     { name: "e2", visible: true },
    //     { name: "e3", visible: true },
    //   ];
    //   break;

    default:
      steps = [];
      break;
  }
  return steps;
};

const getSectionContent = ({ setDto, dto, activeStep, masters, setMasters, setBackDropFlag }) => {
  let data = [];
  const lDto = dto;
  const lMasters = masters;
  // let lActiveStep = activeStep;
  const { search } = useLocation();
  // const quoteNo = "USCR202312170001261";
  const quoteNo = new URLSearchParams(search).get("quotationno");
  const proposalNoo = new URLSearchParams(search).get("proposernum");
  // const proposalNoo = "USCR202402040111139Proposal";
  // lActiveStep = proposalNoo !== null ? 2 : 0;
  useEffect(async () => {
    if (quoteNo !== null) {
      await getQuoteSummary(quoteNo).then((result) => {
        console.log("response", result);
        const chaneldata = result.data.quotation.channel;
        const chanelparsedata = JSON.parse(chaneldata);
        console.log("chanelparse", chanelparsedata);
        const quotationDetailsDTO = result.data.quotation.quotationDetailsDTO[0].quotationDetails;
        const quotationDetailsDTOparse = JSON.parse(quotationDetailsDTO);
        lMasters.flags.CalPreBtn = true;
        lMasters.Dateflag = true;
        lMasters.Quotes[masters.flags.activeTab].Theft =
          quotationDetailsDTOparse.InsurableItem[0].Covers[5].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].TheftSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[5].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Indentity =
          quotationDetailsDTOparse.InsurableItem[0].Covers[4].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].IndentitySumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[4].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Data =
          quotationDetailsDTOparse.InsurableItem[0].Covers[3].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].DataSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[3].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Cyber =
          quotationDetailsDTOparse.InsurableItem[0].Covers[1].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].CyberSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[1].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].CyberEx =
          quotationDetailsDTOparse.InsurableItem[0].Covers[0].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].CyberExSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[0].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Online =
          quotationDetailsDTOparse.InsurableItem[0].Covers[2].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].OnlineSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[2].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].OnlineSales =
          quotationDetailsDTOparse.InsurableItem[0].Covers[6].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].OnlineSaleSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[6].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Social =
          quotationDetailsDTOparse.InsurableItem[0].Covers[11].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].SocialSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[11].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Network =
          quotationDetailsDTOparse.InsurableItem[0].Covers[10].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].NetworkSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[10].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Privacy =
          quotationDetailsDTOparse.InsurableItem[0].Covers[8].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].PrivacySumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[8].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].PrivacyThird =
          quotationDetailsDTOparse.InsurableItem[0].Covers[7].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].PrivacyThirdSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[7].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Smart =
          quotationDetailsDTOparse.InsurableItem[0].Covers[9].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].SmartSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[9].SumInsured;
        lMasters.Quotes[masters.flags.activeTab]["Theft of Funds"] =
          quotationDetailsDTOparse.PremiumDetails["Theft of Funds"];
        lMasters.Quotes[masters.flags.activeTab]["Indentity Theft"] =
          quotationDetailsDTOparse.PremiumDetails["Indentity Theft"];
        lMasters.Quotes[masters.flags.activeTab]["Data Restoration"] =
          quotationDetailsDTOparse.PremiumDetails["Data Restoration"];
        lMasters.Quotes[masters.flags.activeTab]["Cyber Bullying"] =
          quotationDetailsDTOparse.PremiumDetails["Cyber Bullying"];
        lMasters.Quotes[masters.flags.activeTab]["Cyber Extortion"] =
          quotationDetailsDTOparse.PremiumDetails["Cyber Extortion"];
        lMasters.Quotes[masters.flags.activeTab]["Online Shopping"] =
          quotationDetailsDTOparse.PremiumDetails["Online Shopping"];
        lMasters.Quotes[masters.flags.activeTab]["Online Sales"] =
          quotationDetailsDTOparse.PremiumDetails["Online Sales"];
        lMasters.Quotes[masters.flags.activeTab]["Social Media"] =
          quotationDetailsDTOparse.PremiumDetails["Social Media"];
        lMasters.Quotes[masters.flags.activeTab]["Network Security"] =
          quotationDetailsDTOparse.PremiumDetails["Network Security"];
        lMasters.Quotes[masters.flags.activeTab]["Privacy Breach"] =
          quotationDetailsDTOparse.PremiumDetails["Privacy Breach"];
        lMasters.Quotes[masters.flags.activeTab]["Privacy Third"] =
          quotationDetailsDTOparse.PremiumDetails["Privacy Third"];
        lMasters.Quotes[masters.flags.activeTab]["Smart Home"] =
          quotationDetailsDTOparse.PremiumDetails["Smart Home"];
        lMasters.Quotes[masters.flags.activeTab]["Total Premium"] =
          quotationDetailsDTOparse.PremiumDetails["Net Premium"];
        lMasters.Quotes[masters.flags.activeTab].Discount =
          quotationDetailsDTOparse.PremiumDetails.Discount;
        lMasters.Quotes[masters.flags.activeTab]["Premium After Discount"] =
          quotationDetailsDTOparse.PremiumDetails["Premium After Discount"];
        lMasters.Quotes[masters.flags.activeTab]["Premium After Deductibles"] =
          quotationDetailsDTOparse.PremiumDetails["Premium After Deductibles"];
        lMasters.Quotes[masters.flags.activeTab].GST = quotationDetailsDTOparse.PremiumDetails.GST;
        lMasters.Quotes[masters.flags.activeTab]["Final Premium"] =
          quotationDetailsDTOparse.PremiumDetails["Total with Tax"];
        lMasters.Quotes[masters.flags.activeTab].Deductible = quotationDetailsDTOparse.Deductible;
        if (masters.Quotes[masters.flags.activeTab].Deductible === "Yes") {
          lMasters.Quotes[masters.flags.activeTab]["Discount in deductibles"] =
            quotationDetailsDTOparse.PremiumDetails["Discount in deductibles"];
        } else {
          lMasters.Quotes[masters.flags.activeTab]["Discount in deductibles"] = "NA";
        }
        // lMasters.SavePymtDTO.paymentDetailsDTO.ChequeAmount =
        //   quotationDetailsDTOparse.PremiumDetails["Total with Tax"];
        lMasters.Quotes[masters.flags.activeTab].TotalSum =
          quotationDetailsDTOparse.TotalSumInsured;
        if (quotationDetailsDTOparse.PolicyType === "Standalone") {
          lMasters.Quotes[masters.flags.activeTab].TotalSumInsured =
            quotationDetailsDTOparse.TotalSumInsured;
        }
        for (let k = 1; k < Number(quotationDetailsDTOparse.count); k += 1) {
          // lDto.InsurableItem[0].RiskItems = [...dto.InsurableItem[0].RiskItems, { ...riskItems() }];
          lMasters.Risks.push({ ...risk() });
        }
        quotationDetailsDTOparse.ProposalConsent.ProposalConsentCheck = false;
        quotationDetailsDTOparse.ProposalConsent.OTP = "";
        quotationDetailsDTOparse.ProposalConsent.CheckCond1 = false;
        quotationDetailsDTOparse.ProposalConsent.CheckCond2 = false;
        lMasters.Quotes[masters.flags.activeTab].suminsured =
          quotationDetailsDTOparse.TotalSumInsured;
        const newQuoteSave = JSON.parse(
          result.data.quotation.quotationDetailsDTO[0].quotationDetails
        );

        lMasters.Quotations[masters.flags.activeTab] = newQuoteSave;
        lMasters.proposerProps.var = {
          ...lMasters.proposerProps.var,
          ...quotationDetailsDTOparse.CkycDetails,
        };
        setDto({ ...quotationDetailsDTOparse });
        setMasters({ ...lMasters });
        console.log("quotationDetailsDTO", quotationDetailsDTOparse);
      });
    }
  }, []);

  // const { search } = useLocation();

  // const proposalNoo = new URLSearchParams(search).get("proposernum");
  const Navigate = useNavigate();
  useEffect(async () => {
    if (proposalNoo !== null) {
      await GetProposalByNumber(proposalNoo).then((result) => {
        console.log("response", result);
        Navigate("/Home/CyberInsurance?acstep=2");
        const prop = result.data[0].policyDetails;
        lMasters.flags.CalPreBtn = true;
        lMasters.Dateflag = true;
        lMasters.Quotes[masters.flags.activeTab].Theft = prop.InsurableItem[0].Covers[5].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].TheftSumInsured =
          prop.InsurableItem[0].Covers[5].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Indentity =
          prop.InsurableItem[0].Covers[4].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].IndentitySumInsured =
          prop.InsurableItem[0].Covers[4].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Data = prop.InsurableItem[0].Covers[3].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].DataSumInsured =
          prop.InsurableItem[0].Covers[3].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Cyber = prop.InsurableItem[0].Covers[1].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].CyberSumInsured =
          prop.InsurableItem[0].Covers[1].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].CyberEx =
          prop.InsurableItem[0].Covers[0].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].CyberExSumInsured =
          prop.InsurableItem[0].Covers[0].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Online =
          prop.InsurableItem[0].Covers[2].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].OnlineSumInsured =
          prop.InsurableItem[0].Covers[2].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].OnlineSales =
          prop.InsurableItem[0].Covers[6].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].OnlineSaleSumInsured =
          prop.InsurableItem[0].Covers[6].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Social =
          prop.InsurableItem[0].Covers[11].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].SocialSumInsured =
          prop.InsurableItem[0].Covers[11].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Network =
          prop.InsurableItem[0].Covers[10].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].NetworkSumInsured =
          prop.InsurableItem[0].Covers[10].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Privacy =
          prop.InsurableItem[0].Covers[8].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].PrivacySumInsured =
          prop.InsurableItem[0].Covers[8].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].PrivacyThird =
          prop.InsurableItem[0].Covers[7].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].PrivacyThirdSumInsured =
          prop.InsurableItem[0].Covers[7].SumInsured;
        lMasters.Quotes[masters.flags.activeTab].Smart = prop.InsurableItem[0].Covers[9].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].SmartSumInsured =
          prop.InsurableItem[0].Covers[9].SumInsured;
        lMasters.Quotes[masters.flags.activeTab]["Theft of Funds"] =
          prop.PremiumDetails["Theft of Funds"];
        lMasters.Quotes[masters.flags.activeTab]["Indentity Theft"] =
          prop.PremiumDetails["Indentity Theft"];
        lMasters.Quotes[masters.flags.activeTab]["Data Restoration"] =
          prop.PremiumDetails["Data Restoration"];
        lMasters.Quotes[masters.flags.activeTab]["Cyber Bullying"] =
          prop.PremiumDetails["Cyber Bullying"];
        lMasters.Quotes[masters.flags.activeTab]["Cyber Extortion"] =
          prop.PremiumDetails["Cyber Extortion"];
        lMasters.Quotes[masters.flags.activeTab]["Online Shopping"] =
          prop.PremiumDetails["Online Shopping"];
        lMasters.Quotes[masters.flags.activeTab]["Online Sales"] =
          prop.PremiumDetails["Online Sales"];
        lMasters.Quotes[masters.flags.activeTab]["Social Media"] =
          prop.PremiumDetails["Social Media"];
        lMasters.Quotes[masters.flags.activeTab]["Network Security"] =
          prop.PremiumDetails["Network Security"];
        lMasters.Quotes[masters.flags.activeTab]["Privacy Breach"] =
          prop.PremiumDetails["Privacy Breach"];
        lMasters.Quotes[masters.flags.activeTab]["Privacy Third"] =
          prop.PremiumDetails["Privacy Third"];
        lMasters.Quotes[masters.flags.activeTab]["Smart Home"] = prop.PremiumDetails["Smart Home"];
        lMasters.Quotes[masters.flags.activeTab]["Total Premium"] =
          prop.PremiumDetails["Net Premium"];
        lMasters.Quotes[masters.flags.activeTab].Discount = prop.PremiumDetails.Discount;
        lMasters.Quotes[masters.flags.activeTab]["Premium After Discount"] =
          prop.PremiumDetails["Premium After Discount"];
        lMasters.Quotes[masters.flags.activeTab]["Premium After Deductibles"] =
          prop.PremiumDetails["Premium After Deductibles"];
        lMasters.Quotes[masters.flags.activeTab].GST = prop.PremiumDetails.GST;
        lMasters.Quotes[masters.flags.activeTab]["Final Premium"] =
          prop.PremiumDetails["Total with Tax"];
        lMasters.Quotes[masters.flags.activeTab].Deductible = prop.Deductible;
        if (masters.Quotes[masters.flags.activeTab].Deductible === "Yes") {
          lMasters.Quotes[masters.flags.activeTab]["Discount in deductibles"] =
            prop.PremiumDetails["Discount in deductibles"];
        } else {
          lMasters.Quotes[masters.flags.activeTab]["Discount in deductibles"] = "NA";
        }
        lMasters.Quotes[masters.flags.activeTab].TotalSum = prop.TotalSumInsured;
        if (prop.PolicyType === "Standalone") {
          lMasters.Quotes[masters.flags.activeTab].TotalSumInsured = prop.TotalSumInsured;
        }
        for (let k = 1; k < Number(prop.count); k += 1) {
          // lDto.InsurableItem[0].RiskItems = [...dto.InsurableItem[0].RiskItems, { ...riskItems() }];
          lMasters.Risks.push({ ...risk() });
        }
        lMasters.Quotes[masters.flags.activeTab].suminsured = prop.TotalSumInsured;
        prop.ProposalConsent.ProposalConsentCheck = false;
        prop.ProposalConsent.OTP = "";
        prop.ProposalConsent.CheckCond1 = false;
        prop.ProposalConsent.CheckCond2 = false;
        const updatedQuoteSave = [...lMasters.Quotations];
        lMasters.proposerProps.var = { ...lMasters.proposerProps.var, ...prop.CkycDetails };
        updatedQuoteSave[lMasters.flags.activeTab] = prop;
        lMasters.Quotations = updatedQuoteSave;
        setDto({ ...prop });
        setMasters({ ...lMasters });
      });
    }
  }, []);

  useEffect(() => {
    let timer;
    if (lMasters.proposerProps.counter > 0 && lMasters.proposerProps.startCounterFlag) {
      timer = setTimeout(() => {
        lMasters.proposerProps.counter -= 1;
        lMasters.proposerProps.sendOtpFlag = false;
        setMasters({ ...lMasters });
      }, 1000);
    }
    if (lMasters.proposerProps.counter === 0) {
      lMasters.proposerProps.counter = 30;
      lMasters.proposerProps.startCounterFlag = false;
      lMasters.proposerProps.timerFlag = true;
      lMasters.proposerProps.status = false;
      setMasters({ ...lMasters });
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [masters.proposerProps.counter, masters.proposerProps.startCounterFlag]);

  // const Navigate = useNavigate();
  // topNavigate = Navigate;

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <MDBox>
            <MDTypography>{children}</MDTypography>
          </MDBox>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const data1 = [
    { label: "Sum Insured", name: "suminsured" },
    { label: "Theft of Funds", name: "Theft of Funds" },
    { label: "Identity Theft", name: "Indentity Theft" },
    { label: "Data Restoration", name: "Data Restoration" },
    { label: "Cyber Bullying/Stalking/Loss of reputation", name: "Cyber Bullying" },
    { label: "Cyber Extortion", name: "Cyber Extortion" },
    { label: "Online Shopping", name: "Online Shopping" },
    { label: "Online Sales", name: "Online Sales" },
    { label: "Social Media/Media Liability", name: "Social Media" },
    { label: "Network Security Liability", name: "Network Security" },
    { label: "Privacy Breach and Data Breach Liability", name: "Privacy Breach" },
    { label: "Privacy Breach and Data Breach by Third Party", name: "Privacy Third" },
    { label: "Smart Home Cover", name: "Smart Home" },
    { label: "Total Premium", name: "Total Premium" },
    { label: "Less: Sectional Discount %", name: "Discount" },
    { label: "Premium After Sectional Discount", name: "Premium After Discount" },
    {
      label:
        "Less: Discount in lieu of deductibles (applicable on premium after sectional discount)",
      name: "Discount in deductibles",
    },
    { label: "Premium After Deductible Discount", name: "Premium After Deductibles" },
    { label: "Add: GST 18%", name: "GST" },
    { label: "Total Premium payable", name: "Final Premium" },
  ];

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

  const handleMemebers = (e, v) => {
    lDto.NoofMembers = v.mValue;
    lDto.count = "0";
    if (lDto.count === "0") {
      lDto.InsurableItem[0].RiskItems = [dto.InsurableItem[0].RiskItems[0]];
    }
    lDto.count = v.Count;
    if (dto.count !== "") {
      for (let k = 1; k < Number(dto.count); k += 1) {
        lDto.InsurableItem[0].RiskItems = [...dto.InsurableItem[0].RiskItems, { ...riskItems() }];
        lMasters.Risks.push({ ...risk() });
      }
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handlePolicyType = (e, v) => {
    lDto.CoverType = v.mValue;
    lMasters.editflag = true;
    if (v.mValue === "Individual") {
      lDto.Policytype = "Individual Basis";
      lDto.NoofMembers = "1 Adult";
      lDto.count = "1";
      lDto.InsurableItem[0].RiskItems = [dto.InsurableItem[0].RiskItems[0]];
    } else {
      lDto.Policytype = "Family Floater Basis";
      lDto.NoofMembers = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handleCoverType = (e, v) => {
    lMasters.editflag = true;
    lDto.Cover = v.mValue;
    if (v.mValue === "Tie In") {
      lDto.PolicyType = "TieIn";
      lDto.Covertype = "Tie in Selection";
    } else {
      lDto.PolicyType = v.mValue;
      lDto.Covertype = "Standalone plan selection";
    }
    if (v.mValue === "Standalone") {
      lDto.TotalSumInsured = "";
      lDto.InsurableItem[0].Covers.forEach((x) => {
        const suminsure = x;
        suminsure.SumInsured = "";
      });
      lMasters.Quotes[lMasters.flags.activeTab].TheftSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].IndentitySumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].DataSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].CyberSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].CyberExSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].OnlineSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].OnlineSaleSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].SocialSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].NetworkSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].PrivacySumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].PrivacyThirdSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].SmartSumInsured = "";
      lMasters.Quotes[lMasters.flags.activeTab].suminsured = "";
    } else {
      lDto.TotalSumInsured = masters.Quotes[masters.flags.activeTab].TotalSum;
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  // const handlePolDate = (e) => {
  //   lDto.PolicyStartDate = formatPolDate(e);
  //   lDto.PStartDate = formatDateKYC(dto.PolicyStartDate);
  //   const psd1 = formatPolDate(e).split("-");
  //   const nod1 = addDays(`${psd1[1]}-${psd1[2]}-${psd1[0]}`, 365).split("-");
  //   lDto.PolicyEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
  //   lDto.PEndDate = formatDateKYC(dto.PolicyEndDate);
  //   setDto({ ...lDto });
  // };
  const handlePolDate = (e) => {
    const enteredDate = new Date(e);
    enteredDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(enteredDate.getTime())) {
      // swal("Invalid Date", "Please enter a valid date", "error");
      swal({ icon: "error", text: "Please enter a valid date" });
      lDto.PolicyStartDate = "";
      lDto.PStartDate = "";
      lDto.PolicyEndDate = "";
      lDto.PEndDate = "";
      setDto({ ...lDto });
      // return;
    } else {
      lDto.PolicyStartDate = formatPolDate(e);
      lDto.PStartDate = formatDateKYC(dto.PolicyStartDate);
      const psd1 = formatPolDate(e).split("-");
      const nod1 = addDays(`${psd1[1]}-${psd1[2]}-${psd1[0]}`, 365).split("-");
      lDto.PolicyEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
      lDto.PEndDate = formatDateKYC(dto.PolicyEndDate);
      setDto({ ...lDto });
    }
  };

  const handleSum = (e, v) => {
    lMasters.editflag = true;

    if (dto.PolicyType === "TieIn") {
      lDto.TotalSumInsured = v.mValue;
      lMasters.Quotes[masters.flags.activeTab].TotalSum = v.mValue;
      // lDto.InsurableItem[0].Covers.forEach((x) => {
      //   const suminsure = x;
      //   suminsure.SumInsured = v.mValue;
      // });
    } else {
      lDto.TotalSumInsured = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handleTabChange = async (event, newTab) => {
    // debugger;
    // if (lDto.PolicyType === "TieIn") {
    //   lMasters.flags.Tieinflag = true;
    // }
    lMasters.flags.activeTab = newTab;
    lDto.InsurableItem[0].Covers[5].IsOptional = masters.Quotes[newTab].Theft;
    lDto.InsurableItem[0].Covers[5].SumInsured = lMasters.Quotes[newTab].TheftSumInsured;
    lDto.InsurableItem[0].Covers[4].IsOptional = masters.Quotes[newTab].Indentity;
    lDto.InsurableItem[0].Covers[4].SumInsured = lMasters.Quotes[newTab].IndentitySumInsured;
    lDto.InsurableItem[0].Covers[3].IsOptional = masters.Quotes[newTab].Data;
    lDto.InsurableItem[0].Covers[3].SumInsured = lMasters.Quotes[newTab].DataSumInsured;
    lDto.InsurableItem[0].Covers[1].IsOptional = masters.Quotes[newTab].Cyber;
    lDto.InsurableItem[0].Covers[1].SumInsured = lMasters.Quotes[newTab].CyberSumInsured;
    lDto.InsurableItem[0].Covers[0].IsOptional = masters.Quotes[newTab].CyberEx;
    lDto.InsurableItem[0].Covers[0].SumInsured = lMasters.Quotes[newTab].CyberExSumInsured;
    lDto.InsurableItem[0].Covers[2].IsOptional = masters.Quotes[newTab].Online;
    lDto.InsurableItem[0].Covers[2].SumInsured = lMasters.Quotes[newTab].OnlineSumInsured;
    lDto.InsurableItem[0].Covers[6].IsOptional = masters.Quotes[newTab].OnlineSales;
    lDto.InsurableItem[0].Covers[6].SumInsured = lMasters.Quotes[newTab].OnlineSaleSumInsured;
    lDto.InsurableItem[0].Covers[11].IsOptional = masters.Quotes[newTab].Social;
    lDto.InsurableItem[0].Covers[11].SumInsured = lMasters.Quotes[newTab].SocialSumInsured;
    lDto.InsurableItem[0].Covers[10].IsOptional = masters.Quotes[newTab].Network;
    lDto.InsurableItem[0].Covers[10].SumInsured = lMasters.Quotes[newTab].NetworkSumInsured;
    lDto.InsurableItem[0].Covers[8].IsOptional = masters.Quotes[newTab].Privacy;
    lDto.InsurableItem[0].Covers[8].SumInsured = lMasters.Quotes[newTab].PrivacySumInsured;
    lDto.InsurableItem[0].Covers[7].IsOptional = masters.Quotes[newTab].PrivacyThird;
    lDto.InsurableItem[0].Covers[7].SumInsured = lMasters.Quotes[newTab].PrivacyThirdSumInsured;
    lDto.InsurableItem[0].Covers[9].IsOptional = masters.Quotes[newTab].Smart;
    lDto.InsurableItem[0].Covers[9].SumInsured = lMasters.Quotes[newTab].SmartSumInsured;
    lDto.Deductible = masters.Quotes[newTab].Deductible;
    // if (dto["Quotation No"] !== "") {
    //   const quotationDTO = await callUpdateQuoteMethod(dto);
    //   lMasters.Quotations = JSON.parse(
    //     quotationDTO.data.quotation.quotationDetailsDTO[0].quotationDetails
    //   );
    // }
    // lMasters.editflag = true;
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const handelTab = (ind) => {
    // debugger;
    lMasters.flags.selectedColumn = ind;
    if (lMasters.flags.selectedColumn === 0) {
      if (dto.PolicyType === "Standalone") {
        lDto.TotalSumInsured = masters.Quotes[0].TotalSumInsured;
      } else {
        lDto.TotalSumInsured = masters.Quotes[0].TotalSum;
      }
    } else if (lMasters.flags.selectedColumn === 1) {
      if (dto.PolicyType === "Standalone") {
        lDto.TotalSumInsured = masters.Quotes[1].TotalSumInsured;
      } else {
        lDto.TotalSumInsured = masters.Quotes[1].TotalSum;
      }
    } else if (lMasters.flags.selectedColumn === 2) {
      if (dto.PolicyType === "Standalone") {
        lDto.TotalSumInsured = masters.Quotes[2].TotalSumInsured;
      } else {
        lDto.TotalSumInsured = masters.Quotes[2].TotalSum;
      }
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handleShowTabQ = () => {
    lMasters.flags.showTabQ = true;
    setMasters({ ...lMasters });
  };
  const handleColumnQClick = () => {
    lMasters.flags.showColumnQ = true;
    setMasters({ ...lMasters });
  };
  const handleColumnQoClick = () => {
    lMasters.flags.showColumnQo = true;
    setMasters({ ...lMasters });
  };
  const handleButtonClick = () => {
    lMasters.flags.showButton = true;
    setMasters({ ...lMasters });
  };
  const handleShowTab = () => {
    lMasters.flags.showTab = true;
    setMasters({ ...lMasters });
  };

  const handleClickTab = () => {
    if (lMasters.flags.clicks === 0) {
      lMasters.flags.DisableFlag = true;
      lMasters.flags.activeTab = 1;
      lMasters.flags.selectedColumn = 1;
      if (dto.PolicyType === "Standalone") {
        lDto.TotalSumInsured = "";
      } else {
        lDto.TotalSumInsured = masters.Quotes[1].TotalSum;
      }
      lDto.InsurableItem[0].Covers[5].IsOptional = masters.Quotes[1].Theft;
      lDto.InsurableItem[0].Covers[5].SumInsured = masters.Quotes[1].TheftSumInsured;
      lDto.InsurableItem[0].Covers[4].IsOptional = masters.Quotes[1].Indentity;
      lDto.InsurableItem[0].Covers[4].SumInsured = masters.Quotes[1].IndentitySumInsured;
      lDto.InsurableItem[0].Covers[3].IsOptional = masters.Quotes[1].Data;
      lDto.InsurableItem[0].Covers[3].SumInsured = masters.Quotes[1].DataSumInsured;
      lDto.InsurableItem[0].Covers[1].IsOptional = masters.Quotes[1].Cyber;
      lDto.InsurableItem[0].Covers[1].SumInsured = masters.Quotes[1].CyberSumInsured;
      lDto.InsurableItem[0].Covers[0].IsOptional = masters.Quotes[1].CyberEx;
      lDto.InsurableItem[0].Covers[0].SumInsured = masters.Quotes[1].CyberExSumInsured;
      lDto.InsurableItem[0].Covers[2].IsOptional = masters.Quotes[1].Online;
      lDto.InsurableItem[0].Covers[2].SumInsured = masters.Quotes[1].OnlineSumInsured;
      lDto.InsurableItem[0].Covers[6].IsOptional = masters.Quotes[1].OnlineSales;
      lDto.InsurableItem[0].Covers[6].SumInsured = masters.Quotes[1].OnlineSaleSumInsured;
      lDto.InsurableItem[0].Covers[11].IsOptional = masters.Quotes[1].Social;
      lDto.InsurableItem[0].Covers[11].SumInsured = masters.Quotes[1].SocialSumInsured;
      lDto.InsurableItem[0].Covers[10].IsOptional = masters.Quotes[1].Network;
      lDto.InsurableItem[0].Covers[10].SumInsured = masters.Quotes[1].NetworkSumInsured;
      lDto.InsurableItem[0].Covers[8].IsOptional = masters.Quotes[1].Privacy;
      lDto.InsurableItem[0].Covers[8].SumInsured = masters.Quotes[1].PrivacySumInsured;
      lDto.InsurableItem[0].Covers[7].IsOptional = masters.Quotes[1].PrivacyThird;
      lDto.InsurableItem[0].Covers[7].SumInsured = masters.Quotes[1].PrivacyThirdSumInsured;
      lDto.InsurableItem[0].Covers[9].IsOptional = masters.Quotes[1].Smart;
      lDto.InsurableItem[0].Covers[9].SumInsured = masters.Quotes[1].SmartSumInsured;
      lDto.Deductible = masters.Quotes[1].Deductible;
      setDto({ ...lDto });
      handleShowTab();
      handleColumnQClick();
      // console.log("First click");
    } else if (lMasters.flags.clicks === 1) {
      lMasters.flags.activeTab = 2;
      lMasters.flags.selectedColumn = 2;
      if (dto.PolicyType === "Standalone") {
        lDto.TotalSumInsured = "";
      } else {
        lDto.TotalSumInsured = masters.Quotes[2].TotalSum;
      }
      lDto.InsurableItem[0].Covers[5].IsOptional = masters.Quotes[2].Theft;
      lDto.InsurableItem[0].Covers[5].SumInsured = masters.Quotes[2].TheftSumInsured;
      lDto.InsurableItem[0].Covers[4].IsOptional = masters.Quotes[2].Indentity;
      lDto.InsurableItem[0].Covers[4].SumInsured = masters.Quotes[2].IndentitySumInsured;
      lDto.InsurableItem[0].Covers[3].IsOptional = masters.Quotes[2].Data;
      lDto.InsurableItem[0].Covers[3].SumInsured = masters.Quotes[2].DataSumInsured;
      lDto.InsurableItem[0].Covers[1].IsOptional = masters.Quotes[2].Cyber;
      lDto.InsurableItem[0].Covers[1].SumInsured = masters.Quotes[2].CyberSumInsured;
      lDto.InsurableItem[0].Covers[0].IsOptional = masters.Quotes[2].CyberEx;
      lDto.InsurableItem[0].Covers[0].SumInsured = masters.Quotes[2].CyberExSumInsured;
      lDto.InsurableItem[0].Covers[2].IsOptional = masters.Quotes[2].Online;
      lDto.InsurableItem[0].Covers[2].SumInsured = masters.Quotes[2].OnlineSumInsured;
      lDto.InsurableItem[0].Covers[6].IsOptional = masters.Quotes[2].OnlineSales;
      lDto.InsurableItem[0].Covers[6].SumInsured = masters.Quotes[2].OnlineSaleSumInsured;
      lDto.InsurableItem[0].Covers[11].IsOptional = masters.Quotes[2].Social;
      lDto.InsurableItem[0].Covers[11].SumInsured = masters.Quotes[2].SocialSumInsured;
      lDto.InsurableItem[0].Covers[10].IsOptional = masters.Quotes[2].Network;
      lDto.InsurableItem[0].Covers[10].SumInsured = masters.Quotes[2].NetworkSumInsured;
      lDto.InsurableItem[0].Covers[8].IsOptional = masters.Quotes[2].Privacy;
      lDto.InsurableItem[0].Covers[8].SumInsured = masters.Quotes[2].PrivacySumInsured;
      lDto.InsurableItem[0].Covers[7].IsOptional = masters.Quotes[2].PrivacyThird;
      lDto.InsurableItem[0].Covers[7].SumInsured = masters.Quotes[2].PrivacyThirdSumInsured;
      lDto.InsurableItem[0].Covers[9].IsOptional = masters.Quotes[2].Smart;
      lDto.InsurableItem[0].Covers[9].SumInsured = masters.Quotes[2].SmartSumInsured;
      lDto.Deductible = masters.Quotes[2].Deductible;
      setDto({ ...lDto });
      handleShowTabQ();
      handleColumnQoClick();
      handleButtonClick();
      // console.log("Second click");
    }
    lMasters.flags.clicks += 1;
    setMasters({ ...lMasters });
  };

  const handleCovers = (e, name, ind1) => {
    if (e.target.checked === true) {
      lMasters.Quotes[lMasters.flags.activeTab][name] = "Yes";
      lDto.InsurableItem[0].Covers[ind1].IsOptional = "Yes";
    } else if (e.target.checked === false) {
      lMasters.Quotes[lMasters.flags.activeTab][name] = "No";
      lDto.InsurableItem[0].Covers[ind1].IsOptional = "No";
      if (dto.PolicyType === "Standalone") {
        let sum1 = 0;
        lDto.InsurableItem[0].Covers.forEach((x) => {
          if (x.IsOptional === "Yes") {
            lMasters.Quotes[lMasters.flags.activeTab][name] = "";
            lDto.InsurableItem[0].Covers[ind1].SumInsured = "";
            sum1 += Number(x.SumInsured);
          }
        });
        lMasters.Quotes[lMasters.flags.activeTab].TotalSumInsured = String(sum1);
        lDto.TotalSumInsured = lMasters.Quotes[lMasters.flags.activeTab].TotalSumInsured;
      }
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handledeductible = (e) => {
    lMasters.editflag = true;
    lDto.Deductible = e.target.value;
    lMasters.Quotes[lMasters.flags.activeTab].Deductible = e.target.value;
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onSI = (e, name, v, i) => {
    lMasters.editflag = true;
    let sum = 0;
    lDto.InsurableItem[0].Covers.forEach((x) => {
      if (x.IsOptional === "Yes") {
        lMasters.Quotes[lMasters.flags.activeTab][name] = v.mValue;
        lDto.InsurableItem[0].Covers[i].SumInsured = v.mValue;
        sum += Number(x.SumInsured);
      }
    });
    lMasters.Quotes[lMasters.flags.activeTab].TotalSumInsured = String(sum);
    lDto.TotalSumInsured = lMasters.Quotes[lMasters.flags.activeTab].TotalSumInsured;
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const Handlecalculate = async () => {
    let count = 0;
    lDto.InsurableItem[0].Covers.forEach((x) => {
      const suminsure = x;
      if (suminsure.IsOptional === "Yes") {
        count += 1;
      }
    });
    lDto.NoOfCovers = String(count);
    setDto({ ...lDto });
    if (dto.PolicyType === "TieIn") {
      lDto.InsurableItem[0].Covers.forEach((x) => {
        const suminsure = x;
        if (suminsure.IsOptional === "Yes") {
          suminsure.SumInsured = masters.Quotes[masters.flags.activeTab].TotalSum;
        } else {
          suminsure.SumInsured = "";
        }
      });
    }
    let countIsOptionalNo = 0;
    lDto.InsurableItem[0].Covers.forEach((cover) => {
      if (cover.IsOptional === "No") {
        countIsOptionalNo -= 1;
      }
    });
    if (
      dto.BusinessType === "" ||
      dto.ProposerDetails.FirstName === "" ||
      dto.ProposerDetails.LastName === "" ||
      dto.QuoteEmail === "" ||
      dto.QuoteMobileNo === "" ||
      dto["Policy Tenure"] === "" ||
      dto.PolicyType === "" ||
      dto.CoverType === "" ||
      dto.Deductible === "" ||
      (dto.PolicyType === "TieIn" && dto.TotalSumInsured === "") ||
      dto.NoofMembers === "" ||
      dto.PolicyStartDate === "" ||
      dto.PolicyEndDate === "" ||
      masters.Quotes[lMasters.flags.activeTab].Deductible === ""
    ) {
      lMasters.flags.QuoteError = true;
      swal({ icon: "error", text: "Please fill required fields" });
    } else if (countIsOptionalNo < -10 && dto.PolicyType === "TieIn") {
      swal({ icon: "error", text: "Please Select Minimum Two Covers" });
    } else if (countIsOptionalNo < -11 && dto.PolicyType === "Standalone") {
      swal({ icon: "error", text: "Please Select Minimum one Cover" });
    } else if (
      lDto.InsurableItem[0].Covers.some((x) => x.IsOptional === "Yes" && x.SumInsured === "") &&
      dto.PolicyType === "Standalone"
    ) {
      swal({ icon: "error", text: "Please Select Sum Insured" });
    } else {
      setBackDropFlag(true);
      lMasters.editflag = false;
      lMasters.flags.QuoteError = false;
      await Quotations(dto).then(async (result) => {
        console.log("result", result);
        lMasters.flags.CalPreBtn = true;
        lMasters.flags.selectedColumn = 0;
        lDto.PremiumDetails["Theft of Funds"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[5].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Indentity Theft"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[4].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Data Restoration"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[3].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Cyber Bullying"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[1].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Cyber Extortion"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[0].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Online Shopping"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[2].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Online Sales"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[6].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Social Media"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[11].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Network Security"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[10].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Privacy Breach"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[8].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Privacy Third"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[7].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Smart Home"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[9].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Net Premium"] = String(
          Math.round(Number(result.finalResult.CyberRetailBaseCalculator1.CoverBasePremiumSum))
        );
        lDto.PremiumDetails.Discount = String(
          Math.round(Number(result.finalResult.DiscountAmount))
        );
        lDto.PremiumDetails["Premium After Discount"] = String(
          Math.round(Number(result.finalResult.PremiumAfterDiscount))
        );
        lDto.PremiumDetails["Discount in deductibles"] = String(
          Math.round(Number(result.finalResult.DeductibleDiscount))
        );
        lDto.PremiumDetails["Premium After Deductibles"] = String(
          Math.round(Number(result.finalResult.PremiumAfterDeductible))
        );
        lDto.PremiumDetails.CGST = String(Math.round(Number(result.finalResult.CGST)));
        lDto.PremiumDetails.SGST = String(Math.round(Number(result.finalResult.SGST)));
        lDto.PremiumDetails.GST = String(Math.round(Number(result.finalResult.GST)));
        lDto.PremiumDetails["Total with Tax"] = String(
          Math.round(Number(result.finalResult.FinalPremium))
        );
        const ind = lMasters.flags.activeTab;
        console.log("index", ind);
        if (dto.PolicyType === "TieIn") {
          lMasters.Quotes[ind].suminsured = masters.Quotes[ind].TotalSum;
        } else {
          lMasters.Quotes[ind].suminsured = masters.Quotes[ind].TotalSumInsured;
        }
        lMasters.Quotes[ind]["Theft of Funds"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[5].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Indentity Theft"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[4].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Data Restoration"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[3].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Cyber Bullying"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[1].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Cyber Extortion"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[0].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Online Shopping"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[2].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Online Sales"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[6].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Social Media"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[11].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Network Security"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[10].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Privacy Breach"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[8].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Privacy Third"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[7].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Smart Home"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[9].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Total Premium"] = String(
          Math.round(Number(result.finalResult.CyberRetailBaseCalculator1.CoverBasePremiumSum))
        );
        lMasters.Quotes[ind].Discount = String(
          Math.round(Number(result.finalResult.DiscountAmount))
        );
        lMasters.Quotes[ind]["Premium After Discount"] = String(
          Math.round(Number(result.finalResult.PremiumAfterDiscount))
        );
        if (dto.Deductible === "Yes") {
          lMasters.Quotes[ind]["Discount in deductibles"] = String(
            Math.round(Number(result.finalResult.DeductibleDiscount))
          );
        } else {
          lMasters.Quotes[ind]["Discount in deductibles"] = "NA";
        }
        lMasters.Quotes[ind]["Premium After Deductibles"] = String(
          Math.round(Number(result.finalResult.PremiumAfterDeductible))
        );
        lMasters.Quotes[ind].GST = String(Math.round(Number(result.finalResult.GST)));
        lMasters.Quotes[ind]["Final Premium"] = String(
          Math.round(Number(result.finalResult.FinalPremium))
        );
        lMasters.SavePymtDTO.paymentDetailsDTO.ChequeAmount = String(
          Math.round(Number(result.finalResult.FinalPremium))
        );
        const quotationDTO = await callSaveQuoteMethod(dto);

        lDto["Quotation No"] = quotationDTO.data.quotation.quoteNo;
        lDto.QuoteNo = quotationDTO.data.quotation.quoteNo;
        setDto({ ...lDto });
      });
      setBackDropFlag(false);
    }
    await getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
      async (result) => {
        console.log("result", result);
        const { partnerId } = result.data.userDetails[0];
        await getRequest(
          `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
            "userId"
          )}&productCode=${dto.GCProductCode}`
        ).then(async (reslt) => {
          console.log("qwertyuiop", reslt);
          const partnerDetailssss = reslt.data.additionalDetails;
          console.log("123456789", partnerDetailssss);
          const partnerDetail = JSON.parse(partnerDetailssss);
          lDto.Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
          lDto.Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
          lDto.Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
          lDto.Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
          lDto.Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
          lDto.Channel.AgentContactNo = partnerDetail.Mobile;
          lDto.Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
          lDto.Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
          lDto.Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
          // lDto.Channel.PrimaryVerticalName = partnerDetail.AdditionalDetails.PrimaryVerticalName;
          lDto.Channel.PrimaryVerticalName =
            partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
              ? masters.VerticalName.filter(
                  (x) => x.VerticalCode === partnerDetail.AdditionalDetails.PrimaryVerticalCode
                )[0].mValue
              : partnerDetail.AdditionalDetails.PrimaryVerticalName;
          lDto.Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
          lDto.Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
          lDto.Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
          lDto.Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
          lDto.Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
          lDto.Channel.DealId = partnerDetail.AdditionalDetails.DealId;
          lDto["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;
        });
        setDto({ ...lDto });
        const quotationDTO1 = await callUpdateQuoteMethod(dto);
        const newQuoteSave = JSON.parse(
          quotationDTO1.data.quotation.quotationDetailsDTO[0].quotationDetails
        );
        const updatedQuoteSave = [...lMasters.Quotations];
        updatedQuoteSave[0] = newQuoteSave;
        lMasters.Quotations = updatedQuoteSave;
        setMasters({ ...lMasters });
      }
    );
  };

  const CalculatePremium = async () => {
    let count = 0;
    lDto.InsurableItem[0].Covers.forEach((x) => {
      const suminsure = x;
      if (suminsure.IsOptional === "Yes") {
        count += 1;
      }
    });
    lDto.NoOfCovers = String(count);
    setDto({ ...lDto });
    if (dto.PolicyType === "TieIn") {
      lDto.InsurableItem[0].Covers.forEach((x) => {
        const suminsure = x;
        if (suminsure.IsOptional === "Yes") {
          suminsure.SumInsured = masters.Quotes[masters.flags.activeTab].TotalSum;
        } else {
          suminsure.SumInsured = "";
        }
      });
    }
    let countIsOptionalNo = 0;
    lDto.InsurableItem[0].Covers.forEach((cover) => {
      if (cover.IsOptional === "No") {
        countIsOptionalNo -= 1;
      }
    });
    if (
      dto.BusinessType === "" ||
      dto.ProposerDetails.FirstName === "" ||
      dto.ProposerDetails.LastName === "" ||
      dto.QuoteEmail === "" ||
      dto.QuoteMobileNo === "" ||
      dto["Policy Tenure"] === "" ||
      dto.PolicyType === "" ||
      dto.CoverType === "" ||
      dto.Deductible === "" ||
      (dto.PolicyType === "TieIn" && dto.TotalSumInsured === "") ||
      dto.NoofMembers === "" ||
      dto.PolicyStartDate === "" ||
      dto.PolicyEndDate === "" ||
      masters.Quotes[lMasters.flags.activeTab].Deductible === ""
    ) {
      lMasters.flags.QuoteError = true;
      swal({ icon: "error", text: "Please fill required fields" });
    } else if (countIsOptionalNo < -10 && dto.PolicyType === "TieIn") {
      swal({ icon: "error", text: "Please Select Minimum Two Covers" });
    } else if (countIsOptionalNo < -11 && dto.PolicyType === "Standalone") {
      swal({ icon: "error", text: "Please Select Minimum One Cover" });
    } else if (
      lDto.InsurableItem[0].Covers.some((x) => x.IsOptional === "Yes" && x.SumInsured === "") &&
      dto.PolicyType === "Standalone"
    ) {
      swal({ icon: "error", text: "Please Select Sum Insured" });
    } else {
      setBackDropFlag(true);
      lMasters.editflag = false;
      lMasters.flags.QuoteError = false;
      // if (dto["Quotation No"] !== "") {
      //   await callUpdateQuoteMethod(dto);
      // }
      await Quotations(dto).then(async (result) => {
        console.log("result", result);
        lMasters.flags.CalPreBtn = true;
        lDto.PremiumDetails["Theft of Funds"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[5].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Indentity Theft"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[4].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Data Restoration"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[3].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Cyber Bullying"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[1].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Cyber Extortion"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[0].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Online Shopping"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[2].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Online Sales"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[6].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Social Media"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[11].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Network Security"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[10].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Privacy Breach"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[8].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Privacy Third"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[7].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Smart Home"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[9].CoverBasePremium)
          )
        );
        lDto.PremiumDetails["Net Premium"] = String(
          Math.round(Number(result.finalResult.CyberRetailBaseCalculator1.CoverBasePremiumSum))
        );
        lDto.PremiumDetails.Discount = String(
          Math.round(Number(result.finalResult.DiscountAmount))
        );
        lDto.PremiumDetails["Premium After Discount"] = String(
          Math.round(Number(result.finalResult.PremiumAfterDiscount))
        );
        lDto.PremiumDetails["Discount in deductibles"] = String(
          Math.round(Number(result.finalResult.DeductibleDiscount))
        );
        lDto.PremiumDetails["Premium After Deductibles"] = String(
          Math.round(Number(result.finalResult.PremiumAfterDeductible))
        );
        lDto.PremiumDetails.CGST = String(Math.round(Number(result.finalResult.CGST)));
        lDto.PremiumDetails.SGST = String(Math.round(Number(result.finalResult.SGST)));
        lDto.PremiumDetails.GST = String(Math.round(Number(result.finalResult.GST)));
        lDto.PremiumDetails["Total with Tax"] = String(
          Math.round(Number(result.finalResult.FinalPremium))
        );
        const ind = lMasters.flags.activeTab;
        console.log("index", ind);
        if (dto.PolicyType === "TieIn") {
          lMasters.Quotes[ind].suminsured = masters.Quotes[ind].TotalSum;
        } else {
          lMasters.Quotes[ind].suminsured = masters.Quotes[ind].TotalSumInsured;
        }
        lMasters.Quotes[ind]["Theft of Funds"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[5].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Indentity Theft"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[4].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Data Restoration"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[3].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Cyber Bullying"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[1].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Cyber Extortion"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[0].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Online Shopping"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[2].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Online Sales"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[6].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Social Media"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[11].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Network Security"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[10].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Privacy Breach"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[8].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Privacy Third"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[7].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Smart Home"] = String(
          Math.round(
            Number(result.finalResult.CyberRetailBaseCalculator1.output[9].CoverBasePremium)
          )
        );
        lMasters.Quotes[ind]["Total Premium"] = String(
          Math.round(Number(result.finalResult.CyberRetailBaseCalculator1.CoverBasePremiumSum))
        );
        lMasters.Quotes[ind].Discount = String(
          Math.round(Number(result.finalResult.DiscountAmount))
        );
        lMasters.Quotes[ind]["Premium After Discount"] = String(
          Math.round(Number(result.finalResult.PremiumAfterDiscount))
        );
        if (dto.Deductible === "Yes") {
          lMasters.Quotes[ind]["Discount in deductibles"] = String(
            Math.round(Number(result.finalResult.DeductibleDiscount))
          );
        } else {
          lMasters.Quotes[ind]["Discount in deductibles"] = "NA";
        }
        lMasters.Quotes[ind]["Premium After Deductibles"] = String(
          Math.round(Number(result.finalResult.PremiumAfterDeductible))
        );
        lMasters.Quotes[ind].GST = String(Math.round(Number(result.finalResult.GST)));
        lMasters.Quotes[ind]["Final Premium"] = String(
          Math.round(Number(result.finalResult.FinalPremium))
        );
        lMasters.SavePymtDTO.paymentDetailsDTO.ChequeAmount = String(
          Math.round(Number(result.finalResult.FinalPremium))
        );
        if (masters.Dateflag === false) {
          lDto.PaymentDetails.ChequeAmount = String(
            Math.round(Number(result.finalResult.FinalPremium))
          );
        }

        const quotationDTO = await callUpdateQuoteMethod(dto);
        const newQuoteSave = JSON.parse(
          quotationDTO.data.quotation.quotationDetailsDTO[0].quotationDetails
        );

        const updatedQuoteSave = [...lMasters.Quotations];
        updatedQuoteSave[ind] = newQuoteSave;
        lMasters.Quotations = updatedQuoteSave;

        console.log("quotationDTO", lMasters.Quotations);
        setDto({ ...lDto });
        setMasters({ ...lMasters });
      });
      setBackDropFlag(false);
    }
  };

  const onShareQuote = async () => {
    // if (masters.flags.activeTab === 0) {
    //   lMasters.Quotations[0] = FirstQuote;
    //   setMasters({ ...lMasters });
    // }
    console.log("Keeru", lMasters.Quotations);
    if (
      masters.Quotes[masters.flags.activeTab]["Final Premium"] === 0 ||
      dto.PremiumDetails["Total with Tax"] === "0" ||
      lMasters.Quotations[lMasters.flags.activeTab]?.InsurableItem[0].Covers.filter(
        (x) => x.IsOptional === "Yes"
      ).length !== lDto.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length ||
      masters.editflag === true
    ) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else {
      // const down = lMasters?.Quotations[lMasters.flags.activeTab];
      // setDto({ ...down });

      await callUpdateQuoteMethod(lMasters?.Quotations[lMasters.flags.activeTab]).then(async () => {
        const jsonValue = {
          communicationId: 233,
          keyType: "BGRQuote",
          key: dto["Quotation No"],
          stakeHolderDetails: [
            {
              communicationType: "Email",
              stakeholderCode: "CUS",
              communicationValue: dto.QuoteEmail,
            },
          ],
        };
        const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
        if (mail.data.status === 1) {
          swal({
            text: `Email send successfully`,
            html: true,
            icon: "success",
          });
        }
      });
    }
  };

  const DownloadQuote = async () => {
    console.log("Keeru", lMasters.Quotations);
    if (
      masters.Quotes[masters.flags.activeTab]["Final Premium"] === 0 ||
      dto.PremiumDetails["Total with Tax"] === "0" ||
      // lDto.InsurableItem[0].Covers.some((x) => x.IsOptional === "Yes" && x.SumInsured === "") ||
      lMasters.Quotations[lMasters.flags.activeTab].InsurableItem[0].Covers.filter(
        (x) => x.IsOptional === "Yes"
      ).length !== lDto.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length ||
      masters.editflag === true
    ) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else {
      await callUpdateQuoteMethod(lMasters?.Quotations[lMasters.flags.activeTab]).then(async () => {
        const downloadDTO = {
          key: dto["Quotation No"],
          templateId: 237,
          referenceId: "",
        };
        await downloadQuote(downloadDTO);
      });
    }
  };

  const saveAndExit = async () => {
    if (
      masters.Quotes[masters.flags.activeTab]["Final Premium"] === 0 ||
      dto.PremiumDetails["Total with Tax"] === "0"
    ) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else if (dto.QuoteEmail) {
      await callUpdateQuoteMethod(dto).then(async () => {
        const downloadDTO = {
          key: dto["Quotation No"],
          templateId: 237,
          referenceId: "",
        };
        await onShareQuote(dto["Quotation No"], dto.QuoteEmail);
        await downloadQuote(downloadDTO);
      });
      window.open(process.env.REACT_APP_HOMEURL, "_self");
    } else {
      swal({ icon: "error", text: "Please Enter Email Id" });
    }
  };

  const onInsuredDetails = (e) => {
    lDto["Is proposer same as Insured"] = e.target.value;
    if (dto["Is proposer same as Insured"] === "Yes") {
      lDto.InsurableItem[0].RiskItems[0]["First Name"] = dto.ProposerDetails.FirstName;
      lDto.InsurableItem[0].RiskItems[0]["Last Name"] = dto.ProposerDetails.LastName;
    } else {
      lDto["Is proposer same as Insured"] = "No";
      lDto.InsurableItem[0].RiskItems[0]["First Name"] = "";
      lDto.InsurableItem[0].RiskItems[0]["Last Name"] = "";
    }
    setDto({ ...lDto });
  };

  // const handleRelation = (e, v) => {
  //   lDto.InsurableItem[0].RiskItems[0].Relationship = v.mValue;
  // };
  const oNDOB = (d, i) => {
    lDto.InsurableItem[0].RiskItems[i].DOB = formatDateKYC(d);
    const dobString = dto.InsurableItem[0].RiskItems[i].DOB;
    const [day, month, year] = dobString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    const age = AgeCalculator1(date.toLocaleDateString("en-ZA"));
    lDto.InsurableItem[0].RiskItems[i].Age = age;
    if (dto.InsurableItem[0].RiskItems[i].Age < 18) {
      lMasters.Risks[i].agebelow18 = true;
    } else {
      lMasters.Risks[i].agebelow18 = false;
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const NomineeDob = (d, i) => {
    lDto.InsurableItem[0].RiskItems[i]["Nominee DOB"] = formatDateKYC(d);
    lDto.InsurableItem[0].RiskItems[i].GCNDOB = dto.InsurableItem[0].RiskItems[i]["Nominee DOB"];
    const dobString = dto.InsurableItem[0].RiskItems[i]["Nominee DOB"];
    const [day, month, year] = dobString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    const age = AgeCalculator1(date.toLocaleDateString("en-ZA"));
    lDto.InsurableItem[0].RiskItems[i]["Nominee Age"] = age;
    lDto.InsurableItem[0].RiskItems[i].GCNAge = dto.InsurableItem[0].RiskItems[i]["Nominee Age"];
    if (dto.InsurableItem[0].RiskItems[i]["Nominee Age"] < 18) {
      lMasters.Risks[i].nomineeage = true;
    } else {
      lMasters.Risks[i].nomineeage = false;
    }
    setDto({ ...lDto });
  };

  const Autofield = (j, e, v, fieldName) => {
    lDto.InsurableItem[0].RiskItems[j][fieldName] = v.mValue;
    lDto.InsurableItem[0].RiskItems[j].GCPleaseselctyourOccupation =
      dto.InsurableItem[0].RiskItems[j]["Please select your Occupation"];
    lDto.InsurableItem[0].RiskItems[j].GCOperatingsystemused =
      dto.InsurableItem[0].RiskItems[j]["Operating system used"];
    lDto.InsurableItem[0].RiskItems[j].GCNOmineeRelation =
      dto.InsurableItem[0].RiskItems[j]["Nominee Relation"];
    setDto({ ...lDto });
  };
  const updateField = (e, j, fieldName) => {
    lDto.InsurableItem[0].RiskItems[j][fieldName] = e.target.value;
    lDto.InsurableItem[0].RiskItems[
      j
    ].GCName = `${dto.InsurableItem[0].RiskItems[j]["First Name"]} ${dto.InsurableItem[0].RiskItems[j]["Last Name"]}`;
    lDto.InsurableItem[0].RiskItems[j].GCNameofNominee =
      dto.InsurableItem[0].RiskItems[j]["Name of Nominee"];
    // lDto.InsurableItem[0].RiskItems[j].GCNDOB = dto.InsurableItem[0].RiskItems[j]["Nominee DOB"];
    // lDto.InsurableItem[0].RiskItems[j].GCNAge = dto.InsurableItem[0].RiskItems[j]["Nominee Age"];
    lDto.InsurableItem[0].RiskItems[j].GCAddressoftheNominee =
      dto.InsurableItem[0].RiskItems[j]["Address of the Nominee"];
    lDto.InsurableItem[0].RiskItems[j].GCAppointeeName =
      dto.InsurableItem[0].RiskItems[j]["Appointee Name"];
    lDto.InsurableItem[0].RiskItems[j].GCAppointeeRelationship =
      dto.InsurableItem[0].RiskItems[j]["Appointee Relationship"];
    setDto({ ...lDto });
  };
  const spreedInsurersComponents = () => {
    const arr = [];
    dto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push([
        // {
        //   type: "Typography",
        //   label: `Member ${i + 1}`,
        //   visible: true,
        //   variant: "h6",s
        //   spacing: 12,
        // },
        {
          type: "Input",
          label: "First Name",
          visible: true,
          required: true,
          spacing: 3,
          name: "First Name",
          onChangeFuncs: ["IsAlphaSpace"],
          path: `InsurableItem.0.RiskItems.${i}.First Name`,
          customOnChange: (e) => updateField(e, i, "First Name"),
        },
        {
          type: "Input",
          label: "Last Name",
          visible: true,
          required: true,
          spacing: 3,
          name: "Last Name",
          onChangeFuncs: ["IsAlphaSpace"],
          path: `InsurableItem.0.RiskItems.${i}.Last Name`,
          customOnChange: (e) => updateField(e, i, "Last Name"),
        },
        {
          type: "MDDatePicker",
          required: true,
          visible: true,
          label: "Date of Birth",
          path: `InsurableItem.0.RiskItems.${i}.DOB`,
          maxDate: new Date(),
          allowInput: true,
          altFormat: "d-m-Y",
          dateFormat: "d-m-Y",
          customOnChange: (d) => oNDOB(d, i),
        },
        {
          type: "AutoComplete",
          label: "Gender",
          visible: true,
          required: true,
          options: masters.Gender,
          path: `InsurableItem.0.RiskItems.${i}.Gender`,
        },
        {
          type: "AutoComplete",
          label: "Please Select your Occupation",
          visible: true,
          required: true,
          name: "Please Select your Occupation",
          options: masters.CyberOccupation,
          path: `InsurableItem.0.RiskItems.${i}.Please select your Occupation`,
          customOnChange: (e, value) => Autofield(i, e, value, "Please select your Occupation"),
        },
        {
          type: "AutoComplete",
          label: "Relationship",
          visible: true,
          required: true,
          options: masters.CyberRelationship,
          path: `InsurableItem.0.RiskItems.${i}.Relationship`,
          // customOnChange: (e, v) => handleRelation(e, v, i),
        },
        {
          type: "AutoComplete",
          label: "Operating system used",
          visible: true,
          required: true,
          name: "Operating system used",
          options: masters.OperatingSystem,
          path: `InsurableItem.0.RiskItems.${i}.Operating system used`,
          customOnChange: (e, value) => Autofield(i, e, value, "Operating system used"),
        },
        {
          type: "Input",
          label: "Name of Nominee",
          visible: true,
          required: true,
          name: "Name of Nominee",
          path: `InsurableItem.0.RiskItems.${i}.Name of Nominee`,
          onChangeFuncs: ["IsAlphaSpace"],
          customOnChange: (e) => updateField(e, i, "Name of Nominee"),
        },
        {
          type: "MDDatePicker",
          required: true,
          visible: true,
          label: "Nominee Date of Birth",
          name: "Nominee DOB",
          path: `InsurableItem.0.RiskItems.${i}.Nominee DOB`,
          maxDate: new Date(),
          allowInput: true,
          altFormat: "d-m-Y",
          dateFormat: "d-m-Y",
          customOnChange: (d) => NomineeDob(d, i, "Nominee DOB"),
        },
        {
          type: "Input",
          label: "Address of the Nominee",
          visible: true,
          name: "Address of the Nominee",
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.Address of the Nominee`,
          customOnChange: (e) => updateField(e, i, "Address of the Nominee"),
        },
        {
          type: "AutoComplete",
          label: "Nominee Relation",
          visible: true,
          required: true,
          name: "Nominee Relation",
          options: masters.NomineeRelationShip,
          path: `InsurableItem.0.RiskItems.${i}.Nominee Relation`,
          customOnChange: (e, value) => Autofield(i, e, value, "Nominee Relation"),
        },
        {
          type: "Input",
          label: "Appointee Name(if Nominee is minor)",
          required:
            (lMasters.Risks[i].agebelow18 === true &&
              (dto.InsurableItem[0].RiskItems[i].Relationship === "Child 1" ||
                dto.InsurableItem[0].RiskItems[i].Relationship === "Child 2")) ||
            lMasters.Risks[i].nomineeage === true,
          visible: true,
          name: "Appointee Name",
          path: `InsurableItem.0.RiskItems.${i}.Appointee Name`,
          onChangeFuncs: ["IsAlphaSpace"],
          customOnChange: (e) => updateField(e, i, "Appointee Name"),
          error:
            (lMasters.Risks[i].agebelow18 === true &&
              (dto.InsurableItem[0].RiskItems[i].Relationship === "Child 1" ||
                dto.InsurableItem[0].RiskItems[i].Relationship === "Child 2") &&
              dto.InsurableItem[0].RiskItems[i]["Appointee Name"] === "") ||
            (lMasters.Risks[i].nomineeage === true &&
              dto.InsurableItem[0].RiskItems[i]["Appointee Name"] === ""),
          errtext:
            (lMasters.Risks[i].agebelow18 === true &&
              (dto.InsurableItem[0].RiskItems[i].Relationship === "Child 1" ||
                dto.InsurableItem[0].RiskItems[i].Relationship === "Child 2") &&
              dto.InsurableItem[0].RiskItems[i]["Appointee Name"] === "" &&
              "Note: This Field is Required as Nominee is Minor") ||
            (lMasters.Risks[i].nomineeage === true &&
              dto.InsurableItem[0].RiskItems[i]["Appointee Name"] === "" &&
              "Note: This Field is Required as Nominee is Minor"),
        },
        {
          type: "Input",
          label: "Appointee Relationship",
          required:
            (lMasters.Risks[i].agebelow18 === true &&
              (dto.InsurableItem[0].RiskItems[i].Relationship === "Child 1" ||
                dto.InsurableItem[0].RiskItems[i].Relationship === "Child 2")) ||
            lMasters.Risks[i].nomineeage === true,
          visible: true,
          name: "Appointee Relationship",
          path: `InsurableItem.0.RiskItems.${i}.Appointee Relationship`,
          customOnChange: (e) => updateField(e, i, "Appointee Relationship"),
          error:
            (lMasters.Risks[i].agebelow18 === true &&
              (dto.InsurableItem[0].RiskItems[i].Relationship === "Child 1" ||
                dto.InsurableItem[0].RiskItems[i].Relationship === "Child 2") &&
              dto.InsurableItem[0].RiskItems[i]["Appointee Relationship"] === "") ||
            (lMasters.Risks[i].nomineeage === true &&
              dto.InsurableItem[0].RiskItems[i]["Appointee Relationship"] === ""),
          errtext:
            (lMasters.Risks[i].agebelow18 === true &&
              (dto.InsurableItem[0].RiskItems[i].Relationship === "Child 1" ||
                dto.InsurableItem[0].RiskItems[i].Relationship === "Child 2") &&
              dto.InsurableItem[0].RiskItems[i]["Appointee Relationship"] === "" &&
              "Note: This Field is Required as Nominee is Minor") ||
            (lMasters.Risks[i].nomineeage === true &&
              dto.InsurableItem[0].RiskItems[i]["Appointee Relationship"] === "" &&
              "Note: This Field is Required as Nominee is Minor"),
        },
      ]);
    });
    console.log("123", arr.length);
    return arr;
  };

  // const onAddInsurer = () => {
  //   lDto.InsurableItem[0].RiskItems.push({ ...riskItems() });
  //   setDto({ ...lDto });
  // };

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            variant: "h3",
            radioLabel: { label: "Business Type", labelVisible: true },
            radioList: [{ value: "New Business", label: "New Business" }],
            path: "BusinessType",
            disabled: masters.flags.DisableFlag,
            spacing: 12,
            error: masters.flags.QuoteError && dto.BusinessType === "",
            errtext:
              masters.flags.QuoteError && dto.BusinessType === "" && "Please fill this Field",
          },
        ],
        [
          {
            type: "Input",
            visible: true,
            required: true,
            label: "First Name",
            path: `ProposerDetails.FirstName`,
            onChangeFuncs: ["IsAlphaSpace"],
            disabled: masters.flags.DisableFlag,
            spacing: 3,
            error: masters.flags.QuoteError && dto.ProposerDetails.FirstName === "",
            errtext:
              masters.flags.QuoteError &&
              dto.ProposerDetails.FirstName === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Last Name",
            path: `ProposerDetails.LastName`,
            onChangeFuncs: ["IsAlphaSpace"],
            disabled: masters.flags.DisableFlag,
            spacing: 3,
            error: masters.flags.QuoteError && dto.ProposerDetails.LastName === "",
            errtext:
              masters.flags.QuoteError &&
              dto.ProposerDetails.LastName === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Email ID",
            visible: true,
            required: true,
            spacing: 3,
            path: `QuoteEmail`,
            disabled: masters.flags.DisableFlag,
            onBlurFuncs: ["IsEmail"],
            error: masters.flags.QuoteError && dto.QuoteEmail === "",
            errtext: masters.flags.QuoteError && dto.QuoteEmail === "" && "Please fill this Field",
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            required: true,
            spacing: 3,
            path: `QuoteMobileNo`,
            onChangeFuncs: ["IsNumeric"],
            InputProps: { maxLength: 10 },
            disabled: masters.flags.DisableFlag,
            onBlurFuncs: ["IsMobileNumber"],
            error: masters.flags.QuoteError && dto.QuoteMobileNo === "",
            errtext:
              masters.flags.QuoteError && dto.QuoteMobileNo === "" && "Please fill this Field",
          },
        ],
        [
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Policy Type",
            path: `CoverType`,
            options: masters.PolicyType,
            disabled: masters.flags.DisableFlag,
            customOnChange: (e, v) => handlePolicyType(e, v),
            error: masters.flags.QuoteError && dto.CoverType === "",
            errtext: masters.flags.QuoteError && dto.CoverType === "" && "Please fill this Field",
          },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Type of Cover",
            path: `Cover`,
            options: masters.CoverType,
            disabled: masters.flags.DisableFlag,
            customOnChange: (e, v) => handleCoverType(e, v),
            error: masters.flags.QuoteError && dto.PolicyType === "",
            errtext: masters.flags.QuoteError && dto.PolicyType === "" && "Please fill this Field",
          },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Sum Insured",
            path: `TotalSumInsured`,
            options: masters.SumInsureds,
            disabled: dto.PolicyType === "Standalone",
            InputProps: { disabled: dto.PolicyType === "Standalone" },
            customOnChange: (e, v) => handleSum(e, v),
            error: masters.flags.QuoteError && dto.TotalSumInsured === "",
            errtext:
              masters.flags.QuoteError && dto.TotalSumInsured === "" && "Please fill this Field",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Policy Tenure",
            path: `Policy Tenure`,
            InputProps: { maxLength: 2, disabled: true },
            disabled: true,
            onChangeFuncs: ["IsNumeric"],
            error: masters.flags.QuoteError && dto["Policy Tenure"] === "",
            errtext:
              masters.flags.QuoteError && dto["Policy Tenure"] === "" && "Please fill this Field",
          },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "No. of Member(s)",
            path: `NoofMembers`,
            options: masters.Members,
            disabled: dto.CoverType === "Individual" || masters.flags.DisableFlag,
            InputProps: { disabled: dto.CoverType === "Individual" },
            customOnChange: (e, v) => handleMemebers(e, v),
            error: masters.flags.QuoteError && dto.NoofMembers === "",
            errtext: masters.flags.QuoteError && dto.NoofMembers === "" && "Please fill this Field",
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            required: true,
            visible: masters.Dateflag === false,
            dateFormat: "Y-m-d",
            allowInput: true,
            path: `PolicyStartDate`,
            minDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            disabled: masters.flags.DisableFlag,
            customOnChange: (e, v) => handlePolDate(e, v),
            error: masters.flags.QuoteError && dto.PolicyStartDate === "",
            errtext:
              masters.flags.QuoteError && dto.PolicyStartDate === "" && "Please fill this Field",
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            required: true,
            visible: masters.Dateflag === true,
            dateFormat: "Y-m-d",
            allowInput: true,
            // disabled: true,
            // InputProps: { disabled: true },
            path: `PolicyStartDate`,
            // error: masters.flags.QuoteError && dto.PolicyEndDate === "",
            // errtext:
            //   masters.flags.QuoteError && dto.PolicyEndDate === "" && "Please fill this Field",
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            required: true,
            visible: true,
            dateFormat: "Y-m-d",
            disabled: true,
            InputProps: { disabled: true },
            // customOnChange: (date) => handlePolDate(date, "PolicyStartDate"),
            path: `PolicyEndDate`,
            error: masters.flags.QuoteError && dto.PolicyEndDate === "",
            errtext:
              masters.flags.QuoteError && dto.PolicyEndDate === "" && "Please fill this Field",
          },
        ],
        [
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Theft of Funds",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.5.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Theft", 5),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[5].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[5].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.5.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "TheftSumInsured", v, 5),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[5].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Identity Theft",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.4.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Indentity", 4),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[4].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[4].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.4.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "IndentitySumInsured", v, 4),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[4].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Data Restoration",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.3.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Data", 3),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[3].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[3].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.3.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "DataSumInsured", v, 3),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[3].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Cyber Bullying/Stalking/Loss of reputation",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.1.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Cyber", 1),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[1].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[1].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.1.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "CyberSumInsured", v, 1),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[1].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Cyber Extortion",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.0.IsOptional`,
            customOnChange: (e) => handleCovers(e, "CyberEx", 0),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[0].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[0].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.0.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "CyberExSumInsured", v, 0),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[0].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Online Shopping",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.2.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Online", 2),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[2].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[2].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.2.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "OnlineSumInsured", v, 2),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[2].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Online Sales",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.6.IsOptional`,
            customOnChange: (e) => handleCovers(e, "OnlineSales", 6),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[6].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[6].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.6.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "OnlineSaleSumInsured", v, 6),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[6].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Social Media/Media Liability",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.11.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Social", 11),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[11].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[11].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.11.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "SocialSumInsured", v, 11),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[11].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Network Security Liability",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.10.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Network", 10),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[10].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[10].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.10.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "NetworkSumInsured", v, 10),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[10].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Privacy Breach and Data Breach Liability",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.8.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Privacy", 8),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[8].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[8].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.8.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "PrivacySumInsured", v, 8),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[8].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Privacy Breach and Data Breach by Third Party",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.7.IsOptional`,
            customOnChange: (e) => handleCovers(e, "PrivacyThird", 7),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[7].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[7].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.7.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "PrivacyThirdSumInsured", v, 7),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[7].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "Checkbox",
            visible: masters.flags.CalPreBtn === false,
            label: "Smart Home Cover",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.9.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Smart", 9),
          },
          {
            type: "AutoComplete",
            visible:
              masters.flags.CalPreBtn === false &&
              dto.InsurableItem[0].Covers[9].IsOptional === "Yes" &&
              dto.PolicyType === "Standalone",
            required:
              dto.PolicyType === "Standalone" &&
              dto.InsurableItem[0].Covers[9].IsOptional === "Yes",
            label: "Sum Insured",
            path: `InsurableItem.0.Covers.9.SumInsured`,
            spacing: 3,
            options: masters.SumInsureds,
            customOnChange: (e, v) => onSI(e, "SmartSumInsured", v, 9),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing:
              dto.InsurableItem[0].Covers[9].IsOptional === "Yes" && dto.PolicyType === "Standalone"
                ? 6
                : 9,
            label: "",
          },
          {
            type: "RadioGroup",
            visible: masters.flags.CalPreBtn === false,
            required: true,
            radioLabel: {
              label: (
                <span style={{ fontWeight: "bold" }}>Do you want to opt for Deductibles?</span>
              ),
              variant: "h6",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: `Deductible`,
            customOnChange: handledeductible,
            spacing: 12,
            error: masters.flags.QuoteError && dto.Deductible === "",
            // || dto.Deductible === "Yes",

            errtext: masters.flags.QuoteError && dto.Deductible === "" && "Please fill this Field",
            // ||
            // (dto.Deductible === "Yes" && "5% of limit of indemnity for each and every claim"),
          },
          {
            type: "Typography",
            visible: masters.flags.CalPreBtn === false,
            spacing: 9.5,
            label: "",
          },
          {
            type: "Button",
            spacing: 2.5,
            justifyContent: "end",
            visible: masters.flags.CalPreBtn === false,
            label: "Calculate Premium",
            variant: "contained",
            onClick: Handlecalculate,
          },
          // {
          //   type: "Button",
          //   spacing: 2,
          //   visible: masters.flags.CalPreBtn === false,
          //   label: "Save ANd Exit",
          //   variant: "outlined",
          //   // onClick: Handlecalculate,
          // },
          {
            type: "Custom",
            visible: masters.flags.CalPreBtn,
            spacing: 12,
            return: (
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  style={{ position: "sticky", top: "0" }}
                >
                  <Stack direction="row" spacing={2}>
                    <Grid item md={10} mt={-0.5}>
                      <Tabs
                        value={masters.flags.activeTab}
                        onChange={handleTabChange}
                        // TabIndicatorProps={{
                        //   style: {
                        //     backgroundColor: "#c70825",
                        //   },
                        // }}
                      >
                        <Tab
                          label="Quote 1"
                          {...a11yProps(0)}
                          onClick={() => handelTab(0)}
                          style={
                            masters.flags.activeTab === 0
                              ? { backgroundColor: "#c70825", color: "#fff" }
                              : {}
                          }
                        />
                        {masters.flags.showTab && (
                          <Tab
                            label="Quote 2"
                            {...a11yProps(1)}
                            onClick={() => handelTab(1)}
                            style={
                              masters.flags.activeTab === 1
                                ? { backgroundColor: "#c70825", color: "#fff" }
                                : {}
                            }
                          />
                        )}
                        {masters.flags.showTabQ && (
                          <Tab
                            label="Quote 3"
                            {...a11yProps(2)}
                            onClick={() => handelTab(2)}
                            style={
                              masters.flags.activeTab === 2
                                ? { backgroundColor: "#c70825", color: "#fff" }
                                : {}
                            }
                          />
                        )}
                      </Tabs>
                    </Grid>
                    {!masters.flags.showButton && (
                      <MDButton
                        variant="contained"
                        startIcon={<AddIcon sx={{ ml: "1rem" }} />}
                        onClick={handleClickTab}
                        style={{ color: "white", backgroundColor: "black" }}
                      />
                    )}
                  </Stack>
                  <TabPanel value={masters.flags.activeTab} index={0}>
                    {/* {quote(0)} */}
                    <CyberQuote
                      dto={dto}
                      setDto={setDto}
                      masters={masters}
                      setMasters={setMasters}
                      ind={0}
                    />
                  </TabPanel>
                  <TabPanel value={masters.flags.activeTab} index={1}>
                    <CyberQuote
                      dto={dto}
                      setDto={setDto}
                      masters={masters}
                      setMasters={setMasters}
                      ind={1}
                    />
                  </TabPanel>
                  <TabPanel value={masters.flags.activeTab} index={2}>
                    <CyberQuote
                      dto={dto}
                      setDto={setDto}
                      masters={masters}
                      setMasters={setMasters}
                      ind={2}
                    />
                  </TabPanel>
                </Grid>
                <Grid item xs={12} sm={4} md={6} lg={6} xl={6} xxl={6}>
                  {/* <MDBox pt={1} sx={{ backgroundColor: "#b0e0e6" }} p={2}> */}
                  <MDBox pt={1} sx={{ backgroundColor: "#f2f2f2" }} p={2}>
                    <Grid px={1} spacing={1}>
                      <Table aria-label="simple table" mt="2%" sx={{ maxwidth: "100%" }}>
                        <TableRow tabIndex={-1}>
                          <TableCell style={{ borderBottom: "none" }} sx={{ fontWeight: "bold" }}>
                            Covers
                          </TableCell>
                          <TableCell
                            style={{
                              borderBottom: "none",
                              fontWeight: "bold",
                              textAlign: "right",
                            }}
                            sx={
                              masters.flags.selectedColumn === 0
                                ? { backgroundColor: "#c70825", color: "white !important" }
                                : {}
                            }
                          >
                            {" "}
                            Quote&nbsp;1
                          </TableCell>
                          {masters.flags.showColumnQ && (
                            <TableCell
                              style={{
                                borderBottom: "none",
                                fontWeight: "bold",
                                textAlign: "right",
                              }}
                              sx={
                                masters.flags.selectedColumn === 1
                                  ? { backgroundColor: "#c70825", color: "white !important" }
                                  : {}
                              }
                            >
                              {" "}
                              Quote&nbsp;2
                            </TableCell>
                          )}
                          {masters.flags.showColumnQo && (
                            <TableCell
                              style={{
                                borderBottom: "none",
                                fontWeight: "bold",
                                textAlign: "right",
                              }}
                              sx={
                                masters.flags.selectedColumn === 2
                                  ? { backgroundColor: "#c70825", color: "white !important" }
                                  : {}
                              }
                            >
                              {" "}
                              Quote&nbsp;3
                            </TableCell>
                          )}
                        </TableRow>
                        <TableBody>
                          {data1.map((item, i) => (
                            <TableRow>
                              <TableCell
                                style={{
                                  borderBottom: "none",
                                  fontWeight: i === 0 || i > 12 ? "bold" : "normal",
                                }}
                              >
                                {" "}
                                {item.label}
                              </TableCell>
                              <TableCell
                                style={{
                                  borderBottom: "none",
                                  textAlign: "right",
                                  fontWeight:
                                    item.name === "suminsured" ||
                                    item.name === "Final Premium" ||
                                    item.name === "GST" ||
                                    item.name === "Total Premium" ||
                                    item.name === "Discount" ||
                                    item.name === "Premium After Discount" ||
                                    item.name === "Discount in deductibles" ||
                                    item.name === "Premium After Deductibles"
                                      ? "bold"
                                      : "normal",
                                }}
                                sx={
                                  masters.flags.selectedColumn === 0
                                    ? { backgroundColor: "#c70825", color: "white !important" }
                                    : {}
                                }
                              >
                                {masters.Quotes[0][item.name] === "NA"
                                  ? masters.Quotes[0][item.name]
                                  : formatter.format(masters.Quotes[0][item.name])}
                              </TableCell>
                              {masters.flags.showColumnQ && (
                                <TableCell
                                  style={{
                                    borderBottom: "none",
                                    textAlign: "right",
                                    fontWeight:
                                      item.name === "suminsured" ||
                                      item.name === "Final Premium" ||
                                      item.name === "GST" ||
                                      item.name === "Total Premium" ||
                                      item.name === "Discount" ||
                                      item.name === "Premium After Discount" ||
                                      item.name === "Discount in deductibles" ||
                                      item.name === "Premium After Deductibles"
                                        ? "bold"
                                        : "normal",
                                  }}
                                  sx={
                                    masters.flags.selectedColumn === 1
                                      ? { backgroundColor: "#c70825", color: "white !important" }
                                      : {}
                                  }
                                >
                                  {masters.Quotes[1][item.name] === "NA"
                                    ? masters.Quotes[1][item.name]
                                    : formatter.format(masters.Quotes[1][item.name])}
                                </TableCell>
                              )}
                              {masters.flags.showColumnQo && (
                                <TableCell
                                  style={{
                                    borderBottom: "none",
                                    textAlign: "right",
                                    fontWeight:
                                      item.name === "suminsured" ||
                                      item.name === "Final Premium" ||
                                      item.name === "GST" ||
                                      item.name === "Total Premium" ||
                                      item.name === "Discount" ||
                                      item.name === "Premium After Discount" ||
                                      item.name === "Discount in deductibles" ||
                                      item.name === "Premium After Deductibles"
                                        ? "bold"
                                        : "normal",
                                  }}
                                  sx={
                                    masters.flags.selectedColumn === 2
                                      ? { backgroundColor: "#c70825", color: "white !important" }
                                      : {}
                                  }
                                >
                                  {masters.Quotes[2][item.name] === "NA"
                                    ? masters.Quotes[2][item.name]
                                    : formatter.format(masters.Quotes[2][item.name])}
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                    <Grid container justifyContent="space-between" my={2}>
                      {/* <MDButton variant="outlined" onClick={saveAndExit}>
                        Save & Exit
                      </MDButton> */}
                      <MDButton variant="outlined" onClick={DownloadQuote}>
                        Download Quote
                      </MDButton>
                      <MDButton variant="outlined" onClick={onShareQuote}>
                        share Quote
                      </MDButton>
                    </Grid>
                  </MDBox>
                </Grid>
                <Grid container justifyContent="right" my={2}>
                  <MDButton
                    variant="outlined"
                    style={{ marginRight: "16px" }}
                    onClick={CalculatePremium}
                  >
                    Calculate Premium
                  </MDButton>
                  <MDButton variant="outlined" onClick={saveAndExit}>
                    Save & Exit
                  </MDButton>
                </Grid>
              </Grid>
            ),
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Please Select Annual Income",
            path: "AnnualIncome",
            options: masters.AnnualIncome,
            spacing: 3,
          },
          {
            type: "Typography",
            visible: true,
            label: "",
            spacing: 9,
          },

          {
            type: "Typography",
            label: "Please State the device you Commonly use",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Mobile Phone",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 2.4,
            path: `AdditionalInformation.Device commonly used.Mobile Phone`,
            // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Laptop",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: `AdditionalInformation.Device commonly used.Laptop`,
            spacing: 2.4,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Tablet",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: `AdditionalInformation.Device commonly used.Tablet`,
            spacing: 2.4,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Smart-Watch",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: `AdditionalInformation.Device commonly used.Smart-Watch`,
            spacing: 2.4,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Other",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: `AdditionalInformation.Device commonly used.Other`,
            spacing: 2.4,
          },
          {
            type: "Typography",
            visible: true,
            label:
              "Please Confirm if you have Anti-virus software installed on your commonly used devices?",
            spacing: 10,
            variant: "h6",
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: `AdditionalInformation.Antivirus Installed`,
            spacing: 2,
            // customOnChange: (e) => onSameAddress(e),
          },
          {
            type: "Typography",
            visible: true,
            label:
              "Please Confirm if you maintain confidentiality of your passwords and regularly change your passwords.",
            spacing: 10,
            variant: "h6",
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: `AdditionalInformation.Regular change of password`,
            spacing: 2,
            // customOnChange: (e) => onSameAddress(e),
          },
          {
            type: "Typography",
            visible: true,
            label: "Please confirm if you do data back up after every 14 calendar days.",
            spacing: 10,
            variant: "h6",
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: `AdditionalInformation.Data backup`,
            spacing: 2,
            // customOnChange: (e) => onSameAddress(e),
          },
          {
            type: "Typography",
            visible: true,
            label:
              "Security incident and loss history Are you or your family (if applicable) aware of any incidents or circumstances (currently or in the recent past) which is likely to lead to you suffering a loss or a claim being made against you which would be covered under any of the sections of this policy you are applying for? If yes, please provide details of the incidents.",
            spacing: 10,
            variant: "h6",
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: `AdditionalInformation.Security Incident and Loss history`,
            spacing: 2,
            // customOnChange: (e) => onSameAddress(e),
          },
          {
            type: "Typography",
            visible: dto.AdditionalInformation["Security Incident and Loss history"] === "Yes",
            label: "",
            spacing: 10,
          },
          {
            type: "Input",
            visible: dto.AdditionalInformation["Security Incident and Loss history"] === "Yes",
            required: dto.AdditionalInformation["Security Incident and Loss history"] === "Yes",
            label: "Incidents Information",
            // sx: { mt: -30 },
            // justifyContent: "end",
            spacing: 2,
            path: `AdditionalInformation.Incident`,
          },

          {
            type: "Typography",
            visible: true,
            label: "Is proposer same as insured?",
            spacing: 10,
            variant: "h6",
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: `Is proposer same as Insured`,
            spacing: 2,
            customOnChange: (e) => onInsuredDetails(e),
          },
        ],
        ...spreedInsurersComponents(),
      ];
      break;
    case 2:
      data = ProposalDetails({
        dto,
        setDto,
        masters,
        setMasters,
      });
      break;
    case 3:
      data = [
        [
          {
            type: "Typography",
            visible: true,
            label: "",
            spacing: 3,
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "Payment Type", labelVisible: true },
            radioList: [
              { value: "ClientPayment", label: "Client Payment" },
              { value: "AgentPayment", label: "Agent Payment" },
            ],
            path: "PaymentDetails.paymentType",
            spacing: 6,
          },
          {
            type: "Custom",
            visible:
              dto.PaymentDetails.paymentType === "ClientPayment" ||
              dto.PaymentDetails.paymentType === "AgentPayment",
            spacing: 12,
            return: <Payment dto={dto} setDto={setDto} masters={masters} setMasters={setMasters} />,
          },
        ],
      ];
      break;
    case 4:
      data = [[], [], []];
      break;

    default:
      data = [];
  }

  return data;
};

const getOnNextClick = async ({
  dto,
  masters,
  setMasters,
  setDto,
  activeStep,
  setBackDropFlag,
}) => {
  const lDto = dto;
  const lMasters = masters;
  let selfSelected = false;
  let spouse = false;
  let child1 = false;
  let child2 = false;
  let fun = true;
  // let count = 0;
  // let c = "";
  // let sum = "";
  let selfcount = 0;
  let suposecount = 0;
  let child1count = 0;
  let child2count = 0;
  // let lActiveStep = activeStep;
  // const { search } = useLocation();
  // const proposalNoo = new URLSearchParams(search).get("proposernum");
  // lActiveStep = proposalNoo !== null ? 2 : 0;
  switch (activeStep) {
    case 0:
      // lDto.InsurableItem[0].Covers.forEach((x) => {
      //   const suminsure = x;
      //   if (suminsure.IsOptional === "Yes") {
      //     count += 1;
      //     sum = suminsure.SumInsured;
      //   }
      // });
      // c = String(count);
      if (
        masters.Quotes[masters.flags.activeTab]["Final Premium"] === 0 ||
        dto.PremiumDetails["Total with Tax"] === "0" ||
        // lDto.InsurableItem[0].Covers.some((x) => x.IsOptional === "Yes" && x.SumInsured === "") ||
        lMasters?.Quotations?.[lMasters.flags.activeTab]?.InsurableItem?.[0]?.Covers.filter(
          (x) => x.IsOptional === "Yes"
        ).length !== lDto.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length ||
        masters.editflag === true
      ) {
        fun = false;
        swal({ icon: "error", text: "Please click on Calculate Premium" });
      } else {
        setBackDropFlag(true);
        // lMasters.flags.DisableFlag = true;
        lDto.ProposerDetails["First Name"] = lDto.ProposerDetails.FirstName;
        lDto.ProposerDetails["Last Name"] = lDto.ProposerDetails.LastName;
        await callUpdateQuoteMethod(dto).then(async () => {
          const jsonValue = {
            communicationId: 233,
            keyType: "BGRQuote",
            key: dto["Quotation No"],
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: dto.QuoteEmail,
              },
            ],
          };
          const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
          console.log("mail", mail);
          const MobileNo = dto.QuoteMobileNo;
          const Message = `Dear Customer,Based on your requirements, CyberRetail Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
          await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
            console.log("1234567890", smsResp);
          });
          const downloadDTO = {
            key: dto["Quotation No"],
            templateId: 237,
            referenceId: "",
          };
          await downloadQuote(downloadDTO);
        });
        setBackDropFlag(false);
        if (dto["Is proposer same as Insured"] === "Yes") {
          lDto.InsurableItem[0].RiskItems[0]["First Name"] = dto.ProposerDetails.FirstName;
          lDto.InsurableItem[0].RiskItems[0]["Last Name"] = dto.ProposerDetails.LastName;
        }
        fun = true;
      }
      break;
    case 1:
      selfcount = lDto?.InsurableItem[0]?.RiskItems?.filter(
        (item) => item.Relationship === "Self"
      ).length;
      if (selfcount <= 1) {
        selfSelected = false;
      } else {
        selfSelected = true;
      }
      suposecount = lDto?.InsurableItem[0]?.RiskItems?.filter(
        (item) => item.Relationship === "Spouse"
      ).length;
      if (suposecount <= 1) {
        spouse = false;
      } else {
        spouse = true;
      }
      child1count = lDto?.InsurableItem[0]?.RiskItems?.filter(
        (item) => item.Relationship === "Child 1"
      ).length;
      if (child1count <= 1) {
        child1 = false;
      } else {
        child1 = true;
      }
      child2count = lDto?.InsurableItem[0]?.RiskItems?.filter(
        (item) => item.Relationship === "Child 2"
      ).length;
      if (child2count <= 1) {
        child2 = false;
      } else {
        child2 = true;
      }
      if (
        dto.AdditionalInformation["Device commonly used"]["Mobile Phone"] === "No" &&
        dto.AdditionalInformation["Device commonly used"].Laptop === "No" &&
        dto.AdditionalInformation["Device commonly used"].Tablet === "No" &&
        dto.AdditionalInformation["Device commonly used"]["Smart-Watch"] === "No" &&
        dto.AdditionalInformation["Device commonly used"].Other === "No"
      ) {
        fun = false;
        swal({ icon: "error", text: "Please Select any one Device Commonly Used" });
      } else if (selfSelected) {
        fun = false;
        lDto?.InsurableItem[0]?.RiskItems?.forEach((x) => {
          const item = x;
          if (item.Relationship === "Self") {
            item.Relationship = "";
          }
        });
        swal({ icon: "error", text: "Self is already Selected" });
      } else if (spouse) {
        fun = false;
        lDto?.InsurableItem[0]?.RiskItems?.forEach((x) => {
          const item = x;
          if (item.Relationship === "Spouse") {
            item.Relationship = "";
          }
        });
        swal({ icon: "error", text: "Spouse is already Selected" });
      } else if (child1) {
        fun = false;
        lDto?.InsurableItem[0]?.RiskItems?.forEach((x) => {
          const item = x;
          if (item.Relationship === "Child 1") {
            item.Relationship = "";
          }
        });
        swal({ icon: "error", text: "Child 1 is already Selected" });
      } else if (child2) {
        fun = false;
        lDto?.InsurableItem[0]?.RiskItems?.forEach((x) => {
          const item = x;
          if (item.Relationship === "Child 2") {
            item.Relationship = "";
          }
        });
        swal({ icon: "error", text: "Child 2 is already Selected" });
      }
      lDto?.InsurableItem[0]?.RiskItems?.forEach((x, i) => {
        const datebirth = x;
        if (
          dto.InsurableItem[0].RiskItems[i].Age < 18 &&
          datebirth.Relationship !== "Child 1" &&
          datebirth.Relationship !== "Child 2"
        ) {
          fun = false;
          swal({ icon: "error", text: "Age should not be less than 18" });
          datebirth.DOB = "";
        }
      });

      // } else {
      // lDto?.InsurableItem[0]?.RiskItems?.forEach((x, i) => {
      //   const datebirth = x;
      //   if (
      //     dto.InsurableItem[0].RiskItems[i].Age < 18 &&
      //     datebirth.Relationship !== "Child 1" &&
      //     datebirth.Relationship !== "Child 2"
      //   ) {
      //     fun = false;
      //     swal({ icon: "error", text: "Age should not be less than 18" });
      //     datebirth.DOB = "";
      //   }
      // });
      // }
      // else {
      //   fun = true;
      // }
      setDto({ ...lDto });
      break;
    case 2:
      lDto.ProposerDetails.Name = `${lDto.ProposerDetails["First Name"]} ${lDto.ProposerDetails["Last Name"]}`;
      if (dto?.ProposalConsent?.ProposalConsentCheck !== true) {
        fun = false;
        swal({
          icon: "error",
          text: "Please check Proposal Consent",
        });
      } else if (masters.proposerProps.otpflag === false) {
        fun = false;
        swal({
          icon: "error",
          text: "Please verify Otp",
        });
      } else if (
        dto?.ProposalConsent?.CheckCond1 !== true ||
        dto?.ProposalConsent?.CheckCond2 !== true
      ) {
        fun = false;
        swal({ icon: "error", text: "Please check Proposal Consent conditions" });
      } else if (dto.CkycStatus === "failure") {
        swal({ icon: "error", text: "CKYC is Failure" });
        fun = false;
      } else if (dto.CkycStatus === "") {
        fun = false;
        swal({ icon: "error", text: "Initiate CKYC" });
      } else if (dto.CkycStatus === "success") {
        // if (dto.proposalNumber === "") {
        // const age = AgeCalculator(new Date(dto?.ProposalDetails?.DOB));
        // lDto.ProposalDetails.Age = age;
        // setDto({ ...lDto });
        setBackDropFlag(true);
        const res = await calculateProposal(dto);
        console.log("res", res);
        lDto.proposalNumber = res?.data?.proposalNumber;
        lDto.ProposalNo = res?.data?.proposalNumber;
        lMasters.SavePymtDTO.proposalNo = res?.data?.proposalNumber;
        setDto({ ...lDto });
        setMasters({ ...lMasters });
        // } else {
        //   await postRequest(`Policy/UpdateProposalDetails`, dto);
        // }
        if (dto && dto.proposalNumber && dto.proposalNumber !== "") {
          const res1 = await fetchPaymentURL(
            1174,
            dto.proposalNumber,
            dto.PremiumDetails["Total with Tax"]
          );
          lDto.TransactionID = res1.transactionID;
          lMasters.SavePymtDTO.paymentDetailsDTO.transactionNo = res1.transactionID;
          lDto.PaymentDetails.paymentRefNo = res1.paymentRefNo;
          lMasters.bodyData.firstname = dto.ProposerDetails.FirstName;
          lMasters.bodyData.email = dto.ProposerDetails["Email ID"];
          lMasters.bodyData.phone = dto.ProposerDetails["Mobile Number"];
          lMasters.bodyData.txnid = res1.transactionID;
          lMasters.bodyData.amount = dto.PremiumDetails["Total with Tax"];
          lMasters.bodyData.surl = res1.surl;
          lMasters.bodyData.furl = res1.furl;
          setDto({ ...lDto });
          setMasters({ ...lMasters });

          await callUpdateQuoteMethod(dto);
        }
        setDto({ ...lDto });
        const jsonValue = {
          communicationId: 245,
          keyType: "BGRProposal",
          key: dto.proposalNumber,
          stakeHolderDetails: [
            {
              communicationType: "Email",
              stakeholderCode: "CUS",
              communicationValue: dto.QuoteEmail,
            },
          ],
        };
        const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
        console.log("mail", mail);
        const MobileNo = dto.QuoteMobileNo;
        const Message = `Dear Customer,Based on your requirements, UNIVERSAL SOMPO - CYBER RETAIL Insurance has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
        await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
          console.log("1234567890", smsResp);
        });
        const downloadDTO = {
          key: dto && dto.proposalNumber,
          templateId: 261,
          referenceId: "",
        };
        await downloadQuote(downloadDTO);
        setBackDropFlag(false);
        fun = true;
      }
      break;
    case 3:
      // if (
      //   dto.PaymentDetails.ChequeAmount === "" ||
      //   dto.PaymentDetails.InstrumentNo === "" ||
      //   dto.PaymentDetails.InstrumentDate === "" ||
      //   dto.PaymentDetails.BankName === ""
      // ) {
      //   lMasters.errorFlag = true;
      //   setMasters({ ...lMasters });
      //   fun = false;
      //   setBackDropFlag(true);
      // } else if (dto.PaymentDetails.ModeOfPayment === "Cheque") {
      //   const res = await SavePaymentdetails(masters.SavePymtDTO);
      //   const jsonValue = {
      //     communicationId: 235,
      //     keyType: "BGRPolicy",
      //     key: res.data.id,
      //     stakeHolderDetails: [
      //       {
      //         communicationType: "Email",
      //         stakeholderCode: "CUS",
      //         communicationValue: dto.QuoteEmail,
      //       },
      //     ],
      //   };
      //   const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
      //   console.log("mail", mail);
      //   const MobileNo = dto.quoteMobileNo;
      //   const Message = `Dear Customer,Welcome to USGI Family. Your UNIVERSAL SOMPO - BUSINESS SHIELD-SOOKSHMA UDYAM INSURANCE has been issued with policy no. ${
      //     res.data.id
      //   } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;

      //   await getRequest(
      //     `WCFExtension/SendSms?ICProductName=usgi&MobileNo=${MobileNo}&Message=${Message}`
      //   );
      //   const downloadDTO = {
      //     key: res.data.id,
      //     templateId: 243,
      //     referenceId: "",
      //   };
      //   await downloadQuote(downloadDTO);
      //   if (res.data.status === 1) {
      //     fun = true;
      //     topNavigate(
      //       `/Home/PaymentSuccess?backURL=&PaymentRefNo=${dto?.PaymentDetails?.paymentRefNo}`
      //     );
      //   } else {
      //     fun = true;
      //     topNavigate(`/Home/PaymentFailure}`);
      //   }
      // }
      // setBackDropFlag(false);
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
  // Restrict back button by shreya
  const { search } = useLocation();
  const stepNo = new URLSearchParams(search).get("acstep");
  //
  // let lActiveStep = activeStep;
  // const { search } = useLocation();
  // const proposalNoo = new URLSearchParams(search).get("proposernum");
  // lActiveStep = proposalNoo !== null ? 2 : 0;
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed",
          visible: true,
          variant: "contained",
          loader: "backDrop",
        },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Back", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed to Proposal",
          visible: true,
          variant: "contained",
        },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Back", visible: stepNo !== "2" },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true, variant: "contained", loader: "backDrop" },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Make Payment",
          visible: false,
          variant: "contained",
        },
      };
      break;
    case 4:
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
  const mst = {
    tabIndex: 0,
    Covers: [],
    Quotations: [],
    Risks: [
      {
        agebelow18: false,
        nomineeage: false,
      },
    ],
    Dateflag: false,
    selectionModel: [],
    editflag: false,
    flags: {
      DisableFlag: false,
      QuoteError: false,
      cancelIcon: false,
      activeTab: 0,
      clicks: 0,
      showTab: false,
      showTabQ: false,
      selectedColumn: null,
      showColumnQ: false,
      showColumnQo: false,
      showButton: false,
      CalPreBtn: false,
      Tieinflag: false,
      dob: false,
    },
    var: { status: "" },
    QuoteIndex: 0,
    // TotalSum: "",
    Quotes: [
      {
        Theft: "No",
        TheftSumInsured: "",
        Indentity: "No",
        IndentitySumInsured: "",
        Data: "No",
        DataSumInsured: "",
        Cyber: "No",
        CyberSumInsured: "",
        CyberEx: "No",
        CyberExSumInsured: "",
        Online: "No",
        OnlineSumInsured: "",
        OnlineSales: "No",
        OnlineSaleSumInsured: "",
        Social: "No",
        SocialSumInsured: "",
        Network: "No",
        NetworkSumInsured: "",
        Privacy: "No",
        PrivacySumInsured: "",
        PrivacyThird: "No",
        PrivacyThirdSumInsured: "",
        Smart: "No",
        SmartSumInsured: "",
        TotalSumInsured: "",
        TotalSum: "",
        Deductible: "Yes",
        "Theft of Funds": 0,
        "Indentity Theft": 0,
        "Data Restoration": 0,
        "Cyber Bullying": 0,
        "Cyber Extortion": 0,
        "Online Shopping": 0,
        "Online Sales": 0,
        "Social Media": 0,
        "Network Security": 0,
        "Privacy Breach": 0,
        "Privacy Third": 0,
        "Smart Home": 0,
        GST: 0,
        Discount: 0,
        "Premium After Discount": 0,
        "Discount in deductibles": 0,
        "Premium After Deductibles": 0,
        "Total Premium": 0,
        "Final Premium": 0,
        suminsured: 0,
      },
      {
        Theft: "No",
        TheftSumInsured: "",
        Indentity: "No",
        IndentitySumInsured: "",
        Data: "No",
        DataSumInsured: "",
        Cyber: "No",
        CyberSumInsured: "",
        CyberEx: "No",
        CyberExSumInsured: "",
        Online: "No",
        OnlineSumInsured: "",
        OnlineSales: "No",
        OnlineSaleSumInsured: "",
        Social: "No",
        SocialSumInsured: "",
        Network: "No",
        NetworkSumInsured: "",
        Privacy: "No",
        PrivacySumInsured: "",
        PrivacyThird: "No",
        PrivacyThirdSumInsured: "",
        Smart: "No",
        SmartSumInsured: "",
        TotalSumInsured: "",
        TotalSum: "",
        Deductible: "Yes",
        "Theft of Funds": 0,
        "Indentity Theft": 0,
        "Data Restoration": 0,
        "Cyber Bullying": 0,
        "Cyber Extortion": 0,
        "Online Shopping": 0,
        "Online Sales": 0,
        "Social Media": 0,
        "Network Security": 0,
        "Privacy Breach": 0,
        "Privacy Third": 0,
        "Smart Home": 0,
        GST: 0,
        Discount: 0,
        "Premium After Discount": 0,
        "Discount in deductibles": 0,
        "Premium After Deductibles": 0,
        "Total Premium": 0,
        "Final Premium": 0,
        suminsured: 0,
      },
      {
        Theft: "No",
        TheftSumInsured: "",
        Indentity: "No",
        IndentitySumInsured: "",
        Data: "No",
        DataSumInsured: "",
        Cyber: "No",
        CyberSumInsured: "",
        CyberEx: "No",
        CyberExSumInsured: "",
        Online: "No",
        OnlineSumInsured: "",
        OnlineSales: "No",
        OnlineSaleSumInsured: "",
        Social: "No",
        SocialSumInsured: "",
        Network: "No",
        NetworkSumInsured: "",
        Privacy: "No",
        PrivacySumInsured: "",
        PrivacyThird: "No",
        PrivacyThirdSumInsured: "",
        Smart: "No",
        SmartSumInsured: "",
        TotalSumInsured: "",
        TotalSum: "",
        Deductible: "Yes",
        "Theft of Funds": 0,
        "Indentity Theft": 0,
        "Data Restoration": 0,
        "Cyber Bullying": 0,
        "Cyber Extortion": 0,
        "Online Shopping": 0,
        "Online Sales": 0,
        "Social Media": 0,
        "Network Security": 0,
        "Privacy Breach": 0,
        "Privacy Third": 0,
        "Smart Home": 0,
        GST: 0,
        Discount: 0,
        "Premium After Discount": 0,
        "Discount in deductibles": 0,
        "Premium After Deductibles": 0,
        "Total Premium": 0,
        "Final Premium": 0,
        suminsured: 0,
      },
    ],
    CkycParams: [
      { mID: 1, mValue: "PAN Number" },
      { mID: 2, mValue: "Aadhaar Number" },
    ],
    PaymentPage: {
      cheque: false,
      online: false,
      email: false,
      disabledcheque: false,
      disabledonline: false,
      disabledemail: false,
    },
    proposerProps: {
      tabIndex: 0,
      cancelIcon: false,
      var: { status: "" },
      commCD: "",
      permCD: "",
      sendOtpFlag: true,
      timerFlag: false,
      counter: 30,
      status: false,
      pincodeflag: false,
      startCounterFlag: false,
      otpflag: false,
      panflag: false,
      gstflag: false,
      cinflag: false,
    },
    bodyData: {
      key: "7Y4RPX",
      txnid: "",
      amount: "",
      productinfo: "CyberRetail",
      firstname: "",
      email: "",
      phone: "",
      surl: "https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0077/00/000",
      furl: "/paymentfailure",
      salt: "hl8aISlY",
    },

    SavePymtDTO: {
      paymentDetailsDTO: {
        ChequeAmount: "",
        InstrumentNo: "",
        InstrumentDate: "",
        BankName: "",
        transactionNo: "",
        paymentSource: "CHEQUE",
        paymentId: "",
        paymentResponse: "",
      },
      proposalNo: "",
      policyNo: "",
    },
  };
  const policy = await GetProdPartnermasterData(1174, "PolicyType", {
    MasterType: "PolicyType",
  });
  mst.PolicyType = policy;
  const covers = await GetProdPartnermasterData(1174, "TypeofCovers", {
    MasterType: "TypeofCovers",
  });
  mst.CoverType = covers;
  const sum = await GetProdPartnermasterData(1174, "SumInsured", {
    MasterType: "SumInsured",
  });
  mst.SumInsureds = sum;
  const Noofmembers = await GetProdPartnermasterData(1174, "NoofMembers", {
    MasterType: "NoofMembers",
  });
  mst.Members = Noofmembers;
  const Annual = await GetProdPartnermasterData(1174, "AnnualIncome", {
    MasterType: "AnnualIncome",
  });
  mst.AnnualIncome = Annual;
  const Occupation = await GetProdPartnermasterData(1174, "CyberOccupation", {
    MasterType: "CyberOccupation",
  });
  mst.CyberOccupation = Occupation;
  const Relationship = await GetProdPartnermasterData(1174, "CyberRelationship", {
    MasterType: "CyberRelationship",
  });
  mst.CyberRelationship = Relationship;
  const Operating = await GetProdPartnermasterData(1174, "OperatingSystem", {
    MasterType: "OperatingSystem",
  });
  mst.OperatingSystem = Operating;
  const NomineeRelation = await GetProdPartnermasterData(918, "NomineeRelationShip", {
    MasterType: "NomineeRelationShip",
  });
  mst.NomineeRelationShip = NomineeRelation;
  const sal = await GetProdPartnermasterData(1037, "Salutation", { MasterType: "Salutation" });
  mst.Salutation = sal;
  const gen = await GetProdPartnermasterData(1037, "Gender", { MasterType: "Gender" });
  mst.Gender = gen;
  const doc = await GetProdPartnermasterData(1037, "DocumentsNameWC", {
    MasterType: "DocumentsNameWC",
  });
  mst.doc = doc;
  // const HypothecationCPM = await GetProdPartnermasterData(1039, "HypothecationCPM", {
  //   MasterType: "HypothecationCPM",
  // });
  // mst.HypothecationCPM = HypothecationCPM;
  const VerticalName = await NSTPPincodeData(782, "VerticalName", { MasterType: "VerticalName" });
  mst.VerticalName = VerticalName.data;
  // await getProductJsonV2(1174).then((x) => {
  //   mst.Covers = x.finalResult.productInsurableItems[0].productCovers;
  // });

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
