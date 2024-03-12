import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Grid, Autocomplete, Card, Stack } from "@mui/material";
import MDTypography from "components/MDTypography";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import {
  GetReportMaster,
  GetReportConfigName,
  GetParameterDetailsUpdate,
  DeleteParameter,
  PostSaveUpDate,
} from "../data";
import ReportObj from "../data/jsonData";

function ReportUpdate() {
  const [rangedata, setrangedata] = useState("");
  const [datatypedata, setdatatypedata] = useState("");
  const [show, setShow] = useState(false);
  const [showfirst, setshowfirst] = useState(false);
  const [UpDateConfig, setUpDateConfig] = useState({ ...ReportObj });
  const [repname, setrepname] = useState([]);

  const [rows, setRows] = useState([]);
  useEffect(async () => {
    await GetReportMaster().then((result) => {
      result.data.forEach((x) => {
        if (x.mType === "RangeType") setrangedata(x.mdata);
        if (x.mType === "DataType") setdatatypedata(x.mdata);
      });
    });
  }, []);

  // const Tblempty = {
  //   parameterName: "",
  //   dataType: "",
  //   createdDate: "",
  //   rangeType: "",
  // };
  const [obj, setObj] = useState({
    id: "",
    parameterName: "",
    dataType: "",
    createdDate: "",
    rangeType: "",
    reportConfigParamId: "",
  });

  const obj1 = {
    id: "",
    parameterName: "",
    createdDate: "",
    dataType: "",
    rangeType: "",
    reportConfigParamId: "",
  };
  const columns = [
    {
      field: "parameterName",
      headerName: "Parameter Name",
      width: 300,
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
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 90,
      renderCell: (id) => {
        const deleteRow = () => {
          if (id.row.reportConfigParamId !== "") {
            swal({
              icon: "error",
              text: "Are you sure to Delete Parameter Permanently ?",
              buttons: {
                buttonOne: {
                  text: "Cancel",
                  value: "cancel",
                  visible: true,
                },
                buttonTwo: {
                  text: "OK",
                  value: "Confirm",
                  visible: true,
                },
              },
            }).then((value) => {
              if (value === "Confirm") {
                DeleteParameter(id.row.reportConfigParamId);

                const newArray = rows.filter((row) => row.id !== id.row.id);

                setRows([...newArray]);
                console.log("DGROW", rows);
              }
            });
          } else {
            const newArray = rows.filter((row) => row.id !== id.row.id);

            setRows([...newArray]);
            console.log("DGROW", rows);
          }
        };

        return <DeleteIcon color="primary" fontSize="medium" sx={{ ml: 4 }} onClick={deleteRow} />;
      },
    },
  ];

  const handleSetAutoCompleteFirst = async (e, type, value) => {
    if (type === "ReportName") {
      UpDateConfig.ReportUpdate[type] = value.mValue;
      UpDateConfig.ReportUpdate.reportConfigId = value.mID;

      const RnameData = await GetParameterDetailsUpdate(UpDateConfig.ReportUpdate.reportConfigId);

      // setRows([...rows, ...RnameData]);
      RnameData.forEach((x, key) => {
        RnameData[key].id = key;
      });
      setRows(RnameData);
      setshowfirst(true);
      console.log("apidata", RnameData);
    }

    setUpDateConfig(() => ({ ...UpDateConfig }));
  };

  const handleParaName = (e) => {
    // const len = rows.length;
    // obj.id = len;
    obj.parameterName = e.target.value;

    console.log("33", ReportObj);

    setObj({ ...obj });
  };

  const handleRange = (e, newValue) => {
    obj.rangeType = newValue.mValue;

    setObj({ ...obj });
  };
  const handleData = (e, newValue) => {
    obj.dataType = newValue.mValue;
    obj.createdDate = new Date();

    setObj({ ...obj });
  };

  useEffect(async () => {
    await GetReportConfigName().then((result) => {
      setrepname(result.data);
    });
  }, []);
  useEffect(() => {
    console.log("DGROW", rows);
  }, []);
  console.log("reportnames", repname);
  const handledatagrid = async () => {
    const len = rows.length;
    obj.id = len;

    setRows([...rows, obj]);

    console.log("reportdatafilled", UpDateConfig.ReportUpdate);
    UpDateConfig.ReportUpdate.createdDate = new Date();
    console.log("DGROW", rows);
    setUpDateConfig(() => ({ ...UpDateConfig }));

    UpDateConfig.ReportUpdate.TblreportConfigParam.push(obj);
    console.log("finalapicalldata", UpDateConfig.ReportUpdate);

    setUpDateConfig(() => ({ ...UpDateConfig }));
    setObj(obj1);
    setShow(true);
    // ConfigData.ReportConfigDto.fileName = "";
    // ConfigData.ReportConfigDto.filePath = "";

    // TblreportConfigParam.forEach((i) => {
    // TblreportConfigParam[i].dataType = "";
    //  TblreportConfigParam[i].rangeType = "";
    //  TblreportConfigParam[i].parameterName = "";
    // });
    // } else {
    //   swal({
    //     text: "Some feilds are missing",
    //     icon: "error",
    //   });
    // }
  };

  const myjsonobj = { ...UpDateConfig.ReportUpdate };

  delete myjsonobj.DataTypeId;
  delete myjsonobj.createdDate;
  delete myjsonobj.DBSchemaId;
  delete myjsonobj.ParameterName;
  delete myjsonobj.ReportName;
  delete myjsonobj.RangeTypeId;

  myjsonobj.TblreportConfigParam.forEach((x, key) => {
    // delete myjsonobj.TblreportConfigParam[key].id;
    delete myjsonobj.TblreportConfigParam[key].reportConfigParamId;
  });

  const sendtheData = useState({});
  console.log("sendthedata", sendtheData);

  console.log("lastspidata", myjsonobj);
  const savemethod = async () => {
    const SaveData = await PostSaveUpDate(UpDateConfig.ReportUpdate.reportConfigId, myjsonobj).then(
      (response) => {
        if (response.status === 200) {
          swal({
            text: "Report Modified!",
            icon: "success",
          });
        } else if (response.status === 400) {
          swal({
            text: response.data.errors[0].errorMessage,
            icon: "error",
          });
        }
      }
    );
    console.log("reportsaveresult", SaveData);
  };

  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Report Update
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="Report Name"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px",
              },
            }}
            options={repname}
            onChange={(e, value) => handleSetAutoCompleteFirst(e, "ReportName", value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Report Name" required />}
          />
        </Grid>
        {showfirst && (
          <>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Parameter Name"
                name="parameterName"
                onChange={handleParaName}
                value={obj.parameterName}
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
                onChange={(e, newValue) => handleRange(e, newValue)}
                value={{ mValue: obj.rangeType }}
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
                value={{ mValue: obj.dataType }}
                onChange={(e, newValue) => handleData(e, newValue)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Data Type" required />}
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
                      // getRowId={(x) => x.reportConfigParamId}
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
                    // value={ConfigData.ReportConfigDto.query}
                    // onChange={handleInputChange}
                    name="query"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack justifyContent="center" direction="row" sx={{ my: 3 }}>
                    <MDButton onClick={savemethod}>UPDATE</MDButton>
                  </Stack>
                </Grid>
              </>
            )}
          </>
        )}
      </Grid>
    </Card>
  );
}

export default ReportUpdate;
