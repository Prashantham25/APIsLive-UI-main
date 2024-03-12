import React, { useState, useEffect } from "react";
import { postRequest, getRequest } from "core/clients/axiosclient";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MDAvatar from "components/MDAvatar";
import ClearIcon from "@mui/icons-material/Clear";
import CancelIcon from "@mui/icons-material/Cancel";
import TestResult from "assets/images/BrokerPortal/TestResult.png";
import Linksent from "assets/images/BrokerPortal/Linksent.PNG";
import { UploadFiles, DeleteFile, ProfileData } from "modules/BrokerPortal/Pages/CRM/data";
import MDTypography from "../../../../../../components/MDTypography";
import MDInput from "../../../../../../components/MDInput";
import MDBox from "../../../../../../components/MDBox";

import MDButton from "../../../../../../components/MDButton";

const {
  Card,
  Grid,
  Stack,
  Drawer,
  Autocomplete,
  CircularProgress,
  Modal,
} = require("@mui/material");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25rem",
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

function AddDocument({ handlemodalAddDocumentClose, handleclose, crmData, setCrmData, tempDoc }) {
  useEffect(() => {
    setCrmData({ ...crmData, Documents: [...crmData.Documents, tempDoc] });
  }, [tempDoc]);
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handlemodalAddDocumentClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <MDAvatar src={TestResult} sx={{ width: "100px", height: "100px" }} variant="square" />
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px">
              Document Added Succesfully.
            </MDTypography>
          </Grid>
          <br />
          <Grid xs={12} textAlign="center" mt={3}>
            <MDButton onClick={handleclose} pb={90} variant="contained">
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function DeleteDocument({
  handleModalDeleteDocumentClose,
  setmodalDeleteDocumentOpen,
  idx,
  crmData,
  setCrmData,
}) {
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [modalDeletedDocumentOpen, setmodalDeletedDocumentOpen] = useState(false);
  const handleModalDeletedDocumentOpen = () => {
    const newList = crmData.Documents.filter((obj, index) => index !== idx);
    // console.log("New list", newList);
    setCrmData({ ...crmData, Documents: newList });

    setmodalDeletedDocumentOpen(true);
  };
  const handleModalDeletedDocumentClose = () => {
    setmodalDeletedDocumentOpen(false);
    setmodalDeleteDocumentOpen(false);
  };
  const handleNo = () => {
    setmodalDeleteDocumentOpen(false);
  };

  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalDeleteDocumentClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px">
              Are you sure you want to delete this Document?
            </MDTypography>
          </Grid>
          <br />
          <Stack direction="row" justifyContent="space-between" p={1}>
            <MDBox style={{ marginTop: "1rem" }}>
              <MDButton
                sx={{
                  height: "auto",
                  width: "auto",
                  borderRadius: "4px",
                  color: "white",
                  // marginTop: "3rem",
                  // marginLeft: "-20rem",
                }}
                onClick={handleModalDeletedDocumentOpen}
              >
                Yes
              </MDButton>
              <MDButton
                variant="outlined"
                sx={{
                  height: "auto",
                  width: "auto",
                  borderRadius: "4px",
                  color: "white",
                  // marginTop: "-4.5rem",
                  marginLeft: "1rem",
                }}
                onClick={handleNo}
              >
                No
              </MDButton>
            </MDBox>
          </Stack>
        </Grid>
      </Grid>
      <MDBox>
        {loading ? (
          <Loading />
        ) : (
          <Modal
            open={modalDeletedDocumentOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DeletedDocument
              handleModalDeletedDocumentClose={handleModalDeletedDocumentClose}
              handleModalDeletedDocumentOpen={handleModalDeletedDocumentOpen}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}
              setmodalDeletedDocumentOpen={setmodalDeletedDocumentOpen}
            />
          </Modal>
        )}
      </MDBox>
    </MDBox>
  );
}

function DeletedDocument({ handleModalDeletedDocumentClose }) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalDeletedDocumentClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <MDAvatar src={Linksent} sx={{ width: "100px", height: "100px" }} variant="square" />
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px">
              Document Deleted
            </MDTypography>
          </Grid>
          <br />
          <Grid xs={12} textAlign="center" mt={3}>
            <MDButton onClick={handleModalDeletedDocumentClose} pb={90} variant="contained">
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function Documentss({ crmData, setCrmData }) {
  const [drawer, setDrawer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tempDoc, setTempDoc] = useState({
    DocumentType: "",
    fileName: "",
  });
  const handleDocuments = (e, value) => {
    setTempDoc({ ...tempDoc, DocumentType: value.mValue });
  };
  const [loading, setLoading] = useState(false);
  const [documentType, setdocumentType] = useState();
  console.log("documentType", documentType);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const handleDrawer = () => {
    // setPassId2(param.row.id);
    setDrawer(true);
  };
  const handleCloseDrawer = () => {
    setDrawer(false);
  };

  const [modalAddDocumentOpen, setmodalAddDocumentOpen] = useState(false);
  const handlemodalAddDocumentOpen = async () => {
    await postRequest(`Lead/CreateCRM`, crmData).then((res) => {
      setCrmData((prevState) => ({ ...prevState, ...crmData }));
      console.log("tasks", res.data);
    });
    setmodalAddDocumentOpen(true);
    // sedocUpload(true);
  };
  const handlemodalAddDocumentClose = () => {
    setmodalAddDocumentOpen(false);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleclose = () => {
    setmodalAddDocumentOpen(false);
    setDrawer(false);
  };
  const [modalDeleteDocumentOpen, setmodalDeleteDocumentOpen] = useState(false);
  const handleModalDeleteDocumentOpen = (index) => {
    setSelectedIndex(index);
    setmodalDeleteDocumentOpen(true);
  };
  const handleModalDeleteDocumentClose = () => {
    setmodalDeleteDocumentOpen(false);
  };
  // const handleDocument = (e) => {
  //   crmData.ProspectDetailsJson.Documents[0].DocumentType = e.target.value;
  //   setCrmData((prevState) => ({ ...prevState, ...crmData }));
  // };

  const UploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        setTempDoc({ ...tempDoc, fileName: result.data[0].fileName });
        // setCrmData((prevState) => ({ ...prevState, fileName: result.data[0].fileName }));
        console.log("Documentfile", result.data[0].fileName);
        setdocumentType(file);
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
        setTempDoc({ ...tempDoc, fileName: "" });
        console.log("jsonbindingdeleted", tempDoc);
        // }
      }
    });
  };

  const generateFile = (content, fileName) => {
    console.log("content", content); // here at console if i copy the code and use online tool(https://base64.guru/converter/decode/pdf) it shows the correct pdf
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    link.click();
  };

  const onDownloadClick = async (id) => {
    try {
      const result = await getRequest(`DMS/GetDocumentById?id=${id}`);
      console.log("ddddd", result);
      const data1 = result.data;
      const fileName = data1.fileName.concat(".", data1.fileExtension);
      if (data1.data !== "") {
        generateFile(data1.data, fileName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { Documents } = ProfileData().crmdetails.Masters;
  console.log("Documents", Documents);
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
      <Stack spacing={2}>
        <Stack justifyContent="right" direction="row">
          <MDButton startIcon={<AddIcon />} onClick={handleDrawer} style={{ marginRight: "8px" }}>
            ADD DOCUMENTS
          </MDButton>
          <Drawer
            anchor="right"
            open={drawer}
            onClose={handleCloseDrawer}
            PaperProps={{
              sx: { width: "50%", padding: "32px" },
            }}
          >
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MDTypography variant="h6" color="primary">
                  Add Document
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Stack justifyContent="right" direction="row">
                  <MDButton variant="text" onClick={handleCloseDrawer}>
                    X
                  </MDButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Autocomplete
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  // getOptionLabel={(option) => option.mValue}
                  name="DocumentType"
                  options={Documents}
                  onChange={handleDocuments}
                  // value={crmData.ProspectDetailsJson.Documents[0].DocumentType}
                  getOptionLabel={(option) => option.mValue}
                  // value={masterSelection.Documents}
                  renderInput={(params) => <MDInput {...params} label="Document Type" />}
                  // onClick={handleshow}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDButton
                  variant="contained"
                  component="label"
                  sx={{
                    background: "#90CAF9",
                    width: "30rem",
                    height: "15rem",
                    textAlign: "center",
                    borderRadius: "0.25rem",
                    border: "1px dashed rgba(0, 0, 0, 0.5)",
                    pt: 2.75,
                    mt: 1,
                    "&:hover": {
                      background: "#90CAF9",
                    },
                  }}
                >
                  {/* <input type="file" onChange={handleProfileChange} hidden accept="image/*" />	
                <MDAvatar className="avatar" src={profile.ProfileImage} size="lg" variant="square" /> */}
                  <MDBox display="flex" flexDirection="column">
                    {/* <Icon sx={{ width: "4rem", height: "4rem", fontSize: "4rem!important" }}>backup</Icon> */}
                    <Stack justifyContent="center" direction="row">
                      <CloudUploadIcon sx={{ width: "4rem", height: "10rem" }} />
                    </Stack>
                    <input
                      type="file"
                      hidden
                      accept="image/bmp, image/jpeg, image/png, .pdf"
                      onChange={(e) => handleFileUpload(e, "fileName")}
                    />
                    <MDTypography sx={{ fontSize: "14px" }}>
                      <strong> Select a file or drag and drop here</strong>
                    </MDTypography>
                    <MDTypography sx={{ fontSize: "12px" }}>
                      All .pdf, .doc, .jpeg and .png file types are supported.
                    </MDTypography>
                  </MDBox>
                </MDButton>
                <MDTypography
                  sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "12px" }}
                >
                  {tempDoc.fileName !== "" ? tempDoc.fileName : null}{" "}
                  {tempDoc.fileName !== "" ? (
                    <CancelIcon
                      sx={{ ml: "2px" }}
                      color="primary"
                      onClick={() => handleDeleteFile(tempDoc.fileName)}
                    />
                  ) : null}
                </MDTypography>
              </Grid>
              {/* {AddDocument === true && ( */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row">
                  <MDButton startIcon={<AddIcon />} onClick={handlemodalAddDocumentOpen}>
                    ADD DOCUMENTS
                  </MDButton>
                </Stack>
              </Grid>
              {/* )} */}
            </Grid>
          </Drawer>
        </Stack>
        {/* {docUpload === true && ( */}
        {crmData.Documents.map((obj, index) => (
          <Card
            sx={{
              bgcolor: "#DEEFFD",
              p: 2,
              borderRadius: "1px",
            }}
            style={{ height: "46px", marginLeft: "-6px", marginRight: "8px" }}
          >
            <Stack justifyContent="space-between" direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MDTypography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "black",
                    marginTop: "-2px",
                  }}
                >
                  <strong>{obj.DocumentType}</strong>
                </MDTypography>{" "}
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Stack
                  justifyContent="right"
                  direction="row"
                  spacing={2}
                  style={{ marginTop: "-8px" }}
                >
                  <MDButton
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => onDownloadClick(obj.fileName)}
                  >
                    DOWNLOAD
                  </MDButton>
                  <MDButton
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<HighlightOffIcon />}
                    onClick={() => handleModalDeleteDocumentOpen(index)}
                  >
                    DELETE
                  </MDButton>
                </Stack>
              </Grid>
            </Stack>
          </Card>
        ))}
      </Stack>
      <MDBox>
        {loading ? (
          <Loading />
        ) : (
          <Modal
            open={modalAddDocumentOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddDocument
              handlemodalAddDocumentClose={handlemodalAddDocumentClose}
              handleclose={handleclose}
              crmData={crmData}
              setCrmData={setCrmData}
              tempDoc={tempDoc}
            />
          </Modal>
        )}
      </MDBox>
      <MDBox>
        {loading ? (
          <Loading />
        ) : (
          <Modal
            open={modalDeleteDocumentOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DeleteDocument
              handleModalDeleteDocumentClose={handleModalDeleteDocumentClose}
              handleModalDeleteDocumentOpen={handleModalDeleteDocumentOpen}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}
              setmodalDeleteDocumentOpen={setmodalDeleteDocumentOpen}
              crmData={crmData}
              setCrmData={setCrmData}
              idx={selectedIndex}
            />
          </Modal>
        )}
      </MDBox>
    </Grid>
  );
}

export default Documentss;
