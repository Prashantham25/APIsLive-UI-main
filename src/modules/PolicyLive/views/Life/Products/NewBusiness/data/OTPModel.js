// import { useState } from "react";
import { Stack, Grid } from "@mui/material";
import OtpImage from "assets/images/Life/OtpImage.png";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
import OtpInput from "react-otp-input-rc-17";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import ClearIcon from "@mui/icons-material/Clear";
// import { useState } from "react";

export default function OTPModel({ json, setJson, handleModalClose, handleProceed }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "56rem",
    width: "44%",
    height: "auto",
    // height: "70%",
    // height: "500px",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    // boxShadow: 24,
    // borderRadius: "1rem",
    textAlign: "center",
    // p: 4,
  };
  // const [user, setUser] = useState({
  //   email: "",
  //   mobileNo: "",
  // });
  // const [otpdata, setotpdata] = useState({
  //   otp: "",
  //   Email: "",
  // });

  const handleOTP = (otp1) => {
    setJson((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
  };

  return (
    <MDBox sx={style}>
      <Stack direction="row">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <MDBox width="100%" height="100%" component="img" src={OtpImage} />
          </Grid>
          <Grid container item xs={12} sm={12} md={6} p={2} justifyContent="center">
            <Grid container spacing={1}>
              <Grid item container justifyContent="flex-end" p={2}>
                <ClearIcon onClick={handleModalClose} />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12}> */}
              <MDTypography
                sx={{
                  color: "#1D4E9E",
                  fontSize: "18px",
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                OTP verification
              </MDTypography>
              {/* </Grid> */}
              <Grid item xs={12} sm={12} md={12}>
                <MDTypography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  Please Enter the 6 Digit OTP
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <MDTypography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  Enter the otp
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Stack direction="row" display="flex" m={1}>
                  <OtpInput
                    value={json.otp}
                    onChange={handleOTP}
                    // onBlur={handleOTPvalidation}
                    numInputs={6}
                    isInputNum
                    hasErrored
                    isInputSecure
                    inputStyle={{
                      width: "42px",
                      height: "42px",
                      margin: "0.2rem",
                      fontSize: "1rem",
                      borderRadius: 4,
                      border: "2px solid rgba(0,0,0,0.3)",
                      background: "white",
                      display: "flex",
                      justifyContent: "left",
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <MDTypography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  OTP sent to 8887344556
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <MDTypography
                  sx={{
                    color: "#1976D2",
                    fontSize: "14px",
                    fontWeight: 400,
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  Resend OTP
                </MDTypography>
              </Grid>
              <MDBox display="flex" justifyContent="flex-end" alignItems="flex-end">
                <MDButton variant="outlined" onClick={handleProceed}>
                  Proceed
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </MDBox>
  );
}
