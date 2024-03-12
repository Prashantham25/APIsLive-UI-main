// import { useState } from "react";
import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";

import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDDatePicker from "components/MDDatePicker";
import TermsCondition from "../../data/components/TermsCondition";
import { formate } from "../../data";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "5px!important",
  },
};

function ProposerDetails({ handelNext, dto, setDto, masters }) {
  const lDto = dto;
  const onProceed = () => {
    handelNext();
  };
  console.log(dto, "121212");
  const onVehicleDetails = (e) => {
    lDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    setDto({ ...lDto });
  };

  const onProposerDetails = (e, v, n) => {
    if (n === "drop") {
      lDto.ProposerDetails[e] = v.mValue;
    } else if (n === "date") {
      lDto.ProposerDetails[e] = v;
    } else {
      lDto.ProposerDetails[e.target.name] = e.target.value;
    }
    setDto({ ...lDto });
  };

  // const onKYCDetails = (e) => {
  //   lDto.KYC[e.target.name] = e.target.value;
  //   setDto({ ...lDto });
  // };

  const onAddress = (e, n) => {
    lDto.ProposerDetails[n][e.target.name] = e.target.value;
    setDto({ ...lDto });
  };

  const onSameAddress = (e) => {
    lDto.ProposerDetails.PermanentAddressSameAsCommunication = e.target.value;
    if (e.target.value === "Yes")
      lDto.ProposerDetails.CommunicationAddress = lDto.ProposerDetails.PermanentAddress;
    else {
      lDto.ProposerDetails.CommunicationAddress = {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrictId: "",
        CityDistrictValue: "",
        CountryId: "",
        StateId: "",
        StateValue: "",
        Pincode: "",
      };
    }
    setDto({ ...lDto });
  };

  const onNominee = (e, v, n) => {
    if (n === "drop") {
      lDto.NomineeDetails[0][e] = v.mValue;
    } else if (n === "date") {
      lDto.NomineeDetails[0][e] = v;
    } else {
      lDto.NomineeDetails[0][e.target.name] = e.target.value;
    }
    setDto({ ...lDto });
  };

  return (
    <MDBox>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <Accordion>
            <AccordionSummary>
              <MDTypography color="primary">Policy Details</MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="TP Start Date"
                    value={`${dto?.TPStartDate} T ${dto?.TPStartTime}`}
                    disabled
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="TP End Date"
                    value={`${dto?.TPEndDate} T ${dto?.TPEndTime}`}
                    disabled
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="OD Start Date"
                    value={`${dto?.ODStartDate} T ${dto?.ODStartTime}`}
                    disabled
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="OD End Date"
                    value={`${dto?.ODEndDate} T ${dto?.ODEndTime}`}
                    disabled
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <MDTypography color="primary">Vehicle Details</MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Brand"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.MakeValue}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Model"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.ModelValue}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Variant"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0].VariantValue}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Fuel Type"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.FuelType}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Cubic Capacity"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.CC}
                  />
                </Grid>
                {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput variant="standard" label="Vehicle Class"   value={dto.InsurableItem[0].RiskItems[0].MakeValue}/>
                </Grid> */}
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Seating Capacity"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.SeatingCapacity}
                  />
                </Grid>
                {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput variant="standard" label="State Code"  value={dto.InsurableItem[0].RiskItems[0].MakeValue}/>
                </Grid>  */}
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="RTO Code"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.RTOValue}
                    // value={masters.RtoDetails.length > 0 ? masters.RtoDetails[0].RTO_Code : ""}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    name="ChassisNumber"
                    label="Chassis No"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.ChassisNumber}
                    onChange={onVehicleDetails}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Engine No"
                    name="EngineNumber"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.EngineNumber}
                    onChange={onVehicleDetails}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Date of Registration"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.RegistrationDate}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Registration No"
                    value={dto?.InsurableItem?.[0]?.RiskItems?.[0]?.RegistrationNumber}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <MDTypography color="primary">Proposer Details</MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={masters.Salutation}
                    sx={autoStyle}
                    value={{ mValue: dto.ProposerDetails.Salutation }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, a) => onProposerDetails("Salutation", a, "drop")}
                    renderInput={(params) => (
                      <MDInput variant="standard" {...params} label="Title" />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="First Name"
                    name="FirstName"
                    value={dto.ProposerDetails.FirstName}
                    onChange={onProposerDetails}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Last Name"
                    name="LastName"
                    value={dto.ProposerDetails.LastName}
                    onChange={onProposerDetails}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={masters.Gender}
                    sx={autoStyle}
                    value={{ mValue: dto.ProposerDetails.Gender }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, a) => onProposerDetails("Gender", a, "drop")}
                    renderInput={(params) => (
                      <MDInput variant="standard" {...params} label="Gender" />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDDatePicker
                    fullWidth
                    onChange={(e, d) => onProposerDetails("DOB", d, "date")}
                    value={dto.ProposerDetails.DOB}
                    input={{
                      label: "DOB",
                      value: dto.ProposerDetails.DOB,
                      variant: "standard",
                    }}
                    options={{
                      dateFormat: "d-m-Y",
                      altFormat: "d/m/Y",
                      altInput: true,
                    }}
                  />
                </Grid>
                {/* <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={masters.MaritalStatus}
                    sx={autoStyle}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, a) => onProposerDetails("MaritalStatus", a, "drop")}
                    renderInput={(params) => (
                      <MDInput variant="standard" {...params} label="Marital Status" />
                    )}
                  />
                </Grid> */}
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Phone Number"
                    name="ContactNo"
                    value={dto.ProposerDetails.ContactNo}
                    onChange={onProposerDetails}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Email ID"
                    name="EmailId"
                    value={dto.ProposerDetails.EmailId}
                    onChange={onProposerDetails}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={masters.Occupation}
                    sx={autoStyle}
                    value={{ mValue: dto.ProposerDetails.OccupationCode }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, a) => onProposerDetails("OccupationCode", a, "drop")}
                    renderInput={(params) => (
                      <MDInput variant="standard" {...params} label="Occupation Status" />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="PAN Card No"
                    name="PANNo"
                    value={dto.ProposerDetails.PANNo}
                    onChange={onProposerDetails}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <MDTypography color="primary">Communication Details</MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Accordion>
                <AccordionSummary>
                  <MDTypography color="primary">Permanent Address</MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="House No"
                        name="AddressLine1"
                        value={dto.ProposerDetails.PermanentAddress.AddressLine1}
                        onChange={(e) => onAddress(e, "PermanentAddress")}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="Street/Region"
                        name="AddressLine2"
                        value={dto.ProposerDetails.PermanentAddress.AddressLine2}
                        onChange={(e) => onAddress(e, "PermanentAddress")}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="Pin Code"
                        name="Pincode"
                        value={dto.ProposerDetails.PermanentAddress.Pincode}
                        onChange={(e) => onAddress(e, "PermanentAddress")}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="District"
                        name="CityDistrict"
                        value={dto.ProposerDetails.PermanentAddress.CityDistrict}
                        onChange={(e) => onAddress(e, "PermanentAddress")}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="State"
                        name="State"
                        value={dto.ProposerDetails.PermanentAddress.State}
                        onChange={(e) => onAddress(e, "PermanentAddress")}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Stack direction="row" spacing={3} p={2}>
                <MDTypography color="primary">
                  Is Communication address same as Permanent address
                </MDTypography>
                <RadioGroup
                  row
                  value={dto.ProposerDetails.PermanentAddressSameAsCommunication}
                  onChange={onSameAddress}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Stack>
              <Accordion>
                <AccordionSummary>
                  <MDTypography color="primary">Communication Address</MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="House No"
                        name="AddressLine1"
                        value={dto.ProposerDetails.CommunicationAddress.AddressLine1}
                        onChange={(e) => onAddress(e, "CommunicationAddress")}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="Street/Region"
                        name="AddressLine2"
                        value={dto.ProposerDetails.CommunicationAddress.AddressLine2}
                        onChange={(e) => onAddress(e, "CommunicationAddress")}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="Pin Code"
                        name="Pincode"
                        value={dto.ProposerDetails.CommunicationAddress.Pincode}
                        onChange={(e) => onAddress(e, "CommunicationAddress")}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="District"
                        name="CityDistrict"
                        value={dto.ProposerDetails.CommunicationAddress.CityDistrict}
                        onChange={(e) => onAddress(e, "CommunicationAddress")}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        variant="standard"
                        label="State"
                        name="StateValue"
                        value={dto.ProposerDetails.CommunicationAddress.StateValue}
                        onChange={(e) => onAddress(e, "CommunicationAddress")}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>
              <MDTypography color="primary">Nominee Details</MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={masters.Salutation}
                    sx={autoStyle}
                    value={{ mValue: dto.NomineeDetails[0].Title }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, a) => onNominee("Title", a, "drop")}
                    renderInput={(params) => (
                      <MDInput variant="standard" {...params} label="Title" />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Nominee First Name"
                    name="NomineeFirstName"
                    value={dto.NomineeDetails[0].NomineeFirstName}
                    onChange={onNominee}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    variant="standard"
                    label="Nominee Last Name"
                    name="NomineeLastName"
                    value={dto.NomineeDetails[0].NomineeLastName}
                    onChange={onNominee}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={masters.NomineeRelation}
                    sx={autoStyle}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, a) => onNominee("NomineeRelationWithProposer", a, "drop")}
                    renderInput={(params) => (
                      <MDInput variant="standard" {...params} label="Relationship" />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDDatePicker
                    fullWidth
                    onChange={(e, d) => onNominee("NomineeDOB", d, "date")}
                    value={dto.NomineeDetails[0].NomineeDOB}
                    input={{
                      label: "DOB",
                      value: dto.NomineeDetails[0].NomineeDOB,
                      variant: "standard",
                    }}
                    options={{
                      dateFormat: "d-m-Y",
                      altFormat: "d/m/Y",
                      altInput: true,
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Paper elevation={24} sx={{ borderRadius: 0, background: "#eeeeee" }}>
            <Grid container spacing={3} p={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h5" sx={{ color: "#CA0000" }} textAlign="center">
                  Premium Breakup
                </MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6">Quote No</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" textAlign="right">
                  {dto.BaseQuotationNo}
                </MDTypography>
              </Grid> */}
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6">IDV</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" textAlign="right">
                  ₹ {formate.format(dto.InsurableItem[0].RiskItems[0].IDVofVehicle)}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6">Base OD Premium</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" textAlign="right">
                  ₹ {formate.format(dto.PremiumDetails?.BasicOD)}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6">Base TP Premium</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" textAlign="right">
                  ₹ {formate.format(dto.PremiumDetails?.BasicTP)}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6">Total Premium (inc.GST)</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" textAlign="right">
                  ₹ {formate.format(dto.PremiumDetails?.TotalPremium)}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <TermsCondition />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                  <MDButton variant="outlined" onClick={onProceed}>
                    Proceed
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default ProposerDetails;
