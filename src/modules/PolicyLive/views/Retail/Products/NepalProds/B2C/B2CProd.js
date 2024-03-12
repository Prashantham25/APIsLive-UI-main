import { Grid, Card } from "@mui/material";
import B2CImg from "assets/images/Nepal/B2C.png";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import StepperV2 from "../../../Layout/StepperV2";
import Navbar from "./B2CNavBar";

function B2CProd() {
  return (
    <PageLayout>
      <Card>
        <Navbar />
        <Grid container spacing={3}>
          <Grid item container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <MDBox component="img" src={B2CImg} width="100%" height="40%" />
            </Grid>
            <Grid item>
              <StepperV2 />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </PageLayout>
  );
}
export default B2CProd;
