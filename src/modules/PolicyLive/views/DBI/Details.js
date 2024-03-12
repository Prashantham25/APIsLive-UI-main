import { useState } from "react";
import { Autocomplete, Grid, CircularProgress, Backdrop } from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { MobileNumberLogin, VerifyingOTPForDeclaration, CreateProposal } from "./data";

const sty = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

function Details({ handleBack, setObj, obj }) {
  const navigate = useNavigate();
  const [Otp, setOtp] = useState("");
  const [otpFlag, setOtpFlag] = useState(false);
  const [backDropFlag, setBackDropFlag] = useState(false);
  const [proposerFlg, setProposerFlg] = useState(true);
  // const [proposalNumber, setProposalNumber] = useState("");

  const reyzorPay = () => {
    const options = {
      key: "rzp_test_KK09FiPyLY2aKI",
      amount: parseInt(obj.CP.total, 10) * 100,
      name: obj.ProposerReq.Name,
      description: "Policy Payment",
      email: obj.ProposerReq["Email ID"],
      handler: async (response) => {
        console.log("response", response);
        if (
          typeof response.razorpay_payment_id !== "undefined" ||
          response.razorpay_payment_id > 1
        ) {
          setBackDropFlag(true);
          const res = await CreateProposal(obj.ProposerReq);
          setBackDropFlag(false);
          if (res.data.status === 2) {
            // setProposalNumber(res.data.id);
            setProposerFlg(false);
            swal({
              icon: "success",
              text: res.data.responseMessage,
            });
            console.log("response check", response.razorpay_payment_id);
          } else {
            swal({
              icon: "error",
              text: "Proposer Not Created, Something went wrong",
            });
          }
        } else {
          swal({
            icon: "error",
            text: "Payment Failed",
          });
        }
      },

      prefill: {
        name: obj.ProposerReq.Name,
        email: obj.ProposerReq["Email ID"],
        contact: obj.ProposerReq["Mobile Number"],
      },
      notes: {
        address: "Bangalore",
      },
      theme: {
        color: "blue",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onChange = (e) => {
    const obj1 = obj;
    obj1.ProposerReq[e.target.name] = e.target.value;
    if (e.target.name === "Name")
      obj1.ProposerReq.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    setObj({ ...obj1 });
  };
  const onSalutation = (e, v) => {
    const obj1 = obj;
    obj1.ProposerReq.Salutation = v;
    obj1.ProposerReq.InsurableItem[0].RiskItems[0].Salutation = v;
    setObj({ ...obj1 });
  };

  // const onProceed = () => {
  //   handleNext();
  // };

  const onSendOtp = async () => {
    const rObj = {
      name: obj.ProposerReq.Name,
      email: obj.ProposerReq["Email ID"],
      userName: "",
      envId: "297",
      productType: "Mica",
      mobileNumber: obj.ProposerReq["Mobile Number"],
      sendSms: true,
      isBerry: false,
      client: "",
    };

    const res = await MobileNumberLogin(rObj);
    if (res.data.status === 1) setOtpFlag(true);
  };
  const onChangeOTP = (e) => {
    setOtp(e.target.value);
  };

  const onVerifyOTP = async () => {
    const rObj = {
      otp: Otp,
      email: obj.ProposerReq["Email ID"],
      mobileNumber: obj.ProposerReq["Mobile Number"],
      userName: "",
      envId: "297",
      productType: "MICA",
      isFirstTimeUser: true,
      isClaimsLive: false,
    };
    const res = await VerifyingOTPForDeclaration(rObj);
    if (res.data.status === 1) reyzorPay();
    else swal({ icon: "error", text: "Wrong OTP entered" });
  };
  const onBack = () => {
    handleBack();
  };
  const onNavigate = () => {
    navigate(`/DBIDriverDetails`);
  };
  return (
    <MDBox>
      {proposerFlg ? (
        <Grid container spacing={2} p={5}>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              fullWidth
              options={["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "M/s"]}
              getOptionLabel={(option) => option}
              sx={sty}
              renderInput={(params) => <MDInput {...params} label="Title" />}
              onChange={onSalutation}
              value={obj.ProposerReq.Salutation}
            />{" "}
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDInput label="Name" name="Name" value={obj.ProposerReq.Name} onChange={onChange} />
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <MDInput
              label="Email ID"
              name="Email ID"
              value={obj.ProposerReq["Email ID"]}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
            <MDInput
              label="Mobile Number"
              name="Mobile Number"
              value={obj.ProposerReq["Mobile Number"]}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
            <MDButton variant="outlined" onClick={onSendOtp}>
              Send OTP
            </MDButton>
          </Grid>
          {otpFlag && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography sx={{ fontSize: "10px" }}>OTP sent to your EmailID</MDTypography>
            </Grid>
          )}
          <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
            <MDInput label="OTP" value={Otp} onChange={onChangeOTP} />
          </Grid>

          <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
            <MDButton variant="text" onClick={onVerifyOTP}>
              Verify OTP
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton onClick={onBack}>Back</MDButton>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} p={5}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h1" color="success">
              Payment Successfully
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton variant="text" onClick={onNavigate}>
              Click hear to fill the Driver and Vehicle details
            </MDButton>
          </Grid>
        </Grid>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropFlag}
      >
        <CircularProgress />
      </Backdrop>
    </MDBox>
  );
}

export default Details;
