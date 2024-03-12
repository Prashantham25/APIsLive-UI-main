import * as React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import { useLocation } from "react-router-dom";
import { makePayment, fetchPaymentURL } from "./data/index";
import { getRequest } from "../../../../core/clients/axiosclient";
// import { result } from "lodash";

function BGRPaymentLink() {
  const [paymentData, setPaymentData] = useState([]);
  const [transactionID, settransactionID] = useState();
  const [Sucessurl, setSuccessurl] = useState();
  const [Failureurl, setFailureurl] = useState();
  const [policyData, setPolicyData] = useState();
  const { search } = useLocation();
  const [proposalNo, setProposalNumber] = useState("");
  const [bodyData, setbodyData] = useState({
    // key: "7Y4RPX",
    key: process.env.REACT_APP_PayuKey,
    txnid: "",
    amount: "125",
    productinfo: "Bharat Griha Raksha–USB",
    firstname: "Sahana",
    email: "sahana@yahoo.com",
    phone: "9999999999",
    surl: "https://20.207.118.76/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0077/00/000",
    // surl: "https://localhost:44351/api/Policy/PaymentRedirection?PaymentRefNo=2970782/0782/0242/00/000",
    // surl: paymentData.surl,
    // furl: paymentData.furl,
    furl: "/paymentfailure",
    salt: process.env.REACT_APP_PayuSalt,
    // salt: "hl8aISlY",
    // hash: "",
  });

  //   const handleTxnIDgen = () => {
  //   if (policyData !== undefined) {
  //     console.log("1234567890", policyData);
  //     const amount = policyData.PremiumDetails["Total with Tax"];
  //     const proposalNum = proposalNo;
  //     fetchPaymentURL(782, proposalNum, amount).then((results) => {
  //       const data = results;
  //       setPaymentData(data);
  //       console.log("InGetpayment", data);
  //       setPaymentData(data);
  //       setSuccessurl(results.surl);
  //       setFailureurl(results.furl);
  //       settransactionID(results.transactionID);
  //       console.log("payment coming", paymentData);
  //     });
  //     console.log("Transaction", transactionID);
  //   }
  // };

  useEffect(() => {
    const proposalNum = new URLSearchParams(search).get("proposal");
    console.log("Proposalll", proposalNum);
    setProposalNumber(proposalNum);
    getRequest(`Policy/InternalGetProposalDetailsByNumber?proposalNumber=${proposalNum}`).then(
      (res) => {
        console.log("123456789", res);
        console.log("ProposalNo", proposalNo);
        if (res.data.status === 1) {
          console.log("res.data.finalResult.", res.data.finalResult);
          const bodyDataModified = bodyData;
          bodyDataModified.firstname = res.data.finalResult.ProposerDetails["First Name"];
          if (res.data.finalResult["Product Code"] === "BLUS_BSUS") {
            bodyDataModified.email = res.data.finalResult.ProposerDetails.EmailId;
            bodyDataModified.phone = res.data.finalResult.ProposerDetails.MobileNo;
          } else {
            bodyDataModified.email = res.data.finalResult.ProposerDetails["Email ID"];
            bodyDataModified.phone = res.data.finalResult.ProposerDetails["Mobile Number"];
          }
          if (res.data.finalResult["Product Code"] === "MarineSpecificVoyage") {
            bodyDataModified.amount = res.data.finalResult["Total Premium"];
          } else {
            bodyDataModified.amount = res.data.finalResult.PremiumDetails["Total with Tax"];
          }
          setbodyData((prev) => ({ ...prev, bodyDataModified }));
          const resp = res.data.finalResult;
          console.log("1234567890", policyData);
          if (res.data.finalResult["Product Code"] === "MarineSpecificVoyage") {
            const amount = resp["Total Premium"];
            fetchPaymentURL(782, proposalNum, amount).then((results) => {
              console.log("results", results);
              if (results.transactionID) {
                const data = results;
                setPaymentData(data);
                console.log("InGetpayment", data);
                setPaymentData(data);
                setSuccessurl(results.surl);
                setFailureurl(results.furl);
                settransactionID(results.transactionID);
                console.log("payment coming", paymentData);
              }
            });
          } else {
            const amount = resp.PremiumDetails["Total with Tax"];
            fetchPaymentURL(782, proposalNum, amount).then((results) => {
              console.log("results", results);
              if (results.transactionID) {
                const data = results;
                setPaymentData(data);
                console.log("InGetpayment", data);
                setPaymentData(data);
                setSuccessurl(results.surl);
                setFailureurl(results.furl);
                settransactionID(results.transactionID);
                console.log("payment coming", paymentData);
              }
            });
          }
          // const proposalNum = proposalNo;

          setPolicyData(res.data.finalResult);
        }
      }
    );
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

  const handlePayment = (bodyData1) => {
    if (bodyData1.txnid !== "") {
      console.log("Inside payment", bodyData1);
      makePayment(bodyData1);
    }
  };

  const handleformData = () => {
    if (transactionID !== "") {
      const bodyDataModified = bodyData;
      bodyDataModified.txnid = transactionID;
      bodyDataModified.surl = Sucessurl;
      bodyDataModified.furl = Failureurl;
      setbodyData((prev) => ({ ...prev, bodyDataModified }));
      console.log("tran", transactionID);
      console.log("bodydata", bodyData);
      handlePayment(bodyData);
    }
  };
  useEffect(() => {
    if (transactionID !== "" && transactionID !== null && transactionID !== undefined) {
      handleformData();
      console.log("tran", transactionID);
    }
  }, [transactionID]);
  return (
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
      </MDBox>
    </Grid>
  );
}
export default BGRPaymentLink;
