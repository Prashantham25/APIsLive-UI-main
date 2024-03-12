import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Swal from "sweetalert2";

import { setChannelDetails, useDataController } from "../BrokerPortal/context";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import MDLoader from "../../components/MDLoader";
import { Authenticate, GenericApi, SearchUserSettingDetails, getUserType } from "./data";
import { NotificationsVerifyOTP } from "../PolicyLive/views/Life/Products/NewBusiness/data";
import { IsMobileNumber } from "../../Common/Validations";
import AgentLogin from "../../assets/images/Life/AgentLogin.png";
import CustomerLogin from "../../assets/images/Life/CustomerLogin.png";
import EmployeeLogin from "../../assets/images/Life/EmployeeLogin.png";

function LICLoginPage() {
  const [controller, dispatch] = useDataController();
  const { LoginTheme, CompanyLogo } = controller;

  const defaultLoginData = {
    userId: "",
    Password: "",
    MobileNo: "",
    userExists: true,
    userDetails: "",
  };
  const [loginData, setLoginData] = useState(defaultLoginData);
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState("OTP");

  const [otp, setOtp] = useState("");
  const [transactionNo, setTransactionNo] = useState(0);
  const [timer, setTimer] = useState(100);
  const [resendOtp, setResendOtp] = useState(0);
  const [validationFlag, setValidationFlag] = useState(false);

  const [selectedUserType, setSelectedUserType] = useState("");

  const Navigate = useNavigate();

  const matches = useMediaQuery("(min-width:400px)");
  const buttonWidth = matches ? "21.5rem" : "90%";
  const userSelectionWidth = matches ? "17rem" : "90%";

  const buttonProperties = {
    borderRadius: "0.25rem",
    width: "100%",
    textTransform: "capitalize",
    fontSize: "0.9rem",
  };

  const checkForValue = (x) => x === "" || x === null || x === undefined;

  useEffect(() => {
    if (timer <= 60 && timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newLoginData = {
      ...loginData,
      userExists: name === "userId" ? true : loginData.userExists,
    };
    newLoginData[name] = value;
    setValidationFlag(false);
    setLoginData(newLoginData);
  };
  const handleOTPLogin = async () => {
    const loginRequest = {
      userId: loginData.userId,
      loginType,
      userType: selectedUserType,
      loginDetails: {
        password: loginData.Password,
        otp,
        transactionNo,
      },
      userDetails: loginData.userDetails,
    };
    const loginDetails = await GenericApi("LifeInsurance", "UserLoginAPI", loginRequest);

    if (loginDetails.status === 1) {
      const loginJson = loginDetails.finalResult || {};
      if (!checkForValue(loginJson.token)) {
        localStorage.setItem("userName", loginJson.userName);
        localStorage.setItem("userId", loginJson.userId);
        localStorage.setItem("roleId", loginJson.roleId);
        localStorage.setItem("organizationId", loginJson.organizationId);
        localStorage.setItem("token", loginJson.token);
        localStorage.setItem("partnerId", loginJson.partnerId);
        localStorage.setItem("profilePicture", loginJson.profileImage);
        localStorage.setItem("firstName", loginJson.firstName);
        localStorage.setItem("mobileNumber", loginJson.mobileNumber);
        localStorage.setItem("email", loginJson.email);

        const channelDetails = {
          ...loginData.userDetails.additionalDetailsJson,
        };
        setChannelDetails(dispatch, channelDetails);
        Navigate(`/life/Dashboard`);
      } else {
        Swal.fire({ text: loginJson.responseMessage, icon: "error" });
      }
    } else {
      Swal.fire({ text: "Something went wrong", icon: "error" });
    }
  };
  const handlePasswordLogin = async () => {
    const loginuser = {
      Username: loginData.userId,
      Password: loginData.Password,
      ProductType: "Mica",
      envId: process.env.REACT_APP_EnvId,
    };
    setLoading(true);
    const login = await Authenticate(loginuser);
    setLoading(false);
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

      const res = await SearchUserSettingDetails("LandingPath", loginuser);

      if (res.data && res.data.data && res.data.data.LandingPath)
        Navigate(res.data.data.LandingPath);
      else Navigate(`/home/Dashboard`);
    } else {
      Swal.fire({ text: login.data.responseMessage, icon: "error" });
    }
  };
  const onSendOTP = async (mobileNumber) => {
    const contactNo = !checkForValue(mobileNumber) ? mobileNumber : loginData.MobileNo;
    if (IsMobileNumber(contactNo) !== true) {
      setValidationFlag(true);
    } else {
      setLoading(true);
      await GenericApi("LifeInsurance", "SendOtpAPi", {
        email: "",
        contactNo,
        MasterType: "LoginVerification",
        whatsAppNo: contactNo,
        addtionalDetails: {
          isEmail: "false",
          isSMS: "true",
          isWhatsApp: "true",
        },
      }).then((res) => {
        setLoading(false);
        if (res.status === 1 && res.finalResult?.TransactionNo) {
          setTransactionNo(res.finalResult?.TransactionNo);
          setTimer(60);
          setResendOtp(resendOtp + 1);

          Swal.fire({
            icon: "success",
            text: `OTP sent to ${contactNo}`,
          });
        } else Swal.fire({ icon: "error", text: res.responseMessage });
      });
      setLoading(false);
    }
  };
  const onVerifyOTP = async () => {
    setLoading(true);

    await NotificationsVerifyOTP({
      otp,
      transactionNo,
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 1) {
        if (selectedUserType === "Customer") {
          sessionStorage.setItem("TrackAppMobileNo", loginData.MobileNo);
          sessionStorage.setItem("LoginStatus", true);
          const loginuser = {
            Username: "LICCustomer01@gmail.com",
            Password: "Mica@123",
            ProductType: "Mica",
            envId: process.env.REACT_APP_EnvId,
          };
          const channelDetails = {
            ChannelType: "D2C",
            MobileNo: loginData.MobileNo,
          };
          setChannelDetails(dispatch, channelDetails);
          setLoading(true);
          const login = await Authenticate(loginuser);
          setLoading(false);

          if (login.data.status === 1) {
            localStorage.setItem("userName", login.data.userName);
            localStorage.setItem("userId", login.data.userId);
            localStorage.setItem("roleId", login.data.roleId);
            localStorage.setItem("organizationId", login.data.organizationId);
            localStorage.setItem("token", login.data.token);
            localStorage.setItem("partnerId", login.data.partnerId);
            localStorage.setItem("profilePicture", login.data.profileImage);
            localStorage.setItem("firstName", login.data.firstName);
            localStorage.setItem("BranchCode", login.data.branchCode);
            Navigate(`/life/Plans`);
          }
        } else {
          handleOTPLogin();
        }
      } else Swal.fire({ icon: "error", text: res.responseMessage });
    });
  };
  const onUserTypeChange = (type) => {
    setSelectedUserType(type.value);
    setLoginType("OTP");
    setTimer(0);
    setResendOtp(0);
    setLoginData(defaultLoginData);
  };

  const handleUserDetailsFetch = async () => {
    if (!checkForValue(loginData.userId)) {
      setLoading(true);

      let userJson;
      let userExists;
      let validUser = true;
      if (selectedUserType === "Employee") {
        userJson = await GenericApi("LifeInsurance", "EmployeeLoginApi", {
          EmployeeSerialNo: loginData.userId,
        });
      } else {
        userJson = await GenericApi("LifeInsurance", "LICLoginAPI", {
          AgentId: loginData.userId,
        });
        if (userJson.finalResult && userJson.finalResult?.additionalDetailsJson)
          userJson.finalResult.additionalDetailsJson.ChannelType =
            userJson.finalResult.additionalDetailsJson.agency_type === "B" ? "BANCA" : "A2C";
      }
      validUser = !checkForValue(userJson.finalResult?.contactNumber);
      if (validUser) {
        const userData = await getUserType({ UserName: userJson.finalResult?.email });
        if (userData.status === 200) {
          if (userData.data.status === 1) {
            userExists = true;
          }
        }
        setLoginData({
          ...loginData,
          userExists,
          userDetails: userJson.finalResult,
          MobileNo: userJson.finalResult?.contactNumber,
        });
        setLoading(false);
        if (loginType === "OTP") onSendOTP(userJson.finalResult?.contactNumber);
        if (userExists !== true) setLoginType("OTP");
      } else {
        const userData = await getUserType({ UserName: loginData.userId });
        setLoading(false);
        if (userData.status === 200) {
          if (userData.data.status === 1) {
            userExists = true;
          }
        }
        if (userExists === true) {
          setLoginType("Password");
        } else {
          Swal.fire({ text: "Agent Details not found", icon: "error" });
        }
      }
      setLoading(false);
    }
  };

  const UserIdContent = (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBox sx={{ width: buttonWidth }}>
          <MDInput
            label="User ID"
            name="userId"
            value={loginData.userId}
            // onBlur={handleUserDetailsFetch}
            onChange={handleInputChange}
          />
        </MDBox>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBox sx={{ width: buttonWidth }}>
          <MDInput
            label="Password"
            name="Password"
            type="Password"
            onChange={handleInputChange}
            value={loginData.Password}
          />
        </MDBox>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <MDBox
          sx={{
            width: buttonWidth,
            mt: "1.5rem",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
              <MDButton
                variant="outlined"
                sx={buttonProperties}
                onClick={() => setSelectedUserType("")}
              >
                Back
              </MDButton>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
              <MDButton sx={buttonProperties} onClick={handlePasswordLogin}>
                Login
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
  const AgentOTPContent = (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBox sx={{ width: buttonWidth }}>
          <MDTypography
            sx={{
              fontSize: "1rem",
              color: "rgba(25, 118, 210, 1)",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            You will receive the OTP to the registered mobile number
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBox sx={{ width: buttonWidth, mt: "1rem" }}>
          <MDInput
            label="User ID"
            name="userId"
            value={loginData.userId}
            disabled={resendOtp !== 0}
            onChange={handleInputChange}
          />
        </MDBox>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {resendOtp === 0 ? (
          <MDBox
            sx={{
              width: buttonWidth,
              mt: "0.5rem",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDButton
                  variant="outlined"
                  sx={buttonProperties}
                  onClick={() => setSelectedUserType("")}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDButton sx={buttonProperties} onClick={handleUserDetailsFetch}>
                  Get OTP
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        ) : (
          <MDBox sx={{ width: buttonWidth }}>
            <MDInput
              label="Enter OTP"
              name="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </MDBox>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {resendOtp !== 0 && (
          <Grid container spacing={2} sx={{ width: buttonWidth }}>
            <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
              <MDTypography
                sx={{
                  textDecorationLine: "underline",
                  fontSize: "0.875rem",
                  width: "100%",
                  textAlign: "start",
                  color: "rgba(25, 118, 210, 1)",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  setLoginData({ ...loginData, userExists: true });
                  setResendOtp(0);
                }}
              >
                Change User ID
              </MDTypography>
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
              <MDTypography
                sx={{
                  justifyContent: "end",
                  display: "flex",
                  textDecorationLine: "underline",
                  fontSize: "0.875rem",
                  width: "100%",
                  textAlign: "end",
                  color: timer === 0 ? "rgba(25, 118, 210, 1)" : "#808080",
                  "&:hover": {
                    cursor: timer === 0 ? "pointer" : "cursor",
                  },
                }}
                onClick={() => {
                  if (timer === 0) onSendOTP();
                }}
              >
                Resend OTP
              </MDTypography>
              <MDTypography
                sx={{
                  textAlign: "end",
                  color: "rgba(25, 118, 210, 1)",
                  visibility: timer > 0 ? "visible" : "hidden",
                }}
              >
                {timer}
              </MDTypography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {resendOtp !== 0 && (
          <MDBox
            sx={{
              width: buttonWidth,
              mt: "0.5rem",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDButton
                  variant="outlined"
                  sx={buttonProperties}
                  onClick={() => setSelectedUserType("")}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDButton sx={buttonProperties} onClick={onVerifyOTP}>
                  Login
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        )}
      </Grid>
    </Grid>
  );
  const CustomerContent = (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBox sx={{ width: buttonWidth }}>
          <MDTypography
            sx={{
              fontSize: "1rem",
              color: "rgba(25, 118, 210, 1)",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Enter your Registered Mobile Number
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBox sx={{ width: buttonWidth, mt: "1rem" }}>
          <MDInput
            label="Mobile Number"
            name="MobileNo"
            value={loginData.MobileNo}
            onChange={handleInputChange}
            disabled={resendOtp !== 0}
            error={validationFlag}
            type="number"
            helperText={validationFlag ? IsMobileNumber(loginData.MobileNo) : ""}
          />
        </MDBox>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {resendOtp === 0 ? (
          <MDBox
            sx={{
              width: buttonWidth,
              mt: "0.5rem",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDButton
                  variant="outlined"
                  sx={buttonProperties}
                  onClick={() => setSelectedUserType("")}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDButton sx={buttonProperties} onClick={() => onSendOTP()}>
                  Get OTP
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        ) : (
          <MDBox sx={{ width: buttonWidth }}>
            <MDInput
              label="Enter OTP"
              name="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </MDBox>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {resendOtp !== 0 && (
          <Grid container spacing={2} sx={{ width: buttonWidth }}>
            <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
              <MDTypography
                sx={{
                  textDecorationLine: "underline",
                  fontSize: "0.875rem",
                  width: "100%",
                  textAlign: "start",
                  color: "rgba(25, 118, 210, 1)",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => setResendOtp(0)}
              >
                Change Mobile Number
              </MDTypography>
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
              <MDTypography
                sx={{
                  justifyContent: "end",
                  display: "flex",
                  textDecorationLine: "underline",
                  fontSize: "0.875rem",
                  width: "100%",
                  textAlign: "end",
                  color: timer === 0 ? "rgba(25, 118, 210, 1)" : "#808080",
                  "&:hover": {
                    cursor: timer === 0 ? "pointer" : "cursor",
                  },
                }}
                onClick={() => {
                  if (timer === 0) onSendOTP();
                }}
              >
                Resend OTP
              </MDTypography>
              <MDTypography
                sx={{
                  textAlign: "end",
                  color: "rgba(25, 118, 210, 1)",
                  visibility: timer > 0 ? "visible" : "hidden",
                }}
              >
                {timer}
              </MDTypography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {resendOtp !== 0 && (
          <MDBox
            sx={{
              width: buttonWidth,
              mt: "0.5rem",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDButton
                  variant="outlined"
                  sx={buttonProperties}
                  onClick={() => setSelectedUserType("")}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDButton sx={buttonProperties} onClick={onVerifyOTP}>
                  Login
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        )}
      </Grid>
    </Grid>
  );
  const AgentContent = (
    <MDBox sx={{ width: "100%" }}>{loginType === "OTP" ? AgentOTPContent : UserIdContent}</MDBox>
  );

  const userTypeList = [
    { img: CustomerLogin, text: "Customer", value: "Customer" },
    { img: AgentLogin, text: "Agent/CLIA/Banca", value: "Agent" },
    { img: EmployeeLogin, text: "Employee", value: "Employee" },
  ];

  return (
    <Grid container>
      <MDLoader loader={loading} />
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox
          width="100%"
          height="100vh"
          display={{ xs: "none", sm: "none", md: "inline-block", lg: "inline-block" }}
        >
          <img src={LoginTheme} alt="bg" width="100%" height="100%" />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox
          width="100%"
          height="90vh"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Grid container spacing="1.5rem">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox
                width="100%"
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <img src={CompanyLogo} alt="..." width="142px" height="85px" />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#000000",
                }}
              >
                {checkForValue(selectedUserType) ? "Login as" : "Login"}
              </MDTypography>
            </Grid>
            {!checkForValue(selectedUserType) && selectedUserType !== "Customer" && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                  alignItems="center"
                >
                  <MDBox>
                    <FormLabel
                      variant="body1"
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        color: "#000000",
                      }}
                    >
                      Login with
                    </FormLabel>
                  </MDBox>
                  <MDBox sx={{ minWidth: 150 }}>
                    <RadioGroup
                      row
                      value={loginType}
                      onChange={(e) => setLoginType(e.target.value)}
                    >
                      <Stack direction="row" spacing={0.2}>
                        <FormControlLabel value="OTP" label="OTP" control={<Radio />} />
                        {loginData.userExists === true && (
                          <FormControlLabel value="Password" label="User ID" control={<Radio />} />
                        )}
                      </Stack>
                    </RadioGroup>
                  </MDBox>
                </Stack>
              </Grid>
            )}
            {selectedUserType === "Customer" && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {CustomerContent}
              </Grid>
            )}
            {(selectedUserType === "Agent" || selectedUserType === "Employee") && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {AgentContent}
              </Grid>
            )}
            {checkForValue(selectedUserType) && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {userTypeList.map((type) => (
                  <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center", p: 1 }}>
                    <MDButton
                      sx={{
                        width: userSelectionWidth,
                        justifyContent: "start",
                        fontSize: "0.875rem",
                      }}
                      startIcon={<img src={type.img} alt="..." />}
                      onClick={() => onUserTypeChange(type)}
                    >
                      {type.text}
                    </MDButton>
                  </MDBox>
                ))}
              </Grid>
            )}
          </Grid>
        </MDBox>
        <MDBox
          width="100%"
          height="10vh"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <MDTypography
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: 400,
              color: "#000000",
            }}
          >
            Copyright © 2023 - All Rights Reserved - Life Insurance Corporation of India.
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}
export default LICLoginPage;
