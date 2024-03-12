import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import swal from "sweetalert";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDDatePicker from "components/MDDatePicker";
import MDButton from "components/MDButton";

import { GetDynamicPermissions, GetParameters, QueryExecution, GetProductName } from "./data/index";

const { Grid, Autocomplete, Stack, Backdrop, CircularProgress, Card } = require("@mui/material");

function ReportExecution() {
  const [finalReportResponse, setFinalReportResponse] = useState([]);
  const [flagD, setFlagD] = useState(false);
  const [planflag, setplanflag] = useState(false);
  const [gridflag, setgridflag] = useState(false);
  const [filterflag, setfilterflag] = useState(false);
  const [finalReport, setFinalReport] = useState({});
  const [d1, setD1] = useState([]);
  const [a, setA] = useState([]);
  const [column, setColumn] = useState([]);
  const [rows, setRows] = useState([]);
  const [reportValue, setReportsValue] = useState([]);
  const [reportParameterList, setReportParameterList] = useState([]);
  const [reportTask, setReportTask] = useState({ reportName: "" });
  // const reportTaskD = { reportName: "" };
  const [reportConfigDto, setReportConfigDto] = useState({
    ReportConfigId: "",
    paramList: [],
  });
  const [productname, setProductName] = useState([]);
  useEffect(async () => {
    const product = await GetProductName();
    setProductName(product);
    console.log("123", productname);
  }, []);
  const [reportDate, setReportDate] = useState([]);
  // const reportConfigDtoD = { ReportConfigId: "", paramList: [] };
  useEffect(async () => {
    await GetDynamicPermissions().then((response) => {
      setReportsValue([...response]);
      console.log("print", response);
      console.log("reportValue", reportValue);
    });
  }, []);

  const handleChange = async (e, value) => {
    setReportDate([]);
    setFlagD(true);
    setRows([]);
    setColumn([]);
    reportTask.reportName = value.mValue;
    setReportTask(reportTask);
    reportConfigDto.ReportConfigId = value.mID;
    const abc = await GetParameters(value.mID);
    console.log("abc", abc);
    reportConfigDto.paramList = [];
    abc.forEach((x) => {
      reportConfigDto.paramList.push({
        parameterName: x.parameterName,
      });
      d1.push({
        [x.parameterName]: "",
      });
    });
    const updatedA1 = abc.map((x) => ({
      [x.parameterName]: x.parameterValue,
    }));
    console.log("bbb", updatedA1);
    setA(updatedA1);
    setD1(d1);
    setReportConfigDto({ ...reportConfigDto });
    setReportParameterList(abc);
    setfilterflag(true);
    console.log("reportParameterList", reportConfigDto);
  };
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
    console.log("finalReport", finalReport);
    console.log("reportDate", reportDate);
  };

  const handleAutoChange = (e, value, type) => {
    reportConfigDto.paramList.forEach((x, index) => {
      if (x.parameterName === type) {
        reportConfigDto.paramList[index].parameterValue = value.mValue;
      }
    });
    a.forEach((x1, ind) => {
      if (x1.parameterName === type) {
        a[ind].parameterValue = value.mValue;
      }
    });
    setFinalReport({ ...reportConfigDto });
    setA(a);
    console.log("reportParameterList", reportParameterList);
  };

  const handleGenerate = async () => {
    setgridflag(true);
    setplanflag(true);
    console.log("backdropflag", planflag);
    setReportConfigDto({ ...reportConfigDto });
    const callGenerate = await QueryExecution(reportConfigDto);
    console.log("callGenerate", callGenerate);
    setFinalReportResponse(callGenerate);
    // const checkempty = callGenerate.data;
    if (callGenerate.data.length === 0) {
      swal({
        text: "Sorry No Data Found",
        icon: "error",
      });
      setplanflag(false);
    } else {
      const rowss = callGenerate.data;
      const updatedRows = rowss.map((x, key) => ({ ...x, id: key }));
      setRows(updatedRows);
      setplanflag(false);
      console.log("rows", rows);

      console.log("backdropflag", planflag);
      const columns = Object.keys(rowss.reduce((prev, next) => ({ ...prev, ...next }))).map(
        (key) => ({
          field: key,

          headerName: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
          minWidth: 250,
          flex: 1,
          headerAlign: "center",
          align: "center",
        })
      );
      setColumn(columns);
      console.log("column", column);
      console.log("rows", rows);
      console.log("finalReportResponse", finalReportResponse);
    }
  };

  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Report Generation
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
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
                            value: [d1[i][x.parameterName]],
                          }}
                          onChange={(e, date) => handleDateChange(e, date, x.parameterName)}
                          value={d1[i][x.parameterName]}
                          options={{
                            dateFormat: "Y-m-d",
                            altFormat: "d/m/Y",
                            altInput: true,
                          }}
                        />
                      </Grid>
                    );
                  }
                  if (x.dataType === "Dropdown") {
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
                        <Autocomplete
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="ReportName"
                          name=""
                          options={productname}
                          value={a[i][x.parameterName]}
                          onChange={(e, value) => handleAutoChange(e, value, x.parameterName)}
                          getOptionLabel={(option) => option.mValue}
                          renderInput={(params) => (
                            <MDInput {...params} label={x.parameterName} required />
                          )}
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
      </Grid>
    </Card>
  );
}

export default ReportExecution;
