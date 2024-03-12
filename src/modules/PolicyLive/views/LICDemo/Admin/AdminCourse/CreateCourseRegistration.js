import React, { useState, useEffect } from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbarEmpty from "modules/BrokerPortal/Layouts/BPNavbarEmpty";
import { Circle } from "@mui/icons-material";
import { Grid, Modal, Link } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";
import swal from "sweetalert";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { FormControl } from "@mui/material";
import POSPREg from "assets/images/BrokerPortal/POSPReg.png";
import { useNavigate } from "react-router-dom";
// import breakpoints from "assets/theme/base/breakpoints";
import {
  setSalesLoginResponse,
  useDataController,
  setInterviewLoginFlag,
  setAdminLoginFlag,
} from "../../../context";
import { GetLOGIN } from "./data/index";
import { getOTP, GetOTP, ChangePassword } from "../../../Login/BPLogin/data/index";
// import BPLoginMobile from "../../../Login/BPLogin/BPLoginMobile/index";

function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Click On Resend OTP in 00:{counter}</div>;
}

function CreateCourseRegistration() {
  const navigate = useNavigate();

  const [controller, dispatch] = useDataController();
  const { InterviewLoginFlag, SalesLoginResponse } = controller;
  console.log("InterviewLoginFlag", InterviewLoginFlag);
  const [forgotModalFlag, setForgotModalFlag] = useState(false);
  const [counter, setCounter] = useState();
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [ResetEmailstartCounterFlag, setResetEmailStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [UserErrorflag, setUserErrorflag] = useState(false);
  const [Emailpopupflag, setEmailpopupflag] = useState(false);
  const [PasswordPopoupflag, setPasswordPopoupflag] = useState(false);
  const [emailModalFlag, setEmailModalFlag] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    Email: "",
    Password: "",
    // status: false,
  });
  const [flags, setFlags] = useState({
    status: false,
    EmailValidationFlag: false,
    passwordValidationFlag: false,
    InvalidEmailFlag: false,
    InvalidPasswordFlag: false,
    emailErrorFlag: false,
    passwordFlag: false,
    passwordFlag1: false,
    otpValidationFlag: false,
    resetpasswordflag: false,
    Emailpasswordflag: false,
    VerifiedOtpflag: false,
    otpvalidFlag: false,
  });
  const [fieldDetails, setFieldDetails] = useState({
    EmailId: "",
    NewPassword: "",
    ConfirmPassword: "",
    otp: "",
  });
  const [checkState, setCheckState] = useState(false);
  // const [InvalidPasswordFlag, setInvalidPasswordFlag] = useState(false);

  //   const [open, setOpen] = useState(false);

  //   console.log("data", loginDetails);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 432,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 4,
  };
  const handleInputChange = (event) => {
    if (event.target.name === "Email") {
      if (event.target.value.length < 50) {
        // const nameReg = /^[a-zA-Z\s]+$/;
        // if (nameReg.test(event.target.value) || event.target.value === "") {
        setFlags((prevState) => ({
          ...prevState,
          EmailValidationFlag: false,
          InvalidEmailFlag: false,
        }));
        const newValue = { ...loginDetails, [event.target.name]: event.target.value };
        setLoginDetails(newValue);

        // }
      }
    } else if (event.target.name === "Password") {
      // setInvalidPasswordFlag(false);
      //   const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      //   if (!numRegex.test(event.target.value)) {
      setFlags((prevState) => ({
        ...prevState,
        InvalidPasswordFlag: false,
        passwordValidationFlag: false,
      }));
      const newValue = { ...loginDetails, [event.target.name]: event.target.value };
      setLoginDetails(newValue);
      //   }
    } else {
      const newValue = { ...loginDetails, [event.target.name]: event.target.value };
      setLoginDetails(newValue);
    }
  };
  const handleValidate = (event) => {
    if (event.target.name === "Email") {
      const emailReg = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailReg.test(event.target.value)) {
        const newValue = { ...loginDetails, [event.target.name]: event.target.value };
        setLoginDetails(newValue);
        setFlags((prevState) => ({ ...prevState, InvalidEmailFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, InvalidEmailFlag: false }));
      }
    }
    if (event.target.name === "Password") {
      const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      if (!passwordReg.test(event.target.value)) {
        const newValue = { ...loginDetails, [event.target.name]: event.target.value };
        setLoginDetails(newValue);
        setFlags((prevState) => ({ ...prevState, InvalidPasswordFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, InvalidPasswordFlag: false }));
      }
    }
  };
  const handleLoginWithUserName = async () => {
    if (loginDetails.Email === "") {
      setFlags((prevState) => ({
        ...prevState,
        EmailValidationFlag: true,
      }));
    } else {
      setFlags((prevState) => ({
        ...prevState,
        EmailValidationFlag: false,
      }));
    }
    if (loginDetails.Password === "") {
      setFlags((prevState) => ({ ...prevState, passwordValidationFlag: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, passwordValidationFlag: false }));
    }
    if (checkState === false) {
      swal({
        icon: "error",
        text: "Please check the terms and conditions",
      });
    }
    if (
      flags.passwordValidationFlag === false &&
      flags.EmailValidationFlag === false
      //  && flags.InvalidEmailFlag === false &&
      // flags.InvalidPasswordFlag === false
    ) {
      const loginDTO = {
        username: loginDetails.Email,
        password: loginDetails.Password,
        productType: "MICA",
        envId: process.env.REACT_APP_EnvId,
      };
      await GetLOGIN(loginDTO).then((results) => {
        setSalesLoginResponse(dispatch, results);
        if (results.status === 1 && checkState === true) {
          console.log("SalesLoginResponse", SalesLoginResponse);
          const loginName = loginDetails;
          loginName.Name = results.firstName;
          localStorage.setItem("POSPSales", "POSP");
          // localStorage.setItem("CourseLoggedIn", true);
          setLoginDetails((prevState) => ({ ...prevState, loginName }));
          navigate("/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList");
          setInterviewLoginFlag(dispatch, false);
          setAdminLoginFlag(dispatch, true);
          //   setOpen(true);
        } else {
          // setInvalidPasswordFlag(true);
          swal({
            icon: "error",
            text: "Invalid user id or password",
          });
        }
        // if (
        //   results.status === 7 &&
        //   results.responseMessage === "Your accont has been Locked, please contact Admin."
        // ) {
        //   swal({
        //     icon: "error",
        //     text: "Your accont has been Locked, please contact Admin.",
        //   });
        // }
        // if (results.data.status === 4) {
        //   swal({
        //     icon: "error",
        //     text: "Invalid user name or password",
        //   });
        // }
        if (checkState === false) {
          swal({
            icon: "error",
            text: "Please check the terms and conditions",
            buttons: "OK",
          });
        }
      });
    }
  };

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.danger,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const theme = createTheme({
    status: {
      danger: blue[500],
    },
  });
  const updateCompareList = () => {
    setCheckState(!checkState);
  };
  const handleTermsAndConditions = () => {
    window.open(process.env.REACT_APP_CustomerTerm, "_blank");
  };
  console.log("Return value");
  const handleEmailAndPassword = (e) => {
    const newValue = { ...fieldDetails, [e.target.name]: e.target.value };
    setFieldDetails(newValue);
    if (e.target.name === "EmailId") {
      if (e.target.value === "") {
        setFlags((prevState) => ({ ...prevState, Emailpasswordflag: false }));
      }
    }
    if (e.target.name === "otp") {
      if (e.target.value !== "") {
        setFlags((prevState) => ({ ...prevState, resetpasswordflag: false }));
      } else {
        setFlags((prevState) => ({ ...prevState, resetpasswordflag: true }));
      }
    }
    if (e.target.name === "NewPassword") {
      if (e.target.value !== "") {
        setFlags((prevState) => ({ ...prevState, passwordFlag: false }));
      } else {
        setFlags((prevState) => ({ ...prevState, passwordFlag: true }));
      }
    }
    if (e.target.name === "ConfirmPassword") {
      if (e.target.value !== "") {
        setFlags((prevState) => ({ ...prevState, passwordFlag1: false }));
      } else {
        setFlags((prevState) => ({ ...prevState, passwordFlag1: true }));
        PasswordPopoupflag(false);
      }
    }
  };
  const onNewPasswordClose = () => {
    const Field1 = fieldDetails;
    Field1.EmailId = "";
    Field1.NewPassword = "";
    Field1.ConfirmPassword = "";
    Field1.otp = "";
    setFieldDetails((prevState) => ({ ...prevState, Field1 }));
    setForgotModalFlag(false);
    PasswordPopoupflag(false);
    setFlags((prevState) => ({ ...prevState, status: false }));
  };
  const handleChangePassword = async () => {
    if (fieldDetails.NewPassword === "") {
      setFlags((prevState) => ({ ...prevState, passwordFlag: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, passwordFlag: false }));
    }
    if (fieldDetails.ConfirmPassword === "") {
      setFlags((prevState) => ({ ...prevState, passwordFlag1: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, passwordFlag1: false }));
    }
    const changeDTO = {
      email: fieldDetails.EmailId,
      newPassword: fieldDetails.NewPassword,
      confirmPassword: fieldDetails.ConfirmPassword,
      isChangePassword: false,
      productType: "MICA",
      envId: process.env.REACT_APP_EnvId,
      roleId: 23156,
    };
    if (fieldDetails.NewPassword === "" || fieldDetails.ConfirmPassword === "") {
      setFlags((prevState) => ({ ...prevState, passwordFlag: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, passwordFlag: false }));
      if (fieldDetails.NewPassword === fieldDetails.ConfirmPassword) {
        setPasswordPopoupflag(false);
        await ChangePassword(changeDTO).then((results) => {
          if (results.status === 2) {
            setFlags((prevState) => ({ ...prevState, status: true }));
            swal({
              icon: "success",
              text: "Password changed successfully",
            }).then(() => {
              onNewPasswordClose();
            });
          } else {
            setFlags((prevState) => ({ ...prevState, status: false }));
          }
        });
      } else {
        setPasswordPopoupflag(true);
      }
    }
  };
  const onNewPassword = () => {
    setTimerFlag(false);
    setResetEmailStartCounterFlag(false);
    if (fieldDetails.EmailId !== "") {
      const sendOTP1 = {
        otp: "1234",
        email: fieldDetails.EmailId,
        userName: fieldDetails.EmailId,
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: "",
        sendSms: true,
        isBerry: false,
        client: "iNube BrokerPortal",
      };

      Promise.all([getOTP(sendOTP1)]).then((result) => {
        console.log("result", result);
        if (result[0] === null) {
          setFlags((prevState) => ({ ...prevState, Emailpasswordflag: true }));
        }
        if (result[0].status === 1) {
          // setFlags((prevState) => ({ ...prevState, otpValidationFlag: true }));
          setFlags((prevState) => ({ ...prevState, emailErrorFlag: false }));
          setLoginDetails((prevState) => ({ ...prevState, status: true }));
          setFlags((prevState) => ({
            ...prevState,
            Emailpasswordflag: false,
            otpValidationFlag: true,
          }));
          // setFlags((prevState) => ({ ...prevState, Emailpasswordflag: false }));
          setEmailpopupflag(false);
          setUserErrorflag(false);
          setResetEmailStartCounterFlag(true);
          setCounter(30);
        } else {
          setLoginDetails((prevState) => ({ ...prevState, status: false }));

          // setEmailModalFlag(false);
          // setTimerFlag(false);
          // setStartCounterFlag(false);
          // setForgotModalFlag(true);
        }
      });
    } else {
      // setFlags((prevState) => ({ ...prevState, Emailpasswordflag: false, emailErrorFlag: true }));
      // setEmailpopupflag(true);
      setFlags((prevState) => ({
        ...prevState,
        Emailpasswordflag: false,
        emailErrorFlag: true,
        otpValidationFlag: false,
      }));
      setEmailpopupflag(true);
    }
  };
  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }
    if (counter > 0 && ResetEmailstartCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }
    if (counter === 0) {
      setCounter(30);
      setStartCounterFlag(false);
      setResetEmailStartCounterFlag(false);
      setLoginDetails((prevState) => ({ ...prevState, status: false }));
      setTimerFlag(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag === true, ResetEmailstartCounterFlag === true]);

  const handleValidateEmail = (e) => {
    if (e.target.name === "EmailId") {
      const emailReg = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailReg.test(e.target.value)) {
        const newValue = { ...fieldDetails, [e.target.name]: e.target.value };
        setFieldDetails(newValue);
        setEmailpopupflag(true);
      } else {
        setEmailpopupflag(false);
      }
    }
  };
  const onSubmit = async () => {
    if (fieldDetails.otp !== "") {
      const verifyOTP = {
        otp: fieldDetails.otp,
        email: fieldDetails.EmailId,
        mobileNumber: "",
        userName: fieldDetails.EmailId,
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      await GetOTP(dispatch, verifyOTP).then(async (result) => {
        console.log("result4", result);
        if (result.status === 1) {
          setFlags((prevState) => ({
            ...prevState,
            resetpasswordflag: false,
            VerifiedOtpflag: true,
            status: false,
          }));
          setEmailModalFlag(false);
          setForgotModalFlag(true);
        } else {
          setFlags((prevState) => ({
            ...prevState,
            resetpasswordflag: true,
            VerifiedOtpflag: false,
          }));
        }
      });
      // await handleChangePassword();
    } else if (fieldDetails.otp === "" || fieldDetails.EmailId === "") {
      setFlags((prevState) => ({
        ...prevState,
        VerifiedOtpflag: true,
      }));
      setEmailpopupflag(true);
    }
  };
  const onForgotPassword = () => {
    // setStartCounterFlag(false);
    // setTimerFlag(false);
    setEmailModalFlag(true);
  };
  const onForgotPasswordClose = () => {
    setFieldDetails((prevState) => ({ ...prevState, EmailId: "", otp: "" }));
    setFlags((prevState) => ({ ...prevState, Emailpasswordflag: false, status: false }));
    // setEmailpopupflag(false);
    setFlags((prevState) => ({ ...prevState, emailErrorFlag: false }));
    setEmailModalFlag(false);
  };

  return (
    <PageLayout>
      <BPNavbarEmpty />
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox width="100" height={window.innerHeight} sx={{ background: "#1A4CAF" }}>
            <MDAvatar
              src={POSPREg}
              size="reglogo"
              variant="square"
              sx={{ ml: "11rem", pt: "3rem" }}
            />
            <MDTypography
              variant="h6"
              sx={{ fontSize: "1.5rem", textAlign: "center", color: "#FFFFFF", mx: "3rem" }}
            >
              Become A Tech-Enabled Insurance Broker By Registering Our Ready-To-Use Platform
            </MDTypography>

            <MDTypography
              variant="body1"
              sx={{
                fontSize: "1rem",
                textAlign: "left",
                color: "#FFFFFF",
                mt: "2rem",
                mx: "4rem",
              }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> APIs
              Pre-Integrated
            </MDTypography>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> White-Labelled
              Portal
            </MDTypography>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Complete
              Customer Buying Journey
            </MDTypography>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Essential
              Components/Modules Bun
            </MDTypography>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
            >
              <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> On-Board PoSPs,
              Scale Your Reach
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox sx={{ mx: "10.75rem", mt: 8 }}>
            <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
              Admin Login
            </MDTypography>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput
                  label="User Id"
                  value={loginDetails.UserName}
                  name="Email"
                  onChange={handleInputChange}
                  onBlur={handleValidate}
                  error={loginDetails.UserName === "" ? flags.InvalidEmailFlag : null}
                  // helperText={
                  //   flags.EmailValidationFlag ? "Please Enter EmailId" : "Invalid Email Id"
                  // }
                  // error={data.name === "" ? data.dataError : null}
                  required
                  sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                  autoComplete="off"
                />
                {flags.InvalidEmailFlag === true && loginDetails.UserName !== "" ? (
                  <MDTypography
                    sx={{
                      fontSize: "0.9rem",
                      color: "red",
                      textAlign: "left",
                      // mt: "-1rem",
                    }}
                  >
                    Please enter a valid UserId
                  </MDTypography>
                ) : null}
                {flags.EmailValidationFlag === true ? (
                  <MDTypography
                    sx={{
                      fontSize: "0.9rem",
                      color: "red",
                      textAlign: "left",
                      // mt: "-1rem",
                    }}
                  >
                    Please fill the required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDInput
                  label="Password"
                  value={loginDetails.Password}
                  name="Password"
                  type="Password"
                  onChange={handleInputChange}
                  onBlur={handleValidate}
                  // onBlur={handleInputChange}
                  // error={data.mobileNumber === "" ? data.dataError : null}
                  error={loginDetails.Password === "" ? flags.InvalidPasswordFlag : null}
                  // helperText={InvalidPasswordFlag ? "Invalid Password" : ""}
                  required
                  sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                  autoComplete="off"
                />
                {flags.passwordValidationFlag === true ? (
                  <MDTypography
                    sx={{
                      fontSize: "0.9rem",
                      color: "red",
                      textAlign: "left",
                      // mt: "-1rem",
                    }}
                  >
                    Please fill the required field
                  </MDTypography>
                ) : null}
                {flags.InvalidPasswordFlag === true && loginDetails.Password !== "" ? (
                  <MDTypography
                    sx={{
                      fontSize: "0.9rem",
                      color: "red",
                      textAlign: "left",
                      // mt: "-1rem",
                    }}
                  >
                    Please Enter Valid Password
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox>
                  <MDTypography
                    sx={{
                      color: "#1976D2",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={onForgotPassword}
                  >
                    Forgot Password
                  </MDTypography>
                </MDBox>
              </Grid>
              <Modal
                open={emailModalFlag}
                // onClose={onForgotPasswordClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <MDBox sx={style}>
                  <Grid container justifyContent="flex-end">
                    <ClearIcon onClick={onForgotPasswordClose} />
                  </Grid>
                  <MDTypography variant="h4" fontWeight="medium" mt={1} textAlign="center">
                    Enter your Email
                  </MDTypography>
                  <MDInput
                    label="Email"
                    onChange={handleEmailAndPassword}
                    value={fieldDetails.EmailId}
                    name="EmailId"
                    fullWidth
                    onBlur={handleValidateEmail}
                    autoComplete="off"
                    error={fieldDetails.EmailId === "" ? flags.emailErrorFlag : null}
                  />
                  {flags.InvalidEmailFlag === true && loginDetails.UserName !== "" ? (
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "red",
                        textAlign: "left",
                        // mt: "-1rem",
                      }}
                    >
                      Please enter a valid Email Id
                    </MDTypography>
                  ) : null}
                  {flags.Emailpasswordflag === true ? (
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "red",
                        textAlign: "left",
                        // mt: "-1rem",
                      }}
                    >
                      Please enter the registrered Email ID
                    </MDTypography>
                  ) : null}
                  {Emailpopupflag === true && flags.Emailpasswordflag === false ? (
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "red",
                        textAlign: "left",
                        // mt: "-1rem",
                      }}
                    >
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                  <MDBox mx={2} mt={2}>
                    <Grid container justifyContent="flex-end">
                      <MDTypography
                        sx={{
                          color: "#1976D2",
                          fontSize: "0.875rem",
                          textAlign: "end",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={onNewPassword}
                      >
                        {/* Send OTP */}
                        {timerFlag === true ? <div>Resend OTP</div> : null}
                        {timerFlag === false ? <div>Send OTP</div> : null}
                      </MDTypography>
                    </Grid>
                    {flags.otpValidationFlag === true ? (
                      <MDTypography
                        sx={{
                          color: "green",
                          fontSize: "0.875rem",
                          textAlign: "left",
                        }}
                      >
                        OTP sent succesfully!
                      </MDTypography>
                    ) : null}
                  </MDBox>
                  <MDTypography
                    sx={{
                      fontSize: "0.9rem",
                      color: "green",
                      textAlign: "left",
                      mt: "-0.3rem",
                    }}
                  >
                    {ResetEmailstartCounterFlag && (
                      <Timer counter={counter} UserErrorflag={UserErrorflag} />
                    )}
                  </MDTypography>
                  <MDInput
                    type="password"
                    label="Enter OTP"
                    onChange={handleEmailAndPassword}
                    value={fieldDetails.otp}
                    name="otp"
                    fullWidth
                    inputProps={{ maxLength: 6 }}
                    error={fieldDetails.otp === "" ? flags.otpValidationFlag : null}
                  />
                  {flags.resetpasswordflag === true ? (
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "red",
                        textAlign: "left",
                      }}
                    >
                      Enter Valid OTP
                    </MDTypography>
                  ) : null}
                  {flags.VerifiedOtpflag === true ? (
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "red",
                        textAlign: "left",
                        // mt: "-1rem",
                      }}
                    >
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                  <MDBox mx={2} mt={2}>
                    <Grid container justifyContent="flex-end">
                      <MDButton
                        color="info"
                        variant="contained"
                        cursor="pointer"
                        onClick={onSubmit}
                      >
                        Verify OTP
                      </MDButton>
                    </Grid>
                  </MDBox>
                </MDBox>
              </Modal>
              <Modal
                open={forgotModalFlag}
                // onClose={onNewPasswordClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <MDBox sx={style}>
                  <Grid container justifyContent="flex-end">
                    <ClearIcon onClick={onNewPasswordClose} />
                  </Grid>
                  <MDTypography variant="h4" fontWeight="medium" mt={1} textAlign="center">
                    Forgot Password
                  </MDTypography>
                  {/* <MDInput
              type="password"
              label="Enter OTP"
              onChange={handleEmailAndPassword}
              value={fieldDetails.otp}
              name="otp"
              fullWidth
              inputProps={{ maxLength: 6 }}
            />
            {flags.resetpasswordflag === true ? (
              <MDTypography
                sx={{
                  fontSize: "0.9rem",
                  color: "red",
                  textAlign: "left",
                }}
              >
                Enter Valid OTP
              </MDTypography>
            ) : null} */}
                  <MDBox mt={2}>
                    <MDInput
                      type="password"
                      label="New Password"
                      onChange={handleEmailAndPassword}
                      value={fieldDetails.NewPassword}
                      name="NewPassword"
                      fullWidth
                      autoComplete="new-password"
                      inputProps={{ maxLength: 20, minLength: 8 }}
                      error={fieldDetails.NewPassword === "" ? flags.emailErrorFlag : null}
                    />
                  </MDBox>
                  {flags.passwordFlag === true ? (
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "red",
                        textAlign: "left",
                        // mt: "-1rem",
                      }}
                    >
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                  <MDBox mt={2}>
                    <MDInput
                      type="password"
                      label="Confirm Password"
                      onChange={handleEmailAndPassword}
                      value={fieldDetails.ConfirmPassword}
                      name="ConfirmPassword"
                      fullWidth
                      inputProps={{ maxLength: 20, minLength: 8 }}
                      error={fieldDetails.ConfirmPassword === "" ? flags.emailErrorFlag : null}
                    />
                  </MDBox>
                  {flags.passwordFlag1 === true ? (
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "red",
                        textAlign: "left",
                        // mt: "-1rem",
                      }}
                    >
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                  {flags.status && flags.passwordFlag === false && flags.passwordFlag1 === false ? (
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "green",
                        textAlign: "left",
                        // mt: "-1rem",
                      }}
                    >
                      Password changed succesfully
                    </MDTypography>
                  ) : null}
                  {PasswordPopoupflag === true && flags.passwordFlag1 === false ? (
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "red",
                        textAlign: "left",
                        // mt: "-1rem",
                      }}
                    >
                      Password does not match
                    </MDTypography>
                  ) : null}
                  <MDBox mx={2} mt={2}>
                    <Grid container justifyContent="flex-end">
                      <MDButton color="info" variant="contained" onClick={handleChangePassword}>
                        Submit
                      </MDButton>
                    </Grid>
                  </MDBox>
                </MDBox>
              </Modal>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox display="flex" flexDirection="row" alignItems="center">
                  <ThemeProvider theme={theme}>
                    <CustomCheckbox checked={checkState} onChange={updateCompareList} />
                  </ThemeProvider>

                  <MDTypography sx={{ fontSize: "1rem" }}>
                    I agree to the{" "}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={handleTermsAndConditions}
                      onKeyDown={handleTermsAndConditions}
                      style={{
                        textDecoration: "underline",
                        color: "#0071D9",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      Terms and Conditions
                    </span>
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox display="flex" alignItems="right" justifyContent="right">
                  <MDButton color="info" onClick={handleLoginWithUserName}>
                    LOGIN
                  </MDButton>
                </MDBox>
              </Grid>
              <MDTypography
                sx={{
                  fontSize: "0.987rem",
                  ml: 5,
                  mt: 5,
                }}
              >
                Haven&apos;t registered as Broker?
                <Link
                  style={{ color: "#0071D9", cursor: "pointer" }}
                  href="/modules/BrokerPortal/Pages/Admin/AdminCourse/CreateCourseRegistration"
                >
                  {" "}
                  Register now
                </Link>{" "}
              </MDTypography>
              {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
              {/* <MDBox> */}
              {/* </MDBox> */}
              {/* </Grid> */}
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// const [mobileView, setMobileView] = useState(false);
// useEffect(() => {
//   // A function that sets the display state for the DefaultNavbarMobile.
//   function displayBPMobile() {
//     if (window.innerWidth < breakpoints.values.lg) {
//       setMobileView(true);
//     } else {
//       setMobileView(false);
//     }
//   }

//   /**
//    The event listener that's calling the displayMobileNavbar function when
//    resizing the window.
//   */
//   window.addEventListener("resize", displayBPMobile);

//   // Call the displayMobileNavbar function to set the state with the initial value.
//   displayBPMobile();

//   // Remove event listener on cleanup
//   return () => window.removeEventListener("resize", displayBPMobile);
// }, []);
// return mobileView === true ? <BPLoginMobile /> : getReturnValue();
// }

export default CreateCourseRegistration;
