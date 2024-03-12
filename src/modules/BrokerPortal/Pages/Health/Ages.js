import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import MDButton from "../../../../components/MDButton";
import { useDataController, setHealthInsuranceDetails } from "../../context";
import MDInput from "../../../../components/MDInput";
import { CompData } from "./HealthQuote/data";

function Ages({ handleNext, handleBack, Json }) {
  const [controller, dispatch] = useDataController();

  const { HealthInsuranceDetails } = controller;
  console.log(HealthInsuranceDetails, "health");
  const data1 = HealthInsuranceDetails.newArray;
  // const gender = [{ label: "Male" }, { label: "Female" }];

  const { Gender } = CompData().QuoteData.Masters;

  const [QuoteJson, setQuoteJson] = useState(Json);
  const handleCalculateAge = (date) => {
    // const dob = new Date(date);
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();

    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    }
    // get months when current month is greater
    else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }

    // get days
    // let dateAge;
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      // dateAge = 31 + currentDate - dobDate;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    // group the age in a single variable
    return yearAge;
  };
  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const handleDateChange = (index, date, label) => {
    const dob = date;
    const age = handleCalculateAge(dob);

    const difAge = HealthInsuranceDetails.selfAge - HealthInsuranceDetails.son1Age;
    console.log(difAge);

    if (HealthInsuranceDetails.newArray[index].identity === label) {
      HealthInsuranceDetails.newArray[index].DOB = formatDate(dob);
      HealthInsuranceDetails.newArray[index].Age = age;
      setHealthInsuranceDetails(dispatch, {
        ...HealthInsuranceDetails,
      });
    }
    console.log(HealthInsuranceDetails, "health");
  };

  const handleGenderChange = (event, values, index) => {
    HealthInsuranceDetails.newArray[index].Gender = values.mID;
    HealthInsuranceDetails.newArray[index].GenderValue = values.mValue;
    setHealthInsuranceDetails(dispatch, {
      ...HealthInsuranceDetails,
    });
    console.log(HealthInsuranceDetails, "health1");
  };
  const handleDetails = data1.map((row, index) => (
    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
      <MDBox ml={-6} sx={{ width: "280px" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label={`${row.identity} Age`}
            name={row.identity}
            inputFormat="dd/MM/yyyy"
            onChange={(date) => handleDateChange(index, date, row.identity)}
            value={HealthInsuranceDetails.newArray[index].DOB}
            renderInput={(params) => <TextField {...params} />}
          />{" "}
          <MDInput disabled sx={{ width: "70px", ml: -15 }} value={row.Age} />
        </LocalizationProvider>
      </MDBox>
    </Grid>
  ));

  const handleGender = data1.map((row, index) =>
    row.identity === "Self" || row.identity === "Spouse" ? (
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDBox sx={{ width: "230px" }}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            value={{ mValue: HealthInsuranceDetails.newArray[index].GenderValue || "" }}
            options={Gender}
            getOptionLabel={(option) => option.mValue}
            onChange={(event, value) => handleGenderChange(event, value, index)}
            renderInput={(params) => (
              <MDInput {...params} placeholder="Select" label={`${row.identity} Gender`} />
            )}
          />
        </MDBox>
      </Grid>
    ) : null
  );
  const OnNext = () => {
    const { InsurableItem } = QuoteJson;
    const { RiskItems } = InsurableItem[0];
    const Riskdetails = RiskItems;

    const data = HealthInsuranceDetails.newArray.map((item, index) => {
      const RiskItem = Riskdetails[index];
      RiskItem.DateOfBirth = item.DOB;
      RiskItem.Age = item.Age;
      if (Object.keys(item).filter((x) => x === "Gender").length > 0) {
        RiskItem.Gender = item.Gender;
      } else if (
        RiskItem.RelationshipWithApplicant === "Mother" ||
        RiskItem.RelationshipWithApplicant === "MotherInLaw" ||
        RiskItem.RelationshipWithApplicant === "Daughter"
      ) {
        RiskItem.Gender = "20";
      } else if (
        RiskItem.RelationshipWithApplicant === "Father" ||
        RiskItem.RelationshipWithApplicant === "FatherInLaw" ||
        RiskItem.RelationshipWithApplicant === "Son"
      ) {
        RiskItem.Gender = "19";
      }
      return RiskItem;
    });
    InsurableItem[0].RiskItems = data;
    setQuoteJson((prevState) => ({ ...prevState, ...InsurableItem }));
    console.log("QuoteJson", QuoteJson);
    handleNext();
  };

  const OnBack = () => {
    handleBack();
  };

  return (
    <MDBox>
      <MDBox mt={4}>
        <Grid container textAlign="center" spacing={3}>
          {handleGender}
        </Grid>
      </MDBox>
      <MDBox mt={4}>
        <Grid container textAlign="center" spacing={3}>
          {handleDetails}
        </Grid>
      </MDBox>

      <MDBox>
        <MDTypography>
          <span style={{ fontSize: "0.7rem" }}>Disclaimer: </span>
          <span style={{ color: "#D90000", fontSize: "0.7rem" }}>
            Age gap between parent and child should be 18 years or above
          </span>
        </MDTypography>
      </MDBox>
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

export default Ages;
