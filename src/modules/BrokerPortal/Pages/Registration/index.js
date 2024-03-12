import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbarEmpty from "modules/BrokerPortal/Layouts/BPNavbarEmpty";
import { Circle } from "@mui/icons-material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { FormControl } from "@mui/material";
import POSPREg from "assets/images/BrokerPortal/POSPReg.png";
import { useNavigate, Link } from "react-router-dom";
import breakpoints from "assets/theme/base/breakpoints";
import swal from "sweetalert";
import { FetchPOSPDetails, ViewFiles } from "../MyProfile/data";
import RegistrationMobile from "./RegistrationMobile";
import {
  setRegistrationInput,
  setApplicationNo,
  setUserDetails,
  useDataController,
  setPOSPDetails,
} from "../../context";
import { getOTP, GetOTP } from "./data/index";
import { getRequest } from "../../../../core/clients/axiosclient";
// import appConfig from "../../../../jsconfig.json";

function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Click On Resend OTP in 00:{counter}</div>;
}

function Registration() {
  const navigate = useNavigate();

  const [checkState, setCheckState] = useState(false);

  const [, dispatch] = useDataController();

  const [data, setData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    errorMobile: false,
    errorEmail: false,
    status: false,
    dataError: false,
    otpError: false,
    inValidEmailError: false,
    inValidMobError: false,
    sendOtpFlag: true,
    otpvalidFlag: false,
  });

  const [counter, setCounter] = useState();
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);

  const [OTP, setOTP] = useState({ otp: "" });

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
  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
      setData((prevState) => ({ ...prevState, sendOtpFlag: false }));
    }
    if (counter === 0) {
      setCounter(30);
      setStartCounterFlag(false);
      setData((prevState) => ({ ...prevState, status: false }));
      setTimerFlag(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);

  const handleOTPChange = (event) => {
    const numRegex = /^[0-9]*$/;
    if (numRegex.test(event.target.value)) {
      const newValue = {
        ...OTP,
        [event.target.name]: event.target.value,
      };
      setOTP(newValue);
    }
  };

  const handleOTPvalidation = (e) => {
    const numRegex = /^\d{6}$/;
    if (!numRegex.test(e.target.value)) {
      setData((prevState) => ({ ...prevState, otpvalidFlag: true }));
    } else {
      setData((prevState) => ({ ...prevState, otpvalidFlag: false }));
    }
  };

  const handleVerifyOTP = async () => {
    if (OTP.otp === "" || data.email === "" || data.mobileNumber === "" || data.name === "") {
      setData((prevState) => ({ ...prevState, otpError: true, dataError: true }));
      swal({
        icon: "error",
        text: "Please fill all the required fields",
      });
    } else {
      FetchPOSPDetails(data.email).then(async (res) => {
        if (res.data.length !== 0) {
          if (res.status === 200) {
            const Img = res.data[0].pospdetailsJson.RawImage;
            await ViewFiles(Img).then((result1) => {
              if (result1.data !== "") {
                localStorage.setItem("ProfileImg", result1.data.data);
              }
            });
            setPOSPDetails(dispatch, res.data[0].pospdetailsJson);
            setApplicationNo(dispatch, res.data[0].pospdetailsJson.ApplicationNo);
          }
        } else {
          const partnerID = "53";
          const productID = "449";
          getRequest(
            `Partner/GetApplicationNumber?partnerId=${partnerID}&productId=${productID}`
          ).then((result) => {
            console.log("result", result);
            if (result.status === 200) {
              setApplicationNo(dispatch, result.data);
            }
          });
        }
      });
      console.log("qwertyuiop");
      if (OTP.otp !== "") {
        const verifyOTP = {
          otp: OTP.otp,
          email: data.email,
          mobileNumber: data.mobileNumber,
          userName: data.email,
          envId: process.env.REACT_APP_EnvId,
          productType: "MICA",
          isFirstTimeUser: true,
          isClaimsLive: false,
        };
        setData((prevState) => ({ ...prevState, otpError: false, dataError: true }));
        if (checkState === true && data.errorEmail === false && data.errorMobile === false) {
          const Name = data.name.trim().split(" ");
          const Obj = {
            FirstName: Name[0],
            LastName: Name.slice(1).join(" "),
            Email: data.email,
            MobileNo: data.mobileNumber,
          };

          setUserDetails(dispatch, Obj);
          setRegistrationInput(dispatch, data);
          Promise.all([GetOTP(dispatch, verifyOTP)]).then(async (results) => {
            if (results[0] === null) {
              swal({
                icon: "error",
                text: "Please enter the valid OTP sent to your Email",
              });
            } else if (results[0].status === 1) {
              setStartCounterFlag(false);
              setCounter(0);
              // const partnerID = "53";
              // const productID = "449";
              // getRequest(
              //   `Partner/GetApplicationNumber?partnerId=${partnerID}&productId=${productID}`
              // ).then((result) => {
              //   console.log("result", result);
              //   if (result.status === 200) {
              //     setApplicationNo(dispatch, result.data);
              //   }
              // });
              navigate(`/modules/BrokerPortal/Pages/MyProfile/ProfileDetails`);
            }
          });
        }
        if (checkState === false) {
          swal({
            icon: "error",
            text: "Please check the terms and conditions",
          });
        }
      }
    }
  };

  const updateCompareList = () => {
    setCheckState(!checkState);
    // console.log("New List", newList);
  };

  const handleInputChange = async (event) => {
    if (event.target.name === "name") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, [event.target.name]: event.target.value };
          setData(newValue);
        }
      }
    } else if (event.target.name === "mobileNumber") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        const newValue = { ...data, [event.target.name]: event.target.value };
        setData(newValue);
        setData((prevState) => ({ ...prevState, inValidMobError: true }));
      } else {
        setData((prevState) => ({ ...prevState, inValidMobError: false }));
        // await getRequest(
        //   `UserProfile/EmailAndMobileNoDublication?Email=${data.email}&MobileNo=${data.mobileNumber}`
        // ).then((result1) => {
        //   console.log("asdfghjkl", result1);
        //   if (result1.status === 200) {
        //     if (result1.data === "true") {
        //       setData((prevState) => ({ ...prevState, errorMobile: true }));
        //     } else {
        //       setData((prevState) => ({ ...prevState, errorMobile: false }));
        //     }
        //   }
        // });
      }
    } else if (event.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(event.target.value)) {
        const newValue = { ...data, [event.target.name]: event.target.value };
        setData(newValue);
        setData((prevState) => ({ ...prevState, inValidEmailError: true }));
      } else {
        setData((prevState) => ({ ...prevState, inValidEmailError: false }));
        await getRequest(
          `UserProfile/EmailAndMobileNoDublication?Email=${data.email}&MobileNo=""`
        ).then((result1) => {
          console.log("asdfghjkl", result1);
          if (result1.status === 200) {
            if (result1.data.result === "true") {
              setData((prevState) => ({ ...prevState, errorEmail: true }));
            } else {
              setData((prevState) => ({ ...prevState, errorEmail: false }));
            }
          }
        });
      }
    }
  };

  const handleMobileNumber = (e) => {
    const numReg = /^[0-9]*$/;
    if (numReg.test(e.target.value)) {
      const newValue = { ...data, [e.target.name]: e.target.value };
      setData(newValue);
    }
  };

  const sentOTPClick = async () => {
    setStartCounterFlag(true);
    const sendOTP = {
      name: data.name,
      otp: "1234",
      email: data.email,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: data.mobileNumber,
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    if (data.email === "" || data.mobileNumber === "" || data.name === "") {
      setData((prevState) => ({ ...prevState, dataError: true }));
      setStartCounterFlag(false);
    } else {
      setData((prevState) => ({ ...prevState, dataError: false }));
      if (
        data.email !== "" &&
        data.mobileNumber !== "" &&
        data.inValidEmailError === false &&
        data.inValidMobError === false &&
        data.errorEmail === false
      ) {
        // await getRequest(
        //   `Partner/EmailAndMobileNoDublication?Email=${data.email}&MobileNo=${data.mobileNumber}`
        // ).then((result1) => {
        //   console.log("asdfghjkl", result1);
        //   if (result1.status === 200) {
        //     if (result1.data === "true") {
        //       setData((prevState) => ({ ...prevState, error: true }));
        //     } else {
        //       setData((prevState) => ({ ...prevState, error: false }));
        // if (data.errorMobile === false && data.errorEmail === false) {
        getOTP(sendOTP).then((result) => {
          if (result.status === 1) {
            setData((prevState) => ({ ...prevState, status: true }));
            setCounter(30);
            setTimerFlag(false);
          } else {
            setData((prevState) => ({ ...prevState, status: false }));
          }
        });
        // }
      }
    }
  };

  const handleTermsAndConditions = () => {
    window.open(process.env.REACT_APP_CustomerTerm, "_blank");
  };

  const getReturnValue = () => {
    console.log("Return value");
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
                {/* {`Become Online ‘Point of Sales Person’ in Insurance Join as POSP with ${process.env.REACT_APP_TITLE}`} */}
                Become Online Agent in Insurance Join as Agent with LIC
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
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Zero
                Investment
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Product
                training & knowledge sharing sessions
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Many
                Insurance Products
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Multiple
                Insurance Companies
              </MDTypography>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", textAlign: "left", color: "#FFFFFF", mx: "4rem" }}
              >
                <Circle sx={{ fontSize: "5px!important", verticalAlign: "middle" }} /> Single
                Platform
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox sx={{ mx: "10.75rem", mt: 3 }}>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                Register
              </MDTypography>
              <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Full Name"
                    value={data.name}
                    name="name"
                    onChange={handleInputChange}
                    error={data.name === "" ? data.dataError : null}
                    required
                    autoComplete="off"
                  />
                  {data.dataError && data.name === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Mobile Number"
                    value={data.mobileNumber}
                    name="mobileNumber"
                    onChange={handleMobileNumber}
                    onBlur={handleInputChange}
                    inputProps={{ maxLength: 10 }}
                    error={data.mobileNumber === "" ? data.dataError : null}
                    required
                    autoComplete="off"
                  />
                  {/* {data.errorMobile &&
                  data.dataError === false &&
                  data.inValidMobError === false ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      This Mobile Number is already registered in our network
                    </MDTypography>
                  ) : null} */}
                  {data.dataError && data.errorMobile === false && data.mobileNumber === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                  {data.inValidMobError && data.mobileNumber !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      Please fill the valid 10 digit mobile number
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Email ID"
                    value={data.email}
                    name="email"
                    onChange={(e) => {
                      setData({ ...data, [e.target.name]: e.target.value });
                    }}
                    onBlur={handleInputChange}
                    error={data.email === "" ? data.dataError : null}
                    required
                    autoComplete="off"
                  />
                  {data.errorEmail &&
                  data.dataError === false &&
                  data.inValidEmailError === false ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      This Email ID is already registered in our network
                    </MDTypography>
                  ) : null}
                  {data.dataError && data.errorEmail === false && data.email === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                  {data.inValidEmailError && data.email !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      Please fill the valid Email ID
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <>
                    {data.status === true ? (
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
                            mt: "-26px",
                          }}
                          onClick={sentOTPClick}
                        >
                          Resend OTP{" "}
                        </MDTypography>
                      ) : (
                        data.sendOtpFlag === true && (
                          <MDTypography
                            sx={{
                              fontSize: "0.9rem",
                              color: "blue",
                              textAlign: "right",
                              textDecoration: "underline",
                              cursor: "pointer",
                              mt: "-26px",
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
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                  <MDTypography
                    sx={{
                      fontSize: "0.9rem",
                      color: "green",
                      textAlign: "left",
                      mt: "-1rem",
                    }}
                  >
                    {/* {startCounterFlag && data.status === true ? <Timer counter={counter} /> : null} */}
                    {startCounterFlag && data.status === true && <Timer counter={counter} />}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDInput
                    label="Enter OTP"
                    onChange={handleOTPChange}
                    onBlur={handleOTPvalidation}
                    value={OTP.otp}
                    name="otp"
                    inputProps={{ maxLength: 6, type: "password" }}
                    error={OTP.otp === "" ? data.otpError : null}
                    autoComplete="off"
                  />
                  {data.otpError && OTP.otp === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      Please fill the required field
                    </MDTypography>
                  ) : null}
                  {data.otpvalidFlag && OTP.otp > 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                      Please fill vaild 6 digits OTP
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox display="flex" flexDirection="row" alignItems="center">
                    {
                      //   <Checkbox
                      //   color="primary"
                      //   icon={<AdbIcon/>}
                      //   checked={checkState}
                      //   onChange={updateCompareList}
                      //   sx={{
                      //     "& .MuiCheckbox-root .MuiSvgIcon-roots": {
                      //       color: "black",
                      //     },
                      //   }}
                      // />
                    }
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
                    <MDButton color="info" onClick={handleVerifyOTP}>
                      Get Started
                    </MDButton>
                  </MDBox>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
                {/* <MDBox> */}
                {/* </MDBox> */}
                {/* </Grid> */}
              </Grid>

              <MDTypography
                sx={{
                  fontSize: "1.1rem",
                  // color: "blue",
                  textAlign: "center",
                  marginTop: "50px",
                }}
              >
                Already registered as Agent?
                <Link
                  style={{ color: "#0071D9", cursor: "pointer", marginLeft: "10px" }}
                  to="/modules/BrokerPortal/Login/BPLogin"
                >
                  Login
                </Link>
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
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
  return mobileView === true ? <RegistrationMobile /> : getReturnValue();
}

export default Registration;
