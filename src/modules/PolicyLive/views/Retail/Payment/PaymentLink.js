import * as React from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import { useLocation } from "react-router-dom";
import {
  GeneratePaymentRequest,
  GeneratePGUrl,
  GenericApi,
  InternalGetProposalDetailsByNumber,
} from "./Apis";

function PaymentLink() {
  const { search } = useLocation();
  const buildForm = ({
    ACTION,
    MERCHANTID,
    APPID,
    APPNAME,
    TXNID,
    TXNDATE,
    TXNCRNCY,
    TXNAMT,
    REFERENCEID,
    REMARKS,
    PARTICULARS,
    TOKEN,
    // SUCCESSURL,
    // FAILUREURL,
  }) => {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("ACTION", ACTION);
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "MERCHANTID");
    input.setAttribute("value", MERCHANTID);
    form.appendChild(input);
    const appid1 = document.createElement("input");
    appid1.setAttribute("type", "hidden");
    appid1.setAttribute("name", "APPID");
    appid1.setAttribute("value", APPID);
    form.appendChild(appid1);
    const txnid1 = document.createElement("input");
    txnid1.setAttribute("name", "TXNID");
    txnid1.setAttribute("value", TXNID);
    form.appendChild(txnid1);
    const txndate1 = document.createElement("input");
    txndate1.setAttribute("name", "TXNDATE");
    txndate1.setAttribute("value", TXNDATE);
    form.appendChild(txndate1);
    const txncrncy1 = document.createElement("input");
    txncrncy1.setAttribute("name", "TXNCRNCY");
    txncrncy1.setAttribute("value", TXNCRNCY);
    form.appendChild(txncrncy1);
    const txnamt1 = document.createElement("input");
    txnamt1.setAttribute("name", "TXNAMT");
    txnamt1.setAttribute("value", TXNAMT);
    form.appendChild(txnamt1);
    const referenceid1 = document.createElement("input");
    referenceid1.setAttribute("name", "REFERENCEID");
    referenceid1.setAttribute("value", REFERENCEID);
    form.appendChild(referenceid1);
    const remarks1 = document.createElement("input");
    remarks1.setAttribute("name", "REMARKS");
    remarks1.setAttribute("value", REMARKS);
    form.appendChild(remarks1);
    const particulars1 = document.createElement("input");
    particulars1.setAttribute("name", "PARTICULARS");
    particulars1.setAttribute("value", PARTICULARS);
    form.appendChild(particulars1);
    const appname1 = document.createElement("input");
    appname1.setAttribute("name", "APPNAME");
    appname1.setAttribute("value", APPNAME);
    form.appendChild(appname1);
    const token1 = document.createElement("input");
    token1.setAttribute("name", "TOKEN");
    token1.setAttribute("value", TOKEN);
    form.appendChild(token1);
    // const surl = document.createElement("input");
    // surl.setAttribute("name", "SUCCESSURL");
    // surl.setAttribute("value", SUCCESSURL);
    // form.appendChild(surl);
    // const furl = document.createElement("input");
    // furl.setAttribute("name", "FAILUREURL");
    // furl.setAttribute("value", FAILUREURL);
    // form.appendChild(furl);

    // form.setre;
    console.log("form", form);
    return form;
  };
  const post = (details) => {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  useEffect(async () => {
    const proposalNum = new URLSearchParams(search).get("proposal");
    console.log("Proposalll", proposalNum);
    // setProposalNumber(proposalNum);
    await InternalGetProposalDetailsByNumber(proposalNum).then(async (res) => {
      console.log("123456789", res);
      console.log("ProposalNo", proposalNum);
      if (res.data.status === 1) {
        console.log("res.data.finalResult.", res.data.finalResult);
        let Amount = res.data.finalResult.PaymentAmount;
        Amount = parseFloat(res.data.finalResult.PaymentAmount) * 100;
        Amount = parseInt(Amount, 10);
        const res1 = await GeneratePGUrl(1193, proposalNum, Amount);
        if (res1.data.status === 1) {
          const obj = {
            TxnId: res1.data.paymentRefNo,
            TxnCurrency: "NPR",
            TxnAmt: res1.data.amount,
          };
          await GenericApi("NepalMotorTwoWheeler", "ShankarNepalIssuePolicy", res.data.finalResult);
          await GeneratePaymentRequest(obj).then((data) => {
            console.log("data", data);
            const details = {
              ACTION: data.data.responseMessage,
              MERCHANTID: data.data.data.merchantid,
              APPID: data.data.data.appid,
              APPNAME: data.data.data.appname,
              TXNID: data.data.data.txnid,
              TXNDATE: data.data.data.txndate,
              TXNCRNCY: data.data.data.txncrncy,
              TXNAMT: data.data.data.txnamt,
              REFERENCEID: data.data.data.referenceid,
              REMARKS: data.data.data.remarks,
              PARTICULARS: data.data.data.particulars,
              TOKEN: data.data.data.token,
              // SUCCESSURL: "",
              // FAILUREURL: "https://localhost:3000/dashboard",
            };
            console.log("payment details", data);
            console.log("params", data.data.checksumHash);
            console.log("payment details", details);
            post(details);
          });
        }
      }
    });
  }, []);

  //   useEffect(async () => {
  //     // const proposalNum = new URLSearchParams(search).get("proposal");
  //     // console.log("Proposalll", proposalNum);
  //     // setProposalNumber(proposalNum);
  //     // console.log("hello", proposalNo);
  //     if (proposalNo !== "") {
  //     }
  //   }, [proposalNo]);

  //   useEffect(() => {
  //     if (proposalNo !== "") {
  //       console.log("ppppp", proposalNo);
  //       handleTxnIDgen();
  //     }
  //   }, [proposalNo]);

  //   const handlePayment = (bodyData1) => {
  //     if (bodyData1.txnid !== "") {
  //       console.log("Inside payment", bodyData1);
  //       makePayment(bodyData1);
  //     }
  //   };

  //   const handleformData = () => {
  //     if (transactionID !== "") {
  //       const bodyDataModified = bodyData;
  //       bodyDataModified.txnid = transactionID;
  //       bodyDataModified.surl = Sucessurl;
  //       bodyDataModified.furl = Failureurl;
  //       setbodyData((prev) => ({ ...prev, bodyDataModified }));
  //       console.log("tran", transactionID);
  //       console.log("bodydata", bodyData);
  //       handlePayment(bodyData);
  //     }
  //   };
  //   useEffect(() => {
  //     if (transactionID !== "" && transactionID !== null && transactionID !== undefined) {
  //       handleformData();
  //       console.log("tran", transactionID);
  //     }
  //   }, [transactionID]);
  return (
    <Grid container>
      <MDBox mt={2}>
        {/* <Grid item>
          <MDButton
            color="primary"
            // textAlign="right"
            fullwidth
            alignItems="center"
          >
            Make Payment
          </MDButton>
          <MDButton
            color="primary"
            // textAlign="right"
            fullwidth
            alignItems="center"
          >
            Verify form
          </MDButton>
        </Grid> */}
      </MDBox>
    </Grid>
  );
}
export default PaymentLink;
