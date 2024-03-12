import { useEffect, useState } from "react";
import { Grid, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import swal from "sweetalert";
import CustEngage from "assets/images/BrokerPortal/CustEngage.png";
import { useNavigate } from "react-router-dom";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";

import { UpdateQuote, GenerateQuickQuote } from "../data";

function CustomerEngage({ policyDto }) {
  const [QuoteNo, setQuoteNo] = useState("");
  const [cust, setCust] = useState({
    FirstName: "",
    LastName: "",
    MobileNo: "",
    Email: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    cust[e.target.name] = e.target.value;
    setCust({ ...cust });
  };

  const onViewPlan = async () => {
    await UpdateQuote(QuoteNo, cust);
    navigate(`/BrokerPortal/HealthQuoteSummary?QuotationNo=${QuoteNo}`);
  };

  useEffect(async () => {
    const res = await GenerateQuickQuote(policyDto);
    if (res && res.quoteDetails && res.quoteDetails.quoteNumber)
      setQuoteNo(res.quoteDetails.quoteNumber);
    else swal({ icon: "error", text: "Something Went Wrong" });
  }, []);

  return (
    <MDBox>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustEngage} width="100%" height="100%" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="body1" sx={{ textAlign: "center" }}>
                Please fill your Details
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <RadioGroup row defaultValue="Individual">
                <FormControlLabel
                  control={<Radio />}
                  label="Individual"
                  name="value"
                  value="Individual"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Corporate"
                  name="value"
                  value="Corporate"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                name="FirstName"
                value={cust.FirstName}
                label="First Name"
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                name="LastName"
                value={cust.LastName}
                label="Last Name"
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                name="MobileNo"
                value={cust.MobileNo}
                inputProps={{ maxLength: 10 }}
                label="Phone No"
                onChange={onChange}
                //   onBlur={onChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                name="Email"
                value={cust.Email}
                label="Email ID"
                onChange={onChange}
                //   onBlur={onChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              <MDBox>
                <MDTypography sx={{ fontSize: "0.75rem" }}>
                  By clicking proceed I agree to <font color="blue">* terms &#38; conditions</font>{" "}
                  and <font color="blue">Privacy policy</font>
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} textAlign="right">
              <MDButton onClick={onViewPlan}>VIEW PLANS</MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default CustomerEngage;
