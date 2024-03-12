import { useRef, useState } from "react";
import { Card, Grid, IconButton, Input, Stack, Typography } from "@mui/material";
import swal2 from "sweetalert2";
import objectPath from "object-path";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import {
  useDataController,
  setGenericInfo,
  // setGenericPolicyDto,
} from "../../../../../../BrokerPortal/context";
import {
  policyDto,
  newMember,
  NomineeObj,
  // OtherDetailsObj,
  AdditionalDetailsObj,
  // SpecialConditionObj,
} from "../data/EndorsementJson";
import {
  IsAlphaSpace,
  IsNumeric,
  IsAlpha,
  IsAlphaNum,
  IsMobileNumber,
  IsEmail,
  AgeCalculator1,
} from "../../../../../../../Common/Validations";
import MDTypography from "../../../../../../../components/MDTypography";
import MDBox from "../../../../../../../components/MDBox";
import MDButton from "../../../../../../../components/MDButton";
import {
  GetPolicyInfoByPolicyNumber,
  getProdPartnerMasterData,
  getProdPartnerMasterDataGender,
  getProdPartnermasterData,
  GenericApi,
  GetEndorsementConfigV2ByProductId,
  GetAssignProductByMasterPolicyNumber,
  getPlanbyProductId,
  GetBenefits,
  EndorsementGenericSave,
  SearchCdAccountAsync,
  UploadExcel,
  UpdateSequenceNumber,
  SaveEndorsementWFStatus,
  UpdateEndorsementV2,
  GetGroupingDetailsByPlanGrid,
  CheckPolicyInEndoStage,
  GenerateCDTransactionForDispatcher,
  ReverseCDTransaction,
  getAllClaimDetails,
} from "../data/index";

const getPolicyDto = () => {
  const dto = policyDto();
  return dto;
};
const getProcessSteps = ({ masters }) => {
  if (masters.TypeOfUpload !== "" && masters.TypeOfUpload === "BulkUpload") {
    const steps = ["Endorsement Selection"];
    return steps;
  }
  const steps = ["Endorsement Selection", "Member Details", "View Summary", "Premium Details"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, masters }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "", visible: true }, // radiobutton accordion
        { name: "", visible: masters.TypeOfUpload === "BulkUpload" }, // bulk endorsement accordion
        { name: "", visible: masters.TypeOfUpload === "Individual" }, // Individual endorsement accordion
      ];
      break;
    case 1:
      steps = [
        {
          name: "",
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change" ||
              masters.endorsementCategory.endorsementConfigName === "Member Addition"),
        },
        // { name: "Plan Details", visible: true },
        {
          name: "Existing Member Details",
          visible: !(
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            masters.endorsementCategory.endorsementConfigName === "Member Deletion"
          ),
        },
        // { name: "Member Details", visible: true },
        {
          name: "New Member Details",
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            masters.endorsementCategory.endorsementConfigName === "Member Addition",
        },
        // { name: "Member Addition", visible: true },
        {
          name: "Member Details",
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            masters.endorsementCategory.endorsementConfigName === "Member Deletion",
        },
        // { name: "Member Deletion", visible: true },
        // premium details hided as of now
        // { name: "Premium Details", visible: true },
        // additional and special conditions details from mp
        { name: "Additional Details", visible: true },
        { name: "Special Conditions", visible: true },
        // premium toi be paid details card
        // { name: "", visible: true },
        {
          name: "",
          visible:
            masters.TypeOfEndorsement.mValue !== "Non-Financial Endorsement" &&
            masters.EndoPremiumDetails === true,
        },
      ];
      break;
    case 2:
      steps = [
        { name: "Summary", visible: true },
        {
          name: "Endorsed Details",
          visible:
            (masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
              // masters.endorsementCategory.endorsementConfigName === "Other Modifications") ||
              (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
                masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change")) ||
            masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
        }, // screen split
        {
          name: "Member Details",
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            masters.endorsementCategory.endorsementConfigName === "Member Addition",
        }, // added members details accordions
        {
          name: "Member Details",
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            masters.endorsementCategory.endorsementConfigName === "Member Deletion",
        }, // deletion members details accordions
        {
          name: "Member Details",
          visible: masters.TypeOfEndorsement.mValue === "Policy Cancellation",
        }, // COI policy cancellation (all) members details accordions
        // { name: "Premium Details Summary", visible: true },
        {
          name: "Premium Details Summary",
          // visible: masters.TypeOfEndorsement.mValue !== "Non-Financial Endorsement",
          visible: false,
        },
        // { name: "", visible: true }, // premium details card
        { name: "", visible: masters.TypeOfEndorsement.mValue !== "Non-Financial Endorsement" },
      ];
      break;
    case 3:
      steps = [{ name: "", visible: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({
  activeStep,
  dto,
  setDto,
  masters,
  setMasters,
  setBackDropFlag,
  navigate,
}) => {
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;

  let lDto = dto;
  const lMasters = masters;

  // method for converting the date in YYYY-MM-DD json values to DD/MM/YYYY format
  // const formatDate = (inputDate) => {
  //   const date = new Date(inputDate);
  //   // Extracting day, month, and year
  //   const day = date.getDate();
  //   // const month = date.getMonth() + 1; // Month is zero-based, so we add 1 (gives month in 1 digit)
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, add 1, (gives month in two digit)
  //   const year = date.getFullYear();
  //   // Formatting the date components
  //   const formattedDate = `${day}/${month}/${year}`;
  //   return formattedDate;
  // };

  // setting policy request json only
  const searchPolicyByCOINumber = async () => {
    // debugger;
    setBackDropFlag(true);
    delete lDto?.MPResponse;
    setDto({ ...lDto });
    if (masters.PolicyNumber !== "") {
      const policyStage = await CheckPolicyInEndoStage(masters.PolicyNumber);
      console.log("policy stage of the coi number is :", policyStage);
      if (policyStage !== null) {
        if (policyStage.responseMessage === "Searched policy in policy stage") {
          const data = await GetPolicyInfoByPolicyNumber(masters.PolicyNumber);
          // debugger;
          if (data.responseMessage === "Policy has been cancelled") {
            setBackDropFlag(false);
            swal2.fire({
              icon: "error",
              title: "COI has already been cancelled",
            });
          } else {
            if (data?.policyId !== 0) {
              // debugger;
              let onj = {};
              if (data.policy_details[0].policyRequest?.EndorsementDetails) {
                console.log("already endorsed coi number");
                console.log(
                  "policy json after the endorsement ",
                  data.policy_details[0].policyRequest?.EndorsementDetails
                );
                onj = { ...data.policy_details[0].policyRequest.EndorsementDetails };
                // lMasters.existingMemberDetails = [
                //   ...data2.policy_details[0].policyRequest.EndorsementDetails.InsurableItem[0].RiskItems,
                // ];
                lMasters.existingMemberDetails = [
                  ...JSON.parse(
                    JSON.stringify(
                      data.policy_details[0].policyRequest.EndorsementDetails.InsurableItem[0]
                        .RiskItems
                    )
                  ),
                ];
              } else {
                onj = { ...data.policy_details[0].policyRequest };
                // lMasters.existingMemberDetails = [
                //   ...data2.policy_details[0].policyRequest.InsurableItem[0].RiskItems,
                // ];
                lMasters.existingMemberDetails = [
                  ...JSON.parse(
                    JSON.stringify(data.policy_details[0].policyRequest.InsurableItem[0].RiskItems)
                  ),
                ];
              }
              // setting endorsement effective date as empty
              onj.EndorsementEffectiveDate = "";
              lDto = { ...onj };
              // adding RevisedCalculatedPremium node to json
              if (!lDto.PremiumDetails?.EndorsementPremium) {
                lDto.RevisedCalculatedPremium = lDto.PremiumDetails.TotalPremium;
              } else {
                lDto.RevisedCalculatedPremium = lDto.PremiumDetails.EndorsementPremium.TotalPremium;
              }
              // calculating master policy start date time
              // const [Stdate, Sttime] = onj.PartnerDetails.PolicyStartDate.split("T");
              // lMasters.MPStartDate = formatDate(Stdate);
              // lMasters.MPStartTime = Sttime;
              // const [EndDate, Endtime] = onj.PartnerDetails.PolicyEndDate.split("T"); // array destructor
              // lMasters.MPEndDate = formatDate(EndDate);
              // lMasters.MPEndTime = Endtime;
              // getting plans by calling master policy api
              if (onj.PartnerDetails.masterPolicyNo !== "") {
                await GetAssignProductByMasterPolicyNumber(onj.PartnerDetails.masterPolicyNo).then(
                  async (MPRes) => {
                    console.log("master policy result :", MPRes);
                    if (MPRes.finalResult.length > 0) {
                      // reassigning master policy details node as the will be no master policy edtails in coi created by the bulk upload
                      lDto.MasterPolicyDetails = MPRes.finalResult;
                      // storing the master policy response for additional details special coditions
                      lMasters.MasterPolicyResult = { ...MPRes.finalResult[0] };
                      const plansres = await getPlanbyProductId(MPRes.finalResult[0].policyId);
                      lMasters.plans = [...plansres];
                    } else {
                      lMasters.MasterPolicyResult = {};
                      lMasters.plans = [];
                    }
                    setMasters({ ...lMasters });
                    setDto({ ...lDto });
                  }
                );
              }
              // to get the relationship that are configured at plan level
              const Relationship = [];
              // onj.PlanDetails[0].groupDetailsJson.SectionMaster.Relationship.forEach((x) => {
              //   const option = { mValue: x.Relationship };
              //   Relationship.push(option);
              // });
              const relationarr =
                onj.PlanDetails[0].groupDetailsJson.SectionMaster.Relationship.split(",");
              relationarr.forEach((x) => {
                const option = { mValue: x };
                Relationship.push(option);
              });
              lMasters.RelationshipList = [...Relationship];
              const FamilyCombination = [];
              onj.PlanDetails[0].groupDetailsJson.SectionMaster.FamilyCombination.forEach((x) => {
                const option = { mValue: x.FamilyCombination, TotalCount: x.TotalCount };
                FamilyCombination.push(option);
              });
              lMasters.FamilyCombinationList = [...FamilyCombination];
              const members = [];
              const plans = [];
              onj.Benefit.forEach((ben) => {
                plans.push({
                  CoverName: ben.CoverName,
                  SumInsured: ben.BenefitSI,
                  Premium: 0,
                });
              });
              lMasters.PlanRows = [...plans];
              onj.InsurableItem[0].RiskItems.forEach((mem, i1) => {
                if (mem.RelationShipToProposer === "Self") {
                  lMasters.MaimMemberGender = mem.Gender;
                  setMasters({ ...lMasters });
                }
                members.push({
                  index: i1,
                  MemberName: mem.Name,
                  UHIDNo: mem.UHID,
                  Relation: mem.RelationShipToProposer,
                  PlanName: mem.Plan,
                });
              });
              lMasters.membrsRows = [...members];
              lMasters.exsistingMembers = onj.InsurableItem[0].RiskItems.length;
              lMasters.prevFamilyCombination = onj.FamilyCombination;
              // api for getting endorsement type autocomplete options from masters
              const data1 = { productId: 1022, MasterType: "EndorsementType" };
              const res1 = await getProdPartnermasterData(data1.productId, data1.MasterType);
              if (res1.status === 200) {
                lMasters.endorsementTypes = res1.data;
              }
            } else {
              const members = [];
              const plans = [];
              lMasters.PlanRows = [...plans];
              lMasters.membrsRows = [...members];
              lMasters.endorsementTypes = [];
              // lDto.EndorsementDetails = {};
              lDto = {};
              lMasters.existingMemberDetails = [];
              lMasters.exsistingMembers = 0;
              lMasters.prevFamilyCombination = "";
              swal2.fire({
                showCloseButton: true,
                allowOutsideClick: false,
                icon: "error",
                text: `Invalid COI Number`,
              });
            }
            setDto({ ...lDto });
            setMasters({ ...lMasters });
            setBackDropFlag(false);
          }
        } else {
          setBackDropFlag(false);
          swal2.fire({
            icon: "error",
            title: "Cannot do Endorsement on this COI",
            text: "As this COI Endorsement is in NSTP and No action is taken. Please wait till your previous endorsment to be completed.",
          });
        }
      } else {
        setBackDropFlag(false);
        swal2.fire({
          showCloseButton: true,
          allowOutsideClick: false,
          icon: "error",
          text: `Invalid COI Number`,
        });
      }
    } else {
      setBackDropFlag(false);
      swal2.fire({
        showCloseButton: true,
        allowOutsideClick: false,
        icon: "error",
        text: `Please enter COI Number`,
      });
    }
  };

  const handleSearchMP = async () => {
    setBackDropFlag(true);
    if (masters.masterPolicyNo !== "") {
      await GetAssignProductByMasterPolicyNumber(masters.masterPolicyNo).then((partnerId) => {
        // console.log("first response without parse partnerID ", partnerId);
        if (partnerId.finalResult.length > 0) {
          // empty the json if any COI is searchrd
          lDto = {};
          setDto({ ...lDto });
          // const masterPolicyDetailsparse = partnerId.finalResult[0].masterPolicyDetails;
          lDto.MPResponse = { ...partnerId.finalResult[0].masterPolicyDetails };
        } else {
          lDto.MPResponse = {};
        }
        setDto({ ...lDto });
      });
    }
    setBackDropFlag(false);
  };

  const OnEndorsementCategorySelect = (e, a) => {
    if (a !== null) {
      lDto.endoCat = a.mValue;
      lMasters.endorsementCategory = {
        ...masters.endorsementCategoryAll.filter(
          (x) => x.endorsementConfigId === parseInt(a.mID, 10)
        )[0],
      };
    } else {
      lDto.endoCat = "";
      lMasters.endorsementCategory = {
        endorsementConfigName: "",
        riskParameters: [],
      };
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
    // setting the generic info for endorsement through configuration
    const RiskParamArray = masters.endorsementCategory.riskParameters;
    const EnabledPathArray = [];
    RiskParamArray.forEach((x) => {
      if (x.parameterMode === 0) {
        EnabledPathArray.push({ isArray: true, path: x.parameterPath });
      }
    });
    setGenericInfo(dispatch, {
      ...genericInfo,
      Endorsement: true,
      EndorsementControlList: EnabledPathArray,
    });
  };

  const OnEndorsementTypeSelect = (e, a) => {
    // debugger;
    if (a !== null) {
      lDto.endoType = a.mValue;
      lMasters.TypeOfEndorsement = { ...a };
      const options1 = [];
      // lMasters.endorsementCategoryOptions = lMasters.endorsementCategoryAll.filter(
      //   (x) => x.endorsementType === parseInt(a.mID, 10)
      // );
      lMasters.endorsementCategoryAll.forEach((x) => {
        if (x.endorsementType === parseInt(a.mID, 10)) {
          options1.push({ mID: x.endorsementConfigId.toString(), mValue: x.endorsementConfigName });
        }
      });
      lMasters.endorsementCategoryOptions = options1;
      setDto({ ...lDto });
      setMasters({ ...lMasters });
      if (a.mValue !== "Financial Endorsement") {
        // call the OnEndorsementCategorySelect method as endorsement category having only one option so send [0]th item of Masters.endorsementCategoryOptions
        OnEndorsementCategorySelect(e, masters.endorsementCategoryOptions[0]);
      } else {
        // setting endorseemnt category as empty if endorsement type selected as financial endorsement
        lDto.endoCat = "";
        lMasters.endorsementCategory = {
          endorsementConfigName: "",
          riskParameters: [],
        };
      }
    } else {
      // settig endorsement type as empty
      lDto.endoType = "";
      lMasters.TypeOfEndorsement = {
        mValue: "",
        mID: 0,
      };
      // setting endorseemnt category as empty
      lDto.endoCat = "";
      lMasters.endorsementCategory = {
        endorsementConfigName: "",
        riskParameters: [],
      };
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const IsCOINumber = (coiNo) => {
    lDto.PolicyNumber = coiNo;
    setDto({ ...lDto });
    lMasters.PolicyNumber = coiNo;
    setMasters({ ...lMasters });
    const CoiNoRegex = /^INP\d{10}\/\d{4}\/\d{6}-\d{7}\/\d{1}\/\d{1}$/;
    if (CoiNoRegex.test(coiNo)) return "";
    return "Please enter a valid COI No.";
  };

  const IsMPNumber = (MpNo) => {
    lMasters.masterPolicyNo = MpNo;
    // setDto({ ...lDto });
    setMasters({ ...lMasters });
    const CoiNoRegex = /^P\d{10}\/\d{4}\/\d{6}$/;
    if (CoiNoRegex.test(MpNo)) return "";
    return "Please enter a valid Master Policy No.";
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleClearFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };
  const displayFile = (file) => {
    setSelectedFile(file);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const allowedTypes = [
      "application/vnd.ms-excel", // Excel 97-2003
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel 2007 and later
      "text/csv", // CSV
    ];
    if (!allowedTypes.includes(file.type)) {
      swal2.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only .csv, .xls and .xlsx files are allowed.",
      });
    } else {
      displayFile(file);
    }
  };
  const handleFileUpload = async (event) => {
    // console.log("files", event.target.files[0]);
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const allowedTypes = [
      "application/vnd.ms-excel", // Excel 97-2003
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel 2007 and later
      "text/csv", // CSV
    ];
    if (!allowedTypes.includes(file.type)) {
      swal2.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only .csv, .xls and .xlsx files are allowed.",
      });
    } else {
      displayFile(file);
    }
  };

  const handledownloadclick = async () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASEURL}/ExcelUpload/GetTemplateDetails?TemplateId=201`, {
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
          link.download = "Endorsement_Template.xlsx";
          link.click();
        }
      });
  };

  const showMemberAddInfo = () => {
    swal2.fire({
      icon: "info",
      title: "Change Family Combination",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCloseButton: true,
      html: "Please change the family Combination to add a new member.",
    });
  };

  const handleMemAddFamilyCombination = (e, v) => {
    // debugger;
    const memsallowed = parseInt(v.TotalCount, 10);
    if (memsallowed === masters.exsistingMembers) {
      lDto.InsurableItem[0].RiskItems = lDto.InsurableItem[0].RiskItems.slice(
        0,
        masters.exsistingMembers
      );
      lDto.CountOfLives = v.TotalCount;
      lDto.FamilyCombination = v.mValue;
      setDto({ ...lDto });
    } else if (memsallowed < masters.exsistingMembers) {
      swal2.fire({
        icon: "error",
        // iconColor: "red",
        title: "Cannot add a member under this combination",
        text: " Kindly select another family combination",
        confirmButtonColor: "#d32f2f",
        width: "700px",
        heightAuto: true,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        // showCloseButton: true,
      });
    } else {
      console.log("member allowed in the plan are ", memsallowed);
      // Countoflive > 1
      const currentLength = dto.InsurableItem[0].RiskItems.length;
      if (currentLength < memsallowed) {
        // Add elements
        for (let k = currentLength; k < memsallowed; k += 1) {
          lDto.InsurableItem[0].RiskItems = [
            ...dto.InsurableItem[0].RiskItems,
            {
              ...newMember(),
              NomineeDetails: [{ ...NomineeObj() }],
              AdditionalDetails: { ...AdditionalDetailsObj() },
              // questionnarie from the json
              // Questionaire: [
              //   ...JSON.parse(
              //     JSON.stringify(
              //       dto.MasterPolicyDetails[0].masterPolicyDetails.AdditionalDetails.Questionnaire
              //     )
              //   ),
              // ],
              // questionnarie from masters remove masters if removed the get masterpolicy details API as all the master policy details will present in the json only
              Questionaire: masters.MasterPolicyResult.masterPolicyDetails.AdditionalDetails
                ?.Questionnaire
                ? [
                    ...JSON.parse(
                      JSON.stringify(
                        masters.MasterPolicyResult.masterPolicyDetails.AdditionalDetails
                          .Questionnaire
                      )
                    ),
                  ]
                : [],
            },
          ];
          // calculating the max index for the new member
          const maxindex = lDto.InsurableItem[0].RiskItems.length - 1;
          // setting the FamilyID (member id) for the new member as the 1 st member's memberid
          // checking the member is not the first member
          if (maxindex > 0) {
            // setting the family ID as the 1 st member FamilyID ID
            lDto.InsurableItem[0].RiskItems[maxindex].FamilyID =
              dto.InsurableItem[0].RiskItems[0].FamilyID;

            // setting the Plan as the 1 st member FamilyID ID
            lDto.InsurableItem[0].RiskItems[maxindex].Plan = dto.InsurableItem[0].RiskItems[0].Plan;
          }
          setDto({ ...lDto });
        }
      } else if (currentLength > memsallowed) {
        // Remove elements
        lDto.InsurableItem[0].RiskItems = lDto.InsurableItem[0].RiskItems.slice(0, memsallowed);
        setDto({ ...lDto });
      }
      lDto.CountOfLives = v.TotalCount;
      lDto.FamilyCombination = v.mValue;
      setDto({ ...lDto });
    }
  };
  const handleMemDelFamilyCombination = (e, v) => {
    // debugger;
    if (v.TotalCount > masters.exsistingMembers) {
      swal2.fire({
        icon: "error",
        title: "This family combination cannot be selected",
        text: " Kindly select another family combination",
        confirmButtonColor: "#d32f2f",
        width: "700px",
        heightAuto: true,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
        // showCloseButton: true,
      });
    } else {
      if (masters.prevFamilyCombination === v.mValue) {
        lMasters.deleteMemberIndex = [];
      }
      lDto.CountOfLives = v.TotalCount;
      lDto.FamilyCombination = v.mValue;
      setDto({ ...lDto });
    }
  };

  // const onAddMember = async () => {
  //   setBackDropFlag(true);
  //   lDto.InsurableItem[0].RiskItems = [
  //     ...dto.InsurableItem[0].RiskItems,
  //     {
  //       ...newMember(),
  //       NomineeDetails: [{ ...NomineeObj() }],
  //       AdditionalDetails: { ...AdditionalDetailsObj() },
  //       // questionnarie from the json
  //       // Questionaire: [
  //       //   ...JSON.parse(
  //       //     JSON.stringify(
  //       //       dto.MasterPolicyDetails[0].masterPolicyDetails.AdditionalDetails.Questionnaire
  //       //     )
  //       //   ),
  //       // ],
  //       // questionnarie from masters remove masters if removed the get masterpolicy details API as all the master policy details will present in the json only
  //       Questionaire: [
  //         ...JSON.parse(
  //           JSON.stringify(
  //             masters.MasterPolicyResult.masterPolicyDetails.AdditionalDetails.Questionnaire
  //           )
  //         ),
  //       ],
  //     },
  //   ];
  //   // calculating the max index for the new member
  //   const maxindex = lDto.InsurableItem[0].RiskItems.length - 1;
  //   // setting the FamilyID (member id) for the new member as the 1 st member's memberid
  //   // checking the member is not the first member
  //   if (maxindex > 0) {
  //     // setting the family ID as the 1 st member FamilyID ID
  //     lDto.InsurableItem[0].RiskItems[maxindex].FamilyID =
  //       dto.InsurableItem[0].RiskItems[0].FamilyID;

  //     // setting the Plan as the 1 st member FamilyID ID
  //     lDto.InsurableItem[0].RiskItems[maxindex].Plan = dto.InsurableItem[0].RiskItems[0].Plan;

  //     // adding No. of lives same as the 1 st member but No. of lives must be 1 for each member by defaultly(from additon json)
  //     // lDto.InsurableItem[0].RiskItems[maxindex].NoOfLives =
  //     //   dto.InsurableItem[0].RiskItems[0].NoOfLives;

  //     // need to assign the sum insured same as the first member(commented as of now till got clarity on sum insured)
  //     // lDto.InsurableItem[0].RiskItems[maxindex].SumInsured =
  //     //   dto.InsurableItem[0].RiskItems[0].SumInsured;

  //     // adding the CountOfLives by 1 on adding a new member
  //     const NewCOuntOfLives = parseInt(dto.CountOfLives, 10) + 1; // converting CountOfLives to Int as it is storing as a string in Json
  //     lDto.CountOfLives = NewCOuntOfLives.toString(); // converting NewCOuntOfLives from int to string and setting in json
  //   }
  //   setDto({ ...lDto });
  //   setBackDropFlag(false);
  // };

  // const RemoveMember = (i) => {
  //   swal2
  //     .fire({
  //       title: "Are you sure you want to delete this member?",
  //       showCancelButton: true,
  //       confirmButtonColor: "#d32f2f",
  //       cancelButtonColor: "#d32f2f",
  //       width: "700px",
  //       confirmButtonText: "Yes",
  //       cancelButtonText: "No",
  //       showCloseButton: true,
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         // removing the selected memebr with index
  //         const membersArr = lDto.InsurableItem[0].RiskItems.filter((x, i1) => i1 !== i);
  //         lDto.InsurableItem[0].RiskItems = membersArr;

  //         // substrcting the CountOfLives by 1 as a member is removed
  //         const NewCOuntOfLives = parseInt(dto.CountOfLives, 10) - 1; // converting CountOfLives to Int as it is storing as a string in Json
  //         lDto.CountOfLives = NewCOuntOfLives.toString(); // converting NewCOuntOfLives from int to string and setting in json
  //         setDto({ ...lDto });
  //         swal2.fire({
  //           icon: "success",
  //           iconColor: "red",
  //           title: "Member deleted successfully",
  //           confirmButtonColor: "#d32f2f",
  //           width: "700px",
  //           heightAuto: true,
  //           confirmButtonText: "Close",
  //           showCloseButton: true,
  //         });
  //       }
  //     });
  // };

  const ClearMember = (i) => {
    lDto.InsurableItem[0].RiskItems[i] = {
      ...newMember(),
      NomineeDetails: [{ ...NomineeObj() }],
      AdditionalDetails: { ...AdditionalDetailsObj() },
      // questionnarie from the json
      // Questionaire: [
      //   ...JSON.parse(
      //     JSON.stringify(
      //       dto.MasterPolicyDetails[0].masterPolicyDetails.AdditionalDetails.Questionnaire
      //     )
      //   ),
      // ],
      // questionnarie from masters remove masters if removed the get masterpolicy details API as all the master policy details will present in the json only
      Questionaire: masters.MasterPolicyResult.masterPolicyDetails.AdditionalDetails?.Questionnaire
        ? [
            ...JSON.parse(
              JSON.stringify(
                masters.MasterPolicyResult.masterPolicyDetails.AdditionalDetails.Questionnaire
              )
            ),
          ]
        : [],
    };
    lDto.InsurableItem[0].RiskItems[i].FamilyID = dto.InsurableItem[0].RiskItems[0].FamilyID;
    lDto.InsurableItem[0].RiskItems[i].Plan = dto.InsurableItem[0].RiskItems[0].Plan;
    setDto({ ...lDto });
  };

  const handleSelectMembers = (row) => {
    if (masters.prevFamilyCombination !== dto.FamilyCombination) {
      if (row.length > 0) {
        lMasters.deleteMemberIndex = [...row];
        row.forEach((ind) => {
          if (lMasters.membrsRows[ind].Relation === "Self") {
            swal2.fire({
              icon: "error",
              // iconColor: "red",
              title: "Deletion of Self will lead to COI Cancellation",
              text: " Kindly cancel the policy through cancellation endorsement",
              confirmButtonColor: "#d32f2f",
              width: "700px",
              heightAuto: true,
              confirmButtonText: "Ok",
              allowOutsideClick: false,
              // showCloseButton: true,
            });
            lMasters.deleteMemberIndex = lMasters.deleteMemberIndex.filter((i1) => i1 !== ind);
          }
        });
      } else {
        lMasters.deleteMemberIndex = [];
      }
      setMasters({ ...lMasters });
    } else {
      swal2.fire({
        icon: "info",
        title: "Change Family Combination",
        allowOutsideClick: false,
        showConfirmButton: true,
        showCloseButton: true,
        text: "Please change the family Combination to delete the member(s).",
      });
    }
  };

  const handleTypeOfUpload = (e, a) => {
    lMasters.TypeOfUpload = a;
    setMasters({ ...lMasters });
  };

  const onDOBselect = (e, dob, ind) => {
    // console.log("selected date is :", dob, "for member :", ind + 1);
    // if (dto.InsurableItem[0].RiskItems[ind].DOC === "") {
    //   lDto.InsurableItem[0].RiskItems[ind].DateofBirth = [""];
    //   swal2.fire({
    //     icon: "warning",
    //     text: "please select Date of Commencement First to calculate age",
    //   });
    // } else {
    // method accepts the 2 date objects to calculate age so we are converting the json string to the age object while sending
    // to the AgeCalculator1 method
    // debugger;
    if (lDto.InsurableItem[0].RiskItems[ind].DOC !== "") {
      const memberAge = AgeCalculator1(
        new Date(dob),
        new Date(dto.InsurableItem[0].RiskItems[ind].DOC)
      );
      // if (memberAge < 18) {
      if (
        lDto.InsurableItem[0].RiskItems[ind].RelationShipToProposer === "Self" &&
        memberAge < 18
      ) {
        // lDto.InsurableItem[0].RiskItems[ind].DateofBirth = "";
        // lDto.InsurableItem[0].RiskItems[ind].Age = "";
        swal2.fire({
          icon: "error",
          text: `Age of the Policy Holder must be above 18 Years.`,
        });
      } else {
        lDto.InsurableItem[0].RiskItems[ind].DateofBirth = dob;
        lDto.InsurableItem[0].RiskItems[ind].Age = memberAge.toString();
      }
    } else {
      lDto.InsurableItem[0].RiskItems[ind].DateofBirth = dob;
      // covert the age as string and store in json as it is storing like a string in COI
      // lDto.InsurableItem[0].RiskItems[ind].Age = memberAge.toString();
    }
    // }
    setDto({ ...lDto });
  };

  const onDOCselect = (e, doc, ind) => {
    // debugger;
    const DOC = new Date(doc);
    const MPStartDt = dto.MasterPolicyDetails[0].policyStartDate.split("T");
    const MPSdt = new Date(MPStartDt[0]);
    if (DOC < MPSdt) {
      // lDto.InsurableItem[0].RiskItems[ind].DOC = "";
      // lDto.InsurableItem[0].RiskItems[ind].CoverageEndDate = "";
      // debugger;
      if (dto.InsurableItem[0].RiskItems[ind].DOC !== "") {
        lDto.InsurableItem[0].RiskItems[ind].DOC = `${
          [dto.InsurableItem[0].RiskItems[ind].DOC][0]
        }`;
        setDto({ ...lDto });
      } else {
        lDto.InsurableItem[0].RiskItems[ind].DOC = `${[""][0]}`;
        setDto({ ...lDto });
      }
      swal2.fire({
        icon: "error",
        text: `DOC cannot be less than Policy start date`,
      });
    } else {
      const dateParts = doc.split("-");
      // const policyDurationDays = parseInt(dto.PolicyPeriod, 10) * 365;
      // changed this node because policy period node is not there in the coi which is coming from the bulk coi.
      const policyDurationDays =
        parseInt(dto.PlanDetails[0].groupDetailsJson.SectionMaster.CountofPolicyDuration, 10) * 365;
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
      lDto.InsurableItem[0].RiskItems[ind].DOC = doc;
      // checking if DOB is already selected then calculate age based on the changed Date of commencement
      if (lDto.InsurableItem[0].RiskItems[ind].DateofBirth !== "") {
        const memberAge = AgeCalculator1(
          new Date(lDto.InsurableItem[0].RiskItems[ind].DateofBirth),
          new Date(doc)
        );
        // if (memberAge < 18) {
        if (
          lDto.InsurableItem[0].RiskItems[ind].RelationShipToProposer === "Self" &&
          memberAge < 18
        ) {
          swal2.fire({
            icon: "error",
            text: `Age of the Policy Holder must be above 18 Years.`,
          });
        } else {
          // covert the age as string and store in json as it is storing like a string in COI
          lDto.InsurableItem[0].RiskItems[ind].Age = memberAge.toString();
        }
      }
      // setting the DOC
      // setting the coverage end date
      lDto.InsurableItem[0].RiskItems[ind].CoverageEndDate = Ced;
      // setting the Date of Leaving which is same as Coverage end date
      lDto.InsurableItem[0].RiskItems[ind].DOL = Ced;
    }
    setDto({ ...lDto });
  };

  // this method returns true which makes the field disabled for Existing member details while adding new members
  const disableExistingMemberWhileMemberAddition = (i) => {
    if (
      masters.endorsementCategory.endorsementConfigName === "Member Addition" &&
      i < lMasters.exsistingMembers
    ) {
      return true;
    }
    return false;
  };

  const spreadMembersQuestionarie = (i) => {
    const qArray = [];
    // chain operator for checking if the object is there or not
    dto.InsurableItem?.[0]?.RiskItems?.[i]?.Questionaire?.forEach((ques, j) => {
      qArray.push(
        {
          type: "Typography",
          label: `${j + 1}.  ${ques.QText}`,
          // variant: "subtitle2",
          variant: "body2",
          spacing: 10.25,
          visible: true,
          accordionId: i + 2,
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: {
            label: ques.QText,
            labelVisible: false,
          },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.${j}.Answer`,
          spacing: 1.75,
          accordionId: i + 2,
          // disabled: true,
          disabled: disableExistingMemberWhileMemberAddition(i),
        }
      );
    });
    return qArray;
  };

  const OnGenderSelect = (e, a, i) => {
    if (
      dto.InsurableItem?.[0]?.RiskItems?.[i]?.RelationShipToProposer === "Husband" ||
      dto.InsurableItem?.[0]?.RiskItems?.[i]?.RelationShipToProposer === "Wife" ||
      dto.InsurableItem?.[0]?.RiskItems?.[i]?.RelationShipToProposer === "Spouse"
    ) {
      if (a.mValue === masters.MaimMemberGender) {
        swal2
          .fire({
            icon: "info",
            text: "Same gender is selected. Do you want to continue?",
            confirmButtonText: "Yes",
            showCancelButton: true,
            cancelButtonText: "No",
            allowOutsideClick: false,
          })
          .then((res) => {
            if (res.isConfirmed) {
              lDto.InsurableItem[0].RiskItems[i].Gender = a.mValue;
              setDto({ ...lDto });
            } else {
              lDto.InsurableItem[0].RiskItems[i].Gender = "";
              setDto({ ...lDto });
            }
          });
      } else {
        lDto.InsurableItem[0].RiskItems[i].Gender = a.mValue;
      }
    } else {
      lDto.InsurableItem[0].RiskItems[i].Gender = a.mValue;
    }
    setDto({ ...lDto });
  };

  const handlePlanChange = async (e, a) => {
    // debugger;
    // console.log("slected plan is : ", a.mValue);
    // payload for calling getbenefit API
    const Payload = {
      productCode: "MagmaHospiCash01",
      planType: a.mValue,
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
    const benefitsResp = await GetBenefits(Payload);
    // debugger;
    if (benefitsResp.finalResult != null) {
      lDto.Benefit = [...benefitsResp.finalResult.benefits];
      lDto.Plan = a.mValue;
      dto.InsurableItem[0].RiskItems.forEach((x, i) => {
        lDto.InsurableItem[0].RiskItems[i].Plan = a.mValue;
      });
      const request = { productId: 1022, groupId: 105, filterCriteria: "" };
      // updating covers in insurableitem
      const newCovers = [];
      // let newSumInsured = 0;
      benefitsResp.finalResult.benefits.forEach((item) => {
        const obj = {
          CoverName: item.Benefit,
          selected: true,
        };
        newCovers.push(obj);
        // newSumInsured += item.Value;
      });
      lDto.InsurableItem[0].Covers = [...newCovers];
      // lDto.InsurableItem[0].RiskItems[0].SumInsured = newSumInsured;
      const PlanDetails = await GetGroupingDetailsByPlanGrid(a.mValue, request);
      if (PlanDetails.status === 200) {
        lDto.PlanDetails = [...PlanDetails.data];
        // updating Family Combination based on the plan
        const FamilyCombination = [];
        PlanDetails.data[0].groupDetailsJson.SectionMaster.FamilyCombination.forEach((x) => {
          const data = { mValue: x.FamilyCombination, TotalCount: x.TotalCount };
          FamilyCombination.push(data);
        });
        lMasters.FamilyCombinationList = [...FamilyCombination];
        // updating Relationship based on the plan
        const Relationship = [];
        // onj.PlanDetails[0].groupDetailsJson.SectionMaster.Relationship.forEach((x) => {
        //   const option = { mValue: x.Relationship };
        //   Relationship.push(option);
        // });
        const relationarr =
          PlanDetails.data[0].groupDetailsJson.SectionMaster.Relationship.split(",");
        relationarr.forEach((x) => {
          const option = { mValue: x };
          Relationship.push(option);
        });
        lMasters.RelationshipList = [...Relationship];
        //
        lDto.PolicyPeriod =
          PlanDetails.data[0].groupDetailsJson.SectionMaster.CountofPolicyDuration;
        const CountOfPolicyDuration = parseInt(
          PlanDetails.data[0].groupDetailsJson.SectionMaster.CountofPolicyDuration,
          10
        );
        const TypeOfPolicyDuration =
          PlanDetails.data[0].groupDetailsJson.SectionMaster.PolicyDuration;
        if (TypeOfPolicyDuration === "Years") {
          lDto.SetPolicyInput = `${CountOfPolicyDuration}.${0}.${0}`;
        } else if (TypeOfPolicyDuration === "Months") {
          lDto.SetPolicyInput = `${0}.${CountOfPolicyDuration}.${0}`;
        }
      }
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    } else {
      lDto.Benefit = [];
      console.log("No benefits in this plan");
    }
    // lDto.Plan = a.mValue;
    // dto.InsurableItem[0].RiskItems.forEach((x, i) => {
    //   lDto.InsurableItem[0].RiskItems[i].Plan = a.mValue;
    // });
    // setDto({ ...lDto });
  };

  const spreadAddMembersQuestionarie = (i) => {
    const qArray1 = [];
    dto.InsurableItem[0].RiskItems[i]?.Questionaire?.forEach((ques, j) => {
      qArray1.push(
        {
          type: "Typography",
          label: `${j + 1}.  ${ques.QText}`,
          // variant: "subtitle2",
          variant: "body2",
          spacing: 10.25,
          visible: true,
          accordionId: i + 2,
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: {
            label: ques.QText,
            labelVisible: false,
          },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.${j}.Answer`,
          spacing: 1.75,
          accordionId: i + 2,
        }
      );
    });
    return qArray1;
  };

  const spreadMembersQuestionarieSummary = (i) => {
    const qArray = [];
    lDto.InsurableItem[0].RiskItems[i]?.Questionaire?.forEach((ques, j) => {
      qArray.push(
        {
          type: "Typography",
          label: `${j + 1}.  ${ques.QText}`,
          // variant: "subtitle2",
          variant: "body2",
          spacing: 10.25,
          visible: true,
          accordionId: i + 2,
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: {
            label: ques.QText,
            labelVisible: false,
          },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.${j}.Answer`,
          spacing: 1.75,
          accordionId: i + 2,
          disabled: true,
        }
      );
    });
    return qArray;
  };

  const spreadMemberDetails = () => {
    const arr = [];
    // dto.EndorsementDetails.InsurableItem[0].RiskItems.forEach((x, i) => {

    lDto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push([
        {
          type: "Accordions",
          visible: true,
          accordionList: [
            {
              label: `Insured Member ${i + 1}`,
              sx: {
                boxShadow: "unset",
                border: "unset",
                "&:before": { display: "none" },
              },
              id: i + 2,
              visible: true,
            },
          ],
          spacing: 12,
        },
        {
          type: "Input",
          label: "Member ID",
          spacing: 3,
          visible: true,
          required: true,
          accordionId: i + 2,
          disabled: disableExistingMemberWhileMemberAddition(i),
          path: `InsurableItem.0.RiskItems.${i}.FamilyID`,
        },
        {
          type: "Input",
          label: "Member Name",
          spacing: 3,
          visible: true,
          required: true,
          onChangeFuncs: [IsAlphaSpace],
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
          path: `InsurableItem.0.RiskItems.${i}.Name`,
        },
        {
          type: "AutoComplete",
          label: "Relationship",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.RelationShipToProposer`,
          options: masters.RelationshipList,
          disableOnReset: true,
          spacing: 3,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "AutoComplete",
          label: "Gender",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.Gender`,
          options: masters.Gender,
          disableOnReset: true,
          customOnChange: (e, a) => OnGenderSelect(e, a, i),
          spacing: 3,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Joining",
          required: true,
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.DOJ`,
          maxDate: dto.InsurableItem[0].RiskItems[i]?.DOC,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          spacing: 3,
          disabled: disableExistingMemberWhileMemberAddition(i),
          // disabled: masters.TypeOfEndorsement.mValue !== "Non-Financial Endorsement",
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Commemncement",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.DOC`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          minDate: dto.InsurableItem[0].RiskItems[i].DOJ,
          disabled: disableExistingMemberWhileMemberAddition(i),
          customOnChange: (e, d) => onDOCselect(e, d, i),
          spacing: 3,
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Birth",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.DateofBirth`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          maxDate: new Date(),
          disabled: disableExistingMemberWhileMemberAddition(i),
          customOnChange: (e, d) => onDOBselect(e, d, i),
          spacing: 3,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Age",
          required: true,
          visible: true,
          spacing: 3,
          onChangeFuncs: [IsNumeric],
          path: `InsurableItem.0.RiskItems.${i}.Age`,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Leaving",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.DOL`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          spacing: 3,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Coverage End Date",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.CoverageEndDate`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          spacing: 3,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Marriage",
          // visible: true,
          visible:
            (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Wife" ||
              dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Husband" ||
              dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Spouse") &&
            i >= masters.exsistingMembers,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.DOM`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          minDate: dto.InsurableItem[0].RiskItems[i]?.DateofBirth,
          maxDate: new Date(),
          disabled: disableExistingMemberWhileMemberAddition(i),
          spacing: 3,
          accordionId: i + 2,
        },
        // removed the field as Richa said it is not required
        // {
        //   type: "MDDatePicker",
        //   label: "Date of Document Recieved",
        //   // visible: true,
        //   visible:
        //     (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Wife" ||
        //       dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Husband" ||
        //       dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Spouse") &&
        //     i >= masters.exsistingMembers,
        //   required: true,
        //   path: `InsurableItem.0.RiskItems.${i}.DOD`,
        //   altFormat: "d/m/Y",
        //   dateFormat: "Y-m-d",
        //   disabled: disableExistingMemberWhileMemberAddition(i),
        //   spacing: 3,
        //   accordionId: i + 2,
        // },
        {
          type: "Input",
          label: "Elite Status",
          visible: true,
          spacing: 3,
          onChangeFuncs: [IsAlpha],
          path: `InsurableItem.0.RiskItems.${i}.ElliteStatus`,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Location",
          visible: true,
          onChangeFuncs: [IsAlphaNum],
          path: `InsurableItem.0.RiskItems.${i}.Location`,
          spacing: 3,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Grade",
          visible: true,
          spacing: 3,
          onChangeFuncs: [IsAlphaNum],
          path: `InsurableItem.0.RiskItems.${i}.Grade`,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Designation",
          visible: true,
          onChangeFuncs: [IsAlphaNum],
          path: `InsurableItem.0.RiskItems.${i}.Designation`,
          spacing: 3,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Mobile No.",
          visible: true,
          required: true,
          // checking the Email ID is valid (if e mail ID is valid then mobile No. is not required)
          // required:
          //   dto.InsurableItem[0].RiskItems[i].EmailID === "" ||
          //   IsEmail(dto.InsurableItem[0].RiskItems[i].EmailID) === "Not a valid Email",
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.MobileNumber`,
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Email ID",
          visible: true,
          required: true,
          // checking the mobile No. is valid (if e Mobile No. is valid then Email ID is not required)
          // required:
          //   dto.InsurableItem[0].RiskItems[i]?.MobileNumber === "" ||
          //   IsMobileNumber(dto.InsurableItem[0].RiskItems[i]?.MobileNumber) ===
          //     "Invalid Mobile Number",
          path: `InsurableItem.0.RiskItems.${i}.EmailID`,
          spacing: 3,
          onBlurFuncs: [IsEmail],
          disabled: disableExistingMemberWhileMemberAddition(i),
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "No. of Lives",
          visible: true,
          required: true,
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.NoOfLives`,
          disabled: disableExistingMemberWhileMemberAddition(i),
          onChangeFuncs: [IsNumeric],
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Remarks",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.Remarks`,
          spacing: 6,
          disabled: disableExistingMemberWhileMemberAddition(i),
          onChangeFuncs: [IsAlphaNum],
          accordionId: i + 2,
        },
        {
          type: "Typography",
          label: "Questionnaire",
          spacing: 12,
          visible: true,
          accordionId: i + 2,
        },
        ...spreadMembersQuestionarie(i),
        // Nominee Details
        {
          type: "Typography",
          label: "Nominee Details",
          spacing: 12,
          visible: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Nominee Name",
          visible: true,
          required: true,
          onChangeFuncs: [IsAlphaSpace],
          path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeName`,
          disabled: disableExistingMemberWhileMemberAddition(i),
          spacing: 3,
          accordionId: i + 2,
        },
        {
          type: "AutoComplete",
          label: "Nominee Relationship ",
          visible: true,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeRelationWithProposer`,
          disabled: disableExistingMemberWhileMemberAddition(i),
          options: masters.NomineeRelationship,
          disableOnReset: true,
          spacing: 3,
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Nominee DOB",
          visible: true,
          required: true,
          maxDate: new Date(),
          path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeDOB`,
          disabled: disableExistingMemberWhileMemberAddition(i),
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          spacing: 3,
          accordionId: i + 2,
        },
        {
          type: "Typography",
          label: "Other Details",
          spacing: 12,
          visible: true,
          accordionId: i + 2,
        },
        // to show the value as ₹ 0,00,000
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Loan EMI Amount",
          // visible: true,
          visible: dto?.Benefit.filter((ben) => ben?.CoverName === "EMI Benefit").length > 0,
          required: true,
          // enableAtEndorsement: true,
          disabled: disableExistingMemberWhileMemberAddition(i),
          path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.LoanEMIAmount`,
          spacing: 3,
          onChangeFuncs: [IsNumeric],
          accordionId: i + 2,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Personal Accident SumInsured",
          // visible: true,
          visible: dto?.Benefit.filter((ben) => ben?.CoverName === "Personal Accident").length > 0,
          required: true,
          // enableAtEndorsement: true,
          disabled: disableExistingMemberWhileMemberAddition(i),
          path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.PersonalAccidentSumInsured`,
          spacing: 3,
          onChangeFuncs: [IsNumeric],
          accordionId: i + 2,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Critical Illness SumInsured",
          // visible: true,
          visible: dto?.Benefit.filter((ben) => ben?.CoverName === "Critical Illness").length > 0,
          required: true,
          // enableAtEndorsement: true,
          disabled: disableExistingMemberWhileMemberAddition(i),
          path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.CriticalIllnessSumInsured`,
          spacing: 3,
          onChangeFuncs: [IsNumeric],
          accordionId: i + 2,
        },
        // normal text fields to show the amount as 000000
        // {
        //   type: "Input",
        //   label: "Loan EMI Amount",
        //   visible: true,
        //   required: true,
        //   disabled: disableExistingMemberWhileMemberAddition(i),
        //   path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.LoanEMIAmount`,
        //   spacing: 3,
        //   accordionId: i + 2,
        // },
        {
          type: "Input",
          label: "Special Terms",
          visible: true,
          disabled: disableExistingMemberWhileMemberAddition(i),
          path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.SpecialTerms`,
          spacing: 6,
          accordionId: i + 2,
        },
      ]);
    });
    return arr;
  };

  const spreadNewMemberDetails = () => {
    const arr = [];
    // dto.EndorsementDetails.InsurableItem[0].RiskItems.forEach((x, i) => {

    lDto.InsurableItem[0].RiskItems.forEach((x, i) => {
      // condition for not to map(show) old members
      if (i >= lMasters.exsistingMembers) {
        arr.push(
          {
            type: "Accordions",
            visible: true,
            accordionList: [
              {
                label: `Insured Member ${i + 1}`,
                sx: {
                  boxShadow: "unset",
                  border: "unset",
                  "&:before": { display: "none" },
                },
                id: i + 2,
                visible: true,
              },
            ],
            spacing: 12,
          },
          // {
          //   type: "Button",
          //   label: "Remove",
          //   spacing: 12,
          //   justifyContent: "end",
          //   // visible: activeStep === 1,
          //   visible: true,
          //   accordionId: i + 2,
          //   onClick: () => RemoveMember(i),
          // },
          {
            type: "Button",
            label: "Clear",
            spacing: 12,
            justifyContent: "end",
            // visible: activeStep === 1,
            visible: true,
            accordionId: i + 2,
            onClick: () => ClearMember(i),
          },
          {
            type: "Input",
            label: "Member ID",
            required: true,
            spacing: 3,
            visible: true,
            // disabled: true,
            accordionId: i + 2,
            path: `InsurableItem.0.RiskItems.${i}.FamilyID`,
          },
          {
            type: "Input",
            label: "Member Name",
            required: true,
            spacing: 3,
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
            accordionId: i + 2,
            path: `InsurableItem.0.RiskItems.${i}.Name`,
          },
          {
            type: "MDDatePicker",
            label: "Date of Joining",
            required: true,
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.DOJ`,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            maxDate: dto.InsurableItem[0].RiskItems[i]?.DOC,
            spacing: 3,
            accordionId: i + 2,
          },
          {
            type: "AutoComplete",
            label: "Relationship",
            required: true,
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.RelationShipToProposer`,
            options: masters.RelationshipList,
            disableOnReset: true,
            spacing: 3,
            accordionId: i + 2,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            required: true,
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.Gender`,
            options: masters.Gender,
            customOnChange: (e, a) => OnGenderSelect(e, a, i),
            disableOnReset: true,
            spacing: 3,
            accordionId: i + 2,
          },
          {
            type: "MDDatePicker",
            label: "Date of Commemncement",
            required: true,
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.DOC`,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            minDate: dto.InsurableItem[0].RiskItems[i].DOJ,
            customOnChange: (e, d) => onDOCselect(e, d, i),
            spacing: 3,
            accordionId: i + 2,
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            required: true,
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.DateofBirth`,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            maxDate: new Date(),
            customOnChange: (e, d) => onDOBselect(e, d, i),
            spacing: 3,
            accordionId: i + 2,
          },
          {
            type: "Input",
            label: "Age",
            required: true,
            visible: true,
            spacing: 3,
            onChangeFuncs: [IsNumeric],
            path: `InsurableItem.0.RiskItems.${i}.Age`,
            // disabled: true,
            accordionId: i + 2,
          },
          {
            type: "MDDatePicker",
            label: "Date of Leaving",
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.DOL`,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            spacing: 3,
            // disabled: true,
            accordionId: i + 2,
          },
          {
            type: "MDDatePicker",
            label: "Coverage End Date",
            required: true,
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.CoverageEndDate`,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            spacing: 3,
            // disabled: true,
            accordionId: i + 2,
          },
          {
            type: "MDDatePicker",
            label: "Date of Marriage",
            // visible: true,
            visible:
              (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Wife" ||
                dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Husband" ||
                dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Spouse") &&
              i >= masters.exsistingMembers,
            required: true,
            path: `InsurableItem.0.RiskItems.${i}.DOM`,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            minDate: dto.InsurableItem[0].RiskItems[i]?.DateofBirth,
            maxDate: new Date(),
            spacing: 3,
            accordionId: i + 2,
          },
          // {
          //   type: "MDDatePicker",
          //   label: "Date of Document Recieved",
          //   // visible: true,
          //   visible:
          //     (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Wife" ||
          //       dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Husband" ||
          //       dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Spouse") &&
          //     i >= masters.exsistingMembers,
          //   required: true,
          //   path: `InsurableItem.0.RiskItems.${i}.DOD`,
          //   altFormat: "d/m/Y",
          //   dateFormat: "Y-m-d",
          //   spacing: 3,
          //   accordionId: i + 2,
          // },
          {
            type: "Input",
            label: "Elite Status",
            visible: true,
            spacing: 3,
            path: `InsurableItem.0.RiskItems.${i}.ElliteStatus`,
            onChangeFuncs: [IsAlpha],
            // onChangeFuncs: [IsAlphaSpace],
            // disabled: true,
            accordionId: i + 2,
          },
          {
            type: "Input",
            label: "Location",
            onChangeFuncs: [IsAlphaNum],
            // onChangeFuncs: [IsAlphaSpace],
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.Location`,
            spacing: 3,
            // disabled: true,
            accordionId: i + 2,
          },
          {
            type: "Input",
            label: "Grade",
            visible: true,
            spacing: 3,
            onChangeFuncs: [IsAlphaNum],
            path: `InsurableItem.0.RiskItems.${i}.Grade`,
            // disabled: true,
            accordionId: i + 2,
          },
          {
            type: "Input",
            label: "Designation",
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.Designation`,
            spacing: 3,
            onChangeFuncs: [IsAlphaNum],
            // disabled: true,
            accordionId: i + 2,
          },
          {
            type: "Input",
            label: "Mobile No.",
            required: true,
            // checking the Email ID is valid (if e mail ID is valid then mobile No. is not required)
            // required:
            //   dto.InsurableItem[0].RiskItems[i].EmailID === "" ||
            //   IsEmail(dto.InsurableItem[0].RiskItems[i].EmailID) === "Not a valid Email",
            visible: true,
            spacing: 3,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
            path: `InsurableItem.0.RiskItems.${i}.MobileNumber`,
            accordionId: i + 2,
          },
          {
            type: "Input",
            label: "Email ID",
            required: true,
            // checking the mobile No. is valid (if e Mobile No. is valid then Email ID is not required)
            // required:
            //   dto.InsurableItem[0].RiskItems[i]?.MobileNumber === "" ||
            //   IsMobileNumber(dto.InsurableItem[0].RiskItems[i]?.MobileNumber) ===
            //     "Invalid Mobile Number",
            visible: true,
            onBlurFuncs: [IsEmail],
            path: `InsurableItem.0.RiskItems.${i}.EmailID`,
            spacing: 3,
            accordionId: i + 2,
          },
          {
            type: "Input",
            label: "No. of Lives",
            required: true,
            visible: true,
            spacing: 3,
            path: `InsurableItem.0.RiskItems.${i}.NoOfLives`,
            onChangeFuncs: [IsNumeric],
            // disabled: true,
            accordionId: i + 2,
          },
          {
            type: "Input",
            label: "Remarks",
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.Remarks`,
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
            // disabled: true,
            accordionId: i + 2,
          },
          // static Questionnaire
          {
            type: "Typography",
            label: "Questionnaire",
            spacing: 12,
            visible: true,
            accordionId: i + 2,
          },
          ...spreadAddMembersQuestionarie(i),
          // Nominee Details
          {
            type: "Typography",
            label: "Nominee Details",
            spacing: 12,
            visible: true,
            accordionId: i + 2,
          },
          {
            type: "Input",
            label: "Nominee Name",
            required: true,
            onChangeFuncs: [IsAlphaSpace],
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeName`,
            spacing: 3,
            accordionId: i + 2,
          },
          {
            type: "AutoComplete",
            label: "Nominee Relationship ",
            required: true,
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeRelationWithProposer`,
            options: masters.NomineeRelationship,
            disableOnReset: true,
            spacing: 3,
            accordionId: i + 2,
          },
          {
            type: "MDDatePicker",
            label: "Nominee DOB",
            required: true,
            visible: true,
            maxDate: new Date(),
            path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeDOB`,
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            spacing: 3,
            accordionId: i + 2,
          },
          {
            type: "Typography",
            label: "Other Details",
            spacing: 12,
            visible: true,
            accordionId: i + 2,
          },
          {
            // type: "CurrencyInput",
            type: "Input",
            label: "Loan EMI Amount",
            required: true,
            // visible: true,
            visible: dto?.Benefit.filter((ben) => ben?.CoverName === "EMI Benefit").length > 0,
            path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.LoanEMIAmount`,
            spacing: 3,
            accordionId: i + 2,
            onChangeFuncs: [IsNumeric],
          },
          {
            // type: "CurrencyInput",
            type: "Input",
            label: "Personal Accident SumInsured",
            required: true,
            // visible: true,
            visible:
              dto?.Benefit.filter((ben) => ben?.CoverName === "Personal Accident").length > 0,
            path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.PersonalAccidentSumInsured`,
            spacing: 3,
            accordionId: i + 2,
            onChangeFuncs: [IsNumeric],
          },
          {
            // type: "CurrencyInput",
            type: "Input",
            label: "Critical Illness SumInsured",
            required: true,
            // visible: true,
            visible: dto?.Benefit.filter((ben) => ben?.CoverName === "Critical Illness").length > 0,
            path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.CriticalIllnessSumInsured`,
            spacing: 3,
            accordionId: i + 2,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Special Terms",
            visible: true,
            path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.SpecialTerms`,
            spacing: 6,
            // disabled: true,
            accordionId: i + 2,
            onChangeFuncs: [IsAlphaNum],
          }
          // {
          //   type: "Typography",
          //   label: "Special Conditions",
          //   spacing: 12,
          //   visible: true,
          //   accordionId: i + 2,
          // },
          // {
          //   type: "Input",
          //   label: "Special Condition 01",
          //   visible: true,
          //   path: `InsurableItem.0.RiskItems.${i}.SpecialCondition.0.SpecialCondition`,
          //   spacing: 6,
          //   // disabled: true,
          //   accordionId: i + 2,
          // },
        );
      }
    });
    return arr;
  };

  const spreadMemberDetailsSummary = () => {
    const arr = [];

    lDto.InsurableItem[0].RiskItems.forEach((x, i) => {
      arr.push([
        {
          type: "Accordions",
          visible: true,
          accordionList: [
            {
              label: `Insured Member ${i + 1}`,
              sx: {
                boxShadow: "unset",
                border: "unset",
                "&:before": { display: "none" },
              },
              id: i + 2,
              visible: true,
            },
          ],
          spacing: 12,
        },
        {
          type: "Input",
          label: "Member ID",
          spacing: 3,
          visible: true,
          disabled: true,
          accordionId: i + 2,
          path: `InsurableItem.0.RiskItems.${i}.FamilyID`,
        },
        {
          type: "Input",
          label: "Member Name",
          spacing: 3,
          visible: true,
          disabled: true,
          accordionId: i + 2,
          path: `InsurableItem.0.RiskItems.${i}.Name`,
        },
        {
          type: "AutoComplete",
          label: "Relationship ",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.RelationShipToProposer`,
          options: masters.RelationshipList,
          disableOnReset: true,
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "AutoComplete",
          label: "Gender",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.Gender`,
          options: masters.Gender,
          disableOnReset: true,
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Joining",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.DOJ`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Commemncement",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.DOC`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          // minDate: dto.InsurableItem[0].RiskItems[i].DOJ,
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Birth",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.DateofBirth`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Age",
          visible: true,
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.Age`,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Leaving",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.DOL`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Coverage End Date",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.CoverageEndDate`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Date of Marriage",
          disabled: true,
          // visible: true,
          visible:
            (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Wife" ||
              dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Husband" ||
              dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Spouse") &&
            i >= masters.exsistingMembers,
          required: true,
          path: `InsurableItem.0.RiskItems.${i}.DOM`,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          minDate: dto.InsurableItem[0].RiskItems[i]?.DateofBirth,
          maxDate: new Date(),
          spacing: 3,
          accordionId: i + 2,
        },
        // {
        //   type: "MDDatePicker",
        //   label: "Date of Document Recieved",
        //   // visible: true,
        //   visible:
        //     (dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Wife" ||
        //       dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Husband" ||
        //       dto.InsurableItem[0].RiskItems[i].RelationShipToProposer === "Spouse") &&
        //     i >= masters.exsistingMembers,
        //   required: true,
        //   path: `InsurableItem.0.RiskItems.${i}.DOD`,
        //   altFormat: "d/m/Y",
        //   dateFormat: "Y-m-d",
        //   spacing: 3,
        //   accordionId: i + 2,
        // },
        {
          type: "Input",
          label: "Elite Status",
          visible: true,
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.ElliteStatus`,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Location",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.Location`,
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Grade",
          visible: true,
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.Grade`,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Designation",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.Designation`,
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Mobile No.",
          visible: true,
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.MobileNumber`,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Email ID",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.EmailID`,
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "No. of Lives",
          visible: true,
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.NoOfLives`,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Remarks",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.Remarks`,
          spacing: 6,
          disabled: true,
          accordionId: i + 2,
        },
        // static Questionnaire
        {
          type: "Typography",
          label: "Questionnaire",
          spacing: 12,
          visible: true,
          accordionId: i + 2,
        },
        ...spreadMembersQuestionarieSummary(i),
        // Nominee Details
        {
          type: "Typography",
          label: "Nominee Details",
          spacing: 12,
          visible: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Nominee Name",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeName`,
          disabled: true,
          spacing: 3,
          accordionId: i + 2,
        },
        {
          type: "AutoComplete",
          label: "Nominee Relationship ",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeRelationWithProposer`,
          disabled: true,
          options: masters.NomineeRelationship,
          disableOnReset: true,
          spacing: 3,
          accordionId: i + 2,
        },
        {
          type: "MDDatePicker",
          label: "Nominee DOB",
          visible: true,
          maxDate: new Date(),
          path: `InsurableItem.0.RiskItems.${i}.NomineeDetails.0.NomineeDOB`,
          disabled: true,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          spacing: 3,
          accordionId: i + 2,
        },
        {
          type: "Typography",
          label: "Other Details",
          spacing: 12,
          visible: true,
          accordionId: i + 2,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Loan EMI Amount",
          // visible: true,
          visible: dto?.Benefit.filter((ben) => ben?.CoverName === "EMI Benefit").length > 0,
          path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.LoanEMIAmount`,
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Personal Accident SumInsured",
          // visible: true,
          visible: dto?.Benefit.filter((ben) => ben?.CoverName === "Personal Accident").length > 0,
          path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.PersonalAccidentSumInsured`,
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Critical Illness SumInsured",
          // visible: true,
          visible: dto?.Benefit.filter((ben) => ben?.CoverName === "Critical Illness").length > 0,
          path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.CriticalIllnessSumInsured`,
          spacing: 3,
          disabled: true,
          accordionId: i + 2,
        },
        {
          type: "Input",
          label: "Special Terms",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.AdditionalDetails.SpecialTerms`,
          spacing: 6,
          disabled: true,
          accordionId: i + 2,
        },
        // {
        //   type: "Typography",
        //   label: "Special Conditions",
        //   spacing: 12,
        //   visible: true,
        //   accordionId: i + 2,
        // },
        // {
        //   type: "Input",
        //   label: "Special Condition 01",
        //   visible: true,
        //   path: `InsurableItem.0.RiskItems.${i}.SpecialCondition.0.SpecialCondition`,
        //   spacing: 6,
        //   disabled: true,
        //   accordionId: i + 2,
        // },
      ]);
    });
    return arr;
  };

  const showExistingMembersDetails = () => {
    const arr = [];
    masters.existingMemberDetails.forEach((x) => {
      arr.push(
        // non financial endorsement
        {
          type: "Typography",
          label: x.Name,
          spacing: 12,
          variant: "h6",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          splitId: 1,
        },
        {
          type: "Input",
          label: "Member Name",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 1,
          value: x.Name,
        },
        {
          type: "Input",
          label: "Gender",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 1,
          value: x.Gender,
        },
        {
          type: "Input",
          label: "Relationship",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 1,
          value: x.RelationShipToProposer,
        },
        {
          type: "Input",
          label: "Email ID",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 1,
          value: x.EmailID,
        },
        {
          type: "Input",
          label: "Mobile No.",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 1,
          value: x.MobileNumber,
        },
        {
          type: "MDDatePicker",
          label: "Date of Joining",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          splitId: 1,
          value: x.DOJ,
        },
        {
          type: "Input",
          label: "Nominee Name",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 1,
          value: x.NomineeDetails[0].NomineeName,
        },
        {
          type: "MDDatePicker",
          label: "Nominee DOB",
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          maxDate: new Date(),
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 1,
          value: x.NomineeDetails[0].NomineeDOB,
        },
        {
          type: "Input",
          label: "Nominee Relationship",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 1,
          value: x.NomineeDetails[0].NomineeRelationWithProposer,
        },
        // financial endorsement && other modifications
        {
          type: "Typography",
          label: x.Name,
          spacing: 12,
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change"),
          splitId: 1,
        },
        {
          type: "Input",
          label: "Plan",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change"),
          disabled: true,
          splitId: 1,
          value: x.Plan,
        },
        {
          type: "MDDatePicker",
          label: "Date of Birth",
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change"),
          disabled: true,
          splitId: 1,
          value: x.DateofBirth,
        },
        {
          type: "MDDatePicker",
          label: "Date of Commencement",
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change"),
          disabled: true,
          splitId: 1,
          value: x.DOC,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Personal Accident SI",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change") &&
            dto?.Benefit.filter((ben) => ben?.CoverName === "Personal Accident").length > 0,
          disabled: true,
          splitId: 1,
          value: x.AdditionalDetails.PersonalAccidentSumInsured,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Critical Illness SI",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change") &&
            dto?.Benefit.filter((ben) => ben?.CoverName === "Critical Illness").length > 0,
          disabled: true,
          splitId: 1,
          value: x.AdditionalDetails.CriticalIllnessSumInsured,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Loan EMI Amount",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change") &&
            dto?.Benefit.filter((ben) => ben?.CoverName === "EMI Benefit").length > 0,
          disabled: true,
          splitId: 1,
          value: x.AdditionalDetails.LoanEMIAmount,
        }
      );
    });
    return arr;
  };

  const showNewMembersDetails = () => {
    const arr = [];
    dto.InsurableItem[0].RiskItems.forEach((x) => {
      // non financial endorsement
      arr.push(
        {
          type: "Typography",
          label: x.Name,
          spacing: 12,
          variant: "h6",
          // visible:true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          splitId: 2,
        },
        {
          type: "Input",
          label: "Member Name",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 2,
          value: x.Name,
        },
        {
          type: "Input",
          label: "Gender",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 2,
          value: x.Gender,
        },
        {
          type: "Input",
          label: "Relationship",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 2,
          value: x.RelationShipToProposer,
        },
        {
          type: "Input",
          label: "Email ID",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 2,
          value: x.EmailID,
        },
        {
          type: "Input",
          label: "Mobile No.",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 2,
          value: x.MobileNumber,
        },
        {
          type: "MDDatePicker",
          label: "Date of Joining",
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 2,
          value: x.DOJ,
        },
        {
          type: "Input",
          label: "Nominee Name",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 2,
          value: x.NomineeDetails[0].NomineeName,
        },
        {
          type: "MDDatePicker",
          label: "Nominee DOB",
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          maxDate: new Date(),
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 2,
          value: x.NomineeDetails[0].NomineeDOB,
        },
        {
          type: "Input",
          label: "Nominee Relationship",
          // visible: true,
          visible: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
          disabled: true,
          splitId: 2,
          value: x.NomineeDetails[0].NomineeRelationWithProposer,
        },
        // financial endorsement && other modifications
        {
          type: "Typography",
          label: x.Name,
          spacing: 12,
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change"),
          splitId: 2,
        },
        {
          type: "Input",
          label: "Plan",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change"),
          disabled: true,
          splitId: 2,
          value: x.Plan,
        },
        {
          type: "MDDatePicker",
          label: "Date of Birth",
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change"),
          disabled: true,
          splitId: 2,
          value: x.DateofBirth,
        },
        {
          type: "MDDatePicker",
          label: "Date of Commencement",
          altFormat: "d/m/Y",
          dateFormat: "Y-m-d",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change"),
          disabled: true,
          splitId: 2,
          value: x.DOC,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Personal Accident SI",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change") &&
            dto?.Benefit.filter((ben) => ben?.CoverName === "Personal Accident").length > 0,
          disabled: true,
          splitId: 2,
          value: x.AdditionalDetails.PersonalAccidentSumInsured,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Critical Illness SI",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change") &&
            dto?.Benefit.filter((ben) => ben?.CoverName === "Critical Illness").length > 0,
          disabled: true,
          splitId: 2,
          value: x.AdditionalDetails.CriticalIllnessSumInsured,
        },
        {
          // type: "CurrencyInput",
          type: "Input",
          label: "Loan EMI Amount",
          // visible: true,
          visible:
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            // masters.endorsementCategory.endorsementConfigName === "Other Modifications",
            (masters.endorsementCategory.endorsementConfigName === "SI and Plan Change" ||
              masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change") &&
            dto?.Benefit.filter((ben) => ben?.CoverName === "EMI Benefit").length > 0,
          disabled: true,
          splitId: 2,
          value: x.AdditionalDetails.LoanEMIAmount,
        }
      );
    });
    return arr;
  };

  const UploadDocument = async () => {
    setBackDropFlag(true);
    const formData = new FormData();
    formData.append("Files", selectedFile);
    formData.append("TemplateId", "201");
    const UploadRes = await UploadExcel(formData);
    setBackDropFlag(false);
    if (UploadRes?.status === 200) {
      swal2
        .fire({
          icon: "success",
          iconColor: "red",
          html: `<div style="text-align: center; ">
                      <div><h3>Document Uploaded successfully</h3></div>
                      <br/>
                      <div><h3>Document ID : ${UploadRes.data.documentUploadId}</h3></div>
                      <br/>
                      <div><h6>Save the Document ID for further reference</h6></div>
                  </div>`,
          confirmButtonText: "View Endorsement",
          showConfirmButton: true,
          confirmButtonColor: "red",
          showDenyButton: true,
          denyButtonText: "View Upload Status",
          denyButtonColor: "red",
          allowOutsideClick: false,
          // width: 700,
        })
        .then((res) => {
          if (res.isConfirmed) {
            // console.log("navigate to endorsement list page");
            navigate("/EndorsementList");
          }
          if (res.isDenied) {
            // navigate to Upload Status page
            // console.log("navigate to Upload Status page");
            navigate("/UploadStatusMagma");
          }
        });
    } else {
      swal2.fire({
        icon: "error",
        text: UploadRes.response.data.responseMessage,
      });
    }
  };

  let data = [];

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Typography",
            label: "Please select the type of COI Endorsement",
            visible: true,
            spacing: 5,
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: {
              label: "Please Select the Type of COI Endorsement",
              labelVisible: false,
            },
            radioList: [
              { value: "BulkUpload", label: "Bulk Upload" },
              { value: "Individual", label: "Individual" },
            ],
            customOnChange: (e, a) => handleTypeOfUpload(e, a),
            // path: "TypeOfUpload",
            value: masters.TypeOfUpload,
            spacing: 4,
            // required: true,
          },
          // radio group label comming as a plain text without gap
          // {
          //   type: "RadioGroup",
          //   visible: true,
          //   radioLabel: {
          //     label: "Please Select the Type of COI Endorsement",
          //     labelVisible: true,
          //   },
          //   radioList: [
          //     { value: "BulkUpload", label: "Bulk Upload" },
          //     { value: "Individual", label: "Individual" },
          //   ],
          //   path: "TypeOfUpload",
          //   spacing: 12,
          //   // required: true,
          // },
        ],
        [
          {
            type: "Input",
            label: "Master Policy (MP) No.",
            visible: true,
            validationId: 1,
            required: true,
            InputProps: { maxLength: 23 },
            // path: `masterPolicyNo`,
            value: masters.masterPolicyNo,
            onChangeFuncs: [IsMPNumber],
          },
          {
            type: "Input",
            label: "Master Policy Holder Name",
            visible: true,
            path: `MPHolderName`,
          },
          // button with vlidation in generic v2
          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 1,
            label: "Search MP",
            visible: true,
            // disabled: true,
            variant: "contained",
            component: "label",
            onClick: handleSearchMP,
            spacing: 6,
          },
          {
            type: "Typography",
            label: "Master Policy (MP) Details",
            spacing: 12,
            visible: Object.keys(lDto?.MPResponse ? lDto.MPResponse : {}).length !== 0,
          },
          {
            type: "Custom",
            visible: Object.keys(lDto?.MPResponse ? lDto.MPResponse : {}).length !== 0,
            spacing: 12,
            return: (
              <MDBox>
                <Card
                  sx={{
                    background: "#f0f2f5",
                    borderRadius: "0.25rem",
                    // marginLeft: "2px",
                  }}
                >
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        Master Policy No. :{" "}
                        <b>{objectPath.get(dto, "MPResponse.MasterPolicyNo")}</b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        Master Policy Start Date :{" "}
                        <b>{objectPath.get(dto, "MPResponse.PolicyStartDate")}</b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        Master Policy Start Time :{" "}
                        <b>{objectPath.get(dto, "MPResponse.PolicyStartTime")}</b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        Master Policy End Date :{" "}
                        <b>{objectPath.get(dto, "MPResponse.PolicyEndDate")}</b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        Master Policy End Time :{" "}
                        <b>{objectPath.get(dto, "MPResponse.PolicyEndTime")}</b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        MPH Name: <b>{objectPath.get(dto, "MPResponse.MasterPolicyHolderName")}</b>
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            ),
          },
          {
            type: "Custom",
            // visible: dto.TypeOfCOI === "Bulk Upload",
            visible: Object.keys(lDto?.MPResponse ? lDto.MPResponse : {}).length !== 0,
            spacing: 12,
            return: (
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "auto",
                  height: "300px",
                  p: 2,
                  border: "1px dashed grey",
                }}
              >
                <Stack spacing={2} justifyContent="center">
                  {!selectedFile && (
                    <>
                      <Typography
                        variant="h5"
                        color="error"
                        component="span"
                        align="center"
                        gutterBottom
                      >
                        <CloudDoneOutlinedIcon fontSize="large" />
                      </Typography>

                      <Typography variant="h5" gutterBottom align="center">
                        {" "}
                        Select a file or drag and drop here{" "}
                      </Typography>

                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        align="center"
                        // onChange={handleFileSelect}
                      >
                        {" "}
                        All .csv, .xlsx and .xls file types supported here{" "}
                      </Typography>
                    </>
                  )}

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
                          <IconButton onClick={handleClearFile}>
                            <CancelIcon color="error" fontSize="small" />
                          </IconButton>
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
                            onClick={(e) => {
                              e.target.value = "";
                            }}
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
                            // onClick={handleBrowse}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                            }}
                          >
                            Browse FILE
                          </MDButton>
                        </label>
                      )}
                    </MDBox>
                  </Grid>
                  {!selectedFile && (
                    <MDButton
                      variant="text"
                      color="error"
                      sx={{ textDecoration: "underline" }}
                      onClick={handledownloadclick}
                    >
                      Download Template
                    </MDButton>
                    // <button
                    //   type="button"
                    //   style={{
                    //     textDecoration: "underline",
                    //     color: "red",
                    //     fontSize: "16px",
                    //     border: "none",
                    //     background: "none",
                    //     cursor: "pointer",
                    //   }}
                    //   onClick={handledownloadclick}
                    // >
                    //   Download Template
                    // </button>
                  )}
                </Stack>
              </MDBox>
            ),
          },
          {
            type: "Button",
            label: "Upload",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: selectedFile != null,
            // visible: true,
            onClick: UploadDocument,
          },
        ],
        [
          // {
          //   type: "Input",
          //   label: "COI No.",
          //   visible: true,
          //   // path: `Bankdetails.BranchDetails.${i}.Bank`,
          //   // onChangeFuncs: [IsAlphaNoSpace],
          // },
          // {
          //   type: "Button",
          //   label: "Search",
          //   visible: true,
          //   // disabled: true,
          //   variant: "contained",
          //   component: "label",
          //   // disabled: true,
          //   // onClick: onAddBranchDetails,
          //   spacing: 7,
          // },
          {
            type: "Input",
            label: "COI No.",
            visible: true,
            validationId: 2,
            required: true,
            enableAtEndorsement: true,
            // path: `PolicyNo`,
            path: `PolicyNumber`,
            spacing: 4,
            // value: masters.PolicyNumber,
            onChangeFuncs: [IsCOINumber],
            InputProps: { maxLength: 37 },
            // onBlurFuncs: [IsCOINumber],
          },
          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 2,
            label: "Search",
            visible: true,
            // disabled: dto?.PolicyNumber ? dto.PolicyNumber === "" || dto?.PartnerDetails : true,
            variant: "contained",
            component: "label",
            onClick: searchPolicyByCOINumber,
            spacing: 7,
          },
          {
            type: "Custom",
            visible: Object.keys(dto?.PartnerDetails ? dto.PartnerDetails : {}).length !== 0, // condition for checking the policy response is there or not
            spacing: 12,
            return: (
              <MDBox>
                <Card
                  sx={{
                    background: "#f0f2f5",
                    borderRadius: "0.25rem",
                    // marginLeft: "2px",
                  }}
                >
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        {/* Master Policy No. : <b>{objectPath.get(dto, "PartnerDetails.masterPolicyNo")}</b> */}
                        Master Policy No. :{" "}
                        <b>
                          {objectPath.get(
                            dto,
                            "MasterPolicyDetails.0.masterPolicyDetails.MasterPolicyNo"
                          )}
                        </b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        {/* Master Policy Start Date : <b>{masters.MPStartDate}</b> */}
                        Master Policy Start Date :{" "}
                        <b>
                          {objectPath.get(
                            dto,
                            "MasterPolicyDetails.0.masterPolicyDetails.PolicyStartDate"
                          )}
                        </b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        {/* Master Policy Start Time : <b>{masters.MPStartTime}</b> */}
                        Master Policy Start Time :{" "}
                        <b>
                          {objectPath.get(
                            dto,
                            "MasterPolicyDetails.0.masterPolicyDetails.PolicyStartTime"
                          )}
                        </b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        {/* Master Policy End Date : <b>{masters.MPEndDate}</b> */}
                        Master Policy End Date :{" "}
                        <b>
                          {objectPath.get(
                            dto,
                            "MasterPolicyDetails.0.masterPolicyDetails.PolicyEndDate"
                          )}
                        </b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        {/* Master Policy End Time : <b>{masters.MPEndTime}</b> */}
                        Master Policy End Time :{" "}
                        <b>
                          {objectPath.get(
                            dto,
                            "MasterPolicyDetails.0.masterPolicyDetails.PolicyEndTime"
                          )}
                        </b>
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="subtitle2">
                        {/* MPH Name : <b>{objectPath.get(dto, "PartnerDetails.partnerName")}</b> */}
                        MPH Name :{" "}
                        <b>
                          {objectPath.get(
                            dto,
                            "MasterPolicyDetails.0.masterPolicyDetails.MasterPolicyHolderName"
                          )}
                        </b>
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            ),
          },
          {
            type: "AutoComplete",
            label: "Type of Endorsement",
            enableAtEndorsement: true,
            visible: Object.keys(dto?.PartnerDetails ? dto.PartnerDetails : {}).length !== 0, // condition for checking the policy response is there or not
            // path: `EndorsementType.0.mValue`,
            // value: masters.TypeOfEndorsement.mValue,
            path: `endoType`,
            options: masters.endorsementTypes,
            customOnChange: (e, a) => OnEndorsementTypeSelect(e, a),
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Select Category",
            enableAtEndorsement: true,
            visible: Object.keys(dto?.PartnerDetails ? dto.PartnerDetails : {}).length !== 0, // condition for checking the policy response is there or not
            // visible:
            //   dto.PolicyNumber &&
            //   masters.TypeOfEndorsement.mValue !== "Policy Cancellation",
            // value: masters.endorsementCategory.endorsementConfigName,
            // path: `EndorsementType.1.endorsementConfigName`,
            path: `endoCat`,
            options: masters.endorsementCategoryOptions,
            customOnChange: (e, a) => OnEndorsementCategorySelect(e, a),
            spacing: dto?.endoType && dto.endoType === "Non-Financial Endorsement" ? 4 : 3,
            // disableCloseOnSelect: true,
            // disabled: masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement",
            required: true,
          },
          {
            type: "MDDatePicker",
            label: "Select Effective Date",
            enableAtEndorsement: true,
            visible: Object.keys(dto?.PartnerDetails ? dto.PartnerDetails : {}).length !== 0, // condition for checking the policy response is there or not
            path: "EndorsementEffectiveDate",
            altFormat: "d/m/Y",
            minDate: dto?.PolicyStartDate,
            maxDate: dto?.PolicyEndDate,
            dateFormat: "Y-m-d",
            // disableOnReset: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Family Combination",
            visible: dto.endoCat === "Member Deletion",
            path: "FamilyCombination",
            options: masters.FamilyCombinationList,
            customOnChange: handleMemDelFamilyCombination,
            required: true,
          },
          {
            type: "Typography",
            label: "Select Member",
            spacing: 12,
            visible:
              masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
              masters.endorsementCategory.endorsementConfigName === "Member Deletion",
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible:
              masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
              masters.endorsementCategory.endorsementConfigName === "Member Deletion",
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            hideFooterPagination: true,
            hideFooterSelectedRowCount: true,
            checkboxSelection: true,
            selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            onSelectionModelChange: (row) => handleSelectMembers(row),
            sx: {
              border: "none",
              "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                display: "none",
              },
            },
            columns: [
              {
                field: "index",
                headerName: "index",
                flex: 1,
                hide: true,
              },
              {
                field: "MemberName",
                headerName: "Member Name",
                flex: 1,
                // headerAlign: "center", // Align the header content in the center
                // align: "center", // Align the cell content in the center
              },
              {
                field: "UHIDNo",
                headerName: "UHID N.o",
                flex: 1,
              },
              {
                field: "Relation",
                headerName: "Relation",
                flex: 1,
              },
              {
                field: "PlanName",
                headerName: "Plan Name",
                flex: 1,
              },
            ],
            rowId: "index",
            value: lMasters.membrsRows,
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "Typography",
            label: `Plan Details`,
            spacing: 12,
            variant: "h4",
            visible: true,
          },
          {
            type: "AutoComplete",
            label: "Select Plan",
            visible: true,
            path: `Plan`,
            spacing: 4,
            options: masters.plans,
            disableOnReset: true,
            customOnChange: handlePlanChange,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Family Combination",
            visible: dto.endoCat === "Member Addition",
            path: "FamilyCombination",
            options: masters.FamilyCombinationList,
            customOnChange: handleMemAddFamilyCombination,
            required: true,
          },
          {
            type: "Button",
            label: "Add Member",
            spacing: 5,
            justifyContent: "end",
            startIcon: <AddIcon />,
            visible: dto.endoCat === "Member Addition",
            onClick: showMemberAddInfo,
            // onClick: () => RemoveBranchDetails(i),
          },
          {
            type: "Typography",
            label: `${dto.Plan} Cover Details`,
            spacing: 12,
            visible: true,
          },
          // data grid for cover details of which are binded from the json directly
          {
            type: "DataGrid",
            spacing: 12,
            // visible: dto.TypeOfCOI === "Individual",
            visible: true,
            // hideFooterPagination: true,
            hideFooterSelectedRowCount: true,
            sx: {
              border: "none",
            },
            columns: [
              {
                field: "CoverName",
                headerName: "Cover Name",
                flex: 1,
              },
              {
                field: dto.Benefit?.[0]?.BenefitSI ? "BenefitSI" : "Value", // condtion to check the fields have Value or BenefitSI
                headerName: "SumInsured",
                flex: 1,
              },
              // plan level premium is not available in the policy response
              // so removed the Premium column
              // {
              //   field: "Premium",
              //   headerName: "Premium",
              //   flex: 1,
              // },
            ],
            rowId: "CoverName",
            value: dto.Benefit,
          },
          // data grid for cover details of which are stored in masters
          // {
          //   type: "DataGrid",
          //   spacing: 12,
          //   // visible: dto.TypeOfCOI === "Individual",
          //   visible: true,
          //   hideFooterPagination: true,
          //   hideFooterSelectedRowCount: true,
          //   sx: {
          //     border: "none",
          //   },
          //   columns: [
          //     {
          //       field: "CoverName",
          //       headerName: "Cover Name",
          //       flex: 1,
          //     },
          //     {
          //       field: "SumInsured",
          //       headerName: "SumInsured",
          //       flex: 1,
          //     },
          //     {
          //       field: "Premium",
          //       headerName: "Premium",
          //       flex: 1,
          //     },
          //   ],
          //   rowId: "CoverName",
          //   value: lMasters.PlanRows,
          // },
        ],
        // if the array as [{},{}....]
        // [...spreadMemberDetails()],
        // if array as [[{},{},],[{},{}],..]
        [
          // {
          //   type: "Typography",
          //   label: `Existing Member Details`,
          //   spacing: 12,
          //   variant: "h4",
          //   visible: true,
          // },
        ].concat(...spreadMemberDetails().filter((x, i) => i < lMasters.exsistingMembers)), // getting only old members
        // [].concat(...spreadMemberDetails()), // for getting all members
        [
          // {
          //   type: "Typography",
          //   label: `New Member Details`,
          //   // spacing: 9,
          //   spacing: 12,
          //   variant: "h4",
          //   visible: true,
          // },
          // {
          //   type: "Button",
          //   label: "Add Member",
          //   spacing: 3,
          //   justifyContent: "end",
          //   startIcon: <AddIcon />,
          //   visible: true,
          //   onClick: onAddMember,
          // },
          ...spreadNewMemberDetails(),
        ],
        // for displaying the members who are selected for deletion
        [].concat(
          ...spreadMemberDetails().filter((x, i) => lMasters.deleteMemberIndex.includes(i))
        ),
        // accordion for special conditions and additional details
        [
          // {
          //   type: "Typography",
          //   label: `Additional Details`,
          //   spacing: 12,
          //   variant: "h4",
          //   visible: true,
          // },
          {
            type: "Input",
            label: "Percentage Premium Employer Contribution",
            path: `AdditionalDetails.PremiumEmployerContribution`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Percentage Premium Employee Contribution",
            path: `AdditionalDetails.PremiumEmployeeContriution`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "COI Number Issued By Customer",
            visible: true,
            path: `AdditionalDetails.COINumberIssuedByCustomer`,
            disabled: true,
          },
        ],
        [
          // displaying the special condiotions based on the insuredmember 1 from the COI binding
          // {
          //   type: "Typography",
          //   label: "Special Conditions",
          //   spacing: 12,
          //   variant: "h4",
          //   visible: true,
          // },
          {
            type: "Input",
            label: "Special Condition 01",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[0]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[0]
                  ? dto.AdditionalDetails.SpecialCondition[0]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.0.SpecialCondition`,
            spacing: 6,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Special Condition 01 Value",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[0]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[0]
                  ? dto.AdditionalDetails.SpecialCondition[0]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.0.SpecialConditionValue`,
            spacing: 3,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Special Condition 02",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[1]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[1]
                  ? dto.AdditionalDetails.SpecialCondition[1]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.1.SpecialCondition`,
            spacing: 6,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Special Condition 02 Value",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[1]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[1]
                  ? dto.AdditionalDetails.SpecialCondition[1]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.1.SpecialConditionValue`,
            spacing: 3,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Special Condition 03",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[2]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[2]
                  ? dto.AdditionalDetails.SpecialCondition[2]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.2.SpecialCondition`,
            spacing: 6,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Special Condition 03 Value",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[2]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[2]
                  ? dto.AdditionalDetails.SpecialCondition[2]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.2.SpecialConditionValue`,
            spacing: 3,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Special Condition 04",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[3]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[3]
                  ? dto.AdditionalDetails.SpecialCondition[3]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.3.SpecialCondition`,
            spacing: 6,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Special Condition 04 Value",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[3]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[3]
                  ? dto.AdditionalDetails.SpecialCondition[3]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.3.SpecialConditionValue`,
            spacing: 3,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Special Condition 05",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[4]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[4]
                  ? dto.AdditionalDetails.SpecialCondition[4]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.4.SpecialCondition`,
            spacing: 6,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Special Condition 05 Value",
            // visible: true,
            // visible:
            //   dto.InsurableItem[0].RiskItems[0].SpecialCondition?.[4]?.SpecialCondition !== "",
            visible:
              Object.keys(
                dto.AdditionalDetails.SpecialCondition[4]
                  ? dto.AdditionalDetails.SpecialCondition[4]
                  : {}
              ).length !== 0,
            path: `AdditionalDetails.SpecialCondition.4.SpecialConditionValue`,
            spacing: 3,
            // disabled: true,
          },
        ],
        // premium details section is commented untill the premium calculation is done
        // [
        //   // {
        //   //   type: "Typography",
        //   //   label: "Premium Details",
        //   //   spacing: 12,
        //   //   visible: true,
        //   // },
        //   {
        //     type: "Input",
        //     label: "Total Sum Insured",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "Hospicash Sum Insured",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "Hospicash Premium",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "PA Sum Insured",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "PA Premium",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "Critical Illness Sum Insured",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "Critical Illness Premium",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "EMI Cover Sum Insured",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "EMI Cover Premium",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: " Actual EMI Amount",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "Loss of Job Sum Insured",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "Loss of Job Premium",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "Child Education Grant Sum Insured",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "Child Education Grant Premium",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: "Premium Payment Mode",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        //   {
        //     type: "Input",
        //     label: " Premium Amount",
        //     visible: true,
        //     disabled: true,
        //     // path: `PartnerDetails.masterPolicyNo`,
        //   },
        // ],
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "auto",
                  height: "auto",
                  p: 2,
                }}
              >
                <Card sx={{ width: "400px", backgroundColor: "#f0f2f5" }}>
                  <Grid container justifyContent="space-between" spacing={4} p={2}>
                    <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                      <MDTypography variant="h5">Total Premium</MDTypography>
                    </Grid>
                    <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                      <MDTypography variant="h5">
                        ₹{" "}
                        {/* {objectPath.get(dto, [
                          "PremiumDetails",
                          "EndorsementPremium",
                          "MHDIHospiBenefitArrayV1.FinalPremiumSum",
                        ])} */}
                        {objectPath.get(dto, "PremiumDetails.EndorsementPremium.TotalPremium")}
                      </MDTypography>
                    </Grid>
                    {Number(dto?.PremiumDetails?.EndorsementPremium?.PremiumToBePaid) >= 0 && (
                      <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                        <MDTypography>Premium to be paid</MDTypography>
                      </Grid>
                    )}
                    {Number(dto?.PremiumDetails?.EndorsementPremium?.PremiumToBePaid) < 0 && (
                      <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                        <MDTypography>Premium to be refunded</MDTypography>
                      </Grid>
                    )}
                    <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                      <MDTypography>
                        ₹{" "}
                        {Math.abs(
                          Number(
                            objectPath.get(dto, "PremiumDetails.EndorsementPremium.PremiumToBePaid")
                          )
                        )}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            ),
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Input",
            label: "COI No. ",
            visible: true,
            disabled: true,
            spacing: 4,
            // path: `PolicyNo`,
            path: `PolicyNumber`,
            // value: masters.PolicyNumber,
          },
          {
            type: "Input",
            label: "Endorsement Type",
            visible: true,
            disabled: true,
            // path: `EndorsementType.0.mValue`,
            value: masters.TypeOfEndorsement.mValue,
          },
          {
            type: "Input",
            label: "Endorsement Category",
            visible: true,
            disabled: true,
            // path: `EndorsementType.1.endorsementConfigName`,
            value: masters.endorsementCategory.endorsementConfigName,
          },
          {
            type: "MDDatePicker",
            label: "Effective Date",
            visible: true,
            spacing: 2,
            path: "EndorsementEffectiveDate",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            disabled: true,
          },
        ],
        [
          {
            type: "Split",
            visible: true,
            spacing: 12,
            split: [
              { xs: 5.8, sm: 5.8, md: 5.8, lg: 5.8, xl: 5.8, xxl: 5.8, id: 1 },
              { xs: 0.4, sm: 0.4, md: 0.4, lg: 0.4, xl: 0.4, xxl: 0.4, id: 3 },
              { xs: 5.8, sm: 5.8, md: 5.8, lg: 5.8, xl: 5.8, xxl: 5.8, id: 2 },
            ],
          },
          // vertical divider
          {
            type: "Divider",
            sx: {
              border: "1px solid",
              height: "100%",
              position: "absolute",
            },
            visible: true,
            flexItem: true,
            orientation: "vertical",
            splitId: 3,
          },
          {
            type: "Typography",
            label: "Existing Member Details",
            variant: "h6",
            spacing: 12,
            visible: true,
            splitId: 1,
          },
          ...showExistingMembersDetails(),
          {
            type: "Typography",
            label: "New Member Details",
            variant: "h6",
            spacing: 12,
            visible: true,
            splitId: 2,
          },
          ...showNewMembersDetails(),
        ],
        // member addition accordion(only added members)
        [].concat(...spreadMemberDetailsSummary().filter((x, i) => i >= lMasters.exsistingMembers)),
        // member deeltion accordion(only selected members for deletion)
        [].concat(
          ...spreadMemberDetailsSummary().filter((x, i) => lMasters.deleteMemberIndex.includes(i))
        ),
        // coi policy cancellation (all members)
        [].concat(...spreadMemberDetailsSummary()),
        [
          // {
          //   type: "Typography",
          //   label: "Premium Details",
          //   spacing: 12,
          //   visible: true,
          // },
          {
            type: "Input",
            label: "Total Sum Insured",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "Hospicash Sum Insured",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "Hospicash Premium",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "PA Sum Insured",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "PA Premium",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "Critical Illness Sum Insured",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "Critical Illness Premium",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "EMI Cover Sum Insured",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "EMI Cover Premium",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: " Actual EMI Amount",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "Loss of Job Sum Insured",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "Loss of Job Premium",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "Child Education Grant Sum Insured",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "Child Education Grant Premium",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: "Premium Payment Mode",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          {
            type: "Input",
            label: " Premium Amount",
            visible: true,
            disabled: true,
            // path: `PartnerDetails.masterPolicyNo`,
          },
        ],
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "auto",
                  height: "auto",
                  p: 2,
                }}
              >
                <Card sx={{ width: "400px", backgroundColor: "#f0f2f5" }}>
                  <Grid container justifyContent="space-between" spacing={4} p={2}>
                    <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                      <MDTypography variant="h5">Total Premium</MDTypography>
                    </Grid>
                    <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                      <MDTypography variant="h5">
                        ₹{" "}
                        {/* {objectPath.get(dto, [
                          "PremiumDetails",
                          "EndorsementPremium",
                          "MHDIHospiBenefitArrayV1.FinalPremiumSum",
                        ])} */}
                        {objectPath.get(dto, "PremiumDetails.EndorsementPremium.TotalPremium")}
                      </MDTypography>
                    </Grid>
                    {Number(dto?.PremiumDetails?.EndorsementPremium?.PremiumToBePaid) >= 0 && (
                      <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                        <MDTypography>Premium to be paid</MDTypography>
                      </Grid>
                    )}
                    {Number(dto?.PremiumDetails?.EndorsementPremium?.PremiumToBePaid) < 0 && (
                      <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                        <MDTypography>Premium to be refunded</MDTypography>
                      </Grid>
                    )}
                    <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                      <MDTypography>
                        ₹{" "}
                        {Math.abs(
                          Number(
                            objectPath.get(dto, "PremiumDetails.EndorsementPremium.PremiumToBePaid")
                          )
                        )}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            ),
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "Split",
            visible: true,
            spacing: 12,
            split: [
              { md: 7, lg: 7, xl: 7, xxl: 7, id: 1 },
              { md: 5, lg: 5, xl: 5, xxl: 5, id: 2 },
            ],
          },
          {
            type: "Typography",
            label: "CD Account Details",
            spacing: 12,
            visible: true,
            splitId: 1,
          },
          {
            type: "Input",
            label: "CD Account No.",
            visible: true,
            path: `PartnerDetails.accountNo`,
            disabled: true,
            splitId: 1,
            // path: `PartnerDetails.masterPolicyNo`,
          },
          // {
          //   type: "Input",
          //   label: "CD Account Balance",
          //   visible: true,
          //   disabled: true,
          //   splitId: 1,
          //   // path: `PartnerDetails.masterPolicyNo`,
          // },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            splitId: 2,
            return: (
              <MDBox>
                <Stack direction="row" justifyContent="center">
                  {/* <MDTypography> */}
                  <MDTypography variant="h5" sx={{ color: "red" }}>
                    <strong>Premium Summary</strong>
                  </MDTypography>
                </Stack>
                <Stack direction="row" justifyContent="center" mt={2}>
                  <Card sx={{ width: "400px", backgroundColor: "#f0f2f5" }}>
                    <Grid container justifyContent="space-between" spacing={2} p={4}>
                      <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                        <MDTypography>Sum Insured</MDTypography>
                      </Grid>
                      <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <MDTypography>₹ </MDTypography>
                      </Grid>
                      <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                        <MDTypography>Total Premium</MDTypography>
                      </Grid>
                      <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <MDTypography>
                          ₹{" "}
                          {Math.abs(
                            Number(
                              objectPath.get(
                                dto,
                                "PremiumDetails.EndorsementPremium.TotalPremiumToBePaid"
                              )
                            )
                          )}
                        </MDTypography>
                      </Grid>
                      <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                        <MDTypography>GST (18%)</MDTypography>
                      </Grid>
                      <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <MDTypography>
                          ₹{" "}
                          {Math.abs(
                            Number(
                              objectPath.get(dto, "PremiumDetails.EndorsementPremium.TaxToBePaid")
                            )
                          )}
                        </MDTypography>
                      </Grid>
                      {Number(dto?.PremiumDetails?.EndorsementPremium?.PremiumToBePaid) >= 0 && (
                        <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                          <MDTypography variant="h5">Premium to be paid</MDTypography>
                        </Grid>
                      )}
                      {Number(dto?.PremiumDetails?.EndorsementPremium?.PremiumToBePaid) < 0 && (
                        <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                          <MDTypography variant="h5">Premium to be refunded</MDTypography>
                        </Grid>
                      )}
                      <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                        <MDTypography variant="h5">
                          ₹{" "}
                          {Math.abs(
                            Number(
                              objectPath.get(
                                dto,
                                "PremiumDetails.EndorsementPremium.PremiumToBePaid"
                              )
                            )
                          )}
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
  masters,
  setMasters,
  setBackDropFlag,
  navigate,
}) => {
  const lDto = dto;
  const lMasters = masters;
  let fun = true;
  switch (activeStep) {
    case 0:
      if (
        masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
        masters.endorsementCategory.endorsementConfigName === "Member Deletion"
      ) {
        if (masters.deleteMemberIndex.length === 0) {
          fun = false;
          swal2.fire({
            icon: "error",
            // iconColor: "red",
            title: "Please select a member to be deleted",
            // text: " Please select a member to be deleted",
            confirmButtonColor: "#d32f2f",
            width: "700px",
            heightAuto: true,
            confirmButtonText: "Ok",
            // allowOutsideClick: false,
            // showCloseButton: true,
          });
        } else {
          const prevallowedmembers = masters.FamilyCombinationList.filter(
            (x) => x.mValue === masters.prevFamilyCombination
          )[0];
          const newallowedmembers = masters.FamilyCombinationList.filter(
            (x) => x.mValue === dto.FamilyCombination
          )[0];
          const delmems =
            parseInt(prevallowedmembers.TotalCount, 10) -
            parseInt(newallowedmembers.TotalCount, 10);
          if (masters.deleteMemberIndex.length === delmems) {
            // method for setting the date of leaving (DOL) as the endorsement effective date for the members to be deleted
            // deleteMemberIndex is an array which holds the indxes of members to be deleted from the riskitems array (members array)
            masters.deleteMemberIndex.forEach((x) => {
              lDto.InsurableItem[0].RiskItems[x].DOL = dto.EndorsementEffectiveDate;
            });
            setDto({ ...lDto });
            fun = true;
          } else {
            fun = false;
            swal2.fire({
              icon: "error",
              // iconColor: "red",
              title: `Please select ${delmems} member(s) to be deleted`,
              // text: " Please select a member to be deleted",
              confirmButtonColor: "#d32f2f",
              width: "700px",
              heightAuto: true,
              confirmButtonText: "Ok",
              // allowOutsideClick: false,
              // showCloseButton: true,
            });
          }
        }
      } else if (
        masters.TypeOfEndorsement.mValue === "Policy Cancellation" &&
        masters.endorsementCategory.endorsementConfigName === "COI Policy Cancellation"
      ) {
        setBackDropFlag(true);
        const claimPayload = {
          uhid: "",
          benefitType: "",
          claimStatus: "",
          claimNumber: "",
          coiNumber: dto.PolicyNumber,
          productId: dto.MasterPolicyDetails[0].productIdPk,
          pageSize: 4,
          pageNumber: 1,
        };
        console.log(
          "payload for the getall claim details API to check whether the coi number has the claim or not",
          claimPayload
        );
        const claimRes = await getAllClaimDetails(claimPayload);
        console.log("response of get all claim details API is ", claimRes);
        if (claimRes.data.length > 0) {
          // approach 1
          // console.log("check the claim dates with the endorsement effective date");
          // let proceed = true;
          // claimRes.data.forEach((claim) => {
          //   debugger;
          //   if (new Date(claim.updatedDateTime) <= new Date(dto.EndorsementEffectiveDate)) {
          //     proceed = false;
          //   }
          // });
          // approach 2
          // get the settled claims first
          let proceed = true;
          let claimSettle = true;
          const settledClaimArray = claimRes.data.filter((X) => X.claimStatus === "Claim Settled");
          // const pendingClaimArray = claimRes.data.filter((X) => X.claimStatus !== "Claim Settled");
          // if all the claims are settled then need to check with the Endorsement effective date
          if (settledClaimArray.length === claimRes.data.length) {
            if (settledClaimArray.length > 0) {
              settledClaimArray.forEach((claim) => {
                if (new Date(claim.updatedDateTime) <= new Date(dto.EndorsementEffectiveDate)) {
                  proceed = false;
                  claimSettle = false;
                }
              });
            }
          }
          // else means there are pending claims then the coi cannot be cancelled
          else {
            proceed = false;
          }
          // checking based on proceed variable
          if (proceed === true) {
            setBackDropFlag(false);
            fun = true;
          } else {
            console.log("claim under process error needs to be shown here :");
            if (claimSettle === false) {
              setBackDropFlag(false);
              swal2.fire({
                icon: "error",
                title: "Cancellation is not allowed",
                text: "claim has been settled after the selected endorsement effective date. please change the endorsement effective date to cancel the COI.",
              });
              fun = false;
            } else {
              setBackDropFlag(false);
              swal2.fire({
                icon: "error",
                title: "Cancellation is not allowed",
                text: "There is a claim in process under the COI. The Policy cannot be cancelled.",
              });
              fun = false;
            }
          }
        } else {
          setBackDropFlag(false);
          fun = true;
        }
      } else {
        fun = true;
      }

      break;
    case 1:
      if (
        masters.TypeOfEndorsement.mValue !== "" &&
        masters.endorsementCategory.endorsementConfigName !== ""
      ) {
        // adding validation to check wheather detals are changed or not
        if (
          masters.endorsementCategory.endorsementConfigName ===
            "Member and Nominee Details Correction" ||
          masters.endorsementCategory.endorsementConfigName === "DOB and DOC Change" ||
          masters.endorsementCategory.endorsementConfigName === "SI and Plan Change"
        ) {
          // we cannot directly check thejson values equal or not
          // if (dto.InsurableItem[0].RiskItems === masters.existingMemberDetails) {
          // by using _.isEqual(a,b) we can check but it is little bit slower
          // if (_.isEqual(dto.InsurableItem[0].RiskItems,masters.existingMemberDetails)) {
          if (
            JSON.stringify(dto.InsurableItem[0].RiskItems) ===
            JSON.stringify(masters.existingMemberDetails)
          ) {
            setBackDropFlag(false);
            swal2.fire({
              icon: "error",
              text: "Please change the required details for Endorsement.",
            });
            fun = false;
            break;
          } else {
            lDto.ProposerDetails.Name = dto.InsurableItem[0].RiskItems[0].Name;
            lDto.ProposerDetails.MobileNo = dto.InsurableItem[0].RiskItems[0].MobileNumber;
            lDto.ProposerDetails.EmailId = dto.InsurableItem[0].RiskItems[0].EmailID;
            lDto.ProposerDetails.Age = dto.InsurableItem[0].RiskItems[0].Age;
            setDto({ ...lDto });
          }
        }
        // after checking with the condition proceed with the flow
        if (masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement") {
          fun = true;
        } else if (masters.EndoPremiumDetails === false) {
          if (
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            masters.endorsementCategory.endorsementConfigName === "Member Addition"
          ) {
            if (dto.InsurableItem[0].RiskItems.length <= masters.exsistingMembers) {
              swal2.fire({
                icon: "error",
                text: "Kindly add new member(s) to proceed",
              });
              fun = false;
              break;
            } else {
              // method to check if any questionarie selected as Yes if selected Yes , set the GHD Response as Rejected
              dto.InsurableItem[0].RiskItems.forEach((x, i) => {
                let flg = false;
                x?.Questionaire.forEach((q) => {
                  if (q?.Answer === "Yes") {
                    flg = true;
                  }
                });
                if (flg === true) {
                  lDto.InsurableItem[0].RiskItems[i].GHDResponse = "Rejected";
                } else {
                  lDto.InsurableItem[0].RiskItems[i].GHDResponse = "Accepted";
                }
              });
            }
          }
          // get a local json to send as a payload
          const newJson = JSON.parse(JSON.stringify(dto));
          // removing the selected members for deletion from the json and reducing the count of lives from the json in member deletion
          if (
            masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
            masters.endorsementCategory.endorsementConfigName === "Member Deletion"
          ) {
            // const NoOfmems = masters.deleteMemberIndex.length;
            newJson.InsurableItem[0].RiskItems = newJson.InsurableItem[0].RiskItems.filter(
              (x, i) => !masters.deleteMemberIndex.includes(i)
            );
            // const NewCOuntOfLives = parseInt(newJson.CountOfLives, 10) - NoOfmems;
            // newJson.CountOfLives = NewCOuntOfLives.toString();
          }
          // first we need to call the Endorsement Generic Save API to get the endorsement request number by sending status as false
          // creating payload
          const premiumPayload = {
            PolicyNo: dto.PolicyNumber,
            EndorsementDetails: { ...newJson },
            EndorsementType: [{ ...masters.TypeOfEndorsement }, { ...masters.endorsementCategory }],
          };
          console.log(
            "payload before sending to endorsement premium calculation :",
            premiumPayload
          );
          await GenericApi(
            "MagmaHospiCash01",
            "MagmaEndorsementPremiumCalculator",
            premiumPayload
          ).then(async (PremiumRes) => {
            console.log("Premium calculation response :", PremiumRes);
            if (PremiumRes.finalResult.status !== 7) {
              lDto.PremiumDetails.EndorsementPremium = { ...PremiumRes.finalResult };
              setDto({ ...lDto });
              const basicPremium = Number(
                lDto.PremiumDetails.EndorsementPremium.BasicPremium
              ).toFixed(2);
              lDto.PremiumDetails.EndorsementPremium.BasicPremium = basicPremium;
              // if the type is policy cancellation then we need to send the total premium of edorseemnt premium as integer
              if (masters.TypeOfEndorsement.mValue === "Policy Cancellation") {
                const totalPremium = parseInt(
                  Number(lDto.PremiumDetails.EndorsementPremium.TotalPremium).toFixed(2),
                  10
                );
                lDto.PremiumDetails.EndorsementPremium.TotalPremium = totalPremium;
              } else {
                const totalPremium = Number(
                  lDto.PremiumDetails.EndorsementPremium.TotalPremium
                ).toFixed(2);
                lDto.PremiumDetails.EndorsementPremium.TotalPremium = totalPremium;
              }
              const taxAmount = Number(lDto.PremiumDetails.EndorsementPremium.TaxAmount).toFixed(2);
              lDto.PremiumDetails.EndorsementPremium.TaxAmount = taxAmount;
              const taxtobepaid = Number(
                lDto.PremiumDetails.EndorsementPremium.TaxToBePaid
              ).toFixed(2);
              lDto.PremiumDetails.EndorsementPremium.TaxToBePaid = taxtobepaid;
              const premiumtobepaid = Number(
                lDto.PremiumDetails.EndorsementPremium.PremiumToBePaid
              ).toFixed(2);
              lDto.PremiumDetails.EndorsementPremium.PremiumToBePaid = premiumtobepaid;
              // calculating total premium to be paid from the response to show it in 4 th stepper
              const totalPremiumTobePaid = (premiumtobepaid - taxtobepaid).toFixed(2);
              console.log("TotalPremiumToBePaid", totalPremiumTobePaid);
              lDto.PremiumDetails.EndorsementPremium.TotalPremiumToBePaid = totalPremiumTobePaid;
              setDto({ ...lDto });
              lMasters.EndoPremiumDetails = true;
              setMasters({ ...lMasters });
            }
            fun = false;
          });
        } else {
          fun = true;
        }
      } else {
        fun = false;
      }
      break;
    case 2:
      if (
        masters.TypeOfEndorsement.mValue !== "" &&
        masters.endorsementCategory.endorsementConfigName !== ""
      ) {
        setBackDropFlag(false);
        lDto.EndoNumberType = "EndoProposalNo";
        lDto.EndoAttributeName = "EndorsementNo";
        // we are setting Endorsement Effective Date at the time of selecting effective date if effective date
        // is changed to member level then need to select the first members effective date
        // lDto.EndorsementEffectiveDate=dto.InsurableItem[0].RiskItems[0].EndorsementEffectiveDate;
        lDto.PolicyStatus = "EndorsementStage";
        lDto.EndoPrefix = "";
        lDto.EndoSuffix = "";
        delete lDto?.DecisionStatus;
        delete lDto?.DeviationDetails;
        delete lDto?.PaymentDetails;

        // we need to delete the below nodes if its already endorsed
        delete lDto?.EndorsementNo;
        delete lDto?.EndoPolicyNo;

        setDto({ ...lDto });
        // get a local json to send as a payload
        const policyJson = JSON.parse(JSON.stringify(dto));
        delete policyJson.endoType;
        delete policyJson.endoCat;

        // removing the selected members for deletion from the json and reducing the count of lives from the json in member deletion
        if (
          masters.TypeOfEndorsement.mValue === "Financial Endorsement" &&
          masters.endorsementCategory.endorsementConfigName === "Member Deletion"
        ) {
          // const NoOfmems = masters.deleteMemberIndex.length;
          policyJson.InsurableItem[0].RiskItems = policyJson.InsurableItem[0].RiskItems.filter(
            (x, i) => !masters.deleteMemberIndex.includes(i)
          );
          // const NewCOuntOfLives = parseInt(policyJson.CountOfLives, 10) - NoOfmems;
          // policyJson.CountOfLives = NewCOuntOfLives.toString();
        }
        // first we need to call the Endorsement Generic Save API to get the endorsement request number by sending status as false
        // creating payload
        const paylod = {
          PolicyNo: dto.PolicyNumber,
          EndorsementEffectiveDate: dto.EndorsementEffectiveDate, // added effective date for COI Policy cancellation
          EndorsementDetails: { ...policyJson },
          EndorsementType: [{ ...masters.TypeOfEndorsement }, { ...masters.endorsementCategory }],
        };
        console.log(
          "payload before sending to endorsement generic save to create Req No :",
          paylod
        );
        // debugger;
        // calling the API
        setBackDropFlag(true);
        // const EndoReqNoRes = await EndorsementGenericSave(false, paylod);
        await EndorsementGenericSave(false, paylod).then(async (EndoReqNoRes) => {
          console.log("response of the endorsement request number API call ", EndoReqNoRes);
          console.log("endorsement request number  ", EndoReqNoRes.endorsementNumber);
          // setting the endorsement request number to the payload
          paylod.EndorsementDetails.endorsementNumber = EndoReqNoRes.endorsementNumber;
          // setting the endorsement request number to master to use it in 4 th stepper
          lMasters.EndorsementReqNo = EndoReqNoRes.endorsementNumber;
          setMasters({ ...lMasters });
          // call the generic API to check the NSTP Rules
          await GenericApi("MagmaHospiCash01", "Magma_HospiCashEndorsement", paylod).then(
            async (nstpRes) => {
              // debugger;
              console.log("resposne of NSTP rules dispatcher", nstpRes);
              if (nstpRes.status === 1) {
                // inserting the EndorsementDeviation node as DeviationDetails in the policy json
                paylod.EndorsementDetails.DeviationDetails = {
                  ...nstpRes.finalResult.EndorsementDeviation,
                };
                paylod.EndorsementDetails.EndorsementNo = EndoReqNoRes.endorsementNumber;
                // inserting the QueryOutput node as QueryOutput in the policy json from the dispatcher result
                // paylod.EndorsementDetails.QueryOutput = {
                //   ...nstpRes.finalResult.QueryOutput,
                // };
                console.log("after getting the endorsement deviation details ", paylod);
                // if (paylod.EndorsementDetails.DeviationDetails.failureMsg === "Failure") {
                // debugger;
                if (
                  paylod.EndorsementDetails.DeviationDetails.outcome === "Fail" &&
                  paylod.EndorsementDetails.DeviationDetails.failureCode === "400"
                ) {
                  // debugger;
                  // if records referred to underwriter then we need to call the SaveEndorsementAllocationDetails API by getting the payload
                  // using a query by passing payload
                  // const querypayload = {
                  //   paramList: [
                  //     {
                  //       parameterValue: "responseMessage", // response message of NSTP rule output
                  //       parameterName: "Description",
                  //     },
                  //   ],
                  //   reportname: "MagmaNSTPUWAllocation",
                  // };
                  const object = {
                    Stage: "Endorsement",
                    Status: 388,
                    workFlowId: 93, // Work Flow ID for MagmaNSTPWorkflow
                    WorkFlowType: "Underwrtiter",
                  };
                  // await GetSavepolicyWFStatus("REQ123", object);  // API used in COI for proposal
                  await SaveEndorsementWFStatus(EndoReqNoRes.endorsementNumber, object);
                  const object1 = {
                    Stage: "Endorsement",
                    Status: 388,
                    WorkFlowType: "Underwriter",
                    wfstageStatusId: 433,
                    Decision: [],
                  };
                  await SaveEndorsementWFStatus(EndoReqNoRes.endorsementNumber, object1);
                  // show the swal message of endorsement subjected to underwriter
                  // for endorsement subjected to NSTP

                  const NSTPPayload = {
                    ...paylod,
                    EndorsementNo: EndoReqNoRes.endorsementNumber,
                  };
                  await UpdateEndorsementV2(false, NSTPPayload);

                  setBackDropFlag(false);
                  fun = await swal2
                    .fire({
                      icon: "success",
                      iconColor: "red",
                      html: `<div style="text-align: center; margin-left: 0rem" ">
                                  <div><h3>Your Endorsement is Referred to underwriter as it is subject to underwriter approval</h3></div>
                                  <br/>
                                  <div><h3>Endorsement Req No. : ${EndoReqNoRes.endorsementNumber}</h3></div>
                                  <div><h3>was successfully generated.</h3></div>
                                  <div><h6>Save the Endorsement Request No. for further reference</h6></div>
                              </div>`,
                      confirmButtonText: "View Endorsement",
                      confirmButtonColor: "red",
                      allowOutsideClick: false,
                      // showCloseButton: true,
                    })
                    .then((resX) => {
                      if (resX.isConfirmed) {
                        navigate("/EndorsementList");
                        return false;
                      }
                      return false;
                    });
                } else {
                  // in STP flow directly Approve status as 392
                  // const object = {
                  //   Stage: "Endorsement",
                  //   Status: 392,
                  //   workFlowId: 93, // Work Flow ID for MagmaNSTPWorkflow
                  //   WorkFlowType: "Underwrtiter",
                  // };
                  // await SaveEndorsementWFStatus(EndoReqNoRes.endorsementNumber, object);
                  setBackDropFlag(false);

                  fun = await swal2
                    .fire({
                      icon: "success",
                      iconColor: "red",
                      allowOutsideClick: false,
                      // text: "Endorsement Req No. : 12345 was successfully generated",
                      html: `<div style="text-align: center; margin-left: 0rem" ">
                                  <div><h3>Endorsement Req No. : ${EndoReqNoRes.endorsementNumber}</h3></div>
                                  <div><h3>was successfully generated.</h3></div>
                                  <br/>
                                  <div><h6>Save the Endorsement Request No. for further reference</h6></div>
                              </div>`,
                      confirmButtonText: "Continue",
                      confirmButtonColor: "red",
                      // showCloseButton: true,
                    })
                    .then(async (resX) => {
                      if (resX.isConfirmed) {
                        // navigate to endorsement success page of non financial endorsement
                        if (masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement") {
                          setBackDropFlag(true);
                          // if non financial endorsement generate endorsement number by calling UpdateSequenceNumber API
                          // async (NumberType, AttributeName, Prefix, Suffix, obj)
                          const prefix = paylod.PolicyNo.substring(0, paylod.PolicyNo.length - 1);
                          const EndoNumRes = await UpdateSequenceNumber(
                            "EndoPolicyNo",
                            "EndoPolicyNo",
                            prefix,
                            "",
                            paylod.EndorsementDetails
                          );
                          console.log(
                            "response after creating endorsement Number ",
                            EndoNumRes.data
                          );
                          // paylod.EndorsementDetails = { ...EndoNumRes.data };
                          // console.log("payload for sending the Update EndorsementV2 API", paylod);
                          // const updtendpayload = {
                          //   PolicyNo: paylod.PolicyNo,
                          //   EndorsementDetails: {
                          //     ...EndoNumRes.data,   // endonumres.data dosent contain the deviationdetails
                          //     DecisionStatus: {
                          //       DecisionStatus: "Approved",
                          //       Remarks: "",
                          //       DecisionMaker: "",
                          //     },
                          //   },
                          //   EndorsementType: [...paylod.EndorsementType],
                          //   EndorsementNo: EndoReqNoRes.endorsementNumber,
                          // };
                          const updtendpayload = {
                            PolicyNo: paylod.PolicyNo,
                            EndorsementDetails: {
                              ...paylod.EndorsementDetails,
                              DecisionStatus: {
                                DecisionStatus: "Approved",
                                Remarks: "",
                                DecisionMaker: "",
                              },
                              EndoPolicyNo: EndoNumRes.data.EndoPolicyNo,
                            },
                            EndorsementType: [...paylod.EndorsementType],
                            EndorsementNo: EndoReqNoRes.endorsementNumber,
                          };
                          console.log(
                            "payload for sending the Update EndorsementV2 API",
                            updtendpayload
                          );
                          // then call update endorsement v2 API
                          const endtRes = await UpdateEndorsementV2(true, updtendpayload);
                          console.log("response after calling update endorsement v2 API", endtRes);
                          setBackDropFlag(false);
                          navigate("/EndorsementSuccess", {
                            state: {
                              EndoReqNo: EndoReqNoRes.endorsementNumber,
                              EndoNo: endtRes.endorsementDto.EndorsementDetails.EndoPolicyNo,
                              COINo: endtRes.endorsementDto.EndorsementDetails.PolicyNo,
                              Name: endtRes.endorsementDto.EndorsementDetails.InsurableItem[0]
                                .RiskItems[0].Name,
                              EndorsementType: endtRes.endorsementDto.EndorsementType[0].mValue,
                              EndorsementCategory:
                                endtRes.endorsementDto.EndorsementType[1].endorsementConfigName,
                            },
                          });
                        } else {
                          lMasters.EndtPayload = { ...paylod };
                          setMasters({ ...lMasters });
                          const policyJson1 = { ...masters.EndtPayload.EndorsementDetails };
                          if (
                            Number(
                              policyJson1.PremiumDetails.EndorsementPremium.PremiumToBePaid
                            ) === 0
                          ) {
                            // debugger;
                            setBackDropFlag(true);
                            const newPaymentDetails = {
                              PolicyNo: masters.EndtPayload.PolicyNo,
                              proposalNo: masters.EndorsementReqNo,
                              DateOfPayment: "",
                              paymentDetailsDTO: {
                                paymentId: "",
                                paymentSource: "CD",
                                Amount: "0",
                                transactionNo: "",
                              },
                            };
                            // update PaymentDetails.paymentDetailsDTO with the new transaction object
                            policyJson1.PaymentDetails = {
                              ...newPaymentDetails,
                            };
                            lMasters.EndtPayload.EndorsementDetails.PaymentDetails = {
                              ...newPaymentDetails,
                            };
                            setMasters({ ...lMasters });
                            if (
                              masters.endorsementCategory.endorsementConfigName ===
                              "Member Addition"
                            ) {
                              // debugger;
                              const oldmemebrs = policyJson1.InsurableItem[0].RiskItems.filter(
                                (x) => x?.UHID
                              );
                              const newmembers = policyJson1.InsurableItem[0].RiskItems.filter(
                                (x) => !x?.UHID
                              );
                              if (newmembers.length > 0) {
                                const obj = policyJson1;
                                obj.InsurableItem[0].RiskItems = [...newmembers];
                                await UpdateSequenceNumber("MemberID", "UHID", "", "", obj).then(
                                  async (UHIDCreationRes) => {
                                    console.log("response after creating UHID ", UHIDCreationRes);
                                    policyJson1.InsurableItem[0].RiskItems = [
                                      ...oldmemebrs,
                                      ...UHIDCreationRes.data.InsurableItem[0].RiskItems,
                                    ];
                                    lMasters.EndtPayload.EndorsementDetails.InsurableItem[0].RiskItems =
                                      policyJson1.InsurableItem[0].RiskItems;
                                    setMasters({ ...lMasters });
                                  }
                                );
                              }
                            }
                            // generate the Endorsement Number
                            const prefix = masters.EndtPayload.PolicyNo.substring(
                              0,
                              masters.EndtPayload.PolicyNo.length - 1
                            );
                            const EndoNumRes = await UpdateSequenceNumber(
                              "EndoPolicyNo",
                              "EndoPolicyNo",
                              prefix,
                              "",
                              masters.EndtPayload.EndorsementDetails
                            );
                            console.log(
                              "response after creating endorsement Number ",
                              EndoNumRes.data
                            );
                            console.log("Endorsement Number IS : ", EndoNumRes.data.EndoPolicyNo);
                            const updtendpayload = {
                              PolicyNo: masters.EndtPayload.PolicyNo,
                              EndorsementDetails: {
                                ...masters.EndtPayload.EndorsementDetails,
                                DecisionStatus: {
                                  DecisionStatus: "Approved",
                                  Remarks: "",
                                  DecisionMaker: "",
                                },
                                EndoPolicyNo: EndoNumRes.data.EndoPolicyNo,
                              },
                              EndorsementType: [...masters.EndtPayload.EndorsementType],
                              EndorsementNo:
                                masters.EndtPayload.EndorsementDetails.endorsementNumber,
                            };
                            console.log(
                              "payload for sending the Update EndorsementV2 API",
                              updtendpayload
                            );
                            // then call update endorsement v2 API
                            await UpdateEndorsementV2(true, updtendpayload).then((endtRes) => {
                              console.log(
                                "response after calling update endorsement v2 API",
                                endtRes
                              );
                              setBackDropFlag(false);
                              // navigate to endorsement success page to display all the details
                              navigate("/EndorsementSuccess", {
                                state: {
                                  EndoReqNo:
                                    masters.EndtPayload.EndorsementDetails.endorsementNumber,
                                  EndoNo: endtRes.endorsementDto.EndorsementDetails.EndoPolicyNo,
                                  COINo: endtRes.endorsementDto.EndorsementDetails.PolicyNo,
                                  Name: endtRes.endorsementDto.EndorsementDetails.InsurableItem[0]
                                    .RiskItems[0].Name,
                                  paymentDto:
                                    endtRes.endorsementDto.EndorsementDetails.PaymentDetails
                                      .paymentDetailsDTO,
                                  EndorsementType: endtRes.endorsementDto.EndorsementType[0].mValue,
                                  EndorsementCategory:
                                    endtRes.endorsementDto.EndorsementType[1].endorsementConfigName,
                                },
                              });
                              fun = false;
                            });
                          } else {
                            return true;
                          }
                        }
                      }
                      return false;
                    });
                }
              }
            }
          );
        });
        setBackDropFlag(false);
      } else {
        fun = false;
      }

      break;
    case 3:
      // fun = true;

      // static swal message for insufficient CD account balance for endorsement payement
      setBackDropFlag(false);
      if (masters.TypeOfEndorsement.mValue !== "Non-Financial Endorsement") {
        setBackDropFlag(true);
        console.log("after getting the endorsement reqest number in stp", masters.EndtPayload);
        const policyJson = { ...masters.EndtPayload.EndorsementDetails };
        if (
          masters.TypeOfEndorsement.mValue === "Financial Endorsement" ||
          masters.TypeOfEndorsement.mValue === "Policy Cancellation"
        ) {
          // if (masters.TypeOfEndorsement.mValue === "Financial Endorsement") {
          // debugger;
          // CD Account Deduction
          if (Number(policyJson.PremiumDetails.EndorsementPremium.PremiumToBePaid) > 0) {
            const object = {
              accountNo: policyJson.PartnerDetails.accountNo,
              productId: policyJson.MasterPolicyDetails[0].productIdPk,
              partnerId: policyJson.MasterPolicyDetails[0].agentId,
            };
            const CDRes = await SearchCdAccountAsync(object);
            const AvailCDBalance = CDRes[0].availableBalance;
            console.log("available CD Balance", AvailCDBalance);
            if (
              Number(policyJson.PremiumDetails.EndorsementPremium.PremiumToBePaid > AvailCDBalance)
            ) {
              // if the CD balance is insufficient
              // add the endorsement request number to the payload and  call the Update EndorsementV2 with status false
              // const lowCDBalpayload = {
              const lowCDBalpayload = {
                ...masters.EndtPayload,
                EndorsementNo: masters.EndorsementReqNo,
              };
              console.log("payload if CD Balance is insufficient", lowCDBalpayload);
              const endtRes = await UpdateEndorsementV2(false, lowCDBalpayload);
              console.log(
                "Resposne after calling the Update EndorsementV2 by sending status as false due to Insufficient cd account balance :",
                endtRes
              );
              setBackDropFlag(false);
              // make the status of endorsement as pending due to cd
              fun = await swal2
                .fire({
                  icon: "error",
                  // text: "Endorsement Req No. : 12345 was successfully generated",
                  html: `<div style="text-align: center; margin-left: 0rem" ">
                      <br/>
                      <div><h3>This Endorsement is pending due to insufficient CD Balance</h3></div>
                      <br/>
                      <div><h3>Available CD Balance : ${AvailCDBalance}</h3></div>
                      <br/>
                      <div><h3>Kindly replenish CD Account to issue Endorsement</h3></div>
                  </div>`,
                  confirmButtonText: "View Endorsement",
                  confirmButtonColor: "red",
                  showCloseButton: true,
                  allowOutsideClick: false,
                })
                .then((resX) => {
                  if (resX.isConfirmed) {
                    // write the route for navigating to Endorsement List Page
                    navigate("/EndorsementList");
                    return false;
                  }
                  return false;
                });
              break;
            } else {
              const CDPayload = {
                partnerId: policyJson.MasterPolicyDetails[0].agentId,
                productId: policyJson.MasterPolicyDetails[0].productIdPk,
                accountNo: policyJson.PartnerDetails.accountNo,
                policyNo: masters.EndtPayload.PolicyNo,
                txnAmount: policyJson.PremiumDetails.EndorsementPremium.PremiumToBePaid,
              };
              await GenerateCDTransactionForDispatcher(CDPayload).then(async (CDPaymentRes) => {
                console.log("resposne after the CD payment", CDPaymentRes);
                const newPaymentDetails = {
                  PolicyNo: masters.EndtPayload.PolicyNo,
                  proposalNo: masters.EndorsementReqNo,
                  // DateOfPayment: new Date(),
                  DateOfPayment: CDPaymentRes.finalResult.data.transactionDate,
                  paymentDetailsDTO: {
                    paymentId: "",
                    paymentSource: "CD",
                    Amount: CDPaymentRes.finalResult.data.txnAmount,
                    transactionNo: CDPaymentRes.finalResult.data.txnId,
                  },
                };
                // update PaymentDetails.paymentDetailsDTO with the new transaction object
                policyJson.PaymentDetails = {
                  ...newPaymentDetails,
                };
                lMasters.EndtPayload.EndorsementDetails.PaymentDetails = {
                  ...newPaymentDetails,
                };
                setMasters({ ...lMasters });
              });
            }
          } else if (Number(policyJson.PremiumDetails.EndorsementPremium.PremiumToBePaid) < 0) {
            // refund logic needs be written here
            // for the time being there is no payment refund option we will skip this condion and proceed with the payment
            const obj = {
              txnAmount: Math.abs(
                Number(policyJson.PremiumDetails.EndorsementPremium.PremiumToBePaid)
              ).toString(),
              isRefund: true,
              accountNo: policyJson.PartnerDetails.accountNo,
              policyNo: masters.EndtPayload.PolicyNo,
              txnId: 0,
            };
            console.log("payload for CD Refund ", obj);
            // debugger;
            const refundRes = await ReverseCDTransaction(obj);
            console.log("Refund Result", refundRes);
            // as of now we are making the payment details with 0 in order to skip error after completing the refund API complete the dynamic one
            const newPaymentDetails = {
              PolicyNo: masters.EndtPayload.PolicyNo,
              proposalNo: masters.EndorsementReqNo,
              DateOfPayment: refundRes.cdTransactions.transactionDate,
              paymentDetailsDTO: {
                paymentId: "",
                paymentSource: "CD",
                Amount: refundRes.cdTransactions.txnAmount,
                transactionNo: refundRes.cdTransactions.txnId,
              },
            };
            console.log("new payment details", newPaymentDetails);
            // update PaymentDetails.paymentDetailsDTO with the new transaction object
            policyJson.PaymentDetails = {
              ...newPaymentDetails,
            };
            lMasters.EndtPayload.EndorsementDetails.PaymentDetails = {
              ...newPaymentDetails,
            };
            setMasters({ ...lMasters });
          }
          // if no payment neede directly call the updatesequencenumber for getting the endorsement number
          // we have commented as we have already implemented the scenario of premium to be paid if 0

          // else {
          //   const newPaymentDetails = {
          //     PolicyNo: masters.EndtPayload.PolicyNo,
          //     proposalNo: masters.EndorsementReqNo,
          //     DateOfPayment: "",
          //     paymentDetailsDTO: {
          //       paymentId: "",
          //       paymentSource: "CD",
          //       Amount: "0",
          //       transactionNo: "",
          //     },
          //   };
          //   // update PaymentDetails.paymentDetailsDTO with the new transaction object
          //   policyJson.PaymentDetails = {
          //     ...newPaymentDetails,
          //   };
          //   lMasters.EndtPayload.EndorsementDetails.PaymentDetails = {
          //     ...newPaymentDetails,
          //   };
          //   setMasters({ ...lMasters });
          // }

          // if the member addition category then needs to generate the UHID for new members
          if (masters.endorsementCategory.endorsementConfigName === "Member Addition") {
            // debugger;
            const oldmemebrs = policyJson.InsurableItem[0].RiskItems.filter((x) => x?.UHID);
            const newmembers = policyJson.InsurableItem[0].RiskItems.filter((x) => !x?.UHID);
            if (newmembers.length > 0) {
              const obj = policyJson;
              obj.InsurableItem[0].RiskItems = [...newmembers];
              await UpdateSequenceNumber("MemberID", "UHID", "", "", obj).then(
                async (UHIDCreationRes) => {
                  console.log("response after creating UHID ", UHIDCreationRes);
                  policyJson.InsurableItem[0].RiskItems = [
                    ...oldmemebrs,
                    ...UHIDCreationRes.data.InsurableItem[0].RiskItems,
                  ];
                  // lMasters.EndtPayload.EndorsementDetails.InsurableItem[0].RiskItems = [
                  //   ...oldmemebrs,
                  //   ...UHIDCreationRes.data.InsurableItem[0].RiskItems,
                  // ];
                  lMasters.EndtPayload.EndorsementDetails.InsurableItem[0].RiskItems =
                    policyJson.InsurableItem[0].RiskItems;
                  setMasters({ ...lMasters });
                }
              );
            }
          }
          // generate the Endorsement Number
          const prefix = masters.EndtPayload.PolicyNo.substring(
            0,
            masters.EndtPayload.PolicyNo.length - 1
          );
          const EndoNumRes = await UpdateSequenceNumber(
            "EndoPolicyNo",
            "EndoPolicyNo",
            prefix,
            "",
            masters.EndtPayload.EndorsementDetails
          );
          console.log("response after creating endorsement Number ", EndoNumRes.data);
          console.log("Endorsement Number IS : ", EndoNumRes.data.EndoPolicyNo);
          const updtendpayload = {
            PolicyNo: masters.EndtPayload.PolicyNo,
            EndorsementDetails: {
              ...masters.EndtPayload.EndorsementDetails,
              DecisionStatus: {
                DecisionStatus: "Approved",
                Remarks: "",
                DecisionMaker: "",
              },
              EndoPolicyNo: EndoNumRes.data.EndoPolicyNo,
            },
            EndorsementType: [...masters.EndtPayload.EndorsementType],
            EndorsementNo: masters.EndtPayload.EndorsementDetails.endorsementNumber,
          };
          console.log("payload for sending the Update EndorsementV2 API", updtendpayload);
          // then call update endorsement v2 API
          await UpdateEndorsementV2(true, updtendpayload).then((endtRes) => {
            console.log("response after calling update endorsement v2 API", endtRes);
            setBackDropFlag(false);
            // navigate to endorsement success page to display all the details
            navigate("/EndorsementSuccess", {
              state: {
                EndoReqNo: masters.EndtPayload.EndorsementDetails.endorsementNumber,
                EndoNo: endtRes.endorsementDto.EndorsementDetails.EndoPolicyNo,
                COINo: endtRes.endorsementDto.EndorsementDetails.PolicyNo,
                Name: endtRes.endorsementDto.EndorsementDetails.InsurableItem[0].RiskItems[0].Name,
                paymentDto:
                  endtRes.endorsementDto.EndorsementDetails.PaymentDetails.paymentDetailsDTO,
                EndorsementType: endtRes.endorsementDto.EndorsementType[0].mValue,
                EndorsementCategory:
                  endtRes.endorsementDto.EndorsementType[1].endorsementConfigName,
                Refund: Number(policyJson.PremiumDetails.EndorsementPremium.PremiumToBePaid) < 0,
              },
            });
            fun = false;
          });
        }
      } else {
        fun = false;
      }
      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep, masters }) => {
  let btnDetails = {};
  const get2stepNextLabel = () => {
    let label = "";
    if (masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement") {
      label = "View Summary";
    } else if (
      masters.TypeOfEndorsement.mValue !== "Non-Financial Endorsement" &&
      masters.EndoPremiumDetails === false
    ) {
      label = "Calculate Premium";
    } else {
      label = "Proceed";
    }
    return label;
  };
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed",
          visible: masters.TypeOfUpload === "Individual",
          loader: "backDrop",
        },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Back", visible: true },
        reset: { label: "Reset", visible: false },
        next: {
          label: get2stepNextLabel(),
          visible: true,
          loader: "backDrop",
        },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Back", visible: true },
        reset: { label: "Reset", visible: false },
        // next: { label: "Proceed", visible: true },
        next: {
          label:
            masters.TypeOfEndorsement.mValue === "Non-Financial Endorsement" ? "Save" : "Proceed",
          visible: true,
          loader: "backDrop",
        },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Make Payment", visible: true, loader: "backDrop" },
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

const getMasterData = async () => {
  const masters = {
    Salutation: [],
    Gender: [],
    // Relationship: [],
    NomineeRelationship: [],
    deleteMemberIndex: [], // for storing the indexes for members who are selected for deletion
    exsistingMembers: 0, // for storing the number of previous members
    PlanRows: [], // for storing the no previous plans for datagrid rows
    membrsRows: [], // for storing the previous members for delete datagrid rows
    MPStartDate: "",
    MPStartTime: "",
    MPEndDate: "",
    MPEndTime: "",
    MaimMemberGender: "",
    endorsementTypes: [],
    endorsementCategoryAll: [],
    endorsementCategoryOptions: [],
    existingMemberDetails: [],
    plans: [],
    TypeOfUpload: "",
    PolicyNumber: "",
    masterPolicyNo: "",
    MPHolderName: "",
    EffectiveDate: "",
    TypeOfEndorsement: {
      mValue: "",
      mID: 0,
    },
    endorsementCategory: {
      endorsementConfigName: "",
      riskParameters: [],
    },
    MasterPolicyResult: {},
    prevFamilyCombination: "",
    EndoPremiumDetails: false,
    RelationshipList: [],
    FamilyCombinationList: [],
    EndorsementReqNo: "",
    EndtPayload: {},
  };
  // calling APIs for getting relationship autocomplete options
  const relationshipOptions = await getProdPartnerMasterData([]);
  // masters.Relationship = relationshipOptions;
  // filtering the relationship to exclude self for nominee relatioship
  masters.NomineeRelationship = relationshipOptions.filter(
    (item) => item.mValue.toLowerCase() !== "self"
  );
  // calling APIs for getting gender autocomplete options
  const genderOptions = await getProdPartnerMasterDataGender([]);
  masters.Gender = genderOptions;

  // apip for getting the configured endorsement category autocomplete options from masters
  masters.endorsementCategoryAll = await GetEndorsementConfigV2ByProductId(1022);
  console.log("endorsement category all ", masters.endorsementCategoryAll);

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
