import { List, Stack, Grid, Typography, Checkbox } from "@mui/material";
import { useState } from "react";
import objectPath from "object-path";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Success from "assets/images/Nepal/Success.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import AddIcon from "@mui/icons-material/Add";
import swal2 from "sweetalert2";
import swal from "sweetalert";
import ClearIcon from "@mui/icons-material/Clear";
import {
  IsNumeric,
  IsFreetextNoSpace,
  IsMobileNumber,
  IsEmail,
  // IsNumaricSpecialNoSpace,
  addDays1,
  DateFormatFromDateObject,
} from "Common/Validations";
import { BranchDetails } from "./data/Json/CommercialJson";
import { BurglaryJson, docDetails, RenewaldocumentDetails } from "./data/Json/BurglaryJson";
import {
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  IsNumeric1,
  GetNPCommonMaster,
  GetProdPartnermasterData,
  GenericApi,
  SaveQuotation,
  Transliteration,
  // Documentuploadaws,
  SendNotification,
  SaveCreateProposal,
  UpdateProposalDetails,
  GetProposalByNumber,
  DocumenUpload,
  DeleteDocument,
  UpdateWorkflowStatus,
  Documentuploadaws,
  SavepolicyWFStatus,
  PolicyStartDateMinDate,
  NumberofDaysinYear,
  QuotationUpdate,
  PolicyStartDateMaxDate,
  GetProductByCode,
  // NoofDays,
  // NoofDays1,
} from "./data/APIs/MotorCycleApi";
import PaymentPage from "../../Payment";
import { GetTemplatePayload } from "../../Payment/Apis";
import { useDataController } from "../../../../../BrokerPortal/context";

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = BurglaryJson();
  if (
    (genericInfo.Flow &&
      (genericInfo.Flow === "DisApproveFlow" ||
        genericInfo.Flow === "Approved" ||
        genericInfo.Flow === "DebitFlow")) ||
    process.env.REACT_APP_AutoPopulateCustomerDetails === "true"
  ) {
    dto = { ...dto, ...PolicyDto };
    dto.ProposerDetails = [PolicyDto.ProposerDetails];
  }
  return dto;
};

const getProcessSteps = () => {
  const steps = [
    "Quote Page",
    "Customer Details",
    "Property Details for Burglary",
    "Risk Details",
    "Premium Break-Up",
    "Payment Page",
  ];
  return steps;
};

const getPageContent = ({ activeStep, dto }) => {
  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push({
        name: `Branch Details ${i + 1}`,
        visible:
          dto.FinancingType === "Bank/Financial Institution" &&
          dto.Bankdetails.BankCategory !== "" &&
          dto.Bankdetails.BankorFinancialInstituionNameinEnglish !== "",
      });
    });
    return arr;
  };

  const spreadMultiKYCDetails = () => {
    const arr = [];
    // dto.ProposerDetails.forEach((x, i) => {
    arr.push({ name: `Insured Details`, visible: dto.FinancingType !== "" });
    // });
    return arr;
  };

  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [{ name: "Quote Details", visible: true }];
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
      steps = [
        { name: "Property Details for Burglary", visible: true },
        {
          name: "Roll Over Documents",
          visible: dto.DocType === "RollOver",
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
      steps = [{ name: "Premium Summary", visible: true }]; //  Premium Break-Up
      break;

    case 5:
      steps = [{ name: "Payment Page", visible: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters1, setMasters }
const getSectionContent = ({ activeStep, masters, dto, setDto, setMasters }) => {
  let data = [];
  const lDto = dto;
  const masters1 = masters;

  const [control] = useDataController();
  const { genericInfo, loginUserDetails } = control;

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
    const proposalNo = objectPath.get(lDto, "proposalNo");
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
    // lDto.ProposerDetails = [lDto.ProposerDetails];
    let Class = "";

    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Class = 320;
    }
    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      Class = 320;
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
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNo);
      }
    });
    if (key === "SAVE DEBIT NOTE") {
      onSaveModalClose();
    }
  };

  const IsNumericGreaterThanZero = (number) => {
    const regex = /^(?!(0))[0-9]*$/;
    if (regex.test(number)) return true;
    return "Value must be greater than zero and Numeric";
  };

  const IsNumaricSpecialNoSpace = (str) => {
    const regex = /^[0-9-+]+[0-9-+\s]*$/;
    if (regex.test(str) || str === "") {
      return true;
    }
    return "Allows only numbers and special characters";
  };
  // const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  // const OnPSDSelect = (e, d) => {
  //   lDto.PolicyStartDate = d;
  //   const endDate = new Date(lDto.PolicyEndDate);
  //   const startDate = new Date(lDto.PolicyStartDate);
  //   const startYear = startDate.getFullYear();
  //   const endYear = endDate.getFullYear();
  //   const feb29datestartyear = isLeapYear(startYear) ? new Date(`02/29/${startYear}`) : null;
  //   const feb29dateendyear = isLeapYear(endYear) ? new Date(`02/29/${endYear}`) : null;
  //   if (
  //     (feb29datestartyear && startDate > feb29datestartyear && feb29datestartyear <= endDate) ||
  //     (feb29dateendyear && startDate <= feb29dateendyear && feb29dateendyear >= endDate) ||
  //     (feb29datestartyear && startDate > feb29datestartyear)
  //   ) {
  //     if (lDto.PolicyEndDate === "" && lDto.NumberofDays === "") {
  //       lDto.NumberofDays = 365;
  //       lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //     }
  //     if (lDto.NumberofDays !== 365 && lDto.NumberofDays !== 366) {
  //       lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //     } else {
  //       lDto.NumberofDays = 365;
  //       lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //     }
  //     // lDto.NumberofDays = 365;
  //   } else if (lDto.PolicyEndDate === "" && lDto.NumberofDays === "") {
  //     lDto.NumberofDays = 366;
  //     lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //   } else if (lDto.NumberofDays !== 365 && lDto.NumberofDays !== 366) {
  //     lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //   } else {
  //     lDto.NumberofDays = 366;
  //     lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //   }
  //   if (lDto.NumberofDays === NumberofDaysinYear(new Date().getFullYear())) {
  //     lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //   }
  //   if (lDto.PolicyStartDate === "") {
  //     lDto.PolicyEndDate = "";
  //   }
  //   setDto({ ...lDto });
  // };
  const OnPSDSelect = (e, d) => {
    lDto.PolicyStartDate = d;
    // if (lDto.NumberofDays === "") {
    //   lDto.NumberofDays = NumberofDaysinYear(new Date(), new Date().getFullYear());
    // }
    if (Number(lDto.NumberofDays) > Number(NumberofDaysinYear(d, d.split("/")[2]))) {
      lDto.NumberofDays = NumberofDaysinYear(d, d.split("/")[2]);
    }
    if (lDto.NumberofDays !== "") {
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    }
    if (d === "") {
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };

  // const OnNumberofDays = (e) => {
  //   lDto.NumberofDays = e.target.value;
  //   lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, e.target.value);
  //   setDto({ ...lDto });
  //   const endDate = new Date(lDto.PolicyEndDate);
  //   const startDate = new Date(lDto.PolicyStartDate);
  //   const startYear = startDate.getFullYear();
  //   const endYear = endDate.getFullYear();
  //   const feb29datestartyear = isLeapYear(startYear) ? new Date(`02/29/${startYear}`) : null;
  //   const feb29dateendyear = isLeapYear(endYear) ? new Date(`02/29/${endYear}`) : null;
  //   if (
  //     (feb29datestartyear && startDate > feb29datestartyear && feb29datestartyear <= endDate) ||
  //     (feb29dateendyear && startDate <= feb29dateendyear && feb29dateendyear >= endDate) ||
  //     (feb29datestartyear && startDate > feb29datestartyear)
  //   ) {
  //     if (lDto.NumberofDays > 365) {
  //       swal({
  //         icon: "error",
  //         text: `Number of days should be in between 1 to 365 days`,
  //         confirmButtonColor: "#0079CE",
  //       });
  //       lDto.NumberofDays = "";
  //     }
  //   } else if (lDto.NumberofDays > 366) {
  //     swal({
  //       icon: "error",
  //       text: `Number of days should be in between 1 to 366 days`,
  //       confirmButtonColor: "#0079CE",
  //     });
  //     lDto.NumberofDays = "";
  //   }
  //   if (
  //     (lDto.PolicyStartDate === "" && lDto.NumberofDays !== "") ||
  //     (lDto.PolicyStartDate !== "" && lDto.NumberofDays === "") ||
  //     (lDto.PolicyStartDate === "" && lDto.NumberofDays === "")
  //   ) {
  //     lDto.PolicyEndDate = "";
  //   }

  //   setDto({ ...lDto });
  // };
  const OnNumberofDays = (e) => {
    lDto.NumberofDays = e.target.value;
    if (lDto.PolicyStartDate !== "") {
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, e.target.value);
    }
    let numberofDays = "";
    if (lDto.PolicyStartDate === "") {
      numberofDays = NumberofDaysinYear(new Date(), new Date().getFullYear());
    } else {
      numberofDays = NumberofDaysinYear(lDto.PolicyStartDate, lDto.PolicyStartDate.split("/")[2]);
    }
    if (Number(lDto.NumberofDays) > Number(numberofDays)) {
      swal({
        icon: "error",
        text: `Number of days should be in between 1 to ${Number(numberofDays)} days`,
        confirmButtonColor: "#0079CE",
      });
      lDto.NumberofDays = "";
    }
    if (e.target.value === "") {
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };
  const handleTotalSumInsured = async (e) => {
    if ((e.target.value !== "" || e.target.value !== undefined) && e.target.value <= 5000000) {
      lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = e.target.value;
      setDto({ ...lDto });
    } else {
      swal({
        icon: "error",
        text: "Maximum Sum Insured should be 50 Lakhs",
      });
      lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = "";
      setDto({ ...lDto });
    }
    // lDto.Channel.AgentCode = "";
    // lDto.Channel.AgentName = "";
    // lDto.ICShortName = masters.Company;
    lDto.ProductLogo = genericInfo.ProductLogo;
    lDto.CompanyName = process.env.REACT_APP_CompanyName;
    lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
    lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
    lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;
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
    //     lDto.ICShortName = res.data[0].Description;
    //   });
    // }
    setDto({ ...lDto });
    setMasters({ ...masters1 });
  };

  const handleRenewalDocs = (e, a) => {
    lDto.DocType = a.mValue;
    setDto({ ...lDto });
    if (a !== "" && a.mValue === "Fresh") {
      lDto.RenewaldocumentDetails = RenewaldocumentDetails();
      setDto({ ...lDto });
    }
  };

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
        const BusinessTypeCode = lDto.DocType.split("")[0];
        lDto.PolicyPrefix = a.ProvinceCode.concat("/", a.ShortCode, "/", "MSI").concat(
          "/",
          "BHB",
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

  const onBlurTransliteration = async (e, index, EF, ET) => {
    EF(false);
    ET("");
    if (process.env.NODE_ENV === "production") {
      const iText = e.target.value;
      const varName = e.target.name;
      const obj = {
        textList: [{ Text: iText }],
      };
      const res = await Transliteration(obj);
      const oText = res?.[0]?.text ? res[0].text : "";
      // const oText = res[0].text;
      if (varName === "PermanentAddressEnglish12")
        lDto.ProposerDetails[index].PermanentAddressNepali = oText;
      if (varName === "GrandFatherNameEnglish")
        lDto.ProposerDetails[index].GrandfatherNameNepali = oText;
      if (varName === "FatherNameEnglish2") lDto.ProposerDetails[index].FatherNameNepali = oText;
      if (varName === "TemporaryAddressEnglish1")
        lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = oText;
      if (varName === "CityEnglish1")
        lDto.ProposerDetails[index].PermanentAdrress.CityNepali = oText;
      if (varName === "TownEnglish1")
        lDto.ProposerDetails[index].PermanentAdrress.TownNepali = oText;
      if (varName === "WifeNameEnglish12") lDto.ProposerDetails[index].WifeNameNepali = oText;
      if (varName === "PermanentAddressEnglish1")
        lDto.ProposerDetails[index].PermanentAdrress.AddressNepali = oText;
      if (varName === "HusbandNameEnglish12") lDto.ProposerDetails[index].HusbandNameNepali = oText;
      if (varName === "TemporaryAddressEnglish11") {
        lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = oText;
      }
      if (varName === "PermanentAdrressEnglish") {
        lDto.ProposerDetails[index].PermanentAdrress.AddressNepali = oText;
      }
      if (varName === "BankorFinancialInstituionNameinEnglish") {
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = oText;
      }
      if (varName === "AddressEnglishBank") {
        lDto.Bankdetails.AddressNepali = oText;
      }
      if (varName === "InsuredNameEnglish12") {
        lDto.ProposerDetails[index].InsuredNameNepali = oText;
      }
      if (varName === "AddressEnglish2") {
        lDto.ProposerDetails[0].AddressNepal = oText;
      }
      if (varName === "AddressEnglish1") {
        lDto.Bankdetails.BranchDetails[index].AddressNepali = oText;
      }
      if (varName === "TemporaryAddressEnglish") {
        lDto.ProposerDetails[0].TemporaryAddressNepali = oText;
      }
      if (varName === "HusbandNameEnglish") {
        lDto.ProposerDetails[0].HusbandNameNepali = oText;
      }
      if (varName === "WifeNameEnglish") {
        lDto.ProposerDetails[0].WifeNameNepali = oText;
      }
      if (varName === "FatherNameEnglish1") {
        lDto.ProposerDetails[index].FatherNameNepali = oText;
      }
      if (varName === "GrandfatherNameEnglish12") {
        lDto.ProposerDetails[0].GrandfatherNameNepali = oText;
      }
      if (varName === "AddressEnglish3") {
        lDto.ProposerDetails[0].PermanentAdrress.AddressNepali = oText;
      }
      if (varName === "TownEnglish") {
        lDto.ProposerDetails[index].PermanentAdrress.TownNepali = oText;
      }
      if (varName === "CityEnglish") {
        lDto.ProposerDetails[index].PermanentAdrress.CityNepali = oText;
      }
      if (varName === "TempAddresEnglish12") {
        lDto.ProposerDetails[index].PermanentAdrress.TempAddresNepali = oText;
      }
      if (varName === "ResidenceEnglish") {
        lDto.ProposerDetails[index].CommunicationAddress.ResidenceNepali = oText;
      }
      if (varName === "MemberNameEnglish") {
        lDto.ProposerDetails[index].MemberNameNepali = oText;
      }
      if (varName === "DesignationEnglish") {
        lDto.ProposerDetails[index].DesignationNepali = oText;
      }
      if (varName === "HusbandNameEnglish1") {
        lDto.ProposerDetails[index].HusbandNameNepali = oText;
      }
      if (varName === "WifeNameEnglish1") {
        lDto.ProposerDetails[index].WifeNameNepali = oText;
      }
      if (varName === "GrandfatherNameEnglish1") {
        lDto.ProposerDetails[index].GrandfatherNameNepali = oText;
      }
      if (varName === "FatherNameEng") {
        lDto.ProposerDetails[0].FatherNameNepali = oText;
      }
      if (varName === "CareofNameEnglish") {
        lDto.ProposerDetails[0].CareofNameNepali = oText;
      }
      if (varName === "CareofAddressEnglish") {
        lDto.ProposerDetails[0].CareofAddressNepali = oText;
      }
      if (varName === "ProprietorNameEnglish") {
        lDto.ProposerDetails[0].ProprietorNameNepali = oText;
      }
      if (varName === "AddressEng1") {
        lDto.RiskAddressDetails.AddressNepali = oText;
      }
      if (varName === "ToleStreetNameEnglish1") {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ToleStreetNameNepali = oText;
      }
      setDto({ ...lDto });
    }
  };
  const OnPlaceSelect = async (e, a, n, index) => {
    if (n === "State6") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ProvinceState = a.mValue;
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        masters1.District6 = res.data;
        masters1.Municipality6 = [];
      } else {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ProvinceState = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
        masters1.District6 = [];
        masters1.Municipality6 = [];
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
        masters1.Municipality6 = [];
      }
    }
    if (n === "Municipality6") {
      if (a !== null) {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = a.mValue;
      } else {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
      }
    }

    if (n === "State1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.RiskAddressDetails.ProvinceState = a.mValue;
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        masters1.District1 = res.data;
        masters1.Municipality1 = [];
      } else {
        lDto.RiskAddressDetails.ProvinceState = "";
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        masters1.District1 = [];
        masters1.Municipality1 = [];
      }
    }
    if (n === "District1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.RiskAddressDetails.District = a.mValue;
        lDto.RiskAddressDetails.Municipality = "";
        masters1.Municipality1 = res.data;
      } else {
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        masters1.Municipality1 = [];
      }
    }
    if (n === "Municipality1") {
      if (a !== null) {
        lDto.RiskAddressDetails.Municipality = a.mValue;
      } else {
        lDto.RiskAddressDetails.Municipality = "";
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
    if (n === "Municipality2") {
      if (a !== null) {
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = a.mValue;
      } else {
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
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
        masters1.Districtnew = [];
        masters1.Municipalitynew = [];
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].ProvinceState = a.mValue;
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.Districtnew = res.data;
      } else {
        lDto.Bankdetails.BranchDetails[index].ProvinceState = "";
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.Districtnew = [];
        masters1.Municipalitynew = [];
      }
    }
    if (n === "District4") {
      if (a !== null) {
        masters1.Municipalitynew = [];
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].District = a.mValue;
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.Municipalitynew = res.data;
      } else {
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.Municipalitynew = [];
      }
    }
    setDto({ ...lDto });
    setMasters({ ...masters1 });
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

  const onAddDocument = (i) => {
    lDto.ProposerDetails[i].documentDetails = [
      ...lDto.ProposerDetails[i].documentDetails,
      { ...docDetails() },
    ];

    setDto({ ...lDto });
  };

  const handleDublicateDoc = (e, DocName, i1, index) => {
    lDto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      if (x.DocName !== "" && x.DocName === e.target.value && i !== index) {
        lDto.ProposerDetails[i1].documentDetails[index].DocName = "";
        swal({
          icon: "error",
          text: `"${DocName}" Already Exist`,
        });
      }
    });
    setDto({ ...lDto });
  };
  // const RemoveMultiKYC = (e) => {
  //   lDto.IsMultiKYCApplicable = e.target.value;

  //   if (lDto.IsMultiKYCApplicable === "Yes") {
  //     lDto.NumberofInsured = 1;
  //   }

  //   if (lDto.IsMultiKYCApplicable === "No") {
  //     const newarray = lDto.ProposerDetails[0];
  //     lDto.ProposerDetails = [newarray];
  //   }

  //   setDto({ ...lDto });
  // };

  // const OnADDMultiKYCDetailsnew = (e) => {
  //   console.log(e, 111111);
  //   if (e.target.value === "") {
  //     const newarray = lDto.ProposerDetails[0];
  //     lDto.ProposerDetails = [newarray];
  //     //   lDto.NumberofInsured = 1;
  //   }
  //   lDto.NumberofInsured = e.target.value;
  //   const arr1 = arrayRange(1, e.target.value - 1, 1);
  //   arr1.forEach(() => {
  //     lDto.ProposerDetails.push({ ...ProposerDetails() });
  //   });

  //   setDto({ ...lDto });
  // };

  const UploadDocument1 = async (file, type) => {
    const formData = new FormData();
    formData.append(file.name, file, file.name);
    const uploadres = await Documentuploadaws(formData);
    if (uploadres.status === 1) {
      swal({
        icon: "success",
        text: `Document Uploaded Successfully`,
        confirmButtonColor: "#0079CE",
      });
    }
    if (type === "RollOverDoc") {
      const inputString = uploadres.fileName;
      const variable = uploadres.docid;
      const outputString = inputString.replace("NepalMotorrenevaldoc", "").replace(variable, "");
      lDto.RenewaldocumentDetails[0].DocName = outputString;
      lDto.RenewaldocumentDetails[0].DocId = uploadres.docid;
      lDto.RenewaldocumentDetails[0].UploadDocDate = uploadres.dMSDTOs[0].uploadDate;
      setDto({ ...lDto });
    }
    if (type === "RenewalDoc1") {
      const inputString = uploadres.fileName;
      const variable = uploadres.docid;
      const outputString = inputString.replace("NepalMotorrenevaldoc", "").replace(variable, "");
      lDto.RenewaldocumentDetails[1].DocName = outputString;
      lDto.RenewaldocumentDetails[1].DocId = uploadres.docid;
      lDto.RenewaldocumentDetails[1].UploadDocDate = uploadres.dMSDTOs[0].uploadDate;
      setDto({ ...lDto });
    }
  };
  const handleFileUpload1 = async (event, type) => {
    await UploadDocument1(event.target.files[0], type);
  };

  const handleFiledelete1 = async (event, type) => {
    if (type === "RollOverDoc") {
      lDto.RenewaldocumentDetails[0].DocName = "";
      lDto.RenewaldocumentDetails[0].DocId = "";
      lDto.RenewaldocumentDetails[0].UploadDocDate = "";
      setDto({ ...lDto });
    }
    if (type === "RenewalDoc1") {
      lDto.RenewaldocumentDetails[1].DocName = "";
      lDto.RenewaldocumentDetails[1].DocId = "";
      lDto.RenewaldocumentDetails[1].UploadDocDate = "";
      setDto({ ...lDto });
    }
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
              onChange={(e) => handleFileUpload(e, i1, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i1].documentDetails[i].FileName,
          spacing: 3,
          visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
          sx: { fontSize: "15px", paddingTop: 1 },
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

  const RemoveMultiKYCDetails = (i) => {
    const arr = lDto.ProposerDetails.filter((x, i1) => i1 !== i);
    lDto.ProposerDetails = arr;
    lDto.NumberofInsured = lDto.ProposerDetails.length;
    setDto({ ...lDto });
  };

  const spreadMultiKYCDetails = () => {
    const arr = [];
    lDto.ProposerDetails.forEach((x, i) => {
      arr.push([
        {
          type: "Button",
          label: "Delete",
          spacing: 12,
          justifyContent: "end",
          visible: i !== 0,
          onClick: () => RemoveMultiKYCDetails(i),
        },
        {
          type: "AutoComplete",
          label: "KYC Category",
          visible: true,
          path: `ProposerDetails.${i}.KYCCategory`,
          options: masters1.KYCCategory,
          required: true,
          disableOnReset: true,
        },
        {
          type: "AutoComplete",
          label: "Insured Type",
          visible: true,
          path: `ProposerDetails.${i}.InsuredType`,
          options: masters1.InsuredType,
          required: true,
          customOnChange: (e, a) => handleIssuingBranch(e, a, "InsuredType"),
        },
        {
          type: "Input",
          label: "Special Client",
          visible: true,
          path: `ProposerDetails.${i}.SpecialClient`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          onBlurFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Insured Name English",
          visible: true,
          path: `ProposerDetails.${i}.InsuredNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "InsuredNameEnglish12",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
        },
        {
          type: "Input",
          label: "Insured Name Nepali",
          visible: true,
          path: `ProposerDetails.${i}.InsuredNameNepali`,
          disabled: true,
        },
        {
          type: "Input",
          label: "KYC Classification",
          visible: true,
          path: `ProposerDetails.${i}.KYCClassification`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          onBlurFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "AutoComplete",
          label: "KYC Risk Category",
          visible: true,
          path: `ProposerDetails.${i}.KYCRiskCategory`,
          options: masters1.KYCRiskCategory,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Is Beneficiary Owner",
          visible: true,
          path: `ProposerDetails.${i}.IsBeneficiaryOwner`,
          options: masters1.IsBeneficiaryOwner,
          disableOnReset: true,
        },
        {
          type: "AutoComplete",
          label: "Occupation",
          visible: true,
          path: `ProposerDetails.${i}.Occuptation`,
          options: masters1.Occupation,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Income Source",
          visible: true,
          path: `ProposerDetails.${i}.IncomeSource`,
          options: masters1.IncomeSource,
          required: true,
        },
        {
          type: "Input",
          label: "Contact Person Name",
          visible: true,
          path: `ProposerDetails.${i}.ContactPersonName`,
          onChangeFuncs: [IsAlphaNoSpace],
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Email Address",
          visible: true,
          path: `ProposerDetails[0].EmailId`,
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
          required:
            lDto.ProposerDetails[i].InsuredType !== "Individual" &&
            lDto.ProposerDetails[i].InsuredType !== "Government body",
          visible: true,
          path: `ProposerDetails.${i}.VATNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          InputProps: { maxLength: 9 },
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
          disabled: lDto.ProposerDetails[0].RegistrationDate === "",
          minDate: new Date(lDto.ProposerDetails[0].RegistrationDate),
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
          onBlurFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "AutoComplete",
          label: "Country",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Country`,
          options: masters1.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.ProvinceState`,
          options: lDto.ProposerDetails[0].PermanentAdrress.Country !== "" ? masters1.State : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State2", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.District`,
          options:
            lDto.ProposerDetails[0].PermanentAdrress.ProvinceState !== "" ? masters1.District2 : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District2", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Municipality`,
          options:
            lDto.ProposerDetails[0].PermanentAdrress.District !== "" ? masters1.Municipality2 : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality2", i),
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.WardNumber`,
          options: masters1.WardNumber,
        },
        {
          type: "Input",
          label: "Address(English) ",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          required: true,
          name: "PermanentAdrressEnglish",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
        },
        {
          type: "Input",
          label: "Address(Nepali) ",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          disabled: true,
        },
        {
          type: "Input",
          label: "Area",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Area`,
          onChangeFuncs: [IsAlphaNoSpace],
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/Street Name",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          onBlurFuncs: [IsAlphaNumNoSpace],
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
          name: "TemporaryAddressEnglish11",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          spacing: 12,
          accordionList: [
            {
              id: 1,
              label: lDto.ProposerDetails[i].InsuredType,
              name: "Individual Information",
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
          // spacing: 3,
          visible: true,
          accordionId: 1,
          spacing: 3.5,
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
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Marital status (English)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusEnglish`,
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
          name: "HusbandNameEnglish12",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "WifeNameEnglish12",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "FatherNameEnglish1",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "GrandfatherNameEnglish1",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "PermanentAddressEnglish1",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "TownEnglish1",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "CityEnglish1",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "TemporaryAddressEnglish1",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "ResidenceEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          options: masters1.District,
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
          // customOnChange: (e, d) => onDOBselect(e, d, i),
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
          // InputProps: { maxLength: 8 },
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
          disabled: lDto.ProposerDetails[i].PassportExpiryDate === "",
          // minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate),
          minDate: addDays1(
            DateFormatFromDateObject(new Date(lDto.ProposerDetails[i].PassportIssuedDate), "m/d/y"),
            1
          ),
          accordionId: 1,
          spacing: 3,
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
          type: "Input",
          label: "Occupation",
          visible: true,
          path: `ProposerDetails.${i}.InsuredOccupation`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Income Source",
          visible: true,
          // path: `ProposerDetails.${i}.IncomeSource`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          // disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Name of the Organization",
          visible: true,
          // path: `ProposerDetails.${i}.NameoftheOrganisation`,
          path: `ProposerDetails.${i}.InsuredNameEnglish`,
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
          // path: `ProposerDetails.${i}.OrganizationAddress`,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
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
          // onChangeFuncs: [IsNumaricSpecialNoSpace],
          accordionId: 2,
          spacing: 3,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
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
          options: masters1.MemberType,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Role",
          visible: true,
          path: `ProposerDetails.${i}.Role`,
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
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "HusbandNameEnglish1",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "WifeNameEnglish1",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "FatherNameEnglish2",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "PermanentAddressEnglish12",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "TownEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          name: "CityEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
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
          path: `ProposerDetails.${i}.PermanentAdrress.TempAddresEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "TempAddresEnglish12",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
        },
        {
          type: "Input",
          label: "Temporary Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TempAddresNepali`,
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
          options: masters1.District,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Date Of Birth",
          visible: true,
          maxDate: new Date(),
          dateFormat: "m-d-Y",
          path: `ProposerDetails.${i}.DoB`,
          // customOnChange: (e, d) => onDOBselect(e, d, i),
          accordionId: 2,
          spacing: 3,
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
          // InputProps: { maxLength: 9 },
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
          accordionId: 2,
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
        // {
        //   type: "Input",
        //   label: "Occupation",
        //   visible: true,
        //   path: `ProposerDetails.${i}.InsuredOccupation`,
        //   onChangeFuncs: [IsAlphaNoSpace],
        //   accordionId: 2,
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Income Source",
        //   visible: true,
        //   // path: `ProposerDetails.${i}.IncomeSource`,
        //   onChangeFuncs: [IsAlphaNumNoSpace],
        //   accordionId: 2,
        //   // disabled: true,
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Phone Number",
        //   visible: true,
        //   path: `ProposerDetails.${i}.PhoneNumber`,
        //   onChangeFuncs: [IsAlphaNumNoSpace],
        //   accordionId: 2,
        //   spacing: 3,
        //   // InputProps: { maxLength: 10 },
        // },
        // {
        //   type: "Input",
        //   label: "Mobile Number",
        //   visible: true,
        //   path: `ProposerDetails.${i}.MobileNumber`,
        //   onChangeFuncs: [IsNumeric],
        //   onBlurFuncs: [IsMobileNumber],
        //   accordionId: 2,
        //   spacing: 3,
        //   InputProps: { maxLength: 10 },
        // },
        // {
        //   type: "Input",
        //   label: "Email",
        //   visible: true,
        //   path: `ProposerDetails.${i}.EmailAddress`,
        //   onBlurFuncs: [IsEmail],
        //   accordionId: 2,
        //   spacing: 3,
        // },

        {
          type: "AutoComplete",
          label: "Status",
          visible: true,
          path: `ProposerDetails.${i}.Status`,
          options: masters1.Status,
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
          // spacing: 3,
          visible: true,
          accordionId: 2,
          spacing: 3.5,
          sx: { fontSize: "15px", paddingTop: 1 },
        },
        {
          type: "IconButton",
          icon: "close",
          accordionId: 2,
          spacing: 3,
          // spacing: 2,
          visible: lDto.ProposerDetails[i].ProfilePicture !== "",
          onClick: () => onCancelClickProfilePicture(i),
        },
      ]);
    });
    return arr;
  };

  const handleFieldOfficerCode = async (e, a, key) => {
    if (key === "FieldOfficer" || key === "fieldName") {
      if (a !== null) {
        lDto.Channel.FieldOfficerCode = a.fieldName;
        lDto.Channel.FieldOfficer = a.mValue;
      } else {
        lDto.Channel.FieldOfficerCode = "";
        lDto.Channel.FieldOfficer = "";
      }
    }
    if (key === "SubFieldOfficer" || key === "subfieldName") {
      if (a !== null) {
        lDto.Channel.SubFieldOfficerCode = a.fieldName;
        lDto.Channel.SubFieldOfficer = a.mValue;
      } else {
        lDto.Channel.SubFieldOfficerCode = "";
        lDto.Channel.SubFieldOfficer = "";
      }
    }

    if (key === "agentFieldOfficer" || key === "agentfieldName") {
      if (a !== null) {
        lDto.Channel.AgentCode = a.fieldName;
        lDto.Channel.AgentName = a.mValue;
      } else {
        lDto.Channel.AgentCode = "";
        lDto.Channel.AgentName = "";
      }
    }
    if (key === "subagentFieldOfficer" || key === "subagentfieldName") {
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
          BankFinancialInstitution: dto.Bankdetails.BankCategorylabel,
          Bankname: a.mValue,
        });
        masters1.BranchMasters = res.data;
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
        setDto({ ...lDto });
        masters1.BranchMasters = [];
      }
    }
  };

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
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
          customOnChange: (e, a) => handleBranchName(e, a, i),
        },
        {
          type: "Input",
          label: "Country",
          visible: masters.BranchMasters.length > 0,
          required: true,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          disabled: true,
          disableOnReset: true,
        },
        {
          type: "Input",
          label: "Province/State",
          required: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          disabled: true,
        },
        {
          type: "Input",
          label: "District",
          required: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.District`,
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
          required: true,
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          disabled: true,
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
          disabled: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          required: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: masters.State,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State4", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          required: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.District`,
          options: masters.Districtnew,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District4", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          options: masters.Municipalitynew,
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
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/Street Name",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          onBlurFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "House Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.HouseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Plot Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.PlotNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Contact person 1",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ContactPerson1`,
          onChangeFuncs: [IsAlphaNoSpace],
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact person 2",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ContactPerson2`,
          onChangeFuncs: [IsAlphaNoSpace],
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact person 3",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.ContactPerson3`,
          onChangeFuncs: [IsAlphaNoSpace],
          onBlurFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Phone Number",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.PhoneNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
          onBlurFuncs: [IsNumaricSpecialNoSpace],
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
          onBlurFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Branch Manager",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.BranchManager`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          onBlurFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Email ID",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.Email`,
          onBlurFuncs: [IsEmail],
        },
      ]);
    });
    return arr;
  };

  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = lDto.ProposerDetails[0].EmailId;

      // const Class = "";
      const obj = {
        proposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: lDto.proposalNo,
        keyType: "BGRProposal",
        // communicationId: Class,
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

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Doc Type",
            visible: true,
            required: true,
            path: "DocType",
            options: masters1.DocType,
            customOnChange: (e, a) => handleRenewalDocs(e, a),
          },
          {
            type: "Input",
            label: "Department",
            visible: true,
            required: true,
            path: "Department",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Class",
            visible: true,
            required: true,
            path: "Class",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Premium Type",
            visible: true,
            path: "PremiumType",
            disabled: true,
            required: true,
            disableOnReset: true,
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            path: "PolicyStartDate",
            dateFormat: "m/d/Y",
            minDate: PolicyStartDateMinDate(),
            maxDate: PolicyStartDateMaxDate(),
            customOnChange: (e, d) => OnPSDSelect(e, d),
          },
          {
            type: "Input",
            label: "Number of Days",
            required: true,
            visible: true,
            path: "NumberofDays",
            onChangeFuncs: [IsNumericGreaterThanZero],
            customOnChange: (e) => OnNumberofDays(e),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            visible: true,
            dateFormat: "m/d/Y",
            path: "PolicyEndDate",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Business Type",
            visible: true,
            required: true,
            disabled: true,
            path: "BusinessType",
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Total Sum Insured",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.TotalSumInsured",
            onBlurFuncs: [IsNumericGreaterThanZero],
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => handleTotalSumInsured(e),
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.DirectDiscount",
            options: masters1.DirectDiscount,
            // customOnChange: (e, a) => handleDirectDiscnt(e, a),
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
            options: masters1.BankNonBank,
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
            required: true,
            name: "BankNameinEnglish",
            options:
              lDto.Bankdetails.BankCategory !== ""
                ? masters.BankorFinancialInstituionNameinEnglish
                : [],
            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
          },
          {
            type: "Input",
            label: "Bank/Financial Institution Name in Nepali",
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
            options: masters1.Country,
            disableOnReset: true,
            disabled: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            path: "Bankdetails.ProvinceorState",
            options: lDto.Bankdetails.Country !== "" ? masters1.State : [],
            required: true,
            disabled: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State1"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: "Bankdetails.District",
            options: lDto.Bankdetails.ProvinceorState !== "" ? masters1.District1 : [],
            required: true,
            disabled: true,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District1"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            path: "Bankdetails.Municipality",
            disabled: true,
            options: lDto.Bankdetails.District !== "" ? masters1.Municipality1 : [],
            customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality1"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "Bankdetails.WardNumber",
            options: masters1.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            visible: true,
            path: "Bankdetails.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            required: true,
            disabled: true,
            name: "BankAddressEnglish",
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            path: "Bankdetails.AddressNepali",
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
          // {
          //   type: "Input",
          //   label: "Number of Insured",
          //   path: "NumberofInsured",
          //   visible: lDto.IsMultiKYCApplicable === "Yes",
          //   spacing: 2.5,
          //   customOnChange: (e) => OnADDMultiKYCDetailsnew(e),
          //   // onChangeFuncs: [IsNumericGreaterThanone],
          //   required: lDto.IsMultiKYCApplicable === "Yes",
          // },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 12,
          //   label: "",
          // },
          ...spreadMultiKYCDetails()[0],
        ],
        // ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        [
          { type: "Typography", label: "Care of (English)", visible: true, spacing: 12 },
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.0.CareofNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            name: "CareofNameEnglish",
            customOnBlur: onBlurTransliteration,
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
            path: "ProposerDetails.0.CareofAddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "CareofAddressEnglish",
            customOnBlur: onBlurTransliteration,
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
            path: "ProposerDetails.0.ProprietorNameEnglish",
            name: "ProprietorNameEnglish",
            customOnBlur: onBlurTransliteration,
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
            label: "Province/State",
            visible: true,
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            options: masters1.State,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.ProvinceState",
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State6"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            options: masters1.District6,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.District",
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District6"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
            options: masters1.Municipality6,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.Municipality",
            customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality6"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            options: masters1.WardNumber,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.WardNumber",
          },
          {
            type: "Input",
            label: "Tole/Street Name (English)",
            visible: true,
            name: "ToleStreetNameEnglish1",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            path: "InsurableItem.0.RiskItems.0.RiskLocation.ToleStreetNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Tole/Street Name (Nepali)",
            visible: true,
            disabled: true,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.ToleStreetNameNepali",
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.PlotNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Home Number",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.HomeNumber",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "House/Property Owner Name",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.HousePropertyOwnerName",
          },
          {
            type: "AutoComplete",
            label: "Type of Property",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.TypeofProperty",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            options: masters1.PropertyType,
          },
          {
            type: "Input",
            label: "Description",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Description",
          },
          {
            type: "Input",
            label: "Other Details related to Property",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.OtherDetailsrelatedtoProperty",
          },
          {
            type: "Input",
            label: "Total Sum Insured",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.TotalSumInsured",
            required: true,
            onChangeFuncs: [IsNumeric1],
            onBlurFuncs: [IsNumeric1],
            customOnBlur: (e) => handleTotalSumInsured(e),
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.DirectDiscount",
            options: masters1.DirectDiscount,
            required: true,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },
          {
            type: "Input",
            visible: true,
            multiline: "multiline",
            rows: 4,
            label: "Property and Goods Details",
            spacing: 6,
            path: "InsurableItem.0.RiskItems.0.PropertyandGoodsDetails",
          },
          {
            type: "Input",
            visible: true,
            multiline: "multiline",
            rows: 4,
            label: "Additional Description and Warranties",
            spacing: 6,
            path: "InsurableItem.0.RiskItems.0.AdditionalDescriptionandWarranties",
          },
        ],
        [
          {
            type: "Input",
            label: "Previous Policy Copy",
            visible: lDto.DocType === "RollOver",
            disabled: true,
            spacing: 3,
          },
          {
            type: "Custom",
            visible: lDto.DocType === "RollOver",
            spacing: 2,
            return: (
              <MDButton variant="outlined" component="label">
                Upload
                <input
                  hidden
                  accept="image/bmp, image/jpeg, image/png, .pdf"
                  type="file"
                  onChange={(e) => handleFileUpload1(e, "RollOverDoc")}
                />
              </MDButton>
            ),
          },
          {
            type: "Custom",
            visible: lDto.DocType === "RollOver",
            spacing: 1.5,
            return: (
              <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
                {lDto.RenewaldocumentDetails[0].DocName}
              </Typography>
            ),
          },
          {
            type: "Custom",
            visible:
              lDto.RenewaldocumentDetails[0].DocName !== "" &&
              lDto.RenewaldocumentDetails[0].DocName !== undefined &&
              lDto.DocType !== "Fresh",
            return: (
              <ClearIcon color="error" onClick={(e) => handleFiledelete1(e, "RollOverDoc")} />
            ),
          },
          {
            type: "Typography",
            visible: lDto.RenewaldocumentDetails[0].DocName === "",
            spacing: 4,
            sx: { fontSize: "15px", paddingTop: 1 },
          },
          {
            type: "Input",
            label: "Renewal Notice",
            visible: lDto.DocType === "RollOver",
            disabled: true,
            spacing: 3,
          },
          {
            type: "Custom",
            visible: lDto.DocType === "RollOver",
            spacing: 2,
            return: (
              <MDButton variant="outlined" component="label">
                Upload
                <input
                  hidden
                  accept="image/bmp, image/jpeg, image/png, .pdf"
                  type="file"
                  onChange={(e) => handleFileUpload1(e, "RenewalDoc1")}
                />
              </MDButton>
            ),
          },
          {
            type: "Custom",
            visible: lDto.DocType === "RollOver",
            spacing: 1.5,
            return: (
              <Typography sx={{ textAlign: "left", fontSize: "12px" }}>
                {objectPath.get(lDto, `RenewaldocumentDetails.${1}.DocName`)}
              </Typography>
            ),
          },
          {
            type: "Custom",
            visible:
              objectPath.get(lDto, `RenewaldocumentDetails.${1}.DocName`) !== "" &&
              objectPath.get(lDto, `RenewaldocumentDetails.${1}.DocName`) !== undefined &&
              lDto.DocType !== "Fresh",
            return: (
              <ClearIcon color="error" onClick={(e) => handleFiledelete1(e, "RenewalDoc1")} />
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
            required: true,
            visible: true,
            disabled: true,
            disableOnReset: true,
            path: "RiskAddressDetails.Country",
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            path: "RiskAddressDetails.ProvinceState",
            options: masters1.State,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State1"),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            path: "RiskAddressDetails.District",
            options: masters1.District1,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District1"),
          },
          {
            type: "AutoComplete",
            label: "Muncipality",
            required: true,
            visible: true,
            path: "RiskAddressDetails.Municipality",
            options: masters1.Municipality1,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality1"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "RiskAddressDetails.WardNumber",
            options: masters1.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            required: true,
            visible: true,
            name: "AddressEng1",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "RiskAddressDetails.AddressEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            disabled: true,
            path: "RiskAddressDetails.AddressNepali",
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            path: "RiskAddressDetails.Area",
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
            path: "RiskAddressDetails.ToleStreetName",
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "RiskAddressDetails.HouseNumber",
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
            path: "RiskAddressDetails.PlotNumber",
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
                    <Typography>Direct Discount</Typography>
                    <Typography>Premium after Direct Discount</Typography>
                    <Typography>VAT</Typography>
                    <Typography>Premium after VAT</Typography>
                    <Typography>Stamp Duty</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                  </Grid>
                  <Grid item xs={2}>
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
                        "FormatedData.CalculatedPremiumDetails.PremiumafterDirectDiscount"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.VAT")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.PremiumafterVAT"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.StampDuty")}
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
                  <Grid item xs={2}>
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
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.CommissionPercentage"
                      )}{" "}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {" "}
                      {objectPath.get(
                        lDto,
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
            sx: {
              width: 400,
              height: 400,
              top: "15%",
              bottom: "10%",
              left: "45%",
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
          // {
          //   type: "Modal",
          //   visible: true,
          //   sx: {
          //     width: 400,
          //     height: 400,
          //     top: "15%",
          //     bottom: "10%",
          //     left: "45%",
          //   },
          //   open: savemodalopen,
          //   return: (
          //     <Grid container spacing={2}>
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

          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //         <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
          //           Do you wish to Preview and Save the Debit Note{" "}
          //         </Typography>
          //       </Grid>
          //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //         <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          //           <MDButton onClick={(e) => onDebitNoteClick(e, "SAVE DEBIT NOTE")}>
          //             SAVE DEBIT NOTE
          //           </MDButton>
          //         </MDBox>
          //       </Grid>
          //     </Grid>
          //   ),
          // },
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
        fun = await GenericApi("NepalBurglary", "NepalBurglaryAPI", lDto).then(async (x) => {
          if (x.finalResult) {
            lDto.PremiumDetails = x.finalResult;
            lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
            objectPath.set(lDto, "FinalPremium", x.finalResult.FinalPremium);
            lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
            const res1 = await SaveQuotation(lDto);
            lDto["Quotation No"] = res1.data.quotation.quoteNo;
            lDto.ProposerDetails = [lDto.ProposerDetails];
            setDto({ ...lDto });
            setBackDropFlag(false);
            const fun1 = await swal2
              .fire({
                title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                html: `<div style="display: flex; flex-direction: row;">
                <div style="flex: 3; text-align: left; margin-left: 0rem" ">
                <div>Basic Premium</div>
                <div>Direct Discount(%)</div>
                <div>VAT</div>
                <div>Stamp Duty</div>
                <div><b>Total Premium</b></div>
              </div>
              <div style="flex: 1.7;text-align: right;font-size:16.3px; margin-right: 0rem" ">
              <div>रु</div>
              <div>रु</div>
              <div>रु</div>
              <div>रु</div>
              <div><b>रु</b></div>
            </div>  
            <div style="flex: 1.3; text-align: right; margin-right: 0rem" ">
                <div> ${formater.format(x.finalResult.BasicPremium)}</div>
                <div> ${formater.format(x.finalResult.DirectDiscountAmount)}</div>
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
        });
        break;
      case 1:
        fun = true;
        break;
      case 2:
        fun = await GenericApi("NepalBurglary", "NepalBurglaryAPI", lDto).then(async (x) => {
          if (x.finalResult) {
            lDto.PremiumDetails = x.finalResult;
            lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
            lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
            await QuotationUpdate(lDto);
            lDto.ProposerDetails = [lDto.ProposerDetails];
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.BasicPremium",
              formater.format(x.finalResult.BasicPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.DirectDiscountAmount",
              formater.format(x.finalResult.DirectDiscountAmount)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.PremiumafterDirectDiscount",
              formater.format(x.finalResult.PremiumafterDirectDiscount)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.VAT",
              formater.format(x.finalResult.VAT)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.PremiumafterVAT",
              formater.format(x.finalResult.PremiumafterVAT)
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
            objectPath.set(lDto, "FinalPremium", x.finalResult.FinalPremium);
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.CommissionAmount",
              formater.format(x.finalResult.CommissionAmount)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
              formater.format(x.finalResult.CommissionPercentage)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
              formater.format(lDto.InsurableItem[0].RiskItems[0].TotalSumInsured)
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
        });
        break;
      case 3:
        if (lDto.proposalNo === undefined) {
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          fun = await SaveCreateProposal(lDto).then(async (x) => {
            lDto.ProposerDetails = [lDto.ProposerDetails];
            if (x.data.proposalNumber) {
              await GetProductByCode("NepalBurglary").then(async (x2) => {
                lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
                const res = await GetProposalByNumber(x.data.proposalNumber, x2.data.productId);
                lDto.KYCNo = res.data[0].policyDetails.KYCNo;
                lDto.ProposerDetails = [lDto.ProposerDetails];
                setDto({ ...lDto, proposalNo: x.data.proposalNumber });
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
            return fun;
          });
        } else if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          const x = await UpdateProposalDetails(lDto);
          lDto.ProposerDetails = [lDto.ProposerDetails];
          if (x.data.responseMessage === "Updated successfully") {
            await GetProductByCode("NepalBurglary").then(async (x2) => {
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
      case 4:
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

  // const onReset = (dto, setDto, dispatch) => {
  //   const lDto = dto;
  //   lDto.DocType = "";
  //   lDto.PolicyStartDate = "";
  //   lDto.PolicyEndDate = "";
  //   lDto.NumberofDays = "";
  //   setDto(dispatch, { ...lDto });
  // };

  const onReset1 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.ProposerDetails[0].documentDetails = [{ ...docDetails() }];
    setDto(dispatch, { ...lDto });
  };

  const RenewalDoc = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.RenewaldocumentDetails = RenewaldocumentDetails();
    setDto(dispatch, { ...lDto });
  };

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true }, //  onClick: onReset
        next: { label: "Calculate Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", onClick: onReset1, visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;

    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", onClick: RenewalDoc, visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true }, //   onClick: proposaldetArray,
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;

    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
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
    SubClass: [],
    BranchMasters: [],
    State: [],
    Company: "",
    BankDetails: [],
    BankorFinancialInstituionNameinEnglish: [],
    placeMasters: [{ district: [], municipality: [] }],
    IssuingBranch: [],
  };
  const userDetails = additionalInformation.loginUserDetails;
  if (userDetails && userDetails.displayName) {
    lDto.AgentName = userDetails.displayName;
    lDto.AgentMobileNo = userDetails.contactNumber;
    // lDto.PaymentAmount = lDto.FinalPremium;
    setDto({ ...lDto });
  }
  await GetNPCommonMaster().then((r) => {
    r.forEach((x) => {
      masters[x.mType] = x.mdata;
    });
  });
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
      lDto.ICShortName = res.data[0].Description;
    });
  }
  setDto({ ...lDto });
  await GetProdPartnermasterData("State", {}).then((r) => {
    masters.State = r.data;
  });
  masters.DocType = masters.DocType.filter((x) => x.mValue !== "Renewal");

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
