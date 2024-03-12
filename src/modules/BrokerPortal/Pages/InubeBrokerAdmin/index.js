import * as React from "react";
import { useState, useEffect } from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbarEmpty from "modules/BrokerPortal/Layouts/BPNavbar";
import { Circle } from "@mui/icons-material";
import swal from "sweetalert";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import POSPREg from "assets/images/BrokerPortal/POSPReg.png";
import { useNavigate, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { blue } from "@mui/material/colors";
import { ProfileData } from "../MyProfile/data";
import { getOTP, GetOTP } from "./data";
import { useDataController, setProfileDetail } from "../../context";

const { Grid, Autocomplete } = require("@mui/material");

function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Click On Resend OTP in 00:{counter}</div>;
}

function BrokerAdmin() {
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [counter, setCounter] = useState(30);
  const [timerFlag, setTimerFlag] = useState(false);
  const [checkState, setCheckState] = useState(false);
  const [OTP, setOTP] = useState({ otp: "" });
  const [fields, setFields] = React.useState({
    TypeOfBroker: "",
    CompanyName: "",
    CompanyEmailId: "",
    Otp: "",
    errorEmail: false,
    status: false,
    dataError: false,
    otpError: false,
    sendOtpFlag: true,
    inValidEmailError: false,
  });
  const [, dispatch] = useDataController();

  const navigate = useNavigate();

  const { BrokerType } = ProfileData().basicdetails.Masters;
  console.log("BrokerType", BrokerType);
  const handleBroker = (e, value) => {
    fields.TypeOfBroker = value.mValue;
    setFields(fields);
    console.log("fields", fields);
  };

  const handleInput = (e) => {
    fields[e.target.name] = e.target.value;
    setFields(fields);
    console.log("fields", fields);
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
    // console.log("New List", newList);
  };

  const handleVerifyOTP = async () => {
    const verifyOTP = {
      otp: fields.Otp,
      email: fields.CompanyEmailId,
      mobileNumber: "",
      userName: fields.CompanyEmailId,
      envId: process.env.REACT_APP_EnvId,
      productType: "MICA",
      isFirstTimeUser: true,
      isClaimsLive: false,
    };
    if (fields.Otp === "" || fields.CompanyEmailId === "" || fields.CompanyName === "") {
      setFields((prevState) => ({ ...prevState, otpError: true, dataError: true }));
    } else {
      setFields((prevState) => ({ ...prevState, otpError: false, dataError: true }));
      if (checkState === true && fields.errorEmail === false) {
        setProfileDetail(dispatch, fields);
        await GetOTP(dispatch, verifyOTP).then((results) => {
          // setRegistrationInput(dispatch, results[0]);
          if (results.status === 1) {
            setStartCounterFlag(false);
            setCounter(0);

            navigate(`/Pages/ProfileDetail`);
          }
        });
      } else {
        swal({
          icon: "error",
          text: "Please check the terms and conditions",
        });
      }
    }
  };

  // const handleInputChange = async (event) => {
  //   if (event.target.name === "ComapanyName") {
  //     if (event.target.value.length < 50) {
  //       const nameReg = /^[a-zA-Z\s]+$/;
  //       if (nameReg.test(event.target.value) || event.target.value === "") {
  //         const newValue = { ...fields, [event.target.name]: event.target.value };
  //         setFields(newValue);
  //       }
  //     }
  //   } else if (event.target.name === "CompanyEmailId") {
  //     const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
  //     // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //     if (!emailRegex.test(event.target.value)) {
  //       const newValue = { ...fields, [event.target.name]: event.target.value };
  //       setFields(newValue);
  //       setFields((prevState) => ({ ...prevState, inValidEmailError: true }));
  //     } else {
  //       setFields((prevState) => ({ ...prevState, inValidEmailError: false }));
  //       await getRequest(`Partner/EmailAndMobileNoDublication?Email=${fields.CompanyEmailId}`).then(
  //         (result1) => {
  //           console.log("asdfghjkl", result1);
  //           if (result1.status === 200) {
  //             if (result1.data === "true") {
  //               setFields((prevState) => ({ ...prevState, errorEmail: true }));
  //             } else {
  //               setFields((prevState) => ({ ...prevState, errorEmail: false }));
  //             }
  //           }
  //         }
  //       );
  //     }
  //   }
  // };

  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
      setFields((prevState) => ({ ...prevState, sendOtpFlag: false }));
    }
    if (counter === 0) {
      setCounter(30);
      setStartCounterFlag(false);
      setFields((prevState) => ({ ...prevState, status: false }));
      setTimerFlag(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);

  const handleOTPChange = (event) => {
    fields[event.target.name] = event.target.value;
    setFields(fields);
    console.log("fields", fields);
    const numRegex = /^[0-9]*$/;
    if (numRegex.test(event.target.value)) {
      const newValue = {
        ...OTP,
        [event.target.name]: event.target.value,
      };
      setOTP(newValue);
    }
  };

  const sentOTPClick = async () => {
    setStartCounterFlag(true);
    const sendOTP = {
      CompanyName: fields.CompanyName,
      otp: "1234",
      email: fields.CompanyEmailId,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      isBerry: false,
      sendSms: true,
      client: "iNube BrokerPortal",
    };
    if (fields.CompanyEmailId === "" || fields.CompanyName === "") {
      setFields((prevState) => ({ ...prevState, dataError: true }));
    } else {
      setFields((prevState) => ({ ...prevState, dataError: false }));
      if (fields.CompanyEmailId !== "" && fields.inValidEmailError === false) {
        if (fields.errorEmail === false) {
          getOTP(sendOTP).then((result) => {
            if (result.status === 1) {
              setFields((prevState) => ({ ...prevState, status: true }));
            } else {
              setFields((prevState) => ({ ...prevState, status: false }));
            }
          });
        }
      }
    }
  };

  return (
    <PageLayout>
      <BPNavbarEmpty />
      <MDBox mt={8} sx={{ overflowY: "auto" }}>
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
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                APIs Pre-Integrated
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                White Labelled Portal
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                Complete Customer Buying Journey
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                Essential Components/Modules Bun
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} />
                On-Board PoSPs, Scale Your Reach
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox sx={{ mx: "10.75rem" }}>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                Broker Registration
              </MDTypography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    options={BrokerType}
                    onChange={handleBroker}
                    getOptionLabel={(option) => option.mValue}
                    //   error={data.name === "" ? data.dataError : null}
                    renderInput={(params) => <MDInput {...params} label="Type of Broker" />}
                    required
                  />
                  {/* {data.dataError && data.name === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    Please fill the required field
                  </MDTypography>
                ) : null} */}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Company Name"
                    name="CompanyName"
                    onChange={handleInput}
                    // onBlur={handleInputChange}
                    inputProps={{ maxLength: 10 }}
                    //   error={data.mobileNumber === "" ? data.dataError : null}
                    required
                    autoComplete="off"
                  />
                  {/* {data.errorMobile && data.dataError === false && data.inValidMobError === false ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    This Mobile Number is already registered in our network
                  </MDTypography>
                ) : null}
                {data.dataError && data.errorMobile === false && data.mobileNumber === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    Please fill the required field
                  </MDTypography>
                ) : null}
                {data.inValidMobError && data.mobileNumber !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    Please fill the valid 10 digit mobile number
                  </MDTypography>
                ) : null} */}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Company Email ID"
                    // value={fields.CompanyEmailId}
                    name="CompanyEmailId"
                    onChange={handleInput}
                    // onBlur={handleInputChange}
                    //   error={data.email === "" ? data.dataError : null}
                    required
                    autoComplete="off"
                  />
                  {/* {data.errorEmail && data.dataError === false && data.inValidEmailError === false ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    This Email ID is already registered in our network
                  </MDTypography>
                ) : null} */}
                  {/* {data.dataError && data.errorEmail === false && data.email === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    Please fill the required field
                  </MDTypography>
                ) : null} */}
                  {/* {data.inValidEmailError && data.email !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    Please fill the valid Email ID
                  </MDTypography>
                ) : null} */}
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
                  <>
                    {fields.status === true ? (
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
                    <MDBox>
                      {timerFlag === true ? (
                        <MDTypography
                          sx={{
                            fontSize: "0.9rem",
                            color: "blue",
                            textAlign: "right",
                            textDecoration: "underline",
                            cursor: "pointer",
                            mt: "-40px",
                          }}
                          onClick={sentOTPClick}
                        >
                          Resend OTP
                        </MDTypography>
                      ) : (
                        fields.sendOtpFlag === true && (
                          <MDTypography
                            sx={{
                              fontSize: "0.9rem",
                              color: "blue",
                              textAlign: "right",
                              textDecoration: "underline",
                              cursor: "pointer",
                              mt: "-40px",
                            }}
                            onClick={sentOTPClick}
                          >
                            Send OTP
                          </MDTypography>
                        )
                      )}
                    </MDBox>
                    {/* <MDTypography
                    sx={{
                      fontSize: "0.9rem",
                      color: "blue",
                      textAlign: "right",
                      textDecoration: "underline",
                      cursor: "pointer",
                      mt: "-1rem",
                    }}
                    onClick={sentOTPClick}
                  >
                    <MDBox>
                      {timerFlag === true ? (
                        <div
                          onClick={sentOTPClick}
                          tabIndex="0"
                          role="button"
                          onKeyDown={sentOTPClick}
                        >
                          Resend OTP
                        </div>
                      ) : null}
                      {timerFlag === false ? (
                        <div
                          onClick={sentOTPClick}
                          tabIndex="0"
                          role="button"
                          onKeyDown={sentOTPClick}
                        >
                          Send OTP
                        </div>
                      ) : null}
                    </MDBox>
                  </MDTypography> */}
                  </>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Enter Code"
                    onChange={handleOTPChange}
                    // value={OTP.otp}
                    name="Otp"
                    inputProps={{ maxLength: 6 }}
                    error={fields.otpError}
                    autoComplete="off"
                  />
                  {fields.otpError ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox display="flex" flexDirection="row" alignItems="center">
                    <ThemeProvider theme={theme}>
                      <CustomCheckbox checked={checkState} onChange={updateCompareList} />
                    </ThemeProvider>

                    <MDTypography sx={{ fontSize: "0.8rem" }}>
                      I agree to the{" "}
                      <span
                        role="button"
                        tabIndex={0}
                        //   onClick={handleTermsAndConditions}
                        //   onKeyDown={handleTermsAndConditions}
                        style={{
                          textDecoration: "underline",
                          color: "#0071D9",
                          fontSize: "0.8rem",
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
                    <MDButton color="info" onClick={handleVerifyOTP}>
                      Get Started
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
              <MDTypography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Already registered as Broker?
                <Link
                  style={{ color: "#0071D9", cursor: "pointer", marginLeft: "10px" }}
                  to="/pages/LoginAdmin"
                >
                  Login
                </Link>
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}
export default BrokerAdmin;
