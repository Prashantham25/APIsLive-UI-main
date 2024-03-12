import { React } from "react";
import { Grid, FormControlLabel, Radio, RadioGroup } from "@mui/material";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";

function CKYCSummary({ data }) {
  return (
    <MDBox>
      <MDBox px={2}>
        <Grid m={2}>
          <Grid container justifyContent="center">
            <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
              <MDTypography sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}>
                Do you have your CKYC Number
              </MDTypography>

              <RadioGroup
                row
                name="row-radio-buttons-group"
                sx={{ justifyContent: "center", ml: 2.5 }}
                value={data.KYC.isKYCDone}
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </MDBox>
          </Grid>

          {data.KYC.isKYCDone === "true" ? (
            <>
              <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                {/* {data.PartnerId === "62" ? "PAN Details" : "CKYC Details"} */}
                CKYC Details
              </MDTypography>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput label="CKYC Number" value={data.KYC.CKYCNo} disabled />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput label="DOB" value={data.KYC.DOB} disabled />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDButton variant="outlined" color="info" component="label">
                    Upload Photo
                    <input hidden accept="image/bmp, image/jpeg, image/png, .pdf" type="file" />
                  </MDButton>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                {/* {data.PartnerId === "62" ? "PAN Details" : "CKYC Details"} */}
                Pan Card Details
              </MDTypography>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput label="PAN Number" value={data.KYC.PANNo} disabled />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput label="DOB" value={data.KYC.DOB} disabled />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDButton variant="outlined" color="info" component="label">
                    Upload Photo
                    <input hidden accept="image/bmp, image/jpeg, image/png, .pdf" type="file" />
                  </MDButton>
                </Grid>
              </Grid>
            </>
          )}

          <Grid container justifyContent="center">
            <MDButton
              marginTop="30px"
              marginBottom="80px"
              color="info"
              variant="contained"
              sx={{ marginTop: "60px" }}
              // onClick={isKyc === "Yes" ? handleSubmit : handleSubmitForNoCase}
            >
              Submit
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
export default CKYCSummary;
