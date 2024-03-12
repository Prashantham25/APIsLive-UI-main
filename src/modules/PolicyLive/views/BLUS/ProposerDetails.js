import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { ArrowBack } from "@mui/icons-material";
import MDDatePicker from "components/MDDatePicker";
// import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  // Divider,
  Autocomplete,
  Checkbox,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
// import { grey } from "@mui/material/colors";
// import swal from "sweetalert";
// import SwipeableViews from "react-swipeable-views";
import { useTheme, ThemeProvider, createTheme, styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import PropTypes from "prop-types";
import { grey } from "@mui/material/colors";
// import { isValid, addMonths } from "date-fns";
import swal from "sweetalert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isValid, addMonths } from "date-fns";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { UploadFiles, ViewFiles, SendSMS } from "modules/PolicyLive/views/BLUS/data/index";
// import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { useLocation } from "react-router-dom";
import MDButton from "../../../../components/MDButton";
import {
  getSalutation,
  getGender,
  // getState, getDistrict
  calculateProposal,
  // getState,
  // getDistrict,
  getCKYCDetails,
  BLUSCkycRegMail,
  GetCkycUpdateStatus,
} from "./data/index";
// import { callUpdateQuoteMethod, GetBGRMasters } from "../Home/data/index";
import { callUpdateQuoteMethod } from "../Home/data/index";
import { getOTP, GetOTP } from "../../../BrokerPortal/Pages/Registration/data/index";
import { useDataController } from "../../../BrokerPortal/context";
import { DeleteFile } from "../../../BrokerPortal/Pages/MyProfile/data/index";
// import { postRequest, getRequest } from "../../../../core/clients/axiosclient";
import { postRequest } from "../../../../core/clients/axiosclient";
// import MDDatePicker from "../../../../components/MDDatePicker";
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
function CkycParameterPan({
  LPolicyDto,
  datePlaceHolder,
  CKYCStatus,
  handleSetCKYC,
  PolicyDto,
  handlevalidChange,
  flags,
}) {
  return (
    <Stack direction="row" spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="PAN Number"
          name="PAN"
          value={PolicyDto.ProposerDetails.PAN}
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
          onChange={(e) => handleSetCKYC(e, "PAN")}
          disabled={PolicyDto.CkycStatus === "success" || PolicyDto.CkycStatus === "failure"}
        />
        {flags.panflag === true && PolicyDto.ProposerDetails.PAN !== "" ? (
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
            noClender:
              LPolicyDto.CkycStatus === "success" ||
              CKYCStatus === "success" ||
              LPolicyDto.CkycStatus === "failure",
          }}
          input={{
            required: true,
            label:
              LPolicyDto.CustomerType === "Individual" ? "Date of Birth" : "Date of Incorporation",

            value: LPolicyDto?.ProposerDetails.DOB,
            allowInput: true,
            placeholder: datePlaceHolder("d-m-Y"),
            InputLabelProps: { shrink: true },
            InputProps: {
              disabled:
                LPolicyDto.CkycStatus === "success" ||
                CKYCStatus === "success" ||
                PolicyDto.CkycStatus === "failure",
            },
          }}
          name="dateOfBirth"
          value={LPolicyDto?.ProposerDetails.DOB}
          onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
          disabled={
            LPolicyDto.CkycStatus === "success" ||
            CKYCStatus === "success" ||
            PolicyDto.CkycStatus === "failure"
          }
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
  LPolicyDto,
  PolicyDto,
  CKYCStatus,
  datePlaceHolder,
  handleSetCKYC,
  flags,
  handleFieldValidation,
}) {
  return (
    <Stack direction="row" spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="Enter last 4 digits of Aadhar"
          name="AadharID"
          id="AadharID"
          value={PolicyDto.ProposerDetails.AadharID}
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
          disabled={PolicyDto.CkycStatus === "success" || PolicyDto.CkycStatus === "failure"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDDatePicker
          options={{
            altFormat: "d-m-Y",
            dateFormat: "d-m-Y",
            altInput: true,
            allowInput: true,
            noClender:
              LPolicyDto.CkycStatus === "success" ||
              CKYCStatus === "success" ||
              LPolicyDto.CkycStatus === "failure",
          }}
          input={{
            required: true,
            label:
              LPolicyDto.CustomerType === "Individual" ? "Date of Birth" : "Date of Incorporation",

            value: LPolicyDto?.ProposerDetails.DOB,
            allowInput: true,
            placeholder: datePlaceHolder("d-m-Y"),
            InputLabelProps: { shrink: true },
            InputProps: {
              disabled:
                LPolicyDto.CkycStatus === "success" ||
                PolicyDto.CkycStatus === "failure" ||
                CKYCStatus === "success",
            },
          }}
          name="dateOfBirth"
          value={LPolicyDto?.ProposerDetails.DOB}
          onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
          disabled={
            LPolicyDto.CkycStatus === "success" ||
            PolicyDto.CkycStatus === "failure" ||
            CKYCStatus === "success"
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          label="Mobile No. as per Aadhar"
          name="AadharMobileNo"
          id="AadharMobileNo"
          value={PolicyDto.ProposerDetails.AadharMobileNo}
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
          disabled={PolicyDto.CkycStatus === "success" || PolicyDto.CkycStatus === "failure"}
        />
        {flags.AadharMobileNo && PolicyDto.ProposerDetails.AadharMobileNo !== "" ? (
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
          value={PolicyDto.ProposerDetails.AadharName}
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
          disabled={PolicyDto.CkycStatus === "success" || PolicyDto.CkycStatus === "failure"}
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
            disabled={PolicyDto.CkycStatus === "success" || PolicyDto.CkycStatus === "failure"}
          />
        )}
      />
    </Stack>
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
const formatPolDate = (date) => {
  const format = (val) => (val > 9 ? val : `0${val}`);
  const dt = new Date(date);
  return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
};
// const min = `${formatPolDate(new Date(new Date().setDate(new Date().getDate() - 3)))}`;
const min = `${formatPolDate(new Date())}`;
const max = addMonths(new Date(), 1);
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
function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Click On Resend OTP in 00:{counter}</div>;
}

function ProposerDetails({
  PolicyDto,
  setPolicyDto,
  handleNext,
  handleBack,
  setProposalNumber,
  proposalNumber,
  setMaster,
  master,
  setOTP,
  OTP,
  addLoc,
  setaddLoc,
  setCheckDisclaimer,
  checkDisclaimer,
  setCheckInsurance,
  checkInsurance,
  checkProposalConsent,
  setCheckProposalConsent,
  setDocUpload,
  docUpload,
  setPolEndDate,
  polEndDate,
  setPolStartDate,
  polStartDate,
  setCKYCReqJson,
  CKYCReqJSon,
  setCKYCStatus,
  CKYCStatus,
  setCKYCData,
  CKYCData,
  setIdType,
  IdType,
  setDateToShow,
  datetoShow,
  setKycDate,
  kycDate,
  setKYCSecDisable,
  kycSecDisable,
  CkycUpdateJson,
  setCkycUpdateJson,
}) {
  // console.log("PolicyDto", PolicyDto);
  // , PolicyDto, setPolicyDto
  // const navigate = useNavigate();
  // const handleProceed = () => {
  //   navigate(`DocumentsUpload`);
  // };
  // const { VerticalName } = GetBGRMasters().bgrMaster.Masters;
  const { search } = useLocation();
  const proposalNo = new URLSearchParams(search).get("proposernum");
  // const [PanCkycFlag, SetPanCkycFlag] = useState(false);
  // const [AaadharCkycFlag, SetAaadharCkycFlag] = useState(false);

  // const [validDate, setValidDate] = useState(false);
  const [flags, setFlags] = useState({
    emailflag: false,
    gstflag: false,
    gstflag1: false,
    panflag: false,
    mobileFlag: false,
    AadharMobileNo: false,
    cinflag: false,
    // errorFlag: true,
  });
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
  // const { VerticalName } = GetBGRMasters().bgrMaster.Masters;
  const [ProposerError, setProposerError] = useState(false);
  const LPolicyDto = PolicyDto;
  console.log("1234567890", LPolicyDto);
  // const [LPolicyDto, setLPolicyDto] = useState(PolicyDto);
  const masterArray = master;
  console.log("12345", master);
  const addLocation = addLoc;
  // const [polStartDate, setPolStartDate] = useState(null);
  // const [polEndDate, setPolEndDate] = useState(null);
  const [InsuredDOB, setDate] = useState(null);
  console.log(InsuredDOB);
  const [salutationData, setSalutationData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  // const [FirstName, setName] = useState();
  // const [ckycfalg, setCkycFalg] = useState(false);
  const ckycJson = CKYCReqJSon;
  const idTypeNew = IdType;
  const datetoShow1 = datetoShow;
  console.log("datetoShow1", datetoShow1);
  // const navigate = useNavigate();
  const [GST, setGST] = useState(false);
  const [CkycEmailFlag, setCkycEmailFlag] = useState(false);
  const [counter, setCounter] = useState(30);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [sendOtpFlag, setSendOtpFlag] = useState(true);
  const [status, setStatus] = useState(false);
  // const [CkycUpdateJson, setCkycUpdateJson] = useState({
  //   source: "AVO",
  //   uniqueTransactionNumber: "AVO/202301052516857",
  //   extraField1: "",
  //   extraField2: "",
  //   extraField3: "",
  //   extraField4: "",
  //   extraField5: "",
  // });
  const [CKYCUpdateData, setCKYCUpdateData] = useState();
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

    // const pincodeData = await getPincodeDistrictStateData("Pincode", pincodeValue);

    const city = await getPincodeDistrictStateData("City", pincodeValue);

    const district = await getPincodeDistrictStateData("District", city[0].DistrictID);

    const state = await getPincodeDistrictStateData("State", city[0].State_CD);

    return { city, district, state };
  };

  useEffect(async () => {
    setCKYCStatus(CKYCStatus === "" ? LPolicyDto.CkycStatus : CKYCStatus);
    LPolicyDto.CkycStatus = LPolicyDto.CkycStatus === "" ? CKYCStatus : LPolicyDto.CkycStatus;
    setPolicyDto({ ...LPolicyDto });
    if (LPolicyDto.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
      const obj = { Pincode: LPolicyDto.ProposerDetails.CommunicationAddress.Pincode };
      await postRequest(
        `Product/GetProdPartnermasterData?ProductId=782&MasterType=PinCode`,
        obj
      ).then((res) => {
        if (res.data.length > 0) {
          setCommPincode(res.data);
        } else {
          LPolicyDto.ProposerDetails.CommunicationAddress.Pincode = "";
          setPolicyDto({ ...LPolicyDto });
          swal({
            text: "Please enter a valid pincode",
            icon: "error",
          });
        }
      });
    }
  }, [LPolicyDto.ProposerDetails.CommunicationAddress.Pincode]);

  const handleDistrictComm = async (event, value) => {
    LPolicyDto.ProposerDetails.CommunicationAddress.CityDistrict = value.mValue;
    const data = await getPincodeDetails(value.City_ID);
    LPolicyDto.ProposerDetails.CommunicationAddress.State = data.state[0].State_Name;
    setPolicyDto({
      ...LPolicyDto,
    });
  };

  useEffect(async () => {
    if (LPolicyDto.ProposerDetails.PermanentAddress.Pincode.length === 6) {
      const obj = { Pincode: LPolicyDto.ProposerDetails.PermanentAddress.Pincode };
      await postRequest(
        `Product/GetProdPartnermasterData?ProductId=782&MasterType=PinCode`,
        obj
      ).then((res) => {
        if (res.data.length > 0) {
          setPermPincode(res.data);
        } else {
          LPolicyDto.ProposerDetails.PermanentAddress.Pincode = "";
          setPolicyDto({ ...LPolicyDto });
          swal({
            text: "Please enter a valid pincode",
            icon: "error",
          });
        }
      });
    }
  }, [LPolicyDto.ProposerDetails.PermanentAddress.Pincode]);
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

  const handleDistrictPerm = async (event, value) => {
    LPolicyDto.ProposerDetails.PermanentAddress.CityDistrict = value.mValue;
    const data = await getPincodeDetails(value.City_ID);
    LPolicyDto.ProposerDetails.PermanentAddress.State = data.state[0].State_Name;
    LPolicyDto.ProposerDetails.District = data.city[0].CityDistrict_CD;
    LPolicyDto.ProposerDetails.State = data.city[0].State_CD;
    setPolicyDto({
      ...LPolicyDto,
    });
  };

  const handleSetRadio = (e) => {
    if (e.target.name === "CustomerType") {
      LPolicyDto[e.target.name] = e.target.value;
    }
    setPolicyDto({ ...LPolicyDto });
    if (e.target.name === "CustomerType") {
      if (e.target.value === "Individual") {
        ckycJson.customerType = "I";
        LPolicyDto.ProposerDetails.PAN = "";
        LPolicyDto.ProposerDetails.DOB = "";
        setIdType((prev) => ({ ...prev, Pan: "", GSTIN: "", CIN: "" }));
        setKycDate(null);
      } else {
        LPolicyDto.ProposerDetails.PAN = "";
        LPolicyDto.ProposerDetails.DOB = "";
        LPolicyDto.ProposerDetails.GST = "";
        LPolicyDto.ProposerDetails.CIN = "";

        ckycJson.customerType = "C";
        setIdType((prev) => ({ ...prev, Pan: "" }));
        setKycDate(null);
      }
    }
    setCKYCReqJson((prevState) => ({ ...prevState, ...ckycJson }));
  };

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}/${format(dt.getMonth() + 1)}/${dt.getFullYear()}`;
  };

  // const handleCKYCVerification = async () => {
  //   if (PolicyDto.CustomerType === "") {
  //     swal({
  //       icon: "warning",
  //       text: "Please select Customer Type before initaiting KYC",
  //     });
  //   } else {
  //     getCKYCDetails(782, ckycJson).then((results) => {
  //       const data = results;
  //       setCKYCData(data);
  //       console.log("CKYCData", CKYCData);
  //       setCKYCStatus(data.status);
  //       // let { CkycDetails } = LPolicyDto;
  //       LPolicyDto.CkycDetails = data;
  //       if (PolicyDto.CustomerType === "Corporate") {
  //         LPolicyDto.CkycDetails.result.dob = ckycJson.dob;
  //       }
  //       // setPolicyDto((prev) => ({ ...prev, CkycDetails }));
  //       setPolicyDto({ ...LPolicyDto });

  //       console.log("CKYCresponse", data);
  //       console.log("CKYC Status", CKYCStatus, data.status);
  //       console.log("CKYCreqJSON", setCKYCReqJson);
  //       if (data.status === "failure") {
  //         setCkycEmailFlag(true);
  //         setKYCSecDisable(false);
  //         setCkycUpdateJson((prevState) => ({
  //           ...prevState,
  //           uniqueTransactionNumber: data.uniqueTransactionNumber,
  //         }));
  //       } else {
  //         setKYCSecDisable(true);
  //         // const ProposerDetailsData = LPolicyDto.ProposerDetails;
  //         LPolicyDto.ProposerDetails["First Name"] = data.result.firstName;
  //         LPolicyDto.ProposerDetails["Last Name"] = data.result.lastName;
  //         LPolicyDto.ProposerDetails.PAN = data.result.pan;
  //         LPolicyDto.ProposerDetails.DOB = formatDate(kycDate);
  //         console.log(kycDate, "kycDate");
  //         // ProposerDetailsData.DOB = formatDate(data.result.dob);
  //         // if (data.result.mobileNumber === null) {
  //         //   LPolicyDto.ProposerDetails.MobileNo = PolicyDto.ProposerDetails.MobileNo;
  //         // } else {
  //         //   // LPolicyDto.ProposerDetails.MobileNo = data.result.mobileNumber;
  //         // }
  //         LPolicyDto.ProposerDetails.PermanentAddress.AddressLine1 = data.result.address1;
  //         LPolicyDto.ProposerDetails.PermanentAddress.AddressLine2 = data.result.address2;
  //         LPolicyDto.ProposerDetails.PermanentAddress.Pincode = data.result.pincode;
  //         LPolicyDto.ProposerDetails.PinCode = data.result.pincode;
  //         setDate((prev) => ({ ...prev, dateOfBirth: kycDate }));
  //         setPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
  //       }
  //       setCKYCData((prevState) => ({ ...prevState, CKYCData: data }));
  //       setPolicyDto((prevState) => ({ ...prevState, CkycStatus: CKYCStatus }));
  //     });
  //   }
  // };
  // const formatDateKYC = (date) => {
  //   const format = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(date);
  //   return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  // };
  const handleCKYCVerification = async () => {
    if (LPolicyDto.CustomerType === "") {
      swal({
        icon: "warning",
        text: "Please select Customer Type before initaiting KYC",
      });
    } else if (
      LPolicyDto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
      (LPolicyDto.ProposerDetails.AadharID === "" ||
        LPolicyDto.ProposerDetails.AadharMobileNo === "" ||
        LPolicyDto.ProposerDetails.AadharGender === "" ||
        LPolicyDto.ProposerDetails.AadharName === "" ||
        LPolicyDto.ProposerDetails.DOB === "")
    ) {
      swal({
        icon: "error",
        text: "Please Fill the Ckyc Details",
      });
    } else if (
      (LPolicyDto.CustomerType === "Individual" &&
        LPolicyDto.ProposerDetails.CKYCParam === "PAN Number" &&
        LPolicyDto.ProposerDetails.PAN === "") ||
      (LPolicyDto.CustomerType === "Individual" &&
        LPolicyDto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
        LPolicyDto.ProposerDetails.AadharID === "") ||
      (LPolicyDto.CustomerType === "Corporate" &&
        LPolicyDto.ProposerDetails.PAN === "" &&
        LPolicyDto.ProposerDetails.GST === "" &&
        LPolicyDto.ProposerDetails.CIN === "") ||
      LPolicyDto?.ProposerDetails.DOB === ""
    ) {
      swal({
        icon: "error",
        text: "Please Fill the Ckyc Details",
      });
    } else if (
      flags.panflag === true &&
      LPolicyDto.ProposerDetails.PAN !== ""
      // LPolicyDto.ProposerDetails["PAN Number"].length === 6
    ) {
      swal({
        icon: "error",
        text: "Incorrect Pan Number",
      });
    } else if (
      GST === true &&
      LPolicyDto.ProposerDetails.GST !== ""
      // LPolicyDto.ProposerDetails["GST Number"].length === 15
    ) {
      swal({
        icon: "error",
        text: "Incorrect GST Number",
      });
    } else if (
      flags.cinflag === true &&
      LPolicyDto.ProposerDetails.CIN !== ""
      // LPolicyDto.ProposerDetails["CIN Number"].length === 21
    ) {
      swal({
        icon: "error",
        text: "Incorrect CIN Number",
      });
    } else if (LPolicyDto.ProposerDetails.AadharID !== "") {
      const objAadhar = {
        source: "AVO",
        customerType: LPolicyDto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo: LPolicyDto.ProposerDetails.AadharID,
        idType: "AADHAAR",
        dob: LPolicyDto.ProposerDetails.DOB,
        mobileNo: LPolicyDto.ProposerDetails.AadharMobileNo,
        pincode: "",
        ckycNo: "",
        extraField1: LPolicyDto.ProposerDetails.AadharName,
        extraField2: LPolicyDto.ProposerDetails.AadharGender === "Female" ? "F" : "M",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      await getCKYCDetails(782, objAadhar).then((results) => {
        const data = results;

        setCKYCData(data);

        console.log("CKYCData", CKYCData);

        setCKYCStatus(data.status);

        // let { CkycDetails } = LPolicyDto;

        LPolicyDto.CkycDetails = data;

        if (PolicyDto.CustomerType === "Corporate") {
          LPolicyDto.CkycDetails.result.dob = ckycJson.dob;
        }
        setCKYCStatus(data.status);
        LPolicyDto.CkycStatus = data.status;
        LPolicyDto.OtherDetails.GSTIN = LPolicyDto.ProposerDetails.GST;
        LPolicyDto.OtherDetails.PAN = LPolicyDto.ProposerDetails.PAN;

        // setPolicyDto((prev) => ({ ...prev, CkycDetails }));

        setPolicyDto({ ...LPolicyDto });

        console.log("CKYCresponse", data);

        console.log("CKYC Status", CKYCStatus, data.status);

        console.log("CKYCreqJSON", setCKYCReqJson);

        if (data.status === "failure") {
          setCkycEmailFlag(false);

          setKYCSecDisable(false);

          setCkycUpdateJson((prevState) => ({
            ...prevState,

            uniqueTransactionNumber: data.uniqueTransactionNumber,
          }));
        } else {
          setKYCSecDisable(true);

          // const ProposerDetailsData = LPolicyDto.ProposerDetails;

          LPolicyDto.ProposerDetails["First Name"] = data.result.firstName;

          if (data.result.lastName !== null) {
            LPolicyDto.ProposerDetails["Last Name"] = data.result.lastName;
          } else {
            LPolicyDto.ProposerDetails["Last Name"] = "";
          }
          // LPolicyDto.ProposerDetails["Last Name"] = data.result.lastName;

          LPolicyDto.ProposerDetails.PAN = data.result.pan;

          if (data.result.dob === "" || data.result.dob === null) {
            LPolicyDto.ProposerDetails.DOB = data.result.ckycDate;
          } else {
            LPolicyDto.ProposerDetails.DOB = data.result.dob;
          }

          console.log(kycDate, "kycDate");

          // ProposerDetailsData.DOB = formatDate(data.result.dob);

          if (data.result.mobileNumber === null || data.result.mobileNumber === "") {
            LPolicyDto.ProposerDetails.MobileNo = LPolicyDto.QuoteMobileNo;
          } else {
            LPolicyDto.ProposerDetails.MobileNo = data.result.mobileNumber;
          }

          if (data.result.email === "" || data.result.email === null) {
            LPolicyDto.ProposerDetails.EmailId = LPolicyDto.QuoteEmail;
          } else {
            LPolicyDto.ProposerDetails.EmailId = data.result.email;
          }

          LPolicyDto.ProposerDetails.PermanentAddress.AddressLine1 = data.result.address1;

          LPolicyDto.ProposerDetails.PermanentAddress.AddressLine2 = data.result.address2;

          LPolicyDto.ProposerDetails.PermanentAddress.Pincode = data.result.pincode;

          LPolicyDto.ProposerDetails.PinCode = data.result.pincode;

          setDate((prev) => ({ ...prev, dateOfBirth: kycDate }));

          setPolicyDto({ ...LPolicyDto });
        }

        // setPolicyDto((prevState) => ({ ...prevState, CkycStatus: CKYCStatus }));
      });
      await callUpdateQuoteMethod(LPolicyDto);
    } else {
      const obj = {
        source: "AVO",
        customerType: LPolicyDto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo:
          LPolicyDto.CustomerType === "Individual"
            ? LPolicyDto.ProposerDetails.PAN
            : LPolicyDto.CustomerType === "Corporate" &&
              (LPolicyDto.ProposerDetails.PAN ||
                LPolicyDto.ProposerDetails.GST ||
                LPolicyDto.ProposerDetails.CIN),
        idType:
          LPolicyDto.CustomerType === "Individual"
            ? LPolicyDto.ProposerDetails.PAN && "PAN"
            : LPolicyDto.CustomerType === "Corporate" &&
              ((LPolicyDto.ProposerDetails.PAN && "PAN") ||
                (LPolicyDto.ProposerDetails.GST && "GSTIN") ||
                (LPolicyDto.ProposerDetails.CIN && "CIN")),
        dob: LPolicyDto.ProposerDetails.DOB,
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

        console.log("CKYCData", CKYCData);

        setCKYCStatus(data.status);

        // let { CkycDetails } = LPolicyDto;

        LPolicyDto.CkycDetails = data;

        if (PolicyDto.CustomerType === "Corporate") {
          LPolicyDto.CkycDetails.result.dob = ckycJson.dob;
        }
        setCKYCStatus(data.status);
        LPolicyDto.CkycStatus = data.status;
        LPolicyDto.OtherDetails.GSTIN = LPolicyDto.ProposerDetails.GST;
        LPolicyDto.OtherDetails.PAN = LPolicyDto.ProposerDetails.PAN;

        // setPolicyDto((prev) => ({ ...prev, CkycDetails }));

        setPolicyDto({ ...LPolicyDto });

        console.log("CKYCresponse", data);

        console.log("CKYC Status", CKYCStatus, data.status);

        console.log("CKYCreqJSON", setCKYCReqJson);

        if (data.status === "failure") {
          setCkycEmailFlag(false);

          setKYCSecDisable(false);

          setCkycUpdateJson((prevState) => ({
            ...prevState,

            uniqueTransactionNumber: data.uniqueTransactionNumber,
          }));
        } else {
          setKYCSecDisable(true);

          // const ProposerDetailsData = LPolicyDto.ProposerDetails;

          LPolicyDto.ProposerDetails["First Name"] = data.result.firstName;

          if (data.result.lastName !== null) {
            LPolicyDto.ProposerDetails["Last Name"] = data.result.lastName;
          } else {
            LPolicyDto.ProposerDetails["Last Name"] = "";
          }
          // LPolicyDto.ProposerDetails["Last Name"] = data.result.lastName;

          LPolicyDto.ProposerDetails.PAN = data.result.pan;

          if (data.result.dob === "" || data.result.dob === null) {
            LPolicyDto.ProposerDetails.DOB = data.result.ckycDate;
          } else {
            LPolicyDto.ProposerDetails.DOB = data.result.dob;
          }

          console.log(kycDate, "kycDate");

          // ProposerDetailsData.DOB = formatDate(data.result.dob);

          if (data.result.mobileNumber === null || data.result.mobileNumber === "") {
            LPolicyDto.ProposerDetails.MobileNo = LPolicyDto.QuoteMobileNo;
          } else {
            LPolicyDto.ProposerDetails.MobileNo = data.result.mobileNumber;
          }

          if (data.result.email === "" || data.result.email === null) {
            LPolicyDto.ProposerDetails.EmailId = LPolicyDto.QuoteEmail;
          } else {
            LPolicyDto.ProposerDetails.EmailId = data.result.email;
          }

          LPolicyDto.ProposerDetails.PermanentAddress.AddressLine1 = data.result.address1;

          LPolicyDto.ProposerDetails.PermanentAddress.AddressLine2 = data.result.address2;

          LPolicyDto.ProposerDetails.PermanentAddress.Pincode = data.result.pincode;

          LPolicyDto.ProposerDetails.PinCode = data.result.pincode;

          setDate((prev) => ({ ...prev, dateOfBirth: kycDate }));

          setPolicyDto({ ...LPolicyDto });
        }

        // setPolicyDto((prevState) => ({ ...prevState, CkycStatus: CKYCStatus }));
      });
      await callUpdateQuoteMethod(LPolicyDto);
    }
  };

  console.log("LPolicyDto123", PolicyDto);
  const formatDateKYC = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const handleSetCKYC = (e, name) => {
    if (name === "PAN") {
      LPolicyDto.ProposerDetails.PAN = e.target.value;
      ckycJson.idNo = e.target.value;
      ckycJson.PAN = e.target.value;
      ckycJson.idType = name;
      idTypeNew.Pan = e.target.value;
    } else if (name === "dateOfBirth") {
      if (LPolicyDto.CustomerType === "Individual") {
        // LPolicyDto.ProposerDetails["Date of Birth"] = e;
        const [day, month, year] = e;
        const date1 = new Date(`${year}-${month}-${day}`);
        // if (e !== null && isValid(new Date(e)) && dateString === 4) {
        const age = handleCalculateAge(date1.toLocaleDateString("en-ZA"));

        if (age < 18) {
          swal({
            icon: "error",
            text: "Age cannot be less than 18 Years",
          });
          LPolicyDto.ProposerDetails.DOB = null;
        } else {
          LPolicyDto.ProposerDetails.DOB = formatDateKYC(e);
        }
        // }
      } else {
        LPolicyDto.ProposerDetails.DOB = formatDateKYC(e);
      }
    } else if (name === "GSTIN") {
      const gstRegex = /[!@#$%^&*()_+{}:;<>,.?~]/;
      if (e.target.value.length <= 15 && !gstRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.GST = e.target.value;
        ckycJson.idNo = e.target.value;
        ckycJson.idType = name;
        ckycJson.GSTIN = e.target.value;
      }
    } else if (name === "CIN") {
      const gstRegex = /[!@#$%^&*()_+{}:;<>,.?~]/;
      if (e.target.value.length <= 21 && !gstRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.CIN = e.target.value;
        ckycJson.idNo = e.target.value;
        ckycJson.CIN = e.target.value;
        ckycJson.idType = name;
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
      const gstRegex = /^[a-zA-Z\s]*$/;
      if (e.target.value.length <= 50 && gstRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.AadharName = e.target.value;
      }
    }
    setPolicyDto({
      ...LPolicyDto,
    });
    setCKYCReqJson((prevState) => ({ ...prevState, ...ckycJson }));
    console.log("reqJSON1", CKYCReqJSon);
  };

  // const handleSendCkycRegMail = async () => {
  //   console.log("QuoteNo", LPolicyDto["Quotation No"]);
  //   const mail = await BLUSCkycRegMail(
  //     LPolicyDto["Quotation No"],
  //     LPolicyDto.ProposerDetails["Email ID"]
  //   );
  //   console.log("mail", mail);
  //   if (mail.data.status === 1) {
  //     swal({
  //       text: `Link shared to register for CKYC
  //       Successfully.`,
  //       buttons: "Home",
  //       html: true,
  //       icon: "success",
  //     }).then(() => navigate(`/Home/BGR`));
  //     setCkycEmailFlag(false);
  //   }
  // };

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
      toEmail: LPolicyDto.ProposerDetails.EmailId,
    };
    const mail = await BLUSCkycRegMail(notificationReq);
    console.log("mail", mail);
    if (mail.data.status === 1) {
      swal({
        text: `Link shared to register for CKYC Successfully.`,
        icon: "success",
      });
      setCkycEmailFlag(false);
    }
    const MobileNo = LPolicyDto.QuoteMobileNo;
    const message = `Dear customer ,
    Greetings from Universal Sompo General Insurance!  Click here ${CKYCData.result.manualKYCurl} to complete your KYC. Please ignore if you have completed the KYC.`;
    await SendSMS("usgi", MobileNo, message).then((smsresp) => {
      console.log("smsresp", smsresp);
    });
  };
  // Ckyc Update status
  const handleCkycUpdateStatus = async () => {
    await GetCkycUpdateStatus(CkycUpdateJson).then((results) => {
      const data1 = results;
      setCKYCStatus(data1.status);
      LPolicyDto.CkycStatus = data1.status;
      LPolicyDto.CkycDetails = data1;
      // setCKYCStatus(data1.status);
      setCKYCUpdateData(data1);
      setPolicyDto({ ...LPolicyDto });
      console.log("CKYCUpdateData", CKYCUpdateData);
      console.log("CKYCresponse", data1);
      console.log("CKYC Status", CKYCStatus, data1.status);
      console.log("CKYCreqJSON", CkycUpdateJson);
      if (data1.status === "success") {
        LPolicyDto.CkycStatus = data1.status;
        setKYCSecDisable(true);
        if (data1.result.name.indexOf(" ") > 0 && LPolicyDto.CustomerType === "Individual") {
          const namesplit = data1.result.name.trim().split(" ");
          const [firstName] = namesplit;
          LPolicyDto.ProposerDetails["First Name"] = firstName;
          LPolicyDto.ProposerDetails["Last Name"] = namesplit.slice(1).join(" ");
          LPolicyDto.ProposerDetails.AadharName = data1.result.name;
        } else {
          LPolicyDto.ProposerDetails["First Name"] = data1.result.name;
        }
        if (data1.result.dob === "" || data1.result.dob === null) {
          LPolicyDto.ProposerDetails.DOB = data1.result.ckycDate;
        } else {
          LPolicyDto.ProposerDetails.DOB =
            LPolicyDto.CustomerType === "Individual"
              ? data1.result.dob
              : formatDate(data1.result.dob);
        }

        if (data1.result.mobileNumber === null || data1.result.mobileNumber === "") {
          LPolicyDto.ProposerDetails.MobileNo = LPolicyDto.QuoteMobileNo;
          LPolicyDto.ProposerDetails.AadharMobileNo = LPolicyDto.QuoteMobileNo;
        } else {
          LPolicyDto.ProposerDetails.MobileNo = data1.result.mobileNumber;
          LPolicyDto.ProposerDetails.AadharMobileNo = data1.result.mobileNumber;
        }
        if (data1.result.maskedAadhaarNumber !== "") {
          LPolicyDto.ProposerDetails.AadharID = data1.result.maskedAadhaarNumber.substring(
            data1.result.maskedAadhaarNumber.length - 4
          );
        }

        if (data1.result.email === "" || data1.result.email === null) {
          LPolicyDto.ProposerDetails.EmailId = LPolicyDto.QuoteEmail;
        } else {
          LPolicyDto.ProposerDetails.EmailId = data1.result.email;
        }
        LPolicyDto.ProposerDetails.PermanentAddress.AddressLine1 = data1.result.address;
        // LPolicyDto.ProposerDetails.PermanentAddress.AddressLine2 = data1?.result?.address2;
        LPolicyDto.ProposerDetails.PermanentAddress.Pincode = data1.result.pincode;
        LPolicyDto.ProposerDetails.PinCode = data1.result.pincode;
        if (data1.result.pan === "" || data1.result.pan === null) {
          LPolicyDto.ProposerDetails.PAN = PolicyDto.ProposerDetails.PAN;
        } else {
          LPolicyDto.ProposerDetails.PAN = data1?.result?.pan;
        }

        if (data1.result.uploadedDocument === "CIN") {
          setFlags((prevState) => ({ ...prevState, cinflag: false }));
          LPolicyDto.ProposerDetails.CIN = data1?.result?.idNo;
        }
        if (data1.result.uploadedDocument === "GSTIN") {
          setGST(false);
          // setFlags((prevState) => ({ ...prevState, gstflag: false }));
          LPolicyDto.ProposerDetails.GST = data1?.result?.idNo;
        }
        LPolicyDto.OtherDetails.GSTIN = LPolicyDto.ProposerDetails.GST;
        // setDate((prev) => ({ ...prev, dateOfBirth: new Date(dobnew[2], dobnew[1], dobnew[0]) }));
        // setKycDate(new Date(dobnew[2], dobnew[1], dobnew[0]));
      }
      if (data1.status === "failure") {
        setCkycEmailFlag(false);
        setKYCSecDisable(false);
      }
      setPolicyDto({ ...LPolicyDto });
      setCKYCData((prevState) => ({ ...prevState, CKYCData: data1 }));
      // setPolicyDto((prevState) => ({ ...prevState, CkycStatus: CKYCStatus }));
    });

    await callUpdateQuoteMethod(LPolicyDto);
  };
  const handleSetProposer = (e) => {
    if (e.target.name === "CorporateName") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          LPolicyDto[e.target.name] = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    } else if (e.target.name === "First Name") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
          setPolicyDto({
            ...LPolicyDto,
          });
        }
      }
    } else if (e.target.name === "Last Name") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
          setPolicyDto({
            ...LPolicyDto,
          });
        }
      }
    } else if (e.target.name === "EmailId") {
      if (e.target.value.length < 50) {
        // const nameReg = /^[a-zA-Z\s]+$/;
        // if (nameReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        // }
      }
    } else if (e.target.name === "MobileNo") {
      // const mobileRegex = /^[6-9]\d{1}[0-9]\d{9}$/;
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    }
  };
  const handleSetOther = (e) => {
    if (e.target.name === "CustomerEmailID") {
      if (e.target.value.length < 50) {
        // const nameReg = /^[a-zA-Z\s]+$/;
        // if (nameReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        // }
      }
    } else if (e.target.name === "GSTIN") {
      const gstRegex = /[!@#$%^&*()_+{}:;<>,.?~]/;
      if (!gstRegex.test(e.target.value)) {
        LPolicyDto.OtherDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "PAN") {
      // const nameReg = /^[a-zA-Z\s]+$/;
      // if (nameReg.test(e.target.value) || e.target.value === "") {
      LPolicyDto.OtherDetails[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      // }
    } else if (e.target.name === "CustomerContactNumber") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        LPolicyDto.OtherDetails[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    }
  };

  const handleFieldValidation = (e) => {
    if (e.target.name === "EmailId") {
      const emialReg =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/;
      if (!emialReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailflag: false }));
      }
    } else if (e.target.name === "MobileNo") {
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
    } else if (e.target.name === "CustomerEmailID") {
      const emialReg =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/;
      if (!emialReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailflag: false }));
      }
    } else if (e.target.name === "CustomerContactNumber") {
      const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!mobileRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, mobileFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, mobileFlag: false }));
      }
    }
  };

  const handlevalidChange = (event) => {
    if (event.target.name === "GSTIN") {
      const gstRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(event.target.value)) {
        // LPolicyDto.OtherDetails[event.target.name] = event.target.value;
        // setPolicyDto((prevState) => ({
        //   ...prevState,
        //   ...LPolicyDto,
        // }));
        setFlags((prevState) => ({ ...prevState, gstflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, gstflag: false }));
      }
    }
    // else if (event.target.name === "GSTNo") {
    //   const gstRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    //   if (!gstRegex.test(event.target.value)) {
    //     LPolicyDto.OtherDetails[event.target.name] = event.target.value;
    //     setPolicyDto((prevState) => ({
    //       ...prevState,
    //       ...LPolicyDto,
    //     }));
    //     setFlags((prevState) => ({ ...prevState, gstflag1: true }));
    //   } else {
    //     setFlags((prevState) => ({ ...prevState, gstflag1: false }));
    //   }
    // }
    else if (event.target.name === "PAN") {
      const PanRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      // if (PanRegex.test(event.target.value) || event.target.value === "") {
      if (!PanRegex.test(event.target.value)) {
        // LPolicyDto.OtherDetails[event.target.name] = event.target.value;
        // setPolicyDto((prevState) => ({
        //   ...prevState,
        //   ...LPolicyDto,
        // }));
        setFlags((prevState) => ({ ...prevState, panflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, panflag: false }));
      }
    }
  };
  const handlevalidother = (event) => {
    if (event.target.name === "GSTIN") {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(event.target.value)) {
        setGST(true);
      } else {
        setGST(false);
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

  const handleSetAutoComplete = (e, type, value) => {
    if (type === "Salutation") {
      masterArray[type] = value;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      LPolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      if (value.mValue === "Mr.") {
        masterArray.Gender = {
          mID: 2,
          mValue: "Male",
          mType: "Gender",
          mIsRequired: false,
          isActive: null,
        };
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        LPolicyDto.ProposerDetails.Gender = "Male";
      } else if (value.mValue === "Mrs." || value.mValue === "Ms.") {
        masterArray.Gender = {
          mID: 1,
          mValue: "Female",
          mType: "Gender",
          mIsRequired: false,
          isActive: null,
        };
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        LPolicyDto.ProposerDetails.Gender = "Female";
      } else {
        masterArray.Gender = { mID: "", mValue: "" };
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        LPolicyDto.ProposerDetails.Gender = "";
      }
      // setMaster((prevState) => ({ ...prevState, Salutation: { mID: "", mValue: "" } }));
    }
    if (type === "Gender") {
      masterArray[type] = value;
      console.log(value, "gendervalue");
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      LPolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
      // setMaster((prevState) => ({ ...prevState, Gender: { mID: "", mValue: "" } }));
    }
    // setMaster((prevState) => ({ ...prevState, PolicyType: value }));
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  // const handleDatePol1 = (e, name) => {
  //   const today = new Date(e);
  //   console.log(name);
  //   LPolicyDto[name] = formatDate(today);
  //   if (name === "PolicyEndDate") {
  //     LPolicyDto.PolicyStartDate = formatDate(today);
  //     setPolEndDate(e);
  //   } else {
  //     LPolicyDto.PolicyEndDate = formatDate(today);
  //     setPolStartDate(e);
  //   }
  //   setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  // };

  const handleDatePol1 = (e) => {
    const date1 = new Date(e).getFullYear();
    const dateString = date1.toString().length;
    if (e !== null && isValid(new Date(e)) && dateString === 4) {
      const today = new Date(e);
      setPolStartDate(e);
      LPolicyDto.ProposerDetails.PolicyStartDate = formatDate(today);
      const date = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      const polenddate = new Date(year + 1, month, date - 1);
      setPolEndDate(polenddate);
      LPolicyDto.ProposerDetails.PolicyEndDate = formatDate(polenddate);
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    } else {
      setPolEndDate(null);
      LPolicyDto.ProposerDetails.PolicyEndDate = null;
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    }
  };

  // const handleDateinsured = (e, name) => {
  //   const today = new Date(e);
  //   console.log(name);
  //   LPolicyDto.ProposerDetails.DOB = formatDate(today);
  //   if (name === "DOB") {
  //     setDate(e);
  //   }
  //   setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  // };

  const handlePermanentAdress = (e) => {
    if (e.target.name === "Pincode") {
      const pincodeRegex = /^[0-9]{0,6}$/;
      if (pincodeRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
        LPolicyDto.ProposerDetails.PinCode = e.target.value;
        if (e.target.value.length > 6) {
          LPolicyDto.ProposerDetails.PermanentAddress.State = "";
          LPolicyDto.ProposerDetails.PermanentAddress.CityDistrict = "";
        }
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else {
      LPolicyDto.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
      LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };

  const handleSetCommAdress = (e) => {
    if (e.target.name === "Pincode") {
      const pincodeRegex = /^[0-9]{0,6}$/;
      if (pincodeRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
        if (e.target.value.length > 6) {
          LPolicyDto.ProposerDetails.CommunicationAddress.State = "";
          LPolicyDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
        }
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else {
      LPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };

  const handleSetRiskLocation = async (e, type, id) => {
    switch (type) {
      case "Pincode": {
        const pincodeRegex = /^[0-9]{0,6}$/;
        if (pincodeRegex.test(e.target.value) || e.target.value === "") {
          LPolicyDto.InsurableItem[0].RiskItems[id][type] = e.target.value;
          // setPolicyDto(PolicyDto.InsurableItem[0].RiskItems);
          setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          if (PolicyDto.InsurableItem[0].RiskItems[id].Pincode.length === 6) {
            const abc = await getPincodeDetails(PolicyDto.InsurableItem[0].RiskItems[id].Pincode);
            console.log("abc", abc);
            LPolicyDto.InsurableItem[0].RiskItems[id].City = abc.district[0].District_Name;
            LPolicyDto.InsurableItem[0].RiskItems[id].State = abc.state[0].State_Name;
            setPolicyDto((prevState) => ({
              ...prevState,
              ...LPolicyDto,
            }));
          } else {
            LPolicyDto.InsurableItem[0].RiskItems[id].City = "";
            LPolicyDto.InsurableItem[0].RiskItems[id].State = "";
            setPolicyDto((prevState) => ({
              ...prevState,
              ...LPolicyDto,
            }));
          }
        }
        break;
      }
      case "Address1": {
        // const AddRegex = /^[a-zA-Z\s]+$/;
        // if (AddRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.InsurableItem[0].RiskItems[id][type] = e.target.value;
        addLocation[id].Address1 = e.target.value;
        setaddLoc([...addLocation]);
        setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
        // }
        break;
      }
      case "Address2": {
        // const AddRegex = /^[a-zA-Z\s]+$/;
        // if (AddRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.InsurableItem[0].RiskItems[id][type] = e.target.value;
        addLocation[id].Address2 = e.target.value;
        setaddLoc([...addLocation]);
        setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
        // }
        break;
      }
      case "GSTNo": {
        // const GstReg = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        // if (GstReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.InsurableItem[0].RiskItems[id][type] = e.target.value;
        setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
        // }
        break;
      }
      default: {
        console.log("wrong Data");
      }
    }
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  };

  // const handleSameAdress = (e) => {
  //   console.log("sameaddress");
  //   LPolicyDto.ProposerDetails.CommunicationSameasPermanentYN = e.target.value;
  //   setPolicyDto((prevState) => ({
  //     ...prevState,
  //     ...LPolicyDto,
  //   }));
  //   console.log(PolicyDto);
  //   if (e.target.value === "Yes") {
  //     console.log("sameaddress yes");
  //     LPolicyDto.InsurableItem[0].RiskItems[0].Address1 =
  //       LPolicyDto.ProposerDetails.CommunicationAddress.AddressLine1;
  //     LPolicyDto.InsurableItem[0].RiskItems[0].Address2 =
  //       LPolicyDto.ProposerDetails.CommunicationAddress.AddressLine2;
  //     LPolicyDto.InsurableItem[0].RiskItems[0].Pincode =
  //       LPolicyDto.ProposerDetails.CommunicationAddress.Pincode;
  //     LPolicyDto.InsurableItem[0].RiskItems[0].State =
  //       LPolicyDto.ProposerDetails.CommunicationAddress.State;
  //     LPolicyDto.InsurableItem[0].RiskItems[0].City =
  //       LPolicyDto.ProposerDetails.CommunicationAddress.CityDistrict;
  //     // LPolicyDto.ProposerDetails.PermanentAddress.Area =
  //     //   LPolicyDto.ProposerDetails.CommunicationAddress.Area;
  //     // PolicyDto.ProposerDetails.PermanentAddress.Country =
  //     //   PolicyDto.ProposerDetails.CommunicationAddress.Country;
  //   } else {
  //     console.log("sameaddress No");
  //     LPolicyDto.InsurableItem[0].RiskItems[0].Address1 = "";
  //     LPolicyDto.InsurableItem[0].RiskItems[0].Address2 = "";
  //     LPolicyDto.InsurableItem[0].RiskItems[0].City = "";
  //     LPolicyDto.InsurableItem[0].RiskItems[0].State = "";
  //     LPolicyDto.InsurableItem[0].RiskItems[0].Pincode = "";
  //     // LPolicyDto.ProposerDetails.PermanentAddress.Area =
  //     // "";
  //     // PolicyDto.ProposerDetails.PermanentAddress.Country = "";
  //   }

  //   setPolicyDto((prevState) => ({
  //     ...prevState,
  //     ...LPolicyDto,
  //   }));
  //   console.log(PolicyDto);
  // };

  const handlehypothecation = (e) => {
    if (e.target.name === "HypothecationFinancierName") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          LPolicyDto[e.target.name] = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    } else if (e.target.name === "FinancierAddress") {
      if (e.target.value.length < 50) {
        // const AlphaRegex = /^([A-Za-z]|[0-9])*$/;
        // if (AlphaRegex.test(e.target.value)) {
        LPolicyDto[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        // }
      }
    } else if (e.target.name === "SubriskCodeLocation1") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          LPolicyDto[e.target.name] = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    } else if (e.target.name === "GSTNo") {
      if (e.target.value.length < 50) {
        // const nameReg = /^[a-zA-Z\s]+$/;
        // if (nameReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        // }
      }
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

  useEffect(() => {
    console.log("dob change");
  }, [PolicyDto.PolicyStartDate]);

  // const callstateDistrict = async (data2) => {
  //   const dist = await getDistrict(data2);
  //   const state = await getState(dist[0].mdata[0].mID);
  //   return { dist, state };
  // };
  // useEffect(
  //   async (id) => {
  //     if (PolicyDto.InsurableItem[0].RiskItems[id].Pincode.length === 6) {
  //       const abc = await callstateDistrict(PolicyDto.InsurableItem[0].RiskItems[id].Pincode);
  //       console.log("abc", abc);
  //       LPolicyDto.InsurableItem[0].RiskItems[id].City = abc.dist[0].mdata[0].mValue;
  //       LPolicyDto.InsurableItem[0].RiskItems[id].State = abc.state[0].mdata[0].mValue;
  //       setPolicyDto((prevState) => ({
  //         ...prevState,
  //         PolicyDto: prevState.PolicyDto,
  //       }));
  //     }
  //   },
  //   [PolicyDto.InsurableItem[0].RiskItems[id].Pincode]
  // );
  const themes = useTheme();
  const [values, setValues] = React.useState(0);
  // const [Documents, setDocuments] = React.useState("");

  const handleChange = (event, newValues) => {
    setValues(newValues);
  };

  const Documen = [
    { mID: 1, mValue: "Pan Copy" },
    { mID: 2, mValue: "Cheque Copy" },
    { mID: 3, mValue: "DOB Proof" },
    { mID: 4, mValue: "Address Proof" },
    { mID: 5, mValue: "Other Document" },
    { mID: 6, mValue: "Photographs" },
    { mID: 7, mValue: "Risk Inspection Report" },
  ];
  // FOR ADD BUTTON

  // const [DocssFlag, setDocssFlag] = useState(false);
  // const [valuesss, setvaluesss] = React.useState(0);

  // FOR DELETE THE ROW FROM DOWNLOAD SECTION
  // const [DownFlag, setDownFlag] = useState(true);
  // const DeleteDownData = () => {
  //   setDownFlag(false);
  //   console.log(" something about delte options");
  // };

  // const handlerecentChange = (event, newValue) => {
  //   setvaluesss(newValue);
  //   // setTabFlag(true);
  //   setDocssFlag(true);
  // };

  // FOR DELETE OPTIONS
  // const [delt, setDelt] = React.useState(0);

  // const DeleteDocumentData = () => {
  //   setDocssFlag(false);
  //   console.log(" something about delte options");
  // };

  // FOR DOCUMENT UPLOAD SECTION CODE

  // let uploadedfilename = "";
  // const [filedata, setfiledata] = useState([]);
  // const [dwnfile, setdwnfile] = useState(" ");
  // const [flagss, setflagss] = useState(false);
  // let test = "";
  // let fileext = "";
  // const [dwlfilename, setdwlfilename] = useState(" ");
  // const [documenttype, setdocumenttype] = useState(" ");

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

  // let docfiles = "";
  // const handleSets = (event, value) => {
  //   console.log("enter into the handleset function");
  //   docfiles = value.mValue;
  //   // setdocfiles(docfiles);
  //   console.log("print the doc", docfiles);
  // };

  // FOR DELETE THE DOWNLOAD FILE
  // const handleFileDownload = async () => {
  //   console.log("FOR Delete the file");

  // };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);
    link.click();
  };
  const handleproposal = async (proposalNumber1) => {
    // console.log("Proposalll", ProposalData.proposalNumber);
    const downloadDTO = {
      refenceNumber: `${proposalNumber1}.pdf`,
      documentType: "Proposal",
      emailId: "",
    };
    await postRequest(`DMS/GetDocumentByType`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data.documentDetails[0].data, proposalNumber1);
      }
    });
  };
  const callProposal = async (Obj) => {
    if (proposalNo !== null) {
      postRequest(`Policy/UpdateProposalDetails`, Obj).then(async (res1) => {
        if (res1.data.status === 1) {
          const jsonValue = {
            communicationId: LPolicyDto.SubProduct === "BLUS" ? 124 : 126,
            keyType: LPolicyDto.SubProduct === "BLUS" ? "BLUSProposal" : "BSUSProposal",
            key: LPolicyDto.ProposalNo,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: LPolicyDto.QuoteEmail,
              },
            ],
          };
          postRequest(`Notifications/EventCommunicationExecution`, jsonValue).then((res) => {
            if (res.status === 200) {
              handleproposal(LPolicyDto.ProposalNo);
            }
          });
          // handleproposal(result.data.proposalNumber);
          setPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
          console.log(" PolicyDto.proposalNumber", LPolicyDto);
          console.log(" PolicyDto.proposalNumber", proposalNumber);
          // setPropFlag(false);
          if (CKYCStatus !== "failure") {
            await callUpdateQuoteMethod(LPolicyDto);
            await handleNext();
          }
        }
      });
    } else {
      console.log("callProposal....");
      await calculateProposal(Obj).then(async (result) => {
        console.log("11", result);
        if (result.data.proposalNumber !== "") {
          setProposalNumber(result.data.proposalNumber);
          LPolicyDto.proposalNumber = result.data.proposalNumber;
          LPolicyDto.ProposalNo = result.data.proposalNumber;
          const jsonValue = {
            communicationId: LPolicyDto.SubProduct === "BLUS" ? 124 : 126,
            keyType: LPolicyDto.SubProduct === "BLUS" ? "BLUSProposal" : "BSUSProposal",
            key: result.data.proposalNumber,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: LPolicyDto.QuoteEmail,
              },
            ],
          };
          // handleproposal(result.data.proposalNumber);
          setPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
          console.log(" PolicyDto.proposalNumber", LPolicyDto);
          console.log(" PolicyDto.proposalNumber", proposalNumber);
          // setPropFlag(false);
          if (CKYCStatus !== "failure") {
            await callUpdateQuoteMethod(LPolicyDto);
            postRequest(`Notifications/EventCommunicationExecution`, jsonValue).then((res) => {
              if (res.status === 200) {
                handleproposal(result.data.proposalNumber);
              }
            });
            await handleNext();
          }
        }
      });
    }
  };
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [loadingflag, setLoadingFlag] = useState(false);
  let isError = true;
  const handleRiskItem = () => {
    PolicyDto.InsurableItem[0].RiskItems.forEach((x) => {
      if (x.Address1 === "") {
        isError = true;
        setProposerError(true);
        swal({
          icon: "error",
          text: "Please fill the required fields",
        });
      } else {
        isError = false;
        setProposerError(false);
      }
    });
  };
  const onNext = async () => {
    handleRiskItem();
    // LPolicyDto.ProposerDetails.Name = `${LPolicyDto.ProposerDetails["First Name"]} ${LPolicyDto.ProposerDetails["Last Name"]}`;
    LPolicyDto.ProposerDetails.Name = `${LPolicyDto.ProposerDetails.ProposerName}`;
    setPolicyDto({ ...LPolicyDto });
    if (
      (PolicyDto.CustomerType === "Individual" && PolicyDto.ProposerDetails.Salutation === "") ||
      (PolicyDto.CustomerType === "Individual" && PolicyDto.ProposerDetails.Gender === "") ||
      (PolicyDto.CustomerType === "Individual" && PolicyDto.ProposerDetails["Last Name"] === "") ||
      PolicyDto.ProposerDetails["First Name"] === "" ||
      (PolicyDto.CustomerType === "Individual" && PolicyDto.ProposerDetails.DOB === "") ||
      PolicyDto.ProposerDetails.CommunicationAddress.Pincode === "" ||
      PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 === "" ||
      PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict === "" ||
      PolicyDto.ProposerDetails.CommunicationAddress.State === "" ||
      // PolicyDto.ProposerDetails.CommunicationSameasPermanentYN === "" ||
      PolicyDto.ProposerDetails.PermanentAddress.AddressLine1 === "" ||
      // PolicyDto.ProposerDetails.PermanentAddress.AddressLine2 === "" ||
      PolicyDto.ProposerDetails.PermanentAddress.Pincode === "" ||
      PolicyDto.ProposerDetails.PermanentAddress.CityDistrict === "" ||
      // PolicyDto.InsurableItem.RiskItems.Address1 === "" ||

      LPolicyDto.ProposerDetails.PolicyStartDate === "" ||
      LPolicyDto.ProposerDetails.PolicyEndDate === "" ||
      checkDisclaimer === false ||
      checkProposalConsent === false ||
      (checkProposalConsent === true ? OTP === "" && checkDisclaimer === false : null) ||
      checkInsurance === false
    ) {
      setProposerError(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (isError === false) {
      setProposerError(false);
      if (CKYCStatus === "") {
        swal({
          icon: "error",
          text: "Please initaite KYC before you proceed to payment",
        });
      } else if (CKYCStatus === "failure") {
        // getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
        //   async (result) => {
        //     console.log("result", result);
        //     const { partnerId } = result.data.userDetails[0];
        //     await getRequest(
        //       `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
        //         "userId"
        //       )}&productCode=${LPolicyDto.GCProductCode}`
        //     ).then(async (res) => {
        //       console.log("qwertyuiop", res);
        //       const partnerDetailssss = res.data.additionalDetails;
        //       console.log("123456789", partnerDetailssss);
        //       const partnerDetail = JSON.parse(partnerDetailssss);
        //       const { Channel } = LPolicyDto;
        //       Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
        //       Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
        //       Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
        //       Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
        //       Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
        //       Channel.AgentContactNo = partnerDetail.Mobile;
        //       Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
        //       Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
        //       Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
        //       Channel.PrimaryVerticalName =
        //         partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
        //           ? VerticalName.filter(
        //               (x) =>
        //                 x.VerticalCode ===
        //                 partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
        //             )[0].mValue
        //           : partnerDetail.AdditionalDetails.PrimaryVerticalName;
        //       Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
        //       Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
        //       Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
        //       Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
        //       Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
        //       Channel.DealId = partnerDetail.AdditionalDetails.DealId;
        //       setPolicyDto((prev) => ({ ...prev, Channel }));
        //       const Obj = {
        //         ...LPolicyDto,
        //         Channel,
        //         DocumentDetails: docUpload[0].DocName === "" ? [] : docUpload,
        //       };
        //       await callProposal(Obj);
        //       setLoadingFlag(false);
        //     });
        //   }
        // );
        await callProposal(LPolicyDto);
        swal({
          icon: "error",
          text: "CKYC is failure",
        });
      } else if (verifyOtp === true) {
        swal({ icon: "error", text: "Please enter the valid OTP" });
      } else {
        setLoadingFlag(true);
        // getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
        //   async (result) => {
        //     console.log("result", result);
        //     const { partnerId } = result.data.userDetails[0];
        //     await getRequest(
        //       `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
        //         "userId"
        //       )}&productCode=${LPolicyDto.GCProductCode}`
        //     ).then(async (res) => {
        //       console.log("qwertyuiop", res);
        //       const partnerDetailssss = res.data.additionalDetails;
        //       console.log("123456789", partnerDetailssss);
        //       const partnerDetail = JSON.parse(partnerDetailssss);
        //       const { Channel } = LPolicyDto;
        //       Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
        //       Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
        //       Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
        //       Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
        //       Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
        //       Channel.AgentContactNo = partnerDetail.Mobile;
        //       Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
        //       Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
        //       Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
        //       Channel.PrimaryVerticalName =
        //         partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
        //           ? VerticalName.filter(
        //               (x) =>
        //                 x.VerticalCode ===
        //                 partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
        //             )[0].mValue
        //           : partnerDetail.AdditionalDetails.PrimaryVerticalName;
        //       Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
        //       Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
        //       Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
        //       Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
        //       Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
        //       Channel.DealId = partnerDetail.AdditionalDetails.DealId;
        //       setPolicyDto((prev) => ({ ...prev, Channel }));
        //       const Obj = {
        //         ...LPolicyDto,
        //         Channel,
        //         DocumentDetails: docUpload[0].DocName === "" ? [] : docUpload,
        //       };

        //       await callProposal(Obj);
        //       // setLoadingFlag(false);
        //     });
        //   }
        // );
        const Obj = {
          ...LPolicyDto,
          // Channel,
          DocumentDetails: docUpload[0].DocName === "" ? [] : docUpload,
        };

        await callProposal(Obj);
      }
    }
  };

  const handleCheckBox = async (e) => {
    setCheckProposalConsent(!checkProposalConsent);
    if (e.target.checked === true) {
      const notificationReq = {
        notificationRequests: [
          {
            templateKey: "proposalconsentBLUS",
            sendEmail: false,
            isEmailBody: true,
            notificationPayload: JSON.stringify({
              Name:
                LPolicyDto.ProposerDetails["First Name"] + LPolicyDto.ProposerDetails["Last Name"],
              Salutation: LPolicyDto.ProposerDetails.Salutation,
              ProductName:
                LPolicyDto.SubProduct === "BSUS"
                  ? "BHARAT SUKHSHMA UDYAM SURAKSHA"
                  : "BHARAT LAGHU UDYAM SURAKSHA",
            }),
          },
        ],
        sendEmail: true,
        subject: `Quote No: ${LPolicyDto["Quotation No"]} Proposal Consent Required`,
        toEmail: LPolicyDto.ProposerDetails.EmailId,
      };
      await postRequest("Notifications/SendMultipleTemplateNotificationAsync", notificationReq);
      const MobileNo = LPolicyDto.QuoteMobileNo;
      const Message = `Dear customer,Quotation No. BLUS is generated. Requesting to Pls provide your consent to proceed with the proposal.Best Regards,Universal Sompo General Insurance Co Ltd.`;
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
  const handleCheckInsurance = () => {
    setCheckInsurance(!checkInsurance);
  };
  const handleCheckDisclaimer = () => {
    setCheckDisclaimer(!checkDisclaimer);
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
        name: "",
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
            swal({ icon: "success", text: "OTP verified successfully" });
          } else {
            setOtpdisabled(false);
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

  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}/${propformat(
      propdate.getMonth() + 1
    )}/${propdate.getFullYear()}`;
  };

  const handleDateChange1 = (value, label, type) => {
    console.log("value", value);
    // const ProposerDetailsData = LPolicyDto.ProposerDetails;
    datetoShow1.dateOfBirth = null;
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      // const dob = value.toLocaleDateString("en-ZA");
      // const age = handleCalculateAge(dob);
      const [day, month, year] = value;
      const date1 = new Date(`${year}-${month}-${day}`);
      // if (e !== null && isValid(new Date(e)) && dateString === 4) {
      const age = handleCalculateAge(date1.toLocaleDateString("en-ZA"));

      if (age < 18) {
        swal({
          icon: "error",
          text: "Age cannot be less than 18 Years",
        });
        setDate((prevState) => ({ ...prevState, [label]: null }));
        LPolicyDto.ProposerDetails[type] = "";
        LPolicyDto.ProposerDetails.DOB = "";
        LPolicyDto.ProposerDetails.Age = "";
        setDateToShow((prevState) => ({ ...prevState, [label]: null }));

        setPolicyDto({
          ...LPolicyDto,
        });
      } else {
        // setValidDate(false);
        setDateToShow((prevState) => ({ ...prevState, [label]: value }));

        // LPolicyDto.ProposerDetails[type] = formatPropDate(value);
        LPolicyDto.ProposerDetails.DOB = formatPropDate(value);
        LPolicyDto.ProposerDetails.Age = age;

        setPolicyDto({
          ...LPolicyDto,
        });
      }
      setFlags((prevState) => ({ ...prevState, Age: age }));
    } else {
      // setValidDate(true);
      setDate((prevState) => ({ ...prevState, [label]: null }));
    }
  };

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
        text: "Please select the  Document type before uploading",
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

  // const [ckycParmeter, setCkycParams] = useState("");
  const CkycParams = [
    { mID: 1, mValue: "PAN Number" },
    { mID: 2, mValue: "Aadhaar Number" },
  ];
  const handleSetValue = (e, value) => {
    // setCkycParams(value.mValue);
    LPolicyDto.ProposerDetails.CKYCParam = value.mValue;
    setPolicyDto({ ...LPolicyDto });
    if (value.mValue !== "PAN Number") {
      LPolicyDto.ProposerDetails.AadharID = "";
      LPolicyDto.ProposerDetails.AadharMobileNo = "";
      LPolicyDto.ProposerDetails.AadharGender = "";
      LPolicyDto.ProposerDetails.AadharName = "";
      LPolicyDto.ProposerDetails.DOB = "";
    } else {
      LPolicyDto.ProposerDetails.DOB = "";
      LPolicyDto.ProposerDetails.PAN = "";
    }
    setPolicyDto({ ...LPolicyDto });
    // if (value.mValue === "PAN Number") {
    //   SetPanCkycFlag(true);
    //   SetAaadharCkycFlag(false);
    // } else if (value.mValue === "Aaadhar Number") {
    //   SetAaadharCkycFlag(true);
    //   SetPanCkycFlag(false);
    // }
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

  return (
    <MDBox>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
        open={loadingflag}
      >
        <CircularProgress />
      </Backdrop>
      <Grid container>
        <Grid item sx={12} md={12} l={12} xl={12} xxl={12} ml={1}>
          <MDBox pt={3} width="95%">
            <Grid container>
              <MDBox pt={1} width="100%">
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
                              value={PolicyDto.CustomerType}
                              name="CustomerType"
                              onChange={handleSetRadio}

                              // defaultValue="Corporate"
                            >
                              <FormControlLabel
                                value="Individual"
                                control={<CustomRadio />}
                                label="Individual"
                                disabled={
                                  kycSecDisable ||
                                  CKYCStatus === "success" ||
                                  PolicyDto.CkycStatus === "success" ||
                                  PolicyDto.CkycStatus === "failure"
                                }
                              />
                              <FormControlLabel
                                value="Corporate"
                                control={<CustomRadio />}
                                label="Corporate"
                                disabled={
                                  kycSecDisable ||
                                  CKYCStatus === "success" ||
                                  PolicyDto.CkycStatus === "success" ||
                                  PolicyDto.CkycStatus === "failure"
                                }
                              />
                            </RadioGroup>
                          </ThemeProvider>
                        </Stack>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} sx={{ m: 1 }}>
                          <MDInput
                            label="CKYC Status"
                            name="CKYC Status"
                            value={CKYCStatus || LPolicyDto.CkycStatus}
                            disabled
                            sx={{ ml: "0.4rem" }}
                            inputProps={{ disabled: true }}
                          />
                        </Grid>
                      </Grid>
                      {}

                      {LPolicyDto.CustomerType === "Individual" && (
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
                                      PolicyDto.CkycStatus === "success" ||
                                      PolicyDto.CkycStatus === "failure"
                                    }
                                  />
                                )}
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            {/* {PanCkycFlag === true ? ( */}
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
                            {/* {AaadharCkycFlag === true ? ( */}
                            {LPolicyDto.ProposerDetails.CKYCParam === "Aadhaar Number" ? (
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                                xxl={12}
                                ml={1}
                                mt={2}
                              >
                                <CkycParameterAadhar
                                  genderData={genderData}
                                  handleSetAutoComplete={handleSetAutoComplete}
                                  masterArray={masterArray}
                                  ProposerError={ProposerError}
                                  LPolicyDto={LPolicyDto}
                                  PolicyDto={PolicyDto}
                                  CKYCStatus={CKYCStatus}
                                  datePlaceHolder={datePlaceHolder}
                                  handleSetCKYC={handleSetCKYC}
                                  handleFieldValidation={handleFieldValidation}
                                  flags={flags}
                                />
                              </Grid>
                            ) : null}
                          </Grid>
                        </>
                      )}
                      <Grid container spacing={2} sx={{ m: 2 }}>
                        <Stack direction="row" spacing={1}>
                          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <MDInput
                              label="PAN Number"
                              name="PAN"
                              value={PolicyDto.ProposerDetails.PAN}
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
                              onChange={(e) => handleSetCKYC(e, "PAN")}
                              disabled={
                                PolicyDto.CkycStatus === "success" ||
                                (PolicyDto.CustomerType === "Corporate" &&
                                  PolicyDto.ProposerDetails.CIN !== "") ||
                                (PolicyDto.CustomerType === "Corporate" &&
                                  PolicyDto.ProposerDetails.GST !== "")
                              }
                            />
                            {flags.panflag === true && PolicyDto.ProposerDetails.PAN !== "" ? (
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
                          {PolicyDto.CustomerType === "Corporate" ? (
                            <>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="PAN Number"
                                  name="PAN"
                                  value={PolicyDto.ProposerDetails.PAN}
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
                                  onChange={(e) => handleSetCKYC(e, "PAN")}
                                  disabled={
                                    PolicyDto.CkycStatus === "success" ||
                                    PolicyDto.CkycStatus ===
                                      "failure"(
                                        PolicyDto.CustomerType === "Corporate" &&
                                          PolicyDto.ProposerDetails.CIN !== ""
                                      ) ||
                                    (PolicyDto.CustomerType === "Corporate" &&
                                      PolicyDto.ProposerDetails.GST !== "")
                                  }
                                />
                                {flags.panflag === true && PolicyDto.ProposerDetails.PAN !== "" ? (
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
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="GSTIN Number"
                                  name="GSTIN"
                                  value={LPolicyDto.ProposerDetails.GST}
                                  inputProps={{ maxLength: 15 }}
                                  required
                                  sx={{
                                    "& .MuiFormLabel-asterisk": {
                                      color: "red",
                                    },
                                  }}
                                  onChange={(e) => handleSetCKYC(e, "GSTIN")}
                                  onBlur={handlevalidother}
                                  disabled={
                                    CKYCStatus === "success" ||
                                    PolicyDto.CkycStatus === "success" ||
                                    PolicyDto.CkycStatus === "failure" ||
                                    (PolicyDto.CustomerType === "Corporate" &&
                                      PolicyDto.ProposerDetails.PAN !== "") ||
                                    (PolicyDto.CustomerType === "Corporate" &&
                                      PolicyDto.ProposerDetails.CIN !== "")
                                  }
                                />
                                {GST === true && LPolicyDto.ProposerDetails.GST !== "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Enter Valid GST Number
                                  </MDTypography>
                                ) : null}
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="CIN Number"
                                  name="CIN"
                                  value={PolicyDto.ProposerDetails.CIN}
                                  required
                                  inputProps={{ maxLength: 21 }}
                                  sx={{
                                    "& .MuiFormLabel-asterisk": {
                                      color: "red",
                                    },
                                  }}
                                  onChange={(e) => handleSetCKYC(e, "CIN")}
                                  onBlur={handlevalidother}
                                  disabled={
                                    CKYCStatus === "success" ||
                                    PolicyDto.CkycStatus === "success" ||
                                    LPolicyDto.CkycStatus === "failure" ||
                                    (PolicyDto.CustomerType === "Corporate" &&
                                      PolicyDto.ProposerDetails.PAN !== "") ||
                                    (PolicyDto.CustomerType === "Corporate" &&
                                      PolicyDto.ProposerDetails.GST !== "")
                                  }
                                />
                                {flags.cinflag === true && LPolicyDto.ProposerDetails.CIN !== "" ? (
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
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDDatePicker
                                  options={{
                                    altFormat: "d-m-Y",
                                    dateFormat: "d-m-Y",
                                    altInput: true,
                                    allowInput: true,
                                    noClender:
                                      LPolicyDto.CkycStatus === "success" ||
                                      CKYCStatus === "success" ||
                                      LPolicyDto.CkycStatus === "failure",
                                  }}
                                  input={{
                                    required: true,
                                    label:
                                      LPolicyDto.CustomerType === "Individual"
                                        ? "Date of Birth"
                                        : "Date of Incorporation",

                                    value: LPolicyDto?.ProposerDetails.DOB,
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
                                  value={LPolicyDto?.ProposerDetails.DOB}
                                  onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
                                  disabled={
                                    LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"
                                  }
                                />
                              </Grid>
                            </>
                          ) : null}
                          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDDatePicker
                                  options={{
                                    altFormat: "d-m-Y",
                                    dateFormat: "d-m-Y",
                                    altInput: true,
                                    allowInput: true,
                                    noClender:
                                      LPolicyDto.CkycStatus === "success" ||
                                      CKYCStatus === "success",
                                  }}
                                  input={{
                                    required: true,
                                    label: "Date of Incorporation",

                                    value: LPolicyDto?.ProposerDetails.DOB,
                                    allowInput: true,
                                    placeholder: datePlaceHolder("d-m-Y"),
                                    InputLabelProps: { shrink: true },
                                    InputProps: {
                                      disabled:
                                        LPolicyDto.CkycStatus === "success" ||
                                        CKYCStatus === "success",
                                    },
                                  }}
                                  name="dateOfBirth"
                                  value={LPolicyDto?.ProposerDetails.DOB}
                                  onChange={(d) => handleSetCKYC(d, "dateOfBirth")}
                                  disabled={
                                    LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"
                                  }
                                />
                              </Grid>
                            </>
                          ) : null} */}
                        </Stack>
                      </Grid>
                      <Grid container spacing={1}>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexDirection="right"
                          sx={{ ml: "1.5rem", mt: "1rem" }}
                        >
                          <MDButton
                            color="primary"
                            variant="contained"
                            onClick={handleCKYCVerification}
                            disabled={
                              CKYCStatus === "success" ||
                              PolicyDto.CkycStatus === "success" ||
                              PolicyDto.CkycStatus === "failure"
                            }
                          >
                            Initiate C-KYC
                          </MDButton>
                          <MDButton
                            color="primary"
                            variant="contained"
                            onClick={handleCkycUpdateStatus}
                            disabled={
                              CkycEmailFlag ||
                              LPolicyDto.CkycStatus === "success" ||
                              CKYCStatus === "success" ||
                              CKYCStatus === ""
                            }
                          >
                            Update Status
                          </MDButton>
                          <MDButton
                            color="primary"
                            variant="contained"
                            onClick={handleSendCkycRegMail}
                            disabled={
                              CkycEmailFlag ||
                              LPolicyDto.CkycStatus === "success" ||
                              CKYCStatus === "success" ||
                              CKYCStatus === ""
                            }
                          >
                            Send EMail-SMS
                          </MDButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                {/* expanded={expanded === "panel1"} onChange={handleChange("panel1")} */}
                <MDTypography
                  variant="h6"
                  color="primary"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "1.2rem",
                    textAlign: "left",
                    ml: "1rem",
                    mt: "1rem",
                    mb: "1rem",
                  }}
                >
                  Customer Details
                  {/* <font color="#1E90FF">Customer Details</font> */}
                </MDTypography>
                {/* <Grid container spacing={2}>
                  <AccordionDetails>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}>
                      <Stack direction="row" spacing={2} alignItems="center" mt={1} ml={2}>
                        <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                          Customer Type &nbsp; *
                        </MDTypography>
                        <RadioGroup
                          row
                          value={PolicyDto.CustomerType}
                          name="CustomerType"
                          onChange={handleSetRadio}
                          // defaultValue="Corporate"
                        >
                          <FormControlLabel
                            value="Individual"
                            control={<Radio />}
                            label="Individual"
                          />
                          <FormControlLabel
                            value="Corporate"
                            control={<Radio />}
                            label="Corporate"
                          />
                        </RadioGroup>
                        {/* <MDButton
                            variant="contained"
                            color="info"
                            mb="2rem"
                            sx={{ textAlign: "right", mt: "2rem", mr: "2rem" }}
                          >
                            Search Client
                          </MDButton> 
                      </Stack>
                    </Grid>
                  </AccordionDetails>
                </Grid> */}
                {PolicyDto.CustomerType === "Corporate" ? (
                  <Accordion
                    defaultExpanded
                    disableGutters
                    sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <MDTypography variant="h6" color="primary">
                        Corporate details
                      </MDTypography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            // ml="1rem"
                            label="Corporate Name"
                            // name="CorporateName"
                            // value={PolicyDto.CorporateName}
                            // onChange={handleSetProposer}
                            value={PolicyDto.ProposerDetails["First Name"]}
                            name="First Name"
                            onChange={handleSetProposer}
                            error={
                              PolicyDto.ProposerDetails["First Name"] === "" ? ProposerError : null
                            }
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            disabled={
                              LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"
                            }
                          />
                          {ProposerError && PolicyDto.ProposerDetails["First Name"] === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="CKYC Email ID"
                            name="EmailId"
                            value={PolicyDto.ProposerDetails.EmailId}
                            onChange={handleSetProposer}
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            onBlur={handleFieldValidation}
                            disabled
                          />
                          {ProposerError && PolicyDto.ProposerDetails.EmailId === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                          {flags.emailflag && PolicyDto.ProposerDetails.EmailId !== "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill valid email id
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="CKYC MobileNo"
                            name="MobileNo"
                            inputProps={{ maxLength: 10 }}
                            value={PolicyDto.ProposerDetails.MobileNo}
                            onChange={handleSetProposer}
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            onBlur={handleFieldValidation}
                          />
                          {ProposerError && PolicyDto.ProposerDetails.MobileNo === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                          {flags.mobileFlag && PolicyDto.ProposerDetails.MobileNo !== "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill valid Mobile Number
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          {kycSecDisable ? (
                            <MDDatePicker
                              label="Date of Incorporation"
                              input={{
                                label: "Date of Incorporation",
                                value: LPolicyDto.ProposerDetails.DOB,
                                required: true,
                                inputProps: {
                                  disabled:
                                    LPolicyDto.CkycStatus === "success" || CKYCStatus === "success",
                                },
                              }}
                              options={{
                                altFormat: "d-m-Y",
                                dateFormat: "d-m-Y",
                                altInput: true,
                              }}
                              type="login"
                              id="Date of Birth"
                              value={LPolicyDto.ProposerDetails.DOB}
                              // value={"04-04-1999"}
                              onChange={(date) => handleDateChange1(date, "dateOfBirth", "DOB")}
                              // maxDate={today.getDate()}
                              disabled={
                                LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"
                              }

                              // error={datetoShow1.dateOfBirth === "" ? ProposerError : null}
                              // disabled={kycSecDisable}
                            />
                          ) : (
                            <MDDatePicker
                              label="Date of Incorporation"
                              input={{
                                label: "Date of Incorporation",
                                value: LPolicyDto.ProposerDetails.DOB,
                                required: true,
                                inputProps: {
                                  disabled: true,
                                },
                              }}
                              options={{
                                altFormat: "d-m-Y",
                                dateFormat: "d-m-Y",
                                altInput: true,
                              }}
                              type="login"
                              id="Date of Birth"
                              value={LPolicyDto.ProposerDetails.DOB}
                              onChange={(date) => handleDateChange1(date, "dateOfBirth", "DOB")}
                              // maxDate={today.getDate()}

                              error={datetoShow1.dateOfBirth === "" ? ProposerError : null}
                              disabled

                              // disabled={kycSecDisable}
                            />
                          )}

                          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DesktopDatePicker
                                label="Date of Birth/Date of Incorporation"
                                inputFormat="dd-MM-yyyy"
                                type="login"
                                id="Date of Birth"
                                value={kycDate}
                                onChange={(date) => handleSetCKYC(date, "dateOfBirth")}
                              />
                              {/* // renderInput={(params) => (
                              //     <MDInput
                              //       {...params}
                              //       sx={{ width: "100%" }}
                              //       required
                              //       error={InsuredDOB.dateOfBirth === "" ? ProposerError : null}
                              //     />
                              //   )}
                              // />
                              // {ProposerError && InsuredDOB.dateOfBirth === null ? (
                              //   <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              //     Please fill this Field
                              //   </MDTypography>
                              // ) : null}
                              // {InsuredDOB.dateOfBirth === null ? (
                              //   <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              //     Please fill the valid date
                              //   </MDTypography>
                              // ) : null} 
                            </LocalizationProvider>
                          </Grid> */}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDDatePicker
                            label="Policy Start Date"
                            input={{
                              label: "Policy Start Date",
                              value: LPolicyDto.ProposerDetails.PolicyStartDate,
                              required: true,
                            }}
                            type="login"
                            id="PolicyStartDate"
                            name="PolicyStartDate"
                            disablePast
                            options={{
                              altFormat: "d-m-Y",
                              dateFormat: "d-m-Y",
                              altInput: true,
                              minDate: min,
                              maxDate: max,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={LPolicyDto.ProposerDetails.PolicyStartDate}
                            onChange={(date) => handleDatePol1(date, "PolicyStartDate")}
                            error={polStartDate === null ? ProposerError : null}
                          />

                          {ProposerError && LPolicyDto.ProposerDetails.PolicyStartDate === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDDatePicker
                            label="Policy End Date"
                            input={{
                              label: "Policy End Date",
                              value: LPolicyDto.ProposerDetails.PolicyEndDate,
                              required: true,
                              inputProps: { disabled: true },
                            }}
                            options={{
                              altFormat: "d-m-Y",
                              dateFormat: "d-m-Y",
                              altInput: true,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type="login"
                            id="PolicyEndDate"
                            name="PolicyEndDate"
                            disablePast
                            disabled
                            value={LPolicyDto.ProposerDetails.PolicyEndDate}
                            // value={PolicyDto.PolicyEndDate}
                            // onChange={(date) => handleDatePol1(date, "PolicyEndDate")}
                          />

                          {ProposerError && LPolicyDto.ProposerDetails.PolicyEndDate === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ) : null}
                {PolicyDto.CustomerType === "Individual" ? (
                  <Accordion
                    defaultExpanded
                    disableGutters
                    sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <MDTypography variant="h6" color="primary">
                        Individual details
                      </MDTypography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          {/* <MDInput label="Salutation" /> */}
                          <Autocomplete
                            fullWidth
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                padding: "4px!important",
                              },
                            }}
                            id="Salutation"
                            name="Salutation"
                            disableClearable
                            value={{ mValue: LPolicyDto.ProposerDetails.Salutation }}
                            options={salutationData}
                            onChange={(e, value) => handleSetAutoComplete(e, "Salutation", value)}
                            getOptionLabel={(option) => option.mValue}
                            renderInput={(params) => (
                              <MDInput
                                {...params}
                                label="Salutation"
                                required
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                }}
                                error={
                                  Object.values(masterArray.Salutation || {}).every(
                                    (x) => x === "" || x === null
                                  )
                                    ? ProposerError
                                    : null
                                }
                              />
                            )}
                          />
                          {ProposerError && PolicyDto.ProposerDetails.Salutation === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="First Name"
                            value={PolicyDto.ProposerDetails["First Name"]}
                            name="First Name"
                            onChange={handleSetProposer}
                            error={
                              PolicyDto.ProposerDetails["First Name"] === "" ? ProposerError : null
                            }
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            disabled={
                              LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"
                            }
                          />
                          {ProposerError && PolicyDto.ProposerDetails["First Name"] === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Last Name"
                            value={PolicyDto.ProposerDetails["Last Name"]}
                            onChange={handleSetProposer}
                            name="Last Name"
                            error={
                              PolicyDto.ProposerDetails["Last Name"] === "" ? ProposerError : null
                            }
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            disabled={
                              (LPolicyDto.CkycStatus === "success" || CKYCStatus === "success") &&
                              PolicyDto.ProposerDetails["Last Name"] !== ""
                            }
                          />
                          {ProposerError && PolicyDto.ProposerDetails["Last Name"] === "" ? (
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
                            value={{ mValue: LPolicyDto.ProposerDetails.Gender }}
                            id="Gender"
                            name="Gender"
                            options={genderData}
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
                                  Object.values(masterArray.Gender || {}).every(
                                    (x) => x === "" || x === null
                                  )
                                    ? ProposerError
                                    : null
                                }
                              />
                            )}
                          />
                          {ProposerError && PolicyDto.ProposerDetails.Gender === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Email ID"
                            name="EmailId"
                            value={PolicyDto.ProposerDetails.EmailId}
                            onChange={handleSetProposer}
                            error={PolicyDto.ProposerDetails.EmailId === "" ? ProposerError : null}
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            onBlur={handleFieldValidation}
                            disabled
                          />
                          {ProposerError && PolicyDto.ProposerDetails.EmailId === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                          {flags.emailflag && PolicyDto.ProposerDetails.EmailId !== "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill valid Mobile Number
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Mobile No"
                            name="MobileNo"
                            inputProps={{ maxLength: 10 }}
                            value={PolicyDto.ProposerDetails.MobileNo}
                            onChange={handleSetProposer}
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            onBlur={handleFieldValidation}
                            disabled={
                              LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"
                            }
                          />
                          {ProposerError && PolicyDto.ProposerDetails.MobileNo === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                          {flags.mobileFlag && PolicyDto.ProposerDetails.MobileNo !== "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill valid Mobile Number
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          {kycSecDisable ? (
                            <MDDatePicker
                              label="Date of Birth"
                              input={{
                                label: "Date of Birth",
                                value: LPolicyDto.ProposerDetails.DOB,
                                required: true,
                              }}
                              options={{
                                altFormat: "d-m-Y",
                                dateFormat: "d-m-Y",
                                altInput: true,
                              }}
                              type="login"
                              id="Date of Birth"
                              value={LPolicyDto.ProposerDetails.DOB}
                              onChange={(date) => handleDateChange1(date, "dateOfBirth", "DOB")}
                              // maxDate={today.getDate()}

                              error={datetoShow.dateOfBirth === "" ? ProposerError : null}
                              // disabled={kycSecDisable}
                              disabled={
                                LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"
                              }
                            />
                          ) : (
                            <MDDatePicker
                              label="Date of Birth"
                              input={{
                                label: "Date of Birth",
                                value: LPolicyDto.ProposerDetails.DOB,
                                required: true,
                              }}
                              options={{
                                altFormat: "d-m-Y",
                                dateFormat: "d-m-Y",
                                altInput: true,
                              }}
                              type="login"
                              id="DOB"
                              // value={InsuredDOB}
                              value={LPolicyDto.ProposerDetails.DOB}
                              onChange={(date) => handleDateChange1(date, "dateOfBirth", "DOB")}
                              error={
                                Object.values(PolicyDto.ProposerDetails.DOB || {}).every(
                                  (x) => x === "" || x === null
                                )
                                  ? ProposerError
                                  : null
                              }
                              disabled={
                                LPolicyDto.CkycStatus === "success" || CKYCStatus === "success"
                              }
                            />
                          )}
                          {ProposerError && PolicyDto.ProposerDetails.DOB === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDDatePicker
                            label="Policy Start Date"
                            input={{
                              label: "Policy Start Date",
                              value: LPolicyDto.ProposerDetails.PolicyStartDate,
                              required: true,
                            }}
                            type="login"
                            id="PolicyStartDate"
                            name="PolicyStartDate"
                            disablePast
                            options={{
                              altFormat: "d-m-Y",
                              dateFormat: "d-m-Y",
                              altInput: true,
                              minDate: min,
                              maxDate: max,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={polStartDate}
                            onChange={(date) => handleDatePol1(date, "PolicyStartDate")}
                            error={polStartDate === null ? ProposerError : null}
                          />

                          {ProposerError && polStartDate === null ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDDatePicker
                            label="Policy End Date"
                            input={{
                              label: "Policy End Date",
                              value: LPolicyDto.ProposerDetails.PolicyEndDate,
                              required: true,
                              inputProps: { disabled: true },
                            }}
                            options={{
                              altFormat: "d-m-Y",
                              dateFormat: "d-m-Y",
                              altInput: true,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type="login"
                            id="PolicyEndDate"
                            name="PolicyEndDate"
                            disablePast
                            disabled
                            value={polEndDate}
                            // value={PolicyDto.PolicyEndDate}
                            // onChange={(date) => handleDatePol1(date, "PolicyEndDate")}
                          />

                          {ProposerError && polEndDate === null ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ) : null}

                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <MDTypography variant="h6" color="primary">
                      {/* <font color="#1E90FF">Communication Details</font> */}
                      Communication Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Accordion
                      defaultExpanded
                      disableGutters
                      sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <MDTypography
                          variant="h6"
                          // sx={{ color: "#000000", fontSize: "1.0rem" }}
                          color="primary"
                          // ml={0}
                        >
                          Permanent Address
                        </MDTypography>
                      </AccordionSummary>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Address 01"
                            value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine1}
                            name="AddressLine1"
                            onChange={handlePermanentAdress}
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            disabled={kycSecDisable}
                          />
                          {ProposerError &&
                          PolicyDto.ProposerDetails.PermanentAddress.AddressLine1 === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Address 02"
                            value={PolicyDto?.ProposerDetails?.PermanentAddress?.AddressLine2}
                            name="AddressLine2"
                            onChange={handlePermanentAdress}
                            // required
                            // sx={{
                            //   "& .MuiFormLabel-asterisk": {
                            //     color: "red",
                            //   },
                            // }}
                            // disabled={kycSecDisable}
                          />
                          {/* {ProposerError &&
                          PolicyDto.ProposerDetails.PermanentAddress.AddressLine2 === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null} */}
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Town" />
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Pincode"
                            inputProps={{ minLength: 6 }}
                            value={PolicyDto.ProposerDetails.PermanentAddress.Pincode}
                            name="Pincode"
                            onChange={handlePermanentAdress}
                            error={
                              PolicyDto.ProposerDetails.PermanentAddress.Pincode === ""
                                ? ProposerError
                                : null
                            }
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          />
                          {ProposerError &&
                          PolicyDto.ProposerDetails.PermanentAddress.Pincode === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          {/* <MDInput
                            disabled
                            label="City"
                            name="CityDistrict"
                            value={PolicyDto.ProposerDetails.PermanentAddress.CityDistrict}
                            error={
                              PolicyDto.ProposerDetails.PermanentAddress.CityDistrict === ""
                                ? ProposerError
                                : null
                            }
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            readOnly
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
                            options={permPincode || []}
                            onChange={handleDistrictPerm}
                            value={{
                              mValue: PolicyDto.ProposerDetails.PermanentAddress.CityDistrict,
                            }}
                            // value={masterArray.NomineeTitle}
                            getOptionLabel={(option) => option.mValue}
                            renderInput={(params) => <MDInput {...params} label="City" required />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            disabled
                            label="State"
                            value={PolicyDto.ProposerDetails.PermanentAddress.State}
                            name="State"
                            // onChange={handleSetCommAdress}
                            error={
                              PolicyDto.ProposerDetails.PermanentAddress.State === ""
                                ? ProposerError
                                : null
                            }
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            readOnly
                          />
                        </Grid>
                      </Grid>
                    </Accordion>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Accordion
                      defaultExpanded
                      disableGutters
                      sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <MDTypography
                          variant="h6"
                          // sx={{ color: "#000000", fontSize: "1.0rem" }}
                          color="primary"
                          // ml={0}
                        >
                          Communication Address
                        </MDTypography>
                      </AccordionSummary>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Address 01"
                            value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1}
                            name="AddressLine1"
                            onChange={handleSetCommAdress}
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            error={
                              ProposerError &&
                              PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 === ""
                            }
                          />
                          {ProposerError &&
                          PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Address 02"
                            value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2}
                            name="AddressLine2"
                            onChange={handleSetCommAdress}
                            // required
                            // sx={{
                            //   "& .MuiFormLabel-asterisk": {
                            //     color: "red",
                            //   },
                            // }}
                          />
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Town" />
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Pincode"
                            inputProps={{ minLength: 6 }}
                            value={PolicyDto.ProposerDetails.CommunicationAddress.Pincode}
                            name="Pincode"
                            onChange={handleSetCommAdress}
                            error={
                              PolicyDto.ProposerDetails.CommunicationAddress.Pincode === ""
                                ? ProposerError
                                : null
                            }
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          />
                          {ProposerError &&
                          PolicyDto.ProposerDetails.CommunicationAddress.Pincode === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          {/* <MDInput
                            disabled
                            label="City"
                            name="CityDistrict"
                            value={PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict}
                            error={
                              PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict === ""
                                ? ProposerError
                                : null
                            }
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
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
                            options={commPincode || []}
                            onChange={handleDistrictComm}
                            value={{
                              mValue: LPolicyDto.ProposerDetails.CommunicationAddress.CityDistrict,
                            }}
                            // value={masterArray.NomineeTitle}
                            getOptionLabel={(option) => option.mValue}
                            renderInput={(params) => <MDInput {...params} label="City" required />}
                          />
                          {ProposerError &&
                          PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            disabled
                            label="State"
                            value={PolicyDto.ProposerDetails.CommunicationAddress.State}
                            name="State"
                            // onChange={handleSetCommAdress}
                            error={
                              PolicyDto.ProposerDetails.CommunicationAddress.State === ""
                                ? ProposerError
                                : null
                            }
                            required
                            sx={{
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                          />
                          {ProposerError &&
                          PolicyDto.ProposerDetails.CommunicationAddress.State === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this Field
                            </MDTypography>
                          ) : null}
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}>
                          <Stack direction="row" spacing={2}>
                            <MDTypography>
                              Is Communication Address same as Permanent Address &nbsp; *
                            </MDTypography>
                            <RadioGroup
                              row
                              // value={PolicyDto.ProposerDetails.autoFill}
                              // onChange={handleSameAdress}
                            >
                              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                              <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                          </Stack>
                        </Grid> */}
                      </Grid>
                    </Accordion>
                  </AccordionDetails>

                  {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Stack direction="row" spacing={2} required>
                      <MDTypography variant="h6">
                        Is Your Risk Location Address same as Communication Address*
                      </MDTypography>

                      <RadioGroup
                        row
                        value={PolicyDto.ProposerDetails.CommunicationSameasPermanentYN}
                        onChange={handleSameAdress}
                        error={
                          PolicyDto.ProposerDetails.CommunicationSameasPermanentYN === ""
                            ? ProposerError
                            : null
                        }
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </Stack>
                    {ProposerError &&
                    PolicyDto.ProposerDetails.CommunicationSameasPermanentYN === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                        Please fill this Field
                      </MDTypography>
                    ) : null}
                  </Grid> */}

                  <Accordion
                    defaultExpanded
                    disableGutters
                    sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <MDTypography variant="h6" color="primary">
                        Risk Location Address
                      </MDTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {LPolicyDto.InsurableItem[0].RiskItems.map((x, id) => (
                        // <MDTypography>  Risk Location Address ${id + 1}</MDTypography>
                        <Grid container spacing={2} mt={2} sx={{ ml: 1 }}>
                          <MDTypography variant="h6" color="primary">
                            {" "}
                            Risk Location Address {id + 1}
                          </MDTypography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                label="Address 01"
                                name="Address1"
                                // value={LPolicyDto.InsurableItem[0].RiskItems[id].Address1}
                                value={x.Address1}
                                // onChange={handleSetRiskLocation}
                                onChange={(e) => handleSetRiskLocation(e, "Address1", id)}
                                required
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                }}
                                error={x.Address1 === "" ? ProposerError : null}
                              />
                              {ProposerError && x.Address1 === "" ? (
                                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                  Please fill this Field
                                </MDTypography>
                              ) : null}
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                label="Address 02"
                                name="Address2"
                                // value={LPolicyDto.InsurableItem[0].RiskItems[id].Address2}
                                // onChange={handleSetRiskLocation}
                                value={x.Address2}
                                onChange={(e) => handleSetRiskLocation(e, "Address2", id)}
                              />
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Town" />
                        </Grid> */}
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                label="Pincode"
                                name="Pincode"
                                // value={LPolicyDto.InsurableItem[0].RiskItems[id].Pincode}
                                value={x.Pincode}
                                disabled
                                error={x.Pincode === "" ? ProposerError : null}
                                // onChange={handleSetRiskLocation}
                                onChange={(e) => handleSetRiskLocation(e, "Pincode", id)}
                                required
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                }}
                              />
                              {ProposerError && x.Pincode === "" ? (
                                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                  Please fill this Field
                                </MDTypography>
                              ) : null}
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="District" required />
                        </Grid> */}
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                label="City"
                                name="City"
                                // value={LPolicyDto.InsurableItem[0].RiskItems[id].City}
                                value={x.City}
                                required
                                disabled
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                label="State"
                                name="State"
                                // value={LPolicyDto.InsurableItem[0].RiskItems[id].State}
                                value={x.State}
                                required
                                disabled
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}

                      {/* ) : ( */}
                      {/* <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="House No" required />
                          </Grid>
                          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Street" />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Town" />
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="Pincode" required />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="District" required />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="City" required />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                            <MDInput label="State" required />
                          </Grid>
                        </Grid>  */}
                      {/* )} */}
                    </AccordionDetails>
                  </Accordion>
                </Accordion>

                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <MDTypography variant="h6" color="primary">
                      {/* InsuredDetails */}
                      OtherDetails
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}>
                        <Stack direction="row">
                          <MDTypography variant="h6" sx={{ color: "#1E90FF", fontSize: "1rem" }}>
                            InsuredDetails
                          </MDTypography>
                          <Divider
                            orientation="horizontal"
                            textAlign="left"
                            style={{
                              backgroundColor: "darkblue",
                              height: "0.1rem",
                              marginLeft: "1rem",
                              width: "50rem",
                            }}
                          />
                        </Stack>
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Insured Sl NO." />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Insured ID" />
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Salutation" />
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="Salutation"
                          name="Salutation"
                          options={salutationData}
                          // onChange={handleSetValue}
                          getOptionLabel={(option) => option.mValue}
                          renderInput={(params) => <MDInput {...params} label="Salutation" />}
                        />
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="First Name" />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Last Name" />
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Gender" />
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="Gender"
                          name="Gender"
                          options={genderData}
                          // onChange={handleSetValue}
                          getOptionLabel={(option) => option.mValue}
                          renderInput={(params) => <MDInput {...params} label="Gender" />}
                        />
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Nationality" />
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}> */}
                      {/* <Stack direction="row">
                          <MDTypography variant="h6" color="primary">
                            OtherDetails
                          </MDTypography>
                          <Divider
                            orientation="horizontal"
                            textAlign="left"
                            style={{
                              backgroundColor: "darkblue",
                              height: "0.1rem",
                              marginLeft: "1rem",
                              width: "50rem",
                            }}
                          />
                        </Stack> */}
                      {/* </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="Customer Contact Number"
                          name="CustomerContactNumber"
                          inputProps={{ maxLength: 10 }}
                          value={PolicyDto.OtherDetails.CustomerContactNumber}
                          onChange={handleSetOther}
                          required
                          error={
                            PolicyDto.OtherDetails.CustomerContactNumber === ""
                              ? ProposerError
                              : null
                          }
                          onBlur={handleFieldValidation}
                        />
                        {ProposerError && PolicyDto.OtherDetails.CustomerContactNumber === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                        {flags.mobileFlag && PolicyDto.OtherDetails.CustomerContactNumber !== "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill valid Mobile Number
                          </MDTypography>
                        ) : null}
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="Customer Email ID"
                          name="CustomerEmailID"
                          value={PolicyDto.OtherDetails.CustomerEmailID}
                          required
                          error={
                            PolicyDto.OtherDetails.CustomerEmailID === "" ? ProposerError : null
                          }
                          onChange={handleSetOther}
                          onBlur={handleFieldValidation}
                        />
                        {ProposerError && PolicyDto.OtherDetails.CustomerEmailID === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                        {flags.emailflag && PolicyDto.OtherDetails.CustomerEmailID !== "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill valid Mobile Number
                          </MDTypography>
                        ) : null}
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Communication Address State" />
                      </Grid> */}
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="GSTIN"
                          name="GSTIN"
                          value={PolicyDto.OtherDetails.GSTIN}
                          inputProps={{ maxLength: 15 }}
                          onChange={handleSetOther}
                          onBlur={handlevalidChange}
                        />
                        {flags.gstflag === true && PolicyDto.OtherDetails.GSTIN !== "" ? (
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
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="PAN card Number"
                          name="PAN"
                          value={PolicyDto.OtherDetails.PAN}
                          onChange={handleSetOther}
                          onBlur={handlevalidChange}
                        />
                        {flags.panflag === true && LPolicyDto.OtherDetails.PAN !== "" ? (
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
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Grid mt={2}>
                  <Accordion
                    defaultExpanded
                    disableGutters
                    sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <MDTypography variant="h6" color="primary">
                        Hypothecation
                      </MDTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}>
                           <Stack direction="row" m={2}>
                            <MDTypography variant="h6" sx={{ color: "#1E90FF", fontSize: "1rem" }}>
                              Hypothecation
                            </MDTypography>
                            <Divider
                              orientation="horizontal"
                              textAlign="left"
                              style={{
                                backgroundColor: "darkblue",
                                height: "0.1rem",
                                marginLeft: "1rem",
                                width: "50rem",
                              }}
                            />
                          </Stack> 
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Financier Name"
                            name="HypothecationFinancierName"
                            value={PolicyDto.HypothecationFinancierName}
                            onChange={handlehypothecation}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Financier Address"
                            name="FinancierAddress"
                            value={PolicyDto.FinancierAddress}
                            onChange={handlehypothecation}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput label="Subrisk Code(Location1)" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="GST No"
                            name="GSTNo"
                            value={PolicyDto.GSTNo}
                            inputProps={{ maxLength: 15 }}
                            onChange={handlehypothecation}
                            onBlur={handlevalidChange}
                          />
                          {/* {flags.gstflag1 === true && x.GSTNo === "" ? (
                              <MDTypography
                                sx={{
                                  color: "red",
                                  fontSize: "10px",
                                }}
                              >
                                Enter Valid GST Number
                              </MDTypography>
                            ) : null}
                            {ProposerError && x.GSTNo === "" ? (
                              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                Please fill this Field
                              </MDTypography>
                            ) : null} */}
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                {/* hi */}
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
                                  <TableCell sx={{ fontWeight: "bold" }}>
                                    Documents Remark
                                  </TableCell>
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
                                            sx={{
                                              "& .MuiFormLabel-asterisk": {
                                                color: "red",
                                              },
                                            }}
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
                                        <MDButton
                                          color="primary"
                                          variant="outlined"
                                          component="label"
                                        >
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
                                        sx={{
                                          textDecoration: "underline",
                                          color: "blue",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {x.DocName}
                                      </MDTypography>
                                    </TableCell>
                                    <TableCell>{x.DocDate}</TableCell>
                                    <TableCell>
                                      {x.DocFlag === true ? (
                                        <IconButton
                                          aria-label="delete"
                                          onClick={() => handleclearicon(i)}
                                        >
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
              </MDBox>
            </Grid>
          </MDBox>
          <Grid container spacing={1}>
            <MDBox display="flex" flexDirection="row">
              <MDBox display="flex" flexDirection="row" spacing={1} sx={{ mt: "1rem", mb: "1rem" }}>
                {/* <ThemeProvider theme={themecheck}> */}
                <Checkbox
                  checked={checkProposalConsent}
                  onChange={handleCheckBox}
                  sx={{ ml: "1rem" }}
                />
                {/* </ThemeProvider> */}
                <MDTypography sx={{ fontSize: "1rem", mt: "0.5rem" }}>
                  Proposal consent
                </MDTypography>
              </MDBox>
            </MDBox>
            {ProposerError && checkProposalConsent === false ? (
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
                      sx={{ ml: "1.5rem" }}
                      disabled={otpdisabled}
                    />
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
                        sx={{ ml: "2rem" }}
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
                    // sx={{ ml: "1rem", mt: "-6rem" }}
                  />
                  {/* </ThemeProvider> */}
                  <MDTypography sx={{ fontSize: "1rem", marginTop: "5px", mb: "1rem" }}>
                    I/We Hereby declare that the statements made by me/us in this proposal form are
                    true to the best of my/our Knowledge and belief and I/we hereby agree that this
                    declaration shall form the basis of the contract between me/us and the Universal
                    Sompo General Insurance Company Limited insurance Company. <br />
                  </MDTypography>
                </MDBox>
                {ProposerError && checkDisclaimer === false ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
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
                    I/We also declare that any addition alteration are carried out after the
                    submission of this proposal form that the same would be conveyed to the
                    insurance company immediately.
                  </MDTypography>
                </MDBox>
                {ProposerError && checkInsurance === false ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* Restrict back button by shreya */}
      {proposalNo !== null ? (
        <Grid container justifyContent="flex-end" sx={{ mb: "1rem" }} mt={2}>
          <MDButton color="primary" variant="contained" onClick={onNext}>
            Proceed
          </MDButton>
        </Grid>
      ) : (
        <Grid container justifyContent="space-between" sx={{ mb: "1rem" }} mt={2}>
          <MDButton
            color="primary"
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            Back
          </MDButton>
          <MDButton color="primary" variant="contained" onClick={onNext}>
            Proceed
          </MDButton>
        </Grid>
      )}
    </MDBox>
  );
}

export default ProposerDetails;
