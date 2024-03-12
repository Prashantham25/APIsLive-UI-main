import { Grid } from "@mui/material";
import chunk from "lodash.chunk";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { getRequest } from "core/clients/axiosclient";
import Question from "./Question";
import QuestionareSidebar from "./QuestionareSidebar";
import TopBar from "./TopBar";
import TestTimer from "./TestTimer";
import Result from "./Result";
import { useDataController } from "../../context";
import { postRequest } from "../../../../core/clients/axiosclient";

function POSPTest({ toggleDrawer }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [questionCount, setQuestionsCount] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionSidebarCount, setQuestionSidebarCount] = useState([]);
  const [disablePrev, setDisablePrevious] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [counter, setCounter] = useState(3600);
  const [displaySubmit, setDisplaySubmit] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [controller] = useDataController();
  const [quesAns, setQuesAns] = useState([]);
  const { CourseBasedOnIndex, POSPDetails } = controller;
  const [trainingDetails, setTrainingDetails] = useState(POSPDetails);
  const [testResult, setTestResult] = useState({});
  const [isSuccess, setIsSucceess] = useState(false);
  console.log("123790", POSPDetails.pospdetailsJson.TrainingDetails, CourseBasedOnIndex);
  // useEffect
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }

    if (counter === 0) {
      setDisplaySubmit(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  useEffect(async () => {
    let Type;
    let NoOfQuestions;
    if (CourseBasedOnIndex !== null) {
      Type = CourseBasedOnIndex.lob;
      NoOfQuestions = Number(CourseBasedOnIndex.examDetails.NoOfQuestions);
      console.log("Type", Type);
    }
    const responsedata = await getRequest(
      `Questionnaries/GetQuestionnaire?id=4&subType=${Type}&NoOfQuestions=${NoOfQuestions}`
    );
    const { data } = responsedata;
    const newQuestions = data.map((quest) => {
      const newOptions = chunk(quest.AdditionalDetails.MultiOption, 2);
      const questionObj = {
        ...quest,
        AdditionalDetails: {
          MultiOption: [...newOptions],
        },
      };
      return questionObj;
    });
    setQuestions(newQuestions);
    setQuestionsCount(data.length);
    const testArr = [...Array.from(Array(data.length).keys())];
    const newArr = chunk([...testArr], 6);
    const answerArr = [...testArr].fill(null, 0, data.length);
    setQuestionSidebarCount(newArr);
    setAnswers(answerArr);
  }, []);

  useEffect(() => {
    if (questionNumber > 0) setDisablePrevious(false);
    else setDisablePrevious(true);

    if (questionNumber + 1 === questionCount) setDisableNext(true);
    else setDisableNext(false);
  }, [questionNumber]);

  const handleSkip = () => {
    answers[questionNumber] = -1;
    setAnswers([...answers]);
    setQuestionNumber((prevState) => prevState + 1);
  };

  const handleNext = () => {
    setQuestionNumber((prevState) => prevState + 1);
  };

  const handlePrevious = () => {
    setQuestionNumber((prevState) => prevState - 1);
  };

  const handleAnswer = (id) => {
    if (!displaySubmit) {
      answers[questionNumber] = answers[questionNumber] === id ? null : id;
      // console.log("Answer", answers);
      setAnswers([...answers]);
      const QuesId = questions[questionNumber] ? questions[questionNumber].QId : null;
      const obj = {
        QuestionId: QuesId,
        Answer: id,
      };
      setQuesAns([...quesAns, obj]);
    }
  };

  const handleQuestionClick = (id) => {
    if (!displaySubmit) setQuestionNumber(id);
  };

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

  const handleCertificateDownload = () => {
    const downloadDTO = {
      TemplateId: 134,
      ReportName: "POSPCertificateDownload",
      paramList: [
        {
          ParameterName: "ApplicationNo",
          ParameterValue: POSPDetails.applicationNo,
        },
        {
          ParameterName: "courseID",
          ParameterValue: CourseBasedOnIndex.courseId,
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

  const handleViewCourseClick = () => {
    navigate("/modules/BrokerPortal/Pages/ViewCourse");
  };

  const handleDownloadCertificate = () => {
    const downloadDto = {
      TemplateId: 138,
      ReportName: "POSPCertificateDownload",
      paramList: [
        {
          ParameterName: "ApplicationNo",
          ParameterValue: POSPDetails.applicationNo,
        },
        {
          ParameterName: "courseID",
          ParameterValue: CourseBasedOnIndex.courseId,
        },
      ],
      RefrenceId: "58",
      KeyValue: "",
      CommunicationId: "139",
      Key: POSPDetails.pospdetailsJson.EmailId,
    };
    postRequest(
      `Policy/SendDynamicNotifications?emailId= ${POSPDetails.pospdetailsJson.EmailId}`,
      downloadDto
    );
  };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    link.click();
  };

  const handleCertificateDownloadClick = () => {
    const downloadDTO = {
      TemplateId: 134,
      ReportName: "POSPCertificateDownload",
      paramList: [
        {
          ParameterName: "ApplicationNo",
          ParameterValue: POSPDetails.applicationNo,
        },
        {
          ParameterName: "courseID",
          ParameterValue: CourseBasedOnIndex.courseId,
        },
      ],
    };

    postRequest("Policy/GenerateByte64Array", downloadDTO).then((res) => {
      console.log("res", res);
      generateFile(res.data, "Certificate");
    });
  };

  const handleSubmit = () => {
    console.log("quesAns", quesAns, answers);
    if (answers.includes(-1) || answers.includes(null)) {
      setShowResult(false);
      swal({
        icon: "warning",
        text: "Please attend all the 50 questions",
      });
    } else {
      let Type;
      let Percentage;
      if (CourseBasedOnIndex !== null) {
        Type = CourseBasedOnIndex.lob;
        Percentage = Number(CourseBasedOnIndex.examDetails.Percentage.split("%")[0]);
        console.log("Type", Type);
      }
      postRequest(
        `Questionnaries/CalculateMarks?id=4&subType=${Type}&Percentage=${Percentage}`,
        quesAns
      ).then(async (result) => {
        console.log("result", result);
        if (result.data.status === 1) {
          setTestResult(result.data);
          if (result.data.testStatus === "Pass") {
            setIsSucceess(false);
            await handleDownloadCertificate();
          } else setIsSucceess(true);

          if (testResult !== null) setShowResult(true);
          else setShowResult(false);
          const { pospdetailsJson } = trainingDetails;
          POSPDetails.pospdetailsJson.TrainingDetails.map((item, idx) => {
            const todaysDate = new Date();
            const splitDate = item.EndDate.split("-");
            const endDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
            todaysDate.setHours(0, 0, 0, 0);
            if (todaysDate <= endDate) {
              const Obj = {
                TestDate: new Date().toLocaleDateString(),
                PercentageScored: result.data.percentage,
                TestStatus: result.data.testStatus,
              };
              if (item.CourseId === CourseBasedOnIndex.courseId.toString()) {
                const { TestDetails } = POSPDetails.pospdetailsJson.TrainingDetails[idx];
                let { NoOfAttempts } = POSPDetails.pospdetailsJson.TrainingDetails[idx];
                let { CourseCompleted } = POSPDetails.pospdetailsJson.TrainingDetails[idx];
                if (NoOfAttempts === 0 && TestDetails.length === 0) {
                  NoOfAttempts += 1;
                  TestDetails.splice(0, 1, { ...Obj });
                  console.log("1234567890", TestDetails);
                } else if (NoOfAttempts > 0 && TestDetails.some((x) => x.TestStatus === "Fail")) {
                  NoOfAttempts += 1;
                  TestDetails.splice(TestDetails.length, 1, { ...Obj });
                  console.log("1234567890", TestDetails);
                }
                CourseCompleted = true;
                pospdetailsJson.TrainingDetails[idx].TestDetails = TestDetails;
                pospdetailsJson.TrainingDetails[idx].NoOfAttempts = NoOfAttempts;
                pospdetailsJson.TrainingDetails[idx].CourseCompleted = CourseCompleted;
                setTrainingDetails((prevState) => ({ ...prevState, pospdetailsJson }));
                postRequest(`Partner/UpdatePOSPDetails`, pospdetailsJson).then((data) => {
                  console.log("123456789", data);
                });
              }
            } else {
              const notificationData = {
                proposalNo: "",
                policyNo: POSPDetails.pospdetailsJson.EmailId,
                transactionId: "",
                customerId: "",
                key: POSPDetails.pospdetailsJson.EmailId,
                keyType: "",
                communicationId: 115,
                referenceId: 58,
                ICPDF: true,
                ISDMS: false,
              };
              postRequest(
                `Policy/SendNotification?PolicyNumber=${POSPDetails.pospdetailsJson.EmailId}&EmailId="POSPDetails.pospdetailsJson.EmailId"`,
                notificationData
              ).then((res) => {
                console.log("result1", res);
              });
            }
            return true;
          });
        }
      });
    }
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <TopBar toggleDrawer={toggleDrawer} courseName={CourseBasedOnIndex.courseName} />
        </Grid>
      </Grid>
      {!showResult && (
        <>
          <Grid container justifyContent="center">
            <Grid item>
              <TestTimer counter={counter} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={8} md={8}>
              {questions.length > 0 && (
                <Question
                  question={questions[questionNumber]}
                  index={questionNumber}
                  key={questions[questionNumber].QId}
                  handleSkip={handleSkip}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  disableNext={disableNext}
                  disablePrev={disablePrev}
                  answer={answers[questionNumber]}
                  handleAnswer={handleAnswer}
                  displaySubmit={displaySubmit}
                  handleSubmit={handleSubmit}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <QuestionareSidebar
                questionSidebarCount={questionSidebarCount}
                questionNumber={questionNumber}
                answers={answers}
                handleQuestionClick={handleQuestionClick}
                NoOfQuestion={CourseBasedOnIndex.examDetails.NoOfQuestions}
              />
            </Grid>
          </Grid>
        </>
      )}

      <Grid container>
        {showResult && (
          <Grid item xs={12} sm={12} md={12}>
            <Result
              result={testResult.marksScored}
              total={Number(CourseBasedOnIndex.examDetails.TotalMarks)}
              isSuccess={isSuccess}
              handleViewCourseClick={handleViewCourseClick}
              handleDownloadCertClick={handleCertificateDownloadClick}
              handleCertificateDownload={handleCertificateDownload}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default POSPTest;
