import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Stack } from "@mui/material";
// import { KeyboardBackspace } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Travelimg from "assets/images/BrokerPortal/Travel/Travel.png";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import MDTypography from "../../../../../components/MDTypography";
// import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import {
  useDataController,
  //  setTravellerInsuranceDetails
} from "../../../context/index";
// import { data } from "../data/JsonData";
import { GenerateQuickQuote, GetAllMasters } from "../data/index";

function TravelDetails() {
  const [controller, dispatch] = useDataController();
  const { TravellerInsuranceDetails } = controller;

  // const [PolicyDto, setPolicyDto] = useState(TravellerInsuranceDetails);
  // const TPolicyDto = PolicyDto;
  // console.log(TravellerInsuranceDetails, "TravellerInsuranceDetails");
  // console.log("PolicyDto88", PolicyDto);
  const navigate = useNavigate();

  const handleProceed = () => {
    const BrokerUser = localStorage.getItem("BrokerUser");
    console.log("BROKERUSER", BrokerUser);
    // setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    // setTravellerInsuranceDetails(dispatch, PolicyDto);
    // console.log("policy123", PolicyDto);
    if (BrokerUser === "Broker") {
      GenerateQuickQuote(dispatch, TravellerInsuranceDetails);
      navigate(
        `/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelCustomerEngage/TravelCustomerDetails`
      );
    } else {
      GenerateQuickQuote(dispatch, TravellerInsuranceDetails);
      navigate(
        `/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelCustomerEngage/TravelCustomerEngage`
      );
    }

    console.log("TravellerInsuranceDetails", TravellerInsuranceDetails);
  };
  const handleBack = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuickQuote`);
  };

  const handleEdit = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuickQuote`);
  };

  const [args, setArgs] = useState({
    productId: null,
    // partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const [masters, setMasters] = useState({
    TravelPEDList: [],
  });
  console.log("TravelPolicyType", masters);

  const getValue = (masterType, value) => {
    if (masters[masterType]) {
      const val = masters[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };

  useEffect(async () => {
    const argObj = {
      ...args,
      productId: 918,
      // partnerId: data.PartnerId,
      masterType: null,
      jsonValue: null,
    };
    setArgs(argObj);
    GetAllMasters(argObj, setMasters);
  }, []);
  // const handleTravelEdit = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote`);
  // };

  // const handleMedicalEdit = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote`);
  // };

  // const [setPED, setPEDFlag] = React.useState(true);
  // const [value, setValue] = React.useState("No");

  // const handleOpen = (event) => {
  //   setValue(event.target.value);
  // };

  // useEffect(() => {
  //   if (value === "No") setPEDFlag(false);
  //   else setPEDFlag(true);
  // });
  const breadcrumbs = [
    <MDTypography fontSize="15px">Home</MDTypography>,
    <MDTypography
      fontSize="15px"
      sx={{
        cursor: "pointer",
        color: "#0071D9",
        textDecoration: "underline",
      }}
    >
      <span onClick={handleProceed} role="button" onKeyDown={handleProceed} tabIndex="0">
        Travel Insurance
      </span>
    </MDTypography>,
  ];

  return (
    <MDBox>
      <BPNavbar />
      <MDBox sx={{ px: "2rem" }}>
        <Breadcrumbs
          p={8}
          sx={{ marginInlineStart: "-78px" }}
          fontSize="small"
          separator={<KeyboardDoubleArrowRightIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        {/* <MDBox display="flex" flexDirection="row">
          <KeyboardBackspace />
          <MDTypography variant="body1" sx={{ fontSize: 13 }}>
            Back
          </MDTypography>
        </MDBox> */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          display="flex"
          spacing={4}
          sx={{ mt: "2rem" }}
        >
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDBox component="img" src={Travelimg} sx={{ width: "70%" }} />
            <MDBox sx={{ fontsize: "32px", fontweight: 600, color: "#000000", rm: 2 }}>
              <MDTypography
                variant="h4"
                sx={{ fontSize: "1.9rem", color: "#000000" }}
                className="text"
                textAlign="center"
              >
                When you&apos;re ready to travel,
                <br />
                we&apos;re here for you
              </MDTypography>
              <MDTypography className="text" textAlign="center" sx={{ fontSize: "1rem" }} mt={2}>
                Avail best-in-class travel insurance online to
                <br />
                secure you and your family.
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <Card
              sx={{
                borderRadius: 0,
                background: "#CEEBFF",
                px: "1rem",
                marginTop: "-120px",
                width: "90%",
              }}
            >
              <MDBox>
                <MDButton
                  size="small"
                  onClick={handleEdit}
                  variant="outlined"
                  sx={{ position: "absolute", right: 10, mt: "3rem" }}
                  startIcon={<ModeEditIcon />}
                >
                  Edit
                </MDButton>

                <MDTypography
                  variant="h6"
                  sx={{ color: "#000000", mt: "2rem", fontSize: "1.5rem" }}
                >
                  Please check the details and proceed for plans
                </MDTypography>

                <MDTypography sx={{ fontSize: "1 rem" }}>One more step to view plans</MDTypography>

                <MDBox sx={{ mt: "1.5rem" }}>
                  <Stack direction="row" justifyContent="space-between">
                    <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
                      Destinations
                    </MDTypography>
                  </Stack>
                </MDBox>
              </MDBox>
              {/* <Grid container spacing="1 rem" flexDirection="row" sx={{ mt: 0 }}>
                <Stack direction="row">
                  <MDTypography variant="h6">
                    Policy Type:<b>{PolicyDto.PolicyType}</b>
                  </MDTypography>
                  <MDTypography variant="h6" style={{ position: "absolute", right: 80 }}>
                    No Of Travellers: <b>{PolicyDto.NOOfTravellingMembers}</b>
                  </MDTypography>
                </Stack>
              </Grid> */}
              {/* <Grid container spacing="1rem" flexDirection="row" sx={{ mt: "1rem" }}> */}
              {/* <Stack direction="row">
                  <MDTypography variant="h6" style={{ position: "absolute", left: 50 }}>
                    Geography: <b>{PolicyDto.Geography}</b>
                  </MDTypography> */}
              <MDBox sx={{ mt: "1rem" }}>
                <Stack direction="row" justifyContent="space-between">
                  <MDTypography variant="h6">
                    <b>{TravellerInsuranceDetails.ListOfDestinationValue} </b>
                  </MDTypography>
                </Stack>
              </MDBox>
              <MDBox>
                <MDBox sx={{ mt: "2rem" }}>
                  <Stack direction="row" justifyContent="space-between">
                    <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
                      Travellers Details
                    </MDTypography>
                    {/* <MDButton
                      variant="outlined"
                      onClick={handleTravelEdit}
                      style={{ position: "absolute", left: 220 }}
                      startIcon={<ModeEditIcon />}
                    >
                      Edit
                    </MDButton> */}
                  </Stack>
                </MDBox>
              </MDBox>
              <MDBox flexDirection="row" sx={{ mt: "1rem" }}>
                <Grid container spacing={2}>
                  {/* {TravellerInsuranceDetails.TravellerDetails.map((item) => ( */}
                  {TravellerInsuranceDetails.InsurableItem[0].RiskItems.map((x) => (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDBox display="flex" flexDirection="row">
                        {x.YearMonthDay.years !== 0 ? (
                          <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                            {x.Name}({x.DOB !== "" ? `${x.YearMonthDay.years} Years` : ""})
                          </MDTypography>
                        ) : null}
                        {x.YearMonthDay.years === 0 &&
                        x.YearMonthDay.months !== 0 &&
                        x.YearMonthDay.days !== 0 ? (
                          <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                            {x.Name}({x.DOB !== "" ? ` ${x.YearMonthDay.months} Months` : ""})
                          </MDTypography>
                        ) : null}
                        {x.YearMonthDay.years === 0 &&
                        x.YearMonthDay.months === 0 &&
                        x.YearMonthDay.days !== 0 ? (
                          <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                            {x.Name}({x.DOB !== "" ? ` ${x.YearMonthDay.days} Days` : ""})
                          </MDTypography>
                        ) : null}
                      </MDBox>
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
              <MDBox>
                <MDBox sx={{ mt: "2rem" }}>
                  <Stack direction="row" justifyContent="space-between">
                    <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
                      Pre-Existing Medical Condition
                    </MDTypography>
                    {/* <MDButton
                      variant="outlined"
                      onClick={handleMedicalEdit}
                      style={{ position: "absolute", left: 340 }}
                      startIcon={<ModeEditIcon />}
                    >
                      Edit
                    </MDButton> */}
                  </Stack>
                </MDBox>
              </MDBox>
              <MDBox display="flex" flexDirection="row">
                <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                  <MDBox display="flex" flexDirection="row">
                    <MDTypography
                      variant="h6"
                      sx={{ fontSize: "0.75rem", color: "#344054", weight: 400, pt: 0.7 }}
                    >
                      Does any member have an existing illness or medical history?
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDBox display="flex" flexDirection="row">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{ justifyContent: "center", ml: 2.5 }}
                      value={TravellerInsuranceDetails.PreExistingDisease}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label="Yes"
                        name="PreExistingDisease"
                        value="Yes"
                        disabled
                      />

                      <FormControlLabel
                        control={<Radio />}
                        label="No"
                        name="PreExistingDisease"
                        value="No"
                        disabled
                      />
                    </RadioGroup>
                  </MDBox>
                </Grid>
              </MDBox>
              {TravellerInsuranceDetails.PreExistingDisease === "Yes" ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography
                      variant="h6"
                      sx={{
                        color: "#344054",
                        fontSize: "0.875 rem",
                        textDecoration: "underline",
                      }}
                      display="inline"
                    >
                      Selected Travellers
                    </MDTypography>
                  </Grid>

                  {TravellerInsuranceDetails.InsurableItem[0].RiskItems.filter(
                    (x) => x.PreExistingDisease === true
                  ).map((x) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                        {x.Name}({x.Age}Years)
                      </MDTypography>
                      <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                        {getValue("TravelPEDList", x.TravelPEDList)}
                      </MDTypography>
                    </Grid>
                  ))}
                </Grid>
              ) : null}
              <Grid container justifyContent="space-between">
                <MDButton
                  onClick={handleBack}
                  variant="outlined"
                  color="info"
                  sx={{ mt: "1rem", mb: "1rem" }}
                >
                  Back
                </MDButton>

                <MDButton
                  variant="contained"
                  color="info"
                  sx={{ mt: "1rem", mb: "1rem" }}
                  onClick={handleProceed}
                >
                  Proceed
                </MDButton>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default TravelDetails;
