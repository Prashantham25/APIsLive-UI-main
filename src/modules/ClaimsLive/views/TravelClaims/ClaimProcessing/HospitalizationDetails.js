import { useState } from "react";
import {
  Grid,
  Accordion,
  Autocomplete,
  FormControlLabel,
  RadioGroup,
  Radio,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from "@mui/material";
import { useDataController } from "modules/BrokerPortal/context";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
// import MDButton from "../../../../../components/MDButton";
// import ViewDocument from "./ViewDocument";

function HospitalizationDetails() {
  const [controller] = useDataController();
  const { TravelClaimJson, TravelEnquiryFlag } = controller;
  const [ClaimObj] = useState(TravelClaimJson);
  // const onSave = () => {
  //   setContent(<ViewDocument />);
  // };
  return (
    <MDBox>
      {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss === "46" ? (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="body1" color="primary">
              Hospitalization Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Patient Name"
                  value={ClaimObj.basicDetails.memberDetails.insuredName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Patient Age"
                  value={ClaimObj.basicDetails.memberDetails.insuredAge}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="body2" ml={1}>
                    Gender
                  </MDTypography>
                  <RadioGroup row value={ClaimObj.basicDetails.memberDetails.gender}>
                    <FormControlLabel disabled value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel disabled value="Female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  disabled
                  options={["Allopathy"]}
                  value="Allopathy"
                  getOptionLabel={(option) => option}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px",
                    },
                  }}
                  renderInput={(params) => <MDInput {...params} label="System Of Medicine" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Name of Hospital"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                      .hospitalName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Country"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                      .hospitalCountry
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="State"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                      .hospitalState
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Pin Code"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.pincode
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="City "
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                      .hospitalDistrict
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Address"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                      .hospitalAddress
                  }
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <MDTypography variant="body2" ml={1}>
          Non-Medical
        </MDTypography>
      )}
      {!TravelEnquiryFlag && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              {/* <MDButton onClick={onSave}>SAVE</MDButton> */}
              <MDTypography> </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default HospitalizationDetails;
