import { useEffect, useState } from "react";
import swal from "sweetalert2";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import {
  GetProposalByNumber,
  GetPaymentDetails,
  // emailpolicy,
  // emailpolicy1,
} from "./data/APIs/NBTravelApi";
// import { setGenericPolicyDto } from "../../../../BrokerPortal/context/index";

function ReyzorPay() {
  // const ProposalNo = localStorage.getItem("ProposalNo");
  const [proposer, setProposerDetails] = useState("");
  // const [policyview, setPolicyview] = useState("");

  // const { search } = useLocation();

  // const [dispatch] = useDataController();
  const genericPolicyDto = JSON.parse(localStorage.getItem("genericPolicyDto"));
  console.log("checkit", genericPolicyDto);

  useEffect(async () => {
    const ProposalNo = localStorage.getItem("ProposalNo");
    // debugger; // eslint-disable-line
    // const ProposalNumber = new URLSearchParams(search).get("ProposalNo");
    console.log("enter into this method");
    const res = await GetProposalByNumber(ProposalNo);
    console.log("checkpropss", res);
    setProposerDetails({ ...res.data[0].policyDetails });
    // setProposerDetails(res);
    console.log("check", proposer);
  }, []);
  const Navigate = useNavigate();
  const options = {
    key: "rzp_test_KK09FiPyLY2aKI",
    amount:
      proposer && proposer.PremiumDetail.TotalPremium !== ""
        ? Math.round(proposer.PremiumDetail.TotalPremium * 100)
        : 0,

    name: proposer && proposer.ProposerDetails.Name !== "" ? proposer.ProposerDetails.Name : "",
    description: "Policy Payment",
    email:
      // "sankar.kumar@inubesolutions.com",
      proposer && proposer.ProposerDetails.EmailId !== "" ? proposer.ProposerDetails.EmailId : "",
    handler: async (response) => {
      // debugger; // eslint-disable-line
      console.log("response", response);
      if (typeof response.razorpay_payment_id !== "undefined" || response.razorpay_payment_id > 1) {
        console.log("response check", response.razorpay_payment_id);
        const ProposalNo = localStorage.getItem("ProposalNo");
        const obj1 = {
          TransactionNo: "",
          Amount: proposer.PremiumDetail.TotalPremium,
          PaymentGateway: "Razorpay",
          PaymentStatus: "Success",
          EmailId: "",
          TransactionType: "",
          Description: "",
          ModeOfPayment: "",
          DocumentType: "",
          BRANCH_GSTIN: "",
          CUSTOMER_GSTIN: "",
          MAXBUPA_BRANCH_CODE: "",
          CUSTOMER_STATE_CODE: "",
        };
        const res1 = await GetPaymentDetails(obj1, ProposalNo);

        console.log("checking", res1);
        // setPolicyview(res1);
        // console.log("checking response", policyview);
        localStorage.setItem("Policyno", res1.data.policyNo);
        // await emailpolicy(res1.data.policyNo, proposer.ProposerDetails.EmailId);
        // await emailpolicy1(res1.data.policyNo, proposer.ProposerDetails.EmailId);
        //  const PolicyNo = new URLSearchParams(search).get("ProposalNo");
        // Navigate("/retail/Payment/NBRetailSuccess",`?policyno=${createSearchParams(params)}`);
        if (res1.data.policyNo !== "") {
          Navigate(`/retail/Products/NBRetail/NBRetailSuccess?policyno=${res1.data.policyNo}`);
        }
      } else {
        swal.fire({
          icon: "error",
          text: "Payment Failed",
          html: true,
        });
      }
    },

    prefill: {
      name: "Sankar",
      // genericPolicyDto.FirstName,
      email: "sankar.kumar@inubesolutions.com",
      // genericPolicyDto.Email,
      contact: "9513691681",
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
  console.log("rzp", rzp);
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
      </MDBox>
    </Grid>
  );
}

export default ReyzorPay;
