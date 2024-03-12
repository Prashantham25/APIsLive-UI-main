import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

import PCVFrame from "assets/images/BrokerPortal/PCV/Frame.png";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import Tooltip from "@mui/material/Tooltip";

import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
// import { useEffect } from "react";
import { setMotorQuoteInput, useDataController, setIsNewBusiness } from "../../context";
// import { FastLane } from "./data";
// import appConfig from "../../../../jsconfig.json";

function PCVQuote() {
  const navigate = useNavigate();
  // const [regNo, setRegNo] = useState();
  const [controller, dispatch] = useDataController();
  const [BusinessType, setBusinesstype] = useState("");
  // const [setFlags] = useState({
  //   errorFlag: false,
  // });
  // const OnNext = () => {
  //   navigate(`/modules/BrokerPortal/Pages/PCV/GCVInsureVehicle`);
  // };
  const { motorQuoteInput, userpermission } = controller;
  console.log("userpermission", userpermission);

  const motorQuoteInputJSON = motorQuoteInput;

  // const { pathStack } = controller;

  const openBrand = (btype) => {
    motorQuoteInputJSON.BusinessType = btype;
    motorQuoteInputJSON.ODTerm = "1";
    motorQuoteInputJSON.TPTerm = btype === "4" ? "1" : "1";
    motorQuoteInputJSON.VehicleType = 194;
    setMotorQuoteInput(dispatch, motorQuoteInput);
    console.log("MotorQuoteInput", motorQuoteInput);
    navigate(`/modules/BrokerPortal/Pages/PCV/PCVInsureVehicle`);
  };

  // const handleInputChange = (event) => {
  //   setRegNo(event.target.value);
  //   setVehicleNumber(dispatch, event.target.value);
  // };

  const handlegetQuotes = () => {
    if (BusinessType === "NewBusiness") {
      openBrand("4");
    } else if (BusinessType === "RollOver") {
      openBrand("6");
    }
  };
  const handleBusinessType = (value) => {
    // const { value } = e.target;
    setBusinesstype(value);
    if (value === "RollOver") {
      setIsNewBusiness(dispatch, false);
    }
  };

  // const routeMotor = () => {
  //   if (regNo === "") {
  //     console.log("Registration", regNo);
  //     setFlags((prevState) => ({
  //       ...prevState,

  //       errorFlag: true,
  //     }));
  //   } else if (regNo !== "") {
  //     console.log("Registration", regNo);
  //     // const NumberRegex = /^[A-Z|a-z]{2}\s?[0-9]{1,2}\s?[A-Z|a-z]{0,3}\s?[0-9]{4}$/;
  //     const NumberRegex = /^[A-Z|a-z]{2}(|-)[0-9]{2}(|-)[A-Z|a-z]{1,2}(|-)[0-9]{4}$/;
  //     if (!NumberRegex.test(regNo)) {
  //       setFlags((prevState) => ({
  //         ...prevState,

  //         errorFlag: true,
  //       }));
  //     } else {
  //       setFlags((prevState) => ({
  //         ...prevState,

  //         errorFlag: false,
  //       }));
  //       if (regNo !== "NEW") {
  //         console.log("Fastlane", appConfig.isFastLane);
  //         motorQuoteInputJSON.BusinessType = "6";
  //         motorQuoteInputJSON.ODTerm = "1";
  //         motorQuoteInputJSON.TPTerm = "1";
  //         setMotorQuoteInput(dispatch, motorQuoteInput);
  //         if (appConfig.isFastLane) {
  //           const jsonValue = {
  //             regn_no: regNo,
  //           };
  //           FastLane(dispatch, jsonValue);
  //           navigate(`/modules/BrokerPortal/Pages/MotorQuote/InputSummary`);
  //         } else {
  //           openBrand("6");
  //         }
  //       } else {
  //         openBrand("4");
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    localStorage.setItem("VehicleType", "PCV");
  }, []);

  // const goBack = () => {
  //   navigate(`/modules/BrokerPortal/Pages/BPLanding`);
  //   // popPathStack(dispatch);
  //   // console.log(" after POP", pathStack, pathStack.length)
  //   // if (pathStack) navigate(pathStack[pathStack.length-2]);
  // };

  // useEffect(() => {
  //   pushPathStack(dispatch, window.location.pathname);
  //   console.log("after push", pathStack);
  //   // console.log("MOTOR QUOTE", prevPath, currPath);
  // }, []);
  const handleCustomerPolicy = () => {
    window.open(process.env.REACT_APP_CustomerPolicy, "_blank");
  };
  const handleCustomerTerm = () => {
    window.open(process.env.REACT_APP_CustomerTerm, "_blank");
  };
  return (
    <MDBox>
      <BPNavbar />
      <MDBox sx={{ p: "2rem" }}>
        {/* <MDBox
          display="flex"
          flexDirection="row"
          onClick={goBack}
        >
          <KeyboardBackspace sx={{ mt: 2 }} />
          <MDTypography variant="body1" sx={{ fontSize: 13, cursor: "pointer", mt: 2 }}>
            Back
          </MDTypography>
        </MDBox> */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          display="flex"
          spacing={4}
          sx={{ mt: "4rem" }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox
              component="img"
              src={PCVFrame}
              sx={{ width: "100%", height: "130%", mt: "2rem" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox sx={{ ml: "3rem" }}>
              <MDTypography variant="h6" sx={{ fontSize: "3rem", color: "#000000" }}>
                Compare quotes & Buy <br />
                Insurance all in one place.
              </MDTypography>
              <MDTypography sx={{ fontSize: "1.25rem", color: "#000000" }}>
                We compare with multiple insurance companies to <br />
                find the policy that&apos;s right for you.
              </MDTypography>
              {/* <RadioGroup	
                row	
                aria-labelledby="demo-row-radio-buttons-group-label"	
                name="row-radio-buttons-group"	
                sx={{ justifyContent: "center" }}	
              >	
                <FormControlLabel value="New" control={<Radio />} label="New Business" />	
                <FormControlLabel value="Rollover" control={<Radio />} label="Rollover" />	
              </RadioGroup> */}
              <MDTypography sx={{ mt: "1.25rem", fontSize: "1.25rem", color: "#000000" }}>
                Please Select option to proceed further!
              </MDTypography>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                // value={value}
                // onChange={handleChange}
                // sx={{ mt: "1.25rem" ,"& .MuiRadio-root":{
                //   color:"black !important",
                // //  background:"black !important"
                // } }}
                // style={{"& .MuiRadio-root":{
                //   color:"black !important",
                // //  background:"black !important"
                // }}}
                // sx={{
                //   "& .MuiButtonBase-root": {
                //     color: "black",
                //     //  background:"black !important"
                //   },
                // }}
              >
                {userpermission.map((item) => (
                  <Tooltip title={item.mData}>
                    <FormControlLabel
                      label={item.mValue}
                      control={<Radio />}
                      checked={BusinessType === item.mValue}
                      onChange={() => handleBusinessType(item.mValue)}
                    />
                  </Tooltip>
                ))}
                {/* <FormControlLabel
                  checked={BusinessType === "NewBusiness"}
                  value="NewBusiness"
                  control={<Radio />}
                  onChange={handleBusinessType}
                  label="New Business"
                />
                <FormControlLabel
                  checked={BusinessType === "RollOver"}
                  value="RollOver"
                  control={<Radio />}
                  onChange={handleBusinessType}
                  label="RollOver"
                /> */}
              </RadioGroup>

              <MDButton onClick={handlegetQuotes} sx={{ marginLeft: "0.063rem", mt: "30px" }}>
                Get Quote
              </MDButton>

              <MDTypography sx={{ fontSize: "0.7rem", mt: "1.875rem" }}>
                By clicking Get Quote, I agree to *
                <span
                  style={{ color: "#0071D9", cursor: "pointer", textDecoration: "underline" }}
                  onClick={handleCustomerTerm}
                  role="button"
                  onKeyDown={handleCustomerTerm}
                  tabIndex="0"
                >
                  terms & conditions
                </span>{" "}
                and{" "}
                <span
                  style={{ color: "#0071D9", cursor: "pointer", textDecoration: "underline" }}
                  onClick={handleCustomerPolicy}
                  role="button"
                  onKeyDown={handleCustomerPolicy}
                  tabIndex="0"
                >
                  privacy policy.
                </span>
              </MDTypography>
              {/* <MDBox display="flex" flexDirection="row" sx={{ mt: "1rem" }}>
                <MDInput
                  label="Car Registration Number"
                  value={regNo}
                  onChange={handleInputChange}
                />
                <MDButton onClick={routeMotor} sx={{ ml: "1rem" }}>
                  Submit
                </MDButton>
              </MDBox>
              {flags.errorFlag === true ? (
                <MDTypography
                  sx={{
                    fontSize: "0.9rem",

                    color: "red",
                    textAlign: "left",

                    mt: "1rem",
                  }}
                >
                  Please enter valid Registration Number
                </MDTypography>
              ) : null} */}
              {/* <MDBox display="flex" flexDirection="row">
                <MDTypography sx={{ pt: "1rem", fontSize: "0.9rem" }}>
                  {" "}
                  Dont know the car number?{" "}
                </MDTypography>
                <MDTypography
                  sx={{
                    pt: "1rem",
                    fontSize: "0.9rem",
                    color: "#0071D9",
                    textDecoration: "underline",
                    cursor: "pointer",
                    ml: 1,
                  }}
                  onClick={() => openBrand("6")}
                >
                  Click here
                </MDTypography>
              </MDBox> */}
              {/* <MDBox display="flex" flexDirection="row">
                <MDTypography sx={{ pt: "1rem", fontSize: "0.9rem" }}>
                  Bought a New Car?
                </MDTypography>

                <MDTypography
                  sx={{
                    pt: "1rem",
                    fontSize: "0.9rem",
                    color: "#0071D9",
                    textDecoration: "underline",
                    cursor: "pointer",
                    ml: 1,
                  }}
                  onClick={() => openBrand("4")}
                >
                  Click here
                </MDTypography>
              </MDBox> */}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default PCVQuote;
