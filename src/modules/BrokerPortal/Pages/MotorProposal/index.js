// prop-types is a library for typechecking of props
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { isValid } from "date-fns";
// @mui material components
import { Autocomplete, CircularProgress, Modal } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Stack from "@mui/material/Stack";
import StepLabel from "@mui/material/StepLabel";
import Icon from "@mui/material/Icon";
import { MailOutlined, Share, KeyboardBackspace, ArrowBack } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ClearIcon from "@mui/icons-material/Clear";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";

import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDDatePicker from "components/MDDatePicker";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import KYCLogo from "assets/images/BrokerPortal/KYCSuccess.svg";
import KYCNoLogo from "assets/images/BrokerPortal/KYCFailure.svg";
import EConsentLogo from "assets/images/BrokerPortal/EConsent.png";
import tag from "assets/images/BrokerPortal/tag.png";
import carAccident from "assets/images/BrokerPortal/car_accident.png";
import carCrash from "assets/images/BrokerPortal/car_crash.png";
import garage from "assets/images/BrokerPortal/garage.png";
import puzzle from "assets/images/BrokerPortal/puzzle.png";
import bonus from "assets/images/BrokerPortal/bonus.png";
// import Share from "assets/images/BrokerPortal/Share.png";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import swal from "sweetalert";
import CustDetail from "assets/images/BrokerPortal/CustDetail.png";
import OtpInput from "react-otp-input-rc-17";
import CancelIcon from "@mui/icons-material/Cancel";
import { UploadFiles, DeleteFile, ProfileData } from "../MyProfile/data/index";
import { getOTP, GetOTP } from "../CustomerEngage/data/index";
import colors from "../../../../assets/themes/bptheme/base/colors";
import { images, useDataController, setvehicleEditButton } from "../../context";
import DetailsPanel from "../MotorComparison/DetailsPanel";
import {
  GetPaymentURL,
  GetPDF,
  // GetProductPartnerMaster,
  SaveProposal,
  GetAllMasters,
  fetchProdPartnerMaster,
} from "./data";
import { CoveredNotCoveredData } from "../MotorComparison/data";
import { getRequest, postRequest } from "../../../../core/clients/axiosclient";
import MotorPAYUPayment from "./MotorPAYUPayment";
// import { formatDate } from "@fullcalendar/react";

// import appConfig from "../../../../jsconfig.json";
const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "5px!important",
  },
};

const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};

const errorText = "Please fill required field";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "56rem",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

const steps = ["Proposal Form", "CKYC", "Payment", "Download Policy"];
const { primary } = colors;

// const handleFileUpload = async (event, type) => {
//   await UploadFiles(event.target.files[0], type);
//   console.log("files", event.target.files[0]);
// };

/* eslint eqeqeq: 0 */
function FeatureList({ handleClose, data, title, addOnPremiumData }) {
  const filteredData = data.filter((x) => x !== null);
  const filteredPremium = addOnPremiumData.filter((x) => x !== null);
  console.log("List", data, title);

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%", pt: "3rem" }}
    >
      <Card
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "0rem",
          boxShadow: "unset",
          minWidth: "38.5rem",
          maxHeight: "35rem",
          overflowY: "scroll",
        }}
      >
        <MDBox justifyContent="end" display="flex" sx={{ width: "100%", background: "#CEEBFF" }}>
          <Icon fontSize="medium" onClick={handleClose}>
            close
          </Icon>
        </MDBox>
        <MDBox justifyContent="center" display="flex">
          <MDTypography
            variant="body1"
            sx={{
              fontSize: "1.5rem",
              background: "#CEEBFF",
              color: "#0071D9",
              width: "100%",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            {title}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection="row">
          <MDBox display="flex" flexDirection="column">
            {filteredData.map((elem, id) => (
              <MDTypography
                sx={{
                  px: "2rem",
                  pt: "1rem",
                  fontSize: "1.25rem",
                  color: "#000000",
                  background: id % 2 !== 0 ? "rgba(217, 217, 217, 0.18)" : "#FFFFFF",
                }}
              >
                {elem}
              </MDTypography>

              // {addOnPremiumData}
            ))}
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            {addOnPremiumData.length > 0 &&
              filteredPremium.map((elem, id) =>
                elem === "Free" ? (
                  <MDTypography
                    sx={{
                      alignItems: "flex-end",
                      px: "0.5rem",
                      pt: "1rem",
                      ml: "238px",
                      fontSize: "1.25rem",
                      color: "#000000",
                      background: id % 2 !== 0 ? "rgba(217, 217, 217, 0.18)" : "#FFFFFF",
                    }}
                  >
                    {elem}
                  </MDTypography>
                ) : (
                  <MDTypography
                    sx={{
                      alignItems: "flex-end",
                      px: "0.5rem",
                      pt: "1rem",
                      ml: "238px",
                      fontSize: "1.25rem",
                      color: "#000000",
                      background: id % 2 !== 0 ? "rgba(217, 217, 217, 0.18)" : "#FFFFFF",
                    }}
                  >
                    {formatter.format(elem)}
                  </MDTypography>
                )
              )}
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}
function FeatureList1({ handleClose, data, title }) {
  const filteredData = data.filter((x) => x !== null);
  console.log("List", data, title);
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%", pt: "3rem" }}
    >
      <Card
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: "0rem",
          boxShadow: "unset",
          minWidth: "38.5rem",
          maxHeight: "35rem",
          overflowY: "scroll",
        }}
      >
        <MDBox justifyContent="end" display="flex" sx={{ width: "100%", background: "#CEEBFF" }}>
          <Icon fontSize="medium" onClick={handleClose}>
            close
          </Icon>
        </MDBox>
        <MDBox justifyContent="center" display="flex">
          <MDTypography
            variant="body1"
            sx={{
              fontSize: "1.5rem",
              background: "#CEEBFF",
              color: "#0071D9",
              width: "100%",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            {title}
          </MDTypography>
        </MDBox>
        {/* <MDBox display="flex" flexDirection="row" */}
        {filteredData.map((elem, id) => (
          <MDTypography
            sx={{
              //  px: "2rem",
              pt: "1rem",
              fontSize: "1.25rem",
              color: "#000000",
              background: id % 2 !== 0 ? "rgba(217, 217, 217, 0.18)" : "#FFFFFF",
            }}
          >
            {elem}
          </MDTypography>
          // {addOnPremiumData}
        ))}
      </Card>
    </MDBox>
  );
}

function GetStepContent({
  step,
  handleNext,
  paymentDetails,
  data,
  handleModalSendEmailOpen,
  setData,
  partnerDetails,
  ProposerDetails,
  quoteProposalOutput,
}) {
  switch (step) {
    case 0:
      return <Proposal handleNext={handleNext} data={data} setData={setData} />;
    case 1:
      return <Ckyc handleNext={handleNext} data={data} setData={setData} />;
    case 2:
      return partnerDetails.partnerProductCode === 128 ? (
        <MotorPAYUPayment
          ProposerDetails={ProposerDetails}
          handleNext={handleNext}
          data={data}
          quoteProposalOutput={quoteProposalOutput}
        />
      ) : (
        <Payment handleNext={handleNext} data={data} />
      );
    // return <Payment handleNext={handleNext} data={data} />;
    case 3:
      return paymentDetails.paymentStatus == "Failure" ? (
        <Failure paymentDetails={paymentDetails} />
      ) : (
        <Download
          paymentDetails={paymentDetails}
          handleModalSendEmailOpen={handleModalSendEmailOpen}
          partnerDetails={partnerDetails}
        />
      );
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
  paymentDetails,
  handleModalSendEmailOpen,
  setData,
  data,
}) {
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

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
          <GetStepContent
            step={activeStep}
            handleNext={handleNext}
            paymentDetails={paymentDetails}
            handleModalSendEmailOpen={handleModalSendEmailOpen}
            data={data}
            setData={setData}
          />
          <MDButton color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </MDButton>
          {/* <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDButton
              color="inherit"
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
          </MDBox> */}
        </>
      )}
    </MDBox>
  );
}

function EConsent({ handleClose, customerDetails, partnerDetails }) {
  const quoteNumber = 53436251711;
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Card
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "0rem", boxShadow: "unset", p: "2rem" }}
      >
        <MDBox justifyContent="center" display="flex" sx={{ width: "100%" }}>
          <MDBox
            component="img"
            src={EConsentLogo}
            sx={{ width: "7.56rem", height: "10.56rem", background: "transparent" }}
          />
        </MDBox>
        <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", textAlign: "center" }} fullWidth>
          E-consent for the Quote : {partnerDetails.quoteNumber}
        </MDTypography>
        <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", textAlign: "center" }} fullWidth>
          Shared Successfully to {customerDetails.FirstName} {customerDetails.LastName}
        </MDTypography>
        <MDBox justifyContent="center" display="flex" sx={{ p: "2rem" }} fullwidth>
          <MDButton
            onClick={() => handleClose(quoteNumber)}
            sx={{ width: "auto", fontSize: "0.7rem" }}
          >
            GO TO HOME
          </MDButton>
        </MDBox>
      </Card>
    </MDBox>
  );
}

EConsent.defaultProps = {
  handleClose: {},
};

EConsent.propTypes = {
  handleClose: PropTypes.func,
};

function KYCNoTrue({
  customerDetails,
  ProposerDetails,
  handlePayment,
  handleModalKYCNoTrue,
  // quoteProposalOutput,
}) {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Card
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "0rem", boxShadow: "unset", p: "2rem" }}
      >
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalKYCNoTrue} />
        </Grid>
        <MDBox justifyContent="center" display="flex" sx={{ width: "100%" }}>
          <MDBox
            component="img"
            src={KYCLogo}
            sx={{ width: "7.56rem", height: "10.56rem", background: "transparent" }}
          />
        </MDBox>
        <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", textAlign: "center" }} fullWidth>
          Your KYC has been Successfully Verified
        </MDTypography>
        <MDTypography sx={{ fontSize: "1.2rem", color: "#000000", textAlign: "center" }} fullWidth>
          Name : {ProposerDetails.CustomerFirstName} {ProposerDetails.CustomerLastName}
        </MDTypography>
        <MDTypography sx={{ fontSize: "1.2rem", color: "#000000", textAlign: "center" }} fullWidth>
          DOB : {ProposerDetails.DOB}
        </MDTypography>
        <MDTypography sx={{ fontSize: "1.2rem", color: "#000000", textAlign: "center" }} fullWidth>
          Mobile : {customerDetails.MobileNo}
        </MDTypography>
        <MDTypography sx={{ fontSize: "1.2rem", color: "#000000", textAlign: "center" }} fullWidth>
          Address : {ProposerDetails.CommunicationAddress.AddressLine1}
          {ProposerDetails.CommunicationAddress.AddressLine2}
          {ProposerDetails.CommunicationAddress.AddressLine3}
        </MDTypography>
        <MDBox justifyContent="center" display="flex" sx={{ p: "2rem" }} fullwidth>
          <MDButton
            onClick={handlePayment}
            // onClick={() => handleClose(quoteNumber)}
            sx={{ width: "auto", fontSize: "0.7rem" }}
          >
            PROCEED TO PAYMENT
          </MDButton>
        </MDBox>
      </Card>
    </MDBox>
  );
}

function KYCNoFalse({ handleSetToNo, handleModalKYCNoFalse }) {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Card
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "0rem", boxShadow: "unset", p: "2rem" }}
      >
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalKYCNoFalse} />
        </Grid>
        <MDBox justifyContent="center" display="flex" sx={{ width: "100%" }}>
          <MDBox
            component="img"
            src={KYCNoLogo}
            sx={{ width: "7.56rem", height: "10.56rem", background: "transparent" }}
          />
        </MDBox>
        <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", textAlign: "center" }} fullWidth>
          Your CKYC number is not Valid
        </MDTypography>
        <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", textAlign: "center" }} fullWidth>
          Please click on proceed for Manual Verification
        </MDTypography>
        <MDTypography sx={{ fontSize: "1.2rem", color: "#000000", textAlign: "center" }} fullWidth>
          (You need to submit your PAN details manually)
        </MDTypography>
        <MDBox justifyContent="center" display="flex" sx={{ p: "2rem" }} fullwidth>
          <MDButton onClick={handleSetToNo} sx={{ width: "auto", fontSize: "0.7rem" }}>
            PROCEED
          </MDButton>
        </MDBox>
      </Card>
    </MDBox>
  );
}

function PanNoFalse({ panModelClose, proposalDetails, handleModalPanNoFalse }) {
  const handleManualLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Card
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "0rem", boxShadow: "unset", p: "2rem" }}
      >
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalPanNoFalse} />
        </Grid>
        <MDBox justifyContent="center" display="flex" sx={{ width: "100%" }}>
          <MDBox
            component="img"
            src={KYCNoLogo}
            sx={{ width: "7.56rem", height: "10.56rem", background: "transparent" }}
          />
        </MDBox>
        <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", textAlign: "center" }} fullWidth>
          Your KYC has been Rejected
        </MDTypography>
        {proposalDetails.proposalResponse.finalResult.KYCURL !== "" && (
          <MDTypography
            sx={{ fontSize: "1.2rem", color: "#000000", textAlign: "center" }}
            fullWidth
          >
            Click the below link and follow the steps to get verified
          </MDTypography>
        )}
        {proposalDetails.proposalResponse.finalResult.KYCErrorText !== "" && (
          <MDTypography
            sx={{ fontSize: "0.8rem", color: "#000000", textAlign: "center" }}
            fullWidth
          >
            {proposalDetails.proposalResponse.finalResult.KYCErrorText}
          </MDTypography>
        )}
        {proposalDetails.proposalResponse.finalResult.KYCURL !== "" && (
          <MDTypography
            sx={{
              fontSize: "1.2rem",
              color: "#000000",
              textAlign: "center",
              textDecoration: "underline",
            }}
            fullWidth
            onClick={() => handleManualLink(proposalDetails.proposalResponse.finalResult.KYCURL)}
          >
            {proposalDetails.proposalResponse.finalResult.KYCURL}
          </MDTypography>
        )}
        <MDTypography sx={{ fontSize: "1.2rem", color: "#000000", textAlign: "center" }} fullWidth>
          Note:After completing this process your CKYC number will be generated
        </MDTypography>
        <MDTypography sx={{ fontSize: "1.2rem", color: "#000000", textAlign: "center" }} fullWidth>
          please copy that CKYC number and Enter in this screen
        </MDTypography>
        <MDBox justifyContent="center" display="flex" sx={{ p: "2rem" }} fullwidth>
          <MDButton onClick={panModelClose} sx={{ width: "auto", fontSize: "0.7rem" }}>
            CLOSE
          </MDButton>
        </MDBox>
      </Card>
    </MDBox>
  );
}

function Loading() {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <CircularProgress size="10rem" />
    </MDBox>
  );
}

function GetCheckbox({
  VehicleType,
  BusinessType,
  handleCustomerTerm,
  setTermsnCond,
  termsnCond,
  NCB,
}) {
  // console.log("123456789", VehicleType, BusinessType, NCB);
  let content;
  if (BusinessType === "4" || BusinessType === "New Business") {
    switch (VehicleType) {
      case "16":
        content = (
          <div>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              flexDirection="row"
              display="flex"
            >
              <Checkbox
                sx={{ mb: "2rem" }}
                color="secondary"
                value={termsnCond.acceptTnC}
                onChange={(e) =>
                  setTermsnCond((prevState) => ({
                    ...prevState,
                    acceptTnC: e.target.checked,
                  }))
                }
              />

              <MDTypography
                sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "0.5rem" }}
              >
                I agree to the{" "}
                <span
                  style={{
                    color: "#0071D9",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: "5px",
                    fontSize: "0.87rem",
                  }}
                  onClick={handleCustomerTerm}
                  role="button"
                  onKeyDown={handleCustomerTerm}
                  tabIndex="0"
                >
                  terms & conditions
                </span>{" "}
                and confirm: my car is not a commercial vehicle, and my car has a valid PUC
                certificate.
              </MDTypography>
            </Grid>
          </div>
        );
        break;
      case "17":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column" spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  // sx={{ mt: 2 }}
                  sx={{ mb: "4.5rem" }}
                  color="secondary"
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography
                  sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "1rem" }}
                >
                  I agree to the
                  <span
                    style={{
                      color: "#0071D9",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginLeft: "5px",
                      fontSize: "0.87rem",
                    }}
                    onClick={handleCustomerTerm}
                    role="button"
                    onKeyDown={handleCustomerTerm}
                    tabIndex="0"
                  >
                    terms & conditions
                  </span>{" "}
                  and confirm that the vehicle is a registered private two wheeler. I also confirm
                  that the details provided by me are accurate, and I agree to provide any
                  additional documents as a pre-condition for policy issuance.
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  // sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography
                  sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "0.5rem" }}
                >
                  I agree my bike has a valid PUC certificate.
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "193":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column" spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the
                  <span
                    style={{
                      color: "#0071D9",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginLeft: "5px",
                      fontSize: "0.87rem",
                    }}
                    onClick={handleCustomerTerm}
                    role="button"
                    onKeyDown={handleCustomerTerm}
                    tabIndex="0"
                  >
                    terms & conditions
                  </span>{" "}
                  and confirm that my commercial vehicle holds a valid PUC Certificate
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I declare that the information provided above is true and accept that if it is
                  found to be false, it may impact claims. I also declare that I have an existing
                  Personal Accident cover of Rs. 15 lacs
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "194":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column" spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the
                  <span
                    style={{
                      color: "#0071D9",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginLeft: "5px",
                      fontSize: "0.87rem",
                    }}
                    onClick={handleCustomerTerm}
                    role="button"
                    onKeyDown={handleCustomerTerm}
                    tabIndex="0"
                  >
                    terms & conditions
                  </span>{" "}
                  and confirm that my commercial vehicle holds a valid PUC Certificate
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I declare that the information provided above is true and accept that if it is
                  found to be false, it may impact claims. I also declare that I have an existing
                  Personal Accident cover of Rs. 15 lacs
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      default:
        console.log("1234567890");
    }
    // return content;
  } else if (BusinessType === "6" || BusinessType === "Roll Over") {
    switch (VehicleType) {
      case "16":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column" spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  // sx={{ mt: 2 }}
                  sx={{ mb: "2rem" }}
                  color="secondary"
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography
                  sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "0.5rem" }}
                >
                  I agree to the
                  <span
                    style={{
                      color: "#0071D9",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginLeft: "5px",
                      fontSize: "0.87rem",
                    }}
                    onClick={handleCustomerTerm}
                    role="button"
                    onKeyDown={handleCustomerTerm}
                    tabIndex="0"
                  >
                    terms & conditions
                  </span>{" "}
                  and confirm: my car is not a commercial vehicle, and my car has a valid PUC
                  certificate.
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  // sx={{ mt: 2 }}
                  sx={{ mb: "4rem" }}
                  color="secondary"
                  value={termsnCond.ncb}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      ncb: e.target.checked,
                    }))
                  }
                />

                <MDTypography
                  sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "0.5rem" }}
                >
                  I confirm that I have a valid NCB reserving certificate for the {NCB} NCB
                  transferred to my new car and that the original certificate will be produced at
                  the time of claim. You have confirmed that you have a valid NCB transfer
                  certificate
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "17":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column" spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  // sx={{ mt: 2 }}
                  sx={{ mb: "1.5rem" }}
                  color="secondary"
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography
                  sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "1rem" }}
                >
                  I agree to the
                  <span
                    style={{
                      color: "#0071D9",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginLeft: "5px",
                      fontSize: "0.87rem",
                    }}
                    onClick={handleCustomerTerm}
                    role="button"
                    onKeyDown={handleCustomerTerm}
                    tabIndex="0"
                  >
                    terms & conditions
                  </span>{" "}
                  and confirm: my bike is not a commercial vehicle, and my bike has a valid PUC
                  certificate.
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  // sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography
                  sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "0.5rem" }}
                >
                  I agree my bike has a valid PUC certificate.
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  // sx={{ mt: 2 }}
                  sx={{ mb: "5rem" }}
                  color="secondary"
                  value={termsnCond.ncb}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      ncb: e.target.checked,
                    }))
                  }
                />
                <MDTypography
                  sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "0.5rem" }}
                >
                  I confirm that I have a valid NCB reserving certificate for the {NCB} NCB
                  transferred to my new bike and that the original certificate will be produced at
                  the time of claim. You have confirmed that you have a valid NCB transfer
                  certificate.
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "193":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column" spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the
                  <span
                    style={{
                      color: "#0071D9",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginLeft: "5px",
                      fontSize: "0.87rem",
                    }}
                    onClick={handleCustomerTerm}
                    role="button"
                    onKeyDown={handleCustomerTerm}
                    tabIndex="0"
                  >
                    terms & conditions
                  </span>{" "}
                  and confirm: my previous policy is a comprehensive policy with {NCB} NCB and with
                  no claims and my car has a valid PUC certificate.
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.bike}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      bike: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree my bike has a valid PUC certificate.
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.ncb}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      ncb: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I declare that the information provided above is true and accept that if it is
                  found to be false, it may impact claims. I also declare that I have an existing
                  Personal Accident cover of Rs. 15 lacs
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      case "194":
        content = (
          <div>
            <MDBox display="flex" flexDirection="column" spacing={1}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.acceptTnC}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      acceptTnC: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I agree to the
                  <span
                    style={{
                      color: "#0071D9",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginLeft: "5px",
                      fontSize: "0.87rem",
                    }}
                    onClick={handleCustomerTerm}
                    role="button"
                    onKeyDown={handleCustomerTerm}
                    tabIndex="0"
                  >
                    terms & conditions
                  </span>{" "}
                  and confirm: my previous policy is a comprehensive policy with {NCB} NCB and with
                  no claims and my car has a valid PUC certificate.
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                flexDirection="row"
                display="flex"
              >
                <Checkbox
                  sx={{ mt: 2 }}
                  color="secondary"
                  value={termsnCond.ncb}
                  onChange={(e) =>
                    setTermsnCond((prevState) => ({
                      ...prevState,
                      ncb: e.target.checked,
                    }))
                  }
                />

                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                  I declare that the information provided above is true and accept that if it is
                  found to be false, it may impact claims. I also declare that I have an existing
                  Personal Accident cover of Rs. 15 lacs
                </MDTypography>
              </Grid>
            </MDBox>
          </div>
        );
        break;
      default:
        console.log("1234567890");
    }
    // return content;
  }
  return content || null;
}
function Proposal({ handleNext, data, setData }) {
  const [otpdata, setotpdata] = useState({
    otp: "",
    Email: "",
  });
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(`/modules/BrokerPortal/Pages/MotorComparison`);
  };

  // const [data, setData] = useState({
  //   BaseProductCode: "",
  //   BusinessType: "",
  //   PolicyType: "",
  //   VehicleType: "",
  //   CoverDetails: {
  //     AddOnsPlanApplicable: "",
  //     AddOnsPlanApplicableDetails: {
  //       PlanName: "Optional Add on",
  //       ZeroDepreciation: "",
  //       ReturnToInvoice: "",
  //       RoadSideAssistance: "",
  //       NCBProtection: "",
  //       InconvenienceAllowance: "",
  //       EngineProtector: "",
  //       KeyReplacement: "",
  //       LossOfPerBelongings: "",
  //     },
  //     BasicODApplicable: "Y",
  //     BasicTPApplicable: "Y",
  //     CompulsoryExcessAmount: "1000",
  //     FinancierDetails: {
  //       AgreementType: "",
  //       BranchName: "",
  //       CityCode: "",
  //       CityName: "",
  //       DistrictCode: "",
  //       DistrictName: "",
  //       FinancierAddress: "",
  //       FinancierCode: "",
  //       FinancierName: "",
  //       FinBusinessType: "",
  //       LoanAccountNumber: "",
  //       Pincode: "",
  //       PincodeLocality: "",
  //       StateCode: "",
  //       StateName: "",
  //     },
  //     FinancierDetailsApplicable: "",
  //     ImposedExcessAmount: "",
  //     IsPrevPolicyApplicable: "",
  //     OptionalCoverageApplicable: "true",
  //     OptionalCoverageDetails: {
  //       ApprovedAntiTheftDevice: "false",
  //       CertifiedbyARAI: "true",
  //       ElectricalApplicable: "false",
  //       ElectricalDetails: "",
  //       ExternalCNGkitApplicable: "false",
  //       ExternalCNGLPGkitDetails: "",
  //       ExternalLPGkitApplicable: "false",
  //       "FiberFuelTankApplicable ": "false",
  //       FiberFuelTankDetails: "",
  //       GeographicalExtensionApplicable: "false",
  //       GeographicalExtensionDetails: "",
  //       InbuiltCNGkitApplicable: "false",
  //       InbuiltLPGkitApplicable: "false",
  //       IsVehicleforHandicappedApplicable: "false",
  //       LLEmployeesApplicable: "false",
  //       LLEmployeesDetails: "",
  //       LLPaidDriverCleanerApplicable: "false",
  //       LLPaidDriverCleanerDetails: "",
  //       NamedPACoverApplicable: "false",
  //       NamedPACoverDetails: "",
  //       NonElectricalApplicable: "false",
  //       NonElectricalDetails: "",
  //       PAPaidDriverApplicable: "false",
  //       PAPaidDriverDetails: "",
  //       TheftAccessoriesApplicable: "false",
  //       TheftAccessoriesDetails: "",
  //     },
  //     PAOwnerCoverApplicable: "true",
  //     PAOwnerCoverDetails: {
  //       DoNotHoldValidDrvLicense: "false",
  //       ExistingPACover: "false",
  //       Ownmultiplevehicles: "false",
  //       PAOwnerSI: "1500000",
  //       PAOwnerTenure: "3",
  //       ValidDrvLicense: "true",
  //     },
  //     VoluntaryExcessAmount: "0",
  //   },
  //   PolicyEffectiveFromDate: "",
  //   PolicyEffectiveFromHour: "",
  //   PolicyEffectiveToDate: "",
  //   PolicyEffectiveToHour: "",
  //   PolicyTerm: "",
  //   ProposalDate: "",
  //   QuotationNo: "",
  //   VehicleDetails: {
  //     ChassisNumber: "",
  //     EngineNumber: "",
  //     IDVofVehicle: "",
  //     MakeId: "",
  //     MakeValue: "",
  //     ModelId: "",
  //     ModelValue: "",
  //     MonthOfManufacture: "",
  //     RegistrationDate: "",
  //     RegistrationNumber: "",
  //     RegistrationNumber1: "",
  //     RegistrationNumber2: "",
  //     RegistrationNumber3: "",
  //     RegistrationNumber4: "",
  //     RTOId: "",
  //     RTOValue: "",
  //     VariantId: "",
  //     VariantValue: "",
  //     VehicleOwnerShip: "",
  //     YearOfManufacture: "",
  //   },
  //   PreviousPolicyDetails: {
  //     previousPolicyExpiryDate: "",
  //     PreviousInsurerapplicable: "",
  //     PreviousPolicyNumber: "",
  //     previousInsurerCompanyCode: "",
  //     previousPolicyNumber: "",
  //     NoPreviousPolicyHistory: "",
  //     isVehicleNew: "",
  //     PreviousPolicyEndDate: "",
  //     PreviousPolicyInsurerName: "",
  //     PreviousPolicyStartDate: "",
  //     previousPolicyType: "1",
  //     PreviousNCBPercentage: "",
  //     PreviousPolicyTenure: "",
  //     ClaimOnPreviousPolicy: "false",
  //     NoOfClaims: "",
  //     IsInspectionDone: "",
  //     InspectionDoneByWhom: "",
  //     ReportDate: "",
  //     InspectionDate: "",
  //   },
  //   POSPInfo: {
  //     isPOSP: "",
  //     pospName: "",
  //     pospUniqueNumber: "",
  //     pospLocation: "",
  //     pospPanNumber: "",
  //     pospAadhaarNumber: "",
  //     pospContactNumber: "",
  //   },
  //   PartnerId: null,
  //   ChannelDetails: {
  //     CustomerType: "",
  //     BusineeChannelType: "",
  //     BusinessSource: "",
  //     EntityRelationShipCode: "",
  //     EntityRelationShipName: "",
  //     ChannelNumber: "",
  //     DisplayOfficeCode: "",
  //     OfficeCode: "",
  //     OfficeName: "",
  //     IntermediaryCode: "",
  //     IntermediaryName: "",
  //     BusinessSourceType: "",
  //     SPCode: "",
  //     SPName: "",
  //   },
  //   ProposerDetails: {
  //     CustomerType: "",
  //     CustomerFirstName: "",
  //     CustomerLastName: "",
  //     ContactNo: "",
  //     Nationality: "",
  //     Salutation: "",
  //     EmailId: "",
  //     DOB: null,
  //     Gender: "",
  //     MaritalStatus: "",
  //     OccupationCode: "",
  //     PanNo: "",
  //     AnnualIncome: "",
  //     GSTNumber: "",
  //     Pincode: "",
  //     CommunicationAddress: {
  //       AddressLine1: "",
  //       AddressLine2: "",
  //       AddressLine3: "",
  //       CityDistrictId: "",
  //       StateId: "",
  //       CountryId: "",
  //       Pincode: "",
  //     },
  //     PermanentAddressSameAsCommunication: "",
  //     PermanentAddress: {
  //       AddressLine1: "",
  //       AddressLine2: "",
  //       AddressLine3: "",
  //       CityDistrictId: "",
  //       CountryId: "",
  //       StateId: "",
  //       Pincode: "",
  //     },
  //     RegistrationAddressSameAsCommunication: "",
  //     RegistrationAddress: {
  //       AddressLine1: "",
  //       AddressLine2: "",
  //       AddressLine3: "",
  //       CityDistrictId: "",
  //       CountryId: "",
  //       StateId: "",
  //       Pincode: "",
  //     },
  //     RegistrationAddressSameAsPermanent: "",
  //   },
  //   NomineeDetails: [
  //     {
  //       NomineeFirstName: "",
  //       NomineeLastName: "",
  //       NomineeDOB: null,
  //       NomineeAge: "",
  //       NomineeRelationWithProposer: "",
  //       PercentageOfShare: "",
  //       GuardianName: "",
  //       GuardianDOB: "",
  //       RelationshoipWithGuardian: "",
  //     },
  //   ],
  // }); // This data is not hardcoded. Just to keep the structure to prevent getting error.

  const [controller, dispatch] = useDataController();
  const {
    isCustomer,
    quoteProposalOutput,
    partnerDetails,
    customerDetails,
    userSelection,
    motorQuoteInput,
  } = controller;
  useEffect(() => {
    setvehicleEditButton(dispatch, false);
  }, []);

  const [proposalDetails, setProposalDetails] = useState();
  const [paymentData, setPaymentData] = useState();

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  // const [PanCard] = useState();
  const [flags, setFlags] = useState({
    errorFlag: false,
    ageFlag: false,
    nomineeage: "",
    Age: "",
    nomineeFlag: "",
    chassisFlag: false,
    pincode: false,
    pincodecommunication: false,
    getotpflag: false,
    engineError: false,
    disableFlag: false,
    gstRegex: false,
    cinRegex: false,
    PanRegex: false,
  });

  const [datetoShow, setDate] = useState({
    dateOfBirth: "",
    nomineeDateofBirth: "",
    TPPolicyEndDate: "",
    ODPolicyEndDate: "",
    DateofRegistration: "",
    DOI: "",
  });
  // const [validDate, setValidDate] = useState(false);

  const [args, setArgs] = useState({
    productId: null,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const [Masters, setMasters11] = useState({ Gender: [] });
  useEffect(async () => {
    if (args.productId !== null && args.partnerId !== null && Masters.Gender.length === 0) {
      const { VehicleDetails } = quoteProposalOutput.finalResult;
      Promise.all([
        fetchProdPartnerMaster(args.productId, args.partnerId, "Gender", { Gender: "" }),
        fetchProdPartnerMaster(args.productId, args.partnerId, "NomineeRelation", {
          NomineeRelation: "",
        }),
        fetchProdPartnerMaster(args.productId, args.partnerId, "Nationality", { Nationality: "" }),
        fetchProdPartnerMaster(args.productId, args.partnerId, "VariantDetails", {
          Variant_Id: VehicleDetails.VariantId,
        }),
        fetchProdPartnerMaster(args.productId, args.partnerId, "RtoDetails", {
          RTO_ID: VehicleDetails.RTOId,
        }),
        fetchProdPartnerMaster(args.productId, args.partnerId, "Salutation", { Salutation: "" }),
        fetchProdPartnerMaster(args.productId, args.partnerId, "MaritalStatus", {
          MaritalStatus: "",
        }),
        fetchProdPartnerMaster(args.productId, args.partnerId, "Occupation", { Occupation: "" }),
        fetchProdPartnerMaster(args.productId, 0, "PolicyType", {}),
        fetchProdPartnerMaster(args.productId, 0, "DocumentType", { DocumentType: "" }),
        fetchProdPartnerMaster(args.productId, args.partnerId, "Hypothecation", {}),
      ]).then((results) => {
        setMasters11({
          Gender: results[0],
          NomineeRelation: results[1],
          Country: results[2],
          VariantDetailsOutput: results[3],
          RTODetailsOutput: results[4],
          Salutation: results[5],
          MaritalStatus: results[6],
          Occupation: results[7],
          PolicyType: results[8],
          DocumentType: results[9],
          Hypothecation: results[10],
        });
      });
    }
  }, [args]);

  // const { Masters } = GetProductPartnerMaster(args);
  const {
    Gender,
    NomineeRelation,
    // Country,
    VariantDetailsOutput,
    RTODetailsOutput,
    Salutation,
    MaritalStatus,
    Occupation,
    Hypothecation,
  } = Masters;

  if (false) console.log("1234567890", motorQuoteInput);

  useEffect(() => {
    // console.log("12345790-", data.PartnerId, RTODetailsOutput, data.BusinessType);
    if (
      RTODetailsOutput &&
      (data.PartnerId === "62" || data.PartnerId === 62) &&
      (data.BusinessType === "4" || data.BusinessType === "New Business")
    ) {
      const newValue = {
        ...data,
        VehicleDetails: {
          ...data.VehicleDetails,
          RegistrationNumber: RTODetailsOutput[0].RTO_Code,
        },
      };
      setData(newValue);
    }
  }, [RTODetailsOutput]);

  const handleOTP = (otp1) => {
    setotpdata((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
  };
  const handleEmail = (event) => {
    setotpdata((prevState) => ({
      ...prevState,
      Email: event.target.value,
    }));
  };
  const generateFile = (content, fileName) => {
    // console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    link.click();
  };

  const HandleDownload = async (quoteNumber) => {
    // console.log("quoteNumber", quoteNumber);
    const downloadDTO = {
      key: quoteNumber,
      templateId: 64,
      referenceId: args.partnerId,
    };

    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      // console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, quoteNumber);
      }
    });
  };

  // const dateFormat = (date) => {
  //   if (date !== "" && date !== null && date !== undefined) {
  //     const dateArr = date.split("-");
  //     return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  //   }
  //   return null;
  // };

  const handleCalculateAge = (date) => {
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();
    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    }
    // get months when current month is greater
    else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }
    // get days
    // let dateAge;
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      // dateAge = 31 + currentDate - dobDate;
      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    // group the age in a single variable
    return yearAge;
  };

  const [masters, setMasters] = useState({
    Gender: { mID: "", mValue: "" },
    NomineeRelation: { mID: "", mValue: "" },
    Salutation: { mID: "", mValue: "" },
    MaritalStatus: { mID: "", mValue: "" },
    NomineeSalutation: { mID: "", mValue: "" },
    Occupation: { mID: "", mValue: "" },
    DocumentType: { mID: "", mValue: "" },
    Hypothecation: { mID: "", mValue: "" },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [eConsent] = useState(false);
  // const [eConsent] = useState(false);
  // const handleOpen = async () => {
  //   let age = 0;
  //   if (data.NomineeDetails[0].NomineeDOB !== null) {
  //     const dob = datetoShow.nomineeDateofBirth.toLocaleDateString("en-ZA");
  //     age = handleCalculateAge(dob);
  //     console.log("age", age);
  //   }
  //   if (
  //     data.ProposerDetails.PanNo === "" ||
  //     // data.ProposerDetails.CustomerFirstName === "" ||
  //     // data.ProposerDetails.CustomerLastName === "" ||
  //     data.ProposerDetails.ContactNo === "" ||
  //     // data.NomineeDetails[0].NomineeFirstName === "" ||
  //     // data.NomineeDetails[0].NomineeLastName === "" ||
  //     data.ProposerDetails.EmailId === "" ||
  //     data.ProposerDetails.DOB === "" ||
  //     data.NomineeDetails[0].NomineeDOB === "" ||
  //     data.VehicleDetails.ChassisNumber === "" ||
  //     data.VehicleDetails.EngineNumber === "" ||
  //     // data.ProposerDetails.Pincode === "" ||
  //     // data.ProposerDetails.PermanentAddress.AddressLine1 === ""||
  //     // masters.Gender.mID === "" ||
  //     // masters.Salutation.mID === "" ||
  //     // masters.MaritalStatus.mID === "" ||
  //     // masters.Occupation.mID === "" ||
  //     // masters.NomineeSalutation.mID === "" ||
  //     // masters.NomineeRelation.mID === "" ||
  //     data.VehicleDetails.RegistrationNumber === "" ||
  //     // data.ProposerDetails.PermanentAddress.AddressLine1 === "" ||
  //     // data.ProposerDetails.PermanentAddress.AddressLine2 === "" ||
  //     // data.ProposerDetails.CommunicationAddress.AddressLine1 === "" ||
  //     // data.ProposerDetails.CommunicationAddress.AddressLine2 === "" ||
  //     (data.NomineeDetails[0].NomineeDOB !== "" && age < 18
  //       ? data.NomineeDetails[0].GuardianName === ""
  //       : null)
  //   ) {
  //     setFlags((prevState) => ({ ...prevState, errorFlag: true }));
  //     swal({
  //       icon: "error",
  //       text: "Please fill the required fields",
  //     });
  //   } else {
  //     setFlags((prevState) => ({ ...prevState, errorFlag: false }));
  //     if (flags.Age < 18) {
  //       setFlags((prevState) => ({ ...prevState, ageFlag: true }));
  //     }
  //     // } else if (flags.nomineeage < 18) {
  //     //   setFlags((prevState) => ({ ...prevState, ageFlag: false, nomineeFlag: true }));
  //     // }
  //     else {
  //       setFlags((prevState) => ({ ...prevState, ageFlag: false }));
  //       setEConsent(true);
  //       await SaveProposal(partnerDetails.partnerProductId, data).then((result) => {
  //         console.log("1234567890", result);
  //         const saveResult = result;
  //         setProposalDetails(saveResult);
  //         setModalOpen(false);
  //         if (result.status === 7) {
  //           swal({
  //             icon: "error",
  //             text: "something went wrong please try after some time",
  //           }).then(() => {
  //             setLoading(false);
  //             navigate("/modules/BrokerPortal/Pages/MotorComparison");
  //           });
  //         }
  //       });
  //     }
  //   }
  // };

  const handleClose = (quoteNumber) => {
    const values = { QuoteNumber: quoteNumber, pageState: "ProposalForm" };
    console.log("Customer URL", values);
    const URL = `http://localhost:3000/modules/BrokerPortal/Pages/MotorProposal?backURL=&QuoteNumber=${quoteNumber}&pageState=ProposalForm`;
    console.log("Customer URL", URL);
    navigate(`/modules/BrokerPortal/Pages/BPLanding`);
    setOpen(false);
  };

  const [plan, setPlan] = useState(false);
  const handlePlanOpen = () => setPlan(true);
  const handlePlanClose = () => setPlan(false);

  const [addon, setAddon] = useState(false);
  const handleAddonOpen = () => setAddon(true);
  const handleAddonClose = () => setAddon(false);

  const [coveredData, setCoveredData] = useState();
  const [planData, setPlanData] = useState([]);

  const [termsnCond, setTermsnCond] = useState({
    bike: false,
    ncb: false,
    acceptTnC: false,
    kyc: false,
  });

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };
  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const handleModalEmailOpen = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setModalEmailOpen(true);
  };
  const handleModalEmailClose = () => {
    setModalEmailOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };

  // const testData = {
  //   BaseProductCode: "",
  //   BusinessType: "New Business",
  //   PolicyType: "1",
  //   VehicleType: "1",
  //   ProductType: "PrivateCar",
  //   CoverDetails: {
  //     AddOnsPlanApplicable: "true",
  //     AddOnsPlanApplicableDetails: {
  //       PlanName: "Optional Add on",
  //       ZeroDepreciation: "True",
  //       ReturnToInvoice: "False",
  //       RoadSideAssistance: "False",
  //       NCBProtection: "False",
  //       InconvenienceAllowance: "False",
  //       EngineProtector: "False",
  //       KeyReplacement: "False",
  //       LossOfPerBelongings: "False",
  //     },
  //     BasicODApplicable: "Y",
  //     BasicTPApplicable: "Y",
  //     CompulsoryExcessAmount: "1000",
  //     FinancierDetails: {
  //       AgreementType: "",
  //       BranchName: "",
  //       CityCode: "",
  //       CityName: "",
  //       DistrictCode: "",
  //       DistrictName: "",
  //       FinancierAddress: "",
  //       FinancierCode: "",
  //       FinancierName: "",
  //       FinBusinessType: "",
  //       LoanAccountNumber: "",
  //       Pincode: "",
  //       PincodeLocality: "",
  //       StateCode: "",
  //       StateName: "",
  //     },
  //     FinancierDetailsApplicable: "",
  //     ImposedExcessAmount: "",
  //     IsPrevPolicyApplicable: "",
  //     OptionalCoverageApplicable: "true",
  //     OptionalCoverageDetails: {
  //       ApprovedAntiTheftDevice: "false",
  //       CertifiedbyARAI: "true",
  //       ElectricalApplicable: "false",
  //       ElectricalDetails: "",
  //       ExternalCNGkitApplicable: "false",
  //       ExternalCNGLPGkitDetails: "",
  //       ExternalLPGkitApplicable: "false",
  //       "FiberFuelTankApplicable ": "false",
  //       FiberFuelTankDetails: "",
  //       GeographicalExtensionApplicable: "false",
  //       GeographicalExtensionDetails: "",
  //       InbuiltCNGkitApplicable: "false",
  //       InbuiltLPGkitApplicable: "false",
  //       IsVehicleforHandicappedApplicable: "false",
  //       LLEmployeesApplicable: "false",
  //       LLEmployeesDetails: "",
  //       LLPaidDriverCleanerApplicable: "false",
  //       LLPaidDriverCleanerDetails: "",
  //       NamedPACoverApplicable: "false",
  //       NamedPACoverDetails: "",
  //       NonElectricalApplicable: "false",
  //       NonElectricalDetails: "",
  //       PAPaidDriverApplicable: "false",
  //       PAPaidDriverDetails: "",
  //       TheftAccessoriesApplicable: "false",
  //       TheftAccessoriesDetails: "",
  //     },
  //     PAOwnerCoverApplicable: "true",
  //     PAOwnerCoverDetails: {
  //       DoNotHoldValidDrvLicense: "false",
  //       ExistingPACover: "false",
  //       Ownmultiplevehicles: "false",
  //       PAOwnerSI: "1500000",
  //       PAOwnerTenure: "3",
  //       ValidDrvLicense: "true",
  //     },
  //     VoluntaryExcessAmount: "0",
  //   },
  //   PolicyEffectiveFromDate: "27-06-2022",
  //   PolicyEffectiveFromHour: "17:18",
  //   PolicyEffectiveToDate: "26-06-2025",
  //   PolicyEffectiveToHour: "23:59",
  //   PolicyTerm: "1",
  //   ProposalDate: "27-06-2022",
  //   QuotationNo: "MIBLPOS3254",
  //   VehicleDetails: {
  //     ChassisNumber: "ASDFFGHJJNHJTS001",
  //     EngineNumber: "ERWEWFWEF",
  //     IDVofVehicle: "757625",
  //     MakeId: "554",
  //     ModelId: "554",
  //     MonthOfManufacture: "06",
  //     RegistrationDate: "27-06-2022",
  //     RegistrationNumber: "NEW",
  //     RegistrationNumber1: "DL",
  //     RegistrationNumber2: "02",
  //     RegistrationNumber3: "AD",
  //     RegistrationNumber4: "1234",
  //     RTOId: "375",
  //     VariantId: "554",
  //     VehicleOwnerShip: "",
  //     YearOfManufacture: "2022",
  //   },
  //   PreviousPolicyDetails: {
  //     previousInsurerCompanyCode: "",
  //     previousPolicyNumber: "",
  //     isVehicleNew: "",
  //     PreviousInsurerapplicable: "",
  //     PreviousPolicyEndDate: "",
  //     PreviousPolicyInsurerName: "",
  //     PreviousPolicyStartDate: "",
  //     previousPolicyType: "",
  //     ClaimOnPreviousPolicy: "",
  //   },
  //   POSPInfo: {
  //     isPOSP: "",
  //     pospName: "",
  //     pospUniqueNumber: "",
  //     pospLocation: "",
  //     pospPanNumber: "",
  //     pospAadhaarNumber: "",
  //     pospContactNumber: "",
  //   },
  //   PartnerId: "58",
  //   ChannelDetails: {
  //     CustomerType: "I",
  //     BusineeChannelType: "BROKER",
  //     BusinessSource: "INTERMEDIARY",
  //     EntityRelationShipCode: "10000001979",
  //     EntityRelationShipName: "ALERT INSURANCE BROKERS PVT\\n\\nLTD",
  //     ChannelNumber: "INTR-4103-37629",
  //     DisplayOfficeCode: "300003",
  //     OfficeCode: "200002",
  //     OfficeName: "MUMBAI-GHATKOPAR",
  //     IntermediaryCode: "BRC0000078",
  //     IntermediaryName: "ALERT INSURANCE BROKERS PVT LTD",
  //     BusinessSourceType: "P_AGENT",
  //     SPCode: "G01483",
  //     SPName: "SENTHIL KUMAR M",
  //   },
  //   ProposerDetails: {
  //     CustomerType: "5",
  //     CustomerName: "Rashmidevi",
  //     ContactNo: "8197521528",
  //     Nationality: "21",
  //     Salutation: "15",
  //     EmailId: "rashmidevi.p@inubesolutions.com",
  //     DOB: "23/12/1997",
  //     Gender: "2",
  //     MaritalStatus: "7",
  //     OccupationCode: "4",
  //     PanNo: "",
  //     AnnualIncome: "",
  //     GSTNumber: "",
  //     Pincode: "400097",
  //     CommunicationAddress: {
  //       AddressLine1: "TEST TEST",
  //       AddressLine2: "",
  //       AddressLine3: "",
  //       CityDistrictId: "415",
  //       StateId: "13",
  //       CountryId: "1",
  //     },
  //     PermanentAddressSameAsCommunication: "",
  //     PermanentAddress: {
  //       AddressLine1: "",
  //       AddressLine2: "",
  //       AddressLine3: "",
  //       CityDistrictId: "",
  //       CountryId: "",
  //       StateId: "",
  //     },
  //     RegistrationAddressSameAsCommunication: "",
  //     RegistrationAddress: {
  //       AddressLine1: "",
  //       AddressLine2: "",
  //       AddressLine3: "",
  //       CityDistrictId: "",
  //       CountryId: "",
  //       StateId: "",
  //     },
  //     RegistrationAddressSameAsPermanent: "",
  //   },
  //   NomineeDetails: [
  //     {
  //       NomineeName: "Suma",
  //       NomineeDOB: "12/10/1993",
  //       NomineeAge: "",
  //       NomineeRelationWithProposer: "13",
  //       PercentageOfShare: "",
  //       GuardianName: "",
  //       GuardianDOB: "",
  //       RelationshoipWithGuardian: "",
  //     },
  //   ],
  // };
  let addonData = [];
  let addOnPremiumData = [];
  let addOnPremiumDataRemoveInr = [];

  // const { VehicleDetails, RTODetails } = Details;
  // console.log(Gender, NomineeRelation, Country, VariantDetailsOutput, RTODetailsOutput, Salutation);

  const { premiumResult } = partnerDetails;
  const { IDV } = premiumResult;
  // const formatter = new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 });
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const [premiumData, setPremiumData] = useState({
    gst: 0,
    premium: 0,
  });
  useEffect(() => {
    if (premiumResult) {
      const sgst = premiumResult.SGST ? Number(premiumResult.SGST.replace("INR", "")) : 0;
      const cgst = premiumResult.CGST ? Number(premiumResult.CGST.replace("INR", "")) : 0;
      const igst = premiumResult.IGST ? Number(premiumResult.IGST.replace("INR", "")) : 0;
      const gst = premiumResult.GST
        ? Number(premiumResult.GST.replace("INR", ""))
        : sgst + cgst + igst;

      const prem = premiumResult.FinalPremium
        ? Number(premiumResult.FinalPremium.replace("INR", ""))
        : 0;
      setPremiumData((prevState) => ({ ...prevState, gst, premium: prem - gst }));
    }
  }, [premiumResult]);

  // console.log("Save Proposal Data", data);

  // const handlekycredirect = () => {

  // };

  const handlekycredirect = async () => {
    const { KYC } = data;
    KYC.isKYCDone = "true";
    KYC.PANNo =
      data.CustomerType === "5" ? data.ProposerDetails.PanNo : data.CorporateDetails.CompanyPancard;
    // KYC.CKYCNo =
    //   data.CustomerType === "5" ? data.ProposerDetails.PanNo : data.CorporateDetails.CompanyPancard;
    KYC.DateOfBirth =
      data.CustomerType === "5" ? data.ProposerDetails.DOB : data.CorporateDetails.DOI;
    setData((prev) => ({ ...prev, KYC }));
    // let age = 0;
    // if (data.CustomerType === "5" && data.NomineeDetails[0].NomineeDOB !== null) {
    //   const dob = datetoShow.nomineeDateofBirth.toLocaleDateString("en-ZA");
    //   age = handleCalculateAge(dob);
    //   console.log("age", age);
    // }
    if (
      // Vehicle details
      data.VehicleDetails.ChassisNumber === "" ||
      flags.chassisFlag === true ||
      data.VehicleDetails.EngineNumber === "" ||
      flags.engineError === true ||
      data.VehicleDetails.RegistrationNumber === "" ||
      //  proposer details
      (data.CustomerType === "5" && data.ProposerDetails.DOB === "") ||
      (data.CustomerType === "5" && flags.Age < 18) ||
      (data.CustomerType === "5" && data.ProposerDetails.PanNo === "") ||
      (data.CustomerType === "5" && flags.panNoFlag === true) ||
      (data.CustomerType === "5" && data.ProposerDetails.CustomerFirstName === "") ||
      (data.CustomerType === "5" && data.ProposerDetails.CustomerLastName === "") ||
      // Corporate details
      (data.CustomerType === "8" && data.CorporateDetails.DOI === "") ||
      (data.CustomerType === "8" && data.CorporateDetails.CompanyPancard === "") ||
      (data.CustomerType === "8" && flags.PanRegex === true) ||
      (data.CustomerType === "8" && data.CorporateDetails.CompanyName === "") ||
      // Nominee Details
      (data.CustomerType === "5" && data.NomineeDetails[0].Title === "") ||
      (data.CustomerType === "5" && data.NomineeDetails[0].NomineeFirstName === "") ||
      (data.CustomerType === "5" && data.NomineeDetails[0].NomineeLastName === "") ||
      (data.CustomerType === "5" && data.NomineeDetails[0].NomineeDOB === "") ||
      (data.CustomerType === "5" && data.NomineeDetails[0].NomineeRelationWithProposer === "") ||
      (data.CustomerType === "5" &&
        data.NomineeDetails[0].NomineeAge < 18 &&
        data.NomineeDetails[0].GuardianName === "")
    ) {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      setFlags((prevState) => ({ ...prevState, errorFlag: false }));
      if (flags.engineError === true) {
        setFlags((prev) => ({ ...prev, engineError: true }));
      } else if (flags.Age < 18 && data.CustomerType === "5") {
        setFlags((prevState) => ({ ...prevState, ageFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, ageFlag: false, engineError: false }));
        handleNext();
      }
    }
  };

  const handleEmailchange = async () => {
    setFlags((prevState) => ({ ...prevState, getotpflag: false, otpValidationFlag: false }));

    // if (otpdata.Email !== "") {
    //   setFlags((prevState) => ({ ...prevState, getotpflag: true, otpValidationFlag: false }));
    // }
    setotpdata((prevState) => ({ ...prevState, otp: "" }));
    const sendOTP = {
      name: `${customerDetails.FirstName + customerDetails.LastName}`,
      otp: "1234",
      email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    setModalEmailOpen(false);
    handleModalOpen();
    await getOTP(sendOTP);
    setFlags((prevState) => ({ ...prevState, otpValidationFlag: true }));
  };
  const handleotpverify = async () => {
    if (otpdata.otp !== "") {
      const verifyOTP = {
        otp: otpdata.otp,
        email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
        mobileNumber: "",
        userName: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      Promise.all([GetOTP(verifyOTP)]).then(async (results) => {
        console.log("OTP Result", results);
        if (results[0] === null) {
          swal({
            icon: "error",
            text: "Please enter the valid OTP sent to your Email",
          });
        } else if (results[0].status === 1) {
          setLoading(true);
          await SaveProposal(partnerDetails.partnerProductId, data).then((result) => {
            console.log("1234567890", result);
            const saveResult = result;
            setProposalDetails(saveResult);
            setModalOpen(false);
            if (result.status === 7) {
              swal({
                icon: "error",
                text:
                  data.PartnerId === "86"
                    ? result.proposalResponse.finalResult.ErrorText
                    : "something went wrong please try after some time",
              }).then(() => {
                setLoading(false);
                navigate("/modules/BrokerPortal/Pages/MotorComparison");
              });
            }
          });
        }
      });
    } else {
      swal({
        icon: "error",
        text: "Please enter the OTP sent to your Email",
      });
    }
  };

  const defaultDetails = {
    ProposerDetails: {
      CustomerType: "5",
      CustomerFirstName: customerDetails.FirstName ? customerDetails.FirstName : "",
      CustomerLastName: customerDetails.LastName ? customerDetails.LastName : "",
      ContactNo: customerDetails.MobileNo,
      Nationality: "21",
      Salutation: "12",
      EmailId: customerDetails.Email,
      DOB: "",
      Gender: "",
      MaritalStatus: "",
      OccupationCode: "",
      PanNo: "",
      AnnualIncome: "",
      GSTNumber: "",
      Pincode: "",
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrictId: "",
        CityId: "",
        StateId: "",
        CountryId: "1",
        Pincode: "",
      },
      PermanentAddressSameAsCommunication: "No",
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityId: "",
        CityDistrictId: "",
        CountryId: "1",
        StateId: "",
        Pincode: "",
      },
      RegistrationAddressSameAsCommunication: "",
      RegistrationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityId: "",
        CityDistrictId: "",
        CountryId: "1",
        StateId: "",
        Pincode: "",
      },
      RegistrationAddressSameAsPermanent: "",
    },
    NomineeDetails: [
      {
        NomineeFirstName: "",
        NomineeLastName: "",
        NomineeDOB: "",
        NomineeAge: "",
        NomineeRelationWithProposer: "",
        PercentageOfShare: "",
        GuardianName: "",
        GuardianDOB: "",
        RelationshoipWithGuardian: "",
        Title: "",
      },
    ],
  };

  // const [disablePayment, setDisablePayment] = useState(true);
  const [disableKYC, setdisableKYC] = useState(true);
  useEffect(() => {
    if (
      data &&
      (data.BusinessType === "4" || data.BusinessType === "New Business") &&
      data.VehicleType == "16" &&
      termsnCond.acceptTnC &&
      termsnCond.kyc
    ) {
      setdisableKYC(false);
    } else if (
      data &&
      (data.BusinessType === "6" || data.BusinessType === "Roll Over") &&
      data.VehicleType == "16" &&
      termsnCond.acceptTnC &&
      termsnCond.ncb &&
      termsnCond.kyc
    ) {
      setdisableKYC(false);
    } else if (
      data &&
      (data.BusinessType === "4" || data.BusinessType === "New Business") &&
      data.VehicleType == "17" &&
      termsnCond.bike &&
      termsnCond.acceptTnC &&
      termsnCond.kyc
    ) {
      setdisableKYC(false);
    } else if (
      data &&
      (data.BusinessType === "6" || data.BusinessType === "Roll Over") &&
      data.VehicleType == "17" &&
      termsnCond.bike &&
      termsnCond.acceptTnC &&
      termsnCond.ncb &&
      termsnCond.kyc
    ) {
      setdisableKYC(false);
    } else if (
      data &&
      (data.BusinessType === "4" || data.BusinessType === "New Business") &&
      data.VehicleType == "193" &&
      termsnCond.bike &&
      termsnCond.acceptTnC &&
      termsnCond.kyc
    ) {
      setdisableKYC(false);
    } else if (
      data &&
      (data.BusinessType === "6" || data.BusinessType === "Roll Over") &&
      data.VehicleType == "193" &&
      termsnCond.acceptTnC &&
      termsnCond.ncb &&
      termsnCond.kyc
    ) {
      setdisableKYC(false);
    } else if (
      data &&
      (data.BusinessType === "4" || data.BusinessType === "New Business") &&
      data.VehicleType == "194" &&
      termsnCond.bike &&
      termsnCond.acceptTnC &&
      termsnCond.kyc
    ) {
      setdisableKYC(false);
    } else if (
      data &&
      (data.BusinessType === "6" || data.BusinessType === "Roll Over") &&
      data.VehicleType == "194" &&
      termsnCond.acceptTnC &&
      termsnCond.ncb &&
      termsnCond.kyc
    ) {
      setdisableKYC(false);
    } else setdisableKYC(true);
  }, [termsnCond.acceptTnC, termsnCond.ncb, termsnCond.bike, termsnCond.kyc]);

  useEffect(() => {
    if (!isCustomer) {
      setdisableKYC(!termsnCond.kyc);
    }
  }, [termsnCond.kyc]);

  const [addressCity, setAddressCity] = useState({
    PermanentAddress: {
      city: "",
      state: "",
    },
    CommunicationAddress: {
      city: "",
      state: "",
    },
  });
  const handleVehicleChange = (event) => {
    const { id, value } = event.target;
    if (event.target.name === "ChassisNumber") {
      // const ChassisReg = /^[a-zA-Z0-9]+$/;
      // if (ChassisReg.test(event.target.value) || event.target.value === "") {
      const newValue = {
        ...data,
        VehicleDetails: { ...data.VehicleDetails, [id]: value.toUpperCase() },
      };
      setData(newValue);
      // }
    } else if (event.target.name === "EngineNumber") {
      const EngineReg = /^[a-zA-Z0-9]+$/;
      if (EngineReg.test(event.target.value) || event.target.value === "") {
        const newValue = {
          ...data,
          VehicleDetails: { ...data.VehicleDetails, [id]: value.toUpperCase() },
        };
        setData(newValue);
      }
    } else if (event.target.name === "RegistrationNumber") {
      const regsReg = /^[a-zA-Z0-9-]+$/;
      if (regsReg.test(event.target.value) || event.target.value === "") {
        const newValue = {
          ...data,
          VehicleDetails: { ...data.VehicleDetails, [id]: value.toUpperCase() },
        };
        setData(newValue);
      }
    } else {
      const newValue = { ...data, VehicleDetails: { ...data.VehicleDetails, [id]: value } };
      setData(newValue);
    }

    // console.log("You have changed", event.target.id, event.target.value);
  };
  // console.log("data1", data);
  // const handleProposerDropDownChange = (event, values) => {
  //   setMasters((prevState) => ({ ...prevState, Relationship: values }));
  //   if (values.mValue !== "") {
  //     const newValue = {
  //       ...data,
  //       ProposerDetails: { ...data.ProposerDetails, [event.target.id.split("-")[0]]: values.mID },
  //     };
  //     setData(newValue);
  //   }
  // };

  const handleProposerGenderDropdown = (event, values) => {
    setMasters((prevState) => ({ ...prevState, Gender: values }));
    if (values.mValue !== "") {
      const newValue = {
        ...data,
        ProposerDetails: { ...data.ProposerDetails, [event.target.id.split("-")[0]]: values.mID },
      };
      setData(newValue);
    }
  };

  const handleHypothecationDropdown = (event, values) => {
    setMasters((prevState) => ({ ...prevState, Hypothecation: values }));
    if (values.mValue !== "") {
      const { FinancierDetails } = data.CoverDetails;
      FinancierDetails.FinancierCode = values.mID;
      FinancierDetails.FinancierName = values.mValue;

      setData((prevState) => ({ ...prevState, FinancierDetails }));
    }
  };
  useEffect(() => {
    const dataD = data;
    const abcd = dataD.CustomerType;
    if (data.CustomerType !== "") {
      dataD.ProposerDetails.CustomerType = abcd;
    }
    // if (abcd === "8") {
    //   dataD.ProposerDetails.EmailId = dataD.CorporateDetails.email;
    //   dataD.CustomerDetails.email = dataD.CorporateDetails.email;
    // }
  }, [data.CustomerType]);

  const handleProposerSalutationDropdown = (event, values, name) => {
    if (name === "Sal") {
      setMasters((prevState) => ({ ...prevState, Salutation: values }));
      if (values.mValue !== "") {
        const newValue = {
          ...data,
          ProposerDetails: { ...data.ProposerDetails, [event.target.id.split("-")[0]]: values.mID },
        };
        setData(newValue);
      }
    } else {
      setMasters((prevState) => ({ ...prevState, NomineeSalutation: values }));
      if (values.mValue !== "") {
        const Nominee = { ...data.NomineeDetails[0] };
        Nominee[event.target.id.split("-")[0]] = values.mID;
        setData((prevState) => ({ ...prevState, NomineeDetails: [{ ...Nominee }] }));
      }
    }
  };
  const handleProposerMaritalDropDownChange = (event, values) => {
    setMasters((prevState) => ({ ...prevState, MaritalStatus: values }));
    if (values.mValue !== "") {
      const newValue = {
        ...data,
        ProposerDetails: { ...data.ProposerDetails, [event.target.id.split("-")[0]]: values.mID },
      };
      setData(newValue);
    }
  };
  const handleProposerOccupationDropDownChange = (event, values) => {
    setMasters((prevState) => ({ ...prevState, Occupation: values }));
    if (values.mValue !== "") {
      const newValue = {
        ...data,
        ProposerDetails: { ...data.ProposerDetails, [event.target.id.split("-")[0]]: values.mID },
      };
      setData(newValue);
    }
  };
  const handleProposerChange = (event) => {
    const { id, value } = event.target;
    if (event.target.name === "FirstName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
          setData(newValue);
        }
      }
    } else if (event.target.name === "LastName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
          setData(newValue);
        }
      }
    } else if (event.target.name === "FinancierAddress") {
      if (event.target.value.length < 50) {
        const { FinancierDetails } = data.CoverDetails;
        FinancierDetails.FinancierAddress = event.target.value;
        setData((prevState) => ({ ...prevState, FinancierDetails }));
      }
    } else if (event.target.name === "LoanAccountNumber") {
      if (event.target.value.length < 50) {
        const { FinancierDetails } = data.CoverDetails;
        FinancierDetails.LoanAccountNumber = event.target.value;
        setData((prevState) => ({ ...prevState, FinancierDetails }));
      }
    } else if (event.target.name === "NomineeFirstName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const Nominee = { ...data.NomineeDetails[0] };
          Nominee[event.target.name] = event.target.value;
          setData((prevState) => ({ ...prevState, NomineeDetails: [{ ...Nominee }] }));
        }
      }
    } else if (event.target.name === "NomineeLastName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const Nominee = { ...data.NomineeDetails[0] };
          Nominee[event.target.name] = event.target.value;
          setData((prevState) => ({ ...prevState, NomineeDetails: [{ ...Nominee }] }));
        }
      }
    } else if (event.target.name === "ContactNo") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(event.target.value)) {
        const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
        setData(newValue);
      }
    } else if (event.target.name === "Pincode") {
      const pincodeRegex = /^[0-9]*$/;
      if (pincodeRegex.test(event.target.value)) {
        const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
        setData(newValue);
      }
    } else {
      const newValue = { ...data, ProposerDetails: { ...data.ProposerDetails, [id]: value } };
      setData(newValue);
    }
  };

  if (premiumResult.CoverPremium) {
    addonData = premiumResult.CoverPremium.map((cover) =>
      cover.CoverType === "Add-On Covers" &&
      cover.CoverPremium > "0" &&
      userSelection.AddOns.some((y) => y.mValue === cover.CoverName) &&
      cover.CoverName
        ? cover.CoverName
        : null
    );
    addOnPremiumData = premiumResult.CoverPremium.map((cover) =>
      cover.CoverType === "Add-On Covers" &&
      cover.CoverPremium > "0" &&
      userSelection.AddOns.some((y) => y.mValue === cover.CoverName) &&
      cover.CoverPremium
        ? cover.CoverPremium
        : null
    );

    addOnPremiumDataRemoveInr = addOnPremiumData.map((item) => {
      if (item !== null) {
        const premium = item.replace("INR", "");
        const removeINR = premium.indexOf("") >= 0 ? premium.trim("") : premium;
        return removeINR;
      }
      return null;
    });
    // console.log("addonData", addOnPremiumData, addOnPremiumDataRemoveInr);
  }
  const handleValidate = (e) => {
    if (e.target.name === "PanNo") {
      const PanReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
      if (!PanReg.test(e.target.value)) {
        const newValue = {
          ...data,
          ProposerDetails: { ...data.ProposerDetails, [e.target.name]: "" },
        };
        setFlags((prevState) => ({ ...prevState, panNoFlag: true }));
        setData(newValue);
      } else {
        setFlags((prevState) => ({ ...prevState, panNoFlag: false }));
      }
    } else if (e.target.name === "ContactNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        const newValue = {
          ...data,
          ProposerDetails: { ...data.ProposerDetails, [e.target.name]: "" },
        };

        setData(newValue);
      }
    } else if (e.target.name === "RegistrationNumber") {
      if (data.BusinessType === "4" || data.BusinessType === "New Business") {
        if (data.PartnerId === "62") {
          const NumberRegex = /^[A-Z|a-z]{2}[0-9]{2}$/;
          if (!NumberRegex.test(e.target.value)) {
            const newValue = {
              ...data,
              VehicleDetails: { ...data.VehicleDetails, [e.target.name]: "" },
            };
            setData(newValue);
          }
        } else {
          const NumberRegex = /^[A-Z|a-z]{3}$/;
          if (!NumberRegex.test(e.target.value)) {
            const newValue = {
              ...data,
              VehicleDetails: { ...data.VehicleDetails, [e.target.name]: "" },
            };
            setData(newValue);
          }
        }
      } else if (data.BusinessType === "6" || data.BusinessType === "Roll Over") {
        const NumberRegex = /^[A-Z|a-z]{2}(|-)[0-9]{2}(|-)[A-Z|a-z]{1,2}(|-)[0-9]{4}$/;
        if (!NumberRegex.test(e.target.value)) {
          const newValue = {
            ...data,
            VehicleDetails: { ...data.VehicleDetails, [e.target.name]: "" },
          };
          setData(newValue);
        }
      }
    } else if (e.target.name === "Pincode") {
      const pincodeRegex = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
      if (!pincodeRegex.test(e.target.value)) {
        // const newValue = {
        //   ...data,
        //   ProposerDetails: { ...data.ProposerDetails, [e.target.name]: "" },
        // };
        setFlags((prevState) => ({ ...prevState, pincode: true }));
        // setData(newValue);
      } else {
        setFlags((prevState) => ({ ...prevState, pincode: false }));
      }
    } else if (e.target.name === "EmailId") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(e.target.value)) {
        const newValue = {
          ...data,
          ProposerDetails: { ...data.ProposerDetails, [e.target.name]: "" },
        };

        setData(newValue);
      }
      // }
      // else if (e.target.name === "AddressLine1") {
      //   const AddRegx = /^[ A-Za-z0-9_@#()./, -]*$/;
      //   if (!AddRegx.test(e.target.value)) {
      //     const newValue = {
      //       ...data,
      //       ProposerDetails: { ...data.ProposerDetails, [e.target.name]: "" },
      //     };
      //     setFlags((prevState) => ({ ...prevState, AddressLine1: true }));
      //     setData(newValue);
      //   } else {
      //     setFlags((prevState) => ({ ...prevState, AddressLine1: false }));
      //   }
    } else if (e.target.name === "ChassisNumber") {
      if (e.target.value.split("").length < 17 || e.target.value.split("").length > 25) {
        setFlags((prevState) => ({ ...prevState, chassisFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, chassisFlag: false }));
      }
    } else if (e.target.name === "EngineNumber") {
      if (e.target.value.length < 8) {
        setFlags((prevState) => ({ ...prevState, engineError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, engineError: false }));
      }
    }
  };

  const handleCommunicationValidate = (e) => {
    if (e.target.name === "Pincode") {
      const pincodeRegex = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
      if (!pincodeRegex.test(e.target.value)) {
        // const newValue = {
        //   ...data,
        //   ProposerDetails: { ...data.ProposerDetails, [e.target.name]: "" },
        // };
        setFlags((prevState) => ({ ...prevState, pincodecommunication: true }));
        // setData(newValue);
      } else {
        setFlags((prevState) => ({ ...prevState, pincodecommunication: false }));
      }
    }
  };

  const buildForm = ({ action, params }) => {
    console.log("buildForm", action, params);
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      // console.log("element", key, params[key]);
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", params[key]);
      form.appendChild(input);
    });
    // console.log("PaymentForm", form);
    return form;
  };

  const post = (details) => {
    // console.log("PaymentFormDataPost", details);
    const formdata = {
      action: details.PaymentURL,
      params: details.InputJson,
    };
    const form = buildForm(formdata);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  const handleNomineeChange = (e) => {
    const nameReg = /^[a-zA-Z\s]+$/;
    if (nameReg.test(e.target.value) || e.target.value === "") {
      const Nominee = { ...data.NomineeDetails[0] };
      Nominee[e.target.name] = e.target.value;
      setData((prevState) => ({ ...prevState, NomineeDetails: [{ ...Nominee }] }));
    }
  };

  // console.log("Proposal data", data);
  useEffect(() => {
    if (quoteProposalOutput) {
      quoteProposalOutput.finalResult.VehicleDetails.ChassisNumber = "";
      quoteProposalOutput.finalResult.VehicleDetails.EngineNumber = "";
      // if (
      //   quoteProposalOutput.finalResult.PartnerId === "77" &&
      //   quoteProposalOutput.finalResult.BusinessType === "Roll Over"
      // ) {
      //   const fromDate = quoteProposalOutput.finalResult.PolicyEffectiveFromDate.split("-");
      //   const toDate = quoteProposalOutput.finalResult.PolicyEffectiveToDate.split("-");
      //   const ChangedFromDate = new Date(fromDate[2], fromDate[1], fromDate[0]);
      //   const Fromdate = `${
      //     ChangedFromDate.getDate() + 1
      //   }-${ChangedFromDate.getMonth()}-${ChangedFromDate.getFullYear()}`;
      //   quoteProposalOutput.finalResult.PolicyEffectiveFromDate = Fromdate;

      //   const ChangedToDate = new Date(toDate[2], toDate[1], toDate[0]);
      //   const ToDate = `${
      //     ChangedToDate.getDate() + 1
      //   }-${ChangedToDate.getMonth()}-${ChangedToDate.getFullYear()}`;
      //   quoteProposalOutput.finalResult.PolicyEffectiveToDate = ToDate;
      //   // const ChangedToDate = new Date(toDate[2] + 1, toDate[1], toDate[0]);
      // }
      if (
        quoteProposalOutput.finalResult.BusinessType === "Roll Over" ||
        quoteProposalOutput.finalResult.BusinessType === "6"
      ) {
        quoteProposalOutput.finalResult.VehicleDetails.RegistrationNumber = "";
      }
      setData({ ...data, ...quoteProposalOutput.finalResult, ...defaultDetails });
    }
  }, [quoteProposalOutput]);

  useEffect(() => {
    if (proposalDetails) {
      GetPaymentURL(
        partnerDetails.partnerProductId,
        proposalDetails.proposalNumber,
        setPaymentData
      );
    }
  }, [proposalDetails]);

  useEffect(() => {
    // console.log("PaymentFormData", "outside");
    if (paymentData) {
      // console.log("PaymentFormData", paymentData.OutputResult);
      if (eConsent && !isCustomer) {
        // const notificationReq = {
        //   notificationRequests: [
        //     {
        //       templateKey: "POSP_Consent",
        //       sendEmail: false,
        //       isEmailBody: true,
        //       notificationPayload: JSON.stringify({
        //         CustomerFirstName: data.ProposerDetails.CustomerFirstName,
        //         CustomerLastName: data.ProposerDetails.CustomerLastName,
        //         ProposalNumber: proposalDetails.proposalNumber,
        //         BrokerName: process.env.REACT_APP_TITLE,
        //         ContactNo: process.env.REACT_APP_CONTACTNO,
        //         Email: process.env.REACT_APP_EMAIL,
        //         Image: process.env.REACT_APP_IMAGEURL,
        //         VehicelType: localStorage.getItem("vehicleType"),
        //       }),
        //     },
        //   ],
        //   Attachments: [
        //     {
        //       FileName: "",
        //       FileExtension: ".pdf",
        //       FileData: "",
        //       ContentType: "",
        //     },
        //   ],
        //   sendEmail: true,
        //   subject: `Your Car Comprehensive Insurance Policy for ${VariantDetailsOutput[0].MAKE} ${VariantDetailsOutput[0].MODEL} - ${data.VehicleDetails.RegistrationNumber}`,
        //   toEmail: data.ProposerDetails.EmailId,
        // };
        // postRequest("Notifications/SendMultipleTemplateNotificationAsync", notificationReq);

        const notificationRequests = {
          proposalNo: "",
          policyNo: "quoteNumber",
          transactionId: "",
          customerId: "",
          key: quoteProposalOutput.finalResult.BaseQuotationNo,
          keyType: "",
          communicationId: 120,
          referenceId: quoteProposalOutput.finalResult.PartnerId,
          ICPDF: true,
          ISDMS: false,
        };
        postRequest(
          `Policy/SendNotification?PolicyNumber=${""}&EmailId=${data.ProposerDetails.EmailId}`,
          notificationRequests
        ).then((result) => {
          console.log("result1", result);
        });
        setOpen(true);
      } else if (paymentData.OutputResult.InputJson) {
        post(paymentData.OutputResult);
      } else {
        const paymentURL = paymentData.OutputResult.PaymentURL;
        window.location.href = paymentURL;
      }

      // const params = {
      //   "InputJson": {
      //     "ProposalAmount": "60241",
      //     "ProposalNo": "R23072200025",
      //     "UserID": "100002",
      //     "PaymentType": "1",
      //     "Responseurl": "http2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/Policy/GetPaymentRedirection?PaymentRefNo=0599/0599/0018/00/000"
      //   },
      //   "ProposalNumber": "R23072200025",
      //   "PaymentURL": "https://rgipartners.reliancegeneral.co.in/PaymentIntegration/PaymentIntegration"
      // }
      // console.log("PaymentFormData", "inside");
      // post(params);
    }
  }, [paymentData]);

  useEffect(() => {
    setCoveredData(null);
    CoveredNotCoveredData(setCoveredData, partnerDetails.partnerProductCode, "Whats Covered");
  }, [partnerDetails]);

  useEffect(() => {
    if (coveredData) {
      const newValue = coveredData.map((cover) => cover.name);
      setPlanData(newValue);
    }
  }, [coveredData]);

  useEffect(() => {
    setArgs({
      productId: 449,
      partnerId: data.PartnerId,
      masterType: null,
      jsonValue: null,
    });
  }, [data]);

  const handlePermanentAddSameComm = (e) => {
    setData((prevState) => ({
      ...prevState,
      ProposerDetails: {
        ...prevState.ProposerDetails,
        PermanentAddressSameAsCommunication: e.target.value,
      },
    }));
  };
  const handlehypothecationradio = (e) => {
    if (e.target.value === "1") {
      const { FinancierDetails } = data.CoverDetails;
      FinancierDetails.AgreementType = "Hypothecation";
      setData((prevState) => ({ ...prevState, FinancierDetails }));
    }
    setData((prevState) => ({
      ...prevState,
      CoverDetails: {
        ...prevState.CoverDetails,
        FinancierDetailsApplicable: e.target.value,
      },
    }));
  };
  // console.log("ssr", data);
  const handleCorporateChange = (event) => {
    const DataD = data;
    if (event.target.name === "GSTInNumber") {
      DataD.CorporateDetails.GSTInNumber = event.target.value;
    }
    if (event.target.name === "CIN") {
      DataD.CorporateDetails.CIN = event.target.value;
    }
    if (event.target.name === "CompanyPancard") {
      // const PanReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
      // if (!PanReg.test(event.target.value)) {
      //   const newValue = {
      //     ...data,
      //     CorporateDetails: { ...data.CorporateDetails, [event.target.name]: "" },
      //   };
      //   setFlags((prevState) => ({ ...prevState, panNoFlag: true }));
      //   setData(newValue);
      // } else {
      //   setFlags((prevState) => ({ ...prevState, panNoFlag: false }));
      DataD.CorporateDetails.CompanyPancard = event.target.value;
      DataD.KYC.PANNo = event.target.value;
      // }
    }
    // setData((prevState) => ({ ...prevState, ...CorporateDetails.GSTInNumber }));
    setData((prevState) => ({
      ...prevState,
      ...DataD,
    }));
  };
  const handleCommunication = (e) => {
    if (e.target.name === "Pincode") {
      const pincodeRegex = /^[0-9]*$/;
      if (pincodeRegex.test(e.target.value)) {
        setData((prevState) => ({
          ...prevState,
          ProposerDetails: {
            ...prevState.ProposerDetails,
            CommunicationAddress: {
              ...prevState.ProposerDetails.CommunicationAddress,
              [e.target.name]: e.target.value,
            },
          },
        }));
      }
    } else {
      setData((prevState) => ({
        ...prevState,
        ProposerDetails: {
          ...prevState.ProposerDetails,
          CommunicationAddress: {
            ...prevState.ProposerDetails.CommunicationAddress,
            [e.target.name]: e.target.value,
          },
        },
      }));
    }
  };

  const handlePermChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      ProposerDetails: {
        ...prevState.ProposerDetails,
        PermanentAddress: {
          ...prevState.ProposerDetails.PermanentAddress,
          [e.target.name]: e.target.value,
        },
      },
    }));
    setData((prevState) => ({
      ...prevState,
      ProposerDetails: {
        ...prevState.ProposerDetails,
        RegistrationAddress: {
          ...prevState.ProposerDetails.RegistrationAddress,
          [e.target.name]: e.target.value,
        },
      },
    }));
  };

  useEffect(() => {
    if (data.ProposerDetails.PermanentAddressSameAsCommunication === "Yes") {
      setData((prevState) => ({
        ...prevState,
        ProposerDetails: {
          ...prevState.ProposerDetails,
          CommunicationAddress: {
            ...prevState.ProposerDetails.PermanentAddress,
            Pincode: data.ProposerDetails.Pincode,
          },
        },
      }));
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: {
          state: prevState.PermanentAddress.state,
          city: prevState.PermanentAddress.city,
        },
      }));
    } else if (data.ProposerDetails.PermanentAddressSameAsCommunication === "No") {
      const CommunicationAddress = { ...data.ProposerDetails.CommunicationAddress };
      CommunicationAddress.AddressLine1 = "";
      CommunicationAddress.AddressLine2 = "";
      CommunicationAddress.AddressLine3 = "";
      CommunicationAddress.CityDistrictId = "";
      CommunicationAddress.StateId = "";
      CommunicationAddress.Pincode = "";

      setData((prevState) => ({
        ...prevState,
        ProposerDetails: {
          ...prevState.ProposerDetails,
          CommunicationAddress: { ...CommunicationAddress },
        },
      }));
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: { state: "", city: "" },
      }));
    }
  }, [data.ProposerDetails.PermanentAddressSameAsCommunication]);

  const getPincodeDetails = async (pincodeValue) => {
    const getPincodeDistrictStateData = async (type, id) => {
      const urlString = `Product/GetProdPartnermasterData?ProductId=${args.productId}&PartnerId=${args.partnerId}&MasterType=${type}`;
      let payload;
      switch (type) {
        case "State":
          payload = { State_Id: id };
          break;
        case "CityDistrict":
          payload = { City_Id: id };
          break;
        case "DetailsPincode":
          payload = { Pincode: id };
          break;
        default:
          break;
      }

      const dataValue = await (await postRequest(urlString, payload)).data;
      return dataValue;
    };

    const pincodeData = await getPincodeDistrictStateData("DetailsPincode", pincodeValue);

    const district = await getPincodeDistrictStateData("CityDistrict", pincodeData[0].CityId);

    const state = await getPincodeDistrictStateData("State", district[0].StateId);

    return { pinCode: pincodeData, district, state };
  };

  useEffect(async () => {
    if (data.ProposerDetails.Pincode.length === 6) {
      const { district, state } = await getPincodeDetails(data.ProposerDetails.Pincode);
      const newPermanentAddress = { Pincode: data.ProposerDetails.Pincode };
      setAddressCity((prevState) => ({
        ...prevState,
        PermanentAddress: { state: state[0].mValue, city: district[0].mValue },
      }));
      setData((prevState) => {
        const { PermanentAddress } = prevState.ProposerDetails;
        const newValue = {
          ...PermanentAddress,
          StateId: state[0].mID,
          CityDistrictId: district[0].mID,
          CityId: district[0].CityId ? district[0].CityId : district[0].mID,
        };
        return {
          ...prevState,
          ProposerDetails: {
            ...prevState.ProposerDetails,
            PermanentAddress: { ...newValue, ...newPermanentAddress },
            RegistrationAddress: { ...newValue, ...newPermanentAddress },
          },
        };
      });
    }
  }, [data.ProposerDetails.Pincode]);

  useEffect(async () => {
    if (
      data.ProposerDetails.CommunicationAddress.Pincode.length === 6 &&
      data.ProposerDetails.PermanentAddressSameAsCommunication === "No"
    ) {
      const { district, state } = await getPincodeDetails(
        data.ProposerDetails.CommunicationAddress.Pincode
      );
      const CommunicationAddress = { ...data.ProposerDetails.CommunicationAddress };
      CommunicationAddress.StateId = state[0].mID;
      CommunicationAddress.CityDistrictId = district[0].mID;
      CommunicationAddress.CityId = district[0].CityId ? district[0].CityId : district[0].mID;

      setData((prevState) => ({
        ...prevState,
        ProposerDetails: {
          ...prevState.ProposerDetails,
          CommunicationAddress: { ...CommunicationAddress },
        },
      }));
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: { state: state[0].mValue, city: district[0].mValue },
      }));
    }
  }, [data.ProposerDetails.CommunicationAddress.Pincode]);

  const handleNomineeDropdown = (e, value) => {
    setMasters((prevState) => ({ ...prevState, NomineeRelation: value }));
    if (value.mValue !== "") {
      const Nominee = { ...data.NomineeDetails[0] };
      Nominee[e.target.id.split("-")[0]] = value.mID;
      setData((prevState) => ({ ...prevState, NomineeDetails: [{ ...Nominee }] }));
    }
  };

  // const handlePermAddressDropdown = (e, value) => {
  //   const address = { ...data.ProposerDetails.PermanentAddress };
  //   address[e.target.id.split("-")[0]] = value.mID;
  //   setData((prevState) => ({
  //     ...prevState,
  //     ProposerDetails: { ...prevState.ProposerDetails, PermanentAddress: { ...address } },
  //   }));
  // };

  // const handleCommAddressDropdown = (e, value) => {
  //   const address = { ...data.ProposerDetails.CommunicationAddress };
  //   address[e.target.id.split("-")[0]] = value.mID;
  //   setData((prevState) => ({
  //     ...prevState,
  //     ProposerDetails: { ...prevState.ProposerDetails, CommunicationAddress: { ...address } },
  //   }));
  // };

  // const formatPropDate = (date) => {
  //   const propformat = (val) => (val > 9 ? val : `0${val}`);
  //   const propdate = new Date(date);
  //   return `${propformat(propdate.getDate())}-${propformat(
  //     propdate.getMonth() + 1
  //   )}-${propdate.getFullYear()}`;
  // };

  // const formatNomineeDate = (date) => {
  //   const nomineeformat = (val) => (val > 9 ? val : `0${val}`);
  //   const nomineedate = new Date(date);
  //   return `${nomineeformat(nomineedate.getDate())}-${nomineeformat(
  //     nomineedate.getMonth() + 1
  //   )}-${nomineedate.getFullYear()}`;
  // };

  // const propdateFormat = (propDate) => {
  //   const propdateArr = propDate.split("-");
  //   return new Date(propdateArr[2], propdateArr[1] - 1, propdateArr[0]);
  // };

  // const nomineedateFormat = (nomineeDate) => {
  //   const dateArr = nomineeDate.split("-");
  //   return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  // };
  // const handleRegDateChange = (value, label, type) => {
  //   const date = new Date(value).getFullYear();
  //   const dateString = date.toString().length;
  //   if (value !== null && isValid(new Date(value)) && dateString === 4) {
  //     setValidDate(false);
  //     setDate((prevState) => ({ ...prevState, [label]: value }));
  //     setData((prevState) => ({
  //       ...prevState,
  //       VehicleDetails: { ...prevState.VehicleDetails, [type]: formatPropDate(value) },
  //     }));
  //   } else {
  //     setValidDate(true);
  //     setDate((prevState) => ({ ...prevState, [label]: null }));
  //   }
  // };

  // const handleDateIncorporationChange = (value, label, type, value1) => {
  //   // debugger;
  //   console.log("value1", value1);
  //   console.log("valueee", value);
  //   const date = new Date(value).getFullYear();
  //   const dateString = date.toString().length;
  //   if (value !== null && isValid(new Date(value)) && dateString === 4) {
  //     setDate((prevState) => ({ ...prevState, [label]: value }));
  //     setData((prevState) => ({
  //       ...prevState,
  //       CorporateDetails: { ...prevState.CorporateDetails, [type]: formatPropDate(value) },
  //     }));
  //   }

  //   setDate((prevState) => ({ ...prevState, [label]: null }));
  //   // } .padStart(2, "0")
  // };
  const handleDateIncorporationChange = (value, label, type, value1) => {
    // debugger;
    // console.log("value1", value1);
    // console.log("valueee", value);
    const date = new Date(value);

    if (value !== null && isValid(date)) {
      // const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

      setDate((prevState) => ({ ...prevState, [label]: value1 }));
      setData((prevState) => ({
        ...prevState,
        KYC: { ...prevState.KYC, DateOfBirth: value1 },
        CorporateDetails: { ...prevState.CorporateDetails, [type]: value1 },
      }));
    } else {
      setDate((prevState) => ({
        ...prevState,
        [label]: null,
      }));
    }
  };
  const handleDateChange = (value, label, type, v) => {
    // debugger;
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      // setValidDate(false);
      setDate((prevState) => ({ ...prevState, [label]: v }));
      setData((prevState) => ({
        ...prevState,
        ProposerDetails: { ...prevState.ProposerDetails, [type]: v },
      }));
      // const dob = value.toLocaleDateString("en-ZA");
      const age = handleCalculateAge(value);
      if (age < 18) {
        swal({
          icon: "error",
          text: "Please enter valid Date of birth",
        });
      }
      setFlags((prevState) => ({ ...prevState, Age: age }));
    } else {
      // setValidDate(true);
      setDate((prevState) => ({ ...prevState, [label]: "" }));
    }
  };

  const handleNomineeDateChange = (value, label, type, v) => {
    // const date = new Date(value).getFullYear();
    // const dateString = date.toString().length;
    // setValidDate(false);
    setDate((prevState) => ({ ...prevState, [label]: v }));

    // const dob = value.toLocaleDateString("en-ZA");
    const age = handleCalculateAge(value);
    setData((prevState) => ({
      ...prevState,
      NomineeDetails: [{ ...prevState.NomineeDetails[0], [type]: v, NomineeAge: age }],
    }));
    // console.log(age, "444");
    if (age < 18) {
      setFlags((prevState) => ({ ...prevState, nomineeage: age, GuardianFlag: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, nomineeage: age, GuardianFlag: false }));
    }
  };
  const [NCBCertificate, setNCBCertificate] = useState();

  const uploadFiles = async (files) => {
    const formData = new FormData();

    formData.append("file", files, files.name);

    await UploadFiles(formData).then((result) => {
      console.log("result", result);

      if (result.data[0].fileName !== "") {
        setNCBCertificate(files);
      }
    });
  };

  const handleFileUpload = async (event) => {
    await uploadFiles(event.target.files[0]);

    console.log("files", event.target.files[0]);
  };
  const handleCustomerTerm = () => {
    window.open(process.env.REACT_APP_CustomerTerm, "_blank");
  };
  const handleRadioNo = () => {
    flags.disableFlag = false;
  };
  const handleRadioYes = () => {
    flags.disableFlag = true;
  };

  const handleGSTNumber = (event) => {
    if (event.target.name === "GSTInNumber") {
      // const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
      // /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      const gstRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(event.target.value))
        setFlags((prevState) => ({ ...prevState, gstRegex: true }));
      else {
        setFlags((prevState) => ({ ...prevState, gstRegex: false }));
      }
    }
  };

  const handleCINNumber = (event) => {
    if (event.target.name === "CIN") {
      // if (event.target.value.length == 21) {
      const cinRegex = /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
      if (!cinRegex.test(event.target.value))
        setFlags((prevState) => ({ ...prevState, cinRegex: true }));
      else {
        setFlags((prevState) => ({ ...prevState, cinRegex: false }));
      }
    }
  };
  // console.log("allFlgs", flags);

  const handlePanNumber = (event) => {
    if (event.target.name === "CompanyPancard") {
      // if (event.target.value.length == 21) {
      const PanRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
      if (!PanRegex.test(event.target.value))
        setFlags((prevState) => ({ ...prevState, PanRegex: true }));
      else {
        setFlags((prevState) => ({ ...prevState, PanRegex: false }));
      }
    }
  };
  return (
    <MDBox>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Modal
            open={modalOpen}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <OTPModel
              handleOTP={handleOTP}
              otpdata={otpdata}
              handleModalClose={handleModalClose}
              customerDetails={customerDetails}
              handleotpverify={handleotpverify}
              handleModalEmailOpen={handleModalEmailOpen}
              handleEmailchange={handleEmailchange}
              flags={flags}
            />
          </Modal>
          <Modal
            open={modalEmailOpen}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ChangeEmailModel
              handleEmail={handleEmail}
              otpdata={otpdata}
              handleModalEmailClose={handleModalEmailClose}
              handleEmailchange={handleEmailchange}
              // handleotpverify={handleotpverify}
            />
          </Modal>

          <Grid container spacing={1} justifyContent="center" alignItems="start" height="100%">
            <Modal open={open} onClose={handleClose}>
              <EConsent
                handleClose={handleClose}
                customerDetails={customerDetails}
                partnerDetails={partnerDetails}
              />
            </Modal>
            <Modal open={plan} onClose={handlePlanClose}>
              <FeatureList1
                handleClose={handlePlanClose}
                data={planData}
                title="Plan Feature List"
              />
            </Modal>
            <Modal open={addon} onClose={handleAddonClose}>
              <FeatureList
                handleClose={handleAddonClose}
                data={addonData}
                title="Add-on Covers"
                addOnPremiumData={addOnPremiumDataRemoveInr}
              />
            </Modal>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              {/* <Link
          to={{
            pathname: "/modules/BrokerPortal/Pages/BPLanding",
            query: "blah",
            search: `?backUrl=${JSON.stringify(propState)}`,
            params: {
              fromNotifications: true,
            },
          }}
        >
          Hello
        </Link> */}
              <Grid container justifyContent="space-between">
                <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
                  Proposal
                </MDTypography>

                <MDButton
                  onClick={handleClickBack}
                  // sx={{
                  //   color: "#0071D9",
                  //   fontSize: "1.25rem",
                  //   textDecoration: "underline",
                  //   mr: "2rem",
                  //   cursor: "pointer",
                  // }}
                  sx={{
                    textSize: "0.87rem",
                    borderRadius: "0.25rem",
                    borderColor: "#1976D2",
                    border: 1,
                    textDecoration: "underline",
                    // background: "transparent",
                    mr: "2rem",
                    // cursor: "pointer",
                  }}
                  variant="outlined"
                  startIcon={<ArrowBack />}
                >
                  Back To Quote
                </MDButton>
              </Grid>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                    Policy Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput value={data.PolicyEffectiveFromDate} label="Policy Start Date" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput value={data.PolicyEffectiveToDate} label="Policy End Date" />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                    Vehicle Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        value={VariantDetailsOutput ? VariantDetailsOutput[0].MAKE : ""}
                        label="Brand"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        value={VariantDetailsOutput ? VariantDetailsOutput[0].MODEL : ""}
                        label="Model"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        value={VariantDetailsOutput ? VariantDetailsOutput[0].VARIANT : ""}
                        label="Variant"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        value={VariantDetailsOutput ? VariantDetailsOutput[0].Fuel_Type : ""}
                        label="Fuel Type"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        value={VariantDetailsOutput ? VariantDetailsOutput[0].Cubic_Capacity : ""}
                        label="Cubic Capacity"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="Vehicle Class" disabled />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        value={VariantDetailsOutput ? VariantDetailsOutput[0].Seating_Capacity : ""}
                        label="Seating Capacity"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="State Code" disabled />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        value={RTODetailsOutput ? RTODetailsOutput[0].RTO_Code : ""}
                        label="RTO Code"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        id="ChassisNumber"
                        value={data.VehicleDetails.ChassisNumber}
                        onChange={handleVehicleChange}
                        label="Chassis No"
                        required
                        sx={redAsterisk}
                        name="ChassisNumber"
                        inputProps={{ maxLength: 25, minLength: 17 }}
                        onBlur={handleValidate}
                        error={
                          flags.chassisFlag ||
                          (flags.errorFlag && data.VehicleDetails.ChassisNumber === "")
                        }
                        helperText={
                          flags.errorFlag && data.VehicleDetails.ChassisNumber === ""
                            ? errorText
                            : flags.chassisFlag &&
                              data.VehicleDetails.ChassisNumber !== "" &&
                              "Please fill valid Chassis No"
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        id="EngineNumber"
                        value={data.VehicleDetails.EngineNumber}
                        onChange={handleVehicleChange}
                        label="Engine No"
                        required
                        sx={redAsterisk}
                        name="EngineNumber"
                        inputProps={{ maxLength: 20 }}
                        onBlur={handleValidate}
                        error={
                          flags.engineError ||
                          (flags.errorFlag && data.VehicleDetails.EngineNumber === "")
                        }
                        helperText={
                          flags.errorFlag && data.VehicleDetails.EngineNumber === ""
                            ? errorText
                            : flags.engineError &&
                              data.VehicleDetails.EngineNumber !== "" &&
                              "Please fill 8 digit valid Engine Number"
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDDatePicker
                        disabled
                        input={{
                          label: "Date of Registration",
                          value: data.VehicleDetails.RegistrationDate,
                        }}
                        value={data.VehicleDetails.RegistrationDate}
                        options={{ dateFormat: "d-m-Y", altFormat: "d-m-Y", altInput: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        id="RegistrationNumber"
                        // value={data.VehicleDetails.RegistrationNumber}
                        value={
                          RTODetailsOutput &&
                          data.PartnerId === "62" &&
                          (data.BusinessType === "4" || data.BusinessType === "New Business")
                            ? RTODetailsOutput[0].RTO_Code
                            : data.VehicleDetails.RegistrationNumber
                        }
                        onChange={handleVehicleChange}
                        name="RegistrationNumber"
                        label="Registration No"
                        required
                        sx={redAsterisk}
                        onBlur={handleValidate}
                        error={data.VehicleDetails.RegistrationNumber === "" && flags.errorFlag}
                        helperText={
                          data.VehicleDetails.RegistrationNumber === "" &&
                          flags.errorFlag &&
                          errorText
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="Color" disabled />
                    </Grid>
                    {data.BusinessType !== "4" && data.BusinessType !== "New Business" && (
                      <>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            id="PreviousPolicyNumber"
                            value={data.PreviousPolicyDetails.previousPolicyNumber}
                            label="Policy Number"
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            value={data.PreviousPolicyDetails.PreviousPolicyInsurerName}
                            label="Previous Insurance Company "
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDDatePicker
                            input={{
                              label: "Insurance Expiry Date",
                              value: data.PreviousPolicyDetails.PreviousPolicyEndDate,
                              inputProps: { disabled: true },
                            }}
                            value={data.PreviousPolicyDetails.PreviousPolicyEndDate}
                            options={{ dateFormat: "d-m-Y", altFormat: "d-m-Y", altInput: true }}
                          />

                          <Grid
                            item
                            flexDirection="row"
                            display="flex"
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            xxl={12}
                          >
                            <MDTypography
                              sx={{ fontSize: "1.1rem", color: "#0071D9", weight: 500, pt: 0.7 }}
                            >
                              NCB Transfer certificate
                            </MDTypography>

                            <MDButton
                              variant="contained"
                              component="label"
                              color="info"
                              // onClick={(e) => handleFileUpload(e, "AdhaarFront")}

                              sx={{ width: "4rem", height: "1.9rem", ml: 1.25, mt: 1 }}
                            >
                              Upload
                              <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleFileUpload}
                              />
                            </MDButton>

                            <MDTypography>
                              {NCBCertificate != null ? NCBCertificate.name : null}
                            </MDTypography>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                    Proposer Details
                  </MDTypography>
                </AccordionSummary>
                {data.CustomerType === "5" ? (
                  <AccordionDetails>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          value={masters.Salutation}
                          id="Salutation"
                          options={Salutation || []}
                          getOptionLabel={(option) => option.mValue}
                          sx={autoStyle}
                          onChange={(event, value) =>
                            handleProposerSalutationDropdown(event, value, "Sal")
                          }
                          renderInput={(params) => (
                            <MDInput
                              label="Title"
                              // required
                              {...params}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          id="CustomerFirstName"
                          value={data.ProposerDetails.CustomerFirstName}
                          onChange={handleProposerChange}
                          label="First Name"
                          // required
                          name="FirstName"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          id="CustomerLastName"
                          value={data.ProposerDetails.CustomerLastName}
                          onChange={handleProposerChange}
                          label="Last Name"
                          // required
                          name="LastName"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          value={masters.Gender}
                          // name="Gender"
                          id="Gender"
                          options={Gender || []}
                          getOptionLabel={(option) => option.mValue}
                          sx={autoStyle}
                          onChange={handleProposerGenderDropdown}
                          renderInput={(params) => (
                            <MDInput
                              label="Gender"
                              {...params}
                              // required
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDDatePicker
                          input={{
                            label: "DOB",
                            value: datetoShow.dateOfBirth,
                            required: true,
                            sx: redAsterisk,
                            error:
                              (datetoShow.dateOfBirth !== "" && flags.Age < 18) ||
                              (flags.errorFlag && datetoShow.dateOfBirth === ""),
                            helperText:
                              flags.errorFlag && datetoShow.dateOfBirth === ""
                                ? errorText
                                : flags.Age < 18 &&
                                  datetoShow.dateOfBirth !== "" &&
                                  "Age should grater then 18",
                          }}
                          value={datetoShow.dateOfBirth}
                          onChange={(date, v) => handleDateChange(date, "dateOfBirth", "DOB", v)}
                          options={{ dateFormat: "d-m-Y", altFormat: "d-m-Y", altInput: true }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          value={masters.MaritalStatus}
                          id="MaritalStatus"
                          options={MaritalStatus || []}
                          getOptionLabel={(option) => option.mValue}
                          sx={autoStyle}
                          onChange={handleProposerMaritalDropDownChange}
                          renderInput={(params) => (
                            <MDInput
                              label="Marital Status"
                              // required
                              {...params}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          id="ContactNo"
                          value={data.ProposerDetails.ContactNo}
                          onChange={handleProposerChange}
                          onBlur={handleValidate}
                          label="Phone Number"
                          name="ContactNo"
                          inputProps={{ maxLength: 10 }}
                          // error={data.ProposerDetails.ContactNo === "" ? flags.errorFlag : null}
                          required
                          sx={redAsterisk}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          id="EmailId"
                          value={data.ProposerDetails.EmailId}
                          onChange={handleProposerChange}
                          onBlur={handleValidate}
                          label="Email ID"
                          name="EmailId"
                          required
                          sx={redAsterisk}
                          // error={data.ProposerDetails.EmailId === "" ? flags.errorFlag : null}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          value={masters.Occupation}
                          id="OccupationCode"
                          options={Occupation || []}
                          getOptionLabel={(option) => option.mValue}
                          sx={autoStyle}
                          onChange={handleProposerOccupationDropDownChange}
                          renderInput={(params) => <MDInput label="Occupation" {...params} />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          id="PanNo"
                          value={data.ProposerDetails.PanNo}
                          name="PanNo"
                          onChange={handleProposerChange}
                          onBlur={handleValidate}
                          label="PAN Card No"
                          inputProps={{ maxLength: 10 }}
                          required
                          sx={redAsterisk}
                          error={
                            flags.panNoFlag ||
                            (flags.errorFlag && data.ProposerDetails.PanNo === "")
                          }
                          helperText={
                            flags.errorFlag && data.ProposerDetails.PanNo === ""
                              ? errorText
                              : flags.panNoFlag &&
                                data.ProposerDetails.PanNo !== "" &&
                                "Please fill valid PAN Card No"
                          }
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                ) : null}
              </Accordion>
              {data.CustomerType === "8" ? (
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        // value={data.ProposerDetails.CustomerFirstName}
                        // onChange={handleProposerChange}
                        value={data.CorporateDetails.Salutation}
                        label="Salutation"
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="Company Full Name"
                        value={data.CorporateDetails.CompanyName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        // value={data.ProposerDetails.CustomerFirstName}
                        // onChange={handleProposerChange}
                        value={data.CorporateDetails.email}
                        label="Contact Email ID"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="SPOC Name" value={data.CorporateDetails.SPOCName} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput label="SPOC Phone Number" value={data.CorporateDetails.mobileNo} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="Company Pan Card No"
                        name="CompanyPancard"
                        value={data.CorporateDetails.CompanyPancard}
                        onChange={handleCorporateChange}
                        onBlur={handlePanNumber}
                        inputProps={{ maxLength: 10 }}
                        error={
                          flags.PanRegex ||
                          (flags.errorFlag && data.CorporateDetails.CompanyPancard === "")
                        }
                        helperText={
                          flags.errorFlag && data.CorporateDetails.CompanyPancard === ""
                            ? errorText
                            : flags.PanRegex &&
                              data.CorporateDetails.CompanyPancard !== "" &&
                              "Please fill valid PAN Card No"
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="GSTN Number"
                        name="GSTInNumber"
                        value={data.CorporateDetails.GSTInNumber}
                        onChange={handleCorporateChange}
                        onBlur={handleGSTNumber}
                        inputProps={{ maxLength: 15 }}
                        error={flags.gstRegex && data.CorporateDetails.GSTInNumber !== ""}
                        helperText={
                          flags.gstRegex &&
                          data.CorporateDetails.GSTInNumber !== "" &&
                          "Please enter valid 15 digit GSTIN number"
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="CIN Number"
                        name="CIN"
                        value={data.CorporateDetails.CIN}
                        onChange={handleCorporateChange}
                        onBlur={handleCINNumber}
                        inputProps={{ maxLength: 21 }}
                        error={flags.cinRegex && data.CorporateDetails.CIN !== ""}
                        helperText={
                          flags.cinRegex &&
                          data.CorporateDetails.CIN !== "" &&
                          "Please enter valid 21 digit CIN number"
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDDatePicker
                        input={{
                          label: "Date Of Incorporation",
                          value: datetoShow.DOI,
                          error: flags.errorFlag && data.CorporateDetails.DOI === "",
                          helperText:
                            flags.errorFlag && data.CorporateDetails.DOI === "" && errorText,
                        }}
                        value={datetoShow.DOI}
                        onChange={(date, date1) =>
                          handleDateIncorporationChange(date, "DOI", "DOI", date1)
                        }
                        options={{
                          dateFormat: "d-m-Y",
                          altFormat: "d-m-Y",
                          altInput: true,
                          maxDate: new Date(),
                        }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              ) : null}

              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                    Communication Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <MDTypography sx={{ color: "#000000", size: "1rem", textAlign: "left" }}>
                    Permanent Address
                  </MDTypography>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="House No"
                        onChange={handlePermChange}
                        value={data.ProposerDetails.PermanentAddress.AddressLine1}
                        name="AddressLine1"
                        inputProps={{ maxLength: 200 }}
                        // required
                        // error={
                        //   data.ProposerDetails.PermanentAddress.AddressLine1 === ""
                        //     ? flags.errorFlag
                        //     : null
                        // }
                      />
                      {/* {flags.errorFlag &&
                      data.ProposerDetails.PermanentAddress.AddressLine1 === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          {errorText}
                        </MDTypography>
                      ) : null} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="Street/Region"
                        onChange={handlePermChange}
                        value={data.ProposerDetails.PermanentAddress.AddressLine2}
                        name="AddressLine2"
                        inputProps={{ maxLength: 200 }}
                        // required
                        // error={
                        //   data.ProposerDetails.PermanentAddress.AddressLine2 === ""
                        //     ? flags.errorFlag
                        //     : null
                        // }
                      />
                      {/* {flags.errorFlag &&
                      data.ProposerDetails.PermanentAddress.AddressLine2 === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          {errorText}
                        </MDTypography>
                      ) : null} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        id="Pincode"
                        value={data.ProposerDetails.Pincode}
                        onChange={handleProposerChange}
                        onBlur={handleValidate}
                        label="Pin Code"
                        name="Pincode"
                        inputProps={{ maxLength: 6 }}
                        // required
                        // error={data.ProposerDetails.Pincode === "" ? flags.errorFlag : null}
                      />
                      {/* {flags.errorFlag && data.ProposerDetails.Pincode === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the Pincode
                        </MDTypography>
                      ) : null} */}
                      {flags.pincode && data.ProposerDetails.Pincode !== "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill valid Pincode
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        readOnly
                        value={addressCity.PermanentAddress.city}
                        label="District"
                        id="District"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      label="City"
                      id="City"
                      value={data.ProposerDetails.PermanentAddress.}
                      onChange={handleProposerChange}
                    />
                  </Grid> */}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        readOnly
                        value={addressCity.PermanentAddress.state}
                        label="State"
                        id="State"
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Autocomplete
                      value={data.ProposerDetails.PermanentAddress.CountryId}
                      id="CountryId"
                      options={Country || []}
                      getOptionLabel={(option) => option.mValue}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "5px!important",
                        },
                      }}
                      onChange={handlePermAddressDropdown}
                      renderInput={(params) => <MDInput label="Country" {...params} />}
                    />
                  </Grid> */}
                  </Grid>
                  <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                    <MDTypography
                      sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}
                    >
                      Is Communication address same as Permanent address
                    </MDTypography>

                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{ justifyContent: "center", ml: 2.5 }}
                      defaultValue="No"
                      value={data.ProposerDetails.PermanentAddressSameAsCommunication}
                      onChange={handlePermanentAddSameComm}
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                        onClick={handleRadioYes}
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                        onClick={handleRadioNo}
                      />
                    </RadioGroup>
                  </MDBox>
                  <MDTypography sx={{ color: "#000000", size: "1rem", textAlign: "left" }}>
                    Communication Address
                  </MDTypography>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="House No"
                        onChange={handleCommunication}
                        value={data.ProposerDetails.CommunicationAddress.AddressLine1}
                        name="AddressLine1"
                        inputProps={{ maxLength: 200 }}
                        disabled={flags.disableFlag}
                        // required
                        // error={
                        //   data.ProposerDetails.CommunicationAddress.AddressLine1 === ""
                        //     ? flags.errorFlag
                        //     : null
                        // }
                      />
                      {/* {flags.errorFlag &&
                      data.ProposerDetails.CommunicationAddress.AddressLine1 === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          {errorText}
                        </MDTypography>
                      ) : null} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="Street/Region"
                        onChange={handleCommunication}
                        value={data.ProposerDetails.CommunicationAddress.AddressLine2}
                        name="AddressLine2"
                        inputProps={{ maxLength: 200 }}
                        disabled={flags.disableFlag}
                        // required
                        // error={
                        //   data.ProposerDetails.CommunicationAddress.AddressLine2 === ""
                        //     ? flags.errorFlag
                        //     : null
                        // }
                      />
                      {/* {flags.errorFlag &&
                      data.ProposerDetails.CommunicationAddress.AddressLine2 === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          {errorText}
                        </MDTypography>
                      ) : null} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="Pin Code"
                        onChange={handleCommunication}
                        onBlur={handleCommunicationValidate}
                        value={data.ProposerDetails.CommunicationAddress.Pincode}
                        name="Pincode"
                        inputProps={{ maxLength: 6 }}
                        disabled={flags.disableFlag}
                        // required
                        // error={
                        //   data.ProposerDetails.CommunicationAddress.Pincode === ""
                        //     ? flags.errorFlag
                        //     : null
                        // }
                      />
                      {/* {flags.errorFlag &&
                      data.ProposerDetails.CommunicationAddress.Pincode === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill the Pincode
                        </MDTypography>
                      ) : null} */}
                      {flags.pincodecommunication &&
                      data.ProposerDetails.CommunicationAddress.Pincode !== "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          Please fill valid Pincode
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="District"
                        value={addressCity.CommunicationAddress.city}
                        readOnly
                        disabled={flags.disableFlag}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput label="City" />
                  </Grid> */}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="State"
                        value={addressCity.CommunicationAddress.state}
                        readOnly
                        disabled={flags.disableFlag}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Autocomplete
                      value={data.ProposerDetails.CommunicationAddress.CountryId}
                      id="CountryId"
                      options={Country || []}
                      getOptionLabel={(option) => option.mValue}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "5px!important",
                        },
                      }}
                      onChange={handleCommAddressDropdown}
                      renderInput={(params) => <MDInput label="Country" {...params} />}
                    />
                  </Grid> */}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1rem" }}>
                    Other Details
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                    <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                      Whether the vehicle is on Lease/Hire Purchase or Hypothecation ?
                    </MDTypography>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{ justifyContent: "center", ml: 2.5 }}
                      defaultValue="false"
                      value={data.CoverDetails.FinancierDetailsApplicable}
                      onChange={handlehypothecationradio}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Yes" />
                      <FormControlLabel value="0" control={<Radio />} label="No" />
                    </RadioGroup>
                  </MDBox>
                  {data.CoverDetails.FinancierDetailsApplicable === "1" && (
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          value={masters.Hypothecation}
                          id="Name of the financer"
                          options={Array.isArray(Hypothecation) ? Hypothecation : []}
                          getOptionLabel={(option) => option.mValue}
                          sx={autoStyle}
                          onChange={handleHypothecationDropdown}
                          renderInput={(params) => (
                            <MDInput label="Name of the financer" {...params} />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          id="FinancierAddress"
                          value={data.CoverDetails.FinancierDetails.FinancierAddress}
                          onChange={handleProposerChange}
                          label="Financer Address"
                          name="FinancierAddress"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          id="LoanAccountNumber"
                          value={data.CoverDetails.FinancierDetails.LoanAccountNumber}
                          onChange={handleProposerChange}
                          label="CustomerLoanAcNumber"
                          name="LoanAccountNumber"
                        />
                      </Grid>
                    </Grid>
                  )}
                </AccordionDetails>
              </Accordion>
              {data.CustomerType === "5" ? (
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                      Nominee Details
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          value={masters.NomineeSalutation}
                          id="Title"
                          options={Salutation || []}
                          getOptionLabel={(option) => option.mValue}
                          sx={autoStyle}
                          onChange={(event, value) =>
                            handleProposerSalutationDropdown(event, value, "NomSal")
                          }
                          renderInput={(params) => (
                            <MDInput
                              label="Title"
                              required
                              sx={redAsterisk}
                              {...params}
                              error={flags.errorFlag && data.NomineeDetails[0].Title === ""}
                              helperText={
                                flags.errorFlag && data.NomineeDetails[0].Title === "" && errorText
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Nominee First Name"
                          onChange={handleNomineeChange}
                          value={data.NomineeDetails[0].NomineeFirstName}
                          name="NomineeFirstName"
                          required
                          sx={redAsterisk}
                          error={flags.errorFlag && data.NomineeDetails[0].NomineeFirstName === ""}
                          helperText={
                            flags.errorFlag &&
                            data.NomineeDetails[0].NomineeFirstName === "" &&
                            errorText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Nominee Last Name"
                          onChange={handleNomineeChange}
                          value={data.NomineeDetails[0].NomineeLastName}
                          name="NomineeLastName"
                          required
                          sx={redAsterisk}
                          error={flags.errorFlag && data.NomineeDetails[0].NomineeLastName === ""}
                          helperText={
                            flags.errorFlag &&
                            data.NomineeDetails[0].NomineeLastName === "" &&
                            errorText
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <Autocomplete
                          value={masters.NomineeRelation}
                          id="NomineeRelationWithProposer"
                          options={NomineeRelation || []}
                          getOptionLabel={(option) => option.mValue}
                          sx={autoStyle}
                          onChange={handleNomineeDropdown}
                          renderInput={(params) => (
                            <MDInput
                              label="Relationship"
                              required
                              {...params}
                              sx={redAsterisk}
                              error={
                                flags.errorFlag &&
                                data.NomineeDetails[0].NomineeRelationWithProposer === ""
                              }
                              helperText={
                                flags.errorFlag &&
                                data.NomineeDetails[0].NomineeRelationWithProposer === "" &&
                                errorText
                              }
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDDatePicker
                          input={{
                            label: "DOB",
                            value: datetoShow.nomineeDateofBirth,
                            required: true,
                            error: flags.errorFlag && data.NomineeDetails[0].NomineeDOB === "",
                            helperText:
                              flags.errorFlag &&
                              data.NomineeDetails[0].NomineeDOB === "" &&
                              errorText,
                            sx: redAsterisk,
                          }}
                          value={datetoShow.nomineeDateofBirth}
                          onChange={(date, v) =>
                            handleNomineeDateChange(date, "nomineeDateofBirth", "NomineeDOB", v)
                          }
                          options={{
                            maxDate: new Date(),
                            dateFormat: "d-m-Y",
                            altFormat: "d-m-Y",
                            altInput: true,
                          }}
                        />
                      </Grid>
                      {flags.GuardianFlag === true && (
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Legal Gaurdian Name"
                            value={data.NomineeDetails[0].GuardianName}
                            name="GuardianName"
                            required
                            sx={redAsterisk}
                            onChange={handleNomineeChange}
                            error={flags.errorFlag && data.NomineeDetails[0].GuardianName === ""}
                            helperText={
                              flags.errorFlag &&
                              data.NomineeDetails[0].GuardianName === "" &&
                              errorText
                            }
                          />
                        </Grid>
                      )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={5} xl={5} xxl={5}>
              <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem" }}>
                <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                  Policy Summary
                </MDTypography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Quote No
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {partnerDetails.quoteNumber}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      IDV
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {formatter.format(IDV)}
                    </MDTypography>
                  </Grid>
                  {data.BusinessType !== "4" && data.BusinessType !== "New Business" && (
                    <>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                          NCB
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {/* {userSelection.NCB.mValue} */}
                          {partnerDetails.premiumResult.NCB != ""
                            ? partnerDetails.premiumResult.NCB
                            : "0"}
                          {/* {Object.values(userSelectedNCB || {}).every((x) => x === null || x === "")
                            ? ""
                            : userSelectedNCB.mValue}{" "} */}
                        </MDTypography>
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Plan Type
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {userSelection.PlanType.mValue}
                    </MDTypography>
                  </Grid>
                  <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Plan Coverage
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      onClick={handlePlanOpen}
                      sx={{ fontSize: "0.87rem", color: "#0071D9", textDecoration: "underline" }}
                    >
                      View
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Addon Covers ({addonData.filter((x) => x !== null).length})
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      onClick={handleAddonOpen}
                      sx={{ fontSize: "0.87rem", color: "#0071D9", textDecoration: "underline" }}
                    >
                      View
                    </MDTypography>
                  </Grid>
                  <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      Premium Amount
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {formatter.format(premiumData.premium)}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      GST@18%
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      + {formatter.format(premiumData.gst)}
                    </MDTypography>
                  </Grid>
                  <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                      TOTAL Amount
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      mt={0}
                      sx={{ fontSize: "2rem", color: "#0071D9" }}
                    >
                      {formatter.format(premiumData.gst + premiumData.premium)}
                    </MDTypography>
                  </Grid>

                  {isCustomer && data ? (
                    <MDBox>
                      <GetCheckbox
                        VehicleType={data.VehicleType}
                        BusinessType={data.BusinessType}
                        handleCustomerTerm={handleCustomerTerm}
                        setTermsnCond={setTermsnCond}
                        termsnCond={termsnCond}
                        NCB={partnerDetails.premiumResult.NCB}
                        // sx={{mb:"3rem"}}
                      />

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        xxl={12}
                        flexDirection="row"
                        display="flex"
                      >
                        <Checkbox
                          sx={{ mb: "13.5rem" }}
                          color="secondary"
                          value={termsnCond.kyc}
                          onChange={(e) =>
                            setTermsnCond((prevState) => ({ ...prevState, kyc: e.target.checked }))
                          }
                        />

                        <MDTypography
                          sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "0.5rem" }}
                        >
                          I hereby consent to receive information from Central KYC Registry through
                          SMS/email on the registered number/email address. I/we agree that the PAN
                          details and other information provided by me/us in the application form
                          may be used to download/verify my/our KYC documents from the CERSAI* CKYC
                          portal for processing this application. I/We understand that only the
                          acceptable Officially Valid documents would be relied upon for processing
                          this application. *Central Registry of Securitisation and Asset
                          Reconstruction and Security Interest of India.
                        </MDTypography>
                      </Grid>
                    </MDBox>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      flexDirection="row"
                      display="flex"
                    >
                      <Checkbox
                        sx={{ mb: "13rem" }}
                        color="secondary"
                        value={termsnCond.kyc}
                        onChange={(e) =>
                          setTermsnCond((prevState) => ({ ...prevState, kyc: e.target.checked }))
                        }
                      />

                      <MDTypography
                        sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: "0.5rem" }}
                      >
                        I hereby consent to receive information from Central KYC Registry through
                        SMS/email on the registered number/email address. I/we agree that the PAN
                        details and other information provided by me/us in the application form may
                        be used to download/verify my/our KYC documents from the CERSAI* CKYC portal
                        for processing this application. I/We understand that only the acceptable
                        Officially Valid documents would be relied upon for processing this
                        application. *Central Registry of Securitisation and Asset Reconstruction
                        and Security Interest of India.
                      </MDTypography>
                    </Grid>
                  )}

                  {/* {isCustomer && motorQuoteInput.VehicleType != "16" && (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      flexDirection="row"
                      display="flex"
                    >
                      <Checkbox
                        color="secondary"
                        value={termsnCond.bike}
                        onChange={(e) =>
                          setTermsnCond((prevState) => ({
                            ...prevState,

                            bike: e.target.checked,
                          }))
                        }
                      />

                      <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                        {data.VehicleType === "17"
                          ? "I agree my bike has a valid PUC certificate"
                          : null}
                      </MDTypography>
                    </Grid>
                  )}

                  {isCustomer && (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      flexDirection="row"
                      display="flex"
                    >
                      <Checkbox
                        color="secondary"
                        value={termsnCond.acceptTnC}
                        onChange={(e) =>
                          setTermsnCond((prevState) => ({
                            ...prevState,
                            acceptTnC: e.target.checked,
                          }))
                        }
                      />

                      <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                        {data.VehicleType === "16" ? (
                          <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                            I agree to the
                            <span
                              style={{
                                color: "#0071D9",
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "5px",
                                fontSize: "0.87rem",
                              }}
                              onClick={handleCustomerTerm}
                              role="button"
                              onKeyDown={handleCustomerTerm}
                              tabIndex="0"
                            >
                              terms & conditions
                            </span>
                            and confirm: my car is not a commercial vehicle, and my car has a valid
                            PUC certificate.
                          </MDTypography>
                        ) : (
                          <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                            I agree to the
                            <span
                              style={{
                                color: "#0071D9",
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "5px",
                              }}
                              onClick={handleCustomerTerm}
                              role="button"
                              onKeyDown={handleCustomerTerm}
                              tabIndex="0"
                            >
                              terms & conditions
                            </span>
                            and confirm that the vehicle is a registered private two wheeler. I also
                            confirm that the details provided by me are accurate, and I agree to
                            provide any additional documents as a pre-condition for policy issuance.
                          </MDTypography>
                        )}
                      </MDTypography>
                    </Grid>
                  )}

                  {isCustomer && motorQuoteInput.BusinessType != "4" && (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      flexDirection="row"
                      display="flex"
                    >
                      <Checkbox
                        color="secondary"
                        value={termsnCond.ncb}
                        onChange={(e) =>
                          setTermsnCond((prevState) => ({ ...prevState, ncb: e.target.checked }))
                        }
                      />

                      <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
                        {data.VehicleType === "16"
                          ? "I confirm that I have a valid NCB reserving certificate for the 20% NCB transferred to my new car and that the original certificate will be produced at the time of claim. You have confirmed that you have a valid NCB transfer certificate"
                          : "I confirm that I have a valid NCB reserving certificate for the 20% NCB transferred to my new bike and that the original certificate will be produced at the time of claim. You have confirmed that you have a valid NCB transfer certificate"}
                      </MDTypography>
                    </Grid>
                  )} */}

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDButton
                      size="medium"
                      startIcon={<ArrowDownwardIcon />}
                      color="white"
                      onClick={() => HandleDownload(partnerDetails.quoteNumber)}
                      sx={{
                        textSize: "0.87rem",

                        borderRadius: "0.25rem",

                        borderColor: "#1976D2",

                        border: 1,

                        background: "transparent",
                      }}
                    >
                      Download Quote
                    </MDButton>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    xxl={6}
                    justifyContent="right"
                    alignItems="start"
                    display="flex"
                  >
                    {isCustomer ? (
                      <MDButton
                        sx={{ fontSize: "0.7rem" }}
                        onClick={handlekycredirect}
                        disabled={disableKYC}
                      >
                        Proceed to KYC
                      </MDButton>
                    ) : (
                      <MDButton
                        sx={{ fontSize: "0.7rem" }}
                        onClick={handlekycredirect}
                        disabled={disableKYC}
                      >
                        Proceed to KYC
                      </MDButton>
                    )}
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </>
      )}
    </MDBox>
  );
}

function Ckyc({ data, setData }) {
  console.log("data", data);
  // console.log("premiumData", premiumData, setPremiumData);
  const navigate = useNavigate();
  const [proposalDetails, setProposalDetails] = useState();
  const [paymentData, setPaymentData] = useState();
  const [controller] = useDataController();
  const [eConsent, setEConsent] = useState(false);
  // const [eConsent] = useState(false);
  const [open, setOpen] = useState(false);

  const [kycNoTrue, setKYCNoTrue] = useState(false);
  const [kycNoFalse, setkycNoFalse] = useState(false);
  const [panNoFalse, setpanNoFalse] = useState(false);

  const [masterValue, setMasterValue] = useState({
    Gender: [],
  });
  const [args, setArgs] = useState({
    productId: null,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });
  useEffect(async () => {
    if (data.PartnerId) {
      const argObj = {
        ...args,
        productId: 449,
        partnerId: data.PartnerId,
        masterType: null,
        jsonValue: null,
      };
      setArgs(argObj);
      GetAllMasters(argObj, setMasterValue);
    }
  }, [data.PartnerId]);
  const getValue = (masterType, value) => {
    if (masterValue[masterType]) {
      const val = masterValue[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };

  const handleModalKYCNoTrue = () => {
    setKYCNoTrue(false);
  };

  const handleModalKYCNoFalse = () => {
    setkycNoFalse(false);
  };

  const handleModalPanNoFalse = () => {
    setpanNoFalse(false);
  };

  const handleClose = (quoteNumber) => {
    const values = { QuoteNumber: quoteNumber, pageState: "ProposalForm" };
    console.log("Customer URL", values);
    const URL = `http://localhost:3000/modules/BrokerPortal/Pages/MotorProposal?backURL=&QuoteNumber=${quoteNumber}&pageState=ProposalForm`;
    console.log("Customer URL", URL);
    navigate(`/modules/BrokerPortal/Pages/BPLanding`);
    setOpen(false);
  };
  // const dateFormat = (date) => {
  //   if (date !== "" && date !== null && date !== undefined) {
  //     const dateArr = date.split("-");
  //     return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  //   }
  //   return null;
  // };

  // const [dateNew, setDateNew] = useState({
  //   dateOfBirth: dateFormat(data.ProposerDetails.DOB),
  //   // dateOfBirth: null, // data.CustomerType === "5" ? data.ProposerDetails.DOB : data.CorporateDetails.DOI,
  // });

  // const dateFormat = (date) => {
  //   if (date !== null) {
  //     const dateArr = date.split("-");
  //     return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  //   }
  //   return null;
  // };

  // const [validDob, setvalidDob] = useState(false);

  const handleCalculateAge = (date) => {
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();
    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    }
    // get months when current month is greater
    else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }
    // get days
    // let dateAge;
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      // dateAge = 31 + currentDate - dobDate;
      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    // group the age in a single variable
    return yearAge;
  };

  const [flags, setFlags] = useState({
    errorFlag: false,
    ageFlag: false,
    nomineeage: "",
    Age: "",
    nomineeFlag: "",
    chassisFlag: false,
    pincode: false,
    pincodecommunication: false,
    getotpflag: false,
    engineError: false,
    // otpValidationFlag: false,
    status: false,
  });
  const [kycflags, setKycflags] = useState({
    kycErrorFlag: false,
    ckycNoFlag: false,
    pancardFlag: false,
    ageDOBFlag: false,
    Age: "",
    validationError: false,
  });

  // const formatDate = (date) => {
  //   const format1 = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(date);
  //   return `${format1(dt.getDate())}-${format1(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  // };

  const handleDOBChange = (value, label, type, V) => {
    // debugger;
    if (type === "DOI") {
      // setvalidDob(false);
      // setDateNew((prevState) => ({ ...prevState, [label]: V }));
      setData((prevState) => ({
        ...prevState,
        CorporateDetails: { ...prevState.CorporateDetails, [type]: V },
        KYC: { ...prevState.KYC, [type]: V, [label]: V },
      }));
    }

    if (type === "DOB") {
      // setvalidDob(false);
      // setDateNew((prevState) => ({ ...prevState, [label]: V }));
      setData((prevState) => ({
        ...prevState,
        KYC: { ...prevState.KYC, [type]: V, [label]: V },
      }));
      // const dob = value.toLocaleDateString("en-ZA");
      const age = handleCalculateAge(value);
      if (age < 18) {
        swal({
          icon: "error",
          text: "Proposer Age should be greater then 18",
        });

        setFlags((prevState) => ({ ...prevState, Age: age }));
        // setDateNew((prevState) => ({ ...prevState, [label]: "" }));
      } else {
        // setvalidDob(true);
        // setDateNew((prevState) => ({ ...prevState, [label]: null }));
        console.log("age", age);
      }
    }
  };
  // useEffect(() => {
  //   const d = data;
  //   if (data.CorporateDetails.DOI !== "") {
  //     d.KYC.DOI = data.CorporateDetails.DOI;
  //   }
  // }, []);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [counter, setCounter] = useState(30);
  useEffect(() => {
    let timer;
    if (counter > 0 && startCounterFlag) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }
    if (counter === 0) {
      setCounter(30);
      setStartCounterFlag(false);
      setFlags((prevState) => ({ ...prevState, status: false }));
      setTimerFlag(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter, startCounterFlag]);

  const {
    isCustomer,
    quoteProposalOutput,
    partnerDetails,
    customerDetails,
    // userSelection,
    // motorQuoteInput,
  } = controller;

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

  useEffect(() => {
    console.log("PaymentFormData", "outside");
    if (paymentData) {
      console.log("PaymentFormData", paymentData.OutputResult);
      if (eConsent && !isCustomer) {
        // const notificationReq = {
        //   notificationRequests: [
        //     {
        //       templateKey: "POSP_Consent",
        //       sendEmail: false,
        //       isEmailBody: true,
        //       notificationPayload: JSON.stringify({
        //         CustomerFirstName: data.ProposerDetails.CustomerFirstName,
        //         CustomerLastName: data.ProposerDetails.CustomerLastName,
        //         ProposalNumber: proposalDetails.proposalNumber,
        //         BrokerName: process.env.REACT_APP_TITLE,
        //         ContactNo: process.env.REACT_APP_CONTACTNO,
        //         Email: process.env.REACT_APP_EMAIL,
        //         Image: process.env.REACT_APP_IMAGEURL,
        //         VehicelType: vehicleType,
        //       }),
        //     },
        //   ],
        //   Attachments:[{
        //     FileName:"",
        //     FileExtension:".pdf",
        //     FileData:"",
        //     ContentType:"",
        //   }],
        //   sendEmail: true,
        //   subject: `Your Car Comprehensive Insurance Policy for ${VariantDetailsOutput[0].MAKE} ${VariantDetailsOutput[0].MODEL} - ${data.VehicleDetails.RegistrationNumber}`,
        //   toEmail: data.ProposerDetails.EmailId,
        // };
        // postRequest("Notifications/SendMultipleTemplateNotificationAsync", notificationReq);

        const notificationRequests = {
          proposalNo: "",
          policyNo: "quoteNumber",
          transactionId: "",
          customerId: "",
          key: quoteProposalOutput.finalResult.BaseQuotationNo,
          keyType: "POSP_Consent",
          communicationId: 120,
          referenceId: quoteProposalOutput.finalResult.PartnerId,
          ICPDF: true,
          ISDMS: false,
        };
        postRequest(
          `Policy/SendNotification?PolicyNumber=${""}&EmailId=${data.ProposerDetails.EmailId}`,
          notificationRequests
        ).then((result) => {
          console.log("result1", result);
        });
        setOpen(true);
      } else if (paymentData.OutputResult.InputJson) {
        post(paymentData.OutputResult);
      } else {
        const paymentURL = paymentData.OutputResult.PaymentURL;
        window.location.href = paymentURL;
      }

      // const params = {
      //   "InputJson": {
      //     "ProposalAmount": "60241",
      //     "ProposalNo": "R23072200025",
      //     "UserID": "100002",
      //     "PaymentType": "1",
      //     "Responseurl": "http://dev2-publi-3o0d27omfsvr-1156685715.ap-south-1.elb.amazonaws.com/api/Policy/GetPaymentRedirection?PaymentRefNo=0599/0599/0018/00/000"
      //   },
      //   "ProposalNumber": "R23072200025",
      //   "PaymentURL": "https://rgipartners.reliancegeneral.co.in/PaymentIntegration/PaymentIntegration"
      // }
      // console.log("PaymentFormData", "inside");
      // post(params);
    }
  }, [paymentData]);

  useEffect(() => {
    if (proposalDetails && data.PartnerId === "62") {
      GetPaymentURL(
        partnerDetails.partnerProductId,
        proposalDetails.proposalNumber,
        setPaymentData
      );
    }
  }, [proposalDetails, data.PartnerId === "62"]);

  const [otpdata, setotpdata] = useState({
    otp: "",
    Email: "",
  });

  const [loading, setLoading] = useState(false);

  const [isKyc, setisKyc] = useState("Yes");
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };
  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const handleModalEmailOpen = () => {
    setModalOpen(false);
    otpdata.Email = "";
    setModalEmailOpen(true);
  };
  const handleModalEmailClose = () => {
    setModalEmailOpen(false);
    otpdata.Email = "";
    setFlags((prevState) => ({ ...prevState, getotpflag: false }));
  };

  // const [dob, setdob] = useState(null);
  // const [setdob] = useState(null);
  const { DocumentType } = ProfileData().basicdetails.Masters;

  console.log("ShanuDoc", DocumentType);
  const [doc, SetDoc] = useState([]);
  console.log("doc", doc);
  useEffect(() => {
    if (DocumentType !== null) {
      if (data.CustomerType === "5") {
        SetDoc(DocumentType);
      } else {
        const xyz = DocumentType.filter((x) => x.Description === "Corporate");
        SetDoc(xyz);
      }
    }
  }, []);

  const handleRadioChange = (e) => {
    setisKyc(e.target.value);
    if (e.target.value === "Yes") {
      const { KYC } = data;
      KYC.isKYCDone = "true";
      setData((prev) => ({ ...prev, KYC }));
    } else {
      const { KYC } = data;
      KYC.isKYCDone = "false";
      setData((prev) => ({ ...prev, KYC }));
    }
  };

  const [master, setMaster] = useState({
    DocumentType: { mID: "", mValue: "" },
  });

  const [KycUploadPhoto, setKycUploadPhoto] = useState({ name: null });
  const [KycPanUpload, setKycPanUpload] = useState({ name: null });
  const [KycDocument, setKycDocument] = useState({ name: null });
  const [modalOpen1, setModelopen1] = useState(false);

  const [name, setName] = useState({
    FirstName: "",
    LastName: "",
  });

  useEffect(() => {
    const newValue = {
      ...name,
      FirstName: data.ProposerDetails.CustomerFirstName,
      LastName: data.ProposerDetails.CustomerLastName,
    };
    setName(newValue);
  }, []);

  const uploadFiles = async (files, type) => {
    const formData = new FormData();
    formData.append("file", files, files.name);
    await UploadFiles(formData).then((result) => {
      console.log("resultkyc", result);
      if (result.data[0].fileName !== "") {
        if (type === "Photo") {
          setKycUploadPhoto(files);
        } else if (type === "PAN") {
          setKycPanUpload(files);
        } else {
          setKycDocument(files);
        }
      }
    });
  };

  const handleKycFileUpload = async (event, type) => {
    await uploadFiles(event.target.files[0], type);
    console.log("files", event.target.files[0]);
  };

  const handleKycDeleteFile = async (type, fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        if (type === "Photo") {
          setKycUploadPhoto({ name: null });
        } else if (type === "PAN") {
          setKycPanUpload({ name: null });
        } else {
          setKycDocument({ name: null });
        }
      }
    });
  };

  const handleDocumentTypeDropdown = (event, values) => {
    setMaster((prevState) => ({ ...prevState, DocumentType: values }));
    if (values.mValue !== "") {
      const { KYC } = data;
      KYC.OtherDocID = values.mID;
      KYC.OtherDocValue = values.mValue;
      KYC.OtherDocNumber = "";
      setData((prev) => ({ ...prev, KYC }));
      setKycflags((prevState) => ({ ...prevState, kycErrorFlag: false }));
    } else {
      const { KYC } = data;
      KYC.OtherDocID = "";
      KYC.OtherDocValue = "";
      KYC.OtherDocNumber = "";
      setData((prev) => ({ ...prev, KYC }));
      setKycflags((prevState) => ({ ...prevState, kycErrorFlag: false }));
      // const newValue = { ...kycDetails, OtherDocs: { mID: "", mValue: "" } };
      // setKycDetails(newValue);
      // setFlags((prevState) => ({ ...prevState, otherDocSelectedFlag: false, errorFlag: false }));
    }
  };

  const handleChange = (e) => {
    const { KYC } = data;
    if (e.target.name === "CKYCNo") {
      const ckyreg = /^[a-zA-Z0-9]+$/;
      if (ckyreg.test(e.target.value) || e.target.value === "") {
        KYC[e.target.name] = e.target.value.toUpperCase();
        setData((prev) => ({ ...prev, KYC }));
      }
    } else if (e.target.name === "PANNo") {
      const pancardReg = /^[a-zA-Z0-9]+$/;
      if (pancardReg.test(e.target.value) || e.target.value === "") {
        KYC[e.target.name] = e.target.value.toUpperCase();
        setData((prev) => ({ ...prev, KYC }));
      }
    }
    // KYC[e.target.name] = e.target.value;
    // setData((prev) => ({ ...prev, KYC }));
  };

  const handleValidateKYC = (e) => {
    const { KYC } = data;
    if (e.target.name === "CKYCNo") {
      if (data.PartnerId === "62") {
        // if (e.target.value.length < 10) {
        //   const panregex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        //   if (!panregex.test(e.target.value)) {
        //     setKycflags((prevState) => ({ ...prevState, ckycNoFlag: true }));
        //   } else {
        //     setKycflags((prevState) => ({ ...prevState, ckycNoFlag: false }));
        //   }
        // }
      } else {
        console.log("234567890");
        if (e.target.value.length < 14) {
          setKycflags((prevState) => ({ ...prevState, ckycNoFlag: true }));
        } else {
          setKycflags((prevState) => ({ ...prevState, ckycNoFlag: false }));
        }
      }
    } else if (e.target.name === "PANNo") {
      if (e.target.value.length < 10) {
        const panregex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        if (!panregex.test(e.target.value)) {
          KYC[e.target.name] = e.target.value.toUpperCase();
          setData((prev) => ({ ...prev, KYC }));
          setKycflags((prevState) => ({ ...prevState, pancardFlag: true }));
        }
      } else {
        setKycflags((prevState) => ({ ...prevState, pancardFlag: false }));
      }
    }
  };

  const handleValidateKycDocuments = (e) => {
    const selectedDocID = master.DocumentType.mID;
    switch (selectedDocID) {
      case "129":
        {
          const AadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
          if (!AadharRegex.test(e.target.value)) {
            setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setKycflags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setKycflags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "115":
        {
          const PassportRegex = /^([a-zA-Z]){1}([0-9]){7}/;
          if (!PassportRegex.test(e.target.value)) {
            setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setKycflags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setKycflags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      default:
        console.log("SIndhu");
    }
  };

  // const formatDate = (date) => {
  //   const format = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(date);
  //   return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  // };

  // const handleDateChange = (date) => {
  //   setdob(date);
  //   const { KYC } = data;
  //   KYC.DateOfBirth = formatDate(date);
  //   setData((prev) => ({ ...prev, KYC }));
  // };

  const handleEmailchange = async () => {
    setFlags((prevState) => ({ ...prevState, otpValidationFlag: false }));

    // if (otpdata.Email !== "") {
    //   setFlags((prevState) => ({ ...prevState, getotpflag: true, otpValidationFlag: true }));
    // }
    setotpdata((prevState) => ({ ...prevState, otp: "" }));
    const sendOTP = {
      name: `${customerDetails.FirstName + customerDetails.LastName}`,
      otp: "1234",
      email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    setModalEmailOpen(false);
    handleModalOpen();
    // await getOTP(sendOTP);
    // setFlags((prevState) => ({ ...prevState, otpValidationFlag: true }));
    getOTP(sendOTP).then((result) => {
      if (result.status === 1) {
        setFlags((prevState) => ({ ...prevState, status: true }));
        setStartCounterFlag(true);
        setCounter(30);
      } else {
        setFlags((prevState) => ({ ...prevState, status: false }));
      }
      console.log("result", result);
    });
  };
  // const handleotpverify = async () => {
  //   if (otpdata.otp !== "") {
  //     const verifyOTP = {
  //       otp: otpdata.otp,
  //       email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
  //       mobileNumber: "",
  //       userName: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
  //       envId: process.env.REACT_APP_EnvId,
  //       productType: "MICA",
  //       isFirstTimeUser: true,
  //       isClaimsLive: false,
  //     };
  //     Promise.all([GetOTP(verifyOTP)]).then(async (results) => {
  //       console.log("OTP Result", results);

  //       if (results[0] === null) {
  //         swal({
  //           icon: "error",
  //           text: "Please enter the valid OTP sent to your Email",
  //         });
  //       } else if (results[0].status === 1) {
  //         setLoading(true);
  //         await SaveProposal(partnerDetails.partnerProductId, data).then((result) => {
  //           console.log("1234567890", result);
  //           const saveResult = result;

  //           setProposalDetails(saveResult);
  //           setModalOpen(false);
  //           if (result.status === 7) {
  //             swal({
  //               icon: "error",
  //               text: "something went wrong please try after some time",
  //             }).then(() => {
  //               setLoading(false);
  //               navigate("/modules/BrokerPortal/Pages/MotorComparison");
  //             });
  //           }
  //         });
  //       }
  //     });
  //   } else {
  //     swal({
  //       icon: "error",
  //       text: "Please enter the OTP sent to your Email",
  //     });
  //   }
  // };

  // const handleSubmit = async () => {
  //
  //   if (
  //     (data.KYC.isKYCDone === true ? data.KYC.CKYCNo === "" : null) ||
  //     (data.KYC.isKYCDone === false ? data.KYC.PANNo === "" : null) ||
  //     (data.KYC.isKYCDone === false ? data.KYC.OtherDocNumber === "" : null) ||
  //     data.KYC.dateOfBirth === ""
  //   ) {
  //     setKycflags((prevState) => ({ ...prevState, kycErrorFlag: true }));
  //     swal({
  //       icon: "error",
  //       text: "Please fill the required fields",
  //     });
  //   } else {
  //
  //     console.log("deded");
  //     if (kycflags.validationError === false) {
  //       if (isCustomer) {
  //         const sendOTP = {
  //           name: `${customerDetails.FirstName + customerDetails.LastName}`,
  //           otp: "1234",
  //           email: customerDetails.Email,
  //           userName: "sindhu@inubesolutions.com",
  //           envId: process.env.REACT_APP_EnvId,
  //           productType: "Mica",
  //           mobileNumber: "",
  //           sendSms: true,
  //           isBerry: false,
  //           client: "iNube BrokerPortal",
  //         };
  //         handleModalOpen();
  //         await getOTP(sendOTP);
  //       }
  //     } else {
  //       setFlags((prevState) => ({ ...prevState, validationError: true }));
  //     }
  //   }
  // };

  const handleOTP = (otp1) => {
    setotpdata((prevState) => ({
      ...prevState,
      otp: otp1,
    }));
  };
  const handleEmail = (event) => {
    setotpdata((prevState) => ({
      ...prevState,
      Email: event.target.value,
    }));
  };

  const handleKYCDetails = (e) => {
    const { KYC } = data;
    KYC[e.target.name] = e.target.value;
    setData((prev) => ({ ...prev, KYC }));
  };

  const handleGoKycSubmit = async () => {
    if (
      // (data.KYC.isKYCDone === true || data.KYC.isKYCDone === "true"
      //   ? data.KYC.CKYCNo === ""
      //   : null) ||
      // (data.KYC.isKYCDone === false || data.KYC.isKYCDone === "false"
      //   ? data.KYC.PANNo === ""
      //   : null)

      data.KYC.PANNo === "" ||
      data.KYC.DateOfBirth === ""
      // ||
      // (isKyc === "No" && KycPanUpload.name === null)
    ) {
      setKycflags((prevState) => ({ ...prevState, kycErrorFlag: true }));
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      console.log("deded");
      if (isCustomer) {
        const sendOTP = {
          name: `${customerDetails.FirstName + customerDetails.LastName}`,
          otp: "1234",
          email: customerDetails.Email,
          userName: "sindhu@inubesolutions.com",
          envId: process.env.REACT_APP_EnvId,
          productType: "Mica",
          mobileNumber: "",
          sendSms: true,
          isBerry: false,
          client: "iNube BrokerPortal",
        };
        handleModalOpen();
        await getOTP(sendOTP);
      }
    }
  };
  const handleGoKycotpverify = async () => {
    if (otpdata.otp !== "") {
      const verifyOTP = {
        otp: otpdata.otp,
        email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
        mobileNumber: "",
        userName: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      Promise.all([GetOTP(verifyOTP)]).then(async (results) => {
        console.log("OTP Result", results);
        if (results[0] === null) {
          swal({
            icon: "error",
            text: "Please enter the valid OTP sent to your Email",
          });
        } else if (results[0].status === 1) {
          setLoading(true);
          await SaveProposal(partnerDetails.partnerProductId, data).then((result) => {
            console.log("1234567890", result);
            const saveResult = result;
            setProposalDetails(saveResult);
            setModalOpen(false);
            if (result.status === 7) {
              swal({
                icon: "error",
                text:
                  data.PartnerId === "86"
                    ? result.proposalResponse.finalResult.ErrorText
                    : "something went wrong please try after some time",
              }).then(() => {
                setLoading(false);
                navigate("/modules/BrokerPortal/Pages/MotorComparison");
              });
            }
          });
        }
      });
    } else {
      swal({
        icon: "error",
        text: "Please enter the OTP sent to your Email",
      });
    }
  };

  const handleeconst = () => {
    if (proposalDetails) {
      GetPaymentURL(
        partnerDetails.partnerProductId,
        proposalDetails.proposalNumber,
        setPaymentData
      );
    }
    if (!isCustomer) setEConsent(true);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (isCustomer) {
      if (data.PartnerId === "62") {
        handleGoKycSubmit();
        // handleGoKycotpverify()
      } else {
        console.log("234567890", data.PartnerId);
        if (
          (data.KYC.isKYCDone === true || data.KYC.isKYCDone === "true"
            ? kycflags.ckycNoFlag === true
            : null) ||
          (data.KYC.isKYCDone === true || data.KYC.isKYCDone === "true"
            ? data.KYC.CKYCNo === ""
            : null) ||
          (data.KYC.isKYCDone === false || data.KYC.isKYCDone === "false"
            ? data.KYC.PANNo === ""
            : null) ||
          (data.KYC.isKYCDone === false || data.KYC.isKYCDone === "false"
            ? data.KYC.OtherDocNumber === ""
            : null) ||
          data.KYC.DateOfBirth === ""
          // ||
          // (isKyc === "No" && KycPanUpload.name === null)
        ) {
          setKycflags((prevState) => ({ ...prevState, kycErrorFlag: true }));
          swal({
            icon: "error",
            text: "Please fill the required fields",
          });
        } else {
          setKycflags((prevState) => ({ ...prevState, kycErrorFlag: false }));
          await SaveProposal(partnerDetails.partnerProductId, data).then((result) => {
            console.log("1234567890", result);
            const saveResult = result;
            setProposalDetails(saveResult);
            if (saveResult.proposalResponse.finalResult.KYCStatus === "") {
              setKYCNoTrue(true);
              setModalOpen(false);
            } else if (saveResult.proposalResponse.finalResult.KYCStatus !== "") {
              setkycNoFalse(true);
            }
            if (result.status === 7) {
              swal({
                icon: "error",
                text:
                  data.PartnerId === "86"
                    ? result.proposalResponse.finalResult.ErrorText
                    : "something went wrong please try after some time",
              }).then(() => {
                setLoading(false);
                navigate("/modules/BrokerPortal/Pages/MotorComparison");
              });
            }
          });
        }
      }
    } else {
      await SaveProposal(partnerDetails.partnerProductId, data).then((result) => {
        console.log("1234567890", result);
        const saveResult = result;
        setProposalDetails(saveResult);
        if (data.PartnerId === "62") {
          handleeconst();
        } else {
          console.log("1234567890");
          if (saveResult.proposalResponse.finalResult.KYCStatus === "") {
            setKYCNoTrue(true);
            setModalOpen(false);
          } else if (saveResult.proposalResponse.finalResult.KYCStatus !== "") {
            setkycNoFalse(true);
          }
        }
        if (result.status === 7) {
          swal({
            icon: "error",
            text:
              data.PartnerId === "86"
                ? result.proposalResponse.finalResult.ErrorText
                : "something went wrong please try after some time",
          }).then(() => {
            setLoading(false);
            navigate("/modules/BrokerPortal/Pages/MotorComparison");
          });
        }
      });
    }
  };

  const handleSetToNo = () => {
    setisKyc("No");
    const { KYC } = data;
    KYC.isKYCDone = "true";
    setData((prev) => ({ ...prev, KYC }));
    setkycNoFalse(false);
  };

  const handlePayment = async () => {
    // setotpdata((prevState) => ({ ...prevState, otp: "" }));
    const sendOTP = {
      name: `${customerDetails.FirstName + customerDetails.LastName}`,
      otp: "1234",
      email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
      // email:"bhavani.priyanka@inubesolutions.com",
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
      mobileNumber: "",
      sendSms: true,
      isBerry: false,
      client: "iNube BrokerPortal",
    };
    setModalEmailOpen(false);
    handleModalOpen();
    await getOTP(sendOTP);
  };

  const handleotpverify = async () => {
    if (data.PartnerId === 128) {
      console.log("Inside fetch metod");
      <MotorPAYUPayment />;
    } else if (data.PartnerId === "62") {
      handleGoKycotpverify();
    } else {
      console.log("234567890", data.PartnerId);
      if (otpdata.otp !== "") {
        setLoading(true);

        const verifyOTP = {
          otp: otpdata.otp,
          email: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
          mobileNumber: "",
          userName: otpdata.Email === "" ? customerDetails.Email : otpdata.Email,
          envId: process.env.REACT_APP_EnvId,
          productType: "MICA",
          isFirstTimeUser: true,
          isClaimsLive: false,
        };
        Promise.all([GetOTP(verifyOTP)]).then(async (results) => {
          console.log("OTP Result", results);

          if (results[0] !== null) {
            if (results[0].status === 1) {
              setKYCNoTrue(false);
              setModalOpen(false);
              if (data.PartnerId === "128") setModelopen1(true);
              if (proposalDetails && data.PartnerId !== "128") {
                if (proposalDetails) {
                  GetPaymentURL(
                    partnerDetails.partnerProductId,
                    proposalDetails.proposalNumber,
                    setPaymentData
                  );
                }
              }
            } else {
              setKYCNoTrue(false);
              setModalOpen(false);
              swal({
                icon: "error",
                text: "Please enter the valid OTP sent to your Email",
              });
            }
          } else {
            setKYCNoTrue(false);
            setModalOpen(false);
            swal({
              icon: "error",
              text: "Please enter the valid OTP sent to your Email",
            });
          }
          if (!isCustomer) setEConsent(true);
          setLoading(false);

          // if (data.PartnerId === 128) {
          //   console.log("Inside fetch metod");
          //   <MotorPAYUPayment />;
          // }
          // <MotorPAYUPayment />;
        });
      }
    }
  };

  const handleSubmitForNoCase = async () => {
    const { KYC } = data;
    KYC.FullName = name.FirstName.concat(" ", name.LastName);
    setData((prev) => ({ ...prev, KYC }));
    if (isCustomer) {
      if (data.PartnerId === "62") {
        handleGoKycSubmit();
        // handleGoKycotpverify()
      } else {
        console.log("234567890", data.PartnerId);
        if (
          (data.KYC.isKYCDone === true || data.KYC.isKYCDone === "true"
            ? kycflags.ckycNoFlag === true
            : null) ||
          (data.KYC.isKYCDone === true || data.KYC.isKYCDone === "true"
            ? data.KYC.CKYCNo === ""
            : null) ||
          (data.KYC.isKYCDone === false || data.KYC.isKYCDone === "false"
            ? data.KYC.PANNo === ""
            : null) ||
          data.KYC.DateOfBirth === ""
          // ||
          // (isKyc === "No" && KycPanUpload.name === null)
        ) {
          setKycflags((prevState) => ({ ...prevState, kycErrorFlag: true }));
          swal({
            icon: "error",
            text: "Please fill the required fields",
          });
        } else {
          setKycflags((prevState) => ({ ...prevState, kycErrorFlag: false }));
          await SaveProposal(partnerDetails.partnerProductId, data).then((result) => {
            console.log("1234567890", result);
            const saveResult = result;
            // if (
            //   result.proposalResponse.responseMessage ===
            //   "Dispatcher Conditions Failed for Task : EKYCOM"
            // ) {
            //   swal({
            //     text: "Propsal Service Failed",

            //     icon: "error",
            //   });
            // } else
            // {
            setProposalDetails(saveResult);
            if (saveResult.proposalResponse.finalResult.KYCStatus === "") {
              setKYCNoTrue(true);
              setModalOpen(false);
            } else if (saveResult.proposalResponse.finalResult.KYCStatus !== "") {
              // open failure modal
              setpanNoFalse(true);
            }
            if (result.status === 7) {
              swal({
                icon: "error",
                text:
                  data.PartnerId === "86"
                    ? result.proposalResponse.finalResult.ErrorText
                    : "something went wrong please try after some time",
              }).then(() => {
                setLoading(false);
                navigate("/modules/BrokerPortal/Pages/MotorComparison");
              });
            }
            // }
          });
        }
      }
    } else {
      await SaveProposal(partnerDetails.partnerProductId, data).then((result) => {
        console.log("1234567890", result);
        const saveResult = result;
        setProposalDetails(saveResult);
        if (data.PartnerId === "62") {
          handleeconst();
        } else {
          console.log("1234567890");
          if (saveResult.proposalResponse.finalResult.KYCStatus === "") {
            setKYCNoTrue(true);
            setModalOpen(false);
          } else if (saveResult.proposalResponse.finalResult.KYCStatus !== "") {
            // open failure modal
            setpanNoFalse(true);
          }
        }
        setModalOpen(false);
        if (result.status === 7) {
          swal({
            icon: "error",
            text:
              data.PartnerId === "86"
                ? result.proposalResponse.finalResult.ErrorText
                : "something went wrong please try after some time",
          }).then(() => {
            setLoading(false);
            navigate("/modules/BrokerPortal/Pages/MotorComparison");
          });
        }
      });
    }
  };

  const panModelClose = () => {
    setisKyc("Yes");
    const { KYC } = data;
    KYC.isKYCDone = "true";
    setData((prev) => ({ ...prev, KYC }));
    setpanNoFalse(false);
    swal({
      icon: "error",
      text: "Please enter correct details or retry with alternate KYC options.",
    });
  };

  const handleadharname = (event) => {
    if (event.target.name === "FirstName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          setName((prev) => ({ ...prev, FirstName: event.target.value }));
        }
      }
    } else if (event.target.name === "LastName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          setName((prev) => ({ ...prev, LastName: event.target.value }));
        }
      }
    }
  };

  const [disableRadio, setDisableRadio] = useState(false);
  console.log(disableRadio);
  useEffect(() => {
    if (data.PartnerId === "62") {
      setDisableRadio(true);
    } else {
      setDisableRadio(false);
    }
  }, [data.PartnerId]);
  // const dateFormat = (date) => {
  //   if (date !== null) {
  //     const dateArr = date.split("-");
  //     return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  //   }
  //   return null;
  // };

  return (
    <MDBox>
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={1} justifyContent="center" alignItems="start" height="100%">
          <Modal
            open={modalOpen1}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {/* <MDBox sx={style}> */}
            <MotorPAYUPayment proposalDetails={proposalDetails} />
            {/* </MDBox> */}
          </Modal>
          <Modal
            open={modalOpen}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <OTPModel
              handleOTP={handleOTP}
              otpdata={otpdata}
              handleModalClose={handleModalClose}
              customerDetails={customerDetails}
              handleotpverify={handleotpverify}
              handleModalEmailOpen={handleModalEmailOpen}
              handleEmailchange={handleEmailchange}
              flags={flags}
              MotorPAYUPayment={MotorPAYUPayment}
              timerFlag={timerFlag}
              startCounterFlag={startCounterFlag}
              counter={counter}
            />
          </Modal>
          <Modal
            open={modalEmailOpen}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ChangeEmailModel
              handleEmail={handleEmail}
              otpdata={otpdata}
              handleModalEmailClose={handleModalEmailClose}
              handleEmailchange={handleEmailchange}
              // handleotpverify={handleotpverify}
            />
          </Modal>
          <Modal open={open} onClose={handleClose}>
            <EConsent
              handleClose={handleClose}
              customerDetails={customerDetails}
              partnerDetails={partnerDetails}
            />
          </Modal>
          <Modal
            open={kycNoTrue}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <KYCNoTrue
              customerDetails={customerDetails}
              ProposerDetails={data.ProposerDetails}
              handlePayment={isCustomer ? handlePayment : handleeconst}
              handleModalKYCNoTrue={handleModalKYCNoTrue}
            />
          </Modal>
          <Modal
            open={kycNoFalse}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <KYCNoFalse
              handleSetToNo={handleSetToNo}
              handleModalKYCNoFalse={handleModalKYCNoFalse}
            />
          </Modal>
          <Modal
            open={panNoFalse}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <PanNoFalse
              partnerProductId={partnerDetails.partnerProductId}
              panModelClose={panModelClose}
              proposalDetails={proposalDetails}
              handleModalPanNoFalse={handleModalPanNoFalse}
            />
          </Modal>
          <Modal open={open} onClose={handleClose}>
            <EConsent
              handleClose={handleClose}
              customerDetails={customerDetails}
              partnerDetails={partnerDetails}
            />
          </Modal>
          <Grid container justifyContent="center">
            <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
              <MDTypography sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}>
                {data.PartnerId === "62"
                  ? "Do you have your PAN Number"
                  : "Do you have your CKYC Number"}
              </MDTypography>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ justifyContent: "center", ml: 2.5 }}
                defaultValue="Yes"
                value={isKyc}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="No"
                  disabled={disableRadio}
                />
              </RadioGroup>
            </MDBox>
          </Grid>
          {
            //  CKYCPageUI
          }
          {isKyc === "Yes" ? (
            <>
              <Grid container>
                <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                  {data.PartnerId === "62" ? "PAN Details" : "CKYC Details"}
                </MDTypography>
              </Grid>

              {data.PartnerId === "62" ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    id="PANNo"
                    label={data.CustomerType === "5" ? "PAN Number" : "Company PAN Number"}
                    value={data.KYC.PANNo}
                    name="PANNo"
                    onChange={handleChange}
                    inputProps={{ maxLength: 10 }}
                    required
                    sx={{
                      "& .MuiFormLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    disabled
                    onBlur={handleValidateKYC}
                    error={data.KYC.PANNo === "" ? kycflags.pancardFlag : null}
                  />
                  {kycflags.kycErrorFlag && data.KYC.PANNo === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>{errorText}</MDTypography>
                  ) : null}
                  {kycflags.pancardFlag && data.KYC.PANNo !== "" && data.KYC.PANNo.length < 10 ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill valid PAN Card No
                    </MDTypography>
                  ) : null}
                </Grid>
              ) : (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    id="CKYCNo"
                    label="CKYC Number"
                    value={data.KYC.CKYCNo}
                    name="CKYCNo"
                    onChange={handleChange}
                    inputProps={data.PartnerId === "62" ? { maxLength: 10 } : { maxLength: 14 }}
                    required
                    sx={redAsterisk}
                    onBlur={handleValidateKYC}
                    error={kycflags.ckycNoFlag || (kycflags.kycErrorFlag && data.KYC.CKYCNo === "")}
                    helperText={
                      kycflags.kycErrorFlag && data.KYC.CKYCNo === ""
                        ? errorText
                        : kycflags.ckycNoFlag &&
                          data.KYC.CKYCNo !== "" &&
                          "Please fill valid CKYC No"
                    }
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  disabled
                  input={{
                    label: data.CustomerType === "5" ? "DOB" : "DOI",
                    value: data.KYC.DateOfBirth,
                  }}
                  value={data.KYC.DateOfBirth}
                  onChange={(date, V) => handleDOBChange(date, "DateOfBirth", "DOB", V)}
                  options={{
                    maxDate: data.CustomerType === "5" ? new Date() : "",
                    dateFormat: "d-m-Y",
                    altFormat: "d-m-Y",
                    altInput: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDButton
                  variant="outlined"
                  color="info"
                  // onClick={handleBack}
                  component="label"
                >
                  Upload Photo
                  <input
                    hidden
                    accept="image/bmp, image/jpeg, image/png, .pdf"
                    type="file"
                    onChange={(e) => handleKycFileUpload(e, "Photo")}
                  />
                </MDButton>

                <MDTypography
                  sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                >
                  {KycUploadPhoto != null ? KycUploadPhoto.name : null}
                  {KycUploadPhoto.name != null && (
                    <CancelIcon
                      onClick={() => handleKycDeleteFile("Photo", KycUploadPhoto.name)}
                      color="primary"
                    />
                  )}
                </MDTypography>
              </Grid>
            </>
          ) : (
            <>
              <Grid container spacing={3}>
                <MDTypography
                  variant="h6"
                  sx={{ color: "#0071D9", fontSize: "1.25rem", marginTop: "60px" }}
                >
                  Pan Card Details
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  id="PANNo"
                  label="Pan Card Number"
                  // onChange={handleChange}
                  value={data.KYC.PANNo}
                  name="PANNo"
                  inputProps={{ maxLength: 10 }}
                  disabled
                  required
                  sx={redAsterisk}
                  // onBlur={handleValidateKYC}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  disabled
                  input={{
                    label: "DOB",
                    value: data.KYC.DateOfBirth,
                  }}
                  value={data.KYC.DateOfBirth}
                  onChange={(date, v) => handleDOBChange(date, "DateOfBirth", "DOB", v)}
                  options={{ dateFormat: "d-m-Y", altFormat: "d-m-Y", altInput: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDButton
                  variant="outlined"
                  color="info"
                  // onClick={handleBack}
                  component="label"
                >
                  Upload Pan Card
                  <input
                    hidden
                    accept="image/bmp, image/jpeg, image/png, .pdf"
                    type="file"
                    onChange={(e) => handleKycFileUpload(e, "PAN")}
                  />
                </MDButton>
                <MDTypography
                  sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                >
                  {KycPanUpload != null ? KycPanUpload.name : null}
                  {KycPanUpload.name != null && (
                    <CancelIcon
                      onClick={() => handleKycDeleteFile("PAN", KycPanUpload.name)}
                      color="primary"
                    />
                  )}
                </MDTypography>
              </Grid>
              <Grid container spacing={2}>
                <MDTypography
                  variant="h6"
                  sx={{ color: "#0071D9", fontSize: "1.25rem", marginTop: "60px" }}
                >
                  Other Documents
                </MDTypography>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    value={master.DocumentType}
                    id="DocumentType"
                    options={DocumentType || []}
                    getOptionLabel={(option) => option.mValue}
                    getOptionDisabled={(option) =>
                      option.mValue !== "Aadhar Number" && option.mValue !== "Passport"
                    }
                    disableClearable
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",

                        // marginLeft: "-250px",
                      },
                    }}
                    onChange={handleDocumentTypeDropdown}
                    renderInput={(params) => (
                      <MDInput
                        label="Document Type"
                        // required
                        {...params}
                        // error={
                        //   Object.values(masters.MaritalStatus || {}).every(
                        //     (x) => x === null || x === ""
                        //   )
                        //     ? flags.errorFlag
                        //     : null
                        // }
                      />
                    )}
                  />
                  {/* {flags.errorFlag &&
                      Object.values(masters.MaritalStatus || {}).every(
                        (x) => x === null || x === ""
                      ) ? (
                        <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                          {errorText}
                        </MDTypography>
                      ) : null} */}
                </Grid>
                {master.DocumentType.mValue === "Aadhar Number" ||
                master.DocumentType.mValue === "Voter ID" ||
                master.DocumentType.mValue === "Passport" ||
                master.DocumentType.mValue === "Driving License" ||
                master.DocumentType.mValue === "GSTIN" ? (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      id="Aadhar"
                      // value={}
                      // onChange={}
                      value={data.KYC.OtherDocNumber}
                      onChange={handleKYCDetails}
                      label={`${master.DocumentType.mValue}`}
                      onBlur={handleValidateKycDocuments}
                      required
                      sx={{
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                      name="OtherDocNumber"
                    />
                    {kycflags.kycErrorFlag && data.KYC.OtherDocNumber === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        {errorText}
                      </MDTypography>
                    ) : null}
                    {kycflags.validationError && data.KYC.OtherDocNumber !== "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        {`Please Fill the valid ${master.DocumentType.mValue}`}
                      </MDTypography>
                    ) : null}
                  </Grid>
                ) : null}
                {master.DocumentType.mValue === "Aadhar Number" ? (
                  <>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        value={name.FirstName}
                        onChange={handleadharname}
                        label="First Name"
                        name="FirstName"
                        helperText="Please fill you name as per Aadhar Card"
                        // disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        value={name.LastName}
                        onChange={handleadharname}
                        label="Last Name"
                        name="LastName"
                        helperText="Please fill you name as per Aadhar Card"
                        // disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        id="Gender"
                        value={getValue("Gender", data.ProposerDetails.Gender)}
                        label="Gender"
                        name="Gender"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        id="DateOfBirth"
                        value={data.ProposerDetails.DOB}
                        label="DateOfBirth"
                        name="DateOfBirth"
                        disabled
                      />
                    </Grid>
                  </>
                ) : null}

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDButton
                    variant="outlined"
                    color="info"
                    // onClick={handleBack}
                    component="label"
                  >
                    Upload Document
                    <input
                      hidden
                      accept="image/bmp, image/jpeg, image/png, .pdf"
                      type="file"
                      onChange={(e) => handleKycFileUpload(e, "Document")}
                    />
                  </MDButton>

                  <MDTypography
                    sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                  >
                    {KycDocument != null ? KycDocument.name : null}
                    {KycDocument.name !== null && (
                      <CancelIcon
                        onClick={() => handleKycDeleteFile("Doc", KycDocument.name)}
                        color="primary"
                      />
                    )}
                  </MDTypography>
                </Grid>
              </Grid>
            </>
          )}

          {isCustomer ? (
            <MDButton
              marginTop="30px"
              marginBottom="80px"
              color="info"
              variant="contained"
              sx={{ marginTop: "60px" }}
              onClick={isKyc === "Yes" ? handleSubmit : handleSubmitForNoCase}
            >
              Submit
            </MDButton>
          ) : (
            <MDButton
              marginTop="30px"
              marginBottom="80px"
              color="info"
              variant="contained"
              sx={{ marginTop: "60px" }}
              // sx={{ fontSize: "0.7rem" }}
              onClick={isKyc === "Yes" ? handleSubmit : handleSubmitForNoCase}
            >
              Send E-consent
            </MDButton>
          )}
          {/* <Grid container justifyContent="center">
           
          </Grid> */}
        </Grid>
      )}
    </MDBox>
  );
}

// Payment.defaultProps = {
//   handleNext: {},
// };

// Payment.propTypes = {
//   handleNext: PropTypes.func,
// };

function Payment({ handleNext }) {
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="start" height="100%">
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
        <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
          Confirm your Details
        </MDTypography>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Manufacturing Month" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput label="Year" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={5} xl={5} xxl={5}>
        <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem" }}>
          <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
            Summary
          </MDTypography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                {" "}
                IDV{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                textAlign="right"
                variant="h6"
                sx={{ fontSize: "1rem", color: "#5F5F5F" }}
              >
                {" "}
                ₹ 6,64,050{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                {" "}
                NCB{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                textAlign="right"
                variant="h6"
                sx={{ fontSize: "1rem", color: "#5F5F5F" }}
              >
                {" "}
                20%{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                {" "}
                Plan Type{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                textAlign="right"
                variant="h6"
                sx={{ fontSize: "1rem", color: "#5F5F5F" }}
              >
                {" "}
                1+3 Bundled Policy{" "}
              </MDTypography>
            </Grid>
            <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                variant="body1"
                sx={{ fontSize: "1rem", color: "#5F5F5F", textDecoration: "underline" }}
              >
                {" "}
                Plan Coverage{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                textAlign="right"
                variant="h6"
                sx={{ fontSize: "1rem", color: "#5F5F5F" }}
              >
                {" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                {" "}
                Addon Covers{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                textAlign="right"
                variant="h6"
                sx={{ fontSize: "1rem", color: "#5F5F5F" }}
              >
                {" "}
              </MDTypography>
            </Grid>
            <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                {" "}
                Premium Amount{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                textAlign="right"
                variant="h6"
                sx={{ fontSize: "1rem", color: "#5F5F5F" }}
              >
                {" "}
                ₹ 12,150{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                {" "}
                GST@18%{" "}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                textAlign="right"
                variant="h6"
                sx={{ fontSize: "1rem", color: "#5F5F5F" }}
              >
                {" "}
                + ₹ 2,187{" "}
              </MDTypography>
            </Grid>
            <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                Total Amount
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography
                textAlign="right"
                variant="h6"
                mt={0}
                sx={{ fontSize: "2rem", color: "#0071D9" }}
              >
                {" "}
                ₹ 14,337
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox display="flex" flexDirection="row" alignItems="start">
                <Checkbox />
                <MDTypography variant="body1" color="text" sx={{ fontSize: "0.75rem" }}>
                  I agree to the Terms &amp; Conditions and confirm: my car is not a commercial
                  vehicle, and my car has a valid PUC certificate.
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox display="flex" flexDirection="row" alignItems="start">
                <Checkbox />
                <MDTypography variant="body1" color="text" sx={{ fontSize: "0.75rem" }}>
                  I confirm that I have a valid NCB reserving certificate for the 20% NCB
                  transferred to my new car and that the original certificate will be produced at
                  the time of claim.
                </MDTypography>
              </MDBox>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox display="flex" flexDirection="row" alignItems="start">
                <Checkbox sx={{ mb: "2rem" }} />
                <MDTypography variant="body1" color="text" sx={{ fontSize: "0.75rem" }}>
                  I agree to the Terms &amp; Conditions and confirm: my car is not a commercial
                  vehicle, and my car has a valid PUC certificate.
                </MDTypography>
              </MDBox>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDButton
                size="medium"
                startIcon={<Share />}
                sx={{
                  color: "#1976D2",
                  textSize: "0.87rem",
                  borderRadius: "0.25rem",
                  borderColor: "#1976D2",
                  border: 1,
                  background: "transparent",
                }}
              >
                Share Quote
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDButton sx={{ fontSize: "0.7rem" }} fullWidth onClick={handleNext}>
                Proceed to Payment
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
}

Payment.defaultProps = {
  handleNext: {},
};

Payment.propTypes = {
  handleNext: PropTypes.func,
};

function downloadPDF(pdf, name) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = `${name}.pdf`;

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

function Download({ paymentDetails, handleModalSendEmailOpen, partnerDetails }) {
  console.log("partnerDetails", partnerDetails);
  console.log("paymentDetails1111", paymentDetails);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState();

  // const policyNo = "P0022200002/4111/100222";

  const pdfInput = {
    proposalNo: paymentDetails.ProposalNumber,
    policyNo: paymentDetails.PolicyNumber,
    transactionId: paymentDetails.transID,
    customerId: paymentDetails.CustomerID,
  };

  // const pdfInput = {
  //   proposalNo: "202202100001925",
  //   policyNo,
  //   transactionId: "146833220210",
  //   customerId: "20003421382",
  // };

  const onClick = () => {
    setLoading(true);
    GetPDF(setPdf, pdfInput);
  };
  useEffect(() => {
    getRequest(`Policy/GetPolicyDetailsByNumber?policyNumber=${paymentDetails.PolicyNumber}`).then(
      (result) => {
        console.log("result", result);
        if (result.status === 200) {
          setEmail(result.data.ProposerDetails.EmailId);
        }
      }
    );
  }, []);
  useEffect(() => {
    if (pdf) {
      if (pdf.PdfUrl) {
        setLoading(false);
        window.location.href = pdf.PdfUrl;
      }
      if (pdf.PolicyBase64String) {
        setLoading(false);
        downloadPDF(pdf.PolicyBase64String, paymentDetails.PolicyNumber);
      }
    }
  }, [pdf]);

  useEffect(() => {
    if (paymentDetails.PolicyNumber && Email) {
      const emailDTO = {
        proposalNo: paymentDetails.ProposalNumber,
        policyNo: paymentDetails.PolicyNumber,
        transactionId: paymentDetails.transID,
        customerId: paymentDetails.CustomerID,
        key: paymentDetails.PolicyNumber,
        keyType: "",
        communicationId: 102,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      postRequest(
        `Policy/SendNotification?PolicyNumber=${paymentDetails.PolicyNumber}&EmailId=${Email}`,
        emailDTO
      ).then((result) => {
        console.log("result", result);
      });
    }
  }, [paymentDetails.PolicyNumber, Email]);
  const handleEmail = () => {
    // console.log("PolicyNumber", PolicyNumber, EmailId);
    handleModalSendEmailOpen();
  };

  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", mt: 3, background: "#CEEBFF" }}
      fullwidth
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          {/* <MDBox xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} textAlign="center" sx={{m:"2rem"}}> */}
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
              <MDBox
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                sx={{
                  m: "2rem",
                  display: "flex",
                  backgroundImage: `url(${PaySuccess})`,
                  backgroundSize: "cover",
                  flexDirection: "column",
                  backgroundPosition: "center",
                  textAlign: "center",
                  alignItems: "center",
                  minHeight: "20rem",
                }}
              >
                {/* <MDBox component="img" src={PaySuccess} /> */}

                <MDButton
                  size="large"
                  variant="outlined"
                  color="white"
                  iconOnly
                  circular
                  sx={{ mt: "1.5rem", background: "#00CA72" }}
                >
                  <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                </MDButton>
                <MDTypography
                  variant="h6"
                  sx={{
                    mt: "2rem",
                    fontSize: "1.25rem",
                    textAlign: "center",
                    widht: "100%",
                    color: "#00CA72",
                  }}
                >
                  {" "}
                  Payment Successful
                </MDTypography>
                <MDTypography
                  variant="h6"
                  sx={{ my: "2rem", fontSize: "1rem", textAlign: "center", widht: "100%" }}
                >
                  {" "}
                  Transaction No: {paymentDetails.transID}
                </MDTypography>
                <Grid container sx={{ my: "3rem" }}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      variant="body1"
                      sx={{ mt: "4rem", fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {" "}
                      Amount Paid{" "}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography
                      textAlign="center"
                      variant="body1"
                      sx={{ mt: "4rem", fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      ₹ {paymentDetails.payDetails.paidAmount}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      variant="body1"
                      sx={{ mt: "1rem", fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {" "}
                      Payment Mode{" "}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography
                      textAlign="center"
                      variant="body1"
                      sx={{ mt: "1rem", fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {paymentDetails.payDetails.paymentMode}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid container spacing={4} sx={{ mt: "2rem" }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="body1" mt={0} sx={{ fontSize: "1.9rem" }}>
                {" "}
                Here is your policy
              </MDTypography>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDBox display="flex" flexDirection="row" sx={{ mt: "1rem" }}>
                <FileDownloadOutlined sx={{ color: "#0071D9" }} />
                <MDTypography
                  variant="body1"
                  sx={{ fontSize: "1rem", color: "#0071D9", mx: "1rem" }}
                >
                  {" "}
                  Download Quote
                </MDTypography>
              </MDBox>
            </Grid> */}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDAvatar
                src={
                  images[
                    paymentDetails.payDetails.partnerDetails &&
                    paymentDetails.payDetails.partnerDetails.partnerName
                      ? paymentDetails.payDetails.partnerDetails.partnerName
                      : paymentDetails.payDetails.partnerName
                  ]
                }
                // src={images[paymentDetails.payDetails.partnerDetails.partnerName]}
                size="logo"
                variant="square"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", mt: "1rem" }}>
                {" "}
                {paymentDetails.payDetails.companyName}
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", mt: "1rem" }}>
                {" "}
                Plan type :
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem", mt: "1rem" }}>
                {" "}
                {paymentDetails.payDetails.planType}
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", mt: "1rem" }}>
                {" "}
                Policy No. :
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem", mt: "1rem" }}>
                {" "}
                {paymentDetails.PolicyNumber}
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDButton
                color="white"
                sx={{
                  mt: "1rem",
                  background: "transparent",
                  border: 1,
                  color: `${primary.main}`,
                  fontSize: "small",
                }}
                // onClick={() => {
                //   handleEmail(paymentDetails.PolicyNumber, Email);
                // }}
                onClick={handleEmail}
              >
                <MailOutlined sx={{ mr: "0.5rem" }} /> EMail
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDBox sx={{ mt: "1rem", alignItems: "center", display: "flex" }}>
                <MDButton onClick={onClick} fullwidth>
                  Download Policy
                </MDButton>
                {loading && <CircularProgress size="1.5rem" sx={{ ml: "1rem" }} />}
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

function Failure({ paymentDetails }) {
  const [paymentData, setPaymentData] = useState();
  const buildForm = ({ action, params }) => {
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
    return form;
  };

  const post = (details) => {
    const formdata = {
      action: details.PaymentURL,
      params: details.InputJson,
    };
    const form = buildForm(formdata);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  const retrypayment = () => {
    if (paymentDetails) {
      GetPaymentURL(
        paymentDetails.payDetails.productID,
        paymentDetails.payDetails.proposalNo,
        setPaymentData
      );
    }
  };

  useEffect(() => {
    if (paymentData) {
      if (paymentData.OutputResult.InputJson) {
        post(paymentData.OutputResult);
      } else {
        const paymentURL = paymentData.OutputResult.PaymentURL;
        window.location.href = paymentURL;
      }
    }
  }, [paymentData]);
  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", mt: 3, background: "#CEEBFF" }}
      fullwidth
    >
      <Grid container>
        {/* <MDBox xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} textAlign="center" sx={{m:"2rem"}}> */}
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDBox
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              sx={{
                m: "2rem",
                display: "flex",
                backgroundImage: `url(${PaySuccess})`,
                backgroundSize: "cover",
                flexDirection: "column",
                backgroundPosition: "center",
                textAlign: "center",
                alignItems: "center",
                minHeight: "20rem",
              }}
            >
              {/* <MDBox component="img" src={PaySuccess} /> */}
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                {" "}
                <MDAvatar
                  src={images[paymentDetails.payDetails.partnerName]}
                  size="logo"
                  variant="square"
                />{" "}
              </Grid>

              <MDButton
                size="large"
                variant="outlined"
                color="white"
                iconOnly
                circular
                sx={{ mt: "1.5rem", background: "#ff0000" }}
              >
                <Icon sx={{ fontWeight: "bold" }}>close</Icon>
              </MDButton>
              <MDTypography
                variant="h6"
                sx={{
                  mt: "2rem",
                  fontSize: "1.25rem",
                  textAlign: "center",
                  widht: "100%",
                  color: "#ff0000",
                }}
              >
                {" "}
                Payment Failed
              </MDTypography>

              <Grid container sx={{ my: "3rem" }}>
                {" "}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {" "}
                  <MDTypography
                    variant="h6"
                    sx={{ mt: "5rem", fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    Transaction No:{" "}
                  </MDTypography>{" "}
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  {" "}
                  <MDTypography
                    textAlign="center"
                    variant="body1"
                    sx={{ mt: "5rem", fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {paymentDetails.transID}{" "}
                  </MDTypography>{" "}
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {" "}
                  <MDTypography
                    variant="body1"
                    sx={{ mt: "1rem", fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    Amount to be Paid:{" "}
                  </MDTypography>{" "}
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  {" "}
                  <MDTypography
                    textAlign="center"
                    variant="body1"
                    sx={{ mt: "1rem", fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    ₹ {paymentDetails.payDetails.paidAmount}{" "}
                  </MDTypography>{" "}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  display="flex"
                  justifyContent="center"
                >
                  <MDButton color="info" onClick={retrypayment} sx={{ width: "auto", mt: "1rem" }}>
                    Retry Payment
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

function ShareQuote({
  handleClose,
  setDisabled,
  checked,
  handleChecked,
  partnerDetails,
  EmailId,
  quoteProposalOutput,
}) {
  const handleClick = async (quoteNumber) => {
    // handleClose();
    setDisabled(false);
    const shareQuoteDTO = {
      proposalNo: "",
      policyNo: "",
      transactionId: "",
      customerId: "",
      key: quoteNumber,
      keyType: "quoteNumber",
      communicationId: 103,
      referenceId: quoteProposalOutput.finalResult.PartnerId,
      ICPDF: true,
      ISDMS: false,
    };
    await postRequest(
      `Policy/SendNotification?PolicyNumber=${""}&EmailId=${EmailId}`,
      shareQuoteDTO
    ).then((result) => {
      console.log("result1", result);
    });
    handleClose();
  };
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Card sx={{ backgroundColor: "#FFFFFF", borderRadius: "0rem", boxShadow: "unset" }}>
        <MDBox justifyContent="end" display="flex" sx={{ width: "100%" }}>
          <Icon fontSize="medium" sx={{ mt: "1rem", mx: "1rem" }} onClick={handleClose}>
            close
          </Icon>
        </MDBox>
        <MDBox justifyContent="center" display="flex" sx={{ px: "2rem" }}>
          <MDTypography>Share Quotation</MDTypography>
        </MDBox>
        <MDBox justifyContent="center" display="flex" flexDirection="row">
          <MDBox
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="row"
            sx={{ p: "1rem" }}
          >
            <Checkbox color="secondary" checked={checked.checkEmail} onClick={handleChecked} />
            <MDButton
              disableRipple
              variant="text"
              sx={{
                minWidth: "0",
                color: "#000000",
                textSize: "0.87rem",
                border: "none",
                background: "transparent",
                p: "0",
                // width: "287px",
              }}
            >
              Email
            </MDButton>
          </MDBox>
          <MDBox
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="row"
            sx={{ p: "1rem" }}
          >
            <Checkbox color="secondary" disabled />
            <MDButton
              disableRipple
              variant="text"
              sx={{
                minWidth: "0",
                color: "#000000",
                textSize: "0.87rem",
                border: "none",
                background: "transparent",
                p: "0",
              }}
              disabled
            >
              SMS
            </MDButton>
          </MDBox>
          {/* <MDBox
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="row"
            sx={{ p: "1rem" }}
          >
            <Checkbox color="secondary" disabled />
            <MDButton
              disableRipple
              variant="text"
              sx={{
                minWidth: "0",
                color: "#000000",
                textSize: "0.87rem",
                border: "none",
                background: "transparent",
                p: "0",
              }}
              disabled
            >
              WhatsApp
            </MDButton>
          </MDBox> */}
        </MDBox>
        <MDBox justifyContent="center" display="flex" sx={{ p: "2rem" }} fullwidth>
          <MDButton
            onClick={() => handleClick(partnerDetails.quoteNumber)}
            sx={{ width: "auto", fontSize: "0.7rem" }}
            disabled={checked.Buttoondisableflag}
          >
            Share Quote
          </MDButton>
        </MDBox>
      </Card>
    </MDBox>
  );
}

ShareQuote.defaultProps = {
  handleClose: {},
  setDisabled: {},
};

ShareQuote.propTypes = {
  handleClose: PropTypes.func,
  setDisabled: PropTypes.func,
};

function ProposalQuote({ setCurrPage }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState({
    checkEmail: false,
    checkSMS: false,
    checkWhattsapp: false,
    Buttoondisableflag: true,
  });

  const handleOpen = () => {
    setChecked((prevState) => ({
      ...prevState,
      Buttoondisableflag: true,
    }));
    console.log();
    setOpen(true);
  };
  const [EmailId, setEmailId] = useState("");

  const handleClose = () => {
    setChecked((prevState) => ({
      ...prevState,
      checkEmail: false,
      checkSMS: false,
      checkWhattsapp: false,
      Buttoondisableflag: false,
    }));
    setOpen(false);
  };

  const [plan, setPlan] = useState(false);
  const handlePlanOpen = () => setPlan(true);
  const handlePlanClose = () => setPlan(false);

  const [addon, setAddon] = useState(false);
  const handleAddonOpen = () => setAddon(true);
  const handleAddonClose = () => setAddon(false);

  const [disabled, setDisabled] = useState(true);
  const [coveredData, setCoveredData] = useState();
  const [planData, setPlanData] = useState([]);

  const [controller] = useDataController();
  const { partnerDetails, userSelection, quoteProposalOutput, quickQuoteInput } = controller;
  const { premiumResult } = partnerDetails || {};
  const { IDV } = premiumResult || {};
  // console.log("qwerto", userSelection);
  const { navigateToOtherPage } = controller;
  const navigate = useNavigate();

  useEffect(() => {
    if (window.performance) {
      // console.log("refresh", performance.navigation.type);
      const POSPSales = localStorage.getItem("POSPSales");
      if (
        performance.navigation.type === 1 &&
        navigateToOtherPage === null &&
        partnerDetails === null &&
        premiumResult === undefined
      ) {
        console.log("This page is reloaded");
        if (POSPSales === "POSP") {
          navigate("/modules/BrokerPortal/Login/BPLogin");
        } else {
          navigate("/modules/BrokerPortal/Pages/CustomerLanding");
        }
      } else {
        console.log("This page is not reloaded");
      }
    }
  }, []);

  // console.log("quoteProposalOutput",quoteProposalOutput);
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const [premiumData, setPremiumData] = useState({
    gst: 0,
    premium: 0,
  });
  useEffect(() => {
    if (premiumResult) {
      const sgst = premiumResult.SGST ? Number(premiumResult.SGST.replace("INR", "")) : 0;
      const cgst = premiumResult.CGST ? Number(premiumResult.CGST.replace("INR", "")) : 0;
      const igst = premiumResult.IGST ? Number(premiumResult.IGST.replace("INR", "")) : 0;
      const gst = premiumResult.GST
        ? Number(premiumResult.GST.replace("INR", ""))
        : sgst + cgst + igst;

      const prem = premiumResult.FinalPremium
        ? Number(premiumResult.FinalPremium.replace("INR", ""))
        : 0;
      setPremiumData((prevState) => ({ ...prevState, gst, premium: prem - gst }));
    }
  }, [premiumResult]);

  let addonData = [];
  let addOnPremiumData = [];
  let addOnPremiumDataRemoveInr = [];
  if (premiumResult) {
    addonData = premiumResult.CoverPremium.map((cover) =>
      cover.CoverType === "Add-On Covers" &&
      cover.CoverPremium > "0" &&
      userSelection.AddOns.some((y) => y.mValue === cover.CoverName) &&
      cover.CoverName
        ? cover.CoverName
        : null
    );
    addOnPremiumData = premiumResult.CoverPremium.map((cover) =>
      cover.CoverType === "Add-On Covers" &&
      cover.CoverPremium > "0" &&
      userSelection.AddOns.some((y) => y.mValue === cover.CoverName) &&
      cover.CoverPremium
        ? cover.CoverPremium
        : null
    );
    addOnPremiumDataRemoveInr = addOnPremiumData.map((item) => {
      if (item !== null) {
        const premium = item.replace("INR", "");
        const removeINR = premium.indexOf("") >= 0 ? premium.trim("") : premium;
        return removeINR;
      }
      return null;
    });
    // console.log("addonData", addonData);
  }
  useEffect(() => {
    setCoveredData(null);
    const partnerCode = partnerDetails ? partnerDetails.partnerProductCode : null;
    CoveredNotCoveredData(setCoveredData, partnerCode, "Whats Covered");
  }, [partnerDetails !== null]);
  useEffect(() => {
    if (coveredData) {
      const newValue = coveredData.map((cover) => cover.name);
      setPlanData(newValue);
    }
  }, [coveredData]);

  useEffect(() => {
    const quoteNumber = partnerDetails ? partnerDetails.quoteNumber : null;
    getRequest(`Quotation/GetQuoteDetailsByNumber?QuoteNo=${quoteNumber}`).then((result) => {
      // console.log("result2", result);
      if (result.status === 200) {
        const Json = result.data.quoteJson;
        const ParsedJson = JSON.parse(Json);
        setEmailId(
          ParsedJson.CustomerType === "5"
            ? ParsedJson.CustomerDetails.email
            : ParsedJson.CorporateDetails.email
        );
      }
    });
  }, [partnerDetails]);
  useEffect(() => {
    if (quoteProposalOutput === null || undefined) {
      setLoading(true);
    } else setLoading(false);
  }, [quoteProposalOutput]);

  // console.log("Proposal quote", partnerDetails);

  const handleClick = () => {
    // GetProposalDetails(dispatch, partnerDetails.quoteNumber, partnerDetails.partnerName);
    setCurrPage("ProposalForm");
  };

  const handleProposalInCustomerFlow = async () => {
    setCurrPage("ProposalForm");
    const shareQuoteDTO = {
      proposalNo: "",
      policyNo: "quoteNumber",
      transactionId: "",
      customerId: "",
      key: partnerDetails.quoteNumber,
      keyType: "",
      communicationId: 103,
      referenceId: quoteProposalOutput.finalResult.PartnerId,
      ICPDF: true,
      ISDMS: false,
    };
    await postRequest(
      `Policy/SendNotification?PolicyNumber=${""}&EmailId=${EmailId}`,
      shareQuoteDTO
    ).then((result) => {
      console.log("result1", result);
    });
  };

  const handleChecked = () => {
    setChecked((prevState) => ({ ...prevState, checkEmail: !checked.checkEmail }));
  };

  useEffect(() => {
    if (quickQuoteInput.POSPInfo.isPOSP === "true") {
      if (checked.checkEmail === true) {
        setChecked((prevState) => ({
          ...prevState,
          Buttoondisableflag: false,
        }));
      } else {
        setChecked((prevState) => ({
          ...prevState,
          Buttoondisableflag: true,
        }));
      }
    } else if (checked.checkEmail === true) {
      setChecked((prevState) => ({
        ...prevState,
        Buttoondisableflag: false,
      }));
    }
  }, [checked.checkEmail]);

  const handleClickBack1 = () => {
    navigate(`/modules/BrokerPortal/Pages/MotorComparison`);
  };

  return (
    <PageLayout>
      <BPNavbar />
      <MDBox display="flex" flexDirection="row" sx={{ pt: "3rem", pl: "3rem" }}>
        <KeyboardBackspace sx={{ mt: 2 }} />
        <MDTypography
          variant="body1"
          sx={{ fontSize: 13, cursor: "pointer", mt: 2 }}
          onClick={handleClickBack1}
        >
          Back
        </MDTypography>
      </MDBox>

      <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4, mt: 1 }}>
        <Modal open={open} onClose={handleClose}>
          <ShareQuote
            handleClose={handleClose}
            setDisabled={setDisabled}
            checked={checked}
            handleChecked={handleChecked}
            partnerDetails={partnerDetails}
            EmailId={EmailId}
            quoteProposalOutput={quoteProposalOutput}
          />
        </Modal>
        <Modal open={plan} onClose={handlePlanClose}>
          <FeatureList1 handleClose={handlePlanClose} data={planData} title="Plan Feature List" />
        </Modal>
        <Modal open={addon} onClose={handleAddonClose}>
          <FeatureList
            handleClose={handleAddonClose}
            data={addonData}
            title="Add-on Covers"
            addOnPremiumData={addOnPremiumDataRemoveInr}
          />
        </Modal>
        <Card
          position="inline"
          sx={{ borderRadius: "0", background: "transparent", boxShadow: "unset", mb: 4 }}
        >
          {quickQuoteInput ? <DetailsPanel /> : null}
        </Card>

        {/* <Footer dark /> */}
        {loading ? (
          // <Loading />
          <CircularProgress size="1.7rem" sx={{ ml: "50%" }} />
        ) : (
          <Card sx={{ backgroundColor: "#FFFFFF", p: "2rem" }}>
            <Grid container spacing={1} justifyContent="center" alignItems="start" height="100%">
              <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                <MDAvatar
                  src={partnerDetails ? images[partnerDetails.partnerName] : null}
                  size="logo"
                  variant="square"
                />
                <Grid container spacing="1rem" sx={{ mt: "1rem" }}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDAvatar src={tag} size="lg" variant="square" />
                    <MDTypography sx={{ fontSize: "1rem" }}>Affordable Premium</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDAvatar src={carAccident} size="lg" variant="square" />
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Personal Accident to Owner Driver
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDAvatar src={garage} size="lg" variant="square" />
                    <MDTypography sx={{ fontSize: "1rem" }}>Strong Network of Garages</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDAvatar src={puzzle} size="lg" variant="square" />
                    <MDTypography sx={{ fontSize: "1rem" }}>Useful Add-On Covers</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDAvatar src={carCrash} size="lg" variant="square" />
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Accidental Damage to Vehicle
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDAvatar src={bonus} size="lg" variant="square" />
                    <MDTypography sx={{ fontSize: "1rem" }}>No Claim Bonus</MDTypography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={5} xl={5} xxl={5}>
                <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem" }}>
                  <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                    Summary
                  </MDTypography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Quote No
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {partnerDetails ? partnerDetails.quoteNumber : null}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        IDV
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {formatter.format(IDV)}
                      </MDTypography>
                    </Grid>
                    {quickQuoteInput.BusinessType === "6" ? (
                      <>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                            NCB
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography
                            textAlign="right"
                            variant="h6"
                            sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                          >
                            {/* {userSelection.NCB.mValue} */}
                            {partnerDetails.premiumResult.NCB !== ""
                              ? partnerDetails.premiumResult.NCB
                              : "0"}
                          </MDTypography>
                        </Grid>
                      </>
                    ) : null}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Plan Type
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {userSelection.PlanType.mValue}
                      </MDTypography>
                    </Grid>
                    <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Plan Coverage
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        onClick={handlePlanOpen}
                        sx={{ fontSize: "0.87rem", color: "#0071D9", textDecoration: "underline" }}
                      >
                        View
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Addon Covers ({addonData.filter((x) => x !== null).length})
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        onClick={handleAddonOpen}
                        sx={{ fontSize: "0.87rem", color: "#0071D9", textDecoration: "underline" }}
                      >
                        View
                      </MDTypography>
                    </Grid>
                    <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Premium Amount
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {" "}
                        {formatter.format(premiumData.premium)}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        GST@18%
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        + {formatter.format(premiumData.gst)}
                      </MDTypography>
                    </Grid>
                    <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Total Amount
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        mt={0}
                        sx={{ fontSize: "2rem", color: "#0071D9" }}
                      >
                        {formatter.format(premiumData.gst + premiumData.premium)}
                      </MDTypography>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDButton
                        size="medium"
                        startIcon={<Share />}
                        onClick={handleOpen}
                        color="white"
                        sx={{
                          // color: "#1976D2",
                          textSize: "0.87rem",
                          borderRadius: "0.25rem",
                          borderColor: "#1976D2",
                          border: 1,
                          background: "transparent",
                        }}
                        // disabled
                      >
                        Share Quote
                      </MDButton>
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      {quickQuoteInput.POSPInfo.isPOSP !== "true" ? (
                        <MDButton
                          size="medium"
                          startIcon={<Share />}
                          // onClick={handleOpen}
                          color="white"
                          sx={{
                            // color: "#1976D2",
                            textSize: "0.87rem",
                            borderRadius: "0.25rem",
                            borderColor: "#1976D2",
                            border: 1,
                            background: "transparent",
                          }}
                          // disabled
                          disabled={disabled}
                        >
                          Share Quote
                        </MDButton>
                      ) : (
                        <MDButton
                          size="medium"
                          startIcon={<Share />}
                          onClick={handleOpen}
                          color="white"
                          sx={{
                            // color: "#1976D2",
                            textSize: "0.87rem",
                            borderRadius: "0.25rem",
                            borderColor: "#1976D2",
                            border: 1,
                            background: "transparent",
                          }}
                          // disabled
                          // disabled={disabled}
                        >
                          Share Quote
                        </MDButton>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      xxl={6}
                      justifyContent="end"
                      display="flex"
                    >
                      {quickQuoteInput.POSPInfo.isPOSP !== "true" ? (
                        <MDButton
                          sx={{ width: "auto", fontSize: "0.7rem" }}
                          onClick={handleProposalInCustomerFlow}
                        >
                          Proceed to Proposal
                        </MDButton>
                      ) : (
                        <MDButton
                          disabled={disabled}
                          sx={{ width: "auto", fontSize: "0.7rem" }}
                          onClick={handleClick}
                        >
                          Proceed to Proposal
                        </MDButton>
                      )}
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </Card>
        )}
      </MDBox>
    </PageLayout>
  );
}
ProposalQuote.defaultProps = {
  setCurrPage: {},
};

ProposalQuote.propTypes = {
  setCurrPage: PropTypes.func,
};
function MotorProposal() {
  const { search } = useLocation();
  const [data, setData] = useState({
    BaseProductCode: "",
    BusinessType: "",
    PolicyType: "",
    VehicleType: "",
    CoverDetails: {
      AddOnsPlanApplicable: "",
      AddOnsPlanApplicableDetails: {
        PlanName: "Optional Add on",
        ZeroDepreciation: "",
        ReturnToInvoice: "",
        RoadSideAssistance: "",
        NCBProtection: "",
        InconvenienceAllowance: "",
        EngineProtector: "",
        KeyReplacement: "",
        LossOfPerBelongings: "",
      },
      BasicODApplicable: "Y",
      BasicTPApplicable: "Y",
      CompulsoryExcessAmount: "1000",
      FinancierDetails: {
        AgreementType: "",
        BranchName: "",
        CityCode: "",
        CityName: "",
        DistrictCode: "",
        DistrictName: "",
        FinancierAddress: "",
        FinancierCode: "",
        FinancierName: "",
        FinBusinessType: "",
        LoanAccountNumber: "",
        Pincode: "",
        PincodeLocality: "",
        StateCode: "",
        StateName: "",
      },
      FinancierDetailsApplicable: "",
      ImposedExcessAmount: "",
      IsPrevPolicyApplicable: "",
      OptionalCoverageApplicable: "true",
      OptionalCoverageDetails: {
        ApprovedAntiTheftDevice: "false",
        CertifiedbyARAI: "true",
        ElectricalApplicable: "false",
        ElectricalDetails: "",
        ExternalCNGkitApplicable: "false",
        ExternalCNGLPGkitDetails: "",
        ExternalLPGkitApplicable: "false",
        "FiberFuelTankApplicable ": "false",
        FiberFuelTankDetails: "",
        GeographicalExtensionApplicable: "false",
        GeographicalExtensionDetails: "",
        InbuiltCNGkitApplicable: "false",
        InbuiltLPGkitApplicable: "false",
        IsVehicleforHandicappedApplicable: "false",
        LLEmployeesApplicable: "false",
        LLEmployeesDetails: "",
        LLPaidDriverCleanerApplicable: "false",
        LLPaidDriverCleanerDetails: "",
        NamedPACoverApplicable: "false",
        NamedPACoverDetails: "",
        NonElectricalApplicable: "false",
        NonElectricalDetails: "",
        PAPaidDriverApplicable: "false",
        PAPaidDriverDetails: "",
        TheftAccessoriesApplicable: "false",
        TheftAccessoriesDetails: "",
      },
      PAOwnerCoverApplicable: "true",
      PAOwnerCoverDetails: {
        DoNotHoldValidDrvLicense: "false",
        ExistingPACover: "false",
        Ownmultiplevehicles: "false",
        PAOwnerSI: "1500000",
        PAOwnerTenure: "3",
        ValidDrvLicense: "true",
      },
      VoluntaryExcessAmount: "0",
    },
    PolicyEffectiveFromDate: "",
    PolicyEffectiveFromHour: "",
    PolicyEffectiveToDate: "",
    PolicyEffectiveToHour: "",
    PolicyTerm: "",
    ProposalDate: "",
    QuotationNo: "",
    VehicleDetails: {
      ChassisNumber: "",
      EngineNumber: "",
      IDVofVehicle: "",
      MakeId: "",
      ModelId: "",
      MonthOfManufacture: "",
      RegistrationDate: "",
      RegistrationNumber: "",
      RegistrationNumber1: "",
      RegistrationNumber2: "",
      RegistrationNumber3: "",
      RegistrationNumber4: "",
      RTOId: "",
      VariantId: "",
      VehicleOwnerShip: "",
      YearOfManufacture: "",
    },
    PreviousPolicyDetails: {
      previousPolicyExpiryDate: "",
      PreviousInsurerapplicable: "",
      PreviousPolicyNumber: "",
      previousInsurerCompanyCode: "",
      previousPolicyNumber: "",
      NoPreviousPolicyHistory: "",
      isVehicleNew: "",
      PreviousPolicyEndDate: "",
      PreviousPolicyInsurerName: "",
      PreviousPolicyStartDate: "",
      previousPolicyType: "1",
      PreviousNCBPercentage: "",
      PreviousPolicyTenure: "",
      ClaimOnPreviousPolicy: "false",
      NoOfClaims: "",
      IsInspectionDone: "",
      InspectionDoneByWhom: "",
      ReportDate: "",
      InspectionDate: "",
    },
    POSPInfo: {
      isPOSP: "",
      pospName: "",
      pospUniqueNumber: "",
      pospLocation: "",
      pospPanNumber: "",
      pospAadhaarNumber: "",
      pospContactNumber: "",
    },
    PartnerId: null,
    ChannelDetails: {
      CustomerType: "",
      BusineeChannelType: "",
      BusinessSource: "",
      EntityRelationShipCode: "",
      EntityRelationShipName: "",
      ChannelNumber: "",
      DisplayOfficeCode: "",
      OfficeCode: "",
      OfficeName: "",
      IntermediaryCode: "",
      IntermediaryName: "",
      BusinessSourceType: "",
      SPCode: "",
      SPName: "",
    },
    ProposerDetails: {
      CustomerType: "",
      CustomerFirstName: "",
      CustomerLastName: "",
      ContactNo: "",
      Nationality: "",
      Salutation: "",
      EmailId: "",
      DOB: null,
      Gender: "",
      MaritalStatus: "",
      OccupationCode: "",
      PanNo: "",
      AnnualIncome: "",
      GSTNumber: "",
      Pincode: "",
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrictId: "",
        StateId: "",
        CountryId: "",
        Pincode: "",
      },
      PermanentAddressSameAsCommunication: "",
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrictId: "",
        CountryId: "",
        StateId: "",
        Pincode: "",
      },
      RegistrationAddressSameAsCommunication: "",
      RegistrationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrictId: "",
        CountryId: "",
        StateId: "",
        Pincode: "",
      },
      RegistrationAddressSameAsPermanent: "",
    },
    NomineeDetails: [
      {
        NomineeFirstName: "",
        NomineeLastName: "",
        NomineeDOB: "",
        NomineeAge: "",
        NomineeRelationWithProposer: "",
        PercentageOfShare: "",
        GuardianName: "",
        GuardianDOB: "",
        RelationshoipWithGuardian: "",
        Title: "",
      },
    ],
    KYC: {
      isKYCDone: "",
      GSTDetails: "",
      OtherDocID: "",
      OtherDocValue: "",
      OtherDocNumber: "",
      CKYCNo: "",
      CKYCId: "",
      DateOfBirth: "",
      Photo: "",
      PANNo: "",
      FullName: "",
    },
  });
  // const [controller] = useDataController();
  // const { navigateToOtherPage } = controller;
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (window.performance) {
  //     console.log("refresh", performance.navigation.type);
  //     if (performance.navigation.type === 1 && navigateToOtherPage === null) {
  //       console.log("This page is reloaded");
  //       navigate("/modules/BrokerPortal/Pages/CustomerLanding");
  //     } else {
  //       console.log("This page is not reloaded");
  //     }
  //   }
  // }, []);

  const [paymentDetails, setPaymentDetails] = useState({
    transID: "",
    paymentStatus: "",
    PolicyNumber: "",
    ProposalNumber: "",
    CustomerID: "",
    PaymentRefNo: "",
    step: 0,
    pageState: "",
    payDetails: {
      partnerName: "",
      policyNo: "",
      paidAmount: "",
      planType: "",
      transID: "",
      paymentStatus: "",
      proposalNumber: "",
      paymentMode: "",
      companyName: "",
      paymentDetailsPanel: {},
    },
    rtoName: "",
  });

  const [currPage, setCurrPage] = useState("");
  const [step, setStep] = useState(0);
  const [VariantDetails, setVariantDetails] = useState({});
  const vehicleTypeFromLS = localStorage.getItem("VehicleType");
  let vehicleType;
  if (vehicleTypeFromLS === "TW") {
    vehicleType = "TW";
    console.log("TW", vehicleType);
  } else if (vehicleTypeFromLS === "FW") {
    vehicleType = "PvtCar";
  } else if (vehicleTypeFromLS === "GCV") {
    vehicleType = "PvtCar";
  } else if (vehicleTypeFromLS === "PCV") {
    vehicleType = "PvtCar";
  }

  useEffect(async () => {
    const pageState = new URLSearchParams(search).get("pageState");
    const stepNum = new URLSearchParams(search).get("step");
    // const quoteNumber = new URLSearchParams(search).get("QuoteNumber");

    const transID = new URLSearchParams(search).get("transID");
    const paymentStatus = new URLSearchParams(search).get("paymentStatus");
    const PolicyNumber = new URLSearchParams(search).get("PolicyNumber");
    const ProposalNumber = new URLSearchParams(search).get("ProposalNumber");
    const CustomerID = new URLSearchParams(search).get("CustomerId");
    const PaymentRefNo = new URLSearchParams(search).get("PaymentRefNo");

    setCurrPage(pageState || "ProposalQuote");
    setStep(stepNum);

    setPaymentDetails((prevState) => ({
      ...prevState,
      transID,
      paymentStatus,
      PolicyNumber,
      ProposalNumber,
      CustomerID,
      PaymentRefNo,
    }));
    if (PaymentRefNo !== null) {
      const paydetails = await getRequest(
        `Policy/GetTransactionDetails?TransactionNumber=${PaymentRefNo}`
      );
      setPaymentDetails((prevState) => ({
        ...prevState,
        payDetails: { ...paydetails.data },
      }));

      console.log("paydetails", paydetails);
      const variant = paydetails.data.paymentDetailsPanel.variantId;
      const jsonValue = {
        Variant_id: variant,
      };
      await postRequest(
        `Product/GetProdPartnermasterData?ProductId=449&PartnerId=0&MasterType=${"VariantDetails"}`,
        jsonValue
      ).then((result) => {
        console.log("VariantDetails", result);
        setVariantDetails(result.data[0]);
      });

      const jsonValueRto = {
        RTONumber: "",
      };
      await postRequest(
        `Product/GetProdPartnermasterData?ProductId=449&PartnerId=0&MasterType=${"RTO"}`,
        jsonValueRto
      ).then((results) => {
        // console.log("result", results);
        const rtoId = paydetails.data.paymentDetailsPanel.rto;
        const rto = results.data.filter((item) => item.mID === rtoId)[0].mValue;
        setPaymentDetails((prevState) => ({ ...prevState, rtoName: rto }));
      });
    }
  }, []);
  const [controller, dispatch] = useDataController();
  useEffect(() => {
    setvehicleEditButton(dispatch, false);
  }, []);
  const { customerDetails } = controller;
  if (false) console.log("customerDetails11", customerDetails);
  const { KYC } = controller;
  if (false) console.log("KYCDATA", KYC);
  const [sendData, setsendData] = useState({
    Email: "",
    errorflag: false,
  });

  const handlesendEmail = (event) => {
    setsendData((prevState) => ({
      ...prevState,
      errorFlag: false,
      Email: event.target.value,
    }));
  };

  const [modalSendEmailOpen, setSendModalEmailOpen] = useState(false);

  const handleModalSendEmailOpen = () => {
    sendData.Email = "";
    setSendModalEmailOpen(true);
  };

  const handleModalsendEmailClose = () => {
    sendData.Email = "";
    setSendModalEmailOpen(false);
  };

  const handleEmailsend = async (payDetails, EmailId) => {
    // console.log("PolicyNumber", payDetails.PolicyNumber, EmailId);
    if (sendData.Email === "") {
      setsendData((prevState) => ({ ...prevState, errorflag: true }));
    } else {
      setsendData((prevState) => ({ ...prevState, errorflag: false }));
      const emailDTO = {
        proposalNo: paymentDetails.ProposalNumber,
        policyNo: paymentDetails.PolicyNumber,
        transactionId: paymentDetails.transID,
        customerId: paymentDetails.CustomerID,
        key: paymentDetails.PolicyNumber,
        keyType: "",
        communicationId: 102,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      await postRequest(
        `Policy/SendNotification?PolicyNumber=${payDetails.PolicyNumber}&EmailId=${EmailId}`,
        emailDTO
      ).then((result) => {
        console.log("result", result);
        if (result.status === 200) {
          handleModalsendEmailClose();
          swal({
            icon: "success",
            text: `Email sent successfully to ${EmailId}`,
          });
        }
      });
    }
  };

  function Getvehicle({ VehicleType }) {
    console.log("key1", VehicleType);
    if (VehicleType === "193") {
      return "GCV";
    }
    if (VehicleType === "194") {
      return "PCV";
    }
    if (VehicleType === "16") {
      return "Private Car";
    }
    if (VehicleType === "17") {
      return "Two wheeler";
    }
    return null;
  }

  // console.log("paydetails", paydetails);

  // console.log("backURL obtained", quoteNumber, pageState, step, paymentDetails);

  if (currPage === "ProposalQuote") {
    return <ProposalQuote setCurrPage={setCurrPage} />;
  }
  if (currPage === "ProposalForm") {
    return (
      <PageLayout background="white">
        <BPNavbar />
        <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4, mt: 7 }}>
          <Modal
            open={modalSendEmailOpen}
            // onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <SendEmailModel
              handlesendEmail={handlesendEmail}
              sendData={sendData}
              paymentDetails={paymentDetails}
              handleModalsendEmailClose={handleModalsendEmailClose}
              handleEmailsend={handleEmailsend}
              // handleotpverify={handleotpverify}
            />
          </Modal>
          <Card
            position="inline"
            sx={{ borderRadius: "0", background: "transparent", boxShadow: "unset" }}
          >
            {paymentDetails.paymentStatus === null ? (
              <DetailsPanel />
            ) : (
              <Grid container>
                {VariantDetails && VariantDetails.Make_Name && (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography variant="h6" sx={{ fontSize: 24, textTransform: "capitalise" }}>
                      {VariantDetails.Make_Name} {VariantDetails.Model_Name}{" "}
                      {VariantDetails.Variant_Name} ({VariantDetails.Cubic_Capacity} cc)
                    </MDTypography>
                    <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                        {/* {paymentDetails.payDetails.paymentDetailsPanel.vehicleType === "16"
                        ? "Private Car"
                        : "Two wheeler"} */}
                        <Getvehicle
                          VehicleType={paymentDetails.payDetails.paymentDetailsPanel.vehicleType}
                        />
                      </MDTypography>
                      <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                        {"\u2B24"}
                      </MDTypography>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                        {paymentDetails.payDetails.paymentDetailsPanel.yearOfManufacture}
                      </MDTypography>
                      <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                        {"\u2B24"}
                      </MDTypography>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                        {VariantDetails.Fuel_Type}
                      </MDTypography>
                      <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                        {"\u2B24"}
                      </MDTypography>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                        {paymentDetails.rtoName}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                    {paymentDetails.payDetails.paymentDetailsPanel.name}
                  </MDTypography>

                  <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {paymentDetails.payDetails.paymentDetailsPanel.mobileNo}
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                      {"\u2B24"}
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {paymentDetails.payDetails.paymentDetailsPanel.email}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                    {paymentDetails.payDetails.paymentDetailsPanel.previousPolicyInsurerName}
                  </MDTypography>
                  <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {paymentDetails.payDetails.paymentDetailsPanel.previousPolicyNumber}
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                      {"\u2B24"}
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {paymentDetails.payDetails.paymentDetailsPanel.previousPolicyEndDate}
                    </MDTypography>
                  </MDBox>
                </Grid>
              </Grid>
            )}
          </Card>
        </MDBox>
        <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4 }}>
          <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
            <HorizontalLinearStepper
              stepPar={step}
              paymentDetails={paymentDetails}
              handleModalSendEmailOpen={handleModalSendEmailOpen}
              data={data}
              setData={setData}
            />
          </Card>
        </MDBox>
        {/* <Footer dark /> */}
      </PageLayout>
    );
  }
  if (currPage === "")
    return (
      <MDBox>
        <Loading />
      </MDBox>
    );
}
function Timer({ counter }) {
  // const timer = count > 0 && setInterval(() => setCounter(count - 1), 1000);
  // return () => clearInterval(timer);
  return <div>Resend OTP in 00:{counter}</div>;
}

function OTPModel({
  handleOTP,
  otpdata,
  handleotpverify,
  handleModalClose,
  customerDetails,
  handleModalEmailOpen,
  handleEmailchange,
  flags,
  timerFlag,
  counter,
  startCounterFlag,
}) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalClose} />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="body1"
              sx={{
                textAlign: "center",
                fontSize: "1rem",
                color: "#000000",
                marginTop: "40px",
              }}
            >
              {" "}
              Enter the otp sent to {otpdata.Email !== "" ? otpdata.Email : customerDetails.Email}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ marginTop: "27px" }}>
            <OtpInput
              value={otpdata.otp}
              onChange={handleOTP}
              numInputs={6}
              isInputNum
              hasErrored
              isInputSecure
              inputStyle={{
                width: "48px",
                height: "48px",
                margin: "0.85rem",
                fontSize: "1rem",
                borderRadius: 4,
                border: "2px solid rgba(0,0,0,0.3)",
                background: "white",
              }}
            />
          </Grid>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                variant="body1"
                onClick={handleModalEmailOpen}
                sx={{
                  textAlign: "left",
                  fontSize: "1rem",
                  color: "#0071D9",
                  // marginLeft: "-253px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {" "}
                Change Email
              </MDTypography>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {flags.otpValidationFlag === true && (
                <MDTypography
                  sx={{
                    color: "green",
                    fontSize: "0.875rem",
                    textAlign: "left",
                    // marginLeft: "-253px",
                  }}
                >
                  OTP sent succesfully!
                </MDTypography>
              )}
            </Grid> */}
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              {flags.status === true ? (
                <MDTypography
                  sx={{
                    color: "green",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  OTP sent succesfully!
                </MDTypography>
              ) : null}
              <MDTypography
                sx={{
                  fontSize: "0.9rem",
                  color: "green",
                  textAlign: "left",
                  // mt: "1rem",
                }}
              >
                {startCounterFlag && <Timer counter={counter} />}
              </MDTypography>
            </Grid>

            <Grid item xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
              <Stack direction="row" justifyContent="space-between">
                <MDTypography
                  onClick={handleEmailchange}
                  sx={{
                    color: "#0071D9",
                    fontSize: "1.10rem",
                    textDecoration: "underline",
                    // mr: "2rem",
                    // ml: "2rem",
                    cursor: "pointer",
                  }}
                >
                  {/* Resend&nbsp;OTP */}
                  {timerFlag === true ? <div>Resend OTP</div> : <div>Resend OTP</div>}
                </MDTypography>
                <MDButton
                  onClick={handleotpverify}
                  sx={{
                    fontSize: "0.7rem",
                  }}
                >
                  Proceed
                </MDButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
function ChangeEmailModel({ handleEmail, otpdata, handleModalEmailClose, handleEmailchange }) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalEmailClose} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ marginTop: "72px", margingLeft: "11px" }}
        >
          <MDInput
            id="Email"
            value={otpdata.Email}
            name="Email"
            onChange={handleEmail}
            // onBlur={handleValidate}
            label="Email"
          />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            sx={{ marginRight: "27px", marginTop: "75px" }}
          >
            <Grid container justifyContent="flex-end">
              <MDButton
                onClick={handleEmailchange}
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                Get OTP
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function SendEmailModel({
  handlesendEmail,
  sendData,
  handleModalsendEmailClose,
  handleEmailsend,
  paymentDetails,
}) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalsendEmailClose} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ marginTop: "72px", margingLeft: "11px" }}
        >
          <MDTypography
            variant="body1"
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              color: "#000000",
              marginTop: "40px",
            }}
          >
            Enter the Email
          </MDTypography>

          <MDInput
            id="Email"
            value={sendData.Email}
            name="Email"
            onChange={handlesendEmail}
            // onBlur={handleValidate}
            label="Email"
          />
          {sendData.errorflag === true && sendData.Email === "" ? (
            <MDTypography
              sx={{
                fontSize: "0.9rem",
                color: "red",
                textAlign: "left",
                mr: "2.5rem",
              }}
            >
              This field is required
            </MDTypography>
          ) : null}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            sx={{ marginRight: "27px", marginTop: "75px" }}
          >
            <Grid container justifyContent="flex-end">
              <MDButton
                onClick={() => {
                  handleEmailsend(paymentDetails, sendData.Email);
                }}
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                SEND EMAIL
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default MotorProposal;
