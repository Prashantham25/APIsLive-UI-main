import React from "react";
import MDInput from "components/MDInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";

function RenderControl({ x, RiskItems }) {
  return (
    <Grid items xs={x.spacing} mb={3} mr={5}>
      <MDInput
        label={x.label}
        value={RiskItems[x.name]}
        variant={x?.variant ? x.variant : "outlined"}
        multiline
        InputProps={{ ...x.InputProps }}
      />
    </Grid>
  );
}

function Claimdetails({ claimsDetails }) {
  const controlItems = [
    {
      label: "Participant Name",
      visible: true,
      name: "ParticipantName",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Product Type",
      visible: true,
      name: "productType",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Policy No.",
      visible: true,
      name: "PolicyNo",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Policy Start Date & Time",
      visible: true,
      name: "PolicyStartDate",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Policy End Date & Time",
      visible: true,
      name: "PolicyEndDate",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Vehicle Plate No.",
      visible: true,
      name: "VehiclePlateNo",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Vehicle Usage Type",
      visible: true,
      name: "VehicleUsageType",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Chassis No.",
      visible: true,
      name: "ChassisNumber",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Engine No.",
      visible: claimsDetails.data.finalResult.claimBasicDetails.PolicyDetails.EngineNumber !== "",
      name: "EngineNumber",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Participant Mobile No.",
      visible: claimsDetails.data.finalResult.claimBasicDetails.PolicyDetails.MobileNumber !== "",
      name: "MobileNumber",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Email ID",
      visible: claimsDetails.data.finalResult.claimBasicDetails.PolicyDetails.EmailId !== "",
      name: "EmailId",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    // {
    //   label: "Claim Intimated By",
    //   visible: true,
    //   name: "ClaimIntimatedBy",
    //   variant: "standard",
    //   spacing: 2.5,
    //   InputProps: { disableUnderline: true, readOnly: true },
    // },
  ];
  const controlItemsFNOL = [
    {
      label: "Accident Date & Time",
      visible: true,
      name: "AccidentDate",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Accident Location",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.otherAccidentLocation === "",
      name: "AccidentLocation",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Location details",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.otherAccidentLocation !== "",
      name: "otherAccidentLocation",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Intimation Mode",
      visible: true,
      name: "IntimationMode",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Notified By",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.NotifiedBy !== "Others",
      name: "NotifiedBy",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Notifier Name",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.NotifiedBy === "Others",
      name: "NotifierName",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Notifier Mobile No.",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.NotifiedBy === "Others",
      name: "NotifierMobileNo",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Witness Name",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.isAnyWitness === "Yes",
      name: "WitnessName",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Witness Mobile No.",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.isAnyWitness === "Yes",
      name: "WitnessMobileNo",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Cause of Accident",
      visible: true,
      name: "causeofAccident",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "Accident Remarks",
      visible: true,
      name: "AccidentRemarks",
      variant: "standard",
      spacing: 11.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "ROP Report No.",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.isROPReported === "Yes",
      name: "ROPNo",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "ROP Report Date",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.isROPReported === "Yes",
      name: "ROPReportDate",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "ROP Officer Name",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.isROPReported === "Yes",
      name: "ROPOfficerName",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
    {
      label: "ROP Location",
      visible:
        claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails.ClaimsInfo
          .IntimationDetails.isROPReported === "Yes",
      name: "ROPLocation",
      variant: "standard",
      spacing: 2.5,
      InputProps: { disableUnderline: true, readOnly: true },
    },
  ];
  return (
    <Card>
      <Accordion color="primary" defaultExpanded sx={{ m: 2 }}>
        <AccordionSummary
          color="primary"
          sx={{ background: "#E2F7FF" }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
              <MDTypography>Policy Details</MDTypography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} m={4}>
            {controlItems.map((x) =>
              x.visible ? (
                <RenderControl
                  x={x}
                  RiskItems={claimsDetails.data.finalResult.claimBasicDetails.PolicyDetails}
                />
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion color="primary" defaultExpanded sx={{ m: 2 }}>
        <AccordionSummary
          color="primary"
          sx={{ background: "#E2F7FF" }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
              <MDTypography>FNOL Details</MDTypography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} m={4}>
            {controlItemsFNOL.map((x) =>
              x.visible ? (
                <RenderControl
                  x={x}
                  RiskItems={
                    claimsDetails.data.finalResult.transactionDataDTO[0].transactionDetails
                      .ClaimsInfo.IntimationDetails
                  }
                />
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <MDBox
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          pt: 2,
          pb: 2,
          //   m: 2,
          backgroundColor: "#fff",
          boxShadow: "0px -4px 4px -2px rgba(0,0,0,0.1)",
        }}
      >
        <MDButton variant="outlined" color="secondary" display="flex" ml={300}>
          Back
        </MDButton>
        <MDBox sx={{ flex: "1 1 auto" }} />
        <MDButton
          variant="outlined"
          //   variant="contained"
          display="flex"
          color="secondary"
          sx={{
            justifyContent: "flex-end",
            whiteSpace: "nowrap",
            mr: 2,
          }}
        >
          Upload Document
        </MDButton>
        <MDButton variant="contained" color="secondary" mr={4}>
          Generate ROP Aknowledgement
        </MDButton>
      </MDBox>
    </Card>
  );
}
export default Claimdetails;
