import { useState, useEffect } from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import TermsCondition from "./TermsCondition";
import { IsMobileNumber, IsEmail } from "../../../../../Common/Validations";
import { getOTP, verifyOTP } from "../../CustomerEngage/data";

function MotorQuickQuoteEngage({ dto, setDto }) {
  const dto1 = dto;
  const onRadioChange = (e) => {
    dto1.CustomerType = e.target.value;
    dto1.ChannelDetails.CustomerType = e.target.value;
    setDto({ ...dto });
  };
  const [err, setErr] = useState({
    eFlg: false,
    eMsg: "Please Fill this field",
    phoneF: false,
    phoneM: "",
    emailF: false,
    emailM: "",
  });
  const [counter, setCounter] = useState(30);
  const [timer, setTimer] = useState(false);
  const [obj, setObj] = useState({ email: "", FirstName: "", LastName: "", phoneno: "", otp: "" });

  const onCustomer = (e) => {
    if (e.target.name !== "otp") obj.otp = "";
    obj[e.target.name] = e.target.value;
    setObj({ ...obj });
  };

  const onBlur = (e) => {
    if (e.target.value !== "") {
      if (e.target.name === "email") {
        if (IsEmail(e.target.value) === true) {
          err.emailF = false;
          err.emailM = "";
        } else {
          err.emailF = true;
          err.emailM = IsEmail(e.target.value);
        }
      }
      if (e.target.name === "phoneno") {
        if (IsMobileNumber(e.target.value) === true) {
          err.phoneF = false;
          err.phoneM = "";
        } else {
          err.phoneF = true;
          err.phoneM = IsMobileNumber(e.target.value);
        }
      }
      setErr({ ...err });
    }
  };

  const onSendOTP = () => {
    if (
      obj.FirstName === "" ||
      obj.LastName === "" ||
      obj.email === "" ||
      obj.phoneno === "" ||
      err.phoneF === true ||
      err.emailF === true
    ) {
      err.eFlg = true;
    } else {
      err.eFlg = false;
      const sendOTP = {
        name: obj.FirstName,
        otp: "",
        email: obj.email,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: obj.phoneno,
        sendSms: true,
        isBerry: false,
        client: "iNube BrokerPortal",
      };
      setTimer(true);
      getOTP(sendOTP).then((result) => {
        console.log(result);
      });
    }
    setErr({ ...err });
  };

  const onViewPlan = () => {
    verifyOTP();
  };

  useEffect(() => {
    if (timer === true && counter > 0) setTimeout(() => setCounter(counter - 1), 1000);
    else {
      setCounter(30);
      setTimer(false);
    }
  }, [counter]);
  //   "CorporateDetails": {
  //     "CompanyName": "",
  //     "DOI": "",
  //     "email": "",
  //     "mobileNo": "",
  //     "Salutation": "M/S",
  //     "SPOCName": ""
  // },

  return (
    <MDBox>
      <Grid container spacing={4} p={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography textAlign="center">Please fill Customer Details</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <RadioGroup row onChange={(e) => onRadioChange(e)}>
              <FormControlLabel
                value="5"
                label="Individual"
                checked={dto.CustomerType === "5"}
                control={<Radio />}
              />
              <FormControlLabel
                value="8"
                label="Corporate"
                checked={dto.CustomerType === "8"}
                control={<Radio />}
              />
            </RadioGroup>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            label={dto.CustomerType === "5" ? "First Name" : "Company Full Name"}
            name="FirstName"
            onChange={onCustomer}
            value={obj.FirstName}
            error={err.eFlg && obj.FirstName === ""}
            helperText={err.eFlg && obj.FirstName === "" && err.eMsg}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            label={dto.CustomerType === "5" ? "Last Name" : "Company SPOC Name"}
            name="LastName"
            onChange={onCustomer}
            value={obj.LastName}
            error={err.eFlg && obj.LastName === ""}
            helperText={err.eFlg && obj.LastName === "" && err.eMsg}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            label={dto.CustomerType === "5" ? "Phone No" : "Company SPOC Mobile Number"}
            name="phoneno"
            onChange={onCustomer}
            onBlur={onBlur}
            value={obj.phoneno}
            error={(err.eFlg && obj.phoneno === "") || err.phoneF}
            helperText={err.eFlg && obj.phoneno === "" ? err.eMsg : err.phoneM}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            label={dto.CustomerType === "5" ? "Email ID" : "Company Email ID"}
            name="email"
            onChange={onCustomer}
            onBlur={onBlur}
            value={obj.email}
            error={(err.eFlg && obj.email === "") || err.emailF}
            helperText={err.eFlg && obj.email === "" ? err.eMsg : err.emailM}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            label="OTP"
            value={obj.otp}
            name="otp"
            onChange={onCustomer}
            inputProps={{ maxLength: 6, type: "password" }}
          />
        </Grid>
        {!timer && (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography
              sx={{
                color: "#1976D2",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={onSendOTP}
            >
              Get OTP
            </MDTypography>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {timer && (
            <MDTypography
              sx={{
                color: "green",
              }}
            >
              OTP sent successfully
              {`\nResend OTP in 00:${counter}`}
            </MDTypography>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <TermsCondition />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
            <MDButton onClick={onViewPlan}>View Plans</MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default MotorQuickQuoteEngage;
