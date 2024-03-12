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
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
// import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import swal from "sweetalert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import MDTypography from "components/MDTypography";
import { UploadFiles } from "modules/PolicyLive/views/BLUS/data/index";
import MDCheckbox from "components/MDCheckbox";
import { DeleteFile } from "../../../../BrokerPortal/Pages/MyProfile/data/index";
import MDButton from "../../../../../components/MDButton";
import {
  makePayment,
  fetchPaymentURL,
  handleIssuePolicy,
  fetchusername,
  SavePaymentdetails,
  sendPaymentMail,
  GetACDBalanceAmt,
  GetACDPaymentStatus,
  makeBilldeskPayment,
} from "./data/index";
import Policypayment from "./data/PaymentJson";
import { useDataController, setMarineTransactionId } from "../../../../BrokerPortal/context";
import { postRequest, getRequest } from "../../../../../core/clients/axiosclient";

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
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function PaymentDetailsPage({ PolicyDto, setPolicyDto }) {
  const [, dispatch] = useDataController();
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  });
  const navigate = useNavigate();
  const [ClientFlag, setClientFlag] = useState(false);
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
  const [ACDPayment, setACDPayment] = useState(false);
  const [checkbutton, setCheckButton] = useState(true);
  console.log("setCheckbutton", setCheckButton);
  const [amountCollected, setAmountCollected] = useState(false);
  const [CDSubmit, setCDSubmit] = useState(false);
  const [SinglePolicySinglePayment, setSinglePolicySinglePayment] = useState(false);
  const [PayU, setPayU] = useState(true);
  const [finSal, setFinsal] = useState(false);
  const [anchorE2, setAnchorE2] = React.useState(null);
  // const username = localStorage.getItem("userName");
  // console.log("username", username);
  const ProposalNumber = PolicyDto.ProposalNo;
  console.log("ProposalNumber", ProposalNumber);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log("selectedRows", selectedRows);
  const [selectedRowSum, setSelectedRowSum] = useState(0);
  console.log("selectedRowSum", selectedRowSum);
  const [selectedRowData1, setselectedRowData1] = useState();
  console.log("selectedRowData1", selectedRowData1);
  const [billdeskflag, setbilldeskflag] = useState(false);
  const [payUflag, setpayUflag] = useState(true);
  const [paymentSelected, setpaymentSelected] = useState(null);
  // const [BillDesk, setBillDesk] = useState(false);
  const [email, setEmail] = useState(PaymentDto.ProposerDetails["Email ID"]);
  const [emailflag, setEmailFlag] = useState(false);
  console.log("email", email);
  const CustomCheckbox = styled(MDCheckbox)(({ theme }) => ({
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
  function calculateExpDate() {
    const dateComponents = PolicyDto.ProposerDetails["Policy End Date"].split("/");
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

    otherPremium: PolicyDto["Total Premium"],

    thirdPartyPremium: "0",

    policyRefNumber: PolicyDto["Quotation No"],

    policyExpiryDate: calculateExpDate(PolicyDto.ProposerDetails["Policy End Date"]),
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

  const [ACDaccount, setACDaccount] = useState(null);
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

  const open1 = Boolean(anchorE2);

  const handlepaymentchange = (e) => {
    console.log("Paymentselected", paymentSelected);
    if (e.target.value === "PAY-U") {
      setpayUflag(true);
      setPayU(true);
      setbilldeskflag(false);
      setpaymentSelected(e.target.value);
    } else if (e.target.value === "BillDesk") {
      setbilldeskflag(true);
      setPayU(true);
      setpayUflag(false);
      setFinsal(false);
      setpaymentSelected(e.target.value);
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

  const handleCDSubmit = () => {
    if (selectedRowSum < PolicyDto["Total Premium"]) {
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

  const handleIssuePolicy1 = async () => {
    setloadingflag(true);
    const obj1 = {
      cod: username,
      // pytmid1: selectedRowData1.Payment_ID,
      pytmid1: selectedRows[0].Payment_ID,
      pytmid2: selectedRows[1] ? selectedRows[1].Payment_ID : "",
      // pytmid2: "",
      amount: PolicyDto["Total Premium"],
      usr: "a",
      props: ProposalNumber,
      ky: "oOb?eo%vsP7539",
    };
    console.log("obj1", obj1);
    const result = await GetACDPaymentStatus(obj1);
    console.log("result111", result);
    if (result.status === 200) {
      const { PaymentDetails } = PaymentDto;
      PaymentDetails.ChequeAmount = PolicyDto["Total Premium"];
      PaymentDetails.transactionNo = PolicyDto.TransactionID;
      PaymentDetails.paymentSource = "EB";
      setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
      console.log("Payment", PolicyDto);
      const Paymentdetls1 = Policypayment;
      console.log("Paymentdetls1", Paymentdetls1);
      Paymentdetls1.policyNo = "";
      Paymentdetls1.proposalNo = ProposalNumber;
      Paymentdetls1.paymentDetailsDTO.ChequeAmount = PolicyDto["Total Premium"];
      Paymentdetls1.paymentDetailsDTO.InstrumentDate = selectedRowData1.ChqDate;
      Paymentdetls1.paymentDetailsDTO.InstrumentNo = selectedRowData1.Payment_ID;
      Paymentdetls1.paymentDetailsDTO.paymentSource = "EB";
      setpaymentdata((prev) => ({ ...prev, ...Paymentdetls1 }));
      SavePaymentdetails(Paymentdetls1).then(async (result1) => {
        console.log("Payment saved", result1);
        if (result1.data.status === 1) {
          const jsonValue = {
            communicationId: 121,
            keyType: "MarinePolicy",
            key: result1.data.id,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: PolicyDto.ProposerDetails["Email ID"],
              },
            ],
          };
          await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
          const mobileNo = PolicyDto.ProposerDetails["Mobile Number"];
          const Message = `Dear Customer,Welcome to USGI Family. Your Marine Specific Voyage INSURANCE has been issued with policy no. ${
            result1.data.id
          } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
          await getRequest(
            `WCFExtension/SendSms?ICProductName=usgi&MobileNo=${mobileNo}&Message=${Message}`
          );
          setloadingflag(false);
          navigate("/Marine/SpecificVoyage/PaymentSuccess");
        } else {
          navigate("/Marine/SpecificVoyage/PaymentFailure");
        }
      });
    }
  };

  // const handleIssuePolicy1 = async () => {
  //   const obj1 = {
  //     cod: username,
  //     pytmid1: selectedRowData1.Payment_ID,
  //     pytmid2: "",
  //     amount: PolicyDto["Total Premium"],
  //     usr: "a",
  //     props: ProposalNumber,
  //     ky: "oOb?eo%vsP7539",
  //   };
  //   console.log("obj1", obj1);
  //   const result = await GetACDPaymentStatus(obj1);
  //   console.log("result111", result);
  //   if (result.status === 200) {
  //     const { PaymentDetails } = PaymentDto;
  //     PaymentDetails.ChequeAmount = PolicyDto["Total Premium"];
  //     PaymentDetails.transactionNo = PolicyDto.TransactionID;
  //     PaymentDetails.paymentSource = "EB";
  //     setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
  //     console.log("Payment", PolicyDto);
  //     setloadingflag(true);
  //     const Paymentdetls1 = Policypayment;
  //     console.log("Paymentdetls1", Paymentdetls1);
  //     Paymentdetls1.policyNo = "";
  //     Paymentdetls1.proposalNo = ProposalNumber;
  //     Paymentdetls1.paymentDetailsDTO.ChequeAmount = PolicyDto["Total Premium"];
  //     Paymentdetls1.paymentDetailsDTO.InstrumentDate = selectedRowData1.ChqDate;
  //     Paymentdetls1.paymentDetailsDTO.InstrumentNo = selectedRowData1.Payment_ID;
  //     Paymentdetls1.paymentDetailsDTO.paymentSource = "EB";
  //     setpaymentdata((prev) => ({ ...prev, ...Paymentdetls1 }));
  //     SavePaymentdetails(Paymentdetls1).then(async (result1) => {
  //       console.log("Payment saved", result1);
  //       setloadingflag(false);
  //       if (result1.data.status === 1) {
  //         const jsonValue = {
  //           communicationId: 121,
  //           keyType: "MarinePolicy",
  //           key: result1.data.id,
  //           stakeHolderDetails: [
  //             {
  //               communicationType: "Email",
  //               stakeholderCode: "CUS",
  //               communicationValue: PolicyDto.ProposerDetails["Email ID"],
  //             },
  //           ],
  //         };
  //         await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
  //         navigate(
  //           `/Home/PaymentSuccess?backURL=&PaymentRefNo=${PolicyDto.PaymentDetails.PaymentReferenceID}`
  //         );
  //       } else {
  //         navigate(`/Home/PaymentFailure`);
  //       }
  //     });
  //   }
  // };

  const handleEmailChange = (e) => {
    // setEmail(e.target.value);
    // PaymentDto.ProposerDetails["Email ID"] = e.target.value;
    // setPolicyDto({ ...PaymentDto });

    setEmail(e.target.value);
  };
  const handleFieldValidation = (e) => {
    if (e.target.name === "Email") {
      const emailReg =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/;
      if (!emailReg.test(e.target.value)) {
        setEmailFlag(true);
      } else {
        setEmailFlag(false);
      }
    }
  };

  const formatPropDate = (date) => {
    const propformat = (val) => (val > 9 ? val : `0${val}`);
    const propdate = new Date(date);
    return `${propformat(propdate.getDate())}/${propformat(
      propdate.getMonth() + 1
    )}/${propdate.getFullYear()}`;
  };
  const [bodyBilldeskData, setbodyBilldeskData] = useState({
    key: process.env.REACT_APP_BilldeskKey,
    txnid: "",
    amount: PolicyDto.PremiumDetails["Total with Tax"],
    productinfo: "Bharat Griha Raksha USB",
    firstname: PolicyDto.ProposerDetails["First Name"],
    email: PolicyDto.ProposerDetails["Email ID"],
    phone: PolicyDto.ProposerDetails["Mobile Number"],
    surl: "",
    furl: "",
    salt: process.env.REACT_APP_BilldeskSalt,
  });
  //   const [bodyData, setbodyData] = useState({
  //     // key: "7Y4RPX",
  //     key: process.env.REACT_APP_PayuKey,
  //     // txnid: "C05/12/202252",
  //     txnid: "",
  //     amount: PolicyDto["Total Premium"],
  //     // amount: "125",
  //     productinfo: "Marine Specific Voyage",
  //     firstname: PolicyDto.ProposerDetails["First Name"],
  //     // firstname: "Sahana",
  //     // email: "sahana@yahoo.com",
  //     // phone: "9999999999",
  //     email: PolicyDto.ProposerDetails["Email ID"],
  //     phone: PolicyDto.ProposerDetails["Mobile Number"],
  //     // surl: "https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0077/00/000",
  //     surl: `
  // https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=
  // ${PolicyDto.PaymentDetails.PaymentReferenceID}`,
  //     // surl: paymentData.surl,
  //     // furl: paymentData.furl,
  //     furl: "/paymentfailure",
  //     // salt: "hl8aISlY",
  //     salt: process.env.REACT_APP_PayuSalt,
  //     // hash: "",
  //   });
  const [bodyData, setbodyData] = useState({
    key: process.env.REACT_APP_PayuKey,
    txnid: "",
    amount: PolicyDto["Total Premium"],
    productinfo: "Marine Specific Voyage",
    firstname: PolicyDto.ProposerDetails["First Name"],
    email: PolicyDto.ProposerDetails["Email ID"],
    phone: PolicyDto.ProposerDetails["Mobile Number"],
    surl: "https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0077/00/000",
    furl: "/paymentfailure",
    salt: process.env.REACT_APP_PayuSalt,
  });

  const handelfinsalsubmit = async () => {
    console.log("doc", PolicyDto.DocumentDetails);
    // if (!PolicyDto.DocumentDetails.some((x) => x.DocType === "Pan Copy")) {
    //   swal({
    //     icon: "error",
    //     text: "Please Upload PanCard",
    //   });
    // } else {
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
    // }
  };

  const handlepanchange = (e) => {
    const { ProposerDetails } = PaymentDto;
    ProposerDetails.PAN = e.target.value;
    finsalData.user.pan = e.target.value;
    // finsalData.policyExpiryDate = calculateExpDate(PolicyDto.ProposerDetails.PolicyEndDate);
    setFinsalData(finsalData);
    setPolicyDto((prevState) => ({ ...prevState, ProposerDetails }));
  };
  const handleClearButtonClick = () => {
    setSelectedRows([]);
    setCheckButton(true);
    setSelectedRowSum(0);
    setCDSubmit(false);
    setAmountCollected(false);
  };
  const handelsubmitchange = () => {
    if (
      PaymentDto.PaymentDetails.InstrumentNo === "" ||
      PaymentDto.PaymentDetails.InstrumentDate === ""
    ) {
      setErrorFlag(true);
    } else {
      setErrorFlag(false);
      console.log("clicked");
      const { PaymentDetails } = PaymentDto;
      PaymentDetails.ChequeAmount = PolicyDto["Total Premium"];
      PaymentDetails.transactionNo = PolicyDto.TransactionID;
      PaymentDetails.paymentSource = "Cheque";
      setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
      console.log("Payment", PolicyDto);
      setloadingflag(true);
      handleIssuePolicy(PolicyDto).then((result) => {
        console.log("Policy issued", result);
        if (result.status === 200) {
          swal({
            text: result.data.finalResult.responseMessage,
            html: true,
            icon: "success",
          }).then(() => {
            const paydetail = paymentdata;
            paydetail.policyNo = result.data.finalResult.policyNo;
            paydetail.proposalNo = PolicyDto.ProposalNo;
            paydetail.paymentDetailsDTO.ChequeAmount = PolicyDto["Total Premium"];
            paydetail.paymentDetailsDTO.transactionNo = PolicyDto.TransactionID;
            paydetail.paymentDetailsDTO.paymentSource = "Cheque";
            setpaymentdata((prev) => ({ ...prev, paydetail }));
            SavePaymentdetails(paydetail).then((result1) => {
              console.log("Payment saved", result1);
              setloadingflag(false);
              if (result1.status === 200) {
                navigate("/Marine/SpecificVoyage/PaymentSuccess");
              } else {
                navigate("/Marine/SpecificVoyage/PaymentFailure");
              }
            });
          });
        }
      });
    }
  };

  // const handelsubmitchange = () => {
  //   if (
  //     PaymentDto.PaymentDetails.InstrumentNo === "" ||
  //     PaymentDto.PaymentDetails.InstrumentDate === ""
  //   ) {
  //     setErrorFlag(true);
  //   } else {
  //     setErrorFlag(false);
  //     console.log("clicked");
  //     const { PaymentDetails } = PaymentDto;
  //     PaymentDetails.ChequeAmount = PolicyDto["Total Premium"];
  //     PaymentDetails.transactionNo = PolicyDto.TransactionID;
  //     PaymentDetails.paymentSource = "Cheque";
  //     setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
  //     console.log("Payment", PolicyDto);
  //     setloadingflag(true);
  //     handleIssuePolicy(PolicyDto).then((result) => {
  //       console.log("Policy issued", result);
  //       if (result.status === 200) {
  //         swal({
  //           text: result.data.finalResult.responseMessage,
  //           html: true,
  //           icon: "success",
  //         }).then(() => {
  //           const paydetail = paymentdata;
  //           paydetail.policyNo = result.data.finalResult.policyNo;
  //           paydetail.proposalNo = PolicyDto.ProposalNo;
  //           paydetail.paymentDetailsDTO.ChequeAmount = PolicyDto["Total Premium"];
  //           paydetail.paymentDetailsDTO.transactionNo = PolicyDto.TransactionID;
  //           paydetail.paymentDetailsDTO.paymentSource = "Cheque";
  //           setpaymentdata((prev) => ({ ...prev, paydetail }));
  //           SavePaymentdetails(paydetail).then((result1) => {
  //             console.log("Payment saved", result1);
  //             setloadingflag(false);
  //             if (result1.status === 200) {
  //               navigate(
  //                 `/Home/PaymentSuccess?backURL=&PaymentRefNo=${PolicyDto.PaymentDetails.PaymentReferenceID}`
  //               );
  //             } else {
  //               navigate(`/Home/PaymentFailure`);
  //             }
  //           });
  //         });
  //       }
  //     });
  //   }
  // };

  const handlepagechange = (e) => {
    console.log("yyyy", PaymentDto);
    const { PaymentDetails } = PaymentDto;
    const { paymentDetailsDTO } = paymentdata;
    PaymentDetails[e.target.name] = e.target.value;
    paymentDetailsDTO[e.target.name] = e.target.value;
    setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
    setpaymentdata((prevState) => ({ ...prevState, paymentDetailsDTO }));
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

  const handlemychange = (e) => {
    // const { PaymentDetails } = PaymentDto;
    const policy = PolicyDto;
    if (e.target.name === "Client Payment") {
      setClientFlag(true);
      setACDPayment(false);
      setCDFlag(false);
      setSinglePolicySinglePayment(false);
    } else if (e.target.name === "Agent Payment") {
      setClientFlag(true);
      setACDPayment(true);
      setAmountCollected(false);
    }
    // PaymentDetails.paymentType = e.target.name;
    // setPolicyDto((prevState) => ({
    //   ...prevState,
    //   PaymentDetails,
    // }));
    policy.PaymentDetails.paymentType = e.target.name;
    setPolicyDto((prevState) => ({
      ...prevState,
      policy,
    }));
  };

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
    // const proposalno = QuoteData.quotation.quoteNo.Replace("/", "%2F");
    fetchPaymentURL(872, PolicyDto.ProposalNo, PolicyDto["Total Premium"]).then((results) => {
      const data = results;
      setPaymentData(data);
      // txnID = results.transactionID;
      console.log("InGetpayment", data);
      // setPaymentData(data);
      setMarineTransactionId(dispatch, results.paymentRefNo);
      settransactionID(results.transactionID);
      setPolicyDto((prevState) => ({
        ...prevState,
        TransactionID: results.transactionID,
      }));

      setSuccessurl(results.surl);
      setFailureurl(results.furl);
      console.log("pgggg", PolicyDto);
      console.log("payment coming", paymentData);
    });
    console.log("pgggg1", PolicyDto);
    console.log("Transaction", transactionID);
  };
  // const handleTxnIDgen = () => {
  //   fetchPaymentURL(872, PolicyDto.ProposalNo, PolicyDto["Total Premium"]).then((results) => {
  //     const data = results;
  //     setPaymentData(data);
  //     console.log("InGetpayment", data);
  //     const policy = PolicyDto;
  //     policy.TransactionID = results.transactionID;
  //     policy.PaymentDetails.PaymentReferenceID = results.paymentRefNo;
  //     setPolicyDto(policy);

  //     setSuccessurl(results.surl);
  //     setFailureurl(results.furl);
  //     console.log("pgggg", PolicyDto);
  //     console.log("payment coming", paymentData);
  //   });
  //   console.log("pgggg1", PolicyDto);
  //   // console.log("Transaction", transactionID);
  // };

  // const handleformData = () => {
  //   if (payUflag === true) {
  //     if (PolicyDto.TransactionID !== "") {
  //       bodyData.txnid = PolicyDto.TransactionID;
  //       bodyData.surl = Sucessurl;
  //       bodyData.furl = Failureurl;
  //       setbodyData(bodyData);
  //       console.log("tran", PolicyDto.TransactionID);
  //       console.log("bodydata", bodyData);
  //       handlePayment(bodyData);
  //     }
  //   } else if (billdeskflag === true) {
  //     if (PolicyDto.TransactionID !== "") {
  //       bodyBilldeskData.txnid = PolicyDto.TransactionID;
  //       bodyBilldeskData.surl = Sucessurl;
  //       bodyBilldeskData.furl = Failureurl;
  //       setbodyBilldeskData(bodyBilldeskData);
  //       console.log("tran", PolicyDto.TransactionID);
  //       console.log("bodydata", bodyBilldeskData);
  //       handlePayment1(bodyBilldeskData);
  //     }
  //   }
  // };

  const handleformData = () => {
    if (payUflag === true) {
      if (transactionID !== "") {
        //   bodyData.txnid = transactionID;
        //   bodyData.surl = Sucessurl;
        //   bodyData.furl = Failureurl;
        //   setbodyData(bodyData);
        //   console.log("tran", transactionID);
        //   console.log("bodydata", bodyData);
        //   handlePayment(bodyData);
        // }
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

  useEffect(() => {
    handleTxnIDgen();
  }, []);

  useEffect(() => {
    setPolicyDto((prevState) => ({
      ...prevState,
      PolicyDto,
    }));
  }, [bodyData]);

  const handleSetValue = (e, value) => {
    const { PaymentDetails } = PaymentDto;
    const { paymentDetailsDTO } = paymentdata;
    // masterArray.BankName = value; commented
    PaymentDetails.BankName = value.mValue;
    paymentDetailsDTO.BankName = value.mValue;
    setPolicyDto((prevState) => ({ ...prevState, PaymentDetails }));
    setpaymentdata((prevState) => ({ ...prevState, paymentDetailsDTO }));
  };

  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
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
      console.log("pppp", PolicyDto.ProposalNo);
      const mail = await sendPaymentMail(PolicyDto.ProposalNo, email);
      // const mail = await sendMail(proposalNumber, "sahana@inubesolution.com");
      console.log("mail", mail);
      if (mail.data.status === 1) {
        swal({
          text: `Payment Link Shared Successfully.`,
          buttons: "Home",
          icon: "success",
        }).then(() => window.open(process.env.REACT_APP_HOMEURL, "_self"));
      }
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
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ color: "#000000", fontSize: "1rem", ml: "20rem", mt: "-1.5rem" }}
              defaultValue="Client Payment"
            >
              <FormControlLabel
                value="Client Payment"
                control={<Radio />}
                name="Client Payment"
                label="Client Payment"
                onClick={handlemychange}
              />
              <FormControlLabel
                value="Agent Payment"
                control={<Radio />}
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
          </FormControl>
        </Stack>
      </Grid>
      {(ClientFlag === true || ClientFlag === false) && (
        <Grid>
          <MDBox display="flex" flexDirection="column">
            {onlinePayFlag === true && (
              <MDBox mt={1}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    sx={{ ml: "15rem" }}
                    defaultValue="singlepolicysinglepayment"
                  >
                    <FormControlLabel
                      value="singlepolicysinglepayment"
                      control={<Radio />}
                      label="Single Policy-Single Payment"
                    />
                    <FormControlLabel
                      value="singlepolicymultiplepayment"
                      control={<Radio />}
                      label="Single Policy-Multiple Payment"
                    />
                  </RadioGroup>
                </FormControl>
              </MDBox>
            )}
            {CDFlag && (
              <MDBox mt={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue="singlepolicysinglepayment"
                    sx={{ ml: "20rem" }}
                  >
                    <FormControlLabel
                      value="singlepolicysinglepayment"
                      control={<Radio />}
                      label="Single Policy-Single Payment"
                    />
                  </RadioGroup>
                </FormControl>
              </MDBox>
            )}
          </MDBox>
          <Grid container sx={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={12} md={4}>
              <MDBox display="flex" flexDirection="column">
                <MDBox mt={1}>
                  <MDButton
                    variant={chequeFlag ? "contained" : "outlined"}
                    color={chequeFlag ? "primary" : "primary"}
                    onClick={handleChequeClick}
                    disabled
                    sx={{ width: "45%" }}
                  >
                    Cheque
                  </MDButton>
                </MDBox>
                <MDBox mt={1}>
                  <MDButton
                    variant={onlinePayFlag ? "contained" : "outlined"}
                    color={onlinePayFlag ? "primary" : "primary"}
                    onClick={handleOnlinePayment}
                    sx={{ width: "45%" }}
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
                    sx={{ width: "45%" }}
                  >
                    Send Payment Link
                  </MDButton>
                </MDBox>
                {ACDPayment && (
                  <>
                    <MDBox mt={1}>
                      <MDButton
                        variant={CDFlag ? "contained" : "outlined"}
                        color={CDFlag ? "primary" : "primary"}
                        onClick={handleCDAccount}
                        sx={{ width: "45%" }}
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
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              {chequeFlag === true && (
                <MDBox display="flex" flexDirection="column" ml={-10} mr={10}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <TextField
                        id="outlined-basic"
                        label="Cheque Amount"
                        variant="outlined"
                        fullWidth
                        // sx={{ input: { fontWeight: "bold" } }}
                        value={PolicyDto["Total Premium"]}
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
                        inputProps={{ maxLength: 6 }}
                        sx={{ width: "100%" }}
                        fullWidth
                        value={PolicyDto.PaymentDetails.InstrumentNo}
                        disabled
                      />
                      {PolicyDto.PaymentDetails.InstrumentNo === "" && errorFlag ? (
                        <Typography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the required fields
                        </Typography>
                      ) : null}
                    </Grid>
                    <Grid item>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Instrument Date"
                          inputFormat="dd/MM/yyyy"
                          type="login"
                          id="InstrumentDate"
                          value={datetoShow.InstrumentDate}
                          onChange={(date) =>
                            handleDateChange(date, "Instrument Date", "InstrumentDate")
                          }
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              sx={{ width: "78%" }}
                              variant="outlined"
                              fullWidth
                            />
                          )}
                          disabled
                        />
                      </LocalizationProvider>
                    </Grid>
                    <MDBox sx={{ width: "232px", marginTop: "17px", marginLeft: "16px" }}>
                      <Autocomplete
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "4px!important",
                          },
                        }}
                        disabled
                        disableClearable
                        id="Bank Name"
                        name="BankName"
                        options={["Axis", "CANARA BANK"]}
                        onChange={handleSetValue}
                        value={PolicyDto.PaymentDetails.BankName}
                        getOptionLabel={(option) => option.mValue}
                        renderInput={(params) => (
                          <MDInput
                            fullWidth
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                              readOnly: true,
                            }}
                            sx={{
                              width: "78%",
                              "& .MuiFormLabel-asterisk": {
                                color: "red",
                              },
                            }}
                            label="Bank Name"
                            required
                            error={
                              Object.values(PolicyDto.PaymentDetails.BankName || {}).every(
                                (x) => x === null || x === ""
                              )
                                ? errorFlag
                                : null
                            }
                          />
                        )}
                      />
                      {Object.values(PolicyDto.PaymentDetails.BankName || {}).every(
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
                        disabled
                      >
                        Make Payment
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              )}
              {onlinePayFlag === true && (
                <MDBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  spacing={2}
                  ml={-10}
                  mr={10}
                >
                  <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <RadioGroup
                      row
                      sx={{ color: "#000000", fontSize: "2rem", borderRadius: "50%" }}
                      defaultValue="Pay-U"
                      onChange={handlepaymentchange}
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
                          control={<Radio sx={{ ml: 2 }} />}
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
                          value="BillDesk"
                          control={<Radio sx={{ ml: 2 }} />}
                          label="BillDesk"
                          name="BillDesk"
                          sx={{ borderRadius: "50%" }}
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
                          mb: "2rem",
                        }}
                      >
                        <FormControlLabel
                          value="premiumfinancing"
                          control={<Radio sx={{ ml: 2 }} />}
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
                                value={PolicyDto.ProposerDetails["Address 1"]}
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
                                value={PolicyDto.ProposerDetails["Address 2"]}
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
                                disableClearable
                                getOptionLabel={(option) => option.mValue}
                                onChange={(e, value) => handleDocType(e, value, i)}
                                renderInput={(params) => (
                                  <MDInput
                                    {...params}
                                    inputProps={{
                                      ...params.inputProps,
                                      readOnly: true,
                                    }}
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
                <MDBox display="flex" flexDirection="column" spacing={2} ml={-10} mr={10}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <TextField
                        required
                        sx={redAsterisk}
                        style={{ width: "280px" }}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="Email"
                        onChange={handleEmailChange}
                        // value={PolicyDto.ProposerDetails["Email ID"]}
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
                <Grid container ml={-25} width="125%">
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
                          onClick={handleIssuePolicy1}
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
            <Grid item xs={12} sm={12} md={5}>
              <Card
                sx={{
                  background: "#E5E4E2",
                  borderRadius: "0px",
                  ml: "-50px",
                  width: "560px",
                  padding: 1,
                }}
              >
                {/* <MDBox display="flex" flexDirection="row" sx={{ p: 2 }}> */}
                {/* <MDBox display="flex" flexDirection="column"> */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography>Product Name</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography>Specific Voyage Marine Insurance </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography>Customer Name</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography>
                      {PolicyDto.ProposerDetails["Customer Type"] === "Individual"
                        ? PolicyDto.ProposerDetails.Salutation +
                          ["  "] +
                          PolicyDto.ProposerDetails["First Name"] +
                          ["  "] +
                          PolicyDto.ProposerDetails["Last Name"]
                        : PolicyDto.ProposerDetails["First Name"]}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography>Policy Start Date</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography>
                      {PolicyDto.ProposerDetails["Policy Start Date"].split("/").join("/")}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography>Policy End Date</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography>
                      {PolicyDto.ProposerDetails["Policy End Date"].split("/").join("/")}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography>Sum Insured</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography>{PolicyDto["Sum Insured in INR "]}</MDTypography>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography>Total Premium</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                    <MDTypography> {formatter.format(PolicyDto["Total Premium"])}</MDTypography>
                  </Grid>
                </Grid>

                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography>Customer Name</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography>Policy Start Date</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography>Policy End Date</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography>Sum Insured</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography>Total Premium</MDTypography>
                  </Grid> */}
                {/* </MDBox> */}
                {/* <MDBox display="flex" flexDirection="column" ml={3} spacing={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography>
                        {PolicyDto.ProposerDetails["Customer Type"] === "Individual"
                          ? PolicyDto.ProposerDetails.Salutation +
                            ["  "] +
                            PolicyDto.ProposerDetails["First Name"] +
                            ["  "] +
                            PolicyDto.ProposerDetails["Last Name"]
                          : PolicyDto.ProposerDetails["First Name"]}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography>
                        {PolicyDto.ProposerDetails["Policy Start Date"].split("/").join("/")}
                      </MDTypography>

                      {/* <MDTypography>{PolicyDto["Policy Start Date"]}</MDTypography> */}
                {/* </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography>
                        {PolicyDto.ProposerDetails["Policy End Date"].split("/").join("/")}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography>{PolicyDto["Sum Insured in INR "]}</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
                {/* <MDTypography>{PolicyDto["Total Premium"]}</MDTypography> */}
                {/* <MDTypography> {formatter.format(PolicyDto["Total Premium"])}</MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>  */}
                {/* </MDBox> */}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default PaymentDetailsPage;
