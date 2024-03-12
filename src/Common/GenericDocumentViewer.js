import { Icon, IconButton, Stack, useMediaQuery } from "@mui/material";

import MDBox from "components/MDBox";
import MDLoader from "components/MDLoader";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { postRequest } from "../core/clients/axiosclient";

export default function GenericDocumentViewer() {
  const { search } = useLocation();

  const [status, setStatus] = useState(-1);
  const [docType, setDoType] = useState();
  const [src, setSrc] = useState("");
  const [loader, setLoading] = useState(false);
  const imagesTypes = ["png", "jpg", "jpeg", "tiff", "gif"];
  const refenceNumber = new URLSearchParams(search).get("DocId");
  const matchesMd = useMediaQuery("(min-width:1281px)");

  const DownloadFile = () => {
    setLoading(true);
    const link = document.createElement("a");
    link.href = `data:application/${docType};base64,${src}`;
    link.download = refenceNumber;
    console.log("FilenameQuote", link.download);

    link.click();
    setLoading(false);
  };

  useEffect(async () => {
    try {
      setLoading(true);
      const res = await postRequest("DMS/GetDocumentByType", {
        refenceNumber,
      });
      setLoading(false);
      if (res.data.status === 1) {
        setStatus(1);
        const extension1 = res.data.documentDetails[0].fileExtension.toLowerCase();
        const extension2 = imagesTypes.includes(extension1) ? "img" : "pdf";
        setDoType(extension2);
        setSrc(res.data.documentDetails[0].data);

        const src1 = `data:application/${extension2};base64,${src}`;
        const buffer = atob(src1.substring(src1.indexOf(",") + 1));
        console.log("Byte length: ", buffer.length);
        console.log("MB: ", buffer.length / 1e6);
      } else setStatus(0);
      setLoading(false);
    } catch {
      setStatus(0);
      setLoading(false);
    }
  }, []);

  return (
    <MDBox>
      <MDLoader loader={loader} />
      <MDBox sx={{ position: "relative" }} flexDirection="column">
        {docType === "img" && (
          <MDBox
            width="100%"
            height="100vh"
            component="img"
            src={`data:application/img;base64,${src}`}
            alt=""
          />
        )}{" "}
        {docType === "pdf" && (
          <MDBox sx={{ bgcolor: "#ffffff" }} height="100vh">
            {/* {false && ( */}

            <iframe
              width="100%"
              height="100%"
              src={`data:application/pdf;base64,${encodeURI(src)}`}
              title="PDF Viewer"
            />

            {/* <embed
                        type="application/pdf"
                        src={`data:application/pdf;base64,${encodeURI(item.src)}`}
                      /> */}
          </MDBox>
        )}
        {status === 0 && (
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <MDTypography variant="h3">Document Not Found !</MDTypography>
          </MDBox>
        )}
        {status === 1 && docType === "pdf" && !matchesMd && (
          <MDBox sx={{ position: "absolute", top: 0, left: 0, pt: "20%" }}>
            <MDBox sx={{ display: "flex", justifyContent: "center", width: "100vw" }}>
              <Stack>
                <IconButton onClick={DownloadFile}>
                  <Icon sx={{ fontSize: "2rem!important", color: "#1a237e" }}>download</Icon>
                </IconButton>
                <MDTypography variant="h6" color="primary" onClick={DownloadFile}>
                  Click To Download
                </MDTypography>
              </Stack>
            </MDBox>
          </MDBox>
        )}
        {status === 1 && docType === "img" && (
          <MDBox sx={{ position: "absolute", top: 0, right: 0, p: 3 }}>
            <MDBox sx={{ bgcolor: "#000000", p: 1 }}>
              <IconButton onClick={DownloadFile}>
                <Icon sx={{ fontSize: "2rem!important", color: "#ffffff" }}>download</Icon>
              </IconButton>
            </MDBox>
          </MDBox>
        )}
      </MDBox>

      <MDBox />
    </MDBox>
  );
}
