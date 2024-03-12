import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import OtpInput from "react-otp-input-rc-17";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
// import Icon from "@mui/material/Icon";
import swal from "sweetalert";
import ClearIcon from "@mui/icons-material/Clear";
// import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
// import PageLayout from "examples/LayoutContainers/PageLayout";
// import Footer from "modules/BrokerPortal/Pages/MotorComparison/Footer";
import CustDetail from "assets/images/BrokerPortal/CustDetail.png";
import { getRequest } from "core/clients/axiosclient";
import CustomerMain from "assets/images/BrokerPortal/Customer/CustomerMain.png";
import { Stack, CircularProgress, Modal } from "@mui/material";
import BPFooter from "../../Layouts/BPFooter";
import { GetOTP, sendOTP } from "../../Login/BPLogin/data/index";
import { getOTP } from "../CustomerEngage/data/index";
import { useDataController, setCustomerJson } from "../../context";
// import Navbar from "./CustomerLandingNavBar/NavBar";
import BPNavbarEmpty from "../../Layouts/BPNavbarEmpty";
import breakpoints from "../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

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

function Loading() {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <CircularProgress size="10rem" />
    </MDBox>
  );
}

function ChangeEmailModel({
  handleModalEmailClose,
  handleModalOpen,
  setModalEmailOpen,
  setData,
  setStartCounterFlag,
  setCounter,
}) {
  const [otpdata, setotpdata] = useState({
    otp: "",
    Email: "",
  });
  const handleEmail = (event) => {
    setotpdata((prevState) => ({
      ...prevState,
      Email: event.target.value,
    }));
  };

  const [flags, setFlags] = useState({
    errorFlag: false,
    disableFlag: false,
    emailError: false,
    getotpflag: false,
  });

  const handleValidate = (event) => {
    if (event.target.name === "Email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(event.target.value)) {
        const newValue = { ...otpdata, [event.target.name]: event.target.value };
        setotpdata(newValue);
        setFlags((prevState) => ({ ...prevState, emailError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailError: false }));
      }
    } else {
      const newValue = { ...otpdata, [event.target.name]: event.target.value };
      setotpdata(newValue);
    }
  };
  // const [modalEmailOpen, setModalEmailOpen] = useState(false);

  const handleEmailchange = async () => {
    if (otpdata.Email !== "") {
      setFlags((prevState) => ({ ...prevState, getotpflag: true }));
    }
    if ((flags.emailError === true && otpdata.Email !== "") || otpdata.Email === "") {
      swal({
        icon: "error",
        text: "Please Enter valid EmailId",
      });
    } else {
      setotpdata((prevState) => ({ ...prevState, otp: "" }));
      const sendOTP1 = {
        otp: "1234",
        email: otpdata.Email,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: "",
        sendSms: true,
        isBerry: false,
        client: "iNube BrokerPortal",
      };
      await getOTP(sendOTP1).then((result) => {
        console.log("getotpemail", result);
        if (result.status === 1) {
          setData((prevState) => ({ ...prevState, status: true }));
          setStartCounterFlag(true);
          setCounter(30);
        } else {
          setData((prevState) => ({ ...prevState, status: false }));
        }
      });
      setModalEmailOpen(false);
      handleModalOpen();
    }
  };

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
          sx={{ marginTop: "72px", margingLeft: "10px" }}
          p={2}
        >
          <MDInput
            id="Email"
            value={otpdata.Email}
            name="Email"
            onChange={handleEmail}
            onBlur={handleValidate}
            label="Email"
          />
          {flags.errorFlag && otpdata.Email === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
          {flags.emailError && otpdata.Email !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill the valid email id
            </MDTypography>
          ) : null}

          <Stack justifyContent="right" direction="row" mt={4}>
            <MDButton
              onClick={handleEmailchange}
              sx={{
                fontSize: "0.7rem",
              }}
            >
              Get OTP
            </MDButton>
          </Stack>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function Timer({ counter }) {
  return <div>Click On Resend OTP in 00:{counter}</div>;
}

function CustomerOTP() {
  const navigate = useNavigate();
  const [otpdata, setotpdata] = useState({
    otp: "",
    Email: "",
  });

  const handleOTP = (otp1) => {
    setotpdata((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
    // console.log(otpdata.otp, "opt1");
  };
  // console.log("otpdata.otp", otpdata.otp);
  const [counter, setCounter] = useState();
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  // const [timerFlag, setTimerFlag] = useState(false);

  const [, dispatch] = useDataController();
  const [controller] = useDataController();
  const { loginDetails } = controller;
  console.log("loginDetails", loginDetails);

  const handleFetchCustDetails = async () => {
    await getRequest(`UserProfile/FetchCustDetails?Email=${loginDetails.Email}`).then((result) => {
      console.log("resultp", result);
      setCustomerJson(dispatch, result?.data?.result?.[0]?.custJson);
    });
  };
  const [data, setData] = useState({
    otpError: false,
    otpvalidFlag: false,
    status: false,
    sendOtpFlag: false,
  });
  const handleOTPvalidation = (e) => {
    const numRegex = /^[0-9]{6}$/;
    if (!numRegex.test(e.target.value)) {
      setData((prevState) => ({ ...prevState, otpvalidFlag: true }));
    } else {
      setData((prevState) => ({ ...prevState, otpvalidFlag: false }));
    }
  };
  const handleotpverify = async () => {
    if (otpdata.otp === "" || data.otpvalidFlag === true) {
      setData((prevState) => ({ ...prevState, otpError: false }));
      swal({ icon: "error", text: "Enter Valid OTP" });
    } // if (otpdata.otp !== "")
    else {
      const verifyOTP = {
        otp: otpdata.otp,
        email: loginDetails.Email,
        mobileNumber: "",
        userName: loginDetails.Email,
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      Promise.all([GetOTP(dispatch, verifyOTP)]).then(async (results) => {
        console.log("OTPverifyResult", results);
        // navigate(
        //   `/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/CustomerProfile`
        // );
        if (results[0].status === 1) {
          localStorage.setItem("loggedIn", true);
          handleFetchCustDetails();
          navigate(`/customerlifelanding`);
        } else {
          swal({ icon: "error", text: "Enter Valid OTP" });
        }
      });
    }
    // handleFetchCustDetails();
  };
  // useEffect(() => {
  //   localStorage.removeItem("loggedIn");
  // }, []);

  const sentOTPClick = async () => {
    // debugger;
    // setStartCounterFlag(true);
    const sendOTP1 = {
      otp: "1234",
      email: loginDetails.Email,
      userName: loginDetails.Email,
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    sendOTP(sendOTP1).then((result) => {
      console.log("sendotpemail", result);
      if (result.status === 1) {
        setData((prevState) => ({ ...prevState, status: true }));
        setStartCounterFlag(true);
        setCounter(30);
      } else {
        setData((prevState) => ({ ...prevState, status: false }));
      }
    });
  };

  console.log("aaa", startCounterFlag);
  console.log("Timer", counter);

  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const handleModalEmailOpen = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setModalEmailOpen(true);
  };

  const [flags, setFlags] = useState({
    errorFlag: false,
    disableFlag: false,
    emailError: false,
    getotpflag: false,
  });
  console.log("flags", flags);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };

  const handleModalEmailClose = () => {
    setModalEmailOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };

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
      // setTimerFlag(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);

  return (
    <MDBox sx={{ bgcolor: "#ffffff" }}>
      <BPNavbarEmpty />
      <MDBox>
        {loading ? (
          <Loading />
        ) : (
          <Modal
            open={modalEmailOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ChangeEmailModel
              handleModalEmailClose={handleModalEmailClose}
              handleModalEmailOpen={handleModalEmailOpen}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}
              setModalEmailOpen={setModalEmailOpen}
              setData={setData}
              setStartCounterFlag={setStartCounterFlag}
              setCounter={setCounter}
            />
          </Modal>
        )}
      </MDBox>
      <Grid container spacing={2}>
        {window.innerWidth > breakpoints.values.md && (
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDBox component="img" src={CustomerMain} sx={{ ml: "10rem", mt: "0.5rem" }} />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          xxl={5}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Grid container spacing={2} p={4}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h2">Validate OTP</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5">{`Enter OTP sent to ${loginDetails.Email}`}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <OtpInput
                value={otpdata.otp}
                onChange={handleOTP}
                onBlur={handleOTPvalidation}
                numInputs={6}
                isInputNum
                hasErrored
                isInputSecure
                inputStyle={{
                  width: "48px",
                  height: "48px",
                  margin: "0.15rem",
                  fontSize: "1rem",
                  borderRadius: 4,
                  border: "2px solid rgba(0,0,0,0.3)",
                  background: "white",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{ color: "#0071D9", cursor: "pointer", textDecoration: "underline" }}
                onClick={handleModalEmailOpen}
              >
                Change Email
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{
                  cursor: "pointer",
                  color: "#0071D9",
                  textDecoration: "underline",
                }}
              >
                <span onClick={sentOTPClick} role="button" onKeyDown={sentOTPClick} tabIndex="0">
                  Resend OTP
                </span>
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {" "}
              {data.status === true ? (
                <MDTypography
                  sx={{
                    fontSize: "0.9rem",
                    color: "green",
                    textAlign: "left",
                    mt: "1rem",
                  }}
                >
                  OTP sent successfully
                </MDTypography>
              ) : null}
              <MDTypography
                sx={{
                  fontSize: "0.9rem",
                  color: "green",
                  textAlign: "left",
                }}
              >
                {/* {startCounterFlag && data.status === true ? <Timer counter={counter} /> : null} */}
                {startCounterFlag === true && data.status === true && <Timer counter={counter} />}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                <MDButton
                  onClick={handleotpverify}
                  variant="contained"
                  color="info"
                  style={{ textTransform: "capitalize" }}
                >
                  Continue
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BPFooter />
    </MDBox>
  );
}
export default CustomerOTP;
