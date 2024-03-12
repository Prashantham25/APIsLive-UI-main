import { useState } from "react";

import PropTypes from "prop-types";

import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";
import EditLine from "./EditLine";
import MDButton from "../../../../components/MDButton";

// import QuoteData from "../BPLanding/data";

function CarModel({ model, setPageState }) {
  return (
    <Card
      onClick={() => setPageState("PreviousDetails")}
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
          backgroundColor: "#0071D9",
          cursor: "pointer",
          "& .text": {
            color: "#FFFFFF",
          },
        },
      }}
    >
      <MDTypography className="text" sx={{ color: "#000000", fontSize: "1rem" }}>
        {model}
      </MDTypography>
    </Card>
  );
}
CarModel.defaultProps = {
  model: "",
  setPageState: {},
};

CarModel.propTypes = {
  model: PropTypes.objectOf(PropTypes.string),
  setPageState: PropTypes.objectOf(PropTypes.func),
};
function City({ setPageState, RTO, onRTOClick, vehicleType, handleBack, motorQuoteInput }) {
  // const models = [];
  // const { RTO } = QuoteData().Masters;
  // console.log("RTO",RTO);
  // const RTO = ["KA 05", "KA 05"];
  const navigate = useNavigate();
  // console.log("motorQuoteInput111", motorQuoteInput);
  // const [marginWidth, setMarginWidth] = useState(window.innerWidth / 50);
  const [vehicleNo, setVehicleNo] = useState("");
  const [rto, setRto] = useState({ mId: "", mValue: "" });
  const handleChange = (event, value) => {
    setRto(value);
    if (motorQuoteInput.BusinessType === "4") setVehicleNo(`NEW`);
    else setVehicleNo(value.mValue.split("-")[1]);

    // setPageState("PreviousDetails");
  };
  // useEffect(() => {
  //   function changeMargin() {
  //     setMarginWidth(window.innerWidth / 50);
  //   }
  //   window.addEventListener("resize", changeMargin);
  //   return () => window.removeEventListener("resize", changeMargin());
  // }, []);

  const onChange = (e) => {
    if (e.target.value.length > 3) setVehicleNo(e.target.value.toUpperCase());
  };
  const onGo = () => {
    if (motorQuoteInput.BusinessType === "4") {
      const arr = rto.mValue.split("-")[1].split("");
      onRTOClick({
        ...rto,
        vehicleNumber: vehicleNo,
        vehicleNumber1: `${arr[0]}${arr[1]}`,
        vehicleNumber2: `${arr[2]}${arr[3]}`,
        vehicleNumber3: "",
        vehicleNumber4: "",
      });
    } else {
      const arr = vehicleNo.split("");

      onRTOClick({
        ...rto,
        vehicleNumber: vehicleNo,
        vehicleNumber1: `${arr[0]}${arr[1]}`,
        vehicleNumber2: `${arr[2]}${arr[3]}`,
        vehicleNumber3: `${arr[4]}${arr[5]}`,
        vehicleNumber4: `${arr[6]}${arr[7]}${arr[8]}${arr[9]}`,
      });
    }

    if (motorQuoteInput.BusinessType === "4") {
      if (vehicleType === "PvtCar") {
        navigate("/modules/BrokerPortal/Pages/MotorQuote/InputSummary");
      } else if (vehicleType === "TW") {
        navigate("/modules/BrokerPortal/Pages/Bike/InputSummary");
      } else if (vehicleType === "GCV") {
        navigate("/modules/BrokerPortal/Pages/GCV/InputSummary");
      } else if (vehicleType === "PCV") {
        navigate("/modules/BrokerPortal/Pages/PCV/InputSummary");
      }
    } else {
      setPageState("PreviousDetails");
    }
  };

  // console.log("RTO", RTO);
  return (
    <MDBox>
      <BPNavbar />
      <MDBox
        onClick={handleBack}
        display="flex"
        flexDirection="row"
        sx={{ pt: "3rem", pl: "3rem" }}
      >
        <KeyboardBackspace sx={{ mt: 2 }} />
        <MDTypography variant="body1" sx={{ fontSize: 13, cursor: "Pointer", mt: 2 }}>
          Back
        </MDTypography>
      </MDBox>
      <Grid container spacing={2} textAlign="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <EditLine field="City" setPageState={setPageState} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <Autocomplete
              options={RTO}
              getOptionLabel={(option) => option.mValue}
              onChange={handleChange}
              renderInput={(params) => (
                <MDInput
                  type="login"
                  label="Search RTO city"
                  required
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                    width: "20.18rem",
                  }}
                  {...params}
                />
              )}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="row" spacing={2}>
              <MDInput
                label="Vehicle No"
                value={vehicleNo}
                onChange={onChange}
                sx={{ width: "15rem" }}
                disabled={motorQuoteInput.BusinessType === "4"}
              />{" "}
              <MDButton onClick={onGo}>Go</MDButton>
            </Stack>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
City.defaultProps = {
  setPageState: {},
  RTO: [],
};

City.propTypes = {
  setPageState: PropTypes.objectOf(PropTypes.func),
  RTO: PropTypes.objectOf(PropTypes.array),
};

export default City;
