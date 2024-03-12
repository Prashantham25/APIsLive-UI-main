import { Grid, IconButton, Stack, Icon } from "@mui/material";
import { useState } from "react";

import MDTypography from "components/MDTypography";

import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import MDInput from "../../../../../../../components/MDInput";
import MDButton from "../../../../../../../components/MDButton";
import { GetOpportunityByNumber, GetDocumentById } from "../data";
import MDBox from "../../../../../../../components/MDBox";
import MDLoader from "../../../../../../../components/MDLoader";

export default function ViewDocuments() {
  const [AccessId, setAccessId] = useState("");
  const [RiskItems, setRiskItems] = useState([]);
  const [loader, setLoader] = useState(false);

  const onGetDocumentsList = () => {
    GetOpportunityByNumber(AccessId).then((res) => {
      if (Array.isArray(res?.AdditionalDetailsJson?.AutoSave?.RiskItems))
        setRiskItems(res.AdditionalDetailsJson.AutoSave.RiskItems);
    });
  };
  const DownloadFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);

    link.click();
  };

  const onDownloadDocument = async (fileName, DocumentName) => {
    setLoader(true);
    await GetDocumentById(fileName).then((res) => {
      setLoader(false);
      DownloadFile(res.data, DocumentName);
    });
  };

  return (
    <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus, height: "100%" }}>
      <MDLoader loader={loader} />
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Enter Access ID"
            value={AccessId}
            onChange={(e) => {
              setAccessId(e.target.value);
              setRiskItems([]);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3} xxl={3}>
          <MDButton onClick={onGetDocumentsList}>Fetch Documents</MDButton>
        </Grid>
        {RiskItems.map((x) => (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography color="primary" variant="h5">
                  {x.Name}
                </MDTypography>
              </Grid>
              {Array.isArray(x.DocumentDetails) &&
                x.DocumentDetails.map((x1) => (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Stack direction="row" spacing={1} ml={2}>
                      <MDTypography>{x1.DocumentName}</MDTypography>
                      <IconButton onClick={() => onDownloadDocument(x1.fileId, x1.DocumentName)}>
                        <Icon color="primary">download</Icon>
                      </IconButton>
                    </Stack>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
}
