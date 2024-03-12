import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { ArrowBack } from "@mui/icons-material";
// import dayjs from "dayjs";
import TableRow from "@mui/material/TableRow";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Autocomplete,
  CircularProgress,
  Backdrop,
  Checkbox,
} from "@mui/material";
import { ThemeProvider, createTheme, styled, useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import PropTypes from "prop-types";
import { isValid, addMonths, subYears, endOfYear } from "date-fns";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DeleteIcon from "@mui/icons-material/Delete";
import MDTypography from "components/MDTypography";
import PropertyDetailsDataBind from "modules/PolicyLive/views/Home/data/PropertyDetailsDataBind";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
import { UploadFiles, ViewFiles } from "modules/PolicyLive/views/Home/data/index";
// import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { DeleteFile } from "../../../BrokerPortal/Pages/MyProfile/data/index";
import MDButton from "../../../../components/MDButton";

// import { blue } from "@mui/material/colors";
import {
  callSaveProposalMethod,
  GetBGRMasters,
  // BGRProposalMail,
  getCKYCDetails,
  BGRCkycRegMail,
  GetCkycUpdateStatus,
  // GetProposalByNumber,
  callUpdateQuoteMethod,
  SendSMS,
  fetchVericalData,
} from "./data/index";
import { getOTP, GetOTP } from "../../../BrokerPortal/Pages/Registration/data/index";

import { useDataController } from "../../../BrokerPortal/context";
import { postRequest, getRequest } from "../../../../core/clients/axiosclient";

import MDDatePicker from "../../../../components/MDDatePicker";
// import setdata from "./JsonData";

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
  // children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return (
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Click On Resend OTP in 00:{counter}
    </div>
  );
}

function CkycParameterPan({
  LPolicyDto,
  datePlaceHolder,
  CKYCStatus,
  handleSetCKYC,
  // PolicyDto,
  // handlevalidChange,
  flags,
}) {
  return (
    <Stack direction="row" spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="PAN Number"
          name="PAN"
          value={LPolicyDto?.ProposerDetails["PAN Number"]}
          required
          inputProps={{
            maxLength: 10,
          }}
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          // onBlur={handle}
          onChange={(e) => handleSetCKYC(e, "PAN")}
          disabled={LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure"}
        />
        {flags.panflag === true && LPolicyDto?.ProposerDetails["PAN Number"] !== "" ? (
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
            noClender: LPolicyDto.CkycStatus === "success" || CKYCStatus === "success",
          }}
          input={{
            required: true,
            label:
              LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
                ? "Date of Birth"
                : "Date of Incorporation",

            value: LPolicyDto.ProposerDetails["Date of Birth"],
            allowInput: true,
            placeholder: datePlaceHolder("d-m-Y"),
            InputLabelProps: { shrink: true },
            InputProps: {
              disabled:
                LPolicyDto.CkycStatus === "success" ||
                CKYCStatus === "success" ||
                LPolicyDto.CkycStatus === "failure",
            },
          }}
          name="dateOfBirth"
          value={LPolicyDto.ProposerDetails["Date of Birth"]}
          onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
          disabled={
            LPolicyDto.CkycStatus === "success" ||
            CKYCStatus === "success" ||
            LPolicyDto.CkycStatus === "failure"
          }
        />
      </Grid>
    </Stack>
  );
}
function CkycParameterAadhar({
  genderData,
  handleSetAutoComplete,
  LPolicyDto,
  // PolicyDto,
  // handlevalidChange,
  handleMobilesChange,
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
        <MDDatePicker
          options={{
            altFormat: "d-m-Y",
            dateFormat: "d-m-Y",
            altInput: true,
            allowInput: true,
            noClender: LPolicyDto.CkycStatus === "success" || CKYCStatus === "success",
          }}
          input={{
            required: true,
            label:
              LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
                ? "Date of Birth"
                : "Date of Incorporation",

            value: LPolicyDto.ProposerDetails["Date of Birth"],
            allowInput: true,
            placeholder: datePlaceHolder("d-m-Y"),
            InputLabelProps: { shrink: true },
            InputProps: {
              disabled:
                LPolicyDto.CkycStatus === "success" ||
                LPolicyDto.CkycStatus === "failure" ||
                CKYCStatus === "success",
            },
          }}
          name="dateOfBirth"
          value={LPolicyDto.ProposerDetails["Date of Birth"]}
          onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
          disabled={
            LPolicyDto.CkycStatus === "success" ||
            LPolicyDto.CkycStatus === "failure" ||
            CKYCStatus === "success"
          }
        />
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
          }}
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          // onBlur={handlevalidChange}
          onChange={(e) => handleSetCKYC(e, "AadharMobileNo")}
          onBlur={handleMobilesChange}
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
        id="AadharGender"
        name="AadharGender"
        options={genderData}
        disableClearable
        onChange={handleSetAutoComplete}
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
            disabled={LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure"}
          />
        )}
      />
    </Stack>
  );
}
function ProposerDetailsData({
  // handleSetValue,
  // handleOdSET,
  salutationData,
  commonObj,
  // handleSetPincode,
  permAddress,
  // handleSetPermPinCode,
  pinLoad,
  pinPermLoad,
  // handleSet,
  // handleDateChange,
  // handleDD,
  master,
  // setMaster,
  // QuoteData,
  setPolicyDto,
  PolicyDto,
  // flag,
  ProposalFlag,
  setPinLoad,
  setCommonObj,
  setPinPermLoad,
  // callDistrict,
  // CKYCStatus,
  // setCKYCStatus,
  setCkycUpdateJson,
  CkycUpdateJson,
  valueTab,
  setPermAddress,
  handleNext,
  setProposalFlag,
  setProposalData,
  handleBack,
  setOTP,
  OTP,
  checkInsurance,
  setCheckInsurance,
  setCheckDisclaimer,
  checkDisclaimer,
  checkProposalConsent,
  setCheckProposalConsent,
  // setPolicyDto,
  setDocUpload,
  docUpload,
  pStartDate,
  setPolEndDate,
  setPolStartDate,
  // pEndDate,
  loadingflag,
  setloadingflag,
  kycDate,
  // setKycDate,
  kycSecDisable,
  setKYCSecDisable,
  counter,
  setCounter,
  startCounterFlag,
  setStartCounterFlag,
  timerFlag,
  setTimerFlag,
  sendOtpFlag,
  setSendOtpFlag,
  status,
  setStatus,
  CKYCData,
  setCKYCData,
  CKYCStatus,
  setCKYCStatus,
  // CKYCReqJSon,
  // setCKYCReqJson,
  // IdType,
  // setIdType,
  setDate,
  // datetoShow,
}) {
  const [RiskPincodeErr, setRiskPincodeErr] = useState(false);
  const [CommPincodeErr, setCommPincodeErr] = useState(false);
  const [PermPincodeErr, setPermPincodeErr] = useState(false);
  // const [ckycfalg, setCkycFalg] = useState(false);
  // const [ckycParmeter, setCkycParams] = useState("");
  const CkycParams = [
    { mID: 1, mValue: "PAN Number" },
    { mID: 2, mValue: "Aadhaar Number" },
  ];

  const [Dob, setDOB] = useState(false);
  // const CKYCReqJSonValue = CKYCReqJSon;
  // const IdTypeValue = IdType;
  // const datetoShowValue = datetoShow;
  // console.log("1234567890", datetoShowValue);
  const { FinanceType } = GetBGRMasters().bgrMaster.Masters;
  console.log("PolicyDto===>", PolicyDto);
  const polDto = PolicyDto[valueTab];
  const [LPolicyDto, setLPolicyDto] = useState(polDto);
  console.log("master", master);
  // const masterDto = master[valueTab];
  // const [masterArray, setMasterArray] = useState(masterDto);
  console.log("QuoteData", PolicyDto, valueTab, master);
  const [NDob] = useState();
  // const [policyresponse, setpolicyresponse] = useState([]);
  console.log(NDob);
  console.log("policydata", LPolicyDto);
  const commonObj1 = commonObj;
  console.log(">>>>>>>>>>>>", commonObj1);
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
  const permAddress1 = permAddress;
  // const [pStartDate, setPolStartDate] = useState(new Date());
  // const [pEndDate, setPolEndDate] = useState(null);
  // const [loadingflag, setloadingflag] = useState(false);
  // const [kycDate, setKycDate] = useState(null);
  // const [kycSecDisable, setKYCSecDisable] = useState(false);
  // const [counter, setCounter] = useState(30);
  // const [startCounterFlag, setStartCounterFlag] = useState(false);
  // const [timerFlag, setTimerFlag] = useState(false);
  // const [sendOtpFlag, setSendOtpFlag] = useState(true);
  // const [status, setStatus] = useState(false);
  const { SalutationCor } = GetBGRMasters().bgrMaster.Masters;
  // const [CKYCData, setCKYCData] = useState();

  // const [CKYCReqJSon, setCKYCReqJson] = useState({
  //   source: "AVO",
  //   customerType: "I",
  //   uniqueTransactionNumber: "AVO/261122/009",
  //   idNo: "",
  //   idType: "PAN",
  //   dob: "",
  //   mobileNo: "",
  //   pincode: "",
  //   cKYCNo: "",
  //   extraField1: "",
  //   extraField2: "",
  //   extraField3: "",
  //   extraField4: "",
  //   extraField5: "",
  // });
  // // const navigate = useNavigate();
  // const [CkycEmailFlag, setCkycEmailFlag] = useState(false);
  // // const [CkycIdType,SetCkycIdType] = useState(false);
  // const [IdType, setIdType] = useState({
  //   PanId: "",
  //   GSTINId: "",
  //   CINId: "",
  // });

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}/${format(dt.getMonth() + 1)}/${dt.getFullYear()}`;
  };
  // const [maxDate, setMaxDate] = useState(null);
  const theme = createTheme({
    status: {
      danger: "#c70825",
      outline: grey[500],
    },
  });
  const CustomRadio = styled(Radio)(() => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));
  // const readOnlyOnFocus = (e) => {
  //   console.log((e.target.readOnly = true));
  // };
  useEffect(() => {
    const { ProposerDetails } = LPolicyDto;
    LPolicyDto.CkycDetails = CKYCData;
    LPolicyDto.CkycStatus = LPolicyDto.CkycStatus === "" ? CKYCStatus : LPolicyDto.CkycStatus;
    setLPolicyDto({ ...LPolicyDto });
    const dt = new Date();
    const date = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    ProposerDetails["Policy Start Date"] = formatDate(pStartDate);
    ProposerDetails.GCPolicyStartDate = formatDate(pStartDate);
    const PolictTenure = LPolicyDto.ProposerDetails["Policy Tenure"];
    const enddate = new Date(year + Number(PolictTenure), month, date - 1);
    setPolEndDate(enddate);
    ProposerDetails["Policy End Date"] = formatDate(enddate);
    setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
  }, []);
  const [riskPincode, setRiskPincode] = useState([]);
  const [commPincode, setCommPincode] = useState([]);
  const [permPincode, setPermPincode] = useState([]);

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

  useEffect(async () => {
    const { ProposerDetails } = LPolicyDto;
    if (
      ProposerDetails.CommunicationAddress.PinCode !== "" &&
      ProposerDetails.CommunicationAddress.PinCode !== null
    ) {
      if (ProposerDetails.CommunicationAddress.PinCode.length === 6) {
        setPinLoad(true);
        const ProductId = 782;
        const obj = { Pincode: ProposerDetails.CommunicationAddress.PinCode };
        const abc = await postRequest(
          `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=PinCode`,
          obj
        );
        if (abc.data.status === 7) {
          setCommPincodeErr(true);
          setCommPincode([]);
          ProposerDetails.CommunicationAddress.District = "";
          setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        } else {
          setCommPincodeErr(false);
          setCommPincode(abc.data);
        }
        console.log("pincode data", abc);
        console.log("abcd", abc);
        setPinLoad(false);
      } else {
        setPinLoad(false);
      }
    }
  }, [LPolicyDto.ProposerDetails.CommunicationAddress.PinCode]);

  useEffect(async () => {
    const { ProposerDetails } = LPolicyDto;
    if (
      ProposerDetails.RiskLocationAddress.PinCode !== "" &&
      ProposerDetails.RiskLocationAddress.PinCode !== null
    ) {
      if (ProposerDetails.RiskLocationAddress.PinCode.length === 6) {
        setPinLoad(true);
        const ProductId = 782;
        // const type = "PinCode";
        const obj = { Pincode: ProposerDetails.RiskLocationAddress.PinCode };
        const abc = await postRequest(
          `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=PinCode`,
          obj
        );
        console.log("abc123", abc);
        if (abc.data.status === 7) {
          setRiskPincodeErr(true);
          setRiskPincode([]);

          ProposerDetails.RiskLocationAddress.District = "";
          setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        } else {
          setRiskPincodeErr(false);
          setRiskPincode(abc.data);
        }

        console.log("pincode data", abc);
        console.log("abcd", abc);
        // const abc = await callDistrict(ProposerDetails.RiskLocationAddress.PinCode);
        // console.log("abc", abc);
        setPinLoad(false);
      } else {
        setPinLoad(false);
      }
    }
  }, [LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode]);

  useEffect(async () => {
    const { ProposerDetails } = LPolicyDto;
    if (
      LPolicyDto.ProposerDetails.PermanentAddress.PinCode.length === 6 &&
      LPolicyDto.ProposerDetails.PermanentAddress.PinCode !== ""
    ) {
      setPinPermLoad(true);
      const ProductId = 782;
      const obj = { Pincode: LPolicyDto.ProposerDetails.PermanentAddress.PinCode };
      const abc = await postRequest(
        `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=PinCode`,
        obj
      );

      if (abc.data.status === 7) {
        setPermPincodeErr(true);
        setPermPincode([]);

        ProposerDetails.PermanentAddress.District = "";
        setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
      } else {
        setPermPincodeErr(false);
        setPermPincode(abc.data);
      }

      setPinPermLoad(false);
    } else {
      setPinPermLoad(false);
    }
  }, [permAddress1.PinCode]);

  const handleRiskLocationDetails = (e) => {
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails.RiskLocationAddress.District = "";
    ProposerDetails.RiskLocationAddress.State = "";
    if (e.target.name === "PlotNo") {
      ProposerDetails.RiskLocationAddress[e.target.name] = e.target.value;
    } else if (e.target.name === "Address1") {
      ProposerDetails.RiskLocationAddress[e.target.name] = e.target.value;
    } else if (e.target.name === "Address2") {
      ProposerDetails.RiskLocationAddress[e.target.name] = e.target.value;
    } else if (e.target.name === "NearestLandmark") {
      ProposerDetails.RiskLocationAddress[e.target.name] = e.target.value;
    } else if (e.target.name === "PinCode") {
      const pinReg = /^[0-9]{0,6}$/;
      if (pinReg.test(e.target.value) || e.target.value === "") {
        ProposerDetails.RiskLocationAddress[e.target.name] = e.target.value;
        ProposerDetails.PinCode = e.target.value;
      }
      if (ProposerDetails.RiskLocationAddress.PinCode === "") {
        ProposerDetails.RiskLocationAddress.District = "";
        ProposerDetails.RiskLocationAddress.State = "";
        setRiskPincode([]);

        // ProposerDetails.PermanentAddress.PinCode = "";
        setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
      }
    }
    setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
  };

  const [flags, setFlags] = useState({
    errorFlag: false,
    // pan: false,
    // erroremailFlag: false,
    cinflag: false,
    emailflag: false,
    gstflag: false,
    panflag: false,
    MobileNo: false,
    AadharMobileNo: false,
    // errorFlag: true,
  });

  // const [errorflag1] = useState(false);

  // const [validDate, setValidDate] = useState(false);
  // const [CKYCUpdateData, setCKYCUpdateData] = useState();
  // const [partnerDetail, setPartnerDetail] = useState();
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

  const { search } = useLocation();
  const proposalNumber = new URLSearchParams(search).get("proposernum");
  // useEffect(async () => {
  //   if (proposalNumber !== null) {
  //     await GetProposalByNumber(proposalNumber).then((result) => {
  //       console.log("response", result);
  //       setpolicyresponse(result.data[0].policyDetails);
  //       setLPolicyDto(result.data[0].policyDetails);
  //       setIdType((prev) => ({
  //         ...prev,
  //         CINId: "",
  //         GSTINId: LPolicyDto.ProposerDetails["GST Number"],
  //         PanId: LPolicyDto.ProposerDetails["PAN Number"],
  //       }));
  //       setDate((prev) => ({
  //         ...prev,
  //         dateOfBirth: LPolicyDto.ProposerDetails["Date of Birth"],
  //         nomineeDOB: LPolicyDto.ProposerDetails["Nominee Date of Birth"],
  //       }));
  //     });
  //   }
  // }, []);
  // console.log("savedresponse", policyresponse);
  console.log("setdata", LPolicyDto);

  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}/${propformat(
      propdate.getMonth() + 1
    )}/${propdate.getFullYear()}`;
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

  const handleSetValue = (e, value) => {
    console.log("set proposer");
    // masterArray[e.target.id.split("-")[0]] = value;
    // setMasterArray((prev) => ({ ...prev, masterArray }));
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
    setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
  };

  const handleFinanceChange = (e, value) => {
    // masterArray.SelectFinanceType = value;
    // setMasterArray((prev) => ({ ...prev, masterArray }));
    const OtherDetails = [...LPolicyDto.OtherDetails];
    OtherDetails[0].FinancierInterest[0]["Select Finance Type"] = value.mValue;
    setLPolicyDto((prevState) => ({ ...prevState, OtherDetails }));
  };

  // const handleDateChange1 = (value, label, type) => {
  //   console.log("value", value);
  //   const { ProposerDetails } = LPolicyDto;
  //   datetoShowValue.dateOfBirth = null;
  //   const date = new Date(value).getFullYear();
  //   const dateString = date.toString().length;
  //   if (value !== null && isValid(new Date(value)) && dateString === 4) {
  //     // const dob = value.toLocaleDateString("en-ZA");
  //     const age = handleCalculateAge(new Date(value).toLocaleDateString("en-ZA"));

  //     if (age < 18) {
  //       swal({
  //         icon: "error",
  //         text: "Age cannot be less than 18 Years",
  //       });
  //       setDate((prevState) => ({ ...prevState, [label]: null }));
  //       ProposerDetails[type] = "";
  //       ProposerDetails["Date of Birth"] = "";
  //       ProposerDetails.Age = "";

  //       setLPolicyDto((prevState) => ({
  //         ...prevState,
  //         ProposerDetails,
  //       }));
  //     } else {
  //       setValidDate(false);
  //       setDate((prevState) => ({ ...prevState, [label]: value }));

  //       ProposerDetails[type] = formatPropDate(value);
  //       ProposerDetails["Date of Birth"] = formatPropDate(value);
  //       ProposerDetails.Age = age;

  //       setLPolicyDto((prevState) => ({
  //         ...prevState,
  //         ProposerDetails,
  //       }));
  //     }
  //     setFlags((prevState) => ({ ...prevState, Age: age }));
  //   } else {
  //     setValidDate(true);
  //     setDate((prevState) => ({ ...prevState, [label]: null }));
  //   }
  // };

  const handleDateChangeNominee = (e, label, type) => {
    // console.log("value", value);
    // datetoShowValue.nomineeDOB = null;
    const date = new Date(e).getFullYear();
    const dateString = date.toString().length;
    if (e !== null && isValid(new Date(e)) && dateString === 4) {
      setDate((prevState) => ({ ...prevState, [label]: e }));
      const { ProposerDetails } = LPolicyDto;
      ProposerDetails[type] = formatPropDate(e);
      ProposerDetails["Nominee Date of Birth"] = formatPropDate(e);
      // const dob = e.toLocaleDateString("en-ZA");
      const age = handleCalculateAge(new Date(e).toLocaleDateString("en-ZA"));
      ProposerDetails.NomineeAge = age;
      setLPolicyDto((prevState) => ({
        ...prevState,
        ProposerDetails,
      }));
    }
  };

  const handlevalidChange = (event) => {
    const { ProposerDetails } = LPolicyDto;
    if (event.target.name === "First Name") {
      console.log("enter into the conditioncheck");
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        console.log("check the name rezex", nameReg);
        if (nameReg.test(event.target.value) || event.target.value === "") {
          ProposerDetails[event.target.name] = event.target.value;
          console.log("newValue");
          if (ProposerDetails[event.target.name] === "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: true }));
          } else if (ProposerDetails[event.target.name] !== "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: false }));
          }
        }
        setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
      }
    } else if (event.target.name === "Last Name") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          ProposerDetails[event.target.name] = event.target.value;
          if (ProposerDetails[event.target.name] === "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: true }));
          } else if (ProposerDetails[event.target.name] !== "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: false }));
          }
          setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        }
      }
    } else if (event.target.name === "Mobile Number") {
      const mobileRegex = /^[0-9]*$/;

      if (mobileRegex.test(event.target.value)) {
        // LPolicyDto[0][event.target.name] = event.target.value;
        ProposerDetails["Mobile Number"] = event.target.value;
        setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
      }
    } else if (event.target.name === "Email ID") {
      const emailRegex =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/i;
      // const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
      console.log("emailRegex", emailRegex);
      if (!emailRegex.test(event.target.value)) {
        ProposerDetails[event.target.name] = event.target.value;
        console.log("for email", event.target.name);
        setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailflag: false }));
      }

      if (ProposerDetails[event.target.name] === "") {
        setFlags((prevState) => ({ ...prevState, errorFlag: true }));
      } else if (ProposerDetails[event.target.name] !== "") {
        setFlags((prevState) => ({ ...prevState, errorFlag: false }));
      }
    } else if (event.target.name === "GST Number") {
      const gstRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      console.log("for gst");
      if (!gstRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, gstflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, gstflag: false }));
      }
    } else if (event.target.name === "PAN") {
      if (LPolicyDto.ProposerDetails["PAN Number"] !== "") {
        const PanRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!PanRegex.test(event.target.value)) {
          setFlags((prevState) => ({ ...prevState, panflag: true }));
        } else {
          setFlags((prevState) => ({ ...prevState, panflag: false }));
        }
      }
    } else if (event.target.name === "CIN") {
      const cinRegex = /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
      if (event.target.value !== "") {
        if (!cinRegex.test(event.target.value)) {
          setFlags((prevState) => ({ ...prevState, cinflag: true }));
        } else {
          setFlags((prevState) => ({ ...prevState, cinflag: false }));
        }
      }
    }
  };
  const handleMobilesChange = (event) => {
    if (event.target.name === "Mobile Number") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, MobileNo: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, MobileNo: false }));
      }
    }
    if (event.target.name === "AadharMobileNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, AadharMobileNo: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, AadharMobileNo: false }));
      }
    }
  };
  const handleEmailChange = (event) => {
    if (event.target.name === "Email ID") {
      const { ProposerDetails } = LPolicyDto;
      ProposerDetails[event.target.name] = event.target.value;
      setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
    }
  };
  const handleSetValueParms = (e, value) => {
    // setCkycParams(value.mValue);
    LPolicyDto.ProposerDetails.CKYCParam = value.mValue;
    setLPolicyDto({ ...LPolicyDto });
    if (value.mValue !== "PAN Number") {
      LPolicyDto.ProposerDetails.AadharID = "";
      LPolicyDto.ProposerDetails.AadharMobileNo = "";
      LPolicyDto.ProposerDetails.AadharGender = "";
      LPolicyDto.ProposerDetails.AadharName = "";
      LPolicyDto.ProposerDetails["Date of Birth"] = "";
    } else {
      LPolicyDto.ProposerDetails["Date of Birth"] = "";
      LPolicyDto.ProposerDetails.PanNo = "";
    }
    setLPolicyDto({ ...LPolicyDto });
    // if (value.mValue === "PAN Number") {
    //   SetPanCkycFlag(true);
    //   SetAaadharCkycFlag(false);
    // } else if (value.mValue === "Aaadhar Number") {
    //   SetAaadharCkycFlag(true);
    //   SetPanCkycFlag(false);
    // }
  };

  // const handleGstChange = (event) => {
  //   if (event.target.name === "GST Number") {
  //     const { ProposerDetails } = LPolicyDto;
  //     ProposerDetails[event.target.name] = event.target.value;
  //     setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  //   }
  // };

  // const handlePanChange = (event) => {
  //   if (event.target.name === "PAN Number") {
  //     if (event.target.value.length <= 10) {
  //       const { ProposerDetails } = LPolicyDto;
  //       ProposerDetails[event.target.name] = event.target.value;
  //       setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  //     }
  //   }
  // };

  const handlevalidNominee = (event) => {
    const { ProposerDetails } = LPolicyDto;
    if (event.target.name === "Nominee First Name") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        console.log("check the name rezex", nameReg);
        if (nameReg.test(event.target.value) || event.target.value === "") {
          ProposerDetails[event.target.name] = event.target.value;
          if (ProposerDetails[event.target.name] === "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: true }));
          } else if (ProposerDetails[event.target.name] !== "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: false }));
          }
          setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        }
      }
    } else if (event.target.name === "Nominee Last Name") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          ProposerDetails[event.target.name] = event.target.value;
          if (ProposerDetails[event.target.name] === "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: true }));
          } else if (ProposerDetails[event.target.name] !== "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: false }));
          }
          setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        }
      }
    } else if (event.target.name === "Appointee Name") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          ProposerDetails[event.target.name] = event.target.value;
          if (ProposerDetails[event.target.name] === "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: true }));
          } else if (ProposerDetails[event.target.name] !== "") {
            setFlags((prevState) => ({ ...prevState, errorFlag: false }));
          }
          setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        }
      }
    }
  };

  // const handleSet = (e) => {
  //   const OtherDetails = [...LPolicyDto.OtherDetails];
  //   OtherDetails[0].EissuanceandOtherDetails[0][e.target.name] = e.target.value;
  //   setLPolicyDto((prevState) => ({ ...prevState, OtherDetails }));
  // };

  const themes = useTheme();
  const [values, setValues] = React.useState(0);
  // const [Documents, setDocuments] = React.useState("");

  const handleChange = (event, newValues) => {
    setValues(newValues);
  };

  const Documen = [
    { mID: 1, mValue: "Pan copy" },
    { mID: 2, mValue: "Cheque" },
    { mID: 3, mValue: "Date of birth" },
    { mID: 4, mValue: "Address Proof" },
    { mID: 5, mValue: "Customer's Signed Quote" },
    { mID: 6, mValue: "Other" },
  ];

  const handleAddDoc = () => {
    setDocUpload([
      ...docUpload,
      {
        DocName: "",
        DocId: docUpload.length + 1,
        DocType: "",
        DocRemarks: "",
        DocFlag: true,
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
    if (docUpload.some((x) => x.DocType === "")) {
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
      if (
        ext === "png" ||
        ext === "jpg" ||
        ext === "jpeg" ||
        ext === "pdf" ||
        ext === "tiff" ||
        ext === "bmp"
      ) {
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

  const handleRadioChangeCustomer = (e) => {
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails[e.target.name] = e.target.value;

    console.log("customertypeset", LPolicyDto);
    if (e.target.name === "Customer Type") {
      if (e.target.value === "Individual") {
        ProposerDetails["PAN Number"] = "";
        ProposerDetails["Date of Birth"] = null;
        ProposerDetails["GST Number"] = "";
        ProposerDetails["CIN Number"] = "";
        // CKYCReqJSonValue.customerType = "I";
        // setIdType((prev) => ({ ...prev, PanId: "", GSTINId: "", CINId: "" }));
        // setKycDate(null);
      } else {
        ProposerDetails["PAN Number"] = "";
        ProposerDetails["Date of Birth"] = "";
        // CKYCReqJSonValue.customerType = "C";
        // setIdType((prev) => ({ ...prev, PanId: "" }));
        // setKycDate(null);
      }
    }
    setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
    // setCKYCReqJson((prevState) => ({ ...prevState, ...CKYCReqJSonValue }));
  };

  const handleRadioChangeOwed = (e) => {
    const OtherDetails = [...LPolicyDto.OtherDetails];
    OtherDetails[0].FinancierInterest[0][e.target.name] = e.target.value;
    setLPolicyDto((prevState) => ({ ...prevState, OtherDetails }));
  };

  // For NOMINEE MINOR

  // const [nomineeMinor, isNomineeMinor] = useState(false);
  // const [nomineeMajor, isNomineeMajor] = useState(false);

  const handleRadioNomineechanged = (e) => {
    const { ProposerDetails } = LPolicyDto;
    if (e.target.name === "Is Nominee a Minor?") {
      ProposerDetails[e.target.name] = e.target.value;
    }
    setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  };
  // END NOMINEE MINOR

  // const handleRadioChangePincode = (e) => {
  //   const { ProposerDetails } = LPolicyDto;
  //   ProposerDetails[e.target.name] = e.target.value;
  //   setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  //   if (ProposerDetails.autoFill === "Yes") {
  //     ProposerDetails.PermanentAddress.Address1 = ProposerDetails.CommunicationAddress.Address1;
  //     ProposerDetails.PermanentAddress.Address2 = ProposerDetails.CommunicationAddress.Address2;
  //     ProposerDetails.PermanentAddress.PlotNo = ProposerDetails.CommunicationAddress.PlotNo;
  //     ProposerDetails.PermanentAddress.NearestLandmark =
  //       ProposerDetails.CommunicationAddress.NearestLandmark;
  //     commonObj1.permanent.district = commonObj1.Comm.district;
  //     commonObj1.permanent.state = commonObj1.Comm.state;
  //     permAddress1.PinCode = ProposerDetails.PinCode;
  //     ProposerDetails.PermanentAddress.Country = ProposerDetails.CommunicationAddress.Country;
  //     setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  //   } else if (LPolicyDto.ProposerDetails.autoFill === "No") {
  //     ProposerDetails.PermanentAddress.Address1 = "";
  //     ProposerDetails.PermanentAddress.Address2 = "";
  //     ProposerDetails.PermanentAddress.PlotNo = "";
  //     ProposerDetails.PermanentAddress.NearestLandmark = "";
  //     commonObj1.permanent.district = "";
  //     commonObj1.permanent.state = "";
  //     permAddress1.PinCode = "";
  //     ProposerDetails.PermanentAddress.Country = "";
  //     setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  //   }
  // };

  const handleCommunicationAddresset = (e) => {
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
    setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  };
  const handlePermanentAddresset = (e) => {
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
    setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  };

  // const handleRadioChangeNewAccount = (e) => {
  //   const OtherDetails = [...LPolicyDto.OtherDetails];
  //   OtherDetails[0].EissuanceandOtherDetails[0][e.tasetLPolicyDtorget.name] = e.target.value;
  //   setLPolicyDto((prevState) => ({ ...prevState, OtherDetails }));
  // };
  // const handleRadioChangeInsurance = (e) => {
  //   const OtherDetails = [...LPolicyDto.OtherDetails];
  //   OtherDetails[0].EissuanceandOtherDetails[0][e.target.name] = e.target.value;
  //   setLPolicyDto((prevState) => ({ ...prevState, OtherDetails }));
  // };

  const handleSetPermPinCode = (e) => {
    const pincodeRegex = /^[0-9]{0,6}$/;
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails.PermanentAddress.District = "";
    ProposerDetails.PermanentAddress.State = "";
    if (pincodeRegex.test(e.target.value) || e.target.value === "") {
      // const { ProposerDetails } = LPolicyDto;
      permAddress1[e.target.name] = e.target.value;
      setPermAddress({ ...permAddress1 });
      ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
      setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
    }
    if (ProposerDetails.PermanentAddress.PinCode === "") {
      setPermPincode([]);

      // ProposerDetails.PermanentAddress.PinCode = "";
      setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
    }
  };
  const handleSetPincode = (e) => {
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails.CommunicationAddress.District = "";
    ProposerDetails.CommunicationAddress.State = "";
    const pincodeRegex = /^[0-9]{0,6}$/;
    if (pincodeRegex.test(e.target.value) || e.target.value === "") {
      // ProposerDetails[e.target.name] = e.target.value;
      ProposerDetails.CommunicationAddress.PinCode = e.target.value;
      setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));

      // if (e.target.value === "Yes") {
      //   permAddress1.Address = ProposerDetails.Address;
      //   // permAddress.District=commonObj.Comm.district
      //   permAddress1.PinCode = ProposerDetails.PinCode;
      //   // permAddress.State=commonObj.Comm.state;
      //   commonObj1.permanent.district = commonObj1.Comm.district;
      //   commonObj1.permanent.state = commonObj1.Comm.state;
      //   setPermAddress({ ...permAddress });
      // } else {
      //   permAddress1.Address = "";
      //   permAddress1.District = "";
      //   permAddress1.PinCode = "";
      //   permAddress1.State = "";
      //   commonObj1.permanent.district = "";
      //   commonObj1.permanent.state = "";
      //   setPermAddress({ ...permAddress1 });
      // }
    }
    if (ProposerDetails.CommunicationAddress.PinCode === "") {
      setCommPincode([]);
      ProposerDetails.CommunicationAddress.District = "";
      ProposerDetails.CommunicationAddress.State = "";
      // ProposerDetails.PermanentAddress.PinCode = "";
      setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
    }
  };

  const [pinCodeFlag, setPincodeFlag] = useState(false);
  const [pinCodeVal, setPinCodeVal] = useState(false);

  const handlePincodeValidation = (e) => {
    const pincodeRegex = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
    if (!pincodeRegex.test(e.target.value)) {
      setPincodeFlag(true);
    } else {
      setPincodeFlag(false);
    }
  };

  const handlePincodeValidationIfNo = (e) => {
    const pincodeRegex = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
    if (!pincodeRegex.test(e.target.value)) {
      setPinCodeVal(true);
    } else {
      setPinCodeVal(false);
    }
  };

  // const generateFile = (content, fileName) => {
  //   console.log("content", content);
  //   const src = `data:application/pdf;base64,${content}`;
  //   const link = document.createElement("a");
  //   link.href = src;

  //   link.download = fileName;
  //   console.log("FilenameQuote", link.download);

  //   link.click();
  // };

  // const handleproposal = async (proposalNumber1) => {
  //   // console.log("Proposalll", ProposalData.proposalNumber);
  //   console.log("proposal", proposalNumber1);
  //   const downloadDTO = {
  //     key: proposalNumber1,
  //     templateId: 77,
  //     referenceId: "",
  //   };
  //   await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
  //     console.log("result", result);
  //     if (result.status === 200) {
  //       generateFile(result.data, proposalNumber1);
  //     }
  //   });
  // };

  const callSaveProposalData = async (polDtoprop) => {
    // setloadingflag(true);
    if (proposalNumber !== null) {
      setloadingflag(true);
      await postRequest(`Policy/UpdateProposalDetails`, polDtoprop).then(async (result) => {
        console.log("Proposal Saved", result);
        setloadingflag(false);
        if (LPolicyDto.CkycStatus !== "failure" || CKYCStatus !== "failure") {
          if (polDtoprop["Quotation No"] !== "") {
            await callUpdateQuoteMethod(polDtoprop).then(async (response) => {
              console.log("Quotation updated", response);
            });
          }
          // await handleproposal(LPolicyDto.propNo);
          // await BGRProposalMail(LPolicyDto.ProposalNo, LPolicyDto.QuoteEmail);
          handleNext();
        }
        // console.log("Proposalll", ProposerDetails.proposalNumber);
      });
    } else {
      // debugger;
      setloadingflag(true);
      await callSaveProposalMethod(polDtoprop).then(async (result) => {
        console.log("Proposal Saved", result);
        if (result.data.status === 2) {
          LPolicyDto.proposalNumber = result.data.proposalNumber;
          LPolicyDto.ProposalNo = result.data.proposalNumber;
          LPolicyDto.propNo = result.data.proposalNumber;
          setLPolicyDto({ ...LPolicyDto });
          setProposalData({ ...result.data });
          // setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
          setloadingflag(false);
          if (LPolicyDto.CkycStatus !== "failure") {
            if (polDtoprop["Quotation No"] !== "") {
              const obj = {
                ...LPolicyDto,
                "Proposal No": result.data.proposalNumber,
              };
              await callUpdateQuoteMethod(obj).then(async (response) => {
                console.log("Quotation updated", response);
              });

              // await handleproposal(result.data.proposalNumber);
              // await BGRProposalMail(result.data.proposalNumber, LPolicyDto.QuoteEmail);
              handleNext();
            }
          }
        }
        // console.log("Proposalll", ProposerDetails.proposalNumber);
      });
    }
  };

  const [verifyOtp, setVerifyOtp] = useState(false);
  // const [checkProposalConsent, setCheckProposalConsent] = useState(false);
  // const [checkDisclaimer, setCheckDisclaimer] = useState(false);
  // const [OTP, setOTP] = useState("");

  const onNext = async () => {
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails.Name = `${ProposerDetails["First Name"]} ${ProposerDetails["Last Name"]}`;
    setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
    console.log("123456789", LPolicyDto);
    const polArray = { ...PolicyDto[valueTab] };
    PolicyDto.splice(valueTab, 1, { ...polArray });
    setPolicyDto([...PolicyDto]);

    if (
      LPolicyDto.ProposerDetails["Customer Type"] === "" ||
      LPolicyDto.ProposerDetails["First Name"] === "" ||
      (LPolicyDto.ProposerDetails["Customer Type"] !== "Corporate" &&
        LPolicyDto.ProposerDetails["Last Name"] === "") ||
      LPolicyDto.ProposerDetails["Date of Birth"] === "" ||
      LPolicyDto.ProposerDetails["Email ID"] === "" ||
      LPolicyDto.ProposerDetails["Mobile Number"] === "" ||
      LPolicyDto.ProposerDetails.CommunicationAddress.Address1 === "" ||
      (LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        LPolicyDto.ProposerDetails["Nominee First Name"] === "") ||
      (LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        LPolicyDto.ProposerDetails["Nominee Last Name"] === "") ||
      (LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        LPolicyDto.ProposerDetails["Is Nominee a Minor?"] === "") ||
      (LPolicyDto.ProposerDetails["Is Nominee a Minor?"] === "Yes" &&
        LPolicyDto.ProposerDetails["Appointee Name"] === "" &&
        LPolicyDto.ProposerDetails.RelationshipwithNominee === "") ||
      (LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        LPolicyDto.ProposerDetails["Nominee Date of Birth"] === "") ||
      (LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        LPolicyDto.ProposerDetails.NomineeGender === "") ||
      LPolicyDto.OtherDetails[0].FinancierInterest[0].IsHomeOwned === "" ||
      (LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        LPolicyDto.ProposerDetails.Salutation === "") ||
      LPolicyDto.ProposerDetails.CommunicationAddress.PlotNo === "" ||
      LPolicyDto.ProposerDetails.CommunicationAddress.Address1 === "" ||
      LPolicyDto.ProposerDetails.CommunicationAddress.District === "" ||
      LPolicyDto.ProposerDetails.PermanentAddress.PlotNo === "" ||
      LPolicyDto.ProposerDetails.PermanentAddress.Address1 === "" ||
      LPolicyDto.ProposerDetails.PermanentAddress.PinCode === "" ||
      LPolicyDto.ProposerDetails.PermanentAddress.District === "" ||
      LPolicyDto.ProposerDetails.RiskLocationAddress.PlotNo === "" ||
      LPolicyDto.ProposerDetails.RiskLocationAddress.Address1 === "" ||
      LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode === "" ||
      LPolicyDto.ProposerDetails.RiskLocationAddress.District === "" ||
      checkProposalConsent === false ||
      checkDisclaimer === false ||
      checkProposalConsent === false ||
      checkInsurance === false ||
      OTP === ""
    ) {
      setProposalFlag(true);
      swal({
        icon: "error",
        text: "Please select the required fileds* ",
        button: "OK",
      });
    } else {
      setProposalFlag(false);
      console.log("123", LPolicyDto.CkycStatus);
      if (LPolicyDto.CkycStatus === "") {
        swal({
          icon: "error",
          text: "Please initaite KYC before you proceed to payment",
        });
      } else if (LPolicyDto.CkycStatus === "failure") {
        getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
          async (result) => {
            console.log("result", result);
            const { partnerId } = result.data.userDetails[0];
            await getRequest(
              `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
                "userId"
              )}&productCode=2123`
            ).then(async (res) => {
              console.log("qwertyuiop", res);
              const partnerDetailssss = res.data.additionalDetails;
              console.log("123456789", partnerDetailssss);
              const partnerDetail = JSON.parse(partnerDetailssss);
              const { Channel } = LPolicyDto;
              Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
              Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
              Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
              Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
              Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
              Channel.AgentContactNo = partnerDetail.Mobile;
              Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
              Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
              Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
              const res1 = await fetchVericalData("782", "VerticalName", {});
              Channel.PrimaryVerticalName =
                partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
                  ? res1.filter(
                      (x) =>
                        x.VerticalCode ===
                        partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
                    )[0].mValue
                  : partnerDetail.AdditionalDetails.PrimaryVerticalName;
              Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
              Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
              Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
              Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
              Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
              Channel.DealId = partnerDetail.AdditionalDetails.DealId;
              // LPolicyDto["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;
              // setPolicyDto({ ...LPolicyDto });
              setLPolicyDto((prev) => ({ ...prev, Channel }));
              const obj = {
                ...LPolicyDto,
                Channel,
                DocumentDetails: docUpload[0].DocName === "" ? [] : docUpload,
              };
              // LPolicyDto.DocumentDetails = docUpload;
              await callSaveProposalData(obj);
            });
          }
        );
        swal({
          icon: "error",
          text: "CKYC is failure",
        });
      } else {
        console.log("12367890", LPolicyDto.CkycStatus);
        if (flags.panflag === true) {
          swal({ icon: "error", text: "Please enter valid Pan Number" });
        } else if (flags.gstflag === true && LPolicyDto.ProposerDetails["GST Number"] !== "") {
          swal({ icon: "error", text: "Please enter valid GST Number" });
        } else if (flags.emailflag === true) {
          swal({ icon: "error", text: "Please enter valid Email ID" });
        } else if (
          LPolicyDto.ProposerDetails["Is Nominee a Minor?"] === "No" &&
          LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
          LPolicyDto.ProposerDetails.NomineeAge < 18
        ) {
          swal({ icon: "error", text: "Nominee can't be major if his age is less than 18" });
        } else if (verifyOtp === true) {
          swal({ icon: "error", text: "Please enter the valid OTP" });
        } else if (flags.MobileNo === true) {
          swal({ icon: "error", text: "Please enter the valid Mobile Number" });
        } else {
          setloadingflag(true);
          getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
            async (result) => {
              console.log("result", result);
              const { partnerId } = result.data.userDetails[0];
              await getRequest(
                `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
                  "userId"
                )}&productCode=2123`
              ).then(async (res) => {
                console.log("qwertyuiop", res);
                const partnerDetailssss = res.data.additionalDetails;
                console.log("123456789", partnerDetailssss);
                const partnerDetail = JSON.parse(partnerDetailssss);
                const { Channel } = LPolicyDto;
                Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
                Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
                Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
                Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
                Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
                Channel.AgentContactNo = partnerDetail.Mobile;
                Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
                Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
                Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
                const res1 = await fetchVericalData("782", "VerticalName", {});
                Channel.PrimaryVerticalName =
                  partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
                    ? res1.filter(
                        (x) =>
                          x.VerticalCode ===
                          partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
                      )[0].mValue
                    : partnerDetail.AdditionalDetails.PrimaryVerticalName;
                Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
                Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
                Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
                Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
                Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
                Channel.DealId = partnerDetail.AdditionalDetails.DealId;
                setLPolicyDto((prev) => ({ ...prev, Channel }));
                const Obj = {
                  ...LPolicyDto,
                  Channel,
                  DocumentDetails: docUpload[0].DocName === "" ? [] : docUpload,
                };
                // LPolicyDto.DocumentDetails = docUpload;
                await callSaveProposalData(Obj);
                // setloadingflag(false);
              });
            }
          );
        }
      }
    }
  };
  // const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  // const skipInputRef = React.createRef();

  // useEffect(() => {
  //   skipInputRef.current.tabIndex = -1;
  // }, []);
  const handleOdSET = (e, type) => {
    switch (type) {
      case "financier": {
        const OtherDetails = [...LPolicyDto.OtherDetails];
        OtherDetails[0].FinancierInterest[0][e.target.name] = e.target.value;
        OtherDetails[0].FinancierInterest[0]["Branch of the Financial Institution"] =
          e.target.value;
        setLPolicyDto((prevState) => ({ ...prevState, OtherDetails }));
        break;
      }
      case "Eissuance": {
        const OtherDetails = [...LPolicyDto.OtherDetails];
        OtherDetails[0].FinancierInterest[0][e.target.name] = e.target.value;
        setLPolicyDto((prevState) => ({ ...prevState, OtherDetails }));
        break;
      }

      default:
        console.log("wrong choice");
    }
  };

  const handlePSDDateChange = (date1, name) => {
    setPolStartDate(date1);
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails[name] = formatDate(date1);
    const dt = new Date(date1);
    const date = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    // LPolicyDto["Policy End Date"] = new Date();
    const PolictTenure = LPolicyDto.ProposerDetails["Policy Tenure"];
    const enddate = new Date(year + Number(PolictTenure), month, date - 1);
    setPolEndDate(enddate);
    ProposerDetails["Policy End Date"] = formatDate(enddate);
    setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  };

  // const CustomCheckbox = styled(Checkbox)(({ themecheck }) => ({
  //   color: themecheck.status.danger,
  //   "&.Mui-checked": {
  //     color: themecheck.status.danger,
  //   },
  // }));

  // const themecheck = createTheme({
  //   status: {
  //     danger: blue[500],
  //   },
  // });

  const handleCheckBox = async (e) => {
    setCheckProposalConsent(!checkProposalConsent);
    if (e.target.checked === true) {
      const jsonValue = {
        communicationId: 185,
        keyType: "BGRQuote",
        key: LPolicyDto.QuoteNo,
        stakeHolderDetails: [
          {
            communicationType: "Email",
            stakeholderCode: "CUS",
            communicationValue: LPolicyDto.QuoteEmail,
          },
        ],
      };
      await postRequest(`Notifications/EventCommunicationExecution`, jsonValue).then((resp) => {
        console.log("resp", resp);
      });

      const MobileNo = LPolicyDto.QuoteMobileNo;
      const Message = `Dear customer,Quotation No. ${LPolicyDto.QuoteNo} is generated. Requesting to Pls provide your consent to proceed with the proposal.Best Regards,Universal Sompo General Insurance Co Ltd.`;
      await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
        console.log("1234567890", smsResp);
      });
    }
  };
  const handleOTPChange = (e) => {
    const otpregx = /^[0-9]*$/;
    if (otpregx.test(e.target.value)) {
      setOTP(e.target.value);
    }
  };

  const handleCheckDisclaimer = () => {
    setCheckDisclaimer(!checkDisclaimer);
  };
  const handleCheckInsurance = () => {
    setCheckInsurance(!checkInsurance);
  };

  const handleSendOTP = () => {
    if (LPolicyDto.ProposerDetails["Email ID"] === "") {
      swal({
        icon: "error",
        text: "Please enter  email ID",
      });
    } else {
      setStartCounterFlag(true);
      const sendOtp = {
        name: LPolicyDto.QuoteNo,
        otp: "1234",
        email: LPolicyDto.QuoteEmail,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: LPolicyDto.QuoteMobileNo,
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

  const [, dispatch] = useDataController();
  const [otpdisabled, setOtpdisabled] = useState(false);
  const handleVerifyOTP = () => {
    if (OTP === "") {
      swal({ icon: "error", text: "Please enter OTP" });
    } else {
      const verifyOTP = {
        otp: OTP,
        email: LPolicyDto.QuoteEmail,
        mobileNumber: LPolicyDto.QuoteMobileNo,
        userName: LPolicyDto.QuoteEmail,
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
            setOtpdisabled(true);
            // setOtpdisabled()
            swal({ icon: "success", text: "OTP verified successfully" });
          } else {
            setCheckDisclaimer(false);
            setCheckInsurance(false);
            setVerifyOtp(true);
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          setCheckDisclaimer(false);
          setCheckInsurance(false);
          setVerifyOtp(true);
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
    }
  };

  const handleBackToQuote = async () => {
    // debugger;
    // if (!Array.isArray(PolicyDto)) {
    //   // console.error("PolicyDto is not an array");
    //   return; // or handle the error appropriately
    // }

    const temp = PolicyDto.map((item, i) => {
      if (i === valueTab) return LPolicyDto;
      return item;
    });
    console.log("item", temp);
    setLPolicyDto(() => [...temp]);

    // const tempMaster = master.map((item, i) => {
    //   if (i === valueTab) return masterArray;
    //   return item;
    // });

    // setMaster(() => [...tempMaster]);
    // debugger;
    // const temp = PolicyDto?.map((item, index) => {
    //   if (index === valueTab) return LPolicyDto;
    //   return item;
    // });

    // const tempMaster = master.map((item, index) => {
    //   if (index === valueTab) return masterArray;
    //   return item;
    // });
    // setMaster(() => [...tempMaster]);
    await handleBack();
  };

  const handleCKYCVerification = async () => {
    // debugger;
    const { ProposerDetails } = LPolicyDto;

    if (LPolicyDto.ProposerDetails["Customer Type"] === "") {
      swal({
        icon: "warning",
        text: "Please select Customer Type before initaiting KYC",
      });
    } else if (
      (LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        LPolicyDto.ProposerDetails.CKYCParam === "PAN Number" &&
        LPolicyDto.ProposerDetails["PAN Number"] === "") ||
      (LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        LPolicyDto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
        LPolicyDto.ProposerDetails.AadharID === "") ||
      (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
        LPolicyDto.ProposerDetails["PAN Number"] === "" &&
        LPolicyDto.ProposerDetails["GST Number"] === "" &&
        LPolicyDto.ProposerDetails["CIN Number"] === "") ||
      LPolicyDto?.ProposerDetails["Date of Birth"] === ""
    ) {
      swal({
        icon: "error",
        text: "Please Fill the Ckyc Details",
      });
    } else if (Dob === true) {
      swal({
        icon: "error",
        text: "Age cannot be less than 18 Years",
      });
    } else if (
      flags.panflag === true &&
      LPolicyDto.ProposerDetails["PAN Number"] !== "" &&
      LPolicyDto.ProposerDetails["PAN Number"].length !== 10
    ) {
      swal({
        icon: "error",
        text: "Incorrect Pan Number",
      });
    } else if (
      flags.gstflag === true &&
      LPolicyDto.ProposerDetails["GST Number"] !== "" &&
      LPolicyDto.ProposerDetails["GST Number"].length !== 15
    ) {
      swal({
        icon: "error",
        text: "Incorrect GST Number",
      });
    } else if (
      flags.cinflag === true &&
      LPolicyDto.ProposerDetails["CIN Number"] !== "" &&
      LPolicyDto.ProposerDetails["CIN Number"].length !== 21
    ) {
      swal({
        icon: "error",
        text: "Incorrect CIN Number",
      });
    } else if (LPolicyDto.ProposerDetails.AadharID !== "") {
      const objAadhar = {
        source: "AVO",
        customerType: LPolicyDto.ProposerDetails["Customer Type"] === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo: LPolicyDto.ProposerDetails.AadharID,
        idType: "AADHAAR",
        dob: LPolicyDto.ProposerDetails["Date of Birth"],
        mobileNo: LPolicyDto.ProposerDetails.AadharMobileNo,
        pincode: "",
        ckycNo: "",
        extraField1: LPolicyDto.ProposerDetails.AadharName,
        extraField2: LPolicyDto.ProposerDetails.AadharGender === "Female" ? "F" : "M",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      await getCKYCDetails(782, objAadhar).then((data) => {
        setCKYCData(data);
        // console.log("CKYCData", CKYCData);
        setCKYCStatus(data.status);
        LPolicyDto.CkycStatus = data.status;
        setLPolicyDto({ ...LPolicyDto });
        let { CkycDetails } = LPolicyDto;
        CkycDetails = data;
        if (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate") {
          CkycDetails.result.dob = LPolicyDto?.ProposerDetails["Date of Birth"];
        }
        setLPolicyDto((prev) => ({ ...prev, CkycDetails }));

        if (data.status === "success") {
          setKYCSecDisable(true);

          ProposerDetails["First Name"] = data.result.firstName;
          ProposerDetails["Last Name"] = data.result.lastName;
          // ProposerDetails["Date of Birth"] = data.result.dob;
          if (data.result.dob === null || data.result.dob === "") {
            ProposerDetails["Date of Birth"] = data.result.ckycDate;
          } else {
            ProposerDetails["Date of Birth"] = data.result.dob;
          }
          // if (data.result.mobileNumber === null || data.result.mobileNumber === "") {
          ProposerDetails["Mobile Number"] = LPolicyDto.QuoteMobileNo;
          // }
          // else {
          //   ProposerDetails["Mobile Number"] = data.result.mobileNumber;
          // }

          ProposerDetails["Email ID"] = LPolicyDto.QuoteEmail;

          ProposerDetails.PermanentAddress.Address1 = data.result.address1;
          ProposerDetails.PermanentAddress.Address2 = data.result.address2;
          ProposerDetails["PAN Number"] = data.result.pan;
          permAddress1.PinCode = data.result.pincode;
          ProposerDetails.PermanentAddress.PinCode = data.result.pincode;
          setDate((prev) => ({
            ...prev,
            dateOfBirth: LPolicyDto?.ProposerDetails["Date of Birth"],
          }));
          setPermAddress((prev) => ({ ...prev, permAddress1 }));

          // setPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        }
        if (data.status === "failure") {
          // setCkycEmailFlag(true);
          setKYCSecDisable(false);
          // setKYCSecDisable(false);
          setCkycUpdateJson((prevState) => ({
            ...prevState,
            uniqueTransactionNumber: data.uniqueTransactionNumber,
          }));
        }
        // setCKYCData((prevState) => ({ ...prevState, CKYCData: data }));
        // setLPolicyDto((prevState) => ({ ...prevState, CkycStatus: CKYCStatus }));
        setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
      });
    } else {
      // debugger;
      const obj = {
        source: "AVO",
        customerType: LPolicyDto.ProposerDetails["Customer Type"] === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo:
          LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
            ? LPolicyDto.ProposerDetails["PAN Number"]
            : LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
              (LPolicyDto.ProposerDetails["PAN Number"] ||
                LPolicyDto.ProposerDetails["GST Number"] ||
                LPolicyDto.ProposerDetails["CIN Number"]),
        idType:
          LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
            ? LPolicyDto.ProposerDetails["PAN Number"] && "PAN"
            : LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
              ((LPolicyDto.ProposerDetails["PAN Number"] && "PAN") ||
                (LPolicyDto.ProposerDetails["GST Number"] && "GSTIN") ||
                (LPolicyDto.ProposerDetails["CIN Number"] && "CIN")),
        dob: LPolicyDto.ProposerDetails["Date of Birth"],
        mobileNo: "",
        pincode: "",
        ckycNo: "",
        extraField1: "",
        extraField2: "",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      await getCKYCDetails(782, obj).then((results) => {
        const data = results;
        setCKYCData(data);
        // console.log("CKYCData", CKYCData);
        setCKYCStatus(data.status);
        LPolicyDto.CkycStatus = data.status;
        LPolicyDto.CkycDetails = data;
        setLPolicyDto({ ...LPolicyDto });

        if (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate") {
          LPolicyDto.CkycDetails.result.dob = LPolicyDto?.ProposerDetails["Date of Birth"];
        }

        if (data.status === "success") {
          setKYCSecDisable(true);

          ProposerDetails["First Name"] = data.result.firstName;
          ProposerDetails["Last Name"] = data.result.lastName;
          // ProposerDetails["Date of Birth"] = data.result.dob;
          if (data.result.dob === null || data.result.dob === "") {
            ProposerDetails["Date of Birth"] = data.result.ckycDate;
          } else {
            ProposerDetails["Date of Birth"] = data.result.dob;
          }
          // if (data.result.mobileNumber === null || data.result.mobileNumber === "") {
          ProposerDetails["Mobile Number"] = LPolicyDto.QuoteMobileNo;
          // } else {
          //   ProposerDetails["Mobile Number"] = data.result.mobileNumber;
          // }

          ProposerDetails["Email ID"] = LPolicyDto.QuoteEmail;

          ProposerDetails.PermanentAddress.Address1 = data.result.address1;
          ProposerDetails.PermanentAddress.Address2 = data.result.address2;
          ProposerDetails["PAN Number"] = data.result.pan;
          permAddress1.PinCode = data.result.pincode;
          ProposerDetails.PermanentAddress.PinCode = data.result.pincode;
          setDate((prev) => ({
            ...prev,
            dateOfBirth: LPolicyDto?.ProposerDetails["Date of Birth"],
          }));
          setPermAddress((prev) => ({ ...prev, permAddress1 }));

          // setPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        }
        if (data.status === "failure") {
          // setCkycEmailFlag(true);
          setKYCSecDisable(false);
          // setKYCSecDisable(false);
          setCkycUpdateJson((prevState) => ({
            ...prevState,
            uniqueTransactionNumber: data.uniqueTransactionNumber,
          }));
        }
        // setCKYCData((prevState) => ({ ...prevState, CKYCData: data }));
        // setLPolicyDto((prevState) => ({ ...prevState, CkycStatus: CKYCStatus }));
        setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
      });
      await callUpdateQuoteMethod(LPolicyDto);
    }
  };

  const formatDateKYC = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const handleSetCKYC = (e, name) => {
    // debugger;
    if (name === "PAN") {
      if (e.target.value.length <= 10) {
        LPolicyDto.ProposerDetails["PAN Number"] = e.target.value;
      }
      // CKYCReqJSonValue.idType = name;
    } else if (name === "dateOfBirth") {
      if (LPolicyDto.ProposerDetails["Customer Type"] === "Individual") {
        const [day, month, year] = e;
        const date1 = new Date(`${year}-${month}-${day}`);
        const age = handleCalculateAge(date1.toLocaleDateString("en-ZA"));

        if (age < 18) {
          setDOB(true);
          LPolicyDto.ProposerDetails["Date of Birth"] = null;
        } else {
          setDOB(false);
          LPolicyDto.ProposerDetails["Date of Birth"] = formatDateKYC(e);
        }
        // }
      } else {
        setDOB(false);
        LPolicyDto.ProposerDetails["Date of Birth"] = formatDateKYC(e);
      }
    } else if (name === "GST Number") {
      if (e.target.value.length <= 15) {
        LPolicyDto.ProposerDetails["GST Number"] = e.target.value;
      }
    } else if (name === "CIN") {
      if (e.target.value.length <= 21) {
        LPolicyDto.ProposerDetails["CIN Number"] = e.target.value;
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
    setLPolicyDto({ ...LPolicyDto });
    console.log("GST", LPolicyDto);
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
      toEmail: LPolicyDto.QuoteEmail,
    };
    const mail = await BGRCkycRegMail(notificationReq);
    console.log("mail", mail);

    if (mail?.status === 1) {
      setKYCSecDisable(false);

      swal({
        text: `Link shared to register for CKYC Successfully.`,
        icon: "success",
      });
    }
    const MobileNo = LPolicyDto.QuoteMobileNo;
    const message = `Dear customer ,
    Greetings from Universal Sompo General Insurance!  Click here ${CKYCData.result.manualKYCurl} to complete your KYC. Please ignore if you have completed the KYC.`;
    await SendSMS("usgi", MobileNo, message).then((smsresp) => {
      console.log("smsresp", smsresp);
    });
  };

  const handleCkycUpdateStatus = async () => {
    if (LPolicyDto.ProposerDetails["Customer Type"] === "") {
      swal({
        icon: "warning",
        text: "Please select Customer Type before initaiting KYC",
      });
    } else if (
      (LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
        LPolicyDto.ProposerDetails.CKYCParam === "PAN Number" &&
        LPolicyDto.ProposerDetails["PAN Number"] === "") ||
      (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
        LPolicyDto.ProposerDetails["PAN Number"] === "" &&
        LPolicyDto.ProposerDetails["GST Number"] === "" &&
        LPolicyDto.ProposerDetails["CIN Number"] === "") ||
      LPolicyDto?.ProposerDetails["Date of Birth"] === ""
    ) {
      swal({
        icon: "error",
        text: "Please Fill the Ckyc Details",
      });
    } else if (Dob === true) {
      swal({
        icon: "error",
        text: "Age cannot be less than 18 Years",
      });
    } else if (
      flags.panflag === true &&
      LPolicyDto.ProposerDetails["PAN Number"] !== "" &&
      LPolicyDto.ProposerDetails["PAN Number"].length !== 10
    ) {
      swal({
        icon: "error",
        text: "Incorrect Pan Number",
      });
    } else if (
      flags.gstflag === true &&
      LPolicyDto.ProposerDetails["GST Number"] !== "" &&
      LPolicyDto.ProposerDetails["GST Number"].length !== 15
    ) {
      swal({
        icon: "error",
        text: "Incorrect GST Number",
      });
    } else if (
      flags.cinflag === true &&
      LPolicyDto.ProposerDetails["CIN Number"] !== "" &&
      LPolicyDto.ProposerDetails["CIN Number"].length !== 21
    ) {
      swal({
        icon: "error",
        text: "Incorrect CIN Number",
      });
    } else {
      await GetCkycUpdateStatus(CkycUpdateJson).then(async (results) => {
        const data1 = results;
        LPolicyDto.CkycDetails = data1;

        // LPolicyDto.CkycStatus = data1.status;
        // setLPolicyDto({ ...LPolicyDto });
        setCKYCStatus(data1.status);
        // LPolicyDto.CkycStatus = CKYCStatus;
        // setLPolicyDto({ ...LPolicyDto });
        setCKYCData(data1);
        // setLPolicyDto((prev) => ({ ...prev, CkycDetails: CKYCData }));
        // setCKYCUpdateData(data1);
        // setCKYCStatus(data1.status);
        LPolicyDto.CkycStatus = data1.status;
        setLPolicyDto({ ...LPolicyDto });

        if (data1.status === "success") {
          setKYCSecDisable(true);
          const { ProposerDetails } = LPolicyDto;

          if (
            data1.result.name.indexOf(" ") > 0 &&
            LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
          ) {
            const namesplit = data1.result.name.trim().split(" ");
            const [firstName] = namesplit;
            ProposerDetails["First Name"] = firstName;
            ProposerDetails["Last Name"] = namesplit.slice(1).join(" ");
            ProposerDetails.AadharName = data1.result.name;
          } else {
            ProposerDetails["First Name"] = data1.result.name;
          }
          // if (data1.result.mobileNumber === null || data1.result.mobileNumber === "") {
          ProposerDetails["Mobile Number"] = LPolicyDto.QuoteMobileNo;
          ProposerDetails.AadharMobileNo = LPolicyDto.QuoteMobileNo;
          // }
          //  else {
          //   ProposerDetails["Mobile Number"] = data1.result.mobileNumber;
          //   ProposerDetails.AadharMobileNo = data1.result.mobileNumber;
          // }
          if (data1.result.maskedAadhaarNumber !== "") {
            ProposerDetails.AadharID = data1.result.maskedAadhaarNumber.substring(
              data1.result.maskedAadhaarNumber.length - 4
            );
          }

          ProposerDetails["Email ID"] = LPolicyDto.QuoteEmail;
          if (data1.result.pan === "" || data1.result.pan === null) {
            ProposerDetails["PAN Number"] = LPolicyDto.ProposerDetails["PAN Number"];
          } else {
            ProposerDetails["PAN Number"] = data1?.result?.pan;
          }

          if (data1.result.uploadedDocument === "CIN") {
            setFlags((prevState) => ({ ...prevState, cinflag: false }));
            ProposerDetails["CIN Number"] = data1?.result?.idNo;
          }
          if (data1.result.uploadedDocument === "GSTIN") {
            // setFlags((prevState) => ({ ...prevState, gstflag: false }));
            ProposerDetails["GST Number"] = data1?.result?.idNo;
          }
          if (data1.result.dob === "" || data1.result.dob === null) {
            ProposerDetails["Date of Birth"] = data1.result.ckycDate;
          } else {
            ProposerDetails["Date of Birth"] =
              LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
                ? data1.result.dob
                : formatDate(data1.result.dob);
          }

          // const dobnew = data1.result.dob;

          console.log(kycDate, "kycDate");
          // console.log("ckycdob", new Date(dobnew[2], dobnew[1] - 1, dobnew[0]));
          ProposerDetails.PermanentAddress.Address1 = data1.result.address;
          // ProposerDetails.PermanentAddress.Address2 = data1.result.address2;
          ProposerDetails.PermanentAddress.PinCode = data1.result.pincode;
          // ProposerDetails.PinCode = data1.result.pincode;
          permAddress1.PinCode = data1.result.pincode;
          setPermAddress((prev) => ({ ...prev, permAddress1 }));
          setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
          await callUpdateQuoteMethod(LPolicyDto);
        }
        if (data1.status === "failure") {
          setKYCSecDisable(false);
        }

        // setCKYCData((prevState) => ({ ...prevState, CKYCData: data }));
        // setLPolicyDto((prevState) => ({ ...prevState, CkycStatus: CKYCStatus }));
      });
    }
  };
  const handleDistrict = async (event, value) => {
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails.RiskLocationAddress.District = value.mValue;
    const data = await getPincodeDetails(value.City_ID);
    ProposerDetails.District = data.city[0].CityDistrict_CD;
    ProposerDetails.State = data.city[0].State_CD;
    commonObj1.risk.district = value.mValue;
    commonObj1.risk.state = data.state[0].State_Name;
    ProposerDetails.RiskLocationAddress.State = data.state[0].State_Name;
    ProposerDetails.RiskLocationAddress.Districtcode = data.city[0].CityDistrict_CD;
    ProposerDetails.RiskLocationAddress.Statecode = data.city[0].State_CD;
    // ProposerDetails.RiskLocationAddress.District = data.district[0].District_Name;
    setCommonObj({ ...commonObj1 });
    setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
  };

  const handleDistrictComm = async (event, value) => {
    const { ProposerDetails } = LPolicyDto;

    ProposerDetails.CommunicationAddress.District = value.mValue;
    const data = await getPincodeDetails(value.City_ID);
    commonObj1.Comm.district = value.mValue;
    commonObj1.Comm.state = data.state[0].State_Name;
    ProposerDetails.CommunicationAddress.State = data.state[0].State_Name;
    ProposerDetails.CommunicationAddress.Districtcode = data.city[0].CityDistrict_CD;
    ProposerDetails.CommunicationAddress.Statecode = data.city[0].State_CD;
    // ProposerDetails.CommunicationAddress.District = data.district[0].District_Name;
    // setCKYCStatus(LPolicyDto.CkycDetails.status);
    commonObj1.permanent.state = LPolicyDto.ProposerDetails.PermanentAddress.State;
    commonObj1.permanent.district = LPolicyDto.ProposerDetails.PermanentAddress.District;
    // setKycDate(LPolicyDto.CkycDetails.result.ckycDate);
    setCommonObj({ ...commonObj1 });
    setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
  };
  console.log("kycDate123", kycDate);
  const handleDistrictPerm = async (event, value) => {
    const { ProposerDetails } = LPolicyDto;
    commonObj1.permanent.district = value.mValue;
    ProposerDetails.PermanentAddress.District = value.mValue;
    const data = await getPincodeDetails(value.City_ID);
    commonObj1.permanent.state = data.state[0].State_Name;
    ProposerDetails.PermanentAddress.State = commonObj1.permanent.state;
    ProposerDetails.PermanentAddress.Districtcode = data.city[0].CityDistrict_CD;
    ProposerDetails.PermanentAddress.Statecode = data.city[0].State_CD;

    // ProposerDetails.PermanentAddress.District = data.district[0].District_Name;
    setCommonObj({ ...commonObj });
    setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
  };

  // const today = new Date();
  // const handleInputKeyDown = (e) => {
  //   // Disable tab key
  //   if (e.key === "Tab") {
  //     e.preventDefault();
  //     // Allow opening the calendar when tabbing into the input field
  //     setIsDatePickerOpen(true);
  //   }
  // };
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

  const handlePermanentAddSameComm = (e) => {
    if (CKYCStatus === "failure") {
      swal({
        icon: "error",
        text: "CKYC failed. Complete the KYC verification",
      });
    } else {
      LPolicyDto.ProposerDetails.CommunicationSameAsPermanent = e.target.value;
      if (LPolicyDto.ProposerDetails.CommunicationSameAsPermanent === "Yes") {
        LPolicyDto.ProposerDetails.RiskLocationAddress.PlotNo =
          LPolicyDto.ProposerDetails.CommunicationAddress.PlotNo;
        LPolicyDto.ProposerDetails.RiskLocationAddress.Address1 =
          LPolicyDto.ProposerDetails.CommunicationAddress.Address1;
        LPolicyDto.ProposerDetails.RiskLocationAddress.Address2 =
          LPolicyDto.ProposerDetails.CommunicationAddress.Address2;
        LPolicyDto.ProposerDetails.RiskLocationAddress.NearestLandmark =
          LPolicyDto.ProposerDetails.CommunicationAddress.NearestLandmark;
        LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode =
          LPolicyDto.ProposerDetails.CommunicationAddress.PinCode;
        LPolicyDto.ProposerDetails.RiskLocationAddress.District =
          LPolicyDto.ProposerDetails.CommunicationAddress.District;
        LPolicyDto.ProposerDetails.RiskLocationAddress.City =
          LPolicyDto.ProposerDetails.CommunicationAddress.City;
        LPolicyDto.ProposerDetails.RiskLocationAddress.State =
          LPolicyDto.ProposerDetails.CommunicationAddress.State;
      } else if (LPolicyDto.ProposerDetails.CommunicationSameAsPermanent === "No") {
        LPolicyDto.ProposerDetails.RiskLocationAddress.PlotNo = "";
        LPolicyDto.ProposerDetails.RiskLocationAddress.Address1 = "";
        LPolicyDto.ProposerDetails.RiskLocationAddress.Address2 = "";
        LPolicyDto.ProposerDetails.RiskLocationAddress.NearestLandmark = "";
        LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode = "";
        LPolicyDto.ProposerDetails.RiskLocationAddress.District = "";
        LPolicyDto.ProposerDetails.RiskLocationAddress.City = "";
        LPolicyDto.ProposerDetails.RiskLocationAddress.State = "";
      }
      setLPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };

  useEffect(() => {
    if (LPolicyDto.ProposerDetails.CommunicationSameAsPermanent === "Yes") {
      LPolicyDto.ProposerDetails.RiskLocationAddress.PlotNo =
        LPolicyDto.ProposerDetails.CommunicationAddress.PlotNo;
      LPolicyDto.ProposerDetails.RiskLocationAddress.Address1 =
        LPolicyDto.ProposerDetails.CommunicationAddress.Address1;
      LPolicyDto.ProposerDetails.RiskLocationAddress.Address2 =
        LPolicyDto.ProposerDetails.CommunicationAddress.Address2;
      LPolicyDto.ProposerDetails.RiskLocationAddress.NearestLandmark =
        LPolicyDto.ProposerDetails.CommunicationAddress.NearestLandmark;
      LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode =
        LPolicyDto.ProposerDetails.CommunicationAddress.PinCode;
      LPolicyDto.ProposerDetails.RiskLocationAddress.District =
        LPolicyDto.ProposerDetails.CommunicationAddress.District;
      LPolicyDto.ProposerDetails.RiskLocationAddress.City =
        LPolicyDto.ProposerDetails.CommunicationAddress.City;
      LPolicyDto.ProposerDetails.RiskLocationAddress.State =
        LPolicyDto.ProposerDetails.CommunicationAddress.State;
    }
  }, [LPolicyDto]);
  const handleSetAutoComplete = (e, value) => {
    // debugger;
    const { ProposerDetails } = LPolicyDto;
    ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
    setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
    // LPolicyDto.ProposerDetails.AadharGender = value.mValue;
    // setLPolicyDto({ ...LPolicyDto });
    console.log("123", LPolicyDto);
  };
  const min = `${formatDateKYC(new Date(new Date().setDate(new Date().getDate() - 3)))}`;
  const max = addMonths(new Date(), 1);
  return (
    <MDBox pt={3}>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
        open={loadingflag}
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Customer Type
                </MDTypography>
                <ThemeProvider theme={theme}>
                  <RadioGroup
                    row
                    name="Customer Type"
                    onChange={handleRadioChangeCustomer}
                    value={LPolicyDto.ProposerDetails["Customer Type"]}
                    error={LPolicyDto.ProposerDetails["Customer Type"] === "" ? ProposalFlag : null}
                  >
                    <FormControlLabel
                      value="Individual"
                      control={<CustomRadio />}
                      label="Individual"
                      disabled={
                        LPolicyDto.CkycStatus === "success" ||
                        CKYCStatus === "success" ||
                        LPolicyDto.CkycStatus === "failure" ||
                        CKYCStatus === "failure"
                      }
                    />
                    <FormControlLabel
                      value="Corporate"
                      control={<CustomRadio />}
                      label="Corporate"
                      disabled={
                        LPolicyDto.CkycStatus === "success" ||
                        CKYCStatus === "success" ||
                        LPolicyDto.CkycStatus === "failure" ||
                        CKYCStatus === "failure"
                      }
                    />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
              {ProposalFlag && LPolicyDto.ProposerDetails["Customer Type"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="CKYC Status"
                  name="CKYC Status"
                  value={CKYCStatus || LPolicyDto.CkycStatus}
                  inputProps={{ disabled: true }}
                  style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
                  sx={{ ml: "1rem", mt: "1rem", mb: "1rem" }}
                />
              </Grid>
            </Grid>
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
                      onChange={handleSetValueParms}
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
                        LPolicyDto={LPolicyDto}
                        CKYCStatus={CKYCStatus}
                        datePlaceHolder={datePlaceHolder}
                        handleSetCKYC={handleSetCKYC}
                        PolicyDto={PolicyDto}
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
                        handleMobilesChange={handleMobilesChange}
                        LPolicyDto={LPolicyDto}
                        PolicyDto={PolicyDto}
                        // handlevalidChange={handlevalidChange}
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
            <Grid container spacing={2.5}>
              {LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2.7}
                    lg={2.7}
                    xl={2.7}
                    xxl={2.7}
                    sx={{ ml: "1rem" }}
                  >
                    <MDInput
                      label="PAN Number"
                      name="PAN"
                      InputProps={{
                        maxLength: 10,
                        disabled:
                          (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            LPolicyDto.ProposerDetails["CIN Number"] !== "") ||
                          (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            LPolicyDto.ProposerDetails["GST Number"] !== "") ||
                          LPolicyDto.CkycStatus === "success" ||
                          CKYCStatus === "success",
                      }}
                      value={LPolicyDto.ProposerDetails["PAN Number"]}
                      required
                      sx={redAsterisk}
                      onChange={(e) => handleSetCKYC(e, "PAN")}
                      onBlur={handlevalidChange}
                      disabled={
                        (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          LPolicyDto.ProposerDetails["CIN Number"] !== "") ||
                        (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          LPolicyDto.ProposerDetails["GST Number"] !== "") ||
                        LPolicyDto.CkycStatus === "success" ||
                        CKYCStatus === "success"
                      }
                    />
                    {flags.panflag && LPolicyDto.ProposerDetails["PAN Number"] !== "" ? (
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
                  <Grid item xs={12} sm={12} md={2.7} lg={2.7} xl={2.7} xxl={2.7}>
                    <MDInput
                      label="GSTIN Number"
                      name="GST Number"
                      value={LPolicyDto.ProposerDetails["GST Number"]}
                      required
                      sx={{
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                      onChange={(e) => handleSetCKYC(e, "GST Number")}
                      onBlur={handlevalidChange}
                      InputProps={{
                        disabled:
                          (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            LPolicyDto.ProposerDetails["CIN Number"] !== "") ||
                          (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            LPolicyDto.ProposerDetails["PAN Number"] !== "") ||
                          LPolicyDto.CkycStatus === "success" ||
                          CKYCStatus === "success",
                      }}
                      disabled={
                        (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          LPolicyDto.ProposerDetails["CIN Number"] !== "") ||
                        (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          LPolicyDto.ProposerDetails["PAN Number"] !== "") ||
                        LPolicyDto.CkycStatus === "success" ||
                        CKYCStatus === "success"
                      }
                    />
                    {flags.gstflag && LPolicyDto.ProposerDetails["GST Number"] !== "" ? (
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

                  <Grid item xs={12} sm={12} md={2.7} lg={2.7} xl={2.7} xxl={2.7}>
                    <MDInput
                      label="CIN Number"
                      name="CIN"
                      value={LPolicyDto.ProposerDetails["CIN Number"]}
                      required
                      sx={{
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                      onChange={(e) => handleSetCKYC(e, "CIN")}
                      onBlur={handlevalidChange}
                      InputProps={{
                        disabled:
                          (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            LPolicyDto.ProposerDetails["GST Number"] !== "") ||
                          (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                            LPolicyDto.ProposerDetails["PAN Number"] !== "") ||
                          LPolicyDto.CkycStatus === "success" ||
                          CKYCStatus === "success",
                      }}
                      disabled={
                        (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          LPolicyDto.ProposerDetails["GST Number"] !== "") ||
                        (LPolicyDto.ProposerDetails["Customer Type"] === "Corporate" &&
                          LPolicyDto.ProposerDetails["PAN Number"] !== "") ||
                        LPolicyDto.CkycStatus === "success" ||
                        CKYCStatus === "success"
                      }
                    />
                    {flags.cinflag && LPolicyDto.ProposerDetails["CIN Number"] !== "" ? (
                      <MDTypography
                        sx={{
                          color: "red",
                          fontSize: "10px",
                        }}
                      >
                        Enter Valid CIN Number
                      </MDTypography>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={12} md={2.7} lg={2.7} xl={2.7} xxl={2.7}>
                    <MDDatePicker
                      options={{
                        altFormat: "d-m-Y",
                        dateFormat: "d-m-Y",
                        altInput: true,
                        allowInput: true,
                        minDate: subYears(new Date(), 100),
                        maxDate: endOfYear(new Date()),
                      }}
                      input={{
                        required: true,
                        label:
                          LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
                            ? "Date of Birth"
                            : "Date of Incorporation",
                        value: LPolicyDto?.ProposerDetails["Date of Birth"],
                        allowInput: true,
                        placeholder: datePlaceHolder("d-m-Y"),
                        InputLabelProps: { shrink: true },
                        // disabled: true,
                      }}
                      name="dateOfBirth"
                      value={LPolicyDto?.ProposerDetails["Date of Birth"]}
                      onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
                      disabled={LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"}
                    />
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Grid container spacing={1}>
              <Stack
                direction="row"
                spacing={1}
                flexDirection="right"
                sx={{ mt: "2rem", ml: "1.5rem" }}
              >
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={handleCKYCVerification}
                  disabled={
                    LPolicyDto.CkycStatus === "success" ||
                    LPolicyDto.CkycStatus === "failure" ||
                    CKYCStatus === "success" ||
                    CKYCStatus === "failure"
                  }
                >
                  Initiate C-KYC
                </MDButton>
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={handleCkycUpdateStatus}
                  disabled={
                    LPolicyDto.CkycStatus === "success" ||
                    LPolicyDto.CkycStatus === "" ||
                    CKYCStatus === "success"
                    // CKYCStatus === "failure"
                  }
                >
                  Update Status
                </MDButton>
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={handleSendCkycRegMail}
                  disabled={
                    LPolicyDto.CkycStatus === "success" ||
                    LPolicyDto.CkycStatus === "" ||
                    CKYCStatus === "success"
                  }
                >
                  Send EMail-SMS
                </MDButton>
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} sx={{ ml: "1rem" }}>
          <MDDatePicker
            name="Policy Start Date"
            value={LPolicyDto.ProposerDetails["Policy Start Date"]}
            onChange={(date) => {
              handlePSDDateChange(date, "Policy Start Date");
            }}
            input={{
              label: "Policy Start Date",
              value: LPolicyDto.ProposerDetails["Policy Start Date"],
              allowInput: true,
            }}
            options={{
              altFormat: "d-m-Y",
              dateFormat: "d-m-Y",
              altInput: true,
              minDate: min,
              maxDate: max,
              allowInput: true,
              placeholder: datePlaceHolder("d-m-Y"),
            }}
            disablePast
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            name="Policy End Date"
            value={LPolicyDto.ProposerDetails["Policy End Date"]}
            options={{
              altFormat: "d-m-Y",
              dateFormat: "d-m-Y",
              altInput: true,
            }}
            input={{
              label: "Policy End Date",
              value: LPolicyDto.ProposerDetails["Policy End Date"],
              InputLabelProps: { shrink: true },
              inputProps: { disabled: true },
            }}
            disabled
          />
        </Grid>
      </Grid>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Financier Interest
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Is Home owned through hire/purchase/lease agreement?
                </MDTypography>
                <ThemeProvider theme={theme}>
                  <RadioGroup
                    row
                    name="IsHomeOwned"
                    value={LPolicyDto.OtherDetails[0].FinancierInterest[0].IsHomeOwned}
                    // handleOdSETonChange={handleSetValue}
                    // onChange={(e, value) => {
                    //   handleOdSET1(e, value, "financierHome");
                    // }}
                    onChange={handleRadioChangeOwed}
                    error={
                      LPolicyDto.OtherDetails[0].FinancierInterest[0].IsHomeOwned === ""
                        ? ProposalFlag
                        : null
                    }
                  >
                    <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                    <FormControlLabel value="No" control={<CustomRadio />} label="No" />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
              {ProposalFlag &&
              LPolicyDto.OtherDetails[0].FinancierInterest[0].IsHomeOwned === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {LPolicyDto.OtherDetails[0].FinancierInterest[0].IsHomeOwned === "Yes" ? (
              <>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  {/* <Autocomplete
                id="FinanceType"
                options={PropertyDetailsDataBind.FinanceType}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Select Finance Type"
                    value={LPolicyDto["Select Finance Type"]}
                    onChange={handleSetValue}
                    name="Select Finance Type"
                  />
                )} */}
                  <Autocomplete
                    id="Select Finance Type"
                    name="Select Finance Type"
                    onChange={handleFinanceChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                    }}
                    disableClearable
                    getOptionLabel={(option) => option.mValue}
                    value={{
                      mValue:
                        LPolicyDto.OtherDetails[0].FinancierInterest[0]["Select Finance Type"],
                    }}
                    options={FinanceType}
                    renderInput={(params) => (
                      <MDInput {...params} label="Select Finance Type" required sx={redAsterisk} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Financier Company Name"
                    name="Financier Company Name"
                    value={
                      LPolicyDto.OtherDetails[0].FinancierInterest[0]["Financier Company Name"]
                    }
                    // onChange={handleSetValue}
                    onChange={(e) => {
                      handleOdSET(e, "financier");
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Please enter company address"
                    name="Please enter company address"
                    value={
                      LPolicyDto.OtherDetails[0].FinancierInterest[0][
                        "Please enter company address"
                      ]
                    }
                    // onChange={handleSetValue}
                    onChange={(e) => {
                      handleOdSET(e, "financier");
                    }}
                  />
                </Grid>
              </>
            ) : null}
            {LPolicyDto.OtherDetails[0].FinancierInterest[0]["Select Finance Type"] ===
              "Hypothecation" &&
            LPolicyDto.OtherDetails[0].FinancierInterest[0].IsHomeOwned === "Yes" ? (
              <>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Loan Account Number"
                    name="Loan Account Number"
                    value={LPolicyDto.OtherDetails[0].FinancierInterest[0]["Loan Account Number"]}
                    // onChange={handleSetValue}
                    onChange={(e) => {
                      handleOdSET(e, "financier");
                    }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Branch of the Financial Institution"
                    name="Branch of the Financial Institution"
                    value={LPolicyDto["Branch of the Financial Institution"]}
                    // onChange={handleSetValue}
                    onChange={(e, value) => {
                      handleOdSET(e, value, "financier");
                    }}
                  />
                </Grid> */}
              </>
            ) : null}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Proposer details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Customer Type
                </MDTypography>
                <RadioGroup
                  row
                  name="Customer Type"
                  onChange={handleRadioChangeCustomer}
                  value={LPolicyDto.ProposerDetails["Customer Type"]}
                  error={LPolicyDto.ProposerDetails["Customer Type"] === "" ? ProposalFlag : null}
                >
                  <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                  <FormControlLabel value="Corporate" control={<Radio />} label="Corporate" />
                </RadioGroup>
              </Stack>
              {ProposalFlag && LPolicyDto.ProposerDetails["Customer Type"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {/* <MDInput label="Salutation" /> */}
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                disableClearable
                id="Salutation"
                name="Salutation"
                options={
                  LPolicyDto.ProposerDetails["Customer Type"] === "Corporate"
                    ? SalutationCor
                    : salutationData
                }
                onChange={handleSetValue}
                // value={masterArray.Salutation}
                value={{ mValue: LPolicyDto.ProposerDetails.Salutation }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Salutation"
                    required
                    sx={redAsterisk}
                    // error={
                    //   Object.values(masterArray.Salutation || {}).every(
                    //     (x) => x === null || x === ""
                    //   ) && LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
                    //     ? ProposalFlag
                    //     : null
                    // }
                  />
                )}
              />
              {ProposalFlag &&
              LPolicyDto.ProposerDetails["Customer Type"] === "Individual" &&
              LPolicyDto.ProposerDetails.Salutation === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                // value={LPolicyDto.Name}
                // name="Name"
                type="text"
                name="First Name"
                value={LPolicyDto.ProposerDetails["First Name"]}
                // onChange={handleSetValue}
                // onChange={handlevalidChange}
                onChange={(event) => handlevalidChange(event)}
                required
                sx={redAsterisk}
                onBlur={handlevalidChange}
                label={
                  LPolicyDto.ProposerDetails["Customer Type"] !== "Corporate"
                    ? "First Name"
                    : "Company/Organisation/Society Name"
                }
                error={LPolicyDto.ProposerDetails["First Name"] === "" ? ProposalFlag : null}
                disabled={LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"}
              />
              {ProposalFlag && LPolicyDto.ProposerDetails["First Name"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {LPolicyDto.ProposerDetails["Customer Type"] !== "Corporate" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  type="text"
                  label="Last Name"
                  name="Last Name"
                  value={LPolicyDto.ProposerDetails["Last Name"]}
                  // onChange={handleSetValue}
                  onChange={handlevalidChange}
                  required
                  sx={redAsterisk}
                  onBlur={handlevalidChange}
                  error={LPolicyDto.ProposerDetails["Last Name"] === "" ? ProposalFlag : null}
                  InputProps={{
                    disabled:
                      (LPolicyDto.ProposerDetails["Last Name"] !== "" &&
                        LPolicyDto.CkycStatus === "success") ||
                      (LPolicyDto.ProposerDetails["Last Name"] !== "" && CKYCStatus === "success"),
                  }}
                  disabled={
                    (LPolicyDto.ProposerDetails["Last Name"] !== "" &&
                      LPolicyDto.CkycStatus === "success") ||
                    (LPolicyDto.ProposerDetails["Last Name"] !== "" && CKYCStatus === "success")
                  }
                />
                {ProposalFlag && LPolicyDto.ProposerDetails["Last Name"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                options={{
                  altFormat: "d-m-Y",
                  dateFormat: "d-m-Y",
                  altInput: true,
                  minDate: subYears(new Date(), 100),
                  maxDate: endOfYear(new Date()),
                }}
                input={{
                  label:
                    LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
                      ? "Date of Birth"
                      : "Date of Incorporation",
                  value:
                    LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"
                      ? LPolicyDto.ProposerDetails["Date of Birth"]
                      : "",
                  allowInput: true,
                  placeholder: datePlaceHolder("d-m-Y"),
                  InputLabelProps: { shrink: true },
                }}
                type="login"
                id="Date of Birth"
                value={
                  LPolicyDto.CkycStatus === "success"
                    ? LPolicyDto.ProposerDetails["Date of Birth"]
                    : ""
                }
                disabled={LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                // type="number"
                value={LPolicyDto.ProposerDetails["Mobile Number"]}
                name="Mobile Number"
                // onChange={handleSetValue}
                onChange={handlevalidChange}
                inputProps={{ maxLength: 10 }}
                required
                sx={redAsterisk}
                label="Mobile Number"
                onBlur={handleMobilesChange}
                error={LPolicyDto.ProposerDetails["Mobile Number"] === "" ? ProposalFlag : null}
              />
              {ProposalFlag && LPolicyDto.ProposerDetails["Mobile Number"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {flags.MobileNo === true && LPolicyDto.ProposerDetails["Mobile Number"] !== "" ? (
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
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                value={LPolicyDto.ProposerDetails["Email ID"]}
                name="Email ID"
                onChange={handleEmailChange}
                required
                sx={redAsterisk}
                label="Email ID"
                error={LPolicyDto.ProposerDetails["Email ID"] === "" ? ProposalFlag : null}
                onBlur={handlevalidChange}
              />
              {ProposalFlag && LPolicyDto.ProposerDetails["Email ID"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {flags.emailflag === true && LPolicyDto.ProposerDetails["Email ID"] !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Enter Valid Email ID
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="GST Number"
                value={LPolicyDto.ProposerDetails["GST Number"]}
                label="GST Number"
                InputLabelProps={{ disabled: true }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="PAN Number"
                value={LPolicyDto.ProposerDetails["PAN Number"]}
                label="PAN Number"
                InputProps={{ disabled: true }}
                disabled
              />
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
            Permanent Address
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Plot No"
                onChange={handlePermanentAddresset}
                value={LPolicyDto.ProposerDetails.PermanentAddress.PlotNo}
                name="PlotNo"
                required
                sx={redAsterisk}
                // disabled={kycSecDisable}
              />
              {ProposalFlag && LPolicyDto.ProposerDetails.PermanentAddress.PlotNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                onChange={handlePermanentAddresset}
                value={LPolicyDto.ProposerDetails.PermanentAddress.Address1}
                name="Address1"
                InputProps={{ disabled: kycSecDisable }}
                disabled={kycSecDisable}
              />
              {ProposalFlag && LPolicyDto.ProposerDetails.PermanentAddress.Address1 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                onChange={handlePermanentAddresset}
                value={LPolicyDto.ProposerDetails.PermanentAddress.Address2}
                name="Address2"
                // disabled={kycSecDisable}
              />
              {/* {ProposalFlag && LPolicyDto.ProposerDetails.PermanentAddress.Address2 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Nearest Landmark"
                onChange={handlePermanentAddresset}
                value={LPolicyDto.ProposerDetails.PermanentAddress.NearestLandmark}
                name="NearestLandmark"
                // disabled={kycSecDisable}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Pincode"
                name="PinCode"
                onChange={handleSetPermPinCode}
                onBlur={handlePincodeValidationIfNo}
                // value={permAddress1.PinCode}
                value={LPolicyDto.ProposerDetails.PermanentAddress.PinCode}
                required
                sx={redAsterisk}
                // disabled={kycSecDisable}
              />
              {pinCodeVal && LPolicyDto.ProposerDetails.PermanentAddress.PinCode !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill a valid 6 digit pincode
                </MDTypography>
              ) : null}
              {ProposalFlag && LPolicyDto.ProposerDetails.PermanentAddress.PinCode === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill 6 digit pincode
                </MDTypography>
              ) : null}
              {PermPincodeErr && LPolicyDto.ProposerDetails.PermanentAddress.PinCode !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please a fill valid pincode
                </MDTypography>
              ) : null}
            </Grid>
            {permAddress1.PinCode !== "" &&
            permAddress1.PinCode.length === 6 &&
            LPolicyDto.ProposerDetails.PermanentAddress.District === "" &&
            LPolicyDto.ProposerDetails.PermanentAddress.State === "" ? (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
                open={pinPermLoad}
              >
                <CircularProgress />
              </Backdrop>
            ) : null}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {/* <MDInput
                label="City"
                // name="District"
                // value={LPolicyDto.ProposerDetails.PermanentAddress.District}
                value={commonObj.permanent.district}
                disabled
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
                options={permPincode}
                onChange={handleDistrictPerm}
                value={{ mValue: LPolicyDto.ProposerDetails.PermanentAddress.District }}
                // value={masterArray.NomineeTitle}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="City" required sx={redAsterisk} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="State"
                value={LPolicyDto.ProposerDetails.PermanentAddress.State}
                name="State"
                InputProps={{ disabled: true }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Country"
                value={LPolicyDto.ProposerDetails.PermanentAddress.Country}
                InputProps={{ disabled: true }}
                disabled
              />
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
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Plot No"
                onChange={handleCommunicationAddresset}
                value={LPolicyDto.ProposerDetails.CommunicationAddress.PlotNo}
                name="PlotNo"
                required
                sx={redAsterisk}
                error={
                  LPolicyDto.ProposerDetails.CommunicationAddress.PlotNo === ""
                    ? ProposalFlag
                    : null
                }
              />
              {ProposalFlag && LPolicyDto.ProposerDetails.CommunicationAddress.PlotNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                onChange={handleCommunicationAddresset}
                value={LPolicyDto.ProposerDetails.CommunicationAddress.Address1}
                name="Address1"
                required
                sx={redAsterisk}
                error={
                  LPolicyDto.ProposerDetails.CommunicationAddress.Address1 === ""
                    ? ProposalFlag
                    : null
                }
              />
              {ProposalFlag && LPolicyDto.ProposerDetails.CommunicationAddress.Address1 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                onChange={handleCommunicationAddresset}
                value={LPolicyDto.ProposerDetails.CommunicationAddress.Address2}
                name="Address2"
                // required
              />
              {/* {ProposalFlag && LPolicyDto.ProposerDetails.CommunicationAddress.Address2 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Nearest Landmark"
                onChange={handleCommunicationAddresset}
                value={LPolicyDto.ProposerDetails.CommunicationAddress.NearestLandmark}
                name="NearestLandmark"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Pincode"
                onChange={handleSetPincode}
                onBlur={handlePincodeValidation}
                required
                sx={redAsterisk}
                value={LPolicyDto.ProposerDetails.CommunicationAddress.PinCode}
                name="PinCode"
                inputProps={{ maxLength: 6 }}
                error={
                  LPolicyDto.ProposerDetails.CommunicationAddress.PinCode === ""
                    ? ProposalFlag
                    : null
                }
              />
              {ProposalFlag && LPolicyDto.ProposerDetails.CommunicationAddress.PinCode === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {pinCodeFlag && LPolicyDto.ProposerDetails.CommunicationAddress.PinCode !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill a valid 6 digit pincode
                </MDTypography>
              ) : null}
              {CommPincodeErr && LPolicyDto.ProposerDetails.CommunicationAddress.PinCode !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill a valid pincode
                </MDTypography>
              ) : null}
            </Grid>
            {LPolicyDto.ProposerDetails.CommunicationAddress.PinCode !== "" &&
            LPolicyDto.ProposerDetails.CommunicationAddress.PinCode.length === 6 &&
            commonObj1.Comm.district === "" &&
            commonObj1.Comm.state === "" ? (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
                open={pinLoad}
              >
                <CircularProgress />
              </Backdrop>
            ) : null}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {/* <MDInput
                label="City"
                value={LPolicyDto.ProposerDetails.CommunicationAddress.District}
                name="District"
                disabled
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
                options={commPincode}
                onChange={handleDistrictComm}
                value={{ mValue: LPolicyDto.ProposerDetails.CommunicationAddress.District }}
                // value={masterArray.NomineeTitle}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="City" required sx={redAsterisk} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="State"
                value={LPolicyDto.ProposerDetails.CommunicationAddress.State}
                name="State"
                InputProps={{ disabled: true }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Country"
                value={LPolicyDto.ProposerDetails.CommunicationAddress.Country}
                name="Country"
                InputProps={{ disabled: true }}
                disabled
              />
            </Grid>

            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Is Your Risk Location Address same as Communication Address
                </MDTypography>
                <RadioGroup
                  row
                  onChange={handleRadioChangePincode}
                  value={LPolicyDto.ProposerDetails.autoFill}
                  name="autoFill"
                  error={LPolicyDto.ProposerDetails.autoFill === "" ? ProposalFlag : null}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Stack>
              {ProposalFlag && LPolicyDto.ProposerDetails.autoFill === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
              Is Communication address same as Risk Location address
            </MDTypography>
            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={LPolicyDto.ProposerDetails.CommunicationSameAsPermanent}
                onClick={(e) => handlePermanentAddSameComm(e)}
              >
                <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                <FormControlLabel control={<CustomRadio />} label="No" value="No" />
              </RadioGroup>
            </ThemeProvider>
          </Stack>
        </Grid>
      </Grid>

      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" color="primary">
            Risk Location Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Plot No"
                onChange={handleRiskLocationDetails}
                value={LPolicyDto.ProposerDetails.RiskLocationAddress.PlotNo}
                name="PlotNo"
                required
                sx={redAsterisk}
                error={
                  LPolicyDto.ProposerDetails.RiskLocationAddress.PlotNo === "" ? ProposalFlag : null
                }
              />
              {ProposalFlag && LPolicyDto.ProposerDetails.RiskLocationAddress.PlotNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                onChange={handleRiskLocationDetails}
                value={LPolicyDto.ProposerDetails.RiskLocationAddress.Address1}
                name="Address1"
                required
                sx={redAsterisk}
                error={
                  LPolicyDto.ProposerDetails.RiskLocationAddress.Address1 === ""
                    ? ProposalFlag
                    : null
                }
              />
              {ProposalFlag && LPolicyDto.ProposerDetails.RiskLocationAddress.Address1 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                onChange={handleRiskLocationDetails}
                value={LPolicyDto.ProposerDetails.RiskLocationAddress.Address2}
                name="Address2"
                // required
              />
              {/* {ProposalFlag && LPolicyDto.ProposerDetails.RiskLocationAddress.Address2 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Nearest Landmark"
                onChange={handleRiskLocationDetails}
                value={LPolicyDto.ProposerDetails.RiskLocationAddress.NearestLandmark}
                name="NearestLandmark"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Pincode"
                onChange={handleRiskLocationDetails}
                onBlur={handlePincodeValidation}
                required
                sx={redAsterisk}
                value={LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode}
                name="PinCode"
                inputProps={{ maxLength: 6 }}
                error={
                  LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode === ""
                    ? ProposalFlag
                    : null
                }
              />
              {ProposalFlag && LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {pinCodeFlag && LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill a valid 6 digit pincode
                </MDTypography>
              ) : null}
              {RiskPincodeErr && LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill a valid pincode
                </MDTypography>
              ) : null}
            </Grid>
            {LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode !== "" &&
            LPolicyDto.ProposerDetails.RiskLocationAddress.PinCode.length === 6 &&
            commonObj1.risk.district === "" &&
            commonObj1.risk.state === "" ? (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
                open={pinLoad}
              >
                <CircularProgress />
              </Backdrop>
            ) : null}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {/* <MDInput
                label="City"
                value={LPolicyDto.ProposerDetails.RiskLocationAddress.District}
                name="District"
                disabled
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
                options={riskPincode}
                onChange={handleDistrict}
                value={{ mValue: LPolicyDto.ProposerDetails.RiskLocationAddress.District }}
                // value={masterArray.NomineeTitle}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="City" required sx={redAsterisk} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="State"
                value={LPolicyDto.ProposerDetails.RiskLocationAddress.State}
                name="State"
                InputProps={{ disabled: true }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Country"
                value={LPolicyDto.ProposerDetails.RiskLocationAddress.Country}
                name="Country"
                InputProps={{ disabled: true }}
                disabled
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {LPolicyDto.InsurableItem[0].RiskItems[0]["Do You want to take Personal Accident Cover?"] ===
        "Yes" || LPolicyDto.ProposerDetails["Customer Type"] === "Individual" ? (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" color="primary">
              Nominee Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  disableClearable
                  id="NomineeTitle"
                  name="Nominee Title"
                  options={salutationData}
                  onChange={handleSetValue}
                  value={{ mValue: LPolicyDto.ProposerDetails.NomineeTitle }}
                  // value={masterArray.NomineeTitle}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Nominee Title"
                      required
                      sx={redAsterisk}
                      error={LPolicyDto.ProposerDetails.NomineeTitle === "" && ProposalFlag}
                    />
                  )}
                />
                {ProposalFlag && LPolicyDto.ProposerDetails.NomineeTitle === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  type="text"
                  label="Nominee First Name"
                  // value={LPolicyDto["Nominee First Name"]}
                  value={LPolicyDto.ProposerDetails["Nominee First Name"]}
                  // onChange={handleSet}
                  // onChange={handlevalidNominee}
                  onChange={(event) => handlevalidNominee(event)}
                  name="Nominee First Name"
                  required
                  sx={redAsterisk}
                  onBlur={handlevalidNominee}
                  error={LPolicyDto.ProposerDetails["Nominee First Name"] === "" && ProposalFlag}
                />
                {ProposalFlag && LPolicyDto.ProposerDetails["Nominee First Name"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Nominee Last Name"
                  value={LPolicyDto.ProposerDetails["Nominee Last Name"]}
                  // onChange={handleSet}
                  onChange={handlevalidNominee}
                  name="Nominee Last Name"
                  required
                  sx={redAsterisk}
                  onBlur={handlevalidNominee}
                  error={
                    LPolicyDto.ProposerDetails["Nominee Last Name"] === "" ? ProposalFlag : null
                  }
                />
                {ProposalFlag && LPolicyDto.ProposerDetails["Nominee Last Name"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  // inputFormat="dd/MM/yyyy"
                  // type="login"
                  id="Nominee Date of Birth"
                  value={LPolicyDto.ProposerDetails["Nominee Date of Birth"]}
                  onChange={(date) =>
                    handleDateChangeNominee(date, "nomineeDOB", "Nominee Date of Birth")
                  }
                  input={{
                    label: "Date of Birth",
                    value: LPolicyDto.ProposerDetails["Nominee Date of Birth"],
                  }}
                  disableFuture
                  options={{
                    altFormat: "d-m-Y",
                    dateFormat: "d-m-Y",
                    altInput: true,
                    allowInput: true,
                    minDate: subYears(new Date(), 100),
                    maxDate: endOfYear(new Date()),

                    placeholder: datePlaceHolder("d-m-Y"),
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
                      error={
                        LPolicyDto.ProposerDetails["Nominee Date of Birth"] === "" && ProposalFlag
                      }
                    />
                  )}
                />
                {ProposalFlag && LPolicyDto.ProposerDetails["Nominee Date of Birth"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
                {/* {LPolicyDto.ProposerDetails["Nominee Date of Birth"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the valid date
                  </MDTypography>
                ) : null} */}

                {/* {flags.ageFlag ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill the required fields
                </MDTypography>
              ) : null} */}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                {/* <MDInput
                label="Nominee Gender"
                value={LPolicyDto["Nominee Gender"]}
                onChange={handleSet}
                name="Nominee Gender"
              /> */}
                <Autocomplete
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  disableClearable
                  id="NomineeGender"
                  name="NomineeGender"
                  value={{ mValue: LPolicyDto.ProposerDetails.NomineeGender }}
                  options={PropertyDetailsDataBind.NomineeGender}
                  onChange={handleSetValue}
                  // value={masterArray.NomineeGender}
                  getOptionLabel={(option) => option.mValue}
                  // renderInput={(params) => <MDInput {...params} label="Nominee Gender" required />}
                  renderInput={(params) => (
                    <MDInput
                      label="Nominee Gender"
                      {...params}
                      required
                      sx={redAsterisk}
                      variant="outlined"
                      error={LPolicyDto.ProposerDetails.NomineeGender === "" && ProposalFlag}
                    />
                  )}
                />
                {ProposalFlag && LPolicyDto.ProposerDetails.NomineeGender === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
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
                  id="Relationshipwithproposer"
                  name="Relationship with proposer"
                  options={PropertyDetailsDataBind.Relationshipwithproposer}
                  onChange={handleSetValue}
                  // value={masterArray.Relationshipwithproposer}

                  value={{ mValue: LPolicyDto.ProposerDetails.Relationshipwithproposer }}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Relationship with Proposer"
                      required
                      sx={redAsterisk}
                      error={
                        LPolicyDto.ProposerDetails.Relationshipwithproposer === "" && ProposalFlag
                      }
                    />
                  )}
                />
                {ProposalFlag && LPolicyDto.ProposerDetails.Relationshipwithproposer === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing={2}>
                  <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                    Is Nominee a Minor?
                  </MDTypography>
                  <ThemeProvider theme={theme}>
                    <RadioGroup
                      row
                      name="Is Nominee a Minor?"
                      value={LPolicyDto.ProposerDetails["Is Nominee a Minor?"]}
                      onChange={handleRadioNomineechanged}
                      error={
                        LPolicyDto.ProposerDetails["Is Nominee a Minor?"] === "" && ProposalFlag
                      }
                    >
                      <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                      <FormControlLabel value="No" control={<CustomRadio />} label="No" />
                    </RadioGroup>
                  </ThemeProvider>
                </Stack>
                {ProposalFlag && LPolicyDto.ProposerDetails["Is Nominee a Minor?"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
                {LPolicyDto.ProposerDetails["Is Nominee a Minor?"] === "No" &&
                LPolicyDto.ProposerDetails.NomineeAge < 18 ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Nominee cannot be major if his age is less than 18
                  </MDTypography>
                ) : null}
              </Grid>
              {/* end nominee minor */}

              {/*  condition for Yes no */}
              {LPolicyDto.ProposerDetails["Is Nominee a Minor?"] === "Yes" ? (
                <>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      label="Appointee Name"
                      value={LPolicyDto.ProposerDetails["Appointee Name"]}
                      // onChange={handleSet}
                      onChange={handlevalidNominee}
                      name="Appointee Name"
                      required
                      sx={redAsterisk}
                      onBlur={handlevalidNominee}
                      error={LPolicyDto.ProposerDetails["Appointee Name"] === "" && ProposalFlag}
                    />
                    {ProposalFlag && LPolicyDto.ProposerDetails["Appointee Name"] === "" ? (
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
                      id="RelationshipwithNominee"
                      name="Relationship with Nominee"
                      options={PropertyDetailsDataBind.RelationshipwithNominee}
                      onChange={handleSetValue}
                      value={{ mValue: LPolicyDto.ProposerDetails.RelationshipwithNominee }}
                      // value={masterArray.RelationshipwithNominee}
                      getOptionLabel={(option) => option.mValue}
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          label="Relationship with Nominee"
                          error={
                            LPolicyDto.ProposerDetails.RelationshipwithNominee === "" &&
                            ProposalFlag
                          }
                        />
                      )}
                    />
                    {ProposalFlag && LPolicyDto.ProposerDetails.RelationshipwithNominee === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill required field
                      </MDTypography>
                    ) : null}
                  </Grid>
                </>
              ) : null}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : null}
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Documents
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            <MDBox sx={{ bgcolor: "background.paper", width: "100%" }}>
              <AppBar position="static">
                <Tabs
                  value={values}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Upload" {...a11yProps(0)} />
                  <Tab label="Download" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <MDBox
                sx={{
                  width: "100%",
                }}
              >
                <TabPanel value={values} index={0} dir={themes.direction}>
                  <Grid container ml={2} width="100%" mt={1}>
                    <Table aria-label="simple table" width="100%">
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Documents Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Documents Remark</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Browse File</TableCell>
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
                              }}
                              disableClearable
                              id="Select Document"
                              name="Select Document"
                              options={Documen}
                              value={{ mValue: x.DocType }}
                              getOptionLabel={(option) => option.mValue}
                              onChange={(e, value) => handleDocType(e, value, i)}
                              renderInput={(params) => (
                                <MDInput
                                  {...params}
                                  label="Select Document"
                                  required
                                  sx={redAsterisk}
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
                                Choose and Upload
                                <input
                                  hidden
                                  accept="image/bmp, image/jpeg, image/jpg , image/png, .pdf, image/tiff"
                                  type="file"
                                  onChange={(e) => handleDocUpload(e, i)}
                                />
                              </MDButton>
                              <MDTypography sx={{ fontSize: "10px" }}>
                                {x.DocName !== "" ? x.DocName : ""}
                              </MDTypography>
                            </MDBox>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDeleteFile(x.DocName, i)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={5}
                              lg={5}
                              xl={5}
                              xxl={5}
                              sx={{ fontSize: "0.90rem" }}
                            >
                              <MDButton
                                variant="outlined"
                                size="small"
                                // valuesss={valuesss}
                                onClick={handleAddDoc}
                              >
                                Add
                              </MDButton>
                            </Grid>
                          </TableCell>
                          <TableCell>
                            {x.DocFlag === true ? (
                              <CancelIcon
                                fontSize="large"
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
                <TabPanel value={values} index={1} dir={themes.direction}>
                  <Grid container ml={2} width="100%" mt={1}>
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
                              <IconButton aria-label="delete" onClick={() => handleclearicon(i)}>
                                <DeleteIcon />
                              </IconButton>
                            ) : null}
                          </TableCell>
                        </TableBody>
                      ))}
                    </Table>
                  </Grid>
                </TabPanel>
              </MDBox>
              {/* </SwipeableViews> */}
            </MDBox>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Grid container spacing={1}>
        <MDBox display="flex" flexDirection="row">
          <MDBox display="flex" flexDirection="row" spacing={1} sx={{ ml: "1.5rem" }}>
            {/* <ThemeProvider theme={themecheck}> */}
            <Checkbox checked={checkProposalConsent} onChange={handleCheckBox} />
            {/* </ThemeProvider> */}
            <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
              Proposal consent
            </MDTypography>
          </MDBox>
        </MDBox>
        {ProposalFlag && checkProposalConsent === false ? (
          <MDTypography sx={{ color: "red", fontSize: "10px", mt: "0.5rem", ml: "0.5rem" }}>
            Please fill this Field
          </MDTypography>
        ) : null}
        {checkProposalConsent && (
          <>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={12} md={4}>
                <MDInput
                  label="Enter OTP"
                  name="OTP"
                  value={OTP}
                  onChange={handleOTPChange}
                  inputProps={{ maxLength: 6 }}
                  sx={{ ml: "2rem" }}
                  disabled={otpdisabled}
                />
                {ProposalFlag && OTP === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px", ml: 2 }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
                {verifyOtp && OTP !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px", ml: 2 }}>
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
                      ml: "2rem",
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
                    sx={{ ml: "2rem" }}
                    InputProps={{ disabled: otpdisabled }}
                    disabled={otpdisabled}
                  >
                    Re-Send OTP
                  </MDButton>
                ) : (
                  sendOtpFlag === true && (
                    <MDButton
                      color="primary"
                      variant="contained"
                      onClick={handleSendOTP}
                      sx={{ ml: "2rem" }}
                    >
                      Send OTP
                    </MDButton>
                  )
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={handleVerifyOTP}
                  disabled={otpdisabled}
                >
                  Verify OTP
                </MDButton>
              </Grid>
            </Grid>
            <MDBox display="flex" flexDirection="row" sx={{ ml: "1.5rem" }}>
              {/* <ThemeProvider theme={themecheck}> */}
              <Checkbox
                checked={checkDisclaimer}
                onChange={handleCheckDisclaimer}
                // sx={{ mt: "-5.5rem" }}
              />
              {/* </ThemeProvider> */}
              <MDTypography sx={{ fontSize: "1rem", marginTop: "5px", mb: "1rem" }}>
                I/We Hereby declare that the statements made by me/us in this proposal form are true
                to the best of my/our Knowledge and belief and I/we hereby agree that this
                declaration shall form the basis of the contract between me/us and the Universal
                Sompo GeneraL Insurance Company Limited insurance Company. <br />
              </MDTypography>
            </MDBox>
            {ProposalFlag && checkDisclaimer === false ? (
              <MDTypography sx={{ color: "red", fontSize: "10px", ml: 4 }}>
                Please fill this Field
              </MDTypography>
            ) : null}
            <MDBox display="flex" flexDirection="row" sx={{ ml: "1.5rem" }}>
              <Checkbox
                checked={checkInsurance}
                onChange={handleCheckInsurance}
                // sx={{ mt: "-5.5rem" }}
              />
              {/* </ThemeProvider> */}
              <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
                I/We also declare that any addition alteration are carried out after the submission
                of this proposal form that the same would be conveyed to the insurance company
                immediately.
              </MDTypography>
            </MDBox>

            {ProposalFlag && checkInsurance === false ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </>
        )}
      </Grid>
      {/* Restrict back button by shreya */}
      {proposalNumber !== null ? (
        <Grid container justifyContent="flex-end" mt={2} mb={2}>
          <MDButton onClick={onNext} color="primary" variant="contained">
            Proceed
          </MDButton>
        </Grid>
      ) : (
        <Grid container justifyContent="space-between" mt={2} mb={2}>
          <MDButton
            color="primary"
            variant="outlined"
            onClick={handleBackToQuote}
            startIcon={<ArrowBack />}
          >
            Back
          </MDButton>
          <MDButton onClick={onNext} color="primary" variant="contained">
            Proceed
          </MDButton>
        </Grid>
      )}
    </MDBox>
  );
}

export default ProposerDetailsData;
