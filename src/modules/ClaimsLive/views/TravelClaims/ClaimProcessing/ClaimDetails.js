import { useEffect, useState } from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Radio,
  RadioGroup,
  Backdrop,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import loader from "assets/images/Gifs/loading4.gif";
// import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
// import swal from "sweetalert";
// import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
import { useDataController } from "modules/BrokerPortal/context";
import {
  GetMasterData,
  GetPolicyBenefitList,
  // SaveClaimDataDetails,
  // UpdateClaimBankAccounts,
} from "../data/index";
// import HospitalizationDetails from "./HospitalizationDetails";

function ClaimDetails() {
  const [controller] = useDataController();
  const { TravelClaimJson } = controller;
  const [ClaimObj] = useState(TravelClaimJson);
  const [ClaimSubtype, setClaimSubtype] = useState("");
  const [flag, setFlag] = useState(false);
  console.log("Selected claim", ClaimObj);

  const [benifit, setBenifit] = useState({ Benefit: " ", BenefitType: " ", BenefitCriteria: " " });
  useEffect(() => {
    console.log("benifit", benifit);
  }, [benifit]);

  // const [benifitDetails, setBenifitDetails] = useState({
  //   approvedClaimAmount: "",
  //   benefit: "",
  //   billing: [],
  //   billingDetails: [],
  //   calculatedClaimAmount: "",
  //   claimValue: "",
  //   claimedAmount: "",
  //   createdDateTime: "",
  //   deductible: "",
  //   isBreakup: "",
  //   isLumpSum: "",
  //   isValid: "",
  //   remarks: "",
  // });

  useEffect(async () => {
    setFlag(true);
    const PolicyNumber = ClaimObj.policyNo;
    console.log(PolicyNumber);
    console.log(ClaimObj);
    const benifitResult = await GetPolicyBenefitList({ PolicyNumber });
    console.log("benifitResult", benifitResult);
    benifitResult.finalResult.sectionMappingDetails.BenefitDetails.forEach(
      (item) => {
        if (item.BenefitID === ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss)
          setBenifit({ ...item });
      },
      [ClaimObj]
    );

    const result = await GetMasterData();
    result.forEach((item) => {
      if (item.mType === "Travel Claim Category") {
        item.mdata.forEach((row) => {
          if (
            row.mID.toString() ===
            ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimCategory
          ) {
            setClaimSubtype(row.mValue);
          }
        });
      }
    });
    setFlag(false);
  }, []);

  // const onSave = async () => {
  //   const hid = new Date(
  //     ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.hospitalInvoiceDate
  //   );
  //   ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.hospitalInvoiceDate = [
  //     hid.getFullYear(),
  //     hid.getMonth() + 1,
  //     hid.getDate(),
  //   ].join("-");
  //   const TravelClaimIntimation = ClaimObj;
  //   const Data = await SaveClaimDataDetails({ TravelClaimIntimation });
  //   console.log("onSave Response", Data);
  //   // const result = await SaveClaimHistory({ transactionNumber });
  //   const ClaimId = ClaimObj.basicDetails.claimId;
  //   const TransactionId = ClaimObj.claimTransactionDTO[0].transactionId;

  //   const Data1 = await UpdateClaimBankAccounts({ ClaimId, TransactionId, ClaimObj });
  //   console.log(Data1);
  //   swal({
  //     html: true,
  //     icon: "success",
  //     title: "Claim Details Saved",
  //   });
  //   setContent(<HospitalizationDetails />);
  // };

  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Policy Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput disabled label="Policy Number" value={ClaimObj.policyNo} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput disabled label="Policy Type " />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Policy Inception Date"
                value={ClaimObj.basicDetails.policyInceptionDate}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Policy Start Date"
                value={ClaimObj.basicDetails.policyDetails.policyStartDate}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Policy End Date"
                value={ClaimObj.basicDetails.policyDetails.policyEndDate}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput disabled label="Product Code" value={ClaimObj.basicDetails.productCode} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput disabled label="Product Code" value={benifit.Benefit} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput disabled label="Benefit Type" value={benifit.BenefitType} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput disabled label="Benefit Criteria" value={benifit.BenefitCriteria} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Member Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Member ID"
                value={ClaimObj.basicDetails.memberDetails.memberId}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Insured Name"
                value={ClaimObj.basicDetails.memberDetails.insuredName}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <MDTypography variant="body2" ml={1}>
                  Gender
                </MDTypography>
                <RadioGroup disabled row value={ClaimObj.basicDetails.memberDetails.gender}>
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Insured Age"
                value={ClaimObj.basicDetails.memberDetails.insuredAge}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Patient Relationship"
                value={ClaimObj.basicDetails.memberDetails.patientRelationship}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Claim Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput disabled label="Claim Category" value={ClaimSubtype} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Claimant Contact Name"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimantContactName}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Claimant Contact Number"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimantContactName}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="Claimant Email"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimantEmail}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="DOA/DOL"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.doaDol}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="DOD"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.dod}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput disabled label="Intimation Received Date" />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            TPA Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Name" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Registration no" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Name of CAO/CEO" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Contact Number" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Email ID" />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion> */}

      {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss === "46" && (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="body1" color="primary">
              Hospital Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Name of hospital"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                      .hospitalName
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MDInput
                  disabled
                  label="Address"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                      .hospitalAddress
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="City"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                      .hospitalDistrict
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
                  label="Hospital Contact Number"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.contactNo
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Hospital Fax Number"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.faxNo
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Hospital Email ID"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.emailId
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  disabled
                  label="Hospital Invoice Date"
                  value={
                    ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                      .hospitalInvoiceDate
                  }
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Document Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={[]}
                getOptionLabel={(option) => option}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                renderInput={(params) => <MDInput {...params} label="Document List" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
             
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion> */}
      {/* {!TravelEnquiryFlag && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={onSave}>SAVE</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      )} */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={flag}>
        <img
          alt=""
          src={loader}
          style={{ justifyContent: "center", height: "150px", width: "150px" }}
        />
      </Backdrop>
    </MDBox>
  );
}
export default ClaimDetails;
