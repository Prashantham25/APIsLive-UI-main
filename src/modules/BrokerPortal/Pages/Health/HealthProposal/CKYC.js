import { React, useState, useEffect } from "react";
import { Grid, Autocomplete, FormControlLabel, Radio, RadioGroup, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { isValid } from "date-fns";
import OtpInput from "react-otp-input-rc-17";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import CustDetail from "assets/images/BrokerPortal/CustDetail.png";
import swal from "sweetalert";
import { UploadFiles, DeleteFile, ProfileData } from "../../MyProfile/data/index";
import { getOTP, GetOTP } from "../../CustomerEngage/data/index";
import {
  useDataController,
  //  setQuoteProposalOutput
} from "../../../context";
import {
  GetPaymentURL,
  //     // GetPDF,
  //     // GetProductPartnerMaster,
  SaveProposal,
  //     GetAllMasters,
} from "./data";
// import { postRequest } from "../../../../../core/clients/axiosclient";
import { CompData } from "../HealthQuote/data/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "56rem",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function OTPModel({
  handleOTP,
  otpdata,
  handleotpverify,
  handleModalClose,
  customerDetails,
  handleModalEmailOpen,
  handleEmailchange,
  flags,
}) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalClose} />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="body1"
              sx={{
                textAlign: "center",
                fontSize: "1rem",
                color: "#000000",
                marginTop: "40px",
              }}
            >
              {" "}
              Enter the otp sent to{" "}
              {flags.getotpflag === true ? otpdata.Email : customerDetails.Email}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ marginTop: "27px" }}>
            <OtpInput
              value={otpdata.otp}
              onChange={handleOTP}
              numInputs={6}
              isInputNum
              hasErrored
              isInputSecure
              inputStyle={{
                width: "48px",
                height: "48px",
                margin: "0.85rem",
                fontSize: "1rem",
                borderRadius: 4,
                border: "2px solid rgba(0,0,0,0.3)",
                background: "white",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="body1"
              onClick={handleModalEmailOpen}
              sx={{
                textAlign: "center",
                fontSize: "1rem",
                color: "#0071D9",
                marginLeft: "-253px",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {" "}
              Change Email
            </MDTypography>
          </Grid>
          <Grid container justifyContent="space-between" sx={{ marginTop: "33px" }}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography
                onClick={handleEmailchange}
                sx={{
                  color: "#0071D9",
                  fontSize: "1.10rem",
                  textDecoration: "underline",
                  mr: "2rem",
                  ml: "2rem",
                  cursor: "pointer",
                }}
              >
                ResendOTP
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} sx={{ marginRight: "27px" }}>
              <MDButton
                onClick={handleotpverify}
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                Proceed
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function ChangeEmailModel({ handleEmail, otpdata, handleModalEmailClose, handleEmailchange }) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalEmailClose} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ marginTop: "72px", margingLeft: "11px" }}
        >
          <MDInput
            id="Email"
            value={otpdata.Email}
            name="Email"
            onChange={handleEmail}
            // onBlur={handleValidate}
            label="Email"
          />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            sx={{ marginRight: "27px", marginTop: "75px" }}
          >
            <Grid container justifyContent="flex-end">
              <MDButton
                onClick={handleEmailchange}
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                Get OTP
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function CKYC() {
  // { handleBack, handleNext }
  const [
    controller,
    // dispatch
  ] = useDataController();
  const { quoteProposalOutput, customerDetails, isCustomer, partnerDetails } = controller;
  console.log("isCustomer", isCustomer);

  const navigate = useNavigate();

  const [data, setData] = useState(quoteProposalOutput);
  const [isKyc, setisKyc] = useState("Yes");

  const [proposalDetails, setProposalDetails] = useState();
  const [paymentData, setPaymentData] = useState();

  //   const [kycNoTrue, setKYCNoTrue] = useState(false);
  //   const [kycNoFalse, setkycNoFalse] = useState(false);
  //   const [panNoFalse, setpanNoFalse] = useState(false);

  const [otpdata, setotpdata] = useState({
    otp: "",
    Email: "",
  });
  const handleOTP = (otp1) => {
    setotpdata((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
  };

  const handleEmail = (event) => {
    setotpdata((prevState) => ({
      ...prevState,
      Email: event.target.value,
    }));
  };

  const [flags, setFlags] = useState({
    errorFlag: false,
    ageFlag: false,
    // nomineeage: "",
    Age: "",
    // nomineeFlag: "",
    // chassisFlag: false,
    // pincode: false,
    // pincodecommunication: false,
    getotpflag: false,
    // engineError: false,
  });
  const [kycflags, setKycflags] = useState({
    kycErrorFlag: false,
    ckycNoFlag: false,
    pancardFlag: false,
    ageDOBFlag: false,
    Age: "",
    validationError: false,
  });

  const { DocumentType } = ProfileData().basicdetails.Masters;

  const handleRadioChange = (e) => {
    setisKyc(e.target.value);
    if (e.target.value === "Yes") {
      const { kyc } = data;
      console.log("kyc", kyc);
      kyc.isKYCDone = "true";
      setData((prev) => ({ ...prev, kyc }));
    } else {
      const { kyc } = data;
      kyc.isKYCDone = "false";
      setData((prev) => ({ ...prev, kyc }));
    }
  };

  const handleValidateKYC = (e) => {
    const { kyc } = data;
    if (e.target.name === "CKYCNo") {
      //   if (data.PartnerId === "62") {
      //     if (e.target.value.length < 10) {
      //       const panregex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
      //       if (!panregex.test(e.target.value)) {
      //         setKycflags((prevState) => ({ ...prevState, ckycNoFlag: true }));
      //       } else {
      //         setKycflags((prevState) => ({ ...prevState, ckycNoFlag: false }));
      //       }
      //     }
      //   } else {
      console.log("234567890");
      if (e.target.value.length < 14) {
        setKycflags((prevState) => ({ ...prevState, ckycNoFlag: true }));
      } else {
        setKycflags((prevState) => ({ ...prevState, ckycNoFlag: false }));
      }
      //   }
    } else if (e.target.name === "PANNo") {
      if (e.target.value.length < 10) {
        const panregex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        if (!panregex.test(e.target.value)) {
          kyc[e.target.name] = e.target.value.toUpperCase();
          setData((prev) => ({ ...prev, kyc }));
          setKycflags((prevState) => ({ ...prevState, pancardFlag: true }));
        }
      } else {
        setKycflags((prevState) => ({ ...prevState, pancardFlag: false }));
      }
    }
  };

  //   const [masterValue, setMasterValue] = useState({
  //     Gender: [],
  //   });
  //   const [args, setArgs] = useState({
  //     productId: null,
  //     partnerId: null,
  //     masterType: null,
  //     jsonValue: null,
  //   });
  //   useEffect(async () => {
  //     if (data.PartnerId) {
  //       const argObj = {
  //         ...args,
  //         productId: 780,
  //         partnerId: data.PartnerId,
  //         masterType: null,
  //         jsonValue: null,
  //       };
  //       setArgs(argObj);
  //       GetAllMasters(argObj, setMasterValue);
  //     }
  //   }, [data.PartnerId]);
  //   const getValue = (masterType, value) => {
  //     if (masterValue[masterType]) {
  //       const val = masterValue[masterType].filter((x) => x.mID === value);
  //       return val.length > 0 ? val[0].mValue : "";
  //     }
  //     return "";
  //   };

  const { Gender } = CompData().QuoteData.Masters;
  const [masters, setMasters] = useState({
    Gender: { mID: "", mValue: "" },
  });
  const handleGenderChange = (event, values) => {
    setMasters((prevState) => ({ ...prevState, Gender: values }));
    const { kyc } = data;
    kyc.Gender = values.mID;
    setData((prev) => ({ ...prev, kyc }));
    // setHealthInsuranceDetails(dispatch, {
    //   ...HealthInsuranceDetails,
    // });
    // console.log(HealthInsuranceDetails, "health1");
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };

  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const handleModalEmailOpen = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setModalEmailOpen(true);
  };
  const handleModalEmailClose = () => {
    setModalEmailOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };

  const [master, setMaster] = useState({
    DocumentType: { mID: "", mValue: "" },
  });

  const [KycUploadPhoto, setKycUploadPhoto] = useState();
  const [KycPanUpload, setKycPanUpload] = useState();
  const [KycDocument, setKycDocument] = useState();

  const [name, setName] = useState({
    FirstName: "",
    LastName: "",
  });

  const [pan, setPan] = useState({ PANNo: "" });

  useEffect(() => {
    const newValue = {
      ...name,
      FirstName: data.ProposerDetails.CustomerFirstName,
      LastName: data.ProposerDetails.CustomerLastName,
      PANNo: data.ProposerDetails.PANCardNo,
    };
    setName(newValue);
  }, []);

  useEffect(() => {
    const newValue = {
      ...pan,
      PANNo: data.ProposerDetails.PANCardNo,
    };
    setPan(newValue);
  }, []);

  const uploadFiles = async (files, type) => {
    const formData = new FormData();
    formData.append("file", files, files.name);
    await UploadFiles(formData).then((result) => {
      console.log("resultkyc", result);
      if (result.data[0].fileName !== "") {
        if (type === "Photo") {
          setKycUploadPhoto(files);
        } else if (type === "PAN") {
          setKycPanUpload(files);
        } else {
          setKycDocument(files);
        }
      }
    });
  };

  const handleKycFileUpload = async (event, type) => {
    await uploadFiles(event.target.files[0], type);
    console.log("files", event.target.files[0]);
  };

  const handleKycDeleteFile = async (type, fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        if (type === "Photo") {
          setKycUploadPhoto();
        } else if (type === "PAN") {
          setKycPanUpload();
        } else {
          setKycDocument();
        }
      }
    });
  };

  const handleDocumentTypeDropdown = (event, values) => {
    setMaster((prevState) => ({ ...prevState, DocumentType: values }));
    if (values.mValue !== "") {
      const { kyc } = data;
      kyc.OtherDocID = values.mID;
      kyc.OtherDocValue = values.mValue;
      kyc.OtherDocNumber = "";
      setData((prev) => ({ ...prev, kyc }));
      // setKycflags((prevState) => ({ ...prevState, kycErrorFlag: false }));
    } else {
      const { kyc } = data;
      kyc.OtherDocID = "";
      kyc.OtherDocValue = "";
      kyc.OtherDocNumber = "";
      setData((prev) => ({ ...prev, kyc }));
      // setKycflags((prevState) => ({ ...prevState, kycErrorFlag: false }));
    }
  };

  const handleChange = (e) => {
    const { kyc } = data;
    if (e.target.name === "CKYCNo") {
      const ckyreg = /^[a-zA-Z0-9]+$/;
      if (ckyreg.test(e.target.value) || e.target.value === "") {
        kyc[e.target.name] = e.target.value.toUpperCase();

        setData((prev) => ({ ...prev, kyc }));
      }
    } else if (e.target.name === "PANNo") {
      const pancardReg = /^[a-zA-Z0-9]+$/;
      if (pancardReg.test(e.target.value) || e.target.value === "") {
        kyc[e.target.name] = e.target.value.toUpperCase();
        setPan((prev) => ({ ...prev, kyc }));
        setData((prev) => ({ ...prev, kyc }));
      }
    }
    // KYC[e.target.name] = e.target.value;
    // setData((prev) => ({ ...prev, KYC }));
  };

  const [dateNew, setDateNew] = useState({
    dateOfBirth: data.ProposerDetails.DOB,
  });
  const [validDob, setvalidDob] = useState(false);

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

  const formatDate = (date) => {
    const format1 = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format1(dt.getDate())}-${format1(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };
  const handleDOBChange = (value, label, type) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setvalidDob(false);
      // setDobDate((prevState) => ({ ...prevState, [label]: value }));
      setDateNew((prevState) => ({ ...prevState, [label]: value }));
      setData((prevState) => ({
        ...prevState,
        kyc: { ...prevState.kyc, [type]: formatDate(value) },
      }));
      // const newValue = { ...data, [type]: formatDate(value) };
      // setData(newValue);
      const dob = value.toLocaleDateString("en-ZA");
      const age = handleCalculateAge(dob);
      if (age < 18) {
        swal({
          icon: "error",
          text: "Please enter valid Date of birth",
        });
      }
      setFlags((prevState) => ({ ...prevState, Age: age }));
    } else {
      setvalidDob(true);
      setDateNew((prevState) => ({ ...prevState, [label]: null }));
    }
  };

  const handleValidateKycDocuments = (e) => {
    const selectedDocID = master.DocumentType.mID;
    switch (selectedDocID) {
      case "129":
        {
          const AadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
          if (!AadharRegex.test(e.target.value)) {
            setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setKycflags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setKycflags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "115":
        {
          const PassportRegex = /^([a-zA-Z]){1}([0-9]){7}/;
          if (!PassportRegex.test(e.target.value)) {
            setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setKycflags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setKycflags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      default:
        console.log("Manoj");
    }
  };

  const handleKYCDetails = (e) => {
    const { kyc } = data;
    kyc[e.target.name] = e.target.value;
    setData((prev) => ({ ...prev, kyc }));
  };

  const handleadharname = (event) => {
    if (event.target.name === "FirstName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          setName((prev) => ({ ...prev, FirstName: event.target.value }));
        }
      }
    } else if (event.target.name === "LastName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          setName((prev) => ({ ...prev, LastName: event.target.value }));
        }
      }
    }
  };

  const handleGoKycSubmit = async () => {
    // if (
    //   (data.KYC.isKYCDone === "true" ? data.KYC.CKYCNo === "" : null) ||
    //   (data.KYC.isKYCDone === "false" ? data.KYC.PANNo === "" : null) ||
    //   data.KYC.dateOfBirth === ""
    // ) {
    //   setKycflags((prevState) => ({ ...prevState, kycErrorFlag: true }));
    //   swal({
    //     icon: "error",
    //     text: "Please fill the required fields",
    //   });
    // } else {
    console.log("deded");
    if (isCustomer) {
      const sendOTP = {
        name: `${customerDetails.FirstName + customerDetails.LastName}`,
        otp: "1234",
        email: customerDetails.Email,
        userName: "manoj.naik@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: "",
        sendSms: true,
        isBerry: false,
        client: "iNube BrokerPortal",
      };
      handleModalOpen();
      await getOTP(sendOTP);
    }
    // }
  };

  const handleSubmitForNoCase = async () => {
    const { kyc } = data;
    kyc.FullName = name.FirstName.concat(" ", name.LastName);
    setData((prev) => ({ ...prev, kyc }));
    // handleGoKycSubmit();
    if (isCustomer) {
      //   if (data.PartnerId === "62") {
      //     handleGoKycSubmit();
      //     // handleGoKycotpverify()
      //   } else {
      console.log("234567890", data.PartnerId);
      // if (
      //   (data.KYC.isKYCDone === true ? data.KYC.CKYCNo === "" : null) ||
      //   (data.KYC.isKYCDone === false ? data.KYC.PANNo === "" : null) ||
      //   data.KYC.dateOfBirth === ""
      // ) {
      //   setKycflags((prevState) => ({ ...prevState, kycErrorFlag: true }));
      //   swal({
      //     icon: "error",
      //     text: "Please fill the required fields",
      //   });
      // } else {
      //   setKycflags((prevState) => ({ ...prevState, kycErrorFlag: false }));
      await SaveProposal(partnerDetails.partnerProductId, {
        ...data,
        "Product Code": "BaseHealthProduct",
      }).then((result) => {
        console.log("1234567890", result);
        const saveResult = result;
        setProposalDetails(saveResult);
        if (saveResult.proposalResponse.finalResult.KYCStatus === "") {
          //   setKYCNoTrue(true);
          //   setModalOpen(false);
        } else if (saveResult.proposalResponse.finalResult.KYCStatus !== "") {
          // open failure modal
          //   setpanNoFalse(true);
        }
        if (result.status === 7) {
          swal({
            icon: "error",
            text: "something went wrong please try after some time",
          }).then(() => {
            // setLoading(false);
            navigate("/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary");
          });
        }
      });
      // }
      //   }
    } else {
      await SaveProposal(partnerDetails.partnerProductId, {
        ...data,
        "Product Code": "BaseHealthProduct",
      }).then((result) => {
        console.log("1234567890", result);
        const saveResult = result;
        setProposalDetails(saveResult);
        // if (data.PartnerId === "62") {
        //   handleeconst();
        // } else {
        //   console.log("1234567890");
        if (saveResult.proposalResponse.finalResult.KYCStatus === "") {
          // setKYCNoTrue(true);
          // setModalOpen(false);
        } else if (saveResult.proposalResponse.finalResult.KYCStatus !== "") {
          // open failure modal
          // setpanNoFalse(true);
        }
        // }
        setModalOpen(false);
        if (result.status === 7) {
          swal({
            icon: "error",
            text: "something went wrong please try after some time",
          }).then(() => {
            // setLoading(false);
            navigate("/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary");
          });
        }
      });
    }
  };

  const handleSubmit = async () => {
    handleGoKycSubmit();
    if (isCustomer) {
      //   if (data.PartnerId === "62") {
      //     handleGoKycSubmit();
      //     // handleGoKycotpverify()
      //   } else {
      console.log("234567890", data.PartnerId);
      // if (
      //   (data.KYC.isKYCDone === true ? data.KYC.CKYCNo === "" : null) ||
      //   (data.KYC.isKYCDone === false ? data.KYC.PANNo === "" : null) ||
      //   (data.KYC.isKYCDone === false ? data.KYC.OtherDocNumber === "" : null) ||
      //   data.KYC.dateOfBirth === ""
      // ) {
      //   setKycflags((prevState) => ({ ...prevState, kycErrorFlag: true }));
      //   swal({
      //     icon: "error",
      //     text: "Please fill the required fields",
      //   });
      // } else {
      //   setKycflags((prevState) => ({ ...prevState, kycErrorFlag: false }));
      await SaveProposal(partnerDetails.partnerProductId, {
        ...data,
        "Product Code": "BaseHealthProduct",
      }).then((result) => {
        console.log("1234567890", result);
        const saveResult = result;
        setProposalDetails(saveResult);
        if (saveResult.proposalResponse.finalResult.KYCStatus === "") {
          //   setKYCNoTrue(true);
          //   setModalOpen(false);
        } else if (saveResult.proposalResponse.finalResult.KYCStatus !== "") {
          //   setkycNoFalse(true);
        }
        if (result.status === 7) {
          swal({
            icon: "error",
            text: "something went wrong please try after some time",
          }).then(() => {
            // setLoading(false);
            navigate("/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary");
          });
        }
      });
      // }
      //   }
    } else {
      await SaveProposal(partnerDetails.partnerProductId, {
        ...data,
        "Product Code": "BaseHealthProduct",
      }).then((result) => {
        console.log("1234567890", result);
        const saveResult = result;
        setProposalDetails(saveResult);
        // if (data.PartnerId === "62") {
        //   handleeconst();
        // } else {
        console.log("1234567890");
        if (saveResult.proposalResponse.finalResult.KYCStatus === "") {
          //   setKYCNoTrue(true);
          //   setModalOpen(false);
        } else if (saveResult.proposalResponse.finalResult.KYCStatus !== "") {
          //   setkycNoFalse(true);
        }
        // }
        if (result.status === 7) {
          swal({
            icon: "error",
            text: "something went wrong please try after some time",
          }).then(() => {
            // setLoading(false);
            navigate("/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary");
          });
        }
      });
    }
    // const { kyc } = data;
    // setData((prevState) => ({ ...prevState, ...kyc }));
    // setQuoteProposalOutput(dispatch, data);
    // console.log("QuoteProposalOutput", data);
  };

  const handleEmailchange = async () => {
    if (otpdata.Email !== "") {
      setFlags((prevState) => ({ ...prevState, getotpflag: true }));
    }
    setotpdata((prevState) => ({ ...prevState, otp: "" }));
    const sendOTP = {
      name: `${customerDetails.FirstName + customerDetails.LastName}`,
      otp: "1234",
      email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
      userName: "manoj.naik@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    setModalEmailOpen(false);
    handleModalOpen();
    await getOTP(sendOTP);
  };

  const handleotpverify = async () => {
    //   if (data.PartnerId === 128) {
    //     console.log("Inside fetch metod");
    //     <MotorPAYUPayment />;
    //   } else if (data.PartnerId === "62") {
    //     handleGoKycotpverify();
    //   } else {
    // console.log("234567890", data.PartnerId);
    if (otpdata.otp !== "") {
      //   setLoading(true);

      const verifyOTP = {
        otp: otpdata.otp,
        email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
        mobileNumber: "",
        userName: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      Promise.all([GetOTP(verifyOTP)]).then(async (results) => {
        console.log("OTP Result", results);

        if (results[0] === null) {
          swal({
            icon: "error",
            text: "Please enter the valid OTP sent to your Email",
          });
        }
        // setKYCNoTrue(false);
        // setModalOpen(false);
        // if (data.PartnerId === 128) {
        //   console.log("Inside fetch metod");
        //   <MotorPAYUPayment />;
        // }
        // <MotorPAYUPayment />;
        // if (data.PartnerId === "128") setModelopen1(true);
        // if (proposalDetails && data.PartnerId !== "128") {
        if (proposalDetails) {
          GetPaymentURL(
            partnerDetails.partnerProductId,
            proposalDetails.proposalNumber,
            setPaymentData
          );
        }
        // }
        // if (!isCustomer) setEConsent(true);
        // setLoading(false);
      });
    }
    //   }
  };

  useEffect(() => {
    console.log("PaymentFormData", "outside");
    if (paymentData) {
      console.log("PaymentFormData", paymentData.OutputResult);
      //   if (eConsent && !isCustomer) {
      // const notificationReq = {
      //   notificationRequests: [
      //     {
      //       templateKey: "POSP_Consent",
      //       sendEmail: false,
      //       isEmailBody: true,
      //       notificationPayload: JSON.stringify({
      //         CustomerFirstName: data.ProposerDetails.CustomerFirstName,
      //         CustomerLastName: data.ProposerDetails.CustomerLastName,
      //         ProposalNumber: proposalDetails.proposalNumber,
      //         BrokerName: process.env.REACT_APP_TITLE,
      //         ContactNo: process.env.REACT_APP_CONTACTNO,
      //         Email: process.env.REACT_APP_EMAIL,
      //         Image: process.env.REACT_APP_IMAGEURL,
      //         VehicelType: vehicleType,
      //       }),
      //     },
      //   ],
      //   Attachments:[{
      //     FileName:"",
      //     FileExtension:".pdf",
      //     FileData:"",
      //     ContentType:"",
      //   }],
      //   sendEmail: true,
      //   subject: `Your Car Comprehensive Insurance Policy for ${VariantDetailsOutput[0].MAKE} ${VariantDetailsOutput[0].MODEL} - ${data.VehicleDetails.RegistrationNumber}`,
      //   toEmail: data.ProposerDetails.EmailId,
      // };
      // postRequest("Notifications/SendMultipleTemplateNotificationAsync", notificationReq);

      // const notificationRequests = {
      //   proposalNo: "",
      //   policyNo: "quoteNumber",
      //   transactionId: "",
      //   customerId: "",
      //   key: quoteProposalOutput.finalResult.BaseQuotationNo,
      //   keyType: "POSP_Consent",
      //   communicationId: 120,
      //   referenceId: quoteProposalOutput.finalResult.PartnerId,
      //   ICPDF: true,
      //   ISDMS: false,
      // };
      // postRequest(
      //   `Policy/SendNotification?PolicyNumber=${""}&EmailId=${data.ProposerDetails.EmailId}`,
      //   notificationRequests
      // ).then((result) => {
      //   console.log("result1", result);
      // });
      //   setOpen(true);
      //   } else if (paymentData.OutputResult.InputJson) {
      //     post(paymentData.OutputResult);
      //   } else {
      const paymentURL = paymentData.OutputResult.PaymentURL;
      window.location.href = paymentURL;
      //   }

      // const params = {
      //   "InputJson": {
      //     "ProposalAmount": "60241",
      //     "ProposalNo": "R23072200025",
      //     "UserID": "100002",
      //     "PaymentType": "1",
      //     "Responseurl": "http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/Policy/GetPaymentRedirection?PaymentRefNo=0599/0599/0018/00/000"
      //   },
      //   "ProposalNumber": "R23072200025",
      //   "PaymentURL": "https://rgipartners.reliancegeneral.co.in/PaymentIntegration/PaymentIntegration"
      // }
      // console.log("PaymentFormData", "inside");
      // post(params);
    }
  }, [paymentData]);

  // useEffect(() => {
  //   if (proposalDetails) {
  //     GetPaymentURL(
  //       partnerDetails.partnerProductId,
  //       proposalDetails.proposalNumber,
  //       setPaymentData
  //     );
  //   }
  // }, [proposalDetails]);

  return (
    <MDBox px={2}>
      <Grid m={2}>
        <Modal
          open={modalOpen}
          // onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <OTPModel
            handleOTP={handleOTP}
            otpdata={otpdata}
            handleModalClose={handleModalClose}
            customerDetails={customerDetails}
            handleotpverify={handleotpverify}
            handleModalEmailOpen={handleModalEmailOpen}
            handleEmailchange={handleEmailchange}
            flags={flags}
          />
        </Modal>
        <Modal
          open={modalEmailOpen}
          // onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ChangeEmailModel
            handleEmail={handleEmail}
            otpdata={otpdata}
            handleModalEmailClose={handleModalEmailClose}
            handleEmailchange={handleEmailchange}
            // handleotpverify={handleotpverify}
          />
        </Modal>
        <Grid container justifyContent="center">
          <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
            <MDTypography sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}>
              {/* {data.PartnerId === "62"
                  ? "Do you have your PAN Number"
                  : "Do you have your CKYC Number"} */}
              Do you have your CKYC Number
            </MDTypography>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ justifyContent: "center", ml: 2.5 }}
              defaultValue="Yes"
              value={isKyc}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </MDBox>
        </Grid>

        {data && data.KYC && isKyc === "Yes" ? (
          <>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              {/* {data.PartnerId === "62" ? "PAN Details" : "CKYC Details"} */}
              CKYC Details
            </MDTypography>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  id="CKYCNo"
                  // label={data.PartnerId === "62" ? "PAN Number" : "CKYC Number"}
                  label="CKYC Number"
                  value={data.KYC.CKYCNo}
                  name="CKYCNo"
                  onChange={handleChange}
                  // inputProps={data.PartnerId === "62" ? { maxLength: 10 } : { maxLength: 14 }}
                  inputProps={{ maxLength: 14 }}
                  required
                  onBlur={handleValidateKYC}
                  error={data.KYC.CKYCNo === "" ? kycflags.kycErrorFlag : null}
                />
                {kycflags.kycErrorFlag && data.KYC.CKYCNo === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="DOB"
                    inputFormat="dd-MM-yyyy"
                    type="login"
                    id="DOB"
                    value={
                      dateNew.dateOfBirth
                      // === null
                      //   ? data.ProposerDetails.DateOfBirth
                      //   : dateNew.dateOfBirth
                    }
                    onChange={(date) => handleDOBChange(date, "dateOfBirth", "DOB")}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        //   sx={{ width: "100%" }}
                        required
                        //   error={validDob}
                      />
                    )}
                  />
                  {kycflags.kycErrorFlag && data.KYC.DateOfBirth === null ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null}
                  {validDob && dateNew.dateOfBirth === null ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill the valid date
                    </MDTypography>
                  ) : null}
                </LocalizationProvider>
                {kycflags.ageDOBFlag ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the required fields
                  </MDTypography>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDButton variant="outlined" color="info" component="label">
                  Upload Photo
                  <input
                    hidden
                    accept="image/bmp, image/jpeg, image/png, .pdf"
                    type="file"
                    onChange={(e) => handleKycFileUpload(e, "Photo")}
                  />
                </MDButton>
                <MDTypography
                  sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                >
                  {KycUploadPhoto != null ? KycUploadPhoto.name : null}
                  {KycUploadPhoto != null && (
                    <CancelIcon
                      onClick={() => handleKycDeleteFile("Photo", KycUploadPhoto.name)}
                      color="primary"
                    />
                  )}
                </MDTypography>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container spacing={3}>
              <MDTypography
                variant="h6"
                sx={{ color: "#0071D9", fontSize: "1.25rem", marginTop: "60px" }}
              >
                Pan Card Details
              </MDTypography>
            </Grid>
            <Grid container spacing={3} direction="row">
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  id="PANNo"
                  label="Pan Card Number"
                  onChange={handleChange}
                  value={pan.PANNo}
                  name="PANNo"
                  inputProps={{ maxLength: 10 }}
                  required
                  onBlur={handleValidateKYC}
                  error={pan.PANNo === "" ? kycflags.kycErrorFlag : null}
                />
                {kycflags.kycErrorFlag && pan.PANNo === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
                {kycflags.pancardFlag && pan.PANNo !== "" && pan.PANNo.length < 10 ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill valid PAN Card No
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="DOB"
                    inputFormat="dd-MM-yyyy"
                    // type="login"
                    id="DOB"
                    value={
                      dateNew.dateOfBirth === null
                        ? data.ProposerDetails.DateOfBirth
                        : dateNew.dateOfBirth
                    }
                    onChange={(date) => handleDOBChange(date, "dateOfBirth", "DOB")}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        sx={{ width: "100%" }}
                        required
                        //   error={validDob}
                      />
                    )}
                  />
                  {kycflags.kycErrorFlag && data.KYC.DateOfBirth === null ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null}
                  {validDob && dateNew.dateOfBirth === null ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill the valid date
                    </MDTypography>
                  ) : null}
                </LocalizationProvider>
                {kycflags.ageDOBFlag ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the required fields
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDButton variant="outlined" color="info" component="label">
                  Upload Pan Card
                  <input
                    hidden
                    accept="image/bmp, image/jpeg, image/png, .pdf"
                    type="file"
                    onChange={(e) => handleKycFileUpload(e, "PAN")}
                  />
                </MDButton>
                <MDTypography
                  sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                >
                  {KycPanUpload != null ? KycPanUpload.name : null}
                  {KycPanUpload != null && (
                    <CancelIcon
                      onClick={() => handleKycDeleteFile("PAN", KycPanUpload.name)}
                      color="primary"
                    />
                  )}
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <MDTypography
                variant="h6"
                sx={{ color: "#0071D9", fontSize: "1.25rem", marginTop: "60px" }}
              >
                Other Documents
              </MDTypography>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  value={master.DocumentType}
                  id="DocumentType"
                  options={DocumentType || []}
                  getOptionLabel={(option) => option.mValue}
                  getOptionDisabled={(option) =>
                    option.mValue !== "Aadhar Number" && option.mValue !== "Passport"
                  }
                  disableClearable
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "5px!important",

                      // marginLeft: "-250px",
                    },
                  }}
                  onChange={handleDocumentTypeDropdown}
                  renderInput={(params) => (
                    <MDInput
                      label="Document Type"
                      // required
                      {...params}
                      // error={
                      //   Object.values(masters.MaritalStatus || {}).every(
                      //     (x) => x === null || x === ""
                      //   )
                      //     ? flags.errorFlag
                      //     : null
                      // }
                    />
                  )}
                />
                {/* {flags.errorFlag &&
                      Object.values(masters.MaritalStatus || {}).every(
                        (x) => x === null || x === ""
                      ) ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill required field
                        </MDTypography>
                      ) : null} */}
              </Grid>
              {master.DocumentType.mValue === "Aadhar Number" ||
              master.DocumentType.mValue === "Voter ID" ||
              master.DocumentType.mValue === "Passport" ||
              master.DocumentType.mValue === "Driving License" ||
              master.DocumentType.mValue === "GSTIN" ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    id="Aadhar"
                    // value={}
                    // onChange={}
                    value={data.KYC.OtherDocNumber}
                    onChange={handleKYCDetails}
                    label={`${master.DocumentType.mValue}`}
                    onBlur={handleValidateKycDocuments}
                    required
                    name="OtherDocNumber"
                  />
                  {kycflags.kycErrorFlag && data.KYC.OtherDocNumber === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                  {kycflags.validationError && data.KYC.OtherDocNumber !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      {`Please Fill the valid ${master.DocumentType.mValue}`}
                    </MDTypography>
                  ) : null}
                </Grid>
              ) : null}
              {master.DocumentType.mValue === "Aadhar Number" ? (
                <>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      value={name.FirstName}
                      onChange={handleadharname}
                      label="First Name"
                      name="FirstName"
                      helperText="Please fill you name as per Aadhar Card"
                      // disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      value={name.LastName}
                      onChange={handleadharname}
                      label="Last Name"
                      name="LastName"
                      helperText="Please fill you name as per Aadhar Card"
                      // disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    {/* <MDInput
                      id="Gender"
                      //   value={getValue("Gender", data.ProposerDetails.Gender)}
                      label="Gender"
                      name="Gender"
                      disabled
                    /> */}
                    <Autocomplete
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "5px!important",
                        },
                      }}
                      value={masters.Gender}
                      options={Gender}
                      getOptionLabel={(option) => option.mValue}
                      onChange={(event, value) => handleGenderChange(event, value)}
                      renderInput={(params) => (
                        <MDInput {...params} placeholder="Select" label="Gender" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      id="DateOfBirth"
                      value={data.ProposerDetails.DOB}
                      label="DateOfBirth"
                      name="DateOfBirth"
                      disabled
                    />
                  </Grid>
                </>
              ) : null}

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDButton
                  variant="outlined"
                  color="info"
                  // onClick={handleBack}
                  component="label"
                >
                  Upload Document
                  <input
                    hidden
                    accept="image/bmp, image/jpeg, image/png, .pdf"
                    type="file"
                    onChange={(e) => handleKycFileUpload(e, "Document")}
                  />
                </MDButton>

                <MDTypography
                  sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                >
                  {KycDocument != null ? KycDocument.name : null}
                  {KycDocument != null && (
                    <CancelIcon
                      onClick={() => handleKycDeleteFile("Document", KycDocument.name)}
                      color="primary"
                    />
                  )}
                </MDTypography>
              </Grid>
            </Grid>
          </>
        )}

        <Grid container justifyContent="center">
          <MDButton
            marginTop="30px"
            marginBottom="80px"
            color="info"
            variant="contained"
            sx={{ marginTop: "60px" }}
            onClick={isKyc === "Yes" ? handleSubmit : handleSubmitForNoCase}
            // onClick={handleModalOpen}
          >
            Submit
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default CKYC;
