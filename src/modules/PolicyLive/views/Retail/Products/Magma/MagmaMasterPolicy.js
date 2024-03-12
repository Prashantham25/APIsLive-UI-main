import React, { useState, useEffect } from "react";
import Communication from "modules/PolicyLive/views/Retail/Products/Magma/Communication";
import CommunicationMatrix from "modules/PolicyLive/views/Retail/Products/Magma/CommunicationMatrix";
import {
  IsAlphaSpace,
  IsEmail,
  IsMobileNumber,
  IsNumeric,
  IsAlphaNum,
  IsPan,
  IsGstNo,
  // IsNumaricSpecial,
} from "Common/Validations";

// import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import NoRecords from "assets/images/Magma/NoRecords.png";
import { useNavigate, useLocation } from "react-router-dom";
import objectPath from "object-path";
import POSPAAdded from "assets/images/BrokerPortal/POSPAAdded.png";
import PlanDetails from "modules/PolicyLive/views/Retail/Products/Magma/PlanDetails";
import Swal from "sweetalert2";
import swal from "sweetalert";
import {
  Grid,
  IconButton,
  // Stack,
  // FormControlLabel,
  Card,
  // Radio,
  // RadioGroup,
  Chip,
  Menu,
  MenuItem,
  Autocomplete,
  Typography,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
// import MDButton from "../../../../../../components/MDButton";
import {
  useDataController,
  setGenericPolicyDto,
  // setGenericInfo,
} from "../../../../../BrokerPortal/context";
import policyDto from "./data/MasterPolicyJSON";
import MDBox from "../../../../../../components/MDBox";
// import MDInput from "../../../../../../components/MDInput";
import MDTypography from "../../../../../../components/MDTypography";
import {
  GetGhd,
  SaveProductMasterPolicy,
  Savequestions,
  GetUsersRoles,
  getProdPartnermasterDatas,
  getProdPartnermasterData1,
  SearchCdAccountAsync,
  // GetPermissions,
  GetGroupingDetailsByPlanGrid,
  GetBenefits,
  getProdPartnermasterData,
} from "./data/index";

let topNavigate = null;
const MagmaMaster = localStorage.getItem("roleId");
const localUserName = localStorage.getItem("userName");
console.log("MAGMAMASTER", MagmaMaster);
const masters = {
  CoinsurerType: [
    { mID: "1", mValue: "L" },
    { mID: "2", mValue: "N" },
  ],
  AdministrativeCharges: [
    { mID: "1", mValue: "1" },
    { mID: "2", mValue: "0" },
  ],
  BusinessType: [
    { mID: "1", mValue: "New Business" },
    { mID: "2", mValue: "Rollover" },
    { mID: "3", mValue: "Renewal" },
  ],
  MaritalStatus: [
    { mID: "1", mValue: "Married" },
    { mID: "2", mValue: "Unmarried" },
  ],
  ServiceTaxExemptioncategory: [
    { mID: "1", mValue: "No Exemption" },
    { mID: "2", mValue: "Risk Situated at SEZ" },
    { mID: "3", mValue: "Risk Situated at J&K" },
    { mID: "4", mValue: "Risk Situated at SEZ with tax" },
    { mID: "5", mValue: "Policies from PSU, Govt Undertaking" },
  ],
  Frequency: [{ mID: "1", mValue: "Annual" }],
  FormOfCommunication: [{ mID: "1", mValue: "Online" }],
  PolicyCoverType: [
    { mID: "1", mValue: "Employer-Employee" },
    { mID: "2", mValue: "Non-employer Employee" },
  ],
  IndividualCertificateRequired: [
    { mID: "1", mValue: "Required" },
    { mID: "2", mValue: "Not Required" },
  ],
  CertificateType: [
    { mID: "1", mValue: "Customer Certificate" },
    { mID: "2", mValue: "Normal Certificate" },
  ],
  SelfCovered: [
    { mID: "1", mValue: "Yes" },
    { mID: "2", mValue: "No" },
  ],
  SchemeClassification: [
    { mID: "1", mValue: "Contributory Scheme" },
    { mID: "2", mValue: "Non Contributory Scheme" },
  ],
  RIBusinessType: [
    { mID: "1", mValue: "Applicable" },
    { mID: "2", mValue: "Not Applicable" },
  ],
  PolicyType: [
    { mID: "1", mValue: "Floater" },
    { mID: "2", mValue: "NonFloater" },
  ],
  BusinessChannel: [
    { mID: "1", mValue: "Direct Agent" },
    { mID: "2", mValue: "Individual Agents" },
    { mID: "3", mValue: "Brokers" },
    { mID: "4", mValue: "Corporate Agents" },
    { mID: "5", mValue: "Micro Agents" },
    { mID: "6", mValue: "Bancassurance" },
  ],
  Masterpolicy: [
    { mID: "1", mValue: "Yes" },
    { mID: "2", mValue: "No" },
  ],
  InstallmentCase: [
    { mID: "1", mValue: "Yes" },
    { mID: "2", mValue: "No" },
  ],
  InstallmentFrequency: [
    { mID: "1", mValue: "Monthly" },
    { mID: "2", mValue: "Quarterly" },
    { mID: "3", mValue: "Half Yearly" },
    { mID: "4", mValue: "Annually" },
  ],
};
const getProcessSteps = () => {
  const steps = [
    "Master Policy Details",
    "Communication Details",
    "Insured Details",
    "Operations Details",
    "Plan Details",
    "Claims Details",
  ];
  return steps;
};

const getPageContent = (activeStep) => {
  let steps = [];
  const [control] = useDataController();
  const { genericPolicyDto } = control;
  const dto = genericPolicyDto;
  console.log("dtodata", dto);
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Proposal Details", visible: true, Endorsement: true },
        { name: "Bank Details", visible: true, Endorsement: true },
        { name: "Intermediary Details", visible: true, Endorsement: true },
        { name: "Office Location Details", visible: true, Endorsement: true },
        { name: "Policy Details", visible: true, Endorsement: true },
        { name: "Financier Details", visible: true, Endorsement: true },
        { name: "TPA Details", visible: true, Endorsement: true },
        { name: "Risk Cover Details", visible: true, Endorsement: true },
        { name: "Risk Cover Group", visible: true, Endorsement: true },
      ];
      break;
    case 1:
      steps = [{ name: "Communication Matrix (Issuance)", visible: true, Endorsement: true }];
      break;
    case 2:
      steps = [
        { name: "Insured Credentials", visible: true, Endorsement: true },
        { name: "Issued Certificate Details", visible: true, Endorsement: true },
        { name: "Past Policy Details", visible: true, Endorsement: true },
        { name: "Coinsurance Details", visible: true, Endorsement: true },
      ];
      break;
    case 5:
      steps = [
        { name: "Communication Details", visible: true, Endorsement: true },
        { name: "Financier Payment Details", visible: true, Endorsement: true },
        { name: "Corporate Payment Details", visible: true, Endorsement: true },
        { name: "Physical Card Dispatch Details", visible: true, Endorsement: true },
        { name: "Communication Details(Claims)", visible: true, Endorsement: true },
        { name: "Wellness Service provider", visible: true, Endorsement: true },
        { name: "Third Party Administrator", visible: true, Endorsement: true },
        { name: "Communication Matrix(Claims)", visible: true, Endorsement: true },
      ];
      break;
    case 3:
      steps = [
        { name: "Calculation Details", visible: true, Endorsement: true },
        {
          name: "Contribution percentage",
          visible: objectPath.get(dto, "SchemeClassification") === "Contributory Scheme",
          Endorsement: true,
        },
        { name: "Installment Details", visible: true, Endorsement: true },
        { name: "Additional Important Information", visible: true, Endorsement: true },
        { name: "CD Account Details", visible: true, Endorsement: true },
      ];
      break;
    case 4:
      steps = [
        { name: "Good Health Declaration", visible: true, Endorsement: true },
        { name: "Plan Details", visible: true, Endorsement: true },
      ];
      break;
    default:
      steps = [];
  }
  return steps;
};
const getSectionContent = (activeStep) => {
  const [control, dispatch] = useDataController();
  const { genericPolicyDto } = control;
  const matrixdisable = true;
  // const { genericInfo } = control;D
  let dto = genericPolicyDto;
  const [questinary, setQuestionary] = useState([]);
  useEffect(() => {
    if (dto && dto.AdditionalDetails && dto.AdditionalDetails.Questionnaire) {
      setQuestionary(dto.AdditionalDetails.Questionnaire);
    }
  }, [dto]);
  console.log("questions", dto?.AdditionalDetails?.Questionnaire);
  const [underwriter, setunderwriter] = useState(false);
  const [OperatorUser, setOpertoruser] = useState(false);
  const [ClaimsUser, setClaimsuser] = useState(false);

  const [openDel, setDelOpen] = useState(false);
  const [flagviewDisabled, setFlagviewDisabled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [placement, setPlacement] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [flagEdit, setFlagEdit] = React.useState(false);
  const [rowid, setrowId] = useState("");
  const [afterclone, setAfterclone] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState([]);
  const [planname, setPlanname] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [updatePlanName, setUpdatePlanName] = useState();
  const [Relationshipoption, setRelationshipOption] = useState([]);
  const [adultrelationship, setadultrelationship] = useState([]);
  const [Familycombinationoption, setFamilycombinationoption] = useState([]);
  const [adultFamilyCombintaion, setAdultfamilycombination] = useState([]);
  const [personalAccidentSelected, setPersonalAccidentSelected] = useState(false);

  const magmauserid = localStorage.getItem("userId");

  const [planjson, setPlanjson] = useState([
    {
      groupId: 0,
      productId: 1022,
      groupTypeId: 105,
      groupName: "",
      DisplayName: "",
      PlanCreatedDate: "",
      PlanName: "",
      isActive: true,
      groupDetailsJson: {
        SectionMaster: {
          SI: [],
          Type: [],
          Region: [],
          currency: "INR",
          Relationship: "",
          PolicyDuration: "",
          CountofPolicyDuration: "",
          MinimumAdultAge: "",
          MaximumAdultAge: "",
          MinimumChildAge: "",
          MaximumChildAge: "",
          SumInsuredType: "",
          FamilyCombination: [],
          COIThreshhold: "",
          CluaseExclusionYN: "",
          Clauses: [{ Applicable: "", Value: "", Desc: "" }],

          Exclusion: [{ Applicable: "", Value: "", Desc: "" }],
          RateTerm: "",
        },
        InputObj: "",
        OutputObj: "",
      },
      groupDetails: [
        {
          groupDetailsId: 0,
          groupId: 0,
          coverId: 0,
          coverName: "",
          benefitDetails: null,
          isActive: true,
          filterCriteria: {
            SI: "",
            Type: "",
            Region: "",
            currency: "INR",
          },
          SectionMappingDetails: {
            BenefitDetails: [],
          },
        },
      ],
    },
  ]);

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const masterId = query.get("MasterID");
  console.log("masterId", masterId);
  const obj = {
    SectionMappingDetails: {
      BenefitDetails: [],
    },
  };
  const spreadAddMembersQuestionarie = () => {
    const qArray1 = [];
    dto?.Dependents?.forEach((ques, i) => {
      qArray1.push(
        {
          type: "Input",
          label: "Allowed Dependent Relationship",
          value: `Dependents.${i}.Relationship`,
          visible: true,
          spacing: 4.5,
        },
        {
          type: "Input",
          label: "No. of times Dependents allowed",
          value: `Dependents.${i}.NoOfTimesAllowed`,
          visible: true,
          spacing: 4.5,
        }
      );
    });
    return qArray1;
  };

  const [relationshipmaster, setRelationshipmaster] = useState([]);
  const [familycombination, setFamilycombination] = useState([]);
  const handleDrawerOpen = async () => {
    setIsDrawerOpen(true);
    setOpen(false);
    setFlagviewDisabled(false);
    setFlagEdit(false);
    planjson[0].groupDetailsJson.SectionMaster.MinimumChildAge =
      dto.AdditionalDetails.Dependents[0].MiniAgeforChildInYear;
    planjson[0].groupDetailsJson.SectionMaster.MaximumChildAge =
      dto.AdditionalDetails.Dependents[0].MaxAgeforChildInYear;
    planjson[0].groupDetailsJson.SectionMaster.MinimumAdultAge =
      dto.AdditionalDetails.Dependents[0].MiniAgeInYear;
    planjson[0].groupDetailsJson.SectionMaster.MaximumAdultAge =
      dto.AdditionalDetails.Dependents[0].MaxAgeInYear;
    if (dto.PolicyType === "Floater" || dto.PolicyType === "NonFloater") {
      planjson[0].groupDetailsJson.SectionMaster.SumInsuredType = dto.PolicyType;
    }
    setPlanjson([...planjson]);
    const dependentsRelationships = dto.Dependents.map((dependent) => dependent.Relationship);
    const relationshipsString = dependentsRelationships.join(",");
    const relationshipsArray = relationshipsString.split(",");
    setRelationshipmaster(relationshipsArray);
    const abd = await getProdPartnermasterData(1022, "FamilyCombination");
    let childcount = 0;
    let adultcount = 0;
    dto.Dependents.forEach((dependent) => {
      if (
        dependent.Relationship === "Son" ||
        dependent.Relationship === "Daughter" ||
        dependent.Relationship === "Brother (Child)" ||
        dependent.Relationship === "Sister (Child)"
      ) {
        childcount += dependent.NoOfTimesAllowed;
      } else {
        adultcount += dependent.NoOfTimesAllowed;
      }
    });
    console.log("childcount", childcount);
    console.log("adultcount", adultcount);
    let filteredData = [];
    console.log("Original data:", abd.data);
    // Filter data based on adult and child count
    // filteredData = abd.data.filter(
    //   (item) =>
    //     item.AdultCount === adultcount && (item.ChildCount ? item.ChildCount === childcount : true)
    // );
    filteredData = abd.data.filter((item) => {
      const itemAdultCount = parseInt(item.AdultCount, 10);
      const itemChildCount = parseInt(item.ChildCount, 10);
      return itemAdultCount <= adultcount && (itemChildCount ? itemChildCount <= childcount : true);
    });
    console.log("filteredData", filteredData);
    setFamilycombination(filteredData);
  };

  console.log("familycombination", familycombination);
  console.log("relationshipmaster", relationshipmaster);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDelClickOpen = () => {
    setDelOpen(true);
    handleMenuClose();
  };
  const styleAuto = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
    },
  };
  const handleViewOpen = async (rowId) => {
    const row = `${masterId}_${rowId}`;
    setFlagviewDisabled(true);
    const payload = {
      productId: 1022,
      groupId: 105,
      filterCriteria: "",
    };
    const payloadBenefits = {
      productCode: "MagmaHospiCash01",
      planType: row,
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
    const display = { DisplayName: rowId };
    const result = await GetGroupingDetailsByPlanGrid(row, payload);
    result.data[0].groupDetails = [obj];
    result.data[0] = { ...result.data[0], ...display };
    console.log("api1View", result.data[0]);
    const Benefit = await GetBenefits(payloadBenefits);
    Benefit.finalResult.benefits.forEach((x) => {
      result.data[0].groupDetails[0].SectionMappingDetails.BenefitDetails.push(x);
      console.log("dataconcateView", result.data[0]);
      setPlanjson([result.data[0]]);
    });
    setIsDrawerOpen(true);
    setOpen(false);
    setFlagEdit(false);
  };
  console.log("MAGMAMASTERPOLICYJSON", planjson);
  const handleEditDrawerOpen = async (rowId) => {
    console.log("wwr", rowId);
    setFlagviewDisabled(false);
    setEdit(rowId);
    console.log("edit", edit);
    setOpen(false);
    setFlagEdit(true);
    const row = `${masterId}_${rowId}`;
    setUpdatePlanName(row);
    const payload = {
      productId: 1022,
      groupId: 105,
      filterCriteria: "",
    };
    const payloadBenefits = {
      productCode: "MagmaHospiCash01",
      planType: row,
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
    const display = { DisplayName: rowId };
    const result = await GetGroupingDetailsByPlanGrid(row, payload);
    result.data[0].groupDetails = [obj];
    result.data[0] = { ...result.data[0], ...display };
    console.log("api1View", result.data[0]);
    const Benefit = await GetBenefits(payloadBenefits);
    Benefit.finalResult.benefits.forEach((x) => {
      result.data[0].groupDetails[0].SectionMappingDetails.BenefitDetails.push(x);
      console.log("dataconcateView", result.data[0]);
      setPlanjson([result.data[0]]);
    });
    const relationdropdown1 = result.data[0]?.groupDetailsJson?.SectionMaster?.Relationship || [];
    if (result.data[0].groupDetailsJson.SectionMaster.Relationship !== "") {
      const relationdropdown = relationdropdown1.split(",").map((value) => value.trim());
      setRelationshipOption(relationdropdown);
      const specialValues = ["Son", "Daughter", "Brother (Child)", "Sister (Child)"];
      const identifiedValues = relationdropdown.filter((value) => specialValues.includes(value));
      const otherValues = relationdropdown.filter((value) => !specialValues.includes(value));
      setadultrelationship(otherValues);
      console.log("Identified Values:", identifiedValues);
    }
    if (result.data[0].groupDetailsJson.SectionMaster.FamilyCombination.length !== 0) {
      const selectedValues = result.data[0].groupDetailsJson.SectionMaster.FamilyCombination;
      const mValues = selectedValues.map((selectedValue) => selectedValue.FamilyCombination);
      setFamilycombinationoption(mValues);
      const numbersWithA = mValues.filter((values3) => /\d+A$/.test(values3));
      setAdultfamilycombination(numbersWithA);
      console.log("numbersWithA", numbersWithA);
    }
    if (result.data[0].groupDetails[0].SectionMappingDetails.BenefitDetails.length !== 0) {
      const benefitdetails = result.data[0].groupDetails[0].SectionMappingDetails.BenefitDetails;
      const mValues = benefitdetails.forEach((selectedValue) => {
        if (selectedValue.CoverName === "Personal Accident") {
          setPersonalAccidentSelected(true);
        }
      });
      console.log("mValues", mValues);
    }
    const dependentsRelationships = dto.Dependents.map((dependent) => dependent.Relationship);
    const relationshipsString = dependentsRelationships.join(",");
    const relationshipsArray = relationshipsString.split(",");
    setRelationshipmaster(relationshipsArray);
    setIsDrawerOpen(true);
    handleMenuClose();
  };

  const handleclonebutton = () => {
    setAfterclone(true);
  };
  const [errorMsg, setErrorMsg] = useState("");
  const PlanDetailsOPtions =
    dto && dto.PlanDetailsJson && dto.PlanDetailsJson.map((item) => item.DisplayName);
  console.log("PlanDetailsOPtions", PlanDetailsOPtions);
  const handleclone = async (rowId, value) => {
    setFlagviewDisabled(false);
    setErrorMsg("Plan name already exists");
    setOpenEdit(false);
    setFlagEdit(false);
    const row = `${masterId}_${value}`;
    const payload = {
      productId: 1022,
      groupId: 105,
      filterCriteria: "",
    };
    console.log("rooooooooooooooow", value);
    const payloadBenefits = {
      productCode: "MagmaHospiCash01",
      planType: row,
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
    const display = { DisplayName: value };
    console.log("displayyyyyyyyyyyyyy", display);
    const result = await GetGroupingDetailsByPlanGrid(row, payload);
    console.log("resullllllltttt", result);
    result.data[0].groupDetails = [obj];
    result.data[0] = { ...result.data[0], ...display };
    console.log("cloneapi", result.data[0]);
    const Benefit = await GetBenefits(payloadBenefits);
    console.log(Benefit);
    Benefit.finalResult.benefits.forEach((x) => {
      result.data[0].groupDetails[0].SectionMappingDetails.BenefitDetails.push(x);
      console.log("dataconcateclone", result.data[0]);
      setPlanjson([result.data[0]]);
    });
    const relationdropdown1 = result.data[0]?.groupDetailsJson?.SectionMaster?.Relationship || [];
    if (result.data[0].groupDetailsJson.SectionMaster.Relationship !== "") {
      const relationdropdown = relationdropdown1.split(",").map((values) => values.trim());
      setRelationshipOption(relationdropdown);
      const specialValues = ["Son", "Daughter", "Brother (Child)", "Sister (Child)"];
      const identifiedValues = relationdropdown.filter((values1) =>
        specialValues.includes(values1)
      );
      const otherValues = relationdropdown.filter((values2) => !specialValues.includes(values2));
      setadultrelationship(otherValues);
      console.log("Identified Values:", identifiedValues);
    }
    if (result.data[0].groupDetailsJson.SectionMaster.FamilyCombination.length !== 0) {
      const selectedValues = result.data[0].groupDetailsJson.SectionMaster.FamilyCombination;
      const mValues = selectedValues.map((selectedValue) => selectedValue.FamilyCombination);
      setFamilycombinationoption(mValues);
      const numbersWithA = mValues.filter((values3) => /\d+A$/.test(values3));
      setAdultfamilycombination(numbersWithA);
      console.log("numbersWithA", numbersWithA);
    }
    if (result.data[0].groupDetails[0].SectionMappingDetails.BenefitDetails.length !== 0) {
      const benefitdetails = result.data[0].groupDetails[0].SectionMappingDetails.BenefitDetails;
      const mValues = benefitdetails.forEach((selectedValue) => {
        if (selectedValue.CoverName === "Personal Accident") {
          setPersonalAccidentSelected(true);
        }
      });
      console.log("mValues", mValues);
    }
    const dependentsRelationships = dto.Dependents.map((dependent) => dependent.Relationship);
    const relationshipsString = dependentsRelationships.join(",");
    const relationshipsArray = relationshipsString.split(",");
    setRelationshipmaster(relationshipsArray);
    setIsDrawerOpen(true);
    setOpen(false);
  };
  console.log("opennnnn", isDrawerOpen);
  const [userrole, setUSerRole] = useState("");
  useEffect(async () => {
    // const permission = await GetPermissions(magmauserid, MagmaMaster);
    // console.log("permission", permission);
    // const urlJson = JSON.parse(permission[0]?.url);
    // console.log("urlJson", urlJson);
    // const parameters = urlJson.parametersList;
    // const EnabledPathArray = [];
    // parameters.forEach((x) => {
    //   if (x.parameterPath !== "") {
    //     EnabledPathArray.push({ parameterPath: x.parameterPath });
    //   }
    // });
    // setGenericInfo(dispatch, {
    //   ...genericInfo,
    //   Endorsement: true,
    //   EndorsementControlList: EnabledPathArray,
    // });
    const GetUse = await GetUsersRoles(magmauserid);
    console.log("APIROLEID", GetUse.data);

    GetUse.data.forEach((x) => {
      if (x.value === MagmaMaster) {
        if (x.mValue === "Magma_Underwriter_User") {
          setunderwriter(true);
          setUSerRole(x.mValue);
        }
      }
      if (x.value === MagmaMaster) {
        if (x.mValue === "Magma_OperationUser") {
          setOpertoruser(true);
        }
      }
      if (x.value === MagmaMaster) {
        if (x.mValue === "MagmaClaimsUser") {
          setClaimsuser(true);
        }
      }
    });
  }, []);
  console.log("abdddddddddddddddd", userrole);
  const columns = [
    {
      field: "id",
      headerName: "Plan Name",
      minWidth: 200,
      editable: false,
      renderCell: (params) => {
        const rowId = params.row.id;
        console.log("concateRowId", rowId);
        return (
          <MDTypography
            onClick={() => handleViewOpen(rowId)}
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {rowId}
          </MDTypography>
        );
      },
    },
    {
      field: "createdDate",
      headerName: "Plan Created Date",
      width: 200,
      editable: false,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    { field: "policyDuration", headerName: "Policy Duration", width: 200, editable: false },
    { field: "createdBy", headerName: "Created By", width: 200, editable: false },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      renderCell: (params) => <Chip label={params.value} color="success" />,
    },
    {
      field: "action",
      headerName: "Action",
      width: 190,
      editable: false,
      renderCell: (params) => {
        const handleView = (newPlacement) => (event) => {
          setAnchorEl(event.currentTarget);
          setOpen((prev) => placement !== newPlacement || !prev);
          setPlacement(newPlacement);
          setPlanname(params.row.id);
        };
        const rowId = `${masterId}_${planname}`;
        setrowId(rowId);
        console.log(rowid);
        return (
          <MDBox sx={{ width: 500 }}>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleViewOpen(planname)}>View Plan</MenuItem>
              <MenuItem
                onClick={() => handleEditDrawerOpen(planname)}
                disabled={
                  localStorage.getItem("roleId") === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d" ||
                  localStorage.getItem("roleId") === "e41cf7e7-341c-4ced-b03c-51f201fe37f1"
                }
              >
                Edit Plan
              </MenuItem>
              <MenuItem
                onClick={handleDelClickOpen}
                disabled={
                  localStorage.getItem("roleId") === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d" ||
                  localStorage.getItem("roleId") === "e41cf7e7-341c-4ced-b03c-51f201fe37f1"
                }
              >
                Delete Plan
              </MenuItem>
            </Menu>
            <IconButton onClick={handleView("bottom-start")}>
              <MoreVertIcon />
            </IconButton>
          </MDBox>
        );
      },
    },
  ];
  const rows =
    dto &&
    dto.PlanDetailsJson &&
    dto.PlanDetailsJson.map((item) => ({
      id: item.DisplayName,
      createdBy: localUserName,
      policyDuration: item.PolicyDuration,
      status: "Active",
      createdDate: item.PlanCreatedDate,
    }));

  console.log("HELLLLOOOOOO", planjson);

  const [id, setID] = useState([
    {
      qtype: 7,
      qsubType: "Health",
      qparentId: 0,
      controlType: 3,
      defaultValue: "No",
      masterType: "BooleanValue",
      onChangeVal: "",
      isDeleted: 0,
      childSequenceNo: 1,
      qtext: "",
      QAnswer: "No",
    },
  ]);

  useEffect(() => {
    const pc = objectPath.get(dto, "ProposerDetails.CustomerID");
    if (pc === undefined || pc === "") {
      dto = policyDto();
      objectPath.set(dto, "Product", "MasterPolicy");
      setGenericPolicyDto(dispatch, dto);
      console.log("dto", dto);
    }
  }, []);

  const Navigate = useNavigate();
  topNavigate = Navigate;
  let data = [];

  const handleAddQuestion = () => {
    const newAgeBandGroup = {
      QText: "",
    };
    setQuestionary((prevPlan) => {
      const updatedPlan = [...prevPlan];
      questinary.push(newAgeBandGroup);
      return updatedPlan;
    });
    setQuestionary([...questinary]);
  };

  const handleCalc = (e, val) => {
    if (
      IsNumeric(e.target.value) === true &&
      !Number.isNaN(e.target.value) &&
      e.target.value >= 0 &&
      e.target.value <= 100
    ) {
      if (val === "PremiumEmployerContribution") {
        if (e.target.value !== "") {
          objectPath.set(dto, "PremiumEmployerContribution", e.target.value);
          const value = 100 - e.target.value;
          console.log("value1", value);
          objectPath.set(dto, "PremiumEmployeeContribution", value.toString());
        } else {
          objectPath.set(dto, "PremiumEmployerContribution", e.target.value);
          objectPath.set(dto, "PremiumEmployeeContribution", "");
        }
        setGenericPolicyDto(dispatch, dto);
      } else if (val === "PremiumEmployeeContribution") {
        if (e.target.value !== "") {
          objectPath.set(dto, "PremiumEmployeeContribution", e.target.value);
          const value = 100 - e.target.value;
          console.log("value2", value);
          objectPath.set(dto, "PremiumEmployerContribution", value.toString());
        } else {
          objectPath.set(dto, "PremiumEmployeeContribution", e.target.value);
          objectPath.set(dto, "PremiumEmployerContribution", "");
        }
        setGenericPolicyDto(dispatch, dto);
      }
      console.log("calc", dto);
    }
  };
  console.log("questinary", questinary);
  const handleQuestionChange = (e, index, value) => {
    const updatedQuestions = [...questinary];
    updatedQuestions[index] = value;
    setQuestionary(updatedQuestions);
    id[0].qtext = value;
    setID(id);
    questinary[index].QText = id[0].qtext;
    questinary[index].QAnswer = id[0].QAnswer;
    setQuestionary([...questinary]);
    objectPath.set(dto, "AdditionalDetails.Questionnaire", questinary);
    const savequestion = Savequestions(id).then((x) => {
      console.log("premium1", savequestion);
      console.log("question", x);
      objectPath.set(id);
    });
  };

  console.log("Questionaries", id);
  const handleDelete = (index) => {
    const updatedQuestions = [...questinary];
    updatedQuestions.splice(index, 1);
    setQuestionary(updatedQuestions);
    objectPath.set(dto, "AdditionalDetails.Questionnaire", updatedQuestions);
  };
  console.log("Questionssssss", dto?.AdditionalDetails?.Questionnaire);
  const [, setRadiobuttonflag] = useState("");
  const spreadaddquestions = () => {
    const qArray1 = [];
    questinary?.forEach((ques, i) => {
      qArray1.push(
        {
          type: "Input",
          value: `AdditionalDetails.Questionnaire.${i}.QText`, // `AdditionalDetails.Questionnaire.${i}.QText`
          visible: dto.GHDApplicable === "Applicable",
          customOnChange: (e) => handleQuestionChange(e, i, e.target.value),
          spacing: 11,
        },
        {
          type: "Button",
          label: <DeleteIcon />,
          visible: dto.GHDApplicable === "Applicable",
          variant: "contained",
          color: "primary",
          value: "DeleteButton",
          align: "left",
          spacing: 1,
          onClick: () => handleDelete(i),
        }
      );
    });
    return qArray1;
  };

  const [BankMaster, setBankMaster] = useState([]);
  const [Branch, setBranch] = useState([]);
  useEffect(async () => {
    const abc = {
      Refid: data,
    };
    const data2 = { ProductId: 1022, MasterType: "FinancierBank" };
    const res = await getProdPartnermasterDatas(data2.ProductId, data2.MasterType, abc);
    console.log("BN", res);
    setBankMaster(res.data);
  }, []);
  const handleBranch = async (e, a) => {
    if (a !== null) {
      objectPath.set(dto, "AdditionalDetails.ClaimFinancierDetails.0.BankName", a.mValue);
      console.log("bR", a.mID);
      const data2 = { ProductId: 1022, MasterType: "BankBranchName" };
      const res = await getProdPartnermasterData1(data2.ProductId, data2.MasterType, {
        Bank_CD: a.mID,
      });
      setBranch(res.data);
      console.log("678", res);
    } else {
      objectPath.set(dto, "AdditionalDetails.ClaimFinancierDetails.0.BankName", "");
      objectPath.set(dto, "AdditionalDetails.ClaimFinancierDetails.0.BankBranch", "");
      objectPath.set(dto, "AdditionalDetails.ClaimFinancierDetails.0.BankLocation", "");
      objectPath.set(dto, "AdditionalDetails.ClaimFinancierDetails.0.IFSCCode", "");
    }
    setGenericPolicyDto(dispatch, dto);
  };
  const handleBranchdetails = async (e, a) => {
    if (a !== null) {
      objectPath.set(dto, "AdditionalDetails.ClaimFinancierDetails.0.BankBranch", a.mValue);
      console.log("jk", a.mID);
      const data2 = { ProductId: 1022, MasterType: "BankBranchDetails" };
      const res1 = await getProdPartnermasterData1(data2.ProductId, data2.MasterType, {
        BankBranchDetail_Id: a.mID,
      });
      objectPath.set(
        dto,
        "AdditionalDetails.ClaimFinancierDetails.0.BankLocation",
        res1.data[0].BRANCH_ADDRESS
      );
      objectPath.set(
        dto,
        "AdditionalDetails.ClaimFinancierDetails.0.IFSCCode",
        res1.data[0].TXT_IFSC_CODE
      );
      console.log("bd", res1);
    } else {
      objectPath.set(dto, "AdditionalDetails.ClaimFinancierDetails.0.BankBranch", "");
      objectPath.set(dto, "AdditionalDetails.ClaimFinancierDetails.0.BankLocation", "");
      objectPath.set(dto, "AdditionalDetails.ClaimFinancierDetails.0.IFSCCode", "");
    }
    setGenericPolicyDto(dispatch, dto);
  };
  // const [ques, setQues] = useState(false);
  const handleRadiobuttonTypeChange = async (event) => {
    if (event.target.value === "Applicable") {
      dto.GHDApplicable = "Applicable";
      if (Array.isArray(dto?.AdditionalDetails?.Questionnaire)) {
        setQuestionary([...dto.AdditionalDetails.Questionnaire]);
      }
      if (!dto?.AdditionalDetails?.Questionnaire) {
        const ghd = await GetGhd([]);
        const updatedGhdData = ghd.data.map((y) => ({
          QID: y.QId,
          QText: y.QText,
          Answer: "No",
        }));

        const updatedQuestionary = Array.isArray(dto?.AdditionalDetails?.Questionnaire)
          ? [...dto.AdditionalDetails.Questionnaire, ...updatedGhdData]
          : updatedGhdData;

        setQuestionary(updatedQuestionary);
        objectPath.set(dto, "AdditionalDetails.Questionnaire", updatedQuestionary);
        setRadiobuttonflag(true);
      } else {
        setRadiobuttonflag(true);
      }
    } else {
      setRadiobuttonflag(false);
    }
    if (event.target.value === "NonApplicable") {
      dto.GHDApplicable = "NonApplicable";
      objectPath.del(dto, "AdditionalDetails.Questionnaire");
    }
    console.log("Questionssssss1111", dto?.AdditionalDetails?.Questionnaire);
  };
  console.log("questinary", questinary);
  console.log("Questionssssss", dto?.AdditionalDetails?.Questionnaire);

  // const handleGST = (e, v) => {
  //   objectPath.set(dto, "ServiceTaxExemptioncategory", v.mValue);
  //   if (v.mValue === "Risk Situated at SEZ") {
  //     objectPath.set(dto, "GST", "No");
  //   } else {
  //     objectPath.set(dto, "GST", "Yes");
  //   }
  //   setGenericPolicyDto(dispatch, dto);
  // };

  const [button, setButton] = useState(false);
  const handleSearchButton = async () => {
    const object = {
      accountNo: dto.CDAccountNumber,
      productId: dto.productIdPk,
      partnerId: dto.agentId,
    };
    const res = await SearchCdAccountAsync(object);
    console.log("ACCOUNTBAL", res);
    // dto.CDBalance = res[0].availableBalance;
    if (res.length !== 0) {
      objectPath.set(dto, "CDBalance", res[0].availableBalance);
    } else {
      objectPath.set(dto, "CDBalance", "0");
    }
    setButton(true);
  };
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Input",
            label: "Customer ID",
            value: "ProposerDetails.CustomerID",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Customer GST Number",
            value: "ProposerDetails.GSTLocation",
            visible: true,
            onBlurFuncs: [IsGstNo],
          },
          {
            type: "AutoComplete",
            label: "Type of Business",
            visible: true,
            value: "ProposerDetails.BusinessType",
            options: masters.BusinessType,
          },
          {
            type: "Input",
            label: "First Name",
            value: "ProposerDetails.FirstName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Last Name",
            value: "ProposerDetails.LastName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Initials",
            value: "ProposerDetails.Initials",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Maiden Name",
            value: "ProposerDetails.MaidenName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "AutoComplete",
            label: "Marital Status",
            visible: true,
            value: "ProposerDetails.MaritalStatus",
            options: masters.MaritalStatus,
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "ProposerDetails.ProposerDOB",

            visible: true,
          },
          {
            type: "Input",
            label: "Contact No.",
            value: "ProposerDetails.ContactNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "ProposerDetails.MobileNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Telephone No.",
            value: "ProposerDetails.TelephoneNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "WhatsApp No.",
            value: "ProposerDetails.WhatsAppNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Primary Email ID",
            value: "ProposerDetails.EmailID",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Other Email ID",
            value: "ProposerDetails.AlternateEmailID",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN No.",
            value: "ProposerDetails.PANNo",
            visible: true,
            onBlurFuncs: [IsPan],
          },
          {
            type: "Input",
            label: "TAN No.",
            value: "ProposerDetails.TANNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
          },
          {
            type: "RadioGroup",
            visible: true,
            justifyContent: "space-between",
            radioLabel: {
              label: "Form 60/61",
              labelVisible: true,
            },
            radioList: [
              { value: "Applicable", label: "Applicable" },
              { value: "NotApplicable", label: "Not Applicable" },
            ],
            value: "Form60/61",
            required: true,
            spacing: 4,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 5,
          },
          {
            type: "RadioGroup",
            visible: true,
            justifyContent: "space-between",
            radioLabel: {
              label: "PAN No/Form 60/61",
              labelVisible: true,
            },
            radioList: [
              { value: "Applicable", label: "Applicable" },
              { value: "NotApplicable", label: "Not Applicable" },
            ],
            value: "PANNo/Form60/61",
            required: true,
            spacing: 4.5,
          },
          {
            type: "Typography",
            label: "Home/Office Address",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "ProposerDetails.PermanentAddress.Address1",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "ProposerDetails.PermanentAddress.Address2",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "ProposerDetails.PermanentAddress.Address3",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "ProposerDetails.PermanentAddress.Address4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            value: "ProposerDetails.PermanentAddress.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "ProposerDetails.PermanentAddress.State",

            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "ProposerDetails.PermanentAddress.Pincode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "ProposerDetails.PermanentAddress.MobileNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Land Line No.",
            value: "ProposerDetails.PermanentAddress.LandlineNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Typography",
            label: "Mailing Address",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "ProposerDetails.CommunicationAddress.Address1",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "ProposerDetails.CommunicationAddress.Address2",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "ProposerDetails.CommunicationAddress.Address3",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "ProposerDetails.CommunicationAddress.Address4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            value: "ProposerDetails.CommunicationAddress.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "ProposerDetails.CommunicationAddress.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "ProposerDetails.CommunicationAddress.Pincode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "ProposerDetails.CommunicationAddress.MobileNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Land Line No.",
            value: "ProposerDetails.CommunicationAddress.LandlineNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Input",
            label: "Bank Name",
            value: "BankDetails.BankName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Bank Branch Code",
            value: "BankDetails.BankBranchCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "IFSC Code",
            value: "BankDetails.IFSCCode",
            visible: true,
            onBlurFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "MICR Code",
            value: "BankDetails.MICRCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Bank A/c No.",
            value: "BankDetails.AccountNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Bank Account Type",
            value: "BankDetails.AccountType",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
        ],
        [
          {
            type: "Input",
            label: "Intermediary Code",
            value: "Channel.IntermediaryCode",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Intermediary Name",
            value: "Channel.IntermediaryName",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "PAN No.",
            value: "Channel.PANNo",
            visible: true,
            onBlurFuncs: [IsPan],
          },
          {
            type: "Input",
            label: "TAN No.",
            value: "Channel.TANNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "CIN No.",
            value: "Channel.CINNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "Channel.MobileNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Toll Free No.",
            value: "Channel.TollFreeNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Email ID ",
            value: "Channel.EmailID",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Email ID (for Policy Print)",
            value: "Channel.EmailIDPolicyPrint",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Bank Name",
            value: "Channel.BankName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Bank Branch Name",
            value: "Channel.BankBranchCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "IFSC Code",
            value: "Channel.IFSCCode",
            visible: true,
            onBlurFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "MICR Code",
            value: "Channel.MICRCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Bank A/C No.",
            value: "Channel.BankAccountNo",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Bank Account Type",
            value: "Channel.BankAccountType",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
        ],
        [
          {
            type: "Input",
            label: "Office Location",
            value: "OfficeLocationDetails.OfficeLocation",
            visible: true,
            // required: true,
          },
          {
            type: "Input",
            label: "Office Location Code",
            value: "OfficeLocationDetails.LocationCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "New Location Code",
            value: "OfficeLocationDetails.OtherLocationCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Office Zone",
            value: "OfficeLocationDetails.Zone",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Office Region",
            value: "OfficeLocationDetails.Region",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Office Location",
            value: "OfficeLocationDetails.OfficeLocation",
            visible: true,
          },
          {
            type: "Input",
            label: "Office Location Type",
            value: "OfficeLocationDetails.LocationType",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "MDDatePicker",
            label: "Start Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "OfficeLocationDetails.StartDate",
            visible: true,
          },
          {
            type: "MDDatePicker",
            label: "End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "OfficeLocationDetails.EndDate",
            visible: true,
          },
          {
            type: "Input",
            label: "Closed",
            value: "OfficeLocationDetails.Closed",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Email Id",
            value: "OfficeLocationDetails.EmailId",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Office Location Address Line1",
            value: "OfficeLocationDetails.AddressLine1",
            visible: true,
          },
          {
            type: "Input",
            label: "Office Location Address Line2",
            value: "OfficeLocationDetails.AddressLine2",
            visible: true,
          },
          {
            type: "Input",
            label: "Office Location Address Line3",
            value: "OfficeLocationDetails.AddressLine3",
            visible: true,
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "OfficeLocationDetails.Pincode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "City/District",
            value: "OfficeLocationDetails.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "OfficeLocationDetails.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Office Location Telephone No.",
            value: "OfficeLocationDetails.TelephoneNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Mobile No.",
            value: "OfficeLocationDetails.TelephoneNo",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "TAN No.",
            value: "OfficeLocationDetails.TanNo",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "GST No.",
            value: "OfficeLocationDetails.GSTNumber",
            visible: true,
            onBlurFuncs: [IsGstNo],
          },
          {
            type: "Input",
            label: "GST Office Location",
            value: "OfficeLocationDetails.GSTOfficeLocation",
            visible: true,
            // required: true,
          },
          {
            type: "Input",
            label: "Relationship Manager",
            value: "OfficeLocationDetails.Manager",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
            // required: true,
          },
          {
            type: "Input",
            label: "Business Source Type",
            value: "Channel.BusinessSourceType",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
            // required: true,
          },

          {
            type: "AutoComplete",
            label: "Business Channel Type",
            visible: true,
            value: "Channel.BusinessChannelType",
            options: masters.BusinessChannel,
          },
          {
            type: "Input",
            label: "Business Channel Name",
            value: "Channel.BusinessChannelName",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Relationship Code",
            value: "Channel.RelationshipCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
        ],
        [
          {
            type: "MDDatePicker",
            label: "Proposal Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "ProposalDate",
            visible: true,
            // required: true,
            maxDate: new Date(),
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "PolicyStartDate",
            visible: true,
            // required: true,
          },
          {
            type: "MDTimePicker",
            label: "Policy Start Time",
            visible: true,
            value: "PolicyStartTime",
            // required: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "PolicyEndDate",
            visible: true,
            // required: true,
          },
          {
            type: "MDTimePicker",
            label: "Policy End Time",
            visible: true,
            value: "PolicyEndTime",
          },
          {
            type: "Input",
            label: "Social Sector Details",
            value: "SocialSectorDetails",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Inward Number",
            value: "InwardNumber",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Service Tax Exemption Category",
            visible: true,
            value: "ServiceTaxExemptioncategory",
            options: masters.ServiceTaxExemptioncategory,
            // customOnChange: handleGST,
            required: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Financier Name",
            value: "AdditionalDetails.FinancierDetails.0.BankName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Bank Branch",
            value: "AdditionalDetails.FinancierDetails.0.BankBranchCode",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Bank Location",
            value: "AdditionalDetails.FinancierDetails.0.BankLocation",
            visible: true,
          },
          {
            type: "Input",
            label: "Bank Account Number",
            value: "AdditionalDetails.FinancierDetails.0.AccountNo",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "IFSC Code",
            value: "AdditionalDetails.FinancierDetails.0.IFSCCode",
            visible: true,
            onBlurFuncs: [IsAlphaNum],
          },
        ],
        [
          {
            type: "Input",
            label: "TPA Code",
            value: "AdditionalDetails.TPADetails.TPACode",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "TPA Name",
            value: "AdditionalDetails.TPADetails.TPAName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
        ],
        [
          {
            type: "Input",
            label: "Risk SI Component",
            value: "RiskCoverDetails.RiskSIComponent",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "No. of Lives",
            value: "RiskCoverDetails.NoofLives",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Sum Insured",
            value: "RiskCoverDetails.SumInsured",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Premium",
            value: "RiskCoverDetails.Premium",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Differential SI",
            value: "RiskCoverGroup.DifferentialSI",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Endorsement Amount",
            value: "RiskCoverGroup.EndorsementAmount",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Net Premium",
            value: "RiskCoverGroup.NetPremium",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Service Tax/GST",
            value: "RiskCoverGroup.ServiceTax/GST",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Stamp Duty",
            visible: true,
            value: "RiskCoverGroup.StampDuty",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Total Premium",
            value: "RiskCoverGroup.TotalPremium",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Form of Communiation",
            visible: true,
            value: "CommunicationMatrixDetails.FormOfCommunication",
            options: masters.FormOfCommunication,
            // required: true,
          },
          {
            type: "Typography",
            label: "If Physical Document:",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Recipient Name",
            value: "CommunicationMatrixDetails.PhysicalDocument.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            value: "CommunicationMatrixDetails.PhysicalDocument.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "CommunicationMatrixDetails.PhysicalDocument.AddressLine1",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "CommunicationMatrixDetails.PhysicalDocument.AddressLine2",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "CommunicationMatrixDetails.PhysicalDocument.AddressLine3",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "CommunicationMatrixDetails.PhysicalDocument.AddressLine4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            value: "CommunicationMatrixDetails.PhysicalDocument.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "CommunicationMatrixDetails.PhysicalDocument.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "CommunicationMatrixDetails.PhysicalDocument.PinCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Typography",
            label: "If Soft Copy:",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Corporate HR Name",
            value: "CommunicationMatrixDetails.SoftCopy.0.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Corporate HR Email ID",
            value: "CommunicationMatrixDetails.SoftCopy.0.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Corporate HR Mobile No.",
            value: "CommunicationMatrixDetails.SoftCopy.0.MobileNumber",
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
            visible: true,
          },
          {
            type: "Input",
            label: "Sub HR Name",
            value: "CommunicationMatrixDetails.SoftCopy.1.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Sub HR Email ID",
            value: "CommunicationMatrixDetails.SoftCopy.1.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Sub HR Mobile No.",
            value: "CommunicationMatrixDetails.SoftCopy.1.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Broker Name",
            value: "CommunicationMatrixDetails.SoftCopy.2.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Broker Email ID",
            value: "CommunicationMatrixDetails.SoftCopy.2.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Broker Mobile No.",
            value: "CommunicationMatrixDetails.SoftCopy.2.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "RM Name",
            value: "CommunicationMatrixDetails.SoftCopy.3.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "RM Email ID",
            value: "CommunicationMatrixDetails.SoftCopy.3.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "RM Mobile No.",
            value: "CommunicationMatrixDetails.SoftCopy.3.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          // {
          //   type: "Input",
          //   label: "Others Name",
          //   value: "CommunicationMatrixDetails.SoftCopy.4.Name",
          //   visible: true,
          //   onBlurFuncs: [IsAlphaSpace],
          // },
          // {
          //   type: "Input",
          //   label: "Others Email",
          //   value: "CommunicationMatrixDetails.SoftCopy.4.Email",
          //   visible: true,
          //   onBlurFuncs: [IsEmail],
          // },
          // {
          //   type: "Input",
          //   label: "Others Mobile",
          //   value: "CommunicationMatrixDetails.SoftCopy.4.MobileNumber",
          //   visible: true,
          //   onBlurFuncs: [IsMobileNumber],
          //   InputProps: { maxLength: 10 },
          // },
          {
            type: "Input",
            label: " Wellness Service Provider Name",
            value: "AdditionalDetails.WellnessServiceProviderDetails.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Wellness Service Provider Email ID",
            value: "AdditionalDetails.WellnessServiceProviderDetails.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Wellness Service Provider Mobile No.",
            value: "AdditionalDetails.WellnessServiceProviderDetails.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "TPA Administrator Name",
            value: "AdditionalDetails.ThirdPartyAdministratorDetails.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "TPA Administrator Email ID",
            value: "AdditionalDetails.ThirdPartyAdministratorDetails.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "TPA Administrator Mobile No.",
            value: "AdditionalDetails.ThirdPartyAdministratorDetails.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: <Communication dto={dto} matrixdisable={matrixdisable} />,
          },
        ],
      ];

      break;
    case 2:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Master Policy",
            visible: true,
            value: "MasterPolicy",
            options: masters.Masterpolicy,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Policy Cover Type",
            visible: true,
            value: "PolicyCoverType",
            options: masters.PolicyCoverType,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Individual Certificate Required",
            visible: true,
            value: "IndividualCertificateRequired",
            options: masters.IndividualCertificateRequired,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Certificate Type",
            visible: true,
            value: "CertificateType",
            options: masters.CertificateType,
            // required: true,
          },
          {
            type: "Input",
            label: "Type of Group",
            value: "TypeofGroup",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Scheme Classification",
            visible: true,
            value: "SchemeClassification",
            options: masters.SchemeClassification,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "RI Bussiness Type",
            visible: true,
            value: "RIBusinessType",
            options: masters.RIBusinessType,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Re-Insurance Case",
            visible: true,
            value: "ReInsuranceCase",
            options: masters.SelfCovered,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Policy Type",
            visible: true,
            value: "PolicyType",
            options: masters.PolicyType,
            // required: true,
          },
          {
            type: "Input",
            label: "Minimum Age (in days) for Child",
            value: "AdditionalDetails.Dependents.0.MiniAgeforChildInDays",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Minimum Age (in years) for Child",
            value: "AdditionalDetails.Dependents.0.MiniAgeforChildInYear",
            visible: true,
            onChangeFuncs: [IsNumeric],

            // required: true,
          },
          {
            type: "Input",
            label: "Maximum Age (in years) for Child",
            value: "AdditionalDetails.Dependents.0.MaxAgeforChildInYear",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Minimum Age (in days)",
            value: "AdditionalDetails.Dependents.0.MiniAgeInDays",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Minimum Age (in years)",
            value: "AdditionalDetails.Dependents.0.MiniAgeInYear",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Maximum Age (in years)",
            value: "AdditionalDetails.Dependents.0.MaxAgeInYear",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Maximum Family Size",
            value: "InsuredDetails.FamilySize",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Self Covered",
            visible: true,
            value: "SelfCovered",
            options: masters.SelfCovered,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Dependent Covered",
            visible: true,
            value: "DependentAllowed",
            options: masters.SelfCovered,
            // required: true,
          },
          {
            type: "Input",
            label: "No. of dependent (Per Family)",
            value: "NoOfDependentCovered",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },

          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Typography",
            label: "Allowed Dependent Relationships",
            visible: true,
            variant: "h6",
            spacing: 3.5,
          },
          {
            type: "Typography",
            label: "No. of times Dependents allowed",
            visible: true,
            variant: "h6",
            spacing: 3.5,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 4,
          },
          ...spreadAddMembersQuestionarie(),
        ],
        [
          {
            type: "Input",
            label: "Total No. of Self",
            value: "AdditionalDetails.IssuedCertificateDetails.TotalNoofSelf",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Total No. of Dependents",
            value: "AdditionalDetails.IssuedCertificateDetails.TotalNoofDependents",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Total No. of Lives",
            value: "AdditionalDetails.IssuedCertificateDetails.TotalNoOfLives",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "No. of Lives Added in Endorsement",
            value: "AdditionalDetails.IssuedCertificateDetails.NumbersofLivesAddedinEndorsment",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "No. of Lives Modified in Endorsement",
            value: "AdditionalDetails.IssuedCertificateDetails.NumbersofLivesModifiedinEndorsment",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "No. of Lives Deleted in Endorsement",
            value: "AdditionalDetails.IssuedCertificateDetails.NumbersofLivesDeletedinEndorsment",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Addition Premium Amount",
            value: "AdditionalDetails.IssuedCertificateDetails.AddtionPremiumAmount",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Deletion Premium Amount",
            value: "AdditionalDetails.IssuedCertificateDetails.DeletionPremiumAmount",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Maximum Risk Serial No. of Members",
            value: "AdditionalDetails.IssuedCertificateDetails.MaximumRiskSerialNumbersofMembers",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            justifyContent: "space-between",
            // visible:ProposerDetails.BusinessType !== "Rollover",
            visible: true,
            variant: "h6",
            radioLabel: {
              label: "Previous Insurance History?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "true" },
              { label: "No ", value: "false" },
            ],
            value: "SectionID",
            spacing: 5,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 7,
          },
          {
            type: "Input",
            label: "Previous Insurance Policy Type",
            visible: dto.SectionID === "true",
            value: "AdditionalDetails.PastPolicyDetails.PreviousInsurancePolicyType",
          },
          {
            type: "Input",
            label: "Previous Insurer Name",
            visible: dto.SectionID === "true",
            options: masters.SelfCovered,
            onChangeFuncs: [IsAlphaSpace],
            value: "AdditionalDetails.PastPolicyDetails.PreviousInsurerName",
          },
          {
            type: "Input",
            label: "Previous Insurer Address",
            value: "AdditionalDetails.PastPolicyDetails.PreviousInsurerAddress",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Policy Number",
            value: "AdditionalDetails.PastPolicyDetails.PolicyNumber",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "MDDatePicker",
            label: "Previous Policy Start Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "AdditionalDetails.PastPolicyDetails.PreviousPolicyStartdate",
            visible: dto.SectionID === "true",
          },
          {
            type: "MDDatePicker",
            label: "Previous Policy End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            value: "AdditionalDetails.PastPolicyDetails.PreviousPolicyEnddate",
            visible: dto.SectionID === "true",
          },
          {
            type: "Input",
            label: "No. Of Claim",
            value: "AdditionalDetails.PastPolicyDetails.NoOfClaim",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Quantum of Claim",
            value: "AdditionalDetails.PastPolicyDetails.QuantumofClaim",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Incurred Claim Ratio",
            value: "AdditionalDetails.PastPolicyDetails.IncurredClaimRatio",
            visible: dto.SectionID === "true",
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Checkbox",
            label: "Sales tax to be paid by the leader",
            value: "AdditionalDetails.CoinsuranceDetails.Salestaxtobepaidbytheleader",
            checkedVal: "Yes",
            unCheckedVal: "No",
            visible: true,
            variant: "h6",

            spacing: 10,
          },
          {
            type: "Checkbox",
            label: "Full commission to be paid by the leader",
            value: "AdditionalDetails.CoinsuranceDetails.Fullcommissiontobepaidbytheleader",
            checkedVal: "true",
            unCheckedVal: "false",
            visible: true,
            variant: "h6",
            // required: true,
            spacing: 10,
          },
          {
            type: "Checkbox",
            label: "S. Tax to be paid by leader",
            value: "AdditionalDetails.CoinsuranceDetails.STaxtobepaidbyleader",
            checkedVal: "true",
            unCheckedVal: "false",
            visible: true,
            variant: "h6",
            // required: true,
            spacing: 10,
          },
          {
            type: "Input",
            label: "Coinsurance Type",
            visible: true,
            value: "AdditionalDetails.CoinsuranceDetails.CoinsuranceType",
            // required: true,
          },
          {
            type: "Input",
            label: "Policy No. of the Leader",
            value: "AdditionalDetails.CoinsuranceDetails.PolicyNoofTheLeader",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "AutoComplete",
            label: "Insurance Company",
            visible: true,
            value: "AdditionalDetails.CoinsuranceDetails.InsuranceCompany",
            // required: true,
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Branch",
            value: "AdditionalDetails.CoinsuranceDetails.Branch",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            // required: true,
          },
          {
            type: "Input",
            label: "Address",
            value: "AdditionalDetails.CoinsuranceDetails.Address",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            // required: true,
          },
          {
            type: "Input",
            label: "Office Code",
            value: "AdditionalDetails.CoinsuranceDetails.OfficeCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "Input",
            label: "Share(%)",
            value: "AdditionalDetails.CoinsuranceDetails.Share",
            visible: true,
            onChangeFuncs: [IsNumeric],
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Coinsurer Type",
            visible: true,
            value: "AdditionalDetails.CoinsuranceDetails.CoinsurerType",
            options: masters.CoinsurerType,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Administrative Charges(%)",
            visible: true,
            value: "AdditionalDetails.CoinsuranceDetails.AdministrativeCharges",
            options: masters.AdministrativeCharges,
            // required: true,
            onChangeFuncs: [IsNumeric],
          },
        ],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "Input",
            label: "Employee / Corporate Name",
            value: "CorporateDeatils.Corporate.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
            required: true && ClaimsUser,
          },
          {
            type: "Input",
            label: "Mode oF Payment",
            value: "PaymentDetails.PaymentMode",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
            required: true && ClaimsUser,
          },
          {
            type: "AutoComplete",
            label: "Frequency Of Payment",
            visible: true,
            value: "PaymentDetails.Frequency",
            options: masters.Frequency,
            required: true && ClaimsUser,
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Input",
            label: "Financier Name",
            placeholder: "Enter",
            value: "AdditionalDetails.ClaimFinancierDetails.0.FinancierName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "AutoComplete",
            label: "Bank Name",
            visible: true,
            options: BankMaster,
            value: "AdditionalDetails.ClaimFinancierDetails.0.BankName",
            customOnChange: (e, a) => handleBranch(e, a),
            // onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "AutoComplete",
            label: "Bank Branch",
            value: "AdditionalDetails.ClaimFinancierDetails.0.BankBranch",
            visible: true,
            options: Branch,
            customOnChange: (e, a) => handleBranchdetails(e, a),
            // onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Bank Location",
            placeholder: "Enter",
            value: "AdditionalDetails.ClaimFinancierDetails.0.BankLocation",
            visible: true,
            // onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Account Number",
            placeholder: "Enter",
            value: "AdditionalDetails.ClaimFinancierDetails.0.AccountNo",
            visible: true,
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "IFSC Code",
            placeholder: "Enter",
            value: "AdditionalDetails.ClaimFinancierDetails.0.IFSCCode",
            visible: true,
            onBlurFuncs: [IsAlphaNum],
          },
        ],
        [
          {
            type: "Typography",
            label: "Corporate HR Details",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Corporate HR Name",
            value: "AdditionalDetails.CorporateDeatils.Corporate.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Corporate HR EmailID",
            value: "AdditionalDetails.CorporateDeatils.Corporate.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Corporate HR Mobile No.",
            value: "AdditionalDetails.CorporateDeatils.Corporate.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "AdditionalDetails.CorporateDeatils.Corporate.AddressLine1",
            visible: true,
            // onBlurFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "AdditionalDetails.CorporateDeatils.Corporate.AddressLine2",
            visible: true,
            // onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "AdditionalDetails.CorporateDeatils.Corporate.AddressLine3",
            visible: true,
            // onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "AdditionalDetails.CorporateDeatils.Corporate.AddressLine4",
            visible: true,
            // onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "City/District",
            value: "AdditionalDetails.CorporateDeatils.Corporate.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "AdditionalDetails.CorporateDeatils.Corporate.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "AdditionalDetails.CorporateDeatils.Corporate.PinCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Corporate HR 2 Name",
            value: "AdditionalDetails.CorporateDeatils.Corporate.OtherName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Corporate HR 2 EmailID",
            value: "AdditionalDetails.CorporateDeatils.Corporate.OtherEmail",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Corporate HR 2 Mobile No.",
            value: "AdditionalDetails.CorporateDeatils.Corporate.OtherMobile",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Typography",
            label: "Broker",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Broker Name",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Broker EmailID",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Broker Mobile No.",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.AddressLine1",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.AddressLine2",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.AddressLine3",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.AddressLine4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "AdditionalDetails.CorporateDeatils.BrokerDetails.PinCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Form Of Communication",
            visible: true,
            value: "InsurableItem.0.RiskItems.0.Gender",
          },
          {
            type: "Input",
            label: "Corporate HR Name",
            value: "CorporateDeatils.Corporate.HRName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Corporate HR EmailID",
            value: "CorporateDeatils.Corporate.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Corporate HR Mobile No.",
            value: "CorporateDeatils.Corporate.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "CorporateDeatils.Corporate.AddressLine1",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "CorporateDeatils.Corporate.AddressLine2",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "CorporateDeatils.Corporate.AddressLine3",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "CorporateDeatils.Corporate.AddressLine4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            value: "CorporateDeatils.Corporate.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "CorporateDeatils.Corporate.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "CorporateDeatils.Corporate.PinCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Corporate HR 2 Name",
            value: "CorporateDeatils.Corporate.OtherName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Corporate HR 2 EmailID",
            value: "CorporateDeatils.Corporate.OtherEmail",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Corporate HR 2 Mobile No.",
            value: "CorporateDeatils.Corporate.OtherMobile",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Typography",
            label: "Broker",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Broker Name",
            value: "CorporateDeatils.BrokerDeatils.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Broker EmailID",
            value: "CorporateDeatils.BrokerDeatils.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Broker Mobile No.",
            value: "CorporateDeatils.BrokerDeatils.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "CorporateDeatils.BrokerDeatils.AddressLine1",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "CorporateDeatils.BrokerDeatils.AddressLine2",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "CorporateDeatils.BrokerDeatils.AddressLine3",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "CorporateDeatils.BrokerDeatils.AddressLine4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            value: "CorporateDeatils.BrokerDeatils.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            value: "CorporateDeatils.BrokerDeatils.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            value: "CorporateDeatils.BrokerDeatils.PinCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 4,
          },
          {
            type: "Input",
            label: "Any Other Details for Card Printing",
            value: "InsurableItem.0.RiskItems.0.MobileNumber",
            visible: true,
            onChangeFuncs: [IsAlphaSpace],
            spacing: 6,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Form of Communication",
            visible: true,
            placeholder: "Select",
            value: "ClaimsUserDetails.FormOfCommunication",
          },
          {
            type: "Typography",
            label: "If Physical Document:",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Recipient Name",
            value: "ClaimsUserDetails.PhysicalDocument.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Contact Number",
            value: "ClaimsUserDetails.PhysicalDocument.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address Line 1",
            value: "ClaimsUserDetails.PhysicalDocument.AddressLine1",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 2",
            value: "ClaimsUserDetails.PhysicalDocument.AddressLine2",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 3",
            value: "ClaimsUserDetails.PhysicalDocument.AddressLine3",
            visible: true,
          },
          {
            type: "Input",
            label: "Address Line 4",
            value: "ClaimsUserDetails.PhysicalDocument.AddressLine4",
            visible: true,
          },
          {
            type: "Input",
            label: "City/District",
            placeholder: "Enter%",
            value: "ClaimsUserDetails.PhysicalDocument.City",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            placeholder: "Enter%",
            value: "ClaimsUserDetails.PhysicalDocument.State",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Pin Code",
            placeholder: "Enter%",
            value: "ClaimsUserDetails.PhysicalDocument.PinCode",
            visible: true,
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Typography",
            label: "If Soft Copy:",
            visible: true,
            variant: "h6",
            spacing: 12,
          },
          {
            type: "Input",
            label: "Corporation HR Name",
            value: "ClaimsUserDetails.SoftCopy.0.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Corporation HR EmailID",
            value: "ClaimsUserDetails.SoftCopy.0.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Corporation HR Mobile No.",
            value: "ClaimsUserDetails.SoftCopy.0.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Sub HR Name",
            value: "ClaimsUserDetails.SoftCopy.1.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Sub HR EmailID",
            value: "ClaimsUserDetails.SoftCopy.1.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Sub HR Mobile No.",
            value: "ClaimsUserDetails.SoftCopy.1.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Broker Name",
            value: "ClaimsUserDetails.SoftCopy.2.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Broker EmailID",
            value: "ClaimsUserDetails.SoftCopy.2.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Broker Mobile No.",
            value: "ClaimsUserDetails.SoftCopy.2.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "RM Name",
            value: "ClaimsUserDetails.SoftCopy.3.Name",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "RM EmailID",
            value: "ClaimsUserDetails.SoftCopy.3.Email",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "RM Mobile No.",
            value: "ClaimsUserDetails.SoftCopy.3.MobileNumber",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
        ],
        [
          {
            type: "Input",
            label: "Wellness Service Provider Name",
            value: "ClaimsUserDetails.WellnessServiceProvider.WellnessServiceproviderName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Wellness Service Provider EmailID",
            value: "ClaimsUserDetails.WellnessServiceProvider.WellnessServiceprovideremailID",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Wellness Service Provider Mobile No.",
            value: "ClaimsUserDetails.WellnessServiceProvider.WellnessServiceprovidermobileno",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
        ],
        [
          {
            type: "Input",
            label: "Third Party Administrator Name",
            value: "ClaimsUserDetails.ThirdPartyAdministrator.ThirdPartyAdministratorName",
            visible: true,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Third Party Administrator EmailID",
            value: "ClaimsUserDetails.ThirdPartyAdministrator.ThirdPartyAdministratoremailID",
            visible: true,
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "Third Party Administrator  Mobile No.",
            value: "ClaimsUserDetails.ThirdPartyAdministrator.ThirdPartyAdministratormobileno",
            visible: true,
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
        ],
        [
          {
            type: "Custom",
            visible: true,
            value: "CommunicationMatrix",
            spacing: 12,
            return: <CommunicationMatrix dto={dto} />,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 11,
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "RadioGroup",
            visible: true,
            justifyContent: "space-between",
            radioLabel: {
              label: "Calculation type",
              labelVisible: true,
            },
            radioList: [
              {
                value: "Short Term",
                label: "Short Term",
              },
              {
                value: "Pro-Rata",
                label: "Pro-Rata",
              },
            ],
            value: "CalculationType",
            required: true && OperatorUser,
            spacing: 7,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 5,
          },
          {
            type: "RadioGroup",
            visible: true,
            justifyContent: "space-between",
            radioLabel: {
              label: "Relationship Cross Selection Allowed",
              labelVisible: true,
            },
            radioList: [
              {
                value: "Yes",
                label: "Yes",
              },
              {
                value: "No",
                label: "No",
              },
            ],
            value: "RelationshipCrossSection",
            spacing: 6,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 6,
            required: true,
          },
          {
            type: "Input",
            label: "Back-dation No. of days allowed",
            value: "BackdationNoofDaysAllowed",
            visible: true,
            onChangeFuncs: [IsNumeric],
            required: true && OperatorUser,
          },
          {
            type: "Input",
            label: "Grace No. of days for COI Cancellation(Installment)",
            value: "GracenoofDaysforCOICancellation",
            visible: true,
            spacing: 3.3,
            onChangeFuncs: [IsNumeric],
            required: true && OperatorUser,
          },
          {
            type: "Input",
            label: "Grace No. of days for COI Cancellation(Renewal)",
            value: "GracenoofDaysforCOICancellationRenewal",
            visible: true,
            onChangeFuncs: [IsNumeric],
            required: true && OperatorUser,
          },
        ],
        [
          {
            type: "Input",
            label: "Percentage Permium Employer Contribution",
            value: "PremiumEmployerContribution",
            visible: true,
            customOnChange: (e) => handleCalc(e, "PremiumEmployerContribution"),
            onChangeFuncs: [IsNumeric],
          },
          {
            type: "Input",
            label: "Percentage Permium Employee Contribution ",
            value: "PremiumEmployeeContribution",
            visible: true,
            customOnChange: (e) => handleCalc(e, "PremiumEmployeeContribution"),
            disabled: true,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Installment Case",
            visible: true,
            value: "InstallmentCase",
            options: masters.InstallmentCase,
            required: true && OperatorUser,
          },

          {
            type: "AutoComplete",
            label: "Installment Frequency",
            visible: dto.InstallmentCase === "Yes",
            value: "InstallmentFrequency",
            options: masters.InstallmentFrequency,
            required: true && OperatorUser,
          },
        ],
        [
          {
            type: "RadioGroup",
            justifyContent: "space-between",
            visible: true,
            variant: "h6",
            radioLabel: {
              label: "Additional Important Information",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "true" },
              { label: "No ", value: "false" },
            ],
            value: "AdditionalImpInfo",
            required: true && OperatorUser,
            spacing: 5,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 7,
          },
          {
            type: "Input",
            label: "Special Condition 01",
            value: "AdditionalDetails.SpecialConditions.0.SpecialCondition1",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 01 Value",
            value: "AdditionalDetails.SpecialConditions.0.SpecialConditionvalue1",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Special Condition 02",
            value: "AdditionalDetails.SpecialConditions.1.SpecialCondition2",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 02 Value",
            value: "AdditionalDetails.SpecialConditions.1.SpecialConditionvalue2",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Special Condition 03",
            value: "AdditionalDetails.SpecialConditions.2.SpecialCondition3",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 03 Value",
            value: "AdditionalDetails.SpecialConditions.2.SpecialConditionvalue3",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Special Condition 04",
            value: "AdditionalDetails.SpecialConditions.3.SpecialCondition4",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 04 Value",
            value: "AdditionalDetails.SpecialConditions.3.SpecialConditionvalue4",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
          },
          {
            type: "Input",
            label: "Special Condition 05",
            value: "AdditionalDetails.SpecialConditions.4.SpecialCondition5",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
            spacing: 6,
          },
          {
            type: "Input",
            label: "Special Condition 05 Value",
            value: "AdditionalDetails.SpecialConditions.4.SpecialConditionvalue5",
            visible: dto.AdditionalImpInfo === "true",
            onChangeFuncs: [IsAlphaNum],
          },
          // ...SpecialConditions(),
        ],
        [
          {
            type: "Input",
            label: "CD Account Number",
            value: "CDAccountNumber",
            visible: true,
            // onChangeFuncs: [IsAlphaNum],
            required: true && OperatorUser,
          },
          {
            type: "Button",
            label: "Search",
            value: "SearchCDBalance",
            visible: true,
            variant: "contained",
            color: "primary",
            align: "right",
            spacing: 1.2,
            onClick: handleSearchButton,
            // loader: "backDrop",
            // disabled:
            //   underwriter || ClaimsUser || (OperatorUser && dto.operationsStatus === "Updated"),
          },
          {
            type: "Input",
            label: "CD Balance",
            value: "CDBalance",
            visible: button,
            // onChangeFuncs: [IsNumeric],
            required: true && OperatorUser,
            disabled: true,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 11,
          },
        ],
      ];
      break;

    case 4:
      data = [
        [
          // {
          //   type: "Custom",
          //   visible: true,
          //   value: "GHDApplicable",
          //   spacing: 11,
          //   return: (
          //     <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" mt={1} m={0}>
          //       <Stack direction="row" justifyContent="space-between" p={1}>
          //         <MDTypography sx={{ fontSize: 18 }}>
          //           Is GHD Applicable or non Applicable for this Master Policy ?
          //         </MDTypography>
          //         <RadioGroup
          //           row
          //           aria-labelledby="demo-row-radio-buttons-group-label"
          //           name="row-radio-buttons-group"
          //           value="GHDApplicale"
          //           sx={{ ml: "50px" }}
          //           onChange={handleRadiobuttonTypeChange}
          //         >
          //           <FormControlLabel
          //             value="Applicable"
          //             control={<Radio />}
          //             label="Applicable"
          //             checked={radiobuttonflag === true}
          //             disabled={
          //               (MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
          //                 dto.underWriterStatus === "Updated") ||
          //               OperatorUser ||
          //               ClaimsUser
          //             }
          //           />
          //           <FormControlLabel
          //             value="NonApplicable"
          //             control={<Radio />}
          //             label="Non Applicable"
          //             checked={radiobuttonflag === false}
          //             disabled={
          //               (MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
          //                 dto.underWriterStatus === "Updated") ||
          //               OperatorUser ||
          //               ClaimsUser
          //             }
          //           />
          //         </RadioGroup>
          //       </Stack>
          //     </Grid>
          //   ),
          // },
          {
            type: "RadioGroup",
            justifyContent: "space-between",
            visible: true,
            variant: "h6",
            radioLabel: {
              label: "Is GHD Applicable or non Applicable for this Master Policy ?",
              labelVisible: true,
            },
            radioList: [
              {
                label: "Applicable",
                value: "Applicable",
              },
              {
                label: "NonApplicable",
                value: "NonApplicable",
              },
            ],
            value: "GHDApplicable",
            spacing: 11,
            required: true && underwriter,
            customOnChange: handleRadiobuttonTypeChange,
          },
          {
            type: "Typography",
            label: "Questionnaire",
            visible: dto.GHDApplicable === "Applicable",
            variant: "h6",
            spacing: 10,
          },
          {
            type: "Button",
            label: "+ Add Question",
            visible: dto.GHDApplicable === "Applicable",
            variant: "contained",
            color: "primary",
            value: "AddQuestion",
            align: "left",
            spacing: 2,
            onClick: handleAddQuestion,
          },
          ...spreadaddquestions(),
          // // {
          //   type: "Custom",
          //   visible: radiobuttonflag,
          //   spacing: 12,
          //   return: (
          //     <Grid container spacing={2}>
          //       <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" mt={1} m={0}>
          //         <Stack direction="row" justifyContent="space-between" p={0}>
          //           <MDTypography>Questionnaire</MDTypography>
          //           <Stack
          //             direction="row"
          //             spacing={2}
          //             justifyContent="flex-end"
          //             alignItems="center"
          //             mr={0}
          //           >
          //             <MDButton
          //               startIcon={<AddIcon />}
          //               color="error"
          //               variant="contained"
          //               spacing={2}
          //               onClick={handleAddQuestion}
          //               disabled={
          //                 (MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
          //                   dto.underWriterStatus === "Updated") ||
          //                 OperatorUser ||
          //                 ClaimsUser
          //               }
          //             >
          //               Add Question
          //             </MDButton>
          //           </Stack>
          //         </Stack>
          //       </Grid>
          //       {questinary.map((q, index) => (
          //         <>
          //           <Grid item xs={11} sm={11} md={11} lg={11} xl={11} xxl={11}>
          //             <MDInput
          //               sx={{ margin: "2px", height: "40" }}
          //               value={q.QText}
          //               onChange={(e) => handleQuestionChange(e, index, e.target.value)}
          //               disabled={
          //                 (MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
          //                   dto.underWriterStatus === "Updated") ||
          //                 OperatorUser ||
          //                 ClaimsUser
          //               }
          //             />
          //           </Grid>
          //           <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
          //             <MDBox
          //               sx={{
          //                 display: "flex",
          //                 border: "0.3px solid #Ff0000",
          //               }}
          //             >
          //               <IconButton
          //                 aria-label="delete"
          //                 color="error"
          //                 onClick={() => handleDelete(index)}
          //                 disabled={
          //                   (MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
          //                     dto.underWriterStatus === "Updated") ||
          //                   OperatorUser ||
          //                   ClaimsUser
          //                 }
          //               >
          //                 <DeleteIcon />
          //               </IconButton>
          //             </MDBox>
          //           </Grid>
          //         </>
          //       ))}
          //     </Grid>
          //   ),
          // },
          {
            type: "RadioGroup",
            justifyContent: "space-between",
            visible: true,
            variant: "h6",
            radioLabel: {
              label: "Is Section 80D Required?",
              labelVisible: true,
            },
            radioList: [
              {
                label: "Yes",
                value: "Yes",
              },
              {
                label: "No ",
                value: "No",
              },
            ],
            value: "Section80D",
            spacing: 7,
            required: true && underwriter,
          },
          {
            type: "RadioGroup",
            id: "radioGroupElementId",
            justifyContent: "space-between",
            visible: true,
            variant: "h6",
            radioLabel: {
              label: "Is GST Applicable?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes", disabled: true },
              { label: "No ", value: "No", disabled: true },
            ],
            value: "GST",
            spacing: 7,
            required: true && underwriter,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 5,
          },
          {
            type: "Custom",
            spacing: 4.5,
            visible: true,
            return: (
              <Typography
                variant="body1"
                sx={{
                  color: "#757575",
                  fontSize: "15px",
                }}
              >
                No. of days allowed for addition of Spouse
              </Typography>
            ),
          },
          {
            type: "Input",
            label: "No. of days allowed for addition of Spouse",
            value: "AdditionalDetails.DaysAllowedForSpouseAddition",
            visible: true,
            spacing: 3.2,
            onChangeFuncs: [IsNumeric],
            required: true && underwriter,
          },
        ],
        [
          {
            type: "Button",
            label: "+ Create New Plan",
            visible: dto.PlanDetailsJson.length > 0,
            variant: "contained",
            color: "primary",
            value: "CreateNewPlan",
            align: "right",
            spacing: 2,
            onClick: handleDrawerOpen,
          },
          {
            type: "Button",
            label: "Clone",
            visible: dto.PlanDetailsJson.length > 0,
            variant: "contained",
            color: "primary",
            align: "right",
            spacing: 1,
            value: "Clone",
            onClick: handleclonebutton,
          },
          {
            type: "Custom",
            visible: afterclone === true,
            spacing: 6,
            value: "PlanName",
            return: (
              <Grid item xs={6}>
                {" "}
                <Autocomplete
                  name="PlanName"
                  sx={styleAuto}
                  options={dto.PlanDetailsJson.map((item) => item.DisplayName)}
                  onChange={(event, value) => handleclone(event, value)}
                  renderInput={(op) => <TextField {...op} label="Plan Name" />}
                  required
                />{" "}
                {/* The selected plan name is stored in the `selectedPlanName` state variable */}{" "}
              </Grid>
            ),
          },
          {
            type: "Custom",
            visible: dto.PlanDetailsJson.length > 0,
            spacing: 12,
            return: (
              <Card>
                <MDBox sx={{ height: 400, width: "100%" }}>
                  <DataGrid rows={rows} columns={columns} />
                </MDBox>
              </Card>
            ),
          },
          {
            type: "Typography",
            visible: dto.PlanDetailsJson.length === 0,
            spacing: 4.8,
          },
          {
            type: "Img",
            visible: dto.PlanDetailsJson.length === 0,
            src: NoRecords,
            spacing: 2.3,
            align: "center",
          },
          {
            type: "Typography",
            visible: dto.PlanDetailsJson.length === 0,
            spacing: 4.5,
          },
          {
            type: "Typography",
            visible: dto.PlanDetailsJson.length === 0,
            spacing: 5.1,
          },
          {
            type: "Typography",
            label: "No Plans Were added",
            visible: dto.PlanDetailsJson.length === 0,
            variant: "h6",
            spacing: 2.2,
          },
          {
            type: "Typography",
            visible: dto.PlanDetailsJson.length === 0,
            spacing: 4.5,
          },
          {
            type: "Typography",
            visible: dto.PlanDetailsJson.length === 0,
            spacing: 5,
          },
          {
            type: "Button",
            label: "+ Create New Plan",
            visible: dto.PlanDetailsJson.length === 0,
            variant: "contained",
            value: "CreateNewPlan1",
            color: "primary",
            align: "right",
            spacing: 2.2,
            onClick: handleDrawerOpen,
          },
          {
            type: "Typography",
            visible: dto.PlanDetailsJson.length === 0,
            spacing: 5,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <PlanDetails
                dto={dto}
                planjson={planjson}
                setPlanjson={setPlanjson}
                open={open}
                setOpen={setOpen}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                // afterclone={afterclone}
                setAfterclone={setAfterclone}
                planname={planname}
                // setPlanname={setPlanname}
                rowid={rowid}
                // setrowId={setrowId}
                openDel={openDel}
                setDelOpen={setDelOpen}
                flagEdit={flagEdit}
                updatePlanName={updatePlanName}
                // setUpdatePlanName={setUpdatePlanName}
                flagviewDisabled={flagviewDisabled}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
                relationshipmaster={relationshipmaster}
                setadultrelationship={setadultrelationship}
                adultrelationship={adultrelationship}
                setRelationshipOption={setRelationshipOption}
                Relationshipoption={Relationshipoption}
                setFamilycombinationoption={setFamilycombinationoption}
                Familycombinationoption={Familycombinationoption}
                setAdultfamilycombination={setAdultfamilycombination}
                adultFamilyCombintaion={adultFamilyCombintaion}
                setPersonalAccidentSelected={setPersonalAccidentSelected}
                personalAccidentSelected={personalAccidentSelected}
                familycombination={familycombination}
              />
            ),
          },
        ],
      ];
      break;
    default:
      data = [[], []];
  }
  return data;
};

const getOnNextClick = async (activeStep, a, b, dto) => {
  let fun = false;
  let MasterPolicyDto = {};
  let det = {};
  let effectiveFromDate = objectPath.get(dto, "PolicyStartDate");
  let effectiveToDate = objectPath.get(dto, "PolicyEndDate");
  effectiveFromDate = moment(effectiveFromDate, "DD/MM/YYYY").format("MM/DD/YYYY");
  effectiveToDate = moment(effectiveToDate, "DD/MM/YYYY").format("MM/DD/YYYY");

  switch (activeStep) {
    case 0:
      {
        const servicetax = objectPath.get(dto, "ServiceTaxExemptioncategory");
        if (servicetax === "Risk Situated at SEZ") {
          objectPath.set(dto, "GST", "No");
        } else {
          objectPath.set(dto, "GST", "Yes");
        }
        console.log("servicetax", servicetax);
      }
      fun = true;
      break;
    case 1:
      fun = true;
      break;
    case 2:
      fun = true;
      break;

    case 3:
      fun = true;
      break;
    case 4:
      fun = true;
      break;
    case 5:
      console.log("dto5", dto);
      MasterPolicyDto = {
        assignProductID: 0,
        partnerId: objectPath.get(dto, "PartnerId"), // create partner
        productId: 0,
        assignDate: moment(new Date()).format("YYYY-MM-DD"), // date
        effectiveFrom: effectiveFromDate, // policy start date
        effectiveTo: effectiveToDate, // policy end date
        isActive: true,
        createBy: "",
        createDate: moment(new Date()).format("YYYY-MM-DD"), // date
        modifiedBy: "",
        modifiedDate: moment(new Date()).format("YYYY-MM-DD"), // date
        isPaymentReceived: true,
        lstProductId: [
          [
            {
              ProductId: 1022,
              SectionMapping: {
                MappedSections: [
                  {
                    GroupID: 428,
                    GroupType: 105,
                    GroupName: "",
                  },
                ],
              },
              MasterPolicy: "true",
              MasterPolicyDetails: objectPath.get(dto),
            },
          ],
        ],
      };
      det = objectPath.get(dto, "PlanDetailsJson").length;
      if (det !== 0) {
        for (let i = 0; i < det; i += 1) {
          console.log("1111", objectPath.get(dto, "PlanDetailsJson"));
          objectPath.set(
            MasterPolicyDto,
            `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupID`,
            i + 1
          );
          objectPath.set(
            MasterPolicyDto,
            `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupType`,
            105
          );
          objectPath.set(
            MasterPolicyDto,
            `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupName`,
            objectPath.get(dto, `PlanDetailsJson.${i}.PlanName`)
          );
        }
        console.log("MasterPolicyDto1", MasterPolicyDto);
      }
      fun = await SaveProductMasterPolicy(MasterPolicyDto).then(async (x) => {
        console.log("SaveProductMasterPolicy", x);
      });
      topNavigate("/ListOfMaster");
      break;
    default:
      fun = true;
      break;
  }
  return fun;
};

const getButtonDetails = ({ activeStep, dto, setBackDropFlag }) => {
  let btnDetails = {};
  let MasterPolicyDto = {};
  let det = {};
  // formatted, because SaveProductMasterPolicy API was failed while click on save as draft and sumbit in Masterpolicydetails
  let effectiveFromDate = objectPath.get(dto, "PolicyStartDate");
  let effectiveToDate = objectPath.get(dto, "PolicyEndDate");
  effectiveFromDate = moment(effectiveFromDate, "DD/MM/YYYY").format("MM/DD/YYYY");
  effectiveToDate = moment(effectiveToDate, "DD/MM/YYYY").format("MM/DD/YYYY");

  const handlesave = async (value, onNextOther) => {
    const validationResult = await onNextOther();
    console.log("validationResult", validationResult);
    if (validationResult === true) {
      const confirmationResult = await Swal.fire({
        html: `<p style="color: green; font-weight: bold; margin: 10px 0;">Are you sure you want to Save?</p>
      <p style="font-size: 12px;">The details can be updated until it is finally Submitted...</p>`,
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: "Yes",
        showCloseButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#bf360c",
        cancelButtonColor: "#bf360c",
        startIcon: <CloseIcon />,
        width: 700,
      });
      if (confirmationResult.isConfirmed) {
        setBackDropFlag(true);
        if (value === "Underwriter") {
          objectPath.set(dto, "underWriterStatus", "Draft");
        } else if (value === "operations") {
          objectPath.set(dto, "operationsStatus", "Draft");
        } else if (value === "Claims") {
          objectPath.set(dto, "claimsStatus", "Draft");
        }
        MasterPolicyDto = {
          assignProductID: 0,
          partnerId: objectPath.get(dto, "agentId"), // create partner
          productId: objectPath.get(dto, "productIdPk"),
          assignDate: moment(new Date()).format("YYYY-MM-DD"), // date
          effectiveFrom: effectiveFromDate, // formatted policy start date
          effectiveTo: effectiveToDate, // formatted policy end date
          isActive: true,
          createBy: "",
          createDate: moment(new Date()).format("YYYY-MM-DD"), // date
          modifiedBy: "",
          modifiedDate: moment(new Date()).format("YYYY-MM-DD"), // date
          isPaymentReceived: true,
          lstProductId: [
            [
              {
                ProductId: 1022,
                SectionMapping: {
                  MappedSections: [
                    {
                      GroupID: 428,
                      GroupType: 105,
                      GroupName: "",
                    },
                  ],
                },
                MasterPolicy: "true",
                MasterPolicyDetails: objectPath.get(dto),
              },
            ],
          ],
        };
        console.log("dtooooo", dto);
        det = objectPath.get(dto, "PlanDetailsJson").length;
        if (det !== 0) {
          for (let i = 0; i < det; i += 1) {
            console.log("1111", objectPath.get(dto, "PlanDetailsJson"));
            objectPath.set(
              MasterPolicyDto,
              `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupID`,
              i + 1
            );
            objectPath.set(
              MasterPolicyDto,
              `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupType`,
              105
            );
            objectPath.set(
              MasterPolicyDto,
              `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupName`,
              objectPath.get(dto, `PlanDetailsJson.${i}.PlanName`)
            );
          }
          console.log("MasterPolicyDto1", MasterPolicyDto);
        }
        const fun = await SaveProductMasterPolicy(MasterPolicyDto);
        if (fun.data.status === 3) {
          setBackDropFlag(false);
          await Swal.fire({
            html: `<img src=${POSPAAdded} alt="success image" style="display: block; margin: 0 auto;">
                 <p style="color: green; font-weight: bold; margin: 10px 0;">Saved successfully</p>`,
            showConfirmButton: true,
            allowOutsideClick: false,
            showCloseButton: true,
            confirmButtonColor: "#bf360c",
            width: 700,
            confirmButtonText: "Close",
          });
        } else {
          setBackDropFlag(false);
          await Swal.fire({
            html: `<p style="color: red; font-weight: bold; margin: 10px 0;">Something went wrong</p>`,
            showConfirmButton: true,
            allowOutsideClick: false,
            showCloseButton: true,
            confirmButtonColor: "#bf360c",
            width: 700,
            confirmButtonText: "Close",
          });
        }
      }
    } else {
      swal({ icon: "error", text: "Please fill the required fields" });
    }
  };

  const handlesubmit = async (value, onNextOther) => {
    const validationResult = await onNextOther();
    console.log("validationResult", validationResult);
    if (validationResult === true) {
      const confirmationResult = await Swal.fire({
        html: `<p style="color: green; font-weight: bold; margin: 10px 0;">Are you sure you want to Submit?</p>
      <p style="font-size: 12px;">The details cannot be modified later...</p>`,
        showCancelButton: true,
        allowOutsideClick: false,
        showCloseButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#bf360c",
        cancelButtonColor: "#bf360c",
        width: 700,
      });
      if (confirmationResult.isConfirmed) {
        setBackDropFlag(true);
        if (value === "Underwriter") {
          objectPath.set(dto, "underWriterStatus", "Updated");
        }
        if (value === "operations") {
          objectPath.set(dto, "operationsStatus", "Updated");
        }
        if (value === "Claims") {
          objectPath.set(dto, "claimsStatus", "Updated");
        }
        MasterPolicyDto = {
          assignProductID: 0,
          partnerId: objectPath.get(dto, "PartnerId"), // create partner
          productId: 0,
          assignDate: moment(new Date()).format("YYYY-MM-DD"), // date
          effectiveFrom: effectiveFromDate, // formatted policy start date
          effectiveTo: effectiveToDate, // formatted policy end date
          isActive: true,
          createBy: "",
          createDate: moment(new Date()).format("YYYY-MM-DD"), // date
          modifiedBy: "",
          modifiedDate: moment(new Date()).format("YYYY-MM-DD"), // date
          isPaymentReceived: true,
          lstProductId: [
            [
              {
                ProductId: 1022,
                SectionMapping: {
                  MappedSections: [
                    {
                      GroupID: 428,
                      GroupType: 105,
                      GroupName: "",
                    },
                  ],
                },
                MasterPolicy: "true",
                MasterPolicyDetails: objectPath.get(dto),
              },
            ],
          ],
        };
        console.log("dtooooo", dto);
        det = objectPath.get(dto, "PlanDetailsJson").length;
        if (det !== 0) {
          for (let i = 0; i < det; i += 1) {
            console.log("1111", objectPath.get(dto, "PlanDetailsJson"));
            objectPath.set(
              MasterPolicyDto,
              `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupID`,
              i + 1
            );
            objectPath.set(
              MasterPolicyDto,
              `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupType`,
              105
            );
            objectPath.set(
              MasterPolicyDto,
              `lstProductId.0.0.SectionMapping.MappedSections.${i}.GroupName`,
              objectPath.get(dto, `PlanDetailsJson.${i}.PlanName`)
            );
          }
          console.log("MasterPolicyDto1", MasterPolicyDto);
        }
        const fun = await SaveProductMasterPolicy(MasterPolicyDto);
        if (fun.data.status === 3) {
          setBackDropFlag(false);
          await Swal.fire({
            html: `<img src=${POSPAAdded} alt="success image" style="display: block; margin: 0 auto;">
                 <p style="color: green; font-weight: bold; margin: 10px 0;">Submitted successfully</p>`,
            showConfirmButton: true,
            allowOutsideClick: false,
            showCloseButton: true,
            confirmButtonColor: "#bf360c",
            width: 700,
            confirmButtonText: "Close",
          });
        } else {
          setBackDropFlag(false);
          await Swal.fire({
            html: `<p style="color: red; font-weight: bold; margin: 10px 0;">Something went wrong</p>`,
            showConfirmButton: true,
            allowOutsideClick: false,
            showCloseButton: true,
            confirmButtonColor: "#bf360c",
            width: 700,
            confirmButtonText: "Close",
          });
        }
      }
    } else {
      swal({ icon: "error", text: "Please fill the required fields" });
    }
  };

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Back", visible: false, Endorsement: true },
        reset: { label: "Reset", visible: false, Endorsement: true },
        next: {
          label: "Next",
          visible: true,
          loader: "backDrop",
          endorsementLabel: "Next",
          Endorsement: true,
        },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Back", visible: true, Endorsement: true },
        reset: { label: "Reset", visible: false, Endorsement: true },
        next: {
          label: "Next",
          visible: true,
          loader: "backDrop",
          endorsementLabel: "Next",
          Endorsement: true,
        },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Back", visible: true, Endorsement: true },
        reset: { label: "Reset", visible: false, Endorsement: true },
        next: {
          label: "Next",
          visible: true,
          loader: "backDrop",
          endorsementLabel: "Next",
          Endorsement: true,
        },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Back", visible: true, Endorsement: true },
        reset: { label: "Reset", visible: false, Endorsement: true },
        button2: {
          label: "Save as Draft",
          visible: true,
          loader: "backDrop",
          Endorsement: true,
          onClick: (onNextOther) => handlesave("operations", onNextOther),
          // disabled:
          //   MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" ||
          //   (MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d" &&
          //     dto.operationsStatus === "Updated") ||
          //   MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5",
        },
        button1: {
          label: "Submit",
          visible: true,
          loader: "backDrop",
          Endorsement: true,
          onClick: (onNextOther) => handlesubmit("operations", onNextOther),
          // disabled:
          //   MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" ||
          //   (MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d" &&
          //     dto.operationsStatus === "Updated") ||
          //   MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5",
        },
        next: {
          label: "Next",
          visible: true,
          loader: "backDrop",
          endorsementLabel: "Next",
          Endorsement: true,
        },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Back", visible: true, Endorsement: true },
        reset: { label: "Reset", visible: false, Endorsement: true },
        button2: {
          label: "Save as Draft",
          visible: true,
          loader: "backDrop",
          onClick: (onNextOther) => handlesave("Underwriter", onNextOther),
          Endorsement: true,
          // disabled:
          //   (MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
          //     dto.underWriterStatus === "Updated") ||
          //   MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d" ||
          //   MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5",
        },
        button1: {
          label: "Submit",
          visible: true,
          loader: "backDrop",
          onClick: (onNextOther) => handlesubmit("Underwriter", onNextOther),
          Endorsement: true,
          // disabled:
          //   (MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
          //     dto.underWriterStatus === "Updated") ||
          //   MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d" ||
          //   MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5",
        },
        next: {
          label: "Next",
          visible: true,
          loader: "backDrop",
          endorsementLabel: "Next",
          Endorsement: true,
        },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Back", visible: true, Endorsement: true },
        reset: { label: "Reset", visible: false, Endorsement: true },
        button2: {
          label: "Save as Draft",
          visible: true,
          loader: "backDrop",
          Endorsement: true,
          onClick: (onNextOther) => handlesave("Claims", onNextOther),
          // disabled:
          //   MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" ||
          //   MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d" ||
          //   (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
          //     dto.claimsStatus === "Updated"),
        },
        button1: {
          label: "Submit",
          visible: true,
          loader: "backDrop",
          onClick: (onNextOther) => handlesubmit("Claims", onNextOther),
          // disabled:
          //   MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" ||
          //   MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d" ||
          //   (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
          //     dto.claimsStatus === "Updated"),
          Endorsement: true,
        },
        next: {
          label: "Go to all Master Policies",
          visible: true,
          loader: "backDrop",
          endorsementLabel: "Go to all Master Policies",
          Endorsement: true,
        },
      };
      break;
    default:
      btnDetails = {
        prev: { label: "Back", visible: true, Endorsement: true },
        reset: { label: "Reset", visible: false, Endorsement: true },
        next: {
          label: "Next",
          visible: true,
          loader: "backDrop",
          endorsementLabel: "Next",
          Endorsement: true,
        },
      };
      break;
  }
  return btnDetails;
};

export { getProcessSteps, getPageContent, getSectionContent, getOnNextClick, getButtonDetails };
