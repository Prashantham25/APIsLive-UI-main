import { useState, useEffect } from "react";
import {
  IsNumeric,
  // IsAlphaNum,
  // IsAlphaNoSpace,
  IsEmail,
  // IsNumaricSpecialNoSpace,
  IsNumaricSpecialNoSpace,
  IsFreetextNoSpace,
  // IsAlphaNumNoSpace,
  NumBetween,
  // IsAlpha,
  // All,
  // arrayRange,
  AgeCalculator,
  addDays1,
  IsMobileNumber,
  DateValidation1,
  DateFormatFromDateObject,
  // DateValidation,
} from "Common/Validations";
import {
  Grid,
  Stack,
  Typography,
  // Card,
  InputAdornment,
  CircularProgress,
  Checkbox,
  Button,
  // Divider,
  List,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { Search } from "@mui/icons-material";
import objectPath from "object-path";
import swal from "sweetalert2";
import swal1 from "sweetalert";
// import { DataGrid } from "@mui/x-data-grid";
import { read, utils } from "xlsx";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useNavigate } from "react-router-dom";
// import CircularProgress from "@mui/material/CircularProgress";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
// import VisibilityIcon from "@mui/icons-material/Visibility";

import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import excel from "assets/images/Nepal/excel.png";
import Success from "assets/images/Nepal/Success.png";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CowExcelDownload from "assets/images/Nepal/Cow_LivestockDetails_ExcelUpload.xlsx";
import PigExcelDownload from "assets/images/Nepal/Pig_LivestockDetails_ExcelUpload.xlsx";
import BuffaloExcelDownload from "assets/images/Nepal/Buffalo_LivestockDetails_ExcelUpload.xlsx";
import successanimation from "assets/images/Nepal/successanimation.gif";
import GenericBulkUploadValidation from "Common/GenericBulkUploadValidation";
import { useDataController, setGenericPolicyDto } from "../../../../../BrokerPortal/context";
import { AgriBPCJson, RiskItems } from "./data/Json/AgriLiveStockJson";
import PaymentPage from "../../Payment";
import {
  GetNPCommonMaster,
  GenericApi,
  Transliteration,
  DocumenUpload,
  DeleteDocument,
  SaveQuotation,
  // SaveCreateProposal,
  GetProdPartnermasterData,
  QuotationUpdate,
  SendNotification,
  UpdateProposalDetails,
  // DeduplicationByDistrictRefNo,
  // ExcelUpload,
} from "./data/APIs/AgriBPCApi";
import {
  SavepolicyWFStatus,
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  IsNumeric1,
  PolicyStartDateMinDate,
  PolicyStartDateMaxDate,
  NumberofDaysinYear,
  GetProductByCode,
} from "./data/APIs/MotorCycleApi";
import { UpdateWorkflowStatus, GetTemplatePayload, GetProposalByNumber } from "../../Payment/Apis";
import { BranchDetails, docDetails, InsuredDetails } from "./data/Json/CommercialJson";

let topDto = null;
let topDispatch = null;
const DataGridval = {
  SumInsured: false,
  NumberofCattle: false,
};
const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};
// let tArr11 = [];
let topGenericInfo = {};
const masters = {
  DocType: [],
  Department: [],
  Class: [],
  PremiumType: [],
  Period: [],
  BusinessType: [],
  Government: [],
  Category: [],
  Excess: [],
  DirectDiscount: [],
  BankNonBank: [],
  PaymentType: [],
  PaymentMode: [],
  OfflinePayment: [],
  TypeofCover: [],
  TypeofCoverFilter: [],
  YearofManufacture: [],
  BankCategory: [],
  Country: [],
  State: [],
  District: [],
  Municipality: [],
  State1: [],
  District1: [],
  Municipality1: [],
  State2: [],
  District2: [],
  Municipality2: [],
  State3: [],
  District3: [],
  Municipality3: [],
  State4: [],
  District4: [],
  Municipality4: [],
  WardNumber: [],
  KYCCategory: [],
  InsuredType: [],
  KYCRiskCategory: [],
  Occupation: [],
  IncomeSource: [],
  Gender: [],
  MaritalStatus: [],
  // IssueDistrict: [],
  MemberType: [],
  Status: [],

  Districtnew: [],
  Municipalitynew: [],
  // CitizenshipIssueDistrict: [],
  // District: [],
  // BranchName: [],
  // State: [],
  IssuingBranch: [],
  PlaceSelect: [
    {
      State: [],
      District: [],
      Municipality: [],
    },
  ],
  BankDetails: [],
  BankorFinancialInstituionNameinEnglish: [],
  BranchMasters: [],
  FieldOfficer: [],
  SubFieldOfficer: [],
  AgentCode: [],
  SubAgentCode: [],
};
const m = {
  SubClass: [],
  // SubClassShortCode: "",
};
// let tArr1 = [];
// let topMasters = {};
const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const getProcessSteps = () => {
  const steps = [
    "Quote Details",
    "Customer Details",
    "Livestock Details",
    "Risk Details",
    "Nominee Details",
    "Premium Summary",
    "Payment",
  ];
  return steps;
};

const getPageContent = (activeStep) => {
  const [flag, setFlag] = useState({
    ProposerDetails: false,
    InsuredDetails: false,
    IndividualInformation: false,
    CareOfDetails: false,
    ProprietorDetails: false,
    OtherDetails: false,
    BankFinancial: false,
    BranchDetails: false,
    MemberDetail: false,
  });
  const [control] = useDataController();
  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;

  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push({
        name: `Branch Details ${i + 1}`,
        visible:
          objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution" &&
          objectPath.get(dto, "Bankdetails.BankCategory") !== "" &&
          objectPath.get(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish") !== "",
      });
    });
    // console.log("spredarray1", arr);
    return arr;
  };

  useEffect(() => {
    if (objectPath.get(dto, "FinancingType") === "Direct") {
      flag.BankFinancial = false;
      flag.BranchDetails = false;
      flag.CareOfDetails = true;
      flag.ProprietorDetails = true;
      flag.InsuredDetails = true;
      flag.OtherDetails = true;
      flag.ProposerDetails = true;
    }
    if (objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution") {
      flag.BankFinancial = true;
      flag.BranchDetails = true;
      flag.CareOfDetails = true;
      flag.ProprietorDetails = true;
      flag.InsuredDetails = true;
      flag.OtherDetails = true;
      flag.ProposerDetails = true;
    }

    const IST = objectPath.get(dto, "ProposerDetails.InsuredType");

    if (IST !== undefined && IST !== "") {
      if (objectPath.get(dto, "ProposerDetails.InsuredType") === "Individual") {
        flag.MemberDetail = false;
        flag.IndividualInformation = true;
      } else {
        flag.MemberDetail = true;
        flag.IndividualInformation = false;
      }
    }

    setFlag({ ...flag });
  }, [genericPolicyDto]);

  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Quote Details", visible: true },
        { name: "Cattle Details", visible: true },
        { name: "Owner Accidental Details", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "Customer Details", visible: true },
        {
          name: "Bank/Financial Institution Details",
          visible: objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        {
          name: "Branch Details 1",
          visible:
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution" &&
            objectPath.get(dto, "Bankdetails.BankCategory") !== "" &&
            objectPath.get(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish") !== "",
        },
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        {
          name: "Proposer Details",
          visible:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        {
          name: "Insured Details",
          visible:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        {
          name: "Individual Information",
          visible:
            objectPath.get(dto, "ProposerDetails.InsuredType") &&
            objectPath.get(dto, "ProposerDetails.InsuredType") === "Individual" &&
            (objectPath.get(dto, "FinancingType") === "Direct" ||
              objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution"),
        },
        {
          name: objectPath.get(dto, "ProposerDetails.InsuredType"),
          visible:
            objectPath.get(dto, "ProposerDetails.InsuredType") &&
            objectPath.get(dto, "ProposerDetails.InsuredType") !== "Individual" &&
            (objectPath.get(dto, "FinancingType") === "Direct" ||
              objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution"),
        },
        {
          name: "Care Of Details",
          visible:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        {
          name: "Proprietor Details",
          visible:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        {
          name: "Other Details",
          visible:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
      ];
      break;
    case 2:
      steps = [{ name: "Livestock Details", visible: true }];
      break;
    case 3:
      steps = [
        { name: "Issuing Branch Details", visible: true },
        { name: "Risk Details", visible: true },
      ];
      break;
    case 4:
      steps = [
        { name: "Owner Accidental Details", visible: true },
        { name: "Nominee Details", visible: true },
      ];
      break;
    case 5:
      steps = [{ name: "Premium Break-Up", visible: true }];
      break;
    case 6:
      steps = [{ name: "Payment Page", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

const getSectionContent = (activeStep) => {
  const [control, dispatch] = useDataController();
  const { genericPolicyDto, genericInfo, loginUserDetails } = control;
  let dto = genericPolicyDto;
  const Navigate = useNavigate();
  const [flag, setFlag] = useState({
    // CancleIcon: false,
    Pan: false,
    DocType: false,
    ExistingDetails: false,
    ExistingDetails1: false,
    DocDublication: false,
    Import: false,
    DataEntry: false,
    IsCattlePurchased: false,
    OnLivestockScreen: false,
    OnAdd: false,
    Individual: false,
    DataGriduploadFlag: false,
    DownloafAttachmentFlag: false,
    backdropflag: false,
    NumberofCattleVal: false,
    SumInsuredVal: false,
  });

  // const [docCountList, setDocCountList] = useState([
  //   {
  //     DocumentList: "",
  //     DocId: "",
  //     DocName: "",
  //     UploadDocDate: "",
  //     DocId: "",
  //   },
  // ]);
  const onAddDocument = () => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      const obj = {
        DocumentList: "",
        DocId: "",
        DocName: "",
        UploadDocDate: "",
      };
      dto.ProposerDetails.documentDetails.push(obj);
      // setDocCountList([...docCountList]);
      // objectPath.set(dto, "ProposerDetails.documentDetails", docCountList);
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const handleDocName = (e, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      if (e.target.name === "DocName") {
        // const nameRFeg = /^[a-zA-Z\s]+$/;
        if (IsFreetextNoSpace(e.target.value) === true) {
          // docCountList[index].DocName = e.target.value;
          // setDocCountList([...docCountList]);
          objectPath.set(dto, `ProposerDetails.documentDetails.${index}.DocName`, e.target.value);
          setGenericPolicyDto(dispatch, dto);
        }
      }
    }
  };

  const handleDublicateDoc = (e, DocName, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      const arr = objectPath.get(dto, "ProposerDetails.documentDetails");
      // console.log(arr);
      arr.forEach((x, i) => {
        if (x.DocName === DocName && i !== index && x.DocName !== "") {
          // docCountList[index].DocName = "";
          // setDocCountList([...docCountList]);
          objectPath.set(dto, `ProposerDetails.documentDetails.${index}.DocName`, "");
          setGenericPolicyDto(dispatch, dto);
          swal.fire({
            icon: "error",
            text: `"${DocName}" Already Exist`,
            confirmButtonColor: "#0079CE",
          });
        }
      });
    }
  };

  const onDocUplode = async (file, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      // const files = file;
      const formData = new FormData();
      formData.append("file", file, file.name);
      await DocumenUpload(formData).then((result) => {
        if (result.data[0].fileName !== null) {
          // docCountList[index].DocId = result.data[0].fileName;
          // setDocCountList([...docCountList]);
          objectPath.set(
            dto,
            `ProposerDetails.documentDetails.${index}.DocId`,
            result.data[0].fileName
          );
          setGenericPolicyDto(dispatch, dto);
        }
      });
      // const inputElement = document.getElementById("fileInput");
      // if (inputElement) {
      //   console.log(1212, inputElement);
      //   inputElement.value = "";
      // }
      // files.target.value = "";
    }
  };

  const handleFileUpload = async (event, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      await onDocUplode(event.target.files[0], index);
      const inputElement = document.getElementById("fileInput");
      const file1 = event;
      if (inputElement) {
        inputElement.value = "";
      }
      file1.target.value = "";
    }
  };

  const handleDocFileDelete = async (_e, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      const file = objectPath.get(dto, "ProposerDetails.documentDetails");
      await DeleteDocument(file).then((result) => {
        if (result.data.status === 5) {
          // docCountList[index].DocId = "";
          // setDocCountList([...docCountList]);
          objectPath.set(dto, `ProposerDetails.documentDetails.${index}.DocId`, "");
          setGenericPolicyDto(dispatch, dto);
        }
      });
    }
  };
  const handleDocDelete = (index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      // const deletedarray = docCountList.filter((_x, i) => i !== index);
      // setDocCountList([...deletedarray]);
      objectPath.del(dto, `ProposerDetails.documentDetails.${index}`);
      setGenericPolicyDto(dispatch, dto);
    }
  };

  // const [VacOther, setVacOther] = useState([
  //   {
  //     DocumentList: "",
  //     DocId: "",
  //     DocName: "",
  //     UploadDocDate: "",
  //     DocId: "",
  //   },
  // ]);
  const onAddVacOtherDocument = () => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      const obj = {
        DocumentList: "",
        DocId: "",
        DocName: "",
        UploadDocDate: "",
      };
      dto.InsurableItem[0].VaccinationandOtherDocuments.push(obj);
      // setVacOther([...VacOther]);
      // objectPath.set(dto, "InsurableItem.0.VaccinationandOtherDocuments", VacOther);
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const handleVacOtherDocName = (e, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      if (e.target.name === "DocName") {
        // const nameRFeg = /^[a-zA-Z\s]+$/;
        if (IsFreetextNoSpace(e.target.value) === true) {
          // VacOther[index].DocName = e.target.value;
          // setVacOther([...VacOther]);
          objectPath.set(
            dto,
            `InsurableItem.0.VaccinationandOtherDocuments.${index}.DocName`,
            e.target.value
          );
          setGenericPolicyDto(dispatch, dto);
        }
      }
    }
  };

  const handleVacOtherDublicateDoc = (e, DocName, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      const arr = objectPath.get(dto, "InsurableItem.0.VaccinationandOtherDocuments");
      // console.log(arr);
      arr.forEach((x, i) => {
        if (x.DocName === DocName && i !== index && x.DocName !== "") {
          // VacOther[index].DocName = "";
          // setVacOther([...VacOther]);
          objectPath.set(dto, `InsurableItem.0.VaccinationandOtherDocuments.${index}.DocName`, "");
          setGenericPolicyDto(dispatch, dto);
          swal.fire({
            icon: "error",
            text: `"${DocName}" Already Exist`,
            confirmButtonColor: "#0079CE",
          });
        }
      });
    }
  };

  const onVacOtherDocUplode = async (file, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      const files = file;
      const formData = new FormData();
      formData.append("file", file, file.name);
      await DocumenUpload(formData).then((result) => {
        if (result.data[0].fileName !== null) {
          // VacOther[index].DocId = result.data[0].fileName;
          // setVacOther([...VacOther]);
          objectPath.set(
            dto,
            `InsurableItem.0.VaccinationandOtherDocuments.${index}.DocId`,
            result.data[0].fileName
          );
          setGenericPolicyDto(dispatch, dto);
        }
      });
      const inputElement = document.getElementById("fileInput");
      if (inputElement) {
        console.log(1212, inputElement);
        inputElement.value = "";
      }
      files.target.value = "";
    }
  };

  const handleVacOtherFileUpload = async (event, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      await onVacOtherDocUplode(event.target.files[0], index);
    }
  };

  const handleVacOtherDocFileDelete = async (_e, index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      const file = objectPath.get(dto, "InsurableItem.0.VaccinationandOtherDocuments");
      await DeleteDocument(file).then((result) => {
        if (result.data.status === 5) {
          // VacOther[index].DocId = "";
          // setVacOther([...VacOther]);
          objectPath.set(dto, `InsurableItem.0.VaccinationandOtherDocuments.${index}.DocId`, "");
          setGenericPolicyDto(dispatch, dto);
        }
      });
    }
  };
  const handleVacOtherDocDelete = (index) => {
    if (
      (genericInfo.endorsementType === "Non-Financial Endorsement" &&
        genericInfo.endorsementCategory === "Name Transfer") ||
      genericInfo.Endorsement === undefined
    ) {
      // const deletedarray = VacOther.filter((_x, i) => i !== index);
      // setVacOther([...deletedarray]);
      objectPath.del(dto, `InsurableItem.0.VaccinationandOtherDocuments.${index}`);
      setGenericPolicyDto(dispatch, dto);
    }
  };

  const onUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      const formData = new FormData();
      formData.append("file", file, file.name);
      await DocumenUpload(formData);
      objectPath.set(dto, "ProposerDetails.ProfilePicture", file.name);
      setGenericPolicyDto(dispatch, dto);
    } else {
      swal.fire({
        icon: "error",
        text: "Accepts only JPEG or PNG formats",
      });
    }
    const inputElement = document.getElementById("fileInput");
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file.target.value = "";
    // setFlag({ ...flag, CancleIcon: true });
  };
  const onCancelClick = async () => {
    const file = objectPath.get(dto, "ProposerDetails.ProfilePicture");
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        objectPath.set(dto, "ProposerDetails.ProfilePicture", "");
        setGenericPolicyDto(dispatch, dto);
        // setFlag({ ...flag, CancleIcon: false });
      }
    });
  };

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
      let oText = "";

      if (iText !== "") {
        const res = await Transliteration(obj);
        oText = res[0].text;
      }
      // if (iText !== "") {
      if (varName === "InsuredNameEnglish")
        objectPath.set(dto, "ProposerDetails.InsuredNameNepali", oText);
      if (varName === "HusbandNameEnglish")
        objectPath.set(dto, "ProposerDetails.HusbandNameNepali", oText);
      if (varName === "WifeNameEnglish")
        objectPath.set(dto, "ProposerDetails.WifeNameNepali", oText);
      if (varName === "ResidenceEnglish")
        objectPath.set(dto, "ProposerDetails.CommunicationAddress.ResidenceNepali", oText);
      if (varName === "TempAddresEnglish")
        objectPath.set(dto, "ProposerDetails.CommunicationAddress.TempAddresNepali", oText);
      if (varName === "CityEnglish") objectPath.set(dto, "ProposerDetails.CityNepali", oText);
      if (varName === "TownEnglish") objectPath.set(dto, "ProposerDetails.TownNepali", oText);
      if (varName === "AddressEnglish3")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.AddressNepali", oText);
      if (varName === "AddressEnglish4")
        objectPath.set(dto, "ProposerDetails.PermanentAddressNepali", oText);
      if (varName === "GrandfatherNameEnglish")
        objectPath.set(dto, "ProposerDetails.GrandfatherNameNepali", oText);

      if (varName === "FatherNameEnglish1")
        objectPath.set(dto, "ProposerDetails.FatherNameNepali", oText);

      if (varName === "MemberNameEnglish")
        objectPath.set(dto, "ProposerDetails.MemberNameNepali", oText);
      if (varName === "DesignationEnglish")
        objectPath.set(dto, "ProposerDetails.DesignationNepali", oText);
      if (varName === "HusbandNameEnglish1")
        objectPath.set(dto, "ProposerDetails.HusbandNameNepali", oText);

      if (varName === "WifeNameEnglish1")
        objectPath.set(dto, "ProposerDetails.WifeNameNepali", oText);

      if (varName === "FatherNameEnglish")
        objectPath.set(dto, "ProposerDetails.FatherNameNepali", oText);

      if (varName === "GrandfatherNameEnglish1")
        objectPath.set(dto, "ProposerDetails.GrandfatherNameNepali", oText);
      if (varName === "PermanentAddressEnglish")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.PermanentAddressNepali", oText);
      if (varName === "TownEnglish1")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.TownNepali", oText);

      if (varName === "CityEnglish1")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.CityNepali", oText);
      if (varName === "TempAddresEnglish1")
        objectPath.set(dto, "ProposerDetails.CommunicationAddress.TempAddresNepali", oText);
      if (varName === "BankorFinancialInstituionNameinEnglish")
        objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinNepali", oText);
      if (varName === "AddressEnglishBank") objectPath.set(dto, "Bankdetails.AddressNepali", oText);

      if (varName === "AddressEnglish1")
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.AddressNepali`, oText);
      // if (varName === "VehicleNoEnglish")
      //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleNoNepali", oText);

      if (varName === "AddressEnglish0")
        objectPath.set(dto, "RiskAddressDetails.AddressNepali", oText);
      if (varName === "TemporaryAddressEnglish")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.TemporaryAddressNepali", oText);
      if (varName === "AddressEnglish2")
        objectPath.set(dto, "ProposerDetails.AddressNepali", oText);
      if (varName === "CareofNameEnglish")
        objectPath.set(dto, "ProposerDetails.CareofNameNepali", oText);
      if (varName === "CareofAddressEnglish")
        objectPath.set(dto, "ProposerDetails.CareofAddressNepali", oText);
      if (varName === "ProprietorNameEnglish")
        objectPath.set(dto, "ProposerDetails.ProprietorNameNepali", oText);
      if (varName === "GenderEnglish") objectPath.set(dto, "ProposerDetails.GenderNepali", oText);
      if (varName === "GenderEnglish1") objectPath.set(dto, "ProposerDetails.GenderNepali", oText);
      if (varName === "MaritalStatusEnglish")
        objectPath.set(dto, "ProposerDetails.MaritalStatusNepali", oText);
      if (varName === "MaritalStatusEnglish1")
        objectPath.set(dto, "ProposerDetails.MaritalStatusNepali", oText);
      // }
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const onAddBranchDetails = () => {
    dto.Bankdetails.BranchDetails.push({ ...BranchDetails() });

    // dto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails.push(BranchDetails);
    setGenericPolicyDto(dispatch, dto);
  };
  const onPlaceSelect = async (e, a, n, index) => {
    // if (n === "Country1") {
    //   if (a.mValue === "Nepal") {
    //     const b = await GetProdPartnermasterData("State", {});
    //     masters.State1 = b.data;
    //   } else {
    //     masters.State1 = [];
    //   }
    //   masters.District1 = [];
    //   masters.Municipality1 = [];
    //   objectPath.set(dto, "Bankdetails.Country", a.mValue);
    // }
    // if (n === "Country2") {
    //   if (a.mValue === "Nepal") {
    //     // console.log("a.mValue", a.mValue);
    //     // console.log("index", index);
    //     objectPath.set(
    //       dto,
    //       `Bankdetails.BranchDetails.${index}.Country`,
    //       a.mValue
    //     );
    //     const b = await GetProdPartnermasterData("State", {});
    //     masters.PlaceSelect[index].State = b.data;
    //     if (tArr11 && index !== 0) {
    //       tArr11[index - 1][2].options = b.data;
    //     }
    //     // console.log(`masters.PlaceSelect.${index}.State`, masters.PlaceSelect[index].State, index);
    //   } else {
    //     masters.PlaceSelect[index].State = [];
    //   }
    //   masters.PlaceSelect[index].District = [];
    //   masters.PlaceSelect[index].Municipality = [];
    // }
    // if (n === "Country3") {
    //   if (a.mValue === "Nepal") {
    //     const b = await GetProdPartnermasterData("State", {});
    //     masters.State3 = b.data;
    //   } else {
    //     masters.State3 = [];
    //   }
    //   masters.District3 = [];
    //   masters.Municipality3 = [];
    //   objectPath.set(
    //     dto,
    //     "ProposerDetails.Country",
    //     a.mValue
    //   );
    // }
    // if (n === "Country4") {
    //   if (a.mValue === "Nepal") {
    //     const b = await GetProdPartnermasterData("State", {});
    //     masters.State4 = b.data;
    //   } else {
    //     masters.State4 = [];
    //   }
    //   masters.District4 = [];
    //   masters.Municipality4 = [];
    //   objectPath.set(dto, "Country", a.mValue);
    // }
    if (n === "State1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        objectPath.set(dto, "Bankdetails.ProvinceorState", a.mValue);
        objectPath.set(dto, "Bankdetails.District", "");
        objectPath.set(dto, "Bankdetails.Municipality", "");
        masters.District1 = res.data;
        masters.Municipality1 = [];
      } else {
        objectPath.set(dto, "Bankdetails.ProvinceorState", "");
        objectPath.set(dto, "Bankdetails.District", "");
        objectPath.set(dto, "Bankdetails.Municipality", "");
      }
    }
    if (n === "District1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        objectPath.set(dto, "Bankdetails.District", a.mValue);
        objectPath.set(dto, "Bankdetails.Municipality", "");
        objectPath.set(dto, "Bankdetails.WardNumber", "");

        masters.Municipality1 = res.data;
      } else {
        objectPath.set(dto, "Bankdetails.District", "");
        objectPath.set(dto, "Bankdetails.Municipality", "");
        objectPath.set(dto, "Bankdetails.WardNumber", "");
        masters.Municipality1 = [];
      }
    }

    if (n === "State2") {
      if (a !== null) {
        masters.Districtnew = [];
        masters.Municipalitynew = [];
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.ProvinceState`, a.mValue);
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.District`, "");
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.Municipality`, "");
        masters.Districtnew = res.data;
      } else {
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.ProvinceState`, "");
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.District`, "");
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.Municipality`, "");
        masters.Districtnew = [];
        masters.Municipalitynew = [];
      }
    }
    if (n === "District2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.District`, a.mValue);
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.Municipality`, "");
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.WardNumber`, "");
        masters.Municipalitynew = res.data;
      } else {
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.District`, "");
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.Municipality`, "");
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.WardNumber`, "");
        masters.Municipalitynew = [];
      }
    }
    if (n === "State3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.ProvinceState", a.mValue);
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.District", "");
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.Municipality", "");
        masters.District3 = res.data;
        masters.Municipality3 = [];
      } else {
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.ProvinceState", "");
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.District", "");
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.Municipality", "");
        masters.District3 = [];
        masters.Municipality3 = [];
      }
    }
    if (n === "District3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.District", a.mValue);
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.Municipality", "");
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.WardNumber", "");
        masters.Municipality3 = res.data;
      } else {
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.District", "");
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.Municipality", "");
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.WardNumber", "");
        masters.Municipality3 = [];
      }
    }
    if (n === "State4") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        objectPath.set(dto, "RiskAddressDetails.ProvinceState", a.mValue);
        objectPath.set(dto, "RiskAddressDetails.District", "");
        objectPath.set(dto, "RiskAddressDetails.Municipality", "");
        masters.District4 = res.data;
        masters.Municipality4 = [];
      } else {
        objectPath.set(dto, "RiskAddressDetails.ProvinceState", "");
        objectPath.set(dto, "RiskAddressDetails.District", "");
        objectPath.set(dto, "RiskAddressDetails.Municipality", "");
        masters.District4 = [];
        masters.Municipality4 = [];
      }
    }
    if (n === "District4") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        objectPath.set(dto, "RiskAddressDetails.District", a.mValue);
        objectPath.set(dto, "RiskAddressDetails.Municipality", "");
        objectPath.set(dto, "RiskAddressDetails.WardNumber", "");
        masters.Municipality4 = res.data;
      } else {
        objectPath.set(dto, "RiskAddressDetails.District", "");
        objectPath.set(dto, "RiskAddressDetails.Municipality", "");
        objectPath.set(dto, "RiskAddressDetails.WardNumber", "");
        masters.Municipality4 = [];
      }
    }
    // tArr11 = [...tArr11];
    setGenericPolicyDto(dispatch, dto);
  };
  // console.log("tArr11", tArr11);

  const BranchJson = {
    BranchName: "",
    BranchManager: "",
    Email: "",
    Country: "Nepal",
    ProvinceState: "",
    District: "",
    Municipality: "",
    WardNumber: "",
    AddressEnglish: "",
    AddressNepali: "",
    Area: "",
    ToleStreetName: "",
    HouseNumber: "",
    PlotNumber: "",
    ContactPerson1: "",
    ContactPerson2: "",
    ContactPerson3: "",
    PhoneNumber: "",
    MobileNumber: "",
    FaxNumber: "",
  };
  const handleBankCategory = async (e, a, key) => {
    // console.log("aaaaa", a);
    if (key === "BankCategory") {
      if (a !== null) {
        objectPath.set(dto, "Bankdetails.BankCategory", a.mValue);
        const res = await GetProdPartnermasterData("BankDetails", {
          BankFinancialInstitution: a.fieldName,
        });
        masters.BankorFinancialInstituionNameinEnglish = res.data;
        masters.BranchMasters = [];
        objectPath.set(dto, "Bankdetails.BankCategorylabel", a.fieldName);
        objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish", "");
        objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinNepali", "");
        objectPath.set(dto, "Bankdetails.Country", "");
        objectPath.set(dto, "Bankdetails.ProvinceorState", "");
        objectPath.set(dto, "Bankdetails.Municipality", "");
        objectPath.set(dto, "Bankdetails.WardNumber", "");
        objectPath.set(dto, "Bankdetails.AddressEnglish", "");
        objectPath.set(dto, "Bankdetails.District", "");
        objectPath.set(dto, "Bankdetails.AddressNepali", "");
        dto.Bankdetails.BranchDetails.forEach((x, i) => {
          dto.Bankdetails.BranchDetails[i].AddressNepali = "";
          dto.Bankdetails.BranchDetails[i].AddressEnglish = "";
          dto.Bankdetails.BranchDetails[i].WardNumber = "";
          dto.Bankdetails.BranchDetails[i].Municipality = "";
          dto.Bankdetails.BranchDetails[i].District = "";
          dto.Bankdetails.BranchDetails[i].ProvinceState = "";
          dto.Bankdetails.BranchDetails[i].BranchName = "";
        });
        setGenericPolicyDto(dispatch, dto);
      } else {
        // masters.BankorFinancialInstituionNameinEnglish = [];
        objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish", "");
        objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinNepali", "");
        objectPath.set(dto, "Bankdetails.ProvinceorState", "");
        objectPath.set(dto, "Bankdetails.Country", "");
        objectPath.set(dto, "Bankdetails.Municipality", "");
        objectPath.set(dto, "Bankdetails.WardNumber", "");
        objectPath.set(dto, "Bankdetails.AddressEnglish", "");
        objectPath.set(dto, "Bankdetails.District", "");
        objectPath.set(dto, "Bankdetails.BankCategory", "");
        objectPath.set(dto, "Bankdetails.BankCategorylabel", "");
        objectPath.set(dto, "Bankdetails.AddressNepali", "");
        setGenericPolicyDto(dispatch, dto);
      }
    }
    if (key === "BankorFinancial") {
      if (a !== null) {
        objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish", a.mValue);
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.mValue }],
          };
          const res = await Transliteration(obj);
          objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinNepali", res[0].text);
        }
        objectPath.set(dto, "Bankdetails.Country", a.Country);
        objectPath.set(dto, "Bankdetails.ProvinceorState", a.Province);
        objectPath.set(dto, "Bankdetails.Municipality", a.Municipality);
        objectPath.set(dto, "Bankdetails.District", a.District);
        objectPath.set(dto, "Bankdetails.AddressEnglish", a.Address);
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.Address }],
          };
          const res = await Transliteration(obj);
          objectPath.set(dto, "Bankdetails.AddressNepali", res[0].text);
        }
        setGenericPolicyDto(dispatch, dto);
        const res = await GetProdPartnermasterData("BranchMasters", {
          BankFinancialInstitution: dto.Bankdetails.BankCategorylabel,
          Bankname: a.mValue,
        });
        masters.BranchMasters = res.data;
        console.log("masters.BranchMasters", masters.BranchMasters, masters.BranchMasters.length);
        setGenericPolicyDto(dispatch, dto);
      } else {
        objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish", "");
        objectPath.set(dto, "Bankdetails.Country", "");
        objectPath.set(dto, "Bankdetails.ProvinceorState", "");
        objectPath.set(dto, "Bankdetails.Municipality", "");
        objectPath.set(dto, "Bankdetails.WardNumber", "");
        objectPath.set(dto, "Bankdetails.AddressEnglish", "");
        objectPath.set(dto, "Bankdetails.District", "");
        objectPath.set(dto, "Bankdetails.AddressNepali", "");
        setGenericPolicyDto(dispatch, dto);
        masters.BranchMasters = [];
      }
    }
  };
  const handleFieldOfficerCode = async (e, a, key) => {
    if (key === "FieldOfficerCode") {
      if (a !== null) {
        dto.Channel.FieldOfficerCode = a.fieldName;
        dto.Channel.FieldOfficer = a.mValue;
      } else {
        dto.Channel.FieldOfficerCode = "";
        dto.Channel.FieldOfficer = "";
      }
    }
    if (key === "FieldOfficer") {
      if (a !== null) {
        dto.Channel.FieldOfficerCode = a.fieldName;
        dto.Channel.FieldOfficer = a.mValue;
      } else {
        dto.Channel.FieldOfficerCode = "";
        dto.Channel.FieldOfficer = "";
      }
    }
    if (key === "SubFieldOfficerCode") {
      if (a !== null) {
        dto.Channel.SubFieldOfficerCode = a.fieldName;
        dto.Channel.SubFieldOfficer = a.mValue;
      } else {
        dto.Channel.SubFieldOfficerCode = "";
        dto.Channel.SubFieldOfficer = "";
      }
    }
    if (key === "SubFieldOfficer") {
      if (a !== null) {
        dto.Channel.SubFieldOfficerCode = a.fieldName;
        dto.Channel.SubFieldOfficer = a.mValue;
      } else {
        dto.Channel.SubFieldOfficerCode = "";
        dto.Channel.SubFieldOfficer = "";
      }
    }
    if (key === "AgentCode") {
      if (a !== null) {
        dto.Channel.AgentCode = a.fieldName;
        dto.Channel.AgentName = a.mValue;
      } else {
        dto.Channel.AgentCode = "";
        dto.Channel.AgentName = "";
      }
    }
    if (key === "AgentName") {
      if (a !== null) {
        dto.Channel.AgentCode = a.fieldName;
        dto.Channel.AgentName = a.mValue;
      } else {
        dto.Channel.AgentCode = "";
        dto.Channel.AgentName = "";
      }
    }
    if (key === "SubAgent") {
      if (a !== null) {
        dto.Channel.SubAgentCode = a.fieldName;
        dto.Channel.SubAgentName = a.mValue;
      } else {
        dto.Channel.SubAgentCode = "";
        dto.Channel.SubAgentName = "";
      }
    }
    if (key === "SubAgentName") {
      if (a !== null) {
        dto.Channel.SubAgent = a.fieldName;
        dto.Channel.SubAgentName = a.mValue;
      } else {
        dto.Channel.SubAgent = "";
        dto.Channel.SubAgentName = "";
      }
    }
    setGenericPolicyDto(dispatch, dto);
  };

  const handleBranchName = async (e, a, i) => {
    if (a !== null) {
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.BranchName`, a.mValue);
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.Country`, a.Country);
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.ProvinceState`, a.Province);
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.District`, a.District);
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.Municipality`, a.Municipality);
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.AddressEnglish`, a.mValue);
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.WardNumber`, a.WardNo);
      if (process.env.NODE_ENV === "production") {
        const obj = {
          textList: [{ Text: a.mValue }],
        };
        const res = await Transliteration(obj);
        objectPath.set(dto, `Bankdetails.BranchDetails.${i}.AddressNepali`, res[0].text);
      }
    } else {
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.BranchName`, "");
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.Country`, "");
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.ProvinceState`, "");
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.District`, "");
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.Municipality`, "");
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.AddressEnglish`, "");
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.WardNumber`, "");
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.AddressNepali`, "");
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const RemoveBranchDetails = (i) => {
    const arr = dto.Bankdetails.BranchDetails.filter((x, i1) => i1 !== i);
    dto.Bankdetails.BranchDetails = arr;
    setGenericPolicyDto(dispatch, dto);
  };
  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
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
          onClick: () => RemoveBranchDetails(i),
        },
        {
          type: "AutoComplete",
          label: "Branch Name",
          required: true,
          visible: masters.BranchMasters.length > 0,
          options: masters.BranchMasters,
          value: `Bankdetails.BranchDetails.${i}.BranchName`,
          customOnChange: (e, a) => handleBranchName(e, a, i),
          // onChangeFuncs: [IsFreetextNoSpace],
          // onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Country",
          visible: masters.BranchMasters.length > 0,
          required: true,
          value: `Bankdetails.BranchDetails.${i}.Country`,
          disabled: true,
          disableOnReset: true,
          // options: masters.Country,
          // customOnChange: (e, a) => onPlaceSelect(e, a, "Country2", i + 1),
        },
        {
          type: "Input",
          label: "Province/State",
          required: true,
          visible: masters.BranchMasters.length > 0,
          value: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          disabled: true,
          // options: masters.State,
          // customOnChange: (e, a) => onPlaceSelect(e, a, "State2", i),
        },
        {
          type: "Input",
          label: "District",
          required: true,
          visible: masters.BranchMasters.length > 0,
          value: `Bankdetails.BranchDetails.${i}.District`,
          disabled: true,
          // options: masters.Districtnew,
          // customOnChange: (e, a) => onPlaceSelect(e, a, "District2", i),
        },
        {
          type: "Input",
          label: "Municipality",
          visible: masters.BranchMasters.length > 0,
          value: `Bankdetails.BranchDetails.${i}.Municipality`,
          disabled: true,
          // options: masters.Municipalitynew,
        },
        {
          type: "Input",
          label: "Ward Number",
          visible: masters.BranchMasters.length > 0,
          value: `Bankdetails.BranchDetails.${i}.WardNumber`,
          disabled: true,
        },
        {
          type: "Input",
          label: "Address(English)",
          visible: masters.BranchMasters.length > 0,
          required: true,
          name: "AddressEnglish1",
          value: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          disabled: true,
          // customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          // onChangeFuncs: [IsFreetextNoSpace],
          // onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Branch Name",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          value: `Bankdetails.BranchDetails.${i}.BranchName`,
        },
        {
          type: "AutoComplete",
          label: "Country",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          value: `Bankdetails.BranchDetails.${i}.Country`,
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
          value: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: masters.State,
          customOnChange: (e, a) => onPlaceSelect(e, a, "State2", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          required: true,
          visible: masters.BranchMasters.length === undefined,
          value: `Bankdetails.BranchDetails.${i}.District`,
          options: masters.Districtnew,
          customOnChange: (e, a) => onPlaceSelect(e, a, "District2", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          visible: masters.BranchMasters.length === undefined,
          value: `Bankdetails.BranchDetails.${i}.Municipality`,
          options: masters.Municipalitynew,
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          visible: masters.BranchMasters.length === undefined,
          value: `Bankdetails.BranchDetails.${i}.WardNumber`,
          options: masters.WardNumber,
        },
        {
          type: "Input",
          label: "Address(English)",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          name: "AddressEnglish1",
          value: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          onChangeFuncs: [IsFreetextNoSpace],
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Address(Nepali)",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.AddressNepali`,
          disabled: true,
        },
        {
          type: "Input",
          label: "Area",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.Area`,
          onChangeFuncs: [IsAlphaNoSpace],
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/StreetName",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          onBlurFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "House Number",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.HouseNumber`,
          // onChangeFuncs: [IsNumeric],
          onChangeFuncs: [IsFreetextNoSpace],
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Plot Number",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.PlotNumber`,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Contact person1",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.ContactPerson1`,
          onChangeFuncs: [IsAlphaNoSpace],
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact person2",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.ContactPerson2`,
          onChangeFuncs: [IsAlphaNoSpace],
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact person3",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.ContactPerson3`,
          onChangeFuncs: [IsAlphaNoSpace],
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Phone Number",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.PhoneNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
          onBlurFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Mobile Number",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.MobileNumber`,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
        },
        {
          type: "Input",
          label: "Fax Number",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.FaxNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
          onBlurFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Branch Manager",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.BranchManager`,
          onChangeFuncs: [IsFreetextNoSpace],
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Email ID",
          visible: true,
          value: `Bankdetails.BranchDetails.${i}.Email`,
          // onChangeFuncs: [IsEmail],
          onBlurFuncs: [IsEmail],
        },
      ]);
    });
    return arr;
  };

  const GenderNepali = [
    { mID: 1, mValue: "Male", translation: "पुरुष" },
    { mID: 2, mValue: "Female", translation: "महिला" },
    { mID: 3, mValue: "Others", translation: "अन्य" },
  ];
  const handleGender = (_e, a, n) => {
    if (n === "GenderEnglish") {
      objectPath.set(dto, "ProposerDetails.GenderEnglish", a.mValue);
      objectPath.set(dto, "ProposerDetails.GenderNepali", a.translation);
    } else if (n === "GenderEnglish1") {
      objectPath.set(dto, "ProposerDetails.GenderEnglish", a.mValue);
      objectPath.set(dto, "ProposerDetails.GenderNepali", a.translation);
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const MaritalStatus = [
    { mID: 1, mValue: "Unmarried", translation: "अविवाहित" },
    { mID: 2, mValue: "Married", translation: "विवाहित" },
    { mID: 3, mValue: "Divorced", translation: "विभाजक" },
    { mID: 4, mValue: "Widow", translation: "विधवा" },
  ];
  const handleMarital = (_e, a, n) => {
    if (n === "MaritalStatusEnglish") {
      objectPath.set(dto, "ProposerDetails.MaritalStatusEnglish", a.mValue);
      objectPath.set(dto, "ProposerDetails.MaritalStatusNepali", a.translation);
    } else if (n === "MaritalStatusEnglish1") {
      objectPath.set(dto, "ProposerDetails.MaritalStatusEnglish", a.mValue);
      objectPath.set(dto, "ProposerDetails.MaritalStatusNepali", a.translation);
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const onDOBselect = (e, d, n) => {
    const age = AgeCalculator(new Date(d));
    if (n === "InsuredDOB") {
      if (age < 16) {
        dto.ProposerDetails.DoB = [""];
        swal.fire({
          icon: "error",
          text: `Age of the Policy Holder must be above 16 Years.`,
        });
      } else {
        dto.ProposerDetails.DoB = d;
      }
    }
    if (n === "MemberDOB") {
      if (age < 16) {
        objectPath.set(dto, "ProposerDetails.DoB", [""]);
        setGenericPolicyDto(dispatch, { ...dto });
        swal.fire({
          icon: "error",
          text: `Age of the Policy Holder must be above 16 Years.`,
        });
      } else {
        objectPath.set(dto, "ProposerDetails.DoB", d);
      }
    }
    setGenericPolicyDto(dispatch, { ...dto });
  };

  // const OnSearch = async () => {
  //   const obj = {
  //     RefNo: objectPath.get(
  //       dto,
  //       "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber"
  //     ),
  //     IssueDistrict: objectPath.get(
  //       dto,
  //       "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipIssueDistrict"
  //     ),
  //   };
  //   await DeduplicationByDistrictRefNo(obj).then((result) => {
  //     if (result.data.status === 1) {
  //       swal.fire({
  //         icon: "success",
  //         text: "User is Existed",
  //       });
  //       const InsuredDetails = {
  //         ...result.data.data.additionalDetails.InsurableItem[0].RiskItems[0].KYCDetails
  //           .InsuredDetails,
  //       };
  //       objectPath.set(
  //         dto,
  //         "InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails",
  //         InsuredDetails
  //       );

  //       setGenericPolicyDto(dispatch, dto);
  //       flag.ExistingDetails1 = true;
  //       setFlag({ ...flag });
  //     } else {
  //       swal.fire({
  //         icon: "error",
  //         text: result.data.responseMessage,
  //       });
  //     }
  //   });
  // };
  // const [pageSize, setPageSize] = useState(1);
  // const [tableRows, setTableRows] = useState([]);
  // console.log(setTableRows);
  // const tableColumns = [
  //   { field: "Age", headerName: "Age", width: 230 },
  //   {
  //     field: "NumberofCattle",
  //     headerName: "Number Of Cattle",
  //     width: 200,
  //   },
  //   {
  //     field: "SumInsured",
  //     headerName: "SumInsured",
  //     width: 200,
  //   },
  //   {
  //     field: "Rate",
  //     headerName: "Rate(%)",
  //     width: 200,
  //   },
  //   {
  //     field: "PremiumAmount",
  //     headerName: "Premium Amount",
  //     width: 200,
  //   },
  // ];
  // const OnReset = () => {
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.IsCattlePurchased", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.PurchaseDate", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.PurchaseAmount", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.SymbolNumberorTagNumber", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.OtherCompanyTag", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.BreedCasteVariety", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.CurrentHealthStatus", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.FarmingType", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.Color", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.Height", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.Weight", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.AgeYear", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.AgeMonth", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.AgeDays", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.Remarks", "");
  //   objectPath.set(dto, "InsurableItem.0.RiskItems.0.SumInsured", "");

  //   setGenericPolicyDto(dispatch, dto);
  // };
  // const [Livestockrows, setLivestockRows] = useState([]);
  // const OnAdd = () => {
  //   const obj = objectPath.get(dto, "InsurableItem.0.RiskItems");
  //   flag.OnAdd = true;
  //   setFlag({ ...flag });
  //   Livestockrows.push(obj);
  //   setLivestockRows([...Livestockrows]);
  // };
  const handleDataGrid = (e) => {
    if (e.target.name === "SumInsured") {
      // const Regex = /^[0-9]*$/;
      if (IsNumeric1(e.target.value) === true) {
        flag.SumInsuredVal = false;
        DataGridval.SumInsured = false;
        setFlag({ ...flag });
        if (Number(e.target.value) < 50000000) {
          objectPath.set(dto, "Temp.DataGridValues.0.SumInsured", e.target.value);
          objectPath.set(dto, "InsurableItem.0.RiskItems.0.SumInsured", e.target.value);
          setGenericPolicyDto(dispatch, dto);
        } else {
          swal.fire({
            icon: "error",
            html: `Maximum Sum Insured limit is 5 Crores`,
            confirmButtonColor: "#0079CE",
          });
          objectPath.set(dto, "Temp.DataGridValues.0.SumInsured", "");
          objectPath.set(dto, "InsurableItem.0.RiskItems.0.SumInsured", "");
        }
      } else {
        flag.SumInsuredVal = true;
        setFlag({ ...flag });
      }
      dto.Temp.DataGridValues[0]["Premium Amount"] = "";
      dto.Temp.DataGridValues[0]["Rate(%)"] = "";
    }
    if (e.target.name === "NumberofCattle") {
      // const Regex = /^[0-9]*$/;
      if (IsNumeric1(e.target.value) === true) {
        flag.NumberofCattleVal = false;
        DataGridval.NumberofCattle = false;
        setFlag({ ...flag });
        objectPath.set(dto, "Temp.DataGridValues.0.NumberofCattle", e.target.value);
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.NumberofCattle", e.target.value);
        setGenericPolicyDto(dispatch, dto);
      } else {
        flag.NumberofCattleVal = true;
        setFlag({ ...flag });
      }
      dto.Temp.DataGridValues[0]["Premium Amount"] = "";
      dto.Temp.DataGridValues[0]["Rate(%)"] = "";
    }
  };
  const handleDataGridRegVal = () => {
    flag.SumInsuredVal = false;
    flag.NumberofCattleVal = false;
    setFlag({ ...flag });
  };
  console.log("flag.SumInsuredVal", flag.SumInsuredVal);

  const downloadFile = () => {
    const link = document.createElement("a");
    if (objectPath.get(dto, "SubClass") === "Cow") {
      link.download = "Cow_LivestockDetails_ExcelUpload";
      link.href = CowExcelDownload;
      link.click();
    }
    if (objectPath.get(dto, "SubClass") === "Pig") {
      link.download = "Pig_LivestockDetails_ExcelUpload";
      link.href = PigExcelDownload;
      link.click();
    }
    if (objectPath.get(dto, "SubClass") === "Buffalo") {
      link.download = "Buffalo_LivestockDetails_ExcelUpload";
      link.href = BuffaloExcelDownload;
      link.click();
    }
  };

  // const column = [
  //   "Symbol Number/Tag Number", // mandatory
  //   "Purpose of Usage", // mandatory
  //   "Name of Cattle", // non mandatory
  //   "Category", // mandatory
  //   "Breed/Caste/Variety", // mandatory
  //   "Farming Type", // mandatory
  //   "Color", // non mandatory
  //   "Height", // non mandatory
  //   "Weight", // non mandatory
  //   "Age - Year", //  mandatory
  //   "Age - Month", // mandatory
  //   "Age - Days", // mandatory
  //   "Remarks", // non mandatory
  //   "Current Health Status", //  mandatory
  //   "SumInsured", // mandatory
  //   // "Rate(%)",
  //   // "Premium Amount",
  //   "Other Company Tag", // non mandatory
  //   "Purchase Date", // non mandatory
  //   "Purchase Amount", // non mandatory
  // ];
  const onFailureRecords = (FailArray) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(FailArray);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${genericPolicyDto.SubClass} Incorrect Data${fileExtension}`);
  };
  // const [backdropflag, setBackDropFlag] = useState(false);
  const [SuccessRec, setSuccessRec] = useState([]);
  const [FailureRec, setFailureRec] = useState([]);
  console.log("FailureRec", FailureRec);
  console.log("SuccessRec", SuccessRec);
  const valInArray = (val, arr) => arr.includes(val);
  const CategoryValidation = (val, arr) => arr.includes(val);
  const ErrorTextmessage1 = (num, x) => {
    let text = "";
    if (NumBetween(parseInt(num, 10), 0, 12, true) !== true) {
      text = "(Age - Month Accepts numeric values from 0 to 12)";
    }
    if (
      NumBetween(parseInt(num, 10), 0, 12, true) === true &&
      x["Age - Year"] === 7 &&
      Number(num) !== 0
    ) {
      text = "(Age Should not exceed more then 7 years, Month should be 0)";
    }
    return text;
  };
  const ErrorTextmessage2 = (num, x) => {
    let text = "";
    if (NumBetween(parseInt(num, 10), 0, 31, true) !== true) {
      text = "(Age - Days Accepts numeric values from 0 to 31)";
    }
    if (NumBetween(parseInt(num, 10), 0, 31, true) === true && x["Age - Year"] === 7) {
      text = "(Age Should not exceed more then 7 years, Days should be 0 or empty)";
    }
    return text;
  };

  const AgeYearValidations1 = (num, x) => {
    let monthFlag = false;
    console.log("num1, x1", num, x, typeof num, x["Age - Year"]);
    if (x["Age - Year"] === 7 && parseInt(num, 10) === 0) {
      monthFlag = true;
    }
    if (NumBetween(parseInt(num, 10), 0, 12, true) && x["Age - Year"] < 7) {
      monthFlag = true;
    }
    return monthFlag;
  };
  const AgeYearValidations2 = (num, x) => {
    let daysFlag = false;
    if ((parseInt(num, 10) === 0 || num === "" || num === " ") && x["Age - Year"] === 7) {
      daysFlag = true;
    }
    if (NumBetween(parseInt(num, 10), 0, 31, true) && x["Age - Year"] < 7) {
      daysFlag = true;
    }
    return daysFlag;
  };
  const ColumnInfo = {
    "Symbol Number/Tag Number": {
      mandatory: true,
      mandatoryErrMes: "(Symbol Number/Tag Number field is Mandatory Field)",
      validationErrMes: () => "(Symbol Number/Tag Number field accepts Alphanumeric value only)",
      ValidationFun: IsAlphaNumNoSpace,
    }, // mandatory
    "Purpose of Usage": {
      mandatory: true,
      mandatoryErrMes: "(Purpose of Usage is Mandatory Field)",
      validationErrMes: () => "(Purpose of Usage Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    }, // mandatory
    "Name of Cattle": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Name of Cattle Doesn't allow empty space in Starting)",
      ValidationFun: IsAlphaNumNoSpace,
    }, // non mandatory
    Category: {
      mandatory: true,
      mandatoryErrMes: "(Category is Mandatory Field)",
      validationErrMes: () => `(Category Accept only ${genericPolicyDto.SubClass})`,
      ValidationFun: (val) => CategoryValidation(val, [`${genericPolicyDto.SubClass}`]),
    }, // mandatory
    "Breed/Caste/Variety": {
      mandatory: true,
      mandatoryErrMes: "(Breed/Caste/Variety is Mandatory Field)",
      validationErrMes: () => "(Breed/Caste/Variety filed accept Alpha Numeric value only)",
      ValidationFun: IsFreetextNoSpace,
    }, // mandatory
    "Farming Type": {
      mandatory: true,
      mandatoryErrMes: "(Farming Type is Mandatory Field)",
      validationErrMes: () => "(Farming Type Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    }, // mandatory
    Color: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Color Accepts alphabets value only)",
      ValidationFun: IsAlphaNoSpace,
    }, // non mandatory
    Height: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Height Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    }, // non mandatory
    Weight: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Weight Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    }, // non mandatory
    "Age - Year": {
      mandatory: true,
      mandatoryErrMes: "(Age - Year is Mandatory Field)",
      validationErrMes: () => "(Age - Year Accepts numeric values from 0 to 7)",
      ValidationFun: (num) => NumBetween(parseInt(num, 10), 0, 7, true),
    }, //  mandatory
    "Age - Month": {
      mandatory: true,
      mandatoryErrMes: "(Age - Month is Mandatory Field)",
      validationErrMes: (num, x) => ErrorTextmessage1(num, x),
      ValidationFun: (num, x) => AgeYearValidations1(num, x),
    }, // mandatory
    "Age - Days": {
      mandatory: false,
      mandatoryErrMes: "(Age - Days is Mandatory Field)",
      validationErrMes: (num, x) => ErrorTextmessage2(num, x),
      // '"(Age - Days Accepts numeric values from 1 to 31 )",
      ValidationFun: (num, x) => AgeYearValidations2(num, x),
      // (num) => NumBetween(parseInt(num, 10), 1, 31, true),
    }, // mandatory
    Remarks: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "",
    }, // non mandatory
    "Current Health Status": {
      mandatory: true,
      mandatoryErrMes: "(Current Health Status is Mandatory Field)",
      validationErrMes: () => "(Current Health Status Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    }, //  mandatory
    SumInsured: {
      mandatory: true,
      mandatoryErrMes: "(SumInsured is Mandatory Field)",
      validationErrMes: () => "(SumInsured Accepts Numeric Value greater than zero only)",
      ValidationFun: IsNumeric1,
    }, // mandatory
    "Rate(%)": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "",
    },
    "Premium Amount": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "",
    },
    "Other Company Tag": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Other Company Tag Accepts Yes or No Values only)",
      ValidationFun: (val) => valInArray(val, ["Yes", "No"]),
    }, // non mandatory
    "Purchase Date (DD-MMM-YY)": {
      mandatory: false,
      mandatoryErrMes: "",
      isDateField: true,
      validationErrMes: () => "(Purchase Date Invalid Date)",
      ValidationFun: DateValidation1,
    }, // non mandatory
    "Purchase Amount": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Purchase Amount Accepts Numeric Value Only)",
      ValidationFun: IsNumeric,
    }, // non mandatory
  };
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  console.log("rowSelectionModel", rowSelectionModel);

  const onClear = () => {
    // console.log(rowData, "rowData");
    // if (rowSelectionModel.length === 0) {
    //   objectPath.set(dto, "TotalSumInsured", "");
    //   objectPath.set(dto, "FormatedData", {});
    //   objectPath.set(dto, "InsurableItem.1.RiskItems", RiskItems);
    //   objectPath.set(dto, "Temp.Upload", []);
    //   setSuccessRec([]);
    //   setFailureRec([]);
    //   setGenericPolicyDto(dispatch, dto);
    //   flag.DataGriduploadFlag = false;
    //   setFlag({ ...flag });
    // } else {
    if (rowSelectionModel.length !== 0) {
      const filteredList = dto.Temp.Upload.filter(
        (item) => !rowSelectionModel.includes(item["Symbol Number/Tag Number"])
      );
      const FormatedDatafilteredList = dto.FormatedData.CalculatedPremiumDetails.Output.filter(
        (item) => !rowSelectionModel.includes(item["Symbol Number/Tag Number"])
      );
      setRowSelectionModel(filteredList);
      setSuccessRec([...filteredList]);
      dto.Temp.Upload = filteredList;
      dto.InsurableItem[0].RiskItems = filteredList;
      dto.FormatedData.CalculatedPremiumDetails.Output = FormatedDatafilteredList;
      const unformatedSumInsured = [];
      let TotalSumInsured = 0;
      filteredList.forEach((x) => {
        unformatedSumInsured.push(x.SumInsured);
      });
      for (let i = 0; i < unformatedSumInsured.length; i += 1) {
        TotalSumInsured += unformatedSumInsured[i];
      }
      objectPath.set(dto, "TotalSumInsured", TotalSumInsured);
      objectPath.set(
        dto,
        "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
        formater.format(TotalSumInsured)
      );
      setGenericPolicyDto(dispatch, { ...dto });
    }
    // }
  };
  const handlePremium = async (successRecord) => {
    if (successRecord.length === 0) {
      objectPath.set(dto, "InsurableItem.0.RiskItems", []);
      objectPath.set(dto, "Temp.Upload", []);
      objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.Output", []);
      setGenericPolicyDto(dispatch, dto);
    }
    if (successRecord.length !== 0) {
      // console.log("ddddd", successRecord, dto.InsurableItem[0].RiskItems);
      objectPath.set(dto, "InsurableItem.0.RiskItems", successRecord);
      objectPath.set(dto, "Temp.Upload", successRecord);
      objectPath.set(
        dto,
        "FormatedData.CalculatedPremiumDetails.TotalNumberofCattle",
        dto.InsurableItem[0].RiskItems.length
      );
      setGenericPolicyDto(dispatch, dto);
      // console.log("ddd11111111dd", successRecord, dto.InsurableItem[0].RiskItems);
      await GenericApi("NepalAgriLivestock", "NepalAgriLivestockCPBGapi", dto).then(async (x) => {
        if (x.finalResult) {
          if (x.finalResult.FinalPremium !== "") {
            objectPath.set(dto, "PremiumDetails", x.finalResult);
            objectPath.set(dto, "PaymentAmount", parseFloat(x.finalResult.FinalPremium).toFixed(2));
            objectPath.set(dto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
            // setBackDropFlag(false);

            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.FinalPremium",
              formater.format(x.finalResult.FinalPremium)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.BasePlusAccPremium",
              formater.format(x.finalResult.BasePlusAccPremium)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.RevisedAmountPDF",
              formater.format(x.finalResult.RevisedAmountPDF)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.TaxableAmount",
              formater.format(x.finalResult.TaxableAmount)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
              formater.format(x.finalResult.AccidentalPremium)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.StampDuty",
              formater.format(x.finalResult.StampDuty)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.PremiumafterSubsidy",
              formater.format(x.finalResult.PremiumafterSubsidy)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
              formater.format(x.finalResult.PremiumafterSubsidy)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.GovtSubsidyPremium",
              formater.format(x.finalResult.GovtSubsidyPremium)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.BasePremium",
              formater.format(x.finalResult.BasePremium)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
              formater.format(x.finalResult.PerPersonAccidentalPremium)
            );
            objectPath.set(
              dto,
              "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
              formater.format(x.finalResult.AccidentalPremium)
            );
            x.finalResult.NepalAgriCPBGRatingV2.output.forEach((x1, i) => {
              objectPath.set(
                dto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.AgriGeneralRateNew_Age`,
                x1.AgriGeneralRateNew_Age
              );
              objectPath.set(
                dto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.TotalSumInsured`,
                formater.format(x1.TotalSumInsured)
              );
              objectPath.set(
                dto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.BasePremium`,
                formater.format(x1.BasePremium)
              );
              objectPath.set(
                dto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.AgriGeneralRateNew`,
                x1.AgriGeneralRateNew
              );
              objectPath.set(
                dto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.AgriGeneralRateNew_SubClass`,
                x1.AgriGeneralRateNew_SubClass
              );
              objectPath.set(
                dto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.TotalNumberofCattle`,
                x1.TotalNumberofCattle
              );
              objectPath.set(dto, `Temp.Upload.${i}.Rate(%)`, "5%"); // x1.AgriGeneralRateNew
              objectPath.set(dto, `Temp.Upload.${i}.Premium Amount`, x1.BasePremium);
              objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.Rate(%)`, "5%");
              objectPath.set(
                dto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.Symbol Number/Tag Number`,
                dto.InsurableItem[0].RiskItems[i]["Symbol Number/Tag Number"]
              );
              objectPath.set(
                dto,
                `InsurableItem.0.RiskItems.${i}.formatedSumInsured`,
                formater.format(dto.InsurableItem[0].RiskItems[i].SumInsured)
              );
              objectPath.set(
                dto,
                `InsurableItem.0.RiskItems.${i}.SumInsured`,
                dto.InsurableItem[0].RiskItems[i].SumInsured
              );
              objectPath.set(
                dto,
                `InsurableItem.0.RiskItems.${i}.Premium Amount`,
                formater.format(x1.BasePremium)
              );
            });
            // objectPath.set(dto, "FormatedData.CalculatedPremiumDetails", x.finalResult);
            setGenericPolicyDto(dispatch, { ...dto });
            flag.DataGriduploadFlag = true;
            flag.backdropflag = false;
            setFlag({ ...flag });
          } else {
            onClear();
            flag.backdropflag = false;
            setFlag({ ...flag });
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
          }
        } else {
          onClear();
          flag.backdropflag = false;
          setFlag({ ...flag });
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
        }
      });
      setGenericPolicyDto(dispatch, dto);
      flag.backdropflag = false;
      // flag.DataGriduploadFlag = true;
      setFlag({ ...flag });
    } else {
      flag.backdropflag = false;
      setFlag({ ...flag });
    }
    flag.backdropflag = false;
    setFlag({ ...flag });
  };

  const OnBankNonBank = (e, a) => {
    if (a !== null) {
      dto.Bankdetails.BankorNonBank = a.mValue;
    } else {
      dto.Bankdetails.BankorNonBank = "";
    }
    dto.Bankdetails = {
      ...dto.Bankdetails,
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
    setGenericPolicyDto(dispatch, dto);
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
      const excelData = [...SuccessRec, ...data];
      console.log("datadatadata", excelData);
      const obj1 = {
        RowId: "Symbol Number/Tag Number",
        ColumnInfo: { ...ColumnInfo },
        ExcelData: excelData,
        WorkSheetObject: ws,
        ClearErrorData: true,
      };
      flag.backdropflag = true;
      setFlag({ ...flag });
      const res = GenericBulkUploadValidation(obj1);
      console.log("....", res);

      if (res.status === 1) {
        flag.backdropflag = false;
        setFlag({ ...flag });
        swal.fire({
          icon: "error",
          confirmButtonColor: "#0079CE",
          html: `<br>Invalid Upload</br> 
        <br>Incorrect Column Headers</br>`,
        });
      } else if (res.status === 2) {
        flag.backdropflag = false;
        setFlag({ ...flag });
        swal.fire({ icon: "error", confirmButtonColor: "#0079CE", text: "Invalid Upload" });
      } else if (res.status === 3) {
        res.successRecord.forEach((x, i) => {
          if (
            x["Age - Year"] !== undefined &&
            x["Age - Month"] !== undefined &&
            x["Age - Days"] !== undefined
          ) {
            res.successRecord[i].Age =
              Number(res.successRecord[i]["Age - Year"] * 365) +
              Number(res.successRecord[i]["Age - Month"] * 30) +
              Number(res.successRecord[i]["Age - Days"]);
            setSuccessRec([...res.successRecord]);
          }
          if (x.NumberofCattle === undefined) {
            res.successRecord[i].NumberofCattle = "1";
            setSuccessRec([...res.successRecord]);
          }
        });
        res.failureRecord.forEach((x, i) => {
          if (x.Age && x.Age !== undefined) {
            res.failureRecord[i].Age = "";
            setFailureRec([...res.failureRecord]);
          }
          if (x.NumberofCattle && x.NumberofCattle !== undefined) {
            res.successRecord[i].NumberofCattle = "";
            setFailureRec([...res.failureRecord]);
          }
          if (x["Rate(%)"] && x["Rate(%)"] !== undefined) {
            res.failureRecord[i]["Rate(%)"] = "";
            setFailureRec([...res.failureRecord]);
          }
          if (x["Premium Amount"] && x["Premium Amount"] !== undefined) {
            res.failureRecord[i]["Premium Amount"] = "";
            setFailureRec([...res.failureRecord]);
          }
        });
        const SumInsured = [];
        let TotalSumInsured = 0;
        res.successRecord.forEach((x) => {
          SumInsured.push(x.SumInsured);
        });
        for (let i = 0; i < SumInsured.length; i += 1) {
          TotalSumInsured += SumInsured[i];
        }
        objectPath.set(dto, "TotalSumInsured", TotalSumInsured);
        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
          formater.format(TotalSumInsured)
        );
        setSuccessRec([...res.successRecord]);
        setFailureRec([...res.failureRecord]);
        if (Number(TotalSumInsured) < 50000000) {
          if (res.successRecordCount === res.noOfRecordsUploaded) {
            swal
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
                  handlePremium(res.successRecord);
                }
              });
          } else {
            swal
              .fire({
                // icon: "success",
                html: `<div><table style="width:100%">
              <img src=${successanimation} alt="success"><br>
              <td style="text-align:center;"><b>${
                dto.InsurableItem[0].RiskItems.length === 0
                  ? "Total Records"
                  : "Revised Total Records"
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
                  objectPath.set(dto, "InsurableItem.0.RiskItems", res.successRecord);
                  objectPath.set(dto, "Temp.Upload", res.successRecord);
                  onFailureRecords(res.failureRecord);
                  handlePremium(res.successRecord);
                } else {
                  handlePremium(res.successRecord);
                }
              });
          }
        } else {
          objectPath.set(dto, "TotalSumInsured", "");
          objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.TotalSumInsured", "");
          flag.backdropflag = false;
          setFlag({ ...flag });
          setSuccessRec([]);
          setFailureRec([]);
          swal.fire({
            icon: "error",
            html: `Maximum Sum Insured limit is 5 Crores`,
            confirmButtonColor: "#0079CE",
          });
        }
      }
    };
    flag.backdropflag = false;
    setFlag({ ...flag });
    const inputElement = document.getElementById("fileInput");
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    files.target.value = "";
  };

  const onSearchFilter = (e) => {
    const GetData = dto.InsurableItem[0].RiskItems;
    const Data = GetData.filter(
      (item) =>
        item["Symbol Number/Tag Number"]
          .toString()
          .toUpperCase()
          .indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Purpose of Usage"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item["Name of Cattle"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item["Breed/Caste/Variety"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item.Category.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Age - Year"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Age - Month"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Age - Days"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Color.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Height.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Remarks.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Current Health Status"].toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.SumInsured.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Other Company Tag"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item["Purchase Date (DD-MMM-YY)"]
          .toString()
          .toUpperCase()
          .indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Purchase Amount"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    console.log("DAta", Data);
    objectPath.set(dto, "Temp.Upload", Data);
    // GetData = Data;
    setGenericPolicyDto(dispatch, dto);
  };
  // const handleNumberofOwnersPartners = (e) => {
  //   if (e.target.name === "NumberofOwnersPartners") {
  //     // const Regex = /^[0-9]*$/;
  //     if (IsNumeric1(e.target.value) === true) {
  //       objectPath.set(dto, "OwnerAccidentalDetails.NumberofOwnersPartners", e.target.value);
  //     }
  //   }
  //   if (e.target.value !== "") {
  //     const TASI = parseInt(e.target.value, 10) * 200000;
  //     objectPath.set(dto, "OwnerAccidentalDetails.TotalAccidentalSumInsured", TASI.toString());
  //     objectPath.set(
  //       dto,
  //       "FormatedData.CalculatedPremiumDetails.TotalAccidentalSumInsured",
  //       formater.format(TASI.toString())
  //     );
  //   }
  //   setGenericPolicyDto(dispatch, dto);
  // };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
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
  const onSaveModalClose = async () => {
    if (genericInfo && genericInfo.ProposalNo !== undefined) {
      await UpdateProposalDetails(dto).then(async () => {
        // objectPath.set(dto, "proposalNo", x.data.proposalNumber);
        // setGenericPolicyDto(dispatch, { ...dto });
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
      const proposalNo = objectPath.get(dto, "FormatedData.ProposalNumber");
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
          html: `<div> <img src=${Success} alt="success"><br>Debit Note Saved Successfully</br>${objectPath.get(
            dto,
            "proposalNo"
          )}</div>`,
          // icon: "success",
          // text: "Debit Note Saved Successfully",
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
    let Class = "";

    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Class = 182;
    }
    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      Class = 203;
    }

    const proposalNo = objectPath.get(dto, "proposalNo");
    const downloadDTO = {
      key: proposalNo,
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
  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = objectPath.get(dto, "ProposerDetails.EmailId");

      const obj = {
        proposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: objectPath.get(dto, "proposalNo"),
        keyType: "BGRProposal",
        communicationId: 190,
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
    }
  };
  const handleIssuingBranch = (e, a, key) => {
    if (key === "InsuredType") {
      if (a !== null) {
        dto.ProposerDetails.InsuredType = a.mValue;
        if (a.mValue === "Government body" || a.mValue === "Individual") {
          flag.Pan = false;
        } else {
          flag.Pan = true;
        }
        setFlag({ ...flag });
        dto.InsuredTypeCode = a.shortCode;
        if (dto.ProvinceCode !== undefined) {
          objectPath.set(
            dto,
            "Prefix",
            dto.ProvinceCode.concat("/", a.shortCode)
              .concat("/", dto.ShortCode, "/")
              .concat(",", dto.ProvinceCode)
              .concat("/", dto.ShortCode, "/")
          );
        }
        setGenericPolicyDto(dispatch, dto);
      } else {
        dto.ProposerDetails.InsuredType = "";
        dto.InsuredTypeCode = "";
        setGenericPolicyDto(dispatch, dto);
      }
    }
    if (key === "IssuingBranch") {
      if (a !== null) {
        dto.Channel.IssuingBranch = a.mValue;
        dto.ICShortName = a.Description;
        objectPath.set(
          dto,
          "Prefix",
          a.ProvinceCode.concat("/", dto.InsuredTypeCode)
            .concat("/", a.ShortCode, "/")
            .concat(",", a.ProvinceCode)
            .concat("/", a.ShortCode, "/")
        );
        objectPath.set(dto, "ProvinceCode", a.ProvinceCode);
        objectPath.set(dto, "ShortCode", a.ShortCode);
        // let ClassCode = "";
        // const Class = objectPath.get(dto, "Class");
        // if (Class !== "" && Class !== undefined) {
        //   ClassCode = m.SubClassShortCode;
        // }
        const BusinessTypeCode = objectPath.get(dto, "DocType").split("")[0];
        const FiscalYear = objectPath.get(dto, "Channel.FiscalYear");
        objectPath.set(
          dto,
          "PolicyPrefix",
          a.ProvinceCode.concat("/", a.ShortCode, "/", "AGR").concat(
            "/",
            dto.SubClassShortCode,
            "/",
            BusinessTypeCode,
            "/",
            FiscalYear,
            "/"
          )
        );
        objectPath.set(dto, "Suffix", "-".concat(FiscalYear, ","));
      } else {
        dto.Channel.IssuingBranch = "";
      }
    }

    setGenericPolicyDto(dispatch, dto);
  };
  const onModalclose = () => {
    Navigate("/retail/home");
  };

  const handleSavepolicyWFStatus = async () => {
    const proposalNo = objectPath.get(dto, "proposalNo");
    console.log("proposalNo", proposalNo);

    // if (genericInfo.proposalNo !== "" || genericInfo.proposalNo !== undefined) {
    // if (genericInfo.Flow && genericInfo.Flow === "DisApproveFlow") {
    //   // const obj = {
    //   //   Stage: "Proposal",
    //   //   Status: "307",
    //   //   WorkFlowType: "Agent",
    //   //   wfstageStatusId: "315",
    //   // };
    //   const obj = {
    //     Stage: "Proposal",
    //     Status: "323",
    //     WorkFlowType: "Agent",
    //     wfstageStatusId: "309",
    //   };
    //   await SavepolicyWFStatus(proposalNo, obj);
    //   const wfID = localStorage.getItem("wfIDforNepal");
    //   if (wfID !== null) {
    //     await UpdateWorkflowStatus(wfID, 263).then(() => {
    //       localStorage.removeItem("wfIDforNepal");
    //     });
    //   }
    // }

    if (genericInfo.Flow && genericInfo.Flow === "DebitFlow") {
      const a = {
        Stage: "Proposal",
        Status: "322",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);
      const wfID = localStorage.getItem("wfIDforNepal");
      if (wfID !== null) {
        await UpdateWorkflowStatus(wfID, 263).then(() => {
          localStorage.removeItem("wfIDforNepal");
        });
      }
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

  const PolicyStartDate = (e, d) => {
    objectPath.set(dto, "PolicyStartDate", d);
    // setGenericPolicyDto(dispatch, dto);
    // if (dto.NumberofDays === "") {
    //   objectPath.set(dto, "NumberofDays", NumberofDaysinYear(d.split("/")[2]));
    // }
    // setGenericPolicyDto(dispatch, dto);
    objectPath.set(
      dto,
      "PolicyEndDate",
      addDays1(objectPath.get(dto, "PolicyStartDate"), objectPath.get(dto, "NumberofDays"))
    );
    setGenericPolicyDto(dispatch, dto);
  };

  // const handleNumberofDays = (e) => {
  //   objectPath.set(dto, "NumberofDays", e.target.value);
  //   setGenericPolicyDto(dispatch, dto);
  // };

  useEffect(() => {
    if (genericPolicyDto) {
      const InsuredType = objectPath.get(dto, "ProposerDetails.InsuredType");
      if (InsuredType === "Individual") {
        flag.Individual = true;
      } else {
        flag.Individual = false;
      }
      // if (objectPath.get(dto, "ExistingDetails") === "Yes") {
      //   flag.ExistingDetails = true;
      // }
      // if (objectPath.get(dto, "ExistingDetails") === "No") {
      //   flag.ExistingDetails = false;
      //   flag.ExistingDetails1 = true;
      // }
      if (
        objectPath.get(dto, "PolicyStartDate") !== "" &&
        objectPath.get(dto, "PolicyStartDate") !== undefined &&
        objectPath.get(dto, "NumberofDays") !== "" &&
        objectPath.get(dto, "NumberofDays") !== undefined
      ) {
        if (
          NumBetween(
            objectPath.get(dto, "NumberofDays"),
            1,
            Number(
              NumberofDaysinYear(
                objectPath.get(dto, "PolicyStartDate"),
                objectPath.get(dto, "PolicyStartDate").split("/")[2]
              )
            ),
            1
          ) === true
        ) {
          objectPath.set(
            dto,
            "PolicyEndDate",
            addDays1(objectPath.get(dto, "PolicyStartDate"), objectPath.get(dto, "NumberofDays"))
          );
          setGenericPolicyDto(dispatch, dto);
        } else {
          swal.fire({
            icon: "error",
            text: `Number of days should be in between 1 to ${NumberofDaysinYear(
              objectPath.get(dto, "PolicyStartDate"),
              objectPath.get(dto, "PolicyStartDate").split("/")[2]
            )} days`,
            confirmButtonColor: "#0079CE",
          });
          objectPath.set(dto, "PolicyStartDate", DateFormatFromDateObject(new Date(), "m/d/y"));
          setGenericPolicyDto(dispatch, dto);
          objectPath.set(
            dto,
            "NumberofDays",
            NumberofDaysinYear(
              objectPath.get(dto, "PolicyStartDate"),
              objectPath.get(dto, "PolicyStartDate").split("/")[2]
            )
          );
          setGenericPolicyDto(dispatch, dto);
          objectPath.set(
            dto,
            "PolicyEndDate",
            addDays1(objectPath.get(dto, "PolicyStartDate"), objectPath.get(dto, "NumberofDays"))
          );
        }
      }

      if (objectPath.get(dto, "InsurableItem.0.RiskItems.0.IsCattlePurchased") === "Yes") {
        flag.IsCattlePurchased = true;
      } else {
        flag.IsCattlePurchased = false;
      }
      const InsuredNameEnglish = objectPath.get(dto, "ProposerDetails.InsuredNameEnglish");
      if (InsuredNameEnglish !== "") {
        objectPath.set(dto, "ProposerDetails.NameoftheOrganisation", InsuredNameEnglish);
      }
      const AddressEnglish = objectPath.get(dto, "ProposerDetails.PermanentAdrress.AddressEnglish");
      if (InsuredNameEnglish !== "") {
        objectPath.set(dto, "ProposerDetails.OrganizationAddress", AddressEnglish);
      }
      if (objectPath.get(dto, "FinancingType") === "Direct") {
        // objectPath.set(dto, "CountOfBranchDetails", "1");
        // objectPath.del(dto, `Bankdetails.BranchDetails`, dto.Bankdetails.BranchDetails.length > 1);
        objectPath.set(dto, `Bankdetails.BranchDetails`, [BranchJson]);
      }

      const NOP = objectPath.get(dto, "OwnerAccidentalDetails.NumberofOwnersPartners");
      if (NOP !== "" && NOP !== undefined) {
        const TASI = parseInt(NOP, 10) * 200000;
        objectPath.set(dto, "OwnerAccidentalDetails.TotalAccidentalSumInsured", TASI.toString());
        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.TotalAccidentalSumInsured",
          formater.format(TASI.toString())
        );
      }
      if (objectPath.get(dto, "Temp.Upload") === "") {
        dto.InsurableItem[0].RiskItems = RiskItems();
        objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.Output", []);
        objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.TotalSumInsured", "");
        setGenericPolicyDto(dispatch, dto);
        setSuccessRec([]);
        setFailureRec([]);
      }
      if (
        genericInfo.Flow &&
        (genericInfo.Flow === "DisApproveFlow" || genericInfo.Flow === "DebitFlow") &&
        SuccessRec.length === 0
      ) {
        setSuccessRec([...dto.Temp.Upload]);
      }

      setGenericPolicyDto(dispatch, dto);

      topDto = dto;
      topDispatch = dispatch;
      setFlag({ ...flag });
      setGenericPolicyDto(dispatch, dto);
    }
  }, [genericPolicyDto]);

  const [resetCount, setResetCount] = useState(0);
  useEffect(() => {
    if (
      activeStep === 0 &&
      objectPath.get(dto, "Temp.DataGridValues.0.SumInsured") !== undefined &&
      objectPath.get(dto, "Temp.DataGridValues.0.NumberofCattle") !== undefined
    ) {
      objectPath.set(dto, "InsurableItem.0.RiskItems", RiskItems());
      objectPath.set(
        dto,
        "InsurableItem.0.RiskItems.0.NumberofCattle",
        dto.Temp.DataGridValues[0].NumberofCattle
      );
      objectPath.set(
        dto,
        "InsurableItem.0.RiskItems.0.SumInsured",
        dto.Temp.DataGridValues[0].SumInsured
      );
    }
    if (
      activeStep === 2 &&
      objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") === undefined &&
      objectPath.get(dto, "Temp.Upload").length > 0
    ) {
      dto.InsurableItem[0].RiskItems = dto.Temp.Upload;
      setGenericPolicyDto(dispatch, dto);
    }
    if (
      activeStep === 2 &&
      objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !== undefined &&
      (objectPath.get(dto, "Temp.Upload").length === undefined ||
        objectPath.get(dto, "Temp.Upload").length === 0)
    ) {
      // console.log("dto.Temp0", dto.Temp.Upload.length > 0);
      dto.Temp.Upload = dto.InsurableItem[0].RiskItems;
      setGenericPolicyDto(dispatch, dto);
    }
    if (
      activeStep === 2 &&
      objectPath.get(dto, "InsurableItem.0.RiskItems").length >
        objectPath.get(dto, "Temp.Upload").length &&
      objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !== undefined
    ) {
      dto.Temp.Upload = dto.InsurableItem[0].RiskItems;
      setGenericPolicyDto(dispatch, { ...dto });
    }
  }, [activeStep]);
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[600]),
    backgroundColor: blue[600],
    "&:hover": {
      backgroundColor: blue[800],
    },
  }));

  useEffect(() => {
    if (genericInfo.reset) setResetCount(genericInfo.reset);
  }, [genericInfo]);

  useEffect(async () => {
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
        masters.IssuingBranch = res.data;
        dto.ICShortName = res.data[0].Description;
      });
      setGenericPolicyDto(dispatch, dto);
    }
  }, [localStorage.getItem("NepalCompanySelect")]);

  useEffect(async () => {
    if (masters.Gender.length === 0) {
      await GetNPCommonMaster().then((r) => {
        console.log(r, 2222);
        r.forEach((x) => {
          masters[x.mType] = x.mdata;
        });
      });
    }
    if (m.SubClass.length === 0) {
      await GetProdPartnermasterData("SubClass", { FieldName: "Livestock" }).then((r) => {
        console.log("r", r);
        m.SubClass = r.data;
        m.ShortCode = r;
      });
    }
    if (masters.State.length === 0) {
      const b = await GetProdPartnermasterData("State", {});
      masters.State = b.data;
      // const res0 = await GetProdPartnermasterData("FieldOfficer", { FieldOfficer: "" });
      // masters.FieldOfficer = res0.data;
      // const res1 = await GetProdPartnermasterData("SubFieldOfficer", { SubFieldOfficer: "" });
      // masters.SubFieldOfficer = res1.data;
      // const res2 = await GetProdPartnermasterData("Agent", { Agent: "" });
      // masters.AgentCode = res2.data;
      // const res3 = await GetProdPartnermasterData("SubAgent", { SubAgent: "" });
      // masters.SubAgentCode = res3.data;
    }
    const Details = objectPath.get(dto, "ProductCode"); //  Details
    if (Details === undefined || Details === "") {
      dto = AgriBPCJson();
      if (process.env.REACT_APP_AutoPopulateCustomerDetails === "true") {
        dto.FinancingType = "Direct";
        // dto.PolicyRiskCategory = "Low";
        // dto.AgriTechnicianName = "Agri Technician Name";
        // dto.AgriTechnicianAddress = "Agri Technician Address";
        objectPath.set(dto, "PolicyRiskCategory", "Low");
        objectPath.set(dto, "InsuredTypeCode", "BAN");
        objectPath.set(dto, "PermanentAdrress.AgriTechnicianName", "Agri Technician Name");
        objectPath.set(dto, "PermanentAdrress.AgriTechnicianAddress", "Agri Technician Address");
        dto.ProposerDetails = InsuredDetails;
      }
      objectPath.set(dto, "ProductCode", "NepalAgriLivestock");
      topGenericInfo = { ...genericInfo };
      setGenericPolicyDto(dispatch, dto);
    }

    const QuoteDetails = objectPath.get(dto, "Class"); // Quote Details
    if (QuoteDetails === undefined || QuoteDetails === "") {
      objectPath.set(dto, "DocType", "Fresh");
      objectPath.set(dto, "Department", "Agriculture");
      if ((genericInfo && genericInfo.Flow === undefined) || genericInfo.Flow === "") {
        m.SubClass = m.SubClass.filter((x) => x.mValue === genericInfo.SubClass);
        objectPath.set(dto, "Class", genericInfo.Class);
        objectPath.set(dto, "SubClass", m.SubClass[0].mValue);
        m.SubClassShortCode = m.SubClass[0].ShortCode;
        objectPath.set(dto, "SubClassShortCode", m.SubClass[0].ShortCode);
        objectPath.set(dto, "Product", "AgriBPC");
        objectPath.set(dto, "activeStep", 6);
        objectPath.set(
          dto,
          "prodlabel",
          `Agri Insurance / ${genericInfo.Class} / ${m.SubClass[0].mValue}`
        );
        objectPath.set(
          dto,
          "NumberofDays",
          NumberofDaysinYear(
            objectPath.get(dto, "PolicyStartDate"),
            objectPath.get(dto, "PolicyStartDate").split("/")[2]
          )
        );
        setGenericPolicyDto(dispatch, dto);
        objectPath.set(
          dto,
          "PolicyEndDate",
          addDays1(
            objectPath.get(dto, "PolicyStartDate"),
            NumberofDaysinYear(
              objectPath.get(dto, "PolicyStartDate"),
              objectPath.get(dto, "PolicyStartDate").split("/")[2]
            )
          )
        );
      }
      if (
        objectPath.get(dto, "Temp.DataGridValues") === undefined ||
        objectPath.get(dto, "Temp.DataGridValues") === ""
      ) {
        const TempData = [
          {
            NumberofCattle: objectPath.get(dto, "Temp.DataGridValues.0.NumberofCattle"),
            SumInsured: objectPath.get(dto, "Temp.DataGridValues.0.SumInsured"),
            "Premium Amount": objectPath.get(dto, "Temp.DataGridValues.0.Premium Amount"),
            "Rate(%)": objectPath.get(dto, "Temp.DataGridValues.0.Rate(%)"),
            rowID: 1,
          },
        ];
        objectPath.set(dto, "Temp.DataGridValues", TempData);
        objectPath.set(dto, "InsurableItem.0.RiskItems", RiskItems());
        setGenericPolicyDto(dispatch, dto);
      }
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.Category", genericInfo.SubClass);
      setGenericPolicyDto(dispatch, dto);
    }
    if (
      activeStep &&
      activeStep === 0 &&
      (objectPath.get(dto, "Temp.DataGridValues.0.NumberofCattle") === undefined ||
        objectPath.get(dto, "Temp.DataGridValues.NumberofCattle") === "") &&
      (objectPath.get(dto, "Temp.DataGridValues.0.SumInsured") === undefined ||
        objectPath.get(dto, "Temp.DataGridValues.0.SumInsured") === "")
    ) {
      objectPath.set(dto, "InsurableItem.0.RiskItems", RiskItems());
      objectPath.set(dto, "FormatedData.CalculatedPremiumDetails", {});
    }
    // if (
    //   activeStep === 0 &&
    //   objectPath.get(dto, "Temp.DataGridValues.0.SumInsured") !== undefined &&
    //   objectPath.get(dto, "Temp.DataGridValues.0.NumberofCattle") !== undefined
    // ) {
    //   // onClear();
    //   objectPath.set(dto, "InsurableItem.0.RiskItems", RiskItems());
    //   objectPath.set(
    //     dto,
    //     "InsurableItem.0.RiskItems.0.NumberofCattle",
    //     dto.Temp.DataGridValues[0].NumberofCattle
    //   );
    //   objectPath.set(
    //     dto,
    //     "InsurableItem.0.RiskItems.0.SumInsured",
    //     dto.Temp.DataGridValues[0].SumInsured
    //   );
    // }
    if (
      activeStep &&
      activeStep === 2 &&
      objectPath.get(dto, "Temp.Upload.0.Symbol Number/Tag Number") !== undefined
    ) {
      console.log("kkkkkkkkkkkkkkdkbksh");
      dto.InsurableItem[0].RiskItems = dto.Temp.Upload;
      setGenericPolicyDto(dispatch, dto);
    }
    if (objectPath.get(dto, "Temp.Upload") === "") {
      dto.InsurableItem[0].RiskItems = RiskItems();
      objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.Output", []);
      objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.TotalSumInsured", "");
      setGenericPolicyDto(dispatch, dto);
      setSuccessRec([]);
      setFailureRec([]);
    }

    const Livestock = objectPath.get(dto, "InsurableItem.0.RiskItems.0.Category"); // Livestock Details
    if (Livestock === undefined || Livestock === "") {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.Category", genericInfo.SubClass);
      objectPath.set(dto, "TotalSumInsured", "");
      // objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.TotalSumInsured", "");
    }
    if (dto.Bankdetails.BankCategory !== "" && dto.Bankdetails.BankCategory !== undefined) {
      if (masters.BankorFinancialInstituionNameinEnglish.length === 0) {
        const res = await GetProdPartnermasterData("BankDetails", {
          BankFinancialInstitution: dto.Bankdetails.BankCategorylabel,
        });
        masters.BankorFinancialInstituionNameinEnglish = res.data;
      }
    }
    if (
      dto.Bankdetails.BankorFinancialInstituionNameinEnglish !== "" &&
      dto.Bankdetails.BankorFinancialInstituionNameinEnglish !== undefined
    ) {
      if (masters.BranchMasters.length === 0) {
        const res = await GetProdPartnermasterData("BranchMasters", {
          BankFinancialInstitution: dto.Bankdetails.BankCategorylabel,
          Bankname: dto.Bankdetails.BankorFinancialInstituionNameinEnglish,
        });
        masters.BranchMasters = res.data;
      }
    }

    setGenericPolicyDto(dispatch, dto);
    objectPath.set(dto, "ProductLogo", genericInfo.ProductLogo);
    objectPath.set(dto, "CompanyName", process.env.REACT_APP_CompanyName);
    objectPath.set(dto, "CompanyAddress", process.env.REACT_APP_CompanyAddress);
    objectPath.set(dto, "CompanyLogo", process.env.REACT_APP_CompanyLogo);
    objectPath.set(dto, "CompanyContactNo", process.env.REACT_APP_CompanyContactNo);
  }, [resetCount]);
  useEffect(async () => {
    if (loginUserDetails && loginUserDetails.displayName) {
      objectPath.set(dto, "AgentName", loginUserDetails.displayName);
      objectPath.set(dto, "AgentMobileNo", loginUserDetails.contactNumber);

      setGenericPolicyDto(dispatch, dto);
    }
  }, [loginUserDetails]);

  let data = [];

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            required: true,
            label: "Doc Type",
            visible: true,
            value: "DocType",
            options: masters.DocType,
            disabled: true,
          },
          {
            type: "Input",
            required: true,
            label: "Department",
            visible: true,
            value: "Department",
            disabled: true,
          },
          {
            type: "Input",
            required: true,
            label: "Class",
            visible: true,
            value: "Class",
            disabled: true,
          },
          {
            type: "Input",
            required: true,
            label: "Sub-Class",
            visible: true,
            value: "SubClass",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Number of Days",
            required: true,
            visible: true,
            value: "NumberofDays",
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
            // customOnChange: (e) => handleNumberofDays(e),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            value: "PolicyStartDate",
            disableOnReset: true,
            dateFormat: "m/d/Y",
            minDate: PolicyStartDateMinDate(),
            maxDate: PolicyStartDateMaxDate(),
            customOnChange: (e, d) => PolicyStartDate(e, d),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            visible: true,
            dateFormat: "m/d/Y",
            value: "PolicyEndDate",
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Business Type",
            visible: true,
            value: "BusinessType",
            options: masters.BusinessType,
            disableOnReset: true,
            disabled: true,
          },
        ],
        [
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 12,
          //   return: (
          //     <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //       <DataGrid
          //         autoHeight
          //         rows={tableRows}
          //         columns={tableColumns}
          //         getRowId={(row) => row.id}
          //         pageSize={pageSize}
          //         onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          //       />
          //     </Grid>
          //   ),
          // },

          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "rowID",
            rowHeight: 70,
            columns: [
              {
                field: "NumberofCattle",
                headerName: "Number Of Cattle",
                width: 250,
                disableColumnMenu: true,
                sortable: false,
                renderCell: (param) => (
                  <MDInput
                    name="NumberofCattle"
                    value={param.row.NumberofCattle}
                    label="Number of Cattle"
                    onChange={(e) => handleDataGrid(e, param)}
                    error={flag.NumberofCattleVal === true || DataGridval.NumberofCattle === true}
                    helperText={
                      (flag.NumberofCattleVal === true
                        ? "Accept only Numbers greater then Zero"
                        : "") || (DataGridval.NumberofCattle === true ? "This field required" : "")
                    }
                    onBlur={handleDataGridRegVal}
                    required
                    sx={redAsterisk}
                  />
                ),
              },
              {
                field: "SumInsured",
                headerName: "SumInsured",
                width: 250,
                disableColumnMenu: true,
                sortable: false,
                renderCell: (param) => (
                  <MDInput
                    name="SumInsured"
                    value={param.row.SumInsured}
                    onChange={(e) => handleDataGrid(e, param)}
                    label="Sum Insured"
                    error={flag.SumInsuredVal === true || DataGridval.SumInsured === true}
                    helperText={
                      (flag.SumInsuredVal === true
                        ? "Accept only Numbers greater then Zero"
                        : "") || (DataGridval.SumInsured === true ? "This field required" : "")
                    }
                    onBlur={handleDataGridRegVal}
                    required
                    sx={redAsterisk}
                  />
                ),
              },
              {
                field: "Rate(%)",
                headerName: "Rate(%)",
                width: 250,
                disableColumnMenu: true,
                sortable: false,
                renderCell: () => (
                  <MDTypography>
                    {objectPath.get(dto, "Temp.DataGridValues.0.Rate(%)")}
                  </MDTypography>
                ),
              },
              {
                field: "Premium Amount",
                headerName: "Premium Amount",
                width: 250,
                disableColumnMenu: true,
                sortable: false,
                renderCell: () => (
                  <MDTypography>
                    {objectPath.get(dto, "Temp.DataGridValues.0.Premium Amount")}
                  </MDTypography>
                ),
              },
            ],
            value: "Temp.DataGridValues",
          },
        ],
        [
          {
            type: "Input",
            label: "Number of Owner/Partner",
            value: "OwnerAccidentalDetails.NumberofOwnersPartners",
            visible: true,
            name: "NumberofOwnersPartners",
            disableOnReset: true,
            onChangeFuncs: [IsNumeric1],
            // customOnChange: (e) => handleNumberofOwnersPartners(e),
            // InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Personal Accidental SI (Per Person)",
            value: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
            visible: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          {
            type: "Input",
            label: "Accidental Premium (Per Person)",
            value: "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
            visible: true,
            disabled: true,
            // disableOnReset: trues,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Input",
            label: "Total Accidental SI",
            value: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
            visible: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          {
            type: "Input",
            label: "Total Accidental Premium",
            value: "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
            visible: true,
            disabled: true,
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: true,
            value: "PolicyStartDate",
            disableOnReset: true,
            InputProps: { disabled: true },
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            value: "PolicyEndDate",
            disableOnReset: true,
            InputProps: { disabled: true },
            disabled: true,
          },
          {
            type: "RadioGroup",
            required: true,
            visible: true,
            radioLabel: { label: "Financing Details", labelVisible: true },
            radioList: [
              { value: "Direct", label: "Direct" },
              { value: "BankorFinancialInstitution", label: "Bank/Financial Institution" },
            ],
            value: "FinancingType",
            spacing: 12,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            value: "Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
            customOnChange: (e, a) => OnBankNonBank(e, a),
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Name Transfer",

            // spacing: 2.3,
          },
          {
            type: "AutoComplete",
            label: "Bank Category",
            required: true,
            visible: true,
            value: "Bankdetails.BankCategory",
            options: masters.BankCategory.filter(
              (x) =>
                (dto?.Bankdetails?.BankorNonBank === "Bank" && x?.description !== "Non-Bank") ||
                (dto?.Bankdetails?.BankorNonBank === "Non-Bank" && x?.description === "Non-Bank")
            ),
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Name Transfer",
            customOnChange: (e, a) => handleBankCategory(e, a, "BankCategory"),
          },
          // {
          //   type: "Input",
          //   label: "Bank/Financial Inst Name(English)",
          //   required: true,
          //   visible: true,
          //   name: "BankorFinancialInstituionNameinEnglish",
          //   value: "Bankdetails.BankorFinancialInstituionNameinEnglish",
          //   customOnBlur: (e, i, EF, ET) => onBlurTransliteration(e, i + 1, EF, ET),
          //   onChangeFuncs: [IsFreetextNoSpace],
          //   onBlurFuncs: [IsFreetextNoSpace],
          //   Endorsement:
          //     genericInfo.endorsementType === "Non-Financial Endorsement" &&
          //     genericInfo.endorsementCategory === "Name Transfer",
          // },
          {
            type: "AutoComplete",
            label: "Bank/Financial Inst Name(English)",
            required: true,
            visible: true,
            value: "Bankdetails.BankorFinancialInstituionNameinEnglish",
            options: masters.BankorFinancialInstituionNameinEnglish,
            Endorsement:
              genericInfo.endorsementType === "Non-Financial Endorsement" &&
              genericInfo.endorsementCategory === "Name Transfer",
            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
            // spacing: 3.7,
          },
          {
            type: "Input",
            label: "Bank/Financial Inst Name(Nepali)",
            visible: true,
            value: "Bankdetails.BankorFinancialInstituionNameinNepali",
            onChangeFuncs: [IsAlphaNumNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Bank Code",
            visible: true,
            value: "Bankdetails.BankCode",
            // onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Short Code",
            visible: true,
            value: "Bankdetails.ShortCode",
            // onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Swift/Pseudo Code",
            visible: true,
            value: "Bankdetails.SwiftPseudoCode",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person1",
            visible: true,
            value: "Bankdetails.ContactPerson1",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person2",
            visible: true,
            value: "Bankdetails.ContactPerson2",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person3",
            visible: true,
            value: "Bankdetails.ContactPerson3",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            value: "Bankdetails.PhoneNumber",
            // onChangeFuncs: [IsNumaricSpecialNoSpace],
            onBlurFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            value: "Bankdetails.MobileNumber",
            onBlurFuncs: [IsMobileNumber],
            onChangeFuncs: [IsNumeric],

            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Fax Number",
            visible: true,
            value: "Bankdetails.FaxNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Website",
            visible: true,
            value: "Bankdetails.Website",
            // onChangeFuncs: [IsEmail],
            // onBlurFuncs: [IsEmail],
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Email",
            visible: true,
            value: "Bankdetails.Email",
            // onChangeFuncs: [IsEmail],
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            value: "Bankdetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "Bank Agent Code",
            visible: true,
            value: "Bankdetails.BankAgentCode",
            // onChangeFuncs: [IsAlphaNumNoSpace],
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "CEO",
            visible: true,
            value: "Bankdetails.CEO",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            value: "Bankdetails.Country",
            options: masters.Country,
            // disableOnReset: true,
            disabled: true,
            // customOnChange: (e, a) => onPlaceSelect(e, a, "Country1"),
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            value: "Bankdetails.ProvinceorState",
            options: masters.State,
            customOnChange: (e, a) => onPlaceSelect(e, a, "State1"),
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            value: "Bankdetails.District",
            options: masters.District1,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District1"),
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            value: "Bankdetails.Municipality",
            options: masters.Municipality1,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            value: "Bankdetails.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            required: true,
            visible: true,
            name: "AddressEnglishBank",
            value: "Bankdetails.AddressEnglish",
            // customOnBlur: (e, z, EF, ET) => onBlurTransliteration(e, z + 1, EF, ET),
            // onChangeFuncs: [IsFreetextNoSpace],
            // onBlurFuncs: [IsFreetextNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            value: "Bankdetails.AddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            value: "Bankdetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Streetname",
            visible: true,
            value: "Bankdetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            value: "Bankdetails.HouseNumber",
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            value: "Bankdetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Button",
            label: "Add Branch Details",
            visible: true,
            spacing: 12,
            variant: "outlined",
            align: "right",
            onClick: onAddBranchDetails,
          },

          ...spreadBranchDetails()[0],
        ],
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        [
          {
            type: "Input",
            label: "Name of the Proposer",
            visible: true,
            value: "ProposerDetails.Name",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Designation",
            visible: true,
            value: "ProposerDetails.Designation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            value: "ProposerDetails.ProposerOccupation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            value: "ProposerDetails.Address",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            // onChangeFuncs: [IsAlphaNoSpace],
          },
        ],
        [
          // {
          //   type: "RadioGroup",
          //   required: true,
          //   visible: true,
          //   radioLabel: { label: "Are you an Existing Customers?", labelVisible: true },
          //   radioList: [
          //     { value: "Yes", label: "Yes" },
          //     { value: "No", label: "No" },
          //   ],
          //   value: "ExistingDetails",
          //   spacing: 12,
          // },
          // {
          //   type: "Input",
          //   label: "Citizenship Number",
          //   visible: flag.ExistingDetails,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "AutoComplete",
          //   label: "Issue District",
          //   visible: flag.ExistingDetails,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipIssueDistrict",
          //   options: masters.District,
          // },
          // {
          //   type: "Button",
          //   label: "Search",
          //   visible: flag.ExistingDetails,
          //   onClick: () => OnSearch(),
          //   spacing: 6,
          // },
          {
            type: "AutoComplete",
            label: "KYC Category",
            visible: true,
            required: true,
            // disableOnReset: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.KYCCategory",
            options: masters.KYCCategory,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Insured Type",
            visible: true,
            required: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.InsuredType",
            options: masters.InsuredType,
            customOnChange: (e, a) => handleIssuingBranch(e, a, "InsuredType"),
          },
          // {
          //   type: "Input",
          //   label: "Citizenship Number",
          //   visible: true,
          //   // visible: flag.ExistingDetails1,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "AutoComplete",
          //   label: "Issue District",
          //   visible: true,
          //   // visible: flag.ExistingDetails1,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.IssueDistrict",
          //   options: masters.District,
          // },
          {
            type: "Input",
            label: "Special Client",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.SpecialClient",
            disableOnReset: true,
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Insured Name-English",
            visible: true,
            // visible: flag.ExistingDetails1,
            required: true,
            value: "ProposerDetails.InsuredNameEnglish",
            name: "InsuredNameEnglish",
            // onBlurFuncs: [IsAlphaNoSpace],
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Insured Name-Nepali",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.InsuredNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "KYC Classification",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.KYCClassification",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "AutoComplete",
            label: "KYC Risk Category",
            visible: true,
            required: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.KYCRiskCategory",
            options: masters.KYCRiskCategory,
          },
          {
            type: "AutoComplete",
            label: "Is Beneficiary Owner",
            visible: true,
            // visible: flag.ExistingDetails1,
            disableOnReset: true,
            value: "ProposerDetails.IsBeneficiaryOwner",
            options: masters.IsBeneficiaryOwner,
          },
          {
            type: "AutoComplete",
            label: "Occupation",
            visible: true,
            required: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.InsuredOccupation",
            options: masters.Occupation,
          },
          // {
          //   type: "Input",
          //   label: "DocumentList",
          //   required: true,
          //   visible: true,
          //   value: "InsurableItem.0.RiskItems.0.KYCDetails.DocumentList",
          // },
          {
            type: "AutoComplete",
            label: "Income Source",
            visible: true,
            required: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.IncomeSource",
            options: masters.IncomeSource,
          },
          {
            type: "Input",
            label: "Contact Person Name",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.ContactPersonName",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Email Address",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.EmailId",
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            required: flag.Pan,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "VAT Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.VATNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "Registration Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.RegistrationNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Registration Date",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.RegistrationDate",
          },
          {
            type: "MDDatePicker",
            label: "Registration Close Date",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.RegisterationCloseDate",
            minDate: objectPath.get(dto, "ProposerDetails.RegistrationDate"),
          },
          {
            type: "Input",
            label: "Registration Office",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.RegistrationOffice",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          // {
          //   type: "Input",
          //   label: "Reference KYC Number",
          //   visible: true,
          //   value: "InsurableItem.0.RiskItems.0.KYCDetails.ReferenceKYCNumber",
          // },
          {
            type: "Input",
            label: "Reference Insured Name",
            visible: true,

            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.ReferenceInsuredName",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            // required: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            required: true,
            value: "ProposerDetails.MobileNo",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "TDS Category",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.TDSCategory",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.PermanentAdrress.Country",
            options: masters.Country,
            disableOnReset: true,
            readOnly: true,
            disabled: true,
            // customOnChange: (e, a) => onPlaceSelect(e, a, "Country3"),
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.PermanentAdrress.ProvinceState",
            options: masters.State,
            customOnChange: (e, a) => onPlaceSelect(e, a, "State3"),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.PermanentAdrress.District",
            options: masters.District3,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District3"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.PermanentAdrress.Municipality",
            options: masters.Municipality3,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            options: masters.WardNumber,
            value: "ProposerDetails.PermanentAdrress.WardNumber",
          },
          {
            type: "Input",
            label: "Address(English)",
            required: true,
            visible: true,
            // visible: flag.ExistingDetails1,
            name: "AddressEnglish3",
            value: "ProposerDetails.PermanentAdrress.AddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.PermanentAdrress.AddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            // visible: flag.ExistingDetails1,
            onChangeFuncs: [IsAlphaNoSpace],
            value: "ProposerDetails.PermanentAdrress.Area",
          },
          {
            type: "Input",
            label: "Tole/streetName",
            visible: true,
            // visible: flag.ExistingDetails1,
            onChangeFuncs: [IsAlphaNumNoSpace],
            value: "ProposerDetails.PermanentAdrress.ToleStreetName",
          },
          {
            type: "Input",
            label: "House No",
            name: "Seats",
            visible: true,
            // visible: flag.ExistingDetails1,
            // onChangeFuncs: [IsNumeric],
            value: "ProposerDetails.PermanentAdrress.HouseNumber",
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            onChangeFuncs: [IsNumeric],
            value: "ProposerDetails.PermanentAdrress.PlotNumber",
          },
          {
            type: "Input",
            label: "Temporary Address-English",
            visible: true,
            // visible: flag.ExistingDetails1,
            name: "TemporaryAddressEnglish",
            value: "ProposerDetails.PermanentAdrress.TemporaryAddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Temporary Address-Nepali",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.PermanentAdrress.TemporaryAddressNepali",
            disabled: true,
          },
          { type: "Typography", label: "Document Section", visible: true, spacing: 12 },
          {
            type: "Button",
            label: "Add Document",
            // visible: flag.ExistingDetails1,
            visible: true,
            startIcon: <AddIcon />,
            variant: "outlined",
            onClick: onAddDocument,
            spacing: 12,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <Stack rowGap={2}>
                {dto.ProposerDetails.documentDetails.map((item, index) => (
                  <Grid container columnSpacing={2}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Document Name"
                        name="DocName"
                        value={item.DocName}
                        onChange={(e) => handleDocName(e, index)}
                        onBlur={(e) => handleDublicateDoc(e, item.DocName, index)}
                        // error={
                        //   flag.DocDublication &&
                        //   docCountList[index].DocName === item.DocName
                        // }
                      />
                      {/* {flag.DocDublication === true &&
                          docCountList[index].DocName === item.DocName && (
                            <Typography sx={{ fontSize: "12px", color: "red" }}>
                              {item.DocName} Already Exist
                            </Typography>
                          )} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDButton variant="outlined" component="label">
                        Upload{" "}
                        <input
                          hidden
                          accept="image/bmp, image/jpeg, image/png, .pdf"
                          type="file"
                          id="fileInput"
                          onChange={(e) => handleFileUpload(e, index)}
                        />
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <Typography sx={{ fontSize: "0.9rem" }}>
                        {item.DocId !== "" ? item.DocId : null}
                        {item.DocId !== "" ? (
                          <CancelIcon
                            color="primary"
                            onClick={(e) => handleDocFileDelete(e, index)}
                          />
                        ) : null}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                      {index !== 0 && <DeleteIcon onClick={() => handleDocDelete(index)} />}
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            ),
          },
        ],
        [
          { type: "Typography", label: "Upload Profile Picture", visible: true },
          {
            type: "Button",
            label: "Upload Pic",
            visible: true,
            variant: "outlined",
            component: "label",
            typeFormat: (
              <input hidden type="file" id="fileInput" accept="image/*" onChange={onUploadPic} />
            ),
          },
          {
            type: "TypographyVal",
            value: "ProposerDetails.ProfilePicture",
            visible: true,
            sx: { fontSize: "14px" },
            spacing: 5,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 1,
            return:
              dto.ProposerDetails.ProfilePicture !== "" ? (
                <CancelIcon onClick={onCancelClick} />
              ) : null,
          },
          {
            type: "AutoComplete",
            label: "Gender(English)",
            required: true,
            visible: true,
            name: "GenderEnglish",
            value: "ProposerDetails.GenderEnglish",
            options: GenderNepali,
            customOnChange: (e, a) => handleGender(e, a, "GenderEnglish"),
          },
          {
            type: "Input",
            label: "Gender(Nepali)",
            visible: true,
            value: "ProposerDetails.GenderNepali",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Marital status(English)",
            visible: true,
            required: true,
            name: "MaritalStatusEnglish",
            value: "ProposerDetails.MaritalStatusEnglish",
            options: MaritalStatus,
            customOnChange: (e, a) => handleMarital(e, a, "MaritalStatusEnglish"),
          },
          {
            type: "Input",
            label: "Marital status(Nepali)",
            visible: true,
            value: "ProposerDetails.MaritalStatusNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Husband Name(English)",
            visible: true,
            name: "HusbandNameEnglish",
            value: "ProposerDetails.HusbandNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Husband Name(Nepali)",
            visible: true,
            value: "ProposerDetails.HusbandNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Wife Name(English)",
            visible: true,
            name: "WifeNameEnglish",
            value: "ProposerDetails.WifeNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Wife Name(Nepali)",
            visible: true,
            value: "ProposerDetails.WifeNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Father Name(English)",
            required: true,
            visible: true,
            name: "FatherNameEnglish1",
            value: "ProposerDetails.FatherNameEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Father Name(Nepali)",
            visible: true,
            value: "ProposerDetails.FatherNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Grandfather Name(English)",
            visible: true,
            required: true,
            name: "GrandfatherNameEnglish",
            value: "ProposerDetails.GrandfatherNameEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Grandfather Name(Nepali)",
            visible: true,
            value: "ProposerDetails.GrandfatherNameNepali",
            onChangeFuncs: [IsAlphaNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Nationality(English)",
            visible: true,
            value: "ProposerDetails.NationalityEnglish",
            // customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Permanent Address(English)",
            visible: true,
            name: "AddressEnglish4",
            value: "ProposerDetails.PermanentAddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Permanent Address(Nepali)",
            visible: true,
            value: "ProposerDetails.PermanentAddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Town(English)",
            visible: true,
            name: "TownEnglish",
            value: "ProposerDetails.TownEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Town(Nepali)",
            visible: true,
            value: "ProposerDetails.TownNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "City(English)",
            visible: true,
            name: "CityEnglish",
            value: "ProposerDetails.CityEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "City(Nepali)",
            visible: true,
            value: "ProposerDetails.CityNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Temporary Address(English)",
            visible: true,
            name: "TempAddresEnglish",
            customOnBlur: onBlurTransliteration,
            value: "ProposerDetails.CommunicationAddress.TempAddresEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Temporary Address(Nepali)",
            visible: true,
            value: "ProposerDetails.CommunicationAddress.TempAddresNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Residence(English)",
            visible: true,
            name: "ResidenceEnglish",
            value: "ProposerDetails.CommunicationAddress.ResidenceEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Residence(Nepali)",
            visible: true,
            value: "ProposerDetails.CommunicationAddress.ResidenceNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Citizenship Number",
            visible: true,
            required: true,
            value: "ProposerDetails.CitizenshipNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Citizenship Issued Date",
            required: true,
            visible: true,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            name: "mPStartDate",
            value: "ProposerDetails.CitizenshipIssuedDate",
            maxDate: new Date(),
          },
          {
            type: "AutoComplete",
            label: "Issue District",
            visible: true,
            required: true,
            value: "ProposerDetails.District",
            options: masters.District,
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            required: true,
            visible: true,
            name: "mPStartDate",
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            value: "ProposerDetails.DoB",
            customOnChange: (e, d) => onDOBselect(e, d, "InsuredDOB"),
            maxDate: new Date(),
          },
          {
            type: "Input",
            label: "License Number",
            visible: true,
            value: "ProposerDetails.LicenseNumber",
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Passport Issued By", labelVisible: true },
            radioList: [
              { value: "India", label: "India" },
              { value: "Nepal", label: "Nepal" },
            ],
            value: "ProposerDetails.PassportIssuedby",
            spacing: 3.2,
          },
          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            value: "ProposerDetails.PassportNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            maxLength: 8,
            spacing: 2.8,
          },
          {
            type: "MDDatePicker",
            label: "Passport Issued Date",
            visible: true,
            name: "mPStartDate",
            value: "ProposerDetails.PassportIssuedDate",
          },
          {
            type: "MDDatePicker",
            label: "Passport Expiry Date",
            visible: true,
            name: "mPStartDate",
            value: "ProposerDetails.PassportExpiryDate",
            minDate: objectPath.get(dto, "ProposerDetails.PassportIssuedDate"),
            disabled: objectPath.get(dto, "ProposerDetails.PassportIssuedDate") === "",
          },
          // {
          //   type: "Input",
          //   label: "Occupation",
          //   visible: true,
          //   value: "ProposerDetails.Occupation",
          //   disabled: objectPath.get(dto, "ProposerDetails.Occupation"),
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Income Source",
          //   visible: true,
          //   value: "ProposerDetails.IncomeSource",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Citizenship Number",
          //   visible: true,
          //   value: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          // },
        ],
        [
          {
            type: "Input",
            label: "Organisation Name",
            visible: true,
            required: true,
            value: "ProposerDetails.NameoftheOrganisation",
            // onChangeFuncs: [IsAlphaNumNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Organisation Address",
            visible: true,
            required: true,
            value: "ProposerDetails.OrganizationAddress",
            disabled: true,
            // onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Organisation Contact No",
            visible: true,
            value: "ProposerDetails.OrganizationContactNo",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            onBlurFuncs: [IsNumaricSpecialNoSpace],
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
            value: "ProposerDetails.MemberType",
            options: masters.MemberType,
          },
          {
            type: "Input",
            label: "Role",
            visible: true,
            value: "ProposerDetails.Role",
            // onChangeFuncs: [IsNumeric],
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Member Name (English)",
            visible: true,
            name: "MemberNameEnglish",
            value: "ProposerDetails.MemberNameEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Member Name (Nepali)",
            visible: true,
            value: "ProposerDetails.MemberNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Designation (English)",
            visible: true,
            name: "DesignationEnglish",
            value: "ProposerDetails.DesignationEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Designation (Nepali)",
            visible: true,
            value: "ProposerDetails.DesignationNepali",
            onChangeFuncs: [IsAlphaNumNoSpace],
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender (English)",
            visible: true,
            name: "GenderEnglish1",
            value: "ProposerDetails.GenderEnglish",
            // options: masters.Gender,
            options: GenderNepali,
            // customOnBlur: onBlurTransliteration,
            customOnChange: (e, a) => handleGender(e, a, "GenderEnglish1"),
          },
          {
            type: "Input",
            label: "Gender (Nepali)",
            visible: true,
            value: "ProposerDetails.GenderNepali",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Marital status (English)",
            visible: true,
            name: "MaritalStatusEnglish1",
            value: "ProposerDetails.MaritalStatusEnglish",
            options: MaritalStatus,
            customOnChange: (e, a) => handleMarital(e, a, "MaritalStatusEnglish1"),
          },
          {
            type: "Input",
            label: "Marital status (Nepali)",
            visible: true,
            value: "ProposerDetails.MaritalStatusNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Husband's Name(English)",
            visible: true,
            name: "HusbandNameEnglish1",
            customOnBlur: onBlurTransliteration,
            value: "ProposerDetails.HusbandNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Husband's Name(Nepali)",
            visible: true,
            value: "ProposerDetails.HusbandNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Wife Name (English)",
            visible: true,
            name: "WifeNameEnglish1",
            value: "ProposerDetails.WifeNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Wife Name (Nepali)",
            visible: true,
            value: "ProposerDetails.WifeNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Father Name (English)",
            visible: true,
            customOnBlur: onBlurTransliteration,
            name: "FatherNameEnglish",
            value: "ProposerDetails.FatherNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Father Name (Nepali)",
            visible: true,
            value: "ProposerDetails.FatherNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "GrandFather Name (English)",
            visible: true,
            name: "GrandfatherNameEnglish1",
            value: "ProposerDetails.GrandfatherNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "GrandFather Name (Nepali)",
            visible: true,
            value: "ProposerDetails.GrandfatherNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Nationality (English)",
            visible: true,
            value: "ProposerDetails.NationalityEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Permanent Address (English)",
            visible: true,
            name: "PermanentAddressEnglish",
            value: "ProposerDetails.PermanentAdrress.PermanentAddressEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Permanent Address (Nepali)",
            visible: true,
            value: "ProposerDetails.PermanentAdrress.PermanentAddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Town (English)",
            visible: true,
            name: "TownEnglish1",
            value: "ProposerDetails.PermanentAdrress.TownEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Town (Nepali)",
            visible: true,
            value: "ProposerDetails.PermanentAdrress.TownNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "City (English)",
            name: "CityEnglish1",
            visible: true,
            value: "ProposerDetails.PermanentAdrress.CityEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "City (Nepali)",
            visible: true,
            value: "ProposerDetails.PermanentAdrress.CityNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Temporary Address (English)",
            visible: true,
            name: "TempAddresEnglish1",
            value: "ProposerDetails.CommunicationAddress.TempAddresEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Temporary Address (Nepali)",
            visible: true,
            value: "ProposerDetails.CommunicationAddress.TempAddresEnglish",
            disabled: true,
          },
          {
            type: "Input",
            label: "Identification Type",
            visible: true,
            value: "ProposerDetails.IdentificationType",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Citizenship Number",
            visible: true,
            required: flag.Individual,
            value: "ProposerDetails.CitizenshipNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Citizenship Issued Date",
            visible: true,
            required: flag.Individual,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            value: "ProposerDetails.CitizenshipIssuedDate",
            onChangeFuncs: [IsNumeric],
            maxDate: new Date(),
          },
          {
            type: "AutoComplete",
            label: "Citizenship Issue District",
            visible: true,
            required: flag.Individual,
            altFormat: "y - m - d",
            value: "ProposerDetails.IssueDistrict",
            options: masters.District,
          },
          {
            type: "MDDatePicker",
            label: "Date Of Birth",
            required: flag.Individual,
            visible: true,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            value: "ProposerDetails.DoB",
            customOnChange: (e, d) => onDOBselect(e, d, "MemberDOB"),
            maxDate: new Date(),
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Passport Issued By", labelVisible: true },
            radioList: [
              { value: "India", label: "India" },
              { value: "Nepal", label: "Nepal" },
            ],
            value: "ProposerDetails.PassportIssuedby",
            spacing: 3.2,
          },
          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            value: "ProposerDetails.PassportNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            spacing: 2.8,
          },
          {
            type: "MDDatePicker",
            label: "Passport Issued Date",
            visible: true,
            value: "ProposerDetails.PassportIssuedDate",
            onChangeFuncs: [IsNumeric],
            maxDate: new Date(),
          },
          {
            type: "MDDatePicker",
            label: "Passport Expiry Date",
            visible: true,
            value: "ProposerDetails.PassportExpiryDate",
            minDate: objectPath.get(dto, "ProposerDetails.PassportIssuedDate"),
            disabled: objectPath.get(dto, "ProposerDetails.PassportIssuedDate") === undefined,
          },
          {
            type: "Input",
            label: "License Number",
            visible: true,
            value: "ProposerDetails.LicenseNumber",
            // onChangeFuncs: [IsNumeric],
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            spacing: 3,
          },
          // {
          //   type: "Input",
          //   label: "Occupation",
          //   visible: true,
          //   value: "ProposerDetails.Occupation",
          //   onChangeFuncs: [IsAlphaNoSpace],
          //   onBlurFuncs: [IsAlphaNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Income Source",
          //   visible: true,
          //   value: "ProposerDetails.IncomeSource",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Phone Number",
          //   visible: true,
          //   value:
          //     "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.MemberDetail.PhoneNumber",
          //   onChangeFuncs: [IsNumeric],
          // },
          // {
          //   type: "Input",
          //   label: "Mobile Number",
          //   visible: true,
          //   value: "ProposerDetails.MobileNumber",
          //   onChangeFuncs: [IsNumeric],
          //   onBlurFuncs: [IsMobileNumber],
          //   InputProps: { maxLength: 10 },
          // },
          // {
          //   type: "Input",
          //   label: "Email ID",
          //   visible: true,
          //   value: "ProposerDetails.Email",
          //   // onChangeFuncs: [IsEmail],
          //   onBlurFuncs: [IsEmail],
          // },
          {
            type: "AutoComplete",
            label: "Status",
            visible: true,
            value: "ProposerDetails.Status",
            options: masters.Status,
          },
          {
            type: "MDDatePicker",
            label: "Appoint Date",
            visible: true,
            value: "ProposerDetails.AppointDate",
          },
          { type: "Typography", label: "Upload Profile Picture", visible: true, spacing: 4 },
          {
            type: "Button",
            label: "Upload Pic",
            visible: true,
            variant: "outlined",
            component: "label",
            typeFormat: (
              <input hidden type="file" id="fileInput" accept="image/*" onChange={onUploadPic} />
            ),
            spacing: 2,
          },
          {
            type: "TypographyVal",
            value: "ProposerDetails.ProfilePicture",
            visible: true,
            sx: { fontSize: "14px" },
          },
          {
            type: "Custom",
            visible: true,
            spacing: 1,
            return:
              dto.ProposerDetails.ProfilePicture !== "" ? (
                <CancelIcon onClick={onCancelClick} />
              ) : null,
          },
        ],
        [
          {
            type: "Typography",
            label: "Care of (English)",
            visible: true,
            spacing: 12,
          },
          {
            type: "Input",
            label: "Name",
            visible: true,
            name: "CareofNameEnglish",
            value: "ProposerDetails.CareofNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            value: "ProposerDetails.CareofPANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            value: "ProposerDetails.CareofContactNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            name: "CareofAddressEnglish",
            value: "ProposerDetails.CareofAddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Typography",
            label: "Care of (Nepali)",
            visible: true,
            spacing: 12,
          },

          {
            type: "Input",
            label: "Name",
            visible: true,
            value: "ProposerDetails.CareofNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            value: "ProposerDetails.CareofAddressNepali",
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Proprietor Name(English)",
            visible: true,
            name: "ProprietorNameEnglish",
            value: "ProposerDetails.ProprietorNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Proprietor Name(Nepali)",
            visible: true,
            value: "ProposerDetails.ProprietorNameNepali",
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Subject Matter",
            visible: true,
            value: "ProposerDetails.SubjectMatter",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Type",
            // required: true,
            visible: true,
            value: "PolicyRiskType",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Category",
            visible: true,
            required: true,
            value: "PolicyRiskCategory",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Agri Technician Name",
            required: true,
            visible: true,
            value: "PermanentAdrress.AgriTechnicianName",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Agri Technician Address",
            visible: true,
            required: true,
            value: "PermanentAdrress.AgriTechnicianAddress",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "Entry Option", labelVisible: true },
            radioList: [
              { value: "Import", label: "Import" },
              // { value: "DataEntry", label: "DataEntry" },
            ],
            value: "DataEntryType",
            spacing: 12,
          },
          {
            type: "Button",
            label: "Download Attachment",
            visible: dto.DataEntryType,
            spacing: 2.5,
            variant: "contained",
            sx: "30px",
            onClick: () => downloadFile(),
          },
          // {
          //   type: "Custom",
          //   visible: dto.DataEntryType === "Import",
          //   spacing: 2.5,
          //   return: (
          //     <ColorButton variant="contained" onClick={() => downloadFile()}>
          //       Download Attachment
          //     </ColorButton>
          //   ),
          // },
          // {
          //   type: "Button",
          //   label: "Failure Records",
          //   visible: flag.DataGriduploadFlag,
          //   spacing: 3,
          //   variant: "outlined",
          //   color: "error",
          //   onClick: () => onFailureRecords(),
          // },
          {
            type: "Button",
            label:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
                undefined ||
              objectPath.get(dto, "Temp.Upload.0.Symbol Number/Tag Number") !== undefined
                ? "Re-Upload"
                : "Upload",
            visible: dto.DataEntryType === "Import",
            startIcon: <MDBox component="img" src={excel} />,
            endIcon: flag.backdropflag && <CircularProgress size="20px" />,
            spacing: 2,
            variant: "outlined",
            component: "label",
            typeFormat: (
              // <input hidden accept=".xlsx, .xls, .csv" type="file" onChange={handleExcelUpload} />
              <input hidden accept=".xlsx" type="file" id="fileInput" onChange={onUploadArr} />
            ),
          },
          {
            type: "Typography",
            label: "",
            spacing: 5,
            visible:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") ===
              undefined,
            // ||
            // objectPath.get(dto, "Temp.Upload.0.Symbol Number/Tag Number") === undefined,
          },
          {
            type: "Custom",
            visible:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
              undefined,
            //   ||
            // objectPath.get(dto, "Temp.Upload.0.Symbol Number/Tag Number") !== undefined,
            spacing: 6.5,
            return: (
              <Grid container justifyContent="flex-end">
                <MDInput
                  label="Search "
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
                {/* <Grid container justifyContent="flex-end">
                  {valid === true ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", marginblock: "auto" }}>
                      No match found
                    </MDTypography>
                  ) : null}
                </Grid> */}
              </Grid>
            ),
          },
          {
            type: "Button",
            label: "Clear",
            visible:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
              undefined,
            //   ||
            // objectPath.get(dto, "Temp.Upload.0.Symbol Number/Tag Number") !== undefined,
            spacing: 1,
            variant: "outlined",
            color: "error",
            onClick: () => onClear(),
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
                undefined ||
              objectPath.get(dto, "Temp.Upload.0.Symbol Number/Tag Number") !== undefined,
            rowId: "Symbol Number/Tag Number",
            columns: [
              {
                field: "Symbol Number/Tag Number",
                headerName: "Symbol Number/Tag Number",
                width: 200,
              },
              { field: "Purpose of Usage", headerName: "Purpose of Usage", width: 200 },
              { field: "Name of Cattle", headerName: "Name of Cattle", width: 200 },
              { field: "Category", headerName: "Category", width: 200 },
              { field: "Breed/Caste/Variety", headerName: "Breed/Caste/Variety", width: 200 },
              { field: "Farming Type", headerName: "Farming Type", width: 200 },
              { field: "Color", headerName: "Color", width: 200 },
              { field: "Height", headerName: "Height", width: 200 },
              { field: "Weight", headerName: "Weight", width: 200 },
              { field: "Age - Year", headerName: "Age - Year", width: 200 },
              { field: "Age - Month", headerName: "Age - Month", width: 200 },
              { field: "Age - Days", headerName: "Age - Days", width: 200 },
              { field: "Remarks", headerName: "Remarks", width: 200 },
              { field: "Current Health Status", headerName: "Current Health Status", width: 200 },
              { field: "SumInsured", headerName: "SumInsured", width: 200 },
              { field: "Rate(%)", headerName: "Rate(%)", width: 200 },
              { field: "Premium Amount", headerName: "Premium Amount", width: 200 },
              { field: "Other Company Tag", headerName: "Other Company Tag", width: 200 },
              { field: "Purchase Date (DD-MMM-YY)", headerName: "Purchase Date", width: 200 },
              { field: "Purchase Amount", headerName: "Purchase Amount", width: 200 },
            ],
            checkboxSelection: true,
            value: "Temp.Upload",
            onSelectionModelChange: (row) => setRowSelectionModel(row),
            rowPerPage: 10,
          },
          {
            type: "Input",
            label: "Remarks",
            visible: flag.Import,
            value: "InsurableItem.0.Remarks",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 9,
          },
          // {
          //   type: "RadioGroup",
          //   visible: flag.DataEntry,
          //   radioLabel: { label: "Is Cattle Purchased", labelVisible: flag.DataEntry },
          //   radioList: [
          //     { value: "Yes", label: "Yes" },
          //     { value: "No", label: "No" },
          //   ],
          //   value: "InsurableItem.0.RiskItems.0.IsCattlePurchased",
          //   spacing:
          //     objectPath.get(dto, "InsurableItem.0.RiskItems.0.IsCattlePurchased") === "No"
          //       ? 12
          //       : 6,
          // },
          // {
          //   type: "MDDatePicker",
          //   required: true,
          //   label: "Purchase Date",
          //   visible: flag.IsCattlePurchased,
          //   value: "InsurableItem.0.RiskItems.0.PurchaseDate",
          // },
          // {
          //   type: "Input",
          //   label: "Purchase Amount",
          //   required: true,
          //   visible: flag.IsCattlePurchased,
          //   value: "InsurableItem.0.RiskItems.0.PurchaseAmount",
          //   onChangeFuncs: [IsNumeric],
          // },
          // {
          //   type: "Input",
          //   label: "Symbol Number/Tag Number",
          //   visible: flag.DataEntry,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.SymbolNumberorTagNumber",
          //   onChangeFuncs: [IsNumeric],
          //   spacing: 3,
          // },
          // {
          //   type: "Checkbox",
          //   visible: flag.DataEntry,
          //   label: "Other Company Tag",
          //   value: "InsurableItem.0.RiskItems.0.OtherCompanyTag",
          //   checkedVal: "Yes",
          //   unCheckedVal: "No",
          //   spacing: 9,
          // },
          // {
          //   type: "Input",
          //   label: "Name of Cattle",
          //   visible: flag.DataEntry,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.NameofCattle",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Category",
          //   visible: flag.DataEntry,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.Category",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   InputProps: { readOnly: true },
          // },
          // {
          //   type: "Input",
          //   label: "Breed/Caste/Variety",
          //   visible: flag.DataEntry,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.BreedCasteVariety",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Farming Type",
          //   visible: flag.DataEntry,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.FarmingType",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Color",
          //   visible: flag.DataEntry,
          //   value: "InsurableItem.0.RiskItems.0.Color",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Height",
          //   visible: flag.DataEntry,
          //   value: "InsurableItem.0.RiskItems.0.Height",
          //   onChangeFuncs: [IsNumeric],
          // },
          // {
          //   type: "Input",
          //   label: "Weight",
          //   visible: flag.DataEntry,
          //   value: "InsurableItem.0.RiskItems.0.Weight",
          //   onChangeFuncs: [IsNumeric],
          // },
          // {
          //   type: "Input",
          //   label: "Age-Year",
          //   visible: flag.DataEntry,
          //   value: "InsurableItem.0.RiskItems.0.AgeYear",
          //   // options: masters.AgeYear,
          // },
          // {
          //   type: "Input",
          //   label: "Age-Month",
          //   visible: flag.DataEntry,
          //   value: "InsurableItem.0.RiskItems.0.AgeMonth",
          //   // options: masters.AgeMonth,
          // },
          // {
          //   type: "Input",
          //   label: "Age-Days",
          //   visible: flag.DataEntry,
          //   value: "InsurableItem.0.RiskItems.0.AgeDays",
          //   // options: masters.AgeDays,
          // },
          // {
          //   type: "Input",
          //   label: "Remarks",
          //   visible: flag.DataEntry,
          //   value: "InsurableItem.0.RiskItems.0.Remarks",
          // },
          // {
          //   type: "Input",
          //   label: "Current Health Status",
          //   visible: flag.DataEntry,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.CurrentHealthStatus",
          // },
          // {
          //   type: "Input",
          //   label: "SumInsured",
          //   visible: flag.DataEntry,
          //   required: true,
          //   value: "InsurableItem.0.RiskItems.0.SumInsured",
          //   onChangeFuncs: [IsNumeric],
          // },
          // {
          //   type: "Input",
          //   label: "Rate (%)",
          //   visible: flag.DataEntry,
          //   // required: true,
          //   value: "",
          // },
          // {
          //   type: "Input",
          //   label: "Premium Amount",
          //   visible: flag.DataEntry,
          //   // required: true,
          //   value: "",
          // },
          // {
          //   type: "Button",
          //   label: "Reset",
          //   visible: flag.DataEntry,
          //   variant: "contained",
          //   onClick: OnReset,
          //   spacing: 6,
          // },
          // {
          //   type: "Button",
          //   label: "Add",
          //   visible: flag.DataEntry,
          //   variant: "outlined",
          //   onClick: OnAdd,
          //   spacing: 6,
          // },
          // {
          //   type: "DataGrid",
          //   spacing: 12,
          //   visible: flag.OnAdd,
          //   rowId: "SymbolNumberorTagNumber",
          //   columns: [
          //     {
          //       field: "SymbolNumberorTagNumber",
          //       headerName: "Symbol Number/Tag Number",
          //       width: 200,
          //     },
          //     { field: "PurposeofUsage", headerName: "Purpose of Usage", width: 200 },
          //     { field: "NumberofCattle", headerName: "Name of Cattle", width: 200 },
          //     { field: "BreedCasteVariety", headerName: "Breed/Caste/Variety", width: 200 },
          //     { field: "FarmingType", headerName: "Farming Type", width: 200 },
          //     { field: "Color", headerName: "Color", width: 100 },
          //     { field: "Height ", headerName: "Height", width: 100 },
          //     { field: "Weight", headerName: "Weight", width: 100 },
          //     { field: "AgeYear", headerName: "AgeYear", width: 100 },
          //     { field: "AgeMonth", headerName: "AgeMonth", width: 100 },
          //     { field: "AgeDays", headerName: "AgeDays", width: 100 },
          //     { field: "Remarks", headerName: "Remarks", width: 200 },
          //     { field: "SumInsured", headerName: "SumInsured", width: 150 },
          //     { field: "Rate", headerName: "Rate(%)", width: 200 },
          //     { field: "PremiumAmount", headerName: "PremiumAmount", width: 200 },
          //   ],
          //   rows: Livestockrows,
          // },
          {
            type: "Custom",
            visible: dto.DataEntryType === "Import",
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
                <MDTypography variant="h6"> Number of Cattle</MDTypography>
                <MDTypography variant="h6">
                  {objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
                  undefined
                    ? dto.InsurableItem[0].RiskItems.length
                    : 0}
                </MDTypography>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            label: "",
            visible: dto.DataEntryType === "Import",
            spacing: 2,
          },
          {
            type: "Custom",
            visible: dto.DataEntryType === "Import",
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
                <MDTypography variant="h6">Total Sum Insured</MDTypography>
                <MDTypography variant="h6">
                  रु {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.TotalSumInsured")}
                </MDTypography>
              </MDBox>
            ),
          },
          {
            type: "Input",
            label: "General Description",
            visible: dto.DataEntryType === "Import",
            value: "InsurableItem.0.GeneralDescription",
            spacing: 3,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Typography",
            label: "Vaccination/Other Documents",
            visible: dto.DataEntryType === "Import",
            spacing: 12,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },

          {
            type: "Button",
            label: "Add Document",
            visible: dto.DataEntryType === "Import",
            startIcon: <AddIcon />,
            variant: "outlined",
            onClick: onAddVacOtherDocument,
            spacing: 12,
          },
          {
            type: "Custom",
            visible: dto.DataEntryType === "Import",
            spacing: 12,
            return: (
              <Stack rowGap={2}>
                {dto.InsurableItem[0].VaccinationandOtherDocuments.map((item, index) => (
                  <Grid container columnSpacing={2}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Document Name"
                        name="DocName"
                        value={item.DocName}
                        onChange={(e) => handleVacOtherDocName(e, index)}
                        onBlur={(e) => handleVacOtherDublicateDoc(e, item.DocName, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDButton variant="outlined" component="label">
                        Upload{" "}
                        <input
                          hidden
                          accept="image/bmp, image/jpeg, image/png, .pdf"
                          type="file"
                          id="fileInput"
                          onChange={(e) => handleVacOtherFileUpload(e, index)}
                        />
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <Typography sx={{ fontSize: "0.9rem" }}>
                        {item.DocId !== "" ? item.DocId : null}
                        {item.DocId !== "" ? (
                          <CancelIcon
                            color="primary"
                            onClick={(e) => handleVacOtherDocFileDelete(e, index)}
                          />
                        ) : null}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                      {index !== 0 && <DeleteIcon onClick={() => handleVacOtherDocDelete(index)} />}
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            ),
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
            required: true,
            value: "Channel.IssuingBranch",
            visible: true,
            options: masters.IssuingBranch.filter((x) =>
              loginUserDetails.branchName.split(",").some((y) => y === x.mValue)
            ),
            disableOnReset: dto.proposalNo !== "" && dto.proposalNo !== undefined,
            disabled: dto.proposalNo !== "" && dto.proposalNo !== undefined,
            customOnChange: (e, a) => handleIssuingBranch(e, a, "IssuingBranch"),
          },
          {
            type: "Input",
            label: "Sub-Branch",
            visible: true,
            value: "Channel.SubBranch",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Fiscal Year",
            required: true,
            visible: true,
            value: "Channel.FiscalYear",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Field Officer Code ",
            visible: true,
            value: "Channel.FieldOfficerCode",
            options: masters.FieldOfficer,
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldOfficerCode"),
          },
          {
            type: "AutoComplete",
            label: "Field Officer Name ",
            visible: true,
            value: "Channel.FieldOfficer",
            // optionLabel: "mValue",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldOfficer"),
            options: masters.FieldOfficer,
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Code ",
            visible: true,
            value: "Channel.SubFieldOfficerCode",
            options: masters.SubFieldOfficer,
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficerCode"),
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Name",
            visible: true,
            options: masters.SubFieldOfficer,
            value: "Channel.SubFieldOfficer",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Agent Code ",
            visible: true,
            value: "Channel.AgentCode",
            options: masters.Agent,
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentCode"),
          },
          {
            type: "AutoComplete",
            label: "Agent Name ",
            visible: true,
            value: "Channel.AgentName",
            options: masters.Agent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Code",
            visible: true,
            value: "Channel.SubAgentCode",
            options: masters.SubAgent,
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgent"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Name",
            visible: true,
            value: "Channel.SubAgentName",
            options: masters.SubAgent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgentName"),
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            value: "RiskAddressDetails.Country",
            options: masters.Country,
            disableOnReset: true,
            readOnly: true,
            disabled: true,
            // customOnChange: (e, a) => onPlaceSelect(e, a, "Country4"),
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            value: "RiskAddressDetails.ProvinceState",
            options: masters.State,
            customOnChange: (e, a) => onPlaceSelect(e, a, "State4"),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            value: "RiskAddressDetails.District",
            options: masters.District4,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District4"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            required: true,
            visible: true,
            value: "RiskAddressDetails.Municipality",
            options: masters.Municipality4,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            value: "RiskAddressDetails.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English) ",
            visible: true,
            required: true,
            value: "RiskAddressDetails.AddressEnglish",
            name: "AddressEnglish0",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address(Nepali) ",
            visible: true,
            value: "RiskAddressDetails.AddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            value: "RiskAddressDetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            value: "RiskAddressDetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "House Number ",
            visible: true,
            value: "RiskAddressDetails.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            value: "RiskAddressDetails.PlotNumber",
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
            label: "Number of Owner/Partner",
            value: "OwnerAccidentalDetails.NumberofOwnersPartners",
            visible: true,
            disabled: true,
            disableOnReset: true,
            name: "NumberofOwnersPartners",
            onChangeFuncs: [IsNumeric1],
            // customOnChange: (e) => handleNumberofOwnersPartners(e),
          },
          {
            type: "Input",
            label: "Personal Accident SI(Per Person)",
            value: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
            visible: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          {
            type: "Input",
            label: "Total Accidental SI",
            value: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
            visible: true,
            onChangeFuncs: [IsNumeric],
            disableOnReset: true,
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Nominee Name",
            value: "NomineeDetails.NomineeName",
            visible: true,
            // InputProps: { readOnly: true },
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Nominee Citizenship Number",
            value: "NomineeDetails.NomineeCitizenshipNumber",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Father Name",
            value: "NomineeDetails.NomineeFather",
            visible: true,
            // onChangeFuncs: [IsAlphaNumNoSpace],
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Mother Name",
            value: "NomineeDetails.NomineeMother",
            visible: true,
            // onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Relationship",
            value: "NomineeDetails.NomineeRelationship",
            visible: true,
            // onChangeFuncs: [IsAlphaNumNoSpace],
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            value: "NomineeDetails.NomineeContactNumber",
            visible: true,
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            onBlurFuncs: [IsNumaricSpecialNoSpace],
          },
          // {
          //   type: "Input",
          //   label: "Relationship",
          //   value:
          //     "NomineeDetails.Relationship",
          //   visible: true,
          //   // onChangeFuncs: [IsAlphaNumNoSpace],
          // },
          {
            type: "Input",
            label: "Address",
            value: "NomineeDetails.NomineeHouseNumber",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            // onChangeFuncs: [IsNumeric],
          },
        ],
      ];
      break;
    case 5:
      data = [
        [
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 12,
          //   return: (
          //     <MDBox
          //       sx={{
          //         // display: "flex",
          //         // justifyContent: "center",
          //         // //   width: "auto",
          //         p: "10px",
          //       }}
          //     >
          //       <Card
          //         sx={{
          //           backgroundColor: "#F0F0F0",
          //         }}
          //       >
          //         <Grid container spacing={2} p={3}>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography>Basic Premium</MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography sx={{ textAlign: "right" }}>
          //               रु{" "}
          //               {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.BasePremium")}
          //             </MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography>Govt Subsidy</MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography sx={{ textAlign: "right" }}>
          //               रु{" "}
          //               {objectPath.get(
          //                 dto,
          //                 "FormatedData.CalculatedPremiumDetails.GovtSubsidyPremium"
          //               )}
          //             </MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography>Premium After Subsidy</MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography sx={{ textAlign: "right" }}>
          //               रु{" "}
          //               {objectPath.get(
          //                 dto,
          //                 "FormatedData.CalculatedPremiumDetails.PremiumafterSubsidy"
          //               )}
          //             </MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography>Stamp Duty</MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography sx={{ textAlign: "right" }}>
          //               रु {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.StampDuty")}
          //             </MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography>Total Accident Premium</MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography sx={{ textAlign: "right" }}>
          //               रु{" "}
          //               {objectPath.get(
          //                 dto,
          //                 "FormatedData.CalculatedPremiumDetails.AccidentalPremium"
          //               )}
          //             </MDTypography>
          //           </Grid>{" "}
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography>Total Premium to be paid by Customer</MDTypography>
          //           </Grid>
          //           <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          //             <MDTypography sx={{ textAlign: "right" }}>
          //               रु{" "}
          //               {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.FinalPremium")}
          //             </MDTypography>
          //           </Grid>
          //         </Grid>
          //       </Card>
          //       {/* <MDBox
          //         sx={{
          //           display: "flex",
          //           justifyContent: "center",
          //           flexDirection: "row",
          //           p: "5px",
          //           mt: "10px",
          //         }}
          //       >
          //         <Stack direction="row" spacing={2}>
          //           <Typography>
          //             <strong>Do you wish to share Debit Note via</strong>
          //           </Typography>
          //           <FormGroup row>
          //             <FormControlLabel
          //               control={<Checkbox onChange={onEmailClick} />}
          //               label="E-mail"
          //             />
          //             <FormControlLabel control={<Checkbox disabled />} label="SMS" />
          //           </FormGroup>
          //         </Stack>
          //       </MDBox>
          //       <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          //         <Stack direction="row" spacing={2} p={5}>
          //           <MDButton onClick={onDebitNoteClick}>
          //             Download Debit Note <VisibilityIcon />
          //           </MDButton>
          //           <MDButton onClick={handleSavepolicyWFStatus}>Send For Approval</MDButton>
          //         </Stack>
          //       </MDBox> */}
          //     </MDBox>
          //   ),
          // },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Custom",
            required: true,
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
                      <Typography>Basic Premium</Typography>
                      <Typography>Govt Subsidy</Typography>
                      <Typography>Premium After Subsidy</Typography>
                      <Typography>Stamp Duty</Typography>
                      <Typography>Total Accident Premium</Typography>
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
                        {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.BasePremium")}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(
                          dto,
                          "FormatedData.CalculatedPremiumDetails.GovtSubsidyPremium"
                        )}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(
                          dto,
                          "FormatedData.CalculatedPremiumDetails.PremiumafterSubsidy"
                        )}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.StampDuty")}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(
                          dto,
                          "FormatedData.CalculatedPremiumDetails.AccidentalPremium"
                        )}
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
                        <b>Total Premium to be paid by Customer</b>
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
            label: "",
            spacing: 3,
            visible: dto.Channel.AgentCode !== "0000",
          },
          {
            type: "Typography",
            label: "",
            spacing: 3,
            visible: dto.Channel.AgentCode !== "0000",
          },
          {
            type: "Custom",
            required: true,
            visible: dto.Channel.AgentCode !== "0000" && dto.Channel.AgentCode !== "",
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
                      <b>
                        {" "}
                        {objectPath.get(
                          dto,
                          "FormatedData.CalculatedPremiumDetails.CommissionPercentage"
                        )}
                      </b>
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      <b>
                        {" "}
                        {objectPath.get(
                          dto,
                          "FormatedData.CalculatedPremiumDetails.CommissionAmount"
                        )}
                      </b>
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            ),
          },
          {
            type: "Custom",
            required: true,
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
            spacing: 3.2,
          },
          {
            type: "Button",
            label:
              genericInfo.Flow &&
              (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                ? "Save Details"
                : "Save Debit Note",
            visible: true,
            variant: "contained",
            color: "error",
            spacing: 1.8,
            onClick:
              genericInfo.Flow &&
              (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                ? onSaveModalClose
                : handlesavedebitnote,
          },

          {
            type: "Custom",
            visible: true,
            spacing: 2,
            return: (
              <ColorButton
                variant="contained"
                onClick={() => onDebitNoteClick()}
                // endIcon={<VisibilityIcon />}
              >
                Preview Debit Note
              </ColorButton>
            ),
          },

          // {
          //   type: "Button",
          //   label: "Download Debit Note",
          //   visible: true,
          //   variant: "contained",
          //   spacing: 3,
          //   endIcon: <VisibilityIcon />,
          //   onClick: () => onDebitNoteClick(),
          // },
          // {
          //   type: "Button",
          //   label: "Download Proposal",
          //   visible: true,
          //   variant: "contained",
          //   spacing: 2.5,
          // },
          // {
          //   type: "Custom",
          //   visible: false,
          //   spacing: 2.1,
          //   return: <ColorButton variant="contained">Download Proposal</ColorButton>,
          // },

          {
            type: "Button",
            label: "Send For Approval",
            visible: true,
            variant: "contained",
            color: "error",
            spacing: 2.5,
            onClick: () => handleSavepolicyWFStatus(),
          },
          {
            type: "Modal",
            visible: true,
            open: modalOpen,
            return: (
              <Grid container spacing={2}>
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
            open: savemodalopen,
            return: (
              <Grid container spacing={2}>
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

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    {/* Do You Wish To Preview Or Save The Debit Note */}
                    Do you wish to Preview and Save the Debit Note{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    {/* <MDButton variant="outlined" onClick={onDebitNoteClick}>
                      PREVIEW
                    </MDButton> */}
                    <MDButton onClick={(e) => onDebitNoteClick(e, "SAVE DEBIT NOTE")}>
                      SAVE DEBIT NOTE
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ),
          },
        ],
      ];
      break;
    case 6:
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
                PaymentMode={[
                  { label: "Online", value: "Online" },
                  { label: "Offline", value: "Offline" },
                ]}
                PolicyDto={genericPolicyDto}
                genericInfo={genericInfo}
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
    // break;
  }

  return data;
};
// GenericApi("NepalAgriLivestock", "NepalAgriBPCGProposal", topDto)
const getOnNextClick = async (activeStep, setBackDropFlag) => {
  let fun = false;
  const tDto = { ...topDto };

  const handleProposal = async () => {
    if (topGenericInfo && topGenericInfo.Flow === undefined && tDto.proposalNo === undefined) {
      await GenericApi("NepalAgriLivestock", "NepalAgriBPCGProposal", tDto).then(async (x) => {
        if (x.finalResult.proposalNumber) {
          // if (objectPath.get(tDto, "ExistingDetails") === "No") {
          //   await CreateCustomer(object).then((result) => {
          //     if (result.finalResult.status === 2) {
          //       swal.fire({
          //         icon: "success",
          //         text: result.finalResult.responseMessage,
          //       });
          //     } else {
          //       swal.fire({
          //         icon: "error",
          //         text: "Failed to Capture Customer Details",
          //       });
          //     }
          //   });
          // }
          objectPath.set(topDto, "FormatedData.ProposalNumber", x.finalResult.proposalNumber);
          objectPath.set(topDto, "proposalNo", x.finalResult.proposalNumber);
          await GetProductByCode(topDto.ProductCode).then(async (x2) => {
            const res = await GetProposalByNumber(x.finalResult.proposalNumber, x2.data.productId);
            objectPath.set(topDto, "KYCNo", res.data[0].policyDetails.KYCNo);
            setGenericPolicyDto(topDispatch, { ...topDto });
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
    }
    if (tDto.proposalNo !== "" && tDto.proposalNo !== undefined) {
      fun = await UpdateProposalDetails(tDto).then(async (x) => {
        if (x.responseMessage === "Updated successfully") {
          await GetProductByCode(topDto.ProductCode).then(async (x2) => {
            const res = await GetProposalByNumber(x.data.proposalNumber, x2.data.productId);
            objectPath.set(tDto, "KYCNo", res.data[0].policyDetails.KYCNo);
            setGenericPolicyDto(topDispatch, { ...tDto });
            setBackDropFlag(false);
            //  fun = true;
          });
        }
        return true;
        //  else {
        //   setBackDropFlag(false);
        //   swal.fire({
        //     icon: "error",
        //     text: "Incurred an error please try again later",
        //   });
        // }
      });
    }
    return fun;
  };

  const CheckStatus = async () => {
    if (
      objectPath.get(tDto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !== undefined
    ) {
      await swal
        .fire({
          icon: "warning",
          text: `Do you want to proceed with ${
            objectPath.get(tDto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
            undefined
              ? tDto.InsurableItem[0].RiskItems.length
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
          setBackDropFlag(true);
          await QuotationUpdate(topDto);
          tDto.Temp.Upload = tDto.InsurableItem[0].RiskItems;
          setGenericPolicyDto(topDispatch, { ...tDto });
          await GenericApi("NepalAgriLivestock", "NepalAgriLivestockCPBGapi", tDto).then(
            async (x) => {
              if (x.finalResult) {
                if (x.finalResult.FinalPremium !== "") {
                  objectPath.set(tDto, "PremiumDetails", x.finalResult);
                  objectPath.set(
                    tDto,
                    "PaymentAmount",
                    parseFloat(x.finalResult.FinalPremium).toFixed(2)
                  );
                  objectPath.set(tDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
                  // setBackDropFlag(false);

                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.FinalPremium",
                    formater.format(x.finalResult.FinalPremium)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.BasePlusAccPremium",
                    formater.format(x.finalResult.BasePlusAccPremium)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.RevisedAmountPDF",
                    formater.format(x.finalResult.RevisedAmountPDF)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.TaxableAmount",
                    formater.format(x.finalResult.TaxableAmount)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
                    formater.format(x.finalResult.AccidentalPremium)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.StampDuty",
                    formater.format(x.finalResult.StampDuty)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.PremiumafterSubsidy",
                    formater.format(x.finalResult.PremiumafterSubsidy)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.GovtSubsidyPremium",
                    formater.format(x.finalResult.GovtSubsidyPremium)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.BasePremium",
                    formater.format(x.finalResult.BasePremium)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
                    formater.format(x.finalResult.PerPersonAccidentalPremium)
                  );
                  objectPath.set(
                    tDto,
                    "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
                    formater.format(x.finalResult.AccidentalPremium)
                  );
                  x.finalResult.NepalAgriCPBGRatingV2.output.forEach((x1, i) => {
                    objectPath.set(
                      tDto,
                      `FormatedData.CalculatedPremiumDetails.Output.${i}.AgriGeneralRateNew_Age`,
                      x1.AgriGeneralRateNew_Age
                    );
                    objectPath.set(
                      tDto,
                      `FormatedData.CalculatedPremiumDetails.Output.${i}.TotalSumInsured`,
                      formater.format(x1.TotalSumInsured)
                    );
                    objectPath.set(
                      tDto,
                      `FormatedData.CalculatedPremiumDetails.Output.${i}.BasePremium`,
                      formater.format(x1.BasePremium)
                    );
                    objectPath.set(
                      tDto,
                      `FormatedData.CalculatedPremiumDetails.Output.${i}.AgriGeneralRateNew`,
                      x1.AgriGeneralRateNew
                    );
                    objectPath.set(
                      tDto,
                      `FormatedData.CalculatedPremiumDetails.Output.${i}.AgriGeneralRateNew_SubClass`,
                      x1.AgriGeneralRateNew_SubClass
                    );
                    objectPath.set(
                      tDto,
                      `FormatedData.CalculatedPremiumDetails.Output.${i}.TotalNumberofCattle`,
                      x1.TotalNumberofCattle
                    );
                    objectPath.set(tDto, `Temp.Upload.${i}.Rate(%)`, "5%"); // x1.AgriGeneralRateNew
                    objectPath.set(tDto, `Temp.Upload.${i}.Premium Amount`, x1.BasePremium);
                    objectPath.set(tDto, `InsurableItem.0.RiskItems.${i}.Rate(%)`, "5%");
                    objectPath.set(
                      tDto,
                      `FormatedData.CalculatedPremiumDetails.Output.${i}.Symbol Number/Tag Number`,
                      tDto.InsurableItem[0].RiskItems[i]["Symbol Number/Tag Number"]
                    );
                    objectPath.set(
                      tDto,
                      `InsurableItem.0.RiskItems.${i}.formatedSumInsured`,
                      formater.format(tDto.InsurableItem[0].RiskItems[i].SumInsured)
                    );
                    objectPath.set(
                      tDto,
                      `InsurableItem.0.RiskItems.${i}.SumInsured`,
                      tDto.InsurableItem[0].RiskItems[i].SumInsured
                    );
                    objectPath.set(
                      tDto,
                      `InsurableItem.0.RiskItems.${i}.Premium Amount`,
                      formater.format(x1.BasePremium)
                    );
                    objectPath.set(
                      topDto,
                      "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
                      x.finalResult.CommissionPercentage
                    );
                    objectPath.set(
                      topDto,
                      "FormatedData.CalculatedPremiumDetails.CommissionAmount",
                      formater.format(x.finalResult.CommissionAmount)
                    );
                  });

                  setGenericPolicyDto(topDispatch, { ...tDto });
                } else {
                  // onClear();
                  swal.fire({
                    icon: "error",
                    text: "Incurred an error please try again later",
                    confirmButtonColor: "#0079CE",
                  });
                }
              } else {
                // onClear();
                // flag.backdropflag = false;
                // setFlag({ ...flag });
                swal.fire({
                  icon: "error",
                  text: "Incurred an error please try again later",
                  confirmButtonColor: "#0079CE",
                });
              }
            }
          );
          setGenericPolicyDto(topDispatch, tDto);
          fun = true;
          return true;
        });
    } else {
      swal.fire({
        icon: "error",
        text: "Please upload the bulk data",
        confirmButtonColor: "#0079CE",
      });
    }
    return fun;
  };

  // objectPath.del(topDto, "Temp");
  switch (activeStep) {
    case 0:
      if (
        topDto?.Temp?.DataGridValues[0]?.SumInsured !== "" &&
        topDto?.Temp?.DataGridValues[0]?.NumberofCattle !== ""
      ) {
        fun = await GenericApi("NepalAgriLivestock", "NepalAgriLivestockCPBGapi", topDto).then(
          async (x) => {
            if (x.finalResult) {
              objectPath.set(topDto, "PremiumDetails", x.finalResult);
              objectPath.set(
                topDto,
                "PaymentAmount",
                parseFloat(x.finalResult.FinalPremium).toFixed(2)
              );
              objectPath.set(
                topDto,
                "Temp.DataGridValues.0.Rate(%)",
                "5%"
                // x.finalResult.NepalAgriCPBGRatingV2.output[0].AgriGeneralRateNew
              );
              objectPath.set(
                topDto,
                "Temp.DataGridValues.0.Premium Amount",
                formater.format(x.finalResult.NepalAgriCPBGRatingV2.output[0].BasePremium)
              );
              // objectPath.set(
              //   topDto,
              //   "InsurableItem.0.RiskItems.0.Rate(%)",
              //   x.finalResult.NepalAgriCPBGRatingV2.output[0].AgriGeneralRateNew
              // );
              objectPath.set(
                topDto,
                "InsurableItem.0.RiskItems.0.Premium Amount",
                formater.format(x.finalResult.NepalAgriCPBGRatingV2.output[0].BasePremium)
              );
              objectPath.set(
                topDto,
                "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
                formater.format(x.finalResult.PerPersonAccidentalPremium)
              );
              objectPath.set(
                topDto,
                "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
                formater.format(x.finalResult.AccidentalPremium)
              );
              const res1 = await SaveQuotation(topDto);
              objectPath.set(topDto, "Quotation No", res1.data.quotation.quoteNo);
              setGenericPolicyDto(topDispatch, { ...topDto });
              setBackDropFlag(false);
              const fun1 = await swal
                .fire({
                  // title: "<strong>Quick Quote Premium Breakup</strong>",
                  // html: `<div style={{display:"flex",justifyContent:"space-between"}}><table width="100%"><tr><td style={{textAlign:"left"}}>Basic Premium</td><td style={{textAlign:"right"}}>रु ${formater.format(
                  //   x.finalResult.BasePremium
                  // )}</td></tr><tr><td style={{textAlign:"left"}}>Govt Subsidy</td><td style={{textAlign:"right"}}>रु ${formater.format(
                  //   x.finalResult.GovtSubsidyPremium
                  // )}</td></tr><tr><td style={{textAlign:"left"}}>Premium After Govt Subsidy</td><td style={{textAlign:"right"}}>रु ${formater.format(
                  //   x.finalResult.PremiumafterSubsidy
                  // )}</td></tr><tr><td style={{textAlign:"left"}}>StampDuty</td><td style={{textAlign:"right"}}>रु ${formater.format(
                  //   x.finalResult.StampDuty
                  // )}</td></tr><tr><td style={{textAlign:"left"}}>Accidental Premium</td><td style={{textAlign:"right"}}>रु ${formater.format(
                  //   x.finalResult.AccidentalPremium
                  // )}</td></tr><tr><td style={{textAlign:"left"}}><b><strong>Total Premium to be paid by customer<strong/></b></td><td style={{textAlign:"right"}}><b>रु ${formater.format(
                  //   x.finalResult.FinalPremium
                  // )}</b></td></tr></table></div>`,
                  title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                  html: `<div style="display: flex; flex-direction: row;">  <div style="flex: 5; text-align: left; margin-left: 2rem" ">  <div>Basic Premium</div>  <div>Govt Subsidy</div>  <div>Premium After Govt Subsidy</div>  <div>Stamp Duty</div>  <div>Accidental Premium</div>  <div><b>Total Premium to be paid by customer</b></div>  </div>  <div style="flex: 0.7; text-align: right;font-size:16.3px; margin-bottom: 0.5rem" ">  <div>रु</div>  <div>रु</div>  <div>रु</div>  <div>रु</div>  <div>रु</div>  <div><b>रु</b></div>  </div>  <div style="flex: 1.8; text-align: right; margin-right: 1rem">  <div> ${formater.format(
                    x.finalResult.BasePremium
                  )}</div>  <div> ${formater.format(
                    x.finalResult.GovtSubsidyPremium
                  )}</div>  <div> ${formater.format(
                    x.finalResult.PremiumafterSubsidy
                  )}</div>  <div> ${formater.format(
                    x.finalResult.StampDuty
                  )}</div>  <div> ${formater.format(
                    x.finalResult.AccidentalPremium
                  )}</div>  <div><b> ${formater.format(
                    x.finalResult.FinalPremium
                  )}</b></div>  </div> </div>`,
                  showConfirmButton: true,
                  confirmButtonText: "Proceed",
                  confirmButtonColor: "#0079CE",
                  // showCancelButton: true,
                  // cancelButtonColor: "#ef5350",
                  width: 600,
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
      } else {
        if (topDto?.Temp?.DataGridValues[0]?.SumInsured === "") {
          DataGridval.SumInsured = true;
        }
        if (topDto?.Temp?.DataGridValues[0]?.NumberofCattle === "") {
          DataGridval.NumberofCattle = true;
        }
        swal1({
          icon: "error",
          text: "Please fill the required fields",
        });
      }

      break;
    case 1:
      fun = true;
      break;
    case 2:
      setBackDropFlag(false);
      fun = CheckStatus();
      // setBackDropFlag(false);
      // swal.fire({
      //   icon: "error",
      //   text: "Incurred an error please try again later",
      // });
      break;
    case 3:
      fun = true;
      break;
    case 4:
      fun = handleProposal();
      break;
    case 5:
      setBackDropFlag(false);
      fun = swal
        .fire({
          input: "checkbox",
          confirmButtonColor: "#0079CE",
          showCloseButton: true,
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
    case 6:
      fun = true;
      break;
    default:
      fun = true;
      break;
  }
  return fun;
};
const getButtonDetails = (activeStep) => {
  let btnDetails = {};
  const onReset0 = (dto, setDto, dispatch) => {
    const lDto = dto;
    const DataGridValues = {
      Age: "1 month to 3 month",
      NumberofCattle: "",
      SumInsured: "",
      "Premium Amount": "",
      "Rate(%)": "",
      rowID: 1,
    };
    lDto.Temp.DataGridValues = [DataGridValues];
    setDto(dispatch, { ...lDto });
  };
  const onReset1 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.ProposerDetails.documentDetails = [{ ...docDetails() }];
    setDto(dispatch, { ...lDto });
  };
  const onReset2 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.InsurableItem[0].VaccinationandOtherDocuments = [{ ...docDetails() }];
    setDto(dispatch, { ...lDto });
  };
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true, onClick: onReset0 },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: onReset1 },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: onReset2 },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 6:
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
export { getProcessSteps, getPageContent, getSectionContent, getOnNextClick, getButtonDetails };
