import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Grid, Stack } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "../../../../../components/MDButton";

function LivesDetails({ PolicyDto }) {
  const empCount = ["19-35 Years", "36-45 Years", "46-55 Years", "56-65 Years"];
  const spouseCount = ["19-35 Years", "36-45 Years", "46-55 Years", "56-65 Years"];
  const KidsCount = ["Total Kids"];
  return (
    <MDBox pr={2}>
      <MDTypography variant="body1" sx={{ my: "1rem" }} color="primary">
        Upload details of the Lives
      </MDTypography>
      <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
        <MDInput type="file" lable="Browse" />
        <MDButton>Upload</MDButton>
      </Stack>
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Details of Lives
      </MDTypography>
      <MDInput label="Total No of Lives" fullWidth="false" value={PolicyDto.TotalLivesCount} />
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Employee Count
      </MDTypography>
      <Stack spacing={1} direction="row">
        {empCount.map((item, index) => (
          <MDInput
            label={item}
            value={PolicyDto.InsurableItem[0].RiskItemSummary[index].EmployeeCount}
          />
        ))}
      </Stack>
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Spouse Count
      </MDTypography>
      <Stack spacing={1} direction="row">
        {spouseCount.map((item, index) => (
          <MDInput
            label={item}
            value={PolicyDto.InsurableItem[0].RiskItemSummary[index].SpouseCount}
          />
        ))}
      </Stack>
      <MDTypography variant="body2" fontWeight="regular" sx={{ my: "1rem" }} color="primary">
        Kids Count
      </MDTypography>
      <Grid container spacing={2}>
        {KidsCount.map((item) => (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput label={item} value={PolicyDto.TotalKidsCount} />
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
}

export default LivesDetails;
