import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//  import { GridToolbarExport } from "@mui/x-data-grid";

import MDTypography from "components/MDTypography";
import swal from "sweetalert";
//  import { cloneDeep } from "lodash";
// import Dropzone from "react-dropzone-uploader";
// import { DropzoneArea } from "react-mui-dropzone";
// import { makeStyles } from "@mui/styles";
// import readXlsxFile from "read-excel-file";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getRequest } from "../../../../../core/clients/axiosclient";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
//  import MDButton from "../../../../../components/MDButton";
import DataBaseBind from "../../data/DataBaseBind";
import MDDatePicker from "../../../../../components/MDDatePicker";
import { GetRateRule, RateUpload } from "../data";
import MDButton from "../../../../../components/MDButton";

const { Card, Grid, Autocomplete, Stack } = require("@mui/material");

// const useStyles = makeStyles(() => ({
//   customDropzone: {
//     // paddingBottom: "48px",
//     padding: "8px", // Adjust the value as needed
//     border: "none",

//   },

// }));

function RemoveTask() {
  return (
    <Stack justifyContent="right" direction="row" spacing={2}>
      <DeleteIcon color="primary" />
    </Stack>
  );
}
function ActionTask() {
  return (
    <Stack justifyContent="right" direction="row" spacing={2}>
      <AddCircleIcon color="primary" />
    </Stack>
  );
}

function ViewRateTable() {
  const [rule, setRule] = useState([]);
  const [post, setPost] = useState([]);
  // let fil = new FormData();
  const [flag, setFlag] = useState(false);
  const [data1, setData1] = useState([{}]);
  // const [startDate, setstartDate] = useState(new Date());
  // const [endDate, setendDate] = useState(new Date());
  // // const [show, setShow] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    rateName: "",
    rate: "",
    rateType: "",
    startDate: "",
    endDate: "",
    ConditionOperator: "",
    rateObj: "",
    isParameter: "",
    dynamicList: [],
    UploadType: "",
  });
  const fieldsD = {
    name: "",
    rateName: "",
    rate: "",
    rateType: "",
    startDate: "",
    endDate: "",
    ConditionOperator: "",
    rateObj: "",
    isParameter: "",
    dynamicList: [],
    UploadType: "",
  };
  const handleDateChange = (e, ddd, type) => {
    // debugger;
    console.log("ddd", ddd);
    fields[type] = ddd;

    setFields({ ...fields });
    console.log("date", fields);
  };

  const [columns, setColumns] = useState([
    {
      field: "Rate",
      headerName: "Rate",
      width: 150,
      editable: true,
      renderCell: () => <MDInput />,
    },
    {
      field: "Action",
      headerName: "Action To",
      width: 150,
      editable: true,
      renderCell: () => ActionTask(),
    },
    {
      field: "Remove",
      headerName: "Remove",
      width: 100,
      editable: true,
      renderCell: () => RemoveTask(),
    },
  ]);

  const columnsD = [
    {
      field: "Rate",
      headerName: "Rate",
      width: 150,
      editable: true,
      renderCell: () => <MDInput />,
    },
    {
      field: "Action",
      headerName: "Action To",
      width: 150,
      editable: true,
      renderCell: () => ActionTask(),
    },
    {
      field: "Remove",
      headerName: "Remove",
      width: 100,
      editable: true,
      renderCell: () => RemoveTask(),
    },
  ];

  const handleUpload = (e, newValue) => {
    fields.UploadType = newValue.mValue;
    setFields((prev) => ({ ...prev, ...fields }));
  };

  const handleRateObject = (e, newValue) => {
    //  debugger;
    setColumns(columnsD);
    setData1([{}]);
    if (newValue !== null) {
      fields.rateObj = newValue.mID;
      console.log("1", fields);

      const arr = rule.filter((item) => item.parameterSetName === newValue.mValue);
      console.log("13", arr);

      for (let i = arr.length - 1; i >= 0; i -= 1) {
        columns.unshift({
          field: arr[i].parameterName,
          headerName: arr[i].parameterName,
          width: 150,
        });
      }
      for (let i = 0; i <= arr.length - 1; i += 1) {
        data1[0][arr[i].parameterName] = null;
      }
      data1[0].Rate = null;
      setData1([...data1]);
      setFields((prev) => ({ ...prev, ...fields }));
      setColumns([...columns]);
    } else {
      fields.rateObj = "";
      setFields((prev) => ({ ...prev, ...fields }));
    }

    // setColumns((p) => [...p]);

    console.log("columns", columns);
  };
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const downloadSample = () => {
    const ws = XLSX.utils.json_to_sheet(data1);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(
      data,
      `${post.filter((x) => x.mID === fields.rateObj)[0].mValue}${fileExtension}`
    );
  };
  useEffect(async () => {
    const Rate = await getRequest(`RatingConfig/GetParameterSetObject`);
    setPost(Rate.data);

    await GetRateRule().then((response) => {
      setRule(response.data);
      console.log("rate", response);
    });
  }, []);
  const [file, setFiles] = useState(null);
  const handleChange = (e) => {
    // debugger;
    if (e.target.files[0] !== null) {
      setFlag(true);
      setFiles(e.target.files[0]);
    } else {
      setFlag(false);
      setFiles(null);
    }
    // const file = e.target.files[0];
    // const data = new FormData();
    // if (file !== null) {
    //   // for (let i = 0; i < files.length; i += 1) {
    //   data.append(file.name, file);
    //   // }
    //   console.log("data", data);
    //   console.log("fields", fields);
    //   fil = data;
    //   setFlag(true);
    // } else {
    //   setFlag(false);
    //   fil = new FormData();
    // }
  };
  const handleSubmit = async () => {
    //  debugger;
    fields.rateName = fields.rateName.split(" ").join("");
    fields.rateName = fields.rateName.replace(/[^a-zA-Z0-9 ]/g, "");

    if (
      fields.rateName === "" ||
      fields.rateObj === "" ||
      fields.startDate === "" ||
      fields.endDate === ""
    ) {
      swal({
        icon: "error",

        text: "Some fields are missing",
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
      const UploadFile = await RateUpload(fields, data, false);
      console.log("upload", UploadFile);
      swal({
        icon: "success",

        text: "Rate table saved successfully",
      });
      setFields(fieldsD);
      setFlag(false);
    }
  };

  const rows = [
    {
      id: 1,
      Rate: "",
      Action: "",
      Remove: "",
    },
  ];
  // const classes = useStyles();

  return (
    <Card sx={{ height: "50rem" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h5" color="primary">
            Rate Table
          </MDTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Rate Table Name"
            name="rateName"
            value={fields.rateName}
            onChange={(e) => setFields({ ...fields, rateName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="rateObj"
            value={
              fields.rateObj !== ""
                ? {
                    mID: fields.rateObj,
                    mValue: post.filter((x) => x.mID === fields.rateObj)[0].mValue,
                  }
                : { mID: 0, mValue: "" }
            }
            options={post}
            onChange={handleRateObject}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Rate Object" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker
            input={{ label: "Start Date", value: fields.startDate }}
            value={fields.startDate}
            onChange={(e, ddd) => handleDateChange(e, ddd, "startDate")}
            options={{
              // dateFormat: "d/m/Y",
              altFormat: "d/m/Y",
              altInput: true,
              minDate: new Date(),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker
            input={{ label: "End Date", value: fields.endDate }}
            value={fields.endDate}
            onChange={(e, ddd) => handleDateChange(e, ddd, "endDate")}
            options={{
              // dateFormat: "d/m/Y",
              altFormat: "d/m/Y",
              altInput: true,
              minDate: fields.startDate,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            value={
              fields.UploadType !== ""
                ? {
                    mID: DataBaseBind.Upload.filter((x) => x.mValue === fields.UploadType)[0].mID,
                    mValue: fields.UploadType,
                  }
                : { mID: 0, mValue: "" }
            }
            options={DataBaseBind.Upload}
            onChange={handleUpload}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Upload Type" />}
          />
        </Grid>
        {data1.length > 0 && Object.keys(data1[0]).length > 0 ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDButton variant="contained" onClick={downloadSample}>
              Download Sample Excel
            </MDButton>
          </Grid>
        ) : null}
      </Grid>
      {/* {show && ( */}
      {fields.UploadType === "Grid" && (
        <MDBox p={2}>
          <Stack spacing={2} direction="row">
            <MDTypography variant="h6" color="Secondary">
              Rate Parameters
            </MDTypography>
          </Stack>

          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            components={{ Toolbar: GridToolbar }}
          />
        </MDBox>
      )}

      {fields.UploadType === "Excel" && (
        <Grid
          container
          p={2}
          justifyContent="center"
          alignItems="center"
          sx={{ color: "dodgerblue", marginTop: "7%" }}
        >
          <input type="file" onChange={handleChange} />
        </Grid>
      )}
      {fields.rateName !== "" &&
        fields.rateObj !== "" &&
        fields.startDate !== "" &&
        fields.endDate !== "" &&
        fields.UploadType !== "" &&
        //  fil !== null &&
        flag === true && (
          <Grid container alignItems="center" justifyContent="center">
            <MDButton variant="contained" onClick={handleSubmit}>
              Upload
            </MDButton>
          </Grid>
        )}
    </Card>
  );
}

export default ViewRateTable;
