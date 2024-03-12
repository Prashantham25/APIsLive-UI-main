import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  CircularProgress,
  Backdrop,
  Card,
  Autocomplete,
  MenuItem,
  Popover,
} from "@mui/material";
import Typography from "@mui/material/Typography";
// import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { subDays } from "date-fns";
// import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import swal from "sweetalert";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import MDCheckbox from "components/MDCheckbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import MDTypography from "components/MDTypography";

import { UploadFiles } from "modules/PolicyLive/views/BLUS/data/index";
import { DeleteFile } from "../../../BrokerPortal/Pages/MyProfile/data/index";
import MDButton from "../../../../components/MDButton";
import MDDatePicker from "../../../../components/MDDatePicker";
import {
  makePayment,
  fetchPaymentURL,
  // handleIssuePolicy,
  SavePaymentdetails,
  fetchusername,
  GetBGRMasters,
  sendPaymentMail,
  makeBilldeskPayment,
  GetACDBalanceAmt,
  GetACDPaymentStatus,
} from "./data/index";
import Policypayment from "./data/PaymentJson";
import { useDataController, setBGRTransactionId } from "../../../BrokerPortal/context";
import { postRequest } from "../../../../core/clients/axiosclient";

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

function PaymentDetailsPage({ PolicyDto, ProposalData, handleBack }) {
  const [, dispatch] = useDataController();
  const { BankName } = GetBGRMasters().bgrMaster.Masters;
  console.log("111", PolicyDto, ProposalData);
  const navigate = useNavigate();
  // const [TabFlag, setTabFlag] = useState(true);
  const [LPolicyDto, setLPolicyDto] = useState(PolicyDto);
  // const [ClientFlag, setClientFlag] = useState();
  // console.log("teabflagrelated",TabFlag);
  // const [value, setValue] = React.useState(0);
  // const masterArray = master;

  const [paymentData, setPaymentData] = useState([]);
  const [transactionID, settransactionID] = useState();
  const [Sucessurl, setSuccessurl] = useState();
  const [Failureurl, setFailureurl] = useState();
  const [paymentdata, setpaymentdata] = useState(Policypayment);
  const [PaymentDto] = useState(LPolicyDto);
  const [errorFlag, setErrorFlag] = useState(false);
  // const [datetoShow, setDate] = useState({
  //   InstrumentDate: null,
  // });
  const [loadingflag, setloadingflag] = useState(false);
  const [chequeFlag, setChequeFlag] = useState(true);
  const [onlinePayFlag, setOnlinePayFlag] = useState(false);
  const [payLinkFlag, setPayLinkFlag] = useState(false);
  const [CDFlag, setCDFlag] = useState(false);
  const [ACDPayment, setACDPayment] = useState(false);
  const [amountCollected, setAmountCollected] = useState(false);
  const [CDSubmit, setCDSubmit] = useState(false);
  const [PayU, setPayU] = useState(false);
  // const [BillDesk, setBillDesk] = useState(false);
  const [SinglePolicySinglePayment, setSinglePolicySinglePayment] = useState(false);
  // const [email, setEmail] = useState(LPolicyDto.QuoteEmail);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [invalidInsNo, setInvalidInsNo] = useState(false);
  const handleChequeClick = () => {
    setPayU(false);
    setChequeFlag(true);
    setOnlinePayFlag(false);
    setPayLinkFlag(false);
    setCDFlag(false);
    setSinglePolicySinglePayment(false);
    setCDSubmit(false);
    setAmountCollected(false);
  };
  const [checkbutton, setCheckButton] = useState(true);
  console.log("setCheckbutton", setCheckButton);
  const [payUflag, setpayUflag] = useState(true);
  const [billdeskflag, setbilldeskflag] = useState(false);
  const [paymentSelected, setpaymentSelected] = useState(null);
  const [finSal, setFinsal] = useState(false);
  const ProposalNumber = ProposalData.proposalNumber;
  console.log("ProposalNumber", ProposalNumber);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log("selectedRows", selectedRows);
  const [selectedRowSum, setSelectedRowSum] = useState(0);
  console.log("selectedRowSum", selectedRowSum);
  const [selectedRowData1, setselectedRowData1] = useState();
  console.log("selectedRowData1", selectedRowData1);
  const Documen = [
    { mID: 1, mValue: "Pan copy" },
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

  function calculateExpDate(policyEndDate) {
    const dateComponents = policyEndDate.split("/");
    const day = parseInt(dateComponents[0], 10);
    const month = parseInt(dateComponents[1], 10) - 1;
    const year = parseInt(dateComponents[2], 10);
    const endDate = new Date(year, month, day);
    const ExpDate = (endDate.getTime() - new Date("1970-01-01T00:00:00Z").getTime()).toString();
    return ExpDate;
  }
  const [finsalData, setFinsalData] = useState({
    serviceName: "BankSelectorService",
    serviceMethod: "saveOrUpdateBankSelector",
    user: {
      mobileNo: LPolicyDto.ProposerDetails["Mobile Number"],
      emailId: LPolicyDto.ProposerDetails["Email ID"],
      firstName: LPolicyDto.ProposerDetails["First Name"],
      lastName: LPolicyDto.ProposerDetails["Last Name"],
      pan: LPolicyDto.ProposerDetails["PAN Number"],
    },
    external_entity_name: {
      externalEntityNameId: "25",
    },
    external_entity_type: {
      externalEntityTypeId: "1",
    },
    otherPremium: LPolicyDto.PremiumDetails["Total with Tax"],
    thirdPartyPremium: "0",
    policyRefNumber: LPolicyDto["Quotation No"],
    policyExpiryDate: calculateExpDate(LPolicyDto.ProposerDetails["Policy End Date"]),
    // policyExpiryDate: "201696040211000",
    clientId: "2034",
    clientKey: "473057ae265eff409fd75acbc9c12b55543e0dd292931b2d9d1b0e7bedc594ae",
    version: "1.0.0",
    roles: "executive",
    loggedInUniqueIdentifierId: "18",
    loggedInUserId: "463",
  });

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
        // setLPolicyDto((prevState) => ({ ...prevState, DocumentDetails: docUpload }));
        setLPolicyDto((prevState) => ({
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
    setPayU(false);
    setPayLinkFlag(true);
    setOnlinePayFlag(false);
    setChequeFlag(false);
    setCDFlag(false);
    // setBillDesk(false);
    // setPayU(false);
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
    if (selectedRowSum < LPolicyDto.PremiumDetails["Total with Tax"]) {
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
      amount: LPolicyDto.PremiumDetails["Total with Tax"],
      usr: "a",
      props: ProposalNumber,
      ky: "oOb?eo%vsP7539",
    };
    console.log("obj1", obj1);
    const result = await GetACDPaymentStatus(obj1);
    console.log("result111", result);
    if (result.status === 200) {
      const { PaymentDetails } = PaymentDto;
      PaymentDetails.ChequeAmount = LPolicyDto.PremiumDetails["Total with Tax"];
      PaymentDetails.transactionNo = LPolicyDto.TransactionID;
      PaymentDetails.paymentSource = "EB";
      setLPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
      console.log("Payment", LPolicyDto);
      setloadingflag(true);
      const Paymentdetls1 = Policypayment;
      console.log("Paymentdetls1", Paymentdetls1);
      Paymentdetls1.policyNo = "";
      Paymentdetls1.proposalNo = ProposalNumber;
      Paymentdetls1.paymentDetailsDTO.ChequeAmount = LPolicyDto.PremiumDetails["Total with Tax"];
      Paymentdetls1.paymentDetailsDTO.InstrumentDate = selectedRowData1.ChqDate;
      Paymentdetls1.paymentDetailsDTO.InstrumentNo = selectedRowData1.Payment_ID;
      Paymentdetls1.paymentDetailsDTO.paymentSource = "EB";
      setpaymentdata((prev) => ({ ...prev, ...Paymentdetls1 }));
      SavePaymentdetails(Paymentdetls1).then(async (result1) => {
        console.log("Payment saved", result1);
        if (result1.data.status === 1) {
          const jsonValue = {
            communicationId: 107,
            keyType: "BGRPolicy",
            key: result1.data.id,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: LPolicyDto.QuoteEmail,
              },
            ],
          };
          await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
          navigate("/Home/PaymentSuccess");
        } else {
          navigate("/Home/PaymentFailure");
        }
      });
    }
  };

  const handelfinsalsubmit = async () => {
    console.log("doc", LPolicyDto.DocumentDetails);
    // if (!LPolicyDto.DocumentDetails.some((x) => x.DocType === "Pan copy")) {
    //   swal({
    //     icon: "error",
    //     text: "Please Upload PanCard",
    //   });
    // } else {
    const response = await postRequest(
      "PaymentExtension/RedirectToPF?ICProductName=PremiumFinancing",
      finsalData
    );
    console.log("date", LPolicyDto.ProposerDetails.PolicyEndDate);
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
    // }
  };

  const handlepanchange = (e) => {
    const { ProposerDetails } = PaymentDto;
    ProposerDetails["PAN Number"] = e.target.value;
    finsalData.user.pan = e.target.value;
    // finsalData.policyExpiryDate = calculateExpDate(LPolicyDto.ProposerDetails.PolicyEndDate);
    setFinsalData(finsalData);
    setLPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  };

  const handleEmailChange = (e) => {
    LPolicyDto.QuoteEmail = e.target.value;
    setLPolicyDto({ ...LPolicyDto });
  };

  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}/${propformat(
      propdate.getMonth() + 1
    )}/${propdate.getFullYear()}`;
  };
  const [bodyData, setbodyData] = useState({
    // key: "7Y4RPX",
    key: process.env.REACT_APP_PayuKey,
    // txnid: "C05/12/202252",
    txnid: "",
    amount: LPolicyDto.PremiumDetails["Total with Tax"],
    // amount: "125",
    productinfo: "Bharat Griha Raksha–USB",
    firstname: LPolicyDto.ProposerDetails["First Name"],
    // firstname: "Sahana",
    // email: "sahana@yahoo.com",
    // phone: "9999999999",
    email: LPolicyDto.ProposerDetails["Email ID"],
    phone: LPolicyDto.ProposerDetails["Mobile Number"],
    surl: `https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=${LPolicyDto?.PaymentDetails?.paymentRefNo}`,
    // surl: "https://localhost:44351/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0242/00/000",
    // surl: paymentData.surl,
    // furl: paymentData.furl,
    furl: "/paymentfailure",
    // salt: "hl8aISlY",
    salt: process.env.REACT_APP_PayuSalt,
    // hash: "",
  });
  // let txnID = "";

  // Building bodydata for Billdesk
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

  const handelsubmitchange = async () => {
    if (invalidInsNo === false) {
      if (
        PaymentDto.PaymentDetails.InstrumentNo === "" ||
        PaymentDto.PaymentDetails.InstrumentDate === ""
      ) {
        setErrorFlag(true);
      } else {
        setErrorFlag(false);
        console.log("clicked");
        const { PaymentDetails } = PaymentDto;
        PaymentDetails.ChequeAmount = LPolicyDto.PremiumDetails["Total with Tax"];
        PaymentDetails.transactionNo = LPolicyDto.TransactionID;
        PaymentDetails.paymentSource = "Cheque";
        setLPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
        console.log("Payment", LPolicyDto);
        setloadingflag(true);
        const paydetail = paymentdata;
        paydetail.policyNo = "";
        paydetail.proposalNo = ProposalData.proposalNumber;
        paydetail.paymentDetailsDTO.ChequeAmount = LPolicyDto.PremiumDetails["Total with Tax"];
        paydetail.paymentDetailsDTO.transactionNo = LPolicyDto.TransactionID;
        paydetail.paymentDetailsDTO.paymentSource = "CHEQUE";
        setpaymentdata((prev) => ({ ...prev, ...paydetail }));
        SavePaymentdetails(paydetail).then(async (result1) => {
          console.log("Payment saved", result1);

          if (result1.data.status === 1) {
            const jsonValue = {
              communicationId: 107,
              keyType: "BGRPolicy",
              key: result1.data.id,
              stakeHolderDetails: [
                {
                  communicationType: "Email",
                  stakeholderCode: "CUS",
                  communicationValue: LPolicyDto.QuoteEmail,
                },
              ],
            };
            await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
            // await postRequest(`Policy/UpdateGCSyncData?PolicyNo=${result1.data.id}`);
            setloadingflag(false);
            navigate(
              `/Home/PaymentSuccess?backURL=&PaymentRefNo=${LPolicyDto?.PaymentDetails?.paymentRefNo}`
            );
          } else {
            setloadingflag(false);
            navigate("/Home/PaymentFailure");
          }
        });
      }
    } else {
      setInvalidInsNo(true);
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
      setLPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
      setpaymentdata((prevState) => ({ ...prevState, paymentDetailsDTO }));
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

  const handleDateChange = (d) => {
    LPolicyDto.PaymentDetails.InstrumentDate = formatPropDate(d);

    setLPolicyDto({ ...PolicyDto });
  };

  // console.log("value", value1);
  // datetoShow.InstrumentDate = value1;
  // setDate((prevState) => ({ ...prevState, InstrumentDate: value1 }));
  // const { PaymentDetails } = PaymentDto;
  // const { paymentDetailsDTO } = paymentdata;
  // PaymentDetails[type] = formatPropDate(value1);
  // PaymentDetails.InstrumentDate = formatPropDate(value1);
  // paymentDetailsDTO.InstrumentDate = formatPropDate(value1);
  // paymentDetailsDTO[type] = formatPropDate(value1);

  // setLPolicyDto((prevState) => ({
  //   ...prevState,
  //   PaymentDetails,
  // }));

  // setpaymentdata((prevState) => ({ ...prevState, paymentDetailsDTO }));

  const handlemychange = (e) => {
    // const { PaymentDetails } = PaymentDto;
    if (e.target.name === "Client Payment") {
      LPolicyDto.PaymentDetails.paymentType = e.target.name;
      // setClientFlag(true);

      setACDPayment(false);
      setCDFlag(false);
      // // setPayU(false);
      setSinglePolicySinglePayment(false);
    } else if (e.target.name === "Agent Payment") {
      LPolicyDto.PaymentDetails.paymentType = e.target.name;
      // setClientFlag(false);
      setACDPayment(true);
      // setPayU(false);
      setAmountCollected(false);
    }

    setLPolicyDto((prevState) => ({
      ...prevState,
      LPolicyDto,
    }));
  };

  // useEffect(() => {
  //   console.log(bodyData, "bodydata");
  //   console.log("Inside payment");
  //   makePayment(bodyData);
  // }, [LPolicyDto.TransactionID]);

  const handlePayment = (bodyData1) => {
    if (bodyData1.txnid !== "") {
      console.log("Inside payment", bodyData1);
      makePayment(bodyData1);
    }
  };

  const handlePayment1 = (bodyBilldeskData1) => {
    if (bodyBilldeskData1.txnid !== "") {
      console.log(bodyBilldeskData1);
      makeBilldeskPayment(bodyBilldeskData1);
    }
  };

  const handleTxnIDgen = () => {
    // const [transactionID, settransactionID] = useState();
    console.log("pppp", ProposalData);
    // const proposalno = QuoteData.quotation.quoteNo.Replace("/", "%2F");
    fetchPaymentURL(
      782,
      ProposalData.proposalNumber,
      LPolicyDto.PremiumDetails["Total with Tax"]
    ).then((results) => {
      const data = results;
      setPaymentData(data);
      // txnID = results.transactionID;
      console.log("InGetpayment", data);
      LPolicyDto.PaymentDetails.paymentRefNo = results.paymentRefNo;
      LPolicyDto.TransactionID = results.transactionID;
      // setPaymentData(data);
      setBGRTransactionId(dispatch, results.paymentRefNo);
      settransactionID(results.transactionID);
      setLPolicyDto((prevState) => ({
        ...prevState,
        LPolicyDto,
      }));

      setSuccessurl(results.surl);
      setFailureurl(results.furl);
      console.log("pgggg", LPolicyDto);
      console.log("payment coming", paymentData);
    });
    console.log("pgggg1", LPolicyDto);
    console.log("Transaction", transactionID);
  };
  // const handleverifyip = () => {
  //   if (bodyData.txnid !== "") {
  //     console.log("bodydata", bodyData);
  //   }
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
  const handleformData = () => {
    // if (transactionID) {
    console.log("flags", payUflag);
    if (payUflag === true) {
      if (transactionID !== "") {
        bodyData.txnid = transactionID;
        bodyData.surl = Sucessurl;
        bodyData.furl = Failureurl;
        setbodyData(bodyData);
        console.log("tran", transactionID);
        // const bodyData = {
        //   key: "7Y4RPX",
        //   // txnid: "C05/12/202252",
        //   txnid: transactionID,
        //   amount: LPolicyDto.PremiumDetails["Total with Tax"],
        //   // amount: "125",
        //   productinfo: "Bharat Griha Raksha–USB",
        //   firstname: LPolicyDto.ProposalData["First Name"],
        //   // firstname: "Sahana",
        //   // email: "sahana@yahoo.com",
        //   // phone: "9999999999",
        //   email: LPolicyDto.ProposalData["Email ID"],
        //   phone: LPolicyDto["Mobile Number"],
        //   surl: "/paymentSuccess",
        //   // surl: paymentData.surl,
        //   // furl: paymentData.furl,
        //   furl: "/paymentfailure",
        //   salt: "hl8aISlY",
        //   // hash: "",
        // };
        console.log("bodydata", bodyData);
        handlePayment(bodyData);
        // handleverifyip(bodyData);
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
        // handleverifyip(bodyBilldeskData);
      }
    }
  };

  useEffect(() => {
    handleTxnIDgen();
  }, []);

  useEffect(() => {
    setLPolicyDto((prevState) => ({
      ...prevState,
      LPolicyDto,
    }));
  }, [bodyData]);

  const handleSetValue = (e, value) => {
    const { PaymentDetails } = PaymentDto;
    const { paymentDetailsDTO } = paymentdata;
    // masterArray.BankName = value;
    PaymentDetails.BankName = value.mValue;
    paymentDetailsDTO.BankName = value.mValue;
    setLPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
    setpaymentdata((prevState) => ({ ...prevState, paymentDetailsDTO }));
  };

  const handlePaymentLink = async () => {
    console.log("pppp", ProposalData);
    // const emailTosend = email === "" ? LPolicyDto.QuoteEmail : email;
    // const mail = await sendPaymentMail(ProposalData.proposalNumber, emailTosend);
    // const mail = await sendMail(proposalNumber, "sahana@inubesolution.com");an
    const mail = await sendPaymentMail(ProposalData.proposalNumber, LPolicyDto.QuoteEmail);
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

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

  // const redAsterisk = {
  //   "& .MuiFormLabel-asterisk": {
  //     color: "red",
  //   },
  // };

  const open1 = Boolean(anchorE2);
  const handleClear = () => {
    setSelectedRows([]);
    setCheckButton(true);
    setSelectedRowSum(0);
    setCDSubmit(false);
    setAmountCollected(false);
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
                label="Single Policy-Single Payment"
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
                <FormControl>
                  <ThemeProvider theme={theme}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      sx={{ ml: "15rem" }}
                      defaultValue="singlepolicysinglepayment"
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
          <Grid container sx={{ marginTop: "10px" }}>
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
            <Grid item xs={12} sm={12} md={2.5} ml={1} mr={1}>
              <MDBox display="flex" flexDirection="column">
                {chequeFlag === true && (
                  <>
                    <Grid item mt={1}>
                      <MDInput
                        id="outlined-basic"
                        label="Cheque Amount"
                        variant="outlined"
                        sx={{
                          width: "78%",
                        }}
                        readOnly
                        value={LPolicyDto.PremiumDetails["Total with Tax"]}
                        // disabled
                      />
                    </Grid>
                    <Grid item mt={1}>
                      <MDInput
                        id="outlined-basic"
                        label="Instrument No."
                        variant="outlined"
                        name="InstrumentNo"
                        onChange={handlepagechange}
                        onBlur={handleInstrumentNoVAlidation}
                        inputProps={{ maxLength: 6 }}
                        sx={{
                          width: "78%",
                        }}
                        fullWidth
                        value={LPolicyDto.PaymentDetails.InstrumentNo}
                      />
                      {LPolicyDto.PaymentDetails.InstrumentNo === "" && errorFlag ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the required fields
                        </MDTypography>
                      ) : null}
                      {LPolicyDto.PaymentDetails.InstrumentNo !== "" && invalidInsNo ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          PPlease enter a 6 digit InstrumentNo
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item mt={1}>
                      <MDDatePicker
                        // label="Instrument Date"
                        input={{
                          label: `Instrument Date`,
                          value: LPolicyDto.PaymentDetails.InstrumentDate,
                          sx: { width: "77%" },
                        }}
                        options={{
                          altFormat: "d-m-Y",
                          dateFormat: "d-m-Y",
                          altInput: true,
                          maxDate: new Date(),
                          minDate: subDays(new Date(), 60),
                        }}
                        // value={ datetoShow.InstrumentDate}
                        id="InstrumentDate"
                        value={LPolicyDto.PaymentDetails.InstrumentDate}
                        onChange={(d) => handleDateChange(d)}
                      />
                    </Grid>
                    <Grid item mt={1}>
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
                        value={{ mValue: LPolicyDto.PaymentDetails.BankName }}
                        getOptionLabel={(option) => option.mValue}
                        renderInput={(params) => (
                          <MDInput
                            fullWidth
                            {...params}
                            sx={{
                              width: "78%",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            label="Bank Name"
                            required
                            error={LPolicyDto.PaymentDetails.BankName === "" ? errorFlag : null}
                          />
                        )}
                      />
                      {LPolicyDto.PaymentDetails.BankName === "" && errorFlag ? (
                        <Typography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the required fields
                        </Typography>
                      ) : null}
                    </Grid>
                    <Grid item mt={1}>
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
                  </>
                )}
                {onlinePayFlag === true && (
                  <MDBox display="flex" flexDirection="column" justifyContent="center" spacing={2}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <ThemeProvider theme={theme}>
                        <RadioGroup
                          row
                          sx={{ color: "#000000", fontSize: "2rem", borderRadius: "50%", ml: 2 }}
                          // defaultValue="Pay-U"
                          onChange={handlepaymentchange}
                        >
                          <MDBox
                            sx={{
                              minHeight: "100%",
                              minWidth: "115%",
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
                              // checked={paymentSelected === "Pay-U"}
                              onClick={handlePayU}
                            />

                            {/* </RadioGroup> */}
                          </MDBox>

                          <MDBox
                            sx={{
                              minHeight: "100%",
                              minWidth: "115%",
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
                              sx={{ borderRadius: "80%" }}
                              // checked={paymentSelected === "BillDesk"}
                            />
                          </MDBox>
                          <MDBox
                            sx={{
                              minHeight: "100%",
                              minWidth: "115%",
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
                      {/* </MDBox> */}
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
                                  value={LPolicyDto.ProposerDetails["First Name"]}
                                  disabled
                                />
                                <TextField
                                  required
                                  label="Contact Number"
                                  variant="standard"
                                  value={LPolicyDto.ProposerDetails["Mobile Number"]}
                                  disabled
                                />
                                <TextField
                                  required
                                  label="Address1"
                                  variant="standard"
                                  value={LPolicyDto.ProposerDetails.PermanentAddress.Address1}
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
                                  value={LPolicyDto.ProposerDetails["Last Name"]}
                                  disabled
                                />
                                <TextField
                                  required
                                  label="Email Id"
                                  variant="standard"
                                  value={LPolicyDto.ProposerDetails["Email ID"]}
                                  disabled
                                />
                                <TextField
                                  label="Address2"
                                  variant="standard"
                                  value={LPolicyDto.ProposerDetails.PermanentAddress.Address2}
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
                                  value={LPolicyDto.ProposerDetails.Gender}
                                  disabled
                                />
                                <TextField
                                  label="PAN Number"
                                  variant="standard"
                                  name="PAN"
                                  sx={{ mt: "2.8rem" }}
                                  onChange={handlepanchange}
                                  value={LPolicyDto.ProposerDetails["PAN Number"]}
                                />
                              </div>
                            </Stack>
                          </Grid>
                        </Stack>
                      </MDBox>
                    )}
                    {finSal && (
                      <Grid container ml={-24} width="230%" mt={3}>
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
                    {/* <MDBox mt={2}>
                    {PayU === true && (
                      <Grid item>
                        <MDButton
                          color="primary"
                          // textAlign="right"
                          fullwidth
                          alignItems="center"
                          onClick={handleformData}
                        >
                          Make Payment
                        </MDButton>
                      </Grid>
                    )}
                  </MDBox> */}
                  </MDBox>
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
                          sx={{ width: 250 }}
                          value={LPolicyDto.QuoteEmail}
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
                  </MDBox>
                )}
                {SinglePolicySinglePayment && (
                  <Grid container ml={-10} width="150%">
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
                          onClick={handleClear}
                        >
                          Clear
                        </MDButton>
                      </Grid>
                    </Grid>
                    {CDSubmit && (
                      <Table
                        aria-label="simple table"
                        sx={{ marginTop: "3rem", marginLeft: "1rem" }}
                      >
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
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Card sx={{ background: "#E5E4E2", borderRadius: "0px", width: 550, ml: 10, mt: 0 }}>
                <Grid container p={3} spacing={1}>
                  <Grid item xs={6} sm={6} md={6}>
                    Customer&nbsp;Name
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    {" "}
                    {LPolicyDto.ProposerDetails["Customer Type"] === "Individual"
                      ? LPolicyDto.ProposerDetails.Salutation +
                        LPolicyDto.ProposerDetails["First Name"] +
                        ["  "] +
                        LPolicyDto.ProposerDetails["Last Name"]
                      : LPolicyDto.ProposerDetails.Salutation +
                        LPolicyDto.ProposerDetails["First Name"]}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    Policy&nbsp;Start&nbsp;Date
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    {LPolicyDto.ProposerDetails["Policy Start Date"]}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    Policy&nbsp;End&nbsp;Date
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    {LPolicyDto.ProposerDetails["Policy End Date"]}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    Sum&nbsp;Insured
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    {" "}
                    {formatter.format(LPolicyDto.PremiumDetails["Sum Insured"])}
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    Total&nbsp;Premium
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    {" "}
                    {formatter.format(Number(LPolicyDto.PremiumDetails["Total with Tax"]))}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid container justifyContent="flex-start" mb={2}>
        <MDButton color="primary" variant="outlined" onClick={handleBack}>
          Back
        </MDButton>
      </Grid>
    </MDBox>
  );
}
export default PaymentDetailsPage;
