import { Grid, Card, CardContent } from "@mui/material";
import React from "react";
import Success from "../../../../assets/images/Success.png";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";

function Result({
  result,
  total,
  isSuccess,
  handleViewCourseClick,
  handleDownloadCertClick,
  handleCertificateDownload,
}) {
  return (
    <MDBox sx={{ flexGrow: 1, p: 4 }}>
      <Card>
        <CardContent>
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <img src={Success} alt="result" />
            </Grid>
            <Grid item>
              <h2>{!isSuccess ? "Congratulations" : "Sorry"}!</h2>
            </Grid>
            <Grid item>
              <h4>
                You have scored{" "}
                <span style={!isSuccess ? { color: "#00CA72" } : { color: "red" }}>
                  {result} Marks
                </span>{" "}
                out of {total} Marks
              </h4>
            </Grid>
            {!isSuccess && (
              <Grid item>
                <MDBox display="flex" flexDirection="row">
                  <MDTypography>
                    We will mail your certificate to your email and also you can access from&nbsp;
                  </MDTypography>
                  <MDTypography
                    sx={{
                      color: "#0071D9",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={handleCertificateDownload}
                  >
                    My Certificate
                  </MDTypography>{" "}
                  &nbsp;section
                </MDBox>
              </Grid>
            )}
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <MDButton variant="outlined" onClick={handleViewCourseClick}>
                    View My Courses
                  </MDButton>
                </Grid>
                {!isSuccess && (
                  <Grid item>
                    <MDButton onClick={handleDownloadCertClick}>Download Certificate</MDButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </MDBox>
  );
}

export default Result;
