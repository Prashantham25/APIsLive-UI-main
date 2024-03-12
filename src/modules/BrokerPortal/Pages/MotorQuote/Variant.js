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

import colors from "../../../../assets/themes/bptheme/base/colors";
import EditLine from "./EditLine";

const { primary } = colors;

function VariantCard({ variant, setPageState, onVariantClick }) {
  const handleClick = () => {
    onVariantClick(variant);
    setPageState("Fuel");
  };
  return (
    <Card
      onClick={handleClick}
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
        {variant.mValue}
      </MDTypography>
    </Card>
  );
}
VariantCard.defaultProps = {
  variant: "",
  setPageState: {},
  onVariantClick: {},
};

VariantCard.propTypes = {
  variant: PropTypes.objectOf(PropTypes.array),
  setPageState: PropTypes.objectOf(PropTypes.func),
  onVariantClick: PropTypes.objectOf(PropTypes.func),
};

function Variant({
  variants,
  setPageState,
  onVariantClick,
  VariantSelected,
  input,
  handleInputChange,
}) {
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
        onClick={() => setPageState("Model")}
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
            <EditLine field="Variant" setPageState={setPageState} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput
              type="login"
              label="Search Your Model Variant"
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
                width: "auto",
              }}
              name="CarVariant"
              value={input.CarVariant}
              onChange={(e) => handleInputChange(e, "CarVariant")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              // onBlur={handleVariantBlur}
            />
          </Grid>
          {VariantSelected === undefined || input.CarVariant === ""
            ? Object.keys(variants).map((key) => (
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
                  <VariantCard
                    variant={variants[key]}
                    setPageState={setPageState}
                    onVariantClick={onVariantClick}
                  />
                </Grid>
              ))
            : Object.keys(VariantSelected).map((key) => (
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
                  <VariantCard
                    variant={VariantSelected[key]}
                    setPageState={setPageState}
                    onVariantClick={onVariantClick}
                  />
                </Grid>
              ))}
        </Grid>
      </MDBox>
    </MDBox>
  );
}
Variant.defaultProps = {
  variants: [],
  setPageState: {},
  onVariantClick: {},
  VariantSelected: [],
  // handleVariantBlur: {},
  input: {},
  handleInputChange: {},
};

Variant.propTypes = {
  variants: PropTypes.objectOf(PropTypes.array),
  setPageState: PropTypes.objectOf(PropTypes.func),
  onVariantClick: PropTypes.objectOf(PropTypes.func),
  VariantSelected: PropTypes.objectOf(PropTypes.array),
  // handleVariantBlur: PropTypes.objectOf(PropTypes.func),
  input: PropTypes.objectOf(PropTypes.object),
  handleInputChange: PropTypes.objectOf(PropTypes.func),
};

export default Variant;
