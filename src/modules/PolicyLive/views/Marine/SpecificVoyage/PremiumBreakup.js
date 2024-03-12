import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Container,
  AppBar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme, createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
// import Modal from "@mui/material/Modal";
// import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
// import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
// import Slide from "@mui/material/Slide";
import swal from "sweetalert";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { MD5 } from "crypto-js";
import { useDataController } from "../../../../BrokerPortal/context";
import { UploadFiles, ViewFiles, SendSMS } from "./data/index";
import MDButton from "../../../../../components/MDButton";
import { postRequest } from "../../../../../core/clients/axiosclient";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import { getOTP, GetOTP } from "../../../../BrokerPortal/Pages/Registration/data/index";
import { DeleteFile } from "../../../../BrokerPortal/Pages/MyProfile/data/index";

// const style = {
//   position: "relative",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 600,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   overflowY: "scroll",
//   // sx={{ width: "100%", height: "100%", pt: "3rem", overflow: "auto" }}
// };

const clauseArray = [];
const clauseArray1 = [];
const clauseArray2 = [];
const clauseArray3 = [];
const CommonClauses = [];
const NonInstituteClauses = [];
const InlandTransitClauses = [];
const InstituteClauses = [];

const elem = [CommonClauses, NonInstituteClauses, InlandTransitClauses];
const elemm = [CommonClauses];
const elemm1 = [InlandTransitClauses];
const elemm2 = [InstituteClauses];
const item1 = [elem];
const item2 = [elemm];
const item3 = [elemm1];
const item4 = [elemm2];
clauseArray.push(item1);
clauseArray1.push(item2);
clauseArray2.push(item3);
clauseArray3.push(item4);

function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Click On Resend OTP in 00:{counter}</div>;
}
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

function PremiumBreakup({
  PolicyDto,
  setPolicyDto,
  ratingData,
  setDocUpload,
  docUpload,
  setOTP,
  OTP,
  setCheckDisclaimer,
  checkDisclaimer,
  setCheckInsurance,
  checkInsurance,
  checkProposalConsent,
  setCheckProposalConsent,
  flag,
  setMaster,
  master,
  setSendOtpFlag,
  sendOtpFlag,
  setTimerFlag,
  timerFlag,
  startCounterFlag,
  setCounter,
  setStartCounterFlag,
  counter,
  dropdowndata,
}) {
  const [open, setOpen] = React.useState(false);
  const [LPolicyDto, setLPolicyDto] = useState(PolicyDto);
  const [values, setValues] = React.useState(0);
  const themes = useTheme();
  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));
  const theme = createTheme({
    status: {
      danger: "#c70825",
      outline: "#000",
    },
    palette: {
      primary: {
        main: "#c70825",
      },
    },
  });
  const handleChange = (event, newValues) => {
    setValues(newValues);
  };
  const masterArray = master;
  // const [AgentCode, setAgentCode] = useState("");
  const Documen = [
    { mID: 1, mValue: "PAN copy" },
    { mID: 2, mValue: "Cheque" },
    { mID: 3, mValue: "Date of birth" },
    { mID: 4, mValue: "Address Proof" },
    { mID: 5, mValue: "Customer's Signed Quote" },
    { mID: 6, mValue: "Other" },
  ];
  const handleAddDoc = () => {
    if (docUpload.some((x) => x.DocName === "")) {
      swal({
        icon: "error",
        text: "Please upload the file before Adding",
      });
    } else {
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
    }
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
        filteredData.DocType = "";
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

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);
  // const Transition = React.forwardRef((props, ref) => (
  //   <Slide direction="up" ref={ref} {...props} />
  // ));
  // const [dropdowndata, setdropdowndata] = useState([]);
  console.log("dropdowndata", dropdowndata);

  // const [cl2flag, setcl2flag] = useState(false);
  // const [cl1flag, setcl1flag] = useState(false);
  // const [cl3flag, setcl3flag] = useState(false);
  // const [clflag, setclflag] = useState(false);
  // const { search } = useLocation();
  // const [counter, setCounter] = useState(30);
  // const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [status, setStatus] = useState(false);

  // const [sendOtpFlag, setSendOtpFlag] = useState(true);
  const handleCheckBox = async (e) => {
    setCheckProposalConsent(!checkProposalConsent);
    // const MobileNo = LPolicyDto.ProposerDetails["Mobile Number"];
    // const Message = `Dear customer,Quotation No.Marine is generated. Requesting to Pls provide your consent to proceed with the proposal.Best Regards,Universal Sompo General Insurance Co Ltd.`;
    // await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
    //   console.log("1234567890", smsResp);
    // });

    if (e.target.checked === true) {
      const notificationReq = {
        notificationRequests: [
          {
            templateKey: "proposalconsentBLUS",
            sendEmail: false,
            isEmailBody: true,
            notificationPayload: JSON.stringify({
              Name:
                LPolicyDto.ProposerDetails["First Name"] +
                ["  "] +
                LPolicyDto.ProposerDetails["Last Name"],
              Salutation: LPolicyDto.ProposerDetails.Salutation,
              ProductName: "MARINE CARGO POLICY-SPECIFIC TRANSIT IMPORT",
            }),
          },
        ],
        sendEmail: true,
        subject: `Proposal Consent Required`,
        toEmail: LPolicyDto.ProposerDetails["Email ID"],
      };
      await postRequest("Notifications/SendMultipleTemplateNotificationAsync", notificationReq);
      const MobileNo = LPolicyDto.ProposerDetails["Mobile Number"];
      const Message = `Dear customer,Quotation No. ${PolicyDto.ProposalNo} is generated. Requesting to Pls provide your consent to proceed with the proposal. Best Regards,Universal Sompo General Insurance Co Ltd.`;
      await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
        console.log("1234567890", smsResp);
      });
    }
  };
  const handleCheckDisclaimer = () => {
    setCheckDisclaimer(!checkDisclaimer);
  };
  const handleCheckInsurance = () => {
    setCheckInsurance(!checkInsurance);
  };

  const handleOTPChange = (e) => {
    const otpRegex = /^[0-9]*$/;
    if (otpRegex.test(e.target.value)) {
      setOTP(e.target.value);
      masterArray.OTP1 = e.target.value;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      console.log(masterArray, "masterArray");
    }
  };

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
        email: LPolicyDto.ProposerDetails["Email ID"],
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: LPolicyDto.ProposerDetails["Mobile Number"],
        sendSms: true,
        isBerry: false,
        // client: "MICA",
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

  const [verifyOtp, setVerifyOtp] = useState(false);
  // const [otpflag, setotpflag] = useState(false);
  const [, dispatch] = useDataController();

  const handleVerifyOTP = () => {
    if (OTP === "") {
      swal({ icon: "error", text: "Please enter OTP" });
    } else {
      const verifyOTP = {
        otp: OTP,
        email: LPolicyDto.ProposerDetails["Email ID"],
        mobileNumber: LPolicyDto.ProposerDetails["Mobile Number"],
        userName: LPolicyDto.ProposerDetails["Email ID"],
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
            masterArray.verifyotp = "false";
            masterArray.otpflag = true;
            setMaster((prevState) => ({ ...prevState, ...masterArray }));
            swal({ icon: "success", text: "OTP verified successfully" });
            // setotpflag(true);
          } else {
            // setCheckDisclaimer(false);
            // setCheckInsurance(false);
            setVerifyOtp(true);
            masterArray.verifyotp = "true";
            setMaster((prevState) => ({ ...prevState, ...masterArray }));
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          // setCheckDisclaimer(false);
          // setCheckInsurance(false);
          setVerifyOtp(true);
          masterArray.verifyotp = "true";
          setMaster((prevState) => ({ ...prevState, ...masterArray }));
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
    }
  };

  const TOP = PolicyDto["Type of Policy"];
  let MOT = "";
  if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Parcel Post") {
    MOT = "ParcelPost";
  } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road") {
    MOT = "InlandRailRoadAir";
  } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Registered POST") {
    MOT = "RegisteredPost";
  } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air") {
    MOT = "air";
  } else if (PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea") {
    MOT = "sea";
  } else {
    MOT = PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"];
  }

  // useEffect(async () => {
  //   await fetchuser(master.uname).then(async (result) => {
  //     console.log("123456789result", result, result.data.partnerId);
  //     const partnerDetailssss = result.data.additionalDetails;
  //     console.log("123456789", partnerDetailssss);
  //     const partnerDetail = JSON.parse(partnerDetailssss);
  //     setAgentCode(partnerDetail.AdditionalDetails.IntermediaryCode);
  //     console.log("agent code", AgentCode);
  //     const UserId = new URLSearchParams(search).get("UserName");

  //     if (UserId !== null) {
  //       const Profile = await fetchProfile(
  //         partnerDetail.AdditionalDetails.IntermediaryCode,
  //         UserId
  //       );
  //       setdropdowndata(Profile.data[0]);
  //     } else {
  //       const UserId1 = master.uname;
  //       const Profile = await fetchProfile(
  //         partnerDetail.AdditionalDetails.IntermediaryCode,
  //         UserId1
  //       );
  //       setdropdowndata(Profile.data[0]);
  //     }
  //     console.log(dropdowndata, "Profile");
  //   });
  // }, []);

  useEffect(() => {
    clauseArray1[0][0].map((ta) => {
      console.log("entered ta", ta);
      if (ta.length > 0) {
        console.log("entered ta1");
        // setcl1flag(true);
        ta.map((ta1) => {
          if (ta1.mValue === "Select All") {
            console.log(" entered ta1 select all");
            const tarr = ta;
            tarr.shift();
            console.log(ta, tarr, "ta1");
          }
          return null;
        });
      }
      return null;
    });
    console.log(clauseArray1, "clauseArray1");
  });

  useEffect(() => {
    clauseArray2[0][0].map((ta2) => {
      console.log("entered ta", ta2);
      if (ta2.length > 0) {
        console.log("entered ta1");
        // setcl2flag(true);
        ta2.map((ta3) => {
          if (ta3.mValue === "Select All") {
            console.log(" entered ta1 select all");
            const tarr = ta2;
            tarr.shift();
            console.log(ta2, tarr, "ta1");
          }
          return null;
        });
      }
      return null;
    });
    console.log(clauseArray2, "clauseArray2");
  });

  useEffect(() => {
    clauseArray3[0][0].map((ta6) => {
      console.log("entered ta", ta6);
      if (ta6.length > 0) {
        // setcl3flag(true);
        console.log("entered ta1");
        ta6.map((ta7) => {
          if (ta7.mValue === "Select All") {
            console.log(" entered ta1 select all");
            const tarr = ta6;
            tarr.shift();
            console.log(ta6, tarr, "ta1");
          }
          return null;
        });
      }
      return null;
    });
    console.log(clauseArray3, "clauseArray3");
  });

  useEffect(() => {
    clauseArray[0][0].map((ta4) => {
      console.log("entered ta", ta4);
      if (ta4.length > 0) {
        // setclflag(true);
        console.log("entered ta1");
        ta4.map((ta5) => {
          if (ta5.mValue === "Select All") {
            console.log(" entered ta1 select all");
            const tarr = ta4;
            tarr.shift();
            console.log(ta4, tarr, "ta1");
          }
          return null;
        });
      }
      return null;
    });
    console.log(clauseArray, "clauseArray");
  });
  useEffect(async () => {
    console.log(dropdowndata, "Profile123");

    if (dropdowndata !== "") {
      console.log(TOP, MOT, dropdowndata.clauses[0][TOP][MOT].NonInstituteClauses, "clauseflag");
      clauseArray1[0][0] = [];
      clauseArray[0][0] = [];
      clauseArray2[0][0] = [];
      clauseArray3[0][0] = [];
      clauseArray1[0][0].push([...dropdowndata.clauses[0][TOP][MOT].NonInstituteClauses]);
      clauseArray[0][0].push([...dropdowndata.clauses[0][TOP][MOT].CommonClauses]);
      if (TOP === "Marine Specific Voyage Inland") {
        clauseArray2[0][0].push([...dropdowndata.clauses[0][TOP][MOT].InlandTransitClauses]);
      } else if ((TOP !== "Marine Specific Voyage Inland" && MOT === "air") || MOT === "sea") {
        clauseArray3[0][0].push([...dropdowndata.clauses[0][TOP][MOT].InstituteClauses]);
      } else {
        clauseArray2[0][0].push([...dropdowndata.clauses[0][TOP][MOT].InlandTransitClauses]);
      }
    }
  }, [dropdowndata]);

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    // style: "currency",
    // currency: "INR",
  });
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
    console.log("Proposalll", PolicyDto.ProposalNo);
    console.log("proposal", proposalNumber);
    const downloadDTO = {
      key: proposalNumber,
      templateId: 111,
      referenceId: "",
    };
    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNumber);
      }
    });
  };

  const handleQuote = async (proposalNumber) => {
    const downloadDTO = {
      key: proposalNumber,
      templateId: 296,
      referenceId: "",
    };
    const preffix = "_Quote";
    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNumber + preffix);
      }
    });
  };

  // useEffect(() => {
  //   setPolicyDto(() => ({
  //     ...PolicyDto,
  //     "Total Premium": ratingData.PremiumIncludingGST,
  //   }));
  //   // PolicyDto["Net Premium"] = ratingData.PremiumExcludingGST;
  //   // PolicyDto["Stamp Duty"] = ratingData.Stampduty;
  //   // PolicyDto["ST/GST"] = ratingData.GST;
  //   // // PolicyDto["Total Premium"] = ratingData.PremiumIncludingGST;
  //   // PolicyDto["Total Premium"] = formatter.format(ratingData.PremiumIncludingGST);
  //   // // setPolicyDto(PolicyDto);
  //   setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
  // });

  console.log("9", PolicyDto);
  console.log("9", ratingData);

  useEffect(() => {
    if (Object.keys(ratingData).length > 0) {
      LPolicyDto.PremiumDetails.CollectedCGST = Number(ratingData.CollectedCGST)
        .toFixed(2)
        .toString();
      LPolicyDto.PremiumDetails.CollectedIGST = Number(ratingData.CollectedIGST)
        .toFixed(2)
        .toString();
      LPolicyDto.PremiumDetails.CollectedSGST = Number(ratingData.CollectedSGST)
        .toFixed(2)
        .toString();
      LPolicyDto.PremiumDetails.GST = Number(ratingData.GST).toFixed(2).toString();
      LPolicyDto.PremiumDetails.InvoicevalueINR = Number(ratingData.InvoicevalueINR)
        .toFixed(2)
        .toString();
      LPolicyDto.PremiumDetails.PremiumExcludingGST = Number(ratingData.PremiumExcludingGST)
        .toFixed(2)
        .toString();
      LPolicyDto.PremiumDetails.PremiumIncludingGST = Number(ratingData.PremiumIncludingGST)
        .toFixed(2)
        .toString();
      LPolicyDto.PremiumDetails.Stampduty = Number(ratingData.Stampduty).toFixed(2).toString();
      LPolicyDto.PremiumDetails.SumInsuredinINR = Number(ratingData.SumInsuredinINR)
        .toFixed(2)
        .toString();
      LPolicyDto.PremiumDetails.TotalCargoSI = Number(ratingData.TotalCargoSI)
        .toFixed(2)
        .toString();

      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  }, [ratingData]);

  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

  return (
    <div>
      <MDBox
        p={3}
        mt={10}
        mb={10}
        ml={45}
        width="30rem"
        height="auto"
        sx={{ backgroundColor: "rgba(217, 217, 217, 0.9)" }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} ml={25}>
              <MDTypography
                fontSize="15px"
                variant="h6"
                sx={{ color: "#000000", textAlign: "center" }}
              >
                Amount In Rupees{" "}
              </MDTypography>
            </Grid>
          </Grid>
          <Stack spacing={0.1}>
            <Grid container spacing={3} mt={0.5}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={5}>
                <MDTypography sx={{ color: "#000000", fontSize: "15px" }}>Net premium</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
              <MDTypography sx={{ color: "#000000" }}> </MDTypography>
            </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={4.5}>
                <MDTypography sx={{ color: "#000000", fontSize: "15px", textAlign: "right" }}>
                  {formatter.format(ratingData.PremiumExcludingGST)}
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={2.2}>
                <MDTypography sx={{ color: "#000000", fontSize: "15px" }}>Stamp Duty</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
              <MDTypography sx={{ color: "#000000" }}> </MDTypography>
            </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={4.5}>
                <MDTypography sx={{ color: "#000000", fontSize: "15px", textAlign: "right" }}>
                  {/* {ratingData.Stampduty} */}
                  {/* {formatter.format(ratingData.Stampduty)} */}
                  {Number(ratingData.Stampduty).toFixed(2).toString()}
                </MDTypography>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={2.2}>
                <MDTypography sx={{ color: "#000000", fontSize: "15px" }}>GST(18%)</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
              <MDTypography sx={{ color: "#000000" }}> </MDTypography>
            </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={4.5}>
                <MDTypography sx={{ color: "#000000", fontSize: "15px", textAlign: "right" }}>
                  {/* {ratingData.Tax} */}
                  {/* {formatter.format(ratingData.GST)} */}
                  {Number(ratingData.GST).toFixed(2).toString()}
                </MDTypography>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={2.2}>
                <MDTypography sx={{ color: "#000000", fontSize: "15px", fontWeight: "bold" }}>
                  Total Premium
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={4.5}>
                <MDTypography
                  sx={{
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  {formatter.format(ratingData.PremiumIncludingGST)}
                </MDTypography>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </MDBox>
      <MDBox p={3} mt={10} mb={10} ml={40} width="35rem" height="auto">
        <Grid
          container
          spacing={10}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          ml={-1.5}
          mt={-7}
        >
          <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDButton onClick={() => handleQuote(PolicyDto.ProposalNo)}>Download Quote</MDButton>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDButton onClick={() => handleproposal(PolicyDto.ProposalNo)}>
              Download Proposal
            </MDButton>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <div>
              <MDButton variant="contained" onClick={handleClickOpen}>
                Open Clauses
              </MDButton>
              <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    {/* <MDTypography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                      Clauses
                    </MDTypography> */}
                    <MDTypography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                      Clauses, Warranties, Exclusions & Excess
                    </MDTypography>
                  </Toolbar>
                </AppBar>
                <List>
                  {/* <ListItem>
                    {clflag === true ? (
                      <ListItemText>
                        <h1>Common Clause</h1>
                      </ListItemText>
                    ) : null}
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      {dropdowndata !== "" ? (
                        clauseArray[0][0].map((elem1) => (
                          <Grid>
                            {elem1.length > 0
                              ? elem1.map((elem2) => (
                                  <MDTypography
                                    sx={{
                                      fontSize: "1.25re   m",
                                    }}
                                  >
                                    {elem2.mValue}
                                  </MDTypography>
                                ))
                              : null}
                          </Grid>
                        ))
                      ) : (
                        <MDTypography id="modal-modal-title" variant="h6" component="h2">
                          failling
                        </MDTypography>
                      )}
                    </ListItemText>
                  </ListItem>
                  <Divider /> */}
                  {/* <ListItem>
                    {cl1flag === true ? (
                      <ListItemText>
                        <h1>NonInstitute Clause</h1>
                      </ListItemText>
                    ) : null}
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      {dropdowndata !== "" ? (
                        clauseArray1[0][0].map((elem3) => (
                          <div>
                            <Grid>
                              {elem3.length > 0
                                ? elem3.map((elem4) => <MDTypography>{elem4.mValue}</MDTypography>)
                                : null}
                            </Grid>
                          </div>
                        ))
                      ) : (
                        <MDTypography id="modal-modal-title" variant="h6" component="h2">
                          failling
                        </MDTypography>
                      )}
                    </ListItemText>
                  </ListItem>
                  <Divider /> */}
                  {/* <ListItem>
                    {cl2flag === true ? (
                      <ListItemText>
                        <h1>InlandTransit Clause</h1>
                      </ListItemText>
                    ) : null}
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      {dropdowndata !== "" ? (
                        clauseArray2[0][0].map((elem5) => (
                          <div>
                            <Grid>
                              {elem5.length > 0
                                ? elem5.map((elem6) => <MDTypography>{elem6.mValue}</MDTypography>)
                                : null}
                            </Grid>
                          </div>
                        ))
                      ) : (
                        <MDTypography id="modal-modal-title" variant="h6" component="h2">
                          failling
                        </MDTypography>
                      )}
                    </ListItemText>
                  </ListItem>
                  <Divider /> */}
                  {/* <ListItem>
                    {cl3flag === true ? (
                      <ListItemText>
                        <h1>Institute Clause</h1>
                      </ListItemText>
                    ) : null}
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      {dropdowndata !== "" ? (
                        clauseArray3[0][0].map((elem7) => (
                          <div>
                            <Grid>
                              {elem7.length > 0
                                ? elem7.map((elem8) => <MDTypography>{elem8.mValue}</MDTypography>)
                                : null}
                            </Grid>
                          </div>
                        ))
                      ) : (
                        <MDTypography id="modal-modal-title" variant="h6" component="h2">
                          failling
                        </MDTypography>
                      )}
                    </ListItemText>
                  </ListItem>
                  <Divider /> */}
                  {/* <ListItem>
                    <ListItemText>
                      {dropdowndata !== "" && dropdowndata.AdditionalCondition !== "" ? (
                        <h1>Additional Condition</h1>
                      ) : null}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    {dropdowndata !== "" ? (
                      <ListItemText>{dropdowndata.AdditionalCondition}</ListItemText>
                    ) : null}
                  </ListItem> */}
                  {/* <Divider /> */}
                  {/* <ListItem>
                    <ListItemText>
                      {PolicyDto.ClausesWarrantyExclusionsExcess.length > 0 ? (
                        <MDTypography sx={{ ml: "1rem", fontWeight: 600, mt: "0.5rem" }}>
                          Clauses,Warranty,Exclusions & Excess
                        </MDTypography>
                      ) : null}
                    </ListItemText>
                  </ListItem>
                  <br /> */}
                  {/* <ListItem> */}
                  <ListItem>
                    <ListItemText sx={{ ml: "1rem" }}>
                      {/* {dropdowndata !== "" ? (
                        clauseArray3[0][0].map((elem7) => (
                          <div>
                            <Grid>
                              {elem7.length > 0
                                ? elem7.map((elem8) => <MDTypography>{elem8.mValue}</MDTypography>)
                                : null}
                            </Grid>
                          </div>
                        )) 
                      ) : (
                        <MDTypography id="modal-modal-title" variant="h6" component="h2">
                          failling
                        </MDTypography>
                      )} */}
                      <>
                        {clauseArray3[0][0].map((elem7) => (
                          <div key={uuidv4()}>
                            <Grid>
                              {elem7.length > 0
                                ? elem7.map((elem8) => (
                                    <MDTypography key={uuidv4()}>{elem8.mValue}</MDTypography>
                                  ))
                                : null}
                            </Grid>
                          </div>
                        ))}
                        {clauseArray2[0][0].map((elem5) => (
                          <div key={uuidv4()}>
                            <Grid>
                              {elem5.length > 0
                                ? elem5.map((elem6) => (
                                    <MDTypography key={uuidv4()}>{elem6.mValue}</MDTypography>
                                  ))
                                : null}
                            </Grid>
                          </div>
                        ))}
                      </>
                      <Grid>
                        {/* <MDTypography>{PolicyDto.RiskClauses[0].Clauses}</MDTypography> */}
                        <MDTypography>{PolicyDto?.RiskClauses[0]?.Clauses}</MDTypography>
                      </Grid>
                    </ListItemText>
                  </ListItem>
                  {/* <br /> */}
                  {/* <Divider /> */}
                  <ListItem>
                    <ListItemText sx={{ ml: "1rem" }}>
                      {dropdowndata !== "" ? (
                        clauseArray[0][0].map((elem1) => (
                          <Grid>
                            {elem1.length > 0
                              ? elem1.map((elem2) => (
                                  <MDTypography
                                    sx={{
                                      fontSize: "1.25re   m",
                                    }}
                                  >
                                    {elem2.mValue}
                                  </MDTypography>
                                ))
                              : null}
                          </Grid>
                        ))
                      ) : (
                        <MDTypography id="modal-modal-title" variant="h6" component="h2">
                          failling
                        </MDTypography>
                      )}
                    </ListItemText>
                  </ListItem>
                  {/* <br /> */}
                  {/* <Divider /> */}
                  <ListItem>
                    <ListItemText sx={{ ml: "1rem" }}>
                      {dropdowndata !== "" ? (
                        clauseArray1[0][0].map((elem3) => (
                          <div>
                            <Grid>
                              {elem3.length > 0
                                ? elem3.map((elem4) => <MDTypography>{elem4.mValue}</MDTypography>)
                                : null}
                            </Grid>
                          </div>
                        ))
                      ) : (
                        <MDTypography id="modal-modal-title" variant="h6" component="h2">
                          failling
                        </MDTypography>
                      )}
                    </ListItemText>
                  </ListItem>
                  {/* <br /> */}
                  {/* <Divider /> */}
                  {/* <ListItem>
                    <ListItemText sx={{ ml: "1rem" }}>
                      {dropdowndata !== "" ? (
                        clauseArray2[0][0].map((elem5) => (
                          <div>
                            <Grid>
                              {elem5.length > 0
                                ? elem5.map((elem6) => <MDTypography>{elem6.mValue}</MDTypography>)
                                : null}
                            </Grid>
                          </div>
                        ))
                      ) : (
                        <MDTypography id="modal-modal-title" variant="h6" component="h2">
                          failling
                        </MDTypography>
                      )}
                    </ListItemText>
                  </ListItem> */}
                  {/* <Divider /> */}
                  {/* <br /> */}
                  {/* <Divider /> */}
                  <br />
                  {PolicyDto.ClausesWarrantyExclusionsExcess.length > 0
                    ? PolicyDto.ClausesWarrantyExclusionsExcess[0].Clauses.split(" &&").map(
                        (iteam) => (
                          <ListItemText sx={{ ml: "1rem" }} key={MD5(iteam).toString()}>
                            {iteam}
                          </ListItemText>
                        )
                      )
                    : null}
                  <ListItem>
                    {PolicyDto.ClausesWarrantyExclusionsExcess.length > 0 &&
                    PolicyDto.ClausesWarrantyExclusionsExcess[0].Excess.length > 0 ? (
                      <ListItemText sx={{ ml: "1rem" }}>
                        <br />
                        Excess- {PolicyDto.ClausesWarrantyExclusionsExcess[0].Excess}
                      </ListItemText>
                    ) : null}
                  </ListItem>
                  <br />
                  {PolicyDto.ClausesWarrantyExclusionsExcess.length > 0
                    ? PolicyDto.ClausesWarrantyExclusionsExcess[0].Exclusion.split(" &&").map(
                        (iteam) => (
                          <ListItemText sx={{ ml: "1rem" }} key={MD5(iteam).toString()}>
                            {iteam}
                          </ListItemText>
                        )
                      )
                    : null}
                  <br />
                  {PolicyDto.ClausesWarrantyExclusionsExcess.length > 0
                    ? PolicyDto.ClausesWarrantyExclusionsExcess[0].Warranty.split(" &&").map(
                        (iteam) => (
                          <ListItemText sx={{ ml: "1rem" }} key={MD5(iteam).toString()}>
                            {iteam}
                          </ListItemText>
                        )
                      )
                    : null}
                  <br />
                  {PolicyDto.ClausesWarrantyExclusionsExcess.length > 0
                    ? PolicyDto.ClausesWarrantyExclusionsExcess[0].SpecialConditions.split(
                        " &&"
                      ).map((iteam) => (
                        <ListItemText sx={{ ml: "1rem" }} key={MD5(iteam).toString()}>
                          {iteam}
                        </ListItemText>
                      ))
                    : null}
                  <br />
                  <ListItem>
                    <ListItemText>
                      {dropdowndata !== "" && dropdowndata.AdditionalCondition !== "" ? (
                        <MDTypography sx={{ ml: "1rem", fontWeight: 600 }}>
                          Additional Condition
                        </MDTypography>
                      ) : null}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    {dropdowndata !== "" && dropdowndata.AdditionalCondition !== "" ? (
                      <ListItemText sx={{ ml: "1rem" }}>
                        {dropdowndata?.AdditionalCondition}
                      </ListItemText>
                    ) : null}
                  </ListItem>
                  {/* </ListItem> */}
                </List>
              </Dialog>
            </div>
          </Grid>
          {/* <Grid container spacing={7} display="flex" flexDirection="row" justifyContent="center">
            <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mt={10}>
              <MDButton onClick={() => handleproposal(PolicyDto.ProposalNo)}>
                Download & Resend Quote
              </MDButton>
            </Grid>
          </Grid> */}

          {/* <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            {/* <MDButton>
              <input accept="image/*" type="file" onChange={() =>
                 handleFileUpload()} />
              Upload Proposal
            </MDButton> */}

          {/* <MDButton variant="contained" component="label">
              Upload Proposal
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                // onChange={handleFileUpload(event, uploadedfilename)}
                onChange={(e) => handleFileUpload(e, "uploadedfilename")}
              />
            </MDButton>
          </Grid>  */}
          {/* <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
          {/* <MDButton onClick={handleFileUpload()}>Upload Invoice</MDButton> */}
          {/* <MDButton variant="contained" component="label">
              Upload Invoice
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                // onChange={handleFileUpload(event, uploadedfilename)}
                onChange={(e) => handleFileUpload(e, "uploadedfilename")}
              />
            </MDButton>
          </Grid> */}
        </Grid>
      </MDBox>
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
          <Grid container style={{ position: "sticky", top: "0" }}>
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
                              // open={Boolean(x.DocType)}
                              renderInput={(params) => (
                                <MDInput
                                  {...params}
                                  label="Select Document"
                                  required
                                  inputProps={{
                                    ...params.inputProps,
                                    readOnly: true,
                                  }}
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
                                disabled={docUpload.length >= 10}
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
                    {/* <MDButton
                      color="info"
                      fullwidth
                      sx={{ ml: "390px", mt: 1 }}
                      onClick={() => handledocUpload(filedata, docfiles, dwlfilename)}
                    >
                      Upload
                    </MDButton> */}
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
          <MDBox display="flex" flexDirection="row" spacing={1}>
            {/* <ThemeProvider theme={themecheck}> */}
            <ThemeProvider theme={theme}>
              <CustomCheckbox checked={checkProposalConsent} onChange={handleCheckBox} />
            </ThemeProvider>
            {/* </ThemeProvider> */}
            <MDTypography sx={{ fontSize: "1rem", marginTop: "9px" }}>
              Proposal consent
            </MDTypography>
          </MDBox>
        </MDBox>
        {flag && checkProposalConsent === false ? (
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
                  disabled={master.otpflag}
                  inputProps={{ maxLength: 6 }}
                />
                {flag && OTP === "" ? (
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
                    disabled={masterArray.verifyotp === "false"}
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
              <Grid item xs={12} sm={12} md={2}>
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={handleVerifyOTP}
                  disabled={masterArray.verifyotp === "false"}
                >
                  Verify OTP
                </MDButton>
              </Grid>
            </Grid>
            {/* <MDBox display="flex" flexDirection="row">
              <Checkbox
                checked={checkDisclaimer}
                onChange={handleCheckDisclaimer}
                sx={{ mb: "6rem" }}
              />
              <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
                I/We Hereby declare that the statements made by me/us in this proposal form are true
                to the best of my/our Knowledge and belief and I/we hereby agree that this
                declaration shall form the basis of the contract between me/us and the Universal
                Sompo General Insurance Company Limited insurance Company. <br />
                I/We also declare that any addition alteration are carried out after the submission
                of this proposal form that the same would be conveyed to the insurance company
                immediately.
              </MDTypography>
            </MDBox>
            {flag && checkDisclaimer === false ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill this Field
              </MDTypography>
            ) : null} */}
            <MDBox display="flex" flexDirection="row">
              {/* <ThemeProvider theme={theme}> */}
              <ThemeProvider theme={theme}>
                <CustomCheckbox
                  checked={checkDisclaimer}
                  onChange={handleCheckDisclaimer}
                  // sx={{ mb: "6rem" }}
                />
              </ThemeProvider>
              {/* </ThemeProvider> */}
              <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
                I/We Hereby declare that the statements made by me/us in this proposal form are true
                to the best of my/our Knowledge and belief and I/we hereby agree that this
                declaration shall form the basis of the contract between me/us and the Universal
                Sompo General Insurance Company Limited insurance Company.
              </MDTypography>
            </MDBox>
            {flag && checkDisclaimer === false ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
            <MDBox display="flex" flexDirection="row">
              {/* <ThemeProvider theme={theme}> */}
              <ThemeProvider theme={theme}>
                <CustomCheckbox checked={checkInsurance} onChange={handleCheckInsurance} />
              </ThemeProvider>
              {/* </ThemeProvider> */}
              <MDTypography
                // sx={{
                //   fontSize: "1rem",
                //   marginTop: "5px",
                //   fontWeight: "bold",
                // }}
                sx={{ fontSize: "1rem", marginTop: "5px" }}
              >
                I/We also declare that any addition alteration are carried out after the submission
                of this proposal form that the same would be conveyed to the insurance company
                immediately.
              </MDTypography>
            </MDBox>
            {flag && checkInsurance === false ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </>
        )}
      </Grid>
    </div>
  );
}

export default PremiumBreakup;
