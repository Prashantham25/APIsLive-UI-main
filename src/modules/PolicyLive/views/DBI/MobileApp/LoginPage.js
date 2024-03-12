import { useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  PolicySearch,
  MobileNumberLogin,
  VerifyingOTPForDeclaration,
  GetPolicyDetailsByNumber,
} from "../data";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";

function LoginPage({ localDto, setLocalDto }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const onChange = (e) => {
    setLocalDto({ ...localDto, [e.target.name]: e.target.value });
  };

  const onGo = async () => {
    const res = await PolicySearch({ mobileNumber: localDto.enteredMobileNo });
    if (res.data.length === 0) setName("toByuPolicy");
    else {
      const rObj = {
        name: res.data[0].insuredName,
        email: res.data[0].email,
        userName: "",
        envId: "297",
        productType: "Mica",
        mobileNumber: res.data[0].mobileNumber,
        sendSms: true,
        isBerry: false,
        client: "",
      };
      await MobileNumberLogin(rObj);
      const res1 = await GetPolicyDetailsByNumber(res.data[0].policyNo);
      setLocalDto({ ...localDto, sendOtpRequest: rObj, polRes: res.data[0], polDto: res1.data });

      setName("OTP");
    }
  };

  const onOTP = async () => {
    const rObj = localDto.sendOtpRequest;
    rObj.otp = localDto.OTP;
    const res = await VerifyingOTPForDeclaration(rObj);
    if (res.data.status === 1) setLocalDto({ ...localDto, loginFlag: false });
    else swal({ icon: "error", text: "Wrong OTP entered" });
  };

  const onQuickBuy = () => {
    navigate("/DBI");
  };

  return (
    <MDBox>
      {name === "" && (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4" sx={{ textAlign: "center" }}>
              Get Started
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Enter your registered mobile number</MDTypography>
          </Grid>
          <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
            <MDInput
              label="Mobile Number"
              name="enteredMobileNo"
              value={localDto.enteredMobileNo}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
            <MDButton onClick={onGo}>GO</MDButton>
          </Grid>
        </Grid>
      )}
      {name === "toByuPolicy" && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4" sx={{ textAlign: "center" }}>
              Get Started
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>You donot seem to have purchased the product yet</MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton onClick={onQuickBuy}>Quick Buy</MDButton>
          </Grid>
        </Grid>
      )}
      {name === "OTP" && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4" sx={{ textAlign: "center" }}>
              OTP Verification
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Enter the otp sent to Email ID</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput label="OTP" name="OTP" value={localDto.OTP} onChange={onChange} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton onClick={onOTP}>Verify and Proceed </MDButton>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default LoginPage;
