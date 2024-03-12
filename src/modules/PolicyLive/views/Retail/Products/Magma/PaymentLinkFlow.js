import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import CancelFilled from "assets/images/Nepal/CancelFilled.png";
import Success from "assets/images/Nepal/Success.png";
import MDBox from "../../../../../../components/MDBox";
import { GetProposalList, QueryExecution } from "./data/index";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../../BrokerPortal/context";

function MagmaPaymentFailure({ response, expired }) {
  // const responseL = response;
  // const ExpiredDate = expired;
  console.log("Response Data in MagmaPaymentFailure", response);
  console.log("Date in MagmaPaymentFailure", expired);

  return (
    <Card position="absolute" sx={{ borderRadius: "1rem", m: 3, background: "#FFFFFF" }}>
      <Card
        position="absolute"
        sx={{ borderRadius: "0.3rem", m: 2, background: "#EEEEEE" }}
        fullwidth
      >
        <Grid container spacing={2} p={3}>
          {response?.data[0]?.paymentStatus === "Failure" && expired === false && (
            // failure
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox
                sx={{
                  display: "flex",
                  backgroundImage: `url(${CancelFilled})`,
                  backgroundSize: "contain", // Adjust as needed
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  textAlign: "center",
                  alignItems: "center",
                  minHeight: "60px", // Adjust height as needed
                  minWidth: "60px", // Adjust width as needed
                }}
              />
              <MDTypography
                variant="h6"
                sx={{
                  textAlign: "center",
                  marginBottom: "20px", // Adding space after the text
                }}
              >
                Payment is Failed
              </MDTypography>
              <MDTypography variant="body1" textAlign="center">
                Hello {response.data[0]?.insuredName},
                <br />
                We regret to inform you that your last payment request has failed.
                <br />
                For further assistance, you can reach out to your relationship manager / sales
                partner.
                <br />
                You may also connect with us on Toll-Free No. 1800-2663-202 or
                <br />
                Write to us at customercare@magma-hdi.com.
              </MDTypography>
            </Grid>
          )}
          {response?.data[0]?.paymentStatus === "Completed" && expired === false && (
            // Completed
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox
                sx={{
                  display: "flex",
                  backgroundImage: `url(${Success})`,
                  backgroundSize: "contain", // Adjust as needed
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  textAlign: "center",
                  alignItems: "center",
                  minHeight: "150px", // Adjust height as needed
                  minWidth: "150px", // Adjust width as needed
                }}
              />
              <MDTypography
                variant="h6"
                sx={{
                  textAlign: "center",
                  marginBottom: "20px", // Adding space after the text
                }}
              >
                Payment is Completed
              </MDTypography>
              <MDTypography variant="body1" textAlign="center">
                Hello {response.data[0]?.insuredName},
                <br />
                You have successfully completed the payment.
                <br />
                Please check your registered email for policy confirmation details.
              </MDTypography>
            </Grid>
          )}
          {response?.data[0]?.paymentStatus === "Payment Initiated" && expired === false && (
            // processing or not done any payment
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="body1" textAlign="center">
                Hello {response.data[0]?.insuredName},
                <br />
                Your payment is under process. If the payment is not completed Please reach out to
                your relationship manager / sales partner.
                <br />
                You may also connect with us on Toll-Free No. 1800-2663-202 or
                <br />
                Write to us at customercare@magma-hdi.com.
              </MDTypography>
            </Grid>
          )}
          {expired === true && (
            // link expired
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="body1" textAlign="center">
                Link was Expired
                <br />
                <br />
                For further assistance, you can reach out to your relationship manager / sales
                partner.
                <br />
                You may also connect with us on Toll-Free No. 1800-2663-202 or
                <br />
                Write to us at customercare@magma-hdi.com.
              </MDTypography>
            </Grid>
          )}
        </Grid>
      </Card>
    </Card>
  );
}

function PaymentLinkFlow() {
  const { search } = useLocation();
  const proposalNumber = new URLSearchParams(search).get("ProposalNumber");
  console.log("proposalNumber", proposalNumber);
  const Navigate = useNavigate();
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  const { genericPolicyDto } = control;
  const [response, SetResponse] = useState();
  const [complete, setComplete] = useState(false);
  const [expired, setExpired] = useState(false);

  const Request = {
    ReportConfigId: "379",
    paramList: [
      {
        ParameterName: "proposalNumber",
        ParameterValue: proposalNumber,
      },
    ],
  };
  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };
  useEffect(async () => {
    // debugger;
    const responseapi = await QueryExecution(Request);
    SetResponse(responseapi);
    console.log("QueryExecution", responseapi);
    const Commencement = await GetProposalList(proposalNumber);
    console.log("Commencementapi", Commencement);
    const CommencementDate = Commencement.data.policyStartDate;
    console.log("Commencementdateapi", CommencementDate);
    const ProposalCreatedDate = Commencement.data.createdDate;
    console.log("ProposalCreatedDateeapi", ProposalCreatedDate);
    const paymentStatus = responseapi.data[0]?.paymentStatus;
    const today = new Date();
    const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (
      (paymentStatus === "Payment Pending" &&
        formatDate(CommencementDate) >= formatDate(ProposalCreatedDate) &&
        formatDate(ProposalCreatedDate) === formatDate(formattedToday)) ||
      (paymentStatus === "Payment Pending" &&
        formatDate(CommencementDate) < formatDate(ProposalCreatedDate) &&
        formatDate(CommencementDate) <= formatDate(formattedToday))
    ) {
      setGenericPolicyDto(dispatch, { ...Commencement.data.policyRequest });
      setGenericInfo(dispatch, {
        ...genericInfo,
        prod: "Magma",
        prodlabel: "HospiCash",
      });
      Navigate(
        `/RedirectionToRetail?prodCode=Magma&prodLabel=COI Summary&url=/CustomerRetailV1&ProposalNumber=${proposalNumber}&state=payment&step=1`
      );
      setComplete(false);
      setExpired(false);
    } else if (
      paymentStatus === "Completed" ||
      paymentStatus === "Failure" ||
      paymentStatus === "created" ||
      paymentStatus === "Payment Initiated" ||
      (formatDate(CommencementDate) >= formatDate(ProposalCreatedDate) &&
        formatDate(ProposalCreatedDate) === formatDate(formattedToday)) ||
      (formatDate(CommencementDate) < formatDate(ProposalCreatedDate) &&
        formatDate(CommencementDate) <= formatDate(formattedToday))
    ) {
      setComplete(true);
      setExpired(false);
      console.log("hari", expired);
    } else if (
      (formatDate(CommencementDate) >= formatDate(ProposalCreatedDate) &&
        formatDate(ProposalCreatedDate) !== formatDate(formattedToday)) ||
      (formatDate(CommencementDate) < formatDate(ProposalCreatedDate) &&
        formatDate(CommencementDate) > formatDate(formattedToday))
    ) {
      console.log("CommencementDate is greater than today's date");
      setComplete(true);
      setExpired(true);
    }

    console.log("genericPolicyDtonew", genericPolicyDto);
  }, []);

  useEffect(() => {
    console.log("responseflag", response);
  }, [response]);

  return (
    <>
      {complete === false ? <div>redirecting...</div> : null}
      {complete === true ? <MagmaPaymentFailure response={response} expired={expired} /> : null}
    </>
  );
}
export default PaymentLinkFlow;
