import React, { useState, useEffect } from "react";
import { Card, Grid, Grow } from "@mui/material";
// import PageLayout from "examples/LayoutContainers/PageLayout";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import Car from "assets/images/Nepal/Car.png";
import Car from "assets/images/Gifs/carinsurance1.gif";
// import Bike from "assets/images/Nepal/Bike.png";
import Bike from "assets/images/Gifs/bikeinsurance.gif";
import Health from "assets/images/Gifs/healthcare1.gif";
import Travel from "assets/images/Gifs/travel1.gif";
import Marine from "assets/images/Gifs/marine1.gif";
// import Agri from "assets/images/Nepal/Agri.png";
// import Property from "assets/images/Nepal/Property.png";
import Property from "assets/images/Gifs/property2.gif";
import { useNavigate } from "react-router-dom";
import MDButton from "../../../../../components/MDButton";
// import NepalNavbar from "./NepalNavbar";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../BrokerPortal/context";
import { policyDto } from "../Products/NBRetail/data/NBTravelJson";

const cardStyle = {
  width: "11.37rem",
  height: "9rem",
  border: "2px solid rgba(112, 112, 112, 0.3)",
  borderRadius: "1.5rem",
  m: 1,
  backgroundColor: "white",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#b0a9a9",
    cursor: "pointer",
    width: "12.37rem",
    height: "8.875rem",
    textAlign: "center",
    border: "2px solid rgba(112, 112, 112, 0.3)",
    borderRadius: "2.5rem",
  },
};

// const boxStyle = {
//   m: 1,
//   p: 1,
//   display: "flex",
//   flexDirection: "column",
//   width: "100%",
//   alignItems: "center",
// };

const typoStyle = {
  mt: "0.75rem",
  color: "#000000",
  fontSize: "0.875rem",
  textTransform: "uppercase",
  weight: "500",
};

function AllRetailDemoLandingPage() {
  const Navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [DemoProduct, setDemoProduct] = useState("");
  useEffect(() => {
    // debugger;
    if (localStorage.getItem("DemoProduct") !== null) {
      setDemoProduct(localStorage.getItem("DemoProduct"));
    }
  }, []);

  useEffect(() => {
    // debugger;
    setFlag(false);
    setDemoProduct(localStorage.getItem("DemoProduct"));
  }, [localStorage.getItem("DemoProduct")]);

  useEffect(() => {
    // debugger;
    if (DemoProduct !== localStorage.getItem("DemoProduct")) {
      setFlag(false);
    } else {
      setTimeout(() => {
        setFlag(true);
      }, 200);
    }
  }, [DemoProduct]);
  const [control, dispatch] = useDataController();
  const { genericInfo, genericPolicyDto } = control;
  const products = [
    {
      label: "Travel Retail",
      prod: "NBTravel",
      image: Travel,
      url: "/retail",
      lob: "Travel",
    },
    {
      label: "Travel Group",
      prod: "GroupTravel",
      image: Travel,
      url: "/Travel/GroupTravel",
      lob: "Travel",
    },
    { label: "Two Wheeler", prod: "MotorCycle", image: Bike, url: "/retail", lob: "Motor" },
    { label: "Private Car", prod: "PrivateCar", image: Car, url: "/newRetail", lob: "Motor" },
    { label: "Health", prod: "Magma", image: Health, url: "/retail", lob: "Health" },
    // { label: "BGR", prod: "BGR", image: Property, url: "/Home/BGR", lob: "Property" },
    {
      label: "Bharath Griha Raksha",
      prod: "Liberty",
      image: Property,
      url: "/Home/LibertyHome",
      lob: "Property",
    },
    {
      label: "Marine",
      prod: "SpecificVoyage",
      image: Marine,
      url: "/Marine/SpecificVoyage",
      lob: "Marine",
    },

    { label: "BLUS", prod: "BLUS", image: "", url: "/Home/BLUS", lob: "Commercial" },
    { label: "BSUS", prod: "BLUS", image: "", url: "/Home/BLUS", lob: "Commercial" },
    {
      label: "Business Shield Sookshma Udyam",
      prod: "ShopKeeper",
      image: "",
      url: "/BusinessShield/ShopKeeper",
      lob: "Commercial",
    },
  ];

  const openProd = (prodName, prodLabel, url) => {
    if (prodName === "NBTravel") setGenericPolicyDto(dispatch, { ...policyDto });
    if (
      prodName === "SpecificVoyage" ||
      prodName === "BGR" ||
      prodName === "BLUS" ||
      prodName === "GroupTravel"
    ) {
      console.log("");
    } else {
      setGenericInfo(dispatch, { ...genericInfo, prod: prodName, prodLabel });
    }
    Navigate(url);
  };
  const onConsoleDto = () => {
    console.log("genericPolicyDto", genericPolicyDto);
    console.log("genericInfo", genericInfo);
  };
  useEffect(() => {
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});
  }, []);
  return (
    <MDBox>
      <MDButton variant="text" onClick={onConsoleDto}>
        Console PolicyDto
      </MDButton>
      <Card>
        <Grid container p={2} spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              className="text"
              textAlign="Center"
              variant="h6"
              sx={{ fontSize: "1.55rem", m: 1 }}
              // mt="2rem"
            >
              Simplifying the way you sell insurance
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography className="text" textAlign="Center" sx={{ fontSize: "1.15rem", m: 1 }}>
              Your customer’s Insurance Plan is Just a Click Away
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography className="text" textAlign="Center" sx={{ fontSize: "0.95rem", m: 1 }}>
              Select a product to generate quick quote
            </MDTypography>
          </Grid>
        </Grid>
        <Grow in={flag} style={{ transformOrigin: "0 0 0" }} {...(flag ? { timeout: 1000 } : {})}>
          <Grid container display="flex" flexDirection="row" justifyContent="center">
            {products.map((item) =>
              item.lob === localStorage.getItem("DemoProduct") && flag === true ? (
                <Card sx={cardStyle}>
                  <MDBox onClick={() => openProd(item.prod, item.label, item.url)}>
                    <MDAvatar
                      src={item.image}
                      size="lg"
                      sx={{ mx: "3.2rem", height: 80, width: 80 }}
                    />
                    <MDTypography verticalAlign="middle" variant="body1" sx={typoStyle}>
                      {item.label}
                    </MDTypography>
                    {/* <MDAvatar src={item.image} size="lg" sx={{ width: 90, height: 70 }} /> */}
                  </MDBox>
                </Card>
              ) : null
            )}
          </Grid>
        </Grow>
      </Card>
    </MDBox>
  );
}

export default AllRetailDemoLandingPage;
