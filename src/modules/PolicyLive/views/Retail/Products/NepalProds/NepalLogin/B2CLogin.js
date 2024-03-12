import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";
import {
  Grid,
  // Stack,
  // // Card,
  // InputAdornment,
  // CircularProgress,
  // Checkbox,

  // Divider,
  // List,
  Modal,
  Tabs,
  Tab,
  Stack,
  Card,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

import CloseIcon from "@mui/icons-material/Close";
import OtpInput from "react-otp-input-rc-17";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDCheckbox from "components/MDCheckbox";
import MDButton from "components/MDButton";

import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import LoginImg from "assets/images/Nepal/NepalLogin.png";
import Submitted from "assets/images/BrokerPortal/Submitted.png";
import {
  getOTP,
  GetOTP,
  Timer,
  GetUserByNumber,
  CreateProfileUser,
  Authenticate,
  ChangePassword,
} from "./data/index";
import { setUserDetails, useDataController } from "../../../../../../BrokerPortal/context";

// import Navbar from "../../../../../../Login/Layouts/Navbar/index";
import Navbar from "../B2C/B2CNavBar";
// import Navbar from "../../../../../../BrokerPortal/Pages/CustomerPortal/CustomerLandingNavBar/NavBar";
// import { IsMobileNumber } from "../../../../../../../Common/Validations/index";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const modelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  // height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: 8,

  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // width: 600,
  // bgcolor: "background.paper",
  // boxShadow: 24,
  // p: 1,
};

function ForgotPasswordModel({
  open,
  setOpen,
  details,
  dispatch,
  setStartCounterFlag,
  startCounterFlag,
  counter,
  handleChange,
}) {
  const [forgotOtop, setForgotOtop] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [changePassword, setchangePassword] = useState(false);
  const [otpdata2, setotpdata2] = useState({
    otp: "",
    Email: "",
  });

  const handelClose = () => {
    setOpen(false);
    setForgotOtop(false);
    setchangePassword(false);
    setNewPassword(false);
    otpdata2.otp = "";
    setotpdata2({ ...otpdata2 });
  };
  const onForgotOTP = () => {
    if (details.UserID === "") {
      swal({ icon: "error", text: "Please enter User ID" });
    } else {
      setStartCounterFlag(true);
      const sendOtp = {
        name: "",
        otp: "1234",
        email: "",
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: details.MobileNo,
        sendSms: true,
        isBerry: false,
        client: process.env.REACT_APP_Client,
      };

      getOTP(sendOtp).then((res) => {
        if (res.status === 1) {
          // setOtpstatus(true);
          swal({ icon: "success", text: "Otp shared successfully" });
        } else {
          // setOtpstatus(false);
          swal({ icon: "error", text: "Click on Resend OTP" });
        }
      });
      setForgotOtop(true);
      setchangePassword(false);
      setNewPassword(false);
    }
  };

  const onNewPassword = () => {
    if (details.UserID === "") {
      swal({ icon: "error", text: "Please enter User ID" });
    } else if (otpdata2.otp !== "") {
      const verifyOTP = {
        otp: otpdata2.otp,
        email: "",
        mobileNumber: details.MobileNo,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      console.log("verifyOTP", verifyOTP);
      GetOTP(dispatch, verifyOTP).then((res) => {
        console.log("res", res);
        if (res !== null) {
          if (res.status === 1) {
            // swal({ icon: "success", text: "OTP verified successfully" });
            setStartCounterFlag(false);
            setNewPassword(true);
            setForgotOtop(false);
            setchangePassword(false);
            // lMasters.proposerProps.otpflag = true;
          } else {
            // lMasters.proposerProps.otpflag = false;

            setForgotOtop(true);
            // otpdata2.otp = "";
            // setotpdata2({ ...otpdata2 });
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          setForgotOtop(true);
          // otpdata2.otp = "";
          // setotpdata2({ ...otpdata2 });

          // lMasters.proposerProps.otpflag = false;
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
    } else {
      swal({ icon: "error", text: "Please enter OTP" });
    }
  };

  const onChangePassword = async () => {
    if (details.newPassword === "" || details.confirmPassword === "") {
      swal({ icon: "error", text: "Please fill the required fields*" });
    } else {
      const changeDTO = {
        email: details.UserID,
        newPassword: details.newPassword,
        confirmPassword: details.confirmPassword,
        isChangePassword: false,
        productType: "MICA",
        envId: process.env.REACT_APP_EnvId,
        roleId: 23156,
      };
      await ChangePassword(changeDTO).then((results) => {
        console.log("results", results);
        if (results === null) {
          swal({ icon: "error", text: "Password not matching" });
          setNewPassword(true);
        } else if (results.status === 2) {
          setchangePassword(true);
          setForgotOtop(false);
          setNewPassword(false);
        } else {
          swal({ icon: "error", text: results.responseMessage });
          setNewPassword(true);
        }
      });
    }
  };
  const handleOTP = (otp1) => {
    setotpdata2((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
  };
  return (
    <Modal open={open}>
      <MDBox sx={modelStyle}>
        <CloseIcon
          sx={{
            position: "fixed",
            top: "40px",
            right: "40px",
            cursor: "pointer !important",
            transition: "transform 0.5s ease-in-out !important",
          }}
          onClick={handelClose}
        />
        {changePassword && (
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container justifyContent="center">
                {" "}
                {/* Nested Grid container */}
                <Grid item>
                  <MDBox component="img" src={Submitted} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container justifyContent="center">
                {" "}
                {/* Nested Grid container */}
                <Grid item>
                  <MDTypography variant="h8">Password changed Successfully</MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="center">
                {" "}
                {/* Nested Grid container */}
                <Grid item>
                  <MDButton
                    variant="contained"
                    // style={{ backgroundColor: "#FF4F33", color: "white" }}
                    onClick={handelClose}
                  >
                    Login
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        {newPassword && changePassword === false ? (
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container justifyContent="center">
                <MDTypography variant="h8">Enetr New Password</MDTypography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} />

            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              {/* <Grid container justifyContent="center"> */}
              <MDInput
                label="New Password"
                value={details.newPassword}
                onChange={(e) => handleChange(e, "newPassword")}
                required
                type="password"
              />
              {/* </Grid> */}
            </Grid>

            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} />
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} />

            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              {/* <Grid container justifyContent="center"> */}
              <MDInput
                label="Renter New Password"
                value={details.confirmPassword}
                onChange={(e) => handleChange(e, "confirmPassword")}
                type="password"
                required
              />
              {/* </Grid> */}
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} />

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container justifyContent="center">
                <MDButton
                  variant="contained"
                  // style={{ backgroundColor: "#FF4F33", color: "white" }}
                  onClick={onChangePassword}
                >
                  Change Password
                </MDButton>
              </Grid>{" "}
            </Grid>
          </Grid>
        ) : (
          changePassword === false && (
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h8">
                  Please validate via OTP to change your password
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} />

              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MDInput
                  label="User ID"
                  value={details.UserID}
                  onChange={(e) => handleChange(e, "UserID")}
                  required
                  // disabled={details.UserID !== ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} />
              {forgotOtop && (
                <>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3} xxl={3} />
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Grid container justifyContent="center" alignItems="center">
                      <OtpInput
                        value={otpdata2.otp}
                        onChange={handleOTP}
                        numInputs={6}
                        isInputNum
                        hasErrored
                        isInputSecure
                        inputStyle={{
                          width: "40px",
                          height: "40px",
                          margin: "0.85rem",
                          fontSize: "1rem",
                          borderRadius: 4,
                          border: "2px solid rgba(0,0,0,0.3)",
                          background: "white",
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                </>
              )}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox flexDirection="column" alignItems="center">
                  {startCounterFlag && (
                    <Grid container justifyContent="center" alignItems="center">
                      <MDBox mb={1}>
                        <Timer counter={counter} />
                      </MDBox>
                    </Grid>
                  )}
                  {forgotOtop && (
                    <Grid container justifyContent="center" alignItems="center">
                      <MDBox mb={1}>
                        <MDTypography
                          sx={{
                            color: "#1976D2",
                            fontSize: "0.875rem",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={startCounterFlag ? "" : onForgotOTP}
                        >
                          Resend OTP
                        </MDTypography>
                      </MDBox>
                    </Grid>
                  )}
                  <Grid container justifyContent="center" alignItems="center">
                    <MDButton
                      variant="contained"
                      st
                      style={{
                        // backgroundColor: "#FF4F33", color: "white",
                        marginTop: "1rem",
                      }}
                      onClick={forgotOtop ? onNewPassword : onForgotOTP}
                    >
                      {forgotOtop ? "Proceed" : "Send OTP"}
                    </MDButton>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
            // </Grid>
          )
        )}
      </MDBox>
    </Modal>
  );
}

function Declaration({ OpenDec, setOpenDec }) {
  const navigate = useNavigate();
  const [check, setCheck] = useState();

  const onCheck = (e) => {
    setCheck(e.target.checked);
  };

  const handelClose = () => {
    setOpenDec(false);
  };
  const handleProceed = () => {
    if (check) {
      navigate(`/Nepal/B2CPolicyType`);
    } else {
      swal({ icon: "error", text: "Please provide declaration to continue" });
    }
  };

  return (
    <Modal open={OpenDec}>
      <MDBox sx={modelStyle}>
        <CloseIcon
          sx={{
            position: "fixed",
            top: "40px",
            right: "40px",
            cursor: "pointer !important",
            transition: "transform 0.5s ease-in-out !important",
          }}
          onClick={handelClose}
        />

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {/* <Grid container justifyContent="center"> */}
            <MDBox display="flex" flexDirection="row" alignItems="flex-start">
              <MDCheckbox
                onChange={(e) => onCheck(e)}
                // disabled={disabledFunction()}
                checked={check}
              />
              <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
                I solemnly declare that I am authorized to act on behalf of customer for the purpose
                of policy Issuance. I understand the responsibilities and liabilities associated
                with this representation and will do so diligently and in the best interest of
                customer.
              </MDTypography>
            </MDBox>
            {/* </Grid> */}
          </Grid>
          <Grid item>
            <Grid container justifyContent="center">
              {" "}
              {/* Nested Grid container */}
              <Grid item>
                <MDButton
                  variant="contained"
                  // style={{ backgroundColor: "#FF4F33", color: "white" }}
                  onClick={handleProceed}
                >
                  Proceed
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Modal>
  );
}

function B2CLogin() {
  const [values, setValues] = useState(0);
  const [sub, setSub] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    MobileNo: "",
    Name: "",
    check: false,
    UserID: "",
    Password: "",
    newPassword: "",
    confirmPassword: "",
  });
  // const [otpstatus, setOtpstatus] = useState(false);
  const [otpdata, setotpdata] = useState({
    otp: "",
    Email: "",
  });
  const [counter, setCounter] = useState(30);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [OpenDec, setOpenDec] = useState(false);
  // const [checkErr, setCheckErr] = useState(false);
  const [getUserFlag, setGetUserFlag] = useState(false);
  // const [newUser, setnewUser] = useState(false);

  const [val, setVal] = useState({
    MobileNoVal: false,
  });

  const [dispatch] = useDataController();
  const navigate = useNavigate();

  console.log("details", details, startCounterFlag, counter);
  const tabChange = (event, newValues) => {
    setValues(newValues);

    val.MobileNoVal = false;
    otpdata.otp = "";
    setotpdata({ ...otpdata });
    setSub(false);
    setVal({ ...val });
  };

  const onSubmit = async () => {
    if (details.MobileNo === "") {
      swal({
        icon: "error",
        text: "Please enter Mobile No",
      });
    }
    // else if (details.check === false) {
    // setCheckErr(true);
    // }
    else {
      // setCheckErr(false);
      const data = {
        phone: details.MobileNo,
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
      };
      const d = await GetUserByNumber(data);
      console.log("de", d);
      details.Name = d?.userDetails[0]?.firstName;
      // details.Name = d.userName;

      setDetails({ ...details });
      if (d === null || !d) {
        setGetUserFlag(false);
      } else {
        setGetUserFlag(true);
      }

      setStartCounterFlag(true);
      setSub(true);
      if (details.Name !== "") {
        const sendOtp = {
          name: "",
          otp: "1234",
          email: "",
          userName: "sindhu@inubesolutions.com",
          envId: process.env.REACT_APP_EnvId,
          productType: "Mica",
          mobileNumber: details.MobileNo,
          sendSms: true,
          isBerry: false,
          client: process.env.REACT_APP_Client,
          // client: "Nepal",
        };

        getOTP(sendOtp).then((res) => {
          if (res.status === 1) {
            // setOtpstatus(true);
            swal({ icon: "success", text: "Otp shared successfully" });
          } else if (res.status !== 4) {
            // setOtpstatus(false);
            swal({ icon: "error", text: "Click on Resend OTP" });
          }
        });
      }
    }
  };

  const handleOTP = (otp1) => {
    setotpdata((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
  };
  const onProceed = async () => {
    if (details.Name === "") {
      swal({ icon: "error", text: "Please enter Name" });
    } else if (otpdata.otp === "") {
      swal({ icon: "error", text: "Please enter the OTP" });
    } else if (otpdata.otp !== "") {
      const verifyOTP = {
        otp: otpdata.otp,
        email: "",
        mobileNumber: details.MobileNo,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      console.log("verifyOTP", verifyOTP);
      GetOTP(dispatch, verifyOTP).then((res) => {
        console.log("res", res);
        if (res !== null) {
          if (res.status === 1) {
            // swal({ icon: "success", text: "OTP verified successfully" });
            setStartCounterFlag(false);
            if (details.Name !== "") {
              navigate(`/Nepal/B2CPolicyType`);
            }
            // lMasters.proposerProps.otpflag = true;
          } else {
            // lMasters.proposerProps.otpflag = false;
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          // lMasters.proposerProps.otpflag = false;
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
      if (getUserFlag === false) {
        const data = {
          id: "",
          userName: "",
          email: "",
          emailConfirmed: true,
          passwordHash: "",
          securityStamp: "",
          concurrencyStamp: "",
          phoneNumber: details.MobileNo,
          phoneNumberConfirmed: true,
          twoFactorEnabled: true,
          lockoutEnabled: true,
          accessFailedCount: 0,
          userDetails: [
            {
              userId: "",
              userName: "",
              status: true,
              createdBy: "",
              createdDate: "",
              locked: true,
              lockedReason: "",
              lockStartDate: "",
              lockEndDate: "",
              lockMechanism: true,
              officeId: 0,
              firstName: details.Name,
              middleName: "R",
              lastName: "V",
              employeeNumber: 0,
              dob: "1999-04-17",
              doj: "2023-11-03",
              roleId: null,
              genderId: 1,
              // email: "rakshita.rv@inubesolutions.com",
              email: "null",
              passportNumber: "",
              drivingLicenceNumber: "",
              contactNumber: details.MobileNo,
              userTypeId: "1004",
              panNo: "",
              lastLoginDateTime: "",
              isIos: true,
              isAndroid: true,
              isWindows: true,
              isPasswordChanged: true,
              landLineOffice: "",
              landLineResidence: "",
              partnerId: 0,
              branchName: "ABC",
              branchCode: "123",
              designation: "",
              maritalStatusId: 4,
              profileImage: "",
              partnerName: "",
              userAddressLine1: "Test",
              userAddressLine2: "Test address 2",
              userCountryId: 1,
              userStateId: 17,
              userDistrictId: 148,
              userCityId: 2834,
              userPincodeId: 10950,
            },
          ],
          userAddress: [
            {
              id: "",
              userAddressType: " ",
              userCountryId: 1,
              userStateId: 17,
              userDistrictId: 148,
              userCityId: 2834,
              userAddressLine1: "Test",
              userAddressLine2: "",
              userAddressLine3: "",
              userPincodeId: 10950,
            },
            {
              id: "",
              userAddressType: " ",
              userCountryId: 1,
              userStateId: 17,
              userDistrictId: 148,
              userCityId: 2834,
              userAddressLine1: "Test",
              userAddressLine2: "",
              userAddressLine3: "",
              userPincodeId: 10950,
            },
          ],
        };
        const d = await CreateProfileUser(data);
        console.log("CreateProfileUser", d);
        details.Name = d.users.userDetails[0].firstName;
        setUserDetails({ ...details });
      }
      localStorage.setItem("b2cLoginType", "Customer");
      localStorage.setItem("b2cUserName", details.Name);
      localStorage.setItem("loggedIn", true);
    }
    localStorage.setItem("MobileNo", details.MobileNo);
  };

  useEffect(() => {
    let timer;

    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => {
        setCounter((c) => c - 1); // Decrement counter
      }, 1000);
    }

    if (counter === 0) {
      setCounter(30);
      setStartCounterFlag(false);
      // setOtpstatus(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);

  const handelForgot = () => {
    if (details.UserID === "") {
      swal({ icon: "error", text: "Please enter User ID" });
    } else {
      setOpen(true);
    }
  };

  const handleChange = (e, n) => {
    if (n === "check") {
      details[n] = e.target.checked;
    } else {
      details[n] = e.target.value;
    }
    setDetails({ ...details });
  };

  const onLogin = async () => {
    if (details.UserID === "" && details.Password === "") {
      swal({ icon: "error", text: "Please fill the required fields*" });
    } else {
      const Auth = {
        username: details.UserID,
        password: details.Password,
        productType: "Mica",
        envId: process.env.REACT_APP_EnvId,
      };

      await Authenticate(Auth).then((res) => {
        if (res !== null) {
          if (res.status === 1) {
            setOpenDec(true);
          } else {
            swal({ icon: "error", text: res.responseMessage });
          }
        }
      });
      localStorage.setItem("b2cLoginType", "Intermediary");
      localStorage.setItem("b2cUserID", details.UserID);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("Email", details.UserID);
    }
  };

  const IsMobileNumber = (e) => {
    // debugger;
    const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
    // if (e.target.value.length === 10) {
    if (mobileRegex.test(e.target.value)) {
      details.MobileNo = e.target.value;
      val.MobileNoVal = false;
    } else {
      details.MobileNo = "";
      val.MobileNoVal = true;
    }
    // return "Invalid Mobile Number";
    // }
    // else
    setDetails({ ...details });
    setVal({ ...val });
    // return "Number should be 10 digits";
  };

  return (
    // <MDBox>

    <Card
    // position="absolute"
    // sx={{ borderRadius: "0.3rem", m: 7, background: "#FFFFFF" }}
    // fullwidth
    >
      <Navbar />
      <PageLayout backgroundColor="#FFFFFF">
        <ForgotPasswordModel
          open={open}
          setOpen={setOpen}
          details={details}
          dispatch={dispatch}
          setStartCounterFlag={setStartCounterFlag}
          counter={counter}
          startCounterFlag={startCounterFlag}
          handleChange={handleChange}
        />
        <Declaration OpenDec={OpenDec} setOpenDec={setOpenDec} />
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox component="img" src={LoginImg} width="100%" height="100%" marginTop="2rem" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            xxl={6}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={12}>
                <MDTypography variant="h4" align="center">
                  {values !== 1 && sub ? "Validate with OTP" : "Login"}
                </MDTypography>
              </Grid>{" "}
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <Tabs
                  onChange={tabChange}
                  value={values}
                  variant="fullWidth"
                  centered
                  sx={{ position: "sticky", top: "0", backgroundColor: "#fff", zIndex: "1" }}
                >
                  <Tab label="Login as Customer" {...a11yProps(0)} style={{ fontSize: "16px" }} />
                  <Tab
                    label={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>Login as Intermediary</div>
                        <div style={{ marginLeft: "5px" }}>
                          <Tooltip
                            title={
                              <MDTypography
                                sx={{
                                  // backgroundColor: "#FF5722",
                                  color: "#FFFFFF",
                                  fontSize: "10px",
                                  // border: "1px solid #FF5722",
                                  padding: "8px",
                                }}
                              >
                                If you are Dealer/DLC/intermediary who is assisting the customer to
                                buy an insurance policy
                              </MDTypography>
                            }
                            // title="If you are Dealer/DLC/intermediary who is assisting the customer to buy an insurance policy"
                            arrow
                            placement="bottom"
                            sx={{ fontSize: "10rem" }}
                          >
                            <InfoIcon style={{ verticalAlign: "middle" }} />
                          </Tooltip>
                        </div>
                      </div>
                    }
                    {...a11yProps(1)}
                    style={{ fontSize: "16px" }}
                  />
                </Tabs>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
              {values === 0 && sub !== true && (
                <>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      label="Mobile No"
                      required
                      value={details.MobileNo}
                      onChange={(e) => handleChange(e, "MobileNo")}
                      onBlur={(e) => IsMobileNumber(e)}
                      error={val.MobileNoVal}
                      helperText={val.MobileNoVal && "Enter valid 10 digit Mobile Number"}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                  {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDBox display="flex" flexDirection="row">
                      <MDCheckbox
                        onChange={(e) => handleChange(e, "check")}
                        // disabled={disabledFunction()}
                        checked={details.check}
                      />
                      <MDTypography sx={{ fontSize: "0.9rem", marginTop: "5px" }}>
                        I agree to the{" "}
                        <span
                          role="button"
                          tabIndex={0}
                          // onClick={handleTermsAndConditions}
                          // onKeyDown={handleTermsAndConditions}
                          style={{
                            textDecoration: "underline",
                            color: "#0071D9",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                          }}
                        >
                          terms & conditions
                        </span>
                        &
                        <span
                          role="button"
                          tabIndex={0}
                          // onClick={handleTermsAndConditions}
                          // onKeyDown={handleTermsAndConditions}
                          style={{
                            textDecoration: "underline",
                            color: "#0071D9",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                          }}
                        >
                          privacy & policy
                        </span>
                      </MDTypography>
                    </MDBox>
                    {checkErr && details.check === false && (
                      <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                        Please agree the terms & conditions and privacy & policy{" "}
                      </MDTypography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} /> */}
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Stack justifyContent="space-between" direction="row">
                      <MDButton variant="outlined"> Reset</MDButton>
                      <MDButton
                        onClick={onSubmit}
                        variant="contained"
                        // style={{ backgroundColor: "#FF4F33", color: "white" }}
                      >
                        Submit
                      </MDButton>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                </>
              )}
              {values !== 1 && sub && (
                <>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      label="Name"
                      required
                      value={details.Name}
                      onChange={(e) => handleChange(e, "Name")}
                      disabled={getUserFlag}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography align="center">
                      Enter the OTP sent to {details.MobileNo}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <OtpInput
                      numInputs={6}
                      value={otpdata.otp}
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
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    {startCounterFlag && <Timer counter={counter} />}
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <Grid container justifyContent="right" spacing={2}>
                      <MDBox flexDirection="column" alignItems="right">
                        <MDBox mb={1}>
                          <MDTypography
                            sx={{
                              color: "#1976D2",
                              fontSize: "0.875rem",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                            onClick={startCounterFlag ? "" : onSubmit}
                          >
                            Resend OTP
                          </MDTypography>
                        </MDBox>

                        <MDButton
                          onClick={onProceed}
                          variant="contained"
                          // style={{ backgroundColor: "#FF4F33", color: "white" }}
                        >
                          Proceed
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                </>
              )}
              {values === 1 && (
                <>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      label="User ID"
                      required
                      value={details.UserID}
                      onChange={(e) => handleChange(e, "UserID")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      label="Password"
                      value={details.Password}
                      required
                      type="password"
                      onChange={(e) => handleChange(e, "Password")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Stack justifyContent="space-between" direction="row">
                      <MDBox mb={1}>
                        <MDTypography
                          sx={{
                            color: "#1976D2",
                            fontSize: "0.875rem",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={handelForgot}
                        >
                          Forgot Password?
                        </MDTypography>
                      </MDBox>
                      <MDButton
                        onClick={onLogin}
                        variant="contained"
                        // style={{ backgroundColor: "#FF4F33", color: "white" }}
                      >
                        Login
                      </MDButton>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </PageLayout>
    </Card>

    // {/* </MDBox> */}
  );
}
export default B2CLogin;
