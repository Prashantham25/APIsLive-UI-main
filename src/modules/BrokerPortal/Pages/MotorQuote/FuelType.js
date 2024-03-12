import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import colors from "../../../../assets/themes/bptheme/base/colors";
import EditLine from "./EditLine";

const { primary } = colors;

function CarFuel({ fuel, setPageState, onFuelClick }) {
  const handleClick = () => {
    onFuelClick(fuel);
    setPageState("Year");
  };
  return (
    <Card
      onClick={() => handleClick()}
      sx={{
        width: "13.18rem",
        height: "3.75rem",
        border: "0.5px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "0.25rem",
        textAlign: "left",
        justifyContent: "center",
        display: "flex",
        p: "1rem",
        "&:hover": {
          backgroundColor: `${primary.main}`,
          cursor: "pointer",
          "& .text": {
            color: "#FFFFFF",
          },
        },
      }}
    >
      <MDTypography
        className="text"
        sx={{ color: "#000000", fontSize: "1rem", textTransform: "uppercase" }}
      >
        {fuel.Fuel_Type}
      </MDTypography>
    </Card>
  );
}
CarFuel.defaultProps = {
  fuel: "",
  setPageState: {},
};

CarFuel.propTypes = {
  fuel: PropTypes.objectOf(PropTypes.string),
  setPageState: PropTypes.objectOf(PropTypes.func),
};
function FuelType({ fuels, setPageState, onFuelClick }) {
  // const fuels = ["Petrol", "Diesel", "CNG", "LPG", "Electric"];
  const [marginWidth, setMarginWidth] = useState(window.innerWidth / 50);
  useEffect(() => {
    function changeMargin() {
      setMarginWidth(window.innerWidth / 50);
    }
    window.addEventListener("resize", changeMargin);
    return () => window.removeEventListener("resize", changeMargin());
  }, []);
  return (
    <MDBox>
      <BPNavbar />
      <MDBox
        onClick={() => setPageState("Variant")}
        display="flex"
        flexDirection="row"
        sx={{ pt: "3rem", pl: "3rem" }}
      >
        <KeyboardBackspace sx={{ mt: 2 }} />
        <MDTypography variant="body1" sx={{ fontSize: 13, cursor: "pointer", mt: 2 }}>
          Back
        </MDTypography>
      </MDBox>

      <MDBox sx={{ textAlign: "center", mt: 3.5, mx: marginWidth }}>
        {/* <MDBox component="img" src={CompareInputImg} />
       <MDBox component="img" src={BMW} />
      <img src={images["Fiat.png"]} /> */}
        <Grid container spacing="1.25rem" textAlign="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <EditLine field="Fuel" setPageState={setPageState} />
          </Grid>
          {Object.keys(fuels).map((key) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={3}
              xl={2.4}
              xxl={2.4}
              display="flex"
              justifyContent="center"
            >
              <CarFuel fuel={fuels[key]} setPageState={setPageState} onFuelClick={onFuelClick} />
              {/* <img src={images[key]} /> */}
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </MDBox>
  );
}

FuelType.defaultProps = {
  fuels: [],
  setPageState: {},
};

FuelType.propTypes = {
  setPageState: PropTypes.objectOf(PropTypes.func),
  fuels: PropTypes.objectOf(PropTypes.array),
};

export default FuelType;
