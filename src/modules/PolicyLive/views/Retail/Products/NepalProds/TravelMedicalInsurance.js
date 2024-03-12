import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import Success from "assets/images/Nepal/Success.png";
// import { styled } from "@mui/material/styles";
// import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import objectPath from "object-path";
import {
  Checkbox,
  // Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  Stack,
  // CircularProgress,
  Typography,
  // Button,
} from "@mui/material";
import swal from "sweetalert2";
import swal1 from "sweetalert";

import {
  GetNPCommonMaster,
  Transliteration,
  DocumenUpload,
  DeleteDocument,
  GetProdPartnermasterData,
  GenericApi,
  SavepolicyWFStatus,
  SaveQuotation,
  UpdateWorkflowStatus,
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  SendNotification,
  QuotationUpdate,
  // PolicyStartDateFiscalYear,
  UpdateProposalDetails,
  PolicyStartDateMinDate,
  PolicyStartDateMaxDate,
  GetProductByCode,
  // getproductid,
  // SaveCreateProposal,
} from "./data/APIs/MotorCycleApi";

import {
  TravelMedicalInsuranceJson,
  AddTravellerDetailsjson,
  docDetails,
  // ProposerDetailsArray,
} from "./data/Json/TravelMedicalInsuranceJson";
import { useDataController } from "../../../../../BrokerPortal/context";
import { BranchDetails } from "./data/Json/CommercialJson";
import MDButton from "../../../../../../components/MDButton";
// import MDInput from "../../../../../../components/MDInput";
import PaymentPage from "../../Payment";
import { GetTemplatePayload, GetProposalByNumber } from "../../Payment/Apis";

import {
  IsNumeric,
  // arrayRange,
  // addDays,
  addDays1,
  IsAlphaSpace,
  IsEmail,
  // IsAlphaNum,
  IsNumaricSpecialNoSpace,
  // IsAlphaNumSpecial,
  NumBetween,
  //   IsNumaricSpecial,
  IsAlpha,
  // IsAlphaNumSpace,
  AgeCalculator,
  // arrayRange,
  IsFreetextNoSpace,
  IsMobileNumber,
  DateFormatFromStringDate,
} from "../../../../../../Common/Validations";
// import { set } from "lodash";

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = TravelMedicalInsuranceJson();
  console.log(111, dto);
  if (
    (genericInfo.Flow &&
      (genericInfo.Flow === "DisApproveFlow" ||
        genericInfo.Flow === "Approved" ||
        genericInfo.Flow === "DebitFlow")) ||
    process.env.REACT_APP_AutoPopulateCustomerDetails === "true"
  ) {
    dto = { ...dto, ...PolicyDto };
  }
  return dto;
  // if (
  //   (genericInfo.Flow &&
  //     (genericInfo.Flow === "DisApproveFlow" ||
  //       genericInfo.Flow === "Approved" ||
  //       genericInfo.Flow === "DebitFlow")) ||
  //   process.env.REACT_APP_AutoPopulateCustomerDetails === "true"
  // ) {
  //   dto = { ...dto, ...PolicyDto };
  //   dto.ProposerDetails = [PolicyDto.ProposerDetails];
  // }
  // return dto;
};

const getProcessSteps = () => {
  const steps = [
    "Quote Details",
    "Customer Details",
    "Traveller Details",
    "Risk Details",
    "Premium Summary",
    "Payment",
  ];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto }) => {
  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push({
        name: `Branch Details ${i + 1}`,
        visible: dto.FinancingType === "Bank/Financial Institution",
      });
    });
    return arr;
  };
  let steps = [];

  const spreadTravelDetails = () => {
    const arr = [];

    dto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push({ name: `Traveller Details ${i + 1}`, visible: true });
    });
    // console.log("spredarray1", arr);
    return arr;
  };

  // const spreadMultiKYCDetails = () => {
  //   const arr = [];
  //   dto.ProposerDetailsArray.forEach((x, i) => {
  //     arr.push({ name: `Insured Details ${i + 1}`, visible: dto.FinancingType !== "" });
  //   });
  //   return arr;
  // };

  switch (activeStep) {
    case 0:
      steps = [{ name: "Quote Details", visible: true }];
      break;
    case 1:
      steps = [
        { name: "Customer Details", visible: true },
        {
          name: "Bank/Financial Institution Details",
          visible: dto.FinancingType === "Bank/Financial Institution",
        },
        {
          name: "Branch Details 1",
          visible:
            dto.FinancingType === "Bank/Financial Institution" &&
            dto.Bankdetails.BankCategory !== "" &&
            dto.Bankdetails.BankorFinancialInstituionNameinEnglish !== "",
        },
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        {
          name: "Proposer Details",
          visible: dto.FinancingType !== "",
        },
        {
          name: "Insured Details",
          visible: dto.FinancingType !== "",
        },
        // ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        {
          name: "Individual Information",
          visible: dto.FinancingType !== "" && dto.ProposerDetails.InsuredType === "Individual",
        },
        {
          name: dto.ProposerDetails.InsuredType,
          visible:
            dto.FinancingType !== "" &&
            dto.ProposerDetails.InsuredType !== "" &&
            dto.ProposerDetails.InsuredType !== "Individual",
        },
        { name: "Care Of Details", visible: dto.FinancingType !== "" },
        { name: "Proprietor Details", visible: dto.FinancingType !== "" },
        { name: "Other Details", visible: dto.FinancingType !== "" },
      ];
      break;
    case 2:
      steps = [
        { name: "Traveller Details", visible: true },
        ...spreadTravelDetails().filter((x, i) => i !== 0),

        {
          name: "University Details",
          visible: dto.InsurableItem[0].RiskItems[0].ClientType === "Student",
        },
        {
          name: "Sponser Details",
          visible: dto.InsurableItem[0].RiskItems[0].ClientType === "Student",
        },
      ];
      break;
    case 3:
      steps = [
        { name: "Issuing Branch Details", visible: true },
        { name: "Risk Details", visible: true },
      ];
      break;
    case 4:
      steps = [{ name: "Premium Breakup", visible: true }];
      break;

    case 5:
      steps = [{ name: "Payment", visible: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, masters, dto, setDto, setMasters, setBackDropFlag }) => {
  const lDto = dto;
  const masters1 = masters;
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const IsNumeric11 = (number) => {
    // const regex = /^[0-9.]*$/;
    const regex = /^\d{0,3}(\.\d{0,2})?$/;
    if (regex.test(number)) return true;
    return "Allows only number";
  };

  const IsAlphaNum = (str) => {
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(str)) return true;
    return "Enter only alphabets and numbers ";
  };

  if (lDto.FormatedDat !== null && lDto.FormatedData !== undefined) {
    const RSDMDPremiumPDF1 = lDto.FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF;
    const RiderPillionPremiumPDF1 =
      lDto.FormatedData.CalculatedPremiumDetails.RiderPillionPremiumPDF;
    if (RSDMDPremiumPDF1 !== "" && RiderPillionPremiumPDF1 !== "") {
      lDto.FormatedData.CalculatedPremiumDetails.RSDMDRiderPillion = formater.format(
        parseFloat(Number(RSDMDPremiumPDF1) + Number(RiderPillionPremiumPDF1))
          .toFixed(2)
          .toString()
      );
    }
  }

  // const [CPremium, setCPremium] = useState({
  //   GrossPremium: "",
  //   VAT: "",
  //   StampDuty: "",
  //   TotalPremium: "",
  // });
  const [flag] = useState({
    dob: false,
    backdropflag: false,
  });

  const [control] = useDataController();
  const { genericInfo, loginUserDetails } = control;
  // let dto = genericInfo;

  const onBlurTransliteration = async (e, index, EF, ET) => {
    // production
    EF(false);
    ET("");
    // production
    // development
    if (process.env.NODE_ENV === "production") {
      const iText = e.target.value;
      const varName = e.target.name;
      const obj = {
        textList: [{ Text: iText }],
      };
      const res = await Transliteration(obj);
      // const oText = res[0].text;
      const oText = res?.[0]?.text ? res[0].text : "";

      if (varName === "InsuredNameEnglish") lDto.ProposerDetails.InsuredNameNepali = oText;
      if (varName === "InsuredNameEnglish1")
        lDto.ProposerDetailsArray[index].InsuredNameNepali = oText;
      if (varName === "HusbandNameEnglish") lDto.ProposerDetails.HusbandNameNepali = oText;
      if (varName === "WifeNameEnglish") lDto.ProposerDetails.WifeNameNepali = oText;
      if (varName === "ResidenceEnglish")
        lDto.ProposerDetails.CommunicationAddress.ResidenceNepali = oText;
      if (varName === "TempAddresEnglish")
        lDto.ProposerDetails.CommunicationAddress.TemporaryAddressNepali = oText;
      if (varName === "TemporaryAddressEnglish1")
        lDto.ProposerDetails.CommunicationAddress.TemporaryAddressNepali = oText;
      if (varName === "CityEnglish") lDto.ProposerDetails.PermanentAdrress.CityNepali = oText;
      if (varName === "TownEnglish") lDto.ProposerDetails.PermanentAdrress.TownNepali = oText;
      if (varName === "AddressEnglish1")
        lDto.Bankdetails.BranchDetails[index].AddressNepali = oText;
      if (varName === "AddressEnglish3") lDto.Bankdetails.AddressNepali = oText;
      if (varName === "AddressEnglish2")
        lDto.ProposerDetails.PermanentAdrress.AddressNepali = oText;
      if (varName === "AddressEnglish4")
        lDto.ProposerDetails.PermanentAdrress.AddressNepali = oText;

      if (varName === "AddressEnglish5") lDto.RiskAddressDetails.AddressNepali = oText;
      if (varName === "GrandfatherNameEnglish") lDto.ProposerDetails.GrandfatherNameNepali = oText;
      if (varName === "FatherNameEnglish1") lDto.ProposerDetails.FatherNameNepali = oText;
      if (varName === "MemberNameEnglish") lDto.ProposerDetails.MemberNameNepali = oText;
      if (varName === "DesignationEnglish") lDto.ProposerDetails.DesignationNepali = oText;
      if (varName === "HusbandNameEnglish1") lDto.ProposerDetails.HusbandNameNepali = oText;
      if (varName === "WifeNameEnglish1") lDto.ProposerDetails.WifeNameNepali = oText;
      if (varName === "FatherNameEnglish") lDto.ProposerDetails.FatherNameNepali = oText;
      if (varName === "GrandfatherNameEnglish1") lDto.ProposerDetails.GrandfatherNameNepali = oText;
      if (varName === "PermanentAddressEnglish")
        lDto.ProposerDetails.PermanentAdrress.AddressNepali = oText;
      if (varName === "TownEnglish1") lDto.ProposerDetails.PermanentAdrress.TownNepali = oText;
      if (varName === "CityEnglish1") lDto.ProposerDetails.PermanentAdrress.CityNepali = oText;
      if (varName === "TempAddresEnglish")
        lDto.ProposerDetails.CommunicationAddress.TemporaryAddressNepali = oText;
      if (varName === "BankorFinancialInstituionNameinEnglish")
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = oText;
      if (varName === "CareofNameEnglish") lDto.ProposerDetails.CareofNameNepali = oText;
      if (varName === "CareofAddressEnglish") lDto.ProposerDetails.CareofAddressNepali = oText;
      if (varName === "ProprietorNameEnglish") lDto.ProposerDetails.ProprietorNameNepali = oText;
      // if (varName === "GenderEnglish") lDto.ProposerDetails.HusbandNameNepali = oText;
      // if (varName === "MaritalStatusEnglish") lDto.ProposerDetails.MaritalStatusNepali = oText;
      setDto({ ...lDto });
    }
  };

  const GenderNepali = [
    { mID: 1, mValue: "Male", translation: "पुरुष" },
    { mID: 2, mValue: "Female", translation: "महिला" },
    { mID: 3, mValue: "Others", translation: "अन्य" },
  ];
  const handleGender = (e, a, n) => {
    if (n === "GenderEnglish") {
      lDto.ProposerDetails.GenderEnglish = a.mValue;
      lDto.ProposerDetails.GenderNepali = a.translation;
    }
    if (n === "GenderEnglish1") {
      lDto.ProposerDetails.GenderEnglish = a.mValue;
      lDto.ProposerDetails.GenderNepali = a.translation;
    }
    setDto({ ...lDto });
  };

  const handlegeograhy = async (e, a, n) => {
    if (a != null) {
      if (n === "Geography") {
        lDto.InsurableItem[0].RiskItems[0].Geography = a.fieldName;
        lDto.InsurableItem[0].RiskItems[0].Geographylabel = a.mValue;
        if (
          a.mValue === "WorldWide Including USA/CANADA" ||
          a.mValue === "WorldWide Excluding USA/CANADA"
        ) {
          masters1.Plan = masters.Plan1.filter(
            (x) =>
              x.mValue !== "Plan for SAARC Countries" && x.mValue !== "Plan for Asian Countries"
          );
          lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
          lDto.InsurableItem[0].RiskItems[0].Plan = "";
        }
        if (a.mValue === "Asian Countries") {
          masters1.Plan = masters.Plan1.filter(
            (x) =>
              x.mValue !== "Standard Plan" &&
              x.mValue !== "Gold Plan" &&
              x.mValue !== "Platinum Plan" &&
              x.mValue !== "Plan for SAARC Countries"
          );
          lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
          lDto.InsurableItem[0].RiskItems[0].Plan = "";
        }
        if (a.mValue === "SAARC Countries") {
          masters1.Plan = masters.Plan1.filter(
            (x) =>
              x.mValue !== "Standard Plan" &&
              x.mValue !== "Gold Plan" &&
              x.mValue !== "Platinum Plan" &&
              x.mValue !== "Plan for Asian Countries"
          );
          lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
          lDto.InsurableItem[0].RiskItems[0].Plan = "";
        }
        if (
          lDto.InsurableItem[0].RiskItems[0].ClientType === "Student" &&
          (a.mValue === "WorldWide Including USA/CANADA" ||
            a.mValue === "WorldWide Excluding USA/CANADA")
        ) {
          masters1.Plan = masters.Plan1.filter(
            (x) =>
              x.mValue !== "Plan for Asian Countries" &&
              x.mValue !== "Gold Plan" &&
              x.mValue !== "Platinum Plan" &&
              x.mValue !== "Plan for SAARC Countries"
          );

          lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
          lDto.InsurableItem[0].RiskItems[0].Plan = "";
        }
      } else {
        lDto.InsurableItem[0].RiskItems[0].Geography = "";
        lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
      }
    } else {
      lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
      lDto.InsurableItem[0].RiskItems[0].Geography = "";
      lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
      lDto.InsurableItem[0].RiskItems[0].Plan = "";
      lDto.InsurableItem[0].RiskItems[0].ClientType = "";
      lDto.SubClass = "";
    }
    console.log(masters1.Plan);
    setMasters({ ...masters1 });
    setDto({ ...lDto });
  };
  const handleplan = async (e, a, n) => {
    if (n === "Plan" && a !== null) {
      // if (a !== null) {
      lDto.InsurableItem[0].RiskItems[0].Plan = a.description;
      lDto.InsurableItem[0].RiskItems[0].Planlabel = a.mValue;
    } else {
      lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
      lDto.InsurableItem[0].RiskItems[0].Plan = "";
      lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
      lDto.InsurableItem[0].RiskItems[0].Geography = "";
      // lDto.InsurableItem[0].RiskItems[0].ClientType = "";
    }
    // }
    setMasters({ ...masters1 });
    setDto({ ...lDto });
  };
  const MaritalStatus = [
    { mID: 1, mValue: "Unmarried", translation: "अविवाहित" },
    { mID: 2, mValue: "Married", translation: "विवाहित" },
    { mID: 3, mValue: "Divorced", translation: "विभाजक" },
    { mID: 4, mValue: "Widow", translation: "विधवा" },
  ];
  const handleMarital = (_e, a, n) => {
    if (n === "MaritalStatusEnglish") {
      lDto.ProposerDetails.MaritalStatusEnglish = a.mValue;
      lDto.ProposerDetails.MaritalStatusNepali = a.translation;
    }
    if (n === "MaritalStatusEnglish1") {
      lDto.ProposerDetails.MaritalStatusEnglish = a.mValue;
      lDto.ProposerDetails.MaritalStatusNepali = a.translation;
    }
    setDto({ ...lDto });
  };

  const onTravellerDOB = (e, v, i1) => {
    objectPath.set(dto, `InsurableItem.0.RiskItems.${i1}.DateofBirth`, v);
    const date = DateFormatFromStringDate(v, "d-m-y", "m-d-y");
    const age = AgeCalculator(new Date(date));
    objectPath.set(dto, `InsurableItem.0.RiskItems.${i1}.Age`, age.toString());
    setDto({ ...dto });
  };

  const onDOBselect = async (e, d) => {
    // debugger;
    const date = DateFormatFromStringDate(d, "d-m-y", "m-d-y");
    // console.log(date, d);
    const age = AgeCalculator(new Date(date));
    lDto.InsurableItem[0].RiskItems[0].DateofBirth = d;
    lDto.InsurableItem[0].RiskItems[0].Age = age.toString();

    lDto.ProductLogo = genericInfo.ProductLogo;
    lDto.CompanyName = process.env.REACT_APP_CompanyName;
    lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
    lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
    lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;

    if (
      localStorage.getItem("NepalCompanySelect") !== null ||
      process.env.REACT_APP_EnvId !== "297"
    ) {
      let Company = "";
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Company = "NMIC";
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Company = "PMIC";
      }
      await GetProdPartnermasterData("BranchName", {
        Description: Company,
      }).then((res) => {
        masters1.IssuingBranch = res.data;
        lDto.ICShortName = res.data[0].Description;
      });
      // setGenericPolicyDto(dispatch, dto);
    }
    if (d !== null) {
      // debugger;
      if (
        (lDto.InsurableItem[0].RiskItems[0].ClientType === "Student" &&
          lDto.InsurableItem[0].RiskItems[0].Age >= 40) ||
        lDto.InsurableItem[0].RiskItems[0].Age >= 71
      ) {
        if (lDto.InsurableItem[0].RiskItems[0].ClientType === "Student") {
          swal.fire({
            icon: "error",
            text: "Maximum Age For Student Plan is 40 Years Only ",
            confirmButtonColor: "#0079CE",
          });
        }
        // else {
        //   swal.fire({
        //     icon: "error",
        //     text: "Maximum Age For Annual Multi Trip policy is 70 Years Only",
        //     confirmButtonColor: "#0079CE",
        //   });
        // }
        lDto.InsurableItem[0].RiskItems[0].IsAnnualMultiTrip = "No";
        // lDto.InsurableItem[0].RiskItems[0].DateofBirth = "";
        // lDto.InsurableItem[0].RiskItems[0].Age = "";
      }
    }

    setDto({ ...lDto });
  };

  // For PolicyStartDate And EndDate
  const handlePolicyDates = (days1) => {
    if (lDto.PolicyStartDate !== "" && lDto.NumberofDays !== undefined) {
      if (/^[0-9]*$/.test(days1.target.value) === true) {
        lDto.NumberofDays = days1.target.value;
        if (NumBetween(lDto.NumberofDays, 0, 366)) {
          lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
        } else {
          lDto.NumberofDays = "";
          lDto.PolicyEndDate = "";
        }
      }
    }
    setDto({ ...lDto });
  };

  const handledays = (e, d) => {
    // debugger;
    lDto.PolicyStartDate = d;
    if (lDto.PolicyStartDate !== "") {
      lDto.NumberofDays = "";
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };

  // const OnPSDSelect = (e, d) => {
  //   // console.log(d, 99);
  //   debugger;
  //   lDto.PolicyStartDate = d;
  //   const days = lDto.NumberofDays;
  //   if (d !== "" && d !== undefined) {
  //     const date1 = addDays(DateFormatFromStringDate(d, "m/d/y", "m-d-y"), lDto.NumberofDays);

  //     lDto.PolicyEndDate = DateFormatFromStringDate(date1, "m-d-y", "m/d/y");
  //   } else {
  //     const date1 = addDays(DateFormatFromStringDate(d, "m/d/y", "m-d-y"), days);

  //     lDto.PolicyEndDate = DateFormatFromStringDate(date1, "m-d-y", "m/d/y");
  //   }
  //   setDto({ ...lDto });
  // };

  const handleotherloading = (OtherLoading) => {
    lDto.InsurableItem[0].RiskItems[0].OtherLoadingCharge = OtherLoading.target.value;
    lDto.InsurableItem[0].RiskItems[0].OtherLoadingChargeusd =
      (OtherLoading.target.value / 100) *
      lDto.InsurableItem[0].RiskItems[0].AdditionalMultiplyingRate *
      lDto.PremiumDetails.PremiumAfterCorporateDiscount;

    setDto({ ...lDto });
  };

  const handlecovidloading = (covidLoading) => {
    lDto.InsurableItem[0].RiskItems[0].CovidLoadingCharge = covidLoading.target.value;
    lDto.InsurableItem[0].RiskItems[0].CovidLoadingChargeusd =
      (covidLoading.target.value / 100) *
      lDto.InsurableItem[0].RiskItems[0].AdditionalMultiplyingRate *
      lDto.PremiumDetails.PremiumAfterCorporateDiscount;

    const totalval =
      lDto.PremiumDetails.PremiumAfterCorporateDiscount *
        lDto.InsurableItem[0].RiskItems[0].AdditionalMultiplyingRate +
      (lDto.InsurableItem[0].RiskItems[0].OtherLoadingChargeusd +
        lDto.InsurableItem[0].RiskItems[0].CovidLoadingChargeusd);

    // lDto.PremiumDetails.UpdatedPremium = totalval.toString();
    lDto.InsurableItem[0].RiskItems[0].TotalPremiuminusd = totalval.toString();
    setDto({ ...lDto });
  };

  const OnPlaceSelect = async (e, a, n, index) => {
    if (n === "State1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.Bankdetails.ProvinceorState = a.mValue;
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.Municipality = "";
        masters1.District1 = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
      }
    }
    if (n === "District1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.Bankdetails.District = a.mValue;
        lDto.Bankdetails.Municipality = "";
        masters1.Municipality1 = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
      }
    }
    // if (n === "Municipality1") {
    //   lDto.Bankdetails.Municipality = a.mValue;
    // }
    if (n === "State2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.ProposerDetails.PermanentAdrress.ProvinceState = a.mValue;
        lDto.ProposerDetails.PermanentAdrress.District = "";
        lDto.ProposerDetails.PermanentAdrress.Municipality = "";
        masters1.District2 = res.data;
        masters1.Municipality2 = [];
      } else {
        lDto.ProposerDetails.PermanentAdrress.ProvinceState = "";
        lDto.ProposerDetails.PermanentAdrress.District = "";
        lDto.ProposerDetails.PermanentAdrress.Municipality = "";
        lDto.ProposerDetails.PermanentAdrress.WardNumber = "";
      }
    }
    if (n === "District2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.ProposerDetails.PermanentAdrress.District = a.mValue;
        lDto.ProposerDetails.PermanentAdrress.Municipality = "";
        masters1.Municipality2 = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.ProposerDetails.PermanentAdrress.District = "";
        lDto.ProposerDetails.PermanentAdrress.Municipality = "";
        lDto.ProposerDetails.PermanentAdrress.WardNumber = "";
      }
    }
    // if (n === "Municipality2") {
    //   lDto.ProposerDetails.PermanentAdrress.Municipality = a.mValue;
    // }
    if (n === "State3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].ProvinceState = a.mValue;
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.placeMasters[index].Districtnew = res.data;
        // masters1.Municipalitynew = [];
      } else {
        lDto.Bankdetails.BranchDetails[index].ProvinceState = "";
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }
    if (n === "District3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].District = a.mValue;
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.placeMasters[index].Municipalitynew = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }

    // if (n === "Municipality3") {
    //   lDto.Bankdetails.BranchDetails[index].Municipality = a.mValue;
    // }

    if (n === "State4") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.RiskAddressDetails.ProvinceState = a.mValue;
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        masters1.District3 = res.data;
        // masters1.Municipality3 = [];
      } else {
        lDto.RiskAddressDetails.ProvinceState = "";
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
      }
    }

    if (n === "District4") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.RiskAddressDetails.District = a.mValue;
        lDto.RiskAddressDetails.Municipality = "";
        masters1.Municipality3 = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
      }
    }
    // if (n === "Municipality4") {
    //   lDto.RiskAddressDetails.Municipality = a.mValue;
    // }
    if (n === "State5") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.ProposerDetailsArray[index].PermanentAdrress.ProvinceState = a.mValue;
        lDto.ProposerDetailsArray[index].PermanentAdrress.District = "";
        lDto.ProposerDetailsArray[index].PermanentAdrress.Municipality = "";
        masters1.placeMasters[index].District5 = res.data;
        // masters1.Municipalitynew = [];
      } else {
        lDto.ProposerDetailsArray[index].PermanentAdrress.ProvinceState = "";
        lDto.ProposerDetailsArray[index].PermanentAdrress.District = "";
        lDto.ProposerDetailsArray[index].PermanentAdrress.Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }
    if (n === "District5") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.ProposerDetailsArray[index].PermanentAdrress.District = a.mValue;
        lDto.ProposerDetailsArray[index].PermanentAdrress.Municipality = "";
        masters1.placeMasters[index].Municipality5 = res.data;
      }
    }
    setDto({ ...lDto });
    setMasters({ ...masters1 });
  };

  const onAddBranchDetails = () => {
    lDto.Bankdetails.BranchDetails.push({ ...BranchDetails() });
    masters1.placeMasters.push({ district: [], municipality: [] });
    setDto({ ...lDto });
  };
  const RemoveTravellerDetails = (i) => {
    const arr = lDto.InsurableItem[0].RiskItems.filter((x, i1) => i1 !== i);
    lDto.InsurableItem[0].RiskItems = arr;
    setDto({ ...lDto });
  };

  // Handle the insured also a traveller
  const HandleTraveller = (e) => {
    // debugger;
    lDto.IsinsuredAlsoTraveller = e.target.value;
    // const selectedOption = e.target.value;
    if (lDto.IsinsuredAlsoTraveller === "Yes") {
      const parts = lDto.ProposerDetails.DoB.split("/");
      if (parts.length === 3) {
        lDto.ProposerDetails.DoB = `${parts[0]}-${parts[1]}-${parts[2]}`;
      }
      if (lDto.InsurableItem[0].RiskItems[0].DateofBirth !== lDto.ProposerDetails.DoB) {
        swal.fire({
          icon: "error",
          text: "DOB Provided In Customer Details Page Is Not Matching As Provided In The Quote Page",
          confirmButtonColor: "#0079CE",
        });
        lDto.IsinsuredAlsoTraveller = "No";
        lDto.InsurableItem[0].RiskItems[0].InsuredName = "";
        lDto.InsurableItem[0].RiskItems[0].Address = "";
        lDto.InsurableItem[0].RiskItems[0].PassportNumber = "";
        lDto.InsurableItem[0].RiskItems[0].MobileNumber = "";
        lDto.InsurableItem[0].RiskItems[0].Occupation = "";
      } else {
        lDto.InsurableItem[0].RiskItems[0].InsuredName = lDto.ProposerDetails.InsuredNameEnglish;
        lDto.InsurableItem[0].RiskItems[0].Address =
          lDto.ProposerDetails.PermanentAdrress.AddressEnglish;
        lDto.InsurableItem[0].RiskItems[0].PassportNumber = lDto.ProposerDetails.PassportNumber;
        lDto.InsurableItem[0].RiskItems[0].MobileNumber = lDto.ProposerDetails.MobileNumber;
        lDto.InsurableItem[0].RiskItems[0].Occupation = lDto.ProposerDetails.Occuptation;
      }
    } else if (lDto.IsinsuredAlsoTraveller === "No") {
      lDto.InsurableItem[0].RiskItems[0].InsuredName = "";
      lDto.InsurableItem[0].RiskItems[0].Address = "";
      lDto.InsurableItem[0].RiskItems[0].PassportNumber = "";
      lDto.InsurableItem[0].RiskItems[0].MobileNumber = "";
      lDto.InsurableItem[0].RiskItems[0].Occupation = "";
    }
    setDto({ ...lDto });
  };

  // For Proposal DOB
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear() - 16);

  // regex for Traveller name
  const IsAlphabeticSpecialNoSpace = (str) => {
    const regex = /^[a-zA-Z!@#$%^&*()_+\-={};':"|,.<>? ]*$/;
    if (regex.test(str) || str === "") {
      return true;
    }
    return "Allows only alphabets and special characters";
  };

  // Handle Traveller age Calculator
  // const Handleage = () => {
  //   debugger;
  // };

  // handle Dublicate Passport number

  const handleDublicatePass = (e, PassportNumber, index) => {
    // debugger;
    console.log(11);
    lDto.InsurableItem[0].RiskItems.forEach((x, i) => {
      if (x.PassportNumber === e.target.value && i !== index) {
        lDto.InsurableItem[0].RiskItems[index].PassportNumber = "";
        swal1({
          icon: "error",
          text: `"${PassportNumber}" Already Exist`,
        });
      }
    });
    setDto({ ...lDto });
  };

  // const valueinenglish = "";

  const spreadTravelDetails = () => {
    const arr = [];
    dto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push([
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 10,
        },
        {
          type: "Button",
          label: "Delete",
          // visible: true,
          spacing: 2,
          variant: "contained",
          align: "right",
          visible: i !== 0,
          onClick: () => RemoveTravellerDetails(i),
        },
        // {
        //   type: "Button",
        //   label: "Browse Insured Name Detail",
        //   align: "left",
        //   spacing: 12,
        //   variant: "contained",
        //   visible: i === 0,
        // },
        {
          type: "RadioGroup",
          visible: i === 0,
          path: "IsinsuredAlsoTraveller",
          required: true,
          InputProps: { DefaultValue: "No" },
          disableOnReset: true,
          radioLabel: { label: "Is Insured also a traveler?", labelVisible: true },
          radioList: [
            { value: "Yes", label: "Yes" },
            {
              value: "No",
              label: "No",
            },
          ],
          customOnChange: (e) => HandleTraveller(e),
          spacing: 5,
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 10,
        },
        {
          type: "Input",
          label: "Traveller Name",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.InsuredName`,
          onChangeFuncs: [IsAlphabeticSpecialNoSpace],
        },
        {
          type: "MDDatePicker",
          label: "Date of Birth",
          required: true,
          disableOnReset: true,
          // dateFormat: "d-m-Y",
          // maxDate: `${new Date().getDate()}-${new Date().getMonth() + 1}-${
          //   new Date().getFullYear() - 18
          // }`,
          path: `InsurableItem.0.RiskItems.0.DateofBirth`,
          visible: i === 0,
          disabled: true,
        },
        {
          type: "MDDatePicker",
          label: "Date of Birth",
          // InputProps: { disabled: true },
          dateFormat: "d-m-Y",
          maxDate: `${new Date().getDate()}-${new Date().getMonth() + 1}-${
            new Date().getFullYear() - 5
          }`,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.DateofBirth`,
          disableOnReset: true,
          visible: i !== 0,
          customOnChange: (e, v) => onTravellerDOB(e, v, i),
        },
        {
          type: "Input",
          label: "Address",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.Address`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Passport Number",
          visible: true,
          required: true,
          name: "PassportNumber",
          path: `InsurableItem.0.RiskItems.${i}.PassportNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          customOnBlur: (e) => handleDublicatePass(e, "PassportNumber", i),
          InputProps: { maxLength: 12 },
        },
        {
          type: "Input",
          label: "Place to Visit",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.PlacetoVisit`,
          onChangeFuncs: [IsAlphabeticSpecialNoSpace],
        },
        {
          type: "Input",
          label: "CO(Care Of)",
          path: "",
          visible: i === 0,
          onChangeFuncs: [IsAlphabeticSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Contact No",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.MobileNumber`,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
        },
        {
          type: "Input",
          label: "Nature Of Job",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.NatureofJob`,
          onChangeFuncs: [IsAlphabeticSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Occupation",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.Occupation`,
          onChangeFuncs: [IsAlphabeticSpecialNoSpace],
        },

        {
          type: "Input",
          label: "Visa Number",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.VisaNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
        },

        {
          type: "Checkbox",
          label: "Is Dependent?",
          checkedVal: "Yes",
          uncheckedVal: "No",
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.IsDependent`,
          visible: i !== 0,
          // visible:
          //   lDto.InsurableItem[0].RiskItems[i].Age !== "" &&
          //   lDto.InsurableItem[0].RiskItems[i].Age <= 5 &&
          //   lDto.InsurableItem[0].RiskItems[i].DateofBirth !== "",
          // disableOnReset: false,
        },
        {
          type: "Input",
          label: "Relation",
          path: `InsurableItem.0.RiskItems.${i}.Relation`,
          visible: i !== 0,
        },
      ]);
    });
    return arr;
  };

  const onAddTravellerDetails = async () => {
    lDto.InsurableItem[0].RiskItems.push({ ...AddTravellerDetailsjson() });

    setDto({ ...lDto });
  };
  const RemoveBranchDetails = (i) => {
    const arr = dto.Bankdetails.BranchDetails.filter((x, i1) => i1 !== i);
    lDto.Bankdetails.BranchDetails = arr;
    setDto({ ...lDto });
  };

  const handleBranchName = async (e, a, i) => {
    // debugger;
    if (a !== null) {
      lDto.Bankdetails.BranchDetails[i].Bank = a.mValue;
      lDto.Bankdetails.BranchDetails[i].Country = a.Country;
      lDto.Bankdetails.BranchDetails[i].ProvinceState = a.Province;
      lDto.Bankdetails.BranchDetails[i].District = a.District;
      lDto.Bankdetails.BranchDetails[i].Municipality = a.Municipality;
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = a.mValue;
      lDto.Bankdetails.BranchDetails[i].WardNumber = a.WardNo;
      if (process.env.NODE_ENV === "production") {
        const obj = {
          textList: [{ Text: a.mValue }],
        };
        const res = await Transliteration(obj);
        // objectPath.set(dto, `Bankdetails.BranchDetails.${i}.AddressNepali`, res[0].text);
        // lDto.Bankdetails.BranchDetails[i].AddressNepali = res[0].text;
        lDto.Bankdetails.BranchDetails[i].AddressNepali = res[0].text;
      }
    } else {
      lDto.Bankdetails.BranchDetails[i].Bank = "";
      lDto.Bankdetails.BranchDetails[i].Country = "";
      lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
      lDto.Bankdetails.BranchDetails[i].District = "";
      lDto.Bankdetails.BranchDetails[i].Municipality = "";
      // lDto.Bankdetails.BranchDetails[i].Address = "";
      lDto.Bankdetails.BranchDetails[i].WardNumber = "";
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
      lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
    }
    setDto({ ...lDto });
  };

  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push([
        {
          type: "Button",
          label: "Delete",
          spacing: 12,
          visible: i !== 0,
          justifyContent: "end",
          onClick: () => RemoveBranchDetails(i),
        },
        {
          type: "AutoComplete",
          label: "Branch Name",
          required: true,
          visible: masters.BranchMasters.length > 0,
          options: masters.BranchMasters,
          path: `Bankdetails.BranchDetails.${i}.Bank`,
          // visible: true,
          // onChangeFuncs: [IsFreetextNoSpace],
          customOnChange: (e, a) => handleBranchName(e, a, i),
        },
        {
          type: "Input",
          label: "Country",
          path: `Bankdetails.BranchDetails.${i}.Country`,
          visible: masters.BranchMasters.length > 0,
          required: true,
          disableOnReset: true,
          disabled: true,
          // options: masters.Country,
        },
        {
          type: "Input",
          label: "Province/State",
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          // options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "State3", i),
          required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "District",
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.District`,
          // options:
          //   lDto.Bankdetails.BranchDetails[i].ProvinceState !== ""
          //     ? masters.placeMasters[i].Districtnew
          //     : [],

          // customOnChange: (e, a) => OnPlaceSelect(e, a, "District3", i),
          required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "Municipality",
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          // options:
          //   lDto.Bankdetails.BranchDetails[i].District !== ""
          //     ? masters.placeMasters[i].Municipalitynew
          //     : [],
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality3", i),
          visible: masters.BranchMasters.length > 0,
          disabled: true,
        },
        {
          type: "Input",
          label: "Ward Number",
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          visible: masters.BranchMasters.length > 0,
          // options: masters.WardNumber,
          disabled: true,
        },
        {
          type: "Input",
          label: "Address(English)",
          name: "AddressEnglish1",
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          visible: masters.BranchMasters.length > 0,
          required: true,
          disabled: true,
          // customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          // onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Branch Name",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          path: `Bankdetails.BranchDetails.${i}.Bank`,
        },
        {
          type: "AutoComplete",
          label: "Country",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          options: masters.Country,
          disableOnReset: true,
          readOnly: true,
          // customOnChange: (e, a) => onPlaceSelect(e, a, "Country2", i + 1),
          disabled: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          required: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: masters.State,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State3", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          required: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.District`,
          options: masters.placeMasters[i].Districtnew,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District3", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          options: masters.placeMasters[i].Municipalitynew,
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          options: masters.WardNumber,
        },
        {
          type: "Input",
          label: "Address(English)",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          name: "AddressEnglish1",
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Address(Nepali)",
          path: `Bankdetails.BranchDetails.${i}.AddressNepali`,
          visible: true,
          // required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "Area",
          path: `Bankdetails.BranchDetails.${i}.Area`,
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/Street Name",
          path: `Bankdetails.BranchDetails.${i}.ToleStreetName`,
          visible: true,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "House Number",
          path: `Bankdetails.BranchDetails.${i}.HouseNumber`,
          visible: true,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Plot Number",
          path: `Bankdetails.BranchDetails.${i}.PlotNumber`,
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Contact Person 1",
          path: `Bankdetails.BranchDetails.${i}.ContactPerson1`,
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact Person 2",
          path: `Bankdetails.BranchDetails.${i}.ContactPerson2`,
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact Person 3",
          path: `Bankdetails.BranchDetails.${i}.ContactPerson3`,
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Phone Number",
          path: `Bankdetails.BranchDetails.${i}.PhoneNumber`,
          visible: true,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
          // InputProps: { maxLength: 11 },
        },
        {
          type: "Input",
          label: "Mobile Number",
          path: `Bankdetails.BranchDetails.${i}.MobileNumber`,
          visible: true,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
        },
        {
          type: "Input",
          label: "Fax Number",
          path: `Bankdetails.BranchDetails.${i}.FaxNumber`,
          visible: true,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Branch Manager",
          path: `Bankdetails.BranchDetails.${i}.BranchManager`,
          visible: true,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Email ID",
          path: `Bankdetails.BranchDetails.${i}.Email`,
          visible: true,
          onChangeFuncs: [IsEmail],
        },
        {
          type: "Typography",
          label: "",
          spacing: 12,
          visible: true,
        },
      ]);
    });
    return arr;
  };

  const OnProfilePicture = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData);
    lDto.ProposerDetails.ProfilePicture = file.name;
    setDto({ ...lDto });
    swal.fire({
      icon: "success",
      text: "Profile Picture uploaded successfully",
    });
  };

  const onCancelClickProfilePicture = async () => {
    // lDto.ProposerDetails.ProfilePicture = e.target.value;
    const file = lDto.ProposerDetails.ProfilePicture;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails.ProfilePicture = "";
        setDto({ ...lDto });
      }
    });
  };

  const onDocUplode = async (file, i) => {
    // console.log(event);
    // const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        lDto.documentDetails[i].FileName = file.name;
        lDto.documentDetails[i].UploadDocDate = new Date().toLocaleDateString();
        lDto.documentDetails[i].DocId = result.data[0].docid;
        setDto({ ...lDto });
        swal.fire({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };

  const handleFileUpload = async (event, index) => {
    await onDocUplode(event.target.files[0], index);
  };
  const onCancelClick = async (index) => {
    const file = lDto.documentDetails[index].FileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.documentDetails[index].FileName = "";
        lDto.documentDetails[index].DocId = "";
        lDto.documentDetails[index].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };

  const handleDocFileDelete = async (i) => {
    const file = lDto.documentDetails[i].FileName;
    if (file !== "") await DeleteDocument(file);
    const arr1 = dto.documentDetails.filter((x, i1) => i1 !== i);
    lDto.documentDetails = arr1;
    setDto({ ...lDto });
  };
  // handle doc name

  const onAddDocument = () => {
    lDto.documentDetails = [...dto.documentDetails, { ...docDetails() }];
    setDto({ ...lDto });
  };

  // const handleDocName = (e, i) => {
  //   console.log(e, i);
  //   if (e.target.name === "DocName") {
  //     if (IsFreetextNoSpace(e.target.value) === true) {
  //       lDto.documentDetails[i].DocName = e.target.value;

  //       setDto({ ...lDto });
  //     }
  //   }
  // };

  const handleDublicateDoc = (e, DocName, index) => {
    console.log(11111111);
    // debugger;
    lDto.documentDetails.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        lDto.documentDetails[index].DocName = "";
        swal1({
          icon: "error",
          text: `"${(lDto.documentDetails[index].DocName = e.target.value)}" Already Exist`,
        });
        lDto.documentDetails[index].DocName = "";
      }
    });
    setDto({ ...lDto });
  };

  const spreadDocumentDetails = () => {
    const arr = [];
    dto.documentDetails.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: true,
          name: "DocName",
          label: "Document Name",
          path: `documentDetails.${i}.DocName`,
          onChangeFuncs: [IsFreetextNoSpace],
          customOnBlur: (e) => handleDublicateDoc(e, "DocName", i),
        },
        {
          type: "Button",
          visible: true,
          spacing: 2,
          component: "label",
          label: "Upload",
          typeFormat: (
            <input
              hidden
              name={i}
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: x.FileName,
          spacing: 3,
          visible: x.FileName !== "",
        },
        {
          type: "IconButton",
          icon: "close",
          spacing: 2.9,
          visible: x.FileName !== "",
          onClick: () => onCancelClick(i),
        },
        {
          type: "IconButton",
          icon: "delete",
          color: "primary",
          spacing: 0.1,
          visible: i !== 0,
          onClick: () => handleDocFileDelete(i),
        },
        {
          type: "TypographyVal",
          label: "",
          spacing: 12,
          visible: true,
        }
      );
    });
    return arr;
  };

  const handlesubclass = async (_e, a) => {
    // debugger;
    if (a !== null) {
      lDto.SubClass = a.mValue;
      if (a.mValue === "Travel Medical Comprehensive") {
        // masters1.ClientType = masters.ClientType.filter((x) => x.mValue !== "Student");
        // await GetNPCommonMaster().then((r) => {
        //   r.forEach((x) => {
        //     masters1[x.mType] = x.mdata;
        //   });
        //   masters1.SubClass = masters.SubClass.filter(
        //     (x) => x.fieldName === "TravelMedicalInsurance"
        //   );

        // });
        masters1.ClientType = masters.ClientType.filter((x) => x.mValue !== "Student");
        lDto.InsurableItem[0].RiskItems[0].ClientType = "";
        lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
        lDto.InsurableItem[0].RiskItems[0].Plan = "";
        lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
        lDto.InsurableItem[0].RiskItems[0].Geography = "";
      } else if (a.mValue === "Travel Medical") {
        lDto.InsurableItem[0].RiskItems[0].ClientType = "";
        lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
        lDto.InsurableItem[0].RiskItems[0].Plan = "";
        lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
        lDto.InsurableItem[0].RiskItems[0].Geography = "";
        await GetNPCommonMaster().then((r) => {
          r.forEach((x) => {
            masters1[x.mType] = x.mdata;
          });
          masters1.SubClass = masters.SubClass.filter(
            (x) => x.fieldName === "TravelMedicalInsurance"
          );
        });
      }
      setMasters({ ...masters1 });
      setDto({ ...lDto });
    } else {
      lDto.InsurableItem[0].RiskItems[0].ClientType = "";
      lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
      lDto.InsurableItem[0].RiskItems[0].Plan = "";
      lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
      lDto.InsurableItem[0].RiskItems[0].Geography = "";
      lDto.SubClass = "";

      setDto({ ...lDto });
    }
  };

  const handleClientType = async (_e, a) => {
    // debugger;
    if (a !== null) {
      // debugger;
      const Sub = lDto.SubClass;
      lDto.InsurableItem[0].RiskItems[0].ClientType = a.mValue;

      if (
        Sub === "Travel Medical Comprehensive" &&
        (a.mValue === "Individual" || a.mValue === "Family")
      ) {
        // masters1.Geography = masters.Geography.filter((x) => x.mValue !== "Asian Countries");
        masters1.Geography = masters.Geography1.filter((x) => x.mValue !== "SAARC Countries");
        lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
        lDto.InsurableItem[0].RiskItems[0].Plan = "";
        lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
        lDto.InsurableItem[0].RiskItems[0].Geography = "";
      } else if (a.mValue === "Family") {
        lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
        lDto.InsurableItem[0].RiskItems[0].Plan = "";
        lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
        lDto.InsurableItem[0].RiskItems[0].Geography = "";
      } else if (a.mValue === "Student") {
        masters1.Geography = masters.Geography1.filter((x) => x.mValue !== "Asian Countries");
        lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
        lDto.InsurableItem[0].RiskItems[0].Plan = "";
        lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
        lDto.InsurableItem[0].RiskItems[0].Geography = "";
      }
    } else {
      lDto.InsurableItem[0].RiskItems[0].ClientType = "";
      lDto.InsurableItem[0].RiskItems[0].Planlabel = "";
      lDto.InsurableItem[0].RiskItems[0].Plan = "";
      lDto.InsurableItem[0].RiskItems[0].Geographylabel = "";
      lDto.InsurableItem[0].RiskItems[0].Geography = "";
      lDto.InsurableItem[0].RiskItems[0].ClientType = "";
      // lDto.SubClass = "";
    }

    setMasters({ ...masters1 });
    setDto({ ...lDto });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [savemodalopen, setsavemodalopen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const SavehandleModalOpen = () => {
    setsavemodalopen(true);
  };
  const SavehandleModalClose = () => {
    setsavemodalopen(false);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSavepolicyWFStatus = async () => {
    // debugger;
    const proposalNo = objectPath.get(dto, "proposalNo");
    if (genericInfo.Flow && genericInfo.Flow === "DisApproveFlow") {
      const obj = {
        Stage: "Proposal",
        Status: "307",
        WorkFlowType: "Agent",
        wfstageStatusId: "315",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj);
      const wfID = localStorage.getItem("wfIDforNepal");
      if (wfID !== null) {
        await UpdateWorkflowStatus(wfID, 263).then(() => {
          localStorage.removeItem("wfIDforNepal");
        });
      }
    }

    if (genericInfo.Flow && genericInfo.Flow === "DebitFlow") {
      const a = {
        Stage: "Proposal",
        Status: "322",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SavepolicyWFStatus(genericInfo.proposalNo, dto.ProductCode, a);
    } else {
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);
    }
    handleModalOpen();
    // }
  };

  const handlesavedebitnote = () => {
    SavehandleModalOpen();
  };
  const generateFile = (content, fileName) => {
    // console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };

  const Navigate = useNavigate();
  const onModalclose = () => {
    Navigate("/retail/home");
  };

  const onSaveModalClose = async () => {
    if (genericInfo && genericInfo.proposalNo !== undefined) {
      await UpdateProposalDetails(lDto).then(async () => {
        if (
          genericInfo.Flow &&
          (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
        ) {
          swal
            .fire({
              icon: "success",
              text: "Details Saved Successfully",
              confirmButtonColor: "#0079CE",
            })
            .then((result) => {
              if (result.isConfirmed) {
                Navigate("/retail/home");
              }
            });
        }
      });
    } else {
      const proposalNo = objectPath.get(dto, "proposalNo");
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "322",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);
      SavehandleModalClose();
      swal
        .fire({
          html: `<div> <img src=${Success} alt="success">
          <br>Debit Note Saved Successfully</br>
          ${proposalNo}
          </div>`,
          // title: "Debit Note Saved Successfully",
          showConfirmButton: true,
          confirmButtonText: "OK",
          allowOutsideClick: false,
          confirmButtonColor: "#0079CE",
        })
        .then((result) => {
          if (result.isConfirmed) {
            Navigate("/retail/home");
          }
        });
    }
  };

  const onDebitNoteClick = async (e, key) => {
    // debugger;
    // setBackDropFlag(true);
    let Class = "";

    if (
      localStorage.getItem("NepalCompanySelect") !== "" ||
      process.env.REACT_APP_EnvId === "1"
      // localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC"
    ) {
      Class = 238;
    }

    const proposalNo = objectPath.get(dto, "proposalNo");
    const downloadDTO = {
      key: lDto.proposalNo,
      keyValue: "",
      templateKey: "",
      templateId: Class,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };
    await GetTemplatePayload(downloadDTO).then((result) => {
      // console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNo);
        // setBackDropFlag(false);
      }
    });
    if (key === "SAVE DEBIT NOTE") {
      onSaveModalClose();
    }
  };
  const CalculatePremiumfunc = async () => {
    // debugger;
    setBackDropFlag(true);
    const calfun = await GenericApi("NPTMI", "NepalTMIRatingAPI", lDto).then(async (x) => {
      if (
        lDto.InsurableItem[0].RiskItems[0].Planlabel !== "" &&
        lDto.InsurableItem[0].RiskItems[0].Geographylabel !== "" &&
        lDto.NumberofDays !== "" &&
        lDto.PolicyStartDate !== ""
      ) {
        if (x.finalResult) {
          objectPath.set(lDto, "PremiumDetails", x.finalResult);
          lDto.InsurableItem[0].RiskItems[0].TotalPremiuminusd =
            lDto.PremiumDetails.PremiumAfterCorporateDiscount;
          setDto({ ...lDto });
        }
      } else {
        swal.fire({
          icon: "error",
          text: "Please fill the required fields",
          confirmButtonColor: "#0079CE",
        });
      }
    });
    console.log("calfun", calfun);
    setBackDropFlag(false);
  };
  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = lDto.ProposerDetails.EmailId;
      let Class = "";
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 234;
      }
      if (localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC") {
        Class = 234;
      }
      const obj = {
        proposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: lDto.proposalNo,
        keyType: "BGRProposal",
        communicationId: Class,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      if (EmailAddress !== "") {
        const res = await SendNotification(EmailAddress, obj);
        if (res.data.status === 1) {
          swal.fire({
            icon: "success",
            text: "E-Mail Sent succesfully",
            confirmButtonColor: "#0079CE",
          });
        } else {
          swal.fire({
            icon: "error",
            text: "E-Mail not sent as Incorrect E-Mail ID is captured in Customer Details Screen",
            confirmButtonColor: "#0079CE",
          });
        }
      } else {
        swal.fire({
          icon: "error",
          text: "E-Mail not sent as E-Mail ID is not captured in Customer Details Screen",
          confirmButtonColor: "#0079CE",
        });
      }
      setDto({ ...lDto });
    }
  };

  const handleIssuingBranch = (e, a, key) => {
    // debugger;
    if (key === "InsuredType") {
      if (a !== null) {
        lDto.ProposerDetails.InsuredType = a.mValue;
        lDto.InsuredTypeCode = a.shortCode;
        if (lDto.ProvinceCode !== undefined) {
          lDto.Prefix = lDto.ProvinceCode.concat("/", a.shortCode)
            .concat("/", lDto.ShortCode, "/")
            .concat(",", lDto.ProvinceCode)
            .concat("/", lDto.ShortCode, "/");
        }
        setDto({ ...lDto });
      } else {
        lDto.ProposerDetails.InsuredType = "";
        lDto.InsuredTypeCode = "";
        setDto({ ...lDto });
      }
    }
    if (key === "IssuingBranch") {
      if (a !== null) {
        lDto.Channel.IssuingBranch = a.mValue;
        lDto.Prefix = a.ProvinceCode.concat("/", dto.InsuredTypeCode)
          .concat("/", a.ShortCode, "/")
          .concat(",", a.ProvinceCode)
          .concat("/", a.ShortCode, "/");
        lDto.ProvinceCode = a.ProvinceCode;
        lDto.ShortCode = a.ShortCode;
        const BusinessTypeCode = lDto.DocType[0];
        let ClassCode = "";
        if (lDto.SubClass === "Travel Medical Comprehensive") {
          ClassCode = "TMI";
        } else if (lDto.SubClass === "Travel Medical") {
          ClassCode = "TMI";
        }

        // const FiscalYear = lDto.Channel.FiscalYear;
        lDto.PolicyPrefix = a.ProvinceCode.concat("/", a.ShortCode, "/", "MIS").concat(
          "/",
          ClassCode,
          "/",
          BusinessTypeCode,
          "/",
          lDto.Channel.FiscalYear,
          "/"
        );
        lDto.Suffix = "-".concat(lDto.Channel.FiscalYear, ",");
      } else {
        lDto.Channel.IssuingBranch = "";
      }
    }
    setDto({ ...lDto });
  };

  // organization name
  const OnInsuredNameEnglish = () => {
    const Name = lDto.ProposerDetails.InsuredNameEnglish;
    const Address = lDto.ProposerDetails.PermanentAdrress.AddressEnglish;
    if (Name !== undefined) {
      lDto.ProposerDetails.NameoftheOrganisation = Name;
    }
    if (Address !== undefined) {
      lDto.ProposerDetails.OrganizationAddress = Address;
    }
  };

  // handle the annual
  const HandleAnnual = (e) => {
    // debugger;
    const IsannualTrips = e.target.value;
    if (IsannualTrips === "Yes") {
      if (lDto.InsurableItem[0].RiskItems[0].Age >= 71) {
        swal.fire({
          icon: "error",
          text: "Maximum Age For Annual Multi Trip policy is 70 Years Only",
          confirmButtonColor: "#0079CE",
        });
        lDto.InsurableItem[0].RiskItems[0].IsAnnualMultiTrip = "No";
      } else {
        lDto.InsurableItem[0].RiskItems[0].IsAnnualMultiTrip = "Yes";
      }
      if (
        lDto.InsurableItem[0].RiskItems[0].Age >= 40 &&
        lDto.InsurableItem[0].RiskItems[0].ClientType === "Student"
      ) {
        swal.fire({
          icon: "error",
          text: "Maximum Age For Student Plan is 40 Years Only ",
          confirmButtonColor: "#0079CE",
        });
        lDto.InsurableItem[0].RiskItems[0].IsAnnualMultiTrip = "No";
      }
    }
    if (IsannualTrips === "No") {
      lDto.InsurableItem[0].RiskItems[0].IsAnnualMultiTrip = "No";
    }
    setDto({ ...lDto });
  };

  // Handle branch name populations
  const handleBankCategory = async (e, a, key) => {
    if (key === "BankCategory") {
      if (a !== null) {
        lDto.Bankdetails.BankCategory = a.mValue;
        const res = await GetProdPartnermasterData("BankDetails", {
          BankFinancialInstitution: a.fieldName,
        });
        masters1.BankorFinancialInstituionNameinEnglish = res.data;
        masters1.BranchMaster = [];
        lDto.Bankdetails.BankCategorylabel = a.fieldName;
        // objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish", "");
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        // objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinNepali", "");
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        // objectPath.set(dto, "Bankdetails.Country", "");
        lDto.Bankdetails.Country = "";
        // objectPath.set(dto, "Bankdetails.ProvinceorState", "");
        lDto.Bankdetails.ProvinceorState = "";
        // objectPath.set(dto, "Bankdetails.Municipality", "");
        lDto.Bankdetails.Municipality = "";
        // objectPath.set(dto, "Bankdetails.WardNumber", "");
        lDto.Bankdetails.WardNumber = "";
        // objectPath.set(dto, "Bankdetails.AddressEnglish", "");
        lDto.Bankdetails.AddressEnglish = "";
        // objectPath.set(dto, "Bankdetails.District", "");
        lDto.Bankdetails.District = "";
        // objectPath.set(dto, "Bankdetails.AddressNepali", "");
        lDto.Bankdetails.AddressNepali = "";
        lDto.Bankdetails.BranchDetails.forEach((x, i) => {
          lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
          lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
          lDto.Bankdetails.BranchDetails[i].WardNumber = "";
          lDto.Bankdetails.BranchDetails[i].Municipality = "";
          lDto.Bankdetails.BranchDetails[i].District = "";
          lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
          lDto.Bankdetails.BranchDetails[i].Bank = "";
        });
        setDto({ ...lDto });
      } else {
        // objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish", "");
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        // objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinNepali", "");
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        // objectPath.set(dto, "Bankdetails.ProvinceorState", "");
        lDto.Bankdetails.ProvinceorState = "";
        // objectPath.set(dto, "Bankdetails.Country", "");
        lDto.Bankdetails.Country = "";
        // objectPath.set(dto, "Bankdetails.Municipality", "");
        lDto.Bankdetails.Municipality = "";
        // objectPath.set(dto, "Bankdetails.WardNumber", "");
        lDto.Bankdetails.WardNumber = "";
        // objectPath.set(dto, "Bankdetails.AddressEnglish", "");
        lDto.Bankdetails.AddressEnglish = "";
        // objectPath.set(dto, "Bankdetails.District", "");
        lDto.Bankdetails.District = "";
        // objectPath.set(dto, "Bankdetails.BankCategory", "");
        lDto.Bankdetails.BankCategory = "";
        // objectPath.set(dto, "Bankdetails.BankCategorylabel", "");
        lDto.Bankdetails.BankCategorylabel = "";
        // objectPath.set(dto, "Bankdetails.AddressNepali", "");
        lDto.Bankdetails.AddressNepali = "";
        setDto({ ...lDto });
      }
    }
    if (key === "BankorFinancial") {
      if (a !== null) {
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = a.mValue;
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.mValue }],
          };
          const res = await Transliteration(obj);
          // bjectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinNepali", res[0].text);
          lDto.Bankdetails.BankorFinancialInstituionNameinNepali = res[0].text;
        }
        // objectPath.set(dto, "Bankdetails.Country", a.Country);
        lDto.Bankdetails.Country = a.Country;
        lDto.Bankdetails.ProvinceorState = a.Province;
        lDto.Bankdetails.Municipality = a.Municipality;
        lDto.Bankdetails.District = a.District;
        lDto.Bankdetails.AddressEnglish = a.Address;
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.Address }],
          };
          const res = await Transliteration(obj);
          lDto.Bankdetails.AddressNepali = res[0].text;
        }
        setDto({ ...lDto });
        const res = await GetProdPartnermasterData("BranchMasters", {
          BankFinancialInstitution: lDto.Bankdetails.BankCategorylabel,
          Bankname: a.mValue,
        });
        masters1.BranchMasters = res.data;
        console.log("masters.BranchMasters", masters.BranchMasters, masters.BranchMasters.length);
        // setGenericPolicyDto(dispatch, dto);
        setDto({ ...lDto });
      } else {
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.AddressNepali = "";
        // setGenericPolicyDto(dispatch, dto);
        setDto({ ...lDto });
        masters1.BranchMasters = [];
      }
    }
  };

  const handleFieldOfficerCode = async (e, a, key) => {
    // debugger;
    if (key === "FieldOfficer") {
      if (a !== null) {
        lDto.Channel.FieldOfficerCode = a.fieldName;
        lDto.Channel.FieldOfficer = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.FieldOfficerCode = "";
        lDto.Channel.FieldOfficer = "";
        setDto({ ...lDto });
      }
    } else if (key === "FieldofficerName") {
      if (a !== null) {
        lDto.Channel.FieldOfficer = a.mValue;
        lDto.Channel.FieldOfficerCode = a.fieldName;

        setDto({ ...lDto });
      } else {
        lDto.Channel.FieldOfficer = "";
        lDto.Channel.FieldOfficerCode = "";

        setDto({ ...lDto });
      }
    }
    if (key === "SubFieldOfficerCode") {
      if (a !== null) {
        lDto.Channel.SubFieldOfficerCode = a.fieldName;
        lDto.Channel.SubFieldOfficer = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.SubFieldOfficerCode = "";
        lDto.Channel.SubFieldOfficer = "";
        setDto({ ...lDto });
      }
    } else if (key === "SubFieldOfficerName") {
      if (a !== null) {
        lDto.Channel.SubFieldOfficer = a.mValue;
        lDto.Channel.SubFieldOfficerCode = a.fieldName;
        setDto({ ...lDto });
      } else {
        lDto.Channel.SubFieldOfficerCode = "";
        lDto.Channel.SubFieldOfficer = "";
        setDto({ ...lDto });
      }
    }
    if (key === "AgentCode") {
      if (a !== null) {
        lDto.Channel.AgentCode = a.fieldName;
        lDto.Channel.AgentName = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.AgentCode = "";
        lDto.Channel.AgentName = "";
        setDto({ ...lDto });
      }
    } else if (key === "AgentName") {
      if (a !== null) {
        lDto.Channel.AgentName = a.mValue;
        lDto.Channel.AgentCode = a.fieldName;
        setDto({ ...lDto });
      } else {
        lDto.Channel.AgentName = "";
        lDto.Channel.AgentCode = "";
        setDto({ ...lDto });
      }
    }
    if (key === "SubAgentCode") {
      if (a !== null) {
        lDto.Channel.SubAgentCode = a.fieldName;
        lDto.Channel.SubAgentName = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.SubAgentCode = a.fieldName;
        lDto.Channel.SubAgentName = a.mValue;
        setDto({ ...lDto });
      }
    } else if (key === "SubAgentName") {
      if (a !== null) {
        lDto.Channel.SubAgentName = a.mValue;
        lDto.Channel.SubAgentCode = a.fieldName;

        setDto({ ...lDto });
      } else {
        lDto.Channel.SubAgentName = "";
        lDto.Channel.SubAgentCode = "";
        setDto({ ...lDto });
      }
    }
  };

  const OnDirectDiscountAgent = (e, a) => {
    // debugger;
    if (a !== null) {
      lDto.InsurableItem[0].RiskItems[0].CorporateDiscount = a.mValue;
    } else {
      lDto.InsurableItem[0].RiskItems[0].CorporateDiscount = "";
    }
    lDto.Channel.AgentCode = "";
    lDto.Channel.AgentName = "";

    setDto({ ...lDto });
  };

  // Multi Kyc Function
  // const RemoveMultiKYC = (e) => {
  //   // debugger;
  //   lDto.IsMultiKYCApplicable = e.target.value;
  //   if (lDto.IsMultiKYCApplicable === "Yes") {
  //     lDto.NumberofInsured = 1;
  //   }
  //   if (lDto.IsMultiKYCApplicable === "No") {
  //     const newarray = lDto.ProposerDetailsArray[0];
  //     lDto.ProposerDetailsArray = [newarray];
  //   }
  //   setDto({ ...lDto });
  // };

  // const IsNumericGreaterThanZero = (number) => {
  //   const regex = /^(?!(0))[0-9]*$/;
  //   if (regex.test(number)) return true;
  //   return "Value must be greater than zero and Numeric";
  //   //  " Allows only number";
  // };

  // const OnADDMultiKYCDetailsnew = (e) => {
  //   console.log(e, 111111);
  //   if (e.target.value === "") {
  //     const newarray = lDto.ProposerDetailsArray[0];
  //     lDto.ProposerDetailsArray = [newarray];
  //     //   lDto.NumberofInsured = 1;
  //   }
  //   lDto.NumberofInsured = e.target.value;
  //   const arr1 = arrayRange(1, e.target.value - 1, 1);
  //   arr1.forEach(() => {
  //     lDto.ProposerDetailsArray.push({ ...ProposerDetailsArray() });
  //   });

  //   setDto({ ...lDto });
  // };

  // const OnADDMultiKYCDetails = () => {
  //   lDto.ProposerDetailsArray.push({ ...ProposerDetailsArray() });
  //   lDto.NumberofInsured = lDto.ProposerDetailsArray.length;
  //   setDto({ ...lDto });
  // };
  // const RemoveMultiKYCDetails = (i) => {
  //   const arr = lDto.ProposerDetailsArray.filter((x, i1) => i1 !== i);
  //   lDto.ProposerDetailsArray = arr;
  //   lDto.NumberofInsured = lDto.ProposerDetailsArray.length;
  //   setDto({ ...lDto });
  // };

  // const spreadMultiKYCDetails = () => {
  //   const arr = [];
  //   dto.ProposerDetailsArray.forEach((x, i) => {
  //     arr.push([
  //       {
  //         type: "Button",
  //         label: "Delete",
  //         spacing: 12,
  //         justifyContent: "end",
  //         visible: i !== 0,
  //         onClick: () => RemoveMultiKYCDetails(i),
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "KYC Category",
  //         visible: true,
  //         // path: `ProposerDetailsArray.${i}.KYCCategory`,
  //         path: `ProposerDetailsArray.${i}.KYCCategory`,
  //         options: masters.KYCCategory,
  //         required: true,
  //         disableOnReset: true,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Insured Type",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.InsuredType`,
  //         options: masters.InsuredType,
  //         required: true,
  //       },
  //       {
  //         type: "Input",
  //         label: "Special Client",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.SpecialClient`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         disableOnReset: true,
  //       },
  //       {
  //         type: "Input",
  //         label: "Insured Name English",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.InsuredNameEnglish`,
  //         required: true,
  //         // onChangeFuncs: [IsAlphaNumNoSpace],
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         customOnChange: OnInsuredNameEnglish(),
  //         name: "InsuredNameEnglish1",
  //         customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
  //       },
  //       {
  //         type: "Input",
  //         label: "Insured Name Nepali",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.InsuredNameNepali`,
  //         disabled: true,
  //       },
  //       {
  //         type: "Input",
  //         label: "KYC Classification",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.KYCClassification`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "KYC Risk Category",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.KYCRiskCategory`,
  //         options: masters.KYCRiskCategory,
  //         required: true,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Is Beneficiary Owner",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.IsBeneficiaryOwner`,
  //         options: masters.IsBeneficiaryOwner,
  //         disableOnReset: true,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Occupation",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.Occuptation`,
  //         options: masters.Occupation,
  //         required: true,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Income Source",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.IncomeSource`,
  //         options: masters.IncomeSource,
  //         required: true,
  //       },
  //       {
  //         type: "Input",
  //         label: "Contact Person Name",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.ContactPersonName`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //       },
  //       {
  //         type: "Input",
  //         label: "Email Address",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.Email ID`,
  //         onBlurFuncs: [IsEmail],
  //       },
  //       {
  //         type: "Input",
  //         label: "PAN Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PANNumber`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         InputProps: { maxLength: 9 },
  //         required:
  //           lDto.ProposerDetailsArray[0].InsuredType !== "Individual" &&
  //           lDto.ProposerDetailsArray[0].InsuredType !== "Government body",
  //       },
  //       {
  //         type: "Input",
  //         label: "VAT Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.VATNumber`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         InputProps: { maxLength: 9 },
  //       },
  //       {
  //         type: "Input",
  //         label: "Registration Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.RegistrationNumber`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Registration Date",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.RegistrationDate`,
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Registration Close Date",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.RegisterationCloseDate`,
  //         disabled: dto.ProposerDetailsArray[0].RegistrationDate === "",
  //         minDate: new Date(lDto.ProposerDetailsArray[0].RegistrationDate),
  //       },
  //       {
  //         type: "Input",
  //         label: "Registration Office",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.RegistrationOffice`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //       },
  //       {
  //         type: "Input",
  //         label: "Reference Insured Name",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.ReferenceInsuredName`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //       },
  //       {
  //         type: "Input",
  //         label: "Phone Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PhoneNumber`,
  //         onChangeFuncs: [IsNumaricSpecialNoSpace],
  //       },
  //       {
  //         type: "Input",
  //         label: "Mobile Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.Mobile Number`,
  //         onChangeFuncs: [IsNumaricSpecialNoSpace],
  //         onBlurFuncs: [IsMobileNumber],
  //         InputProps: { maxLength: 10 },
  //         required: true,
  //         disableOnReset: true,
  //       },
  //       {
  //         type: "Input",
  //         label: "TDS Category",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.TDSCategory`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Country",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.Country`,
  //         options: masters.Country,
  //         disableOnReset: true,
  //         disabled: true,
  //         required: true,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Province/State",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.ProvinceState`,
  //         options:
  //           lDto.ProposerDetailsArray[0].PermanentAdrress.Country !== "" ? masters.State : [],
  //         required: true,
  //         customOnChange: (e, a) => OnPlaceSelect(e, a, "State5"),
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "District",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.District`,
  //         options:
  //           lDto.ProposerDetailsArray[0].PermanentAdrress.ProvinceState !== ""
  //             ? masters.District5
  //             : [],
  //         required: true,
  //         customOnChange: (e, a) => OnPlaceSelect(e, a, "District5"),
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Municipality",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.Municipality`,
  //         options:
  //           lDto.ProposerDetailsArray[0].PermanentAdrress.District !== ""
  //             ? masters.Municipality5
  //             : [],
  //         required: true,
  //         // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality2"),
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Ward Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.WardNumber`,
  //         options: masters.WardNumber,
  //       },
  //       {
  //         type: "Input",
  //         label: "Address(English) ",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.AddressEnglish`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         required: true,
  //         name: "PermanentAdrressEnglish",
  //         customOnChange: (e) => OnInsuredNameEnglish(e, "AddressEnglish", i),
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Address(Nepali) ",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.AddressNepali`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         // required: true,
  //         disabled: true,
  //       },
  //       {
  //         type: "Input",
  //         label: "Area",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.Area`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //       },
  //       {
  //         type: "Input",
  //         label: "Tole/StreetName",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.ToleStreetName`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //       },
  //       {
  //         type: "Input",
  //         label: "House Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.HouseNumber`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //       },
  //       {
  //         type: "Input",
  //         label: "Plot Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.PlotNumber`,
  //         onChangeFuncs: [IsNumeric],
  //       },
  //       {
  //         type: "Input",
  //         label: "Temporary Address-English ",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CommunicationAddress.TemporaryAddressEnglish`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         name: "TemporaryAddressEnglish1",
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Temporary Address-Nepali ",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CommunicationAddress.TemporaryAddressNepali`,
  //         disabled: true,
  //       },
  //       { type: "Typography", label: "Document Section", visible: true, spacing: 12 },
  //       {
  //         type: "Button",
  //         label: "rDocument",
  //         visible: true,
  //         startIcon: <AddIcon />,
  //         variant: "outlined",
  //         onClick: () => onAddDocument(i),
  //         spacing: 12,
  //       },
  //       ...spreadDocumentDetails(i),
  //       {
  //         type: "Accordions",
  //         //   visible: lDto.ProposerDetails[i].InsuredType !== "",
  //         spacing: 12,
  //         accordionList: [
  //           {
  //             id: 1,
  //             label: lDto.ProposerDetailsArray[i].InsuredType,
  //             name: "Individual Information",
  //             visible:
  //               lDto.FinancingType !== "" &&
  //               lDto.ProposerDetailsArray[i].InsuredType === "Individual",
  //           },
  //           {
  //             id: 2,
  //             label: lDto.ProposerDetailsArray[i].InsuredType,
  //             visible:
  //               lDto.FinancingType !== "" &&
  //               lDto.ProposerDetailsArray[i].InsuredType !== "" &&
  //               lDto.ProposerDetailsArray[i].InsuredType !== "Individual",
  //           },
  //         ],
  //       },

  //       //   ffffffffffffff
  //       {
  //         type: "Typography",
  //         label: "Upload Profile Picture",
  //         visible: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Button",
  //         visible: true,
  //         component: "label",
  //         label: "Upload",
  //         spacing: 2,
  //         accordionId: 1,
  //         typeFormat: (
  //           <input
  //             hidden
  //             accept="image/bmp, image/jpeg, image/png,"
  //             type="file"
  //             onChange={(e) => OnProfilePicture(e, i)}
  //           />
  //         ),
  //       },
  //       {
  //         type: "Typography",
  //         label: lDto.ProposerDetailsArray[i].ProfilePicture,
  //         // spacing: 3,
  //         visible: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "IconButton",
  //         icon: "close",
  //         // spacing: 2,
  //         visible: lDto.ProposerDetailsArray[i].ProfilePicture !== "",
  //         onClick: () => onCancelClickProfilePicture(i),
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Typography",
  //         label: "",
  //         visible: true,
  //         spacing: 12,
  //         accordionId: 1,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Gender (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.GenderEnglish`,
  //         // options: masters.Gender,
  //         options: GenderNepali,
  //         required: true,
  //         customOnChange: (e, a) => handleGender(e, a, i),
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Gender (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.GenderNepali`,
  //         required: true,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Marital status (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.MaritalStatusEnglish`,
  //         // options: masters.MaritalStatus,
  //         options: MaritalStatus,
  //         customOnChange: (e, a) => handleMarital(e, a, i),
  //         required: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Marital status (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.MaritalStatusNepali`,
  //         required: true,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Husband's Name(English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.HusbandNameEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "HusbandNameEnglish",
  //         // customOnBlur: onBlurTransliteration,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Husband's Name(Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.HusbandNameNepali`,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Wife Name (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.WifeNameEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "WifeNameEnglish",
  //         accordionId: 1,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Wife Name (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.WifeNameNepali`,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Father Name (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.FatherNameEnglish`,
  //         required: true,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "FatherNameEnglish1",
  //         accordionId: 1,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Father Name (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.FatherNameNepali`,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "GrandFather Name (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.GrandfatherNameEnglish`,
  //         required: true,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "GrandfatherNameEnglish1",
  //         // customOnBlur: onBlurTransliteration,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "GrandFather Name (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.GrandfatherNameNepali`,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Nationality (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.NationalityEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Permanent Address (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.AddressEnglish`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         name: "PermanentAddressEnglish1",
  //         // customOnBlur: onBlurTransliteration,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Permanent Address (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.AddressNepali`,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Town (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.TownEnglish`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         name: "TownEnglish1",
  //         accordionId: 1,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Town (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.TownNepali`,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "City (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.CityEnglish`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         name: "CityEnglish1",
  //         accordionId: 1,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "City (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.CityNepali`,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Temporary Address (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CommunicationAddress.TemporaryAddressEnglish`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         name: "TemporaryAddressEnglish1",
  //         accordionId: 1,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Temporary Address (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CommunicationAddress.TemporaryAddressNepali`,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Residence(English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CommunicationAddress.ResidenceEnglish`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         name: "ResidenceEnglish",
  //         accordionId: 1,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Residence(Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CommunicationAddress.ResidenceNepali`,
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Citizenship Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CitizenshipNumber`,
  //         required: true,
  //         accordionId: 1,
  //         spacing: 3,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Citizenship Issued Date",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CitizenshipIssuedDate`,
  //         required: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Citizenship Issue District",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.IssueDistrict`,
  //         options: masters.District,
  //         required: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Date Of Birth",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.DoB`,
  //         required: true,
  //         dateFormat: "m-d-Y",
  //         maxDate: new Date(),
  //         accordionId: 1,
  //         spacing: 3,
  //         customOnChange: (e, d) => onDOBselect(e, d, i),
  //       },
  //       {
  //         type: "Input",
  //         label: "Passport Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PassportNumber`,
  //         InputProps: { maxLength: 8 },
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Passport Issued Date",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PassportIssuedDate`,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Passport Expiry Date",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PassportExpiryDate`,
  //         minDate: new Date(lDto.ProposerDetailsArray[0].PassportIssuedDate),
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "RadioGroup",
  //         visible: true,
  //         radioLabel: { label: "Passport Issued By", labelVisible: true },
  //         radioList: [
  //           { value: "India", label: "India" },
  //           { value: "Nepal", label: "Nepal" },
  //         ],
  //         path: `ProposerDetailsArray.${i}.PassportIssuedBy`,
  //         spacing: 12,
  //         accordionId: 1,
  //       },
  //       {
  //         type: "Input",
  //         label: "License Number",
  //         visible: true,
  //         spacing: 3,
  //         path: `ProposerDetailsArray.${i}.LicenseNumber`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         accordionId: 1,
  //       },
  //       {
  //         type: "Input",
  //         label: "Occupation",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.InsuredOccupation`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Income Source",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.IncomeSource`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         disabled: true,
  //         accordionId: 1,
  //         spacing: 3,
  //       },
  //       //   fffffffffffffffffff
  //       {
  //         type: "Input",
  //         label: "Name of the Organization",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.NameoftheOrganisation`,
  //         required: true,
  //         disabled: true,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Address of Organization",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.OrganizationAddress`,
  //         required: true,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Organization Phone Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.OrganizationContactNo`,
  //         onChangeFuncs: [IsNumaricSpecialNoSpace],
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Typography",
  //         label: "Member Details",
  //         visible: true,
  //         spacing: 12,
  //         accordionId: 2,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Member Type",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.MemberType`,
  //         options: masters.MemberType,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Role",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.Role`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Member Name (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.MemberNameEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "MemberNameEnglish",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Member Name (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.MemberNameNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Designation (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.DesignationEnglish`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         name: "DesignationEnglish",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Designation (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.DesignationNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Gender (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.GenderEnglish`,
  //         options: GenderNepali,
  //         customOnChange: (e, a) => handleGender(e, a, i),
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Gender (Nepali)",
  //         visible: true,
  //         disabled: true,
  //         path: `ProposerDetailsArray.${i}.GenderNepali`,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Marital Status (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.MaritalStatusEnglish`,
  //         options: MaritalStatus,
  //         customOnChange: (e, a) => handleMarital(e, a, i),
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Marital Status (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.MaritalStatusNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Husband's Name(English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.HusbandNameEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "HusbandNameEnglish1",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Husband's Name(Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.HusbandNameNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Wife Name (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.WifeNameEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "WifeNameEnglish1",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Wife Name (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.WifeNameNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Father Name (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.FatherNameEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "FatherNameEnglish",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Father Name (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.FatherNameNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "GrandFather Name (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.GrandfatherNameEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "GrandFatherNameEnglish",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "GrandFather Name (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.GrandfatherNameEnglish`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Nationality (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.NationalityEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Permanent Address (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAddressEnglish`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         name: "PermanentAddressEnglish",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Permanent Address (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAddressNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Town (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.TownEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "TownEnglish",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Town (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.TownNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "City (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.CityEnglish`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         name: "CityEnglish",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "City (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.CityNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Temporary Address (English)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.TempAddresEnglish`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         name: "TempAddresEnglish",
  //         accordionId: 2,
  //         spacing: 3,
  //         // customOnBlur: onBlurTransliteration,
  //       },
  //       {
  //         type: "Input",
  //         label: "Temporary Address (Nepali)",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PermanentAdrress.TempAddresNepali`,
  //         disabled: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Identification Type",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.IdentificationType`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         accordionId: 2,
  //         spacing: 3,
  //       },

  //       {
  //         type: "Input",
  //         label: "Citizenship Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CitizenshipNumber`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Citizenship Issued Date",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.CitizenshipIssuedDate`,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "AutoComplete",
  //         label: "Citizenship Issue District",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.IssueDistrict`,
  //         options: masters.District,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Date Of Birth",
  //         visible: true,
  //         maxDate: new Date(),
  //         dateFormat: "m-d-Y",
  //         path: `ProposerDetailsArray.${i}.DoB`,
  //         customOnChange: (e, d) => onDOBselect(e, d, i),
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Passport Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PassportNumber`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         InputProps: { maxLength: 9 },
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Passport Issued Date",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PassportIssuedDate`,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Passport Expiry Date",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PassportExpiryDate`,
  //         accordionId: 2,
  //         spacing: 3,
  //       },

  //       {
  //         type: "RadioGroup",
  //         visible: true,
  //         radioLabel: { label: "Passport Issued By", labelVisible: true },
  //         radioList: [
  //           { value: "India", label: "India" },
  //           { value: "Nepal", label: "Nepal" },
  //         ],
  //         path: `ProposerDetailsArray.${i}.PassportIssuedBy`,
  //         spacing: 12,
  //         accordionId: 2,
  //       },
  //       {
  //         type: "Input",
  //         label: "License Number",
  //         visible: true,
  //         spacing: 3,
  //         path: `ProposerDetailsArray.${i}.LicenseNumber`,
  //         onChangeFuncs: [IsFreetextNoSpace],
  //         accordionId: 2,
  //       },
  //       {
  //         type: "Input",
  //         label: "Occupation",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.InsuredOccupation`,
  //         onChangeFuncs: [IsAlphaNoSpace],
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Income Source",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.IncomeSource`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         accordionId: 2,
  //         disabled: true,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Input",
  //         label: "Phone Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.PhoneNumber`,
  //         onChangeFuncs: [IsAlphaNumNoSpace],
  //         accordionId: 2,
  //         spacing: 3,
  //         // InputProps: { maxLength: 10 },
  //       },
  //       {
  //         type: "Input",
  //         label: "Mobile Number",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.MobileNumber`,
  //         onChangeFuncs: [IsNumeric],
  //         onBlurFuncs: [IsMobileNumber],
  //         accordionId: 2,
  //         spacing: 3,
  //         InputProps: { maxLength: 10 },
  //       },
  //       {
  //         type: "Input",
  //         label: "Email",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.EmailAddress`,
  //         onBlurFuncs: [IsEmail],
  //         accordionId: 2,
  //         spacing: 3,
  //       },

  //       {
  //         type: "AutoComplete",
  //         label: "Status",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.Status`,
  //         options: masters.Status,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "MDDatePicker",
  //         label: "Appoint Date",
  //         visible: true,
  //         path: `ProposerDetailsArray.${i}.AppointDate`,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Typography",
  //         label: "",
  //         visible: true,
  //         spacing: 12,
  //         accordionId: 2,
  //       },
  //       {
  //         type: "Typography",
  //         label: "Upload Profile Picture",
  //         visible: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "Button",
  //         visible: true,
  //         component: "label",
  //         label: "Upload",
  //         spacing: 2,
  //         accordionId: 2,
  //         typeFormat: (
  //           <input
  //             hidden
  //             accept="image/bmp, image/jpeg, image/png,"
  //             type="file"
  //             onChange={(e) => OnProfilePicture(e, i)}
  //           />
  //         ),
  //       },
  //       {
  //         type: "Typography",
  //         label: lDto.ProposerDetailsArray[i].ProfilePicture,
  //         // spacing: 3,
  //         visible: true,
  //         accordionId: 2,
  //         spacing: 3,
  //       },
  //       {
  //         type: "IconButton",
  //         icon: "close",
  //         accordionId: 2,
  //         spacing: 3,
  //         // spacing: 2,
  //         visible: lDto.ProposerDetailsArray[i].ProfilePicture !== "",
  //         onClick: () => onCancelClickProfilePicture(i),
  //       },
  //     ]);
  //   });
  //   return arr;
  // };

  let data = [];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Input",
            label: "DocType(PolicyType)",
            visible: true,
            path: "DocType",
            required: true,
            value: "Fresh",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Department",
            visible: true,
            path: "Department",
            value: "Miscellaneous",
            disableOnReset: true,
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Class",
            path: "Class",
            value: "Travel Medical Insurance",
            visible: true,
            disableOnReset: true,
            required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Sub-Class",
            visible: true,
            path: "SubClass",
            required: true,
            customOnChange: (e, a) => handlesubclass(e, a),
            options: masters.SubClass,
            validationId: 1,
          },
          {
            type: "AutoComplete",
            label: "Client-Type",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.ClientType",
            required: true,
            customOnChange: (e, a) => handleClientType(e, a),
            options: lDto.SubClass !== "" ? masters.ClientType : [],
            // options: masters.ClientType,
            validationId: 1,
            // disabled: lDto.InsurableItem[0].RiskItems[0].ClientType !== "" ? true : false,
          },
          {
            type: "AutoComplete",
            label: "Geography(Area)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Geographylabel",
            required: true,
            options: lDto.InsurableItem[0].RiskItems[0].ClientType !== "" ? masters.Geography : [],
            // options: masters.Geography,
            customOnChange: (e, a) => handlegeograhy(e, a, "Geography"),
            validationId: 1,
            spacing: 3.5,
          },
          {
            type: "AutoComplete",
            label: "Plan",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Planlabel",
            required: true,
            options: lDto.InsurableItem[0].RiskItems[0].Geographylabel !== "" ? masters.Plan : [],
            // options: masters.Plan,
            customOnChange: (e, a) => handleplan(e, a, "Plan"),
            validationId: 1,
          },
          {
            type: "RadioGroup",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.IsAnnualMultiTrip",
            required: true,
            validationId: 1,
            disableOnReset: true,
            customOnChange: (e) => HandleAnnual(e),
            radioLabel: { label: "Is Annual Multi Trip", labelVisible: true },
            radioList: [
              { value: "Yes", label: "Yes" },
              {
                value: "No",
                label: "No",
              },
            ],
            // path: "",
            spacing: 12,
          },
          {
            type: "MDDatePicker",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.DateofBirth",
            label: "Date of Birth",
            validationId: 1,
            // altFormat: "d-m-Y",
            // dateFormat: "Y-m-d",
            // disableOnReset: true,
            // maxDate: `${new Date().getFullYear() - 18}-${
            //   new Date().getMonth() + 1
            // }-${new Date().getDate()}`,
            dateFormat: "d-m-Y",
            maxDate: `${new Date().getDate()}-${new Date().getMonth() + 1}-${
              new Date().getFullYear() - 18
            }`,
            customOnChange: (e, d) => onDOBselect(e, d),
            required: true,
          },
          {
            type: "Input",
            label: "Age",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Age",
            // required: true,
            disabled: true,
            // onBlurFuncs: selectedDate ? calculateAge(selectedDate) : "",
          },
          {
            type: "Input",
            label: "No of Children <5yrs",
            // visible: true,
            visible: dto.InsurableItem[0].RiskItems[0].ClientType === "Individual",
            path: "InsurableItem.0.RiskItems.0.NumberOfChildrenLessThan5Yr",
            required: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
            validationId: 1,
            InputProps: { maxLength: 2 },
          },
          {
            type: "MDDatePicker",
            visible: true,
            path: "PolicyStartDate",
            minDate: PolicyStartDateMinDate(),
            maxDate: PolicyStartDateMaxDate(),
            dateFormat: "m/d/Y",
            label: "Policy Start Date",
            disableOnReset: true,
            required: true,
            customOnChange: (e, d) => handledays(e, d),
            // customOnChange: (e, d) => OnPSDSelect(e, d),
          },
          {
            type: "Input",
            label: "No of Days",
            path: "NumberofDays",
            visible: true,
            required: true,
            validationId: 1,
            onChangeFuncs: [IsNumeric],
            customOnChange: (days1) => handlePolicyDates(days1),
          },
          {
            type: "MDDatePicker",
            visible: true,
            path: "PolicyEndDate",
            label: "Policy End Date",
            InputProps: {
              readOnly: true,
            },
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Corporate Discount",
            visible: true,
            disableOnReset: true,
            path: "InsurableItem.0.RiskItems.0.CorporateDiscount",
            options: masters.DirectDiscount,
            InputProps: { readOnly: true },
            customOnChange: (e, a) => OnDirectDiscountAgent(e, a),
          },
          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 1,
            label: "Calculate Premium",
            variant: "outlined",
            visible: true,
            // InputProps: { loader: true },
            // endIcon: flag.backdropflag && <CircularProgress size="20px" />,
            spacing: 12,
            align: "right",
            onClick: () => CalculatePremiumfunc(),
          },
          {
            type: "Input",
            label: "Base Premium(USD)",
            InputProps: { readOnly: true },
            // visible: dto.PremiumDetails.PremiumAfterCorporateDiscount !== "",
            visible: true,
            path: "PremiumDetails.PremiumAfterCorporateDiscount",
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Additional multiplying rate",
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].Age >= "71" &&
            //   dto.PremiumDetails.PremiumAfterCorporateDiscount !== "",
            visible: dto.InsurableItem[0].RiskItems[0].Age >= "71",
            path: "InsurableItem.0.RiskItems.0.AdditionalMultiplyingRate",
            disableOnReset: true,
            required: true,
            InputProps: { maxLength: 3 },
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Other Loading Charge",
            // visible: dto.PremiumDetails.PremiumAfterCorporateDiscount !== "",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.OtherLoadingCharge",
            customOnChange: (OtherLoading) => handleotherloading(OtherLoading),
            InputProps: { maxLength: 3 },
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Other Loading Premium(USD)",
            InputProps: { readOnly: true },
            // visible: dto.PremiumDetails.PremiumAfterCorporateDiscount !== "",
            visible: true,
            disabled: true,
            path: "InsurableItem.0.RiskItems.0.OtherLoadingChargeusd",
          },
          {
            type: "Input",
            label: "Covid Loading Charge",
            // visible: dto.PremiumDetails.PremiumAfterCorporateDiscount !== "",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.CovidLoadingCharge",
            customOnChange: (covidLoading) => handlecovidloading(covidLoading),
            InputProps: { maxLength: 3 },
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Covid Loading Premium(USD)",
            InputProps: { readOnly: true },
            // visible: dto.PremiumDetails.PremiumAfterCorporateDiscount !== "",
            visible: true,
            disabled: true,
            path: "InsurableItem.0.RiskItems.0.CovidLoadingChargeusd",
          },
          {
            type: "Input",
            label: "Total Premium in USD",
            // visible: dto.PremiumDetails.PremiumAfterCorporateDiscount !== "",
            visible: true,
            // InputProps: { disabled: true },
            // path: "PremiumDetails.PremiumAfterCorporateDiscount",
            path: "InsurableItem.0.RiskItems.0.TotalPremiuminusd",
            // disableOnReset: true,
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Conversion Rate",
            // visible: dto.PremiumDetails.PremiumAfterCorporateDiscount !== "",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.ConversionRate",
            InputProps: { maxLength: 6 },
            onChangeFuncs: [IsNumeric11],
            onBlurFuncs: [IsNumeric11],
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "MDDatePicker",
            visible: true,
            label: "Policy Start Date",
            path: "PolicyStartDate",
            InputProps: { disabled: true },
            disableOnReset: true,
            disabled: true,
            required: true,
          },
          {
            type: "MDDatePicker",
            visible: true,
            label: "Policy End Date",
            path: "PolicyEndDate",
            disabled: true,
            disableOnReset: true,
            InputProps: { disabled: true },
            required: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Financing Details", labelVisible: true },
            radioList: [
              { value: "Direct", label: "Direct" },
              { value: "Bank/Financial Institution", label: "Bank/Financial Institution" },
            ],
            path: "FinancingType",
            spacing: 12,
            required: true,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            visible: true,
            path: "Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Bank Category",
            visible: true,
            path: "Bankdetails.BankCategory",
            options: masters.BankCategory,
            required: true,
            customOnChange: (e, a) => handleBankCategory(e, a, "BankCategory"),
          },
          {
            type: "AutoComplete",
            label: "Bank/Financial Institution Name in English",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinEnglish",
            onChangeFuncs: [IsAlphaNumNoSpace],
            required: true,
            name: "BankorFinancialInstituionNameinEnglish",
            // customOnBlur: onBlurTransliteration,
            options: masters.BankorFinancialInstituionNameinEnglish,
            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
          },
          {
            type: "Input",
            label: "Bank/Financial Institution Name (Nepali)",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Bank Code",
            visible: true,
            path: "Bankdetails.BankCode",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Short Code",
            visible: true,
            path: "Bankdetails.ShortCode",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Swift/Pseudo Code",
            visible: true,
            path: "Bankdetails.SwiftPseudoCode",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person1",
            visible: true,
            path: "Bankdetails.ContactPerson1",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "contact Person2",
            visible: true,
            path: "Bankdetails.ContactPerson2",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Contact Person3",
            visible: true,
            path: "Bankdetails.ContactPerson3",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            path: "Bankdetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            // InputProps: { maxLength: 11 },
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "Bankdetails.MobileNumber",
            // onChangeFuncs: [IsNumaricSpecialNoSpace],
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Fax Number",
            visible: true,
            path: "Bankdetails.FaxNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Website",
            visible: true,
            path: "Bankdetails.Website",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Email",
            visible: true,
            path: "Bankdetails.Email",
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "Bankdetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            InputProps: { maxLength: 9 },
          },
          {
            type: "Input",
            label: "Bank Agent Code",
            visible: true,
            path: "Bankdetails.BankAgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "CEO",
            visible: true,
            path: "Bankdetails.CEO",
            onChangeFuncs: [IsAlphaSpace],
          },

          {
            type: "Input",
            label: "Country",
            visible: true,
            path: "Bankdetails.Country",
            options: masters.Country,
            disableOnReset: true,
            disabled: true,
            required: true,
          },
          {
            type: "Input",
            label: "Province/State",
            visible: true,
            path: "Bankdetails.ProvinceorState",
            // options: lDto.Bankdetails.Country !== "" ? masters.State : [],
            required: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "State1"),
            disabled: true,
          },
          {
            type: "Input",
            label: "District",
            visible: true,
            path: "Bankdetails.District",
            // options: lDto.Bankdetails.ProvinceorState !== "" ? masters.District1 : [],
            required: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "District1"),
            disabled: true,
          },
          {
            type: "Input",
            label: "Municipality",
            visible: true,
            path: "Bankdetails.Municipality",
            disabled: true,
            // options: lDto.Bankdetails.District !== "" ? masters.Municipality1 : [],
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "Bankdetails.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            visible: true,
            path: "Bankdetails.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            name: "AddressEnglish3",
            disabled: true,
            // customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            path: "Bankdetails.AddressNepali",
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "Bankdetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Streetname",
            visible: true,
            path: "Bankdetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            path: "Bankdetails.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "Bankdetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Button",
            label: "ADD BRANCH DETAILS",
            visible: true,
            variant: "outlined",
            component: "label",
            onClick: onAddBranchDetails,
            spacing: 12,
          },
          ...spreadBranchDetails()[0],
        ],
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        [
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.NameoftheProposer",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Designation",
            visible: true,
            path: "ProposerDetails.Designation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            path: "ProposerDetails.Occupation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.Address",
            onChangeFuncs: [IsFreetextNoSpace],
          },
        ],
        [
          // {
          //   type: "RadioGroup",
          //   visible: true,
          //   radioLabel: { label: "Is Multi KYC Applicable?", labelVisible: true },
          //   radioList: [
          //     { value: "Yes", label: "Yes" },
          //     { value: "No", label: "No" },
          //   ],
          //   path: "IsMultiKYCApplicable",
          //   spacing: 3.5,
          //   required: true,
          //   sx: { pb: 3 },
          //   customOnChange: (e) => RemoveMultiKYC(e),
          // },
          // {
          //   type: "Input",
          //   label: "Number of Insured",
          //   path: "NumberofInsured",
          //   visible: lDto.IsMultiKYCApplicable === "Yes",
          //   spacing: 2.5,
          //   customOnChange: (e) => OnADDMultiKYCDetailsnew(e),
          //   onChangeFuncs: [IsNumericGreaterThanZero],
          //   required: lDto.IsMultiKYCApplicable === "Yes",
          // },

          // {
          //   type: "Button",
          //   label: "ADD",
          //   visible: lDto.IsMultiKYCApplicable === "Yes",
          //   component: "label",
          //   startIcon: <AddIcon />,
          //   onClick: OnADDMultiKYCDetails,
          //   justifyContent: "End",
          //   spacing: 6,
          // },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 12,
          //   label: "",
          // },
          // ...spreadMultiKYCDetails()[0],

          {
            type: "AutoComplete",
            label: "KYC Category",
            visible: true,
            path: "ProposerDetails.KYCCategory",
            options: masters.KYCCategory,
            required: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Insured Type",
            visible: true,
            path: "ProposerDetails.InsuredType",
            options: masters.InsuredType,
            customOnChange: (e, a) => handleIssuingBranch(e, a, "InsuredType"),
            // onClick: OnInsuredType,
            required: true,
          },
          {
            type: "Input",
            label: "Special Client",
            visible: true,
            path: "ProposerDetails.SpecialClient",
            onChangeFuncs: [IsAlphaNumNoSpace],
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Insured Name English",
            visible: true,
            path: "ProposerDetails.InsuredNameEnglish",
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            customOnChange: OnInsuredNameEnglish(),
            name: "InsuredNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Insured Name Nepali",
            visible: true,
            path: "ProposerDetails.InsuredNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "KYC Classification",
            visible: true,
            path: "ProposerDetails.KYCClassification",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "AutoComplete",
            label: "KYC Risk Category",
            visible: true,
            path: "ProposerDetails.KYCRiskCategory",
            options: masters.KYCRiskCategory,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Is Beneficiary Owner",
            visible: true,
            path: "ProposerDetails.IsBeneficiaryOwner",
            options: masters.IsBeneficiaryOwner,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Occupation",
            visible: true,
            path: "ProposerDetails.Occuptation",
            options: masters.Occupation,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Income Source",
            visible: true,
            path: "ProposerDetails.IncomeSource",
            options: masters.IncomeSource,
            required: true,
          },
          {
            type: "Input",
            label: "Contact Person Name",
            visible: true,
            path: "ProposerDetails.ContactPersonName",
            onChangeFuncs: [IsAlphaNumNoSpace],
            // required: true,
          },
          {
            type: "Input",
            label: "Email Address",
            visible: true,
            path: "ProposerDetails.EmailId",
            onBlurFuncs: [IsEmail],
            // required: true,
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "ProposerDetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            InputProps: { maxLength: 9 },
            required:
              lDto.ProposerDetails.InsuredType !== "Individual" &&
              lDto.ProposerDetails.InsuredType !== "Government body",
          },
          {
            type: "Input",
            label: "VAT Number",
            visible: true,
            path: "ProposerDetails.VATNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            InputProps: { maxLength: 9 },
          },
          {
            type: "Input",
            label: "Registration Number",
            visible: true,
            path: "ProposerDetails.RegistrationNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Registration Date",
            visible: true,
            path: "ProposerDetails.RegistrationDate",
          },
          {
            type: "MDDatePicker",
            label: "Registration Close Date",
            visible: true,
            path: "ProposerDetails.RegisterationCloseDate",
            disabled: dto.ProposerDetails.RegistrationDate === "",
            minDate: new Date(lDto.ProposerDetails.RegistrationDate),
          },
          {
            type: "Input",
            label: "Registration Office",
            visible: true,
            path: "ProposerDetails.RegistrationOffice",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Reference Insured Name",
            visible: true,
            path: "ProposerDetails.ReferenceInsuredName",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            path: "ProposerDetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            // InputProps: { maxLength: 11 },
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "ProposerDetails.MobileNo",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
            disableOnReset: true,
            required: true,
          },
          {
            type: "Input",
            label: "TDS Category",
            visible: true,
            path: "ProposerDetails.TDSCategory",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.Country",
            options: masters.Country,
            disableOnReset: true,
            disabled: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.ProvinceState",
            options: lDto.ProposerDetails.PermanentAdrress.Country !== "" ? masters.State : [],
            required: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State2"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.District",
            options:
              lDto.ProposerDetails.PermanentAdrress.ProvinceState !== "" ? masters.District2 : [],
            required: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District2"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.Municipality",
            options:
              lDto.ProposerDetails.PermanentAdrress.District !== "" ? masters.Municipality2 : [],
            required: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality2"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English) ",
            visible: true,
            // path: "ProposerDetails.Communica tionAddress.TemporaryAddressEnglish",
            path: "ProposerDetails.PermanentAdrress.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            customOnChange: OnInsuredNameEnglish(),
            name: "AddressEnglish2",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Address(Nepali) ",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.AddressNepali",
            onChangeFuncs: [IsFreetextNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.Area",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/StreetName",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },

          {
            type: "Input",
            label: "House Number",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Temporary Address-English ",
            visible: true,
            path: "ProposerDetails.CommunicationAddress.TemporaryAddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "TempAddresEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Temporary Address-Nepali ",
            visible: true,
            path: "ProposerDetails.CommunicationAddress.TemporaryAddressNepali",
            disabled: true,
          },
          { type: "Typography", label: "Document Section", visible: true, spacing: 12 },
          {
            type: "Button",
            label: "Add Document",
            visible: true,
            startIcon: <AddIcon />,
            variant: "outlined",
            onClick: onAddDocument,
            spacing: 12,
          },
          ...spreadDocumentDetails(),
        ],
        // ...spreadMultiKYCDetails().filter((x, i) => i !== 0),

        [
          {
            type: "Typography",
            label: "Upload Profile Picture",
            visible: true,
          },
          {
            type: "Button",
            visible: true,
            component: "label",
            label: "Upload",
            spacing: 2,
            typeFormat: (
              <input
                hidden
                accept="image/bmp, image/jpeg, image/png,"
                type="file"
                onChange={OnProfilePicture}
              />
            ),
          },
          {
            type: "Typography",
            label: lDto.ProposerDetails.ProfilePicture,
            // spacing: 3,
            visible: true,
          },
          {
            type: "IconButton",
            icon: "close",
            // spacing: 2,
            visible: lDto.ProposerDetails.ProfilePicture !== "",
            onClick: onCancelClickProfilePicture,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },
          {
            type: "AutoComplete",
            label: "Gender (English)",
            visible: true,
            path: "ProposerDetails.GenderEnglish",
            // options: masters.Gender,
            options: GenderNepali,
            required: true,
            name: "GenderEnglish",
            customOnChange: (e, a) => handleGender(e, a, "GenderEnglish"),
          },
          {
            type: "Input",
            label: "Gender (Nepali)",
            visible: true,
            path: "ProposerDetails.GenderNepali",
            required: true,
            disabled: true,
          },

          {
            type: "AutoComplete",
            label: "Marital status (English)",
            visible: true,
            path: "ProposerDetails.MaritalStatusEnglish",
            // options: masters.MaritalStatus,
            options: MaritalStatus,
            name: "MaritalStatusEnglish",
            customOnChange: (e, a) => handleMarital(e, a, "MaritalStatusEnglish"),
            required: true,
          },
          {
            type: "Input",
            label: "Marital status (Nepali)",
            visible: true,
            path: "ProposerDetails.MaritalStatusNepali",
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Husband's Name(English)",
            visible: true,
            path: "ProposerDetails.HusbandNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "HusbandNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Husband's Name(Nepali)",
            visible: true,
            path: "ProposerDetails.HusbandNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Wife Name (English)",
            visible: true,
            path: "ProposerDetails.WifeNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "WifeNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Wife Name (Nepali)",
            visible: true,
            path: "ProposerDetails.WifeNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Father Name (English)",
            visible: true,
            path: "ProposerDetails.FatherNameEnglish",
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            name: "FatherNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Father Name (Nepali)",
            visible: true,
            path: "ProposerDetails.FatherNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "GrandFather Name (English)",
            visible: true,
            path: "ProposerDetails.GrandfatherNameEnglish",
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            name: "GrandfatherNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "GrandFather Name (Nepali)",
            visible: true,
            path: "ProposerDetails.GrandfatherNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Nationality (English)",
            visible: true,
            path: "ProposerDetails.NationalityEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Permanent Address (English)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "AddressEnglish2",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Permanent Address (Nepali)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.AddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Town (English)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.TownEnglish",
            onChangeFuncs: [IsAlphaNumNoSpace],
            name: "TownEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Town (Nepali)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.TownNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "City (English)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.CityEnglish",
            onChangeFuncs: [IsAlphaNumNoSpace],
            name: "CityEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "City (Nepali)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.CityNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Temporary Address (English)",
            visible: true,
            path: "ProposerDetails.CommunicationAddress.TemporaryAddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "TemporaryAddressEnglish1",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Temporary Address (Nepali)",
            visible: true,
            path: "ProposerDetails.CommunicationAddress.TemporaryAddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Residence(English)",
            visible: true,
            path: "ProposerDetails.CommunicationAddress.ResidenceEnglish",
            onChangeFuncs: [IsAlphaNumNoSpace],
            name: "ResidenceEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Residence(Nepali)",
            visible: true,
            path: "ProposerDetails.CommunicationAddress.ResidenceNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Citizenship Number",
            visible: true,
            path: "ProposerDetails.CitizenshipNumber",
            required: true,
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Citizenship Issued Date",
            visible: true,
            path: "ProposerDetails.CitizenshipIssuedDate",
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Citizenship Issue District",
            visible: true,
            path: "ProposerDetails.IssueDistrict",
            options: masters.District,
            required: true,
          },
          {
            type: "MDDatePicker",
            label: "Date Of Birth",
            visible: true,
            path: "ProposerDetails.DoB",
            dateFormat: "d/m/Y",
            maxDate,
            required: true,
          },
          {
            type: "Input",
            label: "License Number",
            visible: true,
            spacing: 3,
            path: "ProposerDetails.LicenseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Passport Issued By", labelVisible: true },
            radioList: [
              { value: "India", label: "India" },
              { value: "Nepal", label: "Nepal" },
            ],
            path: "ProposerDetails.PassportIssuedBy",
            // spacing: 12,
          },
          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            path: "ProposerDetails.PassportNumber",
            InputProps: { maxLength: 12 },
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Passport Issued Date",
            visible: true,
            path: "ProposerDetails.PassportIssuedDate",
          },
          {
            type: "MDDatePicker",
            label: "Passport Expiry Date",
            visible: true,
            path: "ProposerDetails.PassportExpiryDate",
            minDate: new Date(lDto.ProposerDetails.PassportIssuedDate),
          },

          // {
          //   type: "Input",
          //   label: "Occupation",
          //   visible: true,
          //   path: "ProposerDetails.InsuredOccupation",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Income Source",
          //   visible: true,
          //   path: "ProposerDetails.IncomeSource",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   disabled: true,
          // },
        ],
        [
          {
            type: "Input",
            label: "Name of the Organization",
            visible: true,
            path: "ProposerDetails.NameoftheOrganisation",
            required: true,
            disabled: true,
            onChangeFuncs: [IsAlphaNumNoSpace],
            InputProps:
              lDto.ProposerDetails.InsuredNameEnglish === "ProposerDetails.NameoftheOrganisation",
          },
          {
            type: "Input",
            label: "Address of Organization",
            visible: true,
            path: "ProposerDetails.OrganizationAddress",
            required: true,
            onChangeFuncs: [IsFreetextNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Organization Phone Number",
            visible: true,
            path: "ProposerDetails.OrganizationContactNo",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Typography",
            label: "Member Details",
            visible: true,
            spacing: 12,
          },
          {
            type: "AutoComplete",
            label: "Member Type",
            visible: true,
            path: "ProposerDetails.MemberType",
            options: masters.MemberType,
          },
          // {
          //   type: "Input",
          //   label: "Phone Number",
          //   visible: true,
          //   path: "ProposerDetails.PhoneNumber",
          //   onChangeFuncs: [IsNumaricSpecialNoSpace],
          // },
          {
            type: "Input",
            label: "Role",
            visible: true,
            path: "ProposerDetails.Role",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Member Name(English)",
            path: "ProposerDetails.MemberNameEnglish",
            visible: true,
            name: "MemberNameEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Member Name (Nepali)",
            visible: true,
            path: "ProposerDetails.MemberNameNepali",
          },
          {
            type: "Input",
            label: "Designation (English)",
            path: "ProposerDetails.DesignationEnglish",
            name: "DesignationEnglish",
            customOnBlur: onBlurTransliteration,
            visible: true,
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Designation (Nepali)",
            visible: true,
            path: "ProposerDetails.DesignationNepali",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender (English)",
            visible: true,
            path: "ProposerDetails.GenderEnglish",
            options: GenderNepali,
            name: "GenderEnglish1",
            customOnChange: (e, a) => handleGender(e, a, "GenderEnglish1"),
          },
          {
            type: "Input",
            label: "Gender (Nepali)",
            visible: true,
            disabled: true,
            path: "ProposerDetails.GenderNepali",
          },
          {
            type: "AutoComplete",
            label: "Marital Status (English)",
            visible: true,
            path: "ProposerDetails.MaritalStatusEnglish",
            options: MaritalStatus,
            name: "MaritalStatusEnglish1",
            customOnChange: (e, a) => handleMarital(e, a, "MaritalStatusEnglish1"),
          },
          {
            type: "Input",
            label: "Marital Status (Nepali)",
            visible: true,
            path: "ProposerDetails.MaritalStatusNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Husband's Name(English)",
            visible: true,
            path: "ProposerDetails.HusbandNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "HusbandNameEnglish1",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Husband's Name(Nepali)",
            visible: true,
            path: "ProposerDetails.HusbandNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Wife Name (English)",
            visible: true,
            path: "ProposerDetails.WifeNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "WifeNameEnglish1",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Wife Name (Nepali)",
            visible: true,
            path: "ProposerDetails.WifeNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Father Name (English)",
            visible: true,
            path: "ProposerDetails.FatherNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "FatherNameEnglish1",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Father Name (Nepali)",
            visible: true,
            path: "ProposerDetails.FatherNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "GrandFather Name (English)",
            visible: true,
            path: "ProposerDetails.GrandFatherNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "GrandfatherNameEnglish1",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "GrandFather Name (Nepali)",
            visible: true,
            path: "ProposerDetails.GrandFatherNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Nationality (English)",
            visible: true,
            path: "ProposerDetails.NationalityEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Permanent Address (English)",
            visible: true,
            path: "ProposerDetails.PermanentAddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "AddressEnglish4",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Permanent Address (Nepali)",
            visible: true,
            path: "ProposerDetails.PermanentAddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Town (English)",
            visible: true,
            path: "ProposerDetails.TownEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "TownEnglish1",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Town (Nepali)",
            visible: true,
            path: "ProposerDetails.TownNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "City (English)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.CityEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "CityEnglish1",
            customOnBlur: onBlurTransliteration,
          },

          {
            type: "Input",
            label: "City (Nepali)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.CityNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Temporary Address (English)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.TempAddresEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "TemporaryAddressEnglish1",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Temporary Address (Nepali)",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.TempAddresNepali",
            disabled: true,
          },

          {
            type: "Input",
            label: "Identification Type",
            visible: true,
            path: "ProposerDetails.IdentificationType",
            onChangeFuncs: [IsAlphaNoSpace],
          },

          {
            type: "Input",
            label: "Citizenship Number",
            visible: true,
            // required: true,
            path: "ProposerDetails.CitizenshipNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Citizenship Issued Date",
            visible: true,
            // required: true,
            path: "ProposerDetails.CitizenshipIssuedDate",
            onBlurFuncs: [IsAlphaNumNoSpace],
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Citizenship Issue District",
            visible: true,
            // required: true,
            path: "ProposerDetails.IssueDistrict",
            options: masters.District,
            onBlurFuncs: [IsAlphaNumNoSpace],
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Date Of Birth",
            // required: true,
            required: flag.dob,
            visible: true,
            dateFormat: "d/m/Y",
            maxDate,
            path: "ProposerDetails.DoB",
          },

          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Passport Issued By", labelVisible: true },
            radioList: [
              { value: "India", label: "India" },
              { value: "Nepal", label: "Nepal" },
            ],
            path: "ProposerDetails.PassportIssuedBy",
            // spacing: 12,
          },

          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            path: "ProposerDetails.PassportNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            InputProps: { maxLength: 12 },
          },
          {
            type: "MDDatePicker",
            label: "Passport Issued Date",
            visible: true,
            path: "ProposerDetails.PassportIssuedDate",
          },
          {
            type: "MDDatePicker",
            label: "Passport Expiry Date",
            visible: true,
            path: "ProposerDetails.PassportExpiryDate",
            minDate: new Date(lDto.ProposerDetails.PassportIssuedDate),
          },

          {
            type: "Input",
            label: "License Number",
            visible: true,
            spacing: 3,
            path: "ProposerDetails.LicenseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          // {
          //   type: "Input",
          //   label: "Occupation",
          //   visible: true,
          //   path: "ProposerDetails.InsuredOccupation",
          //   onChangeFuncs: [IsAlphaNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Income Source",
          //   visible: true,
          //   path: "ProposerDetails.IncomeSource",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Phone Number",
          //   visible: true,
          //   path: "ProposerDetails.PhoneNumber",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   // InputProps: { maxLength: 10 },
          // },
          // {
          //   type: "Input",
          //   label: "Mobile Number",
          //   visible: true,
          //   path: "ProposerDetails.MobileNumber",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   InputProps: { maxLength: 10 },
          // },
          // {
          //   type: "Input",
          //   label: "Email",
          //   visible: true,
          //   path: "ProposerDetails.EmailAddress",
          //   onBlurFuncs: [IsEmail],
          // },

          {
            type: "AutoComplete",
            label: "Status",
            visible: true,
            path: "ProposerDetails.Status",
            options: masters.Status,
          },
          {
            type: "MDDatePicker",
            label: "Appoint Date",
            visible: true,
            path: "ProposerDetails.AppointDate",
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },
          {
            type: "Typography",
            label: "Upload Profile Picture",
            visible: true,
          },
          {
            type: "Button",
            visible: true,
            component: "label",
            label: "Upload",
            spacing: 2,
            typeFormat: (
              <input
                hidden
                accept="image/bmp, image/jpeg, image/png,"
                type="file"
                onChange={OnProfilePicture}
              />
            ),
          },
          {
            type: "Typography",
            label: lDto.ProposerDetails.ProfilePicture,
            // spacing: 3,
            visible: true,
          },
          {
            type: "IconButton",
            icon: "close",
            // spacing: 2,
            visible: lDto.ProposerDetails.ProfilePicture !== "",
            onClick: onCancelClickProfilePicture,
          },
        ],
        [
          { type: "Typography", label: "Care of (English)", visible: true, spacing: 12 },
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.CareofNameEnglish",
            name: "CareofNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "ProposerDetails.CareofPANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            InputProps: { maxLength: 9 },
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            path: "ProposerDetails.CareofContactNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            name: "CareofAddressEnglish",
            path: "ProposerDetails.CareofAddressEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
          },
          { type: "Typography", label: "Care of (Nepali)", visible: true, spacing: 12 },
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.CareofNameNepali",
            onChangeFuncs: [IsAlphaNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.CareofAddressNepali",
            onChangeFuncs: [IsFreetextNoSpace],
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Proprietor Name (English)",
            visible: true,
            onChangeFuncs: [IsAlphaNoSpace],
            path: "ProposerDetails.ProprietorNameEnglish",
            name: "ProprietorNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Proprietor Name (Nepali)",
            visible: true,
            path: "ProposerDetails.ProprietorNameNepali",
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Subject Matter",
            visible: true,
            path: "ProposerDetails.SubjectMatter",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Type",
            visible: true,
            path: "PolicyRiskType",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Category",
            visible: true,
            path: "PolicyRiskCategory",
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            // disableOnReset: true,
          },
        ],
      ];
      break;

    case 2:
      data = [
        [
          {
            type: "Input",
            label: "Client-Type",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.ClientType",
            disableOnReset: true,
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Plan",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Plan",
            disableOnReset: true,
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Geography(Area)",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.Geographylabel",
            disableOnReset: true,
            disabled: true,
            // customOnChange: (e, a) => handlegeograhy(e, a, "Geography"),
          },
          {
            type: "AutoComplete",
            label: "Corporate Discount",
            visible: true,
            disableOnReset: false,
            path: "InsurableItem.0.RiskItems.0.CorporateDiscount",
            options: masters.DirectDiscount,
            InputProps: { readOnly: true },
            customOnChange: (e, a) => OnDirectDiscountAgent(e, a),
          },
          {
            type: "RadioGroup",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.IsAnnualMultiTrip",
            required: true,
            disabled: true,
            disableOnReset: true,
            readOnly: true,
            radioLabel: { label: "Is Annual multi Trip", labelVisible: true },
            radioList: [
              { value: "Yes", label: "Yes", disabled: true },
              {
                value: "No",
                label: "No",
                disabled: true,
              },
            ],
            spacing: 12,
          },
          {
            type: "Button",
            label: "ADD Traveller",
            // visible: flag.ExistingDetails1,
            visible: true,
            // startIcon: <AddIcon />,
            variant: "outlined",
            onClick: onAddTravellerDetails,
            spacing: 12,
          },
          ...spreadTravelDetails()[0],
          {
            type: "Input",
            label: "Base Premium(USD)",
            visible: true,
            required: true,
            InputProps: { readOnly: true },
            path: "PremiumDetails.PremiumAfterCorporateDiscount",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Additional Multiplying rate",
            visible:
              dto.InsurableItem[0].RiskItems[0].Age >= "71" &&
              dto.PremiumDetails.PremiumAfterCorporateDiscount !== "",
            required: true,
            InputProps: { readOnly: true },
            path: "InsurableItem.0.RiskItems.0.AdditionalMultiplyingRate",
            disabled: true,
          },
          {
            type: "Input",
            label: "Other Loading Charge",
            visible: true,
            InputProps: { readOnly: true },
            path: "InsurableItem.0.RiskItems.0.OtherLoadingCharge",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "OtherLoading Charge Premium",
            visible: true,
            InputProps: { readOnly: true },
            path: "InsurableItem.0.RiskItems.0.OtherLoadingChargeusd",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Covid Loading Charge",
            visible: true,
            InputProps: { readOnly: true },
            path: "InsurableItem.0.RiskItems.0.CovidLoadingCharge",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "CovidLoading Charge Premium",
            visible: true,
            InputProps: { readOnly: true },
            path: "InsurableItem.0.RiskItems.0.CovidLoadingChargeusd",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Conversion Rate",
            visible: true,
            InputProps: { readOnly: true },
            required: true,
            path: "InsurableItem.0.RiskItems.0.ConversionRate",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Remarks",
            visible: true,
            path: "PaymentDetails.Remarks",
          }, // ...obj2,
        ],
        ...spreadTravelDetails().filter((x, i) => i !== 0),
        [
          {
            type: "Input",
            label: "Course Name",
            visible: true,
            onChangeFuncs: [IsAlphabeticSpecialNoSpace],
            path: "UniversityDetails.UniversityCourseName",
          },
          {
            type: "Input",
            label: "University/School Name ",
            visible: true,
            onChangeFuncs: [IsAlphabeticSpecialNoSpace],
            path: "UniversityDetails.UniversityorSchoolName",
          },
          {
            type: "Input",
            label: "Course Duration (in months)",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            path: "UniversityDetails.UniversityCourseDuration",
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Input",
            label: "Countries to be visited for futher studies",
            visible: true,
            onChangeFuncs: [IsAlphabeticSpecialNoSpace],
            path: "UniversityDetails.UniversityCountriesToBeVisitedForFurtherStudies",
            spacing: 3.2,
          },
          {
            type: "Input",
            label: "University Address",
            visible: true,
            onChangeFuncs: [IsAlphabeticSpecialNoSpace],
            path: "UniversityDetails.UniversityAddress",
          },
          {
            type: "Input",
            label: "Pincode",
            visible: true,
            onChangeFuncs: [IsNumeric],
            path: "UniversityDetails.UniversityPincode",
          },
          {
            type: "Input",
            label: "Country",
            visible: true,
            onChangeFuncs: [IsAlphabeticSpecialNoSpace],
            path: "UniversityDetails.UniversityCountry",
          },
        ],
        [
          {
            type: "Input",
            label: "Name",
            visible: true,
            onChangeFuncs: [IsAlphabeticSpecialNoSpace],
            path: "SponserDetails.SponserName",
          },
          {
            type: "Input",
            label: "Gender",
            visible: true,
            onChangeFuncs: [IsAlpha],
            path: "SponserDetails.SponserGender",
          },
          {
            type: "Input",
            label: "Date of Birth",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            path: "SponserDetails.SponserDateofBirth",
          },
          {
            type: "Input",
            label: "Age",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            path: "SponserDetails.SponserAge",
          },
          {
            type: "Input",
            label: "Relationship with insured",
            visible: true,
            onChangeFuncs: [IsAlpha],
            path: "SponserDetails.SponserRelationshipWithInsured",
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Issuing Branch",
            visible: true,
            required: true,
            path: "Channel.IssuingBranch",
            // options: masters1.IssuingBranch,
            options: masters.IssuingBranch.filter((x) =>
              loginUserDetails.branchName.split(",").some((y) => y === x.mValue)
            ),
            disabled: dto.proposalNo !== "" && dto.proposalNo !== undefined,
            customOnChange: (e, a) => handleIssuingBranch(e, a, "IssuingBranch"),
            disableOnReset: dto.proposalNo !== "" && dto.proposalNo !== undefined,
          },
          {
            type: "Input",
            label: "Sub-Branch",
            visible: true,
            path: "Channel.SubBranch",
            onChangeFuncs: [IsFreetextNoSpace],
            // onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Fiscal Year",
            visible: true,
            required: true,
            path: "Channel.FiscalYear",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Field Officer Code",
            visible: true,
            path: "Channel.FieldOfficerCode",
            onChangeFuncs: [IsFreetextNoSpace],
            // onBlurFuncs: [IsFreetextNoSpace],
            // options: masters1.FieldOfficerCode,
            optionLabel: "fieldName",
            options: masters1.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Field Officer Name",
            visible: true,
            // required: true,
            path: "Channel.FieldOfficer",
            onChangeFuncs: [IsAlphaNoSpace],
            // disabled: true,
            // onBlurFuncs: [IsAlphaNoSpace],
            optionLabel: "mValue",
            options: masters1.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldofficerName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Code",
            visible: true,
            optionLabel: "fieldName",
            options: masters1.SubFieldOfficer,
            path: "Channel.SubFieldOfficerCode",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficerCode"),
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Name",
            visible: true,
            path: "Channel.SubFieldOfficer",
            onChangeFuncs: [IsAlphaNoSpace],
            optionLabel: "mValue",
            options: masters1.SubFieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficerName"),
          },
          {
            type: "AutoComplete",
            label: "Agent Code",
            visible: true,
            path: "Channel.AgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
            optionLabel: "fieldName",
            options: masters1.Agent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentCode"),
            disabled: lDto.InsurableItem[0].RiskItems[0].CorporateDiscount === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Agent Name",
            visible: true,
            // required: true,
            path: "Channel.AgentName",
            onChangeFuncs: [IsAlphaNoSpace],
            optionLabel: "mValue",
            options: masters1.Agent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentName"),
            disabled: lDto.InsurableItem[0].RiskItems[0].CorporateDiscount === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Code",
            visible: true,
            path: "Channel.SubAgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
            optionLabel: "fieldName",
            options: masters1.SubAgent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgentCode"),
            disabled: lDto.InsurableItem[0].RiskItems[0].CorporateDiscount === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Name",
            visible: true,
            path: "Channel.SubAgentName",
            onChangeFuncs: [IsAlphaNoSpace],
            optionLabel: "mValue",
            options: masters1.SubAgent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgentName"),
            disabled: lDto.InsurableItem[0].RiskItems[0].CorporateDiscount === "Yes",
          },
        ],

        [
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            required: true,
            options: masters.Country,
            path: "RiskAddressDetails.Country",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            required: true,
            // options: masters.State4,
            path: "RiskAddressDetails.ProvinceState",
            options: masters.State,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State4"), // onChangeFuncs: [IsAlphaNumSpace],
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            required: true,
            path: "RiskAddressDetails.District",
            options: masters.District3,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District4"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            required: true,
            path: "RiskAddressDetails.Municipality",
            options: masters.Municipality3,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality4"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "RiskAddressDetails.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English) ",
            visible: true,
            required: true,
            path: "RiskAddressDetails.AddressEnglish",
            name: "AddressEnglish5",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            // onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address(Nepali) ",
            visible: true,
            // required: true,
            path: "RiskAddressDetails.AddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "RiskAddressDetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
            // onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            path: "RiskAddressDetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
            // onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "House Number ",
            visible: true,
            path: "RiskAddressDetails.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            // onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "RiskAddressDetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
        ],
      ];

      break;
    case 4:
      data = [
        [
          {
            type: "Input",
            label: "Basic Premium(USD)",
            visible: true,
            path: "PremiumDetails.PremiumAfterCorporateDiscount",
            disabled: true,
          },
          {
            type: "Input",
            label: "Corporate Discount",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.CorporateDiscount",
            disabled: true,
          },
          {
            type: "Input",
            label: "OtherLoading Charge premium",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.OtherLoadingChargeusd",
            disabled: true,
          },
          {
            type: "Input",
            label: "CovidLoading Charge Premium",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.CovidLoadingChargeusd",
            disabled: true,
          },
          {
            type: "Input",
            label: "ConversionRate",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.ConversionRate",
            disabled: true,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          // {
          //   type: "Modal",
          //   visible: true,
          //   sx: {
          //     width: 380,
          //     height: 380,
          //     top: "15%",
          //     bottom: "10%",
          //     left: "45%",
          //     // justifyContent: "center",
          //     // right: "30%",
          //   },
          //   open: modalOpen,
          //   return: (
          //     <Grid sx={{ justifyContent: "center" }}>
          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //         <MDBox sx={{ display: "flex", justifyContent: "right" }}>
          //           <ClearIcon onClick={handleModalClose} />
          //         </MDBox>
          //       </Grid>

          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //         <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          //           <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
          //         </MDBox>
          //       </Grid>

          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={2}>
          //         <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
          //           Proposal Send For Approval
          //         </Typography>
          //       </Grid>
          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={3}>
          //         <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          //           <MDButton onClick={onModalclose}>Close</MDButton>
          //         </MDBox>
          //       </Grid>
          //     </Grid>
          //   ),
          // },
          // {
          //   type: "Modal",
          //   visible: true,
          //   sx: {
          //     width: 400,
          //     height: 400,
          //     top: "15%",
          //     bottom: "10%",
          //     left: "45%",
          //     // justifyContent: "center",
          //     // right: "30%",
          //   },
          //   open: savemodalopen,
          //   return: (
          //     <Grid sx={{ justifyContent: "center" }}>
          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //         <MDBox sx={{ display: "flex", justifyContent: "right" }}>
          //           <ClearIcon onClick={SavehandleModalClose} />
          //         </MDBox>
          //       </Grid>
          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //         <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          //           <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
          //         </MDBox>
          //       </Grid>
          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={2}>
          //         <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
          //           Do You Wish To Preview Or Save The Debit Note
          //         </Typography>
          //       </Grid>
          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingBottom={1}>
          //         <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
          //           <MDButton variant="outlined" onClick={onDebitNoteClick}>
          //             PREVIEW <VisibilityIcon label="PREVIEW" />
          //           </MDButton>
          //           <MDButton onClick={onSaveModalClose}>SAVE DEBIT NOTE</MDButton>
          //         </MDBox>
          //       </Grid>
          //     </Grid>
          //   ),
          // },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Custom",
            // required: true,
            visible: true,
            spacing: 6,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#eeeeee",
                  p: "15px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>Gross Premium</Typography>
                    <Typography>Other Loading Charge Premium</Typography>
                    <Typography>Covid Loading Charge Premium</Typography>
                    <Typography>VAT</Typography>
                    <Typography>Stamp Duty</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {formater.format(dto.PremiumDetails.GrossPremiumNepal)}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {formater.format(dto.PremiumDetails.OtherLoadingChargePremiumAmt)}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {formater.format(dto.PremiumDetails.CovidLoadingChargePremiumAmt)}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {formater.format(dto.PremiumDetails.VAT)}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {formater.format(dto.PremiumDetails.StampDuty)}
                    </Typography>
                  </Grid>
                  <List
                    sx={{
                      width: "100%",
                      height: "1px",
                      bgcolor: "#9e9e9e",
                    }}
                  >
                    {/* <Divider sx={{ height: "1px" }} /> */}
                  </List>{" "}
                  <Grid item xs={8}>
                    <Typography>
                      <b>Total Premium</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      <b>रु</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      <b>{formater.format(dto.PremiumDetails.FinalPremium)}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            label: "",
            spacing: 3,
            visible: lDto.Channel.AgentCode !== "0000",
          },
          {
            type: "Typography",
            label: "",
            spacing: 3,
            visible: lDto.Channel.AgentCode !== "0000",
          },
          {
            type: "Custom",
            // required: true,
            visible: lDto.Channel.AgentCode !== "0000" && lDto.Channel.AgentCode !== "",
            spacing: 6,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#eeeeee",
                  p: "15px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    {" "}
                    <Typography>
                      {" "}
                      <b>Commission Percentage </b>
                    </Typography>{" "}
                    <Typography>
                      {" "}
                      <b>Commission Amount </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {" "}
                      <b>%</b>
                    </Typography>
                    <Typography>
                      {" "}
                      <b>रु</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      <b>{dto.PremiumDetails.CommissionPercentage}</b>
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      <b>{formater.format(dto.PremiumDetails.CommissionAmount)}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            ),
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  p: "5px",
                  mt: "10px",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Typography>
                    <strong>Do you wish to share Debit Note via</strong>
                  </Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox onChange={onEmailClick} />}
                      label="E-mail"
                    />
                    <FormControlLabel control={<Checkbox disabled />} label="SMS" />
                  </FormGroup>
                </Stack>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 1,
          },
          {
            type: "GroupButton",
            visible: true,
            spacing: 12,
            justifyContent: "center",
            buttons: [
              {
                visible: true,
                label:
                  genericInfo.Flow &&
                  (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                    ? "Save Details"
                    : "Save Debit Note",
                color: "error",
                onClick:
                  genericInfo.Flow &&
                  (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                    ? onSaveModalClose
                    : handlesavedebitnote,
              },
              {
                visible: true,
                label: "Preview Debit Note",
                // endIcon: "visibility",
                onClick: () => onDebitNoteClick(),
                color: "info",
              },

              // { visible: true, label: "Download Proposal", color: "info" },
              {
                visible: true,
                label: "Send For Approval",
                color: "error",
                onClick: () => handleSavepolicyWFStatus(),
              },
            ],
          },
          {
            type: "Modal",
            visible: true,
            sx: {
              width: 380,
              height: 380,
              top: "15%",
              bottom: "10%",
              left: "45%",
              // justifyContent: "center",
              // right: "30%",
            },
            open: modalOpen,
            return: (
              <Grid sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={handleModalClose} />
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    Debit Note Sent For Approval
                  </Typography>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    {dto.proposalNo}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton onClick={onModalclose}>Close</MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: true,
            sx: {
              width: 400,
              height: 400,
              top: "15%",
              bottom: "10%",
              left: "45%",
              // justifyContent: "center",
              // right: "30%",
            },
            open: savemodalopen,
            return: (
              <Grid sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={SavehandleModalClose} />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={2}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    Do You Wish To Preview and Save The Debit Note
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingBottom={1}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    {/* <MDButton variant="outlined" onClick={() => onDebitNoteClick()}>
                      Preview Debit Note
                      {/* <VisibilityIcon label="PREVIEW" /> */}
                    {/* </MDButton> */}

                    <MDButton onClick={(e) => onDebitNoteClick(e, "SAVE DEBIT NOTE")}>
                      SAVE DEBIT NOTE
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
        ],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <PaymentPage
                prod="Nepal"
                DebitNoteApprovalStatus="true"
                PolicyDto={lDto}
                genericInfo={genericInfo}
                PaymentMode={[
                  { label: "Online", value: "Online" },
                  { label: "Offline", value: "Offline" },
                ]}
                OfflinePT={{
                  amount: objectPath.get(
                    lDto,
                    "FormatedData.CalculatedPremiumDetails.FinalPremium"
                  ),
                  data: [
                    {
                      label: "Cash",
                      value: "Cash",
                    },
                    {
                      label: "Cheque",
                      value: "Cheque",
                    },
                  ],
                }}
                OnlinePT={[
                  { label: "Nepal Clearing House", path: "NepalClearingHouse" },
                  { label: "e-Seva", value: "e-Seva" },
                ]}
              />
            ),
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
const getOnNextClick = async ({ activeStep, dto, setBackDropFlag, setDto }) => {
  let fun = false;
  const lDto = dto;

  // const handleProposal = async () => {
  //   debugger;
  //   if (lDto.ProposalNo === undefined) {
  //     await SaveCreateProposal(lDto).then(async (x) => {
  //       if (x.data.proposalNumber) {
  //         const res = await GetProposalByNumber(x.data.proposalNumber);
  //         lDto.KYCNo = res.data[0].policyDetails.KYCNo;
  //         setDto({ ...lDto, ProposalNo: x.data.proposalNumber });
  //         fun = true;
  //       } else {
  //         setBackDropFlag(false);
  //         swal.fire({
  //           icon: "error",
  //           text: "Incurred an error please try again later",
  //           confirmButtonColor: "#0079CE",
  //         });
  //       }
  //       return fun;
  //     });
  //   }
  //   if (lDto.ProposalNo !== "" && lDto.ProposalNo !== undefined) {
  //     fun = await UpdateProposalDetails(lDto).then(async (x) => {
  //       if (x.responseMessage === "Updated successfully") {
  //         const res = await GetProposalByNumber(x.data.proposalNumber);

  //         lDto.KYCNo = res.data[0].policyDetails.KYCNo;
  //         setDto({ ...lDto });
  //         setBackDropFlag(false);
  //       }
  //       return true;
  //     });
  //   }
  //   setDto({ ...lDto });
  //   return fun;
  // };
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (lDto !== null) {
    switch (activeStep) {
      case 0:
        fun = await GenericApi("NPTMI", "NepalTMIRatingAPI", lDto).then(async (x) => {
          if (x.finalResult) {
            lDto.PremiumDetails = x.finalResult;
            lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
            const res1 = await SaveQuotation(lDto);
            lDto["Quotation No"] = res1.data.quotation.quoteNo;
            setDto({ ...lDto });
            setBackDropFlag(false);
            const fun1 = await swal
              .fire({
                title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                html: `<div style="display: flex; flex-direction: row;">
                  <div style="flex: 3; text-align: left; margin-left: 0rem;">
                    <div>Gross Premium</div>
                    <div>Other Loading Charge Premium</div>
                    <div>Covid Loading Charge Premium</div>
                    <div>VAT</div>
                    <div>Stamp Duty</div>
                    <div><b>Total Premium</b></div>
                  </div>
                  <div style="flex: 1.7; text-align: right; font-size: 16.3px; margin-right: 1rem;">
                    <div>रु</div>
                    <div>रु</div>
                    <div>रु</div>
                    <div>रु</div>
                    <div>रु</div>
                    <div><b>रु</b></div>
                  </div>
                  <div style="flex: 1.3; text-align: right; margin-right: 0rem;">
                    <div>${formater.format(x.finalResult.GrossPremiumNepal)}</div>
                    <div>${formater.format(x.finalResult.OtherLoadingChargePremiumAmt)}</div>
                    <div>${formater.format(x.finalResult.CovidLoadingChargePremiumAmt)}</div>
                    <div>${formater.format(x.finalResult.VAT)}</div>
                    <div>${formater.format(x.finalResult.StampDuty)}</div>
                    <div><b>${formater.format(x.finalResult.FinalPremium)}</b></div>
                  </div>
                </div>
                `,
                showConfirmButton: true,
                width: 600,
                confirmButtonText: "Proceed",
                confirmButtonColor: "#0079CE",
                // showCa600ncelButton: true,
                // cancelButtonColor: "#ef5350",
                showCloseButton: true,
                allowOutsideClick: false,
              })
              .then((resX) => {
                if (resX.isConfirmed) return true;
                return false;
              });
            return fun1;
          }
          setBackDropFlag(false);
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
          return false;
        });
        break;

      case 1:
        fun = true;
        break;
      case 2:
        fun = await GenericApi("NPTMI", "NepalTMIRatingAPI", lDto).then(async (x) => {
          if (x.finalResult) {
            lDto.PremiumDetails = x.finalResult;
            lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
            await QuotationUpdate(lDto);
            objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.GrossPremiumNepal",
              formater.format(x.finalResult.GrossPremiumNepal)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.OtherLoadingChargePremiumAmt",
              formater.format(x.finalResult.OtherLoadingChargePremiumAmt)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.CovidLoadingChargePremiumAmt",
              formater.format(x.finalResult.CovidLoadingChargePremiumAmt)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.VAT",
              formater.format(x.finalResult.VAT)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.StampDuty",
              formater.format(x.finalResult.StampDuty)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.FinalPremium",
              formater.format(x.finalResult.FinalPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.CommissionAmount",
              formater.format(x.finalResult.CommissionAmount)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
              x.finalResult.CommissionPercentage
            );

            setDto({ ...lDto });
            return true;
          }
          setBackDropFlag(false);
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
          return false;
        });
        break;
      case 3:
        // fun = handleProposal();
        // break;
        if (lDto.proposalNo === undefined) {
          fun = await GenericApi("NPTMI", "NepalTMIProposal", lDto).then(async (x) => {
            console.log("x", x);
            if (x.finalResult.proposalNumber) {
              await GetProductByCode("NPTMI").then(async (x2) => {
                const res = await GetProposalByNumber(
                  x.finalResult.proposalNumber,
                  x2.data.productId
                );
                lDto.KYCNo = res.data[0].policyDetails.KYCNo;
                setDto({ ...lDto, proposalNo: x.finalResult.proposalNumber });
                fun = true;
              });
            } else {
              setBackDropFlag(false);
              swal.fire({
                icon: "error",
                text: "Incurred an error please try again later",
                confirmButtonColor: "#0079CE",
              });
            }
            return fun;
          });
        } else if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
          const x = await UpdateProposalDetails(lDto);
          if (x.data.responseMessage === "Updated successfully") {
            await GetProductByCode("NPTMI").then(async (x2) => {
              const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);
              lDto.KYCNo = res.data[0].policyDetails.KYCNo;
              lDto.proposalNo = x.data.data.proposalNo;
              setDto({ ...lDto });
            });
            fun = true;
          }
        }
        break;
      case 4:
        setBackDropFlag(false);
        fun = swal
          .fire({
            input: "checkbox",
            confirmButtonColor: "#0079CE",

            showCloseButton: true,
            // showCancelButton: true,
            // cancelButtonColor: "#ef5350",
            html: `<div> <img src=${Success} alt="success"></div>`,
            inputPlaceholder: `<b style=font-size:20px;margin-left:5px;>Proceed to Payment Without Approval</b>`,
            inputAttributes: {
              id: "checkbox",
              style: "transform:scale(1.8);",
            },
          })
          .then((result) => {
            if (result.isConfirmed) {
              if (result.value) return true;
            }
            return false;
          });

        break;
      case 5:
        fun = true;

        break;

      default:
        fun = true;
        break;
    }
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  const onReset1 = (dto, setDto) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.documentDetails = [{ ...docDetails() }];
    lDto.InsurableItem[0].RiskItems.push({ ...AddTravellerDetailsjson() });

    setDto({ ...lDto });
  };
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Calculate Total Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: onReset1 },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false, loader: "backDrop" },
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

const getMasterData = async ({ dto, setDto, additionalInformation }) => {
  const lDto = dto;
  const masters = {
    Salutation: [],
    Gender: [],
    State: [],
    District: [],
    Municipality: [],
    BranchDetailsComponets: [],
    ClientType: [],
    SubClass: [],
    Plan: [],
    Geography: [],
    DirectDiscount: [],
    placeMasters: [{ district: [], municipality: [] }],
    IssuingBranch: [],
    BankDetails: [],
    BankorFinancialInstituionNameinEnglish: [],
    BranchMasters: [],
    FieldOfficer: [],
    SubFieldOfficerCode: [],
    AgentCode: [],
    SubAgentCode: [],
  };

  const userDetails = additionalInformation?.loginUserDetails;
  if (userDetails && userDetails?.displayName) {
    lDto.AgentName = userDetails?.displayName;
    lDto.AgentMobileNo = userDetails?.contactNumber;
    // lDto.PaymentAmount = lDto.FinalPremium;
    setDto({ ...lDto });
  }

  await GetNPCommonMaster().then((r) => {
    r.forEach((x) => {
      masters[x.mType] = x.mdata;
    });
    masters.SubClass = masters.SubClass.filter((x) => x.fieldName === "TravelMedicalInsurance");
    masters.Plan1 = masters.Plan.filter((x) => x.mType === "Plan");
    masters.ClientType1 = masters.ClientType.filter((x) => x.mType === "ClientType");
    masters.Geography1 = masters.Geography.filter((x) => x.mType === "Geography");
  });

  await GetProdPartnermasterData("State", {}).then((r) => {
    masters.State = r.data;
  });
  return masters;
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
