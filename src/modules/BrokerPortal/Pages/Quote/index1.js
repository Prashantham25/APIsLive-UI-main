import { useEffect, useState } from "react";
import { Grid, Stack, Card, StepLabel, Step, Stepper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton";

import { getProductSteps, getStepContent } from "./data/index1";
import { useDataController } from "../../context";
import RenderControlV1 from "../../../../Common/RenderControl/RenderControlV1";

function GetStepContent({ prod, activeStep }) {
  console.log("prod", prod, "activeStep", activeStep);
  const spacing = 6;
  const dataArr = getStepContent(prod, activeStep);
  return (
    <Grid container display="flex" spacing={1.5}>
      {dataArr.map((item) =>
        item.visible ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={item.spacing ? item.spacing : spacing}
            lg={item.spacing}
            xl={item.spacing}
            xxl={item.spacing}
          >
            <RenderControlV1 item={item} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

function HorizontalLinearStepper({ prod }) {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const steps = getProductSteps(prod);
  console.log("prod", prod, "steps", steps);
  const onNext = () => {
    setActiveStep(activeStep + 1);
  };
  const onBack = () => {
    if (activeStep === 0) {
      navigate(`/Quote?prod=${prod}`);
    } else setActiveStep(activeStep - 1);
  };
  return (
    <MDBox sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          console.log(index);
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
            {/* <MDButton onClick={handleReset}>Reset</MDButton> */}
          </MDBox>
        </>
      ) : (
        <GetStepContent activeStep={activeStep} prod={prod} />
      )}
      {steps.length !== activeStep && (
        <MDBox sx={{ display: "flex", justifyContent: "space-between" }} p={2}>
          <MDBox>
            <MDButton onClick={onBack} variant="outlined">
              Back
            </MDButton>
          </MDBox>
          <Stack direction="row" spacing={2}>
            <MDButton variant="outlined" onClick={onNext}>
              Proceed
            </MDButton>
          </Stack>
        </MDBox>
      )}
    </MDBox>
  );
}

function QuoteDetails() {
  const [control] = useDataController();
  const { genericInfo } = control;
  const [prod, setProd] = useState("");
  useEffect(() => {
    if (genericInfo.prod) setProd(genericInfo.prod);
  }, [genericInfo]);
  return (
    <Card>
      <Stack spacing={2} p={2}>
        <HorizontalLinearStepper prod={prod} />
      </Stack>
    </Card>
  );
}
export default QuoteDetails;
