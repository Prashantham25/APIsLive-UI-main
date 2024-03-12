import React from "react";

import {
  Grid,
  //   Card,
  //   Autocomplete,
  Backdrop,
  CircularProgress,
  //   Step,
  //   Stepper,
  //   StepLabel,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  AccordionSummary,
  Radio,
  Stack,
  Accordion,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// import { useLocation } from "react-router-dom";
// // import CustomDropDown from "components/CustomDropDown/index";
// import Swal from "sweetalert2";
// import SuccessTick from "assets/images/Takaful/SuccessTick.png";
// import NoPolicy from "assets/images/Takaful/NoPolicy.png";
import MDBox from "components/MDBox";
import Modal from "@mui/material/Modal";
import MDDatePicker from "components/MDDatePicker";
import MDAutocomplete from "components/MDAutocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import GetTranslate from "components/Translation/GetTranslate";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { DateTimePicker } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from "react-router-dom";
// import { MotorIntimateJson } from "../data/JsonData";
// import Claimdetails from "./Claimdetails";
import {
  // Policies,
  //   GetProdPartnermasterData,
  GetProdPartnermastersMasterData,
  //   UpdateSequenceNumber,
  // SaveClaimDetails,
  //   GetClaimDetails,
  //   SaveClaimHistory,
  //   DocumentUpload,
  //   // getDocumentById,
  //   DeleteDocument,
  //   GetPayLoadByQueryDynamic, // to get existing claim in the 2nd datagrid of 2nd stepper
  //   // SearchClaimDetailsByClaimNo,
  //   GenericApi,
} from "../data/index";

// const localUserName = localStorage.getItem("userName");
// const localUserID = localStorage.getItem("userId");

function PolicyDetails({
  AllAccordions,
  IntimateJson,
  setIntimationJson,
  masters,
  setMasters,
  selectCheckbox,
  setSelectCheckBox,
}) {
  const LIntimationJSon = IntimateJson;
  const lmasters = masters;
  const IsEmail = (e, name) => {
    // const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    if (name === "emailId") {
      const emailRegex =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/i;

      if (!emailRegex.test(e.target.value)) {
        lmasters.EmailId = true;
      } else {
        lmasters.EmailId = false;
      }
    }
    setMasters({ ...lmasters });
  };
  const handleInput = (e, name) => {
    const alphnum = /^[a-zA-Z0-9]*$/;
    const alphanumspace = /^[a-zA-Z0-9\s]*$/;
    const aplhaspace = /^[a-zA-Z\s]*$/;
    const alphnumslash = /^[a-zA-Z0-9/]*$/;
    const num = /^[0-9]*$/;
    // const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    switch (name) {
      case "ParticipantName":
        if (alphanumspace.test(e.target.value)) {
          LIntimationJSon.claimBasicDetails.PolicyDetails.ParticipantName = e.target.value;
        }
        break;
      case "policyno":
        if (alphnumslash.test(e.target.value)) {
          LIntimationJSon.claimBasicDetails.PolicyDetails.PolicyNo = e.target.value;
        }
        break;
      case "vehicleplateno":
        if (alphnum.test(e.target.value)) {
          LIntimationJSon.claimBasicDetails.PolicyDetails.VehiclePlateNo = e.target.value;
        }
        break;
      case "vehicleusagetype":
        if (alphnum.test(e.target.value)) {
          LIntimationJSon.claimBasicDetails.PolicyDetails.VehicleUsageType = e.target.value;
        }
        break;
      case "chassisno":
        if (alphnum.test(e.target.value)) {
          LIntimationJSon.claimBasicDetails.PolicyDetails.ChassisNumber = e.target.value;
        }
        break;
      case "engineno":
        if (alphnum.test(e.target.value)) {
          LIntimationJSon.claimBasicDetails.PolicyDetails.EngineNumber = e.target.value;
        }
        break;
      case "ParticipantMobileNo":
        if (num.test(e.target.value)) {
          LIntimationJSon.claimBasicDetails.PolicyDetails.MobileNumber = e.target.value;
        }
        break;
      case "emailId":
        LIntimationJSon.claimBasicDetails.PolicyDetails.EmailId = e.target.value;
        break;
      case "Coverages":
        LIntimationJSon.claimBasicDetails.PolicyDetails.Coverages = e.target.value;
        break;
      case "NotifierName":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierName =
          e.target.value;
        break;
      case "NotifierMobileNo":
        if (num.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierMobileNo =
            e.target.value;
        }
        break;
      case "Witnessname":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessName =
          e.target.value;
        break;
      case "WitnessMobileNo":
        if (num.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessMobileNo =
            e.target.value;
        }
        break;
      case "AccidentRemarks":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentRemarks =
          e.target.value;
        break;
      case "ROPNo":
        if (alphnum.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPNo =
            e.target.value;
        }
        break;
      case "ROPOfficerName":
        if (aplhaspace.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPOfficerName =
            e.target.value;
        }
        break;
      case "VehicleplateNo":
        if (alphnum.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].VehiclePlateNo =
            e.target.value;
        }
        break;
      case "Make":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make =
          e.target.value;
        break;
      case "Model":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Model =
          e.target.value;
        break;
      case "DriverName":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverName =
          e.target.value;
        break;
      case "DriverAge":
        if (num.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge =
            e.target.value;
        }
        break;
      case "DrivingLicenseNo":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo =
          e.target.value;
        break;
      case "DriverMobileNo":
        if (num.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo =
            e.target.value;
        }
        break;
      case "MobileNo":
        if (num.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].MobileNo =
            e.target.value;
        }
        break;
      case "Locationdetails":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.otherAccidentLocation =
          e.target.value;
        break;
      case "otherWLoc":
        lmasters.TransaData.transactionDetails.WorkshopDetails[0].otherLocation = e.target.value;
        break;
      case "otherWorkShop":
        lmasters.TransaData.transactionDetails.WorkshopDetails[0].otherWorkShop = e.target.value;
        break;
      case "ContactNo":
        if (num.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.WorkshopDetails[0].ContactNo = e.target.value;
        }
        break;
      case "otherMake":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].otherMake =
          e.target.value;
        break;
      case "otherModel":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].otherModel =
          e.target.value;
        break;
      case "otherPropertyDesc":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].otherpropertyDescription =
          e.target.value;
        break;
      case "WilayatOther":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].OtherWilayat =
          e.target.value;
        break;
      case "Name":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Name =
          e.target.value;
        break;
      case "otherRelationwithparticipant":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].otherRelationwithparticipant =
          e.target.value;
        break;
      case "ResidentID":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].ResidentID =
          e.target.value;
        break;
      case "EmailId":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].EmailId =
          e.target.value;
        break;
      case "HospitalName":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].HospitalName =
          e.target.value;
        break;
      case "HospitalLocation":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].HospitalLocation =
          e.target.value;
        break;
      case "OtherTypeofAnimal":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].OtherTypeofAnimal =
          e.target.value;
        break;
      case "Count":
        if (num.test(e.target.value)) {
          lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Count =
            e.target.value;
        }
        break;
      default:
    }
    setMasters({ ...lmasters });
    setIntimationJson({ ...LIntimationJSon });
    console.log("LIntimationJson", LIntimationJSon);
  };

  const handleAutoComplete = async (e, name, value) => {
    let obj;
    let response;
    let workshops;
    let Model;
    lmasters.WorkShop = [];
    const val = value?.mValue ? value.mValue : "";
    switch (name) {
      case "producttype":
        LIntimationJSon.claimBasicDetails.PolicyDetails.productType = val;
        break;
      case "Isthereanywitness?":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isAnyWitness = val;

        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessName = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.WitnessMobileNo = "";
        break;
      case "IntimationMode":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode = val;
        break;
      case "NotifiedBy":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy = val;

        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierName = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.NotifierMobileNo = "";
        break;
      case "DLCategory":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory = val;
        break;
      case "Gender":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Gender = val;
        break;
      case "Nationality":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Nationality = val;
        break;
      case "gender":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Gender =
          val;
        break;
      case "AccidentLocation":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation = val;
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.otherAccidentLocation =
          "";
        break;
      case "ROPLocation":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPLocation = val;
        break;
      case "WLoc":
        lmasters.TransaData.transactionDetails.WorkshopDetails[0].Location = val;
        lmasters.TransaData.transactionDetails.WorkshopDetails[0].WorkShop = "";
        lmasters.TransaData.transactionDetails.WorkshopDetails[0].otherLocation = "";
        lmasters.TransaData.transactionDetails.WorkshopDetails[0].otherWorkShop = "";
        lmasters.TransaData.transactionDetails.WorkshopDetails[0].ContactNo = "";

        obj = { RefId: value.mID };
        response = await GetProdPartnermastersMasterData(1228, "WorkshopName", obj);
        workshops = Array.isArray(response.data) ? response.data : [];
        lmasters.WorkShop = workshops;

        break;
      case "WorkShop":
        lmasters.TransaData.transactionDetails.WorkshopDetails[0].WorkShop = val;
        break;
      case "VehicleType":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].vehicleType =
          val;
        break;
      case "Make":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Make = val;

        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Model = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].otherMake =
          "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].otherModel =
          "";
        obj = { VehicleMake: val };
        response = await GetProdPartnermastersMasterData(1228, "Model", obj);
        Model = Array.isArray(response.data) ? response.data : [];
        lmasters.Model = Model;
        break;
      case "Model":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Model = val;
        break;
      case "PropertyType":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].PropertyType =
          val;
        break;
      case "PropertyDesc":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].PropertyDescription =
          val;
        break;
      case "Wilayat":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Wilayat =
          val;
        break;
      case "claimhandler":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Claimshandler =
          val;
        break;
      case "Relationwithparticipant":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Relationwithparticipant =
          val;
        break;
      case "Typeofloss":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Typeofloss =
          val;
        break;
      case "TypeofAnimal":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].TypeofAnimal =
          val;
        break;
      case "InjuryType":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].InjuryType =
          val;
        break;
      default:
    }
    setMasters({ ...lmasters });
    setIntimationJson({ ...LIntimationJSon });
    console.log("LIntimationJson", LIntimationJSon);
  };
  const handleRadiogroupChange = (e, v, name) => {
    switch (name) {
      case "wasVehicleParked":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked = v;

        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverName = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Gender = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.Nationality = "";
        break;
      case "isROPReported":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported = v;

        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPNo = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPReportDate = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPOfficerName = "";
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPLocation = "";
        break;
      // case "ClaimIntimatedBy":
      //   LIntimationJSon.claimBasicDetails.PolicyDetails.ClaimIntimatedBy = v;
      //   break;
      case "needtowingservices":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].needtowingservices =
          v;
        break;
      case "isAmbulanceServiceAvailed":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isAmbulanceServiceAvailed =
          v;
        break;
      case "VehiclereplacementCoverage":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].VehiclereplacementCoverage =
          v;
        break;
      default:
    }
    setMasters({ ...lmasters });
  };

  const handleCheckBoxChange = (e, value, name) => {
    const isChecked = e.target.checked;
    const updatedSelectCheckbox = { ...selectCheckbox };

    switch (name) {
      case "isPolicyDetailsVerified":
        LIntimationJSon.claimBasicDetails.PolicyDetails.isPolicyDetailsVerified = isChecked;
        setIntimationJson({ ...LIntimationJSon });
        break;
      case "iscommunicationMbEm":
        LIntimationJSon.claimBasicDetails.PolicyDetails.iscommunicationMbEm = isChecked;
        setIntimationJson({ ...LIntimationJSon });
        break;
      case "causeofaccident":
        if (isChecked) {
          updatedSelectCheckbox[value] = value;
        } else {
          delete updatedSelectCheckbox[value];
        }
        setSelectCheckBox(updatedSelectCheckbox);
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.causeofAccident =
          Object.values(updatedSelectCheckbox).join(",");
        setMasters({ ...lmasters });
        break;
      default:
    }

    console.log("LIntimationJson", LIntimationJSon);
  };
  const handleDateTimeChange = (e, name, a) => {
    // let accidentDateTime = "";
    // let datePart = "";
    // let time12hr = "";
    // let hour = "";
    // let ampm = "";
    // let minute = "";
    // let period = "";
    // let hour12 = "";
    // let timePart = "";
    // let updatedIntimateJson = { ...lmasters };
    switch (name) {
      case "policystartdatetime":
        LIntimationJSon.claimBasicDetails.PolicyDetails.PolicyStartDate = a;
        break;
      case "policyenddatetime":
        LIntimationJSon.claimBasicDetails.PolicyDetails.PolicyEndDate = a;
        break;
      case "AccidentDate":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate = a;
        // accidentDateTime =
        //   lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate;

        // [datePart, timePart, ampm] = accidentDateTime.split(" ");

        // updatedIntimateJson = { ...lmasters }; // Creating a copy
        // updatedIntimateJson.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDatesplit =
        //   datePart;

        // // Convert 24-hour time format to 12-hour time format
        // [hour, minute] = timePart.split(":");
        // period = ampm.toUpperCase();
        // hour12 = hour % 12 || 12; // Convert 0 to 12

        // time12hr = `${hour12}:${minute} ${period}`;

        // // Avoid reassigning properties of function parameters

        // updatedIntimateJson.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.AccidentTime =
        //   time12hr;

        // // Use the updated variable instead
        // setMasters(updatedIntimateJson);
        break;

      default:
    }
    setMasters({ ...lmasters });
    setIntimationJson({ ...LIntimationJSon });
    console.log("LIntimationJson", LIntimationJSon);
  };
  // const handleTimeChange = (e, name) => {
  //   const timeString = e
  //     ? e.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" })
  //     : "";
  //   switch (name) {
  //     case "AccidentTime":
  //       LIntimationJSon.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.AccidentTime =
  //         timeString;
  //       setIntimationJson({ ...LIntimationJSon });
  //       break;
  //     default:
  //   }
  //   console.log(
  //     "AccidentTime",
  //     LIntimationJSon.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
  //       .AccidentTime
  //   );
  //   console.log("LIntimationJson", LIntimationJSon);
  // };
  const handleDateChange = (e, d, name) => {
    switch (name) {
      // case "AccidentDate":
      //   LIntimationJSon.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate =
      //     d;
      //   setIntimationJson({ ...LIntimationJSon });
      //   break;
      case "ROPReportDate":
        lmasters.TransaData.transactionDetails.ClaimsInfo.IntimationDetails.ROPReportDate = d;
        break;
      case "mulkiyaExpiryDate":
        lmasters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].mulkiyaExpiryDate =
          d;
        break;
      default:
    }
    setMasters({ ...lmasters });
    console.log("LIntimationJson", LIntimationJSon);
  };
  return (
    <div>
      <Grid container spacing={2} mb={1} p={2}>
        {AllAccordions.map((item) => {
          switch (item.type) {
            case "Input":
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <MDInput
                    label={item.label}
                    name={item.name}
                    value={item.value}
                    placeholder="Enter"
                    required={item.required}
                    onChangeFuncs={item.onChangeFuncs}
                    sx={item.sx}
                    readyonly={item.readyonly}
                    inputProps={{
                      readOnly: item.InputProps,
                      // ...item.InputProps,
                      maxLength: item.maxLength,
                    }}
                    // disabled={item?.InputProps?.readOnly}
                    error={item.error}
                    multiline={item.multiline}
                    disabled={item.disabled}
                    onChange={(e) => handleInput(e, item.name)}
                    onBlur={(e) => IsEmail(e, item.name)}
                    visiable={item.visiable}
                  />
                  {lmasters.EmailId &&
                  item.name === "emailId" &&
                  LIntimationJSon.claimBasicDetails.PolicyDetails.EmailId !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                      Invalid Email Id
                    </MDTypography>
                  ) : null}
                </Grid>
              );
            case "DateTimePicker":
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                  <MDDatePicker
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                    }}
                    input={{
                      label: item.label,
                      name: item.name,
                      value: item.value,
                      error: item.error,
                      required: item.required,
                      sx: item.sx,
                    }}
                    options={{
                      dateFormat: "Y-m-d h:i K",
                      enableTime: true,
                      altFormat: "d/m/Y h:i K",
                      minDate: item.minDate,
                      maxDate: item.maxDate,
                      altInput: true,
                    }}
                    placeholder="Enter"
                    readyonly={item.readyonly}
                    disabled={item.disabled}
                    onChange={(e, a) => handleDateTimeChange(e, item.name, a)}
                    visiable={item.visiable}
                    renderInput={(params) => <MDInput {...params} />}
                  />
                  {/* {(lmasters.Flags.error ||
                      lmasters.Flags.ParticipantVehicle ||
                      lmasters.Flags.TPVehicle ||
                      lmasters.Flags.TPProperty ||
                      lmasters.Flags.Injury ||
                      lmasters.Flags.Death ||
                      lmasters.Flags.Animal) &&
                    item.error ? (
                      <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                        Please select date ad time
                      </MDTypography>
                    ) : null} */}
                  {/* </LocalizationProvider> */}
                </Grid>
              );
            case "TimePicker":
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "5px!important",
                        },
                      }}
                      label={item.label}
                      name={item.name}
                      value={item.value}
                      required={item.required}
                      onChangeFuncs={item.onChangeFuncs}
                      //   sx={item.sx}
                      // readonly={item.readonly}
                      error={item.error}
                      disabled={item.disabled}
                      // visible={item.visible}
                      // onChange={(e) => handleTimeChange(e, item.name)}
                      renderInput={(params) => <MDInput {...params} />}
                    />
                  </LocalizationProvider>
                  {/* {(lmasters.Flags.error ||
                      lmasters.Flags.ParticipantVehicle ||
                      lmasters.Flags.TPVehicle ||
                      lmasters.Flags.TPProperty ||
                      lmasters.Flags.Injury ||
                      lmasters.Flags.Death ||
                      lmasters.Flags.Animal) &&
                    item.error ? (
                      <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                        Please select time
                      </MDTypography>
                    ) : null} */}
                </Grid>
              );
            case "DateTime":
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <MDDatePicker
                    value={item.value}
                    input={{
                      label: item.label,
                      required: item.required,
                      sx: item.sx,
                      name: item.name,
                      error: item.error,
                      value: item.value,
                    }}
                    options={{
                      altFormat: "d/m/Y",
                      dateFormat: "d-m-Y",
                      altInput: true,
                      minDate: item.minDate,
                      maxDate: item.maxDate,
                    }}
                    disabled={item.disabled}
                    onChange={(e, d) => handleDateChange(e, d, item.name)}
                    renderInput={(params) => <MDInput {...params} />}
                  />
                  {/* {(lmasters.Flags.error ||
                      lmasters.Flags.ParticipantVehicle ||
                      lmasters.Flags.TPVehicle ||
                      lmasters.Flags.TPProperty ||
                      lmasters.Flags.Injury ||
                      lmasters.Flags.Death ||
                      lmasters.Flags.Animal) &&
                    item.error ? (
                      <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                        Please select date
                      </MDTypography>
                    ) : null} */}
                </Grid>
              );
            case "AutoComplete":
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  {/* <Autocomplete
                      options={item.option}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                        width: item.width,
                      }}
                      // value={item.optionLabel ? { [item.optionLabel]: value } : { mValue: value }}
                      // value={ReviewClaim1 === true ? { mValue: item.value } : item.value}
                      value={{ [item.optionLabel ? item.optionLabel : "mValue"]: item.value }}
                      getOptionLabel={(option) => option.mValue}
                      onChange={(e, value) => handleAutoComplete(e, item.name, value, masters)}
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          label={item.label}
                          required={item.required}
                          placeholder="Select"
                        />
                      )}
                    /> */}
                  <MDAutocomplete
                    options={item.option}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                      width: item.width,
                      ...item.sx,
                    }}
                    // value={item.optionLabel ? { [item.optionLabel]: value } : { mValue: value }}
                    disableSelectionOnClick
                    optionLabel={item.optionLabel}
                    value={{ mValue: item.value }}
                    error={item.error}
                    // getOptionLabel={(option) => option.mValue}
                    readyonly={item.readyonly}
                    disabled={item.disabled}
                    inputProps={{ readOnly: item.InputProps, ...item.InputProps }}
                    onChange={(e, value) => handleAutoComplete(e, item.name, value)}
                    label={item.label}
                    required={item.required}
                    placeholder="Select"
                  />
                  {/* {(lmasters.Flags.error ||
                      lmasters.Flags.ParticipantVehicle ||
                      lmasters.Flags.TPVehicle ||
                      lmasters.Flags.TPProperty ||
                      lmasters.Flags.Injury ||
                      lmasters.Flags.Death ||
                      lmasters.Flags.Animal) &&
                    item.error ? (
                      <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                        Please select anyone
                      </MDTypography>
                    ) : null} */}
                </Grid>
              );
            case "Typography":
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  {/* <Grid item
                    xs={12}
                    sm={12}
                    md={item.spacing}
                    lg={item.spacing}
                    xl={item.spacing}
                    xxl={item.spacing}> */}
                  <MDTypography fontWeight="bold" sx={item.sx}>
                    {item.label}
                  </MDTypography>
                  {lmasters.Flags.error && item.error ? (
                    <MDTypography sx={{ color: "red", fontSize: "11px", mt: -1 }}>
                      Please select atleast one cause of accident
                    </MDTypography>
                  ) : null}
                </Grid>
              );
            case "RadioGroup":
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      display: "flex",
                      justifyContent: item.justifyContent ? item.justifyContent : "",
                    }}
                    alignItems="center"
                  >
                    <FormLabel
                      variant="body1"
                      sx={{
                        fontSize: item.radioLabel.fontSize ? item.radioLabel.fontSize : "1.25rem",
                        fontWeight: "bold",
                        color: item.radioLabel.color ? item.radioLabel.color : "#344767",
                      }}
                    >
                      {GetTranslate(item.radioLabel.label)}
                    </FormLabel>

                    <RadioGroup
                      row
                      value={item.path}
                      onChange={(e, v) => handleRadiogroupChange(e, v, item.name)}
                    >
                      <Stack direction="row" spacing={0.8}>
                        {item.radioList.map((r) => (
                          <FormControlLabel
                            value={r.value}
                            label={r.label}
                            error={item.error}
                            disabled={item.disabled}
                            control={<Radio disabled={r.disabled} />}
                          />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Stack>
                  {(lmasters.Flags.error ||
                    lmasters.Flags.ParticipantVehicle ||
                    lmasters.Flags.TPVehicle ||
                    lmasters.Flags.TPProperty ||
                    lmasters.Flags.Injury ||
                    lmasters.Flags.Death ||
                    lmasters.Flags.Animal) &&
                  item.error ? (
                    <MDTypography sx={{ color: "red", fontSize: "11px", mt: -1 }}>
                      Please select anyone to continue
                    </MDTypography>
                  ) : null}
                </Grid>
              );
            case "CheckBox":
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <FormControlLabel
                    label={
                      <MDTypography variant="body1" fontWeight="normal" fontSize="16px">
                        {item.label}
                      </MDTypography>
                    }
                    control={
                      <Checkbox
                        checked={
                          item.name === "causeofaccident"
                            ? Boolean(selectCheckbox[item.value])
                            : Boolean(item.path)
                        }
                        disabled={item.disabled}
                        onChange={(e) => handleCheckBoxChange(e, item.value, item.name)}
                      />
                    }
                  />
                  {lmasters.Flags.error && item.error && item.name !== "causeofaccident" ? (
                    <MDTypography sx={{ color: "red", fontSize: "11px", mt: -1 }}>
                      This field is required
                    </MDTypography>
                  ) : null}
                </Grid>
              );
            case "Custom":
              return item.return;
            default:
              return null;
          }
        })}
      </Grid>
    </div>
  );
}
function IntimationDetails({
  IntimateJson,
  setIntimationJson,
  handleCancel,
  handlemodelClose,
  handleIntimateClaim,
  handleAddtoGrid,
  ReviewClaimColumn,
  ReviewClaimRows,
  ExistClaimColumn,
  ExistClaimRows,
  masters,
  handleClear,
  hadleBacktoPolicyDetails,
  severity,
  respMessage,
  vertical,
  horizontal,
  open,
  data,
  handleClose,
  setMasters,
  setSelectCheckBox,
  selectCheckbox,
  loading,
  stepForward,
  Ishandleradio,
  policyresponse,
  // selectedClaimRow,
  ClaimNumber,
  // accordians,
  handleROPGenerate,
  handlePolicyExcess,
}) {
  return (
    <div>
      {stepForward === 2 ? (
        <>
          <Accordion
            color="primary"
            sx={{
              background: "primary",
              m: 2,
              boxShadow: "unset",
              border: "unset",
              "&:before": { display: "none" },
            }}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              color="primary"
              sx={{ background: "#E2F7FF" }}
            >
              <MDTypography variant="body1" fontWeight="bold">
                Policy Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <PolicyDetails
                AllAccordions={data[0].PolicyDetailsStep}
                IntimateJson={IntimateJson}
                setIntimationJson={setIntimationJson}
                masters={masters}
                // ReviewClaim1={ReviewClaim1}
                setMasters={setMasters}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            color="primary"
            sx={{
              background: "primary",
              m: 2,
              boxShadow: "unset",
              border: "unset",
              "&:before": { display: "none" },
            }}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              color="primary"
              sx={{ background: "#E2F7FF" }}
            >
              <MDTypography variant="body1" fontWeight="bold">
                Intimation Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <PolicyDetails
                AllAccordions={data[0].IntimationDetailsStep}
                IntimateJson={IntimateJson}
                selectCheckbox={selectCheckbox}
                setMasters={setMasters}
                masters={masters}
                setSelectCheckBox={setSelectCheckBox}
                setIntimationJson={setIntimationJson}
                policyresponse={policyresponse}
                // setPolicyresponse={setPolicyresponse}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            color="primary"
            sx={{
              background: "primary",
              m: 2,
              boxShadow: "unset",
              border: "unset",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              color="primary"
              sx={{ background: "#E2F7FF" }}
            >
              <MDTypography variant="body1" fontWeight="bold">
                Participant Vehicle Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} mb={1} p={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography fontWeight="bold">Is Participant vehicle damaged?</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RadioGroup
                    aria-label="vehicle-damage"
                    name="vehicle-damage"
                    value={
                      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                        .isInsured
                    }
                    onChange={(e) => Ishandleradio(e, "vehicle-damage")}
                    style={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="Yes"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              {masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .isInsured === "Yes" && (
                <MDBox sx={{ backgroundColor: "#F2F9FF" }}>
                  <PolicyDetails
                    AllAccordions={data[0].ParticipantVehicleDetailsStep}
                    IntimateJson={IntimateJson}
                    setIntimationJson={setIntimationJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                  <MDBox
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: 2,
                      justifyContent: "right",
                    }}
                  >
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="secondary"
                      sx={{
                        justifyContent: "flex-end",
                        whiteSpace: "nowrap",
                        mr: 2,
                      }}
                      onClick={() => handleClear("Clear")}
                    >
                      Clear
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="secondary"
                      disabled={
                        !ReviewClaimRows.every((x) => x.ClaimCategory !== "OD") ||
                        !ExistClaimRows.every((x) => x.ClaimCategory !== "OD")
                      }
                      onClick={() => handleAddtoGrid("OD")}
                    >
                      Add to Grid
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion
            color="primary"
            sx={{
              background: "primary",
              m: 2,
              boxShadow: "unset",
              border: "unset",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              color="primary"
              sx={{ background: "#E2F7FF" }}
            >
              <MDTypography variant="body1" fontWeight="bold">
                Third Party Vehicle Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} mb={1} p={2}>
                <Grid item xs={12} sm={12} md={4.3} lg={4.3} xl={4.3} xxl={4.3}>
                  <MDTypography fontWeight="bold">Any Third party Vehicle Damages?</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RadioGroup
                    aria-label="vehicle-damage"
                    name="TPvehicle-damage"
                    value={
                      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                        .isTPVehicleDamaged
                    }
                    onChange={(e) => Ishandleradio(e, "TPvehicle-damage")}
                    style={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="Yes"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              {masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .isTPVehicleDamaged === "Yes" && (
                <MDBox sx={{ backgroundColor: "#F2F9FF" }}>
                  <PolicyDetails
                    AllAccordions={data[0].ThirdPartyVehicleDetailsStep}
                    IntimateJson={IntimateJson}
                    setIntimationJson={setIntimationJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                  <MDBox
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: 2,
                      justifyContent: "right",
                    }}
                  >
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="secondary"
                      sx={{
                        justifyContent: "flex-end",
                        whiteSpace: "nowrap",
                        mr: 2,
                      }}
                      onClick={() => handleClear("Clear")}
                    >
                      Clear
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAddtoGrid("TP")}
                    >
                      Add to Grid
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion
            color="primary"
            sx={{
              background: "primary",
              m: 2,
              boxShadow: "unset",
              border: "unset",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              color="primary"
              sx={{ background: "#E2F7FF" }}
            >
              <MDTypography variant="body1" fontWeight="bold">
                TP Property Damage Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} mb={1} p={2}>
                <Grid item xs={12} sm={12} md={7.3} lg={7.3} xl={7.3} xxl={7.3}>
                  <MDTypography fontWeight="bold">
                    Is there any damage to Third party property in this accident?
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RadioGroup
                    aria-label="vehicle-damage"
                    name="TPProperty-damage"
                    value={
                      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                        .isTPPropertyDamaged
                    }
                    onChange={(e) => Ishandleradio(e, "TPProperty-damage")}
                    style={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="Yes"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              {masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .isTPPropertyDamaged === "Yes" && (
                <MDBox sx={{ backgroundColor: "#F2F9FF" }}>
                  <PolicyDetails
                    AllAccordions={data[0].TPPropertyDamageDetailsStep}
                    IntimateJson={IntimateJson}
                    setIntimationJson={setIntimationJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                  <MDBox
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: 2,
                      justifyContent: "right",
                    }}
                  >
                    <MDButton
                      variant="outlined"
                      display="flex"
                      sx={{
                        justifyContent: "flex-end",
                        whiteSpace: "nowrap",
                        mr: 2,
                      }}
                      onClick={() => handleClear("Clear")}
                    >
                      Clear
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="secondary"
                      sx={{
                        "&:disabled": {
                          backgroundColor: "#c4c4c0",
                        },
                      }}
                      onClick={() => handleAddtoGrid("PD")}
                    >
                      Add to Grid
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion
            color="primary"
            sx={{
              background: "primary",
              m: 2,
              boxShadow: "unset",
              border: "unset",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              color="primary"
              sx={{ background: "#E2F7FF" }}
            >
              <MDTypography variant="body1" fontWeight="bold">
                Injury Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} mb={1} p={2}>
                <Grid item xs={12} sm={12} md={4.4} lg={4.4} xl={4.4} xxl={4.4}>
                  <MDTypography fontWeight="bold">
                    Are there any Injuries to Self or TP?
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RadioGroup
                    aria-label="vehicle-damage"
                    name="isInjury_Self"
                    value={
                      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                        .isInjurySelfOrTP
                    }
                    onChange={(e) => Ishandleradio(e, "isInjury_Self")}
                    style={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="Yes"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              {masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .isInjurySelfOrTP === "Yes" && (
                <MDBox sx={{ backgroundColor: "#F2F9FF" }}>
                  <PolicyDetails
                    AllAccordions={data[0].InjuryDetailsStep}
                    IntimateJson={IntimateJson}
                    setIntimationJson={setIntimationJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                  <MDBox
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: 2,
                      justifyContent: "right",
                    }}
                  >
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="secondary"
                      sx={{
                        justifyContent: "flex-end",
                        whiteSpace: "nowrap",
                        mr: 2,
                      }}
                      onClick={() => handleClear("Clear")}
                    >
                      Clear
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="secondary"
                      sx={{
                        "&:disabled": {
                          backgroundColor: "#c4c4c0",
                        },
                      }}
                      onClick={() => handleAddtoGrid("BI")}
                    >
                      Add to Grid
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion
            color="primary"
            sx={{
              background: "primary",
              m: 2,
              boxShadow: "unset",
              border: "unset",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              color="primary"
              sx={{ background: "#E2F7FF" }}
            >
              <MDTypography variant="body1" fontWeight="bold">
                Deceased Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} mb={1} p={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography fontWeight="bold">Any One Deseased in Accident?</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RadioGroup
                    aria-label="vehicle-damage"
                    name="Desease"
                    value={
                      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                        .IsDeseasedAccident
                    }
                    onChange={(e) => Ishandleradio(e, "Desease")}
                    style={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="Yes"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              {masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .IsDeseasedAccident === "Yes" && (
                <MDBox sx={{ backgroundColor: "#F2F9FF" }}>
                  <PolicyDetails
                    AllAccordions={data[0].DeceasedDetailsStep}
                    IntimateJson={IntimateJson}
                    setIntimationJson={setIntimationJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                  <MDBox
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: 2,
                      justifyContent: "right",
                    }}
                  >
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="secondary"
                      sx={{
                        justifyContent: "flex-end",
                        whiteSpace: "nowrap",
                        mr: 2,
                      }}
                      onClick={() => handleClear("Clear")}
                    >
                      Clear
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="secondary"
                      sx={{
                        "&:disabled": {
                          backgroundColor: "#c4c4c0",
                        },
                      }}
                      onClick={() => handleAddtoGrid("DT")}
                    >
                      Add to Grid
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion
            color="primary"
            sx={{
              background: "primary",
              m: 2,
              boxShadow: "unset",
              border: "unset",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              color="primary"
              sx={{ background: "#E2F7FF" }}
            >
              <MDTypography variant="body1" fontWeight="bold">
                Other Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} mb={1} p={2}>
                <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                  <MDTypography fontWeight="bold">
                    Is there an Injury or Death to any Animal in this Accident?
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RadioGroup
                    aria-label="vehicle-damage"
                    name="animalDeath"
                    value={
                      masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                        .IsAnimalDeathOrInjury
                    }
                    onChange={(e) => Ishandleradio(e, "animalDeath")}
                    style={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="Yes"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      disabled={IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes"}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              {masters.TransaData.transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .IsAnimalDeathOrInjury === "Yes" && (
                <MDBox sx={{ backgroundColor: "#F2F9FF" }}>
                  <PolicyDetails
                    AllAccordions={data[0].OtherDetailsStep}
                    IntimateJson={IntimateJson}
                    setIntimationJson={setIntimationJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                  <MDBox
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      p: 2,
                      justifyContent: "right",
                    }}
                  >
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="secondary"
                      sx={{
                        justifyContent: "flex-end",
                        whiteSpace: "nowrap",
                        mr: 2,
                      }}
                      onClick={() => handleClear("Clear")}
                    >
                      Clear
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="secondary"
                      sx={{
                        "&:disabled": {
                          backgroundColor: "#c4c4c0",
                        },
                      }}
                      onClick={() => handleAddtoGrid("AN")}
                    >
                      Add to Grid
                    </MDButton>
                  </MDBox>
                </MDBox>
              )}
            </AccordionDetails>
          </Accordion>
          {ExistClaimRows.length !== 0 && (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="body1" fontWeight="bold">
                  Existing Claims
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <DataGrid
                  autoHeight
                  rows={ExistClaimRows}
                  columns={ExistClaimColumn}
                  pageSize={10}
                  getRowId={(row) => row.ReferenceNo}
                />
              </Grid>
            </Grid>
          )}

          {ClaimNumber === null && (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="body1" fontWeight="bold">
                  Review Claim Summary
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <DataGrid
                  autoHeight
                  rows={ReviewClaimRows}
                  columns={ReviewClaimColumn}
                  pageSize={10}
                  getRowId={(row) => row.ReferenceNo}
                />
              </Grid>
            </Grid>
          )}
          {/* {IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "No" && (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} mb={10}>
                <MDTypography />
              </Grid>
            </Grid>
          )} */}
          {IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" && (
            // <>

            // added accordion too the policy excess as vikram sir said
            <Accordion
              color="primary"
              sx={{
                background: "primary",
                m: 2,
                boxShadow: "unset",
                border: "unset",
                "&:before": { display: "none" },
              }}
              defaultExpanded
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                color="primary"
                sx={{ background: "#E2F7FF" }}
              >
                <MDTypography variant="body1" fontWeight="bold">
                  Policy Excess
                </MDTypography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={3}>
                    <MDTypography />
                  </Grid>
                </Grid>

                <MDBox
                  sx={{
                    // backgroundColor: "#F4FFD8",
                    backgroundColor: "#F2F9FF",
                    m: 2,
                  }}
                >
                  <Grid container spacing={2} p={2}>
                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="body1" fontWeight="bold">
                        Policy Excess
                      </MDTypography>
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Excess Amount"
                        name="ExcessAmount"
                        placeholder="Enter"
                        onChange={(e) => handlePolicyExcess(e, "ExcessAmount")}
                      />
                      {/* {flags.uhidReg === true ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Enter Correct UHID no.
                </MDTypography>
              ) : null} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Mobile Number"
                        name="MobileNo"
                        placeholder="Enter"
                        onChange={(e) => handlePolicyExcess(e, "MobileNo")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Name of the Individual"
                        name="IndividualName"
                        placeholder="Enter"
                        onChange={(e) => handlePolicyExcess(e, "IndividualName")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Resident ID"
                        name="ResidentID"
                        placeholder="Enter"
                        onChange={(e) => handlePolicyExcess(e, "ResidentID")}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Invoice Number"
                        name="InvoiceNo"
                        placeholder="Enter"
                        onChange={(e) => handlePolicyExcess(e, "InvoiceNo")}
                      />
                    </Grid> */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
                      <MDButton
                        variant="contained"
                        color="secondary"
                        sx={{
                          mr: 2,
                          "&:disabled": {
                            backgroundColor: "#c4c4c0",
                          },
                        }}
                        // onClick={() => handleClaim()}
                      >
                        Send Payment Link
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
                {/* <Grid container spacing={2} p={2}>
                <Grid item xs={12} mb={10}>
                  <MDTypography />
                </Grid>
              </Grid> */}
              </AccordionDetails>
            </Accordion>
            // </>
          )}
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {policyresponse.length !== 0 && (
              <MDButton
                variant="outlined"
                display="flex"
                color="secondary"
                onClick={hadleBacktoPolicyDetails}
                sx={{
                  ml: 2,
                  mb: 2,
                }}
              >
                Back
              </MDButton>
            )}
            <MDBox sx={{ flex: "1 1 auto" }} />
            {IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "Yes" &&
              IntimateJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
                .isROPReported === "Yes" && (
                <MDButton
                  variant="contained"
                  color="secondary"
                  sx={{
                    mr: 2,
                    mb: 2,
                    "&:disabled": {
                      backgroundColor: "#c4c4c0",
                    },
                  }}
                  onClick={() => handleROPGenerate()}
                >
                  Generate ROP Acknowledgement
                </MDButton>
              )}
            {IntimateJson.claimBasicDetails.PolicyDetails.isIntimated === "No" && (
              <MDButton
                variant="contained"
                color="secondary"
                sx={{
                  mr: 2,
                  mb: 2,
                  "&:disabled": {
                    backgroundColor: "#c4c4c0",
                  },
                }}
                // disabled={ReviewClaimRows.length === 0}
                onClick={() => handleIntimateClaim()}
              >
                Intimate Claim
              </MDButton>
            )}
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              key={vertical + horizontal}
              autoHideDuration={3000}
            >
              <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: "100%" }}
                variant="filled"
              >
                {respMessage}
              </Alert>
            </Snackbar>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress />
            </Backdrop>
          </MDBox>
          <Grid container spacing={2} mt={2}>
            <Modal
              open={masters.open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              align="center"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MDBox
                align-item="center"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "900px",
                  // height: "380px",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 1,
                }}
              >
                <IconButton
                  aria-label="Close"
                  onClick={() => handleCancel()}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 1,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                {masters.Accordion === "OD" && (
                  <PolicyDetails
                    AllAccordions={data[0].ParticipantVehicleDetailsStep}
                    setIntimationJson={setIntimationJson}
                    IntimateJson={IntimateJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                )}
                {masters.Accordion === "TP" && (
                  <PolicyDetails
                    AllAccordions={data[0].ThirdPartyVehicleDetailsStep}
                    setIntimationJson={setIntimationJson}
                    IntimateJson={IntimateJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                )}
                {masters.Accordion === "PD" && (
                  <PolicyDetails
                    AllAccordions={data[0].TPPropertyDamageDetailsStep}
                    setIntimationJson={setIntimationJson}
                    IntimateJson={IntimateJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                )}
                {masters.Accordion === "BI" && (
                  <PolicyDetails
                    AllAccordions={data[0].InjuryDetailsStep}
                    setIntimationJson={setIntimationJson}
                    IntimateJson={IntimateJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                )}
                {masters.Accordion === "DT" && (
                  <PolicyDetails
                    AllAccordions={data[0].DeceasedDetailsStep}
                    setIntimationJson={setIntimationJson}
                    IntimateJson={IntimateJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                )}
                {masters.Accordion === "AN" && (
                  <PolicyDetails
                    AllAccordions={data[0].OtherDetailsStep}
                    setIntimationJson={setIntimationJson}
                    IntimateJson={IntimateJson}
                    masters={masters}
                    setMasters={setMasters}
                  />
                )}
                {masters.viewmodel === false && (
                  <MDBox
                    sx={{ display: "flex", flexDirection: "row", pt: 2, justifyContent: "right" }}
                  >
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="secondary"
                      sx={{
                        justifyContent: "flex-end",
                        whiteSpace: "nowrap",
                        mr: 2,
                      }}
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color="secondary"
                      onClick={() => handlemodelClose(masters.Accordion)}
                    >
                      Save
                    </MDButton>
                  </MDBox>
                )}
              </MDBox>
            </Modal>
          </Grid>
        </>
      ) : null}
    </div>
  );
}
export default IntimationDetails;
