// import Swal from "sweetalert2";
import swal from "sweetalert";
import React, { useEffect } from "react";
// useState
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
// import InfoIcon from "@mui/icons-material/Info";
// import CancelIcon from "@mui/icons-material/Cancel";
import PropTypes from "prop-types";
import { addMonths } from "date-fns";
import MDDatePicker from "components/MDDatePicker";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// import { useNavigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Grid,
  // Card,
  // IconButton,
  // FormControlLabel,
  Box,
  TableRow,
  Table,
  Tab,
  TableBody,
  TableCell,
  Tabs,
  Autocomplete,
  Backdrop,
  CircularProgress,
  TextField,
  // Modal,
  // Box,
  // Stack,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { postRequest, getRequest } from "core/clients/axiosclient";
import { PolicyJson } from "./data/Json/ShopKeeper";
import {
  IsNumeric,
  addDays,
  IsAlphaNum,
  IsAlphaNumSpace,
  AgeCalculator,
} from "../../../../../../Common/Validations";
import MDButton from "../../../../../../components/MDButton";
import Payment from "./components/Payment";
import { GetProposalByNumber } from "../../../BLUS/data/index";

import {
  // getCkycDetails,
  GetProdPartnermasterData,
  // DocumenUpload,
  calculateProposal,
  callSaveQuoteMethod,
  callUpdateQuoteMethod,
  downloadQuote,
  getPincodeDetails,
  NSTPPincodeData,
  fetchPaymentURL,
  // SavePaymentdetails,
  SendSMS,
  SKproposerEamil,
  // policyEmailShopkeeper,
  getQuoteSummary,
} from "./data/APIs/USGIWCApi";
import { formatPolDate, formatDateKYC } from "./data/Json/USGIWCJson";

import { Quotations } from "../../data/Apis";
import ProposalDetails from "./components/ProposalDetails";
// import AllRiskSection from "./components/PackageSections/AllRiskSection";
// import Delete from "./components/PackageSections/Delete";
// import ElectronicEquipment from "./components/PackageSections/ElectronicEquipment";
// import BreakdownofBusinessEquipment from "./components/PackageSections/BreakdownofBusinessEquipment";
// import FidelityGuarantee from "./components/PackageSections/FidelityGuarantee";
// import PublicLiability from "./components/PackageSections/PublicLiability";

// import PlateGlass from "./components/PackageSections/PlateGlass";

// import Quotes from "./components/Quotes";

const nstpVal = "Policy is subject to Underwriter Approval";
const genVal = "Please fill all required fields*";
const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};

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

const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const data1 = [
  // { label: "Total SI", name: "TotalSI" },
  // { label: "Add-on Premium", name: "AddOnPremium" },

  // { label: "Net Premium", name: "NetPremium" },
  { label: "Gross Premium", name: "GrossPremium" },
  // { label: "Discount", name: "DiscountAmount" },
  // { label: "Loading", name: "LoadingAmount" },
  // { label: "CGST", name: "CGST" },
  // { label: "SGST", name: "SGST" },
  { label: "GST", name: "GST" },

  { label: "Total Premium", name: "TotalPremium" },
];
const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};
// let topNavigate = null;
const getProcessSteps = () => {
  const steps = ["Quotation", "Full Quote", "Proposer Details", "Payment Details"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "", visible: true, defaultExpanded: true },
        // { name: "Risk Details", visible: true, defaultExpanded: true },
        // { name: "Additional Sections (Optional)", visible: true, defaultExpanded: true },
        // { name: "Additional Sections (Optional)", visible: true, defaultExpanded: true },
      ];
      break;
    case 1:
      steps = [
        {
          name: "All Risk Section (Portable equipments like Laptops,Mobile Phones etc.)",
          visible: true,
          defaultExpanded: true,
        },
        { name: "Plate Glass and Neon Signs/Glow Signs", visible: true, defaultExpanded: true },
        { name: "Electronic Equipment", visible: true, defaultExpanded: true },
        { name: "Breakdown of Business Equipment", visible: true, defaultExpanded: true },
        { name: "Fidelity Guarantee", visible: true, defaultExpanded: true },
        { name: "Personal Accident", visible: true, defaultExpanded: true },
        { name: "Public Liabiity", visible: true, defaultExpanded: true },
      ];
      break;
    case 2:
      steps = [
        { name: "", visible: true, defaultExpanded: true },
        { name: "Proposer Details", visible: true, defaultExpanded: true },
        { name: "CKYC/Permanent Address", visible: true, defaultExpanded: true },
        { name: "Communication Address", visible: true, defaultExpanded: true },
        { name: "Other Details", visible: true, defaultExpanded: true },
        { name: "Hypothecation", visible: true, defaultExpanded: true },
        { name: "Document Details", visible: true, defaultExpanded: true },
        { name: "Proposal Consent", visible: true, defaultExpanded: true },
      ];
      break;
    case 3:
      steps = [{ name: "", visible: true, defaultExpanded: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters }) => {
  let data = [];
  const lDto = dto;
  const lMasters = masters;

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

  const handlePolDate = (e) => {
    lDto.PolicyStartDate = formatPolDate(e);
    const psd1 = formatPolDate(e).split("-");
    const nod1 = addDays(`${psd1[1]}-${psd1[2]}-${psd1[0]}`, 365).split("-");
    lDto.PolicyEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
    setDto({ ...lDto });
  };

  const EmailValidation = (value) => {
    // const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i;
    if (regex.test(value)) {
      return true;
    }
    return "Not a valid Email";
  };

  const onAuto1 = (e, v, name) => {
    if (v && name === "Burglary") {
      lDto.InsurableItem[0].Covers[3].BR_FLBPercent = v.mValue.slice(0, -1);
      lDto.InsurableItem[0].Covers[3].IsOptional = true;
      lMasters.flags.editval = false;
      const FL = Number(v.mValue.slice(0, -1));
      lDto.InsurableItem[0].Covers[3].SI =
        (FL * dto.PlantMachinerySI +
          FL * dto.FurnitureFixtureFSI +
          FL * dto.RawSI +
          FL * dto.StockinProgressSI +
          FL * dto.FinishStockSI +
          FL * dto.OtherContentSI) /
        100;
    } else {
      lDto.InsurableItem[0].Covers[3].BR_FLBPercent = "";
      lDto.InsurableItem[0].Covers[3].IsOptional = false;
      lDto.InsurableItem[0].Covers[3].SI = "";
    }
    setDto({ ...lDto });
  };

  const onAuto2 = (e, v, name) => {
    // lMasters.err.BagSI = false;
    if (v && name === "BagSI") {
      lDto.InsurableItem[0].Covers[6].BagSI = v.mValue.replace(/,/g, "");
      lDto.InsurableItem[0].Covers[6].IsOptional = true;

      lMasters.flags.editval = false;
      // } else {
      //   lDto.InsurableItem[0].Covers[6].BagSI = "";
    } else if (name === "BagSI" && lDto.InsurableItem[0].Covers[6].BagNoOfEmployees === "") {
      lDto.InsurableItem[0].Covers[6].IsOptional = false;

      lDto.InsurableItem[0].Covers[6].BagSI = "";
    } else {
      lDto.InsurableItem[0].Covers[6].BagSI = "";
    }
    // if (name === "BagSI" && lDto.InsurableItem[0].Covers[6].BagNoOfEmployees === "") {
    //   lDto.InsurableItem[0].Covers[6].IsOptional = false;
    //   // lMasters.err.BagSI = true;
    // }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const onAuto4 = (e, v, name) => {
    if (v && name === "PASI") {
      lDto.InsurableItem[0].Covers[13].PASI = v.mValue.replace(/,/g, "");
      lDto.InsurableItem[0].Covers[13].IsOptional = true;
    } else if (
      dto.InsurableItem[0].Covers[13].IsOptional &&
      lDto.InsurableItem[0].Covers[13].PANOfEmployees === "" &&
      lDto.InsurableItem[0].Covers[13].PACategory === ""
    ) {
      lDto.InsurableItem[0].Covers[13].IsOptional = false;
      lDto.InsurableItem[0].Covers[13].PASI = "";
    } else {
      // lDto.InsurableItem[0].Covers[13].IsOptional = false;
      lDto.InsurableItem[0].Covers[13].PASI = "";
    }
    setDto({ ...lDto });
  };

  const onAuto3 = (e, v, name) => {
    if (v && name === "PACategory") {
      lDto.InsurableItem[0].Covers[13].PACategory = v.mValue;
      lDto.InsurableItem[0].Covers[13].IsOptional = true;
      lMasters.flags.editval = false;
    } else if (
      dto.InsurableItem[0].Covers[13].IsOptional &&
      lDto.InsurableItem[0].Covers[13].PANOfEmployees === "" &&
      lDto.InsurableItem[0].Covers[13].PASI === ""
    ) {
      lDto.InsurableItem[0].Covers[13].IsOptional = false;
      lDto.InsurableItem[0].Covers[13].PACategory = "";
    } else {
      // lDto.InsurableItem[0].Covers[13].IsOptional = false;
      lDto.InsurableItem[0].Covers[13].PACategory = "";
    }
    setDto({ ...lDto });
  };

  const onAuto5 = (e, v, name) => {
    if (v && name === "ClaimsRatio") {
      lDto.ClaimsRatio = v.mValue;
      lMasters.flags.editval = false;
    } else {
      lDto.ClaimsRatio = "";
    }
    lMasters.err.ClaimsRatio = false;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const onAuto6 = (e, v, name) => {
    if (v && name === "BasementExposure") {
      lDto.BasementExposure = v.mValue;
      lMasters.flags.editval = false;
    } else {
      lDto.BasementExposure = "";
    }
    lMasters.err.BasementExposure = false;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const onInputMoneySection = (e, name, i) => {
    if (e.target.value !== "" && Number(e.target.value) > 0) {
      if (name === "CashinSafeSI") {
        lDto.InsurableItem[0].Covers[7].CashinSafeSI = e.target.value;
        lMasters.flags.editval = false;
        lDto.InsurableItem[0].Covers[7].IsOptional = true;
      } else if (name === "MoneyInTransitSI") {
        lDto.InsurableItem[0].Covers[7].MoneyInTransitSI = e.target.value;
        lMasters.flags.editval = false;
        lDto.InsurableItem[0].Covers[7].IsOptional = true;
      } else if (name === "SingleCarryingLimit") {
        lDto.InsurableItem[0].Covers[7].SingleCarryingLimit = e.target.value;
        lMasters.flags.editval = false;
        lDto.InsurableItem[0].Covers[7].IsOptional = true;
      } else {
        lDto.InsurableItem[0].Covers[i][name] = e.target.value;
        lDto.InsurableItem[0].Covers[i].IsOptional = true;
        lMasters.flags.editval = false;
      }
    } else if (
      dto.InsurableItem[0].Covers[7].IsOptional &&
      lDto.InsurableItem[0].Covers[7].SingleCarryingLimit === "" &&
      lDto.InsurableItem[0].Covers[7].MoneyInTransitSI === ""
    ) {
      lDto.InsurableItem[0].Covers[i][name] = "";
      lDto.InsurableItem[0].Covers[i].IsOptional = false;
    } else if (
      dto.InsurableItem[0].Covers[7].IsOptional &&
      lDto.InsurableItem[0].Covers[7].SingleCarryingLimit === "" &&
      lDto.InsurableItem[0].Covers[7].CashinSafeSI === ""
    ) {
      lDto.InsurableItem[0].Covers[i][name] = "";
      lDto.InsurableItem[0].Covers[i].IsOptional = false;
    } else if (
      dto.InsurableItem[0].Covers[7].IsOptional &&
      lDto.InsurableItem[0].Covers[7].MoneyInTransitSI === "" &&
      lDto.InsurableItem[0].Covers[7].CashinSafeSI === ""
    ) {
      lDto.InsurableItem[0].Covers[i][name] = "";
      lDto.InsurableItem[0].Covers[i].IsOptional = false;
    } else {
      lDto.InsurableItem[0].Covers[i][name] = "";
      // lDto.InsurableItem[0].Covers[i].IsOptional = false;
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onInput = (e, name, i) => {
    if (e.target.value !== "" && Number(e.target.value) > 0) {
      if (name === "CashinSafeSI") {
        lDto.InsurableItem[0].Covers[7].CashinSafeSI = e.target.value;
        lMasters.flags.editval = false;
        lDto.InsurableItem[0].Covers[7].IsOptional = true;
      } else if (name === "PLLimit") {
        lDto.InsurableItem[0].Covers[14].PLLimit = e.target.value;
        lMasters.flags.editval = false;
        lDto.InsurableItem[0].Covers[14].IsOptional = true;
      } else if (name === "AOA_AOY") {
        lDto.InsurableItem[0].Covers[14].AOA_AOY = e.target.value;
        lMasters.flags.editval = false;
        lDto.InsurableItem[0].Covers[14].IsOptional = true;
      } else if (name === "MoneyInTransitSI") {
        lDto.InsurableItem[0].Covers[7].MoneyInTransitSI = e.target.value;
        lMasters.flags.editval = false;
        lDto.InsurableItem[0].Covers[7].IsOptional = true;
      } else if (name === "SingleCarryingLimit") {
        lDto.InsurableItem[0].Covers[7].SingleCarryingLimit = e.target.value;
        lMasters.flags.editval = false;
        lDto.InsurableItem[0].Covers[7].IsOptional = true;
      } else {
        lDto.InsurableItem[0].Covers[i][name] = e.target.value;
        lDto.InsurableItem[0].Covers[i].IsOptional = true;
        lMasters.flags.editval = false;
      }
      // if (name === "CashinSafeSI") {
      //   lDto.InsurableItem[0].Covers[7].CashinSafeSI = e.target.value;
      //   lDto.InsurableItem[0].Covers[7].IsOptional = true;
      // } else if (name === "SingleCarryingLimit") {
      //   lDto.InsurableItem[0].Covers[7].SingleCarryingLimit = e.target.value;
      //   lDto.InsurableItem[0].Covers[7].IsOptional = true;
      // } else if (name === "AnnualTurnOver") {
      //   lDto.InsurableItem[0].Covers[7].AnnualTurnOver = e.target.value;
      //   lDto.InsurableItem[0].Covers[7].IsOptional = true;
      // } else if (name === "FGYearLimit") {
      //   lDto.InsurableItem[0].Covers[12].FGYearLimit = e.target.value;
      //   lDto.InsurableItem[0].Covers[12].IsOptional = true;
      // } else if (name === "PLLimit") {
      //   lDto.InsurableItem[0].Covers[14].PLLimit = e.target.value;
      //   lDto.InsurableItem[0].Covers[14].IsOptional = true;
      // } else if (name === "AnnualGrossProfit") {
      //   lDto.InsurableItem[0].Covers[1].AnnualGrossProfit = e.target.value;
      //   lDto.InsurableItem[0].Covers[1].IsOptional = true;
      // } else if (name === "EESI") {
      //   lDto.InsurableItem[0].Covers[10].EESI = e.target.value;
      //   lDto.InsurableItem[0].Covers[10].IsOptional = true;
      // }
      // if (name === "FGYearLimit" || name === "NoofPersons") {
      // setDto({ ...lDto });
      // if (
      //   dto.InsurableItem[0].Covers[12].FGYearLimit !== "" &&
      //   dto.InsurableItem[0].Covers[12].NoofPersons !== ""
      // ) {
      // } else {
      //   lDto.InsurableItem[0].Covers[12].PerPersonLimit = 0;
      // }
      // if (
      //   dto.InsurableItem[0].Covers[12].FGYearLimit === "" ||
      //   dto.InsurableItem[0].Covers[12].NoofPersons === ""
      // ) {
      //   lDto.InsurableItem[0].Covers[12].PerPersonLimit = 0;
      // }
    }
    // else if (
    //   dto.InsurableItem[0].Covers[7].IsOptional &&
    //   lDto.InsurableItem[0].Covers[7].SingleCarryingLimit === "" &&
    //   lDto.InsurableItem[0].Covers[7].MoneyInTransitSI === ""
    // ) {
    //   lDto.InsurableItem[0].Covers[i][name] = "";
    //   lDto.InsurableItem[0].Covers[i].IsOptional = false;
    // } else if (
    //   dto.InsurableItem[0].Covers[7].IsOptional &&
    //   lDto.InsurableItem[0].Covers[7].SingleCarryingLimit === "" &&
    //   lDto.InsurableItem[0].Covers[7].CashinSafeSI === ""
    // ) {
    //   lDto.InsurableItem[0].Covers[i][name] = "";
    //   lDto.InsurableItem[0].Covers[i].IsOptional = false;
    // } else if (
    //   dto.InsurableItem[0].Covers[7].IsOptional &&
    //   lDto.InsurableItem[0].Covers[7].MoneyInTransitSI === "" &&
    //   lDto.InsurableItem[0].Covers[7].CashinSafeSI === ""
    // ) {
    //   lDto.InsurableItem[0].Covers[i][name] = "";
    //   lDto.InsurableItem[0].Covers[i].IsOptional = false;
    // } else if (
    //   lDto.InsurableItem[0].Covers[14].IsOptional &&
    //   name === "PLLimit" &&
    //   e.target.value === ""
    // ) {
    //   lDto.InsurableItem[0].Covers[i][name] = "";
    //   lDto.InsurableItem[0].Covers[i].IsOptional = false;
    // }
    else {
      lDto.InsurableItem[0].Covers[i].IsOptional = false;
      lDto.InsurableItem[0].Covers[i][name] = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onFGYearLimit = (e, name, i) => {
    if (name === "FGYearLimit" && Number(e.target.value) > 0) {
      lDto.InsurableItem[0].Covers[i][name] = e.target.value;
      lDto.InsurableItem[0].Covers[i].IsOptional = true;
      lMasters.flags.editval = false;
      // lDto.InsurableItem[0].Covers[12].FGYearLimit = e.target.value;
      // lDto.InsurableItem[0].Covers[12].IsOptional = true;

      lDto.InsurableItem[0].Covers[12].PerPersonLimit = formater.format(
        Number(e.target.value) / Number(dto.InsurableItem[0].Covers[12].NoofPersons)
      );
    } else if (
      dto.InsurableItem[0].Covers[12].IsOptional &&
      lDto.InsurableItem[0].Covers[12].NoofPersons === ""
    ) {
      lDto.InsurableItem[0].Covers[12].PerPersonLimit = "";
      lDto.InsurableItem[0].Covers[i][name] = "";
      lDto.InsurableItem[0].Covers[12].IsOptional = false;
    } else {
      lDto.InsurableItem[0].Covers[12].PerPersonLimit = formater.format(
        Number(e.target.value) / Number(dto.InsurableItem[0].Covers[12].NoofPersons)
      );
      lDto.InsurableItem[0].Covers[i][name] = "";
      // lDto.InsurableItem[0].Covers[i].IsOptional = false;
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onNoofPersons = (e, name, i) => {
    if (
      name === "NoofPersons" &&
      (IsNumeric(e.target.value) === true || e.target.value === "") &&
      Number(e.target.value) > 0
    ) {
      lDto.InsurableItem[0].Covers[i][name] = e.target.value;
      lDto.InsurableItem[0].Covers[i].IsOptional = true;
      lMasters.flags.editval = false;
      // if (e.target.value !== "") {
      //   for (let k = 1; k <= Number(e.target.value); k += 1) {
      //     // lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee.push({
      //     //   ...masters.FidelityGuarantee,
      //     //   SNo: dto.InsurableItem[0].RiskItems[0].FidelityGuarantee.length + 1,
      //     // });
      //     lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [
      //       ...dto.InsurableItem[0].RiskItems[0].FidelityGuarantee,
      //       {
      //         ...masters.FidelityGuarantee,
      //         SNo: dto.InsurableItem[0].RiskItems[0].FidelityGuarantee.length + 1,
      //       },
      //     ];
      //     lMasters.error.FidelityGuarantee = [
      //       ...masters.error.FidelityGuarantee,
      //       {
      //         ...lMasters.Validation.FidelityGuarantee,
      //         SNo: lMasters.error.FidelityGuarantee.length + 1,
      //       },
      //     ];
      //   }
      //   // setDto(newArray);
      // } else {
      //   lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [];
      //   lMasters.error.FidelityGuarantee = [];
      // }

      // lDto.InsurableItem[0].Covers[12].FGYearLimit = e.target.value;
      // lDto.InsurableItem[0].Covers[12].IsOptional = true;

      lDto.InsurableItem[0].Covers[12].PerPersonLimit = formater.format(
        Number(dto.InsurableItem[0].Covers[12].FGYearLimit) / Number(e.target.value)
      );
    } else if (
      lDto.InsurableItem[0].Covers[12].IsOptional &&
      lDto.InsurableItem[0].Covers[12].FGYearLimit === ""
    ) {
      lDto.InsurableItem[0].Covers[12].PerPersonLimit = "";
      lDto.InsurableItem[0].Covers[i][name] = "";
      lDto.InsurableItem[0].Covers[12].IsOptional = false;
      lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [];
      lMasters.error.FidelityGuarantee = [];
    } else {
      lDto.InsurableItem[0].Covers[12].PerPersonLimit = formater.format(
        Number(dto.InsurableItem[0].Covers[12].FGYearLimit) / Number(e.target.value)
      );
      lDto.InsurableItem[0].Covers[i][name] = "";
      lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [];
      lMasters.error.FidelityGuarantee = [];
      // lDto.InsurableItem[0].Covers[i].IsOptional = false;
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  console.log("masters", masters);

  // const onBluronNoofPersons = (number) => {
  //   lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [];
  //   lMasters.error.FidelityGuarantee = [];
  //   if (number !== "") {
  //     for (let k = 1; k <= number; k += 1) {
  //       // lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee.push({
  //       //   ...masters.FidelityGuarantee,
  //       //   SNo: dto.InsurableItem[0].RiskItems[0].FidelityGuarantee.length + 1,
  //       // });
  //       lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [
  //         ...dto.InsurableItem[0].RiskItems[0].FidelityGuarantee,
  //         {
  //           ...masters.FidelityGuarantee,
  //           SNo: dto.InsurableItem[0].RiskItems[0].FidelityGuarantee.length + 1,
  //         },
  //       ];
  //       lMasters.error.FidelityGuarantee = [
  //         ...masters.error.FidelityGuarantee,
  //         {
  //           ...lMasters.Validation.FidelityGuarantee,
  //           SNo: lMasters.error.FidelityGuarantee.length + 1,
  //         },
  //       ];
  //     }
  //   } else {
  //     lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [];
  //     lMasters.error.FidelityGuarantee = [];
  //   }
  //   setDto({ ...lDto });
  //   setMasters({ ...lMasters });
  //   const regex = /^[0-9]*$/;
  //   if (regex.test(number)) {
  //     if (number > 0 && number <= 1000) return true;
  //     return "No of Persons - Should be between 1 and 1000";
  //   }
  //   return "Allows only number";
  // };
  const onBluronNoofPersons = (number) => {
    lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [];
    lMasters.error.FidelityGuarantee = [];
    if (number !== "") {
      const regex = /^[0-9]*$/;
      if (regex.test(number)) {
        if (number > 0 && number <= 1000) {
          for (let k = 1; k <= number; k += 1) {
            // lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee.push({
            //   ...masters.FidelityGuarantee,
            //   SNo: dto.InsurableItem[0].RiskItems[0].FidelityGuarantee.length + 1,
            // });
            lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [
              ...dto.InsurableItem[0].RiskItems[0].FidelityGuarantee,
              {
                ...masters.FidelityGuarantee,
                SNo: dto.InsurableItem[0].RiskItems[0].FidelityGuarantee.length + 1,
              },
            ];
            lMasters.error.FidelityGuarantee = [
              ...masters.error.FidelityGuarantee,
              {
                ...lMasters.Validation.FidelityGuarantee,
                SNo: lMasters.error.FidelityGuarantee.length + 1,
              },
            ];
          }
          setDto({ ...lDto });
          setMasters({ ...lMasters });
          return true;
        }
        if (
          lDto.InsurableItem[0].Covers[12].IsOptional &&
          lDto.InsurableItem[0].Covers[12].FGYearLimit === ""
        ) {
          lDto.InsurableItem[0].Covers[12].IsOptional = false;

          setDto({ ...lDto });
          setMasters({ ...lMasters });
        }

        swal({ icon: "error", text: "No of Persons - Should be between 1 and 1000" });
        return "No of Persons - Should be between 1 and 1000";
      }
    } else {
      lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = [];
      lMasters.error.FidelityGuarantee = [];
    }

    return "Allows only number";
  };
  const onLoad = (e) => {
    lDto.Loading = e.target.value;
    lMasters.err.LoadErr = true;

    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onLoad1 = (e) => {
    const regex = /^-?\d+$/;
    if (regex.test(e.target.value)) {
      lDto.Loading = e.target.value;
      lMasters.loadflag = false;
    } else {
      lDto.Loading = "";
      lMasters.loadflag = true;
    }
    lMasters.err.Loading = false;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const CalPre = async () => {
    // const poldays = diffDaysCalculator(new Date(dto.PolicyStartDate), new Date(dto.PolicyEndDate));
    // lDto.PolicyDays = poldays;
    // const pin = NSTPPincodeData();
    // console.log("pin", pin);
    // lDto.ProposerDetails.Name = dto.ProposerDetails["First Name"];
    let b = 1;
    dto.InsurableItem[0].Covers.forEach((x) => {
      if (
        x.IsOptional === true &&
        x.CoverName !== "Theft Extension" &&
        x.CoverName !== "RSMD" &&
        x.CoverName !== "Terrorism - Fire" &&
        x.CoverName !== "Terrorism - BI"
      ) {
        b += 1;
      }
    });
    lDto.NoofSections = String(b);
    setDto({ ...lDto });
    const aa = dto.InsurableItem[0].Covers.some(
      (x) =>
        x.CoverName !== "Terrorism - Fire" &&
        x.CoverName !== "Terrorism - BI" &&
        x.CoverName !== "Theft Extension" &&
        x.CoverName !== "RSMD" &&
        x.IsOptional === true
    );
    let bb = "";
    let cc = "";
    if (dto.Pincode !== "") {
      bb = masters.NSTPPincode.data.some((x) => x.mValue === dto.Pincode);
    }
    if (dto.OccupancyValue !== "") {
      cc = masters.NSTPOccupancyBS.data.some((x) => x.mValue === dto.OccupancyValue);
    }
    console.log("masters", masters);
    if (
      dto.PolicyStartDate === "" ||
      dto.Pincode === "" ||
      dto.City === "" ||
      dto.Address01 === "" ||
      dto.ProposerDetails.Name === "" ||
      dto.QuoteMobileNo === "" ||
      dto.QuoteEmail === "" ||
      dto.ClaimsRatio === "" ||
      dto.Occupancy === "" ||
      dto.BasementExposure === "" ||
      dto.TypeofConstruction === "" ||
      dto.BusinessPortfolio === "" ||
      dto.DistanceFromPublicFireBrigade === "" ||
      dto.RiskTerrain === "" ||
      dto.HousekeepingType === "" ||
      dto.AgeofBuilding === "" ||
      dto.PercentageOfStock === "" ||
      dto.FireProtection === "" ||
      dto.CompanyType === ""
    ) {
      lMasters.err.AllReq = true;
      swal({ icon: "error", text: genVal });
    } else if (dto.ClaimsRatio === "> 100%") {
      swal({ icon: "error", text: nstpVal });
      lMasters.err.ClaimsRatio = true;

      setMasters({ ...lMasters });
    } else if (dto.BasementExposure === "Yes") {
      lMasters.err.BasementExposure = true;
      swal({ icon: "error", text: nstpVal });
    } else if (Number(dto.TotalSI) > 50000000) {
      lMasters.err.TotalSI = true;
      swal({ icon: "error", text: nstpVal });
    } else if (dto.Loading[0] === "-") {
      lMasters.err.Loading = true;
      swal({ icon: "error", text: nstpVal });
    } else if (dto.TotalSI === "" || dto.TotalSI === 0 || dto.TotalSI === "0") {
      lMasters.err.TSI = true;
      swal({ icon: "error", text: "Total SI can not be zero" });
    } else if (bb) {
      lMasters.err.Pincode = true;
      swal({ icon: "error", text: nstpVal });
    } else if (cc) {
      lMasters.err.Occupancy = true;
      swal({ icon: "error", text: nstpVal });
    } else if (
      dto.InsurableItem[0].Covers[6].IsOptional &&
      dto.InsurableItem[0].Covers[6].BagNoOfEmployees === ""
    ) {
      // lMasters.err.Baggage = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[6].IsOptional &&
      dto.InsurableItem[0].Covers[6].BagSI === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[12].IsOptional &&
      dto.InsurableItem[0].Covers[12].FGYearLimit === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[12].IsOptional &&
      dto.InsurableItem[0].Covers[12].NoofPersons === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[7].IsOptional &&
      dto.InsurableItem[0].Covers[7].CashinSafeSI === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[7].IsOptional &&
      dto.InsurableItem[0].Covers[7].SingleCarryingLimit === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[7].IsOptional &&
      dto.InsurableItem[0].Covers[7].MoneyInTransitSI === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[13].IsOptional &&
      dto.InsurableItem[0].Covers[13].PACategory === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[13].IsOptional &&
      dto.InsurableItem[0].Covers[13].PANOfEmployees === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[13].IsOptional &&
      dto.InsurableItem[0].Covers[13].PASI === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[14].IsOptional &&
      dto.InsurableItem[0].Covers[14].PLLimit === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (
      dto.InsurableItem[0].Covers[14].IsOptional &&
      dto.InsurableItem[0].Covers[14].AOA_AOY === ""
    ) {
      // lMasters.err.BagSI = true;
      swal({ icon: "error", text: genVal });
    } else if (aa) {
      lMasters.err.ClaimsRatio = false;
      lMasters.Loader = true;
      const x = await Quotations(dto);
      if (x.responseMessage !== "Success") {
        lMasters.Loader = false;
        swal({ icon: "error", text: x.responseMessage });
      } else if (x.finalResult) {
        lDto.PremiumDetails["Net Premium"] = formater.format(x.finalResult.GrossPremium);
        lDto.PremiumDetails.GST = formater.format(x.finalResult.GST);
        lDto.PremiumDetails.GrossPremium = formater.format(x.finalResult.GrossPremium);
        lDto.PremiumDetails["Total with Tax"] = Math.round(Number(x.finalResult.FinalPremium));
        lDto.PremiumDetails.TotalPremium = formater.format(x.finalResult.FinalPremium);
        lDto.PremiumDetails.CGST = formater.format(x.finalResult.CGST);
        lDto.PremiumDetails.SGST = formater.format(x.finalResult.SGST);
        lDto.PremiumDetails.TerrorismPremium = formater.format(x.finalResult.TerrorismPremium);
        lDto.PremiumDetails.InclTerrPremium = Math.round(
          Number(x.finalResult.GrossPremium) - Number(x.finalResult.TerrorismPremium)
        );

        // const loading =
        //   Number(x.finalResult.PremiumwithLoading) - Number(x.finalResult.BasePremium);
        // lDto.PremiumDetails.LoadingAmount = formater.format(loading);
        // lDto.PremiumDetails.DiscountAmount = formater.format(x.finalResult.DiscountAmount);
        lDto.PaymentDetails.ChequeAmount = formater.format(x.finalResult.FinalPremium);
        lDto.QuoteRespose.BurglaryandRobbery.BRPlantMachinerySI = Math.round(
          Number(x.finalResult.BRPlantMachinerySI)
        );
        lDto.QuoteRespose.BurglaryandRobbery.BRStockinProgressSI = Math.round(
          Number(x.finalResult.BRStockinProgressSI)
        );
        lDto.QuoteRespose.BurglaryandRobbery.BRRawSI = Math.round(Number(x.finalResult.BRRawSI));
        lDto.QuoteRespose.BurglaryandRobbery.BRFFSI = Math.round(Number(x.finalResult.BRFFSI));
        lDto.QuoteRespose.BurglaryandRobbery.BRFinishStockSI = Math.round(
          Number(x.finalResult.BRFinishStockSI)
        );
        lDto.QuoteRespose.BurglaryandRobbery.BROtherContentSI = Math.round(
          Number(x.finalResult.BROtherContentSI)
        );
        lDto.QuoteRespose.BurglaryandRobbery.BR_TotalSI = Math.round(
          Number(x.finalResult.BR_TotalSI)
        );
        lDto.QuoteRespose.BurglaryandRobbery.TotalBSUSSI = Math.round(
          Number(x.finalResult.TotalBSUSSI)
        );
        lMasters.flags.CalPreSuc = true;
        lMasters.Loader = false;
        lMasters.err.LoadErr = false;
        // lMasters.flags.editval = false;
        lMasters.flags.editval = true;

        lDto.InsurableItem[0].Covers[6].CombinedSI = Math.round(
          Number(dto.InsurableItem[0].Covers[6].BagSI) *
            Number(dto.InsurableItem[0].Covers[6].BagNoOfEmployees)
        );
      }
    } else {
      swal({ icon: "error", text: "One or more sections should be opted" });
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
    // if (dto.QuoteRespose.BurglaryandRobbery.BRRawSI) {
    if (dto["Quotation No"] === "") {
      const quotationDTO = await callSaveQuoteMethod(dto);
      console.log("quotationDTO", quotationDTO);
      lDto["Quotation No"] = quotationDTO.data.quotation.quoteNo;
      lDto.QuoteNo = quotationDTO.data.quotation.quoteNo;
      setDto({ ...lDto });
    } else if (dto["Quotation No"] !== "") {
      await callUpdateQuoteMethod(dto);
    }
    // }
  };

  // const onInputBagNoOfEmployees = (e, name) => {
  //   if (IsNumeric(e.target.value) === true && e.target.value > 0) {
  //     if (name === "BagNoOfEmployees") {
  //       // lMasters.err.Baggage = false;
  //       if (e.target.value !== "") {
  //         lDto.InsurableItem[0].Covers[6].BagNoOfEmployees = e.target.value;
  //         lDto.InsurableItem[0].Covers[6].IsOptional = true;
  //       } else {
  //         lDto.InsurableItem[0].Covers[6].BagNoOfEmployees = "";
  //         lDto.InsurableItem[0].Covers[6].IsOptional = false;
  //       }
  //     }
  //   } else {
  //     lDto.InsurableItem[0].Covers[6].BagNoOfEmployees = "";
  //     lDto.InsurableItem[0].Covers[6].IsOptional = false;
  //     setDto({ ...lDto });
  //   }
  // };
  const onInputBagNoOfEmployees = (e, name) => {
    if (IsNumeric(e.target.value) === true && e.target.value > 0) {
      if (name === "BagNoOfEmployees") {
        if (e.target.value !== "") {
          lDto.InsurableItem[0].Covers[6].BagNoOfEmployees = e.target.value;
          lMasters.flags.editval = false;
          lDto.InsurableItem[0].Covers[6].IsOptional = true;
        } else {
          lDto.InsurableItem[0].Covers[6].BagNoOfEmployees = "";
          lDto.InsurableItem[0].Covers[6].IsOptional = false;
        }
      }
    } else if (
      dto.InsurableItem[0].Covers[6].IsOptional &&
      lDto.InsurableItem[0].Covers[6].BagSI === ""
    ) {
      lDto.InsurableItem[0].Covers[6].BagNoOfEmployees = "";
      lDto.InsurableItem[0].Covers[6].IsOptional = false;
    } else {
      lDto.InsurableItem[0].Covers[6].BagNoOfEmployees = "";
      //   lDto.InsurableItem[0].Covers[6].IsOptional = false;
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onInputPANOfEmployees = (e, name) => {
    if (IsNumeric(e.target.value) === true && e.target.value > 0) {
      if (name === "PANOfEmployees") {
        if (e.target.value !== "") {
          lDto.InsurableItem[0].Covers[13].PANOfEmployees = e.target.value;
          lMasters.flags.editval = false;
          lDto.InsurableItem[0].Covers[13].IsOptional = true;
        } else {
          lDto.InsurableItem[0].Covers[13].PANOfEmployees = "";
          lDto.InsurableItem[0].Covers[13].IsOptional = false;
          lDto.InsurableItem[0].RiskItems[0].PersonalAccident = [];
          lMasters.error.PersonalAccident = [];
        }
      }
    } else if (
      dto.InsurableItem[0].Covers[13].IsOptional &&
      lDto.InsurableItem[0].Covers[13].PASI === "" &&
      lDto.InsurableItem[0].Covers[13].PACategory === ""
    ) {
      lDto.InsurableItem[0].Covers[13].PANOfEmployees = "";
      lDto.InsurableItem[0].Covers[13].IsOptional = false;
      lDto.InsurableItem[0].RiskItems[0].PersonalAccident = [];
      lMasters.error.PersonalAccident = [];
    } else {
      lDto.InsurableItem[0].Covers[13].PANOfEmployees = "";
      // lDto.InsurableItem[0].Covers[13].IsOptional = false;
      lDto.InsurableItem[0].RiskItems[0].PersonalAccident = [];
      lMasters.error.PersonalAccident = [];
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  // const onAutocomplete = (e, v) => {
  //   lDto.InsurableItem[0].Covers[13].PACategory = v.mValue;
  //   setDto({ ...lDto });
  // };
  // const ClaimsRatio = (number) => {
  //
  //   const regex = /^[0-9]*$/;
  //   if (regex.test(number)) {
  //     if (number <= 50000000) return true;
  //     return "SI should not exceeds 5Crs";
  //   }
  //   return "Allows only number";
  // };
  // const Loading = (number) => {
  //   const regex = /^-?\d+$/;
  //   if (regex.test(number)) return true;
  //   return "Enter Valid Loading Amount";
  // };

  const IsSI = (number) => {
    const regex = /^[0-9]*$/;
    if (regex.test(number)) {
      if (number <= 50000000) return true;
      lDto.InsurableItem[0].Covers[1].IsOptional = false;
      setDto({ ...lDto });
      return "SI should not exceeds 5Crs";
    }
    return "Allows only number";
  };
  // const IsPincode = (number) => {
  //   const regex = /^[0-9]*$/;
  //   if (regex.test(number)) {
  //     if (number.length === 6) return true;
  //     return "Enter valid Pincode";
  //   }
  //   return "Allows only number";
  // };
  // const SingleCarryingLimitSI = (number) => {
  //   const regex = /^[0-9]*$/;
  //   if (regex.test(number)) {
  //     if (number <= 500000) return true;
  //     return "SI should not exceeds 5,00,000";
  //   }
  //   return "Allows only number";
  // };
  const CashinSafeSISI = (number) => {
    const regex = /^[0-9]*$/;
    if (regex.test(number)) {
      if (number <= 5000000) return true;
      return "SI should not exceeds 50,00,000";
    }
    return "Allows only number";
  };

  const FGYearLimit = (e) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      lMasters.err.FGYearLimit1 = false;

      if (Number(e.target.value) <= 5000000) {
        lDto.InsurableItem[0].Covers[12].FGYearLimit = e.target.value;
        lMasters.err.FGYearLimit = false;
      } else {
        lDto.InsurableItem[0].Covers[12].FGYearLimit = "";

        lMasters.err.FGYearLimit = true;
      }
    } else {
      lMasters.err.FGYearLimit1 = true;
      lDto.InsurableItem[0].Covers[12].FGYearLimit = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
    // return "Allows only number";
  };
  const CashinSafeSI = (e, name, i, name1) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      lMasters.err[name1] = false;

      if (Number(e.target.value) <= 5000000) {
        lDto.InsurableItem[0].Covers[i][name] = e.target.value;
        lMasters.err[name] = false;
      } else {
        lDto.InsurableItem[0].Covers[i][name] = "";

        lMasters.err[name] = true;
      }
    } else {
      lMasters.err[name1] = true;
      lDto.InsurableItem[0].Covers[i][name] = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
    // return "Allows only number";
  };
  const MoneyInTransitSI = (e, name, i, name1) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      lMasters.err[name1] = false;

      if (Number(e.target.value) <= 50000000) {
        lDto.InsurableItem[0].Covers[i][name] = e.target.value;
        lMasters.err[name] = false;
      } else {
        lDto.InsurableItem[0].Covers[i][name] = "";

        lMasters.err[name] = true;
      }
    } else {
      lMasters.err[name1] = true;
      lDto.InsurableItem[0].Covers[i][name] = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
    // return "Allows only number";
  };
  const SingleCarryingLimitSI = (e, name, i, name1) => {
    const regex = /^[0-9]*$/;
    if (regex.test(e.target.value)) {
      lMasters.err[name1] = false;

      if (Number(e.target.value) <= 500000) {
        lDto.InsurableItem[0].Covers[i][name] = e.target.value;
        lMasters.err[name] = false;
      } else {
        lDto.InsurableItem[0].Covers[i][name] = "";

        lMasters.err[name] = true;
      }
    } else {
      lMasters.err[name1] = true;
      lDto.InsurableItem[0].Covers[i][name] = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
    // return "Allows only number";
  };

  const AllRiskSISI = (number) => {
    const regex = /^[0-9]*$/;
    if (regex.test(number)) {
      if (number <= 10000000) return true;
      return "SI should not exceeds 1,00,00,000";
    }
    return "Allows only number";
  };

  // const PANOfEmployees = (number) => {
  //   lDto.InsurableItem[0].RiskItems[0].PersonalAccident = [];
  //   lMasters.error.PersonalAccident = [];
  //   if (number !== "") {
  //     for (let k = 1; k <= number; k += 1) {
  //       // lDto.InsurableItem[0].RiskItems[0].PersonalAccident.push({
  //       //   ...masters.PersonalAccident,
  //       //   SNo: dto.InsurableItem[0].RiskItems[0].PersonalAccident.length + 1,
  //       // });
  //       lDto.InsurableItem[0].RiskItems[0].PersonalAccident = [
  //         ...dto.InsurableItem[0].RiskItems[0].PersonalAccident,
  //         {
  //           ...masters.PersonalAccident,
  //           NominationDetails: { ...masters.PersonalAccident.NominationDetails },
  //           SNo: dto.InsurableItem[0].RiskItems[0].PersonalAccident.length + 1,
  //         },
  //       ];
  //       lMasters.error.PersonalAccident = [
  //         ...masters.error.PersonalAccident,
  //         {
  //           ...masters.Validation.PersonalAccidentErr,
  //           SNo: lMasters.error.PersonalAccident.length + 1,
  //         },
  //       ];
  //     }
  //   }
  //   setDto({ ...lDto });
  //   setMasters({ ...lMasters });
  //   const regex = /^[0-9]*$/;
  //   if (regex.test(number)) {
  //     if (number > 0 && number <= 500) return true;
  //     return "No of Employees - Should be between 1 and 500";
  //   }
  //   return "Allows only number";
  // };
  const PANOfEmployees = (number) => {
    lDto.InsurableItem[0].RiskItems[0].PersonalAccident = [];
    lMasters.error.PersonalAccident = [];
    if (number !== "") {
      const regex = /^[0-9]*$/;
      if (regex.test(number)) {
        if (number > 0 && number <= 500) {
          for (let k = 1; k <= number; k += 1) {
            // lDto.InsurableItem[0].RiskItems[0].PersonalAccident.push({
            //   ...masters.PersonalAccident,
            //   SNo: dto.InsurableItem[0].RiskItems[0].PersonalAccident.length + 1,
            // });
            lDto.InsurableItem[0].RiskItems[0].PersonalAccident = [
              ...dto.InsurableItem[0].RiskItems[0].PersonalAccident,
              {
                ...masters.PersonalAccident,
                NominationDetails: { ...masters.PersonalAccident.NominationDetails },
                SNo: dto.InsurableItem[0].RiskItems[0].PersonalAccident.length + 1,
              },
            ];
            lMasters.error.PersonalAccident = [
              ...masters.error.PersonalAccident,
              {
                ...masters.Validation.PersonalAccidentErr,
                SNo: lMasters.error.PersonalAccident.length + 1,
              },
            ];
          }
          setDto({ ...lDto });
          setMasters({ ...lMasters });
          return true;
        }
        if (
          dto.InsurableItem[0].Covers[13].IsOptional &&
          lDto.InsurableItem[0].Covers[13].PASI === "" &&
          lDto.InsurableItem[0].Covers[13].PACategory === ""
        ) {
          // lDto.InsurableItem[0].Covers[13].PANOfEmployees = "";
          lDto.InsurableItem[0].Covers[13].IsOptional = false;
          setDto({ ...lDto });
          setMasters({ ...lMasters });
        }
        swal({ icon: "error", text: "No of Employees - Should be between 1 and 500" });
        return "No of Employees - Should be between 1 and 500";
        // return;
      }
    }
    return "Allows only number";
  };
  useEffect(() => {
    if (dto.InsurableItem[0].Covers[3].BR_FLBPercent !== "") {
      const FL = Number(dto.InsurableItem[0].Covers[3].BR_FLBPercent);
      lDto.InsurableItem[0].Covers[3].SI =
        (FL * dto.PlantMachinerySI +
          FL * dto.FurnitureFixtureFSI +
          FL * dto.RawSI +
          FL * dto.StockinProgressSI +
          FL * dto.FinishStockSI +
          FL * dto.OtherContentSI) /
        100;
    }
  }, [
    dto.PlantMachinerySI,
    dto.FurnitureFixtureFSI,
    dto.RawSI,
    dto.StockinProgressSI,
    dto.FinishStockSI,
    dto.OtherContentSI,
  ]);
  const SIVal = (e, name) => {
    if (IsNumeric(e.target.value) === true) {
      lDto[name] = e.target.value;
      lMasters.flags.editval = false;
    } else {
      lDto[name] = "";
    }
    let tSI = 0;
    if (dto) {
      tSI =
        Number(dto.RawSI) +
        Number(dto.FinishStockSI) +
        Number(dto.StockinProgressSI) +
        Number(dto.FurnitureFixtureFSI) +
        Number(dto.PlantMachinerySI) +
        Number(dto.BuildingSI) +
        Number(dto.OtherContentSI);
    }
    // if (tSI >= 50000000) {
    //   swal({ icon: "error", text: "Total SI should not exceeds 5Crs" });
    // } else {
    lDto.TotalSI = String(tSI);
    // }
    lMasters.err.TotalSI = false;
    lMasters.err.TSI = false;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  // const handlePincode = (e) => {
  //   // if (e.target.value !== "") {
  //   // lMasters.err.pinVal = false;
  //   lDto.Pincode = e.target.value;
  //   lDto.City = "";
  //   lDto.State = "";
  //   lDto.Zone = "";
  //   // } else {
  //   //   lDto.Pincode = "";
  //   //   lMasters.err.pinVal = true;
  //   // }
  //   setDto({ ...lDto });
  // };
  const handlePincode = async (e) => {
    if (IsNumeric(e.target.value) === true && e.target.value.length === 6) {
      // debugger;
      lDto.Pincode = e.target.value;
      lMasters.err.Pincode = false;
      // lMasters.err.pinVal = false;
      // if () {
      const ProductId = 782;
      const obj = { Pincode: e.target.value };
      const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
      console.log("city123", city, city.length);
      if (city.length > 0) {
        lDto.Zone = city[0].Zone;
        lMasters.riskCD = city;
        // lMasters.err.pinVal = false;
      } else {
        // lMasters.err.pinVal = true;
        swal({ icon: "error", text: "Enter Valid Pincode" });
        lMasters.riskCD = [];
        lDto.Zone = "";
        lDto.State = "";
        lDto.City = "";
        lDto.Pincode = "";
      }
    } else {
      lMasters.riskCD = [];
      lMasters.err.pinVal = true;
      lDto.Zone = "";
      lDto.State = "";
      lDto.City = "";
      lDto.Pincode = "";
      swal({ icon: "error", text: "Enter Valid Pincode" });
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
    // }
  };
  const handleCity = async (e, v) => {
    const res = await getPincodeDetails(v.City_ID);
    lDto.State = res.state[0].State_Name;
    lDto.City = v.mValue;
    setDto({ ...lDto });
  };

  const onDownloadQuote = async () => {
    if (masters.err.LoadErr === true || masters.flags.editval === false) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else {
      await callUpdateQuoteMethod(dto).then(async () => {
        const downloadDTO = {
          key: dto["Quotation No"],
          templateId: 225,
          referenceId: "",
        };
        await downloadQuote(downloadDTO);
      });
    }
  };
  const onShareQuote = async () => {
    if (masters.err.LoadErr === true || masters.flags.editval === false) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else {
      await callUpdateQuoteMethod(dto).then(async () => {
        const jsonValue = {
          communicationId: 222,
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
            text: `Email sent successfully`,
            html: true,
            icon: "success",
          });
        }
      });
    }
  };

  const handleSetAutoComplete = async (e, v, name) => {
    if (v && name === "FireProtection") {
      lDto[name] = v.TypeCode;
      lDto.FireProtectionValue = v.mValue;
      lMasters.flags.editval = false;
    }
    // else {
    //   lDto[name] = "";
    //   lDto.FireProtectionValue = "";
    // }
    else if (v && name === "Occupancy") {
      lMasters.err.Occupancy = false;
      lDto[name] = v.mValue;
      lDto.OccupancyValue = v.mValue;
      lDto.CompanyType = v.TypeCode;
      lDto.OccupancyWiseWarranty = [];
      lMasters.flags.editval = false;
      const OccupancyWiseWarranty = await GetProdPartnermasterData(1204, "Warranty", {
        OccupancyId: v.mID,
      });
      console.log("OccupancyWiseWarranty", OccupancyWiseWarranty);
      if (OccupancyWiseWarranty.length > 0) {
        lDto.OccupancyWiseWarranty = OccupancyWiseWarranty.map((item) => item.mValue);
      }
    }
    // else {
    //   lDto[name] = "";
    //   lDto.OccupancyValue = "";
    // }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
    console.log("dtowarranty", dto.OccupancyWiseWarranty);
  };
  // All Sections

  // const handleOpen = (e, name) => {
  //   lMasters.add[name] = true;
  //   setMasters({ ...lMasters });
  // };
  const handleOpen = (e, name) => {
    // debugger;
    // lDto.InsurableItem[0].RiskItems[0][name][
    //   lDto.InsurableItem[0].RiskItems[0][name].length - 1
    // ].addFlag = false;
    lDto.InsurableItem[0].RiskItems[0][name][0].addFlag = true;
    lDto.InsurableItem[0].RiskItems[0][name] = [
      ...lDto.InsurableItem[0].RiskItems[0][name],
      {
        ...lMasters[name],
        SNo: dto.InsurableItem[0].RiskItems[0][name].length + 1,
      },
    ];
    console.log("1234679", lDto.InsurableItem[0].RiskItems[0][name]);
    // const newArray = {
    //   ...lDto.InsurableItem[0].RiskItems[0][name][
    //     lDto.InsurableItem[0].RiskItems[0][name].length - 1
    //   ],
    // };
    // console.log("newArray", newArray);
    // newArray.addFlag = false;
    // lDto.InsurableItem[0].RiskItems[0][name].splice(
    //   lDto.InsurableItem[0].RiskItems[0][name].length - 1,
    //   1,
    //   { ...newArray }
    // );
    lMasters.error[name] = [
      ...masters.error[name],
      {
        ...lMasters.Validation[name],
        SNo: lMasters.error[name].length + 1,
      },
    ];

    if (dto.InsurableItem[0].Covers[9].IsOptional === true) {
      lDto.InsurableItem[0].RiskItems[0].PlateGlass.forEach((x) => {
        const l = x;
        l.LocationDetails = `${dto.Address01} ${dto.Address02} , ${dto.City}, ${dto.State} - ${dto.Pincode}`;
      });
    }

    if (dto.InsurableItem[0].Covers[10].IsOptional === true) {
      lDto.InsurableItem[0].RiskItems[0].ElectronicEquipment.forEach((x) => {
        const l = x;
        l.Locationaddress = `${dto.Address01} ${dto.Address02} , ${dto.City}, ${dto.State} - ${dto.Pincode}`;
      });
    }
    if (dto.InsurableItem[0].Covers[11].IsOptional === true) {
      lDto.InsurableItem[0].RiskItems[0].BreakdownofBusinessEquipment.forEach((x) => {
        const l = x;
        l.Locationaddress = `${dto.Address01} ${dto.Address02} , ${dto.City}, ${dto.State} - ${dto.Pincode}`;
      });
    }

    if (dto.InsurableItem[0].Covers[14].IsOptional === true) {
      lDto.InsurableItem[0].RiskItems[0].PublicLiability.forEach((x) => {
        const l = x;
        l.Locationdetails = `${dto.Address01} ${dto.Address02} , ${dto.City}, ${dto.State} - ${dto.Pincode}`;
      });
    }

    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  // const [selectedPopoverIndex, setSelectedPopoverIndex] = useState(-1);

  // const handleCloseActionButton = (e, name) => {
  //   lMasters.anchorEl[name] = false;
  //   // setSelectedPopoverIndex(null);
  //   lMasters.selectedPopoverIndex[name] = null;
  //   setMasters({ ...lMasters });
  // };
  // const handleClick = (event, i, name) => {
  //   lMasters.anchorEl[name] = event.currentTarget;
  //   lMasters.selectedPopoverIndex[name] = i;
  //   setMasters({ ...lMasters });
  //   // setSelectedPopoverIndex(i);
  // };

  const handleInputChange = (e, i, n, s) => {
    if (n === "YearofMfg") {
      const regex = /^[1-9]\d*$/;
      if (regex.test(e.target.value)) {
        lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
      } else {
        lDto.InsurableItem[0].RiskItems[0][s][i][n] = "";
      }
    }
    // let AllRiskSI = 0;
    // let PlateGlassSI = 0;
    // let ElectronicEquipmentSI = 0;
    // let BreakdownofBusinessEquipmentSI = 0;
    // let PublicLiabilitySI = 0;
    // if (s === "AllRiskSection") {
    //   lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;

    //   // dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
    //   //   AllRiskSI += Number(x.SI);
    //   // });
    //   // if (AllRiskSI !== Number(dto.InsurableItem[0].Covers[8].AllRiskSI)) {
    //   //   lMasters.sum.AllRiskSection = true;
    //   // } else {
    //   //   lMasters.sum.AllRiskSection = false;
    //   // }
    // } else if (s === "PlateGlass") {
    //   lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
    //   // dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
    //   //   PlateGlassSI += Number(x.SI);
    //   // });
    //   // if (n === "SI" && PlateGlassSI !== Number(dto.InsurableItem[0].Covers[9].PlateGlassSI)) {
    //   //   lMasters.sum.PlateGlass = true;
    //   // } else {
    //   //   lMasters.sum.PlateGlass = false;
    //   // }
    // } else if (s === "ElectronicEquipment") {
    //   lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
    //   // dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
    //   //   ElectronicEquipmentSI += Number(x.SI);
    //   // });
    //   // if (n === "SI" && ElectronicEquipmentSI !== Number(dto.InsurableItem[0].Covers[10].EESI)) {
    //   //   lMasters.sum.ElectronicEquipment = true;
    //   // } else {
    //   //   lMasters.sum.ElectronicEquipment = false;
    //   // }
    // } else if (s === "BreakdownofBusinessEquipment") {
    //   lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
    //   dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
    //     BreakdownofBusinessEquipmentSI += Number(x.SI);
    //   });
    //   if (
    //     n === "SI" &&
    //     BreakdownofBusinessEquipmentSI !== Number(dto.InsurableItem[0].Covers[11].BBESI)
    //   ) {
    //     lMasters.sum.BreakdownofBusinessEquipment = true;
    //   } else {
    //     lMasters.sum.BreakdownofBusinessEquipment = false;
    //   }
    // } else if (s === "PublicLiability") {
    //   lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
    //   dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
    //     PublicLiabilitySI += Number(x.LimitofLiability);
    //   });
    //   if (
    //     n === "LimitofLiability" &&
    //     PublicLiabilitySI !== Number(dto.InsurableItem[0].Covers[14].PLLimit)
    //   ) {
    //     lMasters.sum.PublicLiability = true;
    //   } else {
    //     lMasters.sum.PublicLiability = false;
    //   }
    // }
    else {
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
    }

    // setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  function createDateObject(dateString) {
    if (dateString) {
      return new Date(dateString);
    }
    return new Date(NaN);
  }

  const handleDateChange = (d, i, n, s) => {
    const age = AgeCalculator(new Date(d));
    if (age < 18) {
      swal({
        icon: "error",
        text: "Age cannot be less than 18 year",
      });
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = "";
      setDto({ ...lDto });
    } else {
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = formatDateKYC(d);
    }
    setDto({ ...lDto });
  };
  const handlePAnomDetails = (e, i, n, s) => {
    lDto.InsurableItem[0].RiskItems[0][s][i].NominationDetails[n] = e.target.value;
    setDto({ ...lDto });
  };
  // const abcd = ({ e, param }) => {
  //   debugger;
  //   const i = param.api.getRowIndex(param.row.id) + 1;
  //   console.log("data", i);
  //   lDto.InsurableItem[0].RiskItems[0].PersonalAccident[i].NominationDetails[e.target.name] =
  //     e.target.value;
  //   setDto({ ...lDto });
  // };

  const IsNumericVal = (e, i, n, s) => {
    if (IsNumeric(e.target.value) === true) {
      lMasters.error[s][i][n] = false;
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
    } else {
      lMasters.error[s][i][n] = true;
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const IsNumericPAVal = (e, i, n, s) => {
    if (IsNumeric(e.target.value) === true) {
      lMasters.error[s][i][n] = false;
      lDto.InsurableItem[0].RiskItems[0][s][i].NominationDetails[n] = e.target.value;
    } else {
      lMasters.error[s][i][n] = true;
      lDto.InsurableItem[0].RiskItems[0][s][i].NominationDetails[n] = "";
    }
    if (Number(e.target.value) > 18) {
      lMasters.error[s][i].AgeErr = true;
      lDto.InsurableItem[0].RiskItems[0][s][i].NominationDetails.NameofAppointee = "";
      lDto.InsurableItem[0].RiskItems[0][s][i].NominationDetails.AppointeeRelationshipwithNominee =
        "";
    } else {
      lMasters.error[s][i].AgeErr = false;
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const IsAlphaNumVal = (e, i, n, s) => {
    if (IsAlphaNum(e.target.value) === true) {
      lMasters.error[s][i][n] = false;
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
    } else {
      lMasters.error[s][i][n] = true;
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const IsAlphaNumSpaceVal = (e, i, n, s) => {
    if (IsAlphaNumSpace(e.target.value) === true) {
      lMasters.error[s][i][n] = false;
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
    } else {
      lMasters.error[s][i][n] = true;
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handleSI = (e, i, n, s) => {
    let AllRiskSI = 0;
    let PlateGlassSI = 0;
    let ElectronicEquipmentSI = 0;
    let BreakdownofBusinessEquipmentSI = 0;
    let PublicLiabilitySI = 0;
    if (s === "AllRiskSection") {
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;

      dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
        AllRiskSI += Number(x.SI);
      });
      if (AllRiskSI !== Number(dto.InsurableItem[0].Covers[8].AllRiskSI)) {
        lMasters.sum.AllRiskSection = true;
      } else {
        lMasters.sum.AllRiskSection = false;
      }
    } else if (s === "PlateGlass") {
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
      dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
        PlateGlassSI += Number(x.SI);
      });
      if (n === "SI" && PlateGlassSI !== Number(dto.InsurableItem[0].Covers[9].PlateGlassSI)) {
        lMasters.sum.PlateGlass = true;
      } else {
        lMasters.sum.PlateGlass = false;
      }
    } else if (s === "ElectronicEquipment") {
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
      dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
        ElectronicEquipmentSI += Number(x.SI);
      });
      if (n === "SI" && ElectronicEquipmentSI !== Number(dto.InsurableItem[0].Covers[10].EESI)) {
        lMasters.sum.ElectronicEquipment = true;
      } else {
        lMasters.sum.ElectronicEquipment = false;
      }
    } else if (s === "BreakdownofBusinessEquipment") {
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
      dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
        BreakdownofBusinessEquipmentSI += Number(x.SI);
      });
      if (
        n === "SI" &&
        BreakdownofBusinessEquipmentSI !== Number(dto.InsurableItem[0].Covers[11].BBESI)
      ) {
        lMasters.sum.BreakdownofBusinessEquipment = true;
      } else {
        lMasters.sum.BreakdownofBusinessEquipment = false;
      }
    } else if (s === "PublicLiability") {
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
      dto.InsurableItem[0].RiskItems[0][s].forEach((x) => {
        PublicLiabilitySI += Number(x.LimitofLiability);
      });
      if (
        n === "LimitofLiability" &&
        PublicLiabilitySI !== Number(dto.InsurableItem[0].Covers[14].PLLimit)
      ) {
        lMasters.sum.PublicLiability = true;
      } else {
        lMasters.sum.PublicLiability = false;
      }
    } else {
      lDto.InsurableItem[0].RiskItems[0][s][i][n] = e.target.value;
    }

    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  // const handleInputChange = (e, rowId, fieldName) => {
  //   const { value } = e.target;

  //   // Assuming lMasters is your state object
  //   setDto((prevState) => ({
  //     ...prevState,
  //     InsurableItem: prevState.InsurableItem.map((item) => {
  //       if (item.SNo === rowId) {
  //         return {
  //           ...item,
  //           RiskItems: item.RiskItems.map((riskItem) => ({
  //             ...riskItem,
  //             PublicLiability: {
  //               ...riskItem.PublicLiability,
  //               [fieldName]: value,
  //             },
  //           })),
  //         };
  //       }
  //       return item;
  //     }),
  //   }));
  // };
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const onTerrorism = (e) => {
    lDto.InsurableItem[0].Covers[0].IsOptional = e.target.checked;
    lDto.InsurableItem[0].Covers[2].IsOptional = e.target.checked;
    setDto({ ...lDto });
  };

  const { search } = useLocation();
  useEffect(async () => {
    const quoteRefNo = new URLSearchParams(search).get("quotationno");
    // const quoteRefNo = "USBS202310050000326";

    if (quoteRefNo !== null) {
      // setQuoteFlag(true);
      // await getRequest(`Quotation/GetQuoteByNumber?QuoteNo=${quoteRefNo}`);
      await getQuoteSummary(quoteRefNo).then((result) => {
        console.log("response", result);
        const chaneldata = result.data.quotation.channel;
        const chanelparsedata = JSON.parse(chaneldata);
        console.log("chanelparse", chanelparsedata);
        const quotationDetailsDTO = result.data.quotation.quotationDetailsDTO[0].quotationDetails;
        const quotationDetailsDTOparse = JSON.parse(quotationDetailsDTO);
        lMasters.flags.CalPreSuc = true;
        lMasters.QuoteSearch = true;
        const fidelityGuaranteeCount =
          quotationDetailsDTOparse.InsurableItem[0].RiskItems[0].FidelityGuarantee.length;

        for (let i = 0; i < fidelityGuaranteeCount; i += 1) {
          lMasters.error.FidelityGuarantee.push({
            ...lMasters.Validation.FidelityGuarantee,
            SNo: lMasters.error.FidelityGuarantee.length + 1,
          });
        }

        const PersonalAccidentCount =
          quotationDetailsDTOparse.InsurableItem[0].RiskItems[0].PersonalAccident.length;

        for (let i = 0; i < PersonalAccidentCount; i += 1) {
          lMasters.error.PersonalAccident.push({
            ...lMasters.Validation.PersonalAccident,
            SNo: lMasters.error.PersonalAccident.length + 1,
          });
        }
        lMasters.proposerProps.var = {
          ...lMasters.proposerProps.var,
          ...quotationDetailsDTOparse.CkycDetails,
        };
        const PublicLiabilityCount =
          quotationDetailsDTOparse.InsurableItem[0].RiskItems[0].PublicLiability.length;

        for (let i = 0; i < PublicLiabilityCount; i += 1) {
          lMasters.error.PublicLiability.push({
            ...lMasters.Validation.PublicLiability,
            SNo: lMasters.error.PublicLiability.length + 1,
          });
        }
        setDto({ ...quotationDetailsDTOparse });
        setMasters({ ...lMasters });
        console.log("quotationDetailsDTO", quotationDetailsDTOparse);
      });
    }
  }, []);
  const Navigate = useNavigate();
  useEffect(async () => {
    const proposalNoo = new URLSearchParams(search).get("proposernum");
    // const quoteRefNo = "USBS202310050000326";
    if (proposalNoo !== null) {
      await GetProposalByNumber(proposalNoo).then((result) => {
        Navigate("/BusinessShield/ShopKeeper?acstep=2");
        const quotationDetailsDTOparse = result.data[0].policyDetails;
        lMasters.flags.CalPreSuc = true;
        lMasters.QuoteSearch = true;
        const fidelityGuaranteeCount =
          quotationDetailsDTOparse.InsurableItem[0].RiskItems[0].FidelityGuarantee.length;

        for (let i = 0; i < fidelityGuaranteeCount; i += 1) {
          lMasters.error.FidelityGuarantee.push({
            ...lMasters.Validation.FidelityGuarantee,
            SNo: lMasters.error.FidelityGuarantee.length + 1,
          });
        }

        const PersonalAccidentCount =
          quotationDetailsDTOparse.InsurableItem[0].RiskItems[0].PersonalAccident.length;

        for (let i = 0; i < PersonalAccidentCount; i += 1) {
          lMasters.error.PersonalAccident.push({
            ...lMasters.Validation.PersonalAccident,
            SNo: lMasters.error.PersonalAccident.length + 1,
          });
        }

        const PublicLiabilityCount =
          quotationDetailsDTOparse.InsurableItem[0].RiskItems[0].PublicLiability.length;

        for (let i = 0; i < PublicLiabilityCount; i += 1) {
          lMasters.error.PublicLiability.push({
            ...lMasters.Validation.PublicLiability,
            SNo: lMasters.error.PublicLiability.length + 1,
          });
        }
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

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            // radioLabel: { label: "Business Type", labelVisible: true },
            radioLabel: {
              label: <span style={{ fontSize: "18px" }}>Business Type</span>,
              variant: "h1",
              labelVisible: true,
            },
            radioList: [
              { value: "New", label: "New", disabled: true },
              { value: "Renewal", label: "Renewal", disabled: true },
            ],
            path: "BusinessType",
            spacing: 12,
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: !masters.QuoteSearch,
            path: "PolicyStartDate",
            dateFormat: "Y-m-d",
            minDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            maxDate: addMonths(new Date(), 1),
            customOnChange: (e, v) => handlePolDate(e, v),
            spacing: 3,
            // error: dto.PolicyStartDate === "" && masters.err.AllReq,
            validationId: 1,
            // disabled: masters.flags.CalPreSuc,
            // inputProps: { disabled: masters.flags.CalPreSuc },
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: masters.QuoteSearch,
            dateFormat: "Y-m-d",
            disabled: true,
            // input: { InputProps: { readOnly: true } },
            path: "PolicyStartDate",
            spacing: 3,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            dateFormat: "Y-m-d",
            disabled: true,
            // input: { InputProps: { readOnly: true } },
            path: "PolicyEndDate",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            spacing: 6,
            visible: true,
          },
          {
            type: "Input",
            label: "Proposer Name",
            visible: true,
            required: true,
            onChangeFuncs: ["IsAlphaSpace"],
            path: `ProposerDetails.Name`,
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            validationId: 1,
            // error: dto.ProposerDetails["First Name"] === "" && masters.err.AllReq,
          },
          {
            type: "Input",
            label: "Email Id",
            visible: true,
            required: true,
            path: `QuoteEmail`,
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            // onBlurFuncs: ["IsEmail"],
            onBlurFuncs: [EmailValidation],
            // error: dto.ProposerDetails["Email ID"] === "" && masters.err.AllReq,
            validationId: 1,
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            required: true,
            path: `QuoteMobileNo`,
            onChangeFuncs: ["IsNumeric"],
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            spacing: 3,
            onBlurFuncs: ["IsMobileNumber"],
            validationId: 1,
            // error: dto.ProposerDetails["Mobile Number"] === "" && masters.err.AllReq,
          },

          {
            type: "Typography",
            label: "",
            spacing: 3,
            visible: true,
          },
          // ],

          // [
          {
            type: "Typography",
            visible: true,
            spacing: 2,
            sx: { color: "#c70825" },
            variant: "h6",
            label: "Risk Details",
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          {
            type: "Typography",
            label: "I - Fire",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px", mt: "5px" },
            spacing: 2,
          },
          {
            type: "Custom",
            label: "",
            spacing: 7.8,
            visible: true,
          },
          {
            type: "AutoComplete",
            label: "Occupancy",
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            required: true,
            path: `OccupancyValue`,
            spacing: 3,
            options: masters.Occupancy,
            validationId: 1,
            error: masters.err.Occupancy,
            disableClearable: true,
            errtext:
              masters.err.Occupancy && "Selected Occupancy is subject to Underwriter Approval",

            // error: dto.Occupancy === "" && masters.err.AllReq,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "Occupancy"),
          },
          // {
          //   type: "AutoComplete",
          //   label: "Nature of activity",
          //   visible: true,
          //   spacing: 3,
          //   disabled: masters.flags.CalPreSuc,
          //   required: true,
          //   path: `CompanyType`,
          //   options: builtInMasters.CompanyType,
          //   validationId: 1,
          //   disableClearable: true,
          //   // error: dto.CompanyType === "" && masters.err.AllReq,
          // },
          {
            type: "Input",
            label: "Nature of activity",
            spacing: 3,
            visible: true,
            disabled: true,
            // InputProps: { readOnly: true },
            InputProps: { disabled: true },
            path: `CompanyType`,
          },
          {
            type: "Input",
            label: "Building SI",
            spacing: 3,
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            path: `BuildingSI`,
            // onBlurFuncs: [IsSI],
            customOnChange: (e) => SIVal(e, "BuildingSI"),
          },
          {
            type: "Input",
            label: "Plant & Machinery",
            onChangeFuncs: ["IsNumeric"],
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            visible: true,
            path: `PlantMachinerySI`,
            // onBlurFuncs: [IsSI],
            customOnChange: (e) => SIVal(e, "PlantMachinerySI"),
          },

          {
            type: "Input",
            label: "Furniture, Fixture & Fittings",
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            visible: true,
            path: `FurnitureFixtureFSI`,
            // onBlurFuncs: [IsSI],
            customOnChange: (e) => SIVal(e, "FurnitureFixtureFSI"),
          },
          {
            type: "Input",
            label: "Raw Material Stock",
            // onBlurFuncs: [IsSI],
            // onChangeFuncs: ["IsNumeric"],
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            spacing: 3,
            path: `RawSI`,
            customOnChange: (e) => SIVal(e, "RawSI"),
          },
          {
            type: "Input",
            label: "Stock in Process",
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 }
            InputProps: { maxLength: 10 },
            visible: true,
            path: `StockinProgressSI`,
            // onBlurFuncs: [IsSI],
            customOnChange: (e) => SIVal(e, "StockinProgressSI"),
          },
          {
            type: "Input",
            label: "Finished Stock",
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            visible: true,
            path: `FinishStockSI`,
            // onBlurFuncs: [IsSI],
            customOnChange: (e) => SIVal(e, "FinishStockSI"),
          },

          {
            type: "Input",
            label: "Description of Other Content",
            spacing: 3,
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            path: `OtherContent`,
            // onBlurFuncs: [IsSI],
            // customOnChange: (e) => SIVal(e, "OtherContentSI"),
          },
          {
            type: "Input",
            label: "Other Content SI",
            spacing: 3,
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            path: `OtherContentSI`,
            // onBlurFuncs: [IsSI],
            customOnChange: (e) => SIVal(e, "OtherContentSI"),
          },

          {
            type: "Input",
            label: "Total SI",
            visible: true,
            path: `TotalSI`,
            disabled: true,
            InputProps: { disabled: true },
            error: masters.err.TotalSI || masters.err.TSI,
            errtext:
              masters.err.TotalSI &&
              "Since Total SI is greater than 5cr, this is subject to Underwriter Approval",
          },
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 3,
          //   return: (
          //     <MDInput
          //       error={masters.err.TotalSI || masters.err.TSI}
          //       helperText={
          //         masters.err.TotalSI &&
          //         "Since Total SI is greater than 5cr, this is subject to Underwriter Approval"
          //       }
          //       label="Total SI"
          //       value={dto.TotalSI}
          //       disabled
          //     />
          //   ),
          // },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Fire Protection",
            spacing: 3,
            path: "FireProtectionValue",
            validationId: 1,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },

            options: masters.FireProtection,
            disableClearable: true,
            // error: dto.FireProtection === "" && masters.err.AllReq,
            customOnChange: (e, v) => handleSetAutoComplete(e, v, "FireProtection"),
          },

          {
            type: "AutoComplete",
            // label: "Percentage Of Stock",
            // label: "Maintainence Standard",
            label: "Maintenance Standard",
            visible: true,
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            required: true,
            disableClearable: true,
            // path: `PercentageOfStock`,
            path: `MaintainenceStandards`,
            validationId: 1,
            options: masters.MaintainenceStandards,
            // options: masters.StockExposureBLUSBSUS,
            // error: dto.PercentageOfStock === "" && masters.err.AllReq,
          },
          {
            type: "AutoComplete",
            label: "Age of Building",
            spacing: 3,
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            required: true,
            path: `AgeofBuilding`,
            disableClearable: true,
            options: masters.AgeOfBuildingBLUSBSUS,
            validationId: 1,
            // error: dto.AgeofBuilding === "" && masters.err.AllReq,
          },
          {
            type: "AutoComplete",
            label: "Housekeeping Type",
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            spacing: 3,
            required: true,
            path: `HousekeepingType`,
            validationId: 1,
            disableClearable: true,
            options: masters.HouseKeepingBLUSBSUS,
            // error: dto.HousekeepingType === "" && masters.err.AllReq,
          },
          {
            type: "AutoComplete",
            label: "Risk Terrain",
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            visible: true,
            required: true,
            path: `RiskTerrain`,
            validationId: 1,
            disableClearable: true,
            options: masters.RiskTerrainBLUSBSUS,
            // error: dto.RiskTerrain === "" && masters.err.AllReq,
          },
          {
            type: "AutoComplete",
            label: "Distance From Public Fire Brigade",
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            visible: true,
            required: true,
            validationId: 1,
            path: `DistanceFromPublicFireBrigade`,
            disableClearable: true,
            options: masters.DstPublicFireBrigade,
            // error: dto.DistanceFromPublicFireBrigade === "" && masters.err.AllReq,
          },
          {
            type: "AutoComplete",
            label: "Business Portfolio",
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            spacing: 3,
            required: true,
            path: `BusinessPortfolio`,
            validationId: 1,
            disableClearable: true,
            options: masters.ClientBusinessExperiance,
            // error: dto.BusinessPortfolio === "" && masters.err.AllReq,
            // open: masters.openAuto,
            // onOpen: (prevState) => setMasters({ ...prevState, ...lMasters, openAuto: true }),
            // onClose: (prevState) => setMasters({ ...prevState, ...lMasters, openAuto: false }),
          },
          {
            type: "AutoComplete",
            label: "Type of Construction",
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            validationId: 1,
            visible: true,
            required: true,
            path: `TypeofConstruction`,
            disableClearable: true,
            options: masters.TypeOfConstructionBLUSBSUS,
            // error: dto.TypeofConstruction === "" && masters.err.AllReq,
          },
          {
            type: "AutoComplete",
            label: "Claims Ratio",
            visible: true,
            required: true,
            path: `ClaimsRatio`,
            // options: masters.ClaimsRationBLUSBSUS,
            // options: builtInMasters.ClaimsRatio,
            options: masters.ClaimsRatioSK,
            validationId: 1,
            error: masters.err.ClaimsRatio,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            disableClearable: true,
            errtext:
              masters.err.ClaimsRatio && "Selected Claims Ratio is subject to Underwriter Approval",
            customOnChange: (e, v) => onAuto5(e, v, "ClaimsRatio"),
          },
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 3,

          //   return: (
          //     <Autocomplete
          //       fullWidth
          //       sx={{
          //         "& .MuiOutlinedInput-root": {
          //           padding: "4px!important",
          //         },
          //       }}
          //       options={masters.ClaimsRationBLUSBSUS}
          //       getOptionLabel={(option) => option.mValue}
          //       renderInput={(params) => (
          //         <MDInput
          //           error={
          //             masters.err.ClaimsRatio || (dto.ClaimsRatio === "" && masters.err.AllReq)
          //           }
          //           helperText={
          //             masters.err.ClaimsRatio &&
          //             "Selected Claims Ratio is subject to Underwriter Approval"
          //           }
          //           {...params}
          //           label="ClaimsRatio"
          //           disabled={masters.flags.CalPreSuc}
          //           required
          //         />
          //       )}
          //       value={{ mValue: dto.ClaimsRatio }}
          //       onChange={(e, v) => onAuto5(e, v, "ClaimsRatio")}
          //     />
          //   ),
          // },
          {
            type: "AutoComplete",
            label: "Basement Exposure",
            visible: true,
            required: true,
            path: `BasementExposure`,
            options: masters.BaseExpo,
            validationId: 1,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            error: masters.err.BasementExposure,
            disableClearable: true,
            errtext:
              masters.err.BasementExposure &&
              "Since Basement Exposure is selected as 'Yes', this is subject to Underwriter Approval",
            customOnChange: (e, v) => onAuto6(e, v, "BasementExposure"),
          },
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 3,

          //   return: (
          //     <Autocomplete
          //       fullWidth
          //       sx={{
          //         "& .MuiOutlinedInput-root": {
          //           padding: "4px!important",
          //         },
          //       }}
          //       options={masters.BaseExpo}
          //       getOptionLabel={(option) => option.mValue}
          //       renderInput={(params) => (
          //         <MDInput
          //           error={
          //             masters.err.BasementExposure ||
          //             (dto.BasementExposure === "" && masters.err.AllReq)
          //           }
          //           helperText={
          //             masters.err.BasementExposure &&
          //             "Since Basement Exposure is selected as 'Yes', this is subject to Underwriter Approval"
          //           }
          //           {...params}
          //           label="Basement Exposure"
          //           required
          //         />
          //       )}
          //       value={{ mValue: dto.BasementExposure }}
          //       onChange={(e, v) => onAuto6(e, v, "BasementExposure")}
          //     />
          //   ),
          // },
          // {
          //   type: "Input",
          //   label: "No of Sections",
          //   visible: true,
          //   required: true,
          //   path: `NoofSections`,
          // },

          // {
          //   type: "Input",
          //   label: "Loading Amount",
          //   visible: true,
          //   // required: true,
          //   onBlurFuncs: [Loading],
          //   path: `Loading`,
          // },

          {
            type: "Checkbox",
            visible: true,
            label: "Terrorism",
            checkedVal: true,
            unCheckedVal: false,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            spacing: 3,
            path: `InsurableItem.0.Covers.0.IsOptional`,
            customOnChange: (e) => onTerrorism(e),
          },
          // ],
          // [
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            sx: { color: "#c70825" },
            variant: "h6",
            label: "Risk Location",
          },
          {
            type: "Input",
            label: "Address 01",
            visible: true,
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            required: true,
            path: `Address01`,
            validationId: 1,
            // error: dto.Address01 === "" && masters.err.AllReq,
          },
          {
            type: "Input",
            label: "Address 02",
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            spacing: 3,
            visible: true,
            // required: true,
            path: `Address02`,
          },
          {
            type: "Input",
            label: "Pincode",
            visible: true,
            required: true,
            path: `Pincode`,
            // InputProps: { maxLength: 6, disabled: masters.flags.CalPreSuc },
            InputProps: { maxLength: 6 },
            error: masters.err.Pincode,
            // || masters.err.pinVal,
            // disabled: masters.flags.CalPreSuc,
            errtext: masters.err.Pincode && "Selected Pincode is subject to Underwriter Approval",
            // : masters.err.pinVal && "Enter Valid Pincode",
            // onBlurFuncs: [IsPincode],
            // onChange: (e) => handlePincode(e),
            customOnBlur: (e) => handlePincode(e),
            validationId: 1,
          },
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 3,
          //   return: (
          //     <MDInput
          //       error={
          //         masters.err.Pincode ||
          //         (dto.Pincode === "" && masters.err.AllReq) ||
          //         masters.err.pinVal
          //       }
          //       helperText={
          //         masters.err.Pincode
          //           ? "Selected Pincode is subject to Underwriter Approval"
          //           : masters.err.pinVal && "Enter Valid Pincode"
          //       }
          //       label="Pincode"
          //       inputProps={{ maxLength: 6 }}
          //       value={dto.Pincode}
          //       required
          //       sx={redAsterisk}
          //       disabled={masters.flags.CalPreSuc}
          //       onChange={(e) => handlePincode(e)}
          //       onBlur={(e) => handlePincode1(e)}
          //     />
          //   ),
          // },
          {
            type: "AutoComplete",
            label: "City",
            visible: true,
            // spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },

            required: true,
            path: `City`,
            // value: masters.CityDistrict.risk,
            options: masters.riskCD,
            customOnChange: (e, v) => handleCity(e, v),
            validationId: 1,
            // error: dto.City === "" && masters.err.AllReq,
          },
          {
            type: "Input",
            label: "State",
            spacing: 3,
            visible: true,
            disabled: true,
            InputProps: { disabled: true },
            path: `State`,
            // onKeyDown: (e) => {
            //   if (e.keyCode === 9) e.preventDefault();
            // },
          },
          {
            type: "Input",
            label: "Zone",
            spacing: 3,
            visible: true,
            disabled: true,
            InputProps: { disabled: true },
            path: `Zone`,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            variant: "h6",
            sx: { color: "#c70825" },
            label: "Additional Sections (Optional)",
          },
          // {
          //   type: "Typography",
          //   visible: true,
          //   label: "Fire",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.0.IsOptional`,
          // },
          // {
          //   type: "Typography",
          //   label: "Fire",
          //   visible: true,
          //   variant: "h6",
          //   sx: { fontSize: "17px" },
          //   spacing: 2.8,
          // },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 0.2,
          //   variant: "h6",
          //   label: ":",
          // },

          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 6,
          //   label: "",
          // },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Burglary and Robbery",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.3.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label: "II - Burglary and Robbery",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          {
            type: "AutoComplete",
            label: "First Loss Basis %",
            visible: true,
            required: dto.InsurableItem[0].Covers[3].IsOptional,
            spacing: 3,
            // disableCloseOnSelect: true,
            // disablePortal: true,
            path: `InsurableItem.0.Covers.3.BR_FLBPercent`,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            options: masters.BurglaryFLBPercentSK,
            customOnChange: (e, v) => onAuto1(e, v, "Burglary"),
          },
          {
            type: "Input",
            disabled: true,
            InputProps: { disabled: true },
            visible: true,
            label: "SI",
            path: `InsurableItem.0.Covers.3.SI`,
            spacing: 3,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 3,
            label: "",
          },
          {
            type: "Typography",
            visible: true,
            spacing: 3,
            label: "",
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Theft",
            checkedVal: true,
            unCheckedVal: false,
            disabled: true,
            InputProps: { disabled: true },
            spacing: 3,
            path: `InsurableItem.0.Covers.4.IsOptional`,
          },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 3,
          //   label: "",
          // },
          {
            type: "Checkbox",
            visible: true,
            label: "RSMD",
            checkedVal: true,
            unCheckedVal: false,
            spacing: 3,
            disabled: true,
            InputProps: { disabled: true },
            path: `InsurableItem.0.Covers.5.IsOptional`,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 3,
            label: "",
          },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Money Section",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.7.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label: "III - Money Section",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[7].IsOptional === false,
          //   spacing: 9,
          //   label: "",
          // },
          // {
          //   type: "Input",
          //   label: "Cashin Safe SI",
          //   visible: true,
          //   required: dto.InsurableItem[0].Covers[7].IsOptional,
          //   spacing: 3,
          //   // onChangeFuncs: ["IsNumeric"],
          //   // onBlurFuncs: [CashinSafeSISI],
          //   path: `InsurableItem.0.Covers.7.CashinSafeSI`,
          //   customOnChange: (e) => onInput(e, "CashinSafeSI", 7),
          // },
          {
            type: "Custom",
            visible: true,
            spacing: 3,
            return: (
              <MDInput
                error={
                  (dto.InsurableItem[0].Covers[7].CashinSafeSI === "" &&
                    dto.InsurableItem[0].Covers[7].IsOptional) ||
                  masters.err.CashinSafeSI ||
                  masters.err.CashinSafeSI1
                }
                helperText={
                  masters.err.CashinSafeSI
                    ? "SI should not exceeds 50,00,000"
                    : masters.err.CashinSafeSI1 && "Allows Only Numbers"
                }
                label="Cashin Safe SI"
                value={dto.InsurableItem[0].Covers[7].CashinSafeSI}
                required={dto.InsurableItem[0].Covers[7].IsOptional}
                onChange={(e) => onInputMoneySection(e, "CashinSafeSI", 7)}
                onBlur={(e) => CashinSafeSI(e, "CashinSafeSI", 7, "CashinSafeSI1")}
                // disabled={masters.flags.CalPreSuc}
                // InputProps={{ disabled: masters.flags.CalPreSuc, maxLength: 10 }}
                InputProps={{ maxLength: 10 }}
                sx={redAsterisk}
              />
            ),
          },
          // {
          //   type: "Input",
          //   label: "Annual Turn Over (In Transit)",
          //   visible: true,
          //   required: dto.InsurableItem[0].Covers[7].IsOptional,
          //   spacing: 3,
          //   onBlurFuncs: [IsSI],
          //   // error:
          //   //   dto.InsurableItem[0].Covers[7].IsOptional &&
          //   //   dto.InsurableItem[0].Covers[7].MoneyInTransitSI === "",
          //   path: `InsurableItem.0.Covers.7.MoneyInTransitSI`,
          //   disabled: masters.flags.CalPreSuc,

          //   customOnChange: (e) => onInput(e, "MoneyInTransitSI", 7),
          // },
          {
            type: "Custom",
            visible: true,
            spacing: 3,
            return: (
              <MDInput
                error={
                  (dto.InsurableItem[0].Covers[7].MoneyInTransitSI === "" &&
                    dto.InsurableItem[0].Covers[7].IsOptional) ||
                  masters.err.MoneyInTransitSI ||
                  masters.err.MoneyInTransitSI1
                }
                helperText={
                  masters.err.MoneyInTransitSI
                    ? "SI should not exceeds 5Crs"
                    : masters.err.MoneyInTransitSI1 && "Allows Only Numbers"
                }
                label="Annual Turn Over (In Transit)"
                value={dto.InsurableItem[0].Covers[7].MoneyInTransitSI}
                required={dto.InsurableItem[0].Covers[7].IsOptional}
                onChange={(e) => onInputMoneySection(e, "MoneyInTransitSI", 7)}
                onBlur={(e) => MoneyInTransitSI(e, "MoneyInTransitSI", 7, "MoneyInTransitSI1")}
                // disabled={masters.flags.CalPreSuc}
                // InputProps={{ disabled: masters.flags.CalPreSuc, maxLength: 10 }}
                InputProps={{ maxLength: 10 }}
                sx={redAsterisk}
              />
            ),
          },
          // {
          //   type: "Input",
          //   label: "Single Carrying Limit",
          //   visible: true,
          //   required: dto.InsurableItem[0].Covers[7].IsOptional,
          //   spacing: 3,
          //   error:
          //     dto.InsurableItem[0].Covers[7].IsOptional &&
          //     dto.InsurableItem[0].Covers[7].SingleCarryingLimit === "",
          //   onBlurFuncs: [SingleCarryingLimitSI],
          //   disabled: masters.flags.CalPreSuc,

          //   path: `InsurableItem.0.Covers.7.SingleCarryingLimit`,
          //   customOnChange: (e) => onInput(e, "SingleCarryingLimit", 7),
          // },
          {
            type: "Custom",
            visible: true,
            spacing: 3,
            return: (
              <MDInput
                error={
                  (dto.InsurableItem[0].Covers[7].SingleCarryingLimit === "" &&
                    dto.InsurableItem[0].Covers[7].IsOptional) ||
                  masters.err.SingleCarryingLimit ||
                  masters.err.SingleCarryingLimit1
                }
                helperText={
                  masters.err.SingleCarryingLimit
                    ? "SI should not exceeds 5,00,000"
                    : masters.err.SingleCarryingLimit1 && "Allows Only Numbers"
                }
                label="Single Carrying Limit"
                value={dto.InsurableItem[0].Covers[7].SingleCarryingLimit}
                required={dto.InsurableItem[0].Covers[7].IsOptional}
                onChange={(e) => onInputMoneySection(e, "SingleCarryingLimit", 7)}
                onBlur={(e) =>
                  SingleCarryingLimitSI(e, "SingleCarryingLimit", 7, "SingleCarryingLimit1")
                }
                // disabled={masters.flags.CalPreSuc}
                // InputProps={{ disabled: masters.flags.CalPreSuc, maxLength: 10 }}
                InputProps={{ maxLength: 10 }}
                sx={redAsterisk}
              />
            ),
          },

          {
            type: "Typography",
            visible: true,
            spacing: 3,
            label: "",
          },
          {
            type: "Typography",
            label: "Money In Transit Details",
            visible: true,
            // variant: "h6",
            sx: { fontSize: "16px", mt: "10px" },
            spacing: 3,
          },
          {
            type: "Input",
            label: "From",
            visible: true,
            path: `InsurableItem.0.Covers.7.From`,
            required: dto.InsurableItem[0].Covers[7].IsOptional,
            error:
              dto.InsurableItem[0].Covers[7].IsOptional &&
              dto.InsurableItem[0].Covers[7].From === "",
            disabled: true,
            InputProps: { disabled: true },
            spacing: 3,
          },
          {
            type: "Input",
            label: "To",
            visible: true,
            path: `InsurableItem.0.Covers.7.To`,
            required: dto.InsurableItem[0].Covers[7].IsOptional,
            error:
              dto.InsurableItem[0].Covers[7].IsOptional && dto.InsurableItem[0].Covers[7].To === "",
            disabled: true,
            InputProps: { disabled: true },
            spacing: 3,
          },

          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[7].IsOptional,
          //   spacing: 3,
          //   label: "",
          // },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Fidelity Guarantee",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.12.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label: "IV - Fidelity Guarantee",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[12].IsOptional === false,
          //   spacing: 9,
          //   label: "",
          // },
          {
            type: "Input",
            label: "Any One Year Limit",
            visible: true,
            required: dto.InsurableItem[0].Covers[12].IsOptional,
            spacing: 3,
            error:
              dto.InsurableItem[0].Covers[12].FGYearLimit === "" &&
              dto.InsurableItem[0].Covers[12].IsOptional,
            errtext: masters.err.FGYearLimit
              ? "SI should not exceeds 50,00,000"
              : masters.err.FGYearLimit1 && "Allows Only Numbers",
            customOnBlur: (e) => FGYearLimit(e),
            path: `InsurableItem.0.Covers.12.FGYearLimit`,
            customOnChange: (e) => onFGYearLimit(e, "FGYearLimit", 12),
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
          },
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 3,
          //   return: (
          //     <MDInput
          //       error={
          //         (dto.InsurableItem[0].Covers[12].FGYearLimit === "" &&
          //           dto.InsurableItem[0].Covers[12].IsOptional) ||
          //         masters.err.FGYearLimit ||
          //         masters.err.FGYearLimit1
          //       }
          //       helperText={
          //         masters.err.FGYearLimit
          //           ? "SI should not exceeds 50,00,000"
          //           : masters.err.FGYearLimit1 && "Allows Only Numbers"
          //       }
          //       label="Any One Year Limit"
          //       value={dto.InsurableItem[0].Covers[12].FGYearLimit}
          //       required={dto.InsurableItem[0].Covers[12].IsOptional}
          //       onChange={(e) => onFGYearLimit(e, "FGYearLimit", 12)}
          //       onBlur={(e) => FGYearLimit(e)}
          //       disabled={masters.flags.CalPreSuc}
          //       InputProps={{ disabled: masters.flags.CalPreSuc }}
          //       sx={redAsterisk}
          //     />
          //   ),
          // },
          {
            type: "Input",
            label: "No of Persons",
            visible: true,
            onBlurFuncs: [onBluronNoofPersons],
            required: dto.InsurableItem[0].Covers[12].IsOptional,
            spacing: 3,
            // error:
            //   dto.InsurableItem[0].Covers[12].NoofPersons === "" &&
            //   dto.InsurableItem[0].Covers[12].IsOptional,

            path: `InsurableItem.0.Covers.12.NoofPersons`,
            customOnChange: (e) => onNoofPersons(e, "NoofPersons", 12),
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 4 },
            InputProps: { maxLength: 4 },
            // onBlurFuncs: [PANOfEmployees],
          },
          {
            type: "Input",
            label: "Per person limit",
            visible: true,
            spacing: 3,
            disabled: true,
            InputProps: { disabled: true },
            path: `InsurableItem.0.Covers.12.PerPersonLimit`,
          },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 3,
          //   label: "",
          // },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Public Liabiity",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.14.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label: "V - Public Liabiity",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[14].IsOptional === false,
          //   spacing: 9,
          //   label: "",
          // },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          // {
          //   type: "Input",
          //   label: "Limit",
          //   visible: true,
          //   required: dto.InsurableItem[0].Covers[14].IsOptional,
          //   spacing: 3,
          //   onBlurFuncs: [CashinSafeSISI],
          //   disabled: masters.flags.CalPreSuc,
          //   path: `InsurableItem.0.Covers.14.PLLimit`,
          //   customOnChange: (e) => onInput(e, "PLLimit", 14),
          // },
          {
            type: "Custom",
            visible: true,
            spacing: 3,
            return: (
              <MDInput
                error={
                  (dto.InsurableItem[0].Covers[14].PLLimit === "" &&
                    dto.InsurableItem[0].Covers[14].IsOptional) ||
                  masters.err.PLLimit ||
                  masters.err.PLLimit1
                }
                helperText={
                  masters.err.PLLimit
                    ? "SI should not exceeds 50,00,000"
                    : masters.err.PLLimit1 && "Allows Only Numbers"
                }
                label="Limit"
                value={dto.InsurableItem[0].Covers[14].PLLimit}
                required={dto.InsurableItem[0].Covers[14].IsOptional}
                onChange={(e) => onInput(e, "PLLimit", 14)}
                onBlur={(e) => CashinSafeSI(e, "PLLimit", 14, "PLLimit1")}
                // disabled={masters.flags.CalPreSuc}
                // InputProps={{ disabled: masters.flags.CalPreSuc, maxLength: 10 }}
                InputProps={{ maxLength: 10 }}
                sx={redAsterisk}
              />
            ),
          },
          {
            type: "Input",
            label: "AOA : AOY (1:1)",
            visible: true,
            required: dto.InsurableItem[0].Covers[14].IsOptional,
            spacing: 3,
            error:
              dto.InsurableItem[0].Covers[14].IsOptional &&
              dto.InsurableItem[0].Covers[14].AOA_AOY === "",
            // disabled: masters.flags.CalPreSuc,
            // onBlurFuncs: [IsNumeric],
            path: `InsurableItem.0.Covers.14.AOA_AOY`,
            customOnChange: (e) => onInput(e, "AOA_AOY", 14),
            disabled: true,
            InputProps: { disabled: true },
          },
          {
            type: "Typography",
            visible: true,
            spacing: 3,
            label: "",
          },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Business Interruption",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.1.IsOptional`,
          // },
          {
            type: "Typography",
            label: "VI - Business Interruption",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[1].IsOptional === false,
          //   spacing: 9,
          //   label: "",
          // },
          {
            type: "Input",
            label: "Annual Gross Profit",
            visible: true,
            required: dto.InsurableItem[0].Covers[1].IsOptional,
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            onBlurFuncs: [IsSI],
            path: `InsurableItem.0.Covers.1.AnnualGrossProfit`,
            customOnChange: (e) => onInput(e, "AnnualGrossProfit", 1),
          },
          // {
          //   type: "Input",
          //   label: "FLB SI",
          //   visible: dto.InsurableItem[0].Covers[1].IsOptional,
          //   required: dto.InsurableItem[0].Covers[1].IsOptional,
          //   spacing: 3,
          //   onChangeFuncs: ["IsNumeric"],
          //   path: `InsurableItem.0.Covers.1.FLBSI`,
          // },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Terrorism - BI",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 6,
          //   path: `InsurableItem.0.Covers.2.IsOptional`,
          // },

          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Extension",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.4.IsOptional`,
          // },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 6,
          //   label: "",
          // },

          // {
          //   type: "Typography",
          //   label: "Right Shift after first loss basis",
          //   visible: true,
          //   variant: "h6",
          //   sx: { fontSize: "17px" },
          //   spacing: 2.8,
          // },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 0.2,
          //   variant: "h6",
          //   label: ":",
          // },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 9,
          //   label: "",
          // },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Baggage Insurance",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.6.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label: "VII - Baggage Insurance",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          {
            type: "Input",
            label: "No of Employees",
            visible: true,
            required: dto.InsurableItem[0].Covers[6].IsOptional,
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            error:
              dto.InsurableItem[0].Covers[6].BagNoOfEmployees === "" &&
              dto.InsurableItem[0].Covers[6].IsOptional,
            path: `InsurableItem.0.Covers.6.BagNoOfEmployees`,
            customOnChange: (e) => onInputBagNoOfEmployees(e, "BagNoOfEmployees"),
          },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[6].IsOptional === false,
          //   spacing: 3,
          //   label: "",
          // },
          {
            type: "AutoComplete",
            label: "SI per Person",
            visible: true,
            required: dto.InsurableItem[0].Covers[6].IsOptional,
            spacing: 3,
            path: `InsurableItem.0.Covers.6.BagSI`,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },

            error:
              dto.InsurableItem[0].Covers[6].BagSI === "" &&
              dto.InsurableItem[0].Covers[6].IsOptional,
            options: masters.BagSISK,
            customOnChange: (e, v) => onAuto2(e, v, "BagSI"),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 3,
            label: "",
          },

          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "All Risk Section (Laptops,Mobile Phones etc)",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.8.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label: "VIII - All Risk Section (Laptops,Mobile Phones etc)",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[8].IsOptional === false,
          //   spacing: 9,
          //   label: "",
          // },
          {
            type: "Input",
            label: "SI",
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            required: dto.InsurableItem[0].Covers[8].IsOptional,
            spacing: 3,
            // onChangeFuncs: ["IsNumeric"],
            onBlurFuncs: [AllRiskSISI],
            path: `InsurableItem.0.Covers.8.AllRiskSI`,
            customOnChange: (e) => onInput(e, "AllRiskSI", 8),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Plate Glass and Neon Signs/Glow Signs",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.9.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label: "IX - Plate Glass and Neon Signs/Glow Signs",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[9].IsOptional === false,
          //   spacing: 9,
          //   label: "",
          // },
          {
            type: "Input",
            label: "SI",
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            required: dto.InsurableItem[0].Covers[9].IsOptional,
            spacing: 3,
            // onChangeFuncs: ["IsNumeric"],
            onBlurFuncs: [CashinSafeSISI],
            path: `InsurableItem.0.Covers.9.PlateGlassSI`,
            customOnChange: (e) => onInput(e, "PlateGlassSI", 9),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Electronic Equipment (Computers,Printers,UPS,chipbased & related accessories)",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 6,
          //   path: `InsurableItem.0.Covers.10.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label:
              "X - Electronic Equipment (Computers,Printers,UPS,chipbased & related accessories)",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[10].IsOptional === false,
          //   spacing: 6,
          //   label: "",
          // },
          {
            type: "Input",
            label: "SI",
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            required: dto.InsurableItem[0].Covers[10].IsOptional,
            spacing: 3,
            // onChangeFuncs: ["IsNumeric"],
            onBlurFuncs: [AllRiskSISI],
            path: `InsurableItem.0.Covers.10.EESI`,
            customOnChange: (e) => onInput(e, "EESI", 10),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },
          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Machinery Breakdown (Motor based Machines)",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.11.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label: "XI - Machinery Breakdown (Motor based Machines)",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[11].IsOptional === false,
          //   spacing: 9,
          //   label: "",
          // },
          {
            type: "Input",
            label: "SI",
            visible: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 10 },
            InputProps: { maxLength: 10 },
            required: dto.InsurableItem[0].Covers[11].IsOptional,
            spacing: 3,
            // onChangeFuncs: ["IsNumeric"],
            onBlurFuncs: [AllRiskSISI],
            path: `InsurableItem.0.Covers.11.BBESI`,
            customOnChange: (e) => onInput(e, "BBESI", 11),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },

          // {
          //   type: "Checkbox",
          //   visible: true,
          //   label: "Personal Accident",
          //   checkedVal: true,
          //   unCheckedVal: false,
          //   spacing: 2,
          //   path: `InsurableItem.0.Covers.13.IsOptional`,
          //   // customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          // },
          {
            type: "Typography",
            label: "XII - Personal Accident",
            visible: true,
            variant: "h6",
            sx: { fontSize: "16px" },
            spacing: 2.8,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 0.2,
            variant: "h6",
            label: ":",
          },
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 1,

          //   return: (
          //     <Tooltip title="Insurance Company." arrow placement="bottom">
          //       <InfoIcon />
          //     </Tooltip>
          //   ),
          // },
          // {
          //   type: "Typography",
          //   visible: dto.InsurableItem[0].Covers[13].IsOptional === false,
          //   spacing: 10,
          //   label: "",
          // },
          // {
          //   type: "AutoComplete",s
          //   label: "Category",
          //   visible: true,
          //   required: dto.InsurableItem[0].Covers[13].IsOptional,
          //   spacing: 3,
          //   path: `InsurableItem.0.Covers.13.PACategory`,
          //   options: builtInMasters.PA,
          // },
          {
            type: "Custom",
            visible: true,
            spacing: 3,

            return: (
              <>
                <Autocomplete
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  options={masters.PACategory}
                  getOptionLabel={(option) => option.mValue}
                  renderOption={(props, option) => (
                    <Tooltip
                      title={option.TypeCode}
                      placement="right"
                      // sx={{
                      //   backgroundColor: "blue", // Change the background color
                      //   color: "white", // Change the text color
                      //   fontSize: "16px",
                      //   maxWidth: "300px",
                      //   padding: "12px",
                      // }}
                    >
                      <li {...props}>{option.mValue}</li>
                    </Tooltip>
                  )}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Category"
                      required={dto.InsurableItem[0].Covers[13].IsOptional}
                      sx={redAsterisk}
                    />
                  )}
                  value={{ mValue: dto.InsurableItem[0].Covers[13].PACategory }}
                  onChange={(e, v) => onAuto3(e, v, "PACategory")}
                  // disabled={masters.flags.CalPreSuc}
                  // InputProps={{ disabled: masters.flags.CalPreSuc }}
                />
                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={lMasters.Loader}
                >
                  <CircularProgress />
                </Backdrop>
              </>
            ),
          },
          {
            type: "Input",
            label: "No of Employees",
            visible: true,
            required: dto.InsurableItem[0].Covers[13].IsOptional,
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc, maxLength: 3 },
            InputProps: { maxLength: 3 },
            onBlurFuncs: [PANOfEmployees],
            path: `InsurableItem.0.Covers.13.PANOfEmployees`,
            customOnChange: (e) => onInputPANOfEmployees(e, "PANOfEmployees"),
          },
          {
            type: "AutoComplete",
            label: "SI per Person",
            visible: true,
            required: dto.InsurableItem[0].Covers[13].IsOptional,
            spacing: 3,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            path: `InsurableItem.0.Covers.13.PASI`,
            options: masters.PersonalAccidentSISK,
            customOnChange: (e, v) => onAuto4(e, v, "PASI"),
          },
          {
            type: "Input",
            label: "Details of assets/stocks & business activity",
            visible: true,
            rows: 4,
            multiline: true,
            // disabled: masters.flags.CalPreSuc,
            // InputProps: { disabled: masters.flags.CalPreSuc },
            inputProps: { maxLength: 500 },
            spacing: 6,
            path: `SpecialConditions`,
            // customOnChange: (e) => onChange(e, "PANOfEmployees"),
          },
          //   <TextField
          //   label="Description"
          //   multiline
          //   rows={4}
          //   variant="outlined"
          //   inputProps={{ maxLength: 500 }} // Set your desired character limit here
          // />
          // ],
          // [
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },
          {
            type: "Typography",
            visible: true,
            spacing: 9.5,
            label: "",
          },
          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 1,
            label: "Calculate Premium",
            variant: "outlined",
            spacing: 2.5,
            visible: masters.flags.CalPreSuc === false,
            onClick: CalPre,
          },
          {
            type: "Custom",
            visible: dto.PremiumDetails["Total with Tax"] !== 0,
            spacing: 12,
            return: (
              <Grid container spacing={2} mt={2}>
                {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}> */}
                <Grid item xs={12} sm={12} md={6} lg={5} xl={5} xxl={5}>
                  <Grid item md={12}>
                    <Tabs
                      // value={masters.flags.activeTab}
                      // onChange={handleTabChange}
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: "#c70825",
                        },
                      }}
                    >
                      <Tab
                        label="Quote"
                        style={{ backgroundColor: "#c70825", color: "#fff" }}
                        // {...a11yProps(0)} onClick={() => handelTab(0)}
                      />
                      {/* {masters.flags.showTab && (
                      <Tab label="Quote2" {...a11yProps(1)} onClick={() => handelTab(1)} />
                    )}
                    {masters.flags.showTabQ && (
                      <Tab label="Quote3" {...a11yProps(2)} onClick={() => handelTab(2)} />
                    )}
                    {!masters.flags.showButton && (
                      <MDButton
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleClickTab}
                      />
                    )} */}
                    </Tabs>
                  </Grid>
                  {/* <TabPanel value={masters} index={0}> */}
                  {/* {quote(0)} */}
                  {/* <Quotes
                    // dto={dto}
                    // setDto={setDto}
                    // masters={masters}
                    // setMasters={setMasters}
                    // ind={0}
                    // medicalSumInsured={medicalSumInsured}
                    /> */}
                  <Box
                    sx={{
                      marginTop: "30px",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    {/* <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "spaceBetween",
                        width: "50%",
                      }}
                    > */}
                    {/* {/* <Grid container spacing={2}> */}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      {/* <Autocomplete
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
                width: "200px",
              }}
              options={medicalSumInsured}
              value={{ mValue: masters.Quotes[ind].MedicalSumInsured }}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, v) => handleAutocomplete(e, v)}
              renderInput={(params) => (
                <MDInput {...params} label="Select sum insured Limit" required />
              )}
            /> */}
                      <MDInput
                        label="Loading"
                        value={dto.Loading}
                        onChange={(e) => onLoad(e)}
                        onBlur={(e) => onLoad1(e)}
                        error={
                          (dto.Loading !== "" && masters.loadflag) ||
                          (dto.Loading !== "" && masters.err.Loading)
                        }
                        helperText={
                          dto.Loading !== "" && masters.loadflag
                            ? "Enter Valid Loading Amount"
                            : dto.Loading !== "" &&
                              masters.err.Loading &&
                              "Since Loading is a Negative Value, this is subject to Underwriter Approval"
                        }
                      />
                    </Grid>
                    {/* </Grid> */}
                  </Box>
                  {/* </Box> */}
                  {/* </TabPanel> */}
                </Grid>
                {/* <Grid item xs={12} sm={4} md={6} lg={6} xl={6} xxl={6}> */}
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {/* <MDBox pt={1} sx={{ backgroundColor: "#b0e0e6" }} p={2}> */}
                  <MDBox pt={1} sx={{ backgroundColor: "#f2f2f2" }} p={2}>
                    <Grid px={1} spacing={1}>
                      <Table aria-label="simple table" mt="2%" sx={{ maxwidth: "100%" }}>
                        <TableRow tabIndex={-1}>
                          <TableCell style={{ borderBottom: "none" }} sx={{ fontWeight: "bold" }}>
                            Summary
                          </TableCell>
                          <TableCell
                            style={{
                              borderBottom: "none",
                              fontWeight: "bold",
                              textAlign: "right",
                            }}
                            // sx={
                            //   masters.flags.selectedColumn === 0
                            //     ? { backgroundColor: "#c70825", color: "white !important" }
                            //     : {}
                            // }
                          >
                            {" "}
                            Quote
                          </TableCell>
                        </TableRow>
                        <TableBody>
                          {data1.map((item, i) => (
                            <TableRow>
                              <TableCell
                                style={{
                                  borderBottom: "none",
                                  fontWeight: i === 2 ? "bold" : "normal",
                                }}
                              >
                                {" "}
                                {item.label}
                              </TableCell>
                              <TableCell
                                style={{
                                  borderBottom: "none",
                                  textAlign: "right",
                                  fontWeight: "bold",
                                }}
                                // sx={
                                //   masters.flags.selectedColumn === 0
                                //     ? { backgroundColor: "#c70825", color: "white !important" }
                                //     : {}
                                // }
                              >
                                {/* ₹&nbsp;24,483 */}₹ {dto.PremiumDetails[item.name]}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Grid>
                    <Grid container justifyContent="space-between" my={2}>
                      <MDButton variant="outlined" onClick={onDownloadQuote}>
                        Download Quote
                      </MDButton>
                      <MDButton variant="outlined" onClick={onShareQuote}>
                        share Quote
                      </MDButton>
                    </Grid>
                  </MDBox>
                </Grid>

                <Grid container justifyContent="right" mt={2}>
                  <MDButton variant="outlined" onClick={CalPre}>
                    Calculate Premium
                  </MDButton>
                </Grid>
                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={lMasters.Loader}
                />
                {/* <Grid container justifyContent="space-between" my={2}>
                  {/* <Stack justifyContent="space-between" direction="row"> */}
                {/* <MDButton
                  variant="outlined"
                  // onClick={saveAndExit}
                >
                  Save & Exit
                </MDButton>
                <MDButton
                  variant="outlined"
                  // onClick={handleCalculatePremium}
                >
                  Calculate Premium
                </MDButton> */}
                {/* </Stack> */}
                {/* </Grid>  */}
              </Grid>
            ),
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          // {
          //   type: "Button",
          //   label: "Add",
          //   visible: true,
          //   onClick: (e) => handleOpen(e, "AllRiskSection"),
          //   disabled: dto.InsurableItem[0].Covers[8].IsOptional === false,
          // },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "SNo",
            path: "InsurableItem.0.RiskItems.0.AllRiskSection",
            rowPerPage: 5,
            getRowHeight: 70,
            onCellKeyDown: { handleKeyDown },
            columns: [
              {
                field: "SNo",
                headerName: "S. No",
                width: 80,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Particular",
                headerName: "Particular (Portable Equipment)",
                width: 250,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Particular"
                    value={params.row.Particular}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "Particular", "AllRiskSection")
                    }
                    // error={params.row.Particular === "" && masters.errFill}
                    disabled={dto.InsurableItem[0].Covers[8].IsOptional === false}
                  />
                ),
              },
              {
                field: "YearofMfg",
                headerName: "Year of Mfg",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="YearofMfg"
                    value={params.row.YearofMfg}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "YearofMfg", "AllRiskSection")
                    }
                    onBlur={(e) =>
                      IsNumericVal(e, params.row.SNo - 1, "YearofMfg", "AllRiskSection")
                    }
                    error={masters.error.AllRiskSection[params.row.SNo - 1].YearofMfg}
                    helperText={
                      masters.error.AllRiskSection[params.row.SNo - 1].YearofMfg &&
                      "Allows only Numbers"
                    }
                    inputProps={{ maxLength: 4 }}
                    disabled={dto.InsurableItem[0].Covers[8].IsOptional === false}
                  />
                ),
              },
              {
                field: "Make",
                headerName: "Make / Model",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Make"
                    value={params.row.Make}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "Make", "AllRiskSection")
                    }
                    disabled={dto.InsurableItem[0].Covers[8].IsOptional === false}
                  />
                ),
              },
              {
                field: "SerialNumber",
                headerName: "Serial Number",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="SerialNumber"
                    // inputProps={{ maxLength: 35 }}
                    value={params.row.SerialNumber}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "SerialNumber", "AllRiskSection")
                    }
                    onBlur={(e) =>
                      IsAlphaNumVal(e, params.row.SNo - 1, "SerialNumber", "AllRiskSection")
                    }
                    error={masters.error.AllRiskSection[params.row.SNo - 1].SerialNumber}
                    helperText={
                      masters.error.AllRiskSection[params.row.SNo - 1].SerialNumber &&
                      "Allows only Alpha Numerics"
                    }
                    inputProps={{ maxLength: 35 }}
                    disabled={dto.InsurableItem[0].Covers[8].IsOptional === false}
                  />
                ),
              },
              {
                field: "SI",
                headerName: "Sum Insured",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="SI"
                    value={params.row.SI}
                    onChange={(e) => handleSI(e, params.row.SNo - 1, "SI", "AllRiskSection")}
                    onBlur={(e) => IsNumericVal(e, params.row.SNo - 1, "SI", "AllRiskSection")}
                    error={masters.error.AllRiskSection[params.row.SNo - 1].SI}
                    helperText={
                      masters.error.AllRiskSection[params.row.SNo - 1].SI && "Allows only Numbers"
                    }
                    disabled={dto.InsurableItem[0].Covers[8].IsOptional === false}
                    inputProps={{ maxLength: 10 }}
                  />
                ),
              },
              // {
              //   field: "Add",
              //   headerName: "",
              //   width: 50,
              //   renderCell: (params) =>

              // },
              {
                field: "Delete",
                headerName: "",
                width: 50,
                renderCell: (params) => {
                  const onDelete = () => {
                    const newArray = dto.InsurableItem[0].RiskItems[0].AllRiskSection.filter(
                      (x) => x.SNo !== params.row.SNo
                    );
                    lDto.InsurableItem[0].RiskItems[0].AllRiskSection = newArray;
                    newArray.forEach((x, i) => {
                      newArray[i].SNo = i + 1;
                    });
                    setDto({ ...lDto });
                  };
                  return params.row.addFlag && dto.InsurableItem[0].Covers[8].IsOptional ? (
                    <AddIcon
                      sx={{ ml: "0.5rem" }}
                      color="primary"
                      onClick={(e) => handleOpen(e, "AllRiskSection")}
                      // disabled={dto.InsurableItem[0].Covers[8].IsOptional === false}
                    />
                  ) : (
                    dto.InsurableItem[0].Covers[8].IsOptional && (
                      <DeleteIcon
                        sx={{ ml: "0.5rem" }}
                        color="primary"
                        onClick={() => onDelete()}
                      />
                    )
                  );
                },
              },
            ],
          },
          {
            type: "Typography",
            label: "All Risk Sum Insured should be equal to Sum Insured in Quick Quote",
            visible: masters.sum.AllRiskSection,
            sx: {
              color: "red",
              fontSize: "13px",
            },
            spacing: 6,
          },
        ],
        [
          // {
          //   type: "Button",
          //   label: "Add",
          //   visible: true,
          //   onClick: (e) => handleOpen(e, "PlateGlass"),
          //   disabled: dto.InsurableItem[0].Covers[9].IsOptional === false,
          // },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "SNo",
            // getRowHeight: "auto",
            path: "InsurableItem.0.RiskItems.0.PlateGlass",
            rowPerPage: 5,
            getRowHeight: 70,
            onCellKeyDown: { handleKeyDown },
            columns: [
              {
                field: "SNo",
                headerName: "S. No",
                width: 80,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "LocationDetails",
                headerName: "Location Details",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="LocationDetails"
                    value={params.row.LocationDetails}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "LocationDetails", "PlateGlass")
                    }
                    disabled={dto.InsurableItem[0].Covers[9].IsOptional === false}
                  />
                ),
              },
              {
                field: "TypeDimensionoOfSign",
                headerName: "Type  & Dimension of Sign (Metal / Plastic / Glow Sign)",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="TypeDimensionoOfSign"
                    value={params.row.TypeDimensionoOfSign}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "TypeDimensionoOfSign", "PlateGlass")
                    }
                    disabled={dto.InsurableItem[0].Covers[9].IsOptional === false}
                  />
                ),
              },

              {
                field: "SI",
                headerName: "Sum Insured",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="SI"
                    value={params.row.SI}
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) => handleSI(e, params.row.SNo - 1, "SI", "PlateGlass")}
                    onBlur={(e) => IsNumericVal(e, params.row.SNo - 1, "SI", "PlateGlass")}
                    error={masters.error.PlateGlass[params.row.SNo - 1].SI}
                    helperText={
                      masters.error.PlateGlass[params.row.SNo - 1].SI && "Allows only Numbers"
                    }
                    disabled={dto.InsurableItem[0].Covers[9].IsOptional === false}
                  />
                ),
              },
              {
                field: "Delete",
                headerName: "",
                width: 50,
                renderCell: (params) => {
                  const onDelete = () => {
                    const newArray = dto.InsurableItem[0].RiskItems[0].PlateGlass.filter(
                      (x) => x.SNo !== params.row.SNo
                    );
                    lDto.InsurableItem[0].RiskItems[0].PlateGlass = newArray;
                    newArray.forEach((x, i) => {
                      newArray[i].SNo = i + 1;
                    });
                    setDto({ ...lDto });
                  };
                  return params.row.addFlag && dto.InsurableItem[0].Covers[9].IsOptional ? (
                    <AddIcon
                      sx={{ ml: "0.5rem" }}
                      color="primary"
                      onClick={(e) => handleOpen(e, "PlateGlass")}
                      // disabled={dto.InsurableItem[0].Covers[9].IsOptional === false}
                    />
                  ) : (
                    dto.InsurableItem[0].Covers[9].IsOptional && (
                      <DeleteIcon
                        sx={{ ml: "0.5rem" }}
                        color="primary"
                        onClick={() => onDelete()}
                      />
                    )
                  );
                },
              },
              // {
              //   field: "Add",
              //   headerName: "",
              //   width: 50,
              //   renderCell: (params) =>

              // },
            ],
          },
          {
            type: "Typography",
            label: "Plate Glass Sum Insured should be equal to Sum Insured in Quick Quote",
            visible: masters.sum.PlateGlass,
            sx: {
              color: "red",
              fontSize: "13px",
            },
            spacing: 6,
          },
        ],
        [
          // {
          //   type: "Button",
          //   label: "Add",
          //   visible: true,
          //   onClick: (e) => handleOpen(e, "ElectronicEquipment"),
          //   disabled: dto.InsurableItem[0].Covers[10].IsOptional === false,
          // },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "SNo",
            // getRowHeight: "auto",
            path: "InsurableItem.0.RiskItems.0.ElectronicEquipment",
            rowPerPage: 5,
            getRowHeight: 70,
            onCellKeyDown: { handleKeyDown },
            columns: [
              {
                field: "SNo",
                headerName: "S. No",
                width: 80,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ElectronicType",
                headerName: "Electronic Type",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="ElectronicType"
                    value={params.row.ElectronicType}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "ElectronicType",
                        "ElectronicEquipment"
                      )
                    }
                    disabled={dto.InsurableItem[0].Covers[10].IsOptional === false}
                  />
                ),
              },
              {
                field: "Locationaddress",
                headerName: "Location Address ",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Locationaddress"
                    value={params.row.Locationaddress}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "Locationaddress",
                        "ElectronicEquipment"
                      )
                    }
                    disabled={dto.InsurableItem[0].Covers[10].IsOptional === false}
                  />
                ),
              },
              {
                field: "YearofMfg",
                headerName: "Year of Mfg",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="YearofMfg"
                    value={params.row.YearofMfg}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "YearofMfg", "ElectronicEquipment")
                    }
                    onBlur={(e) =>
                      IsNumericVal(e, params.row.SNo - 1, "YearofMfg", "ElectronicEquipment")
                    }
                    error={masters.error.ElectronicEquipment[params.row.SNo - 1].YearofMfg}
                    helperText={
                      masters.error.ElectronicEquipment[params.row.SNo - 1].YearofMfg &&
                      "Allows only Numbers"
                    }
                    inputProps={{ maxLength: 4 }}
                    disabled={dto.InsurableItem[0].Covers[10].IsOptional === false}
                  />
                ),
              },
              {
                field: "Make",
                headerName: "Make / Model",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Make"
                    value={params.row.Make}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "Make", "ElectronicEquipment")
                    }
                    disabled={dto.InsurableItem[0].Covers[10].IsOptional === false}
                  />
                ),
              },
              {
                field: "SerialNumber",
                headerName: "Serial Number",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="SerialNumber"
                    value={params.row.SerialNumber}
                    inputProps={{ maxLength: 35 }}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "SerialNumber",
                        "ElectronicEquipment"
                      )
                    }
                    onBlur={(e) =>
                      IsAlphaNumVal(e, params.row.SNo - 1, "SerialNumber", "ElectronicEquipment")
                    }
                    error={masters.error.ElectronicEquipment[params.row.SNo - 1].SerialNumber}
                    helperText={
                      masters.error.ElectronicEquipment[params.row.SNo - 1].SerialNumber &&
                      "Allows only Alpha Numerics"
                    }
                    disabled={dto.InsurableItem[0].Covers[10].IsOptional === false}
                  />
                ),
              },
              {
                field: "SI",
                headerName: "Sum Insured",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="SI"
                    value={params.row.SI}
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) => handleSI(e, params.row.SNo - 1, "SI", "ElectronicEquipment")}
                    onBlur={(e) => IsNumericVal(e, params.row.SNo - 1, "SI", "ElectronicEquipment")}
                    error={masters.error.ElectronicEquipment[params.row.SNo - 1].SI}
                    helperText={
                      masters.error.ElectronicEquipment[params.row.SNo - 1].SI &&
                      "Allows only Numbers"
                    }
                    disabled={dto.InsurableItem[0].Covers[10].IsOptional === false}
                  />
                ),
              },
              {
                field: "Delete",
                headerName: "",
                width: 50,
                renderCell: (params) => {
                  const onDelete = () => {
                    const newArray = dto.InsurableItem[0].RiskItems[0].ElectronicEquipment.filter(
                      (x) => x.SNo !== params.row.SNo
                    );
                    lDto.InsurableItem[0].RiskItems[0].ElectronicEquipment = newArray;
                    newArray.forEach((x, i) => {
                      newArray[i].SNo = i + 1;
                    });
                    setDto({ ...lDto });
                  };
                  return params.row.addFlag && dto.InsurableItem[0].Covers[10].IsOptional ? (
                    <AddIcon
                      sx={{ ml: "0.5rem" }}
                      color="primary"
                      onClick={(e) => handleOpen(e, "ElectronicEquipment")}
                      // disabled={dto.InsurableItem[0].Covers[10].IsOptional === false}
                    />
                  ) : (
                    dto.InsurableItem[0].Covers[10].IsOptional && (
                      <DeleteIcon
                        sx={{ ml: "0.5rem" }}
                        color="primary"
                        onClick={() => onDelete()}
                      />
                    )
                  );
                },
              },
            ],
          },
          {
            type: "Typography",
            label: "Electronic Equipment Sum Insured should be equal to Sum Insured in Quick Quote",
            visible: masters.sum.ElectronicEquipment,
            sx: {
              color: "red",
              fontSize: "13px",
            },
            spacing: 6,
          },
        ],
        [
          // {
          //   type: "Button",
          //   label: "Add",
          //   visible: true,
          //   onClick: (e) => handleOpen(e, "BreakdownofBusinessEquipment"),
          //   disabled: dto.InsurableItem[0].Covers[11].IsOptional === false,
          // },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // getRowHeight: "auto",
            rowId: "SNo",
            path: "InsurableItem.0.RiskItems.0.BreakdownofBusinessEquipment",
            getRowHeight: 70,
            rowPerPage: 5,
            onCellKeyDown: { handleKeyDown },
            columns: [
              {
                field: "SNo",
                headerName: "S. No",
                width: 80,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "TypeofMachinery",
                headerName: "Type of Machinery",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="TypeofMachinery"
                    value={params.row.TypeofMachinery}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "TypeofMachinery",
                        "BreakdownofBusinessEquipment"
                      )
                    }
                    disabled={dto.InsurableItem[0].Covers[11].IsOptional === false}
                  />
                ),
              },
              {
                field: "Locationaddress",
                headerName: "Location Address ",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Locationaddress"
                    value={params.row.Locationaddress}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "Locationaddress",
                        "BreakdownofBusinessEquipment"
                      )
                    }
                    disabled={dto.InsurableItem[0].Covers[11].IsOptional === false}
                  />
                ),
              },
              {
                field: "YearofMfg",
                headerName: "Year of Mfg",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="YearofMfg"
                    value={params.row.YearofMfg}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "YearofMfg",
                        "BreakdownofBusinessEquipment"
                      )
                    }
                    onBlur={(e) =>
                      IsNumericVal(
                        e,
                        params.row.SNo - 1,
                        "YearofMfg",
                        "BreakdownofBusinessEquipment"
                      )
                    }
                    error={masters.error.BreakdownofBusinessEquipment[params.row.SNo - 1].YearofMfg}
                    helperText={
                      masters.error.BreakdownofBusinessEquipment[params.row.SNo - 1].YearofMfg &&
                      "Allows only Numbers"
                    }
                    inputProps={{ maxLength: 4 }}
                    disabled={dto.InsurableItem[0].Covers[11].IsOptional === false}
                  />
                ),
              },
              {
                field: "Make",
                headerName: "Make / Model",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Make"
                    value={params.row.Make}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "Make",
                        "BreakdownofBusinessEquipment"
                      )
                    }
                    disabled={dto.InsurableItem[0].Covers[11].IsOptional === false}
                  />
                ),
              },
              {
                field: "SerialNumber",
                headerName: "Serial Number",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="SerialNumber"
                    value={params.row.SerialNumber}
                    inputProps={{ maxLength: 35 }}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "SerialNumber",
                        "BreakdownofBusinessEquipment"
                      )
                    }
                    onBlur={(e) =>
                      IsAlphaNumVal(
                        e,
                        params.row.SNo - 1,
                        "SerialNumber",
                        "BreakdownofBusinessEquipment"
                      )
                    }
                    error={
                      masters.error.BreakdownofBusinessEquipment[params.row.SNo - 1].SerialNumber
                    }
                    helperText={
                      masters.error.BreakdownofBusinessEquipment[params.row.SNo - 1].SerialNumber &&
                      "Allows only Alpha Numerics"
                    }
                    disabled={dto.InsurableItem[0].Covers[11].IsOptional === false}
                  />
                ),
              },
              {
                field: "SI",
                headerName: "Sum Insured",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="SI"
                    value={params.row.SI}
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) =>
                      handleSI(e, params.row.SNo - 1, "SI", "BreakdownofBusinessEquipment")
                    }
                    onBlur={(e) =>
                      IsNumericVal(e, params.row.SNo - 1, "SI", "BreakdownofBusinessEquipment")
                    }
                    error={masters.error.BreakdownofBusinessEquipment[params.row.SNo - 1].SI}
                    helperText={
                      masters.error.BreakdownofBusinessEquipment[params.row.SNo - 1].SI &&
                      "Allows only Numbers"
                    }
                    disabled={dto.InsurableItem[0].Covers[11].IsOptional === false}
                  />
                ),
              },

              {
                field: "Delete",
                headerName: "",
                width: 50,
                renderCell: (params) => {
                  const onDelete = () => {
                    const newArray =
                      dto.InsurableItem[0].RiskItems[0].BreakdownofBusinessEquipment.filter(
                        (x) => x.SNo !== params.row.SNo
                      );
                    lDto.InsurableItem[0].RiskItems[0].BreakdownofBusinessEquipment = newArray;
                    newArray.forEach((x, i) => {
                      newArray[i].SNo = i + 1;
                    });
                    setDto({ ...lDto });
                  };
                  return params.row.addFlag && dto.InsurableItem[0].Covers[11].IsOptional ? (
                    <AddIcon
                      sx={{ ml: "0.5rem" }}
                      color="primary"
                      onClick={(e) => handleOpen(e, "BreakdownofBusinessEquipment")}
                      // disabled={dto.InsurableItem[0].Covers[11].IsOptional === false}
                    />
                  ) : (
                    dto.InsurableItem[0].Covers[11].IsOptional && (
                      <DeleteIcon
                        sx={{ ml: "0.5rem" }}
                        color="primary"
                        onClick={() => onDelete()}
                      />
                    )
                  );
                },
              },
            ],
          },
          {
            type: "Typography",
            label: "Machinary Breakdown Sum Insured should be equal to Sum Insured in Quick Quote",
            visible: masters.sum.BreakdownofBusinessEquipment,
            sx: {
              color: "red",
              fontSize: "13px",
            },
            spacing: 6,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            required: dto.InsurableItem[0].Covers[12].IsOptional,
            radioLabel: { label: "Employee Type", labelVisible: true },
            radioList: [
              {
                value: "Named",
                label: "Named",
                disabled: true,
                // disabled: dto.InsurableItem[0].Covers[12].IsOptional === false,
              },
              // {
              //   value: "Unnamed",
              //   label: "Unnamed",
              //   disabled: dto.InsurableItem[0].Covers[12].IsOptional === false,
              // },
            ],
            path: "InsurableItem.0.Covers.12.EmployeeType",
            spacing: 12,
          },
          // {
          //   type: "Button",
          //   label: "Add",
          //   visible: true,
          //   onClick: (e) => handleOpen(e, "FidelityGuarantee"),
          // },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "SNo",
            // getRowHeight: "auto",
            path: "InsurableItem.0.RiskItems.0.FidelityGuarantee",
            getRowHeight: 70,
            rowPerPage: 5,
            onCellKeyDown: { handleKeyDown },
            columns: [
              {
                field: "SNo",
                headerName: "S. No",
                width: 80,
                headerAlign: "center",
                align: "center",
              },
              // {
              //   field: "NoofPersons",
              //   headerName: "No of Persons",
              //   width: 200,
              //   renderCell: (params) => (
              //     <TextField
              //       type="text"
              //       name="NoofPersons"
              //       value={params.row.NoofPersons}
              //       onChange={(e) =>
              //         handleInputChange(e, params.row.SNo - 1, "NoofPersons", "FidelityGuarantee")
              //       }
              //     />
              //   ),
              // },
              {
                field: "EmployeeName",
                headerName: "Employee Name ",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="EmployeeName"
                    value={params.row.EmployeeName}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "EmployeeName", "FidelityGuarantee")
                    }
                    onBlur={(e) =>
                      IsAlphaNumSpaceVal(e, params.row.SNo - 1, "EmployeeName", "FidelityGuarantee")
                    }
                    error={masters.error.FidelityGuarantee[params.row.SNo - 1].EmployeeName}
                    helperText={
                      masters.error.FidelityGuarantee[params.row.SNo - 1].EmployeeName &&
                      "Allows only Alpha Numerics"
                    }
                    disabled={dto.InsurableItem[0].Covers[12].IsOptional === false}
                  />
                ),
              },
              {
                field: "Designation",
                headerName: "Designation",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Designation"
                    value={params.row.Designation}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "Designation", "FidelityGuarantee")
                    }
                    onBlur={(e) =>
                      IsAlphaNumSpaceVal(e, params.row.SNo - 1, "Designation", "FidelityGuarantee")
                    }
                    error={masters.error.FidelityGuarantee[params.row.SNo - 1].Designation}
                    helperText={
                      masters.error.FidelityGuarantee[params.row.SNo - 1].Designation &&
                      "Allows only Alpha Numerics"
                    }
                    disabled={dto.InsurableItem[0].Covers[12].IsOptional === false}
                  />
                ),
              },
              {
                field: "LimitofLiability",
                headerName: "Limit of Liability",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="LimitofLiability"
                    value={params.row.LimitofLiability}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "LimitofLiability",
                        "FidelityGuarantee"
                      )
                    }
                    onBlur={(e) =>
                      IsNumericVal(e, params.row.SNo - 1, "LimitofLiability", "FidelityGuarantee")
                    }
                    error={masters.error.FidelityGuarantee[params.row.SNo - 1].LimitofLiability}
                    helperText={
                      masters.error.FidelityGuarantee[params.row.SNo - 1].LimitofLiability &&
                      "Allows only Numbers"
                    }
                    // disabled={dto.InsurableItem[0].Covers[12].EmployeeType === "Unnamed"}
                    disabled
                  />
                ),
              },

              // {
              //   field: "Delete",
              //   headerName: "Delete",
              //   width: 200,
              //   renderCell: (params) => {
              //     const onDelete = () => {
              //       const newArray = dto.InsurableItem[0].RiskItems[0].FidelityGuarantee.filter(
              //         (x) => x.SNo !== params.row.SNo
              //       );
              //       lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee = newArray;
              //       newArray.forEach((x, i) => {
              //         newArray[i].SNo = i + 1;
              //       });
              //       setDto({ ...lDto });
              //     };
              //     return <DeleteIcon color="primary" onClick={() => onDelete()} />;
              //   },
              // },
            ],
          },
        ],
        [
          // {
          //   type: "Button",
          //   label: "Add",
          //   visible: true,
          //   onClick: (e) => handleOpen(e, "PersonalAccident"),
          // },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "SNo",
            // getRowHeight: "auto",
            path: "InsurableItem.0.RiskItems.0.PersonalAccident",
            getRowHeight: 70,
            rowPerPage: 5,
            onCellKeyDown: { handleKeyDown },
            columns: [
              {
                field: "SNo",
                headerName: "S. No",
                width: 80,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "EmployeeName",
                headerName: "Employee Name",
                width: 200,
                headerAlign: "center",
                align: "center",
                // editable: true,
                // editField: "inEdit",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="EmployeeName"
                    value={params.row.EmployeeName}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "EmployeeName", "PersonalAccident")
                    }
                    onBlur={(e) =>
                      IsAlphaNumSpaceVal(e, params.row.SNo - 1, "EmployeeName", "PersonalAccident")
                    }
                    error={masters.error.PersonalAccident[params.row.SNo - 1].EmployeeName}
                    helperText={
                      masters.error.PersonalAccident[params.row.SNo - 1].EmployeeName &&
                      "Allows only Alpha Numerics"
                    }
                  />
                ),
              },
              {
                field: "Designation",
                headerName: "Designation",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Designation"
                    value={params.row.Designation}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "Designation", "PersonalAccident")
                    }
                    onBlur={(e) =>
                      IsAlphaNumSpaceVal(e, params.row.SNo - 1, "Designation", "PersonalAccident")
                    }
                    error={masters.error.PersonalAccident[params.row.SNo - 1].Designation}
                    helperText={
                      masters.error.PersonalAccident[params.row.SNo - 1].Designation &&
                      "Allows only Alpha Numerics"
                    }
                  />
                ),
              },
              {
                field: "DateofBirth",
                headerName: "Date of Birth",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  // <TextField
                  //   type="text"
                  //   name="DateofBirth"
                  //   value={params.row.DateofBirth}
                  //   onChange={(e) =>
                  //     handleInputChange(e, params.row.SNo - 1, "DateofBirth", "PersonalAccident")
                  //   }
                  // />
                  <MDDatePicker
                    input={{
                      // value: params.row.DateofBirth,
                      value: createDateObject(params.row.DateofBirth),
                    }}
                    // value={params.row.DateofBirth}
                    value={createDateObject(params.row.DateofBirth)}
                    options={{
                      altFormat: "d-m-Y",
                      dateFormat: "d-m-Y",
                      altInput: true,
                    }}
                    onChange={(date) =>
                      handleDateChange(date, params.row.SNo - 1, "DateofBirth", "PersonalAccident")
                    }
                  />
                ),
              },
              {
                field: "SI",
                headerName: "Sum Insured",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="SI"
                    value={params.row.SI}
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "SI", "PersonalAccident")
                    }
                    onBlur={(e) => IsNumericVal(e, params.row.SNo - 1, "SI", "PersonalAccident")}
                    error={masters.error.PersonalAccident[params.row.SNo - 1].SI}
                    helperText={
                      masters.error.PersonalAccident[params.row.SNo - 1].SI && "Allows only Numbers"
                    }
                    disabled
                  />
                ),
              },
              {
                field: "NameofNominee",
                headerName: "Name of Nominee",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="NameofNominee"
                    value={params.row.NominationDetails.NameofNominee}
                    // onChange={(e) => {
                    //   abcd({ e, param });
                    // }}
                    onChange={(e) =>
                      handlePAnomDetails(e, params.row.SNo - 1, "NameofNominee", "PersonalAccident")
                    }
                    // onBlur={(e) =>
                    //   IsAlphaNumSpaceVal(e, params.row.SNo - 1, "NameofNominee", "PersonalAccident")
                    // }
                    // error={masters.error.PersonalAccident[params.row.SNo - 1].NameofNominee}
                    // helperText={
                    //   masters.error.PersonalAccident[params.row.SNo - 1].NameofNominee &&
                    //   "Allows only Alpha Numerics"
                    // }
                  />
                ),
              },
              {
                field: "Age",
                headerName: "Nominee Age",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Age"
                    value={params.row.NominationDetails.Age}
                    onChange={(e) =>
                      handlePAnomDetails(e, params.row.SNo - 1, "Age", "PersonalAccident")
                    }
                    onBlur={(e) => IsNumericPAVal(e, params.row.SNo - 1, "Age", "PersonalAccident")}
                    error={masters.error.PersonalAccident[params.row.SNo - 1].Age}
                    helperText={
                      masters.error.PersonalAccident[params.row.SNo - 1].Age &&
                      "Allows only Numbers"
                    }
                  />
                ),
              },
              {
                field: "Relationship",
                headerName: "Relationship",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Relationship"
                    value={params.row.NominationDetails.Relationship}
                    onChange={(e) =>
                      handlePAnomDetails(e, params.row.SNo - 1, "Relationship", "PersonalAccident")
                    }
                  />
                ),
              },
              {
                field: "NameofAppointee",
                headerName: "Name of Appointee",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="NameofAppointee"
                    value={params.row.NominationDetails.NameofAppointee}
                    onChange={(e) =>
                      handlePAnomDetails(
                        e,
                        params.row.SNo - 1,
                        "NameofAppointee",
                        "PersonalAccident"
                      )
                    }
                    // onBlur={(e) =>
                    //   IsAlphaNumSpaceVal(
                    //     e,
                    //     params.row.SNo - 1,
                    //     "NameofAppointee",
                    //     "PersonalAccident"
                    //   )
                    // }
                    // error={masters.error.PersonalAccident[params.row.SNo - 1].NameofAppointee}
                    // helperText={
                    //   masters.error.PersonalAccident[params.row.SNo - 1].NameofAppointee &&
                    //   "Allows only Alpha Numerics"
                    // }
                    disabled={masters.error.PersonalAccident[params.row.SNo - 1].AgeErr}
                  />
                ),
              },
              {
                field: "AppointeeRelationshipwithNominee",
                headerName: "Appointee Relationship with Nominee",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="AppointeeRelationshipwithNominee"
                    value={params.row.NominationDetails.AppointeeRelationshipwithNominee}
                    onChange={(e) =>
                      handlePAnomDetails(
                        e,
                        params.row.SNo - 1,
                        "AppointeeRelationshipwithNominee",
                        "PersonalAccident"
                      )
                    }
                    disabled={masters.error.PersonalAccident[params.row.SNo - 1].AgeErr}
                  />
                ),
              },
              // {
              //   field: "Delete",
              //   headerName: "Delete",
              //   width: 200,
              //   renderCell: (params) => {
              //     const onDelete = () => {
              //       const newArray = dto.InsurableItem[0].RiskItems[0].PersonalAccident.filter(
              //         (x) => x.SNo !== params.row.SNo
              //       );
              //       lDto.InsurableItem[0].RiskItems[0].PersonalAccident = newArray;
              //       newArray.forEach((x, i) => {
              //         newArray[i].SNo = i + 1;
              //       });
              //       setDto({ ...lDto });
              //     };
              //     return <DeleteIcon color="primary" onClick={() => onDelete()} />;
              //   },
              // },
            ],
          },
        ],
        [
          // {
          //   type: "Button",
          //   label: "Add",
          //   visible: true,
          //   onClick: (e) => handleOpen(e, "PublicLiability"),
          //   disabled: dto.InsurableItem[0].Covers[14].IsOptional === false,
          // },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "SNo",
            // getRowHeight: "auto",
            path: "InsurableItem.0.RiskItems.0.PublicLiability",
            getRowHeight: 70,
            rowPerPage: 5,
            onCellKeyDown: { handleKeyDown },
            columns: [
              {
                field: "SNo",
                headerName: "S. No",
                width: 80,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Locationdetails",
                headerName: "Location Details",
                width: 200,
                headerAlign: "center",
                align: "center",
                // editable: true,
                // editField: "inEdit",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Location details"
                    value={params.row.Locationdetails}
                    onChange={(e) =>
                      handleInputChange(e, params.row.SNo - 1, "Locationdetails", "PublicLiability")
                    }
                    disabled={dto.InsurableItem[0].Covers[14].IsOptional === false}
                  />
                ),
              },
              {
                field: "AnyoneAccidentLimit",
                headerName: "Any one Accident Limit",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Location details"
                    value={params.row.AnyoneAccidentLimit}
                    // value={dto.InsurableItem[0].Covers[14].PLLimit}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        params.row.SNo - 1,
                        "AnyoneAccidentLimit",
                        "PublicLiability"
                      )
                    }
                    onBlur={(e) =>
                      IsNumericVal(e, params.row.SNo - 1, "AnyoneAccidentLimit", "PublicLiability")
                    }
                    error={masters.error.PublicLiability[params.row.SNo - 1].AnyoneAccidentLimit}
                    helperText={
                      masters.error.PublicLiability[params.row.SNo - 1].AnyoneAccidentLimit &&
                      "Allows only Numbers"
                    }
                    // disabled={dto.InsurableItem[0].Covers[14].IsOptional === false}
                    disabled
                  />
                ),
              },
              {
                field: "LimitofLiability",
                headerName: "Any one Year Limit",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="Location details"
                    value={params.row.LimitofLiability}
                    // value={dto.InsurableItem[0].Covers[14].PLLimit}
                    onChange={(e) =>
                      handleSI(e, params.row.SNo - 1, "LimitofLiability", "PublicLiability")
                    }
                    onBlur={(e) =>
                      IsNumericVal(e, params.row.SNo - 1, "LimitofLiability", "PublicLiability")
                    }
                    error={masters.error.PublicLiability[params.row.SNo - 1].LimitofLiability}
                    helperText={
                      masters.error.PublicLiability[params.row.SNo - 1].LimitofLiability &&
                      "Allows only Numbers"
                    }
                    // disabled={dto.InsurableItem[0].Covers[14].IsOptional === false}
                    disabled
                  />
                ),
              },
              // {
              //   field: "Delete",
              //   headerName: "",
              //   width: 50,
              //   renderCell: (params) => {
              //     const onDelete = () => {
              //       const newArray = dto.InsurableItem[0].RiskItems[0].PublicLiability.filter(
              //         (x) => x.SNo !== params.row.SNo
              //       );
              //       lDto.InsurableItem[0].RiskItems[0].PublicLiability = newArray;
              //       newArray.forEach((x, i) => {
              //         newArray[i].SNo = i + 1;
              //       });
              //       setDto({ ...lDto });
              //     };
              //     return params.row.addFlag && dto.InsurableItem[0].Covers[14].IsOptional ? (
              //       <AddIcon
              //         color="primary"
              //         onClick={(e) => handleOpen(e, "PublicLiability")}
              //         // disabled={dto.InsurableItem[0].Covers[14].IsOptional === false}
              //       />
              //     ) : (
              //       dto.InsurableItem[0].Covers[14].IsOptional && (
              //         <DeleteIcon color="primary" onClick={() => onDelete()} />
              //       )
              //     );
              //   },
              // },
            ],
          },
          {
            type: "Typography",
            label: "Public Liability Limit should be equal to Limit in Quick Quote",
            visible: masters.sum.PublicLiability,
            sx: {
              color: "red",
              fontSize: "13px",
            },
            spacing: 6,
          },
        ],
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
            type: "Custom",
            spacing: 1,
            visible: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "Payment Type *", labelVisible: true },
            radioList: [
              { value: "ClientPayment", label: "Client Payment" },
              { value: "AgentPayment", label: "Agent Payment" },
            ],
            path: "PaymentDetails.paymentType",
            spacing: 11,
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
    case 5:
      data = [[], [], []];
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
  // setBackDropFlag,
  // setActiveStep,
}) => {
  const lDto = dto;
  const lMasters = masters;

  let fun = true;
  switch (activeStep) {
    case 0:
      if (masters.err.LoadErr === true || masters.flags.editval === false) {
        swal({ icon: "error", text: "Please click on Calculate Premium" });

        fun = false;
      } else if (dto["Quotation No"] !== "") {
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
              lDto.Channel.PrimaryVerticalCode =
                partnerDetail.AdditionalDetails.PrimaryVerticalCode;
              // lDto.Channel.PrimaryVerticalName =
              //   partnerDetail.AdditionalDetails.PrimaryVerticalName;
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
              lDto.Channel.Mobile = partnerDetail.Mobile;
              lDto.Channel.Email = partnerDetail.Email;
              lDto["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;
              setDto({ ...lDto });
              // setBackDropFlag(false);
            });
          }
        );
        await callUpdateQuoteMethod(dto).then(async () => {
          const jsonValue = {
            communicationId: 222,
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
          await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
          const downloadDTO = {
            key: dto["Quotation No"],
            templateId: 225,
            referenceId: "",
          };
          await downloadQuote(downloadDTO);
        });

        const Message = `Dear Customer,Based on your requirements, UNIVERSAL SOMPO - BUSINESS SHIELD-SOOKSHMA UDYAM Insurance Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
        await SendSMS("usgi", dto.QuoteMobileNo, Message).then((smsResp) => {
          console.log("1234567890", smsResp);
        });
        if (dto.InsurableItem[0].Covers[12].IsOptional === true) {
          lDto.InsurableItem[0].RiskItems[0].FidelityGuarantee.forEach((x) => {
            const l = x;
            l.LimitofLiability = dto.InsurableItem[0].Covers[12].PerPersonLimit;
          });
        }
        if (dto.InsurableItem[0].Covers[13].IsOptional === true) {
          // lDto.InsurableItem[0].Covers[13].PerPersonSI = formater.format(
          //   Number(dto.InsurableItem[0].Covers[13].PASI) /
          //     Number(dto.InsurableItem[0].Covers[13].PANOfEmployees)
          // );

          lDto.InsurableItem[0].RiskItems[0].PersonalAccident.forEach((x) => {
            const l = x;
            l.SI = dto.InsurableItem[0].Covers[13].PASI;
          });
        }

        if (dto.InsurableItem[0].Covers[9].IsOptional === true) {
          lDto.InsurableItem[0].RiskItems[0].PlateGlass.forEach((x) => {
            const l = x;
            l.LocationDetails = `${dto.Address01} ${dto.Address02} , ${dto.City}, ${dto.State} - ${dto.Pincode}`;
          });
        }

        if (dto.InsurableItem[0].Covers[10].IsOptional === true) {
          lDto.InsurableItem[0].RiskItems[0].ElectronicEquipment.forEach((x) => {
            const l = x;
            l.Locationaddress = `${dto.Address01} ${dto.Address02} , ${dto.City}, ${dto.State} - ${dto.Pincode}`;
          });
        }
        if (dto.InsurableItem[0].Covers[11].IsOptional === true) {
          lDto.InsurableItem[0].RiskItems[0].BreakdownofBusinessEquipment.forEach((x) => {
            const l = x;
            l.Locationaddress = `${dto.Address01} ${dto.Address02} , ${dto.City}, ${dto.State} - ${dto.Pincode}`;
          });
        }
        if (dto.InsurableItem[0].Covers[14].IsOptional === true) {
          lDto.InsurableItem[0].RiskItems[0].PublicLiability.forEach((x) => {
            const l = x;
            l.Locationdetails = `${dto.Address01} ${dto.Address02} , ${dto.City}, ${dto.State} - ${dto.Pincode}`;
            l.LimitofLiability = dto.InsurableItem[0].Covers[14].PLLimit;
            l.AnyoneAccidentLimit = dto.InsurableItem[0].Covers[14].PLLimit;
          });
        }
        setDto({ ...lDto });
        // setBackDropFlag(false);
        // setActiveStep(activeStep + 2);
        // console.log("activeStep1", activeStep);
        fun = true;
      } else {
        fun = false;
      }

      break;
    case 1:
      {
        const emptyFields = dto.InsurableItem[0].RiskItems[0].AllRiskSection.filter(
          (x) =>
            x.SerialNumber === "" ||
            x.Particular === "" ||
            x.SI === "" ||
            x.YearofMfg === "" ||
            x.Make === ""
        );
        const emptyPlate = dto.InsurableItem[0].RiskItems[0].PlateGlass.filter(
          (x) => x.LocationDetails === "" || x.TypeDimensionoOfSign === "" || x.SI === ""
        );
        const emptyElectronic = dto.InsurableItem[0].RiskItems[0].ElectronicEquipment.filter(
          (x) =>
            x.SerialNumber === "" ||
            x.ElectronicType === "" ||
            x.SI === "" ||
            x.YearofMfg === "" ||
            x.Make === "" ||
            x.Locationaddress === ""
        );
        const emptyBreakdown =
          dto.InsurableItem[0].RiskItems[0].BreakdownofBusinessEquipment.filter(
            (x) =>
              x.SerialNumber === "" ||
              x.TypeofMachinery === "" ||
              x.SI === "" ||
              x.YearofMfg === "" ||
              x.Locationaddress === "" ||
              x.Make === ""
          );
        const emptyFidelity = dto.InsurableItem[0].RiskItems[0].FidelityGuarantee.filter(
          (x) => x.EmployeeName === "" || x.Designation === "" || x.LimitofLiability === ""
        );
        // const PAAgeErr = dto.InsurableItem[0].RiskItems[0].PersonalAccident.some(
        //   (x) => Number(x.NominationDetails.Age) < 18
        // );
        const emptyPersonalAccident = dto.InsurableItem[0].RiskItems[0].PersonalAccident.filter(
          (x) =>
            x.EmployeeName === "" ||
            x.Designation === "" ||
            x.DateofBirth === "" ||
            x.NominationDetails.NameofNominee === "" ||
            x.NominationDetails.Age === "" ||
            x.NominationDetails.Relationship === ""
        );
        const emptyPAApointee = dto.InsurableItem[0].RiskItems[0].PersonalAccident.filter(
          (x) =>
            (Number(x.NominationDetails.Age) < 18
              ? x.NominationDetails.NameofAppointee === ""
              : null) ||
            (Number(x.NominationDetails.Age) < 18
              ? x.NominationDetails.AppointeeRelationshipwithNominee === ""
              : null)
        );
        // const emptyPublicLiability = dto.InsurableItem[0].RiskItems[0].PublicLiability.filter(
        //   (x) =>
        //     x.LimitofLiability === "" || x.AnyoneAccidentLimit === "" || x.Locationdetails === ""
        // );
        if (
          dto.InsurableItem[0].Covers[8].IsOptional &&
          (dto.InsurableItem[0].RiskItems[0].AllRiskSection.length === 0 || emptyFields.length > 0)
        ) {
          swal({ icon: "error", text: "Please fill the details of All Risk Section" });
          // lMasters.errFill = true;
          setMasters({ ...lMasters });
          fun = false;
        } else if (dto.InsurableItem[0].Covers[8].IsOptional && masters.sum.AllRiskSection) {
          swal({
            icon: "error",
            text: "All Risk Sum Insured should be equal to Sum Insured in Quick Quote",
          });
          fun = false;
        } else if (
          dto.InsurableItem[0].Covers[9].IsOptional &&
          (dto.InsurableItem[0].RiskItems[0].PlateGlass.length === 0 || emptyPlate.length > 0)
        ) {
          swal({
            icon: "error",
            text: "Please fill the details of Plate Glass and Neon Signs/Glow Signs",
          });
          fun = false;
        } else if (dto.InsurableItem[0].Covers[9].IsOptional && masters.sum.PlateGlass) {
          swal({
            icon: "error",
            text: "Plate Glass Sum Insured should be equal to Sum Insured in Quick Quote",
          });
          fun = false;
        } else if (
          dto.InsurableItem[0].Covers[10].IsOptional &&
          (dto.InsurableItem[0].RiskItems[0].ElectronicEquipment.length === 0 ||
            emptyElectronic.length > 0)
        ) {
          swal({
            icon: "error",
            text: "Please fill the details of Electronic Equipment Section",
          });
          fun = false;
        } else if (dto.InsurableItem[0].Covers[10].IsOptional && masters.sum.ElectronicEquipment) {
          swal({
            icon: "error",
            text: "Electronic Equipment Sum Insured should be equal to Sum Insured in Quick Quote",
          });
          fun = false;
        } else if (
          dto.InsurableItem[0].Covers[11].IsOptional &&
          (dto.InsurableItem[0].RiskItems[0].BreakdownofBusinessEquipment.length === 0 ||
            emptyBreakdown.length > 0)
        ) {
          swal({
            icon: "error",
            text: "Please fill the details of Breakdown of Business Equipment",
          });
          fun = false;
        } else if (
          dto.InsurableItem[0].Covers[11].IsOptional &&
          masters.sum.BreakdownofBusinessEquipment
        ) {
          swal({
            icon: "error",
            text: "Machinary Breakdown Sum Insured should be equal to Sum Insured in Quick Quote",
          });
          fun = false;
        } else if (
          dto.InsurableItem[0].Covers[12].IsOptional &&
          dto.InsurableItem[0].Covers[12].EmployeeType === "Named" &&
          (dto.InsurableItem[0].RiskItems[0].FidelityGuarantee.length === 0 ||
            emptyFidelity.length > 0)
        ) {
          swal({
            icon: "error",
            text: "Please fill the details of Fidelity Guarantee Section",
          });
          fun = false;
        } else if (
          dto.InsurableItem[0].Covers[13].IsOptional &&
          (dto.InsurableItem[0].RiskItems[0].PersonalAccident.length === 0 ||
            emptyPersonalAccident.length > 0)
        ) {
          swal({
            icon: "error",
            text: "Please fill the details of Personal Accident Section",
          });
          fun = false;
        } else if (emptyPAApointee.length > 0) {
          swal({ icon: "error", text: "Please fill Appointee Details (Nominee Age < 18)" });
          fun = false;
          // } else if (
          //   dto.InsurableItem[0].Covers[14].IsOptional &&
          //   (dto.InsurableItem[0].RiskItems[0].PublicLiability.length === 0 ||
          //     emptyPublicLiability.length > 0)
          // ) {
          //   swal({
          //     icon: "error",
          //     text: "Please fill the details of Public Liability Section",
          //   });
          //   fun = false;
        } else if (dto.InsurableItem[0].Covers[14].IsOptional && masters.sum.PublicLiability) {
          swal({
            icon: "error",
            text: "Public Liability Limit should be equal to Limit in Quick Quote",
          });
          fun = false;
        } else {
          fun = true;
        }
      }
      break;
    case 2:
      if (dto.CkycStatus === "failure") {
        swal({ icon: "error", text: "CKYC is Failure" });
        fun = false;
      } else if (dto.CkycStatus === "") {
        fun = false;
        swal({ icon: "error", text: "Initiate CKYC" });
      } else if (dto?.ProposalConsent?.ProposalConsentCheck !== true) {
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
        swal({
          icon: "error",
          text: "Please check Proposal Consent conditions",
        });
        // } else if (masters.proposerProps.proceed === false || dto?.PolicyNo !== "") {
        //   fun = false;
        //   swal({
        //     icon: "error",
        //     text: "Policy Number already generated",
        //   });
        // }
      } else if (dto.CkycStatus === "success") {
        if (dto.proposalNumber === "") {
          const res = await calculateProposal(dto);
          console.log("res", res);
          lDto.proposalNumber = res.data.proposalNumber;
          lDto.ProposalNo = res.data.proposalNumber;
          lMasters.SavePymtDTO.proposalNo = res.data.proposalNumber;
          setDto({ ...lDto });
          setMasters({ ...lMasters });
        } else {
          // lMasters.proposerProps.proceed = true;
          await postRequest(`Policy/UpdateProposalDetails`, dto);
        }
        if (dto && dto.proposalNumber && dto.proposalNumber !== "") {
          const res1 = await fetchPaymentURL(
            1204,
            dto.proposalNumber,
            dto.PremiumDetails["Total with Tax"]
          );
          lDto.TransactionID = res1.transactionID;
          lMasters.SavePymtDTO.paymentDetailsDTO.transactionNo = res1.transactionID;
          lDto.PaymentDetails.paymentRefNo = res1.paymentRefNo;
          lMasters.bodyData.firstname = dto.ProposerDetails["First Name"];
          lMasters.bodyData.email = dto.QuoteEmail;
          lMasters.bodyData.phone = dto.QuoteMobileNo;
          lMasters.bodyData.txnid = res1.transactionID;
          lMasters.bodyData.amount = dto.PremiumDetails["Total with Tax"];
          lMasters.bodyData.surl = res1.surl;
          lMasters.bodyData.furl = res1.furl;
          setDto({ ...lDto });
          setMasters({ ...lMasters });

          const Message = `Dear Customer,Based on your requirements, UNIVERSAL SOMPO - BUSINESS SHIELD-SOOKSHMA UDYAM Insurance Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
          await SendSMS("usgi", dto.QuoteMobileNo, Message).then((smsResp) => {
            console.log("1234567890", smsResp);
          });
          await callUpdateQuoteMethod(dto);
        }
        setDto({ ...lDto });
        await SKproposerEamil(dto.proposalNumber, dto.QuoteEmail);

        const downloadDTO = {
          key: dto && dto.proposalNumber,
          templateId: 235,
          referenceId: "",
        };
        await downloadQuote(downloadDTO);
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
      // } else if (dto.PaymentDetails.ModeOfPayment === "Cheque") {
      //   const res = await SavePaymentdetails(masters.SavePymtDTO);
      //   const policyMail = await policyEmailShopkeeper(res.data.id, dto.QuoteEmail);
      //   console.log("policyEmail", policyMail);
      //   const Message = `Dear Customer,Welcome to USGI Family. Your UNIVERSAL SOMPO - BUSINESS SHIELD-SOOKSHMA UDYAM Insurance has been issued with policy no. ${
      //     res.data.id
      //   } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
      //   await SendSMS("usgi", dto.QuoteMobileNo, Message).then((smsResp) => {
      //     console.log("1234567890", smsResp);
      //   });
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
      fun = true;
      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep, masters }) => {
  let btnDetails = {};
  // Restrict back button by shreya
  const { search } = useLocation();
  const stepNo = new URLSearchParams(search).get("acstep");
  //
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed to Full Quote",
          visible: masters.flags.CalPreSuc,
          variant: "contained",
          // loader: "backDrop",
        },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed to Proposal",
          visible: true,
          variant: "contained",
          // loader: "backDrop",
        },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: stepNo !== "2" },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed to Payment",
          visible: true,
          variant: "contained",
          // loader: "backDrop",
        },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Make Payment",
          // visible: dto?.PaymentDetails?.ModeOfPayment === "Cheque",
          visible: false,
          // loader: "backDrop",
          variant: "contained",
        },
      };
      break;
    // case 3:
    //   btnDetails = {
    //     prev: { label: "Previous", visible: true },
    //     reset: { label: "Reset", visible: false },
    //     next: { label: "Next", visible: true },
    //   };
    //   break;

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

const getMasterData = async () => {
  const mst = {
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
      // proceed: false,
      panflag: false,
      gstflag: false,
      cinflag: false,
    },

    bodyData: {
      key: "7Y4RPX",
      txnid: "",
      amount: "",
      productinfo: "Shopkeeper",
      firstname: "",
      email: "",
      phone: "",
      surl: "https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0077/00/000",
      furl: "/paymentfailure",
      salt: "hl8aISlY",
    },
    CkycParams: [
      { mID: 1, mValue: "PAN Number" },
      { mID: 2, mValue: "Aadhaar Number" },
    ],
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
    Covers: [],
    selectionModel: [],
    flags: {
      cancelIcon: false,
      CalPreSuc: false,
      updateflag: false,
      addFlg: false,
      deleteFlg: false,

      editval: false,
      anchorEl: false,
      rowId: "",
    },
    var: { status: "" },
    Loader: false,
    PaymentPage: {
      cheque: false,
      online: false,
      email: false,
      disabledcheque: false,
      disabledonline: false,
      disabledemail: false,
    },
    riskCD: "",
    secInd: "",
    sec: "",
    loadflag: false,
    err: {
      ClaimsRatio: false,
      BasementExposure: false,
      TotalSI: false,
      Loading: false,
      Pincode: false,
      AllReq: false,
      TSI: false,
      pinVal: false,
      Baggage: false,
      BagSI: false,
      FGYearLimit1: false,
      FGYearLimit: false,
      CashinSafeSI: false,
      CashinSafeSI1: false,
      PLLimit: false,
      PLLimit1: false,
      MoneyInTransitSI: false,
      MoneyInTransitSI1: false,
      SingleCarryingLimit: false,
      SingleCarryingLimit1: false,
      Occupancy: false,
      LoadErr: false,
    },
    openAuto: true,
    // All Section
    // add: {
    //   AllRiskSection: false,
    //   PlateGlass: false,
    //   ElectronicEquipment: false,
    //   BreakdownofBusinessEquipment: false,
    //   FidelityGuarantee: false,
    // },
    // edit: {
    //   AllRiskSection: false,
    //   PlateGlass: false,
    //   ElectronicEquipment: false,
    //   BreakdownofBusinessEquipment: false,
    //   FidelityGuarantee: false,
    // },
    // delete: {
    //   AllRiskSection: false,
    //   PlateGlass: false,
    //   ElectronicEquipment: false,
    //   BreakdownofBusinessEquipment: false,
    //   FidelityGuarantee: false,
    // },
    // editval: {
    //   AllRiskSection: false,
    //   PlateGlass: false,
    //   ElectronicEquipment: "",
    //   BreakdownofBusinessEquipment: "",
    //   FidelityGuarantee: "",
    // },
    // rowId: {
    //   AllRiskSection: "",
    //   PlateGlass: "",
    //   ElectronicEquipment: "",
    //   BreakdownofBusinessEquipment: "",
    //   FidelityGuarantee: "",
    // },
    // anchorEl: {
    //   AllRiskSection: false,
    //   PlateGlass: false,
    //   ElectronicEquipment: false,
    //   BreakdownofBusinessEquipment: false,
    //   FidelityGuarantee: false,
    // },
    // selectedPopoverIndex: {
    //   AllRiskSection: -1,
    //   PlateGlass: -1,
    //   ElectronicEquipment: -1,
    //   BreakdownofBusinessEquipment: -1,
    //   FidelityGuarantee: -1,
    // },
    AllRiskSection: {
      // SNo: "",
      SI: "",
      SerialNumber: "",
      Make: "",
      YearofMfg: "",
      Particular: "",
      addFlag: false,
    },
    PlateGlass: {
      // SNo: "",
      LocationDetails: "",
      TypeDimensionoOfSign: "",
      SI: "",
      addFlag: false,
    },
    ElectronicEquipment: {
      // SI: "",
      ElectronicType: "",
      Locationaddress: "",
      YearofMfg: "",
      Make: "",
      SerialNumber: "",
      addFlag: false,
    },
    BreakdownofBusinessEquipment: {
      // SI: "",
      TypeofMachinery: "",
      Locationaddress: "",
      YearofMfg: "",
      Make: "",
      SerialNumber: "",
      addFlag: false,
    },
    FidelityGuarantee: {
      NoofPersons: "",
      EmployeeName: "",
      Designation: "",
      LimitofLiability: "",
      EmployeeType: "",
    },
    PublicLiability: {
      addFlag: false,
      Locationdetails: "",
      AnyoneAccidentLimit: "",
      LimitofLiability: "",
    },
    PersonalAccident: {
      EmployeeName: "",
      Designation: "",
      DateofBirth: "",
      SI: "",
      NominationDetails: {
        NameofNominee: "",
        Age: "",
        Relationship: "",
        NameofAppointee: "",
        AppointeeRelationshipwithNominee: "",
      },
    },
    Validation: {
      AllRiskSection: [
        {
          SI: false,
          Particular: false,
          YearofMfg: false,
          Make: false,
          SerialNumber: false,
        },
      ],
      PlateGlass: [
        {
          SI: false,
          Particular: false,
          YearofMfg: false,
          Make: false,
          SerialNumber: false,
        },
      ],
      ElectronicEquipment: [
        {
          YearofMfg: false,
          SerialNumber: false,
          SI: false,
        },
      ],
      BreakdownofBusinessEquipment: [
        {
          SI: false,
          YearofMfg: false,
          SerialNumber: false,
        },
      ],
      FidelityGuarantee: [
        {
          // NoofPersons: "",
          EmployeeName: false,
          Designation: false,
          LimitofLiability: false,
          // EmployeeType: "",
        },
      ],
      PersonalAccidentErr: {
        EmployeeName: false,
        Designation: false,
        DateofBirth: false,
        NameofNominee: false,
        Age: false,
        Relationship: false,
        NameofAppointee: false,
        AppointeeRelationshipwithNominee: false,
        AgeErr: false,
      },

      PublicLiability: [
        {
          Locationdetails: false,
          AnyoneAccidentLimit: false,
          LimitofLiability: false,
        },
      ],
    },
    error: {
      AllRiskSection: [
        {
          SI: false,
          Particular: false,
          YearofMfg: false,
          Make: false,
          SerialNumber: false,
          SNo: 1,
        },
      ],
      PlateGlass: [
        {
          SI: false,
        },
      ],
      ElectronicEquipment: [
        {
          YearofMfg: false,
          SerialNumber: false,
          SI: false,
        },
      ],
      BreakdownofBusinessEquipment: [
        {
          SI: false,
          YearofMfg: false,
          SerialNumber: false,
        },
      ],
      FidelityGuarantee: [],
      PublicLiability: [
        {
          Locationdetails: false,
          AnyoneAccidentLimit: false,
          LimitofLiability: false,
        },
      ],
      PersonalAccident: [],
    },
    sum: {
      AllRiskSection: false,
      PlateGlass: false,
      ElectronicEquipment: false,
      PublicLiability: false,
      BreakdownofBusinessEquipment: false,
    },
    // errFill: false,
    EmailVal: false,
    QuoteSearch: false,
  };
  const sal = await GetProdPartnermasterData(1037, "Salutation", { MasterType: "Salutation" });
  mst.Salutation = sal;
  const gen = await GetProdPartnermasterData(1037, "Gender", { MasterType: "Gender" });
  mst.Gender = gen;
  const doc = await GetProdPartnermasterData(1039, "DocumentsNameCPM", {
    MasterType: "DocumentsNameCPM",
  });
  mst.doc = doc;
  const BaseExpo = await GetProdPartnermasterData(910, "BasementExposure", {
    MasterType: "BasementExposure",
  });
  mst.BaseExpo = BaseExpo;
  const ClaimsRationBLUSBSUS = await GetProdPartnermasterData(910, "ClaimsRationBLUSBSUS", {
    MasterType: "ClaimsRationBLUSBSUS",
  });
  mst.ClaimsRationBLUSBSUS = ClaimsRationBLUSBSUS;
  const TypeOfConstructionBLUSBSUS = await GetProdPartnermasterData(
    910,
    "TypeOfConstructionBLUSBSUS",
    {
      MasterType: "TypeOfConstructionBLUSBSUS",
    }
  );
  mst.TypeOfConstructionBLUSBSUS = TypeOfConstructionBLUSBSUS;
  const ClientBusinessExperiance = await GetProdPartnermasterData(910, "ClientBusinessExperiance", {
    MasterType: "ClientBusinessExperiance",
  });
  mst.ClientBusinessExperiance = ClientBusinessExperiance;
  const DstPublicFireBrigade = await GetProdPartnermasterData(910, "DstPublicFireBrigade", {
    MasterType: "DstPublicFireBrigade",
  });
  mst.DstPublicFireBrigade = DstPublicFireBrigade;
  const StockExposureBLUSBSUS = await GetProdPartnermasterData(910, "StockExposureBLUSBSUS", {
    MasterType: "StockExposureBLUSBSUS",
  });
  mst.StockExposureBLUSBSUS = StockExposureBLUSBSUS;
  const HouseKeepingBLUSBSUS = await GetProdPartnermasterData(910, "HouseKeepingBLUSBSUS", {
    MasterType: "HouseKeepingBLUSBSUS",
  });
  mst.HouseKeepingBLUSBSUS = HouseKeepingBLUSBSUS;

  const AgeOfBuildingBLUSBSUS = await GetProdPartnermasterData(910, "AgeOfBuildingBLUSBSUS", {
    MasterType: "AgeOfBuildingBLUSBSUS",
  });
  mst.AgeOfBuildingBLUSBSUS = AgeOfBuildingBLUSBSUS;
  const FireProtection = await GetProdPartnermasterData(910, "FireProtection", {
    MasterType: "FireProtection",
  });
  mst.FireProtection = FireProtection;

  const RiskTerrainBLUSBSUS = await GetProdPartnermasterData(910, "RiskTerrainBLUSBSUS", {
    MasterType: "RiskTerrainBLUSBSUS",
  });
  mst.RiskTerrainBLUSBSUS = RiskTerrainBLUSBSUS;

  const OccupancyBLUSBSUS = await GetProdPartnermasterData(1204, "OccupancySK", {
    MasterType: "OccupancySK",
  });
  mst.Occupancy = OccupancyBLUSBSUS;
  const NSTPPincode = await NSTPPincodeData(1204, "NSTPPincode", {
    IsActive: "1",
  });
  mst.NSTPPincode = NSTPPincode;
  const NSTPOccupancyBS = await NSTPPincodeData(1204, "NSTPOccupancyBS", {
    // IsActive: "1",
  });
  mst.NSTPOccupancyBS = NSTPOccupancyBS;
  const ClaimsRatioSK = await GetProdPartnermasterData(1204, "ClaimsRatioSK", {
    MasterType: "ClaimsRatioSK",
  });
  mst.ClaimsRatioSK = ClaimsRatioSK;
  const MaintainenceStandards = await GetProdPartnermasterData(1204, "MaintainenceStandards", {
    MasterType: "MaintainenceStandards",
  });
  mst.MaintainenceStandards = MaintainenceStandards;
  const PACategory = await GetProdPartnermasterData(1204, "PACategory", {
    MasterType: "PACategory",
  });
  mst.PACategory = PACategory;
  const HypothecationCPM = await GetProdPartnermasterData(1039, "HypothecationCPM", {
    MasterType: "HypothecationCPM",
  });
  mst.HypothecationCPM = HypothecationCPM;
  const BurglaryFLBPercentSK = await GetProdPartnermasterData(1204, "BurglaryFLBPercentSK", {
    MasterType: "BurglaryFLBPercentSK",
  });
  mst.BurglaryFLBPercentSK = BurglaryFLBPercentSK;
  const BagSISK = await GetProdPartnermasterData(1204, "BagSISK", {
    MasterType: "BagSISK",
  });
  mst.BagSISK = BagSISK;

  const PersonalAccidentSISK = await GetProdPartnermasterData(1204, "PersonalAccidentSISK", {
    MasterType: "PersonalAccidentSISK",
  });
  mst.PersonalAccidentSISK = PersonalAccidentSISK;
  const VerticalName = await NSTPPincodeData(782, "VerticalName", { MasterType: "VerticalName" });
  mst.VerticalName = VerticalName.data;
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
