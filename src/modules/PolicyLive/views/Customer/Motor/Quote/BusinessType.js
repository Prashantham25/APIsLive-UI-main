import { Grid, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import CompareInputImg from "assets/images/BrokerPortal/CompareInput.png";

import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";

export default function BusinessType({ handleNext, policyDto, setPolicyDto }) {
  const lPolicyDto = policyDto;
  const onGetQuote = () => {
    handleNext();
  };

  const onBusiness = (e) => {
    lPolicyDto.BusinessType = e.target.value;
    setPolicyDto({ ...lPolicyDto });
  };

  return (
    <MDBox>
      <Grid container justifyContent="center" alignItems="center" display="flex" spacing={4}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CompareInputImg} sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox sx={{ ml: "3rem" }}>
            <MDTypography variant="h6" sx={{ fontSize: "3rem", color: "#000000" }}>
              Compare quotes & Buy <br />
              Insurance all in one place.
            </MDTypography>
            <MDTypography sx={{ fontSize: "1.25rem", color: "#000000" }}>
              We compare with multiple insurance companies to <br />
              find the policy that&apos;s right for you.
            </MDTypography>

            <MDTypography sx={{ mt: "1.25rem", fontSize: "1.25rem", color: "#000000" }}>
              Please Select option to proceed further!
            </MDTypography>

            <RadioGroup row onChange={onBusiness}>
              <FormControlLabel
                checked={policyDto.BusinessType === "New Business"}
                value="New Business"
                control={<Radio />}
                label="New Business"
              />
              <FormControlLabel
                checked={policyDto.BusinessType === "RollOver"}
                value="RollOver"
                control={<Radio />}
                label="RollOver"
              />
            </RadioGroup>
            <MDButton onClick={onGetQuote} sx={{ marginLeft: "0.063rem", mt: "30px" }}>
              Get Quote
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
