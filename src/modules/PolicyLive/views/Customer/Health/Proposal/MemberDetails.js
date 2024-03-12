import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import { Share } from "@mui/icons-material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDDatePicker from "components/MDDatePicker";

function MemberDetails() {
  return (
    <MDBox m={4}>
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
            Member Details
          </MDTypography>
          <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
            Tell us the details about the members to be insured
          </MDTypography>
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
          <Accordion>
            <AccordionSummary>
              <MDTypography>Self</MDTypography>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="First Name" />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="Last Name" />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDDatePicker />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                  <MDInput label="Height(Feets)" />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                  <MDInput label="Height(Inches)" />
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                  <MDInput label="Weight" />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
          <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem" }}>
            <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
              Summary
            </MDTypography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                  Quote No
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                >
                  {/* {quoteProposalOutput.BaseQuotationNo} */}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                  Insurer
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDAvatar size="xl" variant="square" sx={{ mx: "9rem" }} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                  Plan Name
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                >
                  {/* {partnerDetails.partnerName} */}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                  {" "}
                  Cover Amount{" "}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                >
                  {/* {formatter.format(quoteProposalOutput.SumInsured)} */}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                  {" "}
                  Policy Period{" "}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                >
                  {/* {quoteProposalOutput.PolicyTenure} Year */}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                  GST@18%
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                >
                  {/* {formatter.format(premiumResult.PremiumDetail.TaxAmount)} */}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                  Total Premium
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} marginBottom={4} mt={1}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  mt={0}
                  sx={{ fontSize: "2rem", color: "#0071D9" }}
                >
                  {/* {formatter.format(premiumResult.PremiumDetail.TotalPremium)} */}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDButton
                  size="medium"
                  startIcon={<Share />}
                  sx={{
                    color: "#1976D2",
                    textSize: "0.87rem",
                    borderRadius: "0.25rem",
                    borderColor: "#1976D2",
                    border: 1,
                    background: "transparent",
                  }}
                >
                  Share Quote
                </MDButton>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                justifyContent="end"
                display="flex"
              >
                <MDButton sx={{ width: "auto", fontSize: "0.7rem" }}>Proceed to Proposal</MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default MemberDetails;
