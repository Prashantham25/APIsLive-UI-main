import * as React from "react";
import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { Accordion, Grid } from "@mui/material";
import MDBox from "../../../../components/MDBox";
// import MDButton from "../../../../components/MDButton";
import { getRequest } from "../../../../core/clients/axiosclient";
import { useDataController } from "../../context";
import {
  makePayment,
  fetchPayUURL,
  //   handleIssuePolicy,
  //   SavePaymentdetails,
  //   GetBGRMasters,
  //   sendPaymentMail,
  GetPremiumAmount,
} from "./data/index";

function MotorPAYUPayment({ proposalDetails }) {
  const [controller] = useDataController();
  const { quoteProposalOutput } = controller;
  const [paymentData, setPaymentData] = useState([]);
  const [transactionID, settransactionID] = useState();
  const [Sucessurl, setSuccessurl] = useState();
  const [Failureurl, setFailureurl] = useState();
  const [policyData, setPolicyData] = useState();
  const [proposalData, setProposalData] = useState(proposalDetails);
  const [PremiumAmount, setPremiumAmount] = useState();
  const [bodyData, setbodyData] = useState({
    // key: "an7rIU",
    icName: "Kotak",
    txnid: "",
    amount: "",
    productinfo: "MotorPolicy",
    firstname: "",
    email: "",
    phone: "",
    surl: "",
    furl: "/paymentfailure",
    // salt: "8MUr8LS7",
  });

  useEffect(() => {
    if (false) console.log("Pppp", setProposalData);
    const quoteNum = quoteProposalOutput.finalResult.BaseQuotationNo;
    GetPremiumAmount(quoteNum, 128).then((pdata) => {
      const TotalPremium = pdata.data.premiumResult.FinalPremium;
      setPremiumAmount(pdata.data.premiumResult.FinalPremium);
      if (false) console.log("qqq", PremiumAmount);
      const proposalNum = proposalData.proposalNumber;

      fetchPayUURL(770, proposalNum, TotalPremium).then((results) => {
        console.log("results", results);
        if (results.transactionID) {
          const data = results;
          setPaymentData(data);
          // console.log("InGetpayment", data);
          // setPaymentData(data);
          setSuccessurl(results.surl);
          setFailureurl(results.furl);
          settransactionID(results.transactionID);
          if (false) console.log("payment coming", paymentData);
        }
      });

      getRequest(
        // `Policy/InternalGetProposalDetailsByNumber?proposalNumber=0546/0000/0026/00/000`
        `Policy/InternalGetProposalDetailsByNumber?proposalNumber=${proposalNum}`
      ).then((res) => {
        // console.log("123456789", res);
        // console.log("ProposalNo", proposalNo);
        if (res.data.status === 1) {
          if (
            pdata.data.premiumResult.FinalPremium !== 0 ||
            pdata.data.premiumResult.FinalPremium !== ""
          ) {
            // const bodyDataModified = bodyData;
            bodyData.firstname = res.data.finalResult.ProposerDetails.CustomerFirstName;
            bodyData.email = res.data.finalResult.ProposerDetails.EmailId;
            bodyData.phone = res.data.finalResult.ProposerDetails.ContactNo;
            bodyData.amount = pdata.data.premiumResult.FinalPremium;
            setbodyData((prev) => ({ ...prev, bodyData }));
            // const resp = res.data.finalResult;
            if (false) console.log("policyData=", policyData);
            setPolicyData(res.data.finalResult);
          }
        }
      });
    });
  }, []);

  const handlePayment = (bodyData1) => {
    if (bodyData1.txnid !== "") {
      console.log("Inside payment", bodyData1);
      makePayment(bodyData1);
    }
  };

  const handleformData = () => {
    if (transactionID !== "" && PremiumAmount !== "") {
      // const bodyDataModified = bodyData;
      bodyData.txnid = transactionID;
      bodyData.surl = Sucessurl;
      bodyData.furl = Failureurl;
      bodyData.amount = PremiumAmount;

      setbodyData((prev) => ({ ...prev, bodyData }));
      // console.log("tran", transactionID);

      handlePayment(bodyData);
    }
  };
  useEffect(() => {
    if (transactionID !== "" && transactionID !== null && transactionID !== undefined) {
      handleformData();
      // console.log("tran", transactionID);
    }
  }, [transactionID]);
  return (
    <MDBox>
      <Accordion>
        <Grid container spacing={2}>
          <Grid item>
            {/* <MDButton
              color="primary"
              // textAlign="right"
              fullwidth
              alignItems="center"
              onClick={handleformData}
            >
              Make Payment
            </MDButton> */}
            {/* <MDButton
              color="primary"
              // textAlign="right"
              fullwidth
              alignItems="center"
              // onClick={handleformData}
            >
              Verify form
            </MDButton> */}
          </Grid>
        </Grid>
      </Accordion>
    </MDBox>
  );
}
export default MotorPAYUPayment;
