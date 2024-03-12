import { useEffect } from "react";
import { Grid } from "@mui/material";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";

function TemplateUpload() {
  useEffect(() => {}, []);
  return (
    <MDBox sx={{ bgcolor: "#FFFFFF" }} p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="body1" color="primary">
            Template Configuration
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput required label="Template Id" type="number" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput required label="Name" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput required label="Description" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput required label="Stored Procedure Name" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput required label="DB Details" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <MDButton variant="outlined">Upload Excel</MDButton>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
            <MDButton>Submit</MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
    // api/ExcelUpload/ExcelTemplateConfiguration
    // TemplateId: 117
    // Name: test117
    // Description: test117
    // StoredProcedureName: test117
    // Dbdetails: test117
    // Document: (binary)
  );
}
export default TemplateUpload;
