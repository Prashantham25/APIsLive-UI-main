import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import Fade from "@mui/material/Fade";
import { CircularProgress } from "@mui/material";
import swal from "sweetalert";
import { KeyboardBackspace } from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";

import PageLayout from "examples/LayoutContainers/PageLayout";

// import breakpoints from "assets/theme/base/breakpoints";

// Authentication pages components;
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import CustEngage from "assets/images/BrokerPortal/CustEngage.png";

import { getOTP, GetOTP } from "./data";
import {
  setCustomerDetails,
  setGetQuoteOutput,
  useDataController,
  setCorporateDetails,
  setQuickQuoteOutput,
} from "../../context";
import { GetQuote, generateQuickQuote } from "../MotorQuote/data";
import { postRequest } from "../../../../core/clients/axiosclient";
// import appConfig from "../../../../jsconfig.json";

// function Loading({ loading, quoteNumber, dispatch }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (loading === false) {
//       GetQuote(dispatch, quoteNumber);
//       navigate(`/modules/BrokerPortal/Pages/MotorComparison`, { replace: true });
//     }
//   }, [loading]);

//   return (
//     <MDBox
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       sx={{ width: window.innerWidth, height: window.innerHeight }}
//     >
//       <Fade
//         in={loading}
//         style={{
//           transitionDelay: loading ? "0ms" : "0ms",
//         }}
//       >
//         <CircularProgress size="10rem" />
//       </Fade>
//     </MDBox>
//   );
// }

function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Resend OTP in 00:{counter}</div>;
}

function CustomerEngage() {
  // const imageVisibility = window.innerWidth < breakpoints.values.xl ? "hidden" : "visible";
  // const [myValue, setValue] = useState('')
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(`/modules/BrokerPortal/Pages/MotorQuote/InputSummary`);
  };
  // const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  // const [view, setView] = useState(false);
  const [value, setValue] = useState("5");
  const [counter, setCounter] = useState(30);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [cust, setCust] = useState({
    FirstName: "",
    LastName: "",
    phoneno: "",
    otp: "",
    email: "",
    status: false,
    PlanError: false,
    NumberError: false,
    EmailError: false,
  });
  const [corporate, setCorporate] = useState({
    CompanyName: "",
    SPOCName: "",
    mobileNo: "",
    otp: "",
    email: "",
    ViewError: false,
    NumberError: false,
    EmailError: false,
  });
  const [controller, dispatch] = useDataController();
  const { quickQuoteOutput, quickQuoteInput } = controller;
  console.log("quickQuoteInput", quickQuoteInput);
  // const { quoteDetails } = controller.quickQuoteOutput;
  // console.log(quoteDetails.quoteNumber);

  const onhandleChange = async (e) => {
    if (e.target.name === "phoneno") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setCust((prevState) => ({
          ...prevState,
          NumberError: false,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === "email") {
      setCust((prevState) => ({
        ...prevState,
        EmailError: false,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const onhandleChangeCorporate = async (e) => {
    if (e.target.name === "mobileNo") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setCorporate((prevState) => ({
          ...prevState,
          NumberError: false,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === "email") {
      setCorporate((prevState) => ({
        ...prevState,
        EmailError: false,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const onChange = async (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      setCust({ ...cust, [e.target.name]: e.target.checked });
    } else if (e.target.name === "FirstName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...cust, [e.target.name]: e.target.value };
          quickQuoteInput.CustomerDetails.FirstName = e.target.value;

          setCust(newValue);
        }
      }
    } else if (e.target.name === "LastName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...cust, [e.target.name]: e.target.value };
          quickQuoteInput.CustomerDetails.LastName = e.target.value;

          setCust(newValue);
        }
      }
    } else if (e.target.name === "phoneno") {
      console.log("asdf", e.target.name);
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setCust((prevState) => ({ ...prevState, NumberError: true }));
      } else {
        setCust((prevState) => ({ ...prevState, NumberError: false }));
        quickQuoteInput.CustomerDetails.phoneno = e.target.value;
      }
    } else if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(e.target.value)) {
        setCust((prevState) => ({ ...prevState, EmailError: true }));
      } else {
        setCust((prevState) => ({ ...prevState, EmailError: false }));
        quickQuoteInput.CustomerDetails.email = e.target.value;
      }
    } else {
      setCust({ ...cust, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (quickQuoteOutput !== null) setLoading(false);
    console.log(loading);
  }, [quickQuoteOutput]);

  const handleViewPlans = async () => {
    // const quoteNo = quickQuoteOutput.quoteDetails.quoteNumber;
    // console.log("quoteNo",  customerJson);
    // if (quickQuoteOutput !== null) {
    const res = await generateQuickQuote(quickQuoteInput);
    setQuickQuoteOutput(dispatch, { ...res });
    GetQuote(dispatch, res.quoteDetails.quoteNumber);
    navigate(`/modules/BrokerPortal/Pages/MotorComparison`, { replace: true });

    // setView(true);
    setLoading(false);
    // await postRequest(`Quotation/UpdateQuote?QuoteNumber=${quoteNo}`, customerJson).then(
    //   (result) => {
    //     if (result.status === 200) {
    //       console.log("result", result);
    //       setView(true);
    //       setLoading(false);
    //       console.log(loading);
    //     }
    //   }
    // );
    // }
  };
  const onChangeCorporate = (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      setCorporate({ ...corporate, [e.target.name]: e.target.checked });
    } else if (e.target.name === "CompanyName") {
      const nameReg = /^[a-zA-Z\s]+$/;

      if (nameReg.test(e.target.value) || e.target.value === "") {
        const newValue = { ...corporate, [e.target.name]: e.target.value };

        quickQuoteInput.CorporateDetails.CompanyName = e.target.value;

        setCorporate(newValue);
      }
    } else if (e.target.name === "SPOCName") {
      const nameReg = /^[a-zA-Z\s]+$/;

      if (nameReg.test(e.target.value) || e.target.value === "") {
        const newValue = { ...corporate, [e.target.name]: e.target.value };

        quickQuoteInput.CorporateDetails.SPOCName = e.target.value;

        setCorporate(newValue);
      }
    } else if (e.target.name === "mobileNo") {
      console.log("asdf", e.target.name);

      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;

      if (!numRegex.test(e.target.value)) {
        // const newValue = { ...customer, [e.target.name]: e.target.value };

        // setCustomer(newValue);

        setCorporate((prevState) => ({ ...prevState, NumberError: true }));
      } else {
        setCorporate((prevState) => ({ ...prevState, NumberError: false }));

        quickQuoteInput.CorporateDetails.mobileNo = corporate.mobileNo;
      }
    } else if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;

      if (!emailRegex.test(e.target.value)) {
        // const newValue = { ...customer, [e.target.name]: e.target.value };

        // setCustomer(newValue);

        setCorporate((prevState) => ({ ...prevState, EmailError: true }));
      } else {
        setCorporate((prevState) => ({ ...prevState, EmailError: false }));

        quickQuoteInput.CorporateDetails.email = e.target.value;
      }
    } else {
      setCorporate({ ...corporate, [e.target.name]: e.target.value });
    }
  };
  const routeMotor = () => {
    if (value === "5") {
      const custJson = {
        FirstName: cust.FirstName,
        LastName: cust.LastName,
        MobileNo: cust.phoneno,
        Email: cust.email,
      };
      setCustomerDetails(dispatch, custJson);
      setGetQuoteOutput(dispatch, null);
      handleViewPlans(custJson);
    }
    if (value === "8") {
      const corpJson = {
        CompanytName: corporate.CompanyName,

        SPOCName: corporate.SPOCName,

        MobileNo: corporate.mobileNo,

        Email: corporate.email,
      };

      setCustomerDetails(dispatch, corpJson);

      setCorporateDetails(dispatch, corpJson);

      setGetQuoteOutput(dispatch, null);

      handleViewPlans(corpJson);
    }
  };

  const onSendOTP = async () => {
    if (
      (value === "5" && cust.FirstName === "") ||
      (value === "5" && cust.LastName === "") ||
      (value === "5" && cust.phoneno === "") ||
      (value === "5" && cust.NumberError === true) ||
      (value === "5" && cust.email === "") ||
      (value === "5" && cust.EmailError === true) ||
      (value === "8" && corporate.CompanyName === "") ||
      (value === "8" && corporate.email === "") ||
      (value === "8" && corporate.EmailError === true) ||
      (value === "8" && corporate.SPOCName === "") ||
      (value === "8" && corporate.mobileNo === "") ||
      (value === "8" && corporate.NumberError === true)
    ) {
      if (value === "5") setCust((prevState) => ({ ...prevState, PlanError: true }));
      else setCorporate((prevState) => ({ ...prevState, ViewError: true }));
    } else {
      // const count = counter;
      // setStartCounterFlag(true);
      // Timer(count);
      // setCust((prevState) => ({ ...prevState, counterFlag: true }));
      // setCust((prevState) => ({ ...prevState, timerflag: true }));

      const sendOTP = {
        name: cust.FirstName,
        otp: "1234",
        email: value === "5" ? cust.email : corporate.email,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: value === "5" ? cust.phoneno : corporate.mobileNo,
        sendSms: true,
        isBerry: false,
        client: "iNube BrokerPortal",
      };
      // await getOTP(sendOTP);
      getOTP(sendOTP).then((result) => {
        if (result.status === 1) {
          setCust((prevState) => ({ ...prevState, status: true }));
          setStartCounterFlag(true);
          setCounter(30);
        } else {
          setCust((prevState) => ({ ...prevState, status: false }));
        }
        console.log("result", result);
      });
    }
  };

  const verifyOTP1 = async () => {
    const verifyOTP = {
      otp: cust.otp,
      email: value === "5" ? cust.email : corporate.email,
      mobileNumber: value === "5" ? cust.phoneno : corporate.mobileNo,
      userName: value === "5" ? cust.email : corporate.email,
      envId: process.env.REACT_APP_EnvId,
      productType: "MICA",
      isFirstTimeUser: true,
      isClaimsLive: false,
    };
    await GetOTP(verifyOTP).then((results) => {
      console.log("OTP Result", results);
      if (results !== null) {
        if (results.status === 1) {
          setStartCounterFlag(false);
          setCounter(0);
          routeMotor();
        } else {
          swal({
            icon: "error",
            text: "Please Enter Valid OTP Sent to your Email",
          });
        }
      } else {
        swal({
          icon: "error",
          text: "Please try after sometime",
        });
      }
      // if (results.data.status === 4) {

      // } else if (results.status === 1) {
      //   routeMotor();
      // }
    });
  };

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }
    if (counter === 0) {
      setCounter(30);
      setStartCounterFlag(false);
      setCust((prevState) => ({ ...prevState, status: false }));
      setTimerFlag(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);
  const [loaderFlg, setLoaderFlag] = useState(false);
  const onVerifyOTP = async () => {
    setLoaderFlag(false);
    if (value === "5") {
      if (
        cust.email === "" ||
        cust.phoneno === "" ||
        cust.FirstName === "" ||
        cust.LastName === "" ||
        cust.otp === "" ||
        cust.EmailError === true ||
        cust.NumberError === true
      ) {
        setCust((prevState) => ({ ...prevState, PlanError: true }));
      } else {
        const createCus = {
          userName: cust.email,
          normalizedUserName: "",
          email: cust.email,
          emailConfirmed: true,
          phoneNumber: cust.phoneno,
          phoneNumberConfirmed: true,
          twoFactorEnabled: true,
          lockoutEnd: "2022-12-22T06:42:55.960Z",
          lockoutEnabled: false,
          accessFailedCount: 0,
          firstTimeLogin: 0,
          customerID: 0,
          envId: 297,
          isActive: true,
          lastPasswordChanged: "2022-12-22T06:42:55.960Z",
          isNotify: true,
          defNumber: "0",
          userDetails: [
            {
              nodeId: 0,
              userName: cust.email,
              status: true,
              createdDate: new Date(),
              locked: false,
              lockStartDate: "2022-12-22T06:42:55.961Z",
              lockEndDate: "2022-12-22T06:42:55.961Z",
              salutationId: 0,
              firstName: cust.FirstName,
              middleName: "string",
              lastName: cust.LastName,
              dob: "2022-12-22T06:42:55.961Z",
              doj: "2022-12-22T06:42:55.961Z",
              genderId: 0,
              email: cust.email,
              contactNumber: cust.phoneno,
              userTypeId: 0,
              lastLoginDateTime: "2022-12-22T06:42:55.961Z",
              isIos: true,
              isAndroid: true,
              isWindows: true,
              isPasswordChanged: true,
              organizationId: 112,
              partnerId: 0,
              maritalStatusId: 0,
              modifiedDate: "2022-12-22T06:42:55.961Z",
              isActive: true,
              userlocked: true,
            },
          ],
          userAddress: [
            {
              userAddressId: 0,
              userCountryId: 0,
              userStateId: 0,
              userDistrictId: 0,
              userAddressLine1: "qrere",
              userCityId: 0,
              userPincodeId: 0,
            },
          ],
          isUserCreationMailRequired: false,
        };
        postRequest(`UserProfile/CreateProfileUser`, createCus);
        setCust((prevState) => ({ ...prevState, PlanError: false }));
        await verifyOTP1();
      }
    }
    if (value === "8") {
      if (
        corporate.CompanyName === "" ||
        corporate.SPOCName === "" ||
        corporate.mobileNo === "" ||
        corporate.email === "" ||
        cust.otp === "" ||
        corporate.NumberError === true ||
        corporate.EmailError === true
      ) {
        setCorporate((prevState) => ({ ...prevState, ViewError: true }));
      }
      if (corporate.EmailError === false && corporate.NumberError === false) {
        const createCorp = {
          userName: corporate.email,

          normalizedUserName: "",

          email: corporate.email,

          emailConfirmed: true,

          phoneNumber: corporate.mobileNo,

          phoneNumberConfirmed: true,

          twoFactorEnabled: true,

          lockoutEnd: "2022-12-22T06:42:55.960Z",

          lockoutEnabled: false,

          accessFailedCount: 0,

          firstTimeLogin: 0,

          customerID: 0,

          envId: 297,

          isActive: true,

          lastPasswordChanged: "2022-12-22T06:42:55.960Z",

          isNotify: true,

          defNumber: "0",

          userDetails: [
            {
              nodeId: 0,

              userName: corporate.email,

              status: true,

              createdDate: new Date(),

              locked: false,

              lockStartDate: "2022-12-22T06:42:55.961Z",

              lockEndDate: "2022-12-22T06:42:55.961Z",

              salutationId: 0,

              CompanyName: corporate.CompanyName,

              SPOCName: corporate.SPOCName,

              dob: "2022-12-22T06:42:55.961Z",

              doj: "2022-12-22T06:42:55.961Z",

              genderId: 0,

              email: corporate.email,

              contactNumber: corporate.email,

              userTypeId: 0,

              lastLoginDateTime: "2022-12-22T06:42:55.961Z",

              isIos: true,

              isAndroid: true,

              isWindows: true,

              isPasswordChanged: true,

              organizationId: 112,

              partnerId: 0,

              maritalStatusId: 0,

              modifiedDate: "2022-12-22T06:42:55.961Z",

              isActive: true,

              userlocked: true,
            },
          ],

          userAddress: [
            {
              userAddressId: 0,

              userCountryId: 0,

              userStateId: 0,

              userDistrictId: 0,

              userAddressLine1: "qrere",

              userCityId: 0,

              userPincodeId: 0,
            },
          ],

          isUserCreationMailRequired: false,
        };

        postRequest(`UserProfile/CreateProfileUser`, createCorp);

        setCorporate((prevState) => ({ ...prevState, ViewError: false }));

        // routeMotor();
        await verifyOTP1();
      }
    }

    // GenerateQuickQuote(dispatch, quickQuoteInput);

    setLoaderFlag(true);
  };
  // const [value, setValue] = React.useState("Individual");

  // radio onChangr
  const handleChange = (event) => {
    quickQuoteInput.CustomerType = event.target.value;

    quickQuoteInput.ChannelDetails.CustomerType = event.target.value;

    setValue(event.target.value);
  };
  const handleCustomerPolicy = () => {
    window.open(process.env.REACT_APP_CustomerPolicy, "_blank");
  };
  const handleCustomerTerm = () => {
    window.open(process.env.REACT_APP_CustomerTerm, "_blank");
  };

  return (
    <MDBox>
      {/* {view ? (
        <Loading
          loading={loading}
          quoteNumber={quickQuoteOutput ? quickQuoteOutput.quoteDetails.quoteNumber : null}
          dispatch={dispatch}
        />
      ) : ( */}
      <PageLayout>
        <BPNavbar />
        <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", mt: 2 }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
                <MDBox display="flex" flexDirection="row" sx={{ mt: "3rem", ml: "2rem" }}>
                  <KeyboardBackspace />
                  <MDTypography variant="body1" sx={{ fontSize: 13 }} onClick={handleClickBack}>
                    Back
                  </MDTypography>
                </MDBox>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.5rem", ml: "2rem" }}>
                    Engage your customer
                  </MDTypography>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDBox component="img" src={CustEngage} width="100%" height="100%" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Grid container spacing={3} sx={{ mt: 6, px: 2, textAlign: "center" }}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDTypography
                          variant="body1"
                          sx={{ textAlign: "center", fontSize: "1.25rem", color: "#0071D9" }}
                        >
                          {" "}
                          Please fill Customer Details{" "}
                        </MDTypography>
                      </Grid>
                      <FormControl sx={{ ml: "15rem" }}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={value}
                          onChange={handleChange}
                        >
                          <FormControlLabel value="5" control={<Radio />} label="Individual" />
                          <FormControlLabel value="8" control={<Radio />} label="Corporate" />
                        </RadioGroup>
                      </FormControl>
                      {value === "5" ? (
                        <>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              name="FirstName"
                              value={cust.FirstName}
                              label="First Name"
                              onChange={onChange}
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                              }}
                            />
                            {cust.PlanError === true && cust.FirstName === "" ? (
                              <MDTypography
                                sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                              >
                                Please fill the required field
                              </MDTypography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              name="LastName"
                              value={cust.LastName}
                              label="Last Name"
                              onChange={onChange}
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                              }}
                            />
                            {cust.PlanError === true && cust.LastName === "" ? (
                              <MDTypography
                                sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                              >
                                Please fill the required field
                              </MDTypography>
                            ) : null}
                          </Grid>

                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              name="phoneno"
                              value={cust.phoneno}
                              label="Phone No"
                              onChange={onhandleChange}
                              onBlur={onChange}
                              inputProps={{ maxLength: 10 }}
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                              }}
                              // onChange={onChange}
                            />
                            {cust.PlanError === true && cust.phoneno === "" ? (
                              <MDTypography
                                sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                              >
                                Please fill the required field
                              </MDTypography>
                            ) : null}
                            {cust.NumberError === true && cust.phoneno !== "" ? (
                              <MDTypography
                                sx={{
                                  color: "red",
                                  fontSize: "0.9rem",
                                  textAlign: "left",
                                }}
                              >
                                Enter valid 10 digit Valid Mobile Number
                              </MDTypography>
                            ) : null}
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                            <MDInput
                              name="email"
                              value={cust.email}
                              label="Email ID"
                              onChange={onhandleChange}
                              onBlur={onChange}
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                              }}
                              // onChange={onChange}
                            />
                            {cust.PlanError === true && cust.email === "" ? (
                              <MDTypography
                                sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                              >
                                Please fill the required field
                              </MDTypography>
                            ) : null}
                            {cust.EmailError === true && cust.email !== "" ? (
                              <MDTypography
                                sx={{
                                  color: "red",
                                  fontSize: "0.9rem",
                                  textAlign: "left",
                                }}
                              >
                                Enter Valid Email ID
                              </MDTypography>
                            ) : null}
                          </Grid>
                        </>
                      ) : null}
                      {value === "8" && (
                        <>
                          {/* <Grid container spacing={2}> */}
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              name="CompanyName"
                              value={corporate.CompanyName}
                              label="Company Full Name"
                              onChange={onChangeCorporate}
                              // disabled={fillDetails === true}
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                                // ml: "8rem",
                              }}
                            />

                            {corporate.ViewError === true && corporate.CompanyName === "" ? (
                              <MDTypography
                                sx={{
                                  color: "red",

                                  fontSize: "0.9rem",

                                  textAlign: "left",

                                  // ml: "8rem",
                                }}
                              >
                                Please fill the required field
                              </MDTypography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              name="email"
                              value={corporate.email}
                              label="Company Email ID"
                              onChange={onhandleChangeCorporate}
                              // disabled={fillDetails === true}
                              // onChange={(e) => {

                              //   setCustomer({ ...customer, [e.target.name]: e.target.value });

                              // }}

                              onBlur={onChangeCorporate}
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                                // ml: "8rem",
                              }}
                            />

                            {corporate.ViewError === true && corporate.email === "" ? (
                              <MDTypography
                                sx={{
                                  color: "red",

                                  fontSize: "0.9rem",

                                  textAlign: "left",

                                  // ml: "8rem",
                                }}
                              >
                                Please fill the required field
                              </MDTypography>
                            ) : null}

                            {corporate.EmailError === true && corporate.email !== "" ? (
                              <MDTypography
                                sx={{
                                  color: "red",

                                  fontSize: "0.9rem",

                                  textAlign: "left",

                                  // ml: "8rem",
                                }}
                              >
                                Enter Valid Email ID
                              </MDTypography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              name="SPOCName"
                              value={corporate.SPOCName}
                              label="Company SPOC Name"
                              onChange={onChangeCorporate}
                              // disabled={fillDetails === true}
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                                // ml: "8rem",
                              }}
                            />

                            {corporate.ViewError === true && corporate.SPOCName === "" ? (
                              <MDTypography
                                sx={{
                                  color: "red",

                                  fontSize: "0.9rem",

                                  textAlign: "left",

                                  // ml: "8rem",
                                }}
                              >
                                Please fill the required field
                              </MDTypography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <MDInput
                              name="mobileNo"
                              value={corporate.mobileNo}
                              label="Company SPOC Mobile Number"
                              onChange={onhandleChangeCorporate}
                              // disabled={fillDetails === true}
                              // onChange={(e) => {

                              //   setCustomer({ ...customer, [e.target.name]: e.target.value });

                              // }}

                              onBlur={onChangeCorporate}
                              inputProps={{ maxLength: 10 }}
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                                // ml: "8rem",
                              }}
                            />

                            {corporate.ViewError === true && corporate.mobileNo === "" ? (
                              <MDTypography
                                sx={{
                                  color: "red",

                                  fontSize: "0.9rem",

                                  textAlign: "left",

                                  // ml: "8rem",
                                }}
                              >
                                Please fill the required field
                              </MDTypography>
                            ) : null}

                            {corporate.NumberError === true && corporate.mobileNo !== "" ? (
                              <MDTypography
                                sx={{
                                  color: "red",

                                  fontSize: "0.9rem",

                                  textAlign: "left",

                                  // ml: "8rem",
                                }}
                              >
                                Enter 10 digit Valid mobile No
                              </MDTypography>
                            ) : null}
                          </Grid>

                          {/* </Grid> */}
                        </>
                      )}
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          name="otp"
                          value={cust.otp}
                          label="Verify OTP"
                          onChange={onChange}
                          inputProps={{ maxLength: 6, type: "password" }}
                        />
                        {cust.PlanError === true && cust.otp === "" ? (
                          <MDTypography
                            sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                          >
                            Please fill the OTP
                          </MDTypography>
                        ) : null}
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Grid container justifyContent="space-between" sx={{ marginTop: "0.8rem" }}>
                          {startCounterFlag === false && (
                            <MDTypography
                              sx={{
                                color: "#1976D2",
                                fontSize: "0.875rem",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={onSendOTP}
                            >
                              {timerFlag === true ? <div>Resend OTP</div> : <div>Get OTP</div>}
                            </MDTypography>
                          )}
                        </Grid>
                      </Grid>

                      {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                         
                          <Grid
                            container
                            justifyContent="space-between"
                            sx={{ marginTop: "0.8rem" }}
                          >
                            <MDTypography
                              sx={{
                                color: "#1976D2",
                                fontSize: "0.875rem",
                               
                                cursor: "pointer",
                              }}
                              onClick={onSendOTP}
                              disabled={disable}
                            >
                              Resend OTP
                              {timerFlag === true ? setDisable(false) : null}
                            </MDTypography>
                            

                            <MDTypography
                              sx={{
                                color: "#1976D2",
                                fontSize: "0.875rem",
                               
                                cursor: "pointer",
                              }}
                              onClick={onSendOTP}
                            >
                              Send OTP
                            </MDTypography>
                          </Grid>
                        </Grid> */}

                      <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                        {cust.status === true ? (
                          <MDTypography
                            sx={{
                              fontSize: "0.9rem",
                              color: "green",
                              textAlign: "left",
                              mt: "-1rem",
                            }}
                          >
                            OTP sent successfully
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                        <MDTypography
                          sx={{
                            fontSize: "0.9rem",
                            color: "green",
                            textAlign: "left",
                            mt: "-1rem",
                          }}
                        >
                          {startCounterFlag && <Timer counter={counter} />}
                        </MDTypography>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDTypography sx={{ ml: "0.2rem", fontSize: "0.9rem", textAlign: "left" }}>
                          By clicking View Plans, I agree to
                          <span
                            style={{
                              color: "#0071D9",
                              cursor: "pointer",
                              textDecoration: "underline",
                              marginLeft: "5px",
                            }}
                            onClick={handleCustomerTerm}
                            role="button"
                            onKeyDown={handleCustomerTerm}
                            tabIndex="0"
                          >
                            terms & conditions
                          </span>
                          <span
                            style={{
                              marginLeft: "5px",
                            }}
                          >
                            &
                          </span>
                          <span
                            style={{
                              color: "#0071D9",
                              cursor: "pointer",
                              textDecoration: "underline",
                              marginLeft: "5px",
                            }}
                            onClick={handleCustomerPolicy}
                            role="button"
                            onKeyDown={handleCustomerPolicy}
                            tabIndex="0"
                          >
                            privacy policy
                          </span>
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} textAlign="right">
                        <MDButton
                          sx={{ mt: "2rem" }}
                          onClick={onVerifyOTP}
                          startIcon={loaderFlg && <CircularProgress color="white" size={24} />}
                        >
                          View Plans
                        </MDButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </PageLayout>
      {/* )} */}
    </MDBox>
  );
}

export default CustomerEngage;
