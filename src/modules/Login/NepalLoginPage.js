import React, { useState, useEffect } from "react";
import { Grid, Card, Modal, IconButton, Backdrop, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import bgLoginImage from "assets/images/NepalLoginImg.png";
import Logo from "assets/images/ProtectiveMILogo.jpg";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import OtpInput from "react-otp-input-rc-17";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";

import {
  getUserType,
  Authenticate,
  SearchUserSettingDetails,
  getOTP,
  verifyOTP,
  ChangePassword,
} from "./data/index";

function Timer({ counter }) {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      Click On Resend OTP in 00:{counter}
    </Grid>
  );
}
function NepalLoginPage() {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const [validateotpdisabled, setvalidateotpdisabled] = useState(true);
  const [startCounterResend, setStartCounterResend] = useState(false);
  const [sendotp, setSendOtp] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [otpdisabled, setOtpdisabled] = useState(false);
  // const [timerFlag, setTimerFlag] = useState(false);
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  const helperText = "This field is Required";
  const [ErrorFlag, setErrorFlag] = useState(false);
  const [counter, setCounter] = useState(30);

  const [Logindata, setLoginData] = useState({
    UserName: "",
    Password: "",
    newPasword: "",
    confirmPassword: "",
    environment: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [otpInput, setOtpInput] = useState(false);
  const [otpdata, setotpdata] = useState("");
  const [afterProceed, setAfterProceed] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
    setOtpInput(false);
    setotpdata("");
    setAfterProceed(false);
    setvalidateotpdisabled(true);
    setStartCounterResend(false);
    setSendOtp(false);
    setTimerFlag(false);
    setStartCounterFlag(false);
    setOtpdisabled(false);
    Logindata.UserName = "";
    Logindata.Password = "";
    Logindata.newPasword = "";
    Logindata.confirmPassword = "";
    Logindata.environment = [];
    setLoginData({ ...Logindata });
  };
  const handleUserName = (e) => {
    if (e.target.name === "UserName") {
      Logindata.UserName = e.target.value;
    }
    if (e.target.name === "Password") {
      Logindata.Password = e.target.value;
    }
    if (e.target.name === "newPasword") {
      Logindata.newPasword = e.target.value;
    }
    if (e.target.name === "confirmPassword") {
      Logindata.confirmPassword = e.target.value;
    }
    setLoginData({ ...Logindata });
  };
  const handleOpen = async () => {
    if (Logindata.UserName === "" || Logindata.Password === "") {
      setErrorFlag(true);
      Swal.fire({
        icon: "error",
        text: "Please fill the required fields",
        allowOutsideClick: false,
      });
    } else {
      setErrorFlag(false);
      const userData = await getUserType(Logindata);
      if (userData.status === 200) {
        if (userData.data.status === 1) {
          Logindata.UName = userData.data.userLogin.userName;
          Logindata.userId = userData.data.userLogin.userId;
          Logindata.environment = [
            ...Logindata.environment,
            ...userData.data.userLogin.environmentDTOs,
          ];
          Logindata.id = userData.data.userLogin.id;

          const authenticateDto = {
            ProductType: userData.data.userLogin.product,
            Username: Logindata.UserName,
            Password: Logindata.Password,
            envId: userData.data.userLogin.environmentDTOs[0].mID,
          };
          const login = await Authenticate(authenticateDto);
          if (login.data.status === 1) {
            localStorage.setItem("userName", login.data.userName);
            localStorage.setItem("userId", login.data.userId);
            localStorage.setItem("roleId", login.data.roleId);
            localStorage.setItem("organizationId", login.data.organizationId);
            localStorage.setItem("token", login.data.token);
            localStorage.setItem("partnerId", login.data.partnerId);
            localStorage.setItem("profilePicture", login.data.profileImage);
            localStorage.setItem("firstName", login.data.firstName);
            localStorage.setItem("mobileNumber", login.data.mobileNumber);
            localStorage.setItem("email", login.data.email);
            Logindata.MobileNumber = login.data.mobileNumber;
            Logindata.roleId = login.data.roleId;
            setLoginData({ ...Logindata });
            const res = await SearchUserSettingDetails("LandingPath", authenticateDto);
            if (res.data && res.data.data && res.data.data.LandingPath)
              Navigate(res.data.data.LandingPath);
            else Navigate(`/home/Dashboard`);
          } else {
            Swal.fire({
              text: "Wrong Password",
              icon: "error",
              allowOutsideClick: false,
            });
          }
        } else {
          Swal.fire({
            text: "Username does not Exist",
            icon: "error",
            allowOutsideClick: false,
          });
        }
      }
    }
  };

  const onForgotPassword = async () => {
    if (Logindata.UserName === "") {
      Swal.fire({ icon: "error", text: "Please enter User Name", allowOutsideClick: false });
    } else {
      const userData = await getUserType(Logindata);

      if (userData.status === 200) {
        if (userData.data.status !== 1) {
          Swal.fire({
            text: "Username does not Exist",
            icon: "error",
            allowOutsideClick: false,
          });
        } else {
          setOpenModal(true);
        }
      }
    }
  };
  const sendOTP = async () => {
    setLoading(true);
    setvalidateotpdisabled(false);

    const sendOtp = {
      name: "",
      otp: "1234",
      email: Logindata.UserName,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: Logindata.MobileNumber,
      sendSms: true,
      isBerry: false,
      client: process.env.REACT_APP_Client,
    };

    await getOTP(sendOtp).then((res) => {
      if (res.status === 1) {
        setLoading(false);
        Swal.fire({ icon: "success", text: "OTP shared successfully", allowOutsideClick: false });
        setOtpdisabled(true);
        setStartCounterFlag(true);
        setSendOtp(true);
      } else {
        setLoading(false);
        Swal.fire({ icon: "error", text: "Click on Resend OTP", allowOutsideClick: false });
        setOtpdisabled(false);
      }
    });
    setOtpInput(true);
  };
  const handleOTP = (otp1) => {
    setotpdata(otp1);
  };
  const verifyOtp = async () => {
    const verifyotp = {
      name: "",
      otp: otpdata,
      email: Logindata.UserName,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: Logindata.MobileNumber,
      sendSms: true,
      isBerry: false,
      client: process.env.REACT_APP_Client,
    };
    const verification = await verifyOTP(verifyotp);

    if (verification !== null) {
      if (verification.status === 1) {
        Swal.fire({
          icon: "success",
          text: "OTP verification Successful",
          allowOutsideClick: false,
        });
        setAfterProceed(true);
      } else {
        Swal.fire({ icon: "error", text: "Please enter valid OTP", allowOutsideClick: false });
        setvalidateotpdisabled(true);
      }
    } else {
      Swal.fire({ icon: "error", text: "Please enter valid OTP", allowOutsideClick: false });
    }
  };
  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    if (counter === 0) {
      setCounter(30);
      setStartCounterFlag(false);
      //   setTimerFlag(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);
  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterResend) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    if (counter === 0) {
      setCounter(30);
      setStartCounterResend(false);
      setTimerFlag(true);
      setOtpdisabled(false);
      setvalidateotpdisabled(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterResend]);
  const onResendOTP = async () => {
    // SetnextOtp(true);
    setLoading(true);
    const sendOtp = {
      name: "",
      otp: "1234",
      email: Logindata.UserName,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: Logindata.MobileNumber,
      sendSms: true,
      isBerry: false,
      client: process.env.REACT_APP_Client,
    };

    await getOTP(sendOtp).then((res) => {
      if (res.status === 1) {
        setLoading(false);
        Swal.fire({ icon: "success", text: "Otp shared successfully", allowOutsideClick: false });
        setStartCounterResend(true);
        setvalidateotpdisabled(false);
        setOtpdisabled(true);
      } else {
        setLoading(false);
        Swal.fire({ icon: "error", text: "Click on Resend OTP", allowOutsideClick: false });
        setOtpdisabled(false);
      }
    });
  };
  const handleChangePassword = async () => {
    if (Logindata.newPasword === "" || Logindata.confirmPassword === "") {
      setErrorFlag(true);
      Swal.fire({
        icon: "error",
        text: "Please fill the required fields*",
        allowOutsideClick: false,
      });
    } else if (Logindata.newPasword !== "" && Logindata.confirmPassword !== "") {
      if (
        (Logindata.confirmPassword.length >= 8 && Logindata.confirmPassword.length <= 20) ||
        (Logindata.newPasword.length >= 8 && Logindata.newPasword.length <= 20)
      ) {
        setErrorFlag(false);
        const changeDTO = {
          email: Logindata.UserName,
          newPassword: Logindata.newPasword,
          confirmPassword: Logindata.confirmPassword,
          isChangePassword: false,
          productType: "MICA",
          envId: process.env.REACT_APP_EnvId,
          roleId: 23156,
        };
        await ChangePassword(changeDTO).then((results) => {
          if (results === null) {
            Swal.fire({ icon: "error", text: "Password not matching", allowOutsideClick: false });
          } else if (results.status === 2) {
            Swal.fire({ icon: "success", text: "Password Changed", allowOutsideClick: false });
            console.log("MMMM");
            handleCloseModal();
          } else {
            Swal.fire({ icon: "error", text: results.responseMessage, allowOutsideClick: false });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Password Should contain atleast 8 to 20 Characters",
          allowOutsideClick: false,
        });
      }
    }
  };

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <MDBox
            width="100%"
            height="100vh"
            display={{ xs: "none", sm: "none", md: "inline-block", lg: "inline-block" }}
          >
            <img src={bgLoginImage} alt="bg" width="100%" height="100%" />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <MDBox width="100%" height="100vh" sx={{ display: "flex", alignItems: "center" }}>
            <Grid container spacing={2} p={3}>
              <MDBox width="100%" height="100%" p={3}>
                <img src={Logo} alt="Logo" width="100%" height="100%" />
              </MDBox>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={1}>
                <MDTypography variant="h4" fontWeight="medium">
                  Sign In
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <MDInput
                  label="UserName"
                  name="UserName"
                  value={Logindata.UserName}
                  onChange={(e) => handleUserName(e)}
                  sx={redAsterisk}
                  required
                  error={ErrorFlag && Logindata.UserName === ""}
                  helperText={ErrorFlag && Logindata.UserName === "" ? helperText : ""}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <MDInput
                  label="Password"
                  name="Password"
                  type="password"
                  value={Logindata.Password}
                  onChange={(e) => handleUserName(e)}
                  sx={redAsterisk}
                  inputProps={{ maxLength: 20, minLength: 8 }}
                  required
                  error={ErrorFlag && Logindata.Password === ""}
                  helperText={ErrorFlag && Logindata.Password === "" ? helperText : ""}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3.4} lg={3.4} xl={3.4}>
                <MDBox mb={1}>
                  <MDTypography
                    sx={{
                      color: "#1976D2",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      textDecoration: "underline",
                      justifyContent: "flex-end",
                    }}
                    alignItems="flex-end"
                    onClick={onForgotPassword}
                  >
                    Forgot Password?
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                  <MDButton onClick={handleOpen}>Lets Go</MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>

        <Modal
          open={openModal}
          // onClose={handleCloseModal}
          align="center"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MDBox
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 600,
              //   minheight: "380px",
              //   width: "auto",
              //   height: "auto",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
            }}
          >
            <IconButton
              aria-label="Close"
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
            {afterProceed === false && (
              <>
                <MDTypography align="left" ml={6}>
                  Please validate via OTP to change your password
                </MDTypography>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} mt={4}>
                  <MDInput
                    label="UserName"
                    name="UserName"
                    value={Logindata.UserName}
                    disabled={openModal}
                  />
                </Grid>
                {!sendotp && (
                  <Grid item xs={3} sm={3} md={3} lg={3} xl={3} mt={4}>
                    <MDButton onClick={sendOTP} disabled={sendotp}>
                      Send OTP
                    </MDButton>
                  </Grid>
                )}
                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={loading}
                >
                  <CircularProgress />
                </Backdrop>
                {otpInput && (
                  <Grid>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} mt={4} mr={28}>
                      <OtpInput
                        numInputs={6}
                        label="OTP"
                        value={otpdata}
                        onChange={handleOTP}
                        isInputNum
                        hasErrored
                        isInputSecure
                        inputStyle={{
                          width: "38px",
                          height: "38px",
                          margin: "0.85rem",
                          fontSize: "1rem",
                          borderRadius: 4,
                          border: "2px solid rgba(0,0,0,0.3)",
                          background: "white",
                        }}
                      />
                    </Grid>
                    <MDTypography
                      sx={{
                        fontSize: "0.9rem",
                        color: "green",
                        textAlign: "left",
                        mt: "1rem",
                      }}
                    >
                      {startCounterFlag && <Timer counter={counter} />}
                      {startCounterResend && <Timer counter={counter} />}
                    </MDTypography>

                    <Grid container p={2} justifyContent="center">
                      {timerFlag && (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                          <MDButton
                            sx={{ justifyContent: "right" }}
                            variant="contained"
                            onClick={onResendOTP}
                            color="success"
                            disabled={otpdisabled}
                          >
                            Re-Send OTP
                          </MDButton>
                        </Grid>
                      )}
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <MDButton
                          sx={{ justifyContent: "right", fontSize: 11 }}
                          variant="contained"
                          onClick={verifyOtp}
                          disabled={validateotpdisabled}
                        >
                          Proceed
                        </MDButton>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </>
            )}
            {afterProceed === true && (
              <>
                <MDTypography align="centre">Change Password</MDTypography>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} mt={3}>
                  <MDInput
                    label="New Password"
                    name="newPasword"
                    type="password"
                    sx={redAsterisk}
                    required
                    error={ErrorFlag && Logindata.newPasword === ""}
                    helperText={ErrorFlag && Logindata.newPasword === "" ? helperText : ""}
                    value={Logindata.newPasword}
                    onChange={(e) => handleUserName(e)}
                    inputProps={{ maxLength: 20, minLength: 8 }}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} mt={4}>
                  <MDInput
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    sx={redAsterisk}
                    required
                    error={ErrorFlag && Logindata.confirmPassword === ""}
                    helperText={ErrorFlag && Logindata.confirmPassword === "" ? helperText : ""}
                    value={Logindata.confirmPassword}
                    onChange={(e) => handleUserName(e)}
                    inputProps={{ maxLength: 20, minLength: 8 }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} mt={4}>
                  <MDButton
                    sx={{ justifyContent: "right", fontSize: 11 }}
                    variant="contained"
                    onClick={handleChangePassword}
                    // disabled={validateotpdisabled}
                  >
                    Change Password
                  </MDButton>
                </Grid>
              </>
            )}
          </MDBox>
        </Modal>
      </Grid>
    </Card>
  );
}
export default NepalLoginPage;
