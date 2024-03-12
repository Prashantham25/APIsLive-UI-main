import { Grid, CircularProgress, Backdrop } from "@mui/material";
import swal from "sweetalert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton";
import MDBox from "../../../../components/MDBox";
import { CreateProposal } from "./data";

function Payment({ handleBack, obj }) {
  const navigate = useNavigate();
  const [proposalNumber, setProposalNumber] = useState("");
  const [SF, setSF] = useState(false);
  const [lod, setLod] = useState(false);
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
          setLod(true);
          const res = await CreateProposal(obj.ProposerReq);
          setLod(false);
          if (res.data.status === 2) {
            setProposalNumber(res.data.id);
            swal({
              icon: "success",
              text: res.data.responseMessage,
            });
            setSF(true);
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
  const onPayment = () => {
    reyzorPay();
  };
  const onBack = () => {
    handleBack();
  };
  const onNavigate = () => {
    navigate(`/DBIMobile?proposalNumber=${proposalNumber}`);
  };
  return (
    <MDBox>
      {lod && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress />
        </Backdrop>
      )}
      {SF ? (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Payment Successfully</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton onClick={onPayment}>Do Payment</MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton variant="text" onClick={onNavigate}>
              To Mobile App
            </MDButton>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>Payment</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton onClick={onPayment}>Do Payment</MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton onClick={onBack}>Back</MDButton>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default Payment;
