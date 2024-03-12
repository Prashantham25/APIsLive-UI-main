import * as React from "react";
import { useState, useEffect } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
// import MDTypography from "components/MDTypography";
// import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDCheckbox from "components/MDCheckbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { addDays } from "date-fns";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
// import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import swal from "sweetalert";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  Grid,
  Stack,
  CircularProgress,
  Backdrop,
  Card,
  Autocomplete,
  Popover,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { grey } from "@mui/material/colors";
import MDTypography from "components/MDTypography";
import { UploadFiles } from "modules/PolicyLive/views/BLUS/data/index";
import {
  makePayment,
  fetchPaymentURL,
  SavePaymentdetails,
  fetchusername,
  GetACDBalanceAmt,
  GetACDPaymentStatus,
  makeBilldeskPayment,
} from "./data/index";

import Policypayment from "./data/PaymentJson";
import MDButton from "../../../../components/MDButton";
import { DeleteFile } from "../../../BrokerPortal/Pages/MyProfile/data/index";
// import MDTypography from "../../../../components/MDTypography";
import { setBLUSTransactionId, useDataController } from "../../../BrokerPortal/context";
import { GetBGRMasters, sendPaymentMail } from "../Home/data/index";
import { postRequest } from "../../../../core/clients/axiosclient";
import MDDatePicker from "../../../../components/MDDatePicker";
// import { postRequest } from "../../../../core/clients/axiosclient";
// import { fetchPaymentURL } from "./data/index";

// import QuoteData from "../PLLanding/data";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// const [flags, setFlags] = useState({
//   TabFlag: false,
// });

// function PaymentDetails({ PolicyDto, setPolicyDto, ProposerDetails }) {
//   console.log("111", PolicyDto);

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

TabPanel.propTypes = {
  // children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function PaymentDetailsPage({ PolicyDto, setPolicyDto, master, setMaster, handleBack }) {
  // debugger;

  const navigate = useNavigate();
  const masterArray = master;
  const [, dispatch] = useDataController();
  const LPolicyDto = PolicyDto;
  const [billdeskflag, setbilldeskflag] = useState(false);
  const [payUflag, setpayUflag] = useState(true);
  const [paymentSelected, setpaymentSelected] = useState(null);
  // const [ClientFlag, setClientFlag] = useState();
  // console.log("teabflagrelated",TabFlag);
  // const [value, setValue] = React.useState(0);
  const [paymentData, setPaymentData] = useState([]);
  const [transactionID, settransactionID] = useState();
  const [Sucessurl, setSuccessurl] = useState();
  const [Failureurl, setFailureurl] = useState();
  const [paymentdata, setpaymentdata] = useState(Policypayment);
  const [PaymentDto] = useState(PolicyDto);
  const [errorFlag, setErrorFlag] = useState(false);
  const [datetoShow, setDate] = useState({
    InstrumentDate: null,
  });
  const [loadingflag, setloadingflag] = useState(false);
  const [chequeFlag, setChequeFlag] = useState(true);
  const [onlinePayFlag, setOnlinePayFlag] = useState(false);
  const [payLinkFlag, setPayLinkFlag] = useState(false);
  const [CDFlag, setCDFlag] = useState(false);
  const [invalidInsNo, setInvalidInsNo] = useState(false);
  // const [email, setEmail] = useState(PolicyDto.QuoteEmail);
  // const docUpload = [{ label: "PAN Card" }, { label: "Aadhar Card" }];
  const [ACDPayment, setACDPayment] = useState(false);
  // const [checkState, setCheckState] = useState(false);
  const [checkbutton, setCheckButton] = useState(true);
  console.log("setCheckbutton", setCheckButton);
  const [amountCollected, setAmountCollected] = useState(false);
  const [CDSubmit, setCDSubmit] = useState(false);
  const [SinglePolicySinglePayment, setSinglePolicySinglePayment] = useState(false);
  const [PayU, setPayU] = useState(true);
  const [finSal, setFinsal] = useState(false);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const ProposalNumber = LPolicyDto.proposalNumber;
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
  // const themes = useTheme();
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
  const [bodyBilldeskData, setbodyBilldeskData] = useState({
    key: process.env.REACT_APP_BilldeskKey,
    txnid: "",
    amount: LPolicyDto.PremiumDetails["Total with Tax"],
    productinfo: "Bharat Griha Raksha USB",
    firstname: LPolicyDto.ProposerDetails["First Name"],
    // firstname: "Sahana",
    // email: "sahana@inubesolutions.com",
    // phone: "9999999999",
    email: LPolicyDto.ProposerDetails["Email ID"],
    phone: LPolicyDto.ProposerDetails["Mobile Number"],
    surl: "",
    furl: "",
    salt: process.env.REACT_APP_BilldeskSalt,
  });
  function calculateExpDate(policyEndDate) {
    const dateComponents = policyEndDate.split("/");

    // if (dateComponents.length !== 3) {
    //   return "Invalid Date Format";
    // }

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
      mobileNo: PolicyDto.ProposerDetails["Mobile Number"],

      emailId: PolicyDto.ProposerDetails["Email ID"],

      firstName: PolicyDto.ProposerDetails["First Name"],

      lastName: PolicyDto.ProposerDetails["Last Name"],

      pan: PolicyDto.ProposerDetails.PAN,
    },

    external_entity_name: {
      externalEntityNameId: "25",
    },

    external_entity_type: {
      externalEntityTypeId: "1",
    },

    otherPremium: PolicyDto.PremiumDetails["Total with Tax"],

    thirdPartyPremium: "0",

    policyRefNumber: PolicyDto["Quotation No"],

    policyExpiryDate: calculateExpDate(PolicyDto.ProposerDetails.PolicyEndDate),
    // policyExpiryDate: "201696040211000",
    clientId: "2034",

    clientKey: "473057ae265eff409fd75acbc9c12b55543e0dd292931b2d9d1b0e7bedc594ae",

    version: "1.0.0",

    roles: "executive",

    loggedInUniqueIdentifierId: "18",

    loggedInUserId: "463",
  });

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
        // setPolicyDto((prevState) => ({ ...prevState, DocumentDetails: docUpload }));
        setPolicyDto((prevState) => ({
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
  };

  const handleClearButtonClick = () => {
    setSelectedRows([]);
    setCheckButton(true);
    setSelectedRowSum(0);
    setCDSubmit(false);
    setAmountCollected(false);
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
    if (
      selectedRowSum >= PolicyDto.PremiumDetails["Total with Tax"] &&
      !selectedRows.some((row) => row.Payment_ID === rowId)
    ) {
      swal({
        icon: "warning",

        text: "Sufficient Amount is Present",
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

  const open1 = Boolean(anchorE2);
  const { BankName } = GetBGRMasters().bgrMaster.Masters;

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
    setPayU(false);
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

  const handlepaymentchange = (e) => {
    console.log("Paymentselected", paymentSelected);
    if (e.target.value === "PAY-U") {
      setpayUflag(true);
      // setPayU(true);
      setbilldeskflag(false);
      setpaymentSelected(e.target.value);
    } else if (e.target.value === "BillDesk") {
      setbilldeskflag(true);
      // setPayU(true);
      setpayUflag(false);
      // setFinsal(false);
      setpaymentSelected(e.target.value);
    }
  };

  const handleCDSubmit = () => {
    if (selectedRowSum < PolicyDto.PremiumDetails["Total with Tax"]) {
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
      amount: PolicyDto.PremiumDetails["Total with Tax"],
      usr: "a",
      props: ProposalNumber,
      ky: "oOb?eo%vsP7539",
    };
    console.log("obj1", obj1);
    const result = await GetACDPaymentStatus(obj1);
    console.log("result111", result);
    if (result.status === 200) {
      const { PaymentDetails } = PaymentDto;
      PaymentDetails.ChequeAmount = PolicyDto.PremiumDetails["Total with Tax"];
      PaymentDetails.transactionNo = PolicyDto.TransactionID;
      PaymentDetails.paymentSource = "EB";
      setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
      console.log("Payment", PolicyDto);

      const Paymentdetls1 = Policypayment;
      console.log("Paymentdetls1", Paymentdetls1);
      Paymentdetls1.policyNo = "";
      Paymentdetls1.proposalNo = ProposalNumber;
      Paymentdetls1.paymentDetailsDTO.ChequeAmount = PolicyDto.PremiumDetails["Total with Tax"];
      Paymentdetls1.paymentDetailsDTO.InstrumentDate = selectedRowData1.ChqDate;
      Paymentdetls1.paymentDetailsDTO.InstrumentNo = selectedRowData1.Payment_ID;
      Paymentdetls1.paymentDetailsDTO.paymentSource = "EB";
      setpaymentdata((prev) => ({ ...prev, ...Paymentdetls1 }));
      SavePaymentdetails(Paymentdetls1).then(async (result1) => {
        console.log("Payment saved", result1);

        if (result1.data.status === 1) {
          const jsonValue = {
            communicationId: PolicyDto.SubProduct === "BLUS" ? 123 : 125,
            keyType: PolicyDto.SubProduct === "BLUS" ? "BLUSPolicy" : "BSUSPolicy",
            key: result1.data.id,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: PolicyDto.QuoteEmail,
              },
            ],
          };
          await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
          navigate("/BLUS/PaymentSuccess");
        } else {
          navigate("/BLUS/PaymentFailure");
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
  const min = `${formatPropDate(new Date())}`;
  const [bodyData, setbodyData] = useState({
    // key: "7Y4RPX",
    key: process.env.REACT_APP_PayuKey,
    // txnid: "C05/12/202252",
    txnid: "",
    amount: PolicyDto.PremiumDetails["Total with Tax"],
    // amount: "125",
    productinfo: "Bharat Laghu Udhyam Surakha–USLU",
    firstname: PolicyDto.ProposerDetails["First Name"],
    // firstname: "Sahana",
    // email: "sahana@yahoo.com",
    // phone: "9999999999",
    email: PolicyDto.ProposerDetails.EmailId,
    phone: PolicyDto.ProposerDetails.MobileNo,
    surl: "https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0077/00/000",
    furl: "/paymentfailure",
    // salt: "hl8aISlY",
    salt: process.env.REACT_APP_PayuSalt,
    // hash: "",
  });

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   setTabFlag(true);
  //   // setClientFlag(true);
  // };

  const handlemychange = (e) => {
    // setClientFlag(true);
    const { PaymentDetails } = PolicyDto;
    if (e.target.name === "Client Payment") {
      // setClientFlag(true);
      setACDPayment(false);
      setCDFlag(false);
    } else if (e.target.name === "Agent Payment") {
      // setClientFlag(false);
      setACDPayment(true);
    }
    PaymentDetails.paymentType = e.target.name;
    setPolicyDto((prevState) => ({
      ...prevState,
      PaymentDetails,
    }));
  };

  // useEffect(() => {
  //   console.log(bodyData, "bodydata");
  //   console.log("Inside payment");
  //   makePayment(bodyData);
  // }, [PolicyDto.TransactionID]);

  const handlePayment = (bodyData1) => {
    if (bodyData1.txnid !== "") {
      console.log("Inside payment", bodyData1);
      makePayment(bodyData1);
    }
  };

  const handleTxnIDgen = () => {
    // const [transactionID, settransactionID] = useState();
    fetchPaymentURL(
      910,
      // "0782/0000/1246/00/000",
      // 125
      LPolicyDto.proposalNumber,
      LPolicyDto.PremiumDetails["Total with Tax"]
    ).then((results) => {
      const data = results;
      setPaymentData(data);
      console.log("InGetpayment1", data);
      setBLUSTransactionId(dispatch, results.paymentRefNo);
      settransactionID(results.transactionID);
      setSuccessurl(results.surl);
      setPolicyDto((prevState) => ({
        ...prevState,
        TransactionID: results.transactionID,
      }));
      setFailureurl(results.furl);
      console.log("pgggg", PolicyDto);
      console.log("payment coming", paymentData);
    });
    console.log("pgggg1", PolicyDto);
    console.log("Transaction", transactionID);
  };
  const handlePayment1 = (bodyBilldeskData1) => {
    if (bodyBilldeskData1.txnid !== "") {
      console.log(bodyBilldeskData1);
      makeBilldeskPayment(bodyBilldeskData1);
    }
  };
  const handleformData = () => {
    console.log("flags", payUflag);
    if (payUflag === true) {
      if (transactionID !== "") {
        bodyData.txnid = transactionID;
        bodyData.surl = Sucessurl;
        bodyData.furl = Failureurl;
        setbodyData(bodyData);
        console.log("tran", transactionID);

        console.log("bodydata", bodyData);
        handlePayment(bodyData);
      }
    } else if (billdeskflag === true) {
      if (transactionID !== "") {
        bodyBilldeskData.txnid = transactionID;
        bodyBilldeskData.surl = Sucessurl;
        bodyBilldeskData.furl = Failureurl;
        setbodyBilldeskData(bodyBilldeskData);
        console.log("tran", transactionID);
        console.log("bodydata", bodyBilldeskData);
        handlePayment1(bodyBilldeskData);
      }
    }
  };

  const handelsubmitchange = () => {
    if (invalidInsNo === false) {
      if (
        PaymentDto.PaymentDetails.InstrumentNo.trim() === "" ||
        PaymentDto.PaymentDetails.InstrumentDate === "" ||
        Object.values(masterArray.BankName || {}).every((x) => x === null || x === "")
      ) {
        setErrorFlag(true);
      } else {
        setErrorFlag(false);
        console.log("clicked");
        const { PaymentDetails } = PaymentDto;
        PaymentDetails.ChequeAmount = PolicyDto.PremiumDetails["Total with Tax"];
        PaymentDetails.transactionNo = PolicyDto.TransactionID;
        PaymentDetails.paymentSource = "Cheque";
        setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
        console.log("Payment", PolicyDto);
        setloadingflag(true);
        const paydetail = paymentdata;
        paydetail.policyNo = "";
        paydetail.proposalNo = PolicyDto.proposalNumber;
        paydetail.paymentDetailsDTO.ChequeAmount = PolicyDto.PremiumDetails["Total with Tax"];
        paydetail.paymentDetailsDTO.transactionNo = PolicyDto.TransactionID;
        paydetail.paymentDetailsDTO.paymentSource = "CHEQUE";
        setpaymentdata((prev) => ({ ...prev, ...paydetail }));
        SavePaymentdetails(paydetail).then(async (result1) => {
          console.log("Payment saved", result1);

          if (result1.data.status === 1) {
            const jsonValue = {
              communicationId: PolicyDto.SubProduct === "BLUS" ? 123 : 125,
              keyType: PolicyDto.SubProduct === "BLUS" ? "BLUSPolicy" : "BSUSPolicy",
              key: result1.data.id,
              stakeHolderDetails: [
                {
                  communicationType: "Email",
                  stakeholderCode: "CUS",
                  communicationValue: PolicyDto.QuoteEmail,
                },
              ],
            };
            await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
            navigate("/BLUS/PaymentSuccess");
            setloadingflag(false);
          } else {
            navigate("/BLUS/PaymentFailure");
          }
        });
      }
    } else {
      setInvalidInsNo(true);
    }
  };

  const handelfinsalsubmit = async () => {
    console.log("doc", PolicyDto.DocumentDetails);
    if (!PolicyDto.DocumentDetails.some((x) => x.DocType === "Pan Copy")) {
      swal({
        icon: "error",
        text: "Please Upload PanCard",
      });
    } else {
      const response = await postRequest(
        "PaymentExtension/RedirectToPF?ICProductName=PremiumFinancing",
        finsalData
      );
      console.log("date", PolicyDto.ProposerDetails.PolicyEndDate);
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

  const handlepagechange = (e) => {
    console.log("yyyy", PaymentDto);
    const numReg = /^[0-9]*$/;
    if (numReg.test(e.target.value) || e.target.value === "") {
      const { PaymentDetails } = PaymentDto;
      const { paymentDetailsDTO } = paymentdata;
      PaymentDetails[e.target.name] = e.target.value;
      paymentDetailsDTO[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
      setpaymentdata((prevState) => ({ ...prevState, paymentDetailsDTO }));
    }
  };

  const handlepanchange = (e) => {
    const { ProposerDetails } = PaymentDto;
    ProposerDetails.PAN = e.target.value;
    finsalData.user.pan = e.target.value;
    // finsalData.policyExpiryDate = calculateExpDate(PolicyDto.ProposerDetails.PolicyEndDate);
    setFinsalData(finsalData);
    setPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  };

  const handleInstrumentNoVAlidation = (e) => {
    const numReg = /^[0-9]{6}$/;
    if (!numReg.test(e.target.value)) {
      setInvalidInsNo(true);
    } else {
      setInvalidInsNo(false);
    }
  };

  const handleDateChange = (value1, label, type) => {
    console.log("value", value1);
    datetoShow.InstrumentDate = value1;
    setDate((prevState) => ({ ...prevState, InstrumentDate: value1 }));
    const { PaymentDetails } = PaymentDto;
    const { paymentDetailsDTO } = paymentdata;
    PaymentDetails[type] = formatPropDate(value1);
    PaymentDetails.InstrumentDate = formatPropDate(value1);
    paymentDetailsDTO.InstrumentDate = formatPropDate(value1);
    paymentDetailsDTO[type] = formatPropDate(value1);

    setPolicyDto((prevState) => ({
      ...prevState,
      PaymentDetails,
    }));

    setpaymentdata((prevState) => ({ ...prevState, paymentDetailsDTO }));
  };

  useEffect(() => {
    handleTxnIDgen();
  }, []);

  useEffect(() => {
    setPolicyDto((prevState) => ({
      ...prevState,
      ...PolicyDto,
    }));
  }, [bodyData]);

  const handleSetValue = (e, value) => {
    const { PaymentDetails } = PaymentDto;
    const { paymentDetailsDTO } = paymentdata;
    masterArray.BankName = value;
    PaymentDetails.BankName = value.mValue;
    paymentDetailsDTO.BankName = value.mValue;
    setMaster((prev) => ({ ...prev, masterArray }));
    setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
    setpaymentdata((prevState) => ({ ...prevState, paymentDetailsDTO }));
  };

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

  const handleEmailChange = (e) => {
    LPolicyDto.QuoteEmail = e.target.value;
    setPolicyDto({ ...LPolicyDto });
  };
  const handlePaymentLink = async () => {
    // console.log("pppp", ProposalData.proposalNumber);
    const mail = await sendPaymentMail(PolicyDto.proposalNumber, PolicyDto.QuoteEmail);
    // const mail = await sendMail(proposalNumber, "sahana@inubesolution.com");
    console.log("mail", mail);
    if (mail.data.status === 1) {
      swal({
        text: `Payment Link
        Shared Successfully.`,
        buttons: "Home",
        html: true,
        icon: "success",
      }).then(() => window.open(process.env.REACT_APP_HOMEURL, "_self"));
    }
  };

  return (
    <MDBox>
      <Backdrop
        sx={{ color: "primary", zIndex: (themes) => themes.zIndex.drawer + 1 }}
        open={loadingflag}
      >
        <CircularProgress />
      </Backdrop>
      <Grid container>
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
                sx={{ color: "#000000", fontSize: "1rem", ml: "20rem", mt: "-1.5rem" }}
                value={LPolicyDto.PaymentDetails.paymentType}
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
                {/* <FormControlLabel
              value="Single Policy-Single Payment"
              control={<Radio />}
              label="Single Policy-Single Payment"Agen
            /> */}
              </RadioGroup>
            </ThemeProvider>
          </FormControl>
        </Stack>
      </Grid>
      {(LPolicyDto.PaymentDetails.paymentType === "Client Payment" ||
        LPolicyDto.PaymentDetails.paymentType === "Agent Payment") && (
        <Grid>
          <MDBox display="flex" flexDirection="column">
            {onlinePayFlag === true && (
              <MDBox mt={1}>
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
              </MDBox>
            )}
            {CDFlag && (
              <MDBox mt={1}>
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
              </MDBox>
            )}
          </MDBox>
          <Grid container sx={{ marginTop: "30px" }}>
            <Grid item xs={12} sm={12} md={3}>
              <MDBox display="flex" flexDirection="column">
                <MDBox mt={1}>
                  <MDButton
                    sx={{ width: 170 }}
                    variant={chequeFlag ? "contained" : "outlined"}
                    color={chequeFlag ? "primary" : "primary"}
                    onClick={handleChequeClick}
                  >
                    Cheque
                  </MDButton>
                </MDBox>
                <MDBox mt={1}>
                  <MDButton
                    sx={{ width: 170 }}
                    variant={onlinePayFlag ? "contained" : "outlined"}
                    color={onlinePayFlag ? "primary" : "primary"}
                    onClick={handleOnlinePayment}
                  >
                    Online Payment
                  </MDButton>
                </MDBox>
                <MDBox mt={1}>
                  <MDButton
                    variant={payLinkFlag ? "contained" : "outlined"}
                    color={payLinkFlag ? "primary" : "primary"}
                    // disabled
                    onClick={handleSendPaymentLink}
                  >
                    Send Payment Link
                  </MDButton>
                </MDBox>
                {ACDPayment || LPolicyDto.PaymentDetails.paymentType === "Agent Payment" ? (
                  <>
                    <MDBox mt={1}>
                      <MDButton
                        sx={{ width: 170 }}
                        variant={CDFlag ? "contained" : "outlined"}
                        color={CDFlag ? "primary" : "primary"}
                        onClick={handleCDAccount}
                      >
                        CD Account
                      </MDButton>
                    </MDBox>
                    {amountCollected && (
                      <MDBox mt={20}>
                        <MDBox mt={20}>
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
                ) : null}
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              {chequeFlag === true && (
                <MDBox display="flex" flexDirection="column">
                  <Grid container spacing={2}>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Cheque Amount"
                        variant="outlined"
                        fullWidth
                        // sx={{ input: { fontWeight: "bold" } }}
                        value={PolicyDto.PremiumDetails["Total with Tax"]}
                        disabled
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Instrument No."
                        variant="outlined"
                        name="InstrumentNo"
                        onChange={handlepagechange}
                        onBlur={handleInstrumentNoVAlidation}
                        inputProps={{ maxLength: 6 }}
                        sx={{ width: "100%" }}
                        fullWidth
                        value={PolicyDto.PaymentDetails.InstrumentNo}
                      />
                      {PolicyDto.PaymentDetails.InstrumentNo === "" && errorFlag ? (
                        <Typography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the required fields
                        </Typography>
                      ) : null}
                      {PolicyDto.PaymentDetails.InstrumentNo !== "" && invalidInsNo ? (
                        <Typography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill valid 6 digit instrument Number
                        </Typography>
                      ) : null}
                    </Grid>
                    <Grid item>
                      <MDDatePicker
                        label="Instrument Date"
                        input={{
                          label: `Instrument Date`,
                          value: LPolicyDto.PaymentDetails.InstrumentDate,
                          sx: { width: "76%" },
                        }}
                        options={{
                          altFormat: "d-m-Y",
                          dateFormat: "d-m-Y",
                          altInput: true,
                          minDate: min,
                          maxDate: addDays(new Date(), 60),
                        }}
                        type="login"
                        id="InstrumentDate"
                        value={datetoShow.InstrumentDate}
                        onChange={(date) =>
                          handleDateChange(date, "Instrument Date", "InstrumentDate")
                        }
                        disableFuture
                      />
                    </Grid>
                    <MDBox sx={{ width: "232px", marginTop: "17px", marginLeft: "16px" }}>
                      <Autocomplete
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px!important",
                          },
                        }}
                        disableClearable
                        id="Bank Name"
                        name="BankName"
                        options={BankName}
                        onChange={handleSetValue}
                        value={master.BankName}
                        getOptionLabel={(option) => option.mValue}
                        renderInput={(params) => (
                          <MDInput
                            fullWidth
                            {...params}
                            sx={{
                              width: "82%",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            label="Bank Name"
                            required
                            error={
                              Object.values(masterArray.BankName || {}).every(
                                (x) => x === null || x === ""
                              )
                                ? errorFlag
                                : null
                            }
                          />
                        )}
                      />
                      {Object.values(masterArray.BankName || {}).every(
                        (x) => x === null || x === ""
                      ) && errorFlag ? (
                        <Typography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the required fields
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
                        onChange={handlepaymentchange}
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
                            // checked={selectedValue === "BillDesk"}
                            value="BillDesk"
                            control={<CustomRadio sx={{ ml: 2 }} />}
                            label="BillDesk"
                            name="BillDesk"
                            sx={{ borderRadius: "50%" }}
                            // checked={paymentSelected === "BillDesk"}
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
                              style: { width: "260px" },
                            }}
                            sx={{
                              ml: "10px",
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
                                value={PolicyDto.ProposerDetails["First Name"]}
                                disabled
                              />
                              <TextField
                                required
                                label="Contact Number"
                                variant="standard"
                                value={PolicyDto.ProposerDetails["Mobile Number"]}
                                disabled
                              />
                              <TextField
                                required
                                label="Address1"
                                variant="standard"
                                value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine1}
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
                                value={PolicyDto.ProposerDetails["Last Name"]}
                                disabled
                              />
                              <TextField
                                required
                                label="Email Id"
                                variant="standard"
                                value={PolicyDto.ProposerDetails["Email ID"]}
                                disabled
                              />
                              <TextField
                                label="Address2"
                                variant="standard"
                                value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine2}
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
                                value={PolicyDto.ProposerDetails.Gender}
                                disabled
                              />
                              <TextField
                                label="PAN Number"
                                variant="standard"
                                name="PAN"
                                sx={{ mt: "2.8rem" }}
                                onChange={handlepanchange}
                                value={PolicyDto.ProposerDetails.PAN}
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
                    {/* {finSal && (
                      <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                          <MDButton
                            color="primary"
                            // textAlign="right"
                            fullwidth
                            alignItems="center"
                            sx={{ ml: "1rem" }}
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
              )} */}
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
                      {/* <TextField
                        width="1000px"
                        
                        required
                        sx={redAsterisk,width:50}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="Email"
                        onChange={handleEmailChange}
                        value={email} */}
                      {/* /> */}
                      <MDInput
                        label="Email"
                        sx={{ width: 260 }}
                        value={PolicyDto.QuoteEmail}
                        onChange={handleEmailChange}
                        onBlur={handleEmailChange}
                        // error={masters?.EmailVal}
                        // helperText={masters?.EmailVal && "Please Enter Valid Email"}
                      />
                    </Grid>

                    <Grid item>
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
                  {/* <TextField
                  required
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="BankName"
                /> */}
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
                          <MDCheckbox
                            key={row.Payment_ID}
                            checked={selectedRows.some(
                              (selectedRow) => selectedRow.Payment_ID === row.Payment_ID
                            )}
                            onChange={() => handleCheckboxChange(row.Payment_ID)}
                          />
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
            <Grid item xs={12} sm={12} md={6}>
              <Card sx={{ background: "#E5E4E2", borderRadius: "0px", ml: "7rem" }}>
                <Grid container p={3} spacing={1}>
                  <Grid item xs={6} sm={6} md={6}>
                    Customer&nbsp;Name
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    {" "}
                    {PolicyDto.CustomerType === "Individual"
                      ? master.Salutation.mValue +
                        PolicyDto.ProposerDetails["First Name"] +
                        ["  "] +
                        PolicyDto.ProposerDetails["Last Name"]
                      : PolicyDto.ProposerDetails["First Name"]}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    Policy&nbsp;Start&nbsp;Date
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    {PolicyDto.ProposerDetails.PolicyStartDate}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    Policy&nbsp;End&nbsp;Date
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    {PolicyDto.ProposerDetails.PolicyEndDate}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    Total&nbsp;Premium
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    {" "}
                    {formatter.format(PolicyDto.PremiumDetails["Total with Tax"])}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container justifyContent="flex-start" mb={2}>
        <MDButton color="primary" variant="contained" onClick={handleBack}>
          Back
        </MDButton>
      </Grid>
    </MDBox>
    // <Grid container spacing={2}>
    //   <Backdrop
    //     sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //     open={loadingflag}
    //   >
    //     <CircularProgress />
    //   </Backdrop>
    //   <Grid container>
    //     <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
    //       <FormControl>
    //         <FormLabel
    //           id="demo-row-radio-buttons-group-label"
    //           alignItems="center"
    //           sx={{ color: "#000000", fontSize: "1rem", ml: "10rem", mt: "1.50rem" }}
    //         >
    //           Payment Type*
    //         </FormLabel>
    //         <RadioGroup
    //           row
    //           aria-labelledby="demo-row-radio-buttons-group-label"
    //           name="row-radio-buttons-group"
    //           sx={{ color: "#000000", fontSize: "1rem", ml: "20rem" }}
    //         >
    //           <FormControlLabel
    //             value="Client Payment"
    //             control={<Radio />}
    //             // sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    //             label="Client Payment"
    //             onClick={handlemychange}
    //           />
    //           <FormControlLabel
    //             value="Agent Payment"
    //             control={<Radio />}
    //             label="Agent Payment"
    //             onClick={handlemychange}
    //           />
    //           {/* <FormControlLabel
    //             value="Single Policy-Single Payment"
    //             control={<Radio />}
    //             label="Single Policy-Single Payment"
    //           /> */}
    //         </RadioGroup>
    //       </FormControl>
    //     </Stack>
    //   </Grid>
    //   {ClientFlag === true ? (
    //     <Grid container sx={{ height: "40%" }}>
    //       <MDBox
    //         pt={3}
    //         // height="30rem"
    //         sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: "30%" }}
    //       >
    //         <Grid sx={{ flexGrow: 1 }} container spacing={1}>
    //           <Grid container sx={{ border: "2px solid black", display: "inline-flex" }}>
    //             <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={0.75}>
    //               {/* <Grid item lg={2}> */}
    //               <Box gridColumn="span 3">
    //                 <Tabs
    //                   orientation="vertical"
    //                   variant="scrollable"
    //                   value={value}
    //                   onChange={handleChange}
    //                   aria-label="Vertical tabs"
    //                   sx={{ borderRight: 1, borderColor: "divider" }}
    //                 >
    //                   <Tab label="CHEQUE" {...a11yProps(0)} />
    //                   {/* <Divider /> */}
    //                   <Tab label="Online Payment" {...a11yProps(1)} />
    //                   {/* <Divider /> */}
    //                   <Tab label="Online Send PaymentLink" disabled {...a11yProps(2)} />
    //                 </Tabs>
    //                 {/* </Grid> */}
    //               </Box>

    //               {/* <Grid item lg={8}> */}
    //               <Box
    //                 gridColumn="span 6"
    //                 sx={{ border: 1, borderColor: "divider", bgcolor: "#f8f9fa" }}
    //               >
    //                 <TabPanel value={value} index={0}>
    //                   {TabFlag === true ? (
    //                     <MDBox sx={{ bgcolor: "background.paper" }}>
    //                       {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
    //                       <Stack
    //                         direction="column"
    //                         justifyContent="center"
    //                         alignItems="center"
    //                         spacing={1}
    //                         sx={{ bgcolor: "#f8f9fa" }}
    //                       >
    //                         <TextField
    //                           id="standard-basic"
    //                           label="Cheque Amount"
    //                           variant="standard"
    //                           // sx={{ input: { fontWeight: "bold" } }}
    //                           value={PolicyDto.PremiumDetails["Total with Tax"]}
    //                         />
    //                         <TextField
    //                           id="standard-basic"
    //                           label="Instrument No."
    //                           variant="standard"
    //                           name="InstrumentNo"
    //                           inputProps={{
    //                             maxLength: 6,
    //                           }}
    //                           onChange={handlepagechange}
    //                           value={PolicyDto.PaymentDetails.InstrumentNo}
    //                         />
    //                         {PolicyDto.PaymentDetails.InstrumentNo === "" && errorFlag ? (
    //                           <Typography sx={{ color: "red", fontSize: "10px" }}>
    //                             Please fill the required fields
    //                           </Typography>
    //                         ) : null}
    //                         <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
    //                           <LocalizationProvider dateAdapter={AdapterDateFns}>
    //                             <DesktopDatePicker
    //                               label="Instrument Date"
    //                               inputFormat="dd/MM/yyyy"
    //                               type="login"
    //                               id="InstrumentDate"
    //                               value={datetoShow.InstrumentDate}
    //                               onChange={(date) =>
    //                                 handleDateChange(date, "Instrument Date", "InstrumentDate")
    //                               }
    //                               renderInput={(params) => (
    //                                 <MDInput {...params} sx={{ width: "100%" }} />
    //                               )}
    //                             />
    //                           </LocalizationProvider>
    //                         </Grid>
    //                         <TextField
    //                           id="standard-basic"
    //                           label="Bank Name"
    //                           variant="standard"
    //                           name="BankName"
    //                           onChange={handlepagechange}
    //                           value={PolicyDto.PaymentDetails.BankName}
    //                         />
    //                         {PolicyDto.PaymentDetails.BankName === "" && errorFlag ? (
    //                           <Typography sx={{ color: "red", fontSize: "10px" }}>
    //                             Please fill the required fields
    //                           </Typography>
    //                         ) : null}
    //                       </Stack>
    //                       <Stack direction="row" mt={2} ml={26} textAlign="center">
    //                         <MDButton
    //                           color="success"
    //                           textAlign="right"
    //                           fullwidth
    //                           alignItems="center"
    //                           onClick={handelsubmitchange}
    //                         >
    //                           Issue Policy
    //                         </MDButton>
    //                       </Stack>
    //                     </MDBox>
    //                   ) : null}
    //                 </TabPanel>
    //                 <TabPanel value={value} index={1}>
    //                   {TabFlag === true ? (
    //                     <MDBox>
    //                       <Stack
    //                         direction="column"
    //                         justifyContent="center"
    //                         alignItems="center"
    //                         spacing={2}
    //                       >
    //                         <MDBox
    //                           sx={{
    //                             height: "50%",
    //                             width: "50%",
    //                             border: "1px solid rgba(0, 0, 0, 0.12)",
    //                             borderColor: "text.primary",
    //                             borderRadius: 1,
    //                           }}
    //                         >
    //                           <RadioGroup
    //                             row
    //                             // onChange={handleTxnIDgen}
    //                             sx={{ color: "#000000", fontSize: "2rem", borderRadius: "50%" }}
    //                           >
    //                             <FormControlLabel
    //                               value="Pay-U"
    //                               control={<Radio />}
    //                               label="Pay-U"
    //                               sx={{ borderRadius: "50%" }}
    //                             />
    //                           </RadioGroup>
    //                         </MDBox>
    //                       </Stack>

    //                       {/* <Stack direction="row" spacing={2} mt={12} ml={75} textAlign="center"> */}
    //                       <Stack direction="row" mt={12} ml={25} textAlign="center">
    //                         <MDButton color="success" textAlign="right" onClick={handleformData}>
    //                           Submit
    //                         </MDButton>
    //                       </Stack>
    //                       {/* <MDButton color="success" textAlign="right" onClick={handleformData}>
    //                         verifyHTML
    //                       </MDButton> */}
    //                     </MDBox>
    //                   ) : null}
    //                 </TabPanel>
    //                 <TabPanel value={value} index={2}>
    //                   <Grid item xs={12} sm={12} md={6} lg={6} xl={8} xxl={8}>
    //                     Online Send Payment
    //                   </Grid>
    //                 </TabPanel>
    //                 {/* </Grid> */}
    //               </Box>

    //               {/* <Grid item lg={2}> */}

    //               {LPolicyDto.CustomerType === "Corporate" ? (
    //                 <Box gridColumn="span 3">
    //                   <TextField
    //                     id="standard-basic"
    //                     label="Customer Name"
    //                     value={PolicyDto.ProposerDetails.FirstName}
    //                     variant="standard"
    //                     sx={{ fontSize: "20px" }}
    //                   />
    //                   <TextField
    //                     id="standard-basic"
    //                     label="Policy Start Date"
    //                     value={PolicyDto.PolicyStartDate}
    //                     variant="standard"
    //                     sx={{ fontSize: "20px" }}
    //                   />
    //                   <TextField
    //                     id="standard-basic"
    //                     label="Policy End Date"
    //                     value={PolicyDto.PolicyEndDate}
    //                     variant="standard"
    //                   />
    //                   <TextField
    //                     id="standard-basic"
    //                     label="Total Sum Insured"
    //                     value={PolicyDto.PremiumDetails["Total with Tax"]}
    //                     variant="standard"
    //                     sx={{ fontSize: "20px" }}
    //                   />
    //                 </Box>
    //               ) : null}
    //               {LPolicyDto.CustomerType === "Individual" ? (
    //                 <Box gridColumn="span 3">
    //                   <TextField
    //                     id="standard-basic"
    //                     label="Customer Name"
    //                     value={
    //                       PolicyDto.ProposerDetails["First Name"] +
    //                       ["  "] +
    //                       PolicyDto.ProposerDetails["Last Name"]
    //                     }
    //                     variant="standard"
    //                     sx={{ fontSize: "20px" }}
    //                   />
    //                   <TextField
    //                     id="standard-basic"
    //                     label="Policy Start Date"
    //                     value={PolicyDto.PolicyStartDate}
    //                     variant="standard"
    //                     sx={{ fontSize: "20px" }}
    //                   />
    //                   <TextField
    //                     id="standard-basic"
    //                     label="Policy End Date"
    //                     value={PolicyDto.PolicyEndDate}
    //                     variant="standard"
    //                   />
    //                   <TextField
    //                     id="standard-basic"
    //                     label="Total Sum Insured"
    //                     value={PolicyDto.PremiumDetails["Total with Tax"]}
    //                     variant="standard"
    //                     sx={{ fontSize: "20px" }}
    //                   />
    //                   {/* </Grid> */}
    //                 </Box>
    //               ) : null}
    //               <Divider orientation="vertical" flexItem />
    //             </Box>
    //           </Grid>
    //         </Grid>
    //       </MDBox>
    //     </Grid>
    //   ) : null}
    // </Grid>
  );
}

export default PaymentDetailsPage;
