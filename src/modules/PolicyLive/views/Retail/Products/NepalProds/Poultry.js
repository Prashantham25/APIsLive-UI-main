import { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Divider,
  List,
  Stack,
  Grid,
  Typography,
  Checkbox,
  InputAdornment,
  IconButton,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import objectPath from "object-path";
import ClearIcon from "@mui/icons-material/Clear";
import Success from "assets/images/Nepal/Success.png";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import {
  addDays1,
  IsNumeric,
  IsAlphaNumSpace,
  // NumBetween,
  IsMobileNumber,
  IsEmail,
  IsNumaricSpecialNoSpace,
  IsFreetextNoSpace,
  AgeCalculator,
} from "Common/Validations";
import MDTypography from "components/MDTypography";
import {
  useDataController,
  setGenericPolicyDto,
  setGenericInfo,
} from "../../../../../BrokerPortal/context";
import {
  DocumenUpload,
  DeleteDocument,
  SendNotification,
  GetProdPartnermasterData,
  GetNPCommonMaster,
  Transliteration,
  UpdateProposalDetails,
  GenericApi,
  SaveQuotation,
  // SaveCreateProposal,
  QuotationUpdate,
} from "./data/APIs/AgriBPCApi";
import PaymentPage from "../../Payment";
import {
  SavepolicyWFStatus,
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  IsNumeric1,
  GetProductByCode,
  PolicyStartDateMaxDate,
  PolicyStartDateMinDate,
  NumberofDaysinYear,
} from "./data/APIs/MotorCycleApi";
import { UpdateWorkflowStatus, GetTemplatePayload, GetProposalByNumber } from "../../Payment/Apis";
import { PoultryJson } from "./data/Json/AgriLiveStockJson";
import { BranchDetails, docDetails, InsuredDetails } from "./data/Json/CommercialJson";

let topDto = null;
let topDispatch = null;

let tArr11 = [];

let topGenericInfo = {};

let newSearchInput;
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
  BankorFinancialInstituionNameinEnglish: [],
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
  BranchMasters: [],
  MaritalStatus: [],
  MemberType: [],
  Status: [],
  IssuingBranch: [],
  AgeYear: [],
  AgeMonth: [],
  AgeDays: [],
  FieldOfficer: [],
  PlaceSelect: [
    {
      State: [],
      District: [],
      Municipality: [],
    },
  ],
};

const m = {
  SubClass: [],
  SubClassShortCode: "",
};
const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const helperText = "This field is required";

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
  const [control] = useDataController();
  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;
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

  const spreadBranchDetails = () => {
    const arr = [];
    objectPath.get(dto, "Bankdetails.BranchDetails").forEach((x, i) => {
      arr.push({
        name: `Branch Details ${i + 1}`,
        visible:
          objectPath.get(dto, "FinancingType") === "BankorFinancialInstitution" &&
          objectPath.get(dto, "Bankdetails.BankCategory") !== "" &&
          objectPath.get(dto, "Bankdetails.BankorFinancialInstituionNameinEnglish") !== "",
      });
    });
    return arr;
  };

  useEffect(() => {
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
        { name: "Brid/Chicken Information", visible: true },
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
  const [ErrorFlag, setErrorFlag] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // const [isDisable, setisDisable] = useState(false);

  const { genericPolicyDto, genericInfo, loginUserDetails } = control;

  let dto = genericPolicyDto;
  const [errCount, setErrCount] = useState(0);

  const [flag, setFlag] = useState({
    CancleIcon: false,
    Pan: false,
    Maritalstatus: false,
    dob: false,
    DocType: false,
    ExistingDetails: false,
    ExistingDetails1: false,
    DocDublication: false,
    IsBirdPurchased: false,
    IsBirdNotPurchased: false,
    OnAdd: false,
    OnAdd1: false,
    Individual: false,
    DataGriduploadFlag: false,
    DownloafAttachmentFlag: false,
    NumberofBird: false,
    SumInsuredVal: false,
  });

  // const PolicyStartDate = (e, d) => {
  //   objectPath.set(dto, "PolicyStartDate", d);
  //   objectPath.set(dto, "NumberofDays", NumberofDaysinYear(d.split("/")[2]));
  //   objectPath.set(
  //     dto,
  //     "PolicyEndDate",
  //     addDays1(objectPath.get(dto, "PolicyStartDate"), objectPath.get(dto, "NumberofDays"))
  //   );
  //   setGenericPolicyDto(dispatch, dto);
  // };

  const onAddVacOtherDocument = () => {
    const obj = {
      DocumentList: "",
      DocId: "",
      DocName: "",
      UploadDocDate: "",
    };
    dto.InsurableItem[0].VaccinationOtherDocuments.push(obj);
    setGenericPolicyDto(dispatch, dto);
  };

  const onAddDocument = () => {
    const obj = {
      DocumentList: "",
      DocId: "",
      DocName: "",
      UploadDocDate: "",
    };
    dto.documentDetails.push(obj);
    setGenericPolicyDto(dispatch, dto);
  };

  const handleDocName = (e, index) => {
    if (e.target.name === "DocName") {
      if (IsFreetextNoSpace(e.target.value) === true) {
        objectPath.set(dto, `documentDetails.${index}.DocName`, e.target.value);
        setGenericPolicyDto(dispatch, dto);
      }
    }
  };
  const handleVacOtherDocName = (e, index) => {
    if (e.target.name === "DocName") {
      if (IsFreetextNoSpace(e.target.name) === true) {
        objectPath.set(
          dto,
          `InsurableItem.0.VaccinationOtherDocuments.${index}.DocName`,
          e.target.value
        );
        setGenericPolicyDto(dispatch, dto);
      }
    }
  };
  const handleDublicateDoc = (e, DocName, index) => {
    const arr = objectPath.get(dto, "documentDetails");
    console.log(arr);
    arr.forEach((x, i) => {
      if (x.DocName === DocName && i !== index && x.DocName !== "") {
        objectPath.set(dto, `documentDetails.${index}.DocName`, "");
        setGenericPolicyDto(dispatch, dto);
        swal.fire({
          icon: "error",
          text: `"${DocName}" Already Exist`,
        });
      }
    });
  };

  const handleVacOtherDublicateDoc = (e, DocName, index) => {
    const arr = objectPath.get(dto, "InsurableItem.0.VaccinationOtherDocuments");
    console.log(arr);
    arr.forEach((x, i) => {
      if (x.DocName === DocName && i !== index && x.DocName !== "") {
        objectPath.set(dto, `InsurableItem.0.VaccinationOtherDocuments.${index}.DocName`, "");
        setGenericPolicyDto(dispatch, dto);
        swal.fire({
          icon: "error",
          text: `"${DocName}" Already Exist`,
        });
      }
    });
  };

  const onDocUplode = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        objectPath.set(dto, `documentDetails.${index}.DocId`, result.data[0].fileName);
        setGenericPolicyDto(dispatch, dto);
      }
    });
  };

  const handleFileUpload = async (event, index) => {
    await onDocUplode(event.target.files[0], index);
  };
  const onVacOtherDocUplode = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        objectPath.set(
          dto,
          `InsurableItem.0.VaccinationOtherDocuments.${index}.DocId`,
          result.data[0].fileName
        );
        setGenericPolicyDto(dispatch, dto);
      }
    });
  };

  const handleVacOtherFileUpload = async (event, index) => {
    await onVacOtherDocUplode(event.target.files[0], index);
  };

  const handleDocFileDelete = async (e, index) => {
    const file = objectPath.get(dto, "documentDetails");
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        objectPath.set(dto, `documentDetails.${index}.DocId`, "");
        setGenericPolicyDto(dispatch, dto);
      }
    });
  };
  const handleVacOtherDocFileDelete = async (e, index) => {
    const file = objectPath.get(dto, "InsurableItem.0.VaccinationOtherDocuments");
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        objectPath.set(dto, `InsurableItem.0.VaccinationOtherDocuments.${index}.DocId`, "");
        setGenericPolicyDto(dispatch, dto);
      }
    });
  };
  const handleDocDelete = (index) => {
    objectPath.del(dto, `documentDetails.${index}`);
    setGenericPolicyDto(dispatch, dto);
  };
  const handleVacOtherDocDelete = (index) => {
    objectPath.del(dto, `InsurableItem.0.VaccinationOtherDocuments.${index}`);
    setGenericPolicyDto(dispatch, dto);
  };

  const OnProfilePicture = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    const fileExtension = file.name.split(".").pop();
    if (fileExtension === "jpeg" || fileExtension === "png") {
      await DocumenUpload(formData);
      objectPath.set(dto, "ProposerDetails.PermanentAdrress.ProfilePicture", file.name);
      setGenericPolicyDto(dispatch, dto);
      swal.fire({
        icon: "success",
        text: "Profile Picture uploaded successfully",
      });
    } else {
      swal.fire({
        icon: "error",
        text: "File format is Incorrect",
        confirmButtonColor: "#0079CE",
      });
    }
  };

  const onCancelClickProfilePicture = async () => {
    // lDto.ProposerDetails.ProfilePicture = e.target.value;
    const file = objectPath.get(dto, "ProposerDetails.PermanentAdrress.ProfilePicture");
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.ProfilePicture", "");
        setGenericPolicyDto(dispatch, dto);
      }
    });
  };

  const handleInssuingbranch = (e, a, key) => {
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
      console.log("a", a);
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
        let ClassCode = "";
        const Class = objectPath.get(dto, "Class");
        if (Class !== "" && Class !== undefined) {
          ClassCode = m.SubClassShortCode;
        }
        const BusinessTypeCode = objectPath.get(dto, "DocType").split("")[0];
        const FiscalYear = objectPath.get(dto, "Channel.FiscalYear");
        objectPath.set(
          dto,
          "PolicyPrefix",
          a.ProvinceCode.concat("/", a.ShortCode, "/", "AGR").concat(
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
    objectPath.set(dto, "ProposerDetails.PermanentAdrress.ProfilePicture", "");
    setGenericPolicyDto(dispatch, dto);
  };
  const handleFieldOfficer = (e, a, key) => {
    if (key === "FieldOfficer") {
      if (a !== null) {
        objectPath.set(dto, "Channel.FieldOfficer", a.mValue);
        objectPath.set(dto, "Channel.FieldOfficerCode", a.fieldName);
      } else {
        objectPath.set(dto, "Channel.FieldOfficer", "");
        objectPath.set(dto, "Channel.FieldOfficerCode", "");
      }
      setGenericPolicyDto(dispatch, dto);
    }
    if (key === "fieldName") {
      if (a !== null) {
        objectPath.set(dto, "Channel.FieldOfficerCode", a.fieldName);
        objectPath.set(dto, "Channel.FieldOfficer", a.mValue);
      } else {
        objectPath.set(dto, "Channel.FieldOfficer", "");
        objectPath.set(dto, "Channel.FieldOfficerCode", "");
      }
      setGenericPolicyDto(dispatch, dto);
    }
    if (key === "SubFieldOfficer") {
      if (a !== null) {
        objectPath.set(dto, "Channel.SubFieldOfficerCode", a.mValue);
        objectPath.set(dto, "Channel.SubFieldOfficer", a.fieldName);
      } else {
        objectPath.set(dto, "Channel.SubFieldOfficer", "");
        objectPath.set(dto, "Channel.SubFieldOfficerCode", "");
      }
      setGenericPolicyDto(dispatch, dto);
    }
    if (key === "subfieldName") {
      if (a !== null) {
        objectPath.set(dto, "Channel.SubFieldOfficerCode", a.fieldName);
        objectPath.set(dto, "Channel.SubFieldOfficer", a.mValue);
      } else {
        objectPath.set(dto, "Channel.SubFieldOfficer", "");
        objectPath.set(dto, "Channel.SubFieldOfficerCode", "");
      }
      setGenericPolicyDto(dispatch, dto);
    }
    if (key === "agentFieldOfficer") {
      if (a !== null) {
        objectPath.set(dto, "Channel.AgentCode", a.fieldName);
        objectPath.set(dto, "Channel.AgentName", a.mValue);
      } else {
        objectPath.set(dto, "Channel.AgentName", "");
        objectPath.set(dto, "Channel.AgentCode", "");
      }
      setGenericPolicyDto(dispatch, dto);
    }
    if (key === "agentfieldName") {
      if (a !== null) {
        objectPath.set(dto, "Channel.AgentCode", a.fieldName);
        objectPath.set(dto, "Channel.AgentName", a.mValue);
      } else {
        objectPath.set(dto, "Channel.AgentName", "");
        objectPath.set(dto, "Channel.AgentCode", "");
      }
      setGenericPolicyDto(dispatch, dto);
    }

    if (key === "subagentFieldOfficer") {
      if (a !== null) {
        objectPath.set(dto, "Channel.SubAgentCode", a.mValue);
        objectPath.set(dto, "Channel.SubAgentName", a.fieldName);
      } else {
        objectPath.set(dto, "Channel.SubAgentName", "");
        objectPath.set(dto, "Channel.SubAgentCode", "");
      }
      setGenericPolicyDto(dispatch, dto);
    }
    if (key === "subagentfieldName") {
      if (a !== null) {
        objectPath.set(dto, "Channel.SubAgentCode", a.fieldName);
        objectPath.set(dto, "Channel.SubAgentName", a.mValue);
      } else {
        objectPath.set(dto, "Channel.SubAgentName", "");
        objectPath.set(dto, "Channel.SubAgentCode", "");
      }
      setGenericPolicyDto(dispatch, dto);
    }
  };

  const onBlurTransliteration = async (e, index, EF, ET) => {
    //  production
    //  development
    EF(false);
    ET("");
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
      if (varName === "InsuredNameEnglish")
        objectPath.set(dto, "ProposerDetails.InsuredNameNepali", oText);
      if (varName === "BankorFinancialInstituionNameinEnglish")
        objectPath.set(dto, "Bankdetails.BankorFinancialInstituionNameinNepali", oText);
      if (varName === "AddressEnglishBank") objectPath.set(dto, "Bankdetails.AddressNepali", oText);
      if (varName === "AddressEnglish1")
        objectPath.set(dto, `Bankdetails.BranchDetails.${index}.AddressNepali`, oText);
      if (varName === "AddressEnglish2")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.AddressNepali", oText);
      if (varName === "TemporaryAddressEnglish")
        objectPath.set(dto, "ProposerDetails.TemporaryAddressNepali", oText);
      if (varName === "HusbandNameEnglish")
        objectPath.set(dto, "ProposerDetails.HusbandNameNepali", oText);
      if (varName === "FatherNameEnglish1")
        objectPath.set(dto, "ProposerDetails.FatherNameNepali", oText);
      if (varName === "WifeNameEnglish")
        objectPath.set(dto, "ProposerDetails.WifeNameNepali", oText);
      if (varName === "TownEnglish")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.TownNepali", oText);
      if (varName === "AddressEnglish3")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.PermanentAddressNepali", oText);
      if (varName === "CityEnglish")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.CityNepali", oText);
      if (varName === "TempAddresEnglish")
        objectPath.set(dto, "ProposerDetails.CommunicationAddress.TempAddresNepali", oText);
      if (varName === "ResidenceEnglish")
        objectPath.set(dto, "ProposerDetails.CommunicationAddress.ResidenceNepali", oText);
      if (varName === "MemberNameEnglish")
        objectPath.set(dto, "ProposerDetails.MemberNameNepali", oText);
      if (varName === "CareofNameEnglish")
        objectPath.set(dto, "ProposerDetails.CareofNameNepali", oText);
      if (varName === "CareofAddressEnglish")
        objectPath.set(dto, "ProposerDetails.CareofAddressNepali", oText);
      if (varName === "ProprietorNameEnglish")
        objectPath.set(dto, "ProposerDetails.ProprietorNameNepali", oText);
      if (varName === "DesignationEnglish")
        objectPath.set(dto, "ProposerDetails.DesignationNepali", oText);
      if (varName === "HusbandNameEnglish1")
        objectPath.set(dto, "ProposerDetails.HusbandNameNepali", oText);
      if (varName === "WifeNameEnglish1")
        objectPath.set(dto, "ProposerDetails.WifeNameNepali", oText);
      if (varName === "GrandfatherNameEnglish1")
        objectPath.set(dto, "ProposerDetails.GrandfatherNameNepali", oText);
      if (varName === "GrandfatherNameEnglish12")
        objectPath.set(dto, "ProposerDetails.GrandfatherNameNepali", oText);
      if (varName === "AddressEng1") objectPath.set(dto, "RiskAddressDetails.AddressNepali", oText);
      if (varName === "FatherNameEng")
        objectPath.set(dto, "ProposerDetails.FatherNameNepali", oText);
      if (varName === "TownEnglish1")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.TownNepali", oText);
      if (varName === "CityEnglish1")
        objectPath.set(dto, "ProposerDetails.PermanentAdrress.CityNepali", oText);
      if (varName === "TempAddresEnglish1")
        objectPath.set(dto, "ProposerDetails.CommunicationAddress.TempAddresNepali", oText);
      if (varName === "AddressEnglish31")
        objectPath.set(dto, "ProposerDetails.PermanentAddNepali", oText);
      setGenericPolicyDto(dispatch, dto);
    }
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
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.AddressNepali`, "");
      objectPath.set(dto, `Bankdetails.BranchDetails.${i}.WardNumber`, "");
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const GenderNepali = [
    { mID: 1, mValue: "Male", translation: "पुरुष" },
    { mID: 2, mValue: "Female", translation: "महिला" },
    { mID: 3, mValue: "Others", translation: "अन्य" },
  ];

  const handleGender = (e, a, n) => {
    if (a !== null) {
      if (n === "GenderEnglish1") {
        objectPath.set(dto, "ProposerDetails.GenderEnglish", a.mValue);
        objectPath.set(dto, "ProposerDetails.GenderNepali", a.translation);
      } else if (n === "GenderEnglish") {
        objectPath.set(dto, "ProposerDetails.GenderEnglish", a.mValue);
        objectPath.set(dto, "ProposerDetails.GenderNepali", a.translation);
      }
    } else {
      objectPath.set(dto, "ProposerDetails.GenderEnglish", "");
      objectPath.set(dto, "ProposerDetails.GenderNepali", "");
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const MaritalStatus = [
    { mID: 1, mValue: "unmarried", translation: "अविवाहित" },
    { mID: 2, mValue: "married", translation: "विवाहित" },
    { mID: 3, mValue: "divorced", translation: "विभाजक" },
    { mID: 4, mValue: "widow", translation: "विधवा" },
  ];
  const handleMarital = (e, a, n) => {
    if (a !== null) {
      if (n === "MaritalStatusEnglish") {
        objectPath.set(dto, "ProposerDetails.MaritalStatusEnglish", a.mValue);
        objectPath.set(dto, "ProposerDetails.MaritalStatusNepali", a.translation);
      } else if (n === "MaritalStatusEnglish1") {
        objectPath.set(dto, "ProposerDetails.MaritalStatusEnglish", a.mValue);
        objectPath.set(dto, "ProposerDetails.MaritalStatusNepali", a.translation);
      }
    } else {
      objectPath.set(dto, "ProposerDetails.MaritalStatusEnglish", "");
      objectPath.set(dto, "ProposerDetails.MaritalStatusNepali", "");
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const onAddBranchDetails = () => {
    objectPath.get(dto, "Bankdetails.BranchDetails").push({ ...BranchDetails() });
    setGenericPolicyDto(dispatch, dto);
  };

  const onPlaceSelect = async (e, a, n, index) => {
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

    if (n === "State3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        objectPath.set(dto, "ProposerDetails.ProvinceState", a.mValue);
        objectPath.set(dto, "ProposerDetails.District", "");
        objectPath.set(dto, "ProposerDetails.Municipality", "");
        masters.District3 = res.data;
        masters.Municipality3 = [];
      } else {
        objectPath.set(dto, "ProposerDetails.ProvinceState", "");
        objectPath.set(dto, "ProposerDetails.District", "");
        objectPath.set(dto, "ProposerDetails.Municipality", "");
        masters.District3 = [];
        masters.Municipality3 = [];
      }
    }
    if (n === "District3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        objectPath.set(dto, "ProposerDetails.District", a.mValue);
        objectPath.set(dto, "ProposerDetails.Municipality", "");
        objectPath.set(dto, "ProposerDetails.WardNumber", "");
        masters.Municipality3 = res.data;
      } else {
        objectPath.set(dto, "ProposerDetails.District", "");
        objectPath.set(dto, "ProposerDetails.Municipality", "");
        objectPath.set(dto, "ProposerDetails.WardNumber", "");
        masters.Municipality3 = [];
      }
    }
    if (n === "State4") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", {
          State_Id: a.mID,
        });
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
        const res = await GetProdPartnermasterData("Municipality", {
          District_Id: a.mID,
        });
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
        masters.Municipalitynew = [];
      }
    }
    tArr11 = [...tArr11];
    setGenericPolicyDto(dispatch, dto);
  };

  const handleDataGrid = (e) => {
    if (e.target.name === "NumberofBirdorChicken") {
      if (objectPath.get(dto, "Temp.DataGridValues.0.NumberofBirdorChicken") === undefined) {
        objectPath.set(dto, "Temp.DataGridValues.0.NumberofBirdorChicken", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.NumberofBirdorChicken", "");
        setGenericPolicyDto(dispatch, dto);
      }
      if (IsNumeric1(e.target.value) === true) {
        flag.NumberofBird = false;
        setFlag({ ...flag });
        objectPath.set(dto, "Temp.DataGridValues.0.NumberofBirdorChicken", e.target.value);
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.NumberofBirdorChicken", e.target.value);
        setGenericPolicyDto(dispatch, dto);
      } else {
        flag.NumberofBird = true;
        setFlag({ ...flag });
        objectPath.set(dto, "Temp.DataGridValues.0.NumberofBirdorChicken", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.NumberofBirdorChicken", "");
      }
    }
    if (e.target.name === "SumInsured") {
      // const Regex = /^[0-9]*$/;
      if (objectPath.get(dto, "Temp.DataGridValues.0.SumInsured") === undefined) {
        objectPath.set(dto, "Temp.DataGridValues.0.SumInsured", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.SumInsured", "");
        setGenericPolicyDto(dispatch, dto);
      }
      if (IsNumeric1(e.target.value) === true) {
        flag.SumInsuredVal = false;
        setFlag({ ...flag });
        objectPath.set(dto, "Temp.DataGridValues.0.SumInsured", e.target.value);
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.SumInsured", e.target.value);
        setGenericPolicyDto(dispatch, dto);
      } else {
        // objectPath.set(dto, "Temp.DataGridValues.0.SumInsured", "");
        // objectPath.set(dto, "InsurableItem.0.RiskItems.0.SumInsured", "");
        flag.SumInsuredVal = true;
        setFlag({ ...flag });
      }
    }
  };
  const handleDataGridRegVal = () => {
    flag.SumInsuredVal = false;
    flag.NumberofBird = false;
    setFlag({ ...flag });
  };

  if (objectPath.get(dto, "InsurableItem.0.RiskItems.0.IsBirdPurchased") === "No") {
    flag.IsBirdNotPurchased = true;
    objectPath.set(dto, "InsurableItem.0.RiskItems.0.PurchasedDate", "");
    objectPath.set(dto, "InsurableItem.0.RiskItems.0.PurchaseAmount", "");
  } else {
    flag.IsBirdNotPurchased = false;
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleMenuOpen = (event, rowIndex) => {
    console.log("rowIndex", rowIndex);
    setSelectedRowIndex(rowIndex);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectedRowIndex(null);
    setAnchorEl(null);
  };

  const OnReset = () => {
    dto.InsurableItem[0].RiskItems[0].IsBirdPurchased = "No";
    dto.InsurableItem[0].RiskItems[0].PurchasedDate = "";
    dto.InsurableItem[0].RiskItems[0].PurchaseAmount = "";
    dto.InsurableItem[0].RiskItems[0].BatchNumber = "";
    dto.InsurableItem[0].RiskItems[0].NameofBirdorChicken = "";
    dto.InsurableItem[0].RiskItems[0].PurposeofUsage = "";
    dto.InsurableItem[0].RiskItems[0].NumberofBirdorChicken = "";
    dto.InsurableItem[0].RiskItems[0].Category = "Poultry";
    dto.InsurableItem[0].RiskItems[0].BreedCasteVariety = "";
    dto.InsurableItem[0].RiskItems[0].FarmingType = "";
    dto.InsurableItem[0].RiskItems[0].Color = "";
    dto.InsurableItem[0].RiskItems[0].Height = "";
    dto.InsurableItem[0].RiskItems[0].Weight = "";
    dto.InsurableItem[0].RiskItems[0].AgeYear = "";
    dto.InsurableItem[0].RiskItems[0].AgeMonth = "";
    dto.InsurableItem[0].RiskItems[0].AgeDays = "";
    dto.InsurableItem[0].RiskItems[0].Remarks = "";
    dto.InsurableItem[0].RiskItems[0].CurrentHealthStatus = "";
    dto.InsurableItem[0].RiskItems[0].SumInsured = "";
    setGenericPolicyDto(dispatch, dto);
  };

  const PremiumCalc = async (tempObj) => {
    await GenericApi("NepalAgriLivestockPoultry", "NepalAgriPoultryAPI", dto).then(async (x) => {
      if (x.finalResult) {
        dto.Temp.Upload = [...dto.Temp.Upload, tempObj];
        dto.Temp.UploadData = [...dto.Temp.UploadData, tempObj];
        objectPath.set(
          dto,
          `Temp.Upload.${dto.Temp.Upload.length - 1}.Premium Amount`,
          formater.format(x.finalResult.BasePremium)
        );
        objectPath.set(dto, "PremiumDetails", x.finalResult);
        objectPath.set(dto, "PaymentAmount", parseFloat(x.finalResult.FinalPremium).toFixed(2));
        objectPath.set(dto, "FinalPremium", formater.format(x.finalResult.FinalPremium));

        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.FinalPremium",
          formater.format(x.finalResult.FinalPremium)
        );

        await QuotationUpdate(dto);

        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.BasePremium",
          formater.format(x.finalResult.BasePremium)
        );
        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.GovtSubsidyPremium",
          formater.format(x.finalResult.GovtSubsidyPremium)
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
          "FormatedData.CalculatedPremiumDetails.StampDuty",
          formater.format(x.finalResult.StampDuty)
        );
        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
          formater.format(x.finalResult.AccidentalPremium)
        );

        objectPath.set(
          dto,
          "InsurableItem.0.RiskItems.0.Premium Amount",
          formater.format(x.finalResult.BasePremium)
        );
        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
          formater.format(x.finalResult.PerPersonAccidentalPremium)
        );
        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.PremiumwithStampduty",
          formater.format(x.finalResult.PremiumwithStampduty)
        );
        objectPath.set(dto, "FinalPremium", formater.format(x.finalResult.FinalPremium));

        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.FinalPremium",
          formater.format(x.finalResult.FinalPremium)
        );

        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.TaxableAmountPDF",
          formater.format(x.finalResult.TaxableAmountPDF)
        );

        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.ReceiptPremiumPDF",
          formater.format(x.finalResult.ReceiptPremiumPDF)
        );
        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.GrandTotalPDF",
          formater.format(x.finalResult.GrandTotalPDF)
        );

        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.ReceivedAmtPDF",
          formater.format(x.finalResult.ReceivedAmtPDF)
        );

        setGenericPolicyDto(dispatch, dto);
        setErrorFlag(false);
        setFlag({ ...flag, OnAdd: true });
        OnReset();
        setGenericPolicyDto(dispatch, dto);
        if (
          objectPath.get(dto, "TotalSumInsured") === "" ||
          objectPath.get(dto, "TotalSumInsured") === undefined
        ) {
          objectPath.set(dto, "TotalSumInsured", 0);
          setGenericPolicyDto(dispatch, dto);
        }
        const TotalSI =
          Number(objectPath.get(dto, "TotalSumInsured")) +
          Number(objectPath.get(dto, `Temp.Upload.${dto.Temp.Upload.length - 1}.SumInsured`));
        objectPath.set(dto, "TotalSumInsured", TotalSI);

        if (
          objectPath.get(dto, "TotalNumberBirdorChicken") === "" ||
          objectPath.get(dto, "TotalNumberBirdorChicken") === undefined
        ) {
          objectPath.set(dto, "TotalNumberBirdorChicken", 0);
          setGenericPolicyDto(dispatch, dto);
        }

        const TotalNoBirds =
          Number(objectPath.get(dto, "TotalNumberBirdorChicken")) +
          Number(
            objectPath.get(dto, `Temp.Upload.${dto.Temp.Upload.length - 1}.NumberofBirdorChicken`)
          );
        objectPath.set(dto, "TotalNumberBirdorChicken", TotalNoBirds);

        setIsLoading(false);
        setGenericPolicyDto(dispatch, dto);
      }
    });
  };

  const OnClickAddData1 = () => {
    setIsLoading(true);
    setErrCount(errCount + 1);
    const updatedId = Math.floor(Math.random() * 100) + 1;
    if (updatedId === objectPath.get(dto, "updatedId")) {
      objectPath.set(dto, "updatedId", Number(updatedId) + 100);
      setGenericPolicyDto(dispatch, dto);
    } else {
      objectPath.set(dto, "updatedId", updatedId);
      setGenericPolicyDto(dispatch, dto);
    }
    const tempObj = {
      UniqueId: objectPath.get(dto, "updatedId"),
      PurchasedDate: dto.InsurableItem[0].RiskItems[0].PurchasedDate,
      PurchaseAmount: dto.InsurableItem[0].RiskItems[0].PurchaseAmount,
      BatchNumber: dto.InsurableItem[0].RiskItems[0].BatchNumber,
      TypeofPoultry: dto.InsurableItem[0].RiskItems[0].TypeofPoultry,
      NumberofBirdorChicken: dto.InsurableItem[0].RiskItems[0].NumberofBirdorChicken,
      PurposeofUsage: dto.InsurableItem[0].RiskItems[0].PurposeofUsage,
      NameofBirdorChicken: dto.InsurableItem[0].RiskItems[0].NameofBirdorChicken,
      Category: dto.InsurableItem[0].RiskItems[0].Category,
      BreedCasteVariety: dto.InsurableItem[0].RiskItems[0].BreedCasteVariety,
      FarmingType: dto.InsurableItem[0].RiskItems[0].FarmingType,
      Color: dto.InsurableItem[0].RiskItems[0].Color,
      Height: dto.InsurableItem[0].RiskItems[0].Height,
      Weight: dto.InsurableItem[0].RiskItems[0].Weight,
      AgeYear: dto.InsurableItem[0].RiskItems[0].AgeYear,
      AgeMonth: dto.InsurableItem[0].RiskItems[0].AgeMonth,
      AgeDays: dto.InsurableItem[0].RiskItems[0].AgeDays,
      Remarks: dto.InsurableItem[0].RiskItems[0].Remarks,
      CurrentHealthStatus: dto.InsurableItem[0].RiskItems[0].CurrentHealthStatus,
      SumInsured: dto.InsurableItem[0].RiskItems[0].SumInsured,
      Rate: objectPath.get(dto, "InsurableItem.0.RiskItems.0.Rate(%)"),
    };
    PremiumCalc(tempObj);
  };

  const OnClickAddData = () => {
    if (newSearchInput === "") {
      dto.Temp.Upload = [...dto.Temp.UploadData];
      setGenericPolicyDto(dispatch, dto);
    }
    if (
      dto.InsurableItem[0].RiskItems[0].IsBirdPurchased === "Yes" &&
      dto.InsurableItem[0].RiskItems[0].PurchaseAmount !== "" &&
      dto.InsurableItem[0].RiskItems[0].PurchasedDate !== "" &&
      dto.InsurableItem[0].RiskItems[0].NumberofBirdorChicken !== "" &&
      dto.InsurableItem[0].RiskItems[0].PurposeofUsage !== "" &&
      dto.InsurableItem[0].RiskItems[0].Category !== "" &&
      dto.InsurableItem[0].RiskItems[0].BreedCasteVariety !== "" &&
      dto.InsurableItem[0].RiskItems[0].FarmingType !== "" &&
      dto.InsurableItem[0].RiskItems[0].CurrentHealthStatus !== "" &&
      dto.InsurableItem[0].RiskItems[0].SumInsured !== ""
    ) {
      OnClickAddData1();
    } else if (
      dto.InsurableItem[0].RiskItems[0].IsBirdPurchased === "No" &&
      dto.InsurableItem[0].RiskItems[0].NumberofBirdorChicken !== "" &&
      dto.InsurableItem[0].RiskItems[0].PurposeofUsage !== "" &&
      dto.InsurableItem[0].RiskItems[0].Category !== "" &&
      dto.InsurableItem[0].RiskItems[0].BreedCasteVariety !== "" &&
      dto.InsurableItem[0].RiskItems[0].FarmingType !== "" &&
      dto.InsurableItem[0].RiskItems[0].CurrentHealthStatus !== "" &&
      dto.InsurableItem[0].RiskItems[0].SumInsured !== ""
    ) {
      OnClickAddData1();
    } else {
      const errCount1 = genericInfo.errCount ? genericInfo.errCount : 0;
      setGenericInfo(dispatch, { ...genericInfo, errCount: errCount1 + 1 });
      setErrorFlag(true);
      swal.fire({
        icon: "error",
        text: "please fill required fields",
      });
    }
  };

  const handleDelete = () => {
    const filteredList1 = dto.Temp.Upload.filter(
      (item) => selectedRowIndex.UniqueId !== item.UniqueId
    );
    const deletedItem = dto.Temp.Upload.find((item) => selectedRowIndex.UniqueId === item.UniqueId);
    dto.Temp.Upload = filteredList1;
    dto.Temp.UploadData = filteredList1;

    handleMenuClose();
    const updatedTotNumberOfChicken =
      Number(objectPath.get(dto, "TotalNumberBirdorChicken")) -
      Number(deletedItem.NumberofBirdorChicken);
    objectPath.set(dto, "TotalNumberBirdorChicken", Number(updatedTotNumberOfChicken));

    const updatedTotSumInsured =
      Number(objectPath.get(dto, "TotalSumInsured")) - Number(deletedItem.SumInsured);
    objectPath.set(dto, "TotalSumInsured", Number(updatedTotSumInsured));

    setGenericPolicyDto(dispatch, dto);

    setFlag({ ...flag, OnAdd: true });
  };

  const handleEdit = () => {
    console.log("selectedRowIndex", selectedRowIndex);
    if (
      selectedRowIndex.PurchasedDate !== undefined &&
      selectedRowIndex.PurchaseAmount !== undefined &&
      selectedRowIndex.PurchasedDate !== "" &&
      selectedRowIndex.PurchaseAmount !== ""
    ) {
      objectPath.set(dto, "InsurableItem.0.RiskItems.0.IsBirdPurchased", "Yes");
      dto.InsurableItem[0].RiskItems[0].PurchasedDate = selectedRowIndex.PurchasedDate;
      dto.InsurableItem[0].RiskItems[0].PurchaseAmount = selectedRowIndex.PurchaseAmount;
    }

    dto.InsurableItem[0].RiskItems[0].BatchNumber = selectedRowIndex.BatchNumber;
    dto.InsurableItem[0].RiskItems[0].NameofBirdorChicken = selectedRowIndex.NameofBirdorChicken;
    dto.InsurableItem[0].RiskItems[0].PurposeofUsage = selectedRowIndex.PurposeofUsage;
    dto.InsurableItem[0].RiskItems[0].NumberofBirdorChicken =
      selectedRowIndex.NumberofBirdorChicken;
    dto.InsurableItem[0].RiskItems[0].Category = selectedRowIndex.Category;
    dto.InsurableItem[0].RiskItems[0].BreedCasteVariety = selectedRowIndex.BreedCasteVariety;
    dto.InsurableItem[0].RiskItems[0].FarmingType = selectedRowIndex.FarmingType;
    dto.InsurableItem[0].RiskItems[0].Color = selectedRowIndex.Color;
    dto.InsurableItem[0].RiskItems[0].Height = selectedRowIndex.Height;
    dto.InsurableItem[0].RiskItems[0].Weight = selectedRowIndex.Weight;
    dto.InsurableItem[0].RiskItems[0].AgeYear = selectedRowIndex.AgeYear;
    dto.InsurableItem[0].RiskItems[0].AgeMonth = selectedRowIndex.AgeMonth;
    dto.InsurableItem[0].RiskItems[0].AgeDays = selectedRowIndex.AgeDays;
    dto.InsurableItem[0].RiskItems[0].Remarks = selectedRowIndex.Remarks;
    dto.InsurableItem[0].RiskItems[0].CurrentHealthStatus = selectedRowIndex.CurrentHealthStatus;
    dto.InsurableItem[0].RiskItems[0].SumInsured = selectedRowIndex.SumInsured;
    handleMenuClose();
    handleDelete();
  };

  const handleSearch = (searchText) => {
    // setisDisable(true);

    const filtered = dto.Temp.Upload.filter((item) => {
      const searchLower = searchText.toLowerCase();
      const matchesName = item.NameofBirdorChicken.toLowerCase().includes(searchLower);
      const matchesCategory = item.Category.toLowerCase().includes(searchLower);
      const matchsNoBirdsChicken = item.NumberofBirdorChicken.toLowerCase().includes(searchLower);
      const matchesSumInsured = item.SumInsured.toLowerCase().includes(searchLower);
      const matchesCurrentHealthStatus =
        item.CurrentHealthStatus.toLowerCase().includes(searchLower);
      const matchsRemarks = item.Remarks.toLowerCase().includes(searchLower);
      const matchesAgeDays = item.AgeDays.toLowerCase().includes(searchLower);
      const matchesAgeMonth = item.AgeMonth.toLowerCase().includes(searchLower);
      const matchsAgeYear = item.AgeYear.toLowerCase().includes(searchLower);
      const matchesWeight = item.Weight.toLowerCase().includes(searchLower);
      const matchesHeight = item.Height.toLowerCase().includes(searchLower);
      const matchsColor = item.Color.toLowerCase().includes(searchLower);
      const matchesFarmingType = item.FarmingType.toLowerCase().includes(searchLower);
      const matchesBreedCasteVariety = item.BreedCasteVariety.toLowerCase().includes(searchLower);
      const matchsPurposeofUsage = item.PurposeofUsage.toLowerCase().includes(searchLower);
      const matchsBatchNumber = item.BatchNumber.toLowerCase().includes(searchLower);
      const matchsPurchaseAmount = item.PurchaseAmount.toLowerCase().includes(searchLower);

      return (
        matchesName ||
        matchesCategory ||
        matchsNoBirdsChicken ||
        matchesSumInsured ||
        matchesCurrentHealthStatus ||
        matchsRemarks ||
        matchesAgeDays ||
        matchesAgeMonth ||
        matchsAgeYear ||
        matchesWeight ||
        matchesHeight ||
        matchsColor ||
        matchesFarmingType ||
        matchesBreedCasteVariety ||
        matchsPurposeofUsage ||
        matchsBatchNumber ||
        matchsPurchaseAmount
      );
    });
    dto.Temp.Upload = filtered;
    setGenericPolicyDto(dispatch, dto);
    if (newSearchInput === "") {
      dto.Temp.Upload = dto.Temp.UploadData;
      setGenericPolicyDto(dispatch, dto);
    }
  };

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const OnClearData = () => {
    console.log("iiii", rowSelectionModel);
    newSearchInput = "";
    const filteredList = dto.Temp.Upload.filter(
      (item) => !rowSelectionModel.includes(item.UniqueId)
    );
    console.log("filteredList", filteredList);
    setRowSelectionModel(filteredList);
    dto.Temp.Upload = filteredList;
    dto.Temp.UploadData = filteredList;
    setGenericPolicyDto(dispatch, { ...dto });
    console.log("rowSelectionModel", rowSelectionModel);
    const totalBirdsOrChickens = filteredList.reduce(
      (total, item) => total + Number(item.NumberofBirdorChicken),
      0
    );
    objectPath.set(dto, "TotalNumberBirdorChicken", Number(totalBirdsOrChickens));

    const totalSumInsured = filteredList.reduce(
      (total, item) => total + Number(item.SumInsured),
      0
    );
    objectPath.set(dto, "TotalSumInsured", Number(totalSumInsured));
    setGenericPolicyDto(dispatch, { ...dto });
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

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  const Navigate = useNavigate();

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
        communicationId: 322,
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
  const handleBanknoBank = (e, a) => {
    if (a !== null) {
      dto.Bankdetails.BankorNonBank = a.mValue;
    } else {
      dto.Bankdetails.BankorNonBank = "";
    }
    dto.Bankdetails.BankCategory = "";
    dto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
    dto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
    dto.Bankdetails.Country = "";
    dto.Bankdetails.ProvinceorState = "";
    dto.Bankdetails.Municipality = "";
    dto.Bankdetails.WardNumber = "";
    dto.Bankdetails.AddressEnglish = "";
    dto.Bankdetails.District = "";
    dto.Bankdetails.AddressNepali = "";
    setGenericPolicyDto(dispatch, dto);
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
  const onDOBselect = (e, d) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      dto.ProposerDetails.DoB = [""];
      swal.fire({
        icon: "error",
        text: `Age of the Policy Holder must be above 16 Years.`,
        confirmButtonColor: "#0079CE",
      });
    } else {
      dto.ProposerDetails.DoB = d;
    }
    setGenericPolicyDto(dispatch, { ...dto });
  };

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
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);
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

  // const onSaveModalClose = async () => {
  //   if (genericInfo && genericInfo.ProposalNo !== undefined) {
  //     await UpdateProposalDetails(dto).then(async () => {
  //       if (
  //         genericInfo.Flow &&
  //         (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
  //       ) {
  //         swal
  //           .fire({
  //             icon: "success",
  //             text: "Details Saved Successfully",
  //             confirmButtonColor: "#0079CE",
  //           })
  //           .then((result) => {
  //             if (result.isConfirmed) {
  //               Navigate("/retail/home");
  //             }
  //           });
  //       }
  //     });
  //   } else {
  //     const proposalNo = objectPath.get(dto, "FormatedData.ProposalNumber");
  //     const obj1 = {
  //       Stage: "Proposal",
  //       Status: "323",
  //       workFlowId: "81",
  //       WorkFlowType: "Branch Manager",
  //     };
  //     await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj1);
  //     const a = {
  //       Stage: "Proposal",
  //       Status: "323",
  //       WorkFlowType: "Agent",
  //       wfstageStatusId: "322",
  //     };
  //     await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj1);
  //     await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);

  //     SavehandleModalClose();
  //     swal
  //       .fire({
  //         html: `<div> <img src=${Success} alt="success"><br>Debit Note Saved Successfully</br></div>`,
  //         confirmButtonColor: "#0079CE",
  //       })
  //       .then((result) => {
  //         if (result.isConfirmed) {
  //           Navigate("/retail/home");
  //         }
  //       });
  //   }
  // };
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
      Class = 340;
    }
    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      Class = 341;
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
      if (result.status === 200) {
        generateFile(result.data, proposalNo);
      }
    });
    if (key === "SAVE DEBIT NOTE") {
      onSaveModalClose();
    }
  };

  useEffect(() => {
    newSearchInput = "";
    setSearchInput(newSearchInput);
    if (genericPolicyDto) {
      if (
        objectPath.get(dto, "PolicyStartDate") !== "" &&
        objectPath.get(dto, "PolicyStartDate") !== undefined &&
        objectPath.get(dto, "NumberofDays") !== "" &&
        objectPath.get(dto, "NumberofDays") !== undefined
      ) {
        objectPath.set(
          dto,
          "NumberofDays",
          NumberofDaysinYear(objectPath.get(dto, "PolicyStartDate").split("/")[2])
        );
        objectPath.set(
          dto,
          "PolicyEndDate",
          addDays1(objectPath.get(dto, "PolicyStartDate"), objectPath.get(dto, "NumberofDays"))
        );
        setGenericPolicyDto(dispatch, dto);
      }
      if (objectPath.get(dto, "PolicyStartDate") === "") {
        objectPath.set(dto, "PolicyEndDate", "");
        setGenericPolicyDto(dispatch, dto);
      }

      if (objectPath.get(dto, "InsurableItem.0.RiskItems.0.IsBirdPurchased") === "No") {
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.PurchasedDate", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.PurchaseAmount", "");
        setGenericPolicyDto(dispatch, dto);
      }
      if (activeStep === 0) {
        objectPath.set(
          dto,
          "InsurableItem.0.RiskItems.0.NumberofBirdorChicken",
          objectPath.get(dto, "Temp.DataGridValues.0.NumberofBirdorChicken")
        );
        objectPath.set(
          dto,
          "InsurableItem.0.RiskItems.0.SumInsured",
          objectPath.get(dto, "Temp.DataGridValues.0.SumInsured")
        );
        objectPath.set(
          dto,
          "InsurableItem.0.RiskItems.0.Premium Amount",
          objectPath.get(dto, "Temp.DataGridValues.0.Premium Amount")
        );
        setGenericPolicyDto(dispatch, dto);
      }

      // vacDocs = dto.InsurableItem[0].VaccinationOtherDocuments;
      // setGenericPolicyDto(dispatch, dto);

      if (
        activeStep === 0 &&
        objectPath.get(dto, "Temp.DataGridValues.0.NumberofBirdorChicken") === undefined
      ) {
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.NumberofBirdorChicken", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.SumInsured", "");
        objectPath.set(dto, "InsurableItem.0.RiskItems.0.Premium Amount", "");
        setGenericPolicyDto(dispatch, dto);
      }

      const NOO = objectPath.get(dto, "OwnerAccidentalDetails.NumberofOwnersPartners");
      if (NOO !== undefined && NOO !== "") {
        const TASI = parseInt(NOO, 10) * 200000;
        objectPath.set(dto, "OwnerAccidentalDetails.TotalAccidentalSumInsured", TASI.toString());
        objectPath.set(
          dto,
          "FormatedData.CalculatedPremiumDetails.TotalAccidentalSumInsured",
          formater.format(TASI.toString())
        );
      } else {
        objectPath.set(dto, "OwnerAccidentalDetails.TotalAccidentalSumInsured", "");
      }

      if (
        objectPath.get(dto, "TotalNumberBirdorChicken") === "" &&
        objectPath.get(dto, "TotalSumInsured") === ""
      ) {
        objectPath.set(dto, "Temp.UploadData", "");
        setGenericPolicyDto(dispatch, dto);
        newSearchInput = "";
        setSearchInput(newSearchInput);
      }
      if (objectPath.get(dto, "Temp.Upload") === "" && newSearchInput === "") {
        objectPath.set(dto, `TotalNumberBirdorChicken`, "");
        objectPath.set(dto, "TotalSumInsured", "");
        dto.Temp.UploadData = "";
        setSearchInput(newSearchInput);
        setGenericPolicyDto(dispatch, dto);
      }
      if (
        newSearchInput !== "" &&
        objectPath.get(dto, "Temp.UploadData") !== "" &&
        objectPath.get(dto, "Temp.Upload.0.SumInsured") === ""
      ) {
        newSearchInput = "";
        setSearchInput(newSearchInput);
        objectPath.set(dto, "Temp.UploadData", "");
        setGenericPolicyDto(dispatch, dto);
      }
      if (objectPath.get(dto, "Temp.UploadData") === "") {
        objectPath.set(dto, `TotalNumberBirdorChicken`, "");
        objectPath.set(dto, "TotalSumInsured", "");
        dto.Temp.Upload = "";
        setSearchInput(newSearchInput);
        setGenericPolicyDto(dispatch, dto);
      }
      // if (rowSelectionModel !== "") {
      //   setisDisable(true);
      // } else {
      //   setisDisable(false);
      // }
      // console.log("pppp", rowSelectionModel);

      if (
        dto.InsurableItem[0].RiskItems[0].IsBirdPurchased === "Yes" &&
        dto.InsurableItem[0].RiskItems[0].PurchaseAmount !== "" &&
        dto.InsurableItem[0].RiskItems[0].PurchasedDate !== "" &&
        dto.InsurableItem[0].RiskItems[0].NumberofBirdorChicken !== "" &&
        dto.InsurableItem[0].RiskItems[0].PurposeofUsage !== "" &&
        dto.InsurableItem[0].RiskItems[0].Category !== "" &&
        dto.InsurableItem[0].RiskItems[0].BreedCasteVariety !== "" &&
        dto.InsurableItem[0].RiskItems[0].FarmingType !== "" &&
        dto.InsurableItem[0].RiskItems[0].CurrentHealthStatus !== "" &&
        dto.InsurableItem[0].RiskItems[0].SumInsured !== ""
      ) {
        setIsLoading(false);
      } else if (
        dto.InsurableItem[0].RiskItems[0].IsBirdPurchased === "No" &&
        dto.InsurableItem[0].RiskItems[0].NumberofBirdorChicken !== "" &&
        dto.InsurableItem[0].RiskItems[0].PurposeofUsage !== "" &&
        dto.InsurableItem[0].RiskItems[0].Category !== "" &&
        dto.InsurableItem[0].RiskItems[0].BreedCasteVariety !== "" &&
        dto.InsurableItem[0].RiskItems[0].FarmingType !== "" &&
        dto.InsurableItem[0].RiskItems[0].CurrentHealthStatus !== "" &&
        dto.InsurableItem[0].RiskItems[0].SumInsured !== ""
      ) {
        setIsLoading(false);
      }

      const InsuredType = objectPath.get(dto, "ProposerDetails.InsuredType");
      if (InsuredType === "Government body" || InsuredType === "Individual") flag.Pan = false;
      //  || InsuredType === "Club/NGO"
      else flag.Pan = true;
      if (InsuredType === "Individual") {
        flag.Maritalstatus = true;
        flag.dob = true;
      } else {
        flag.Maritalstatus = false;
        flag.dob = false;
      }
      // else {
      //   flag.Individual = false;
      // }

      if (objectPath.get(dto, "FinancingType") === "Direct") {
        // objectPath.set(dto, "CountOfBranchDetails", "1");
        // objectPath.del(dto, `Bankdetails.BranchDetails`, dto.Bankdetails.BranchDetails.length > 0);
        objectPath.set(dto, `Bankdetails.BranchDetails`, [BranchJson]);
      }
      if (
        objectPath.get(dto, "Temp.DataGridValues") !== undefined ||
        objectPath.get(dto, "Temp.DataGridValues") !== ""
      ) {
        const TempData = [
          {
            NumberofBirdorChicken: objectPath.get(
              dto,
              "Temp.DataGridValues.0.NumberofBirdorChicken"
            ),
            SumInsured: objectPath.get(dto, "Temp.DataGridValues.0.SumInsured"),
            "Premium Amount": objectPath.get(dto, "Temp.DataGridValues.0.Premium Amount"),
            "Rate(%)": objectPath.get(dto, "Temp.DataGridValues.0.Rate(%)"),
            rowID: 1,
          },
        ];
        objectPath.set(dto, "Temp.DataGridValues", TempData);
      }
      setGenericPolicyDto(dispatch, dto);
      topDto = dto;
      topDispatch = dispatch;
      setFlag({ ...flag });
      setGenericPolicyDto(dispatch, dto);
    }
  }, [genericPolicyDto]);

  const [resetCount, setResetCount] = useState(0);

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
      });
    }
    if (masters.State.length === 0) {
      const b = await GetProdPartnermasterData("State", {});
      masters.State = b.data;
    }
    const Details = objectPath.get(dto, "ProductCode"); //  Details
    if (Details === undefined || Details === "") {
      dto = PoultryJson();
      if (process.env.REACT_APP_AutoPopulateCustomerDetails === "true") {
        dto.FinancingType = "Direct";
        objectPath.set(dto, "InsuredTypeCode", "BAN");
        dto.ProposerDetails = InsuredDetails;
        objectPath.set(dto, "ProposerDetails.AgriTechnicianName", "Agri Technician Name");
        objectPath.set(dto, "ProposerDetails.AgriTechnicianAddress", "Agri Technician Address");
        objectPath.set(dto, "ProposerDetails.PolicyRiskCategory", "Low");
      }

      objectPath.set(dto, "ProductCode", "NepalAgriLivestockPoultry");
      topGenericInfo = { ...genericInfo };
      setGenericPolicyDto(dispatch, dto);
    }

    const QuoteDetails = objectPath.get(dto, "Class");
    if (QuoteDetails === undefined || QuoteDetails === "") {
      objectPath.set(dto, "DocType", "Fresh");
      objectPath.set(dto, "Department", "Agriculture");
      if (genericInfo.Flow === undefined || genericInfo.Flow === "") {
        m.SubClass = m.SubClass.filter((x) => x.mValue === genericInfo.SubClass);
        objectPath.set(dto, "Class", genericInfo.Class);
        console.log("m", m.SubClass);
        objectPath.set(dto, "SubClass", m.SubClass[0].mValue);
        m.SubClassShortCode = m.SubClass[0].ShortCode;
        objectPath.set(dto, "Product", "Poultry");
        objectPath.set(dto, "activeStep", 6);
        objectPath.set(
          dto,
          "prodlabel",
          `Agri Insurance / ${genericInfo.Class} / ${m.SubClass[0].mValue}`
        );
      }
      if (
        objectPath.get(dto, "Temp.DataGridValues") === undefined ||
        objectPath.get(dto, "Temp.DataGridValues") === ""
      ) {
        const TempData = [
          {
            NumberofBirdorChicken: objectPath.get(
              dto,
              "Temp.DataGridValues.0.NumberofBirdorChicken"
            ),
            SumInsured: objectPath.get(dto, "Temp.DataGridValues.0.SumInsured"),
            "Premium Amount": objectPath.get(dto, "Temp.DataGridValues.0.Premium Amount"),
            "Rate(%)": objectPath.get(dto, "Temp.DataGridValues.0.Rate(%)"),
            rowID: 1,
          },
        ];
        objectPath.set(dto, "Temp.DataGridValues", TempData);
      }
    }

    const Customer = objectPath.get(dto, "ProposerDetails.KYCCategory"); // Customer Details
    if (Customer === undefined || Customer === "") {
      objectPath.set(dto, "ProposerDetails.KYCCategory", "Insured");
      objectPath.set(dto, "ProposerDetails.IsBeneficiaryOwner", "No");
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

    const rf = objectPath.get(dto, "Channel.FiscalYear");
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
      objectPath.set(
        dto,
        "Channel.FiscalYear",
        curY1.toString().slice(2, 4).concat("/", curY2.toString().slice(2, 4))
      );
      setGenericPolicyDto(dispatch, dto);
    }
    setGenericPolicyDto(dispatch, dto);

    if (genericInfo.Flow && genericInfo.Flow !== undefined) {
      flag.Flow = true;
    } else {
      flag.Flow = false;
    }

    // setSearchInput("");
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
            label: "Doc Type",
            visible: true,
            value: "DocType",
            disableOnReset: true,
            required: true,
            disabled: true,
            options: masters.DocType,
          },
          {
            type: "Input",
            label: "Department",
            visible: true,
            disableOnReset: true,
            required: true,
            value: "Department",
            disabled: true,
          },
          {
            type: "Input",
            required: true,
            label: "Class",
            visible: true,
            value: "Class",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            required: true,
            label: "Sub-Class",
            visible: true,
            value: "SubClass",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            value: "PolicyStartDate",
            // disableOnReset: true,
            dateFormat: "m/d/Y",
            minDate: PolicyStartDateMinDate(),
            maxDate: PolicyStartDateMaxDate(),
            // customOnChange: (e, d) => PolicyStartDate(e, d),
          },
          {
            type: "Input",
            required: true,
            label: "Number of days",
            visible: true,
            value: "NumberofDays",
            disableOnReset: true,
            disabled: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            visible: true,
            value: "PolicyEndDate",
            disabled: true,
            dateFormat: "m/d/Y",
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Business Type",
            visible: true,
            value: "BusinessType",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 2,
            return: (
              <Stack direction="row" spacing={2}>
                <Typography>
                  <strong>Type of Poultry</strong>
                </Typography>
              </Stack>
            ),
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            disableOnReset: true,
            radioLabel: { label: "" },
            radioList: [
              { value: "Broiler", label: "Broiler" },
              { value: "NonBroiler", label: "Non Broiler" },
            ],
            value: "InsurableItem.0.RiskItems.0.TypeofPoultry",
            spacing: 10,
          },
        ],
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowId: "rowID",
            rowHeight: 70,
            // disableOnReset: true,
            columns: [
              {
                field: "NumberofBirdorChicken",
                headerName: "Number Of Bird/Chicken",
                width: 250,
                disableColumnMenu: true,
                sortable: false,
                renderCell: (param) => (
                  <MDInput
                    name="NumberofBirdorChicken"
                    value={param.row.NumberofBirdorChicken}
                    error={flag.NumberofBird === true}
                    helperText={
                      flag.NumberofBird === true ? "Accept only Numbers greater then Zero" : ""
                    }
                    onChange={(e) => handleDataGrid(e, param)}
                    onBlur={handleDataGridRegVal}
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
                    error={flag.SumInsuredVal === true}
                    helperText={
                      flag.SumInsuredVal === true ? "Accept only Numbers greater then Zero" : ""
                    }
                    onChange={(e) => handleDataGrid(e, param)}
                    onBlur={handleDataGridRegVal}
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
            required: true,
            name: "NumberofOwnersPartners",
            // disableOnReset: true,
            onChangeFuncs: [IsNumeric1],
            onBlurFuncs: [IsNumeric1],
            // customOnChange: (e) => handleNumberofOwnersPartners(e),
          },
          {
            type: "Input",
            label: "Personal Accidental SI (Per Person)",
            value: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
            visible: true,
            required: true,
            disableOnReset: true,
            disabled: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Accidental Premium(Per Person)",
            value: "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
            visible: true,
            disabled: true,
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
            required: true,
            label: "Total Accidental Sum Insured",
            value: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
            visible: true,
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Total Accidental Premium",
            visible: true,
            disabled: true,
            value: "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
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
            required: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            value: "PolicyEndDate",
            disableOnReset: true,
            required: true,
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
            customOnChange: (e, a) => handleBanknoBank(e, a),
          },
          {
            type: "AutoComplete",
            label: "Bank Category",
            required: true,
            visible: true,
            value: "Bankdetails.BankCategory",
            options: masters.BankCategory.filter(
              (x) =>
                (dto.Bankdetails.BankorNonBank === "Bank" && x.description !== "Non-Bank") ||
                (dto.Bankdetails.BankorNonBank === "Non-Bank" && x.description === "Non-Bank")
            ),
            customOnChange: (e, a) => handleBankCategory(e, a, "BankCategory"),
          },
          {
            type: "AutoComplete",
            label: "Bank/Financial Institution Name(English)",
            required: true,
            visible: true,
            value: "Bankdetails.BankorFinancialInstituionNameinEnglish",
            options:
              dto.Bankdetails.BankCategory !== ""
                ? masters.BankorFinancialInstituionNameinEnglish
                : [],
            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
          },
          {
            type: "Input",
            label: "Bank/Financial Institution Name(Nepali)",
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
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsMobileNumber],
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
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            value: "Bankdetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            // maxLength: 9,
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
            label: "CEO Name",
            visible: true,
            value: "Bankdetails.CEO",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            value: "Bankdetails.Country",
            options: masters.Country,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            disabled: true,
            value: "Bankdetails.ProvinceorState",
            options: masters.State,
            customOnChange: (e, a) => onPlaceSelect(e, a, "State1"),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            disabled: true,
            value: "Bankdetails.District",
            options: masters.District1,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District1"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            disabled: true,
            value: "Bankdetails.Municipality",
            options: masters.Municipality1,
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
            disabled: true,
            name: "AddressEnglishBank",
            value: "Bankdetails.AddressEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            // required: true,
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
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
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
            label: "Name",
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
            value: "RiskAddressDetails.Occupation",
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
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "KYC Category",
            required: true,
            visible: true,
            value: "ProposerDetails.KYCCategory",
            options: masters.KYCCategory,
          },
          {
            type: "AutoComplete",
            label: "Insured Type",
            required: true,
            visible: true,
            value: "ProposerDetails.InsuredType",
            options: masters.InsuredType,
            customOnChange: (e, a) => handleInssuingbranch(e, a, "InsuredType"),
          },
          {
            type: "Input",
            label: "Special Client",
            visible: true,
            disableOnReset: true,
            value: "ProposerDetails.SpecialClient",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Insured Name-English",
            visible: true,
            required: true,
            value: "ProposerDetails.InsuredNameEnglish",
            name: "InsuredNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Insured Name-Nepali",
            visible: true,
            // required: true,
            value: "ProposerDetails.InsuredNameNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "KYC Classification",
            visible: true,
            value: "ProposerDetails.KYCClassification",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "AutoComplete",
            label: "KYC Risk Category",
            visible: true,
            required: true,
            value: "ProposerDetails.KYCRiskCategory",
            options: masters.KYCRiskCategory,
          },
          {
            type: "AutoComplete",
            label: "Is Beneficiary Owner",
            visible: true,
            value: "ProposerDetails.IsBeneficiaryOwner",
            options: masters.IsBeneficiaryOwner,
          },
          {
            type: "AutoComplete",
            label: "Occupation",
            required: true,
            visible: true,
            value: "ProposerDetails.Occupation",
            options: masters.Occupation,
          },
          {
            type: "AutoComplete",
            label: "Income Source",
            required: true,
            visible: true,
            value: "ProposerDetails.IncomeSource",
            options: masters.IncomeSource,
          },
          {
            type: "Input",
            label: "Contact Person Name",
            visible: true,
            value: "ProposerDetails.ContactPersonName",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Email Address",
            visible: true,
            value: "ProposerDetails.EmailId",
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            required: flag.Pan,
            visible: true,
            value: "ProposerDetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            // maxLength: 9,
          },
          {
            type: "Input",
            label: "VAT Number",
            visible: true,
            value: "ProposerDetails.VATNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            maxLength: 9,
          },
          {
            type: "Input",
            label: "Registration Number",
            visible: true,
            value: "ProposerDetails.RegistrationNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Registration Date",
            visible: true,
            value: "ProposerDetails.RegistrationDate",
          },
          {
            type: "MDDatePicker",
            label: "Registration Close Date",
            visible: true,
            value: "ProposerDetails.RegisterationCloseDate",
            minDate: objectPath.get(dto, "ProposerDetails.RegistrationDate"),
          },
          {
            type: "Input",
            label: "Registration Office",
            visible: true,
            value: "ProposerDetails.RegistrationOffice",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Reference Insured Name",
            visible: true,
            value: "ProposerDetails.ReferenceInsuredName",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            // required: true,
            visible: true,
            value: "ProposerDetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            onBlurFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
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
            value: "ProposerDetails.TDSCategory",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            options: masters.Country,
            InputProps: { readOnly: true },
            disabled: true,
            disableOnReset: true,
            value: "ProposerDetails.Country",
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            value: "ProposerDetails.ProvinceState",
            options: masters.State,
            customOnChange: (e, a) => onPlaceSelect(e, a, "State3"),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            value: "ProposerDetails.District",
            options: masters.District3,
            customOnChange: (e, a) => onPlaceSelect(e, a, "District3"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            required: true,
            visible: true,
            value: "ProposerDetails.Municipality",
            options: masters.Municipality3,
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            options: masters.WardNumber,
            value: "ProposerDetails.WardNumber",
          },
          {
            type: "Input",
            label: "Address(English)",
            required: true,
            visible: true,
            name: "AddressEnglish2",
            value: "ProposerDetails.PermanentAdrress.AddressEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            // required: true,
            value: "ProposerDetails.PermanentAdrress.AddressNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            // required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            value: "ProposerDetails.Area",
          },
          {
            type: "Input",
            label: "Tole/streetName",
            visible: true,
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            value: "ProposerDetails.ToleStreetName",
          },
          {
            type: "Input",
            label: "House No",
            name: "Seats",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            value: "ProposerDetails.HouseNumber",
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
            value: "ProposerDetails.PlotNumber",
          },
          {
            type: "Input",
            label: "Temporary Address-English",
            visible: true,
            name: "TemporaryAddressEnglish",
            value: "ProposerDetails.TemporaryAddressEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Temporary Address-Nepali",
            visible: true,
            value: "ProposerDetails.TemporaryAddressNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
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
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <Stack rowGap={2}>
                {objectPath.get(dto, "documentDetails").map((item, index) => (
                  <Grid container columnSpacing={2}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Document Name"
                        name="DocName"
                        value={item.DocName}
                        onChange={(e) => handleDocName(e, index)}
                        onBlur={(e) => handleDublicateDoc(e, item.DocName, index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <MDButton variant="outlined" component="label">
                        Upload{" "}
                        <input
                          hidden
                          accept="image/bmp, image/jpeg, image/png, .pdf"
                          type="file"
                          onChange={(e) => handleFileUpload(e, index)}
                        />
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <Typography sx={{ fontSize: "15px", paddingTop: 1 }}>
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
            type: "TypographyVal",
            value: "ProposerDetails.PermanentAdrress.ProfilePicture",
            visible: true,
            sx: { fontSize: "15px", paddingTop: 1 },
            // spacing: 2,
          },
          {
            type: "Custom",
            visible: true,
            // spacing: 0.5,
            return:
              objectPath.get(dto, "ProposerDetails.PermanentAdrress.ProfilePicture") !== "" &&
              objectPath.get(dto, "ProposerDetails.PermanentAdrress.ProfilePicture") !==
                undefined ? (
                <CancelIcon onClick={onCancelClickProfilePicture} />
              ) : null,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },
          {
            type: "AutoComplete",
            label: "Gender(English)",
            required: true,
            visible: true,
            value: "ProposerDetails.GenderEnglish",
            name: "GenderEnglish",
            options: GenderNepali,
            customOnBlur: onBlurTransliteration,
            customOnChange: (e, a) => handleGender(e, a, "GenderEnglish"),
          },
          {
            type: "Input",
            label: "Gender(Nepali)",
            visible: true,
            value: "ProposerDetails.GenderNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "AutoComplete",
            label: "Marital Status(English)",
            visible: true,
            required: true,
            name: "MaritalStatusEnglish",
            value: "ProposerDetails.MaritalStatusEnglish",
            options: MaritalStatus,
            customOnChange: (e, a) => handleMarital(e, a, "MaritalStatusEnglish"),
          },
          {
            type: "Input",
            label: "Marital Status(Nepali)",
            visible: true,
            // required: true,
            value: "ProposerDetails.MaritalStatusNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Husband Name(English)",
            visible: true,
            name: "HusbandNameEnglish",
            value: "ProposerDetails.HusbandNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            customOnBlur: (e, c, EF, ET) => onBlurTransliteration(e, c + 1, EF, ET),
          },
          {
            type: "Input",
            label: "Husband Name(Nepali)",
            visible: true,
            value: "ProposerDetails.HusbandNameNepali",
            // onChangeFuncs: [IsAlphaSpace],
            disabled: true,
            InputProps: {
              readOnly: true,
            },
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
            // customOnBlur: (e, c, EF, ET) => onBlurTransliteration(e, c + 1, EF, ET),
          },
          {
            type: "Input",
            label: "Wife Name(Nepali)",
            visible: true,
            value: "ProposerDetails.WifeNameNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Father Name(English)",
            required: true,
            visible: true,
            name: "FatherNameEnglish1",
            value: "ProposerDetails.FatherNameEnglish",
            customOnBlur: (e, c, EF, ET) => onBlurTransliteration(e, c + 1, EF, ET),
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Father Name(Nepali)",
            visible: true,
            // required: true,
            value: "ProposerDetails.FatherNameNepali",
            //  onChangeFuncs: [IsAlphaSpace],
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "GrandFather Name(English)",
            visible: true,
            required: true,
            name: "GrandfatherNameEnglish12",
            value: "ProposerDetails.GrandfatherNameEnglish",
            customOnBlur: (e, c, EF, ET) => onBlurTransliteration(e, c + 1, EF, ET),
            // customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "GrandFather Name(Nepali)",
            visible: true,
            // required: true,
            value: "ProposerDetails.GrandfatherNameNepali",
            // onChangeFuncs: [IsAlphaSpace],
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Nationality(English)",
            visible: true,
            value: "ProposerDetails.NationalityEnglish",
            customOnBlur: (e, c, EF, ET) => onBlurTransliteration(e, c + 1, EF, ET),
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Permanent Address(English)",
            visible: true,
            name: "AddressEnglish31",
            value: "ProposerDetails.PermanentAddEnglish",
            customOnBlur: (e, c, EF, ET) => onBlurTransliteration(e, c + 1, EF, ET),
            // customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Permanent Address(Nepali)",
            visible: true,
            value: "ProposerDetails.PermanentAddNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Town(English)",
            visible: true,
            name: "TownEnglish",
            value: "ProposerDetails.PermanentAdrress.TownEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Town(Nepali)",
            visible: true,
            value: "ProposerDetails.PermanentAdrress.TownNepali",
            // onChangeFuncs: [IsAlphaNumSpace],
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "City(English)",
            visible: true,
            name: "CityEnglish",
            value: "ProposerDetails.PermanentAdrress.CityEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "City(Nepali)",
            visible: true,
            value: "ProposerDetails.PermanentAdrress.CityNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
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
            InputProps: {
              readOnly: true,
            },
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
            InputProps: {
              readOnly: true,
            },
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
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Issue District",
            visible: true,
            required: true,
            value: "ProposerDetails.IssueDistrict",
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
            maxDate: new Date(),
            disableOnReset: true,
            customOnChange: (e, d) => onDOBselect(e, d),
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
          },

          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            value: "ProposerDetails.PassportNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            // maxLength: 8,
          },
          {
            type: "MDDatePicker",
            label: "Passport Issued Date",
            visible: true,
            name: "mPStartDate",
            value: "ProposerDetails.PassportIssuedDate",
            maxDate: new Date(),
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
          //   onBlurFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Income Source",
          //   visible: true,
          //   value: "ProposerDetails.InsuredIncomeSource",
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   onBlurFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Citizenship Number",
          //   visible: true,
          //   value: "InsurableItem.0.RiskItems.0.KYCDetails.InsuredDetails.CitizenshipNumber",
          //   onChangeFuncs: [IsAlphaNum],
          // },
        ],
        [
          {
            type: "Input",
            label: "Name of the Organization",
            visible: true,
            InputProps: { readOnly: true },
            disableOnReset: true,
            disabled: true,
            // value: "ProposerDetails.NameoftheOrganisation",
            value: "ProposerDetails.InsuredNameEnglish",
          },
          {
            type: "Input",
            label: "Address of the Organization",
            visible: true,
            disableOnReset: true,
            // value: "ProposerDetails.OrganisationAddress",
            value: "ProposerDetails.PermanentAdrress.AddressEnglish",
            disabled: true,
          },
          {
            type: "Input",
            label: "Organization Phone Number",
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
            InputProps: {
              readOnly: true,
            },
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
            // onChangeFuncs: [IsAlphaNumSpace],
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "AutoComplete",
            label: "Gender (English)",
            visible: true,
            value: "ProposerDetails.GenderEnglish",
            options: GenderNepali,
            name: "GenderEnglish1",
            customOnBlur: onBlurTransliteration,
            customOnChange: (e, a) => handleGender(e, a, "GenderEnglish1"),
          },
          {
            type: "Input",
            label: "Gender (Nepali)",
            visible: true,
            value: "ProposerDetails.GenderNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "AutoComplete",
            label: "Martial Status (English)",
            visible: true,
            required: flag.Maritalstatus,
            name: "MaritalStatusEnglish1",
            value: "ProposerDetails.MaritalStatusEnglish",
            options: MaritalStatus,
            customOnChange: (e, a) => handleMarital(e, a, "MaritalStatusEnglish1"),
          },
          {
            type: "AutoComplete",
            label: "Martial Status (Nepali)",
            // required: true,
            visible: true,
            // required: true,
            value: "ProposerDetails.MaritalStatusNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Husband's Name(English)",
            visible: true,
            name: "HusbandNameEnglish1",
            //    customOnBlur: onBlurTransliteration,
            value: "ProposerDetails.HusbandNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Husband's Name(Nepali)",
            visible: true,
            value: "ProposerDetails.HusbandNameNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
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
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Father Name (English)",
            visible: true,
            //   customOnBlur: onBlurTransliteration,
            name: "FatherNameEng",
            value: "ProposerDetails.FatherNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Father Name (Nepali)",
            visible: true,
            value: "ProposerDetails.FatherNameNepali",
            disabled: true,
            InputProps: {
              readOnly: true,
            },
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
            label: "GrandFather Name  (Nepali)",
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
            name: "AddressEnglish3",
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
            onBlurFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Town (Nepali)",
            visible: true,
            value: "ProposerDetails.PermanentAdrress.TownNepali",
            //  onChangeFuncs: [IsAlphaSpace],disabled: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "City (English)",
            name: "CityEnglish1",
            visible: true,
            value: "ProposerDetails.PermanentAdrress.CityEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "City (Nepali)",
            visible: true,
            value: "ProposerDetails.PermanentAdrress.CityNepali",
            // onChangeFuncs: [IsAlphaSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Temporory Address (English)",
            visible: true,
            name: "TempAddresEnglish1",
            value: "ProposerDetails.CommunicationAddress.TempAddresEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Temporory Address (Nepali)",
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
            // required: true,
            //  required: flag.Individual,
            value: "ProposerDetails.CitizenshipNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Citizenship Issued Date",
            //  required: flag.Individual,
            visible: true,
            // required: true,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            value: "ProposerDetails.CitizenshipIssuedDate",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
            maxDate: new Date(),
          },
          {
            type: "AutoComplete",
            label: "Citizenship Issue District",
            //   required: flag.Individual,
            altFormat: "y - m - d",
            visible: true,
            // required: true,
            value: "ProposerDetails.IssueDistrict",
            options: masters.District,
            // customOnChange: (e, d) => onDOBselect(e, d),
          },
          {
            type: "MDDatePicker",
            //   required: flag.Individual,
            label: "Date Of Birth",
            required: flag.dob,
            visible: true,
            altFormat: "Y-m-d",
            dateFormat: "Y-m-d",
            value: "ProposerDetails.DoB",
            maxDate: new Date(),
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
            value: "ProposerDetails.PassportIssuedBy",
          },
          {
            type: "Input",
            label: "Passport Number",
            visible: true,
            value: "ProposerDetails.PassportNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Passport Issued Date",
            visible: true,
            value: "ProposerDetails.PassportIssuedDate",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
            maxDate: new Date(),
          },
          {
            type: "MDDatePicker",
            label: "Passport Expiry Date",
            visible: true,
            value: "ProposerDetails.PassportExpiryDate",
            minDate: objectPath.get(dto, "ProposerDetails.PassportIssuedDate"),
            disabled: objectPath.get(dto, "ProposerDetails.PassportIssuedDate") === "",
          },
          // {
          //   type: "Typography",
          //   visible: objectPath.get(dto, "ProposerDetails.InsuredType") === "Individual",
          //   label: "",
          //   spacing: 3,
          // },

          {
            type: "Input",
            label: "License Number",
            visible: true,
            value: "ProposerDetails.LicenseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            spacing: 3,
          },
          // {
          //   type: "Input",
          //   label: "Occupation",
          //   visible: objectPath.get(dto, "ProposerDetails.InsuredType") !== "Individual",
          //   value: "ProposerDetails.Occuptation",
          //   onChangeFuncs: [IsAlphaNoSpace],
          //   onBlurFuncs: [IsAlphaNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Income Source",
          //   visible: objectPath.get(dto, "ProposerDetails.InsuredType") !== "Individual",
          //   // value: "ProposerDetails.InsuredIncomeSource",
          //   value: "ProposerDetails.IncomeSource",
          //   disabled: true,
          //   onChangeFuncs: [IsAlphaNumNoSpace],
          //   onBlurFuncs: [IsAlphaNumNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Phone Number",
          //   visible: true,
          //   value: "ProposerDetails.PhoneNumber",
          //   onChangeFuncs: [IsNumaricSpecialNoSpace],
          //   onBlurFuncs: [IsNumaricSpecialNoSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Mobile Number",
          //   visible: objectPath.get(dto, "ProposerDetails.InsuredType") !== "Individual",
          //   value: "ProposerDetails.MobileNumber",
          //   onChangeFuncs: [IsNumeric],
          //   onBlurFuncs: [IsMobileNumber],
          //   InputProps: { maxLength: 10 },
          // },
          // {
          //   type: "Input",
          //   label: "Email ID",
          //   visible: objectPath.get(dto, "ProposerDetails.InsuredType") !== "Individual",
          //   value: "ProposerDetails.Email",
          //   onBlurFuncs: [IsEmail],
          // },
          {
            type: "AutoComplete",
            label: "Status",
            visible: true,
            value: "ProposerDetails.Status",
            options: masters.Status,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "MDDatePicker",
            label: "Appoint Date",
            visible: true,
            value: "ProposerDetails.AppointDate",
          },
          {
            type: "Typography",
            label: "",
            visible: true,
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
            type: "TypographyVal",
            value: "ProposerDetails.PermanentAdrress.ProfilePicture",
            visible: true,
            sx: { fontSize: "15px", paddingTop: 1 },
            spacing: 5,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 1,
            return:
              objectPath.get(dto, "ProposerDetails.PermanentAdrress.ProfilePicture") !== "" &&
              objectPath.get(dto, "ProposerDetails.PermanentAdrress.ProfilePicture") !==
                undefined ? (
                <CancelIcon onClick={onCancelClickProfilePicture} />
              ) : null,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
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
            disabled: true,
            value: "ProposerDetails.CareofNameNepali",
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            disabled: true,
            value: "ProposerDetails.CareofAddressNepali",
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
            onBlurFuncs: [IsAlphaNoSpace],
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
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Type",
            visible: true,
            value: "ProposerDetails.PolicyRiskType",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Category",
            visible: true,
            required: true,
            value: "ProposerDetails.PolicyRiskCategory",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Agri Technician Name",
            required: true,
            visible: true,
            value: "ProposerDetails.AgriTechnicianName",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Agri Technician Address",
            visible: true,
            required: true,
            value: "ProposerDetails.AgriTechnicianAddress",
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
            type: "Custom",
            visible: true,
            spacing: 3,
            return: (
              <Stack direction="row" spacing={1}>
                <Typography>
                  <strong>Is Bird/Chicken Purchased?</strong>
                </Typography>
              </Stack>
            ),
          },
          {
            type: "RadioGroup",
            visible: true,
            disableOnReset: true,
            radioLabel: { label: " ", labelVisible: true }, //  IsBirdPurchased
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            value: "InsurableItem.0.RiskItems.0.IsBirdPurchased",
            spacing: 3,
            name: "IsBirdPurchased",
            // customOnChange: IsBirdPurchased1(),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Purchase Date",
            visible: objectPath.get(dto, "InsurableItem.0.RiskItems.0.IsBirdPurchased") === "Yes",
            altFormat: "d-m-Y",
            dateFormat: "d-m-Y",
            name: "PurchasedDate",
            value: "InsurableItem.0.RiskItems.0.PurchasedDate",
            disableValidationOnProceed: true,
            errCount,
            error:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.PurchasedDate") === "",
            errtext:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.PurchasedDate") === ""
                ? helperText
                : "",
          },
          {
            type: "Input",
            visible: objectPath.get(dto, "InsurableItem.0.RiskItems.0.IsBirdPurchased") === "Yes",
            required: true,
            value: "InsurableItem.0.RiskItems.0.PurchaseAmount",
            label: "Purchase Amount",
            name: "PurchaseAmount",
            disableValidationOnProceed: true,
            errCount,
            error:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.PurchaseAmount") === "",
            errtext:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.PurchaseAmount") === ""
                ? helperText
                : "",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
          },
          {
            type: "Typography",
            label: "",
            visible: flag.IsBirdNotPurchased,
            spacing: 6,
          },
          {
            type: "Input",
            label: "Batch Number",
            visible: true,
            name: "BatchNumber",
            value: "InsurableItem.0.RiskItems.0.BatchNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.NumberofBirdorChicken",
            label: "Number of Bird/Chicken",
            name: "NumberofBirdorChicken",
            disableValidationOnProceed: true,
            error:
              ErrorFlag &&
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.NumberofBirdorChicken") === "",
            errtext:
              ErrorFlag &&
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.NumberofBirdorChicken") === ""
                ? helperText
                : "",
            errCount,
            onChangeFuncs: [IsNumeric1],
            onBlurFuncs: [IsNumeric1],
          },
          {
            type: "Input",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.PurposeofUsage",
            label: "Purpose of Usage",
            name: "PurposeofUsage",
            disableValidationOnProceed: true,
            error:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.PurposeofUsage") === "",
            errtext:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.PurposeofUsage") === ""
                ? helperText
                : "",
            errCount,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.NameofBirdorChicken",
            label: "Name of Bird/Chicken",
            name: "NameofBirdorChicken",
            onChangeFuncs: [IsAlphaNumSpace],
            onBlurFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.Category",
            label: "Category",
            name: "Category",
            disableOnReset: true,
            disabled: true,
            disableValidationOnProceed: true,
            error: ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.Category") === "",
            errtext:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.Category") === ""
                ? helperText
                : "",
            errCount,
            onChangeFuncs: [IsAlphaNumSpace],
            onBlurFuncs: [IsAlphaNumSpace],
          },
          {
            type: "Input",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.BreedCasteVariety",
            label: "Breed/Caste/Variety",
            name: "BreedCasteVariety",
            disableValidationOnProceed: true,
            errCount,
            error:
              ErrorFlag &&
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.BreedCasteVariety") === "",
            errtext:
              ErrorFlag &&
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.BreedCasteVariety") === ""
                ? helperText
                : "",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.FarmingType",
            label: "Farming Type",
            name: "FarmingType",
            disableValidationOnProceed: true,
            error:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.FarmingType") === "",
            errtext:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.FarmingType") === ""
                ? helperText
                : "",
            errCount,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Color",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Color",
            name: "Color",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Height",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Height",
            name: "Height",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Weight",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Weight",
            name: "Weight",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Age-Year",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.AgeYear",
            options: masters.AgeYear,
            name: "AgeYear",
          },
          {
            type: "AutoComplete",
            label: "Age-Month",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.AgeMonth",
            options: masters.AgeMonth,
            name: "AgeMonth",
          },
          {
            type: "AutoComplete",
            label: "Age-Days",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.AgeDays",
            options: masters.AgeDays,
            name: "AgeDays",
          },
          {
            type: "Input",
            label: "Remarks",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Remarks",
            name: "Remarks",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.CurrentHealthStatus",
            label: "Current Health Status",
            name: "CurrentHealthStatus",
            disableValidationOnProceed: true,
            errCount,
            error:
              ErrorFlag &&
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.CurrentHealthStatus") === "",
            errtext:
              ErrorFlag &&
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.CurrentHealthStatus") === ""
                ? helperText
                : "",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            visible: true,
            required: true,
            value: "InsurableItem.0.RiskItems.0.SumInsured",
            label: "Sum Insured",
            name: "SumInsured",
            disableValidationOnProceed: true,
            errCount,
            error:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.SumInsured") === "",
            errtext:
              ErrorFlag && objectPath.get(dto, "InsurableItem.0.RiskItems.0.SumInsured") === ""
                ? helperText
                : "",
            onChangeFuncs: [IsNumeric1],
            onBlurFuncs: [IsNumeric1],
          },
          {
            type: "Input",
            label: "Rate (%)",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Rate(%)",
            onChangeFuncs: [IsNumeric],
            name: "Rate",
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 9,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 10.2,
          },
          {
            type: "Button",
            label: "Reset",
            visible: true,
            variant: "outlined",
            onClick: () => OnReset(),
            spacing: 1,
          },
          {
            type: "Button",
            label: "Add",
            visible: true,
            variant: "contained",
            onClick: () => OnClickAddData(),
            disabled: isLoading,
            spacing: 0.5,
          },
          {
            type: "Typography",
            label: "",
            // visible:
            //   dto.Temp.Upload.length !== 0 && dto.Temp.Upload[0].NumberofBirdorChicken !== "",
            visible:
              objectPath.get(dto, "TotalSumInsured") !== "" &&
              objectPath.get(dto, "TotalNumberBirdorChicken") !== "",
            // (flag.OnAdd && objectPath.get(dto, "TotalSumInsured") !== "") ||
            // (objectPath.get(dto, "Temp.Upload.0.NumberofBirdorChicken") !== "" &&
            //   objectPath.get(dto, "Temp.Upload.0.NumberofBirdorChicken") !== undefined),
            spacing: 12,
          },
          {
            type: "Custom",
            required: true,
            visible:
              objectPath.get(dto, "TotalSumInsured") !== "" &&
              objectPath.get(dto, "TotalNumberBirdorChicken") !== "",
            // (flag.OnAdd && objectPath.get(dto, "TotalSumInsured") !== "") ||
            // (objectPath.get(dto, "Temp.Upload.0.NumberofBirdorChicken") !== "" &&
            //   objectPath.get(dto, "Temp.Upload.0.NumberofBirdorChicken") !== undefined),
            spacing: 8.5,
            return: (
              <Stack direction="row" spacing={2}>
                <Typography>
                  <strong>Birds/Chicken Details Summary</strong>
                </Typography>
              </Stack>
            ),
          },
          {
            type: "Custom",
            spacing: 2.5,
            visible:
              objectPath.get(dto, "TotalSumInsured") !== "" &&
              objectPath.get(dto, "TotalNumberBirdorChicken") !== "",
            variant: "Outlined",
            label: "Search",
            return: (
              <MDInput
                value={searchInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  newSearchInput = e.target.value;
                  setSearchInput(newSearchInput);
                  handleSearch(newSearchInput);
                }}
              />
            ),
          },
          {
            type: "Button",
            label: "Clear",
            visible:
              objectPath.get(dto, "TotalSumInsured") !== "" &&
              objectPath.get(dto, "TotalNumberBirdorChicken") !== "",
            variant: "outlined",
            spacing: 1,
            disabled: newSearchInput !== "",
            onClick: () => OnClearData(),
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible:
              objectPath.get(dto, "TotalSumInsured") !== "" &&
              objectPath.get(dto, "TotalNumberBirdorChicken") !== "",
            // (flag.OnAdd && objectPath.get(dto, "TotalSumInsured") !== "") ||
            // (objectPath.get(dto, "Temp.Upload.0.NumberofBirdorChicken") !== "" &&
            //   objectPath.get(dto, "Temp.Upload.0.NumberofBirdorChicken") !== undefined),
            rowId: "UniqueId",
            columns: [
              { field: "BatchNumber", headerName: "Batch Number", width: 200 },
              {
                field: "NumberofBirdorChicken",
                headerName: "Number of Bird/Chicken",
                width: 200,
              },
              { field: "PurposeofUsage", headerName: "Purpose of Usage", width: 200 },
              { field: "NameofBirdorChicken", headerName: "Name of Bird/Chicken", width: 200 },
              { field: "Category", headerName: "Category", width: 200 },
              { field: "BreedCasteVariety", headerName: "Breed/Caste/Variety", width: 200 },
              { field: "FarmingType", headerName: "Farming Type", width: 200 },
              { field: "Color", headerName: "Color", width: 100 },
              { field: "Height", headerName: "Height", width: 100 },
              { field: "Weight", headerName: "Weight", width: 100 },
              { field: "AgeYear", headerName: "AgeYear", width: 100 },
              { field: "AgeMonth", headerName: "AgeMonth", width: 100 },
              { field: "AgeDays", headerName: "AgeDays", width: 100 },
              { field: "Remarks", headerName: "Remarks", width: 200 },
              { field: "CurrentHealthStatus", headerName: "Current Health Status", width: 200 },
              { field: "SumInsured", headerName: "SumInsured", width: 150 },
              { field: "Rate", headerName: "Rate(%)", width: 200 },
              { field: "Premium Amount", headerName: "Premium Amount", width: 200 },
              { field: "PurchasedDate", headerName: "Purchased Date", width: 200 },
              { field: "PurchaseAmount", headerName: "Purchase Amount", width: 200 },
              {
                field: "icons",
                headerName: "",
                width: 100,
                renderCell: (params) => (
                  <div>
                    <IconButton onClick={(event) => handleMenuOpen(event, params.row)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                      <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete()}>Delete</MenuItem>
                    </Menu>
                  </div>
                ),
              },
            ],
            checkboxSelection: true,
            onSelectionModelChange: (row) => setRowSelectionModel(row),
            value: "Temp.Upload",
          },
          {
            type: "Custom",
            visible: true,
            required: true,
            spacing: 5.2,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#F0F0F0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                p={3}
              >
                <MDTypography variant="h6"> Total Number of Birds/Chicken</MDTypography>
                <MDTypography>
                  {formater.format(objectPath.get(dto, `TotalNumberBirdorChicken`))}
                </MDTypography>
                {/* <MDTypography> {formater.format(TotNumberOfChicken)}</MDTypography> */}
              </MDBox>
            ),
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 1.6,
          },
          {
            type: "Custom",
            visible: true,
            required: true,
            spacing: 5.2,
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
                <MDTypography>
                  रु {formater.format(objectPath.get(dto, `TotalSumInsured`))}
                </MDTypography>
              </MDBox>
            ),
          },
          {
            type: "Input",
            label: "General Description",
            // required: true,
            visible: true,
            value: "InsurableItem.0.RiskItems.0.GeneralDescription",
            spacing: 3,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            // disableValidationOnProceed: true,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 9,
          },
          {
            type: "Typography",
            label: "Vaccination/Other Documents",
            visible: true,
            // required: true,
            fontSize: 16,
            spacing: 3,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 9,
          },
          {
            type: "Button",
            label: "Add Document",
            visible: true,
            startIcon: <AddIcon />,
            variant: "outlined",
            onClick: onAddVacOtherDocument,
            spacing: 2,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 7,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <Stack rowGap={2}>
                {dto.InsurableItem[0].VaccinationOtherDocuments.map((item, index) => (
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
          {
            type: "Typography",
            label: "",
            spacing: 24,
            visible: true,
          },
        ],
      ];
      break;
    case 3:
      data = [
        //   Risk Details
        [
          {
            type: "AutoComplete",
            label: "Issuing Branch",
            required: true,
            value: "Channel.IssuingBranch",
            visible: true,
            disableOnReset:
              (dto.proposalNo !== undefined && dto.proposalNo !== "") ||
              (objectPath.get(dto, "FormatedData.ProposalNumber") !== undefined &&
                objectPath.get(dto, "FormatedData.ProposalNumber") !== ""),
            options: masters.IssuingBranch.filter((x) =>
              loginUserDetails.branchName.split(",").some((y) => y === x.mValue)
            ),
            disabled:
              (dto.proposalNo !== undefined && dto.proposalNo !== "") ||
              (objectPath.get(dto, "FormatedData.ProposalNumber") !== undefined &&
                objectPath.get(dto, "FormatedData.ProposalNumber") !== ""),
            customOnChange: (e, a) => handleInssuingbranch(e, a, "IssuingBranch"),
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
            disabled: true,
            value: "Channel.FiscalYear",
          },
          {
            type: "AutoComplete",
            label: "Field Officer Code",
            visible: true,
            optionLabel: "fieldName",
            value: "Channel.FieldOfficerCode",
            options: masters.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficer(e, a, "fieldName"),
          },
          {
            type: "AutoComplete",
            label: "Field Officer name",
            visible: true,
            value: "Channel.FieldOfficer",
            options: masters.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficer(e, a, "FieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Code",
            visible: true,
            value: "Channel.SubFieldOfficerCode",
            optionLabel: "fieldName",
            options: masters.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficer(e, a, "subfieldName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Name",
            visible: true,
            value: "Channel.SubFieldOfficer",
            options: masters.SubFieldOfficer,
            customOnChange: (e, a) => handleFieldOfficer(e, a, "SubFieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Agent Code",
            visible: true,
            value: "Channel.AgentCode",
            optionLabel: "fieldName",
            options: masters.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficer(e, a, "agentfieldName"),
          },
          {
            type: "AutoComplete",
            label: "Agent name",
            visible: true,
            value: "Channel.AgentName",
            options: masters.SubFieldOfficer,
            customOnChange: (e, a) => handleFieldOfficer(e, a, "agentFieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Code",
            visible: true,
            value: "Channel.SubAgentCode",
            optionLabel: "fieldName",
            options: masters.SubAgent,
            customOnChange: (e, a) => handleFieldOfficer(e, a, "subagentfieldName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Name",
            visible: true,
            value: "Channel.SubAgentName",
            options: masters.SubAgent,
            customOnChange: (e, a) => handleFieldOfficer(e, a, "subagentFieldOfficer"),
          },
        ],
        //  Issuing Branch Details
        [
          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            // value: "Channel.Country",
            options: masters.Country,
            disabled: true,
            disableOnReset: true,
            value: "RiskAddressDetails.Country",
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
            label: "Muncipality",
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
            // value: "Channel.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            required: true,
            visible: true,
            name: "AddressEng1",
            value: "RiskAddressDetails.AddressEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            // required: true,
            // value: "Channel.AddressNepali",
            disabled: true,
            value: "RiskAddressDetails.AddressNepali",
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            value: "RiskAddressDetails.Area",
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            value: "RiskAddressDetails.ToleStreetName",
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            value: "RiskAddressDetails.HouseNumber",
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            value: "RiskAddressDetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
          },
        ],
      ];
      break;
    case 4:
      data = [
        [
          {
            type: "Input",
            label: "Number of Owners/Partners",
            visible: true,
            required: true,
            disabled: true,
            disableOnReset: true,
            value: "OwnerAccidentalDetails.NumberofOwnersPartners",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Personal Accidental SI(Per Person)",
            visible: true,
            required: true,
            disabled: true,
            disableOnReset: true,
            value: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
          },
          {
            type: "Input",
            label: "Total Accidental SumInsured",
            visible: true,
            required: true,
            disabled: true,
            disableOnReset: true,
            value: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
          },
          {
            type: "Typography",
            visible: true,
            spacing: 3,
          },
        ],
        [
          {
            type: "Input",
            label: "Nominee Name",
            visible: true,
            value: "NomineeDetails.NomineeName",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Nominee Citizenship Number",
            visible: true,
            value: "NomineeDetails.NomineeCitizenshipNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Father Name",
            visible: true,
            value: "NomineeDetails.NomineeFatherName",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Mother Name",
            visible: true,
            value: "NomineeDetails.NomineeMotherName",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Relationship",
            visible: true,
            value: "NomineeDetails.NomineeRelationship",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            value: "NomineeDetails.NomineeContactNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            value: "NomineeDetails.NomineeAddress",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
        ],
      ];
      break;
    case 5:
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
                    <Typography>Basic Premium</Typography>
                    <Typography>Govt Subsidy</Typography>
                    <Typography>Premium after Subsidy</Typography>
                    <Typography>Stamp Duty</Typography>
                    <Typography>Total Accidental Premium</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                  </Grid>
                  <Grid item xs={2}>
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
                    <Divider sx={{ height: "1px" }} />
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
                  <Grid item xs={2}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      <b>
                        {objectPath.get(dto, "FormatedData.CalculatedPremiumDetails.FinalPremium")}
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
              objectPath.get(dto, "Channel.AgentCode") !== "" &&
              objectPath.get(dto, "Channel.AgentCode") !== "0000",
            spacing: 3,
          },
          {
            type: "Typography",
            visible:
              objectPath.get(dto, "Channel.AgentCode") !== "" &&
              objectPath.get(dto, "Channel.AgentCode") !== "0000",
            spacing: 3,
          },
          {
            type: "Custom",
            visible:
              objectPath.get(dto, "Channel.AgentCode") !== "" &&
              objectPath.get(dto, "Channel.AgentCode") !== "0000",
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
                    <Typography>Commission Percentage</Typography>
                    <Typography>Commission Amount </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography> %</Typography>
                    <Typography> रु</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        dto,
                        "FormatedData.CalculatedPremiumDetails.CommissionPercentage"
                      )}{" "}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {" "}
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
              <ColorButton variant="contained" onClick={() => onDebitNoteClick()}>
                Preview Debit Note
              </ColorButton>
            ),
          },
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
                    Proposal Sent For Approval
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
  }
  return data;
};

const getOnNextClick = async (activeStep, setBackDropFlag) => {
  let fun = false;
  const tDto = { ...topDto };

  const handleProposal = async () => {
    if (topGenericInfo && topGenericInfo.Flow === undefined && tDto.proposalNo === undefined) {
      await GenericApi("NepalAgriLivestockPoultry", "NepalPoultryProposaApi", tDto).then(
        async (x) => {
          if (x.finalResult.proposalNumber) {
            objectPath.set(tDto, "FormatedData.ProposalNumber", x.finalResult.proposalNumber);
            objectPath.set(tDto, "proposalNo", x.finalResult.proposalNumber);
            await GetProductByCode(topDto.ProductCode).then(async (x2) => {
              const res = await GetProposalByNumber(
                x.finalResult.proposalNumber,
                x2.data.productId
              );
              objectPath.set(tDto, "KYCNo", res.data[0].policyDetails.KYCNo);
              // objectPath.set(tDto, "proposalNo", x.data.proposalNumber);
              setGenericPolicyDto(topDispatch, { ...tDto });

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
        }
      );
    }
    if (tDto.proposalNo !== "" && tDto.proposalNo !== undefined) {
      fun = await UpdateProposalDetails(tDto).then(async (x) => {
        if (x.responseMessage === "Updated successfully") {
          await GetProductByCode(topDto.ProductCode).then(async (x2) => {
            const res = await GetProposalByNumber(x.data.proposalNumber, x2.data.productId);
            objectPath.set(tDto, "KYCNo", res.data[0].policyDetails.KYCNo);
            setGenericPolicyDto(topDispatch, { ...tDto });
            setBackDropFlag(false);
          });
        }
        return true;
      });
    }
    return fun;
  };

  const checkVal = async () => {
    if (newSearchInput !== "") {
      console.log("kkkk", tDto);
      objectPath.set(tDto, "Temp.Upload", tDto.Temp.UploadData);
      newSearchInput = "";
      setGenericPolicyDto(topDispatch, { ...tDto });
      fun = true;
    }
    if (tDto.Temp.UploadData.length === 0) {
      fun = false;
      swal.fire({
        icon: "error",
        text: "Please Add the Required Data",
      });
    } else {
      objectPath.set(tDto, "Temp.Upload", tDto.Temp.UploadData);
      newSearchInput = "";
      setGenericPolicyDto(topDispatch, { ...tDto });
      fun = true;
    }
    return fun;
  };
  switch (activeStep) {
    case 0:
      fun = await GenericApi("NepalAgriLivestockPoultry", "NepalAgriPoultryAPI", topDto).then(
        async (x) => {
          console.log("x1", x);
          if (x.finalResult) {
            console.log("llll", topDto);
            objectPath.set(topDto, "PremiumDetails", x.finalResult);
            objectPath.set(
              topDto,
              "PaymentAmount",
              parseFloat(x.finalResult.FinalPremium).toFixed(2)
            );
            if (
              objectPath.get(topDto, "Temp.DataGridValues.0.SumInsured") !== undefined &&
              objectPath.get(topDto, "Temp.DataGridValues.0.NumberofBirdorChicken") !== undefined
            ) {
              if (
                objectPath.get(topDto, "InsurableItem.0.RiskItems.0.TypeofPoultry") === "Broiler"
              ) {
                objectPath.set(
                  topDto,
                  "Temp.DataGridValues.0.Rate(%)",
                  x.finalResult.PoultryGeneralRate * 100
                );
                objectPath.set(
                  topDto,
                  "InsurableItem.0.RiskItems.0.Rate(%)",
                  x.finalResult.PoultryGeneralRate * 100
                );
              } else {
                objectPath.set(
                  topDto,
                  "Temp.DataGridValues.0.Rate(%)",
                  x.finalResult.PoultryGeneralRate * 100
                );
                objectPath.set(
                  topDto,
                  "InsurableItem.0.RiskItems.0.Rate(%)",
                  x.finalResult.PoultryGeneralRate * 100
                );
              }
            }
            objectPath.set(
              topDto,
              "Temp.DataGridValues.0.Premium Amount",
              formater.format(x.finalResult.BasePremium)
            );
            objectPath.set(
              topDto,
              "InsurableItem.0.RiskItems.0.Premium Amount",
              formater.format(x.finalResult.BasePremium)
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
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.BasePremium",
              formater.format(x.finalResult.BasePremium)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.GovtSubsidyPremium",
              formater.format(x.finalResult.GovtSubsidyPremium)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.PremiumwithStampduty",
              formater.format(x.finalResult.PremiumwithStampduty)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.StampDuty",
              formater.format(x.finalResult.StampDuty)
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
            objectPath.set(topDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.FinalPremium",
              formater.format(x.finalResult.FinalPremium)
            );
            const res1 = await SaveQuotation(topDto);
            console.log("res1", res1);
            objectPath.set(topDto, "Quotation No", res1.data.quotation.quoteNo);
            setGenericPolicyDto(topDispatch, { ...topDto });
            setBackDropFlag(false);
            const fun1 = await swal
              .fire({
                title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                html: `<div style="display: flex; flex-direction: row;">  <div style="flex: 5; text-align: left; margin-left: 2rem" ">  <div>Basic Premium</div>  <div>Govt Subsidy</div>  <div>Premium After Subsidy</div>  <div>Stamp Duty</div>  <div>Total Accidental Premium</div>  <div><b>Total Premium to be paid by customer</b></div>  </div>  <div style="flex: 0.7; text-align: right;font-size:16.3px; margin-bottom: 0.5rem" ">  <div>रु</div>  <div>रु</div>  <div>रु</div>  <div>रु</div>  <div>रु</div>  <div><b>रु</b></div>  </div>  <div style="flex: 1.8; text-align: right; margin-right: 1rem">  <div> ${formater.format(
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
                width: 600,
                confirmButtonText: "Proceed",
                confirmButtonColor: "#0079CE",
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
        }
      );
      break;
    case 1:
      fun = true;
      if (newSearchInput !== "") {
        objectPath.set(topDto, "Temp.Upload", topDto.Temp.UploadData);
        newSearchInput = "";
        setGenericPolicyDto(topDispatch, { ...topDto });
      }
      objectPath.set(topDto, "InsurableItem.0.RiskItems.0.NumberofBirdorChicken", "");
      objectPath.set(topDto, "InsurableItem.0.RiskItems.0.SumInsured", "");
      objectPath.set(topDto, "InsurableItem.0.RiskItems.0.Premium Amount", "");
      break;
    case 2:
      setBackDropFlag(false);

      objectPath.set(
        topDto,
        "FormatedData.CalculatedPremiumDetails.TotalNumberBirdorChicken",
        formater.format(objectPath.get(topDto, "TotalNumberBirdorChicken"))
      );

      objectPath.set(
        topDto,
        "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
        formater.format(objectPath.get(topDto, "TotalSumInsured"))
      );
      fun = checkVal();
      break;
    case 3:
      objectPath.set(
        topDto,
        "InsurableItem.0.RiskItems.0.NumberofBirdorChicken",
        topDto.totalBirdsOrChickens
      );
      objectPath.set(topDto, "InsurableItem.0.RiskItems.0.SumInsured", topDto.TotalSumInsured);
      await GenericApi("NepalAgriLivestockPoultry", "NepalAgriPoultryAPI", topDto).then(
        async (d) => {
          console.log("d1", d);
          if (d.finalResult) {
            console.log("llll", topDto);
            objectPath.set(topDto, "PremiumDetails", d.finalResult);
            objectPath.set(
              topDto,
              "PaymentAmount",
              parseFloat(d.finalResult.FinalPremium).toFixed(2)
            );
            if (
              objectPath.get(topDto, "Temp.DataGridValues.0.SumInsured") !== undefined &&
              objectPath.get(topDto, "Temp.DataGridValues.0.NumberofBirdorChicken") !== undefined
            ) {
              if (
                objectPath.get(topDto, "InsurableItem.0.RiskItems.0.TypeofPoultry") === "Broiler"
              ) {
                objectPath.set(
                  topDto,
                  "Temp.DataGridValues.0.Rate(%)",
                  d.finalResult.PoultryGeneralRate * 100
                );
                objectPath.set(
                  topDto,
                  "InsurableItem.0.RiskItems.0.Rate(%)",
                  d.finalResult.PoultryGeneralRate * 100
                );
              } else {
                objectPath.set(
                  topDto,
                  "Temp.DataGridValues.0.Rate(%)",
                  d.finalResult.PoultryGeneralRate * 100
                );
                objectPath.set(
                  topDto,
                  "InsurableItem.0.RiskItems.0.Rate(%)",
                  d.finalResult.PoultryGeneralRate * 100
                );
              }
            }
            objectPath.set(
              topDto,
              "Temp.DataGridValues.0.Premium Amount",
              formater.format(d.finalResult.BasePremium)
            );
            objectPath.set(
              topDto,
              "InsurableItem.0.RiskItems.0.Premium Amount",
              formater.format(d.finalResult.BasePremium)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
              formater.format(d.finalResult.PerPersonAccidentalPremium)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
              formater.format(d.finalResult.AccidentalPremium)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.BasePremium",
              formater.format(d.finalResult.BasePremium)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.GovtSubsidyPremium",
              formater.format(d.finalResult.GovtSubsidyPremium)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.PremiumafterSubsidy",
              formater.format(d.finalResult.PremiumafterSubsidy)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.PremiumwithStampduty",
              formater.format(d.finalResult.PremiumwithStampduty)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.StampDuty",
              formater.format(d.finalResult.StampDuty)
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
              d.finalResult.CommissionPercentage
            );
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.CommissionAmount",
              formater.format(d.finalResult.CommissionAmount)
            );
            objectPath.set(topDto, "FinalPremium", formater.format(d.finalResult.FinalPremium));
            objectPath.set(
              topDto,
              "FormatedData.CalculatedPremiumDetails.FinalPremium",
              formater.format(d.finalResult.FinalPremium)
            );
            setGenericPolicyDto(topDispatch, { ...topDto });
          }
        }
      );
      objectPath.set(topDto, "InsurableItem.0.RiskItems.0.NumberofBirdorChicken", "");

      objectPath.set(topDto, "InsurableItem.0.RiskItems.0.SumInsured", "");

      setGenericPolicyDto(topDispatch, { ...topDto });
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
          allowOutsideClick: false,
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

  const onReset1 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.documentDetails = [{ ...docDetails() }];
    setDto(dispatch, { ...lDto });
  };

  const onReset2 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.InsurableItem[0].VaccinationOtherDocuments = [{ ...docDetails() }];
    setDto(dispatch, { ...lDto });
  };

  // const resetgrid = (dto, setDto, dispatch) => {
  //   const lDto = dto;
  //   // lDto.Temp.DataGridValues = [DataGridValue];
  //   // lDto.OwnerAccidentalDetails.NumberofOwnersPartners = "1";
  //   setDto(dispatch, { ...lDto });
  // };

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Calculate Premium", visible: true, loader: "backDrop" },
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
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: {
          label: "Reset",
          visible: true,
          onClick: onReset2,
        },
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
