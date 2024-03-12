import { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Grid, Stack, Typography, Checkbox, List, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import objectPath from "object-path";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import swal from "sweetalert2";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

import Success from "assets/images/Nepal/Success.png";
// import MDTypography from "../../../../../../components/MDTypography";
import { GetTemplatePayload, GetProposalByNumber } from "../../Payment/Apis";
import {
  useDataController,
  setGenericPolicyDto,
  setGenericInfo,
} from "../../../../../BrokerPortal/context";
import { MotorCycleJson } from "./data/Json/MotorCycleJson";

import { BranchDetails, docDetails, InsuredDetails } from "./data/Json/CommercialJson";
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
  SavepolicyWFStatus,
  UpdateWorkflowStatus,
  SendNotification,
  // DeduplicationByDistrictRefNo,
  // CreateCustomer,
  Documentuploadaws,
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  UpdateProposalDetails,
  IsNumeric1,
  // PolicyStartDateFiscalYear,
  NumberofDaysinYear,
  PolicyStartDateMinDate,
  PolicyStartDateMaxDate,
  SaveEndorsementWFStatus,
  EndorsementGenericSave,
  UpdateEndorsementV2,
  GetEndorsementJson,
  UpdateSequenceNumber,
  GetProductByCode,
  // UpdatePolicyDetails,
} from "./data/APIs/MotorCycleApi";

import {
  IsNumeric,
  arrayRange,
  addDays1,
  // IsAlphaNum,
  // ,IsAlphaSpace
  IsEmail,
  // IsNumaricSpecial,
  IsNumaricSpecialNoSpace,
  IsFreetextNoSpace,
  DateFormatFromDateObject,
  // IsAlphaNumSpace,
  AgeCalculator,
  IsMobileNumber,
  NumBetween,
} from "../../../../../../Common/Validations";

// import { set } from "lodash";
let topDto = null;
let topDispatch = null;
let topMasters = {};
let topGenericInfo = {};
let topNavigate = null;
let cckw = "";
let yearofVehicleManufacture = "";
let ageofVehicle = "";
let ncdYear = "";

const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: "never",
});
const masters = {
  DocType: [],
  Department: [],
  // Class: [],
  PremiumType: [],
  PremiumType1: [],
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
  // CitizenshipIssueDistrict: [],
  District: [],
  // BranchName: [],
  IssuingBranch: [],
  State: [],
  Model: [],
  Make: [],
  Districtnew: [],
  Municipalitynew: [],
  PlaceSelect: [
    {
      State: [],
      District: [],
      Municipality: [],
    },
  ],
  NCDYear: [],
  BankDetails: [],
  BankorFinancialInstituionNameinEnglish: [],
  BranchMasters: [],
  FieldOfficer: [],
  SubFieldOfficer: [],
  AgentCode: [],
  SubAgentCode: [],
  EndoPremiumType: [],
};
const m = {
  Class: [],
};
const getProcessSteps = () => {
  const steps = [
    {
      name:
        topGenericInfo && topGenericInfo.Endorsement === true ? "Policy Details" : "Quote Details",
      visible: true,
      Endorsement: true,
    },
    { name: "Customer Details", visible: true, Endorsement: true },
    { name: "Vehicle Details", visible: true, Endorsement: true },
    { name: "Risk Details", visible: true, Endorsement: true },
    { name: "Premium Summary", visible: true, Endorsement: true },
    {
      name: "Payment",
      visible: true,
      Endorsement:
        topGenericInfo && topGenericInfo.Endorsement === true && topGenericInfo.Flow === "Approved",
    },
  ];
  return steps;
};

const getPageContent = (activeStep) => {
  const [flag, setFlag] = useState({
    ProposerDetails: false,
    InsuredDetails: false,
    IndividualInformation: false,
    CareOfDetails: false,
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
        Endorsement: true,
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

      flag.InsuredDetails = true;
      flag.OtherDetails = true;
      flag.ProposerDetails = true;
    }
    if (objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution") {
      flag.BankFinancial = true;
      flag.BranchDetails = true;
      flag.CareOfDetails = true;
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
        {
          name:
            topGenericInfo && topGenericInfo.Endorsement === true
              ? "Policy Details"
              : "Quote Details",
          visible: true,
          Endorsement: true,
        },
      ];
      break;
    case 1:
      steps = [
        { name: "Customer Details", visible: true, Endorsement: true },
        {
          name: "Bank/Financial Institution Details",
          visible: objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
          Endorsement: objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        {
          name: "Branch Details 1",
          visible:
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution" &&
            objectPath.get(dto, "Bankdetails.BankCategory") !== "" &&
            objectPath.get(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish") !== "",
          Endorsement: objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        {
          name: "Proposer Details",
          visible:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
          Endorsement:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        {
          name: "Insured Details",
          visible:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
          Endorsement:
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
          Endorsement:
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
          Endorsement:
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
          Endorsement:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        {
          name: "Proprietor Details",
          visible:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
          Endorsement:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
        {
          name: "Other Details",
          visible:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
          Endorsement:
            objectPath.get(dto, "FinancingType") === "Direct" ||
            objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution",
        },
      ];
      break;
    case 2:
      steps = [
        { name: "Vehicle Details", visible: true, Endorsement: true },
        {
          name: "Roll Over Documents",
          visible: objectPath.get(dto, "DocType") === "RollOver",
          Endorsement: objectPath.get(dto, "DocType") === "RollOver",
        },
      ];
      break;
    case 3:
      steps = [
        { name: "Issuing Branch Details", visible: true, Endorsement: true },
        { name: "Risk Details", visible: true, Endorsement: true },
        {
          name:
            topGenericInfo?.Endorsement === true &&
            topGenericInfo.endorsementType === "Policy Cancellation"
              ? "Cancellation Details"
              : "Endorsement Details",
          visible: topGenericInfo && topGenericInfo.Endorsement === true,
          Endorsement: topGenericInfo && topGenericInfo.Endorsement === true,
        },
      ];
      break;
    case 4:
      steps = [
        {
          name:
            /* eslint-disable */
            topGenericInfo &&
            topGenericInfo.Endorsement === true &&
            topGenericInfo.endorsementType === "Non-Financial Endorsement"
              ? "Premium Break-Up Screen"
              : topGenericInfo &&
                topGenericInfo.Endorsement === true &&
                topGenericInfo.endorsementType === "Financial Endorsement"
              ? "Endorsement Premium Break-Up Screen"
              : "Premium Break-Up Screen",
          /* eslint-enable */
          visible: true,
          Endorsement: true,
        },
      ];
      break;
    case 5:
      steps = [{ name: "Payment Page", visible: true, Endorsement: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// const { MaritalStatus } = MasterData().basicdetails.Masters;

const getSectionContent = (activeStep) => {
  // const [paymentPage, setPaymentPage] = useState([...PaymentPage]);

  const [CPremium, setCPremium] = useState({
    GrossPremium: "",
    VAT: "",
    StampDuty: "",
    TotalPremium: "",
  });
  const [control, dispatch] = useDataController();
  const { genericPolicyDto, genericInfo, loginUserDetails } = control;
  let dto = genericPolicyDto;

  const [flag, setFlag] = useState({
    Department: true,
    Period: false,
    NumberOfDays: true,
    // CancleIcon: false,
    Pan: false,
    DocType: false,
    DirectFromShowRoom: true,
    ExistingDetails: false,
    ExistingDetails1: false,
    DocDublication: false,
    Individual: false,
    Flow: false,
    Disabled: false,
  });
  // const [docCountList, setDocCountList] = useState([
  //   { DocumentList: "", DocId: "", DocName: "", UploadDocDate: "", DocId: "" },
  // ]);
  const onAddDocument = () => {
    if (
      (genericInfo.Endorsement === true &&
        genericInfo.endorsementType === "Non-Financial Endorsement") ||
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
      (genericInfo.Endorsement === true &&
        genericInfo.endorsementType === "Non-Financial Endorsement") ||
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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[600]),
    backgroundColor: blue[600],
    "&:hover": {
      backgroundColor: blue[800],
    },
  }));
  const handleDublicateDoc = (e, DocName, index) => {
    if (
      (genericInfo.Endorsement === true &&
        genericInfo.endorsementType === "Non-Financial Endorsement") ||
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
      (genericInfo &&
        genericInfo.Endorsement === true &&
        genericInfo.endorsementType === "Non-Financial Endorsement") ||
      (genericInfo && genericInfo.Endorsement === undefined)
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
      (genericInfo.Endorsement === true &&
        genericInfo.endorsementType === "Non-Financial Endorsement") ||
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
      (genericInfo.Endorsement === true &&
        genericInfo.endorsementType === "Non-Financial Endorsement") ||
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
      (genericInfo.Endorsement === true &&
        genericInfo.endorsementType === "Non-Financial Endorsement") ||
      genericInfo.Endorsement === undefined
    ) {
      // const deletedarray = docCountList.filter((_x, i) => i !== index);
      // setDocCountList([...deletedarray]);
      objectPath.del(dto, `ProposerDetails.documentDetails.${index}`);
      setGenericPolicyDto(dispatch, dto);
    }
  };

  const onUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      const formData = new FormData();
      console.log("file, file.name", file, file.name);
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

  const ref2 = useRef();
  const UploadDocument = async (file, type) => {
    const formData = new FormData();
    formData.append(file.name, file, file.name);

    // console.log("param1", file.name);

    // console.log("param2", file);
    const uploadres = await Documentuploadaws(formData);

    // console.log("111", uploadres);
    if (uploadres.status === 1) {
      swal.fire({
        icon: "success",
        text: `Document Uploaded Successfully`,
        confirmButtonColor: "#0079CE",
      });
    }
    if (type === "RenewalDoc") {
      ref2.current.value = "";
      const inputString = uploadres.fileName;
      const variable = uploadres.docid;
      const outputString = inputString.replace("NepalMotorrenevaldoc", "").replace(variable, "");
      objectPath.set(dto, "documentDetails.0.DocName", outputString);
      objectPath.set(dto, "documentDetails.0.DocId", uploadres.docid);
      objectPath.set(dto, "documentDetails.0.UploadDocDate", uploadres.dMSDTOs[0].uploadDate);
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const handleFileUploadvehicle = async (event, type) => {
    await UploadDocument(event.target.files[0], type);
    // console.log("files", event.target.files[0]);
  };

  const handleFiledelete = async (event, type) => {
    if (genericInfo && genericInfo.Endorsement === undefined) {
      if (type === "RenewalDoc") {
        ref2.current.value = "";
        objectPath.set(dto, "documentDetails.0.DocName", "");
        objectPath.set(dto, "documentDetails.0.DocId", "");
        objectPath.set(dto, "documentDetails.0.UploadDocDate", "");

        setGenericPolicyDto(dispatch, dto);
      }
    }
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
      if (varName === "VehicleNoEnglish")
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleNoNepali", oText);

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

  const onNumberOfDays = (val) => {
    const periodVal = objectPath.get(dto, "Period");
    let periodNum = 0;
    let periodNum2 = 0;
    topMasters.Period.forEach((x) => {
      if (x.mValue === periodVal && periodVal !== "Above 8 months") {
        periodNum = x.description;
        periodNum2 = x.fieldName;
      }
      if (periodVal === "Above 8 months") {
        if (dto.PolicyStartDate === "") {
          periodNum = NumberofDaysinYear(
            DateFormatFromDateObject(new Date(), "m/d/y"),
            DateFormatFromDateObject(new Date(), "m/d/y").split("/")[2]
          );
        } else {
          periodNum = NumberofDaysinYear(dto.PolicyStartDate, dto.PolicyStartDate.split("/")[2]);
        }
        periodNum2 = x.fieldName;
      }
    });
    if (val === "") {
      objectPath.set(dto, "PolicyStartDate", "");
      objectPath.set(dto, "PolicyEndDate", "");
    }
    console.log("val", val);
    if (IsNumeric(val) === true) {
      if (Number(val) <= 0) return `invalid days`;
      if (Number(val) > periodNum || Number(val) < periodNum2)
        return `Days should be in range ${periodNum2} and ${periodNum}`;
    }

    return IsNumeric(val);
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
        // masters.PlaceSelect[index].District = [];
        // if (tArr11 && index !== 0) {
        //   tArr11[index - 1][3].options = [];
        masters.Districtnew = [];
        masters.Municipalitynew = [];
      }
    }
    if (n === "District2") {
      if (a !== null) {
        masters.Municipalitynew = [];
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.District`, a.mValue);
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.Municipality`, "");
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.WardNumber`, "");
        masters.Municipalitynew = res.data;
      } else {
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.District`, "");
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.Municipality`, "");
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.WardNumber`, "");
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
    setGenericPolicyDto(dispatch, dto);
  };

  const onVehicalSelect = async (e, a, n) => {
    if (n === "Nameofthevehicle") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Make", { FieldName: a.mID });
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Nameofthevehicle", a.mValue);
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Make", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Model", "");
        masters.Make = [];
        masters.Model = [];
        masters.Make = res.data;
      } else {
        masters.Make = [];
        masters.Model = [];
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Nameofthevehicle", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Make", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Model", "");
      }
    }

    if (n === "makeofthevehicle") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Model", { FieldName: a.mID });
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Make", a.mValue);
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Model", "");
        masters.Model = [];
        masters.Model = res.data;
      } else {
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Make", "");
        masters.Make = [];
        masters.Model = [];

        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Model", "");
      }
    }

    setGenericPolicyDto(dispatch, dto);
  };

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

  // const valueinenglish = "";
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
          value: "BranchDetailsButton",
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
  const onTypeofCover = (_e, a) => {
    if (a !== null) {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.TypeofCover", a.fieldName);
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.TypeofCoverLabel", a.mValue);
      setGenericPolicyDto(dispatch, dto);
    } else {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.TypeofCover", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.TypeofCoverLabel", "");
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const handleSavepolicyWFStatus = async () => {
    flag.Disabled = true;
    setFlag({ ...flag });
    if (genericInfo && genericInfo.Endorsement === undefined) {
      const proposalNo = objectPath.get(dto, "proposalNo");

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
    }
    if (genericInfo && genericInfo.Endorsement === true) {
      await GetEndorsementJson(dto.EndorsementNo).then(async (x) => {
        const tDto1 = {
          ...dto,
          ...x.data.finalResult.EndorsementDetails,
        };
        delete tDto1.PolicyNo;
        delete tDto1.DecisionStatus;
        delete tDto1.NonFinPremium;
        const Details = {
          PolicyNo: x.data.finalResult.PolicyNo,
          EndorsementDetails: tDto1,
          EndorsementType: x.data.finalResult.EndorsementType,
          EndorsementNo: x.data.finalResult.EndorsementDetails.EndorsementNo,
        };
        await UpdateEndorsementV2(false, Details);
      });

      // await EndorsementGenericSave(false, Details).then(async (x) => {
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SaveEndorsementWFStatus(dto.EndorsementNo, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SaveEndorsementWFStatus(dto.EndorsementNo, a);
      // });
    }
    handleModalOpen();
    flag.Disabled = false;
    setFlag({ ...flag });
    // }
  };
  const handleEndoDisable = () => {
    let flags = false;
    if (
      genericInfo?.Endorsement === true &&
      genericInfo.endorsementType === "Financial Endorsement"
    ) {
      // flags = true;
      if (
        (genericInfo?.Endorsement === true &&
          genericInfo?.endorsementCategory === "Refund" &&
          Number(
            parseFloat(dto?.PremiumDetails?.EndorsementPremiumDetails?.EndorsementPremium).toFixed(
              2
            )
          ) >= 0) ||
        dto?.PremiumDetails?.EndorsementPremiumDetails?.EndorsementPremium === undefined
      ) {
        flags = true;
      }
      if (
        (genericInfo?.Endorsement === true &&
          genericInfo?.endorsementCategory === "Extra" &&
          Number(
            parseFloat(dto?.PremiumDetails?.EndorsementPremiumDetails?.EndorsementPremium).toFixed(
              2
            )
          ) <= 0) ||
        dto?.PremiumDetails?.EndorsementPremiumDetails?.EndorsementPremium === undefined
      ) {
        flags = true;
      }
    }
    return flags;
  };
  const handlesavedebitnote = () => {
    SavehandleModalOpen();
  };

  const onAddBranchDetails = () => {
    dto.Bankdetails.BranchDetails.push({ ...BranchDetails() });
    // dto.InsurableItem[0].RiskItems[0].Bankdetails.BranchDetails.push(BranchDetails);
    setGenericPolicyDto(dispatch, dto);
  };
  const OnClassSelect = async (_e, a) => {
    if (a !== null) {
      objectPath.set(dto, "Class", a.mValue);
      // masters.TypeofCoverFilter = masters.TypeofCover.filter((x) => x.description === a.mValue);

      if (a.mValue === "Motor Cycle") {
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.DirectDiscount", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.CompulsoryExcess", "500");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleCost", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.TotalSumInsured", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.VolunatryExcess", "");

        objectPath.set(dto, "RiProductCode", "NepalMotorTwoWheelerComp");

        // await GetNPCommonMaster().then((r) => {
        //   console.log(r, 2222);
        //   r.forEach((x) => {
        //     masters[x.mType] = x.mdata.filter((y) => y.mValue !== "Renewal");
        //   });
        // });
      }
      if (a.mValue === "Third Party Motorcycle") {
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.CompulsoryExcess", "0");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.VolunatryExcess", "0");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.DirectDiscount", "No");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleCost", "0");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.TotalSumInsured", "0");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.NCDYear", "");
        objectPath.set(dto, "RiProductCode", "NepalMotorTwoWheelerTP");
        // masters.PremiumType = masters.PremiumType.filter((x) => x.mValue !== "Short Period");
      }
      objectPath.set(
        dto,
        "FormatedData.CalculatedPremiumDetails.CompulsoryExcess",
        formater.format(dto.InsurableItem[0].RiskItems[0].CompulsoryExcess)
      );
      objectPath.set(dto, "BusinessType", "New Business");
      objectPath.set(dto, "PremiumType", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.Category", "Normal");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.TypeofCoverLabel", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.GovernmentVehicle", "");
      // objectPath.set(dto, "InsurableItem.0.RiskItems.0.VolunatryExcess", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.AgeofVehicle", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.YearofManufacture", "");
      objectPath.set(dto, "PolicyStartDate", DateFormatFromDateObject(new Date(), "m/d/y"));
      objectPath.set(dto, "PolicyEndDate", "");
      objectPath.set(dto, "NumberofDays", "");
      objectPath.set(dto, "Period", "");
      if (dto.ProvinceCode !== undefined && genericInfo && genericInfo.Endorsement === undefined) {
        const BusinessTypeCode = objectPath.get(dto, "DocType").split("")[0];
        let ClassCode = "";
        if (a.mValue === "Motor Cycle") {
          ClassCode = "MC";
        } else if (a.mValue === "Third Party Motorcycle") {
          ClassCode = "TPMC";
        }
        objectPath.set(
          dto,
          "PolicyPrefix",
          dto.ProvinceCode.concat("/", dto.ShortCode, "/", "MV").concat(
            "/",
            ClassCode,
            "/",
            BusinessTypeCode,
            "/",
            dto.Channel.FiscalYear,
            "/"
          )
        );
      }
      setGenericPolicyDto(dispatch, dto);
    } else {
      objectPath.set(dto, "Class", "");
      objectPath.set(dto, "RiProductCode", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.DirectDiscount", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleCost", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.TotalSumInsured", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.CompulsoryExcess", "");
      objectPath.set(dto, "PolicyStartDate", "");
      objectPath.set(dto, "PolicyEndDate", "");
      objectPath.set(dto, "NumberofDays", "");
      objectPath.set(dto, "Period", "");
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const OnGovtSelect = async (_e, a) => {
    if (a !== null) {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.GovernmentVehicle", a.mValue);

      if (a.mValue === "Yes") {
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.DirectDiscount", "No");
      } else if (objectPath.get(dto, "Class") === "Motor Cycle") {
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.DirectDiscount", "");
      }
    } else {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.GovernmentVehicle", "");
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const Period = (_e, a) => {
    if (genericInfo && genericInfo.Endorsement === undefined) {
      objectPath.set(dto, "NumberofDays", "");
      if (a !== null) {
        objectPath.set(dto, "Period", a.mValue);
        setGenericPolicyDto(dispatch, dto);
      } else {
        objectPath.set(dto, "PolicyStartDate", "");
        objectPath.set(dto, "PolicyEndDate", "");
        objectPath.set(dto, "Period", "");
        objectPath.set(dto, "NumberofDays", "");
        setGenericPolicyDto(dispatch, dto);
      }
    }
  };

  const ifcheckedvalueDirectFromShowRoom = async (e) => {
    objectPath.set(
      dto,
      "InsurableItem.0.RiskItems.0.DirectFromShowRoom",
      e.target.checked ? "Yes" : "No"
    );

    setGenericPolicyDto(dispatch, dto);

    if (objectPath.get(dto, "InsurableItem.0.RiskItems.0.DirectFromShowRoom") === "Yes") {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleNoEnglish", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleNoNepali", "");
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const [resetCount, setResetCount] = useState(0);
  const Navigate = useNavigate();
  const onModalclose = () => {
    if (genericInfo && genericInfo.Endorsement === undefined) {
      Navigate("/retail/home");
    }
    if (genericInfo && genericInfo.Endorsement === true) {
      setGenericInfo(dispatch, {});
      setGenericInfo(dispatch, { ...genericInfo, Clear: true });
      //   setGenericPolicyDto(dispatch, {});
      Navigate("/Endorsement/Dashboard");
    }
  };
  const onSaveModalClose = async () => {
    if (
      genericInfo &&
      (genericInfo.ProposalNo !== undefined || genericInfo.EndorsementNo !== undefined)
    ) {
      // await UpdateProposalDetails(dto).then(async () => {
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
            if (
              result.isConfirmed === true &&
              genericInfo &&
              genericInfo.Endorsement === undefined
            ) {
              Navigate("/retail/home");
            }
            if (result.isConfirmed === true && genericInfo && genericInfo.Endorsement === true) {
              setGenericInfo(dispatch, {});
              setGenericInfo(dispatch, { ...genericInfo, Clear: true });
              setGenericPolicyDto(dispatch, {});
              Navigate("/Endorsement/Dashboard");
            }
          });
      }
      // });
    } else {
      const proposalNo =
        genericInfo.Endorsement === undefined
          ? objectPath.get(dto, "FormatedData.ProposalNumber")
          : objectPath.get(dto, "EndorsementNo");
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };

      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "322",
      };
      if (genericInfo && genericInfo.Endorsement === undefined) {
        await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj1);
        await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);
      }
      if (genericInfo && genericInfo.Endorsement === true) {
        await GetEndorsementJson(dto.EndorsementNo).then(async (x) => {
          if (x?.data?.finalResult?.PolicyNo) {
            const tDto1 = {
              ...dto,
              ...x.data.finalResult.EndorsementDetails,
            };
            delete tDto1.PolicyNo;
            delete tDto1.DecisionStatus;
            delete tDto1.NonFinPremium;
            const Details = {
              PolicyNo: x.data.finalResult.PolicyNo,
              EndorsementDetails: tDto1,
              EndorsementType: x.data.finalResult.EndorsementType,
              EndorsementNo: x.data.finalResult.EndorsementDetails.EndorsementNo,
            };
            await UpdateEndorsementV2(false, Details);
          } else {
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
          }
        });
        await SaveEndorsementWFStatus(proposalNo, obj1);
        await SaveEndorsementWFStatus(proposalNo, a);
      }
      SavehandleModalClose();
      swal
        .fire({
          html: `<div> <img src=${Success} alt="success">
          <br>Debit Note Saved Successfully</br>
          ${
            genericInfo.Endorsement === undefined
              ? objectPath.get(dto, "FormatedData.ProposalNumber")
              : objectPath.get(dto, "EndorsementNo")
          }</div>`,
          // icon: "success",
          // text: "Debit Note Saved Successfully",
          confirmButtonColor: "#0079CE",
        })
        .then((result) => {
          if (result.isConfirmed === true && genericInfo && genericInfo.Endorsement === undefined) {
            Navigate("/retail/home");
          }
          if (result.isConfirmed === true && genericInfo && genericInfo.Endorsement === true) {
            setGenericInfo(dispatch, {});
            setGenericInfo(dispatch, { ...genericInfo, Clear: true });
            setGenericPolicyDto(dispatch, {});
            Navigate("/Endorsement/Dashboard");
          }
        });
    }
  };
  // const OnSearch = async () => {
  //   const obj = {
  //     RefNo: objectPath.get(
  //       dto,
  //       "ProposerDetails.CitizenshipNumber"
  //     ),
  //     IssueDistrict: objectPath.get(
  //       dto,
  //       "ProposerDetails.CitizenshipIssueDistrict"
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
  const generateFile = (content, fileName) => {
    // console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  // const [backDropFlag, setBackDropFlag] = useState(false);
  const onDebitNoteClick = async (e, key) => {
    // setBackDropFlag(true);
    let Class = "";
    if (genericInfo && genericInfo.Endorsement === undefined) {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 215;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 227;
      }
    }
    if (genericInfo && genericInfo.Endorsement === true) {
      if (
        localStorage.getItem("NepalCompanySelect") === "NepalMIC" ||
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        if (genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ") {
          Class = 273;
        }
        if (genericInfo.endorsementCategory === "Name Transfer") {
          Class = 274;
        }
        if (genericInfo.endorsementCategory === "Extra") {
          Class = 289;
        }
        if (genericInfo.endorsementCategory === "Refund") {
          Class = 291;
        }
        if (genericInfo.endorsementType === "Policy Cancellation") {
          Class = 290;
        }
      }
    }

    const proposalNo =
      genericInfo.Endorsement === undefined
        ? objectPath.get(dto, "proposalNo")
        : objectPath.get(dto, "EndorsementNo");
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
      if (result?.status === 200) {
        generateFile(result?.data, proposalNo);
        // setBackDropFlag(false);
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    });
    if (key === "SAVE DEBIT NOTE") {
      onSaveModalClose();
    }
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
  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = objectPath.get(dto, "ProposerDetails.EmailId");
      let Class = "";

      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 214;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 223;
      }
      const obj = {
        proposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: objectPath.get(dto, "proposalNo"),
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
          e.target.checked = false;
          swal.fire({
            icon: "error",
            text: "E-Mail not sent as Incorrect E-Mail ID is captured in Customer Details Screen",
            confirmButtonColor: "#0079CE",
          });
        }
      } else {
        e.target.checked = false;
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
        setGenericPolicyDto(dispatch, dto);
        if (a.mValue === "Government body" || a.mValue === "Individual") {
          flag.Pan = false;
        } else {
          flag.Pan = true;
        }
        setFlag({ ...flag });
        dto.InsuredTypeCode = a.shortCode;
        if (
          dto.ProvinceCode !== undefined &&
          genericInfo &&
          genericInfo.Endorsement === undefined
        ) {
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
        dto.ICShortName = a.Description;
        dto.Channel.IssuingBranch = a.mValue;
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
        let ClassCode = "";
        const Class = objectPath.get(dto, "Class");
        if (Class === "Motor Cycle") {
          ClassCode = "MC";
        } else if (Class === "Third Party Motorcycle") {
          ClassCode = "TPMC";
        }
        const BusinessTypeCode = objectPath.get(dto, "DocType").split("")[0];
        const FiscalYear = objectPath.get(dto, "Channel.FiscalYear");
        objectPath.set(
          dto,
          "PolicyPrefix",
          a.ProvinceCode.concat("/", a.ShortCode, "/", "MV").concat(
            "/",
            ClassCode,
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

  const handleVehicleCost = (e) => {
    const val = e.target.value;
    const previousValue = objectPath.get(dto, "InsurableItem.0.RiskItems.0.VehicleCost");
    const regex = /^(?!(0))[0-9]*$/;
    if (Number(val) <= 5000000 && regex.test(val) === true) {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleCost", val);
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.TotalSumInsured", val);
      setGenericPolicyDto(dispatch, dto);
    } else {
      e.target.value = previousValue;
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleCost", "");
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.TotalSumInsured", "");
      if (Number(val) > 5000000) {
        swal.fire({
          icon: "error",
          text: "Maximum Sum Insured limit is 50 Lakhs",
          confirmButtonColor: "#0079CE",
        });
      }
      if (regex.test(val) === false) {
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleCost", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.TotalSumInsured", "");
        swal.fire({
          icon: "error",
          text: "Invalid input",
          confirmButtonColor: "#0079CE",
        });
      }
    }
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
        // console.log("masters.BranchMasters", masters.BranchMasters, masters.BranchMasters.length);
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
        dto.Channel.SubAgentCode = a.fieldName;
        dto.Channel.SubAgentName = a.mValue;
      } else {
        dto.Channel.SubAgentCode = "";
        dto.Channel.SubAgentName = "";
      }
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const handleVolunatryExcess = (e, a) => {
    if (a !== null) {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.VolunatryExcess", a.mValue);
      objectPath.set(
        dto,
        "FormatedData.CalculatedPremiumDetails.Excess",
        formater.format(a.mValue)
      );
      setGenericPolicyDto(dispatch, dto);
    } else {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.VolunatryExcess", "");
      objectPath.set(dto, "FormatedData.CalculatedPremiumDetails.Excess", "");
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const EndhandleCCKW = (e) => {
    if (
      genericInfo &&
      genericInfo.Endorsement === true &&
      genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details "
    ) {
      // const cckw = genericInfo.PolicyJson.InsurableItem[0].RiskItems[0].CCKW;
      // console.log("cckw", cckw);
      const Government = genericInfo.PolicyJson.InsurableItem[0].RiskItems[0].GovernmentVehicle;
      const category = genericInfo.PolicyJson.InsurableItem[0].RiskItems[0].Category;
      // console.log("e.target.value", e.target.value, cckw);
      if (category === "Normal") {
        if (Government === "Yes") {
          if (Number(cckw) <= 150) {
            if (Number(e.target.value) <= 150) {
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", e.target.value);
              setGenericPolicyDto(dispatch, dto);
            } else {
              swal.fire({
                icon: "error",
                text: "This will fall under Financial Endorsement",
                confirmButtonColor: "#0079CE",
              });
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", cckw);
              setGenericPolicyDto(dispatch, dto);
            }
          }
          if (Number(cckw) > 150) {
            if (Number(e.target.value) > 150) {
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", e.target.value);
              setGenericPolicyDto(dispatch, dto);
            } else {
              swal.fire({
                icon: "error",
                text: "This will fall under Financial Endorsement",
                confirmButtonColor: "#0079CE",
              });
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", cckw);

              setGenericPolicyDto(dispatch, dto);
            }
          }
        } else {
          if (Number(cckw) < 150) {
            if (Number(e.target.value) < 150) {
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", e.target.value);
              setGenericPolicyDto(dispatch, dto);
            } else {
              swal.fire({
                icon: "error",
                text: "This will fall under Financial Endorsement",
                confirmButtonColor: "#0079CE",
              });
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", cckw);
              setGenericPolicyDto(dispatch, dto);
            }
          }
          if (NumBetween(parseInt(cckw, 10), 150, 250, true) === true) {
            if (NumBetween(parseInt(e.target.value, 10), 150, 250, true) === true) {
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", e.target.value);
              setGenericPolicyDto(dispatch, dto);
            } else {
              swal.fire({
                icon: "error",
                text: "This will fall under Financial Endorsement",
                confirmButtonColor: "#0079CE",
              });
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", cckw);
              setGenericPolicyDto(dispatch, dto);
            }
          }
          if (Number(cckw) > 250) {
            if (Number(e.target.value) > 250) {
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", e.target.value);
              setGenericPolicyDto(dispatch, dto);
            } else {
              swal.fire({
                icon: "error",
                text: "This will fall under Financial Endorsement",
                confirmButtonColor: "#0079CE",
              });
              objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", cckw);
              setGenericPolicyDto(dispatch, dto);
            }
          }
        }
      } else {
        if (Number(cckw) < 800) {
          if (Number(e.target.value) < 800) {
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", e.target.value);
            setGenericPolicyDto(dispatch, dto);
          } else {
            swal.fire({
              icon: "error",
              text: "This will fall under Financial Endorsement",
              confirmButtonColor: "#0079CE",
            });
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", cckw);
            setGenericPolicyDto(dispatch, dto);
          }
        }
        if (NumBetween(parseInt(cckw, 10), 800, 1200, true) === true) {
          if (NumBetween(parseInt(e.target.value, 10), 800, 1200, true) === true) {
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", e.target.value);
            setGenericPolicyDto(dispatch, dto);
          } else {
            swal.fire({
              icon: "error",
              text: "This will fall under Financial Endorsement",
              confirmButtonColor: "#0079CE",
            });
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", cckw);
            setGenericPolicyDto(dispatch, dto);
          }
        }
        if (Number(cckw) > 1200) {
          if (Number(e.target.value) > 1200) {
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", e.target.value);
            setGenericPolicyDto(dispatch, dto);
          } else {
            swal.fire({
              icon: "error",
              text: "This will fall under Financial Endorsement",
              confirmButtonColor: "#0079CE",
            });
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.CCKW", cckw);
            setGenericPolicyDto(dispatch, dto);
          }
        }
      }
    }
  };
  const EndhandlePolicyStartDate = () => {
    let Endflag = true;
    if (genericInfo && genericInfo.Endorsement === undefined) {
      Endflag = false;
    }
    if (
      genericInfo &&
      genericInfo.Endorsement === true &&
      genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details "
    ) {
      if (
        new Date(dto.EndorsementEffectiveDate).getTime() <
        new Date(genericInfo.PolicyJson.PolicyStartDate).getTime()
      ) {
        Endflag = false;
      }
    }
    return Endflag;
  };

  useEffect(() => {
    if (genericInfo.reset) setResetCount(genericInfo.reset);
  }, [genericInfo]);

  useEffect(async () => {
    if (masters.Gender.length === 0) {
      await GetNPCommonMaster().then((r) => {
        console.log(r, 2222);
        r.forEach((x) => {
          masters[x.mType] = x.mdata.filter((y) => y.mValue !== "Renewal");
        });
      });
    }
    if (m.Class.length === 0) {
      await GetProdPartnermasterData("Class", { FieldName: "Motor" }).then((r) => {
        console.log(r.data, 1111);
        m.Class = r.data;
      });
    }
    if (masters.State.length === 0) {
      const b = await GetProdPartnermasterData("State", {});
      masters.State = b.data;
    }
    if (masters.NameoftheVehicle.length > 2) {
      masters.NameoftheVehicle = masters.NameoftheVehicle.filter(
        (x) => x.description === "MotorCycle"
      );
    }

    const currentYear = new Date().getFullYear();
    const past30Year = currentYear - 20;
    const yearArr = arrayRange(past30Year, currentYear, 1);
    const yearArrMaster = [];
    yearArr.forEach((x1, i1) => {
      yearArrMaster.push({ mID: i1, mValue: x1.toString() });
    });
    masters.YearofManufacture = yearArrMaster.reverse();
    topGenericInfo = { ...genericInfo };
    topMasters = { ...masters };
    topNavigate = Navigate;
    const pc = objectPath.get(dto, "ProductLogo");
    if (genericInfo && genericInfo.Endorsement === undefined) {
      if (pc === undefined || pc === "") {
        dto = MotorCycleJson();
        if (
          process.env.REACT_APP_AutoPopulateCustomerDetails === "true" ||
          process.env.NODE_ENV === "development"
        ) {
          dto.FinancingType = "Direct";
          dto.PolicyRiskCategory = "Low";
          objectPath.set(dto, "InsuredTypeCode", "BAN");
          dto.ProposerDetails = InsuredDetails;
        }
        objectPath.set(dto, "ProductLogo", genericInfo.ProductLogo);
        objectPath.set(dto, "CompanyName", process.env.REACT_APP_CompanyName);
        objectPath.set(dto, "CompanyAddress", process.env.REACT_APP_CompanyAddress);
        objectPath.set(dto, "CompanyLogo", process.env.REACT_APP_CompanyLogo);
        objectPath.set(dto, "CompanyContactNo", process.env.REACT_APP_CompanyContactNo);
        // objectPath.set(dto, "DocType", "Fresh");
        // objectPath.set(dto, "ProductCode", "NepalMotorTwoWheeler");
        // objectPath.set(dto, "Product", "MotorCycle");
        // objectPath.set(dto, "activeStep", 5);
        // objectPath.set(dto, "Url", "/retail");
        // objectPath.set(dto, "prodlabel", "MotorCycle Insurance");
        setGenericPolicyDto(dispatch, dto);
      }
    }
    if (
      objectPath.get(dto, "ProductLogo") === undefined ||
      objectPath.get(dto, "ProductLogo") === ""
    ) {
      swal
        .fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        })
        .then(() => {
          Navigate("/retail/home");
        });
    }
    // const DC = objectPath.get(dto, "DocType");
    // if (DC === undefined || DC === "") {
    //   objectPath.set(dto, "DocType", "Fresh");
    //   setGenericPolicyDto(dispatch, dto);
    // }
    if (dto?.Bankdetails?.BankCategory !== "" && dto?.Bankdetails?.BankCategory !== undefined) {
      if (masters.BankorFinancialInstituionNameinEnglish.length === 0) {
        const res = await GetProdPartnermasterData("BankDetails", {
          BankFinancialInstitution: dto.Bankdetails.BankCategorylabel,
        });
        masters.BankorFinancialInstituionNameinEnglish = res.data;
      }
    }
    if (
      dto?.Bankdetails?.BankorFinancialInstituionNameinEnglish !== "" &&
      dto?.Bankdetails?.BankorFinancialInstituionNameinEnglish !== undefined
    ) {
      if (masters.BranchMasters.length === 0) {
        const res = await GetProdPartnermasterData("BranchMasters", {
          BankFinancialInstitution: dto.Bankdetails.BankCategorylabel,
          Bankname: dto.Bankdetails.BankorFinancialInstituionNameinEnglish,
        });
        masters.BranchMasters = res.data;
      }
    }
    // if (
    //   genericInfo &&
    //   genericInfo.Endorsement === true &&
    //   genericInfo.endorsementCategory === "Name Transfer"
    // ) {
    //   dto.ProposerDetails = insuredDto;
    //   // delete dto.proposalNo;
    //   // delete dto.KYCNo;
    // }
    if (
      genericInfo &&
      genericInfo.Endorsement === true &&
      genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details "
    ) {
      cckw = genericInfo.PolicyJson.InsurableItem[0].RiskItems[0].CCKW;
      ageofVehicle = genericInfo.PolicyJson.InsurableItem[0].RiskItems[0].AgeofVehicle;
      yearofVehicleManufacture =
        genericInfo.PolicyJson.InsurableItem[0].RiskItems[0].YearofVehicleManufacture;
      ncdYear = genericInfo.PolicyJson.InsurableItem[0].RiskItems[0].NCDYear;
    }
    if (genericInfo && genericInfo.Endorsement === true) {
      objectPath.set(dto, "EndoNumberType", "EndorsementNo");
      objectPath.set(dto, "EndoAttributeName", "EndorsementNo");
      // if (genericInfo.endorsementType !== "Policy Cancellation") {
      // objectPath.set(dto, "EndorsementEffectiveDate", genericInfo.EndorsementEffectiveDate);
      // } else {
      if (genericInfo.endorsementType === "Policy Cancellation") {
        objectPath.set(dto, "CancellationEffectiveDate", genericInfo.EndorsementEffectiveDate);
      } // }
      objectPath.set(dto, "RevisedCalculatedPremium", dto?.PremiumDetails?.NetPremium);
    }
    // a. PolicyNoOfDays - PolicyEndDate-PolicyStartDate - Convert into days and store in this variable
    // b. EndorsementNoOfDays - PolicyEndDate - EndorsementEffectiveDate - Convert into days and store in this variable
    if (genericInfo && genericInfo.Endorsement === undefined) {
      masters.PremiumType1 = masters.PremiumType;
    }
    if (
      genericInfo &&
      genericInfo.Endorsement === true &&
      genericInfo.endorsementType === "Non-Financial Endorsement"
    ) {
      objectPath.set(dto, "NonFinPremium", "0.00");
    }

    if (
      genericInfo &&
      genericInfo.Endorsement === true &&
      genericInfo.endorsementType === "Financial Endorsement"
    ) {
      masters.PremiumType1 = masters.EndoPremiumType;
      // dto.EndorsementNoOfDays;
      // const EndPolicyStartDate = new Date(genericInfo.PolicyJson.PolicyStartDate);
      // const EndPolicyEndDate = new Date(genericInfo.PolicyJson.PolicyEndDate);
      // const EndorsementEffectiveDate = new Date(genericInfo.EndorsementEffectiveDate);
      // const DifferenceInTime = EndPolicyEndDate.getTime() - EndPolicyStartDate.getTime();
      // dto.PolicyNoOfDays = DifferenceInTime / (1000 * 3600 * 24);
      // const DaysDiff = EndPolicyEndDate.getTime() - EndorsementEffectiveDate.getTime();
      // dto.EndorsementNoOfDays = DaysDiff / (1000 * 3600 * 24);
    }
    if (
      genericInfo &&
      genericInfo.Endorsement === true &&
      genericInfo.endorsementType === "Policy Cancellation"
    ) {
      masters.PremiumType1 = masters.EndoPremiumType.filter((x) => x.mValue !== "Normal");
    }
    setGenericPolicyDto(dispatch, dto);
  }, [resetCount]);

  const onDOBselect = (e, d, n) => {
    const age = AgeCalculator(new Date(d));
    if (n === "InsuredDOB") {
      if (age < 16) {
        dto.ProposerDetails.DOB = [""];
        swal.fire({
          icon: "error",
          text: `Age of the Policy Holder must be above 16 Years.`,
          confirmButtonColor: "#0079CE",
        });
      } else {
        dto.ProposerDetails.DOB = d;
      }
    }
    if (n === "MemberDOB") {
      if (age < 16) {
        objectPath.set(dto, "ProposerDetails.DOB", [""]);
        setGenericPolicyDto(dispatch, { ...dto });
        swal.fire({
          icon: "error",
          text: `Age of the Policy Holder must be above 16 Years.`,
        });
      } else {
        objectPath.set(dto, "ProposerDetails.DOB", d);
      }
    }
    setGenericPolicyDto(dispatch, { ...dto });
  };

  useEffect(async () => {
    if (genericPolicyDto) {
      if (
        objectPath.get(dto, "PolicyStartDate") === "" ||
        objectPath.get(dto, "PolicyStartDate") === undefined
      ) {
        objectPath.set(dto, "PolicyEndDate", "");
      }
      flag.Period = dto.PremiumType === "Short Period";
      // Filtering TypeofCover based on Class
      // masters.TypeofCoverFilter = masters.TypeofCover.filter((x) => x.description === dto.Class);
      // if (genericInfo && genericInfo.Endorsement === undefined) {
      //   if (objectPath.get(dto, "PremiumType") === "Normal") {
      //     flag.NumberOfDays = true;
      //     objectPath.set(
      //       dto,
      //       "NumberofDays",
      //       NumberofDaysinYear(objectPath.get(dto, "PolicyStartDate").split("/")[2])
      //     );
      //     objectPath.set(dto, "Period", "");
      //   }
      //   if (objectPath.get(dto, "PremiumType") === "Short Period") {
      //     flag.NumberOfDays = false;

      //     // if (objectPath.get(dto, "NumberofDays") === "365") {
      //     //   objectPath.set(dto, "NumberofDays", "");
      //     // }
      //     masters.Period.forEach((x) => {
      //       if (objectPath.get(dto, "Period") === x.mValue) {
      //         const nod = objectPath.get(dto, "NumberofDays");
      //         if (nod !== undefined)
      //           if (
      //             parseInt(nod, 10) > Number(x.description) &&
      //             parseInt(nod, 10) < Number(x.fieldName)
      //           )
      //             objectPath.set(dto, "NumberofDays", "");
      //       }
      //     });
      //   }
      // }

      if (
        objectPath.get(dto, "PolicyStartDate") !== "" &&
        objectPath.get(dto, "PolicyStartDate") !== undefined &&
        objectPath.get(dto, "NumberofDays") !== "" &&
        objectPath.get(dto, "NumberofDays") !== undefined
      ) {
        if (dto?.PremiumType === "Normal") {
          objectPath.set(
            dto,
            "NumberofDays",
            NumberofDaysinYear(dto?.PolicyStartDate, dto?.PolicyStartDate.split("/")[2])
          );
        }
        if (dto?.PremiumType === "Short Period") {
          if (dto?.Period === "Above 8 months" && dto?.NumberofDays === "366") {
            objectPath.set(
              dto,
              "NumberofDays",
              NumberofDaysinYear(dto?.PolicyStartDate, dto?.PolicyStartDate.split("/")[2])
            );
          }
        }
        objectPath.set(
          dto,
          "PolicyEndDate",
          addDays1(objectPath.get(dto, "PolicyStartDate"), objectPath.get(dto, "NumberofDays"))
        );
      }

      const YOM = objectPath.get(dto, "InsurableItem.0.RiskItems.0.YearofVehicleManufacture");
      let VA = "";
      if (YOM !== undefined && YOM !== "") {
        const CY = new Date().getFullYear();
        const SY = parseInt(YOM, 10);
        VA = CY - SY;
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.AgeofVehicle", VA.toString());
      }
      const VehicleYear = objectPath.get(
        dto,
        "InsurableItem.0.RiskItems.0.YearofVehicleManufacture"
      );

      if (VehicleYear !== undefined) {
        if (VehicleYear === "") {
          objectPath.set(dto, "InsurableItem.0.RiskItems.0.AgeofVehicle", "");
        }
      }
      if (
        genericInfo &&
        genericInfo.Endorsement === true &&
        genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details "
      ) {
        if (NumBetween(parseInt(ageofVehicle, 10), 0, 5, true) === true) {
          if (NumBetween(parseInt(VA, 10), 0, 5, true) === true) {
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.YearofVehicleManufacture", YOM);
          } else {
            swal.fire({
              icon: "error",
              text: "This will fall under Financial Endorsement",
              confirmButtonColor: "#0079CE",
            });
            objectPath.set(
              dto,
              "InsurableItem.0.RiskItems.0.YearofVehicleManufacture",
              yearofVehicleManufacture
            );
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.AgeofVehicle", ageofVehicle);
          }
        }
        if (NumBetween(parseInt(ageofVehicle, 10), 6, 10, true) === true) {
          if (NumBetween(parseInt(VA, 10), 6, 10, true) === true) {
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.YearofVehicleManufacture", YOM);
          } else {
            swal.fire({
              icon: "error",
              text: "This will fall under Financial Endorsement",
              confirmButtonColor: "#0079CE",
            });
            objectPath.set(
              dto,
              "InsurableItem.0.RiskItems.0.YearofVehicleManufacture",
              yearofVehicleManufacture
            );
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.AgeofVehicle", ageofVehicle);
          }
        }
        if (parseInt(ageofVehicle, 10) > 10) {
          if (parseInt(VA, 10) > 10) {
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.YearofVehicleManufacture", YOM);
          } else {
            swal.fire({
              icon: "error",
              text: "This will fall under Financial Endorsement",
              confirmButtonColor: "#0079CE",
            });
            objectPath.set(
              dto,
              "InsurableItem.0.RiskItems.0.YearofVehicleManufacture",
              yearofVehicleManufacture
            );
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.AgeofVehicle", ageofVehicle);
          }
        }
        // NumBetween(parseInt(ncdYear, 10), 0, 2, true) === true
        if (parseInt(ncdYear, 10) <= 2) {
          if (parseInt(dto.InsurableItem[0].RiskItems[0].NCDYear, 10) > 2) {
            swal.fire({
              icon: "error",
              text: "This will fall under Financial Endorsement",
              confirmButtonColor: "#0079CE",
            });
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.NCDYear", ncdYear);
          }
        }
        // NumBetween(parseInt(ncdYear, 10), 3, 10, true) === true
        if (parseInt(ncdYear, 10) > 2) {
          if (parseInt(dto.InsurableItem[0].RiskItems[0].NCDYear, 10) <= 2) {
            swal.fire({
              icon: "error",
              text: "This will fall under Financial Endorsement",
              confirmButtonColor: "#0079CE",
            });
            objectPath.set(dto, "InsurableItem.0.RiskItems.0.NCDYear", ncdYear);
          }
        }
      }

      // const PremiumTypeselect = objectPath.get(dto, "PremiumType");
      // if (PremiumTypeselect !== undefined) {
      //   if (PremiumTypeselect === "") {
      //     objectPath.set(dto, "NumberofDays", "");
      //   }
      // }

      if (objectPath.get(dto, "FormatedData.CalculatedPremiumDetails") !== undefined) {
        CPremium.GrossPremium = objectPath.get(
          dto,
          "FormatedData.CalculatedPremiumDetails.NetPremium"
        );
        CPremium.StampDuty = objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.StampDuty");
        CPremium.VAT = objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.VAT");
        CPremium.TotalPremium = objectPath.get(
          dto,
          "FormatedData.CalculatedPremiumDetails.FinalPremium"
        );
      }
      const InsuredType = objectPath.get(dto, "ProposerDetails.InsuredType");
      // if (InsuredType === "Government body" || InsuredType === "Individual") flag.Pan = false;
      // else flag.Pan = true;
      if (InsuredType === "Individual") {
        flag.Individual = true;
      } else {
        flag.Individual = false;
      }
      if (objectPath.get(dto, "DocType") === "Fresh") flag.DocType = true;
      else flag.DocType = false;
      // if (objectPath.get(dto, "InsurableItem.1.RiskItems.0.DirectFromShowRoom") === "Yes")
      //   flag.DirectFromShowRoom = false;
      // else flag.DirectFromShowRoom = true;
      // if (objectPath.get(dto, "InsurableItem.1.RiskItems.0.VehicleNoEnglish") !== "") {
      //   objectPath.set(dto, "InsurableItem.1.RiskItems.0.DirectFromShowRoom", "No");
      // }

      if (objectPath.get(dto, "ExistingDetails") === "Yes") {
        flag.ExistingDetails = true;
        // flag.ExistingDetails1 = false;
      }
      if (objectPath.get(dto, "ExistingDetails") === "No") {
        flag.ExistingDetails = false;
        flag.ExistingDetails1 = true;
      }
      const InsuredNameEnglish = objectPath.get(dto, "ProposerDetails.InsuredNameEnglish");
      if (InsuredNameEnglish !== "") {
        objectPath.set(dto, "ProposerDetails.NameoftheOrganisation", InsuredNameEnglish);
      }
      const AddressEnglish = objectPath.get(dto, "ProposerDetails.PermanentAdrress.AddressEnglish");
      if (InsuredNameEnglish !== "") {
        objectPath.set(dto, "ProposerDetails.OrganizationAddress", AddressEnglish);
      }

      // if (
      //   objectPath.get(dto, "FormatedData") !== null &&
      //   objectPath.get(dto, "FormatedData") !== undefined
      // ) {
      //   const RSDMDPremiumPDF = objectPath.get(
      //     topDto,
      //     "FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF"
      //   );
      //   const RiderPillionPremium = objectPath.get(
      //     topDto,
      //     "FormatedData.CalculatedPremiumDetails.RiderPillionPremium"
      //   );
      //   if (
      //     RSDMDPremiumPDF !== "" &&
      //     RSDMDPremiumPDF !== undefined &&
      //     RiderPillionPremium !== "" &&
      //     RiderPillionPremium !== undefined
      //   ) {
      // objectPath.set(
      //   topDto,
      //   "FormatedData.CalculatedPremiumDetails.RSDMDRiderPillion",
      //   formater.format(
      //     parseFloat(
      //       Number(dto.PremiumDetails.RSDMDPremiumPDF) +
      //         Number(dto.PremiumDetails.RiderPillionPremium)
      //     )
      //       .toFixed(2)
      //       .toString()
      //   )
      // );
      // }

      // if (
      //   objectPath.get(dto, "InsurableItem.0.RiskItems.0.CompulsoryExcess") !== "" &&
      //   objectPath.get(dto, "InsurableItem.0.RiskItems.0.CompulsoryExcess") !== undefined
      // ) {
      //   objectPath.set(
      //     dto,
      //     "FormatedData.CalculatedPremiumDetails.CompulsoryExcess",
      //     formater.format(dto.InsurableItem[0].RiskItems[0].CompulsoryExcess)
      //   );
      // }
      // }

      // const length = objectPath.get(
      //   dto,
      //   `InsurableItem.0.RiskItems.0.Bankdetails.BranchDetails`
      // );
      // if (
      //   objectPath.get(dto, "InsurableItem.0.RiskItems.0.FinancingType") !== "" ||
      //   objectPath.get(dto, "InsurableItem.0.RiskItems.0.FinancingType") !== undefined
      // ) {
      //   objectPath.set(
      //     dto,
      //     "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.InsuredType",
      //     "Individual"
      //   );
      // }
      if (objectPath.get(dto, "FinancingType") === "Direct") {
        // objectPath.set(dto, "CountOfBranchDetails", "1");
        // objectPath.del(dto, `Bankdetails.BranchDetails`, dto.Bankdetails.BranchDetails.length > 1);
        objectPath.set(dto, `Bankdetails.BranchDetails`, [BranchJson]);
      }
      if (objectPath.get(dto, "InsurableItem.0.RiskItems.0.DirectFromShowRoom") === "Yes") {
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.VehicleNoNepali", "");
      }
      if (genericInfo && genericInfo.Endorsement === true) {
        let ClassCode = "";
        const Class = objectPath.get(dto, "Class");
        if (Class === "Motor Cycle") {
          ClassCode = "MC";
        } else if (Class === "Third Party Motorcycle") {
          ClassCode = "TPMC";
        }
        const FiscalYear = objectPath.get(dto, "Channel.FiscalYear");
        objectPath.set(
          dto,
          "EndoPolicyPrefix",
          dto.ProvinceCode.concat(
            "/",
            dto.ShortCode,
            "/",
            "MV",
            "/",
            ClassCode,
            "/",
            "E",
            "/",
            FiscalYear,
            "/"
          )
        );

        objectPath.set(dto, "EndoPrefix", dto.ProvinceCode.concat("/", dto.ShortCode, "/"));
        // objectPath.set(dto, "EndoAttributeName", "EndoProposalNo");
        // objectPath.set(dto, "EndoNumberType", "EndoProposalNo");
        // const EndPolicyStartDate = new Date(dto.PolicyStartDate);
        const EndPolicyEndDate = new Date(dto.PolicyEndDate);
        const EndorsementEffectiveDate = new Date(
          // genericInfo.endorsementType !== "Policy Cancellation"?
          genericInfo.EndorsementEffectiveDate
          // : genericInfo.CancellationEffectiveDate
        );
        // const DifferenceInTime = EndPolicyEndDate.getTime() - EndPolicyStartDate.getTime();
        // dto.PolicyNoOfDays = DifferenceInTime / (1000 * 3600 * 24);
        dto.PolicyNoOfDays = dto.NumberofDays;
        const timeDiff = Math.abs(EndorsementEffectiveDate - EndPolicyEndDate);

        // Convert the time difference to days
        dto.EndorsementNoOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        // const DaysDiff = EndPolicyEndDate.getTime() - EndorsementEffectiveDate.getTime();
        if (genericInfo.endorsementType !== "Policy Cancellation") {
          if (dto?.PolicyPremium === undefined) {
            objectPath.set(dto, "PolicyPremium", dto.PremiumDetails);
          }

          // dto.EndorsementNoOfDays = DaysDiff / (1000 * 3600 * 24) + 1;
          if (Number(dto?.EndorsementNoOfDays) > Number(dto?.PolicyNoOfDays)) {
            dto.EndorsementNoOfDays = Number(dto?.NumberofDays);
            // dto.CancellationNoOfDays = Number(dto?.NumberofDays);
          }
        }
        if (genericInfo.endorsementType === "Policy Cancellation") {
          dto.EndorsementNoOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          dto.CancellationNoOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

          if (Number(dto?.EndorsementNoOfDays) > Number(dto?.PolicyNoOfDays)) {
            dto.EndorsementNoOfDays = Number(dto?.NumberofDays);
            dto.CancellationNoOfDays = Number(dto?.NumberofDays);
          }
        }
        objectPath.set(dto, "EndoSuffix", "");
      }

      topDto = dto;
      topDispatch = dispatch;

      setFlag({ ...flag });

      setCPremium({ ...CPremium });
      setGenericPolicyDto(dispatch, dto);
    }
  }, [genericPolicyDto]);

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
      if (masters.IssuingBranch.length === 0) {
        await GetProdPartnermasterData("BranchName", {
          Description: Company,
        }).then((res) => {
          console.log(" res.data", res.data);
          masters.IssuingBranch = res.data;

          dto.ICShortName = res.data[0].Description;
        });
        setGenericPolicyDto(dispatch, dto);
      }
    }
  }, [localStorage.getItem("NepalCompanySelect")]);

  useEffect(() => {
    if (loginUserDetails && loginUserDetails.displayName) {
      objectPath.set(dto, "AgentName", loginUserDetails.displayName);
      objectPath.set(dto, "AgentMobileNo", loginUserDetails.contactNumber);

      setGenericPolicyDto(dispatch, dto);
    }
  }, [loginUserDetails]);
  const OnPremiumSelect = (e, a) => {
    if (genericInfo && genericInfo.Endorsement === undefined) {
      if (a !== null) {
        dto.PremiumType = a.mValue;
        dto.Period = "";
        if (a.mValue === "Normal") {
          if (dto?.PolicyStartDate !== "") {
            dto.NumberofDays = NumberofDaysinYear(
              dto?.PolicyStartDate,
              dto?.PolicyStartDate.split("/")[2]
            );
          } else {
            dto.NumberofDays = NumberofDaysinYear(
              DateFormatFromDateObject(new Date(), "m/d/y"),
              DateFormatFromDateObject(new Date(), "m/d/y").split("/")[2]
            );
          }
          objectPath.set(
            dto,
            "PolicyEndDate",
            addDays1(
              objectPath.get(dto, "PolicyStartDate"),
              NumberofDaysinYear(dto?.PolicyStartDate, dto?.PolicyStartDate.split("/")[2])
            )
          );
          setGenericPolicyDto(dispatch, dto);
        }
        if (a.mValue === "Short Period") {
          dto.NumberofDays = "";
          dto.Period = "";
          dto.PolicyEndDate = "";
          setGenericPolicyDto(dispatch, dto);
        }
      } else {
        dto.NumberofDays = "";
        dto.PremiumType = "";
        dto.Period = "";
        setGenericPolicyDto(dispatch, dto);
      }
    }
    if (genericInfo && genericInfo.endorsementType !== "Non-Financial Endorsement") {
      if (a !== null) {
        dto.PremiumType = a.mValue;
        objectPath.set(dto, "EndoPremiumTypeLabel", a.fieldName);
      } else {
        dto.PremiumType = "";
      }
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const handleDirectDiscount = (e, a) => {
    if (a !== null) {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.DirectDiscount", a.mValue);
      objectPath.set(dto, "Channel.AgentName", "");
      objectPath.set(dto, "Channel.AgentCode", "");
    } else {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.DirectDiscount", "");
      objectPath.set(dto, "Channel.AgentName", "");
      objectPath.set(dto, "Channel.AgentCode", "");
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const handleEndoPolicyMaxDate = () => {
    let MaxDate = "";
    const date = genericInfo.PolicyJson.PolicyStartDate.split("/");
    MaxDate = `${date[0]}/${date[1]}/${date[2]}`;
    return MaxDate;
  };

  let data = [];

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            required: true,
            label: "Doc Type(PolicyType)",
            visible: true,
            // disableOnReset: true,
            value: "DocType",
            options: masters.DocType,
          },
          {
            type: "Input",
            // required: true,
            label: "Department",
            visible: true,
            value: "Department",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Class",
            visible: true,
            value: "Class",
            options: m.Class,
            customOnChange: (e, a) => OnClassSelect(e, a),
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Premium Type",
            visible: true,
            value:
              genericInfo &&
              genericInfo.Endorsement === true &&
              genericInfo.endorsementType !== "Non-Financial Endorsement"
                ? "EndoPremiumTypeLabel"
                : "PremiumType",
            optionLabel: genericInfo && genericInfo.Endorsement === true ? "fieldName" : "mValue",
            options:
              dto.Class === "Third Party Motorcycle"
                ? masters.PremiumType1.filter((x) => x.mValue !== "Short Period")
                : masters.PremiumType1,
            customOnChange: (e, a) => OnPremiumSelect(e, a),
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Period",
            visible: dto.PremiumType === "Short Period",
            value: "Period",
            options: masters.Period,
            customOnChange: (e, a) => Period(e, a),
          },
          {
            type: "Input",
            label:
              genericInfo && genericInfo.Endorsement === undefined
                ? "Number of Days"
                : "Policy No of Days",
            required: true,
            visible: dto.PremiumType === "" || dto.PremiumType === "Normal",
            value: "NumberofDays",
            onChangeFuncs: [IsNumeric1],
            // onChangeFuncs: [onNumberOfDaysnew],
            onBlurFuncs: [onNumberOfDays],
            disabled: dto.PremiumType === "Normal" || dto.PremiumType === "",
          },
          {
            type: "Input",
            label:
              genericInfo && genericInfo.Endorsement === undefined
                ? "Number of Days"
                : "Policy No of Days",
            required: true,
            visible: dto.PremiumType === "Short Period",
            value: "NumberofDays",
            onChangeFuncs: [IsNumeric1],
            // onChangeFuncs: [onNumberOfDaysnew],
            onBlurFuncs: [onNumberOfDays],
            disabled: dto.Period === "" || dto.PremiumType === "",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            value: "PolicyStartDate",
            // disableOnReset: true,
            dateFormat: "m/d/Y",
            minDate:
              genericInfo &&
              genericInfo.Endorsement === true &&
              new Date(dto.EndorsementEffectiveDate).getTime() <
                new Date(genericInfo.PolicyJson.PolicyStartDate).getTime()
                ? new Date(dto.EndorsementEffectiveDate)
                : PolicyStartDateMinDate(),
            maxDate:
              genericInfo && genericInfo.Endorsement === true
                ? handleEndoPolicyMaxDate()
                : PolicyStartDateMaxDate(),
            disabled: EndhandlePolicyStartDate(),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            visible: true,
            dateFormat: "m/d/Y",
            value: "PolicyEndDate",
            InputProps: { disabled: true },
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Business Type",
            visible: true,
            value: "BusinessType",
            disableOnReset: true,
            options: masters.BusinessType,
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Government",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.GovernmentVehicle",
            options: masters.Government,
            customOnChange: (e, a) => OnGovtSelect(e, a),
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Category",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Category",
            // disableOnReset: true,
            options: masters.Category,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Type of Covers",
            visible: true,
            // value: "InsurableItem.1.RiskItems.0.TypeofCover",
            value: "InsurableItem.0.RiskItems.0.TypeofCoverLabel",
            options: masters.TypeofCover.filter((x) => x.description === dto.Class),
            customOnChange: (e, a) => onTypeofCover(e, a),
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Year of Vehicle Manufacture",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.YearofVehicleManufacture",
            options: masters.YearofManufacture,
            disabled:
              genericInfo.Endorsement === true &&
              genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "Input",
            label: "Age of Vehicle",
            required: true,
            value: "InsurableItem.0.RiskItems.0.AgeofVehicle",
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            required: true,
            label:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.Category") === "Electric"
                ? "KW"
                : "CC",
            value: "InsurableItem.0.RiskItems.0.CCKW",
            visible: true,
            onChangeFuncs: [IsNumeric1],
            disabled:
              genericInfo.Endorsement === true &&
              genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "Input",
            required: true,
            label: "Seats",
            value: "InsurableItem.0.RiskItems.0.Seats",
            visible: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          {
            type: "Input",
            label:
              genericInfo &&
              genericInfo.Endorsement === true &&
              genericInfo.endorsementType === "Financial Endorsement"
                ? "Revised Vehicle Cost"
                : "Vehicle Cost",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.VehicleCost",
            onChangeFuncs: [IsNumeric],
            disabled: objectPath.get(dto, "Class") === "Third Party Motorcycle",
            customOnBlur: (e) => handleVehicleCost(e),
          },
          {
            type: "Input",
            label:
              genericInfo &&
              genericInfo.Endorsement === true &&
              genericInfo.endorsementType === "Financial Endorsement"
                ? "Revised Sum Insured"
                : "Total Sum Insured",
            value: "InsurableItem.0.RiskItems.0.TotalSumInsured",
            visible: true,
            required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Voluntary Excess",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.VolunatryExcess",
            options: masters.Excess,
            customOnChange: (e, a) => handleVolunatryExcess(e, a),
            disabled: objectPath.get(dto, "Class") === "Third Party Motorcycle",
          },
          // {
          //   type: "Input",
          //   label: "Utility Cost",
          //   value: "InsurableItem.1.RiskItems.0.UtilityCost",
          //   visible: true,
          //   onChangeFuncs: [IsNumeric],
          // },
          {
            type: "Input",
            required: true,
            label: "Compulsory Excess",
            value: "InsurableItem.0.RiskItems.0.CompulsoryExcess",
            visible: true,
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Direct Discount",
            value: "InsurableItem.0.RiskItems.0.DirectDiscount",
            visible: true,
            options: masters.DirectDiscount,
            disabled:
              objectPath.get(dto, "Class") === "Third Party Motorcycle" ||
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.GovernmentVehicle") === "Yes",
            customOnChange: (e, a) => handleDirectDiscount(e, a),
          },

          {
            type: "AutoComplete",
            label: "NCD Year",
            value: "InsurableItem.0.RiskItems.0.NCDYear",
            visible:
              objectPath.get(dto, "DocType") === "RollOver" &&
              dto.Class !== "Third Party Motorcycle",
            options: masters.NCDYear,
            required: true,
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
            required: true,
            value: "PolicyStartDate",
            disableOnReset: true,
            InputProps: { disabled: true },
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            required: true,
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
          },
          {
            type: "AutoComplete",
            label: "Bank Category",
            required: true,
            visible: true,
            options: masters.BankCategory.filter(
              (x) =>
                (dto?.Bankdetails?.BankorNonBank === "Bank" && x?.description !== "Non-Bank") ||
                (dto?.Bankdetails?.BankorNonBank === "Non-Bank" && x?.description === "Non-Bank")
            ),
            value: "Bankdetails.BankCategory",
            // options: masters.BankCategory,
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
            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
          },
          {
            type: "Input",
            label: "Bank/Financial Inst Name(Nepali)",
            visible: true,
            value: "Bankdetails.BankorFinancialInstituionNameinNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Bank Code",
            visible: true,
            value: "Bankdetails.BankCode",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Short Code",
            visible: true,
            value: "Bankdetails.ShortCode",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Swift/Pseudo Code",
            visible: true,
            value: "Bankdetails.SwiftPseudoCode",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person1",
            visible: true,
            value: "Bankdetails.ContactPerson1",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person2",
            visible: true,
            value: "Bankdetails.ContactPerson2",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person3",
            visible: true,
            value: "Bankdetails.ContactPerson3",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            value: "Bankdetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
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
            onBlurFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Website",
            visible: true,
            value: "Bankdetails.Website",
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
            onBlurFuncs: [IsAlphaNumNoSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "Bank Agent Code",
            visible: true,
            value: "Bankdetails.BankAgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "CEO",
            visible: true,
            value: "Bankdetails.CEO",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Country",
            required: true,
            visible: true,
            value: "Bankdetails.Country",
            options: masters.Country,
            disableOnReset: true,
            disabled: true,
            // customOnChange: (e, a) => onPlaceSelect(e, a, "Country1"),
          },
          {
            type: "Input",
            label: "Province/State",
            required: true,
            visible: true,
            value: "Bankdetails.ProvinceorState",
            // options: masters.State,
            // customOnChange: (e, a) => onPlaceSelect(e, a, "State1"),
            disabled: true,
          },
          {
            type: "Input",
            label: "District",
            required: true,
            visible: true,
            value: "Bankdetails.District",
            // options: masters.District1,
            // customOnChange: (e, a) => onPlaceSelect(e, a, "District1"),
            disabled: true,
          },
          {
            type: "Input",
            label: "Municipality",
            visible: true,
            value: "Bankdetails.Municipality",
            // options: masters.Municipality1,
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
            disabled: true,
            // customOnBlur: onBlurTransliteration,
            // onChangeFuncs: [IsFreetextNoSpace],
            // onBlurFuncs: [IsFreetextNoSpace],
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            value: "Bankdetails.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
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
            label: "ADD BRANCH DETAILS",
            // visible: flag.ExistingDetails1,
            visible: true,
            // startIcon: <AddIcon />,
            variant: "outlined",
            onClick: onAddBranchDetails,
            spacing: 12,
            value: "BranchDetailsButton",
          },

          ...spreadBranchDetails()[0],

          // ...obj2,
        ],
        ...spreadBranchDetails().filter((x, i) => i !== 0),

        [
          {
            type: "Input",
            label: "Name of the Proposer",
            visible: true,
            value: "ProposerDetails.Name",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Designation",
            visible: true,
            value: "ProposerDetails.Designation",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            value: "ProposerDetails.ProposerOccupation",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            value: "ProposerDetails.Address",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            // onChangeFuncs: [IsAlphaSpace],
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
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Insured Name-English",
            visible: true,
            // visible: flag.ExistingDetails1,
            required: true,
            value: "ProposerDetails.InsuredNameEnglish",
            name: "InsuredNameEnglish",
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
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            value: "ProposerDetails.IsBeneficiaryOwner",
            options: masters.IsBeneficiaryOwner,
            disableOnReset: true,
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
          //   value: "documentDetails.0.DocumentList",
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
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
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
            visible: flag.Pan,
            required: flag.Pan,
            // visible: flag.ExistingDetails1,4554
            value: "ProposerDetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: !flag.Pan,
            value: "ProposerDetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "VAT Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.VATNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "Registration Number",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.RegistrationNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            disabled: objectPath.get(dto, "ProposerDetails.RegistrationDate") === "",
          },
          {
            type: "Input",
            label: "Registration Office",
            visible: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.RegistrationOffice",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            // required: true,
            // visible: flag.ExistingDetails1,
            value: "ProposerDetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            onBlurFuncs: [IsNumaricSpecialNoSpace],
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
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
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
            value: "ProposerDetails.PermanentAdrress.Area",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/streetName",
            visible: true,
            // visible: flag.ExistingDetails1,
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
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
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
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
            value: "BranchDetailsButton",
            spacing: 12,
            // Endorsement:
            //   genericInfo.Endorsement === true &&
            //   genericInfo.endorsementType === "Non-Financial Endorsement",
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
                        disabled={
                          genericInfo &&
                          genericInfo?.endorsementType &&
                          genericInfo.endorsementType !== "Non-Financial Endorsement"
                        }
                        // error={
                        //   flag.DocDublication &&
                        //   docCountList[index].DocumentName === item.DocumentName
                        // }
                      />
                      {/* {flag.DocDublication === true &&
                          docCountList[index].DocumentName === item.DocumentName && (
                            <Typography sx={{ fontSize: "12px", color: "red" }}>
                              {item.DocumentName} Already Exist
                            </Typography>
                          )} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDButton
                        variant="outlined"
                        component="label"
                        disabled={
                          genericInfo &&
                          genericInfo?.endorsementType &&
                          genericInfo.endorsementType !== "Non-Financial Endorsement"
                        }
                      >
                        Upload{" "}
                        <input
                          hidden
                          accept="image/bmp, image/jpeg, image/png, .pdf"
                          type="file"
                          onChange={(e) => handleFileUpload(e, index)}
                          disabled={
                            genericInfo &&
                            genericInfo?.endorsementType &&
                            genericInfo.endorsementType !== "Non-Financial Endorsement"
                          }
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
            value: "ProposerDetails.ProfilePicture",
            typeFormat: (
              <input
                hidden
                type="file"
                id="fileInput"
                accept="image/jpeg, image/png"
                onChange={onUploadPic}
              />
            ),
            // spacing: 4,
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
            // options: masters.Gender,
            options: GenderNepali,
            // customOnBlur: onBlurTransliteration,
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
            // options: masters.MaritalStatus,
            options: MaritalStatus,
            customOnChange: (e, a) => handleMarital(e, a, "MaritalStatusEnglish"),
            // customOnBlur: onBlurTransliteration,
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Grandfather Name(Nepali)",
            visible: true,
            value: "ProposerDetails.GrandfatherNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Nationality(English)",
            visible: true,

            value: "ProposerDetails.NationalityEnglish",
            // customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Permanent Address(English)",
            visible: true,
            name: "AddressEnglish4",
            value: "ProposerDetails.PermanentAddressEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
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
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            onBlurFuncs: [IsAlphaNumNoSpace],
            disableOnReset: true,
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
            value: "ProposerDetails.IssueDistrict",
            options: masters.District,
            disableOnReset: true,
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            required: true,
            visible: true,
            name: "mPStartDate",
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            value: "ProposerDetails.DOB",
            customOnChange: (e, d) => onDOBselect(e, d, "InsuredDOB"),
            maxDate: new Date(),
          },
          {
            type: "Input",
            label: "License Number",
            visible: true,
            value: "ProposerDetails.LicenseNumber",
            spacing: 3,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
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
            onBlurFuncs: [IsAlphaNumNoSpace],
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
          //   // disabled: objectPath.get(dto, "ProposerDetails.InsuredOccupation"),
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   onBlurFuncs: [IsAlphaNumNoSpace],

          // },
          // {
          //   type: "Input",
          //   label: "Income Source",
          //   visible: true,
          //   value: "ProposerDetails.IncomeSource",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   onBlurFuncs: [IsAlphaNumNoSpace],
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Designation (Nepali)",
            visible: true,
            value: "ProposerDetails.DesignationNepali",
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
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
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
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
            value: "ProposerDetails.CommunicationAddress.TempAddresNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Identification Type",
            visible: true,
            value: "ProposerDetails.IdentificationType",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Citizenship Number",
            visible: true,
            required: flag.Individual,
            value: "ProposerDetails.CitizenshipNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            value: "ProposerDetails.DOB",
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
            onBlurFuncs: [IsAlphaNumNoSpace],
            spacing: 2.8,
          },
          {
            type: "MDDatePicker",
            label: "Passport Issued Date",
            visible: true,
            value: "ProposerDetails.PassportIssuedDate",
            onChangeFuncs: [IsNumeric],
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
            // spacing: 3,
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
          //   // onChangeFuncs: [IsAlphaNumNoSpace],
          //   // onBlurFuncs: [IsAlphaNumNoSpace],
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
            value: "ProposerDetails.ProfilePicture",
            typeFormat: (
              <input
                hidden
                type="file"
                id="fileInput"
                accept="image/jpeg, image/png"
                onChange={onUploadPic}
              />
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
            onBlurFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            value: "ProposerDetails.CareofPANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            value: "ProposerDetails.CareofContactNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            onBlurFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            name: "CareofAddressEnglish",
            value: "ProposerDetails.CareofAddressEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
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
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
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
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Type",
            // required: true,
            visible: true,
            value: "PolicyRiskType",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Category",
            visible: true,
            required: true,
            value: "PolicyRiskCategory",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
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
            type: "Checkbox",
            visible: true,
            label: "Direct From Showroom",
            value: "InsurableItem.0.RiskItems.0.DirectFromShowRoom",
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 12,
            // disableOnReset:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
            customOnChange: (e) => ifcheckedvalueDirectFromShowRoom(e),
          },
          {
            type: "AutoComplete",
            label: "Name of the Vehicle",
            required: true,
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Nameofthevehicle",
            // disableOnReset:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
            options: masters.NameoftheVehicle,
            customOnChange: (e, a) => onVehicalSelect(e, a, "Nameofthevehicle"),
          },
          {
            type: "AutoComplete",
            label: "Make of the Vehicle",
            required: true,
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Make",
            options:
              dto.InsurableItem[0].RiskItems[0].Nameofthevehicle !== undefined &&
              dto.InsurableItem[0].RiskItems[0].Nameofthevehicle !== ""
                ? masters.Make
                : [],

            customOnChange: (e, a) => onVehicalSelect(e, a, "makeofthevehicle"),
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },

          {
            type: "AutoComplete",
            label: "Model of the Vehicle",
            required: true,
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Model",
            options:
              dto.InsurableItem[0].RiskItems[0].Make !== undefined &&
              dto.InsurableItem[0].RiskItems[0].Make !== ""
                ? masters.Model
                : [],
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "Input",
            label: "Mode of Use",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Modelofuse",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Government",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.GovernmentVehicle",
            options: masters.Government,
            customOnChange: (e, a) => OnGovtSelect(e, a),
            // disableOnReset:
            //   (genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //     genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ") ||
            //   true,
          },
          {
            type: "AutoComplete",
            label: "Category",
            required: true,
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Category",
            options: masters.Category,
            // disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Type of Cover",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.TypeofCoverLabel",
            options: masters.TypeofCover.filter((x) => x.description === dto.Class),
            customOnChange: (e, a) => onTypeofCover(e, a),
            // spacing: 4,
            // disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Year of Vehicle Manufacture",
            required: true,
            visible: true,
            value: "InsurableItem.0.RiskItems.0.YearofVehicleManufacture",
            options: masters.YearofManufacture,
            // spacing: 2,
            // disableOnReset: true,
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "Input",
            label: "Age of Vehicle",
            required: true,
            visible: true,
            value: "InsurableItem.0.RiskItems.0.AgeofVehicle",
            onChangeFuncs: [IsNumeric],
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            label:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.Category") === "Electric"
                ? "KW"
                : "CC",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.CCKW",
            onChangeFuncs: [IsNumeric],
            // disableOnReset: true,
            customOnBlur: (e) => EndhandleCCKW(e),
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "Input",
            label: "Seats",
            required: true,
            visible: true,
            disableOnReset: true,
            value: "InsurableItem.0.RiskItems.0.Seats",
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          {
            type: "Input",
            label:
              genericInfo &&
              genericInfo.Endorsement === true &&
              genericInfo.endorsementType === "Financial Endorsement"
                ? "Revised Vehicle Cost"
                : "Vehicle Cost",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.VehicleCost",
            onChangeFuncs: [IsNumeric],
            disableOnReset: objectPath.get(dto, "Class") === "Third Party Motorcycle",
            disabled: objectPath.get(dto, "Class") === "Third Party Motorcycle",
            customOnBlur: (e) => handleVehicleCost(e),
          },
          {
            type: "Input",
            label:
              genericInfo &&
              genericInfo.Endorsement === true &&
              genericInfo.endorsementType === "Financial Endorsement"
                ? "Revised Sum Insured"
                : "Total Sum Insured",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.TotalSumInsured",
            onChangeFuncs: [IsNumeric],
            // disableOnReset: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Voluntary Excess",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.VolunatryExcess",
            options: masters.Excess,
            disableOnReset: objectPath.get(dto, "Class") === "Third Party Motorcycle",
            customOnChange: (e, a) => handleVolunatryExcess(e, a),
            disabled: objectPath.get(dto, "Class") === "Third Party Motorcycle",
          },
          {
            type: "Input",
            label: "Compulsory Excess",
            required: true,
            visible: true,
            value: "InsurableItem.0.RiskItems.0.CompulsoryExcess",
            onChangeFuncs: [IsNumeric],
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Direct Discount",
            value: "InsurableItem.0.RiskItems.0.DirectDiscount",
            visible: true,
            options: masters.DirectDiscount,
            disabled:
              objectPath.get(dto, "Class") === "Third Party Motorcycle" ||
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.GovernmentVehicle") === "Yes",
            disableOnReset:
              objectPath.get(dto, "Class") === "Third Party Motorcycle" ||
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.GovernmentVehicle") === "Yes",
            customOnChange: (e, a) => handleDirectDiscount(e, a),
          },
          // {
          //   type: "Input",
          //   label: "Utility Cost",
          //   visible: true,
          //   onChangeFuncs: [IsNumeric],
          // },
          {
            type: "MDDatePicker",
            label: "Registration Date",
            visible: true,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            name: "mPStartDate",
            value: "InsurableItem.0.RiskItems.0.RegistrationDate",
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          // {
          //   type: "AutoComplete",
          //   label: "Vehicle No",
          //   visible: true,
          //   options: [],
          // },
          {
            type: "Input",
            label: "Vehicle Number (English)",
            visible:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.DirectFromShowRoom") === "Yes",
            // required: true,
            name: "VehicleNoEnglish",
            // value: "InsurableItem.1.RiskItems.0.VehicleNoEnglish",
            value: "InsurableItem.0.RiskItems.0.VehicleNoEnglish",
            customOnBlur: onBlurTransliteration,
            // disableOnReset:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
            // InputProps: {
            //   readOnly:
            //     objectPath.get(dto, "InsurableItem.0.RiskItems.0.DirectFromShowRoom") === "Yes",
            // },
            disabled:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.DirectFromShowRoom") === "Yes",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },

          {
            type: "Input",
            label: "Vehicle Number (English)",
            visible:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.DirectFromShowRoom") === "No" ||
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.DirectFromShowRoom") === "",
            required: true,
            name: "VehicleNoEnglish",
            value: "InsurableItem.0.RiskItems.0.VehicleNoEnglish",
            customOnBlur: onBlurTransliteration,
            // InputProps: {
            //   readOnly:
            //     objectPath.get(dto, "InsurableItem.0.RiskItems.0.DirectFromShowRoom") === "Yes",
            // },
            disabled:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.DirectFromShowRoom") === "Yes",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            // disableOnReset:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "Input",
            label: "Vehicle Number (Nepali)",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.VehicleNoNepali",
            disabled: true,
            // disableOnReset:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "Input",
            label: "Engine Number",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.EngineNo",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "Input",
            label: "Chasis Number",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.ChasisNo",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          {
            type: "AutoComplete",
            label: "NCD Year",
            required: true,
            value: "InsurableItem.0.RiskItems.0.NCDYear",
            visible:
              objectPath.get(dto, "DocType") === "RollOver" &&
              dto.Class !== "Third Party Motorcycle",
            options: masters.NCDYear,
            // disableOnReset: true,
            // disabled:
            //   genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
            //     ? NumBetween(
            //         parseInt(dto.InsurableItem[0].RiskItems[0].NCDYear, 10),
            //         0,
            //         2,
            //         true
            //       ) === true
            //     : false,
          },
          {
            type: "Input",
            label: "PA to Driver",
            visible: true,
            disableOnReset: true,
            value: "InsurableItem.0.RiskItems.0.PAtoDriver",
            disabled: true,
          },
          // {
          //   type: "Input",
          //   label: "Goods Carrying Cap/ Tonnes/HP ",
          //   visible: true,
          //   onChangeFuncs: [IsNumeric],
          // },
          // {
          //   type: "Typography",
          //   label: "PA to Employee",
          //   visible: true,
          //   spacing: 6,
          // },
          // {
          //   type: "Typography",
          //   label: "",
          //   visible: true,
          //   spacing: 12,
          // },
          // {
          //   type: "Typography",
          //   label: "Document Upload",
          //   visible: objectPath.get(dto, "DocType") === "RollOver",
          //   spacing: 12,
          // },
          // {
          //   type: "Typography",
          //   label: "",
          //   visible: true,
          //   spacing: 12,
          // },
          // // {
          // //   type: "Typography",
          // //   label: "Renewal Notice",
          // //   visible: objectPath.get(dto, "DocType") === "RollOver",
          // //   spacing: 2,
          // //   fontSize: 15,
          // // },

          // {
          //   type: "Input",
          //   label: "Renewal Notice",
          //   visible: objectPath.get(dto, "DocType") === "RollOver",
          //   value: `Temp.MiddleName`,
          //   disabled: true,
          //   spacing: 3,
          // },
          // // {
          // //   type: "Custom",
          // //   visible: objectPath.get(dto, "DocType") === "RollOver",
          // //   spacing: 2,

          // //   return: (
          // //     <MDButton variant="outlined" color="info" component="label">
          // //       Upload
          // //       <input
          // //         hidden
          // //         ref={ref2}
          // //         accept="image/bmp, image/jpeg, image/png, .pdf"
          // //         type="file"
          // //         onChange={(e) => handleFileUploadvehicle(e, "RenewalDoc")}
          // //       />
          // //     </MDButton>
          // //   ),
          // // },
          // {
          //   type: "Button",
          //   label: "Upload",
          //   visible: objectPath.get(dto, "DocType") === "RollOver",
          //   variant: "outlined",
          //   component: "label",
          //   value: "documentDetails.0.DocName",
          //   typeFormat: (
          //     <input
          //       hidden
          //       ref={ref2}
          //       accept="image/bmp, image/jpeg, image/png, .pdf"
          //       type="file"
          //       id="fileInput"
          //       onChange={(e) => handleFileUploadvehicle(e, "RenewalDoc")}
          //     />
          //   ),
          //   // spacing: 4,
          // },

          // {
          //   type: "Custom",
          //   visible: objectPath.get(dto, "DocType") === "RollOver",
          //   spacing: 1.5,
          //   return: (
          //     <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
          //       {objectPath.get(dto, "documentDetails.0.DocName")}
          //     </Typography>
          //   ),
          // },

          // {
          //   type: "Custom",
          //   visible:
          //     objectPath.get(dto, "documentDetails.0.DocName") !== "" &&
          //     objectPath.get(dto, "documentDetails.0.DocName") !== undefined,

          //   return: (
          //     <CancelOutlinedIcon
          //       color="error"
          //       onClick={(e) => handleFiledelete(e, "RenewalDoc")}
          //     />
          //   ),
          // },

          {
            type: "Typography",
            label: "PA to Passenger",
            visible: true,
            spacing: 12,
          },
          // {
          //   type: "AutoComplete",
          //   label: "Employee Count",
          //   visible: true,
          //   options: [],
          // },
          // {
          //   type: "Input",
          //   label: "Sum Insured ",
          //   visible: true,
          //   onChangeFuncs: [IsNumeric],
          // },
          {
            type: "Input",
            label: "Count ",
            visible: true,
            disableOnReset: true,
            value: "InsurableItem.0.RiskItems.0.PassengerCount",
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          {
            type: "Input",
            label: "Sum Insured",
            visible: true,
            disableOnReset: true,
            value: "InsurableItem.0.RiskItems.0.PAPassengerSI",
            onChangeFuncs: [IsNumeric],
            disabled: true,
          },
          // {
          //   type: "Input",
          //   label: "Trailer Sum Insured",
          //   visible: true,
          //   onChangeFuncs: [IsNumeric],
          // },
          {
            type: "Input",
            label: "Other Description ",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.OtherDescription",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Delivery Date",
            visible: true,
            name: "mPStartDate",
            value: "InsurableItem.0.RiskItems.0.DeliveryDate",
          },
          {
            type: "Input",
            label: "Additional Description/Warranties ",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.AdditionalWarranty",
            // Endorsement:
            //   genericInfo.endorsementType === "Non-Financial Endorsement" &&
            //   genericInfo.endorsementCategory === "Change in Customer, Vehicle, Risk Details ",
          },
          // {
          //   type: "Input",
          //   label: "Has Trailor",
          //   visible: true,
          //   value: "InsurableItem.1.RiskItems.0.HasTrailer",
          // },
          // {
          //   type: "Input",
          //   label: "Including Towing Chargers",
          //   visible: true,
          //   value: "InsurableItem.1.RiskItems.0.IncludeTowing",
          // },
          // {
          //   type: "Input",
          //   label: "Own Goods Carrying or Private Rent",
          //   visible: true,
          //   value: "InsurableItem.1.RiskItems.0.OwnGoodCarrying",
          // },
        ],
        [
          // {
          //   type: "Typography",
          //   label: "Document Upload",
          //   visible: objectPath.get(dto, "DocType") === "RollOver",
          //   spacing: 12,
          // },
          // {
          //   type: "Typography",
          //   label: "",
          //   visible: true,
          //   spacing: 12,
          // },
          // {
          //   type: "Typography",
          //   label: "Renewal Notice",
          //   visible: objectPath.get(dto, "DocType") === "RollOver",
          //   spacing: 2,
          //   fontSize: 15,
          // },

          {
            type: "Input",
            label: "Renewal Notice",
            visible: objectPath.get(dto, "DocType") === "RollOver",
            value: `Temp.MiddleName`,
            disabled: true,
            spacing: 3,
          },
          // {
          //   type: "Custom",
          //   visible: objectPath.get(dto, "DocType") === "RollOver",
          //   spacing: 2,

          //   return: (
          //     <MDButton variant="outlined" color="info" component="label">
          //       Upload
          //       <input
          //         hidden
          //         ref={ref2}
          //         accept="image/bmp, image/jpeg, image/png, .pdf"
          //         type="file"
          //         onChange={(e) => handleFileUploadvehicle(e, "RenewalDoc")}
          //       />
          //     </MDButton>
          //   ),
          // },
          {
            type: "Button",
            label: "Upload",
            visible: objectPath.get(dto, "DocType") === "RollOver",
            variant: "outlined",
            component: "label",
            value: "documentDetails.0.DocName",
            typeFormat: (
              <input
                hidden
                ref={ref2}
                accept="image/bmp, image/jpeg, image/png, .pdf"
                type="file"
                id="fileInput"
                onChange={(e) => handleFileUploadvehicle(e, "RenewalDoc")}
              />
            ),
            // spacing: 4,
          },

          {
            type: "Custom",
            visible: objectPath.get(dto, "DocType") === "RollOver",
            spacing: 1.5,
            return: (
              <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
                {objectPath.get(dto, "documentDetails.0.DocName")}
              </Typography>
            ),
          },

          {
            type: "Custom",
            visible:
              objectPath.get(dto, "documentDetails.0.DocName") !== "" &&
              objectPath.get(dto, "documentDetails.0.DocName") !== undefined,

            return: (
              <CancelOutlinedIcon
                color="error"
                onClick={(e) => handleFiledelete(e, "RenewalDoc")}
              />
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
            disabled: dto.proposalNo !== "" && dto.proposalNo !== undefined,
            customOnChange: (e, a) => handleIssuingBranch(e, a, "IssuingBranch"),
            disableOnReset: dto.proposalNo !== "" && dto.proposalNo !== undefined,
          },
          {
            type: "Input",
            label: "Sub-Branch",
            visible: true,
            value: "Channel.SubBranch",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            disableOnReset: genericInfo.Endorsement,
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
            optionLabel: "fieldName",
            options: masters.FieldOfficer,
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
            optionLabel: "fieldName",
            options: masters.Agent,
            disabled:
              dto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes" ||
              dto.Class === "Third Party Motorcycle",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentCode"),
          },
          {
            type: "AutoComplete",
            label: "Agent Name ",
            visible: true,
            value: "Channel.AgentName",
            options: masters.Agent,
            disabled:
              dto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes" ||
              dto.Class === "Third Party Motorcycle",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Code",
            visible: true,
            value: "Channel.SubAgentCode",
            options: masters.SubAgent,
            disabled:
              dto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes" ||
              dto.Class === "Third Party Motorcycle",
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgent"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Name",
            visible: true,
            value: "Channel.SubAgentName",
            disabled:
              dto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes" ||
              dto.Class === "Third Party Motorcycle",
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
            // disableOnReset: genericInfo.Endorsement,
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            value: "RiskAddressDetails.District",
            options: masters.District4,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District4"),
            // disableOnReset: genericInfo.Endorsement,
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            required: true,
            visible: true,
            value: "RiskAddressDetails.Municipality",
            options: masters.Municipality4,
            // disableOnReset: genericInfo.Endorsement,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            value: "RiskAddressDetails.WardNumber",
            options: masters.WardNumber,
            // disableOnReset: genericInfo.Endorsement,
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
            // disableOnReset: genericInfo.Endorsement,
          },
          {
            type: "Input",
            label: "Address(Nepali) ",
            visible: true,
            value: "RiskAddressDetails.AddressNepali",
            disabled: true,
            // disableOnReset: genericInfo.Endorsement,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            value: "RiskAddressDetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            // disableOnReset: genericInfo.Endorsement,
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            value: "RiskAddressDetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            // disableOnReset: genericInfo.Endorsement,
          },
          {
            type: "Input",
            label: "House Number ",
            visible: true,
            value: "RiskAddressDetails.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            // disableOnReset: genericInfo.Endorsement,
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            value: "RiskAddressDetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
            // disableOnReset: genericInfo.Endorsement,
          },
        ],
        [
          {
            type: "Input",
            label: "Additional Description",
            visible: genericInfo && genericInfo.Endorsement === true,
            value: "Endorsement.AdditionalDescription",
            Endorsement: genericInfo && genericInfo.Endorsement === true,
          },
          {
            type: "Input",
            label: "Warranty",
            visible: genericInfo && genericInfo.Endorsement === true,
            value: "Endorsement.Warranty",
            Endorsement: genericInfo && genericInfo.Endorsement === true,
          },
          {
            type: "Input",
            label: "Remarks",
            visible: genericInfo && genericInfo.Endorsement === true,
            value: "Endorsement.Remarks",
            Endorsement: genericInfo && genericInfo.Endorsement === true,
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
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.BasePremium",
            disabled: true,
          },
          {
            type: "Input",
            label: "Old Vehicle Loading",
            required: true,
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.AgeofVehicleLoading",
            disabled: true,
          },
          {
            type: "Input",
            label: "Voluntary Excess",
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            required: true,
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.ExcessDiscount",
            options: masters.Excess,
            disabled: true,
          },
          {
            type: "Input",
            label: "No Claim Discount",
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            required: true,
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase",
            disabled: true,
          },
          {
            type: "Input",
            label: "Eco Friendly Discount",
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            required: true,
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.EnvironmentDiscount",
            disabled: true,
          },
          {
            type: "Input",
            label: "Direct Discount",
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            required: true,
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
            disabled: true,
          },
          {
            type: "Input",
            label: "Minimum Premium",
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            required: true,
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.ApplicableAdditionalPremium",
            disabled: true,
          },
          {
            type: "Input",
            label: "Third Party Insurance",
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            required: true,
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.BaseTPRate",
            disabled: true,
          },
          {
            type: "Input",
            label: "No Claim Discount(TP)",
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            required: true,
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.NoClaimDiscountTP",
            disabled: true,
          },
          {
            type: "Input",
            label: "Riot And Strike Damage(RSD/MD)",
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            required: true,
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.RSDMDRiderPillion",
            disabled: true,
          },
          {
            type: "Input",
            label: "Terrorism",
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
            required: true,
            value:
              genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                ? "NonFinPremium"
                : "FormatedData.CalculatedPremiumDetails.STPremiumPDF",
            disabled: true,
          },
          // {
          //   type: "Input",
          //   label: "Basic Premium",
          //   required: true,
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.BasePremium",
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Old Vehicle Loading",
          //   required: true,
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.AgeofVehicleLoading",
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Voluntary Excess",
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   required: true,
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.ExcessDiscount",
          //   options: masters.Excess,
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "No Claim Discount",
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   required: true,
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NoClaimDiscountBase",
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Eco Friendly Discount",
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   required: true,
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.EnvironmentDiscount",
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Direct Discount",
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   required: true,
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.DirectDiscountAmount",
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Minimum Premium",
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   required: true,
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.ApplicableAdditionalPremium",
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Third Party Insurance",
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   required: true,
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.BaseTPRate",
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "No Claim Discount(TP)",
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   required: true,
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NoClaimDiscountTP",
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Riot And Strike Damage(RSD/MD)",
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   required: true,
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.RSDMDRiderPillion",
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Terrorism",
          //   visible:
          //     genericInfo &&
          //     genericInfo.Endorsement === true &&
          //     genericInfo.endorsementType !== "Non-Financial Endorsement",
          //   required: true,
          //   value:
          //     "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.STPremiumPDF",
          //   disabled: true,
          // },
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
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    {genericInfo && genericInfo.Endorsement === undefined
                      ? dto.proposalNo
                      : dto.EndorsementNo}
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
                    Do you wish to Preview and Save the Debit Note
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    {/* <MDButton
                      variant="outlined"
                      onClick={(e) => onDebitNoteClick(e, "SAVE DEBIT NOTE")}
                    >
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
          {
            type: "Custom",
            required: true,
            visible:
              genericInfo &&
              (genericInfo.Endorsement === undefined ||
                genericInfo.endorsementType === "Non-Financial Endorsement"),
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
                      {genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                        ? objectPath.get(dto, "NonFinPremium")
                        : CPremium.GrossPremium}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                        ? objectPath.get(dto, "NonFinPremium")
                        : CPremium.VAT}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                        ? objectPath.get(dto, "NonFinPremium")
                        : CPremium.StampDuty}
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
                        {genericInfo && genericInfo.endorsementType === "Non-Financial Endorsement"
                          ? objectPath.get(dto, "NonFinPremium")
                          : CPremium.TotalPremium}
                      </b>
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            visible:
              genericInfo &&
              genericInfo.Endorsement === true &&
              genericInfo.endorsementType !== "Non-Financial Endorsement",
            spacing: 3,
          },
          {
            type: "Typography",
            visible:
              genericInfo &&
              genericInfo.Endorsement === true &&
              genericInfo.endorsementType !== "Non-Financial Endorsement",
            spacing: 3,
          },
          {
            type: "Typography",
            visible:
              genericInfo &&
              genericInfo.Endorsement === true &&
              genericInfo.endorsementType !== "Non-Financial Endorsement",
            spacing: 3,
          },
          {
            type: "Custom",
            required: true,
            visible:
              genericInfo &&
              genericInfo.Endorsement === true &&
              genericInfo.endorsementType !== "Non-Financial Endorsement",
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
                      {/* Gross Premium */}
                      Policy Premium Excluding VAT
                    </Typography>
                    <Typography>
                      {
                        /* eslint-disable */
                        genericInfo &&
                        genericInfo.endorsementType === "Financial Endorsement" &&
                        (genericInfo.endorsementCategory === "Extra" ||
                          genericInfo.endorsementCategory === "Refund")
                          ? "Endorsement Premium Excluding VAT"
                          : "Cancellation Premium Excluding VAT"
                        /* eslint-enable */
                      }
                    </Typography>
                    <Typography>
                      {
                        /* eslint-disable */
                        genericInfo &&
                        genericInfo.endorsementType === "Financial Endorsement" &&
                        genericInfo.endorsementCategory === "Extra"
                          ? "Endorsement Additional Premium"
                          : genericInfo.endorsementType === "Financial Endorsement" &&
                            genericInfo.endorsementCategory === "Refund"
                          ? "Endorsement Refund Premium"
                          : "Cancellation Refund Premium"
                        /* eslint-enable */
                      }
                      {/* Cancellation Refund Premium */}
                    </Typography>
                    {/* {genericInfo && genericInfo.endorsementType === "Financial Endorsement" && ( */}
                    <Typography>
                      {" "}
                      {
                        /* eslint-disable */
                        genericInfo &&
                        genericInfo.endorsementType === "Financial Endorsement" &&
                        (genericInfo.endorsementCategory === "Extra" ||
                          genericInfo.endorsementCategory === "Refund")
                          ? "Endorsement VAT"
                          : "Cancellation VAT"
                        /* eslint-enable */
                      }
                    </Typography>
                    {/* )} */}
                    {genericInfo && genericInfo.endorsementType === "Financial Endorsement" && (
                      <Typography>Stamp Duty</Typography>
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    {/* {genericInfo && genericInfo.endorsementType === "Financial Endorsement" && ( */}
                    <Typography>रु</Typography>
                    {/* )} */}
                    {genericInfo && genericInfo.endorsementType === "Financial Endorsement" && (
                      <Typography>रु</Typography>
                    )}{" "}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.NetPremium")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        dto,
                        "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NetPremium"
                      )}
                    </Typography>
                    {/* {genericInfo && genericInfo.endorsementType === "Financial Endorsement" && ( */}
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        dto,
                        genericInfo && genericInfo.endorsementType === "Financial Endorsement"
                          ? "FormatedData.EndCalculatedPremiumDetails.EndorsementPremium"
                          : "FormatedData.EndCalculatedPremiumDetails.CancellationPremium"
                      )}
                    </Typography>
                    {/* )} */}
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        dto,
                        genericInfo && genericInfo.endorsementType === "Financial Endorsement"
                          ? "FormatedData.EndCalculatedPremiumDetails.EndorsementVAT"
                          : "FormatedData.EndCalculatedPremiumDetails.CancellationVAT"
                      )}
                      {/* FormatedData.EndCalculatedPremiumDetails.CancellationVAT */}
                    </Typography>
                    {genericInfo && genericInfo.endorsementType === "Financial Endorsement" && (
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(
                          dto,
                          "FormatedData.EndCalculatedPremiumDetails.EndorsementStampDuty"
                        )}
                        {/* FormatedData.EndCalculatedPremiumDetails.CancellationStampDuty */}
                      </Typography>
                    )}
                  </Grid>
                  {/* {genericInfo && genericInfo.endorsementType === "Financial Endorsement" && ( */}
                  <>
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
                        <b>
                          {/* Total Premium */}
                          {
                            /* eslint-disable */
                            genericInfo &&
                            genericInfo.endorsementType === "Financial Endorsement" &&
                            genericInfo.endorsementCategory === "Extra"
                              ? "Endorsement Final Premium"
                              : genericInfo.endorsementType === "Financial Endorsement" &&
                                genericInfo.endorsementCategory === "Refund"
                              ? "Endorsement Final Premium"
                              : "Cancellation Final Premium"
                            /* eslint-enable */
                          }
                          {/* Cancellation Final Premium */}
                        </b>
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
                            genericInfo && genericInfo.endorsementType === "Financial Endorsement"
                              ? "FormatedData.EndCalculatedPremiumDetails.EndorsementFinalPremium"
                              : "FormatedData.EndCalculatedPremiumDetails.CancellationFinalPremium"
                          )}
                          {/* FormatedData.EndCalculatedPremiumDetails.CancellationFinalPremium */}
                        </b>
                      </Typography>
                    </Grid>
                  </>
                  {/* )} */}
                </Grid>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            label: "",
            spacing: 3,
            visible: dto?.Channel?.AgentCode !== "0000",
          },
          {
            type: "Typography",
            label: "",
            spacing: 3,
            visible: dto?.Channel?.AgentCode !== "0000",
          },
          {
            type: "Custom",
            required: true,
            visible:
              dto?.Class !== "Third Party Motorcycle" &&
              dto?.Channel?.AgentCode !== "0000" &&
              dto?.Channel?.AgentCode !== "" &&
              genericInfo &&
              genericInfo.Endorsement === undefined,
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
            visible: true,
            spacing: 12,
            return: (
              <MDBox>
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
                        control={
                          <Checkbox onChange={onEmailClick} disabled={handleEndoDisable()} />
                        }
                        label="E-mail"
                      />
                      <FormControlLabel control={<Checkbox disabled />} label="SMS" />
                    </FormGroup>
                  </Stack>
                </MDBox>
                <MDBox
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    p: "5px",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <MDButton
                      variant="contained"
                      color="error"
                      disabled={handleEndoDisable()}
                      onClick={
                        genericInfo.Flow &&
                        (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                          ? onSaveModalClose
                          : handlesavedebitnote
                      }
                    >
                      {genericInfo.Flow &&
                      (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                        ? "Save Details"
                        : "Save Debit Note"}
                    </MDButton>

                    <ColorButton
                      variant="contained"
                      onClick={() => onDebitNoteClick()}
                      disabled={handleEndoDisable()}
                      // endIcon={<VisibilityIcon />}
                    >
                      Preview Debit Note
                    </ColorButton>
                    {/* <ColorButton variant="contained">Download Proposal</ColorButton> */}
                    <MDButton
                      variant="contained"
                      color="error"
                      onClick={handleSavepolicyWFStatus}
                      disabled={flag.Disabled || handleEndoDisable()}
                    >
                      Send For Approval
                    </MDButton>
                  </Stack>
                </MDBox>
              </MDBox>
            ),
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
                PaymentMode={[
                  { label: "Online", value: "Online" },
                  { label: "Offline", value: "Offline" },
                ]}
                PolicyDto={genericPolicyDto}
                genericInfo={genericInfo}
                OfflinePT={{
                  amount:
                    genericInfo && genericInfo.Endorsement === undefined
                      ? objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.FinalPremium")
                      : objectPath.get(
                          dto,
                          "PremiumDetails.EndorsementPremiumDetails.FinalPremium"
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

const getOnNextClick = async (activeStep, setBackDropFlag) => {
  let fun = false;
  // console.log("llll", topDto);
  const tDto = { ...topDto };
  if (topDto.DocType === "Fresh") {
    objectPath.set(topDto, "InsurableItem.0.RiskItems.0.NCDYear", "");
  }
  // const Details = {
  //   PolicyNo: topDto.PolicyNo,
  //   EndorsementDetails: topDto,
  //   PremiumDetails: topDto.PremiumDetails,
  //   EndorsementType: [topGenericInfo.endorsementType, topGenericInfo.endorsementCategory],
  //   PaymentDetails: topDto.paymentdetailsDTO,
  // };
  // console.log(Details, "DetailsDetails");
  const handledEndPremium = async () => {
    delete topDto?.PremiumDetails?.EndorsementPremiumDetails;
    await GenericApi(
      "NepalMotorTwoWheeler",
      topGenericInfo.endorsementType === "Financial Endorsement"
        ? "NepalMotorTWFinEndoAPI"
        : "NepalMotorTWCancellationAPI",
      topDto
    ).then(async (x) => {
      if (x?.finalResult) {
        objectPath.set(topDto, "PremiumDetails.EndorsementPremiumDetails", x.finalResult);
        if (topGenericInfo && topGenericInfo.endorsementType === "Financial Endorsement") {
          objectPath.set(
            topDto,
            "PremiumDetails.EndorsementPremiumDetails.FinalPremium",
            formater.format(x.finalResult.EndorsementFinalPremium)
          );
          objectPath.set(
            topDto,
            "PremiumDetails.EndorsementPremiumDetails.TotalPremium",
            x.finalResult.EndorsementFinalPremium
          );
          objectPath.set(
            topDto,
            "PaymentAmount",
            parseFloat(x.finalResult.EndorsementFinalPremium).toFixed(2)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementVAT",
            formater.format(x.finalResult.EndorsementVAT)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementTotalPremium",
            formater.format(x.finalResult.EndorsementTotalPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementBasicPremium",
            formater.format(x.finalResult.EndorsementBasicPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementPoolPremium",
            formater.format(x.finalResult.EndorsementPoolPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementTPPremium",
            formater.format(x.finalResult.EndorsementTPPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementStampDuty",
            formater.format(x.finalResult.EndorsementStampDuty)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementPremiumwithVAT",
            formater.format(x.finalResult.EndorsementPremiumwithVAT)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementPremium",
            formater.format(x.finalResult.EndorsementPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementFinalPremium",
            formater.format(x.finalResult.EndorsementFinalPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndoPremiumShortRate",
            x.finalResult.EndoPremiumShortRate
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndoPremiumProRata",
            x.finalResult.EndoPremiumProRata
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndoPremiumShortRate",
            x.finalResult.EndoPremiumShortRate
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementReceiptPremium",
            formater.format(x.finalResult.EndorsementReceiptPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.EndorsementPremiumwithVAT",
            formater.format(x.finalResult.EndorsementPremiumwithVAT)
          );
        } else {
          objectPath.set(
            topDto,
            "PremiumDetails.EndorsementPremiumDetails.TotalPremium",
            x.finalResult.CancellationFinalPremium
          );
          objectPath.set(
            topDto,
            "PremiumDetails.EndorsementPremiumDetails.FinalPremium",
            formater.format(x.finalResult.CancellationFinalPremium)
          );
          objectPath.set(
            topDto,
            "PaymentAmount",
            parseFloat(x.finalResult.CancellationFinalPremium).toFixed(2)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.CancellationBasicPremium",
            formater.format(x.finalResult.CancellationBasicPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.CancellationVAT",
            formater.format(x.finalResult.CancellationVAT)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.CancellationPoolPremium",
            formater.format(x.finalResult.CancellationPoolPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.CancellationPremium",
            formater.format(x.finalResult.CancellationPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.CancellationFinalPremium",
            formater.format(x.finalResult.CancellationFinalPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.CancellationReceiptPremium",
            formater.format(x.finalResult.CancellationReceiptPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.CancellationTPPremium",
            formater.format(x.finalResult.CancellationTPPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.CancellationPremiumShortRate",
            x.finalResult.CancellationPremiumShortRate
          );
          objectPath.set(
            topDto,
            "FormatedData.EndCalculatedPremiumDetails.CancellationPremiumProRata",
            x.finalResult.CancellationPremiumProRata
          );
        }
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.CollectedTotalPremium",
          formater.format(x.finalResult.CollectedTotalPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.CollectedSumInsured",
          formater.format(x.finalResult.CollectedSumInsured)
        );

        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.TotalSumInsuredSum",
          formater.format(x.finalResult.NepalMotorTWRating.TotalSumInsuredSum)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.NetPremiumSum",
          formater.format(x.finalResult.NepalMotorTWRating.NetPremiumSum)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.BasePremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].BasePremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.TotalSumInsured",
          formater.format(topDto.InsurableItem[0].RiskItems[0].TotalSumInsured)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.StampDuty",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].StampDuty)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.AgeofVehicleLoading",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].AgeofVehicleLoading)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NoClaimDiscountBase",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].NoClaimDiscountBase)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.EnvironmentDiscount",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].EnvironmentDiscount)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.DirectDiscountAmount",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].DirectDiscountAmount)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.BaseTPRate",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].BaseTPRate)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.STPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].STPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NoClaimDiscountTP",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].NoClaimDiscountTP)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NetPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].NetPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.VAT",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].VAT)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.FinalPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].FinalPremium)
        );
        objectPath.set(
          topDto,
          "FinalPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].FinalPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.ExcessDiscount",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].ExcessDiscount)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.ApplicableAdditionalPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].ApplicableAdditionalPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.RSDMDPremium",
          parseFloat(x.finalResult.NepalMotorTWRating.output[0].RSDMDPremium).toFixed(2)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.RiderPillionPremium",
          parseFloat(x.finalResult.NepalMotorTWRating.output[0].RiderPillionPremium).toFixed(2)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.Premiumwithloading",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].Premiumwithloading)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.PremiumafterExcessDiscount",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].PremiumafterExcessDiscount)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.PremiumafterNCDiscount",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].PremiumafterNCDiscount)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.PremiumafterEnvDiscount",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].PremiumafterEnvDiscount)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.MaxBasePremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].MaxBasePremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.TotalTPPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].TotalTPPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.PoolPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].PoolPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.CMNetPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].CMNetPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.CMExcNetPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].CMExcNetPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.TPPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].TPPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.TPIncPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].TPIncPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.TotalPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].TotalPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.ClassPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].ClassPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.AdditionalPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].AdditionalPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NepalShortRateMotor",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].NepalShortRateMotor)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NepalAgeVehicleLoadingTW1",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].NepalAgeVehicleLoadingTW1)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NepalExcessRateTW",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].NepalExcessRateTW)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NPNoClaimDiscountTWRate",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].NPNoClaimDiscountTWRate)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NepalTPRateTW",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].NepalTPRateTW)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.NepalBaseRateTW",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].NepalBaseRateTW)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.PoolPremiumforPDF",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].PoolPremiumforPDF)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.BasicODPremiumPDF",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].BasicODPremiumPDF)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.ReceiptPremiumPDF",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].ReceiptPremiumPDF)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.DirectDiscountPDF",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].DirectDiscountPDF)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.STPremiumPDF",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].STPremiumPDF)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.RSDMDPremiumPDF",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].RSDMDPremiumPDF)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.RiderPillionPremium",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].RiderPillionPremium)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.RSDMDRiderPillion",
          formater.format(
            parseFloat(
              Number(x.finalResult.NepalMotorTWRating.output[0].RSDMDPremiumPDF) +
                Number(x.finalResult.NepalMotorTWRating.output[0].RiderPillionPremium)
            )
              .toFixed(2)
              .toString()
          )
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.TotalTPPremiumRTPDF",
          formater.format(x.finalResult.NepalMotorTWRating.output[0].TotalTPPremiumRTPDF)
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.ShortPeriodRatePDF",
          x.finalResult.NepalMotorTWRating.output[0].ShortPeriodRatePDF
        );
        objectPath.set(
          topDto,
          "FormatedData.EndCalculatedPremiumDetails.NepalMotorTWRating.output.0.RiderPillionPremiumPDF",
          x.finalResult.NepalMotorTWRating.output[0].RiderPillionPremiumPDF
        );
        if (topGenericInfo && topGenericInfo?.endorsementCategory === "Extra") {
          objectPath.set(
            topDto,
            "RevisedCalculatedPremium",
            parseFloat(
              Number(x.finalResult.EndorsementFinalPremium) +
                Number(topDto.RevisedCalculatedPremium)
            )
              .toFixed(2)
              .toString()
          );
        }
        if (topGenericInfo && topGenericInfo?.endorsementCategory === "Refund") {
          objectPath.set(
            topDto,
            "RevisedCalculatedPremium",
            parseFloat(
              Number(topDto.RevisedCalculatedPremium) -
                Number(x.finalResult.EndorsementFinalPremium)
            )
              .toFixed(2)
              .toString()
          );
        }

        // setGenericPolicyDto(topDispatch, topDto);
        // await QuotationUpdate(topDto);

        setGenericPolicyDto(topDispatch, { ...topDto });
        if (
          topGenericInfo &&
          topGenericInfo.Endorsement === true &&
          topGenericInfo.endorsementCategory === "Extra"
        ) {
          if (Number(parseFloat(x?.finalResult?.EndorsementPremium).toFixed(2)) === 0) {
            swal
              .fire({
                icon: "warning",
                text: "Premium after Endorsement is 0",
                showConfirmButton: true,
                confirmButtonText: "Back to home page",
                cancelButtonText: "Edit Details",
                confirmButtonColor: "#b22222",
                cancelButtonColor: "#006400",
                showCancelButton: true,
              })
              .then((res) => {
                if (res.isConfirmed === true) {
                  setGenericInfo(topDispatch, {});
                  setGenericPolicyDto(topDispatch, {});
                  setGenericInfo(topDispatch, { ...topGenericInfo, Clear: true });
                  topNavigate("/Endorsement/Dashboard");
                }
                // return false;
              });
            // fun = false;
          }
          if (Number(parseFloat(x.finalResult.EndorsementPremium).toFixed(2)) < 0) {
            swal
              .fire({
                icon: "warning",
                text: "This will fall under Financial Endorsement Refund",
                showConfirmButton: true,
                confirmButtonText: "Back to home page",
                cancelButtonText: "Edit Details",
                confirmButtonColor: "#b22222",
                cancelButtonColor: "#006400",
                showCancelButton: true,
              })
              .then((res) => {
                if (res.isConfirmed === true) {
                  setGenericInfo(topDispatch, {});
                  setGenericPolicyDto(topDispatch, {});
                  setGenericInfo(topDispatch, { ...topDispatch, Clear: true });
                  topNavigate("/Endorsement/Dashboard");
                }
                // return false;
              });
            // fun = false;
          }
        }
        if (
          topGenericInfo &&
          topGenericInfo.Endorsement === true &&
          topGenericInfo.endorsementCategory === "Refund"
        ) {
          if (Number(parseFloat(x?.finalResult?.EndorsementPremium).toFixed(2)) === 0) {
            swal
              .fire({
                icon: "warning",
                text: "Premium after Endorsement is 0",
                showConfirmButton: true,
                confirmButtonText: "Back to home page",
                cancelButtonText: "Edit Details",
                confirmButtonColor: "#b22222",
                cancelButtonColor: "#006400",
                showCancelButton: true,
              })
              .then((res) => {
                if (res.isConfirmed === true) {
                  setGenericInfo(topDispatch, {});
                  setGenericPolicyDto(topDispatch, {});
                  setGenericInfo(topDispatch, { ...topDispatch, Clear: true });
                  topNavigate("/Endorsement/Dashboard");
                }
                // return false;
              });
            // fun = false;
          }
          if (Number(parseFloat(x?.finalResult?.EndorsementPremium).toFixed(2)) > 0) {
            swal
              .fire({
                icon: "warning",
                text: "This will fall under Financial Endorsement Extra",
                showConfirmButton: true,
                confirmButtonText: "Back to home page",
                cancelButtonText: "Edit Details",
                confirmButtonColor: "#b22222",
                cancelButtonColor: "#006400",
                showCancelButton: true,
              })
              .then((res) => {
                if (res.isConfirmed === true) {
                  setGenericInfo(topDispatch, {});
                  setGenericPolicyDto(topDispatch, {});
                  setGenericInfo(topDispatch, { ...topGenericInfo, Clear: true });
                  topNavigate("/Endorsement/Dashboard");
                }
                // return true;
              });
            // fun = false;
          }
        }
        // return true;
      } else {
        setBackDropFlag(false);
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
        return false;
      }

      // if (
      //   topGenericInfo &&
      //   topGenericInfo.Endorsement === true &&
      //   topGenericInfo.endorsementType === "Financial Endorsement"
      // ) {
      //   if (x.finalResult) {
      //     objectPath.set(topDto, "PremiumDetails.EndorsementPremium", x.finalResult);
      //     setGenericPolicyDto(topDispatch, topDto);
      //   }
      // }
      // setBackDropFlag(false);
      // swal.fire({
      //   icon: "error",
      //   text: "Incurred an error please try again later",
      //   confirmButtonColor: "#0079CE",
      // });

      return false;
    });
  };
  const handledPremium = async () => {
    await GenericApi("NepalMotorTwoWheeler", "NepalMotorCycleRatingApi", topDto).then(async (x) => {
      if (topGenericInfo && topGenericInfo.Endorsement === undefined) {
        if (x.finalResult) {
          objectPath.set(topDto, "PremiumDetails", x.finalResult);
          objectPath.set(
            topDto,
            "PaymentAmount",
            parseFloat(x.finalResult.FinalPremium).toFixed(2)
          );
          await QuotationUpdate(topDto);
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.BasePremium",
            formater.format(x.finalResult.BasePremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
            formater.format(topDto.InsurableItem[0].RiskItems[0].TotalSumInsured)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.StampDuty",
            formater.format(x.finalResult.StampDuty)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.AgeofVehicleLoading",
            formater.format(x.finalResult.AgeofVehicleLoading)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.NoClaimDiscountBase",
            formater.format(x.finalResult.NoClaimDiscountBase)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.EnvironmentDiscount",
            formater.format(x.finalResult.EnvironmentDiscount)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
            formater.format(x.finalResult.DirectDiscountAmount)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.BaseTPRate",
            formater.format(x.finalResult.BaseTPRate)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.STPremium",
            formater.format(x.finalResult.STPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.NoClaimDiscountTP",
            formater.format(x.finalResult.NoClaimDiscountTP)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.NetPremium",
            formater.format(x.finalResult.NetPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.VAT",
            formater.format(x.finalResult.VAT)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.FinalPremium",
            formater.format(x.finalResult.FinalPremium)
          );
          objectPath.set(topDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.ExcessDiscount",
            formater.format(x.finalResult.ExcessDiscount)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.ApplicableAdditionalPremium",
            formater.format(x.finalResult.ApplicableAdditionalPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.RSDMDPremium",
            parseFloat(x.finalResult.RSDMDPremium).toFixed(2)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.RiderPillionPremium",
            parseFloat(x.finalResult.RiderPillionPremium).toFixed(2)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.Premiumwithloading",
            formater.format(x.finalResult.Premiumwithloading)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.PremiumafterExcessDiscount",
            formater.format(x.finalResult.PremiumafterExcessDiscount)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.PremiumafterNCDiscount",
            formater.format(x.finalResult.PremiumafterNCDiscount)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.PremiumafterEnvDiscount",
            formater.format(x.finalResult.PremiumafterEnvDiscount)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.MaxBasePremium",
            formater.format(x.finalResult.MaxBasePremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.TotalTPPremium",
            formater.format(x.finalResult.TotalTPPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.PoolPremium",
            formater.format(x.finalResult.PoolPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.CMNetPremium",
            formater.format(x.finalResult.CMNetPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.CMExcNetPremium",
            formater.format(x.finalResult.CMExcNetPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.TPPremium",
            formater.format(x.finalResult.TPPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.TPIncPremium",
            formater.format(x.finalResult.TPIncPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.TotalPremium",
            formater.format(x.finalResult.TotalPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.ClassPremium",
            formater.format(x.finalResult.ClassPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.AdditionalPremium",
            formater.format(x.finalResult.AdditionalPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.NepalShortRateMotor",
            formater.format(x.finalResult.NepalShortRateMotor)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.NepalAgeVehicleLoadingTW1",
            formater.format(x.finalResult.NepalAgeVehicleLoadingTW1)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.NepalExcessRateTW",
            formater.format(x.finalResult.NepalExcessRateTW)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.NPNoClaimDiscountTWRate",
            formater.format(x.finalResult.NPNoClaimDiscountTWRate)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.NepalTPRateTW",
            formater.format(x.finalResult.NepalTPRateTW)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.NepalBaseRateTW",
            formater.format(x.finalResult.NepalBaseRateTW)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.PoolPremiumforPDF",
            formater.format(x.finalResult.PoolPremiumforPDF)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.BasicODPremiumPDF",
            formater.format(x.finalResult.BasicODPremiumPDF)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.ReceiptPremiumPDF",
            formater.format(x.finalResult.ReceiptPremiumPDF)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.DirectDiscountPDF",
            formater.format(x.finalResult.DirectDiscountPDF)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.STPremiumPDF",
            formater.format(x.finalResult.STPremiumPDF)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.RSDMDPremiumPDF",
            formater.format(x.finalResult.RSDMDPremiumPDF)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.RiderPillionPremium",
            formater.format(x.finalResult.RiderPillionPremium)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.RSDMDRiderPillion",
            formater.format(
              parseFloat(
                Number(x.finalResult.RSDMDPremiumPDF) + Number(x.finalResult.RiderPillionPremium)
              )
                .toFixed(2)
                .toString()
            )
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.TotalTPPremiumRTPDF",
            formater.format(x.finalResult.TotalTPPremiumRTPDF)
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.ShortPeriodRatePDF",
            x.finalResult.ShortPeriodRatePDF
          );
          objectPath.set(
            topDto,
            "FormatedData.CalculatedPremiumDetails.RiderPillionPremiumPDF",
            x.finalResult.RiderPillionPremiumPDF
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
          setGenericPolicyDto(topDispatch, { ...topDto });
          return true;
        }
      }
      // if (
      //   topGenericInfo &&
      //   topGenericInfo.Endorsement === true &&
      //   topGenericInfo.endorsementType === "Financial Endorsement"
      // ) {
      //   if (x.finalResult) {
      //     objectPath.set(topDto, "PremiumDetails.EndorsementPremium", x.finalResult);
      //     setGenericPolicyDto(topDispatch, topDto);
      //   }
      // }
      setBackDropFlag(false);
      swal.fire({
        icon: "error",
        text: "Incurred an error please try again later",
        confirmButtonColor: "#0079CE",
      });

      return false;
    });
  };
  const handleCheckEndorsementPremium = () => {
    let flag = true;
    if (
      topGenericInfo &&
      topGenericInfo.Endorsement === true &&
      topGenericInfo.endorsementCategory === "Extra"
    ) {
      if (
        Number(
          parseFloat(topDto?.PremiumDetails.EndorsementPremiumDetails?.EndorsementPremium).toFixed(
            2
          )
        ) === 0
      ) {
        flag = false;
        // return true;
      }
      if (
        Number(
          parseFloat(topDto?.PremiumDetails.EndorsementPremiumDetails?.EndorsementPremium).toFixed(
            2
          )
        ) < 0
      ) {
        flag = false;
        // return true;
      }
    }
    if (
      topGenericInfo &&
      topGenericInfo.Endorsement === true &&
      topGenericInfo.endorsementCategory === "Refund"
    ) {
      if (
        Number(
          parseFloat(topDto?.PremiumDetails.EndorsementPremiumDetails?.EndorsementPremium).toFixed(
            2
          )
        ) === 0
      ) {
        flag = false;
        // return true;
      }
      if (
        Number(
          parseFloat(topDto?.PremiumDetails.EndorsementPremiumDetails?.EndorsementPremium).toFixed(
            2
          )
        ) > 0
      ) {
        flag = false;
        // return true;
      }
    }
    return flag;
  };
  const handleUpdateEndorsementV2 = async () => {
    if (topGenericInfo && topGenericInfo.endorsementCategory === "Name Transfer") {
      if (topDto.EndoKYCNo === undefined || topDto.EndoKYCNo === "") {
        objectPath.set(
          topDto,
          "EndoPrefix",
          topDto.ProvinceCode.concat("/", topDto.InsuredTypeCode).concat("/", topDto.ShortCode, "/")
        );
        await UpdateSequenceNumber("EndoKYCNo", topDto.EndoPrefix, "EndoKYCNo", "", {
          ...topDto,
        }).then((x) => {
          if (x?.data?.EndoKYCNo) {
            objectPath.set(topDto, "EndoKYCNo", x.data.EndoKYCNo);
          } else {
            setBackDropFlag(false);
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
            fun = false;
            // return false;
          }
        });
      }
    }
    await GetEndorsementJson(topDto.EndorsementNo).then(async (x) => {
      if (x?.data?.finalResult?.EndorsementDetails?.EndorsementNo) {
        // delete topDto.PaymentDetails;
        const tDto11 = { ...topDto };
        delete tDto11.PolicyNo;
        delete tDto11.DecisionStatus;
        const requestData = x.data.finalResult.EndorsementDetails;
        // delete requestData.PaymentDetails;
        const Details1 = {
          PolicyNo: x.data.finalResult.PolicyNo,
          EndorsementDetails: { ...requestData, ...tDto11 },
          EndorsementType: [topGenericInfo.EndorsementType, topGenericInfo.EndorsementCategory],
          EndorsementNo: topDto.EndorsementNo,
        };
        await UpdateEndorsementV2(false, Details1).then((x1) => {
          if (x1?.endorsementDto?.EndorsementNo) {
            console.log("xxxx", x1);
            fun = true;
          } else {
            setBackDropFlag(false);
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
            fun = false;
          }
        });
      } else {
        setBackDropFlag(false);
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
        fun = false;
      }
    });
    return fun;
  };
  const handleEndoProposal = async () => {
    let flag = false;
    const tDto1 = { ...topDto };
    delete tDto1.PolicyNo;
    delete tDto1.DecisionStatus;
    const Details = {
      PolicyNo: topGenericInfo?.PolicyNo !== undefined ? topGenericInfo.PolicyNo : topDto.PolicyNo,
      EndorsementDetails: { ...tDto1 },
      EndorsementType: [topGenericInfo.EndorsementType, topGenericInfo.EndorsementCategory],
    };
    if (
      (objectPath.get(topDto, "EndorsementNo") === "" ||
        objectPath.get(topDto, "EndorsementNo") === undefined) &&
      handleCheckEndorsementPremium() === true
    ) {
      await EndorsementGenericSave(false, Details).then((x) => {
        if (x?.endorsementNumber) {
          objectPath.set(topDto, "EndorsementNo", x.endorsementNumber);
          flag = true;
        } else {
          setBackDropFlag(false);
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
          fun = false;
        }
      });
    }
    if (handleCheckEndorsementPremium() === false) {
      flag = true;
    }
    if (
      objectPath.get(topDto, "EndorsementNo") !== "" &&
      objectPath.get(topDto, "EndorsementNo") !== undefined
    ) {
      await GetEndorsementJson(topDto.EndorsementNo).then(async (x) => {
        if (x?.data?.finalResult?.EndorsementCategory === "Refund") {
          objectPath.set(topDto, "EndorsementCreditNo", "EndorsementCreditNo");
        }
        if (x?.data?.finalResult?.EndorsementNo) {
          // delete topDto.PaymentDetails;
          const tDto11 = { ...topDto };
          delete tDto11.PolicyNo;
          delete tDto11.DecisionStatus;
          const requestData = x.data.finalResult.EndorsementDetails;
          // delete requestData.PaymentDetails;
          const Details1 = {
            PolicyNo: x.data.finalResult.PolicyNo,
            EndorsementDetails: { ...requestData, ...tDto11 },
            EndorsementType: [topGenericInfo.EndorsementType, topGenericInfo.EndorsementCategory],
            EndorsementNo: topDto.EndorsementNo,
          };
          await UpdateEndorsementV2(false, Details1).then((x1) => {
            if (x1?.endorsementDto?.EndorsementNo) {
              flag = true;
            } else {
              setBackDropFlag(false);
              swal.fire({
                icon: "error",
                text: "Incurred an error please try again later",
                confirmButtonColor: "#0079CE",
              });
              fun = false;
            }
          });
        } else {
          setBackDropFlag(false);
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
          fun = false;
        }
      });
    }
    return flag;
  };

  const handleProposal = async () => {
    if (
      topGenericInfo &&
      topGenericInfo.Endorsement === true &&
      topGenericInfo.Endorsement !== undefined
    ) {
      // if (
      //   topGenericInfo &&
      //   topGenericInfo.Endorsement === true &&
      //   topGenericInfo.endorsementType === "Financial Endorsement"
      // ) {
      //   handledPremium();
      // }
      const tDto1 = { ...topDto };
      delete tDto1.PolicyNo;
      delete tDto1.DecisionStatus;

      // delete tDto1.PremiumDetails;
      const Details = {
        PolicyNo: topDto.PolicyNo,
        EndorsementDetails: { ...tDto1 },
        EndorsementType: [topGenericInfo.EndorsementType, topGenericInfo.EndorsementCategory],
      };
      // await EndorsementGenericSave(true, Details);

      // fun = true;
      console.log(Details, "DetailsDetails1111");
    }
    if (topGenericInfo && topGenericInfo.Endorsement === undefined) {
      await handledPremium();

      if (topGenericInfo && topGenericInfo.Flow === undefined && tDto.proposalNo === undefined) {
        await GenericApi("NepalMotorTwoWheeler", "NepalMotorTWProposal", topDto).then(async (x) => {
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
            setGenericPolicyDto(topDispatch, { ...topDto });
            await GetProductByCode(topDto.ProductCode).then(async (x2) => {
              const res = await GetProposalByNumber(topDto.proposalNo, x2.data.productId);
              objectPath.set(topDto, "KYCNo", res.data[0].policyDetails.KYCNo);
              setGenericPolicyDto(topDispatch, { ...topDto });
              fun = true;
            });
            // await GetProductIdOnProductCode(topDto.ProductCode).then(async (x2) => {
            //   const res = await GetProposalByNumber(
            //     x.finalResult.proposalNumber,
            //     x2.data[0].productIdPk
            //   );
            //   objectPath.set(topDto, "KYCNo", res.data[0].policyDetails.KYCNo);
            //   setGenericPolicyDto(topDispatch, { ...topDto });
            //   fun = true;
            // });
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
              setGenericPolicyDto(topDispatch, { ...tDto, ...res.data[0].policyDetails });
              setBackDropFlag(false);
              // fun = true;
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
    }
    if (topGenericInfo && topGenericInfo.Endorsement === true) {
      if (topGenericInfo && topGenericInfo.endorsementType === "Non-Financial Endorsement") {
        const tDto1 = { ...topDto };
        delete tDto1.PolicyNo;
        delete tDto1.DecisionStatus;
        const Details = {
          PolicyNo:
            topGenericInfo?.PolicyNo !== undefined ? topGenericInfo.PolicyNo : topDto.PolicyNo,
          EndorsementDetails: { ...tDto1 },
          EndorsementType: [topGenericInfo.EndorsementType, topGenericInfo.EndorsementCategory],
        };
        if (
          objectPath.get(topDto, "EndorsementNo") === "" ||
          objectPath.get(topDto, "EndorsementNo") === undefined
        ) {
          await EndorsementGenericSave(false, Details).then((x) => {
            if (x?.endorsementNumber) {
              objectPath.set(topDto, "EndorsementNo", x.endorsementNumber);
            } else {
              setBackDropFlag(false);
              swal.fire({
                icon: "error",
                text: "Incurred an error please try again later",
                confirmButtonColor: "#0079CE",
              });
              fun = false;
              //   return false;
            }
          });
        }
        if (
          objectPath.get(topDto, "EndorsementNo") !== "" &&
          objectPath.get(topDto, "EndorsementNo") !== undefined
        ) {
          fun = handleUpdateEndorsementV2();
        }
        setGenericPolicyDto(topDispatch, topDto);
      }
      if (topGenericInfo && topGenericInfo.endorsementType !== "Non-Financial Endorsement") {
        await handledEndPremium();
        // const tDto1 = { ...topDto };
        // delete tDto1.PolicyNo;
        // delete tDto1.DecisionStatus;
        // const Details = {
        //   PolicyNo: topDto.PolicyNo,
        //   EndorsementDetails: { ...tDto1 },
        //   EndorsementType: [topGenericInfo.EndorsementType, topGenericInfo.EndorsementCategory],
        // };
        // if (
        //   objectPath.get(topDto, "EndorsementNo") === "" ||
        //   objectPath.get(topDto, "EndorsementNo") === undefined
        // ) {
        //   await EndorsementGenericSave(false, Details).then((x) => {
        //     if (x.endorsementNumber) {
        //       objectPath.set(topDto, "EndorsementNo", x.endorsementNumber);
        //     }
        //   });
        // }
        // if (
        //   objectPath.get(topDto, "EndorsementNo") !== "" &&
        //   objectPath.get(topDto, "EndorsementNo") !== undefined
        // ) {
        //   await GetEndorsementJson(topDto.EndorsementNo).then(async (x) => {
        //     if (x.data.finalResult.EndorsementNo) {
        //       const tDto11 = { ...topDto };
        //       delete tDto11.PolicyNo;
        //       delete tDto11.DecisionStatus;
        //       const Details1 = {
        //         PolicyNo: x.data.finalResult.PolicyNo,
        //         EndorsementDetails: { ...x.data.finalResult.EndorsementDetails, ...tDto11 },
        //         EndorsementType: [
        //           topGenericInfo.EndorsementType,
        //           topGenericInfo.EndorsementCategory,
        //         ],
        //         EndorsementNo: topDto.EndorsementNo,
        //       };
        //       await UpdateEndorsementV2(false, Details1);
        //     }
        //   });
        // }
        // setGenericPolicyDto(topDispatch, topDto);

        // if (topGenericInfo && topGenericInfo.endorsementCategory === "Extra") {
        //   if (
        //     Number(
        //       parseFloat(
        //         topDto?.PremiumDetails?.EndorsementPremiumDetails?.EndorsementPremium
        //       ).toFixed(2)
        //     )
        //     // > 0
        //   ) {
        //     fun = handleEndoProposal();
        //   }
        // }
        // if (topGenericInfo && topGenericInfo.endorsementCategory === "Refund") {
        //   if (
        //     Number(
        //       parseFloat(
        //         topDto?.PremiumDetails.EndorsementPremiumDetails.EndorsementPremium
        //       ).toFixed(2)
        //     )
        //     // < 0
        //   ) {
        //     fun = handleEndoProposal();
        //   }
        // }
        // if (topGenericInfo && topGenericInfo.endorsementType === "Policy Cancellation") {
        fun = handleEndoProposal();
        // }
      }
    }
    // return fun;

    return fun;
  };
  // const InsuredDetails = objectPath.get(
  //   tDto,
  //   "ProposerDetails"
  // );
  // const object = {
  //   name: InsuredDetails.InsuredNameEnglish,
  //   dob: InsuredDetails.MemberDetail.DoB,
  //   gender: InsuredDetails.MemberDetail.GenderEnglish,
  //   emailId: InsuredDetails.EmailAddress,
  //   mobileNumber: InsuredDetails.MobileNumber,
  //   referenceNo: InsuredDetails.CitizenshipNumber,
  //   referenceType: "CitizenshipNumber",
  //   additionalDetails: objectPath.get(topDto),
  //   addressDto: [
  //     {
  //       userAddressType: "",
  //       userPincodeId: 0,
  //       userCountryId: 0,
  //       userStateId: 0,
  //       userDistrictId: 0,
  //       userCityId: 0,
  //       userAddressLine1: "",
  //       userAddressLine2: "",
  //       userAddressLine3: "",
  //     },
  //   ],
  //   dependentsDto: [
  //     {
  //       name: "",
  //       dob: "",
  //       gender: "",
  //       emailId: "",
  //       mobileNumber: "",
  //       relation: "",
  //     },
  //   ],
  // };
  // objectPath.del(tDto, "FormatedData");

  if (topDto !== null && topDispatch !== null) {
    switch (activeStep) {
      case 0:
        if (topGenericInfo && topGenericInfo.Endorsement === undefined) {
          fun = await GenericApi("NepalMotorTwoWheeler", "NepalMotorCycleRatingApi", topDto).then(
            async (x) => {
              if (x.finalResult) {
                objectPath.set(topDto, "PremiumDetails", x.finalResult);
                objectPath.set(
                  topDto,
                  "PaymentAmount",
                  parseFloat(x.finalResult.FinalPremium).toFixed(2)
                );
                const res1 = await SaveQuotation(topDto);
                objectPath.set(topDto, "Quotation No", res1.data.quotation.quoteNo);
                setGenericPolicyDto(topDispatch, { ...topDto });
                setBackDropFlag(false);
                //   const fun1 = await swal
                //     .fire({
                //       title: "<strong>Quick Quote Premium Breakup</strong>",
                //       html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%"><tr><td style={{textAlign:"left"}}>GrossPremium</td><td style={{textAlign:"right"}}>रु ${formater.format(
                //         x.finalResult.NetPremium
                //       )}</td></tr><tr><td style={{textAlign:"left"}}>StampDuty</td><td style={{textAlign:"right"}}>रु ${formater.format(
                //         x.finalResult.Stampduty
                //       )}</td></tr><tr><td style={{textAlign:"left"}}>VAT</td><td style={{textAlign:"right"}}>रु ${formater.format(
                //         x.finalResult.VAT
                //       )}</td></tr><tr><td style={{textAlign:"left"}}><b>Total Premium</b></td><td style={{textAlign:"right"}}><b>रु ${formater.format(
                //         x.finalResult.FinalPremium
                //       )}</b></td></tr></table></div>`,
                //       showConfirmButton: true,
                //       confirmButtonText: "Proceed",
                //       showCancelButton: true,
                //     })
                //     .then((resX) => {
                //       if (resX.isConfirmed) return true;
                //       return false;
                //     });
                //   return fun1;
                // }
                const fun1 = await swal
                  .fire({
                    title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                    html: `<div style="display: flex; flex-direction: row;">
<div style="flex: 2; text-align: left; margin-left: 2rem" ">
                      <div>Gross Premium</div>
<div>VAT</div>
                      <div>Stamp Duty</div>
                                            <div><b>Total Premium</b></div>
                    </div>
<div style="flex: 1.7; text-align: right;font-size:16.3px; margin-right: 1rem" ">
<div>रु</div>
<div>रु</div>
<div>रु</div>
<div><b>रु</b></div>
</div>
<div style="flex: 1.3; text-align: right; margin-right: 1rem" ">
<div> ${formater.format(x.finalResult.NetPremium)}</div>
<div> ${formater.format(x.finalResult.VAT)}</div>
<div> ${formater.format(x.finalResult.StampDuty)}</div>
<div><b> ${formater.format(x.finalResult.FinalPremium)}</b></div> 
                      </div> </div>`,
                    showConfirmButton: true,
                    width: 450,
                    confirmButtonText: "Proceed",
                    confirmButtonColor: "#0079CE",
                    // showCancelButton: true,
                    // cancelButtonColor: "#ef5350",
                    allowOutsideClick: false,
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
          fun = true;
        }

        break;
      case 1:
        fun = true;

        break;
      case 2:
        if (topGenericInfo && topGenericInfo.Endorsement === undefined) {
          fun = true;
        } else {
          fun = true;
        }
        break;
      case 3:
        fun = handleProposal();
        break;
      case 4:
        setBackDropFlag(false);
        if (topGenericInfo && topGenericInfo.Endorsement === undefined) {
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
        }
        // if (
        //   topGenericInfo &&
        //   topGenericInfo.Endorsement === true &&
        //   topGenericInfo.Endorsement !== undefined &&
        //   topGenericInfo.endorsementType === "Non-Financial Endorsement"
        // ) {
        //   const tDto1 = { ...topDto };
        //   delete tDto1.PolicyNo;
        //   delete tDto1.DecisionStatus;
        //   const Details = {
        //     PolicyNo:
        //       topGenericInfo?.PolicyNo !== undefined ? topGenericInfo.PolicyNo : topDto.PolicyNo,
        //     EndorsementDetails: { ...tDto1 },
        //     EndorsementType: [topGenericInfo.EndorsementType, topGenericInfo.EndorsementCategory],
        //   };
        //   console.log(Details, "DetailsDetails");
        //   fun = await EndorsementGenericSave(true, Details).then((res) => {
        //     if (res)
        //       swal.fire({
        //         icon: "success",
        //         text: "Endorsement Saved",
        //       });
        //     setGenericInfo(topDispatch, {});
        //     setGenericPolicyDto(topDispatch, {});
        //     setGenericInfo(topDispatch, { ...topGenericInfo, Clear: true });
        //     topNavigate("/Endorsement/Dashboard");
        //   });
        //   // return false;
        //   fun = false;
        // }
        // if (
        //   topGenericInfo &&
        //   topGenericInfo.Endorsement === true &&
        //   topGenericInfo.endorsementType === "Financial Endorsement" &&
        //   topGenericInfo.endorsementCategory === "Extra"
        // ) {
        //   fun = true;
        // }
        // // return fun;
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

const getButtonDetails = (activeStep) => {
  let btnDetails = {};
  const onReset0 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.DocType = "";
    lDto.PolicyStartDate = "";
    lDto.PolicyEndDate = "";
    setDto(dispatch, { ...lDto });
  };
  const onReset1 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.ProposerDetails.documentDetails = [{ ...docDetails() }];
    setDto(dispatch, { ...lDto });
  };
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: {
          label: "Reset",
          visible: true,
          onClick: onReset0,
        },
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
        reset: {
          label: "Reset",
          visible: true,
          onClick: onReset1,
        },
        next: { label: "Proceed", visible: true, loader: "backDrop", endorsementLabel: "Proceed" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop", endorsementLabel: "Proceed" },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop", endorsementLabel: "Proceed" },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed",
          visible: topGenericInfo && topGenericInfo.Endorsement === undefined,
          loader: "backDrop",
          endorsementLabel: "Proceed",
        },
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
        next: { label: "Proceed", visible: true, loader: "backDrop", endorsementLabel: "Proceed" },
      };
      break;
  }
  return btnDetails;
};

export { getProcessSteps, getPageContent, getSectionContent, getOnNextClick, getButtonDetails };
