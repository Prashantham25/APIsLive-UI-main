import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import AddIcon from "@mui/icons-material/Add";
import objectPath from "object-path";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import Success from "assets/images/Nepal/Success.png";
import { useState } from "react";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import swal2 from "sweetalert2";
import swal from "sweetalert";
import {
  CommercialJson,
  BranchDetails,
  docDetails,
  ProposerDetails,
  Bankdetails,
  RollOverDocuments,
} from "./data/Json/CommercialJson";
import {
  GetNPCommonMaster,
  GetProdPartnermasterData,
  GenericApi,
  SaveQuotation,
  IsAlphaNumNoSpace,
  // SaveCreateProposal,
  IsAlphaNoSpace,
  Transliteration,
  DocumenUpload,
  DeleteDocument,
  QuotationUpdate,
  UpdateProposalDetails,
  UpdateWorkflowStatus,
  SavepolicyWFStatus,
  SendNotification,
  PolicyStartDateFiscalYear,
  PolicyStartDateMaxDate,
  NumberofDaysinYear,
  GetProductByCode,
} from "./data/APIs/MotorCycleApi";

import PaymentPage from "../../Payment";
import { GetTemplatePayload, GetProposalByNumber } from "../../Payment/Apis";

import {
  IsNumeric,
  arrayRange,
  // addDays,
  IsEmail,
  // IsNumaricSpecial,
  // IsAlphaNum,
  IsMobileNumber,
  IsFreetextNoSpace,
  // IsNumaricSpecialNoSpace,
  DateFormatFromDateObject,
  // DateFormatFromStringDate,
  AgeCalculator,
  addDays1,
} from "../../../../../../Common/Validations";
// import MDInput from "../../../../../../components/MDInput";
import { setGenericInfo, useDataController } from "../../../../../BrokerPortal/context";

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = CommercialJson();
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
};

const getProcessSteps = () => {
  const steps = [
    "Quote Details  ",
    "Customer Details",
    "Vehicle Details",
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
          name: "Branch Details",
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
        {
          name: "Individual",
          visible: dto.FinancingType !== "" && dto.ProposerDetails.InsuredType === "Individual",
        },
        {
          name: dto.ProposerDetails.InsuredType,
          visible:
            dto.FinancingType !== "" &&
            dto.ProposerDetails.InsuredType !== "" &&
            dto.ProposerDetails.InsuredType !== "Individual",
        },
        {
          name: "Care of Details",
          visible: dto.FinancingType !== "",
        },
        { name: "Proprietor Details", visible: dto.FinancingType !== "" },
        { name: "Other Details", visible: dto.FinancingType !== "" },
      ];

      break;
    case 2:
      steps = [
        { name: "Vehicle Details", visible: true },
        {
          name: "Roll Over Documents",
          visible: dto.DocType === "RollOver" && dto.Class !== "Third Party Commercial",
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
      steps = [{ name: "Premium Summary", visible: true }];
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
const getSectionContent = ({ activeStep, masters, dto, setDto, setMasters }) => {
  const lDto = dto;
  const masters1 = masters;
  console.log("dtodata", lDto);

  const [control, dispatch] = useDataController();
  const { genericInfo, loginUserDetails } = control;

  const IsNumaricSpecialNoSpace = (str) => {
    const regex = /^[0-9-+]+[0-9-+\s]*$/;
    if (regex.test(str) || str === "") {
      return true;
    }
    return "Allows only numbers and special characters";
  };
  const IsNumericGreaterThanZero = (number) => {
    const regex = /^(?!(0))[0-9]*$/;
    if (regex.test(number)) return true;
    return "Value must be greater than zero and Numeric";
    //  " Allows only number";
  };

  // Translation English To Nepali
  const onBlurTransliteration = async (e, index, EF, ET) => {
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
      const Text = res?.[0]?.text ? res[0].text : "";

      if (varName === "BankNameinEnglish") {
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = Text;
      }
      if (varName === "BankAddressEnglish") {
        lDto.Bankdetails.AddressNepali = Text;
      }
      if (varName === "BranchNameinEnglish") {
        lDto.Bankdetails.BranchDetails[index].AddressNepali = Text;
      }
      if (varName === "InsuredNameEnglish") {
        lDto.ProposerDetails.InsuredNameNepali = Text;
      }
      if (varName === "TemporaryAddressEnglish") {
        lDto.ProposerDetails.CommunicationAddress.TemporaryAddressNepali = Text;
      }
      if (varName === "TemporaryAddressEnglish1") {
        lDto.ProposerDetails.CommunicationAddress.TemporaryAddressNepali = Text;
      }
      if (varName === "PermanentAdrressEnglish") {
        lDto.ProposerDetails.PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "HusbandNameEnglish") {
        lDto.ProposerDetails.HusbandNameNepali = Text;
      }
      if (varName === "HusbandNameEnglish1") {
        lDto.ProposerDetails.HusbandNameNepali = Text;
      }
      if (varName === "WifeNameEnglish") {
        lDto.ProposerDetails.WifeNameNepali = Text;
      }
      if (varName === "WifeNameEnglish1") {
        lDto.ProposerDetails.WifeNameNepali = Text;
      }
      if (varName === "FatherNameEnglish") {
        lDto.ProposerDetails.FatherNameNepali = Text;
      }
      if (varName === "GrandFatherNameEnglish") {
        lDto.ProposerDetails.GrandfatherNameNepali = Text;
      }
      if (varName === "PermanentAddressEnglish") {
        lDto.ProposerDetails.PermanentAddressNepali = Text;
      }
      if (varName === "TownEnglish") {
        lDto.ProposerDetails.PermanentAdrress.TownNepali = Text;
      }
      if (varName === "CityEnglish") {
        lDto.ProposerDetails.PermanentAdrress.CityNepali = Text;
      }
      if (varName === "TempAddresEnglish") {
        lDto.ProposerDetails.PermanentAdrress.TempAddresNepali = Text;
      }
      if (varName === "FatherNameEnglish1") {
        lDto.ProposerDetails.FatherNameNepali = Text;
      }
      if (varName === "GrandFatherNameEnglish1") {
        lDto.ProposerDetails.GrandfatherNameNepali = Text;
      }
      if (varName === "PermanentAddressEnglish1") {
        lDto.ProposerDetails.PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "TownEnglish1") {
        lDto.ProposerDetails.PermanentAdrress.TownNepali = Text;
      }
      if (varName === "CityEnglish1") {
        lDto.ProposerDetails.PermanentAdrress.CityNepali = Text;
      }
      if (varName === "TempAddresEnglish1") {
        lDto.ProposerDetails.PermanentAdrress.TempAddresNepali = Text;
      }
      if (varName === "ResidenceEnglish") {
        lDto.ProposerDetails.CommunicationAddress.ResidenceNepali = Text;
      }
      if (varName === "ProprietorNameEnglish") {
        lDto.ProposerDetails.ProprietorNameNepali = Text;
      }
      if (varName === "RiskAddressEnglish") {
        lDto.RiskAddressDetails.AddressNepali = Text;
      }
      if (varName === "VehicleNoEnglish") {
        lDto.InsurableItem[0].RiskItems[0].VehicleNoNepali = Text;
      }
      if (varName === "MemberNameEnglish") {
        lDto.ProposerDetails.MemberNameNepali = Text;
      }
      if (varName === "DesignationEnglish") {
        lDto.ProposerDetails.DesignationNepali = Text;
      }
      if (varName === "CareofNameEnglish") {
        lDto.ProposerDetails.CareofNameNepali = Text;
      }
      if (varName === "CareofAddressEnglish") {
        lDto.ProposerDetails.CareofAddressNepali = Text;
      }
      setDto({ ...lDto });
    }
  };
  // Translation English To Nepali Dropdown
  const GenderNepali = [
    { mID: 1, mValue: "Male", translation: "पुरुष" },
    { mID: 2, mValue: "Female", translation: "महिला" },
    { mID: 3, mValue: "Others", translation: "अन्य" },
  ];
  const handleGender = (e, a) => {
    if (a !== null) {
      lDto.ProposerDetails.GenderEnglish = a.mValue;
      lDto.ProposerDetails.GenderNepali = a.translation;
    } else {
      lDto.ProposerDetails.GenderEnglish = "";
      lDto.ProposerDetails.GenderNepali = "";
    }
    setDto({ ...lDto });
  };
  const MaritalStatus = [
    { mID: 1, mValue: "Unmarried", translation: "अविवाहित" },
    { mID: 2, mValue: "Married", translation: "विवाहित" },
    { mID: 3, mValue: "Divorced", translation: "विभाजक" },
    { mID: 4, mValue: "Widow", translation: "विधवा" },
  ];
  const handleMarital = (e, a) => {
    if (a !== null) {
      lDto.ProposerDetails.MaritalStatusEnglish = a.mValue;
      lDto.ProposerDetails.MaritalStatusNepali = a.translation;
    } else {
      lDto.ProposerDetails.MaritalStatusEnglish = "";
      lDto.ProposerDetails.MaritalStatusNepali = "";
    }
    setDto({ ...lDto });
  };

  // Commercial Comprehensive OR Third Party Commercial
  // const OnClassSelect = async (e, a) => {
  //   if (a === null) {
  //     lDto.Class = "";
  //      lDto.Classlabel = "";
  //   } else {
  //     lDto.Class = a.description;
  //      lDto.Classlabel = a.mValue;

  //     if (a.mValue === "Commercial Comprehensive") {
  //       lDto.InsurableItem[0].RiskItems[0].DirectDiscount = "";
  //       lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "";
  //       lDto.InsurableItem[0].RiskItems[0].VehicleCost = "";
  //       lDto.TotalSumInsured = "";
  //       lDto.InsurableItem[0].RiskItems[0].TypeofCover = "";
  //       lDto.InsurableItem[0].RiskItems[0].UtilityCost = 0;
  //       lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured = 0;
  //     }

  //     lDto.BusinessType = "New Business";
  //     lDto.PremiumType = "";
  //     lDto.InsurableItem[0].RiskItems[0].VehicleCategory = "";
  //     lDto.InsurableItem[0].RiskItems[0].TypeofCover = "";
  //     lDto.InsurableItem[0].RiskItems[0].GovernmentVehicle = "";
  //     lDto.InsurableItem[0].RiskItems[0].AgeofVehicle = "";
  //     lDto.InsurableItem[0].RiskItems[0].CCKW = "";
  //     lDto.InsurableItem[0].RiskItems[0].YearofVehicleManufacture = "";
  //     lDto.PolicyStartDate = "";
  //     lDto.PolicyEndDate = "";
  //     lDto.NumberofDays = "";
  //     lDto.Period = "";
  //   }

  //   lDto.ICShortName = masters.Company;
  //   setDto({ ...lDto });
  //   setMasters({ ...masters1 });
  // };

  const OnClassSelect = (e, a) => {
    if (a !== null) {
      lDto.Class = a.mValue;
      lDto.ShortCode = a.mValue;
      lDto.PolicyStartDate = DateFormatFromDateObject(new Date(), "m/d/y");

      if (lDto.Class === "Commercial Comprehensive") {
        lDto.RiProductCode = "NepalCommercialVehicle";
        lDto.InsurableItem[0].RiskItems[0].VolunatryExcess = "10000";
        lDto.TotalSumInsured = "";
      } else {
        lDto.RiProductCode = "NepalCommercialVehicleTP";
        lDto.InsurableItem[0].RiskItems[0].VolunatryExcess = "";
        lDto.TotalSumInsured = "0";
      }
      if (lDto.ProvinceCode !== undefined) {
        const BusinessTypeCode = lDto.DocType.split("")[0];
        lDto.PolicyPrefix = lDto.ProvinceCode.concat("/", lDto.ShortCode, "/", "MV").concat(
          "/",
          a.shortCode,
          "/",
          BusinessTypeCode,
          "/",
          lDto.Channel.FiscalYear,
          "/"
        );
      }
    } else {
      lDto.Class = "";
      lDto.RiProductCode = "";
      lDto.PolicyStartDate = "";
    }

    lDto.InsurableItem[0].RiskItems[0].DirectDiscount = "";
    lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "";
    lDto.InsurableItem[0].RiskItems[0].VehicleCost = "";
    // lDto.TotalSumInsured = "";
    lDto.InsurableItem[0].RiskItems[0].UtilityCost = 0;
    lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured = 0;
    lDto.BusinessType = "New Business";
    lDto.PremiumType = "";
    lDto.InsurableItem[0].RiskItems[0].VehicleCategory = "";
    lDto.InsurableItem[0].RiskItems[0].TypeofCoverlabel = "";
    lDto.InsurableItem[0].RiskItems[0].GovernmentVehicle = "";
    lDto.InsurableItem[0].RiskItems[0].AgeofVehicle = "";
    lDto.InsurableItem[0].RiskItems[0].CCKW = "";
    lDto.InsurableItem[0].RiskItems[0].YearofVehicleManufacture = "";
    // lDto.PolicyStartDate = DateFormatFromDateObject(new Date(), "m/d/y");
    // lDto.PolicyStartDate = "";
    lDto.PolicyEndDate = "";
    lDto.NumberofDays = "";
    lDto.Period = "";
    lDto.ICShortName = masters.Company;

    // if (lDto.ProvinceCode !== undefined) {
    //   const BusinessTypeCode = lDto.DocType.split("")[0];
    //   lDto.PolicyPrefix = lDto.ProvinceCode.concat("/", lDto.ShortCode, "/", "MV").concat(
    //     "/",
    //     a.shortCode,
    //     "/",
    //     BusinessTypeCode,
    //     "/",
    //     lDto.Channel.FiscalYear,
    //     "/"
    //   );
    // }

    setDto({ ...lDto });
    setMasters({ ...masters1 });
  };

  // PolicyStartDate Set to PolicyEndDate
  const OnPSDSelect = (e, d) => {
    // console.log(d, 99);
    lDto.PolicyStartDate = d;
    if (d !== "" && d !== undefined) {
      if (lDto.PremiumType === "Normal") {
        lDto.NumberofDays = NumberofDaysinYear(
          lDto.PolicyStartDate,
          lDto.PolicyStartDate.split("/")[2]
        );
      }
      lDto.PolicyEndDate = addDays1(d, lDto.NumberofDays);
      // if (lDto.PremiumType === "Short Period") {
      //   if (lDto.Period === "Above 8 months" && lDto.NumberofDays === "366") {
      //     lDto.NumberofDays = NumberofDaysinYear(
      //       lDto.PolicyStartDate,
      //       lDto.PolicyStartDate.split("/")[2]
      //     );
      //   }
      //   lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      // }
      if (
        (lDto.PolicyStartDate !== "" && lDto.NumberofDays === "") ||
        lDto.PolicyStartDate === ""
      ) {
        lDto.PolicyEndDate = "";
      }
    } else {
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };
  // YearofVehicleManufacture Set to AgeofVehicle
  const OnYOMselect = (e, a) => {
    if (a !== null) {
      // console.log(a, 111);
      lDto.InsurableItem[0].RiskItems[0].YearofVehicleManufacture = a.mValue;
      if (a.mValue !== undefined && a.mValue !== "") {
        const CY = new Date().getFullYear();
        const SY = parseInt(a.mValue, 10);
        const VA = CY - SY;
        lDto.InsurableItem[0].RiskItems[0].AgeofVehicle = VA.toString();
        setDto({ ...lDto });
      }
      if (lDto.Class === "Commercial Comprehensive") {
        if (lDto.ClassCategorylabel === "Agriculture & Forestry Vehicle") {
          if (lDto.InsurableItem[0].RiskItems[0].AgeofVehicle <= 5) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "5000";
          }
          if (
            lDto.InsurableItem[0].RiskItems[0].AgeofVehicle > 5 &&
            lDto.InsurableItem[0].RiskItems[0].AgeofVehicle <= 10
          ) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "7000";
          }
          if (lDto.InsurableItem[0].RiskItems[0].AgeofVehicle > 10) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "10000";
          }
        }
        if (lDto.ClassCategorylabel === "Tempo/E-Rickshaw") {
          if (lDto.InsurableItem[0].RiskItems[0].AgeofVehicle <= 5) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "1000";
          }
          if (
            lDto.InsurableItem[0].RiskItems[0].AgeofVehicle > 5 &&
            lDto.InsurableItem[0].RiskItems[0].AgeofVehicle <= 10
          ) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "2000";
          }
          if (lDto.InsurableItem[0].RiskItems[0].AgeofVehicle > 10) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "3000";
          }
        }
        if (lDto.ClassCategorylabel === "Tractor & Power Trailer") {
          if (lDto.InsurableItem[0].RiskItems[0].AgeofVehicle <= 5) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "2000";
          }
          if (
            lDto.InsurableItem[0].RiskItems[0].AgeofVehicle > 5 &&
            lDto.InsurableItem[0].RiskItems[0].AgeofVehicle <= 10
          ) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "4000";
          }
          if (lDto.InsurableItem[0].RiskItems[0].AgeofVehicle > 10) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "6000";
          }
        }
        if (lDto.ClassCategorylabel === "Passenger Carrying Vehicle") {
          if (lDto.InsurableItem[0].RiskItems[0].AgeofVehicle < 5) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "2000";
          }
          if (
            lDto.InsurableItem[0].RiskItems[0].AgeofVehicle >= 5 &&
            lDto.InsurableItem[0].RiskItems[0].AgeofVehicle <= 10
          ) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "4000";
          }
          if (lDto.InsurableItem[0].RiskItems[0].AgeofVehicle > 10) {
            lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "6000";
          }
        }
      } else {
        lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "";
      }
    } else {
      lDto.InsurableItem[0].RiskItems[0].YearofVehicleManufacture = "";
      lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "";
      lDto.InsurableItem[0].RiskItems[0].AgeofVehicle = "";
    }
    setDto({ ...lDto });
  };
  // PremiumType Set to NumberofDays
  const OnPTSelect = (e, a) => {
    if (a !== null) {
      // console.log(a, 11);
      lDto.PremiumType = a.mValue;
      // lDto.Period = "";
      if (a.mValue === "Normal") {
        lDto.PolicyStartDate = DateFormatFromDateObject(new Date(), "m/d/y");
        lDto.NumberofDays = NumberofDaysinYear(
          DateFormatFromDateObject(new Date(), "m/d/y"),
          DateFormatFromDateObject(new Date(), "m/d/y").split("/")[2]
        );

        lDto.PolicyEndDate = addDays1(
          lDto.PolicyStartDate,
          NumberofDaysinYear(
            DateFormatFromDateObject(new Date(), "m/d/y"),
            DateFormatFromDateObject(new Date(), "m/d/y").split("/")[2]
          )
        );
      }
      if (a.mValue === "Short Period") {
        lDto.Period = "";
        lDto.NumberofDays = "";
        // lDto.PolicyStartDate = "";
        lDto.PolicyEndDate = "";
        masters.Period.forEach((x) => {
          if (lDto.Period === x.mValue) {
            const nod = lDto.NumberofDays;
            if (nod !== undefined)
              if (
                parseInt(nod, 10) > Number(x.description) &&
                parseInt(nod, 10) < Number(x.fieldName)
              );
            // lDto.NumberofDays = "";
          }
        });
      }
    } else {
      lDto.PremiumType = "";
      lDto.NumberofDays = "";
      lDto.Period = "";
      // lDto.PolicyStartDate = "";
      // lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };
  const handleRenewalDocs = (e, a) => {
    lDto.DocType = a.mValue;
    if (a !== "" && a.mValue === "Fresh") {
      lDto.RollOverDocuments = RollOverDocuments();
    }
    setDto({ ...lDto });
  };
  // const OnPTSelect = (e, a) => {
  //   // console.log(a, 11);
  //   lDto.PremiumType = a.mValue;
  //   if (a.mValue === "Normal") {
  //     lDto.NumberofDays = "365";
  //   }
  //   if (a.mValue === "Short Period") {
  //     lDto.Period = "";
  //     lDto.NumberofDays = "";
  //     lDto.PolicyStartDate = "";
  //     lDto.PolicyEndDate = "";
  //     masters.Period.forEach((x) => {
  //       if (lDto.Period === x.mValue) {
  //         const nod = lDto.NumberofDays;
  //         if (nod !== undefined) if (parseInt(nod, 10) > x.description) lDto.NumberofDays = "";
  //       }
  //     });
  //   }
  //   setDto({ ...lDto });
  // };
  const OnShortPeriodSelect = (e, a) => {
    if (a !== null) {
      lDto.Period = a.mValue;
    } else {
      lDto.Period = "";
    }
    lDto.NumberofDays = "";
    // lDto.PolicyStartDate = "";
    lDto.PolicyEndDate = "";
    setDto({ ...lDto });
  };
  const onNumberOfDays = (val) => {
    const periodVal = lDto.Period;
    let periodNum = 0;
    let periodNum2 = 0;
    masters.Period.forEach((x) => {
      if (x.mValue === periodVal) {
        periodNum = x.description;
        periodNum2 = x.fieldName;
      }
    });
    if (Number(val) <= 0) return `invalid days`;
    if (Number(val) > periodNum || Number(val) < periodNum2)
      return `Days should be in range ${periodNum2} and ${periodNum}`;
    return IsNumericGreaterThanZero(val);
  };
  const OnNumberDays = (e) => {
    lDto.NumberofDays = e.target.value;
    // lDto.PolicyStartDate = DateFormatFromDateObject(new Date(), "m/d/y");
    const date1 = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    lDto.PolicyEndDate = date1;

    if (
      (lDto.PolicyStartDate === "" && lDto.NumberofDays !== "") ||
      (lDto.PolicyStartDate !== "" && lDto.NumberofDays === "") ||
      (lDto.PolicyStartDate === "" && lDto.NumberofDays === "")
    ) {
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };
  const Totalseat = (e, name) => {
    // console.log(33333);

    lDto.InsurableItem[0].RiskItems[0][name] = e.target.value;
    let Total1 = lDto.InsurableItem[0].RiskItems[0].SeatingCapacityincludingDriver;
    let Total2 = lDto.InsurableItem[0].RiskItems[0].NoofHelperorEmployee;

    if (Total1 === "") {
      Total1 = 0;
    }
    if (Total2 === "") {
      Total2 = 0;
    }
    const Total = parseInt(Total1, 10) + parseInt(Total2, 10);
    lDto.InsurableItem[0].RiskItems[0].Seats = Total.toString();
    lDto.InsurableItem[0].RiskItems[0].HelperorEmployeeSI = (Total2 * 500000).toString();
    const Passenger = lDto.InsurableItem[0].RiskItems[0].SeatingCapacityincludingDriver - 1;
    if (
      lDto.ClassCategorylabel === "Tempo/E-Rickshaw" ||
      lDto.ClassCategorylabel === "Passenger Carrying Vehicle"
    ) {
      lDto.InsurableItem[0].RiskItems[0].PassengerCount = Passenger;
      lDto.InsurableItem[0].RiskItems[0].PAPassengerSI = (Passenger * 500000).toString();
    }
    setDto({ ...lDto });
  };

  const OnTotalSumInsuredZreoUtilityCost = (e) => {
    if (e.target.value === "0" || e.target.value === 0) {
      lDto.InsurableItem[0].RiskItems[0].UtilityCost = "";
    }
    setDto({ ...lDto });
  };
  const OnTotalSumInsuredZreoTrailerSumInsured = (e) => {
    if (e.target.value === "0" || e.target.value === 0) {
      lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured = "";
    }
    setDto({ ...lDto });
  };

  const OnTotalSumInsured = (e, name) => {
    console.log(111111);

    if (lDto.ClassCategorylabel !== "Passenger Carrying Vehicle") {
      lDto.InsurableItem[0].RiskItems[0][name] = e.target.value;

      let VehicleCost1 = lDto.InsurableItem[0].RiskItems[0].VehicleCost;
      let VehicleCost2 = lDto.InsurableItem[0].RiskItems[0].UtilityCost;
      let VehicleCost3 = lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured;
      if (VehicleCost1 === "") {
        VehicleCost1 = 0;
      }
      if (VehicleCost2 === "") {
        VehicleCost2 = 0;
      }
      if (VehicleCost3 === "") {
        VehicleCost3 = 0;
      }
      const VehicleCost =
        parseInt(VehicleCost1, 10) + parseInt(VehicleCost2, 10) + parseInt(VehicleCost3, 10);
      lDto.TotalSumInsured = VehicleCost.toString();
      if (lDto.TotalSumInsured > 5000000) {
        swal({
          icon: "error",
          text: "Maximum Sum Insured limit is 50 Lakhs",
          confirmButtonColor: "#0079CE",
        });
        lDto.TotalSumInsured = "";
        lDto.InsurableItem[0].RiskItems[0].VehicleCost = "";
        lDto.InsurableItem[0].RiskItems[0].UtilityCost = "";
        lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured = "";
      }
      setDto({ ...lDto });
    } else {
      lDto.InsurableItem[0].RiskItems[0][name] = e.target.value;

      let VehicleCost1 = lDto.InsurableItem[0].RiskItems[0].VehicleCost;
      let VehicleCost2 = lDto.InsurableItem[0].RiskItems[0].UtilityCost;
      if (VehicleCost1 === "") {
        VehicleCost1 = 0;
      }
      if (VehicleCost2 === "") {
        VehicleCost2 = 0;
      }

      const VehicleCost = parseInt(VehicleCost1, 10) + parseInt(VehicleCost2, 10);
      lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = VehicleCost.toString();
      if (lDto.InsurableItem[0].RiskItems[0].TotalSumInsured > 5000000) {
        swal({
          icon: "error",
          text: "Maximum Sum Insured limit is 50 Lakhs",
          confirmButtonColor: "#0079CE",
        });
        lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = "";
        lDto.InsurableItem[0].RiskItems[0].VehicleCost = "";
        lDto.InsurableItem[0].RiskItems[0].UtilityCost = "";
      }

      setDto({ ...lDto });
    }
  };
  const OnFinancingDetails = (e) => {
    if (e != null) {
      lDto.FinancingType = e.target.value;
    } else {
      lDto.FinancingType = "";
    }
    lDto.PolicyRiskType = "";
    lDto.PolicyRiskCategory = "";
    lDto.Bankdetails = { ...Bankdetails() };
    lDto.ProposerDetails = { ...ProposerDetails() };
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    setDto({ ...lDto });
  };
  // Dropdown Fiter for State to District to Municipality
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
        lDto.RiskAddressDetails.ProvinceState = a.mValue;
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        masters1.District3 = res.data;
      } else {
        lDto.RiskAddressDetails.ProvinceState = "";
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        lDto.RiskAddressDetails.WardNumber = "";
      }
    }
    if (n === "District3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.RiskAddressDetails.District = a.mValue;
        lDto.RiskAddressDetails.Municipality = "";
        masters1.Municipality3 = res.data;
      } else {
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        lDto.RiskAddressDetails.WardNumber = "";
      }
    }
    // if (n === "Municipality3") {
    //   lDto.RiskAddressDetails.Municipality = a.mValue;
    // }

    if (n === "State4") {
      if (a !== null) {
        // masters1.Municipalitynew = [];
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].ProvinceState = a.mValue;
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.placeMasters[index].district = res.data;
      } else {
        lDto.Bankdetails.BranchDetails[index].ProvinceState = "";
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }
    if (n === "District4") {
      if (a !== null) {
        // masters1.Municipalitynew = [];
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].District = a.mValue;
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.placeMasters[index].municipality = res.data;
      } else {
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }
    // if (n === "Municipality4") {
    //   lDto.Bankdetails.BranchDetails[index].Municipality = a.mValue;
    // }

    setDto({ ...lDto });
    setMasters({ ...masters1 });
  };
  const onDOBselect = (e, d) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      lDto.ProposerDetails.DoB = [""];
      swal2.fire({
        icon: "error",
        text: `Age of the Policy Holder must be above 16 Years.`,
        confirmButtonColor: "#0079CE",
      });
    } else {
      lDto.ProposerDetails.DoB = d;
    }
    setDto({ ...lDto });
  };

  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = lDto.ProposerDetails.EmailId;
      let Class = "";
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = lDto.Class === "MotorCycle" ? 163 : 164;
      }
      if (localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC") {
        Class = lDto.Class === "MotorCycle" ? 165 : 166;
      }
      const obj = {
        ProposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: lDto.proposalNo,
        keyType: "BGRProposal",
        communicationId: Class,
        // communicationId: 163,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      if (EmailAddress !== "") {
        const res = await SendNotification(EmailAddress, obj);
        // console.log("email", EmailAddress);
        // console.log("obj", obj);
        if (res.data.status === 1) {
          swal2.fire({
            icon: "success",
            text: "E-Mail Sent succesfully",
            confirmButtonColor: "#0079CE",
          });
        } else {
          swal2.fire({
            icon: "error",
            text: "E-Mail not sent as Incorrect E-Mail ID is captured in Customer Details Screen",
            confirmButtonColor: "#0079CE",
          });
        }
      } else {
        swal2.fire({
          icon: "error",
          text: "E-Mail not sent as E-Mail ID is not captured in Customer Details Screen",
          confirmButtonColor: "#0079CE",
        });
      }
    }
  };
  const Navigate = useNavigate();
  const onModalclose = () => {
    Navigate("/retail/home");
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [savemodalopen, setsavemodalopen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const SavehandleModalOpen = () => {
    setsavemodalopen(true);
  };
  const handlesavedebitnote = () => {
    SavehandleModalOpen();
  };
  const SavehandleModalClose = () => {
    setsavemodalopen(false);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleSavepolicyWFStatus = async () => {
    const proposalNo = objectPath.get(dto, "proposalNo");

    // const proposalNo = objectPath.get(lDto, "proposalNo");
    // console.log("ccc", ProposalNo);
    // if (genericInfo.ProposalNo !== "" || genericInfo.ProposalNo !== undefined) {
    if (genericInfo.Flow && genericInfo.Flow === "DisApproveFlow") {
      const obj = {
        Stage: "Proposal",
        Status: "307",
        WorkFlowType: "Agent",
        wfstageStatusId: "315",
      };
      await SavepolicyWFStatus(genericInfo.ProposalNo, dto.ProductCode, obj);
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
      await SavepolicyWFStatus(genericInfo.ProposalNo, dto.ProductCode, a);
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

  const onSaveModalClose = async () => {
    if (genericInfo && genericInfo.ProposalNo !== undefined) {
      // if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
      await UpdateProposalDetails(lDto).then(async () => {
        // objectPath.set(lDto, "proposalNo", x.data.proposalNo);
        // setDto({ ...lDto });
        if (
          genericInfo.Flow &&
          (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
        ) {
          swal2
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
      const proposalNo = objectPath.get(lDto.proposalNo);
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
      swal2
        .fire({
          html: `<div> <img src=${Success} alt="success"><br>Debit Note Saved Successfully</br>${lDto.proposalNo}</div>`,
          confirmButtonColor: "#0079CE",
        })
        // .fire({
        // html: `<div> <img src=${Success} alt="success"></div>`,
        // title: "Debit Note Saved Successfully",
        // showConfirmButton: true,
        // confirmButtonText: "OK",
        // allowOutsideClick: false,
        // confirmButtonColor: "#0079CE",
        // })
        .then((result) => {
          if (result.isConfirmed) {
            Navigate("/retail/home");
          }
        });
      setDto({ ...lDto });
    }
  };
  const OnDirectFromShowRoom = async (e) => {
    lDto.InsurableItem[0].RiskItems[0].DirectFromShowRoom = e.target.checked ? "Yes" : "No";
    if (lDto.InsurableItem[0].RiskItems[0].DirectFromShowRoom === "Yes") {
      lDto.InsurableItem[0].RiskItems[0].VehicleNoEnglish = "";
      lDto.InsurableItem[0].RiskItems[0].VehicleNoNepali = "";
    }
    setDto({ ...lDto });
  };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  const onDebitNoteClick = async (e, key) => {
    let Class = "";

    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Class = 245;
    }
    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      Class = 245;
    }

    const proposalNo = objectPath.get(lDto, "proposalNo");
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

  const onDocUplode1 = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        lDto.RollOverDocuments[0].FileName = file.name;
        lDto.RollOverDocuments[0].UploadDocDate = new Date().toLocaleDateString();
        lDto.RollOverDocuments[0].DocId = result.data[0].docid;
        setDto({ ...lDto });
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };
  const OnRollOverProfilePicture = async (event) => {
    await onDocUplode1(event.target.files[0]);
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
  };
  const onCancelRollOverProfilePicture = async () => {
    const file = lDto.RollOverDocuments[0].FileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.RollOverDocuments[0].FileName = "";
        lDto.RollOverDocuments[0].DocId = "";
        lDto.RollOverDocuments[0].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };

  // Insured Details If Insured Type is chosen as dropdown Upload ProfilePicture
  const OnProfilePicture = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    const fileExtension = file.name.split(".").pop();
    if (fileExtension === "jpeg" || fileExtension === "png") {
      await DocumenUpload(formData);
      lDto.ProposerDetails.ProfilePicture = file.name;
      setDto({ ...lDto });
      swal({
        icon: "success",
        text: "Profile picture uploaded successfully",
      });
    } else {
      swal({
        icon: "error",
        text: "Accepts only JPEG or PNG formats",
        confirmButtonColor: "#0079CE",
      });
    }
    const inputElement = document.getElementById("fileInput");
    const file1 = e;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
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
  // Insured Details AddDocument For Upload Profile Picture & DeleteDocument Functionality
  const onAddDocument = () => {
    lDto.documentDetails = [...dto.documentDetails, { ...docDetails() }];
    setDto({ ...lDto });
  };

  const handleDublicateDoc = (e, index) => {
    console.log(11111111);
    lDto.documentDetails.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        swal({
          icon: "error",
          text: `"${(lDto.documentDetails[index].DocName = e.target.value)}" Already Exist`,
        });
        lDto.documentDetails[index].DocName = "";
      }
    });
    setDto({ ...lDto });
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
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };
  const handleFileUpload = async (event, index) => {
    await onDocUplode(event.target.files[0], index);
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
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
  const spreadDocumentDetails = () => {
    const arr = [];
    dto.documentDetails.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: true,
          label: "Document Name",
          path: `documentDetails.${i}.DocName`,
          onChangeFuncs: [IsFreetextNoSpace],
          customOnBlur: (e) => handleDublicateDoc(e, i),
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
          spacing: 3.9,
          visible: x.FileName !== "",
          sx: { fontSize: "15px", paddingTop: 1 },
        },
        {
          type: "IconButton",
          icon: "close",
          spacing: 2,
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
  // ClassCategorylabel Changes
  const OnclassCategory = (e, v) => {
    if (v === null) {
      lDto.ClassCategory = "";
      lDto.ClassCategorylabel = "";
    } else {
      lDto.ClassCategory = v.fieldName;
      lDto.ClassCategorylabel = v.mValue;
    }
    lDto.InsurableItem[0].RiskItems[0].SeatingCapacityincludingDriver = "";
    lDto.InsurableItem[0].RiskItems[0].NoofHelperorEmployee = "";
    lDto.InsurableItem[0].RiskItems[0].VehicleCost = "";
    // lDto.InsurableItem[0].RiskItems[0].UtilityCost = "";
    // lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured = "";
    lDto.InsurableItem[0].RiskItems[0].Seats = "";
    lDto.TotalSumInsured = "0";
    lDto.InsurableItem[0].RiskItems[0].AgeofVehicle = "";
    lDto.InsurableItem[0].RiskItems[0].CCKW = "";
    lDto.InsurableItem[0].RiskItems[0].HP = "";
    lDto.InsurableItem[0].RiskItems[0].TON = "";
    lDto.InsurableItem[0].RiskItems[0].YearofVehicleManufacture = "";
    lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "";
    lDto.InsurableItem[0].RiskItems[0].Nameofthevehicle = "";
    lDto.InsurableItem[0].RiskItems[0].Makeofthevehicle = "";
    lDto.InsurableItem[0].RiskItems[0].Modelofthevehicle = "";
    lDto.prodlabel = v.mValue;

    lDto.ProductLogo = genericInfo.ProductLogo;
    lDto.CompanyName = process.env.REACT_APP_CompanyName;
    lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
    lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
    lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;

    if (lDto.ClassCategorylabel === "Passenger Carrying Vehicle") {
      delete lDto.InsurableItem[0].RiskItems[0].HP;
      delete lDto.InsurableItem[0].RiskItems[0].TON;
      delete lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured;
      delete lDto.TotalSumInsured;
      lDto.ProductCode = "NepalPCV";
    }

    setGenericInfo(dispatch, { ...genericInfo, prodLabel: v === null ? "" : v.mValue });
    setDto({ ...lDto });
  };
  const OnTypeofCover = (e, a) => {
    if (a === null) {
      lDto.InsurableItem[0].RiskItems[0].TypeofCover = "";
      lDto.InsurableItem[0].RiskItems[0].TypeofCoverlabel = "";
    } else {
      lDto.InsurableItem[0].RiskItems[0].TypeofCover = a.fieldName;
      lDto.InsurableItem[0].RiskItems[0].TypeofCoverlabel = a.mValue;
    }
    setDto({ ...lDto });
  };
  const OnInsuredNameEnglish = (e, name) => {
    lDto.ProposerDetails.PermanentAdrress[name] = e.target.value;
    lDto.ProposerDetails[name] = e.target.value;
    const Name = lDto.ProposerDetails.InsuredNameEnglish;
    const Address = lDto.ProposerDetails.PermanentAdrress.AddressEnglish;
    if (Name !== undefined) {
      lDto.ProposerDetails.NameoftheOrganisation = Name;
    }
    if (Address !== undefined) {
      lDto.ProposerDetails.OrganizationAddress = Address;
    }
    setDto({ ...lDto });
  };
  const OnFiscalYear = () => {
    const rf = lDto.Channel.FiscalYear;
    if (rf === undefined || rf === "") {
      const curM = new Date().getMonth() + 1;
      const curD = new Date().getDate();
      let curY2 = new Date().getFullYear();
      let curY1 = new Date().getFullYear();
      if (curM < 7) {
        curY1 -= 1;
      } else if (curM > 7) {
        curY2 += 1;
      } else if (curD < 17) curY1 -= 1;
      else curY2 += 1;
      lDto.Channel.FiscalYear = curY1
        .toString()
        .slice(2, 4)
        .concat("/", curY2.toString().slice(2, 4));
    }
  };
  const OnVehicleCategory = (e, a) => {
    if (a !== null) {
      lDto.InsurableItem[0].RiskItems[0].VehicleCategory = a.mValue;
    } else {
      lDto.InsurableItem[0].RiskItems[0].VehicleCategory = "";
    }
    lDto.InsurableItem[0].RiskItems[0].CCKW = "";
    lDto.InsurableItem[0].RiskItems[0].TON = "";
    lDto.InsurableItem[0].RiskItems[0].HP = "";

    setDto({ ...lDto });
  };
  const OnDirectDiscountAgent = (e, a) => {
    if (a !== null) {
      lDto.InsurableItem[0].RiskItems[0].DirectDiscount = a.mValue;
    } else {
      lDto.InsurableItem[0].RiskItems[0].DirectDiscount = "";
    }
    lDto.Channel.AgentCode = "";
    lDto.Channel.AgentName = "";

    setDto({ ...lDto });
  };
  const OnBankNonBank = (e, a) => {
    if (a !== null) {
      lDto.Bankdetails.BankorNonBank = a.mValue;
    } else {
      lDto.Bankdetails.BankorNonBank = "";
    }
    lDto.Bankdetails = {
      ...lDto.Bankdetails,
      BankCategory: "",
      BankorFinancialInstituionNameinEnglish: "",
      BankorFinancialInstituionNameinNepali: "",
      ProvinceorState: "",
      District: "",
      Municipality: "",
      WardNumber: "",
      AddressEnglish: "",
      AddressNepali: "",
    };

    setDto({ ...lDto });
  };

  const handleBankCategory = async (e, a, key) => {
    // console.log("aaaaa", a);
    if (key === "BankCategory") {
      if (a !== null) {
        lDto.Bankdetails.BankCategory = a.mValue;
        const res = await GetProdPartnermasterData("BankDetails", {
          BankFinancialInstitution: a.fieldName,
        });
        masters1.BankorFinancialInstituionNameinEnglish = res.data;
        masters1.BranchMasters = [];
        lDto.Bankdetails.BankCategorylabel = a.fieldName;
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.AddressNepali = "";
        lDto.Bankdetails.BranchDetails.forEach((x, i) => {
          lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
          lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
          lDto.Bankdetails.BranchDetails[i].WardNumber = "";
          lDto.Bankdetails.BranchDetails[i].Municipality = "";
          lDto.Bankdetails.BranchDetails[i].District = "";
          lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
          lDto.Bankdetails.BranchDetails[i].BranchName = "";
        });
        setDto({ ...lDto });
      } else {
        // masters.BankorFinancialInstituionNameinEnglish = [];
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.BankCategory = "";
        lDto.Bankdetails.BankCategorylabel = "";
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
          lDto.Bankdetails.BankorFinancialInstituionNameinNepali = res[0].text;
        }
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
        console.log("masters.BranchMasters", masters1.BranchMasters, masters1.BranchMasters.length);
        setDto({ ...lDto });
      } else {
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.AddressNepali = "";
        setDto({ ...lDto });
        masters1.BranchMasters = [];
      }
      setMasters({ ...masters1 });
    }
  };

  // AddBranchDetails for Bank/Financial Institution
  const handleBranchName = async (e, a, i) => {
    if (a !== null) {
      lDto.Bankdetails.BranchDetails[i].BranchName = a.mValue;
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
        lDto.Bankdetails.BranchDetails[i].AddressNepali = res[0].text;
      }
    } else {
      lDto.Bankdetails.BranchDetails[i].BranchName = "";
      lDto.Bankdetails.BranchDetails[i].Country = "";
      lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
      lDto.Bankdetails.BranchDetails[i].District = "";
      lDto.Bankdetails.BranchDetails[i].Municipality = "";
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
      lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
      lDto.Bankdetails.BranchDetails[i].WardNumber = "";
    }
    setDto({ ...lDto });
  };

  const onAddBranchDetails = () => {
    lDto.Bankdetails.BranchDetails.push({ ...BranchDetails });
    masters1.placeMasters.push({ district: [], municipality: [] });
    setDto({ ...lDto });
  };
  const RemoveBranchDetails = (i) => {
    const arr = dto.Bankdetails.BranchDetails.filter((x, i1) => i1 !== i);
    lDto.Bankdetails.BranchDetails = arr;
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
          // startIcon: <DeleteIcon />,
          justifyContent: "end",
          visible: i !== 0,
          onClick: () => RemoveBranchDetails(i),
        },
        {
          type: "AutoComplete",
          label: "Branch Name",
          visible: masters.BranchMasters.length > 0,
          options: masters.BranchMasters,
          // visible: true,
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
          // onChangeFuncs: [IsAlphaNoSpace],
          required: true,
          customOnChange: (e, a) => handleBranchName(e, a, i),
        },
        {
          type: "Input",
          label: "Country",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          // options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "Input",
          label: "Province/State",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
          required: true,
          disabled: true,
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "State4", i),
        },
        {
          type: "Input",
          label: "District",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.District`,
          // options:
          //   lDto.Bankdetails.BranchDetails[i].ProvinceState !== ""
          //     ? masters.placeMasters[i].district
          //     : [],
          required: true,
          disabled: true,

          // customOnChange: (e, a) => OnPlaceSelect(e, a, "District4", i),
        },
        {
          type: "Input",
          label: "Municipality",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          disabled: true,
          // options:
          //   lDto.Bankdetails.BranchDetails[i].District !== ""
          //     ? masters.placeMasters[i].municipality
          //     : [],
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality4", i),
        },
        {
          type: "Input",
          label: "Ward Number",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          // options: masters.WardNumber,
          disabled: true,
        },
        {
          type: "Input",
          label: "Address(English)",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          required: true,
          // onChangeFuncs: [IsFreetextNoSpace],
          name: "BranchNameinEnglish",
          disabled: true,
          //   customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          // onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Branch Name",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
        },
        {
          type: "AutoComplete",
          label: "Country",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State4", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.District`,
          options:
            lDto.Bankdetails.BranchDetails[i].ProvinceState !== ""
              ? masters.placeMasters[i].district
              : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District4", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          options:
            lDto.Bankdetails.BranchDetails[i].District !== ""
              ? masters.placeMasters[i].municipality
              : [],
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality4", i),
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          options: masters.WardNumber,
        },
        {
          type: "Input",
          label: "Address(English)",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          required: true,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "BranchNameinEnglish",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Address(Nepali)",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.AddressNepali`,
          // required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "Area",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.Area`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/Street Name",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "House Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.HouseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Plot Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.PlotNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Contact Person 1",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ContactPerson1`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact Person 2",
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
          path: `Bankdetails.BranchDetails.${i}.ContactPerson2`,
        },
        {
          type: "Input",
          label: "Contact Person 3",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ContactPerson3`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Phone Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.PhoneNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Mobile Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.MobileNumber`,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
        },
        {
          type: "Input",
          label: "Fax Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.FaxNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Branch Manager",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.BranchManager`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Email ID",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.Email`,
          onBlurFuncs: [IsEmail],
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
  const onVehicalSelect = async (e, a, n) => {
    if (n === "Nameofthevehicle") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Make", { FieldName: a.mID });
        lDto.InsurableItem[0].RiskItems[0].Nameofthevehicle = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].Makeofthevehicle = "";
        lDto.InsurableItem[0].RiskItems[0].Modelofthevehicle = "";
        masters1.Make1 = res.data;
      } else {
        lDto.InsurableItem[0].RiskItems[0].Nameofthevehicle = "";
        lDto.InsurableItem[0].RiskItems[0].Makeofthevehicle = "";
        lDto.InsurableItem[0].RiskItems[0].Modelofthevehicle = "";
      }
    }
    if (n === "Makeofthevehicle") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Model", { FieldName: a.mID });
        lDto.InsurableItem[0].RiskItems[0].Makeofthevehicle = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].Modelofthevehicle = "";
        masters1.Model1 = res.data;
      } else {
        lDto.InsurableItem[0].RiskItems[0].Makeofthevehicle = "";
        lDto.InsurableItem[0].RiskItems[0].Modelofthevehicle = "";
      }
    }
    setDto({ ...lDto });
    setMasters({ ...masters1 });
  };

  const handleIssuingBranch = (e, a, key) => {
    if (key === "InsuredType") {
      if (a !== null) {
        lDto.ProposerDetails.InsuredType = a.mValue;
        setDto({ ...lDto });
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

        lDto.Prefix = a.ProvinceCode.concat("/", lDto.InsuredTypeCode)
          .concat("/", a.ShortCode, "/")
          .concat(",", a.ProvinceCode)
          .concat("/", a.ShortCode, "/");

        lDto.ProvinceCode = a.ProvinceCode;
        lDto.ShortCode = a.ShortCode;
        const BusinessTypeCode = lDto.DocType.split("")[0];
        let ClassCode = "";
        if (lDto.Class === "Commercial Comprehensive") {
          ClassCode = "CV";
        } else if (lDto.Class === "Third Party Commercial") {
          ClassCode = "TPCV";
        }

        lDto.PolicyPrefix = a.ProvinceCode.concat("/", a.ShortCode, "/", "MV").concat(
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
    lDto.ProposerDetails.ProfilePicture = "";
    setDto({ ...lDto });
  };
  const handleFieldOfficerCode = async (e, a, key) => {
    if (key === "FieldOfficerCode") {
      if (a !== null) {
        lDto.Channel.FieldOfficerCode = a.fieldName;
        lDto.Channel.FieldOfficer = a.mValue;
      } else {
        lDto.Channel.FieldOfficerCode = "";
        lDto.Channel.FieldOfficer = "";
      }
    }
    if (key === "FieldOfficer") {
      if (a !== null) {
        lDto.Channel.FieldOfficerCode = a.fieldName;
        lDto.Channel.FieldOfficer = a.mValue;
      } else {
        lDto.Channel.FieldOfficerCode = "";
        lDto.Channel.FieldOfficer = "";
      }
    }
    if (key === "SubFieldOfficerCode") {
      if (a !== null) {
        lDto.Channel.SubFieldOfficerCode = a.fieldName;
        lDto.Channel.SubFieldOfficer = a.mValue;
      } else {
        lDto.Channel.SubFieldOfficerCode = "";
        lDto.Channel.SubFieldOfficer = "";
      }
    }
    if (key === "SubFieldOfficer") {
      if (a !== null) {
        lDto.Channel.SubFieldOfficerCode = a.fieldName;
        lDto.Channel.SubFieldOfficer = a.mValue;
      } else {
        lDto.Channel.SubFieldOfficerCode = "";
        lDto.Channel.SubFieldOfficer = "";
      }
    }
    if (key === "AgentCode") {
      if (a !== null) {
        lDto.Channel.AgentCode = a.fieldName;
        lDto.Channel.AgentName = a.mValue;
      } else {
        lDto.Channel.AgentCode = "";
        lDto.Channel.AgentName = "";
      }
    }
    if (key === "AgentName") {
      if (a !== null) {
        lDto.Channel.AgentCode = a.fieldName;
        lDto.Channel.AgentName = a.mValue;
      } else {
        lDto.Channel.AgentCode = "";
        lDto.Channel.AgentName = "";
      }
    }
    if (key === "SubAgent") {
      if (a !== null) {
        lDto.Channel.SubAgentCode = a.fieldName;
        lDto.Channel.SubAgentName = a.mValue;
      } else {
        lDto.Channel.SubAgentCode = "";
        lDto.Channel.SubAgentName = "";
      }
    }
    if (key === "SubAgentName") {
      if (a !== null) {
        lDto.Channel.SubAgentCode = a.fieldName;
        lDto.Channel.SubAgentName = a.mValue;
      } else {
        lDto.Channel.SubAgentCode = "";
        lDto.Channel.SubAgentName = "";
      }
    }
    setDto({ ...lDto });
  };

  let data = [];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Doc Type",
            visible: true,
            path: "DocType",
            options: masters.DocType,
            required: true,
            customOnChange: (e, a) => handleRenewalDocs(e, a),
          },
          {
            type: "Input",
            label: "Department",
            visible: true,
            path: "Department",
            required: true,
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Class",
            visible: true,
            path: "Class",
            options: masters.Class,
            customOnChange: (e, a) => OnClassSelect(e, a),
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Class Category",
            visible: true,
            // path: "ClassCategory",
            path: "ClassCategorylabel",
            options: masters.ClassCategory,
            customOnChange: (e, v) => OnclassCategory(e, v),
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Sub Class",
            visible: lDto.ClassCategorylabel === "Tractor & Power Trailer",
            path: "SubClass",
            options: masters.SubClass,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Premium Type",
            visible: true,
            path: "PremiumType",
            options:
              lDto.Class === "Third Party Commercial"
                ? masters.PremiumType.filter((x) => x.mID !== 6)
                : masters.PremiumType,

            required: true,
            customOnChange: (e, a) => OnPTSelect(e, a),
          },
          {
            type: "AutoComplete",
            label: "Period",
            path: "Period",
            visible: lDto.PremiumType === "Short Period",
            options: masters.Period,
            required: true,
            customOnChange: (e, a) => OnShortPeriodSelect(e, a),
          },
          {
            type: "Input",
            label: "Number of Days",
            visible: lDto.PremiumType === "" || lDto.PremiumType === "Normal",
            path: "NumberofDays",
            disabled:
              lDto.PremiumType === "" || lDto.PremiumType === "Normal" || lDto.Period === "",
            required: true,
          },
          {
            type: "Input",
            label: "Number of Days",
            visible: lDto.PremiumType === "Short Period",
            path: "NumberofDays",
            onChangeFuncs: [IsNumericGreaterThanZero],
            onBlurFuncs: [onNumberOfDays],
            customOnChange: (e) => OnNumberDays(e),
            disabled:
              lDto.PremiumType === "" || lDto.PremiumType === "Normal" || lDto.Period === "",
            required: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: true,
            path: "PolicyStartDate",
            minDate: PolicyStartDateFiscalYear(),
            maxDate: PolicyStartDateMaxDate(),
            dateFormat: "m/d/Y",
            disabled: dto.PremiumType === "",
            required: true,
            customOnChange: (e, d) => OnPSDSelect(e, d),
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            // minDate: DateFormatFromDateObject("m/d/Y"),
            path: "PolicyEndDate",
            dateFormat: "m/d/Y",
            disabled: true,
            InputProps: { disabled: true },
          },
          {
            type: "AutoComplete",
            label: "Business Type",
            visible: true,
            path: "BusinessType",
            options: masters.BusinessType,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Government",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.GovernmentVehicle",
            options: masters.Government,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Vehicle Category",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.VehicleCategory",
            options: masters.Category,
            required: true,
            customOnChange: (e, a) => OnVehicleCategory(e, a),
          },
          {
            type: "AutoComplete",
            label: "Type of Covers",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.TypeofCoverlabel",
            options: masters.TypeofCover.filter((x) => x.description === lDto.Class),
            required: true,
            customOnChange: (e, a) => OnTypeofCover(e, a),
          },
          {
            type: "AutoComplete",
            label: "Year of Vehicle Manufacture",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.YearofVehicleManufacture",
            options: masters.YearofManufacture,
            customOnChange: (e, a) => OnYOMselect(e, a),
            required: true,
          },
          {
            type: "Input",
            label: "Age of Vehicle",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.AgeofVehicle",
            disabled: true,
            required: true,
          },
          {
            type: "Input",
            label:
              lDto.InsurableItem[0].RiskItems[0].VehicleCategory === "Electric" ? "K/W" : "TON",
            path: "InsurableItem.0.RiskItems.0.TON",
            required: true,
            visible: lDto.ClassCategorylabel === "Agriculture & Forestry Vehicle",
            onChangeFuncs: [IsNumericGreaterThanZero],
          },
          {
            type: "Input",
            label: lDto.InsurableItem[0].RiskItems[0].VehicleCategory === "Electric" ? "K/W" : "CC",
            path: "InsurableItem.0.RiskItems.0.CCKW",
            required: true,
            visible:
              lDto.ClassCategorylabel === "Tempo/E-Rickshaw" ||
              (lDto.ClassCategorylabel === "Passenger Carrying Vehicle" &&
                lDto.InsurableItem[0].RiskItems[0].VehicleCategory !== ""),
            onChangeFuncs: [IsNumericGreaterThanZero],
          },
          {
            type: "Input",
            label:
              lDto.InsurableItem[0].RiskItems[0].VehicleCategory === "Electric" ? "K/W" : "H.P",
            path: "InsurableItem.0.RiskItems.0.HP",
            required: true,
            visible: lDto.ClassCategorylabel === "Tractor & Power Trailer",
            onChangeFuncs: [IsNumericGreaterThanZero],
          },
          {
            type: "Input",
            label: "Seating Capacity including Driver",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.SeatingCapacityincludingDriver",
            required: true,
            onChangeFuncs: [IsNumericGreaterThanZero],
            customOnChange: (e) => Totalseat(e, "SeatingCapacityincludingDriver"),
          },
          {
            type: "Input",
            label: "No of Helper/Employee",
            visible: lDto.ClassCategorylabel !== "Tempo/E-Rickshaw",
            path: "InsurableItem.0.RiskItems.0.NoofHelperorEmployee",
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => Totalseat(e, "NoofHelperorEmployee"),
            required: true,
          },
          {
            type: "Input",
            label: "Total Seating Capacity",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Seats",
            required: true,
            onChangeFuncs: [IsNumericGreaterThanZero],
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Cost",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.VehicleCost",
            required: true,
            onChangeFuncs: [IsNumericGreaterThanZero],
            customOnChange: (e) => OnTotalSumInsured(e, "VehicleCost"),
          },
          {
            type: "Input",
            label: "Utility Cost",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.UtilityCost",
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => OnTotalSumInsured(e, "UtilityCost"),
            customOnFocus: (e) => OnTotalSumInsuredZreoUtilityCost(e),
            required: true,
          },
          {
            type: "Input",
            label: "Trailer Sum Insured",
            visible:
              lDto.Class !== "Third Party Commercial" &&
              lDto.ClassCategorylabel !== "Tempo/E-Rickshaw" &&
              lDto.ClassCategorylabel !== "Passenger Carrying Vehicle",
            path: "InsurableItem.0.RiskItems.0.TrailerSumInsured",
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => OnTotalSumInsured(e, "TrailerSumInsured"),
            customOnFocus: (e) => OnTotalSumInsuredZreoTrailerSumInsured(e),
            required: true,
          },
          {
            type: "Input",
            label: "Total Sum Insured",
            visible:
              lDto.Class !== "Third Party Commercial" &&
              lDto.ClassCategorylabel !== "Passenger Carrying Vehicle",
            path: "TotalSumInsured",
            disabled: true,
            required: true,
          },
          {
            type: "Input",
            label: "Total Sum Insured",
            visible: lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            path: "InsurableItem.0.RiskItems.0.TotalSumInsured",
            disabled: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Voluntary Excess",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.VolunatryExcess",
            options: masters.CommercialExcess,
            required: true,
          },
          {
            type: "Input",
            label: "Compulsory Excess",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.CompulsoryExcess",
            disabled: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Own Goods Carrying/Private use",
            visible:
              lDto.Class !== "Third Party Commercial" &&
              lDto.ClassCategorylabel !== "Tempo/E-Rickshaw" &&
              lDto.InsurableItem[0].RiskItems[0].GovernmentVehicle === "No",
            path: "InsurableItem.0.RiskItems.0.OwnGoodsCarryingorPrivateUse",
            options: masters.DirectDiscount,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Towing Charge",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.TowingCharges",
            required: true,
            options: masters.DirectDiscount,
          },
          {
            type: "AutoComplete",
            label: "No Claim Discount Year",
            visible:
              lDto.DocType !== "Fresh" &&
              lDto.Class !== "Third Party Commercial" &&
              lDto.DocType !== "",
            path: "InsurableItem.0.RiskItems.0.NCDYear",
            options: masters.NCDYear,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Direct Discount(%)",
            visible:
              lDto.InsurableItem[0].RiskItems[0].GovernmentVehicle === "No" &&
              lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.DirectDiscount",
            options: masters.DirectDiscount,
            required: true,
            customOnChange: (e, a) => OnDirectDiscountAgent(e, a),
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
            // dateFormat: "m/d/Y",
            required: true,
          },
          {
            type: "MDDatePicker",
            visible: true,
            label: "Policy End Date",
            path: "PolicyEndDate",
            // dateFormat: "m/d/Y",
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
            customOnChange: (e) => OnFinancingDetails(e),
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
            customOnChange: (e, a) => OnBankNonBank(e, a),
          },
          {
            type: "AutoComplete",
            label: "Bank Category",
            visible: true,
            path: "Bankdetails.BankCategory",
            options: masters.BankCategory.filter(
              (x) =>
                (lDto.Bankdetails.BankorNonBank === "Bank" && x.description !== "Non-Bank") ||
                (lDto.Bankdetails.BankorNonBank === "Non-Bank" && x.description === "Non-Bank")
            ),
            required: true,
            customOnChange: (e, a) => handleBankCategory(e, a, "BankCategory"),
          },
          {
            type: "AutoComplete",
            label: "Bank/Financial Institution Name in English",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinEnglish",
            onChangeFuncs: [IsAlphaNumNoSpace],
            options:
              lDto.Bankdetails.BankCategory !== ""
                ? masters.BankorFinancialInstituionNameinEnglish
                : [],
            required: true,
            // name: "BankNameinEnglish",
            // customOnBlur: onBlurTransliteration,
            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
          },
          {
            type: "Input",
            label: "Bank/Financial Institution Name in Nepali",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinNepali",
            // onChangeFuncs: [IsFreetextNoSpace],
            // required: true,
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
            label: "Contact Person 1",
            visible: true,
            path: "Bankdetails.ContactPerson1",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person 2",
            visible: true,
            path: "Bankdetails.ContactPerson2",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person 3",
            visible: true,
            path: "Bankdetails.ContactPerson3",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            path: "Bankdetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "Bankdetails.MobileNumber",
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
            label: "CEO Name",
            visible: true,
            path: "Bankdetails.CEO",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "AutoComplete",
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
            disabled: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "State1"),
          },
          {
            type: "Input",
            label: "District",
            visible: true,
            path: "Bankdetails.District",
            // options: lDto.Bankdetails.ProvinceorState !== "" ? masters.District1 : [],
            required: true,
            disabled: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "District1"),
          },
          {
            type: "Input",
            label: "Municipality",
            visible: true,
            path: "Bankdetails.Municipality",
            disabled: true,
            // options: lDto.Bankdetails.District !== "" ? masters.Municipality1 : [],
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality1"),
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
            name: "BankAddressEnglish",
            disabled: true,
            customOnBlur: onBlurTransliteration,
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
            label: "Tole/Street Name",
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
            // visible: flag.ExistingDetails1,
            visible: true,
            // startIcon: <AddIcon />,
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
            path: "ProposerDetails.Name",
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
            name: "InsuredNameEnglish",
            customOnChange: (e) => OnInsuredNameEnglish(e, "InsuredNameEnglish"),
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Insured Name Nepali",
            visible: true,
            path: "ProposerDetails.InsuredNameNepali",
            // required: true,
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
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Email Address",
            visible: true,
            path: "ProposerDetails.EmailId",
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "ProposerDetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
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
            required:
              lDto.ProposerDetails.InsuredType !== "Individual" &&
              lDto.ProposerDetails.InsuredType !== "Government body",
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
            // disabled: dto.ProposerDetails.RegistrationDate === "",
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
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "ProposerDetails.MobileNo",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
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
            path: "ProposerDetails.PermanentAdrress.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            name: "PermanentAdrressEnglish",
            customOnChange: (e) => OnInsuredNameEnglish(e, "AddressEnglish"),
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Address(Nepali) ",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.AddressNepali",
            onChangeFuncs: [IsFreetextNoSpace],
            // required: true,
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
            label: "Tole/Street Name",
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
            name: "TemporaryAddressEnglish1",
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
            spacing: 3.9,
            visible: true,
            sx: { fontSize: "15px", paddingTop: 1 },
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
            customOnChange: (e, a) => handleGender(e, a),
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
            customOnChange: (e, a) => handleMarital(e, a),
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
            path: "ProposerDetails.GrandfatherNameEnglish",
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            name: "GrandfatherNameEnglish1",
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
            name: "PermanentAddressEnglish1",
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
            name: "TownEnglish1",
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
            required: true,
            dateFormat: "m-d-Y",
            maxDate: new Date(),
            customOnChange: (e, d) => onDOBselect(e, d),
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
            spacing: 3.2,
          },
          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            path: "ProposerDetails.PassportNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            spacing: 2.8,
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
            minDate: new Date(lDto.ProposerDetails.PassportIssuedDate).setDate(
              new Date(lDto.ProposerDetails.PassportIssuedDate).getDate() + 1
            ),
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
            onBlurFuncs: [IsMobileNumber],
            onChangeFuncs: [IsNumeric],
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
          {
            type: "Input",
            label: "Role",
            visible: true,
            path: "ProposerDetails.Role",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Member Name (English)",
            visible: true,
            path: "ProposerDetails.MemberNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "MemberNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Member Name (Nepali)",
            visible: true,
            path: "ProposerDetails.MemberNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Designation (English)",
            visible: true,
            path: "ProposerDetails.DesignationEnglish",
            onChangeFuncs: [IsAlphaNumNoSpace],
            name: "DesignationEnglish",
            customOnBlur: onBlurTransliteration,
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
            customOnChange: (e, a) => handleGender(e, a),
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
            customOnChange: (e, a) => handleMarital(e, a),
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
            onChangeFuncs: [IsAlphaNoSpace],
            name: "GrandFatherNameEnglish",
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
            path: "ProposerDetails.PermanentAddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "PermanentAddressEnglish",
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
            path: "ProposerDetails.PermanentAdrress.TownEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
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
            onChangeFuncs: [IsAlphaNoSpace],
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
            path: "ProposerDetails.PermanentAdrress.TempAddresEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "TempAddresEnglish",
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
            path: "ProposerDetails.CitizenshipNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Citizenship Issued Date",
            visible: true,
            path: "ProposerDetails.CitizenshipIssuedDate",
          },
          {
            type: "AutoComplete",
            label: "Citizenship Issue District",
            visible: true,
            path: "ProposerDetails.IssueDistrict",
            options: masters.District,
          },
          {
            type: "MDDatePicker",
            label: "Date Of Birth",
            visible: true,
            maxDate: new Date(),
            dateFormat: "m-d-Y",
            path: "ProposerDetails.DoB",
            customOnChange: (e, d) => onDOBselect(e, d),
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
            spacing: 3.2,
          },
          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            path: "ProposerDetails.PassportNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            spacing: 2.8,
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
            minDate: new Date(lDto.ProposerDetails.PassportIssuedDate).setDate(
              new Date(lDto.ProposerDetails.PassportIssuedDate).getDate() + 1
            ),
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
            spacing: 3.9,
            visible: true,
            sx: { fontSize: "15px", paddingTop: 1 },
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
            onChangeFuncs: [IsAlphaNoSpace],
            name: "CareofNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "ProposerDetails.CareofPANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            path: "ProposerDetails.CareofContactNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.CareofAddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "CareofAddressEnglish",
            customOnBlur: onBlurTransliteration,
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
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Checkbox",
            visible: true,
            label: "Direct From Showroom",
            checkedVal: "Yes",
            uncheckedVal: "No",
            spacing: 12,
            path: "InsurableItem.0.RiskItems.0.DirectFromShowRoom",
            customOnChange: (e) => OnDirectFromShowRoom(e),
          },
          {
            type: "AutoComplete",
            label: "Name of the Vehicle",
            // visible: lDto.ClassCategorylabel !== "Passenger Carrying Vehicle",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Nameofthevehicle",
            required: true,
            // options:
            //   lDto.ClassCategory !== ""
            //     ? masters.NameoftheVehicle.filter((x) => x.description === lDto.ClassCategory)
            //     : "",
            options: masters.NameoftheVehicle.filter((x) => x.description === lDto.ClassCategory),
            customOnChange: (e, a) => onVehicalSelect(e, a, "Nameofthevehicle"),
          },
          {
            type: "AutoComplete",
            label: "Make of the Vehicle",
            visible: true,
            // visible: lDto.ClassCategorylabel !== "Passenger Carrying Vehicle",
            path: "InsurableItem.0.RiskItems.0.Makeofthevehicle",
            required: true,
            options:
              lDto.InsurableItem[0].RiskItems[0].Nameofthevehicle !== "" ? masters.Make1 : [],
            customOnChange: (e, a) => onVehicalSelect(e, a, "Makeofthevehicle"),
          },
          {
            type: "AutoComplete",
            label: "Model of the Vehicle",
            visible: true,
            // visible: lDto.ClassCategorylabel !== "Passenger Carrying Vehicle",
            path: "InsurableItem.0.RiskItems.0.Modelofthevehicle",
            options:
              lDto.InsurableItem[0].RiskItems[0].Makeofthevehicle !== "" ? masters.Model1 : [],
            required: true,
          },
          // {
          //   type: "Input",
          //   label: "name of the Vehicle",
          //   visible: lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
          //   path: "InsurableItem.0.RiskItems.0.Nameofthevehicle",
          //   onChangeFuncs: [IsFreetextNoSpace],
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Make of the vehicle",
          //   visible: lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
          //   path: "InsurableItem.0.RiskItems.0.Makeofthevehicle",
          //   onChangeFuncs: [IsFreetextNoSpace],
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Model of the Vehicle ",
          //   visible: lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
          //   path: "InsurableItem.0.RiskItems.0.Modelofthevehicle",
          //   onChangeFuncs: [IsFreetextNoSpace],
          //   required: true,
          // },

          {
            type: "Input",
            label: "Mode of Use",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Modeofuse",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Government",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.GovernmentVehicle",
            options: masters.Government,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Vehicle Category",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.VehicleCategory",
            options: masters.Category,
            required: true,
            customOnChange: (e, a) => OnVehicleCategory(e, a),
          },
          {
            type: "AutoComplete",
            label: "Type of Cover",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.TypeofCoverlabel",
            options: masters.TypeofCover.filter((x) => x.description === lDto.Class),
            required: true,
            // disableOnReset: true,
            customOnChange: (e, a) => OnTypeofCover(e, a),
          },
          {
            type: "AutoComplete",
            label: "Year of Vehicle Manufacture",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.YearofVehicleManufacture",
            customOnChange: (e, a) => OnYOMselect(e, a),
            options: masters.YearofManufacture,
            required: true,
          },
          {
            type: "Input",
            label: "Age of Vehicle",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.AgeofVehicle",
            required: true,
            disabled: true,
            // disableOnReset: true,
          },
          {
            type: "Input",
            label:
              lDto.InsurableItem[0].RiskItems[0].VehicleCategory === "Electric" ? "K/W" : "TON",
            path: "InsurableItem.0.RiskItems.0.TON",
            required: true,
            visible: lDto.ClassCategorylabel === "Agriculture & Forestry Vehicle",
            onChangeFuncs: [IsNumericGreaterThanZero],
          },
          {
            type: "Input",
            label: lDto.InsurableItem[0].RiskItems[0].VehicleCategory === "Electric" ? "K/W" : "CC",
            path: "InsurableItem.0.RiskItems.0.CCKW",
            required: true,
            visible:
              lDto.ClassCategorylabel === "Tempo/E-Rickshaw" &&
              lDto.InsurableItem[0].RiskItems[0].VehicleCategory !== "",
            onChangeFuncs: [IsNumericGreaterThanZero],
          },
          {
            type: "Input",
            label: lDto.InsurableItem[0].RiskItems[0].VehicleCategory === "Electric" ? "K/W" : "CC",
            path: "InsurableItem.0.RiskItems.0.CCKW",
            required: true,
            visible:
              lDto.ClassCategorylabel === "Passenger Carrying Vehicle" &&
              lDto.InsurableItem[0].RiskItems[0].VehicleCategory !== "",
            onChangeFuncs: [IsNumericGreaterThanZero],
          },
          {
            type: "Input",
            label:
              lDto.InsurableItem[0].RiskItems[0].VehicleCategory === "Electric" ? "K/W" : "H.P",
            path: "InsurableItem.0.RiskItems.0.HP",
            required: true,
            visible: lDto.ClassCategorylabel === "Tractor & Power Trailer",
            onChangeFuncs: [IsNumericGreaterThanZero],
          },
          {
            type: "Input",
            label: "Seats",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Seats",
            required: true,
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Cost",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.VehicleCost",
            required: true,
            customOnChange: (e) => OnTotalSumInsured(e, "VehicleCost"),
            onChangeFuncs: [IsNumericGreaterThanZero],
          },
          {
            type: "Input",
            label: "Utility Cost",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.UtilityCost",
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => OnTotalSumInsured(e, "UtilityCost"),
            customOnFocus: (e) => OnTotalSumInsuredZreoUtilityCost(e),
          },
          {
            type: "Input",
            label: "Trailer Sum Insured",
            visible:
              lDto.Class !== "Third Party Commercial" &&
              lDto.ClassCategorylabel !== "Tempo/E-Rickshaw" &&
              lDto.ClassCategorylabel !== "Passenger Carrying Vehicle",
            path: "InsurableItem.0.RiskItems.0.TrailerSumInsured",
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => OnTotalSumInsured(e, "TrailerSumInsured"),
            customOnFocus: (e) => OnTotalSumInsuredZreoTrailerSumInsured(e),
          },
          {
            type: "Input",
            label: "Total Sum Insured",
            visible:
              lDto.Class !== "Third Party Commercial" &&
              lDto.ClassCategorylabel !== "Passenger Carrying Vehicle",
            path: "TotalSumInsured",
            onChangeFuncs: [IsNumericGreaterThanZero],
            required: true,
          },
          {
            type: "Input",
            label: "Total Sum Insured",
            visible: lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            path: "InsurableItem.0.RiskItems.0.TotalSumInsured",
            disabled: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Voluntary Excess",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.VolunatryExcess",
            options: masters.CommercialExcess,
          },
          {
            type: "Input",
            label: "Compulsory Excess",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.CompulsoryExcess",
            required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Own Goods Carrying/Private use",
            visible:
              lDto.Class !== "Third Party Commercial" &&
              lDto.ClassCategorylabel !== "Tempo/E-Rickshaw" &&
              lDto.InsurableItem[0].RiskItems[0].GovernmentVehicle === "No",
            path: "InsurableItem.0.RiskItems.0.OwnGoodsCarryingorPrivateUse",
            options: masters.DirectDiscount,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Towing Charge",
            visible: lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.TowingCharges",
            required: true,
            options: masters.DirectDiscount,
          },
          {
            type: "AutoComplete",
            label: "No Claim Discount Year",
            visible:
              lDto.DocType !== "Fresh" &&
              lDto.Class !== "Third Party Commercial" &&
              lDto.DocType !== "",
            path: "InsurableItem.0.RiskItems.0.NCDYear",
            options: masters.NCDYear,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Direct Discount(%)",
            visible:
              lDto.InsurableItem[0].RiskItems[0].GovernmentVehicle === "No" &&
              lDto.Class !== "Third Party Commercial",
            path: "InsurableItem.0.RiskItems.0.DirectDiscount",
            options: masters.DirectDiscount,
            required: true,
            customOnChange: (e, a) => OnDirectDiscountAgent(e, a),
          },
          {
            type: "MDDatePicker",
            label: "Registration Date",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.RegistrationDate",
          },
          {
            type: "Input",
            label: "Vehicle Number (English)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.VehicleNoEnglish",
            disabled: lDto.InsurableItem[0].RiskItems[0].DirectFromShowRoom === "Yes",
            required: lDto.InsurableItem[0].RiskItems[0].DirectFromShowRoom !== "Yes",
            name: "VehicleNoEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Vehicle Number (Nepali)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.VehicleNoNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Engine Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.EngineNo",
            required: true,
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Chasis Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.ChasisNo",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
          },
          { type: "Typography", visible: true, label: " PA to Driver", spacing: 12 },
          {
            type: "Input",
            label: "No. of Driver/Count",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.DriverCount",
            required: true,
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Driver Sum Insured ( Totals)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.DriverSI",
            required: true,
            onChangeFuncs: [IsNumericGreaterThanZero],
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Typography",
            visible: true,
            label:
              lDto.ClassCategorylabel === "Passenger Carrying Vehicle"
                ? "PA to Helper/Employee"
                : "",
            spacing: 12,
          },
          {
            type: "Input",
            label: "No. of Helper/Employee",
            visible: lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            path: "InsurableItem.0.RiskItems.0.NoofHelperorEmployee",
            required: true,
            disableOnReset: true,
            disabled: true,
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => Totalseat(e, "NoofHelperorEmployee"),
          },
          {
            type: "Input",
            label: "Helper/Employee Sum Insured (Totals)",
            visible: lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            required: true,
            path: "InsurableItem.0.RiskItems.0.HelperorEmployeeSI",
            onChangeFuncs: [IsNumericGreaterThanZero],
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Typography",
            visible: true,
            label:
              lDto.ClassCategorylabel === "Tempo/E-Rickshaw" ||
              lDto.ClassCategorylabel === "Passenger Carrying Vehicle"
                ? " PA to Passenger"
                : "PA to Helper/Employee",
            spacing: 12,
          },
          {
            type: "Input",
            label: "No. of Helper/Employee",
            visible:
              lDto.ClassCategorylabel !== "Tempo/E-Rickshaw" &&
              lDto.ClassCategorylabel !== "Passenger Carrying Vehicle",
            path: "InsurableItem.0.RiskItems.0.NoofHelperorEmployee",
            required: true,
            disableOnReset: true,
            disabled: true,
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => Totalseat(e, "NoofHelperorEmployee"),
          },
          {
            type: "Input",
            label: "Helper/Employee Sum Insured (Totals)",
            visible:
              lDto.ClassCategorylabel !== "Tempo/E-Rickshaw" &&
              lDto.ClassCategorylabel !== "Passenger Carrying Vehicle",
            required: true,
            path: "InsurableItem.0.RiskItems.0.HelperorEmployeeSI",
            onChangeFuncs: [IsNumericGreaterThanZero],
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "No of Passenger",
            visible:
              lDto.ClassCategorylabel === "Tempo/E-Rickshaw" ||
              lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            path: "InsurableItem.0.RiskItems.0.PassengerCount",
            required: true,
            disableOnReset: true,
            disabled: lDto.ClassCategorylabel === "Tempo/E-Rickshaw" ? true : "",
            onChangeFuncs: [IsNumericGreaterThanZero],
            customOnChange: (e) => Totalseat(e, "PassengerCount"),
          },
          {
            type: "Input",
            label: "Passenger Sum insured(Totals)",
            visible:
              lDto.ClassCategorylabel === "Tempo/E-Rickshaw" ||
              lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            required: true,
            path: "InsurableItem.0.RiskItems.0.PAPassengerSI",
            onChangeFuncs: [IsNumericGreaterThanZero],
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Other Description ",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.OtherDescription",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Delivery Date",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.DeliveryDate",
          },
          {
            type: "Input",
            label: "Additional Description/Warranties (If Any) ",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.AdditionalWarranty",
            onChangeFuncs: [IsFreetextNoSpace],
          },
        ],
        [
          // {
          //   type: "Typography",
          //   visible: lDto.DocType === "RollOver" && lDto.Class !== "Third Party Commercial",
          //   label: "Roll Over Documents",
          //   spacing: 12,
          // },

          {
            type: "Input",
            label: "Document Name",
            path: `RollOverDocuments.0.DocName`,
            disableOnReset: true,
            disabled: true,
            visible: lDto.DocType === "RollOver" && lDto.Class !== "Third Party Commercial",
          },
          {
            type: "Button",
            visible: lDto.DocType === "RollOver" && lDto.Class !== "Third Party Commercial",
            component: "label",
            label: "Upload",
            spacing: 2,
            typeFormat: (
              <input
                hidden
                accept="image/bmp, image/jpeg, image/png,"
                type="file"
                onChange={OnRollOverProfilePicture}
              />
            ),
          },
          {
            type: "Typography",
            label: lDto.RollOverDocuments[0].FileName,
            visible: lDto.DocType === "RollOver" && lDto.Class !== "Third Party Commercial",
            spacing: 3.9,
            sx: { fontSize: "15px", paddingTop: 1 },
          },
          {
            type: "IconButton",
            icon: "close",
            visible:
              lDto.DocType === "RollOver" &&
              lDto.Class !== "Third Party Commercial" &&
              lDto.RollOverDocuments[0].FileName !== "",
            onClick: onCancelRollOverProfilePicture,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
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
            options: masters.IssuingBranch.filter((x) =>
              loginUserDetails.branchName.split(",").some((y) => y === x.mValue)
            ),
            path: "Channel.IssuingBranch",
            required: true,
            disabled: lDto.proposalNo !== "" && lDto.proposalNo !== undefined,
            disableOnReset: lDto.proposalNo !== "" && lDto.proposalNo !== undefined,
            customOnChange: (e, a) => handleIssuingBranch(e, a, "IssuingBranch"),
          },
          {
            type: "Input",
            label: "Sub-Branch",
            visible: true,
            path: "Channel.SubBranch",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Fiscal Year",
            visible: true,
            path: "Channel.FiscalYear",
            required: true,
            disabled: true,
            customOnChange: OnFiscalYear(),
          },
          {
            type: "AutoComplete",
            label: "Field Officer Code ",
            visible: true,
            path: "Channel.FieldOfficerCode",
            optionLabel: "fieldName",
            options: masters.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldOfficerCode"),
          },
          {
            type: "AutoComplete",
            label: "Field Officer Name ",
            visible: true,
            path: "Channel.FieldOfficer",
            // optionLabel: "mValue",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldOfficer"),
            options: masters.FieldOfficer,
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Code ",
            visible: true,
            path: "Channel.SubFieldOfficerCode",
            options: masters.SubFieldOfficer,
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficerCode"),
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Name",
            visible: true,
            options: masters.SubFieldOfficer,
            path: "Channel.SubFieldOfficer",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Agent Code ",
            visible: true,
            path: "Channel.AgentCode",
            optionLabel: "fieldName",
            options: masters.Agent,
            disabled:
              lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes" ||
              lDto.Class === "Third Party Commercial",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentCode"),
          },
          {
            type: "AutoComplete",
            label: "Agent Name ",
            visible: true,
            path: "Channel.AgentName",
            options: masters.Agent,
            disabled:
              lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes" ||
              lDto.Class === "Third Party Commercial",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Code",
            visible: true,
            path: "Channel.SubAgentCode",
            options: masters.SubAgent,
            disabled:
              lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes" ||
              lDto.Class === "Third Party Commercial",
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgent"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Name",
            visible: true,
            path: "Channel.SubAgentName",
            disabled:
              lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes" ||
              lDto.Class === "Third Party Commercial",
            options: masters.SubAgent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgentName"),
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            options: masters.Country,
            path: "RiskAddressDetails.Country",
            required: true,
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            options: lDto.RiskAddressDetails.Country !== "" ? masters.State : [],
            path: "RiskAddressDetails.ProvinceState",
            required: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State3"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: "RiskAddressDetails.District",
            required: true,
            options: lDto.RiskAddressDetails.ProvinceState !== "" ? masters.District3 : [],
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District3"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            path: "RiskAddressDetails.Municipality",
            options: lDto.RiskAddressDetails.District !== "" ? masters.Municipality3 : [],
            required: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality3"),
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
            path: "RiskAddressDetails.AddressEnglish",
            name: "RiskAddressEnglish",
            required: true,
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address(Nepali) ",
            visible: true,
            path: "RiskAddressDetails.AddressNepali",
            disabled: true,
            // required: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "RiskAddressDetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            path: "RiskAddressDetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "House Number ",
            visible: true,
            path: "RiskAddressDetails.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
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
            label: "Basic Premium",
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.BaseRatePremiumAsPerSumInsured",
            visible: lDto.Class !== "Third Party Commercial",
            disabled: true,
          },
          {
            type: "Input",
            label: "Discount as Per Seating Capacity",
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.TonDiscountPremium",
            visible:
              lDto.Class !== "Third Party Commercial" &&
              lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            disabled: true,
          },

          {
            type: "Input",
            label: "Additional Premium for Extra Load",
            visible:
              lDto.ClassCategorylabel === "Agriculture & Forestry Vehicle" &&
              lDto.Class !== "Third Party Commercial",
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.PremiumAccCarryingCapacity",
            disabled: true,
          },
          {
            type: "Input",
            label: "Discount on TON Discount",
            visible:
              lDto.ClassCategorylabel === "Agriculture & Forestry Vehicle" &&
              lDto.Class !== "Third Party Commercial",
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.TonDiscountPremium",
            disabled: true,
          },
          {
            type: "Input",
            label: "Old Vehicle Loading",
            required: true,
            visible: lDto.Class !== "Third Party Commercial",
            path: "FormatedData.CalculatedPremiumDetails.PremiumafterAgeofVehicleLoading",
            disabled: true,
          },
          {
            type: "Input",
            label: "Voluntary Excess",
            required: true,
            visible: lDto.Class !== "Third Party Commercial",
            path: "FormatedData.CalculatedPremiumDetails.ExcessDiscount",
            disabled: true,
          },
          {
            type: "Input",
            label: "No Claim Discount",
            required: true,
            visible: lDto.Class !== "Third Party Commercial",
            path: "FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase",
            disabled: true,
          },
          {
            type: "Input",
            label: "Own Goods Carrying Discount",
            visible:
              lDto.ClassCategorylabel !== "Tempo/E-Rickshaw" &&
              lDto.Class !== "Third Party Commercial",
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.OwnGoodsCarryingDiscountAmt",
            disabled: true,
          },
          {
            type: "Input",
            label: "Environment Discount",
            visible: lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            required: true,
            // path: "FormatedData.CalculatedPremiumDetails.OwnGoodsCarryingDiscountAmt",
            disabled: true,
          },
          {
            type: "Input",
            label: "Direct Discount",
            required: true,
            visible: lDto.Class !== "Third Party Commercial",
            path: "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
            disabled: true,
          },
          {
            type: "Input",
            label: "Towing Charges",
            required: true,
            visible: lDto.Class !== "Third Party Commercial",
            path: "FormatedData.CalculatedPremiumDetails.TowingCharges",
            disabled: true,
          },
          {
            type: "Input",
            label: "Third Party Insurance",
            visible: true,
            required: true,
            // path: "FormatedData.CalculatedPremiumDetails.TotalTPPremium",
            path: "FormatedData.CalculatedPremiumDetails.TPPremium",
            disabled: true,
          },
          {
            type: "Input",
            label: "No Claim Discount(TP)",
            required: true,
            visible: lDto.Class !== "Third Party Commercial",
            path: "FormatedData.CalculatedPremiumDetails.TPPremiumafterNCD",
            disabled: true,
          },
          {
            type: "Input",
            label: "PA Driver- Normal",
            visible: true,
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.DriverPA",
            disabled: true,
          },
          {
            type: "Input",
            label: "PA Helper/Employee- Normal",
            visible: lDto.ClassCategorylabel !== "Tempo/E-Rickshaw",
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.HelperPA",
            disabled: true,
          },
          {
            type: "Input",
            label: "PA Passenger- Normal",
            visible:
              lDto.ClassCategorylabel === "Tempo/E-Rickshaw" ||
              lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.PassengerPA",
            disabled: true,
          },
          {
            type: "Input",
            label: "Riot And Strike Damage(RSD/MD)",
            visible: lDto.Class !== "Third Party Commercial",
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF",
            disabled: true,
          },
          {
            type: "Input",
            label: "Sabotage/Terrorism",
            visible: lDto.Class !== "Third Party Commercial",
            required: true,
            path: "FormatedData.CalculatedPremiumDetails.STPremiumPDF",
            disabled: true,
          },
          {
            type: "Input",
            label: "PA Driver- Pool",
            required: true,
            visible: true,
            path: "FormatedData.CalculatedPremiumDetails.RSDTRDriverPDF",
            disabled: true,
          },
          {
            type: "Input",
            required: true,
            visible: lDto.ClassCategorylabel !== "Tempo/E-Rickshaw",
            label: "PA Helper/Employee- Pool",
            path: "FormatedData.CalculatedPremiumDetails.RSDTRHelperPDF",
            disabled: true,
          },
          {
            type: "Input",
            required: true,
            visible:
              lDto.ClassCategorylabel === "Tempo/E-Rickshaw" ||
              lDto.ClassCategorylabel === "Passenger Carrying Vehicle",
            label: "PA Passenger- Pool",
            path: "FormatedData.CalculatedPremiumDetails.RSDTRPassengerPDF",
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
          {
            type: "Custom",
            visible: true,
            spacing: 6,
            return: (
              <MDBox>
                <MDBox
                  sx={{
                    backgroundColor: "#eeeeee",
                    p: "15px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography>Gross Premium</Typography>
                      <Typography>VAT</Typography>
                      <Typography>Stamp Duty</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>रु</Typography>
                      <Typography>रु</Typography>
                      <Typography>रु</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.NetPremium")}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.VAT")}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.StampDuty")}
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
                    </List>

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
                        <b>
                          {objectPath.get(
                            dto,
                            "FormatedData.CalculatedPremiumDetails.FinalPremium"
                          )}
                        </b>
                      </Typography>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            ),
          },

          {
            type: "Typography",
            visible: true,
            label: "",
            spacing: 12,
          },
          {
            type: "Typography",
            visible: true,
            label: "",
          },
          {
            type: "Custom",
            // required: true,
            visible:
              lDto.Channel.AgentCode !== "0000" &&
              dto.Channel.AgentCode !== "" &&
              lDto.Class !== "Third Party Commercial",
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
                    <Typography>
                      <b>Commission Percentage </b>
                    </Typography>
                    <Typography>
                      <b>Commission Amount </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      <b>%</b>
                    </Typography>
                    <Typography>
                      <b>रु</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        dto,
                        "FormatedData.CalculatedPremiumDetails.CommissionPercentage"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        dto,
                        "FormatedData.CalculatedPremiumDetails.CommissionAmount"
                      )}
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
                color: "info",
                visible: true,
                label: "Preview Debit Note",
                onClick: onDebitNoteClick,
              },
              // { visible: true, color: "info", label: "Download Proposal" },
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
              height: 400,
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

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={2}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    Debit Note Sent For Approval
                  </Typography>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    {dto.proposalNo}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={2}>
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
              overflowY: "",
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
                    Do you wish to Preview and Save the Debit Note
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingBottom={1}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
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
                  amount: objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.FinalPremium"),
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
                  { label: "Nepal Clearing House", value: "NepalClearingHouse" },
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
const getOnNextClick = async ({ activeStep, dto, setDto, setBackDropFlag }) => {
  let fun = false;
  const lDto = dto;

  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (lDto !== null) {
    switch (activeStep) {
      case 0:
        if (lDto.ClassCategorylabel !== "Passenger Carrying Vehicle") {
          fun = await GenericApi("NepalCommercialVehicle", "NepalCommercialVehicleAPI", lDto).then(
            async (x) => {
              if (x.finalResult) {
                lDto.PremiumDetails = x.finalResult;
                lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
                const res1 = await SaveQuotation(lDto);
                lDto["Quotation No"] = res1.data.quotation.quoteNo;
                setDto({ ...lDto });
                setBackDropFlag(false);
                const fun1 = await swal2
                  .fire({
                    title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                    html: `<div style="display: flex; flex-direction: row;">
                  <div style="flex: 3; text-align: left; margin-left: 0rem" ">
                  <div>Gross Premium</div>
                  <div>VAT</div>
                  <div>Stamp Duty</div>
                  <div><b>Total Premium</b></div>
                </div>
                <div style="flex: 0;text-align: right;font-size:16.3px; margin-right: 1rem" ">
                <div>रु</div>
                <div>रु</div>
                <div>रु</div>
                <div><b>रु</b></div>
              </div>  
              <div style="flex: 1.3; text-align: right; margin-right: 0rem" ">
                  <div> ${formater.format(x.finalResult.NetPremium)}</div>
                  <div> ${formater.format(x.finalResult.VAT)}</div>
                  <div> ${formater.format(x.finalResult.StampDuty)}</div>
                  <div><b>${formater.format(x.finalResult.FinalPremium)}</b></div> 
                  </div> 
                  </div>`,
                    showConfirmButton: true,
                    width: 500,
                    confirmButtonText: "Proceed",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: "#0079CE",
                  })
                  .then((resX) => {
                    if (resX.isConfirmed) return true;
                    return false;
                  });
                return fun1;
              }
              swal2.fire({
                icon: "error",
                text: "Incurred an error please try again later",
                confirmButtonColor: "#0079CE",
              });
              return false;
            }
          );
        } else {
          fun = await GenericApi("NepalPCV", "NepalPCVRatingAPI", lDto).then(async (x) => {
            if (x.finalResult) {
              lDto.PremiumDetails = x.finalResult;
              lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
              const res1 = await SaveQuotation(lDto);
              lDto["Quotation No"] = res1.data.quotation.quoteNo;
              setDto({ ...lDto });
              setBackDropFlag(false);
              const fun1 = await swal2
                .fire({
                  title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                  html: `<div style="display: flex; flex-direction: row;">
                    <div style="flex: 3; text-align: left; margin-left: 0rem" ">
                    <div>Gross Premium</div>
                    <div>VAT</div>
                    <div>Stamp Duty</div>
                    <div><b>Total Premium</b></div>
                  </div>
                  <div style="flex: 0;text-align: right;font-size:16.3px; margin-right: 1rem" ">
                  <div>रु</div>
                  <div>रु</div>
                  <div>रु</div>
                  <div><b>रु</b></div>
                </div>  
                <div style="flex: 1.3; text-align: right; margin-right: 0rem" ">
                    <div> ${formater.format(x.finalResult.NetPremium)}</div>
                    <div> ${formater.format(x.finalResult.VAT)}</div>
                    <div> ${formater.format(x.finalResult.StampDuty)}</div>
                    <div><b>${formater.format(x.finalResult.FinalPremium)}</b></div> 
                    </div> 
                    </div>`,
                  showConfirmButton: true,
                  width: 500,
                  confirmButtonText: "Proceed",
                  showCloseButton: true,
                  confirmButtonColor: "#0079CE",
                  allowOutsideClick: false,
                })
                .then((resX) => {
                  if (resX.isConfirmed) return true;
                  return false;
                });
              return fun1;
            }
            swal2.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
            return false;
          });
        }
        break;
      case 1:
        fun = true;
        break;
      case 2:
        // fun = await GenericApi("NepalCommercialVehicle", "NepalCommercialVehicleAPI", lDto).then(
        //   async (x) => {
        //     if (x.finalResult) {
        //       lDto.PremiumDetails = x.finalResult;

        //       lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);

        //       await QuotationUpdate(lDto);
        //       objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.BaseRatePremiumAsPerSumInsured",
        //         formater.format(x.finalResult.BaseRatePremiumAsPerSumInsured)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.PremiumAccCarryingCapacity",
        //         formater.format(x.finalResult.PremiumAccCarryingCapacity)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TonDiscountPremium",
        //         formater.format(x.finalResult.TonDiscountPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.PremiumafterAgeofVehicleLoading",
        //         formater.format(x.finalResult.PremiumafterAgeofVehicleLoading)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.ExcessDiscount",
        //         formater.format(x.finalResult.ExcessDiscount)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase",
        //         formater.format(x.finalResult.NoClaimDiscountBase)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.OwnGoodsCarryingDiscountAmt",
        //         formater.format(x.finalResult.OwnGoodsCarryingDiscountAmt)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
        //         formater.format(x.finalResult.DirectDiscountAmount)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TowingCharges",
        //         formater.format(x.finalResult.TowingCharges)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TotalTPPremium",
        //         formater.format(x.finalResult.TotalTPPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TPPremiumafterNCD",
        //         formater.format(x.finalResult.TPPremiumafterNCD)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.DriverPA",
        //         formater.format(x.finalResult.DriverPA)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.HelperPA",
        //         formater.format(x.finalResult.HelperPA)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.RSDMDPremium",
        //         formater.format(x.finalResult.RSDMDPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.STPremium",
        //         formater.format(x.finalResult.STPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.RSDTRDriver",
        //         formater.format(x.finalResult.RSDTRDriver)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.RSDTRHelper",
        //         formater.format(x.finalResult.RSDTRHelper)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.NetPremium",
        //         formater.format(x.finalResult.NetPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.StampDuty",
        //         formater.format(x.finalResult.StampDuty)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.VAT",
        //         formater.format(x.finalResult.VAT)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.FinalPremium",
        //         formater.format(x.finalResult.FinalPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.PassengerPA",
        //         formater.format(x.finalResult.PassengerPA)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.ReceiptPremiumPDF",
        //         formater.format(x.finalResult.ReceiptPremiumPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF",
        //         formater.format(x.finalResult.RSDMDPremiumPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TaxableAmtPDF",
        //         formater.format(x.finalResult.TaxableAmtPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.VATPDF",
        //         formater.format(x.finalResult.VATPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.RecieptTotalPremiumPDF",
        //         formater.format(x.finalResult.RecieptTotalPremiumPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TotalODPremium",
        //         formater.format(x.finalResult.TotalODPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TotalPremium",
        //         formater.format(x.finalResult.TotalPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TPPremium",
        //         formater.format(x.finalResult.TPPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.PoolPremium",
        //         formater.format(x.finalResult.PoolPremium)
        //       );
        //       // objectPath.set(
        //       //   lDto,
        //       //   "FormatedData.TotalSumInsured",
        //       //   formater.format(x.finalResult.TotalSumInsured)
        //       // );
        //       lDto.FormatedData.CalculatedPremiumDetails.TotalSumInsured = formater.format(
        //         lDto.TotalSumInsured
        //       );
        //       lDto.FormatedData.CalculatedPremiumDetails.VehicleCost = formater.format(
        //         lDto.InsurableItem[0].RiskItems[0].VehicleCost
        //       );
        //       lDto.FormatedData.CalculatedPremiumDetails.UtilityCost = formater.format(
        //         lDto.InsurableItem[0].RiskItems[0].UtilityCost
        //       );
        //       lDto.FormatedData.CalculatedPremiumDetails.TrailerSumInsured = formater.format(
        //         lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured
        //       );
        //       lDto.FormatedData.CalculatedPremiumDetails.CompulsoryExcess = formater.format(
        //         lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess
        //       );
        //       lDto.FormatedData.CalculatedPremiumDetails.VolunatryExcess = formater.format(
        //         lDto.InsurableItem[0].RiskItems[0].VolunatryExcess
        //       );
        //       lDto.FormatedData.CalculatedPremiumDetails.PAPassengerSI = formater.format(
        //         lDto.InsurableItem[0].RiskItems[0].PAPassengerSI
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.PremiumbeforeAgeofVehicleLoading",
        //         formater.format(x.finalResult.PremiumbeforeAgeofVehicleLoading)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.BasicPremium",
        //         formater.format(x.finalResult.BasicPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.PremiumafterExcessDiscount",
        //         formater.format(x.finalResult.PremiumafterExcessDiscount)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.PremiumafterNCDiscount",
        //         formater.format(x.finalResult.PremiumafterNCDiscount)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.PremiumafterOwnGoodsCarryingDiscount",
        //         formater.format(x.finalResult.PremiumafterOwnGoodsCarryingDiscount)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.NepalExcessRateAFV",
        //         formater.format(x.finalResult.NepalExcessRateAFV)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TractorTPPremiumPDF",
        //         formater.format(x.finalResult.TractorTPPremiumPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TrailorTPPremiumPDF",
        //         formater.format(x.finalResult.TrailorTPPremiumPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.AgeofVehiclePDF",
        //         formater.format(x.finalResult.AgeofVehiclePDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.ShortPeriodRatePDF",
        //         formater.format(x.finalResult.ShortPeriodRatePDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.STPremiumPDF",
        //         formater.format(x.finalResult.STPremiumPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.RSDTRDriverPDF",
        //         formater.format(x.finalResult.RSDTRDriverPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.RSDTRHelperPDF",
        //         formater.format(x.finalResult.RSDTRHelperPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.RSDTRPassengerPDF",
        //         formater.format(x.finalResult.RSDTRPassengerPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.PoolPremiumPDF",
        //         formater.format(x.finalResult.PoolPremiumPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TotalODPremiumPDF",
        //         formater.format(x.finalResult.TotalODPremiumPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.RSDMDSTPremiumPDF",
        //         formater.format(x.finalResult.RSDMDSTPremiumPDF)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
        //         x.finalResult.CommissionPercentage
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.CommissionAmount",
        //         formater.format(x.finalResult.CommissionAmount)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.GrossPremium",
        //         formater.format(x.finalResult.GrossPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.ReceiptPremium",
        //         formater.format(x.finalResult.ReceiptPremium)
        //       );
        //       objectPath.set(
        //         lDto,
        //         "FormatedData.CalculatedPremiumDetails.TaxInvoicePremiumPDF",
        //         formater.format(x.finalResult.TaxInvoicePremiumPDF)
        //       );
        //       setDto({ ...lDto });
        //       return true;
        //     }
        //     setBackDropFlag(false);
        //     swal2.fire({
        //       icon: "error",
        //       text: "Incurred an error please try again later",
        //       confirmButtonColor: "#0079CE",
        //     });

        //     return false;
        //   }
        // );
        fun = true;
        break;
      case 3:
        fun = await GenericApi("NepalCommercialVehicle", "NepalCommercialVehicleAPI", lDto).then(
          async (x) => {
            if (x.finalResult) {
              lDto.PremiumDetails = x.finalResult;

              lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);

              await QuotationUpdate(lDto);
              objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.BaseRatePremiumAsPerSumInsured",
                formater.format(x.finalResult.BaseRatePremiumAsPerSumInsured)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumAccCarryingCapacity",
                formater.format(x.finalResult.PremiumAccCarryingCapacity)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TonDiscountPremium",
                formater.format(x.finalResult.TonDiscountPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumafterAgeofVehicleLoading",
                formater.format(x.finalResult.PremiumafterAgeofVehicleLoading)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.ExcessDiscount",
                formater.format(x.finalResult.ExcessDiscount)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase",
                formater.format(x.finalResult.NoClaimDiscountBase)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.OwnGoodsCarryingDiscountAmt",
                formater.format(x.finalResult.OwnGoodsCarryingDiscountAmt)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
                formater.format(x.finalResult.DirectDiscountAmount)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TowingCharges",
                formater.format(x.finalResult.TowingCharges)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalTPPremium",
                formater.format(x.finalResult.TotalTPPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TPPremiumafterNCD",
                formater.format(x.finalResult.TPPremiumafterNCD)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.DriverPA",
                formater.format(x.finalResult.DriverPA)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.HelperPA",
                formater.format(x.finalResult.HelperPA)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.RSDMDPremium",
                formater.format(x.finalResult.RSDMDPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.STPremium",
                formater.format(x.finalResult.STPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.RSDTRDriver",
                formater.format(x.finalResult.RSDTRDriver)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.RSDTRHelper",
                formater.format(x.finalResult.RSDTRHelper)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.NetPremium",
                formater.format(x.finalResult.NetPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.StampDuty",
                formater.format(x.finalResult.StampDuty)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.VAT",
                formater.format(x.finalResult.VAT)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.FinalPremium",
                formater.format(x.finalResult.FinalPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PassengerPA",
                formater.format(x.finalResult.PassengerPA)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.ReceiptPremiumPDF",
                formater.format(x.finalResult.ReceiptPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF",
                formater.format(x.finalResult.RSDMDPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TaxableAmtPDF",
                formater.format(x.finalResult.TaxableAmtPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.VATPDF",
                formater.format(x.finalResult.VATPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.RecieptTotalPremiumPDF",
                formater.format(x.finalResult.RecieptTotalPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalODPremium",
                formater.format(x.finalResult.TotalODPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalPremium",
                formater.format(x.finalResult.TotalPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TPPremium",
                formater.format(x.finalResult.TPPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PoolPremium",
                formater.format(x.finalResult.PoolPremium)
              );
              // objectPath.set(
              //   lDto,
              //   "FormatedData.TotalSumInsured",
              //   formater.format(x.finalResult.TotalSumInsured)
              // );
              lDto.FormatedData.CalculatedPremiumDetails.TotalSumInsured = formater.format(
                lDto.TotalSumInsured
              );
              lDto.FormatedData.CalculatedPremiumDetails.VehicleCost = formater.format(
                lDto.InsurableItem[0].RiskItems[0].VehicleCost
              );
              lDto.FormatedData.CalculatedPremiumDetails.UtilityCost = formater.format(
                lDto.InsurableItem[0].RiskItems[0].UtilityCost
              );
              lDto.FormatedData.CalculatedPremiumDetails.TrailerSumInsured = formater.format(
                lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured
              );
              lDto.FormatedData.CalculatedPremiumDetails.CompulsoryExcess = formater.format(
                lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess
              );
              lDto.FormatedData.CalculatedPremiumDetails.VolunatryExcess = formater.format(
                lDto.InsurableItem[0].RiskItems[0].VolunatryExcess
              );
              lDto.FormatedData.CalculatedPremiumDetails.PAPassengerSI = formater.format(
                lDto.InsurableItem[0].RiskItems[0].PAPassengerSI
              );
              lDto.FormatedData.CalculatedPremiumDetails.HelperorEmployeeSI = formater.format(
                lDto.InsurableItem[0].RiskItems[0].HelperorEmployeeSI
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumbeforeAgeofVehicleLoading",
                formater.format(x.finalResult.PremiumbeforeAgeofVehicleLoading)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.BasicPremium",
                formater.format(x.finalResult.BasicPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumafterExcessDiscount",
                formater.format(x.finalResult.PremiumafterExcessDiscount)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumafterNCDiscount",
                formater.format(x.finalResult.PremiumafterNCDiscount)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumafterOwnGoodsCarryingDiscount",
                formater.format(x.finalResult.PremiumafterOwnGoodsCarryingDiscount)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.NepalExcessRateAFV",
                formater.format(x.finalResult.NepalExcessRateAFV)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TractorTPPremiumPDF",
                formater.format(x.finalResult.TractorTPPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TrailorTPPremiumPDF",
                formater.format(x.finalResult.TrailorTPPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.AgeofVehiclePDF",
                formater.format(x.finalResult.AgeofVehiclePDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.ShortPeriodRatePDF",
                formater.format(x.finalResult.ShortPeriodRatePDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.STPremiumPDF",
                formater.format(x.finalResult.STPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.RSDTRDriverPDF",
                formater.format(x.finalResult.RSDTRDriverPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.RSDTRHelperPDF",
                formater.format(x.finalResult.RSDTRHelperPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.RSDTRPassengerPDF",
                formater.format(x.finalResult.RSDTRPassengerPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PoolPremiumPDF",
                formater.format(x.finalResult.PoolPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalODPremiumPDF",
                formater.format(x.finalResult.TotalODPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.RSDMDSTPremiumPDF",
                formater.format(x.finalResult.RSDMDSTPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
                x.finalResult.CommissionPercentage
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.CommissionAmount",
                formater.format(x.finalResult.CommissionAmount)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.GrossPremium",
                formater.format(x.finalResult.GrossPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.ReceiptPremium",
                formater.format(x.finalResult.ReceiptPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TaxInvoicePremiumPDF",
                formater.format(x.finalResult.TaxInvoicePremiumPDF)
              );
              setDto({ ...lDto });
              return true;
            }
            setBackDropFlag(false);
            swal2.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });

            return false;
          }
        );

        if (lDto.proposalNo === undefined) {
          await GenericApi("NepalCommercialVehicle", "NepalCommercialProposalApi", lDto).then(
            async (x) => {
              if (x.finalResult.proposalNumber) {
                await GetProductByCode("NepalCommercialVehicle").then(async (x2) => {
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
                swal2.fire({
                  icon: "error",
                  text: "Incurred an error please try again later",
                  confirmButtonColor: "#0079CE",
                });
                fun = false;
              }
            }
          );
        } else if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
          const x = await UpdateProposalDetails(lDto);
          if (x.data.responseMessage === "Updated successfully") {
            await GetProductByCode("NepalCommercialVehicle").then(async (x2) => {
              const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);
              lDto.KYCNo = res.data[0].policyDetails.KYCNo;
              lDto.proposalNo = x.data.data.proposalNo;
              setDto({ ...lDto });
              // setBackDropFlag(false);
              fun = true;
            });
          }
        }
        break;
      case 4:
        setBackDropFlag(false);
        fun = swal2
          .fire({
            input: "checkbox",
            confirmButtonColor: "#0079CE",

            showCloseButton: true,
            allowOutsideClick: false,
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
  const onReset0 = (dto, setDto) => {
    const lDto = dto;
    lDto.RollOverDocuments = RollOverDocuments();
    setDto({ ...lDto });
  };
  const onReset1 = (dto, setDto) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.documentDetails = [{ ...docDetails() }];
    setDto({ ...lDto });
  };
  const onReset2 = (dto, setDto) => {
    const lDto = dto;
    lDto.RollOverDocuments = RollOverDocuments();
    setDto({ ...lDto });
  };
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true, onClick: onReset0 },
        next: { label: "Calculate Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: onReset1 },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: onReset2 },
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
    BranchDetailsComponets: [],
    Commercial: [],
    SubClass: [],
    placeMasters: [{ district: [], municipality: [] }],
    IssuingBranch: [],
    Company: "",
    BankDetails: [],
    BankorFinancialInstituionNameinEnglish: [],
    BranchMasters: [],
  };
  const userDetails = additionalInformation?.loginUserDetails;
  if (userDetails && userDetails?.displayName) {
    lDto.AgentName = userDetails?.displayName;
    lDto.AgentMobileNo = userDetails?.contactNumber;
    // lDto.PaymentAmount = lDto.FinalPremium;
    setDto({ ...lDto });
  }

  const currentYear = new Date().getFullYear();
  const past30Year = currentYear - 20;
  const yearArr = arrayRange(past30Year, currentYear, 1);
  const yearArrMaster = [];
  yearArr.forEach((x1, i1) => {
    yearArrMaster.push({ mID: i1, mValue: x1.toString() });
  });
  yearArrMaster.reverse();
  masters.YearofManufacture = yearArrMaster;

  await GetNPCommonMaster().then((r) => {
    r.forEach((x) => {
      masters[x.mType] = x.mdata;
    });
  });
  masters.DocType = masters.DocType.filter((x) => x.mValue !== "Renewal");
  masters.Class = masters.Class.filter((x) => x.fieldName === "Commercial");
  masters.SubClass = masters.SubClass.filter((x) => x.fieldName === "Commercial");

  await GetProdPartnermasterData("State", {}).then((r) => {
    masters.State = r.data;
  });
  await GetProdPartnermasterData("Nameofthevehicle", {}).then((r) => {
    masters.Nameofthevehicle = r.data;
  });
  if (
    localStorage.getItem("NepalCompanySelect") !== null ||
    process.env.REACT_APP_EnvId !== "297"
  ) {
    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      masters.Company = "NMIC";
    }
    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      masters.Company = "PMIC";
    }
    await GetProdPartnermasterData("BranchName", {
      Description: masters.Company,
    }).then((res) => {
      masters.IssuingBranch = res.data;
    });
  }

  if (lDto.Bankdetails.BankCategory !== "" && lDto.Bankdetails.BankCategory !== undefined) {
    if (masters.BankorFinancialInstituionNameinEnglish.length === 0) {
      const res = await GetProdPartnermasterData("BankDetails", {
        BankFinancialInstitution: lDto.Bankdetails.BankCategorylabel,
      });
      masters.BankorFinancialInstituionNameinEnglish = res.data;
    }
  }
  if (
    lDto.Bankdetails.BankorFinancialInstituionNameinEnglish !== "" &&
    lDto.Bankdetails.BankorFinancialInstituionNameinEnglish !== undefined
  ) {
    if (masters.BranchMasters.length === 0) {
      const res = await GetProdPartnermasterData("BranchMasters", {
        BankFinancialInstitution: lDto.Bankdetails.BankCategorylabel,
        Bankname: lDto.Bankdetails.BankorFinancialInstituionNameinEnglish,
      });
      masters.BranchMasters = res.data;
    }
  }
  setDto({ ...lDto });
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
