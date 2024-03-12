import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import MDCheckbox from "components/MDCheckbox";
import HelpIcon from "@mui/icons-material/Help";
import MDTypography from "components/MDTypography";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import objectPath from "object-path";
import ClearIcon from "@mui/icons-material/Clear";
import Success from "assets/images/Nepal/Success.png";
import CheckIcon from "@mui/icons-material/Check";
import NormalTwoWheelerImg from "assets/images/Nepal/Normal_twowheeler_icon.png";
import ElectricTwoWheelerImg from "assets/images/Nepal/Electric_Two_Wheeler_Icon.png";
import PremiumSummaryImg from "assets/images/Nepal/Premium_Summary_Icon.png";
import EngineChasisImg from "assets/images/Nepal/EngineChasisPage.jpg";
import CitizenshipFrontPage from "assets/images/Nepal/CitizenshipFrontPage.jpg";
import CitizenshipBackPage from "assets/images/Nepal/CitizenshipBackPage.jpg";
import PassportFrontImg from "assets/images/Nepal/PassportFrontPage.jpg";
import PassportBackImg from "assets/images/Nepal/PassportBackPage.jpg";
import LicenseImg from "assets/images/Nepal/License.jpg";
import RegisterationImg from "assets/images/Nepal/CompanyRegister.jpg";
import PanImg from "assets/images/Nepal/Pan.jpg";
import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Grid,
  Card,
  Divider,
  // Slide,
  // Modal,
  Drawer,
  // Link,
  IconButton,
  // Icon,
} from "@mui/material";
import swal2 from "sweetalert2";
import swal from "sweetalert";
import { BranchDetails } from "./data/Json/CommercialJson";
import { B2CMotorCycleJson } from "./data/Json/B2CMotorCycleJson";

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
  // QuotationUpdate,
  UpdateProposalDetails,
  // UpdateWorkflowStatus,
  // SavepolicyWFStatus,
  // SendNotification,
  GetProductByCode,
} from "./data/APIs/MotorCycleApi";

import PaymentPage from "../../Payment";
import { GetTemplatePayload, GetProposalByNumber } from "../../Payment/Apis";
import {
  IsNumeric,
  arrayRange,
  addDays,
  IsEmail,
  // IsNumaricSpecial,
  // IsAlphaNum,
  IsMobileNumber,
  IsFreetextNoSpace,
  IsNumaricSpecialNoSpace,
  // DateFormatFromDateObject,
  DateFormatFromStringDate,
  AgeCalculator,
  diffDaysCalculator,
} from "../../../../../../Common/Validations";

const cardStyle = {
  width: "100%",
  // height: "auto",
  border: "2px solid rgba(112, 112, 112, 0.3)",
  borderRadius: "0.5rem",
  m: 1,
  backgroundColor: "#DEEFFD",
  textAlign: "left",
  "&:hover": {
    // backgroundColor: "#2E3192",
    cursor: "pointer",
  },
};
const imgStyle = {
  width: "100%",
  borderRadius: "0",
  maxWidth: "60%",
  margin: "0 auto",
};

const boxStyle = {
  m: 1,
  p: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "left",
};

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = B2CMotorCycleJson();
  dto.ProductCode = "NepalMotorTwoWheeler";
  if (
    genericInfo.Flow &&
    (genericInfo.Flow === "DisApproveFlow" ||
      genericInfo.Flow === "ApproveFlow" ||
      genericInfo.Flow === "DebitFlow")
  ) {
    dto = { ...dto, ...PolicyDto };
  }
  // dto = { ...dto, ...PolicyDto };
  return dto;
};

const getProcessSteps = () => {
  const steps = [
    "Quote Details",
    "Insured Details",
    "Vehicle Details",
    "Premium Summary",
    "Payment",
  ];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto, masters }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [{ name: "", visible: true }]; // Quote Details
      break;
    case 1:
      steps = [
        { name: "", visible: true }, // Customer Details
        {
          name: "Bank/Financial Institution Details",
          visible: dto.FinancingType === "Bank/Financial Institution",
          defaultExpanded: true,
        },
        {
          name: "Branch Details",
          visible:
            dto.FinancingType === "Bank/Financial Institution" &&
            (masters.BranchMasters.length === undefined || masters.BranchMasters.length > 0),
          defaultExpanded: true,
        },
        // ...spreadBranchDetails().filter((x, i) => i !== 0),

        {
          name: "Insured Details",
          // visible:
          //   dto.FinancingType === "Direct" || dto.FinancingType === "Bank/Financial Institution",
          // type: "Custom",
          visible: true,
          // spacing: 6,
          // return: (
          //   <Tooltip title="If the vehicle is being used by individual but insured in the name of company">
          //     <InfoIcon />
          //   </Tooltip>
          // ),
          defaultExpanded: true,
        },
        {
          name: "Individual Information",
          visible: dto.FinancingType !== "" && dto.ProposerDetails.InsuredType === "Individual",
          defaultExpanded: true,
        },
        {
          name: dto.ProposerDetails.InsuredType,
          visible:
            dto.FinancingType !== "" &&
            dto.ProposerDetails.InsuredType !== "" &&
            dto.ProposerDetails.InsuredType !== "Individual",
          defaultExpanded: true,
        },
        {
          name: "Care of Details",
          visible:
            dto.FinancingType === "Direct" || dto.FinancingType === "Bank/Financial Institution",
          defaultExpanded: true,
        },
        {
          name:
            dto.ProposerDetails.InsuredType === "Individual" ? "Document List" : "Document Section",
          visible: true,
          defaultExpanded: true,
        },
        // {
        //   name: "Document List",
        //   visible: dto.FinancingType !== "" && dto.ProposerDetails.InsuredType === "Individual",
        //   defaultExpanded: true,
        // },
        // {
        //   name: "Document Section",
        //   visible:
        //     dto.FinancingType !== "" &&
        //     dto.ProposerDetails.InsuredType !== "" &&
        //     dto.ProposerDetails.InsuredType !== "Individual",
        //   defaultExpanded: true,
        // },
        {
          name: "",
          visible: true,
        },
      ];

      break;
    case 2:
      steps = [
        { name: "Vehicle Details", visible: true, defaultExpanded: true },
        { name: "Document List", visible: true, defaultExpanded: true },
      ]; // Vehicle Details
      break;
    case 3:
      steps = [{ name: "", visible: true }]; // Premium Break-up
      break;
    case 4:
      steps = [{ name: "", visible: true }]; // Payment Page
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
  const lMasters = masters;

  const policyType = localStorage.getItem("b2cPolicyType");

  useEffect(() => {
    if (policyType === "New Policy") {
      lDto.DocType = "Fresh";
    } else {
      lDto.DocType = policyType;
    }

    setDto({ ...lDto });
  }, [policyType]);

  useEffect(() => {
    lDto.Channel.IssuingBranch = "Biratnagar";
    const a = {
      ProvinceCode: "NEP1",
      ShortCode: "BRT",
      Description: "NMIC",
    };
    let ClassCode = "";
    if (dto.Class === "Comprehensive Plan") {
      ClassCode = "MC";
    } else if (dto.Class === "Third Party Plan") {
      ClassCode = "TPMC";
    }
    const BusinessTypeCode = dto.DocType.split("")[0];
    lDto.PolicyPrefix = a.ProvinceCode.concat("/", a.ShortCode, "/", "MV").concat(
      "/",
      ClassCode,
      "/",
      BusinessTypeCode,
      "/",
      dto.Channel.FiscalYear,
      "/"
    );

    setDto({ ...lDto });
  }, [dto.Class]);

  // const loginType = "";
  // const [
  //   control,
  //   //  dispatch
  // ] = useDataController();
  // const { genericInfo } = control;

  const IsNumericGreaterThanZero = (number) => {
    const regex = /^(?!(0))[0-9]*$/;
    if (regex.test(number)) return true;
    return "Value must be greater than zero and Numeric";
    //  " Allows only number";
  };

  // Translation English To Nepali
  // const onBlurTransliteration = async (e, index, EF, ET) => {
  //   EF(false);
  //   ET("");
  //   // production
  //   // development
  //   if (process.env.NODE  ENV === "production") {
  //     const iText = e.target.value;
  //     const varName = e.target.name;
  //     const obj = {
  //       textList: [{ Text: iText }],
  //     };
  //     const res = await Transliteration(obj);
  //     const Text = res[0].text;
  //     if (varName === "BankNameinEnglish") {
  //       lDto.Bankdetails.BankorFinancialInstituionNameinNepali = Text;
  //     }
  //     if (varName === "BankAddressEnglish") {
  //       lDto.Bankdetails.AddressNepali = Text;
  //     }
  //     if (varName === "BranchNameinEnglish") {
  //       lDto.Bankdetails.BranchDetails[index].AddressNepali = Text;
  //     }
  //     if (varName === "InsuredNameEnglish") {
  //       lDto.ProposerDetails.InsuredNameNepali = Text;
  //     }
  //     if (varName === "TemporaryAddressEnglish") {
  //       lDto.ProposerDetails.CommunicationAddress.TemporaryAddressNepali = Text;
  //     }
  //     if (varName === "TemporaryAddressEnglish1") {
  //       lDto.ProposerDetails.CommunicationAddress.TemporaryAddressNepali = Text;
  //     }
  //     if (varName === "PermanentAdrressEnglish") {
  //       lDto.ProposerDetails.PermanentAdrress.AddressNepali = Text;
  //     }
  //     if (varName === "HusbandNameEnglish") {
  //       lDto.ProposerDetails.HusbandNameNepali = Text;
  //     }
  //     if (varName === "HusbandNameEnglish1") {
  //       lDto.ProposerDetails.HusbandNameNepali = Text;
  //     }
  //     if (varName === "WifeNameEnglish") {
  //       lDto.ProposerDetails.WifeNameNepali = Text;
  //     }
  //     if (varName === "WifeNameEnglish1") {
  //       lDto.ProposerDetails.WifeNameNepali = Text;
  //     }
  //     if (varName === "FatherNameEnglish") {
  //       lDto.ProposerDetails.FatherNameNepali = Text;
  //     }
  //     if (varName === "GrandFatherNameEnglish") {
  //       lDto.ProposerDetails.GrandfatherNameNepali = Text;
  //     }
  //     if (varName === "PermanentAddressEnglish") {
  //       lDto.ProposerDetails.PermanentAddressNepali = Text;
  //     }
  //     if (varName === "TownEnglish") {
  //       lDto.ProposerDetails.PermanentAdrress.TownNepali = Text;
  //     }
  //     if (varName === "CityEnglish") {
  //       lDto.ProposerDetails.PermanentAdrress.CityNepali = Text;
  //     }
  //     if (varName === "TempAddresEnglish") {
  //       lDto.ProposerDetails.PermanentAdrress.TempAddresNepali = Text;
  //     }
  //     if (varName === "FatherNameEnglish1") {
  //       lDto.ProposerDetails.FatherNameNepali = Text;
  //     }
  //     if (varName === "GrandFatherNameEnglish1") {
  //       lDto.ProposerDetails.GrandfatherNameNepali = Text;
  //     }
  //     if (varName === "PermanentAddressEnglish1") {
  //       lDto.ProposerDetails.PermanentAdrress.AddressNepali = Text;
  //     }
  //     if (varName === "TownEnglish1") {
  //       lDto.ProposerDetails.PermanentAdrress.TownNepali = Text;
  //     }
  //     if (varName === "CityEnglish1") {
  //       lDto.ProposerDetails.PermanentAdrress.CityNepali = Text;
  //     }
  //     if (varName === "TempAddresEnglish1") {
  //       lDto.ProposerDetails.PermanentAdrress.TempAddresNepali = Text;
  //     }
  //     if (varName === "ResidenceEnglish") {
  //       lDto.ProposerDetails.CommunicationAddress.ResidenceNepali = Text;
  //     }
  //     if (varName === "ProprietorNameEnglish") {
  //       lDto.ProposerDetails.ProprietorNameNepali = Text;
  //     }
  //     if (varName === "RiskAddressEnglish") {
  //       lDto.RiskAddressDetails.AddressNepali = Text;
  //     }
  //     if (varName === "VehicleNoEnglish") {
  //       lDto.InsurableItem[0].RiskItems[0].VehicleNoNepali = Text;
  //     }
  //     if (varName === "MemberNameEnglish") {
  //       lDto.ProposerDetails.MemberNameNepali = Text;
  //     }
  //     if (varName === "DesignationEnglish") {
  //       lDto.ProposerDetails.DesignationNepali = Text;
  //     }
  //     if (varName === "CareofNameEnglish") {
  //       lDto.ProposerDetails.CareofNameNepali = Text;
  //     }
  //     if (varName === "CareofAddressEnglish") {
  //       lDto.ProposerDetails.CareofAddressNepali = Text;
  //     }
  //     setDto({ ...lDto });
  //   }
  // };
  // Translation English To Nepali Dropdown
  const GenderNepali = [
    { mID: 1, mValue: "Male", translation: "पुरुष" },
    { mID: 2, mValue: "Female", translation: "महिला" },
    { mID: 3, mValue: "Others", translation: "अन्य" },
  ];
  const handleGender = (e, a, n) => {
    if (a !== null) {
      if (n === "GenderEnglish") {
        lDto.ProposerDetails.GenderEnglish = a.mValue;
        lDto.ProposerDetails.GenderNepali = a.translation;
      }
      if (n === "GenderEnglish1") {
        lDto.ProposerDetails.GenderEnglish = a.mValue;
        lDto.ProposerDetails.GenderNepali = a.translation;
      }
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
  const handleMarital = (e, a, n) => {
    if (a !== null) {
      if (n === "MaritalStatusEnglish") {
        lDto.ProposerDetails.MaritalStatusEnglish = a.mValue;
        lDto.ProposerDetails.MaritalStatusNepali = a.translation;
      }
      if (n === "MaritalStatusEnglish1") {
        lDto.ProposerDetails.MaritalStatusEnglish = a.mValue;
        lDto.ProposerDetails.MaritalStatusNepali = a.translation;
      }
    } else {
      lDto.ProposerDetails.MaritalStatusEnglish = "";
      lDto.ProposerDetails.MaritalStatusNepali = "";
    }
    setDto({ ...lDto });
  };

  // PolicyStartDate Set to PolicyEndDate
  const OnPSDSelect = (e, d) => {
    // console.log(d, 99);
    lDto.PolicyStartDate = d;
    if (d !== "" && d !== undefined) {
      const date1 = addDays(DateFormatFromStringDate(d, "m/d/y", "m-d-y"), lDto.NumberofDays);

      lDto.PolicyEndDate = DateFormatFromStringDate(date1, "m-d-y", "m/d/y");
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
    } else {
      lDto.InsurableItem[0].RiskItems[0].YearofVehicleManufacture = "";
      // lDto.InsurableItem[0].RiskItems[0].CompulsoryExcess = "";
      lDto.InsurableItem[0].RiskItems[0].AgeofVehicle = "";
    }
    setDto({ ...lDto });
  };
  // PremiumType Set to NumberofDays
  const OnPTSelect = (e, a) => {
    if (a !== null) {
      // console.log(a, 11);
      lDto.PremiumType = a.mValue;
      if (a.mValue === "Normal") {
        lDto.NumberofDays = "365";
      }
      if (a.mValue === "Short Period") {
        lDto.Period = "";
        lDto.NumberofDays = "";
        lDto.PolicyStartDate = "";
        lDto.PolicyEndDate = "";
        lMasters.Period.forEach((x) => {
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
      lDto.PolicyStartDate = "";
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };
  const OnShortPeriodSelect = (e, a) => {
    if (a !== null) {
      lDto.Period = a.mValue;
    } else {
      lDto.Period = "";
    }
    lDto.NumberofDays = "";
    lDto.PolicyStartDate = "";
    lDto.PolicyEndDate = "";
    setDto({ ...lDto });
  };
  const onNumberOfDays = (val) => {
    const periodVal = lDto.Period;
    let periodNum = 0;
    let periodNum2 = 0;
    lMasters.Period.forEach((x) => {
      if (x.mValue === periodVal) {
        periodNum = x.description;
        periodNum2 = x.fieldName;
      }
    });
    // if (IsNumericGreaterThanZero(val) === true) {
    if (Number(val) <= 0) return `invalid days`;
    if (Number(val) > periodNum || Number(val) < periodNum2)
      return `Days should be in range ${periodNum2} and ${periodNum}`;
    // }
    return IsNumericGreaterThanZero(val);
  };

  const OnTotalSumInsured = (e, name) => {
    lDto.InsurableItem[0].RiskItems[0][name] = e.target.value;

    let VehicleCost1 = lDto.InsurableItem[0].RiskItems[0].VehicleCost;
    // let VehicleCost2 = lDto.InsurableItem[0].RiskItems[0].UtilityCost;
    // let VehicleCost3 = lDto.InsurableItem[0].RiskItems[0].TrailerSumInsured;
    if (VehicleCost1 === "") {
      VehicleCost1 = 0;
    }
    const VehicleCost = parseInt(VehicleCost1, 10);
    lDto.TotalSumInsured = VehicleCost.toString();
    lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = VehicleCost.toString();
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
        lMasters.District1 = res.data;
        // lMasters.Municipality1 = [];
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
        lMasters.Municipality1 = res.data;
        // lMasters.Municipality1 = [];
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
        lMasters.District2 = res.data;
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
        lMasters.Municipality2 = res.data;
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
        lMasters.District3 = res.data;
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
        lMasters.Municipality3 = res.data;
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
        // lMasters.Municipalitynew = [];
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].ProvinceState = a.mValue;
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lMasters.branchDistrict = res.data;
      } else {
        lDto.Bankdetails.BranchDetails[index].ProvinceState = "";
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }
    if (n === "District4") {
      if (a !== null) {
        // lMasters.Municipalitynew = [];
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].District = a.mValue;
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lMasters.branchMunicipality = res.data;
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
    setMasters({ ...lMasters });
  };
  const RdoTempandPermanatAdd = async (e, a) => {
    lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame = a;
    if (lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes") {
      lDto.ProposerDetails.CommunicationAddress.ProvinceState =
        lDto.ProposerDetails.PermanentAdrress.ProvinceState;
      lDto.ProposerDetails.CommunicationAddress.District =
        lDto.ProposerDetails.PermanentAdrress.District;
      lDto.ProposerDetails.CommunicationAddress.Municipality =
        lDto.ProposerDetails.PermanentAdrress.Municipality;
      lDto.ProposerDetails.CommunicationAddress.WardNumber =
        lDto.ProposerDetails.PermanentAdrress.WardNumber;
      lDto.ProposerDetails.CommunicationAddress.AddressEnglish =
        lDto.ProposerDetails.PermanentAdrress.AddressEnglish;
    } else {
      lDto.ProposerDetails.CommunicationAddress.ProvinceState = "";
      lDto.ProposerDetails.CommunicationAddress.District = "";
      lDto.ProposerDetails.CommunicationAddress.Municipality = "";
      lDto.ProposerDetails.CommunicationAddress.WardNumber = "";
      lDto.ProposerDetails.CommunicationAddress.AddressEnglish = "";
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onDOBselect = (e, d) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      lDto.ProposerDetails.DoB = "";
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

  // const onEmailClick = async (e) => {
  //   if (e.target.checked === true) {
  //     const EmailAddress = lDto.ProposerDetails["Email ID"];
  //     let Class = "";
  //     if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
  //       Class = lDto.Class === "MotorCycle" ? 163 : 164;
  //     }
  //     if (localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC") {
  //       Class = lDto.Class === "MotorCycle" ? 165 : 166;
  //     }
  //     const obj = {
  //       ProposalNo: "",
  //       policyNo: "",
  //       transactionId: "",
  //       customerId: "",
  //       key: lDto.proposalNo,
  //       keyType: "BGRProposal",
  //       communicationId: Class,
  //       // communicationId: 163,
  //       referenceId: 62,
  //       ICPDF: true,
  //       ISDMS: false,
  //     };
  //     if (EmailAddress !== "") {
  //       const res = await SendNotification(EmailAddress, obj);
  //       // console.log("email", EmailAddress);
  //       // console.log("obj", obj);
  //       if (res.data.status === 1) {
  //         swal2.fire({
  //           icon: "success",
  //           text: "E-Mail Sent succesfully",
  //           confirmButtonColor: "#0079CE",
  //         });
  //       } else {
  //         swal2.fire({
  //           icon: "error",
  //           text: "E-Mail not sent as Incorrect E-Mail ID is captured in Customer Details Screen",
  //           confirmButtonColor: "#0079CE",
  //         });
  //       }
  //     } else {
  //       swal2.fire({
  //         icon: "error",
  //         text: "E-Mail not sent as E-Mail ID is not captured in Customer Details Screen",
  //         confirmButtonColor: "#0079CE",
  //       });
  //     }
  //   }
  // };
  // const Navigate = useNavigate();
  // const onModalclose = () => {
  //   Navigate("/retail/home");
  // };
  const onVehicalSelect = async (e, a, n) => {
    if (n === "Nameofthevehicle") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Make", { FieldName: a.mID });
        lDto.InsurableItem[0].RiskItems[0].Nameofthevehicle = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].Make = "";
        lDto.InsurableItem[0].RiskItems[0].Model = "";
        lMasters.Make = [];
        lMasters.Model = [];
        lMasters.Make = res.data;
      } else {
        lMasters.Make = [];
        lMasters.Model = [];
        lDto.InsurableItem[0].RiskItems[0].Nameofthevehicle = "";
        lDto.InsurableItem[0].RiskItems[0].Make = "";
        lDto.InsurableItem[0].RiskItems[0].Model = "";
      }
    }

    if (n === "makeofthevehicle") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Model", { FieldName: a.mID });
        lDto.InsurableItem[0].RiskItems[0].Make = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].Model = "";
        lMasters.Model = [];
        lMasters.Model = res.data;
      } else {
        lDto.InsurableItem[0].RiskItems[0].Make = "";
        lDto.InsurableItem[0].RiskItems[0].Model = "";
        lMasters.Make = [];
        lMasters.Model = [];
      }
    }
    setDto({ ...lDto });
  };

  // Insured Details
  // Citizen
  const [SampleCitizenFrontModalOpen, SetSampleCitizenFrontModalOpen] = useState(false);
  const SampleCitizenFrontModal = () => {
    SetSampleCitizenFrontModalOpen(true);
  };
  const SampleCitizenFrontModalClose = () => {
    SetSampleCitizenFrontModalOpen(false);
  };
  const [SampleCitizenBackModalOpen, SetSampleCitizenBackModalOpen] = useState(false);
  const SampleCitizenBackModal = () => {
    SetSampleCitizenBackModalOpen(true);
  };
  const SampleCitizenBackModalClose = () => {
    SetSampleCitizenBackModalOpen(false);
  };
  // License
  const [SampleLicenseModalOpen, SetSampleLicenseModalOpen] = useState(false);
  const SampleLicenseModal = () => {
    SetSampleLicenseModalOpen(true);
  };
  const SampleLicenseModalClose = () => {
    SetSampleLicenseModalOpen(false);
  };
  //

  const [SamplePassPortFrontModalOpen, SetSamplePassPortFrontModalOpen] = useState(false);
  const SamplePassPortFrontModal = () => {
    SetSamplePassPortFrontModalOpen(true);
  };
  const SamplePassPortFrontModalClose = () => {
    SetSamplePassPortFrontModalOpen(false);
  };
  const [SamplePassPortBackModalOpen, SetSamplePassPortBackModalOpen] = useState(false);
  const SamplePassPortBackModal = () => {
    SetSamplePassPortBackModalOpen(true);
  };
  const SamplePassPortBackModalClose = () => {
    SetSamplePassPortBackModalOpen(false);
  };
  const [SamplePanOpen, SetSamplePanOpen] = useState(false);
  const SamplePanModal = () => {
    SetSamplePanOpen(true);
  };
  const SamplePanClose = () => {
    SetSamplePanOpen(false);
  };
  // Vehicle details Modals
  const [SampleRegistrationModalOpen, SetSampleRegistrationModalOpen] = useState(false);
  const SampleRegistrationModal = () => {
    SetSampleRegistrationModalOpen(true);
  };
  const SampleRegistrationModalClose = () => {
    SetSampleRegistrationModalOpen(false);
  };

  const [SampleChasisModalOpen, SetSampleChasisModalOpen] = useState(false);
  const SampleChasisModal = () => {
    SetSampleChasisModalOpen(true);
  };
  const SampleChasisModalClose = () => {
    SetSampleChasisModalOpen(false);
  };

  //  Premium Summary
  const [TermCondModalOpen, setTermCondModalOpen] = useState(false);
  const [PremSumModalOpen, setPremSumModalOpen] = useState(false);
  const handleTermCond = () => {
    setTermCondModalOpen(true);
  };
  const TermCondModalClose = () => {
    setTermCondModalOpen(false);
  };
  const PremSumModal = () => {
    setPremSumModalOpen(true);
  };
  const PremSumModalClose = () => {
    setPremSumModalOpen(false);
  };

  const generateFile = (content, fileName) => {
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };

  const onDebitNoteClick = async () => {
    let Class = "";

    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Class = 324;
    }
    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      Class = 324;
    }

    const downloadDTO = {
      key: dto.proposalNo,
      keyValue: "",
      templateKey: "",
      templateId: Class,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      if (result.status === 200) {
        generateFile(result.data, dto.proposalNo);
      }
    });
  };

  const DocList = [
    { mID: 1, mValue: "PAN" },
    { mID: 1, mValue: "Registration copy" },
  ];

  const onDocCancelClick = async (PageName, i) => {
    if (PageName === "ProposerDetails") {
      const file = lDto.ProposerDetails.IndividualdocumentDetails[i].DocumentFileName;
      await DeleteDocument(file).then((result) => {
        if (result.data.status === 5) {
          lDto.ProposerDetails.IndividualdocumentDetails[i].DocumentFileName = "";
          lDto.ProposerDetails.IndividualdocumentDetails[i].UploadDocDate = "";
          lDto.ProposerDetails.IndividualdocumentDetails[i].DocId = "";
          setDto({ ...lDto });
          swal({
            icon: "success",
            text: "Document Canceled successfully",
          });
        }
      });
    } else if (PageName === "Insuredetails") {
      const file = lDto.InsurableItem[0].documentDetails[i].DocumentFileName;
      await DeleteDocument(file).then((result) => {
        if (result.data.status === 5) {
          lDto.InsurableItem[0].documentDetails[i].DocumentFileName = "";
          lDto.InsurableItem[0].documentDetails[i].UploadDocDate = "";
          lDto.InsurableItem[0].documentDetails[i].DocId = "";
          setDto({ ...lDto });
          swal({
            icon: "success",
            text: "Document Canceled successfully",
          });
        }
      });
    }
  };

  const onDocUplode = async (file, PageName, i) => {
    // console.log(event);
    // const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        if (PageName === "ProposerDetails") {
          lDto.ProposerDetails.IndividualdocumentDetails[i].DocumentFileName = file.name;
          lDto.ProposerDetails.IndividualdocumentDetails[i].UploadDocDate =
            new Date().toLocaleDateString();
          lDto.ProposerDetails.IndividualdocumentDetails[i].DocId = result.data[0].docid;
          setDto({ ...lDto });
          swal({
            icon: "success",
            text: "Document uploaded successfully",
          });
        } else if (PageName === "Insuredetails") {
          lDto.InsurableItem[0].documentDetails[i].DocumentFileName = file.name;
          lDto.InsurableItem[0].documentDetails[i].UploadDocDate = new Date().toLocaleDateString();
          lDto.InsurableItem[0].documentDetails[i].DocId = result.data[0].docid;
          setDto({ ...lDto });
          swal({
            icon: "success",
            text: "Document uploaded successfully",
          });
        }
      }
    });
  };
  const handleFileUpload = async (event, PageName, index) => {
    await onDocUplode(event.target.files[0], PageName, index);
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file1.target.value = "";
  };

  const onPremiumDeclaration = (e, n) => {
    lDto[n] = e.target.checked;
    setDto({ ...lDto });
  };
  const BankFinInstArr = [];
  const FinInstdatabind = async (fieldName) => {
    const ResultBankFinInst = await GetProdPartnermasterData("BankDetails", {
      BankFinancialInstitution: fieldName,
    });
    ResultBankFinInst.data.forEach((x) => {
      BankFinInstArr.push({
        Address: x.Address,
        BankDetails: x.BankDetails,
        Country: x.Country,
        District: x.District,
        Municipality: x.Municipality,
        Province: x.Province,
        mID: x.mID,
        mValue: x.mValue,
      });
    });
    console.log("BankFinInstArr", BankFinInstArr);
    const abcd = BankFinInstArr.sort((a, b) => a.mValue.localeCompare(b.mValue));

    lMasters.BankorFinancialInstituionNameinEnglish = abcd;
    setMasters({ ...lMasters });
  };
  const handleBank = async (e, a) => {
    lDto.Bankdetails.BankorNonBank = a.mValue;
    setDto({ ...lDto });
    masters.BankCategory.forEach((x) => {
      FinInstdatabind(x.fieldName);
    });
  };
  const handleBankCategory = async (e, a, key) => {
    if (key === "BankCategory") {
      if (a !== null) {
        lDto.Bankdetails.BankCategory = a.mValue;
        // masters.BankCategory.forEach()
        const res = await GetProdPartnermasterData("BankDetails", {
          BankFinancialInstitution: a.fieldName,
        });
        lMasters.BankorFinancialInstituionNameinEnglish = res.data;
        lMasters.BranchMasters = [];
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
        lDto.Bankdetails.BranchDetails.forEach((x, i) => {
          lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
          lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
          lDto.Bankdetails.BranchDetails[i].WardNumber = "";
          lDto.Bankdetails.BranchDetails[i].Municipality = "";
          lDto.Bankdetails.BranchDetails[i].District = "";
          lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
          lDto.Bankdetails.BranchDetails[i].BranchName = "";
          lDto.Bankdetails.BranchDetails[i].OtherBranchFlag = "";
        });
        setDto({ ...lDto });
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = a.mValue;
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.mValue }],
          };
          const res = await Transliteration(obj);
          // bjectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinNepali", res[0].text);
          lDto.Bankdetails.BankorFinancialInstituionNameinNepali = res[0].text;
        }
        lDto.Bankdetails.BankCategorylabel = a.BankDetails;
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
        lMasters.BranchMasters = res.data;
        console.log("masters.BranchMasters", masters.BranchMasters, masters.BranchMasters.length);
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
        lMasters.BranchMasters = [];
      }
      setMasters({ ...lMasters });
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
      // if (process.env.NODE  ENV === "production") {
      //   const obj = {
      //     textList: [{ Text: a.mValue }],
      //   };
      //   const res = await Transliteration(obj);
      //   lDto.Bankdetails.BranchDetails[i].AddressNepali = res[0].text;
      // }
    } else {
      lDto.Bankdetails.BranchDetails[i].Bank = "";
      lDto.Bankdetails.BranchDetails[i].Country = "";
      lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
      lDto.Bankdetails.BranchDetails[i].District = "";
      // lDto.Bankdetails.BranchDetails[i].Municipality = "";
      // lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
      // lDto.Bankdetails.BranchDetails[i].WardNumber = "";
    }
    setDto({ ...lDto });
  };

  const onAddBranchDetails = () => {
    lDto.Bankdetails.BranchDetails = [...dto.Bankdetails.BranchDetails, { ...BranchDetails() }];
    setDto({ ...lDto });
  };
  const RemoveBranchDetails = async (i) => {
    const arr = dto.Bankdetails.BranchDetails.filter((x, i1) => i1 !== i);
    lDto.Bankdetails.BranchDetails = arr;
    setDto({ ...lDto });
  };
  // const onAddBranchDetails = () => {
  //   lDto.Bankdetails.BranchDetails.push({ ...BranchDetails() });
  //   lMasters.placeMasters.push({ district: [], municipality: [] });
  //   setDto({ ...lDto });
  // };
  // const RemoveBranchDetails = (i) => {
  //   const arr = dto.Bankdetails.BranchDetails.filter((x, i1) => i1 !== i);
  //   lDto.Bankdetails.BranchDetails = arr;
  //   setDto({ ...lDto });
  // };

  const onCheckOtherBranch = (e, i) => {
    lDto.Bankdetails.BranchDetails[i].BranchName = "";
    lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
    lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
    lDto.Bankdetails.BranchDetails[i].WardNumber = "";
    lDto.Bankdetails.BranchDetails[i].Municipality = "";
    lDto.Bankdetails.BranchDetails[i].District = "";
    lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
    lDto.Bankdetails.BranchDetails[i].OtherBranchFlag = e.target.checked;
    setDto({ ...lDto });
  };

  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push(
        {
          type: "Typography",
          label: `Branch Details ${i + 1}`,
          spacing: 3,
          visible: masters.BranchMasters.length === undefined || masters.BranchMasters.length > 0,
          variant: "h6",
          sx: { fontSize: "16px" },
        },
        {
          type: "Button",
          label: "ADD",
          visible:
            i === 0 &&
            (masters.BranchMasters.length === undefined || masters.BranchMasters.length > 0),
          startIcon: <AddIcon />,
          variant: "outlined",
          component: "label",
          onClick: onAddBranchDetails,
          spacing: 9,
          justifyContent: "start",
        },

        {
          type: "Button",
          label: "Delete",
          spacing: 9,
          // startIcon: <DeleteIcon />,
          justifyContent: masters.BranchMasters.length > 0 ? "start" : "end",
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
          required: dto.Bankdetails.BranchDetails[i].OtherBranchFlag !== true,
          disabled: dto.Bankdetails.BranchDetails[i].OtherBranchFlag === true,
          spacing: 3,
          customOnChange: (e, a) => handleBranchName(e, a, i),
        },

        {
          type: "Input",
          label: "Branch Name",
          visible: masters.BranchMasters.length === undefined,
          spacing: 3,
          required: true,
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
        },
        // {
        //   type: "Input",
        //   spacing: 3,
        //   label: "Country",
        //   visible: masters.BranchMasters.length > 0,

        //   path: `Bankdetails.BranchDetails.${i}.Country`,

        //   disabled: true,
        //   disableOnReset: true,
        //   // options: masters.Country,
        //   // customOnChange: (e, a) => onPlaceSelect(e, a, "Country2", i + 1),
        // },
        // {
        //   type: "Input",
        //   label: "Province/State",
        //   spacing: 3,
        //   visible: masters.BranchMasters.length > 0,
        //   path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
        //   disabled: true,
        //   // options: masters.State,
        //   // customOnChange: (e, a) => onPlaceSelect(e, a, "State2", i),
        // },
        // {
        //   type: "Input",
        //   spacing: 3,
        //   label: "District",
        //   visible: masters.BranchMasters.length > 0,
        //   path: `Bankdetails.BranchDetails.${i}.District`,
        //   disabled: true,
        //   // options: masters.Districtnew,
        //   // customOnChange: (e, a) => onPlaceSelect(e, a, "District2", i),
        // },
        // {
        //   type: "Input",
        //   spacing: 3,
        //   label: "Municipality",
        //   visible: masters.BranchMasters.length > 0,
        //   path: `Bankdetails.BranchDetails.${i}.Municipality`,
        //   disabled: true,
        //   // options: masters.Municipalitynew,
        // },
        // {
        //   type: "Input",
        //   spacing: 3,
        //   label: "Ward Number",
        //   visible: masters.BranchMasters.length > 0,
        //   path: `Bankdetails.BranchDetails.${i}.WardNumber`,
        //   disabled: true,
        // },
        // {
        //   type: "Input",
        //   spacing: 3,
        //   label: "Address(English)",
        //   visible: masters.BranchMasters.length > 0,
        //   name: "AddressEnglish1",
        //   path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
        //   disabled: true,
        // },

        {
          type: "AutoComplete",
          spacing: 3,
          label: "Country",
          visible: masters.BranchMasters.length === undefined,
          // required: true,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          options: masters.Country,
          disableOnReset: true,
          readOnly: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "Country2", i + 1),
          disabled: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          spacing: 3,
          required: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: masters.State,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State4", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          spacing: 3,
          required: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.District`,
          options: masters.branchDistrict,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District4", i),
        },
        {
          type: "AutoComplete",
          spacing: 3,
          label: "Municipality",
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          options: masters.branchMunicipality,
        },
        {
          type: "AutoComplete",
          spacing: 3,
          label: "Ward Number",
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          options: masters.WardNumber,
        },
        {
          type: "Input",
          label: "Address",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          spacing: 3,
          name: "AddressEnglish1",
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          // customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          onChangeFuncs: [IsFreetextNoSpace],
          onBlurFuncs: [IsFreetextNoSpace],
        },
        { type: "Custom", visible: true, spacing: masters.BranchMasters.length > 0 ? 9 : 3 },
        {
          type: "Checkbox",
          visible: masters.BranchMasters.length > 0,
          label: "Check if the branch doesn't exists in above dropdown",
          spacing: 12,
          checkedVal: true,
          unCheckedVal: false,
          path: `Bankdetails.BranchDetails.${i}.OtherBranchFlag`,
          // value: masters.ProposalConsent,
          customOnChange: (e) => onCheckOtherBranch(e, i),
        },
        {
          type: "Input",
          label: "Branch Name",
          visible: dto.Bankdetails.BranchDetails[i].OtherBranchFlag === true,
          spacing: 3,
          required: true,
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
        },
        {
          type: "AutoComplete",
          spacing: 3,
          label: "Country",
          visible: dto.Bankdetails.BranchDetails[i].OtherBranchFlag === true,
          // required: true,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          options: masters.Country,
          disableOnReset: true,
          readOnly: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "Country2", i + 1),
          disabled: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          spacing: 3,
          required: true,
          visible: dto.Bankdetails.BranchDetails[i].OtherBranchFlag === true,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: masters.State,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State4", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          spacing: 3,
          required: true,
          visible: dto.Bankdetails.BranchDetails[i].OtherBranchFlag === true,
          path: `Bankdetails.BranchDetails.${i}.District`,
          options: masters.branchDistrict,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District4", i),
        },
        {
          type: "AutoComplete",
          spacing: 3,
          label: "Municipality",
          visible: dto.Bankdetails.BranchDetails[i].OtherBranchFlag === true,

          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          options: masters.branchMunicipality,
        },
        {
          type: "AutoComplete",
          spacing: 3,
          label: "Ward Number",
          visible: dto.Bankdetails.BranchDetails[i].OtherBranchFlag === true,

          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          options: masters.WardNumber,
        },
        {
          type: "Input",
          label: "Address",
          visible: dto.Bankdetails.BranchDetails[i].OtherBranchFlag === true,

          required: true,
          spacing: 3,
          name: "AddressEnglish1",
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          // customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          onChangeFuncs: [IsFreetextNoSpace],
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Custom",
          visible: dto.Bankdetails.BranchDetails[i].OtherBranchFlag === true,
          spacing: 3,
        }
      );
    });
    return arr;
  };
  const onPlan = (item) => {
    if (item === "Third Party Plan") {
      lDto.PremiumType = "Normal";
      lDto.NumberofDays = "365";
    }
    lDto.InsurableItem[0].RiskItems[0].Category = "";
    lDto.InsurableItem[0].RiskItems[0].TypeofCover = "";
    lDto.Class = item;
    lDto.COB = item;
    lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel = "";
    setDto({ ...lDto });
  };
  const onCategory = (item) => {
    lDto.InsurableItem[0].RiskItems[0].Category = item;
    setDto({ ...lDto });
  };
  const onCoverType = (item) => {
    if (item === "Comprehensive Include Pool Premium") {
      lDto.InsurableItem[0].RiskItems[0].TypeofCover = "CMComprehensive";
    } else if (item === "Comprehensive Exclude Pool Premium") {
      lDto.InsurableItem[0].RiskItems[0].TypeofCover = "CMComprehensiveExcludePoolPremium";
    } else if (item === "Third Party Include Pool Premium") {
      lDto.InsurableItem[0].RiskItems[0].TypeofCover = "TPThirdPartyIncludePoolPremium";
    } else if (item === "Third Party Exclude Pool Premium") {
      lDto.InsurableItem[0].RiskItems[0].TypeofCover = "TPThirdParty";
    }

    lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel = item;

    setDto({ ...lDto });
  };

  const PreviousPolicyEnd = (e, d) => {
    const poldays = diffDaysCalculator(new Date(d), new Date(dto.PolicyStartDate));
    lDto.PreviousPolicyEndDate = d;
    if (poldays > 35) {
      swal({
        icon: "error",
        text: "NCD is not applicable as it has been beyond 35 days since your previous policy end date",
      });
      lMasters.PreviousPolicyEndDateFlag = true;
      lDto.PreviousPolicyEndDate = "";
    } else {
      lMasters.PreviousPolicyEndDateFlag = false;
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onInsuredType = (e, v) => {
    lDto.ProposerDetails.DocumentList = "";
    lDto.ProposerDetails.InsuredType = v.mValue;
    setDto({ ...lDto });
  };
  const { search } = useLocation();
  useEffect(async () => {
    const ProposalNo = new URLSearchParams(search).get("ProposalNo");
    console.log("ProposalNo", ProposalNo);
    if (ProposalNo !== null) {
      const d = await GetProposalByNumber(ProposalNo);
      const data = d.data.policyDetails;
      setDto({ ...data });
    }
  }, []);

  let data = [];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Custom",
            path: "Class",
            required: true,
            visible: true,
            spacing: 12,
            return: (
              <Grid container justifyContent="center" direction="row" spacing={1}>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  alignItems="center"
                  justifyContent="center"
                >
                  <MDTypography>
                    <b>Select Plan</b>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={2} />

                <Grid item xs={12} sm={12} md={4} alignItems="center">
                  <Card
                    sx={{
                      ...cardStyle,
                      backgroundColor: lDto.Class === "Comprehensive Plan" ? "#2E3192" : "#DEEFFD",
                      // width: "41.37rem",
                      // height: "13.875rem",
                    }}
                    onClick={() => onPlan("Comprehensive Plan")}
                  >
                    <MDBox sx={boxStyle}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <MDTypography
                            verticalAlign="middle"
                            variant="h5"
                            sx={{
                              color: dto.Class === "Comprehensive Plan" ? "#ffffff" : "#000000",
                            }}
                          >
                            Comprehensive Plan
                          </MDTypography>
                        </Grid>
                        <Grid item>
                          <MDBox flexDirection="column" justifyContent="center">
                            <MDBox display="flex" flexDirection="row" spacing={2}>
                              <CheckIcon
                                sx={{
                                  color: dto.Class === "Comprehensive Plan" ? "#ffffff" : "#000000",
                                  marginTop: "0.18rem",
                                }}
                              />
                              <MDTypography
                                verticalAlign="middle"
                                sx={{
                                  color: dto.Class === "Comprehensive Plan" ? "#ffffff" : "#000000",
                                  fontSize: "17px",
                                }}
                                // startIcon={<CheckIcon />}
                              >
                                Covers damage to your own vehicle due to various risks.
                              </MDTypography>
                            </MDBox>
                            <MDBox display="flex" flexDirection="row" alignItems="flex-start">
                              <CheckIcon
                                sx={{
                                  marginTop: "0.18rem",
                                  color: dto.Class === "Comprehensive Plan" ? "#ffffff" : "#000000",
                                }}
                              />
                              <MDTypography
                                verticalAlign="middle"
                                sx={{
                                  color: dto.Class === "Comprehensive Plan" ? "#ffffff" : "#000000",
                                  fontSize: "17px",
                                }}
                              >
                                Covers damage to your own vehicle driver and passengers Accidental
                                Risk
                              </MDTypography>
                            </MDBox>
                            <MDBox display="flex" flexDirection="row" alignItems="flex-start">
                              <CheckIcon
                                sx={{
                                  marginTop: "0.18rem",
                                  color: dto.Class === "Comprehensive Plan" ? "#ffffff" : "#000000",
                                }}
                              />
                              <MDTypography
                                verticalAlign="middle"
                                sx={{
                                  color: dto.Class === "Comprehensive Plan" ? "#ffffff" : "#000000",
                                  fontSize: "17px",
                                }}
                              >
                                Covers Damages to third Party Accidental Risk(Other People)
                              </MDTypography>
                            </MDBox>
                            <MDBox display="flex" flexDirection="row" alignItems="flex-start">
                              <CheckIcon
                                sx={{
                                  marginTop: "0.18rem",
                                  color: dto.Class === "Comprehensive Plan" ? "#ffffff" : "#000000",
                                }}
                              />
                              <MDTypography
                                verticalAlign="middle"
                                sx={{
                                  color: dto.Class === "Comprehensive Plan" ? "#ffffff" : "#000000",
                                  fontSize: "17px",
                                }}
                              >
                                Covers Damage to others property.
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Card
                    sx={{
                      ...cardStyle,
                      backgroundColor: lDto.Class === "Third Party Plan" ? "#2E3192" : "#DEEFFD",
                      // width: "41.37rem",
                      height: "15.2rem",
                    }}
                    onClick={() => onPlan("Third Party Plan")}
                  >
                    <MDBox sx={boxStyle}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <MDTypography
                            verticalAlign="middle"
                            variant="h5"
                            sx={{ color: dto.Class === "Third Party Plan" ? "#ffffff" : "#000000" }}
                          >
                            Third Party Plan
                          </MDTypography>
                        </Grid>

                        <Grid item>
                          <MDBox flexDirection="column" justifyContent="center">
                            <MDBox display="flex" flexDirection="row" alignItems="flex-start">
                              <CheckIcon
                                sx={{
                                  marginTop: "0.18rem",
                                  color: dto.Class === "Third Party Plan" ? "#ffffff" : "#000000",
                                }}
                              />
                              <MDTypography
                                verticalAlign="middle"
                                sx={{
                                  color: dto.Class === "Third Party Plan" ? "#ffffff" : "#000000",
                                  fontSize: "17px",
                                }}
                              >
                                Covers damage to own Vehicle driver & Passengers Accidental Risk
                              </MDTypography>
                            </MDBox>
                            <MDBox display="flex" flexDirection="row" alignItems="flex-start">
                              <CheckIcon
                                sx={{
                                  marginTop: "0.18rem",
                                  color: dto.Class === "Third Party Plan" ? "#ffffff" : "#000000",
                                }}
                              />
                              <MDTypography
                                verticalAlign="middle"
                                sx={{
                                  color: dto.Class === "Third Party Plan" ? "#ffffff" : "#000000",
                                  fontSize: "17px",
                                }}
                              >
                                Covers Damages to third Party Accidental Risk (Other People)
                              </MDTypography>
                            </MDBox>
                            <MDBox display="flex" flexDirection="row" alignItems="flex-start">
                              <CheckIcon
                                sx={{
                                  marginTop: "0.18rem",
                                  color: dto.Class === "Third Party Plan" ? "#ffffff" : "#000000",
                                }}
                              />
                              <MDTypography
                                verticalAlign="middle"
                                sx={{
                                  color: dto.Class === "Third Party Plan" ? "#ffffff" : "#000000",
                                  fontSize: "17px",
                                }}
                              >
                                Covers Damage to others property.
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={2} />

                {(dto.Class === "Comprehensive Plan" || dto.Class === "Third Party Plan") && (
                  <>
                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <MDTypography>
                        <b>Select Category</b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} />
                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Card
                        sx={{
                          ...cardStyle,
                          backgroundColor:
                            lDto.InsurableItem[0].RiskItems[0].Category === "Normal"
                              ? "#2E3192"
                              : "#DEEFFD",
                          width: "15.37rem",
                          height: "12.37rem",
                        }}
                        onClick={() => onCategory("Normal")}
                      >
                        {/* <RadioButtonUncheckedIcon /> */}
                        <MDAvatar
                          src={NormalTwoWheelerImg}
                          sx={{ ...imgStyle, width: "12rem", height: "8rem" }}
                        />
                        <MDBox sx={boxStyle}>
                          <MDTypography
                            verticalAlign="middle"
                            variant="h5"
                            sx={{
                              color:
                                dto.InsurableItem[0].RiskItems[0].Category === "Normal"
                                  ? "#ffffff"
                                  : "#000000",
                            }}
                          >
                            Normal Two Wheeler
                          </MDTypography>
                        </MDBox>
                      </Card>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Card
                        sx={{
                          ...cardStyle,
                          backgroundColor:
                            lDto.InsurableItem[0].RiskItems[0].Category === "Electric"
                              ? "#2E3192"
                              : "#DEEFFD",
                          width: "15.37rem",
                          height: "12.37rem",
                        }}
                        onClick={() => onCategory("Electric")}
                      >
                        <MDAvatar
                          src={ElectricTwoWheelerImg}
                          sx={{ ...imgStyle, width: "12rem", height: "8rem" }}
                        />
                        <MDBox sx={boxStyle}>
                          <MDTypography
                            verticalAlign="middle"
                            variant="h5"
                            sx={{
                              color:
                                dto.InsurableItem[0].RiskItems[0].Category === "Electric"
                                  ? "#ffffff"
                                  : "#000000",
                            }}
                          >
                            Electric Two Wheeler
                          </MDTypography>
                        </MDBox>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} />
                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <MDTypography>
                        <b>Select Cover Type</b>
                      </MDTypography>
                    </Grid>
                    {dto.Class === "Comprehensive Plan" && (
                      <>
                        <Grid item xs={12} sm={12} md={3.2} />

                        <Grid item xs={12} sm={12} md={2.8}>
                          <Card
                            sx={{
                              ...cardStyle,
                              backgroundColor:
                                dto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                "Comprehensive Include Pool Premium"
                                  ? "#2E3192"
                                  : "#DEEFFD",
                            }}
                            onClick={() => onCoverType("Comprehensive Include Pool Premium")}
                          >
                            <MDBox
                              sx={{
                                m: 1,
                                p: 1,
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <Stack direction="row" alignItems="center" spacing={3}>
                                <MDTypography
                                  verticalAlign="middle"
                                  variant="h5"
                                  sx={{
                                    color:
                                      dto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                      "Comprehensive Include Pool Premium"
                                        ? "#ffffff"
                                        : "#000000",
                                  }}
                                >
                                  Comprehensive Include Pool
                                </MDTypography>
                                <Tooltip
                                  title="Pool is inclusive of Riot Strike Damage, Malicious Damage, Sabotage Terrorism and Rider and Pillion PA"
                                  arrow
                                  placement="right"
                                  sx={{
                                    color:
                                      dto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                      "Comprehensive Include Pool Premium"
                                        ? "#ffffff"
                                        : "#000000",
                                  }}
                                >
                                  <HelpIcon />
                                </Tooltip>
                              </Stack>
                            </MDBox>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2.8}>
                          <Card
                            sx={{
                              ...cardStyle,
                              backgroundColor:
                                dto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                "Comprehensive Exclude Pool Premium"
                                  ? "#2E3192"
                                  : "#DEEFFD",
                              // height: "2.875rem",
                            }}
                            onClick={() => onCoverType("Comprehensive Exclude Pool Premium")}
                          >
                            <MDBox sx={boxStyle}>
                              <Stack direction="row" alignItems="center" spacing={3}>
                                <MDTypography
                                  variant="h5"
                                  sx={{
                                    color:
                                      dto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                      "Comprehensive Exclude Pool Premium"
                                        ? "#ffffff"
                                        : "#000000",
                                  }}
                                >
                                  Comprehensive Exclude Pool
                                </MDTypography>
                                <Tooltip
                                  title="Pool is not inclusive of Riot Strike Damage, Malicious Damage, Sabotage Terrorism and Rider and Pillion PA"
                                  arrow
                                  placement="right"
                                  sx={{
                                    color:
                                      dto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                      "Comprehensive Exclude Pool Premium"
                                        ? "#ffffff"
                                        : "#000000",
                                  }}
                                >
                                  <HelpIcon />
                                </Tooltip>
                              </Stack>
                            </MDBox>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3.2} />
                      </>
                    )}
                    {dto.Class === "Third Party Plan" && (
                      <>
                        <Grid item xs={12} sm={12} md={3} />

                        <Grid
                          container
                          item
                          xs={12}
                          sm={12}
                          md={3}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Card
                            sx={{
                              ...cardStyle,
                              backgroundColor:
                                lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                "Third Party Include Pool Premium"
                                  ? "#2E3192"
                                  : "#DEEFFD",
                              width: "18rem",
                            }}
                            onClick={() => onCoverType("Third Party Include Pool Premium")}
                          >
                            <MDBox sx={boxStyle}>
                              <Stack direction="row" alignItems="center" spacing={3}>
                                <MDTypography
                                  verticalAlign="middle"
                                  variant="h5"
                                  sx={{
                                    color:
                                      dto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                      "Third Party Include Pool Premium"
                                        ? "#ffffff"
                                        : "#000000",
                                  }}
                                >
                                  Third Party Include Pool
                                </MDTypography>
                                <Tooltip
                                  title="Pool is inclusive of Riot Strike Damage, Malicious Damage, Sabotage Terrorism and Rider and Pillion PA"
                                  arrow
                                  placement="right"
                                  sx={{
                                    color:
                                      dto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                      "Third Party Include Pool Premium"
                                        ? "#ffffff"
                                        : "#000000",
                                  }}
                                >
                                  <HelpIcon />
                                </Tooltip>
                              </Stack>
                            </MDBox>
                          </Card>
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          sm={12}
                          md={3}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Card
                            sx={{
                              ...cardStyle,
                              backgroundColor:
                                lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                "Third Party Exclude Pool Premium"
                                  ? "#2E3192"
                                  : "#DEEFFD",
                              width: "18rem",
                            }}
                            onClick={() => onCoverType("Third Party Exclude Pool Premium")}
                          >
                            <MDBox sx={boxStyle}>
                              <Stack direction="row" alignItems="center" spacing={3}>
                                <MDTypography
                                  verticalAlign="middle"
                                  variant="h5"
                                  sx={{
                                    color:
                                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                      "Third Party Exclude Pool Premium"
                                        ? "#ffffff"
                                        : "#000000",
                                  }}
                                >
                                  Third Party Exclude Pool
                                </MDTypography>
                                <Tooltip
                                  title="Pool is not inclusive of Riot Strike Damage, Malicious Damage, Sabotage Terrorism and Rider and Pillion PA"
                                  arrowbackgroundColor
                                  placement="right"
                                  sx={{
                                    color:
                                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                                      "Third Party Exclude Pool Premium"
                                        ? "#ffffff"
                                        : "#000000",
                                  }}
                                >
                                  <HelpIcon />
                                </Tooltip>
                              </Stack>
                            </MDBox>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} />
                      </>
                    )}
                  </>
                )}
              </Grid>
            ),
          },
          {
            type: "RadioGroup",
            visible: dto.Class === "Comprehensive Plan" || dto.Class === "Third Party Plan",
            radioLabel: {
              label: "Is the vehicle a government vehicle ?",
              labelVisible: true,
              fontSize: "1.2rem",
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: "InsurableItem.0.RiskItems.0.GovernmentVehicle",
            spacing: 12,
            required: true,
            justifyContent: "center",
          },
          {
            type: "Input",
            label: "CC/KW",
            visible:
              (dto.Class === "Comprehensive Plan" || dto.Class === "Third Party Plan") &&
              dto.InsurableItem[0].RiskItems[0].Category === "",
            path: "InsurableItem.0.RiskItems.0.CCKW",
            onChangeFuncs: [IsNumeric],
            disableOnReset: true,
            required: true,
          },
          {
            type: "Input",
            label: dto.InsurableItem[0].RiskItems[0].Category === "Electric" ? "KW" : "CC/KW",
            visible:
              (dto.Class === "Comprehensive Plan" || dto.Class === "Third Party Plan") &&
              dto.InsurableItem[0].RiskItems[0].Category === "Electric",
            path: "InsurableItem.0.RiskItems.0.CCKW",
            onChangeFuncs: [IsNumeric],
            disableOnReset: true,
            required: true,
          },
          {
            type: "Input",
            label: dto.InsurableItem[0].RiskItems[0].Category === "Normal" ? "CC" : "CC/KW",
            visible:
              (dto.Class === "Comprehensive Plan" || dto.Class === "Third Party Plan") &&
              dto.InsurableItem[0].RiskItems[0].Category === "Normal",
            path: "InsurableItem.0.RiskItems.0.CCKW",
            onChangeFuncs: [IsNumeric],
            disableOnReset: true,
            required: true,
          },
          {
            type: "Input",
            label: "Market Price",
            visible: lDto.Class === "Comprehensive Plan",
            path: "InsurableItem.0.RiskItems.0.VehicleCost",
            required: true,
            onChangeFuncs: [IsNumericGreaterThanZero],
            customOnChange: (e) => OnTotalSumInsured(e, "VehicleCost"),
          },
          {
            type: "AutoComplete",
            label: "Year of Vehicle Manufacturing",
            visible: lDto.Class === "Comprehensive Plan" || lDto.Class === "Third Party Plan",
            path: "InsurableItem.0.RiskItems.0.YearofVehicleManufacture",
            customOnChange: (e, a) => OnYOMselect(e, a),
            options:
              lDto.Class === "Comprehensive Plan"
                ? masters.YearofManufacture1
                : masters.YearofManufacture,
            required: true,
          },
          {
            type: "Input",
            label: "Age of Vehicle",
            visible: lDto.Class === "Comprehensive Plan" || lDto.Class === "Third Party Plan",
            path: "InsurableItem.0.RiskItems.0.AgeofVehicle",
            // required: true,
            disabled: true,
            disableOnReset: false,
          },
          {
            type: "Input",
            label: "Total Sum Insured",
            visible: lDto.Class === "Comprehensive Plan",
            path: "TotalSumInsured",
            disabled: true,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Voluntary Excess",
            visible: lDto.Class === "Comprehensive Plan",
            path: "InsurableItem.0.RiskItems.0.VolunatryExcess",
            options: masters.Excess,
          },
          {
            type: "Input",
            label: "Compulsory Excess",
            visible: lDto.Class === "Comprehensive Plan",
            path: "InsurableItem.0.RiskItems.0.CompulsoryExcess",
            // required: true,
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Direct Discount (%)",
            visible:
              lDto.Class === "Comprehensive Plan" &&
              lDto.InsurableItem[0].RiskItems[0].GovernmentVehicle !== "Yes",
            path: "InsurableItem.0.RiskItems.0.DirectDiscount",
            onChangeFuncs: [IsNumeric],
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Premium Type",
            visible: lDto.Class === "Third Party Plan" || lDto.Class === "Comprehensive Plan",
            path: "PremiumType",
            options: masters.PremiumType,
            required: true,
            disabled: dto.Class === "Third Party Plan",
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
            visible: lDto.Class === "Comprehensive Plan" || lDto.Class === "Third Party Plan",
            path: "NumberofDays",
            // onChangeFuncs: [onNumberOfDays],
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [onNumberOfDays],
            disabled:
              lDto.PremiumType === "" || lDto.PremiumType === "Normal" || lDto.Period === "",
            required: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: lDto.Class === "Comprehensive Plan" || lDto.Class === "Third Party Plan",
            path: "PolicyStartDate",
            minDate: `${
              new Date().getMonth() + 1
            }/${new Date().getDate()}/${new Date().getFullYear()}`,
            dateFormat: "m/d/Y",
            // altFormat: "m/d/Y",
            // disabled: false,
            // disableOnReset: true,
            required: true,
            customOnChange: (e, d) => OnPSDSelect(e, d),
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: lDto.Class === "Comprehensive Plan" || lDto.Class === "Third Party Plan",
            // minDate: DateFormatFromDateObject("m/d/Y"),
            path: "PolicyEndDate",
            dateFormat: "m/d/Y",
            // disableOnReset: true,
            disabled: true,
            // required: true,
            InputProps: { disabled: true },
          },
          {
            type: "MDDatePicker",
            label: "Previous Policy End Date",
            visible: policyType === "RollOver" && dto.Class === "Comprehensive Plan",
            path: "PreviousPolicyEndDate",
            minDate: `${
              new Date().getMonth() + 1
            }/${new Date().getDate()}/${new Date().getFullYear()}`,
            dateFormat: "m/d/Y",
            // altFormat: "m/d/Y",
            // disabled: false,
            // disableOnReset: true,
            required: true,
            // customOnChange: (e, d) => OnPSDSelect(e, d),
            customOnChange: (e, d) => PreviousPolicyEnd(e, d),
          },

          {
            type: "AutoComplete",
            label: "NCD Year",
            required: masters.PreviousPolicyEndDateFlag === false,
            path: "InsurableItem.0.RiskItems.0.NCDYear",
            visible: policyType === "RollOver" && dto.Class === "Comprehensive Plan",
            options: masters.NCDYear,
            disableOnReset: true,
            // disabled: masters.PreviousPolicyEndDateFlag,
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
            customOnChange: (e, a) => handleBank(e, a),
            required: true,
          },

          {
            type: "AutoComplete",
            label: "Bank/Financial Institution Name",
            required: true,
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinEnglish",
            options: masters.BankorFinancialInstituionNameinEnglish,
            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
          },
        ],
        [
          // {
          //   type: "Button",
          //   label: "ADD",
          //   visible: true,
          //   startIcon: <AddIcon />,
          //   variant: "outlined",
          //   component: "label",
          //   onClick: onAddBranchDetails,
          //   spacing: 12,
          //   justifyContent: "start",
          // },
          ...spreadBranchDetails(),
          // ...spreadBranchDetails().filter((x, i) => i !== 0),
        ],

        [
          {
            type: "AutoComplete",
            label: "KYC Category",
            visible: true,
            path: "ProposerDetails.KYCCategory",
            options: masters.KYCCategory,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Insured Type",
            visible: true,
            path: "ProposerDetails.InsuredType",
            options: masters.InsuredType,
            required: true,
            customOnChange: (e, v) => onInsuredType(e, v),
          },
          {
            type: "Button",
            label: "ADD",
            startIcon: <AddIcon />,
            visible: true,
            variant: "outlined",
            component: "label",
            spacing: 1,
          },

          {
            type: "Custom",
            visible: true,
            return: (
              <Tooltip
                title="Please add KYC details in case Multi KYC is applicable"
                placement="right"
                sx={{ marginTop: "0.6rem" }}
              >
                <InfoIcon />
              </Tooltip>
            ),
          },
        ],

        //  insured type === individual
        [
          {
            type: "Input",
            label: "Insured Name",
            visible: true,
            path: "ProposerDetails.InsuredNameEnglish",
            required: true,
            onChangeFuncs: [IsAlphaNumNoSpace],
            name: "InsuredNameEnglish",
            // customOnChange: (e) => OnInsuredNameEnglish(e, "InsuredNameEnglish"),
            //  customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            required: true,
            path: "ProposerDetails.Mobile Number",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible: true,
            path: "ProposerDetails.GenderEnglish",
            // options: masters.Gender,
            options: GenderNepali,
            required: true,
            name: "GenderEnglish",
            customOnChange: (e, a) => handleGender(e, a, "GenderEnglish"),
          },
          {
            type: "AutoComplete",
            label: "Marital status",
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
            label: "Father Name",
            visible: true,
            path: "ProposerDetails.FatherNameEnglish",
            // required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            name: "FatherNameEnglish1",
            //  customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Grandfather Name",
            visible: true,
            path: "ProposerDetails.GrandfatherNameEnglish",
            // required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            name: "GrandfatherNameEnglish1",
            //  customOnBlur: onBlurTransliteration,
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            visible: true,
            maxDate: new Date(),
            // maxDate: `${new Date().getDate()}/${
            //   new Date().getMonth() + 1
            // }/${new Date().getFullYear()}`,
            required: true,
            dateFormat: "d-m-Y",
            path: "ProposerDetails.DoB",
            // inputProps: { value: dto.ProposerDetails.DoB, label: "Date of Birth" },
            customOnChange: (e, d) => onDOBselect(e, d),
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
            label: "Landline Number",
            visible: true,
            path: "ProposerDetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Email Address",
            visible: true,
            path: "ProposerDetails.Email ID",
            onBlurFuncs: [IsEmail],
            // required: true,
          },
          {
            type: "Input",
            label: "Nationality",
            visible: true,
            path: "ProposerDetails.NationalityEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
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
            maxDate: `${
              new Date().getMonth() + 1
            }-${new Date().getDate()}-${new Date().getFullYear()}`,
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
            type: "Input",
            label: "License Number",
            visible: true,
            spacing: 3,
            path: "ProposerDetails.LicenseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Typography",
            label: "Permanent Address",
            visible: true,
            spacing: 10,
          },
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.Country",
            options: masters.Country,
            disableOnReset: true,
            disabled: true,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.ProvinceState",
            options: masters.State,
            required: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State2"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.District",
            options: masters.District2,
            required: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District2"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.Municipality",
            options: masters.Municipality2,
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
            label: "Address",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            name: "PermanentAdrressEnglish",
          },
          {
            type: "Input",
            label: "Address other than Permanent Address",
            visible: lDto.ProposerDetails.InsuredType !== "Individual",
            path: "ProposerDetails.PermanentAdrress.NonIndividualTypeFullAddress",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            spacing: 6,
          },
          {
            type: "RadioGroup",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            radioLabel: {
              label: "Is Temporary Address same as Permanent Address",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: "ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame",
            spacing: 12,
            required: true,
            justifyContent: "left",
            customOnChange: (e, a) => RdoTempandPermanatAdd(e, a),
          },
          {
            type: "AutoComplete",
            label: "Country",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            path: "ProposerDetails.CommunicationAddress.Country",
            options: masters.Country,
            disableOnReset: true,
            disabled: true,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            path: "ProposerDetails.CommunicationAddress.ProvinceState",
            options: masters.State,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            path: "ProposerDetails.CommunicationAddress.District",
            options: masters.District2,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            path: "ProposerDetails.CommunicationAddress.Municipality",
            options: masters.Municipality2,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            path: "ProposerDetails.CommunicationAddress.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            path: "ProposerDetails.CommunicationAddress.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            name: "PermanentAdrressEnglish",
          },
        ],

        //  insured type === other than individual
        [
          {
            type: "Input",
            label: "Name of the Organization",
            visible: true,
            path: "ProposerDetails.NameoftheOrganisation",
            required: true,
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Organization Phone Number",
            visible: true,
            required: true,
            path: "ProposerDetails.OrganizationContactNo",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address of Organization",
            visible: true,
            path: "ProposerDetails.OrganizationAddress",
            required: true,
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "ProposerDetails.PANNumber",
            required: lDto.ProposerDetails.InsuredType !== "Government body",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "VAT Number",
            visible: true,
            path: "ProposerDetails.VATNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },

          {
            type: "Input",
            label: "E-mail",
            visible: true,
            path: "ProposerDetails.Email ID",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Registration Number",
            visible: true,
            path: "ProposerDetails.RegistrationNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Registration Date",
            visible: true,
            maxDate: new Date(),
            dateFormat: "m-d-Y",
            path: "ProposerDetails.RegistrationDate",
          },
          {
            type: "MDDatePicker",
            label: "Registration Close Date",
            visible: true,
            maxDate: new Date(),
            dateFormat: "m-d-Y",
            path: "ProposerDetails.RegisterationCloseDate",
          },
          {
            type: "Input",
            label: "Registration Office",
            visible: true,
            path: "ProposerDetails.RegistrationOffice",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Typography",
            label: "Permanent Address",
            visible: true,
            spacing: 10,
          },
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.Country",
            options: masters.Country,
            disableOnReset: true,
            disabled: true,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.ProvinceState",
            options: masters.State,
            required: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State2"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.District",
            options: masters.District2,
            required: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District2"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.Municipality",
            options: masters.Municipality2,
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
            label: "Address",
            visible: true,
            path: "ProposerDetails.PermanentAdrress.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            name: "PermanentAdrressEnglish",
          },
          {
            type: "Input",
            label: "Address other than Permanent Address",
            visible: lDto.ProposerDetails.InsuredType !== "Individual",
            path: "ProposerDetails.PermanentAdrress.NonIndividualTypeFullAddress",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            spacing: 6,
          },
          {
            type: "RadioGroup",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            radioLabel: {
              label: "Is Temporary Address same as Permanent Address",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: "ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame",
            spacing: 12,
            required: true,
            justifyContent: "left",
            customOnChange: (e, a) => RdoTempandPermanatAdd(e, a),
          },
          {
            type: "AutoComplete",
            label: "Country",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            path: "ProposerDetails.CommunicationAddress.Country",
            options: masters.Country,
            disableOnReset: true,
            disabled: true,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            path: "ProposerDetails.CommunicationAddress.ProvinceState",
            options: masters.State,
            required: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "State2"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            path: "ProposerDetails.CommunicationAddress.District",
            options: masters.District2,
            required: true,
            //  customOnChange: (e, a) => OnPlaceSelect(e, a, "District2"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            path: "ProposerDetails.CommunicationAddress.Municipality",
            options: masters.Municipality2,
            required: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality2"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            path: "ProposerDetails.CommunicationAddress.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address",
            visible: lDto.ProposerDetails.InsuredType === "Individual",
            path: "ProposerDetails.CommunicationAddress.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            disabled: lDto.ProposerDetails.PermanentAdrress.IsPermanentCommunicationSame === "Yes",
            name: "PermanentAdrressEnglish",
            // customOnChange: (e) => OnInsuredNameEnglish(e, "AddressEnglish"),
            //  customOnBlur: onBlurTransliteration,
          },
        ],

        [
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.CareofNameEnglish",
            // required: true,
            disabled: false,
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.CareofAddressEnglish",
            // required: true,
            onChangeFuncs: [IsFreetextNoSpace],
            disabled: false,
          },
          {
            type: "Custom",
            visible: true,
            // spacing: 6,
            return: (
              <Tooltip
                title="If the vehicle is being used by individual but insured in the name of company"
                placement="right"
                sx={{ marginTop: "0.6rem" }}
              >
                <InfoIcon />
              </Tooltip>
            ),
          },
          { type: "Typography", label: "", visible: true, spacing: 12 },
        ],
        [
          {
            type: "AutoComplete",
            label: "Document List",
            visible: true,
            path: "ProposerDetails.DocumentList",
            options:
              lDto.ProposerDetails.InsuredType === "Individual" ? masters.InsuredFiletype : DocList,
            required: true,
            spacing: 3,
            // customOnChange: (e, v) => onDocumentList(e, v),
          },
          { type: "Custom", visible: true, spacing: 9 },
          {
            type: "Custom",
            visible:
              dto.ProposerDetails.DocumentList === "Citizen Ship" &&
              dto.ProposerDetails.InsuredType === "Individual",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Citizenship Front Copy</MDTypography>
                    <MDBox
                      onClick={SampleCitizenFrontModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={CitizenshipFrontPage} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>

                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "ProposerDetails", 0)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.ProposerDetails.IndividualdocumentDetails[0].DocumentFileName !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MDTypography fontSize="1rem">
                        {dto.ProposerDetails.IndividualdocumentDetails[0].DocumentFileName}
                      </MDTypography>
                      <IconButton>
                        <CancelIcon
                          color="primary"
                          onClick={() => onDocCancelClick("ProposerDetails", 0)}
                        />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ),
          },

          {
            type: "Custom",
            visible:
              dto.ProposerDetails.DocumentList === "Citizen Ship" &&
              dto.ProposerDetails.InsuredType === "Individual",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Citizenship Back Copy</MDTypography>
                    <MDBox
                      onClick={SampleCitizenBackModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={CitizenshipBackPage} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>
                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "ProposerDetails", 1)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.ProposerDetails.IndividualdocumentDetails[1].DocumentFileName !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MDTypography fontSize="1rem">
                        {dto.ProposerDetails.IndividualdocumentDetails[1].DocumentFileName}
                      </MDTypography>
                      <IconButton>
                        <CancelIcon
                          color="primary"
                          onClick={() => onDocCancelClick("ProposerDetails", 1)}
                        />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ),
          },

          {
            type: "Custom",
            visible:
              dto.ProposerDetails.DocumentList === "License" &&
              dto.ProposerDetails.InsuredType === "Individual",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Upload your License</MDTypography>
                    <MDBox
                      onClick={SampleLicenseModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={LicenseImg} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>

                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "ProposerDetails", 2)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.ProposerDetails.IndividualdocumentDetails[2].DocumentFileName !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MDTypography fontSize="1rem">
                        {dto.ProposerDetails.IndividualdocumentDetails[2].DocumentFileName}
                      </MDTypography>
                      <IconButton>
                        <CancelIcon
                          color="primary"
                          onClick={() => onDocCancelClick("ProposerDetails", 2)}
                        />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Custom",
            visible:
              lDto.ProposerDetails.DocumentList === "Passport" &&
              lDto.ProposerDetails.InsuredType === "Individual",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Upload Your Passport Front Copy</MDTypography>
                    <MDBox
                      onClick={SamplePassPortFrontModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={PassportFrontImg} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>
                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "ProposerDetails", 3)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.ProposerDetails.IndividualdocumentDetails[3].DocumentFileName !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MDTypography fontSize="1rem">
                        {dto.ProposerDetails.IndividualdocumentDetails[3].DocumentFileName}
                      </MDTypography>
                      <IconButton>
                        <CancelIcon
                          color="primary"
                          onClick={() => onDocCancelClick("ProposerDetails", 3)}
                        />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Custom",
            visible:
              lDto.ProposerDetails.DocumentList === "Passport" &&
              lDto.ProposerDetails.InsuredType === "Individual",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Upload Your Passport Back Copy</MDTypography>
                    <MDBox
                      onClick={SamplePassPortBackModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={PassportBackImg} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>

                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "ProposerDetails", 4)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.ProposerDetails.IndividualdocumentDetails[4].DocumentFileName !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MDTypography fontSize="1rem">
                        {dto.ProposerDetails.IndividualdocumentDetails[4].DocumentFileName}
                      </MDTypography>
                      <IconButton>
                        <CancelIcon
                          color="primary"
                          onClick={() => onDocCancelClick("ProposerDetails", 4)}
                        />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Custom",
            visible:
              dto.ProposerDetails.DocumentList === "PAN" &&
              dto.ProposerDetails.InsuredType !== "Individual",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>PAN</MDTypography>
                    <MDBox
                      onClick={SamplePanModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={PanImg} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>
                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "ProposerDetails", 5)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.ProposerDetails.IndividualdocumentDetails[5].DocumentFileName !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MDTypography fontSize="1rem">
                        {dto.ProposerDetails.IndividualdocumentDetails[5].DocumentFileName}
                      </MDTypography>
                      <IconButton>
                        <CancelIcon
                          color="primary"
                          onClick={() => onDocCancelClick("ProposerDetails", 5)}
                        />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Custom",
            visible:
              dto.ProposerDetails.DocumentList === "Registration copy" &&
              dto.ProposerDetails.InsuredType !== "Individual",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Registration copy</MDTypography>
                    <MDBox
                      onClick={SampleRegistrationModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={RegisterationImg} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>
                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "ProposerDetails", 6)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.ProposerDetails.IndividualdocumentDetails[6].DocumentFileName !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MDTypography fontSize="1rem">
                        {dto.ProposerDetails.IndividualdocumentDetails[6].DocumentFileName}
                      </MDTypography>
                      <IconButton>
                        <CancelIcon
                          color="primary"
                          onClick={() => onDocCancelClick("ProposerDetails", 6)}
                        />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: SamplePanOpen,
            spacing: 1,
            sx: { width: "40%", left: "45%", right: "40%", top: "20%", bottom: "8%" },
            open: SamplePanOpen,
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Grid align="end">
                    <MDTypography>
                      <ClearIcon onClick={SamplePanClose} />
                    </MDTypography>
                  </Grid>
                  <MDAvatar
                    src={PanImg}
                    sx={{
                      height: "auto",
                      width: "100%",
                      borderRadius: "0",
                      maxWidth: "60%",
                      margin: "0 auto",
                    }}
                  />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: true,
            spacing: 1,
            sx: { width: "40%", left: "45%", right: "40%", top: "20%", bottom: "8%" },
            open: SampleRegistrationModalOpen,
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={SampleRegistrationModalClose} />
                  </MDTypography>

                  <MDAvatar
                    src={RegisterationImg}
                    sx={{
                      height: "auto",
                      width: "100%",
                      borderRadius: "0",
                      maxWidth: "60%",
                      margin: "0 auto",
                    }}
                  />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: SampleCitizenFrontModalOpen,
            spacing: 12,
            sx: { width: "40%", left: "45%", right: "40%", top: "13%", bottom: "13%" },
            open: SampleCitizenFrontModalOpen,
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={SampleCitizenFrontModalClose} />
                  </MDTypography>

                  <MDBox component="img" src={CitizenshipFrontPage} width="100%" height="100%" />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: SampleCitizenBackModalOpen,
            spacing: 12,
            sx: { width: "40%", left: "45%", right: "40%", top: "13%", bottom: "13%" },
            open: SampleCitizenBackModalOpen, //  <Modal open={Term  Cond  ModalOpen} onClose={Term  Cond  ModalClose}>
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Grid align="end">
                    <MDTypography>
                      <ClearIcon onClick={SampleCitizenBackModalClose} />
                    </MDTypography>
                  </Grid>
                  <MDBox component="img" src={CitizenshipBackPage} width="100%" height="100%" />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: SampleLicenseModalOpen,
            spacing: 12,
            sx: { width: "40%", left: "45%", right: "40%", top: "13%", bottom: "13%" },
            open: SampleLicenseModalOpen, //  <Modal open={Term  Cond  ModalOpen} onClose={Term  Cond  ModalClose}>
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Grid align="end">
                    <MDTypography>
                      <ClearIcon onClick={SampleLicenseModalClose} />
                    </MDTypography>
                  </Grid>
                  <MDBox component="img" src={LicenseImg} width="100%" height="100%" />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: SamplePassPortFrontModalOpen,
            spacing: 12,
            sx: { width: "40%", left: "45%", right: "40%", top: "13%", bottom: "13%" },
            open: SamplePassPortFrontModalOpen, //  <Modal open={Term  Cond  ModalOpen} onClose={Term  Cond  ModalClose}>
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Grid align="end">
                    <MDTypography>
                      <ClearIcon onClick={SamplePassPortFrontModalClose} />
                    </MDTypography>
                  </Grid>
                  <MDBox component="img" src={PassportFrontImg} width="100%" height="100%" />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: SamplePassPortBackModalOpen,
            spacing: 12,
            sx: { width: "40%", left: "45%", right: "40%", top: "13%", bottom: "13%" },
            open: SamplePassPortBackModalOpen, //  <Modal open={Term  Cond  ModalOpen} onClose={Term  Cond  ModalClose}>
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Grid align="end">
                    <MDTypography>
                      <ClearIcon onClick={SamplePassPortBackModalClose} />
                    </MDTypography>
                  </Grid>
                  <MDBox component="img" src={PassportBackImg} width="100%" height="90%" />
                </Grid>
              </Grid>
            ),
          },
        ],
        // [
        //   // {
        //   //   type: "AutoComplete",
        //   //   visible: true,
        //   //   name: "DocName",
        //   //   label: "Document Name",
        //   //   path: `ProposerDetails.DocumentList`,
        //   //   options: DocList,
        //   // },
        //   { type: "Typography", label: "", visible: true, spacing: 12 },
        // ],
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <Stack direction="row" spacing={2}>
                <MDCheckbox
                  required
                  checked={dto.InsdetailsSumaryChk}
                  onChange={(e) => onPremiumDeclaration(e, "InsdetailsSumaryChk")}
                  // sx={{
                  //   color: "#000000",
                  //   "&.Mui-checked": {
                  //     // color: "#c70825",
                  //     // color: "#000000",
                  //   },
                  // }}
                />
                <MDTypography sx={{ fontSize: "1rem", mt: "1.875rem" }}>
                  I/We hereby confirm that the information provided herein is accurate, correct and
                  complete and that the documents submitted along with are Genuine. I/We further
                  agree to provide and/or update the above-referenced documents as and when
                  required.
                </MDTypography>
              </Stack>
            ),
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Name of the Vehicle",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Nameofthevehicle",
            required: true,
            options: masters.NameoftheVehicle,
            // disableOnReset:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "CustomerDetails,VehicleDetails,RiskDetails",
            customOnChange: (e, a) => onVehicalSelect(e, a, "Nameofthevehicle"),
          },
          {
            type: "AutoComplete",
            label: "Make of the Vehicle",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Make",
            options:
              dto.InsurableItem[0].RiskItems[0].Nameofthevehicle !== undefined &&
              dto.InsurableItem[0].RiskItems[0].Nameofthevehicle !== ""
                ? masters.Make
                : [],
            customOnChange: (e, a) => onVehicalSelect(e, a, "makeofthevehicle"),
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "CustomerDetails,VehicleDetails,RiskDetails",
          },
          {
            type: "AutoComplete",
            label: "Model of the Vehicle",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Model",
            options:
              dto.InsurableItem[0].RiskItems[0].Make !== undefined &&
              dto.InsurableItem[0].RiskItems[0].Make !== ""
                ? masters.Model
                : [],
            required: true,
          },
          {
            type: "Input",
            label: "Mode of Use",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Modelofuse",
            onChangeFuncs: [IsFreetextNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Seats",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Seats",
            // required: true,
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Registration Date",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.RegistrationDate",
          },
          // {
          //   type: "Input",
          //   label: "License Number",
          //   visible: true,
          //   spacing: 3,
          //   path: "ProposerDetails.LicenseNumber",
          //   onChangeFuncs: [IsFreetextNoSpace],
          // },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Is Your Vehicle Number Confirmed", labelVisible: true },
            radioList: [
              { value: "No", label: "Yes" },
              { value: "Yes", label: "No" },
            ],
            path: "InsurableItem.0.RiskItems.0.DirectFromShowRoom",
            spacing: 6,
            // required: true,
          },
          {
            type: "Input",
            label: "Vehicle Number",
            visible: lDto.InsurableItem[0].RiskItems[0].DirectFromShowRoom === "Yes",
            path: "InsurableItem.0.RiskItems.0.VehicleNoEnglish",
            required: lDto.InsurableItem[0].RiskItems[0].DirectFromShowRoom === "Yes",
            name: "VehicleNoEnglish",
            //  customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
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

          { type: "Typography", visible: true, label: " PA Details", spacing: 12 },
          {
            type: "Input",
            label: "PA to Driver SI",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.PAtoDriver",
            // required: true,
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "PA to Passenger SI",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.PAPassengerSI",
            // required: true,
            onChangeFuncs: [IsNumericGreaterThanZero],
            disabled: true,
            disableOnReset: true,
          },
          { type: "Typography", visible: true, label: "", spacing: 12 },
          {
            type: "MDDatePicker",
            label: "Delivery Date",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.DeliveryDate",
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Document List",
            visible: true,
            path: "InsurableItem.DocumentList",
            options: masters.VehicleFiletype,
            required: dto.DocType === "RollOver",
          },
          // {
          //   type: "AutoComplete",
          //   label: "Document List",
          //   visible: masters.loginType,
          //   path: "InsurableItem.DocumentList",
          //   options: masters.VehicleFiletype,
          //   required: false,
          // },
          { type: "Typography", label: "", visible: true, spacing: 9 },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },

          { type: "Custom", visible: true, spacing: 12 },
          {
            type: "Custom",
            visible:
              dto.InsurableItem.DocumentList === "Bill Book" ||
              dto.InsurableItem.DocumentList === "Purchase Bill/Invoice",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Registration Copy</MDTypography>
                    <MDBox
                      onClick={SampleRegistrationModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={RegisterationImg} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>
                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "Insuredetails", 0)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.InsurableItem[0].documentDetails[0].DocumentFileName !== "" &&
                    dto.InsurableItem.DocumentList !== "" && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MDTypography fontSize="1rem">
                          {dto.InsurableItem[0].documentDetails[0].DocumentFileName}
                        </MDTypography>

                        <IconButton>
                          <CancelIcon
                            color="primary"
                            onClick={() => onDocCancelClick("Insuredetails", 0)}
                          />
                        </IconButton>
                      </Stack>
                    )}
                </Grid>
              </Grid>
            ),
          },

          {
            type: "Custom",
            visible:
              dto.InsurableItem.DocumentList === "Bill Book" ||
              dto.InsurableItem.DocumentList === "Purchase Bill/Invoice",
            spacing: 12,
          },

          {
            type: "Custom",
            visible: dto.InsurableItem.DocumentList === "Bill Book",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Vehicle Owner Name Copy</MDTypography>
                    <MDBox
                      onClick={SamplePassPortFrontModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={PassportFrontImg} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>
                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "Insuredetails", 1)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.InsurableItem[0].documentDetails[1].DocumentFileName !== "" &&
                    dto.InsurableItem.DocumentList !== "" && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MDTypography fontSize="1rem">
                          {dto.InsurableItem[0].documentDetails[1].DocumentFileName}
                        </MDTypography>
                        <IconButton>
                          <CancelIcon
                            color="primary"
                            onClick={() => onDocCancelClick("Insuredetails", 1)}
                          />
                        </IconButton>
                      </Stack>
                    )}
                </Grid>
              </Grid>
            ),
          },
          { type: "Custom", visible: dto.InsurableItem.DocumentList === "Bill Book", spacing: 12 },

          {
            type: "Custom",
            visible: dto.InsurableItem.DocumentList === "Bill Book",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Engine Chasis Copy</MDTypography>
                    <MDBox
                      onClick={SampleChasisModal}
                      p={0.5}
                      sx={{
                        backgroundColor: "#eeeeee",
                        flexDirection: "column",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <MDAvatar src={EngineChasisImg} variant="square" />
                      <MDTypography
                        sx={{
                          fontSize: "0.8rem",
                        }}
                      >
                        sample copy
                      </MDTypography>
                    </MDBox>
                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "Insuredetails", 2)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.InsurableItem[0].documentDetails[2].DocumentFileName !== "" &&
                    dto.InsurableItem.DocumentList !== "" && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MDTypography fontSize="1rem">
                          {dto.InsurableItem[0].documentDetails[2].DocumentFileName}
                        </MDTypography>
                        <IconButton>
                          <CancelIcon
                            color="primary"
                            onClick={() => onDocCancelClick("Insuredetails", 2)}
                          />
                        </IconButton>
                      </Stack>
                    )}
                </Grid>
              </Grid>
            ),
          },
          { type: "Custom", visible: dto.InsurableItem.DocumentList === "Bill Book", spacing: 12 },

          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Vehicle Photo Copy</MDTypography>
                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "Insuredetails", 3)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.InsurableItem[0].documentDetails[3].DocumentFileName !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MDTypography fontSize="1rem">
                        {dto.InsurableItem[0].documentDetails[3].DocumentFileName}
                      </MDTypography>
                      <IconButton>
                        <CancelIcon
                          color="primary"
                          onClick={() => onDocCancelClick("Insuredetails", 3)}
                        />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ),
          },

          { type: "Custom", visible: true, spacing: 12 },

          {
            type: "Custom",
            visible: policyType === "RollOver",
            spacing: 12,
            return: (
              <Grid container alignItems="center" spacing={10}>
                <Grid item sx={6}>
                  <Stack direction="row" spacing={5} alignItems="center">
                    <MDTypography>Renewal Notice</MDTypography>
                    <MDButton variant="outlined" component="label">
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleFileUpload(e, "Insuredetails", 4)}
                      />
                    </MDButton>
                  </Stack>
                </Grid>
                <Grid item sx={6}>
                  {dto.InsurableItem[0].documentDetails[4].DocumentFileName !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MDTypography fontSize="1rem">
                        {dto.InsurableItem[0].documentDetails[4].DocumentFileName}
                      </MDTypography>
                      <IconButton>
                        <CancelIcon
                          color="primary"
                          onClick={() => onDocCancelClick("Insuredetails", 4)}
                        />
                      </IconButton>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: true,
            spacing: 1,
            sx: { width: "40%", left: "45%", right: "40%", top: "20%", bottom: "8%" },
            open: SampleRegistrationModalOpen,
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={SampleRegistrationModalClose} />
                  </MDTypography>
                  <MDAvatar
                    src={RegisterationImg}
                    sx={{
                      height: "auto",
                      width: "100%",
                      borderRadius: "0",
                      maxWidth: "60%",
                      margin: "0 auto",
                    }}
                  />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: true,
            spacing: 12,
            sx: { width: "40%", left: "45%", right: "40%", top: "13%", bottom: "13%" },
            open: SampleChasisModalOpen,
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Grid align="end">
                    <MDTypography>
                      <ClearIcon onClick={SampleChasisModalClose} />
                    </MDTypography>
                  </Grid>
                  <MDBox component="img" src={EngineChasisImg} width="100%" height="100%" />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: true,
            spacing: 12,
            sx: { width: "40%", left: "45%", right: "40%", top: "13%", bottom: "13%" },
            open: SamplePassPortFrontModalOpen,
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Grid align="end">
                    <MDTypography>
                      <ClearIcon onClick={SamplePassPortFrontModalClose} />
                    </MDTypography>
                  </Grid>
                  <MDBox component="img" src={PassportFrontImg} width="100%" height="100%" />
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: true,
            spacing: 1,
            sx: { width: "40%", left: "45%", right: "40%", top: "20%", bottom: "8%" },
            open: SampleRegistrationModalOpen,
            return: (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={SampleRegistrationModalClose} />
                  </MDTypography>

                  <MDAvatar
                    src={RegisterationImg}
                    sx={{
                      height: "auto",
                      width: "100%",
                      borderRadius: "0",
                      maxWidth: "60%",
                      margin: "0 auto",
                    }}
                  />
                </Grid>
              </Grid>
            ),
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 6,
            return: (
              <MDBox
                component="img"
                src={PremiumSummaryImg}
                width="100%"
                height="100%"
                marginTop="3rem"
              />
            ),
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
                    <Grid item xs={12}>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        <Tooltip title="">
                          <InfoIcon onClick={PremSumModal} />
                        </Tooltip>
                      </Typography>
                      {/* <Stack direction="row" justifyContent="space-between">                        
                        <Typography sx={{ display: "flex", justifyContent: "right" }}>
                          <Tooltip title="">
                            <InfoIcon onClick={PremSumModal} />
                          </Tooltip>
                        </Typography>
                      </Stack> */}
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>Gross Premium</Typography>
                        <Typography
                          sx={{ display: "flex", justifyContent: "right", fontWeight: "bold" }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.NetPremium}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>Stamp Duty</Typography>
                        <Typography
                          sx={{ display: "flex", justifyContent: "right", fontWeight: "bold" }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.StampDuty}
                        </Typography>
                      </Stack>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>VAT(13%)</Typography>
                        <Typography
                          sx={{ display: "flex", justifyContent: "right", fontWeight: "bold" }}
                        >
                          रु &nbsp;{dto.FormatedData.CalculatedPremiumDetails.VAT}
                        </Typography>
                      </Stack>
                      <Divider sx={{ height: "1px" }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontWeight: "bold" }}>Total Amount</Typography>
                        <Typography
                          sx={{ display: "flex", justifyContent: "right", fontWeight: "bold" }}
                        >
                          रु &nbsp;{dto.FormatedData.CalculatedPremiumDetails.FinalPremium}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={2}>
                        <MDCheckbox
                          required
                          checked={dto.PremiumSumChk1}
                          onChange={(e) => onPremiumDeclaration(e, "PremiumSumChk1")}
                        />
                        <MDTypography sx={{ fontSize: "1rem", mt: "1.875rem" }}>
                          I/We agree to abide by “utmost good faith” applicable in insurance and the
                          outcome at the time of claims in case of any misrepresentation of the
                          information as provided.
                        </MDTypography>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <Stack direction="row" spacing={2}>
                        <MDCheckbox
                          required
                          checked={dto.PremiumSumChk2}
                          onChange={(e) => onPremiumDeclaration(e, "PremiumSumChk2")}
                        />
                        <MDTypography sx={{ fontSize: "1rem", mt: "1.875rem" }}>
                          I/We accept that I/We have read and understood the policy &nbsp;
                          <span
                            style={{
                              color: "#0071D9",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                            onKeyDown={handleTermCond}
                            onClick={handleTermCond}
                            role="button"
                            tabIndex="0"
                          >
                            terms & conditions
                          </span>{" "}
                          and will abide by the same.
                          <br />
                          <br />
                        </MDTypography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
                        <MDButton variant="outlined" onClick={onDebitNoteClick}>
                          Preview Debit Note
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            ),
          },

          {
            type: "Modal",
            visible: true,
            spacing: 12,
            sx: { width: "80%", left: "15%", right: "20%", top: "10%", bottom: "10%" },
            open: TermCondModalOpen, //  <Modal open={Term Cond ModalOpen} onClose={Term Cond ModalClose}>
            return: (
              <Grid container spacing={12}>
                {/* <Grid item>
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={Term Cond  ModalClose} />
                  </MDBox>
                </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={TermCondModalClose} />
                  </MDTypography>
                  <MDBox sx={{ display: "flex", justifyContent: "left" }}>
                    {/* ml: "25rem", mt: "-1.6rem", */}
                    <MDTypography
                      sx={{
                        fontWeight: 500,
                        textAlign: "left",
                        fontSize: "14px",
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        {" "}
                        <b>Terms and Conditions:</b>
                      </p>
                      <br />
                      The following terms and conditions outline below I agree under policy I’m
                      purchasing. <br /> <br />
                      <b>Coverage:</b> We provide coverage for the risks outlined in your policy.The
                      scope of coverage, exclusions, and deductibles are outlined in your policy
                      documents. Please review your policy carefully to understand the terms and
                      conditions of your coverage. <br />
                      <br />
                      <b>1.&nbsp;Premium:</b> You are required to pay the premium on time to keep
                      your policy in force. Failure to pay the premium may result in a lapse of
                      coverage, and we may cancel your policy if payment is not made within the
                      grace period specified in your policy. <br />
                      <b>2.&nbsp;Policy Term:</b> Your policy term is specified in your policy
                      documents. We may renew/endorse your policy upon your request, subject to our
                      underwriting guidelines and the applicable premium rate at the time of
                      renewal/endorsement. <br />
                      <b>3.&nbsp;Claim:</b> You are required to notify us promptly of any loss or
                      damage that may give rise to a claim under your policy. You must provide all
                      necessary information and documentation to support your claim. We reserve the
                      right to investigate any claim and mayrequest additional information or
                      documentation as needed. <br />
                      <b>4.&nbsp;Subrogation:</b> In the event that we pay a claim under your
                      policy, we have the right to subrogate against any third party responsible for
                      the loss or damage to the extent of our payment. <br />
                      <b>5.&nbsp;Fraud:</b> Any fraudulent or intentionally misleading statement or
                      omission in your policy application or claim may result in the denial of
                      coverage and/or cancellation of your policy. <br />
                      <b>6.&nbsp;Termination:</b> We may cancel your policy for non-payment of
                      premium, misrepresentation, fraud, or other reasons specified in your policy.
                      You may also cancel your policy at any time by providing written notice to us.{" "}
                      <br />
                      <b>7.&nbsp;Governing Law:</b> Your policy is governed by the laws of the
                      jurisdiction where your policy is issued.
                      <br />
                      <b>8.&nbsp;Entire Agreement:</b> Your policy and any endorsements or
                      amendments constitute the entire agreement between you and us. <br />
                      <b>9.&nbsp;Modifications:</b> We may modify the terms and conditions of your
                      policy upon notice to you. Any modifications will be effective as of the date
                      specified in the notice.
                    </MDTypography>
                  </MDBox>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton onClick={TermCondModalClose}>Close</MDButton>
                  </MDBox>
                </Grid> */}
              </Grid>
            ),
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              // <Modal
              //   sx={{ width: "40%", left: "45%", right: "20%", top: "3%", bottom: "3%" }}
              //   open={PremSumModalOpen}
              //   // style={{ overflow: "scroll" }}
              // >
              <Drawer
                variant="persistent"
                anchor="right"
                open={PremSumModalOpen}
                sx={{
                  "& .MuiDrawer-paper": {
                    margin: "0rem",
                    width: "40vw",
                    height: "100vh",
                    overflowX: "hidden",
                    overflowY: "auto",
                  },
                }}
              >
                {/* // <Slide direction="left" ouy in={PremSumModalOpen}> */}
                <MDBox sx={{ bgcolor: "#ffffff" }} p={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                        <ClearIcon onClick={PremSumModalClose} />
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
                        <u>
                          <b>Premium Summary</b>
                        </u>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>Basic Premium</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.BasePremium}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>Old Vehicle Loading</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.AgeofVehicleLoading}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>Voluntary Excess</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.ExcessDiscount}
                        </Typography>
                      </Stack>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>No Claim Discount</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>Eco Friendly Discount</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.EnvironmentDiscount}
                        </Typography>
                      </Stack>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>Direct Discount</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.DirectDiscountAmount}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>Third Party Insurance</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.TotalTPPremium}
                        </Typography>
                      </Stack>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>No Claim Discount (TP)</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>
                          Riot and Strike Damage (RSD/MD)
                        </Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु &nbsp;{dto.FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF}
                        </Typography>
                      </Stack>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>Terrorism</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु &nbsp;{dto.FormatedData.CalculatedPremiumDetails.STPremiumPDF}
                        </Typography>
                      </Stack>
                    </Grid>{" "}
                    {/* <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between"></Stack>
                  <Divider sx={{ height: "1px" }} />
                </Grid> */}
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>Gross Premium</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.NetPremium}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>Stamp Duty</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु &nbsp;{dto.FormatedData.CalculatedPremiumDetails.StampDuty}
                        </Typography>
                      </Stack>
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px" }}>VAT(13%)</Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp;{dto.FormatedData.CalculatedPremiumDetails.VAT}
                        </Typography>
                      </Stack>
                      <Divider sx={{ height: "1px" }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                          Total Amount
                        </Typography>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          रु&nbsp; {dto.FormatedData.CalculatedPremiumDetails.FinalPremium}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </MDBox>
              </Drawer>
            ),
          },
        ],
      ];
      break;
    case 4:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <PaymentPage
                prod="Nepal"
                PolicyDto={lDto}
                PaymentMode={[{ label: "Online", value: "Online" }]}
                OfflinePT={{
                  amount: objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.FinalPremium"),
                  // data: [
                  //   {
                  //     label: "Cash",
                  //     value: "Cash",
                  //   },
                  //   {
                  //     label: "Cheque",
                  //     value: "Cheque",
                  //   },
                  // ],
                }}
                OnlinePT={[
                  { label: "Nepal Clearing House", value: "NepalClearingHouse" },
                  // { label: "e-Seva", value: "e-Seva" },
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
const getOnNextClick = async ({
  activeStep,
  dto,
  setDto,
  setBackDropFlag,
  masters,
  setMasters,
}) => {
  let fun = false;
  const lDto = dto;
  const lMasters = masters;
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (lDto !== null) {
    switch (activeStep) {
      case 0:
        if (dto.Class === "") {
          swal({ icon: "error", text: "Please select plan" });
          fun = false;
        } else if (dto.InsurableItem[0].RiskItems[0].Category === "") {
          swal({ icon: "error", text: "Please select category" });
          fun = false;
        } else if (dto.InsurableItem[0].RiskItems[0].TypeofCover === "") {
          swal({ icon: "error", text: "Please select type of cover" });
          fun = false;
        } else {
          fun = await GenericApi("NepalMotorTwoWheeler", "NepalMotorCycleRatingApi", lDto).then(
            async (x) => {
              if (x.finalResult) {
                lDto.PremiumDetails = x.finalResult;
                lDto.FormatedData.CalculatedPremiumDetails.VAT = formater.format(x.finalResult.VAT);
                lDto.FormatedData.CalculatedPremiumDetails.StampDuty = formater.format(
                  x.finalResult.StampDuty
                );
                lDto.FormatedData.CalculatedPremiumDetails.NetPremium = formater.format(
                  x.finalResult.NetPremium
                );
                lDto.FormatedData.CalculatedPremiumDetails.BasePremium = formater.format(
                  x.finalResult.BasePremium
                );
                lDto.FormatedData.CalculatedPremiumDetails.FinalPremium = formater.format(
                  x.finalResult.FinalPremium
                );
                lDto.FormatedData.CalculatedPremiumDetails.EnvironmentDiscount = formater.format(
                  x.finalResult.EnvironmentDiscount
                );
                lDto.FormatedData.CalculatedPremiumDetails.ExcessDiscount = formater.format(
                  x.finalResult.ExcessDiscount
                );
                lDto.FormatedData.CalculatedPremiumDetails.AgeofVehicleLoading = formater.format(
                  x.finalResult.AgeofVehicleLoading
                );
                lDto.FormatedData.CalculatedPremiumDetails.ReceiptPremiumPDF = formater.format(
                  x.finalResult.ReceiptPremiumPDF
                );
                lDto.FormatedData.CalculatedPremiumDetails.TotalTPPremium = formater.format(
                  x.finalResult.TotalTPPremium
                );
                lDto.FormatedData.CalculatedPremiumDetails.DirectDiscountAmount = formater.format(
                  x.finalResult.DirectDiscountAmount
                );
                lDto.FormatedData.CalculatedPremiumDetails.STPremiumPDF = formater.format(
                  x.finalResult.STPremiumPDF
                );
                lDto.FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase = formater.format(
                  x.finalResult.NoClaimDiscountBase
                );
                lDto.FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF = formater.format(
                  x.finalResult.RSDMDPremiumPDF
                );

                lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
                lDto.FinalPremium = x.finalResult.FinalPremium;
                const res1 = await SaveQuotation(lDto);
                lDto["Quotation No"] = res1.data.quotation.quoteNo;
                setDto({ ...lDto });
                setBackDropFlag(false);
                const fun1 = await swal2
                  .fire({
                    title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                    html: `<div style="display: flex; flex-direction: row;">
                    <div style="flex: 10; text-align: left; margin-left: 2rem" ">
                    ${
                      lDto.Class === "Comprehensive Plan"
                        ? "<div>Basic Premium</div>"
                        : "<div>Basic Premium Third Party</div>"
                    } 
                    ${
                      lDto.Class === "Comprehensive Plan"
                        ? "<div>Less: Corporate Discount</div>"
                        : ""
                    } 
                    ${
                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel !==
                      "Third Party Exclude Pool Premium"
                        ? "<div>Gross Premium</div>"
                        : ""
                    } 
                    ${
                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                        "Comprehensive Include Pool Premium" ||
                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                        "Third Party Include Pool Premium"
                        ? "<div>RSD/MD/ST</div>"
                        : ""
                    }
                      <div>Stamp Duty</div>
                      ${
                        lDto.Class === "Comprehensive Plan"
                          ? "<div> Premium Before VAT </div>"
                          : "<div> Premium Before VAT or Sub Total </div>"
                      }                     
                      <div>VAT 13%</div>
                      <div><b>Total Premium to be Paid by Customer</b></div>
                    </div>
                    <div style="flex: 1; text-align: right;font-size:16.3px; margin-right: 1rem" ">
                    <div>रु</div>
                    ${lDto.Class === "Comprehensive Plan" ? "<div>रु</div>" : ""} 
                    ${
                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel !==
                      "Third Party Exclude Pool Premium"
                        ? "<div>रु</div>"
                        : ""
                    } 
                    ${
                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                        "Comprehensive Include Pool Premium" ||
                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                        "Third Party Include Pool Premium"
                        ? "<div>रु</div>"
                        : ""
                    }
                    <div>रु</div>
                    <div>रु</div>                                 
                    <div>रु</div>
                    <div><b>रु</b></div>
                    </div>
                    <div style="flex: 3; text-align: right; margin-right: 0rem" ">
                    <div> ${formater.format(x.finalResult.BasePremium)}</div>
                    <div> ${
                      lDto.Class === "Comprehensive Plan"
                        ? formater.format(x.finalResult.DirectDiscountAmount)
                        : ""
                    }</div> 
                    <div> ${
                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel !==
                      "Third Party Exclude Pool Premium"
                        ? formater.format(x.finalResult.ReceiptPremiumPDF)
                        : ""
                    }</div>
                    <div> <div>${
                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                        "Comprehensive Include Pool Premium" ||
                      lDto.InsurableItem[0].RiskItems[0].TypeofCoverLabel ===
                        "Third Party Include Pool Premium"
                        ? formater.format(
                            Number(x.finalResult.RSDMDPremium) + Number(x.finalResult.STPremiumPDF)
                          )
                        : ""
                    }</div></div>
                    <div> ${formater.format(x.finalResult.StampDuty)}</div>
                    <div> ${formater.format(x.finalResult.NetPremium)}</div>
                    <div> ${formater.format(x.finalResult.VAT)}</div>
                    <div><b> ${formater.format(x.finalResult.FinalPremium)}</b></div>
                    </div> </div>`,
                    showConfirmButton: true,
                    width: 600,
                    confirmButtonText: "Proceed",
                    confirmButtonColor: "#0079CE",
                    // showCancelButton: true,
                    // cancelButtonColor: "#ef5350",
                    showCloseButton: true,
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
            }
          );
        }

        break;
      case 1:
        {
          const loginType = localStorage.getItem("b2cLoginType");
          if (
            dto.ProposerDetails.DocumentList === "Citizen Ship" &&
            (dto.ProposerDetails.IndividualdocumentDetails[0].DocumentFileName === "" ||
              dto.ProposerDetails.IndividualdocumentDetails[1].DocumentFileName === "")
          ) {
            swal({ icon: "error", text: "Please upload your Citizenship copies" });
            fun = false;
          } else if (
            dto.ProposerDetails.DocumentList === "License" &&
            dto.ProposerDetails.IndividualdocumentDetails[2].DocumentFileName === ""
          ) {
            swal({ icon: "error", text: "Please upload your License copy" });
            fun = false;
          } else if (
            dto.ProposerDetails.DocumentList === "Passport" &&
            (dto.ProposerDetails.IndividualdocumentDetails[3].DocumentFileName === "" ||
              dto.ProposerDetails.IndividualdocumentDetails[4].DocumentFileName === "")
          ) {
            swal({ icon: "error", text: "Please upload your Passport copies" });
            fun = false;
          } else if (
            dto.ProposerDetails.DocumentList === "PAN" &&
            dto.ProposerDetails.InsuredType !== "Government body" &&
            dto.ProposerDetails.IndividualdocumentDetails[5].DocumentFileName === ""
          ) {
            swal({ icon: "error", text: "Please upload the PAN copy" });
            fun = false;
          } else if (dto.InsdetailsSumaryChk === false || dto.InsdetailsSumaryChk === "") {
            swal({ icon: "error", text: "Please check the declaration" });
            fun = false;
          } else if (lDto.proposalNo === undefined) {
            // lDto.ProposerDetails = { ...dto.ProposerDetails[0] };
            await GenericApi("NepalMotorTwoWheeler", "NepalMotorTWProposal", lDto).then(
              async (x) => {
                if (x.finalResult.proposalNumber) {
                  await GetProductByCode(dto.ProductCode).then(async (x2) => {
                    const res = await GetProposalByNumber(
                      x.finalResult.proposalNumber,
                      x2.data.productId
                    );

                    lDto.KYCNo = res.data[0].policyDetails.KYCNo;
                    // lDto.ProposerDetails = [dto.ProposerDetails];
                    if (loginType === "Intermediary") {
                      lMasters.loginType = true;
                    } else {
                      lMasters.loginType = false;
                    }
                    setMasters({ ...lMasters });
                    console.log("loginType", loginType);
                    fun = true;
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
            // lDto.ProposerDetails = { ...dto.ProposerDetails[0] };
            const x = await UpdateProposalDetails(lDto);
            if (x.data.responseMessage === "Updated successfully") {
              await GetProductByCode(dto.ProductCode).then(async (x2) => {
                const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);

                lDto.KYCNo = res.data[0].policyDetails.KYCNo;
                lDto.proposalNo = x.data.data.proposalNo;
                // lDto.ProposerDetails = [dto.ProposerDetails];
                if (loginType === "Intermediary") {
                  lMasters.loginType = true;
                } else {
                  lMasters.loginType = false;
                }
                setMasters({ ...lMasters });
                console.log("loginType", loginType);
                fun = true;
                setDto({ ...lDto });
                setBackDropFlag(false);
                fun = true;
              });
            }
          }
        }
        break;
      case 2:
        if (
          masters.loginType === false &&
          dto.InsurableItem.DocumentList === "Bill Book" &&
          (dto.InsurableItem[0].documentDetails[0].DocumentFileName === "" ||
            dto.InsurableItem[0].documentDetails[1].DocumentFileName === "" ||
            dto.InsurableItem[0].documentDetails[2].DocumentFileName === "")
        ) {
          swal({ icon: "error", text: "Please upload the bill book copies" });
        } else if (
          masters.loginType === false &&
          dto.InsurableItem.DocumentList === "Purchase Bill/Invoice" &&
          dto.InsurableItem[0].documentDetails[0].DocumentFileName === ""
        ) {
          swal({ icon: "error", text: "Please upload the Registration copy" });
        } else if (dto.InsurableItem[0].documentDetails[3].DocumentFileName === "") {
          swal({ icon: "error", text: "Please upload the Vehicle photo copy" });
        } else if (
          dto.DocType === "RollOver" &&
          dto.InsurableItem[0].documentDetails[4].DocumentFileName === ""
        ) {
          swal({ icon: "error", text: "Please upload the Renewal notice copy" });
        } else if (lDto.proposalNo === undefined) {
          // lDto.ProposerDetails = { ...dto.ProposerDetails[0] };
          await GenericApi("NepalMotorTwoWheeler", "NepalMotorTWProposal", lDto).then(async (x) => {
            if (x.finalResult.proposalNumber) {
              await GetProductByCode(dto.ProductCode).then(async (x2) => {
                const res = await GetProposalByNumber(
                  x.finalResult.proposalNumber,
                  x2.data.productId
                );

                lDto.KYCNo = res.data[0].policyDetails.KYCNo;
                // lDto.ProposerDetails = [dto.ProposerDetails];
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
          });
        } else if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
          // lDto.ProposerDetails = { ...dto.ProposerDetails[0] };
          const x = await UpdateProposalDetails(lDto);
          if (x.data.responseMessage === "Updated successfully") {
            await GetProductByCode(dto.ProductCode).then(async (x2) => {
              const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);

              lDto.KYCNo = res.data[0].policyDetails.KYCNo;
              lDto.proposalNo = x.data.data.proposalNo;
              // lDto.ProposerDetails = [dto.ProposerDetails];
              setDto({ ...lDto });
              setBackDropFlag(false);
              fun = true;
            });
          }
        }
        break;
      case 3:
        if (dto.PremiumSumChk1 && dto.PremiumSumChk2) {
          if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
            // lDto.proposalNo !== "" && lDto.proposalNo !== undefined
            // lDto.proposalNo = "NEP1/DHR/000548"
            window.open(
              `https://apilivedev-secondary.z30.web.core.windows.net/Retail/PaymentLink?proposal=${lDto.proposalNo}`,
              "_blank"
            );
          }
        } else {
          swal({ icon: "error", text: "Please check the conditions" });
        }
        break;
      case 4:
        setBackDropFlag(false);
        fun = swal2
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
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: {
          label: "Calculate Premium",
          visible: true,
          loader: "backDrop",
          variant: "contained",
        },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: {
          label: "Proceed",
          visible: true,
          loader: "backDrop",
          variant: "contained",
        },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop", variant: "contained" },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed to Payment",
          visible: true, //  lDto.Class === "Comprehensive Plan"
          loader: "backDrop",
          variant: "contained",
        },
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
    InsdetailsSumaryChk: false,
    PremiumSumChk1: false,
    PremiumSumChk2: false,
    BranchMasters: [],
    loginType: false,
    PreviousPolicyEndDateFlag: false,
  };
  const userDetails = additionalInformation.loginUserDetails;
  if (userDetails && userDetails.displayName) {
    lDto.AgentName = userDetails.displayName;
    lDto.AgentMobileNo = userDetails.contactNumber;
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

  const past12Year = currentYear - 12;
  const yearArr1 = arrayRange(past12Year, currentYear, 1);
  const yearArrMaster1 = [];
  yearArr1.forEach((x1, i1) => {
    yearArrMaster1.push({ mID: i1, mValue: x1.toString() });
  });
  yearArrMaster1.reverse();
  masters.YearofManufacture1 = yearArrMaster1;
  await GetNPCommonMaster().then((r) => {
    r.forEach((x) => {
      masters[x.mType] = x.mdata;
    });
  });
  // masters.DocType = masters.DocType.filter((x) => x.mValue !== "Renewal");
  // masters.Class = masters.Class.filter((x) => x.fieldName === "Commercial");
  // masters.SubClass = masters.SubClass.filter((x) => x.fieldName === "Commercial");
  masters.NameoftheVehicle = masters.NameoftheVehicle.filter((x) => x.description === "MotorCycle");

  await GetProdPartnermasterData("State", {}).then((r) => {
    masters.State = r.data;
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
      lDto.ICShortName = res.data[0].Description;
      setDto({ ...lDto });
    });
  }
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
