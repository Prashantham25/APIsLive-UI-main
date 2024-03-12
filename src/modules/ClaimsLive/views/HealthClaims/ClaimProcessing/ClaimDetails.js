import { useEffect, useState } from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
// import swal from "sweetalert";
// import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
import { useDataController } from "modules/BrokerPortal/context";
import {
  GetMasterData,
  GetBenefits,
  // SaveClaimDataDetails,
  // UpdateClaimBankAccounts,
  GetPolicyInfoByPolicyNumber,
} from "../data/index";
// import HospitalizationDetails from "./HospitalizationDetails";

function ClaimDetails() {
  const [controller] = useDataController();
  const { TravelClaimJson } = controller;
  const [ClaimObj] = useState(TravelClaimJson);
  const [ClaimType, setClaimType] = useState("");
  const [ClaimSubType, setClaimSubType] = useState("");
  const [Category, setCategory] = useState("");
  const [Procedure, setProcedure] = useState("");
  // const [MasterClaimSubType, setMasterClaimSubType] = useState([]);
  // const [policyDetails, setPolicyDetails] = useState("");
  const [UnitMes, setUnitMes] = useState("");
  const [payout, setPayout] = useState("");
  console.log("Selected claim", ClaimObj);
  const [LFlag, SetLFlag] = useState(true);

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
    const result = await GetMasterData();
    result.forEach((item) => {
      if (item.mType === "Travel Claim Category") {
        item.mdata.forEach((row) => {
          if (
            row.mID.toString() ===
            ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimCategory
          )
            setClaimType(row.mValue);
        });
      }
      // if (item.mType === "Travel Claim SubType") {
      //   item.mdata.forEach((row) => {
      //     if (
      //       row.mID.toString() ===
      //       ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimSubType
      //     )
      //       setClaimSubType(row.mValue);
      //   });
      // }
      if (item.mType === "SubType") {
        item.mdata.forEach((q) => {
          if (
            q.mID.toString() === ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimSubType
          ) {
            setClaimSubType(q.mValue);
          }
        });
      }
    });

    const PolicyNumber = ClaimObj.policyNo;
    console.log(PolicyNumber);
    console.log(ClaimObj);

    const Data2 = await GetPolicyInfoByPolicyNumber(PolicyNumber);
    const SData2 = Data2.policy_details[0].policyRequest;
    SData2.BenefitDetails.forEach((r) => {
      if (r.CoverId === ClaimObj.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss)
        setUnitMes(r.Unit);
    });
    setPayout(SData2.PayoutType);

    const SearchObj = {
      productCode: SData2["Product Code"],
      planType: SData2.PlanName,
      filterCriteria: [{ Plan: SData2.PlanName }],
      isFilterMemberWise: false,
      setBenefitMemberWise: false,
      insurableItems: null,
    };

    const Data4 = await GetBenefits({ SearchObj });
    console.log("Data4", Data4);
    Data4.finalResult.benefits.forEach((row) => {
      if (
        row.CoverId.toString() === ClaimObj.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss
      ) {
        setCategory(row.CoverName);
        row.BenefitDetails.forEach((item) => {
          if (
            item.BenefitCode.toString() ===
            ClaimObj.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss
          )
            setProcedure(item.BenefitName);
        });
      }
    });
    SetLFlag(false);
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

  return LFlag ? (
    <MDBox display="flex" justifyContent="center">
      <CircularProgress alignItems="center" />
    </MDBox>
  ) : (
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
              <MDInput
                InputProps={{ readOnly: true }}
                label="Policy Number"
                value={ClaimObj.policyNo}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Policy Start Date"
                value={ClaimObj.basicDetails.policyDetails.policyStartDate}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Policy End Date"
                value={ClaimObj.basicDetails.policyDetails.policyEndDate}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput InputProps={{ readOnly: true }} label="Payout Type " value={payout} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Policy Inception Date"
                value={ClaimObj.basicDetails.policyDetails.policyStartDate}
                // value={ClaimObj.basicDetails.policyInceptionDate}
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
            Member Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Member ID"
                value={ClaimObj.basicDetails.memberDetails.memberId}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Patient Name"
                value={ClaimObj.basicDetails.memberDetails.insuredName}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <MDTypography variant="body2" ml={1}>
                  Gender
                </MDTypography>
                <RadioGroup
                  InputProps={{ readOnly: true }}
                  row
                  value={ClaimObj.basicDetails.memberDetails.gender}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Patient Age"
                value={ClaimObj.basicDetails.memberDetails.insuredAge}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Corporate Name"
                // value={ClaimObj.basicDetails.memberDetails.patientRelationship}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Employee Name"
                // value={ClaimObj.basicDetails.memberDetails.patientRelationship}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput InputProps={{ readOnly: true }} label="Employee ID" />
            </Grid> */}
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
              <MDInput InputProps={{ readOnly: true }} label="Claim Type" value={ClaimType} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Claim Sub Type"
                value={ClaimSubType}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput InputProps={{ readOnly: true }} label="Category" value={Category} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput InputProps={{ readOnly: true }} label="Procedure Name" value={Procedure} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Unit of Measurement "
                value={UnitMes}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                   InputProps={{disabled }}
                label="Claimant Contact Name"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimantContactName}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                   InputProps={{ readOnly: true }}
                label="Claimant Contact Number"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimantContactName}
              />
            </Grid> */}

            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                   InputProps={{ readOnly: true }}
                label="Claimant Email"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.claimantEmail}
              />
            </Grid> */}

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Date of Admission"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.doaDol.split("T")[0]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Time of Admission"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.doaDol.split("T")[1]}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Date of Discharge"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.dod.split("T")[0]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Time of Discharge"
                value={ClaimObj.claimTransactionDTO[0].transactionDetailsDto.dod.split("T")[1]}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Intimation Received Date"
                value={ClaimObj.createdDate.split("T")[0]}
              />
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

      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Clinic Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Dr/Clinic of hospital"
                value={
                  ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.hospitalName
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Dr/Clinic Address"
                value={
                  ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                    .hospitalAddress
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Dr/Clinic City"
                value={
                  ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                    .hospitalDistrict
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Dr/Clinic State"
                value={
                  ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails
                    .hospitalState
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Dr/Clinic Pin Code"
                value={
                  ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.pincode
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Hospital Contact Number"
                value={
                  ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.contactNo
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Hospital Email ID"
                value={
                  ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.emailId
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                InputProps={{ readOnly: true }}
                label="Bill Date"
                value={
                  ClaimObj.claimTransactionDTO[0].transactionDetailsDto.hospitalDetails.hospitalInvoiceDate.split(
                    "T"
                  )[0]
                }
              />
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
    </MDBox>
  );
}
export default ClaimDetails;
