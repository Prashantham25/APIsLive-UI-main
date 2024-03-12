import { useState } from "react";
import { Grid, Card } from "@mui/material";
// import CarIcon from "assets/images/BrokerPortal/iNube/Car.png";
import BikeIcon from "assets/images/BrokerPortal/iNube/Bike.png";
import HealthIcon from "assets/images/BrokerPortal/iNube/health.png";
import TravelIcon from "assets/images/BrokerPortal/iNube/Travel.png";
// import LifeIcon from "assets/images/BrokerPortal/iNube/Termlife.png";
// import FireIcon from "assets/images/BrokerPortal/iNube/Fire.png";
// import GCVIcon from "assets/images/BrokerPortal/iNube/GCV.png";
// import PCVIcon from "assets/images/BrokerPortal/iNube/PCV.png";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";

import CustomerMotorQuote from "../Motor/Quote";
import CustomerHealthQuote from "../Health/Quote";
import CustomerTravelQuote from "../Travel/Quote";
import MDButton from "../../../../../components/MDButton";
// import CustomerLifeQuote from "../Life/Quote";

const cardStyle = {
  width: "11.37rem",
  height: "6.875rem",
  border: "2px solid rgba(112, 112, 112, 0.3)",
  borderRadius: "0.5rem",
  m: 1,
  backgroundColor: "#DEEFFD",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#0087FF",
    cursor: "pointer",
  },
};

const boxStyle = {
  m: 1,
  p: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
};

const typoStyle = {
  mt: "0.75rem",
  color: "#000000",
  fontSize: "0.875rem",
  textTransform: "uppercase",
  weight: "500",
};

const products = [
  // { name: "Car Insurance", image: CarIcon },
  { name: "Bike Insurance", image: BikeIcon },
  { name: "Travel Insurance", image: TravelIcon },
  { name: "Health Insurance", image: HealthIcon },
  //   { name: "PCV", image: PCVIcon },
  //   { name: "GCV", image: GCVIcon },
  //   { name: "Fire", image: FireIcon },
  //   { name: "Term Life", image: LifeIcon },
];

function CustomerDemoLandingPage() {
  const [product, setProduct] = useState("");

  const openProd = (item) => {
    setProduct(item.name);
  };
  const onBackToLanding = () => {
    setProduct("");
  };

  return (
    <MDBox>
      {product !== "" && (
        <MDButton variant="text" onClick={onBackToLanding}>
          Back to Landing Page
        </MDButton>
      )}
      {product === "" && (
        <MDBox p={3}>
          <MDTypography variant="h1" textAlign="center">
            Get a Quick Quote
          </MDTypography>
          <MDTypography textAlign="center">
            You choose , we will help you to get the best plans at the right prices
          </MDTypography>

          <Grid container display="flex" flexDirection="row" justifyContent="center">
            {products.map((item) => (
              <Card sx={cardStyle}>
                <MDBox sx={boxStyle} onClick={() => openProd(item)}>
                  <MDAvatar src={item.image} size="lg" variant="square" sx={{ mx: "3.2rem" }} />
                  <MDTypography verticalAlign="middle" variant="body1" sx={typoStyle}>
                    {item.name}
                  </MDTypography>
                </MDBox>
              </Card>
            ))}
          </Grid>
        </MDBox>
      )}
      {(product === "Car Insurance" ||
        product === "Bike Insurance" ||
        product === "PCV" ||
        product === "GCV") && <CustomerMotorQuote />}
      {product === "Health Insurance" && <CustomerHealthQuote />}
      {product === "Travel Insurance" && <CustomerTravelQuote />}
      {/* {product === "Term Life" && <CustomerLifeQuote />} */}
    </MDBox>
  );
}

export default CustomerDemoLandingPage;
