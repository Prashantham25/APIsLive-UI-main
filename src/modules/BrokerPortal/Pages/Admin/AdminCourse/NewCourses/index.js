import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import CourseDetails from "./CourseDetails";
import Modules from "./Modules";
import ExamDetails from "./ExamDetails";
import { getRequest } from "../../../../../../core/clients/axiosclient";

const steps = ["CourseDetails", "Modules", "Examination"];

function GetStepContent({
  step,
  handleNext,
  setCourseDetails,
  CourseDetail,
  setmoduleObject,
  moduleobject,
  setmoduleDetails,
  moduleDetails,
  handleBack,
  moduleUpload,
  setmoduleUpload,
  subModuleUpload,
  setsubModuleUpload,
  setExamDetails,
  examDetails,
  flags,
  setFlags,
}) {
  switch (step) {
    case 0:
      return (
        <CourseDetails
          CourseDetail={CourseDetail}
          setCourseDetails={setCourseDetails}
          handleNext={handleNext}
          flags={flags}
          setFlags={setFlags}
          setExamDetails={setExamDetails}
          examDetails={examDetails}
        />
      );
    case 1:
      return (
        <Modules
          handleNext={handleNext}
          CourseDetail={CourseDetail}
          setCourseDetails={setCourseDetails}
          setmoduleObject={setmoduleObject}
          moduleobject={moduleobject}
          setmoduleDetails={setmoduleDetails}
          moduleDetails={moduleDetails}
          moduleUpload={moduleUpload}
          setmoduleUpload={setmoduleUpload}
          subModuleUpload={subModuleUpload}
          setsubModuleUpload={setsubModuleUpload}
          handleBack={handleBack}
          flags={flags}
          setFlags={setFlags}
        />
      );
    case 2:
      return (
        <ExamDetails
          handleNext={handleNext}
          CourseDetail={CourseDetail}
          setCourseDetails={setCourseDetails}
          handleBack={handleBack}
          setExamDetails={setExamDetails}
          examDetails={examDetails}
          moduleDetails={moduleDetails}
          flags={flags}
          setFlags={setFlags}
        />
      );

    default:
      return "Unknown step"; // + { step };
  }
}

GetStepContent.defaultProps = {
  step: 0,
  handleNext: {},
};

GetStepContent.propTypes = {
  step: PropTypes.number,
  handleNext: PropTypes.func,
};
function HorizontalLinearStepper({
  stepPar,
  setCourseDetails,
  CourseDetail,
  setmoduleObject,
  moduleobject,
  setmoduleDetails,
  moduleDetails,
  setExamDetails,
  examDetails,
  moduleUpload,
  setmoduleUpload,
  subModuleUpload,
  setsubModuleUpload,
  flags,
  setFlags,
  // handleBack,
}) {
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <MDBox sx={{ width: "100%", px: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            // labelProps.optional = (
            //   // <MDTypography variant="caption">Optional</MDTypography>
            // );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} sx={{ flexDirection: "column" }}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          {/* <MDTypography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </MDTypography> */}
          <ExamDetails />
          <MDTypography sx={{ mt: 2, mb: 0 }}>
            Course uploaded successfully , want to create another course
          </MDTypography>
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDBox sx={{ flex: "1 1 auto" }} />
            <MDButton onClick={handleReset}>+AddCourse</MDButton>
          </MDBox>
        </>
      ) : (
        <>
          {/* <MDTypography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</MDTypography> */}
          <GetStepContent
            step={activeStep}
            handleNext={handleNext}
            CourseDetail={CourseDetail}
            setCourseDetails={setCourseDetails}
            setmoduleObject={setmoduleObject}
            moduleobject={moduleobject}
            setmoduleDetails={setmoduleDetails}
            moduleDetails={moduleDetails}
            handleBack={handleBack}
            setExamDetails={setExamDetails}
            moduleUpload={moduleUpload}
            setmoduleUpload={setmoduleUpload}
            subModuleUpload={subModuleUpload}
            setsubModuleUpload={setsubModuleUpload}
            examDetails={examDetails}
            flags={flags}
            setFlags={setFlags}
            // paymentDetails={paymentDetails}
          />
          {/* <MDButton color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </MDButton> */}
          {/* <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDButton
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Previous
            </MDButton> */}
          {/* <MDBox sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <MDButton color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </MDButton>
            )}

            <MDButton onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Proceed" : "Proceed"}
            </MDButton> */}
          {/* </MDBox> */}
        </>
      )}
    </MDBox>
  );
}

function NewCourses() {
  // const location = useLocation();
  // console.log("1234567890", location);
  // const [selectedCourseData] = useState(location.state !== null ? location.state.courseData : null);
  // console.log("wowertyuio", selectedCourseData);
  const [CourseDetail, setCourseDetails] = useState({
    CourseId: "",
    CourseName: "",
    CourseTimeDuration: "",
    CourseCommenceDate: null,
    CourseEndDate: null,
    CourseDeadline: null,
    NoofModules: "1",
    CourseDiscription: "",
    Assigne: "",
    TypeofCourse: "",
    LineofBusiness: "",
    MandatoryCourse: "",
    CourseCode: "",
    counter: 1,
    counterToShow: 1,
    intNoOfNewModules: 0,
    flag: false,
    Status: "Active",
  });

  const [moduleobject, setmoduleObject] = useState({
    disabled: true,
    defaultExpanded: false,
    ModuleName: "",
    ModuleDescription: "",
    TimeDuration: "",
    Type: "Module",
    SortOrder: 1,
    Duration: "",
    Material: [
      {
        StudyMaterial: "",
        Path: "",
        DocumentID: "",
        SortOrder: 1,
      },
    ],
    ModuleDetails: [
      {
        ModuleName: "",
        ModuleDescription: "",
        Content: "Content1",
        Type: "SubModule",
        SortOrder: 1,
        Material: [
          {
            StudyMaterial: "",
            Path: "",
            DocumentID: "",
            SortOrder: 1,
          },
        ],
      },
    ],
  });

  const [moduleUpload, setmoduleUpload] = useState();
  const [subModuleUpload, setsubModuleUpload] = useState();
  const [moduleDetails, setmoduleDetails] = useState([
    {
      disabled: true,
      defaultExpanded: false,
      ModuleName: "",
      ModuleDescription: "",
      TimeDuration: "",
      Type: "Module",
      SortOrder: 1,
      Duration: "",
      Material: [
        {
          StudyMaterial: "",
          Path: "",
          DocumentID: "",
          SortOrder: 1,
        },
      ],
      ModuleDetails: [
        {
          ModuleName: "",
          ModuleDescription: "",
          Content: "Content1",
          Type: "SubModule",
          SortOrder: 1,
          Material: [
            {
              StudyMaterial: "",
              Path: "",
              DocumentID: "",
              SortOrder: 1,
            },
          ],
        },
      ],
    },
  ]);

  const [examDetails, setExamDetails] = useState({
    NoOfQuestions: "",
    TotalMarks: "",
    Percentage: "",
  });
  const [flags, setFlags] = useState(false);

  // useEffect(() => {
  //   debugger;
  //   if (selectedCourseData !== null) {
  //     const courseDetailsData = CourseDetail;
  //     courseDetailsData.CourseCode = selectedCourseData.courseCode;
  //     courseDetailsData.CourseName = selectedCourseData.courseName;
  //     courseDetailsData.CourseTimeDuration = selectedCourseData.durationInHrs;
  //     courseDetailsData.CourseCommenceDate = selectedCourseData.startDate;
  //     courseDetailsData.CourseEndDate = selectedCourseData.endDate;
  //     courseDetailsData.CourseDeadline = selectedCourseData.deadline;
  //     courseDetailsData.NoofModules = selectedCourseData.noOfModules;
  //     courseDetailsData.CourseDiscription = selectedCourseData.courseDescription;
  //     courseDetailsData.Assigne = selectedCourseData.asignee;
  //     courseDetailsData.TypeofCourse = selectedCourseData.typeOfCourse;
  //     courseDetailsData.LineofBusiness = selectedCourseData.lob;
  //     courseDetailsData.MandatoryCourse = selectedCourseData.isMandatory;
  //     courseDetailsData.counter = selectedCourseData.noOfModules;
  //     setCourseDetails((prev) => ({
  //       ...prev,
  //       courseDetailsData,
  //     }));
  //     setmoduleDetails(selectedCourseData.courseDetails.ModuleDetails);
  //     setExamDetails(selectedCourseData.examDetails);
  //   }
  // }, [selectedCourseData !== null]);
  // && selectedCourseData !== null
  useEffect(() => {
    // debugger;
    if (CourseDetail.CourseCode === "") {
      const partnerID = "53";
      const productID = "449";
      getRequest(`Partner/GetCourseCode?partnerId=${partnerID}&productId=${productID}`).then(
        (result) => {
          console.log("result", result);
          if (result.status === 200) {
            const newValue = { ...CourseDetail, CourseCode: result.data };
            setCourseDetails(newValue);
          }
        }
      );
    }
  }, [CourseDetail.CourseCode === ""]);

  const { search } = useLocation();
  const step = new URLSearchParams(search).get("step");

  return (
    <MDBox>
      <Card>
        <HorizontalLinearStepper
          stepPar={step}
          CourseDetail={CourseDetail}
          setCourseDetails={setCourseDetails}
          setmoduleObject={setmoduleObject}
          moduleobject={moduleobject}
          setmoduleDetails={setmoduleDetails}
          setmoduleUpload={setmoduleUpload}
          moduleUpload={moduleUpload}
          subModuleUpload={subModuleUpload}
          setsubModuleUpload={setsubModuleUpload}
          moduleDetails={moduleDetails}
          setExamDetails={setExamDetails}
          examDetails={examDetails}
          flags={flags}
          setFlags={setFlags}
          // handleBack={handleBack}
        />
      </Card>
    </MDBox>
  );
}

export default NewCourses;
