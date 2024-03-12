import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Fade from "@mui/material/Fade";
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
import { setCustomerDetails, setGetQuoteOutput, useDataController } from "../../../../context";
import { GetQuote } from "../../data/index";
import { postRequest } from "../../../../../../core/clients/axiosclient";
// import appConfig from "../../../../jsconfig.json";

function Loading({ loading, quoteNumber, dispatch }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false) {
      GetQuote(dispatch, quoteNumber);
      navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteComparision`, {
        replace: true,
      });
    }
  }, [loading]);

  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "0ms" : "0ms",
        }}
      >
        <CircularProgress size="10rem" />
      </Fade>
    </MDBox>
  );
}

function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Resend OTP in 00:{counter}</div>;
}

function TravelCustomerDetails() {
  // const imageVisibility = window.innerWidth < breakpoints.values.xl ? "hidden" : "visible";
  // const [myValue, setValue] = useState('')
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(`/modules/BrokerPortal/Pages/MotorQuote/InputSummary`);
  };
  // const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);

  const [counter, setCounter] = useState(30);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [cust, setCust] = useState({
    FirstName: "",
    LastName: "",
    MobileNo: "",
    otp: "",
    Email: "",
    status: false,
    PlanError: false,
    NumberError: false,
    EmailError: false,
    firstnameError: false,
    lastnameError: false,
  });
  const [controller, dispatch] = useDataController();
  const { quickQuoteOutput, customerDetails } = controller;
  // const { quoteDetails } = controller.quickQuoteOutput;
  // console.log(quoteDetails.quoteNumber);

  const onhandleChange = async (e) => {
    if (e.target.name === "MobileNo") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setCust((prevState) => ({
          ...prevState,
          NumberError: false,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === "Email") {
      setCust((prevState) => ({
        ...prevState,
        EmailError: false,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleBasicChange = (event) => {
    if (event.target.name === "FirstName") {
      const firstnameError = /^[a-zA-Z\s]+$/;
      if (!firstnameError.test(event.target.value))
        setCust((prevState) => ({ ...prevState, firstnameError: true }));
      else setCust((prevState) => ({ ...prevState, firstnameError: false }));
    }
    if (event.target.name === "LastName") {
      const lastnameError = /^[a-zA-Z\s]+$/;
      if (!lastnameError.test(event.target.value))
        setCust((prevState) => ({ ...prevState, lastnameError: true }));
      else setCust((prevState) => ({ ...prevState, lastnameError: false }));
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
          setCust(newValue);
        }
      }
    } else if (e.target.name === "LastName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...cust, [e.target.name]: e.target.value };
          setCust(newValue);
        }
      }
    } else if (e.target.name === "MobileNo") {
      console.log("asdf", e.target.name);
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setCust((prevState) => ({ ...prevState, NumberError: true }));
      } else {
        setCust((prevState) => ({ ...prevState, NumberError: false }));
      }
    } else if (e.target.name === "Email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(e.target.value)) {
        setCust((prevState) => ({ ...prevState, EmailError: true }));
      } else {
        setCust((prevState) => ({ ...prevState, EmailError: false }));
      }
    } else {
      setCust({ ...cust, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (quickQuoteOutput !== null) setLoading(false);
    console.log(loading);
  }, [quickQuoteOutput]);

  const handleViewPlans = async (customerJson) => {
    const quoteNo = quickQuoteOutput.quoteDetails.quoteNumber;
    console.log("quoteNo", quoteNo, customerJson);
    if (quickQuoteOutput !== null) {
      await postRequest(`Quotation/UpdateQuote?QuoteNumber=${quoteNo}`, customerJson).then(
        (result) => {
          if (result.status === 200) {
            console.log("result", result);
            setView(true);
            setLoading(false);
            console.log(loading);
          }
        }
      );
    }
  };

  const handleClickBack1 = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelDetails`);
  };

  const routeTravel = () => {
    const custJson = {
      FirstName: cust.FirstName,
      LastName: cust.LastName,
      MobileNo: cust.MobileNo,
      Email: cust.Email,
    };
    setCustomerDetails(dispatch, custJson);
    setGetQuoteOutput(dispatch, null);
    handleViewPlans(custJson);
  };

  const onSendOTP = async () => {
    // const count = counter;
    // setStartCounterFlag(true);
    // Timer(count);
    // setCust((prevState) => ({ ...prevState, counterFlag: true }));
    // setCust((prevState) => ({ ...prevState, timerflag: true }));
    const sendOTP = {
      name: cust.FirstName,
      otp: "1234",
      email: cust.Email,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: cust.MobileNo,
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
  };

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

  const onVerifyOTP = async () => {
    if (
      cust.Email === "" ||
      cust.MobileNo === "" ||
      cust.FirstName === "" ||
      cust.LastName === "" ||
      cust.otp === "" ||
      cust.EmailError === true ||
      cust.NumberError === true
    ) {
      setCust((prevState) => ({ ...prevState, PlanError: true }));
    } else {
      const createCus = {
        userName: cust.Email,
        normalizedUserName: "",
        email: cust.Email,
        emailConfirmed: true,
        phoneNumber: cust.MobileNo,
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
            userName: cust.Email,
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
            email: cust.Email,
            contactNumber: cust.MobileNo,
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
      const verifyOTP = {
        otp: cust.otp,
        email: cust.Email,
        mobileNumber: cust.MobileNo,
        userName: cust.Email,
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      GetOTP(verifyOTP).then((results) => {
        console.log("OTP Result", results);
        if (results !== null) {
          if (results.status === 1) {
            setStartCounterFlag(false);
            setCounter(0);
            routeTravel();
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
    }
  };

  useEffect(() => {
    if (customerDetails && customerDetails.FirstName && customerDetails.FirstName !== "")
      setCust({ ...cust, ...customerDetails });
    // setdisable(false);
  }, [customerDetails]);
  return (
    <MDBox>
      {view ? (
        <Loading
          loading={loading}
          quoteNumber={quickQuoteOutput ? quickQuoteOutput.quoteDetails.quoteNumber : null}
          dispatch={dispatch}
        />
      ) : (
        <PageLayout>
          <BPNavbar />
          <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4 }}>
            <MDBox display="flex" flexDirection="row">
              <KeyboardBackspace />
              <MDTypography variant="body1" sx={{ fontSize: 13 }} onClick={handleClickBack}>
                Back
              </MDTypography>
            </MDBox>
            <Grid container>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                  Engage your customer
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Card
                  position="inline"
                  sx={{ borderRadius: "0", mt: 3, border: `1px solid #3E7BAB` }}
                >
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
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="FirstName"
                            value={cust.FirstName}
                            label="First Name"
                            onChange={onChange}
                            onBlur={handleBasicChange}
                            placeholder="Enter first name"
                            required
                          />
                          {cust.PlanError === true && cust.FirstName === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null}
                          {cust.firstnameError === true && cust.FirstName === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Enter First Name
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="LastName"
                            value={cust.LastName}
                            label="Last Name"
                            onChange={onChange}
                            onBlur={handleBasicChange}
                            placeholder="Enter last name"
                            required
                          />
                          {cust.PlanError === true && cust.LastName === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null}
                          {cust.lastnameError === true && cust.LastName === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Enter Last Name
                            </MDTypography>
                          ) : null}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="MobileNo"
                            value={cust.MobileNo}
                            label="Phone No"
                            onChange={onhandleChange}
                            onBlur={onChange}
                            placeholder="xxxxxxxxxx"
                            inputProps={{ maxLength: 10 }}
                            required
                            // onChange={onChange}
                          />
                          {cust.PlanError === true && cust.MobileNo === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null}
                          {cust.NumberError === true && cust.MobileNo !== "" ? (
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
                          {cust.NumberError === true && cust.MobileNo === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Please Enter Mobile Number
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="Email"
                            value={cust.Email}
                            label="Email ID"
                            onChange={onhandleChange}
                            onBlur={onChange}
                            placeholder="example@gmail.com"
                            required
                            // onChange={onChange}
                          />
                          {cust.PlanError === true && cust.Email === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null}
                          {cust.EmailError === true && cust.Email !== "" ? (
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
                          {cust.EmailError === true && cust.Email === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Please Enter the EmailId
                            </MDTypography>
                          ) : null}
                          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                            <Grid container justifyContent="space-between">
                              <MDTypography
                                sx={{
                                  color: "#1976D2",
                                  fontSize: "0.875rem",
                                  // textAlign: "end",
                                  cursor: "pointer",
                                  position: "absolute",
                                  right: 332,
                                }}
                                onClick={onSendOTP}
                              >
                                {timerFlag === true ? <div>Resend OTP</div> : null}
                                {timerFlag === false ? (
                                  <div>
                                    <u>GetOTP</u>
                                  </div>
                                ) : null}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="otp"
                            value={cust.otp}
                            label="Verify OTP"
                            onChange={onChange}
                            inputProps={{ maxLength: 6, type: "password" }}
                            placeholder="XXXX"
                          />
                          {cust.PlanError === true && cust.otp === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the OTP
                            </MDTypography>
                          ) : null}
                          {/* <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                            <MDTypography
                              sx={{
                                fontSize: "0.9rem",
                                color: "green",
                                position: "absolute",
                                mt: "0rem",
                              }}
                            >
                              {startCounterFlag && <Timer counter={counter} />}
                            </MDTypography>
                          </Grid> */}
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
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
                          <Grid
                            container
                            justifyContent="space-between"
                            sx={{ marginTop: "0.8rem" }}
                          >
                            <MDTypography
                              sx={{
                                color: "#1976D2",
                                fontSize: "0.875rem",
                                //  textAlign: "end",
                                cursor: "pointer",
                              }}
                              onClick={onSendOTP}
                            >
                              {timerFlag === true ? <div>Resend OTP</div> : null}
                              {timerFlag === false ? <div>Send OTP</div> : null}
                            </MDTypography>
                          </Grid>
                        </Grid> */}

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

                        <Grid container justifyContent="space-between" pt={2}>
                          <Grid item xs={4} sm={4} textAlign="left">
                            <MDButton
                              variant="outlined"
                              onClick={handleClickBack1}
                              sx={{ mt: "1rem", ml: "20px" }}
                            >
                              BACK
                            </MDButton>
                          </Grid>
                          <Grid item xs={5} sm={5} textAlign="right">
                            <MDButton sx={{ mt: "1rem" }} onClick={onVerifyOTP}>
                              View Quotes
                            </MDButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </PageLayout>
      )}
    </MDBox>
  );
}

export default TravelCustomerDetails;
