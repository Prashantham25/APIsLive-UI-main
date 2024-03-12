import * as React from "react";
import { Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
//  import PageLayout from "../../../../../examples/LayoutContainers/PageLayout";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function HealthProposal() {
  return (
    <MDBox pt={16} pl={44}>
      <MDBox
        p={2}
        sx={{
          background: "#FFFFFF",
          height: "505px",
          width: "834px",
          borderRadius: "0px",
        }}
      >
        <Grid container>
          <MDTypography
            sx={{
              fontWeight: "600",
              fontSize: "20px",
              color: "#000000",
            }}
          >
            Riders available with this plan
          </MDTypography>
          <MDTypography
            sx={{
              fontWeight: "400",
              fontsize: "16px",
              lineHeight: "26px",
              color: "#000000",
            }}
          >
            Riders will enhance your current plan with additional benefits. You should get these
            additional benefits to enhance your current plan
          </MDTypography>
        </Grid>
        <br />
        <Grid>
          <MDTypography
            sx={{
              fontWeight: "500",
              fontSize: "16px",
              color: "rgba(0, 0, 0, 0.87)",
            }}
          >
            Hospital Cash
          </MDTypography>
          <Grid container>
            <MDTypography
              sx={{
                fontWeight: "400",
                fontSize: "12px",
                color: "rgba(0, 0, 0, 0.87)",
                width: "443px",
              }}
            >
              The add-on pays hospital cash for up to 30 days of hospitalisation if hospitalised for
              more than 48 hours
            </MDTypography>
            <Grid pl={28}>
              <MDBox
                align="right"
                sx={{
                  borderRadius: "3px",
                  background: "rgba(217, 217, 217, 0.3)",
                  border: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              >
                <Grid container>
                  <Checkbox {...label} />
                  <MDTypography
                    sx={{
                      color: "#000000",
                    }}
                  >
                    â‚¹ 1,107
                  </MDTypography>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid>
          <MDTypography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "24px",
              color: "rgba(0, 0, 0, 0.87)",
            }}
          >
            Safeguard Benefit
          </MDTypography>
          <Grid container>
            <MDTypography
              sx={{
                width: "481px",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "17px",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              Get additional benefit likes annual increase in coverage, coverage for non-payable
              items and impact on booster benefit
            </MDTypography>
            <Grid pl={23}>
              <MDBox
                align="right"
                sx={{
                  borderRadius: "3px",
                  width: "110px",
                  background: "rgba(217, 217, 217, 0.3)",
                  border: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              >
                <Grid container>
                  <Checkbox {...label} />
                  <MDTypography
                    sx={{
                      color: "#000000",
                    }}
                  >
                    â‚¹ 674
                  </MDTypography>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid>
          <MDTypography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "24px",
              color: "rgba(0, 0, 0, 0.87)",
            }}
          >
            Instant Cover
          </MDTypography>
          <Grid container>
            <MDTypography
              sx={{
                width: "493px",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "17.16px",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              Claim can be made for hospitalization related to Diabetes, Hypertension,
              Hyperlipidemia & Asthama after initial wait period of 30 days
            </MDTypography>
            <Grid pl={21.5}>
              <MDBox
                align="right"
                sx={{
                  borderRadius: "3px",
                  width: "110px",
                  background: "rgba(217, 217, 217, 0.3)",
                  border: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              >
                <Grid container>
                  <Checkbox {...label} />
                  <MDTypography
                    sx={{
                      color: "#000000",
                    }}
                  >
                    â‚¹ 2,995
                  </MDTypography>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid pl={82}>
          <MDButton variant="contained" sx={{ height: "43px" }}>
            <MDTypography sx={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.87)" }}>
              Proceed
            </MDTypography>
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
export default HealthProposal;
