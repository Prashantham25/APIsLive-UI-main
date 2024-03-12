import React, { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import swal from "sweetalert";
import { Card, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import Addons from "./Addons";
import LivesDetails from "./LivesDetails";
import Proposer from "./Proposer";
import Declaration from "./Declaration";
import Review from "./Review";
import Payment from "./Payment";
import Summary from "./Summary";
import data from "../data/JsonData";
import { calculateProposal, issuePolicy, sendPdf } from "../data/index";

const steps = ["Add-ons", "Lives Details", "Proposer", "Declaration", "Review", "Payment"];

function GetStepContent({
  step,
  handleNext,
  PolicyDto,
  setPolicyDto,
  qFlag,
  finalData,
  flag,
  policyNumber,
}) {
  switch (step) {
    case 0:
      return <Addons />;
    case 1:
      return <LivesDetails PolicyDto={PolicyDto} />;
    case 2:
      return <Proposer PolicyDto={PolicyDto} setPolicyDto={setPolicyDto} />;
    case 3:
      return <Declaration />;
    case 4:
      return <Review PolicyDto={PolicyDto} qFlag={qFlag} finalData={finalData} />;
    case 5:
      return <Payment handleNext={handleNext} flag={flag} policyNumber={policyNumber} />;
    default:
      return "Unknown step"; // + { step };
  }
}

GetStepContent.defaultProps = {
  step: 0,
  handleNext: {},
};

GetStepContent.propTypes = {
  step: PropTypes.number,
  handleNext: PropTypes.func,
};
function HorizontalLinearStepper({
  stepPar,
  PolicyDto,
  setPolicyDto,
  handleProposal,
  handleRazorpay,
  policyPeriod,
  setPolicyPeriod,
  finalData,
  flag,
  policyNumber,
  sumInsured,
}) {
  // const PolicyDtoL = PolicyDto;
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  console.log("step", activeStep);
  const [skipped, setSkipped] = useState(new Set());
  const [qFlag, setQFlag] = useState(false);
  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === 2) {
      // debugger;
      const date1 = new Date(PolicyDto.PolicyStartDate);
      const date2 = new Date(PolicyDto.PolicyEndDate);
      //  const rateDate = new Date("2022-11-11");
      const diffYear = date2.getFullYear() - date1.getFullYear();

      // const diffTime = date1.getTime() - rateDate.getTime();

      // // To calculate the no. of days between two dates
      // const Days = diffTime / (1000 * 3600 * 24);
      // console.log(Days);
      // PolicyDtoL.NoofDaysforRate = Days;
      setPolicyPeriod(diffYear);

      // setPolicyDto((prev) => ({ ...prev, ...PolicyDtoL }));
      console.log("29", PolicyDto);
    }
    if (activeStep === 3) {
      //  debugger;
      setQFlag(true);

      await handleProposal();
    }
    if (activeStep === 4) {
      //  debugger;
      await handleRazorpay();
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <MDBox sx={{ width: "100%", px: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            // labelProps.optional = (
            //   // <MDTypography variant="caption">Optional</MDTypography>
            // );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} sx={{ flexDirection: "column" }}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <MDTypography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </MDTypography>
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDBox sx={{ flex: "1 1 auto" }} />
            <MDButton onClick={handleReset}>Reset</MDButton>
          </MDBox>
        </>
      ) : (
        <>
          {/* <MDTypography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</MDTypography> */}
          <Grid container>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              <GetStepContent
                step={activeStep}
                handleNext={handleNext}
                PolicyDto={PolicyDto}
                setPolicyDto={setPolicyDto}
                qFlag={qFlag}
                finalData={finalData}
                flag={flag}
                policyNumber={policyNumber}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
              {activeStep === 0 ||
              activeStep === 1 ||
              activeStep === 2 ||
              activeStep === 3 ||
              activeStep === 4 ? (
                <Summary
                  PolicyDto={PolicyDto}
                  policyPeriod={policyPeriod}
                  sumInsured={sumInsured}
                />
              ) : null}
            </Grid>
          </Grid>

          {/* <MDButton color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </MDButton> */}
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDButton
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </MDButton>
            <MDBox sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <MDButton color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </MDButton>
            )}

            <MDButton onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </MDButton>
          </MDBox>
        </>
      )}
    </MDBox>
  );
}

function Proposal() {
  const [PolicyDto, setPolicyDto] = useState(data);
  const [policyPeriod, setPolicyPeriod] = useState();
  const [flag, setFlag] = useState(false);
  const [policyNumber, setPolicyNumber] = useState("");
  const [sumInsured, setSumInsured] = useState("");
  // const [proposalNumber,setProposalNumber]=useState();
  const [finalData, setFinalData] = useState({
    paymentDetailsDTO: {
      transactionNo: "73648274563",
      paymentSource: "Online",
      paymentId: "",
      paymentResponse: "",
    },
    proposalNo: "",
    policyNo: "",
  });
  useEffect(() => {
    const obj = { sum: "" };
    Object.keys(PolicyDto.InsurableItem[0].RiskItemSummary).forEach((x, index) => {
      // debugger;
      if (PolicyDto.InsurableItem[0].RiskItemSummary[index].EmployeeCount !== "") {
        PolicyDto.TotalLivesCount =
          Number(PolicyDto.TotalLivesCount) +
          Number(PolicyDto.InsurableItem[0].RiskItemSummary[index].EmployeeCount);
      }
    });

    Object.keys(PolicyDto.InsurableItem[0].RiskItemSummary).forEach((y, ind) => {
      // debugger;
      if (PolicyDto.InsurableItem[0].RiskItemSummary[ind].SI !== "") {
        obj.sum = Number(obj.sum) + Number(PolicyDto.InsurableItem[0].RiskItemSummary[ind].SI);
      }
    });
    setSumInsured(obj.sum);

    console.log("sumInsured", sumInsured);
    setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
    console.log("29", PolicyDto);
  }, []);
  const policyIssue = async () => {
    const policy = await issuePolicy(finalData);
    console.log("policy", policy);
    if (policy.status === 200) {
      setFlag(false);
      setPolicyNumber(policy.data.id);
      const pdf = await sendPdf(policy.data.id);
      console.log("pdf", pdf);
      swal({
        html: true,

        text: policy.data.responseMessage,
        icon: "success",
      });
    } else {
      swal({
        html: true,

        text: "Policy Issuance Failed",
        icon: "error",
      });
    }
  };
  const handleProposal = async () => {
    const proposal = await calculateProposal(PolicyDto);
    console.log("proposal", proposal);
    if (proposal.status === 200) {
      // setProposalNumber(proposal.data.proposalNumber);
      finalData.proposalNo = proposal.data.proposalNumber;
      setFinalData((prevState) => ({ ...prevState, ...finalData }));
      console.log("finalData", finalData);
      swal({
        html: true,

        text: proposal.data.responseMessage,
        icon: "success",
      });
    } else {
      swal({
        html: true,
        text: "Proposal Creation Failed",
        icon: "error",
      });
    }
  };
  const handleRazorpay = () => {
    console.log("check2", PolicyDto);
    // console.log("check1", refNo);
    // PolicyDto["Reference No"] = refNo;
    // setPolicyDto(PolicyDto);

    const options = {
      key: "rzp_test_KK09FiPyLY2aKI",
      amount: Math.round(PolicyDto.PremiumDetail.TotalPremium * 100),
      name: PolicyDto.ProposerDetails.FirstName,
      description: "Policy Payment",
      handler: (response) => {
        console.log("response", response);

        if (
          typeof response.razorpay_payment_id !== "undefined" ||
          response.razorpay_payment_id > 1
        ) {
          // debugger;

          console.log("response check", response.razorpay_payment_id);
          setFlag(true);
          policyIssue();
        } else {
          swal({
            text: "Payment Failed",
            icon: "error",
            html: true,
          });
        }
      },

      prefill: {
        name: PolicyDto.ProposerDetails.FirstName,
        // email: PolicyDto.ProposalData["Email ID"],
        // contact: PolicyDto.ProposalData["Mobile Number"],
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
  };
  return (
    <MDBox>
      <Card>
        <HorizontalLinearStepper
          stepPar={steps}
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          handleProposal={handleProposal}
          handleRazorpay={handleRazorpay}
          policyPeriod={policyPeriod}
          setPolicyPeriod={setPolicyPeriod}
          finalData={finalData}
          flag={flag}
          policyNumber={policyNumber}
          sumInsured={sumInsured}
        />
      </Card>
    </MDBox>
  );
}

export default Proposal;
