import React, { useState, useEffect } from "react";
import { Grid, Stack, CircularProgress, Backdrop } from "@mui/material";
import { useLocation } from "react-router-dom";
import MDTypography from "components/MDTypography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDInput from "components/MDInput";
import Autocomplete from "@mui/material/Autocomplete";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";
import { useTheme, createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import MDDatePicker from "components/MDDatePicker";
import { UploadFiles, ViewFiles } from "modules/PolicyLive/views/Home/data/index";
import swal from "sweetalert";
import { isValid, subYears, endOfYear } from "date-fns";
// import AppBar from "@mui/material/AppBar";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { getOTP, GetOTP } from "../../../BrokerPortal/Pages/Registration/data/index";
import { DeleteFile } from "../../../BrokerPortal/Pages/MyProfile/data/index";
import { useDataController } from "../../../BrokerPortal/context";
import { postRequest } from "../../../../core/clients/axiosclient";
// import { GetProposalByNumber } from "../BLUS/data/index";

import {
  GetCPMMasters,
  getCKYCDetails,
  GetCkycUpdateStatus,
  CPMCkycRegMail,
  getSalutation,
  getGender,
  callSaveProposalMethod,
  SendSMS,
  CPMProposalMail,
  callUpdateQuoteMethod,
} from "./data/index";
import MDButton from "../../../../components/MDButton";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <MDBox sx={{ p: 3 }}>
          <MDTypography>{children}</MDTypography>
        </MDBox>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function CkycParameterPan({
  lproposer,
  datePlaceHolder,
  CKYCStatus,
  handleSetCKYC,
  // PolicyDto,
  Ckycj,
  ID,
  handlevalidChange,
  flags,
}) {
  return (
    <Stack direction="row" spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="PAN Number"
          name="idNo"
          value={ID.Pan}
          required
          inputProps={{
            maxLength: 10,
          }}
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          onBlur={handlevalidChange}
          onChange={(e) => handleSetCKYC(e, "idNo")}
          disabled={lproposer.CkycStatus === "success" || lproposer.CkycStatus === "failure"}
        />
        {flags.panflag === true && ID.Pan !== "" ? (
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
            // allowInput: true,
            noClender: lproposer.CkycStatus === "success" || CKYCStatus === "success",
          }}
          input={{
            required: true,
            label:
              lproposer.CustomerType === "Individual" ? "Date of Birth" : "Date of Incorporation",

            value: Ckycj.dob,
            // allowInput: true,
            placeholder: datePlaceHolder("d-m-Y"),
            InputLabelProps: { shrink: true },
            InputProps: {
              disabled: lproposer.CkycStatus === "success" || CKYCStatus === "success",
            },
          }}
          name="DOB"
          value={Ckycj.dob}
          onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
          disabled={lproposer.CkycStatus === "success" || CKYCStatus === "success"}
        />
      </Grid>
    </Stack>
  );
}

function CkycParameterAadhar({
  genderData,
  handleSetAutoComplete,
  masterArray,
  ProposerError,
  lproposer,
  Ckycj,
  // PolicyDto,
  handleFieldValidation,
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
          value={lproposer.ProposerDetails.AadharID}
          required
          inputProps={{
            maxLength: 4,
          }}
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          // onBlur={handlevalidChange}
          onChange={(e) => handleSetCKYC(e, "AadharID")}
          disabled={lproposer.CkycStatus === "success" || lproposer.CkycStatus === "failure"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDDatePicker
          options={{
            altFormat: "d-m-Y",
            dateFormat: "d-m-Y",
            altInput: true,
            // allowInput: true,
            noClender: lproposer.CkycStatus === "success" || CKYCStatus === "success",
          }}
          input={{
            required: true,
            label:
              lproposer.CustomerType === "Individual" ? "Date of Birth" : "Date of Incorporation",

            value: Ckycj.dob,
            // allowInput: true,
            placeholder: datePlaceHolder("d-m-Y"),
            InputLabelProps: { shrink: true },
            InputProps: {
              disabled:
                lproposer.CkycStatus === "success" ||
                lproposer.CkycStatus === "failure" ||
                CKYCStatus === "success",
            },
          }}
          name="DOB"
          value={Ckycj.dob}
          onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
          disabled={
            lproposer.CkycStatus === "success" ||
            lproposer.CkycStatus === "failure" ||
            CKYCStatus === "success"
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="Mobile No. as per Aadhar"
          name="AadharMobileNo"
          id="AadharMobileNo"
          value={lproposer.ProposerDetails.AadharMobileNo}
          required
          inputProps={{
            maxLength: 10,
          }}
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          // onBlur={handlevalidChange}
          onBlur={handleFieldValidation}
          onChange={(e) => handleSetCKYC(e, "AadharMobileNo")}
          disabled={lproposer.CkycStatus === "success" || lproposer.CkycStatus === "failure"}
        />
        {flags.AadharMobileNo && lproposer.ProposerDetails.AadharMobileNo !== "" ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            Please fill valid Mobile Number
          </MDTypography>
        ) : null}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="Full Name as per Aadhar"
          name="AadharName"
          id="AadharName"
          value={lproposer.ProposerDetails.AadharName}
          required
          inputProps={{
            maxLength: 50,
          }}
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          // onBlur={handlevalidChange}
          onChange={(e) => handleSetCKYC(e, "AadharName")}
          disabled={lproposer.CkycStatus === "success" || lproposer.CkycStatus === "failure"}
        />
      </Grid>
      <Autocomplete
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "4px!important",
          },
        }}
        value={{ mValue: lproposer.ProposerDetails.AadharGender }}
        id="AadharGender"
        name="Gender"
        options={genderData.filter((x) => x.mValue !== "Transgender")}
        disableClearable
        onChange={(e, value) => handleSetAutoComplete(e, "Gender", value)}
        getOptionLabel={(option) => option.mValue}
        renderInput={(params) => (
          <MDInput
            {...params}
            label="Gender"
            required
            sx={{
              "& .MuiFormLabel-asterisk": {
                color: "red",
              },
            }}
            error={
              Object.values(masterArray.Gender || {}).every((x) => x === "" || x === null)
                ? ProposerError
                : null
            }
            disabled={lproposer.CkycStatus === "success" || lproposer.CkycStatus === "failure"}
          />
        )}
      />
    </Stack>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Click On Resend OTP in 00:{counter}</div>;
}

function ProposerDetails({
  handleNext,
  handleBack,
  Json,
  setJson,
  OTP,
  setOTP,
  setCheckDisclaimer,
  checkProposalConsent,
  checkDisclaimer,
  setCheckProposalConsent,
  setMaster,
  master,
  CKYCData,
  setCKYCData,
  CKYCStatus,
  setCKYCStatus,
  CKYCReqJSon,
  setCKYCReqJson,
  IdType,
  setIdType,
  CkycUpdateJson,
  setCkycUpdateJson,
  CKYCUpdateData,
  setCKYCUpdateData,
  docUpload,
  setDocUpload,
  checkInsurance,
  setCheckInsurance,
  setBackFlag,
  pinCode,
  setPincode,
  // kycDate,
  // setKycDate,
}) {
  const { search } = useLocation();
  // const proposalNoo = "USCPM202308290000472Proposal";
  const proposalNoo = new URLSearchParams(search).get("proposernum");

  // useEffect(async () => {
  //   // const proposalNumber = "USCPM202308040000171Proposal";
  //   const proposalNumber = new URLSearchParams(search).get("proposernum");
  //   if (proposalNumber !== null) {
  //     await GetProposalByNumber(proposalNumber).then((result) => {
  //       console.log("response", result);
  //       setJson(result.data[0].policyDetails);
  //       setCKYCStatus(result.data[0].policyDetails.CkycStatus);
  //       setCKYCReqJson(result.data[0].policyDetails.CkycDetails.result);
  //       setIdType((prev) => ({
  //         ...prev,
  //         CIN: "",
  //         GSTIN: result.data[0].policyDetails.ProposerDetails.GSTNumber,
  //         Pan: result.data[0].policyDetails.ProposerDetails.PanNo,
  //       }));
  //     });
  //   }
  // }, []);

  const [kycSecDisable, setKYCSecDisable] = useState(false);

  useEffect(() => {
    if (CKYCStatus === "success") {
      setKYCSecDisable(true);
    }
  }, [CKYCStatus]);

  const { HypothecationCPM, DocumentsNameCPM } = GetCPMMasters().bgrMaster.Masters;

  const [validDate, setValidDate] = useState(false);
  const [flags, setFlags] = useState({
    emailflag: false,
    gstflag: false,
    gstflag1: false,
    panflag: false,
    mobileFlag: false,
    pincodeFlag: false,
    AadharMobileNo: false,
    pinFlag: false,
    // errorFlag: true,
  });

  const [GST, setGST] = useState(false);
  const [PAN, setPAN] = useState(false);
  const [EmailFlag, setEmailFlag] = useState(false);
  const [MobileFlag, setMobileFlag] = useState(false);

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const CustomRadio = styled(Radio)(({ theme }) => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const theme = createTheme({
    status: {
      danger: "#c70825",
      outline: grey[500],
    },
    palette: {
      primary: {
        main: "#c70825",
      },
    },
  });

  const [loadingflag, setloadingflag] = useState(false);
  const [PincodeError, setPincodeError] = useState(false);
  const [otpflag, setOtpflag] = useState(false);
  // const [panupload, setPanupload] = useState(false);
  // const [addressflag, setAddressflag] = useState(false);
  const [ProposerError, setProposerError] = useState(false);
  const Ckycj = CKYCReqJSon;
  const ID = IdType;
  const lproposer = Json;
  const masterArray = master;
  const [InsuredDOB, setDate] = useState(null);
  console.log(InsuredDOB);
  const [salutationData, setSalutationData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [CkycEmailFlag, setCkycEmailFlag] = useState(false);
  const [updateflag, setUpdateFlag] = useState(false);
  // const [datetoShow, setDateToShow] = useState({
  //   dateOfBirth: null,
  // });
  const [counter, setCounter] = useState(30);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [sendOtpFlag, setSendOtpFlag] = useState(true);
  const [status, setStatus] = useState(false);
  const [values, setValues] = React.useState(0);

  const handleChange = (event, newValues) => {
    setValues(newValues);
  };

  const themes = useTheme();
  const [commPincode, setCommPincode] = useState([]);
  const [permPincode, setPermPincode] = useState([]);
  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
      setSendOtpFlag(false);
      // setData((prevState) => ({ ...prevState, sendOtpFlag: false }));
    }
    if (counter === 0) {
      setCounter(30);
      setStartCounterFlag(false);
      setStatus(false);
      // setData((prevState) => ({ ...prevState, status: false }));
      setTimerFlag(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);

  // const [individual, setIndividual] = useState(false);
  const handleSetRadio = (e) => {
    if (e.target.name === "CustomerType") {
      lproposer[e.target.name] = e.target.value;
    }
    setJson({ ...lproposer });
    if (e.target.name === "CustomerType") {
      if (e.target.value === "Individual") {
        Ckycj.customerType = "I";
        Ckycj.dob = "";
        setIdType((prev) => ({ ...prev, Pan: "", GSTIN: "", CIN: "" }));
        // setKycDate(null);
      } else {
        Ckycj.customerType = "C";
        Ckycj.dob = "";
        setIdType((prev) => ({ ...prev, Pan: "" }));
        // setKycDate(null);
      }
    }
    // setIndividual(true);
    setCKYCReqJson((prevState) => ({ ...prevState, Ckycj }));
  };

  // const formatDate = (date) => {
  //   const format = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(date);
  //   return `${dt.getFullYear()}/${format(dt.getMonth() + 1)}/${format(dt.getDate())}`;
  // };
  const handleSetAutoComplete = (e, type, value) => {
    if (type === "Salutation") {
      masterArray[type] = value;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      lproposer.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      if (value.mValue === "Mr.") {
        masterArray.Gender = {
          mID: 2,
          mValue: "Male",
          mType: "Gender",
          mIsRequired: false,
          isActive: null,
        };
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        lproposer.ProposerDetails.Gender = "Male";
      } else if (value.mValue === "Mrs." || value.mValue === "Ms.") {
        masterArray.Gender = {
          mID: 1,
          mValue: "Female",
          mType: "Gender",
          mIsRequired: false,
          isActive: null,
        };
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        lproposer.ProposerDetails.Gender = "Female";
      } else {
        masterArray.Gender = { mID: "", mValue: "" };
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        lproposer.ProposerDetails.Gender = "";
      }
      // setMaster((prevState) => ({ ...prevState, Salutation: { mID: "", mValue: "" } }));
    }
    if (type === "Gender") {
      masterArray[type] = value;
      console.log(value, "gendervalue");
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      lproposer.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      // setMaster((prevState) => ({ ...prevState, Gender: { mID: "", mValue: "" } }));
    }
    // setMaster((prevState) => ({ ...prevState, PolicyType: value }));
    setJson((prevState) => ({
      ...prevState,
      ...lproposer,
    }));
  };
  const getPincodeDetails = async (pincodeValue) => {
    const ProductId = 782;
    const getPincodeDistrictStateData = async (type, id) => {
      const urlString = `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${type}`;
      let payload;
      switch (type) {
        case "State":
          payload = { State_Code: id };
          break;
        case "District":
          payload = { District_ID_PK: id };
          break;
        case "City":
          payload = { City_ID: id };
          break;
        case "Pincode":
          payload = { Pincode: id };
          break;
        default:
          break;
      }
      const dataValue = await (await postRequest(urlString, payload)).data;
      return dataValue;
    };
    const city = await getPincodeDistrictStateData("City", pincodeValue);
    const district = await getPincodeDistrictStateData("District", city[0].DistrictID);
    const state = await getPincodeDistrictStateData("State", city[0].State_CD);
    return { city, district, state };
  };
  const handleCKYCVerification = async () => {
    //  debugger;
    const ProposerDetailsData = lproposer.ProposerDetails;
    if (lproposer.CustomerType === "") {
      swal({
        icon: "error",
        text: "Please select the Customer Type",
      });
    } else if (
      lproposer.ProposerDetails.CKYCParam === "Aadhaar Number" &&
      (lproposer.ProposerDetails.AadharID === "" ||
        lproposer.ProposerDetails.AadharMobileNo === "" ||
        lproposer.ProposerDetails.AadharGender === "" ||
        lproposer.ProposerDetails.AadharName === "" ||
        Ckycj.dob === "")
    ) {
      swal({
        icon: "error",
        text: "Please Fill the Ckyc Details",
      });
    } else if (
      // (lproposer.CustomerType === "Corporate" && ID.Pan === "") ||
      lproposer.CustomerType === "Individual" &&
      lproposer.ProposerDetails.CKYCParam === "PAN Number" &&
      ID.Pan === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill PAN number",
      });
    } else if (
      (lproposer.CustomerType === "Corporate" && ID.Pan !== "" && flags.panflag === true) ||
      (lproposer.CustomerType === "Individual" && ID.Pan !== "" && flags.panflag === true)
    ) {
      swal({
        icon: "error",
        text: "Please fill valid PAN number",
      });
    } else if (
      lproposer.CustomerType === "Corporate" &&
      ID.Pan === "" &&
      ID.GSTIN === "" &&
      ID.CIN === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill any one Field",
      });
    } else if (
      lproposer.CustomerType === "Corporate" &&
      ID.GSTIN !== "" &&
      flags.gstflag === true
    ) {
      swal({
        icon: "error",
        text: "Enter Valid GST Number",
      });
    } else if (lproposer.CustomerType === "Corporate" && ID.CIN !== "" && ID.CIN.length !== 21) {
      swal({
        icon: "error",
        text: "Enter Valid CIN Number",
      });
    } else if (lproposer.CustomerType === "Individual" && Ckycj.dob === "") {
      swal({
        icon: "error",
        text: "Please fill the Date of Birth",
      });
    } else if (lproposer.CustomerType === "Corporate" && Ckycj.dob === "") {
      swal({
        icon: "error",
        text: "Please fill the Date of Incorporation",
      });
    } else {
      const objAadhar = {
        source: "AVO",
        customerType: lproposer.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo: lproposer.ProposerDetails.AadharID,
        idType: "AADHAAR",
        dob: Ckycj.dob,
        mobileNo: lproposer.ProposerDetails.AadharMobileNo,
        pincode: "",
        ckycNo: "",
        extraField1: lproposer.ProposerDetails.AadharName,
        extraField2: lproposer.ProposerDetails.AadharGender === "Female" ? "F" : "M",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      const Obj = lproposer.ProposerDetails.CKYCParam === "Aadhaar Number" ? objAadhar : Ckycj;
      await getCKYCDetails(782, Obj).then(async (results) => {
        const data = results;
        setCKYCData(data);
        console.log("CKYCData", CKYCData);
        setCKYCStatus(data.status);

        console.log("CKYC Status", CKYCStatus, data.status);
        console.log("Ckycj", setCKYCReqJson);
        if (data.status === "failure") {
          setCkycEmailFlag(false);
          setKYCSecDisable(true);
          // setfailDisable(true);
          // setPincode(false);
          setCkycUpdateJson((prevState) => ({
            ...prevState,
            uniqueTransactionNumber: data.uniqueTransactionNumber,
          }));
          const obj = {
            ...lproposer,
            CkycStatus: data.status,
            CkycDetails: data,
          };
          console.log("obj:", obj);
          ProposerDetailsData.GSTNumber = ID.GSTIN;
          ProposerDetailsData.CIN = ID.CIN;
          ProposerDetailsData.PanNo = ID.Pan;
          ProposerDetailsData.DOB = Ckycj.dob;
          setJson((prev) => ({ ...prev, ProposerDetails: ProposerDetailsData }));
          setJson((prev) => ({ ...prev, ...obj }));
          if (Json.proposalNumber === "") {
            await callSaveProposalMethod(obj).then((result) => {
              lproposer.proposalNumber = result.data.proposalNumber;
              lproposer.ProposalNo = lproposer.proposalNumber;
              console.log("proposalNumber", lproposer);
              setJson((prev) => ({ ...prev, ...lproposer }));
            });
          } else {
            await postRequest(`Policy/UpdateProposalDetails`, obj);
          }
        } else {
          setKYCSecDisable(true);

          ProposerDetailsData["First Name"] = data.result.firstName;
          if (lproposer.CustomerType === "Individual") {
            ProposerDetailsData["Last Name"] = data.result.lastName;
          } else {
            ProposerDetailsData["Last Name"] = "";
          }
          // ProposerDetailsData.DOB = data.result.dob;
          if (data.result.dob === null || data.result.dob === "") {
            Ckycj.dob = data.result.ckycDate;
            ProposerDetailsData.DOB = data.result.ckycDate;
          } else {
            Ckycj.dob = data.result.dob;
            ProposerDetailsData.DOB = data.result.dob;
          }
          if (data.result.email === "" || data.result.email === null) {
            ProposerDetailsData["Email ID"] = lproposer.QuoteEmail;
            ProposerDetailsData.PermanentAddress["Email ID"] = lproposer.QuoteEmail;
          } else {
            ProposerDetailsData.PermanentAddress["Email ID"] = data.result.email;
            ProposerDetailsData["Email ID"] = data.result.email;
          }
          if (data.result.mobileNumber === "" || data.result.mobileNumber === null) {
            ProposerDetailsData["Mobile Number"] = lproposer.QuoteMobileNo;
            ProposerDetailsData.PermanentAddress["Mobile Number"] = lproposer.QuoteMobileNo;
          } else {
            ProposerDetailsData["Mobile Number"] = data.result.mobileNumber;
            ProposerDetailsData.PermanentAddress["Mobile Number"] = data.result.mobileNumber;
          }
          if (data.result.pincode === "") {
            setPincode(false);
          } else {
            setPincode(true);
            lproposer.ProposerDetails.PermanentAddress.Pincode = data.result.pincode;

            // lproposer.ProposerDetails.PermanentAddress.State = abcd.state[0].State_Name;
            setJson({ ...lproposer });
          }

          ProposerDetailsData.PermanentAddress.AddressLine1 = data.result.address1;
          ProposerDetailsData.PermanentAddress.AddressLine2 = data.result.address2;
          ProposerDetailsData.PermanentAddress.Pincode = data.result.pincode;
          // ProposerDetailsData.PermanentAddress.City = data.result.city;
          // ProposerDetailsData.PermanentAddress.District = data.result.district;
          // ProposerDetailsData.PermanentAddress.State = data.result.state;
          // ProposerDetailsData.PermanentAddress["Email ID"] = data.result.email;
          // ProposerDetailsData.PermanentAddress["Mobile Number"] = data.result.mobileNumber;
          ProposerDetailsData.GSTNumber = ID.GSTIN;
          ProposerDetailsData.CIN = ID.CIN;
          ProposerDetailsData.PanNo = data.result.pan;
          setDate((prev) => ({ ...prev, dateOfBirth: Ckycj.dob }));
          setJson((prev) => ({ ...prev, ProposerDetails: ProposerDetailsData }));
          const obj = {
            ...lproposer,
            CkycStatus: data.status,
            CkycDetails: data,
          };
          await callSaveProposalMethod(obj);
        }
        setCKYCData((prevState) => ({ ...prevState, CKYCData: data }));
        setJson((prevState) => ({ ...prevState, CkycStatus: data.status, CkycDetails: data }));
        console.log("CKYCSTATUS", data);
      });
    }
  };

  const formatDateKYC = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const handleSetCKYC = (e, name) => {
    // debugger;
    if (name === "idNo") {
      if (e.target.value.length <= 10) {
        Ckycj.idNo = e.target.value;
        ID.Pan = e.target.value;
        console.log("Ckycj", Ckycj.idNo);
        console.log("ID", ID.Pan);
      }
    } else if (name === "dateOfBirth") {
      console.log("eeeeee", e);
      if (e.length === 0) {
        lproposer.ProposerDetails.DOB = e.target.value;
        const dob = { dobe: Ckycj.dob };
        Ckycj.dob = formatDateKYC(dob.dobe);
      } else if (e.length <= 10) {
        Ckycj.dob = formatDateKYC(e);
      }
    } else if (name === "GSTIN") {
      const gstRegex = /[!@#$%^&*()_+{}:;<>,.?~]/;
      if (e.target.value.length <= 15 && !gstRegex.test(e.target.value)) {
        Ckycj.idNo = e.target.value;
        Ckycj.idType = name;
        ID.GSTIN = e.target.value;
      }
    } else if (name === "CIN") {
      const gstRegex = /[!@#$%^&*()_+{}:;<>,.?~]/;
      if (e.target.value.length <= 21 && !gstRegex.test(e.target.value)) {
        Ckycj.idNo = e.target.value;
        Ckycj.idType = name;
        ID.CIN = e.target.value;
      }
    } else if (name === "AadharID") {
      const gstRegex = /^[0-9]*$/;
      if (e.target.value.length <= 4 && gstRegex.test(e.target.value)) {
        lproposer.ProposerDetails.AadharID = e.target.value;
      }
    } else if (name === "AadharMobileNo") {
      const gstRegex = /^[0-9]*$/;
      if (e.target.value.length <= 10 && gstRegex.test(e.target.value)) {
        lproposer.ProposerDetails.AadharMobileNo = e.target.value;
      }
    } else if (name === "AadharGender") {
      const gstRegex = /[!@#$%^&*()_+{}:;<>,.?~]/;
      if (e.target.value.length <= 21 && !gstRegex.test(e.target.value)) {
        lproposer.ProposerDetails.AadharGender = e.target.value;
      }
    } else if (name === "AadharName") {
      const nameReg = /^[a-zA-Z\s]*$/;
      if (e.target.value.length <= 50 && nameReg.test(e.target.value)) {
        lproposer.ProposerDetails.AadharName = e.target.value;
      }
    }

    setIdType((prevState) => ({ ...prevState, ID }));
    setCKYCReqJson((prevState) => ({ ...prevState, Ckycj }));
    setJson({ ...lproposer });
    console.log("reqJSON1", Ckycj);
    console.log("id", ID);
  };

  const handleSendCkycRegMail = async () => {
    // debugger;
    console.log("QuoteNo", lproposer["Quotation No"]);
    console.log("23456", lproposer && lproposer.ProposerDetails && lproposer.QuoteEmail);
    const notificationReq = {
      notificationRequests: [
        {
          templateKey: "BGR_Ckyclink",
          sendEmail: false,
          isEmailBody: true,
          notificationPayload: JSON.stringify({ CkycUrl: CKYCData.result.manualKYCurl }),
        },
      ],
      sendEmail: true,
      subject: "CKYC Registration Link",
      toEmail: lproposer && lproposer.ProposerDetails && lproposer.QuoteEmail,
    };
    const mail = await CPMCkycRegMail(notificationReq);
    console.log("mail", mail);
    if (mail.data.status === 1) {
      swal({
        text: `Link shared to register for CKYC Successfully.`,
        icon: "success",
      });
      setCkycEmailFlag(false);
    }
  };

  // Ckyc Update status
  const handleCkycUpdateStatus = async () => {
    await GetCkycUpdateStatus(CkycUpdateJson).then((data1) => {
      setCKYCUpdateData(data1);
      console.log("CKYCUpdateData", CKYCUpdateData);
      setCKYCStatus(data1.status);
      console.log("CKYCresponseS", data1);
      console.log("CKYC Status", CKYCStatus, data1.status);
      console.log("Ckycj", CkycUpdateJson);
      if (data1.status === "success") {
        setKYCSecDisable(true);
        setCkycEmailFlag(true);
        setUpdateFlag(true);
        lproposer.CkycDetails = data1;
        lproposer.CkycStatus = data1.status;
        setJson({ ...lproposer });
        Ckycj.dob = data1.result.dob;
        ID.idNo = data1.result.pan;
        const ProposerDetailsData = lproposer.ProposerDetails;
        if (data1.result.uploadedDocument === "CIN") {
          ID.CIN = data1?.result?.idNo;
          lproposer.ProposerDetails.CIN = data1?.result?.idNo;
        }
        if (data1.result.uploadedDocument === "GSTIN") {
          ID.GSTIN = data1?.result?.idNo;
          lproposer.ProposerDetails.GSTNumber = data1?.result.idNo;
        }
        if (data1.result.uploadedDocument === "GSTIN" || data1.result.uploadedDocument === "CIN") {
          ProposerDetailsData["First Name"] = data1.result.name;
          lproposer.ProposerDetails["Last Name"] = "";
        } else {
          ProposerDetailsData["First Name"] = data1.result.name;
          ProposerDetailsData["Last Name"] = lproposer.ProposerDetails["Last Name"];
          ProposerDetailsData.AadharName = data1.result.name;
        }
        // ProposerDetailsData.DOB = data1.result.dob;
        if (data1.result.dob === null || data1.result.dob === "") {
          Ckycj.dob = data1.result.ckycDate;
          ProposerDetailsData.DOB = data1.result.ckycDate;
        } else {
          ProposerDetailsData.DOB =
            lproposer.CustomerType === "Individual"
              ? data1.result.dob
              : formatDateKYC(data1.result.dob);
          Ckycj.dob =
            lproposer.CustomerType === "Individual"
              ? data1.result.dob
              : formatDateKYC(data1.result.dob);
        }
        if (data1.result.maskedAadhaarNumber !== "") {
          lproposer.ProposerDetails.AadharID = data1.result.maskedAadhaarNumber.substring(
            data1.result.maskedAadhaarNumber.length - 4
          );
        }

        if (data1.result.email === "" || data1.result.email === null) {
          ProposerDetailsData["Email ID"] = lproposer.QuoteEmail;
          ProposerDetailsData.PermanentAddress["Email ID"] = lproposer.QuoteEmail;
        } else {
          ProposerDetailsData.PermanentAddress["Email ID"] = data1.result.email;
          ProposerDetailsData["Email ID"] = data1.result.email;
        }
        if (data1.result.mobileNumber === "" || data1.result.mobileNumber === null) {
          ProposerDetailsData["Mobile Number"] = lproposer.QuoteMobileNo;
          ProposerDetailsData.PermanentAddress["Mobile Number"] = lproposer.QuoteMobileNo;
          lproposer.ProposerDetails.AadharMobileNo = lproposer.QuoteMobileNo;
        } else {
          ProposerDetailsData["Mobile Number"] = data1.result.mobileNumber;
          ProposerDetailsData.PermanentAddress["Mobile Number"] = data1.result.mobileNumber;
          lproposer.ProposerDetails.AadharMobileNo = data1.result.mobileNumber;
        }
        if (data1.result.pincode === "") {
          setPincode(false);
        } else {
          setPincode(true);
          lproposer.ProposerDetails.PermanentAddress.Pincode = data1.result.pincode;
          setJson({ ...lproposer });
        }
        // ProposerDetailsData["Mobile Number"] = data1.result.mobileNumber;
        // ProposerDetailsData.PermanentAddress["Mobile Number"] = data1.result.mobileNumber;
        // ProposerDetailsData["Email ID"] = data1.result.email;
        // ProposerDetailsData.PermanentAddress["Email ID"] = data1.result.email;
        // ProposerDetailsData["Mobile Number"] = data1.result.mobileNumber;
        // ProposerDetailsData["Email ID"] = data1.result.email;
        // ProposerDetailsData.CommunicationAddress.Address1 = data1.result.address;
        ProposerDetailsData.PermanentAddress.AddressLine1 = data1.result.address;
        ProposerDetailsData.PermanentAddress.AddressLine2 = data1.result.address2;
        // ProposerDetailsData["PAN Number"] = data1.result.pan;
        if (data1.result.pan === "") {
          ProposerDetailsData.PanNo = ID.Pan;
        } else {
          ID.Pan = data1.result.pan;
          ProposerDetailsData.PanNo = data1.result.pan;
        }
        ProposerDetailsData.PinCode = data1.result.pincode;
        setDate((prev) => ({ ...prev, dateOfBirth: Ckycj.dob }));
        // setPermAddress((prev) => ({ ...prev, permAddress1 }));
        setJson((prev) => ({ ...prev, ProposerDetails: ProposerDetailsData }));
      }

      if (data1.status === "failure") {
        setCkycEmailFlag(false);
        setKYCSecDisable(true);
        setUpdateFlag(false);
        setPincode(true);
      }
      setIdType((prev) => ({ ...prev, ID }));
      // setCKYCData((prevState) => ({ ...prevState, CKYCData: data }));
      setJson((prevState) => ({ ...prevState, CkycStatus: data1.status, CkycDetails: data1 }));
      setJson({ ...lproposer });
    });
    await callUpdateQuoteMethod(lproposer);
    // await GetProposalByNumber(lproposer);
    await postRequest(`Policy/UpdateProposalDetails`, lproposer);
  };

  const handleSetProposer = (e) => {
    if (e.target.name === "First Name") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          lproposer.ProposerDetails[e.target.name] = e.target.value;
          setJson((prevState) => ({
            ...prevState,
            ...lproposer,
          }));
        }
      }
    } else if (e.target.name === "Last Name") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          lproposer.ProposerDetails[e.target.name] = e.target.value;
          setJson((prevState) => ({
            ...prevState,
            ...lproposer,
          }));
        }
      }
    } else if (e.target.name === "Email ID") {
      if (e.target.value.length < 50) {
        lproposer.ProposerDetails[e.target.name] = e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...lproposer,
        }));
      }
    } else if (e.target.name === "Mobile Number") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        lproposer.ProposerDetails[e.target.name] = e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...setJson,
        }));
      }
    }
  };

  const handleSetOther = (e) => {
    if (e.target.name === "GSTNumber") {
      const gstRegex = /[!@#$%^&*()_+{}:;<>,.?~]/;
      if (!gstRegex.test(e.target.value)) {
        lproposer.ProposerDetails[e.target.name] = e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...lproposer,
        }));
      }
    } else if (e.target.name === "PanNo") {
      lproposer.ProposerDetails[e.target.name] = e.target.value;
      setJson((prevState) => ({
        ...prevState,
        ...lproposer,
      }));
    }
  };

  const handleFieldValidation = (e) => {
    if (e.target.name === "Email ID") {
      const emailReg =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/i;
      if (!emailReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailflag: false }));
      }
    } else if (e.target.name === "Mobile Number") {
      const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!mobileRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, mobileFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, mobileFlag: false }));
      }
    } else if (e.target.name === "AadharMobileNo") {
      const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!mobileRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, AadharMobileNo: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, AadharMobileNo: false }));
      }
    }
  };

  const handlevalidChange = (event) => {
    if (event.target.name === "GSTIN") {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, gstflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, gstflag: false }));
      }
    } else if (event.target.name === "idNo") {
      const PanRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!PanRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, panflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, panflag: false }));
      }
    }
  };

  const handlevalidother = (event) => {
    if (event.target.name === "GSTNumber") {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(event.target.value)) {
        setGST(true);
      } else {
        setGST(false);
      }
    } else if (event.target.name === "PanNo") {
      const PanRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!PanRegex.test(event.target.value)) {
        setPAN(true);
      } else {
        setPAN(false);
      }
    }
  };

  const handleAutoComplete = (e, type, value) => {
    if (type === "Salutation") {
      masterArray[type] = value.mValue;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      lproposer.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      if (value.mValue === "Mr.") {
        masterArray.Gender = {
          mID: 2,
          mValue: "Male",
          mType: "Gender",
          mIsRequired: false,
          isActive: null,
        };
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        lproposer.ProposerDetails.Gender = "Male";
      } else if (value.mValue === "Mrs." || value.mValue === "Ms.") {
        masterArray.Gender = {
          mID: 1,
          mValue: "Female",
          mType: "Gender",
          mIsRequired: false,
          isActive: null,
        };
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        lproposer.ProposerDetails.Gender = "Female";
      } else {
        masterArray.Gender = { mID: "", mValue: "" };
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        lproposer.ProposerDetails.Gender = "";
      }
      // setMaster((prevState) => ({ ...prevState, Salutation: { mID: "", mValue: "" } }));
    }
    if (type === "Gender") {
      masterArray[type] = value;
      console.log(value, "gendervalue");
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      lproposer.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      // setMaster((prevState) => ({ ...prevState, Gender: { mID: "", mValue: "" } }));
    }
    // setMaster((prevState) => ({ ...prevState, PolicyType: value }));
    setJson((prevState) => ({
      ...prevState,
      ...lproposer,
    }));
  };

  const handleCommunicationAddressChange = (e) => {
    if (e.target.name === "Pincode") {
      const pincodeValue = e.target.value;
      if (pincodeValue === "") {
        lproposer.ProposerDetails.CommunicationAddress.District = "";
        lproposer.ProposerDetails.CommunicationAddress.State = "";
        lproposer.ProposerDetails.CommunicationAddress.City = "";
        setJson({ ...lproposer });
      }
      const pincodeRegex = /^[0-9]*$/;
      if (!pincodeRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        lproposer.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...lproposer,
        }));
      }
    } else if (e.target.name === "Mobile Number") {
      const mobileRegex = /^[0-9]*$/;
      if (!mobileRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        lproposer.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...lproposer,
        }));
      }
    }
    if (e.target.name !== "Pincode" && e.target.name !== "Mobile Number") {
      lproposer.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
      setJson((prevState) => ({
        ...prevState,
        ...lproposer,
      }));
      console.log("new", Json);
    }
  };

  // const getPincodeDetails = async (pincodeValue) => {
  //   const ProductId = 782;
  //   const getPincodeDistrictStateData = async (type, id) => {
  //     const urlString = `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${type}`;
  //     let payload;
  //     switch (type) {
  //       case "State":
  //         payload = { State_Code: id };
  //         break;
  //       case "District":
  //         payload = { District_ID_PK: id };
  //         break;
  //       case "City":
  //         payload = { City_ID: id };
  //         break;
  //       case "Pincode":
  //         payload = { Pincode: id };
  //         break;
  //       default:
  //         break;
  //     }

  //     const dataValue = await (await postRequest(urlString, payload)).data;
  //     return dataValue;
  //   };

  //   const pincodeData = await getPincodeDistrictStateData("Pincode", pincodeValue);
  //   if (pincodeData.status === 7) {
  //     setPincodeError(true);
  //   } else {
  //     setPincodeError(false);-
  // tStateData("District", city[0].DistrictID);
  //   const state = await getPincodeDistrictStateData("State", city[0].State_CD);
  //   return { pinCode: pincodeData, city, district, state };
  // };

  useEffect(async () => {
    if (lproposer.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
      // const abc = await getPincodeDetails(lproposer.ProposerDetails.CommunicationAddress.Pincode);
      const ProductId = 782;
      const obj = { Pincode: lproposer.ProposerDetails.CommunicationAddress.Pincode };
      const abc = await postRequest(
        `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=PinCode`,
        obj
      );
      console.log("abc", abc);
      if (abc.status === 7) {
        setCommPincode([]);
        lproposer.ProposerDetails.CommunicationAddress.City = "";
        setJson((prev) => ({ ...prev, lproposer }));
        setPincodeError(true);
      } else {
        setCommPincode(abc.data);
        setPincodeError(false);
      }

      // lproposer.ProposerDetails.CommunicationAddress.District = abc.district[0].District_Name;
      // lproposer.ProposerDetails.CommunicationAddress.City = abc.district[0].District_Name;
      // lproposer.ProposerDetails.CommunicationAddress.State = abc.state[0].State_Name;
      // lproposer.ProposerDetails.CommunicationAddress.Districtcode = abc.city[0].CityDistrict_CD;
      // lproposer.ProposerDetails.CommunicationAddress.Statecode = abc.city[0].State_CD;
      // setJson((prevState) => ({
      //   ...prevState,
      //   ...lproposer,
      // }));
    }
  }, [lproposer.ProposerDetails.CommunicationAddress.Pincode]);

  useEffect(async () => {
    if (lproposer.ProposerDetails.PermanentAddress.Pincode.length === 6) {
      // const abc = await getPincodeDetails(lproposer.ProposerDetails.PermanentAddress.Pincode);
      const ProductId = 782;
      const obj = { Pincode: lproposer.ProposerDetails.PermanentAddress.Pincode };
      const abc = await postRequest(
        `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=PinCode`,
        obj
      );
      console.log("abc", abc);
      if (abc.status === 7) {
        setPermPincode([]);
        lproposer.ProposerDetails.PermanentAddress.City = "";
        setJson((prev) => ({ ...prev, lproposer }));
        setPincodeError(true);
      } else {
        setPermPincode(abc.data);
        setPincodeError(false);
      }

      // lproposer.ProposerDetails.PermanentAddress.District = abc.district[0].District_Name;
      // lproposer.ProposerDetails.PermanentAddress.City = abc.district[0].District_Name;
      // lproposer.ProposerDetails.PermanentAddress.State = abc.state[0].State_Name;
      // lproposer.ProposerDetails.PermanentAddress.Districtcode = abc.city[0].CityDistrict_CD;
      // lproposer.ProposerDetails.PermanentAddress.Statecode = abc.city[0].State_CD;
      // setJson((prevState) => ({
      //   ...prevState,
      //   ...lproposer,
      // }));
    }
  }, [lproposer.ProposerDetails.PermanentAddress.Pincode]);

  const handlePermanentAddressChange = async (e) => {
    if (e.target.name === "Pincode") {
      const pincodeValue = e.target.value;
      if (pincodeValue === "") {
        lproposer.ProposerDetails.PermanentAddress.District = "";
        lproposer.ProposerDetails.PermanentAddress.State = "";
        lproposer.ProposerDetails.PermanentAddress.City = "";
        setJson({ ...lproposer });
      }
      const pincodeRegex = /^[0-9]{0,6}$/;
      if (pincodeRegex.test(e.target.value)) {
        lproposer.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...lproposer,
        }));
      }
    } else {
      lproposer.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
      setJson((prevState) => ({
        ...prevState,
        ...lproposer,
      }));
    }
  };

  const handlePermanentAddSameComm = (e) => {
    if (CKYCStatus === "failure") {
      swal({
        icon: "error",
        text: "CKYC failed. Complete the KYC verification",
      });
    } else {
      lproposer.ProposerDetails.CommunicationSameAsPermanent = e.target.value;
      if (lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes") {
        lproposer.ProposerDetails.CommunicationAddress.AddressLine1 =
          lproposer.ProposerDetails.PermanentAddress.AddressLine1;
        lproposer.ProposerDetails.CommunicationAddress.AddressLine2 =
          lproposer.ProposerDetails.PermanentAddress.AddressLine2;
        lproposer.ProposerDetails.CommunicationAddress.Pincode =
          lproposer.ProposerDetails.PermanentAddress.Pincode;
        lproposer.ProposerDetails.CommunicationAddress.District =
          lproposer.ProposerDetails.PermanentAddress.District;
        lproposer.ProposerDetails.CommunicationAddress.City =
          lproposer.ProposerDetails.PermanentAddress.City;
        lproposer.ProposerDetails.CommunicationAddress.State =
          lproposer.ProposerDetails.PermanentAddress.State;
        lproposer.ProposerDetails.CommunicationAddress["Email ID"] =
          lproposer.ProposerDetails.PermanentAddress["Email ID"];
        lproposer.ProposerDetails.CommunicationAddress["Mobile Number"] =
          lproposer.ProposerDetails.PermanentAddress["Mobile Number"];
        lproposer.ProposerDetails.CommunicationAddress.Districtcode =
          lproposer.ProposerDetails.PermanentAddress.Districtcode;
        lproposer.ProposerDetails.CommunicationAddress.Statecode =
          lproposer.ProposerDetails.PermanentAddress.Statecode;
        // setAddressflag(true);
      } else if (lproposer.ProposerDetails.CommunicationSameAsPermanent === "No") {
        lproposer.ProposerDetails.CommunicationAddress.AddressLine1 = "";
        lproposer.ProposerDetails.CommunicationAddress.AddressLine2 = "";
        lproposer.ProposerDetails.CommunicationAddress.Pincode = "";
        lproposer.ProposerDetails.CommunicationAddress.District = "";
        lproposer.ProposerDetails.CommunicationAddress.City = "";
        lproposer.ProposerDetails.CommunicationAddress.State = "";
        lproposer.ProposerDetails.CommunicationAddress["Email ID"] = "";
        lproposer.ProposerDetails.CommunicationAddress["Mobile Number"] = "";
        // setAddressflag(false);
      }

      setJson((prevState) => ({
        ...prevState,
        ...lproposer,
      }));
    }
  };
  const handlePermPin = async (e, value) => {
    lproposer.ProposerDetails.PermanentAddress.City = value.mValue;
    const data = await getPincodeDetails(value.City_ID);
    lproposer.ProposerDetails.PermanentAddress.District = data.district[0].District_Name;
    lproposer.ProposerDetails.PermanentAddress.State = data.state[0].State_Name;
    lproposer.ProposerDetails.PermanentAddress.Districtcode = data.city[0].CityDistrict_CD;
    lproposer.ProposerDetails.PermanentAddress.Statecode = data.city[0].State_CD;
    setJson((prevState) => ({
      ...prevState,
      ...lproposer,
    }));
  };

  const handlecommpin = async (e, value) => {
    if (CKYCStatus === "failure") {
      swal({
        icon: "error",
        text: "CKYC failed. Complete the KYC verification",
      });
    } else {
      lproposer.ProposerDetails.CommunicationAddress.City = value.mValue;
      const data = await getPincodeDetails(value.City_ID);
      lproposer.ProposerDetails.CommunicationAddress.District = data.district[0].District_Name;
      lproposer.ProposerDetails.CommunicationAddress.State = data.state[0].State_Name;
      lproposer.ProposerDetails.CommunicationAddress.Districtcode = data.city[0].CityDistrict_CD;
      lproposer.ProposerDetails.CommunicationAddress.Statecode = data.city[0].State_CD;
      setJson((prevState) => ({
        ...prevState,
        ...lproposer,
      }));
    }
  };

  useEffect(() => {
    if (lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes") {
      lproposer.ProposerDetails.CommunicationAddress.AddressLine1 =
        lproposer.ProposerDetails.PermanentAddress.AddressLine1;
      lproposer.ProposerDetails.CommunicationAddress.AddressLine2 =
        lproposer.ProposerDetails.PermanentAddress.AddressLine2;
      lproposer.ProposerDetails.CommunicationAddress.Pincode =
        lproposer.ProposerDetails.PermanentAddress.Pincode;
      lproposer.ProposerDetails.CommunicationAddress.District =
        lproposer.ProposerDetails.PermanentAddress.District;
      lproposer.ProposerDetails.CommunicationAddress.City =
        lproposer.ProposerDetails.PermanentAddress.City;
      lproposer.ProposerDetails.CommunicationAddress.State =
        lproposer.ProposerDetails.PermanentAddress.State;
      lproposer.ProposerDetails.CommunicationAddress["Email ID"] =
        lproposer.ProposerDetails.PermanentAddress["Email ID"];
      lproposer.ProposerDetails.CommunicationAddress["Mobile Number"] =
        lproposer.ProposerDetails.PermanentAddress["Mobile Number"];
      lproposer.ProposerDetails.CommunicationAddress.Districtcode =
        lproposer.ProposerDetails.PermanentAddress.Districtcode;
      lproposer.ProposerDetails.CommunicationAddress.Statecode =
        lproposer.ProposerDetails.PermanentAddress.Statecode;
    }
  }, [lproposer]);

  const handlevalidate = (e) => {
    if (e.target.name === "Email ID") {
      const emialReg = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
      if (!emialReg.test(e.target.value)) {
        setEmailFlag(true);
      } else {
        setEmailFlag(false);
      }
    }
    if (e.target.name === "Mobile Number") {
      const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!mobileRegex.test(e.target.value)) {
        setMobileFlag(true);
      } else {
        setMobileFlag(false);
      }
    }
  };

  const handleHypothecation = (e, valuess, name) => {
    if (name === "Hypothecation") {
      const updatedLproposer = { ...lproposer, [name]: valuess.mValue };
      if (valuess.mValue === "No") {
        updatedLproposer.BankName = "";
        updatedLproposer.BankbranchaddressName = "";
        updatedLproposer.LoanAccountNumber = "";
      }
      setJson(updatedLproposer);
    }
  };

  const handleBankDetails = (e) => {
    const { name, value } = e.target;
    if (name === "BankName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(value)) {
        setJson((prevState) => ({
          ...prevState,
          BankName: value,
        }));
      } else {
        setJson((prevState) => ({
          ...prevState,
          BankName: value.slice(0, -1),
        }));
      }
    } else if (name === "BankbranchaddressName" || name === "LoanAccountNumber") {
      if (value.length < 50) {
        // const bankReg = /^[a-zA-Z0-9\s]+$/;
        // if (bankReg.test(value)) {
        setJson((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else {
        setJson((prevState) => ({
          ...prevState,
          [name]: value.slice(0, -1),
        }));
      }
      // }
    }
  };
  useEffect(() => {
    getSalutation().then((result) => {
      setSalutationData([...result.data[0].mdata]);
    });
    getGender().then((result) => {
      setGenderData([...result.data[0].mdata]);
      console.log(genderData);
    });
  }, []);

  const handleAddDoc = () => {
    setDocUpload([
      ...docUpload,
      {
        DocName: "",
        DocId: docUpload.length + 1,
        DocType: "",
        DocRemarks: "",
        DocFlag: true,
        DMSDocId: "",
      },
    ]);
  };

  const handleclearicon = (idx) => {
    const filteredArray = docUpload.filter((x, i) => i !== idx);
    setDocUpload([...filteredArray]);
  };

  const UplaodDocData = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        const filteredData = { ...docUpload[index] };
        filteredData.DocName = result.data[0].fileName;
        filteredData.DocDate = new Date().toLocaleDateString();
        filteredData.DMSDocId = result.data[0].docid;
        docUpload.splice(index, 1, { ...filteredData });
        setDocUpload([...docUpload]);
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };
  const handleDocUpload = async (event, index) => {
    if (docUpload[index].DocType === "") {
      swal({
        icon: "error",
        text: "Please select the Document type before uploading",
      });
    } else {
      console.log("FILES", event.target.files[0]);
      const ext = event.target.files[0].name.split(".").pop(1);
      const fsize = event.target.files[0].size;
      const file = Math.round(fsize / 1024);
      const filteredData = { ...docUpload[index] };
      filteredData.DocExtension = ext;
      docUpload.splice(index, 1, { ...filteredData });
      setDocUpload([...docUpload]);
      if (ext === "png" || ext === "jpeg" || ext === "pdf") {
        if (file <= 5120) {
          await UplaodDocData(event.target.files[0], index);
        } else {
          swal({
            icon: "error",
            text: "Please upload the file which is less than 5MB",
          });
        }
      } else {
        swal({
          icon: "error",
          text: "Please upload the file with valid extentions",
        });
      }
    }
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file1.target.value = "";
  };

  const handleDeleteFile = async (file, index) => {
    const fileName = file.name;
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        const filteredData = { ...docUpload[index] };
        filteredData.DocName = "";
        filteredData.DocDate = "";
        filteredData.DocExtension = "";
        docUpload.splice(index, 1, { ...filteredData });
        setDocUpload([...docUpload]);
      }
    });
  };

  const generateFile1 = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    link.click();
  };

  const handleFileDownload = async (dwnfile) => {
    console.log(dwnfile);
    await ViewFiles(dwnfile).then((result) => {
      console.log("result", result);
      if (result.data !== "") {
        generateFile1(result.data.data, dwnfile);
      }
    });
  };

  const handleDocType = (e, value, idx) => {
    const filteredData = { ...docUpload[idx] };
    filteredData.DocType = value.mValue;
    docUpload.splice(idx, 1, { ...filteredData });
    setDocUpload([...docUpload]);
  };

  const handleDocRemarks = (e, idx) => {
    const filteredData = { ...docUpload[idx] };
    filteredData.DocRemarks = e.target.value;
    docUpload.splice(idx, 1, { ...filteredData });
    setDocUpload([...docUpload]);
  };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    console.log("FilenameQuote", link.download);

    link.click();
  };

  const handleproposal = async (proposalNumber) => {
    // console.log("Proposalll", ProposalData.proposalNumber);
    console.log("proposal", proposalNumber);
    const downloadDTO = {
      key: proposalNumber,
      templateId: 198,
      referenceId: "",
    };
    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNumber);
      }
    });
  };

  const handelPincodeValid = async (e) => {
    if (lproposer.ProposerDetails.PermanentAddress.Pincode) {
      if (e.target.value.length !== 6) {
        setFlags((prevState) => ({ ...prevState, pinFlag: true }));
      } else {
        const abcd = await getPincodeDetails(lproposer.ProposerDetails.PermanentAddress.Pincode);
        lproposer.ProposerDetails.PermanentAddress.City = abcd.district[0].District_Name;
        lproposer.ProposerDetails.PermanentAddress.State = abcd.state[0].State_Name;
        setJson({ ...lproposer });
        setFlags((prevState) => ({ ...prevState, pinFlag: false }));
      }
    }
    if (lproposer.ProposerDetails.CommunicationAddress.Pincode) {
      if (e.target.value.length !== 6) {
        setFlags((prevState) => ({ ...prevState, pincodeFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, pincodeFlag: false }));
      }
    }
  };

  // const Handleuploadpan = () => {
  //   // debugger;
  //   const pan = docUpload.some((x) => x.DocType === "");
  //   const panem = docUpload.some((x) => x.DocType !== "PAN copy");
  //   console.log("1234567890", pan, panem);
  //   if (
  //     lproposer.PremiumDetails["Total with Tax"] > 100000 &&
  //     (docUpload.some((x) => x.DocType === "") || docUpload.some((x) => x.DocType !== "PAN copy"))
  //   ) {
  //     setPanupload(true);
  //   } else {
  //     setPanupload(false);
  //   }
  // };

  const callProposal = async () => {
    setloadingflag(true);
    console.log("callProposal....");
    const obj = {
      ...lproposer,
      DocumentDetails: docUpload[0].DocName === "" ? [] : docUpload,
    };
    console.log("obj:", obj);
    setJson((prev) => ({ ...prev, ...obj }));
    if (proposalNoo !== null || updateflag === true) {
      await postRequest(`Policy/UpdateProposalDetails`, obj).then(async (result) => {
        console.log("result", result);
        // setJson((prev) => ({ ...prev, ...lproposer }));
        handleproposal(obj.ProposalNo);
        CPMProposalMail(obj.ProposalNo, lproposer.QuoteEmail);
        setloadingflag(false);
        await callUpdateQuoteMethod(lproposer);
        if (CKYCStatus !== "failure") {
          handleNext();
        }
      });
    } else {
      await callSaveProposalMethod(obj).then(async (result) => {
        lproposer.proposalNumber = result.data.proposalNumber;
        lproposer.ProposalNo = lproposer.proposalNumber;
        console.log("proposalNumber", lproposer);
        setJson((prev) => ({ ...prev, ...lproposer }));
        handleproposal(result.data.proposalNumber);
        CPMProposalMail(result.data.proposalNumber, lproposer.QuoteEmail);
        setloadingflag(false);
        if (CKYCStatus !== "failure") {
          await callUpdateQuoteMethod(lproposer);
          handleNext();
        }
      });
    }
  };

  const onNext = async () => {
    // debugger;
    if (lproposer.CustomerType === "Individual") {
      console.log("individual");
      // Handleuploadpan();
      if (
        lproposer.ProposerDetails.Salutation === "" ||
        lproposer.ProposerDetails.Gender === "" ||
        lproposer.ProposerDetails.Name === "" ||
        // lproposer.ProposerDetails.DOB === "" ||
        lproposer.ProposerDetails.CommunicationAddress.Pincode === "" ||
        lproposer.ProposerDetails.CommunicationAddress.AddressLine1 === "" ||
        lproposer.ProposerDetails.PermanentAddress.City === "" ||
        lproposer.ProposerDetails.CommunicationSameAsPermanent === "" ||
        lproposer.ProposerDetails.PermanentAddress.AddressLine1 === "" ||
        lproposer.ProposerDetails.CommunicationAddress.City === "" ||
        lproposer.ProposerDetails.PermanentAddress.Pincode === "" ||
        lproposer.Hypothecation === "" ||
        checkDisclaimer === false ||
        checkProposalConsent === false ||
        checkInsurance === false ||
        OTP === ""
      ) {
        setProposerError(true);
        swal({
          icon: "error",
          text: "Please fill the required fields",
        });
      } else if (flags.emailflag === true && flags.mobileFlag === false) {
        swal({
          icon: "error",
          text: "Please fill valid E-Mail ID",
        });
      } else if (flags.mobileFlag === true && flags.emailflag === false) {
        swal({
          icon: "error",
          text: "Please fill valid Mobile Number",
        });
      } else if (flags.emailflag === true && flags.mobileFlag === true) {
        swal({
          icon: "error",
          text: "Please fill valid Email ID and Mobile Number",
        });
      } else if (CKYCStatus === "") {
        swal({
          icon: "error",
          text: "Please initiate KYC before you proceed to payment",
        });
      } else if (
        PincodeError === true ||
        lproposer.ProposerDetails.CommunicationAddress.Pincode.length !== 6 ||
        lproposer.ProposerDetails.PermanentAddress.Pincode.length !== 6
      ) {
        swal({
          icon: "error",
          text: "Enter Valid Pincode",
        });
      } else if (GST === true && lproposer.ProposerDetails.GSTNumber !== "") {
        swal({
          icon: "error",
          text: "Enter GST Number",
        });
      } else if (PAN === true && lproposer.ProposerDetails.PanNo !== "") {
        swal({
          icon: "error",
          text: "Please fill PAN number",
        });
      } else if (otpflag === false) {
        swal({
          icon: "error",
          text: "Please verify Otp",
        });
        // } else if (panupload === true) {
        //   swal({
        //     icon: "error",
        //     text: "PAN card upload is mandatory",
        //   });
      } else if (lproposer.Hypothecation === "Yes") {
        if (
          lproposer.BankName === "" ||
          lproposer.BankbranchaddressName === "" ||
          lproposer.LoanAccountNumber === ""
        ) {
          setProposerError(true);
          swal({
            icon: "error",
            text: "Please fill the required fields",
          });
        } else {
          setProposerError(false);
          await callProposal();
        }
      } else if (CKYCStatus === "failure") {
        await callProposal();
        swal({
          icon: "error",
          text: "CKYC failed",
        });
      } else {
        setProposerError(false);
        await callProposal();
      }
    } else if (lproposer.CustomerType === "Corporate") {
      console.log("Corporate");
      // Handleuploadpan();
      if (
        lproposer.ProposerDetails["First Name"] === "" ||
        lproposer.PolicyStartDate === "" ||
        lproposer.ProposerDetails.CommunicationAddress.Pincode === "" ||
        lproposer.ProposerDetails.CommunicationAddress.AddressLine1 === "" ||
        lproposer.ProposerDetails.CommunicationAddress.City === "" ||
        lproposer.ProposerDetails.CommunicationSameAsPermanent === "" ||
        lproposer.ProposerDetails.PermanentAddress.AddressLine1 === "" ||
        lproposer.ProposerDetails.PermanentAddress.City === "" ||
        lproposer.ProposerDetails.PermanentAddress.Pincode === "" ||
        lproposer.Hypothecation === "" ||
        checkDisclaimer === false ||
        checkProposalConsent === false ||
        checkInsurance === false ||
        OTP === ""
        // ||
        // PolicyDto.InsurableItem[0].RiskItems[0].GSTNo === ""
      ) {
        setProposerError(true);
        swal({
          icon: "error",
          text: "Please fill the required fields",
        });
      } else if (flags.emailflag === true && flags.mobileFlag === false) {
        swal({
          icon: "error",
          text: "Please fill valid E-Mail ID",
        });
      } else if (flags.mobileFlag === true && flags.emailflag === false) {
        swal({
          icon: "error",
          text: "Please fill valid Mobile Number",
        });
      } else if (flags.emailflag === true && flags.mobileFlag === true) {
        swal({
          icon: "error",
          text: "Please fill valid Email ID and Mobile Number",
        });
      } else if (CKYCStatus === "") {
        swal({
          icon: "error",
          text: "Please initiate KYC before you proceed to payment",
        });
      } else if (
        PincodeError === true ||
        lproposer.ProposerDetails.CommunicationAddress.Pincode.length !== 6 ||
        lproposer.ProposerDetails.PermanentAddress.Pincode.length !== 6
      ) {
        swal({
          icon: "error",
          text: "Enter Valid Pincode",
        });
      } else if (GST === true && lproposer.ProposerDetails.GSTNumber !== "") {
        swal({
          icon: "error",
          text: "Enter GST Number",
        });
      } else if (PAN === true && lproposer.ProposerDetails.PanNo !== "") {
        swal({
          icon: "error",
          text: "Please fill PAN number",
        });
      } else if (otpflag === false) {
        swal({
          icon: "error",
          text: "Please verify Otp",
        });
        // } else if (panupload === true) {
        //   swal({
        //     icon: "error",
        //     text: "PAN card upload is mandatory",
        //   });
      } else if (lproposer.Hypothecation === "Yes") {
        if (
          lproposer.BankName === "" ||
          lproposer.BankbranchaddressName === "" ||
          lproposer.LoanAccountNumber === ""
        ) {
          setProposerError(true);
          swal({
            icon: "error",
            text: "Please fill the required fields",
          });
        } else {
          setProposerError(false);
          await callProposal();
        }
      } else if (CKYCStatus === "failure") {
        await callProposal();
        swal({
          icon: "error",
          text: "CKYC failed",
        });
      } else {
        setProposerError(false);
        await callProposal();
      }
    }
  };

  const onBack = () => {
    setBackFlag(true);
    handleBack();
  };

  const handleCheckBox = async (e) => {
    if (CKYCStatus === "failure") {
      swal({
        icon: "error",
        text: "CKYC failed. Complete the KYC verification",
      });
    } else {
      setCheckProposalConsent(!checkProposalConsent);
      if (e.target.checked === true) {
        const jsonValue = {
          communicationId: 206,
          keyType: "BGRQuote",
          key: lproposer["Quotation No"],
          stakeHolderDetails: [
            {
              communicationType: "Email",
              stakeholderCode: "CUS",
              communicationValue: lproposer.QuoteEmail,
            },
          ],
        };
        await postRequest(`Notifications/EventCommunicationExecution`, jsonValue).then((resp) => {
          console.log("resp", resp);
        });

        const MobileNo = lproposer.QuoteMobileNo;
        const Message = `Dear customer,Quotation No. ${lproposer["Quotation No"]} is generated. Requesting to Pls provide your consent to proceed with the proposal.Best Regards,Universal Sompo General Insurance Co Ltd.`;
        await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
          console.log("1234567890", smsResp);
        });
      }
    }
  };

  const [showOTP, setShowOTP] = useState(false);

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const toggleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  const handleCheckDisclaimer = () => {
    setCheckDisclaimer(!checkDisclaimer);
  };

  const handleCheckInsurance = () => {
    setCheckInsurance(!checkInsurance);
  };
  // const datePlaceHolder = (format) => {
  //   const finalFormat = [];
  //   const deliMeter = format[1];
  //   const spiltFormat = format.split(deliMeter);
  //   spiltFormat.forEach((x) => {
  //     if (x === "d") finalFormat.push("DD");
  //     if (x === "m") finalFormat.push("MM");
  //     if (x === "Y") finalFormat.push("YYYY");
  //   });
  //   return finalFormat.join(deliMeter);
  // }
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

  const handleSendOTP = () => {
    if (lproposer.QuoteEmail === "") {
      swal({
        icon: "error",
        text: "Please enter  email ID",
      });
    } else {
      setStartCounterFlag(true);

      const sendOtp = {
        name: lproposer["Quotation No"],
        otp: "1234",
        email: lproposer.QuoteEmail,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: lproposer.QuoteMobileNo,
        sendSms: true,
        isBerry: false,
        client: process.env.REACT_APP_Client,
      };
      getOTP(sendOtp).then((res) => {
        if (res.status === 1) {
          setStatus(true);
        } else {
          setStatus(false);
        }
      });
    }
  };

  const [dispatch] = useDataController();
  const [verifyOtp, setVerifyOtp] = useState(false);

  const handleVerifyOTP = () => {
    // debugger;
    if (OTP === "") {
      swal({ icon: "error", text: "Please enter OTP" });
    } else {
      const verifyOTP = {
        otp: OTP,
        email: lproposer.QuoteEmail,
        mobileNumber: lproposer.QuoteMobileNo,
        userName: lproposer.QuoteEmail,
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };

      GetOTP(dispatch, verifyOTP).then((res) => {
        setStartCounterFlag(false);
        setCounter(0);
        console.log("res", res);
        if (res !== null) {
          if (res.status === 1) {
            setVerifyOtp(false);
            setOtpflag(true);
            swal({ icon: "success", text: "OTP verified successfully" });
          } else {
            setCheckDisclaimer(false);
            setCheckInsurance(false);
            setVerifyOtp(true);
            setOtpflag(false);
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          setCheckDisclaimer(false);
          setCheckInsurance(false);
          setVerifyOtp(true);
          setOtpflag(false);
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
    }
  };

  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}-${propformat(
      propdate.getMonth() + 1
    )}-${propdate.getFullYear()}`;
  };

  const handleCalculateAge = (date) => {
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();
    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    }
    // get months when current month is greater
    else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }
    // get days
    // let dateAge;
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      // dateAge = 31 + currentDate - dobDate;
      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    // group the age in a single variable
    return yearAge;
  };

  const handleDateChange1 = (value, label, type) => {
    // debugger;
    console.log("value", value);
    // const ProposerDetailsData = lproposer.ProposerDetails;
    // datetoShow.dateOfBirth = null;
    if (value !== null && isValid(new Date(value))) {
      const date = new Date(value);
      const year = date.getFullYear();
      if (year.toString().length === 4) {
        const dob = date.toLocaleDateString("en-ZA");
        const age = handleCalculateAge(dob);
        if (age < 18) {
          swal({
            icon: "error",
            text: "Age cannot be less than 18 Years",
          });
          setDate((prevState) => ({ ...prevState, [label]: null }));
          lproposer.ProposerDetails[type] = "";
          lproposer.ProposerDetails.DOB = "";
          lproposer.ProposerDetails.Age = "";
          // setDateToShow((prevState) => ({ ...prevState, [label]: null }));

          setJson((prevState) => ({
            ...prevState,
            ...lproposer,
          }));
        } else {
          setValidDate(false);
          // setDateToShow((prevState) => ({ ...prevState, [label]: value }));
          lproposer.ProposerDetails[type] = formatPropDate(value);
          lproposer.ProposerDetails.DOB = formatPropDate(value);
          lproposer.ProposerDetails.Age = age;

          setJson((prevState) => ({
            ...prevState,
            ...lproposer,
          }));
        }
        setFlags((prevState) => ({ ...prevState, Age: age }));
      } else {
        setValidDate(true);
        setDate((prevState) => ({ ...prevState, [label]: null }));
      }
    }
  };

  console.log("final result", Json);
  // const [ckycParmeter, setCkycParams] = useState("");
  const CkycParams = [
    { mID: 1, mValue: "PAN Number" },
    { mID: 2, mValue: "Aadhaar Number" },
  ];
  // const [PanCkycFlag, SetPanCkycFlag] = useState(false);
  // const [AaadharCkycFlag, SetAaadharCkycFlag] = useState(false);

  const handleSetValue = (e, value) => {
    // setCkycParams(value.mValue);
    lproposer.ProposerDetails.CKYCParam = value.mValue;
    setJson({ ...lproposer });

    if (value.mValue !== "PAN Number") {
      lproposer.ProposerDetails.AadharID = "";
      lproposer.ProposerDetails.AadharMobileNo = "";
      lproposer.ProposerDetails.AadharGender = "";
      lproposer.ProposerDetails.AadharName = "";
      Ckycj.dob = "";
    } else {
      lproposer.ProposerDetails.PanNo = "";
      Ckycj.dob = "";
    }
    setJson({ ...lproposer });

    // if (value.mValue === "PAN Number") {
    //   SetPanCkycFlag(true);
    //   SetAaadharCkycFlag(false);
    // } else if (value.mValue === "Aaadhar Number") {
    //   SetAaadharCkycFlag(true);
    //   SetPanCkycFlag(false);
    // }
  };

  return (
    <MDBox pt={3}>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
        open={loadingflag}
      >
        <CircularProgress />
      </Backdrop>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <MDTypography sx={{ color: "#000000", fontSize: "1rem", fontWeight: "bold" }}>
              Customer Type
            </MDTypography>
            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                value={lproposer.CustomerType}
                name="CustomerType"
                onChange={handleSetRadio}
                // defaultValue="Individual"
              >
                <FormControlLabel
                  value="Individual"
                  control={<CustomRadio />}
                  label="Individual"
                  disabled={kycSecDisable || CKYCStatus === "failure" || CKYCStatus === "success"}
                />
                <FormControlLabel
                  value="Corporate"
                  control={<CustomRadio />}
                  label="Corporate"
                  disabled={kycSecDisable || CKYCStatus === "failure" || CKYCStatus === "success"}
                />
              </RadioGroup>
            </ThemeProvider>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="CKYC Status"
            name="CKYC Status"
            value={CKYCStatus}
            disabled
            InputProps={{ disabled: true }}
          />
        </Grid>
      </Grid>
      {}

      {lproposer.CustomerType === "Individual" && (
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
                value={{ mValue: lproposer.ProposerDetails.CKYCParam }}
                onChange={handleSetValue}
                getOptionLabel={(option) => option.mValue}
                //   onChange={(e, value) => handleDocType(e, value, i)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Select ID Type"
                    sx={{
                      "& .MuiFormLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    required
                    disabled={
                      CKYCStatus === "success" ||
                      lproposer.CkycStatus === "success" ||
                      lproposer.CkycStatus === "failure"
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {lproposer.ProposerDetails.CKYCParam === "PAN Number" ? (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={1} mt={2}>
                <CkycParameterPan
                  lproposer={lproposer}
                  CKYCStatus={CKYCStatus}
                  datePlaceHolder={datePlaceHolder}
                  handleSetCKYC={handleSetCKYC}
                  ID={ID}
                  Ckycj={Ckycj}
                  // proposer={proposer}
                  handlevalidChange={handlevalidChange}
                  flags={flags}
                />
              </Grid>
            ) : null}
            {lproposer.ProposerDetails.CKYCParam === "Aadhaar Number" ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} ml={1} mt={2}>
                <CkycParameterAadhar
                  genderData={genderData}
                  handleSetAutoComplete={handleSetAutoComplete}
                  masterArray={masterArray}
                  ProposerError={ProposerError}
                  lproposer={lproposer}
                  // PolicyDto={PolicyDto}
                  Ckycj={Ckycj}
                  handleFieldValidation={handleFieldValidation}
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
      <Grid container spacing={2} mt={1}>
        {/* {individual === true && ( */}
        {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="PAN Number"
            name="idNo"
            required
            value={ID.Pan}
            onChange={(e) => handleSetCKYC(e, "idNo")}
            onBlur={handlevalidChange}
            InputProps={{
              disabled:
                kycSecDisable ||
                // failDisable ||
                (lproposer.CustomerType === "Corporate" && ID.GSTIN !== "") ||
                (lproposer.CustomerType === "Corporate" && ID.CIN !== "") ||
                CKYCStatus === "failure",
            }}
            disabled={
              kycSecDisable ||
              // failDisable ||
              (lproposer.CustomerType === "Corporate" && ID.GSTIN !== "") ||
              (lproposer.CustomerType === "Corporate" && ID.CIN !== "") ||
              CKYCStatus === "failure"
            }
          />
          {flags.panflag === true && ID.Pan !== "" ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "10px",
              }}
            >
              Enter Valid PAN Number
            </MDTypography>
          ) : null}
        </Grid> */}
        {lproposer.CustomerType === "Corporate" ? (
          <>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PAN Number"
                name="idNo"
                required
                value={ID.Pan}
                onChange={(e) => handleSetCKYC(e, "idNo")}
                onBlur={handlevalidChange}
                InputProps={{
                  disabled:
                    kycSecDisable ||
                    // failDisable ||
                    (lproposer.CustomerType === "Corporate" && ID.GSTIN !== "") ||
                    (lproposer.CustomerType === "Corporate" && ID.CIN !== "") ||
                    CKYCStatus === "failure",
                }}
                disabled={
                  kycSecDisable ||
                  // failDisable ||
                  (lproposer.CustomerType === "Corporate" && ID.GSTIN !== "") ||
                  (lproposer.CustomerType === "Corporate" && ID.CIN !== "") ||
                  CKYCStatus === "failure"
                }
              />
              {flags.panflag === true && ID.Pan !== "" ? (
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
                value={ID.GSTIN}
                required
                onChange={(e) => handleSetCKYC(e, "GSTIN")}
                onBlur={handlevalidChange}
                InputProps={{
                  disabled:
                    kycSecDisable ||
                    (lproposer.CustomerType === "Corporate" && ID.Pan !== "") ||
                    (lproposer.CustomerType === "Corporate" && ID.CIN !== "") ||
                    CKYCStatus === "failure",
                }}
                disabled={
                  kycSecDisable ||
                  (lproposer.CustomerType === "Corporate" && ID.Pan !== "") ||
                  (lproposer.CustomerType === "Corporate" && ID.CIN !== "") ||
                  CKYCStatus === "failure"
                }
              />
              {flags.gstflag === true && ID.GSTIN !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Enter Valid GST Number
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="CIN Number"
                name="CIN"
                value={ID.CIN}
                // required
                onChange={(e) => handleSetCKYC(e, "CIN")}
                InputProps={{
                  disabled:
                    kycSecDisable ||
                    (lproposer.CustomerType === "Corporate" && ID.GSTIN !== "") ||
                    (lproposer.CustomerType === "Corporate" && ID.Pan !== "") ||
                    CKYCStatus === "failure",
                }}
                disabled={
                  kycSecDisable ||
                  (lproposer.CustomerType === "Corporate" && ID.GSTIN !== "") ||
                  (lproposer.CustomerType === "Corporate" && ID.Pan !== "") ||
                  CKYCStatus === "failure"
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDDatePicker
                label={
                  lproposer.CustomerType === "Individual"
                    ? "Date of Birth"
                    : "Date of Incorporation"
                }
                input={{
                  label:
                    lproposer.CustomerType === "Individual"
                      ? "Date of Birth"
                      : "Date of Incorporation",
                  value: Ckycj.dob,
                  // allowInput: true,
                  // placeholder: datePlaceHolder("d-m-Y"),
                  // InputLabelProps: {
                  //   shrink: true,
                  // },
                  inputProps: {
                    disabled: kycSecDisable || CKYCStatus === "failure",
                  },
                }}
                id="DOB"
                name="DOB"
                value={Ckycj.dob}
                onChange={(e) => handleSetCKYC(e, "dateOfBirth")}
                Placeholder="Please select the dob"
                options={{
                  altFormat: "d-m-Y",
                  dateFormat: "d-m-Y",
                  altInput: true,
                  minDate: subYears(new Date(), 100),
                  maxDate: endOfYear(new Date()),
                  noClender: kycSecDisable,
                  inline: kycSecDisable,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                disabled={kycSecDisable || CKYCStatus === "failure"}
                error={
                  Object.values(validDate || Ckycj.dob === "" || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? ProposerError
                    : null
                }
              />
            </Grid>
          </>
        ) : null}
        {/* {lproposer.CustomerType === "Individual" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label={lproposer.CustomerType === "Individual" && "Date of Birth"}
                inputFormat="dd-MM-yyyy"
                type="login"
                id="Date of Birth"
                value={kycDate}
                onChange={(e) => handleSetCKYC(e, "dateOfBirth")}
                minDate={subYears(new Date(), 100)}
                maxDate={endOfYear(new Date())}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    sx={{ width: "100%" }}
                    required
                    error={validDate || datetoShow.dateOfBirth === "" ? ProposerError : null}
                    disabled={kycSecDisable}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        )} */}
      </Grid>
      <Grid container spacing={1} mt={3} mb={2}>
        <Stack direction="row" spacing={2} flexDirection="left" ml={1}>
          <MDButton
            color="primary"
            variant="contained"
            onClick={handleCKYCVerification}
            disabled={kycSecDisable || CKYCStatus === "failure"}
          >
            Initiate C-KYC
          </MDButton>
          <MDButton
            color="primary"
            variant="contained"
            onClick={handleCkycUpdateStatus}
            disabled={CkycEmailFlag || CKYCStatus === "success" || CKYCStatus === ""}
          >
            Update Status
          </MDButton>
          <MDButton
            color="primary"
            variant="contained"
            onClick={handleSendCkycRegMail}
            disabled={CkycEmailFlag || CKYCStatus === "success" || CKYCStatus === ""}
          >
            Send EMail-SMS
          </MDButton>
        </Stack>
      </Grid>

      <MDTypography variant="h6" color="primary">
        Proposer Details
      </MDTypography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#000",
              },
            }}
            id="Salutation"
            name="Salutation"
            disableClearable
            value={{ mValue: lproposer.ProposerDetails.Salutation }}
            options={salutationData || []}
            onChange={(e, value) => handleAutoComplete(e, "Salutation", value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                label="Salutation"
                required
                error={
                  Object.values(masterArray.Salutation || {}).every((x) => x === "" || x === null)
                    ? ProposerError
                    : null
                }
              />
            )}
          />
          {ProposerError && lproposer.ProposerDetails.Salutation === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="First Name"
            value={lproposer.ProposerDetails["First Name"]}
            name="First Name"
            onChange={handleSetProposer}
            error={lproposer.ProposerDetails["First Name"] === "" ? ProposerError : null}
            disabled
            InputProps={{ disabled: true }}
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
          />
          {ProposerError && lproposer.ProposerDetails["First Name"] === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Last Name"
            value={lproposer.ProposerDetails["Last Name"]}
            onChange={handleSetProposer}
            name="Last Name"
            // error={lproposer.ProposerDetails["Last Name"] === "" ? ProposerError : null}
            disabled
            InputProps={{ disabled: true }}
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
          />
          {/* {ProposerError && lproposer.ProposerDetails["Last Name"] === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
        </Grid>
        {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} /> */}
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#000",
              },
            }}
            value={{ mValue: lproposer.ProposerDetails.Gender }}
            id="Gender"
            name="Gender"
            options={genderData || []}
            disableClearable
            disabled={
              lproposer.ProposerDetails.Salutation !== "Prof." &&
              lproposer.ProposerDetails.Salutation !== "Dr." &&
              lproposer.ProposerDetails.Salutation !== "M/S."
            }
            InputProps={{
              disabled:
                lproposer.ProposerDetails.Salutation !== "Prof." &&
                lproposer.ProposerDetails.Salutation !== "Dr." &&
                lproposer.ProposerDetails.Salutation !== "M/S.",
            }}
            onChange={(e, value) => handleAutoComplete(e, "Gender", value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                label="Gender"
                disabled={
                  lproposer.ProposerDetails.Salutation !== "Prof." &&
                  lproposer.ProposerDetails.Salutation !== "Dr." &&
                  lproposer.ProposerDetails.Salutation !== "M/S."
                }
                required={
                  lproposer.ProposerDetails.Salutation === "Prof." ||
                  lproposer.ProposerDetails.Salutation === "Dr." ||
                  lproposer.ProposerDetails.Salutation === "M/S."
                }
                error={
                  Object.values(masterArray.Gender || {}).every((x) => x === "" || x === null)
                    ? ProposerError
                    : null
                }
              />
            )}
          />
          {ProposerError && lproposer.ProposerDetails.Gender === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {/* {kycSecDisable ? ( */}
          <MDDatePicker
            label="Date of Birth"
            input={{
              label: "Date of Birth",
              value: lproposer.ProposerDetails.DOB,
              inputProps: { disabled: true },
            }}
            name="DOB"
            id="DOB"
            value={lproposer.ProposerDetails.DOB}
            options={{
              altFormat: "d-m-Y",
              dateFormat: "d-m-Y",
              altInput: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            // InputProps={{ disabled: true }}
            onChange={(date) => handleDateChange1(date, "dateOfBirth", "DOB")}
            // error={
            //   Object.values(lproposer.ProposerDetails.DOB || {}).every(
            //     (x) => x === "" || x === null
            //   )
            //     ? ProposerError
            //     : null
            // }
            disabled
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
          />
          {/* ) : ( */}
          {/* <MDDatePicker
              label="Date of Birth"
              input={{
                label: "Date of Birth",
                value: lproposer.ProposerDetails.DOB,
              }}
              name="DOB"
              id="DOB"
              options={{
                altFormat: "d-m-Y",
                dateFormat: "d-m-Y",
                altInput: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={lproposer.ProposerDetails.DOB}
              onChange={(date) => handleDateChange1(date, "dateOfBirth", "DOB")}
              disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
              required={lproposer.CkycStatus === "failure"}
              error={
                Object.values(lproposer.ProposerDetails.DOB || {}).every(
                  (x) => x === "" || x === null
                )
                  ? ProposerError
                  : null
              }
            />
          )} */}
          {/* {ProposerError && lproposer.ProposerDetails.DOB === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Email ID"
            name="Email ID"
            value={lproposer.ProposerDetails["Email ID"]}
            onChange={handleSetProposer}
            // error={lproposer.ProposerDetails["Email ID"] === "" ? ProposerError : null}
            disabled
            InputProps={{ disabled: true }}
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
            onBlur={handleFieldValidation}
          />
          {/* {ProposerError && lproposer.ProposerDetails["Email ID"] === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
          {flags.emailflag && lproposer.ProposerDetails["Email ID"] !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill valid Email Id
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Mobile Number"
            name="Mobile Number"
            inputProps={{ maxLength: 10, disabled: true }}
            value={lproposer.ProposerDetails["Mobile Number"]}
            onChange={handleSetProposer}
            disabled
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
            onBlur={handleFieldValidation}
          />
          {/* {ProposerError && lproposer.ProposerDetails["Mobile Number"] === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
          {flags.mobileFlag && lproposer.ProposerDetails["Mobile Number"] !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill valid Mobile Number
            </MDTypography>
          ) : null}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mt={2}>
          <MDTypography variant="h6" color="primary">
            CKYC/Permanent&nbsp;Address
          </MDTypography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Address 01"
            placeholder="Enter Address 01"
            value={lproposer.ProposerDetails.PermanentAddress.AddressLine1}
            name="AddressLine1"
            onChange={handlePermanentAddressChange}
            disabled
            InputProps={{ disabled: true }}
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
            error={
              lproposer.ProposerDetails.PermanentAddress.AddressLine1 === "" ? ProposerError : null
            }
          />
          {ProposerError && lproposer.ProposerDetails.PermanentAddress.AddressLine1 === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Address 02"
            placeholder="Enter Address 02"
            value={lproposer.ProposerDetails.PermanentAddress.AddressLine2}
            name="AddressLine2"
            onChange={handlePermanentAddressChange}
            // disabled
            disabled={
              (updateflag === false && lproposer.CkycStatus === "success") || CKYCStatus === ""
            }
            InputProps={{
              disabled:
                (updateflag === false && lproposer.CkycStatus === "success") || CKYCStatus === "",
            }}
            // required={lproposer.CkycStatus === "failure"}
            // error={
            //   lproposer.ProposerDetails.PermanentAddress.AddressLine2 === "" ? ProposerError : null
            // }
          />
          {/* {ProposerError && lproposer.ProposerDetails.PermanentAddress.AddressLine2 === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Pincode"
            placeholder="Enter PinCode"
            inputProps={{
              maxLength: 6,
              disabled: pinCode,
            }}
            value={lproposer.ProposerDetails.PermanentAddress.Pincode}
            name="Pincode"
            onChange={handlePermanentAddressChange}
            // disabled
            onBlur={handelPincodeValid}
            disabled={pinCode}
            required={lproposer.CkycStatus === "failure"}
            error={lproposer.ProposerDetails.PermanentAddress.Pincode === "" ? ProposerError : null}
          />
          {ProposerError && lproposer.ProposerDetails.PermanentAddress.Pincode === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {(lproposer.ProposerDetails.PermanentAddress.Pincode &&
            lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes" &&
            PincodeError) ||
          (flags.pinFlag && lproposer.ProposerDetails.PermanentAddress.Pincode.length !== 6) ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>Enter Valid Pincode</MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="District"
            placeholder="Enter District"
            name="District"
            value={lproposer.ProposerDetails.PermanentAddress.District}
            onChange={handlePermanentAddressChange}
            disabled
            InputProps={{ disabled: true }}
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
            error={
              lproposer.ProposerDetails.PermanentAddress.District === "" ? ProposerError : null
            }
          />
          {ProposerError && lproposer.ProposerDetails.PermanentAddress.District === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            disableClearable
            id="City"
            name="City"
            options={permPincode || []}
            onChange={handlePermPin}
            value={{ mValue: lproposer.ProposerDetails.PermanentAddress.City }}
            // value={masterArray.NomineeTitle}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="City" required />}
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
            error={lproposer.ProposerDetails.PermanentAddress.City === "" ? ProposerError : null}
          />
          {/* <MDInput
            label="City"
            placeholder="Select City"
            name="City"
            value={lproposer.ProposerDetails.PermanentAddress.City}
            onChange={handlePermanentAddressChange}
            disabled
            InputProps={{ disabled: true }}
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
            error={lproposer.ProposerDetails.PermanentAddress.City === "" ? ProposerError : null}
          /> */}
          {ProposerError && lproposer.ProposerDetails.PermanentAddress.City === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="State"
            placeholder="Select State"
            value={lproposer.ProposerDetails.PermanentAddress.State}
            name="State"
            onChange={handlePermanentAddressChange}
            disabled
            InputProps={{ disabled: true }}
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            // required={lproposer.CkycStatus === "failure"}
            error={lproposer.ProposerDetails.PermanentAddress.State === "" ? ProposerError : null}
          />
          {ProposerError && lproposer.ProposerDetails.PermanentAddress.State === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Email ID"
            placeholder="Enter Email"
            name="Email ID"
            disabled
            InputProps={{ disabled: true }}
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            value={lproposer.ProposerDetails.PermanentAddress["Email ID"]}
            onChange={handlePermanentAddressChange}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            name="Mobile Number"
            inputProps={{ maxLength: 10, disabled: true }}
            disabled
            // disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            value={lproposer.ProposerDetails.PermanentAddress["Mobile Number"]}
            onChange={handlePermanentAddressChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
              Is Communication address same as CKYC/Permanent address
            </MDTypography>
            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={lproposer.ProposerDetails.CommunicationSameAsPermanent}
                onClick={(e) => handlePermanentAddSameComm(e)}
              >
                <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                <FormControlLabel control={<CustomRadio />} label="No" value="No" />
              </RadioGroup>
            </ThemeProvider>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mt={2}>
          <MDTypography variant="h6" color="primary">
            Communication&nbsp;Address
          </MDTypography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Address 01"
            value={lproposer.ProposerDetails.CommunicationAddress.AddressLine1}
            name="AddressLine1"
            onChange={handleCommunicationAddressChange}
            required={lproposer.ProposerDetails.CommunicationSameAsPermanent === "No"}
            disabled={lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes"}
            InputProps={{
              disabled: lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes",
            }}
            error={
              lproposer.ProposerDetails.CommunicationAddress.AddressLine1 === ""
                ? ProposerError
                : null
            }
          />
          {ProposerError && lproposer.ProposerDetails.CommunicationAddress.AddressLine1 === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Address 02"
            value={lproposer.ProposerDetails.CommunicationAddress.AddressLine2}
            name="AddressLine2"
            onChange={handleCommunicationAddressChange}
            // required={
            //   lproposer.ProposerDetails.CommunicationSameAsPermanent === "No" ||
            //   lproposer.ProposerDetails.CommunicationAddress.AddressLine2 === ""
            // }
            disabled={lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes"}
            InputProps={{
              disabled: lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes",
            }}
            // error={
            //   lproposer.ProposerDetails.CommunicationAddress.AddressLine2 === ""
            //     ? ProposerError
            //     : null
            // }
          />
          {/* {ProposerError && lproposer.ProposerDetails.CommunicationAddress.AddressLine2 === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Pin Code"
            placeholder="Enter PinCode"
            inputProps={{
              maxLength: 6,
              disabled: lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes",
            }}
            name="Pincode"
            value={lproposer.ProposerDetails.CommunicationAddress.Pincode}
            onChange={handleCommunicationAddressChange}
            onBlur={handelPincodeValid}
            disabled={lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes"}
            error={
              lproposer.ProposerDetails.CommunicationAddress.Pincode === "" ? ProposerError : null
            }
            required={lproposer.ProposerDetails.CommunicationSameAsPermanent === "No"}
          />
          {ProposerError && lproposer.ProposerDetails.CommunicationAddress.Pincode === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {(lproposer.ProposerDetails.CommunicationAddress.Pincode && PincodeError) ||
          (flags.pincodeFlag &&
            lproposer.ProposerDetails.CommunicationAddress.Pincode.length !== 6) ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>Enter Valid Pincode</MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="District"
            placeholder="Enter District"
            name="District"
            value={lproposer.ProposerDetails.CommunicationAddress.District}
            onChange={handleCommunicationAddressChange}
            disabled
            InputProps={{ disabled: true }}
            // error={
            //   lproposer.ProposerDetails.CommunicationAddress.District === "" ? ProposerError : null
            // }
            // required={
            //   lproposer.ProposerDetails.CommunicationSameAsPermanent === "No" ||
            //   lproposer.ProposerDetails.CommunicationAddress.District === ""
            // }
          />
          {/* {ProposerError && lproposer.ProposerDetails.CommunicationAddress.District === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput
            label="City"
            placeholder="Select City"
            name="City"
            value={lproposer.ProposerDetails.CommunicationAddress.City}
            onChange={handleCommunicationAddressChange}
            disabled
            InputProps={{ disabled: true }}
            // error={
            //   lproposer.ProposerDetails.CommunicationAddress.City === "" ? ProposerError : null
            // }
            // required={
            //   lproposer.ProposerDetails.CommunicationSameAsPermanent === "No" ||
            //   lproposer.ProposerDetails.CommunicationAddress.City === ""
            // }
          /> */}
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            disableClearable
            id="City"
            name="City"
            disabled={lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes"}
            options={commPincode || []}
            onChange={handlecommpin}
            value={{ mValue: lproposer.ProposerDetails.CommunicationAddress.City }}
            // value={masterArray.NomineeTitle}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput
                {...params}
                label="City"
                required={lproposer.ProposerDetails.CommunicationSameAsPermanent === "No"}
              />
            )}
            error={
              lproposer.ProposerDetails.CommunicationAddress.City === "" ? ProposerError : null
            }
          />
          {ProposerError && lproposer.ProposerDetails.CommunicationAddress.City === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="State"
            placeholder="Select State"
            value={lproposer.ProposerDetails.CommunicationAddress.State}
            name="State"
            onChange={handleCommunicationAddressChange}
            disabled
            InputProps={{ disabled: true }}
            // error={
            //   lproposer.ProposerDetails.CommunicationAddress.State === "" ? ProposerError : null
            // }
            // required={
            //   lproposer.ProposerDetails.CommunicationSameAsPermanent === "No" ||
            //   lproposer.ProposerDetails.CommunicationAddress.State === ""
            // }
          />
          {/* {ProposerError && lproposer.ProposerDetails.CommunicationAddress.State === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null} */}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Email ID"
            placeholder="Enter Email"
            name="Email ID"
            value={lproposer.ProposerDetails.CommunicationAddress["Email ID"]}
            onBlur={handlevalidate}
            onChange={handleCommunicationAddressChange}
            disabled={lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes"}
            InputProps={{
              disabled: lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes",
            }}
          />
          {EmailFlag === true &&
          lproposer.ProposerDetails.CommunicationAddress["Email ID"] !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please enter valid Email Id
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            inputProps={{
              maxLength: 10,
              disabled: lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes",
            }}
            name="Mobile Number"
            value={lproposer.ProposerDetails.CommunicationAddress["Mobile Number"]}
            disabled={lproposer.ProposerDetails.CommunicationSameAsPermanent === "Yes"}
            onChange={handleCommunicationAddressChange}
            onBlur={handlevalidate}
          />
          {MobileFlag === true &&
          lproposer.ProposerDetails.CommunicationAddress["Mobile Number"] !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please enter valid mobile no
            </MDTypography>
          ) : null}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={2}>
          <MDTypography variant="h6" color="primary">
            Other Details
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="GSTIN Number"
            placeholder="Enter GSTIN Number"
            name="GSTNumber"
            // disabled
            // disabled={lproposer.ProposerDetails.GSTNumber !== ""}
            value={lproposer.ProposerDetails.GSTNumber}
            inputProps={{ maxLength: 15 }}
            onChange={handleSetOther}
            onBlur={handlevalidother}
          />
          {ProposerError &&
          lproposer.CustomerType === "Corporate" &&
          lproposer.ProposerDetails.GSTNumber === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {GST === true && lproposer.ProposerDetails.GSTNumber !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Enter Valid GST Number
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="PAN Card Number"
            placeholder="Enter PANCard"
            name="PanNo"
            // disabled
            disabled={lproposer.CkycStatus === "success" || CKYCStatus === ""}
            InputProps={{ disabled: lproposer.CkycStatus === "success" || CKYCStatus === "" }}
            value={lproposer.ProposerDetails.PanNo}
            onChange={handleSetOther}
            onBlur={handlevalidother}
          />
          {ProposerError &&
          lproposer.CustomerType === "Individual" &&
          lproposer.ProposerDetails.PanNo === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {PAN === true && lproposer.ProposerDetails.PanNo !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Enter Valid PAN Number
            </MDTypography>
          ) : null}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={2}>
          <MDTypography variant="h6" color="primary">
            Hypothecation
          </MDTypography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="Hypothecation"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#000",
              },
            }}
            disableClearable
            value={{ mValue: lproposer.Hypothecation }}
            options={HypothecationCPM || []}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, valuess) => handleHypothecation(e, valuess, "Hypothecation", 0)}
            renderInput={(params) => (
              <MDInput
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                required
                label="Hypothecation"
                name="Hypothecation"
              />
            )}
          />
          {ProposerError && lproposer.Hypothecation === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        {lproposer.Hypothecation === "Yes" && (
          <>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Bank Name"
                required={lproposer.Hypothecation === "" || lproposer.Hypothecation === "Yes"}
                placeholder="Enter Bank name"
                name="BankName"
                value={lproposer.BankName}
                onChange={handleBankDetails}
                disabled={lproposer.Hypothecation === "No"}
                InputProps={{ disabled: lproposer.Hypothecation === "No" }}
              />
              {ProposerError && lproposer.Hypothecation === "Yes" && lproposer.BankName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Bank Branch Address"
                required={lproposer.Hypothecation === "" || lproposer.Hypothecation === "Yes"}
                placeholder="Enter address"
                name="BankbranchaddressName"
                value={lproposer.BankbranchaddressName}
                onChange={handleBankDetails}
                disabled={lproposer.Hypothecation === "No"}
                InputProps={{ disabled: lproposer.Hypothecation === "No" }}
              />
              {ProposerError &&
              lproposer.Hypothecation === "Yes" &&
              lproposer.BankbranchaddressName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Loan account Number"
                required={lproposer.Hypothecation === "" || lproposer.Hypothecation === "Yes"}
                placeholder="Enter number"
                name="LoanAccountNumber"
                value={lproposer.LoanAccountNumber}
                onChange={handleBankDetails}
                disabled={lproposer.Hypothecation === "No"}
                InputProps={{ disabled: lproposer.Hypothecation === "No" }}
              />
              {ProposerError &&
              lproposer.Hypothecation === "Yes" &&
              lproposer.LoanAccountNumber === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
          </>
        )}
      </Grid>

      <Grid container spacing={2} mb={2} mt={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Documents
          </MDTypography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <ThemeProvider theme={theme}>
            <Tabs
              value={values}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Upload" {...a11yProps(0)} />
              <Tab label="Download" {...a11yProps(1)} />
            </Tabs>
          </ThemeProvider>
        </Grid>
        <MDBox
          sx={{
            width: "100%",
          }}
        >
          <TabPanel value={values} index={0} dir={themes.direction}>
            <Grid container width="100%" mt={1}>
              <Table aria-label="simple table" width="100%">
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Documents&nbsp;Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Documents&nbsp;Remark</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Browse&nbsp;File</TableCell>
                </TableRow>
                {docUpload.map((x, i) => (
                  <TableBody>
                    <TableCell>
                      {" "}
                      <Autocomplete
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px!important",
                          },
                          "& .MuiAutocomplete-popupIndicator": {
                            color: "#000",
                          },
                        }}
                        disableClearable
                        id="Select Document"
                        name="Select Document"
                        options={DocumentsNameCPM || []}
                        value={{ mValue: x.DocType }}
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handleDocType(e, value, i)}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              readOnly: true,
                            }}
                            label="Select Document"
                            required
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <MDInput
                        name="DocRemarks"
                        value={x.DocRemarks}
                        onChange={(e) => handleDocRemarks(e, i)}
                      />
                    </TableCell>
                    <TableCell>
                      <MDBox flexDirection="row">
                        <MDButton color="primary" variant="outlined" component="label">
                          Upload
                          <input
                            hidden
                            id="fileInput"
                            accept="image/jpeg, image/png, .pdf"
                            type="file"
                            onChange={(e) => handleDocUpload(e, i)}
                          />
                        </MDButton>
                        {!x.DocName ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Only jpeg, png and pdf files are allowed
                          </MDTypography>
                        ) : null}
                      </MDBox>
                    </TableCell>
                    <TableCell>
                      <MDTypography
                        sx={{ fontSize: "15px", display: "flex", alignItems: "center" }}
                      >
                        {x.DocName !== "" ? x.DocName : ""}
                        <CancelIcon
                          fontSize="medium"
                          color="primary"
                          onClick={() => handleDeleteFile(x.DocName, i)}
                        />
                      </MDTypography>
                    </TableCell>
                    <TableCell>
                      {x.DocFlag === true ? (
                        <IconButton aria-label="delete" onClick={() => handleclearicon(i)}>
                          <DeleteIcon />
                        </IconButton>
                      ) : null}
                    </TableCell>
                  </TableBody>
                ))}
              </Table>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                mt={2}
                sx={{ fontSize: "0.90rem" }}
              >
                <MDButton
                  variant="outlined"
                  size="small"
                  disabled={docUpload.length >= 10}
                  // valuesss={valuesss}
                  onClick={handleAddDoc}
                >
                  + Add Document
                </MDButton>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={values} index={1} dir={themes.direction}>
            <Grid container width="100%" mt={1}>
              <Table aria-label="simple table" width="100%">
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Document Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>File Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Uploaded Date
                    {/* {new Date().toLocaleDateString()} */}
                  </TableCell>
                </TableRow>

                {docUpload.map((x, i) => (
                  <TableBody>
                    <TableCell>{x.DocType}</TableCell>
                    <TableCell>
                      <MDTypography
                        onClick={() => handleFileDownload(x.DocName)}
                        sx={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
                      >
                        {x.DocName}
                      </MDTypography>
                    </TableCell>
                    <TableCell>{x.DocDate}</TableCell>
                    <TableCell>
                      {x.DocFlag === true ? (
                        <CancelIcon
                          fontSize="medium"
                          color="primary"
                          onClick={() => handleclearicon(i)}
                        />
                      ) : null}
                    </TableCell>
                  </TableBody>
                ))}
              </Table>
            </Grid>
          </TabPanel>
        </MDBox>
        {/* <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} sx={{ fontSize: "0.90rem" }}>
          <MDButton
            variant="outlined"
            size="small"
            // valuesss={valuesss}
            onClick={handleAddDoc}
          >
            + Add Document
          </MDButton>
        </Grid> */}
      </Grid>

      <Grid container spacing={2} mb={2} mt={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Proposal Consent
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <MDBox display="flex" flexDirection="row">
          <MDBox display="flex" flexDirection="row" spacing={1}>
            {/* <ThemeProvider theme={themecheck}> */}
            <ThemeProvider theme={theme}>
              <CustomCheckbox checked={checkProposalConsent} onChange={handleCheckBox} />
            </ThemeProvider>
            {/* </ThemeProvider> */}
          </MDBox>
          <MDTypography sx={{ fontSize: "1rem", marginTop: "9px", fontWeight: "bold" }}>
            Proposal consent
          </MDTypography>
        </MDBox>
        <Grid item xs={12} sm={12}>
          {ProposerError && checkProposalConsent === false ? (
            <MDTypography sx={{ color: "red", fontSize: "10px", mt: "-0.5rem" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        {checkProposalConsent && (
          <>
            <Grid container spacing={2} mt={1} ml={1}>
              <Grid item xs={12} sm={12} md={4} pr={3}>
                <MDInput
                  label="Enter OTP"
                  name="OTP"
                  type={showOTP ? "text" : "password"}
                  value={OTP}
                  onChange={handleOTPChange}
                  inputProps={{ maxLength: 6, disabled: otpflag }}
                  // style={{ paddingRight: "20px" }}
                  disabled={otpflag}
                />
                <MDButton
                  type="button"
                  onClick={toggleShowOTP}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "5px",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {/* {showOTP ? "Hide" : "Show"} */}
                </MDButton>
                {ProposerError && OTP === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
                {verifyOtp && OTP !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the valid OTP
                  </MDTypography>
                ) : null}
                {status ? (
                  <MDTypography
                    sx={{
                      fontSize: "0.9rem",
                      color: "green",
                      textAlign: "left",
                      mt: "1rem",
                    }}
                  >
                    OTP sent successfully
                  </MDTypography>
                ) : null}

                <MDTypography
                  sx={{
                    fontSize: "0.9rem",
                    color: "green",
                    textAlign: "left",
                    mt: "1rem",
                  }}
                >
                  {startCounterFlag && <Timer counter={counter} />}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                {timerFlag ? (
                  <MDButton
                    color="primary"
                    variant="contained"
                    onClick={handleSendOTP}
                    disabled={otpflag}
                  >
                    Re-Send OTP
                  </MDButton>
                ) : (
                  sendOtpFlag === true && (
                    <MDButton color="primary" variant="contained" onClick={handleSendOTP}>
                      Send OTP
                    </MDButton>
                  )
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={handleVerifyOTP}
                  disabled={otpflag}
                >
                  Verify OTP
                </MDButton>
              </Grid>
            </Grid>
            <MDBox display="flex" flexDirection="row">
              {/* <ThemeProvider theme={themecheck}> */}
              <ThemeProvider theme={theme}>
                <CustomCheckbox checked={checkDisclaimer} onChange={handleCheckDisclaimer} />
              </ThemeProvider>
              {/* </ThemeProvider> */}
              <MDTypography
                sx={{
                  fontSize: "1rem",
                  marginTop: "5px",
                  fontWeight: "bold",
                }}
              >
                I/We Hereby declare that the statements made by me/us in this proposal form are true
                to the best of my/our Knowledge and belief and I/we hereby agree that this
                declaration shall form the basis of the contract between me/us and the Universal
                Sompo General Insurance Company Limited insurance Company.
              </MDTypography>
            </MDBox>
            {ProposerError && checkDisclaimer === false ? (
              <MDTypography sx={{ color: "red", fontSize: "10px", ml: 4 }}>
                Please fill this Field
              </MDTypography>
            ) : null}
            <MDBox display="flex" flexDirection="row">
              <ThemeProvider theme={theme}>
                <CustomCheckbox checked={checkInsurance} onChange={handleCheckInsurance} />
              </ThemeProvider>
              <MDTypography
                sx={{
                  fontSize: "1rem",
                  marginTop: "5px",
                  fontWeight: "bold",
                }}
              >
                I/We also declare that any addition alteration are carried out after the submission
                of this proposal form that the same would be conveyed to the insurance company
                immediately.
              </MDTypography>
            </MDBox>
            {ProposerError && checkInsurance === false ? (
              <MDTypography sx={{ color: "red", fontSize: "10px", ml: 4 }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </>
        )}
      </Grid>
      {/* Restrict back button by shreya */}
      {proposalNoo !== null ? (
        <Grid container justifyContent="flex-end" mt={2}>
          <MDButton color="primary" variant="contained" onClick={onNext}>
            Make Payment
          </MDButton>
        </Grid>
      ) : (
        <Grid container justifyContent="space-between" mt={2}>
          <MDButton color="primary" variant="outlined" onClick={onBack}>
            Back
          </MDButton>
          <MDButton color="primary" variant="contained" onClick={onNext}>
            Make Payment
          </MDButton>
        </Grid>
      )}
    </MDBox>
  );
}
export default ProposerDetails;
