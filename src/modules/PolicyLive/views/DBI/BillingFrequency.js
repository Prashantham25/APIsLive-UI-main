import { Grid, RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";
import MDBox from "../../../../components/MDBox";
import { CalculatePremium } from "./data";

function BillingFrequency({ handleNext, handleBack, obj, setObj }) {
  const onChange = async (e) => {
    const obj1 = obj;

    obj1.WCPRequest.billingFrequency = e.target.value;
    obj1.ProposerReq.billingFrequency = e.target.value;
    const res1 = await CalculatePremium(obj1.WCPRequest);
    obj1.CP = { ...res1.data };
    obj1.ProposerReq.PaymentInfo[0].Amount = res1.data.finalAmount;

    setObj({ ...obj1 });
  };
  const onBack = () => {
    handleBack();
  };
  const onDone = () => {
    handleNext();
  };
  return (
    <MDBox p={3}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <MDBox sx={{ p: 2, border: "1px solid" }}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography>Fire & Theft</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography>{obj.CP.fireTheft}</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography>Accidental</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography>{obj.CP.adPremium}</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography>GST</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography>{obj.CP.gst}</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography>Total Premium</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography>{obj.CP.total}</MDTypography>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>Billing Frequency</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <RadioGroup value={obj.ProposerReq.billingFrequency} onChange={onChange}>
                <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                <FormControlLabel value="Yearly" control={<Radio />} label="Yearly" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <FormControlLabel control={<Checkbox />} label="Auto debit my saved card/bank" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDButton onClick={onBack}>Back</MDButton>
        <MDButton onClick={onDone}>Done</MDButton>
      </MDBox>
    </MDBox>
  );
}
export default BillingFrequency;
