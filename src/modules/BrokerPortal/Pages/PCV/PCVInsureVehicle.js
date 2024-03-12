import React, { useState, useEffect } from "react";
import {
  // Autocomplete,
  Grid,
} from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
// import swal from "sweetalert";
// import Icon from "@mui/material/Icon";
// import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";
import PCVFrame from "assets/images/BrokerPortal/PCV/Frame.png";
import PCVIP from "assets/images/BrokerPortal/PCV/PCVIP.png";
import PCVBest from "assets/images/BrokerPortal/PCV/PCVBest.png";
// import oneWheeler4 from "assets/images/BrokerPortal/PCV/oneWheeler4.png";
import twoWheeler4 from "assets/images/BrokerPortal/PCV/twoWheeler4.png";
// import threeWheeler4 from "assets/images/BrokerPortal/PCV/threeWheeler4.png";
import fourWheeler4 from "assets/images/BrokerPortal/PCV/fourWheeler4.png";
import fiveWheeler4 from "assets/images/BrokerPortal/PCV/fiveWheeler4.png";
// import breakpoints from "assets/theme/base/breakpoints";

import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import MDButton from "components/MDButton";
import { Getpermittype, GetPCVwheelers } from "./data/index";
import { setMotorQuoteInput, useDataController } from "../../context";

function PCVInsureVehicle() {
  const navigate = useNavigate();
  const OnBack = () => {
    navigate(`/modules/BrokerPortal/Pages/BPLanding`);
  };
  const onNext = () => {
    navigate(`/modules/BrokerPortal/Pages/MotorQuote/Brand`);
  };

  const [controller, dispatch] = useDataController();
  const { motorQuoteInput } = controller;
  const [PermitData, setPermitData] = useState([]);
  const [Vehicle, setVehicle] = useState([]);
  // const [active, setActive] = useState(true);
  const [active1, setActive1] = useState("");
  // const [active2, setActive2] = useState(true);
  // const [active3, setActive3] = useState(true);
  // const [active4, setActive4] = useState(true);

  useEffect(async () => {
    const a = {};
    await Getpermittype(a).then((result) => {
      console.log("result", result);
      setPermitData([...result]);
      console.log("PermitData", PermitData);
    });
    // const d = await GetGCVwheelers(a, "GCVPublicCarrier4Wheeler");
    // console.log(d, "d");
  }, []);

  const [master, setMaster] = useState({
    PermitType: { mID: "", mValue: "" },
    VehicleCatogery: { mID: "", mValue: "" },
  });
  const masterArray = master;
  const handleSetAutoComplete = (event, type, values) => {
    console.log("type", type);
    if (type === "PermitType" || type === "VehicleCatogery") {
      masterArray[type] = values;
      motorQuoteInput[type] = values.mValue;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      setMotorQuoteInput(dispatch, motorQuoteInput);

      console.log("MotorQuoteInput", motorQuoteInput);
    }
  };

  const handleVehicle = async (key) => {
    console.log(key, "key");
    const a = {};

    const d = await GetPCVwheelers(a, key);
    console.log(d, "d");
    setActive1(key);
    // if (key === "PCVPublicCarrier4Wheeler") {
    //   motorQuoteInput.CarrierType = "4 Wheeler";
    //   motorQuoteInput.Vehicle = "Public";
    //   setMotorQuoteInput(dispatch, motorQuoteInput);
    // }
    if (key === "PCVPublicCarrier4Wheeler") {
      // drowpdown data is same for Public and public Carrier4Wheeler
      // PCVPrivateCarrier4Wheeler
      motorQuoteInput.CarrierType = "4 Wheeler";
      motorQuoteInput.Vehicle = "Private";
      setMotorQuoteInput(dispatch, motorQuoteInput);
    }
    // if (key === "PCVPublicCarrier2or3Wheeler") {
    //   motorQuoteInput.CarrierType = "4 Wheeler";
    //   motorQuoteInput.Vehicle = "Public";
    //   setMotorQuoteInput(dispatch, motorQuoteInput);
    // }
    if (key === "PCVPublicCarrier2or3Wheeler") {
      // drowpdown data is same for Public and public Carrier2or3Wheeler
      // PCVPrivateCarrier2or3Wheeler
      motorQuoteInput.CarrierType = "4 Wheeler";
      motorQuoteInput.Vehicle = "Private";
      setMotorQuoteInput(dispatch, motorQuoteInput);
    }
    if (key === "PCVOthers(More Than 4 wheelers)") {
      motorQuoteInput.CarrierType = "More Then 4 Wheeler";
      motorQuoteInput.Vehicle = "Public";
      setMotorQuoteInput(dispatch, motorQuoteInput);
    }

    setVehicle([...d]);
    setMotorQuoteInput(dispatch, motorQuoteInput);
    console.log("MotorQuoteInput", motorQuoteInput);
    console.log("Vehicle", Vehicle);
  };
  return (
    <MDBox>
      <BPNavbar />
      <Grid container spacing={3} sx={{ borderRadius: 0, px: "2rem", pt: "0.5rem", mt: -0.5 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox display="flex" flexDirection="row">
            <KeyboardBackspace />
            <MDTypography
              // variant="body1"
              sx={{ fontSize: 13 }}
              //   onClick={handleClickBack}
            >
              Back
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <MDBox component="img" src={PCVFrame} sx={{ width: "100%", mb: "2rem" }} />
          <MDBox component="img" src={PCVIP} sx={{ width: "90%", mb: "1rem", ml: "2rem" }} />
          <MDBox component="img" src={PCVBest} sx={{ width: "80%", ml: "2.5rem" }} />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <Card sx={{ borderRadius: 0, px: "2rem", height: "100%" }}>
            <MDBox>
              <Grid container spacing={1} mt="2rem">
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography className="text" textAlign="left" variant="h3" mt="2rem">
                    Insure you vehicle in Minutes..!!
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                  <MDTypography
                    className="text"
                    textAlign="left"
                    // variant="h5"
                    // sx={{ fontSize: "1.75rem" }}
                    mt="1rem"
                  >
                    Compare & Buy Customised insuarance Plans
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                  <MDTypography
                    className="text"
                    textAlign="left"
                    variant="h6"
                    sx={{ fontSize: "1.35rem", m: 1 }}
                    mt="2rem"
                  >
                    Tell us your vehicle Type and category
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={1} mt="2rem" m={1}>
                {/* <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px",
                    backgroundColor: active ? "" : "#1976D2",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                  }}
                  onClick={() => {
                    if (
                      active4 === true &&
                      active1 === true &&
                      active2 === true &&
                      active3 === true
                    ) {
                      handleVehicle("PCVPublicCarrier4Wheeler");
                      setActive(!active);
                    }
                  }}
                >
                  <Grid container justifyContent="center" m={1}>
                    <MDBox
                      component="img"
                      src={oneWheeler4}
                      sx={{ height: "39px", width: "58px" }}
                    />
                    <MDTypography sx={{ fontSize: "14px" }}>Public Carrier 4 Wheeler</MDTypography>
                  </Grid>
                </Card> */}

                <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px",
                    backgroundColor: active1 === "PCVPublicCarrier4Wheeler" ? "#1976D2" : "",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                  }}
                  onClick={() => {
                    handleVehicle("PCVPublicCarrier4Wheeler");
                  }}
                >
                  <Grid container justifyContent="center" m={1}>
                    <MDBox
                      component="img"
                      src={twoWheeler4}
                      sx={{ height: "39px", width: "58px" }}
                    />
                    <MDTypography sx={{ fontSize: "14px" }}>Private Carrier 4 Wheeler</MDTypography>
                  </Grid>
                </Card>

                {/* <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px",
                    backgroundColor: active2 ? "" : "#1976D2",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                  }}
                  onClick={() => {
                    if (
                      active4 === true &&
                      active1 === true &&
                      active3 === true &&
                      active === true
                    ) {
                      handleVehicle("PCVPublicCarrier2or3Wheeler");
                      setActive2(!active2);
                    }
                  }}
                >
                  <Grid container justifyContent="center" m={1}>
                    <MDBox
                      component="img"
                      src={threeWheeler4}
                      sx={{ height: "39px", width: "58px" }}
                    />
                    <MDTypography sx={{ fontSize: "14px" }}>
                      Public Carrier 2 or 3 Wheeler
                    </MDTypography>
                  </Grid>
                </Card> */}
                <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px",
                    backgroundColor: active1 === "PCVPublicCarrier2or3Wheeler" ? "#1976D2" : "",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                  }}
                  onClick={() => {
                    handleVehicle("PCVPublicCarrier2or3Wheeler");
                  }}
                >
                  <Grid container justifyContent="center" m={1}>
                    <MDBox
                      component="img"
                      src={fourWheeler4}
                      sx={{ height: "39px", width: "58px" }}
                    />
                    <MDTypography sx={{ fontSize: "14px" }} justifyContent="center">
                      Private Carrier 2 or 3 Wheeler
                    </MDTypography>
                  </Grid>
                </Card>
                <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px",
                    backgroundColor: active1 === "PCVOthers(More Than 4 wheelers)" ? "#1976D2" : "",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                  }}
                  onClick={() => {
                    handleVehicle("PCVOthers(More Than 4 wheelers)");
                  }}
                >
                  <Grid container justifyContent="center" m={1}>
                    <MDBox
                      component="img"
                      src={fiveWheeler4}
                      sx={{ height: "39px", width: "58px" }}
                    />
                    <MDTypography sx={{ fontSize: "14px" }}>
                      Others (More than 4 wheels)
                    </MDTypography>
                  </Grid>
                </Card>
              </Grid>
              <Grid container spacing={2} mt="2rem">
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    id="VehicleCatogery"
                    value={master.VehicleCatogery}
                    options={Vehicle || []}
                    getOptionLabel={(option) => option.mValue}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                    }}
                    onChange={(event, values) =>
                      handleSetAutoComplete(event, "VehicleCatogery", values)
                    }
                    renderInput={(params) => (
                      <MDInput
                        label="Select Vehicle Category"
                        // required
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    id="PermitType"
                    options={PermitData || []}
                    value={master.PermitType}
                    getOptionLabel={(option) => option.mValue}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                    }}
                    onChange={(event, values) => handleSetAutoComplete(event, "PermitType", values)}
                    renderInput={(params) => (
                      <MDInput
                        label="Permit Type"
                        // required
                        {...params}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                <MDTypography
                  className="text"
                  textAlign="left"
                  // variant="h6"
                  sx={{ fontSize: "0.75rem", mt: 2, ml: 1 }}
                >
                  By clicking proceed i agree to <font color="blue">* terms &#38; conditions</font>{" "}
                  and <font color="blue">Privacy policy</font>
                </MDTypography>
              </Grid>
              <Grid container justifyContent="space-between">
                <MDButton
                  // disabled
                  variant="outlined"
                  color="info"
                  sx={{ mt: "2rem" }}
                  onClick={OnBack}
                >
                  Back
                </MDButton>
                <Grid item align="end">
                  <MDButton
                    variant="contained"
                    color="info"
                    sx={{ mt: "2rem", textAlign: "right" }}
                    onClick={onNext}
                  >
                    Proceed
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default PCVInsureVehicle;
