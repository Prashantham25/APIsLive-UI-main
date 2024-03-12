import {
  Grid,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  // Popover,
  // CircularProgress,
  // Backdrop,
} from "@mui/material";
//  import { DatePicker } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { postRequest } from "core/clients/axiosclient";
// import MDDatePicker from "components/MDDatePicker";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
import MDInput from "../../../../../../components/MDInput";
import { AdminData } from "../data";
import { useDataController } from "../../../../../BrokerPortal/context";
// import { getRequest } from "../../../../../core/clients/axiosclient";

// setUserID,

function Training({ handleNext }) {
  const navigate = useNavigate();
  const [controller] = useDataController();
  const { appReviewResponse } = controller;
  const pospdetails = appReviewResponse.pospdetailsJson;
  const { TrainingDetails } = appReviewResponse.pospdetailsJson;
  const [training, setTraining] = useState(TrainingDetails == null ? [] : TrainingDetails);
  console.log("pospdetails", pospdetails);
  const handleAddCourse = () => {
    const obj = {
      CourseDet: { mId: "", mValue: "" },
      CourseId: "",
      StartDate: "",
      EndDate: "",
      StartDateFormated: null,
      EndDateFormated: null,
      AttendedDuration: "",
      Progress: 0,
      courseFlag: false,
      CourseCompleted: false,
      ModuleId: 0,
      SubModuleId: 0,
      CompletedModules: [],
      ModulesEnabled: [],
      TestDetails: [],
      DurationInHours: "",
      NoOfAttempts: 0,
    };

    setTraining((prevState) => [
      ...prevState,
      {
        ...obj,
      },
    ]);
  };
  console.log("training", training);

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };
  const handleDate = (value, label, index, type) => {
    // const date = new Date(value).getFullYear();
    // const dateString = date.toString().length;
    const today = new Date(value);
    if (value !== null) {
      const filteredData = { ...training[index] };
      // filteredData[label] = new Date(value).toDateString();
      filteredData[label] = formatDate(today);
      filteredData[type] = today;
      const dt = new Date(value);
      const date = dt.getDate();
      const month = dt.getMonth();
      let year = dt.getFullYear();
      if (month === 12) {
        year += 1;
      }
      const maximumDate = new Date(year, month, date + 30);
      filteredData.EndDateFormated = maximumDate;
      filteredData.EndDate = formatDate(maximumDate);
      console.log("222222222", maximumDate);
      training.splice(index, 1, { ...filteredData });
      setTraining([...training]);
    }
  };
  const handleCourseName = (event, values, index, name) => {
    console.log("values", values);
    const filteredData = { ...training[index] };
    if (values !== null) {
      filteredData[name] = values;
      if (name === "CourseDet") {
        // filteredData.DurationInHours = values.DurationInHrs;
        filteredData.DurationInHours = `${values.DurationInHrs.split(":")[0]} hours`;
        filteredData.CourseId = values.CourseID;
      }

      // filteredData.CourseDet = values;
      // filteredData.CourseId = values.mID;
      // filteredData.DurationInHours = `${values.DurationInHrs.split(":")[0]}hours`;
      // const StartDate = values.StartDate.split("T")[0];
      // const reverseStartDate = StartDate.split("-").reverse().join("-");
      // filteredData.StartDate = reverseStartDate;
      // const EndDate = values.EndDate.split("T")[0];
      // const reverseEndDate = EndDate.split("-").reverse().join("-");
      // filteredData.EndDate = reverseEndDate;

      training.splice(index, 1, { ...filteredData });
      setTraining([...training]);
    }
  };

  // const generateFile = (content, fileName) => {
  //   console.log("content", content); // here at console if i copy the code and use online tool(https://base64.guru/converter/decode/pdf) it shows the correct pdf
  //   // const blob = new Blob([content], { type: "application/pdf" });
  //   // console.log(blob);
  //   const src = `data:application/pdf;base64,${content}`;
  //   const link = document.createElement("a");
  //   link.href = src;
  //   link.download = fileName;
  //   link.click();
  // };
  // const generateFile = (content) => {
  //   debugger;
  //   console.log("content", content);
  //   const src = `data:application/pdf;base64,${content}`;
  //   const link = document.createElement("a");
  //   link.href = src;
  //   setImg(src);
  //   setFlags(false);
  //   // link.download = fileName;
  //   // link.click();
  // };

  // var base64 = "yourBase64StringVariable";

  const base64ToBlob = (b64Data, contentType) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    const sliceSize = 512;

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const handleCertificateDownload = (event, courseID) => {
    const downloadDTO = {
      TemplateId: 134,
      ReportName: "POSPCertificateDownload",
      paramList: [
        {
          ParameterName: "ApplicationNo",
          ParameterValue: appReviewResponse.applicationNo,
        },
        {
          ParameterName: "courseID",
          ParameterValue: courseID,
        },
      ],
    };

    postRequest("Policy/GenerateByte64Array", downloadDTO).then((res) => {
      console.log("res", res);
      // generateFile(res.data);
      const blob = base64ToBlob(res.data, "application/pdf");
      const url = URL.createObjectURL(blob);
      window.open(url);
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
  //           Name: appReviewResponse.pospdetailsJson.FirstName,
  //           Date: new Date().toLocaleDateString(),
  //         }),
  //       },
  //     ],
  //     sendEmail: true,
  //     subject: `Certificate`,
  //     toEmail: appReviewResponse.pospdetailsJson.EmailId,
  //   };
  //   postRequest("Notifications/SendMultipleTemplateNotificationAsync", notificationReq);
  // };

  const onProceed = async () => {
    if (
      training
        .map((item) => item.TestDetails.some((x) => x.TestStatus === "Pass"))
        .every((x) => x === true)
    ) {
      // await getRequest(`Partner/GetUserID?partnerId=${53}&productId=${449}`).then((result) => {
      //   console.log("result", result);
      //   if (result.status === 200) {
      //     setUserID(dispatch, result.data);
      //     // handleNext();
      //   }
      // });
      handleNext();
      // await getRequest(`Partner/GetAgentCode?partnerId=${53}&productId=${449}`).then((result) => {
      //   console.log("result", result);
      //   if (result.status === 200) {
      //     setAgentCode(dispatch, result.data);
      //   }
      // });
    } else {
      const newValue = {
        ...pospdetails,
        TrainingDetails: [...training],
      };
      await postRequest(`Partner/UpdatePOSPDetails`, newValue).then((data) => {
        if (data.data.status === 3) {
          const interviewDTO = {
            proposalNo: "",
            policyNo: "pospdetails.EmailId",
            transactionId: "",
            customerId: "",
            key: pospdetails.EmailId,
            keyType: "",
            communicationId: 113,
            referenceId: 58,
            ICPDF: true,
            ISDMS: false,
          };
          postRequest(
            `Policy/SendNotification?PolicyNumber=${""}&EmailId=${pospdetails.EmailId}`,
            interviewDTO
          ).then((result) => {
            console.log("result1", result);
          });
          swal({
            icon: "success",
            title: "Course assigned successfully",
            text: "Details sent to Applicant",
            buttons: "Go to Applications",
          }).then(() => navigate(`/Agent/AgentApplications`));
        } else {
          swal({ icon: "error", text: "Error in Interview Scheduling " });
        }
      });
    }
  };

  const { Course } = AdminData().admindetails.Masters;
  console.log("Course", Course);
  return (
    <MDBox p={3}>
      {/* {flags && (
        <iframe
          width="100%"
          height="1000%"
          type="application/pdf"
          src="C:/Users/sindhu/Downloads/POSPCertificate.pdf"
        ></iframe>
      )} */}
      <Stack justifyContent="space-between" direction="row">
        <Grid>
          <MDTypography
            sx={{
              color: "#98AFC7%",
            }}
          >
            Agent Training Details
          </MDTypography>
        </Grid>
        <Grid>
          <MDButton variant="outlined" startIcon={<AddIcon />} onClick={handleAddCourse}>
            Add Course
          </MDButton>
        </Grid>
      </Stack>
      <MDBox mt={2}>
        {training.map((item, index) => (
          <Accordion
            defaultExpanded
            disableGutters
            sx={{
              backgroundColor: "#D4EBFF",
              boxShadow: "unset",
              border: "unset",
              borderRadius: "15px",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h1" sx={{ color: "#000000", fontSize: "1.125rem" }}>
                {Object.values(item.CourseDet || {} || null).every((x) => x === "")
                  ? "Course Name"
                  : item.CourseDet.mValue}
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2}>
                <Grid item sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <Autocomplete
                    onChange={(event, values) =>
                      handleCourseName(event, values, index, "CourseDet")
                    }
                    value={item.CourseDet}
                    options={Course}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => <MDInput label="Course Name" {...params} />}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={12} lg={3} xl={3} xxl={3}>
                  {/* <MDInput fullWidth label="Start date" value={item.StartDate} /> */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      disablePast
                      label="Start date"
                      inputFormat="dd-MM-yyyy"
                      type="login"
                      id="StartDate"
                      name="StartDate"
                      openTo="year"
                      views={["year", "month", "day"]}
                      value={item.StartDateFormated}
                      // onChange={(event, values) =>
                      //   handleCourseName(event, values, index, "StartDate")
                      // }

                      onChange={(date) => handleDate(date, "StartDate", index, "StartDateFormated")}
                      renderInput={(params) => <MDInput {...params} sx={{ width: "100%" }} />}
                    />
                  </LocalizationProvider>
                  {/* <MDDatePicker
                    fullWidth
                    name="StartDate"
                    options={{
                      dateFormat: "Y-m-d",
                      altFormat: "d-m-Y",
                      altInput: true,

                      // maxDate: new Date(),
                    }}
                    input={{
                      label: "Start date",
                      value: item.StartDate,
                    }}
                    onChange={(event, values) =>
                      handleCourseName(event, values, index, "StartDate")
                    }
                  /> */}
                </Grid>
                <Grid item sm={12} md={12} lg={3} xl={3} xxl={3}>
                  {/* <MDInput fullWidth label="End date" value={item.EndDate} /> */}
                  {/* <MDDatePicker
                    fullWidth
                    name="EndDate"
                    options={{
                      dateFormat: "Y-m-d",
                      altFormat: "d-m-Y",
                      altInput: true,

                      // maxDate: new Date(),
                    }}
                    input={{
                      label: "End date",
                      value: item.EndDate,
                    }}
                    onChange={(event, values) => handleCourseName(event, values, index, "EndDate")}
                  /> */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      disabled
                      label="End date"
                      inputFormat="dd-MM-yyyy"
                      type="login"
                      id="EndDate"
                      name="EndDate"
                      openTo="year"
                      views={["year", "month", "day"]}
                      value={item.EndDateFormated}
                      // onChange={(event, values, date) =>
                      //   handleCourseName(event, date, values, index, "EndDate")
                      // }
                      // onChange={(date) => handleDate(date, "EndDate", index, "EndDateFormated")}
                      renderInput={(params) => (
                        <MDInput {...params} sx={{ width: "100%" }} disabled />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={12} md={12} lg={3} xl={3} xxl={3}>
                  <MDInput label="Duration" value={item.DurationInHours} />
                </Grid>
                {item.NoOfAttempts !== 0 && item.TestDetails.length > 0 && (
                  <>
                    {item.TestDetails.map((item1, idx) => (
                      <>
                        <Grid item sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDTypography
                            variant="h6"
                            sx={{ color: "#000000", fontSize: "0.875rem" }}
                          >
                            Attempt {idx + 1}
                          </MDTypography>
                        </Grid>
                        <Grid item sm={12} md={12} lg={3} xl={3} xxl={3}>
                          <MDInput fullWidth label="Test taken date" value={item1.TestDate} />
                        </Grid>
                        <Grid item sm={12} md={12} lg={3} xl={3} xxl={3}>
                          <MDInput label="Percentage scored" value={item1.PercentageScored} />
                        </Grid>
                        {item1.TestStatus === "Pass" && (
                          <Grid item sm={12} md={12} lg={3} xl={3} xxl={3}>
                            <MDButton
                              variant="contained"
                              startIcon={<DownloadIcon />}
                              onClick={(e) =>
                                handleCertificateDownload(e, Number(item.CourseDet.CourseID))
                              }
                            >
                              CERTIFICATE
                            </MDButton>
                          </Grid>
                        )}
                      </>
                    ))}
                  </>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </MDBox>
      <MDBox mt={2}>
        <Stack justifyContent="right" direction="row" spacing={4}>
          <MDButton color="success" variant="outlined" startIcon={<ArrowForwardIcon />}>
            SAVE
          </MDButton>
          <MDButton
            color="success"
            variant="contained"
            startIcon={<ArrowForwardIcon />}
            onClick={onProceed}
          >
            Assign
          </MDButton>
        </Stack>
      </MDBox>
    </MDBox>
  );
}

export default Training;
