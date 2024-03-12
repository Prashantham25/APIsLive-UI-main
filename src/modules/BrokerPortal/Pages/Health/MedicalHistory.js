import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import MDButton from "../../../../components/MDButton";
import { useDataController, setHealthInsuranceDetails } from "../../context";

function MemberCard({ mtext, handleChange }) {
  return (
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
      <Card
        sx={{
          width: "10.75rem",
          fontFamily: "Inter",
          fontSize: "19px",
          height: "3.7rem",
          border: "0.5px solid rgba(0, 0, 0, 0.3)",
          borderRadius: "0.25rem",
          boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          p: "0.625rem",
          "&:hover": {
            backgroundColor: "#1976D2",
            cursor: "pointer",
            color: "#ffffff",
          },
        }}
      >
        <MDBox display="flex" flexDirection="row">
          <Checkbox onChange={handleChange} value={mtext} />
          {mtext}
        </MDBox>
      </Card>
    </Grid>
  );
}

function MedicalHistory({ handleBack, Json }) {
  const [controller, dispatch] = useDataController();
  const { HealthInsuranceDetails } = controller;
  const [radio, setRadio] = useState({
    value: "No",
  });
  const [RadioFlag, setRadioFlag] = useState(false);
  const navigate = useNavigate();

  const [QuoteJson] = useState(Json);
  const OnNext = () => {
    setHealthInsuranceDetails(dispatch, QuoteJson);
    navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote/HealthInputSummary`);
  };

  const OnBack = () => {
    handleBack();
  };

  const handleRadioChange = (e) => {
    if (e.target.name === "value") {
      if (e.target.value === "Yes") {
        setRadioFlag(true);
      } else {
        setRadioFlag(false);
      }
    }
    const newValue = { ...radio, [e.target.name]: e.target.value };
    setRadio(newValue);
  };
  const [diseases, updatediseases] = useState([]);

  const handleChange = (e) => {
    // setdiseases({ ...diseases, [e.target.name]: e.target.value });
    if (e.target.checked === true) {
      updatediseases((arr) => [...arr, e.target.value]);
    } else if (e.target.checked === false) {
      const ndiseases = diseases.filter((val) => val !== e.target.value);
      updatediseases([...ndiseases]);
    }
  };

  // useEffect(() => {
  //   setMedicaldiseases(dispatch, diseases);
  //   console.log(diseases);
  // }, [diseases]);
  useEffect(() => {
    setHealthInsuranceDetails(dispatch, { ...HealthInsuranceDetails, Diseases: [...diseases] });
    console.log(HealthInsuranceDetails);
  }, [diseases]);

  return (
    <MDBox>
      <MDTypography>Tell us your family Medical History </MDTypography>
      <MDBox mt={4}>
        <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
          <MDTypography sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}>
            Does any member have an existing illness or medical history?
          </MDTypography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ justifyContent: "center", ml: 2.5 }}
          >
            <FormControlLabel
              checked={radio.value === "Yes"}
              control={<Radio />}
              label="Yes"
              name="value"
              onChange={handleRadioChange}
              value="Yes"
            />

            <FormControlLabel
              checked={radio.value === "No"}
              control={<Radio />}
              label="No"
              name="value"
              onChange={handleRadioChange}
              value="No"
            />
          </RadioGroup>
        </MDBox>
      </MDBox>
      {RadioFlag && (
        <MDBox>
          <MDTypography sx={{ fontSize: "0.875", color: "#000000" }}>
            Select the Existing medical diseases
          </MDTypography>
          <MDBox mt={4} sx={{ fontSize: "0.875" }}>
            <Grid container textAlign="center" spacing={3}>
              <MemberCard
                mtext="Diabetes"
                handleChange={handleChange}
                updatediseases={updatediseases}
              />
              <MemberCard
                mtext="Blood pressure"
                handleChange={handleChange}
                updatediseases={updatediseases}
              />
              <MemberCard
                mtext="Heart Disease"
                handleChange={handleChange}
                updatediseases={updatediseases}
              />
              <MemberCard
                mtext="BP/Hypertension"
                handleChange={handleChange}
                updatediseases={updatediseases}
              />
              <MemberCard
                mtext="Thyroid Disorder"
                handleChange={handleChange}
                updatediseases={updatediseases}
              />
              <MemberCard
                mtext="Asthma"
                handleChange={handleChange}
                updatediseases={updatediseases}
              />
              <MemberCard
                mtext="Surgical procedure"
                handleChange={handleChange}
                updatediseases={updatediseases}
              />
              <MemberCard
                mtext="Covid 19"
                handleChange={handleChange}
                updatediseases={updatediseases}
              />
              <MemberCard
                mtext="Any other"
                handleChange={handleChange}
                updatediseases={updatediseases}
              />
            </Grid>
          </MDBox>
        </MDBox>
      )}
      <MDBox>
        <Grid container justifyContent="space-between">
          <MDButton
            onClick={OnBack}
            // disabled={activeStep === 0}
            variant="outlined"
            color="info"
            sx={{ mt: "2rem" }}
          >
            Back
          </MDButton>

          <MDButton
            onClick={OnNext}
            // disabled={activeStep === steps.length}
            variant="contained"
            color="info"
            sx={{ mt: "2rem" }}
          >
            Proceed
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default MedicalHistory;
