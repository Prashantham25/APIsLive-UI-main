// import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { postRequest, getRequest } from "core/clients/axiosclient";
import MDLinearProgressWithLabel from "components/MDLinerProgressWithLabel";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { CircularProgress } from "@mui/material";
import FamilyInsurance from "../../../../assets/images/BrokerPortal/Family_Life_Insurance.png";
import MDButton from "../../../../components/MDButton";
import { useDataController } from "../../context";
import ReactPDF from "./ReactPDF";
import POSPTest from "../POSPTest/POSPTest";
import ModuleTimer from "./ModuleTimer";

function MyTrainings() {
  const [controller] = useDataController();
  const { CourseBasedOnIndex } = controller;
  console.log("CourseBasedOnIndex", CourseBasedOnIndex);

  const [courseOnIndex, setCourseOnIndex] = useState(CourseBasedOnIndex);
  const [file, setFile] = useState({
    filePath: "",
  });
  const [fileData, setFileData] = useState({});
  const [time, setTime] = useState({
    s: "00",
    m: "00",
    h: "00",
  });
  const [intrvl, setIntrvl] = useState();
  const [start, setStart] = useState(0);
  const [module, setModule] = useState({ moduleIndex: 0 });
  const [subModule, setSubModule] = useState({ subModuleIndex: 0 });
  const [progress, setProgress] = useState({ progressValue: 0 });
  const [flags, setFlags] = useState({
    indexFlag: 0,
    completeFlag: true,
    buttonDisable: true,
    previousDisable: true,
    nextFlag: false,
    previousFlag: false,
    testFlag: false,
    timerStop: false,
    drawerFlag: false,
    drawerState: false,
  });
  const [completedModules, setCompltedModules] = useState([]);
  const [modulesEnabled, setModuleEnabled] = useState([]);
  const { POSPDetails } = controller;
  const [trainingDetails, setTrainingDetails] = useState(POSPDetails);
  const [loader, setLoader] = useState(false);
  // const [timeForModule, setTimeforModule] = useState({ s: "00", m: "00", h: "00" });
  // const [startMod, setStartMod] = useState(0);
  const [counter, setCounter] = useState(10800);
  const [moveToNextModule, setMoveToNextModule] = useState(false);
  const [completedSubModule, setCompletedSubModules] = useState([]);

  const toggleDrawer = () => {
    setFlags((prevState) => ({
      ...prevState,
      drawerFlag: !flags.drawerFlag,
      drawerState: !flags.drawerState,
    }));
  };

  function setZeros(i) {
    if (i < 10) return `0${i}`;
    return i;
  }
  // start timer
  const startTimer = async () => {
    console.log("Time", time);
    // if startTimer is already running
    if (start === 1) return;

    setStart(1); // set startTimer is running
    let ss = Number(time.s);
    let mm = Number(time.m);
    let hh = Number(time.h);
    setIntrvl(
      setInterval(() => {
        ss += 1;
        if (ss === 60) {
          ss = 0;
          mm += 1;
        }
        if (mm === 60) {
          mm = 0;
          hh += 1;
        }
        setTime({
          s: setZeros(ss),
          m: setZeros(mm),
          h: setZeros(hh),
        });
      }, 1000)
    );
  };

  const stopTimer = () => {
    if (start === 0) return;
    setStart(0);
    setTime((prevState) => ({ ...prevState, s: time.s, m: time.m, h: time.h }));
    clearInterval(intrvl);
  };

  const increaseProgress = (idx, complete) => {
    console.log("12345678", complete);
    const { TrainingDetails } = POSPDetails.pospdetailsJson;
    const d = TrainingDetails.filter(
      (item) => item.CourseId === courseOnIndex.courseId.toString()
    )[0].CompletedModules;
    if (d.length !== 0) {
      const k = complete.filter((x) => x === idx).length;
      const l = complete.includes(idx);
      console.log("1234567", k, l);
      if (complete.includes(idx) && k === 1) {
        setProgress((prevState) => ({
          ...prevState,
          progressValue: progress.progressValue + 20,
        }));
      } else {
        setProgress((prevState) => ({
          ...prevState,
          progressValue: progress.progressValue,
        }));
      }
    } else {
      const h = complete.filter((x) => x === idx).length;
      const g = complete.includes(idx);
      console.log("1234567", g, h);
      if (complete.includes(idx) && h === 1) {
        setProgress((prevState) => ({
          ...prevState,
          progressValue: progress.progressValue + 20,
        }));
      } else {
        setProgress((prevState) => ({
          ...prevState,
          progressValue: progress.progressValue,
        }));
      }
    }
    console.log("qwertyuio", d);
    if (progress.progressValue > 70) {
      setFlags((prevState) => ({ ...prevState, buttonDisable: false }));
    }
    console.log("courseofindex", courseOnIndex);
  };

  // const navigate = useNavigate();
  const b64toBlob = (b64Data, contentType) => {
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

  const handleBlob = async (fileURL) => {
    getRequest(`DMS/DownloadFileURL?id=${fileURL}&urlType=Course&isView=false`).then(
      async (result) => {
        console.log("result", result);
        const contentType = "application/pdf";
        const b64Data = result.data.fileData;
        const blob = await b64toBlob(b64Data, contentType);
        const blobUrl = URL.createObjectURL(blob);
        setFile((prevState) => ({ ...prevState, filePath: blobUrl }));
        // setFileData((prev)=>({...prev,}))
        setLoader(false);
      }
    );
  };

  const handleFileUrl = async (fileUrl, idx, index, data) => {
    setCounter(10800);
    setLoader(true);
    const course = courseOnIndex;
    let complete = [...completedModules];
    // const { TrainingDetails } = POSPDetails.pospdetailsJson;
    const lenOfArray = data.ModuleDetails.length;
    const moduleLen = courseOnIndex.courseDetails.ModuleDetails.length;
    setModule((prevState) => ({ ...prevState, moduleIndex: idx }));
    setSubModule((prevState) => ({ ...prevState, subModuleIndex: index }));
    console.log("index", fileUrl, index, fileUrl.Material[0].Path);
    if (index < lenOfArray) {
      handleBlob(fileUrl.Material[0].Path);
      // setFile({ ...file, filePath: fileUrl.Material[0].Path });
      setFileData((prevState) => ({ ...prevState, ...fileUrl }));
    }
    console.log(fileUrl, idx, index, data, "file");
    if (index + 1 === lenOfArray) {
      console.log("valuee", lenOfArray);
      if (idx + 1 === moduleLen) {
        const obj1 = idx + 1;
        complete = [...completedModules, idx];
        console.log("asdfghjkl", complete);
        setCompltedModules([...completedModules, idx]);
        setModuleEnabled([...modulesEnabled, obj1]);
        course.courseDetails.ModuleDetails[idx].disabled = false;
        setCourseOnIndex(course);
      } else {
        const obj = idx + 1;
        complete = [...completedModules, idx];
        console.log("asdfghjkl", complete);
        setCompltedModules([...completedModules, idx]);
        setModuleEnabled([...modulesEnabled, obj]);
        // course.courseDetails.ModuleDetails[idx].disabled = true;
        course.courseDetails.ModuleDetails[idx + 1].disabled = false;
        // course.courseDetails.ModuleDetails[idx].defaultExpanded = false;
        course.courseDetails.ModuleDetails[idx + 1].defaultExpanded = true;
        setCourseOnIndex(course);
      }
      handleBlob(fileUrl.Material[0].Path);
      // setFile({ ...file, filePath: fileUrl.Material[0].Path });
      setFileData((prevState) => ({ ...prevState, ...fileUrl }));
      await increaseProgress(idx, complete);
    }
    console.log("completed", completedModules);
  };

  useEffect(() => {
    if (progress.progressValue >= 80) {
      setFlags((prevState) => ({ ...prevState, buttonDisable: false }));
    }
  }, [progress.progressValue >= 80]);

  // const TakeTest = () => {
  //   toggleDrawer();
  // };

  const TakeTest = () => {
    const { CourseCompleted } = POSPDetails.pospdetailsJson.TrainingDetails.filter(
      (x) => x.CourseId === courseOnIndex.courseId.toString()
    )[0];
    const timeInHrs = courseOnIndex.durationInHrs.split(":");
    if (time.h === timeInHrs || progress.progressValue >= 70) {
      stopTimer();
      const { pospdetailsJson } = trainingDetails;
      const TrainingJson = POSPDetails.pospdetailsJson.TrainingDetails;
      console.log("TrainingJson", TrainingJson);
      TrainingJson.map((item, idx) => {
        // const courseIdfromTraining = item.CourseId;
        const courseIDfromCourse = courseOnIndex.courseId.toString();
        // console.log("courseId", courseIdfromTraining, courseIDfromCourse);
        if (item.CourseId === courseIDfromCourse) {
          const modulesEnabledUnique = modulesEnabled.filter(
            (x, i) => modulesEnabled.indexOf(x) === i
          );
          const completedModulesUnique = completedModules.filter(
            (x, i) => completedModules.indexOf(x) === i
          );
          pospdetailsJson.TrainingDetails[idx].AttendedDuration = `${time.h}:${time.m}:${time.s}`;
          pospdetailsJson.TrainingDetails[idx].Progress = progress.progressValue;
          pospdetailsJson.TrainingDetails[idx].courseFlag = true;
          pospdetailsJson.TrainingDetails[idx].ModulesEnabled = modulesEnabledUnique;
          pospdetailsJson.TrainingDetails[idx].CompletedModules = completedModulesUnique;
          pospdetailsJson.TrainingDetails[idx].ModuleId = module.moduleIndex;
          pospdetailsJson.TrainingDetails[idx].SubModuleId = subModule.subModuleIndex;
          if (CourseCompleted === true) {
            pospdetailsJson.TrainingDetails[idx].CourseCompleted = true;
          } else {
            pospdetailsJson.TrainingDetails[idx].CourseCompleted = false;
          }
          setTrainingDetails((prevState) => ({ ...prevState, pospdetailsJson }));
          console.log("index", pospdetailsJson);
          postRequest(`Partner/UpdatePOSPDetails`, pospdetailsJson).then((data) => {
            console.log("123456789", data);
            if (data.data.status === 3) {
              toggleDrawer();
            } else {
              swal({ icon: "error", text: "Error,Please try after sometime" });
            }
          });
        }
        console.log("traingingdetails", trainingDetails);
        return true;
      });
    }
  };

  // const TakeRetest = () => {
  //   toggleDrawer();
  // };

  const handleNext = () => {
    setLoader(true);
    const lenOfModule = courseOnIndex.courseDetails.ModuleDetails.length;
    if (lenOfModule - 1 === module.moduleIndex) {
      const lenOfSubModule =
        courseOnIndex.courseDetails.ModuleDetails[module.moduleIndex].ModuleDetails.length;
      if (lenOfSubModule - 1 === subModule.subModuleIndex) {
        setSubModule((prevState) => ({ ...prevState, subModuleIndex: subModule.subModuleIndex }));
        setProgress((prevState) => ({ ...prevState, progressValue: progress.progressValue + 20 }));
      } else {
        if (lenOfSubModule === 1) {
          setFlags((prevState) => ({ ...prevState, testFlag: true }));
        } else if (lenOfSubModule > 1 && lenOfSubModule - 2 === subModule.subModuleIndex) {
          setFlags((prevState) => ({ ...prevState, testFlag: true }));
        }
        setMoveToNextModule(false);
        setCounter(10800);
        setFlags((prevState) => ({ ...prevState, nextFlag: true }));
        // setFlags((prevState) => ({ ...prevState, testFlag: true }));
        setSubModule((prevState) => ({
          ...prevState,
          subModuleIndex: subModule.subModuleIndex + 1,
        }));
        //  setProgress((prevState) => ({ ...prevState, progressValue: progress.progressValue + 20 }));
      }
    } else {
      setFlags((prevState) => ({ ...prevState, nextFlag: true, previousDisable: false }));
      setSubModule((prevState) => ({ ...prevState, subModuleIndex: subModule.subModuleIndex + 1 }));
      // 01/02/2023
      courseOnIndex.courseDetails.ModuleDetails.forEach((x1, i1) => {
        x1.ModuleDetails.forEach((x2, i2) => {
          if (i1 === module.moduleIndex && i2 === subModule.subModuleIndex + 1)
            setFileData({ ...fileData, ModuleName: x2.ModuleName });
        });
      });
      console.log("iiiiiiiiiiiiiiiii", module.moduleIndex, subModule.subModuleIndex + 1);
      // 01/02/2023
    }
  };

  const handlePrevious = () => {
    setFlags((prev) => ({ ...prev, testFlag: false }));
    setLoader(true);
    if (subModule.subModuleIndex === 0 && module.moduleIndex === 0) {
      setSubModule((prevState) => ({ ...prevState, subModuleIndex: subModule.subModuleIndex }));
      setFlags((prevState) => ({ ...prevState, previousFlag: true, previousDisable: true }));
    } else {
      console.log("index", subModule);
      if (subModule.subModuleIndex === 0) {
        const lenOfArray =
          courseOnIndex.courseDetails.ModuleDetails[module.moduleIndex - 1].ModuleDetails.length;
        setSubModule((prevState) => ({ ...prevState, subModuleIndex: lenOfArray - 1 }));
        setModule((prevState) => ({ ...prevState, moduleIndex: module.moduleIndex - 1 }));
        setFlags((prevState) => ({ ...prevState, previousFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, previousFlag: true }));
        setSubModule((prevState) => ({
          ...prevState,
          subModuleIndex: subModule.subModuleIndex - 1,
        }));
        // 01/02/2023
        courseOnIndex.courseDetails.ModuleDetails.forEach((x1, i1) => {
          x1.ModuleDetails.forEach((x2, i2) => {
            if (i1 === module.moduleIndex && i2 === subModule.subModuleIndex - 1)
              setFileData({ ...fileData, ModuleName: x2.ModuleName });
          });
        });
        // 01/02/2023
      }
    }
  };

  useEffect(() => {
    if (flags.previousFlag === true) {
      const courseFile =
        courseOnIndex.courseDetails.ModuleDetails[module.moduleIndex].ModuleDetails[
          subModule.subModuleIndex
        ].Material[0].Path;
      handleBlob(courseFile);
      // setFile({ ...file, filePath: courseFile });
      setFlags((prevState) => ({ ...prevState, previousFlag: false }));
    }
    // if (module.moduleIndex > 0) {
    //   setModule((prevState) => ({ ...prevState, moduleIndex: module.moduleIndex - 1 }));
    // }
  }, [flags.previousFlag === true]);

  useEffect(() => {
    if (flags.nextFlag === true) {
      const course = courseOnIndex;
      let complete = [...completedModules];
      const lenOfArray =
        courseOnIndex.courseDetails.ModuleDetails[module.moduleIndex].ModuleDetails.length;
      if (subModule.subModuleIndex < lenOfArray) {
        const courseFile =
          courseOnIndex.courseDetails.ModuleDetails[module.moduleIndex].ModuleDetails[
            subModule.subModuleIndex
          ].Material[0].Path;
        handleBlob(courseFile);
        // setFile({ ...file, filePath: courseFile });
        setFlags((prevState) => ({ ...prevState, nextFlag: false }));
        //
      }

      if (subModule.subModuleIndex === lenOfArray) {
        setSubModule((prevState) => ({ ...prevState, subModuleIndex: 0 }));
        setModule((prevState) => ({ ...prevState, moduleIndex: module.moduleIndex + 1 }));
        const moduleLen = courseOnIndex.courseDetails.ModuleDetails.length;
        console.log("valuee", lenOfArray);
        if (module.moduleIndex + 1 === moduleLen) {
          const obj1 = module.moduleIndex + 1;
          complete = [...completedModules, module.moduleIndex];
          console.log("asdfghjkl", complete);
          setCompltedModules([...completedModules, module.moduleIndex]);
          setModuleEnabled([...modulesEnabled, obj1]);
          course.courseDetails.ModuleDetails[module.moduleIndex].disabled = false;
          setCourseOnIndex(course);
        } else {
          const obj = module.moduleIndex + 1;
          complete = [...completedModules, module.moduleIndex];
          console.log("asdfghjkl", complete);
          setCompltedModules([...completedModules, module.moduleIndex]);
          setModuleEnabled([...modulesEnabled, obj]);
          // course.courseDetails.ModuleDetails[module.moduleIndex].disabled = true;
          course.courseDetails.ModuleDetails[module.moduleIndex + 1].disabled = false;
          //   course.courseDetails.ModuleDetails[module.moduleIndex].defaultExpanded = false;
          course.courseDetails.ModuleDetails[module.moduleIndex + 1].defaultExpanded = true;
          console.log("course", course);
          setCourseOnIndex(course);
        }
        const courseFile =
          courseOnIndex.courseDetails.ModuleDetails[module.moduleIndex].ModuleDetails[0].Material[0]
            .Path;
        handleBlob(courseFile);
        // setFile({ ...file, filePath: courseFile });
        // setProgress((prevState) => ({ ...prevState, progressValue: progress.progressValue + 20 }));
        // if (progress.progressValue > 70) {
        //   setFlags((prevState) => ({ ...prevState, buttonDisable: false }));
        // }
        increaseProgress(module.moduleIndex, complete);
        setFlags((prevState) => ({ ...prevState, nextFlag: false }));
      }
    }
  }, [flags.nextFlag === true]);

  useEffect(async () => {
    const { TrainingDetails } = POSPDetails.pospdetailsJson;
    setLoader(true);
    // const { CompletedModules } = POSPDetails.pospdetailsJson;
    const courseModify = courseOnIndex;

    if (
      TrainingDetails.filter((item) => item.CourseId === courseOnIndex.courseId.toString())[0]
        .courseFlag === true &&
      TrainingDetails.filter((item) => item.CourseId === courseOnIndex.courseId.toString())[0]
        .CourseCompleted === true
    ) {
      // view course

      const changedArray = courseOnIndex.courseDetails.ModuleDetails.map((item1) => ({
        ...item1,
        disabled: false,
        defaultExpanded: true,
      }));
      courseModify.courseDetails.ModuleDetails = changedArray;
      setCourseOnIndex(courseModify);
      // const timeDur = TrainingDetails.filter(
      //   (item) => item.CourseId === courseOnIndex.courseId.toString()
      // )[0].AttendedDuration.split(":");
      //  const  timer } = time;
      // setTime((prevState) => ({ ...prevState, h: timeDur[0], m: timeDur[1], s: timeDur[2] }));
      setFlags((prevState) => ({ ...prevState, completeFlag: false }));
      const progr = TrainingDetails.filter(
        (itm) => itm.CourseId === courseOnIndex.courseId.toString()
      )[0].Progress;
      setProgress((prevState) => ({ ...prevState, progressValue: progr }));
      setFlags((prevState) => ({ ...prevState, buttonDisable: false }));
      stopTimer();
      setFlags((prevState) => ({ ...prevState, timerStop: true }));
      setModule((prevState) => ({ ...prevState, moduleIndex: 0 }));
      setSubModule((prevState) => ({ ...prevState, subModuleIndex: 0 }));
      const courseFile =
        courseOnIndex.courseDetails.ModuleDetails[0].ModuleDetails[0].Material[0].Path;
      handleBlob(courseFile);
      setFileData({
        ...fileData,
        ModuleName: courseOnIndex.courseDetails.ModuleDetails[0].ModuleDetails[0].ModuleName,
      });
    } else if (
      TrainingDetails.filter((item) => item.CourseId === courseOnIndex.courseId.toString())[0]
        .courseFlag === true &&
      TrainingDetails.filter((item) => item.CourseId === courseOnIndex.courseId.toString())[0]
        .CourseCompleted === false
    ) {
      // continue course

      const { ModulesEnabled } = TrainingDetails.filter(
        (item) => item.CourseId === courseOnIndex.courseId.toString()
      )[0];
      const { CompletedModules } = TrainingDetails.filter(
        (item) => item.CourseId === courseOnIndex.courseId.toString()
      )[0];
      const { ModuleId } = TrainingDetails.filter(
        (item) => item.CourseId === courseOnIndex.courseId.toString()
      )[0];
      const { SubModuleId } = TrainingDetails.filter(
        (item) => item.CourseId === courseOnIndex.courseId.toString()
      )[0];
      const changedArray = courseOnIndex.courseDetails.ModuleDetails.map((item1, index) =>
        ModulesEnabled.includes(index)
          ? {
              ...item1,
              disabled: false,
              defaultExpanded: true,
            }
          : item1
      );
      courseModify.courseDetails.ModuleDetails = changedArray;
      setCourseOnIndex(courseModify);
      setModule((prevState) => ({ ...prevState, moduleIndex: ModuleId }));
      setSubModule((prevState) => ({ ...prevState, subModuleIndex: SubModuleId }));
      const courseFile = courseOnIndex.courseDetails.ModuleDetails[ModuleId].Material?.[0]?.Path;
      handleBlob(courseFile);
      // setFile({ ...file, filePath: courseFile });
      setFileData({
        ...fileData,
        ModuleName:
          courseOnIndex.courseDetails.ModuleDetails[ModuleId].ModuleDetails[SubModuleId].ModuleName,
      });
      setModuleEnabled(ModulesEnabled);
      setCompltedModules(CompletedModules);

      const timeDur = TrainingDetails.filter(
        (item) => item.CourseId === courseOnIndex.courseId.toString()
      )[0].AttendedDuration.split(":");
      //  const  timer } = time;
      console.log("timeDur", timeDur);
      setTime((prevState) => ({ ...prevState, h: timeDur[0], m: timeDur[1], s: timeDur[2] }));
      setFlags((prevState) => ({ ...prevState, completeFlag: false, previousDisable: false }));
      const progr = TrainingDetails.filter(
        (itm) => itm.CourseId === courseOnIndex.courseId.toString()
      )[0].Progress;
      setProgress((prevState) => ({ ...prevState, progressValue: progr }));
      if (
        courseOnIndex.courseDetails.ModuleDetails.length - 1 === ModuleId &&
        courseOnIndex.courseDetails.ModuleDetails[ModuleId].ModuleDetails.length - 1 === SubModuleId
      ) {
        setFlags((prevState) => ({ ...prevState, testFlag: true }));
      }
    } else {
      // start course
      const lengthOfFirstSubModule =
        courseOnIndex.courseDetails.ModuleDetails[0]?.ModuleDetails?.length;
      const fillArray = [true];
      fillArray.fill(false, 1, lengthOfFirstSubModule - 1);
      setCompletedSubModules(fillArray);
      //
      const courseFile =
        courseOnIndex.courseDetails.ModuleDetails[0]?.ModuleDetails[0]?.Material[0]?.Path;
      handleBlob(courseFile);
      setFileData({
        ...fileData,
        ModuleName: courseOnIndex.courseDetails.ModuleDetails[0]?.ModuleDetails[0]?.ModuleName,
      });
      // setFile({ ...file, filePath: courseFile });
      console.log("courseFile", courseFile);
      if (CourseBasedOnIndex != null) {
        courseModify.courseDetails.ModuleDetails[0].disabled = false;
        courseModify.courseDetails.ModuleDetails[0].defaultExpanded = true;
        //
        setCounter(10800);
        //
        // const obj = { key: 0, value: false };
        setModuleEnabled([...modulesEnabled, 0]);
        setCourseOnIndex(courseModify);
        console.log(courseOnIndex);
      }
      startTimer();
    }

    // const courseFile =
    //   courseOnIndex.courseDetails.ModuleDetails[0].ModuleDetails[0].Material[0].Path;
    // setFile({ ...file, filePath: courseFile });
    // console.log("courseFile", courseFile);
    // if (CourseBasedOnIndex != null) {
    //   courseModify.courseDetails.ModuleDetails[0].disabled = false;
    //   courseModify.courseDetails.ModuleDetails[0].defaultExpanded = true;
    //   // const obj = { key: 0, value: false };
    //   setCompltedModules([...completedModules, 0]);
    //   setCourseOnIndex(courseModify);
    //   console.log(courseOnIndex);
    // }

    window.addEventListener(
      "beforeunload",
      (e) => {
        e.preventDefault();
        stopTimer();
        setFlags((prevState) => ({ ...prevState, timerStop: true }));
      },
      []
    );

    // if (
    //   TrainingDetails.filter((item) => item.CourseId === courseOnIndex.courseId.toString())[0]
    //     .courseFlag === true &&
    //   TrainingDetails.filter((item) => item.CourseId === courseOnIndex.courseId.toString())[0]
    //     .CourseCompleted === false
    // ) {
    //   const timeDur = TrainingDetails.filter(
    //     (item) => item.CourseId === courseOnIndex.courseId.toString()
    //   )[0].AttendedDuration.split(":");
    //   //  const  timer } = time;
    //   setTime((prevState) => ({ ...prevState, h: timeDur[0], m: timeDur[1], s: timeDur[2] }));
    //   setFlags((prevState) => ({ ...prevState, completeFlag: false }));
    //   const progr = TrainingDetails.filter(
    //     (itm) => itm.CourseId === courseOnIndex.courseId.toString()
    //   )[0].Progress;
    //   setProgress((prevState) => ({ ...prevState, progressValue: progr }));
    // } else {
    //   startTimer();
    // }
  }, []);
  //
  useEffect(() => {
    if (moveToNextModule === true && counter === 0) {
      // setMoveToNextModule(false);
      const SubModuleId = subModule.subModuleIndex + 1;
      // setSubModule((prevState) => ({ ...prevState, subModuleIndex: SubModuleId }));
      const compSubMod = completedSubModule;
      compSubMod[SubModuleId] = true;
      setCompletedSubModules(compSubMod);
    }
  }, [moveToNextModule]);
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    }
    if (counter === 0) {
      setMoveToNextModule(true);
      setSubModule((prevState) => ({ ...prevState, subModuleIndex: subModule.subModuleIndex + 1 }));
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);
  //
  // const onExpire = () => {};

  useEffect(() => {
    if (time.s !== "00" || time.m !== "00" || time.h !== "00") {
      console.log("time", time);
      startTimer();
    }
  }, [flags.completeFlag]);

  useEffect(() => {
    if (flags.timerStop === true) {
      const { pospdetailsJson } = trainingDetails;
      const TrainingJson = POSPDetails.pospdetailsJson.TrainingDetails;
      console.log("TrainingJson", TrainingJson);
      TrainingJson.map((item, idx) => {
        // const courseIdfromTraining = item.CourseId;
        const courseIDfromCourse = courseOnIndex.courseId.toString();
        // console.log("courseId", courseIdfromTraining, courseIDfromCourse);
        if (item.CourseId === courseIDfromCourse) {
          const modulesEnabledUniqueArray = modulesEnabled.filter(
            (x, i) => modulesEnabled.indexOf(x) === i
          );
          const completedModulesUniqueArray = completedModules.filter(
            (x, i) => completedModules.indexOf(x) === i
          );
          pospdetailsJson.TrainingDetails[idx].AttendedDuration = `${time.h}:${time.m}:${time.s}`;
          pospdetailsJson.TrainingDetails[idx].Progress = progress.progressValue;
          pospdetailsJson.TrainingDetails[idx].courseFlag = true;
          pospdetailsJson.TrainingDetails[idx].CourseCompleted = false;
          pospdetailsJson.TrainingDetails[idx].ModulesEnabled = modulesEnabledUniqueArray;
          pospdetailsJson.TrainingDetails[idx].CompletedModules = completedModulesUniqueArray;
          pospdetailsJson.TrainingDetails[idx].ModuleId = module.moduleIndex;
          pospdetailsJson.TrainingDetails[idx].SubModuleId = subModule.subModuleIndex;
          setTrainingDetails((prevState) => ({ ...prevState, pospdetailsJson }));
          console.log("index", pospdetailsJson);
          postRequest(`Partner/UpdatePOSPDetails`, pospdetailsJson).then((data) => {
            console.log("123456789", data);
            if (data.data.status === 3) {
              console.log("123456789", "Success");
              // navigate("/modules/BrokerPortal/Pages/TakeTest");
            } else {
              swal({ icon: "error", text: "Error,Please try after sometime" });
            }
          });
        }
        return true;
      });
    }
  }, [flags.timerStop]);

  return (
    <PageLayout>
      <BPNavbar />
      <MDBox sx={{ mx: 2, mt: 10 }}>
        <MDTypography sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
          {courseOnIndex.courseName}
        </MDTypography>
        <Card>
          <Grid container>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDBox component="img" src={FamilyInsurance} sx={{ mx: 2 }} alignItems="center" />
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
              <MDBox flexDirection="row" display="flex" sx={{ mt: 3 }}>
                <MDTypography> Duration: {courseOnIndex.durationInHrs} hrs </MDTypography>
                <MDTypography sx={{ mx: 5 }}>
                  Deadline:
                  {
                    POSPDetails.pospdetailsJson.TrainingDetails.filter(
                      (x) => x.CourseId === courseOnIndex.courseId.toString()
                    )[0].EndDate
                  }{" "}
                </MDTypography>
                <MDBox display="flex" flexDirection="column">
                  {POSPDetails.pospdetailsJson.TrainingDetails.filter(
                    (x) => x.CourseId === courseOnIndex.courseId.toString()
                  )[0].CourseCompleted === false ? (
                    <MDTypography sx={{ ml: "30rem" }}>
                      {`${time.h}:${time.m}:${time.s}`} hrs finished {courseOnIndex.durationInHrs}{" "}
                      hrs
                    </MDTypography>
                  ) : null}

                  <MDBox sx={{ marginLeft: "30rem" }}>
                    <MDLinearProgressWithLabel
                      sx={{ mt: "7px" }}
                      progress={progress.progressValue}
                      variant="contained"
                      label
                    />
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDTypography
                sx={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  mr: 7,
                  mt: 2,
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                The Model Syllabus for training of “POS Person General Insurance including stand
                alone health insurance” is herewith attached in Annexure I which may include the
                features of various POS products designed by the Insurer from time to time and may
                be modified and developed according to the changing need of the insurers and
                intermediaries.
                <MDBox sx={{ ml: 3, mt: 2, color: "#D32F2F" }}>
                  <ul>
                    <li>You need to complete atleast 70% of the Course to take the Test. </li>
                    <li>Avail 40% of Marks to get the Certificate.</li>
                  </ul>
                </MDBox>
              </MDTypography>
            </Grid>
            <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
              <MDButton variant="contained" onClick={TakeTest} disabled={flags.buttonDisable}>
                {/* disabled={flags.buttonDisable} */}
                Take Test
              </MDButton>
            </Grid>
          </Grid>
        </Card>
        {loader && (
          <MDBox alignItems="center" justifyContent="center" display="flex" fullwidth>
            <CircularProgress />
          </MDBox>
        )}
        <Card sx={{ mt: 3 }}>
          <Grid container justifyContent="space-between">
            <MDTypography variant="h4" sx={{ marginLeft: "350px", marginTop: "10px" }}>
              {fileData !== "" ? fileData.ModuleName : null}
            </MDTypography>
            <MDTypography
              sx={{ marginRight: "30px", marginTop: "10px", display: "flex", flexDirection: "row" }}
            >
              Time Remaining: <ModuleTimer counter={counter} />
            </MDTypography>
          </Grid>
          <MDBox m={3} display="flex" flexDirection="row">
            <Card
              sx={{
                backgroundColor: "#E4ECF9",
                maxWidth: "20rem",
                maxHeight: "930px",
                overflowX: "scroll",
              }}
            >
              {courseOnIndex.courseDetails.ModuleDetails.map((item, idx) => (
                <Accordion
                  expanded={item.defaultExpanded}
                  disableGutters
                  disabled={item.disabled}
                  sx={{
                    boxShadow: "unset",
                    border: "unset",
                    "&:before": { display: "none" },
                    backgroundColor: "#E4ECF9",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <MDTypography
                      sx={{ color: "#000000", fontSize: "16px" }}
                      onClick={() => handleFileUrl(item, idx, idx, item)}
                    >
                      {item.ModuleName}({item.TimeDuration})
                    </MDTypography>
                  </AccordionSummary>
                  {item.ModuleDetails.map((item1, index) => (
                    <AccordionDetails>
                      <MDTypography
                        onClick={() => handleFileUrl(item1, idx, index, item)}
                        // onClick={() => handleBlob(item1)}
                        // onClick={() =>
                        //   completedSubModule[index]
                        //     ? h
                        // andleFileUrl(item1, idx, index, item)
                        //     : () => {}
                        // }
                        sx={
                          module.moduleIndex === idx && subModule.subModuleIndex === index
                            ? { color: "#0071D9", fontSize: "14px", cursor: "pointer" }
                            : { color: "#000000", fontSize: "14px", cursor: "pointer" }
                        }
                      >
                        {item1.ModuleName}
                      </MDTypography>
                    </AccordionDetails>
                  ))}
                </Accordion>
              ))}
            </Card>
            <MDBox ml={2}>
              <hr />
            </MDBox>
            <MDBox display="flex" flexDirection="column">
              <MDBox justifyContent="center">
                <ReactPDF file={file.filePath !== "" ? file.filePath : null} />
              </MDBox>
            </MDBox>
          </MDBox>
          <Grid container justifyContent="space-between">
            <MDButton
              variant="contained"
              onClick={handlePrevious}
              sx={{ ml: "330px" }}
              disabled={flags.previousDisable}
            >
              Previous
            </MDButton>
            {flags.testFlag ? (
              <MDButton variant="contained" onClick={TakeTest}>
                Take test
              </MDButton>
            ) : (
              <MDButton variant="contained" onClick={handleNext} sx={{ mr: "50px" }}>
                Next
              </MDButton>
            )}
          </Grid>
        </Card>
        <Grid container alignItems="center">
          <Grid item>
            {/* {flags.drawerFlag && (
            <Drawer openDrawer={flags.drawerState} position="right" toggleDrawer={toggleDrawer}>
              <POSPTest toggleDrawer={toggleDrawer} />
            </Drawer>
          )} */}
            {flags.drawerFlag &&
              ["right"].map((anchor) => (
                <SwipeableDrawer
                  anchor={anchor}
                  open={flags.drawerState}
                  // onClose={toggleDrawer}
                  onOpen={toggleDrawer}
                  sx={{
                    "& .MuiDrawer-paper": {
                      width: "90% !important",
                    },
                  }}
                >
                  <POSPTest toggleDrawer={toggleDrawer} />
                </SwipeableDrawer>
              ))}
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

export default MyTrainings;
