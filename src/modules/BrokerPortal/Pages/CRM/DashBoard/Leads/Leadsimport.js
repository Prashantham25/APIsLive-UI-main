import React, { useState, useEffect } from "react";
import { Grid, IconButton, Stack, Card, CircularProgress, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx";
import { UploadFiles, DeleteFile } from "modules/BrokerPortal/Pages/CRM/data";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Submitted from "assets/images/BrokerPortal/Submitted.png";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import { setCRMData, useDataController } from "../../../../context";
import CRMJson from "../../data/jsonData";
import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";

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
  const viewLeads = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Leadsindex`);
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
            onClick={viewLeads}
          >
            <ArrowForward />
            View Leads
          </MDButton>
        </MDBox>
      </Stack>
    </MDBox>
  );
}

function Leadsimport() {
  const [, dispatch] = useDataController();

  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [Crminfydto, setCrminfydto] = useState({ ...CRMJson });
  useEffect(() => {
    setCRMData(dispatch, Crminfydto);
  }, [Crminfydto]);
  const [documentType, setdocumentType] = useState();
  console.log("documentType", documentType);
  const [upload, setUpload] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const navigate = useNavigate();
  const handleBackLeads = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Leadsindex`);
  };

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

  const UploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        Crminfydto.ProspectDetailsJson.Documents[0].fileName = result.data[0].fileName;
        // setCrminfydto((prevState) => ({ ...prevState, fileName: result.data[0].fileName }));
        setCrminfydto((prevState) => ({ ...prevState, Crminfydto }));
        console.log("Documentfile", result.data[0].fileName);
        console.log("jsonbinding", Crminfydto);
        setdocumentType(file);
        setUpload(true);
      }
    });
  };

  const handleFileUpload = async (event, type) => {
    await UploadDocument(event.target.files[0], type);
    console.log("files", event.target.files[0]);
  };

  const handleDeleteFile = async (fileName) => {
    await DeleteFile(fileName).then((result) => {
      console.log("result", result);
      if (result.data.status === 5) {
        Crminfydto.ProspectDetailsJson.Documents[0].fileName = "";
        // if (type === "fileName") {
        //   setdocumentType();
        setCrminfydto((prevState) => ({ ...prevState, Crminfydto }));
        console.log("jsonbindingdeleted", Crminfydto);
        // }
      }
    });
  };

  const handleDownloadTemplate = () => {
    const headings = [
      [
        "Client ID & Client Converted date are system \n generated",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "1. Civil Service officers, Adminisatrative, Finance and Accounts Professional \n 2. News, Media and Entertainment Professional and Technicians \n 3. Banking, Financial Service and Insurance Professional and Intermediaries \n 4. Arbitrators, Mediators, Legal and Other such Professional \n 5.Animal Care, Veterinary Professional \n 6.Any Engineering Professional and Technicians including Data, Software and Telecom\n 7.Branding, Sales and Marketing Professional 8.Education and Teaching Professional \n 9.Fine Art Professional including Fashion designers, Art collectors, Owners etc \n 10.Fitness, Leisure and Sports Professional and Worker \n  11.Food and Agriculture Professional and Worker \n 12.Health Care Professional \n 13.Homemaker,Student, Retirees, Pensioners and other dependents \n 14.Industrial Workers \n 15.Manufactured Food / Restauraunt / Hotel Business Professional and worker \n 16.News, Media and Entertainment Professional and Technicians \n 17.Non Profit, Religion and Social Service Professional and Worker \n 18.Private security, Police, Customs, Law enforcers  Fireforce and Armed Force related Professional \n 19.Real Estate, Architecture and Construction Professional and worker \n 20.Retail establishment and Other General Workers \n  21.Self Employed General Service \n 22.Social / Natural Science Professional / Scientist and other Acadamicians \n  23.Transportation (Road / Rail / Air / Marine) Professional & Worker including postal and Courier",
        "",
        "",
        "",
        "",
      ],
      [
        "Client ID",
        "Client Converted Date",
        "Name",
        "Gender",
        "Mobile Number",
        "Email ID",
        "Date of Birth",
        "Address 01",
        "Address 02",
        "Pincode",
        "State",
        "District",
        "City",
        "Profession",
        "Income",
        "Source",
        "Opportunities",
        "Affordability Status",
      ],
    ];

    const wb = utils.book_new();
    const ws = utils.json_to_sheet([], { skipHeader: true });

    // Add merged cells for "Prospect ID" and "Prospect Created Date"
    const merges = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
    ws["!merges"] = merges;
    const defaultColumnWidth = 20;
    const cellProps = { wpx: 70, hpx: 60 };
    ws["!cols"] = [
      { width: 30 },
      ...Array(headings[0].length - 6).fill({ width: defaultColumnWidth }),
      { width: 62 },
      ...Array(4).fill({ width: defaultColumnWidth }),
    ];
    ws["!rows"] = [{ hpx: cellProps.hpx }];
    utils.sheet_add_aoa(ws, headings, { origin: -1 });
    ws.A1.s = { alignment: { wrapText: true, vertical: "top", horizontal: "center" } };
    ws.N1.s = { alignment: { wrapText: true, vertical: "top", horizontal: "center" } };
    utils.book_append_sheet(wb, ws, "Report");

    writeFile(wb, "Clients Template.xlsx");
  };

  return (
    <MDBox p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox display="flex" flexDirection="row" alignItems="center">
          <IconButton size="small">
            <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={handleBackLeads} />
          </IconButton>
          <MDTypography
            sx={{ fontSize: "0.75rem", cursor: "pointer" }}
            variant="h6"
            onClick={handleBackLeads}
          >
            Back to Leads
          </MDTypography>
        </MDBox>
      </Grid>
      <Stack spacing={2}>
        <Card maxHeight="100%">
          <MDTypography
            style={{
              fontSize: "1rem",
              variant: "h3",
              marginLeft: "2rem",
              fontWeight: 500,
              marginTop: "1rem",
            }}
          >
            Import Prospects
          </MDTypography>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            // sx={{ ml: "-2rem", mt: "-1rem" }}
          >
            <MDButton
              variant="outlined"
              component="label"
              sx={{
                // background: "#90CAF9",
                width: "30rem",
                height: "19rem",
                textAlign: "center",
                borderRadius: "0.25rem",
                border: "1px dashed rgba(0, 0, 0, 0.5)",
                pt: 2.75,
                mt: "5rem",
                mb: "3rem",
                ml: "5rem",
                // "&:hover": {
                //   background: "#90CAF9",
                // },
              }}
            >
              <MDBox display="flex" flexDirection="column">
                <Stack justifyContent="center" direction="row">
                  <CloudUploadIcon sx={{ width: "2rem", height: "6rem" }} />
                </Stack>
                <MDTypography sx={{ fontSize: "14px" }}>
                  <strong> Select a file or drag and drop here</strong>
                </MDTypography>
                <MDTypography sx={{ fontSize: "12px" }}>
                  All .csv, .xlsx, and .xls file types are supported.
                </MDTypography>
                <MDButton
                  variant="outlined"
                  size="medium"
                  component="label"
                  sx={{
                    textSize: "0.87rem",
                    borderRadius: "0.25rem",
                    borderColor: "#1976D2",
                    border: 1,
                    mt: "1rem",
                  }}
                >
                  Browse File
                  <input
                    type="file"
                    hidden
                    accept="image/bmp, image/jpeg, image/png, .pdf, .xls, .xlsx, .csv"
                    onChange={(e) => handleFileUpload(e, "fileName")}
                  />
                </MDButton>
              </MDBox>
            </MDButton>
            <MDTypography
              sx={{
                display: "flex",
                flexDirection: "row",
                ml: "11rem",
                fontSize: "12px",
                mt: "-2rem",
                fontWeight: 500,
              }}
            >
              {Crminfydto.ProspectDetailsJson.Documents[0].fileName !== ""
                ? Crminfydto.ProspectDetailsJson.Documents[0].fileName
                : null}{" "}
              {Crminfydto.ProspectDetailsJson.Documents[0].fileName !== "" ? (
                <MDTypography
                  style={{
                    textDecoration: "underline",
                    marginLeft: "5rem",
                    color: "#FF0000",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleDeleteFile(Crminfydto.ProspectDetailsJson.Documents[0].fileName)
                  }
                >
                  {" "}
                  remove{" "}
                </MDTypography>
              ) : null}
            </MDTypography>
            {upload === true && (
              <MDButton
                sx={{ borderRadius: "1px", ml: "17rem", mt: "1.2rem" }}
                onClick={handleModalUploadImportOpen}
              >
                Upload
              </MDButton>
            )}
            <MDTypography sx={{ fontSize: "0.7rem", ml: "11rem", mt: "1rem", color: "#FF0000" }}>
              If we find any duplicate contacts, we&apos;ll remove them for you.{" "}
            </MDTypography>
          </Grid>
          {/* <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            sx={{ ml: "-2rem", mt: "-1rem" }}
          >
            <MDTypography variant="h5" sx={{ fontSize: "0.9rem", ml: "43rem", mt: "-15rem" }}> */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h5" sx={{ fontSize: "0.9rem", ml: "51rem", mt: "-15rem" }}>
              Don&apos;t have a file ready?
            </MDTypography>
            {/* <MDTypography sx={{ fontSize: "0.7rem", ml: "40rem", mt: "1rem" }}> */}
            <MDTypography sx={{ fontSize: "0.7rem", ml: "48rem", mt: "1rem" }}>
              Download sample template and add your data to it,
            </MDTypography>
            {/* <MDTypography sx={{ fontSize: "0.7rem", ml: "41rem" }}> */}
            <MDTypography sx={{ fontSize: "0.7rem", ml: "49rem" }}>
              or apply the format to your own spreadsheet.
            </MDTypography>
            {/* <MDButton variant="outlined" sx={{ ml: "42rem", mt: "1rem", width: "auto" }}> */}
            <MDButton
              variant="outlined"
              sx={{ ml: "50rem", mt: "1rem" }}
              onClick={handleDownloadTemplate}
            >
              <DownloadIcon />
              Download Template
            </MDButton>
          </Grid>
        </Card>
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
    </MDBox>
  );
}
export default Leadsimport;
