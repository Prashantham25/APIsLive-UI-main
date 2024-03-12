import { useState, useEffect } from "react";
import { Grid, CircularProgress, Stack } from "@mui/material";
import MDButton from "components/MDButton";
import OtpInput from "react-otp-input-rc-17";
import swal from "sweetalert";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { OTPVerification, SendOTP } from "..";

function OTP({ email, onContinue }) {
  const [otpNumber, setOtpNumber] = useState("");
  const [EmailId, setEmailID] = useState(email);
  const [ChangeEmailFlag, setChangeEmailFlag] = useState(false);
  const [resentOtpFlag, setResentOtpFlag] = useState(false);
  const [timeCount, setTimeCount] = useState(0);
  const [loaderFlg, setLoaderFlg] = useState(false);

  const onCon = async () => {
    const obj = {
      otp: otpNumber,
      email: EmailId,
      mobileNumber: "",
      userName: EmailId,
      envId: "297",
      productType: "MICA",
      isFirstTimeUser: true,
      isClaimsLive: false,
    };
    await OTPVerification(obj).then((x) => {
      if (x.data.status === 7) swal({ icon: "failure", text: "Wrong OTP" });
      else {
        onContinue(true, EmailId);
      }
    });
  };
  console.log(otpNumber);
  const onOTP = (e) => {
    // console.log(e, "nnnnnnn");
    setOtpNumber(e);
  };

  const onChangeEmailClick = () => {
    setOtpNumber("");
    setChangeEmailFlag(true);
  };

  const onEmailChange = (e) => {
    setEmailID(e.target.value);
  };

  const onChangeMailProceed = async () => {
    setLoaderFlg(true);
    const obj = {
      otp: "",
      email: EmailId,
      userName: EmailId,
      envId: "297",
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    await SendOTP(obj).then((res1) => {
      if (res1.data.status === 4) {
        swal({ icon: "error", text: "Given wrong Email-ID" });
      } else {
        setChangeEmailFlag(false);
        setResentOtpFlag(true);
        setTimeCount(0);
        setLoaderFlg(false);
      }
    });
  };
  const onReSentOTP = async () => {
    setLoaderFlg(true);
    const obj = {
      otp: "",
      email: EmailId,
      userName: EmailId,
      envId: "297",
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    await SendOTP(obj).then((res1) => {
      if (res1.data.status === 4) {
        swal({ icon: "error", text: "Given wrong Email-ID" });
      }
    });
    setResentOtpFlag(true);
    setLoaderFlg(false);
  };

  useEffect(() => {
    setResentOtpFlag(true);
  }, []);

  useEffect(() => {
    if (resentOtpFlag === true) {
      if (timeCount < 30) {
        setTimeout(() => {
          setTimeCount(timeCount + 1);
        }, [1000]);
      } else {
        setResentOtpFlag(false);
        setTimeCount(0);
      }
    }
  }, [timeCount, resentOtpFlag]);

  return (
    <MDBox>
      {ChangeEmailFlag ? (
        <Grid container spacing={2} textAlign="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput label="Email ID" value={EmailId} onChange={onEmailChange} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton onClick={onChangeMailProceed} variant="outlined">
              Proceed {loaderFlg && <CircularProgress sx={{ ml: 1 }} size={15} />}
            </MDButton>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} textAlign="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6">{`Enter OTP sent to ${EmailId}`}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <OtpInput
                value={otpNumber}
                onChange={onOTP}
                numInputs={6}
                isInputNum
                // hasErrored
                isInputSecure
                inputStyle={{
                  width: "50px",
                  height: "50px",
                  fontSize: "1rem",
                  margin: "0.15rem",
                  fontColor: "black",
                  borderRadius: 4,
                  border: "2px solid rgba(0,0,0,0.3)",
                  background: "white",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              onClick={onChangeEmailClick}
              sx={{ color: "#0071D9", cursor: "pointer", textDecoration: "underline" }}
            >
              Change Email
            </MDTypography>
          </Grid>
          {!resentOtpFlag && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <Stack direction="row" spacing={2}>
                  <MDTypography
                    sx={{
                      cursor: "pointer",
                      color: "#0071D9",
                      textDecoration: "underline",
                    }}
                    onClick={onReSentOTP}
                  >
                    Resend OTP
                  </MDTypography>
                  {loaderFlg && <CircularProgress size={20} />}
                </Stack>
              </MDBox>
            </Grid>
          )}
          {resentOtpFlag && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography color="success">OTP sent successfully</MDTypography>
            </Grid>
          )}
          {resentOtpFlag && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography color="success">
                {`Click On Resend OTP in 00:${timeCount}`}{" "}
              </MDTypography>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton variant="outlined" onClick={onCon}>
                Verify & Continue
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default OTP;
