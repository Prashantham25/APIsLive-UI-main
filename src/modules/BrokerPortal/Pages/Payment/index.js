import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MDBox from "../../../../components/MDBox";
import { getRequest } from "../../../../core/clients/axiosclient";
import TravelPolicyPurchase from "../Travel/TravelQuote/FinalTravelDetails";
import MDTypography from "../../../../components/MDTypography";
// import MotorProposal from "../MotorProposal";

/* eslint eqeqeq:0 */

function Payment() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [lob, setLob] = useState("");
  const [transDetails, setTransDetails] = useState({});

  useEffect(async () => {
    const PaymentRefNo = new URLSearchParams(search).get("PaymentRefNo");
    const customerId = new URLSearchParams(search).get("CustomerId");
    const TransID = new URLSearchParams(search).get("transID");
    const PaymentStatus = new URLSearchParams(search).get("paymentStatus");
    const policyNumber = new URLSearchParams(search).get("PolicyNumber");
    const proposalNumber = new URLSearchParams(search).get("ProposalNumber");

    const res = await getRequest(`Policy/GetTransactionDetails?TransactionNumber=${PaymentRefNo}`);
    setTransDetails({
      ...res.data,
      CustomerId: customerId,
      transID: TransID,
      paymentStatus: PaymentStatus,
      ProposalNumber: proposalNumber,
      PolicyNumber: policyNumber,
    });
    setLob(res.data.lobValue);
    if (!res.data.lobValue || res.data.lobValue === "Motor" || res.data.lobValue === null) {
      const url = `/modules/BrokerPortal/Pages/MotorProposal${search}&pageState=ProposalForm&step=3`;
      navigate(url);
    }
  }, []);

  return (
    <MDBox>
      {lob === "Travel" && <TravelPolicyPurchase step={3} transDetails={transDetails} />}
      {/* {lob === "Motor" && <MotorProposal step={3} transDetails={transDetails} />} */}
      {lob === "Health" && (
        <MDTypography>{`Your Policy Number ${transDetails.PolicyNumber}`}</MDTypography>
      )}
    </MDBox>
  );

  /*
    Test URLs
    http://localhost:3000/modules/BrokerPortal/Pages/Payment?backURL=&transID=S9191829382&paymentStatus=Success
    http://localhost:3000/modules/BrokerPortal/Pages/Payment?backURL=&transID=F8129312482&paymentStatus=Failure
    */
}
export default Payment;
