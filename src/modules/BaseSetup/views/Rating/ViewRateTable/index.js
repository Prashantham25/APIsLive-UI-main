import * as React from "react";
import { useState, useEffect } from "react";
// import $ from "jquery";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
// import Dropzone from "react-dropzone-uploader";
import swal from "sweetalert";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDDatePicker from "../../../../../components/MDDatePicker";

import {
  RateNameRule,
  GetParamTypeSet,
  GetGridRates,
  RateUpload,
  GetRateRule,
  // GetRateByParameter,
} from "../data";

const { Card, Grid, Autocomplete, Stack } = require("@mui/material");

function ViewRateTable() {
  const [columns, setColumns] = useState([]);
  // const [columns1, setColumns1] = useState([]);
  const [rows, setRows] = useState([]);
  // const [rows1, setRows1] = useState([]);

  const [parameterList1, setParameterList1] = useState([]);
  console.log(parameterList1);
  // const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  // const [flag2, setFlag2] = useState(false);
  // const [flag3, setFlag3] = useState(false);
  // const [flag4, setFlag4] = useState(false);
  // const [flag5, setFlag5] = useState(false);
  const [versionFlag, setVersionFlag] = useState(false);
  const [rateObj, setRateObj] = useState({
    rateName: "",

    startDate: "",
    endDate: "",
    rateObj: "",
  });
  const rateObjD = {
    rateName: "",

    startDate: "",
    endDate: "",
    rateObj: "",
  };
  const [param, setParam] = useState({
    EventId: "",
  });
  const [fields, setFields] = useState({
    RateName: "",
  });
  // const [obj, setObj] = useState({
  //   filetrArray: [],
  // });
  const [startDate, setStartDate] = useState(null);
  const [rateObject, setRateObject] = useState([]);
  const handleGetevent = async (EventId, newValue) => {
    //  setFlag(false);
    const date = new Date(newValue.fromDate);
    setFlag1(false);
    setVersionFlag(false);
    setRateObj(rateObjD);
    fields.RateName = newValue.mID;
    rateObj.rateName = newValue.mValue;

    rateObj.rateObj = rateObject.filter(
      (x) => x.parameterSetName === newValue.rateObj
    )[0].parameterSetID;
    // rateObj.T
    // console.log(fields);
    date.setDate(date.getDate() + 1);
    setStartDate(date);
    setFields(fields);

    if (param.EventId !== newValue.EventId) {
      setParameterList1([]);
    } else {
      param.EventId = newValue.EventId;
    }

    setParam(param);
    const GetParam = await GetParamTypeSet(newValue.mID);
    console.log("param", GetParam);
    setParameterList1(GetParam.data);

    // for (let i = 0; i < GetParam.data.length; i += 1) {
    //   obj.filetrArray.push({
    //     pamaterId: GetParam.data[i].parametersId,
    //     parameterValueFrom: "",
    //     parameterValueTo: null,
    //   });
    // }
    // setObj((prev) => ({ ...prev, ...obj }));
    setRateObj((prev) => ({ ...prev, ...rateObj }));
  };

  const [post, setPost] = useState([]);
  useEffect(async () => {
    RateNameRule().then((response) => {
      setPost(response);
      console.log("12", response);
    });
    const rateObj1 = await GetRateRule();
    setRateObject(rateObj1.data);
  }, []);
  // const handleInputChange = (e, index) => {
  //   obj.filetrArray[index].parameterValueFrom = e.target.value;
  //   setObj((prev) => ({ ...prev, ...obj }));

  //   console.log("value", fields);
  // };
  // const handleSearch = () => {
  //   if (fields.RateName !== "") {
  //     setFlag(true);
  //   } else {
  //     swal({
  //       icon: "error",
  //       text: "Please select Rate",
  //     });
  //   }
  // };
  const handleVersion = () => {
    setVersionFlag(true);
  };
  // const handleUpload = () => {
  //   setFlag3(true);
  // };
  // const handleUpload1 = () => {
  //   if (fields.RateName !== "") {
  //     setFlag4(true);
  //   } else {
  //     swal({
  //       icon: "error",
  //       text: "Please select Rate",
  //     });
  //   }
  // };

  const handlechange4 = async () => {
    if (fields.RateName !== "") {
      const r1 = await GetGridRates(fields.RateName);

      console.log("11", r1);

      setFlag1(true);

      if (Array.isArray(r1.data.ltObj)) {
        const arr1 = [];
        const arr2 = r1.data.ltObj;
        const name = "id";
        const keys = Object.keys(r1.data.ltObj[0]);
        keys.forEach((x) => {
          arr1.push({ field: x, headerName: x, width: 200 });
        });
        setColumns(arr1);

        arr2.forEach((rr, index) => {
          arr2[index][name] = index;
        });
        setRows(arr2);
      }
    } else {
      swal({
        icon: "error",
        text: "Please Select Rate",
      });
    }
  };
  // const handleGetRates = async () => {
  //   // setFlag2(true);
  //   setFlag5(true);

  //   const r2 = await GetRateByParameter(fields.RateName, obj);

  //   console.log("11", r2);

  //   if (Array.isArray(r2.data.ltObj)) {
  //     const arr1 = [];
  //     const arr2 = r2.data.ltObj;
  //     const name = "id";
  //     const keys = Object.keys(r2.data.ltObj[0]);
  //     keys.forEach((x) => {
  //       arr1.push({ field: x, headerName: x, width: 200 });
  //     });
  //     setColumns1(arr1);

  //     arr2.forEach((rr, index) => {
  //       arr2[index][name] = index;
  //     });
  //     setRows1(arr2);
  //   }
  // };

  // const handleChangeStatus = ({ meta, file }, status) => {
  //   console.log(status, meta, file);
  // };

  // const handleSubmit = async (files) => {
  //   if (fields.RateName !== "") console.log(files.map((f) => f.meta));
  //   const data = new FormData();
  //   if (files.length > 0) {
  //     for (let i = 0; i < files.length; i += 1) {
  //       data.append(files[i].file.name, files[i].file);
  //     }
  //     console.log("data", data);
  //     //  console.log("fields", fields);
  //   }
  //   if (fields.RateName !== undefined && obj.filetrArray.length > 0) {
  //     data.append("Param", JSON.stringify(obj));
  //   }
  //   if (fields.RateName === "") {
  //     swal({
  //       icon: "error",

  //       text: "some fields are missing",
  //     });
  //   } else {
  //     await $.ajax({
  //       type: "POST",
  //       url: `${process.env.REACT_APP_BASEURL}/RatingConfig/RateReupload?RatingId=${fields.RateName}`,
  //       contentType: false,
  //       processData: false,
  //       data,
  //       body: JSON.stringify(obj),
  //       beforeSend: (xhr) => {
  //         xhr.setRequestHeader(
  //           "Authorization",
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1Y2M0ZTFjZi04MzYxLTQwY2QtODVjMC1hMjE3YThiZGEwYTYiLCJFbWFpbCI6Im9taS5hc2hpc2hAZ21haWwuY29tIiwiT3JnSWQiOiIxMTIiLCJQYXJ0bmVySWQiOiIiLCJSb2xlIjoiQmVuZWZpdCBTdXBlcnZpc29yIiwiTmFtZSI6IkFkbWluIiwiVXNlck5hbWUiOiJlaW51YmVhZG1pbiIsIlByb2R1Y3RUeXBlIjoiTWljYSIsIlNlcnZlclR5cGUiOiIyOTciLCJleHAiOjE3OTMzNDA1NTIsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.iKuuYvyVMt8zBfTPEYdowvFDkcWdzQxjJj3Ya5D3ls0"
  //         );
  //       },

  //       success: () => {
  //         swal({
  //           text: "Rate table saved successfully",
  //           icon: "success",
  //         });
  //       },
  //     });
  //   }
  // };
  const [file, setFiles] = useState(null);
  const [f1, setF1] = useState(false);

  const handleDateChange = (e, date, type) => {
    // debugger;
    rateObj[type] = date;
    setRateObj((prev) => ({ ...prev, ...rateObj }));
  };
  const handleChange = (e) => {
    // debugger;
    if (e.target.files[0] !== null) {
      setF1(true);
      setFiles(e.target.files[0]);
    } else {
      setF1(false);
      setFiles(null);
    }
  };
  const handleSubmit = async () => {
    //  debugger;
    // rateObj.rateName = rateObj.rateName.split(" ").join("");
    // rateObj.rateName = rateObj.rateName.replace(/[^a-zA-Z0-9 ]/g, "");

    if (
      rateObj.rateName === "" ||
      rateObj.rateObj === "" ||
      rateObj.startDate === "" ||
      rateObj.endDate === ""
    ) {
      swal({
        icon: "error",

        text: "Please choose From and To Dates",
      });
    } else {
      const data = new FormData();
      if (file.name !== "") {
        // for (let i = 0; i < files.length; i += 1) {
        data.append(file.name, file);
        // }
        // console.log("data", data);
        // console.log("fields", fields);
      }
      const rateName = rateObj.rateName.split("-")[0];
      rateObj.rateName = rateName;
      const UploadFile = await RateUpload(rateObj, data, versionFlag);
      // debugger;
      console.log("upload", UploadFile);
      swal({
        icon: "success",

        text: "Rate table uploaded successfully",
      });
      // setFields(fieldsD);
      setRateObj(rateObjD);
      setF1(false);
      setVersionFlag(false);
      setFlag1(false);
    }
  };
  return (
    <Card sx={{ height: "100rem" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h4" color="primary">
            View Rate Table
          </MDTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="Rate Name"
            name="Rate Name"
            options={post}
            onChange={handleGetevent}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            value={
              rateObj.rateName !== ""
                ? {
                    mID: post.filter((x) => x.mValue === rateObj.rateName)[0].mID,
                    mValue: rateObj.rateName,
                  }
                : { mID: 0, mValue: "" }
            }
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Rate Name" />}
          />
        </Grid>
        <Grid item>
          <Stack spacing={2} direction="row">
            <MDButton variant="contained" onClick={handlechange4}>
              View
            </MDButton>
            {/* <MDButton variant="contained" onClick={handleSearch}>
              Edit
            </MDButton> */}
            {/* <MDButton variant="contained" onClick={handleUpload1}>
              Upload New Rate
            </MDButton> */}
            <MDButton variant="contained" onClick={handleVersion}>
              Upload New Version
            </MDButton>
          </Stack>
        </Grid>
        {/* {flag4 === true ? (
          <Grid container justifyContent="center" p={2}>
            <Dropzone maxFiles={1} onChangeStatus={handleChangeStatus} onSubmit={handleSubmit} />
          </Grid>
        ) : null} */}
      </Grid>
      {versionFlag === true ? (
        <>
          <Grid container p={2} spacing={2}>
            <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
              <MDDatePicker
                input={{ label: "Start Date", value: rateObj.startDate }}
                value={rateObj.startDate}
                onChange={(e, ddd) => handleDateChange(e, ddd, "startDate")}
                options={{
                  // dateFormat: "d/m/Y",
                  altFormat: "d/m/Y",
                  altInput: true,
                  minDate: startDate,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
              <MDDatePicker
                input={{ label: "End Date", value: rateObj.endDate }}
                value={rateObj.endDate}
                onChange={(e, ddd) => handleDateChange(e, ddd, "endDate")}
                options={{
                  // dateFormat: "d/m/Y",
                  altFormat: "d/m/Y",
                  altInput: true,
                  minDate: rateObj.startDate,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            p={2}
            justifyContent="center"
            alignItems="center"
            sx={{ color: "dodgerblue", marginTop: "7%" }}
          >
            <input type="file" onChange={handleChange} />
          </Grid>

          {rateObj.rateName !== "" &&
            rateObj.rateObj !== "" &&
            rateObj.startDate !== "" &&
            rateObj.endDate !== "" &&
            //  fil !== null &&
            f1 === true && (
              <Grid container alignItems="center" justifyContent="center">
                <MDButton variant="contained" onClick={handleSubmit}>
                  Upload
                </MDButton>
              </Grid>
            )}
        </>
      ) : null}
      {/* {flag === true ? (
        //for edit
        <Grid container spacing={2} p={2}>
          <Stack direction="row" spacing={2} px={2}>
            {parameterList1.map((row, index) => (
              <MDInput
                label={row.parameterName}
                name={row.parameterName}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </Stack>

          <Grid item>
            <Stack spacing={2} direction="row">
              <MDButton variant="contained" onClick={handleGetRates}>
                Get Rates
              </MDButton>
              {flag5 === true ? <MDButton onClick={handleUpload}>Upload Rates</MDButton> : null}
            </Stack>
          </Grid>
        </Grid>
      ) : null} */}
      {/* {flag3 === true ? (
        <Grid container justifyContent="center" p={2}>
          <Dropzone maxFiles={1} onChangeStatus={handleChangeStatus} onSubmit={handleSubmit} />
        </Grid>
      ) : null} */}
      {/* {flag2 === true ? (
        <MDBox p={2}>
          <Stack spacing={2} direction="row" p={2}>
            <MDTypography color="Secondary"> Rate Table</MDTypography>
          </Stack>

          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              autoHeight
              rows={rows1}
              columns={columns1}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 15, 20]}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        </MDBox>
      ) : null} */}
      <MDBox p={2} sx={{ width: "100%" }}>
        {flag1 === true && versionFlag === false ? (
          // <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            components={{ Toolbar: GridToolbar }}
          />
        ) : // </div>
        null}
      </MDBox>
    </Card>
  );
}

export default ViewRateTable;
