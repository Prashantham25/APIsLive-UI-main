import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Card,
  CircularProgress,
  Backdrop,
  Autocomplete,
  Popover,
  MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import MDCheckbox from "components/MDCheckbox";
import TableCell from "@mui/material/TableCell";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
// import { createTheme,ThemeProvider, styled } from "@mui/material/styles";
// import { grey } from "@mui/material/colors";
// import TextField from "@mui/material/TextField";
import MDInput from "components/MDInput";
import swal from "sweetalert";
import MDDatePicker from "components/MDDatePicker";
import { addDays } from "date-fns";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MDTypography from "components/MDTypography";
import { UploadFiles } from "modules/PolicyLive/views/BLUS/data/index";
import MDBox from "components/MDBox";
import { DeleteFile } from "../../../BrokerPortal/Pages/MyProfile/data/index";
// import Divider from "@mui/material/Divider";
import {
  makePayment,
  fetchPaymentURL,
  sendPaymentMail,
  fetchusername,
  SavePaymentdetails,
  GetACDBalanceAmt,
  GetACDPaymentStatus,
} from "./data/index";
import Policypayment from "../BLUS/data/PaymentJson";
import { GetBGRMasters } from "../Home/data/index";
import { useDataController, setBGRTransactionId } from "../../../BrokerPortal/context";
import MDButton from "../../../../components/MDButton";
import { postRequest, getRequest } from "../../../../core/clients/axiosclient";

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
          <Typography>{children}</Typography>
        </MDBox>
      )}
    </div>
  );
}
const CustomCheckbox = styled(MDCheckbox)(({ theme }) => ({
  color: theme.status.outline,
  "&.Mui-checked": {
    color: theme.status.danger,
  },
}));
TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function PaymentDetailss({ handleBack, paymentJson, setPaymentJson, Json, setJson }) {
  // const CustomRadio = styled(Radio)(({ theme }) => ({
  //   color: theme.status.outline,
  //   "&.Mui-checked": {
  //     color: theme.status.danger,
  //   },
  // }));

  // const theme = createTheme({
  //   status: {
  //     danger: "#c70825",
  //     outline: grey[500],
  //   },
  // });

  const lproposer = Json;
  console.log("lproposer", lproposer);
  const paymentDto = paymentJson;
  console.log("paymentDto", paymentDto);
  const [, dispatch] = useDataController();
  const { BankName } = GetBGRMasters().bgrMaster.Masters;
  const navigate = useNavigate();
  const [errorFlag, setErrorFlag] = useState(false);
  const [transactionID, settransactionID] = useState();
  const [paymentData, setPaymentData] = useState([]);
  const [Sucessurl, setSuccessurl] = useState();
  const [Failureurl, setFailureurl] = useState();
  const [loadingflag, setloadingflag] = useState(false);
  const [ClientFlag, setClientFlag] = useState(false);
  const [chequeFlag, setChequeFlag] = useState(true);
  const [onlinePayFlag, setOnlinePayFlag] = useState(false);
  const [payLinkFlag, setPayLinkFlag] = useState(false);
  const [invalidInsNo, setInvalidInsNo] = useState(false);
  // const [datetoShow, setDate] = useState({
  //   InstrumentDate: null,
  // });
  const [email, setEmail] = useState(lproposer.QuoteEmail);
  const [emailflag, setEmailFlag] = useState(false);
  const [CDFlag, setCDFlag] = useState(false);
  const [ACDPayment, setACDPayment] = useState(false);
  const [checkbutton, setCheckButton] = useState(true);
  console.log("setCheckbutton", setCheckButton);
  const [amountCollected, setAmountCollected] = useState(false);
  const [CDSubmit, setCDSubmit] = useState(false);
  const [paymentdata, setpaymentdata] = useState(Policypayment);
  console.log("paymentdata", paymentdata);
  const [SinglePolicySinglePayment, setSinglePolicySinglePayment] = useState(false);
  const [PayU, setPayU] = useState(true);
  console.log("Payu", PayU);
  const [finSal, setFinsal] = useState(false);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const ProposalNumber = Json.proposalNumber;
  console.log("ProposalNumber", ProposalNumber);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log("selectedRows", selectedRows);
  const [selectedRowSum, setSelectedRowSum] = useState(0);
  console.log("selectedRowSum", selectedRowSum);
  const [selectedRowData1, setselectedRowData1] = useState();
  console.log("selectedRowData1", selectedRowData1);
  const Documen = [
    { mID: 1, mValue: "Pan Copy" },
    { mID: 2, mValue: "Aadhar Card" },
  ];

  const [docUpload, setDocUpload] = useState([
    {
      DocName: "",
      DocId: 1,
      DocType: "",
      DocRemarks: "",
      DocFlag: false,
      DocExtension: "",
      DocDate: "",
      DMSDocId: "",
    },
  ]);
  function calculateExpDate(PolicyEndDate) {
    // const dateComponents = PolicyEndDate.split("/");
    const dateComponents = PolicyEndDate.split("-");
    const day = parseInt(dateComponents[0], 10);
    const month = parseInt(dateComponents[1], 10) - 1;
    const year = parseInt(dateComponents[2], 10);

    const endDate = new Date(year, month, day);

    // if (isNaN(endDate)) {
    //   return "Invalid Date";
    // }

    const ExpDate = (endDate.getTime() - new Date("1970-01-01T00:00:00Z").getTime()).toString();

    return ExpDate;
  }
  const [finsalData, setFinsalData] = useState({
    serviceName: "BankSelectorService",

    serviceMethod: "saveOrUpdateBankSelector",

    user: {
      mobileNo: Json.QuoteMobileNo,

      emailId: Json.QuoteEmail,

      firstName: Json.ProposerDetails["First Name"],

      lastName: Json.ProposerDetails["Last Name"],

      pan: Json.ProposerDetails.PanNo,
    },

    external_entity_name: {
      externalEntityNameId: "25",
    },

    external_entity_type: {
      externalEntityTypeId: "1",
    },

    otherPremium: Json.PremiumDetails["Total with Tax"],

    thirdPartyPremium: "0",

    policyRefNumber: Json["Quotation No"],

    // policyExpiryDate: calculateExpDate(Json.PolicyEndDate),
    policyExpiryDate: calculateExpDate(Json.PEndDate),

    clientId: "2034",

    clientKey: "473057ae265eff409fd75acbc9c12b55543e0dd292931b2d9d1b0e7bedc594ae",

    version: "1.0.0",

    roles: "executive",

    loggedInUniqueIdentifierId: "18",

    loggedInUserId: "463",
  });
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
        // setJson((prevState) => ({ ...prevState, DocumentDetails: docUpload }));
        setJson((prevState) => ({
          ...prevState,
          DocumentDetails: [...prevState.DocumentDetails, ...docUpload],
        }));
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
        text: "Please select the Doumnent type before uploading",
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

  const [ACDaccount, setACDaccount] = useState();
  const handleClick1 = (event) => {
    setAnchorE2(event.currentTarget);
    setPayU(false);
  };
  const handleClose1 = () => {
    setAnchorE2(null);
  };
  const handlePayU = () => {
    setPayU(true);
    setFinsal(false);
  };
  const handleFinsal = () => {
    setFinsal(true);
    setPayU(false);
    setAnchorE2(null);
  };

  const handleCheckboxChange = (rowId) => {
    const numberOfSelectedCheckboxes = selectedRows.length;

    if (numberOfSelectedCheckboxes >= 2 && !selectedRows.some((row) => row.Payment_ID === rowId)) {
      swal({
        icon: "warning",

        text: "You can only select up to two Receipt",
      });

      return;
    }

    setSelectedRows((prevSelectedRows) => {
      const rowIndex = prevSelectedRows.findIndex((row) => row.Payment_ID === rowId);

      const updatedSelectedRows = [...prevSelectedRows];

      if (rowIndex !== -1) {
        updatedSelectedRows.splice(rowIndex, 1);
      } else {
        const selectedRowData = ACDaccount.find((row) => row.Payment_ID === rowId);
        setselectedRowData1(selectedRowData);

        if (selectedRowData) {
          updatedSelectedRows.push(selectedRowData);
        }
      }
      if (updatedSelectedRows.length === 0) {
        setAmountCollected(false);
        setCDSubmit(false);
        setCheckButton(true);
      } else {
        const selectedRowsSum = updatedSelectedRows.reduce(
          (total, row) => total + row.BalanceAmt,
          0
        );

        setSelectedRowSum(selectedRowsSum);

        setCheckButton(false);
      }

      return updatedSelectedRows;
    });
  };

  const handelfinsalsubmit = async () => {
    console.log("doc", Json.DocumentDetails);
    if (!Json.DocumentDetails.some((x) => x.DocType === "Pan Copy")) {
      swal({
        icon: "error",
        text: "Please Upload PanCard",
      });
    } else {
      const response = await postRequest(
        "PaymentExtension/RedirectToPF?ICProductName=PremiumFinancing",
        finsalData
      );
      console.log("date", Json.ProposerDetails.PolicyEndDate);
      console.log("link", response);
      if (response.data.statusCode === "LPC_008") {
        window.location.replace(response.data.redirectionLink);
      } else {
        // navigate("/BLUS/PaymentFailure");
        swal({
          icon: "error",
          text: response.data.errorMessage,
        });
      }
    }
  };

  const handlepanchange = (e) => {
    const { ProposerDetails } = Json;
    ProposerDetails.PAN = e.target.value;
    finsalData.user.pan = e.target.value;
    // finsalData.policyExpiryDate = calculateExpDate(Json.ProposerDetails.PolicyEndDate);
    setFinsalData(finsalData);
    setJson((prevState) => ({ ...prevState, ProposerDetails }));
  };

  const open1 = Boolean(anchorE2);

  const handlemychange = (e) => {
    if (e.target.name === "Client Payment") {
      setClientFlag(true);
      setACDPayment(false);
      setCDFlag(false);
      setSinglePolicySinglePayment(false);
    } else if (e.target.name === "Agent Payment") {
      setClientFlag(false);
      setACDPayment(true);
      setAmountCollected(false);
    }
  };

  const handleChequeClick = () => {
    setChequeFlag(true);
    setOnlinePayFlag(false);
    setPayLinkFlag(false);
    setCDFlag(false);
    setSinglePolicySinglePayment(false);
    setCDSubmit(false);
    setAmountCollected(false);
  };

  const handleOnlinePayment = () => {
    setOnlinePayFlag(true);
    setChequeFlag(false);
    setPayLinkFlag(false);
    setCDFlag(false);
    setSinglePolicySinglePayment(false);
    setCDSubmit(false);
    setAmountCollected(false);
    setFinsal(false);
    setPayU(true);
  };

  const handleSendPaymentLink = () => {
    setPayLinkFlag(true);
    setOnlinePayFlag(false);
    setChequeFlag(false);
    setCDFlag(false);
    setSinglePolicySinglePayment(false);
    setCDSubmit(false);
    setAmountCollected(false);
  };
  const [username, setUsername] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await fetchusername(`${localStorage.getItem("userId")}`);
      setUsername(result.data.userName);
    };
    fetchUserData();
  }, []);
  const handleCDAccount = async () => {
    const obj = {
      code: username,
      key: "oOb?eo%vsP7539",
    };
    const response = await GetACDBalanceAmt(obj);
    setACDaccount(response.data);
    setCDFlag(true);
    setPayLinkFlag(false);
    setOnlinePayFlag(false);
    setChequeFlag(false);
    setSinglePolicySinglePayment(true);
  };

  // const handleSinglePolicySinglePayment = async () => {
  //   const obj = {
  //     code: username,
  //     key: "oOb?eo%vsP7539",
  //   };
  //   const response = await GetACDBalanceAmt(obj);
  //   setACDaccount(response.data);
  //   setSinglePolicySinglePayment(true);
  // };

  const handleCDSubmit = () => {
    if (selectedRowSum < Json.PremiumDetails["Total with Tax"]) {
      swal({
        icon: "error",
        text: "Insufficiant Amount",
        buttons: "Okay",
      });
    } else {
      setCDSubmit(true);
      // setCheckButton(true);
      setAmountCollected(true);
    }
  };

  const handleIssuePolicy = async () => {
    setloadingflag(true);
    const obj1 = {
      cod: username,
      pytmid1: selectedRowData1.Payment_ID,
      pytmid2: "",
      amount: Json.PremiumDetails["Total with Tax"],
      usr: "a",
      props: ProposalNumber,
      ky: "oOb?eo%vsP7539",
    };
    console.log("obj1", obj1);
    const result = await GetACDPaymentStatus(obj1);
    console.log("result111", result);
    if (result.status === 200) {
      const { PaymentDetails } = Json;
      PaymentDetails.ChequeAmount = Json.PremiumDetails["Total with Tax"];
      PaymentDetails.transactionNo = transactionID;
      PaymentDetails.paymentSource = "EB";
      setJson((prevState) => ({ ...prevState, PaymentDetails }));
      console.log("Payment", Json);
      const Paymentdetls1 = Policypayment;
      console.log("Paymentdetls1", Paymentdetls1);
      Paymentdetls1.policyNo = "";
      Paymentdetls1.proposalNo = ProposalNumber;
      Paymentdetls1.paymentDetailsDTO.ChequeAmount = Json.PremiumDetails["Total with Tax"];
      Paymentdetls1.paymentDetailsDTO.InstrumentDate = selectedRowData1.ChqDate;
      Paymentdetls1.paymentDetailsDTO.InstrumentNo = selectedRowData1.Payment_ID;
      Paymentdetls1.paymentDetailsDTO.paymentSource = "EB";
      Paymentdetls1.paymentDetailsDTO.transactionNo = transactionID;
      console.log("json", lproposer);
      setpaymentdata((prev) => ({ ...prev, ...Paymentdetls1 }));
      SavePaymentdetails(Paymentdetls1).then(async (result1) => {
        console.log("Payment saved", result1);
        if (result1.data.status === 1) {
          const jsonValue = {
            communicationId: 201,
            keyType: "BGRPolicy",
            key: result1.data.id,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: lproposer.QuoteEmail,
              },
            ],
          };
          await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
          const mobileNo = lproposer.QuoteMobileNo;
          const Message = `Dear Customer,Welcome to USGI Family. Your CONTRACTOR PLANT AND MACHINERY INSURANCE has been issued with policy no. ${
            result1.data.id
          } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
          await getRequest(
            `WCFExtension/SendSms?ICProductName=usgi&MobileNo=${mobileNo}&Message=${Message}`
          );

          navigate(
            `/Home/PaymentSuccess?backURL=&PaymentRefNo=${paymentDto.paymentDetailsDTO.paymentRefNo}`
          );
        } else {
          navigate("/CPM/PaymentFailure");
        }
      });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}/${propformat(
      propdate.getMonth() + 1
    )}/${propdate.getFullYear()}`;
  };
  const [bodyData, setbodyData] = useState({
    key: process.env.REACT_APP_PayuKey,
    txnid: "",
    amount: lproposer.PremiumDetails["Total with Tax"],
    productinfo: "Contractor's Plant & Machinery Insurance",
    firstname: lproposer.ProposerDetails["First Name"],
    email: lproposer.QuoteEmail,
    phone: lproposer.QuoteMobileNo,
    surl: `https://20.207.118.76/api/Policy/PaymentRedirection?${paymentDto.paymentDetailsDTO.paymentRefNo}`,
    furl: "/paymentfailure",
    salt: process.env.REACT_APP_PayuSalt,
  });

  const handelsubmitchange = async () => {
    if (
      paymentDto.paymentDetailsDTO.InstrumentNo === "" ||
      paymentDto.paymentDetailsDTO.InstrumentDate === "" ||
      paymentDto.paymentDetailsDTO.BankName === ""
    ) {
      setErrorFlag(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (invalidInsNo === true) {
      swal({
        icon: "error",
        text: "Instrument Number should be 6 digits",
      });
    } else {
      // debugger;
      setErrorFlag(false);
      console.log("clicked");
      setloadingflag(true);
      paymentDto.paymentDetailsDTO.ChequeAmount = lproposer.PremiumDetails["Total with Tax"];
      paymentDto.paymentDetailsDTO.transactionNo = lproposer.TransactionID;
      paymentDto.policyNo = "";
      paymentDto.proposalNo = lproposer.proposalNumber;
      paymentDto.paymentDetailsDTO.paymentSource = "CHEQUE";
      lproposer.PaymentDetails.ChequeAmount = paymentDto.paymentDetailsDTO.ChequeAmount;
      lproposer.PaymentDetails.InstrumentNo = paymentDto.paymentDetailsDTO.InstrumentNo;
      lproposer.PaymentDetails.InstrumentDate = paymentDto.paymentDetailsDTO.InstrumentDate;
      lproposer.PaymentDetails.BankName = paymentDto.paymentDetailsDTO.BankName;
      lproposer.PaymentDetails.transactionNo = paymentDto.paymentDetailsDTO.transactionNo;
      lproposer.PaymentDetails.paymentSource = paymentDto.paymentDetailsDTO.paymentSource;
      lproposer.PaymentDetails.paymentId = paymentDto.paymentDetailsDTO.paymentSource;
      lproposer.PaymentDetails.paymentResponse = paymentDto.paymentDetailsDTO.paymentResponse;
      lproposer.PaymentDetails.paymentType = paymentDto.paymentDetailsDTO.paymentType;
      setJson((prevState) => ({
        ...prevState,
        ...lproposer,
      }));
      console.log("json", lproposer);
      setPaymentJson((prev) => ({ ...prev, ...paymentDto }));
      SavePaymentdetails(paymentDto).then(async (result1) => {
        // debugger;
        console.log("Payment saved", result1);
        if (result1.data.status === 1) {
          const jsonValue = {
            communicationId: 201,
            keyType: "BGRPolicy",
            key: result1.data.id,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: lproposer.QuoteEmail,
              },
            ],
          };
          await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
          const mobileNo = lproposer.QuoteMobileNo;
          const Message = `Dear Customer,Welcome to USGI Family. Your CONTRACTOR PLANT AND MACHINERY INSURANCE has been issued with policy no. ${
            result1.data.id
          } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
          await getRequest(
            `WCFExtension/SendSms?ICProductName=usgi&MobileNo=${mobileNo}&Message=${Message}`
          );
          setloadingflag(false);
          // navigate("/CPM/PaymentSuccess");
          navigate(
            `/Home/PaymentSuccess?backURL=&PaymentRefNo=${paymentDto.paymentDetailsDTO.paymentRefNo}`
          );
        } else {
          navigate("/CPM/PaymentFailure");
        }
      });
    }
  };

  const handlepagechange = (e) => {
    console.log("yyyy", paymentDto);
    const numReg = /^[0-9]*$/;
    if (numReg.test(e.target.value) || e.target.value === "") {
      paymentDto.paymentDetailsDTO[e.target.name] = e.target.value;
      setPaymentJson((prevState) => ({ ...prevState, ...paymentDto }));
    }
  };

  const handleInstrumentNoVAlidation = (e) => {
    const numReg = /^[0-9]{6}$/;
    if (!numReg.test(e.target.value)) {
      setInvalidInsNo(true);
    } else {
      setInvalidInsNo(false);
    }
  };

  const min = `${formatPropDate(new Date())}`;

  const handleDateChange = (value1) => {
    console.log("value", value1);
    // datetoShow.InstrumentDate = value1;
    // setDate((prevState) => ({ ...prevState, InstrumentDate: value1 }));
    // paymentDto.paymentDetailsDTO[type] = formatPropDate(value1);
    paymentDto.paymentDetailsDTO.InstrumentDate = formatPropDate(value1);

    setPaymentJson((prevState) => ({
      ...prevState,
      ...paymentDto,
    }));
  };

  const handlePayment = (bodyData1) => {
    if (bodyData1.txnid !== "") {
      console.log("Inside payment", bodyData1);
      makePayment(bodyData1);
    }
  };

  const handleTxnIDgen = () => {
    console.log("pppp", lproposer);
    fetchPaymentURL(782, lproposer.proposalNumber, lproposer.PremiumDetails["Total with Tax"]).then(
      (results) => {
        const data = results;
        setPaymentData(data);
        console.log("InGetpayment", data);
        setBGRTransactionId(dispatch, results.paymentRefNo);
        settransactionID(results.transactionID);
        setPaymentJson((prevState) => ({
          ...prevState,
          TransactionID: results.transactionID,
        }));
        setSuccessurl(results.surl);
        setFailureurl(results.furl);
        paymentDto.paymentDetailsDTO.paymentRefNo = results.paymentRefNo;
        setPaymentJson((prevState) => ({
          ...prevState,
          ...paymentDto,
        }));
        // lproposer.TransactionID = results.transactionID;
        console.log("pgggg", lproposer);
        console.log("payment coming", paymentData);
      }
    );
    console.log("pgggg1", lproposer);
    console.log("Transaction", transactionID);
  };

  const HandlePay = (e) => {
    // debugger;
    paymentDto.paymentDetailsDTO[e.target.name] = e.target.value;
    setPaymentJson((prevState) => ({
      ...prevState,
      ...paymentDto,
    }));
  };

  const handleformData = () => {
    if (paymentDto.paymentDetailsDTO["Pay-U"] === "") {
      setErrorFlag(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (transactionID !== "") {
      bodyData.txnid = transactionID;
      bodyData.surl = Sucessurl;
      bodyData.furl = Failureurl;
      setbodyData(bodyData);
      console.log("tran", transactionID);
      console.log("bodydata", bodyData);
      handlePayment(bodyData);
    }
  };

  useEffect(() => {
    handleTxnIDgen();
  }, []);

  useEffect(() => {
    setPaymentJson((prevState) => ({
      ...prevState,
      ...paymentDto,
    }));
  }, [bodyData]);

  const handleSetValue = (e, value) => {
    paymentDto.paymentDetailsDTO.BankName = value.mValue;
    setPaymentJson((prevState) => ({ ...prevState, ...paymentDto }));
  };

  const handlePaymentLink = async () => {
    if (email === "") {
      setErrorFlag(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (emailflag === true) {
      swal({
        icon: "error",
        text: "Please fill a valid E-Mail ID",
      });
    } else {
      console.log("pppp", lproposer.proposalNumber);
      const mail = await sendPaymentMail(lproposer.proposalNumber, email);
      // const mail = await sendMail(proposalNumber, "sahana@inubesolution.com");
      console.log("mail", mail);
      if (mail.data.status === 1) {
        swal({
          text: `Payment Link Shared Successfully.`,
          buttons: "Home",
          html: true,
          icon: "success",
        }).then(() => window.open(process.env.REACT_APP_HOMEURL, "_self"));
      }
    }
  };
  const handleClearButtonClick = () => {
    setSelectedRows([]);
    setCheckButton(true);
    setSelectedRowSum(0);
    setCDSubmit(false);
    setAmountCollected(false);
  };
  const handleFieldValidation = (e) => {
    if (e.target.name === "Email") {
      const emailReg =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/i;
      if (!emailReg.test(e.target.value)) {
        setEmailFlag(true);
      } else {
        setEmailFlag(false);
      }
    }
  };

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

  return (
    <MDBox>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
        open={loadingflag}
      >
        <CircularProgress />
      </Backdrop>
      <Grid container spacing={2} mt={2}>
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" justifyContent="center" spacing={2} alignItems="center" mb={2}>
            <MDTypography
              id="demo-row-radio-buttons-group-label"
              alignItems="center"
              sx={{ color: "#000000", fontSize: "1rem", ml: "10rem", mt: "1.50rem" }}
            >
              Payment Type
            </MDTypography> */}

        {/* <ThemeProvider theme={theme}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                // sx={{ color: "#000000", fontSize: "1rem", ml: "20rem" }}
                defaultValue="ClientPayment"
                // onClick={handlemychange}
              >
                <FormControlLabel
                  value="ClientPayment"
                  control={<CustomRadio />}
                  label="Client Payment"
                  name="Client Payment"
                  onClick={handlemychange}
                />
                <FormControlLabel
                  value="AgentPayment"
                  control={<CustomRadio />}
                  label="Agent Payment"
                  name="Agent Payment"
                  onClick={handlemychange}
                />
              </RadioGroup>
            </ThemeProvider> */}

        {/* </FormControl> */}
        {/* </Stack>
        </Grid> */}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <FormControl>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              alignItems="center"
              sx={{ color: "#000000", fontSize: "1rem", ml: "10rem", mt: "1.50rem" }}
            >
              Payment Type*
            </FormLabel>
            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="Client Payment"
                sx={{ color: "#000000", fontSize: "1rem", ml: "20rem", mt: "-1.5rem" }}
              >
                <FormControlLabel
                  value="Client Payment"
                  control={<CustomRadio />}
                  name="Client Payment"
                  // sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
                  label="Client Payment"
                  onClick={handlemychange}
                />
                <FormControlLabel
                  value="Agent Payment"
                  control={<CustomRadio />}
                  name="Agent Payment"
                  label="Agent Payment"
                  onClick={handlemychange}
                />
              </RadioGroup>
            </ThemeProvider>
          </FormControl>
        </Stack>
      </Grid>
      {(ClientFlag === true || ClientFlag === false) && (
        <Grid>
          <MDBox display="flex" flexDirection="column">
            {onlinePayFlag === true && (
              <MDBox mt={1} ml={8}>
                <FormControl>
                  <ThemeProvider theme={theme}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      defaultValue="singlepolicysinglepayment"
                      sx={{ ml: "15rem" }}
                    >
                      <FormControlLabel
                        value="singlepolicysinglepayment"
                        control={<CustomRadio />}
                        label="Single Policy-Single Payment"
                      />
                      <FormControlLabel
                        value="singlepolicymultiplepayment"
                        control={<CustomRadio />}
                        label="Single Policy-Multiple Payment"
                      />
                    </RadioGroup>
                  </ThemeProvider>
                </FormControl>
              </MDBox>
            )}
            {CDFlag && (
              <MDBox mt={1}>
                <FormControl>
                  <ThemeProvider theme={theme}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      defaultValue="singlepolicysinglepayment"
                      sx={{ ml: "20rem" }}
                    >
                      <FormControlLabel
                        value="singlepolicysinglepayment"
                        control={<CustomRadio />}
                        label="Single Policy-Single Payment"
                      />
                    </RadioGroup>
                  </ThemeProvider>
                </FormControl>
              </MDBox>
            )}
          </MDBox>
          <Grid container mt={2}>
            <Grid item xs={12} sm={12} md={2.5}>
              <MDBox display="flex" flexDirection="column">
                <MDBox mt={1}>
                  <MDButton
                    sx={{ width: "100%" }}
                    variant={chequeFlag ? "contained" : "outlined"}
                    color={chequeFlag ? "primary" : "primary"}
                    onClick={handleChequeClick}
                  >
                    Cheque
                  </MDButton>
                </MDBox>
                <MDBox mt={1}>
                  <MDButton
                    sx={{ width: "100%" }}
                    variant={onlinePayFlag ? "contained" : "outlined"}
                    color={onlinePayFlag ? "primary" : "primary"}
                    onClick={handleOnlinePayment}
                  >
                    Online Payment
                  </MDButton>
                </MDBox>
                <MDBox mt={1}>
                  <MDButton
                    sx={{ width: "100%" }}
                    variant={payLinkFlag ? "contained" : "outlined"}
                    color={payLinkFlag ? "primary" : "primary"}
                    // disabled
                    onClick={handleSendPaymentLink}
                  >
                    Send Payment Link
                  </MDButton>
                </MDBox>
                {ACDPayment && (
                  <>
                    <MDBox mt={1}>
                      <MDButton
                        sx={{ width: "100%" }}
                        variant={CDFlag ? "contained" : "outlined"}
                        color={CDFlag ? "primary" : "primary"}
                        onClick={handleCDAccount}
                      >
                        CD Account
                      </MDButton>
                    </MDBox>
                    {amountCollected && (
                      <MDBox>
                        <MDBox mt={40}>
                          <Typography variant="text"> Amount Collected: </Typography>
                        </MDBox>
                        <MDBox mt={1}>
                          <Typography variant="text" fontWeight="500">
                            {" "}
                            {selectedRowSum}
                          </Typography>
                        </MDBox>
                      </MDBox>
                    )}
                  </>
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={3} ml={10} mr={3}>
              {chequeFlag === true && (
                <MDBox display="flex" flexDirection="column">
                  <Grid container spacing={2}>
                    <Grid item>
                      <MDInput
                        id="outlined-basic"
                        label="Cheque Amount"
                        variant="outlined"
                        fullWidth
                        readOnly
                        value={formatter.format(lproposer.PremiumDetails["Total with Tax"])}
                        // disabled
                      />
                    </Grid>
                    <Grid item>
                      <MDInput
                        id="outlined-basic"
                        label="Instrument No."
                        variant="outlined"
                        name="InstrumentNo"
                        onChange={handlepagechange}
                        onBlur={handleInstrumentNoVAlidation}
                        inputProps={{ maxLength: 6 }}
                        sx={{ width: "100%" }}
                        fullWidth
                        value={paymentDto.paymentDetailsDTO.InstrumentNo}
                        error={paymentDto.paymentDetailsDTO.InstrumentNo === "" ? errorFlag : null}
                      />
                      {paymentDto.paymentDetailsDTO.InstrumentNo === "" && errorFlag ? (
                        <Typography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the required field
                        </Typography>
                      ) : null}
                      {paymentDto.paymentDetailsDTO.InstrumentNo !== "" && invalidInsNo ? (
                        <Typography sx={{ color: "red", fontSize: "10px" }}>
                          Please enter a 6 digit InstrumentNo
                        </Typography>
                      ) : null}
                    </Grid>
                    <Grid item>
                      <div style={{ width: "185px" }}>
                        <MDDatePicker
                          label="Instrument Date"
                          input={{
                            label: "Instrument Date",
                            value: paymentDto.paymentDetailsDTO.InstrumentDate,
                          }}
                          options={{
                            altFormat: "d-m-Y",
                            dateFormat: "d-m-Y",
                            altInput: true,
                            minDate: min,
                            maxDate: addDays(new Date(), 90),
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          // sx={{ width: "232px" }}
                          id="InstrumentDate"
                          value={paymentDto.paymentDetailsDTO.InstrumentDate}
                          onChange={(date) =>
                            handleDateChange(date, "Instrument Date", "InstrumentDate")
                          }
                          error={
                            paymentDto.paymentDetailsDTO.InstrumentDate === "" ? errorFlag : null
                          }
                        />
                        {paymentDto.paymentDetailsDTO.InstrumentDate === "" && errorFlag ? (
                          <Typography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill the required field
                          </Typography>
                        ) : null}
                      </div>
                    </Grid>
                    <MDBox sx={{ width: "236px", marginTop: "17px", marginLeft: "16px" }}>
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
                        id="Bank Name"
                        name="BankName"
                        options={BankName}
                        onChange={handleSetValue}
                        value={{ mValue: paymentDto.paymentDetailsDTO.BankName }}
                        getOptionLabel={(option) => option.mValue}
                        renderInput={(params) => (
                          <MDInput
                            fullWidth
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              readOnly: true,
                            }}
                            sx={{ width: "78%" }}
                            label="Bank Name"
                            required
                            error={
                              Object.values(paymentDto.paymentDetailsDTO.BankName || {}).every(
                                (x) => x === null || x === ""
                              )
                                ? errorFlag
                                : null
                            }
                          />
                        )}
                      />
                      {Object.values(paymentDto.paymentDetailsDTO.BankName || {}).every(
                        (x) => x === null || x === ""
                      ) && errorFlag ? (
                        <Typography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the required field
                        </Typography>
                      ) : null}
                    </MDBox>
                    <Grid item>
                      <MDButton
                        color="primary"
                        // textAlign="right"
                        fullwidth
                        alignItems="center"
                        onClick={handelsubmitchange}
                      >
                        Make Payment
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              )}
              {onlinePayFlag === true && (
                <MDBox display="flex" flexDirection="column" justifyContent="center" spacing={2}>
                  <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <ThemeProvider theme={theme}>
                      <RadioGroup
                        row
                        defaultValue="Pay-U"
                        onChange={HandlePay}
                        sx={{ color: "#000000", fontSize: "2rem", borderRadius: "50%" }}
                      >
                        <MDBox
                          sx={{
                            minHeight: "100%",
                            minWidth: "90%",
                            border: "1px solid rgba(0, 0, 0, 0.12)",
                            borderColor: "text.primary",
                            borderRadius: 1,
                          }}
                        >
                          <FormControlLabel
                            value="Pay-U"
                            control={<CustomRadio sx={{ ml: 2 }} />}
                            label="Pay-U"
                            sx={{ borderRadius: "50%" }}
                            onClick={handlePayU}
                          />
                        </MDBox>
                        <MDBox
                          sx={{
                            minHeight: "100%",
                            minWidth: "90%",
                            border: "1px solid rgba(0, 0, 0, 0.12)",
                            borderColor: "text.primary",
                            borderRadius: 1,
                            mt: "1rem",
                          }}
                        >
                          <FormControlLabel
                            value="premiumfinancing"
                            control={<CustomRadio sx={{ ml: 2 }} />}
                            label={
                              <>
                                <span>PREMIUM FINANCING</span>
                                <ExpandMoreIcon sx={{ ml: "1rem" }} />
                              </>
                            }
                            onClick={handleClick1}
                            sx={{ borderRadius: "50%" }}
                          />

                          <Popover
                            open={open1}
                            anchorEl={anchorE2}
                            onClose={handleClose1}
                            anchorOrigin={{
                              vertical: "bottom",

                              horizontal: "left",
                            }}
                            PaperProps={{
                              style: { width: "265px" },
                            }}
                            sx={{
                              ml: "10px",
                              mt: 0.6,
                            }}
                          >
                            <MenuItem onClick={handleFinsal}>Premium Financing 1 </MenuItem>

                            <MenuItem onClick={handleFinsal}>Premium Financing 2</MenuItem>
                          </Popover>
                        </MDBox>
                      </RadioGroup>
                    </ThemeProvider>
                  </Stack>
                  {finSal === true && (
                    <MDBox ml={-2}>
                      <Stack flex="row" flexDirection="row" direction="row">
                        <Grid container mt={8} ml={-20}>
                          <Stack direction="row" flexDirection="row">
                            <div>
                              <TextField
                                required
                                label="First Name"
                                variant="standard"
                                value={Json.ProposerDetails["First Name"]}
                                disabled
                              />
                              <TextField
                                required
                                label="Contact Number"
                                variant="standard"
                                value={Json.QuoteMobileNo}
                                disabled
                              />
                              <TextField
                                required
                                label="Address1"
                                variant="standard"
                                value={Json.ProposerDetails.PermanentAddress.AddressLine1}
                                disabled
                              />
                            </div>
                          </Stack>
                        </Grid>
                        <Grid container mt={8} ml={1}>
                          <Stack direction="row" flexDirection="row">
                            <div>
                              <TextField
                                required
                                label="Last Name"
                                variant="standard"
                                value={Json.ProposerDetails["Last Name"]}
                                disabled
                              />
                              <TextField
                                required
                                label="Email Id"
                                variant="standard"
                                value={Json.QuoteEmail}
                                disabled
                              />
                              <TextField
                                label="Address2"
                                variant="standard"
                                value={Json.ProposerDetails.PermanentAddress.AddressLine2}
                                disabled
                              />
                            </div>
                          </Stack>
                        </Grid>
                        <Grid container mt={8} ml={1}>
                          <Stack direction="row" flexDirection="row">
                            <div>
                              <TextField
                                label="Gender"
                                variant="standard"
                                value={Json.ProposerDetails.Gender}
                                disabled
                              />
                              <TextField
                                label="PAN Number"
                                variant="standard"
                                name="PAN"
                                sx={{ mt: "2.8rem" }}
                                onChange={handlepanchange}
                                value={Json.ProposerDetails.PanNo}
                              />
                            </div>
                          </Stack>
                        </Grid>
                      </Stack>
                    </MDBox>
                  )}
                  {finSal && (
                    <Grid container ml={-24} width="173%" mt={3}>
                      <Table aria-label="simple table">
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold", width: "32%" }}>
                            Document Name
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", width: "37%" }}>
                            Document Remarks
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
                                options={Documen}
                                value={{ mValue: x.DocType }}
                                getOptionLabel={(option) => option.mValue}
                                onChange={(e, value) => handleDocType(e, value, i)}
                                renderInput={(params) => (
                                  <MDInput
                                    {...params}
                                    label="Select"
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
                                <MDButton color="primary" variant="outlined" component="label">
                                  Choose File
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
                          </TableBody>
                        ))}
                      </Table>
                    </Grid>
                  )}

                  <MDBox mt={2}>
                    {PayU === true && (
                      <Grid item>
                        <MDButton
                          color="primary"
                          // textAlign="right"
                          fullwidth
                          alignItems="center"
                          sx={{ ml: "1rem" }}
                          onClick={handleformData}
                        >
                          Make Payment
                        </MDButton>
                      </Grid>
                    )}
                    {finSal && (
                      <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <MDButton
                            color="primary"
                            // textAlign="right"
                            fullwidth
                            alignItems="center"
                            sx={{ ml: "1rem" }}
                            onClick={handelfinsalsubmit}
                          >
                            Submit
                          </MDButton>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <MDButton
                            color="primary"
                            // textAlign="right"
                            fullwidth
                            alignItems="center"
                            sx={{ ml: "1rem" }}
                          >
                            Clear
                          </MDButton>
                        </Grid>
                      </Grid>
                    )}
                  </MDBox>
                </MDBox>
              )}
              {payLinkFlag === true && (
                <MDBox display="flex" flexDirection="column" spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <MDInput
                        required
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="Email"
                        sx={{ width: 250 }}
                        onChange={handleEmailChange}
                        value={email}
                        onBlur={handleFieldValidation}
                      />
                      {email === "" && errorFlag ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px", ml: "1rem" }}>
                          Please fill the required fields
                        </MDTypography>
                      ) : null}
                      {emailflag && email !== "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill valid Email Id
                        </MDTypography>
                      ) : null}
                      {/* </Grid>
                    <Grid item> */}
                      <br />
                      <br />
                      <MDButton
                        color="primary"
                        // textAlign="right"
                        fullwidth
                        alignItems="center"
                        onClick={handlePaymentLink}
                      >
                        Send Link
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              )}
              {SinglePolicySinglePayment && (
                <Grid container ml={-8} width="150%">
                  <Table aria-label="simple table">
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>Select Receipt</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Receipt Number</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Receipt Date</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Receipt Amount</TableCell>
                    </TableRow>
                    {ACDaccount.map((row) => (
                      <TableBody>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <CustomCheckbox
                              key={row.Payment_ID}
                              checked={selectedRows.some(
                                (selectedRow) => selectedRow.Payment_ID === row.Payment_ID
                              )}
                              onChange={() => handleCheckboxChange(row.Payment_ID)}
                            />
                          </ThemeProvider>
                        </TableCell>
                        <TableCell>{row.Payment_ID}</TableCell>
                        <TableCell>{row.ChqDate}</TableCell>
                        <TableCell>{row.BalanceAmt}</TableCell>
                      </TableBody>
                    ))}
                  </Table>
                  <Grid container mt={3}>
                    <Grid item xs={12} sm={12} md={6}>
                      <MDButton
                        disabled={checkbutton}
                        color="primary"
                        fullwidth
                        alignItems="center"
                        sx={{ ml: "5rem" }}
                        onClick={handleCDSubmit}
                      >
                        Submit
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <MDButton
                        color="primary"
                        fullwidth
                        alignItems="center"
                        onClick={handleClearButtonClick}
                      >
                        Clear
                      </MDButton>
                    </Grid>
                  </Grid>
                  {CDSubmit && (
                    <Table aria-label="simple table" sx={{ marginTop: "3rem", marginLeft: "1rem" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Receipt Number</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Receipt Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Receipt Amount</TableCell>
                      </TableRow>
                      {selectedRows.map((row1) => (
                        <TableBody>
                          <TableCell>{row1.Payment_ID}</TableCell>
                          <TableCell>{row1.ChqDate}</TableCell>
                          <TableCell>{row1.BalanceAmt}</TableCell>
                        </TableBody>
                      ))}
                    </Table>
                  )}
                  {CDSubmit && (
                    <Grid container mt={3} ml={-2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <MDButton
                          color="primary"
                          // textAlign="right"
                          fullwidth
                          alignItems="center"
                          sx={{ ml: "4rem" }}
                          onClick={handleIssuePolicy}
                        >
                          Issue Policy
                        </MDButton>
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={6}>
                        <MDButton
                          color="primary"
                          // textAlign="right"
                          fullwidth
                          alignItems="center"
                          // sx={{ ml: "1rem" }}
                          onClick={handleModifyProposal}
                        >
                          Modify Proposal
                        </MDButton>
                      </Grid> */}
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} mr={8}> */}
            <Grid item xs={12} sm={12} md={5}>
              <Card sx={{ background: "#E5E4E2", borderRadius: "0px", width: 370, ml: 15, mt: 2 }}>
                <MDBox display="flex" flexDirection="row" sx={{ p: 2 }}>
                  <MDBox display="flex" flexDirection="column" spacing={1}>
                    <Grid item>
                      <MDTypography sx={{ fontSize: "15px" }}>Net&nbsp;Premium</MDTypography>
                    </Grid>
                    <br />
                    <Grid item>
                      <MDTypography sx={{ fontSize: "15px" }}>GST(18%)</MDTypography>
                    </Grid>
                    <br />
                    <Grid item>
                      <MDTypography sx={{ fontWeight: "bold" }}>Total&nbsp;Premium</MDTypography>
                    </Grid>
                  </MDBox>
                  <MDBox display="flex" flexDirection="column" ml={15} spacing={4}>
                    <Grid item>
                      <MDTypography sx={{ fontSize: "15px" }}>
                        {formatter.format(lproposer.PremiumDetails["Net Premium"])}
                      </MDTypography>
                    </Grid>
                    <br />
                    <Grid item>
                      <MDTypography sx={{ fontSize: "15px" }}>
                        {formatter.format(lproposer.PremiumDetails["GST(18%)"])}
                      </MDTypography>
                    </Grid>
                    <br />
                    <Grid item>
                      <MDTypography sx={{ fontWeight: "bold" }}>
                        {formatter.format(lproposer.PremiumDetails["Total with Tax"])}
                      </MDTypography>
                    </Grid>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container justifyContent="space-between" mt={4}>
        <MDButton variant="outlined" onClick={handleBack}>
          Previous
        </MDButton>
        {/* {chequeFlag === true && (
          <MDButton color="primary" onClick={handelsubmitchange} ml={20}>
            Make Payment
          </MDButton>
        )} */}
        {/* {onlinePayFlag === true && ( */}
        {/* {PayU === true && (
          <MDButton color="primary" onClick={handleformData}>
            Make Payment
          </MDButton>
        )} */}
        {/* {payLinkFlag === true && (
          <MDButton color="primary" onClick={handlePaymentLink}>
            Send Link
          </MDButton>
        )} */}
      </Grid>
    </MDBox>
  );
}

export default PaymentDetailss;
