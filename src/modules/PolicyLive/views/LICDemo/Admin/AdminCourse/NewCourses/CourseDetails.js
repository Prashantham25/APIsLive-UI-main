import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import Checkbox from "@mui/material/Checkbox";

import Radio from "@mui/material/Radio";
import swal from "sweetalert";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddIcon from "@mui/icons-material/Add";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDButton from "../../../../../../../components/MDButton";

function CourseDetails({
  setCourseDetails,
  CourseDetail,
  handleNext,
  examDetails,
  setExamDetails,
  flags,
  setFlags,
}) {
  const [count, setCount] = useState(1);
  const IncNum = () => {
    const newValue = { ...CourseDetail, NoofModules: count + 1 };
    setCourseDetails(newValue);
    setCount(count + 1);
  };
  const DecNum = () => {
    if (count > 1) {
      setCount(count - 1);
      const newValue = { ...CourseDetail, NoofModules: count - 1 };
      setCourseDetails(newValue);
    } else {
      setCount(1);
      // alert("min limit reached");
    }
  };

  const handleCourseChange = (event) => {
    const newValue = { ...CourseDetail, [event.target.name]: event.target.value };
    setCourseDetails(newValue);
  };
  const handleCourseChange1 = (value, name) => {
    const newValue = { ...CourseDetail, [name]: value };
    setCourseDetails(newValue);
  };
  const handleDateChange = (value, name) => {
    // if (name === "CourseDeadline") {
    //   const newValue = { ...CourseDetail, [name]: value };
    //   setCourseDetails(newValue);
    // }
    if (name === "CourseEndDate") {
      const newValue = { ...CourseDetail, [name]: value };
      setCourseDetails(newValue);
    }
    if (name === "CourseCommenceDate") {
      const newValue = { ...CourseDetail, [name]: value };
      setCourseDetails(newValue);
    } else {
      const newValue = { ...CourseDetail, [name]: value };
      setCourseDetails(newValue);
    }
  };

  const handleCheckBox = (e) => {
    const newValue = { ...CourseDetail, [e.target.name]: e.target.value };
    setCourseDetails(newValue);
  };

  const handleradioChange = (e) => {
    if (e.target.name === "TypeofCourse") {
      const newValue = { ...CourseDetail, [e.target.name]: e.target.value };
      setCourseDetails(newValue);
    }
    if (e.target.name === "LineofBusiness") {
      const newValue = { ...CourseDetail, [e.target.name]: e.target.value };
      setCourseDetails(newValue);
    }
    if (e.target.name === "MandatoryCourse") {
      const newValue = { ...CourseDetail, [e.target.name]: e.target.value };
      setCourseDetails(newValue);
    } else {
      const newValue = { ...CourseDetail, [e.target.name]: e.target.value };
      setCourseDetails(newValue);
    }
  };

  const handleProceed = () => {
    if (
      CourseDetail.CourseName === "" ||
      CourseDetail.CourseTimeDuration === "" ||
      CourseDetail.CourseCommenceDate === "" ||
      CourseDetail.CourseEndDate === "" ||
      CourseDetail.CourseDeadline === "" ||
      CourseDetail.NoofModules === "" ||
      CourseDetail.CourseDiscription === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill the Required fields",
      });
      setFlags(true);
    } else if (
      CourseDetail.Assigne === "" ||
      CourseDetail.TypeofCourse === "" ||
      CourseDetail.LineofBusiness === "" ||
      CourseDetail.MandatoryCourse === ""
    ) {
      swal({
        icon: "error",
        text: "Please select the options provided",
      });
    } else {
      setFlags(false);
      handleNext();
    }
    if (CourseDetail.TypeofCourse === "IRDAI") {
      const newValue = { ...examDetails, Percentage: "40" };
      setExamDetails(newValue);
    } else {
      const newValue = { ...examDetails, Percentage: "" };
      setExamDetails(newValue);
    }
  };

  // const onNext = () => {
  //   if (CourseDetail.TypeofCourse === "IRDAI") {
  //     const newValue = { ...examDetails, Percentage: "40" };
  //     setExamDetails(newValue);
  //   } else {
  //     const newValue = { ...examDetails, Percentage: "" };
  //     setExamDetails(newValue);
  //   }
  //   handleNext();
  // };

  console.log("setCourseDetails", CourseDetail);

  return (
    <Grid container spacing={2} width="100%" mt={1}>
      <MDBox mr={10}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.125rem" }}>
              Course Details
            </MDTypography>
          </Grid>

          <Grid item md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Course ID" value={CourseDetail.CourseCode} />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <MDInput
              label="Course Name"
              value={CourseDetail.CourseName}
              onChange={handleCourseChange}
              name="CourseName"
              error={CourseDetail.CourseName === "" ? flags : null}
            />
            {flags && CourseDetail.CourseName === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            {/* <MDInput
              label="Course Time Duration"
              placeholder="HH:MM:SS Hours"
              // inputFormat="HH:mm"
              value={CourseDetail.CourseTimeDuration}
              onChange={handleCourseChange}
              name="CourseTimeDuration"
            /> */}
            <MDDatePicker
              fullWidth
              // value={`${CourseDetail.CourseTimeDuration},${"hrs"}`}
              // value={`${CourseDetail.CourseTimeDuration} hrs`}
              value={CourseDetail.CourseTimeDuration}
              onChange={(e) => handleCourseChange1(e, "CourseTimeDuration")}
              name="CourseTimeDuration"
              options={{
                noCalendar: true,
                enableTime: true,
                dateFormat: "H:i:S",
                altFormat: "H:i:S",
                altInput: true,
                time_24hr: true,
                enableSeconds: true,
              }}
              input={{ label: "Course Time Duration", value: CourseDetail.CourseTimeDuration }}
              InputLabelProps={{ shrink: true }}
              error={CourseDetail.CourseTimeDuration === "" ? flags : null}
            />
            {flags && CourseDetail.CourseTimeDuration === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Course Commence Date " />
          </Grid> */}

          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Course Commence Date"
                inputFormat="dd-MM-yyyy"
                value={CourseDetail.CourseCommenceDate}
                onChange={(date) => handleDateChange(date, "CourseCommenceDate")}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    sx={{
                      marginWidth: "auto",
                      "& .MuiOutlinedInput-root": {
                        marginWidth: "auto",
                      },
                    }}
                    //  required
                    error={CourseDetail.CourseCommenceDate === "" ? flags : null}
                  />
                )}
              />
              {flags && CourseDetail.CourseTimeDuration === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </LocalizationProvider>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Course End Date " />
          </Grid> */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Course End Date"
                inputFormat="dd-MM-yyyy"
                value={CourseDetail.CourseEndDate}
                onChange={(date) => handleDateChange(date, "CourseEndDate")}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    sx={{
                      marginWidth: "auto",
                      "& .MuiOutlinedInput-root": {
                        marginWidth: "auto",
                      },
                    }}
                    //  required
                    error={CourseDetail.CourseEndDate === null ? flags : null}
                  />
                )}
              />
              {flags && CourseDetail.CourseEndDate === null ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </LocalizationProvider>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput 
            label="Course Deadline"
            value={CourseDetail.CourseDeadline}
            onChange={handleCourseChange}
            name="CourseDeadline" />
          </Grid> */}
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Course Deadline"
              name="CourseDeadline"
              value={CourseDetail.CourseDeadline}
              onChange={handleCourseChange}
              error={CourseDetail.CourseDeadline === null ? flags : null}
            />
            {flags && CourseDetail.CourseDeadline === null ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Course Deadline"
                inputFormat="dd-MM-yyyy"
                value={CourseDetail.CourseDeadline}
                onChange={(date) => handleDateChange(date, "CourseDeadline")}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    sx={{
                      marginWidth: "auto",
                      "& .MuiOutlinedInput-root": {
                        marginWidth: "auto",
                      },
                    }}
                    //  required
                    //  error={POSPJson.DOB === null ? flags.errorFlag : null}
                  />
                )}
              />
            </LocalizationProvider> */}
          </Grid>
          <Stack justifyContent="right" direction="row" spacing={4}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography sx={{ fontSize: "1.125rem", fontWeight: "600" }} pt={3}>
                Modules
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} pt={3}>
              <ButtonGroup size="small" aria-label="small outlined button group">
                <Button variant="outlined" onClick={DecNum}>
                  <RemoveIcon color="black" />
                </Button>
                <Button sx={{ color: "#000000" }} variant="outlined" onClick={DecNum}>
                  {/* {count} */}
                  {CourseDetail.NoofModules}
                </Button>
                <Button variant="outlined" onClick={IncNum}>
                  <AddIcon color="black" />
                </Button>
              </ButtonGroup>
            </Grid>
          </Stack>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput
              multiline
              label="Course Description"
              name="CourseDiscription"
              value={CourseDetail.CourseDiscription}
              onChange={handleCourseChange}
              error={CourseDetail.CourseDiscription === "" ? flags : null}
            />
            {flags && CourseDetail.CourseDiscription === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid
            container
            spacing={2}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            sx={{ display: "flex", flexDirection: "row", m: 1 }}
          >
            <Grid item>
              <MDTypography sx={{ fontSize: "1rem", fontWeight: "600" }} mt={1}>
                Assign To
              </MDTypography>{" "}
            </Grid>
            <Grid item pd={5}>
              <Checkbox
                name="Assigne"
                checked={CourseDetail.Assigne === "POSP"}
                onChange={handleCheckBox}
                value="POSP"
              />
            </Grid>
            <Grid item>
              <MDTypography sx={{ fontSize: "0.875rem", fontWeight: "600" }} mt={1}>
                Agent
              </MDTypography>
            </Grid>
            <Grid item>
              <Checkbox
                name="Assigne"
                checked={CourseDetail.Assigne === "Broker"}
                onChange={handleCheckBox}
                value="Broker"
                disabled
              />
            </Grid>
            <Grid item>
              <MDTypography sx={{ fontSize: "0.875rem", fontWeight: "600" }} mt={1}>
                Sub Broker
              </MDTypography>{" "}
            </Grid>
            <Grid item>
              <Checkbox
                name="Assigne"
                checked={CourseDetail.Assigne === "MISP"}
                onChange={handleCheckBox}
                value="MISP"
                disabled
              />
            </Grid>

            <Grid item>
              <MDTypography sx={{ fontSize: "0.875rem", fontWeight: "600" }} mt={1}>
                MISP
              </MDTypography>
            </Grid>
            <Grid item>
              <Checkbox
                name="Assigne"
                checked={CourseDetail.Assigne === "Agent"}
                onChange={handleCheckBox}
                value="Agent"
                disabled
              />
            </Grid>
            <Grid item>
              <MDTypography sx={{ fontSize: "0.875rem", fontWeight: "600" }} mt={1} pr={10}>
                Agent
              </MDTypography>{" "}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            xs={12}
            sm={12}
            sx={{ display: "flex", flexDirection: "row", m: 1 }}
          >
            <Grid item>
              <MDTypography sx={{ fontSize: "1rem", fontWeight: "600" }}>
                Select the Type of Course
              </MDTypography>
            </Grid>

            <Grid item>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="IRDAI"
                  checked={CourseDetail.TypeofCourse === "IRDAI"}
                  control={<Radio />}
                  onChange={handleradioChange}
                  label="IRDAI"
                  name="TypeofCourse"
                />
                <FormControlLabel
                  value="Inhouse"
                  control={<Radio />}
                  label="Inhouse"
                  checked={CourseDetail.TypeofCourse === "Inhouse"}
                  onChange={handleradioChange}
                  name="TypeofCourse"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            xs={12}
            sm={12}
            sx={{ display: "flex", flexDirection: "row", m: 1 }}
          >
            <Grid item>
              <MDTypography sx={{ fontSize: "1rem", fontWeight: "600" }}>
                Select the Line of Business
              </MDTypography>
            </Grid>

            <Grid item>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Life"
                  control={<Radio />}
                  label="Life"
                  checked={CourseDetail.LineofBusiness === "Life"}
                  onChange={handleradioChange}
                  name="LineofBusiness"
                />
                <FormControlLabel
                  value="Non-Life"
                  control={<Radio />}
                  label="Non-Life"
                  onChange={handleradioChange}
                  checked={CourseDetail.LineofBusiness === "Non-Life"}
                  name="LineofBusiness"
                />
                <FormControlLabel
                  value="Both"
                  control={<Radio />}
                  label="Both"
                  onChange={handleradioChange}
                  checked={CourseDetail.LineofBusiness === "Both"}
                  name="LineofBusiness"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            xs={12}
            sm={12}
            sx={{ display: "flex", flexDirection: "row", m: 1 }}
          >
            <Grid item>
              <MDTypography sx={{ fontSize: "1rem", fontWeight: "600" }}>
                Is it mandatory to take course
              </MDTypography>
            </Grid>

            <Grid item>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                  onChange={handleradioChange}
                  checked={CourseDetail.MandatoryCourse === "Yes"}
                  name="MandatoryCourse"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="No"
                  onChange={handleradioChange}
                  checked={CourseDetail.MandatoryCourse === "No"}
                  name="MandatoryCourse"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <MDButton variant="outlined">Save</MDButton>
        </Grid>
        <Grid item>
          <MDButton onClick={handleProceed}>Next</MDButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CourseDetails;
