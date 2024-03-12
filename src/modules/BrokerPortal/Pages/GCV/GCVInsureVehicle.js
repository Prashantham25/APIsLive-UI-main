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
import swal from "sweetalert";
import GCVFrame from "assets/images/BrokerPortal/GCV/Frame.png";
import GCVIP from "assets/images/BrokerPortal/GCV/GCVIP.png";
import GCVBest from "assets/images/BrokerPortal/GCV/GCVBest.png";
import oneWheeler4 from "assets/images/BrokerPortal/GCV/oneWheeler4.png";
// import twoWheeler4 from "assets/images/BrokerPortal/GCV/twoWheeler4.png";
import threeWheeler4 from "assets/images/BrokerPortal/GCV/threeWheeler4.png";
// import fourWheeler4 from "assets/images/BrokerPortal/GCV/fourWheeler4.png";
import fiveWheeler4 from "assets/images/BrokerPortal/GCV/fiveWheeler4.png";
// import breakpoints from "assets/theme/base/breakpoints";

import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import MDButton from "components/MDButton";
import { setMotorQuoteInput, useDataController } from "../../context";

import {
  Getpermittype,
  // GetGCVPublicCarrier4Wheeler,
  // GetGCVPrivateCarrier4Wheeler,
  // GetGCVPublicCarrier2or3Wheeler,
  // GetGCVOthersMoreThan4wheelers,
  GetGCVwheelers,
} from "./data/index";

function PCVInsureVehicle() {
  const navigate = useNavigate();
  const [controller, dispatch] = useDataController();
  const { motorQuoteInput } = controller;
  const OnBack = () => {
    navigate(`/modules/BrokerPortal/Pages/GCV`);
  };

  const [master, setMaster] = useState({
    PermitType: { mID: "", mValue: "" },
    VehicleCatogery: { mID: "", mValue: "" },
  });
  const onNext = () => {
    if (master.VehicleCatogery.mID === "" || master.PermitType.mID === "") {
      swal({
        icon: "error",
        text: "Please fill the required field",
      });
    } else {
      navigate(`/modules/BrokerPortal/Pages/MotorQuote/Brand`);
    }
  };
  const [PermitData, setPermitData] = useState([]);
  const [Vehicle, setVehicle] = useState([]);
  const [active, setActive] = useState("");
  // const [active1, setActive1] = useState(true);
  // const [active2, setActive2] = useState(true);
  // // const [active3, setActive3] = useState(true);
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

  // const handlePublicVehicle = async () => {
  //   const a = {};
  //   // const Data1 = await GetGCVPublicCarrier4Wheeler(a);
  //   const d = await GetGCVwheelers(a, "GCVPublicCarrier4Wheeler");
  //   console.log("d", d);
  //   // console.log("list", Data1);
  //   motorQuoteInput.Vehicle = "Public";
  //   motorQuoteInput.CarrierType = "4 Wheeler";
  //   setVehicle([...d]);
  //   setMotorQuoteInput(dispatch, motorQuoteInput);
  //   console.log("MotorQuoteInput", motorQuoteInput);
  //   console.log("Vehicle", Vehicle);
  // };

  const handleVehicle = async (key) => {
    setActive(key);
    console.log(key, "key");
    const a = {};
    // const Data1 = await GetGCVPrivateCarrier4Wheeler(a);
    // console.log("list", Data1);
    const d = await GetGCVwheelers(a, key);
    console.log(d, "d");
    if (key === "GCVPublicCarrier4Wheeler") {
      motorQuoteInput.CarrierType = "4 Wheeler";
      motorQuoteInput.Vehicle = "Public";
      setMotorQuoteInput(dispatch, motorQuoteInput);
    }
    if (key === "GCVPrivateCarrier4Wheeler") {
      motorQuoteInput.CarrierType = "4 Wheeler";
      motorQuoteInput.Vehicle = "Private";
      setMotorQuoteInput(dispatch, motorQuoteInput);
    }
    if (key === "GCVPublicCarrier2or3Wheeler") {
      motorQuoteInput.CarrierType = "4 Wheeler";
      motorQuoteInput.Vehicle = "Public";
      setMotorQuoteInput(dispatch, motorQuoteInput);
    }
    if (key === "GCVPrivateCarrier2or3Wheeler") {
      motorQuoteInput.CarrierType = "4 Wheeler";
      motorQuoteInput.Vehicle = "Private";
      setMotorQuoteInput(dispatch, motorQuoteInput);
    }
    if (key === "Others(More Than 4 wheelers)") {
      motorQuoteInput.CarrierType = "More Then 4 Wheeler";
      motorQuoteInput.Vehicle = "Public";
      setMotorQuoteInput(dispatch, motorQuoteInput);
    }

    setVehicle([...d]);
    setMotorQuoteInput(dispatch, motorQuoteInput);
    console.log("MotorQuoteInput", motorQuoteInput);
    console.log("Vehicle", Vehicle);
  };
  // const handlePublic2or3Vehicle = async () => {
  //   const a = {};
  //   // const Data1 = await GetGCVPublicCarrier2or3Wheeler(a);
  //   // console.log("list", Data1);
  //   const d = await GetGCVwheelers(a, "GCVPublicCarrier2or3Wheeler");
  //   console.log(d, "d");
  //   motorQuoteInput.Vehicle = "Public";
  //   motorQuoteInput.CarrierType = "2 or 3 Wheeler";
  //   setVehicle([...d]);
  //   setMotorQuoteInput(dispatch, motorQuoteInput);
  //   console.log("MotorQuoteInput", motorQuoteInput);
  //   console.log("Vehicle", Vehicle);
  // };
  // const handlePrivate2or3Vehicle = async () => {
  //   const a = {};
  //   // const Data1 = await GetGCVPublicCarrier2or3Wheeler(a);
  //   // console.log("list", Data1);
  //   const d = await GetGCVwheelers(a, "GCVPublicCarrier2or3Wheeler");
  //   console.log(d, "d");
  //   motorQuoteInput.Vehicle = "Private";
  //   motorQuoteInput.CarrierType = "2 or 3 Wheeler";
  //   setVehicle([...d]);
  //   setMotorQuoteInput(dispatch, motorQuoteInput);
  //   console.log("MotorQuoteInput", motorQuoteInput);
  //   console.log("Vehicle", Vehicle);
  // };
  // const handleOtherVehicle = async () => {
  //   const a = {};
  //   // const Data1 = await GetGCVOthersMoreThan4wheelers(a);
  //   // console.log("list", Data1);
  //   const d = await GetGCVwheelers(a, "GCVOthersMoreThan4wheelers");
  //   console.log(d, "d");
  //   motorQuoteInput.CarrierType = "More Than 4 Wheeler";
  //   setVehicle([...d]);
  //   setMotorQuoteInput(dispatch, motorQuoteInput);
  //   console.log("MotorQuoteInput", motorQuoteInput);
  //   console.log("Vehicle", Vehicle);
  // };

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
          <MDBox component="img" src={GCVFrame} sx={{ width: "100%" }} />
          <MDBox component="img" src={GCVIP} sx={{ width: "90%", ml: "2rem" }} />
          <MDBox component="img" src={GCVBest} sx={{ width: "80%", ml: "2.5rem" }} />
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
                <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px",
                    // border: "0.5px solid rgba(0, 0, 0, 0.3)",
                    // borderRadius: "0.25rem",
                    backgroundColor: active === "GCVPublicCarrier4Wheeler" ? "#1976D2" : "",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                  }}
                  onClick={() => {
                    handleVehicle("GCVPublicCarrier4Wheeler");
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
                </Card>

                {/* <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px", // border: "0.5px solid rgba(0, 0, 0, 0.3)",
                    // borderRadius: "0.25rem",
                    backgroundColor: active1 ? "" : "#1976D2",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    if (
                      active === true &&
                      active4 === true &&
                      active2 === true &&
                      active3 === true
                    ) {
                      handleVehicle("GCVPrivateCarrier4Wheeler");
                      setActive1(!active1);
                      // setActive(active);
                      // setActive2(active2);
                      // setActive3(active3);
                      // setActive4(active4);
                    }
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
                </Card> */}

                <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px", // border: "0.5px solid rgba(0, 0, 0, 0.3)",
                    // borderRadius: "0.25rem",
                    backgroundColor: active === "GCVPublicCarrier2or3Wheeler" ? "#1976D2" : "",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    handleVehicle("GCVPublicCarrier2or3Wheeler");
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
                </Card>
                {/* <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px", // border: "0.5px solid rgba(0, 0, 0, 0.3)",
                    // borderRadius: "0.25rem",
                    backgroundColor: active3 ? "" : "#1976D2",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    if (
                      active === true &&
                      active1 === true &&
                      active2 === true &&
                      active4 === true
                    ) {
                      handleVehicle("GCVPrivateCarrier2or3Wheeler");
                      setActive3(!active3);
                      // setActive1(active1);
                      // setActive2(active2);
                      // setActive(active);
                      // setActive4(active4);
                    }
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
                </Card> */}
                <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    mt: "2px",
                    m: "10px", // border: "0.5px solid rgba(0, 0, 0, 0.3)",
                    // borderRadius: "0.25rem",
                    backgroundColor: active === "GCVOthers(More Than 4 wheelers)" ? "#1976D2" : "",
                    boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    p: "0.925rem",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    handleVehicle("GCVOthers(More Than 4 wheelers)");
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
