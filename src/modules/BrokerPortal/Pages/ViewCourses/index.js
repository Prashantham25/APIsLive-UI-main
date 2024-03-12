import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
// import { postRequest } from "core/clients/axiosclient";
import MDBox from "../../../../components/MDBox";
import LifeInsuranceCourse from "../../../../assets/images/BrokerPortal/LifeInsuranceCourse.png";
import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton";
import CoursesData from "./data";
import { useDataController, setCourseBasedOnIndex } from "../../context";
import MDLinearProgressWithLabel from "../../../../components/MDLinerProgressWithLabel";
import { postRequest } from "../../../../core/clients/axiosclient";

function ViewCourse() {
  const [course, setCourse] = useState(CoursesData().CourseArray);
  if (!course) setCourse(1);
  const [controller, dispatch] = useDataController();
  const { courseList, POSPDetails } = controller;
  console.log("123456789", POSPDetails);
  const [pospdetails] = useState(POSPDetails);
  const [masterCourseList] = useState(courseList);
  const [courseFlag] = useState(pospdetails.pospdetailsJson.TrainingDetails);
  const courseIDArray = courseFlag.map((x) => x.CourseId);
  const CourseList = masterCourseList.filter((x) => courseIDArray.includes(x.courseId.toString()));
  console.log("wertyu", pospdetails, CourseList);
  console.log("CourseList", CourseList);
  const navigate = useNavigate();

  const onStartCourse = async (index) => {
    const courseListOnIndex = CourseList[index];
    setCourseBasedOnIndex(dispatch, courseListOnIndex);
    navigate("/modules/BrokerPortal/Pages/MyTrainings");
  };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    link.click();
  };

  const handleCertificateDownload = (courseID) => {
    const downloadDTO = {
      TemplateId: 134,
      ReportName: "POSPCertificateDownload",
      paramList: [
        {
          ParameterName: "ApplicationNo",
          ParameterValue: pospdetails.applicationNo,
        },
        {
          ParameterName: "courseID",
          ParameterValue: courseID,
        },
      ],
    };

    postRequest("Policy/GenerateByte64Array", downloadDTO).then((res) => {
      console.log("res", res);
      generateFile(res.data, "Certificate");
    });
  };

  // const handleDownloadCertClick = () => {
  //   const notificationReq = {
  //     notificationRequests: [
  //       {
  //         templateKey: "POSP_Certificate",
  //         sendEmail: false,
  //         isEmailBody: true,
  //         notificationPayload: JSON.stringify({
  //           Name: POSPDetails.pospdetailsJson.FirstName,
  //           Date: new Date().toLocaleDateString(),
  //         }),
  //       },
  //     ],
  //     sendEmail: true,
  //     subject: `Certificate`,
  //     toEmail: POSPDetails.pospdetailsJson.EmailId,
  //   };
  //   postRequest("Notifications/SendMultipleTemplateNotificationAsync", notificationReq);
  // };

  return (
    <PageLayout>
      <BPNavbar />
      <MDBox sx={{ mt: 10 }}>
        {CourseList.map((item, idx) => (
          <Card sx={{ borderRadius: "0.5rem", mx: 6, mt: 2 }}>
            <Grid container>
              <Grid item xs={12} sm={12} md={3} lg={2} xl={2} xxl={2}>
                <MDBox
                  sx={{ width: "8.7rem", height: "8.7rem", mx: 3, mt: 2 }}
                  component="img"
                  src={LifeInsuranceCourse}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                <MDBox sx={{ mt: 5 }}>
                  <MDTypography sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
                    {item.courseName}
                  </MDTypography>
                  <MDTypography sx={{ fontSize: "1rem", fontWeight: 400 }}>
                    Duration : {item.durationInHrs} hrs
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDBox sx={{ mt: 5, ml: 4 }}>
                  <MDTypography sx={{ fontSize: "1rem", fontWeight: 400 }}>
                    {courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                      .AttendedDuration === ""
                      ? "00:00:00"
                      : courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                          .AttendedDuration}
                    hrs finished of {item.durationInHrs}
                  </MDTypography>
                  {/* <MDBox display="flex" flexDirection="row"> */}
                  <MDLinearProgressWithLabel
                    progress={
                      courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                        .courseFlag === 0
                        ? 0
                        : courseFlag.filter(
                            (item1) => item1.CourseId === item.courseId.toString()
                          )[0].Progress
                    }
                    variant="contained"
                    sx={{ mt: 3, width: "100%" }}
                    label
                  />
                  {/* </MDBox> */}
                  <MDTypography sx={{ mt: 2 }}>
                    Deadline:
                    {/* {item.deadline} */}
                    {
                      courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                        .EndDate
                    }
                  </MDTypography>
                </MDBox>
              </Grid>
              <MDBox display="flex" flexDirection="row">
                <MDBox sx={{ mt: 7, ml: 6 }}>
                  {courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .courseFlag === true &&
                  courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .CourseCompleted === true &&
                  courseFlag
                    .filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .TestDetails.some((x) => x.TestStatus === "Pass") ? (
                    <MDButton
                      color="success"
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleCertificateDownload(item.courseId)}
                    >
                      Certificate
                    </MDButton>
                  ) : null}
                </MDBox>
                <MDBox sx={{ mt: 7, ml: 6 }}>
                  {courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .courseFlag === true &&
                  courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .CourseCompleted === true &&
                  courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .Progress >= 80 &&
                  courseFlag
                    .filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .TestDetails.every((x) => x.TestStatus === "Fail") ? (
                    <MDButton color="info" variant="contained" onClick={() => onStartCourse(idx)}>
                      View Course
                    </MDButton>
                  ) : null}
                </MDBox>
              </MDBox>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                <MDBox sx={{ mt: 7, ml: 6 }} alignItems="flex-end" justifyContent="flex-end">
                  {courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .courseFlag === false &&
                  courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .CourseCompleted === false &&
                  (courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                    .Progress === 0 ||
                    courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                      .AttendedDuration === "") ? (
                    <MDButton color="info" variant="contained" onClick={() => onStartCourse(idx)}>
                      Start Course
                    </MDButton>
                  ) : (
                    (courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                      .Progress !== 0 ||
                      courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                        .AttendedDuration !== "") &&
                    courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                      .courseFlag === true &&
                    courseFlag.filter((item1) => item1.CourseId === item.courseId.toString())[0]
                      .CourseCompleted === false && (
                      <MDButton color="info" variant="contained" onClick={() => onStartCourse(idx)}>
                        Continue Course
                      </MDButton>
                    )
                  )}
                </MDBox>
              </Grid>
            </Grid>
          </Card>
        ))}
      </MDBox>
    </PageLayout>
  );
}

export default ViewCourse;
