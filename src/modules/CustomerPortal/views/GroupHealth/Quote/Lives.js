import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Grid, Stack } from "@mui/material";
import MDInput from "components/MDInput";

function Lives({ handleCount }) {
  const empCount = ["19-35 Years", "36-45 Years", "46-55 Years", "56-65 Years"];
  // const si = [
  //   "SI for 19-35 Years",
  //   "SI for 36-45 Years",
  //   "SI for 46-55 Years",
  //   "SI for 56-65 Years",
  // ];

  const spouseCount = ["19-35 Years", "36-45 Years", "46-55 Years", "56-65 Years"];
  const KidsCount = ["Total Kids"];
  return (
    <MDBox mt={1}>
      <MDTypography variant="body1" sx={{ my: "1rem" }} color="primary">
        Tell us about No of Lives
      </MDTypography>
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Enter Employee Count
      </MDTypography>
      <Stack spacing={1} direction="row">
        {empCount.map((item, index) => (
          <MDInput label={item} onChange={(e) => handleCount(e, index, "employee")} />
        ))}
      </Stack>
      {/* <br />
      <Stack spacing={1} direction="row">
        {si.map((item, index) => (
          <MDInput label={item} onChange={(e) => handleCount(e, index, "si")} />
        ))}
      </Stack> */}

      <br />
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Enter Spouse Count
      </MDTypography>
      <Stack spacing={1} direction="row">
        {spouseCount.map((item, index) => (
          <MDInput label={item} onChange={(e) => handleCount(e, index, "spouse")} />
        ))}
      </Stack>
      <br />
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Enter Kids Count
      </MDTypography>
      <Grid container spacing={2}>
        {KidsCount.map((item, index) => (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput label={item} onChange={(e) => handleCount(e, index, "kid")} />
          </Grid>
        ))}
      </Grid>
      <br />
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="DependentMemberSublimit"
            label="Dependent Member SubLimit"
            onChange={handleData}
          />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput name="FamilyDefinition" label="Family Definition" onChange={handleData} />
        </Grid> */}
      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="TotalLivesCount"
            label="Total Lives Count"
            value={PolicyDto.TotalLivesCount}
          />
        </Grid> */}
      {/* </Grid> */}
    </MDBox>
  );
}

export default Lives;
