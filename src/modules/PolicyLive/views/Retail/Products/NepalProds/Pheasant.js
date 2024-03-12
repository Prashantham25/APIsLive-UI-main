import ClearIcon from "@mui/icons-material/Clear";
import {
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  List,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Success from "assets/images/Nepal/Success.png";
import MDInput from "components/MDInput";
import objectPath from "object-path";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import MDButton from "components/MDButton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import PaymentPage from "../../Payment";
import { BranchDetails } from "./data/Json/CommercialJson";
import { UpdateWorkflowStatus, GetTemplatePayload } from "../../Payment/Apis";
import { GetProdPartnermasterData, QuotationUpdate } from "./data/APIs/AgriBPCApi";
import {
  DeleteDocument,
  DocumenUpload,
  GenericApi,
  IsNumeric1,
  GetNPCommonMaster,
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  SavepolicyWFStatus,
  Transliteration,
  UpdateProposalDetails,
  SaveQuotation,
  SaveCreateProposal,
  GetProposalByNumber,
  SendNotification,
  GetProductByCode,
  PolicyStartDateMinDate,
  PolicyStartDateMaxDate,
  NumberofDaysinYear,
  redAsterisk,
} from "./data/APIs/MotorCycleApi";
import {
  PheasantJson,
  VaccinationandOtherDocuments,
  docDetails,
} from "./data/Json/AgriLiveStockJson";
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import {
  IsFreetextNoSpace,
  IsNumeric,
  NumBetween,
  IsMobileNumber,
  AgeCalculator,
  addDays1,
} from "../../../../../../Common/Validations";
import { useDataController } from "../../../../../BrokerPortal/context";

// let newSearchInput;

const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = PheasantJson();
  if (
    genericInfo.Flow &&
    (genericInfo.Flow === "DisApproveFlow" ||
      genericInfo.Flow === "Approved" ||
      genericInfo.Flow === "DebitFlow")
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
    "Livestock Details",
    "Risk Details",
    "Nominee Details",
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
      steps = [
        { name: "Quote Details", visible: true },
        { name: "Pheasant Information", visible: true },
        { name: "Owner Accidental Details", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "", visible: true }, // Customer Details
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
        ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        {
          name: "Care of Details",
          visible: dto.FinancingType !== "",
        },
        { name: "Proprietor Details", visible: dto.FinancingType !== "" },
        { name: "Other Details", visible: dto.FinancingType !== "" },
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

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, dto, masters, setMasters, setDto }) => {
  let data = [];
  const lDto = dto;
  const masters1 = masters;
  const [control] = useDataController();
  const { genericInfo, loginUserDetails } = control;

  const IsEmail = (email) => {
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{3,3})$/i;
    if (email.length !== 0) {
      if (emailRegex.test(email)) return true;
      return "Not a valid Email";
    }
    return false;
  };

  const IsNumaricSpecialNoSpace = (str) => {
    const regex = /^[0-9-+]+[0-9-+\s]*$/;
    if (regex.test(str) || str === "") {
      return true;
    }
    return "Allows only numbers and special characters";
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleYearly = async (e, a) => {
    if (a !== null) {
      lDto.PremiumType = a.mValue;
      if (a.mValue === "Yearly") {
        lDto.NumberofDays = NumberofDaysinYear(
          lDto.PolicyStartDate,
          lDto.PolicyStartDate.split("/")[2]
        );
        if (lDto.PolicyStartDate !== "") {
          lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
        }
      } else {
        lDto.NumberofDays = "";
        lDto.PolicyEndDate = "";
        setDto({ ...lDto });
      }
    } else {
      lDto.PremiumType = "";
      lDto.NumberofDays = "";
      lDto.PolicyEndDate = "";
      setDto({ ...lDto });
    }
    // if (
    //   localStorage.getItem("NepalCompanySelect") !== null ||
    //   process.env.REACT_APP_EnvId !== "297"
    // ) {
    //   let Company = "";
    //   if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //     Company = "NMIC";
    //   }
    //   if (
    //     localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
    //     process.env.REACT_APP_EnvId === "1"
    //   ) {
    //     Company = "PMIC";
    //   }
    //   await GetProdPartnermasterData("BranchName", {
    //     Description: Company,
    //   }).then((res) => {
    //     masters1.IssuingBranch = res.data;
    //     // lDto.ICShortName = res.data[0].Description;
    //   });
    // }
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
    if (genericInfo.Flow && genericInfo.Flow === "DisApproveFlow") {
      const obj = {
        Stage: "Proposal",
        Status: "307",
        WorkFlowType: "Agent",
        wfstageStatusId: "315",
      };
      await SavepolicyWFStatus(genericInfo.ProposalNo, obj);
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
      lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
      await UpdateProposalDetails(dto).then(async () => {
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
      const proposalNo = objectPath.get(lDto, "proposalNo");
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
    }
  };
  const generateFile = (content, fileName) => {
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  const onDebitNoteClick = async (e, key) => {
    const proposalNo = objectPath.get(lDto, "proposalNo");
    const downloadDTO = {
      key: lDto.proposalNo,
      keyValue: "",
      templateKey: "",
      templateId: 245,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNo);
      }
    });
    if (key === "SAVE DEBIT NOTE") {
      onSaveModalClose();
    }
  };
  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = lDto.ProposerDetails[0].EmailId;

      const obj = {
        proposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: lDto.proposalNo,
        keyType: "BGRProposal",
        communicationId: 190,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      if (EmailAddress !== "") {
        const res = await SendNotification(EmailAddress, obj);
        if (res.data.status === 1) {
          swal2.fire({
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
  const onDOBselect = (e, d, i) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      lDto.ProposerDetails[i].DoB = [""];
      setDto({ ...lDto });
      swal2.fire({
        icon: "error",
        text: `Age of the Policy Holder must be above 16 Years.`,
        confirmButtonColor: "#0079CE",
      });
    } else {
      lDto.ProposerDetails[i].DoB = d;
      setDto({ ...lDto });
    }
  };

  // const handleIssuingBranch = (e, a, key) => {
  // if (key === "InsuredType") {
  //   if (a !== null) {
  //     lDto.ProposerDetails[0].InsuredType = a.mValue;
  //     lDto.InsuredTypeCode = a.shortCode;
  //     if (lDto.ProvinceCode !== undefined) {
  //       lDto.Prefix = lDto.ProvinceCode.concat("/", a.shortCode)
  //         .concat("/", lDto.ShortCode, "/")
  //         .concat(",", lDto.ProvinceCode)
  //         .concat("/", lDto.ShortCode, "/");
  //     }
  //     setDto({ ...lDto });
  //   } else {
  //     lDto.ProposerDetails[0].InsuredType = "";
  //     lDto.InsuredTypeCode = "";
  //     setDto({ ...lDto });
  //   }
  // }
  // if (key === "IssuingBranch") {
  //   if (a !== null) {
  //     lDto.Channel.IssuingBranch = a.mValue;
  //     lDto.Prefix = ("/", lDto.InsuredTypeCode)
  //       .concat("/", a.shortCode, "/")
  //       .concat(",", a.fieldName)
  //       .concat("/", a.shortCode, "/");
  //     lDto.fieldName = a.fieldName;
  //     lDto.shortCode = a.shortCode;
  //     const BusinessTypeCode = lDto.DocType[0];
  //     lDto.PolicyPrefix = a.fieldName
  //       .concat("/", a.shortCode, "/", "KLJ")
  //       .concat("/", "BHB", "/", BusinessTypeCode, "/", lDto.Channel.FiscalYear, "/");
  //     lDto.Suffix = "-".concat(lDto.Channel.FiscalYear, ",");
  //   } else {
  //     lDto.Channel.IssuingBranch = "";
  //   }
  // }
  // setDto({ ...lDto });
  // };
  const handleIssuingBranch = (e, a, key) => {
    if (key === "InsuredType") {
      if (a !== null) {
        lDto.ProposerDetails[0].InsuredType = a.mValue;
        lDto.InsuredTypeCode = a.shortCode;
        if (lDto.ProvinceCode !== undefined) {
          lDto.Prefix = lDto.ProvinceCode.concat("/", a.shortCode)
            .concat("/", lDto.ShortCode, "/")
            .concat(",", lDto.ProvinceCode)
            .concat("/", lDto.ShortCode, "/");
        }
        setDto({ ...lDto });
      } else {
        lDto.ProposerDetails[0].InsuredType = "";
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
        lDto.PolicyPrefix = a.ProvinceCode.concat("/", a.ShortCode, "/", "AGR").concat(
          "/",
          "KLJ",
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
    lDto.ProposerDetails[0].ProfilePicture = "";
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
    // lDto.ProposerDetails[0].PolicyHolderDetails.PolicyHolderName = "";
    setDto({ ...lDto });
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
        lDto.ProposerDetails[i].PermanentAddressNepali = Text;
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
        lDto.ProposerDetails[i].PermanentAddressNepali = Text;
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
      // if (varName === "TemporaryAddressEnglish") {
      //   lDto.ProposerDetails[i].CommunicationAddress.TempAddresNepali = Text;
      // }
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

  // const OnFiscalYear = () => {
  //   const rf = lDto.Channel.FiscalYear;
  //   if (rf === undefined || rf === "") {
  //     const curM = new Date().getMonth() + 1;
  //     const curD = new Date().getDate();
  //     let curY2 = new Date().getFullYear();
  //     let curY1 = new Date().getFullYear();
  //     if (curM < 7) {
  //       curY1 -= 1;
  //     } else if (curM > 7) {
  //       curY2 += 1;
  //     } else if (curD < 17) curY1 -= 1;
  //     else curY2 += 1;
  //     lDto.Channel.FiscalYear = curY1
  //       .toString()
  //       .slice(2, 4)
  //       .concat("/", curY2.toString().slice(2, 4));
  //   }
  // };
  const onAddDocument = (i) => {
    lDto.ProposerDetails[i].documentDetails = [
      ...lDto.ProposerDetails[i].documentDetails,
      { ...docDetails() },
    ];

    setDto({ ...lDto });
  };
  const handleDublicateDoc = (e, i1, index) => {
    lDto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        swal({
          icon: "error",
          text: `"${(lDto.ProposerDetails[i1].documentDetails[index].DocName =
            e.target.value)}" Already Exist`,
        });
        lDto.ProposerDetails[i1].documentDetails[index].DocName = "";
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
  const spreadDocumentDetails = (i1) => {
    const arr = [];
    dto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: true,
          label: "Document Name",
          path: `ProposerDetails.${i1}.documentDetails.${i}.DocName`,
          onChangeFuncs: [IsFreetextNoSpace],
          customOnBlur: (e) => handleDublicateDoc(e, i1, i),
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
              onChange={(e) => handleFileUpload(e, i1, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i1].documentDetails[i].FileName,
          spacing: 3.9,
          sx: { fontSize: "15px", paddingTop: 1 },
          visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
        },
        {
          type: "IconButton",
          icon: "close",
          spacing: 2,
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

  // Voc/Other doc
  const onAddOtherDocument = () => {
    lDto.InsurableItem[0].VaccinationandOtherDocuments = [
      ...lDto.InsurableItem[0].VaccinationandOtherDocuments,
      { ...VaccinationandOtherDocuments() },
    ];
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
  const onOtherDocUplode = async (file, i) => {
    // console.log(event);
    // const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        lDto.InsurableItem[0].VaccinationandOtherDocuments[i].DocumentFileName = file.name;
        lDto.InsurableItem[0].VaccinationandOtherDocuments[i].UploadDocDate =
          new Date().toLocaleDateString();
        lDto.InsurableItem[0].VaccinationandOtherDocuments[i].DocId = result.data[0].docid;
        setDto({ ...lDto });
        swal.fire({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };

  const handleOtherFileUpload = async (event, index) => {
    await onOtherDocUplode(event.target.files[0], index);
  };

  const onotherCancelClick = async (index) => {
    const file = lDto.InsurableItem[0].VaccinationandOtherDocuments[index].DocumentFileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.InsurableItem[0].VaccinationandOtherDocuments[index].DocumentFileName = "";
        lDto.InsurableItem[0].VaccinationandOtherDocuments[index].DocId = "";
        lDto.InsurableItem[0].VaccinationandOtherDocuments[index].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };

  const handleOtherDublicateDoc = (e, index) => {
    console.log(11111111);
    lDto.InsurableItem[0].VaccinationandOtherDocuments.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index) {
        // lDto.documentDetails[index][e.target.name] = "";
        lDto.InsurableItem[0].VaccinationandOtherDocuments[index].DocName = "";
        // setDocCountList([...docCountList]);
        if (e.target.value) {
          swal({
            icon: "error",
            text: `"${(lDto.InsurableItem[0].VaccinationandOtherDocuments[index].DocName =
              e.target.value)}" Already Exist`,
          });
        }
      }
    });
    setDto({ ...lDto });
  };

  const handleotherDocFileDelete = async (i) => {
    const file = lDto.InsurableItem[0].VaccinationandOtherDocuments[i].DocumentFileName;
    if (file !== "") await DeleteDocument(file);
    const arr1 = lDto.InsurableItem[0].VaccinationandOtherDocuments.filter((x, i1) => i1 !== i);
    lDto.InsurableItem[0].VaccinationandOtherDocuments = arr1;
    setDto({ ...lDto });
  };

  const handleownerdetails = (e) => {
    if (e.target.value >= 0) {
      lDto.OwnerAccidentalDetails.NumberofOwnersPartners = e.target.value;
      const TSI = Number(e.target.value) * 200000;
      lDto.OwnerAccidentalDetails.TotalAccidentalSumInsured = TSI;
    } else {
      lDto.OwnerAccidentalDetails.TotalAccidentalSumInsured = "";
    }

    setDto({ ...lDto });
  };

  const spreadOtherDocumentDetails = () => {
    const arr = [];
    lDto.InsurableItem[0].VaccinationandOtherDocuments.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: true,
          name: "DocName",
          label: "Document Name",
          path: `InsurableItem.0.VaccinationandOtherDocuments.${i}.DocName`,
          onChangeFuncs: [IsFreetextNoSpace],
          customOnBlur: (e) => handleOtherDublicateDoc(e, i),
        },
        {
          type: "Button",
          visible: true,
          spacing: 2,
          variant: "outlined",
          component: "label",
          label: "Upload",
          typeFormat: (
            <input
              hidden
              name={i}
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleOtherFileUpload(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: x.DocumentFileName,
          spacing: 3,
          visible: x.DocumentFileName !== "",
        },
        {
          type: "IconButton",
          icon: "close",
          spacing: 2,
          visible: x.DocumentFileName !== "",
          onClick: () => onotherCancelClick(i),
        },
        {
          type: "IconButton",
          icon: "delete",
          color: "primary",
          spacing: 0.1,
          visible: i !== 0,
          onClick: () => handleotherDocFileDelete(i),
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
  // Insured Details--->if insured type is Individual is choosen as dropdown upload picture
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
        text: "Profile Picture uploaded successfully",
      });
    } else {
      swal({
        icon: "error",
        text: "Accepts only JPEG or PNG formats",
        confirmButtonColor: "#0079CE",
      });
    }
  };

  const onCancelClickProfilePicture = async (i) => {
    // lDto.ProposerDetails[i].ProfilePicture = e.target.value;
    const file = lDto.ProposerDetails[i].ProfilePicture;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails[i].ProfilePicture = "";
        setDto({ ...lDto });
      }
    });
  };

  // const RemoveMultiKYCDetails = (i) => {
  //   const arr = lDto.ProposerDetails.filter((x, i1) => i1 !== i);
  //   lDto.ProposerDetails = arr;
  //   lDto.NumberofInsured = lDto.ProposerDetails.length;
  //   setDto({ ...lDto });
  // };

  const spreadMultiKYCDetails = () => {
    const arr = [];
    dto.ProposerDetails.forEach((x, i) => {
      arr.push([
        // {
        //   type: "Button",
        //   label: "Delete",
        //   spacing: 12,
        //   justifyContent: "end",
        //   visible: i !== 0,
        //   onClick: () => RemoveMultiKYCDetails(i),
        // },
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
          customOnChange: (e, a) => handleIssuingBranch(e, a, "InsuredType"),
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
          onChangeFuncs: [IsAlphaNoSpace],
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
          // required:
          //   lDto.ProposerDetails[i].InsuredType !== "Individual" &&
          //   lDto.ProposerDetails[i].InsuredType !== "Government body",
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
          // disabled: lDto.ProposerDetails[i].RegistrationDate === "",
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
          label: "Address(English) ",
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
          label: "Tole/Street Name",
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
              onChange={(e) => OnProfilePicture(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i].ProfilePicture,
          visible: true,
          accordionId: 1,
          spacing: 3.9,
          sx: { fontSize: "15px", paddingTop: 1 },
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
          path: `ProposerDetails.${i}.PermanentAddressEnglish`,
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
          path: `ProposerDetails.${i}.PermanentAddressNepali`,
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
          spacing: 3,
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
          spacing: 3,
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
          minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate).setDate(
            new Date(lDto.ProposerDetails[i].PassportIssuedDate).getDate() + 1
          ),
          accordionId: 1,
          // disabled: lDto.ProposerDetails[i].PassportIssuedDate === "",
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
          onBlurFuncs: [IsMobileNumber],
          onChangeFuncs: [IsNumeric],
          accordionId: 2,
          InputProps: { maxLength: 10 },
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
          path: `ProposerDetails.${i}.PermanentAddressEnglish`,
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
          path: `ProposerDetails.${i}.PermanentAddressNepali`,
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
          spacing: 3,
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
          spacing: 3,
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
          minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate).setDate(
            new Date(lDto.ProposerDetails[i].PassportIssuedDate).getDate() + 1
          ),
          accordionId: 2,
          // disabled: lDto.ProposerDetails[i].PassportIssuedDate === "",
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
          spacing: 3.9,
          sx: { fontSize: "15px", paddingTop: 1 },
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

  const handlePolicyDates1 = (e) => {
    lDto.NumberofDays = "";
    if (IsNumeric1(e) === true && lDto.PremiumType === "Batch") {
      let incorrectValueMessage = "";
      lDto.NumberofDays = e;
      lDto.PolicyEndDate = "";
      if (
        Number(e) >
        Number(NumberofDaysinYear(lDto.PolicyStartDate, lDto.PolicyStartDate.split("/")[2]))
      ) {
        lDto.NumberofDays = "";
        lDto.PolicyEndDate = "";
        setDto({ ...lDto, PolicyEndDate: e === "" ? "" : null });
        incorrectValueMessage = `Days should be in range 1 and ${NumberofDaysinYear(
          lDto.PolicyStartDate,
          lDto.PolicyStartDate.split("/")[2]
        )}`;
        return incorrectValueMessage;
      }
      if (
        NumBetween(
          Number(e),
          0,
          Number(NumberofDaysinYear(lDto.PolicyStartDate, lDto.PolicyStartDate.split("/")[2]))
        )
      ) {
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, Number(e));
        setDto({ ...lDto });
        incorrectValueMessage = "";
        return incorrectValueMessage;
      }
    }
    setDto({ ...lDto });
    getPolicyDto();
    return IsNumeric(Number(e));
  };

  const handlePolicyStartDates1 = (e, d) => {
    lDto.PolicyStartDate = d;
    if (d === "") {
      lDto.PolicyEndDate = "";
    }
    if (lDto.PremiumType === "Yearly") {
      lDto.NumberofDays = NumberofDaysinYear(
        lDto.PolicyStartDate,
        lDto.PolicyStartDate.split("/")[2]
      );
      setDto({ ...lDto });
    }
    if (lDto.PremiumType === "Batch") {
      lDto.NumberofDays = "";
      lDto.PolicyEndDate = "";
      setDto({ ...lDto });
    }
    if (lDto.NumberofDays !== "" && d !== "") {
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, Number(lDto.NumberofDays));
      setDto({ ...lDto });
    }
    setDto({ ...lDto });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  // const [searchInput, setSearchInput] = useState("");

  const handleMenuOpen = (event, rowIndex) => {
    masters1.selectedRowIndex = rowIndex;
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    masters1.selectedRowIndex = null;
    setAnchorEl(null);
  };

  const handleBanknoBank = (e, a) => {
    if (a !== null) {
      lDto.Bankdetails.BankorNonBank = a.mValue;
    } else {
      lDto.Bankdetails.BankorNonBank = "";
    }
    lDto.Bankdetails.BankCategory = "";
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
  };
  const handleBankCategory = async (e, a, key) => {
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
        masters1.BranchMasters = [];
      }
    }
    setDto({ ...lDto });
  };

  const handleBranchName = async (e, a, i) => {
    if (a !== null) {
      lDto.Bankdetails.BranchDetails[i].BranchName = a.mValue;
      lDto.Bankdetails.BranchDetails[i].Country = a.Country;
      lDto.Bankdetails.BranchDetails[i].ProvinceState = a.Province;
      lDto.Bankdetails.BranchDetails[i].District = a.District;
      lDto.Bankdetails.BranchDetails[i].Municipality = a.Municipality;
      lDto.Bankdetails.BranchDetails[i].WardNumber = a.WardNo;
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = a.mValue;

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
      lDto.Bankdetails.BranchDetails[i].WardNumber = "";
      lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
    }
    setDto({ ...lDto });
  };

  const handleDelete = () => {
    // newSearchInput = "";
    // setSearchInput(newSearchInput);
    const filteredList1 = lDto.Temp.Upload.filter(
      (item) => masters1.selectedRowIndex.UniqueId !== item.UniqueId
    );

    const deletedItem = lDto.Temp.Upload.find(
      (item) => masters1.selectedRowIndex.UniqueId === item.UniqueId
    );
    lDto.Temp.Upload = filteredList1;
    lDto.Temp.UploadData = filteredList1;

    handleMenuClose();
    const updatedToNumberofPheasant =
      Number(lDto.TotalNumberPheasant) - Number(deletedItem.NumberofPheasant);
    lDto.TotalNumberPheasant = Number(updatedToNumberofPheasant);

    const updatedTotSumInsured = Number(lDto.TotSumInsured) - Number(deletedItem.SumInsured);
    lDto.TotSumInsured = Number(updatedTotSumInsured);
    setDto({ ...lDto });
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      lDto.Temp.Upload = lDto.Temp.UploadData;
      setDto({ ...lDto });
    } else {
      const filtered = lDto.Temp.Upload.filter((item) => {
        // const searchLower = searchText.toLowerCase();
        const matchesBatch = item.BatchNumber.toLowerCase().includes(e.target.value);
        const matchesName = item.NumberofPheasant.toLowerCase().includes(e.target.value);
        const matchesPurposeofUsage = item.PurposeofUsage.toLowerCase().includes(e.target.value);
        const matchesNameofPheasant = item.NameofPheasant.toLowerCase().includes(e.target.value);
        const matchesCategory = item.Category.toLowerCase().includes(e.target.value);
        const matchesBreedCasteVariety = item.BreedCasteVariety.toLowerCase().includes(
          e.target.value
        );
        const matchesFarmingType = item.FarmingType.toLowerCase().includes(e.target.value);
        const matchesColor = item.Color.toLowerCase().includes(e.target.value);
        const matchesWeight = item.Weight.toLowerCase().includes(e.target.value);
        const matchesAge = item.Age.toLowerCase().includes(e.target.value);
        const matchesRemarks = item.Remarks.toLowerCase().includes(e.target.value);
        const matchesCurrentHealthStatus = item.CurrentHealthStatus.toLowerCase().includes(
          e.target.value
        );
        const matchesSumInsured = item.SumInsured.toLowerCase().includes(e.target.value);
        const matchesRate = item.Rate.toLowerCase().includes(e.target.value);
        const matchesPremiumAmount = item.PremiumAmount.toLowerCase().includes(e.target.value);
        return (
          matchesBatch ||
          matchesName ||
          matchesPurposeofUsage ||
          matchesNameofPheasant ||
          matchesCategory ||
          matchesBreedCasteVariety ||
          matchesFarmingType ||
          matchesColor ||
          matchesWeight ||
          matchesAge ||
          matchesRemarks ||
          matchesCurrentHealthStatus ||
          matchesSumInsured ||
          matchesRate ||
          matchesPremiumAmount
        );
      });
      lDto.Temp.Upload = filtered;
      setDto({ ...lDto });
    }
    setDto({ ...lDto });
  };

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const OnClearData = () => {
    // newSearchInput = "";
    // setSearchInput(newSearchInput);
    lDto.Temp.Upload = lDto.Temp.UploadData;
    const filteredList1 = dto.Temp.Upload.filter(
      (item) => !rowSelectionModel.includes(item.UniqueId)
    );
    setRowSelectionModel(filteredList1);
    lDto.Temp.Upload = filteredList1;
    lDto.Temp.UploadData = filteredList1;
    setDto({ ...lDto });
    const updatedToNumberofPheasant = filteredList1.reduce(
      (total, item) => total + Number(item.NumberofPheasant),
      0
    );
    lDto.TotalNumberPheasant = Number(updatedToNumberofPheasant);

    const updatedTotSumInsured = filteredList1.reduce(
      (total, item) => total + Number(item.SumInsured),
      0
    );
    lDto.TotSumInsured = Number(updatedTotSumInsured);
    setDto({ ...lDto });
  };

  // const handleownerdetails = (e) => {
  //   if (e.target.value >= 0) {
  //     lDto.OwnerAccidentalDetails.NumberofOwnersPartners = e.target.value;
  //     const TSI = Number(e.target.value) * 200000;
  //     lDto.OwnerAccidentalDetails.TotalAccidentalSumInsured = TSI;
  //   } else {
  //     lDto.OwnerAccidentalDetails.TotalAccidentalSumInsured = "";
  //   }

  //   setDto({ ...lDto });
  // };

  const handleEdit = () => {
    // newSearchInput = "";
    // setSearchInput(newSearchInput);
    lDto.Temp.Upload = lDto.Temp.UploadData;
    lDto.InsurableItem[0].RiskItems[0].BatchNumber = masters1.selectedRowIndex.BatchNumber;
    lDto.InsurableItem[0].RiskItems[0].NumberofPheasant =
      masters1.selectedRowIndex.NumberofPheasant;
    lDto.InsurableItem[0].RiskItems[0].PurposeofUsage = masters1.selectedRowIndex.PurposeofUsage;
    lDto.InsurableItem[0].RiskItems[0].NameofPheasant = masters1.selectedRowIndex.NameofPheasant;
    lDto.InsurableItem[0].RiskItems[0].Category = masters1.selectedRowIndex.Category;
    lDto.InsurableItem[0].RiskItems[0].BreedCasteVariety =
      masters1.selectedRowIndex.BreedCasteVariety;
    lDto.InsurableItem[0].RiskItems[0].FarmingType = masters1.selectedRowIndex.FarmingType;
    lDto.InsurableItem[0].RiskItems[0].Color = masters1.selectedRowIndex.Color;
    lDto.InsurableItem[0].RiskItems[0].Weight = masters1.selectedRowIndex.Weight;
    lDto.InsurableItem[0].RiskItems[0].Age = masters1.selectedRowIndex.Age;
    lDto.InsurableItem[0].RiskItems[0].Remarks = masters1.selectedRowIndex.Remarks;
    lDto.InsurableItem[0].RiskItems[0].CurrentHealthStatus =
      masters1.selectedRowIndex.CurrentHealthStatus;
    lDto.InsurableItem[0].RiskItems[0].SumInsured = masters1.selectedRowIndex.SumInsured;
    lDto.InsurableItem[0].RiskItems[0].Rate = masters1.selectedRowIndex.Rate;
    lDto.InsurableItem[0].RiskItems[0].PremiumAmount = masters1.selectedRowIndex.PremiumAmount;
    handleDelete();
    handleMenuClose();
  };

  const RemoveUpload = () => {
    // newSearchInput = "";
    // setSearchInput(newSearchInput);
    lDto.Temp.Upload = lDto.Temp.UploadData;
    lDto.InsurableItem[0].RiskItems[0].BatchNumber = "";
    lDto.InsurableItem[0].RiskItems[0].NumberofPheasant = "";
    lDto.InsurableItem[0].RiskItems[0].PurposeofUsage = "";
    lDto.InsurableItem[0].RiskItems[0].NameofPheasant = "";
    lDto.InsurableItem[0].RiskItems[0].Category = "";
    lDto.InsurableItem[0].RiskItems[0].BreedCasteVariety = "";
    lDto.InsurableItem[0].RiskItems[0].FarmingType = "";
    lDto.InsurableItem[0].RiskItems[0].Color = "";
    lDto.InsurableItem[0].RiskItems[0].Weight = "";
    lDto.InsurableItem[0].RiskItems[0].Age = "";
    lDto.InsurableItem[0].RiskItems[0].Remarks = "";
    lDto.InsurableItem[0].RiskItems[0].CurrentHealthStatus = "";
    lDto.InsurableItem[0].RiskItems[0].SumInsured = "";
    lDto.InsurableItem[0].RiskItems[0].PremiumAmount = "";
    setDto({ ...lDto });
  };

  const handleDataGrid = (e) => {
    if (e.target.name === "TotalSumInsured") {
      if (IsNumeric1(e.target.value) === true) {
        masters1.DataGridval.TotalSumInsured = false;
        lDto.Temp.DataGridValues[0].TotalSumInsured = e.target.value;
        lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = e.target.value;
        setDto({ ...lDto });
      } else {
        masters1.DataGridval.TotalSumInsured = true;
      }
      setMasters({ ...masters1 });
    }
  };
  const handleDataGridRegVal = () => {
    masters1.DataGridval.TotalSumInsured = false;
    masters1.DataGridval.TotalSumInsuredNext = false;
    setMasters({ ...masters1 });
  };

  const PremiumCalc = async (tempObj) => {
    await GenericApi("NepalPheasant", "NepalPheasentAPI", lDto).then(async (x) => {
      if (x.finalResult) {
        lDto.Temp.Upload = [...lDto.Temp.Upload, tempObj];
        lDto.Temp.UploadData = [...lDto.Temp.UploadData, tempObj];

        objectPath.set(
          lDto,
          `Temp.Upload.${lDto.Temp.Upload.length - 1}.PremiumAmount`,
          formater.format(x.finalResult.BasicPremium)
        );
        objectPath.set(
          lDto,
          `Temp.UploadData.${lDto.Temp.UploadData.length - 1}.PremiumAmount`,
          formater.format(x.finalResult.BasicPremium)
        );
        // objectPath.set(lDto, "PremiumDetails", x.finalResult);
        objectPath.set(lDto, "PaymentAmount", parseFloat(x.finalResult.FinalPremium).toFixed(2));
        objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.FinalPremium",
          formater.format(x.finalResult.FinalPremium)
        );
        lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
        await QuotationUpdate(lDto);
        lDto.ProposerDetails = [lDto.ProposerDetails];

        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.BasePremium",
          formater.format(x.finalResult.BasicPremium)
        );
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.GovtSubsidy",
          formater.format(x.finalResult.GovtSubsidy)
        );
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
          formater.format(x.finalResult.PremiumAfterSubsidy)
        );
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.StampDuty",
          formater.format(x.finalResult.StampDuty)
        );
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
          formater.format(x.finalResult.TotalAccidentalPremium)
        );

        objectPath.set(
          lDto,
          "InsurableItem.0.RiskItems.0.Premium Amount",
          formater.format(x.finalResult.BasicPremium)
        );
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
          formater.format(x.finalResult.PerPersonAccidentalPremium)
        );
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.NepalPheasantBaseRate",
          formater.format(x.finalResult.NepalPheasantBaseRate)
        );
        objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));

        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
          formater.format(x.finalResult.CommissionPercentage)
        );
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.CommissionAmount",
          formater.format(x.finalResult.CommissionAmount)
        );
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.FinalPremium",
          formater.format(x.finalResult.FinalPremium)
        );
        const TotalNoPheasant =
          Number(lDto.TotalNumberPheasant) +
          Number(lDto.Temp.Upload[lDto.Temp.Upload.length - 1].NumberofPheasant);
        lDto.TotalNumberPheasant = TotalNoPheasant;

        const TotalSI =
          Number(lDto.TotSumInsured) +
          Number(lDto.Temp.Upload[lDto.Temp.Upload.length - 1].SumInsured);
        lDto.TotSumInsured = TotalSI;
        setIsLoading(false);

        lDto.InsurableItem[0].RiskItems[0].TotalNumberofPheasant = "";
        // lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = objectPath.get(
        //   lDto,
        //   "Temp.DataGridValues.0.TotalSumInsured"
        // );
        setDto({ ...lDto });
        RemoveUpload();
      }
    });
  };

  const AddUpload = (flag) => {
    // newSearchInput = "";
    // setSearchInput(newSearchInput);
    lDto.Temp.Upload = lDto.Temp.UploadData;
    if (flag) {
      setIsLoading(true);
      const updatedId = Math.floor(Math.random() * 100) + 1;
      const tempObj = {
        UniqueId: updatedId,
        BatchNumber: lDto.InsurableItem[0].RiskItems[0].BatchNumber,
        NumberofPheasant: lDto.InsurableItem[0].RiskItems[0].NumberofPheasant,
        PurposeofUsage: lDto.InsurableItem[0].RiskItems[0].PurposeofUsage,
        NameofPheasant: lDto.InsurableItem[0].RiskItems[0].NameofPheasant,
        Category: lDto.InsurableItem[0].RiskItems[0].Category,
        BreedCasteVariety: lDto.InsurableItem[0].RiskItems[0].BreedCasteVariety,
        FarmingType: lDto.InsurableItem[0].RiskItems[0].FarmingType,
        Color: lDto.InsurableItem[0].RiskItems[0].Color,
        Weight: lDto.InsurableItem[0].RiskItems[0].Weight,
        Age: lDto.InsurableItem[0].RiskItems[0].Age,
        Remarks: lDto.InsurableItem[0].RiskItems[0].Remarks,
        CurrentHealthStatus: lDto.InsurableItem[0].RiskItems[0].CurrentHealthStatus,
        SumInsured: lDto.InsurableItem[0].RiskItems[0].SumInsured,
        Rate: lDto.InsurableItem[0].RiskItems[0].Rate,
        PremiumAmount: lDto.InsurableItem[0].RiskItems[0].PremiumAmount,
      };
      lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = tempObj.SumInsured;
      lDto.InsurableItem[0].RiskItems[0].TotalNumberofPheasant = tempObj.NumberofPheasant;
      lDto.InsurableItem[0].RiskItems[0].DirectDiscount = lDto.InsurableItem[0].DirectDiscount;
      PremiumCalc(tempObj);
    }
  };
  const onAddBranchDetails = () => {
    lDto.Bankdetails.BranchDetails.push({ ...BranchDetails() });
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
          justifyContent: "end",
          visible: i !== 0,
          onClick: () => RemoveBranchDetails(i),
        },
        {
          type: "AutoComplete",
          label: "Branch Name",
          visible: masters.BranchMasters.length > 0,
          options: masters.BranchMasters,
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
          required: true,
          customOnChange: (e, a) => handleBranchName(e, a, i),
        },
        {
          type: "Input",
          label: "Country",
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "Input",
          label: "Province/State",
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
          required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "District",
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.District`,
          required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "Municipality",
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          disabled: true,
        },
        {
          type: "Input",
          label: "Ward Number",
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          disabled: true,
        },
        {
          type: "Input",
          label: "Address(English)",
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          name: "BranchNameinEnglish",
          disabled: true,
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
          path: `Bankdetails.BranchDetails.${i}.Country`,
          options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State4", i),
        },
        {
          type: "AutoComplete",
          label: "District",
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
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          options:
            lDto.Bankdetails.BranchDetails[i].District !== ""
              ? masters.placeMasters[i].municipality
              : [],
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
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "BranchNameinEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Address(Nepali)",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.AddressNepali`,
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

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Input",
            disabled: true,
            label: "Doc Type",
            visible: true,
            required: true,
            path: "DocType",
            disableOnReset: true,
          },
          {
            type: "Input",
            disabled: true,
            label: "Department",
            visible: true,
            required: true,
            path: "Department",
            disableOnReset: true,
          },
          {
            type: "Input",
            disabled: true,
            label: "Class",
            visible: true,
            required: true,
            path: "Class",
            disableOnReset: true,
          },
          {
            type: "Input",
            disabled: true,
            label: "Sub-Class",
            visible: true,
            required: true,
            path: "SubClass",
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Premium Type",
            visible: true,
            required: true,
            path: "PremiumType",
            options: masters.PremiumTypePheasant,
            customOnChange: (e, a) => handleYearly(e, a),
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: true,
            required: true,
            dateFormat: "m/d/Y",
            path: "PolicyStartDate",
            minDate: PolicyStartDateMinDate(),
            maxDate: PolicyStartDateMaxDate(),
            customOnChange: (e, d) => handlePolicyStartDates1(e, d),
          },
          {
            type: "Input",
            label: "No Of Days",
            visible: true,
            required: true,
            path: "NumberofDays",
            disabled: lDto.PremiumType === "Yearly" || lDto.PremiumType === "",
            onChangeFuncs: [handlePolicyDates1],
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            dateFormat: "m/d/Y",
            disabled: true,
            visible: true,
            required: true,
            path: "PolicyEndDate",
          },
          {
            type: "Input",
            label: "Business Type",
            visible: true,
            required: true,
            path: "BusinessType",
            disabled: true,
            disableOnReset: true,
            options: masters.BusinessType,
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: true,
            required: true,
            options: masters.DirectDiscount,
            path: "InsurableItem.0.DirectDiscount",
          },
          // {
          //   type: "Button",
          //   label: "ADD DETAILS",
          //   visible: true,
          //   variant: "outlined",
          //   component: "label",
          //   typeFormat: (
          //     <input hidden accept=".xlsx" type="file" id="fileInput" onChange={onAdDetails} />
          //   ),
          //   spacing: 12,
          // },
        ],
        [
          {
            type: "DataGrid",
            visible: true,
            rowId: "rowID",
            spacing: 12,
            rowHeight: 70,
            columns: [
              {
                field: "TotalSumInsured",
                headerName: "Sum Insured",
                width: 350,
                disableColumnMenu: true,
                sortable: false,
                renderCell: (param) => (
                  <MDInput
                    name="TotalSumInsured"
                    label="Sum Insured"
                    value={param.row.TotalSumInsured}
                    onChange={(e) => handleDataGrid(e, param)}
                    error={
                      masters1.DataGridval.TotalSumInsured === true ||
                      masters1.DataGridval.TotalSumInsuredNext === true
                    }
                    helperText={
                      (masters1.DataGridval.TotalSumInsured === true
                        ? "Accept only Numbers greater then Zero"
                        : "") ||
                      (masters1.DataGridval.TotalSumInsuredNext === true
                        ? "This field required"
                        : "")
                    }
                    onBlur={handleDataGridRegVal}
                    sx={redAsterisk}
                    required
                  />
                ),
              },
              {
                field: "Rate(%)",
                headerNmae: "Rate(%)",
                width: 350,
                disableColumnMenu: true,
                sortable: false,
                renderCell: () => (
                  <MDTypography>{lDto.Temp.DataGridValues[0]["Rate(%)"]}</MDTypography>
                ),
              },
              {
                field: "Premium Amount",
                headerName: "Premium Amount",
                width: 350,
                disableColumnMenu: true,
                sortable: false,
                renderCell: () => (
                  <MDTypography>{lDto.Temp.DataGridValues[0]["Premium Amount"]}</MDTypography>
                ),
              },
            ],
            path: "Temp.DataGridValues",
          },
        ],
        [
          {
            type: "Input",
            label: "Number of Owners/Partners",
            visible: true,
            required: true,
            disableOnReset: true,
            path: "OwnerAccidentalDetails.NumberofOwnersPartners",
            onChangeFuncs: [IsNumeric1],
            onBlurFuncs: [IsNumeric1],
            customOnChange: handleownerdetails,
          },
          {
            type: "Input",
            disabled: true,
            label: "Personal Accidental Sum Insured (Per Person)",
            visible: true,
            required: true,
            path: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
            disableOnReset: true,
          },
          {
            type: "Input",
            disabled: true,
            label: "Accidental Premium (Per Person)",
            visible: true,
            path: "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Typography",
            // label: "",
            visible: true,
            spacing: 3,
          },

          {
            type: "Input",
            disabled: true,
            label: "Total Accidental Sum Insured",
            visible: true,
            required: true,
            path: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
            disableOnReset: true,
          },
          {
            type: "Input",
            disabled: true,
            label: "Total Accidental Premium",
            visible: true,
            path: "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
            // required: true,
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
            customOnChange: (e, a) => handleBanknoBank(e, a),
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
            disabled: true,
            path: "Bankdetails.Municipality",
            // options: lDto.Bankdetails.District !== "" ? masters.Municipality1 : [],
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality1"),
          },
          {
            type: "Input",
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
          },
          {
            type: "Input",
            label: "Designation",
            visible: true,
            path: "ProposerDetails.0.DesignationoftheProposer",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            path: "ProposerDetails.0.ProposerOccupation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.0.ProposerAddress",
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
            InputProps: { maxLength: 10 },
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
          {
            type: "Input",
            label: "Agri Technician Name",
            visible: true,
            path: "ProposerDetails.0.AgriTechnicianName",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
          },
          {
            type: "Input",
            label: "Agri Technician Address",
            visible: true,
            path: "ProposerDetails.0.AgriTechnicianAddress",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Input",
            label: "Batch Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.BatchNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "BatchNumber",
          },
          {
            type: "Input",
            label: "Number of Pheasant",
            visible: true,
            required: true,
            validationId: 1,
            validationDisableOnProceed: lDto.Temp.UploadData.length !== 0,
            path: "InsurableItem.0.RiskItems.0.NumberofPheasant",
            onChangeFuncs: [IsNumeric1],
          },
          {
            type: "Input",
            label: "Purpose of Usage",
            visible: true,
            required: true,
            validationId: 1,
            validationDisableOnProceed: lDto.Temp.UploadData.length !== 0,
            path: "InsurableItem.0.RiskItems.0.PurposeofUsage",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Name of Pheasant",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.NameofPheasant",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Category",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Category",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Breed/Caste/Variety",
            visible: true,
            required: true,
            validationId: 1,
            validationDisableOnProceed: lDto.Temp.UploadData.length !== 0,
            path: "InsurableItem.0.RiskItems.0.BreedCasteVariety",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Farming Type",
            visible: true,
            required: true,
            validationId: 1,
            validationDisableOnProceed: lDto.Temp.UploadData.length !== 0,
            path: "InsurableItem.0.RiskItems.0.FarmingType",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Color",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Color",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Weight",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Weight",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Age",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Age",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Remarks",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Remarks",
            name: "Remarks",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Current Health Status",
            visible: true,
            required: true,
            validationId: 1,
            validationDisableOnProceed: lDto.Temp.UploadData.length !== 0,
            path: "InsurableItem.0.RiskItems.0.CurrentHealthStatus",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Sum Insured",
            visible: true,
            required: true,
            validationId: 1,
            validationDisableOnProceed: lDto.Temp.UploadData.length !== 0,
            path: "InsurableItem.0.RiskItems.0.SumInsured",
            onChangeFuncs: [IsNumeric1],
            // onChange: (e) => handleDataGrid1(e),
          },
          {
            type: "Input",
            disabled: true,
            label: "Rate (%)",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Rate",
            // onChangeFuncs: [IsNumeric],
            disableOnReset: true,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 10.4,
          },

          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 1,
            label: "ADD",
            visible: true,
            variant: "contained",
            spacing: 0.8,
            disabled: isLoading,
            onClick: AddUpload,
          },
          {
            type: "Button",
            label: "RESET",
            visible: true,
            variant: "outlined",
            spacing: 0.8,
            onClick: () => RemoveUpload(),
          },

          {
            type: "Custom",
            visible: lDto.TotSumInsured !== "" && lDto.TotSumInsured !== undefined,
            spacing: 8,
            return: (
              <stack direction="row" spacing={2}>
                <Typography>
                  <strong>Pheasant Details Summary</strong>
                </Typography>
              </stack>
            ),
          },
          {
            type: "Custom",
            visible: lDto.TotSumInsured !== "" && lDto.TotSumInsured !== undefined,
            spacing: 3,
            return: (
              <MDInput
                // value={searchInput}
                // onChange={onSearchFilter}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={
                  // newSearchInput = e.target.value;
                  // setSearchInput(newSearchInput);
                  handleSearch
                }
              />
            ),
          },
          {
            type: "Button",
            label: "Clear",
            visible: lDto.TotSumInsured !== "" && lDto.TotSumInsured !== undefined,
            variant: "outlined",
            spacing: 1,
            onClick: () => OnClearData(),
          },
          {
            type: "DataGrid",
            label: "Pheasant Details Summary",
            visible: lDto.TotSumInsured !== "" && lDto.TotSumInsured !== undefined,
            rowId: "UniqueId",
            spacing: 12,
            columns: [
              {
                field: "BatchNumber",
                headerName: "Batch Number",
                width: 200,
              },
              { field: "NumberofPheasant", headerName: "Number of Pheasant", width: 200 },
              { field: "PurposeofUsage", headerName: "Purpose of Usage", width: 200 },
              { field: "NameofPheasant", headerName: "Name of Pheasant", width: 200 },
              { field: "Category", headerName: "Category", width: 200 },
              { field: "BreedCasteVariety", headerName: "Breed/Caste/Variety", width: 200 },
              { field: "FarmingType", headerName: "Farming Type", width: 200 },
              { field: "Color", headerName: "Color", width: 100 },
              { field: "Weight", headerName: "Weight", width: 100 },
              { field: "Age", headerName: "Age", width: 100 },
              { field: "Remarks", headerName: "Remarks", width: 200 },
              { field: "CurrentHealthStatus", headerName: "Current Health Status", width: 200 },
              { field: "SumInsured", headerName: "Sum Insured", width: 200 },
              { field: "Rate", headerName: "Rate (%)", width: 200 },
              { field: "PremiumAmount", headerName: "Premium Amount", width: 200 },
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
            path: "Temp.Upload",
          },
          {
            type: "Custom",
            visible: true,
            spacing: 5.2,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                p={3}
              >
                <MDTypography variant="h6">Total Sum Insured</MDTypography>
                <MDTypography>रु {formater.format(lDto.TotSumInsured)}</MDTypography>
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
            spacing: 5.2,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                p={3}
              >
                <MDTypography variant="h6">Total Number of Pheasant</MDTypography>
                <MDTypography>{formater.format(lDto.TotalNumberPheasant)}</MDTypography>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            label: "Vaccination/Other Documents",
            visible: true,
            spacing: 12,
            fontSize: 16,
          },
          {
            type: "Button",
            label: "Add Document",
            visible: true,
            startIcon: <AddIcon />,
            variant: "outlined",
            onClick: onAddOtherDocument,
            spacing: 12,
          },
          ...spreadOtherDocumentDetails(),
          {
            type: "Input",
            label: "General Description",
            visible: true,
            path: "InsurableItem.0.VaccinationandOtherDocuments.GeneralDescription",
          },
        ],
        [],
        [],
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
            disabled: lDto.InsurableItem[0].DirectDiscount === "Yes",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentCode"),
          },
          {
            type: "AutoComplete",
            label: "Agent Name ",
            visible: true,
            path: "Channel.AgentName",
            options: masters.Agent,
            disabled: lDto.InsurableItem[0].DirectDiscount === "Yes",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Code",
            visible: true,
            path: "Channel.SubAgentCode",
            options: masters.SubAgent,
            disabled: lDto.InsurableItem[0].DirectDiscount === "Yes",
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgent"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Name",
            visible: true,
            path: "Channel.SubAgentName",
            disabled: lDto.InsurableItem[0].DirectDiscount === "Yes",
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
            disabled: true,
            label: "Number of Owners/Partners",
            path: "OwnerAccidentalDetails.NumberofOwnersPartners",
            visible: true,
            required: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric1],
          },
          {
            type: "Input",
            disabled: true,
            label: "Personal Accidental Sum Insured (Per Person)",
            path: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
            visible: true,
            required: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            disabled: true,
            disableOnReset: true,
            label: "Total Accidental Sum Insured",
            path: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
            visible: true,
            required: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Nominee Name",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeName",
          },
          {
            type: "Input",
            label: "Nominee Citizenship Number",
            visible: true,
            path: "NomineeDetails.NomineeCitizenshipNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Father Name",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeFather",
          },
          {
            type: "Input",
            label: "Mother Name",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeMother",
          },
          {
            type: "Input",
            label: "Relationship",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeRelationship",
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeContactNumber",
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeHouseNumber",
          },
        ],
        [],
      ];
      break;

    case 5:
      data = [
        [
          {
            type: "Typography",
            visible: true,
            label: "",
            spacing: 3,
          },
          {
            type: "Custom",
            visible: true,
            // required: true,
            spacing: 6,
            return: (
              <MDBox sx={{ backgroundColor: "#eeeeee", p: "15px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>Basic Premium</Typography>
                    <Typography>Direct Discount</Typography>
                    <Typography>Premium After Discount</Typography>
                    <Typography>Govt Subsidy</Typography>
                    <Typography>Premium After Subsidy</Typography>
                    <Typography>Stamp Duty</Typography>
                    <Typography>Per Person Accidental Premium</Typography>
                    <Typography>Total Accidental Premium</Typography>
                    {/* <Typography>Total Premium to be paid by Customer</Typography> */}
                  </Grid>

                  <Grid item xs={0.5}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    {/* <Typography>रु</Typography> */}
                  </Grid>
                  <Grid item xs={2.5}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.BasicPremium")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.PremiumAfterDiscount"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.GovtSubsidy")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.StampDuty")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium"
                      )}
                    </Typography>
                  </Grid>
                  <List
                    sx={{
                      width: "100%",
                      height: "1px",
                      bgcolor: "#9e9e9e",
                    }}
                  />
                  <Grid item xs={8}>
                    <Typography>
                      <b>Total Premium to be paid by Customer</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={0.5}>
                    <Typography>
                      <b>रु</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={2.5}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      <b>
                        {" "}
                        {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.FinalPremium")}
                      </b>
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            ),
          },

          {
            type: "Typography",
            visible: lDto.Channel.AgentCode !== "" && lDto.Channel.AgentCode !== "0000",
            spacing: 3,
          },
          {
            type: "Typography",
            visible: lDto.Channel.AgentCode !== "" && lDto.Channel.AgentCode !== "0000",
            spacing: 3,
          },
          {
            type: "Custom",
            visible: lDto.Channel.AgentCode !== "" && lDto.Channel.AgentCode !== "0000",
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
                    {lDto?.ProposalNo === undefined ? lDto?.proposalNo : lDto?.ProposalNo}
                  </Typography>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    Debit Note Send For Approval
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
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
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
const getOnNextClick = async ({
  activeStep,
  dto,
  masters,
  setMasters,
  setDto,
  setBackDropFlag,
}) => {
  let fun = false;
  const lDto = dto;
  const masters1 = masters;

  switch (activeStep) {
    case 0:
      // if (
      //   objectPath.get(lDto, "Temp.DataGridValue.0.TotalSumInsured") !== "" ||
      //   objectPath.get(lDto, "Temp.DataGridValue.0.TotalSumInsured") !== undefined
      // ) {
      //   objectPath.set(
      //     lDto,
      //     "InsurableItem.0.RiskItems.0.TotalSumInsured",
      //     objectPath.get(lDto, "Temp.DataGridValue.0.TotalSumInsured")
      //   );
      //   setDto({ ...lDto });
      // } else {
      //   objectPath.set(lDto, "InsurableItem.0.RiskItems.0.TotalSumInsured", 0);
      //   setDto({ ...lDto });
      // }
      lDto.InsurableItem[0].RiskItems[0].TotalSumInsured =
        lDto.Temp.DataGridValues[0].TotalSumInsured;
      if (
        lDto.Temp.DataGridValues[0].TotalSumInsured !== "" &&
        lDto.Temp.DataGridValues[0].TotalSumInsured !== undefined
      ) {
        setDto({ ...lDto });
        fun = await GenericApi("NepalPheasant", "NepalPheasentAPI", lDto).then(async (x) => {
          if (x.finalResult) {
            lDto.Temp.DataGridValues[0]["Premium Amount"] = formater.format(
              x.finalResult.BasicPremium
            );
            objectPath.set(
              lDto,
              "Temp.DataGridValues.0.Rate(%)",
              formater.format(x.finalResult.NepalPheasantBaseRate)
            );
            // objectPath.set(lDto, "PremiumDetails", x.finalResult);
            objectPath.set(
              lDto,
              "PaymentAmount",
              parseFloat(x.finalResult.FinalPremium).toFixed(2)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
              formater.format(x.finalResult.DirectDiscountAmount)
            );
            objectPath.set(
              lDto,
              "InsurableItem.0.RiskItems.0.Rate",
              formater.format(x.finalResult.NepalPheasantBaseRate)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
              formater.format(x.finalResult.PerPersonAccidentalPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.PremiumAfterDiscount",
              formater.format(x.finalResult.PremiumAfterDiscount)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.GovtSubsidy",
              formater.format(x.finalResult.GovtSubsidy)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
              formater.format(x.finalResult.PremiumAfterSubsidy)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.StampDuty",
              formater.format(x.finalResult.StampDuty)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.BasicPremium",
              formater.format(x.finalResult.BasicPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
              formater.format(x.finalResult.TotalAccidentalPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
              formater.format(x.finalResult.DirectDiscountAmount)
            );
            objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
              formater.format(x.finalResult.CommissionPercentage)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.CommissionAmount",
              formater.format(x.finalResult.CommissionAmount)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.FinalPremium",
              formater.format(x.finalResult.FinalPremium)
            );
            setDto({ ...lDto });
            lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
            const res1 = await SaveQuotation(lDto);
            objectPath.set(lDto, "Quotation No", res1.data.quotation.quoteNo);
            lDto.ProposerDetails = [lDto.ProposerDetails];
            setDto({ ...lDto });
            setBackDropFlag(false);
            const fun1 = await swal2
              .fire({
                title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                html: `<div style="display: flex; flex-direction: row;">
              <div style="flex: 14; text-align: left; margin-left: 0rem" ">
              <div>Basic Premium</div>
              <div>Direct Discount Amount</div>
              <div>Premium After Discount</div>
              <div>Govt Subsidy</div>
              <div>Premium After Subsidy</div>
              <div>Stamp Duty</div>
              <div>Total Accidental Premium</div>
              <div><b>Total Premium to be paid by Customer</B></div>
            </div>
            <div style="flex: 0.6;text-align: right;font-size:16.3px; margin-right: 0rem" ">
            <div>रु</div>
            <div>रु</div>
            <div>रु</div>
            <div>रु</div>
            <div>रु</div>
            <div>रु</div>
            <div>रु</div>
            <div><b>रु</b></div>
          </div>
          <div style="flex: 3.5; text-align: right; margin-right: 0rem" ">
              <div> ${formater.format(x.finalResult.BasicPremium)}</div>
              <div> ${formater.format(x.finalResult.DirectDiscountAmount)}</div>
              <div> ${formater.format(x.finalResult.PremiumAfterDiscount)}</div>
              <div>${formater.format(x.finalResult.GovtSubsidy)}</div>
              <div>${formater.format(x.finalResult.PremiumAfterSubsidy)}</div>
              <div>${formater.format(x.finalResult.StampDuty)}</div>
              <div>${formater.format(x.finalResult.TotalAccidentalPremium)}</div>
              <div><b>${formater.format(x.finalResult.FinalPremium)}</b></div>
              </div>
              </div>`,
                showConfirmButton: true,
                width: 600,
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
      } else {
        masters1.DataGridval.TotalSumInsuredNext = true;
        setMasters({ ...masters1 });
      }
      break;
    case 1:
      fun = true;
      break;
    case 2:
      // if (newSearchInput !== "" && lDto.Temp.UploadData.length !== 0) {
      if (
        lDto.Temp.UploadData.length !== 0 ||
        lDto.Temp.Upload.length < lDto.Temp.UploadData.length
      ) {
        lDto.Temp.Upload = lDto.Temp.UploadData;
        // newSearchInput = "";
        setDto({ ...lDto });
        fun = true;
      }
      if (lDto.Temp.Upload.length === 0) {
        fun = false;
        swal2.fire({
          icon: "error",
          text: "Please Add the Required Data",
        });
      } else {
        fun = true;
      }
      break;
    case 3:
      lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = lDto.TotSumInsured;
      lDto.InsurableItem[0].RiskItems[0].TotalNumberofPheasant = lDto.TotalNumberofPheasant;
      fun = await GenericApi("NepalPheasant", "NepalPheasentAPI", lDto).then(async (x) => {
        console.log("x1", x);
        if (x.finalResult) {
          objectPath.set(lDto, "PremiumDetails", x.finalResult);
          // lDto.Temp.DataGridValues[0]["Premium Amount"] = formater.format(
          //   x.finalResult.FinalPremium
          // );
          objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.FinalPremium",
            formater.format(x.finalResult.FinalPremium)
          );
          // objectPath.set(
          //   lDto,
          //   "Temp.DataGridValues.0.Rate(%)",
          //   formater.format(x.finalResult.NepalPheasantBaseRate)
          // );
          objectPath.set(lDto, "PaymentAmount", parseFloat(x.finalResult.FinalPremium).toFixed(2));
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
            formater.format(x.finalResult.DirectDiscountAmount)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.BasicPremium",
            formater.format(x.finalResult.BasicPremium)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
            formater.format(x.finalResult.PerPersonAccidentalPremium)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.PremiumAfterDiscount",
            formater.format(x.finalResult.PremiumAfterDiscount)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.GovtSubsidy",
            formater.format(x.finalResult.GovtSubsidy)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
            formater.format(x.finalResult.PremiumAfterSubsidy)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.StampDuty",
            formater.format(x.finalResult.StampDuty)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
            formater.format(x.finalResult.TotalAccidentalPremium)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
            formater.format(x.finalResult.DirectDiscountAmount)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
            formater.format(x.finalResult.CommissionPercentage)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.CommissionAmount",
            formater.format(x.finalResult.CommissionAmount)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.TotalNumberPheasant",
            formater.format(lDto.TotalNumberPheasant)
          );
          objectPath.set(
            lDto,
            "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
            formater.format(lDto.TotSumInsured)
          );
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          const res1 = await SaveQuotation(lDto);
          objectPath.set(lDto, "Quotation No", res1.data.quotation.quoteNo);
          lDto.ProposerDetails = [lDto.ProposerDetails];
          setDto({ ...lDto });
        }
      });
      fun = true;
      break;

    case 4:
      // lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = lDto.Temp.UploadData[0].TotalSumInsured;
      if (lDto.proposalNo === undefined) {
        lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
        fun = await SaveCreateProposal(lDto).then(async (x) => {
          lDto.ProposerDetails = [lDto.ProposerDetails];
          if (x.data.proposalNumber) {
            await GetProductByCode("NepalPheasant").then(async (x2) => {
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              const res = await GetProposalByNumber(x.data.proposalNumber, x2.data.productId);
              lDto.KYCNo = res.data[0].policyDetails.KYCNo;
              lDto.ProposerDetails = [lDto.ProposerDetails];
              setDto({ ...lDto, proposalNo: x.data.proposalNumber });
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
        lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
        const x = await UpdateProposalDetails(lDto);
        lDto.ProposerDetails = [lDto.ProposerDetails];
        if (x.data.responseMessage === "Updated successfully") {
          await GetProductByCode("NepalPheasant").then(async (x2) => {
            lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
            const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);
            lDto.ProposerDetails = [lDto.ProposerDetails];
            lDto.KYCNo = res.data[0].policyDetails.KYCNo;
            lDto.proposalNo = x.data.data.proposalNo;
            setDto({ ...lDto });
            fun = true;
          });
        }
      }
      break;
    case 5:
      setBackDropFlag(false);
      fun = swal2
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
    default:
      fun = true;
      break;
  }
  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  const DataGridValue = {
    TotalSumInsured: "",
    "Rate(%)": "",
    "Premium Amount": "",
    rowID: 1,
  };

  const onReset1 = (dto, setDto) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.ProposerDetails[0].documentDetails = [{ ...docDetails() }];
    setDto({ ...lDto });
  };

  const onReset2 = (dto, setDto) => {
    const lDto = dto;
    lDto.TotalNumberPheasant = "";
    lDto.TotSumInsured = "";
    lDto.InsurableItem[0].VaccinationandOtherDocuments = [{ ...VaccinationandOtherDocuments() }];
    lDto.Temp.Upload = [];
    lDto.Temp.UploadData = [];
    setDto({ ...lDto });
  };

  const resetgrid = (dto, setDto) => {
    const lDto = dto;
    lDto.Temp.DataGridValues = [DataGridValue];
    lDto.OwnerAccidentalDetails.NumberofOwnersPartners = "1";
    lDto.OwnerAccidentalDetails.TotalAccidentalSumInsured = "200000";
    // lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = "";
    setDto({ ...lDto });
  };

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", onClick: resetgrid, visible: true },
        next: { label: "Calculate Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", onClick: onReset1, visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" }, // onClick: clearSearch,
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", onClick: onReset2, visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" }, //
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
        next: { label: "Proceed", visible: true },
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
    State: [],
    District: [],
    Municipality: [],
    BankDetails: [],
    BankorFinancialInstituionNameinEnglish: [],
    BranchMasters: [],
    placeMasters: [{ district: [], municipality: [] }],
    selectedRowIndex: [],
    selectedRowIndex2: [],
    DataGridval: {
      TotalSumInsured: false,
      TotalSumInsuredNext: false,
    },
  };

  const userDetails = additionalInformation?.loginUserDetails;
  if (userDetails && userDetails?.displayName) {
    lDto.AgentName = userDetails?.displayName;
    lDto.AgentMobileNo = userDetails?.contactNumber;
    lDto.ProductLogo = genericInfo.ProductLogo;
    lDto.CompanyName = process.env.REACT_APP_CompanyName;
    lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
    lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
    lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;
    setDto({ ...lDto });
  }

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
    await GetProdPartnermasterData("BranchName", {
      Description: masters.Company,
    }).then((res) => {
      masters.IssuingBranch = res.data;
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
