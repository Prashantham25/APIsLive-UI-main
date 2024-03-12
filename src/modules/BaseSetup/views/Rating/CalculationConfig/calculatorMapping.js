import React, { useState } from "react"; // useState
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import MDTypography from "components/MDTypography";
// import Switch from "@mui/material/Switch";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import swal from "sweetalert";

import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
//  import DataBaseBind from "../../data/DataBaseBind";
import { GetOutputParams, deleteCalculatorMapperParameters } from "../data";

const {
  Grid, // Stack,
  Autocomplete,
  IconButton,
  // Stack,
  //   FormGroup,
  //   FormControlLabel,
} = require("@mui/material");

// function RemoveTask() {
//   return (
//     <Stack justifyContent="right" direction="row" spacing={2}>
//       <DeleteIcon color="primary" />
//     </Stack>
//   );
// }

function CalculatorMapping({
  fields1,
  setFields1,
  updateFlag,
  cal,
  configName,
  calExprParam,
  setCalExprParam,
}) {
  const [output, setOutput] = useState([]);
  const [calculatorMapperDTO, setCalculatorMapperDTO] = useState({
    mapperId: 0,
    calculationConfigId: 0,
    sourceParameter: "",
    operation: "",
    calculatorName: "",
  });
  const calculatorMapperDTOD = {
    mapperId: 0,
    calculationConfigId: 0,
    sourceParameter: "",
    operation: "",
    calculatorName: "",
  };
  const [type, setType] = useState("");
  const handleChange = async (e, value) => {
    // debugger;
    if (e.target.id.split("-")[0] === "calculatorName") {
      calculatorMapperDTO[e.target.id.split("-")[0]] = value.entity;

      const id = configName.data.filter((x) => x.mValue === value.entity)[0].mID;
      const outputParams = await GetOutputParams(id);
      setOutput([...outputParams.data]);
    } else if (e.target.id.split("-")[0] === "operation") {
      calculatorMapperDTO[e.target.id.split("-")[0]] = value;
    } else if (e.target.id.split("-")[0] === "typeOfParameter") {
      setType(value);
    } else {
      calculatorMapperDTO[e.target.id.split("-")[0]] = value.mValue;
    }
    setCalculatorMapperDTO((prev) => ({ ...prev, ...calculatorMapperDTO }));
  };
  const handleAdd = () => {
    //  debugger;
    const calExprParamL = calExprParam;
    setOutput([]);
    setType("");
    setCalculatorMapperDTO(calculatorMapperDTOD);
    setFields1((prev) => ({
      ...prev,
      calculatorMapperDTO: [...prev.calculatorMapperDTO, { ...calculatorMapperDTO }],
    }));
    calExprParamL.push(
      `${calculatorMapperDTO.calculatorName}${"."}${calculatorMapperDTO.sourceParameter}${
        calculatorMapperDTO.operation
      }`
    );
    setCalExprParam([...calExprParamL]);
  };
  const columns = [
    // { field: "id", headerName: "SNo.", width: 100 },
    { field: "sourceParameter", headerName: "Source Parameter", width: 400 },
    { field: "calculatorName", headerName: "Rate Name", width: 300 },
    { field: "operation", headerName: "Destination Parameter", width: 300 },
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
            //  debugger;
            if (value === "confirm") {
              if (updateFlag === true) {
                const deleteMappedParameter = await deleteCalculatorMapperParameters(
                  param.row.mapperId,
                  fields1.calculationConfigId
                );
                if (deleteMappedParameter.status === 200) {
                  swal({ icon: "success", text: deleteMappedParameter.data.responseMessage });
                } else {
                  swal({ icon: "error", text: deleteMappedParameter.data.responseMessage });
                }
              }

              const fields1L = fields1;
              const newArray = fields1L.calculatorMapperDTO.filter(
                (row) => row.sourceParameter !== param.row.sourceParameter
              );
              fields1L.calculatorMapperDTO = [];
              //   if (updateFlag === false) {
              //     newArray.forEach((x, key) => {
              //       newArray[key].id = key + 1;
              //     });
              //   }

              setFields1((prev) => ({
                ...prev,
                calculatorMapperDTO: [...prev.calculatorMapperDTO, ...newArray],
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
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Calculator Mapping
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="calculatorName"
            options={cal}
            value={
              calculatorMapperDTO.calculatorName !== ""
                ? {
                    mID: calculatorMapperDTO.calculatorName,
                    entity: calculatorMapperDTO.calculatorName,
                  }
                : { mID: "", entity: "" }
            }
            onChange={handleChange}
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
            id="sourceParameter"
            value={
              calculatorMapperDTO.sourceParameter !== ""
                ? {
                    mID: calculatorMapperDTO.sourceParameter,
                    mValue: calculatorMapperDTO.sourceParameter,
                  }
                : { mID: "", mValue: "" }
            }
            options={output}
            onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Output Params" />}
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
            options={["Aggregate Functions", "TextBox"]}
            value={type}
            onChange={handleChange}
            renderInput={(params) => <MDInput {...params} label="Type" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
          {type === "Aggregate Functions" ? (
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              id="operation"
              options={["Sum", "Avg", "Min", "Max"]}
              value={calculatorMapperDTO.operation}
              onChange={handleChange}
              renderInput={(params) => <MDInput {...params} label="Operation" />}
            />
          ) : null}

          {type === "TextBox" ? <MDInput label="Add Expression Param" /> : null}
        </Grid>
        <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
          <IconButton>
            <AddCircleIcon fontSize="medium" onClick={handleAdd} style={{ color: "dodgerblue" }} />
          </IconButton>
        </Grid>
      </Grid>

      {fields1.calculatorMapperDTO.length > 0 ? (
        <MDBox p={2}>
          <DataGrid
            autoHeight
            rows={fields1.calculatorMapperDTO}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            getRowId={(row) => (row.mapperId > 0 ? row.mapperId : row.sourceParameter)}
            components={{ Toolbar: GridToolbar }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </MDBox>
      ) : null}
    </>
  );
}

export default CalculatorMapping;
