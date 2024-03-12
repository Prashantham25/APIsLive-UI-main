import React, { useState } from "react";
import {
  IsNumeric,
  IsFreetextNoSpace,
  IsEmail,
  IsNumaricSpecialNoSpace,
  IsMobileNumber,
  addDays1,
  AgeCalculator,
} from "Common/Validations";

import MDButton from "components/MDButton";
import Success from "assets/images/Nepal/Success.png";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
// import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import objectPath from "object-path";
// import { Stack, Grid, Typography, Divider, List, Checkbox, Button } from "@mui/material";
import { Stack, Grid, Typography, List, Checkbox, Divider } from "@mui/material";
// import { blue } from "@mui/material/colors";
import swal2 from "sweetalert2";
import swal from "sweetalert";

import PaymentPage from "../../Payment";
import { GetTemplatePayload, GetProposalByNumber, UpdateWorkflowStatus } from "../../Payment/Apis";
import {
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  GetNPCommonMaster,
  GetProdPartnermasterData,
  IsNumeric1,
  Transliteration,
  DeleteDocument,
  DocumenUpload,
  SavepolicyWFStatus,
  GenericApi,
  SaveQuotation,
  QuotationUpdate,
  SaveCreateProposal,
  UpdateProposalDetails,
  SendNotification,
  // NumberofDaysinYear,
  PolicyStartDateFiscalYear,
  PolicyStartDateMaxDate,
  GetProductByCode,
} from "./data/APIs/MotorCycleApi";

import { HoneyBeeJson, otherdocDetails } from "./data/Json/AgriLiveStockJson";
import { Bankdetails } from "./data/Json/PrivateVehicleJson";

import { BranchDetails } from "./data/Json/CommercialJson";
import { useDataController } from "../../../../../BrokerPortal/context";
import { docDetails, ProposerDetails } from "./data/Json/PropertyInsuranceJson";

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = HoneyBeeJson();
  if (
    genericInfo.Flow &&
    (genericInfo.Flow === "DisApproveFlow" ||
      genericInfo.Flow === "Approved" ||
      genericInfo.Flow === "DebitFlow")
  ) {
    dto = { ...dto, ...PolicyDto };
    dto.ProposerDetails = [PolicyDto.ProposerDetails];
  }
  console.log(111, dto);
  return dto;
};

const getProcessSteps = () => {
  const steps = [
    "Quote Page",
    "Customer details",
    "LiveStock Details",
    "Risk Details",
    "Nominee Details",
    "Premium Summary",
    "Payment Page",
  ];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto }) => {
  // const [control] = useDataController();
  // const { genericPolicyDto } = control;
  // const dto = genericPolicyDto;

  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push({
        name: `Branch Details ${i + 1}`,
        visible: dto.FinancingType === "BankorFinancialInstitution",
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
      steps = [
        { name: "Quote Details", visible: true },
        { name: "HoneyBee Information", visible: true },
        { name: "Owner Accidental Details", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "", visible: true }, // Customer Details
        {
          name: "Bank/Financial Institution Details",
          visible: dto.FinancingType === "BankorFinancialInstitution",
        },
        {
          name: "Branch Details",
          visible:
            dto.FinancingType === "BankorFinancialInstitution" &&
            dto.Bankdetails.BankCategory !== "" &&
            dto.Bankdetails.BankorFinancialInstituionNameinEnglish !== "",
        },
        ...spreadBranchDetails().filter((x, i) => i !== 0),

        {
          name: "Proposer Details",
          visible: dto.FinancingType !== "",
        },
        { name: "Insured Details", visible: dto.FinancingType !== "" },

        ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        { name: "Care Of Details", visible: dto.FinancingType !== "" },
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
      steps = [{ name: "Premium Breakup", visible: true }];
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

const getSectionContent = ({ activeStep, masters, dto, setDto, setMasters }) => {
  let data = [];
  const [control] = useDataController();
  const { genericInfo, loginUserDetails } = control;
  const lDto = dto;
  const masters1 = masters;

  const handleTotalSumInsured = async (e) => {
    if (e.target.value !== "" || e.target.value !== undefined) {
      lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = e.target.value;
      setDto({ ...lDto });
    } else {
      lDto.InsurableItem[0].RiskItems[0].TotalSumInsured = "";

      setDto({ ...lDto });
    }
    lDto.ICShortName = masters.Company;
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
    }
    setDto({ ...lDto });
    // setMasters({ ...masters1 });
  };

  const OnFinancingDetails = (e) => {
    if (e != null) {
      lDto.FinancingType = e.target.value;
    } else {
      lDto.FinancingType = "";
    }
    lDto.PolicyRiskCategory = "";
    lDto.PolicyRiskType = "";
    lDto.Bankdetails = { ...Bankdetails() };
    lDto.ProposerDetails = [{ ...ProposerDetails() }];
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    setDto({ ...lDto });
  };

  const handleNoOfHives = (e, key) => {
    if (key === "noHives") {
      lDto.InsurableItem[0].RiskItems[0].NoofHivesofBees = e.target.value;
    } else if (key === "purchasecost") {
      lDto.InsurableItem[0].RiskItems[0].PurchaseCostPerHive = e.target.value;
    } else if (key === "purchasecostbees") {
      lDto.InsurableItem[0].RiskItems[0].Purchasecostofnoofbeessphereperhive = e.target.value;
    } else if (key === "avgcost") {
      lDto.InsurableItem[0].RiskItems[0].AvgManagementCostPerHive = e.target.value;
    }
    lDto.InsurableItem[0].RiskItems[0].HiveSumInsured =
      Number(lDto.InsurableItem[0].RiskItems[0].NoofHivesofBees) *
      Number(lDto.InsurableItem[0].RiskItems[0].PurchaseCostPerHive);

    lDto.InsurableItem[0].RiskItems[0].BeesSphereSumInsured =
      Number(lDto.InsurableItem[0].RiskItems[0].NoofHivesofBees) *
      Number(lDto.InsurableItem[0].RiskItems[0].Purchasecostofnoofbeessphereperhive);

    lDto.InsurableItem[0].RiskItems[0].ManagementSumInsured =
      Number(lDto.InsurableItem[0].RiskItems[0].NoofHivesofBees) *
      Number(lDto.InsurableItem[0].RiskItems[0].AvgManagementCostPerHive);

    lDto.InsurableItem[0].RiskItems[0].TotalSumInsured =
      Number(lDto.InsurableItem[0].RiskItems[0].HiveSumInsured) +
      Number(lDto.InsurableItem[0].RiskItems[0].BeesSphereSumInsured) +
      Number(lDto.InsurableItem[0].RiskItems[0].ManagementSumInsured);

    lDto.ProductLogo = genericInfo.ProductLogo;
    lDto.CompanyName = process.env.REACT_APP_CompanyName;
    lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
    lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
    lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;

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

  const onBlurTransliteration = async (e, index, EF, ET) => {
    // production
    EF(false);
    ET("");
    // production
    // production
    if (process.env.NODE_ENV === "production") {
      const iText = e.target.value;
      const varName = e.target.name;
      const obj = {
        textList: [{ Text: iText }],
      };
      if (iText !== "") {
        const res = await Transliteration(obj);
        // const oText = res[0].text;

        const oText = res?.[0]?.text ? res[0].text : "";

        if (varName === "InsuredNameEnglish") lDto.ProposerDetails[index].InsuredNameNepali = oText;

        if (varName === "AddressEnglish1")
          lDto.Bankdetails.BranchDetails[index].AddressNepali = oText;
        if (varName === "AddressEnglish3") lDto.Bankdetails.AddressNepali = oText;
        if (varName === "AddressEnglish")
          lDto.ProposerDetails[index].PermanentAdrress.AddressNepali = oText;

        if (varName === "AddressEnglish4") lDto.RiskAddressDetails.AddressNepali = oText;

        if (varName === "MemberNameEnglish") lDto.ProposerDetails[index].MemberNameNepali = oText;
        if (varName === "DesignationEnglish") lDto.ProposerDetails[index].DesignationNepali = oText;
        if (varName === "HusbandNameEnglish") lDto.ProposerDetails[index].HusbandNameNepali = oText;
        if (varName === "WifeNameEnglish") lDto.ProposerDetails[index].WifeNameNepali = oText;
        if (varName === "FatherNameEnglish") lDto.ProposerDetails[index].FatherNameNepali = oText;
        if (varName === "GrandfatherNameEnglish")
          lDto.ProposerDetails[index].GrandfatherNameNepali = oText;
        if (varName === "BranchNameinEnglish") {
          lDto.Bankdetails.BranchDetails[index].AddressNepali = Text;
        }

        if (varName === "TownEnglish")
          lDto.ProposerDetails[index].PermanentAdrress.TownNepali = oText;
        // if (varName === "TownEnglish1")
        //   lDto.ProposerDetailsArray[0].PermanentAdrress.TownNepali = oText;
        if (varName === "CityEnglish")
          lDto.ProposerDetails[index].PermanentAdrress.CityNepali = oText;

        if (varName === "ResidenceEnglish")
          lDto.ProposerDetails[index].CommunicationAddress.ResidenceNepali = oText;

        if (varName === "TempAddresEnglish")
          lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = oText;

        if (varName === "TemporaryAddressEnglish")
          lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = oText;

        if (varName === "CareofNameEnglish") lDto.ProposerDetails[0].CareofNameNepali = oText;
        if (varName === "CareofAddressEnglish") lDto.ProposerDetails[0].CareofAddressNepali = oText;

        if (varName === "ProprietorNameEnglish")
          lDto.ProposerDetails[0].ProprietorNameNepali = oText;

        if (varName === "BankorFinancialInstituionNameinEnglish")
          lDto.Bankdetails.BankorFinancialInstituionNameinNepali = oText;
      } else {
        if (varName === "InsuredNameEnglish") lDto.ProposerDetails[index].InsuredNameNepali = "";

        if (varName === "AddressEnglish1") lDto.Bankdetails.BranchDetails[index].AddressNepali = "";
        if (varName === "AddressEnglish3") lDto.Bankdetails.AddressNepali = "";
        if (varName === "AddressEnglish")
          lDto.ProposerDetails[index].PermanentAdrress.AddressNepali = "";

        if (varName === "AddressEnglish4") lDto.RiskAddressDetails.AddressNepali = "";

        if (varName === "MemberNameEnglish") lDto.ProposerDetails[index].MemberNameNepali = "";
        if (varName === "DesignationEnglish") lDto.ProposerDetails[index].DesignationNepali = "";
        if (varName === "HusbandNameEnglish") lDto.ProposerDetails[index].HusbandNameNepali = "";
        if (varName === "WifeNameEnglish") lDto.ProposerDetails[index].WifeNameNepali = "";
        if (varName === "FatherNameEnglish") lDto.ProposerDetails[index].FatherNameNepali = "";
        if (varName === "GrandfatherNameEnglish")
          lDto.ProposerDetails[index].GrandfatherNameNepali = "";
        if (varName === "BranchNameinEnglish") {
          lDto.Bankdetails.BranchDetails[index].AddressNepali = Text;
        }

        if (varName === "TownEnglish") lDto.ProposerDetails[index].PermanentAdrress.TownNepali = "";
        // if (varName === "TownEnglish1")
        //   lDto.ProposerDetailsArray[0].PermanentAdrress.TownNepali = "";
        if (varName === "CityEnglish") lDto.ProposerDetails[index].PermanentAdrress.CityNepali = "";

        if (varName === "ResidenceEnglish")
          lDto.ProposerDetails[index].CommunicationAddress.ResidenceNepali = "";

        if (varName === "TempAddresEnglish")
          lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = "";

        if (varName === "TemporaryAddressEnglish")
          lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = "";

        if (varName === "CareofNameEnglish") lDto.ProposerDetails[0].CareofNameNepali = "";
        if (varName === "CareofAddressEnglish") lDto.ProposerDetails[0].CareofAddressNepali = "";

        if (varName === "ProprietorNameEnglish") lDto.ProposerDetails[0].ProprietorNameNepali = "";

        if (varName === "BankorFinancialInstituionNameinEnglish")
          lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
      }
      setDto({ ...lDto });
    }
  };

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear() - 16);

  const OnPSDSelect = (e, d) => {
    // debugger;
    lDto.PolicyStartDate = d;
    // lDto.NumberofDays = NumberofDaysinYear(d.split("/")[2]);
    // lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    lDto.NumberofDays = "";
    lDto.PolicyEndDate = "";

    setDto({ ...lDto });
  };
  // const OnNumberofDays = (e) => {
  //   lDto.NumberofDays = e.target.value;

  //   if (
  //     NumBetween(
  //       lDto.NumberofDays,
  //       1,
  //       Number(NumberofDaysinYear(lDto.PolicyStartDate.split("/")[2])),
  //       1
  //     ) === true
  //   ) {
  //     lDto.PolicyEndDate = addDays1(
  //       lDto.PolicyStartDate,
  //       NumberofDaysinYear(lDto.PolicyStartDate.split("/")[2])
  //     );
  //     setDto({ ...lDto });
  //   } else {
  //     swal2.fire({
  //       icon: "error",
  //       text: `Number of days should be in between 1 to ${NumberofDaysinYear(
  //         lDto.PolicyStartDate.split("/")[2]
  //       )} days`,
  //       confirmButtonColor: "#0079CE",
  //     });
  //     lDto.PolicyStartDate = DateFormatFromDateObject(new Date(), "m/d/y");
  //     setDto({ ...lDto });
  //     lDto.NumberofDays = NumberofDaysinYear(lDto.PolicyStartDate.split("/")[2]);
  //     setDto({ ...lDto });
  //     lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
  //   }

  //   setDto({ ...lDto });
  // };

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const OnNumberofDays = (e) => {
    // debugger;
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
        swal2.fire({
          icon: "error",
          text: `Number of days should be in between 1 to 365 days`,
          confirmButtonColor: "#0079CE",
        });
        lDto.NumberofDays = "";
      }
    } else if (lDto.NumberofDays > 366) {
      swal2.fire({
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

    // if (Number(lDto.NumberofDays) > 366) {
    //   swal2.fire({
    //     icon: "error",
    //     text: "Number of days should be in between 1 to 366 days",
    //     confirmButtonColor: "#0079CE",
    //   });
    //   lDto.NumberofDays = "";
    //   lDto.PolicyEndDate = "";
    // } else if (lDto.NumberofDays === "") {
    //   lDto.NumberofDays = "";
    //   lDto.PolicyEndDate = "";
    // }
    // setDto({ ...lDto });
  };

  const onDOBselect = (e, d, i) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      lDto.ProposerDetails[i].DoB = "";
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

  const Navigate = useNavigate();
  const onModalclose = () => {
    Navigate("/retail/home");
  };

  const onSaveModalClose = async () => {
    if (genericInfo && genericInfo.ProposalNo !== undefined) {
      await UpdateProposalDetails(dto).then(async () => {
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
    // console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
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

  const onDebitNoteClick = async (e, key) => {
    // lDto.ProposerDetails = [lDto.ProposerDetails];
    let Class = "";

    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Class = 301;
    }
    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      Class = 301;
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
      }
    });
    if (key === "SAVE DEBIT NOTE") {
      onSaveModalClose();
    }
  };

  const handleBankCategory = async (e, a, key) => {
    // console.log("aaaaa", a);
    // debugger;
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
          lDto.Bankdetails.BranchDetails[i].Bank = "";
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
        masters1.Municipality2 = [];
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
        // masters1.Municipality1 = [];
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
    if (n === "District3") {
      if (a !== null) {
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
    setDto({ ...lDto });
    setMasters({ ...masters1 });
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
        // swal({
        //   icon: "success",
        //   text: "Document uploaded successfully",
        // });
      }
    });
  };

  const handleFileUpload = async (event, i1, index) => {
    await onDocUplode(event.target.files[0], i1, index);
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file1.target.value = "";
  };

  const handleDublicateDoc = (e, i1, index) => {
    lDto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        lDto.ProposerDetails[i1].documentDetails[index].DocName = "";

        swal({
          icon: "error",
          text: `"${e.target.value}" Already Exist`,
        });
      }
    });
    setDto({ ...lDto });
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

  const onAddDocument = (i) => {
    lDto.ProposerDetails[i].documentDetails = [
      ...lDto.ProposerDetails[i].documentDetails,
      { ...docDetails() },
    ];

    setDto({ ...lDto });
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
          name: "DocName",
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

  const onAddOtherDocument = () => {
    lDto.InsurableItem[0].OtherDocuments = [
      ...dto.InsurableItem[0].OtherDocuments,
      { ...otherdocDetails() },
    ];
    setDto({ ...lDto });
  };

  const onOtherDocUplode = async (file, i) => {
    // console.log(event);
    // const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        lDto.InsurableItem[0].OtherDocuments[i].DocumentFileName = file.name;
        lDto.InsurableItem[0].OtherDocuments[i].UploadDocDate = new Date().toLocaleDateString();
        lDto.InsurableItem[0].OtherDocuments[i].DocId = result.data[0].docid;
        setDto({ ...lDto });
        // swal2.fire({
        //   icon: "success",
        //   text: "Document uploaded successfully",
        // });
      }
    });
  };

  const handleOtherFileUpload = async (event, index) => {
    await onOtherDocUplode(event.target.files[0], index);
    const inputElement = document.getElementById("fileInput");
    const file2 = event;
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file2.target.value = "";
  };

  const onotherCancelClick = async (index) => {
    const file = lDto.InsurableItem[0].OtherDocuments[index].DocumentFileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.InsurableItem[0].OtherDocuments[index].DocumentFileName = "";
        lDto.InsurableItem[0].OtherDocuments[index].DocId = "";
        lDto.InsurableItem[0].OtherDocuments[index].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };

  const handleOtherDublicateDoc = (e, DocName, index) => {
    console.log(11111111);
    lDto.InsurableItem[0].OtherDocuments.forEach((x, i) => {
      // if (x.DocName === e.target.value && i !== index) {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        // lDto.documentDetails[index][e.target.name] = "";
        lDto.InsurableItem[0].OtherDocuments[index].DocName = "";
        // setDocCountList([...docCountList]);

        swal({
          icon: "error",
          text: `"${e.target.value}" Already Exist`,
        });
      }
    });
    setDto({ ...lDto });
  };

  const handleotherDocFileDelete = async (i) => {
    const file = lDto.InsurableItem[0].OtherDocuments[i].DocumentFileName;
    if (file !== "") await DeleteDocument(file);
    const arr1 = dto.InsurableItem[0].OtherDocuments.filter((x, i1) => i1 !== i);
    lDto.InsurableItem[0].OtherDocuments = arr1;
    setDto({ ...lDto });
  };

  const spreadOtherDocumentDetails = () => {
    const arr = [];
    dto.InsurableItem[0].OtherDocuments.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: true,
          name: "DocName",
          label: "Document Name",
          path: `InsurableItem.0.OtherDocuments.${i}.DocName`,
          onChangeFuncs: [IsFreetextNoSpace],
          customOnBlur: (e) => handleOtherDublicateDoc(e, "DocName", i),
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

          sx: { fontSize: "15px", paddingTop: 1 },
        },
        {
          type: "IconButton",
          icon: "close",
          spacing: 2.9,
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
          visible: i !== 0,
          // align: "right",
          justifyContent: "end",
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
          required: true,

          name: "BranchNameinEnglish",
          disabled: true,
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
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State3", i),
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
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District3", i),
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

  const OnProfilePicture = async (e, i) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file, file.name);

    await DocumenUpload(formData);

    lDto.ProposerDetails[i].ProfilePicture = file.name;

    setDto({ ...lDto });

    // swal({
    //   icon: "success",

    //   text: "Document uploaded successfully",
    // });
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

  const IsNumericGreaterThanZero = (number) => {
    const regex = /^(?!(0))[0-9]*$/;
    if (regex.test(number)) return true;
    return "Value must be greater than zero and Numeric";
  };

  // const RemoveMultiKYC = (e) => {
  //   // debugger;
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

  // const OnADDMultiKYCDetails = () => {
  //   lDto.ProposerDetails.push({ ...ProposerDetails() });
  //   lDto.NumberofInsured = lDto.ProposerDetails.length;
  //   setDto({ ...lDto });
  // };
  const RemoveMultiKYCDetails = (i) => {
    const arr = lDto.ProposerDetails.filter((x, i1) => i1 !== i);
    lDto.ProposerDetails = arr;
    lDto.NumberofInsured = lDto.ProposerDetails.length;
    setDto({ ...lDto });
  };

  // const handleIssuingBranch = (e, a, key) => {
  //   if (key === "InsuredType") {
  //     if (a !== null) {
  //       lDto.ProposerDetails[0].InsuredType = a.mValue;
  //       lDto.InsuredTypeCode = a.shortCode;
  //       if (lDto.ProvinceCode !== undefined) {
  //         lDto.Prefix = lDto.ProvinceCode.concat("/", a.shortCode)
  //           .concat("/", lDto.ShortCode, "/")
  //           .concat(",", lDto.ProvinceCode)
  //           .concat("/", lDto.ShortCode, "/");
  //       }
  //       setDto({ ...lDto });
  //     } else {
  //       lDto.ProposerDetails[0].InsuredType = "";
  //       lDto.InsuredTypeCode = "";
  //       setDto({ ...lDto });
  //     }
  //   }
  //   if (key === "IssuingBranch") {
  //     if (a !== null) {
  //       lDto.Channel.IssuingBranch = a.mValue;
  //       lDto.Prefix = a.ProvinceCode.concat("/", dto.InsuredTypeCode)
  //         .concat("/", a.ShortCode, "/")
  //         .concat(",", a.ProvinceCode)
  //         .concat("/", a.ShortCode, "/");
  //       lDto.ProvinceCode = a.ProvinceCode;
  //       lDto.ShortCode = a.ShortCode;
  //       const BusinessTypeCode = lDto.DocType[0];
  //       lDto.PolicyPrefix = a.ProvinceCode.concat("/", a.ShortCode, "/", "AGR").concat(
  //         "/",
  //         "BEE",
  //         "/",
  //         BusinessTypeCode,
  //         "/",
  //         lDto.Channel.FiscalYear,
  //         "/"
  //       );
  //       lDto.Suffix = "-".concat(lDto.Channel.FiscalYear, ",");
  //     } else {
  //       lDto.Channel.IssuingBranch = "";
  //     }
  //   }
  //   setDto({ ...lDto });
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
          "BEE",
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
          required: false,
        },
        {
          type: "Input",
          label: "Insured Name English",
          visible: true,
          required: true,
          path: `ProposerDetails.${i}.InsuredNameEnglish`,
          name: "InsuredNameEnglish",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Insured Name Nepali",
          visible: true,
          path: `ProposerDetails.${i}.InsuredNameNepali`,
          required: false,
          disabled: true,
        },
        {
          type: "Input",
          label: "KYC Classification",
          visible: true,
          path: `ProposerDetails.${i}.KYCClassification`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          required: false,
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
          required: false,
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
          required: false,
        },
        {
          type: "Input",
          label: "Email Address",
          visible: true,
          path: `ProposerDetails.${i}.EmailId`,
          onBlurFuncs: [IsEmail],
          required: false,
        },
        {
          type: "Input",
          label: "PAN Number",
          visible: true,
          path: `ProposerDetails.${i}.PANNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],

          required:
            lDto.ProposerDetails[0].InsuredType !== "Individual" &&
            lDto.ProposerDetails[0].InsuredType !== "Government body",
        },
        {
          type: "Input",
          label: "VAT Number",
          visible: true,
          path: `ProposerDetails.${i}.VATNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          InputProps: { maxLength: 9 },
          required: false,
        },
        {
          type: "Input",
          label: "Registration Number",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          required: false,
        },
        {
          type: "MDDatePicker",
          label: "Registration Date",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationDate`,
          required: false,
        },
        {
          type: "MDDatePicker",
          label: "Registration Close Date",
          visible: true,
          path: `ProposerDetails.${i}.RegisterationCloseDate`,
          disabled: dto.ProposerDetails[i].RegistrationDate === "",
          minDate: new Date(lDto.ProposerDetails[i].RegistrationDate),
          required: false,
        },
        {
          type: "Input",
          label: "Registration Office",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationOffice`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          required: false,
        },
        {
          type: "Input",
          label: "Reference Insured Name",
          visible: true,
          path: `ProposerDetails.${i}.ReferenceInsuredName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          required: false,
        },
        {
          type: "Input",
          label: "Phone Number",
          visible: true,
          path: `ProposerDetails.${i}.PhoneNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
          required: false,
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
          required: false,
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
          options: masters.State,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State2", i),
          required: true,
        },
        {
          type: "AutoComplete",
          label: "District",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.District`,
          options: masters.District2,
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District2", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Municipality`,
          options: masters.Municipality2,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.WardNumber`,
          options: masters.WardNumber,
          required: false,
        },
        {
          type: "Input",
          label: "Address(English) ",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,

          name: "AddressEnglish",
          required: true,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Address(Nepali) ",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          onChangeFuncs: [IsFreetextNoSpace],
          disabled: true,
          required: false,
        },
        {
          type: "Input",
          label: "Area",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Area`,
          onChangeFuncs: [IsAlphaNoSpace],
          required: false,
        },
        {
          type: "Input",
          label: "Tole/StreetName",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          required: false,
        },
        {
          type: "Input",
          label: "House Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.HouseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          required: false,
        },
        {
          type: "Input",
          label: "Plot Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.PlotNumber`,
          onChangeFuncs: [IsNumeric],
          required: false,
        },
        {
          type: "Input",
          label: "Temporary Address-English ",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,

          name: "TempAddresEnglish",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          onChangeFuncs: [IsFreetextNoSpace],
          required: false,
        },
        {
          type: "Input",
          label: "Temporary Address-Nepali ",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
          disabled: true,
          required: false,
        },
        {
          type: "Typography",
          label: "Document Section",
          visible: true,
          spacing: 12,
        },
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
          spacing: 3,
          sx: { fontSize: "14px" },
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
          name: "HusbandNameEnglish",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Husband's Name(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Wife Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "WifeNameEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          required: false,
        },
        {
          type: "Input",
          label: "Wife Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Father Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "FatherNameEnglish",
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
          required: false,
        },
        {
          type: "Input",
          label: "GrandFather Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "GrandfatherNameEnglish",
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
          required: false,
        },
        {
          type: "Input",
          label: "Nationality (English)",
          visible: true,
          path: `ProposerDetails.${i}.NationalityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Permanent Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "AddressEnglish",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Permanent Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Town (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "TownEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          required: false,
        },
        {
          type: "Input",
          label: "Town (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "City (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "CityEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          required: false,
        },
        {
          type: "Input",
          label: "City (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Temporary Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "TemporaryAddressEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          required: false,
        },
        {
          type: "Input",
          label: "Temporary Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
          required: false,
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
          required: false,
        },
        {
          type: "Input",
          label: "Residence(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.ResidenceNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
          required: false,
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
          required: true,
          visible: true,

          name: "mPStartDate",
          path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
          maxDate: new Date(),
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
          label: "Passport Number",
          visible: true,
          path: `ProposerDetails.${i}.PassportNumber`,

          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "MDDatePicker",
          label: "Passport Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportIssuedDate`,
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "MDDatePicker",
          label: "Passport Expiry Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportExpiryDate`,
          // minDate: new Date(lDto.ProposerDetails[0].PassportIssuedDate),
          minDate: new Date(lDto.ProposerDetails[0].PassportIssuedDate).setDate(
            new Date(lDto.ProposerDetails[0].PassportIssuedDate).getDate() + 1
          ),
          accordionId: 1,
          spacing: 3,
          required: false,
        },
        {
          type: "RadioGroup",
          visible: true,
          required: false,
          radioLabel: { label: "Passport Issued By", labelVisible: true },
          radioList: [
            { value: "India", label: "India" },
            { value: "Nepal", label: "Nepal" },
          ],
          path: `ProposerDetails.${i}.PassportIssuedBy`,
          spacing: 12,
          accordionId: 1,
        },
        {
          type: "Input",
          label: "License Number",
          visible: true,
          spacing: 3,
          path: `ProposerDetails.${i}.LicenseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 1,
          required: false,
        },
        {
          type: "Input",
          label: "Occupation",
          visible: true,
          path: `ProposerDetails.${i}.InsuredOccupation`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 1,
          spacing: 3,
          required: false,
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
          required: false,
        },

        {
          type: "Input",
          label: "Name of the Organization",
          visible: true,
          // path: `ProposerDetails.${i}.InsuredNameEnglish`,
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
          onChangeFuncs: [IsNumaricSpecialNoSpace],
          accordionId: 2,
          spacing: 3,
          required: false,
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
          required: false,
        },
        {
          type: "Input",
          label: "Role",
          visible: true,
          path: `ProposerDetails.${i}.Role`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 2,
          spacing: 3,
          required: false,
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
          required: false,
        },
        {
          type: "Input",
          label: "Member Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MemberNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
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
          required: false,
        },
        {
          type: "Input",
          label: "Designation (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.DesignationNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
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
          required: false,
        },
        {
          type: "Input",
          label: "Gender (Nepali)",
          visible: true,
          disabled: true,
          path: `ProposerDetails.${i}.GenderNepali`,
          accordionId: 2,
          spacing: 3,
          required: false,
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
          required: false,
        },

        {
          type: "Input",
          label: "Marital Status (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
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
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          required: false,
        },
        {
          type: "Input",
          label: "Husband's Name(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
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
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          required: false,
        },
        {
          type: "Input",
          label: "Wife Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
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
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          required: false,
        },
        {
          type: "Input",
          label: "Father Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "GrandFather Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "GrandfatherNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          required: false,
        },
        {
          type: "Input",
          label: "GrandFather Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Nationality (English)",
          visible: true,
          path: `ProposerDetails.${i}.NationalityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 2,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Permanent Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "AddressEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          // value: "ProposerDetails.PermanentAdrress.PermanentAddressEnglish",
          required: false,
        },
        {
          type: "Input",
          label: "Permanent Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
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
          required: false,
        },
        {
          type: "Input",
          label: "Town (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
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
          required: false,
        },
        {
          type: "Input",
          label: "City (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Temporary Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
          required: false,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "TempAddresEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
        },
        {
          type: "Input",
          label: "Temporary Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
          required: false,
        },
        {
          type: "Input",
          label: "Identification Type",
          visible: true,
          path: `ProposerDetails.${i}.IdentificationType`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 2,
          spacing: 3,
          required: false,
        },

        {
          type: "Input",
          label: "Citizenship Number",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 2,
          spacing: 3,
          required: false,
        },
        // {
        //   type: "MDDatePicker",
        //   label: "Citizenship Issued Date",
        //   visible: true,
        //   path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
        //   accordionId: 2,
        //   spacing: 3,
        //   required: false,
        // },
        {
          type: "MDDatePicker",
          label: "Citizenship Issued Date",
          required: false,
          visible: true,

          name: "mPStartDate",
          path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
          maxDate: new Date(),
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
          required: false,
        },

        {
          type: "MDDatePicker",
          label: "Date Of Birth",
          visible: true,
          maxDate: new Date(),
          dateFormat: "m-d-Y",
          path: `ProposerDetails.${i}.DoB`,
          customOnChange: (e, d) => onDOBselect(e, d, i),
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Passport Number",
          visible: true,
          path: `ProposerDetails.${i}.PassportNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],

          accordionId: 2,
          spacing: 3,
          required: false,
        },
        {
          type: "MDDatePicker",
          label: "Passport Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportIssuedDate`,
          accordionId: 2,
          spacing: 3,
          required: false,
        },
        {
          type: "MDDatePicker",
          label: "Passport Expiry Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportExpiryDate`,
          minDate: new Date(lDto.ProposerDetails[0].PassportIssuedDate).setDate(
            new Date(lDto.ProposerDetails[0].PassportIssuedDate).getDate() + 1
          ),
          accordionId: 2,
          spacing: 3,
          required: false,
        },

        {
          type: "RadioGroup",
          visible: true,
          required: false,
          radioLabel: { label: "Passport Issued By", labelVisible: true },
          radioList: [
            { value: "India", label: "India" },
            { value: "Nepal", label: "Nepal" },
          ],
          path: `ProposerDetails.${i}.PassportIssuedBy`,
          spacing: 12,
          accordionId: 2,
        },
        {
          type: "Input",
          label: "License Number",
          visible: true,
          spacing: 3,
          path: `ProposerDetails.${i}.LicenseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 2,
          required: false,
        },

        {
          type: "AutoComplete",
          label: "Status",
          visible: true,
          path: `ProposerDetails.${i}.Status`,
          options: masters.Status,
          accordionId: 2,
          spacing: 3,
          required: false,
        },
        {
          type: "MDDatePicker",
          label: "Appoint Date",
          visible: true,
          path: `ProposerDetails.${i}.AppointDate`,
          accordionId: 2,
          spacing: 3,
          required: false,
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
          spacing: 3,
          sx: { fontSize: "14px" },
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
        communicationId: "292",
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
            path: "DocType",
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
            path: "Department",
            InputProps: {
              readOnly: true,
            },
            disabled: true,
          },

          {
            type: "Input",
            required: true,
            label: "Class",
            visible: true,
            path: "Class",
            InputProps: { readOnly: true },
            disableOnReset: true,
            disabled: true,
          },
          {
            type: "Input",
            required: true,
            label: "Sub-Class",
            visible: true,
            path: "SubClass",
            InputProps: { readOnly: true },
            disabled: true,
            disableOnReset: true,
          },

          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            path: "PolicyStartDate",
            disableOnReset: false,
            dateFormat: "m/d/Y",
            minDate: PolicyStartDateFiscalYear(),
            // customOnChange: (e, d) => hendlePolicyStartDate1(e, d),
            maxDate: PolicyStartDateMaxDate(),
            customOnChange: (e, d) => OnPSDSelect(e, d),
          },

          // {
          //   type: "Input",
          //   label: "Number of Days",
          //   required: true,
          //   visible: true,
          //   path: "NumberofDays",

          //   validationId: 1,
          //   onChangeFuncs: [IsNumericGreaterThanZero],
          //    customOnChange: (e) => OnNumberofDays(e),
          // },

          {
            type: "Input",
            label: "Number of Days",
            required: true,
            visible: true,
            path: "NumberofDays",
            validationId: 1,
            // onChangeFuncs: [IsNumeric1],
            // customOnChange: (e) => hendlePolicyStartDate(e),
            onChangeFuncs: [IsNumericGreaterThanZero],
            customOnChange: (e) => OnNumberofDays(e),
          },

          // {
          //   type: "MDDatePicker",
          //   label: "Policy End Date",
          //   visible: true,
          //   required: true,

          //   path: "PolicyEndDate",
          //   dateFormat: "m/d/Y",

          //   disabled: true,
          //   InputProps: {
          //     readOnly: true,
          //   },
          // },

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
            required: true,
            label: "Business Type",
            visible: true,
            path: "BusinessType",
            disabled: true,
            InputProps: { readOnly: true },
            disableOnReset: true,
          },
        ],
        [
          {
            type: "Input",
            label: "No. of hives of bees",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.NoofHivesofBees",
            onChangeFuncs: [IsNumeric1],
            customOnChange: (e) => handleNoOfHives(e, "noHives"),
          },

          {
            type: "Input",
            label: "Purchase Cost per Hive including (Hive Stand)",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.PurchaseCostPerHive",
            onChangeFuncs: [IsNumeric1],
            customOnChange: (e) => handleNoOfHives(e, "purchasecost"),
          },
          {
            type: "Input",
            label: "Hive Sum insured",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.HiveSumInsured",
            onChangeFuncs: [IsNumeric1],
            InputProps: {
              readOnly: true,
            },
            disabled: true,
          },
          {
            type: "Input",
            label: "Purchase cost of no of bees sphere per hive",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.Purchasecostofnoofbeessphereperhive",
            onChangeFuncs: [IsNumeric1],
            customOnChange: (e) => handleNoOfHives(e, "purchasecostbees"),
          },
          {
            type: "Input",
            label: "Bees sphere Sum Insured",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.BeesSphereSumInsured",
            onChangeFuncs: [IsNumeric1],
            InputProps: {
              readOnly: true,
            },
            disabled: true,
          },
          {
            type: "Input",
            label: "Avg Management Cost per hive",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.AvgManagementCostPerHive",
            onChangeFuncs: [IsNumeric1],
            customOnChange: (e) => handleNoOfHives(e, "avgcost"),
          },
          {
            type: "Input",
            label: "Management SumInsured ",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.ManagementSumInsured",
            onChangeFuncs: [IsNumeric1],
            InputProps: {
              readOnly: true,
            },
            disabled: true,
          },
          {
            type: "Input",
            label: "Total SumInsured  ",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.TotalSumInsured",
            onChangeFuncs: [IsNumeric1],
            InputProps: {
              readOnly: true,
            },
            disabled: true,

            customOnBlur: (e) => handleTotalSumInsured(e),
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: true,
            required: true,
            disableOnReset: true,
            disabled: true,
            path: "InsurableItem.0.RiskItems.0.DirectDiscount",
          },
        ],

        [
          {
            type: "Input",
            label: "Number of Owner/Partner",
            path: "OwnerAccidentalDetails.NumberofOwnersPartners",
            visible: true,
            required: true,
            name: "NumberofOwnersPartners",
            disableOnReset: false,
            onChangeFuncs: [IsNumeric1],
            onBlurFuncs: [IsNumeric1],
            customOnChange: handleownerdetails,
          },

          {
            type: "Input",
            label: "Personal Accidental Sum Insured (Per Person)",
            path: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
            visible: true,
            required: true,
            disableOnReset: true,
            disabled: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Accidental Premium(Per Person)",
            path: "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
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
            path: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
            visible: true,
            disabled: true,
            // disableOnReset: true,
            InputProps: { readOnly: true },
          },
          {
            type: "Input",
            label: "Total Accidental Premium",
            visible: true,
            disabled: true,
            InputProps: { readOnly: true },
            path: "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
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
            path: "PolicyStartDate",
            disableOnReset: true,
            InputProps: { disabled: true },
            disabled: true,
            required: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            path: "PolicyEndDate",
            disableOnReset: true,
            InputProps: { disabled: true },
            disabled: true,
            required: true,
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
            path: "FinancingType",
            customOnChange: (e) => OnFinancingDetails(e),
            spacing: 12,
          },
        ],

        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            required: true,
            visible: true,
            path: "Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
            customOnChange: (e, a) => OnBankNonBank(e, a),
          },

          {
            type: "AutoComplete",
            label: "Bank Category",
            required: true,
            visible: true,
            path: "Bankdetails.BankCategory",
            // options: lDto.Bankdetails.BankorNonBank !== "" ? masters.BankCategory : [],
            options: masters.BankCategory.filter(
              (x) =>
                (lDto.Bankdetails.BankorNonBank === "Bank" && x.description !== "Non-Bank") ||
                (lDto.Bankdetails.BankorNonBank === "Non-Bank" && x.description === "Non-Bank")
            ),
            customOnChange: (e, a) => handleBankCategory(e, a, "BankCategory"),
          },

          {
            type: "AutoComplete",
            label: "Bank/Financial Institution Name in English",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinEnglish",
            onChangeFuncs: [IsAlphaNumNoSpace],
            required: true,
            options:
              lDto.Bankdetails.BankCategory !== ""
                ? masters.BankorFinancialInstituionNameinEnglish
                : [],

            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
          },
          {
            type: "Input",
            disabled: true,
            label: "Bank/Financial Instituion Name in Nepali",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinNepali",
          },
          {
            type: "Input",
            label: "Bank Code",
            visible: true,
            path: "Bankdetails.BankCode",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Short Code",
            visible: true,
            path: "Bankdetails.ShortCode",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Swift/Pseudo Code",
            visible: true,
            path: "Bankdetails.SwiftPseudoCode",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person1",
            visible: true,
            path: "Bankdetails.ContactPerson1",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person2",
            visible: true,
            path: "Bankdetails.ContactPerson2",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person3",
            visible: true,
            path: "Bankdetails.ContactPerson3",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            path: "Bankdetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            onBlurFuncs: [IsNumaricSpecialNoSpace],
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
            onBlurFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Website",
            visible: true,
            path: "Bankdetails.Website",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Email",
            visible: true,
            path: "Bankdetails.Email",
            // onChangeFuncs: [IsEmail],
            onBlurFuncs: [IsEmail],
          },

          {
            type: "Input",
            label: "PAN Number",
            visible: true,

            path: "Bankdetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Bank Agent Code",
            visible: true,
            path: "Bankdetails.BankAgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "CEO Name",
            visible: true,
            path: "Bankdetails.CEO",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
          },

          {
            type: "AutoComplete",
            label: "Country",
            required: true,
            visible: true,
            path: "Bankdetails.Country",
            options: masters.Country,
            disabled: true,
            InputProps: {
              readOnly: true,
            },
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "Province/State",
            required: true,
            visible: true,
            path: "Bankdetails.ProvinceorState",
            disabled: true,
            // options: masters.State,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "State1"),
          },
          {
            type: "Input",
            label: "District",
            required: true,
            visible: true,
            path: "Bankdetails.District",
            disabled: true,
            // options: masters.District1,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "District1"),
          },
          {
            type: "Input",
            label: "Municipality",
            visible: true,
            path: "Bankdetails.Municipality",
            // options: masters.Municipality1,
            disabled: true,
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
            customOnBlur: onBlurTransliteration,
            disabled: true,
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

            path: "ProposerDetails.0.Name",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            visible: true,
          },
          {
            type: "Input",
            label: "Designation",

            path: "ProposerDetails.0.DesignationoftheProposer",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            visible: true,
          },
          {
            type: "Input",
            label: "Occupation",

            path: "ProposerDetails.0.ProposerOccupation",
            onChangeFuncs: [IsAlphaNoSpace],
            onBlurFuncs: [IsAlphaNoSpace],
            visible: true,
          },
          {
            type: "Input",
            label: "Address",
            // visible: true,
            path: "ProposerDetails.0.ProposerAddress",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            visible: true,
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
          ...spreadMultiKYCDetails()[0],
        ],
        // ...spreadMultiKYCDetails().filter((x, i) => i !== 0),

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

            path: "ProposerDetails.0.CareofNameEnglish",
            name: "CareofNameEnglish",
            onChangeFuncs: [IsAlphaNoSpace],
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,

            path: "ProposerDetails.0.CareofPANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            path: "ProposerDetails.0.CareofContactNumber",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            name: "CareofAddressEnglish",
            path: "ProposerDetails.0.CareofAddressEnglish",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
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
            label: "Proprietor Name(English)",
            visible: true,
            onChangeFuncs: [IsAlphaNoSpace],
            path: "ProposerDetails.0.ProprietorNameEnglish",
            name: "ProprietorNameEnglish",
            customOnBlur: onBlurTransliteration,
          },
          {
            type: "Input",
            label: "Proprietor Name(Nepali)",
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
            required: true,
            visible: true,
            path: "ProposerDetails.0.AgriTechnicianName",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Agri Technician Address",
            visible: true,
            required: true,
            path: "ProposerDetails.0.AgriTechnicianAddress",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 10.5,
          },

          // {
          //   type: "Button",
          //   label: "Reset",
          //   visible: true,
          //   variant: "outlined",
          //   onClick: () => OnReset(),
          //   spacing: 1.5,
          //   justifyContent: "End",
          // },

          {
            type: "Input",
            label: "Breed/Caste/Variety ",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.Breed/Caste/Variety",
          },
          {
            type: "Input",
            label: "Type of Bees",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.TypeofBees",
          },
          {
            type: "AutoComplete",
            label: "Basic Of Cost",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.BasisofCost",
            options: masters.BasisofCost,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: true,
            required: true,
            disabled: true,
            path: "InsurableItem.0.RiskItems.0.DirectDiscount",
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "No of Hives of Bees",
            visible: true,
            required: true,
            onChangeFuncs: [IsNumeric1],
            path: "InsurableItem.0.RiskItems.0.NoofHivesofBees",

            customOnChange: (e) => handleNoOfHives(e, "noHives"),
          },
          {
            type: "Input",
            label: "Purchase Cost per Hive ",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.PurchaseCostPerHive",
            onChangeFuncs: [IsNumeric1],
            customOnChange: (e) => handleNoOfHives(e, "purchasecost"),
          },
          {
            type: "Input",
            label: "Hive Sum Insured ",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.HiveSumInsured",

            onChangeFuncs: [IsNumeric1],
            InputProps: {
              readOnly: true,
            },
            disabled: true,
          },
          {
            type: "Input",
            label: "Purchase cost of no of bees sphere per hive ",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.Purchasecostofnoofbeessphereperhive",
            onChangeFuncs: [IsNumeric1],
            customOnChange: (e) => handleNoOfHives(e, "purchasecostbees"),
          },
          {
            type: "Input",
            label: "Bees sphere Sum Insured",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.BeesSphereSumInsured",
            onChangeFuncs: [IsNumeric1],
            InputProps: {
              readOnly: true,
            },
            disabled: true,
          },
          {
            type: "Input",
            label: "Avg Management Cost per hive ",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.AvgManagementCostPerHive",
            onChangeFuncs: [IsNumeric1],
            customOnChange: (e) => handleNoOfHives(e, "avgcost"),
          },
          {
            type: "Input",
            label: "Management SumInsured",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.ManagementSumInsured",
            onChangeFuncs: [IsNumeric1],
            InputProps: {
              readOnly: true,
            },
            disabled: true,
          },
          {
            type: "Input",
            label: "Total SumInsured",
            visible: true,
            required: true,
            onChangeFuncs: [IsNumeric1],
            path: "InsurableItem.0.RiskItems.0.TotalSumInsured",
            customOnBlur: (e) => handleTotalSumInsured(e),
            InputProps: {
              readOnly: true,
            },
            disabled: true,
          },
          {
            type: "Input",
            label: "Govt Agriculture Service Centre",
            visible: true,

            path: "InsurableItem.0.RiskItems.0.GovtAgricultureServiceCentre",
          },
          {
            type: "Input",
            label: "Private Agriculture Service Centre",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.PrivateAgricultureServiceCentre",
          },
          {
            type: "Input",
            label: "Approximate distance btw agriculture serivce centre & bee farm   ",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Approximatedistancebtwagricultureserivcecentre&beefarm",
          },
          {
            type: "Typography",
            visible: true,
            spacing: 10,
          },

          {
            type: "Typography",
            label: "Other Documents",
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
            onClick: onAddOtherDocument,
            spacing: 12,
          },
          ...spreadOtherDocumentDetails(),
          {
            type: "Input",
            label: "General Description",

            visible: true,
            path: "InsurableItem.0.GeneralDescription",
            spacing: 3,

            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
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
            // options: masters1.IssuingBranch,
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
            required: true,
            visible: true,
            path: "Channel.FiscalYear",
            disabled: true,
            disableOnReset: true,
            customOnChange: OnFiscalYear(),
          },
          {
            type: "AutoComplete",
            label: "Field Officer Code",
            visible: true,
            path: "Channel.FieldOfficerCode",
            onChangeFuncs: [IsFreetextNoSpace],
            optionLabel: "fieldName",
            options: masters1.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Field Officer Name",
            visible: true,

            path: "Channel.FieldOfficer",
            onChangeFuncs: [IsAlphaNoSpace],

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
          },
        ],
        //  Issuing Branch Details
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

            path: "RiskAddressDetails.ProvinceState",
            options: lDto.RiskAddressDetails.Country !== "" ? masters.State : [],
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State4"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            required: true,
            path: "RiskAddressDetails.District",
            options: lDto.RiskAddressDetails.ProvinceState !== "" ? masters.District3 : [],
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District4"),
          },
          {
            type: "AutoComplete",
            label: "Muncipality",
            visible: true,
            required: true,
            path: "RiskAddressDetails.Municipality",
            options: lDto.RiskAddressDetails.District !== "" ? masters.Municipality3 : [],
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
            label: "Address(English)",
            visible: true,
            required: true,
            path: "RiskAddressDetails.AddressEnglish",
            name: "AddressEnglish4",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,

            InputProps: {
              readOnly: true,
            },

            path: "RiskAddressDetails.AddressNepali",
            disabled: true,
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
            onBlurFuncs: [IsAlphaNumNoSpace],
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
            label: "Number of Owners/Partners",
            visible: true,
            required: true,
            disabled: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
            path: "OwnerAccidentalDetails.NumberofOwnersPartners",
          },
          {
            type: "Input",
            label: "Personal Accidental SI(Per Person)",
            visible: true,
            required: true,
            disabled: true,
            InputProps: { readOnly: true },
            disableOnReset: true,
            path: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
          },
          {
            type: "Input",
            label: "Total Accidental SumInsured",
            visible: true,
            required: true,
            disabled: true,
            InputProps: { readOnly: true },
            disableOnReset: true,
            path: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
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
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeName",
          },
          {
            type: "Input",
            label: "Nominee Citizenship Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],

            path: "NomineeDetails.NomineeCitizenshipNumber",
          },
          {
            type: "Input",
            label: "Father Name",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeFather",
          },
          {
            type: "Input",
            label: "Mother Name",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeMother",
          },
          {
            type: "Input",
            label: "Relationship",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeRelationship",
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeContactNumber",
          },

          {
            type: "Input",
            label: "Address",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],

            path: "NomineeDetails.NomineeHouseNumber",
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
                    <Typography>Discount</Typography>
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
                    <Typography>रु</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.BasicPremium")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.DirectDiscountAmt"
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
            visible:
              objectPath.get(lDto, "Channel.AgentCode") !== "" &&
              objectPath.get(lDto, "Channel.AgentCode") !== "0000",
            spacing: 3,
          },
          {
            type: "Typography",
            visible:
              objectPath.get(lDto, "Channel.AgentCode") !== "" &&
              objectPath.get(lDto, "Channel.AgentCode") !== "0000",
            spacing: 3,
          },
          {
            type: "Custom",
            visible:
              objectPath.get(lDto, "Channel.AgentCode") !== "" &&
              objectPath.get(lDto, "Channel.AgentCode") !== "0000",
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
              width: 390,
              height: 390,
              top: "15%",
              bottom: "10%",
              left: "45%",
            },
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
                    <MDBox component="img" src={Success} sx={{ width: "50%", height: "70%" }} />
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
                  <MDBox sx={{ display: "flex", justifyContent: "center", mt: "-13px" }}>
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
              width: 430,
              height: 430,
              top: "13%",
              bottom: "10%",
              left: "45%",
            },
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

const getOnNextClick = async ({ activeStep, dto, setDto, setBackDropFlag }) => {
  let fun = true;
  const lDto = dto;
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // const handleProposal = async () => {
  //   if (topGenericInfo && topGenericInfo.Flow === undefined && lDto.proposalNo === undefined) {
  //     await SaveCreateProposal(lDto).then(async (x) => {
  //       if (x.data.proposalNumber) {
  //         objectPath.set(lDto, "FormatedData.ProposalNumber", x.data.proposalNumber);
  //         objectPath.set(lDto, "proposalNo", x.data.proposalNumber);
  //         const res = await GetProposalByNumber(x.data.proposalNumber);
  //         objectPath.set(lDto, "KYCNo", res.data[0].policyDetails.KYCNo);
  //         // objectPath.set(tDto, "proposalNo", x.data.proposalNumber);
  //         setGenericPolicyDto(topDispatch, { ...lDto });

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
  //   if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
  //     fun = await UpdateProposalDetails(lDto).then(async (x) => {
  //       if (x.responseMessage === "Updated successfully") {
  //         const res = await GetProposalByNumber(x.data.proposalNumber);
  //         objectPath.set(lDto, "KYCNo", res.data[0].policyDetails.KYCNo);
  //         setGenericPolicyDto(topDispatch, { ...lDto });
  //         setBackDropFlag(false);
  //       }
  //       return true;
  //     });
  //   }
  //   return fun;
  // };

  // if (lDto.proposalNo === undefined) {
  //   await SaveCreateProposal(lDto).then(async (x) => {
  //     if (x.data.proposalNumber) {
  //       const res = await GetProposalByNumber(x.data.proposalNumber);
  //       lDto.KYCNo = res.data[0].policyDetails.KYCNo;
  //       setDto({ ...lDto, proposalNo: x.data.proposalNumber });
  //       fun = true;
  //     } else {
  //       setBackDropFlag(false);
  //       swal2.fire({
  //         icon: "error",
  //         text: "Incurred an error please try again later",
  //         confirmButtonColor: "#0079CE",
  //       });
  //       fun = false;
  //     }
  //   });
  // } else if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
  //   const x = await UpdateProposalDetails(lDto);
  //   if (x.data.responseMessage === "Updated successfully") {
  //     const res = await GetProposalByNumber(x.data.data.proposalNo);
  //     lDto.KYCNo = res.data[0].policyDetails.KYCNo;
  //     lDto.proposalNo = x.data.data.proposalNo;
  //     setDto({ ...lDto });
  //     // setBackDropFlag(false);
  //     fun = true;
  //   }
  // }

  if (lDto !== null) {
    switch (activeStep) {
      case 0:
        fun = await GenericApi("NepalAgriHoneyBee", "NepalHoneyBeeRatingAPI", lDto).then(
          async (x) => {
            console.log("x1", x);
            console.log("dto", dto);
            if (x.finalResult) {
              lDto.PremiumDetails = x.finalResult;
              lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
              objectPath.set(lDto, "FinalPremium", x.finalResult.FinalPremium);
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              const res1 = await SaveQuotation(lDto);
              lDto["Quotation No"] = res1.data.quotation.quoteNo;
              lDto.ProposerDetails = [lDto.ProposerDetails];

              setDto({ ...lDto });

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
                formater.format(x.finalResult.PerPersonAccidentalPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalReceiptPremiumPDF",
                formater.format(x.finalResult.TotalReceiptPremiumPDF)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
                formater.format(x.finalResult.TotalAccidentalPremium)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
                formater.format(lDto.InsurableItem[0].RiskItems[0].TotalSumInsured)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.FinalPremium",
                formater.format(x.finalResult.FinalPremium)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.StampDuty",
                formater.format(x.finalResult.StampDuty)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
                formater.format(x.finalResult.PremiumAfterSubsidy)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.GovtSubsidy",
                formater.format(x.finalResult.GovtSubsidy)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.BasicPremium",
                formater.format(x.finalResult.BasicPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.OwnerAccidentalDetails.TotalAccidentalSumInsured ",
                formater.format(dto.OwnerAccidentalDetails.TotalAccidentalSumInsured)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.DirectDiscountAmt",
                formater.format(x.finalResult.DirectDiscountAmt)
              );

              setDto({ ...lDto });

              setBackDropFlag(false);
              const fun1 = await swal2
                .fire({
                  title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                  html: `<div style="display: flex; flex-direction: row;">
                  <div style="flex: 5; text-align: left; margin-left: 0rem" ">
                  <div>Basic Premium</div>
                  <div>Discount</div>
                  <div>Govt Subsidy</div>
                  <div>Premium after Subsidy</div>
                  <div>Stamp Duty</div>
                  <div>Total Accidental Premium</div>
                  <div>Total Premium to be paid by Customer</div>
                </div>
                <div style="flex:0.3;text-align: right;font-size:16.3px; margin-right: 0rem" ">
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
                  <div> ${formater.format(x.finalResult.DirectDiscountAmt)}</div>
                  <div> ${formater.format(x.finalResult.GovtSubsidy)}</div>
                  <div> ${formater.format(x.finalResult.PremiumAfterSubsidy)}</div>
                  <div> ${formater.format(x.finalResult.StampDuty)}</div>
                  <div> ${formater.format(x.finalResult.TotalAccidentalPremium)}</div>
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
          }
        );
        break;

      case 1:
        fun = true;

        break;
      case 2:
        fun = await GenericApi("NepalAgriHoneyBee", "NepalHoneyBeeRatingAPI", lDto).then(
          async (x) => {
            // debugger;
            console.log("x1", x);
            console.log("dto", lDto);
            if (x.finalResult) {
              lDto.PremiumDetails = x.finalResult;
              lDto.PaymentAmount = parseFloat(x.finalResult.FinalPremium).toFixed(2);
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };

              await QuotationUpdate(lDto);
              lDto.ProposerDetails = [lDto.ProposerDetails];
              setDto({ ...lDto });

              objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));

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
                "FormatedData.CalculatedPremiumDetails.FinalPremium",
                formater.format(x.finalResult.FinalPremium)
              );
              objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
                formater.format(x.finalResult.PerPersonAccidentalPremium)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
                formater.format(x.finalResult.TotalAccidentalPremium)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
                formater.format(lDto.InsurableItem[0].RiskItems[0].TotalSumInsured)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.FinalPremium",
                formater.format(x.finalResult.FinalPremium)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.StampDuty",
                formater.format(x.finalResult.StampDuty)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
                formater.format(x.finalResult.PremiumAfterSubsidy)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.GovtSubsidy",
                formater.format(x.finalResult.GovtSubsidy)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.BasicPremium",
                formater.format(x.finalResult.BasicPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.OwnerAccidentalDetails.TotalAccidentalSumInsured ",
                formater.format(dto.OwnerAccidentalDetails.TotalAccidentalSumInsured)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.DirectDiscountAmt",
                formater.format(x.finalResult.DirectDiscountAmt)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.ReceiptPremiumPDF",
                formater.format(x.finalResult.ReceiptPremiumPDF)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.StampDuty",
                formater.format(x.finalResult.StampDuty)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalReceiptPremiumPDF",
                formater.format(x.finalResult.TotalReceiptPremiumPDF)
              );

              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TaxPremiumPDF",
                formater.format(x.finalResult.TaxPremiumPDF)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TaxTotalPremiumPDF",
                formater.format(x.finalResult.TaxTotalPremiumPDF)
              );
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
        break;

      case 3:
        fun = true;
        break;

      case 4:
        if (lDto.proposalNo === undefined) {
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          fun = await SaveCreateProposal(lDto).then(async (x) => {
            lDto.ProposerDetails = [lDto.ProposerDetails];
            if (x.data.proposalNumber) {
              lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              await GetProductByCode("NepalAgriHoneyBee").then(async (x2) => {
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
            lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
            await GetProductByCode("NepalAgriHoneyBee").then(async (x2) => {
              const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);
              lDto.KYCNo = res.data[0].policyDetails.KYCNo;
              lDto.ProposerDetails = [lDto.ProposerDetails];
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
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};

  const onReset1 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.ProposerDetails[0].documentDetails = [{ ...docDetails() }];
    setDto(dispatch, { ...lDto });
  };

  const onReset2 = (dto, setDto, dispatch) => {
    const lDto = dto;

    lDto.InsurableItem[0].OtherDocuments = [{ ...otherdocDetails() }];
    setDto(dispatch, { ...lDto });
  };
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
        reset: { label: "Reset", onClick: onReset1, visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;

    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", onClick: onReset2, visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;

    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
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

// const getMasterData = async () => {
//   // const lDto = dto;
//   const masters = {
//     Salutation: [],
//     Gender: [],
//     DocType: [],
//     BusinessType: [],
//     BankNonBank: [],
//     BankCategory: [],
//     State: [],
//     Country: [],
//     District: [],
//     District1: [],
//     Municipality1: [],
//     WardNumber: [],
//     Municipality: [],
//     KYCCategory: [],
//     InsuredType: [],
//     KYCRiskCategory: [],
//     IsBeneficiaryOwner: [],
//     Occupation: [],
//     IncomeSource: [],
//     Municipality2: [],
//     BranchDetailsComponets: [],
//     ClientType: [],
//     SubClass: [],
//     Plan: [],
//     Geography: [],
//     DirectDiscount: [],
//     IssuingBranch: [],
//     BasisofCost: [],
//     BranchName: [],
//   };

//   await GetNPCommonMaster().then((r) => {
//     r.forEach((x) => {
//       masters[x.mType] = x.mdata;
//     });
//   });
//   await GetProdPartnermasterData("State", {}).then((r) => {
//     masters.State = r.data;
//   });
//   return masters;
// };

const getMasterData = async ({ dto, setDto, additionalInformation }) => {
  const lDto = dto;

  const masters = {
    State: [],
    BankDetails: [],
    BankorFinancialInstituionNameinEnglish: [],
    BranchMasters: [],
    IssuingBranch: [],
    BranchDetailsComponets: [],
    BasisofCost: [],
    placeMasters: [{ district: [], municipality: [] }],
  };

  const userDetails = additionalInformation?.loginUserDetails;
  if (userDetails && userDetails?.displayName) {
    lDto.AgentName = userDetails?.displayName;
    lDto.AgentMobileNo = userDetails?.contactNumber;
    // lDto.PaymentAmount = lDto.FinalPremium;
    setDto({ ...lDto });
  }
  await GetProdPartnermasterData("State", {}).then((r) => {
    masters.State = r.data;
  });

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
