// import MobileStepper from "@mui/material/MobileStepper";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import MDTypography from "../../../../../../components/MDTypography";

export default function StepperWithCountLabel({ steps, activeStep }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
        <Slider
          value={(100 * (activeStep + 1)) / steps}
          sx={{
            "& .MuiSlider-thumb": {
              height: 0,
              width: 0,
            },
            "& .MuiSlider-track": {
              height: 8,
            },
          }}
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
        <MDTypography>{`${activeStep + 1} / ${steps}`}</MDTypography>
        {/* <MobileStepper
          variant="text"
          steps={steps}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1, bgcolor: "#ffffff" }}
        /> */}
      </Grid>
    </Grid>
  );
}
