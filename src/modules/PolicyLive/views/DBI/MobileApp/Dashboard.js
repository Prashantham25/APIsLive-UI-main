import { useEffect, useState } from "react";
import { IconButton, Stack, Grid, CircularProgress, Switch, Divider, Radio } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

import HatchCar from "assets/images/Cars/hatchBack/hatchLeft.jpg";
import sedanCar from "assets/images/Cars/sedan/sedanLeft.jpg";
import suvCar from "assets/images/Cars/suv/suvLeft.jpg";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
// import MDButton from "../../../../../components/MDButton";

function CircularProgressWithLabel({ value }) {
  return (
    <MDBox sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={value} />
      <MDBox
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDTypography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

const wArr = ["S", "M", "T", "W", "T", "F", "S"];
const CarImg = [HatchCar, sedanCar, suvCar];

function CarDetails({ img, data }) {
  const [delFlg, setDelFlg] = useState(true);
  const onDelete = () => {
    setDelFlg(false);
  };
  return (
    <MDBox>
      {delFlg ? (
        <Grid container spacing={2} p={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <img src={img} alt="" width="100%" />{" "}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography textAlign="center">{data["Vehicle Number"]}</MDTypography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" pl={3} pr={3} columnSpacing={2}>
              <CircularProgressWithLabel value={75} />
              <MDBox>
                <MDTypography textAlign="center">1 Claim on this vehicle</MDTypography>
                <MDTypography textAlign="center">SI Balance – 2,30,000</MDTypography>
              </MDBox>
            </Stack>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <Stack direction="row" pl={3} pr={3} columnSpacing={2}>
                <MDTypography textAlign="center">Insurance Cover</MDTypography>
                <Switch defaultChecked color="error" />
              </Stack>
            </MDBox>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <MDBox sx={{ border: "1px solid" }} textAlign="center" m={0.2}>
              <MDTypography textAlign="center">Select your cover</MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <MDBox sx={{ border: "1px solid" }} textAlign="center" m={0.2}>
              <MDTypography textAlign="center">RSA</MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <Stack direction="row">
                {wArr.map((x) => (
                  <MDBox>
                    <Radio />
                    <MDTypography>{x}</MDTypography>
                  </MDBox>
                ))}
              </Stack>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton variant="text" onClick={onDelete}>
                Delete this vehicle
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} p={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <img src={img} alt="" width="100%" />{" "}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography textAlign="center">This vehicle will be deleted</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography textAlign="center">
              Your premium is recalculated to Rs/- 15 per day from Rs 18/- per day
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography textAlign="center">Your SI will remain the same</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton variant="outlined">Confirm Deletion</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}

function Dashboard({ polDto }) {
  // const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleStepChange = (step) => {
  //   setActiveStep(step);
  // };
  useEffect(() => {
    if (polDto !== "") setMaxSteps(polDto.InsurableItem[1].RiskItems.length);
  }, []);

  return (
    <MDBox>
      {polDto !== "" && (
        <MDBox>
          <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton disabled={activeStep === 0} onClick={handleBack}>
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton disabled={activeStep === maxSteps - 1} onClick={handleNext}>
              <KeyboardArrowRight />
            </IconButton>
          </Stack>
          {polDto.InsurableItem[1].RiskItems.map((x, i) => (
            <MDBox>{i === activeStep && <CarDetails img={CarImg[i]} data={x} />}</MDBox>
          ))}
        </MDBox>
      )}
    </MDBox>
  );
}
export default Dashboard;
