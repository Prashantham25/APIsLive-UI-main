import React, { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Chip, Modal } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
// import Submitted from "assets/images/BrokerPortal/Submitted.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import interviewschedule from "assets/images/BrokerPortal/interviewschedule.png";
// import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Add from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import swal from "sweetalert";
import { postRequest } from "core/clients/axiosclient";
import Autocomplete from "@mui/material/Autocomplete";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDButton from "../../../../../../components/MDButton";
// import MDAvatar from "../../../../../components/MDAvatar";
import { useDataController } from "../../../../../BrokerPortal/context";
import { AdminData } from "../data";

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
                          name="RejectedInterview"
                          checked={checkBox.RejectedInterview}
                          onChange={(e) =>
                            handleCheckBox(e, "Doesn't meet the expectation to qualify as a POSP")
                          }
                        />
                      }
                      label="Doesn't meet the expectation to qualify as a Agnent"
                    />
                    {/* <FormControlLabel
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
                    /> */}
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

function InterviewBox({
  interviewDetails,
  InterviewStatus,
  Interviewer,
  handleDate,
  handleTime,
  handleInterviewDetails,
  handleInterviewer,
  handleInterviewStatus,
  index,
  handleSheduleInterview,
  // scheduleDisable,
  // updateFlag,
  errorFlag,
}) {
  const InterViewStatus = Object.values(
    interviewDetails[index].InterviewStatus || {} || null
  ).every((x) => x !== "" || x !== null)
    ? interviewDetails[index].InterviewStatus.mValue
    : null;

  return (
    <MDBox p={2} mt={2} sx={{ background: "#daeff1" }} borderRadius={5}>
      <MDBox display="flex" flexDirection="row">
        <MDTypography>Interview Details</MDTypography>
        <Chip label={InterViewStatus} style={{ backgroundColor: "secondary", color: "#000000" }} />
      </MDBox>
      <Grid container spacing={2}>
        {/* <MDBox> */}
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Interview date"
              inputFormat="dd-MM-yyyy"
              type="login"
              id="InterviewDate"
              openTo="year"
              views={["year", "month", "day"]}
              value={interviewDetails[index].IDate}
              onClose={onclose}
              onChange={(date) => handleDate(date, "InterviewDate", index)}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  sx={{ width: "100%" }}
                  error={interviewDetails[index].IDate === null ? errorFlag : null}
                />
              )}
              disablePast
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {/* <MDInput
            label="Interview Time"
            type="time"
            name="InterviewTime"
            onChange={handleInterviewDetails}
            value={interviewDetails[index].InterviewTime}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Interview Time"
              id="InterviewTime"
              value={interviewDetails[index].ITime}
              type="time"
              onChange={(time) => handleTime(time, "InterviewTime", index)}
              renderInput={(params) => <MDInput {...params} sx={{ width: "100%" }} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            value={interviewDetails[index].Interviewer}
            id="Interviewer"
            options={Interviewer || []}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput label="Interviewer" {...params} variant="outlined" />}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            onChange={handleInterviewer}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            value={interviewDetails[index].InterviewStatus}
            id="InterviewStatus"
            options={InterviewStatus || []}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput label="Interview Status" {...params} variant="outlined" />
            )}
            disabled
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            onChange={handleInterviewStatus}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            id="AdditionalInfo"
            label="Additional Info"
            name="AdditionalInfo"
            onChange={handleInterviewDetails}
            value={interviewDetails[index].AdditionalInfo}
          />
        </Grid>
        {interviewDetails[index].flag ? (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              id="InterviewRemarks"
              label="Interview Remarks"
              name="InterviewRemarks"
              onChange={handleInterviewDetails}
              value={interviewDetails[index].InterviewRemarks}
              disabled
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDButton
              onClick={handleSheduleInterview}
              variant="contained"
              sx={{ backgroundColor: "#ED6C02" }}
              startIcon={<ArrowForwardIcon />}
              // disabled={scheduleDisable}
            >
              Schedule Interview
            </MDButton>
          </Grid>
        )}
        {/* {
          (interviewDetails[index].InterviewStatus.mValue === "Finished & Qualified" ||
            interviewDetails[index].InterviewStatus.mValue === "Finished & Rejected") && (
            // ? (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDButton
                onClick={handleSheduleInterview}
                variant="contained"
                sx={{ backgroundColor: "#ED6C02" }}
                // startIcon={<ArrowForwardIcon />}
              >
                Update Status
              </MDButton>
            </Grid>
          )
          // ) : null
        } */}
        {/* </MDBox> */}
      </Grid>
    </MDBox>
  );
}

function Interview({ handleNext }) {
  const navigate = useNavigate();
  const [controller] = useDataController();
  const { appReviewResponse } = controller;
  const pospdetails = appReviewResponse.pospdetailsJson;
  const interDetails = appReviewResponse.pospdetailsJson.InterviewDetails;
  console.log("yyy", pospdetails);
  const [interviewCount, setInterviewCount] = useState(
    interDetails === null || interDetails === undefined
      ? [
          {
            InterviewDate: null,
            InterviewTime: null,
            IDate: null,
            ITime: null,
            Interviewer: { mID: "", mValue: "" },
            // InterviewStatus: { mID: "", mValue: "" },
            InterviewStatus: { mID: "184", mValue: "Yet To Schedule" },
            AdditionalInfo: "",
            InterviewRemarks: "",
            flag: false,
            InterviewerEmail: "",
          },
        ]
      : interDetails
  );
  // const [arrayToFIll, setArrayToFill] = useState([0]);
  console.log(interviewCount);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [checkBox, setCheckBox] = useState({
    RejectedInterview: false,
    // Missingdocuments: false,
    // Incorrectbankdetails: false,
    // InvalidEductation: false,
  });
  const [reasonForRejection, setReasonForRejection] = useState([]);
  // const [updateFlag, setUpdateFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [proceedEnable, setProceedEnable] = useState(false);
  const handleCheckBox = (e, label) => {
    const newValue = { ...checkBox, [e.target.name]: e.target.checked };
    setCheckBox(newValue);
    if (e.target.checked === true) {
      setReasonForRejection([...reasonForRejection, label]);
    }
  };
  console.log("proceedEnable", proceedEnable);
  const onRejectClick = () => {
    console.log("1234567890", reasonForRejection);
    if (
      checkBox.RejectedInterview === false
      // checkBox.Missingdocuments === false &&
      // checkBox.Incorrectbankdetails === false &&
      // checkBox.InvalidEductation === false
    ) {
      swal({
        icon: "warning",
        text: "Please select the reason",
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

  const [disableSchedule, setDisableSchedule] = useState(true);
  // const [scheduleDisable, setscheduleDisable] = useState(false);

  const addInterview = () => {
    // setArrayToFill([...arrayToFIll, 0]);
    const interviewDetails = {
      InterviewDate: null,
      InterviewTime: null,
      IDate: null,
      ITime: null,
      Interviewer: { mID: "", mValue: "" },
      // InterviewStatus: { mID: "", mValue: "" },
      InterviewStatus: { mID: "184", mValue: "Yet To Schedule" },
      AdditionalInfo: "",
      InterviewRemarks: "",
      flag: false,
      InterviewerEmail: "",
    };

    setInterviewCount((prevState) => [
      ...prevState,
      {
        ...interviewDetails,
      },
    ]);

    // if (interviewCount.length === 1) {
    //   setdisableschedule(true);
    // }
  };

  useEffect(() => {
    if (interviewCount[interviewCount.length - 1].InterviewStatus.mValue === "Yet To Schedule") {
      setDisableSchedule(true);
    }
  }, [
    interviewCount,
    interviewCount[interviewCount.length - 1].InterviewStatus.mValue === "Yet To Schedule",
  ]);

  useEffect(() => {
    if (
      interviewCount[interviewCount.length - 1].InterviewStatus.mValue === "Finished & Qualified"
    ) {
      setProceedEnable(true);
    }
    if (
      interviewCount[interviewCount.length - 1].InterviewStatus.mValue === "Finished & Rejected"
    ) {
      setDisableSchedule(false);
    }
  }, []);

  const handleInterviewDetails = (event, index) => {
    const { id, value } = event.target;
    if (event.target.name === "AdditionalInfo") {
      const filteredData = { ...interviewCount[index] };
      filteredData[id] = value;
      interviewCount.splice(index, 1, { ...filteredData });
      setInterviewCount([...interviewCount]);
    }
    if (event.target.name === "InterviewRemarks") {
      const filteredData = { ...interviewCount[index] };
      filteredData[id] = value;
      interviewCount.splice(index, 1, { ...filteredData });
      setInterviewCount([...interviewCount]);
    }
  };

  const handleInterviewer = (event, value, index) => {
    const filteredData = { ...interviewCount[index] };
    filteredData.Interviewer = value;
    filteredData.InterviewerEmail = value.Email;
    interviewCount.splice(index, 1, { ...filteredData });
    setInterviewCount([...interviewCount]);
  };
  const handleInterviewStatus = (event, value, index) => {
    if (value !== null) {
      const filteredData = { ...interviewCount[index] };
      filteredData.InterviewStatus = value;
      interviewCount.splice(index, 1, { ...filteredData });
      setInterviewCount([...interviewCount]);
      // if (value.mValue === "Finished & Rejected" || value.mValue === "Finished & Qualified") {
      //   setUpdateFlag(true);
      // }
    }
  };
  // console.log("updateFlag", updateFlag);
  // const handleInterviewDetails = (event, index) => {
  //   const filteredData = { ...interviewCount[index] };
  //   filteredData[event.target.name] = event.target.value;
  //   interviewCount.splice(index, 1, { ...filteredData });
  //   setInterviewCount([...interviewCount]);
  // };

  // const formatTime = (time) => {
  //   const format = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(time);
  //   const newValue = `${format(dt.getHours())}:${format(dt.getMinutes())}`;
  //   return newValue;
  // };
  const formatTime = (time) => {
    // const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(time);
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let suffix = "AM";
    if (hours >= 12) {
      suffix = "PM";
      hours -= 12;
    }
    if (hours === 0) {
      hours = 12;
    }
    if (minutes < 10) {
      minutes = "0".concat(minutes.toString());
    }
    const newValue = hours.toString().concat(":", minutes.toString(), " ", suffix);
    // const newValue = `${format(dt.getHours())}:${format(dt.getMinutes())}:${suffix}`;
    return newValue;
  };
  // function formatTime() {
  //   const date = new Date();
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   let suffix = "AM";
  //   if (hours >= 12) {
  //     suffix = "PM";
  //     hours -= 12;
  //   }
  //   if (hours === 0) {
  //     hours = 12;
  //   }
  //   if (minutes < 10) {
  //     minutes += 0;
  //   }
  //   return hours + ":" + minutes + " " + suffix;
  // }
  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const handleDate = (value, label, index) => {
    // const date = new Date(value).getFullYear();
    // const dateString = date.toString().length;
    const today = new Date(value);

    if (
      value !== null
      // && dateString === 4
    ) {
      const filteredData = { ...interviewCount[index] };
      // filteredData[label] = new Date(value).toDateString();
      filteredData[label] = formatDate(today);
      filteredData.IDate = value;
      interviewCount.splice(index, 1, { ...filteredData });
      setInterviewCount([...interviewCount]);
    } else {
      const filteredData = { ...interviewCount[index] };
      filteredData[label] = value;
      // filteredData[label] = formatDate(today);
      interviewCount.splice(index, 1, { ...filteredData });
      setInterviewCount([...interviewCount]);
    }
  };

  const handleTime = (value, label, index) => {
    const filteredData = { ...interviewCount[index] };
    filteredData[label] = formatTime(value);
    filteredData.ITime = value;
    interviewCount.splice(index, 1, { ...filteredData });
    setInterviewCount([...interviewCount]);
  };

  const handleSheduleInterview = async (event, index) => {
    const filteredData = { ...interviewCount[index] };
    filteredData.flag = true;
    // interviewCount.splice(index, 1, { ...filteredData });
    if (
      interviewCount.some(
        (x) =>
          x.InterviewStatus.mValue === "" ||
          // x.InterviewTime === "" ||
          // x.InterviewDate === "" ||
          x.InterviewTime === null ||
          x.InterviewDate === null ||
          x.Interviewer.mValue === ""
      )
    ) {
      swal({
        icon: "error",
        text: "Error in Interview Scheduling Please Fill the interview Details",
        button: "OK",
      });
      setErrorFlag(true);
    } else {
      if (interviewCount.some((x) => x.InterviewStatus.mValue === "Yet To Schedule")) {
        filteredData.InterviewStatus = { mID: "185", mValue: "Pending" };
      }
      interviewCount.splice(index, 1, { ...filteredData });
      setInterviewCount([...interviewCount]);
      const newValue = {
        ...pospdetails,
        InterviewDetails: [...interviewCount],
      };

      // if (interviewCount.some((x) => x.InterviewStatus.mValue === "Finished & Qualified")) {
      //   setProceedEnable(true);
      // }
      await postRequest(`Partner/UpdatePOSPDetails`, newValue).then(async (data) => {
        if (data.data.status === 3) {
          let interviewDTO;
          if (interviewCount.some((x) => x.InterviewStatus.mValue === "Finished & Rejected")) {
            interviewDTO = {
              proposalNo: "",
              policyNo: "pospdetails.EmailId",
              transactionId: "",
              customerId: "",
              key: pospdetails.EmailId,
              keyType: "",
              communicationId: 112,
              referenceId: 58,
              ICPDF: true,
              ISDMS: false,
            };
          } else if (interviewCount.some((x) => x.InterviewStatus.mValue === "Pending")) {
            interviewDTO = {
              proposalNo: "",
              policyNo: "pospdetails.EmailId",
              transactionId: "",
              customerId: "",
              key: pospdetails.EmailId,
              keyType: "",
              communicationId: 112,
              referenceId: 58,
              ICPDF: true,
              ISDMS: false,
            };
          }
          postRequest(
            `Policy/SendNotification?PolicyNumber=${""}&EmailId=${pospdetails.EmailId}`,
            interviewDTO
          ).then((result) => {
            console.log("result1", result);
          });
          const interviewerDto = {
            proposalNo: "",
            policyNo: "pospdetails.EmailId",
            transactionId: "",
            customerId: "",
            key: pospdetails.EmailId,
            keyType: "",
            communicationId: 132,
            referenceId: 58,
            ICPDF: true,
            ISDMS: false,
          };
          postRequest(
            `Policy/SendNotification?PolicyNumber=${""}&EmailId=${
              interviewCount[interviewCount.length - 1].InterviewerEmail
            }`,
            interviewerDto
          ).then((result) => {
            console.log("result1", result);
          });
          if (interviewCount.some((x) => x.InterviewStatus.mValue === "Pending")) {
            swal({
              icon: interviewschedule,
              title: "Interview Scheduled successfully",
              text: "Details sent to Applicant",
              buttons: "Go to Applications",
            }).then(() => navigate(`/Agent/AgentApplications`));
          }
        } else {
          swal({ icon: "error", text: "Error in Interview Scheduling " });
        }
      });
      setErrorFlag(false);
    }
  };

  const onNext = () => {
    if (
      Object.keys(pospdetails || {} || null).includes("InterviewDetails") &&
      Object.values(pospdetails.InterviewDetails || {}).some(
        (x) => x.InterviewStatus.mValue === "Finished & Qualified"
      )
    ) {
      const { pospdetailsJson } = appReviewResponse;
      const newValue = {
        ...pospdetailsJson,
        Status: "Training",
      };
      postRequest(`Partner/UpdatePOSPDetails`, newValue).then((result) => {
        console.log("result", result);
        if (result.data.status === 3 && proceedEnable === true) {
          postRequest(`Partner/CreatePOSPUserAsync`, newValue);
          handleNext();
        }
      });
      // postRequest(`Partner/CreatePOSPUserAsync`,)
    }
  };
  const { InterviewStatus, Interviewer } = AdminData().admindetails.Masters;
  return (
    <MDBox pt={3}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.125rem" }}>
            Agent Basic Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                disabled
                label="Application No"
                name="ApplicationNo"
                defaultValue={appReviewResponse.applicationNo}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                disabled
                label="First Name"
                name="FirstName"
                defaultValue={pospdetails.FirstName}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput disabled label="Last Name" name="LastName" value={pospdetails.LastName} />
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
              <MDInput disabled label="Email Address" name="EmailId" value={pospdetails.EmailId} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                disabled
                label="Mobile Number"
                name="MobileNo"
                value={pospdetails.MobileNo}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded="true"
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={2}>
              <MDTypography variant="h4" sx={{ color: "#0071D9", fontSize: "1.125rem" }}>
                Interview Details
              </MDTypography>
            </Grid>
            {/* {interviewCount[interviewCount.length - 1].InterviewStatus ===
            "Finished & Qualified" ? ( */}
            {/* {scheduleDisable === true && ( */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={3}>
              <MDButton
                variant="outlined"
                onClick={addInterview}
                startIcon={<Add />}
                disabled={disableSchedule}
              >
                Schedule Interview
              </MDButton>
            </Grid>
            {/* )} */}
            {/* ) : null} */}
          </Grid>
          {interviewCount.map((item, index) => (
            <InterviewBox
              interviewDetails={interviewCount}
              InterviewStatus={InterviewStatus}
              Interviewer={Interviewer}
              handleInterviewDetails={(event) => handleInterviewDetails(event, index)}
              handleInterviewer={(event, value) => handleInterviewer(event, value, index)}
              handleInterviewStatus={(event, value) => handleInterviewStatus(event, value, index)}
              index={index}
              handleSheduleInterview={(event) => handleSheduleInterview(event, index)}
              handleDate={handleDate}
              handleTime={handleTime}
              // scheduleDisable={scheduleDisable}
              // updateFlag={updateFlag}
              errorFlag={errorFlag}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      <Grid
        sx={{ display: "flex", flexDirection: "row" }}
        mt={2}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Stack direction="row" spacing={0}>
          <MDButton
            sx={{ color: "#F44336", fontSize: "0.8rem" }}
            min-width="true"
            color="white"
            justifyContent="flex-end"
            alignItems="flex-end"
            style={{ maxWidth: "30px", maxHeight: "30px", minWidth: "30px" }}
          >
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
            sx={{ color: "#2E7D32", fontSize: "0.8rem" }}
            startIcon={<ArrowForwardIcon />}
            color="white"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            save
          </MDButton>
          {/* {proceedEnable ? ( */}
          <MDButton
            // sx={{ color: "#2E7D32", fontSize: "0.8rem" }}
            justifyContent="flex-end"
            alignItems="flex-end"
            variant="contained"
            onClick={onNext}
            disabled={proceedEnable === false}
          >
            Proceed
          </MDButton>
          {/* ) : null} */}
        </Stack>
      </Grid>
    </MDBox>
  );
}

export default Interview;
