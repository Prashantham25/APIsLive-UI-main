import * as React from "react";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import PageLayout from "examples/LayoutContainers/PageLayout";
import Autocomplete from "@mui/material/Autocomplete";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import EastIcon from "@mui/icons-material/East";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Modal, Stack } from "@mui/material";
import interviewschedule from "assets/images/BrokerPortal/POSPAAdded.png";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import interviewschedule from "../../../../../assets/images/BrokerPortal/POSPAAdded.png";
import MDAvatar from "components/MDAvatar";
import swal from "sweetalert";
import { AdminData } from "./data/index";
import { useDataController } from "../../../context";
import { postRequest } from "../../../../../core/clients/axiosclient";

// const Istatus = [{ label: "Qualified" }, { label: "Pending" }, { label: "Rejected" }];

function BasicModal({ handleUpdatePOSPStatus, handleClose, onClick, open }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 726,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 4,
  };
  return (
    <div>
      <MDButton onClick={handleUpdatePOSPStatus}>
        <EastIcon />
        Update Status
      </MDButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          {/* <MDBox
            sx={{
              alignItems: "center",
              background: "#FFFFFF",
              height: "350px",
              width: "600px",
              justifyContent: "center",
              borderRadius: "0px",
            }}
          > */}
          <Stack justifyContent="right" direction="row">
            <MDButton color="white" onClick={handleClose} textAlign="right">
              x
            </MDButton>
          </Stack>
          <Grid container spacing={1} justifyContent="center">
            <MDAvatar
              src={interviewschedule}
              sx={{ width: "142px", height: "198px" }}
              variant="square"
            />
            <Grid xs={12} textAlign="center" mt={1}>
              <MDTypography font-family="Roboto" fontSize="28px">
                InterView Status Updated Succesfully.
              </MDTypography>
            </Grid>
            <br />
            <Grid xs={12} textAlign="center" mt={3}>
              <MDButton onClick={onClick} pb={90} variant="contained">
                View Interviews
              </MDButton>
            </Grid>
          </Grid>
          {/* </MDBox> */}
        </MDBox>
      </Modal>
    </div>
  );
}

function ApplicationUpdate({
  InterviewStaus,
  setInterviewstatus,
  InterviewRemarks,
  setInterviewRemarks,
  handleBack,
}) {
  const [controller] = useDataController();
  const { appReviewResponse } = controller;
  const [pospDetails, setPospDetails] = useState(appReviewResponse.pospdetailsJson);
  console.log("appReviewResponse", appReviewResponse);
  // const [InterviewStaus, setInterviewstatus] = useState({
  //   mID: "",
  //   mValue: "",
  // });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [enable, setEnable] = useState(true);
  console.log("enable", enable);

  const onClick = () => {
    navigate(`/modules/BrokerPortal/Pages/Admin/Interview/ApplicationList`);
  };

  // const [InterviewRemarks, setInterviewRemarks] = useState("");

  const { InterviewStatus } = AdminData().admindetails.Masters;

  const handleremarks = (event) => {
    setInterviewRemarks(event.target.value);
  };
  console.log("InterviewRemarks", InterviewRemarks);

  const handleInterviewStatus = (e, value) => {
    if (value !== null) {
      setInterviewstatus(value);
    } else {
      setInterviewstatus({ mID: "", mValue: "" });
    }
  };

  const handleUpdatePOSPStatus = async () => {
    if (
      Object.values(InterviewStaus || {}).every((x) => x === "" || x === null) ||
      InterviewRemarks === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      const { InterviewDetails } = pospDetails;
      InterviewDetails[InterviewDetails.length - 1].InterviewStatus = InterviewStaus;
      InterviewDetails[InterviewDetails.length - 1].InterviewRemarks = InterviewRemarks;
      InterviewDetails[InterviewDetails.length - 1].flag = true;
      setPospDetails((prevState) => ({ ...prevState, InterviewDetails }));
      await postRequest(`Partner/UpdatePOSPDetails`, pospDetails).then((data) => {
        console.log("123456789", data);
        if (data.data.status === 3) {
          setOpen(true);
        }
      });
    }
  };

  return (
    <MDBox sx={{ mx: 0 }}>
      <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
        Update Interview Status
      </MDTypography>
      <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "3px!important",
              },
            }}
            options={InterviewStatus || []}
            value={InterviewStaus}
            // getOptionLabel={(option) => option.mValue}
            getOptionLabel={(option) => {
              if (option.mValue === "Pending") {
                setEnable(false);
              }
              return option.mValue;
            }}
            getOptionDisabled={(option) => option.mValue === "Yet To Schedule"}
            onChange={handleInterviewStatus}
            renderInput={(params) => (
              <MDInput
                label="Interview Status"
                {...params}
                variant="outlined"
                required
                sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
              />
            )}
            disabled={enable}
          />
        </Grid>
      </Grid>
      <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDInput
            multiline
            id="InterviewRemarks"
            label="Remarks About Interview"
            name="InterviewRemarks"
            onChange={handleremarks}
            value={InterviewRemarks}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 7 }}>
        <Grid item justifyContent="flex-start">
          <MDButton color="primary" variant="outlined" onClick={handleBack}>
            <ArrowBackIcon />
            Previous
          </MDButton>
        </Grid>
        <Grid item justifyContent="flex-start">
          <MDButton color="flat" sx={{ ml: "600px" }}>
            <BasicModal
              handleUpdatePOSPStatus={handleUpdatePOSPStatus}
              handleClose={handleClose}
              handleOpen={handleOpen}
              open={open}
              onClick={onClick}
            />
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default ApplicationUpdate;
