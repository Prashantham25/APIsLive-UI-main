import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Modal } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";

import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import AdminDashBoard from "modules/BrokerPortal/Pages/Admin/AppLication/AdminDashBoard";
import Stack from "@mui/material/Stack";
import interviewschedule from "../../../../../assets/images/BrokerPortal/POSPAAdded.png";
import MDButton from "../../../../../components/MDButton";
import MDAvatar from "../../../../../components/MDAvatar";

const steps = ["Review", "Interview", "Trainings", "User Previlages"];

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/modules/BrokerPortal/Pages/Admin/AppLication`);
  };
  return (
    <div>
      <MDButton onClick={handleOpen}>Add Agent</MDButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <MDBox pt={20} pl={60}>
              <MDBox
                p={4}
                sx={{
                  background: "#FFFFFF",
                  height: "505px",
                  width: "834px",
                  borderRadius: "0px",
                }}
              >
                <Grid container spacing={1}>
                  <MDAvatar
                    src={interviewschedule}
                    sx={{ width: "142px", height: "198px", mx: "20rem" }}
                    variant="square"
                  />
                  <Grid xs={12} textAlign="center" mt={1}>
                    <MDTypography font-family="Roboto" fontSize="28px">
                      Agent Added Successfully.
                    </MDTypography>
                  </Grid>
                  <br />
                  <Grid xs={12} textAlign="center" mt={3}>
                    <MDButton onClick={onClick} pb={90} variant="contained">
                      View Agents
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Typography>
        </MDBox>
      </Modal>
    </div>
  );
}

function POSPAAdded() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  // const isStepOptional = (step) => step === 1;

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
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/modules/BrokerPortal/Pages/Admin/AppLication/UserPrevilages`);
  };

  //   const handleSkip = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //     setSkipped((prevSkipped) => {
  //       const newSkipped = new Set(prevSkipped.values());
  //       newSkipped.add(activeStep);
  //       return newSkipped;
  //     });

  return (
    <Grid container>
      <Grid item md={2.5} l={9.5}>
        <AdminDashBoard />
      </Grid>
      <Grid item md={9.5} l={9.5}>
        <MDBox pt={3}>
          <Accordion
            defaultExpanded
            disableGutters
            sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
          >
            <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4 }}>
              {/* <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}> */}
              <MDBox sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    // }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <MDBox sx={{ flex: "1 1 auto" }} />
                      {/* <MDButton onClick={onClick}>Proceed</MDButton> */}
                    </MDBox>
                  </fragment>
                ) : (
                  <fragment>
                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                    <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <MDButton onClick={handleNext} color="white">
                        {activeStep === steps.length - 1 ? "Finish" : ""}
                      </MDButton>
                    </MDBox>
                  </fragment>
                )}
              </MDBox>
              {/* </Card> */}
            </MDBox>

            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.125rem" }}>
                Agent Basic Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="Application No" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="First Name" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="Last name" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="Title" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="Email Address" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="Mobile Number" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDButton justifyContent="flex-end" startIcon={<ArrowForwardIcon />}>
                    <BasicModal />
                  </MDButton>
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
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                <MDTypography variant="h4" sx={{ color: "#0071D9", fontSize: "1.125rem" }}>
                  Interview Details
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                <MDTypography
                  variant="h4"
                  startIcon={<ArrowForwardIcon />}
                  sx={{
                    display: "flex",
                    flexDirection: "Right",
                    color: "#0071D9",
                    fontSize: "1.125rem",
                  }}
                >
                  Schedule Interview
                </MDTypography>
              </Grid>
            </AccordionSummary>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ background: "#F5F5F5" }}>
              <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Interview Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />} sx={{ background: "#F5F5F5" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="Interview date" type="date" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="Interview Time" type="time" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="Interviewer" />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput label="Interview Status" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="Additional Info" option="Remarks can be added here." />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="Interview Remarks" option="Interview Remarks comes here." />
                </Grid>
              </Grid>
            </AccordionDetails>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Stack direction="row" spacing={2}>
                <MDButton sx={{ color: "#F44336", fontSize: "1.125rem" }} color="white">
                  Reject
                </MDButton>

                <MDButton
                  sx={{ color: "#2E7D32", fontSize: "1.125rem" }}
                  startIcon={<ArrowForwardIcon />}
                  color="white"
                >
                  save
                </MDButton>

                <MDButton
                  onClick={onClick}
                  variant="contained"
                  color="success"
                  justifyContent="flex-end"
                  sx={{ mt: "2rem" }}
                  startIcon={<ArrowForwardIcon />}
                >
                  Proceed
                </MDButton>
              </Stack>
            </AccordionSummary>
          </Accordion>
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default POSPAAdded;
