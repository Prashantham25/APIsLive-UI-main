import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MDInput from "components/MDInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import exportlogo from "assets/images/BrokerPortal/Admin/excel.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
// import NoRecords from "assets/images/Magma/NoRecords.png";
// import ImageListItem from "@mui/material/ImageListItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DownloadIcon from "@mui/icons-material/Download";
import CancelIcon from "@mui/icons-material/Cancel";
import * as XLSX from "xlsx";
import {
  TextField,
  Autocomplete,
  Drawer,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  FormControlLabel,
  Checkbox,
  IconButton,
  RadioGroup,
  Radio,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Backdrop,
  Typography,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import POSPAAdded from "assets/images/BrokerPortal/POSPAAdded.png";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import {
  SaveCoverGrouping,
  GetRateReupload,
  getProdPartnermasterData,
  DeleteCoverGroups,
  UpdateCoverGroups,
  GetUsersRoles,
  GetGroupingDetails,
} from "./data/index";

const ErrorStyle = {
  color: "red",
  fontSize: "0.8rem",
  textAlign: "left",
};

function PlanDetails({
  dto,
  planjson,
  setPlanjson,
  open,
  setOpen,
  isDrawerOpen,
  setIsDrawerOpen,
  // afterclone,
  setAfterclone,
  planname,
  // setPlanname,
  rowid,
  // setrowId,
  openDel,
  setDelOpen,
  flagEdit,
  updatePlanName,
  // setUpdatePlanName,
  flagviewDisabled,
  errorMsg,
  setErrorMsg,
  openEdit,
  setOpenEdit,
  relationshipmaster,
  setadultrelationship,
  adultrelationship,
  setRelationshipOption,
  Relationshipoption,
  setFamilycombinationoption,
  Familycombinationoption,
  setAdultfamilycombination,
  adultFamilyCombintaion,
  setPersonalAccidentSelected,
  personalAccidentSelected,
  familycombination,
}) {
  console.log("plandto", dto);
  const planDetailsDto = dto;

  console.log(
    "CarryDetails",
    dto,
    planjson,
    setPlanjson,
    open,
    setOpen,
    isDrawerOpen,
    setIsDrawerOpen
  );
  const policyTypeArray = dto.PolicyType.split(",");
  console.log("policyTypeArray", policyTypeArray);
  const plan = planjson;
  const setPlan = setPlanjson;
  console.log("DETAILSSSSSSSS", planDetailsDto);
  console.log("SETPLANNNNNNNNNNJSONNNNNNNNN", planjson);
  console.log("PLANNNNNNNNNNNNNNNNNNNNNNNN", plan);
  const styleAuto = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
      backgroundColor: flagviewDisabled ? "#eceff1" : "inherit",
    },
  };
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const masterId = query.get("MasterID");
  console.log("masterId", masterId);

  const localUserName = localStorage.getItem("userName");
  console.log("localUserName", localUserName);

  const MagmaMaster = localStorage.getItem("roleId");
  console.log("MagmaMaster", MagmaMaster);
  const magmauserid = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [errorminage, setErrorminage] = useState("");
  const [MaxChildage, SetMaxChildage] = useState("");
  const [MinChildage, SetMinChildage] = useState("");
  const [Minadultage, SetMinadultage] = useState("");
  const [Maxadultdage, SetMaxadultdage] = useState("");
  const [erroraultage, setErroradultage] = useState("");
  const [agetoerrormg, setagetoerrormsg] = useState([]);
  const [agefromerrormg, setagefromerrormsg] = useState([]);
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  // const [closebuton, setclosebutton] = useState(false);
  const [planlevelvalidation, setPlanlevelvalidation] = useState({
    ErrorFlag: false,
    Minageerror: false,
    MaxadultAgeError: false,
    MinchildAgeError: false,
    MaxchildAgeError: false,
    NumberError: false,
    COIThreshholdError: false,
  });
  const [onblurvalidation, setOnblurvalidation] = useState({
    ErrorFlag: false,
    MaxnoofHospitalization: false,
    MinNoofdaysofHospitalization: false,
    DeductibleDays: false,
    DeductibledaysICU: false,
    DeductibledaysNormal: false,
    NoOfHospitalizationNormal: false,
    NoOfHospitalizationICU: false,
    PerDayBenefitICU: false,
    PerDayBenefitNormal: false,
    FixedMonthlyEMIError: false,
    MaxEMIPerYearEror: false,
    MonthlyEMIError: false,
    NoEmiInstallementError: false,
    FixedCISIError: false,
    MaxCISIError: false,
    FixedPASIError: false,
    MaxPASIError: false,
    MaxSalaryAllowedError: false,
    MonthsalaryPaidError: false,
    PercentagePASIError: false,
    PerChildSiError: false,
    NoOfChldrenError: false,
    MaxIndividualclaimError: false,
    MaxFamilyclaimsError: false,
    MaxCEGSILIMITError: false,
    PABenefitPercentageADError: false,
    PABenefitPercentageTTDError: false,
    PABenefitPercentagePPDError: false,
    PABenefitPercentagePTDError: false,
    RateError: false,
    PEDwaitingperiodError: false,
    AgeFromError: false,
    AgeToError: false,
    Rate: false,
    waitingperiodError: false,
    DaysADBenefitError: false,
    DaysPPDBenefitError: false,
    DaysPTDBenefitError: false,
    DaysTTDBenefitError: false,
  });
  useEffect(async () => {
    const GetUse = await GetUsersRoles(magmauserid);
    console.log("APIROLEID", GetUse.data);
    GetUse.data.forEach((x) => {
      if (x.value === MagmaMaster) {
        if (x.mValue === "Magma_OperationUser") {
          // setOpertoruser(true);
        }
      }
      if (x.value === MagmaMaster) {
        if (x.mValue === "MagmaClaimsUser") {
          // setClaimsuser(true);
        }
      }
    });
  }, []);

  const [openEditmsg, setOpenEditmsg] = useState(false);
  const rateCriteriaOp = ["Full", "Age Band"];
  // const [familycombination, setFamilycombination] = useState([]);
  const [BenefitNames, setBeefitNames] = useState([]);
  // const [relationshipmaster, setRelationshipmaster] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // const [ADType, setADType] = useState([]); aaa
  // let relationshipmaster = [];

  useEffect(() => {
    const data = [
      { MasterType: "BenefitType", filterCriteria: {} },
      { MasterType: "RelationshipMaster", filterCriteria: {} },
      // { MasterType: "FamilyCombination", filterCriteria: {} },
    ];
    data.forEach(async (x) => {
      const data1 = { ProductId: 1022 };
      const abd = await getProdPartnermasterData(data1.ProductId, x.MasterType);
      console.log("abdbhj", abd);
      console.log("Forailmentmaster", plan);
      // if (x.MasterType === "FamilyCombination") {
      //   setFamilycombination([...abd.data]);
      // }
      if (x.MasterType === "BenefitType") {
        setBeefitNames([...abd.data]);
      }
    });
  }, []);
  const [fieldsetageband, setFieldageband] = useState({
    dynamicList: [],
    rateObj: 962,
    rateName: "MHDIRateTable1",
    rateType: "",
    createdDate: "",
  });

  const [errorMessage, setErrorMessage] = useState([]);
  const handleAddAgeBand = (i) => {
    const newAgeBandGroup = {
      AgeFrom: "",
      AgeTo: "",
      BenefitName: "",
      CoverName: "",
      Plan: "",
      Rate: "",
    };

    setPlan((prevPlan) => {
      const updatedPlan = [...prevPlan];
      const ageToLimit = 100;

      const currentAgeBand =
        updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].AgeBand;
      const lastAgeTo =
        currentAgeBand.length > 0 ? currentAgeBand[currentAgeBand.length - 1].AgeTo : 0;

      if (lastAgeTo >= ageToLimit) {
        const newErrorMessages = [...errorMessage];
        newErrorMessages[i] = "Reached max age limit";
        setErrorMessage(newErrorMessages);
      } else {
        updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].AgeBand.push(
          newAgeBandGroup
        );
        const newErrorMessages = [...errorMessage];
        newErrorMessages[i] = "";
        setErrorMessage(newErrorMessages);
      }

      return updatedPlan;
    });
  };

  const Regex = /^[0-9]*$/;
  const regex = /^[a-zA-Z0-9]*$/;
  const [agebandcovername, setAgebandcovername] = useState("");
  const [agebenefitname, setAgebenefitname] = useState([]);
  console.log("agebandd", agebenefitname);
  const dynamic = plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails;

  const handleChange = (e, Index, i) => {
    const { name, value } = e.target;
    const inputValue = value.trim() === "" ? "" : parseInt(value, 10);
    const AgeFrom = parseInt(inputValue, 10);
    const AgeTo = parseInt(dynamic[i].AgeBand[Index].AgeTo, 10);
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        [`AgeFromError${Index}`]: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        [`AgeFromError${Index}`]: false,
      }));
    }
    if (Index > 0) {
      const prevAgeTo = parseInt(dynamic[i].AgeBand[Index - 1].AgeTo, 10);
      if (AgeFrom <= prevAgeTo) {
        setagefromerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[
            Index
          ] = `Age From should be greater than Age To of the previous band (${prevAgeTo})`;
          return newMessages;
        });
      } else {
        setagefromerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[Index] = "";
          return newMessages;
        });
        setagetoerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[Index - 1] = "";
          return newMessages;
        });
      }
    } else {
      if (AgeFrom > AgeTo) {
        setagefromerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[Index] = `Age From should be Less than Age To (${AgeTo})`;
          return newMessages;
        });
      } else {
        setagefromerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[Index] = "";
          return newMessages;
        });
      }
      if (AgeFrom < AgeTo) {
        setagetoerrormsg("");
      }
    }
    const updatedPlan = [...plan];
    dynamic[i].AgeBand[Index][name] = inputValue;
    dynamic[i].AgeBand[Index].CoverName = agebandcovername;
    dynamic[i].AgeBand[Index].BenefitName = agebenefitname;
    if (masterId !== "") {
      dynamic[i].AgeBand[Index].Plan = masterId;
    }
    setPlan(updatedPlan);
  };
  const handleChangeAgeTo = (e, Index, i) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        [`AgeToError${Index}`]: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        [`AgeToError${Index}`]: false,
      }));
    }
    const { name, value } = e.target;
    const inputValue = value.trim() === "" ? "" : parseInt(e.target.value, 10);
    const AgeTo = parseInt(inputValue, 10);
    const AgeFrom = parseInt(dynamic[i].AgeBand[Index].AgeFrom, 10);
    if (dynamic[i].AgeBand[Index + 1] && dynamic[i].AgeBand[Index + 1].AgeFrom) {
      const prevAgeTo = parseInt(dynamic[i].AgeBand[Index + 1].AgeFrom, 10);
      if (AgeTo >= prevAgeTo) {
        setagetoerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[
            Index
          ] = `Age To should be Lesser than Age From of the Next band (${prevAgeTo})`;
          return newMessages;
        });
      } else {
        setagetoerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[Index] = "";
          return newMessages;
        });
        setagefromerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[Index + 1] = "";
          return newMessages;
        });
      }
    } else {
      if (AgeTo < AgeFrom) {
        setagetoerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[Index] = `Age To should be greater than Age From (${AgeFrom})`;
          return newMessages;
        });
      } else {
        setagetoerrormsg((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[Index] = "";
          return newMessages;
        });
      }
      if (AgeFrom < AgeTo) {
        setagefromerrormsg("");
      }
    }
    const updatedPlan = [...plan];
    dynamic[i].AgeBand[Index][name] = inputValue;
    dynamic[i].AgeBand[Index].CoverName = agebandcovername;
    dynamic[i].AgeBand[Index].BenefitName = agebenefitname;
    if (masterId !== "") {
      dynamic[i].AgeBand[Index].Plan = masterId;
    }
    setPlan(updatedPlan);
  };
  const handleChangeRate = (e, Index, i) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        [`Rate${Index}`]: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        [`Rate${Index}`]: false,
      }));
    }
    const { name, value } = e.target;
    const updatedPlan = [...plan];
    dynamic[i].AgeBand[Index][name] = value;
    dynamic[i].AgeBand[Index].CoverName = agebandcovername;
    dynamic[i].AgeBand[Index].BenefitName = agebenefitname;
    if (masterId !== "") {
      dynamic[i].AgeBand[Index].Plan = masterId;
    }
    setPlan(updatedPlan);
  };

  const handleRemoveFields = (Index, i) => {
    const updatedDynamicList =
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].AgeBand;
    updatedDynamicList.splice(Index, 1);
    if (updatedDynamicList.length === 0) {
      updatedDynamicList.splice(Index, 1);
    }
    setFieldageband((prevState) => ({
      ...prevState,
      AgeBand: updatedDynamicList,
    }));
  };

  const PersonalAccident = [
    { Value: "Accidental Death" },
    { Value: "Permanent Partial Disability" },
    { Value: "Permanent Total Disability" },
    { Value: "Temporary Total Disability" },
  ];
  const BenefitTypes = [
    "Hospicash",
    "EMI Benefit",
    "Personal Accident",
    "Critical Illness",
    "Loss of Job",
    "Child Education Grant",
  ];
  const clauses = [
    { Value: "Name of the Clause", Desc: "Cover for Cross Liability" },
    { Value: "Name of the Clause", Desc: "Automatic Reinstatement" },
    { Value: "Name of the Clause", Desc: "Cover for Cross Liability" },
  ];
  const Exclusion = [
    { Value: "Name of the Exclusion", Desc: "Cover for Cross Liability" },
    { Value: "Name of the Exclusion", Desc: "Automatic Reinstatement" },
    { Value: "Name of the Exclusion", Desc: "Cover for Cross Liability" },
  ];
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (masterId !== "") {
      plan[0].PlanName = masterId;
    }
    setPlan([...plan]);
  }, [masterId]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const closeSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };
  const handleFileSelect = (e, i) => {
    setSuccessDialogOpen(true);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = jsonData.shift();
      setPlan((prevPlan) => {
        const updatedPlan = [...prevPlan];
        dynamic[i].AgeBand = [];
        jsonData.forEach((row) => {
          const ageFromIndex = headers.indexOf("Age From(In Years)");
          const ageToIndex = headers.indexOf("Age To(In Years)");
          const rateIndex = headers.indexOf("Rate(Amount)");
          if (ageFromIndex !== -1 && ageToIndex !== -1 && rateIndex !== -1) {
            dynamic[i].AgeBand.push({
              AgeFrom: row[ageFromIndex],
              AgeTo: row[ageToIndex],
              Rate: row[rateIndex],
            });
            dynamic[i].AgeBand.forEach((band, Index) => {
              const AgeFrom = parseInt(band.AgeFrom, 10);
              const AgeTo = parseInt(dynamic[i].AgeBand[Index].AgeTo, 10);
              if (Index > 0) {
                const prevAgeTo = parseInt(dynamic[i].AgeBand[Index - 1].AgeTo, 10);
                if (AgeFrom <= prevAgeTo) {
                  setagefromerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[
                      Index
                    ] = `Age From should be greater than Age To of the previous band (${prevAgeTo})`;
                    return newMessages;
                  });
                } else {
                  setagefromerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[Index] = "";
                    return newMessages;
                  });
                  setagetoerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[Index - 1] = "";
                    return newMessages;
                  });
                }
              } else {
                if (AgeFrom > AgeTo) {
                  setagefromerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[Index] = `Age From should be Less than Age To (${AgeTo})`;
                    return newMessages;
                  });
                } else {
                  setagefromerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[Index] = "";
                    return newMessages;
                  });
                }
                if (AgeFrom < AgeTo) {
                  setagetoerrormsg("");
                }
              }

              if (dynamic[i].AgeBand[Index + 1] && dynamic[i].AgeBand[Index + 1].AgeFrom) {
                const prevAgeTo = parseInt(dynamic[i].AgeBand[Index + 1].AgeFrom, 10);
                if (AgeTo >= prevAgeTo) {
                  setagetoerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[
                      Index
                    ] = `Age To should be Lesser than Age From of the Next band (${prevAgeTo})`;
                    return newMessages;
                  });
                } else {
                  setagetoerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[Index] = "";
                    return newMessages;
                  });
                  setagefromerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[Index + 1] = "";
                    return newMessages;
                  });
                }
              } else {
                if (AgeTo < AgeFrom) {
                  setagetoerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[Index] = `Age To should be greater than Age From (${AgeFrom})`;
                    return newMessages;
                  });
                } else {
                  setagetoerrormsg((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[Index] = "";
                    return newMessages;
                  });
                }
                if (AgeFrom < AgeTo) {
                  setagefromerrormsg("");
                }
              }
            });
          }
        });
        return updatedPlan;
      });
      closeSuccessDialog();
    };
    reader.readAsArrayBuffer(file);
    // setclosebutton(true);
  };

  const handleDownloadTemplate = async () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASEURL}/ExcelUpload/GetTemplateDetails?TemplateId=200`, {
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
          link.download = "Age_Band.xlsx";
          link.click();
        }
      });
  };
  const handleEditClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  const handleEditmesgClose = () => {
    setOpenEdit(false);
    setOpenEditmsg(false);
    setIsDrawerOpen(false);
  };

  // const [personalAccidentSelected, setPersonalAccidentSelected] = useState(false);
  const [showLossOfJobErrorMessage, setShowLossOfJobErrorMessage] = useState(false);
  const [showChildEducationErrorMessage, setShowChildEducationErrorMessage] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState({
    "Loss of Job": false,
    "Child Education Grant": false,
  });

  useEffect(() => {
    const newCheckboxChecked = {};
    BenefitTypes.forEach((benefitType) => {
      const isChecked = plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.some(
        (item) => item.CoverName === benefitType
      );
      newCheckboxChecked[benefitType] = isChecked;
    });
    setCheckboxChecked(newCheckboxChecked);
  }, [plan]);

  const obj1 = {
    benefitDetails: null,
    coverId: 0,
    coverName: "",
    filterCriteria: {
      currency: "INR",
      Region: "",
      SI: "",
      Type: "",
    },
    groupDetailsId: 0,
    groupId: 0,
    isActive: true,
    SectionMappingDetails: "",
  };
  const obj2 = {
    benefitDetails: null,
    coverId: 0,
    coverName: "",
    filterCriteria: {
      currency: "INR",
      Region: "",
      SI: "",
      Type: "",
    },
    groupDetailsId: 0,
    groupId: 0,
    isActive: true,
    SectionMappingDetails: "",
  };
  const [clonesave, setClonesave] = useState(obj1);
  const [updateplan, setUpdateplan] = useState(obj2);

  const handleEditmesg = async () => {
    const obj3 = {
      productId: plan[0].productId,
      groupId: plan[0].groupId,
      filterCriteria: {
        SI: "",
        Type: "",
        Region: "",
        currency: "INR",
      },
    };
    const GetGroupingDetail = await GetGroupingDetails(obj3);
    console.log("GetGroupingDetails", GetGroupingDetail);
    updateplan.groupDetailsId = GetGroupingDetail.groupDetailsId;
    updateplan.groupId = GetGroupingDetail.groupId;
    setUpdateplan({ ...updateplan });
    const sectionMappingDetails = plan[0].groupDetails[0].SectionMappingDetails;
    updateplan.SectionMappingDetails = sectionMappingDetails;
    plan[0].groupDetails[0] = updateplan;
    setPlan([...plan]);
    const updatedPlan = await UpdateCoverGroups(plan);
    if (updatedPlan.data.status === 3) {
      const updatedPlanDetailsDto = planDetailsDto?.PlanDetailsJson?.map((x) => {
        if (x.PlanName === updatePlanName) {
          console.log("planjsssssssssson", plan);
          const updatedX = { ...x }; // Create a new object based on x
          updatedX.PlanName = plan[0].groupName;
          updatedX.PolicyDuration = `${plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration} ${plan[0].groupDetailsJson.SectionMaster.PolicyDuration}`;
          updatedX.CountofPolicyDuration =
            plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration;
          updatedX.DisplayName = plan[0].DisplayName;
          updatedX.DisplayName = plan[0].groupDetailsJson.SectionMaster.DisplayName;
          updatedX.Clauses = plan[0].groupDetailsJson.SectionMaster.Clauses;
          updatedX.Exclusion = plan[0].groupDetailsJson.SectionMaster.Exclusion;
          console.log("updatedplandto", updatedX);
          return updatedX;
        }
        return x;
      });
      planDetailsDto.PlanDetailsJson = updatedPlanDetailsDto;
      setUpdateSuccess(true);
      setOpenEditmsg(true);
      plan[0].groupDetailsJson.SectionMaster = {};
      plan[0].DisplayName = "";
      setCheckboxChecked("");
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails = [];
      setPlan([...plan]);
      // setErrorMessage("");
      // setShowChildEducationErrorMessage(false);
      // setShowLossOfJobErrorMessage(false);
    }
  };
  const handleCloseSuccessDialog = () => {};
  const mes = "Please fill the required field";

  let isError = false;
  // const [selectedBenefits, setSelectedBenefits] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [hospicashSelected, setHospicashSelected] = useState(false);

  const getBenefitID = (coverName) => {
    switch (coverName) {
      case "Hospicash":
        return 5;
      case "EMI Benefit":
        return 3;
      case "Personal Accident":
        return 6;
      case "Critical Illness":
        return 2;
      case "Loss of Job":
        return 4;
      case "Child Education Grant":
        return 1;
      default:
        return 0;
    }
  };
  const handleReportTypeChange = (event, i, value) => {
    if (
      planlevelvalidation.NumberError === true ||
      planlevelvalidation.MaxchildAgeError === true ||
      planlevelvalidation.MinchildAgeError === true ||
      planlevelvalidation.MaxadultAgeError === true ||
      planlevelvalidation.Minageerror === true ||
      planlevelvalidation.COIThreshholdError === true ||
      MaxChildage !== "" ||
      Maxadultdage !== "" ||
      Minadultage !== "" ||
      MinChildage !== "" ||
      plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration === "" ||
      plan[0].DisplayName === "" ||
      plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "" ||
      plan[0].groupDetailsJson.SectionMaster.MinimumAdultAge === "" ||
      plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge === "" ||
      plan[0].groupDetailsJson.SectionMaster.MinimumChildAge === "" ||
      plan[0].groupDetailsJson.SectionMaster.MaximumChildAge === "" ||
      plan[0].groupDetailsJson.SectionMaster.SumInsuredType === "" ||
      plan[0].groupDetailsJson.SectionMaster.COIThreshhold === "" ||
      (plan[0].groupDetailsJson.SectionMaster.FamilyCombination || []).length === 0 ||
      (plan[0].groupDetailsJson.SectionMaster.Relationship || []).length === 0 ||
      plan[0].groupDetailsJson.SectionMaster.RateTerm === ""
    ) {
      setPlanlevelvalidation((prev) => ({ ...prev, ErrorFlag: true }));
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Please Enter the required fields with valid data",
        confirmButtonText: "OK",
        confirmButtonColor: "#bf360c",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    } else if (event.target.name === "CoverName") {
      // if (value === "Hospicash") {
      //   if (!event.target.checked && hospicashSelected) {
      //     setErrorMessage("Hospicash benefit is mandatory.");
      //     return;
      //   }
      //   setErrorMessage("");
      //   setHospicashSelected(event.target.checked);
      // }
      if (value === "Child Education Grant" && !personalAccidentSelected && !event.target.checked) {
        setShowChildEducationErrorMessage(true);
        setShowLossOfJobErrorMessage(false);
        return;
      }
      if (value === "Loss of Job" && !personalAccidentSelected && !event.target.checked) {
        setShowLossOfJobErrorMessage(true);
        setShowChildEducationErrorMessage(false);
        return;
      }
      if (value === "Personal Accident") {
        setShowLossOfJobErrorMessage(false);
        setShowChildEducationErrorMessage(false);
      }
      if (!event.target.checked && value === "Personal Accident") {
        const updatedPlan = [...plan];
        updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails =
          updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.filter(
            (x) => x.CoverName !== "Loss of Job" && x.CoverName !== "Child Education Grant"
          );
        setPlan(updatedPlan);
        setPersonalAccidentSelected(false);
        setShowLossOfJobErrorMessage(false);
        setShowChildEducationErrorMessage(false);
      }
      if (!event.target.checked && (value === "Child Education Grant" || value === "Loss of Job")) {
        // Unselecting "Child Education Grant" or "Loss of Job" without unselecting "Personal Accident"
        const updatedPlan = [...plan];
        updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails =
          updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.filter(
            (x) => x.CoverName !== value
          );
        setPlan(updatedPlan);
        setCheckboxChecked((prevChecked) => ({
          ...prevChecked,
          [value]: event.target.checked,
        }));
        setShowLossOfJobErrorMessage(false);
        setShowChildEducationErrorMessage(false);
      }
      setCheckboxChecked((prevChecked) => ({
        ...prevChecked,
        [value]: event.target.checked,
      }));
      if (event.target.checked) {
        const newBenefit = {
          CoverName: value,
          BenefitID: getBenefitID(value),
          Benefit: "",
          Value: "",
          InitialWaitingPeriod: "",
          Deductible: "",
          BenefitCurrencyType: "",
          BenefitType: "",
          AilmentApplicable: "",
          IsOptional: "",
          DeductibleType: "",
          PEDYN: "",
          MaternityYN: "",
          MaternityWaitingPeriod: "",
          PEDwaitingperiod: "",
          SpecificDiseasesWaitingPeriod: "",
          CountofCI: "",
          NoofInstalments: "",
          CountofChildren: "",
          FamilyCombination: "",
          TotalCountofMembers: "",
          AdultCount: "",
          ChildCount: "",
          Relationship: "",
          CustomerNomineePercentage: "",
          FinancierPercentage: "",
          RateType: "",
          RateCriteria: "",
          PremiumUnit: "",
          Rate: "",
          SuminsuredInputType: "",
          HospitalizationCriteria: "",
          MaxNoofDaysHospi: "",
          MinNoofDaysHospi: "",
          NoofDaysNormal: "",
          NoofDaysICU: "",
          PerDayBenefitICU: "",
          PerDayBenefitNormal: "",
          DeductibleNormal: "",
          DeductibleICU: "",
          NoofMonthsSalarytobePaid: "",
          MaxMonthlySalary: "",
          Applicablefor: "",
          FixedPASI: "",
          MaxPASIPerYear: "",
          MaxCISI: "",
          FixedCISI: "",
          MaxEMIPerYear: "",
          MaxEMIAmountMonthly: "",
          NoofEMIInstalments: "",
          FixedMonthlyEMIAmount: "",
          PerChildSI: "",
          PercofPASI: "",
          MaxFamilyClaims: "",
          MaxIndividualClaim: "",
          MaxCEGSIPerYear: "",
          MaxAge: "",
          MinAge: "",
          AgeBand: [
            {
              AgeFrom: "",
              AgeTo: "",
              BenefitName: "",
              CoverName: "",
              Plan: "",
              Rate: "",
            },
          ],
          Ailmentmaster: [
            {
              Id: "",
              Values: "",
              Applicable: "",
              WaitingPeriod: "",
              SelectAllYN: "",
            },
          ],
          PersonalAccidentDetails: [
            {
              PABenefitName: "",
              PABenefitYN: "",
              PABenefitSI: "",
              PABenefitPercentage: "",
            },
          ],
          Triggers: [],
        };
        if (i === 2) {
          BenefitNames.filter((x) => {
            const arr1 = [];
            PersonalAccident.forEach((z) => {
              arr1.push({
                PABenefitName: z.Value,
                PABenefitYN: "",
                PABenefitSI: "",
                PABenefitPercentage: "",
              });
            });
            if (x.Value === value) {
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.push({
                ...newBenefit,
                DaysADBenefitApplicable: "365",
                DaysPPDBenefitApplicable: "365",
                DaysPTDBenefitApplicable: "365",
                DaysTTDBenefitApplicable: "365",
                PersonalAccidentDetails: arr1,
                Benefit: x.TypeCde,
                MaxAge: plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge,
                MinAge: plan[0].groupDetailsJson.SectionMaster.MinimumChildAge,
              });
              setAgebenefitname(x.TypeCde);
              setPlan([...plan]);
              if (value === "Personal Accident") {
                setPersonalAccidentSelected(true);
              }
            }
            return true;
          });
        } else {
          BenefitNames.filter((x) => {
            if (x.Value === value) {
              const newBenefitWithBenefit = {
                ...newBenefit,
                Benefit: x.TypeCde,
                MaxAge: plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge,
                MinAge: plan[0].groupDetailsJson.SectionMaster.MinimumChildAge,
              };
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.push(
                newBenefitWithBenefit
              );
              setAgebenefitname(x.TypeCde);
              setPlan([...plan]);
            }
            return true;
          });
        }
      } else {
        const bd = plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails;
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails = bd.filter(
          (x) => x.CoverName !== value
        );
        setPlan([...plan]);
        if (value === "Personal Accident") {
          setPersonalAccidentSelected(false);
        }
        if (value === "Child Education Grant") {
          setShowChildEducationErrorMessage(false);
        }
        if (value === "Loss of Job") {
          setShowLossOfJobErrorMessage(false);
        }
      }
      plan[0].groupDetails[0].coverName = value;
      console.log("vallllluuueee", value);
      clonesave.coverName = value;
      updateplan.coverName = value;
      console.log("clonesavecovername", clonesave.coverName);
      console.log("updateplancovername", updateplan.coverName);
      setClonesave({ ...clonesave });
      setUpdateplan({ ...updateplan });
      setPlan([...plan]);
      setAgebandcovername(value);
    }
  };

  const handleDisabledCheckboxClick = (benefitType) => {
    if (benefitType === "Child Education Grant") {
      setShowChildEducationErrorMessage(true);
      setShowLossOfJobErrorMessage(false);
    } else if (benefitType === "Loss of Job") {
      setShowLossOfJobErrorMessage(true);
      setShowChildEducationErrorMessage(false);
    }
  };
  console.log("planSet", plan);
  const handleChangeRadio = (event) => {
    plan[0].groupDetailsJson.SectionMaster[event.target.name] = event.target.value;
    setPlan([...plan]);
    const arr1 = [];
    clauses.forEach((z) => {
      arr1.push({
        Applicable: "",
        Value: z.Value,
        Desc: z.Desc,
      });
      if (plan[0].groupDetailsJson.SectionMaster.CluaseExclusionApplicable !== "") {
        plan[0].groupDetailsJson.SectionMaster.Clauses = arr1;
      }
      setPlan([...plan]);
    });
    const arr2 = [];
    Exclusion.forEach((l) => {
      arr2.push({
        Applicable: "",
        Value: l.Value,
        Desc: l.Desc,
      });
      if (plan[0].groupDetailsJson.SectionMaster.CluaseExclusionApplicable !== "") {
        plan[0].groupDetailsJson.SectionMaster.Exclusion = arr2;
      }
      setPlan([...plan]);
    });
  };
  const [pasibenefitval, setpasibeefitval] = useState();
  const [percalculationAD, setpercalculationAD] = useState();
  const [percalculationPTD, setpercalculationPTD] = useState();
  const [percalculationPPD, setpercalculationPPD] = useState();
  const [percalculationTTD, setpercalculationTTD] = useState();
  const handleDrawerClose = () => {
    plan[0].groupDetailsJson.SectionMaster = {};
    plan[0].DisplayName = "";
    plan[0].groupDetailsJson.SectionMaster.RateTerm = "";
    plan[0].groupDetailsJson.SectionMaster.PolicyDuration = "";
    plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration = "";
    plan[0].groupDetailsJson.SectionMaster.SumInsuredType = "";
    plan[0].groupDetailsJson.SectionMaster.COIThreshhold = "";
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails = [];
    setpasibeefitval("");
    setpercalculationAD("");
    setpercalculationPTD("");
    setpercalculationPPD("");
    setpercalculationTTD("");
    setCheckboxChecked("");
    setPlan([...plan]);
    setIsDrawerOpen(false);
    setErrorMsg("");
    setAfterclone(false);
    setPlanlevelvalidation((prev) => ({ ...prev, ErrorFlag: false }));
    setShowLossOfJobErrorMessage(false);
    setShowChildEducationErrorMessage(false);
    // setErrorMessage("");
    // setShowChildEducationErrorMessage(false);
    // setShowLossOfJobErrorMessage(false);
  };

  const handleRelationshipmaster = (e, values, i) => {
    const selectedValue = values.join(",");
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship = selectedValue;
    setPlan([...plan]);
  };

  // const [Relationshipoption, setRelationshipOption] = useState([]);
  // const [adultrelationship, setadultrelationship] = useState([]);
  const handlerelationsmultiselect = (e, values) => {
    const selectedValue = values.join(",");
    plan[0].groupDetailsJson.SectionMaster.Relationship = selectedValue;
    setPlan([...plan]);
    const mValues = values.map((selectedValues) => selectedValues);
    setRelationshipOption(mValues);
    const specialValues = ["Son", "Daughter", "Brother (Child)", "Sister (Child)"];
    const identifiedValues = mValues.filter((value) => specialValues.includes(value));
    const otherValues = mValues.filter((value) => !specialValues.includes(value));
    setadultrelationship(otherValues);
    console.log("Identified Values:", identifiedValues);
    console.log("Other Values:", otherValues);
    BenefitTypes.forEach((z, index) => {
      const selectedCoverName =
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]?.Relationship || "";
      if (selectedCoverName !== "" && selectedCoverName !== selectedValue) {
        const coverNameArray = selectedCoverName.split(",");
        const valueArray = selectedValue.split(",");
        const filteredCoverNameArray = coverNameArray.filter((value) => valueArray.includes(value));
        const result = filteredCoverNameArray.join(",");
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Relationship = result;
        setPlan([...plan]);
      }
    });
  };

  const handlefamilycombination = (e, values, i) => {
    if (values !== null) {
      const selectedValue = values.join(",");
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination =
        selectedValue;
    } else {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination = "";
    }
    setPlan([...plan]);
  };
  // const [Familycombinationoption, setFamilycombinationoption] = useState([]);
  // const [adultFamilyCombintaion, setAdultfamilycombination] = useState([]);
  const handlefamilymultiselect = (e, selectedValues) => {
    const selectedSet = new Set();
    const selectedMValues = selectedValues
      .filter((selectedValue) => {
        if (selectedSet.has(selectedValue.mValue)) {
          return false;
        }
        selectedSet.add(selectedValue.mValue);
        return true;
      })
      .map((selectedValue) => ({
        FamilyCombination: selectedValue.mValue,
        TotalCount: selectedValue.TotalCount,
        AdultCount: selectedValue.AdultCount,
        ChildCount: selectedValue.ChildCount,
      }));
    plan[0].groupDetailsJson.SectionMaster.FamilyCombination = selectedMValues;
    setPlan([...plan]);
    const mValues = selectedValues.map((selectedValue) => selectedValue.mValue);
    setFamilycombinationoption(mValues);
    const numbersWithA = mValues.filter((value) => /\d+A$/.test(value));
    setAdultfamilycombination(numbersWithA);
    console.log("numbersWithA", numbersWithA);
    const mValuesString = mValues.join(",");
    BenefitTypes.forEach((z, index) => {
      const selectedCoverName =
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]?.FamilyCombination ||
        "";
      if (selectedCoverName !== "" && selectedCoverName !== mValuesString) {
        const coverNameArray = selectedCoverName.split(",");
        const valueArray = mValuesString.split(",");
        const filteredCoverNameArray = coverNameArray.filter((value) => valueArray.includes(value));
        const result = filteredCoverNameArray.join(",");
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].FamilyCombination =
          result;
        setPlan([...plan]);
      }
    });
    console.log("............", mValuesString);
  };
  console.log("FamilyOptions", Familycombinationoption);
  const handlemultiselect = (e, name, values, index) => {
    if (name === "Applicablefor") {
      const selectedValue = values.join(", ");
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][name] = selectedValue;
      setPlan([...plan]);
    }
  };

  const handlePEDautocomplete = (e, name, value, index) => {
    if (value === "Yes" && name === "PEDYN") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PEDwaitingperiod = "12";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][name] = value;
    }
    if (value === "No" && name === "PEDYN") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PEDwaitingperiod = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][name] = value;
    }
    setPlan([...plan]);
  };
  const handleautocomplete = (e, name, value, index) => {
    if (name === "AilmentApplicable") {
      const data = [{ MasterType: "AilmentMaster", filterCriteria: {} }];
      data.forEach(async (x) => {
        const data1 = { ProductId: 1022 };
        const abd = await getProdPartnermasterData(data1.ProductId, x.MasterType);
        console.log("abdbhj", abd);
        if (x.MasterType === "AilmentMaster") {
          const arr = [];
          abd.data.forEach((y) => {
            arr.push({ Id: y.mID, Values: y.mValue, Applicable: "", WaitingPeriod: "" });
          });
          if (
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].CoverName ===
              "Hospicash" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].CoverName ===
              "EMI Benefit"
          ) {
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Ailmentmaster = arr;
          }
          if (name === "InitialWaitingPeriod") {
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
              index
            ].InitialWaitingPeriod = value;
          }
          setPlan([...plan]);
        }
      });
    }
    const valueWithoutSpaces = value.replace(/\s/g, "");
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][name] = valueWithoutSpaces;
    setPlan([...plan]);
    if (value === "Combined") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PerDayBenefitICU = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PerDayBenefitNormal = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].NoofDaysICU = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].NoofDaysNormal = "";
    }
    if (value === "Separate") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PerDayBenefitICU = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PerDayBenefitNormal = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxNoofDaysHospi = "";
    }
    if (value === "Fixed") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].FixedPASI = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].FixedCISI = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].NoofEMIInstalments = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxEMIAmountMonthly = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxEMIPerYear = "";
      // plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].CountofChildren = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PercofPASI = "";
    }
    if (value === "Variable") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxCISI = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxPASIPerYear = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].NoofEMIInstalments = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].FixedMonthlyEMIAmount =
        "";
    }
    if (value === "PercentageofPersonalAccidentSI") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PerChildSI = "";
      // plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].CountofChildren = "";
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
    }
    if (value === "Age Band") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Rate = "";
    }
    if (name === "RateCriteria") {
      if (value === "Full") {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].AgeBand = [
          { AgeFrom: "", AgeTo: "", Rate: "" },
        ];
      }
    }
    if (value === "Fixed" || value === "Variable") {
      dynamic[index].PersonalAccidentDetails.forEach((z) => {
        const zz = z;
        zz.PABenefitYN = "";
        zz.PABenefitSI = "";
        zz.PABenefitPercentage = "";
      });
      if (value === "Full") {
        setOnblurvalidation((prevState) => ({
          ...prevState,
          AgeToError: false,
          AgeFromError: false,
          Rate: false,
        }));
      }
    }

    setPlan([...plan]);
  };

  const [inputErrors, setInputErrors] = useState([]);
  const handleinputtypetriggers = (e, i, index) => {
    const newNoOfDaysForTrigger = e.target.value;
    const isNumeric = /^[0-9]+$/.test(newNoOfDaysForTrigger);

    const updatedInputErrors = [...inputErrors];
    updatedInputErrors[index] = !isNumeric && newNoOfDaysForTrigger !== "";

    setInputErrors(updatedInputErrors);

    const existingTriggers =
      plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.Triggers;

    if (existingTriggers && existingTriggers[index]) {
      existingTriggers[index].NoOfDaysForTrigger = newNoOfDaysForTrigger;
    } else {
      const newTrigger = {
        NoOfDaysForTrigger: newNoOfDaysForTrigger,
      };
      if (newNoOfDaysForTrigger !== "") {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Triggers.push(newTrigger);
      }
    }
    setPlan([...plan]);
  };
  const generateTriggerFields = (i) => {
    const benefitDetails = plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails;
    if (benefitDetails) {
      return benefitDetails[i].NoofEMIInstalments > 0
        ? Array.from({ length: benefitDetails[i].NoofEMIInstalments }, (_, index) => (
            <Grid item xs={3} key={index}>
              <MDTypography variant="h6" mb={1}>
                Installment {index + 1} Trigger
              </MDTypography>
              <MDInput
                name="NoOfDaysForTrigger"
                label={
                  <Typography style={{ fontSize: "15px" }}>
                    {`No. of Days for Trigger ${index + 1}`}
                  </Typography>
                }
                disabled={flagviewDisabled}
                size="small"
                style={{
                  height: "1.5375vmax",
                  fontSize: "16px",
                }}
                value={
                  plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.Triggers[
                    index
                  ]?.NoOfDaysForTrigger
                }
                error={
                  inputErrors[index] ||
                  (onblurvalidation.ErrorFlag &&
                    plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.Triggers[
                      index
                    ]?.NoOfDaysForTrigger === "")
                }
                helperText={
                  (inputErrors[index] && "Allows only numbers") ||
                  (onblurvalidation.ErrorFlag &&
                    plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.Triggers[
                      index
                    ]?.NoOfDaysForTrigger === "" &&
                    mes)
                }
                onChange={(e) => handleinputtypetriggers(e, i, index)}
                fullWidth
              />
            </Grid>
          ))
        : null;
    }
    return null;
  };

  const [newClause, setNewClause] = useState("");
  const handleInputClauses = (e) => {
    const newValue = e.target.value;
    setNewClause(newValue);
  };
  const handleInputBlur = () => {
    if (newClause.trim() !== "") {
      const values = newClause.split(/[#$]/).filter(Boolean);
      const existingClauses = plan[0].groupDetailsJson.SectionMaster.Clauses;
      const uniqueValues = new Set(existingClauses.map((clause) => clause.Desc));
      values.forEach((value) => {
        if (!uniqueValues.has(value)) {
          existingClauses.push({
            Value: "",
            Applicable: "true",
            Desc: value,
          });
          uniqueValues.add(value);
        }
      });
      const updatedPlan = [...plan];
      updatedPlan[0].groupDetailsJson.SectionMaster.Clauses = existingClauses;
      setPlan(updatedPlan);
      setNewClause("");
    }
  };

  const [newExclusion, setNewExclusion] = useState("");
  const handleInputExclusion = (e) => {
    const newValue = e.target.value;
    setNewExclusion(newValue);
  };
  const handleInputBlurExclusion = () => {
    if (newExclusion.trim() !== "") {
      const values = newExclusion.split(/[#$]/).filter(Boolean);
      const existingExclusion = plan[0].groupDetailsJson.SectionMaster.Exclusion;
      const uniqueValues = new Set(existingExclusion.map((exclusions) => exclusions.Desc));
      values.forEach((value) => {
        if (!uniqueValues.has(value)) {
          existingExclusion.push({
            Value: "",
            Applicable: "true",
            Desc: value,
          });
          uniqueValues.add(value);
        }
      });
      const updatedPlan = [...plan];
      updatedPlan[0].groupDetailsJson.SectionMaster.Exclusion = existingExclusion;
      setPlan(updatedPlan);
      setNewExclusion("");
    }
  };

  const handleinputtypepercentage = (e, index) => {
    const fieldName = e.target.name;
    const inputValue = parseInt(e.target.value, 10);
    if (!Number.isNaN(inputValue) && inputValue >= 0 && inputValue <= 100) {
      const updatedBenefitDetails = {
        ...plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index],
        [fieldName]: inputValue,
        [fieldName === "FinancierPercentage" ? "CustomerNomineePercentage" : "FinancierPercentage"]:
          100 - inputValue,
      };
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index] = updatedBenefitDetails;
      setPlan([...plan]);
    } else if (Number.isNaN(inputValue) || inputValue === "") {
      const updatedBenefitDetails = {
        ...plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index],
        FinancierPercentage: "",
        CustomerNomineePercentage: "",
      };
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index] = updatedBenefitDetails;
      setPlan([...plan]);
    }
  };
  const handleinputtype = (e, index) => {
    // const value = parseInt(e.target.value, 10);
    const arr1 = plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index];
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][e.target.name] =
      e.target.value;
    if (e.target.name === "FixedCISI" || e.target.name === "MaxCISI") {
      const CISI = parseFloat(arr1[e.target.name]);
      if (!Number.isNaN(CISI)) {
        const value = CISI;
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = value;
      } else {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
      }
      setPlan([...plan]);
      setPlan([...plan]);
    }
    let persolaaccidentsi = "";
    if (e.target.name === "MaxPASIPerYear" || e.target.name === "FixedPASI") {
      const PASI = parseFloat(arr1[e.target.name]);
      if (!Number.isNaN(PASI)) {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = PASI;
      } else {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
      }
      setpasibeefitval(plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value);
      persolaaccidentsi = plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value;
      setPlan([...plan]);
    }
    if (e.target.name === "MaxMonthlySalary" || e.target.name === "NoofMonthsSalarytobePaid") {
      const MonthlySalary = parseFloat(arr1.MaxMonthlySalary);
      const noMonthsSalaryPaid = parseFloat(arr1.NoofMonthsSalarytobePaid);
      if (!Number.isNaN(MonthlySalary) && !Number.isNaN(noMonthsSalaryPaid)) {
        const calculatedBenefitSI = MonthlySalary * noMonthsSalaryPaid;
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value =
          calculatedBenefitSI;
      } else {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
      }
      setPlan([...plan]);
    }
    if (
      e.target.name === "MaxNoofDaysHospi" ||
      e.target.name === "PerDayBenefitICU" ||
      e.target.name === "PerDayBenefitNormal"
    ) {
      const maxDaysHospi = parseFloat(arr1.MaxNoofDaysHospi);
      const perDaySIICU = parseFloat(arr1.PerDayBenefitICU);
      const perDaySINormal = parseFloat(arr1.PerDayBenefitNormal);
      const maxPerDaySI = Math.max(perDaySIICU, perDaySINormal);
      const calculatedBenefitSI =
        Number.isNaN(maxPerDaySI) || Number.isNaN(maxDaysHospi) ? "" : maxPerDaySI * maxDaysHospi;
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value =
        calculatedBenefitSI;
      setPlan([...plan]);
    }

    if (
      e.target.name === "NoofDaysICU" ||
      e.target.name === "NoofDaysNormal" ||
      e.target.name === "PerDayBenefitICU" ||
      e.target.name === "PerDayBenefitNormal"
    ) {
      const perDaysSIICU = parseFloat(arr1.PerDayBenefitICU);
      const perDaysSINormal = parseFloat(arr1.PerDayBenefitNormal);
      const NoDaysNormal = parseFloat(arr1.NoofDaysNormal);
      const NoDaysICU = parseFloat(arr1.NoofDaysICU);

      if (
        (!Number.isNaN(NoDaysICU) && !Number.isNaN(perDaysSIICU)) ||
        (!Number.isNaN(NoDaysNormal) && !Number.isNaN(perDaysSINormal))
      ) {
        const calculatenormal = NoDaysNormal * perDaysSINormal;
        const calculateIcu = NoDaysICU * perDaysSIICU;
        const maxBenefitSI = Math.max(calculatenormal, calculateIcu);

        const calculatedValue = Number.isNaN(maxBenefitSI) ? "" : maxBenefitSI;
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = calculatedValue;
        setPlan([...plan]);
      }
    }

    if (
      e.target.name === "NoofEMIInstalments" ||
      e.target.name === "MaxEMIAmountMonthly" ||
      e.target.name === "MaxEMIPerYear"
    ) {
      const maxnoofinstalment = parseFloat(arr1.NoofEMIInstalments);
      const emiamountmonthly = parseFloat(arr1.MaxEMIAmountMonthly);
      const Emiperyear = parseFloat(arr1.MaxEMIPerYear);
      if (
        plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "Years" &&
        plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration !== ""
      ) {
        const countofpolicyduration = parseFloat(
          plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration
        );
        if (
          !Number.isNaN(countofpolicyduration) &&
          !Number.isNaN(emiamountmonthly) &&
          !Number.isNaN(Emiperyear) &&
          !Number.isNaN(maxnoofinstalment)
        ) {
          const Calculateemimonthly = emiamountmonthly * maxnoofinstalment;
          const Calculateemiyear = Emiperyear * countofpolicyduration;
          const minemibenefit = Math.min(Calculateemimonthly, Calculateemiyear);
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = minemibenefit;
        } else {
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
        }
      }
      if (
        plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "Months" &&
        plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration !== ""
      ) {
        let countofpolicy = parseFloat(
          plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration
        );
        countofpolicy /= 12;
        if (
          !Number.isNaN(countofpolicy) &&
          !Number.isNaN(emiamountmonthly) &&
          !Number.isNaN(Emiperyear) &&
          !Number.isNaN(maxnoofinstalment)
        ) {
          const Calculateemimonthly = emiamountmonthly * maxnoofinstalment;
          const Calculateemiyear = Emiperyear * countofpolicy;
          const minemibenefit = Math.min(Calculateemimonthly, Calculateemiyear);
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = minemibenefit;
        } else {
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
        }
      }
      setPlan([...plan]);
    }
    if (e.target.name === "FixedMonthlyEMIAmount" || e.target.name === "NoofEMIInstalments") {
      const fixedemiamount = parseFloat(arr1.FixedMonthlyEMIAmount);
      const noofinstalment = parseFloat(arr1.NoofEMIInstalments);
      if (!Number.isNaN(fixedemiamount) && !Number.isNaN(noofinstalment)) {
        const CalculateEmisiFixed = fixedemiamount * noofinstalment;
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value =
          CalculateEmisiFixed;
      } else if (Number.isNaN(fixedemiamount) && Number.isNaN(noofinstalment)) {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
      }
      setPlan([...plan]);
    }
    if (
      e.target.name === "PerChildSI" ||
      e.target.name === "MaxCEGSIPerYear" ||
      e.target.name === "CountofChildren"
    ) {
      const suminsured = parseFloat(arr1.PerChildSI);
      const MaxCEG = parseFloat(arr1.MaxCEGSIPerYear);
      const countchildren = parseFloat(arr1.CountofChildren);
      if (!Number.isNaN(countchildren) && !Number.isNaN(suminsured) && !Number.isNaN(MaxCEG)) {
        const Childrenedugrantfixed = countchildren * suminsured;
        const minimumval = Math.min(Childrenedugrantfixed, MaxCEG);
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = minimumval;
      } else {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
      }
    }

    if (
      e.target.name === "PercofPASI" ||
      e.target.name === "MaxCEGSIPerYear" ||
      e.target.name === "CountofChildren"
    ) {
      let perpasi = parseFloat(arr1.PercofPASI);
      let MaxCEG = parseFloat(arr1.MaxCEGSIPerYear);
      let countchildren = parseFloat(arr1.CountofChildren);
      let personalaccidentsi = 0;
      BenefitTypes.forEach((z, id) => {
        const selectedCoverName =
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id]?.CoverName || "";
        if (selectedCoverName === "Personal Accident") {
          personalaccidentsi =
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].Value;
        }
        if (selectedCoverName === "Child Education Grant") {
          perpasi = parseFloat(
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].PercofPASI
          );
          MaxCEG = parseFloat(
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].MaxCEGSIPerYear
          );
          countchildren = parseFloat(
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].CountofChildren
          );
          if (
            !Number.isNaN(countchildren) &&
            !Number.isNaN(perpasi) &&
            !Number.isNaN(personalaccidentsi) &&
            !Number.isNaN(MaxCEG)
          ) {
            if (perpasi >= 0 && perpasi <= 100) {
              const percentagecal = (personalaccidentsi / 100) * perpasi;
              const Childrenedugrantpercentage = countchildren * percentagecal;
              const minimumval = Math.min(Childrenedugrantpercentage, MaxCEG);
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value =
                minimumval;
            }
          } else if (
            Number.isNaN(countchildren) &&
            Number.isNaN(perpasi) &&
            Number.isNaN(personalaccidentsi) &&
            Number.isNaN(MaxCEG)
          ) {
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value = "";
          }
        }
      });
    }
    const checksi =
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails;
    checksi.forEach((z, id1) => {
      const selectedCoverName2 = checksi[id1].PABenefitName || "";
      const array1 = checksi[id1];
      const percenatageCalc = parseFloat(array1.PABenefitPercentage);
      if (
        selectedCoverName2 === "Accidental Death" ||
        selectedCoverName2 === "Permanent Partial Disability" ||
        selectedCoverName2 === "Temporary Total Disability" ||
        selectedCoverName2 === "Permanent Total Disability"
      ) {
        if (!Number.isNaN(percenatageCalc) && array1.PABenefitYN === "Yes") {
          if (!Number.isNaN(persolaaccidentsi) && persolaaccidentsi !== "") {
            const percentagecalpa = (persolaaccidentsi / 100) * percenatageCalc;
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
              index
            ].PersonalAccidentDetails[id1].PABenefitSI = percentagecalpa;
          } else {
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
              index
            ].PersonalAccidentDetails[id1].PABenefitSI = "";
          }
        }
      }
    });

    setPlan([...plan]);
  };

  const handlepapercentage = (e, index, id, value) => {
    if (e.target.name === "DaysADBenefitApplicable") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({
          ...prevState,
          DaysADBenefitError: true,
        }));
      } else {
        setOnblurvalidation((prevState) => ({
          ...prevState,
          DaysADBenefitError: false,
        }));
      }
    }
    if (e.target.name === "DaysPPDBenefitApplicable") {
      if (!regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({
          ...prevState,
          DaysPPDBenefitError: true,
        }));
      } else {
        setOnblurvalidation((prevState) => ({
          ...prevState,
          DaysPPDBenefitError: false,
        }));
      }
    }
    if (e.target.name === "DaysPTDBenefitApplicable") {
      if (!regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({
          ...prevState,
          DaysPTDBenefitError: true,
        }));
      } else {
        setOnblurvalidation((prevState) => ({
          ...prevState,
          DaysPTDBenefitError: false,
        }));
      }
    }
    if (e.target.name === "DaysTTDBenefitApplicable") {
      if (!regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({
          ...prevState,
          DaysTTDBenefitError: true,
        }));
      } else {
        setOnblurvalidation((prevState) => ({
          ...prevState,
          DaysTTDBenefitError: false,
        }));
      }
    }
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][e.target.name] =
      e.target.value;
    setPlan([...plan]);
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[id][
      e.target.name
    ] = e.target.value;
    setPlan([...plan]);
    const arr1 =
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
        id
      ];
    const percenatageCalc = parseFloat(arr1.PABenefitPercentage);
    if (value === "Accidental Death" && e.target.name !== "") {
      if (!Number.isNaN(percenatageCalc) && !Number.isNaN(pasibenefitval)) {
        const percentagecalpa = (pasibenefitval / 100) * percenatageCalc;
        setpercalculationAD(percentagecalpa);
      }
      if (
        !Number.isNaN(percenatageCalc) &&
        !Number.isNaN(pasibenefitval) &&
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitYN === "Yes"
      ) {
        const percentagecalpa = (pasibenefitval / 100) * percenatageCalc;
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitSI = percentagecalpa;
      } else {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitSI = "";
      }
    }
    if (value === "Permanent Partial Disability") {
      if (!Number.isNaN(percenatageCalc) && !Number.isNaN(pasibenefitval)) {
        const percentagecalpa = (pasibenefitval / 100) * percenatageCalc;
        setpercalculationPPD(percentagecalpa);
      }
      if (
        !Number.isNaN(percenatageCalc) &&
        !Number.isNaN(pasibenefitval) &&
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitYN === "Yes"
      ) {
        const percentagecalpa = (pasibenefitval / 100) * percenatageCalc;
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitSI = percentagecalpa;
      } else {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitSI = "";
      }
    }
    if (value === "Temporary Total Disability") {
      if (!Number.isNaN(percenatageCalc) && !Number.isNaN(pasibenefitval)) {
        const percentagecalpa = (pasibenefitval / 100) * percenatageCalc;
        setpercalculationTTD(percentagecalpa);
      }
      if (
        !Number.isNaN(percenatageCalc) &&
        !Number.isNaN(pasibenefitval) &&
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitYN === "Yes"
      ) {
        const percentagecalpa = (pasibenefitval / 100) * percenatageCalc;
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitSI = percentagecalpa;
      } else {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitSI = "";
      }
    }
    if (value === "Permanent Total Disability") {
      if (!Number.isNaN(percenatageCalc) && !Number.isNaN(pasibenefitval)) {
        const percentagecalpa = (pasibenefitval / 100) * percenatageCalc;
        setpercalculationPTD(percentagecalpa);
      }
      if (
        !Number.isNaN(percenatageCalc) &&
        !Number.isNaN(pasibenefitval) &&
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitYN === "Yes"
      ) {
        const percentagecalpa = (pasibenefitval / 100) * percenatageCalc;
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitSI = percentagecalpa;
      } else {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].PersonalAccidentDetails[
          id
        ].PABenefitSI = "";
      }
    }
    setPlan([...plan]);
  };
  const handleinputtypematernity = (e, index) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        PEDwaitingperiodError: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        PEDwaitingperiodError: false,
      }));
    }
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][e.target.name] =
      e.target.value;
    setPlan([...plan]);
  };

  const handleSelectAll = (e, id) => {
    const updatedPlan = [...plan];
    updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].Ailmentmaster[
      e.target.name
    ] = e.target.value;
    if (e.target.value === "selectAllYes") {
      updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].Ailmentmaster =
        updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].Ailmentmaster.map(
          (ailment) => ({
            ...ailment,
            Applicable: "Yes",
            WaitingPeriod: "",
          })
        );
    }
    if (e.target.value === "selectAllNo") {
      updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].Ailmentmaster =
        updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].Ailmentmaster.map(
          (ailment) => ({
            ...ailment,
            Applicable: "No",
            WaitingPeriod: "24",
          })
        );
    }
    setPlan(updatedPlan);
  };

  console.log("AgeBand", fieldsetageband);
  const handleplan = (e, value, name) => {
    const valueWithoutSpaces = value.replace(/\s/g, "");
    if (name === "PolicyDuration" && value === "Months") {
      const val = "Per Policy period".replace(/\s/g, "");
      plan[0].groupDetailsJson.SectionMaster.RateTerm = val;
      plan[0].groupDetailsJson.SectionMaster[name] = valueWithoutSpaces;
      setPlan([...plan]);
    } else if (name === "PolicyDuration" && value === "Years") {
      plan[0].groupDetailsJson.SectionMaster.RateTerm = "";
      plan[0].groupDetailsJson.SectionMaster[name] = valueWithoutSpaces;
      setPlan([...plan]);
    }
    if (name === "SumInsuredType" || name === "RateTerm") {
      plan[0].groupDetailsJson.SectionMaster[name] = valueWithoutSpaces;
      setPlan([...plan]);
    }
    BenefitTypes.forEach((z, index) => {
      const selectedCoverName =
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]?.CoverName || "";
      if (selectedCoverName === "EMI Benefit") {
        const emiamountmonthly = parseFloat(
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxEMIAmountMonthly
        );
        const Emiperyear = parseFloat(
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxEMIPerYear
        );
        const maxnoofinstalment = parseFloat(
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].NoofEMIInstalments
        );
        if (
          plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "Years" &&
          plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration !== ""
        ) {
          const countofpolicyduration = parseFloat(
            plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration
          );
          if (
            !Number.isNaN(countofpolicyduration) &&
            !Number.isNaN(emiamountmonthly) &&
            !Number.isNaN(Emiperyear) &&
            !Number.isNaN(maxnoofinstalment)
          ) {
            const Calculateemimonthly = emiamountmonthly * maxnoofinstalment;
            const Calculateemiyear = Emiperyear * countofpolicyduration;
            const minemibenefit = Math.min(Calculateemimonthly, Calculateemiyear);
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value =
              minemibenefit;
          }
        }
        if (
          plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "Months" &&
          plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration !== ""
        ) {
          let countofpolicy = parseFloat(
            plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration
          );
          countofpolicy /= 12;
          if (
            !Number.isNaN(countofpolicy) &&
            !Number.isNaN(emiamountmonthly) &&
            !Number.isNaN(Emiperyear) &&
            !Number.isNaN(maxnoofinstalment)
          ) {
            const Calculateemimonthly = emiamountmonthly * maxnoofinstalment;
            const Calculateemiyear = Emiperyear * countofpolicy;
            const minemibenefit = Math.min(Calculateemimonthly, Calculateemiyear);
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value =
              minemibenefit;
          }
        }
      }
    });
  };
  const handlevalidationerror = (e, value) => {
    if (e.target.name === "MinNoofDaysHospi") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, MinNoofdaysofHospitalization: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, MinNoofdaysofHospitalization: false }));
      }
    }
    if (e.target.name === "MaxNoofDaysHospi") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxnoofHospitalization: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxnoofHospitalization: false }));
      }
    }
    if (e.target.name === "NoofDaysNormal") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, NoOfHospitalizationNormal: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, NoOfHospitalizationNormal: false }));
      }
    }
    if (e.target.name === "NoofDaysICU") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, NoOfHospitalizationICU: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, NoOfHospitalizationICU: false }));
      }
    }
    if (e.target.name === "PerDayBenefitNormal") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, PerDayBenefitNormal: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, PerDayBenefitNormal: false }));
      }
    }
    if (e.target.name === "PerDayBenefitICU") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, PerDayBenefitICU: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, PerDayBenefitICU: false }));
      }
    }
    if (e.target.name === "MaxEMIPerYear") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxEMIPerYearEror: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxEMIPerYearEror: false }));
      }
    }
    if (e.target.name === "MaxEMIAmountMonthly") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, MonthlyEMIError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, MonthlyEMIError: false }));
      }
    }
    if (e.target.name === "FixedMonthlyEMIAmount") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, FixedMonthlyEMIError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, FixedMonthlyEMIError: false }));
      }
    }
    if (e.target.name === "NoofEMIInstalments") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, NoEmiInstallementError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, NoEmiInstallementError: false }));
      }
    }
    if (e.target.name === "FixedCISI") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, FixedCISIError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, FixedCISIError: false }));
      }
    }
    if (e.target.name === "MaxCISI") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxCISIError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxCISIError: false }));
      }
    }
    if (e.target.name === "MaxPASIPerYear") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxPASIError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxPASIError: false }));
      }
    }
    if (e.target.name === "FixedPASI") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, FixedPASIError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, FixedPASIError: false }));
      }
    }
    if (e.target.name === "MaxMonthlySalary") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxSalaryAllowedError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxSalaryAllowedError: false }));
      }
    }
    if (e.target.name === "NoofMonthsSalarytobePaid") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, MonthsalaryPaidError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, MonthsalaryPaidError: false }));
      }
    }
    if (e.target.name === "CountofChildren") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, NoOfChldrenError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, NoOfChldrenError: false }));
      }
    }
    if (e.target.name === "PercofPASI") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, PercentagePASIError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, PercentagePASIError: false }));
      }
    }
    if (e.target.name === "PerChildSI") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, PerChildSiError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, PerChildSiError: false }));
      }
    }
    if (e.target.name === "PABenefitPercentage" && value === "Accidental Death") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, PABenefitPercentageADError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, PABenefitPercentageADError: false }));
      }
    }
    if (e.target.name === "PABenefitPercentage" && value === "Permanent Partial Disability") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, PABenefitPercentagePPDError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, PABenefitPercentagePPDError: false }));
      }
    }
    if (e.target.name === "PABenefitPercentage" && value === "Permanent Total Disability") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, PABenefitPercentagePTDError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, PABenefitPercentagePTDError: false }));
      }
    }
    if (e.target.name === "PABenefitPercentage" && value === "Temporary Total Disability") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, PABenefitPercentageTTDError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, PABenefitPercentageTTDError: false }));
      }
    }
    if (e.target.name === "MaxCEGSIPerYear") {
      if (!Regex.test(e.target.value)) {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxCEGSILIMITError: true }));
      } else {
        setOnblurvalidation((prevState) => ({ ...prevState, MaxCEGSILIMITError: false }));
      }
    }
  };
  const handleMDinputtypeIndividual = (e, index) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        MaxIndividualclaimError: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        MaxIndividualclaimError: false,
      }));
    }
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][e.target.name] =
      e.target.value;
    setPlan([...plan]);
  };
  const handleinputtypeRate = (e, index) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        RateError: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        RateError: false,
      }));
    }
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][e.target.name] =
      e.target.value;
    setPlan([...plan]);
  };

  const handleMDinputtypeFamily = (e, index) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        MaxFamilyclaimsError: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        MaxFamilyclaimsError: false,
      }));
    }
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][e.target.name] =
      e.target.value;
    setPlan([...plan]);
  };

  const handleinputtypeDeductibleNormal = (e, index) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        DeductibledaysNormal: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        DeductibledaysNormal: false,
      }));
    }
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][e.target.name] =
      e.target.value;
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].DeductibleICU =
      e.target.value;
    setPlan([...plan]);
  };
  const handleinputtypeDeductibleICU = (e, index) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        DeductibledaysICU: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        DeductibledaysICU: false,
      }));
    }
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][e.target.name] =
      e.target.value;
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].DeductibleNormal =
      e.target.value;
    setPlan([...plan]);
  };
  const handleinputtypeDeductible = (e, index) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        DeductibleDays: true,
      }));
    } else {
      setOnblurvalidation(() => ({
        DeductibleDays: false,
      }));
    }
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index][e.target.name] =
      e.target.value;
    setPlan([...plan]);
  };
  const handleplaninputtype = (e) => {
    if (!Regex.test(e.target.value)) {
      setPlanlevelvalidation((prevState) => ({
        ...prevState,
        NumberError: true,
      }));
    } else {
      setPlanlevelvalidation(() => ({
        NumberError: false,
      }));
    }
    plan[0].groupDetailsJson.SectionMaster[e.target.name] = e.target.value;
    setPlan([...plan]);
    BenefitTypes.forEach((z, index) => {
      const selectedCoverName =
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]?.CoverName || "";
      if (selectedCoverName === "EMI Benefit") {
        const emiamountmonthly = parseFloat(
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxEMIAmountMonthly
        );
        const Emiperyear = parseFloat(
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxEMIPerYear
        );
        const maxnoofinstalment = parseFloat(
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].NoofEMIInstalments
        );
        if (
          plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "Years" &&
          plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration !== ""
        ) {
          const countofpolicyduration = parseFloat(
            plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration
          );
          if (
            !Number.isNaN(countofpolicyduration) &&
            !Number.isNaN(emiamountmonthly) &&
            !Number.isNaN(Emiperyear) &&
            !Number.isNaN(maxnoofinstalment)
          ) {
            const Calculateemimonthly = emiamountmonthly * maxnoofinstalment;
            const Calculateemiyear = Emiperyear * countofpolicyduration;
            const minemibenefit = Math.min(Calculateemimonthly, Calculateemiyear);
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value =
              minemibenefit;
          }
        }
        if (
          plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "Months" &&
          plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration !== ""
        ) {
          let countofpolicy = parseFloat(
            plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration
          );
          countofpolicy /= 12;
          if (
            !Number.isNaN(countofpolicy) &&
            !Number.isNaN(emiamountmonthly) &&
            !Number.isNaN(Emiperyear) &&
            !Number.isNaN(maxnoofinstalment)
          ) {
            const Calculateemimonthly = emiamountmonthly * maxnoofinstalment;
            const Calculateemiyear = Emiperyear * countofpolicy;
            const minemibenefit = Math.min(Calculateemimonthly, Calculateemiyear);
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Value =
              minemibenefit;
          }
        }
      }
    });
  };
  const handleplaninputtypeCOI = (e) => {
    if (!Regex.test(e.target.value)) {
      setPlanlevelvalidation((prevState) => ({
        ...prevState,
        COIThreshholdError: true,
      }));
    } else {
      setPlanlevelvalidation(() => ({
        COIThreshholdError: false,
      }));
    }
    plan[0].groupDetailsJson.SectionMaster[e.target.name] = e.target.value;
    setPlan([...plan]);
  };
  const handleplaninputtypestart = (e) => {
    const { name, value } = e.target;
    if (name === "MinimumAdultAge") {
      if (!Regex.test(value)) {
        setPlanlevelvalidation((prevState) => ({
          ...prevState,
          Minageerror: true,
        }));
      } else {
        setPlanlevelvalidation((prevState) => ({
          ...prevState,
          Minageerror: false,
          [name]: value,
        }));
      }
      const minadultdage = parseFloat(value);
      const minAgeforadult = parseFloat(
        planDetailsDto?.AdditionalDetails.Dependents[0].MiniAgeInYear
      );
      const maxAgeforadult = parseFloat(
        planDetailsDto?.AdditionalDetails.Dependents[0].MaxAgeInYear
      );
      if (minadultdage < minAgeforadult || (minadultdage > maxAgeforadult && minadultdage !== "")) {
        SetMinadultage(
          `Minimum Adult Age should be between ${minAgeforadult} and ${maxAgeforadult}`
        );
      } else if (plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge !== "") {
        const minadultage = parseInt(value, 10);
        const maxadultage = parseInt(plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge, 10);

        if (minadultage >= maxadultage) {
          SetMinadultage(`Minimum Age should be Less than Maximum Age (${maxadultage})`);
        } else {
          SetMinadultage("");
        }
        if (minadultage < maxadultage && maxadultage <= maxAgeforadult) {
          SetMaxadultdage("");
        }
      } else {
        SetMinadultage("");
      }
    }
    plan[0].groupDetailsJson.SectionMaster[name] = value;
    setPlan([...plan]);
  };
  const handleplanMaxchildAgeinputtype = (e) => {
    const { name, value } = e.target;
    if (name === "MaximumChildAge") {
      if (!Regex.test(value)) {
        setPlanlevelvalidation((prevState) => ({
          ...prevState,
          MaxchildAgeError: true,
        }));
      } else {
        setPlanlevelvalidation((prevState) => ({
          ...prevState,
          MaxchildAgeError: false,
          [name]: value,
        }));

        const maxchildage = parseFloat(value);
        const minAgeforChild = parseFloat(
          planDetailsDto?.AdditionalDetails.Dependents[0].MiniAgeforChildInYear
        );
        const maxAgeforChild = parseFloat(
          planDetailsDto?.AdditionalDetails.Dependents[0].MaxAgeforChildInYear
        );

        if (maxchildage < minAgeforChild || (maxchildage > maxAgeforChild && maxchildage !== "")) {
          SetMaxChildage(
            `Maximum Child Age should be between ${minAgeforChild} and ${maxAgeforChild}`
          );
        } else if (plan[0].groupDetailsJson.SectionMaster.MinimumChildAge !== "") {
          const maxchildAge = parseInt(value, 10);
          const minchildAge = parseInt(plan[0].groupDetailsJson.SectionMaster.MinimumChildAge, 10);

          if (minchildAge >= maxchildAge) {
            SetMaxChildage(`Maximum Age should be greater than Minimum Age (${minchildAge})`);
          } else {
            SetMaxChildage("");
          }
          if (maxchildAge > minchildAge && minchildAge >= minAgeforChild) {
            SetMinChildage("");
          }
        } else {
          SetMaxChildage("");
        }
      }
    }
    plan[0].groupDetailsJson.SectionMaster[name] = value;
    setPlan([...plan]);
  };
  const handleplanchildinputtype = (e) => {
    const { name, value } = e.target;
    if (name === "MinimumChildAge") {
      if (!Regex.test(value)) {
        setPlanlevelvalidation((prevState) => ({
          ...prevState,
          MinchildAgeError: true,
        }));
      } else {
        setPlanlevelvalidation((prevState) => ({
          ...prevState,
          MinchildAgeError: false,
          [name]: value,
        }));
      }
      const minChildAge = parseFloat(value);
      const minAgeforChild = parseFloat(
        planDetailsDto?.AdditionalDetails.Dependents[0].MiniAgeforChildInYear
      );
      const maxAgeforChild = parseFloat(
        planDetailsDto?.AdditionalDetails.Dependents[0].MaxAgeforChildInYear
      );
      if (minChildAge < minAgeforChild || (minChildAge > maxAgeforChild && minChildAge !== "")) {
        SetMinChildage(
          `Minimum Child Age should be between ${minAgeforChild} and ${maxAgeforChild}`
        );
      } else if (plan[0].groupDetailsJson.SectionMaster.MaximumChildAge !== "") {
        const minchildAge = parseInt(value, 10);
        const maxchildAge = parseInt(plan[0].groupDetailsJson.SectionMaster.MaximumChildAge, 10);

        if (minchildAge >= maxchildAge) {
          SetMinChildage(`Minimum Age should be less than Maximum Age (${maxchildAge})`);
        } else {
          SetMinChildage("");
        }
        if (minchildAge < maxchildAge && maxchildAge <= maxAgeforChild) {
          SetMaxChildage("");
        }
      } else {
        SetMinChildage("");
      }
    }
    plan[0].groupDetailsJson.SectionMaster[name] = value;
    setPlan([...plan]);
    BenefitTypes.forEach((z, index) => {
      const selectedCoverName =
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]?.CoverName || "";
      if (selectedCoverName !== "") {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MinAge = value;
        setPlan([...plan]);
      }
    });
  };
  const handlechildinputtype = (e, index) => {
    const inputValue = e.target.value.trim() === "" ? "" : parseInt(e.target.value, 10);
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MinAge = inputValue;
    const minimumChildAge = plan[0].groupDetailsJson.SectionMaster.MinimumChildAge;
    const maxadultage = plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge;
    const inputmaxage = parseInt(maxadultage, 10);
    const inputminage = parseInt(minimumChildAge, 10);
    if (inputValue < inputminage || (inputValue > inputmaxage && inputValue !== "")) {
      setErrorminage(`Minimum  Age should be between ${inputminage} and ${inputmaxage}`);
    } else if (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxAge !== "") {
      const minAge = parseInt(inputValue, 10);
      const maxAge = parseInt(
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxAge,
        10
      );
      if (minAge >= maxAge) {
        setErrorminage(`Minimum Age should be less than Maximum Age (${maxAge})`);
      } else {
        setErrorminage("");
      }
      if (minAge < maxAge && maxAge <= inputmaxage) {
        setErroradultage("");
      }
    } else {
      setErrorminage("");
    }
    if (
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MinAge >= inputminage ||
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MinAge <= inputmaxage
    ) {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MinAge = inputValue;
    } else {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MinAge = inputValue;
    }
    setPlan([...plan]);
  };
  const handleplanMAxadultinputtype = (e) => {
    const { name, value } = e.target;
    if (name === "MaximumAdultAge") {
      if (!Regex.test(value)) {
        setPlanlevelvalidation((prevState) => ({
          ...prevState,
          MaxadultAgeError: true,
        }));
      } else {
        setPlanlevelvalidation((prevState) => ({
          ...prevState,
          MaxadultAgeError: false,
          [name]: value,
        }));
      }
      const maxadultdage = parseFloat(value);
      const minAgeforadult = parseFloat(
        planDetailsDto?.AdditionalDetails.Dependents[0].MiniAgeInYear
      );
      const maxAgeforadult = parseFloat(
        planDetailsDto?.AdditionalDetails.Dependents[0].MaxAgeInYear
      );
      if (maxadultdage < minAgeforadult || (maxadultdage > maxAgeforadult && maxadultdage !== "")) {
        SetMaxadultdage(
          `Maximum Adult Age should be between ${minAgeforadult} and ${maxAgeforadult}`
        );
      } else if (plan[0].groupDetailsJson.SectionMaster.MinimumAdultAge !== "") {
        const maxadultage = parseInt(value, 10);
        const minadultage = parseInt(plan[0].groupDetailsJson.SectionMaster.MinimumAdultAge, 10);

        if (minadultage >= maxadultage) {
          SetMaxadultdage(`Maximum Age should be greater than Minimum Age (${minadultage})`);
        } else {
          SetMaxadultdage("");
        }
        if (maxadultage > minadultage && minadultage >= minAgeforadult) {
          SetMinadultage("");
        }
      } else {
        SetMaxadultdage("");
      }
    }
    plan[0].groupDetailsJson.SectionMaster[name] = value;
    setPlan([...plan]);
    BenefitTypes.forEach((z, index) => {
      const selectedCoverName =
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]?.CoverName || "";
      if (selectedCoverName !== "") {
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxAge = value;
        setPlan([...plan]);
      }
    });
  };
  const handlechildMaxageinputtype = (e, index) => {
    const inputValue = e.target.value.trim() === "" ? "" : parseInt(e.target.value, 10);
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxAge = inputValue;
    const maximumChildAge = plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge;
    const inputmaxage = parseInt(maximumChildAge, 10);
    const minimumChildAge = plan[0].groupDetailsJson.SectionMaster.MinimumChildAge;
    const inputminage = parseInt(minimumChildAge, 10);
    if (inputValue > inputmaxage || (inputValue < inputminage && inputValue !== "")) {
      setErroradultage(`Maximum age should be between ${inputminage} and ${inputmaxage}`);
    } else if (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MinAge !== "") {
      const maxage = parseInt(inputValue, 10);
      const minage = parseInt(
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MinAge,
        10
      );
      if (maxage <= minage) {
        setErroradultage(`Maximum Age should be greater than Minimun Age (${minage})`);
      } else {
        setErroradultage("");
      }
      if (maxage > minage && minage >= inputminage) {
        setErrorminage("");
      }
    } else {
      setErroradultage("");
    }
    if (
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxAge <= inputmaxage ||
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxAge >= inputminage
    ) {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxAge = inputValue;
    } else {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].MaxAge = inputValue;
    }
    setPlan([...plan]);
  };
  const [DisplayName, setDisplayName] = useState("");
  const handlePlanGroup = (e) => {
    if (e.target.name === "DisplayName") {
      const newDisplayName = e.target.value;
      if (!regex.test(newDisplayName)) {
        setErrorMsg("Only Alphabets and Numbers are allowed");
        return;
      }
      const lowercaseNewDisplayName = newDisplayName.toLowerCase();
      const isNameExisting = planDetailsDto?.PlanDetailsJson?.some(
        (item) => item.DisplayName.toLowerCase() === lowercaseNewDisplayName
      );
      if (isNameExisting) {
        setErrorMsg("Plan name already exists");
      } else {
        setErrorMsg("");
      }
      plan[0].DisplayName = newDisplayName;
      plan[0].groupDetailsJson.SectionMaster.DisplayName = newDisplayName;
      const concatenatedValue = `${masterId}_${newDisplayName}`;
      plan[0].groupName = concatenatedValue;
      setPlan([...plan]);
      setDisplayName(concatenatedValue);
    }
  };

  const handlePlanDetails = (e, id, index) => {
    if (!Regex.test(e.target.value)) {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        [`waitingperiodError${index}`]: true,
      }));
    } else {
      setOnblurvalidation((prevState) => ({
        ...prevState,
        [`waitingperiodError${index}`]: false,
      }));
    }
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].Ailmentmaster[index][
      e.target.name
    ] = e.target.value;
    setPlan([...plan]);
  };

  const handleRadioChangeAilment = (e, index, id) => {
    const updatedPlan = [...plan];
    const benefitDetails =
      updatedPlan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index].Ailmentmaster[id];
    benefitDetails.Applicable = e.target.value;
    if (e.target.value === "No") {
      benefitDetails.WaitingPeriod = "24";
    } else {
      benefitDetails.WaitingPeriod = "";
    }
    setPlan(updatedPlan);
  };

  const [selectAllExclusion, setSelectAllExclusion] = useState(false);
  const handleMasterCheckboxChangeExclution = () => {
    setSelectAllExclusion(!selectAllExclusion);
    const updatedClauses = plan[0].groupDetailsJson.SectionMaster.Exclusion.map((clause) => ({
      ...clause,
      Applicable: !selectAllExclusion ? "true" : "false",
    }));
    plan[0].groupDetailsJson.SectionMaster.Exclusion = updatedClauses;
  };

  const handleExclusionapplicable = (e, index) => {
    const updatedClauses = [...plan[0].groupDetailsJson.SectionMaster.Exclusion];
    updatedClauses[index].Applicable = e.target.checked ? "true" : "false";
    plan[0].groupDetailsJson.SectionMaster.Exclusion = updatedClauses;
    // setSelectAllExclusion(updatedClauses);
    setPlan([...plan]);
    const allApplicable = updatedClauses.every((clause) => clause.Applicable === "true");
    const allNonApplicable = updatedClauses.every((clause) => clause.Applicable === "false");
    if (allApplicable) {
      setSelectAllExclusion(updatedClauses);
    } else if (allNonApplicable) {
      setSelectAllExclusion(false);
    }
  };

  const [selectAll, setSelectAll] = useState(false);
  const handleMasterCheckboxChange = () => {
    setSelectAll(!selectAll);
    const updatedClauses = plan[0].groupDetailsJson.SectionMaster.Clauses.map((clause) => ({
      ...clause,
      Applicable: !selectAll ? "true" : "false",
    }));
    plan[0].groupDetailsJson.SectionMaster.Clauses = updatedClauses;
  };

  const handleclusesapplicable = (e, index) => {
    const updatedClauses = [...plan[0].groupDetailsJson.SectionMaster.Clauses];
    updatedClauses[index].Applicable = e.target.checked ? "true" : "false";
    plan[0].groupDetailsJson.SectionMaster.Clauses = updatedClauses;
    // setSelectAll(updatedClauses);
    setPlan([...plan]);
    const allApplicable = updatedClauses.every((clause) => clause.Applicable === "true");
    const allNonApplicable = updatedClauses.every((clause) => clause.Applicable === "false");
    if (allApplicable) {
      setSelectAll(updatedClauses);
    } else if (allNonApplicable) {
      setSelectAll(false);
    }
  };

  const handlePersonalAccident = (e, id, index, value) => {
    // const updatedADType = [...ADType]; // Create a copy of ADType array aaa
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].PersonalAccidentDetails[index][
      e.target.name
    ] = e.target.value;
    setPlan([...plan]);

    if (e.target.value === "Yes" && value === "Accidental Death") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].PersonalAccidentDetails[
        index
      ].PABenefitSI = percalculationAD;

      // const rate = percalculationAD / 1000;
      // if (index < updatedADType.length) {
      //   updatedADType[index] = { value, rate };
      // } else {
      //   updatedADType.push({ value, rate });
      // }
      // console.log("134", ADType);
      // setADType(updatedADType); aaa
    } else if (e.target.value === "Yes" && value === "Permanent Partial Disability") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].PersonalAccidentDetails[
        index
      ].PABenefitSI = percalculationPPD;
      // const rate = percalculationAD / 1000;
      // if (index < updatedADType.length) {
      //   updatedADType[index] = { value, rate };
      // } else {
      //   updatedADType.push({ value, rate });
      // }

      // setADType(updatedADType); aaa
    } else if (e.target.value === "Yes" && value === "Permanent Total Disability") {
      // const rate = percalculationPTD / 1000;  aaa
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].PersonalAccidentDetails[
        index
      ].PABenefitSI = percalculationPTD;

      // if (index < updatedADType.length) {
      //   updatedADType[index] = { value, rate };
      // } else {
      //   updatedADType.push({ value, rate });
      // }

      // setADType(updatedADType); aaa
    } else if (e.target.value === "Yes" && value === "Temporary Total Disability") {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].PersonalAccidentDetails[
        index
      ].PABenefitSI = percalculationTTD;
      // const rate = percalculationTTD / 1000;
      // if (index < updatedADType.length) {
      //   updatedADType[index] = { value, rate };
      // } else {
      //   updatedADType.push({ value, rate });
      // }
      // setADType(updatedADType); aaa
    } else {
      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[id].PersonalAccidentDetails[
        index
      ].PABenefitSI = "";
    }
  };
  console.log("123", plan);

  const [openDelmsg, setDelOpenmsg] = useState(false);
  const [deleteSucess, setDeleteSuccess] = useState(false);

  const handleDelClose = () => {
    setDelOpen(false);
  };

  const newPlan = {
    PlanName: "",
    PolicyDuration: "",
    CountofPolicyDuration: "",
    Clauses: "",
    Exclusion: "",
  };
  let rate1 = 0;
  let rate2 = 0;
  let rate3 = 0;
  let rate4 = 0;
  let rate5 = 0;
  const createExcelFileAndDownload = async (data, fileName, id) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: fileType });

    const formData = new FormData();
    formData.append("Sample.xlsx", excelBlob, fileName);

    if (id === 2778) {
      rate1 = await GetRateReupload(2778, formData);
      // console.log("rate1", rate1);
    } else if (id === 1986) {
      rate2 = await GetRateReupload(1986, formData);
    } else if (id === 1987) {
      rate3 = await GetRateReupload(1987, formData);
    } else if (id === 1988) {
      rate4 = await GetRateReupload(1988, formData);
    } else if (id === 1989) {
      rate5 = await GetRateReupload(1989, formData);
    }
    if (
      (rate1.status === 200 && rate2.status === 200 && rate3.status === 200) ||
      rate4.status === 200 ||
      rate5.status === 200
    ) {
      setIsDrawerOpen(true); // Brought this flag here from handleclicksubmit
      setOpen(true); // because previously swal come before api call
      setLoading(false);
    }
  };
  const handlebenefitvalid = () => {
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.forEach((item, i) => {
      if (item.CoverName === "Hospicash") {
        item.AgeBand.forEach((ageband, index) => {
          if (
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .HospitalizationCriteria === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .CustomerNomineePercentage === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PerDayBenefitNormal ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PerDayBenefitICU ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].InitialWaitingPeriod ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateType === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PremiumUnit === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Full" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Rate === "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinNoofDaysHospi ===
              "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .HospitalizationCriteria === "Combined" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxNoofDaysHospi ===
                "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .HospitalizationCriteria === "Combined" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Deductible === "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .HospitalizationCriteria === "Separate" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].NoofDaysNormal ===
                "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .HospitalizationCriteria === "Separate" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].NoofDaysICU === "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .HospitalizationCriteria === "Separate" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].DeductibleICU ===
                "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .HospitalizationCriteria === "Separate" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].DeductibleNormal ===
                "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].AilmentApplicable ===
              "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].AilmentApplicable ===
              "Applicable" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].WaitingPeriod ===
                "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDYN === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDYN === "Yes" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDwaitingperiod ===
                "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ===
              "" ||
            (
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ||
              []
            ).length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship || [])
              .length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge <
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Age Band" &&
              plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                ?.AgeFrom === "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Age Band" &&
              plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                ?.AgeTo === "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Age Band" &&
              plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                ?.Rate === "")
          ) {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
            isError = true;
          } else {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: false }));
            isError = false;
          }
        });
      }
      if (item.CoverName === "EMI Benefit") {
        item.AgeBand.forEach((ageband, index) => {
          if (
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .CustomerNomineePercentage === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].NoofEMIInstalments ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].InitialWaitingPeriod ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateType === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PremiumUnit === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].EMITenure === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Full" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Rate === "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Triggers
              .NoOfDaysForTrigger === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].AilmentApplicable ===
              "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].AilmentApplicable ===
              "Applicable" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].WaitingPeriod ===
                "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDYN === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDYN === "Yes" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDwaitingperiod ===
                "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "Fixed" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                .FixedMonthlyEMIAmount === "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "Variable" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxEMIPerYear ===
                "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "Variable" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                .MaxEMIAmountMonthly === "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ===
              "" ||
            (
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ||
              []
            ).length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship || [])
              .length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge <
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Age Band" &&
              (plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                ?.AgeFrom === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.AgeTo === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.Rate === ""))
          ) {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
            isError = true;
          } else {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: false }));
            isError = false;
          }
        });
      }
      if (item.CoverName === "Personal Accident") {
        item.AgeBand.forEach((ageband, index) => {
          if (
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .CustomerNomineePercentage === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateType === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PremiumUnit === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Full" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Rate === "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDYN === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDYN === "Yes" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDwaitingperiod ===
                "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "Fixed" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FixedPASI === "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "Variable" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxPASIPerYear ===
                "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .DaysADBenefitApplicable === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .DaysPPDBenefitApplicable === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .DaysPTDBenefitApplicable === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .DaysTTDBenefitApplicable === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ===
              "" ||
            (
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ||
              []
            ).length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship || [])
              .length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge <
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Age Band" &&
              (plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                ?.AgeFrom === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.AgeTo === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.Rate === ""))
          ) {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
            isError = true;
          } else {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: false }));
            isError = false;
          }
        });
      }
      if (item.CoverName === "Critical Illness") {
        item.AgeBand.forEach((ageband, index) => {
          if (
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .CustomerNomineePercentage === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].InitialWaitingPeriod ===
              "" ||
            (plan[0].groupDetailsJson.SectionMaster.SumInsuredType === "Floater" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxFamilyClaims ===
                "") ||
            (plan[0].groupDetailsJson.SectionMaster.SumInsuredType === "Floater" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxIndividualClaim ===
                "") ||
            (plan[0].groupDetailsJson.SectionMaster.SumInsuredType === "NonFloater" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxIndividualClaim ===
                "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].CountofCI === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateType === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PremiumUnit === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Full" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Rate === "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDYN === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDYN === "Yes" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PEDwaitingperiod ===
                "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "Fixed" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FixedCISI === "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "Variable" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxCISI === "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ===
              "" ||
            (
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ||
              []
            ).length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship || [])
              .length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge <
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Age Band" &&
              (plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                ?.AgeFrom === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.AgeTo === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.Rate === ""))
          ) {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
            isError = true;
          } else {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: false }));
            isError = false;
          }
        });
      }
      if (item.CoverName === "Loss of Job") {
        item.AgeBand.forEach((ageband, index) => {
          if (
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .CustomerNomineePercentage === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .NoofMonthsSalarytobePaid === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxMonthlySalary ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateType === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Applicablefor === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PremiumUnit === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Full" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Rate === "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ===
              "" ||
            (
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ||
              []
            ).length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship || [])
              .length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge <
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Age Band" &&
              (plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                ?.AgeFrom === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.AgeTo === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.Rate === ""))
          ) {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
            isError = true;
          } else {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: false }));
            isError = false;
          }
        });
      }
      if (item.CoverName === "Child Education Grant") {
        item.AgeBand.forEach((ageband, index) => {
          if (
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
              .CustomerNomineePercentage === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].CountofChildren ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxCEGSIPerYear ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateType === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria === "" ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PremiumUnit === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Full" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Rate === "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "Fixed" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PerChildSI === "") ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].SuminsuredInputType ===
              "PercentageofPersonalAccidentSI" &&
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].PercofPASI === "") ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ===
              "" ||
            (
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].FamilyCombination ||
              []
            ).length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship === "" ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].Relationship || [])
              .length === 0 ||
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MaxAge <
              plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].MinAge ||
            (plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i].RateCriteria ===
              "Age Band" &&
              (plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                ?.AgeFrom === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.AgeTo === "" ||
                plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[i]?.AgeBand[index]
                  ?.Rate === ""))
          ) {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
            isError = true;
          } else {
            setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: false }));
            isError = false;
          }
        });
      }
    });
  };
  let selectedCoverName = "";
  const handleClickSubmitt = async () => {
    handlebenefitvalid();
    if (
      planlevelvalidation.NumberError === true ||
      planlevelvalidation.MaxchildAgeError === true ||
      planlevelvalidation.MinchildAgeError === true ||
      planlevelvalidation.MaxadultAgeError === true ||
      planlevelvalidation.Minageerror === true ||
      planlevelvalidation.COIThreshholdError === true ||
      plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration === "" ||
      plan[0].DisplayName === "" ||
      plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "" ||
      plan[0].groupDetailsJson.SectionMaster.MinimumAdultAge === "" ||
      plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge === "" ||
      plan[0].groupDetailsJson.SectionMaster.MinimumChildAge === "" ||
      plan[0].groupDetailsJson.SectionMaster.MaximumChildAge === "" ||
      plan[0].groupDetailsJson.SectionMaster.SumInsuredType === "" ||
      plan[0].groupDetailsJson.SectionMaster.COIThreshhold === "" ||
      (plan[0].groupDetailsJson.SectionMaster.FamilyCombination || []).length === 0 ||
      (plan[0].groupDetailsJson.SectionMaster.Relationship || []).length === 0 ||
      plan[0].groupDetailsJson.SectionMaster.RateTerm === "" ||
      MaxChildage !== "" ||
      Maxadultdage !== "" ||
      Minadultage !== "" ||
      MinChildage !== ""
    ) {
      setPlanlevelvalidation((prev) => ({ ...prev, ErrorFlag: true }));
    } else if (
      onblurvalidation.PABenefitPercentageADError === true ||
      onblurvalidation.PABenefitPercentageTTDError === true ||
      onblurvalidation.PABenefitPercentagePPDError === true ||
      onblurvalidation.PABenefitPercentagePTDError === true ||
      onblurvalidation.NoEmiInstallementError === true ||
      onblurvalidation.MaxCEGSILIMITError === true ||
      onblurvalidation.PerChildSiError === true ||
      onblurvalidation.PercentagePASIError === true ||
      onblurvalidation.MaxSalaryAllowedError === true ||
      onblurvalidation.MonthsalaryPaidError === true ||
      onblurvalidation.MaxFamilyclaimsError === true ||
      onblurvalidation.MaxIndividualclaimError === true ||
      onblurvalidation.FixedCISIError === true ||
      onblurvalidation.MaxCISIError === true ||
      onblurvalidation.FixedPASIError === true ||
      onblurvalidation.MaxPASIError === true ||
      onblurvalidation.FixedMonthlyEMIError === true ||
      onblurvalidation.MaxEMIPerYearEror === true ||
      onblurvalidation.MonthlyEMIError === true ||
      onblurvalidation.DeductibledaysNormal === true ||
      onblurvalidation.DeductibledaysICU === true ||
      onblurvalidation.DeductibleDays === true ||
      onblurvalidation.PerDayBenefitICU === true ||
      onblurvalidation.PerDayBenefitNormal === true ||
      onblurvalidation.NoOfHospitalizationICU === true ||
      onblurvalidation.NoOfHospitalizationNormal === true ||
      onblurvalidation.MaxnoofHospitalization === true ||
      onblurvalidation.MinNoofdaysofHospitalization === true ||
      onblurvalidation.NoOfChldrenError === true ||
      onblurvalidation.RateError === true ||
      onblurvalidation.PEDwaitingperiodError === true ||
      onblurvalidation.AgeFromError === true ||
      onblurvalidation.AgeToError === true ||
      onblurvalidation.Rate === true ||
      onblurvalidation.waitingperiodError === true ||
      onblurvalidation.DaysADBenefitError === true ||
      onblurvalidation.DaysPPDBenefitError === true ||
      onblurvalidation.DaysPTDBenefitError === true ||
      onblurvalidation.DaysTTDBenefitError === true
    ) {
      setOnblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
    } else if (isError === false) {
      console.log("harriiiiiiiiiiii", plan[0].groupId);
      if (errorMsg === "Plan name already exists") {
        console.log("Plan already exists, cannot create a new plan");
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Please Enter the Unique Plan Name",
          confirmButtonText: "OK",
          confirmButtonColor: "#bf360c",
          allowOutsideClick: false,
          showCloseButton: true,
        });
        return;
      }
      let benefiname = "";
      dynamic.forEach(async (z, index) => {
        if (
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]?.CoverName ===
          "Hospicash"
        ) {
          benefiname =
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]?.CoverName;
        }
      });
      if (
        (benefiname !== "Hospicash" &&
          plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.length > 0) ||
        plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.length === 0
      ) {
        // "Hospicash" cover is not present, show error message
        console.log("Hospicash is mandatory");
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Hospicash Benefit is mandatory for this plan",
          confirmButtonText: "OK",
          confirmButtonColor: "#bf360c",
          allowOutsideClick: false,
          showCloseButton: true,
        });
        return;
      }
      if (
        (agefromerrormg && agefromerrormg.some((error) => error !== "")) ||
        (agetoerrormg && agetoerrormg.some((error) => error !== "")) ||
        errorminage !== "" ||
        erroraultage !== ""
      ) {
        console.log("Please Enter the required fields with valid data");
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Please Enter the required fields with valid data",
          confirmButtonText: "OK",
          confirmButtonColor: "#bf360c",
          allowOutsideClick: false,
          showCloseButton: true,
        });
        return;
      }
      setLoading(true);
      setShowLossOfJobErrorMessage(false);
      setShowChildEducationErrorMessage(false);
      plan[0].groupId = 0;
      if (plan[0].groupDetails[0] !== "coverName") {
        const sectionMappingDetails = plan[0].groupDetails[0].SectionMappingDetails;
        clonesave.SectionMappingDetails = sectionMappingDetails;
        plan[0].groupDetails[0] = clonesave;
        console.log("plaaaaannnnn", plan);
      }

      const filterByApplicable = (array) =>
        array.filter((item) => item.Applicable !== null && item.Applicable !== "");
      const clausesarray = plan[0].groupDetailsJson.SectionMaster.Clauses;
      const filteredClauses = filterByApplicable(clausesarray);

      const exclusion = plan[0].groupDetailsJson.SectionMaster.Exclusion;
      const filteredExclusion = filterByApplicable(exclusion);

      const modifiedPlanData = JSON.parse(JSON.stringify(plan));
      modifiedPlanData[0].groupDetailsJson.SectionMaster.Clauses = filteredClauses;
      modifiedPlanData[0].groupDetailsJson.SectionMaster.Exclusion = filteredExclusion;
      BenefitTypes.forEach((selectedBenefitName, index) => {
        const ailmentMaster =
          modifiedPlanData[0].groupDetails[0].SectionMappingDetails.BenefitDetails.find(
            (benefit) => benefit.CoverName === selectedBenefitName
          )?.Ailmentmaster || [];

        const filteredAilmentMaster = ailmentMaster.filter(
          (item) => item.Applicable !== null && item.Applicable !== ""
        );
        if (modifiedPlanData[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]) {
          modifiedPlanData[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
            index
          ].Ailmentmaster = filteredAilmentMaster;
        }
      });
      BenefitTypes.forEach((selectedBenefitName, index) => {
        const personalAccidentDetails =
          modifiedPlanData[0].groupDetails[0].SectionMappingDetails.BenefitDetails.find(
            (benefit) => benefit.CoverName === selectedBenefitName
          )?.PersonalAccidentDetails || [];

        const filteredPersonalAccidentDetails = personalAccidentDetails.filter(
          (item) => item.PABenefitYN !== null && item.PABenefitYN !== ""
        );

        if (modifiedPlanData[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]) {
          modifiedPlanData[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
            index
          ].PersonalAccidentDetails = filteredPersonalAccidentDetails;
        }
      });
      const SaveCover = await SaveCoverGrouping(modifiedPlanData);
      console.log("SaveCoverGrouping", SaveCover);
      newPlan.PlanName = plan[0].groupName;
      newPlan.PolicyDuration = `${plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration} ${plan[0].groupDetailsJson.SectionMaster.PolicyDuration} `;
      newPlan.CountofPolicyDuration = plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration;
      newPlan.DisplayName = plan[0].DisplayName;
      newPlan.DisplayName = plan[0].groupDetailsJson.SectionMaster.DisplayName;
      newPlan.Clauses = plan[0].groupDetailsJson.SectionMaster.Clauses;
      newPlan.Exclusion = plan[0].groupDetailsJson.SectionMaster.Exclusion;
      planDetailsDto?.PlanDetailsJson.push(newPlan);
      console.log("addpplantodto", planDetailsDto);
      if (dynamic && dynamic.length > 0 && dynamic !== "") {
        const data = dynamic.map((item) => {
          const ageBand = item.AgeBand || [];
          const ageBandData = ageBand.map((band) => ({
            "Age From": band.AgeFrom || item.MinAge,
            "Age To": band.AgeTo || item.MaxAge,
            BenefitName: item.Benefit,
            Plan: DisplayName,
            CoverName: item.CoverName,
            Rate: band.Rate || item.Rate,
          }));
          return ageBandData;
        });
        const flattenedData = data.flat();
        const filename = "Sample.xlsx";
        await createExcelFileAndDownload(flattenedData, filename, 2778);
      }

      if (dynamic && dynamic.length > 0 && dynamic !== "") {
        BenefitTypes.forEach(async (z, index) => {
          selectedCoverName =
            plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[index]?.CoverName || "";
          if (selectedCoverName === "Hospicash") {
            const data1 = dynamic.map((item) => ({
              Plan: DisplayName,
              Rate: item.PerDayBenefitNormal,
            }));
            const flattenedData1 = data1.flat();
            const filename1 = "Sample1.xlsx";
            await createExcelFileAndDownload(flattenedData1, filename1, 1986);
            const data2 = dynamic.map((item) => ({
              Plan: DisplayName,
              Rate: item.PerDayBenefitICU,
            }));
            const flattenedData2 = data2.flat();
            const filename2 = "Sample2.xlsx";
            await createExcelFileAndDownload(flattenedData2, filename2, 1987);
          }
          if (selectedCoverName === "Personal Accident") {
            const data3 = plan[0]?.groupDetails[0]?.SectionMappingDetails?.BenefitDetails[
              index
            ]?.PersonalAccidentDetails?.map((a) => ({
              Plan: DisplayName,
              ADType: a.PABenefitName,
              Rate: a.PABenefitPercentage / 100,
            }));
            console.log("Aaaaaaaaaaaaaaa", data3);
            const flattenedData3 = data3.flat();
            const filename3 = "Sample3.xlsx";
            await createExcelFileAndDownload(flattenedData3, filename3, 1988);
          }

          if (selectedCoverName === "EMI Benefit") {
            const data4 = dynamic
              .map((item) => {
                const Trigger = item.Triggers || [];
                const Triggering = Trigger.map((band, i) => {
                  const currentTrigger = parseInt(band.NoOfDaysForTrigger, 10);
                  const nextTrigger =
                    i < Trigger.length - 1
                      ? parseInt(Trigger[i + 1].NoOfDaysForTrigger, 10)
                      : undefined;

                  return {
                    "Trigger From": currentTrigger,
                    "Trigger To":
                      nextTrigger !== undefined && currentTrigger + 1 !== nextTrigger
                        ? nextTrigger - 1
                        : currentTrigger,
                    Plan: DisplayName,
                    Rate: i,
                  };
                });

                return Triggering;
              })
              .filter((arr) => arr.length > 0)
              .flat();

            console.log(data4);

            const flattenedData4 = data4.flat();
            const filename4 = "Sample4.xlsx";
            await createExcelFileAndDownload(flattenedData4, filename4, 1989);
          }
        });
      }
    } else {
      console.log("Error found in the else block, triggering swal");
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Please Enter the required fields",
        confirmButtonText: "OK",
        confirmButtonColor: "#bf360c",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    }
  };
  const handleEditClickOpen = () => {
    handlebenefitvalid();
    if (isError === true) {
      setOpenEdit(false);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Please Enter the required fields",
        confirmButtonText: "OK",
        confirmButtonColor: "#bf360c",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    } else {
      setOpenEdit(true);
    }
    setShowLossOfJobErrorMessage(false);
    setShowChildEducationErrorMessage(false);
  };
  const handleDelmesg = async (rowId) => {
    const res = await DeleteCoverGroups(rowId);
    console.log("deleted", res);
    if (res.data.status === 5) {
      setDeleteSuccess(true);
    }
    const plandetails = planDetailsDto?.PlanDetailsJson.filter((del) => del.PlanName !== rowId);
    console.log("deleteplan", plandetails);
    if (planDetailsDto) {
      planDetailsDto.PlanDetailsJson = plandetails;
      setDelOpenmsg(true);
    }
  };

  const handleDelmesgClose = () => {
    setDelOpen(false);
    setDelOpenmsg(false);
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    setOpen(false);
  };

  const handleViewPlan = () => {
    plan[0].groupDetailsJson.SectionMaster = {};
    plan[0].DisplayName = "";
    setCheckboxChecked("");
    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails = [];
    setPlan([...plan]);
    setIsDrawerOpen(false);
    console.log("isDrawerOpen", isDrawerOpen);
  };

  return (
    <MDBox>
      <Dialog
        open={openDel}
        onClose={handleDelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",

              maxWidth: "600px",
            },
          },
        }}
      >
        <Grid container justifyContent="flex-end">
          <MDButton
            startIcon={<CloseIcon />}
            sx={{ fontSize: "1rem" }}
            justifyContent="flex-end"
            alignItems="flex-end"
            variant="text"
            color="black"
            onClick={handleDelClose}
          />
        </Grid>
        <Grid container justifyContent="center">
          <DialogTitle>Are You Sure Want to Delete {planname}? </DialogTitle>
        </Grid>
        <DialogActions>
          <Grid container justifyContent="center">
            <MDButton onClick={() => handleDelmesg(rowid)} variant="contained" color="error">
              YES
            </MDButton>
            <span style={{ marginRight: "40px" }} />
            {deleteSucess && (
              <Dialog
                open={openDelmsg}
                onClose={handleDelClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                  "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                      width: "100%",
                      maxWidth: "600px",
                    },
                  },
                }}
              >
                <Grid container justifyContent="flex-end">
                  <MDButton
                    startIcon={<CloseIcon />}
                    sx={{ fontSize: "1rem" }}
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    variant="text"
                    color="black"
                    onClick={handleDelClose}
                  />
                </Grid>
                <Grid container justifyContent="center">
                  <CheckCircleIcon fontSize="large" sx={{ color: "green" }} />
                </Grid>
                <Grid container justifyContent="center">
                  <DialogTitle> {planname} Deleted Successfully </DialogTitle>
                </Grid>
                <Grid container justifyContent="center">
                  <DialogActions>
                    <MDButton onClick={handleDelmesgClose} variant="contained" color="error">
                      Close
                    </MDButton>
                  </DialogActions>
                </Grid>
              </Dialog>
            )}
            <MDButton onClick={handleDelClose} variant="outlined" color="error">
              NO
            </MDButton>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isSuccessDialogOpen}
        onClose={handleCloseSuccessDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "600px",
            },
          },
        }}
      >
        {/* {closebuton === true && (
          <Grid container justifyContent="flex-end">
            <MDButton
              startIcon={<CloseIcon />}
              sx={{ fontSize: "1rem" }}
              justifyContent="flex-end"..l
              alignItems="flex-end"
              variant="text"
              color="black"
              onClick={handleCloseSuccessDialog}
            />
          </Grid>
        )} */}
        <Grid container justifyContent="center">
          <DialogTitle> Excel Getting Upload Please Wait... </DialogTitle>
        </Grid>
        {/* {closebuton === true && (
          <Grid container justifyContent="center">
            <DialogActions>
              <MDButton onClick={handleCloseSuccessDialog} variant="contained" color="error">
                Close
              </MDButton>
            </DialogActions>
          </Grid>
        )} */}
      </Dialog>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: "80%", padding: "32px" },
        }}
      >
        <MDBox>
          <Grid container>
            <Grid item xs={11}>
              <MDTypography mb={2}>Master Policy</MDTypography>
            </Grid>
            <Grid item xs={1} justifyContent="flex-end">
              <MDButton
                startIcon={<CloseIcon />}
                sx={{ fontsize: "2rem" }}
                justifyContent="flex-end"
                alignItems="flex-end"
                variant="text"
                color="black"
                onClick={handleDrawerClose}
              />
            </Grid>
          </Grid>
          <Accordion expanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <MDTypography color="error">Plan Details</MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <MDInput
                    name="DisplayName"
                    label="Plan Name"
                    onChange={(e) => handlePlanGroup(e)}
                    value={plan[0].DisplayName}
                    required
                    disabled={flagviewDisabled}
                    error={planlevelvalidation.ErrorFlag && plan[0].DisplayName === ""}
                    helperText={planlevelvalidation.ErrorFlag && plan[0].DisplayName === "" && mes}
                  />
                  {errorMsg && <p style={{ color: "red", fontSize: "13px" }}>{errorMsg}</p>}
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    name="PolicyDuration"
                    sx={styleAuto}
                    options={["Months", "Years"]}
                    value={plan[0].groupDetailsJson.SectionMaster.PolicyDuration}
                    onChange={(e, value) => handleplan(e, value, "PolicyDuration")}
                    renderInput={(op) => (
                      <TextField
                        {...op}
                        label="Policy Duration"
                        error={
                          planlevelvalidation.ErrorFlag &&
                          plan[0].groupDetailsJson.SectionMaster.PolicyDuration === ""
                        }
                        helperText={
                          planlevelvalidation.ErrorFlag &&
                          plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "" &&
                          mes
                        }
                      />
                    )}
                    required
                    disabled={flagviewDisabled}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MDInput
                    name="CountofPolicyDuration"
                    label="Count of Policy Duration"
                    value={plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration}
                    onChange={(e) => handleplaninputtype(e)}
                    required
                    disabled={flagviewDisabled}
                    error={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration === ""
                    }
                    helperText={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration === "" &&
                      mes
                    }
                  />
                  {planlevelvalidation.NumberError === true &&
                  plan[0].groupDetailsJson.SectionMaster.CountofPolicyDuration !== "" ? (
                    <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={3}>
                  <MDInput
                    name="MinimumAdultAge"
                    label="Minimum Adult Age"
                    value={plan[0].groupDetailsJson.SectionMaster.MinimumAdultAge}
                    onChange={(e) => handleplaninputtypestart(e)}
                    required
                    disabled={flagviewDisabled}
                    onKeyPress={(e) => {
                      const value = e.target.value + e.key;
                      if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                        e.preventDefault();
                      }
                    }}
                    inputProps={{ maxLength: 3 }}
                    error={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.MinimumAdultAge === ""
                    }
                    helperText={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.MinimumAdultAge === "" &&
                      mes
                    }
                  />{" "}
                  {planlevelvalidation.Minageerror === true &&
                  plan[0].groupDetailsJson.SectionMaster.MinimumAdultAge !== "" ? (
                    <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
                  ) : null}
                  {Minadultage && (
                    <MDTypography style={{ color: "red", fontSize: "10px", marginLeft: "0mm" }}>
                      {Minadultage}
                    </MDTypography>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={2}>
                <Grid item xs={3}>
                  <MDInput
                    name="MaximumAdultAge"
                    label="Maximum Adult Age"
                    value={plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge}
                    onChange={(e) => handleplanMAxadultinputtype(e)}
                    required
                    disabled={flagviewDisabled}
                    onKeyPress={(e) => {
                      const value = e.target.value + e.key;
                      if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                        e.preventDefault();
                      }
                    }}
                    inputProps={{ maxLength: 3 }}
                    error={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge === ""
                    }
                    helperText={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge === "" &&
                      mes
                    }
                  />
                  {planlevelvalidation.MaxadultAgeError === true &&
                  plan[0].groupDetailsJson.SectionMaster.MaximumAdultAge !== "" ? (
                    <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
                  ) : null}
                  {Maxadultdage && (
                    <MDTypography style={{ color: "red", fontSize: "10px", marginLeft: "0mm" }}>
                      {Maxadultdage}
                    </MDTypography>
                  )}
                </Grid>
                <Grid item xs={3}>
                  <MDInput
                    name="MinimumChildAge"
                    label="Minimum Child Age"
                    value={plan[0].groupDetailsJson.SectionMaster.MinimumChildAge}
                    onChange={(e) => handleplanchildinputtype(e)}
                    required
                    disabled={flagviewDisabled}
                    onKeyPress={(e) => {
                      const value = e.target.value + e.key;
                      if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                        e.preventDefault();
                      }
                    }}
                    inputProps={{ maxLength: 3 }}
                    error={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.MinimumChildAge === ""
                    }
                    helperText={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.MinimumChildAge === "" &&
                      mes
                    }
                  />
                  {planlevelvalidation.MinchildAgeError === true &&
                  plan[0].groupDetailsJson.SectionMaster.MinimumChildAge !== "" ? (
                    <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
                  ) : null}
                  {MinChildage && (
                    <MDTypography style={{ color: "red", fontSize: "10px", marginLeft: "0mm" }}>
                      {MinChildage}
                    </MDTypography>
                  )}
                </Grid>
                <Grid item xs={3}>
                  <MDInput
                    name="MaximumChildAge"
                    label="Maximum Child Age"
                    value={plan[0].groupDetailsJson.SectionMaster.MaximumChildAge}
                    onChange={(e) => handleplanMaxchildAgeinputtype(e)}
                    required
                    disabled={flagviewDisabled}
                    onKeyPress={(e) => {
                      const value = e.target.value + e.key;
                      if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                        e.preventDefault();
                      }
                    }}
                    inputProps={{ maxLength: 3 }}
                    error={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.MaximumChildAge === ""
                    }
                    helperText={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.MaximumChildAge === "" &&
                      mes
                    }
                  />
                  {planlevelvalidation.MaxchildAgeError === true &&
                  plan[0].groupDetailsJson.SectionMaster.MaximumChildAge !== "" ? (
                    <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
                  ) : null}
                  {MaxChildage && (
                    <MDTypography style={{ color: "red", fontSize: "10px", marginLeft: "0mm" }}>
                      {MaxChildage}
                    </MDTypography>
                  )}
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    name="SumInsuredType"
                    sx={styleAuto}
                    options={policyTypeArray}
                    value={plan[0].groupDetailsJson.SectionMaster.SumInsuredType}
                    onChange={(e, value) => handleplan(e, value, "SumInsuredType")}
                    renderInput={(op) => (
                      <TextField
                        {...op}
                        label="Sum insured Type"
                        error={
                          planlevelvalidation.ErrorFlag &&
                          plan[0].groupDetailsJson.SectionMaster.SumInsuredType === ""
                        }
                        helperText={
                          planlevelvalidation.ErrorFlag &&
                          plan[0].groupDetailsJson.SectionMaster.SumInsuredType === "" &&
                          mes
                        }
                      />
                    )}
                    required
                    disabled={flagviewDisabled}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={2}>
                <Grid item xs={3}>
                  <Autocomplete
                    multiple
                    name="FamilyCombination"
                    sx={styleAuto}
                    options={familycombination}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, Values) => handlefamilymultiselect(e, Values)}
                    required
                    value={
                      plan[0].groupDetailsJson?.SectionMaster?.FamilyCombination?.map((item) => ({
                        mValue: item.FamilyCombination,
                        TotalCount: item.TotalCount,
                        AdultCount: item.AdultCount,
                        ChildCount: item.ChildCount,
                      })) || []
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Family Combination"
                        error={
                          planlevelvalidation.ErrorFlag &&
                          (plan[0].groupDetailsJson.SectionMaster.FamilyCombination || [])
                            .length === 0
                        }
                        helperText={
                          planlevelvalidation.ErrorFlag &&
                          (plan[0].groupDetailsJson.SectionMaster.FamilyCombination || [])
                            .length === 0 &&
                          mes
                        }
                        required
                      />
                    )}
                    fullWidth
                    disabled={flagviewDisabled}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    multiple
                    name="Relationship"
                    sx={styleAuto}
                    options={relationshipmaster}
                    getOptionLabel={(option) => option}
                    onChange={(e, values) => handlerelationsmultiselect(e, values)}
                    required
                    value={
                      plan[0].groupDetailsJson?.SectionMaster?.Relationship
                        ? plan[0].groupDetailsJson?.SectionMaster?.Relationship?.split(",")
                        : []
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Relationships"
                        error={
                          planlevelvalidation.ErrorFlag &&
                          (plan[0].groupDetailsJson.SectionMaster.Relationship || []).length === 0
                        }
                        helperText={
                          planlevelvalidation.ErrorFlag &&
                          (plan[0].groupDetailsJson.SectionMaster.Relationship || []).length ===
                            0 &&
                          mes
                        }
                      />
                    )}
                    fullWidth
                    disabled={flagviewDisabled}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    name="RateTerm"
                    sx={styleAuto}
                    options={["Annual", "Per Policy period"]}
                    value={plan[0].groupDetailsJson.SectionMaster.RateTerm}
                    onChange={(e, value) => handleplan(e, value, "RateTerm")}
                    renderInput={(op) => (
                      <TextField
                        {...op}
                        label="Rate Term"
                        error={
                          planlevelvalidation.ErrorFlag &&
                          plan[0].groupDetailsJson.SectionMaster.RateTerm === ""
                        }
                        helperText={
                          planlevelvalidation.ErrorFlag &&
                          plan[0].groupDetailsJson.SectionMaster.RateTerm === "" &&
                          mes
                        }
                      />
                    )}
                    required
                    disabled={flagviewDisabled}
                    readOnly={plan[0].groupDetailsJson.SectionMaster.PolicyDuration === "Months"}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MDInput
                    name="COIThreshhold"
                    label="COI Threshold"
                    value={plan[0].groupDetailsJson.SectionMaster.COIThreshhold}
                    onChange={(e) => handleplaninputtypeCOI(e)}
                    required
                    disabled={flagviewDisabled}
                    error={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.COIThreshhold === ""
                    }
                    helperText={
                      planlevelvalidation.ErrorFlag &&
                      plan[0].groupDetailsJson.SectionMaster.COIThreshhold === "" &&
                      mes
                    }
                  />
                  {planlevelvalidation.COIThreshholdError === true &&
                  plan[0].groupDetailsJson.SectionMaster.COIThreshhold !== "" ? (
                    <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container mt={2}>
                <Grid item xs={3.5}>
                  <MDTypography>Choose Applicable Benefits</MDTypography>
                </Grid>
              </Grid>
              <Grid container mt={2}>
                {BenefitTypes.map((p, i) => (
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={<Checkbox />}
                      name="CoverName"
                      value={plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.CoverName}
                      onChange={(e) => handleReportTypeChange(e, i, p)}
                      disabled={
                        flagviewDisabled ||
                        (p === "Child Education Grant" && !personalAccidentSelected) ||
                        (p === "Loss of Job" && !personalAccidentSelected)
                      }
                      onClick={(e) => {
                        if (
                          (p === "Child Education Grant" && !personalAccidentSelected) ||
                          (p === "Loss of Job" && !personalAccidentSelected)
                        ) {
                          handleDisabledCheckboxClick(p);
                          e.preventDefault();
                        }
                      }}
                      checked={checkboxChecked[p]}
                      label={p === "EMI Benefit" ? `Convalescence (EMI)` : p}
                    />
                  </Grid>
                ))}
                {/* {errorMessage && (
                <MDTypography style={{ color: "red", fontSize: "15px", marginLeft: "23rem" }}>
                  {errorMessage}
                </MDTypography>
              )} */}
                {showLossOfJobErrorMessage && (
                  <MDTypography style={{ color: "red", fontSize: "15px", marginLeft: "23rem" }}>
                    Personal Accident Should Select First.
                  </MDTypography>
                )}
                {showChildEducationErrorMessage && (
                  <MDTypography style={{ color: "red", fontSize: "15px", marginLeft: "46rem" }}>
                    Personal Accident Should Select First.
                  </MDTypography>
                )}
              </Grid>
              <Grid container mt={2}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      {plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails.map((x, i) => (
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <MDTypography color="error">{x.CoverName}</MDTypography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={3}>
                              {(x.CoverName === "Hospicash" ||
                                x.CoverName === "EMI Benefit" ||
                                x.CoverName === "Critical Illness") && (
                                <Grid item xs={3}>
                                  <Autocomplete
                                    name="InitialWaitingPeriod"
                                    sx={styleAuto}
                                    options={["0", "15", "30", "40"]}
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].InitialWaitingPeriod
                                    }
                                    getOptionLabel={(option) => option}
                                    onChange={(e, value) =>
                                      handleautocomplete(e, "InitialWaitingPeriod", value, i)
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Initial Waiting Period(Days)"
                                        required
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].InitialWaitingPeriod === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].InitialWaitingPeriod === "" &&
                                          mes
                                        }
                                      />
                                    )}
                                    disabled={flagviewDisabled}
                                    fullWidth
                                  />
                                </Grid>
                              )}
                              {(x.CoverName === "Critical Illness" ||
                                x.CoverName === "Personal Accident" ||
                                x.CoverName === "EMI Benefit") && (
                                <Grid item xs={3}>
                                  <Autocomplete
                                    name="SuminsuredInputType"
                                    sx={styleAuto}
                                    options={["Fixed", "Variable"]}
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].SuminsuredInputType
                                    }
                                    getOptionLabel={(option) => option}
                                    onChange={(e, value) =>
                                      handleautocomplete(e, "SuminsuredInputType", value, i)
                                    }
                                    renderInput={(op) => (
                                      <TextField
                                        {...op}
                                        label="SumInsured Input Type"
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].SuminsuredInputType === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].SuminsuredInputType === "" &&
                                          mes
                                        }
                                        required
                                      />
                                    )}
                                    fullWidth
                                    disabled={flagviewDisabled}
                                  />
                                </Grid>
                              )}
                              {x.CoverName === "Child Education Grant" && (
                                <Grid item xs={3}>
                                  <Autocomplete
                                    name="SuminsuredInputType"
                                    sx={styleAuto}
                                    options={["Fixed", "PercentageofPersonalAccidentSI"]}
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].SuminsuredInputType
                                    }
                                    getOptionLabel={(option) => option}
                                    onChange={(e, value) =>
                                      handleautocomplete(e, "SuminsuredInputType", value, i)
                                    }
                                    renderInput={(op) => (
                                      <TextField
                                        {...op}
                                        label="SumInsured Input Type"
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].SuminsuredInputType === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].SuminsuredInputType === "" &&
                                          mes
                                        }
                                        required
                                      />
                                    )}
                                    fullWidth
                                    disabled={flagviewDisabled}
                                  />
                                </Grid>
                              )}
                              {x.CoverName === "Child Education Grant" && (
                                <Grid item xs={3}>
                                  <MDInput
                                    name="CountofChildren"
                                    label="No. of Children"
                                    onChange={(e) => handleinputtype(e, i)}
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].CountofChildren
                                    }
                                    error={
                                      onblurvalidation.ErrorFlag &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].CountofChildren === ""
                                    }
                                    helperText={
                                      onblurvalidation.ErrorFlag &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].CountofChildren === "" &&
                                      mes
                                    }
                                    required
                                    disabled={flagviewDisabled}
                                    onBlur={handlevalidationerror}
                                  />
                                  {onblurvalidation.NoOfChldrenError === true &&
                                  plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                    .CountofChildren !== "" ? (
                                    <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
                                  ) : null}
                                </Grid>
                              )}
                              {x.CoverName === "Hospicash" && (
                                <Grid item xs={3}>
                                  <Autocomplete
                                    name="HospitalizationCriteria"
                                    sx={styleAuto}
                                    options={["Combined", "Separate"]}
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].HospitalizationCriteria
                                    }
                                    getOptionLabel={(option) => option}
                                    onChange={(e, value) =>
                                      handleautocomplete(e, "HospitalizationCriteria", value, i)
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Hospitalisation Criteria"
                                        required
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].HospitalizationCriteria === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].HospitalizationCriteria === "" &&
                                          mes
                                        }
                                      />
                                    )}
                                    required
                                    fullWidth
                                    disabled={flagviewDisabled}
                                  />
                                </Grid>
                              )}
                              {x.CoverName === "Hospicash" && (
                                <Grid item xs={3}>
                                  <MDInput
                                    name="MinNoofDaysHospi"
                                    label="Minimum no. of days of Hospitalization"
                                    onChange={(e) => handleinputtype(e, i)}
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MinNoofDaysHospi
                                    }
                                    error={
                                      onblurvalidation.ErrorFlag &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MinNoofDaysHospi === ""
                                    }
                                    helperText={
                                      onblurvalidation.ErrorFlag &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MinNoofDaysHospi === "" &&
                                      mes
                                    }
                                    required
                                    fullWidth
                                    disabled={flagviewDisabled}
                                    onBlur={handlevalidationerror}
                                  />
                                  {onblurvalidation.MinNoofdaysofHospitalization === true &&
                                  plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                    .MinNoofDaysHospi !== "" ? (
                                    <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
                                  ) : null}
                                </Grid>
                              )}
                              {x.HospitalizationCriteria === "Combined" &&
                                x.CoverName === "Hospicash" && (
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="MaxNoofDaysHospi"
                                      label="Maximum no. of days of Hospitalization"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxNoofDaysHospi
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxNoofDaysHospi === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxNoofDaysHospi === "" &&
                                        mes
                                      }
                                      required
                                      fullWidth
                                      disabled={flagviewDisabled}
                                      onBlur={handlevalidationerror}
                                    />
                                    {onblurvalidation.MaxnoofHospitalization === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .MaxNoofDaysHospi !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                )}
                              {x.HospitalizationCriteria === "Separate" && (
                                <>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="NoofDaysNormal"
                                      label="No. of Days Hospitalisation Normal"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofDaysNormal
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofDaysNormal === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofDaysNormal === "" &&
                                        mes
                                      }
                                      required
                                      fullWidth
                                      disabled={flagviewDisabled}
                                      onBlur={handlevalidationerror}
                                    />
                                    {onblurvalidation.NoOfHospitalizationNormal === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .NoofDaysNormal !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="NoofDaysICU"
                                      label="No. of Days Hospitalisation ICU"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofDaysICU
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofDaysICU === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofDaysICU === "" &&
                                        mes
                                      }
                                      required
                                      fullWidth
                                      disabled={flagviewDisabled}
                                      onBlur={handlevalidationerror}
                                    />
                                    {onblurvalidation.NoOfHospitalizationICU === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .NoofDaysICU !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                </>
                              )}
                              {x.CoverName === "Hospicash" && (
                                <>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="PerDayBenefitNormal"
                                      label="Per Day Benefit Normal"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PerDayBenefitNormal
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PerDayBenefitNormal === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PerDayBenefitNormal === "" &&
                                        mes
                                      }
                                      required
                                      fullWidth
                                      disabled={flagviewDisabled}
                                      onBlur={handlevalidationerror}
                                    />
                                    {onblurvalidation.PerDayBenefitNormal === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .PerDayBenefitNormal !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>

                                  <Grid item xs={3}>
                                    <MDInput
                                      name="PerDayBenefitICU"
                                      label="Per Day Benefit ICU"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PerDayBenefitICU
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PerDayBenefitICU === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PerDayBenefitICU === "" &&
                                        mes
                                      }
                                      required
                                      fullWidth
                                      disabled={flagviewDisabled}
                                      onBlur={handlevalidationerror}
                                    />
                                    {onblurvalidation.PerDayBenefitICU === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .PerDayBenefitICU !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="Value"
                                      label="Hospicash SI"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Value
                                      }
                                      required
                                      disabled
                                      fullWidth
                                    />
                                  </Grid>
                                </>
                              )}
                              {x.HospitalizationCriteria === "Combined" &&
                                x.CoverName === "Hospicash" && (
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="Deductible"
                                      label="Deductible Days"
                                      onChange={(e) => handleinputtypeDeductible(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Deductible
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Deductible === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Deductible === "" &&
                                        mes
                                      }
                                      required
                                      fullWidth
                                      disabled={flagviewDisabled}
                                    />
                                    {onblurvalidation.DeductibleDays === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .Deductible !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                )}
                              {x.HospitalizationCriteria === "Separate" && (
                                <>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="DeductibleICU"
                                      label="Deductible Days ICU"
                                      onChange={(e) => handleinputtypeDeductibleICU(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DeductibleICU
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DeductibleICU === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DeductibleICU === "" &&
                                        mes
                                      }
                                      required
                                      fullWidth
                                      disabled={flagviewDisabled}
                                    />
                                    {onblurvalidation.DeductibledaysICU === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .DeductibleICU !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="DeductibleNormal"
                                      label="Deductible Days Normal"
                                      onChange={(e) => handleinputtypeDeductibleNormal(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DeductibleNormal
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DeductibleNormal === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DeductibleNormal === "" &&
                                        mes
                                      }
                                      required
                                      fullWidth
                                      disabled={flagviewDisabled}
                                    />
                                    {onblurvalidation.DeductibledaysNormal === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .DeductibleNormal !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                </>
                              )}
                              {x.CoverName === "EMI Benefit" && (
                                <>
                                  {x.SuminsuredInputType === "Variable" && (
                                    <>
                                      <Grid item xs={3}>
                                        <MDInput
                                          name="MaxEMIAmountMonthly"
                                          label="Maximum EMI Amount Limit (Monthly)"
                                          onChange={(e) => handleinputtype(e, i)}
                                          value={
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].MaxEMIAmountMonthly
                                          }
                                          error={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].MaxEMIAmountMonthly === ""
                                          }
                                          helperText={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].MaxEMIAmountMonthly === "" &&
                                            mes
                                          }
                                          required
                                          fullWidth
                                          disabled={flagviewDisabled}
                                          onBlur={handlevalidationerror}
                                        />
                                        {onblurvalidation.MonthlyEMIError === true &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxEMIAmountMonthly !== "" ? (
                                          <MDTypography sx={ErrorStyle}>
                                            Allows only number
                                          </MDTypography>
                                        ) : null}
                                      </Grid>
                                      <Grid item xs={3}>
                                        <MDInput
                                          name="MaxEMIPerYear"
                                          label="Maximum EMI Per Year"
                                          onChange={(e) => handleinputtype(e, i)}
                                          value={
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].MaxEMIPerYear
                                          }
                                          error={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].MaxEMIPerYear === ""
                                          }
                                          helperText={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].MaxEMIPerYear === "" &&
                                            mes
                                          }
                                          required
                                          fullWidth
                                          disabled={flagviewDisabled}
                                          onBlur={handlevalidationerror}
                                        />
                                        {onblurvalidation.MaxEMIPerYearEror === true &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxEMIPerYear !== "" ? (
                                          <MDTypography sx={ErrorStyle}>
                                            Allows only number
                                          </MDTypography>
                                        ) : null}
                                      </Grid>
                                    </>
                                  )}
                                  {x.SuminsuredInputType === "Fixed" && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="FixedMonthlyEMIAmount"
                                        label="Fixed monthly EMI Amount"
                                        onChange={(e) => handleinputtype(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].FixedMonthlyEMIAmount
                                        }
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].FixedMonthlyEMIAmount === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].FixedMonthlyEMIAmount === "" &&
                                          mes
                                        }
                                        required
                                        fullWidth
                                        disabled={flagviewDisabled}
                                        onBlur={handlevalidationerror}
                                      />
                                      {onblurvalidation.FixedMonthlyEMIError === true &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].FixedMonthlyEMIAmount !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  )}
                                  {x.CoverName === "EMI Benefit" && (
                                    <>
                                      <Grid item xs={3}>
                                        <MDInput
                                          name="NoofEMIInstalments"
                                          label="Maximum No. of EMI Claim Payout"
                                          onChange={(e) => handleinputtype(e, i)}
                                          value={
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].NoofEMIInstalments || ""
                                          }
                                          error={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].NoofEMIInstalments === ""
                                          }
                                          helperText={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].NoofEMIInstalments === "" &&
                                            mes
                                          }
                                          onKeyPress={(e) => {
                                            const value = e.target.value + e.key;
                                            if (parseFloat(value) < 0 || parseFloat(value) > 10) {
                                              e.preventDefault();
                                            }
                                          }}
                                          inputProps={{ maxLength: 2 }}
                                          required
                                          fullWidth
                                          disabled={flagviewDisabled}
                                          onBlur={handlevalidationerror}
                                        />
                                        {onblurvalidation.NoEmiInstallementError === true &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofEMIInstalments !== "" ? (
                                          <MDTypography sx={ErrorStyle}>
                                            Allows only number
                                          </MDTypography>
                                        ) : null}
                                      </Grid>
                                      {x.SuminsuredInputType === "Fixed" && (
                                        <Grid item xs={3}>
                                          <MDInput
                                            name="Value"
                                            label="EMI SumInsured"
                                            onChange={(e) => handleinputtype(e, i)}
                                            value={
                                              plan[0].groupDetails[0].SectionMappingDetails
                                                .BenefitDetails[i].Value
                                            }
                                            required
                                            disabled
                                            fullWidth
                                          />
                                        </Grid>
                                      )}
                                    </>
                                  )}
                                  {x.SuminsuredInputType === "Variable" && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="Value"
                                        label="Max EMI SumInsured"
                                        onChange={(e) => handleinputtype(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].Value
                                        }
                                        required
                                        disabled
                                        fullWidth
                                      />
                                    </Grid>
                                  )}
                                </>
                              )}
                              {x.CoverName === "Personal Accident" && (
                                <>
                                  {x.SuminsuredInputType === "Variable" && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="MaxPASIPerYear"
                                        label="Maximum PA SumInsured Per Year"
                                        onChange={(e) => handleinputtype(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxPASIPerYear
                                        }
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxPASIPerYear === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxPASIPerYear === "" &&
                                          mes
                                        }
                                        required
                                        disabled={flagviewDisabled}
                                        onBlur={handlevalidationerror}
                                      />
                                      {onblurvalidation.MaxPASIError === true &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MaxPASIPerYear !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  )}
                                  {x.SuminsuredInputType === "Fixed" && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="FixedPASI"
                                        label="Fixed Personal Accident SumInsured"
                                        onChange={(e) => handleinputtype(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].FixedPASI
                                        }
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].FixedPASI === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].FixedPASI === "" &&
                                          mes
                                        }
                                        required
                                        disabled={flagviewDisabled}
                                        onBlur={handlevalidationerror}
                                      />
                                      {onblurvalidation.FixedPASIError === true &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].FixedPASI !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  )}
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="Value"
                                      label="Per Person PA SI"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Value
                                      }
                                      required
                                      disabled
                                      fullWidth
                                    />
                                  </Grid>
                                </>
                              )}
                              {x.CoverName === "Critical Illness" && (
                                <>
                                  {x.SuminsuredInputType === "Variable" && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="MaxCISI"
                                        label="Maximum Critical Illness SI"
                                        onChange={(e) => handleinputtype(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxCISI
                                        }
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxCISI === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxCISI === "" &&
                                          mes
                                        }
                                        required
                                        disabled={flagviewDisabled}
                                        onBlur={handlevalidationerror}
                                      />
                                      {onblurvalidation.MaxCISIError === true &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MaxCISI !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  )}
                                  {x.SuminsuredInputType === "Fixed" && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="FixedCISI"
                                        label="Fixed Critical Illness SI"
                                        onChange={(e) => handleinputtype(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].FixedCISI
                                        }
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].FixedCISI === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].FixedCISI === "" &&
                                          mes
                                        }
                                        required
                                        disabled={flagviewDisabled}
                                        onBlur={handlevalidationerror}
                                      />
                                      {onblurvalidation.FixedCISIError === true &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].FixedCISI !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  )}
                                  <Grid item xs={3}>
                                    <Autocomplete
                                      name="CountofCI"
                                      sx={styleAuto}
                                      options={["9", "12", "15", "25", "35"]}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].CountofCI
                                      }
                                      getOptionLabel={(option) => option}
                                      onChange={(e, value) =>
                                        handleautocomplete(e, "CountofCI", value, i)
                                      }
                                      renderInput={(op) => (
                                        <TextField
                                          {...op}
                                          label="Count of Critical Illness"
                                          error={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].CountofCI === ""
                                          }
                                          helperText={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].CountofCI === "" &&
                                            mes
                                          }
                                          required
                                        />
                                      )}
                                      require
                                      fullWidth
                                      disabled={flagviewDisabled}
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="Value"
                                      label="Per Person CI SI"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Value
                                      }
                                      required
                                      disabled
                                      fullWidth
                                    />
                                  </Grid>
                                  {(plan[0].groupDetailsJson.SectionMaster.SumInsuredType ===
                                    "Floater" ||
                                    plan[0].groupDetailsJson.SectionMaster.SumInsuredType ===
                                      "NonFloater") && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="MaxIndividualClaim"
                                        label="Maximum No. of Individual Claims"
                                        onChange={(e) => handleMDinputtypeIndividual(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxIndividualClaim
                                        }
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxIndividualClaim === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxIndividualClaim === "" &&
                                          mes
                                        }
                                        required
                                        fullWidth
                                        disabled={flagviewDisabled}
                                      />
                                      {onblurvalidation.MaxIndividualclaimError === true &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MaxIndividualClaim !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  )}
                                  {plan[0].groupDetailsJson.SectionMaster.SumInsuredType ===
                                    "Floater" && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="MaxFamilyClaims"
                                        label="Maximum No. of Family Claims"
                                        onChange={(e) => handleMDinputtypeFamily(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxFamilyClaims
                                        }
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxFamilyClaims === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].MaxFamilyClaims === "" &&
                                          mes
                                        }
                                        required
                                        fullWidth
                                        disabled={flagviewDisabled}
                                      />
                                      {onblurvalidation.MaxFamilyclaimsError === true &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MaxFamilyClaims !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  )}
                                </>
                              )}
                              {x.CoverName === "Loss of Job" && (
                                <>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="NoofMonthsSalarytobePaid"
                                      label="No. of Months Salary to be Paid"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofMonthsSalarytobePaid
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofMonthsSalarytobePaid === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].NoofMonthsSalarytobePaid === "" &&
                                        mes
                                      }
                                      required
                                      disabled={flagviewDisabled}
                                      onBlur={handlevalidationerror}
                                    />
                                    {onblurvalidation.MonthsalaryPaidError === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .NoofMonthsSalarytobePaid !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="MaxMonthlySalary"
                                      label="Max Salary Allowed(Monthly)"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxMonthlySalary
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxMonthlySalary === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxMonthlySalary === "" &&
                                        mes
                                      }
                                      required
                                      disabled={flagviewDisabled}
                                      onBlur={handlevalidationerror}
                                    />
                                    {onblurvalidation.MaxSalaryAllowedError === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .MaxMonthlySalary !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="Value"
                                      label="Loss of Job SI"
                                      required
                                      disabled
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Value
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <Autocomplete
                                      multiple
                                      name="Applicablefor"
                                      sx={styleAuto}
                                      options={[
                                        "Accidental Death",
                                        "Permanent Partial Disability",
                                        "Permanent Total Disability",
                                        "Temporary Total Disability",
                                      ]}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Applicablefor
                                          ? plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                              i
                                            ].Applicablefor.split(", ")
                                          : []
                                      }
                                      getOptionLabel={(option) => option}
                                      onChange={(e, values) =>
                                        handlemultiselect(e, "Applicablefor", values, i)
                                      }
                                      renderInput={(op) => (
                                        <TextField
                                          {...op}
                                          label="Applicable For"
                                          error={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].Applicablefor === ""
                                          }
                                          helperText={
                                            onblurvalidation.ErrorFlag &&
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].Applicablefor === "" &&
                                            mes
                                          }
                                          required
                                        />
                                      )}
                                      fullWidth
                                      disabled={flagviewDisabled}
                                    />
                                  </Grid>
                                </>
                              )}
                              {x.CoverName === "Child Education Grant" && (
                                <>
                                  {x.SuminsuredInputType === "Fixed" && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="PerChildSI"
                                        label="Per Child SumInsured"
                                        onChange={(e) => handleinputtype(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].PerChildSI
                                        }
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].PerChildSI === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].PerChildSI === "" &&
                                          mes
                                        }
                                        required
                                        fullWidth
                                        disabled={flagviewDisabled}
                                        onBlur={handlevalidationerror}
                                      />
                                      {onblurvalidation.PerChildSiError === true &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].PerChildSI !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  )}
                                  {x.SuminsuredInputType === "PercentageofPersonalAccidentSI" && (
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="PercofPASI"
                                        label="Percentage of Personal Accident SI"
                                        onChange={(e) => handleinputtype(e, i)}
                                        value={
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].PercofPASI
                                        }
                                        onKeyPress={(e) => {
                                          const value = e.target.value + e.key;
                                          if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                                            e.preventDefault();
                                          }
                                        }}
                                        inputProps={{ maxLength: 3 }}
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].PercofPASI === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].PercofPASI === "" &&
                                          mes
                                        }
                                        required
                                        fullWidth
                                        disabled={flagviewDisabled}
                                        onBlur={handlevalidationerror}
                                      />
                                      {onblurvalidation.PercentagePASIError === true &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].PercofPASI !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  )}
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="MaxCEGSIPerYear"
                                      label="Maximum CEG SI Amount Limit"
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxCEGSIPerYear
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxCEGSIPerYear === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].MaxCEGSIPerYear === "" &&
                                        mes
                                      }
                                      required
                                      fullWidth
                                      disabled={flagviewDisabled}
                                      onBlur={handlevalidationerror}
                                    />
                                    {onblurvalidation.MaxCEGSILIMITError === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .MaxCEGSIPerYear !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="Value"
                                      label="CEG SumInsured"
                                      required
                                      disabled
                                      fullWidth
                                      onChange={(e) => handleinputtype(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Value
                                      }
                                    />
                                  </Grid>
                                </>
                              )}
                              <Grid item xs={3}>
                                <Autocomplete
                                  multiple
                                  name="FamilyCombination"
                                  sx={styleAuto}
                                  options={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .CoverName === "Loss of Job" ||
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .CoverName === "Child Education Grant"
                                      ? adultFamilyCombintaion
                                      : Familycombinationoption
                                  }
                                  getOptionLabel={(option) => option}
                                  onChange={(e, values) => handlefamilycombination(e, values, i)}
                                  value={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .FamilyCombination
                                      ? plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                          i
                                        ].FamilyCombination.split(",")
                                      : []
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Family Combination"
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].FamilyCombination === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].FamilyCombination === "" &&
                                        mes
                                      }
                                      required
                                    />
                                  )}
                                  required
                                  fullWidth
                                  disabled={flagviewDisabled}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <Autocomplete
                                  multiple
                                  name="Relationship"
                                  sx={styleAuto}
                                  options={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .CoverName === "Loss of Job" ||
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .CoverName === "Child Education Grant"
                                      ? adultrelationship
                                      : Relationshipoption
                                  }
                                  getOptionLabel={(option) => option}
                                  value={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .Relationship
                                      ? plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                          i
                                        ].Relationship.split(",")
                                      : []
                                  }
                                  onChange={(e, values) => handleRelationshipmaster(e, values, i)}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Relationships"
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Relationship === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].Relationship === "" &&
                                        mes
                                      }
                                      required
                                    />
                                  )}
                                  required
                                  fullWidth
                                  disabled={flagviewDisabled}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <MDInput
                                  name="MinAge"
                                  label="Minimum Age"
                                  onChange={(e) => handlechildinputtype(e, i)}
                                  value={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .MinAge || ""
                                  }
                                  onKeyPress={(e) => {
                                    const value = e.target.value + e.key;
                                    if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                                      e.preventDefault();
                                    }
                                  }}
                                  inputProps={{ maxLength: 3 }}
                                  error={
                                    onblurvalidation.ErrorFlag &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .MinAge === ""
                                  }
                                  helperText={
                                    onblurvalidation.ErrorFlag &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .MinAge === "" &&
                                    mes
                                  }
                                  required
                                  fullWidth
                                  disabled={flagviewDisabled}
                                />
                                {errorminage && (
                                  <MDTypography
                                    style={{ color: "red", fontSize: "10px", marginLeft: "0mm" }}
                                  >
                                    {errorminage}
                                  </MDTypography>
                                )}
                              </Grid>
                              <Grid item xs={3}>
                                <MDInput
                                  name="MaxAge"
                                  label="Maximum Age"
                                  onChange={(e) => handlechildMaxageinputtype(e, i)}
                                  value={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .MaxAge || ""
                                  }
                                  onKeyPress={(e) => {
                                    const value = e.target.value + e.key;
                                    if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                                      e.preventDefault();
                                    }
                                  }}
                                  inputProps={{ maxLength: 3 }}
                                  error={
                                    onblurvalidation.ErrorFlag &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .MaxAge === ""
                                  }
                                  helperText={
                                    onblurvalidation.ErrorFlag &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .MaxAge === "" &&
                                    mes
                                  }
                                  required
                                  fullWidth
                                  disabled={flagviewDisabled}
                                />
                                {erroraultage && (
                                  <MDTypography
                                    style={{ color: "red", fontSize: "10px", marginLeft: "0mm" }}
                                  >
                                    {erroraultage}
                                  </MDTypography>
                                )}
                              </Grid>
                              <Grid item xs={3}>
                                <Autocomplete
                                  name="RateType"
                                  sx={styleAuto}
                                  options={["Per Life", "Per Family"]}
                                  value={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .RateType
                                  }
                                  getOptionLabel={(option) => option}
                                  onChange={(e, value) =>
                                    handleautocomplete(e, "RateType", value, i)
                                  }
                                  renderInput={(op) => (
                                    <TextField
                                      {...op}
                                      label="Rate Type"
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].RateType === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].RateType === "" &&
                                        mes
                                      }
                                      required
                                    />
                                  )}
                                  fullWidth
                                  disabled={flagviewDisabled}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <Autocomplete
                                  name="RateCriteria"
                                  sx={styleAuto}
                                  value={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .RateCriteria
                                  }
                                  options={rateCriteriaOp}
                                  onChange={(e, value) =>
                                    handleautocomplete(e, "RateCriteria", value, i)
                                  }
                                  renderInput={(op) => (
                                    <TextField
                                      {...op}
                                      label="Rate Criteria"
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].RateCriteria === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].RateCriteria === "" &&
                                        mes
                                      }
                                      required
                                    />
                                  )}
                                  required
                                  fullWidth
                                  disabled={flagviewDisabled}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <Autocomplete
                                  name="PremiumUnit"
                                  sx={styleAuto}
                                  options={["PerLakh", "PerThousand", "NA"]}
                                  value={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .PremiumUnit
                                  }
                                  onChange={(e, value) =>
                                    handleautocomplete(e, "PremiumUnit", value, i)
                                  }
                                  getOptionLabel={(option) => option}
                                  renderInput={(op) => (
                                    <TextField
                                      {...op}
                                      label="Premium Unit"
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PremiumUnit === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PremiumUnit === "" &&
                                        mes
                                      }
                                      required
                                    />
                                  )}
                                  required
                                  fullWidth
                                  disabled={flagviewDisabled}
                                />
                              </Grid>
                              {x.RateCriteria === "Full" && (
                                <Grid item xs={3}>
                                  <MDInput
                                    name="Rate"
                                    label="Rate"
                                    onChange={(e) => handleinputtypeRate(e, i)}
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].Rate
                                    }
                                    error={
                                      onblurvalidation.ErrorFlag &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].Rate === ""
                                    }
                                    helperText={
                                      onblurvalidation.ErrorFlag &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].Rate === "" &&
                                      mes
                                    }
                                    required
                                    disabled={flagviewDisabled}
                                  />
                                  {onblurvalidation.RateError === true &&
                                  plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                    .Rate !== "" ? (
                                    <MDTypography sx={ErrorStyle}>Allows only number</MDTypography>
                                  ) : null}
                                </Grid>
                              )}
                              {x.CoverName === "EMI Benefit" && (
                                <Grid item xs={3}>
                                  <Autocomplete
                                    name="EMITenure"
                                    sx={styleAuto}
                                    options={["Per Year", "Policy Period"]}
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].EMITenure
                                    }
                                    getOptionLabel={(option) => option}
                                    onChange={(e, value) =>
                                      handleautocomplete(e, "EMITenure", value, i)
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="EMI (Tenure)"
                                        error={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].EMITenure === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          plan[0].groupDetails[0].SectionMappingDetails
                                            .BenefitDetails[i].EMITenure === "" &&
                                          mes
                                        }
                                        required
                                      />
                                    )}
                                    fullWidth
                                    disabled={flagviewDisabled}
                                  />
                                </Grid>
                              )}
                              {x.CoverName === "EMI Benefit" && (
                                <Grid container spacing={2} mt={2} ml={1}>
                                  {generateTriggerFields(i)}
                                </Grid>
                              )}
                            </Grid>
                            {x.RateCriteria === "AgeBand" && (
                              <Grid container spacing={3} mt={2}>
                                <Grid item xs={7}>
                                  <MDTypography>Age Band</MDTypography>
                                </Grid>
                                <Grid item xs={2.5}>
                                  <MDButton
                                    color="error"
                                    variant="outlined"
                                    startIcon={<DownloadIcon />}
                                    disabled={flagviewDisabled}
                                    onClick={handleDownloadTemplate}
                                  >
                                    DOWNLOAD
                                  </MDButton>
                                </Grid>
                                <Grid item xs={2.5}>
                                  <MDButton
                                    color="error"
                                    variant="outlined"
                                    disabled={flagviewDisabled}
                                    onClick={handleUploadClick}
                                  >
                                    <MDBox
                                      component="img"
                                      src={exportlogo}
                                      sx={{ maxHeight: "3rem", spacing: "0rem" }}
                                    />
                                    &nbsp; UPLOAD EXCEL
                                  </MDButton>
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    disabled={flagviewDisabled}
                                    onChange={(e) => handleFileSelect(e, i)}
                                    onClick={(e) => {
                                      e.target.value = "";
                                    }}
                                    accept=".xls,.xlsx"
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <MDTypography variant="h6">AgeFrom(In Years)</MDTypography>
                                </Grid>
                                <Grid item xs={3}>
                                  <MDTypography variant="h6">AgeTo(In Years)</MDTypography>
                                </Grid>
                                <Grid item xs={3}>
                                  <MDTypography variant="h6">Rate(Amount)</MDTypography>
                                </Grid>
                                <Grid item xs={3}>
                                  <MDTypography variant="h6" />
                                </Grid>
                                {x.AgeBand.map((band, Index) => (
                                  <>
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="AgeFrom"
                                        label="Age From "
                                        value={band.AgeFrom}
                                        disabled={flagviewDisabled}
                                        onChange={(e) => handleChange(e, Index, i)}
                                        fullWidth
                                        onKeyPress={(e) => {
                                          const value = e.target.value + e.key;
                                          if (
                                            Number.isNaN(parseFloat(value)) ||
                                            parseFloat(value) < 0 ||
                                            parseFloat(value) > 100
                                          ) {
                                            e.preventDefault();
                                          }
                                        }}
                                        inputProps={{ maxLength: 3 }}
                                        error={onblurvalidation.ErrorFlag && band.AgeFrom === ""}
                                        helperText={
                                          onblurvalidation.ErrorFlag && band.AgeFrom === "" && mes
                                        }
                                        required
                                      />
                                      {onblurvalidation[`AgeFromError${Index}`] === true &&
                                      band.AgeFrom !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                      {agefromerrormg[Index] && (
                                        <MDTypography
                                          style={{
                                            color: "red",
                                            fontSize: "10px",
                                            marginLeft: "0mm",
                                          }}
                                        >
                                          {agefromerrormg[Index]}
                                        </MDTypography>
                                      )}
                                    </Grid>
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="AgeTo"
                                        label="Age To"
                                        value={band.AgeTo}
                                        disabled={flagviewDisabled}
                                        onChange={(e) => handleChangeAgeTo(e, Index, i)}
                                        fullWidth
                                        onKeyPress={(e) => {
                                          const value = e.target.value + e.key;
                                          if (
                                            Number.isNaN(parseFloat(value)) ||
                                            parseFloat(value) < 0 ||
                                            parseFloat(value) > 100
                                          ) {
                                            e.preventDefault();
                                          }
                                        }}
                                        inputProps={{ maxLength: 3 }}
                                        error={onblurvalidation.ErrorFlag && band.AgeTo === ""}
                                        helperText={
                                          onblurvalidation.ErrorFlag && band.AgeTo === "" && mes
                                        }
                                        required
                                      />
                                      {onblurvalidation[`AgeToError${Index}`] === true &&
                                      band.AgeTo !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                      {agetoerrormg[Index] && (
                                        <MDTypography
                                          style={{
                                            color: "red",
                                            fontSize: "10px",
                                            marginLeft: "0mm",
                                          }}
                                        >
                                          {agetoerrormg[Index]}
                                        </MDTypography>
                                      )}
                                    </Grid>
                                    <Grid item xs={3}>
                                      <MDInput
                                        name="Rate"
                                        label="Rate"
                                        value={band.Rate}
                                        disabled={flagviewDisabled}
                                        onChange={(e) => handleChangeRate(e, Index, i)}
                                        fullWidth
                                        error={onblurvalidation.ErrorFlag && band.Rate === ""}
                                        helperText={
                                          onblurvalidation.ErrorFlag && band.Rate === "" && mes
                                        }
                                        required
                                      />
                                      {onblurvalidation[`Rate${Index}`] === true &&
                                      band.Rate !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                    <IconButton onClick={() => handleAddAgeBand(i)}>
                                      <AddCircleIcon color="error" fontSize="large" />
                                    </IconButton>
                                    {errorMessage[Index] && (
                                      <div
                                        style={{
                                          color: "red",
                                          marginTop: "12px",
                                          fontSize: "15px",
                                        }}
                                      >
                                        {errorMessage[Index]}
                                      </div>
                                    )}
                                    {Index > 0 || Index > 0 ? (
                                      <IconButton onClick={() => handleRemoveFields(Index, i)}>
                                        <CancelIcon color="error" fontSize="large" />
                                      </IconButton>
                                    ) : null}
                                  </>
                                ))}
                              </Grid>
                            )}
                            {(x.CoverName === "Critical Illness" ||
                              x.CoverName === "Personal Accident" ||
                              x.CoverName === "EMI Benefit" ||
                              x.CoverName === "Hospicash") && (
                              <>
                                <Grid container spacing={2} mt={2}>
                                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                    <MDTypography sx={{ fontSize: "1rem" }}>
                                      Pre existing Diseases (PED)
                                    </MDTypography>
                                  </Grid>
                                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
                                    <RadioGroup
                                      row
                                      aria-label="report-type"
                                      name="PEDYN"
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PEDYN
                                      }
                                      onChange={(e, value) =>
                                        handlePEDautocomplete(e, "PEDYN", value, i)
                                      }
                                      required
                                    >
                                      <FormControlLabel
                                        value="Yes"
                                        disabled={flagviewDisabled}
                                        control={<Radio />}
                                        label="Yes"
                                      />
                                      <FormControlLabel
                                        value="No"
                                        disabled={flagviewDisabled}
                                        control={<Radio />}
                                        label="No"
                                      />
                                    </RadioGroup>
                                    {onblurvalidation.ErrorFlag &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].PEDYN === "" && (
                                        <div style={{ color: "red", fontSize: "12px" }}>{mes}</div>
                                      )}
                                  </Grid>
                                  <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
                                    <MDInput
                                      label="PED Waiting Period (Months)"
                                      name="PEDwaitingperiod"
                                      onChange={(e) => handleinputtypematernity(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PEDwaitingperiod
                                      }
                                      disabled={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PEDwaitingperiod === "No" ||
                                        flagviewDisabled ||
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PEDwaitingperiod === ""
                                      }
                                      // onKeyPress={(e) => {
                                      //   const value = e.target.value + e.key;
                                      //   if (parseFloat(value) < 0 || parseFloat(value) > 48) {
                                      //     e.preventDefault();
                                      //   }
                                      // }}
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PEDYN === "Yes" &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PEDwaitingperiod === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PEDYN === "Yes" &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].PEDwaitingperiod === "" &&
                                        mes
                                      }
                                      required
                                      // inputProps={{ maxLength: 2 }}
                                    />
                                    {onblurvalidation.PEDwaitingperiodError === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .PEDwaitingperiod !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                </Grid>
                                {/* <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                  <MDTypography sx={{ fontSize: "1rem" }}>
                                    Maternity cover
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
                                  <RadioGroup
                                    row
                                    aria-label="report-type"
                                    name="MaternityYN"
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MaternityYN
                                    }
                                    onChange={(e, value) => handleRadioChange(value, i)}
                                  >
                                    <FormControlLabel
                                      value="Yes"
                                      disabled={flagviewDisabled}
                                      control={<Radio />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value="No"
                                      disabled={flagviewDisabled}
                                      control={<Radio />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
                                  <MDInput
                                    label=" Maternity Waiting Period"
                                    name="MaternityWaitingPeriod"
                                    onChange={(e) => handleinputtypematernity(e, i)}
                                    value={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MaternityWaitingPeriod
                                    }
                                    disabled={
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MaternityYN === "No" ||
                                      flagviewDisabled ||
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].MaternityYN === ""
                                    }
                                  />
                                </Grid>
                              </Grid> */}
                              </>
                            )}
                            {x.CoverName === "Personal Accident" && (
                              <>
                                <MDTypography mt={3}>NO.of Days PA Benefit Applicable</MDTypography>
                                <Grid container spacing={3} mt={0}>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="DaysADBenefitApplicable"
                                      label="Accidental Death (Days)"
                                      onChange={(e) => handlepapercentage(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysADBenefitApplicable
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysADBenefitApplicable === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysADBenefitApplicable === "" &&
                                        mes
                                      }
                                      required
                                      disabled={flagviewDisabled}
                                    />
                                    {onblurvalidation.DaysADBenefitError === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .DaysADBenefitApplicable !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="DaysPPDBenefitApplicable"
                                      label="Permanent Partial Disability (Days)"
                                      onChange={(e) => handlepapercentage(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysPPDBenefitApplicable
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysPPDBenefitApplicable === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysPPDBenefitApplicable === "" &&
                                        mes
                                      }
                                      required
                                      disabled={flagviewDisabled}
                                    />
                                    {onblurvalidation.DaysPPDBenefitError === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .DaysPPDBenefitApplicable !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="DaysPTDBenefitApplicable"
                                      label="Permanent Total Disability (Days)"
                                      onChange={(e) => handlepapercentage(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysPTDBenefitApplicable
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysPTDBenefitApplicable === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysPTDBenefitApplicable === "" &&
                                        mes
                                      }
                                      required
                                      disabled={flagviewDisabled}
                                    />
                                    {onblurvalidation.DaysPTDBenefitError === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .DaysPTDBenefitApplicable !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                  <Grid item xs={3}>
                                    <MDInput
                                      name="DaysTTDBenefitApplicable"
                                      label="Temporary Total Disability (Days)"
                                      onChange={(e) => handlepapercentage(e, i)}
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysTTDBenefitApplicable
                                      }
                                      error={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysTTDBenefitApplicable === ""
                                      }
                                      helperText={
                                        onblurvalidation.ErrorFlag &&
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].DaysTTDBenefitApplicable === "" &&
                                        mes
                                      }
                                      required
                                      disabled={flagviewDisabled}
                                    />
                                    {onblurvalidation.DaysTTDBenefitError === true &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .DaysTTDBenefitApplicable !== "" ? (
                                      <MDTypography sx={ErrorStyle}>
                                        Allows only number
                                      </MDTypography>
                                    ) : null}
                                  </Grid>
                                </Grid>
                                <MDTypography mt={3}>Percentage PA Payable of SI</MDTypography>
                                <Grid container spacing={3} mt={0}>
                                  {x.PersonalAccidentDetails.map((z, id) => (
                                    <Grid item xs={3}>
                                      <MDInput
                                        label={`${z.PABenefitName} Percentage`}
                                        name="PABenefitPercentage"
                                        mt={2}
                                        value={z.PABenefitPercentage}
                                        onChange={(e) =>
                                          handlepapercentage(e, i, id, z.PABenefitName)
                                        }
                                        onKeyPress={(e) => {
                                          const value = e.target.value + e.key;
                                          if (parseFloat(value) < 0 || parseFloat(value) > 100) {
                                            e.preventDefault();
                                          }
                                        }}
                                        inputProps={{ maxLength: 3 }}
                                        error={
                                          onblurvalidation.ErrorFlag && z.PABenefitPercentage === ""
                                        }
                                        helperText={
                                          onblurvalidation.ErrorFlag &&
                                          z.PABenefitPercentage === "" &&
                                          mes
                                        }
                                        required
                                        disabled={flagviewDisabled}
                                        onBlur={(e) => handlevalidationerror(e, z.PABenefitName)}
                                      />
                                      {onblurvalidation.PABenefitPercentageADError === true &&
                                      z.PABenefitName === "Accidental Death" &&
                                      z.PABenefitPercentage !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                      {onblurvalidation.PABenefitPercentageTTDError === true &&
                                      z.PABenefitName === "Temporary Total Disability" &&
                                      z.PABenefitPercentage !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                      {onblurvalidation.PABenefitPercentagePPDError === true &&
                                      z.PABenefitName === "Permanent Partial Disability" &&
                                      z.PABenefitPercentage !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                      {onblurvalidation.PABenefitPercentagePTDError === true &&
                                      z.PABenefitName === "Permanent Total Disability" &&
                                      z.PABenefitPercentage !== "" ? (
                                        <MDTypography sx={ErrorStyle}>
                                          Allows only number
                                        </MDTypography>
                                      ) : null}
                                    </Grid>
                                  ))}
                                </Grid>
                                <Grid Container spacing={3} mt={2}>
                                  {x.PersonalAccidentDetails.map((z, id) => (
                                    <Stack direction="row">
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        lg={4}
                                        xl={4}
                                        xxl={4}
                                        mt={2}
                                      >
                                        {z.PABenefitName}
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={3}
                                        lg={3}
                                        xl={3}
                                        xxl={3}
                                        mt={2}
                                      >
                                        <RadioGroup
                                          row
                                          aria-label="report-type"
                                          name="PABenefitYN"
                                          mt={2}
                                          value={z.PABenefitYN}
                                          onChange={(e) =>
                                            handlePersonalAccident(e, i, id, z.PABenefitName)
                                          }
                                        >
                                          <FormControlLabel
                                            value="Yes"
                                            disabled={flagviewDisabled}
                                            control={<Radio />}
                                            label="Yes"
                                          />

                                          <FormControlLabel
                                            value="No"
                                            disabled={flagviewDisabled}
                                            control={<Radio />}
                                            label="No"
                                          />
                                        </RadioGroup>
                                        {onblurvalidation.ErrorFlag && z.PABenefitYN === "" && (
                                          <div style={{ color: "red", fontSize: "12px" }}>
                                            {mes}
                                          </div>
                                        )}
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={3}
                                        lg={3}
                                        xl={3}
                                        xxl={3}
                                        mt={2}
                                      >
                                        <MDInput
                                          label={`${z.PABenefitName} SI`}
                                          name="PABenefitSI"
                                          mt={2}
                                          value={z.PABenefitSI}
                                          onChange={(e) => handlepapercentage(e, i)}
                                          disabled={
                                            z.PABenefitYN === "No" ||
                                            (flagviewDisabled && z.PABenefitSI)
                                          }
                                          inputProps={{
                                            readOnly:
                                              z.PABenefitYN === "No" ||
                                              (flagviewDisabled && z.PABenefitSI),
                                          }}
                                          error={
                                            onblurvalidation.ErrorFlag && z.PABenefitName === ""
                                          }
                                          helperText={
                                            onblurvalidation.ErrorFlag &&
                                            z.PABenefitName === "" &&
                                            mes
                                          }
                                        />
                                      </Grid>
                                    </Stack>
                                  ))}
                                </Grid>
                              </>
                            )}
                            {(x.CoverName === "EMI Benefit" || x.CoverName === "Hospicash") && (
                              <>
                                <Grid container row>
                                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                                    <MDTypography variant="h6" mt={1} mb={2}>
                                      Ailment Master (Exclusion)
                                    </MDTypography>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                                    <RadioGroup
                                      row
                                      m={10}
                                      name="AilmentApplicable"
                                      value={
                                        plan[0].groupDetails[0].SectionMappingDetails
                                          .BenefitDetails[i].AilmentApplicable
                                      }
                                      onChange={(e, value) =>
                                        handleautocomplete(e, "AilmentApplicable", value, i)
                                      }
                                      required
                                    >
                                      <FormControlLabel
                                        value="Applicable"
                                        disabled={flagviewDisabled}
                                        control={<Radio />}
                                        label="Applicable"
                                      />
                                      <FormControlLabel
                                        value="NonApplicable"
                                        disabled={flagviewDisabled}
                                        control={<Radio />}
                                        label="Non Applicable"
                                      />
                                    </RadioGroup>
                                    {onblurvalidation.ErrorFlag &&
                                      plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[
                                        i
                                      ].AilmentApplicable === "" && (
                                        <div style={{ color: "red", fontSize: "12px" }}>{mes}</div>
                                      )}
                                  </Grid>
                                </Grid>
                                {x.AilmentApplicable === "Applicable" && (
                                  <>
                                    <Grid container spacing={2} sx>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={4}
                                        lg={4}
                                        xl={4}
                                        xxl={4}
                                        style={{
                                          color: "red",
                                          fontSize: "15px",
                                          marginLeft: "30rem",
                                        }}
                                      >
                                        <RadioGroup
                                          row
                                          m={10}
                                          name="SelectAllYN"
                                          value={
                                            plan[0].groupDetails[0].SectionMappingDetails
                                              .BenefitDetails[i].Ailmentmaster.SelectAllYN
                                          }
                                          onChange={(e) => handleSelectAll(e, i)}
                                        >
                                          <FormControlLabel
                                            value="selectAllYes"
                                            disabled={flagviewDisabled}
                                            control={<Radio />}
                                            label="Select All Yes"
                                          />
                                          <FormControlLabel
                                            value="selectAllNo"
                                            disabled={flagviewDisabled}
                                            control={<Radio />}
                                            label="Select All No"
                                          />
                                        </RadioGroup>
                                      </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                      {x.Ailmentmaster.map((k, j) => (
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                          <Grid container expanded>
                                            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                              {k.Values.length > 45 ? (
                                                <>
                                                  {Array.from(
                                                    { length: Math.ceil(k.Values.length / 45) },
                                                    (_, index) => (
                                                      <MDTypography key={index}>
                                                        {k.Values.slice(
                                                          index * 45,
                                                          index * 45 + 45
                                                        )}
                                                      </MDTypography>
                                                    )
                                                  )}
                                                </>
                                              ) : (
                                                <MDTypography>{k.Values} </MDTypography>
                                              )}
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
                                              <RadioGroup
                                                row
                                                aria-label="report-type"
                                                name="Applicable"
                                                value={k.Applicable}
                                                onChange={(e) => handleRadioChangeAilment(e, i, j)}
                                              >
                                                <FormControlLabel
                                                  value="Yes"
                                                  disabled={flagviewDisabled}
                                                  control={<Radio />}
                                                  label="Yes"
                                                />
                                                <FormControlLabel
                                                  value="No"
                                                  disabled={flagviewDisabled}
                                                  control={<Radio />}
                                                  label="No"
                                                />
                                              </RadioGroup>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
                                              <MDInput
                                                label="Waiting Period (Months)"
                                                name="WaitingPeriod"
                                                value={k.WaitingPeriod}
                                                onChange={(e) => handlePlanDetails(e, i, j)}
                                                disabled={
                                                  k.Applicable === "Yes" || flagviewDisabled
                                                }
                                                error={
                                                  onblurvalidation.ErrorFlag &&
                                                  k.WaitingPeriod === "" &&
                                                  k.Applicable === "No"
                                                }
                                                helperText={
                                                  onblurvalidation.ErrorFlag &&
                                                  k.WaitingPeriod === "" &&
                                                  k.Applicable === "No" &&
                                                  mes
                                                }
                                              />
                                              {onblurvalidation[`waitingperiodError${j}`] ===
                                                true && k.WaitingPeriod !== "" ? (
                                                <MDTypography sx={ErrorStyle}>
                                                  Allows only number
                                                </MDTypography>
                                              ) : null}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </>
                                )}
                              </>
                            )}
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                                <MDTypography variant="h6" mt={1} mb={2}>
                                  Claim Payout Percentage
                                </MDTypography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={3}>
                                <MDInput
                                  name="CustomerNomineePercentage"
                                  label="Customer/Nominee %"
                                  onChange={(e) => handleinputtypepercentage(e, i)}
                                  value={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .CustomerNomineePercentage
                                  }
                                  error={
                                    onblurvalidation.ErrorFlag &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .CustomerNomineePercentage === ""
                                  }
                                  helperText={
                                    onblurvalidation.ErrorFlag &&
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .CustomerNomineePercentage === "" &&
                                    mes
                                  }
                                  required
                                  fullWidth
                                  disabled={flagviewDisabled}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <MDInput
                                  name="FinancierPercentage"
                                  label="Financier %"
                                  onChange={(e) => handleinputtypepercentage(e, i)}
                                  value={
                                    plan[0].groupDetails[0].SectionMappingDetails.BenefitDetails[i]
                                      .FinancierPercentage
                                  }
                                  required
                                  fullWidth
                                  disabled
                                />
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
            <Grid container row>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography variant="h6" mt={1} mb={2} ml={2}>
                  Is Clauses & Exclusions Applicable?
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <RadioGroup
                  row
                  m={10}
                  name="CluaseExclusionApplicable"
                  value={plan[0].groupDetailsJson.SectionMaster.CluaseExclusionApplicable}
                  onChange={handleChangeRadio}
                >
                  <FormControlLabel
                    value="Yes"
                    disabled={flagviewDisabled}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="No"
                    disabled={flagviewDisabled}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                {plan[0].groupDetailsJson.SectionMaster.CluaseExclusionApplicable === "Yes" && (
                  <>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <MDTypography color="error">Clauses</MDTypography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={1}>
                          <Grid item xs={1}>
                            <Checkbox
                              checked={selectAll}
                              disabled={flagviewDisabled}
                              onChange={handleMasterCheckboxChange}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <MDTypography variant="h6" mt={1} mb={2} ml={2}>
                              Clause Name
                            </MDTypography>
                          </Grid>
                          <Grid item xs={8}>
                            <MDTypography variant="h6" mt={1} mb={2} ml={2}>
                              Clause Description
                            </MDTypography>
                          </Grid>
                        </Grid>
                        {plan[0].groupDetailsJson.SectionMaster.Clauses.map((H, i) => (
                          <Grid container spacing={1}>
                            <Grid item xs={1}>
                              <Checkbox
                                name="Applicable"
                                onChange={(e) => handleclusesapplicable(e, i)}
                                checked={H.Applicable === "true"}
                                disabled={flagviewDisabled}
                                value={plan[0].groupDetailsJson.SectionMaster.Clauses[i].Applicable}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <MDTypography mt={1} mb={2} ml={2}>
                                {H.Value}
                              </MDTypography>
                            </Grid>
                            <Grid item xs={8}>
                              <MDTypography mt={1} mb={2} ml={2}>
                                {H.Desc}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        ))}
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDInput
                            name="Value"
                            placeholder="Add other Clauses"
                            onChange={handleInputClauses}
                            onBlur={handleInputBlur}
                            value={newClause}
                            required
                            fullWidth
                            disabled={flagviewDisabled}
                          />
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <MDTypography color="error">Exclusions</MDTypography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={1}>
                          <Grid item xs={1}>
                            <Checkbox
                              checked={selectAllExclusion}
                              disabled={flagviewDisabled}
                              onChange={handleMasterCheckboxChangeExclution}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <MDTypography variant="h6" mt={1} mb={2} ml={2}>
                              Exclusion Name
                            </MDTypography>
                          </Grid>
                          <Grid item xs={8}>
                            <MDTypography variant="h6" mt={1} mb={2} ml={2}>
                              Exclusion Description
                            </MDTypography>
                          </Grid>
                        </Grid>
                        {plan[0].groupDetailsJson.SectionMaster.Exclusion.map((g, id) => (
                          <Grid container spacing={1}>
                            <Grid item xs={1}>
                              <Checkbox
                                name="Applicable"
                                onChange={(e) => handleExclusionapplicable(e, id)}
                                checked={g.Applicable === "true"}
                                disabled={flagviewDisabled}
                                value={
                                  plan[0].groupDetailsJson.SectionMaster.Exclusion[id].Applicable
                                }
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <MDTypography mt={1} mb={2} ml={2}>
                                {g.Value}
                              </MDTypography>
                            </Grid>
                            <Grid item xs={8}>
                              <MDTypography mt={1} mb={2} ml={2}>
                                {g.Desc}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        ))}
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDInput
                            name="Value"
                            placeholder="Add other Exclusion"
                            onChange={handleInputExclusion}
                            onBlur={handleInputBlurExclusion}
                            value={newExclusion}
                            required
                            fullWidth
                            disabled={flagviewDisabled}
                          />
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
              </Grid>
            </Grid>
          </Accordion>
          <MDBox
            sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 2 }}
          >
            <MDBox sx={{ flex: "1 1 auto" }} />
            <Stack direction="row" spacing={2}>
              <MDButton variant="outlined" onClick={handleDrawerClose}>
                Cancel
              </MDButton>
              {isDrawerOpen && flagEdit === false ? (
                <MDButton
                  variant="outlined"
                  disabled={flagviewDisabled}
                  onClick={handleClickSubmitt}
                >
                  Create Plan
                </MDButton>
              ) : (
                <MDButton variant="outlined" onClick={handleEditClickOpen}>
                  Update Plan
                </MDButton>
              )}
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress />
              </Backdrop>
              <Dialog
                open={openEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                  "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                      width: "100%",

                      maxWidth: "600px",
                    },
                  },
                }}
              >
                <Grid container justifyContent="flex-end">
                  <MDButton
                    startIcon={<CloseIcon />}
                    sx={{ fontSize: "1rem" }}
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    variant="text"
                    color="black"
                    onClick={handleEditClose}
                  />
                </Grid>

                <Grid container justifyContent="center">
                  <DialogTitle>Are You Sure Want to Update {planname} ? </DialogTitle>
                </Grid>
                <DialogActions>
                  <Grid container justifyContent="center">
                    <MDButton onClick={handleEditmesg} variant="contained" color="error">
                      YES
                    </MDButton>
                    <span style={{ marginRight: "40px" }} />
                    {updateSuccess && (
                      <Dialog
                        open={openEditmsg}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{
                          "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                              width: "100%",
                              maxWidth: "600px",
                            },
                          },
                        }}
                      >
                        <Grid container justifyContent="flex-end">
                          <MDButton
                            startIcon={<CloseIcon />}
                            sx={{ fontSize: "1rem" }}
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            variant="text"
                            color="black"
                            onClick={handleEditClose}
                          />
                        </Grid>
                        <Grid container justifyContent="center">
                          <CheckCircleIcon fontSize="large" sx={{ color: green[500] }} />
                        </Grid>
                        <Grid container justifyContent="center">
                          <DialogTitle> {planname} Updated Successfully </DialogTitle>
                        </Grid>
                        <Grid container justifyContent="center">
                          <DialogActions>
                            <MDButton
                              onClick={handleEditmesgClose}
                              variant="contained"
                              color="error"
                            >
                              Close
                            </MDButton>
                          </DialogActions>
                        </Grid>
                      </Dialog>
                    )}
                    <MDButton onClick={handleEditClose} variant="outlined" color="error">
                      NO
                    </MDButton>
                  </Grid>
                </DialogActions>
              </Dialog>
              <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                  "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                      width: "100%",
                      maxWidth: "730px",
                      maxHeight: "380px",
                    },
                  },
                }}
              >
                <DialogContent>
                  <Grid container justifyContent="flex-end">
                    <MDButton
                      startIcon={<CloseIcon />}
                      sx={{ fontSize: "1rem" }}
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      variant="text"
                      color="black"
                      onClick={handleClose}
                    />
                  </Grid>
                  <Grid container justifyContent="center">
                    <MDBox
                      component="img"
                      src={POSPAAdded}
                      sx={{ maxHeight: "15.5rem", width: 120, spacing: "0rem", m: "0" }}
                      justifyContent="flex-end"
                      alignItems="flex-end"
                    />
                  </Grid>
                  <Grid container justifyContent="center">
                    <DialogTitle id="alert-dialog-title" sx={{ color: "green", lineHeight: "0" }}>
                      Plan Saved Successfully
                    </DialogTitle>
                  </Grid>
                  <Grid container justifyContent="center">
                    <DialogTitle id="alert-dialog-title">
                      Plan Name :{plan[0].DisplayName}
                    </DialogTitle>
                  </Grid>
                  <Grid container justifyContent="center">
                    <MDButton
                      onClick={handleViewPlan}
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      variant="contained"
                      color="error"
                      ml={25}
                    >
                      View Plans
                    </MDButton>
                  </Grid>
                </DialogContent>
              </Dialog>
            </Stack>
          </MDBox>
        </MDBox>
      </Drawer>
    </MDBox>
  );
}

export default PlanDetails;
