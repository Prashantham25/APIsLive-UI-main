import { Grid, Card, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { DateFormatFromStringDate } from "../../../../../../Common/Validations";

function Success({ dto }) {
  return (
    <Card sx={{ backgroundColor: "#CEEBFF" }}>
      <MDBox sx={{ display: "flex", justifyContent: "center" }} pl="20%" pr="15%">
        <Grid container spacing={2} p={5}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <CheckCircleIcon color="success" fontSize="large" />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDTypography color="success" alignItem="center">
                Policy Issued Successful
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>Policy Number :</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>{dto.proposalNumber}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>Receipt Number :</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>{dto.receiptNumber}</MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>KYC Number :</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>{dto.KYC.CKYCNo}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>Policy Start Date :</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>
              {DateFormatFromStringDate(dto.PolicyStartDate, "y-m-d", "d/m/y")}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>Policy End Date :</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>
              {DateFormatFromStringDate(dto.PolicyEndDate, "y-m-d", "d/m/y")}
            </MDTypography>
          </Grid>
        </Grid>
      </MDBox>
      {false && (
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <Stack direction="row" spacing={2} p={5}>
            <MDButton>Download Policy</MDButton>
            <MDButton>Download Receipt and Tax Invoice</MDButton>
          </Stack>
        </MDBox>
      )}
    </Card>
  );
}

export default Success;
