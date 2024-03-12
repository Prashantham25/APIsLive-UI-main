import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Backdrop,
  Modal,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";

import Popover from "@mui/material/Popover";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
// import Submitted from "assets/images/BrokerPortal/Submitted.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { blue } from "@mui/material/colors";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
import MDInput from "components/MDInput";
import { getRequest, postRequest } from "core/clients/axiosclient";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";
// import profileimage from "../../../../../assets/images/BrokerPortal/ProfileImg.png";
// import MDAvatar from "../../../../../components/MDAvatar";
import { useDataController } from "../../../../../BrokerPortal/context";

function RejectModal({ open, handleOpen, handleClose, checkBox, handleCheckBox, onRejectClick }) {
  // const navigate = useNavigate();

  // const onClick = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList`);
  // };
  return (
    <div>
      <MDButton
        sx={{ color: "#F44336", fontSize: "0.8rem" }}
        color="white"
        justifyContent="flex-end"
        alignItems="flex-end"
        style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px" }}
        onClick={handleOpen}
      >
        Reject
      </MDButton>
      <Modal
        sx={{ ml: -20, mt: -10 }}
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox>
          <MDTypography id="modal-modal-description" sx={{ mt: 3 }}>
            <MDBox pt={20} pl={60}>
              <MDBox
                p={4}
                sx={{
                  background: "#FFFFFF",
                  height: "405px",
                  width: "834px",
                  borderRadius: "0px",
                }}
              >
                <Grid container spacing={1}>
                  <Grid xs={12} ml={5}>
                    <MDTypography fontSize="30px">Reason for Reject</MDTypography>
                  </Grid>
                  <Grid xs={12} ml={5} pt={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="Inadequate"
                          checked={checkBox.Inadequate}
                          onChange={(e) =>
                            handleCheckBox(e, "Inadequate or inappropriate information")
                          }
                        />
                      }
                      label="Inadequate or inappropriate information"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="Missingdocuments"
                          checked={checkBox.Missingdocuments}
                          onChange={(e) => handleCheckBox(e, "Missing documents")}
                        />
                      }
                      label="Missing documents"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="Incorrectbankdetails"
                          checked={checkBox.Incorrectbankdetails}
                          onChange={(e) => handleCheckBox(e, "Incorrect bank details")}
                        />
                      }
                      label="Incorrect bank details"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="InvalidEductation"
                          checked={checkBox.InvalidEductation}
                          onChange={(e) => handleCheckBox(e, "Invalid Eductation Qualification")}
                        />
                      }
                      label="Invalid Eductation Qualification"
                    />
                  </Grid>
                  <br />
                  <Grid xs={12} textAlign="right" mt={5}>
                    <MDButton onClick={handleClose} color="white">
                      Cancel
                    </MDButton>
                    &nbsp;&nbsp;
                    <MDButton
                      variant="contained"
                      style={{
                        backgroundColor: "#ff0000",
                      }}
                      onClick={onRejectClick}
                    >
                      {/* <BasicModal /> */}Reject
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </MDTypography>
        </MDBox>
      </Modal>
    </div>
  );
}

// function BasicModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const navigate = useNavigate();

//   const onClick = () => {
//     navigate(`/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList`);
//   };
//   return (
//     <div>
//       <MDButton
//         onClick={handleOpen}
//         variant="contained"
//         style={{
//           backgroundColor: "#ff0000",
//         }}
//       >
//         Reject
//       </MDButton>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <MDBox>
//           <MDTypography id="modal-modal-description" sx={{ mt: 3 }}>
//             <MDBox pt={20} pl={60}>
//               <MDBox
//                 p={4}
//                 sx={{
//                   background: "#FFFFFF",
//                   height: "405px",
//                   width: "700px",
//                   borderRadius: "0px",
//                 }}
//               >
//                 <Grid container spacing={1}>
//                   <MDAvatar
//                     src={Submitted}
//                     sx={{ width: 200, height: 200, mx: "15rem" }}
//                     variant="square"
//                   />
//                   <Grid xs={12} textAlign="center">
//                     <MDTypography font-family="Roboto" fontSize="30px">
//                       Submitted Successfully
//                     </MDTypography>
//                   </Grid>
//                   <br />
//                   <Grid xs={12} textAlign="center" mt={5}>
//                     <MDButton onClick={onClick}>Go To Applications</MDButton>
//                   </Grid>
//                 </Grid>
//               </MDBox>
//             </MDBox>
//           </MDTypography>
//         </MDBox>
//       </Modal>
//     </div>
//   );
// }

function AppReview({ handleNext, step }) {
  console.log("step", step);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [flags, setFlags] = React.useState(false);
  const [img, setImg] = useState([]);
  // const navigate = useNavigate();
  const [controller] = useDataController();
  const { appReviewResponse } = controller;
  const pospdetails = appReviewResponse.pospdetailsJson;
  console.log("pospdetailsemail", pospdetails);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [checkBox, setCheckBox] = useState({
    Inadequate: false,
    Missingdocuments: false,
    Incorrectbankdetails: false,
    InvalidEductation: false,
  });
  const [reasonForRejection, setReasonForRejection] = useState([]);

  // useEffect(() => {
  //   if (Object.keys(pospdetails || {} || null).includes("InterviewDetails")) {
  //     handleNextStep(1);
  //   }
  //   if (
  //     Object.keys(pospdetails || {} || null).includes("InterviewDetails") &&
  //     Object.keys(pospdetails || {} || null).includes("TrainingDetails") &&
  //     Object.values(pospdetails.InterviewDetails || {}).some(
  //       (x) => x.InterviewStatus.mValue === "Finished & Qualified"
  //     )
  //     // pospdetails.InterviewDetails.InterviewStatus.mValue === "Finished & Qualified"
  //   ) {
  //     handleNextStep(2);
  //   }
  // }, []);

  const handleCheckBox = (e, label) => {
    const newValue = { ...checkBox, [e.target.name]: e.target.checked };
    setCheckBox(newValue);
    if (e.target.checked === true) {
      setReasonForRejection([...reasonForRejection, label]);
    }
  };

  const onRejectClick = () => {
    console.log("1234567890", reasonForRejection);
    if (
      checkBox.Inadequate === false &&
      checkBox.Missingdocuments === false &&
      checkBox.Incorrectbankdetails === false &&
      checkBox.InvalidEductation === false
    ) {
      swal({
        icon: "warning",
        text: "Please select atleast one reason",
      });
    } else {
      const { pospdetailsJson } = appReviewResponse;
      pospdetailsJson.Status = "Rejected";
      const newValue = {
        ...pospdetailsJson,
        ReasonForRejection: reasonForRejection,
      };
      postRequest(`Partner/UpdatePOSPDetails`, newValue).then((result) => {
        if (result.data.status === 3) {
          navigate("/Agent/AgentApplications");
        }
        const rejectDTO = {
          proposalNo: "",
          policyNo: "pospdetails.EmailId",
          transactionId: "",
          customerId: "",
          key: appReviewResponse.pospdetailsJson.EmailId,
          keyType: "",
          communicationId: 116,
          referenceId: 58,
          ICPDF: true,
          ISDMS: false,
        };
        postRequest(
          `Policy/SendNotification?PolicyNumber=${""}&EmailId=${
            appReviewResponse.pospdetailsJson.EmailId
          }`,
          rejectDTO
        ).then((result1) => {
          console.log("result1", result1);
        });
      });
    }
  };
  useEffect(() => {
    if (appReviewResponse != null) {
      console.log("appReviewResponse", appReviewResponse.pospdetailsJson);
    }
  }, []);
  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.danger,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const theme = createTheme({
    status: {
      danger: blue[500],
    },
  });
  const [checkDisclaimer, setCheckDisclaimer] = useState(false);
  const handleCheckDisclaimer = () => {
    setCheckDisclaimer(!checkDisclaimer);
  };
  const [flag, setflag] = useState(false);
  const onClick = () => {
    if (checkDisclaimer === false) {
      setflag(false);
      swal({
        icon: "error",
        text: "Please check the CheckBox",
        button: "OK",
      });
      console.log("flag", flag);
    } else {
      const { pospdetailsJson } = appReviewResponse;
      pospdetailsJson.Status = "Interview";
      postRequest(`Partner/UpdatePOSPDetails`, pospdetailsJson).then((result) => {
        if (result.data.status === 3) {
          handleNext();
        }
      });
      setflag(true);
      setCheckDisclaimer(true);
    }
  };

  async function ViewFiles(fileName) {
    try {
      const ViewFileData = await getRequest(`DMS/GetDocumentById?id=${fileName}`);
      return ViewFileData;
    } catch (error) {
      return error;
    }
  }
  const generateFile = (content) => {
    console.log("content", content);

    const src = `data:application/img;base64,${content}`;
    setImg(src);
    setFlags(false);
  };

  const ViewAadharCard = async (event) => {
    if (img.length > 0) {
      setFlags(false);
    } else {
      setFlags(true);
    }

    setAnchorEl(event.currentTarget);

    await ViewFiles(appReviewResponse.pospdetailsJson.OtherDocsFront).then((result) => {
      console.log("viewDoc", result);

      if (result.data !== "") {
        generateFile(result.data.data, appReviewResponse.pospdetailsJson.OtherDocsFront);
      }
    });
  };
  const ViewAadharCardBack = async (event) => {
    // if (img.length > 0) {
    //   setFlags(false);
    // } else {
    //   setFlags(true);
    // }

    setAnchorEl(event.currentTarget);

    await ViewFiles(appReviewResponse.pospdetailsJson.OtherDocsBack).then((result) => {
      console.log("viewDoc", result);

      if (result.data !== "") {
        generateFile(result.data.data, appReviewResponse.pospdetailsJson.OtherDocsBack);
      }
    });
  };
  const ViewPANCard = async (event) => {
    if (img.length > 0) {
      setFlags(false);
    } else {
      setFlags(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetails.Pan).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, appReviewResponse.pospdetailsJson.Pan);
      }
    });
  };
  const ViewBankDetails = async (event) => {
    if (img.length > 0) {
      setFlags(false);
    } else {
      setFlags(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetails.BankDetails.BankDetails).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, pospdetails.BankDetails.BankDetails);
      }
    });
  };
  const flName = "FileName";
  const ViewEducationCertificate = async (event, index) => {
    if (img.length > 0) {
      setFlags(false);
    } else {
      setFlags(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetails.EducationDetails[index][flName]).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, pospdetails.EducationDetails[index][flName]);
      }
    });
  };

  // const handleCloses = () => {
  //   setFlags(false);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Grid container>
      <MDBox sx={{ mx: 7 }}>
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Personal Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {/* <MDBox justifyContent="center" alignItems="center">
                  <img src={profileimage} alt="my logo" />
                </MDBox> */}
                <MDBox
                  sx={{ width: "10rem", height: "10rem", clipPath: "circle(100%)", zIndex: -1 }}
                  src={
                    localStorage.getItem("ProfileImg") !== null
                      ? `data:image/jpeg;base64,${localStorage.getItem("ProfileImg")}`
                      : null
                  }
                  component="img"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Title"
                  name="Salutation"
                  value={pospdetails.mastersSelected.Salutation.mValue}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="First Name"
                  name="FirstName"
                  value={pospdetails.FirstName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput disabled label="Last Name" name="LastName" value={pospdetails.LastName} />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Marital Status"
                  name="MaritalStatus"
                  value={pospdetails.MaritalStatus}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Email Address"
                  name="EmailId"
                  value={pospdetails.EmailId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Mobile Number"
                  name="MobileNo"
                  value={pospdetails.MobileNo}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Date of Birth"
                  name="DOB"
                  value={pospdetails.DOB.slice(0, 10)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput disabled label="Age" name="Age" value={pospdetails.Age} />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Source Of Income"
                  name="SourceofIncome"
                  value={pospdetails.SourceofIncome}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput disabled label="Gender" name="Gender" value={pospdetails.Gender} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Communication Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: 0.87 }}>
              Permanent Address
            </MDTypography>

            <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="House No"
                  name="Address1"
                  value={pospdetails.PermanentAddress.Address1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Street"
                  name="Address2"
                  value={pospdetails.PermanentAddress.Address2}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Town"
                  name="Area"
                  value={pospdetails.PermanentAddress.Area}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="District"
                  name="District"
                  value={pospdetails.PermanentAddress.District}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="State"
                  name="State"
                  value={pospdetails.PermanentAddress.State}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Pincode"
                  name="Pincode"
                  value={pospdetails.PermanentAddress.Pincode}
                />
              </Grid>
            </Grid>

            <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
              <MDTypography sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}>
                Is Communication address same as Permanent address
              </MDTypography>

              <RadioGroup
                row
                name="PermAddressSameAsCommAddress"
                sx={{ justifyContent: "center", ml: 2.5 }}
              >
                <FormControlLabel
                  disabled
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                  checked={pospdetails.PermAddressSameAsCommAddress === "Yes"}
                />
                <FormControlLabel
                  disabled
                  value="No"
                  control={<Radio />}
                  label="No"
                  checked={pospdetails.PermAddressSameAsCommAddress === "No"}
                  name="PermAddressSameAsCommAddress"
                />
              </RadioGroup>
            </MDBox>

            <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: 0.87 }}>
              Communication Address
            </MDTypography>

            <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="House No"
                  name="Address1"
                  value={pospdetails.CommunicationAddress.Address1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Street"
                  name="Address2"
                  value={pospdetails.CommunicationAddress.Address2}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Town"
                  name="Area"
                  value={pospdetails.CommunicationAddress.Area}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="District"
                  name="District"
                  value={pospdetails.CommunicationAddress.District}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="State"
                  name="State"
                  value={pospdetails.CommunicationAddress.State}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Pincode"
                  name="Pincode"
                  value={pospdetails.CommunicationAddress.Pincode}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              KYC Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography>PAN Details</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput disabled label="PAN Number" name="PAN" value={pospdetails.PAN} />
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                <MDButton
                  variant="outlined"
                  color="info"
                  startIcon={<VisibilityIcon />}
                  onClick={ViewPANCard}
                >
                  View PAN Card
                </MDButton>
              </Grid>
              {Object.values(appReviewResponse.pospdetailsJson.OtherDocs || {}).every(
                (x) => x !== "" || x !== null
              ) && (
                <>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography> Other KYC Documents</MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDInput
                      disabled
                      label="Selected Document"
                      fullWidth
                      name="Aadhar"
                      value={appReviewResponse.pospdetailsJson.OtherDocs.mValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDInput
                      disabled
                      label={`${appReviewResponse.pospdetailsJson.OtherDocs.mValue} Number`}
                      fullWidth
                      name="OtherDocNumber"
                      value={appReviewResponse.pospdetailsJson.OtherDocNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDButton
                      variant="outlined"
                      color="info"
                      startIcon={<VisibilityIcon />}
                      onClick={ViewAadharCard}
                    >
                      View {`${appReviewResponse.pospdetailsJson.OtherDocs.mValue}`} Front
                    </MDButton>
                  </Grid>
                  {appReviewResponse.pospdetailsJson.OtherDocsBack !== "" && (
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDButton
                        variant="outlined"
                        color="info"
                        startIcon={<VisibilityIcon />}
                        onClick={ViewAadharCardBack}
                      >
                        View {`${appReviewResponse.pospdetailsJson.OtherDocs.mValue}`} Back
                      </MDButton>
                    </Grid>
                  )}
                </>
              )}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography>Education Details</MDTypography>
              </Grid>
              {pospdetails.EducationDetails.map((item, idx) => (
                <>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDInput
                      disabled
                      label="Name of the Qualification"
                      value={item.QualificationType.mValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDButton
                      variant="outlined"
                      color="info"
                      startIcon={<VisibilityIcon />}
                      onClick={(event) => {
                        ViewEducationCertificate(event, idx);
                      }}
                    >
                      View Certificate
                    </MDButton>
                  </Grid>
                </>
              ))}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography> Bank Details</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Bank Name"
                  name="BankName"
                  value={pospdetails.BankDetails.BankName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="Bank Account Number"
                  name="AccountNo"
                  value={pospdetails.BankDetails.AccountNo}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  disabled
                  label="IFSC Code"
                  name="IfscCode"
                  value={pospdetails.BankDetails.IfscCode}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDButton
                  variant="outlined"
                  color="info"
                  startIcon={<VisibilityIcon />}
                  onClick={ViewBankDetails}
                >
                  View Bank Document
                </MDButton>
              </Grid>
              <Backdrop
                sx={{ color: "#fff", zIndex: (themes) => themes.zIndex.drawer + 1 }}
                open={flags}
              >
                <CircularProgress />
              </Backdrop>
              <Popover
                open={open}
                onClick={handleClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
              >
                <MDBox width="700px" height="400px" component="img" src={img} />
              </Popover>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Grid mt="2.25rem" item display="flex" flexDirection="row" spacing={4}>
          <ThemeProvider theme={theme}>
            <CustomCheckbox
              sx={{ mb: "2.5rem" }}
              checked={checkDisclaimer}
              onChange={handleCheckDisclaimer}
            />
          </ThemeProvider>
          <MDTypography sx={{ mt: "0.3rem", fontSize: "0.87rem" }}>
            I have verified and validated all the details provided by the applicant and found them
            to be correct and valid.
          </MDTypography>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid color="white" mt={2}>
            <MDButton variant="text">
              <RejectModal
                open={openModal}
                handleOpen={handleOpen}
                handleClose={handleCloseModal}
                checkBox={checkBox}
                handleCheckBox={handleCheckBox}
                onRejectClick={onRejectClick}
              />
            </MDButton>
            <MDButton
              startIcon={<ArrowForwardIcon />}
              sx={{ fontSize: "0.8rem" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="contained"
              color="success"
              onClick={onClick}
            >
              Approve
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Grid>
  );
}

export default AppReview;
