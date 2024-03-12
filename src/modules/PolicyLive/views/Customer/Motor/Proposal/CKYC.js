// import { useState } from "react";
import { Grid, RadioGroup, FormControlLabel, Radio, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Swal2 from "sweetalert2";
// import { useNavigate } from "react-router-dom";

import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { GenerateCkycDetails, SendOTP } from "../../data";
// import RayzorPay from "../../../Retail/data/RayzorPay";

// import Payment from "./Payment";
import RayzorPay from "../../../Retail/data/RayzorPay";
import OTP from "../../data/components/OTP";
import { Proposals, Policies } from "../../../Retail/data/Apis";
// import PaymentSuccess from "../../../Retail/Products/Demo/PaymentSuccess";
// const autoStyle = {
//   "& .MuiOutlinedInput-root": {
//     padding: "5px!important",
//   },
// };

function CKYC({ dto, setDto, setLoader, handelBack, handelNext }) {
  const lDto = dto;
  const [otpFlag, setOtpFlag] = useState(false);
  // const Navigate = useNavigate();
  // const [PolicyIssuedFlg, setPolicyIssuedFlg] = useState(false);

  const onProceed = async () => {
    setLoader(true);
    const res = await Proposals(dto);
    lDto.proposalNumber = res.finalResult.proposalNumber;
    lDto.receiptNumber = res.finalResult.id;
    setDto({ ...lDto });
    const obj = {
      otp: "1234",
      email: dto.ProposerDetails.EmailId,
      userName: dto.ProposerDetails.EmailId,
      envId: "297",
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    await SendOTP(obj).then((res1) => {
      if (res1.data.status === 4) {
        setOtpFlag(false);
        swal({ icon: "error", text: "Given wrong Email-ID" });
      } else setOtpFlag(true);
    });
    setLoader(false);
  };

  const onKYC1 = (e, name) => {
    lDto.ProposerDetails[name] = e.target.value;

    setDto({ ...lDto });
  };

  useEffect(async () => {
    setLoader(true);
    const obj = {
      Pan: dto.ProposerDetails.PANNo,
      dob: dto.ProposerDetails.DOB,
      userName: "NIVABUPA",
      password: "M@xbup@!2#",
    };
    const res = await GenerateCkycDetails(obj);
    if (res && res.data && res.data.CKYCID) {
      lDto.ProposerDetails.CKYCNo = res.data.CKYCID;
      setDto({ ...lDto });
    }
    setLoader(false);
    if (false) onProceed();
  }, []);
  const onBack = () => {
    handelBack();
  };

  const onPayment = async (e) => {
    if (e.status === "success") {
      lDto.PaymentDetails.TransactionNo = e.paymentId;
      lDto.PaymentDetails.ModeOfPayment = "Online";
      setLoader(true);
      await Policies({ ...lDto }).then((res) => {
        setLoader(false);

        if (res.status === 1) {
          lDto.PolicyNo = res?.finalResult?.id;
          Swal2.fire({
            icon: "success",
            title: `Your Policy Created Successfully`,
            text: `Your Policy No ${res?.finalResult?.id}\nYour Policy details shared to your registered mailID `,
            width: 600,
            padding: "3em",
            color: "#716add",
            allowOutsideClick: false,
            background: "#fff",
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `,
            showConfirmButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              handelNext();
              // Navigate("/CustomerPortal");
            }
          });
        }
      });
      // setPaymentStatus(true);
    }
    setDto({ ...lDto });
  };

  const onContinue = () => {
    // flg, Email
    // if (flg === true) {
    //   lDto.ProposerDetails.EmailId = Email;
    //   setDto({ ...lDto });

    // Payment({
    //   key: "rzp_test_KK09FiPyLY2aKI",
    //   amount: parseFloat(dto.PremiumDetail.TotalPremium, 10),
    //   PayeeName: `${dto.ProposerDetails.FirstName} ${dto.ProposerDetails.LastName}`,
    //   PayeeEmail: dto.ProposerDetails.EmailId,
    //   PayeeContact: dto.ProposerDetails.ContactNo,
    //   PayeeAddress: dto.ProposerDetails.CommunicationAddress.State,
    //   Next: handelNext,
    // });
    // }

    RayzorPay({
      key: "rzp_test_KK09FiPyLY2aKI",
      amount: parseFloat(dto.PremiumDetails.TotalPremium, 10),
      PayeeName: `${dto.ProposerDetails.FirstName} ${dto.ProposerDetails.LastName}`,
      PayeeEmail: dto.ProposerDetails.EmailId,
      PayeeContact: dto.ProposerDetails.ContactNo,
      PayeeAddress: dto.ProposerDetails.CommunicationAddress.State,
      onPayment,
    });
  };

  return (
    <MDBox>
      <MDButton variant="text" onClick={onBack}>
        Back
      </MDButton>
      {otpFlag ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} />
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <OTP email={dto.ProposerDetails.EmailId} onContinue={onContinue} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <Stack direction="row" spacing={3} p={2}>
                <MDTypography color="primary">Do you have your CKYC Number</MDTypography>
                <RadioGroup
                  row
                  value={dto.ProposerDetails.isKYCDone}
                  onChange={(e) => onKYC1(e, "CKYCNo")}
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </Stack>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>CKYC Details</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              variant="standard"
              label="CKYC No"
              name="CKYCNo"
              value={dto?.ProposerDetails?.CKYCNo}
              onChange={(e) => onKYC1(e, "CKYCNo")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput variant="standard" label="DOB" value={dto.ProposerDetails.DOB} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDButton variant="outlined">Upload Photo</MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton onClick={onContinue}>Proceed</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default CKYC;
