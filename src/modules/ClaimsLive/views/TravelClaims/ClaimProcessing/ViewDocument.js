import { useEffect, useState } from "react";
import {
  Grid,
  Accordion,
  AccordionDetails,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useDataController, setTravelClaimJson } from "modules/BrokerPortal/context";
import swal from "sweetalert";
import { onDownloadClick, SaveClaimDataDetails, UpdateClaimBankAccounts } from "../data/index";
import MDButton from "../../../../../components/MDButton";
import ClaimHistory from "./ClaimHistory";

function ViewDocument({ setContent }) {
  const [controller, dispatch] = useDataController();
  const { TravelClaimJson, TravelEnquiryFlag } = controller;
  const [ClaimObj, setClaimObj] = useState(TravelClaimJson);

  // const [onSaveFlag, setOnSaveFlag] = useState(false);
  const [doc, setDoc] = useState(false);

  const onDownClick = async (id) => {
    await onDownloadClick(id);
  };
  const onSave = async () => {
    if (doc === true) {
      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.isDocCorrect = doc;
      setClaimObj({ ...ClaimObj });
      setTravelClaimJson(dispatch, { ...ClaimObj });
      const TravelClaimIntimation = ClaimObj;
      const Data = await SaveClaimDataDetails({ TravelClaimIntimation });

      const ClaimId = ClaimObj.basicDetails.claimId;
      const TransactionId = ClaimObj.claimTransactionDTO[0].transactionId;

      await UpdateClaimBankAccounts({ ClaimId, TransactionId, ClaimObj });

      console.log("onSave Response", Data);
      // const result = await SaveClaimHistory({ transactionNumber });

      swal({
        html: true,
        icon: "success",
        title: "Document Details Verified",
      });
    }
    setContent(<ClaimHistory />);
  };

  useEffect(() => {
    setDoc(ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.isDocCorrect);
  }, [ClaimObj]);
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Documents
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.aadhar !== "" && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography>Aadhar Document</MDTypography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <IconButton
                  onClick={() =>
                    onDownClick(
                      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.aadhar
                    )
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.drivingLicense !==
            "" && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography>Driving License</MDTypography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <IconButton
                  onClick={() =>
                    onDownClick(
                      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails
                        .drivingLicense
                    )
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.firDoc !== "" && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography>FIR Document</MDTypography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <IconButton
                  onClick={() =>
                    onDownClick(
                      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.firDoc
                    )
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.medicalCert !==
            "" && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography>Medical Certificate</MDTypography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <IconButton
                  onClick={() =>
                    onDownClick(
                      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails
                        .medicalCert
                    )
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.pan !== "" && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography>Pan</MDTypography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <IconButton
                  onClick={() =>
                    onDownClick(
                      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.pan
                    )
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.passport !==
            "" && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography>Passport</MDTypography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <IconButton
                  onClick={() =>
                    onDownClick(
                      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.passport
                    )
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails
            .passportVisaStamp !== "" && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography>Passport Visa Stamp</MDTypography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <IconButton
                  onClick={() =>
                    onDownClick(
                      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails
                        .passportVisaStamp
                    )
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.tripTicket !==
            "" && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography>Trip Ticket</MDTypography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <IconButton
                  onClick={() =>
                    onDownClick(
                      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails
                        .tripTicket
                    )
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.others !== "" && (
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography>others</MDTypography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <IconButton
                  onClick={() =>
                    onDownClick(
                      ClaimObj.claimTransactionDTO[0].transactionDetailsDto.documentDetails.others
                    )
                  }
                >
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={TravelEnquiryFlag}
                      checked={doc}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setDoc(checked);
                      }}
                    />
                  }
                  label="Documents are completed"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {!TravelEnquiryFlag && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={onSave}>SAVE</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default ViewDocument;
