import { useState } from "react";
import { Grid, Stack } from "@mui/material";
import Swal from "sweetalert2";

import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import {
  GetProposalByNumber,
  UpdateProposalDetails,
  GenericApi,
} from "../../../PolicyLive/views/Life/Products/NewBusiness/data";
import MDLoader from "../../../../components/MDLoader";

export default function UpdateOTPStamp() {
  const [loader, setLoader] = useState(false);
  const [ProposalNo, setProposalNo] = useState("");
  const [ProposalJson, setProposalJson] = useState({
    CoreProposalNo: "",
    opportunityId: "",
    OTPVerifyStatus: "",
  });

  const onFetchProposal = () => {
    GetProposalByNumber(ProposalNo).then((r) => {
      setProposalJson(r[0]?.policyDetails);
    });
  };

  const onClearData = () => {
    setProposalJson({
      CoreProposalNo: "",
      opportunityId: "",
      OTPVerifyStatus: "",
    });
    setProposalNo("");
  };

  const onUpdateProposal = () => {
    setLoader(true);
    UpdateProposalDetails({ ...ProposalJson, OTPVerifyStatus: true }).then((res) => {
      setLoader(false);
      Swal.fire({ text: res.responseMessage }); //
    });
  };

  const onUploadToDMS = async () => {
    setLoader(true);
    // Generate Document and save to DMS
    await GenericApi("LifeInsurance", "PrpoposalUploadApi", {
      opportunityId: ProposalJson.opportunityId,
      communicationId: "365",
      ProposalNo,
      EmailID: "prashantha.m@inubesolutions.com",
    });
    setLoader(false);
  };

  return (
    <Grid container spacing={2} p={3}>
      <MDLoader loader={loader} />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="Proposal No"
          value={ProposalNo}
          onChange={(e) => {
            setProposalNo(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
        <Stack direction="row" spacing={2}>
          <MDButton onClick={onFetchProposal}>Fetch details</MDButton>
          <MDButton variant="outlined" onClick={onClearData}>
            Clear
          </MDButton>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Core Proposal No" value={ProposalJson?.CoreProposalNo} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Opportunity ID" value={ProposalJson?.opportunityId} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput disabled label="Current OTP Flag" value={ProposalJson?.OTPVerifyStatus} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" spacing={2}>
          <MDButton onClick={onUpdateProposal}> Update Proposal</MDButton>
          <MDButton onClick={onUploadToDMS}>Upload to DMS</MDButton>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://esales.licindia.in/GenericDocumentViewer?DocId=${ProposalNo}.pdf`}
        >
          Click to view Proposal PDF{" "}
        </a>
      </Grid>
    </Grid>
  );
}
