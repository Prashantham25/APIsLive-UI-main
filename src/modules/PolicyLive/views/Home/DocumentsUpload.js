import React, { useState } from "react";
// import React from "react";
import { Stack, Grid, Container, CircularProgress, Backdrop } from "@mui/material";
import MDBox from "components/MDBox";
import { UploadFiles, ViewFiles } from "modules/PolicyLive/views/Home/data/index";
// import { ViewFiles } from "modules/PolicyLive/views/Home/data/index";
// import DropZone from "dropzone";
import swal from "sweetalert";
// import { CircularProgress, Backdrop } from "@mui/material";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";

function DocumentsUpload({ QuoteData }) {
  // const [PanCopy, setPanCopy] = useState();
  // const [ChequeCopy, setChequeCopy] = useState();
  // // const [pan, setPan] = useState();
  // const [UploadsDoc, setUploadsDoc] = useState({
  //   PAN: "",
  //   Cheque: "",
  // });

  // const [flags, setFlags] = useState(false);
  // let dwnfile = "";
  console.log("QuoteData", QuoteData);
  let uploadedfilename = "";
  const [dwnfile, setdwnfile] = useState(" ");
  const [flags, setflags] = useState(false);
  // let test = "";
  let fileext = "";

  //  const Filescons = QuoteData.quotation.quoteNo + dwnfile;
  const uploadFiles = async (files, type, fname) => {
    console.log("filename", fname);
    const formData = new FormData();
    const filename1 = QuoteData.quotation.quoteNo + fname;
    // const filename1 = QuoteData.quotation.quoteNo + files[0].name;
    formData.append("file", files, filename1);
    // formData.append("file", files, filename1);
    await UploadFiles(formData).then((result) => {
      console.log("result", result);
      setdwnfile(result.data[0].fileName);
      console.log("extension", dwnfile.split(".").pop(1));
      console.log("dwnfile", result.data[0].fileName);
      if (result.data[0].fileName !== "") {
        setflags(false);
        swal({
          text: "File upload successfully",
          icon: "success",
          html: true,
        });

        // if (result.data[0].fileName !== "") {
        if (type === "_PAN") {
          // console.log(" File uploaded");
          // setUploadsDoc((prevState) => ({ ...prevState, PAN: result.data[0].fileName }));
          // setPanCopy(files);
        } else if (type === "_Cheque") {
          console.log(" File uploaded");
          // setUploadsDoc((prevState) => ({ ...prevState, Cheque: result.data[0].fileName }));
          // setChequeCopy(files);
        } else if (type === "_DOBProof") {
          console.log("file uploaded");
        } else if (type === "_AddressProof") {
          console.log("file uploaded");
        } else {
          console.log("failed");
        }
      }
    });
  };
  const handleFileUpload = async (event, type) => {
    setflags(true);
    console.log("Choosen file name", event.target.files[0].name);
    // uploadedfilename = event.target.files[0].name;
    uploadedfilename = type;
    console.log("uploadedfilename", uploadedfilename);
    fileext = event.target.files[0].name.split(".").pop(1);
    uploadedfilename = [uploadedfilename, fileext].join(".");
    // uploadedfilename.concat(".", fileext);
    await uploadFiles(event.target.files[0], type, uploadedfilename);
    console.log("files", event.target.files[0]);
  };
  // const downloadFiles = async (files, type) => {
  //   const formData = new FormData();
  //   formData.append("file", files, files.name);
  //   await ViewFiles(formData).then((result) => {
  //     console.log("result", result);
  //   });
  // };
  const handleFileDownload = async () => {
    console.log(dwnfile);
    await ViewFiles(dwnfile).then((result) => {
      console.log("result", result);
      // await downloadFiles(event.target.files[0], type);
      // console.log("files", event.target.files[0]);
    });
  };

  return (
    <Container>
      <MDBox pt={3}>
        <Stack spacing={2}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4} textAlign="left">
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }} textAlign="left">
                {/* Valuation Report */}
                PAN Copy
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
                // onClick={BrowseFile}
              >
                <input accept="image/*" type="file" onChange={(e) => handleFileUpload(e, "_PAN")} />
                Browse File
              </MDButton>
              <Backdrop
                sx={{ color: "#ff0000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={flags}
              >
                <CircularProgress />
              </Backdrop>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                variant="outlined"
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                  ml: "7rem",
                }}
                onClick={handleFileDownload}
              >
                Download File
                {/* <input
                  accept="image/*"
                  type="dwnfile"
                  onChange={(e) => handleFileDownload(e, "PAN")}
                /> */}
                {/* onClick={handleFileDownload} */}
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                {/* Structure Audit Report */} Cheque Copy
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                <input
                  // hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "_Cheque")}
                />
                Browse File
              </MDButton>
              {/* <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={flags}
              >
                <CircularProgress />
              </Backdrop> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                variant="outlined"
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                  ml: "7rem",
                }}
                onClick={handleFileDownload}
              >
                Download File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                {/* Details of Contents */} DOB Proof
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                <input
                  // hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "_DOBProof")}
                />
                Browse File
              </MDButton>
              {/* <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={flags}
              >
                <CircularProgress />
              </Backdrop> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                variant="outlined"
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                  ml: "7rem",
                }}
                onClick={handleFileDownload}
              >
                Download File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                {/* Additional Document 1 */} Address Proof
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                <input
                  // hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "_AddressProof")}
                />
                Browse File
              </MDButton>
              {/* <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={flags}
              >
                <CircularProgress />
              </Backdrop> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                variant="outlined"
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                  ml: "7rem",
                }}
                onClick={handleFileDownload}
              >
                Download File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                {/* Additional Document 2 */}Other Document
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                <input
                  // hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "_OtherDocuments")}
                />
                Browse File
              </MDButton>
              {/* <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={flags}
              >
                <CircularProgress />
              </Backdrop> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                variant="outlined"
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                  ml: "7rem",
                }}
                onClick={handleFileDownload}
              >
                Download File
              </MDButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                {/* Additional Document 3 */}Additional Document 1
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                <input
                  // hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleFileUpload(e, "Addtional")}
                />
                Browse File
              </MDButton>
              {/* <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={flags}
              >
                <CircularProgress />
              </Backdrop> */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                variant="outlined"
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                  ml: "7rem",
                }}
                onClick={handleFileDownload}
              >
                Download File
              </MDButton>
            </Grid>
          </Grid>
          {/* <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Additional Document 4
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid> */}
          {/* <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Additional Document 5
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} xxl={4}>
              <MDButton
                sx={{
                  background: "#2196F380",
                  color: "#000000",
                }}
              >
                Browse File
              </MDButton>
            </Grid>
          </Grid> */}
        </Stack>
      </MDBox>
    </Container>
  );
}

export default DocumentsUpload;
