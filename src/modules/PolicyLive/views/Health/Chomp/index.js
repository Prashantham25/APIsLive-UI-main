import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card, FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import swal from "sweetalert";
// import Modal from "@mui/material/Modal";
// import POSPAdded from "modules/BrokerPortal/Pages/Admin/AppLication/POSPAdded";
import interviewschedule from "../../../../../assets/images/BrokerPortal/POSPAAdded.png";
import ProposerDetails from "./ProposerDetails";
import QuotationDetails from "./QuotationDetails";
import PremiumBreakup from "./PremiumBreakup";
// import PolicySummary from "./PolicySummary";
import OtherDetails from "./OtherDetails";
import Payment from "./Payment";
import InsuredDetails from "./InsuredDetails";
import { data, data1 } from "./data/JsonData";
// import SuccessPayment from "./SuccessPayment";

import {
  setLogo,
  setCustTheme,
  useDataController,
  setDentalInsuranceDetails,
} from "../../../../BrokerPortal/context";
import {
  calculatePremium,
  calculateProposal,
  getState,
  getDistrict,
  getProductList,
  sendMail,
} from "./data/index";
// import MDAvatar from "../../../../../components/MDAvatar";

const steps = [
  "Policy Details",
  "Proposer Details",
  "Insured Details",
  "Other Details",
  "Premium Summary",
  "Payment",
  // "SuccessPayment",
];

function GetStepContent({
  ruleflag,
  step,
  handleNext,
  ratingData,
  qFlag,
  PolicyIssueDto,
  propFlag,
  PolicyDto,
  setPolicyDto,
  setPolicyIssueDto,
  handleSetAutoComplete,
  callMail,
  // paymentGateway,
  mailFlag,
  proposalNumber,
  handlePaymentChange,
  offLinePaymentFlag,
  flag,
}) {
  switch (step) {
    case 0:
      return <QuotationDetails PolicyDto={PolicyDto} setPolicyDto={setPolicyDto} flag={flag} />;
    case 1:
      return (
        <ProposerDetails
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          setPolicyIssueDto={setPolicyIssueDto}
          flag={flag}
        />
      );
    case 2:
      return (
        <InsuredDetails
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          ruleflag={ruleflag}
          flag={flag}
        />
      );
    case 3:
      return <OtherDetails PolicyDto={PolicyDto} setPolicyDto={setPolicyDto} flag={flag} />;
    case 4:
      return (
        <PremiumBreakup
          handleNext={handleNext}
          ratingData={ratingData}
          qFlag={qFlag}
          PolicyIssueDto={PolicyIssueDto}
          handlePaymentChange={handlePaymentChange}
        />
      );
    case 5:
      console.log(proposalNumber, "proposalNumber");
      console.log(PolicyDto, "PolicyDto");
      return offLinePaymentFlag ? (
        <Payment
          setPolicyDto={setPolicyDto}
          handleNext={handleNext}
          propFlag={propFlag}
          PolicyDto={PolicyDto}
          callMail={callMail}
          mailFlag={mailFlag}
          proposalNumber={proposalNumber}
          handleSetAutoComplete={handleSetAutoComplete}
        />
      ) : null;
    // : (
    // <PolicySummary
    //   handleNext={handleNext}
    //   propFlag={propFlag}
    //   PolicyDto={PolicyDto}
    //   callMail={callMail}
    //   mailFlag={mailFlag}
    //   proposalNumber={proposalNumber}
    //   // offLinePaymentFlag={offLinePaymentFlag}
    // />

    //  );
    // case 6:
    //   return (
    //     <SuccessPayment
    //       handleNext={handleNext}
    //       PolicyDto={PolicyDto}
    //       proposalNumber={proposalNumber}
    //     />
    //   );

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

function Payment1({
  handlePaymentChange,
  handleNext,
  paymentGateway,
  offLinePaymentFlag,
  callProposal,
}) {
  // const [PaymentValue, setPaymentValue] = React.useState("offLinePayment");
  // const [offLinePaymentFlag, setoffLinePaymentFlag] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 8,
  };
  console.log("proceeeedddddd to payment");
  // const handlePaymentChange = (event) => {
  //   console.log("loop called");
  //   setPaymentValue(event.target.value);
  //   console.log(PaymentValue, "PaymentValue");
  // };

  // useEffect(() => {
  //   if (PaymentValue === "OfflinePayment") setoffLinePaymentFlag(true);
  //   else setoffLinePaymentFlag(false);
  //   console.log(offLinePaymentFlag, "offLinePaymentFlag");
  // }, [PaymentValue]);
  return (
    <div>
      <MDButton
        onClick={() => {
          handleOpen();
          callProposal();
        }}
      >
        Proceed to Payment
      </MDButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDTypography font-family="Roboto" fontSize="20px" mb={1}>
            <strong>Please Select The Payment Mode</strong>
          </MDTypography>
          <RadioGroup
            row
            // aria-labelledby="demo-row-radio-buttons-group-label"
            // name="row-radio-buttons-group"
            sx={{ justifyContent: "center", mt: 2.5, mb: 2.5 }}
            // onChange={handlePaymentChange}
            // value={PaymentValue}
          >
            <FormControlLabel
              value="OfflinePayment"
              control={<Radio />}
              label="Offline Payment"
              onChange={handlePaymentChange}
            />

            <FormControlLabel
              value="OnlinePayment"
              control={<Radio />}
              label="Online Payment"
              onChange={handlePaymentChange}
            />
          </RadioGroup>
          {offLinePaymentFlag ? (
            <MDButton sx={{ ml: 17, mt: 3 }} onClick={handleNext}>
              Proceed
            </MDButton>
          ) : (
            <MDButton sx={{ ml: 17, mt: 3 }} onClick={paymentGateway}>
              Proceed
            </MDButton>
          )}
        </MDBox>
      </Modal>
    </div>
  );
}
// function SendLink() {
//   //  const [open, setOpen] = React.useState(true);
//   // const handleOpen = () => setOpen(true);
//   // const handleClose = () => setOpen(false);
//   // const navigate = useNavigate();

//   // const onClick = () => {
//   //   navigate(`/modules/BrokerPortal/Pages/Admin/AppLication`);
//   // };
//   console.log("SendLink");
//   return (
//     <div>
//       {/* <MDButton onClick={handleOpen}>Proceed2</MDButton> */}
//       <Modal
//         open
//         // onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <MDBox>
//           <MDTypography id="modal-modal-description" sx={{ mt: 3 }}>
//             <MDBox pt={20} pl={70}>
//               <MDBox
//                 p={4}
//                 sx={{
//                   background: "#FFFFFF",
//                   height: "405px",
//                   width: "634px",
//                   borderRadius: "0px",
//                 }}
//               >
//                 <Grid container spacing={1}>
//                   <MDAvatar
//                     src={interviewschedule}
//                     sx={{ width: "142px", height: "198px", mx: "15rem" }}
//                     variant="square"
//                   />
//                   <Grid xs={12} textAlign="center" mt={1}>
//                     <MDTypography font-family="Roboto" variant="h6">
//                       Payment Link <p>Shared Successfully.</p>
//                     </MDTypography>
//                   </Grid>
//                   <br />
//                   <Grid xs={12} textAlign="center" mt={3}>
//                     <MDButton pb={90} variant="contained">
//                       View Policies
//                     </MDButton>
//                   </Grid>
//                 </Grid>
//               </MDBox>
//             </MDBox>
//           </MDTypography>
//         </MDBox>
//       </Modal>
//     </div>
//   );
// }

function HorizontalLinearStepper({
  ruleflag,
  stepPar,
  callPremium,
  ratingData,
  callProposal,
  PolicyIssueDto,
  qFlag,
  setQFlag,
  propFlag,
  setPropFlag,
  PolicyDto,
  setPolicyDto,
  setPolicyIssueDto,
  handleSetAutoComplete,
  callMail,

  mailFlag,
  proposalNumber,
  handlePaymentChange,
  paymentGateway,
  offLinePaymentFlag,
}) {
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  const [skipped, setSkipped] = useState(new Set());
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    console.log(flag);
  }, [flag]);
  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = async () => {
    let newSkipped = skipped;
    const DPolicyDto = PolicyDto;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0) {
      if (
        DPolicyDto.MasterPolicy === "" ||
        DPolicyDto.PlanName === "" ||
        // PolicyDto.PlanNo === "" ||
        DPolicyDto.TransactionType === "" ||
        DPolicyDto.ProposalDate === "" ||
        DPolicyDto.PolicyStartDate === "" ||
        DPolicyDto.PolicyEndDate === "" ||
        DPolicyDto.PolicyType === "" ||
        DPolicyDto.FamilyType === "" ||
        DPolicyDto.GoGreen === false
      ) {
        console.log("Please Enter the Required fields");

        setFlag(true);
        swal({
          icon: "error",
          text: "Please Enter the Required fields",
          buttons: "OK",
        });
      } else {
        console.log("Please Enter the Required fields1");

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        setFlag(false);
      }

      // setPropDobDate("");
    }
    if (activeStep === 1) {
      PolicyDto.InsurableItem[0].RiskItems.forEach(() =>
        PolicyDto.InsurableItem[0].RiskItems.pop()(
          console.log("index1234", PolicyDto.InsurableItem[0].RiskItems)
        )
      );
      for (let i = 0; i < PolicyDto.TotalMembers; i += 1) {
        PolicyDto.InsurableItem[0].RiskItems.push({
          displayflag: false,
          IsProposersameasInsuredYN: "",

          IsInsuredDisableFlag: false, // later this flag to be removed ,only to be used for Disabling  radio ....
          FirstInceptionDate: PolicyDto.PolicyStartDate,
          Name: "",
          DOB: "",
          displayDOB: "",
          Age: "",
          Gender: "",
          relationShipToProposer: "",
          Benefit: [PolicyDto.Benefit],
          Questionaire: [
            {
              QId: "1",
              Question:
                "Have you ever been diagnosed with, treated for, or advised to seek treatment from any of the following conditions?\na. AIDS/HIV\nb. Psychiatric/\n      mental     \n      disorders \nc. Hypertension\nd. Diabetes",
              Answer: "",
            },
            {
              QId: "2",
              Question: "Any dental claim submitted in the past policy?",
              Answer: "",
            },
            {
              QId: "3",
              Question:
                "I declare that I have never undergone in the last 12 months or have already started or likely to undergo any one of the dental procedures - fillings/replacements of fillings, root canal treatment, dental crowns, gum treatment, bridge/s, implant/s or complete/partial denture. I also declare that I am not experiencing or have not experienced any loose tooth, tooth decay or recurring tooth pain, gum Inflammation (red & tender, swollen or bleeding gums), tooth sensitivity on consumption of hot, cold or sugar, halitosis (persistent bad breath) or had routine dental health check-up requiring further dental procedures/ interventions in the last 12 months. I also declare that I currently don’t consume and have never consumed tobacco in any form including cigarettes / bidi/ e- cigarettes/ paan masala/ betel leaf/ gutka/ khaini and mawa",
              Answer: "",
            },
            {
              QId: "4",
              Question: "Are you Politically exposed person?",
              Answer: "",
            },
          ],
        });
      }
      console.log("index123", PolicyDto.InsurableItem[0].RiskItems);

      if (
        DPolicyDto.ProposerDetails.Salutation === "" ||
        DPolicyDto.ProposerDetails.FirstName === "" ||
        DPolicyDto.ProposerDetails.LastName === "" ||
        DPolicyDto.ProposerDetails.FirstName.length < 3 ||
        DPolicyDto.ProposerDetails.DOB === "" ||
        DPolicyDto.ProposerDetails.Age === "" ||
        DPolicyDto.ProposerDetails.Gender === "" ||
        DPolicyDto.ProposerDetails.EmailId === "" ||
        DPolicyDto.ProposerDetails.MobileNo === "" ||
        DPolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 === "" ||
        DPolicyDto.ProposerDetails.CommunicationAddress.AddressLine2 === "" ||
        DPolicyDto.ProposerDetails.CommunicationAddress.Pincode === "" ||
        DPolicyDto.ProposerDetails.CommunicationAddress.Area === "" ||
        DPolicyDto.ProposerDetails.CommunicationAddress.CityDistrict === "" ||
        DPolicyDto.ProposerDetails.CommunicationAddress.State === "" ||
        DPolicyDto.ProposerDetails.PermanentAddress.AddressLine1 === "" ||
        DPolicyDto.ProposerDetails.PermanentAddress.AddressLine2 === "" ||
        DPolicyDto.ProposerDetails.PermanentAddress.Pincode === "" ||
        DPolicyDto.ProposerDetails.PermanentAddress.Area === "" ||
        DPolicyDto.ProposerDetails.PermanentAddress.CityDistrict === "" ||
        DPolicyDto.ProposerDetails.PermanentAddress.State === "" ||
        DPolicyDto.ProposerDetails.eIANoYN === "" ||
        DPolicyDto.ProposerDetails.UniqueIdentificationNoYN === "" ||
        DPolicyDto.NomineeDetails.NomineeName === "" ||
        DPolicyDto.NomineeDetails.NomineeRelationWithProposer === "" ||
        DPolicyDto.NomineeDetails.NomineeDob === ""
        // PolicyDto.NomineeDetails.AppointeeName === "" ||
        // PolicyDto.NomineeDetails.AppointeeRelationshipwithNominee === "" ||
        // PolicyDto.NomineeDetails.AppointeeDob === ""
      ) {
        console.log("Please Enter the Required fields");
        // // setFlag((prevState) => ({ ...prevState, errorFlag: true }));
        setFlag(true);
        swal({
          icon: "error",
          text: "Please Enter the Required fields",
          buttons: "OK",
        });
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        setFlag(false);
      }

      // setPropDobDate("");
    }
    if (activeStep === 2) {
      // let premiumflag = false;
      //  console.log(premiumflag, "premiumflag");
      console.log(DPolicyDto.InsurableItem[0].RiskItems, "index123");
      DPolicyDto.InsurableItem[0].RiskItems.map((x, index) => {
        console.log(index, "index123");
        console.log(x, "index123");
        if (
          DPolicyDto.InsurableItem[0].RiskItems[index].Gender === "" ||
          DPolicyDto.InsurableItem[0].RiskItems[index].Name === "" ||
          DPolicyDto.InsurableItem[0].RiskItems[index].DOB === "" ||
          DPolicyDto.InsurableItem[0].RiskItems[index].Age === "" ||
          DPolicyDto.InsurableItem[0].RiskItems[index].InsuredMaritalStatus === "" ||
          DPolicyDto.InsurableItem[0].RiskItems[index].relationShipToProposer === "" ||
          DPolicyDto.InsurableItem[0].RiskItems[index].Dependent === "" ||
          DPolicyDto.InsurableItem[0].RiskItems[index].IsProposersameasInsuredYN === ""
        ) {
          console.log("Please Enter the Required fields");

          // setFlag((prevState) => ({ ...prevState, errorFlag: true }));
          setFlag(true);
          swal({
            icon: "error",
            text: "Please Enter the Required fields",
            buttons: "OK",
          });
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
          setFlag(false);
        }
        // } else {
        //   premiumflag = true;
        // }
        // else {
        //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
        //   setSkipped(newSkipped);
        // }
        // setFlag(false);
        return null;
        // setPropDobDate("");
      });
      // if (premiumflag === true) {
      //   console.log(premiumflag, "premiumflag123");
      //   await callPremium();
      // }

      // console.log("rulepassed", PolicyDto.RuleResult);
      // console.log("rulepassed", PolicyDto.RuleResult.length);
      // setFlag(false);
      console.log("premium clicked");
      setQFlag(true);

      // if (ruleflag === true) {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // }
    }

    if (activeStep === 3) {
      if (DPolicyDto.PrevPolicyDetails.PrevInsurerDetailsAvailable === "") {
        //  // setFlag((prevState) => ({ ...prevState, errorFlag: true }));
        // setFlag(true);
        setFlag(true);
        swal({
          icon: "error",
          text: "Please Enter the Required fields",
          buttons: "OK",
        });
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        setFlag(false);
        console.log("premium clicked");
        setQFlag(true);
        await callPremium();
      }
      // // let [dd, mm, yyyy] = DPolicyDto.MasterPolicyStartDate.split("/");
      // // if (mm <= 9) {
      // //   mm = `0${mm}`;
      // // }
      // // if (dd <= 9) {
      // //   dd = `0${dd}`;
      // // }
      // // yyyy = `${yyyy}`;
      // // DPolicyDto.MasterPolicyStartDate = `${yyyy}/${mm}/${dd}`;

      // // let [dd1, mm1, yyyy1] = DPolicyDto.MasterPolicyEndDate.split("/");
      // // if (mm1 <= 9) {
      // //   mm1 = `0${mm1}`;
      // // }
      // // if (dd1 <= 9) {
      // //   dd1 = `0${dd1}`;
      // // }
      // // yyyy1 = `${yyyy1}`;
      // // DPolicyDto.MasterPolicyEndDate = `${yyyy1}/${mm1}/${dd1}`;

      // // let [dd2, mm2, yyyy2] = DPolicyDto.ProposalDate.split("/");
      // // if (mm2 <= 9) {
      // //   mm2 = `0${mm2}`;
      // // }
      // // if (dd2 <= 9) {
      // //   dd2 = `0${dd2}`;
      // // }
      // // yyyy2 = `${yyyy2}`;
      // // DPolicyDto.ProposalDate = `${yyyy2}/${mm2}/${dd2}`;

      // let [dd3, mm3, yyyy3] = DPolicyDto.PolicyStartDate.split("/");
      // if (mm3 <= 9) {
      //   mm3 = `0${mm3}`;
      // }
      // if (dd3 <= 9) {
      //   dd3 = `0${dd3}`;
      // }
      // yyyy3 = `${yyyy3}`;
      // DPolicyDto.PolicyStartDate = `${yyyy3}/${mm3}/${dd3}`;

      // // let [mm4, dd4, yyyy4] = PolicyDto.PolicyStartDate.split("/");
      // // if (mm4 <= 9) {
      // //   mm4 = `0${mm4}`;
      // // }
      // // if (dd4 <= 9) {
      // //   dd4 = `0${dd4}`;
      // // }
      // // yyyy4 = `${yyyy4}`;
      // // PolicyDto.PolicyStartDate = `${yyyy4}/${mm4}/${dd4}`;

      // let [dd5, mm5, yyyy5] = DPolicyDto.PolicyEndDate.split("/");
      // if (mm5 <= 9) {
      //   mm5 = `0${mm5}`;
      // }
      // if (dd5 <= 9) {
      //   dd5 = `0${dd5}`;
      // }
      // yyyy5 = `${yyyy5}`;
      // DPolicyDto.PolicyEndDate = `${yyyy5}/${mm5}/${dd5}`;

      /// / //// PolicyPolicyDto.Masterto.MasterPolicyStartStartDaate = `${yyyy}/${mm}/${dd}`;
      // // PolicyDto.MasterPolicyEndDate = `${yyyy}/${mm}/${dd}`;
      // // PolicyDto.ProposalDate = `${yyyy}/${mm}/${dd}`;
      // // PolicyDto.PolicyStartDate = `${yyyy}/${mm}/${dd}`;
      // // PolicyDto.PolicyEndDate = `${yyyy}/${mm}/${dd}`;
      // DPolicyDte = `${yyyy}/${mm}/${dd}`;
      // // PolicyDto.MasterPolicyEndDate = `${yyyy}/${mm}/${dd}`;
      // // PolicyDto.ProposalDate = `${yyyy}/${mm}/${dd}`;
      // // PolicyDto.PolicyStartDate = `${yyyy}/${mm}/${dd}`;
      // // PolicyDto.PolicyEndDate = `${yyyy}/${mm}/${dd}`;
      // DPolicyDto.InsurableItem[0].RiskItems.map((x, index) => {
      //   const .map((x, index) => {
      //   const [dd6, mm6, yyyy6] =
      //     DPoldd6, mm6, yyyy6] =
      //     DPolicyDto.InsurableItem[0].RiskItems[icyDto.InsurableItem[0].RiskItems[index].InsuredDOB.split("/");

      //   DPolicyDto.InsurableItem[0].RiskItems[index].InsuredDOB.split("/");

      //   DPolicyDto.InsurableItem[0].RiskItems[index].InsuredDOB = `${yyyy6}/${mm6}/${dd6}`;
      // //   return null;
      // // });
      setPolicyDto((prev) => ({ ...prev, ...DPolicyDto }));
      console.log("heeeeyyyyy", DPolicyDto);
    }
    if (activeStep === 4) {
      setPropFlag(true);
      console.log("setPropFlag", setPropFlag);
      console.log("activeStep", activeStep);

      await callProposal();
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
    // if (activeStep === 5) {
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   setSkipped(newSkipped);
    // }
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
  const navigate = useNavigate();
  const handleProceed1 = () => {
    navigate(`/SuccessPayment`);
    // navigate(`/modules/PolicyLive/views/Health/Chomp/SuccessPayment`);
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
          <GetStepContent
            ruleflag={ruleflag}
            step={activeStep}
            handleNext={handleNext}
            ratingData={ratingData}
            qFlag={qFlag}
            PolicyIssueDto={PolicyIssueDto}
            propFlag={propFlag}
            PolicyDto={PolicyDto}
            setPolicyDto={setPolicyDto}
            setPolicyIssueDto={setPolicyIssueDto}
            handleSetAutoComplete={handleSetAutoComplete}
            callMail={callMail}
            mailFlag={mailFlag}
            proposalNumber={proposalNumber}
            handlePaymentChange={handlePaymentChange}
            offLinePaymentFlag={offLinePaymentFlag}
            paymentGateway={paymentGateway}
            flag={flag}
          />
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
              Previous
            </MDButton>
            <MDBox sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <MDButton color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </MDButton>
            )}

            {activeStep === 4 || activeStep === 5 ? (
              <>
                &nbsp;
                {activeStep === 4 ? (
                  <MDButton>
                    <Payment1
                      handlePaymentChange={handlePaymentChange}
                      handleNext={handleNext}
                      paymentGateway={paymentGateway}
                      offLinePaymentFlag={offLinePaymentFlag}
                      callProposal={callProposal}
                    />
                  </MDButton>
                ) : (
                  <>
                    &nbsp;
                    {activeStep === 5 && offLinePaymentFlag ? (
                      <MDButton onClick={handleProceed1}> Proceed1 </MDButton>
                    ) : // <MDButton>
                    //   {" "}
                    //   <SendLink />{" "}
                    // </MDButton>
                    null}
                  </>
                )}
              </>
            ) : (
              <MDButton onClick={handleNext}>
                {activeStep === 0 ? "Proceed" : null}
                {activeStep === 1 ? "Proceed" : null}
                {activeStep === 2 ? "Proceed" : null}
                {activeStep === 3 ? "Calculate Premium" : null}

                {activeStep === 5 ? "Proceed" : null}
                {activeStep === steps.length - 1 ? "Finish" : null}
              </MDButton>
            )}
          </MDBox>
        </>
      )}
    </MDBox>
  );
}

function DentalInsurance() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [PolicyDto, setPolicyDto] = useState(data);
  // const [state, dispatch] = useReducer(reducerProposal,initialState)
  const [PolicyIssueDto, setPolicyIssueDto] = useState(data1);
  const [proposalNumber, setProposalNumber] = useState("");
  const [ratingData, setRatingData] = useState({});
  const [qFlag, setQFlag] = useState(false);
  const [propFlag, setPropFlag] = useState(false);
  const [mailFlag, setMailFlag] = useState(false);
  const [loadProducts, setLoadProducts] = useState([]);
  const [controller, dispatch] = useDataController();
  // const [ruleflag, setruleflag] = useState(false);
  const { DentalInsuranceDetails } = controller;
  const [nomObj, setNomObj] = useState({
    NomineeName: "",
    NomineeRelationWithProposer: "",
    NomineeDob: "",
    NomineeAge: "",
    NomineeGender: "",
    NomineeAddressLine1: "",
    NomineeAddressLine2: "",
    NomineePincode: "",
    NomineeCity: "",
    NomineeState: "",
    AppointeeName: "",
    AppointeeRelationshipwithNominee: "",
    AppointeeGender: "",
    AppointeeAddressLine1: "",
    AppointeeAddressLine2: "",
    ApointeePincode: "",
    AppointeeCity: "",
    AppointeeState: "",
    AppointeeDOB: "",
  });
  // useEffect(() => {
  //   if (PolicyDto.RuleResult.length > 0) {
  //     PolicyDto.RuleResult.map((x, index) => {
  //       if (PolicyDto.RuleResult[index].outcome === "Success") {
  //         PolicyDto.InsurableItem[0].InactiveMembers.push({
  //           ...PolicyDto.InsurableItem[0].RiskItems[index],
  //         });
  //         const Rarr = [];
  //         PolicyDto.InsurableItem[0].RiskItems.map((y, yindex) => {
  //           if (yindex !== index) Rarr.push(y);
  //           return null;
  //         });
  //         PolicyDto.InsurableItem[0].RiskItems = Rarr;
  //         setPolicyDto(PolicyDto);
  //         // delete PolicyDto.InsurableItem[0].RiskItems[index];
  //         console.log("rulepassed1", PolicyDto.InsurableItem[0].RiskItems[index]);
  //         swal({
  //           icon: "error",
  //           text: "Member <Member Name(s)> will be removed from Policy Issuance. Do you want to continue?",
  //           // buttons: "OK",
  //           buttons: {
  //             // cancel: "Yes",
  //             Yes: true,
  //             true: "No",
  //           },
  //         }).then((value) => {
  //           switch (value) {
  //             case "Yes":
  //               swal("navigation has to be done. click on proceed");
  //               setruleflag(true);

  //               break;
  //             // no default
  //           }
  //         });
  //       }
  //       console.log("rulepassed", index);
  //       // setruleflag(true);

  //       return null;
  //     });
  //   }
  // }, [PolicyDto.RuleResult]); for rule result used once rule is corrected
  React.useEffect(() => {
    setDentalInsuranceDetails(dispatch, {
      PolicyDto: { ...PolicyDto },
      ProposalNo: { proposalNumber },
    });
    console.log(DentalInsuranceDetails, "DentalInsuranceDetails");
  }, [PolicyDto, proposalNumber]);
  useEffect(() => {
    console.log("length", PolicyDto.InsurableItem[0].RiskItems);
  }, [PolicyDto.InsurableItem[0].RiskItems]);
  // React.useEffect(() => {
  //   PolicyDto.ProposalNo = proposalNumber;
  //   setPolicyDto(() => ({ ...PolicyDto }));
  //   console.log(" PolicyDto.proposalNumber", PolicyDto);
  // }, [proposalNumber]);
  useEffect(() => {
    console.log("length", PolicyDto.InsurableItem[0].RiskItems);
  }, [proposalNumber]);

  const callMail = async () => {
    console.log("02", proposalNumber);
    setMailFlag(true);
    const mail = await sendMail(proposalNumber, PolicyDto.ProposerDetails.EmailId);
    // const mail = await sendMail(proposalNumber, "sahana@inubesolution.com");
    console.log("mail", mail);
    if (mail.data.status === 1) {
      swal({
        text: `Payment Link
        Shared Successfully.`,
        buttons: "View Policies",
        html: true,
        icon: interviewschedule,
      }).then(() => navigate(`/SearchPolicies`));

      // SendLink();
      setMailFlag(false);
    }
  };

  useEffect(async () => {
    const today = new Date().toLocaleDateString();
    console.log("12", today);
    let [mm, dd, yyyy] = today.split("/");
    if (mm <= 9) {
      mm = `0${mm}`;
    }
    if (dd <= 9) {
      dd = `0${dd}`;
    }
    yyyy = `${yyyy}`;

    PolicyDto.ProposalDate = `${yyyy}-${mm}-${dd}`;
    setPolicyDto(PolicyDto);
    setLogo(dispatch, "HDFCErgoLogo");

    setCustTheme(dispatch, "HDFCErgoLogo");
    const productData = await getProductList();
    console.log("productData", productData);

    Object.keys(productData).forEach((i) => {
      if (productData[i].productStatusId === 38) {
        loadProducts.push({ mID: productData[i].productId, mValue: productData[i].productName });
      }
    });

    // for (const i in productData) {
    //   if (productData[i].productStatusId === 38) {
    //     loadProducts.push({ mID: productData[i].productId, mValue: productData[i].productName });

    //   }
    // }
    setLoadProducts([...loadProducts]);
  }, []);

  const callstateDistrict = async (data2) => {
    const dist = await getDistrict(data2);
    const state = await getState(dist[0].mdata[0].mID);
    return { dist, state };
  };
  useEffect(async () => {
    if (PolicyDto.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
      const abc = await callstateDistrict(PolicyDto.ProposerDetails.CommunicationAddress.Pincode);
      console.log("abc", abc);
      PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict = abc.dist[0].mdata[0].mValue;
      PolicyDto.ProposerDetails.CommunicationAddress.State = abc.state[0].mdata[0].mValue;
      setPolicyDto((prevState) => ({
        ...prevState,
        PolicyDto: prevState.PolicyDto,
      }));
    }
  }, [PolicyDto.ProposerDetails.CommunicationAddress.Pincode]);

  useEffect(async () => {
    if (PolicyDto.ProposerDetails.PermanentAddress.Pincode.length === 6) {
      const abc = await callstateDistrict(PolicyDto.ProposerDetails.PermanentAddress.Pincode);
      console.log("abc", abc);
      PolicyDto.ProposerDetails.PermanentAddress.CityDistrict = abc.dist[0].mdata[0].mValue;
      PolicyDto.ProposerDetails.PermanentAddress.State = abc.state[0].mdata[0].mValue;
      setPolicyDto((prevState) => ({
        ...prevState,
        PolicyDto: prevState.PolicyDto,
      }));
    }
  }, [PolicyDto.ProposerDetails.PermanentAddress.Pincode]);
  useEffect(async () => {
    if (PolicyDto.NomineeDetails.NomineePincode.length === 6) {
      const abc = await callstateDistrict(PolicyDto.NomineeDetails.NomineePincode);
      console.log("abc", abc);
      PolicyDto.NomineeDetails.NomineeCity = abc.dist[0].mdata[0].mValue;
      PolicyDto.NomineeDetails.NomineeState = abc.state[0].mdata[0].mValue;
      setPolicyDto((prevState) => ({
        ...prevState,
        PolicyDto: prevState.PolicyDto,
      }));
    }
  }, [PolicyDto.NomineeDetails.NomineePincode]);
  useEffect(async () => {
    if (nomObj.ApointeePincode.length === 6) {
      const abc = await callstateDistrict(nomObj.ApointeePincode);
      console.log("abc", abc);
      nomObj.AppointeeCity = abc.dist[0].mdata[0].mValue;
      nomObj.AppointeeState = abc.state[0].mdata[0].mValue;
      setNomObj((prevState) => ({
        ...prevState,
        ...nomObj,
      }));
    }
  }, [nomObj.ApointeePincode]);
  const handleSetAutoComplete = (e, type, value) => {
    if (type === "TransactionType" || type === "PolicyType") {
      PolicyDto[e.target.id.split("-")[0]] = value.mValue;
    } else if (type === "GroupSize" || type === "CoverType") {
      PolicyDto[e.target.id.split("-")[0]] = value.mID;
    } else if (type === "Salutation" || type === "ProposerGender") {
      PolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
    } else if (type === "ModeOfPayment") {
      PolicyIssueDto[e.target.id.split("-")[0]] = value.mValue;
    }

    setPolicyDto((prevState) => ({
      ...prevState,
      ...PolicyDto,
    }));
    setPolicyIssueDto((prevState) => ({
      ...prevState,
      ...PolicyIssueDto,
    }));
    console.log(PolicyIssueDto, "PolicyIssueDto");
  };

  const [offLinePaymentFlag, setoffLinePaymentFlag] = React.useState(false);
  const paymentGateway = () => {
    console.log("handleproceed222222222");
    console.log("offLinePaymentFlag", offLinePaymentFlag);
    if (offLinePaymentFlag === false) {
      console.log("callMail");
      callMail();
      console.log("callMail1");
      // <SendLink />;
    }
  };
  const handlePaymentChange = (event) => {
    if (event.target.value === "OfflinePayment") setoffLinePaymentFlag(true);
    else {
      setoffLinePaymentFlag(false);
    }
    console.log(offLinePaymentFlag, "offLinePaymentFlag");
    console.log(event.target.value, "valueeeee");
  };
  const callPremium = () => {
    PolicyDto.InsurableItem[0].RiskItems.map((x, key) => {
      console.log(x);
      console.log("premiumResultttt");

      delete PolicyDto.InsurableItem[0].RiskItems[key].IsInsuredDisableFlag;
      return null;
    });
    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    calculatePremium(PolicyDto).then((response) => {
      console.log("premiumResult", response);
      setRatingData({ ...response.data.finalResult.TargetObject });

      setPolicyDto((prevState) => ({
        ...prevState,
        RuleResult: [...response.data.finalResult.memberRulesResult[0].memberRulesResult],
      }));

      setPolicyDto((prevState) => ({
        ...prevState,
        PremiumDetail: { ...response.data.finalResult.TargetObject },
      }));

      setPolicyIssueDto((prevState) => ({
        ...prevState,

        Amount: response.data.finalResult.TargetObject.TotalPremium,
      }));
    });
  };

  const callProposal = () => {
    console.log("callProposal....");

    calculateProposal(PolicyDto).then((result) => {
      console.log("11", result);
      if (result.data.proposalNumber !== "") {
        setProposalNumber(result.data.proposalNumber);
        PolicyDto.ProposalNo = proposalNumber;
        setPolicyDto(() => ({ ...PolicyDto }));
        console.log(" PolicyDto.proposalNumber", PolicyDto);
        console.log(" PolicyDto.proposalNumber", proposalNumber);
        setPropFlag(false);
      }
    });
  };

  useEffect(() => {
    console.log("new vallue of prop flag", propFlag);
  }, [propFlag]);
  // setPolicyDto(PolicyDto);
  console.log("PolicyDtoindex", PolicyDto);
  const step = new URLSearchParams(search).get("step");
  return (
    <MDBox>
      <MDTypography>Certificate of Insurance </MDTypography>
      <Card sx={{ pb: 2 }}>
        <HorizontalLinearStepper
          // ruleflag={ruleflag}
          stepPar={step}
          callPremium={callPremium}
          ratingData={ratingData}
          callProposal={callProposal}
          PolicyIssueDto={PolicyIssueDto}
          qFlag={qFlag}
          setQFlag={setQFlag}
          propFlag={propFlag}
          setPropFlag={setPropFlag}
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          setPolicyIssueDto={setPolicyIssueDto}
          handleSetAutoComplete={handleSetAutoComplete}
          callMail={callMail}
          mailFlag={mailFlag}
          proposalNumber={proposalNumber}
          handlePaymentChange={handlePaymentChange}
          paymentGateway={paymentGateway}
          offLinePaymentFlag={offLinePaymentFlag}
        />
      </Card>
    </MDBox>
  );
}

export default DentalInsurance;
