import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
// import MDButton from "../../../../../components/MDButton";

function OtherDetails({ PolicyDto, setPolicyDto, flag }) {
  const [state, setState] = useState(false);
  const LPolicyDto = PolicyDto;
  const handleState = (e) => {
    console.log(e.target.value);
    if (e.target.value === "Yes") {
      setState(true);
      LPolicyDto.PrevPolicyDetails.PrevInsurerDetailsAvailable = e.target.value;
    } else if (e.target.value === "No") {
      setState(false);
      LPolicyDto.PrevPolicyDetails.PrevInsurerDetailsAvailable = e.target.value;
    }
    console.log(state, "state");
  };
  const handleSetDetails = (e) => {
    if (
      e.target.name === "PreviousPolicyNumber" ||
      e.target.name === "PreviousClaimNumber" ||
      e.target.name === "NatureOfLoss"
    ) {
      const PanReg = /^([A-Za-z]|[0-9])+$/;
      if (PanReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.PrevPolicyDetails[e.target.name] = e.target.value;

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (
      e.target.name === "PreviousPolicyPremium" ||
      e.target.name === "OustandingAmount" ||
      e.target.name === "ClaimPaidAmount"
    ) {
      const PanReg = /^([[0-9])+$/;

      if (PanReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.PrevPolicyDetails[e.target.name] = e.target.value;

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else {
      LPolicyDto.PrevPolicyDetails[e.target.name] = e.target.value;

      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      console.log(LPolicyDto, "LPolicyDto");
    }
  };
  const handleOtherDetails = (e) => {
    if (
      e.target.name === "BankBranchID" ||
      e.target.name === "ApplicationNo" ||
      e.target.name === "SPCode" ||
      e.target.name === "SPName" ||
      e.target.name === "LGCode" ||
      e.target.name === "LOSCode" ||
      e.target.name === "SecurityCode" ||
      e.target.name === "BankSmCode" ||
      e.target.name === "TLCode" ||
      e.target.name === "TSECode" ||
      e.target.name === "LoanAccountNumber" ||
      e.target.name === "BankLead"
    ) {
      const PanReg = /^([A-Za-z]|[0-9])+$/;
      if (PanReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherDetails[e.target.name] = e.target.value;

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "LoanAmount") {
      const PanReg = /^([[0-9])+$/;
      if (PanReg.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherDetails[e.target.name] = e.target.value;

        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else {
      LPolicyDto.OtherDetails[e.target.name] = e.target.value;

      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
    console.log(LPolicyDto, "LPolicyDto");
  };
  return (
    <div>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" color="primary">
            Previous Policy Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDTypography variant="h6" required>
                Is previous insurer details available? &nbsp; *
              </MDTypography>
              <RadioGroup
                row
                // value={LPolicyDto.PrevPolicyDetails.PrevInsurerDetailsAvailable}
                // value={x.IsInsuredSameAsProposer}
                // onChange={(e) => {
                //   handleSetInsurable(e, passId, "IsInsuredSameAsProposer");
                // }}
                // disabled={x.IsInsuredDisableFlag}
              >
                <FormControlLabel
                  value="Yes"
                  // disabled={x.IsInsuredDisableFlag}
                  control={<Radio />}
                  label="Yes"
                  onChange={handleState}
                />
                <FormControlLabel
                  value="No"
                  // disabled={x.IsInsuredDisableFlag}
                  control={<Radio />}
                  label="No"
                  onChange={handleState}
                />
              </RadioGroup>
            </Stack>
            {flag && LPolicyDto.PrevPolicyDetails.PrevInsurerDetailsAvailable === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          {state === true ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Previous Policy Number"
                  name="PreviousPolicyNumber"
                  value={PolicyDto.PrevPolicyDetails.PreviousPolicyNumber}
                  onChange={handleSetDetails}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Previous Policy Premium"
                  name="PreviousPolicyPremium"
                  value={PolicyDto.PrevPolicyDetails.PreviousPolicyPremium}
                  onChange={handleSetDetails}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDDatePicker
                  fullWidth
                  input={{ label: "Policy Effective Date From" }}
                  //  value={PolicyDto.MasterPolicyStartDate}
                  // onChange={(e) => handleDateChange(e, "MasterPolicyStartDate")}
                  options={{ altFormat: "d-m-Y", altInput: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDDatePicker
                  fullWidth
                  input={{ label: "Policy Effective TO Date " }}
                  //  value={PolicyDto.MasterPolicyStartDate}
                  // onChange={(e) => handleDateChange(e, "MasterPolicyStartDate")}
                  options={{ altFormat: "d-m-Y", altInput: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Previous Claim NO"
                  name="PreviousClaimNumber"
                  value={PolicyDto.PrevPolicyDetails.PreviousClaimNumber}
                  onChange={handleSetDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Nature Of Loss"
                  name="NatureOfLoss"
                  value={PolicyDto.PrevPolicyDetails.NatureOfLoss}
                  onChange={handleSetDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDDatePicker
                  fullWidth
                  input={{ label: "Date Of Loss " }}
                  //  value={PolicyDto.MasterPolicyStartDate}
                  // onChange={(e) => handleDateChange(e, "MasterPolicyStartDate")}
                  options={{ altFormat: "d-m-Y", altInput: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Outstanding Amount"
                  name="OustandingAmount"
                  value={PolicyDto.PrevPolicyDetails.OustandingAmount}
                  onChange={handleSetDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Claim Paid Amount"
                  name="ClaimPaidAmount"
                  value={PolicyDto.PrevPolicyDetails.ClaimPaidAmount}
                  onChange={handleSetDetails}
                />
              </Grid>
            </Grid>
          ) : null}
        </AccordionDetails>
      </Accordion>

      {/* <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" color="primary">
            Financier Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Financier Name" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Branch Name" />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                name="Address"
                // value={nomObj.AppointeeAddress2}
                label="Address"
                //  onChange={setNominee}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                name="Pincode"
                //  value={nomObj.ApointeePincode}
                label="Pincode"
                //  onChange={setNominee}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                name="Area"
                // value={nomObj.AppointeeCity}
                label="Area"
                // onChange={setNominee}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                name="District"
                // onChange={setNominee}
                // value={nomObj.AppointeeState}
                label="District"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                name="State"
                // onChange={setNominee}
                // value={nomObj.AppointeeState}
                label="State"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                name="AgreementType"
                // onChange={setNominee}
                // value={nomObj.AppointeeState}
                label="Agreement Type"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion> */}

      {/* <h1>Policy Issued</h1> */}
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" color="primary">
            Other Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <MDBox pt={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Bank Branch ID"
                  name="BankBranchID"
                  value={PolicyDto.OtherDetails.BankBranchID}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="BDR Code"
                  name="BdrCode"
                  value={PolicyDto.OtherDetails.BdrCode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Customer ID"
                  name="CustomerID"
                  value={PolicyDto.OtherDetails.CustomerID}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Doc EX Code"
                  name="DocExCode"
                  value={PolicyDto.OtherDetails.DocExCode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Fos Code"
                  name="FosCode"
                  value={PolicyDto.OtherDetails.FosCode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Application No"
                  name="ApplicationNo"
                  value={PolicyDto.OtherDetails.ApplicationNo}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="SP Code"
                  name="SPCode"
                  value={PolicyDto.OtherDetails.SPCode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="SP Name"
                  name="SPName"
                  value={PolicyDto.OtherDetails.SPName}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="LG Code"
                  name="LGCode"
                  value={PolicyDto.OtherDetails.LGCode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="LOS Code"
                  name="LOSCode"
                  value={PolicyDto.OtherDetails.LOSCode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Security Code"
                  name="SecurityCode"
                  value={PolicyDto.OtherDetails.SecurityCode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Bank SM Code"
                  name="BankSmCode"
                  value={PolicyDto.OtherDetails.BankSmCode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="TL Code"
                  name="TLCode"
                  value={PolicyDto.OtherDetails.TLCode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="TSE Code"
                  name="TSECode"
                  value={PolicyDto.OtherDetails.TSECode}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Loan Account Number"
                  name="LoanAccountNumber"
                  value={PolicyDto.OtherDetails.LoanAccountNumber}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Loan Amount"
                  name="LoanAmount"
                  value={PolicyDto.OtherDetails.LoanAmount}
                  onChange={handleOtherDetails}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Bank Lead"
                  name="BankLead"
                  value={PolicyDto.OtherDetails.BankLead}
                  onChange={handleOtherDetails}
                />
              </Grid>
            </Grid>
          </MDBox>
        </AccordionDetails>
      </Accordion>
      {/* <MDButton sx={{ ml: 110 }} onClick={handleNext}>
        Calculate Premium
      </MDButton> */}
    </div>
  );
}

export default OtherDetails;
