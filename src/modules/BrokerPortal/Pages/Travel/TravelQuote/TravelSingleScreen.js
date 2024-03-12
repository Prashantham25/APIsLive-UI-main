import { Grid } from "@mui/material";
import TravelBG from "assets/images/BrokerPortal/Travel/TravelBG.png";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
// import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
// import MDButton from "../../../../../components/MDButton";

import Destination from "./Destination";
// import Medical from "./Medical";
// import TravelDate from "./TravelDate";
// import Travellers from "./Travellers";
// import { data } from "../data/JsonData";
// import { useDataController, setTravellerInsuranceDetails } from "../../../context";

function TravelSingleScreen() {
  //   const [controller] = useDataController();
  //   const { TravellerInsuranceDetails } = controller;

  return (
    <Grid container>
      <MDBox>
        <BPNavbar />
      </MDBox>
      <MDBox component="img" src={TravelBG} sx={{ width: "100%" }} mt="2rem" />
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography className="text" textAlign="center" variant="h4" mt="-12rem">
          <h4>GET Travel Insurance to your Trip in Minutes..!!</h4> <br />
          <small> Compare and Buy customised Travel Plans </small>
          <br />
          <h5>Please give below details to get the Best quotes</h5>
        </MDTypography>
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="-3rem"> */}
      <Grid container mt="1rem">
        <Grid item md={12} lg={12} xl={12} xxl={12}>
          <MDTypography className="text" textAlign="center" variant="h5">
            Basic Trip details
          </MDTypography>
        </Grid>
      </Grid>
      <Destination />
      {/* <TravelDate
        TravellerInsuranceDetails={TravellerInsuranceDetails}
        setTravellerInsuranceDetails={setTravellerInsuranceDetails}
      /> */}
      {/* <Travellers
        TravellerInsuranceDetails={TravellerInsuranceDetails}
        setTravellerInsuranceDetails={setTravellerInsuranceDetails}
      />
      <Medical
        TravellerInsuranceDetails={TravellerInsuranceDetails}
        setTravellerInsuranceDetails={setTravellerInsuranceDetails}
      /> */}
    </Grid>
  );
}
export default TravelSingleScreen;
