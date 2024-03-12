import { useState, useRef } from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Input,
} from "@mui/material";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDDatePicker from "components/MDDatePicker";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { read, utils } from "xlsx";
import { postRequest } from "core/clients/axiosclient";
import { GetPartnerDetailsByMasterPolicyNumber } from "../data/APIs/NBTravelApi";

function BulkUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hideFlag, setHideFlag] = useState(false);
  // const [bulkUpload, setBulkUpload] = useState("");
  const Navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [dto, setdto] = useState({
    PartnerDetails: {
      PartnerName: "",
      PartnerCode: "",
      PolicyStartDate: "",
      PolicyEndDate: "",
      CdAccountBal: "",
      AccountNo: "",
    },
    BulkuploadRequest: {
      productCode: "GroupTravelV1",
      documentUploadId: "",
      status: "FamilyCreated",
      returnCount: "20",
    },
  });
  const displayFile = (file) => {
    setSelectedFile(file);
  };

  const BulpPolicyIssuance = async (DocId) => {
    dto.BulkuploadRequest.documentUploadId = DocId;
    setdto({ ...dto });
    const requestdata = dto.BulkuploadRequest;

    postRequest(`Policy/BulkUploadV2`, requestdata).then(async (res) => {
      console.log("1234567", res);
      // if (res.status === 200) {
      //   console.log(1111);
      // }
    });
    setTimeout(() => {
      if (DocId !== "") {
        Navigate("/COI/UploadStatus");
      }
    }, 5000);
  };
  const UploadDocument = async () => {
    const fileReader = await new FileReader();
    // const file = files.target.files[0];
    // console.log("fileReader", file);
    fileReader.onload = (e) => {
      // flag.backdropflag = true;
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let data = [];
      data = utils.sheet_to_json(ws);
      console.log("data", data);
    };
    console.log("filename", selectedFile);
    const formData = new FormData();
    formData.append("Files", selectedFile);
    formData.append("TemplateId", "154");
    await postRequest(`ExcelUpload/Upload`, formData).then(async (res) => {
      console.log("1234567", res);
      if (res.data.status === 1) {
        // swal.fire({
        //   icon: "success",
        //   html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%">
        //     <tr><td style={{textAlign:"left"}}><strong>Document Uploaded Successfully and Bulk Upload Initiated </strong></td></tr>
        //     <tr><td style={{textAlign:"left"}}><strong>Document ID:${res.data.documentUploadId}</strong></td></tr>
        //     <tr><td style={{textAlign:"left", fontSize:"1rem", width:"1rem"}}>Save the document ID for further reference</td></tr>
        //     </table></div>`,
        // });

        swal
          .fire({
            // title: "Do you want to save the changes?",
            icon: "success",
            html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%">
          <tr><td style={{textAlign:"left"}}><strong>Document Uploaded Successfully</strong></td></tr>
          <tr><td style={{textAlign:"left"}}><strong>Document ID:${res.data.documentUploadId}</strong></td></tr>
          <tr><td style={{textAlign:"left", fontSize:"1rem", width:"1rem"}}>Save the document ID for further reference</td></tr>
          </table></div>`,
            // showDenyButton: true,
            //  showCancelButton: true,
            confirmButtonText: "OK",
            // denyButtonText: `Don't save`
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              swal.fire({
                icon: "success",
                html: "Bulk Upload Initiated",
                showConfirmButton: false,
                timer: 1500,
              });
              BulpPolicyIssuance(res.data.documentUploadId);
            }
          });

        //   BulpPolicyIssuance(res.data.documentUploadId);
      } else {
        swal.fire({
          icon: "error",
          html: `<div style={{display:"flex",justifyContent:"center"}}><table width="100%">
          <tr><td style={{textAlign:"left"}}><strong>File Uploading Failed </strong></td></tr>
          </table></div>`,
        });
      }
      // if (res.data.documentUploadId !== "") {
      //   Navigate("/COI/UploadStatus");
      // }
    });
  };

  const handledownloadclick = async () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASEURL}/ExcelUpload/GetTemplateDetails?TemplateId=154`, {
      method: "GET",
      headers: {
        Authorization: token === "" ? process.env.REACT_APP_API_KEY : `Bearer ${token}`,
      },
    })
      .then((response1) => response1.blob())
      .then((newBlob) => {
        if (newBlob === null) {
          alert("Template Download Failed");
        } else {
          const url = window.URL.createObjectURL(newBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "FileName.xlsx";

          link.click();
        }
      });
  };

  const handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    displayFile(file);
  };

  const handleFileUpload = async (event) => {
    console.log("files", event.target.files[0]);
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    displayFile(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    // fileInputRef.current.value = null;
  };

  const handlechange = async (e) => {
    if (e.target.value != null) {
      dto.MasterPolicyNumber = e.target.value;
    }
  };
  const handleCustomInput = async (e) => {
    dto[e.target.name] = e.target.value;
    setdto({ ...dto });
    console.log(dto);
  };
  const handleSearchMP = async () => {
    if (dto.MasterPolicyNumber != null && dto.MasterPolicyNumber !== "") {
      await GetPartnerDetailsByMasterPolicyNumber(dto.MasterPolicyNumber).then((res) => {
        const Data = res;
        // setBulkUpload({ ...Data });

        console.log("fffffff", Data);
        if (Data !== "null") {
          // dto.PartnerDetails.PartnerName =
          //   Data.PolicyResponse.finalResult.PartnerDetails.partnerName;
          // dto.PartnerDetails.PartnerCode =
          //   Data.PolicyResponse.finalResult.PartnerDetails.partnerCode;
          // setdto({ ...dto });
        }
        if (Data.data.finalResult !== null) {
          dto.PartnerDetails.PartnerName = Data.data.finalResult.partnerName;
          dto.PartnerDetails.PartnerCode = Data.data.finalResult.partnercode;
          dto.PartnerDetails.PolicyStartDate = Data.data.finalResult.policyStartDate;
          dto.PartnerDetails.PolicyEndDate = Data.data.finalResult.policyEndDate;
          dto.PartnerDetails.AccountNo = Data.data.finalResult.accountNo;
          dto.PartnerDetails.CdAccountBal = Data.data.finalResult.cdAccountBal;

          setdto({ ...dto });
          setHideFlag(true);
        } else {
          dto.PartnerDetails.PartnerName = "";
          dto.PartnerDetails.PartnerCode = "";
          setHideFlag(false);
          swal.fire({
            icon: "error",
            text: `No data for this Master Policy Number `,
          });
        }
        console.log(dto);
      });
    } else {
      dto.PartnerDetails.PartnerName = "";
      dto.PartnerDetails.PartnerCode = "";
      setHideFlag(false);
      swal.fire({
        icon: "error",
        text: `Please Enter Master Policy Number`,
      });
    }
    // await GetPartnerDetailsByMasterPolicyNumber(e.target.value).then((res) => {
    //   const Data = res;
    //   if (Data !== "null") {
    //     // dto.PartnerDetails.PartnerName =
    //     //   Data.PolicyResponse.finalResult.PartnerDetails.partnerName;
    //     // dto.PartnerDetails.PartnerCode =
    //     //   Data.PolicyResponse.finalResult.PartnerDetails.partnerCode;
    //     // setdto({ ...dto });
    //   }
    //   console.log(Data);
    // });
  };
  // const onDateChanger = (e, date) => {
  //   dto.policyEndDate = date;
  //   setdto({ ...dto });
  // };
  const [expanded, setExpanded] = useState(true); // Set the initial state as expanded or collapsed

  const handleAccordionToggle = () => {
    setExpanded(!expanded); // Toggle the state between expanded and collapsed
  };

  return (
    <Grid mt={1}>
      <Grid p={1}>
        <MDTypography variant="h8" color="primary">
          BulkUpload
        </MDTypography>
      </Grid>
      {hideFlag === false ? (
        <Accordion expanded={expanded}>
          <AccordionSummary
            onClick={handleAccordionToggle}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <MDTypography variant="h6" color="primary">
              Plan Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                <MDInput
                  label="Master Policy Number"
                  name="MasterPolicyNumber"
                  value={dto.MasterPolicyNumber}
                  onChange={(e) => handleCustomInput(e)}
                  onBlur={(e) => handlechange(e)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                <MDInput
                  label="Partner Name"
                  name="ParterName"
                  value={dto.PartnerDetails.PartnerName}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                <MDInput
                  label="Partner Code"
                  name="PartnerCode"
                  value={dto.PartnerDetails.PartnerCode}
                  required
                  disabled
                />
              </Grid>
              <Grid item justifyContent="right" alignItems="center">
                <MDButton color="primary" onClick={handleSearchMP}>
                  Search
                </MDButton>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <Accordion expanded={expanded}>
            <AccordionSummary
              onClick={handleAccordionToggle}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <MDTypography variant="h6" color="primary">
                Plan Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                  <MDInput
                    label="Master Policy Number"
                    name="MasterPolicyNumber"
                    value={dto.MasterPolicyNumber}
                    onChange={(e) => handleCustomInput(e)}
                    onBlur={(e) => handlechange(e)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                  <MDInput
                    label="Partner Name"
                    name="ParterName"
                    value={dto.PartnerDetails.PartnerName}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                  <MDInput
                    label="Partner Code"
                    name="PartnerCode"
                    value={dto.PartnerDetails.PartnerName}
                    required
                    disabled
                  />
                </Grid>
                <Grid item justifyContent="right" alignItems="center">
                  <MDButton color="primary" onClick={handleSearchMP}>
                    Search
                  </MDButton>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded>
            <AccordionSummary
              onClick={handleAccordionToggle}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <MDTypography variant="h6" color="primary">
                Policy Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                  <MDInput
                    label="Partner Name"
                    name="ParterName"
                    value={dto.PartnerDetails.PartnerName}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                  <MDInput
                    label="Partner Code"
                    name="PartnerCode"
                    value={dto.PartnerDetails.PartnerName}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                  <MDDatePicker
                    input={{ label: "Policy Start Date" }}
                    fullWidth
                    value={dto.PartnerDetails.PolicyStartDate}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                  <MDDatePicker
                    input={{ label: "Policy End Date" }}
                    fullWidth
                    value={dto.PartnerDetails.PolicyEndDate}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                  <MDInput
                    label="CD Account Balance"
                    name="CDAccountBalance"
                    value={dto.PartnerDetails.CdAccountBal}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={4} xl={4} xxl={3}>
                  <MDInput
                    label="CD Account Number"
                    name="CDAccountNumber"
                    value={dto.PartnerDetails.AccountNo}
                    required
                    disabled
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <MDBox
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "auto",
              p: 2,
              border: "1px dashed grey",
            }}
          >
            <Stack spacing={2} justifyContent="center">
              <Typography variant="h5" color="error" component="span" align="center" gutterBottom>
                <CloudDoneOutlinedIcon fontSize="large" />
              </Typography>

              <Typography variant="h5" gutterBottom>
                {" "}
                Select a file or drag and drop here{" "}
              </Typography>

              <Typography
                variant="caption"
                display="block"
                gutterBottom
                // onChange={handleFileSelect}
              >
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

                      <ClearIcon variant="outlined" color="secondary" onClick={handleClearFile} />
                    </>
                  ) : (
                    <label htmlFor="file-upload">
                      <input
                        type="file"
                        id="file-upload"
                        hidden
                        accept="xls, .xlsx, .csv"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onChange={(e) => handleFileUpload(e, "fileName")}
                        style={{ display: "none" }}
                      />

                      <Input
                        type="file"
                        id="file-input"
                        inputRef={fileInputRef}
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                      />
                      <MDButton
                        variant="contained"
                        color="secondary"
                        component="label"
                        type="file"
                        id="fileInput"
                        htmlFor="file-input"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        // onClick={handleBrowse}
                        style={{
                          backgroundColor: "red",
                          color: "white",
                        }}
                      >
                        Browse
                      </MDButton>
                    </label>
                  )}
                </MDBox>
              </Grid>
              {!selectedFile && (
                <MDButton variant="text" color="error" onClick={handledownloadclick}>
                  Download Template
                </MDButton>
              )}
              {selectedFile && (
                <MDBox sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                  <MDButton
                    variant="contained"
                    color="success"
                    type="file"
                    id="fileInput"
                    onClick={UploadDocument}
                  >
                    Submit
                  </MDButton>
                </MDBox>
              )}
            </Stack>
          </MDBox>
        </>
      )}
    </Grid>
  );
}

export default BulkUpload;
