import { useState, useEffect } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";
import { getRequest } from "core/clients/axiosclient";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import { Icon } from "@mui/material";
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";

// Images
import bgImage from "assets/images/Red-BG.png";
import HDFCimg from "assets/images/HDFCImg.png";
import HDFCLogo from "assets/images/HDFC-Ergo-LOGO.png";
// import bgLoginImage from "assets/images/insurance-agent-near-me-background-image.png";
// import mglogo from "assets/images/BrokerPortal/MutualGlobalLogo.png";
// import startup from "assets/images/BrokerPortal/startup.png";
import ClearIcon from "@mui/icons-material/Clear";
import swal from "sweetalert";
import ChompLoginMobile from "./ChompLoginMobile";
// import {
//   images,
//   setLogo,
//   setCustTheme,
//   setSalesLoginResponse,
//   useDataController,
// } from "../../../../../BrokerPortal/context";
import {
  // images,
  // setLogo,
  // setCustTheme,
  setSalesLoginResponse,
  useDataController,
} from "../../../../../../BrokerPortal/context";
// import { setLogo, setCustTheme, useDataController } from "../../../../BrokerPortal/context";
import { getOTP, GetOTP, GetLOGIN, ChangePassword } from "./data/index";
// import appConfig from "../../../../jsconfig.json";

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

async function fetchUser() {
  try {
    const user = await getRequest("Product/GetMasterData?sMasterlist=All&isFilter=true");
    console.log("user", user.data);
  } catch (error) {
    // Log errors
  }
}

function Configurator({ handleConfiguratorClose }) {
  // const logoOptions = ["HDFCErgoLogo"];

  // const [, dispatch] = useDataController();
  // const handleClick = (event) => {
  //   setLogo(dispatch, event.target.id);
  //   setCustTheme(dispatch, event.target.id);
  // };

  return (
    <MDBox
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      p={6}
    >
      <Card>
        <MDBox width="100%" display="flex" justifyContent="end">
          <Icon
            onClick={handleConfiguratorClose}
            sx={{ color: "#000000", fontSize: "2rem!important" }}
          >
            close
          </Icon>
        </MDBox>
        <MDTypography sx={{ textAlign: "center" }}>Choose the logo</MDTypography>
        <MDBox
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
        >
          {/* {logoOptions.map((logo) => (
            <MDBox
              component="img"
              id={logo}
              src={images[logo]}
              onClick={handleClick}
              m={2}
              sx={{ maxHeight: "2.2rem" }}
            />
          ))} */}
        </MDBox>
      </Card>
    </MDBox>
  );
}

// function Timer({ counter, UserErrorflag }) {
//   // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
//   // return () => clearInterval(timer);
//   return <div>{UserErrorflag === false ? <div>Resend OTP in 00:{counter}</div> : null}</div>;
// }
function ChompLogin() {
  const navigate = useNavigate();
  const [, dispatch] = useDataController();
  useEffect(() => {
    localStorage.removeItem("Itemtype");
  }, []);
  // const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("UserID");
  // const [counter, setCounter] = useState(30);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  // const [Errorflag, setErrorflag] = useState(false);
  const [Emailpopupflag, setEmailpopupflag] = useState(false);
  const [PasswordPopoupflag, setPasswordPopoupflag] = useState(false);
  const [UserErrorflag, setUserErrorflag] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    Email: "",
    OTP: "",
    Name: "",
    Password: "",
    status: false,
  });
  // const fieldDisplay = {
  //   // OTP: ["Mobile/Email ID", "Enter OTP"],
  //   UserID: ["User ID", "Password"],
  // };
  const [emailModalFlag, setEmailModalFlag] = useState(false);
  const [forgotModalFlag, setForgotModalFlag] = useState(false);
  const [fieldDetails, setFieldDetails] = useState({
    EmailId: "",
    NewPassword: "",
    ConfirmPassword: "",
    otp: "",
  });
  const [flags, setFlags] = useState({
    emailErrorFlag: false,
    passwordFlag: false,
    passwordFlag1: false,
    status: false,
    EmailValidationFlag: false,
    otpValidationFlag: false,
    passwordValidationFlag: false,
    resetpasswordflag: false,
    Emailpasswordflag: false,
    VerifiedOtpflag: false,
  });
  // const [timerFlag, setTimerFlag] = useState(false);

  useEffect(() => {
    onbeforeunload = () => {
      localStorage.removeItem("ProfileImg");
    };
  }, []);

  const handleLoginChange = (e) => {
    if (e.target.name === "Email") {
      const emailReg = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailReg.test(e.target.value)) {
        const newValue = { ...loginDetails, [e.target.name]: "" };
        setLoginDetails(newValue);
      }
    } else if (e.target.name === "OTP") {
      const numRegex = /^[0-9]*$/;
      if (numRegex.test(e.target.value)) {
        const newValue = { ...loginDetails, [e.target.name]: e.target.value };
        setLoginDetails(newValue);
      }
    } else if (e.target.name === "Password") {
      const newValue = { ...loginDetails, [e.target.name]: e.target.value };
      setLoginDetails(newValue);
    } else {
      const newValue = { ...loginDetails, [e.target.name]: e.target.value };
      setLoginDetails(newValue);
    }
  };

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

  const handleEmailchange = (e) => {
    const newValue = { ...loginDetails, [e.target.name]: e.target.value };
    setLoginDetails(newValue);
    setUserErrorflag(false);
    setLoginDetails((prevState) => ({ ...prevState, status: false }));
  };

  const handleValidate = (e) => {
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

  // const sentOTPClick = () => {
  //   setUserErrorflag(false);
  //   if (UserErrorflag === false) {
  //     const sendOTP1 = {
  //       otp: "1234",
  //       email: loginDetails.Email,
  //       userName: loginDetails.Email,
  //       envId: process.env.REACT_APP_EnvId,
  //       productType: "Mica",
  //       mobileNumber: "",
  //       sendSms: true,
  //       isBerry: false,
  //       client: "iNube BrokerPortal",
  //     };
  //     setStartCounterFlag(true);
  //     sendOTP(sendOTP1).then((result) => {
  //       if (result.status === 1) {
  //         setLoginDetails((prevState) => ({ ...prevState, status: true }));
  //         setUserErrorflag(false);
  //       } else {
  //         setLoginDetails((prevState) => ({ ...prevState, status: false }));
  //       }
  //       if (result.status === 4) {
  //         setUserErrorflag(true);
  //         setStartCounterFlag(false);
  //       } else {
  //         setUserErrorflag(false);
  //       }
  //     });
  //   }
  // };
  // const onEnterKey = (e) => {
  //   if (e.keyCode === 13) {
  //     sentOTPClick();
  //   }
  // };
  // useEffect(() => {
  //   let timer;

  //   if (counter > 0 && startCounterFlag) {
  //     timer = setTimeout(() => setCounter((c) => c - 1), 1000);
  //   }
  //   if (counter === 0) {
  //     setCounter(30);
  //     setStartCounterFlag(false);
  //     setLoginDetails((prevState) => ({ ...prevState, status: false }));
  //     setTimerFlag(true);
  //   }

  //   return () => {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //   };
  // }, [counter, startCounterFlag === true]);
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  //   setFlags((prevState) => ({ ...prevState, EmailValidationFlag: false }));
  //   setFlags((prevstate) => ({ ...prevstate, otpValidationFlag: false }));
  //   setFlags((prevstate) => ({ ...prevstate, passwordValidationFlag: false }));
  //   if (event.target.value === "UserID") {
  //     const login = loginDetails;
  //     login.Email = "";
  //     login.OTP = "";
  //     login.Name = "";
  //     login.Password = "";
  //     login.status = false;
  //     setLoginDetails((prevState) => ({ ...prevState, login }));
  //     handleLoginChange();
  //     // setErrorflag(false);
  //     setUserErrorflag(false);
  //   } else {
  //     console.log(startCounterFlag, timerFlag,setSelectedValue, "22222");
  //     setStartCounterFlag(false);
  //     // setTimerFlag(false);
  //     const login1 = loginDetails;
  //     login1.Email = "";
  //     login1.OTP = "";
  //     login1.Name = "";
  //     login1.Password = "";
  //     setLoginDetails((prevState) => ({ ...prevState, login1 }));
  //   }
  // };

  // const [controller] = useDataController();
  // const { logo } = controller;

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    navigate(`/chomp`);
    fetchUser();
  };

  const handleVerifyOTP = async () => {
    if (loginDetails.Email === "") {
      setFlags((prevState) => ({ ...prevState, EmailValidationFlag: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, EmailValidationFlag: false }));
    }
    if (loginDetails.OTP === "") {
      setFlags((prevState) => ({ ...prevState, otpValidationFlag: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, otpValidationFlag: false }));
    }
    if (flags.EmailValidationFlag === false && flags.otpValidationFlag === false) {
      const verifyOTP = {
        otp: loginDetails.OTP,
        email: loginDetails.Email,
        mobileNumber: "",
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      await GetOTP(dispatch, verifyOTP).then((results) => {
        setSalesLoginResponse(dispatch, results);
        if (results.status === 1) {
          const loginName = loginDetails;
          loginName.Name = results.firstName;
          setLoginDetails((prevState) => ({ ...prevState, loginName }));
          localStorage.setItem("POSPSales", "POSP");
          setOpen(true);
        } else if (results.status === 7) {
          swal({
            icon: "error",
            text: "Please Enter Valid OTP Sent to your Email",
          });
        }
      });
    }
  };

  const handleLoginWithUserName = async () => {
    console.log(startCounterFlag, timerFlag, setSelectedValue, "22222");
    if (loginDetails.Email === "") {
      setFlags((prevState) => ({ ...prevState, EmailValidationFlag: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, EmailValidationFlag: false }));
    }
    if (loginDetails.Password === "") {
      setFlags((prevState) => ({ ...prevState, passwordValidationFlag: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, passwordValidationFlag: false }));
    }
    if (flags.passwordValidationFlag === false && flags.EmailValidationFlag === false) {
      const loginDTO = {
        username: loginDetails.Email,
        password: loginDetails.Password,
        productType: "MICA",
        envId: process.env.REACT_APP_EnvId,
      };
      await GetLOGIN(dispatch, loginDTO).then((results) => {
        setSalesLoginResponse(dispatch, results);
        if (results.status === 1) {
          const loginName = loginDetails;
          loginName.Name = results.firstName;
          localStorage.setItem("POSPSales", "POSP");
          setLoginDetails((prevState) => ({ ...prevState, loginName }));
          setOpen(true);
        }
        if (
          results.status === 7 &&
          results.responseMessage === "Your accont has been Locked, please contact Admin."
        ) {
          swal({
            icon: "error",
            text: "Your accont has been Locked, please contact Admin.",
          });
        }
        if (results.data.status === 4) {
          swal({
            icon: "error",
            text: "Invalid user name or password",
          });
        }
      });
    }
  };

  const handleConfiguratorOpen = () => setConfiguratorOpen(true);
  const handleConfiguratorClose = () => setConfiguratorOpen(false);

  const onForgotPassword = () => {
    setStartCounterFlag(false);
    setTimerFlag(false);
    setEmailModalFlag(true);
  };

  const onNewPassword = () => {
    setTimerFlag(false);
    setStartCounterFlag(false);
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
          setFlags((prevState) => ({ ...prevState, emailErrorFlag: false }));
          setFlags((prevState) => ({ ...prevState, Emailpasswordflag: false }));
          setEmailpopupflag(false);
          // setEmailModalFlag(false);
          setTimerFlag(false);
          setStartCounterFlag(false);
          // setForgotModalFlag(true);
        }
      });
    } else {
      setFlags((prevState) => ({ ...prevState, Emailpasswordflag: false, emailErrorFlag: true }));
      // setEmailpopupflag(true);
    }
  };

  const onForgotPasswordClose = () => {
    setFieldDetails((prevState) => ({ ...prevState, EmailId: "", otp: "" }));
    setFlags((prevState) => ({ ...prevState, Emailpasswordflag: false, status: false }));
    setEmailpopupflag(false);
    setFlags((prevState) => ({ ...prevState, emailErrorFlag: false }));
    setEmailModalFlag(false);
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
    }
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

  const getReturnValue = () => {
    console.log("Return value");
    return (
      <PageLayout>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            {/* <MDBox component="img" src={startup} /> */}
            <MDTypography variant="h6" sx={{ fontSize: "0.75rem", color: "#E56353", mt: "1rem" }}>
              {" "}
              Hello
            </MDTypography>
            <MDTypography variant="h6" sx={{ fontSize: "1.5rem", mt: "1rem" }}>
              {" "}
              {loginDetails.Name !== "" ? loginDetails.Name : ""}
            </MDTypography>
            <MDTypography variant="h6" sx={{ fontSize: "0.75rem", color: "#858585", mt: "1rem" }}>
              {" "}
              Let’s get started!
            </MDTypography>
            <MDButton variant="gradient" sx={{ mt: "2rem" }} onClick={handleClose}>
              Ok
            </MDButton>
          </MDBox>
        </Modal>
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
              onBlur={handleValidate}
              autoComplete="off"
              error={fieldDetails.EmailId === "" ? flags.emailErrorFlag : null}
            />
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
                Please enter a valid Email ID
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
                  Send OTP
                </MDTypography>
              </Grid>
            </MDBox>
            <MDInput
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
            ) : null}
            <MDBox mx={2} mt={2}>
              <Grid container justifyContent="flex-end">
                <MDButton color="info" variant="contained" cursor="pointer" onClick={onSubmit}>
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
        <MDBox
          position="absolute"
          width="100%"
          minHeight="100vh"
          // component="img"
          // src={bgImage}
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              bgImage &&
              `${linearGradient(
                rgba(gradients.dark.main, 0.6),
                rgba(gradients.dark.state, 0.6)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <MDBox px={1} width="100%" height="100vh" mx="auto">
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={11} sm={11} md={10} lg={10} xl={10}>
              <Card>
                <Grid container justifyContent="center" alignItems="center" mx="auto">
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <MDBox
                      minHeight="27rem"
                      width="100%"
                      sx={{
                        // backgroundImage: `url(${bgLoginImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      textAlign="center"
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        mt="-10rem"
                        justifyContent="center"
                        alignContent="center"
                      >
                        <MDBox component="img" src={HDFCimg} sx={{ width: "35rem" }} />
                        {/* <MDBox
                          minHeight="5vh"
                          width="18rem"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            // backgroundImage: `url(${logo})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <MDBox
                            component="img"
                            src={logo}
                            sx={{ maxHeight: "3.3rem" }}
                            fullwidth
                          />
                        </MDBox>
                        {/* <MDTypography
                          align="center"
                          variant="caption"
                          fontWeight="medium"
                          fontSize="10"
                          // color={"white"}
                        >
                          INSURANCE BROKING PVT LTD ( REGD NO : 752)
                        </MDTypography> */}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <MDBox mt={3} mb={1} px={0} textAlign="Left">
                      {/* <MDBox
                        bgColor="primary"
                        width="max-content"
                        px={4}
                        pt={0}
                        pb={0.5}
                        mx="auto"
                        mt={-1.375}
                        ml="0"
                        sx={{ borderTopRightRadius: "25px", borderBottomRightRadius: "25px" }}
                        lineHeight={1.5}
                      > */}
                      {/* <MDTypography
                          variant="caption"
                          fontWeight="medium"
                          color="white"
                          fontSize="18px"
                        >
                          Welcome POSP
                        </MDTypography> */}
                      {/* </MDBox> */}
                    </MDBox>
                    <MDBox px={1} width="100%" mx="auto">
                      <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="flex-end"
                        height="100%"
                      >
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                          <MDBox
                            component="img"
                            src={HDFCLogo}
                            sx={{ width: "30%", alignItems: "center" }}
                            alignContent="center"
                          />
                          <MDTypography variant="h4" fontWeight="medium" mt={1} textAlign="center">
                            Sign in your Account
                          </MDTypography>
                          {/* <MDBox display="flex" flexDirection="row">
                            <MDBox
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Radio
                                checked={selectedValue === "OTP"}
                                onChange={handleChange}
                                value="OTP"
                                name="radio-buttons"
                                inputProps={{ "aria-label": "OTP" }}
                              />
                              <MDTypography fontSize="0.75rem">Login with OTP</MDTypography>
                            </MDBox>
                            <MDBox
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Radio
                                checked={selectedValue === "UserID"}
                                onChange={handleChange}
                                value="UserID"
                                name="radio-buttons"
                                inputProps={{ "aria-label": "UserID" }}
                              />
                              <MDTypography fontSize="0.75rem">Login with User ID</MDTypography>
                            </MDBox>
                          </MDBox> */}
                          <MDBox pt="2rem" pb={3}>
                            <MDBox component="form" role="form">
                              <MDBox mb={1}>
                                <MDInput
                                  type="email"
                                  label="User ID"
                                  fullWidth
                                  height="44px"
                                  value={loginDetails.Email}
                                  onBlur={handleLoginChange}
                                  onChange={handleEmailchange}
                                  name="Email"
                                  autoComplete="off"
                                />
                                {
                                  // (selectedValue === "OTP" || selectedValue === "UserID") &&
                                  flags.EmailValidationFlag === true &&
                                  loginDetails.Email === "" &&
                                  UserErrorflag === false ? (
                                    <MDTypography
                                      sx={{
                                        fontSize: "0.9rem",
                                        color: "red",
                                        textAlign: "left",
                                        mr: "2.5rem",
                                      }}
                                    >
                                      This field is required
                                    </MDTypography>
                                  ) : null
                                }
                              </MDBox>
                              {/* <Grid container justifyContent="space-between">
                                <MDBox>
                                  {loginDetails.status === true &&
                                  UserErrorflag === false &&
                                  flags.EmailValidationFlag === false &&
                                  // flags.otpValidationFlag === false &&
                                  // flags.passwordValidationFlag === false &&
                                  selectedValue === "OTP" ? (
                                    <MDTypography
                                      sx={{
                                        fontSize: "0.9rem",
                                        color: "green",
                                        textAlign: "left",
                                        //  mt: "1rem",
                                      }}
                                    >
                                      OTP sent successfully
                                    </MDTypography>
                                  ) : null}
                                </MDBox>
                                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                                  <MDTypography
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: "green",
                                      textAlign: "left",
                                      mt: "-0.3rem",
                                    }}
                                  >
                                    {startCounterFlag && (
                                      <Timer counter={counter} UserErrorflag={UserErrorflag} />
                                    )}
                                  </MDTypography>
                                </Grid>
                                <MDBox>
                                  {UserErrorflag === true && selectedValue === "OTP" ? (
                                    <MDTypography
                                      sx={{
                                        fontSize: "0.9rem",
                                        color: "red",
                                        textAlign: "left",
                                        mr: "2.5rem",
                                      }}
                                    >
                                      Enter Registered Mobile No./Email Id
                                    </MDTypography>
                                  ) : null}
                                </MDBox>
                                {selectedValue === "OTP" ? (
                                  <MDBox mb={1}>
                                    <div onKeyDown={onEnterKey} role="button" tabIndex="0">
                                      <MDTypography
                                        sx={{
                                          color: "#1976D2",
                                          fontSize: "0.875rem",
                                          textAlign: "end",
                                          cursor: "pointer",
                                          textDecoration: "underline",
                                        }}
                                        // onClick={
                                        //   flags.EmailValidationFlag === false ? sentOTPClick : null
                                        // }
                                        onClick={sentOTPClick}
                                      >
                                        {timerFlag === true ? <div>Resend OTP</div> : null}
                                        {timerFlag === false ? <div>Send OTP</div> : null}
                                      </MDTypography>
                                    </div>
                                  </MDBox>
                                ) : null}
                              </Grid> */}
                              <MDBox mb={1}>
                                <MDInput
                                  type={selectedValue === "UserID" ? "password" : ""}
                                  label="Password"
                                  fullWidth
                                  autoComplete="new-password"
                                  value={
                                    loginDetails.Password
                                    // selectedValue === "UserID"
                                    //   ? loginDetails.Password
                                    //   : loginDetails.OTP
                                  }
                                  onChange={handleLoginChange}
                                  // name={selectedValue === "UserID" ? "Password" : "OTP"}
                                  name="Password"
                                  inputProps={
                                    selectedValue === "UserID"
                                      ? { maxLength: 20, minLength: 8 }
                                      : { maxLength: 20, type: "password" }
                                  }
                                />
                                {selectedValue === "UserID" &&
                                flags.passwordValidationFlag === true &&
                                loginDetails.Password === "" ? (
                                  <MDTypography
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: "red",
                                      textAlign: "left",
                                      mr: "2.5rem",
                                    }}
                                  >
                                    This field is required
                                  </MDTypography>
                                ) : null}
                                {/* {selectedValue === "OTP" &&
                                flags.otpValidationFlag === true &&
                                loginDetails.OTP === "" ? (
                                  <MDTypography
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: "red",
                                      textAlign: "left",
                                      mr: "2.5rem",
                                    }}
                                  >
                                    This field is required
                                  </MDTypography>
                                ) : null} */}
                              </MDBox>
                              {selectedValue === "UserID" && (
                                <MDBox mb={1}>
                                  <MDTypography
                                    sx={{
                                      color: "#1976D2",
                                      fontSize: "0.875rem",
                                      cursor: "pointer",
                                    }}
                                    onClick={onForgotPassword}
                                  >
                                    Forgot Password
                                  </MDTypography>
                                </MDBox>
                              )}
                              {/* <MDBox display="flex" alignItems="center" ml={-1}>
                                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                                <MDTypography
                                  variant="button"
                                  fontWeight="regular"
                                  color="text"
                                  onClick={handleSetRememberMe}
                                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                                >
                                  &nbsp;&nbsp;Remember me
                                </MDTypography>
                              </MDBox> */}
                              <MDBox
                                mt={4}
                                mb={1}
                                display="flex"
                                alignItems="right"
                                justifyContent="right"
                              >
                                <MDButton
                                  variant="gradient"
                                  onClick={
                                    selectedValue === "OTP"
                                      ? handleVerifyOTP
                                      : handleLoginWithUserName
                                  }
                                >
                                  Login
                                </MDButton>
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox width="100%" display="flex" justifyContent="end" alignItems="end">
          <Icon onClick={handleConfiguratorOpen}>settings</Icon>
        </MDBox>
        <Modal open={configuratorOpen} onClose={handleConfiguratorClose}>
          <Configurator handleConfiguratorClose={handleConfiguratorClose} />
        </Modal>
      </PageLayout>
    );
  };

  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayBPMobile() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayBPMobile);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayBPMobile();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayBPMobile);
  }, []);
  return mobileView === true ? <ChompLoginMobile /> : getReturnValue();
}

export default ChompLogin;
