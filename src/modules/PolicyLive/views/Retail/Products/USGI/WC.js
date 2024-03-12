// import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import PropTypes from "prop-types";
import {
  Grid,
  // Card,
  // IconButton,
  // FormControlLabel,
  // Box,
  TableRow,
  Table,
  // Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import objectPath from "object-path";
import MDBox from "components/MDBox";
// import MDCheckbox from "components/MDCheckbox";
import MDTypography from "components/MDTypography";
// import MDCheckbox from "components/MDCheckbox";
import { UploadFiles } from "modules/PolicyLive/views/Home/data/index";
import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";
import { GetProposalByNumber } from "../../../BLUS/data/index";
import {
  GenericApi,
  callSaveQuoteMethod,
  NSTPPincodeData,
  calculateProposal,
  getCkycDetails,
  // DocumenUpload,
  DeleteDocument,
  fetchPaymentURL,
  // SavePaymentdetails,
  callUpdateQuoteMethod,
  shareQuote,
  downloadQuote,
  // makePayment,
  getCkycUpdateStatus,
  CkycRegMail,
  GetProdPartnermasterData,
  generateFile,
  proposerEamil,
  // policyEmail,
  getPincodeDetails,
  SendSMS,
  proposalConsentMail,
  getQuoteSummary,

  // DiscountVal,
} from "./data/APIs/USGIWCApi";

// import PaymentSuccess from "./components/PaymentSuccess";
// import PaymentFailure from "./components/PaymentFailure";
import Payment from "./components/Payment";

import { IsNumeric, IsAlphaNumSpace } from "../../../../../../Common/Validations";
import { useDataController } from "../../../../../BrokerPortal/context";
import { getOTP, GetOTP } from "../../../../../BrokerPortal/Pages/Registration/data/index";

import {
  PolicyJson,
  modelStyle1,
  modelStyle2,
  docDetails,
  formatDateKYC,
  formatPolDate,
  DaysInMonth,
  SplitingNumber,
  AgeCalculator1,
  riskLoc,
  IsCINNo,
  addDays,
} from "./data/Json/USGIWCJson";

import MDButton from "../../../../../../components/MDButton";
import MDInput from "../../../../../../components/MDInput";
import Quotes from "./components/Quotes";

const medicalSumInsured = [
  { mID: "AtActuals", mValue: "At Actuals" },
  { mID: "10000", mValue: "10000" },
  { mID: "25000", mValue: "25000" },
  { mID: "50000", mValue: "50000" },
  { mID: "100000", mValue: "100000" },
  { mID: "200000", mValue: "200000" },
  { mID: "300000", mValue: "300000" },
];
const months = [
  { mID: 1, mValue: "1" },
  { mID: 2, mValue: "2" },
  { mID: 3, mValue: "3" },
  { mID: 4, mValue: "4" },
  { mID: 5, mValue: "5" },
  { mID: 6, mValue: "6" },
  { mID: 7, mValue: "7" },
  { mID: 7, mValue: "8" },
  { mID: 7, mValue: "9" },
  { mID: 7, mValue: "10" },
  { mID: 7, mValue: "11" },
  { mID: 7, mValue: "12" },
];

const CkycParams = [
  { mID: 1, mValue: "PAN Number" },
  { mID: 2, mValue: "Aadhaar Number" },
];

const errText = "Please fill the required fields";

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

// let topNavigate = null;
const getProcessSteps = () => {
  const steps = ["Customer Details", "Proposer Details", "Payment Details"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, masters }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Customer Details", visible: true, defaultExpanded: true },
        { name: "Risk Details", visible: true, defaultExpanded: true },
        { name: "Risk  Location Address", visible: true, defaultExpanded: true },
        { name: "Add-on Covers", visible: true, defaultExpanded: true },
        {
          name: "Add-on Covers",
          visible: masters.flags.CalPreBtn,
          defaultExpanded: true,
        },
      ];
      break;
    case 1:
      steps = [
        { name: "", visible: true, defaultExpanded: true },
        { name: "Proposer Details", visible: true, defaultExpanded: true },
        { name: "CKYC/Permanent Address", visible: true, defaultExpanded: true },
        { name: "Communication Address", visible: true, defaultExpanded: true },
        { name: "Risk Location Address", visible: true, defaultExpanded: true },
        { name: "Documents", visible: true, defaultExpanded: true },
        { name: "Proposal Consent", visible: true, defaultExpanded: true },
      ];
      break;
    case 2:
      steps = [{ name: "", visible: true, defaultExpanded: true }];
      break;
    // case 3:
    //   steps = [{ name: "", visible: true }];
    //   break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters, setBackDropFlag }) => {
  const lMasters = masters;
  const lDto = dto;
  // const openMenu = Boolean(lMasters.flags.anchorEl);
  const { search } = useLocation();
  useEffect(async () => {
    const quoteRefNo = new URLSearchParams(search).get("quotationno");
    if (quoteRefNo !== null) {
      // setQuoteFlag(true);
      // await getRequest(`Quotation/GetQuoteByNumber?QuoteNo=${quoteRefNo}`);
      await getQuoteSummary(quoteRefNo).then((result) => {
        console.log("response", result);
        lMasters.QuoteSearch = true;
        const chaneldata = result.data.quotation.channel;

        const chanelparsedata = JSON.parse(chaneldata);
        console.log("chanelparse", chanelparsedata);

        const quotationDetailsDTO = result.data.quotation.quotationDetailsDTO[0].quotationDetails;

        const quotationDetailsDTOparse = JSON.parse(quotationDetailsDTO);
        lMasters.flags.CalPreBtn = true;
        lMasters.Quotes[masters.flags.activeTab].MedicalExpenses =
          quotationDetailsDTOparse.InsurableItem[0].Covers[0].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].MedicalSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[0].Limit;
        // lMasters.Quotes[masters.flags.activeTab].MedicalSumInsuredValue =
        //   quotationDetailsDTOparse.InsurableItem[0].Covers[0].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].MedicalSumInsuredValue =
          quotationDetailsDTOparse.InsurableItem[0].Covers[0].LimitValue;
        lMasters.Quotes[masters.flags.activeTab].Terrorism =
          quotationDetailsDTOparse.InsurableItem[0].Covers[1].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].OccupationalDisease =
          quotationDetailsDTOparse.InsurableItem[0].Covers[2].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].ContractWorkersExtension =
          quotationDetailsDTOparse.InsurableItem[0].Covers[3].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].Discount = quotationDetailsDTOparse.Discount;
        lMasters.Quotes[masters.flags.activeTab].Loading = quotationDetailsDTOparse.Loading;
        lMasters.Quotes[masters.flags.activeTab].TotalSI = SplitingNumber(
          Number(quotationDetailsDTOparse.SumInsured)
        );
        lMasters.Quotes[masters.flags.activeTab].FinalPremium = SplitingNumber(
          Math.round(Number(quotationDetailsDTOparse.PremiumDetails["Total with Tax"]))
        );
        lMasters.Quotes[masters.flags.activeTab].NetPremium = SplitingNumber(
          Math.round(Number(quotationDetailsDTOparse.PremiumDetails["Net Premium"]))
        );
        lMasters.Quotes[masters.flags.activeTab].AddOnPremium = SplitingNumber(
          Math.round(quotationDetailsDTOparse.PremiumDetails["Extension Premium"])
        );
        lMasters.Quotes[masters.flags.activeTab].GST = quotationDetailsDTOparse.PremiumDetails.GST;
        lMasters.Quotes[masters.flags.activeTab].SGST =
          quotationDetailsDTOparse.PremiumDetails.SGST;
        lMasters.Quotes[masters.flags.activeTab].CGST =
          quotationDetailsDTOparse.PremiumDetails.CGST;
        if (quotationDetailsDTOparse.Discount === "") {
          lMasters.Quotes[masters.flags.activeTab].DiscountAmount = 0;
        } else {
          lMasters.Quotes[masters.flags.activeTab].DiscountAmount =
            quotationDetailsDTOparse.Discount;
        }
        if (quotationDetailsDTOparse.Loading === "") {
          lMasters.Quotes[masters.flags.activeTab].LoadingAmount = 0;
        } else {
          lMasters.Quotes[masters.flags.activeTab].LoadingAmount = quotationDetailsDTOparse.Loading;
        }
        lMasters.PolicyStartDate = quotationDetailsDTOparse.PolicyStartDate;
        lMasters.flags.CalPreSuc = true;
        lMasters.Quotes[masters.flags.activeTab].editval = true;
        if (quotationDetailsDTOparse.CkycStatus === "success") {
          lMasters.flags.dob = true;
          lMasters.flags.Kyc = true;
        }
        lMasters.var = { ...lMasters.var, ...quotationDetailsDTOparse.CkycDetails };
        setMasters({ ...lMasters });
        setDto({ ...quotationDetailsDTOparse });

        console.log("quotationDetailsDTO", quotationDetailsDTOparse);
        const current = formatDateKYC(new Date());
        if (current > formatDateKYC(quotationDetailsDTOparse.PolicyStartDate)) {
          quotationDetailsDTOparse.PolicyStartDate = "";
          quotationDetailsDTOparse.PolicyEndDate = "";
          setDto({ ...quotationDetailsDTOparse });
        }
      });
    }
    // const current = formatDateKYC(new Date());
    // if (current >= dto.PolicyStartDate) {
    //   lDto.PolicyStartDate = "";
    //   lDto.PolicyEndDate = "";
    //   setDto({ ...lDto });
    // }
  }, []);
  const Navigate = useNavigate();
  useEffect(async () => {
    const proposalNoo = new URLSearchParams(search).get("proposernum");
    if (proposalNoo !== null) {
      await GetProposalByNumber(proposalNoo).then((result) => {
        Navigate("/Home/WC?acstep=1");
        console.log("response", result);
        lMasters.QuoteSearch = true;

        const quotationDetailsDTOparse = result.data[0].policyDetails;
        lMasters.flags.CalPreBtn = true;
        lMasters.Quotes[masters.flags.activeTab].MedicalExpenses =
          quotationDetailsDTOparse.InsurableItem[0].Covers[0].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].MedicalSumInsured =
          quotationDetailsDTOparse.InsurableItem[0].Covers[0].Limit;
        // lMasters.Quotes[masters.flags.activeTab].MedicalSumInsuredValue =
        //   quotationDetailsDTOparse.InsurableItem[0].Covers[0].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].MedicalSumInsuredValue =
          quotationDetailsDTOparse.InsurableItem[0].Covers[0].LimitValue;
        lMasters.Quotes[masters.flags.activeTab].Terrorism =
          quotationDetailsDTOparse.InsurableItem[0].Covers[1].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].OccupationalDisease =
          quotationDetailsDTOparse.InsurableItem[0].Covers[2].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].ContractWorkersExtension =
          quotationDetailsDTOparse.InsurableItem[0].Covers[3].IsOptional;
        lMasters.Quotes[masters.flags.activeTab].Discount = quotationDetailsDTOparse.Discount;
        lMasters.Quotes[masters.flags.activeTab].Loading = quotationDetailsDTOparse.Loading;
        lMasters.Quotes[masters.flags.activeTab].TotalSI = SplitingNumber(
          Number(quotationDetailsDTOparse.SumInsured)
        );
        lMasters.Quotes[masters.flags.activeTab].FinalPremium = SplitingNumber(
          Math.round(Number(quotationDetailsDTOparse.PremiumDetails["Total with Tax"]))
        );
        lMasters.Quotes[masters.flags.activeTab].NetPremium = SplitingNumber(
          Math.round(Number(quotationDetailsDTOparse.PremiumDetails["Net Premium"]))
        );
        lMasters.Quotes[masters.flags.activeTab].AddOnPremium = SplitingNumber(
          Math.round(quotationDetailsDTOparse.PremiumDetails["Extension Premium"])
        );
        lMasters.Quotes[masters.flags.activeTab].GST = quotationDetailsDTOparse.PremiumDetails.GST;
        lMasters.Quotes[masters.flags.activeTab].SGST =
          quotationDetailsDTOparse.PremiumDetails.SGST;
        lMasters.Quotes[masters.flags.activeTab].CGST =
          quotationDetailsDTOparse.PremiumDetails.CGST;
        if (quotationDetailsDTOparse.Discount === "") {
          lMasters.Quotes[masters.flags.activeTab].DiscountAmount = 0;
        } else {
          lMasters.Quotes[masters.flags.activeTab].DiscountAmount =
            quotationDetailsDTOparse.Discount;
        }
        if (quotationDetailsDTOparse.Loading === "") {
          lMasters.Quotes[masters.flags.activeTab].LoadingAmount = 0;
        } else {
          lMasters.Quotes[masters.flags.activeTab].LoadingAmount = quotationDetailsDTOparse.Loading;
        }
        lMasters.PolicyStartDate = quotationDetailsDTOparse.PolicyStartDate;
        lMasters.flags.CalPreSuc = true;
        lMasters.Quotes[masters.flags.activeTab].editval = true;
        if (quotationDetailsDTOparse.CkycStatus === "success") {
          lMasters.flags.dob = true;
          lMasters.flags.Kyc = true;
        }
        lMasters.var = { ...lMasters.var, ...quotationDetailsDTOparse.CkycDetails };
        setMasters({ ...lMasters });
        setDto({ ...quotationDetailsDTOparse });

        console.log("quotationDetailsDTO", quotationDetailsDTOparse);
        const current = formatDateKYC(new Date());
        if (current > formatDateKYC(quotationDetailsDTOparse.PolicyStartDate)) {
          quotationDetailsDTOparse.PolicyStartDate = "";
          quotationDetailsDTOparse.PolicyEndDate = "";
          setDto({ ...quotationDetailsDTOparse });
        }
      });
    }
  }, []);

  // topNavigate = Navigate;

  const handleCustType = (e, v) => {
    if (v === "Individual") {
      lDto.CustomerType = "Individual";
      lDto.PolicyStartDate = "";
      lDto.PolicyTenure = "";
      lDto.PolicyEndDate = "";
      lDto.QuoteEmail = "";
      lDto.QuoteMobileNo = "";
      setDto({ ...lDto });
    } else if (v === "Corporate") {
      lDto.CustomerType = "Corporate";
      lDto.PolicyStartDate = "";
      lDto.ProposerDetails["First Name"] = "";
      lDto.ProposerDetails["Last Name"] = "";
      lDto.PolicyTenure = "";
      lDto.PolicyEndDate = "";
      lDto.QuoteEmail = "";
      lDto.QuoteMobileNo = "";
      setDto({ ...lDto });
    }
  };
  const handlePolDate = (e) => {
    const enteredDate = new Date(e);
    enteredDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(enteredDate.getTime())) {
      // swal("Invalid Date", "Please enter a valid date", "error");
      // swal({ icon: "error", text: "Please enter a valid date" });
      lMasters.PolicyStartDate = "";
      lDto.PolicyStartDate = "";
      lDto.PStartDate = "";
      lDto.PolicyEndDate = "";
      lDto.PEndDate = "";
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    } else {
      lMasters.PolicyStartDate = e;
      lDto.PolicyStartDate = formatPolDate(e);
      lDto.PStartDate = formatDateKYC(e);

      if (dto.PolicyTenure !== "") {
        const psd1 = formatPolDate(e).split("-");
        const today = new Date(e);
        const days = DaysInMonth(today, dto.PolicyTenure);
        const nod1 = addDays(`${psd1[1]}-${psd1[2]}-${psd1[0]}`, days).split("-");
        lDto.PolicyEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
        lDto.PEndDate = `${nod1[1]}-${nod1[0]}-${nod1[2]}`;
        if (dto?.InsurableItem[0]?.RiskItems.length !== 0) {
          let totalSI = 0;
          dto.InsurableItem[0].RiskItems.forEach((x) => {
            const totalSI1 =
              Number(dto.PolicyTenure) * Number(x.NoOfEmployees) * Number(x.WagesUpto15000) +
              Number(dto.PolicyTenure) * Number(x.NoOfEmployees) * Number(x.WagesAbove15000);
            totalSI += totalSI1;
          });
          lDto.SumInsured = String(totalSI);
        }
      }

      // lDto.PolicyStartDate = e;
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
    // const a = new Date(e[0].getFullYear(), e[0].getMonth() + 1, e[0].getDate());
  };
  const onMonth = (e, v) => {
    lMasters.months = v.mValue;
    lDto.PolicyTenure = v.mValue;
    const psd1 = dto.PolicyStartDate.split("-");
    const today = new Date(masters.PolicyStartDate);
    const days = DaysInMonth(today, v.mValue);
    const nod1 = addDays(`${psd1[1]}-${psd1[2]}-${psd1[0]}`, days).split("-");
    lDto.PolicyEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
    lDto.PEndDate = `${nod1[1]}-${nod1[0]}-${nod1[2]}`;
    // lMasters.flags.editval = false;
    lMasters.Quotes[0].editval = false;
    lMasters.Quotes[1].editval = false;
    lMasters.Quotes[2].editval = false;
    // lDto.PEndDate = formatDateKYC(dto.PolicyEndDate);
    if (dto?.InsurableItem[0]?.RiskItems.length !== 0) {
      let totalSI = 0;
      dto.InsurableItem[0].RiskItems.forEach((x) => {
        const totalSI1 =
          Number(v.mValue) * Number(x.NoOfEmployees) * Number(x.WagesUpto15000) +
          Number(v.mValue) * Number(x.NoOfEmployees) * Number(x.WagesAbove15000);
        totalSI += totalSI1;
      });
      lDto.SumInsured = String(totalSI);
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handelopen = () => {
    if (dto.InsurableItem[0].RiskItems.length >= 20) {
      swal({
        icon: "warning",
        title: "Maximum limit reached",
        text: "You cannot add more items as the maximum limit (20) has been reached.",
      });
    } else {
      lMasters.flags.addFlg = true;
      lMasters.errRisk = false;
      setMasters({ ...lMasters });
    }
  };
  const handelClose = () => {
    lMasters.newRisk = {
      SNo: "",
      Occupancy: "",
      TypeOfWorker: "",
      NatureOfWork: "",
      RiskCategory: "",
      NoOfEmployees: "",
      MonthlyWagesPerWorker: "",
      WagesUpto15000: "",
      WagesAbove15000: "",
      WagesUpto15000GC: "",
      WagesAbove15000GC: "",
      ClassificationNo: "",
      EndoresmentNo: "",
      AuditSerialNumber: "",
      CategoryCode: "",
      CategoryDescription: "",
      SubCategoryCode: "",
      SubCategoryDescription: "",
      EmployeeType: "",
    };
    lMasters.flags.addFlg = false;
    lMasters.flags.editFlg = false;
    setMasters({ ...lMasters });
  };

  const handelClose1 = () => {
    lMasters.flags.deleteFlg = false;
    setMasters({ ...lMasters });
  };

  const handleOccupancy = async (e, v) => {
    lMasters.newRisk.Occupancy = v.mValue;
    lMasters.newRisk.RiskCategory = v.Grade;
    lMasters.newRisk.ClassificationNo = v.ClNO;
    if (v.EndNo !== "null") {
      lMasters.newRisk.EndoresmentNo = v.EndNo;
    } else {
      lMasters.newRisk.EndoresmentNo = "";
    }

    lMasters.newRisk.AuditSerialNumber = v.WCOM[0].AuditSeialNo;
    lMasters.newRisk.CategoryCode = v.WCOM[0].CCode;
    lMasters.newRisk.CategoryDescription = v.WCOM[0].CDesc;
    lMasters.newRisk.SubCategoryCode = v.WCOM[0].SCCode;
    lMasters.newRisk.SubCategoryDescription = v.WCOM[0].SCDesc;
    if (v.Grade === "H") {
      lMasters.flags.gradeErr = true;
      setTimeout(() => {
        lMasters.flags.gradeErr = false;
        setMasters({ ...lMasters });
      }, 10000);
    }
    // const EndArr = [];
    const Endres = await NSTPPincodeData(1037, "Endorsement", { OccupancyID: v.mID });
    // Endres.forEach((x)=>{
    //   EndArr.push(x.mValue);
    // })
    console.log("EndArr", Endres);
    lMasters.newRisk.EndorsementDesc = Endres.data;
    setMasters({ ...lMasters });
  };

  const handleTypeofwork = (e, v) => {
    lMasters.newRisk.TypeOfWorker = v.mValue;
    setMasters({ ...lMasters });
  };
  const handleAdd = () => {
    if (
      masters.newRisk.Occupancy === "" ||
      masters.newRisk.TypeOfWorker === "" ||
      masters.newRisk.NatureOfWork === "" ||
      masters.newRisk.NoOfEmployees === "" ||
      masters.newRisk.MonthlyWagesPerWorker === ""
    ) {
      lMasters.errRisk = true;
      setMasters({ ...lMasters });
    } else {
      lDto.InsurableItem[0].RiskItems = [
        ...dto.InsurableItem[0].RiskItems,
        { ...lMasters.newRisk, SNo: dto.InsurableItem[0].RiskItems.length + 1 },
      ];
      let tNoEmp = 0;
      let tMonthlyWages = 0;
      let totalSI = 0;

      dto.InsurableItem[0].RiskItems.forEach((x) => {
        tNoEmp += Number(x.NoOfEmployees);
        tMonthlyWages += Number(x.MonthlyWagesPerWorker);
        const totalSI1 =
          Number(dto.PolicyTenure) * Number(x.NoOfEmployees) * Number(x.WagesUpto15000) +
          Number(dto.PolicyTenure) * Number(x.NoOfEmployees) * Number(x.WagesAbove15000);
        totalSI += totalSI1;
      });
      if (totalSI > 50000000) {
        lMasters.flags.totalSI = true;
        setMasters({ ...lMasters });

        setTimeout(() => {
          lMasters.flags.totalSI = false;
          setMasters({ ...lMasters });
        }, 10000);
      }

      lMasters.totalNoEmp = tNoEmp;
      lMasters.totalMonthlyWages = tMonthlyWages;
      lMasters.totalSI = totalSI;
      lDto.SumInsured = String(totalSI);
      lMasters.flags.addFlg = false;
      lMasters.flags.editFlag = false;
      lMasters.newRisk = {
        SNo: "",
        Occupancy: "",
        TypeOfWorker: "",
        NatureOfWork: "",
        RiskCategory: "",
        NoOfEmployees: "",
        MonthlyWagesPerWorker: "",
        WagesUpto15000: "",
        WagesAbove15000: "",
        WagesUpto15000GC: "",
        WagesAbove15000GC: "",
        ClassificationNo: "",
        EndoresmentNo: "",
        AuditSerialNumber: "",
        CategoryCode: "",
        CategoryDescription: "",
        SubCategoryCode: "",
        SubCategoryDescription: "",
        EmployeeType: "",
      };
      // lMasters.flags.editval = false;
      lMasters.Quotes[0].editval = false;
      lMasters.Quotes[1].editval = false;
      lMasters.Quotes[2].editval = false;
      setMasters({ ...lMasters });
      setDto({ ...lDto });
    }
  };
  // lMasters.flags.editval = true;
  const handleEdit = () => {
    if (
      masters.newRisk.Occupancy === "" ||
      masters.newRisk.TypeOfWorker === "" ||
      masters.newRisk.NatureOfWork === "" ||
      masters.newRisk.NoOfEmployees === "" ||
      masters.newRisk.MonthlyWagesPerWorker === ""
    ) {
      lMasters.errRisk = true;
      setMasters({ ...lMasters });
    } else {
      const riskIndex = lDto.InsurableItem[0].RiskItems.findIndex(
        (item) => item.SNo === lMasters.flags.rowId
      );
      if (riskIndex !== -1) {
        const updatedRiskItems = [...lDto.InsurableItem[0].RiskItems];
        updatedRiskItems[riskIndex] = {
          ...lMasters.newRisk,
        };
        lDto.InsurableItem[0].RiskItems = updatedRiskItems;
        updatedRiskItems.forEach((x, i) => {
          updatedRiskItems[i].SNo = i + 1;
        });
        setDto({ ...lDto });
      }
      let tNoEmp = 0;
      let tMonthlyWages = 0;
      let totalSI = 0;
      dto.InsurableItem[0].RiskItems.forEach((x) => {
        tNoEmp += parseInt(x.NoOfEmployees, 10);
        tMonthlyWages += Number(x.MonthlyWagesPerWorker);
        const totalSI1 =
          Number(dto.PolicyTenure) * Number(x.NoOfEmployees) * Number(x.WagesUpto15000) +
          Number(dto.PolicyTenure) * Number(x.NoOfEmployees) * Number(x.WagesAbove15000);
        totalSI += totalSI1;
      });

      if (totalSI > 50000000) {
        lMasters.flags.totalSI = true;
        setTimeout(() => {
          lMasters.flags.totalSI = false;
          setMasters({ ...lMasters });
        }, 10000);
      }

      lMasters.totalNoEmp = tNoEmp;
      lMasters.totalMonthlyWages = tMonthlyWages;
      lMasters.totalSI = totalSI;
      lDto.SumInsured = String(totalSI);
      // lMasters.flags.editval = false;
      lMasters.Quotes[0].editval = false;
      lMasters.Quotes[1].editval = false;
      lMasters.Quotes[2].editval = false;
      lMasters.flags.addFlg = false;
      lMasters.flags.editFlg = false;
      setMasters({
        ...lMasters,
        newRisk: {
          SNo: "",
          Occupancy: "",
          TypeOfWorker: "",
          NatureOfWork: "",
          RiskCategory: "",
          NoOfEmployees: "",
          MonthlyWagesPerWorker: "",
          WagesUpto15000: "",
          WagesAbove15000: "",
          WagesUpto15000GC: "",
          WagesAbove15000GC: "",
          ClassificationNo: "",
          EndoresmentNo: "",
          AuditSerialNumber: "",
          CategoryCode: "",
          CategoryDescription: "",
          SubCategoryCode: "",
          SubCategoryDescription: "",
          EmployeeType: "",
        },
      });
      setDto({ ...lDto });
    }
  };
  console.log("Masters", masters);
  console.log("dto", dto);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "NoOfEmployees" || name === "MonthlyWagesPerWorker") {
      // if (IsNumeric(value) === true && value > 0 && value.length <= 10) {
      if (IsNumeric(value) === true) {
        lMasters.newRisk[name] = value;
      }
      // else {
      //   lMasters.newRisk[name] = "";
      // }
    } else if (name === "NatureOfWork") {
      if (IsAlphaNumSpace(value) === true) {
        lMasters.newRisk[name] = value;
      } else {
        lMasters.newRisk[name] = "";
      }
    } else {
      lMasters.newRisk[name] = value;
    }
    setMasters({ ...lMasters });
  };
  const handleMonthly = () => {
    if (Number(masters.newRisk.MonthlyWagesPerWorker) <= 15000) {
      lMasters.newRisk.WagesUpto15000 = masters.newRisk.MonthlyWagesPerWorker;
      lMasters.newRisk.WagesAbove15000 = "0";
    } else {
      lMasters.newRisk.WagesUpto15000 = "15000";
      lMasters.newRisk.WagesAbove15000 =
        Number(masters.newRisk.MonthlyWagesPerWorker) - Number(masters.newRisk.WagesUpto15000);
    }
    if (Number(masters.newRisk.MonthlyWagesPerWorker) <= 15000) {
      lMasters.newRisk.WagesUpto15000GC = masters.newRisk.MonthlyWagesPerWorker;
      lMasters.newRisk.WagesAbove15000GC = "0";
      lMasters.newRisk.EmployeeType = "Low Wages Employee";
    } else {
      lMasters.newRisk.WagesUpto15000GC = "0";
      lMasters.newRisk.WagesAbove15000GC = Number(masters.newRisk.MonthlyWagesPerWorker);
      lMasters.newRisk.EmployeeType = "High Wages Employee";
    }
    setMasters({ ...lMasters });
  };

  const [selectedPopoverIndex, setSelectedPopoverIndex] = useState(-1);

  const handleCloseActionButton = () => {
    lMasters.flags.anchorEl = false;
    setSelectedPopoverIndex(null);
    setMasters({ ...lMasters });
  };
  const handleClick = (event, i) => {
    lMasters.flags.anchorEl = event.currentTarget;
    setMasters({ ...lMasters });
    setSelectedPopoverIndex(i);
  };

  const handleDelete = () => {
    const updatedData = dto.InsurableItem[0].RiskItems.filter(
      (item) => item.SNo !== masters.flags.rowId
    );
    lDto.InsurableItem[0].RiskItems = updatedData;
    updatedData.forEach((x, i) => {
      updatedData[i].SNo = i + 1;
    });
    let tNoEMP = 0;
    let tMonthlyWages = 0;
    let totalSI = 0;
    dto.InsurableItem[0].RiskItems.forEach((x) => {
      tNoEMP += parseInt(x.NoOfEmployees, 10);
      tMonthlyWages += Number(x.MonthlyWagesPerWorker);
      const totalSI1 =
        Number(dto.PolicyTenure) * Number(x.NoOfEmployees) * Number(x.WagesUpto15000) +
        Number(dto.PolicyTenure) * Number(x.NoOfEmployees) * Number(x.WagesAbove15000);
      totalSI += totalSI1;
    });

    setDto({ ...lDto });
    if (totalSI > 50000000) {
      lMasters.flags.totalSI = true;
      setTimeout(() => {
        lMasters.flags.totalSI = false;
        setMasters({ ...lMasters });
      }, 10000);
    }
    lMasters.totalNoEmp = tNoEMP;
    lMasters.totalMonthlyWages = tMonthlyWages;
    lMasters.totalSI = totalSI;
    lDto.SumInsured = String(totalSI);
    // lMasters.flags.editval = false;
    lMasters.Quotes[0].editval = false;
    lMasters.Quotes[1].editval = false;
    lMasters.Quotes[2].editval = false;
    lMasters.flags.deleteFlg = false;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
    setSelectedPopoverIndex(-1);
  };
  // const handleDiscount = (e) => {
  //   if (IsNumeric(e.target.value) === true) {
  //     if (Number(e.target.value) < 85) {
  //       lMasters.flags.disErr = true;
  //       lDto.Discount = e.target.value;
  //     }
  //   }
  //   setMasters({ ...lMasters });
  //   setDto({ ...lDto });
  // };

  const handlePincode = async (e, name, i) => {
    // debugger;
    if (IsNumeric(e.target.value) === true && e.target.value.length === 6) {
      if (name === "Risk") {
        lDto.InsurableItem[0].RiskLocationAddress[Number(i)].Pincode = e.target.value;
      } else if (name === "Perm") {
        lDto.ProposerDetails.PermanentAddress.Pincode = e.target.value;
      } else if (name === "Comm") {
        lDto.ProposerDetails.CommunicationAddress.Pincode = e.target.value;
      }

      // if () {
      const ProductId = 782;

      const obj = { Pincode: e.target.value };

      const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);

      console.log("city", city);

      if (city.length !== 0) {
        if (name === "Risk") {
          const res = await getPincodeDetails(city[0].City_ID);
          console.log("CityDistrictValue", res);
          lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrict =
            res.city[0].CityDistrict_CD;
          lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrictValue =
            res.district[0].District_Name;
          lDto.InsurableItem[0].RiskLocationAddress[Number(i)].State = res.state[0].mID;
          lDto.InsurableItem[0].RiskLocationAddress[Number(i)].StateValue = res.state[0].State_Name;
          lMasters.riskCD = city;
        } else if (name === "Perm") {
          lMasters.permCD = city;
        } else if (name === "Comm") {
          lMasters.commCD = city;
        }
      } else {
        if (name === "Risk") {
          lDto.InsurableItem[0].RiskLocationAddress[Number(i)].Pincode = "";
          lDto.InsurableItem[0].RiskLocationAddress[Number(i)].State = "";
          lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrict = "";
          lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrictValue = "";
        } else if (name === "Perm") {
          lDto.ProposerDetails.PermanentAddress.Pincode = "";
          lDto.ProposerDetails.PermanentAddress.State = "";
          lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
          lDto.ProposerDetails.PermanentAddress.CityDistrictValue = "";
        } else if (name === "Comm") {
          lDto.ProposerDetails.CommunicationAddress.Pincode = "";
          lDto.ProposerDetails.CommunicationAddress.State = "";
          lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
          lDto.ProposerDetails.CommunicationAddress.CityDistrictValue = "";
        }
        swal({ icon: "error", text: "Enter valid Pincode" });
      }
    } else {
      lMasters.riskCD = [];
      lMasters.permCD = [];
      lMasters.commCD = [];
      if (name === "Risk") {
        lDto.InsurableItem[0].RiskLocationAddress[Number(i)].Pincode = "";
        lDto.InsurableItem[0].RiskLocationAddress[Number(i)].State = "";
        lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrict = "";
        lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrictValue = "";
      } else if (name === "Perm") {
        lDto.ProposerDetails.PermanentAddress.Pincode = "";
        lDto.ProposerDetails.PermanentAddress.State = "";
        lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
        lDto.ProposerDetails.PermanentAddress.CityDistrictValue = "";
      } else if (name === "Comm") {
        lDto.ProposerDetails.CommunicationAddress.Pincode = "";
        lDto.ProposerDetails.CommunicationAddress.State = "";
        lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
        lDto.ProposerDetails.CommunicationAddress.CityDistrictValue = "";
      }
      swal({ icon: "error", text: "Enter valid Pincode" });
      // lDto.InsurableItem[0].OfficeAddress.CityDistrict = "";
      // lDto.InsurableItem[0].OfficeAddress.State = "";
      // lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      // lDto.ProposerDetails.PermanentAddress.State = "";
      // lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      // lDto.ProposerDetails.CommunicationAddress.State = "";
    }

    setMasters({ ...lMasters });

    setDto({ ...lDto });
    // }
  };
  const handleCity = async (e, v, name, i) => {
    // debugger;
    const res = await getPincodeDetails(v.City_ID);

    console.log("res", res);

    if (name === "Risk") {
      lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrict =
        res.city[0].CityDistrict_CD;
      lDto.InsurableItem[0].RiskLocationAddress[Number(i)].CityDistrictValue = v.mValue;
      lDto.InsurableItem[0].RiskLocationAddress[Number(i)].State = res.state[0].mID;
      lDto.InsurableItem[0].RiskLocationAddress[Number(i)].StateValue = res.state[0].State_Name;
      // lMasters[i].CityDistrict.risk = v.mValue;
      // lMasters[i].State.risk = res.state[0].State_Name;
    } else if (name === "Perm") {
      lDto.ProposerDetails.PermanentAddress.CityDistrict = res.city[0].CityDistrict_CD;
      lDto.ProposerDetails.PermanentAddress.State = res.state[0].mID;
      lDto.ProposerDetails.PermanentAddress.CityDistrictValue = v.mValue;
      lDto.ProposerDetails.PermanentAddress.StateValue = res.state[0].State_Name;
      lMasters.CityDistrict.perm = v.mValue;
      lMasters.State.perm = res.state[0].State_Name;
      // lDto.ProposerDetails.PermanentAddress.CityDistrict = v.mValue;
      // lDto.ProposerDetails.PermanentAddress.State = res.state[0].State_Name;
    } else if (name === "Comm") {
      // lDto.ProposerDetails.CommunicationAddress.CityDistrict = v.mValue;
      // lDto.ProposerDetails.CommunicationAddress.State = res.state[0].State_Name;
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = res.city[0].CityDistrict_CD;
      lDto.ProposerDetails.CommunicationAddress.State = res.state[0].mID;
      lDto.ProposerDetails.CommunicationAddress.CityDistrictValue = v.mValue;
      lDto.ProposerDetails.CommunicationAddress.StateValue = res.state[0].State_Name;
      lMasters.CityDistrict.comm = v.mValue;
      lMasters.State.comm = res.state[0].State_Name;
    }

    setDto({ ...lDto });
  };

  const handleTabChange = (event, newTab) => {
    lMasters.flags.activeTab = newTab;
    lDto.InsurableItem[0].Covers[0].IsOptional = masters.Quotes[newTab].MedicalExpenses;
    lDto.InsurableItem[0].Covers[0].Limit = masters.Quotes[newTab].MedicalSumInsured;
    lDto.InsurableItem[0].Covers[0].LimitValue = masters.Quotes[newTab].MedicalSumInsuredValue;
    lDto.InsurableItem[0].Covers[1].IsOptional = masters.Quotes[newTab].Terrorism;
    lDto.InsurableItem[0].Covers[2].IsOptional = masters.Quotes[newTab].OccupationalDisease;
    lDto.InsurableItem[0].Covers[3].IsOptional = masters.Quotes[newTab].ContractWorkersExtension;
    lDto.Loading = masters.Quotes[newTab].Loading;
    lDto.Discount = masters.Quotes[newTab].Discount;

    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const handelTab = (ind) => {
    lMasters.flags.selectedColumn = ind;
    if (lMasters.flags.selectedColumn === 0) {
      lDto.SumInsured = masters.Quotes[0].TotalSI;
      lDto.PremiumDetails["Total with Tax"] = lMasters.Quotes[0].FinalPremium;
      lDto.PremiumDetails["Net Premium"] = lMasters.Quotes[0].NetPremium;
      lDto.PaymentDetails.ChequeAmount = lMasters.Quotes[0].FinalPremium;
      lDto.PremiumDetails["Extension Premium"] = lMasters.Quotes[0].AddOnPremium;
      lDto.PremiumDetails.GST = lMasters.Quotes[0].GST;
      lDto.PremiumDetails.SGST = lMasters.Quotes[0].SGST;
      lDto.PremiumDetails.CGST = lMasters.Quotes[0].CGST;
    } else if (lMasters.flags.selectedColumn === 1) {
      lDto.SumInsured = masters.Quotes[1].TotalSI;
      lDto.PremiumDetails["Total with Tax"] = lMasters.Quotes[1].FinalPremium;
      lDto.PremiumDetails["Net Premium"] = lMasters.Quotes[1].NetPremium;
      lDto.PaymentDetails.ChequeAmount = lMasters.Quotes[1].FinalPremium;
      lDto.PremiumDetails["Extension Premium"] = lMasters.Quotes[1].AddOnPremium;
      lDto.PremiumDetails.GST = lMasters.Quotes[1].GST;
      lDto.PremiumDetails.SGST = lMasters.Quotes[1].SGST;
      lDto.PremiumDetails.CGST = lMasters.Quotes[1].CGST;
    } else if (lMasters.flags.selectedColumn === 2) {
      lDto.SumInsured = masters.Quotes[2].TotalSI;
      lDto.PremiumDetails["Total with Tax"] = lMasters.Quotes[2].FinalPremium;
      lDto.PremiumDetails["Net Premium"] = lMasters.Quotes[2].NetPremium;
      lDto.PaymentDetails.ChequeAmount = lMasters.Quotes[2].FinalPremium;
      lDto.PremiumDetails["Extension Premium"] = lMasters.Quotes[2].AddOnPremium;
      lDto.PremiumDetails.GST = lMasters.Quotes[2].GST;
      lDto.PremiumDetails.SGST = lMasters.Quotes[2].SGST;
      lDto.PremiumDetails.CGST = lMasters.Quotes[2].CGST;
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

  const data1 = [
    { label: "Total Wages", name: "TotalSI" },
    { label: "Add-on Premium", name: "AddOnPremium" },
    { label: "Discount", name: "DiscountAmount" },
    { label: "Loading", name: "LoadingAmount" },
    { label: "Net Premium", name: "NetPremium" },
    { label: "CGST", name: "CGST" },
    { label: "SGST", name: "SGST" },
    { label: "Total Premium", name: "FinalPremium" },
  ];

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

  const handleCovers = (e, name, ind1) => {
    // lMasters.Quotes[lMasters.flags.activeTab][name] = e.target.checked;
    if (name === "MedicalExpenses") {
      lMasters.Quotes[lMasters.flags.activeTab].medFlag = "True";
    } else if (name === "Terrorism") {
      lMasters.Quotes[lMasters.flags.activeTab].terrFlag = "True";
    } else if (name === "OccupationalDisease") {
      lMasters.Quotes[lMasters.flags.activeTab].occFlag = "True";
    } else if (name === "ContractWorkersExtension") {
      lMasters.Quotes[lMasters.flags.activeTab].contFlag = "True";
    }
    if (e.target.checked === true) {
      lMasters.Quotes[lMasters.flags.activeTab][name] = "Yes";
      lDto.InsurableItem[0].Covers[ind1].IsOptional = "Yes";
      lDto.InsurableItem[0].Covers[ind1].selected = "True";
    } else if (e.target.checked === false) {
      lMasters.Quotes[lMasters.flags.activeTab][name] = "No";
      lDto.InsurableItem[0].Covers[ind1].IsOptional = "No";
      lMasters.Quotes[lMasters.flags.activeTab].selected = "False";
      lDto.InsurableItem[0].Covers[ind1].selected = "False";
    }
    // lMasters.flags.editval = false;
    lMasters.Quotes[0].editval = false;
    lMasters.Quotes[1].editval = false;
    lMasters.Quotes[2].editval = false;
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const handleMedSum = (e, v, i) => {
    lMasters.Quotes[lMasters.flags.activeTab].MedicalSumInsured = v.mID;
    lMasters.Quotes[lMasters.flags.activeTab].MedicalSumInsuredValue = v.mValue;
    lDto.InsurableItem[0].Covers[i].Limit = v.mID;
    lDto.InsurableItem[0].Covers[i].LimitValue = v.mValue;

    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  // const handleLdDst = (e, name) => {
  //   // if  {
  //   //   if (name === "Discount") {
  //   //     const regex = /^[0-9]*$/;
  //   // if (regex.test(number) && number < 86){}
  //   //     lMasters.Quotes[lMasters.flags.activeTab][name] = e.target.value;
  //   //     lDto[name] = e.target.value;
  //   //   } else if (name === "Loading" && IsNumeric(e.target.value) === true) {
  //   lMasters.Quotes[lMasters.flags.activeTab][name] = e.target.value;
  //   lDto[name] = e.target.value;
  //   // }

  //   setMasters({ ...lMasters });
  //   setDto({ ...lDto });
  //   // }
  // };

  const DiscountVal = (number) => {
    const regex = /^[0-9.]*$/;
    if (regex.test(number) && number < 90.1) {
      lMasters.Quotes[lMasters.flags.activeTab].Discount = number;
      lMasters.Quotes[lMasters.flags.activeTab].DiscountVal = "Other Discount";

      lDto.Discount = number;
      lDto.DiscountVal = "Other Discount";

      // lMasters.flags.editval = false;
      lMasters.Quotes[0].editval = false;
      lMasters.Quotes[1].editval = false;
      lMasters.Quotes[2].editval = false;
      setMasters({ ...lMasters });
      setDto({ ...lDto });
      return true;
    }
    return "maximum discount applicable is 90%";
  };
  const LoadingVal = (number) => {
    // debugger;
    const regex = /^[0-9.]*$/;
    if (regex.test(number) && number < 100.1) {
      lMasters.Quotes[lMasters.flags.activeTab].Loading = number;
      lMasters.Quotes[lMasters.flags.activeTab].LoadingVal = "Other Loadings";

      lDto.Loading = number;
      lDto.LoadingVal = "Other Loadings";
      // lMasters.flags.editval = false;
      lMasters.Quotes[0].editval = false;
      lMasters.Quotes[1].editval = false;
      lMasters.Quotes[2].editval = false;
      setMasters({ ...lMasters });
      setDto({ ...lDto });
      return true;
    }
    return "maximum loading applicable is 100%";
  };
  const handleShowTab = () => {
    lMasters.flags.showTab = true;
    setMasters({ ...lMasters });
  };
  const handleClickTab = () => {
    if (lMasters.flags.clicks === 0) {
      lMasters.flags.activeTab = 1;
      lMasters.flags.selectedColumn = 1;
      lDto.InsurableItem[0].Covers[0].IsOptional = masters.Quotes[1].MedicalExpenses;
      lDto.InsurableItem[0].Covers[0].Limit = masters.Quotes[1].MedicalSumInsured;
      lDto.InsurableItem[0].Covers[0].LimitValue = masters.Quotes[1].MedicalSumInsuredValue;
      lDto.InsurableItem[0].Covers[1].IsOptional = masters.Quotes[1].Terrorism;
      lDto.InsurableItem[0].Covers[2].IsOptional = masters.Quotes[1].OccupationalDisease;
      lDto.InsurableItem[0].Covers[3].IsOptional = masters.Quotes[1].ContractWorkersExtension;
      lDto.InsurableItem[0].Covers[0].selected = masters.Quotes[1].medFlag;
      lDto.InsurableItem[0].Covers[1].selected = masters.Quotes[1].terrFlag;
      lDto.InsurableItem[0].Covers[2].selected = masters.Quotes[1].occFlag;
      lDto.InsurableItem[0].Covers[3].selected = masters.Quotes[1].contFlag;

      lDto.Loading = masters.Quotes[2].Loading;
      lDto.Discount = masters.Quotes[2].Discount;
      lDto.LoadingVal = masters.Quotes[2].LoadingVal;
      lDto.DiscountVal = masters.Quotes[2].DiscountVal;

      setDto({ ...lDto });
      handleShowTab();
      handleColumnQClick();
      // console.log("First click");
    } else if (lMasters.flags.clicks === 1) {
      lMasters.flags.activeTab = 2;
      lMasters.flags.selectedColumn = 2;
      lDto.InsurableItem[0].Covers[0].IsOptional = masters.Quotes[2].MedicalExpenses;
      lDto.InsurableItem[0].Covers[0].Limit = masters.Quotes[2].MedicalSumInsured;
      lDto.InsurableItem[0].Covers[0].LimitValue = masters.Quotes[2].MedicalSumInsuredValue;
      lDto.InsurableItem[0].Covers[1].IsOptional = masters.Quotes[2].Terrorism;
      lDto.InsurableItem[0].Covers[2].IsOptional = masters.Quotes[2].OccupationalDisease;
      lDto.InsurableItem[0].Covers[3].IsOptional = masters.Quotes[2].ContractWorkersExtension;
      lDto.InsurableItem[0].Covers[0].selected = masters.Quotes[2].medFlag;
      lDto.InsurableItem[0].Covers[1].selected = masters.Quotes[2].terrFlag;
      lDto.InsurableItem[0].Covers[2].selected = masters.Quotes[2].occFlag;
      lDto.InsurableItem[0].Covers[3].selected = masters.Quotes[2].contFlag;
      lDto.Loading = masters.Quotes[2].Loading;
      lDto.Discount = masters.Quotes[2].Discount;
      lDto.LoadingVal = masters.Quotes[2].LoadingVal;
      lDto.DiscountVal = masters.Quotes[2].DiscountVal;

      setDto({ ...lDto });
      handleShowTabQ();
      handleColumnQoClick();
      handleButtonClick();
      // console.log("Second click");
    }
    lMasters.flags.clicks += 1;

    setMasters({ ...lMasters });
  };

  const handleCalculatePremium = async () => {
    if (
      dto.PolicyStartDate === "" ||
      dto.InsurableItem[0].RiskLocationAddress[0].CityDistrictValue === "" ||
      dto.PolicyTenure === ""
    ) {
      swal({ icon: "error", text: "Please fill required fields" });
    } else if (dto.InsurableItem[0].RiskItems.length === 0) {
      swal({ icon: "error", text: "Please add Risk Details" });
    } else if (
      lDto.InsurableItem[0].Covers[0].IsOptional === "Yes" &&
      dto.InsurableItem[0].Covers[0].Limit === ""
    ) {
      swal({ icon: "error", text: "Please Select Medical Sum Insured" });
    } else {
      setBackDropFlag(true);
      const res = await GenericApi("WorkmanCompensation_v1", "CalculatePremium", dto);
      if (res.responseMessage === "Success") {
        // lMasters.flags.editval = true;
        lMasters.Quotes[masters.flags.activeTab].editval = true;
        lDto.PremiumDetails.MedicalExpensesPremium = String(
          Math.round(Number(res.finalResult.WCRating.MedicalExpensesPremiumSum))
        );
        lDto.SumInsured = res.finalResult.TotalSI;
        // lDto.Discount = res.finalResult.DiscountAmount;
        lDto.ProposerDetails.Name = `${lDto.ProposerDetails["First Name"]} ${lDto.ProposerDetails["Last Name"]}`;
        lDto.PremiumDetails["Total with Tax"] = String(
          Math.round(Number(res.finalResult.FinalPremium))
        );
        lDto.PremiumDetails["Net Premium"] = String(
          Math.round(Number(res.finalResult.NewNetPremium))
        );
        lDto.PremiumDetails.GST = String(Math.round(Number(res.finalResult.GST)));
        lDto.PremiumDetails.SGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));
        lDto.PremiumDetails.CGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));

        // lDto.PaymentDetails.ChequeAmount = String(Math.round(Number(res.finalResult.FinalPremium)));
        console.log("Calculate Premium", res);
        const quotationDTO = await callUpdateQuoteMethod(dto);
        console.log("quotationDTO", quotationDTO);
        lDto["Quotation No"] = quotationDTO.data.quotation.quoteNo;
        lDto.QuoteNo = quotationDTO.data.quotation.quoteNo;
        const ind = lMasters.flags.activeTab;
        console.log("index", ind);
        lMasters.flags.CalPreSuc = true;
        lMasters.Quotes[ind].TotalSI = SplitingNumber(Number(res.finalResult.TotalSI));
        // let totalExtensionPremium = 0;
        // res.finalResult.WCRating.output.forEach((x) => {
        //   if (x.ExtensionPremium) {
        //     totalExtensionPremium += Number(x.ExtensionPremium);
        //   }
        // });
        lMasters.Quotes[ind].AddOnPremium = SplitingNumber(
          Math.round(res.finalResult.WCRating.UIAddonPremiumSum)
        );
        lDto.PremiumDetails["Extension Premium"] = String(
          Math.round(Number(res.finalResult.WCRating.UIAddonPremiumSum))
        );
        lMasters.Quotes[ind].DiscountAmount = SplitingNumber(
          Math.round(Number(res.finalResult.DiscountAmount))
        );
        lMasters.Quotes[ind].LoadingAmount = SplitingNumber(
          Math.round(Number(res.finalResult.LoadingAmount))
        );
        lMasters.Quotes[ind].NetPremium = SplitingNumber(
          Math.round(Number(res.finalResult.NewNetPremium))
        );
        // lMasters.Quotes[ind].GST = res.finalResult.GST;
        lMasters.Quotes[ind].GST = Math.round(Number(res.finalResult.GST));
        lMasters.Quotes[ind].SGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));
        lMasters.Quotes[ind].CGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));
        lMasters.Quotes[ind].FinalPremium = SplitingNumber(
          Math.round(Number(res.finalResult.FinalPremium))
        );
        // lMasters.SavePymtDTO.paymentDetailsDTO.ChequeAmount = res.finalResult.FinalPremium;
        lDto.ProposerDetails.Name = `${dto.ProposerDetails["First Name"]}${lDto.ProposerDetails["Last Name"]}`;
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
                partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString();
              lDto.Channel.PrimaryVerticalName =
                partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
                  ? masters.VerticalName.filter(
                      (x) =>
                        x.VerticalCode ===
                        partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
                    )[0].mValue
                  : partnerDetail.AdditionalDetails.PrimaryVerticalName;
              // lDto.Channel.PrimaryVerticalName =
              //   partnerDetail.AdditionalDetails.PrimaryVerticalName;
              lDto.Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
              lDto.Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
              lDto.Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
              lDto.Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
              lDto.Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
              lDto.Channel.DealId = partnerDetail.AdditionalDetails.DealId;
              lDto["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;
              setDto({ ...lDto });
              setBackDropFlag(false);
            });
          }
        );

        setMasters({ ...lMasters });
        setDto({ ...lDto });
      } else if (res.data.RuleOutPut.failureMsg === "Refer To Underwriter") {
        lMasters.flags.CalPreSuc = false;
        // lMasters.flags.errMsg = true;
        setBackDropFlag(false);
        setMasters({ ...lMasters });
        // swal({ icon: "error", text: res.data.RuleOutPut.failureMsg });
        swal({ icon: "error", text: "Refer to Underwriter" });
      }
    }
  };

  // const onPremiumCal1 = async () => {
  //   if (
  //     dto.PolicyStartDate === "" ||
  //     dto.InsurableItem[0].RiskLocationAddress[0].CityDistrictValue === "" ||
  //     dto.PolicyTenure === ""
  //   ) {
  //     swal({ icon: "error", text: "Please fill required fields" });
  //   } else if (dto.InsurableItem[0].RiskItems.length === 0) {
  //     swal({ icon: "error", text: "Please add Risk Details" });
  //   } else if (
  //     lDto.InsurableItem[0].Covers[0].IsOptional === "Yes" &&
  //     dto.InsurableItem[0].Covers[0].Limit === ""
  //   ) {
  //     swal({ icon: "error", text: "Please Select Medical Sum Insured" });
  //   } else {
  //     setBackDropFlag(true);
  //     const res = await GenericApi("WorkmanCompensation_v1", "CalculatePremium", dto);
  //     if (res.responseMessage === "Success") {
  //       // lMasters.flags.editval = true;
  //       lMasters.Quotes[masters.flags.activeTab].editval = true;
  //       lDto.PremiumDetails.MedicalExpensesPremium = String(
  //         Math.round(Number(res.finalResult.WCRating.MedicalExpensesPremiumSum))
  //       );
  //       lDto.SumInsured = res.finalResult.TotalSI;
  //       // lDto.Discount = res.finalResult.DiscountAmount;
  //       lDto.ProposerDetails.Name = `${lDto.ProposerDetails["First Name"]} ${lDto.ProposerDetails["Last Name"]}`;
  //       lDto.PremiumDetails["Total with Tax"] = String(
  //         Math.round(Number(res.finalResult.FinalPremium))
  //       );
  //       lDto.PremiumDetails["Net Premium"] = String(
  //         Math.round(Number(res.finalResult.NewNetPremium))
  //       );
  //       lDto.PremiumDetails.GST = String(Math.round(Number(res.finalResult.GST)));
  //       // lDto.PaymentDetails.ChequeAmount = String(Math.round(Number(res.finalResult.FinalPremium)));
  //       console.log("Calculate Premium", res);
  //       const quotationDTO = await callSaveQuoteMethod(dto);
  //       console.log("quotationDTO", quotationDTO);
  //       lDto["Quotation No"] = quotationDTO.data.quotation.quoteNo;
  //       lDto.QuoteNo = quotationDTO.data.quotation.quoteNo;
  //       const ind = lMasters.flags.activeTab;
  //       console.log("index", ind);
  //       lMasters.flags.CalPreBtn = true;
  //       lMasters.flags.CalPreSuc = true;
  //       lMasters.Quotes[ind].TotalSI = SplitingNumber(res.finalResult.TotalSI);
  //       // let totalExtensionPremium = 0;
  //       // res.finalResult.WCRating.output.forEach((x) => {
  //       //   if (x.ExtensionPremium) {
  //       //     totalExtensionPremium += Number(x.ExtensionPremium);
  //       //   }
  //       // });
  //       lMasters.Quotes[ind].AddOnPremium = SplitingNumber(
  //         Math.round(res.finalResult.WCRating.UIAddonPremiumSum)
  //       );
  //       lDto.PremiumDetails["Extension Premium"] = String(
  //         Math.round(Number(res.finalResult.WCRating.UIAddonPremiumSum))
  //       );
  //       lMasters.Quotes[ind].DiscountAmount = SplitingNumber(
  //         Math.round(Number(res.finalResult.DiscountAmount))
  //       );
  //       lMasters.Quotes[ind].LoadingAmount = SplitingNumber(
  //         Math.round(Number(res.finalResult.LoadingAmount))
  //       );
  //       lMasters.Quotes[ind].NetPremium = SplitingNumber(
  //         Math.round(Number(res.finalResult.NewNetPremium))
  //       );
  //       lMasters.Quotes[ind].GST = Math.round(Number(res.finalResult.GST));
  //       lMasters.Quotes[ind].SGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));
  //       lMasters.Quotes[ind].CGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));
  //       lMasters.Quotes[ind].FinalPremium = SplitingNumber(
  //         Math.round(Number(res.finalResult.FinalPremium))
  //       );
  //       // lMasters.SavePymtDTO.paymentDetailsDTO.ChequeAmount = SplitingNumber(
  //       //   Math.round(Number(res.finalResult.FinalPremium))
  //       // );
  //       lDto.ProposerDetails.Name = `${dto.ProposerDetails["First Name"]}${lDto.ProposerDetails["Last Name"]}`;

  //       getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
  //         async (result) => {
  //           console.log("result", result);
  //           const { partnerId } = result.data.userDetails[0];
  //           await getRequest(
  //             `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
  //               "userId"
  //             )}&productCode=${dto.GCProductCode}`
  //           ).then(async (reslt) => {
  //             console.log("qwertyuiop", reslt);
  //             const partnerDetailssss = reslt.data.additionalDetails;
  //             console.log("123456789", partnerDetailssss);
  //             const partnerDetail = JSON.parse(partnerDetailssss);
  //             lDto.Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
  //             lDto.Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
  //             lDto.Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
  //             lDto.Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
  //             lDto.Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
  //             lDto.Channel.AgentContactNo = partnerDetail.Mobile;
  //             lDto.Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
  //             lDto.Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
  //             lDto.Channel.PrimaryVerticalCode =
  //               partnerDetail.AdditionalDetails.PrimaryVerticalCode;
  //             lDto.Channel.PrimaryVerticalName =
  //               partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
  //                 ? masters.VerticalName.filter(
  //                     (x) => x.VerticalCode === partnerDetail.AdditionalDetails.PrimaryVerticalCode
  //                   )[0].mValue
  //                 : partnerDetail.AdditionalDetails.PrimaryVerticalName;
  //             // lDto.Channel.PrimaryVerticalName =
  //             //   partnerDetail.AdditionalDetails.PrimaryVerticalName;
  //             lDto.Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
  //             lDto.Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
  //             lDto.Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
  //             lDto.Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
  //             lDto.Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
  //             lDto.Channel.DealId = partnerDetail.AdditionalDetails.DealId;
  //             // setDto({ ...lDto });
  //             setBackDropFlag(false);
  //           });
  //         }
  //       );

  //       setMasters({ ...lMasters });
  //       setDto({ ...lDto });
  //     } else if (res.data.RuleOutPut.failureMsg === "Refer To Underwriter") {
  //       // lMasters.flags.errMsg = true;
  //       lMasters.flags.CalPreBtn = false;
  //       lMasters.flags.CalPreSuc = false;
  //       setBackDropFlag(false);
  //       setMasters({ ...lMasters });
  //       // swal({ icon: "error", text: res.data.RuleOutPut.failureMsg });
  //       swal({ icon: "error", text: "Refer to Underwriter" });
  //     }
  //   }
  // };

  const initiateCkyc = async () => {
    // debugger;
    if (dto?.CustomerType === "Individual") {
      const dobString = lDto.ProposerDetails.DOB;
      const [day, month, year] = dobString.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      const Age = AgeCalculator1(date.toLocaleDateString("en-ZA"));
      if (Age < 18) {
        lMasters.flags.dob = true;
      } else {
        lMasters.flags.dob = false;
      }
      setMasters({ ...lMasters });
    } else {
      lMasters.flags.dob = false;
      setMasters({ ...lMasters });
    }

    if (
      dto.CustomerType === "Individual" &&
      dto.ProposerDetails.CKYCParam === "PAN Number" &&
      dto.ProposerDetails.PanNo === ""
    ) {
      swal({
        icon: "error",
        text: `Please Provide Pan Number before Initiating KYC `,
      });
      // lMasters.flags.Kyc = false;
    }
    if (lMasters.flags.dob === true) {
      swal({
        icon: "error",
        text: "Age cannot be less than 18 Years",
      });
    } else if (
      dto.CustomerType === "Corporate" &&
      dto.ProposerDetails.PanNo === "" &&
      dto.ProposerDetails.GSTNumber === "" &&
      dto.ProposerDetails.CINNo === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill the Ckyc Details",
      });
    } else if (
      dto.CustomerType === "Individual" &&
      dto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
      (dto.ProposerDetails.AadharID === "" ||
        dto.ProposerDetails.DOB === "" ||
        dto.ProposerDetails.AadharMobileNo === "" ||
        dto.ProposerDetails.AadharName === "" ||
        dto.ProposerDetails.AadharGender === "")
    ) {
      swal({
        icon: "error",
        text: "Please fill the Ckyc Details",
      });
    }
    // else if (dto.CustomerType === "Corporate" && dto.ProposerDetails.GSTNumber === "") {
    //   swal({
    //     icon: "error",
    //     text: "Enter  GST Number",
    //   });
    // }
    else if (dto.CustomerType === "Corporate" && dto.ProposerDetails.DOB === "") {
      swal({
        icon: "error",
        text: "Please fill the Ckyc Details",
      });
    } else if (dto.CustomerType === "Individual" && dto.ProposerDetails.DOB === "") {
      swal({
        icon: "error",
        text: "Please fill the Date of Birth",
      });
    } else {
      const objAadhar = {
        source: "AVO",
        customerType: dto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo: dto.ProposerDetails.AadharID,
        idType: "AADHAAR",
        dob: dto.ProposerDetails.DOB,
        mobileNo: dto.ProposerDetails.AadharMobileNo,
        pincode: "",
        ckycNo: "",
        extraField1: dto.ProposerDetails.AadharName,
        extraField2: dto.ProposerDetails.AadharGender === "Female" ? "F" : "M",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };

      const obj1 = {
        source: "AVO",
        customerType: dto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "",
        idNo:
          dto.CustomerType === "Individual"
            ? dto.ProposerDetails.PanNo
            : dto.CustomerType === "Corporate" &&
              (dto.ProposerDetails.PanNo ||
                dto.ProposerDetails.GSTNumber ||
                dto.ProposerDetails.CINNo),
        idType:
          dto.CustomerType === "Individual"
            ? dto.ProposerDetails.PanNo && "PAN"
            : dto.CustomerType === "Corporate" &&
              ((dto.ProposerDetails.PanNo && "PAN") ||
                (dto.ProposerDetails.GSTNumber && "GSTIN") ||
                (dto.ProposerDetails.CINNo && "CIN")),
        // dob: formatDateKYC(dto.ProposerDetails.DOB),
        dob: dto.ProposerDetails.DOB,
        mobileNo: "",
        pincode: "",
        ckycNo: "",
        extraField1: "",
        extraField2: "",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      const Obj = lDto.ProposerDetails.CKYCParam === "Aadhaar Number" ? objAadhar : obj1;
      const res1 = await getCkycDetails(1037, Obj);
      lMasters.flags.Kyc = true;
      lDto.CkycStatus = res1.status;
      lDto.CkycDetails = res1;
      if (res1.status === "success") {
        lMasters.var = { ...lMasters.var, ...res1 };
        lDto.ProposerDetails.PermanentAddress.AddressLine1 = res1.result.address1;
        lDto.ProposerDetails.PermanentAddress.AddressLine2 = res1.result.address2;
        // lDto.ProposerDetails.PermanentAddress.AddressLine3 = res1.result.address3;
        // lDto.ProposerDetails.PermanentAddress.Landmark = res1.result.address3;
        lDto.ProposerDetails.PermanentAddress.Pincode = res1.result.pincode;
        lDto.GSTNumber = dto.ProposerDetails.GSTNumber;
        lDto.ProposerDetails["First Name"] = res1.result.firstName;
        lDto.ProposerDetails["Last Name"] = res1.result.lastName;
        if (res1.result.email === null || res1.result.email === "") {
          lDto.ProposerDetails["Email ID"] = dto.ProposerDetails["Email ID"];
        } else {
          lDto.ProposerDetails["Email ID"] = res1.result.email;
        }
        if (res1.result.dob === null || res1.result.dob === "") {
          lMasters.flags.dob = true;
          lDto.ProposerDetails.DOB = dto.ProposerDetails.DOB;
        } else {
          lMasters.flags.dob = true;
          lDto.ProposerDetails.DOB = res1.result.dob;
        }
        if (res1.result.pincode === "") {
          lMasters.flags.pincodeflag = true;
        } else {
          lMasters.flags.pincodeflag = false;
        }
        if (res1.result.mobileNumber === null) {
          lDto.ProposerDetails["Mobile Number"] = dto.ProposerDetails["Mobile Number"];
        } else {
          lDto.ProposerDetails["Mobile Number"] = res1.result.mobileNumber;
        }
        if (res1.result.pincode.length === 6) {
          const ProductId = 782;
          const obj = { Pincode: res1.result.pincode };
          lMasters.Pincodestatus = false;
          const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
          lMasters.permCD = city;
          const res = await getPincodeDetails(city[0].City_ID);
          lDto.ProposerDetails.PermanentAddress.CityDistrictValue = res.district[0].District_Name;
          lDto.ProposerDetails.PermanentAddress.StateValue = res.state[0].State_Name;
        } else {
          lMasters.permCD = [];
          lMasters.Pincodestatus = true;
          lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
          lDto.ProposerDetails.PermanentAddress.State = "";
        }

        // lDto.ProposerDetails.PermanentAddress.CityDistrict = res1.result.city;
        // lDto.ProposerDetails.PermanentAddress.District = res1.result.district;
        // lDto.ProposerDetails.PermanentAddress.State = res1.result.state;
        // lDto.ProposerDetails.PermanentAddress.Country = res1.result.country;
      }
      if (res1.status === "failure") {
        if (dto.proposalNumber === "") {
          calculateProposal(dto).then((result) => {
            lDto.proposalNumber = result.data.proposalNumber;
            lDto.ProposalNo = result.data.proposalNumber;
            // dto.ProposalNo = lproposer.proposalNumber;
          });
          lMasters.flags.failure = true;
          lMasters.var = { ...lMasters.var, ...res1 };
        } else {
          await postRequest(`Policy/UpdateProposalDetails`, dto);
        }
      }
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const updateckyc = async () => {
    const obj1 = {
      source: "AVO",
      uniqueTransactionNumber: masters.var.uniqueTransactionNumber,
      extraField1: "",
      extraField2: "",
      extraField3: "",
      extraField4: "",
      extraField5: "",
    };
    const res = await getCkycUpdateStatus(obj1);
    console.log("updateckyc", res);
    if (res.status === "success") {
      lMasters.flags.Kyc = true;
      lDto.ProposerDetails.PermanentAddress.AddressLine1 = res.result.address;
      // lDto.ProposerDetails.PermanentAddress.AddressLine2 = res.result.address2;
      // lDto.ProposerDetails.PermanentAddress.AddressLine3 = res1.result.address3;
      // lDto.ProposerDetails.PermanentAddress.Landmark = res1.result.address3;
      if (res.result.pincode === "" || res.result.pincode === null) {
        lDto.ProposerDetails.PermanentAddress.Pincode = "";
        lMasters.Pincodestatus = true;
      } else {
        lDto.ProposerDetails.PermanentAddress.Pincode = res.result.pincode;
        lMasters.Pincodestatus = false;
      }
      // const fullName = res.result.name;
      // const names = fullName.split(" ");
      // const firstName = names[0];
      // const lastName = names.slice(1).join(" ");

      // lDto.ProposerDetails["First Name"] = firstName;
      // lDto.ProposerDetails["Last Name"] = lastName;
      if (dto.CustomerType !== "Corporate") {
        const fullName = res.result.name;
        const names = fullName.split(" ");
        const firstName = names[0];
        const lastName = names.slice(1).join(" ");

        lDto.ProposerDetails["First Name"] = firstName;
        lDto.ProposerDetails["Last Name"] = lastName;
        lDto.ProposerDetails.AadharName = fullName;
      } else {
        lDto.ProposerDetails["First Name"] = res.result.name;
      }

      // lDto.ProposerDetails["First Name"] = res.result.name;

      // lDto.ProposerDetails["Last Name"] = res.result.lastName;
      if (res.result.email === null || res.result.email === "") {
        lDto.ProposerDetails["Email ID"] = dto.ProposerDetails["Email ID"];
      } else {
        lDto.ProposerDetails["Email ID"] = res.result.email;
      }
      if (res.result.uploadedDocument === "CIN") {
        lDto.ProposerDetails.CINNo = res?.result?.idNo;
      }
      if (res.result.uploadedDocument === "GSTIN") {
        lDto.ProposerDetails.GSTNumber = res.result.idNo;
      }
      if (res.result.dob === "" || res.result.dob === null) {
        lMasters.flags.dob = true;
        lDto.ProposerDetails.DOB = res.result.ckycDate;
      } else {
        lMasters.flags.dob = true;
        lDto.ProposerDetails.DOB =
          lDto.CustomerType === "Individual" ? res.result.dob : formatDateKYC(res.result.dob);
      }
      if (res.result.maskedAadhaarNumber !== "") {
        lDto.ProposerDetails.AadharID = res.result.maskedAadhaarNumber.substring(
          res.result.maskedAadhaarNumber.length - 4
        );
      }
      if (res.result.mobileNumber === null) {
        lDto.ProposerDetails["Mobile Number"] = dto.ProposerDetails["Mobile Number"];
        // lDto.ProposerDetails.AadharMobileNo = dto.ProposerDetails["Mobile Number"];
      } else {
        lDto.ProposerDetails["Mobile Number"] = res.result.mobileNumber;
        lDto.ProposerDetails.AadharMobileNo = dto.QuoteMobileNo;
      }
      if (res.result.pincode.length === 6) {
        const ProductId = 782;
        const obj = { Pincode: res.result.pincode };
        const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
        lMasters.permCD = city;
        const res2 = await getPincodeDetails(city[0].City_ID);
        lDto.ProposerDetails.PermanentAddress.CityDistrictValue = res2.district[0].District_Name;
        lDto.ProposerDetails.PermanentAddress.StateValue = res2.state[0].State_Name;
      } else {
        lMasters.permCD = [];
        lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
        lDto.ProposerDetails.PermanentAddress.State = "";
      }
      if (res.result.pan === "" || res.result.pan === null) {
        lDto.ProposerDetails.PanNo = dto.ProposerDetails.PanNo;
      } else {
        lDto.ProposerDetails.PanNo = res.result.pan;
      }
      if (res.result.pincode === "") {
        lMasters.flags.pincodeflag = true;
      } else {
        lMasters.flags.pincodeflag = false;
      }
      lDto.CkycStatus = res.status;
      lDto.CkycDetails = res;
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }

    await callUpdateQuoteMethod(lDto);
    await postRequest(`Policy/UpdateProposalDetails`, lDto);
  };
  const sendMail = async () => {
    const notificationReq = {
      notificationRequests: [
        {
          templateKey: "BGR_Ckyclink",
          sendEmail: false,
          isEmailBody: true,
          notificationPayload: JSON.stringify({
            CkycUrl: masters.var.result.manualKYCurl,
            ContactUsUrl: process.env.REACT_APP_CONTACTSUPPORT,
          }),
        },
      ],
      sendEmail: true,
      subject: "CKYC Registration Link",
      toEmail: dto.QuoteEmail,
    };
    const mail = await CkycRegMail(notificationReq);
    console.log("mail", mail);
    if (mail.status === 1) {
      swal({
        text: `Link shared to register for CKYC Successfully.`,
        icon: "success",
      });
    }
    const MobileNo = dto.QuoteMobileNo;
    const message = `Dear customer ,
    Greetings from Universal Sompo General Insurance!  Click here ${masters.var.result.manualKYCurl} to complete your KYC. Please ignore if you have completed the KYC.`;
    await SendSMS("usgi", MobileNo, message).then((smsresp) => {
      console.log("smsresp", smsresp);
    });
  };
  const handleFileUpload = async (event) => {
    if (dto?.documentDetails.some((x) => x.DocName === "")) {
      swal({
        icon: "error",
        text: "Please select the Document Name before uploading",
      });
    } else {
      console.log(event);
      const file = event.target.files[0];
      const ext = event.target.files[0].name.split(".").pop(1);
      const fsize = Math.round(event.target.files[0].size / 1024);
      if (ext === "png" || ext === "jpeg" || ext === "pdf") {
        if (fsize > 10240) {
          swal({
            icon: "error",
            text: "File Size should be less than 10 mb",
          });
        } else {
          const formData = new FormData();
          formData.append("file", file, file.name);
          // await DocumenUpload(formData, file.name).then((result) => {
          //   if (result.data.dMSDTOs[0].fileName !== null) {
          //     console.log("doc", result.data.dMSDTOs[0].fileName);
          //     lDto.documentDetails[Number(event.target.name)].fileName = file.name;
          //     lDto.documentDetails[Number(event.target.name)].UploadDocDate =
          //       new Date().toLocaleDateString();
          //     lDto.documentDetails[Number(event.target.name)].fileUploadStatus = true;
          //     lDto.documentDetails[Number(event.target.name)].DocId = result.data.dMSDTOs[0].docId;
          //     lMasters.flags.cancelIcon = true;
          //     setMasters({ ...lMasters });
          //     setDto({ ...lDto });
          //     swal({
          //       icon: "success",
          //       text: "Document uploaded successfully",
          //     });
          //   }
          // });
          await UploadFiles(formData).then((result) => {
            if (result.data[0].fileName !== null) {
              lDto.documentDetails[Number(event.target.name)].fileName = result.data[0].fileName;
              lDto.documentDetails[Number(event.target.name)].UploadDocDate =
                new Date().toLocaleDateString("en-GB");
              lDto.documentDetails[Number(event.target.name)].fileUploadStatus = true;
              lDto.documentDetails[Number(event.target.name)].DocId = result.data[0].docid;
              //  lMasters.proposerProps.cancelIcon = true;
              lMasters.flags.cancelIcon = true;
              setMasters({ ...lMasters });
              setDto({ ...lDto });
              swal({
                icon: "success",
                text: "Document uploaded successfully",
              });
            }
          });
        }
      } else {
        swal({
          icon: "error",
          text: "Please upload the file with valid extentions",
        });
      }
    }
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file1.target.value = "";
  };
  const handleDocName = async (e, value, i) => {
    if (value === null) {
      lDto.documentDetails[i].DocName = "";
    }
    // debugger;
    else if (dto?.documentDetails.some((x) => x.DocName === value.mValue)) {
      swal({
        icon: "error",
        // text: "Please upload another document",
        text: "Document already uploaded.Please choose a different document for upload",
      });
      lDto.documentDetails[i].DocName = "";
    } else {
      lDto.documentDetails[i].DocName = value.mValue;
    }
    setDto({ ...lDto });
  };
  const handleDocFileDelete = async (i) => {
    const arr1 = dto.documentDetails.filter((x, i1) => i1 !== i);
    // const fileName = dto.documentDetails.filter((x, i1) => i1 === i)[0].fileName.toString();
    lDto.documentDetails = arr1;
    // await DeleteDocument(fileName);
    setDto({ ...lDto });
  };
  const handleDeleteFile = async (i) => {
    // const arr1 = dto.documentDetails.filter((x, i1) => i1 !== i);
    const fileName = dto.documentDetails.filter((x, i1) => i1 === i)[0].fileName.toString();
    // lDto.documentDetails = arr1;
    await DeleteDocument(fileName).then((res) => {
      if (res.data.status === 5) {
        const filter = { ...dto.documentDetails[i] };
        filter.DocName = "";
        filter.DocId = "";
        filter.DocType = "";
        filter.DocTypeName = "";
        filter.UploadDocDate = "";
        filter.contentType = "";
        filter.fileName = "";
        lDto.documentDetails.splice(i, 1, { ...filter });

        setDto({ ...lDto });
      }
    });
  };
  const onAddDocument = () => {
    // lDto.documentDetails = [...dto.documentDetails, { ...docDetails() }];
    // setDto({ ...lDto });
    if (dto?.documentDetails.some((x) => x.fileName === "")) {
      swal({
        icon: "error",
        text: "Please upload the file before Adding",
      });
    } else if (lDto.documentDetails.length < 10) {
      lDto.documentDetails = [...lDto.documentDetails, { ...docDetails() }];
      setDto({ ...lDto });
    } else {
      console.log("Document details limit reached maximum limit");
    }
  };
  const spreedDocComponents = () => {
    const arr = [];

    dto.documentDetails.forEach((x, i) => {
      arr.push(
        {
          type: "AutoComplete",
          spacing: 3,
          label: " Select Document ",
          path: `documentDetails.${i}.DocName`,
          visible: masters.tabIndex === 0,
          options: masters?.doc,
          customOnChange: (e, value) => handleDocName(e, value, i),
        },

        {
          type: "Input",
          spacing: 3,
          label: "",
          path: `documentDetails.${i}.DocTypeName`,
          visible: masters.tabIndex === 0,
        },

        {
          type: "Custom",
          spacing: 2.5,
          visible: masters.tabIndex === 0,
          return: (
            <MDButton variant="outlined" component="label">
              CHOOSE AND UPLOAD{" "}
              <input
                id="fileInput"
                hidden
                name={i}
                accept="image/bmp, image/jpeg, image/png, .pdf"
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />
            </MDButton>
          ),
        },
        {
          type: "Custom",
          visible: masters.tabIndex === 0,
          spacing: 0.7,
          return: <DeleteIcon color="primary" onClick={() => handleDeleteFile(i)} />,
        },
        {
          type: "Button",
          label: "ADD",
          // startIcon: <AddIcon />,
          visible: masters.tabIndex === 0,
          variant: "outlined",
          onClick: onAddDocument,
          spacing: 1.8,
        },
        {
          type: "Custom",
          // visible: masters.tabIndex === 0 && x.fileName !== "" && i !== 0,
          visible: masters.tabIndex === 0 && i !== 0,
          spacing: 1,
          return: <CancelIcon color="primary" onClick={() => handleDocFileDelete(i)} />,
        },
        {
          type: "Custom",
          spacing: 6.2,
          // visible: true,
          visible: masters.tabIndex === 0,
        },
        {
          type: "TypographyVal",
          spacing: 4,
          sx: { fontSize: "10px" },
          path: `documentDetails.${i}.fileName`,
          visible: masters.tabIndex === 0,
        },
        {
          type: "Custom",
          spacing: 1.8,
          visible: masters.tabIndex === 0,
          // visible: true,
        }
      );
    });
    return arr;
  };

  const onAddRiskLoc = () => {
    // debugger;
    lDto.InsurableItem[0].RiskLocationAddress = [
      ...dto.InsurableItem[0].RiskLocationAddress,
      { ...riskLoc() },
    ];
    // lMasters.flags.editval = false;
    lMasters.Quotes[0].editval = false;
    lMasters.Quotes[1].editval = false;
    lMasters.Quotes[2].editval = false;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const onRemoveRiskLoc = (i) => {
    const i2 = i - 1;
    const arr1 = lDto.InsurableItem[0].RiskLocationAddress.filter((x, i1) => i1 !== i2);
    lDto.InsurableItem[0].RiskLocationAddress = arr1;
    // lMasters.flags.editval = false;
    lMasters.Quotes[0].editval = false;
    lMasters.Quotes[1].editval = false;
    lMasters.Quotes[2].editval = false;
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const spreedRiskLoc = () => {
    const arr = [];
    dto.InsurableItem[0].RiskLocationAddress.forEach((x, i) => {
      arr.push(
        {
          type: "Typography",
          label: `Risk Location ${i + 1}`,
          visible: dto.LocationType === "Specific",
          variant: "h6",
          spacing: 12,
        },
        {
          type: "Input",
          label: "Address1",
          visible: dto.LocationType === "Specific",
          required: true,

          spacing: 3,
          path: `InsurableItem.0.RiskLocationAddress.${i}.AddressLine1`,
        },
        {
          type: "Input",
          label: "Address2",
          visible: dto.LocationType === "Specific",
          // required: true,
          spacing: 3,
          path: `InsurableItem.0.RiskLocationAddress.${i}.AddressLine2`,
        },

        {
          type: "Input",
          label: "Pincode",
          visible: dto.LocationType === "Specific",
          spacing: 3,
          required: true,
          path: `InsurableItem.0.RiskLocationAddress.${i}.Pincode`,
          InputProps: { maxLength: 6 },
          customOnBlur: (e) => handlePincode(e, "Risk", i),
        },
        {
          type: "AutoComplete",
          label: "City",
          visible: dto.LocationType === "Specific",
          spacing: 3,
          required: true,
          path: `InsurableItem.0.RiskLocationAddress.${i}.CityDistrictValue`,
          // value: masters.CityDistrict.risk,
          options: masters?.riskCD,
          customOnChange: (e, v) => handleCity(e, v, "Risk", i),
        },
        {
          type: "Input",
          label: "State",
          spacing: 3,
          visible: dto.LocationType === "Specific",
          disabled: true,
          // value: masters.State.risk,
          path: `InsurableItem.0.RiskLocationAddress.${i}.StateValue`,
          onChangeFuncs: ["IsAlpha"],
        },
        {
          type: "Input",
          label: "Country",
          spacing: 3,
          visible: dto.LocationType === "Specific",
          disabled: true,
          path: `InsurableItem.0.RiskLocationAddress.${i}.Country`,
          onChangeFuncs: ["IsAlpha"],
        },
        {
          type: "Typography",
          label: ``,
          visible: true,
          spacing: 8,
        }
      );
    });
    console.log("123", arr.length);
    return arr;
  };

  const onSameAddress = (e) => {
    lDto.ProposerDetails.SameasCommunicationAddress = e.target.value;
    if (e.target.value === "Yes") {
      lDto.ProposerDetails.CommunicationAddress.AddressLine1 =
        lDto.ProposerDetails.PermanentAddress.AddressLine1;
      lDto.ProposerDetails.CommunicationAddress.AddressLine2 =
        lDto.ProposerDetails.PermanentAddress.AddressLine2;
      lDto.ProposerDetails.CommunicationAddress.Pincode =
        lDto.ProposerDetails.PermanentAddress.Pincode;
      lDto.ProposerDetails.CommunicationAddress.CityDistrict =
        lDto.ProposerDetails.PermanentAddress.CityDistrict;
      lDto.ProposerDetails.CommunicationAddress.CityDistrictValue =
        lDto.ProposerDetails.PermanentAddress.CityDistrictValue;
      lDto.ProposerDetails.CommunicationAddress.StateValue =
        lDto.ProposerDetails.PermanentAddress.StateValue;
      lDto.ProposerDetails.CommunicationAddress.State = lDto.ProposerDetails.PermanentAddress.State;
      lDto.ProposerDetails.CommunicationAddress.Country =
        lDto.ProposerDetails.PermanentAddress.Country;
      lMasters.CityDistrict.comm = lMasters.CityDistrict.perm;
      lMasters.State.comm = lMasters.State.perm;
    } else {
      lDto.ProposerDetails.CommunicationAddress.AddressLine1 = "";
      lDto.ProposerDetails.CommunicationAddress.AddressLine2 = "";
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      lDto.ProposerDetails.CommunicationAddress.State = "";
      lDto.ProposerDetails.CommunicationAddress.CityDistrictValue = "";
      lDto.ProposerDetails.CommunicationAddress.StateValue = "";
      lMasters.CityDistrict.comm = "";
      lMasters.State.comm = "";
      // lDto.ProposerDetails.CommunicationAddress.Country = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  // const handleCheque = async () => {};

  const onTab = (e, a) => {
    lMasters.tabIndex = a;
    setMasters({ ...lMasters });
  };
  const onShareQuote = async () => {
    // if (masters.flags.editval === false) {
    if (masters.Quotes[masters.flags.activeTab].editval === false) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else if (dto.QuoteEmail) {
      await callUpdateQuoteMethod(dto).then(async () => {
        await shareQuote(dto["Quotation No"], dto.QuoteEmail);
      });
    } else {
      swal({ icon: "error", text: "Please Enter Email Id" });
    }
  };
  const onDownloadQuote = async () => {
    // if (masters.flags.editval === false) {
    if (masters.Quotes[masters.flags.activeTab].editval === false) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else {
      await callUpdateQuoteMethod(dto).then(async (res) => {
        console.log("Quoteqoute", res);
        const downloadDTO = {
          key: dto["Quotation No"],
          templateId: 194,
          referenceId: "",
        };
        await downloadQuote(downloadDTO);
      });
    }
  };

  const onDownloadClick = async (p) => {
    try {
      const result = await getRequest(`DMS/GetDocumentById?id=${p}`);

      const data2 = result.data;
      const fileNames = data2.fileName;
      if (data2.data !== "") {
        generateFile(data2.data, fileNames);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetValueParms = (e, value) => {
    lDto.ProposerDetails.CKYCParam = value.mValue;
    setDto({ ...lDto });
    if (value.mValue !== "PAN Number") {
      lDto.ProposerDetails.AadharID = "";
      lDto.ProposerDetails.AadharMobileNo = "";
      lDto.ProposerDetails.AadharGender = "";
      lDto.ProposerDetails.AadharName = "";
      lDto.ProposerDetails.DOB = "";
    } else {
      lDto.ProposerDetails.DOB = "";
      lDto.ProposerDetails.PanNo = "";
    }
    setDto({ ...lDto });
  };

  const handleProposerMasters = (e, v, name) => {
    if (name === "Salutation") {
      lMasters.proposerSal = v.mValue;
      lDto.ProposerDetails.Salutation = v.mValue;
      if (v.mValue === "Mr.") {
        lMasters.proposerGender = "Male";
        lDto.ProposerDetails.Gender = "Male";
      } else if (v.mValue === "Ms." || v.mValue === "Mrs.") {
        lMasters.proposerGender = "Female";
        lDto.ProposerDetails.Gender = "Female";
      } else {
        lMasters.proposerGender = "";
        lDto.ProposerDetails.Gender = "";
      }
    } else if (name === "Gender") {
      lMasters.proposerGender = v.mValue;
      lDto.ProposerDetails.Gender = v.mValue;
    }

    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const onCheck = (e) => {
    lDto.ProposalConsent.ProposalConsentCheck = e.target.checked;
    if (e.target.checked) {
      proposalConsentMail(dto.QuoteEmail, dto["Quotation No"]);
      const MobileNo = dto.QuoteMobileNo;
      const Message = `Dear customer,Quotation No. ${dto["Quotation No"]} is generated. Requesting to Pls provide your consent to proceed with the proposal.Best Regards,Universal Sompo General Insurance Co Ltd.`;
      SendSMS("usgi", MobileNo, Message).then((smsResp) => {
        console.log("1234567890", smsResp);
      });
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  function Timer({ counter }) {
    return (
      <Grid
        container
        direction="column"
        justifyContent="left"
        alignItems="left"
        color="#4caf50"
        fontSize="15px"
      >
        {" "}
        {masters.flags.status && <>OTP Sent Successfully</>}
        <br />
        Click On Resend OTP in 00:{counter}
      </Grid>
    );
  }

  const handleSendOTP = () => {
    if (dto.QuoteEmail === "") {
      swal({
        icon: "error",
        text: "Please enter email ID",
      });
    } else {
      lMasters.startCounterFlag = true;

      const sendOtp = {
        name: "",
        otp: "1234",
        email: dto.QuoteEmail,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: dto.QuoteMobileNo,
        sendSms: true,
        isBerry: false,
        client: process.env.REACT_APP_Client,
      };

      getOTP(sendOtp).then((res) => {
        if (res.status === 1) {
          lMasters.flags.status = true;
        } else {
          lMasters.flags.status = false;
        }
      });
      setMasters({ ...lMasters });
    }
  };
  const [dispatch] = useDataController();
  const handleVerifyOTP = () => {
    if (dto.ProposalConsent.OTP === "") {
      swal({ icon: "error", text: "Please enter OTP" });
    } else {
      const verifyOTP = {
        otp: dto.ProposalConsent.OTP,
        email: dto.QuoteEmail,
        mobileNumber: dto.QuoteMobileNo,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      GetOTP(dispatch, verifyOTP).then((res) => {
        console.log("res", res);
        if (res !== null) {
          if (res.status === 1) {
            lMasters.flags.otpflag = true;
            lMasters.startCounterFlag = false;
            setMasters({ ...lMasters });
            swal({ icon: "success", text: "OTP verified successfully" });
            // lMasters.startCounterFlag = false;
            // lMasters.flags.otpflag = true;
            swal({ icon: "success", text: "OTP verified successfully" });
            // lMasters.startCounterFlag = false;
            // lMasters.flags.otpflag = true;
          } else {
            lMasters.flags.otpflag = false;
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          lMasters.flags.otpflag = false;
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
      setMasters({ ...lMasters });
    }
  };

  useEffect(() => {
    let timer;
    if (lMasters.counter > 0 && lMasters.startCounterFlag) {
      timer = setTimeout(() => {
        lMasters.counter -= 1;
        lMasters.flags.sendOtpFlag = false;
        setMasters({ ...lMasters });
      }, 1000);
    }
    if (lMasters.counter === 0) {
      lMasters.counter = 30;
      lMasters.startCounterFlag = false;
      lMasters.flags.timerFlag = true;
      lMasters.flags.status = false;
      setMasters({ ...lMasters });
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [lMasters.counter, lMasters.startCounterFlag]);

  const saveAndExit = async () => {
    if (
      // masters.flags.editval === false ||
      masters.Quotes[masters.flags.activeTab].editval === false ||
      masters.Quotes[masters.flags.activeTab].FinalPremium === 0 ||
      dto.PremiumDetails["Total with Tax"] === "0"
    ) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else if (dto.IsPrev3YrsClaim === "Yes") {
      swal({ icon: "error", text: "Refer to Underwriter" });
    } else if (dto.QuoteEmail) {
      await callUpdateQuoteMethod(dto).then(async () => {
        const downloadDTO = {
          key: dto["Quotation No"],
          templateId: 194,
          referenceId: "",
        };
        await shareQuote(dto["Quotation No"], dto.QuoteEmail);
        await downloadQuote(downloadDTO);
      });
      window.open(process.env.REACT_APP_HOMEURL, "_self");
    } else {
      swal({ icon: "error", text: "Please Enter Email Id" });
    }
  };
  // useEffect(() => {}, [lMasters.counter, lMasters.startCounterFlag]);

  let data = [];

  switch (activeStep) {
    case 0:
      data = [
        [
          // customer dtls
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "Customer Type", labelVisible: true },
            radioList: [
              // { value: "Individual", label: "Individual" },
              // { value: "Corporate", label: "Corporate" },
              { value: "Individual", label: "Individual", disabled: dto.CkycStatus === "success" },
              { value: "Corporate", label: "Corporate", disabled: dto.CkycStatus === "success" },
            ],
            path: "CustomerType",
            spacing: 12,
            customOnChange: (e, v) => handleCustType(e, v),
          },
          {
            type: "Input",
            label: "First Name",
            visible: dto.CustomerType === "Individual",
            required: dto.CustomerType === "Individual",
            path: `ProposerDetails.First Name`,
            onChangeFuncs: ["IsAlphaSpace"],
            spacing: 3,
            disabled: dto.CkycStatus === "success",
          },

          {
            type: "Input",
            label: "Last Name",
            visible: dto.CustomerType === "Individual",
            required: dto.CustomerType === "Individual",
            path: `ProposerDetails.Last Name`,
            onChangeFuncs: ["IsAlphaSpace"],
            spacing: 3,
            disabled: dto.CkycStatus === "success",
          },
          {
            type: "Input",
            label: "Corporate Name",
            visible: dto.CustomerType === "Corporate",
            required: dto.CustomerType === "Corporate",
            disabled: dto.CkycStatus === "success",
            path: `ProposerDetails.First Name`,
            onChangeFuncs: ["IsAlphaSpace"],
            spacing: 3,
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            // visible: !masters.QuoteSearch,
            allowInput: true,
            path: "PolicyStartDate",
            dateFormat: "Y-m-d",
            minDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            maxDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
              new Date().getDate() + 30
            }`,
            // minDate: new Date(),
            // maxDate: max,
            customOnChange: (e, v) => handlePolDate(e, v),
            spacing: 3,
            validationId: 1,
          },

          // {
          //   type: "MDDatePicker",
          //   label: "Policy Start Date",
          //   visible: masters.QuoteSearch,
          //   dateFormat: "Y-m-d",
          //   disabled: true,
          //   // input: { InputProps: { readOnly: true } },
          //   path: "PolicyStartDate",
          //   spacing: 3,
          // },
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 3,
          //   return: (
          //     <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
          //       <Grid item xs={1} sx={1} md={4} mt="0.9rem">
          //         <MDTypography fontSize="0.95rem">Up till end of </MDTypography>
          //       </Grid>
          //       <Grid item xs={1} sx={1} md={4}>
          //         <Autocomplete
          //           disableClearable
          //           options={months}
          //           value={{ mValue: masters.months }}
          //           getOptionLabel={(option) => option.mValue}
          //           onChange={(e, v) => onMonth(e, v)}
          //           renderInput={(params) => (
          //             <MDInput
          //               {...params}
          //               required
          //               variant="standard"
          //               sx={{ input: { textAlign: "center" } }}
          //             />
          //           )}
          //         />
          //       </Grid>
          //       <Grid item xs={1} sx={1} md={4}>
          //         <MDTypography fontSize="0.95rem" sx={{ marginTop: "0.9rem" }}>
          //           Months
          //         </MDTypography>
          //       </Grid>
          //     </Stack>
          //   ),
          // },
          {
            type: "AutoComplete",
            label: "Policy Tenure in Months",
            visible: true,
            required: true,
            spacing: 3,
            path: `PolicyTenure`,
            options: months,
            customOnChange: (e, v) => onMonth(e, v),
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            disabled: true,
            dateFormat: "Y-m-d",
            path: "PolicyEndDate",
            InputProps: { disabled: true },
          },

          {
            type: "Input",
            label: "Email",
            visible: true,
            required: true,
            path: `QuoteEmail`,
            onBlurFuncs: ["IsEmail"],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            required: true,
            path: `QuoteMobileNo`,
            onChangeFuncs: ["IsNumeric"],
            InputProps: { maxLength: 10 },
            onBlurFuncs: ["IsMobileNumber"],
          },
          {
            type: "Input",
            label: "Business Activity",
            visible: true,
            path: `BusinessActivity`,
          },
        ],

        [
          // risk dtls
          {
            type: "Button",
            label: "+Add Risk",
            visible: true,
            spacing: 13,
            variant: "contained",
            onClick: handelopen,
          },
          // model
          {
            type: "Custom",
            visible: true,
            spacing: 8,
            return: (
              <Modal open={lMasters.flags.addFlg}>
                <MDBox sx={modelStyle1}>
                  <CloseIcon
                    sx={{
                      position: "fixed",
                      top: "40px",
                      right: "40px",
                      cursor: "pointer !important",
                      transition: "transform 0.5s ease-in-out !important",
                    }}
                    onClick={handelClose}
                  />

                  <MDTypography variant="h6" color="primary">
                    {masters.flags.editFlg ? "Edit Risk" : "Add New Risk"}
                  </MDTypography>

                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px!important",
                          },
                        }}
                        disableClearable
                        options={masters?.Occupancy || []}
                        getOptionLabel={(option) => option.mValue}
                        value={{
                          mValue: lMasters.newRisk.Occupancy,
                        }}
                        onChange={(e, v) => handleOccupancy(e, v)}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            label="Occupancy"
                            placeholder="Select Occupancy"
                            required
                            error={masters.newRisk.Occupancy === "" && masters.errRisk}
                            helperText={
                              masters.newRisk.Occupancy === "" && masters.errRisk && errText
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px!important",
                          },
                        }}
                        disableClearable
                        options={masters?.TypeOfWorker || []}
                        getOptionLabel={(option) => option.mValue}
                        value={{ mValue: masters.newRisk.TypeOfWorker }}
                        onChange={(e, v) => handleTypeofwork(e, v)}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            label="Type of Worker"
                            placeholder="Select"
                            required
                            error={masters.newRisk.TypeOfWorker === "" && masters.errRisk}
                            helperText={
                              masters.newRisk.TypeOfWorker === "" && masters.errRisk && errText
                            }
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Nature of Work"
                        required
                        name="NatureOfWork"
                        value={lMasters.newRisk.NatureOfWork}
                        onChange={handleChange}
                        placeholder="Enter "
                        error={masters.newRisk.NatureOfWork === "" && masters.errRisk}
                        helperText={
                          masters.newRisk.NatureOfWork === "" && masters.errRisk && errText
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Risk Category"
                        name="RiskCategory"
                        value={lMasters.newRisk.RiskCategory}
                        onChange={handleChange}
                        placeholder="Enter"
                        disabled
                        // InputProps={{ readOnly: true }}
                        error={masters.flags.gradeErr}
                        helperText={
                          masters.flags.gradeErr &&
                          "This will be subject to underwriter Approval. Kindly refer the proposal to Underwriter"
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="No of Employees"
                        required
                        name="NoOfEmployees"
                        // type="number"
                        value={lMasters.newRisk.NoOfEmployees}
                        onChange={handleChange}
                        // onBlur={IsNumeric}
                        placeholder="Enter No"
                        error={masters.newRisk.NoOfEmployees === "" && masters.errRisk}
                        helperText={
                          masters.newRisk.NoOfEmployees === "" && masters.errRisk && errText
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Monthly Wages per Worker "
                        required
                        name="MonthlyWagesPerWorker"
                        value={lMasters.newRisk.MonthlyWagesPerWorker}
                        // InputProps={{ maxLength: 10 }}
                        onChange={handleChange}
                        onBlur={handleMonthly}
                        placeholder="Enter Amount"
                        x
                        inputProps={{ maxLength: 10 }}
                        error={masters.newRisk.MonthlyWagesPerWorker === "" && masters.errRisk}
                        helperText={
                          masters.newRisk.MonthlyWagesPerWorker === "" && masters.errRisk && errText
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Wages upto ₹ 15000"
                        name="WagesUpto15000"
                        value={lMasters.newRisk.WagesUpto15000}
                        disabled
                        placeholder="Enter value"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Wages above ₹15000"
                        name="WagesAbove15000"
                        value={lMasters.newRisk.WagesAbove15000}
                        disabled
                        placeholder="Enter value"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Classification No"
                        name="ClassificationNo"
                        value={lMasters.newRisk.ClassificationNo}
                        onChange={handleChange}
                        placeholder="Classification No"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label="Endoresment No"
                        name="EndoresmentNo"
                        value={lMasters.newRisk.EndoresmentNo}
                        onChange={handleChange}
                        disabled
                      />
                    </Grid>
                  </Grid>

                  <Grid container justifyContent="right" mt={6}>
                    <MDButton onClick={masters.flags.editFlg ? handleEdit : handleAdd}>
                      {masters.flags.editFlg ? "Update" : "Submit"}
                    </MDButton>
                  </Grid>
                </MDBox>
              </Modal>
            ),
          },
          // add table

          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "SNo",
            path: "InsurableItem.0.RiskItems",
            rowPerPage: 20,
            columns: [
              {
                field: "SNo",
                headerName: "S. No",
                width: 80,
                align: "center",
              },
              {
                field: "Occupancy",
                headerName: "Occupancy",
                width: 200,
                align: "center",
              },
              {
                field: "TypeOfWorker",
                headerName: "Type of Worker",
                width: 150,
                align: "center",
              },
              {
                field: "NatureOfWork",
                headerName: "Nature of Work",
                width: 150,
                align: "center",
              },
              {
                field: "RiskCategory",
                headerName: "Risk Category",
                width: 150,
                align: "center",
              },
              {
                field: "NoOfEmployees",
                headerName: "No of Employees",
                width: 150,
                align: "center",
              },
              {
                field: "MonthlyWagesPerWorker",
                headerName: "Monthly Wages Per Worker",
                width: 250,
                align: "center",
              },
              {
                field: "WagesUpto15000",
                headerName: "Wages Upto  ₹ 15,000",
                width: 200,
                align: "center",
              },
              {
                field: "WagesAbove15000",
                headerName: "Wages Above ₹ 15,000",
                width: 200,
                align: "center",
              },
              {
                field: "ClassificationNo",
                headerName: "Classification No",
                width: 160,
                align: "center",
              },
              {
                field: "EndoresmentNo",
                headerName: "Endoresment No",
                width: 200,
                align: "center",
              },
              {
                field: "Action",
                headerName: "Action",
                width: 80,
                renderCell: (params) => {
                  console.log("params", params);

                  const onDelete = () => {
                    lMasters.flags.deleteFlg = true;
                    lMasters.flags.rowId = params.row.SNo;
                    setMasters({ ...lMasters });
                  };
                  const onEdit = () => {
                    lMasters.flags.addFlg = true;
                    lMasters.flags.editFlg = true;
                    lMasters.flags.rowId = params.row.SNo;
                    lMasters.newRisk.Occupancy = params.row.Occupancy;
                    lMasters.newRisk.TypeOfWorker = params.row.TypeOfWorker;
                    lMasters.newRisk.NatureOfWork = params.row.NatureOfWork;
                    lMasters.newRisk.RiskCategory = params.row.RiskCategory;
                    lMasters.newRisk.NoOfEmployees = params.row.NoOfEmployees;
                    lMasters.newRisk.MonthlyWagesPerWorker = params.row.MonthlyWagesPerWorker;
                    lMasters.newRisk.WagesUpto15000 = params.row.WagesUpto15000;
                    lMasters.newRisk.WagesAbove15000 = params.row.WagesAbove15000;
                    lMasters.newRisk.ClassificationNo = params.row.ClassificationNo;
                    lMasters.newRisk.EndoresmentNo = params.row.EndoresmentNo;

                    setMasters({ ...lMasters });
                    setSelectedPopoverIndex(-1);
                  };
                  return (
                    // <MDBox sx={{ width: 450 }}>
                    //   <EditIcon onClick={onEdit} />
                    //   <DeleteIcon onClick={() => onDelete()} />
                    // </MDBox>
                    <>
                      {/* // <MDBox sx={{ width: 450 }} onClick={handleClick}> */}
                      {/* <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={openMenu ? "long-menu" : undefined}
                      aria-expanded={openMenu ? "true" : undefined}
                      aria-haspopup="true"
                    > */}
                      <MoreVertIcon onClick={(e) => handleClick(e, params.row.SNo)} />
                      {/* </IconButton> */}
                      <Menu
                        // id="long-menu"
                        // MenuListProps={{
                        //   "aria-labelledby": "long-button",
                        // }}
                        anchorEl={lMasters.flags.anchorEl}
                        open={selectedPopoverIndex === params.row.SNo}
                        onClose={handleCloseActionButton}
                        // PaperProps={{
                        //   style: {
                        //     maxHeight: 48 * 4.5,
                        //     width: "20ch",
                        //   },
                        // }}
                      >
                        <MenuItem onClick={() => onEdit()}>Edit</MenuItem>
                        <MenuItem onClick={() => onDelete()}>Delete</MenuItem>
                      </Menu>

                      {/* <EditIcon onClick={onEdit} />
                    <DeleteIcon onClick={() => onDelete()} /> */}
                      {/* // </MDBox> */}
                    </>
                  );
                },
              },
            ],
          },
          {
            type: "Typography",
            label: `Total No Of Employees : ${masters.totalNoEmp}`,
            visible: true,
            // sx: { textAlign: "center" },
            variant: "h6",
            spacing: 6,
          },
          {
            type: "Typography",
            label: `Total Wages : ${dto.SumInsured}`,
            visible: true,
            // sx: { textAlign: "center" },
            variant: "h6",
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 6,
          },
          {
            type: "Typography",
            label: "Total wages should not exceed more than RS. 5 Crores",
            visible: masters.flags.totalSI === true,
            sx: {
              color: "red",
              fontSize: "13px",
            },
            spacing: 6,
          },

          {
            type: "RadioGroup",
            visible: true,
            required: true,
            path: `IsPrev3YrsClaim`,
            radioLabel: {
              label: "Is there any claim in past 3 years for any of the risk?",
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
            label:
              "Note : If there are claims please refer the proposal to Underwriter for approval",
            visible: dto.IsPrev3YrsClaim === "Yes",
            sx: {
              color: "red",
              fontSize: "14px",
            },
            spacing: 12,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 8,
            return: (
              <Modal open={lMasters.flags.deleteFlg}>
                <MDBox sx={modelStyle2}>
                  <CloseIcon onClick={handelClose1} sx={{ ml: "35rem" }} />
                  <MDTypography sx={{ ml: "7rem" }} variant="h5">
                    Are you sure you want to delete the Risk
                  </MDTypography>
                  <Grid
                    container
                    justifyContent="center"
                    sx={{ ml: "0.5rem", mb: "3rem", mt: "2rem" }}
                  >
                    <MDButton onClick={handleDelete}>Yes</MDButton>
                    <MDButton
                      onClick={handelClose1}
                      variant="Outlined"
                      sx={{ ml: "2rem", border: "2px solid #000" }}
                    >
                      No
                    </MDButton>
                  </Grid>
                </MDBox>
              </Modal>
            ),
          },
        ],

        [
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "", labelVisible: false },
            radioList: [
              { value: "Specific", label: "Specific Location" },
              // { value: "Generic", label: "Generic Location" },
              // { value: "Generic", label: "Generic Location", disabled: true },
            ],
            path: "LocationType",
            spacing: 12,
            // customOnChange: (e, v) => handleRiskType(e, v),
          },
          {
            type: "Input",
            label: "Anywhere In",
            required: true,
            visible: dto.LocationType === "Generic",
            path: `InsurableItem.0.AnywhereInIndia`,
          },
          {
            type: "Typography",
            label: "Note : Territory restricted to India Only",
            visible: dto.LocationType === "Generic",
            sx: {
              color: "red",
              fontSize: "14px",
            },
            spacing: 12,
          },

          ...spreedRiskLoc(),
          {
            type: "Typography",
            visible: true,
            spacing:
              dto.InsurableItem[0]?.RiskLocationAddress?.length > 1 &&
              dto.LocationType === "Specific"
                ? 8
                : 10,
            label: "",
          },
          {
            type: "Button",
            label: "Remove Location",
            visible:
              dto.InsurableItem[0]?.RiskLocationAddress?.length > 1 &&
              dto.LocationType === "Specific",
            variant: "outlined",
            onClick: () => onRemoveRiskLoc(dto.InsurableItem[0]?.RiskLocationAddress?.length),
            spacing: 2,
          },
          {
            type: "Button",
            label: "Add Location",
            startIcon: <AddIcon />,
            // visible: dto.LocationType === "Specific",
            visible: false,
            // variant: "outlined",
            onClick: () => onAddRiskLoc(),
            spacing: 2,
            disabled: true,
          },
        ],

        [
          {
            type: "Checkbox",
            visible: true,
            label: "Medical Expenses",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.0.IsOptional`,
            customOnChange: (e) => handleCovers(e, "MedicalExpenses", 0),
          },
          {
            type: "AutoComplete",
            label: "Select sum insured limit",
            visible: dto.InsurableItem[0].Covers[0].IsOptional === "Yes",
            spacing: 3,
            required: true,
            path: `InsurableItem.0.Covers.0.LimitValue`,
            options: medicalSumInsured,
            customOnChange: (e, v) => handleMedSum(e, v, 0),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Terrorism",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 4,
            path: `InsurableItem.0.Covers.1.IsOptional`,
            customOnChange: (e) => handleCovers(e, "Terrorism", 1),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 8,
            label: "",
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Occupational Disease",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 3,
            path: `InsurableItem.0.Covers.2.IsOptional`,
            customOnChange: (e) => handleCovers(e, "OccupationalDisease", 2),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 9,
            label: "",
          },

          {
            type: "Checkbox",
            visible: true,
            label: "Contract Worker Extension",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 4,
            path: `InsurableItem.0.Covers.3.IsOptional`,
            customOnChange: (e) => handleCovers(e, "ContractWorkersExtension", 3),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 8,
            label: "",
          },
          {
            type: "Typography",
            label: "Note : A user can enter only loading or discount",
            visible: true,
            sx: {
              color: "red",
              fontSize: "14px",
            },
            spacing: 12,
          },
          {
            type: "Input",
            label: "Loading in %",
            visible: true,
            // required: true,
            path: `Loading`,
            spacing: 3,
            // onChangeFuncs: ["IsNumeric"],
            onChangeFuncs: [LoadingVal],
            disabled: dto.Discount,
            // customOnChange: (e) => handleLdDst(e, "Loading"),
          },
          {
            type: "Input",
            label: "Discount in %",
            visible: true,
            // required: true,
            path: `Discount`,
            spacing: 3,
            onChangeFuncs: [DiscountVal],
            // customOnChange: (e) => handleLdDst(e, "Discount"),
            disabled: dto.Loading,
            // customOnChange: (e) => {
            //   handleDiscount(e);
            // },
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          // {
          //   type: "Button",
          //   spacing: 3,
          //   visible: masters.flags.CalPreBtn === false,
          //   label: "Calculate Premium",
          //   // sx: {
          //   //   marginLeft: 13,
          //   // },

          //   variant: "outlined",
          //   onClick: onPremiumCal1,
          // },
        ],
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Grid
                    item
                    md={12}
                    style={{ position: "sticky", top: "0", backgroundColor: "#fff", zIndex: "1" }}
                  >
                    <Tabs
                      value={masters.flags.activeTab}
                      onChange={handleTabChange}
                      aria-label="basic tabs example"
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: "#c70825",
                        },
                      }}
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
                      {!masters.flags.showButton && (
                        <MDButton
                          variant="contained"
                          // startIcon={<AddIcon />}
                          onClick={handleClickTab}
                          sx={{ ml: "0.5rem" }}
                        >
                          +
                        </MDButton>
                      )}
                    </Tabs>
                  </Grid>
                  <TabPanel value={masters.flags.activeTab} index={0}>
                    {/* {quote(0)} */}
                    <Quotes
                      dto={dto}
                      setDto={setDto}
                      masters={masters}
                      setMasters={setMasters}
                      ind={0}
                      medicalSumInsured={medicalSumInsured}
                    />
                  </TabPanel>
                  <TabPanel value={masters.flags.activeTab} index={1}>
                    <Quotes
                      dto={dto}
                      setDto={setDto}
                      masters={masters}
                      setMasters={setMasters}
                      ind={1}
                      medicalSumInsured={medicalSumInsured}
                    />
                  </TabPanel>
                  <TabPanel value={masters.flags.activeTab} index={2}>
                    <Quotes
                      dto={dto}
                      setDto={setDto}
                      masters={masters}
                      setMasters={setMasters}
                      ind={2}
                      medicalSumInsured={medicalSumInsured}
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
                            Summary
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
                            Quote 1
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
                              Quote 2
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
                              Quote 3
                            </TableCell>
                          )}
                        </TableRow>
                        <TableBody>
                          {data1.map((item, i) => (
                            <TableRow>
                              <TableCell
                                style={{
                                  borderBottom: "none",
                                  fontWeight: i === 7 ? "bold" : "normal",
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
                                sx={
                                  masters.flags.selectedColumn === 0
                                    ? { backgroundColor: "#c70825", color: "white !important" }
                                    : {}
                                }
                              >
                                {/* ₹&nbsp;24,483 */}
                                {masters.Quotes[0][item.name]}
                              </TableCell>
                              {masters.flags.showColumnQ && (
                                <TableCell
                                  style={{
                                    borderBottom: "none",
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                  sx={
                                    masters.flags.selectedColumn === 1
                                      ? { backgroundColor: "#c70825", color: "white !important" }
                                      : {}
                                  }
                                >
                                  {/* ₹&nbsp;0 */}
                                  {masters.Quotes[1][item.name]}
                                </TableCell>
                              )}
                              {masters.flags.showColumnQo && (
                                <TableCell
                                  style={{
                                    borderBottom: "none",
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                  sx={
                                    masters.flags.selectedColumn === 2
                                      ? { backgroundColor: "#c70825", color: "white !important" }
                                      : {}
                                  }
                                >
                                  {masters.Quotes[2][item.name]}
                                </TableCell>
                              )}
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
                <Grid container justifyContent="space-between" my={2}>
                  {/* <Stack justifyContent="space-between" direction="row"> */}
                  <MDButton variant="outlined" onClick={saveAndExit}>
                    Save & Exit
                  </MDButton>
                  <MDButton variant="outlined" onClick={handleCalculatePremium}>
                    Calculate Premium
                  </MDButton>
                  {/* </Stack> */}
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
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "Customer Type", labelVisible: true },
            radioList: [
              { value: "Individual", label: "Individual", disabled: true },
              { value: "Corporate", label: "Corporate", disabled: true },
            ],
            path: "CustomerType",
            // value: dto.CustomerType,
            spacing: 12,
          },
          {
            type: "Input",
            label: "CKYC Status",
            visible: true,
            disabled: true,
            value: dto.CkycStatus,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "",
          },
          {
            type: "AutoComplete",
            label: "Select ID Type",
            visible: dto.CustomerType === "Individual",
            spacing: 3,
            required: dto.CustomerType === "Individual",
            path: `ProposerDetails.CKYCParam`,
            options: CkycParams,
            // value: masters.proposerSal,
            customOnChange: handleSetValueParms,
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "",
          },
          {
            type: "Input",
            label: "PAN Number",
            visible:
              dto?.ProposerDetails?.CKYCParam === "PAN Number" || dto.CustomerType === "Corporate",
            // required: dto.CustomerType === "Corporate",
            onBlurFuncs: ["IsPan"],
            path: `ProposerDetails.PanNo`,
            InputProps: { maxLength: 10 },
            disabled:
              dto.ProposerDetails.GSTNumber ||
              dto.ProposerDetails.CINNo ||
              dto.CkycStatus === "success" ||
              dto.CkycStatus === "failure",
          },
          {
            type: "Input",
            label: "GSTIN Number",
            visible: dto.CustomerType === "Corporate",
            // required: true,
            onBlurFuncs: ["IsGstNo"],
            path: `ProposerDetails.GSTNumber`,
            disabled:
              dto.ProposerDetails.PanNo ||
              dto.ProposerDetails.CINNo ||
              dto.CkycStatus === "success",
          },
          {
            type: "Input",
            onBlurFuncs: [IsCINNo],
            label: "CIN Number",
            visible: dto.CustomerType === "Corporate",
            path: `ProposerDetails.CINNo`,
            disabled:
              dto.ProposerDetails.GSTNumber ||
              dto.ProposerDetails.PanNo ||
              dto.CkycStatus === "success",
          },

          // {
          //   type: "MDDatePicker",
          //   required: true,
          //   spacing: 2.3,
          //   visible:
          //     dto?.ProposerDetails?.CKYCParam === "PAN Number" ||
          //     dto?.ProposerDetails?.CKYCParam === "Aadhaar Number" ||
          //     dto.CustomerType === "Corporate",
          //   allowInput: true,
          //   dateFormat: "d-m-Y",
          //   maxDate: new Date(),
          //   label: dto.CustomerType === "Corporate" ? "Date of Incorporation" : "Date of Birth",
          //   path: `ProposerDetails.DOB`,
          //   disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          // },

          // {
          //   type: "Input",
          //   label: "PAN Number",
          //   visible: dto.ProposerDetails.CKYCParam === "PAN Number",
          //   required: dto.CustomerType === "Individual",
          //   onBlurFuncs: ["IsPan"],
          //   path: `ProposerDetails.PanNo`,
          //   InputProps: { maxLength: 10 },
          //   disabled: dto.CkycStatus === "success",
          // },
          // {
          //   type: "MDDatePicker",
          //   required: true,
          //   visible: dto.ProposerDetails.CKYCParam === "PAN Number",
          //   label: "Date of Birth",
          //   allowInput: true,
          //   dateFormat: "d-m-Y",
          //   // minDate: `${new Date().getFullYear()}-${
          //   //   new Date().getMonth() + 1
          //   // }-${new Date().getDate()}`,
          //   // maxDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          //   //   new Date().getDate() + 30
          //   // }`,
          //   maxDate: new Date(),
          //   path: `ProposerDetails.DOB`,
          //   disabled: dto.CkycStatus === "success",
          // },
          {
            type: "Input",
            label: "Enter last 4 digits of Aadhar",
            spacing: 2.4,
            visible:
              dto?.ProposerDetails?.CKYCParam === "Aadhaar Number" &&
              dto.CustomerType !== "Corporate",
            required: dto.CustomerType === "Individual",
            // onBlurFuncs: ["IsPan"],
            path: `ProposerDetails.AadharID`,
            onChangeFuncs: ["IsNumeric"],
            InputProps: { maxLength: 4 },
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
          {
            type: "MDDatePicker",
            required: true,
            spacing: 2.3,
            visible:
              dto?.ProposerDetails?.CKYCParam === "PAN Number" ||
              dto?.ProposerDetails?.CKYCParam === "Aadhaar Number" ||
              dto.CustomerType === "Corporate",
            allowInput: true,
            dateFormat: "d-m-Y",
            maxDate: new Date(),
            label: dto.CustomerType === "Corporate" ? "Date of Incorporation" : "Date of Birth",
            path: `ProposerDetails.DOB`,
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
          {
            type: "Input",
            label: "Mobile No. as per Aadhar",
            spacing: 2.3,
            visible:
              dto?.ProposerDetails?.CKYCParam === "Aadhaar Number" &&
              dto.CustomerType !== "Corporate",
            required: dto.CustomerType === "Individual",
            // onBlurFuncs: ["IsPan"],
            path: `ProposerDetails.AadharMobileNo`,
            onChangeFuncs: ["IsNumeric"],
            onBlurFuncs: ["IsMobileNumber"],
            InputProps: { maxLength: 10 },
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
          {
            type: "Input",
            label: "Full Name as per Aadhar",
            spacing: 2.3,
            visible:
              dto?.ProposerDetails?.CKYCParam === "Aadhaar Number" &&
              dto.CustomerType !== "Corporate",
            required: dto.CustomerType === "Individual",
            // onBlurFuncs: ["IsPan"],
            path: `ProposerDetails.AadharName`,
            onChangeFuncs: ["IsAlphaSpace"],
            InputProps: { maxLength: 50 },
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
          {
            type: "AutoComplete",
            label: "Gender",
            spacing: 2.3,
            visible:
              dto?.ProposerDetails?.CKYCParam === "Aadhaar Number" &&
              dto.CustomerType !== "Corporate",
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
            // spacing: 3,
            required: dto.CustomerType !== "Corporate",
            path: `ProposerDetails.AadharGender`,

            options: masters?.Gender,
            // customOnChange: (e, v) => handleProposerMasters(e, v, "AadharGender"),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "",
          },
          {
            type: "Button",
            label: "Initiate C-kyc",
            visible: true,
            variant: "contained",
            spacing: 3,
            onClick: initiateCkyc,
            disabled:
              // (dto.CustomerType === "Corporate" && !dto.ProposerDetails.GSTNumber) ||
              // !dto.ProposerDetails.PanNo ||
              // !dto.ProposerDetails.DOB ||
              dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
          {
            type: "Button",
            label: "Update Status",
            visible: true,
            variant: "contained",
            spacing: 3,
            // disabled:
            //   dto.CkycStatus === "success" ||
            //   (dto.CustomerType === "Corporate" && !dto.ProposerDetails.GSTNumber) ||
            //   !dto.ProposerDetails.PanNo ||
            //   !dto.ProposerDetails.DOB,
            disabled:
              (dto.CustomerType !== "Corporate" &&
                !dto?.ProposerDetails?.PanNo &&
                !dto?.ProposerDetails?.AadharID === "" &&
                // dto.ProposerDetails.DOB === "" &&
                !dto?.ProposerDetails?.AadharMobileNo === "" &&
                !dto?.ProposerDetails?.AadharName === "" &&
                !dto?.ProposerDetails?.AadharGender === "") ||
              !dto?.ProposerDetails?.DOB ||
              dto.CkycStatus === "success" ||
              dto.CkycStatus === "",
            onClick: updateckyc,
          },
          {
            type: "Button",
            label: "Send Email/SMS",
            visible: true,
            variant: "contained",
            spacing: 3,
            disabled:
              (dto.CustomerType !== "Corporate" &&
                !dto?.ProposerDetails?.PanNo &&
                !dto?.ProposerDetails?.AadharID === "" &&
                // dto.ProposerDetails.DOB === "" &&
                !dto?.ProposerDetails?.AadharMobileNo === "" &&
                !dto?.ProposerDetails?.AadharName === "" &&
                !dto?.ProposerDetails?.AadharGender === "") ||
              !dto?.ProposerDetails?.DOB ||
              dto.CkycStatus === "success" ||
              dto.CkycStatus === "",
            onClick: sendMail,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Salutation",
            visible: dto.CustomerType === "Individual",
            spacing: 3,
            required: dto.CustomerType === "Individual",
            path: `ProposerDetails.Salutation`,
            options: masters?.Salutation,
            value: masters.proposerSal,
            customOnChange: (e, v) => handleProposerMasters(e, v, "Salutation"),
          },
          {
            type: "Input",
            label: "First Name",
            visible: dto.CustomerType === "Individual",
            path: `ProposerDetails.First Name`,
            onChangeFuncs: ["IsAlphaSpace"],
            spacing: 3,
            disabled: true,
          },
          {
            type: "Input",
            label: "Last Name",
            visible: dto.CustomerType === "Individual",
            path: `ProposerDetails.Last Name`,
            onChangeFuncs: ["IsAlphaSpace"],
            spacing: 3,
            disabled: true,
          },
          {
            type: "Input",
            label: "Corporate Name",
            visible: dto.CustomerType === "Corporate",
            path: `ProposerDetails.First Name`,
            onChangeFuncs: ["IsAlphaSpace"],
            spacing: 3,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible: dto.CustomerType !== "Corporate",
            disabled:
              masters.proposerSal === "Mr." ||
              masters.proposerSal === "Ms." ||
              masters.proposerSal === "Mrs.",
            spacing: 3,
            required:
              masters.proposerSal !== "Mr." &&
              masters.proposerSal !== "Ms." &&
              masters.proposerSal !== "Mrs.",
            path: `ProposerDetails.Gender`,
            value: masters.proposerGender,
            options: masters?.Gender,
            customOnChange: (e, v) => handleProposerMasters(e, v, "Gender"),
          },
          {
            type: "MDDatePicker",
            label: dto.CustomerType === "Corporate" ? "Date of Incorporation" : "Date of Birth",
            visible: true,
            // allowInput: true,
            // dateFormat: "Y-m-d",
            // path: "ProposerDetails.DOB",
            dateFormat: "d-m-Y",
            path: masters.flags.dob === true ? "ProposerDetails.DOB" : "",
            InputProps: { disabled: true },
            spacing: 3,
            disabled: true,
          },

          {
            type: "Input",
            label: "Email",
            visible: true,
            // disabled: true,
            spacing: 3,
            path: `ProposerDetails.Email ID`,
            onBlurFuncs: ["IsEmail"],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            // disabled: true,
            spacing: 3,
            path: `ProposerDetails.Mobile Number`,
            onChangeFuncs: ["IsNumeric"],
            InputProps: { maxLength: 10 },
            onBlurFuncs: ["IsMobileNumber"],
          },
          {
            type: "Input",
            label: "GSTIN Number",
            visible: true,
            // disabled: true,
            onBlurFuncs: ["IsGstNo"],
            path: "GSTNumber",
            required:
              ((dto.CkycStatus === "success" || dto.CkycStatus === "failure") &&
                dto.ProposerDetails.GSTNumber === "") ||
              dto.CustomerType === "Corporate",

            disabled:
              (dto.CkycStatus === "success" || dto.CkycStatus === "failure") &&
              dto.ProposerDetails.GSTNumber !== "",
          },
        ],
        [
          {
            type: "Input",
            label: "Address1",
            required: true,
            visible: true,
            disabled: dto.CkycStatus === "success",
            // InputProps: { disabled: masters.var.status === "success" },
            path: `ProposerDetails.PermanentAddress.AddressLine1`,
            // onChangeFuncs: ["IsAlphaNum"],
          },
          {
            type: "Input",
            label: "Address2",
            visible: true,
            // required: true,
            path: `ProposerDetails.PermanentAddress.AddressLine2`,
            // onChangeFuncs: ["IsAlphaNum"],
          },
          {
            type: "Input",
            label: "Pincode",
            visible: true,
            required: true,
            // disabled: dto.CkycStatus === "success",
            // disabled:
            //   (dto.CkycStatus === "success" &&
            //     dto.ProposerDetails.PermanentAddress.Pincode !== "") ||
            //   dto.CkycStatus !== "",
            disabled: masters.flags.pincodeflag === false,
            path: `ProposerDetails.PermanentAddress.Pincode`,
            // disabled: dto.CkycStatus === "success" && dto.ProposerDetails.CINNo === "",
            // onBlurFuncs: ["IsNumeric"],
            InputProps: { maxLength: 6 },
            customOnBlur: (e) => handlePincode(e, "Perm"),
          },
          {
            type: "AutoComplete",
            label: "City",
            visible: true,
            required: true,
            path: `ProposerDetails.PermanentAddress.CityDistrictValue`,
            // onChangeFuncs: ["IsAlphaSpace"],
            // value: masters.CityDistrict.perm,
            options: masters?.permCD,
            customOnChange: (e, v) => handleCity(e, v, "Perm"),
          },
          {
            type: "Input",
            label: "State",
            visible: true,
            disabled: true,
            path: `ProposerDetails.PermanentAddress.StateValue`,
            // value: masters.State.perm,
            onChangeFuncs: ["IsAlpha"],
          },
          {
            type: "Input",
            label: "Country",
            visible: true,
            disabled: true,
            path: `ProposerDetails.PermanentAddress.Country`,
            onChangeFuncs: ["IsAlpha"],
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "Is Communication address same as CKYC/Permanent address",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],

            path: `ProposerDetails.SameasCommunicationAddress`,
            spacing: 12,
            customOnChange: (e) => onSameAddress(e),
          },
        ],
        [
          {
            type: "Input",
            label: "Address1",
            required: true,
            visible: true,
            path: `ProposerDetails.CommunicationAddress.AddressLine1`,
            disabled: dto.ProposerDetails.SameasCommunicationAddress === "Yes",
          },
          {
            type: "Input",
            label: "Address2",
            visible: true,
            // required: true,
            path: `ProposerDetails.CommunicationAddress.AddressLine2`,
            disabled: dto.ProposerDetails.SameasCommunicationAddress === "Yes",
          },
          {
            type: "Input",
            label: "Pincode",
            visible: true,
            required: true,
            path: `ProposerDetails.CommunicationAddress.Pincode`,
            disabled: dto.ProposerDetails.SameasCommunicationAddress === "Yes",
            InputProps: { maxLength: 6 },
            customOnBlur: (e) => handlePincode(e, "Comm"),
          },
          {
            type: "AutoComplete",
            label: "City",
            visible: true,
            required: true,
            path: `ProposerDetails.CommunicationAddress.CityDistrictValue`,
            disabled: dto.ProposerDetails.SameasCommunicationAddress === "Yes",
            // value: masters.CityDistrict.comm,
            options: masters?.commCD,
            customOnChange: (e, v) => handleCity(e, v, "Comm"),
          },
          {
            type: "Input",
            label: "State",
            visible: true,
            disabled: true,
            // value: masters.State.comm,
            path: `ProposerDetails.CommunicationAddress.StateValue`,
            onChangeFuncs: ["IsAlpha"],
          },
          {
            type: "Input",
            label: "Country",
            visible: true,
            disabled: true,
            path: `ProposerDetails.CommunicationAddress.Country`,
            onChangeFuncs: ["IsAlpha"],
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "", labelVisible: true },
            radioList: [
              { value: "Specific", label: "Specific Location" },
              // { value: "Generic", label: "Generic Location" },
              // { value: "Generic", label: "Generic Location", disabled: true },
            ],
            path: "LocationType",
            spacing: 12,
          },
          // {
          //   type: "Typography",
          //   label: "Risk Location 01",
          //   sx: {
          //     fontSize: "16px",
          //   },
          //   visible: dto.ProposalConsent.LocationType === "Specific",
          //   spacing: 12,
          // },

          {
            type: "Input",
            label: "Anywhere In ",
            visible: dto.LocationType === "Generic",
            required: dto.LocationType === "Generic",
            path: `InsurableItem.0.AnywhereInIndia`,
          },
          {
            type: "Typography",
            label: "Note : Territory restricted to India Only",
            visible: dto.LocationType === "Generic",
            sx: {
              color: "red",
              fontSize: "14px",
            },
            spacing: 12,
          },
          ...spreedRiskLoc(),
          {
            type: "Typography",
            visible: true,
            spacing:
              dto.InsurableItem[0]?.RiskLocationAddress?.length > 1 &&
              dto.LocationType === "Specific"
                ? 8
                : 10,
            label: "",
          },
          {
            type: "Button",
            label: "Remove Location",
            visible:
              dto.InsurableItem[0]?.RiskLocationAddress?.length > 1 &&
              dto.LocationType === "Specific",
            variant: "outlined",
            onClick: () => onRemoveRiskLoc(dto.InsurableItem[0]?.RiskLocationAddress?.length),
            spacing: 2,
          },
          {
            type: "Button",
            label: "Add Location",
            startIcon: <AddIcon />,
            visible: dto.LocationType === "Specific",
            // variant: "outlined",
            onClick: () => onAddRiskLoc(),
            spacing: 2,
            disabled: true,
          },
        ],

        [
          {
            type: "Tabs",
            visible: true,
            spacing: 12,
            tabs: [{ label: "Upload" }, { label: "Download" }],
            value: masters.tabIndex,
            customOnChange: onTab,
          },

          {
            type: "Typography",
            label: `Document Name`,
            visible: masters.tabIndex === 0,
            variant: "h6",
            sx: { fontSize: "14px" },
            spacing: 3,
          },

          {
            type: "Typography",
            label: `Document Remark`,
            visible: masters.tabIndex === 0,
            variant: "h6",
            sx: { fontSize: "14px" },
            spacing: 3,
          },

          {
            type: "Typography",
            label: `Browse File`,
            visible: masters.tabIndex === 0,
            sx: { fontSize: "14px" },
            variant: "h6",
            spacing: 6,
          },

          ...spreedDocComponents(),
          // {
          //   type: "Button",
          //   label: "Add Document",
          //   startIcon: <AddIcon />,
          //   visible: masters.tabIndex === 0,
          //   variant: "outlined",
          //   onClick: onAddDocument,
          //   spacing: 12,
          // },
          {
            type: "DataGrid",
            spacing: 12,
            visible: masters.tabIndex === 1,
            // rowId: "fileName",
            rowId: "DocName",
            path: "documentDetails",
            columns: [
              {
                field: "DocName",
                headerName: "Document Type",
                width: 300,
                // align: "center",
              },
              {
                field: "fileName",
                headerName: "File Name",
                sx: { fontSize: "14px" },
                width: 300,
                // align: "left",
                // marginLeft: 200,
                renderCell: (p) => (
                  <div style={{ textAlign: "left", marginLeft: "-20px" }}>
                    <MDButton
                      variant="text"
                      // sx={{ ml: "2rem" }}
                      onClick={() => onDownloadClick(p.row.fileName)}
                    >
                      {p.row.fileName}
                    </MDButton>
                  </div>
                ),
              },
              {
                field: "UploadDocDate",
                headerName: "Uploaded Date",
                width: 200,
                // align: "center",
              },
              // {
              //   field: "action",
              //   headerName: "",
              //   width: 200,
              //   // align: "center",
              //   renderCell: (params) => {
              //     console.log("params", params);
              //     const onDelete = () => {
              //       const updatedData = dto.documentDetails.filter(
              //         (item) => item.fileName !== params.row.fileName
              //       );
              //       lDto.documentDetails = updatedData;
              //       setDto({ ...lDto });
              //     };
              //     return <DeleteIcon onClick={onDelete} />;
              //   },
              // },
            ],
          },
        ],
        [
          {
            type: "Checkbox",
            visible: true,
            required: true,
            label: "Proposal Consent",
            spacing: 12,
            checkedVal: true,
            unCheckedVal: false,
            path: `ProposalConsent.ProposalConsentCheck`,
            // value: masters.ProposalConsent,
            customOnChange: (e) => onCheck(e),
          },
          {
            type: "Input",
            label: "Enter OTP",
            required: dto.ProposalConsent.ProposalConsentCheck,
            path: `ProposalConsent.OTP`,
            visible: dto.ProposalConsent.ProposalConsentCheck,
            spacing: 3,
            // disabled: masters.flags.otpflag,
            disabled: lMasters.flags.otpflag,
            InputProps: { maxLength: 6 },
            // customOnChange: (e) => handleOTPChange(e),
            // value: OTP,
          },
          {
            type: "Typography",
            label: "",
            visible: dto.ProposalConsent.ProposalConsentCheck,
            spacing: 1,
          },
          // {
          //   type: "Button",
          //   label: masters.counter === 30 ? "Send OTP" : "Resend OTP",
          //   visible: dto.ProposalConsent.ProposalConsentCheck,
          //   disabled: masters.startCounterFlag,
          //   onClick: handleSendOTP,
          //   spacing: 3,
          //   variant: "outlined",
          //   // path: masters.SendOTP,
          // },
          {
            type: "Custom",
            visible: dto.ProposalConsent.ProposalConsentCheck,
            spacing: 3,
            return: (
              <Grid item xs={12} sm={12} md={6}>
                {lMasters.flags.timerFlag ? (
                  <MDButton
                    color="primary"
                    variant="contained"
                    onClick={handleSendOTP}
                    // disabled={masters.flags.otpflag}
                    disabled={lMasters.flags.otpflag}
                  >
                    Re-Send OTP
                  </MDButton>
                ) : (
                  lMasters.flags.sendOtpFlag === true && (
                    <MDButton color="primary" variant="contained" onClick={handleSendOTP}>
                      Send OTP
                    </MDButton>
                  )
                )}
              </Grid>
            ),
          },
          {
            type: "Button",
            label: "Verify OTP",
            visible: dto.ProposalConsent.ProposalConsentCheck,

            spacing: 3,
            onClick: handleVerifyOTP,
            variant: "contained",
            // path: masters.verifyOTP,
            disabled: masters.flags.otpflag,
          },
          {
            type: "Typography",
            label: <Timer counter={lMasters.counter} />,
            visible: dto.ProposalConsent.ProposalConsentCheck && masters.startCounterFlag,
            spacing: 7,
            // path: masters.verifyOTP,
          },

          {
            type: "Checkbox",
            visible: dto.ProposalConsent.ProposalConsentCheck,
            label: `I/We Hereby declare that the statements made by me/us in this proposal form are true the
              best of my/our knowledge and belief and I/We hereby agree that this declaration shall
              from the basis of the contract between  me/us and the Universal Sompo General Insurance
             Company Limited insurance  Company`,
            spacing: 12,
            path: `ProposalConsent.CheckCond1`,
            required: dto.ProposalConsent.ProposalConsentCheck,
            checkedVal: true,
            unCheckedVal: false,
          },

          {
            type: "Checkbox",
            visible: dto.ProposalConsent.ProposalConsentCheck,
            label:
              "I/We also declare that any addition alteration are carried out after the submission of this proposal form that the same would be conveyed to the insuarnace company immediately",
            spacing: 12,
            path: `ProposalConsent.CheckCond2`,
            required: dto.ProposalConsent.ProposalConsentCheck,
            checkedVal: true,
            unCheckedVal: false,
          },
        ],
      ];
      break;
    case 2:
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
            radioLabel: { label: "Payment Type * ", labelVisible: true },
            radioList: [
              { value: "ClientPayment", label: "Client Payment" },
              { value: "AgentPayment", label: "Agent Payment" },
            ],
            path: "PaymentDetails.paymentType",
            spacing: 11,
          },

          {
            type: "Custom",
            spacing: 12,
            visible:
              dto.PaymentDetails.paymentType === "ClientPayment" ||
              dto.PaymentDetails.paymentType === "AgentPayment",
            return: <Payment dto={dto} masters={masters} setMasters={setMasters} setDto={setDto} />,
          },
        ],
      ];
      break;
    // case 3:
    //   data = [
    //     [
    //       {
    //         type: "Custom",
    //         visible: true,
    //         spacing: 12,
    //         return:
    //           masters.chequePayStatus === 1 ? (
    //             <PaymentSuccess BGRTransactionId={masters.paymentRefNo} />
    //           ) : (
    //             <PaymentFailure />
    //           ),
    //       },
    //     ],
    //   ];
    //   break;

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
  setBackDropFlag,
  masters,
  setMasters,
}) => {
  const lDto = dto;
  const lMasters = masters;
  let fun = true;
  const mDto = { ...dto };
  // const onProceedtoPayment = async () => {
  //   fun = true;
  //   topNavigate("/retail/Payment/NBRetailSuccess?policyno=1000000003485");
  // };

  switch (activeStep) {
    case 0:
      if (masters.flags.CalPreSuc) {
        if (dto.IsPrev3YrsClaim === "Yes") {
          fun = false;
          swal({ icon: "error", text: "Refer to Underwriter" });
        } else if (
          // masters.flags.editval === false ||
          masters.Quotes[masters.flags.activeTab].editval === false ||
          masters.Quotes[masters.flags.activeTab].FinalPremium === 0 ||
          dto.PremiumDetails["Total with Tax"] === "0"
        ) {
          fun = false;
          swal({ icon: "error", text: "Please click on Calculate Premium" });
        } else {
          setBackDropFlag(true);
          // if (masters.QuoteModfyVal) {
          //   swal({ icon: "error", text: "Please Calculate Premium" });
          //   fun = false;
          // } else {

          const res = await callUpdateQuoteMethod(dto).then(async () => {
            await shareQuote(dto["Quotation No"], dto.QuoteEmail);
            const downloadDTO = {
              key: dto["Quotation No"],
              templateId: 194,
              referenceId: "",
            };
            await downloadQuote(downloadDTO);
          });

          const Message = `Dear Customer,Based on your requirements, Employees Compensation Insurance Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
          await SendSMS("usgi", dto.QuoteMobileNo, Message).then((smsResp) => {
            console.log("1234567890", smsResp);
          });

          // lMasters.flags.CalPreBtn = false;
          // setMasters({ ...lMasters });
          setBackDropFlag(false);
          console.log(res);
          fun = true;
        }
      } else {
        fun = false;
        swal({ icon: "error", text: "Please click on Calculate Premium" });
      }
      break;
    case 1:
      if (lMasters.flags.Kyc === false) {
        fun = false;
        swal({
          icon: "error",
          text: "Please initiate the ckyc",
        });
      } else if (dto?.documentDetails.some((x) => x.DocName !== "" && x.fileName === "")) {
        fun = false;
        swal({
          icon: "error",
          text: "Please Upload the document",
        });
      } else if (lMasters.flags.otpflag === false) {
        fun = false;
        swal({
          icon: "error",
          text: "Please verify OTP",
        });
      } else if (
        dto.ProposalConsent.CheckCond1 === false ||
        dto.ProposalConsent.CheckCond2 === false
      ) {
        fun = false;
        swal({
          icon: "error",
          text: "Please check the Proposal Consent checkbox",
        });
      } else if (dto.CkycStatus === "failure") {
        fun = false;
        swal({ icon: "error", text: "CKYC is Failure" });
      } else {
        setBackDropFlag(true);
        objectPath.del(mDto, "ProposalConsent");
        if (dto.proposalNumber === "") {
          const res = await calculateProposal(mDto);

          console.log("res", res);
          lDto.proposalNumber = res.data.proposalNumber;
          lDto.ProposalNo = res.data.proposalNumber;
          lMasters.SavePymtDTO.proposalNo = res.data.proposalNumber;
          setDto({ ...lDto });
          setMasters({ ...lMasters });
        } else {
          await postRequest(`Policy/UpdateProposalDetails`, dto);
        }
        if (dto && dto.proposalNumber && dto.proposalNumber !== "") {
          const res1 = await fetchPaymentURL(
            1037,
            dto.proposalNumber,
            dto.PremiumDetails["Total with Tax"]
          );
          lDto.TransactionID = res1.transactionID;
          lMasters.SavePymtDTO.paymentDetailsDTO.transactionNo = res1.transactionID;
          lMasters.paymentRefNo = res1.paymentRefNo;
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
        }

        if (dto.CkycStatus === "success") {
          const proposerMail = await proposerEamil(dto.proposalNumber, dto.QuoteEmail);

          const downloadDTO = {
            key: dto && dto.proposalNumber,
            templateId: 195,
            referenceId: "",
          };
          await downloadQuote(downloadDTO);

          console.log("proposerMail", proposerMail);
          const Message = `Dear Customer,Based on your requirements, Employees Compensation Insurance Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
          await SendSMS("usgi", dto.QuoteMobileNo, Message).then((smsResp) => {
            console.log("1234567890", smsResp);
          });
          await callUpdateQuoteMethod(dto);
          fun = true;
        } else {
          fun = false;
          swal({ icon: "error", text: "CKYC is Failure" });
        }
        setBackDropFlag(false);
      }
      break;
    case 2:
      // fun = onProceedtoPayment();
      // if (
      //   dto.PaymentDetails.ChequeAmount === "" ||
      //   dto.PaymentDetails.InstrumentNo === "" ||
      //   dto.PaymentDetails.InstrumentDate === "" ||
      //   dto.PaymentDetails.BankName === ""
      // ) {
      //   lMasters.errorFlag = true;
      //   setMasters({ ...lMasters });
      //   fun = false;
      // } else if (dto?.PaymentDetails?.ModeOfPayment === "Cheque") {
      //   const res = await SavePaymentdetails(masters.SavePymtDTO);
      //   console.log("SavePaymentdetails", res);
      //   // lMasters.chequePayStatus = res.data.status;
      //   setMasters({ ...lMasters });
      //   const policyMail = await policyEmail(res.data.id, dto.QuoteEmail);
      //   console.log("policyEmail", policyMail);
      //   const Message = `Dear Customer,Welcome to USGI Family. Your Employee's Compensation Insurance has been issued with policy no. ${
      //     res.data.id
      //   } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
      //   await SendSMS("usgi", dto.QuoteMobileNo, Message).then((smsResp) => {
      //     console.log("1234567890", smsResp);
      //   });
      //   if (res.data.status === 1) {
      //     fun = true;
      //     topNavigate(`/Home/PaymentSuccess?backURL=&PaymentRefNo=${masters.paymentRefNo}`);
      //   } else {
      //     fun = true;
      //     topNavigate(`/Home/PaymentFailure}`);
      //   }
      // }
      fun = true;
      break;
    // case 3:
    //   fun = true;
    //   break;

    default:
      fun = true;
      break;
  }
  return fun;
};

const getButtonDetails = ({ activeStep, dto, setDto, masters, setMasters }) => {
  let btnDetails = {};
  // Restrict back button by shreya
  const { search } = useLocation();
  const stepNo = new URLSearchParams(search).get("acstep");
  //
  const onPremiumCal1 = async () => {
    const lDto = dto;
    const lMasters = masters;
    if (
      dto.PolicyStartDate === "" ||
      dto.InsurableItem[0].RiskLocationAddress[0].CityDistrictValue === "" ||
      dto.PolicyTenure === ""
    ) {
      swal({ icon: "error", text: "Please fill required fields" });
    } else if (dto.InsurableItem[0].RiskItems.length === 0) {
      swal({ icon: "error", text: "Please add Risk Details" });
    } else if (
      lDto.InsurableItem[0].Covers[0].IsOptional === "Yes" &&
      dto.InsurableItem[0].Covers[0].Limit === ""
    ) {
      swal({ icon: "error", text: "Please Select Medical Sum Insured" });
    } else {
      // setBackDropFlag(true);
      const res = await GenericApi("WorkmanCompensation_v1", "CalculatePremium", dto);
      if (res.responseMessage === "Success") {
        lMasters.Quotes[masters.flags.activeTab].editval = true;
        lDto.PremiumDetails.MedicalExpensesPremium = String(
          Math.round(Number(res.finalResult.WCRating.MedicalExpensesPremiumSum))
        );
        lDto.SumInsured = res.finalResult.TotalSI;
        lDto.ProposerDetails.Name = `${lDto.ProposerDetails["First Name"]} ${lDto.ProposerDetails["Last Name"]}`;
        // lDto.Discount = res.finalResult.DiscountAmount;
        lDto.PremiumDetails["Total with Tax"] = String(
          Math.round(Number(res.finalResult.FinalPremium))
        );
        lDto.PremiumDetails["Net Premium"] = String(
          Math.round(Number(res.finalResult.NewNetPremium))
        );
        lDto.PremiumDetails.GST = String(Math.round(Number(res.finalResult.GST)));
        lDto.PremiumDetails.SGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));
        lDto.PremiumDetails.CGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));
        // lDto.PaymentDetails.ChequeAmount = String(Math.round(Number(res.finalResult.FinalPremium)));
        console.log("Calculate Premium", res);
        if (lDto.Loading !== "") {
          lDto.Loading_Discount = "Other Loadings";
          lDto.LoadingDiscountRate = lDto.Loading / 100;
          lDto.LoadingDiscount_Applicable = true;
        } else if (lDto.Discount !== "") {
          lDto.Loading_Discount = "Other Discounts";
          lDto.LoadingDiscountRate = lDto.Discount / 100;
          lDto.LoadingDiscount_Applicable = true;
        }
        const quotationDTO = await callSaveQuoteMethod(dto);
        console.log("quotationDTO", quotationDTO);
        lDto["Quotation No"] = quotationDTO.data.quotation.quoteNo;
        lDto.QuoteNo = quotationDTO.data.quotation.quoteNo;
        const ind = lMasters.flags.activeTab;
        console.log("index", ind);
        lMasters.flags.CalPreBtn = true;
        lMasters.flags.CalPreSuc = true;
        lMasters.Quotes[ind].TotalSI = SplitingNumber(res.finalResult.TotalSI);
        // let totalExtensionPremium = 0;
        // res.finalResult.WCRating.output.forEach((x) => {
        //   if (x.ExtensionPremium) {
        //     totalExtensionPremium += Number(x.ExtensionPremium);
        //   }
        // });
        lMasters.Quotes[ind].AddOnPremium = SplitingNumber(
          Math.round(res.finalResult.WCRating.UIAddonPremiumSum)
        );
        lDto.PremiumDetails["Extension Premium"] = String(
          Math.round(Number(res.finalResult.WCRating.UIAddonPremiumSum))
        );
        lMasters.Quotes[ind].DiscountAmount = SplitingNumber(
          Math.round(Number(res.finalResult.DiscountAmount))
        );
        lMasters.Quotes[ind].LoadingAmount = SplitingNumber(
          Math.round(Number(res.finalResult.LoadingAmount))
        );
        lMasters.Quotes[ind].NetPremium = SplitingNumber(
          Math.round(Number(res.finalResult.NewNetPremium))
        );
        // lMasters.Quotes[ind].GST = Math.round(Number(res.finalResult.GST));
        lMasters.Quotes[ind].GST = Math.round(Number(res.finalResult.GST));
        lMasters.Quotes[ind].SGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));
        lMasters.Quotes[ind].CGST = SplitingNumber(Math.round(Number(res.finalResult.GST) / 2));
        lMasters.Quotes[ind].FinalPremium = SplitingNumber(
          Math.round(Number(res.finalResult.FinalPremium))
        );
        // lMasters.SavePymtDTO.paymentDetailsDTO.ChequeAmount = SplitingNumber(
        //   Math.round(Number(res.finalResult.FinalPremium))
        // );
        lDto.ProposerDetails.Name = `${dto.ProposerDetails["First Name"]}${lDto.ProposerDetails["Last Name"]}`;

        getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
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
                partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString();
              lDto.Channel.PrimaryVerticalName =
                partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
                  ? masters.VerticalName.filter(
                      (x) =>
                        x.VerticalCode ===
                        partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
                    )[0].mValue
                  : partnerDetail.AdditionalDetails.PrimaryVerticalName;
              // lDto.Channel.PrimaryVerticalName =
              //   partnerDetail.AdditionalDetails.PrimaryVerticalName;
              lDto.Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
              lDto.Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
              lDto.Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
              lDto.Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
              lDto.Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
              lDto.Channel.DealId = partnerDetail.AdditionalDetails.DealId;
              lDto["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;
              setDto({ ...lDto });
              // setBackDropFlag(false);
            });
          }
        );

        setMasters({ ...lMasters });
        setDto({ ...lDto });
      } else if (res.data.RuleOutPut.failureMsg === "Refer To Underwriter") {
        // lMasters.flags.errMsg = true;
        lMasters.flags.CalPreBtn = false;
        lMasters.flags.CalPreSuc = false;
        // setBackDropFlag(false);
        setMasters({ ...lMasters });
        // swal({ icon: "error", text: res.data.RuleOutPut.failureMsg });
        swal({ icon: "error", text: "Refer to Underwriter" });
      }
    }
  };
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed to Proposal",
          visible: true,
          variant: "contained",
          loader: "backDrop",
        },
        button1: {
          label: "Calculate Premium",
          visible: masters.flags.CalPreBtn === false,
          variant: "contained",
          onClick: onPremiumCal1,
          loader: "backDrop",
        },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: stepNo !== "1" },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed to Payment", visible: true, variant: "contained" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Make Payment",
          // visible: dto?.PaymentDetails?.ModeOfPayment === "Cheque",
          visible: false,
          variant: "contained",
        },
      };
      break;

    // case 3:
    //   btnDetails = {
    //     prev: { label: "Previous", visible: true },
    //     reset: { label: "Reset", visible: false },
    //     next: { label: "Next", visible: false },
    //   };
    //   break;

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
    DocComponentArr: [],
    gender: [],
    tabIndex: 0,
    riskid: 0,
    paymentRefNo: "",
    totalNoEmp: "",
    Pincodestatus: false,
    totalMonthlyWages: 0,
    QuoteSearch: false,
    flags: {
      addFlg: false,
      editFlag: false,
      deleteFlg: false,
      anchorEl: false,
      activeTab: 0,
      showTab: false,
      showTabQ: false,
      selectedColumn: 0,
      showColumnQ: false,
      showColumnQo: false,
      showButton: false,
      clicks: 0,
      rowId: "",
      pincodeflag: false,
      CalPreBtn: false,
      cancelIcon: true,
      totalSI: false,
      gradeErr: false,
      distErr: false,
      loadErr: false,
      CalPreSuc: false,
      dob: false,
      sendOtpFlag: true,
      timerFlag: false,
      status: false,
      otpflag: false,
      editval: false,
      failure: false,
      Kyc: false,
    },
    newRisk: {
      SNo: "",
      Occupancy: "",
      TypeOfWorker: "",
      NatureOfWork: "",
      RiskCategory: "",
      NoOfEmployees: "",
      MonthlyWagesPerWorker: "",
      WagesUpto15000: "",
      WagesAbove15000: "",
      ClassificationNo: "",
      EndoresmentNo: "",
      AuditSerialNumber: "",
      CategoryCode: "",
      CategoryDescription: "",
      SubCategoryCode: "",
      SubCategoryDescription: "",
      EmployeeType: "",
      EndorsementDesc: "",
    },
    var: {},
    QuoteIndex: 0,
    Quotes: [
      {
        MedicalExpenses: "",
        MedicalSumInsured: "",
        MedicalSumInsuredValue: "",
        Terrorism: "",
        OccupationalDisease: "",
        ContractWorkersExtension: "",
        TotalSI: 0,
        AddOnPremium: 0,
        DiscountAmount: 0,
        LoadingAmount: 0,
        NetPremium: 0,
        GST: 0,
        CGST: 0,
        SGST: 0,
        FinalPremium: 0,
        Loading: "",
        Discount: "",
        LoadingVal: "",
        DiscountVal: "",
        medFlag: "False",
        terrFlag: "False",
        occFlag: "False",
        contFlag: "False",
        editval: false,
      },
      {
        MedicalExpenses: "",
        MedicalSumInsured: "",
        MedicalSumInsuredValue: "",
        Terrorism: "",
        OccupationalDisease: "",
        ContractWorkersExtension: "",
        TotalSI: 0,
        AddOnPremium: 0,
        DiscountAmount: 0,
        LoadingAmount: 0,
        NetPremium: 0,
        GST: 0,
        CGST: 0,
        SGST: 0,
        FinalPremium: 0,
        Loading: "",
        Discount: "",
        LoadingVal: "",
        DiscountVal: "",
        medFlag: "False",
        terrFlag: "False",
        occFlag: "False",
        contFlag: "False",
        editval: false,
      },
      {
        MedicalExpenses: "",
        MedicalSumInsured: "",
        MedicalSumInsuredValue: "",
        Terrorism: "",
        OccupationalDisease: "",
        ContractWorkersExtension: "",
        TotalSI: 0,
        AddOnPremium: 0,
        DiscountAmount: 0,
        LoadingAmount: 0,
        NetPremium: 0,
        GST: 0,
        CGST: 0,
        SGST: 0,
        FinalPremium: 0,
        Loading: "",
        Discount: "",
        LoadingVal: "",
        DiscountVal: "",
        medFlag: "False",
        terrFlag: "False",
        occFlag: "False",
        contFlag: "False",
        editval: false,
      },
    ],
    SavePymtDTO: {
      paymentDetailsDTO: {
        ChequeAmount: "",
        InstrumentNo: "",
        InstrumentDate: "",
        BankName: "",
        transactionNo: "",
        paymentSource: "",
        paymentId: "",
        paymentResponse: "",
      },
      proposalNo: "",
      policyNo: "",
    },
    PaymentPage: {
      cheque: false,
      online: false,
      email: false,
      disabledcheque: false,
      disabledonline: false,
      disabledemail: false,
    },
    bodyData: {
      key: "7Y4RPX",
      txnid: "",
      amount: "",
      productinfo: "Workmen Compensation",
      firstname: "",
      email: "",
      phone: "",
      surl: "https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0077/00/000",
      furl: "/paymentfailure",
      salt: "hl8aISlY",
    },

    permCD: "",
    commCD: "",
    riskCD: "",
    // chequePayStatus: "",
    errorFlag: "",
    errRisk: false,
    months: "",
    totalSI: 0,
    PolicyStartDate: "",
    CityDistrict: {
      risk: "",
      comm: "",
      perm: "",
    },
    State: { risk: "", comm: "", perm: "" },

    proposerGender: "",
    proposerSal: "",
    ProposalConsent: "",
    Cond1: "",
    Cond2: "",
    counter: 30,
    startCounterFlag: false,
    QuoteModfyVal: false,
    onBlurLoad: false,
    onBlurDiscount: false,
  };
  const res3 = await GetProdPartnermasterData(1037, "GetWCOccupancyMaster", { CommonId: 1 });
  mst.Occupancy = res3;
  const res4 = await GetProdPartnermasterData(1037, "TypeofWorker", { MasterType: "TypeofWorker" });
  mst.TypeOfWorker = res4;
  // const res2 = await GetProdPartnermasterData(1039, "DocumentsNameCPM", {});
  // mst.doc = res2;
  const res2 = await GetProdPartnermasterData(1037, "DocumentsNameWC", {
    MasterType: "DocumentsNameWC",
  });
  mst.doc = res2;
  const sal = await GetProdPartnermasterData(1037, "Salutation", { MasterType: "Salutation" });
  mst.Salutation = sal;
  const gen = await GetProdPartnermasterData(1037, "Gender", { MasterType: "Gender" });
  mst.Gender = gen;
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
