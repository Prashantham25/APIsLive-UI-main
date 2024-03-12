import { useState } from "react";
import { Grid, Paper, Stack } from "@mui/material";
import CarIcon from "assets/images/BrokerPortal/iNube/Car.png";
import BikeIcon from "assets/images/BrokerPortal/iNube/Bike.png";
import HealthIcon from "assets/images/BrokerPortal/iNube/health.png";
import TravelIcon from "assets/images/BrokerPortal/iNube/Travel.png";
import LifeIcon from "assets/images/BrokerPortal/iNube/Termlife.png";
import FireIcon from "assets/images/BrokerPortal/iNube/Fire.png";
import GCVIcon from "assets/images/BrokerPortal/iNube/GCV.png";
import PCVIcon from "assets/images/BrokerPortal/iNube/PCV.png";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";

import CustomerMotorQuote from "../Motor/Quote";
import CustomerHealthQuote from "../Health/Quote";
import CustomerTravelQuote from "../Travel/Quote";
// import MDButton from "../../../../../components/MDButton";
import CustomerLifeQuote from "../Life/Quote";

import GetQuote from "./GetQuote";
import CallAgent from "./CallAgent";
import ClientSpeak from "./ClientSpeak";
import HowWorks from "./HowWorks";
import FAQ from "./FAQ";
import BpFooter from "../../../../BrokerPortal/Layouts/BPFooter";

const paperStyle = {
  display: "flex",
  alignItem: "center",
  justifyContent: "center",
  bgcolor: "#fafafa",
  height: "120px",
  p: 2,
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#bbdefb",
    cursor: "pointer",
  },
};

const typoStyle = {
  mt: "0.75rem",
  color: "#000000",
  fontSize: "0.875rem",
  textTransform: "uppercase",
  weight: "500",
};

const products = [
  { name: "Car", image: CarIcon, VehicleType: "PvtCar", VehicleTypeID: 16 },
  { name: "Bike", image: BikeIcon, VehicleType: "TW", VehicleTypeID: 17 },
  { name: "PCV", image: PCVIcon, VehicleType: "PCV", VehicleTypeID: 194 },
  { name: "GCV", image: GCVIcon, VehicleType: "GCV", VehicleTypeID: 193 },
  { name: "Travel", image: TravelIcon, VehicleType: "" },
  { name: "Health", image: HealthIcon, VehicleType: "" },
  { name: "Fire", image: FireIcon, VehicleType: "" },
  { name: "Term Life", image: LifeIcon, VehicleType: "" },
];

function CustomerLandingPage() {
  const [product, setProduct] = useState("");
  const [VehicleType, setVehicleType] = useState("");

  const openProd = (item) => {
    setProduct(item.name);
    setVehicleType(item);
  };
  // const onBackToLanding = () => {
  //   setProduct("");
  // };

  return (
    <MDBox sx={{ bgcolor: "#ffffff" }}>
      {/* {product !== "" && (
        <MDButton variant="text" onClick={onBackToLanding}>
          Back to Landing Page
        </MDButton>
      )} */}
      {product === "" && (
        <MDBox pl="15%" pr="15%">
          <Grid container spacing={5} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h1" textAlign="center">
                Get a Quick Quote
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography textAlign="center">
                You choose , we will help you to get the best plans at the right prices
              </MDTypography>
            </Grid>
            {products.map((item) => (
              <Grid item xs={6} sm={3} md={3} lg={3} xl={3} xxl={3}>
                <Paper elevation={24} sx={paperStyle} onClick={() => openProd(item)}>
                  <Stack spacing={1}>
                    <MDAvatar src={item.image} size="lg" variant="square" sx={{ mx: "3.2rem" }} />
                    <MDTypography variant="h6" sx={typoStyle}>
                      {item.name}
                    </MDTypography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      )}
      {product === "" && (
        <Stack spacing={4} mt={5}>
          {[<GetQuote />, <FAQ />, <CallAgent />, <ClientSpeak />, <HowWorks />].map((x, i) => (
            <MDBox sx={{ p: 3, bgcolor: i % 2 !== 0 ? "#f5f5f5" : "#ffffff" }}>{x}</MDBox>
          ))}
          <BpFooter />
        </Stack>
      )}
      {(product === "Car" || product === "Bike" || product === "PCV" || product === "GCV") && (
        <CustomerMotorQuote VehicleType={VehicleType} />
      )}
      {product === "Health" && <CustomerHealthQuote />}
      {product === "Travel" && <CustomerTravelQuote />}{" "}
      {product === "Term Life" && <CustomerLifeQuote />}
    </MDBox>
  );
}

export default CustomerLandingPage;
