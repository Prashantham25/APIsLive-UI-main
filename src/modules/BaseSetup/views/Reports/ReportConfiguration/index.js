import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Grid, Autocomplete, Card, Stack } from "@mui/material";
import MDTypography from "components/MDTypography";
import swal from "sweetalert";
// import BaseSetupDataBind from "modules/BaseSetup/views/data/BaseSetupDataBind";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import { GetReportMaster, PostReportSaveConfigParameters } from "../data";
import ReportObj from "../data/jsonData";

function ReportConfiguration() {
  const [dabschemedata, setdabschemedata] = useState("");
  const [rangedata, setrangedata] = useState("");
  const [datatypedata, setdatatypedata] = useState("");
  const [show, setShow] = useState(false);
  const [dbname, setdbname] = useState("");
  const [ConfigData, setConfigData] = useState({ ...ReportObj });

  useEffect(async () => {
    await GetReportMaster().then((result) => {
      result.data.forEach((x) => {
        if (x.mType === "DBSchema") setdabschemedata(x.mdata);
        if (x.mType === "RangeType") setrangedata(x.mdata);
        if (x.mType === "DataType") setdatatypedata(x.mdata);
      });
    });
  }, []);

  // const [ReportConfigDto, setReportConfigDto] = useState({
  //   reportConfigName: "",
  //   dbschema: "",
  //   isActive: 1,
  //   createdDate: "",
  //   query: "",
  //   fileName: "",
  //   filePath: "",
  //   TblreportConfigParam: [],
  // });

  const [TblreportConfigParam, setTblreportConfigParam] = useState({
    parameterName: "",
    createdDate: "",
    dataType: "",
    rangeType: "",
  });

  const Tblempty = {
    parameterName: "",
    dataType: "",
    createdDate: "",
    rangeType: "",
  };
  const [obj, setObj] = useState({
    id: "",
    parameterName: "",
    dataType: "",
    createdDate: "",
    rangeType: "",
  });

  const obj1 = {
    id: "",
    parameterName: "",
    createdDate: "",
    dataType: "",
    rangeType: "",
  };
  const columns = [
    // { field: "id", headerName: "S.No", width: 100 },
    {
      field: "parameterName",
      headerName: "Parameter Name",
      width: 400,
      headerAlign: "center",

      align: "center",
    },
    {
      field: "dataType",
      headerName: "Data Type",
      width: 350,
      headerAlign: "center",

      align: "center",
    },
    {
      field: "rangeType",
      headerName: "Range Type",
      width: 300,
      headerAlign: "center",

      align: "center",
    },
  ];

  const [rows, setRows] = useState([]);

  const savemethod = async () => {
    // if (TblreportConfigParam.length >= 0) {

    const SaveData = await PostReportSaveConfigParameters(ConfigData.ReportConfigDto);

    console.log("reportsavedata", SaveData);
    if (SaveData.data.status === 2) {
      swal({
        //   title: "Perfect",
        text: SaveData.data.responseMessage,
        icon: "success",
      });
    } else if (SaveData.status === 8) {
      swal({
        text: SaveData.data.errors[0].errorMessage,
        icon: "error",
      });
    } else if (SaveData.status === 4) {
      swal({
        text: SaveData.data.errors[0].errorMessage,
        icon: "error",
      });
    }
    // swal({
    //   icon: "success",
    //   text: SaveData.data.responseMessage,
    // });

    console.log("reportdatafilled", ConfigData.ReportConfigDto);
    // } else {
    //   swal({
    //     icon: "error",
    //     text: "Parameter Should be Added into Grid",
    //   });
    // }
  };
  const handleInputChange = (e) => {
    ConfigData.ReportConfigDto[e.target.name] = e.target.value;
    if (e.target.name === "reportConfigName") {
      ConfigData.ReportConfigDto.reportConfigName = e.target.value;
      console.log("33", ConfigData.ReportConfigDto);
    } else if (e.target.name === "fileName") {
      ConfigData.ReportConfigDto.fileName = e.target.value;
      console.log("33", ConfigData.ReportConfigDto);
    } else if (e.target.name === "filePath") {
      ConfigData.ReportConfigDto.filePath = e.target.value;
      console.log("33", ConfigData.ReportConfigDto);
    } else if (e.target.name === "query") {
      ConfigData.ReportConfigDto.query = e.target.value;
      console.log("33", ConfigData.ReportConfigDto);
    }
    setConfigData(() => ({ ...ConfigData }));
    console.log("reportdatafilled", ConfigData);
  };
  const handlenewArray = (e) => {
    setObj(obj1);
    const len = rows.length;
    obj.id = len;
    obj.parameterName = e.target.value;
    TblreportConfigParam.parameterName = e.target.value;
    setTblreportConfigParam((prev) => ({ ...prev, ...TblreportConfigParam }));
    console.log("33", ConfigData);

    setObj((prev) => ({ ...prev, ...obj }));
  };
  useEffect(() => {
    console.log("1", obj);
  }, [obj]);
  useEffect(() => {
    console.log("ss", rows);
  }, [rows]);
  // useEffect(() => {
  //   dabschemedata.forEach((item) => {
  //     if (ReportConfigDto.dbschema === item.mID) {
  //       setdbname(item.mValue);
  //     }
  //   });
  // }, [dabschemedata]);
  console.log("masterlist", dabschemedata);

  const handleChange1 = (e, newValue) => {
    obj.rangeType = newValue.mValue;
    TblreportConfigParam.rangeType = newValue.mValue;
    setTblreportConfigParam((prev) => ({ ...prev, ...TblreportConfigParam }));
    setObj((prev) => ({ ...prev, obj }));
  };
  const handleChange2 = (e, newValue) => {
    obj.dataType = newValue.mValue;
    obj.createdDate = new Date();
    TblreportConfigParam.dataType = newValue.mValue;
    TblreportConfigParam.createdDate = new Date();
    setTblreportConfigParam((prev) => ({ ...prev, ...TblreportConfigParam }));
    setObj((prev) => ({ ...prev, obj }));
  };

  const handleSetAutoComplete = (e, type, value) => {
    if (type === "dbschema") {
      ConfigData.ReportConfigDto[type] = value.mID;
      setdbname(value.mValue);
      console.log("autodata", ConfigData);
    }

    setConfigData(() => ({ ...ConfigData }));
  };

  const handledatagrid = () => {
    // ReportConfigDto.TblreportConfigParam[0]= [];
    if (
      ConfigData.ReportConfigDto.reportConfigName !== "" &&
      ConfigData.ReportConfigDto.dbschema !== ""
    ) {
      setRows([...rows, obj]);
      setObj(obj1);
      ConfigData.ReportConfigDto.TblreportConfigParam.push(TblreportConfigParam);
      setShow(true);
      // setRows([...rows, ConfigData.ReportConfigDto.TblreportConfigParam]);
      setTblreportConfigParam(Tblempty);
      console.log("reportdatafilled", ConfigData.ReportConfigDto);
      ConfigData.ReportConfigDto.createdDate = new Date();

      setConfigData(() => ({ ...ConfigData }));
      ConfigData.ReportConfigDto.fileName = "";
      ConfigData.ReportConfigDto.filePath = "";

      // TblreportConfigParam.forEach((i) => {
      // TblreportConfigParam[i].dataType = "";
      //  TblreportConfigParam[i].rangeType = "";
      //  TblreportConfigParam[i].parameterName = "";
      // });
    } else {
      swal({
        text: "Some feilds are missing",
        icon: "error",
      });
    }
  };

  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Report Configuration
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Report Name"
            value={ConfigData.ReportConfigDto.reportConfigName}
            onChange={handleInputChange}
            name="reportConfigName"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="DB Schema" /> */}
          <Autocomplete
            id="DB Schema"
            name="dbschema"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px",
              },
            }}
            options={dabschemedata}
            value={{ mValue: dbname }}
            onChange={(e, value) => handleSetAutoComplete(e, "dbschema", value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="DB Schema" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Parameter Name"
            name="parameterName"
            onChange={handlenewArray}
            // value={ConfigData.ReportConfigDto.TblreportConfigParam[].parameterName}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="Range Type" /> */}
          <Autocomplete
            id="Range Type"
            name="rangeType"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px",
              },
            }}
            options={rangedata}
            onChange={(e, newValue) => handleChange1(e, newValue)}
            // value={{ mValue: ReportConfigDto.TblreportConfigParam[0].rangeType }}
            // onChange={(e, value) => handleSetAutoComplete(e, "rangeType", value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Range Type" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="Data Type" /> */}
          <Autocomplete
            id="Data Type"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px",
              },
            }}
            options={datatypedata}
            // value={{ mValue: ReportConfigDto.TblreportConfigParam[0].dataType }}
            onChange={(e, newValue) => handleChange2(e, newValue)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput height="1.4375rem" {...params} label="Data Type" required />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="File Name"
            required
            onChange={handleInputChange}
            name="fileName"
            value={ConfigData.ReportConfigDto.fileName}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="File Path"
            required
            onChange={handleInputChange}
            name="filePath"
            value={ConfigData.ReportConfigDto.filePath}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="center" direction="row">
            <MDButton onClick={handledatagrid}>ADD PARAMETER</MDButton>
          </Stack>
        </Grid>
        {show && (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Parameter Details</MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox
                sx={{
                  width: "100%",
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  autoHeight
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6">Query</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
              <MDInput
                multiline
                label="Query"
                value={ConfigData.ReportConfigDto.query}
                onChange={handleInputChange}
                name="query"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="center" direction="row" sx={{ my: 3 }}>
                <MDButton onClick={savemethod}>SAVE</MDButton>
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
}

export default ReportConfiguration;
