import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import swal from "sweetalert";
import MDTypography from "components/MDTypography";
import MDBox from "../../../../../components/MDBox";
// import BaseSetupDataBind from "modules/BaseSetup/views/data/BaseSetupDataBind";
import { GetDynamicPermissions, GetParameters, QueryExecution } from "../data";

import MDInput from "../../../../../components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDButton from "../../../../../components/MDButton";

const { Grid, Autocomplete, Stack, Backdrop, CircularProgress } = require("@mui/material");

function ReportGeneration() {
  const [finalReportResponse, setFinalReportResponse] = useState([]);
  // const [flag, setFlag] = useState(false);
  const [flagD, setFlagD] = useState(false);

  const [planflag, setplanflag] = useState(false);

  const [gridflag, setgridflag] = useState(false);

  const [filterflag, setfilterflag] = useState(false);
  const [finalReport, setFinalReport] = useState({});
  // const [obj, setObj] = useState({});
  const [d1, setD1] = useState([]);
  const [column, setColumn] = useState([]);
  const [rows, setRows] = useState([]);
  const [reportValue, setReportsValue] = useState([]);
  const [reportParameterList, setReportParameterList] = useState([]);
  const [reportTask, setReportTask] = useState({ reportName: "" });
  const reportTaskD = { reportName: "" };
  const [reportConfigDto, setReportConfigDto] = useState({
    ReportConfigId: "",
    paramList: [],
  });
  // const reportConfigDtoD = { ReportConfigId: "", paramList: [] };
  const [reportDate, setReportDate] = useState([]);

  const reportConfigDtoD = { ReportConfigId: "", paramList: [] };

  useEffect(async () => {
    await GetDynamicPermissions().then((response) => {
      setReportsValue([...response]);
      console.log("print", response);
    });
  }, []);
  console.log("reportValue", reportValue);

  const handleChange = async (e, value) => {
    setReportDate([]);
    setFlagD(true);
    setRows([]);
    setColumn([]);
    reportTask.reportName = value.mValue;
    setReportTask(reportTask);
    reportConfigDto.ReportConfigId = value.mID;
    // setReportConfigDto(reportConfigDto);
    // console.log("reportConfigDto", reportConfigDto);
    const abc = await GetParameters(value.mID);
    console.log("abc", abc);
    reportConfigDto.paramList = [];
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date();

    abc.forEach((x) => {
      reportConfigDto.paramList.push({
        parameterName: x.parameterName,
        parameterValue: `${format(dt.getFullYear())}-${format(dt.getMonth() + 1)}-${dt.getDate()}`,
      });

      // d1.push(x.parameterName);
      d1.push({
        [x.parameterName]: new Date(),
      });
    });
    if (reportTask.reportName === "NivaGroup_DailyMISReport") {
      reportConfigDto.paramList.push({
        parameterName: "PartnerName",
        parameterValue: "",
      });
    }
    setD1(d1);
    setReportConfigDto({ ...reportConfigDto });
    setReportParameterList(abc);

    setfilterflag(true);
    // setReportConfigDto(d1);

    console.log("reportParameterList", reportConfigDto);
  };
  // const handleDateChange = (e, date, type) => {
  //   //
  //   // setReportDate((prev) => [...prev, ...reportDateD]);
  //   setObj({ ...obj, parameterName: type, parameterValue: date });
  //   reportConfigDto.paramList = [
  //     ...reportConfigDto.paramList,
  //     { parameterName: type, parameterValue: date },
  //   ];

  //   setFinalReport({ ...reportConfigDto });
  //   // setReportDate([...reportDate, { parameterName: type, parameterValue: date }]);
  //   setReportDate((prev) => [...prev, { parameterName: type, parameterValue: date }]);

  //   // setReportDate([...reportDate]);
  // };

  const handleDateChange = (e, date, type) => {
    reportConfigDto.paramList.forEach((x, index) => {
      if (x.parameterName === type) {
        reportConfigDto.paramList[index].parameterValue = date;
      }
    });
    d1.forEach((x1, ind) => {
      if (x1.parameterName === type) {
        d1[ind].parameterValue = date;
      }
    });
    setFinalReport({ ...reportConfigDto });
    setD1(d1);
  };

  // const handleDateChange = (e, date, type) => {
  //   const updatedParamList = reportConfigDto.paramList.map((param) => {
  //     if (param.parameterName === type) {
  //       return {
  //         ...param,
  //         parameterValue: date,
  //       };
  //     }
  //     return param;
  //   });
  //   setReportConfigDto({
  //     ...reportConfigDto,
  //     paramList: updatedParamList,
  //   });
  // };

  const handleinputchange = (e, type) => {
    reportConfigDto.paramList.forEach((x, index) => {
      if (x.parameterName === type) {
        reportConfigDto.paramList[index].parameterValue = e.target.value;
        // x.parameterValue = e.target.value;
      }
    });

    setFinalReport({ ...reportConfigDto });
  };
  console.log("finalReport", finalReport);
  console.log("reportDate", reportDate);

  // useEffect(() => {
  //   console.log("obj", obj);
  // }, [obj]);

  console.log("reportParameterList", reportParameterList);

  const handleGenerate = async () => {
    setgridflag(true);

    setplanflag(true);

    console.log("backdropflag", planflag);
    // if (reportConfigDto.ReportConfigId < 188 || reportConfigDto.ReportConfigId > 233) {
    //   const callGenerate = await QueryExecution(reportConfigDto);
    //   console.log("callGenerate", callGenerate);

    //   if (callGenerate.data.length > 0) {
    //     setFinalReportResponse(callGenerate);

    //     const rowss = callGenerate.data;
    //     // rowss.map((x, key) => {
    //     //   const newObj = [{ ...x, id: key }];
    //     //   console.log("newObj", newObj);
    //     //   setRows(newObj);
    //     // });
    //     const updatedRows = rowss.map((x, key) => ({ ...x, id: key }));
    //     setRows(updatedRows);
    //     setplanflag(false);
    //     console.log("rows", rows);

    //     console.log("backdropflag", planflag);

    //     // const columns = Object.keys(callGenerate.data).map((key, id) => ({
    //     //   field: key,
    //     //   id: id,
    //     //   headerName: key,
    //     //   width: 100,
    //     // }));
    //     // setColumn(columns);

    //     const columns = Object.keys(rowss.reduce((prev, next) => ({ ...prev, ...next }))).map(
    //       (key) => ({
    //         field: key,

    //         headerName: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    //         minWidth: 250,
    //         flex: 1,
    //         headerAlign: "center",
    //         align: "center",
    //       })
    //     );
    //     setColumn(columns);
    //     setReportTask(reportTaskD);
    //     setReportConfigDto(reportConfigDtoD);

    //     reportConfigDto.paramList = [];
    //     console.log("deleted", reportConfigDto);
    //     setReportConfigDto({ ...reportConfigDto });
    //   } else {
    //     swal({
    //       text: "Sorry No Data Found",
    //       icon: "error",
    //     });
    //     setplanflag(false);
    //   }
    // }

    // else {
    // reportConfigDto.paramList = [];

    setReportConfigDto({ ...reportConfigDto });

    const callGenerate = await QueryExecution(reportConfigDto);
    console.log("callGenerate", callGenerate);

    setFinalReportResponse(callGenerate);
    const checkempty = callGenerate.data;

    const chkobj = Object.keys(
      Array.isArray(checkempty) && checkempty.length > 0 ? checkempty[0] : {}
    );

    if (callGenerate.data.length === 0) {
      swal({
        text: "Sorry No Data Found",
        icon: "error",
      });
      setplanflag(false);
    } else if (chkobj.length > 0 && callGenerate.data[0] === "") {
      setRows([]);
      setplanflag(false);

      const rowss = callGenerate.data;
      // rowss.map((x, key) => {
      //   const newObj = [{ ...x, id: key }];
      //   console.log("newObj", newObj);
      //   setRows(newObj);
      // });

      setplanflag(false);
      console.log("rows", rows);

      console.log("backdropflag", planflag);

      // const columns = Object.keys(callGenerate.data).map((key, id) => ({
      //   field: key,
      //   id: id,
      //   headerName: key,
      //   width: 100,
      // }));
      // setColumn(columns);

      const columns = Object.keys(rowss.reduce((prev, next) => ({ ...prev, ...next }))).map(
        (key) => ({
          field: key,
          headerName:
            key.indexOf(" ") > 0
              ? key.charAt(0).toUpperCase() +
                key.slice(1, key.indexOf(" ") + 1).toLowerCase() +
                key.charAt(key.indexOf(" ") + 1).toUpperCase() +
                key.slice(key.indexOf(" ") + 2).toLowerCase()
              : key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
          minWidth: 250,
          flex: 1,
          headerAlign: "center",
          align: "center",
        })
      );
      setColumn(columns);
      setReportTask(reportTaskD);
      setReportConfigDto(reportConfigDtoD);

      reportConfigDto.paramList = [];
      console.log("deleted", reportConfigDto);
      setReportConfigDto({ ...reportConfigDto });
    } else {
      const rowss = callGenerate.data;
      // rowss.map((x, key) => {
      //   const newObj = [{ ...x, id: key }];
      //   console.log("newObj", newObj);
      //   setRows(newObj);
      // });
      const updatedRows = rowss.map((x, key) => ({ ...x, id: key }));
      setRows(updatedRows);
      setplanflag(false);
      console.log("rows", rows);

      console.log("backdropflag", planflag);

      // const columns = Object.keys(callGenerate.data).map((key, id) => ({
      //   field: key,
      //   id: id,
      //   headerName: key,
      //   width: 100,
      // }));
      // setColumn(columns);

      const columns = Object.keys(rowss.reduce((prev, next) => ({ ...prev, ...next }))).map(
        (key) => ({
          field: key,
          headerName:
            key.indexOf(" ") > 0
              ? key.charAt(0).toUpperCase() +
                key.slice(1, key.indexOf(" ") + 1).toLowerCase() +
                key.charAt(key.indexOf(" ") + 1).toUpperCase() +
                key.slice(key.indexOf(" ") + 2).toLowerCase()
              : key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
          minWidth: 250,
          flex: 1,
          headerAlign: "center",
          align: "center",
        })
      );
      setColumn(columns);
      setReportTask(reportTaskD);
      setReportConfigDto(reportConfigDtoD);

      reportConfigDto.paramList = [];
      console.log("deleted", reportConfigDto);
      setReportConfigDto({ ...reportConfigDto });
    }
    // }
  };
  console.log("column", column);
  console.log("rows", rows);

  console.log("finalReportResponse", finalReportResponse);
  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h6" color="primary">
          Report Generation
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        {/* <MDInput label="Report Name" /> */}
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          id="ReportName"
          name="Report Name"
          options={reportValue}
          value={{ mValue: reportTask.reportName }}
          onChange={handleChange}
          getOptionLabel={(option) => option.mValue}
          renderInput={(params) => <MDInput {...params} label="Report Name" required />}
        />
      </Grid>
      {filterflag && (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {flagD === true ? <MDTypography variant="h6">CRITERIA</MDTypography> : null}

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              spacing={2}
              px={2}
            >
              {reportParameterList.map((x, i) => {
                if (x.dataType !== "Date") {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={4}
                      lg={4}
                      xl={4}
                      xxl={4}
                      sx={{ mt: 2 }}
                      spacing={2}
                    >
                      <MDInput
                        label={x.parameterName}
                        onChange={(e) => handleinputchange(e, x.parameterName)}
                      />
                    </Grid>
                  );
                }
                if (x.dataType === "Date") {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={4}
                      lg={4}
                      xl={4}
                      xxl={4}
                      sx={{ mt: 2 }}
                      spacing={2}
                    >
                      <MDDatePicker
                        input={{
                          label: x.parameterName,
                          value: " ",
                        }}
                        // name={x.parameterName}
                        onChange={(e, date) => handleDateChange(e, date, x.parameterName)}
                        value={d1[i][x.parameterName]}
                        // value={d1}

                        options={{
                          dateFormat: "Y-m-d",
                          altFormat: "d/m/Y",
                          altInput: true,
                        }}

                        // formControlProps={{ fullWidth: true }}
                        // value={x.parameterName}
                      />
                    </Grid>
                  );
                }
                return null;
              })}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="right" direction="row">
              <MDButton onClick={handleGenerate}>GENERATE</MDButton>
            </Stack>
          </Grid>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={planflag}
          >
            <CircularProgress />
          </Backdrop>
        </>
      )}
      {/* {rows.length > 0 ? ( */}
      <>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={6} px={2}>
            {reportDate.map((param) => (
              <MDTypography variant="h6" key={param.parameterName}>
                <strong>
                  {" "}
                  {param.parameterName}: {param.parameterValue}
                </strong>
              </MDTypography>
            ))}
          </Stack>
        </Grid>
        {gridflag && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" color="ffffff">
              <strong> Report Details </strong>
            </MDTypography>
            <MDBox
              sx={{
                width: "100%",
              }}
            >
              <DataGrid
                rows={rows}
                columns={column}
                rowsPerPageOptions={[5]}
                autoHeight
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
              />
            </MDBox>
          </Grid>
        )}
      </>
      {/* ) : null} */}
    </Grid>
  );
}

export default ReportGeneration;
