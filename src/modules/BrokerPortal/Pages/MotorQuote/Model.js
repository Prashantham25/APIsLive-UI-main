import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

import EditLine from "./EditLine";

import colors from "../../../../assets/themes/bptheme/base/colors";
import { useDataController, setMotorQuoteInput } from "../../context";

const { primary } = colors;

function CarModel({ model, setPageState, onModelClick }) {
  // console.log("Model", model);
  const handleClick = (value) => {
    onModelClick(value);
    setPageState("Variant");
  };
  return (
    <Card
      onClick={() => handleClick(model)}
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
      <MDTypography className="text" sx={{ color: "#000000", fontSize: "1rem" }}>
        {model.mValue}
      </MDTypography>
    </Card>
  );
}
CarModel.defaultProps = {
  model: "",
  setPageState: {},
  onModelClick: {},
};

CarModel.propTypes = {
  model: PropTypes.objectOf(PropTypes.string),
  setPageState: PropTypes.objectOf(PropTypes.func),
  onModelClick: PropTypes.objectOf(PropTypes.func),
};
function Getvehicle({ VehicleType }) {
  console.log("key1", VehicleType);
  if (VehicleType === 193) {
    return "Search your GCV model";
  }
  if (VehicleType === 194) {
    return "Search your PCV model";
  }
  if (VehicleType === 16) {
    return "Search your Car model";
  }
  if (VehicleType === 17) {
    return "Search your Bike model";
  }
  return null;
}
function Model({
  setPageState,
  models,
  onModelClick,
  input,
  handleInputChange,
  ModalSelected,
  // handleBackButton,
  // VehicleType,
}) {
  const [controller] = useDataController();

  const { motorQuoteInput } = controller;
  console.log("setMotorQuoteInput", setMotorQuoteInput);
  console.log(motorQuoteInput, "VehicleType");
  const [marginWidth, setMarginWidth] = useState(window.innerWidth / 50);
  useEffect(() => {
    function changeMargin() {
      setMarginWidth(window.innerWidth / 50);
    }
    window.addEventListener("resize", changeMargin);
    return () => window.removeEventListener("resize", changeMargin());
  }, []);
  // useEffect(() => {
  // // function Getvehicle({ vehicleType }) {
  // console.log("key1", vehicleType);
  // const pageFontSize = "1.25rem";

  // if (vehicleType === 193) {
  //   return (
  //     <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
  //       Search your GCV model
  //     </MDTypography>
  //   );
  // }
  // if (vehicleType === 194) {
  //   return (
  //     <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
  //       Search your PCV model
  //     </MDTypography>
  //   );
  // }
  // if (vehicleType === 16) {
  //   return (
  //     <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
  //       Search your Car model
  //     </MDTypography>
  //   );
  // }
  // if (vehicleType === 17) {
  //   return (
  //     <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
  //       Search your Bike model
  //     </MDTypography>
  //   );
  // }
  // return null;
  // // }
  // if (vehicleType === 193) {
  //   return <MDTypography>Search your GCV model</MDTypography>;
  // }
  // if (vehicleType === 194) {
  //   return <MDTypography>Search your PCV model</MDTypography>;
  // }
  // if (vehicleType === 16) {
  //   return <MDTypography>Search your Car model</MDTypography>;
  // }
  // if (vehicleType === 17) {
  //   return <MDTypography>Search your Bike model</MDTypography>;
  // }
  // return null;
  // }, []);
  return (
    <MDBox>
      <BPNavbar />
      <MDBox display="flex" flexDirection="row" sx={{ pt: "3rem", pl: "3rem" }}>
        <KeyboardBackspace sx={{ mt: 2 }} />
        <MDTypography
          onClick={() => setPageState("Brand")}
          variant="body1"
          sx={{ fontSize: 13, cursor: "pointer", mt: 2 }}
        >
          Back
        </MDTypography>
      </MDBox>

      <MDBox sx={{ textAlign: "center", mt: 3.5, mx: marginWidth }}>
        {/* <MDBox component="img" src={CompareInputImg} />
       <MDBox component="img" src={BMW} />
      <img src={images["Fiat.png"]} /> */}
        <Grid container spacing="1.25rem" textAlign="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <EditLine field="Model" setPageState={setPageState} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput
              type="login"
              label={
                <Getvehicle VehicleType={motorQuoteInput.VehicleType} />
                // vehicleType
                // vehicleType === "PvtCar" ? "Search Your Car model" : "Search Your Bike model"
              }
              required
              sx={{
                width: "auto",
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              name="CarModal"
              value={input.CarModal}
              onChange={(e) => handleInputChange(e, "CarModal")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {ModalSelected === undefined || input.CarModal === ""
            ? Object.keys(models).map((key) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={3}
                  xl={3}
                  xxl={3}
                  display="flex"
                  justifyContent="center"
                >
                  <CarModel
                    model={models[key]}
                    setPageState={setPageState}
                    onModelClick={onModelClick}
                  />
                  {/* <img src={images[key]} /> */}
                </Grid>
              ))
            : Object.keys(ModalSelected).map((key) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={3}
                  xl={3}
                  xxl={3}
                  display="flex"
                  justifyContent="center"
                >
                  <CarModel
                    model={ModalSelected[key]}
                    setPageState={setPageState}
                    onModelClick={onModelClick}
                  />
                  {/* <img src={images[key]} /> */}
                </Grid>
              ))}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Grid container justifyContent="center">
              <MDTypography
                sx={{
                  fontSize: "1rem",
                  color: "#1976D2",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                // onClick={handleBackButton}
              >
                {/* View All Models */}
              </MDTypography>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
Model.defaultProps = {
  setPageState: {},
  models: [],
  onModelClick: {},
};

Model.propTypes = {
  setPageState: PropTypes.objectOf(PropTypes.func),
  models: PropTypes.objectOf(PropTypes.array),
  onModelClick: PropTypes.objectOf(PropTypes.func),
};
export default Model;
