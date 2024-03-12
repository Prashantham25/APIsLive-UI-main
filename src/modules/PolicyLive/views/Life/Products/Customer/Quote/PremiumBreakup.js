import { Grid, Stack, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import swal from "sweetalert";

import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";
import { useDataController } from "../../../../../../BrokerPortal/context";

function PremiumBreakup({ handleNext, dto, handleBack }) {
  const [controller] = useDataController();
  const { custTheme } = controller;
  const { primary } = custTheme.palette;
  const matchesMd = useMediaQuery("(min-width:992px)");
  const data = dto.productDetails[0];
  const onProceed = () => {
    if (
      data?.PremiumDetails?.["Total Premium"] === 0 ||
      data?.PremiumDetails?.["Total Premium"] === "0"
    ) {
      swal({ icon: "warning", text: "Premium is Zero, you cannot proceed further" });
    } else handleNext();
  };

  const summaryData = [
    { label: "Quote No", value: data?.QuotationNo },

    { label: "Base Premium", value: data?.PremiumDetails?.["Base Plan Premium"] },
    { label: "No of FP Installments", value: data?.PremiumDetails?.["No of FP Installments"] },
    { label: "AB / ADDB Premium", value: data?.["AB / ADDB Premium"] },
    {
      label: "Critical illness Premium",
      value: data?.PremiumDetails?.["Critical illness Premium"],
    },
    { label: "Term Rider Premium", value: data?.PremiumDetails?.["Term Rider Premium"] },
    { label: "GST", value: data?.PremiumDetails?.GST },
    { label: "Total Premium", value: data?.PremiumDetails?.["Total Premium"], variant: "h5" },
  ];

  const quoteInformation = [
    {
      label: "Personal Information",
      value: "",
      spacing: 12,
      sx: { fontWeight: 700, fontSize: "1rem", color: "#002984" },
    },
    { label: "Date of Birth", value: data.InsurableItem?.[0]?.RiskItems?.[0]?.DOB },
    { label: "Name", value: data.InsurableItem?.[0]?.RiskItems?.[0]?.Name },
    { label: "Resident Status", value: data.InsurableItem[0].RiskItems[0].ResidentStatus },
    { label: "Country of Residency", value: data.InsurableItem[0].RiskItems[0].country },
    { label: "Gender", value: data.InsurableItem?.[0]?.RiskItems?.[0]?.Gender },
    {
      label: "Product Information",
      value: "",
      spacing: 12,
      sx: { fontWeight: 700, fontSize: "1rem", color: "#002984" },
    },
    { label: "Sum Assured", value: data?.SumAssured },
    { label: "Payment Mode", value: data?.PreferredMode },
    { label: "Policy Term", value: data?.PolicyTerm },
    { label: "Premium Paying Term ", value: data?.PremiumPayingTerm },
    { label: "Date of Commencement", value: data?.DateOfCommencement },
    {
      label: "Rider Benefits",
      value: "",
      spacing: 12,
      sx: { fontWeight: 700, fontSize: "1rem", color: "#002984" },
    },
    { label: "Rider Option", value: data.InsurableItem[0].RiskItems[0].AccidentBenefit },
    // { label: "Rider sum Proposed", value: data?.QuotationNo },
    // { label: "Critical illness Sum Proposed", value: data?.QuotationNo },
    { label: "Policy Personnel", value: data.InsurableItem[0].RiskItems[0].PolicePersonnel },
    // { label: "Term Rider Sum Proposed", value: data?.QuotationNo },
  ];

  // const policyDetails1 = [
  //   { label: "Plan Number", value: "865" },
  //   { label: "Policy Term", value: "5 Years" },
  //   { label: "Paying Term", value: "1 Year" },
  //   { label: "Payment Mode", value: "Single" },
  //   { label: "Residential Status", value: "Indian" },
  //   { label: "Date of Birth", value: "09-06-1988" },
  //   { label: "Guaranteed Benefit income", value: "₹ 51,000" },
  //   { label: "Guaranteed Terminal income", value: "₹ 51,000" },
  //   { label: "GIB Rate", value: "10%" },
  //   { label: "GTB Rate", value: "10%" },
  // ];
  // const policyDetails2 = [
  //   { label: "Sum Assured on Maturity", value: "₹ 776" },
  //   { label: "AB / ADDB Sum Assured", value: "₹ 776" },
  //   { label: "Critical illness", value: "₹ 776" },
  //   { label: "Term Rider", value: "₹ 776" },
  //   { label: "Sum Assured on death", value: "₹ 25,00,000" },
  //   { label: "Age", value: "35 Years" },
  //   { label: "Gender", value: "Male" },
  //   { label: "Date Commencement", value: "04-08-2023" },
  //   { label: "Benefit option", value: "Option C" },
  //   { label: "Pay-out Mode", value: "Yes" },
  // ];
  const summaryDetails = [
    { label: "Plan", value: data?.Plan },
    { label: "Policy Term", value: `${data?.PolicyTerm} Years` },
    { label: "Paying Term", value: `${data?.PremiumPayingTerm} Years` },
    { label: "Payment Mode", value: data.PreferredMode },
    // { label: "Residential Status", value: "Indian" },
    { label: "Date of Birth", value: data?.InsurableItem?.[0]?.RiskItem?.[0]?.DOB },
    // { label: "Guaranteed Benefit income", value: "₹ 51,000" },
    // { label: "Guaranteed Terminal income", value: "₹ 51,000" },
    // { label: "GIB Rate", value: "10%" },
    // { label: "GTB Rate", value: "10%" },
    // { label: "Sum Assured on Maturity", value: "₹ 776" },
    // { label: "AB / ADDB Sum Assured", value: "₹ 776" },
    // { label: "Critical illness", value: "₹ 776" },
    // { label: "Term Rider", value: "₹ 776" },
    {
      label: "Sum Assured on death",
      value: data?.SumAssured,
    },
    // { label: "Age", value: premiumDetails?.Age },
    { label: "Gender", value: data?.InsurableItem?.[0]?.RiskItem?.[0]?.Gender },
    { label: "Date Commencement", value: data?.DateOfCommencement },
    // { label: "Benefit option", value: premiumDetails?.["Benefit option"] },
    // { label: "Pay-out Mode", value: premiumDetails?.["Pay-out Mode"] },
  ];
  const ff = new Intl.NumberFormat("en-IN");
  return (
    <MDBox sx={{ width: "100%", pt: "1rem", pl: "1.5rem" }}>
      <Grid container spacing={2}>
        {false && (
          <Grid item xs={12} sx={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              sx={{
                width: "100%",
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              {dto.Product}
            </MDTypography>
          </Grid>
        )}
        <Grid item xs={12} sx={12} md={7} lg={7} xl={7} xxl={7}>
          <MDBox
            fullwidth
            sx={{
              background: "rgba(245, 245, 245, 1)",
              px: "2rem",
              pb: "2rem",
              pt: "1rem",
              borderRadius: "0.25rem",
            }}
          >
            <Grid container spacing={1} sx={{ pt: "1rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Grid container rowSpacing={2}>
                  {quoteInformation.map((x) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={x.spacing || 4}
                      lg={x.spacing || 4}
                      xl={x.spacing || 4}
                      xxl={x.spacing || 4}
                    >
                      <Stack spacing={0.2} mt={1}>
                        <MDTypography sx={{ fontSize: "0.8rem", ...x.sx }}>{x.label}</MDTypography>
                        <MDTypography variant="h6" sx={x.sx}>
                          {x.value}
                        </MDTypography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {false && matchesMd && (
                <Divider
                  orientation="vertical"
                  sx={{ height: "auto", border: "0.5px solid rgba(0, 0, 0, 1)" }}
                />
              )}
              {false && (
                <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                  <Grid container spacing={1} sx={{ pt: "1rem" }}>
                    {summaryDetails.map((elem, index) => {
                      if (index >= summaryDetails.length / 2)
                        return (
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                                <MDTypography
                                  sx={{ fontSize: "0.875rem", color: "rgba(95, 95, 95, 1)" }}
                                >
                                  {elem.label}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
                                <MDTypography
                                  textAlign="right"
                                  sx={{ fontSize: "0.875rem", color: "#000000" }}
                                >
                                  {elem.value}
                                </MDTypography>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      return null;
                    })}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <MDBox
            fullwidth
            sx={{
              background: "#CEEBFF",
              px: "2rem",
              pb: "2rem",
              pt: "1rem",
              borderRadius: "0.25rem",
            }}
          >
            <MDTypography sx={{ fontSize: "1.25rem", fontWeight: 500, color: "#000000" }}>
              Quotation Premium Summary
            </MDTypography>
            <Grid container spacing={1} rowSpacing={3} sx={{ pt: "1rem" }}>
              {summaryData.map((x) => (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack direction="row" justifyContent="space-between">
                    <MDTypography variant={x.variant} sx={{ fontSize: "1rem", color: "#000000" }}>
                      {x.label}{" "}
                    </MDTypography>
                    {x.currency === true ? (
                      <MDTypography variant={x.variant} sx={{ fontSize: "1rem", color: "#000000" }}>
                        {`₹ ${ff.format(x.value)}`}
                      </MDTypography>
                    ) : (
                      <MDTypography variant={x.variant} sx={{ fontSize: "1rem", color: "#000000" }}>
                        {x.value}
                      </MDTypography>
                    )}
                  </Stack>
                </Grid>
              ))}

              {false && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography
                    sx={{
                      fontSize: "1rem",
                      color: primary.main,
                      fontWeight: 400,
                      textDecoration: "underline",
                    }}
                  >
                    Download Benefit Illustration
                  </MDTypography>
                </Grid>
              )}
              {false && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
                    <MDButton sx={{ fontSize: "0.7rem" }} onClick={handleBack}>
                      Back
                    </MDButton>
                    <MDButton sx={{ fontSize: "0.7rem" }} onClick={onProceed}>
                      Proceed
                    </MDButton>
                  </MDBox>
                </Grid>
              )}
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default PremiumBreakup;
