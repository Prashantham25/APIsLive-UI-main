import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function Location({ handleNext, handleBack, policyDto, setPolicyDto }) {
  // const pincodeRegex = /^[0-9]{1,6}$/;
  const LPolicyDto = policyDto;
  const [PincodeDTO, setPincodeDTO] = useState({
    Pincode: "",
    ParentsPincode: "",
    ParentInLawPincode: "",
  });

  const [flags, setFlags] = useState({
    Pincode: false,
    ParentsPincode: false,
    ParentInLawPincode: false,
  });

  useEffect(() => {
    policyDto.InsurableItem[0].RiskItems.forEach((x) => {
      const rs = x.RelationshipWithApplicant;
      if (rs === "Self" || rs === "Spouse" || rs === "Son" || rs === "Daughter")
        flags.Pincode = true;
      if (rs === "Father" || rs === "Mother") flags.ParentsPincode = true;
      if (rs === "FatherInLaw" || rs === "MotherInLaw") flags.ParentInLawPincode = true;
    });
    setFlags({ ...flags });
  }, []);

  const handleChange = (val, type) => {
    PincodeDTO[type] = val;

    const arr = [...LPolicyDto.InsurableItem[0].RiskItems];
    const arr1 = [];
    arr.forEach((x1) => {
      const rs = x1.RelationshipWithApplicant;
      if (type === "Pincode") {
        if (rs === "Self" || rs === "Spouse" || rs === "Son" || rs === "Daughter")
          arr1.push({
            rss: rs,
            ar: [{ city: "", Pincode: val, state: "", street: "", ZoneId: "" }],
          });
      }
      if (type === "ParentsPincode") {
        if (rs === "Father" || rs === "Mother")
          arr1.push({
            rss: rs,
            ar: [{ city: "", Pincode: val, state: "", street: "", ZoneId: "" }],
          });
      }
      if (type === "ParentInLawPincode") {
        if (rs === "FatherInLaw" || rs === "MotherInLaw")
          arr1.push({
            rss: rs,
            ar: [{ city: "", Pincode: val, state: "", street: "", ZoneId: "" }],
          });
      }
    });

    arr.forEach((x1, i1) => {
      arr1.forEach((x2) => {
        if (x2.rss === x1.RelationshipWithApplicant) arr[i1].Address = x2.ar;
      });
    });

    console.log("LPolicyDto", arr, PincodeDTO);
    LPolicyDto.InsurableItem[0].RiskItems = [...arr];
    setPincodeDTO({ ...PincodeDTO });
    setPolicyDto({ ...LPolicyDto });
  };

  const OnNext = () => {
    handleNext();
  };
  const OnBack = () => {
    handleBack();
  };
  return (
    <MDBox>
      <MDTypography> Tell us where do you & your family members live </MDTypography>

      {policyDto && policyDto.InsurableItem && policyDto.InsurableItem[0].RiskItems && (
        <Grid container spacing={3} p={2}>
          {flags.Pincode && (
            <Grid item xs={12} md={12} lg={6} xl={6} xxl={6}>
              <MDTypography sx={{ fontSize: "1.25rem", color: "#000000" }}>
                Where do you live?
              </MDTypography>
            </Grid>
          )}
          {flags.Pincode && (
            <Grid item xs={12} md={12} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Pincode you live"
                value={PincodeDTO.Pincode}
                onChange={(e) => handleChange(e.target.value, "Pincode")}
              />
            </Grid>
          )}
          {flags.ParentsPincode && (
            <Grid item xs={12} md={12} lg={6} xl={6} xxl={6}>
              <MDTypography sx={{ fontSize: "1.25rem", color: "#000000" }}>
                Where do your parents live?
              </MDTypography>
            </Grid>
          )}
          {flags.ParentsPincode && (
            <Grid item xs={12} md={12} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Pincode your parents live"
                value={PincodeDTO.ParentsPincode}
                onChange={(e) => handleChange(e.target.value, "ParentsPincode")}
              />
            </Grid>
          )}
          {flags.ParentInLawPincode && (
            <Grid item xs={12} md={12} lg={6} xl={6} xxl={6}>
              <MDTypography sx={{ fontSize: "1.25rem", color: "#000000" }}>
                Where do your parent-in-law`s live?
              </MDTypography>
            </Grid>
          )}
          {flags.ParentInLawPincode && (
            <Grid item xs={12} md={12} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Pincode your parent-in-law`s  live"
                value={PincodeDTO.ParentInLawPincode}
                onChange={(e) => handleChange(e.target.value, "ParentInLawPincode")}
              />
            </Grid>
          )}
        </Grid>
      )}

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

export default Location;
