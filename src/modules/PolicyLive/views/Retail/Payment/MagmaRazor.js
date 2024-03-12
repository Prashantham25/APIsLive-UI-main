import { React, useEffect, useState } from "react";
import swal from "sweetalert2";
import { Grid, Backdrop, CircularProgress } from "@mui/material";
import MDBox from "components/MDBox";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GetProposalDetailByNumber,
  GenericApi,
  createOrdersRazorPay,
} from "../Products/Magma/data/index";
import { UpdatePaymentDetailsByProposalNo } from "./Apis";
import { useDataController } from "../../../../BrokerPortal/context/index";

function MagmaRazor() {
  const { search } = useLocation();
  const [control] = useDataController();
  const { genericPolicyDto } = control;
  const Navigate = useNavigate();
  localStorage.clear();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const proposalNumber = new URLSearchParams(search).get("ProposalNumber");
    console.log("proposalNumber", proposalNumber);
    const proposalDetails = await GetProposalDetailByNumber(proposalNumber);
    console.log("proposalDetails", proposalDetails);
    const amount = parseInt(proposalDetails.finalResult.TotalPremium, 10);
    console.log("amount", amount);
    const orderID = await createOrdersRazorPay(amount * 100, proposalNumber);
    console.log("orderId", orderID);
    const onlineJson = {
      paymentId: 0,
      policyId: 0,
      paidAmount: proposalDetails.finalResult.TotalPremium,
      txnType: "Online",
      remarks: "",
      status: "Payment Initiated",
      createdDate: "",
      updatedDate: "",
      createdBy: "",
      refNo: "",
      txnId: "",
      paymentResponse: "",
      transactionNumber: proposalDetails.finalResult.ProposalNo,
    };
    UpdatePaymentDetailsByProposalNo(proposalDetails.finalResult.ProposalNo, onlineJson);

    const options = {
      key: "rzp_test_gswsIc5tvcW3oO",

      amount:
        proposalDetails &&
        proposalDetails.finalResult &&
        proposalDetails.finalResult.TotalPremium !== ""
          ? Math.round(proposalDetails.finalResult.TotalPremium * 100)
          : 0,

      name:
        proposalDetails &&
        proposalDetails.finalResult &&
        proposalDetails.finalResult.ProposerDetails &&
        proposalDetails.finalResult.ProposerDetails.Name !== ""
          ? proposalDetails.finalResult.ProposerDetails.Name
          : "",
      order_id: orderID.data.id,
      description: "Policy Payment",
      email:
        proposalDetails &&
        proposalDetails.finalResult &&
        proposalDetails.finalResult.ProposerDetails &&
        proposalDetails.finalResult.ProposerDetails.EmailId !== ""
          ? proposalDetails.finalResult.ProposerDetails.EmailId
          : "",

      handler: async (response) => {
        delete proposalDetails.finalResult.PaymentDetails;
        console.log("responseRazor", response);
        if (typeof response.razorpay_payment_id !== "undefined") {
          console.log("response check", response.razorpay_payment_id);
          setLoading(true);
          GenericApi(
            "MagmaHospiCash01",
            "Magma_HospiCashPayment",
            proposalDetails.finalResult
          ).then((res) => {
            console.log("policy2", proposalDetails.finalResult);
            console.log("policy1", res);
            console.log("dtoabhi", genericPolicyDto);
            Navigate("/Retail/MagmaOnlineSuccess", {
              state: { PolicyNo: res.finalResult, orderID: orderID.data.id },
            });
          });
        } else {
          swal.fire({
            icon: "error",
            text: "Payment Failed",
            html: true,
          });
        }
      },
      prefill: {
        name: "abhi",
        email: "abhishek@gmail.com",
        contact: "636428335",
      },
      notes: {
        address: "",
      },
      theme: {
        color: "blue",
      },
    };
    const rzp = new window.Razorpay(options);

    rzp.open();
    console.log("rzp", rzp, options);
  }, []);
  return (
    // <div>
    //   <ReyzorPay />
    // </div>
    <Grid container>
      <MDBox mt={2}>
        {/* <Grid item>
        <MDButton
          color="primary"
          // textAlign="right"
          fullwidth
          alignItems="center"
          onClick={handleformData}
        >
          Make Payment
        </MDButton>
        <MDButton
          color="primary"
          // textAlign="right"
          fullwidth
          alignItems="center"
          // onClick={handleformData}
        >
          Verify form
        </MDButton>
      </Grid> */}
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress />
        </Backdrop>
      </MDBox>
    </Grid>
  );
}
export default MagmaRazor;
