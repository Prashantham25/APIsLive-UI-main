import * as React from "react";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
// import Dropzone from "react-dropzone-uploader";
import swal from "sweetalert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Paper from "@mui/material/Paper";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import DataBaseBind from "../../data/DataBaseBind";
import {
  RateNameRule,
  CreateCal, // RateNameUpload,
  UpdateCal,
  GetRateConfig,
  deleteExp,
  deleteCalculatorParameters,
} from "../data";
import ParameterMapping from "./parameterMapping";
import CalculatorMapping from "./calculatorMapping";

const { Card, Grid, Chip, Stack, Autocomplete, IconButton } = require("@mui/material");

function CalculationConfig({ calculatorData, calI, arrayParam }) {
  // const [rate, setRate] = useState({
  //   RateName: "",
  // });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [fields1, setFields1] = useState({
    calculationConfigId: 0,
    calculationConfigName: "",
    createdDate: new Date(),
    isActive: 1,
    calculationConfigExpression: [],
    calculationConfigParam: [],
    mapperDetails: [],
    calculatorMapperDTO: [],
  });

  const fieldsD = {
    calculationConfigId: 0,
    calculationConfigName: "",
    createdDate: new Date(),
    isActive: 1,
    calculationConfigExpression: [],
    calculationConfigParam: [],
    mapperDetails: [],
    calculatorMapperDTO: [],
  };
  const [calculationConfigExpression, setCalculationConfigExpression] = useState({
    expressionResult: "",
    expressionValue: "",
    createdDate: new Date(),
    isActive: 1,
    steps: 0,
    calculationConfigExpressionId: 0,
    calculationConfigId: 0,
  });
  const calculationConfigExpressionD = {
    expressionResult: "",
    expressionValue: "",
    createdDate: new Date(),
    isActive: 1,
    steps: 0,
    calculationConfigExpressionId: 0,
    calculationConfigId: 0,
  };
  const [calculationConfigParam, setCalculationConfigParam] = useState({
    calculationConfigParamName: "",
    createdDate: new Date(),
    isActive: 1,
    type: "",
    calculationConfigParamId: 0,
  });
  const calculationConfigParamD = {
    calculationConfigParamName: "",
    createdDate: new Date(),
    isActive: 1,
    type: "",
    calculationConfigParamId: 0,
  };

  const [addInput, setAddInput] = useState({
    inputParameter: "",
  });
  const addInputD = {
    inputParameter: "",
  };
  const [addCon, setAddCon] = useState({
    conditionalValue: "",
  });
  const addConD = {
    conditionalValue: "",
  };
  const [addRates, setAddRates] = useState({
    rateTable: "",
    mID: "",
  });
  const addRatesD = {
    rateTable: "",
    mID: "",
  };
  const [PreConfigured, setPreConfigured] = useState({
    configCal: "",
    mID: "",
  });
  const PreConfiguredD = {
    configCal: "",
    mID: "",
  };
  const [cal, setCal] = useState([]);
  const [calObj, setCalObj] = useState({ entity: "", eValue: "" });
  const calObjD = { entity: "", eValue: "" };
  const [calExprParam, setCalExprParam] = useState([]);
  const [ratesArray, setRatesArray] = useState([]);
  // const [calculators,setCalculators]=useState([]);
  const [post, setPost] = useState([]);
  const [tempId, setTempId] = useState(0);
  useEffect(() => {
    // debugger
    setFields1(fieldsD);
    setCalExprParam([]);
    if (calculatorData && calculatorData.calculationConfigName !== "") {
      const calculatorDataL = calculatorData;
      calculatorDataL.mapperDetails.forEach((x, i) => {
        calculatorDataL.mapperDetails[i].id = x.mapperId;
      });
      setFields1({ ...calculatorDataL });
      setCal([...calI]);
      setUpdateFlag(true);
      setCalExprParam([...arrayParam]);
    }
  }, [calculatorData]);

  const handleRateTable = (e, newValue) => {
    addRates.rateTable = newValue.mValue;
    addRates.mID = newValue.mID;

    setAddRates((prev) => ({ ...prev, ...addRates }));
    const data = { mID: 0, mValue: "" };
    data.mID = newValue.mID;
    data.mValue = newValue.mValue;
    setRatesArray([...ratesArray, { ...data }]);
    calculationConfigParam.calculationConfigParamName = newValue.mValue;
    calculationConfigParam.type = "Rate";
    setCalculationConfigParam((prev) => ({ ...prev, ...calculationConfigParam }));
  };

  const handleConfigCal = (e, newValue) => {
    // const obj =
    PreConfigured.configCal = newValue.mValue;
    PreConfigured.mID = newValue.mID;

    // calculationConfigParam.calculationConfigParamName = newValue.mValue;
    // calculationConfigParam.type = "Calculator";
    // setCalculationConfigParam((prev) => ({ ...prev, ...calculationConfigParam }));

    calObj.entity = newValue.mValue;
    calObj.eValue = newValue.mID;
    setCalObj((prev) => ({ ...prev, ...calObj }));
    setPreConfigured((prev) => ({ ...prev, ...PreConfigured }));
  };

  useEffect(() => {
    let data = [];
    RateNameRule().then((response) => {
      response.forEach((x, i) => {
        const val =
          response[i].mValue !== "" &&
          response[i].mValue !== null &&
          response[i].mValue.includes("-V")
            ? response[i].mValue.split("-")[0]
            : response[i].mValue;
        response[i].mValue = val;
        return null;
      });
      setPost(response);
      data = response;
      let abc = [];

      if (calculatorData != null && calculatorData.calculationConfigParam.length > 0) {
        calculatorData.calculationConfigParam.forEach((y, j) => {
          // debugger;
          if (calculatorData.calculationConfigParam[j].type === "Rate") {
            const rate = data.filter(
              (x) =>
                x.mValue === calculatorData.calculationConfigParam[j].calculationConfigParamName
            )[0];

            abc = [...abc, { ...rate }];
          }
        });
      }

      setRatesArray([...ratesArray, ...abc]);
    });
  }, []);

  const [configName, setConfigName] = useState([]);

  useEffect(() => {
    GetRateConfig().then((response) => {
      setConfigName(response);
    });
  }, []);

  const [configFlag, setConfigFlag] = useState("");

  const handleAdd = () => {
    // debugger;
    setAddInput(addInputD);
    setAddRates(addRatesD);
    setAddCon(addConD);
    setPreConfigured(PreConfiguredD);

    setCalculationConfigParam(calculationConfigParamD);
    setCalObj(calObjD);
    if (calObj.entity !== "") {
      setCal((prev) => [...prev, { ...calObj }]);
    }
    fields1.calculationConfigParam = [
      ...fields1.calculationConfigParam,
      { ...calculationConfigParam },
    ];
    setFields1((prev) => ({ ...prev, ...fields1 }));
  };

  const handleShow = (e, value) => {
    setConfigFlag(value.mValue);
  };
  const [obj, setObj] = useState({
    // id: "",
    steps: "",
    expressionResult: "",
    expressionValue: "",
  });
  const obj1 = {
    // id: "",
    steps: "",
    expressionResult: "",
    expressionValue: "",
  };
  const [fields, setFields] = useState("");

  // const [rows, setRows] = useState([]);
  const columns = [
    { field: "steps", headerName: "Steps", width: 100 },
    { field: "expressionResult", headerName: "Expression Result", width: 200 },
    { field: "expressionValue", headerName: "Expression", width: 800 },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      editable: true,
      renderCell: (param) => {
        const handleEdit = () => {
          //  debugger;

          if (param.row.calculationConfigId > 0 && param.row.calculationConfigExpressionId > 0) {
            calculationConfigExpression.calculationConfigExpressionId =
              param.row.calculationConfigExpressionId;
            calculationConfigExpression.calculationConfigId = param.row.calculationConfigId;
            setCalculationConfigExpression((prev) => ({ ...prev, ...calculationConfigExpression }));
            const id = fields1.calculationConfigParam.filter(
              (x) => x.calculationConfigParamName === param.row.expressionResult
            )[0].calculationConfigParamId;
            setTempId(id);
          }
          const newArray = fields1.calculationConfigExpression.filter(
            (x) => x.steps !== param.row.steps
          );
          const newArray1 = fields1.calculationConfigParam.filter(
            (y) => y.calculationConfigParamName !== param.row.expressionResult
          );
          fields1.calculationConfigExpression = [];
          fields1.calculationConfigParam = [];
          setFields1((prev) => ({
            ...prev,
            calculationConfigExpression: [...prev.calculationConfigExpression, ...newArray],
            calculationConfigParam: [...prev.calculationConfigParam, ...newArray1],
          }));
          obj.steps = param.row.steps;
          obj.expressionResult = param.row.expressionResult;
          obj.expressionValue = "";
          setFields(param.row.expressionValue);
        };
        const handleDelete = () => {
          swal("Are You sure you want to delete this expression?", {
            buttons: {
              cancel: {
                text: "No",

                value: "Cancel",

                visible: true,

                closeModal: true,
              },

              confirm: {
                text: "Yes",

                value: "confirm",

                visible: true,

                closeModal: true,
              },
            },
          }).then(async (value) => {
            if (value === "confirm") {
              //   debugger;
              const newArray = fields1.calculationConfigExpression.filter(
                (x) => x.steps !== param.row.steps
              );
              const newArray1 = fields1.calculationConfigParam.filter(
                (x) => x.calculationConfigParamName !== param.row.expressionResult
              );
              const id = fields1.calculationConfigParam.filter(
                (x) => x.calculationConfigParamName === param.row.expressionResult
              )[0].calculationConfigParamId;
              fields1.calculationConfigExpression = [];
              fields1.calculationConfigParam = [];
              setFields1((prev) => ({
                ...prev,
                calculationConfigExpression: [...prev.calculationConfigExpression, ...newArray],
                calculationConfigParam: [...prev.calculationConfigParam, ...newArray1],
              }));
              // Api to be called for deleting the expression.
              if (updateFlag === true) {
                const deleteExpression = await deleteExp(
                  param.row.calculationConfigExpressionId,
                  id
                );
                if (deleteExpression.status === 200) {
                  swal({
                    icon: "success",
                    text: deleteExpression.data.responseMessage,
                  });
                } else {
                  swal({
                    icon: "error",
                    text: "Expression Deletion Failed",
                  });
                }
              }
            }
          });
        };
        return (
          <Stack direction="row" spacing={2}>
            <IconButton onClick={handleEdit}>
              <EditIcon style={{ color: "dodgerblue" }} />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon style={{ color: "dodgerblue" }} />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState("");
  const handleAddRate = (e) => {
    setObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddFields = (e) => {
    setFields("");
    const temp = `${e.target.value}`;
    setFields(temp);
  };

  const handleAddExp = () => {
    //  debugger;
    setAddInput(addInputD);
    setFields("");
    setObj(obj1);
    setCalculationConfigExpression(calculationConfigExpressionD);
    setCalculationConfigParam(calculationConfigParamD);
    // debugger;

    const temp = {
      calculationConfigParamName: "",
      type: "",
      isActive: 1,
      createdDate: new Date(),
      calculationConfigParamId: 0,
    };
    if (fields !== "" && obj.expressionResult !== "") {
      if (obj.expressionValue === "") {
        obj.expressionValue = fields;
      }
      temp.calculationConfigParamName = obj.expressionResult;
      temp.type = "Result";
      temp.createdDate = new Date();
      temp.isActive = 1;
      if (tempId > 0) {
        temp.calculationConfigParamId = tempId;
      }
      //  temp.calculationConfigId=tempId;
      fields1.calculationConfigParam.push(temp);

      calculationConfigExpression.expressionValue = obj.expressionValue;
      calculationConfigExpression.expressionResult = obj.expressionResult;
      calculationConfigExpression.createdDate = new Date();
      calculationConfigExpression.isActive = 1;
      // calculationConfigExpression.steps = len + 1;
      calculationConfigExpression.steps = obj.steps;

      // setCalculationConfigExpression((prev) => ({ ...prev, ...calculationConfigExpression }));
      fields1.calculationConfigExpression = [
        ...fields1.calculationConfigExpression,
        { ...calculationConfigExpression },
      ];
      setFields1((prev) => ({ ...prev, ...fields1 }));
    } else {
      swal({
        icon: "error",
        text: "Please enter the Expression Result and Value",
      });
    }
  };
  useEffect(() => {
    console.log("111", fields1);
  }, [fields1]);

  const handleEvaluator = (val, type) => {
    // debugger;
    if (type === "Parameter" || type === "Rate" || type === "calExprParam") {
      const newVal = val;
      const a = newVal.split("");
      a.push("}");
      a.unshift("{");
      const final = a.join("");

      const temp = `${fields}${final}`;
      setFields(temp);
    } else {
      const temp = `${fields}${val}`;
      setFields(temp);
    }
  };
  const handleSave = async () => {
    // debugger;
    fields1.mapperDetails.forEach((x, i) => {
      delete fields1.mapperDetails[i].id;
      // delete fields1.mapperDetails[i].MapperId;
    });

    const callCreate = await CreateCal(fields1);
    console.log("Saved Data", callCreate);
    if (callCreate.status === 200) {
      swal({
        icon: "success",

        text: callCreate.data.responseMessage,
      }).then((value) => {
        if (value === true) {
          window.location.reload();
        }
      });
      setFields1(fieldsD);
      setCal([]);
      setCalExprParam([]);
      setOpen(false);
      setOpen1("");
    } else {
      swal({
        icon: "error",
        text: `Calculation Configuration Failed!`,
      });
    }
    // }
  };
  const handleUpdate = async () => {
    //  debugger;
    fields1.mapperDetails.forEach((x, i) => {
      delete fields1.mapperDetails[i].id;
      // delete fields1.mapperDetails[i].MapperId;
    });

    const callUpdate = await UpdateCal(fields1);
    console.log("Saved Data", callUpdate);
    if (callUpdate.status === 200) {
      swal({
        icon: "success",

        text: callUpdate.data.responseMessage,
      }).then((value) => {
        if (value === true) {
          window.location.reload();
        }
      });
      setFields1(fieldsD);
      setCal([]);
      setCalExprParam([]);
      setOpen(false);
      setOpen1("");
    } else {
      swal({
        icon: "error",
        text: `Calculator Updation Failed!`,
      });
    }
    // }
  };
  const handleInputPara = (e) => {
    setAddInput({ ...addInput, inputParameter: e.target.value });

    calculationConfigParam.calculationConfigParamName = e.target.value;
    calculationConfigParam.type = "Param";
    setCalculationConfigParam((prev) => ({ ...prev, ...calculationConfigParam }));
  };
  const handleConditinalValue = (e) => {
    setAddCon({ ...addCon, conditionalValue: e.target.value });
    calculationConfigParam.calculationConfigParamName = e.target.value;
    calculationConfigParam.type = "Condition";
    setCalculationConfigParam((prev) => ({ ...prev, ...calculationConfigParam }));
  };
  const handleDeleteParams = (item) => {
    if (
      fields1.calculationConfigId > 0 &&
      updateFlag === true &&
      item.calculationConfigParamId > 0
    ) {
      // const id = fields1.calculationConfigParam.filter(
      //   (x) => x.calculationConfigParamName === item.calculationConfigParamName
      // )[0].calculationConfigParamId;
      swal("Are you sure you want to delete?", {
        buttons: {
          confirm: {
            value: "confirm",
            closeModal: true,
            text: "Yes",
            visible: true,
          },
          cancel: {
            value: "cancel",
            closeModal: true,
            text: "No",
            visible: true,
          },
        },
      }).then(async (value) => {
        if (value === "confirm") {
          const deletedParam = await deleteCalculatorParameters(
            fields1.calculationConfigId,
            item.calculationConfigParamId
          );
          if (deletedParam.status === 200) {
            swal({ icon: "success", text: deletedParam.data.responseMessage });
            const newArray = fields1.calculationConfigParam.filter(
              (x) => x.calculationConfigParamName !== item.calculationConfigParamName
            );
            fields1.calculationConfigParam = [];
            if (item.type === "Rate") {
              const newRatesArray = ratesArray.filter(
                (x) => x.mValue !== item.calculationConfigParamName
              );
              setRatesArray([]);
              setRatesArray((prev) => [...prev, ...newRatesArray]);
            }

            setFields1((prev) => ({
              ...prev,
              calculationConfigParam: [...prev.calculationConfigParam, ...newArray],
            }));
          } else {
            swal({ icon: "error", text: "Parameter Not Found" });
          }
        }
      });
    } else {
      const newArray = fields1.calculationConfigParam.filter(
        (x) => x.calculationConfigParamName !== item.calculationConfigParamName
      );
      fields1.calculationConfigParam = [];
      if (item.type === "Rate") {
        const newRatesArray = ratesArray.filter(
          (x) => x.mValue !== item.calculationConfigParamName
        );
        setRatesArray([]);
        setRatesArray((prev) => [...prev, ...newRatesArray]);
      }
      setFields1((prev) => ({
        ...prev,
        calculationConfigParam: [...prev.calculationConfigParam, ...newArray],
      }));
    }
  };

  const handleOpen = (e, type) => {
    setOpen1(type);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen1("");
  };

  // const handleChangeStatus = ({ meta, file }, status) => {
  //   console.log(status, meta, file);
  // };
  // const handleSubmit = async (files) => {
  //   // debugger;
  //   rate.RateName = rate.RateName.split(" ").join("");
  //   rate.RateName = fields.rateName.replace(/[^a-zA-Z0-9 ]/g, "");
  //   if (rate.RateName !== "") console.log(files.map((f) => f.meta));
  //   const data = new FormData();
  //   if (files.length > 0) {
  //     for (let i = 0; i < files.length; i += 1) {
  //       data.append(files[i].file.name, files[i].file);
  //     }
  //     console.log("data", data);
  //     // console.log("fields", fields);
  //   }
  //   if (rate.RateName === "") {
  //     swal({
  //       icon: "error",

  //       text: "some fields are missing",
  //     });
  //   } else {
  //     const UploadFile = await RateNameUpload(rate, data);
  //     console.log("upload", UploadFile);
  //     swal({
  //       icon: "success",

  //       text: "Rate table saved successfully",
  //     });
  //   }
  // };

  // const handleReset = () => {
  //   setObj(obj1);
  //   setFields("");
  // };

  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Define Calculation
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Calculation Name"
            value={fields1.calculationConfigName}
            onChange={(e) => {
              setFields1({ ...fields1, calculationConfigName: e.target.value });
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
            options={DataBaseBind.RateConfig}
            onChange={handleShow}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Rate Config" />}
          />
        </Grid>
        {configFlag === "Rate" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              id="multiple-select"
              options={post}
              onChange={handleRateTable}
              value={{ mValue: addRates.rateTable }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Add Rate Table" />}
            />
          </Grid>
        )}

        {configFlag === "Parameter" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Add Input Parameter"
              onChange={handleInputPara}
              value={addInput.inputParameter}
            />
          </Grid>
        )}
        {configFlag === "ConditionalValues" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Add Conditional Values"
              onChange={handleConditinalValue}
              value={addCon.conditionalValue}
            />
          </Grid>
        )}
        {configFlag === "PreConfiguredCalculators" && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              id="multiple-select"
              options={configName.data}
              onChange={handleConfigCal}
              value={{ mValue: PreConfigured.configCal }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label="Preconfigured Calculator
              "
                />
              )}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
          <IconButton onClick={handleAdd}>
            <AddCircleIcon fontSize="medium" style={{ color: "dodgerblue" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6" color="primary">
            Expression Operator
          </MDTypography>

          <Card sx={{ height: "200px", width: "330px", overflow: "auto" }}>
            <Stack spacing={2} direction="row" p={2}>
              <Chip label="(" onClick={() => handleEvaluator("(")} />
              <Chip label=")" onClick={() => handleEvaluator(")")} />
              <Chip label="+" onClick={() => handleEvaluator("+")} />
              <Chip label="-" onClick={() => handleEvaluator("-")} />
              <Chip label="*" onClick={() => handleEvaluator("*")} />
              <Chip label="/" onClick={() => handleEvaluator("/")} />
            </Stack>
            <Stack spacing={2} direction="row" p={2}>
              <Chip label="%" onClick={() => handleEvaluator("%")} />
              <Chip label="." onClick={() => handleEvaluator(".")} />
              <Chip label="IIF" onClick={() => handleEvaluator("IIF")} />
              <Chip label=">" onClick={() => handleEvaluator(">")} />
              <Chip label="<" onClick={() => handleEvaluator("<")} />
            </Stack>
            <Stack spacing={2} direction="row" p={2}>
              <Chip label="AND" onClick={() => handleEvaluator("AND")} />
              <Chip label="OR" onClick={() => handleEvaluator("OR")} />
              <Chip label="," onClick={() => handleEvaluator(",")} />
              <Chip label="'" onClick={() => handleEvaluator("'")} />
              <Chip label="=" onClick={() => handleEvaluator("=")} />
            </Stack>
            <Stack spacing={2} direction="row" p={2}>
              <Chip label="0" onClick={() => handleEvaluator("0")} />
              <Chip label="1" onClick={() => handleEvaluator("1")} />
              <Chip label="2" onClick={() => handleEvaluator("2")} />
              <Chip label="3" onClick={() => handleEvaluator("3")} />
              <Chip label="4" onClick={() => handleEvaluator("4")} />
              <Chip label="5" onClick={() => handleEvaluator("5")} />
            </Stack>
            <Stack spacing={2} direction="row" p={2}>
              <Chip label="6" onClick={() => handleEvaluator("6")} />
              <Chip label="7" onClick={() => handleEvaluator("7")} />
              <Chip label="8" onClick={() => handleEvaluator("8")} />
              <Chip label="9" onClick={() => handleEvaluator("9")} />
              <Chip label="Convert" onClick={() => handleEvaluator("Convert")} />
            </Stack>
            <Stack spacing={2} direction="row" p={2}>
              <Chip label="System.Int32" onClick={() => handleEvaluator("System.Int32")} />
              <Chip label="System.Int64" onClick={() => handleEvaluator("System.Int64")} />
            </Stack>
            <Stack spacing={2} direction="row" p={2}>
              <Chip label="System.Double" onClick={() => handleEvaluator("System.Double")} />
              <Chip label="System.Decimal" onClick={() => handleEvaluator("System.Decimal")} />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Card sx={{ width: "800px", height: "200px", overflow: "auto", top: "24px" }}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                {/* <Grid item my={2}> */}
                <MDTypography variant="h6" color="fffff">
                  Parameter
                </MDTypography>

                <Paper autoHeight elevation={2} style={{ overflowX: "auto" }}>
                  {fields1.calculationConfigParam.map((item) =>
                    item.type === "Param" || item.type === "Result" ? (
                      <Chip
                        label={item.calculationConfigParamName}
                        onClick={() =>
                          handleEvaluator(item.calculationConfigParamName, "Parameter")
                        }
                        onDelete={() => handleDeleteParams(item)}
                      />
                    ) : null
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" color="fffff">
                  Conditional Values
                </MDTypography>
                <Paper autoHeight elevation={2} style={{ overflowX: "auto" }}>
                  {fields1.calculationConfigParam.map((item) =>
                    item.type === "Condition" ? (
                      <Chip
                        label={item.calculationConfigParamName}
                        onClick={() =>
                          handleEvaluator(item.calculationConfigParamName, "Condition")
                        }
                        onDelete={() => handleDeleteParams(item)}
                      />
                    ) : null
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" color="fffff">
                  Rates
                </MDTypography>
                <Paper autoHeight elevation={2} style={{ overflowX: "auto" }}>
                  {fields1.calculationConfigParam.map((item) =>
                    item.type === "Rate" ? (
                      <Chip
                        label={item.calculationConfigParamName}
                        onClick={() => handleEvaluator(item.calculationConfigParamName, "Rate")}
                        onDelete={() => handleDeleteParams(item)}
                      />
                    ) : null
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" color="fffff">
                  PreConfigured Calculators
                </MDTypography>
                <Paper autoHeight elevation={2} style={{ overflowX: "auto" }}>
                  {cal.map(
                    (item) => (
                      // item.type === "Calculator" ?
                      <Chip
                        label={item.entity}
                        // onClick={() =>
                        //   handleEvaluator(item.entity, "Calculator")
                        // }
                        // onDelete={() => handleDeleteParams(item)}
                      />
                    )
                    // : null
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography variant="h6" color="fffff">
                  Expression Params
                </MDTypography>
                <Paper autoHeight elevation={2}>
                  {calExprParam.map((item) => (
                    <Chip
                      label={item}
                      onClick={() => handleEvaluator(item, "calExprParam")}
                      //  onDelete={() => handleDeleteParams(item.calculationConfigParamId)}
                    />
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Expression Condition
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
          <MDTypography variant="h6" color="primary">
            Steps
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            name="fields"
            label="ExpressionValue"
            value={fields}
            onChange={handleAddFields}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            name="expressionResult"
            label="ExpressionResult"
            value={obj.expressionResult}
            onChange={handleAddRate}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
          <MDInput name="steps" label="Step" value={obj.steps} onChange={handleAddRate} />
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
          <IconButton>
            <AddCircleIcon
              fontSize="medium"
              onClick={handleAddExp}
              style={{ color: "dodgerblue" }}
            />
          </IconButton>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
          <IconButton>
            <RestartAltIcon fontSize="large" onClick={handleReset} />
          </IconButton>
        </Grid> */}
      </Grid>
      {fields1.calculationConfigExpression.length > 0 ? (
        <MDBox p={2}>
          <DataGrid
            autoHeight
            rows={fields1.calculationConfigExpression}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.steps}
            components={{ Toolbar: GridToolbar }}
          />
        </MDBox>
      ) : null}

      {/* <Grid container justifyContent="center" p={2} alignItems="bottom">
        <Dropzone maxFiles={1} onChangeStatus={handleChangeStatus} onSubmit={handleSubmit} />
      </Grid> */}
      <Stack justifyContent="left" direction="row" spacing={2} p={2}>
        <MDButton variant="outlined" onClick={(e) => handleOpen(e, "para")}>
          MAP PARAMETERS
        </MDButton>
        <Modal open={open} onClose={handleClose}>
          <MDBox
            sx={{
              position: "absolute",
              top: "-1%",
              left: "81%",
              transform: "translate(-85%, 6%)",
              width: "1300px",
              height: 520,
              bgcolor: "background.paper",
              boxShadow: 24,
              textAlign: "center",
              p: 4,
              overflow: "auto",
              // "max-height": "100%",
              // "overflow-y": "auto",
            }}
          >
            <Stack justifyContent="right" direction="row" spacing={2}>
              <MDButton round onClick={handleClose} textAlign="right">
                x
              </MDButton>
            </Stack>
            {open1 === "para" ? (
              <ParameterMapping
                fields1={fields1}
                setFields1={setFields1}
                ratesArray={ratesArray}
                updateFlag={updateFlag}
                configName={configName}
                cal={cal}
              />
            ) : (
              <CalculatorMapping
                fields1={fields1}
                setFields1={setFields1}
                updateFlag={updateFlag}
                cal={cal}
                configName={configName}
                calExprParam={calExprParam}
                setCalExprParam={setCalExprParam}
              />
            )}
          </MDBox>
        </Modal>{" "}
        <MDButton variant="outlined" onClick={(e) => handleOpen(e, "para1")}>
          MAP CALCULATORS
        </MDButton>
      </Stack>
      <Grid container justifyContent="center" alignItems="center">
        {updateFlag === false ? (
          <MDButton variant="contained" onClick={handleSave}>
            SAVE
          </MDButton>
        ) : (
          <MDButton variant="contained" onClick={handleUpdate}>
            UPDATE
          </MDButton>
        )}
      </Grid>
    </Card>
  );
}

export default CalculationConfig;
