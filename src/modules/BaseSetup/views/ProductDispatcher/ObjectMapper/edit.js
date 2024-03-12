import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import readXlsxFile from "read-excel-file";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import DeleteIcon from "@mui/icons-material/Delete";

import MDTypography from "components/MDTypography";
// import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, Tabs, Tab } from "@mui/material";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";

// import { targetcomponentAPI } from "../../../data";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <MDBox sx={{ p: 3 }}>
          <MDTypography>{children}</MDTypography>
        </MDBox>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const { Grid, Stack, Autocomplete, IconButton } = require("@mui/material");

function Edit({
  FinalMapperDTO,
  handleTargetModal,
  mapperDetailsDTObject,
  setMapperDetailsDTObject,
  rows1,
  setRows1,
  sourceComponents,
  handleClick1,
  handleCheckBox,
  targetPram,
  sourceObj,
}) {
  console.log("ssr", sourceComponents);
  console.log("sks", FinalMapperDTO);
  const [value1, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [sampleData, setSampleData] = useState([]);
  const [object, setObject] = useState({
    sourceParameter: "",
    //  SourceParameterId: "",
    // TargetParameterId: "",
    targetParameter: "",
    targetParameterPath: "",
    isBody: "1",
    isValue: "",
    isArray: "",
    isHeader: "",
    fldLength: 0,
    sortOrder: 0,
    dataType: "",
  });
  console.log(setObject);
  useEffect(() => {
    // debugger;
    if (sourceComponents.length > 0 && FinalMapperDTO.length > 0) {
      let arr = [];
      sourceComponents.forEach((x) => {
        object.sourceParameter = x.mValue;

        arr = [...arr, { ...object }];
      });

      // sampleData.forEach((b,j)=>{
      FinalMapperDTO.forEach((x, i) => {
        if (x.mValue.split(".").length > 0) {
          const ab = x.mValue;
          const ac = ab.split(".");
          const a = ac.pop();
          const ad = ac.join(".");
          if (arr[i] !== undefined) {
            arr[i].targetParameter = a;
            // arr[i].targetParameterId = x.mID;
            arr[i].targetParameterPath = ad;
          } else {
            arr = [
              ...arr,
              { ...object, sourceParameter: "", targetParameter: a, targetParameterPath: ad },
            ];
          }
        } else {
          arr[i].targetParameter = x.mValue;
          // arr[i].targetParameterId = x.mID;
        }
      });
      setSampleData([...sampleData, ...arr]);

      // })
    }
  }, []);

  const data1 = [
    {
      sourceParameter: "",
      //  SourceParameterId: "",
      // TargetParameterId: "",
      targetParameter: "",
      targetParameterPath: "",
      isBody: "",
      isValue: "",
      isArray: "",
      isHeader: "",
      fldLength: 0,
      sortOrder: 0,
      dataType: "",
    },
  ];

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    // debugger;
    console.log("sampleData", sampleData);
    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Mapping Data${fileExtension}`);
  };
  const downloadSample = () => {
    const ws = XLSX.utils.json_to_sheet(data1);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Sample${fileExtension}`);
  };
  const columns = [
    { field: "id", headerName: "S.No", width: 150 },
    { field: "sourceParameter", headerName: "Source Component", width: 200 },
    { field: "targetParameter", headerName: "Target Component", width: 200 },
    { field: "isArray", headerName: "IS Array", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      editable: true,
      renderCell: (param) => {
        const deleteRow = () => {
          const newArray = rows1.filter((row) => row.id !== param.id);
          setRows1([...newArray]);
        };
        return (
          <IconButton onClick={deleteRow}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  // useEffect(() => {
  //   debugger;
  //   if(document.getElementById("upload")!==null){
  //     const input = document.getElementById("upload");
  //     input.addEventListener("change", () => {
  //       readXlsxFile(input.files[0]).then((rows) => {
  //         console.log("rows", rows);
  //         // const data = rows.map((data) => {
  //         //   // return {
  //         //   //   url: data[1],
  //         //   // };
  //         // });
  //         // setData(data);
  //       });
  //     });
  //   }

  // }, []);
  const handleUpload = async () => {
    //  debugger;
    if (document.getElementById("upload") !== null) {
      const input = document.getElementById("upload");
      // input.addEventListener("change", async() => {
      // readXlsxFile(input.files[0]).then((rows) => {
      //   console.log("rows", rows);
      //   handleClick1("excel", rows);

      // });
      const rows = await readXlsxFile(input.files[0]);
      handleClick1("excel", rows);
      // });
    }
  };
  return (
    <MDBox>
      <MDBox sx={{ width: "50%", "margin-left": "327px" }}>
        <Tabs value={value1} onChange={handleChange} variant="fullWidth" centered>
          <Tab style={{ "font-size": "medium" }} label="One to One Mapping" {...a11yProps(0)} />
          <Tab style={{ "font-size": "medium" }} label="Excel Upload" {...a11yProps(1)} />
        </Tabs>
      </MDBox>
      <TabPanel value={value1} index={0}>
        <Stack justifyContent="center" direction="row">
          <MDTypography variant="h6" color="primary">
            Map Product Parameter to Rate/Rule Parameter
          </MDTypography>
        </Stack>

        <Grid container spacing={2} p={2}>
          <Stack justifyContent="left" direction="row" p={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={mapperDetailsDTObject.isValue}
                  onChange={(e) => handleCheckBox(e)}
                  color="primary"
                />
              }
              name="isValue"
              label="Is Source/Value"
            />
          </Stack>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            {/* <MDInput label="DB Schema" /> */}
            {mapperDetailsDTObject.isValue ? (
              <MDInput
                label="Source Value"
                value={mapperDetailsDTObject.sourceParameter}
                onChange={(e) =>
                  setMapperDetailsDTObject({
                    ...mapperDetailsDTObject,
                    sourceParameter: e.target.value,
                    sourceParameterId: e.target.value,
                  })
                }
              />
            ) : (
              <Autocomplete
                id="sourceParameterId"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={sourceComponents}
                onChange={(e, value) => handleTargetModal(e, value, "sourceParameter")}
                // value={{ mValue: mapperDetailsDTObject.sourceParameter }}
                value={sourceObj}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Source Parameter" required />}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              id="targetParameterId"
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={FinalMapperDTO}
              onChange={(e, value) => handleTargetModal(e, value, "targetParameter")}
              // value={{ mValue: mapperDetailsDTObject.targetParameter }}
              value={targetPram}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Target Parameter" required />}
            />
          </Grid>
          <Stack justifyContent="right" direction="row" p={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isArray"
                  // onChange={handleCheckBox}
                  checked={mapperDetailsDTObject.isArray}
                  onChange={(e) => handleCheckBox(e)}
                  color="primary"
                />
              }
              // onChange={handleCheckBox}
              label="Is Array"
            />
          </Stack>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="right" direction="row">
              <MDButton onClick={handleClick1}>MAP</MDButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                autoHeight
                rows={rows1}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
            {/* <Stack justifyContent="right" direction="row">
            <MDButton onClick={handleClose}>OK</MDButton>
          </Stack> */}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value1} index={1}>
        {/* <Grid container> */}
        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDTypography variant="h6">Excel Upload</MDTypography>
          </Grid> */}
        <Stack direction="row" spacing={2}>
          <MDButton onClick={exportToCSV}>Download Mapping Data</MDButton>
          <MDButton onClick={downloadSample}>Download Sample Excel</MDButton>
        </Stack>
        <br />
        <Grid container justifyContent="center" alignItems="center">
          <input id="upload" type="file" name="files[]" onChange={handleUpload} />
        </Grid>
        {/* </Grid> */}
        {/* <Grid container>
        </Grid>
        <Grid container>
        </Grid> */}
      </TabPanel>
    </MDBox>
  );
}

export default Edit;
