import {
  Grid,
  Typography,
  List,
  Checkbox,
  Stack,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import MDBox from "components/MDBox";
import AddIcon from "@mui/icons-material/Add";
import MDTypography from "components/MDTypography";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import objectPath from "object-path";
import Success from "assets/images/Nepal/Success.png";
import MDButton from "components/MDButton";
import ClearIcon from "@mui/icons-material/Clear";

import {
  PropertyInsuranceJson,
  docDetails,
  ProposerDetails,
  RiskItems,
  BranchDetails,
  RollOverDocuments,
} from "./data/Json/PropertyInsuranceJson";
import { Bankdetails } from "./data/Json/PrivateVehicleJson";
import PaymentPage from "../../Payment";
import {
  GenericApi,
  GetNPCommonMaster,
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  GetProdPartnermasterData,
  DocumenUpload,
  DeleteDocument,
  Transliteration,
  PolicyStartDateFiscalYear,
  PolicyStartDateMaxDate,
  SendNotification,
  SavepolicyWFStatus,
  UpdateWorkflowStatus,
  UpdateProposalDetails,
  SaveQuotation,
  // SaveCreateProposal,
  QuotationUpdate,
  NumberofDaysinYear,
  GetProductByCode,
} from "./data/APIs/MotorCycleApi";
import { GetTemplatePayload, GetProposalByNumber } from "../../Payment/Apis";
import { useDataController } from "../../../../../BrokerPortal/context";

import {
  IsNumeric,
  IsFreetextNoSpace,
  IsMobileNumber,
  IsEmail,
  AgeCalculator,
  // arrayRange,
  addDays1,
  // NumBetween,
  // addDays,
  // DateFormatFromStringDate,
  // DateFormatFromDateObject,
} from "../../../../../../Common/Validations";

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = PropertyInsuranceJson();
  if (
    (genericInfo.Flow &&
      (genericInfo.Flow === "DisApproveFlow" ||
        genericInfo.Flow === "Approved" ||
        genericInfo.Flow === "DebitFlow")) ||
    process.env.REACT_APP_AutoPopulateCustomerDetails === "true"
    //  || process.env.NODE_ENV === "development"
  ) {
    dto = { ...dto, ...PolicyDto };
    dto.ProposerDetails = [PolicyDto.ProposerDetails];
  }
  return dto;
};

const getProcessSteps = () => {
  const steps = [
    "Quote Details  ",
    "Customer Details",
    "Property Details",
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
        { name: "List of Property", visible: true },
      ];
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
        {
          name: "Policy Holder Details",
          visible: dto.FinancingType !== "",
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
        { name: "Property Details", visible: true },
        { name: "Location Address of the Property", visible: true },
        { name: "Description of Insured property", visible: true },
        { name: "List of Property", visible: true },
        { name: "Roll Over Documents", visible: dto.DocType === "RollOver" },
      ];
      break;
    case 3:
      steps = [
        { name: "Issuing Branch Details", visible: true },
        { name: "Risk Details", visible: true },
      ];
      break;
    case 4:
      steps = [{ name: "Premium Summary", visible: true }]; // Premium Break-up
      break;
    case 5:
      steps = [{ name: "Payment", visible: true }]; // Payment Page
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters }) => {
  const lDto = dto;
  const masters1 = masters;

  const IsPhoneNumber = (number) => {
    const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
    if (number.length === 10) {
      if (mobileRegex.test(number)) return true;
      return "Invalid Phone Number";
    }
    return "Number should be 10 digits";
  };
  const IsNumaricSpecialNoSpace = (str) => {
    const regex = /^[0-9-+]+[0-9-+\s]*$/;
    if (regex.test(str) || str === "") {
      return true;
    }
    return "Allows only numbers and special characters";
  };

  const [control] = useDataController();
  const { genericInfo, loginUserDetails } = control;

  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const IsNumericGreaterThanZero = (number) => {
    const regex = /^(?!(0))[0-9]*$/;
    if (regex.test(number)) return true;
    return "Value must be greater than zero and Numeric";
    //  " Allows only number";
  };

  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = lDto.ProposerDetails[0].EmailId;
      // let Class = "";
      // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //   Class = 306;
      // }
      const obj = {
        ProposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: lDto.proposalNo,
        keyType: "BGRProposal",
        communicationId: 306,
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
      lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
      await UpdateProposalDetails(lDto).then(async () => {
        lDto.ProposerDetails = [lDto.ProposerDetails];
        // objectPath.set(lDto, "proposalNo", x.data.proposalNo);
        setDto({ ...lDto });
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
        //   html: `<div> <img src=${Success} alt="success"></div>`,
        //   title: "Debit Note Saved Successfully",
        //   showConfirmButton: true,
        //   confirmButtonText: "OK",
        //   allowOutsideClick: false,
        //   confirmButtonColor: "#0079CE",
        // })
        .then((result) => {
          if (result.isConfirmed) {
            Navigate("/retail/home");
          }
        });
      setDto({ ...lDto });
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
    let Class = "";

    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Class = 317;
    }
    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      Class = 317;
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
  // const OnTotalSumInsured = (e, name) => {
  //   lDto.InsurableItem[0].RiskItems[0][name] = e.target.value;
  //   let insured1 = lDto.InsurableItem[0].RiskItems[0].BuildingSumInsured;
  //   let insured2 = lDto.InsurableItem[0].RiskItems[0].GoodsSumInsured;
  //   if (insured1 === "") {
  //     insured1 = 0;
  //   }
  //   if (insured2 === "") {
  //     insured2 = 0;
  //   }
  //   const Insured = parseInt(insured1, 10) + parseInt(insured2, 10);
  //   lDto.TotalSumInsured = Insured.toString();
  //   setDto({ ...lDto });
  // };

  const OnGoodsSumInsured = (e) => {
    if (e.target.value !== "") {
      lDto.ListofProperty.GoodsSumInsured = parseInt(e.target.value, 10);
    } else {
      lDto.ListofProperty.GoodsSumInsured = "";
    }
    setDto({ ...lDto });
  };

  const OnQuoteTotalSumInsured = (e, name) => {
    lDto.ListofProperty[name] = e.target.value;
    let insured1 = lDto.ListofProperty.BuildingSumInsured;
    let insured2 = lDto.ListofProperty.GoodsSumInsured;
    if (insured1 === "") {
      insured1 = 0;
    }
    if (insured2 === "") {
      insured2 = 0;
    }
    const Insured = parseInt(insured1, 10) + parseInt(insured2, 10);
    // lDto.ListofProperty.TotalSumInsured = Insured;
    lDto.ListofProperty.TotalSumInsured = Insured.toString();
    // lDto.TotalSumInsured = lDto.ListofProperty.TotalSumInsured;
    setDto({ ...lDto });

    if (Insured > 5000000) {
      swal({
        icon: "error",
        text: "Overall Sum Insured must not exceed 50 Lakhs",
        confirmButtonColor: "#0079CE",
      });
      lDto.ListofProperty.TotalSumInsured = "";
      lDto.ListofProperty.GoodsSumInsured = "";
      lDto.ListofProperty.BuildingSumInsured = "";
    } else {
      lDto.InsurableItem[0].RiskItems[0].BuildingSumInsured = "";
      lDto.InsurableItem[0].RiskItems[0].TotalBuildingSumInsured = "";
      lDto.InsurableItem[0].RiskItems[0].TotalGoodsSumInsured = "";
      lDto.InsurableItem[0].RiskItems[0].GoodsSumInsured = "";
      lDto.TotalSumInsured11 = "";
      lDto.InsurableItem[0].RiskItems[0].BuildingRemarks = "";
      lDto.InsurableItem[0].RiskItems = [
        { ...lDto.InsurableItem[0].RiskItems[0], Goods: "", GoodsSumInsured: "", GoodsRemarks: "" },
      ];
      // forEach((x, i) => {
      //   lDto.InsurableItem[0].RiskItems[i].Goods = "";
      //   lDto.InsurableItem[0].RiskItems[i].GoodsSumInsured = "";
      //   lDto.InsurableItem[0].RiskItems[i].GoodsRemarks = "";
      // });
      // lDto.InsurableItem[0].RiskItems.length = 1;
    }
    setDto({ ...lDto });
  };
  const OnBuildingTotalSumInsured = (e) => {
    lDto.InsurableItem[0].RiskItems[0].BuildingSumInsured = e.target.value;
    let insured1 = lDto.InsurableItem[0].RiskItems[0].BuildingSumInsured;
    if (insured1 === "") {
      insured1 = 0;
    }
    const Insured = parseInt(insured1, 10);
    lDto.InsurableItem[0].RiskItems[0].TotalBuildingSumInsured = Insured;
    lDto.TotalSumInsured11 =
      lDto.InsurableItem[0].RiskItems[0].TotalGoodsSumInsured +
      lDto.InsurableItem[0].RiskItems[0].TotalBuildingSumInsured;
    setDto({ ...lDto });

    if (Insured > lDto.ListofProperty.BuildingSumInsured) {
      swal({
        icon: "error",
        text: "Total Building SI must not exceed Buiding SI given in Quote Screen",
        confirmButtonColor: "#0079CE",
      });
      lDto.InsurableItem[0].RiskItems[0].TotalBuildingSumInsured = "";
      lDto.InsurableItem[0].RiskItems[0].BuildingSumInsured = "";
      lDto.TotalSumInsured11 = "";
    }
    setDto({ ...lDto });
  };

  const OnGoodsTotalSumInsured = (e, name, i) => {
    if (name === "GoodsSumInsured") {
      const newValue = e.target.value.trim();
      const parsedValue = newValue !== "" ? parseInt(newValue, 10) : null;

      if (parsedValue !== null) {
        lDto.InsurableItem[0].RiskItems[i][name] = parsedValue;
      } else {
        delete lDto.InsurableItem[0].RiskItems[i][name];
      }
      const totalSum = lDto.InsurableItem[0].RiskItems.reduce((acc, item) => {
        const value = item.GoodsSumInsured || 0;
        return acc + parseInt(value, 10);
      }, 0);
      lDto.InsurableItem[0].RiskItems[0].TotalGoodsSumInsured = totalSum;
      lDto.TotalSumInsured11 =
        lDto.InsurableItem[0].RiskItems[0].TotalBuildingSumInsured + totalSum;
      setDto({ ...lDto });
      if (totalSum > lDto.ListofProperty.GoodsSumInsured) {
        swal({
          icon: "error",
          text: "Total Goods SI must not exceed Goods SI given in Quote Screen",
          confirmButtonColor: "#0079CE",
        });
        // lDto.InsurableItem[0].RiskItems[0].TotalGoodsSumInsured = "";
        // lDto.TotalSumInsured11 = "";
        lDto.InsurableItem[0].RiskItems[i].GoodsSumInsured = "";

        const totalSum1 = lDto.InsurableItem[0].RiskItems.reduce((acc, item) => {
          const value = item.GoodsSumInsured || 0;
          return acc + parseInt(value, 10);
        }, 0);
        lDto.InsurableItem[0].RiskItems[0].TotalGoodsSumInsured = totalSum1;
        lDto.TotalSumInsured11 =
          lDto.InsurableItem[0].RiskItems[0].TotalBuildingSumInsured + totalSum1;
        setDto({ ...lDto });
      }
      setDto({ ...lDto });
    }
  };

  //   const OnTotalSumInsured = (e) => {
  //     const total =
  //       lDto.InsurableItem[0].RiskItems[0].BuildingSumInsured +
  //       lDto.InsurableItem[0].RiskItems[0].GoodsSumInsured;
  //     lDto.TotalSumInsured = total;
  //     if (insured1 === "") {
  //       insured1 = 0;
  //     }
  //     if (insured2 === "") {
  //       insured2 = 0;
  //     }
  //     const Insured = Number(insured1) + Number(insured2);
  //     if (Number(insured1) > 200 || Number(insured2) > 200 || Insured >= 200) {
  //       swal.fire({
  //         icon: "error",
  //         text: "Should Not Exceed 2 crores",
  //         confirmButtonColor: "#0079CE",
  //       });
  //     } else {
  //       lDto.TotalSumInsured = Insured;
  //     }
  //     // lDto.TotalSumInsured = Insured.toString();

  //     setDto({ ...lDto });
  //   };
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

  const handleRenewalDocs = (e, a) => {
    lDto.DocType = a.mValue;
    if (a !== "" && a.mValue === "Fresh") {
      lDto.RollOverDocuments = RollOverDocuments();
    }
    setDto({ ...lDto });
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

        lDto.Prefix = a.ProvinceCode.concat("/", lDto.InsuredTypeCode)
          .concat("/", a.ShortCode, "/")
          .concat(",", a.ProvinceCode)
          .concat("/", a.ShortCode, "/");

        lDto.ProvinceCode = a.ProvinceCode;
        lDto.ShortCode = a.ShortCode;
        const BusinessTypeCode = lDto.DocType.split("")[0];
        lDto.PolicyPrefix = a.ProvinceCode.concat("/", a.ShortCode, "/", "PRT").concat(
          "/",
          "PI",
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

  // const OnInsuredType = (e, a, i) => {
  //   if (a !== null) {
  //     lDto.ProposerDetails[i].InsuredType = a.mValue;
  //   } else {
  //     lDto.ProposerDetails[i].InsuredType = "";
  //   }
  //   lDto.ProposerDetails[i].ProfilePicture = "";
  //   setDto({ ...lDto });
  // };
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
  const OnDirectDiscountAgent = (e, a) => {
    if (a !== null) {
      lDto.InsurableItem[0].RiskItems[0].DirectDiscount = a.mValue;
    } else {
      lDto.InsurableItem[0].RiskItems[0].DirectDiscount = "";
    }
    lDto.Channel.AgentCode = "";
    lDto.Channel.AgentName = "";
    lDto.ICShortName = masters.Company;
    lDto.ProductLogo = genericInfo.ProductLogo;
    lDto.CompanyName = process.env.REACT_APP_CompanyName;
    lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
    lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
    lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;
    setDto({ ...lDto });
    setMasters({ ...masters1 });
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
  // Translation English To Nepali Dropdown

  // Translation English To Nepali
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
    lDto.ProposerDetails[0].PolicyHolderDetails.PolicyHolderName = "";
    lDto.ProposerDetails[0].PolicyHolderDetails.Address = "";
    setDto({ ...lDto });
  };

  const OnPolicyHolderName = (e, a) => {
    if (a !== null) {
      lDto.ProposerDetails[0].PolicyHolderDetails.PolicyHolderName = a.mValue;
      lDto.ProposerDetails[0].PolicyHolderDetails.Address = a.address;
    } else {
      lDto.ProposerDetails[0].PolicyHolderDetails.Address = "";
      lDto.ProposerDetails[0].PolicyHolderDetails.PolicyHolderName = "";
    }
    setDto({ ...lDto });
  };

  const AddPropertyBuilding = () => {
    if (lDto.InsurableItem[0].RiskItems.length < 4) {
      lDto.InsurableItem[0].RiskItems = [...lDto.InsurableItem[0].RiskItems, { ...RiskItems() }];
      setDto({ ...lDto });
    }
  };

  const RemovePropertyBuilding = (i) => {
    if (lDto.InsurableItem[0].RiskItems[i].GoodsSumInsured === "") {
      lDto.InsurableItem[0].RiskItems[i].GoodsSumInsured = 0;
    }
    lDto.InsurableItem[0].RiskItems[0].TotalGoodsSumInsured =
      Number(lDto.InsurableItem[0].RiskItems[0].TotalGoodsSumInsured) -
      lDto.InsurableItem[0].RiskItems[i].GoodsSumInsured;
    const arr = lDto.InsurableItem[0].RiskItems.filter((x, i1) => i1 !== i);
    lDto.InsurableItem[0].RiskItems = arr;
    lDto.TotalSumInsured11 =
      lDto.InsurableItem[0].RiskItems[0].TotalBuildingSumInsured +
      lDto.InsurableItem[0].RiskItems[0].TotalGoodsSumInsured;
    setDto({ ...lDto });
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
    lDto.ProposerDetails = [{ ...ProposerDetails() }];
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    setDto({ ...lDto });
  };
  const spreadPropertyGoods = () => {
    const arr = [];
    dto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push(
        {
          type: "AutoComplete",
          label: "Goods",
          visible: true,
          // required: i !== 0,
          path: `InsurableItem.0.RiskItems.${i}.Goods`,
          options: masters.PropertyGoods,
        },
        {
          type: "Input",
          label: "Sum Insured ",
          visible: true,
          required: lDto.InsurableItem[0].RiskItems[i].Goods !== "",
          path: `InsurableItem.0.RiskItems.${i}.GoodsSumInsured`,
          onChangeFuncs: [IsNumeric],
          customOnChange: (e) => OnGoodsTotalSumInsured(e, "GoodsSumInsured", i),
        },
        {
          type: "Input",
          label: "Remarks",
          visible: true,
          required: lDto.InsurableItem[0].RiskItems[i].Goods !== "",
          onChangeFuncs: [IsFreetextNoSpace],
          path: `InsurableItem.0.RiskItems.${i}.GoodsRemarks`,
        },
        {
          type: "Button",
          label: "Add",
          // visible: true,
          visible: i === 0,
          startIcon: <AddIcon />,
          spacing: 1.5,
          onClick: AddPropertyBuilding,
        },
        {
          type: "Button",
          label: "Remove",
          visible: i !== 0,
          spacing: 1.5,
          onClick: () => RemovePropertyBuilding(i),
        }
      );
    });

    return arr;
  };

  const onDocUplode1 = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        lDto.RollOverDocuments[index].FileName = file.name;
        lDto.RollOverDocuments[index].UploadDocDate = new Date().toLocaleDateString();
        lDto.RollOverDocuments[index].DocId = result.data[0].docid;
        setDto({ ...lDto });
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };
  const OnRollOverProfilePicture = async (event, i, index) => {
    await onDocUplode1(event.target.files[0], i, index);
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
  };
  const onCancelRollOverProfilePicture = async (index) => {
    const file = lDto.RollOverDocuments[index].FileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.RollOverDocuments[index].FileName = "";
        lDto.RollOverDocuments[index].DocId = "";
        lDto.RollOverDocuments[index].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };
  const SpreadRollOverDocuments = () => {
    const arr = [];
    lDto.RollOverDocuments.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          label: "Document Name",
          path: `RollOverDocuments.${i}.DocName`,
          disableOnReset: true,
          disabled: true,
          visible: lDto.DocType === "RollOver",
        },
        {
          type: "Button",
          visible: lDto.DocType === "RollOver",
          component: "label",
          label: "Upload",
          spacing: 2,
          typeFormat: (
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png,"
              type="file"
              onChange={(e) => OnRollOverProfilePicture(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.RollOverDocuments[i].FileName,
          visible: lDto.DocType === "RollOver",
          spacing: 3.9,
          sx: { fontSize: "15px", paddingTop: 1 },
        },
        {
          type: "IconButton",
          icon: "close",
          visible: lDto.DocType === "RollOver" && lDto.RollOverDocuments[i].FileName !== "",
          onClick: () => onCancelRollOverProfilePicture(i),
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 12,
        }
      );
    });
    return arr;
  };

  // const OnPSDSelect = (e, d) => {
  //   lDto.PolicyStartDate = d;
  //   // lDto.NumberofDays = NumberofDaysinYear(new Date().getFullYear());
  //   lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //   if ((lDto.PolicyStartDate !== "" && lDto.NumberofDays === "") || lDto.PolicyStartDate === "") {
  //     lDto.PolicyEndDate = "";
  //   }
  //   setDto({ ...lDto });
  // };

  // const OnNumberofDays = (e) => {
  //   lDto.NumberofDays = e.target.value;
  //   lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, e.target.value);
  //   setDto({ ...lDto });

  //   const startDate = new Date(lDto.PolicyStartDate);
  //   const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  //   const maxDays = startDate.getMonth() === 1 && isLeapYear(startDate.getFullYear()) ? 366 : 365;

  //   if (lDto.NumberofDays < 1 || lDto.NumberofDays > maxDays) {
  //     swal({
  //       icon: "error",
  //       text: `Number of days should be in between 1 to ${maxDays} days`,
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
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const OnPSDSelect = (e, d) => {
    lDto.PolicyStartDate = d;
    const endDate = new Date(lDto.PolicyEndDate);
    const startDate = new Date(lDto.PolicyStartDate);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const feb29datestartyear = isLeapYear(startYear) ? new Date(`02/29/${startYear}`) : null;
    const feb29dateendyear = isLeapYear(endYear) ? new Date(`02/29/${endYear}`) : null;
    if (
      (feb29datestartyear && startDate > feb29datestartyear && feb29datestartyear <= endDate) ||
      (feb29dateendyear && startDate <= feb29dateendyear && feb29dateendyear >= endDate) ||
      (feb29datestartyear && startDate > feb29datestartyear)
    ) {
      if (lDto.PolicyEndDate === "" && lDto.NumberofDays === "") {
        lDto.NumberofDays = 365;
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      }
      if (lDto.NumberofDays !== 365 && lDto.NumberofDays !== 366) {
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      } else {
        lDto.NumberofDays = 365;
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      }
      // lDto.NumberofDays = 365;
    } else if (lDto.PolicyEndDate === "" && lDto.NumberofDays === "") {
      lDto.NumberofDays = 366;
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    } else if (lDto.NumberofDays !== 365 && lDto.NumberofDays !== 366) {
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    } else {
      lDto.NumberofDays = 366;
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    }
    if (lDto.NumberofDays === NumberofDaysinYear(new Date().getFullYear())) {
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    }
    if (lDto.PolicyStartDate === "") {
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });
  };

  const OnNumberofDays = (e) => {
    lDto.NumberofDays = e.target.value;
    lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, e.target.value);
    setDto({ ...lDto });
    const endDate = new Date(lDto.PolicyEndDate);
    const startDate = new Date(lDto.PolicyStartDate);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const feb29datestartyear = isLeapYear(startYear) ? new Date(`02/29/${startYear}`) : null;
    const feb29dateendyear = isLeapYear(endYear) ? new Date(`02/29/${endYear}`) : null;
    if (
      (feb29datestartyear && startDate > feb29datestartyear && feb29datestartyear <= endDate) ||
      (feb29dateendyear && startDate <= feb29dateendyear && feb29dateendyear >= endDate) ||
      (feb29datestartyear && startDate > feb29datestartyear)
    ) {
      if (lDto.NumberofDays > 365) {
        swal({
          icon: "error",
          text: `Number of days should be in between 1 to 365 days`,
          confirmButtonColor: "#0079CE",
        });
        lDto.NumberofDays = "";
      }
    } else if (lDto.NumberofDays > 366) {
      swal({
        icon: "error",
        text: `Number of days should be in between 1 to 366 days`,
        confirmButtonColor: "#0079CE",
      });
      lDto.NumberofDays = "";
    }
    if (
      (lDto.PolicyStartDate === "" && lDto.NumberofDays !== "") ||
      (lDto.PolicyStartDate !== "" && lDto.NumberofDays === "") ||
      (lDto.PolicyStartDate === "" && lDto.NumberofDays === "")
    ) {
      lDto.PolicyEndDate = "";
    }

    setDto({ ...lDto });
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
    const file1 = e;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
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
  //   Insured Details AddDocument For Upload Profile Picture & DeleteDocument Functionality
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
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
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

  // const RemoveMultiKYC = (e) => {
  //   // debugger;
  //   lDto.IsMultiKYCApplicable = e.target.value;

  //   if (lDto.IsMultiKYCApplicable === "Yes") {
  //     // lDto.NumberofInsured = 1;
  //     lDto.ProposerDetails = [{ ...ProposerDetails() }];
  //   }

  //   if (lDto.IsMultiKYCApplicable === "No") {
  //     const newarray = lDto.ProposerDetails[0];
  //     lDto.ProposerDetails = [newarray];
  //     lDto.ProposerDetails = [{ ...ProposerDetails() }];
  //   }
  //   // else {
  //   //   lDto.ProposerDetails = [{ ...ProposerDetails() }];
  //   // }

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

  // const OnADDMultiKYCDetails = () => {
  //   lDto.ProposerDetails.push({ ...ProposerDetails() });
  //   lDto.NumberofInsured = lDto.ProposerDetails.length;
  //   setDto({ ...lDto });
  // };
  // const RemoveMultiKYCDetails = (i) => {
  //   const arr = lDto.ProposerDetails.filter((x, i1) => i1 !== i);
  //   lDto.ProposerDetails = arr;
  //   // lDto.NumberofInsured = lDto.ProposerDetails.length;
  //   lDto.NumberofInsured = arr.length;

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
          // customOnChange: (e, a) => OnInsuredType(e, a, i),
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
          required:
            lDto.ProposerDetails[i].InsuredType !== "Individual" &&
            lDto.ProposerDetails[i].InsuredType !== "Government body",
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
          spacing: 3.9,
          visible: true,
          accordionId: 1,
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
          onBlurFuncs: [IsPhoneNumber],
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
        // masters1.BankorFinancialInstituionNameinEnglish = [];
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
            options: masters.DocType.filter((x) => x.mValue !== "Renewal"),
            path: "DocType",
            customOnChange: (e, a) => handleRenewalDocs(e, a),
          },
          {
            type: "Input",
            label: "Department",
            visible: true,
            disableOnReset: true,
            disabled: true,
            required: true,
            path: "Department",
          },
          {
            type: "Input",
            required: true,
            label: "Class",
            visible: true,
            disabled: true,
            path: "Class",
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Premium Type",
            required: true,
            visible: true,
            path: "PremiumType",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: true,
            path: "PolicyStartDate",
            minDate: PolicyStartDateFiscalYear(),
            maxDate: PolicyStartDateMaxDate(),
            dateFormat: "m/d/Y",
            // disableOnReset: true,
            required: true,
            customOnChange: (e, d) => OnPSDSelect(e, d),
          },
          {
            type: "Input",
            label: "Number of Days",
            required: true,
            visible: true,
            path: "NumberofDays",
            // disableOnReset: true,
            // disabled: true,
            onChangeFuncs: [IsNumericGreaterThanZero],
            customOnChange: (e) => OnNumberofDays(e),
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            // minDate: DateFormatFromDateObject("m/d/Y"),
            path: "PolicyEndDate",
            dateFormat: "m/d/Y",
            // disableOnReset: true,
            required: true,
            disabled: true,
            InputProps: { disabled: true },
          },
          {
            type: "Input",
            label: "Business Type",
            required: true,
            visible: true,
            disabled: true,
            path: "BusinessType",
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: true,
            options: masters.DirectDiscount,
            path: "InsurableItem.0.RiskItems.0.DirectDiscount",
            required: true,
            customOnChange: (e, a) => OnDirectDiscountAgent(e, a),
          },
        ],
        [
          {
            type: "Input",
            label: "Building",
            required: true,
            disabled: true,
            visible: true,
            path: "ListofProperty.Building",
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Sum Insured",
            required: true,
            visible: true,
            path: "ListofProperty.BuildingSumInsured",
            onBlurFuncs: [IsNumericGreaterThanZero],
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => OnQuoteTotalSumInsured(e, "BuildingSumInsured"),
          },
          {
            type: "Typography",
            visible: true,
            label: "",
            spacing: 6,
          },
          {
            type: "Input",
            label: "Goods",
            disabled: true,
            visible: true,
            path: "ListofProperty.Goods",
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Sum Insured",
            path: "ListofProperty.GoodsSumInsured",
            visible: true,
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => OnQuoteTotalSumInsured(e, "GoodsSumInsured"),
            customOnBlur: (e) => OnGoodsSumInsured(e),
          },
          {
            type: "Typography",
            visible: true,
            label: "",
            spacing: 6,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 6,
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
                  रु {formater.format(lDto.ListofProperty.TotalSumInsured)}
                </MDTypography>
              </MDBox>
            ),
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
        [
          {
            type: "AutoComplete",
            label: "Policy Holder Name",
            visible: true,
            path: "ProposerDetails.0.PolicyHolderDetails.PolicyHolderName",
            options: [
              { mValue: lDto.ProposerDetails[0].Name, address: lDto.ProposerDetails[0].Address },
              {
                mValue: lDto.ProposerDetails[0].InsuredNameEnglish,
                address: lDto.ProposerDetails[0].PermanentAdrress.AddressEnglish,
              },
            ],
            customOnChange: (e, a) => OnPolicyHolderName(e, a),
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.0.PolicyHolderDetails.Address",
            onChangeFuncs: [IsAlphaNoSpace],
          },
        ],
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
            type: "Input",
            label: "Insurance Type",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.InsuranceType",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            required: true,
            visible: true,
            options: masters.DirectDiscount,
            path: "InsurableItem.0.RiskItems.0.DirectDiscount",
            customOnChange: (e, a) => OnDirectDiscountAgent(e, a),
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Province/State",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.ProvinceState",
            options: masters.State,
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State6"),
          },
          {
            type: "AutoComplete",
            label: "District",
            required: true,
            visible: true,
            options:
              lDto.InsurableItem[0].RiskItems[0].RiskLocation.ProvinceState !== ""
                ? masters.District6
                : [],
            path: "InsurableItem.0.RiskItems.0.RiskLocation.District",
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District6"),
          },
          {
            type: "AutoComplete",
            label: "Muncipality",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.Municipality",
            options:
              lDto.InsurableItem[0].RiskItems[0].RiskLocation.District !== ""
                ? masters.Municipality6
                : [],
            // customOnChange: (e, a) => onPlaceSelect(e, a, "Municipality6"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            options: masters.WardNumber,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.WardNumber",
          },
          {
            type: "Input",
            label: "Tole/Street Name in English",
            path: "InsurableItem.0.RiskItems.0.RiskLocation.ToleStreetNameEnglish",
            visible: true,
            name: "ToleStreetNameEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Street Name in Nepali",
            path: "InsurableItem.0.RiskItems.0.RiskLocation.ToleStreetNameNepali",
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Plot Number",
            path: "InsurableItem.0.RiskItems.0.RiskLocation.PlotNumber",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Home Number",
            path: "InsurableItem.0.RiskItems.0.RiskLocation.HomeNumber",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "House Owner Name",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.RiskLocation.HouseOwnerName",
            onChangeFuncs: [IsAlphaNoSpace],
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Construction of Building",
            required: true,
            visible: true,
            path: "InsurableItem.0.RiskItems.0.ConstructionofBuilding",
            options: masters.PropertyType,
          },
          {
            type: "Input",
            label: "Other Details related to Home",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.OtherDetailsrelatedtoHome",
          },
        ],
        [
          {
            // type: "AutoComplete",
            type: "Input",
            label: "Building ",
            visible: true,
            required: true,
            path: `InsurableItem.0.RiskItems.0.Building`,
            disableOnReset: true,
            disabled: true,
            // options: masters.Building.filter((x1) => x1.mID === 501),
          },
          {
            type: "Input",
            label: "Sum Insured",
            visible: true,
            required: true,
            path: `InsurableItem.0.RiskItems.0.BuildingSumInsured`,
            onBlurFuncs: [IsNumericGreaterThanZero],
            onChangeFuncs: [IsNumeric],
            customOnChange: (e) => OnBuildingTotalSumInsured(e),
          },
          {
            type: "Input",
            label: "Remarks",
            visible: true,
            required: true,
            path: `InsurableItem.0.RiskItems.0.BuildingRemarks`,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Custom",
            visible: true,
            spacing: 6,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#F0F0F0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                p={3}
              >
                <MDTypography variant="h6">Total Building Sum Insured</MDTypography>
                <MDTypography>
                  रु {formater.format(lDto.InsurableItem[0].RiskItems[0].TotalBuildingSumInsured)}
                </MDTypography>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
          },

          ...spreadPropertyGoods(),

          // {
          //   type: "Button",
          //   label: "Add",
          //   visible: true,
          //   // onClick: () => AddPropertyGoods(),
          //   spacing: 3,
          // },
          {
            type: "Custom",
            visible: true,
            spacing: 6,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#F0F0F0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                p={3}
              >
                <MDTypography variant="h6">Total Goods Sum Insured</MDTypography>
                <MDTypography>
                  रु {formater.format(lDto.InsurableItem[0].RiskItems[0].TotalGoodsSumInsured)}
                </MDTypography>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            label: "",
          },
          {
            type: "Custom",
            visible: true,
            spacing: 6,
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
                <MDTypography>रु {formater.format(lDto.TotalSumInsured11)}</MDTypography>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
          },
          {
            type: "Input",
            visible: true,
            multiline: "multiline",
            rows: 4,
            label: "General Description",
            path: "InsurableItem.0.RiskItems.0.GeneralDescription",
            spacing: 6,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            visible: true,
            multiline: "multiline",
            rows: 4,
            label: "Warranty",
            path: "InsurableItem.0.RiskItems.0.Warranties",
            spacing: 6,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
        ],
        [...SpreadRollOverDocuments()],
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
          // {
          //   type: "Input",
          //   label: "Basic Premium",
          //   // required: true,
          //   visible: true,
          //   disabled: true,
          // },
          // {
          //   type: "Input",
          //   label: "Discount Amount",
          //   // required: true,
          //   visible: true,
          //   disabled: true,
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
                      <Typography>Discount Amount</Typography>
                      <Typography> Basic Premium After Discount</Typography>
                      <Typography>VAT</Typography>
                      <Typography>Premium After VAT</Typography>
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
                    <Grid item xs={3}>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.BasicPremium")}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(
                          lDto,
                          "FormatedData.CalculatedPremiumDetails.DiscountAmount"
                        )}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(
                          lDto,
                          "FormatedData.CalculatedPremiumDetails.BasicPremiumAfterDiscount"
                        )}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.VAT")}
                      </Typography>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        {objectPath.get(
                          lDto,
                          "FormatedData.CalculatedPremiumDetails.PremiumAfterVAT"
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
                    <Grid item xs={3}>
                      <Typography sx={{ display: "flex", justifyContent: "right" }}>
                        <b>
                          {objectPath.get(
                            lDto,
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
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.CommissionPercentage"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
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
const getOnNextClick = async ({ activeStep, setBackDropFlag, dto, setDto }) => {
  //   if (activeStep === 0) {
  //   }
  let fun = false;
  const lDto = dto;

  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // const onTotalSum1 = (dto, setDto) => {
  //   // console.log(dto, 11);
  //   const lDto = dto;
  //   lDto.TotalSumInsured = lDto.ListofProperty.TotalSumInsured;
  //   setDto({ ...lDto });
  // };
  if (lDto !== null) {
    switch (activeStep) {
      case 0:
        lDto.TotalSumInsured = lDto.ListofProperty.TotalSumInsured;
        setDto({ ...lDto });
        fun = await GenericApi("NepalPropertyInsurance", "NepalPropertyAPI", lDto).then(
          async (x) => {
            if (x.finalResult) {
              lDto.PremiumDetails = x.finalResult;
              lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
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
                <div>Direct Discount</div>
                <div>Premium after Direct Discount</div>
                <div>VAT</div>
                <div>Premium After VAT</div>
                <div>Stamp Duty</div>
                <div><b>Total Premium</b></div>
              </div>
              <div style="flex: 1.7;text-align: right;font-size:16.3px; margin-right: 0rem" ">
              <div>रु</div>
              <div>रु</div>
              <div>रु</div>
              <div>रु</div>
              <div>रु</div>
              <div>रु</div>
              <div><b>रु</b></div>
            </div>  
            <div style="flex: 1.3; text-align: right; margin-right: 0rem" ">
            <div> ${formater.format(x.finalResult.BasicPremium)}</div>
            <div> ${formater.format(x.finalResult.DiscountAmount)}</div>
            <div> ${formater.format(x.finalResult.BasicPremiumAfterDiscount)}</div>
            <div> ${formater.format(x.finalResult.VAT)}</div>
            <div> ${formater.format(x.finalResult.PremiumAfterVAT)}</div>
                <div> ${formater.format(x.finalResult.StampDuty)}</div>
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
              setDto({ ...lDto });
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
        fun = true;
        // lDto.TotalSumInsured = "";
        // setDto({ ...lDto });
        break;
      case 2:
        fun = true;
        break;
      case 3:
        lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = lDto.TotalSumInsured11;
        lDto.TotalSumInsured = lDto.TotalSumInsured11;
        setDto({ ...lDto });
        fun = await GenericApi("NepalPropertyInsurance", "NepalPropertyAPI", lDto).then(
          async (x) => {
            if (x.finalResult) {
              lDto.PremiumDetails = x.finalResult;
              lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              await QuotationUpdate(lDto);
              lDto.ProposerDetails = [lDto.ProposerDetails];
              objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.BasicPremium",
                formater.format(x.finalResult.BasicPremium)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.DiscountAmount",
                formater.format(x.finalResult.DiscountAmount)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.BasicPremiumAfterDiscount",
                formater.format(x.finalResult.BasicPremiumAfterDiscount)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.VAT",
                formater.format(x.finalResult.VAT)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumAfterVAT",
                formater.format(x.finalResult.PremiumAfterVAT)
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
                "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
                x.finalResult.CommissionPercentage
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.CommissionAmount",
                formater.format(x.finalResult.CommissionAmount)
              );
              lDto.FormatedData.CalculatedPremiumDetails.TotalSumInsured = formater.format(
                lDto.TotalSumInsured
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
          // debugger;
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          fun = await GenericApi("NepalPropertyInsurance", "NepalPropertyProposalAPI", lDto).then(
            async (x) => {
              lDto.ProposerDetails = [lDto.ProposerDetails];
              // lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              // await SaveCreateProposal(lDto).then(async (x) => {
              // lDto.ProposerDetails = [lDto.ProposerDetails];
              if (x.finalResult.proposalNumber) {
                await GetProductByCode("NepalPropertyInsurance").then(async (x2) => {
                  lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
                  const res = await GetProposalByNumber(
                    x.finalResult.proposalNumber,
                    x2.data.productId
                  );
                  lDto.KYCNo = res.data[0].policyDetails.KYCNo;
                  lDto.ProposerDetails = [lDto.ProposerDetails];
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
              return fun;
            }
          );
        } else if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          const x = await UpdateProposalDetails(lDto);
          lDto.ProposerDetails = [lDto.ProposerDetails];
          setDto({ ...lDto });
          if (x.data.responseMessage === "Updated successfully") {
            await GetProductByCode("NepalPropertyInsurance").then(async (x2) => {
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);
              lDto.ProposerDetails = [lDto.ProposerDetails];
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
            // cancelButtonColor: "#ef5350",
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
  const onReset0 = (dto, setDto) => {
    const lDto = dto;
    lDto.RollOverDocuments = RollOverDocuments();
    lDto.ListofProperty.TotalSumInsured = "";
    setDto({ ...lDto });
  };
  const onReset1 = (dto, setDto) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.ProposerDetails = [{ ...ProposerDetails() }];
    setDto({ ...lDto });
  };

  const onReset2 = (dto, setDto) => {
    const lDto = dto;
    lDto.RollOverDocuments = RollOverDocuments();
    lDto.InsurableItem[0].RiskItems = [{ ...RiskItems() }];
    lDto.TotalSumInsured11 = "";
    setDto({ ...lDto });
  };

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true, onClick: onReset0 },
        next: {
          label: "Calculate Premium",
          visible: true,
          loader: "backDrop",
        },
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
    State: [],
    Company: "",
    BankDetails: [],
    BankorFinancialInstituionNameinEnglish: [],
    BranchMasters: [],
    placeMasters: [{ district: [], municipality: [] }],
  };

  await GetProdPartnermasterData("State", {}).then((r) => {
    masters.State = r.data;
  });
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
