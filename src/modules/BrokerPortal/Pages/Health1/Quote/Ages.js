import { useEffect, useState } from "react";
import { Autocomplete, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDDatePicker from "components/MDDatePicker";
import { AgeCalculator } from "Common/Validations";
import { GetProdPartnermasterData } from "../data";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "5px!important",
  },
};

function Ages({ handleNext, handleBack, policyDto, setPolicyDto }) {
  const LPolicyDto = policyDto;

  const [Gender, setGender] = useState([]);

  const handleGenderChange = (e, v, i) => {
    LPolicyDto.InsurableItem[0].RiskItems[i].Gender = v.mID;
    LPolicyDto.InsurableItem[0].RiskItems[i].GenderValue = v.mValue;
    setPolicyDto({ ...LPolicyDto });
  };

  const OnNext = () => {
    policyDto.InsurableItem[0].RiskItems.forEach((x, i) => {
      if (
        x.RelationshipWithApplicant === "Mother" ||
        x.RelationshipWithApplicant === "MotherInLaw" ||
        x.RelationshipWithApplicant === "Daughter"
      ) {
        LPolicyDto.InsurableItem[0].RiskItems[i].Gender = "20";
      }
      if (
        x.RelationshipWithApplicant === "Father" ||
        x.RelationshipWithApplicant === "FatherInLaw" ||
        x.RelationshipWithApplicant === "Son"
      ) {
        LPolicyDto.InsurableItem[0].RiskItems[i].Gender = "20";
      }
    });
    setPolicyDto({ ...LPolicyDto });
    handleNext();
  };

  const OnBack = () => {
    handleBack();
  };

  const onDateChanger = (e, d, i) => {
    LPolicyDto.InsurableItem[0].RiskItems[i].DateOfBirth = d;
    LPolicyDto.InsurableItem[0].RiskItems[i].Age = AgeCalculator(new Date(e));
    setPolicyDto({ ...LPolicyDto });
  };

  useEffect(async () => {
    const data = await GetProdPartnermasterData(780, "Gender", {});
    setGender([...data]);
  }, []);
  return (
    <MDBox>
      {policyDto && policyDto.InsurableItem && policyDto.InsurableItem[0].RiskItems && (
        <Grid container spacing={2}>
          {policyDto.InsurableItem[0].RiskItems.map((x, i) => (
            <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
              {(x.RelationshipWithApplicant === "Self" ||
                x.RelationshipWithApplicant === "Spouse") && (
                <Autocomplete
                  sx={autoStyle}
                  options={Gender}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: x.GenderValue }}
                  onChange={(e, v) => handleGenderChange(e, v, i)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      placeholder="Select"
                      label={`${x.RelationshipWithApplicant} Gender`}
                    />
                  )}
                />
              )}
            </Grid>
          ))}

          <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
            <Grid container spacing={1}>
              {policyDto.InsurableItem[0].RiskItems.map((x, i) => (
                <Grid item xs={12} md={12} lg={6} xl={6} xxl={6}>
                  <Stack direction="row" spacing={2}>
                    <MDDatePicker
                      fullWidth
                      onChange={(e, d) => onDateChanger(e, d, i)}
                      value={x.DateOfBirth}
                      input={{ label: `${x.RelationshipWithApplicant} DOB`, value: x.DateOfBirth }}
                      options={{
                        dateFormat: "d-m-Y",
                        altFormat: "d/m/Y",
                        altInput: true,
                      }}
                    />
                    <MDInput label={`${x.RelationshipWithApplicant} Age`} value={x.Age} />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}

      <MDBox>
        <MDTypography>
          <span style={{ fontSize: "0.7rem" }}>Disclaimer: </span>
          <span style={{ color: "#D90000", fontSize: "0.7rem" }}>
            Age gap between parent and child should be 18 years or above
          </span>
        </MDTypography>
      </MDBox>
      <MDBox sx={{ mt: "2rem" }}>
        <Grid container justifyContent="space-between">
          <MDButton onClick={OnBack} variant="outlined" color="info">
            Back
          </MDButton>
          <MDButton onClick={OnNext} variant="contained" color="info">
            Proceed
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Ages;
