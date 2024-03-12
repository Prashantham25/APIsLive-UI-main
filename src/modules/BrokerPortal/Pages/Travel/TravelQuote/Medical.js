import React, { useState, useEffect } from "react";
import { Grid, Stack, Checkbox, Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
// import { data } from "../data/JsonData";
// import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
// import RiskDetails from "../../../../PolicyLive/views/BLUS/RiskDetails";
// import { useDataController, setTravellerInsuranceDetails } from "../../../context";
import { useDataController, setTravellerInsuranceDetails } from "../../../context";

function Medical({ handleNext, handleBack }) {
  const [controller, dispatch] = useDataController();
  const { TravellerInsuranceDetails } = controller;
  const [PolicyDto, setPolicyDto] = useState(TravellerInsuranceDetails);
  const TPolicyDto = PolicyDto;
  const RiskDetails = PolicyDto.InsurableItem[0].RiskItems;
  const [setPED, setPEDFlag] = React.useState(true);
  const [value, setValue] = React.useState("No");

  // const { TravellerInsuranceDetails } = controller;
  const data1 = TravellerInsuranceDetails.PolicyDto;

  const handleChangePed = (event, index) => {
    const { checked } = event.target;
    console.log("index", index);
    console.log("data1", data1);
    console.log("checked", checked);

    const filteredData = { ...data1[index] };
    filteredData.TravellerPed = checked;
    data1.splice(index, 1, { ...filteredData });

    setTravellerInsuranceDetails(dispatch, {
      ...TravellerInsuranceDetails,
      PolicyDto: data1,
    });
    // console.log("data1", data1);
  };

  const handleOpen = (event) => {
    setValue(event.target.value);
  };

  const [flags, setFlags] = useState({
    errorFlag: false,
  });

  const onNext = () => {
    if (PolicyDto.Name === "" || PolicyDto.PreExistingDisease === "") {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
    } else {
      setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
      setTravellerInsuranceDetails(dispatch, TPolicyDto);
      console.log("policy123", TPolicyDto);
      handleNext();
    }
  };

  useEffect(() => {
    if (value === "No") setPEDFlag(false);
    else setPEDFlag(true);
  });

  const preexist = RiskDetails.map((x, row, index) => (
    <MDBox
      sx={{
        height: "40%",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 1,
      }}
      pl={2}
    >
      <FormControlLabel
        control={
          <Checkbox
            type="checkbox"
            name="Status"
            value="Status"
            checked={row.TravellerPed} // <-- set the checked prop of input
            onChange={(e) => handleChangePed(e, index)}
          />
        }
        label={x.Name}
      />
    </MDBox>
  ));

  const handleRadio = (e) => {
    TPolicyDto[e.target.name] = e.target.value;
    if (e.target.name === "PreExistingDisease") {
      setPolicyDto((prevState) => ({
        ...prevState,
        PreExistingDisease: e.target.value,
      }));
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };

  return (
    <Grid container mt="2rem">
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography className="text" textAlign="left" variant="h5" mt="2rem">
          Tell us if any of the traveller having any pre-existing medical condition?
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" spacing={2} sx={{ mt: "4rem" }}>
          <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
            Does any of the travellers have any pre-existing medical condition?
          </MDTypography>
          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <RadioGroup row onChange={(event) => handleChange(event)} value={value}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid> */}
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <RadioGroup
              row
              name="PreExistingDisease"
              value={PolicyDto.PreExistingDisease}
              onChange={(e) => {
                handleRadio(e);
              }}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" onClick={handleOpen} />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    variant="outlined"
                    required
                    error={
                      Object.values(PolicyDto.PreExistingDisease || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(PolicyDto.PreExistingDisease || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </RadioGroup>
          </Grid>
        </Stack>
      </Grid>

      {setPED ? (
        <>
          {/* { TPolicyDto.TripType === "SingleTrip" ? (
         <> */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="2rem">
            <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "0.75rem" }}>
              Please select the travellers who have a pre-existing medical condition
            </MDTypography>
          </Grid>
          <Box width="100%">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2} mt={2}>
                {preexist}
              </Stack>
            </Grid>
          </Box>
        </>
      ) : null}
      <Grid container justifyContent="space-between">
        <MDButton variant="outlined" color="info" sx={{ mt: "2rem" }} onClick={handleBack}>
          Back
        </MDButton>
        <MDButton
          // disabled={activeStep === steps.length - 1}
          // display={activeStep !== steps.length - 1}
          // onClick={activeStep === steps.length - 1 ? { handleProceed } : { handleNext }}
          variant="contained"
          color="info"
          sx={{ mt: "2rem", textAlign: "right" }}
          onClick={onNext}
        >
          Proceed
        </MDButton>
      </Grid>
    </Grid>
  );
}

export default Medical;
