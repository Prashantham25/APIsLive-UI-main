import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import MDTypography from "components/MDTypography";
import Switch from "@mui/material/Switch";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import swal from "sweetalert";

import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
//  import DataBaseBind from "../../data/DataBaseBind";
import { GetRatesParam, deleteMappedParam, GetHandleEvents } from "../data";

const {
  Grid, // Stack,
  Autocomplete,
  IconButton,
  // Stack,
  FormGroup,
  FormControlLabel,
} = require("@mui/material");

// function RemoveTask() {
//   return (
//     <Stack justifyContent="right" direction="row" spacing={2}>
//       <DeleteIcon color="primary" />
//     </Stack>
//   );
// }

function ParameterMapping({ fields1, setFields1, ratesArray, updateFlag, configName, cal }) {
  const [switchFlag, setSwitch] = useState(false);
  const [label, setLabel] = useState("Switch to Array Mapper");
  const [parameterList1, setParameterList1] = React.useState([]);
  const [mapperDetails, setMapperDetails] = useState({
    id: 0,
    mapperName: "",
    rateName: "",
    sourceParameter: "",
    stepSequence: null,
    targetParameter: "",
    createdDate: new Date(),
    isParam: true,
    mapperId: 0,
  });

  const mapperDetailsD = {
    id: 0,
    mapperName: "",
    rateName: "",
    sourceParameter: "",
    stepSequence: null,
    targetParameter: "",
    createdDate: new Date(),
    isParam: true,
    mapperId: 0,
  };
  const [arrayMapperDestination, setArrayMapperDestination] = useState([]);
  const [paramType, setParamType] = useState("");
  const handleParamType = (e, value) => {
    setParamType(value);
  };
  const handleSwitch = (e) => {
    //  debugger;
    setSwitch(e.target.checked);
    if (e.target.checked === true) {
      setLabel("Switch to Parameter Mapping");
    } else {
      setLabel("Switch to Array Mapper");
    }
  };
  const handleParamMapping = async (e, value) => {
    //  debugger;
    setParameterList1([]);
    setArrayMapperDestination([]);
    if (e.target.id.split("-")[0] === "rateName") {
      if (switchFlag === true) {
        mapperDetails[e.target.id.split("-")[0]] = value.entity;
        const id = configName.data.filter((x) => x.mValue === value.entity)[0].mID;
        const GetRatesPara = await GetHandleEvents(id);

        setArrayMapperDestination(GetRatesPara.data.parameterList);
      } else {
        mapperDetails[e.target.id.split("-")[0]] = value.mValue;
        const GetRatesPara = await GetRatesParam(value.mID);
        setParameterList1(GetRatesPara.data);
      }
    } else if (e.target.id.split("-")[0] === "sourceParameter") {
      mapperDetails[e.target.id.split("-")[0]] = value.calculationConfigParamName;
    } else if (e.target.id.split("-")[0] === "targetParameter") {
      if (typeof value === "object") {
        mapperDetails[e.target.id.split("-")[0]] = value.mValue;
      } else {
        mapperDetails[e.target.id.split("-")[0]] = value;
      }
    }
    setMapperDetails((prev) => ({ ...prev, ...mapperDetails }));
  };

  const handleAdd = () => {
    // debugger;
    setParamType("");

    setMapperDetails(mapperDetailsD);
    const len = fields1.mapperDetails.length + 1;
    mapperDetails.id = len;
    mapperDetails.mapperName = fields1.calculationConfigName;
    if (switchFlag === false) {
      mapperDetails.targetParameter = `${mapperDetails.rateName}${"_"}${
        mapperDetails.targetParameter
      }`;
    }
    // else{
    //   mapperDetails.targetParameter = `${mapperDetails.rateName}${"_"}${
    //     mapperDetails.targetParameter
    //   }`;
    // }

    setFields1((prev) => ({
      ...prev,
      mapperDetails: [...prev.mapperDetails, { ...mapperDetails }],
    }));
  };
  const columns = [
    { field: "id", headerName: "SNo.", width: 100 },
    { field: "sourceParameter", headerName: "Source Parameter", width: 400 },
    { field: "rateName", headerName: "Rate Name", width: 300 },
    { field: "targetParameter", headerName: "Destination Parameter", width: 300 },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      editable: true,
      renderCell: (param) => {
        const deleteRow = () => {
          // debugger;
          swal("Are you sure you want to delete?", {
            buttons: {
              confirm: {
                value: "confirm",
                visible: true,
                closeModal: true,
              },
              cancel: {
                value: "cancel",
                closeModal: true,
                visible: true,
              },
            },
          }).then(async (value) => {
            // debugger;
            if (value === "confirm") {
              if (updateFlag === true) {
                const deleteMappedParameter = await deleteMappedParam(
                  param.id,
                  fields1.calculationConfigId
                );
                if (deleteMappedParameter.status === 200) {
                  swal({ icon: "success", text: deleteMappedParameter.data.responseMessage });
                } else {
                  swal({ icon: "error", text: deleteMappedParameter.data.responseMessage });
                }
              }

              const fields1L = fields1;
              const newArray = fields1L.mapperDetails.filter((row) => row.id !== param.id);
              fields1L.mapperDetails = [];
              if (updateFlag === false) {
                newArray.forEach((x, key) => {
                  newArray[key].id = key + 1;
                });
              }

              setFields1((prev) => ({
                ...prev,
                mapperDetails: [...prev.mapperDetails, ...newArray],
              }));
            }
          });
        };

        return (
          <IconButton onClick={deleteRow} fontSize="medium" style={{ color: "dodgerblue" }}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
    // {
    //   field: "Edit",
    //   headerName: "Edit",
    //   width: 100,
    //   editable: true,
    //   renderCell: () => <EditIcon />,
    // },
  ];

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={switchFlag}
              onChange={handleSwitch}
              // sx={{
              //   "MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":{
              //     "backgroundColor":"blue"
              //   }
              // }}
            />
          }
          label={label}
        />
      </FormGroup>

      {switchFlag === false ? (
        <>
          {/* {" "}
          <MDTypography variant="h6" color="primary">
            Parameter mapping
          </MDTypography> */}
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" color="primary">
                Parameter Mapping
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="sourceParameter"
                options={
                  fields1.calculationConfigParam.length > 0
                    ? fields1.calculationConfigParam.filter(
                        (x) => x.type === "Param" || x.type === "Result"
                      )
                    : []
                }
                value={
                  mapperDetails.sourceParameter !== ""
                    ? {
                        mID: mapperDetails.sourceParameter,
                        calculationConfigParamName: mapperDetails.sourceParameter,
                      }
                    : { mID: "", calculationConfigParamName: "" }
                }
                onChange={handleParamMapping}
                getOptionLabel={(option) => option.calculationConfigParamName}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Source Parameters
  "
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput label="DB Schema" /> */}
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="rateName"
                value={
                  mapperDetails.rateName !== ""
                    ? {
                        mID: mapperDetails.rateName,
                        mValue: mapperDetails.rateName,
                      }
                    : { mID: "", mValue: "" }
                }
                options={ratesArray}
                onChange={handleParamMapping}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Rates" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="targetParameter"
                options={parameterList1}
                value={
                  mapperDetails.targetParameter !== ""
                    ? {
                        mID: mapperDetails.targetParameter,
                        mValue: mapperDetails.targetParameter,
                      }
                    : { mID: "", mValue: "" }
                }
                onChange={handleParamMapping}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Destination Parameters" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <IconButton>
                <AddCircleIcon
                  fontSize="medium"
                  onClick={handleAdd}
                  style={{ color: "dodgerblue" }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {" "}
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" color="primary">
                Array Mapper
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="sourceParameter"
                options={
                  fields1.calculationConfigParam.length > 0
                    ? fields1.calculationConfigParam.filter(
                        (x) => x.type === "Param" || x.type === "Result"
                      )
                    : []
                }
                value={
                  mapperDetails.sourceParameter !== ""
                    ? {
                        mID: mapperDetails.sourceParameter,
                        calculationConfigParamName: mapperDetails.sourceParameter,
                      }
                    : { mID: "", calculationConfigParamName: "" }
                }
                onChange={handleParamMapping}
                getOptionLabel={(option) => option.calculationConfigParamName}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Source Parameters
"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="rateName"
                value={
                  mapperDetails.rateName !== ""
                    ? {
                        mID: mapperDetails.rateName,
                        entity: mapperDetails.rateName,
                      }
                    : { mID: "", entity: "" }
                }
                options={
                  cal
                  // fields1.calculationConfigParam.length > 0
                  //   ? fields1.calculationConfigParam.filter((x) => x.type === "Calculator")
                  //   : []
                }
                onChange={handleParamMapping}
                getOptionLabel={(option) => option.entity}
                renderInput={(params) => <MDInput {...params} label="Calculators" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="typeOfParameter"
                options={["Parameter", "Rate Parameter"]}
                value={paramType}
                onChange={handleParamType}
                renderInput={(params) => <MDInput {...params} label="Type of Parameter" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="targetParameter"
                options={paramType === "Parameter" ? arrayMapperDestination : []}
                value={mapperDetails.targetParameter}
                onChange={handleParamMapping}
                renderInput={(params) => <MDInput {...params} label="Destination Parameters" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
              <IconButton>
                <AddCircleIcon
                  fontSize="medium"
                  onClick={handleAdd}
                  style={{ color: "dodgerblue" }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}

      {fields1.mapperDetails.length > 0 ? (
        <MDBox p={2}>
          <DataGrid
            autoHeight
            rows={fields1.mapperDetails}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </MDBox>
      ) : null}
    </>
  );
}

export default ParameterMapping;
