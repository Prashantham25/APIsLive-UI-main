import React from "react";
import { Grid } from "@mui/material";
import MDInput from "components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDTypography from "../../../../../components/MDTypography";

function ProviderRegistrationDetails() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Authority/Statute" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Date of Establishment of Hospital" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Registration Date" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Valid Upto Date" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Registration Number" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Compliance" />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 17, mt: 3 }}>
          Certificate under PNDT Act,Clinical Establishment Act, and other Acts/statutory
          compliances as applicable
        </MDTypography>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 17, mt: 3 }}>
          Upload Document
        </MDTypography>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 3 }}>
          Drag Files or Click to Browse
        </MDTypography>

        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 17, mt: 5 }}>
          Hospital Registration Certificate isuued by relevent authority : UploadDocument
        </MDTypography>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 3 }} justifyContent="space-between">
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
    </Grid>
  );
}

export default ProviderRegistrationDetails;
