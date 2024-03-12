import React from "react";
import { Stack, Grid, Container } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";

function DocumentsUpload() {
  return (
    <Container>
      <MDBox pt={3}>
        <Stack spacing={2}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4} textAlign="left">
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }} textAlign="left">
                Valuation Report
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Structure Audit Report
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Details of Contents
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Additional Document 1
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Additional Document 2
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Additional Document 3
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Additional Document 4
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Additional Document 5
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid>
        </Stack>
      </MDBox>
    </Container>
  );
}

export default DocumentsUpload;
