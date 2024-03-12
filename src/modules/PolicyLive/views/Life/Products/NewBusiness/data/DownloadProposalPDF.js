import { useState } from "react";

import { IconButton, Grid, Icon, Stack, CircularProgress } from "@mui/material";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import { GetTemplatePayload } from "../../../../Retail/Payment/Apis";

export default function DownloadProposalPDF({ QuotationData, closeModal, DownloadFile }) {
  const [progressBar, setProgressBar] = useState({ index: -1, flag: false });

  const DownloadTemplate = async (ProposalNo, i) => {
    setProgressBar({ index: i, flag: true });
    await GetTemplatePayload({
      key: ProposalNo,
      keyValue: "BGRProposal",
      templateKey: "",
      templateId: 396,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    }).then((res) => {
      setProgressBar({ index: -1, flag: false });

      DownloadFile(res.data, ProposalNo);
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox sx={{ justifyContent: "right", display: "flex" }}>
          <IconButton color="error" onClick={closeModal}>
            <Icon>close</Icon>
          </IconButton>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ textAlign: "center", color: "#0d47a1" }}>
          Download Proposal Form
        </MDTypography>
      </Grid>

      {QuotationData.map((x, i) => (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={5}>
            <MDTypography variant="h5" sx={{ fontWeight: 400 }}>
              {x.Product}
            </MDTypography>
            <IconButton onClick={() => DownloadTemplate(x.ProposalNo, i)}>
              <Icon>download</Icon>
            </IconButton>
            {progressBar.index === i && progressBar.flag === true && <CircularProgress size={30} />}{" "}
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
