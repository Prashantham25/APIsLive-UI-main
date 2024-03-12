import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import excel from "assets/images/Nepal/excel.png";
import MDInput from "components/MDInput";
import { Search } from "@mui/icons-material";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import {
  Grid,
  Stack,
  Typography,
  // Card,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  CircularProgress,
  Checkbox,
  // Button,
  // Divider,
  List,
} from "@mui/material";
import Success from "assets/images/Nepal/Success.png";
import ClearIcon from "@mui/icons-material/Clear";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import objectPath from "object-path";
import successanimation from "assets/images/Nepal/successanimation.gif";
import AccidentalInsuranceExcelDownload from "assets/images/Nepal/AccidentalInsurance_ExcelUpload.xlsx";
import GenericBulkUploadValidation from "Common/GenericBulkUploadValidation";
import { read, utils } from "xlsx";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import {
  GetNPCommonMaster,
  Transliteration,
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  GetProdPartnermasterData,
  DocumenUpload,
  DeleteDocument,
  SaveQuotation,
  // NumberofDaysinYear,
  PolicyStartDateMinDate,
  PolicyStartDateMaxDate,
  GenericApi,
  NumberofDaysinYear,
  SaveCreateProposal,
  GetProductByCode,
  GetProposalByNumber,
  UpdateProposalDetails,
  UpdateWorkflowStatus,
  SavepolicyWFStatus,
  SendNotification,
  QuotationUpdate,
} from "./data/APIs/MotorCycleApi";
import {
  IsNumeric,
  // IsNumericNonZero,
  IsFreetextNoSpace,
  IsNumaricSpecialNoSpace,
  NumBetween,
  IsMobileNumber,
  IsEmail,
  AgeCalculator,
  addDays1,
  // arrayRange,
} from "../../../../../../Common/Validations";
import {
  BranchDetails,
  // docDetails,
  ProposerDetails,
  Bankdetails,
  // RollOverDocuments,
} from "./data/Json/PrivateVehicleJson";
import PaymentPage from "../../Payment";
import { GetTemplatePayload } from "../../Payment/Apis";
import {
  AccidentalInsuranceJson,
  RiskItems,
  docDetails,
  // ProposerDetails,
} from "./data/Json/AccidentalInsuranceJson";
import { useDataController } from "../../../../../BrokerPortal/context";
// import { BranchDetails } from "./data/Json/CommercialJson";

let setSuccessRec1 = null;
let SuccessRec1 = [];
const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = AccidentalInsuranceJson();
  // console.log(111, dto);d
  if (
    (genericInfo.Flow &&
      (genericInfo.Flow === "DisApproveFlow" ||
        genericInfo.Flow === "Approved" ||
        genericInfo.Flow === "DebitFlow")) ||
    process.env.REACT_APP_AutoPopulateCustomerDetails === "true" ||
    process.env.NODE_ENV === "development"
  ) {
    dto = { ...dto, ...PolicyDto };
    dto.ProposerDetails = [PolicyDto.ProposerDetails];
  }
  return dto;
};

const getProcessSteps = () => {
  const steps = [
    "Quote Details",
    "Customer Details",
    "Accidental Insurance Details",
    "Risk Details",
    "Premium Summary",
    "Payment",
  ];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto }) => {
  //   const [flag, setFlag] = useState({
  //     ProposerDetails: false,
  //     InsuredDetails: false,
  //     IndividualInformation: false,
  //     CareOfDetails: false,
  //     ProprietorDetails: false,
  //     OtherDetails: false,
  //     BankFinancial: false,
  //     BranchDetails: false,
  //     MemberDetail: false,
  //   });

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
  const spreadMultiKYCDetails = () => {
    const arr = [];
    dto.ProposerDetails.forEach((x, i) => {
      arr.push({ name: `Insured Details ${i + 1}`, visible: dto.FinancingType !== "" });
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
        { name: "Customer Details", visible: true }, // Customer Details
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
        // {
        //   name: "Individual Information",
        //   visible: dto.FinancingType !== "" && dto.ProposerDetails[0].InsuredType === "Individual",
        // },
        // {
        //   name: dto.ProposerDetails[0].InsuredType,
        //   visible:
        //     dto.FinancingType !== "" &&
        //     dto.ProposerDetails[0].InsuredType !== "" &&
        //     dto.ProposerDetails[0].InsuredType !== "Individual",
        // },
        ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        // {
        //   name: "Policy Holder Details",
        //   visible: dto.FinancingType !== "",
        // },
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
        { name: "Accidental Insurance Details", visible: true },
        // { name: "Individual Details", visible: true },
        // { name: "Group", visible: true },
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
const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters }) => {
  const [control] = useDataController();
  const { genericInfo, loginUserDetails } = control;
  const lDto = dto;
  const masters1 = masters;
  //   const formater = new Intl.NumberFormat("en-IN", {
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   });
  const OnFinancingDetails = (e) => {
    if (e != null) {
      lDto.FinancingType = e.target.value;
    } else {
      lDto.FinancingType = "";
    }
    lDto.PolicyRiskType = "";
    lDto.PolicyRiskCategory = "";
    lDto.Bankdetails = { ...Bankdetails() };
    lDto.ProposerDetails = [{ ...ProposerDetails() }];
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    setDto({ ...lDto });
  };
  const IsNumericGreaterThanZero = (number) => {
    const regex = /^(?!(0))[0-9]*$/;
    if (regex.test(number)) return true;
    return "Value must be greater than zero and Numeric";
    //  " Allows only number";
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
        lDto.ProposerDetails[index].PermanentAdrress.ProvinceState = a.mValue;
        lDto.ProposerDetails[index].PermanentAdrress.District = "";
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        masters1.District2 = res.data;
      } else {
        lDto.ProposerDetails[index].PermanentAdrress.ProvinceState = "";
        lDto.ProposerDetails[index].PermanentAdrress.District = "";
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        lDto.ProposerDetails[index].PermanentAdrress.WardNumber = "";
      }
    }
    if (n === "District2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.ProposerDetails[index].PermanentAdrress.District = a.mValue;
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        masters1.Municipality2 = res.data;
      } else {
        lDto.ProposerDetails[index].PermanentAdrress.District = "";
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        lDto.ProposerDetails[index].PermanentAdrress.WardNumber = "";
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
    if (n === "State6") {
      if (a !== null) {
        // masters1.Municipalitynew = [];
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ProvinceState = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        masters1.District6 = res.data;
      } else {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ProvinceState = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.WardNumber = "";
      }
    }
    if (n === "District6") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });

        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        masters1.Municipality6 = res.data;
      } else {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.WardNumber = "";
      }
    }
    setDto({ ...lDto });
    setMasters({ ...masters1 });
  };

  const onBlurTransliteration = async (e, a, EF, ET, i) => {
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
        lDto.Bankdetails.BranchDetails[i].AddressNepali = Text;
      }
      if (varName === "InsuredNameEnglish") {
        lDto.ProposerDetails[i].InsuredNameNepali = Text;
      }
      if (varName === "TemporaryAddressEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.TemporaryAddressNepali = Text;
      }
      if (varName === "IndividualTemporaryAddressEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.TemporaryAddressNepali = Text;
      }
      if (varName === "PermanentAdrressEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "IndividualHusbandNameEnglish") {
        lDto.ProposerDetails[i].HusbandNameNepali = Text;
      }
      if (varName === "IndividualWifeNameEnglish") {
        lDto.ProposerDetails[i].WifeNameNepali = Text;
      }
      if (varName === "IndividualFatherNameEnglish") {
        lDto.ProposerDetails[i].FatherNameNepali = Text;
      }
      if (varName === "IndividualGrandfatherNameEnglish") {
        lDto.ProposerDetails[i].GrandfatherNameNepali = Text;
      }
      if (varName === "IndividualPermanentAddressEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "IndividualTownEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.TownNepali = Text;
      }
      if (varName === "IndividualCityEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.CityNepali = Text;
      }
      if (varName === "IndividualResidenceEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.ResidenceNepali = Text;
      }
      if (varName === "WifeNameEnglish") {
        lDto.ProposerDetails[i].WifeNameNepali = Text;
      }
      if (varName === "FatherNameEnglish") {
        lDto.ProposerDetails[i].FatherNameNepali = Text;
      }
      if (varName === "GrandFatherNameEnglish") {
        lDto.ProposerDetails[i].GrandfatherNameNepali = Text;
      }
      if (varName === "AddressEnglish111") {
        lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "HusbandNameEnglish") {
        lDto.ProposerDetails[i].HusbandNameNepali = Text;
      }
      if (varName === "TownEnglish1111") {
        lDto.ProposerDetails[i].PermanentAdrress.TownNepali = Text;
      }
      if (varName === "CityEnglish11111") {
        lDto.ProposerDetails[i].PermanentAdrress.CityNepali = Text;
      }
      if (varName === "VehicleNumberEnglish") {
        lDto.InsurableItem[0].RiskItems[0].VehicleNumberNepali = Text;
      }
      if (varName === "TempAddresEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.TempAddresNepali = Text;
      }
      if (varName === "ProprietorNameEnglish") {
        lDto.ProposerDetails[0].ProprietorNameNepali = Text;
      }
      if (varName === "RiskAddressEnglish") {
        lDto.RiskAddressDetails.AddressNepali = Text;
      }
      if (varName === "VehicleNoEnglish") {
        lDto.InsurableItem[0].RiskItems[0].VehicleNoNepali = Text;
      }
      if (varName === "MemberNameEnglish") {
        lDto.ProposerDetails[i].MemberNameNepali = Text;
      }
      if (varName === "DesignationEnglish") {
        lDto.ProposerDetails[i].DesignationNepali = Text;
      }
      if (varName === "CareofNameEnglish") {
        lDto.ProposerDetails[0].CareofNameNepali = Text;
      }
      if (varName === "CareofAddressEnglish") {
        lDto.ProposerDetails[0].CareofAddressNepali = Text;
      }
      if (varName === "ToleStreetNameEnglish") {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ToleStreetNameNepali = Text;
      }
      setDto({ ...lDto });
    }
  };

  const GenderNepali = [
    { mID: 1, mValue: "Male", translation: "पुरुष" },
    { mID: 2, mValue: "Female", translation: "महिला" },
    { mID: 3, mValue: "Others", translation: "अन्य" },
  ];
  const handleGender = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].GenderEnglish = a.mValue;
      lDto.ProposerDetails[i].GenderNepali = a.translation;
    } else {
      lDto.ProposerDetails[i].GenderEnglish = "";
      lDto.ProposerDetails[i].GenderNepali = "";
    }
    setDto({ ...lDto });
  };
  const MaritalStatus = [
    { mID: 1, mValue: "Unmarried", translation: "अविवाहित" },
    { mID: 2, mValue: "Married", translation: "विवाहित" },
    { mID: 3, mValue: "Divorced", translation: "विभाजक" },
    { mID: 4, mValue: "Widow", translation: "विधवा" },
  ];

  const handleMarital = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].MaritalStatusEnglish = a.mValue;
      lDto.ProposerDetails[i].MaritalStatusNepali = a.translation;
    } else {
      lDto.ProposerDetails[i].MaritalStatusEnglish = "";
      lDto.ProposerDetails[i].MaritalStatusNepali = "";
    }
    setDto({ ...lDto });
  };

  const OnInsuredNameEnglish = (e, name, i) => {
    lDto.ProposerDetails[i].PermanentAdrress[name] = e.target.value;
    lDto.ProposerDetails[i][name] = e.target.value;
    const Name = lDto.ProposerDetails[i].InsuredNameEnglish;
    const Address = lDto.ProposerDetails[i].PermanentAdrress.AddressEnglish;
    if (Name !== undefined) {
      lDto.ProposerDetails[i].NameoftheOrganisation = Name;
    }
    if (Address !== undefined) {
      lDto.ProposerDetails[i].OrganizationAddress = Address;
    }
    setDto({ ...lDto });
  };
  // const OnPolicyHolderName = (e, a) => {
  //   if (a !== null) {
  //     lDto.ProposerDetails[0].PolicyHolderDetails.PolicyHolderName = a.mValue;
  //     lDto.ProposerDetails[0].PolicyHolderDetails.Address = a.address;
  //   } else {
  //     lDto.ProposerDetails[0].PolicyHolderDetails.Address = "";
  //     lDto.ProposerDetails[0].PolicyHolderDetails.PolicyHolderName = "";
  //   }
  //   setDto({ ...lDto });
  // };

  const onAddDocument = (i) => {
    lDto.ProposerDetails[i].documentDetails = [
      ...lDto.ProposerDetails[i].documentDetails,
      { ...docDetails() },
    ];

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
  const handleNumberofDaysVal = (number) => {
    // console.log(
    //   "Number",
    //   Number(NumberofDaysinYear(lDto?.PolicyStartDate.split("/")[2])),
    //   NumBetween(number, 1, Number(NumberofDaysinYear(lDto?.PolicyStartDate.split("/")[2])), 1) ===
    //     true
    // );
    if (
      NumBetween(
        number,
        1,
        Number(NumberofDaysinYear(lDto?.PolicyStartDate, lDto?.PolicyStartDate.split("/")[2])),
        1
      ) === true &&
      lDto.PolicyStartDate !== ""
    )
      return true;
    return `${`Number of days should be in between 1 to ${Number(
      NumberofDaysinYear(lDto?.PolicyStartDate, lDto?.PolicyStartDate.split("/")[2])
    )} days`}`;
  };
  const handleDublicateDoc = (e, DocName, i1, index) => {
    lDto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        lDto.ProposerDetails[i1].documentDetails[index].DocName = "";
        swal({
          icon: "error",
          text: `"${DocName}" Already Exist`,
        });
      }
    });
    setDto({ ...lDto });
  };

  const onDocUplode = async (file, i1, i) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        lDto.ProposerDetails[i1].documentDetails[i].FileName = file.name;
        lDto.ProposerDetails[i1].documentDetails[i].UploadDocDate = new Date().toLocaleDateString();
        lDto.ProposerDetails[i1].documentDetails[i].DocId = result.data[0].docid;
        setDto({ ...lDto });
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };

  const handleFileUpload = async (event, i1, index) => {
    await onDocUplode(event.target.files[0], i1, index);
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
  };
  //   Insured Details If Insured Type is chosen as dropdown Upload ProfilePicture
  const OnProfilePicture = async (e, i) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    const fileExtension = file.name.split(".").pop();
    if (fileExtension === "jpeg" || fileExtension === "png") {
      await DocumenUpload(formData);
      lDto.ProposerDetails[i].ProfilePicture = file.name;
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
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    e.target.value = "";
  };
  const onCancelClickProfilePicture = async (i) => {
    const file = lDto.ProposerDetails[i].ProfilePicture;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails[i].ProfilePicture = "";
        setDto({ ...lDto });
      }
    });
  };

  const onCancelClick = async (i1, i) => {
    const file = lDto.ProposerDetails[i1].documentDetails[i].FileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails[i1].documentDetails[i].FileName = "";
        lDto.ProposerDetails[i1].documentDetails[i].DocId = "";
        lDto.ProposerDetails[i1].documentDetails[i].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };

  const handleDocFileDelete = async (i1, i2) => {
    const file = lDto.ProposerDetails[i1].documentDetails[i2].FileName;
    if (file !== "") await DeleteDocument(file);
    const arr1 = lDto.ProposerDetails[i1].documentDetails.filter((x, i) => i !== i2);
    lDto.ProposerDetails[i1].documentDetails = arr1;
    setDto({ ...lDto });
  };

  const onDOBselect = (e, d, i) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      lDto.ProposerDetails[i].DoB = [""];
      swal2.fire({
        icon: "error",
        text: `Age of the Policy Holder must be above 16 Years.`,
        confirmButtonColor: "#0079CE",
      });
    } else {
      lDto.ProposerDetails[i].DoB = d;
    }
    setDto({ ...lDto });
  };

  const spreadDocumentDetails = (i1) => {
    const arr = [];
    lDto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: true,
          name: "DocName",
          label: "Document Name",
          path: `ProposerDetails.${i1}.documentDetails.${i}.DocName`,
          onChangeFuncs: [IsFreetextNoSpace],
          customOnBlur: (e) => handleDublicateDoc(e, "DocName", i1, i),
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
              id="fileInput"
              onChange={(e) => handleFileUpload(e, i1, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i1].documentDetails[i].FileName,
          spacing: 3,
          visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
        },
        {
          type: "IconButton",
          icon: "close",
          spacing: 2.9,
          visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
          onClick: () => onCancelClick(i1, i),
        },
        {
          type: "IconButton",
          icon: "delete",
          color: "primary",
          spacing: 0.1,
          visible: i !== 0,
          onClick: () => handleDocFileDelete(i1, i),
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
        // console.log("masters.BranchMasters", masters.BranchMasters, masters.BranchMasters.length);
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

  const onAddBranchDetails = () => {
    lDto.Bankdetails.BranchDetails.push({ ...BranchDetails() });
    masters1.placeMasters.push({ district: [], municipality: [] });
    setDto({ ...lDto });
  };

  const RemoveBranchDetails = (i) => {
    const arr = lDto.Bankdetails.BranchDetails.filter((x, i1) => i1 !== i);
    lDto.Bankdetails.BranchDetails = arr;
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

  const spreadMultiKYCDetails = () => {
    const arr = [];
    lDto.ProposerDetails.forEach((x, i) => {
      arr.push([
        {
          type: "AutoComplete",
          label: "KYC Category",
          visible: true,
          path: `ProposerDetails.${i}.KYCCategory`,
          options: masters.KYCCategory,
          required: true,
          disableOnReset: true,
        },
        {
          type: "AutoComplete",
          label: "Insured Type",
          visible: true,
          path: `ProposerDetails.${i}.InsuredType`,
          options: masters.InsuredType,
          required: true,
        },
        {
          type: "Input",
          label: "Special Client",
          visible: true,
          path: `ProposerDetails.${i}.SpecialClient`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          disableOnReset: true,
        },
        {
          type: "Input",
          label: "Insured Name English",
          visible: true,
          path: `ProposerDetails.${i}.InsuredNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "InsuredNameEnglish",
          customOnChange: (e) => OnInsuredNameEnglish(e, "InsuredNameEnglish", i),
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          // customOnBlur: (e) => handleInsuredNameEnglish(e, i),
        },
        {
          type: "Input",
          label: "Insured Name Nepali",
          visible: true,
          path: `ProposerDetails.${i}.InsuredNameNepali`,
          // required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "KYC Classification",
          visible: true,
          path: `ProposerDetails.${i}.KYCClassification`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "AutoComplete",
          label: "KYC Risk Category",
          visible: true,
          path: `ProposerDetails.${i}.KYCRiskCategory`,
          options: masters.KYCRiskCategory,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Is Beneficiary Owner",
          visible: true,
          path: `ProposerDetails.${i}.IsBeneficiaryOwner`,
          options: masters.IsBeneficiaryOwner,
          disableOnReset: true,
        },
        {
          type: "AutoComplete",
          label: "Occupation",
          visible: true,
          path: `ProposerDetails.${i}.Occuptation`,
          options: masters.Occupation,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Income Source",
          visible: true,
          path: `ProposerDetails.${i}.IncomeSource`,
          options: masters.IncomeSource,
          required: true,
        },
        {
          type: "Input",
          label: "Contact Person Name",
          visible: true,
          path: `ProposerDetails.${i}.ContactPersonName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Email Address",
          visible: true,
          path: `ProposerDetails.${i}.EmailId`,
          onBlurFuncs: [IsEmail],
        },
        {
          type: "Input",
          label: "PAN Number",
          visible: true,
          path: `ProposerDetails.${i}.PANNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          // InputProps: { maxLength: 9 },
          required:
            lDto.ProposerDetails[i].InsuredType !== "Individual" &&
            lDto.ProposerDetails[i].InsuredType !== "Government body",
        },
        {
          type: "Input",
          label: "VAT Number",
          visible: true,
          path: `ProposerDetails.${i}.VATNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          // InputProps: { maxLength: 9 },
        },
        {
          type: "Input",
          label: "Registration Number",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "MDDatePicker",
          label: "Registration Date",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationDate`,
        },
        {
          type: "MDDatePicker",
          label: "Registration Close Date",
          visible: true,
          path: `ProposerDetails.${i}.RegisterationCloseDate`,
          disabled: lDto.ProposerDetails[i].RegistrationDate === "",
          minDate: new Date(lDto.ProposerDetails[i].RegistrationDate),
        },
        {
          type: "Input",
          label: "Registration Office",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationOffice`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Reference Insured Name",
          visible: true,
          path: `ProposerDetails.${i}.ReferenceInsuredName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Phone Number",
          visible: true,
          path: `ProposerDetails.${i}.PhoneNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Mobile Number",
          visible: true,
          path: `ProposerDetails.${i}.MobileNo`,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
          required: true,
        },
        {
          type: "Input",
          label: "TDS Category",
          visible: true,
          path: `ProposerDetails.${i}.TDSCategory`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "AutoComplete",
          label: "Country",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Country`,
          options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.ProvinceState`,
          options: lDto.ProposerDetails[i].PermanentAdrress.Country !== "" ? masters.State : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State2", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.District`,
          options:
            lDto.ProposerDetails[i].PermanentAdrress.ProvinceState !== "" ? masters.District2 : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District2", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Municipality`,
          options:
            lDto.ProposerDetails[i].PermanentAdrress.District !== "" ? masters.Municipality2 : [],
          required: true,
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality2"),
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.WardNumber`,
          options: masters.WardNumber,
        },
        {
          type: "Input",
          label: "Address(English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          required: true,
          name: "PermanentAdrressEnglish",
          customOnChange: (e) => OnInsuredNameEnglish(e, "AddressEnglish", i),
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Address(Nepali) ",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          onChangeFuncs: [IsFreetextNoSpace],
          // required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "Area",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Area`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/StreetName",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "House Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.HouseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Plot Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.PlotNumber`,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Temporary Address-English ",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "TemporaryAddressEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Temporary Address-Nepali ",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
          disabled: true,
        },
        { type: "Typography", label: "Document Section", visible: true, spacing: 12 },
        {
          type: "Button",
          label: "Add Document",
          visible: true,
          startIcon: <AddIcon />,
          variant: "outlined",
          onClick: () => onAddDocument(i),
          spacing: 12,
        },
        ...spreadDocumentDetails(i),
        {
          type: "Accordions",
          //   visible: lDto.ProposerDetails[i].InsuredType !== "",
          spacing: 12,
          accordionList: [
            {
              id: 1,
              label: lDto.ProposerDetails[i].InsuredType,
              visible:
                lDto.FinancingType !== "" && lDto.ProposerDetails[i].InsuredType === "Individual",
            },
            {
              id: 2,
              label: lDto.ProposerDetails[i].InsuredType,
              visible:
                lDto.FinancingType !== "" &&
                lDto.ProposerDetails[i].InsuredType !== "" &&
                lDto.ProposerDetails[i].InsuredType !== "Individual",
            },
          ],
        },

        //   ffffffffffffff
        {
          type: "Typography",
          label: "Upload Profile Picture",
          visible: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Button",
          visible: true,
          component: "label",
          label: "Upload",
          spacing: 2,
          accordionId: 1,
          typeFormat: (
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png,"
              type="file"
              id="fileInput"
              onChange={(e) => OnProfilePicture(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i].ProfilePicture,
          // spacing: 3,
          visible: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "IconButton",
          icon: "close",
          // spacing: 2,
          visible: lDto.ProposerDetails[i].ProfilePicture !== "",
          onClick: () => onCancelClickProfilePicture(i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 12,
          accordionId: 1,
        },
        {
          type: "AutoComplete",
          label: "Gender (English)",
          visible: true,
          path: `ProposerDetails.${i}.GenderEnglish`,
          // options: masters.Gender,
          options: GenderNepali,
          required: true,
          customOnChange: (e, a) => handleGender(e, a, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Gender (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GenderNepali`,
          required: true,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Marital status (English)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusEnglish`,
          // options: masters.MaritalStatus,
          options: MaritalStatus,
          customOnChange: (e, a) => handleMarital(e, a, i),
          required: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Marital status (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusNepali`,
          required: true,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Husband's Name(English)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualHusbandNameEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Husband's Name(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Wife Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualWifeNameEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Wife Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Father Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualFatherNameEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Father Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "GrandFather Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualGrandfatherNameEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "GrandFather Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Nationality (English)",
          visible: true,
          path: `ProposerDetails.${i}.NationalityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Permanent Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "IndividualPermanentAddressEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Permanent Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Town (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "IndividualTownEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Town (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "City (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "IndividualCityEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "City (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Temporary Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "IndividualTemporaryAddressEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Temporary Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Residence(English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.ResidenceEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "IndividualResidenceEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Residence(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.ResidenceNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Citizenship Number",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipNumber`,
          required: true,
          accordionId: 1,
          spacing: 3,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "MDDatePicker",
          label: "Citizenship Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
          required: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Citizenship Issue District",
          visible: true,
          path: `ProposerDetails.${i}.IssueDistrict`,
          options: masters.District,
          required: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Date Of Birth",
          visible: true,
          path: `ProposerDetails.${i}.DoB`,
          required: true,
          dateFormat: "m-d-Y",
          maxDate: new Date(),
          accordionId: 1,
          spacing: 3,
          customOnChange: (e, d) => onDOBselect(e, d, i),
        },
        {
          type: "Input",
          label: "License Number",
          visible: true,
          spacing: 3,
          path: `ProposerDetails.${i}.LicenseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 1,
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: { label: "Passport Issued By", labelVisible: true },
          radioList: [
            { value: "India", label: "India" },
            { value: "Nepal", label: "Nepal" },
          ],
          path: `ProposerDetails.${i}.PassportIssuedBy`,
          spacing: 3.2,
          accordionId: 1,
        },

        {
          type: "Input",
          label: "Passport Number",
          visible: true,
          path: `ProposerDetails.${i}.PassportNumber`,
          InputProps: { maxLength: 8 },
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 1,
          spacing: 2.8,
        },
        {
          type: "MDDatePicker",
          label: "Passport Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportIssuedDate`,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Passport Expiry Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportExpiryDate`,
          minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate),
          accordionId: 1,
          disabled: lDto.ProposerDetails[i].PassportIssuedDate === "",
          spacing: 3,
        },

        //   fffffffffffffffffff
        {
          type: "Input",
          label: "Name of the Organization",
          visible: true,
          path: `ProposerDetails.${i}.NameoftheOrganisation`,
          required: true,
          disabled: true,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Address of Organization",
          visible: true,
          path: `ProposerDetails.${i}.OrganizationAddress`,
          required: true,
          onChangeFuncs: [IsFreetextNoSpace],
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Organization Phone Number",
          visible: true,
          path: `ProposerDetails.${i}.OrganizationContactNo`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Typography",
          label: "Member Details",
          visible: true,
          spacing: 12,
          accordionId: 2,
        },
        {
          type: "AutoComplete",
          label: "Member Type",
          visible: true,
          path: `ProposerDetails.${i}.MemberType`,
          options: masters.MemberType,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Role",
          visible: true,
          path: `ProposerDetails.${i}.Role`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Member Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.MemberNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "MemberNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Member Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MemberNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Designation (English)",
          visible: true,
          path: `ProposerDetails.${i}.DesignationEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "DesignationEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Designation (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.DesignationNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Gender (English)",
          visible: true,
          path: `ProposerDetails.${i}.GenderEnglish`,
          options: GenderNepali,
          customOnChange: (e, a) => handleGender(e, a, i),
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Gender (Nepali)",
          visible: true,
          disabled: true,
          path: `ProposerDetails.${i}.GenderNepali`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Marital Status (English)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusEnglish`,
          options: MaritalStatus,
          customOnChange: (e, a) => handleMarital(e, a, i),
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Marital Status (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Husband's Name(English)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "HusbandNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Husband's Name(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Wife Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "WifeNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Wife Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Father Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "FatherNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Father Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "GrandFather Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "GrandFatherNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "GrandFather Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Nationality (English)",
          visible: true,
          path: `ProposerDetails.${i}.NationalityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Permanent Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "AddressEnglish111",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Permanent Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Town (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "TownEnglish1111",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Town (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "City (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "CityEnglish11111",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "City (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Temporary Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TempAddresEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "TempAddresEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Temporary Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TempAddresNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Identification Type",
          visible: true,
          path: `ProposerDetails.${i}.IdentificationType`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 2,
          spacing: 3,
        },

        {
          type: "Input",
          label: "Citizenship Number",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Citizenship Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Citizenship Issue District",
          visible: true,
          path: `ProposerDetails.${i}.IssueDistrict`,
          options: masters.District,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Date Of Birth",
          visible: true,
          path: `ProposerDetails.${i}.DoB`,
          dateFormat: "m-d-Y",
          maxDate: new Date(),
          accordionId: 2,
          spacing: 3,
          customOnChange: (e, d) => onDOBselect(e, d, i),
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: { label: "Passport Issued By", labelVisible: true },
          radioList: [
            { value: "India", label: "India" },
            { value: "Nepal", label: "Nepal" },
          ],
          path: `ProposerDetails.${i}.PassportIssuedBy`,
          spacing: 3.2,
          accordionId: 2,
        },
        {
          type: "Input",
          label: "Passport Number",
          visible: true,
          path: `ProposerDetails.${i}.PassportNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          InputProps: { maxLength: 9 },
          accordionId: 2,
          spacing: 2.8,
        },
        {
          type: "MDDatePicker",
          label: "Passport Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportIssuedDate`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Passport Expiry Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportExpiryDate`,
          minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate),
          accordionId: 2,
          disabled: lDto.ProposerDetails[i].PassportIssuedDate === "",
          spacing: 3,
        },

        {
          type: "Input",
          label: "License Number",
          visible: true,
          spacing: 3,
          path: `ProposerDetails.${i}.LicenseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 2,
        },
        {
          type: "AutoComplete",
          label: "Status",
          visible: true,
          path: `ProposerDetails.${i}.Status`,
          options: masters.Status,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Appoint Date",
          visible: true,
          path: `ProposerDetails.${i}.AppointDate`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 12,
          accordionId: 2,
        },
        {
          type: "Typography",
          label: "Upload Profile Picture",
          visible: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Button",
          visible: true,
          component: "label",
          label: "Upload",
          spacing: 2,
          accordionId: 2,
          typeFormat: (
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png,"
              type="file"
              onChange={(e) => OnProfilePicture(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i].ProfilePicture,
          visible: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "IconButton",
          icon: "close",
          accordionId: 2,
          spacing: 3,
          visible: lDto.ProposerDetails[i].ProfilePicture !== "",
          onClick: () => onCancelClickProfilePicture(i),
        },
      ]);
    });
    return arr;
  };

  const handleBranchName = async (e, a, i) => {
    // debugger;
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
        // objectPath.set(dto, `Bankdetails.BranchDetails.${i}.AddressNepali`, res[0].text);
        // lDto.Bankdetails.BranchDetails[i].AddressNepali = res[0].text;
        lDto.Bankdetails.BranchDetails[i].AddressNepali = res[0].text;
      }
    } else {
      lDto.Bankdetails.BranchDetails[i].BranchName = "";
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
    lDto.Bankdetails.BranchDetails.forEach((x, i) => {
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
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
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

          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          visible: masters.BranchMasters.length > 0,
          required: true,
          disabled: true,
          name: "BranchNameinEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
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
          name: "BranchNameinEnglish",
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

  // onPremium Select
  const handlePolicyNumberDates = (e) => {
    // debugger;
    if (lDto?.PolicyStartDate !== "" && lDto?.NumberofDays !== undefined) {
      // if (/^[0-9]*$/.test(e.target.value) === true) {
      lDto.NumberofDays = e.target.value;
      if (
        NumBetween(
          Number(e.target.value),
          1,
          Number(NumberofDaysinYear(lDto?.PolicyStartDate, lDto?.PolicyStartDate.split("/")[2])),
          1
        ) === true
      ) {
        lDto.PolicyEndDate = addDays1(lDto?.PolicyStartDate, e.target.value);
      }
      // else {
      //   lDto.NumberofDays = "";
      //   lDto.PolicyEndDate = "";
      // }
      // }
    }
    setDto({ ...lDto });

    // if (a.mValue === "Short Period") {
    //   lDto.NumberofDays = "";
    //   lDto.Period = "";
    //   lDto.PolicyEndDate = "";
    //   setDto({ ...lDto });
    // }
    // else {
    //   lDto.NumberofDays = "";
    //   lDto.Period = "";
    //   lDto.PolicyEndDate = "";
    //   setDto({ ...lDto });
    // }
  };

  const handlePolicy = (e, d) => {
    // debugger;
    lDto.PolicyStartDate = d;
    if (lDto.PolicyStartDate !== "") {
      lDto.NumberofDays = "";
      lDto.PolicyEndDate = "";
    } else {
      lDto.PolicyStartDate = "";
      lDto.NumberofDays = "";
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };

  const handleTypeofInsurance = (e, a) => {
    if (a !== null) {
      lDto.InsurableItem[0].TypeofInsurance = a.mValue;
      if (a.mValue === "Individual" && lDto.InsurableItem[0].RiskItems.length > 1) {
        lDto.InsurableItem[0].RiskItems = [RiskItems];
        lDto.TotalSumInsured = "";
        setSuccessRec1 = [];
      }
      if (a.mValue === "Group") {
        lDto.InsurableItem[0].RiskItems.forEach((x, i) => {
          lDto.InsurableItem[0].RiskItems[i].TypeofInsurance = "Group";
        });
      }
    } else {
      lDto.InsurableItem[0].TypeofInsurance = "";
      lDto.InsurableItem[0].RiskItems = [RiskItems];
      lDto.TotalSumInsured = "";
      setSuccessRec1 = [];
    }

    setDto({ ...lDto });
  };

  // Number of Days based on Premium Type
  // const onNumberOfDays = (val) => {
  //   const topMasters = {};
  //   const periodVal = lDto.Period;
  //   let periodNum = 0;
  //   let periodNum2 = 0;
  //   topMasters.Period.forEach((x) => {
  //     if (x.mValue === periodVal) {
  //       periodNum = x.description;
  //       periodNum2 = x.fieldName;
  //     }
  //   });
  //   if (IsNumeric(val) === true) {
  //     if (Number(val) <= 0) return `invalid days`;
  //     if (Number(val) > periodNum || Number(val) < periodNum2)
  //       return `Days should be in range ${periodNum2} and ${periodNum}`;
  //   }
  //   return IsNumeric(val);
  // };
  const downloadFile = () => {
    const link = document.createElement("a");
    link.download = "AccidentalInsurance_ExcelUpload";
    link.href = AccidentalInsuranceExcelDownload;
    link.click();
  };

  const onSearchFilter = (e) => {
    const GetData = lDto.InsurableItem[0].RiskItems;
    const Data = GetData.filter(
      (item) =>
        item.Name.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Designation.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.CitizenshipNo.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Address.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.ContactNo.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Age.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.SumInsured.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    console.log("DAta", Data);
    lDto.Temp.Upload = Data;
    setDto({ ...lDto });
    // GetData = Data;
  };
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [SuccessRec, setSuccessRec] = useState([]);
  const [FailureRec, setFailureRec] = useState([]);
  console.log("FailureRec", FailureRec);
  console.log("SuccessRec", SuccessRec);
  console.log("rowSelectionModel", rowSelectionModel);

  const onClear = () => {
    if (rowSelectionModel.length !== 0) {
      let FormatedDatafilteredList = [];
      const filteredList = lDto.Temp.Upload.filter(
        (item) => !rowSelectionModel.includes(item.row_id)
      );
      if (
        lDto?.FormatedData?.CalculatedPremiumDetails?.NepalAccidentalInsuranceBaseRating?.output
      ) {
        FormatedDatafilteredList =
          lDto.FormatedData.CalculatedPremiumDetails.NepalAccidentalInsuranceBaseRating.output.filter(
            (item) => !rowSelectionModel.includes(item.row_id)
          );
        lDto.FormatedData.CalculatedPremiumDetails.NepalAccidentalInsuranceBaseRating.output =
          FormatedDatafilteredList;
      }
      setRowSelectionModel(filteredList);
      setSuccessRec([...filteredList]);
      lDto.Temp.Upload = filteredList;
      lDto.InsurableItem[0].RiskItems = filteredList;
      const SumInsured = [];
      let TotalSumInsured = 0;
      filteredList.forEach((x) => {
        SumInsured.push(x.SumInsured);
      });
      objectPath.set(lDto, "TotalNumberofPerson", filteredList.length);

      for (let i = 0; i < SumInsured.length; i += 1) {
        TotalSumInsured += SumInsured[i];
      }
      lDto.TotalSumInsured = TotalSumInsured;
      objectPath.set(
        lDto,
        "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
        formater.format(TotalSumInsured)
      );
      setDto({ ...lDto });
    }
  };
  const onFailureRecords = (FailArray) => {
    const FailData = FailArray;
    FailData.forEach((x, i) => {
      delete FailData[i].row_id;
      delete FailData[i].NoofPersons;
      if (x?.FormatedSumInsured !== undefined) {
        delete FailData[i].FormatedSumInsured;
      }
    });
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(FailData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${lDto.Class} Incorrect Data${fileExtension}`);
  };

  const ColumnInfo = {
    Name: {
      mandatory: true,
      mandatoryErrMes: "(Name is Mandatory field)",
      validationErrMes: () => "(Name field Accepts alphabets values only)",
      ValidationFun: IsAlphaNoSpace,
    }, // mandatory
    Designation: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Designation field Accepts alphabets values only)",
      ValidationFun: IsAlphaNoSpace,
    }, // non mandatory
    CitizenshipNo: {
      mandatory: false,
      mandatoryErrMes: "(CitizenshipNo field is Mandatory Field)",
      validationErrMes: () => "(CitizenshipNo field No Accepts alphanumeric values only)",
      ValidationFun: IsAlphaNumNoSpace,
    }, // non mandatory
    Address: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Address Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    }, // non mandatory
    ContactNo: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(ContactNo field Accepts Numeric values only)",
      ValidationFun: IsNumeric,
    }, // non mandatory
    Age: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Age field Accepts Numeric values only)",
      ValidationFun: IsNumeric,
    }, // non mandatory
    SumInsured: {
      mandatory: true,
      mandatoryErrMes: "(Sum Insured is Mandatory field)",
      validationErrMes: () => "(SumInsured Accepts Numeric Value greater than zero only)",
      ValidationFun: IsNumericGreaterThanZero,
    }, // mandatory
    // "Rate(%)": {
    //   mandatory: false,
    //   mandatoryErrMes: "",
    //   validationErrMes: () => "",
    // },
    // "Premium Amount": {
    //   mandatory: false,
    //   mandatoryErrMes: "",
    //   validationErrMes: () => "",
    // },
  };

  const handleUploadArrData = ({ excelData, ws, data }) => {
    const obj1 = {
      RowId: "row_id",
      ColumnInfo: { ...ColumnInfo },
      ExcelData: excelData,
      WorkSheetObject: ws,
      ClearErrorData: true,
    };
    // masters1.flag.backdropflag = true;
    // setMasters({ ...masters1 });
    console.log("excelData111111", excelData);
    const res = GenericBulkUploadValidation(obj1);
    // console.log("....", res);

    if (res.status === 1) {
      // masters1.flag.backdropflag = false;
      // setMasters({ ...masters1 });

      swal2.fire({
        icon: "error",
        html: `<br>Invalid Upload</br> 
    <br>Incorrect Column Headers</br>`,
        confirmButtonColor: "#0079CE",
      });
    } else if (res.status === 2) {
      // masters1.flag.backdropflag = false;
      // setMasters({ ...masters1 });

      swal2.fire({ icon: "error", text: "Invalid Upload", confirmButtonColor: "#0079CE" });
    } else if (res.status === 3) {
      res.successRecord.forEach((x, i) => {
        // res.successRecord[i].id = i;
        if (x.NoofPersons === undefined) {
          res.successRecord[i].NoofPersons = "1";
        }
        // objectPath.set(lDto, `InsurableItem.0.RiskItems.${i}.FormatedSumInsured`, x.SumInsured);
        // objectPath.set(lDto, `Temp.Upload.${i}.FormatedSumInsured`, x.SumInsured);
        setSuccessRec([...res.successRecord]);
      });

      const SumInsured = [];
      let TotalSumInsured = 0;
      res.successRecord.forEach((x) => {
        SumInsured.push(x.SumInsured);
      });
      for (let i = 0; i < SumInsured.length; i += 1) {
        TotalSumInsured += SumInsured[i];
      }
      objectPath.set(lDto, "TotalSumInsured", TotalSumInsured);
      objectPath.set(
        lDto,
        "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
        formater.format(TotalSumInsured)
      );
      objectPath.set(lDto, "TotalNumberofPerson", res.successRecord.length);
      setSuccessRec([...res.successRecord]);
      setFailureRec([...res.failureRecord]);
      // if (Number(TotalSumInsured) < 50000000) {
      if (res.successRecordCount === res.noOfRecordsUploaded) {
        swal2
          .fire({
            // icon: "success",
            html: `<div style={{display:"flex"}}><table style="width:100%">
      <img src=${successanimation} alt="success">
     <td style="text-align:center;"><b> Total<br> Records</br>
     <br><b style="color:blue;font-size:20px;">${res.noOfRecordsUploaded} </b></br></td>
    <td style="text-align:center;">
     <b>Records Uploaded<br>Successfully</br></b><br>
     <b style="color:green;font-size:20px;">${res.successRecordCount}</b></br></td>
    </table></div>`,
            showConfirmButton: true,
            confirmButtonText: "Continue",
            confirmButtonColor: "#006400",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              objectPath.set(lDto, "InsurableItem.0.RiskItems", res.successRecord);
              objectPath.set(lDto, "Temp.Upload", res.successRecord);
              objectPath.set(
                lDto,
                `InsurableItem.0.RiskItems.0.DirectDiscount`,
                lDto.InsurableItem[0].DirectDiscount
              );
              if (res.successRecord.length === 1) {
                objectPath.set(lDto, `InsurableItem.0.RiskItems.0.TypeofInsurance`, "Individual");
              } else {
                objectPath.set(
                  lDto,
                  `InsurableItem.0.RiskItems.0.TypeofInsurance`,
                  lDto.InsurableItem[0].TypeofInsurance
                );
              }
              setDto({ ...lDto });
              // handlePremium(res.successRecord);
            }
          });
      } else {
        swal2
          .fire({
            // icon: "success",
            html: `<div><table style="width:100%">
          <img src=${successanimation} alt="success"><br>
          <td style="text-align:center;"><b>${
            lDto.InsurableItem[0].RiskItems.length === 0 ? "Total Records" : "Revised Total Records"
          }</b>
          <br><b style="color:blue;font-size:20px;">${data.length}</b></br></td>
          <td style="text-align:center;">
          <b>Records Uploaded Successfully </b><br>
          <b style="color:green;font-size:20px;"> ${
            // dto.InsurableItem[0].RiskItems.length !== 0
            //   ?
            Number(res.successRecordCount)
            // + 1 -
            //   Number(dto.InsurableItem[0].RiskItems.length)
            // : res.successRecordCount
          }</b></br></td>
          <td style="text-align:center;"><b>Failed Records</b>
          <br><b style="color:red;font-size:20px;"> ${res.failureRecordCount}</b></br></td>
        </br></table></div>
          <div style="text-align:center;" >
          <br><p style="font-size:70%"><b>Download Error log</b> to re-upload failed records OR click on <b>Continue</b> to proceed with existing records</p></br>
          </div>`,
            showConfirmButton: true,
            confirmButtonText: "Download Error Log",
            cancelButtonText: "Continue",
            confirmButtonColor: "#b22222",
            cancelButtonColor: "#006400",
            showCancelButton: true,
            allowOutsideClick: false,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              objectPath.set(lDto, "InsurableItem.0.RiskItems", res.successRecord);
              objectPath.set(lDto, "Temp.Upload", res.successRecord);
              setDto({ ...lDto });
              onFailureRecords(res.failureRecord);
              // handlePremium(res.successRecord);
            } else {
              // if (res.successRecord.length > 0) {
              objectPath.set(lDto, "InsurableItem.0.RiskItems", res.successRecord);
              objectPath.set(lDto, "Temp.Upload", res.successRecord);
              setDto({ ...lDto });
              // }
              // objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.Output", []);
              // handlePremium(res.successRecord);
            }
          });
      }
      // }
      // else {
      //   // objectPath.set(dto, "TotalSumInsured", "");
      //   // objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.TotalSumInsured", "");
      //   masters1.flag.backdropflag = false;
      //   setMasters({ ...masters1 });

      //   setSuccessRec([]);
      //   setFailureRec([]);
      //   swal2.fire({
      //     icon: "error",
      //     html: `Maximum Sum Insured limit is 5 Crores`,
      //     confirmButtonColor: "#0079CE",
      //   });
      // }
    }
  };
  const onUploadArr = async (files1) => {
    const files = files1;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(files.target.files[0]);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws);
      // let SuccessRec1 = [];
      if (lDto.InsurableItem[0]?.RiskItems[0]?.Name === "") {
        SuccessRec1 = SuccessRec;
      } else {
        SuccessRec1 = lDto.InsurableItem[0]?.RiskItems;
      }
      const excelData = [...SuccessRec1, ...data];

      console.log("datadatadata", excelData);
      if (lDto.InsurableItem[0].TypeofInsurance === "Individual" && excelData.length === 1) {
        handleUploadArrData({ excelData, ws, data });
        setSuccessRec1 = setSuccessRec;
        // SuccessRec1 = SuccessRec;
      }
      if (lDto.InsurableItem[0].TypeofInsurance === "Individual" && excelData.length > 1) {
        swal2.fire({
          icon: "error",
          text: "For Individual Insurance only one person is allowed to take the insurance",
        });
      }
      if (lDto.InsurableItem[0].TypeofInsurance === "Group" && excelData.length > 0) {
        handleUploadArrData({ excelData, ws, data });
        setSuccessRec1 = setSuccessRec;
      }
    };
    // masters1.flag.backdropflag = false;
    // setMasters({ ...masters1 });

    const inputElement = document.getElementById("fileInput");
    if (inputElement) {
      // console.log(1212, inputElement);
      inputElement.value = "";
    }
    files.target.value = "";
  };
  useEffect(() => {
    if (SuccessRec1.length === 0 && lDto?.InsurableItem[0]?.RiskItems[0]?.Name === "") {
      setSuccessRec([]);
    }
  }, [SuccessRec.length > 0]);
  const Navigate = useNavigate();
  const onModalclose = () => {
    Navigate("/retail/home");
  };

  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = lDto.ProposerDetails.EmailId;
      let Class = "";
      Class = "";

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
    const proposalNo = objectPath.get(lDto, "proposalNo");

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
      await SavepolicyWFStatus(genericInfo.ProposalNo, lDto.ProductCode, obj);
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
      await SavepolicyWFStatus(genericInfo.ProposalNo, lDto.ProductCode, a);
    } else {
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SavepolicyWFStatus(proposalNo, lDto.ProductCode, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SavepolicyWFStatus(proposalNo, lDto.ProductCode, a);
    }
    handleModalOpen();
    // }
  };

  const onSaveModalClose = async () => {
    if (genericInfo && genericInfo.ProposalNo !== undefined) {
      lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
      await UpdateProposalDetails(lDto).then(async () => {
        lDto.ProposerDetails = [lDto.ProposerDetails];
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
        .then((result) => {
          if (result.isConfirmed) {
            Navigate("/retail/home");
          }
        });
      setDto({ ...lDto });
    }
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
    // let Class = "";

    // Class = "";

    const proposalNo = objectPath.get(lDto, "proposalNo");
    const downloadDTO = {
      key: lDto.proposalNo,
      keyValue: "",
      templateKey: "",
      templateId: "410",
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      if (result?.status === 200) {
        generateFile(result?.data, proposalNo);
      }
    });
    if (key === "SAVE DEBIT NOTE") {
      onSaveModalClose();
    }
  };

  let data = [];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Doc Type(PolicyType)",
            visible: true,
            options: masters.DocType,
            value: "Fresh",
            disableOnReset: true,
            disabled: true,
            required: true,
            path: "DocType",
          },
          {
            type: "Input",
            label: "Department",
            visible: true,
            required: true,
            path: "Department",
            value: "Miscellaneous",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Class",
            visible: true,
            required: true,
            value: "Accidental Insurance",
            path: "Class",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Premium Type",
            visible: true,
            required: true,
            path: "PremiumType",
            value: "Normal",
            // options: masters.PremiumType,
            // customOnChange: (e, a) => OnPremiumSelect(e, a),
            InputProps: { disabled: true },
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Period",
            visible: lDto.PremiumType === "Short Period",
            required: true,
            options: masters.Period,
            path: "Period",
            // customOnChange: (e, a) => Period(e, a),
          },

          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: true,
            required: true,
            path: "PolicyStartDate",
            dateFormat: "m/d/Y",
            minDate: PolicyStartDateMinDate(),
            maxDate: PolicyStartDateMaxDate(),
            customOnChange: (e, d) => handlePolicy(e, d),
          },
          {
            type: "Input",
            label: "No of days",
            visible: true,
            required: true,
            path: "NumberofDays",
            onChangeFuncs: [IsNumericGreaterThanZero],
            onBlurFuncs: [handleNumberofDaysVal],
            customOnChange: (e) => handlePolicyNumberDates(e),
            InputProps: { maxLength: 3 },
          },

          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            required: true,
            path: "PolicyEndDate",
            dateFormat: "m/d/Y",
            InputProps: { disabled: true },
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Business Type",
            visible: true,
            required: true,
            path: "BusinessType",
            value: "New Business",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "No of Persons",
            visible: true,
            required: true,
            path: "NoofPersons",
            // path: "InsurableItem.0.RiskItems.0.NoofPersons",
            onBlurFuncs: [IsNumericGreaterThanZero],
            onChangeFuncs: [IsNumeric],
            InputProps: { maxLength: 2 },
          },
          {
            type: "Input",
            label: "Sum Insured",
            visible: true,
            required: true,
            path: "SumInsured",
            // path: "InsurableItem.0.RiskItems.0.SumInsured",
            onBlurFuncs: [IsNumericGreaterThanZero],
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: true,
            required: true,
            options: masters.DirectDiscount,
            path: "InsurableItem.0.DirectDiscount",
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
            // customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
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
            // InputProps: { maxLength: 9 },
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
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            path: "Bankdetails.ProvinceorState",
            // options: lDto.Bankdetails.Country !== "" ? masters.State : [],
            required: true,
            disabled: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "State1"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: "Bankdetails.District",
            // options: lDto.Bankdetails.ProvinceorState !== "" ? masters.District1 : [],
            required: true,
            disabled: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "District1"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            disabled: true,
            path: "Bankdetails.Municipality",
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
            name: "BankAddressEnglish",
            disabled: true,
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
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
            path: "ProposerDetails.0.Name",
            onChangeFuncs: [IsAlphaNoSpace],
            paths: [
              { path: "ProposerDetails.0.PolicyHolderDetails.PolicyHolderName", value: "" },
              { path: "ProposerDetails.0.PolicyHolderDetails.Address", value: "" },
            ],
          },
          {
            type: "Input",
            label: "Designation",
            visible: true,
            path: "ProposerDetails.0.Designation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            path: "ProposerDetails.0.Occupation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.0.Address",
            onChangeFuncs: [IsFreetextNoSpace],
            paths: [
              { path: "ProposerDetails.0.PolicyHolderDetails.PolicyHolderName", value: "" },
              { path: "ProposerDetails.0.PolicyHolderDetails.Address", value: "" },
            ],
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
          //   {
          //     type: "Typography",
          //     label: "",
          //     visible: true,
          //     spacing: 2.5,
          //   },
          // {
          //   type: "Input",
          //   label: "Number of Insured",
          //   path: "NumberofInsured",
          //   visible: lDto.IsMultiKYCApplicable === "Yes",
          //   spacing: 2.5,
          //   customOnChange: (e) => OnADDMultiKYCDetailsnew(e),
          //   onChangeFuncs: [IsNumericGreaterThanone],
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
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "",
          },
          ...spreadMultiKYCDetails()[0],
        ],
        ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        // [
        //   {
        //     type: "AutoComplete",
        //     label: "Policy Holder Name",
        //     visible: true,
        //     path: "ProposerDetails.0.PolicyHolderDetails.PolicyHolderName",
        //     options: [
        //       { mValue: lDto.ProposerDetails[0].Name, address: lDto.ProposerDetails[0].Address },
        //       {
        //         mValue: lDto.ProposerDetails[0].InsuredNameEnglish,
        //         address: lDto.ProposerDetails[0].PermanentAdrress.AddressEnglish,
        //       },
        //     ],
        //     customOnChange: (e, a) => OnPolicyHolderName(e, a),
        //   },
        //   {
        //     type: "Input",
        //     label: "Address",
        //     visible: true,
        //     path: "ProposerDetails.0.PolicyHolderDetails.Address",
        //     onChangeFuncs: [IsAlphaNoSpace],
        //   },
        // ],
        [
          { type: "Typography", label: "Care of (English)", visible: true, spacing: 12 },
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: `ProposerDetails.0.CareofNameEnglish`,
            onChangeFuncs: [IsAlphaNoSpace],
            name: "CareofNameEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "ProposerDetails.0.CareofPANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            // InputProps: { maxLength: 9 },
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            path: "ProposerDetails.0.CareofContactNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: `ProposerDetails.0.CareofAddressEnglish`,
            onChangeFuncs: [IsFreetextNoSpace],
            name: "CareofAddressEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          { type: "Typography", label: "Care of (Nepali)", visible: true, spacing: 12 },
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.0.CareofNameNepali",
            onChangeFuncs: [IsAlphaNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.0.CareofAddressNepali",
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
            path: `ProposerDetails.0.ProprietorNameEnglish`,
            name: "ProprietorNameEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          {
            type: "Input",
            label: "Proprietor Name (Nepali)",
            visible: true,
            path: "ProposerDetails.0.ProprietorNameNepali",
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Subject Matter",
            visible: true,
            path: "ProposerDetails.0.SubjectMatter",
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
            type: "AutoComplete",
            label: "Type of Insurance",
            visible: true,
            required: true,
            options: masters.TypeofInsurance,
            path: "InsurableItem.0.TypeofInsurance",
            customOnChange: (e, a) => handleTypeofInsurance(e, a),
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: true,
            required: true,
            disableOnReset: true,
            options: masters.DirectDiscount,
            path: "InsurableItem.0.DirectDiscount",
            disabled: true,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
          },

          // {
          //   type: "Input",
          //   label: "Name",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Designation",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Citizenship No",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Address",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Contact No",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Age",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "No of Persons",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Sum Insured",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "General Description",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Warranties",
          //   visible: true,
          //   required: true,
          // },
          // {
          //   type: "Input",
          //   label: "Remarks",
          //   visible: true,
          //   required: true,
          // },

          {
            type: "Button",
            label: "Download Attachment",
            visible: true,
            spacing: 2.2,
            variant: "contained",
            onClick: () => downloadFile(),
          },
          {
            type: "Button",
            label: lDto?.InsurableItem[0]?.RiskItems[0]?.Name !== "" ? "Re-Upload" : "Upload",
            visible: true,
            startIcon: <MDBox component="img" src={excel} />,
            endIcon: masters1.flag.backdropflag && <CircularProgress size="20px" />,
            spacing: 2,
            variant: "outlined",
            component: "label",
            typeFormat: (
              <input hidden accept=".xlsx" type="file" id="fileInput" onChange={onUploadArr} />
            ),
          },
          {
            type: "Typography",
            label: "",
            spacing: 3.8,
            visible:
              lDto?.InsurableItem[0]?.RiskItems[0]?.Name !== "" &&
              lDto?.InsurableItem[0]?.RiskItems.length > 0,
          },
          {
            type: "Typography",
            label: "",
            spacing: 7.8,
            visible:
              lDto?.InsurableItem[0]?.RiskItems[0]?.Name === "" ||
              lDto?.InsurableItem[0]?.RiskItems.length === 0,
          },
          {
            type: "Custom",
            visible:
              lDto?.InsurableItem[0]?.RiskItems[0]?.Name !== "" &&
              lDto?.InsurableItem[0]?.RiskItems.length > 0,
            spacing: 3,
            return: (
              <Grid container justifyContent="flex-end">
                <MDInput
                  label="Search"
                  sx={{ width: "auto" }}
                  onChange={onSearchFilter}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ),
          },
          // {
          //   type: "Input",
          //   label: "Search",
          //   visible: lDto?.InsurableItem[0]?.RiskItems[0]?.Name !== "",
          //   customOnChange: (e) => onSearchFilter(e),
          //   InputProps: { endAdornment: <Search /> },
          //   value: e.target.value,
          // },
          {
            type: "Button",
            label: "Clear",
            visible:
              lDto?.InsurableItem[0]?.RiskItems[0]?.Name !== "" &&
              lDto?.InsurableItem[0]?.RiskItems.length > 0,
            spacing: 1,
            variant: "outlined",
            color: "error",
            onClick: () => onClear(),
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible:
              lDto?.InsurableItem[0]?.RiskItems[0]?.Name !== "" &&
              lDto?.InsurableItem[0]?.RiskItems.length > 0,
            rowId: "row_id",
            columns: [
              { field: "Name", headerName: "Name", width: 200 },
              { field: "Designation", headerName: "Designation", width: 200 },
              { field: "CitizenshipNo", headerName: "Citizenship No", width: 200 },
              { field: "Address", headerName: "Address", width: 200 },
              { field: "ContactNo", headerName: "Contact No", width: 200 },
              { field: "Age", headerName: "Age", width: 200 },
              { field: "SumInsured", headerName: "Sum Insured", width: 200 },
            ],
            checkboxSelection: true,
            path: "Temp.Upload",
            onSelectionModelChange: (row) => setRowSelectionModel(row),
            rowPerPage: 10,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 5,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#F0F0F0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                p={3}
              >
                <Typography variant="h6">Total Number Of Person</Typography>
                <Typography variant="h6">
                  {lDto?.TotalNumberofPerson !== undefined || lDto?.TotalNumberofPerson !== ""
                    ? lDto?.TotalNumberofPerson
                    : 0}
                </Typography>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 2,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 5,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#F0F0F0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                p={3}
              >
                <Typography variant="h6">Total Sum Insured</Typography>
                <Typography variant="h6">
                  रु {lDto?.TotalSumInsured ? formater.format(lDto.TotalSumInsured) : ""}
                </Typography>
              </MDBox>
            ),
          },
          {
            type: "Input",
            label: "General Description",
            visible: true,
            path: "InsurableItem.0.GeneralDescription",
          },
          {
            type: "Input",
            label: "Warrenties",
            visible: true,
            path: "InsurableItem.0.Warranties",
          },
          {
            type: "Input",
            label: "Remarks",
            visible: true,
            path: "InsurableItem.0.Remarks",
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
            // customOnChange: (e, a) => handleIssuingBranch(e, a, "IssuingBranch"),
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
            disabled: lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentCode"),
          },
          {
            type: "AutoComplete",
            label: "Agent Name ",
            visible: true,
            path: "Channel.AgentName",
            options: masters.Agent,
            disabled: lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Code",
            visible: true,
            path: "Channel.SubAgentCode",
            options: masters.SubAgent,
            disabled: lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes",
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgent"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Name",
            visible: true,
            path: "Channel.SubAgentName",
            disabled: lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes",
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
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>Basic Premium</Typography>
                    <Typography>Direct Discount</Typography>
                    <Typography>Premium after Direct Discount</Typography>
                    <Typography>Stamp Duty</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {formater.format(lDto?.PremiumDetails?.BasePremium)}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {formater.format(lDto?.PremiumDetails?.DirectDiscountAmt)}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {formater.format(lDto?.PremiumDetails?.PremiumAfterDirectDiscount)}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {formater.format(lDto.PremiumDetails?.StampDuty)}
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
                      <b>{formater.format(lDto?.PremiumDetails?.FinalPremium)}</b>
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
            visible: true,
          },
          {
            type: "Typography",
            label: "",
            spacing: 3,
            visible: true,
          },
          {
            type: "Custom",
            // required: true,
            visible: lDto.Channel.AgentCode !== "0000" && dto.Channel.AgentCode !== "",
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
                      <b>{formater.format(lDto?.PremiumDetails?.CommissionPercentage)}</b>
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      <b>{formater.format(lDto?.PremiumDetails?.CommissionAmount)}</b>
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
                // endIcon: "visibility",
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
  const handlePremium = async () => {
    if (lDto.Temp.Upload.length !== lDto.InsurableItem[0].RiskItems.length) {
      lDto.Temp.Upload = lDto.InsurableItem[0].RiskItems;
    }
    setDto({ ...lDto });
    await GenericApi("NepalAccidentalInsurance", "NepalAIRatingAPI", lDto).then(async (x) => {
      // debugger;
      if (x?.finalResult) {
        // console.log("Generic", x.finalResult);
        lDto.PremiumDetails = x.finalResult;
        lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
        lDto.FinalPremium = x.finalResult.FinalPremium;
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.FinalPremium",
          x.finalResult.FinalPremium
        );
        Object.keys(x.finalResult).forEach((key) => {
          // console.log("KEYSSS", `Key: ${key}`);
          if (typeof x.finalResult[key] === "object" && !Array.isArray(x.finalResult[key])) {
            // If the value is an object (not an array), iterate through its properties
            Object.keys(x.finalResult[key]).forEach((subKey) => {
              // console.log("SUB-KEYS", `  Sub-Key: ${subKey}`);
              if (Array.isArray(x.finalResult[key][subKey])) {
                // If the property is an array, iterate through its elements
                x.finalResult[key][subKey].forEach((element, index) => {
                  // console.log(`    Index: ${index}`);
                  // Access the properties of each array element
                  Object.keys(element).forEach((innerKey) => {
                    objectPath.set(
                      lDto,
                      `FormatedData.CalculatedPremiumDetails.${key}.${subKey}.${index}.${innerKey}`,
                      formater.format(element[innerKey]) === "NaN"
                        ? element[innerKey]
                        : formater.format(element[innerKey])
                    );
                    objectPath.set(
                      lDto,
                      `InsurableItem.0.RiskItems.${index}.formatedSumInsured`,
                      formater.format(dto.InsurableItem[0].RiskItems[index].SumInsured)
                    );
                    // console.log(
                    //   `      Inner-Key: ${innerKey}, Value: ${element[innerKey]}`
                    // );
                  });
                });
              } else {
                // If the property is not an array, directly access its value
                objectPath.set(
                  lDto,
                  `FormatedData.CalculatedPremiumDetails.${key}.${subKey}`,
                  formater.format(x.finalResult[key][subKey]) === "NaN"
                    ? x.finalResult[key][subKey]
                    : formater.format(x.finalResult[key][subKey])
                );
                // console.log(`    Value: ${x.finalResult[key][subKey]}`);
              }
            });
          } else {
            // If the value is not an object, directly access its value
            objectPath.set(
              lDto,
              `FormatedData.CalculatedPremiumDetails.${key}`,
              formater.format(x.finalResult[key]) === "NaN"
                ? x.finalResult[key]
                : formater.format(x.finalResult[key])
            );
            // console.log(`Value: ${x.finalResult[key]}`);
          }
        });
        lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
        await QuotationUpdate(lDto);
        lDto.ProposerDetails = [lDto.ProposerDetails];
        setDto({ ...lDto });
        setBackDropFlag(false);
        // fun = true;
        // return true;
      } else {
        swal2.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
        // fun = false;
      }
      return true;
    });
    console.log("....", fun);
    // return fun;
  };
  const CheckStatus = async () => {
    if (lDto.InsurableItem[0].RiskItems[0].Name !== "") {
      if (lDto.InsurableItem[0].TypeofInsurance === "Group") {
        await swal2
          .fire({
            icon: "warning",
            text: `Do you want to proceed with ${
              lDto.InsurableItem[0].RiskItems[0].Name !== ""
                ? lDto.InsurableItem[0].RiskItems.length
                : 0
            } Records`,
            showConfirmButton: true,
            confirmButtonText: "Cancel",
            cancelButtonText: "Continue",
            confirmButtonColor: "#b22222",
            cancelButtonColor: "#006400",
            showCancelButton: true,
            allowOutsideClick: false,
          })
          .then(async (rex2) => {
            if (rex2.isConfirmed) return false;
            await handlePremium();
            fun = true;
            return true;
          });
      } else {
        await handlePremium();
        fun = true;
        return true;
      }
    } else {
      swal2.fire({
        icon: "error",
        text: "Please upload the bulk data",
        confirmButtonColor: "#0079CE",
      });
    }
    return fun;
  };

  if (lDto !== null) {
    switch (activeStep) {
      case 0:
        setBackDropFlag(true);
        lDto.InsurableItem[0].RiskItems[0].SumInsured = lDto.SumInsured;
        lDto.InsurableItem[0].RiskItems[0].NoofPersons = lDto.NoofPersons;
        setDto({ ...lDto });
        fun = await GenericApi("NepalAccidentalInsurance", "NepalAIRatingAPI", lDto).then(
          async (x) => {
            // debugger;
            if (x?.finalResult) {
              // console.log("Generic", x.finalResult);
              lDto.PremiumDetails = x.finalResult;
              lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              const res1 = await SaveQuotation(lDto);
              // console.log(res1);
              lDto["Quotation No"] = res1.data.quotation.quoteNo;
              lDto.ProposerDetails = [lDto.ProposerDetails];
              setDto({ ...lDto });
              setBackDropFlag(false);
              const fun1 = await swal2
                .fire({
                  title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                  html: `<div style="display: flex; flex-direction: row;">
                  <div style="flex: 2; text-align: left; margin-left: 2rem" ">
                    <div>Gross Premium</div>
                    <div>Direct Discount</div>
                    <div>Stamp Duty</div>
                    
                    <div><b>Total Premium</b></div>
                  </div>
                  <div style="flex: 1.7; text-align: right; font-size: 16.3px; margin-right: 1rem;">
                    <div>रु</div>
                    <div>रु</div>
                    <div>रु</div>
                    <div><b>रु</b></div>
                  </div>
                  <div style="flex: 1.3; text-align: right; margin-right: 1rem;">
                    <div>${formater.format(x.finalResult.BasePremium)}</div>
                    <div>${formater.format(x.finalResult.DirectDiscountAmt)}</div>
                    <div>${formater.format(x.finalResult.StampDuty)}</div>
                    <div><b>${formater.format(x.finalResult.FinalPremium)}</b></div>
                  </div>
                </div>
                `,
                  showConfirmButton: true,
                  width: 450,
                  confirmButtonText: "Proceed",
                  confirmButtonColor: "#0079CE",
                  // showCa600ncelButton: true,
                  // cancelButtonColor: "#ef5350",
                  showCloseButton: true,
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
        break;
      case 1:
        if (lDto.Temp.Upload.length !== lDto.InsurableItem[0].RiskItems.length) {
          lDto.Temp.Upload = lDto.InsurableItem[0].RiskItems;
          setDto({ ...lDto });
          fun = true;
        }
        if (lDto.Temp.Upload.length === lDto.InsurableItem[0].RiskItems.length) {
          lDto.InsurableItem[0].RiskItems = lDto.Temp.Upload;
          setDto({ ...lDto });
          fun = true;
        }

        break;
      case 2:
        // if (lDto.InsurableItem[0].RiskItems[0].Name !== "") {
        fun = CheckStatus();
        // } else {
        //   swal2.fire({
        //     icon: "error",
        //     text: "Please upload the bulk data",
        //     confirmButtonColor: "#0079CE",
        //   });
        // }

        break;
      case 3:
        if (lDto.proposalNo === undefined) {
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          fun = await SaveCreateProposal(lDto).then(async (x) => {
            lDto.ProposerDetails = [lDto.ProposerDetails];
            if (x?.data?.proposalNumber) {
              await GetProductByCode("NepalAccidentalInsurance").then(async (x2) => {
                lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
                await GetProposalByNumber(x.data.proposalNumber, x2.data.productId).then((res) => {
                  if (res?.data[0]?.policyDetails?.KYCNo) {
                    lDto.KYCNo = res.data[0].policyDetails.KYCNo;
                    lDto.ProposerDetails = [lDto.ProposerDetails];
                    setDto({ ...lDto, proposalNo: x.data.proposalNumber });
                    fun = true;
                  } else {
                    setBackDropFlag(false);
                    swal2.fire({
                      icon: "error",
                      text: "Incurred an error please try again later",
                      confirmButtonColor: "#0079CE",
                    });
                  }
                });
              });
            } else {
              setBackDropFlag(false);
              swal2.fire({
                icon: "error",
                text: "Incurred an error please try again later",
                confirmButtonColor: "#0079CE",
              });
            }
            return fun;
          });
        } else if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          await UpdateProposalDetails(lDto).then(async (x) => {
            lDto.ProposerDetails = [lDto.ProposerDetails];
            setDto({ ...lDto });
            if (x?.data?.responseMessage === "Updated successfully") {
              await GetProductByCode("NepalAccidentalInsurance").then(async (x2) => {
                lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
                const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);
                lDto.ProposerDetails = [lDto.ProposerDetails];
                lDto.KYCNo = res.data[0].policyDetails.KYCNo;
                lDto.proposalNo = x.data.data.proposalNo;
                setDto({ ...lDto });
                // setBackDropFlag(false);
                fun = true;
              });
            } else {
              setBackDropFlag(false);
              swal2.fire({
                icon: "error",
                text: "Incurred an error please try again later",
                confirmButtonColor: "#0079CE",
              });
            }
          });
          return fun;
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
  // const SuccessRecSet = [];
  const onReset1 = (dto, setDto) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.ProposerDetails = [{ ...ProposerDetails() }];
    setDto({ ...lDto });
  };
  const onReset2 = (dto, setDto) => {
    const lDto = dto;
    lDto.InsurableItem[0].RiskItems = [RiskItems];
    lDto.TotalSumInsured = "";
    lDto.TotalNumberofPerson = 0;
    setSuccessRec1 = [];
    console.log("setSuccessRec1", setSuccessRec1);
    setDto({ ...lDto });
  };
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: {
          label: "Calculate Premium",
          visible: true,
          loader: "backDrop",
          endorsementLabel: "Proceed",
        },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: onReset1 },
        next: { label: "Next", visible: true, loader: "backDrop", endorsementLabel: "Proceed" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: onReset2 },
        next: { label: "Next", visible: true, loader: "backDrop", endorsementLabel: "Proceed" },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: true, loader: "backDrop", endorsementLabel: "Proceed" },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false, loader: "backDrop", endorsementLabel: "Proceed" },
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

const getMasterData = async ({ dto, setDto, additionalInformation, genericInfo }) => {
  const lDto = dto;
  const masters = {
    Salutation: [],
    Gender: [],
    Period: [],
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
    flag: {
      CancleIcon: false,
      Pan: false,
      DocType: false,
      ExistingDetails: false,
      ExistingDetails1: false,
      DocDublication: false,
      DataGriduploadFlag: false,
      backdropflag: false,
    },
  };
  // console.log("additionalInformation", additionalInformation, genericInfo);
  const userDetails = additionalInformation?.loginUserDetails;
  if (userDetails && userDetails?.displayName) {
    lDto.AgentName = userDetails?.displayName;
    lDto.AgentMobileNo = userDetails?.contactNumber;
    lDto.PolicyEndDate = addDays1(lDto?.PolicyStartDate, lDto?.NumberofDays);
    if (lDto?.ProductLogo === "") {
      lDto.ProductLogo = genericInfo.ProductLogo;
    }
    lDto.CompanyName = process.env.REACT_APP_CompanyName;
    lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
    lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
    lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;
    // lDto.PaymentAmount = lDto.FinalPremium;
  }
  await GetProdPartnermasterData("State", {}).then((r) => {
    masters.State = r.data;
  });
  await GetNPCommonMaster().then((r) => {
    r.forEach((x) => {
      masters[x.mType] = x.mdata;
    });
  });
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
    if (masters.IssuingBranch.length === 0) {
      await GetProdPartnermasterData("BranchName", {
        Description: masters.Company,
      }).then((res) => {
        masters.IssuingBranch = res.data;
        lDto.ICShortName = res.data[0].Description;
        setDto({ ...lDto });
      });
    }
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
