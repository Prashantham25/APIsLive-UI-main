import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import { Grid, Card, Icon, IconButton, Stack } from "@mui/material";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
import { GeneratePDF } from "../../data/Apis";
import { generateFile } from "../../../../../../Common/RenderControl/Version3/RenderControlFunctions";

const currencyFormat = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function PaymentSuccess({ dto }) {
  const onDownloadPolicy = async () => {
    const res = await GeneratePDF("LibertyPolicyT", dto);
    generateFile({ content: res.fileUploadResp?.fileData, fileName: "Policy" });
  };

  const policyDetails = [
    { label: "Policy No", value: dto?.PolicyNo },
    {
      label: "Proposer Name",
      value: `${dto?.ProposerDetails?.FirstName} ${dto?.ProposerDetails?.LastName}`,
    },
    { label: "TP Start Date", value: `${dto?.TPStartDate} T ${dto?.TPStartTime}` },
    { label: "TP End Date", value: `${dto?.TPEndDate} T ${dto?.TPEndTime}` },
    { label: "OD Start Date", value: `${dto?.ODStartDate} T ${dto?.ODStartTime}` },
    { label: "OD End Date", value: `${dto?.ODEndDate} T ${dto?.ODEndTime}` },

    // { label: "Premium Paid", value: `${currencyFormat.format(dto?.PremiumDetail?.TotalPremium)}` },
  ];

  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", m: 1, background: "#FFFFFF" }}
      fullwidth
    >
      <Card
        position="absolute"
        sx={{ borderRadius: "0.3rem", m: 2, background: "#EEEEEE" }}
        fullwidth
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox
              sx={{
                m: "1rem",
                display: "flex",
                backgroundImage: `url(${PaySuccess})`,
                backgroundSize: "cover",
                flexDirection: "column",
                backgroundPosition: "center",
                textAlign: "center",
                alignItems: "center",
                minHeight: "20rem",
              }}
            >
              <Grid container spacing={2} p={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <IconButton
                    size="large"
                    color="white"
                    iconOnly
                    circular
                    sx={{ background: "#00CA72" }}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      color: "#00CA72",
                    }}
                  >
                    Payment Details <p>Saved Successfully</p>
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h6">{`Transaction ID : ${dto?.PaymentDetails?.TransactionNo}`}</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={10}>
                  <MDTypography variant="h6">{`Amount Paid : ₹ ${currencyFormat.format(
                    dto?.PremiumDetails?.TotalPremium
                  )}`}</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h6">{`Payment Mode:  ${dto?.PaymentDetails?.ModeOfPayment}`}</MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Grid container spacing={2} sx={{ mt: "2rem" }} p={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h3" sx={{ textAlign: "center" }}>
                  Your Policy Details
                </MDTypography>
              </Grid>
              {policyDetails.map((x) => (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack
                    spacing={2}
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <MDTypography variant="h6">{x.label}</MDTypography>
                    <MDTypography variant="h6">{x.value}</MDTypography>
                  </Stack>
                </Grid>
              ))}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <MDButton display="flex" color="success" onClick={onDownloadPolicy}>
                    Download Policy
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      {/* )} */}
    </Card>
  );
}
