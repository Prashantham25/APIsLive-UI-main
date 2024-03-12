import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import { Icon, Container, useMediaQuery, Stack, Grid, Drawer, IconButton } from "@mui/material";
import OtpInput from "react-otp-input-rc-17";
import Swal from "sweetalert2";
import { useDataController } from "modules/BrokerPortal/context";
import MDButton from "../../../../../../../components/MDButton";
import MDTypography from "../../../../../../../components/MDTypography";
import MDInput from "../../../../../../../components/MDInput";
import { GenericApi, NotificationsVerifyOTP } from "./index";
import { IsMobileNumber } from "../../../../../../../Common/Validations";

function ContactSupport({ contact, setContact }) {
  const matches = useMediaQuery("(min-width:700px)");
  const data = [
    {
      heading: "Help line customer support",
      subText: "You can reach out the customer support choose as per your plan",

      contact: [
        {
          subheading: "Customer Support for below plans",
          plans:
            "LIC's Bima Jyoti , LIC's Dhan Sanchay , LIC's Jeevan Azad, LIC's Dhan Vriddhi ,LIC's Dhan Rekha, LIC's Cancer Cover , LIC's New Pension Plus,LIC's Jeevan Utsav , LIC's New Tech Term , LIC's Jeevan Kiran, LIC's Saral Jeevan Bima, LIC's Nivesh Plus, LIC's SIIP",
          phone: "Call us at 022-26545027/26545032 (Monday to Friday: 10 am to 05.30 pm)",
          mail: "online_dmkt@licindia.com",
        },

        {
          subheading: "Customer Support for below plans",
          plans:
            "LIC's Jeevan Dhara-II , LIC's Saral Pension , LIC's Jeevan Shanti , LIC’s Jeevan Akshay-VII",
          phone: "Call us at 022-26545017 (Monday to Friday: 10 am to 05.30 pm)",
          mail: "online_dm@licindia.com",
        },
      ],
    },
  ];
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={contact}
      sx={{
        "& .MuiDrawer-paper": {
          margin: "0rem",
          width: matches ? "40vw" : "100vw",
          height: "100vh",
          overflowX: "hidden",
          zIndex: 10001,
          bgcolor: "#fff",
          borderRadius: 0,
          "&:before": {
            content: '""',
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 0,
          },
        },
      }}
    >
      <MDBox p={2} sx={{ bgcolor: "#fff", zIndex: 1 }}>
        <Grid container justifyContent="flex-end">
          <IconButton onClick={() => setContact(false)}>
            <Icon fontSize="large">close</Icon>
          </IconButton>
        </Grid>

        {data.map((x) => (
          <Grid container spacing={2} p={2}>
            <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
              <MDTypography
                sx={{
                  fontSize: "1.2rem",
                  textTransform: "capitalize",
                  fontWeight: 600,
                  color: "#1d4e9e",
                  whiteSpace: "normal",
                }}
              >
                {x.heading}
              </MDTypography>
            </Grid>
            <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
              <MDTypography
                sx={{
                  fontSize: "0.9rem",
                  textTransform: "capitalize",
                  whiteSpace: "normal",
                }}
              >
                {x.subText}
              </MDTypography>
            </Grid>
            {x.contact.map((y) => (
              <>
                <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                  <MDTypography
                    sx={{
                      fontSize: "1rem",
                      textTransform: "capitalize",
                      fontWeight: 600,
                      color: "#1d4e9e",
                      whiteSpace: "normal",
                    }}
                  >
                    {y.subheading}
                  </MDTypography>
                </Grid>
                <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                  <MDTypography
                    sx={{
                      fontSize: "1rem",
                      textTransform: "capitalize",
                      whiteSpace: "normal",
                    }}
                  >
                    {y.plans}
                  </MDTypography>
                </Grid>

                <Grid item container sx={{ bgcolor: "#FFFAEB" }} p={1}>
                  <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                    <Stack direction="row" display="flex">
                      <Icon fontSize="medium" sx={{ color: "#1d4e9e" }}>
                        call
                      </Icon>
                      <MDTypography
                        sx={{
                          fontSize: "1rem",
                          whiteSpace: "normal",
                        }}
                      >
                        <b>{y.phone}</b>
                      </MDTypography>
                    </Stack>
                  </Grid>
                  <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                    <Stack direction="row" display="flex">
                      <Icon fontSize="medium" sx={{ color: "#1d4e9e" }}>
                        mail
                      </Icon>
                      <MDTypography
                        sx={{
                          fontSize: "1rem",
                          textDecoration: "underline",
                          whiteSpace: "normal",
                        }}
                      >
                        {y.mail}
                      </MDTypography>
                    </Stack>
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
        ))}
      </MDBox>
    </Drawer>
  );
}

function LoginTab({ loginOpen, setLoginOpen, data, setData, setOtpStatus, otpFlag, setOtpFlag }) {
  const matches = useMediaQuery("(min-width:700px)");

  const [transactionNo, setTransactionNo] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState("");
  const [mobileVal, setMobileVal] = useState(false);
  const [mobileVal1, setMobileVal1] = useState(false);
  const [resentOtp, setResentOtp] = useState(0);

  const ProceedOtp = async () => {
    if (data.MobileNo === "") {
      setMobileVal1(true);
    } else if (mobileVal) {
      setMobileVal(true);
    } else {
      setOtpFlag(true);

      await GenericApi("LifeInsurance", "SendOtpAPi", {
        email: data.EmailId,
        contactNo: data.MobileNo,
        MasterType: "LoginVerification",
        whatsAppNo: data.MobileNo,
        addtionalDetails: {
          isEmail: "true",
          isSMS: "true",
          isWhatsApp: "true",
        },
      }).then((res) => {
        if (res.status === 1 && res.finalResult?.TransactionNo) {
          setTransactionNo(res.finalResult?.TransactionNo);
          setTimer(60);
          setResentOtp(resentOtp + 1);

          Swal.fire({
            icon: "success",
            text: `OTP sent to ${data.MobileNo}`,
          });
        } else Swal.fire({ icon: "error", text: res.responseMessage });
      });
    }
  };

  const onVerifyOTP = async () => {
    if (otp !== "") {
      await NotificationsVerifyOTP({
        otp,
        transactionNo,
      }).then((res) => {
        if (res.status === 1) {
          Swal.fire({ icon: "success", text: "OTP verified successfully" });
          setOtpStatus(true);
          // setAnchorEl(null);
          setLoginOpen(false);
          setOtp("");
          sessionStorage.setItem("TrackAppMobileNo", data.MobileNo);
          sessionStorage.setItem("LoginStatus", true);
        } else Swal.fire({ icon: "error", text: res.responseMessage });
      });
    } else {
      Swal.fire({ icon: "error", text: "Please enter the otp" });
    }
  };

  const handleMobileNoChange = (e) => {
    if (IsMobileNumber(e.target.value) === true) {
      setData({ ...data, MobileNo: e.target.value });
      setMobileVal(false);
    } else {
      setMobileVal(true);
    }
  };
  const handleOtp = (otp1) => {
    setOtp(otp1);
  };
  return (
    <Drawer
      variant="persistent"
      anchor={matches ? "right" : "bottom"}
      open={loginOpen}
      onClose={() => setLoginOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          margin: "0rem",
          width: matches ? "250px" : "100vw",
          minHeight: matches ? "250px" : "40vh",
          height: "auto",
          // overflowX: "hidden",
          right: matches ? "11%" : 0,
          left: "auto",
          mt: matches ? "64px" : 0,
          top: matches ? 0 : "",
          zIndex: 1001,
          boxShadow: "0px -4px 6px #7272726b",
        },
      }}
    >
      <MDBox
        sx={{
          alignContents: "center",
        }}
        p={2}
      >
        <Grid container spacing={0.5} textAlign="center">
          <Grid
            item
            xxl={12}
            xl={12}
            md={12}
            sm={12}
            xs={12}
            textAlign={matches ? "right" : "center"}
          >
            <IconButton onClick={() => setLoginOpen(false)}>
              <Icon fontSize={matches ? "small" : "large"}>
                {matches ? "chevron_right" : "expand_more"}
              </Icon>
            </IconButton>
          </Grid>

          <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
            <MDTypography
              sx={{
                fontSize: "1rem",
                textTransform: "capitalize",
                fontWeight: 600,
                color: "#1d4e9e",
                whiteSpace: "normal",
              }}
            >
              {otpFlag ? "OTP Verification" : "Login "}
            </MDTypography>
          </Grid>
          <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
            <MDTypography
              sx={{
                fontSize: "0.8rem",
                // textTransform: "capitalize",
                fontWeight: "regular",
                whiteSpace: "normal",
              }}
            >
              {otpFlag
                ? "Please Enter the 6 Digit OTP"
                : "Please Enter Your Register Mobile No. to validate and proceed"}
            </MDTypography>
          </Grid>
          {otpFlag ? (
            <>
              <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                <MDTypography
                  sx={{
                    fontSize: "0.9rem",
                    textTransform: "capitalize",
                    fontWeight: 500,
                    whiteSpace: "normal",
                  }}
                >
                  Enter the otp
                </MDTypography>
              </Grid>
              <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                <Stack direction="row" display="flex" justifyContent="center">
                  <OtpInput
                    value={otp}
                    onChange={handleOtp}
                    numInputs={6}
                    isInputNum
                    hasErrored
                    isInputSecure
                    inputStyle={{
                      width: "30px",
                      height: "35px",
                      margin: "0.2rem",
                      fontSize: "1rem",
                      borderRadius: 4,
                      border: "2px solid rgba(0,0,0,0.3)",
                      background: "white",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                <MDTypography
                  sx={{
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                    // fontWeight: 400,
                  }}
                >
                  {`OTP sent to ${data.MobileNo}`}
                </MDTypography>
              </Grid>
              <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                <MDTypography
                  sx={{
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                  onClick={() => setOtpFlag(false)}
                >
                  Change Mobile No.
                </MDTypography>
              </Grid>
              <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                <MDTypography
                  sx={{
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                  onClick={ProceedOtp}
                >
                  Resend OTP
                </MDTypography>
                {false && (
                  <MDTypography
                    sx={{
                      fontSize: "0.8rem",
                      color: "success",
                    }}
                  >
                    {timer}
                  </MDTypography>
                )}
              </Grid>
            </>
          ) : (
            <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
              <MDInput
                label="Mobile No."
                value={data.MobileNo}
                onChange={(e) => setData({ ...data, MobileNo: e.target.value })}
                onBlur={handleMobileNoChange}
                inputProps={{
                  maxLength: 10,
                }}
                helperText={
                  mobileVal ? "Enter Valid Mobile No." : mobileVal1 && "Mobile No. is Mandatory"
                }
                required
                error={mobileVal || mobileVal1}
              />
            </Grid>
          )}

          <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
            <MDButton
              variant="contained"
              color="secondary"
              onClick={otpFlag ? onVerifyOTP : ProceedOtp}
            >
              Proceed
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Drawer>
  );
}

function NavBar({ login, logout }) {
  const [dataController] = useDataController();
  const navigate = useNavigate();
  const { logo } = dataController;
  const matchesMd = useMediaQuery("(min-width:992px)");
  const [contact, setContact] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  // For Login
  const [loginOpen, setLoginOpen] = useState(false);
  const [otpFlag, setOtpFlag] = useState(false);
  const [timer, setTimer] = useState(0);
  /* eslint-disable eqeqeq */
  const [otpStatus, setOtpStatus] = useState(false);
  /* eslint-enable eqeqeq */
  const [data, setData] = useState({
    MobileNo: "",
    EmailId: "",
  });

  const LoginStatus = sessionStorage.getItem("LoginStatus");
  useEffect(() => {
    setTimeout(() => {
      setTimer(timer + 1);
    }, 1000 * 40);
  });

  const handleMenuOpen = async () => {
    setData({ ...data, MobileNo: "" });
    setLoginOpen(!loginOpen);
    setOtpFlag(false);
  };
  const onLogout = () => {
    // navigate(`/CustomerQuote`);
    setOtpStatus(false);
    sessionStorage.setItem("LoginStatus", false);
  };
  useEffect(() => {
    if (logout) setOtpStatus(true);
  }, [logout]);

  useEffect(() => {
    /* eslint-disable eqeqeq */
    setOtpStatus(LoginStatus == "true");
    /* eslint-enable eqeqeq */
  }, [LoginStatus]);

  return (
    <MDBox sx={{ display: "flex" }}>
      <Container sx={{ maxWidth: "100%!important", m: 0 }}>
        <MDBox
          p={1}
          width="100%"
          m={0}
          ml={matchesMd ? "-24px" : "-16px"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="fixed"
          zIndex={3}
          sx={{ bgcolor: "#1d4e9e" }}
        >
          <MDBox
            component="img"
            src={logo}
            sx={{ bgcolor: "#ffffff", maxHeight: "3rem", p: 0.5 }}
          />

          <MDBox>
            <Stack direction="row" spacing={1}>
              {login && (
                <Stack direction="row" spacing={matches ? 3 : 1}>
                  {otpStatus ? (
                    <>
                      <MDBox display="flex">
                        {matches ? (
                          <MDButton
                            startIcon={<Icon>home</Icon>}
                            color="white"
                            variant="outlined"
                            sx={{
                              fontSize: "0.875rem",
                              textTransform: "capitalize",
                              fontWeight: "regular",
                            }}
                            onClick={() => navigate("/life/customerApplications")}
                          >
                            Home
                          </MDButton>
                        ) : (
                          <Icon
                            fontSize="large"
                            sx={{ color: "#fff" }}
                            onClick={() => navigate("/life/customerApplications")}
                          >
                            home
                          </Icon>
                        )}
                      </MDBox>
                      <MDBox display="flex">
                        {matches ? (
                          <MDButton
                            startIcon={<Icon> power_settings_new</Icon>}
                            color="white"
                            variant={matches ? "outlined" : "text"}
                            sx={{
                              fontSize: "0.875rem",
                              textTransform: "capitalize",
                              fontWeight: "regular",
                            }}
                            onClick={onLogout}
                          >
                            Logout
                          </MDButton>
                        ) : (
                          <Icon fontSize="large" sx={{ color: "#fff" }} onClick={onLogout}>
                            power_settings_new
                          </Icon>
                        )}
                      </MDBox>
                    </>
                  ) : (
                    <MDBox display="flex">
                      {matches ? (
                        <MDButton
                          startIcon={<Icon> account_circle</Icon>}
                          color="white"
                          variant={matches ? "outlined" : "text"}
                          sx={{
                            fontSize: "0.875rem",
                            textTransform: "capitalize",
                            fontWeight: "regular",
                          }}
                          onClick={handleMenuOpen}
                        >
                          Track/Login
                        </MDButton>
                      ) : (
                        <Icon fontSize="large" sx={{ color: "#fff" }} onClick={handleMenuOpen}>
                          account_circle
                        </Icon>
                      )}
                    </MDBox>
                  )}
                </Stack>
              )}
              {matches ? (
                <MDButton
                  sx={{
                    fontSize: "0.875rem",
                    textTransform: "capitalize",
                    fontWeight: "regular",
                  }}
                  color="white"
                  variant="text"
                  startIcon={<Icon>call</Icon>}
                  onClick={() => setContact(true)}
                  // onClick={() => window.open("https://licindia.in/phone-help-line", "_blank")}
                >
                  Contact Support
                </MDButton>
              ) : (
                <Icon fontSize="large" sx={{ color: "#fff" }} onClick={() => setContact(true)}>
                  call
                </Icon>
              )}
            </Stack>
          </MDBox>
        </MDBox>
        <ContactSupport contact={contact} setContact={setContact} />
        <LoginTab
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          data={data}
          setData={setData}
          setOtpStatus={setOtpStatus}
          otpFlag={otpFlag}
          setOtpFlag={setOtpFlag}
        />
      </Container>
    </MDBox>
  );
}

export default NavBar;
