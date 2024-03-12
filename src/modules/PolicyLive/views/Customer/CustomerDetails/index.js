import { useState } from "react";
import { Grid, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import CustDetail from "assets/images/BrokerPortal/CustDetail.png";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import TermsCondition from "../data/components/TermsCondition";
import { IsMobileNumber, IsEmail } from "../../../../../Common/Validations";
// import { generateQuickQuote } from "../data";

function CustomerDetails({ handleNext, policyDto, setPolicyDto, setLoader }) {
  const lPolicyDto = policyDto;
  const [ErrFlag, setErrFlag] = useState(false);
  const [Flags, setFlags] = useState({
    ErrMobile: false,
    ErrMobileText: "",
    ErrEmail: false,
    ErrEmailText: "",
  });
  const errText = "Please fill this field";
  const [customer, setCustomer] = useState({
    type: "5",
    FirstName: "",
    LastName: "",
    MobileNo: "",
    Email: "",
  });
  const onChange = (e) => {
    customer[e.target.name] = e.target.value;
    setCustomer({ ...customer });
  };

  const onBlur1 = (e) => {
    console.log(e, 121212);
    if (e.target.name === "MobileNo") {
      if (IsMobileNumber(e.target.value) === true) {
        Flags.ErrMobile = false;
        Flags.ErrMobileText = "";
      } else {
        Flags.ErrMobile = true;
        Flags.ErrMobileText = IsMobileNumber(e.target.value);
      }
    }
    if (e.target.name === "Email") {
      if (IsEmail(e.target.value) === true) {
        Flags.ErrEmail = false;
        Flags.ErrEmailText = "";
      } else {
        Flags.ErrEmail = true;
        Flags.ErrEmailText = IsEmail(e.target.value);
      }
    }
    setFlags({ ...Flags });
  };

  const onRadio = (e) => {
    customer.type = e.target.value;
    setCustomer({ ...customer });
  };
  console.log(customer);
  const onViewPlan = async () => {
    if (
      customer.FirstName === "" ||
      customer.LastName === "" ||
      customer.Email === "" ||
      customer.MobileNo === "" ||
      Flags.ErrEmail === true ||
      Flags.ErrMobile === true
    ) {
      setErrFlag(true);
    } else {
      setErrFlag(false);
      setLoader(true);
      lPolicyDto.ProposerDetails.FirstName = customer.FirstName;
      lPolicyDto.ProposerDetails.LastName = customer.LastName;
      lPolicyDto.ProposerDetails.EmailId = customer.Email;
      lPolicyDto.ProposerDetails.ContactNo = customer.MobileNo;
      lPolicyDto.CustomerName = `${customer.FirstName} ${customer.LastName}`;

      // const res = await generateQuickQuote(lPolicyDto);
      setLoader(false);

      // lPolicyDto.QuotationNumber = res.quoteDetails.quoteNumber;
      setPolicyDto({ ...lPolicyDto });
      handleNext();
    }
  };

  return (
    <MDBox>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <MDBox component="img" src={CustDetail} width="90%" height="80%" />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <Grid container spacing={3} p={4}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5" sx={{ textAlign: "center" }}>
                Please fill your Details
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <RadioGroup row defaultValue="Individual" name="type" onChange={onRadio}>
                  <FormControlLabel
                    control={<Radio checked={customer.type === "5"} />}
                    label="Individual"
                    name="value"
                    value="5"
                  />
                  <FormControlLabel
                    control={<Radio checked={customer.type === "8"} />}
                    label="Corporate"
                    name="value"
                    value="8"
                  />
                </RadioGroup>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput
                name="FirstName"
                value={customer.FirstName}
                label={customer.type === "5" ? "First Name" : "Corporate Name"}
                onChange={onChange}
                required
                variant="standard"
                error={ErrFlag && customer.FirstName === ""}
                helperText={ErrFlag && customer.FirstName === "" && errText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput
                name="LastName"
                value={customer.LastName}
                label={customer.type === "5" ? "Last Name" : "Company SPOC Name"}
                onChange={onChange}
                required
                variant="standard"
                error={ErrFlag && customer.LastName === ""}
                helperText={ErrFlag && customer.LastName === "" && errText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput
                name="MobileNo"
                value={customer.MobileNo}
                inputProps={{ maxLength: 10 }}
                label={customer.type === "5" ? "Phone No" : "Company SPOC Phone No"}
                onChange={onChange}
                onBlur={(e) => onBlur1(e)}
                required
                variant="standard"
                error={
                  (ErrFlag && customer.MobileNo === "") ||
                  (Flags.ErrMobile && customer.MobileNo !== "")
                }
                helperText={
                  ErrFlag && customer.MobileNo === ""
                    ? errText
                    : customer.MobileNo !== "" && Flags.ErrMobileText
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput
                name="Email"
                value={customer.Email}
                label={customer.type === "5" ? "Email Id" : "Company SPOC Email Id"}
                onChange={onChange}
                onBlur={(e) => onBlur1(e)}
                required
                variant="standard"
                error={
                  (ErrFlag && customer.Email === "") || (Flags.ErrEmail && customer.Email !== "")
                }
                helperText={
                  ErrFlag && customer.Email === ""
                    ? errText
                    : customer.Email !== "" && Flags.ErrEmailText
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <TermsCondition />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} textAlign="right">
              <MDButton onClick={onViewPlan}>Calculate Premium</MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default CustomerDetails;
