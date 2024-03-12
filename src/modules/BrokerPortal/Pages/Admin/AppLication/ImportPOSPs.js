import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Grid, Stack, CircularProgress, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import readXlsxFile from "read-excel-file";
// import * as FileSaver from "file-saver";
// import * as XLSX from "xlsx";
import { utils, writeFile } from "xlsx";
import { ArrowBack } from "@mui/icons-material";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
// import { UploadFiles, DeleteFile } from "modules/BrokerPortal/Pages/CRM/data";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import Box from "@mui/material/Box";
// import Dropzone from "react-dropzone-uploader";
import swal from "sweetalert";
import Submitted from "assets/images/BrokerPortal/Submitted.png";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForward from "@mui/icons-material/ArrowForward";
// import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@mui/material/Typography";
import { DeleteFile } from "../../MyProfile/data/index";
import { postRequest } from "../../../../../core/clients/axiosclient";
// import { PostPosp } from "../data/index";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "56rem",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function Loading() {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <CircularProgress size="10rem" />
    </MDBox>
  );
}

function UploadImport({ handleModalUploadImportClose }) {
  const navigate = useNavigate();
  const viewProspect = () => {
    navigate(`/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList`);
  };
  return (
    <MDBox sx={style}>
      <Grid container spacing={1} m={1} justifyContent="end">
        <ClearIcon onClick={handleModalUploadImportClose} />
      </Grid>
      <MDBox component="img" src={Submitted} sx={{ marginTop: "0.1rem", marginLeft: "-11px" }} />
      <MDTypography sx={{ fontSize: "1rem", fontWeight: 500 }}>
        Data Imported Successfully
      </MDTypography>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography sx={{ fontSize: "1rem", fontWeight: 500, ml: "-25rem", mt: "1.2rem" }}>
          Succesfully Imported
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography sx={{ fontSize: "1rem", fontWeight: 500, mt: "-1.5rem" }}>
          Duplicates Found
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography sx={{ fontSize: "1rem", fontWeight: 500, ml: "25rem", mt: "-1.6rem" }}>
          Error Records
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography
          sx={{ fontSize: "1rem", fontWeight: 500, ml: "-25rem", mt: "1rem", color: "#3d8c40" }}
        >
          120
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography sx={{ fontSize: "1rem", fontWeight: 500, mt: "-1.5rem", color: "#FFAE42" }}>
          20
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography
          sx={{ fontSize: "1rem", fontWeight: 500, ml: "25rem", mt: "-1.6rem", color: "#FF0000" }}
        >
          12
        </MDTypography>
      </Grid>
      <MDTypography sx={{ fontSize: "0.8rem", mt: "2rem" }}>
        Please Download the Error log file for your reference
      </MDTypography>
      <MDTypography sx={{ fontSize: "0.8rem", color: "#FF0000", mt: "1rem" }}>
        Note: Error log file consists of Duplicate Entries as well
      </MDTypography>
      <Stack direction="row" justifyContent="space-between" p={1}>
        <MDBox>
          <MDButton
            variant="outlined"
            sx={{
              height: "auto",
              width: "auto",
              borderRadius: "4px",
              color: "#8B0000",
              marginTop: "1rem",
              marginLeft: "15rem",
            }}
          >
            <DownloadIcon />
            Error Log File
          </MDButton>
          <MDButton
            variant="contained"
            sx={{
              height: "auto",
              width: "auto",
              borderRadius: "4px",
              color: "white",
              marginTop: "1rem",
              marginLeft: "1rem",
            }}
            onClick={viewProspect}
          >
            <ArrowForward />
            View Prospect
          </MDButton>
        </MDBox>
      </Stack>
    </MDBox>
  );
}

function ImportPOSPs() {
  const [posps] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [documentType, setdocumentType] = useState();
  console.log("documentType", documentType);
  // const [upload, setUpload] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  // const [regcert1, setRegCert1] = useState("");
  const handleModalOpen = () => setModalOpen(true);
  const [modalUploadImportOpen, setmodalUploadImportOpen] = useState(false);
  const handleModalUploadImportOpen = () => {
    setmodalUploadImportOpen(true);
  };
  const handleModalUploadImportClose = () => {
    setmodalUploadImportOpen(false);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleclose = () => {
    setmodalUploadImportOpen(false);
    // setDrawer(false);
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const handleExport = () => {
    const headings = [
      [
        "POSP Agent Code",
        "Salutation",
        "First Name",
        "Last Name",
        "Email ID",
        "Mobile Number",
        "DOB",
        "Educational Qualification",
        "Educational Qualification (If others, please specfiy)",
        "PAN details submitted",
        "KYC documents submitted",
        "Pincode",
        "State",
        "District",
        "Address 01",
        "Address 02",
        "Course name",
        "Certificate No",
        "Certificate Issued Date",
        "Branch Code",
        "Region/Line/Sales Manager Code",
        "Type of Insurance",
        "Line of Business Category",
      ],
    ];

    const wb = utils.book_new();

    const ws = utils.json_to_sheet([]);

    utils.sheet_add_aoa(ws, headings);

    utils.sheet_add_json(ws, posps, { origin: "A2", skipHeader: false });

    utils.book_append_sheet(wb, ws, "Report");

    writeFile(wb, "Posps Template.xlsx");
  };
  const UploadDocument = async () => {
    // debugger;
    console.log("filename", selectedFile);
    const formData = new FormData();
    formData.append("Files", selectedFile);
    formData.append("TemplateId", "170");
    await postRequest(`ExcelUpload/Upload`, formData).then(async (res) => {
      //
      console.log("1234567", res);

      // const documentId = res.data.documentUploadId;
      await postRequest(
        `Partner/UploadOnboardedPosps?DocumentId=${res.data.documentUploadId}`
      ).then((data) => {
        console.log(" 2", data);

        if (data.data === 1) {
          swal({
            icon: "success",
            text: "File Uploaded successfully",
          });
        } else if (res === null || res === "") {
          swal({
            icon: "error",
            text: "File uploading failed",
          });
        }
      });
    });

    setdocumentType(selectedFile);
  };
  const handleFileUpload = async (event) => {
    // await UploadDocument(event.target.files[0], type);
    console.log("files", event.target.files[0]);
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDeleteFile = async (fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        // setRegCert1();
        setSelectedFile("");
      }
    });
  };
  const navigate = useNavigate();
  const handleGoback = () => {
    navigate("/modules/BrokerPortal/Pages/Admin/AppLication/OnBoardPOSP");
  };

  return (
    <Grid container>
      <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" mt={1} m={0}>
        <TableContainer component={Paper}>
          <Stack direction="row" justifyContent="space-between" p={2}>
            <MDTypography color="primary">Import Agents</MDTypography>
            <MDButton
              onClick={handleGoback}
              color="primary"
              variant="outlined"
              startIcon={<ArrowBack />}
            >
              &nbsp; Go Back
            </MDButton>
          </Stack>
          <Stack direction="row" justifyContent="space-around" p={2}>
            <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
              <Box
                sx={{
                  p: 3,
                  border: "1px dashed grey",
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "400px",
                }}
              >
                <Typography
                  variant="h5"
                  color="primary"
                  component="span"
                  align="center"
                  gutterBottom
                >
                  <CloudDoneOutlinedIcon fontSize="large" />
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {" "}
                  Select a file or drag and drop here{" "}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {" "}
                  All .csv, .xlxs and .xls file types supported here{" "}
                </Typography>
                <Grid container justifyContent="center" p={2} alignItems="bottom">
                  <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    {selectedFile ? (
                      <>
                        <MDTypography
                          sx={{
                            flex: 1,
                            fontSize: "12px",
                            fontWeight: 500,
                            marginRight: "1rem",
                          }}
                        >
                          {selectedFile.name}
                        </MDTypography>
                        <MDButton variant="outlined" color="secondary" onClick={handleDeleteFile}>
                          Remove
                        </MDButton>
                      </>
                    ) : (
                      <label htmlFor="file-upload">
                        <input
                          type="file"
                          id="file-upload"
                          hidden
                          accept="image/bmp, image/jpeg, image/png, .pdf, .xls, .xlsx, .csv"
                          onChange={(e) => handleFileUpload(e, "fileName")}
                          style={{ display: "none" }}
                        />
                        <MDButton variant="outlined" component="span">
                          Browse File
                        </MDButton>
                      </label>
                    )}
                  </MDBox>
                  {selectedFile && (
                    <MDBox sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                      <MDButton variant="contained" color="primary" onClick={UploadDocument}>
                        Upload
                      </MDButton>
                    </MDBox>
                  )}
                </Grid>
              </Box>
              <Typography variant="h6" color="Red" gutterBottom sx={{ fontWeight: 300, mt: 2 }}>
                {" "}
                If we find any duplicate contacts well remove them for you{" "}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                {" "}
                Dont have a file ready?{" "}
              </Typography>
              <Typography variant="subtitle1" gutterBottom align="center" sx={{ mt: 2 }}>
                {" "}
                Download sample template and add your data to it <br /> or apply the format to your
                spreadsheet.{" "}
              </Typography>
              <MDButton
                sx={{ mt: 2 }}
                onClick={handleExport}
                color="primary"
                variant="outlined"
                startIcon={<DownloadSharpIcon />}
              >
                &nbsp; Download Template
              </MDButton>
            </Box>
          </Stack>
          <MDBox>
            {loading ? (
              <Loading />
            ) : (
              <Modal
                open={modalUploadImportOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <UploadImport
                  handleModalUploadImportClose={handleModalUploadImportClose}
                  handleModalUploadImportOpen={handleModalUploadImportOpen}
                  handleclose={handleclose}
                  handleModalOpen={handleModalOpen}
                  handleModalClose={handleModalClose}
                  setmodalAddDocumentOpen={setmodalUploadImportOpen}
                />
              </Modal>
            )}
          </MDBox>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
export default ImportPOSPs;
