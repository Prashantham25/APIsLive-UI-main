import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { GetPaymentURL } from "../MotorProposal/data";

function CKYC() {
  const { search } = useLocation();
  const [paymentData, setPaymentData] = useState();

  const buildForm = ({ action, params }) => {
    console.log("buildForm", action, params);
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      console.log("element", key, params[key]);
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", params[key]);
      form.appendChild(input);
    });
    console.log("PaymentForm", form);
    return form;
  };

  const post = (details) => {
    console.log("PaymentFormDataPost", details);
    const formdata = {
      action: details.PaymentURL,
      params: details.InputJson,
    };
    const form = buildForm(formdata);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  useEffect(async () => {
    const queryParams = new URLSearchParams(search);
    const productID = queryParams.get("ProductID");
    const proposalNumber = queryParams.get("ProposalNumber");
    const baseProductId = queryParams.get("BProdId");
    const parterId = queryParams.get("PartnerId");
    try {
      GetPaymentURL(productID, proposalNumber, setPaymentData, baseProductId, parterId);
      // const paymentData = await getRequest(
      //   `Policy/GeneratePaymentUrl?ProductId=${productID}&ProposalNumber=${proposalNumber}`
      // );
      // console.log("payment URL", paymentData.data);
      // setPaymentData(paymentData.data);
      // const paymentURL = paymentData.data.finalResult.OutputResult.PaymentURL;
      // window.location.href = paymentURL;
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    console.log("PaymentFormData", paymentData);
    if (paymentData) {
      console.log("PaymentFormData", paymentData.OutputResult);
      if (paymentData.OutputResult.InputJson) {
        post(paymentData.OutputResult);
      } else {
        const paymentURL = paymentData.OutputResult.PaymentURL;
        window.location.href = paymentURL;
      }
    }
  }, [paymentData]);
  return (
    <MDBox>
      <MDTypography sx={{ textAlign: "center" }}>Payment</MDTypography>
    </MDBox>
  );
}
export default CKYC;
