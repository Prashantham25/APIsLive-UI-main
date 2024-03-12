import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  CircularProgress,
  Backdrop,
  // Autocomplete,
} from "@mui/material";
import { isValid } from "date-fns";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { grey } from "@mui/material/colors";
import Autocomplete from "@mui/material/Autocomplete";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import swal from "sweetalert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import { useLocation } from "react-router-dom";
import PropertyDetailsDataBind from "modules/PolicyLive/views/Home/data/PropertyDetailsDataBind";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDDatePicker from "../../../../../components/MDDatePicker";
import {
  fetchProfile,
  fetchuser,
  getCKYCDetails,
  GetCkycUpdateStatus,
  BGRCkycRegMail,
} from "./data/index";
import MDButton from "../../../../../components/MDButton";
// import { getRequest } from "../../../../../core/clients/axiosclient";
function CkycParameterPan({
  // LPolicyDto,
  datePlaceHolder,
  CKYCStatus,
  handleSetCKYC,
  master,
  validDate,
  PolicyDto,
  handlevalidChange,
  flags,
}) {
  return (
    <Stack direction="row" spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="PAN Number"
          name="idNo"
          // inputProps={{ maxLength: 10 }}
          inputProps={{
            maxLength: 10,
            disabled:
              PolicyDto.CkycStatus === "success" ||
              // CKYCStatus === "success" ||
              PolicyDto.CkycStatus === "failure",
          }}
          // value={IdType.PanId}
          value={master.PAN}
          required
          // sx={redAsterisk}
          onChange={(e) => handleSetCKYC(e, "idNo")}
          // disabled={kycSecDisable}
          onBlur={handlevalidChange}
          // disabled={master.ckycstatus}
          disabled={
            PolicyDto.CkycStatus === "success" ||
            // CKYCStatus === "success" ||
            PolicyDto.CkycStatus === "failure"
          }
        />
        {flags.panflag === true && master.PAN !== "" ? (
          <MDTypography
            sx={{
              color: "red",
              fontSize: "10px",
            }}
          >
            Enter Valid PAN Number
          </MDTypography>
        ) : null}
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
        <MDDatePicker
          options={{
            altFormat: "d-m-Y",
            dateFormat: "d-m-Y",
            altInput: true,
            allowInput: true,
            noClender: PolicyDto.CkycStatus === "success" || PolicyDto.CkycStatus === "failure",
          }}
          input={{
            required: true,
            label: "Date of Birth",

            value: master.DOB,
            allowInput: PolicyDto.CkycStatus !== "failure" || PolicyDto.CkycStatus !== "success",
            placeholder: datePlaceHolder("d-m-Y"),
            InputLabelProps: { shrink: true },
            InputProps: {
              disabled:
                PolicyDto.CkycStatus === "success" ||
                CKYCStatus === "success" ||
                PolicyDto.CkycStatus === "failure",
            },
          }}
          name="dateOfBirth"
          value={master.DOB}
          onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
          disabled={
            PolicyDto.CkycStatus === "success" ||
            CKYCStatus === "success" ||
            PolicyDto.CkycStatus === "failure"
          }
          disablePast={
            PolicyDto.CkycStatus === "success" ||
            CKYCStatus === "success" ||
            PolicyDto.CkycStatus === "failure"
          }
        />
        {validDate && master.DOB !== null ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            Please fill the valid date
          </MDTypography>
        ) : null}
      </Grid>
    </Stack>
  );
}
function CkycParameterAadhar({
  genderData,
  handleSetAutoComplete,
  LPolicyDto,
  PolicyDto,
  handlevalidChange,
  // handleMobilesChange,
  validDate,
  master,
  CKYCStatus,
  datePlaceHolder,
  handleSetCKYC,
  flags,
}) {
  return (
    <Stack direction="row" spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="Enter last 4 digits of Aadhar"
          name="AadharID"
          id="AadharID"
          value={LPolicyDto.ProposerDetails.AadharID}
          required
          inputProps={{
            maxLength: 4,
            disabled: LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure",
          }}
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          // onBlur={handlevalidChange}
          onChange={(e) => handleSetCKYC(e, "AadharID")}
          disabled={LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date of Birth"
            inputFormat="dd-MM-yyyy"
            type="login"
            id="Date of Birth"
            maxDate={new Date()}
            // value={kycDate}
            value={master.DOB}
            // value={PolicyDto.ProposerDetails["Date of Birth"]}
            onChange={(date) => handleSetCKYC(date, "dateOfBirth")}
            inputProps={{
              disabled: master.ckycstatus1 === "failure" || master.ckycstatus1 === "success",
            }}
            renderInput={(params) => (
              <MDInput
                {...params}
                sx={{
                  width: "100%",
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                required
                // error={validDate || datetoShow.dateOfBirth === "" ? flag : null}
                // disabled={kycSecDisable}
                // disabled={master.ckycstatus}
                disabled={master.ckycstatus1 === "failure" || master.ckycstatus1 === "success"}
              />
            )}
          /> */}
        {/* {flag && master.DOB === null ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
        {/* {validDate && master.DOB !== null ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill the valid date
            </MDTypography>
          ) : null}
        </LocalizationProvider> */}
        <MDDatePicker
          options={{
            altFormat: "d-m-Y",
            dateFormat: "d-m-Y",
            altInput: true,
            allowInput: true,
            noClender: PolicyDto.CkycStatus === "success" || PolicyDto.CkycStatus === "failure",
          }}
          input={{
            required: true,
            label: "Date of Birth",

            value: master.DOB,
            allowInput: PolicyDto.CkycStatus !== "failure" || PolicyDto.CkycStatus !== "success",
            placeholder: datePlaceHolder("d-m-Y"),
            InputLabelProps: { shrink: true },
            InputProps: {
              disabled:
                PolicyDto.CkycStatus === "success" ||
                // CKYCStatus === "success" ||
                PolicyDto.CkycStatus === "failure",
            },
          }}
          name="dateOfBirth"
          value={master.DOB}
          onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
          disabled={
            PolicyDto.CkycStatus === "success" ||
            CKYCStatus === "success" ||
            PolicyDto.CkycStatus === "failure"
          }
        />
        {validDate && master.DOB !== null ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            Please fill the valid date
          </MDTypography>
        ) : null}
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="Mobile No. as per Aadhar"
          name="AadharMobileNo"
          id="AadharMobileNo"
          value={LPolicyDto.ProposerDetails.AadharMobileNo}
          required
          inputProps={{
            maxLength: 10,
            disabled: LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure",
          }}
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          onBlur={handlevalidChange}
          onChange={(e) => handleSetCKYC(e, "AadharMobileNo")}
          // onBlur={handleMobilesChange}
          disabled={LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure"}
        />
        {flags.AadharMobileNo === true && LPolicyDto.ProposerDetails.AadharMobileNo !== "" ? (
          <MDTypography
            sx={{
              color: "red",
              fontSize: "10px",
            }}
          >
            Enter Valid Mobile Number
          </MDTypography>
        ) : null}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="Full Name as per Aadhar"
          name="AadharName"
          id="AadharName"
          value={LPolicyDto.ProposerDetails.AadharName}
          required
          inputProps={{
            maxLength: 50,
            disabled: LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure",
          }}
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          // onBlur={handlevalidChange}
          onChange={(e) => handleSetCKYC(e, "AadharName")}
          disabled={LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure"}
        />
      </Grid>
      <Autocomplete
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "4px!important",
          },
        }}
        value={{ mValue: LPolicyDto.ProposerDetails.AadharGender }}
        disableClearable
        id="AadharGender"
        name="AadharGender"
        options={genderData}
        onChange={handleSetAutoComplete}
        getOptionLabel={(option) => option.mValue}
        renderInput={(params) => (
          <MDInput
            {...params}
            inputProps={{
              ...params.inputProps,
              readOnly: true,
              disabled: LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure",
            }}
            label="Gender"
            required
            sx={{
              "& .MuiFormLabel-asterisk": {
                color: "red",
              },
            }}
            disabled={LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure"}
          />
        )}
      />
    </Stack>
  );
}

function ProposerDetails({
  PolicyDto,
  setPolicyDto,
  // handleSetValue,
  // salutationData,
  // commonObj,
  // handleSetPincode,
  // permAddress,
  // handleSetPermPinCode,
  flag,
  setFlag1,
  setMaster,
  master,
  loadingflag,
  CkycEmailFlag,
  setCkycEmailFlag,
  CKYCData,
  setCKYCData,
  CkycUpdateJson,
  setCkycUpdateJson,
}) {
  const masterArray = master;
  console.log("12345", master);
  const [AgentCode, setAgentCode] = useState("");
  const [LPolicyDto, setLPolicyDto] = useState(PolicyDto);
  // const [CKYCData, setCKYCData] = useState();
  const [CKYCStatus, setCKYCStatus] = useState("");
  // const [kycSecDisable, setKYCSecDisable] = useState(false);
  // const [CkycEmailFlag, setCkycEmailFlag] = useState(false);
  const [pinflag, setpinflag] = useState(true);
  console.log(pinflag);
  const [kycDate, setKycDate] = useState(null);
  const [dispmarkup, setdispmarkup] = useState();
  const [dispSI, setdispSI] = useState();
  const [validDate, setValidDate] = useState(false);
  const { search } = useLocation();
  const [loadingflag1, setloadingflag1] = useState(false);
  const [datetoShow, setDate] = useState({
    dateOfBirth: null,
    nomineeDOB: null,
  });
  console.log("datetoShow", datetoShow);
  const datePlaceHolder = (format) => {
    const finalFormat = [];
    const deliMeter = format[1];
    const spiltFormat = format.split(deliMeter);
    spiltFormat.forEach((x) => {
      if (x === "d") finalFormat.push("DD");
      if (x === "m") finalFormat.push("MM");
      if (x === "Y") finalFormat.push("YYYY");
    });
    return finalFormat.join(deliMeter);
  };
  const [flags, setFlags] = useState({
    panflag: false,
    gstflag: false,
    AadharMobileNo: false,
  });
  const themes = createTheme({
    status: {
      danger: "#c70825",
      outline: grey[500],
    },
  });

  const CustomRadio = styled(Radio)(({ theme }) => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));
  const CkycParams = [
    { mID: 1, mValue: "PAN Number" },
    { mID: 2, mValue: "Aadhaar Number" },
  ];

  const [CKYCReqJSon, setCKYCReqJson] = useState({
    source: "AVO",
    customerType: "I",
    uniqueTransactionNumber: "AVO/261122/009",
    idNo: "",
    idType: "PAN",
    dob: "",
    mobileNo: "",
    pincode: "",
    cKYCNo: "",
    extraField1: "",
    extraField2: "",
    extraField3: "",
    extraField4: "",
    extraField5: "",
  });

  const [CKYCUpdateData, setCKYCUpdateData] = useState();
  const [IdType, setIdType] = useState({
    PanId: "",
    GSTINId: "",
    CINId: "",
  });
  const [disp, setdisp] = useState({
    "Sum Insured in Currency of Invoice": "",
    "Sum Insured in INR ": "",
    "Sum Insured in INR for Duty ": "",
  });

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}/${format(dt.getMonth() + 1)}/${dt.getFullYear()}`;
  };
  const handleSetValueParms = (e, value) => {
    if (master.ckycstatus1 !== "success" && master.ckycstatus1 !== "failure") {
      LPolicyDto.ProposerDetails.CKYCParam = value.mValue;
      setLPolicyDto({ ...LPolicyDto });
      if (value.mValue === "Aadhaar Number") {
        LPolicyDto.ProposerDetails.AadharID = "";
        LPolicyDto.ProposerDetails.AadharMobileNo = "";
        LPolicyDto.ProposerDetails.AadharGender = "";
        LPolicyDto.ProposerDetails.AadharName = "";
        masterArray.DOB = null;
      } else {
        masterArray.DOB = null;
        masterArray.PAN = "";
      }
      setLPolicyDto({ ...LPolicyDto });
    }
    // if (value.mValue === "PAN Number") {
    //   SetPanCkycFlag(true);
    //   SetAaadharCkycFlag(false);
    // } else if (value.mValue === "Aaadhar Number") {
    //   SetAaadharCkycFlag(true);
    //   SetPanCkycFlag(false);
    // }
  };

  // const formatDate1 = (date) => {
  //   const input = date;
  //   const [day, month, year] = input.split("-");
  //   return `${month}-${day}-${year}`;
  // };

  // const handleCKYCVerification = async () => {
  //   setloadingflag1(true);
  //   await getCKYCDetails(782, CKYCReqJSon).then((results) => {
  //     const data = results;
  //     setCKYCData(data);
  //     console.log("CKYCData", data, CKYCData, results);
  //     setCKYCStatus(data.status);
  //     let { CkycDetails } = LPolicyDto;
  //     CkycDetails = data;
  //     LPolicyDto.CkycDetails = data;
  //     setPolicyDto((prevState) => ({
  //       ...prevState,
  //       ...LPolicyDto,
  //     }));
  //     if (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate") {
  //       CkycDetails.result.dob = CKYCReqJSon.dob;
  //     }
  //     // setPolicyDto((prevState) => ({ ...prevState, CkycDetails }));
  //     console.log("CKYCData", LPolicyDto, CkycDetails);
  //     masterArray.ckycstatus1 = data.status;
  //     setMaster((prevState) => ({ ...prevState, ...masterArray }));
  //     setFlag1(data.status);
  //     console.log("CKYCresponse", data);
  //     console.log("CKYC Status", CKYCStatus, data.status);
  //     console.log("CKYCreqJSON", setCKYCReqJson);
  //     if (data.status === "success") {
  //       // setKYCSecDisable(true);
  //       setCkycEmailFlag(false);
  //       masterArray.ckycstatus = true;
  //       setMaster((prevState) => ({ ...prevState, ...masterArray }));
  //       LPolicyDto.ProposerDetails["First Name"] = data.result.firstName;
  //       LPolicyDto.ProposerDetails["Last Name"] = data.result.lastName;
  //       LPolicyDto.ProposerDetails["Date of Birth"] = formatDate(kycDate);
  //       if (data.result.mobileNumber === null) {
  //         LPolicyDto.ProposerDetails.MobileNo = PolicyDto.ProposerDetails.MobileNo;
  //       } else {
  //         LPolicyDto.ProposerDetails.MobileNo = data.result.mobileNumber;
  //       }
  //       // LPolicyDto.ProposerDetails["Mobile Number"] = data.result.mobileNumber;
  //       LPolicyDto.ProposerDetails["Address 1"] = data.result.address1;
  //       LPolicyDto.ProposerDetails["Address 2"] = data.result.address2;
  //       LPolicyDto.ProposerDetails.PAN = data.result.pan;
  //       if (data.result.pincode === "") {
  //         setpinflag(false);
  //         masterArray.pinflag = false;
  //         setMaster((prevState) => ({ ...prevState, ...masterArray }));
  //       } else {
  //         LPolicyDto.ProposerDetails.PinCode = data.result.pincode;
  //         masterArray.pinflag = true;
  //         setMaster((prevState) => ({ ...prevState, ...masterArray }));
  //       }
  //       setDate((prev) => ({ ...prev, dateOfBirth: kycDate }));
  //       setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
  //     }
  //     if (data.status === "failure") {
  //       setCkycEmailFlag(true);
  //       // setKYCSecDisable(true);
  //       setCkycUpdateJson((prevState) => ({
  //         ...prevState,
  //         uniqueTransactionNumber: data.uniqueTransactionNumber,
  //       }));
  //     }
  //     setCKYCData((prevState) => ({ ...prevState, CKYCData: data }));
  //     LPolicyDto.CkycStatus = data.status;
  //     setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
  //     setPolicyDto((prevState) => ({
  //       ...prevState,
  //       ...LPolicyDto,
  //     }));
  //   });
  //   setloadingflag1(false);
  // };

  const handleCKYCVerification = async () => {
    // debugger;
    if (PolicyDto.ProposerDetails["Customer Type"] === "") {
      swal({
        icon: "error",
        text: "Please select the Customer Type",
      });
    } else if (
      PolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
      PolicyDto.ProposerDetails.CkycParams === "PAN Number" &&
      PolicyDto.ProposerDetails.PAN === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill PAN number",
      });
    } else if (
      (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
        PolicyDto.ProposerDetails.PAN !== "" &&
        flags.panflag === true) ||
      (PolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        PolicyDto.ProposerDetails.CkycParams === "PAN Number" &&
        PolicyDto.ProposerDetails.PAN !== "" &&
        flags.panflag === true)
    ) {
      swal({
        icon: "error",
        text: "Please fill valid PAN number",
      });
    } else if (
      PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
      PolicyDto.ProposerDetails.PAN === "" &&
      PolicyDto.ProposerDetails.GSTIN === "" &&
      PolicyDto.ProposerDetails.CIN === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill any one Field",
      });
    } else if (
      PolicyDto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
      PolicyDto.ProposerDetails["Customer Type"] !== "Corporate" &&
      (PolicyDto.ProposerDetails.AadharID === "" ||
        PolicyDto.ProposerDetails.AadharMobileNo === "" ||
        PolicyDto.ProposerDetails.AadharGender === "" ||
        PolicyDto.ProposerDetails.AadharName === "" ||
        CKYCReqJSon.dob === "")
    ) {
      swal({
        icon: "error",
        text: "Please Fill the Ckyc Details",
      });
    } else if (
      PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
      PolicyDto.ProposerDetails.GSTIN !== "" &&
      flags.gstflag === true
    ) {
      swal({
        icon: "error",
        text: "Enter Valid GST Number",
      });
    } else if (
      PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
      PolicyDto.ProposerDetails.CIN !== "" &&
      PolicyDto.ProposerDetails.CIN.length !== 21
    ) {
      swal({
        icon: "error",
        text: "Enter Valid CIN Number",
      });
    } else if (
      PolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
      CKYCReqJSon.dob === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill the Date of Birth",
      });
    } else if (
      PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
      CKYCReqJSon.dob === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill the Date of Incorporation",
      });
    } else {
      const objAadhar = {
        source: "AVO",
        customerType: LPolicyDto.ProposerDetails["Customer Type"] === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo: LPolicyDto.ProposerDetails.AadharID,
        idType: "AADHAAR",
        dob: CKYCReqJSon.dob,
        mobileNo: LPolicyDto.ProposerDetails.AadharMobileNo,
        pincode: "",
        ckycNo: "",
        extraField1: LPolicyDto.ProposerDetails.AadharName,
        extraField2: LPolicyDto.ProposerDetails.AadharGender === "Female" ? "F" : "M",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      const Obj =
        LPolicyDto.ProposerDetails.CKYCParam === "Aadhaar Number" ? objAadhar : CKYCReqJSon;
      setloadingflag1(true);
      await getCKYCDetails(782, Obj).then((results) => {
        const data = results;
        setCKYCData(data);
        console.log("CKYCData", data, CKYCData, results);
        setCKYCStatus(data.status);
        let { CkycDetails } = LPolicyDto;
        CkycDetails = data;
        LPolicyDto.CkycDetails = data;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        if (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate") {
          CkycDetails.result.dob = CKYCReqJSon.dob;
        }
        // setPolicyDto((prevState) => ({ ...prevState, CkycDetails }));
        console.log("CKYCData", LPolicyDto, CkycDetails);
        masterArray.ckycstatus1 = data.status;
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        setFlag1(data.status);

        console.log("CKYCresponse", data);
        console.log("CKYC Status", CKYCStatus, data.status);
        console.log("CKYCreqJSON", setCKYCReqJson);
        if (data.status === "success") {
          // setKYCSecDisable(true);
          setCkycEmailFlag(false);
          masterArray.ckycstatus = true;
          setMaster((prevState) => ({ ...prevState, ...masterArray }));
          LPolicyDto.ProposerDetails["First Name"] = data.result.firstName;
          if (data.result.lastName === "") {
            LPolicyDto.ProposerDetails["Last Name"] = ".";
          } else {
            LPolicyDto.ProposerDetails["Last Name"] = data.result.lastName;
          }
          LPolicyDto.ProposerDetails["Date of Birth"] = formatDate(kycDate);
          if (data.result.mobileNumber === null) {
            LPolicyDto.ProposerDetails.MobileNo = PolicyDto.ProposerDetails.MobileNo;
          } else {
            LPolicyDto.ProposerDetails.MobileNo = data.result.mobileNumber;
          }
          // LPolicyDto.ProposerDetails["Mobile Number"] = data.result.mobileNumber;
          LPolicyDto.ProposerDetails["Address 1"] = data.result.address1;
          LPolicyDto.ProposerDetails["Address 2"] = data.result.address2;
          LPolicyDto.ProposerDetails.PAN = data.result.pan;
          // LPolicyDto.ProposerDetails["Nearest Landmark"] = "";
          if (data.result.pincode === "") {
            setpinflag(false);
            masterArray.pinflag = false;
            setMaster((prevState) => ({ ...prevState, ...masterArray }));
          } else {
            LPolicyDto.ProposerDetails.PinCode = data.result.pincode;
            masterArray.pinflag = true;
            setMaster((prevState) => ({ ...prevState, ...masterArray }));
          }
          setDate((prev) => ({ ...prev, dateOfBirth: kycDate }));
          setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
        }
        if (data.status === "failure") {
          setCkycEmailFlag(true);
          // setKYCSecDisable(true);
          setCkycUpdateJson((prevState) => ({
            ...prevState,
            uniqueTransactionNumber: data.uniqueTransactionNumber,
          }));
        }
        setCKYCData((prevState) => ({ ...prevState, CKYCData: data }));
        LPolicyDto.CkycStatus = data.status;
        setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      });
      setloadingflag1(false);
    }
  };

  const formatDateKYC = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const handlevalidChange = (e) => {
    const PanRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!PanRegex.test(e.target.value)) {
      setFlags((prevState) => ({ ...prevState, panflag: true }));
      console.log("incorrect pan");
    } else {
      setFlags((prevState) => ({ ...prevState, panflag: false }));
      console.log("correct pan");
    }

    if (e.target.name === "AadharMobileNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, AadharMobileNo: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, AadharMobileNo: false }));
      }
    }
  };

  const handleSetCKYC = (e, name) => {
    // debugger;
    if (name === "idNo") {
      CKYCReqJSon.idNo = e.target.value;
      IdType.PanId = e.target.value;
      masterArray.PAN = e.target.value;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      LPolicyDto.ProposerDetails.PAN = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      // IdType.GSTINFlag = false;
      // IdType.CINFlag = false;
    } else if (name === "dateOfBirth") {
      const date = new Date(e).getFullYear();
      const dateString = date.toString().length;
      if (e !== null && isValid(new Date(e)) && dateString === 4) {
        setDate((prevState) => ({ ...prevState, [name]: null }));

        setValidDate(false);
      } else {
        setValidDate(true);
      }
      console.log("eeeeee", e);
      setKycDate(e);
      masterArray.DOB = e;
      LPolicyDto.ProposerDetails["Date of Birth"] = e;
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setMaster((prevState) => ({ ...prevState, ...masterArray }));

      CKYCReqJSon.dob = formatDateKYC(e);
    } else if (name === "GSTIN") {
      const reg = /^[a-zA-Z0-9]+$/;
      if (e.target.value === "" || reg.test(e.target.value)) {
        masterArray.GST = e.target.value;
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        CKYCReqJSon.idNo = e.target.value;
        CKYCReqJSon.idType = name;
        IdType.GSTINId = e.target.value;
        LPolicyDto.ProposerDetails.GSTIN = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
      // IdType.PanIdFlag = false;
      // IdType.CINFlag = false;
    } else if (name === "CIN") {
      // masterArray.CIN = e.target.value;
      // setMaster((prevState) => ({ ...prevState, ...masterArray }));
      // CKYCReqJSon.idNo = e.target.value;
      // CKYCReqJSon.idType = name;
      // IdType.CINId = e.target.value;
      // IdType.PanIdFlag = false;
      // IdType.GSTINFlag = false;
      const gstRegex = /[!@#$%^&*()_+{}:;<>,.?~]/;
      if (e.target.value.length <= 21 && !gstRegex.test(e.target.value)) {
        masterArray.CIN = e.target.value;
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        CKYCReqJSon.idNo = e.target.value;
        CKYCReqJSon.idType = name;
        IdType.CINId = e.target.value;
        LPolicyDto.ProposerDetails.CIN = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (name === "AadharID") {
      const gstRegex = /^[0-9]*$/;
      if (e.target.value.length <= 4 && gstRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.AadharID = e.target.value;
      }
    } else if (name === "AadharMobileNo") {
      const gstRegex = /^[0-9]*$/;
      if (e.target.value.length <= 10 && gstRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.AadharMobileNo = e.target.value;
      }
    } else if (name === "AadharGender") {
      const gstRegex = /[!@#$%^&*()_+{}:;<>,.?~]/;
      if (e.target.value.length <= 21 && !gstRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.AadharGender = e.target.value;
      }
    } else if (name === "AadharName") {
      const nameReg = /^[a-zA-Z\s]*$/;
      if (e.target.value.length <= 50 && nameReg.test(e.target.value)) {
        LPolicyDto.ProposerDetails.AadharName = e.target.value;
      }
    }
    LPolicyDto.ProposerDetails.Name = `${LPolicyDto.ProposerDetails["First Name"]} ${LPolicyDto.ProposerDetails["Last Name"]}`;
    setIdType((prevState) => ({ ...prevState, IdType }));
    setCKYCReqJson((prevState) => ({ ...prevState, CKYCReqJSon }));
    console.log("reqJSON1", CKYCReqJSon);
  };
  const handleSendCkycRegMail = async () => {
    console.log("QuoteNo", LPolicyDto["Quotation No"]);
    const notificationReq = {
      notificationRequests: [
        {
          templateKey: "BGR_Ckyclink",
          sendEmail: false,
          isEmailBody: true,
          notificationPayload: JSON.stringify({
            CkycUrl: CKYCData.result.manualKYCurl,
            ContactUsUrl: process.env.REACT_APP_CONTACTSUPPORT,
          }),
        },
      ],
      sendEmail: true,
      subject: "CKYC Registration Link",
      toEmail: LPolicyDto.ProposerDetails["Email ID"],
    };
    const mail = await BGRCkycRegMail(notificationReq);
    console.log("mail", mail);
    if (mail.status === 1) {
      swal({
        text: `Link shared to register for CKYC Successfully.`,
        icon: "success",
      });
      setCkycEmailFlag(false);
    }
  };
  const handleCkycUpdateStatus = async () => {
    setloadingflag1(true);
    await GetCkycUpdateStatus(CkycUpdateJson).then((results) => {
      const data = results;
      if (data.status === "success") {
        setCKYCUpdateData(data);
        console.log("CKYCUpdateData", CKYCUpdateData);
        setCKYCStatus(data.status);
        // let { CkycDetails } = LPolicyDto;
        // CkycDetails = data;
        LPolicyDto.CkycDetails = data;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        // if (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate") {
        //   CkycDetails.result.dob = CKYCReqJSon.dob;
        // }
        masterArray.ckycstatus1 = data.status;
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        setFlag1(data.status);
        // setKYCSecDisable(true);
        // const GSTreg = /^[a-zA-Z0-9]+$/;
        setCkycEmailFlag(false);
        masterArray.ckycstatus = true;
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        // LPolicyDto.ProposerDetails["First Name"] = data.result.name;
        // LPolicyDto.ProposerDetails.AadharName = data.result.name;
        // // ProposerDetails["Last Name"] = data1.result.lastName;
        // if (data.result.lastName === "") {
        //   LPolicyDto.ProposerDetails["Last Name"] = ".";
        // } else {
        //   LPolicyDto.ProposerDetails["Last Name"] = data.result.lastName;
        // }
        if (
          data.result.name.indexOf(" ") > 0 &&
          LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
        ) {
          const namesplit = data.result.name.trim().split(" ");
          const [firstName] = namesplit;
          LPolicyDto.ProposerDetails["First Name"] = firstName;
          LPolicyDto.ProposerDetails["Last Name"] = namesplit.slice(1).join(" ");
          LPolicyDto.ProposerDetails.AadharName = data.result.name;
        } else {
          LPolicyDto.ProposerDetails["First Name"] = data.result.name;
        }
        // LPolicyDto.ProposerDetails["Date of Birth"] = data.result.dob;
        // // LPolicyDto.ProposerDetails["Date of Birth"] = data.result.dob;

        // masterArray.DOB = data.result.dob;
        if (data.result.dob === "" || data.result.dob === null) {
          LPolicyDto.ProposerDetails["Date of Birth"] = formatDate(data.result.ckycDate);
          masterArray.DOB = formatDate(data.result.ckycDate);
        } else {
          // masterArray.DOB = data.result.dob;
          // LPolicyDto.ProposerDetails["Date of Birth"] = data.result.dob;
          // setMaster((prevState) => ({ ...prevState, ...masterArray }));
          // setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
          // setPolicyDto((prevState) => ({
          //   ...prevState,
          //   ...LPolicyDto,
          // }));
          masterArray.DOB = data.result.dob;
          // LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
          //   ? data.result.dob
          //   : data.result.dob;
        }

        // const dateObject = new Date(data.result.dob);
        // masterArray.DOB = dateObject;
        // masterArray.DOB = formatDate1(data.result.dob);
        // if (data.result.idNo !== "" || data.result.idNo === GSTreg.test(data.result.idNo)) {
        //   masterArray.GST = data.result.idNo;
        // } else {
        //   masterArray.CIN = data.result.idNo;
        // }
        if (data.result.maskedAadhaarNumber !== "") {
          LPolicyDto.ProposerDetails.AadharID = data.result.maskedAadhaarNumber.substring(
            data.result.maskedAadhaarNumber.length - 4
          );
        }
        if (data.result.mobileNumber === "" || data.result.mobileNumber === null) {
          LPolicyDto.ProposerDetails.AadharMobileNo = PolicyDto.ProposerDetails.AadharMobileNo;
        } else {
          LPolicyDto.ProposerDetails.AadharMobileNo = data.result.mobileNumber;
        }

        if (data.result.uploadedDocument === "CIN") {
          LPolicyDto.ProposerDetails.CIN = data.result.idNo;
          masterArray.CIN = data.result.idNo;
        }
        if (data.result.uploadedDocument === "GSTIN") {
          LPolicyDto.ProposerDetails.GSTIN = data.result.idNo;
          masterArray.GST = data.result.idNo;
        }
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        if (data.result.mobileNumber === null) {
          LPolicyDto.ProposerDetails.MobileNo = PolicyDto.ProposerDetails.MobileNo;
        } else {
          LPolicyDto.ProposerDetails.MobileNo = data.result.mobileNumber;
        }
        //  LPolicyDto.ProposerDetails["Email ID"] = data1.result.email;
        LPolicyDto.ProposerDetails["Address 1"] = data.result.address;
        // LPolicyDto.ProposerDetails["Address 2"] = data.result.address2;
        //  ProposerDetails.CommunicationAddress.Address2 = data1.result.address2;
        LPolicyDto.ProposerDetails.PAN = data.result.pan;
        // if (
        //   LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
        //   LPolicyDto.ProposerDetails.CIN !== ""
        // ) {
        //   LPolicyDto.ProposerDetails.CIN = data.result.idNo;
        //   masterArray.CIN = data.result.idNo;
        //   setMaster((prevState) => ({ ...prevState, ...masterArray }));
        // }
        if (data.result.pincode === "") {
          setpinflag(false);
          masterArray.pinflag = false;
          setMaster((prevState) => ({ ...prevState, ...masterArray }));
        } else {
          LPolicyDto.ProposerDetails.PinCode = data.result.pincode;
          masterArray.pinflag = true;
          setMaster((prevState) => ({ ...prevState, ...masterArray }));
        }

        // LPolicyDto.ProposerDetails.PinCode = data1.result.pincode;
        setDate((prev) => ({ ...prev, dateOfBirth: kycDate }));
        setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
      }
      if (data.status === "failure") {
        setCkycEmailFlag(true);
        // setCkycUpdateJson((prevState) => ({
        //   ...prevState,
        //   uniqueTransactionNumber: data.uniqueTransactionNumber,
        // }));
        // setKYCSecDisable(true);
      }

      setCKYCData((prevState) => ({ ...prevState, CKYCData: data }));
      LPolicyDto.CkycStatus = data.status;
      setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    });
    setloadingflag1(false);
  };
  const [dropdowndata, setdropdowndata] = useState([]);
  useEffect(async () => {
    // const Profile = await fetchProfile("AC1", "INUBESOFTWARE");

    await fetchuser(master.uname).then(async (result) => {
      console.log("123456789result", result, result.data.partnerId);
      const partnerDetailssss = result.data.additionalDetails;
      console.log("123456789", partnerDetailssss);
      const partnerDetail = JSON.parse(partnerDetailssss);
      setAgentCode(partnerDetail.AdditionalDetails.IntermediaryCode);
      console.log("agent code", AgentCode);
      const UserId = new URLSearchParams(search).get("UserName");

      if (UserId !== null) {
        const Profile = await fetchProfile(
          partnerDetail.AdditionalDetails.IntermediaryCode,
          UserId,
          LPolicyDto.BranchName,
          LPolicyDto.ProfileType,
          LPolicyDto.BranchCode
        );
        setdropdowndata(Profile.data[0]);
        const tp = PolicyDto["Type of Policy"];
        let MOT = "";
        if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Parcel Post") {
          MOT = "ParcelPost";
        } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road") {
          MOT = "InlandRailRoadAir";
        } else if (
          PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Registered POST"
        ) {
          MOT = "RegisteredPost";
        } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air") {
          MOT = "air";
        } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea") {
          MOT = "sea";
        } else {
          MOT = PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"];
        }
        console.log(tp, MOT, "Profiledatamd");
        console.log(Profile.data[0].clauses[0][tp][MOT], "Profiledatamd");

        LPolicyDto.clauses = Profile.data[0].clauses[0][tp][MOT];
        setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      } else {
        const UserId1 = master.uname;
        const Profile = await fetchProfile(
          partnerDetail.AdditionalDetails.IntermediaryCode,
          UserId1,
          LPolicyDto.BranchName,
          LPolicyDto.ProfileType
        );
        // const Profile = await fetchProfile(partnerDetail1.AdditionalDetails.IntermediaryCode, UserId);
        setdropdowndata(Profile.data[0]);
        const tp = PolicyDto["Type of Policy"];
        let MOT = "";
        if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Parcel Post") {
          MOT = "ParcelPost";
        } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road") {
          MOT = "InlandRailRoadAir";
        } else if (
          PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Registered POST"
        ) {
          MOT = "RegisteredPost";
        } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air") {
          MOT = "air";
        } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea") {
          MOT = "sea";
        } else {
          MOT = PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"];
        }
        console.log(tp, MOT, "Profiledatamd");
        console.log(Profile.data[0].clauses[0][tp][MOT], "Profiledatamd");

        LPolicyDto.clauses = Profile.data[0].clauses[0][tp][MOT];
        setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
      console.log(dropdowndata, "Profile");
    });
  }, []);

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    // style: "currency",
    // currency: "INR",
  });
  useEffect(async () => {
    if (dropdowndata !== "") {
      LPolicyDto["Markup %"] = PolicyDto["Markup %"];
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      masterArray.Markup = PolicyDto["Markup %"];
      masterArray.MaximumSumInsured = dropdowndata.MaximumSumInsured;

      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      const totalmarkup = 100 + parseInt(PolicyDto["Markup %"], 10);
      const SUMINSUREDINCLUDINGMARKUP =
        (PolicyDto["Sum Insured in Currency of Invoice"] *
          PolicyDto["Exchange Rate"] *
          totalmarkup) /
        100;
      console.log(totalmarkup, SUMINSUREDINCLUDINGMARKUP, "FSUMINSUREDINCLUDINGMARKUP");
      setdispmarkup(formatter.format(SUMINSUREDINCLUDINGMARKUP));
      // LPolicyDto["Sum Insured including Markup"] = formatter.format(SUMINSUREDINCLUDINGMARKUP);
      LPolicyDto["Sum Insured including Markup"] = SUMINSUREDINCLUDINGMARKUP;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      const TSI =
        parseInt(PolicyDto["Sum Insured in INR for Duty "], 10) + SUMINSUREDINCLUDINGMARKUP;
      setdispSI(formatter.format(TSI));
      LPolicyDto["Sum Insured in INR "] = TSI;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      // LPolicyDto["Sum Insured in INR "] = formatter.format(TSI);
      console.log(TSI, "FSUMINSUREDINCLUDINGMARKUP");
      console.log(PolicyDto["Markup %"], "Profile1");
    }
    console.log(dropdowndata, "Profile1");
  }, [dropdowndata]);

  useEffect(() => {
    const totalmarkup = 100 + parseInt(PolicyDto["Markup %"], 10);
    const SUMINSUREDINCLUDINGMARKUP =
      (PolicyDto["Sum Insured in Currency of Invoice"] * PolicyDto["Exchange Rate"] * totalmarkup) /
      100;
    console.log(totalmarkup, SUMINSUREDINCLUDINGMARKUP, "FSUMINSUREDINCLUDINGMARKUP");
    setdispmarkup(formatter.format(SUMINSUREDINCLUDINGMARKUP));
    // LPolicyDto["Sum Insured including Markup"] = formatter.format(SUMINSUREDINCLUDINGMARKUP);
    LPolicyDto["Sum Insured including Markup"] = SUMINSUREDINCLUDINGMARKUP;
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
    const TSI = parseInt(PolicyDto["Sum Insured in INR for Duty "], 10) + SUMINSUREDINCLUDINGMARKUP;
    setdispSI(formatter.format(TSI));
    LPolicyDto["Sum Insured in INR "] = TSI;
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
    // LPolicyDto["Sum Insured in INR "] = formatter.format(TSI);
    console.log(TSI, "FSUMINSUREDINCLUDINGMARKUP");
  }, [PolicyDto["Sum Insured in Currency of Invoice"]]);
  useEffect(() => {
    const totalmarkup = 100 + parseInt(PolicyDto["Markup %"], 10);
    const SUMINSUREDINCLUDINGMARKUP =
      (PolicyDto["Sum Insured in Currency of Invoice"] * PolicyDto["Exchange Rate"] * totalmarkup) /
      100;
    console.log(totalmarkup, SUMINSUREDINCLUDINGMARKUP, "FSUMINSUREDINCLUDINGMARKUP");
    setdispmarkup(formatter.format(SUMINSUREDINCLUDINGMARKUP));
    LPolicyDto["Sum Insured including Markup"] = SUMINSUREDINCLUDINGMARKUP;
    // LPolicyDto["Sum Insured including Markup"] = formatter.format(SUMINSUREDINCLUDINGMARKUP);
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
    const TSI = parseInt(PolicyDto["Sum Insured in INR for Duty "], 10) + SUMINSUREDINCLUDINGMARKUP;
    setdispSI(formatter.format(TSI));
    LPolicyDto["Sum Insured in INR "] = TSI;
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
    // LPolicyDto["Sum Insured in INR "] = formatter.format(TSI);
    console.log(TSI, "FSUMINSUREDINCLUDINGMARKUP");
  }, [PolicyDto["Exchange Rate"]]);

  useEffect(() => {
    const totalmarkup = 100 + parseInt(PolicyDto["Markup %"], 10);
    const SUMINSUREDINCLUDINGMARKUP =
      (PolicyDto["Sum Insured in Currency of Invoice"] * PolicyDto["Exchange Rate"] * totalmarkup) /
      100;
    console.log(totalmarkup, SUMINSUREDINCLUDINGMARKUP, "FSUMINSUREDINCLUDINGMARKUP");
    // LPolicyDto["Sum Insured including Markup"] = formatter.format(SUMINSUREDINCLUDINGMARKUP);
    setdispmarkup(formatter.format(SUMINSUREDINCLUDINGMARKUP));
    LPolicyDto["Sum Insured including Markup"] = SUMINSUREDINCLUDINGMARKUP;
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
    const TSI = parseInt(PolicyDto["Sum Insured in INR for Duty "], 10) + SUMINSUREDINCLUDINGMARKUP;
    setdispSI(formatter.format(TSI));
    LPolicyDto["Sum Insured in INR "] = TSI;
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
    // LPolicyDto["Sum Insured in INR "] = formatter.format(TSI);
    console.log(TSI, "FSUMINSUREDINCLUDINGMARKUP");
  }, [PolicyDto["Sum Insured in INR for Duty "]]);

  // const formatter = new Intl.NumberFormat("en-IN", {
  //   maximumFractionDigits: 0,
  // });

  useEffect(() => {
    if (PolicyDto.ProposerDetails["Customer Type"] === "Individual") {
      CKYCReqJSon.customerType = "I";
    } else CKYCReqJSon.customerType = "C";
    setCKYCReqJson((prevState) => ({ ...prevState, CKYCReqJSon }));
    console.log("reqJSON", CKYCReqJSon);
  }, []);

  const handleSetPremiumDetails = (e) => {
    if (
      e.target.name === "Sum Insured in Currency of Invoice" ||
      e.target.name === "Sum Insured in INR for Duty " ||
      e.target.name === "Sum Insured in INR "
    ) {
      const mobileRegex = /^[0-9]*$/;
      //   const rateregex = /^\d+(\.\d{1,2})?$/;
      // const mobileRegex = /^\d*\.?\d{0,2}$/;
      if (mobileRegex.test(e.target.value)) {
        console.log("&&&&");

        disp[e.target.name] = formatter.format(PolicyDto[e.target.name]);
        console.log("display", PolicyDto[e.target.name]);

        setdisp((prevState) => ({ ...prevState, disp }));
        console.log("display", disp);
        LPolicyDto[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        // const FSUMINSUREDINCLUDINGMARKUP = SUMINSUREDINCLUDINGMARKUP / 100;

        // if (PolicyDto["Sum Insured in INR "] > dropdowndata.MaximumSumInsured) {
        //   const rate1 = dropdowndata.MaximumSumInsured;
        //   swal({
        //     icon: "error",
        //     text: `Please note that the maximum sum insured allowed is ${rate1}, enter a  value below  ${rate1} to proceed`,
        //     buttons: "OK",
        //   });
        //   console.log(
        //     PolicyDto["Sum Insured in INR "] > dropdowndata.MaximumSumInsured,
        //     "rate1",
        //     dropdowndata.MaximumSumInsured
        //   );
        // } else {
        //   console.log(
        //     PolicyDto["Sum Insured in INR "] > dropdowndata.MaximumSumInsured,
        //     "rate12",
        //     dropdowndata.MaximumSumInsured
        //   );
        // }
      }
    } else if (e.target.name === "Exchange Rate") {
      // const mobileRegex = /^[0-9]*$/;
      //   const rateregex = /^\d+(\.\d{1,2})?$/;
      const mobileRegex = /^\d*\.?\d{0,2}$/;
      if (mobileRegex.test(e.target.value)) {
        console.log("&&&&");

        disp[e.target.name] = formatter.format(PolicyDto[e.target.name]);
        console.log("display", PolicyDto[e.target.name]);

        setdisp((prevState) => ({ ...prevState, disp }));
        console.log("display", disp);
        LPolicyDto[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Rate") {
      // const mobileRegex = /^[0-9.]*$/;
      const mobileRegex = /^[0-9]*(?:\.[0-9]{0,8})?$/;
      if (mobileRegex.test(e.target.value)) {
        LPolicyDto[e.target.name] = e.target.value;
      }
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    } else {
      LPolicyDto[e.target.name] = e.target.value;
      LPolicyDto.PropRisks_Ratevalue = e.target.value / 100;
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };

  const validate1 = (e) => {
    console.log(PolicyDto["Sum Insured in INR "], e);
    const MaximumSumInsured = parseInt(dropdowndata.MaximumSumInsured, 10);
    console.log(dropdowndata.MaximumSumInsured, MaximumSumInsured);
    if (PolicyDto["Sum Insured in INR "] > dropdowndata.MaximumSumInsured) {
      const rate1 = dropdowndata.MaximumSumInsured;
      swal({
        icon: "error",
        text: `Please note that the maximum sum insured allowed is ${rate1}, enter a  value below  ${rate1} to proceed`,
        buttons: "OK",
      });
      console.log(PolicyDto["Sum Insured in INR "] > dropdowndata.MaximumSumInsured, "rate1");
    } else {
      console.log(PolicyDto["Sum Insured in INR "] > dropdowndata.MaximumSumInsured, "rate12");
    }
  };

  const validate = (e) => {
    if (e.target.name === "Rate") {
      console.log(
        "validatee",
        parseInt(dropdowndata.MinimumRate, 10),
        dropdowndata.MinimumRate,
        parseInt(PolicyDto.Rate, 10),
        PolicyDto.Rate,
        parseInt(dropdowndata.MinimumRate, 10) > parseInt(PolicyDto.Rate, 10),
        dropdowndata.MinimumRate > PolicyDto.Rate,
        "rate1"
      );

      console.log("minumum", parseFloat(dropdowndata.MinimumRate, 10));
      console.log("rate", dropdowndata.MinimumRate);
      console.log("perc", parseFloat(PolicyDto.Rate, 10));
      console.log("policyrate", PolicyDto.Rate);
      console.log(
        "condition",
        parseFloat(dropdowndata.MinimumRate, 10) > parseFloat(PolicyDto.Rate, 10)
      );
      console.log("dropdowndata", dropdowndata.MinimumRate > PolicyDto.Rate);

      if (parseFloat(dropdowndata.MinimumRate, 10) > parseFloat(PolicyDto.Rate, 10)) {
        // if (PolicyDto.Rate < dropdowndata.MinimumRate) {
        const rate1 = dropdowndata.MinimumRate;
        console.log(rate1, "rate1");
        swal({
          icon: "error",
          text: `Please note that the minimum rate allowed is ${rate1}%, enter a Rate value above  ${rate1}% to proceed`,
          buttons: "OK",
        });
        LPolicyDto[e.target.name] = "";
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    }
  };

  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

  const [cust, setCust] = useState({
    PinCodeError: false,
  });

  const handleSetProposer = (e) => {
    if (e.target.name === "Address 2") {
      LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };

  const handleSetPincode = (e) => {
    if (e.target.name === "PinCode") {
      const pincodeRegex = /^[0-9]{0,6}$/;
      if (pincodeRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
        setPolicyDto(() => ({
          ...LPolicyDto,
        }));
        if (e.target.value.length === 6) {
          setCust((prevState) => ({
            ...prevState,
            PinCodeError: false,
          }));
          console.log(cust.PinCodeError, "pincodeerror");
        } else {
          setCust((prevState) => ({
            ...prevState,
            PinCodeError: true,
          }));
          LPolicyDto.ProposerDetails.District = "";
          LPolicyDto.ProposerDetails.State = "";
          setPolicyDto(() => ({
            ...LPolicyDto,
          }));
          console.log(cust.PinCodeError, "pincodeerror");
        }
      }
    }
  };

  const handleSetAutoComplete = (e, value) => {
    // debugger;
    // const { ProposerDetails } = LPolicyDto;
    LPolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;

    LPolicyDto.ProposerDetails.AadharGender = value.mValue;
    setLPolicyDto({ ...LPolicyDto });
    console.log("123", LPolicyDto);
  };
  return (
    <MDBox pt={3}>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingflag}
      >
        <CircularProgress />
      </Backdrop>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingflag1}
      >
        <CircularProgress />
      </Backdrop>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            E-KYC Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Customer Type*
                </MDTypography>
                <ThemeProvider theme={themes}>
                  <RadioGroup row value={PolicyDto.ProposerDetails["Customer Type"]}>
                    <FormControlLabel
                      value="Individual"
                      control={<CustomRadio />}
                      label="Individual"
                    />
                    <FormControlLabel
                      value="Corporate"
                      control={<CustomRadio />}
                      label="Corporate"
                    />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
            </Grid>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="CKYC Status"
                  name="CKYC Status"
                  // value={CKYCStatus}
                  value={master.ckycstatus1}
                  disabled
                />
              </Grid>
            </Grid>
            {}
            {LPolicyDto.ProposerDetails["Customer Type"] === "Individual" && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} sx={{ m: 1 }}>
                    <Autocomplete
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                        marginTop: "10px",
                      }}
                      options={CkycParams}
                      value={{ mValue: LPolicyDto.ProposerDetails.CKYCParam }}
                      disableClearable
                      onChange={handleSetValueParms}
                      getOptionLabel={(option) => option.mValue}
                      //   onChange={(e, value) => handleDocType(e, value, i)}
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            readOnly: true,
                          }}
                          label="Select ID Type"
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                          required
                          disabled={
                            CKYCStatus === "success" ||
                            LPolicyDto.CkycStatus === "success" ||
                            LPolicyDto.CkycStatus === "failure"
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {LPolicyDto.ProposerDetails.CKYCParam === "PAN Number" ? (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={1} mt={2}>
                      <CkycParameterPan
                        // LPolicyDto={LPolicyDto}
                        CKYCStatus={CKYCStatus}
                        datePlaceHolder={datePlaceHolder}
                        handleSetCKYC={handleSetCKYC}
                        master={master}
                        PolicyDto={PolicyDto}
                        validDate={validDate}
                        handlevalidChange={handlevalidChange}
                        flags={flags}
                      />
                    </Grid>
                  ) : null}
                  {LPolicyDto.ProposerDetails.CKYCParam === "Aadhaar Number" ? (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} ml={1} mt={2}>
                      <CkycParameterAadhar
                        genderData={PropertyDetailsDataBind.NomineeGender}
                        handleSetAutoComplete={handleSetAutoComplete}
                        // masterArray={masterArray}
                        // ProposerError={ProposerError}
                        // handleMobilesChange={handleMobilesChange}
                        LPolicyDto={LPolicyDto}
                        PolicyDto={PolicyDto}
                        validDate={validDate}
                        master={master}
                        handlevalidChange={handlevalidChange}
                        CKYCStatus={CKYCStatus}
                        datePlaceHolder={datePlaceHolder}
                        handleSetCKYC={handleSetCKYC}
                        flags={flags}
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </>
            )}
            {/* <Grid container spacing={2} mt={1}>
              <Stack direction="row" spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="PAN Number"
                    name="idNo"
                    inputProps={{ maxLength: 10 }}
                    // value={IdType.PanId}
                    value={master.PAN}
                    required
                    sx={redAsterisk}
                    onChange={(e) => handleSetCKYC(e, "idNo")}
                    // disabled={kycSecDisable}
                    onBlur={handlevalidChange}
                    disabled={master.ckycstatus}
                  />
                  {flags.panflag === true && master.PAN !== "" ? (
                    <MDTypography
                      sx={{
                        color: "red",
                        fontSize: "10px",
                      }}
                    >
                      Enter Valid PAN Number
                    </MDTypography>
                  ) : null}
                </Grid>
                {CKYCReqJSon.customerType === "C" ? (
                  <>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDInput
                        label="GSTIN Number"
                        name="GSTIN"
                        // value={IdType.GSTINId}
                        value={master.GST}
                        required
                        sx={redAsterisk}
                        inputProps={{ maxLength: 15 }}
                        onChange={(e) => handleSetCKYC(e, "GSTIN")}
                        // disabled={kycSecDisable}
                        disabled={master.ckycstatus}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDInput
                        label="CIN Number"
                        name="CIN"
                        // value={IdType.CINId}
                        value={master.CIN}
                        required
                        sx={redAsterisk}
                        onChange={(e) => handleSetCKYC(e, "CIN")}
                        // disabled={kycSecDisable}
                        disabled={master.ckycstatus}
                      />
                    </Grid>
                  </>
                ) : null}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label={
                        CKYCReqJSon.customerType === "C" ? "Date of Incorporation" : "Date of Birth"
                      }
                      inputFormat="dd-MM-yyyy"
                      type="login"
                      id="Date of Birth"
                      // value={kycDate}
                      value={master.DOB}
                      onChange={(date) => handleSetCKYC(date, "dateOfBirth")}
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          sx={{
                            width: "100%",
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                          required
                          error={validDate || datetoShow.dateOfBirth === "" ? flag : null}
                          // disabled={kycSecDisable}
                          disabled={master.ckycstatus}
                        />
                      )}
                    />
                    {flag && master.DOB === null ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill this Field
                      </MDTypography>
                    ) : null}
                    {validDate && master.DOB !== null ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill the valid date
                      </MDTypography>
                    ) : null}
                  </LocalizationProvider>
                </Grid>
              </Stack>
            </Grid> */}
            <Grid container spacing={2} mt={1}>
              {/* <Stack direction="row" spacing={1}> */}

              {CKYCReqJSon.customerType === "C" ? (
                <>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDInput
                      label="PAN Number"
                      name="idNo"
                      // inputProps={{ maxLength: 10 }}
                      inputProps={{
                        maxLength: 10,
                        disabled:
                          PolicyDto.CkycStatus === "success" ||
                          PolicyDto.CkycStatus === "failure" ||
                          (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            PolicyDto.ProposerDetails.GSTIN !== "") ||
                          (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            PolicyDto.ProposerDetails.CIN !== ""),
                      }}
                      // value={IdType.PanId}
                      value={master.PAN}
                      required
                      sx={redAsterisk}
                      onChange={(e) => handleSetCKYC(e, "idNo")}
                      // disabled={kycSecDisable}
                      onBlur={handlevalidChange}
                      disabled={
                        PolicyDto.CkycStatus === "success" ||
                        PolicyDto.CkycStatus === "failure" ||
                        (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          PolicyDto.ProposerDetails.GSTIN !== "") ||
                        (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          PolicyDto.ProposerDetails.CIN !== "")
                      }
                    />
                    {flags.panflag === true && master.PAN !== "" ? (
                      <MDTypography
                        sx={{
                          color: "red",
                          fontSize: "10px",
                        }}
                      >
                        Enter Valid PAN Number
                      </MDTypography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDInput
                      label="GSTIN Number"
                      name="GSTIN"
                      // value={IdType.GSTINId}
                      value={master.GST}
                      required
                      sx={redAsterisk}
                      // inputProps={{ maxLength: 15 }}
                      inputProps={{
                        maxLength: 15,
                        disabled:
                          PolicyDto.CkycStatus === "success" ||
                          PolicyDto.CkycStatus === "failure" ||
                          (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            PolicyDto.ProposerDetails.PAN !== "") ||
                          (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            PolicyDto.ProposerDetails.CIN !== ""),
                      }}
                      onChange={(e) => handleSetCKYC(e, "GSTIN")}
                      // disabled={kycSecDisable}
                      disabled={
                        PolicyDto.CkycStatus === "success" ||
                        PolicyDto.CkycStatus === "failure" ||
                        (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          PolicyDto.ProposerDetails.PAN !== "") ||
                        (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          PolicyDto.ProposerDetails.CIN !== "")
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDInput
                      label="CIN Number"
                      name="CIN"
                      // value={IdType.CINId}
                      value={master.CIN}
                      required
                      inputProps={{
                        disabled:
                          PolicyDto.CkycStatus === "success" ||
                          PolicyDto.CkycStatus === "failure" ||
                          (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            PolicyDto.ProposerDetails.PAN !== "") ||
                          (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            PolicyDto.ProposerDetails.GSTIN !== ""),
                      }}
                      sx={redAsterisk}
                      onChange={(e) => handleSetCKYC(e, "CIN")}
                      // disabled={kycSecDisable}
                      disabled={
                        PolicyDto.CkycStatus === "success" ||
                        PolicyDto.CkycStatus === "failure" ||
                        (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          PolicyDto.ProposerDetails.PAN !== "") ||
                        (PolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          PolicyDto.ProposerDetails.GSTIN !== "")
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        // label={
                        //   CKYCReqJSon.customerType === "C"
                        //     ? "Date of Incorporation"
                        //     : "Date of Birth"
                        // }
                        label="Date of Incorporation"
                        inputFormat="dd-MM-yyyy"
                        type="login"
                        id="Date of Birth"
                        maxDate={new Date()}
                        // value={kycDate}
                        value={master.DOB}
                        // value={PolicyDto.ProposerDetails["Date of Birth"]}
                        onChange={(date) => handleSetCKYC(date, "dateOfBirth")}
                        inputProps={{
                          disabled:
                            master.ckycstatus1 === "failure" || master.ckycstatus1 === "success",
                        }}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            sx={{
                              width: "100%",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            required
                            error={validDate || datetoShow.dateOfBirth === "" ? flag : null}
                            // disabled={kycSecDisable}
                            // disabled={master.ckycstatus}
                            disabled={
                              master.ckycstatus1 === "failure" || master.ckycstatus1 === "success"
                            }
                          />
                        )}
                      />
                      {flag && master.DOB === null ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                      {validDate && master.DOB !== null ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the valid date
                        </MDTypography>
                      ) : null}
                    </LocalizationProvider> */}
                    <MDDatePicker
                      options={{
                        altFormat: "d-m-Y",
                        dateFormat: "d-m-Y",
                        altInput: true,
                        allowInput: true,
                        noClender:
                          PolicyDto.CkycStatus === "success" || PolicyDto.CkycStatus === "failure",
                      }}
                      input={{
                        required: true,
                        label: "Date of Incorporation",

                        value: master.DOB,
                        allowInput:
                          PolicyDto.CkycStatus !== "success" || PolicyDto.CkycStatus !== "failure",
                        placeholder: datePlaceHolder("d-m-Y"),
                        InputLabelProps: { shrink: true },
                        InputProps: {
                          // disabled: master.ckycstatus,
                          disabled:
                            PolicyDto.CkycStatus === "success" ||
                            CKYCStatus === "success" ||
                            PolicyDto.CkycStatus === "failure",
                        },
                      }}
                      name="dateOfBirth"
                      value={master.DOB}
                      onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
                      disabled={
                        PolicyDto.CkycStatus === "success" ||
                        CKYCStatus === "success" ||
                        PolicyDto.CkycStatus === "failure"
                      }
                      disablePast={
                        PolicyDto.CkycStatus === "success" ||
                        CKYCStatus === "success" ||
                        PolicyDto.CkycStatus === "failure"
                      }
                      // disabled={master.ckycstatus}
                    />
                    {validDate && master.DOB !== null ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill the valid date
                      </MDTypography>
                    ) : null}
                  </Grid>
                </>
              ) : null}
            </Grid>
            {/* <Grid container spacing={1}>
              <Stack direction="row" spacing={1} flexDirection="right"> */}
            <Grid container spacing={1} mt={3} mb={2}>
              <Stack direction="row" spacing={2} flexDirection="left" ml={1}>
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={handleCKYCVerification}
                  // disabled={kycSecDisable}
                  // disabled={master.ckycstatus}
                  disabled={master.ckycstatus1 === "success" || master.ckycstatus1 === "failure"}
                >
                  Initiate C-KYC
                </MDButton>
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={handleCkycUpdateStatus}
                  // disabled={CkycEmailFlag === false}
                  disabled={master.ckycstatus1 === "success" || master.ckycstatus1 === ""}
                >
                  Update Status
                </MDButton>
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={handleSendCkycRegMail}
                  // disabled={CkycEmailFlag === false}
                  disabled={
                    master.ckycstatus1 === "success" ||
                    master.ckycstatus1 === "" ||
                    CkycEmailFlag === false
                  }
                >
                  Send EMail-SMS
                </MDButton>
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Customer Type*
                </MDTypography>

                <ThemeProvider theme={themes}>
                  <RadioGroup row value={PolicyDto.ProposerDetails["Customer Type"]}>
                    <FormControlLabel
                      value="Individual"
                      control={<CustomRadio />}
                      label="Individual"
                    />
                    <FormControlLabel
                      value="Corporate"
                      control={<CustomRadio />}
                      label="Corporate"
                    />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
            </Grid> */}
            {PolicyDto.ProposerDetails["Customer Type"] === "Individual" ? (
              <>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  {/* <MDInput label="Salutation" /> */}
                  {/* <Autocomplete
                id="Salutation"
                name="Salutation"
                options={salutationData}
                onChange={handleSetValue}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Salutation" />}
              /> */}
                  <MDInput
                    value={PolicyDto.ProposerDetails.Salutation}
                    required
                    sx={redAsterisk}
                    label="Salutation"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  {/* <MDInput
                value={PolicyDto.Name}
                name="Name"
                onChange={handleSetValue}
                required
                label="First Name"
              /> */}
                  <MDInput
                    value={PolicyDto.ProposerDetails["First Name"]}
                    required
                    sx={redAsterisk}
                    label="First Name"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    value={PolicyDto.ProposerDetails["Last Name"]}
                    required
                    sx={redAsterisk}
                    label="Last Name"
                    disabled
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Corporate Name"
                  name="Corporate Name"
                  value={PolicyDto.ProposerDetails["First Name"]}
                  required
                  sx={redAsterisk}
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput
                value={PolicyDto["Mobile Number"]}
                name="Mobile Number"
                onChange={handleSetValue}
                required
                label="Contact Number"
              /> */}
              <MDInput
                value={PolicyDto.ProposerDetails["Mobile Number"]}
                label="Contact Number"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput
                value={PolicyDto["Email ID"]}
                name="Email ID"
                onChange={handleSetValue}
                required
                label="Email ID"
              /> */}
              <MDInput value={PolicyDto.ProposerDetails["Email ID"]} label="Email ID" disabled />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" color="primary">
            Communication Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput
                label="Address 1"
                onChange={handleSetPincode}
                value={PolicyDto.Address}
                name="Address"
              /> */}
              <MDInput
                value={PolicyDto.ProposerDetails["Address 1"]}
                required
                sx={redAsterisk}
                label="Address 1"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                value={PolicyDto.ProposerDetails["Address 2"]}
                label="Address 2"
                disabled={master.pinflag}
                name="Address 2"
                onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                value={PolicyDto.ProposerDetails["Nearest Landmark"]}
                label="Nearest Landmark"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput
                label="Pincode"
                onChange={handleSetPincode}
                value={PolicyDto.PinCode}
                name="PinCode"
              /> */}
              <MDInput
                value={PolicyDto.ProposerDetails.PinCode}
                required
                sx={redAsterisk}
                label="PinCode"
                disabled={master.pinflag}
                onChange={handleSetPincode}
                name="PinCode"
                // inputProps={{ minLength: 6 }}
                inputProps={{ minLength: 6, disabled: master.pinflag }}
              />
              {cust.PinCodeError === true ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  Enter Valid PinCode
                </MDTypography>
              ) : null}
              {flag && PolicyDto.ProposerDetails.PinCode === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput label="City" value={commonObj.Comm.district} name="District" /> */}
              <MDInput value={PolicyDto.ProposerDetails.District} label="City" disabled />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput label="State" value={commonObj.Comm.state} name="State" /> */}
              <MDInput value={PolicyDto.ProposerDetails.State} label="State" disabled />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput value={PolicyDto.ProposerDetails.Country} label="Country" disabled />
            </Grid>

            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Is Your Permanent Address same as Communication Address
                </MDTypography>
                <RadioGroup
                  row
                  onChange={handleSetPincode}
                  value={PolicyDto.autoFill}
                  name="autoFill"
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Stack>
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" color="primary">
            Permanent Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Address 1" value={permAddress.Address} name="Address" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Address 2" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Nearest Landmark" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Pincode"
                name="PinCode"
                onChange={handleSetPermPinCode}
                value={permAddress.PinCode}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="City" name="District" value={commonObj.permanent.district} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="State" name="State" value={commonObj.permanent.state} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Country" />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion> */}
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" color="primary">
            Sum Insured Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Sum Insured in Currency Of Invoice"
                value={PolicyDto["Sum Insured in Currency of Invoice"]}
                // value={disp["Sum Insured in Currency of Invoice"]}
                onChange={handleSetPremiumDetails}
                name="Sum Insured in Currency of Invoice"
                error={PolicyDto["Sum Insured in Currency of Invoice"] === "" ? flag : null}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto["Sum Insured in Currency of Invoice"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Exchange Rate"
                value={PolicyDto["Exchange Rate"]}
                onChange={handleSetPremiumDetails}
                name="Exchange Rate"
                error={PolicyDto["Exchange Rate"] === "" ? flag : null}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto["Exchange Rate"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Markup %"
                value={PolicyDto["Markup %"]}
                // onChange={handleSetPremiumDetails}
                name="Markup %"
                required
                InputProps={{ disabled: true }}
                sx={redAsterisk}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Sum Insured Including Markup"
                // value={PolicyDto["Sum Insured including Markup"]}
                value={dispmarkup}
                // onChange={handleSetPremiumDetails}
                // name="Markup %"
                required
                sx={redAsterisk}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Sum Insured in INR for Duty"
                value={PolicyDto["Sum Insured in INR for Duty "]}
                // value={disp["Sum Insured in INR for Duty "]}
                onChange={handleSetPremiumDetails}
                name="Sum Insured in INR for Duty "
                onBlur={validate1}
                error={PolicyDto["Sum Insured in INR for Duty "] === "" ? flag : null}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto["Sum Insured in INR for Duty "] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Total Sum Insured in INR "
                // value={PolicyDto["Sum Insured in INR "]}
                value={dispSI}
                // onChange={handleSetPremiumDetails}
                name="Sum Insured in INR "
                // onBlur={validate1}
                disabled
                error={PolicyDto["Sum Insured in INR "] === "" ? flag : null}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto["Sum Insured in INR "] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Premium Rate in %"
                value={PolicyDto.Rate}
                onChange={handleSetPremiumDetails}
                name="Rate"
                onBlur={validate}
                error={PolicyDto.Rate === "" ? flag : null}
                required
                sx={redAsterisk}
              />{" "}
              {flag && PolicyDto.Rate === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default ProposerDetails;
