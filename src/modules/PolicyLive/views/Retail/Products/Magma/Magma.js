import { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Card,
  FormControlLabel,
  Stack,
  Input,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
// import { createTheme } from "@mui/material/styles";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate, useLocation } from "react-router-dom";
// import { red } from "@mui/material/colors";

import objectPath from "object-path";
import {
  IsNumeric,
  IsAlpha,
  IsAlphaNum,
  IsMobileNumber,
  IsAlphaSpace,
  IsEmail,
  IsAlphaNumSpecial,
} from "Common/Validations";
import Swal from "sweetalert2";
import success from "assets/images/Magma/success.jpg";
import { read, utils } from "xlsx";
import { postRequest } from "core/clients/axiosclient";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { ThemeProvider } from "@mui/material/styles";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import {
  useDataController,
  setGenericPolicyDto,
  setGenericInfo,
} from "../../../../../BrokerPortal/context";
import { policyDto, Risk } from "./data/Json";
import PaymentPage from "../../Payment";
import {
  getProdPartnerMasterData, // Nominee relationships dropdown options
  GetSavepolicyWFStatus,
  GetProposalWFId,
  GetUpdateWorkflowStatus,
  // getMasterPolicyData,
  getPlanbyProductId,
  // GetSaveProposalFailedRules, no need
  getProdPartnerMasterDataGender,
  GenericApi,
  GetBenefits,
  UpdateProposalDetails,
  GetGroupingDetailsByPlanGrid,
  GetAssignProductByMasterPolicyNumber,
} from "./data/index";

let topDto = null;
let topDispatch = null;

const masters = {
  Relationship: [],
  NomineeRelationship: [],
  Gender: [],
  Plans: [],
  policyDuration: [],
  countPolicyDuration: "",
  location: [],
  state: [],
  policyID: [],
  FamilyCombination: [],
  masterPolicyDetails: [null],
  disable: false,
  visible: true,
  proceedvisible: true,
  loader: false,
  flagNavigate: false,
  button: "Proceed to Pay",
};
const getProcessSteps = () => {
  const [control] = useDataController();
  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;
  if (masters.state === "payment" && objectPath.get(dto, "InstallmentCase") === "Yes") {
    const steps = ["Plan Details", "Member Details", "Installment Details", "Premium Details"];
    return steps;
  }
  if (masters.state === "payment" && objectPath.get(dto, "InstallmentCase") === "No") {
    const steps = ["Plan Details", "Member Details", "Premium Details"];
    return steps;
  }
  if (objectPath.get(dto, "TypeOfCOI") === "Bulk Upload") {
    const steps = ["Plan Details", "Premium Details", "Payment Details"];
    return steps;
  }
  if (objectPath.get(dto, "InstallmentCase") === "No" && masters.state !== "payment") {
    const steps = ["Plan Details", "Member Details", "Premium Details", "Payment Details"];
    return steps;
  }
  const steps = [
    "Plan Details",
    "Member Details",
    "Installment Details",
    "Premium Details",
    "Payment Details",
  ];
  return steps;
};

const getPageContent = (activeStep) => {
  let steps = [];
  console.log("activeStep", activeStep);
  const [control] = useDataController();
  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;
  // to jump case 0 to case 2 when TypeOfCOI is Bulk Upload
  let lActiveStep = activeStep;
  if (objectPath.get(dto, "TypeOfCOI") === "Bulk Upload") {
    if (activeStep === 1) lActiveStep = 3;
  }
  if (objectPath.get(dto, "InstallmentCase") === "No") {
    if (activeStep === 2) lActiveStep = 3;
    if (activeStep === 3) lActiveStep = 4;
  }

  const location = useLocation();
  masters.location = location;
  console.log("location", location.state);

  const { search } = useLocation();
  const type = new URLSearchParams(search).get("state");
  masters.state = type;
  console.log("state", type);

  switch (lActiveStep) {
    case 0:
      steps = [
        { name: "", visible: true },
        {
          name: "Master Policy Details",
          visible: objectPath.get(dto, "PartnerDetails.accountNo") !== "",
          defaultExpanded: true,
        },
      ];
      break;

    case 1: // Individual
      steps = [
        { name: "", visible: true },
        ...dto.InsurableItem[0].RiskItems.map((x, i) => ({
          name: `Insured Member ${i + 1}`,
          visible: true,
          defaultExpanded: true,
        })),
        { name: "Additional Details", visible: true, defaultExpanded: true },
        {
          name: "Important Information (For use by Magma HDI)",
          visible: dto.AdditionalImpInfo !== "false",
          defaultExpanded: true,
        },
      ];

      break;
    case 2:
      steps = [{ name: "", visible: true }]; // Individual
      break;
    case 3:
      steps = [{ name: "", visible: true }];
      break;
    case 4:
      steps = [{ name: "", visible: true }];
      break;
    default:
      steps = [];
  }
  return steps;
};

const getSectionContent = (activeStep) => {
  const [partnerID, setPartnerID] = useState();
  const [productID, setProductID] = useState();
  const [id] = useState(0); // setId
  const Navigate = useNavigate();
  const Payload = {
    productCode: "MagmaHospiCash01",
    planType: "",
    filterCriteria: [
      {
        SI: "",
        Type: "",
        Region: "",
        currency: "INR",
      },
    ],
    isFilterMemberWise: false,
    setBenefitMemberWise: false,
    insurableItems: null,
  };
  const request = { productId: 1022, groupId: 105, filterCriteria: "" };
  const [control, dispatch] = useDataController();
  const { genericPolicyDto, genericInfo } = control;
  let dto = genericPolicyDto;
  console.log("GENERICDATA", dto);
  console.log("genericInfodata", genericInfo);
  console.log("DTAAAAAAAAAAAAAA", dto && dto.DeviationDetails && dto.DeviationDetails.outcome);
  const DisableFields = dto && dto.DeviationDetails && dto.DeviationDetails.outcome;
  useEffect(() => {
    const pc = objectPath.get(dto, "PartnerDetails.masterPolicyNo");
    if (pc === undefined || pc === "") {
      dto = policyDto();

      objectPath.set(dto, "STaxExemptionCategory", "No Exemption");
      setGenericPolicyDto(dispatch, dto);
    }
  }, []);
  localStorage.setItem("genericPolicyDto", JSON.stringify(genericPolicyDto));
  const MasterApi = async () => {
    if (dto.PartnerDetails.masterPolicyNo !== "" && activeStep === 0) {
      await getProdPartnerMasterData([]).then((r) => {
        console.log("response", r);
        const filteredResponse = r.filter((item) => item.mValue.toLowerCase() !== "self");
        // masters.Relationship = r;
        masters.NomineeRelationship = filteredResponse;
      });
      await getProdPartnerMasterDataGender([]).then((r) => {
        console.log("gender", r);
        masters.Gender = r;
      });
      await GetAssignProductByMasterPolicyNumber(dto.PartnerDetails.masterPolicyNo).then(
        (partnerId) => {
          setPartnerID(partnerId.finalResult[0]?.agentId);
          setProductID(partnerId.finalResult[0]?.productIdPk);
          masters.policyID = partnerId.finalResult[0].policyId;
        }
      );
      masters.Plans = await getPlanbyProductId(masters.policyID);
      const PlanDetails = await GetGroupingDetailsByPlanGrid(dto.Plan, request);
      console.log("PlanDetails", PlanDetails);
      const data = [];
      PlanDetails?.data[0]?.groupDetailsJson?.SectionMaster?.FamilyCombination?.forEach((x) => {
        data.push({ mValue: x.FamilyCombination, TotalCount: x.TotalCount });
      });
      masters.FamilyCombination = data;
    }
  };
  useEffect(async () => {
    await MasterApi();
    // because api getting hit more than 1 time
  }, [activeStep === 0]);

  const handleSearchMP = async () => {
    // masters.loader = true;
    // if(dto.PartnerDetails.masterPolicyNo===""||dto.PartnerDetails.masterPolicyNo.length<23)
    // {
    dto.ProposalDate = "";
    dto.PolicyStartTime = "";
    dto.PolicyEndTime = "";
    dto.PartnerDetails.PolicyStartDate = "";
    dto.PartnerDetails.PolicyEndDate = "";
    dto.TypeOfCOI = "";
    dto.Plan = "";
    dto.FamilyCombination = "";
    dto.Benefit = "";
    setGenericPolicyDto(dispatch, dto);
    // }
    // masters.Plans = [];
    if (dto.PartnerDetails.masterPolicyNo === "") {
      Swal.fire({
        showCloseButton: true,
        allowOutsideClick: false,
        icon: "error",
        text: `Master Policy Number is Mandatory`,
      });
    } else if (dto.PartnerDetails.masterPolicyNo.length < 23) {
      Swal.fire({
        showCloseButton: true,
        allowOutsideClick: false,
        icon: "error",
        text: `Please provide valid MP No`,
      });
    } else {
      await GetAssignProductByMasterPolicyNumber(dto.PartnerDetails.masterPolicyNo).then(
        (partnerId) => {
          if (partnerId.finalResult.length === 0) {
            Swal.fire({
              showCloseButton: true,
              allowOutsideClick: false,
              icon: "error",
              text: `Please provide valid MP No`,
            });
          } else if (
            !(
              partnerId?.finalResult[0]?.masterPolicyDetails?.claimsStatus === "Updated" &&
              partnerId?.finalResult[0]?.masterPolicyDetails?.underWriterStatus === "Updated" &&
              partnerId?.finalResult[0]?.masterPolicyDetails?.operationsStatus === "Updated"
            )
          ) {
            Swal.fire({
              // showCloseButton: true,
              allowOutsideClick: false,
              icon: "error",
              text: `COI can not be issued under this Master Policy,
              until the Master Policy is finally submitted.`,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/ListOfMaster";
              }
            });
          } else {
            const masterPolicyDetailsparse = partnerId.finalResult[0].masterPolicyDetails;
            masters.masterPolicyDetails = masterPolicyDetailsparse;
            const StartTime = partnerId.finalResult[0].policyStartDate.split("T");
            const STime = StartTime[1];
            const EndTime = partnerId.finalResult[0].policyEndDate.split("T");
            const ETime = EndTime[1];
            console.log("partnerID", partnerId);
            objectPath.set(dto, "PartnerDetails.accountNo", partnerId.finalResult[0].policyNo);
            objectPath.set(
              dto,
              "PartnerDetails.PolicyStartDate",
              partnerId.finalResult[0].policyStartDate
            );
            objectPath.set(
              dto,
              "PartnerDetails.PolicyEndDate",
              partnerId.finalResult[0].policyEndDate
            );
            objectPath.set(dto, "PolicyStartTime", STime);
            objectPath.set(dto, "PolicyEndTime", ETime);
            objectPath.set(dto, "ProposalDate", partnerId.finalResult[0].proposalDate);
            objectPath.set(
              dto,
              "MasterPolicyHolderName",
              partnerId.finalResult[0].masterPolicyDetails.MasterPolicyHolderName
            );
            const hasQuestionnaire =
              masters.masterPolicyDetails.AdditionalDetails &&
              masters.masterPolicyDetails.AdditionalDetails.Questionnaire;

            const questionnaireData = hasQuestionnaire
              ? masters.masterPolicyDetails.AdditionalDetails.Questionnaire
              : [];

            objectPath.set(dto, "InsurableItem.0.RiskItems.0.Questionaire", questionnaireData);

            // objectPath.set(
            //   dto,
            //   `InsurableItem.0.RiskItems.0.Questionaire`,
            //   masters.masterPolicyDetails.AdditionalDetails.Questionnaire
            // );

            console.log(
              "yyy",
              partnerId?.finalResult[0]?.masterPolicyDetails?.AdditionalDetails?.SpecialConditions
            );
            const specialConditions =
              partnerId?.finalResult[0]?.masterPolicyDetails?.AdditionalDetails?.SpecialConditions;
            const arr = [];
            if (specialConditions) {
              specialConditions.forEach((condition, index) => {
                const arr1 = {
                  SpecialCondition: condition[`SpecialCondition${index + 1}`],
                  SpecialConditionValue: condition[`SpecialConditionvalue${index + 1}`],
                };
                arr.push(arr1);
              });
            }
            objectPath.set(dto, "AdditionalDetails.SpecialCondition", arr);
            console.log("dtoooooooooo", dto);
            objectPath.set(
              dto,
              "AdditionalImpInfo",
              partnerId.finalResult[0].masterPolicyDetails?.AdditionalImpInfo
            );
            objectPath.set(
              dto,
              "AdditionalDetails.PremiumEmployeeContriution",
              partnerId.finalResult[0].masterPolicyDetails.PremiumEmployeeContribution
            );
            objectPath.set(
              dto,
              "AdditionalDetails.PremiumEmployerContribution",
              partnerId.finalResult[0].masterPolicyDetails.PremiumEmployerContribution
            );
            setGenericPolicyDto(dispatch, dto);
            masters.policyID = partnerId.finalResult[0].policyId;

            setPartnerID(partnerId.finalResult[0].agentId);
            setProductID(partnerId.finalResult[0].productIdPk);
            console.log("Hari", dto);
          }
        }
      );
      masters.Plans = await getPlanbyProductId(masters.policyID);
    }
  };
  console.log("imstallment", dto.InstallmentFrequency);
  console.log("masterPolicyDetails", masters.masterPolicyDetails);
  const handleRadioChange = async (e) => {
    objectPath.set(dto, "TypeOfCOI", e.target.value);
    setGenericPolicyDto(dispatch, dto);
  };
  // useEffect(() => {
  //   if (dto.PartnerDetails.masterPolicyNo !== "") {
  //     masters.Plans = getPlanbyProductId(masters.policyID);
  //     // objectPath.set(dto, "Temp.PlanList", masters.Plans);
  //     // console.log("Plans", masters.Plans);

  //     // setGenericPolicyDto(dispatch, dto);
  //   }
  // }, []);
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const callBenefitData = async (e, v) => {
    masters.FamilyCombination = [];
    masters.Relationship = [];
    dto.Relationship = "";
    dto.FamilyCombination = "";
    objectPath.set(dto, "Plan", v.mValue);
    objectPath.set(dto, "InsurableItem.0.RiskItems.0.Plan", v.mValue);
    setGenericPolicyDto(dispatch, dto);
    objectPath.set(Payload, "planType", v.mValue);
    const res1 = await GetBenefits(Payload);
    console.log("benefit", res1);
    const PlanDetails = await GetGroupingDetailsByPlanGrid(v.mValue, request);
    console.log("PlanDetails", PlanDetails);
    objectPath.set(
      dto,
      "PolicyType",
      PlanDetails.data[0].groupDetailsJson.SectionMaster.SumInsuredType
    );
    PlanDetails?.data[0]?.groupDetailsJson?.SectionMaster?.FamilyCombination.forEach((x) => {
      const data = { mValue: x.FamilyCombination, TotalCount: x.TotalCount };
      masters.FamilyCombination.push(data);
    });
    console.log("FamilyCombination", masters.FamilyCombination);
    objectPath.set(dto, "Temp.FamilyCombinationList", masters.FamilyCombination);

    // PlanDetails.data[0].groupDetailsJson.SectionMaster.Relationship.forEach((x) => {
    //   const data = { mValue: x.Relationship };
    //   masters.Relationship.push(data);
    // });

    // before relationship is comming array of object, now it is comming comma seperated values, so converting to array of object
    const relationshipsString = PlanDetails.data[0]?.groupDetailsJson?.SectionMaster?.Relationship;
    const relationshipsArray = relationshipsString.split(",");
    // Transforming the relationships into an array of objects
    const transformedRelationships = relationshipsArray.map((relationship) => ({
      Relationship: relationship.trim(),
    }));
    // Updating the original object with the transformed relationships
    const Relationship = transformedRelationships;

    // filtering the self
    const filteredRelationship = Relationship.filter((x) => x.Relationship !== "Self");
    filteredRelationship.forEach((x) => {
      const data = { mValue: x.Relationship };
      masters.Relationship.push(data);
    });
    console.log("Relationship", masters.Relationship);
    objectPath.set(dto, "Temp.RelationshipList", masters.Relationship);

    // const selfRelationships = masters.Relationship.filter((item) => item.mValue !== "Self");
    // masters.NomineeRelationship = selfRelationships;

    setGenericPolicyDto(dispatch, dto);
    masters.policyDuration =
      PlanDetails.data[0].groupDetailsJson.SectionMaster.CountofPolicyDuration;
    masters.countPolicyDuration = PlanDetails.data[0].groupDetailsJson.SectionMaster.PolicyDuration;
    console.log("policyDuration", masters.policyDuration);
    console.log("policyDuration", masters.countPolicyDuration);
    const CountOfPolicyDuration = parseInt(masters.policyDuration, 10);
    const TypeOfPolicyDuration = PlanDetails.data[0].groupDetailsJson.SectionMaster.PolicyDuration;
    objectPath.set(dto, "PolicyPeriod", masters.policyDuration);
    const res2 = [...res1.finalResult.benefits];
    res2.forEach((x, i) => {
      res2[i].rowID = i + 1;
    });
    objectPath.set(dto, "Benefit", res2);

    // bind the covername based on Benefit (InsurableItem.0.Covers.)
    res2.forEach((item, index) => {
      const obj = {
        CoverName: item.Benefit,
        selected: true,
      };
      objectPath.set(dto, `InsurableItem.0.Covers.${index}`, obj);
    });
    setGenericPolicyDto(dispatch, dto);
    const SumInsured = [];
    let TotalSumInsured = 0;
    dto.Benefit.forEach((x) => {
      SumInsured.push(x.Value);
    });
    for (let i = 0; i < SumInsured.length; i += 1) {
      TotalSumInsured += SumInsured[i];
    }
    objectPath.set(dto, "InsurableItem.0.RiskItems.0.SumInsured", TotalSumInsured);
    if (TypeOfPolicyDuration === "Years") {
      objectPath.set(dto, "SetPolicyInput", `${CountOfPolicyDuration}.${0}.${0}`);
    } else if (TypeOfPolicyDuration === "Months") {
      objectPath.set(dto, "SetPolicyInput", `${0}.${CountOfPolicyDuration}.${0}`);
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const handleCED = (e, d, i) => {
    // debugger;
    // no need because given  condition in the components itself as maxlength
    // if (dto.InsurableItem[0].RiskItems[i].DOJ === "") {
    //   Swal.fire({
    //     icon: "error",
    //     showCloseButton: true,
    //     allowOutsideClick: false,
    //     text: `Please Select Date of Joining`,
    //   });
    //   objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.DOC`, null);
    //   setGenericPolicyDto(dispatch, dto);
    // } else {
    objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.DOC`, d);
    setGenericPolicyDto(dispatch, dto);
    const Doc = objectPath.get(dto, `InsurableItem.0.RiskItems.${i}.DOC`);
    console.log("123Hari", Doc);
    const policyStartDate = objectPath.get(dto, "PartnerDetails.PolicyStartDate");
    const PolicyEndDate = objectPath.get(dto, "PartnerDetails.PolicyEndDate");
    const psd = policyStartDate.split("T");
    const pEd = PolicyEndDate.split("T");
    const OgPsd = psd[0];
    const OgPEd = pEd[0];
    console.log("ogpsd", OgPsd);
    console.log("ogpEd", OgPEd);
    const docDate = new Date(d);
    const ogPsdDate = new Date(OgPsd);
    const ogPEdDate = new Date(OgPEd);
    let policyDurationDays = "";
    if (d !== "" || masters.policyDuration !== undefined) {
      const dateParts = d.split("-");
      const policyDurationYears = parseInt(masters.policyDuration, 10);
      if (masters.countPolicyDuration === "Years") {
        const converttomonth = policyDurationYears * 12;
        let leapYears = 0;
        const currentYear = new Date().getFullYear();
        for (let month = 1; month <= converttomonth; month += 1) {
          leapYears += new Date(currentYear, month, 0).getDate(); // Assuming the year 2022 for the date
        }
        policyDurationDays = leapYears;
      } else if (masters.countPolicyDuration === "Months") {
        let totalDays = 0;
        const currentYear = new Date().getFullYear();
        for (let month = 1; month <= policyDurationYears; month += 1) {
          totalDays += new Date(currentYear, month, 0).getDate(); // Assuming the year 2022 for the date
        }
        policyDurationDays = totalDays;
      }
      const originalYear = parseInt(dateParts[0], 10);
      const originalMonth = parseInt(dateParts[1], 10);
      const originalDay = parseInt(dateParts[2], 10);
      const originalDate = new Date(originalYear, originalMonth - 1, originalDay);
      originalDate.setDate(originalDate.getDate() + policyDurationDays);
      const incrementedYear = originalDate.getFullYear();
      const incrementedMonth = originalDate.getMonth() + 1;
      const incrementedDay = originalDate.getDate();
      const Ced = `${incrementedYear}-${String(incrementedMonth).padStart(2, "0")}-${String(
        incrementedDay
      ).padStart(2, "0")}`;
      objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.CoverageEndDate`, Ced);

      objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.DOL`, Ced);

      if (docDate < ogPsdDate) {
        dto.InsurableItem[0].RiskItems[id].DOC = "";
        dto.InsurableItem[0].RiskItems[id].CoverageEndDate = "";
        Swal.fire({
          icon: "error",
          text: `DOC cannot be less than Policy start date`,
        });
      } else if (docDate > ogPEdDate) {
        dto.InsurableItem[0].RiskItems[id].DOC = "";
        dto.InsurableItem[0].RiskItems[id].CoverageEndDate = "";
        Swal.fire({
          icon: "error",
          text: `DOC cannot be Greater than Policy End date`,
        });
      } else {
        objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.CoverageEndDate`, Ced);
      }
    }
    setGenericPolicyDto(dispatch, dto);
    // }
  };

  useEffect(() => {
    topDto = dto;
    topDispatch = dispatch;
    if (dto.InsurableItem[0].RiskItems[id].RelationShipToProposer === "Self") {
      objectPath.set(dto, "ProposerDetails.EmailId", dto.InsurableItem[0].RiskItems[id].EmailID);
      objectPath.set(dto, "ProposerDetails.Name", dto.InsurableItem[0].RiskItems[id].Name);
      objectPath.set(dto, "ProposerDetails.Age", dto.InsurableItem[0].RiskItems[id].Age);
      objectPath.set(
        dto,
        "ProposerDetails.MobileNo",
        dto.InsurableItem[0].RiskItems[id].MobileNumber
      );
      objectPath.set(dto, "PolicyStartDate", dto.InsurableItem[0].RiskItems[id].DOC);
      objectPath.set(dto, "PolicyEndDate", dto.InsurableItem[0].RiskItems[id].CoverageEndDate);

      setGenericPolicyDto(dispatch, dto);
    }

    if (dto.PartnerDetails.masterPolicyNo !== "" && masters.state !== "payment") {
      const newValue = `IN`;
      objectPath.set(dto, "prefix", newValue);
      objectPath.set(dto, "InstallmentCase", masters.masterPolicyDetails.InstallmentCase);
      setGenericPolicyDto(dispatch, dto);
    }
    if (masters.masterPolicyDetails.InstallmentCase === "Yes") {
      objectPath.set(dto, "InstallmentFrequency", masters.masterPolicyDetails.InstallmentFrequency);
      setGenericPolicyDto(topDispatch, topDto);
    }
  }, [genericPolicyDto]);
  useEffect(() => {
    if (masters.state === "payment") {
      if (masters.flagNavigate === true) {
        Navigate(`/retail/Payment/MagmaRazor?ProposalNumber=${dto.ProposalNo}`);
      }
    }
  }, [masters.flagNavigate === true]);

  const onDOBselect = (e, d, i) => {
    // debugger;
    if (d === "") {
      dto.InsurableItem[0].RiskItems[i].DateofBirth = [""];
      dto.InsurableItem[0].RiskItems[i].Age = "";
      setGenericPolicyDto(dispatch, dto);
    }
    if (dto.InsurableItem[0].RiskItems[i].DOC === "") {
      Swal.fire({
        icon: "error",
        showCloseButton: true,
        allowOutsideClick: false,
        text: `Please Select Date of Commencement`,
      });
      dto.InsurableItem[0].RiskItems[i].DateofBirth = [""];
      dto.InsurableItem[0].RiskItems[i].Age = "";
      setGenericPolicyDto(dispatch, dto);
    } else if (d !== "") {
      const doc = objectPath.get(dto, `InsurableItem.0.RiskItems.${i}.DOC`);
      console.log("doc", doc);
      const selectedDate = new Date(d);
      const docDate = new Date(doc);
      let age = docDate.getFullYear() - selectedDate.getFullYear();
      const docMonth = docDate.getMonth();
      const selectedMonth = selectedDate.getMonth();
      const docDay = docDate.getDate();
      const selectedDay = selectedDate.getDate();
      if (docMonth < selectedMonth || (docMonth === selectedMonth && docDay < selectedDay)) {
        age -= 1;
      }

      if (age < 18 && i === 0) {
        dto.InsurableItem[0].RiskItems[i].Age = "";
        Swal.fire({
          showCloseButton: true,
          allowOutsideClick: false,
          icon: "error",
          text: `Age of the Policy Holder must be above 18 Years.`,
        });
        dto.InsurableItem[0].RiskItems[i].DateofBirth = [""];
      } else {
        dto.InsurableItem[0].RiskItems[i].DateofBirth = d;
        dto.InsurableItem[0].RiskItems[i].Age = age.toString();
      }
      setGenericPolicyDto(dispatch, dto);
    }
  };
  const RelationshipGenderValidation = (e, v, i) => {
    objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.RelationShipToProposer`, v.mValue);
    setGenericPolicyDto(dispatch, dto);
    if (
      dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Spouse" &&
      dto.InsurableItem[0].RiskItems[0].Gender === dto.InsurableItem[0].RiskItems[i].Gender
    ) {
      Swal.fire({
        title: "Warning !",
        text: "Self and Spouse Gender are same",
        // timer: 5000,
      });
    } else if (
      (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Wife" ||
        dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Daughter" ||
        dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Mother") &&
      dto.InsurableItem[0].RiskItems[i].Gender !== "Female"
    ) {
      Swal.fire({
        title: "Warning !",
        text: "Gender is mismatched with Relationship",
        // timer: 5000,
      });
    } else if (
      (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Husband" ||
        dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Son" ||
        dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Father") &&
      dto.InsurableItem[0].RiskItems[i].Gender !== "Male"
    ) {
      Swal.fire({
        title: "Warning !",
        text: "Gender is mismatched with Relationship",
        // timer: 5000,
      });
    }
  };
  // let gender = false;
  const GenderValidation = (e, v, i) => {
    objectPath.set(dto, `InsurableItem.0.RiskItems.${i}.Gender`, v.mValue);
    setGenericPolicyDto(dispatch, dto);
    if (
      dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Spouse" &&
      dto.InsurableItem[0].RiskItems[0].Gender === dto.InsurableItem[0].RiskItems[i].Gender
    ) {
      Swal.fire({
        title: "Warning !",
        text: "Self and Spouse Gender are same",
        // timer: 5000,
      });
    } else if (
      (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Wife" ||
        dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Daughter" ||
        dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Mother") &&
      dto.InsurableItem[0].RiskItems[i].Gender !== "Female"
    ) {
      Swal.fire({
        title: "Warning !",
        text: "Gender is mismatched with Relationship",
        // timer: 5000,
      });
    } else if (
      (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Husband" ||
        dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Son" ||
        dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Father") &&
      dto.InsurableItem[0].RiskItems[i].Gender !== "Male"
    ) {
      Swal.fire({
        title: "Warning !",
        text: "Gender is mismatched with Relationship",
        // timer: 5000,
      });
    }
  };

  if (masters.state === "payment") {
    masters.disable = true;
    masters.visible = false;
    masters.button = "Make Payment";
  }

  if (
    masters?.location?.state?.hash === "Pending due to CD" ||
    masters?.location?.state?.hash === "Payment Pending"
  ) {
    masters.proceedvisible = false;
  }
  const handleClearMember = (e, indexToRemove) => {
    const newRisk = Risk(); // Create a new Risk object with default values
    // Update each field in RiskItems except for Questionaire
    const riskItems = dto.InsurableItem[0].RiskItems[indexToRemove];

    // Object.keys(newRisk).forEach((key) => { // questionaire will reset to No when click on clear
    //   if (key !== "Questionaire") {
    //     riskItems[key] = newRisk[key]; // Clear the field by assigning the default value
    //   }
    // });

    // questionaire will reset to No when click on clear and Relationship of first member won't clear
    const keysToKeep = Object.keys(newRisk);
    keysToKeep.forEach((key) => {
      if (key !== "Questionaire" && (key !== "RelationShipToProposer" || indexToRemove !== 0)) {
        riskItems[key] = newRisk[key]; // Clear the field by assigning the default value
      }
    });

    // Set Questionaire answers to default 'No'
    riskItems.Questionaire = riskItems.Questionaire.map((q) => ({
      ...q,
      Answer: "No",
    }));
    setGenericPolicyDto(dispatch, dto);
  };

  // Regex for Member ID
  const MemberID = (str) => {
    const regex = /^[A-Z0-9]*$/;
    if (regex.test(str)) return true;
    return "Please provide valid Member ID";
  };

  const spreadMembersQuestionarieSummary = (i) => {
    const qArray = [];
    if (Array.isArray(dto.InsurableItem[0].RiskItems[i].Questionaire))
      dto.InsurableItem[0].RiskItems[i].Questionaire.forEach((ques, j) => {
        qArray.push(
          {
            type: "Typography",
            label: `${j + 1}.  ${ques.QText}`,
            variant: "body2",
            spacing: 10.25,
            visible: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: {
              label: ques.QText,
              labelVisible: false,
            },
            radioList: [
              { value: "Yes", label: "Yes", disabled: masters.disable || DisableFields === "Fail" },
              { value: "No", label: "No", disabled: masters.disable || DisableFields === "Fail" },
            ],
            value: `InsurableItem.0.RiskItems.${i}.Questionaire.${j}.Answer`,
            spacing: 1.75,
          }
        );
      });
    return qArray;
  };
  const member = false;
  const spreadMemberdetails = () => {
    const arr = [];
    dto.InsurableItem[0].RiskItems.forEach((y, i) => {
      arr.push([
        {
          type: "Button",
          label: "Clear",
          visible: masters.visible,
          disabled: masters.disable,
          variant: "contained",
          component: "label",
          // typeFormat: <input hidden type="file" accept="image/*" onChange={onUploadPic} />,
          spacing: 12,
          onClick: (e) => handleClearMember(e, i),
        },
        {
          type: "Input",
          label: "Member ID",
          value: `InsurableItem.0.RiskItems.${0}.FamilyID`,
          // disabled: i > 0 ? member === false : masters.disable,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: {
            readOnly: i > 0 ? member === false : masters.disable,
          },
          required: true,
          visible: true,
          onChangeFuncs: [MemberID],
        },

        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Joining",
          visible: true,
          altFormat: "d/m/Y",
          maxDate: dto.InsurableItem[0].RiskItems[i].DOC,
          dateFormat: "Y-m-d",
          value: `InsurableItem.0.RiskItems.${i}.DOJ`,
          disabled: masters.disable || DisableFields === "Fail",
        },
        {},
        {},
        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Commencement",
          visible: true,
          altFormat: "d/m/Y",
          minDate: dto.InsurableItem[0].RiskItems[i].DOJ,
          // minDate: dto.InsurableItem[0].RiskItems[i].DOJ && dto.PartnerDetails.PolicyStartDate,
          // maxDate: dto.PartnerDetails.PolicyEndDate,
          dateFormat: "Y-m-d",
          value: `InsurableItem.0.RiskItems.${i}.DOC`,
          disabled: masters.disable || DisableFields === "Fail",
          customOnChange: (e, d) => handleCED(e, d, i),
        },
        {
          type: "Input",
          required: true,
          label: "Member Name",
          value: `InsurableItem.0.RiskItems.${i}.Name`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Date Of Birth",
          visible: true,
          altFormat: "d/m/Y",
          maxDate: new Date(),
          dateFormat: "Y-m-d",
          value: `InsurableItem.0.RiskItems.${i}.DateofBirth`,
          disabled: masters.disable || DisableFields === "Fail",
          customOnChange: (e, d) => onDOBselect(e, d, i),
        },
        {
          type: "Input",
          label: "Age",
          required: true,
          value: `InsurableItem.0.RiskItems.${i}.Age`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: true },
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Relationship",
          visible: true,
          value: `InsurableItem.0.RiskItems.${i}.RelationShipToProposer`,
          disabled: masters.disable || DisableFields === "Fail",
          readOnly: i === 0,
          options: masters.Relationship,
          customOnChange: (e, v) => RelationshipGenderValidation(e, v, i),
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Gender",
          visible: true,
          value: `InsurableItem.0.RiskItems.${i}.Gender`,
          disabled: masters.disable || DisableFields === "Fail",
          options: masters.Gender,
          customOnChange: (e, v) => GenderValidation(e, v, i),
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Coverage End Date",
          visible: true,
          altFormat: "d/m/Y",
          minDate: dto.InsurableItem[0].RiskItems[i].DOJ,
          dateFormat: "Y-m-d",
          value: `InsurableItem.0.RiskItems.${i}.CoverageEndDate`,
          // disabled: masters.disable || DisableFields === "Fail",
          disabled: "true",
        },
        {
          type: "Input",
          label: "Ellite Status",
          value: `InsurableItem.0.RiskItems.${i}.ElliteStatus`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
          onChangeFuncs: [IsAlpha],
        },
        {
          type: "Input",
          label: "Location",
          value: `InsurableItem.0.RiskItems.${i}.Location`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
        },
        {
          type: "Input",
          label: "Grade",
          value: `InsurableItem.0.RiskItems.${i}.Grade`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
          // onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          label: "Designation",
          value: `InsurableItem.0.RiskItems.${i}.Designation`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
          // onChangeFuncs: [IsAlphaNum],
        },
        {
          type: "Input",
          required: true,
          label: "Mobile No.",
          value: `InsurableItem.0.RiskItems.${i}.MobileNumber`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
          onBlurFuncs: [IsMobileNumber],
        },
        {
          type: "Input",
          required: true,
          label: "Email ID",
          value: `InsurableItem.0.RiskItems.${i}.EmailID`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
          onBlurFuncs: [IsEmail],
        },
        {
          type: "Input",
          required: true,
          label: "No. of Lives",
          value: `InsurableItem.0.RiskItems.${i}.NoOfLives`,
          disabled: masters.disable || DisableFields === "Fail",
          // disabled: true,
          InputProps: { disabled: true },
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Remarks",
          value: `InsurableItem.0.RiskItems.${i}.Remarks`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
          onChangeFuncs: [IsAlphaSpace],
          spacing: 6,
        },
        {
          type: "Typography",
          label: "Questionaire",
          visible: dto.InsurableItem[0]?.RiskItems[0]?.Questionaire?.length !== 0,
          spacing: 12,
          color: "primary",
        },
        ...spreadMembersQuestionarieSummary(i),

        {
          type: "Typography",
          label: "Nominee Details",
          visible: true,
          spacing: 12,
          color: "primary",
        },
        {
          type: "Input",
          label: "Nominee Name",
          required: true,
          value: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeName`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
          onChangeFuncs: [IsAlphaSpace],
        },
        {
          type: "AutoComplete",
          label: "Nominee Relationship",
          required: true,
          visible: true,
          value: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeRelationWithProposer`,
          disabled: masters.disable || DisableFields === "Fail",
          options: masters.NomineeRelationship,
        },
        {
          type: "MDDatePicker",
          label: "Nominee DOB",
          visible: true,
          required: true,
          altFormat: "d/m/Y",
          maxDate: new Date(),
          dateFormat: "Y-m-d",
          disabled: masters.disable || DisableFields === "Fail",
          value: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeDOB`,
        },
        {
          type: "Typography",
          label: "Other Details",
          visible: true,
          spacing: 12,
          color: "primary",
        },

        {
          type: "Input",
          label: "Loan EMI Amount",
          value: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.LoanEMIAmount`,
          required: true,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible:
            dto.Benefit && dto.Benefit.filter((x) => x.CoverName === "EMI Benefit").length > 0,
          onChangeFuncs: [IsNumeric],
        },

        {
          type: "Input",
          label: "Personal Accident SumInsured",
          value: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.PersonalAccidentSumInsured`,
          required: true,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible:
            dto.Benefit &&
            dto.Benefit.filter((x) => x.CoverName === "Personal Accident").length > 0,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Critical Illness SumInsured",
          value: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.CriticalIllnessSumInsured`,
          required: true,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible:
            dto.Benefit && dto.Benefit.filter((x) => x.CoverName === "Critical Illness").length > 0,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Special Terms",
          value: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.SpecialTerms`,
          disabled: masters.disable || DisableFields === "Fail",
          InputProps: { readOnly: masters.disable },
          visible: true,
          onChangeFuncs: [IsAlphaNum],
          spacing: 6,
        },
      ]);
    });

    console.log("Hr", arr);
    return arr;
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const displayFile = (file) => {
    setSelectedFile(file);
  };
  const handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    displayFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    displayFile(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const handledownloadclick = async () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASEURL}/ExcelUpload/GetTemplateDetails?TemplateId=211`, {
      method: "GET",
      headers: {
        Authorization: token === "" ? process.env.REACT_APP_API_KEY : `Bearer ${token}`,
      },
    })
      .then((response1) => response1.blob())
      .then((newBlob) => {
        if (newBlob === null) {
          alert("Template Download Failed");
        } else {
          const url = window.URL.createObjectURL(newBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "FileName.xlsx";

          link.click();
        }
      });
  };

  const UploadDocument = async () => {
    const fileReader = await new FileReader();
    // const file = files.target.files[0];
    // console.log("fileReader", file);
    fileReader.onload = (e) => {
      // flag.backdropflag = true;
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let data = [];
      data = utils.sheet_to_json(ws);
      console.log("data", data);
    };
    console.log("filename", selectedFile);
    const formData = new FormData();
    formData.append("Files", selectedFile);
    formData.append("TemplateId", "211");
    await postRequest(`ExcelUpload/Upload`, formData).then(async (res) => {
      console.log("1234567", res);
      if (res.data.status === 1) {
        Swal.fire({
          icon: "success",
          html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%">
            <tr><td style={{textAlign:"left"}}><strong>Document Uploaded Successfully </strong></td></tr>
            <tr><td style={{textAlign:"left"}}><strong>Document ID:${res.data.documentUploadId}</strong></td></tr>
            <tr><td style={{textAlign:"left", fontSize:"1rem", width:"1rem"}}>Save the document ID for further reference</td></tr>
            </table></div>`,
        });
      } else {
        Swal.fire({
          icon: "error",
          html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%">
          <tr><td style={{textAlign:"left"}}><strong>File Uploading Failed </strong></td></tr>
          </table></div>`,
        });
      }
      if (res.data.documentUploadId !== "") {
        const getuploadDetails = res.data.documentUploadId;
        setGenericInfo(dispatch, { ...genericInfo, getuploadDetails });
        Navigate("/UploadStatusMagma", { state: { getuploadDetails } });
      }
    });
  };

  const handleFileUpload = async (event) => {
    console.log("files", event.target.files[0]);
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  let data = [];

  // to jump case 0 to case 2 when TypeOfCOI is Bulk Upload
  let lActiveStep = activeStep;
  if (objectPath.get(dto, "TypeOfCOI") === "Bulk Upload") {
    if (activeStep === 1) lActiveStep = 3;
  }
  // to jump case 1 to case 3 when installmentcase is NO
  if (objectPath.get(dto, "InstallmentCase") === "No") {
    if (activeStep === 2) lActiveStep = 3;
    if (activeStep === 3) lActiveStep = 4;
  }
  const handleFamilyCombination = (e, v) => {
    objectPath.set(dto, "FamilyCombination", v.mValue);
    objectPath.set(dto, "InsurableItem.0.RiskItems.0.RelationShipToProposer", "Self");
    setGenericPolicyDto(dispatch, dto);
    const countOfLives = Number(v.TotalCount);

    const Questionaire = () => topDto.InsurableItem[0]?.RiskItems[0]?.Questionaire;
    if (countOfLives === 1) {
      topDto.InsurableItem[0].RiskItems = [topDto.InsurableItem[0].RiskItems[0]];
    } else {
      // Countoflive > 1
      const currentLength = topDto.InsurableItem[0].RiskItems.length;
      if (currentLength < countOfLives) {
        // Add elements
        for (let k = currentLength; k < countOfLives; k += 1) {
          topDto.InsurableItem[0].RiskItems.push({
            ...Risk(),
            Questionaire: [...Questionaire().map((x) => ({ ...x }))],
          });
        }
      } else if (currentLength > countOfLives) {
        // Remove elements
        topDto.InsurableItem[0].RiskItems = topDto.InsurableItem[0].RiskItems.slice(
          0,
          countOfLives
        );
      }
    }
    setGenericPolicyDto(topDispatch, topDto);
  };

  const AddMemberDetails = () => {
    Swal.fire({
      icon: "info",
      title: "Change Family Combination",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCloseButton: true,
      html: "Please change the Family Combination in the Previous Page to add a new member.",
    });
  };

  // for radio button red colour
  const theme1 = ThemeProvider({
    components: {
      MuiRadio: {
        styleOverrides: {
          root: {
            color: "red",
            "&$checked": {
              color: "red",
            },
          },
        },
      },
    },
  });

  switch (lActiveStep) {
    case 0:
      data = [
        [
          {
            type: "Input",
            required: true,
            label: "Master Policy No.",
            value: "PartnerDetails.masterPolicyNo",
            InputProps: { maxLength: 23 },
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaNumSpecial],
          },
          {
            type: "Input",
            label: "Master Policy Holder Name",
            value: "PartnerDetails.partnerName",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            // required: true,
            label: "Customer ID",
            value: "PartnerDetails.customerID",
            // InputProps: { readOnly: true },
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Button",
            label: "Search MP",
            visible: true,
            variant: "contained",
            align: "right",
            onClick: handleSearchMP,
          },
        ],
        [
          {
            type: "MDDatePicker",
            required: true,
            label: "Proposal Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            visible: true,
            InputProps: { disabled: true },
            disabled: true,
            value: "ProposalDate",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: true,
            InputProps: { disabled: true },
            disabled: true,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "PartnerDetails.PolicyStartDate",
          },

          {
            type: "Input",
            required: true,
            label: "Policy Start Time",
            visible: true,
            InputProps: { disabled: true },
            disabled: true,
            value: "PolicyStartTime",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            visible: true,
            InputProps: { disabled: true },
            disabled: true,
            value: "PartnerDetails.PolicyEndDate",
          },
          {
            type: "Input",
            required: true,
            label: "Policy End Time",
            visible: true,
            InputProps: { disabled: true },
            disabled: true,
            value: "PolicyEndTime",
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <>
                <MDBox display="flex" flexDirection="row" alignItems="center">
                  <MDTypography>Please select the Type of COI</MDTypography>
                  <ThemeProvider theme={theme1}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{ ml: "50px" }}
                      value={dto.TypeOfCOI}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="Bulk Upload"
                        control={<Radio />}
                        label="Bulk Upload"
                        disabled={DisableFields === "Fail"}
                      />
                      <FormControlLabel
                        value="Individual"
                        control={<Radio />}
                        label="Individual"
                        disabled={DisableFields === "Fail"}
                      />
                    </RadioGroup>
                  </ThemeProvider>
                </MDBox>
                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={masters.loader}
                >
                  <CircularProgress />
                </Backdrop>
              </>
            ),
          },
          {
            type: "AutoComplete",
            label: "Select Plan",
            visible: dto.TypeOfCOI === "Individual",
            value: "Plan",
            options: masters.Plans,
            customOnChange: callBenefitData,
            required: true,
            disabled: DisableFields === "Fail",
          },
          {
            type: "AutoComplete",
            label: "Family Combination",
            visible: dto.TypeOfCOI === "Individual",
            value: "FamilyCombination",
            options: masters.FamilyCombination,
            customOnChange: handleFamilyCombination,
            required: true,
            disabled: DisableFields === "Fail",
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: dto.TypeOfCOI === "Individual",
            columns: [
              {
                field: "CoverName",
                headerName: "Cover Name",
                width: 400,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Value",
                headerName: "Sum Insured",
                width: 400,
                headerAlign: "center",
                align: "center",
              },
            ],
            rowId: "CoverName",
            value: "Benefit",
          },
          {
            type: "Custom",
            visible: dto.TypeOfCOI === "Bulk Upload",
            spacing: 12,
            return: (
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "auto",
                  p: 2,
                  border: "1px dashed grey",
                }}
              >
                <Stack spacing={2} justifyContent="center">
                  <Typography
                    variant="h5"
                    color="error"
                    component="span"
                    align="center"
                    gutterBottom
                  >
                    <CloudDoneOutlinedIcon fontSize="large" />
                  </Typography>

                  <Typography variant="h5" gutterBottom>
                    {" "}
                    Select a file or drag and drop here{" "}
                  </Typography>

                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    onChange={handleFileSelect}
                  >
                    {" "}
                    All .csv, .xlxs and .xls file types supported here{" "}
                  </Typography>

                  <Grid container justifyContent="center" p={2} alignItems="bottom">
                    <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      {selectedFile ? (
                        <>
                          <MDTypography
                            sx={{
                              flex: 1,
                              fontSize: "12px",
                              fontWeight: 500,
                              marginRight: "1rem",
                            }}
                          >
                            {selectedFile.name}
                          </MDTypography>

                          <ClearIcon
                            variant="outlined"
                            color="secondary"
                            onClick={handleClearFile}
                          />
                        </>
                      ) : (
                        <label htmlFor="file-upload">
                          <input
                            type="file"
                            id="file-upload"
                            hidden
                            accept="xls, .xlsx, .csv"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onChange={(e) => handleFileUpload(e, "fileName")}
                            style={{ display: "none" }}
                          />

                          <Input
                            type="file"
                            id="file-input"
                            inputRef={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: "none" }}
                          />
                          <MDButton
                            variant="contained"
                            color="secondary"
                            component="label"
                            type="file"
                            id="fileInput"
                            htmlFor="file-input"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                            }}
                          >
                            Browse
                          </MDButton>
                        </label>
                      )}
                    </MDBox>
                  </Grid>
                  {!selectedFile && (
                    <MDButton variant="text" color="error" onClick={handledownloadclick}>
                      Download Template
                    </MDButton>
                  )}
                  {selectedFile && (
                    <MDBox sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                      <MDButton
                        variant="contained"
                        color="success"
                        type="file"
                        id="fileInput"
                        onClick={UploadDocument}
                      >
                        Submit
                      </MDButton>
                    </MDBox>
                  )}
                </Stack>
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
            type: "Input",
            label: "Family Combination",
            value: "FamilyCombination",
            InputProps: { disabled: true },
            visible: dto.TypeOfCOI === "Individual",
            disabled: true,
          },
          {
            type: "Button",
            label: "Add Member",
            visible: masters.visible,
            disabled: masters.disable,
            variant: "contained",
            component: "label",
            spacing: 12,
            onClick: AddMemberDetails,
          },
        ],
        ...spreadMemberdetails(),
        [
          {
            type: "Input",
            label: "Premium Employer Contribution",
            value: "AdditionalDetails.PremiumEmployerContribution",
            // disabled: masters.disable,
            disabled: true,
            // InputProps: { readOnly: masters.disable },
            visible: dto.AdditionalDetails.PremiumEmployerContribution !== "",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Premium Employee Contribution",
            value: "AdditionalDetails.PremiumEmployeeContriution",
            // disabled: masters.disable,
            disabled: true,
            // InputProps: { readOnly: masters.disable },
            visible: dto.AdditionalDetails.PremiumEmployeeContriution !== "",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "COI Number Issued By Customer",
            value: "AdditionalDetails.COINumberIssuedByCustomer",
            disabled: masters.disable || DisableFields === "Fail",
            InputProps: { readOnly: masters.disable },
            visible: true,
            onChangeFuncs: [IsAlphaNumSpecial],
          },
        ],
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <>
                {dto.AdditionalDetails.SpecialCondition.map((x, index) => (
                  <Grid container spacing={2}>
                    <Grid item xs={11} sm={11} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDInput
                        value={x.SpecialCondition}
                        label={`Special Condition ${index + 1}`}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={11} sm={11} md={3} lg={3} xl={3} xxl={3} mt={2}>
                      <MDInput
                        value={x.SpecialConditionValue}
                        label={`Special Condition Value ${index + 1}`}
                        disabled
                      />
                    </Grid>
                  </Grid>
                ))}
              </>
            ),
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
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Input",
            label: "Sum Insured",
            value: "InsurableItem.0.RiskItems.0.SumInsured",
            visible: true,
            disabled: true,
            InputProps: { readOnly: true },
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Total Premium",
            value:
              masters.location.state !== null || masters.state
                ? "PremiumDetails.TotalPremium"
                : "Result.PremiumDetails.TotalPremium",
            visible: true,
            disabled: true,
            InputProps: { readOnly: true },
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Count Of Lives",
            value: "CountOfLives",
            visible: true,
            disabled: true,
            InputProps: { readOnly: true },
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Installment Frequency",
            visible: true,
            value: "InstallmentFrequency",
            disabled: true,
            InputProps: { readOnly: true },
          },
          // {
          //   type: "Input",
          //   label: "Number Of Installments",
          //   value: "NoOfInstallment",
          //   disabled: true,
          //   visible: objectPath.get(dto, "PaymentType") === "EMI",
          //   onChangeFuncs: [IsNumeric],
          // },
          {
            type: "DataGrid",
            spacing: 12,
            visible: objectPath.get(dto, "InstallmentFrequency") !== "",
            disabled: masters.disable,
            columns: [
              {
                field: "InstallementNo",
                headerName: "No. Of Installments",
                width: 170,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "InstallementDate",
                headerName: "Installment Due Date",
                width: 180,
                headerAlign: "center",
                align: "center",
                renderCell: (p) => {
                  const formattedDate = new Date(p.row.InstallementDate).toLocaleDateString(
                    "en-GB"
                  );
                  return formattedDate;
                },
              },
              {
                field: "Premium",
                headerName: "Installment Premium Amount ",
                width: 230,
                headerAlign: "center",
                align: "center",
              },
              { field: "TaxAmount", headerName: "GST@ 18%", width: 100 },
              {
                field: "TotalAmount",
                headerName: "Total Amount",
                value: "TotalAmount",
                width: 150,
                headerAlign: "center",
                align: "center",
                renderCell: (p) => {
                  console.log("p", p);
                  return <MDTypography>{p.row.Premium + p.row.TaxAmount}</MDTypography>;
                },
              },
            ],
            rowId: "InstallementNo",
            value:
              masters.location.state || masters.state
                ? "InstallmentDetails"
                : "Result.InstallmentDetails",
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
            spacing: 12,
            return: (
              <MDBox>
                <Stack direction="row" justifyContent="center">
                  <MDTypography>
                    <strong>Premium Summary</strong>
                  </MDTypography>
                </Stack>
                <Stack direction="row" justifyContent="center" mt={2}>
                  <Card
                    sx={{
                      backgroundColor: "#F0F0F0",
                      width: "500px",
                    }}
                  >
                    <Grid container spacing={2} p={3}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Sum Insured</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹
                          {formater.format(
                            objectPath.get(dto, "InsurableItem.0.RiskItems.0.SumInsured")
                          )}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Installment Premium</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{" "}
                          {formater.format(
                            // masters.location.state === "payment" ||
                            //   masters.location.state === "activeStep"
                            masters.location.state !== null || masters.state
                              ? dto.InstallmentDetails[0].Premium
                              : objectPath.get(dto, "Result.InstallmentDetails.0.Premium")
                          )}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Tax(18%)</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{" "}
                          {formater.format(
                            masters.location.state !== null || masters.state
                              ? dto.InstallmentDetails[0].TaxAmount
                              : objectPath.get(dto, "Result.InstallmentDetails.0.TaxAmount")
                          )}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>
                          <strong>Total Premium</strong>
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          <strong>
                            ₹{" "}
                            {masters.location.state !== null || masters.state
                              ? dto.TotalPremium
                              : dto.Result?.TotalPremium}
                          </strong>
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </Card>
                </Stack>
              </MDBox>
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
                prod="Magma"
                PaymentMode={[
                  { label: "Online", value: "Online" },
                  { label: "Offline", value: "Offline" },
                ]}
                paymentStatus={masters?.location?.state?.hash}
                OfflinePT={{
                  CDRedirection: "/retail/Payment/MagmaSuccess",
                  cdAccDetails: {
                    accountNo: objectPath.get(dto, "PartnerDetails.accountNo"),
                    partnerId: partnerID,
                    productId: productID,
                  },
                  data: [
                    {
                      label: "CD Account",
                      value: "CD Account",
                    },
                  ],
                }}
                OnlinePT={[{ label: "Rayzor", value: "Rayzor Pay" }]}
                // OtherDetails={{
                //   EmailID: objectPath.get(dto, "genericPolicyDto.ProposerDetails.EmailId"),
                // }}
              />
            ),
          },
        ],
      ];

      break;

    default:
      data = [
        [
          {
            type: "Input",
            label: "Insurer Claim No",
            visible: true,
            name: "insurerClaimNo",
            // value: Obj.insurerClaimNo,
            InputProps: { focused: true },
            // onChangeFuncs: [IsNumber, LengthEqualTo],
            parameters: [5],
          },
        ],
      ];
      break;
  }
  return data;
};

const getOnNextClick = async (activeStep, setBackDropFlag) => {
  let fun = false;
  let allAnswers = {};
  let yesCount = {};
  // Convert CountOfLives to a number for comparison
  const ProposalDetails = {
    proposal: null,
    proposalNumber: topDto.ProposalNo,
    policyID: "0",
    proposalResponse: null,
    responseMessage: `Proposal created with proposal number ${topDto.ProposalNo}`,
    id: "44259",
    status: 2,
    errors: [],
    messageKey: null,
    messageValue: [],
    data: null,
  };
  const dto2 = topDto.Result;
  let lActiveStep = activeStep;
  if (objectPath.get(topDto, "InstallmentCase") === "No") {
    if (activeStep === 2 && masters.state === "payment") lActiveStep = 3;
  }
  // delete dto2.BenifitList;
  // objectPath.del(dto2, "BenifitList");
  switch (lActiveStep) {
    case 0:
      fun = true;
      break;
    case 1: {
      topDto.InsurableItem[0].RiskItems.forEach((riskItem, index) => {
        if (index !== 0) {
          objectPath.set(
            topDto,
            `InsurableItem.0.RiskItems.${index}.FamilyID`,
            topDto.InsurableItem[0].RiskItems[0].FamilyID
          );
          objectPath.set(
            topDto,
            `InsurableItem.0.RiskItems.${index}.Plan`,
            topDto.InsurableItem[0].RiskItems[0].Plan
          );
          objectPath.set(
            topDto,
            `InsurableItem.0.RiskItems.${index}.SumInsured`,
            topDto.InsurableItem[0].RiskItems[0].SumInsured
          );
        }
      });

      const countOfRiskItems = topDto.InsurableItem[0].RiskItems.length;
      objectPath.set(topDto, "CountOfLives", countOfRiskItems);
      setGenericPolicyDto(topDispatch, topDto);

      delete topDto.Temp;
      topDto.InsurableItem[0].RiskItems.forEach((x, i) => {
        // pass the GHDResponse:"Rejected" parameter to the JSON when user select any one of the questionnaire as Yes
        if (topDto.InsurableItem[0].RiskItems[i].Questionaire.length !== 0) {
          allAnswers = x.Questionaire.map((item) => item.Answer);
          yesCount = allAnswers.filter((ans) => ans === "Yes").length;
          if (yesCount > 0) {
            objectPath.set(topDto, `InsurableItem.0.RiskItems.${i}.GHDResponse`, "Rejected");
          } else {
            objectPath.set(topDto, `InsurableItem.0.RiskItems.${i}.GHDResponse`, "Accepted");
          }
        } else {
          objectPath.set(topDto, `InsurableItem.0.RiskItems.${i}.GHDResponse`, "Accepted");
        }
      });

      console.log("ghdresponsedto", topDto);
      setGenericPolicyDto(topDispatch, topDto);

      if (masters.state === null || masters.location.state === "activeStep") {
        if (
          topDto.InsurableItem[0].RiskItems[0].MobileNumber === "" &&
          topDto.InsurableItem[0].RiskItems[0].EmailID === ""
        ) {
          Swal.fire({
            icon: "error",
            text: "MobileNo or EmailID any one is required",
          });
        } else {
          topDto.Stage = "PolicyStage";
          fun = await GenericApi("MagmaHospiCash01", "MagmaPremiumCalculator", topDto).then(
            async (x) => {
              console.log("topDto", topDto);
              console.log("premium1", x);
              if (x.finalResult) {
                objectPath.set(topDto, "Result", x.finalResult);

                const totalPremium = (
                  Number(x.finalResult.InstallmentDetails[0].Premium) +
                  Number(x.finalResult.InstallmentDetails[0].TaxAmount)
                ).toFixed(2);
                objectPath.set(topDto, "Result.TotalPremium", totalPremium);
                setGenericPolicyDto(topDispatch, topDto);
                setBackDropFlag(false);

                return true;
              }
              return false;
            }
          );
        }
      } else {
        return true;
      }
      break;
    }
    case 2:
      console.log("loca", masters.location);
      if (masters?.location?.state?.state === "activeStep") {
        console.log("updatePremium", dto2);
        console.log("updatePremium11", topDto.Result);
        if (topDto.Result.DecisionStatus) {
          fun = await UpdateProposalDetails(topDto.Result).then(async (x) => {
            console.log("updatePremium", x);
            if (x.data) {
              localStorage.setItem("proposalNumber", x.data.ProposalNo);
              objectPath.set(topDto, "AssignResult", x.data);
              objectPath.set(topDto, "AssignResult.ProposalDetails", ProposalDetails);
              setGenericPolicyDto(topDispatch, topDto);
              setBackDropFlag(false);

              return true;
            }
            return false;
          });
        }
        if (!topDto.Result.DecisionStatus) {
          fun = await GenericApi("MagmaHospiCash01", "Magma_RuleDispatcher", topDto.Result).then(
            async (x) => {
              console.log("aPIResponse", x);
              if (x.finalResult) {
                if (
                  x.finalResult.DeviationDetails.outcome === "Fail" &&
                  x.finalResult.DeviationDetails.failureCode === "400"
                  // &&
                  // !topDto.Result.DecisionStatus
                ) {
                  // await GetSaveProposalFailedRules(
                  //   x.finalResult.ProposalDetails.proposalNumber,
                  //   x.finalResult.DeviationDetails
                  // );
                  const object = {
                    Stage: "Proposal",
                    Status: 432,
                    workFlowId: 99,
                    WorkFlowType: "Underwrtiter",
                  };
                  await GetSavepolicyWFStatus(x.finalResult.ProposalDetails.proposalNumber, object);
                  const object1 = {
                    Stage: "Proposal",
                    Status: 432,
                    WorkFlowType: "Underwriter",
                    wfstageStatusId: 433,
                    Decision: [],
                  };
                  const response1 = await GetSavepolicyWFStatus(
                    x.finalResult.ProposalDetails.proposalNumber,
                    object1
                  );
                  const response2 = await GetProposalWFId(response1.data.policyID);
                  await GetUpdateWorkflowStatus(response2.data.wfid, 342, {});

                  Swal.fire({
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    confirmButtonColor: "red",
                    confirmButtonText: "Go To Home",
                    html: `<img src="${success}" alt="success image" style="width: 63px; height: 63px;">&nbsp;
                <p style="font-size: 20px;"><strong>Your Proposal is referred to underwriter</strong></p>
                <p style="font-size: 20px;"><strong>as it is subject to underwriter approval.</strong></p>&nbsp;
                <p style="font-size: 20px;"><strong>Proposal:${x.finalResult.ProposalDetails.proposalNumber}</strong></p>
                <p style="font-size: 20px;"><strong>was successfully generated.</strong></p>&nbsp;
                <p style="font-size: 12px;">Save the Proposal No. for further reference</p>`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = "/ProposalList";
                    }
                  });
                } else {
                  localStorage.setItem("proposalNumber", x.finalResult.ProposalNo);
                  objectPath.set(topDto, "AssignResult", x.finalResult);
                  objectPath.set(topDto, "AssignResult.ProposalDetails", ProposalDetails);
                  setGenericPolicyDto(topDispatch, topDto);
                  setBackDropFlag(false);
                }
                return true;
              }
              return false;
            }
          );
        }
        // }
      } else if (masters?.location?.state?.state === null || masters.state === null) {
        // delete topDto.Result.BenifitList;
        console.log("proposaldto", dto2);

        // currently in MagmaPremiumCalculator API response Questionaire node is not added while there is no Questionaire(need to remove code after getting froom API)
        // Assuming RiskItems is an array within dto2.InsurableItem[0]
        for (let i = 0; i < dto2.InsurableItem[0].RiskItems.length; i += 1) {
          const riskItem = dto2.InsurableItem[0].RiskItems[i];
          // Check if Questionaire exists in the current riskItem
          if (!("Questionaire" in riskItem)) {
            // If it doesn't exist, add an empty array for Questionaire
            riskItem.Questionaire = [];
          }
        }

        console.log("afterQuesproposaldto", dto2);
        dto2.ProductByQuery = {
          paramList: [
            {
              ParameterValue: "MagmaHospiCash01",
              ParameterName: "ProductCode",
            },
          ],
          reportname: "GetProductDetailsByProductcode",
        };

        // Log the modified dto2 for verification
        console.log("Modified dto2:", dto2);

        fun = await GenericApi("MagmaHospiCash01", "Magma_HospiCashProposal", dto2).then(
          async (x) => {
            console.log("premium2", x);
            if (x.finalResult) {
              localStorage.setItem("proposalNumber", x.finalResult.ProposalDetails.proposalNumber);
              objectPath.set(
                topDto,
                "ProposalNumber",
                x.finalResult.ProposalDetails.proposalNumber
              );
              objectPath.set(topDto, "AssignResult", x.finalResult);
              setGenericPolicyDto(topDispatch, topDto);

              if (
                x.finalResult.DeviationDetails.outcome === "Fail" &&
                x.finalResult.DeviationDetails.failureCode === "400"
              ) {
                // await GetSaveProposalFailedRules(
                //   x.finalResult.ProposalDetails.proposalNumber,
                //   x.finalResult.DeviationDetails
                // );
                const object = {
                  Stage: "Proposal",
                  Status: 432,
                  workFlowId: 99,
                  WorkFlowType: "Underwrtiter",
                };
                await GetSavepolicyWFStatus(x.finalResult.ProposalDetails.proposalNumber, object);
                const object1 = {
                  Stage: "Proposal",
                  Status: 432,
                  WorkFlowType: "Underwriter",
                  wfstageStatusId: 433,
                  Decision: [],
                };
                const response1 = await GetSavepolicyWFStatus(
                  x.finalResult.ProposalDetails.proposalNumber,
                  object1
                );
                const response2 = await GetProposalWFId(response1.data.policyID);
                await GetUpdateWorkflowStatus(response2.data.wfid, 342, {});

                Swal.fire({
                  allowOutsideClick: false,
                  showConfirmButton: true,
                  confirmButtonColor: "red",
                  confirmButtonText: "Go To Home",
                  html: `<img src="${success}" alt="success image" style="width: 63px; height: 63px;">&nbsp;
                  <p style="font-size: 20px;"><strong>Your Proposal is referred to underwriter</strong></p>
                  <p style="font-size: 20px;"><strong>as it is subject to underwriter approval.</strong></p>&nbsp;
                  <p style="font-size: 20px;"><strong>Proposal:${x.finalResult.ProposalDetails.proposalNumber}</strong></p>
                  <p style="font-size: 20px;"><strong>was successfully generated.</strong></p>&nbsp;
                  <p style="font-size: 12px;">Save the Proposal No. for further reference</p>`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "/ProposalList";
                  }
                });
              } else {
                Swal.fire({
                  allowOutsideClick: false,
                  showCloseButton: true,
                  confirmButtonColor: "red",
                  confirmButtonText: "Continue",
                  html: `
                  <img src="${success}" alt="success image" style="width: 63px; height: 63px; margin-bottom:5px">&nbsp;
                    <p style="font-size: 20px;"><strong>Proposal: ${x.finalResult.ProposalDetails.proposalNumber}</strong></p>
                    <p style="font-size: 20px;"><strong> was successfully generated.</strong></p>&nbsp;
                    <p style="font-size: 12px;">Save the Proposal No. for further reference</p>
                  `,
                });
              }
              setBackDropFlag(false);
              return true;
            }
            return false;
          }
        );
        return true;
      } else {
        return true;
      }
      break;
    case 3:
      if (masters.state === "payment") {
        masters.flagNavigate = true;
      } else {
        fun = true;
      }

      break;

    case 4:
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
  const onPrevclick3 = () => {
    delete topDto.Result;
  };
  const onPrevclick4 = () => {
    delete topDto.AssignResult;
  };
  let lActiveStep = activeStep;
  if (objectPath.get(topDto, "InstallmentCase") === "No") {
    // if (activeStep === 2) lActiveStep = 3;
    if (activeStep === 3 && masters.state !== "payment") lActiveStep = 4;
    if (activeStep === 2 && masters.state === "payment") lActiveStep = 3;
  }
  console.log("lActiveStep", lActiveStep);
  switch (lActiveStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: masters.visible },
        reset: { label: "Reset", visible: false },
        next: { label: "Calculate Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true, onClick: onPrevclick3 },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true, onClick: onPrevclick4 },
        reset: { label: "Reset", visible: false },
        next: {
          label: masters.state !== "payment" ? "Proceed" : "Make Payment",
          visible: masters.proceedvisible,
          loader: "backDrop",
          disabled: topDto && topDto.DeviationDetails && topDto.DeviationDetails.outcome === "Fail",
        },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed to Pay", visible: false, loader: "backDrop" },
      };
      break;
    default:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false, loader: "backDrop" },
      };
      break;
  }
  return btnDetails;
};

export { getProcessSteps, getPageContent, getSectionContent, getButtonDetails, getOnNextClick };
