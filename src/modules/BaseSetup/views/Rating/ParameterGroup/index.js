import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
import swal from "sweetalert";
import MDInput from "../../../../../components/MDInput";
//  import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import DataBaseBind from "../../data/DataBaseBind";
import { Parameters, CreateParamSet } from "../data";

const { Card, Grid, Autocomplete, Stack } = require("@mui/material");

function ViewRateTable() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    Parameters().then((response) => {
      setPost(response);
      console.log("10", response);
    });
  }, []);
  const [feilds, setFeilds] = useState({
    parameterSetName: "",
    createdDate: new Date(),
    isActive: 1,
    parameterSetDetails: [],
  });
  const fieldsD = { parameterSetName: "", createdDate: "", isActive: 1, parameterSetDetails: [] };

  const [parameterSetDetails, setParameterSetDetails] = useState({
    parametersId: "",
    createdDate: new Date(),
    isActive: 1,
    rangeType: "",
  });
  const parameterSetDetailsD = {
    parametersId: "",
    createdDate: new Date(),
    isActive: 1,
    rangeType: "",
  };
  console.log("data", feilds);

  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "S.No", width: 100 },
    { field: "ParameterName", headerName: "Parameter Name", width: 300 },
    { field: "ParameterType", headerName: "Parameter Type", width: 300 },
    { field: "ParameterMasterLink", headerName: "Range Type", width: 300 },
  ];
  const [obj, setObj] = useState({
    id: "",
    ParameterName: "",
    ParameterType: "",
    ParameterMasterLink: "",
  });

  const obj1 = {
    id: "",
    ParameterName: "",
    ParameterType: "",
    ParameterMasterLink: "",
  };

  const handleChange = (e, value) => {
    setObj(obj1);
    const len = rows.length;
    obj.id = len;
    obj.ParameterName = value.parameterName;
    obj.ParameterType = value.parameterType;
    obj.ParameterMasterLink = value.parameterMasterLink;
    parameterSetDetails.parametersId = value.parametersId;
    setParameterSetDetails((prev) => ({ ...prev, ...parameterSetDetails }));

    setObj((prev) => ({ ...prev, ...obj }));
  };
  useEffect(() => {
    console.log("1", obj);
  }, [obj]);

  useEffect(() => {
    console.log("ss", rows);
  }, [rows]);

  const handleChange1 = (e, newValue) => {
    obj.ParameterMasterLink = newValue.mValue;
    parameterSetDetails.rangeType = newValue.mValue;
    setParameterSetDetails((prev) => ({ ...prev, ...parameterSetDetails }));

    setObj((prev) => ({ ...prev, obj }));
  };
  useEffect(() => {
    console.log("1", obj);
  }, [obj]);

  useEffect(() => {
    console.log("ss", rows);
  }, rows);

  const handleChange2 = () => {
    // debugger;
    setRows([...rows, obj]);
    feilds.parameterSetDetails.push(parameterSetDetails);
    setParameterSetDetails(parameterSetDetailsD);
    setObj(obj1);
    if (obj.ParameterName === "") {
      swal({
        icon: "error",

        text: "Some fields are missing",
      });
    }
  };

  const handleSetGrid = async () => {
    console.log("print1", feilds);
    if (feilds.parameterSetName === "") {
      swal({
        icon: "error",

        text: "Parameter Group name is required",
      });
    } else {
      const callCreate = await CreateParamSet({ feilds });
      console.log("print", callCreate);
      swal({
        icon: "success",

        text: `Configuration of Parameter Succesfully Done!
        Rating Config Name:${feilds.parameterSetName}`,
      });
      setObj(obj1);
      setParameterSetDetails(parameterSetDetailsD);
      setRows([]);
      setFeilds(fieldsD);
    }
  };

  return (
    <Card sx={{ height: "50rem" }}>
      <Grid p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h3" color="primary">
            Parameter Group
          </MDTypography>
        </Grid>
        <Grid mt={2}>
          <Stack direction="row" spacing={2}>
            <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Parameter Group Name"
                value={feilds.parameterSetName}
                variant="outlined"
                onChange={(e) => setFeilds({ ...feilds, parameterSetName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="Parameter"
                options={post}
                onChange={handleChange}
                value={
                  post && parameterSetDetails.parametersId > 0 && post.length > 0
                    ? {
                        parametersId: post.filter(
                          (x) => x.parametersId === parameterSetDetails.parametersId
                        )[0].parametersId,
                        parameterName: post.filter(
                          (x) => x.parametersId === parameterSetDetails.parametersId
                        )[0].parameterName,
                      }
                    : { parametersId: 0, parameterName: "" }
                }
                getOptionLabel={(option) => option.parameterName}
                renderInput={(params) => <MDInput {...params} label="Parameters" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="RangeType"
                name="RangeType"
                options={DataBaseBind.Type}
                value={
                  DataBaseBind !== null &&
                  DataBaseBind.Type &&
                  parameterSetDetails.rangeType !== "" &&
                  DataBaseBind.Type.length > 0
                    ? {
                        mID: DataBaseBind.Type.filter(
                          (x) => x.mValue === parameterSetDetails.rangeType
                        )[0].mID,
                        mValue: DataBaseBind.Type.filter(
                          (x) => x.mValue === parameterSetDetails.rangeType
                        )[0].mValue,
                      }
                    : { mID: 0, mValue: "" }
                }
                onChange={(e, newValue) => handleChange1(e, newValue)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Range Type" />}
              />
            </Grid>
          </Stack>
          <Stack justifyContent="right" direction="row" mt={2}>
            <MDButton variant="outlined" onClick={handleChange2}>
              ADD PARAMETER
            </MDButton>
          </Stack>
        </Grid>
        {rows.length > 0 ? (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="right" direction="row" mt={2}>
                <MDButton variant="contained" onClick={handleSetGrid}>
                  Save
                </MDButton>
              </Stack>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Card>
  );
}

export default ViewRateTable;
