import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import MDButton from "../../../../../../../components/MDButton";
import GirlImg from "../../../../../../../assets/images/BrokerPortal/GirlImg.png";
import { CreateCourseModule } from "../data/index";
import { getRequest, postRequest } from "../../../../../../../core/clients/axiosclient";
import { DeleteFile } from "../../../MyProfile/data/index";

function ExamDetails({
  handleBack,
  setExamDetails,
  examDetails,
  moduleDetails,
  CourseDetail,
  flags,
  setFlags,
}) {
  // const [flags, setFlag] = useState(false);
  const [regcert1, setRegCert1] = useState("");
  const handleExamDetails = (e) => {
    const newValue = { ...examDetails, [e.target.name]: e.target.value };
    setExamDetails(newValue);
  };
  const [upload, setUpload] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (
      examDetails.NoOfQuestions === "" ||
      examDetails.TotalMarks === "" ||
      examDetails.Percentage === "" ||
      upload === undefined
    ) {
      swal({
        icon: "error",
        text: "Please fill the Required fields",
      });

      setFlags(true);
    } else {
      const CourseDto = {
        ...CourseDetail,
        CourseDetails: { ModuleDetails: moduleDetails },
        ExamDetails: examDetails,
      };

      await CreateCourseModule(CourseDto).then((result) => {
        console.log("1234567890", result);
        // swal({
        //   icon: "success",
        //   text: "Course Assigned Successfully",
        // });
      });
      console.log("1234567890", CourseDto);
      setOpen(true);
    }
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/Admin/CoursesList");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    spacing: "2",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 2,
  };

  const handleQuestionUpload = async (e) => {
    console.log("1234567890", e.target.files[0]);
    const formData = new FormData();
    formData.append("Files", e.target.files[0]);
    formData.append("TemplateId", "100");
    setRegCert1(e.target.files[0].name);
    await postRequest(`ExcelUpload/Upload`, formData).then(async (res) => {
      //
      console.log("1234567", res);

      setUpload(res);
      const documentId = res.data.documentUploadId;
      await getRequest(`Questionnaries/UploadQuestions?DocumentId=${documentId}`).then((data) => {
        console.log(" 2", data);

        if (data.data === 1) {
          swal({
            icon: "success",
            text: "Questions Uploaded successfully",
          });
        } else if (res === null || res === "") {
          swal({
            icon: "error",
            text: "Question uploading failed",
          });
        }
      });
    });
  };
  console.log("dddd", upload);

  const handleDeleteFile = async (fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        setRegCert1();
      }
    });
  };

  return (
    <MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} spacing={4}>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.125rem" }}>
            Exam Details of {CourseDetail.CourseName}
            {/* POSP Non-life & Health Insurance */}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="No. of Questions"
            name="NoOfQuestions"
            onChange={handleExamDetails}
            value={examDetails.NoOfQuestions}
            required
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            error={examDetails.NoOfQuestions === "" ? flags : null}
          />
          {flags && examDetails.NoOfQuestions === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Total Marks"
            name="TotalMarks"
            onChange={handleExamDetails}
            value={examDetails.TotalMarks}
            required
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            error={examDetails.TotalMarks === "" ? flags : null}
          />
          {flags && examDetails.TotalMarks === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Percentage %"
            name="Percentage"
            onChange={handleExamDetails}
            value={examDetails.Percentage}
            required
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            error={examDetails.Percentage === "" ? flags : null}
          />
          {flags && examDetails.Percentage === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
          <MDTypography sx={{ fontSize: "1.125rem", Weight: "500" }}>Upload Questions</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDButton variant="contained" component="label">
            Upload
            <input hidden accept=".xlsx, .xls, .csv" type="file" onChange={handleQuestionUpload} />
          </MDButton>
          <MDTypography
            sx={{
              display: "flex",
              flexDirection: "row",
              ml: "110px",
              mt: "-30px",
              fontSize: "12px",
            }}
          >
            {regcert1 !== "" ? regcert1 : ""}{" "}
            {regcert1 != null && (
              <CancelIcon
                sx={{ ml: "2px" }}
                onClick={() => handleDeleteFile(regcert1)}
                color="primary"
              />
            )}
          </MDTypography>
        </Grid>
      </Grid>
      {/* <MDBox sx={{ mt: 8, ml: 95 }} justifyContent="right">
        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={3}>
              <MDBox sx={{ mt: 10, ml: 13 }} display="flex" justifyContent="space-between">
                <MDButton variant="outlined">SAVE</MDButton>
                &nbsp;&nbsp;
                <MDButton variant="contained">Upload Course</MDButton>
              </MDBox>
            </Stack>
          </Grid>
        </Grid>
      </MDBox> */}
      <MDBox>
        <Grid container direction="row">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox sx={{ mt: 10, ml: 1 }} display="flex" justifyContent="flex-start">
              {" "}
              <MDButton
                startIcon={<ArrowBackIcon />}
                variant="contained"
                // disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Previous
              </MDButton>{" "}
            </MDBox>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            {" "}
            <MDBox sx={{ mt: 10, ml: 13 }} display="flex" justifyContent="flex-end">
              <MDButton variant="outlined">SAVE</MDButton>
              &nbsp;&nbsp;
              <MDButton variant="contained" onClick={handleSubmit}>
                Upload Course
              </MDButton>
              <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <MDBox sx={style}>
                  <Stack spacing={2}>
                    <Stack justifyContent="right" direction="row" spacing={2}>
                      <MDButton color="white" round onClick={handleClose} textAlign="right">
                        x
                      </MDButton>
                    </Stack>
                    <Grid container justifyContent="center">
                      <MDBox
                        component="img"
                        src={GirlImg}
                        sx={{ width: "8.7rem", height: "12.3rem" }}
                      />
                    </Grid>
                    <MDTypography>You have successfully uploaded Course</MDTypography>
                    <MDTypography variant="h6" fontSize="1.1rem" color="primary">
                      {CourseDetail.CourseName}
                    </MDTypography>

                    <Grid container justifyContent="center">
                      <MDButton color="info" variant="contained" onClick={handleNavigate}>
                        Go to Courses
                      </MDButton>
                    </Grid>
                  </Stack>
                </MDBox>
              </Modal>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
export default ExamDetails;
