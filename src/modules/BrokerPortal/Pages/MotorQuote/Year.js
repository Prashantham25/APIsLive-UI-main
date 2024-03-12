import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import Card from "@mui/material/Card";
import swal from "sweetalert";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { setSelected, setManufacturingYear, useDataController } from "../../context";
import colors from "../../../../assets/themes/bptheme/base/colors";
import EditLine from "./EditLine";
import MDDatePicker from "../../../../components/MDDatePicker";

const { primary } = colors;

function CarYear({ model, data, handleYear }) {
  return (
    <Card
      onClick={() => handleYear(model)}
      sx={
        data === model
          ? {
              width: "6rem",
              height: "3.75rem",
              border: "0.5px solid rgba(0, 0, 0, 0.3)",
              borderRadius: "0.25rem",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              backgroundColor: `${primary.main}`,
              "& .text": {
                color: "#FFFFFF",
              },
              "&:hover": {
                backgroundColor: `${primary.main}`,
                cursor: "pointer",
                "& .text": {
                  color: "#FFFFFF",
                },
              },
            }
          : {
              width: "6rem",
              height: "3.75rem",
              border: "0.5px solid rgba(0, 0, 0, 0.3)",
              borderRadius: "0.25rem",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: `${primary.main}`,
                cursor: "pointer",
                "& .text": {
                  color: "#FFFFFF",
                },
              },
            }
      }
    >
      <MDTypography className="text" sx={{ color: "#000000", fontSize: "1.125rem" }}>
        {model}
      </MDTypography>
    </Card>
  );
}
CarYear.defaultProps = {
  model: "",
  // setPageState: {},
};

CarYear.propTypes = {
  model: PropTypes.objectOf(PropTypes.string),
  // setPageState: PropTypes.objectOf(PropTypes.func),
};
function Year({ setPageState, setArgs, args }) {
  const [controller, dispatch] = useDataController();
  // const { motorQuoteInput, selected } = controller;
  const { selected } = controller;
  const [prevDetails, setPrevDetails] = useState({
    RegisteredDate:
      selected.RegistrationDate && selected.RegistrationDate !== ""
        ? selected.RegistrationDate
        : "",
    ManufYear:
      selected.ManufactureYear && selected.ManufactureYear !== "" ? selected.ManufactureYear : "",
    // errorFlag: false,
  });
  // console.log("1212", prevDetails, selected);

  const handleYear = (itm) => {
    // setms(itm);
    prevDetails.ManufYear = itm;
    prevDetails.RegisteredDate = "";
    setPrevDetails({ ...prevDetails });
    const newValue = { ...selected, ManufactureYear: itm };
    setSelected(dispatch, newValue);
  };

  const handleDate = (value, label, v) => {
    if (prevDetails.ManufYear !== "") {
      setPrevDetails((prevState) => ({ ...prevState, [label]: v }));
      const newValue = { ...selected, RegistrationDate: v };
      setSelected(dispatch, newValue);
      if (v !== "") {
        setArgs({ ...args, masterType: "RTO", jsonValue: "" });
        setPageState("City");
      }
    } else {
      swal({
        text: "Please select the Year of Manufactured",
        icon: "error",
      });
    }
  };

  //   const VehicleType = localStorage.getItem("VehicleType");
  //   let vehicleType;
  //   if (VehicleType === "TW") {
  //   vehicleType = "TW";
  //   console.log("TW", vehicleType);
  // } else if (VehicleType === "FW") {
  //   vehicleType = "PvtCar";
  // } else if (VehicleType === "GCV") {
  //   vehicleType = "PvtCar";
  // } else if (VehicleType === "PCV") {
  //   vehicleType = "PvtCar";
  // }

  const generateArray = (aroundNumber, range) =>
    Array(range * 4 - 1)
      .fill(0)
      .map((_, index) => index + aroundNumber - range);

  const models = generateArray(2013, 4).reverse();

  useEffect(() => {
    let year;
    if (models.length > 0) {
      year = models.map((item, idx) => {
        const Obj = { mID: "", mValue: "" };
        Obj.mID = idx + 1;
        Obj.mValue = item;
        return Obj;
      });
    }
    setManufacturingYear(dispatch, year);
  }, [models.length !== 0]);

  // console.log("models", models);

  const [marginWidth, setMarginWidth] = useState(window.innerWidth / 50);
  useEffect(() => {
    function changeMargin() {
      setMarginWidth(window.innerWidth / 50);
    }
    window.addEventListener("resize", changeMargin);
    return () => window.removeEventListener("resize", changeMargin());
  }, []);

  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

  // console.log("Generate Array", generateArray(2012,10));
  return (
    <MDBox>
      <BPNavbar />
      <MDBox
        onClick={() => setPageState("Fuel")}
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
            <EditLine field="Year" setPageState={setPageState} />
          </Grid>

          {Object.keys(models).map((key) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              xl={1.5}
              xxl={1.5}
              display="flex"
              justifyContent="center"
            >
              <CarYear
                data={prevDetails.ManufYear}
                model={models[key]}
                // setPageState={setPageState}
                handleYear={handleYear}
              />
              {/* <img src={images[key]} /> */}
            </Grid>
          ))}
        </Grid>
      </MDBox>
      <Grid container justifyContent="center" m={4}>
        <Grid sx={{ textAlign: "center" }}>
          <MDDatePicker
            input={{
              label: "Registration Date",
              value: prevDetails.RegisteredDate,
              required: true,
              sx: redAsterisk,
            }}
            value={prevDetails.RegisteredDate}
            onChange={(date, v) => handleDate(date, "RegisteredDate", v)}
            onBlur={onclose}
            options={{
              dateFormat: "d-m-Y",
              altFormat: "d-m-Y",
              altInput: true,
              minDate: new Date(
                `1-1-${
                  prevDetails.ManufYear !== "" ? prevDetails.ManufYear : new Date().getFullYear()
                }`
              ),
              maxDate: new Date(),
            }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}
Year.defaultProps = {
  setPageState: {},
};

Year.propTypes = {
  setPageState: PropTypes.objectOf(PropTypes.func),
};
export default Year;
