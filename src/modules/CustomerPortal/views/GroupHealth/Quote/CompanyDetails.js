import { Grid, Autocomplete } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

function CompanyDetails({ PolicyDto, handleProposer, setPolicyDto }) {
  const city = [
    "Ahmedabad",
    "Bangalore",
    "Chennai",
    "Coimbatore",
    "Delhi",
    "Hyderabad",
    "Kolkata",
    "Mumbai",
    " Other Cities",
    "Pune",
  ];
  const PolicyDtoL = PolicyDto;
  const industry = ["Manufacturing", "Non Manufacturing"];
  const handleAutoComplete = (e, value) => {
    PolicyDtoL[e.target.id.split("-")[0]] = value;
    setPolicyDto((prev) => ({ ...prev, ...PolicyDtoL }));
  };
  return (
    <MDBox>
      <MDTypography variant="body1" sx={{ my: "2rem" }} color="primary">
        Tell us your Company details
      </MDTypography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            label="Organization Name"
            value={PolicyDto.ProposerDetails.OrganizationName}
            name="OrganizationName"
            onChange={handleProposer}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Autocomplete
            id="Location"
            onChange={handleAutoComplete}
            options={city}
            renderInput={(params) => <MDInput {...params} label="Enter City Name" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Autocomplete
            id="Industry"
            onChange={handleAutoComplete}
            options={industry}
            renderInput={(params) => <MDInput {...params} label="Enter Industry Type" />}
          />
        </Grid>
      </Grid>
      <MDBox flexDirection="row" display="flex" sx={{ mt: "3rem", alignItems: "center" }}>
        <MDTypography variant="caption">
          By clicking, I agree to *{" "}
          <MDTypography color="info" variant="caption">
            terms & conditions and privacy policy.
          </MDTypography>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}
export default CompanyDetails;
