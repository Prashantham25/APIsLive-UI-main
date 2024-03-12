import {
  Grid,
  Autocomplete,
  FormControl,
  FormLabel,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Icon,
  Paper,
} from "@mui/material";
import objectPath from "object-path";
import ReactJson from "react-json-view";

import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import {
  autoStyle,
  modalStyle,
  compTypes,
  onChangeFuncOption,
  onBlurFuncOption,
  operator,
  // dataTypes,
  variants,
  colors,
  justifyContent,
  bindingType,
  whereToBind,
  httpMethods,
} from "./data";
import MDTypography from "../../../../../components/MDTypography";
import { arrayRange } from "../../../../../Common/Validations";
// import MDTypography from "../../../../../components/MDTypography";

export default function ControlDetails({
  componentProp,
  setComponentProp,
  compEditFlg,
  selectedStepName2,
  selectedAccordionName2,
  stepsArr,
  accordionArr,
  componentArr,
  setComponentArr,
  setCompEditFlg,
  setModelFlag,
  onModelClose,
  mastersList,
  functionsList,
}) {
  const lComponentProp = componentProp;
  // const [addProperties, setAddProperties] = useState({
  //   path: "",
  //   dataType: "",
  //   data: "",
  // });

  const onComponentChange = (n, v, inputType) => {
    console.log("vvv", v);
    const componentProp1 = componentProp;
    if (n === "disabled")
      if (v === "true") {
        objectPath.set(componentProp1, n, true);
        objectPath.del(componentProp1, "disabledDetails");
      } else if (v === "false") {
        objectPath.set(componentProp1, n, false);
        objectPath.del(componentProp1, "disabledDetails");
      } else {
        objectPath.set(componentProp1, n, v);
      }
    else if (n === "error") objectPath.set(componentProp1, n, v === true || v === "true");
    else if (n === "disableOnReset") objectPath.set(componentProp1, n, v === true || v === "true");
    else if (n === "visible") {
      if (v === "true") {
        objectPath.set(componentProp1, n, true);
        objectPath.del(componentProp1, "visibleDetails");
      } else if (v === "false") {
        objectPath.set(componentProp1, n, false);
        objectPath.del(componentProp1, "visibleDetails");
      } else {
        objectPath.set(componentProp1, n, v);
      }
    } else if (n === "required") {
      if (v === "true") {
        objectPath.set(componentProp1, n, true);
        objectPath.del(componentProp1, "requiredDetails");
      } else if (v === "false") {
        objectPath.set(componentProp1, n, false);
        objectPath.del(componentProp1, "requiredDetails");
      } else {
        objectPath.set(componentProp1, n, v);
      }
    } else if (n === "visibleDetails.value" || n === "requiredDetails.value") {
      const v1 = parseInt(v, 10);

      if (v1 && v.length === v1.toString().length)
        objectPath.set(componentProp1, n, parseInt(v, 10));
      else objectPath.set(componentProp1, n, v);
    } else if (inputType !== undefined && inputType === "number")
      objectPath.set(componentProp1, n, parseInt(v, 10));
    else if (inputType !== undefined && inputType === "obj")
      objectPath.set(componentProp1, n, JSON.parse(v));
    else objectPath.set(componentProp1, n, v);

    setComponentProp({ ...componentProp1 });
  };
  const onComponentAdd2 = () => {
    const componentArr1 = componentArr;

    if (compEditFlg.flag === false)
      stepsArr.forEach((x1, i1) => {
        if (x1.name === selectedStepName2) {
          accordionArr[i1].forEach((x2, i2) => {
            if (x2.name === selectedAccordionName2) componentArr[i1][i2].push({ ...componentProp });
          });
        }
      });
    if (compEditFlg.flag === true) {
      componentArr1[compEditFlg.ind[0]][compEditFlg.ind[1]][compEditFlg.ind[2]] = {
        ...componentProp,
      };
      setModelFlag((p) => ({ ...p, controlDetails: false }));
    }
    setComponentArr([...componentArr1]);
    setCompEditFlg({ flag: false, ind: [] });
  };

  // const onDataType = (name, value) => {
  //   addProperties[name] = value;
  //   setAddProperties({ ...addProperties });
  // };
  // const onAddProperties = () => {
  //   if (addProperties.dataType === "Integer") {
  //     objectPath.set(lComponentProp, addProperties.path, parseInt(addProperties.data, 10));
  //   } else if (addProperties.dataType === "Boolean") {
  //     objectPath.set(lComponentProp, addProperties.path, addProperties.data === "true");
  //   } else if (addProperties.dataType === "String") {
  //     objectPath.set(lComponentProp, addProperties.path, addProperties.data);
  //   } else if (addProperties.dataType === "Object" || addProperties.dataType === "Array") {
  //     objectPath.set(lComponentProp, addProperties.path, JSON.parse(addProperties.data));
  //   }
  //   setComponentProp({ ...lComponentProp });
  //   // setAddProperties({ path: "", dataType: "", data: "" });
  // };

  const onAddConditions = (n) => {
    const arr1 = Array.isArray(lComponentProp?.[n]?.conditions)
      ? [...lComponentProp[n].conditions]
      : [];
    const arr2 = Array.isArray(lComponentProp?.[n]?.logics) ? [...lComponentProp[n].logics] : [];
    const arr3 = Array.isArray(lComponentProp?.[n]?.logicsPrecedence)
      ? [...lComponentProp[n].logicsPrecedence]
      : [];

    if (arr1.length > 0) {
      objectPath.set(lComponentProp, `${n}.logics`, [...arr2, ""]);
      objectPath.set(lComponentProp, `${n}.logicsPrecedence`, [...arr3, arr3.length]);
    }
    objectPath.set(lComponentProp, `${n}.conditions`, [
      ...arr1,
      { path: "", operator: "", value: "" },
    ]);
    setComponentProp({ ...lComponentProp });
  };

  const onDeleteConditions = (n, ind) => {
    lComponentProp[n].conditions = lComponentProp[n].conditions.filter((x, i) => i !== ind);
    lComponentProp[n].logics.pop();
    lComponentProp[n].logicsPrecedence.pop();
    setComponentProp({ ...lComponentProp });
  };

  const spreedRadioList = () => {
    const arr = [
      {
        type: "RadioGroup",
        visible: componentProp.type === "RadioGroup",
        label: "Radio Group Label Visible",
        path: "radioLabel.labelVisible",
      },
      {
        type: "Input",
        visible: componentProp.type === "RadioGroup",
        label: "Radio Group Label",
        path: "radioLabel.label",
      },
      {
        type: "Typography",
        visible: componentProp.type === "RadioGroup",
        label: "",
        spacing: 12,
      },
    ];
    const arr2 = arrayRange(0, 5, 1);
    arr2.forEach((x, i) => {
      arr.push({
        type: "Typography",
        visible: componentProp.type === "RadioGroup",
        label: `Radio ${i + 1}`,
        spacing: 2,
      });
      arr.push({
        type: "Input",
        visible: componentProp.type === "RadioGroup",
        label: "Label",
        path: `radioList.${i}.label`,
        spacing: 5,
      });
      arr.push({
        type: "Input",
        visible: componentProp.type === "RadioGroup",
        label: "Value",
        path: `radioList.${i}.value`,
        spacing: 5,
      });
    });
    return arr;
  };

  const onAddTask = () => {
    // lComponentProp.customOnChange = lComponentProp?.customOnChange
    //   ? [...lComponentProp.customOnChange]
    //   : [];
    // lComponentProp.customOnChange.push({ taskType: "" });
    lComponentProp.functionList = lComponentProp?.functionList
      ? [...lComponentProp.functionList]
      : [];
    lComponentProp.functionList.push({ functionType: "", functionName: "" });
    setComponentProp({ ...lComponentProp });
  };

  const onAddApiPaths = (i) => {
    lComponentProp.customOnChange[i].pathsToBind = lComponentProp?.customOnChange?.[i]?.pathsToBind
      ? [...lComponentProp.customOnChange[i].pathsToBind]
      : [];
    lComponentProp.customOnChange[i].pathsToBind.push({ from: "", to: "" });
    setComponentProp({ ...lComponentProp });
  };

  const onAddRequestPaths = (i) => {
    lComponentProp.customOnChange[i].setRequestObj = lComponentProp?.customOnChange?.[i]
      ?.setRequestObj
      ? [...lComponentProp.customOnChange[i].setRequestObj]
      : [];
    lComponentProp.customOnChange[i].setRequestObj.push({ from: "", to: "" });
    setComponentProp({ ...lComponentProp });
  };

  const onAddMultiplePaths = () => {
    lComponentProp.paths = lComponentProp?.paths ? [...lComponentProp.paths] : [];
    lComponentProp.paths.push({ path: "", parameter: "" });
    setComponentProp({ ...lComponentProp });
  };

  const AllControlsParameters = [
    {
      type: "AutoComplete",
      visible: true,
      options: compTypes,
      label: "Control Type",
      path: "type",
    },
    {
      type: "AutoComplete",
      visible: componentProp.type === "ValidationControl",
      options: compTypes,
      label: "Sub Type",
      path: "subType",
    },

    {
      type: "Input",
      visible: componentProp.type === "StaticMerge",
      label: "Static Component Name",
      path: "componentName",
    },
    {
      type: "Input",
      visible: componentProp.type !== "RadioGroup",
      label: "Component Label",
      path: "label",
    },
    ...spreedRadioList(),
    {
      type: "Input",
      visible: true,
      label: "Json Path",
      path: "path",
    },
    {
      type: "AutoComplete",
      visible: componentProp.type === "AutoComplete",
      label: "DropDown Options",
      options: mastersList,
      path: "options",
    },
    {
      type: "Input",
      visible: componentProp.type === "AutoComplete",
      label: "Options Label",
      path: "optionLabel",
    },
    {
      type: "Input",
      visible: componentProp.type === "AutoComplete",
      label: "Set Options Value",
      path: "setOption",
    },

    {
      type: "Input",
      visible: true,
      label: "Helper Text",
      path: "helperText",
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Color",
      path: "color",
      options: colors,
    },
    {
      type: "Input",
      visible: true,
      label: "Grid Width Spacing",
      path: "spacing",
      inputType: "number",
      spacing: 2,
    },
    {
      type: "Input",
      visible: true,
      label: "Validation Id",
      path: "validationId",
      inputType: "number",
      spacing: 2,
    },
    {
      type: "Input",
      visible: true,
      label: "Accordion Id",
      path: "accordionId",
      inputType: "number",
      spacing: 2,
    },
    {
      type: "Input",
      visible: true,
      label: "Split Id",
      path: "splitId",
      inputType: "number",
      spacing: 2,
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Justify Content",
      path: "justifyContent",
      options: justifyContent,
    },
    {
      type: "Input",
      visible: true,
      label: "Width",
      path: "width",
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Variant",
      path: "variant",
      options: variants,
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Visible",
      path: "visible",
      options: ["true", "false", "visibleDetails"],
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Required",
      path: "required",
      options: ["true", "false", "requiredDetails"],
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Disabled",
      path: "disabled",
      options: ["true", "false", "disabledDetails"],
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Disable On Reset",
      path: "disableOnReset",
      options: ["true", "false"],
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "Error",
      path: "error",
      options: ["true", "false"],
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "onChange Validation",
      path: "onChangeFuncs.0",
      options: onChangeFuncOption,
    },
    {
      type: "AutoComplete",
      visible: true,
      label: "onBlur Validation",
      path: "onBlurFuncs.0",
      options: onBlurFuncOption,
    },
    // options filter Criteria
    {
      type: "Typography",
      visible: componentProp.type === "AutoComplete",
      label: `Options Filter Criteria`,
      spacing: 12,
    },
    {
      type: "AutoComplete",
      visible: componentProp.type === "AutoComplete",
      label: "Options Filter Parameter",
      path: "filterCriteria.parameterType",
      options: ["Object", "Index"],
    },
    {
      type: "Input",
      visible: componentProp.type === "AutoComplete",
      label: "Key name of Object",
      path: "filterCriteria.keyName",
    },
    {
      type: "AutoComplete",
      visible: componentProp.type === "AutoComplete",
      label: "Operator",
      path: "filterCriteria.operator",
      options: operator,
    },
    {
      type: "AutoComplete",
      visible: componentProp.type === "AutoComplete",
      label: "Value From",
      path: "filterCriteria.valueFrom",
      options: ["Policy Json", "local Variables", "Direct value"],
    },
    {
      type: "Input",
      visible: componentProp.type === "AutoComplete",
      label: "Options Parameter Value",
      path: "filterCriteria.value",
    },
  ];

  return (
    <MDBox sx={modalStyle}>
      <Grid container>
        <Grid item md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={2} justifyContent="right">
            <MDButton variant="outlined" onClick={onComponentAdd2} sx={{ width: "200px" }}>
              {compEditFlg.flag ? "Update" : "ADD"}
            </MDButton>
            <IconButton onClick={onModelClose}>
              <Icon color="error">close</Icon>
            </IconButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
          <Grid container spacing={0.5} p={0.5}>
            {AllControlsParameters.map(
              (x) =>
                x.visible === true && (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={x.spacing || 4}
                    lg={x.spacing || 4}
                    xl={x.spacing || 4}
                    xxl={x.spacing || 4}
                  >
                    {x.type === "AutoComplete" && (
                      <Autocomplete
                        options={x.options}
                        sx={autoStyle}
                        value={componentProp[x.path]}
                        getOptionLabel={(option) => option}
                        onChange={(e, a) => onComponentChange(x.path, a)}
                        renderInput={(params) => <MDInput {...params} label={x.label} />}
                      />
                    )}

                    {x.type === "Input" && (
                      <MDInput
                        label={x.label}
                        value={objectPath.get(componentProp, x.path)}
                        onChange={(e) => onComponentChange(x.path, e.target.value, x.inputType)}
                        type={x.inputType}
                      />
                    )}

                    {x.type === "RadioGroup" && (
                      <FormControl>
                        <FormLabel>{x.label}</FormLabel>
                        <RadioGroup
                          row
                          value={objectPath.get(componentProp, x.path)}
                          onChange={(e) => onComponentChange(x.path, e.target.value === "true")}
                        >
                          {/* eslint-disable */}
                          <FormControlLabel value="true" control={<Radio />} label="True" />
                          <FormControlLabel value="false" control={<Radio />} label="False" />
                          {/* eslint-enable */}
                        </RadioGroup>
                      </FormControl>
                    )}

                    {x.type === "Typography" && <MDTypography>{x.label}</MDTypography>}
                  </Grid>
                )
            )}
            {lComponentProp.type === "AutoComplete" && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDButton variant="outlined" onClick={onAddMultiplePaths}>
                  Add to bind multiple values
                </MDButton>
              </Grid>
            )}
            {lComponentProp.type === "AutoComplete" && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {componentProp?.paths?.map((x, i) => (
                  <Stack direction="row" spacing={2}>
                    <MDInput
                      label="Json path to bind"
                      value={x.path}
                      onChange={(e) => onComponentChange(`paths.${i}.path`, e.target.value)}
                    />
                    <MDInput
                      label="parameter Name"
                      value={x.parameter}
                      onChange={(e) => onComponentChange(`paths.${i}.parameter`, e.target.value)}
                    />
                  </Stack>
                ))}
              </Grid>
            )}
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack spacing={3} direction="row">
                <MDTypography>variant</MDTypography>
                {variants.map((x) => (
                  <MDButton variant={x} onClick={() => onComponentChange("variant", x)}>
                    {x}
                  </MDButton>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack spacing={1} direction="row">
                <MDTypography>color</MDTypography>
                {colors.map((x) => (
                  <MDButton color={x} onClick={() => onComponentChange("color", x)}>
                    {x}
                  </MDButton>
                ))}
              </Stack>
            </Grid> */}
            {[
              { buttonLabel: "Visible", param2: "visibleDetails", param1: "visible" },
              { buttonLabel: "Required", param2: "requiredDetails", param1: "required" },
              { buttonLabel: "Disabled", param2: "disabledDetails", param1: "disabled" },
            ].map(
              (x) =>
                componentProp[x.param1] === x.param2 && (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
                    <Paper elevation={10}>
                      <MDBox p={3}>
                        <MDButton
                          onClick={() => onAddConditions(x.param2)}
                        >{`Add ${x.buttonLabel} conditions`}</MDButton>
                        {componentProp?.[x.param2]?.conditions?.map((x1, i1) => (
                          <Grid container spacing={1} m={1}>
                            <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                              <MDTypography>{`C${i1}`}</MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                label="Policy Json Path"
                                name="path"
                                value={x1.path}
                                onChange={(e) =>
                                  onComponentChange(
                                    `${x.param2}.conditions.${i1}.path`,
                                    e.target.value
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                              <Autocomplete
                                options={operator}
                                sx={autoStyle}
                                value={x1.operator}
                                getOptionLabel={(option) => option}
                                onChange={(e, a) =>
                                  onComponentChange(`${x.param2}.conditions.${i1}.operator`, a)
                                }
                                renderInput={(params) => <MDInput {...params} label="Operator" />}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                label="Value"
                                name="Value"
                                value={x1.value}
                                onChange={(e) =>
                                  onComponentChange(
                                    `${x.param2}.conditions.${i1}.value`,
                                    e.target.value
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                              <IconButton onClick={() => onDeleteConditions(x.param2, i1)}>
                                <Icon>delete</Icon>
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                        {componentProp?.[x.param2]?.conditions?.length > 1 && (
                          <Stack spacing={1} direction="row">
                            <MDTypography>Select Logical Operator : </MDTypography>
                            {componentProp?.[x.param2]?.conditions?.map((x2, i2) => (
                              <Stack direction="row" spacing={1}>
                                <MDTypography>{`C${i2}`}</MDTypography>
                                {componentProp[x.param2].conditions.length - 1 !== i2 &&
                                  componentProp[x.param2].conditions.length !== 0 && (
                                    <Autocomplete
                                      fullWidth
                                      options={["&&", "||"]}
                                      sx={{ ...autoStyle, width: "120px" }}
                                      value={componentProp?.[x.param2]?.logics?.[i2]}
                                      onChange={(e, a) =>
                                        onComponentChange(`${x.param2}.logics.${i2}`, a)
                                      }
                                      renderInput={(params) => (
                                        <MDInput {...params} label={`Operator ${i2}`} />
                                      )}
                                    />
                                  )}
                              </Stack>
                            ))}
                          </Stack>
                        )}
                        {componentProp?.[x.param2]?.conditions?.length > 1 && (
                          <Stack spacing={1} direction="row" mt={1}>
                            <MDTypography>Logical Operator Precedence : </MDTypography>
                            {componentProp?.[x.param2]?.logicsPrecedence?.map((x2, i2) => (
                              <MDInput
                                sx={{ width: "120px" }}
                                value={x2}
                                type="number"
                                label={`Precedence ${i2}`}
                                onChange={(e) =>
                                  onComponentChange(
                                    `${x.param2}.logicsPrecedence.${i2}`,
                                    parseInt(e.target.value, 10)
                                  )
                                }
                              />
                            ))}
                          </Stack>
                        )}
                      </MDBox>
                    </Paper>
                  </Grid>
                )
            )}

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDButton onClick={onAddTask}>Add Task</MDButton>
            </Grid>

            {componentProp?.functionList?.map((x1, i1) => (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Grid container sx={{ border: "solid" }} spacing={1} m={0.3} p={0.3}>
                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                    <MDTypography>{`Task ${i1 + 1}`}</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <Autocomplete
                      options={["OnChange", "OnBlur", "OnClick", "OnFocus"]}
                      sx={autoStyle}
                      getOptionLabel={(option) => option}
                      onChange={(e, a) => onComponentChange(`functionList.${i1}.eventType`, a)}
                      value={x1.eventType}
                      renderInput={(params) => <MDInput {...params} label="Event Type" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <Autocomplete
                      options={functionsList}
                      sx={autoStyle}
                      getOptionLabel={(option) => option}
                      onChange={(e, a) => onComponentChange(`functionList.${i1}.functionName`, a)}
                      value={x1.functionName}
                      renderInput={(params) => <MDInput {...params} label="Function Name" />}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}

            {false &&
              componentProp?.customOnChange?.map((x1, i1) => (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Grid container sx={{ border: "solid" }} spacing={1} m={0.3} p={0.3}>
                    <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                      <MDTypography>{`Task ${i1 + 1}`}</MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <Autocomplete
                        options={["Call Dependency Masters"]}
                        sx={autoStyle}
                        value={x1.taskType}
                        getOptionLabel={(option) => option}
                        onChange={(e, a) => onComponentChange(`customOnChange.${i1}.taskType`, a)}
                        renderInput={(params) => <MDInput {...params} label="Task Type" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <Autocomplete
                        options={httpMethods}
                        sx={autoStyle}
                        getOptionLabel={(option) => option}
                        onChange={(e, a) => onComponentChange(`customOnChange.${i1}.method`, a)}
                        value={x1.method}
                        renderInput={(params) => <MDInput {...params} label="Method" />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        label="URL"
                        value={x1.url}
                        onChange={(e) =>
                          onComponentChange(`customOnChange.${i1}.url`, e.target.value)
                        }
                      />
                    </Grid>
                    {x1.method === "post" && (
                      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                        <MDInput
                          label="Request Object"
                          value={JSON.stringify(x1.requestObj)}
                          multiline
                          row={3}
                          onChange={(e) =>
                            onComponentChange(
                              `customOnChange.${i1}.requestObj`,
                              e.target.value,
                              "obj"
                            )
                          }
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        options={bindingType}
                        sx={autoStyle}
                        getOptionLabel={(option) => option}
                        onChange={(e, a) =>
                          onComponentChange(`customOnChange.${i1}.bindingType`, a)
                        }
                        value={x1.bindingType}
                        renderInput={(params) => <MDInput {...params} label="Binding Type" />}
                      />
                    </Grid>
                    {x1.bindingType === "Individual" && (
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <Autocomplete
                          options={whereToBind}
                          sx={autoStyle}
                          getOptionLabel={(option) => option}
                          onChange={(e, a) =>
                            onComponentChange(`customOnChange.${i1}.whereToBind`, a)
                          }
                          value={x1.whereToBind}
                          renderInput={(params) => (
                            <MDInput {...params} label="Response, Where To Bind" />
                          )}
                        />
                      </Grid>
                    )}

                    {x1.method === "post" && (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Stack direction="row" spacing={2}>
                          <MDTypography variant="h6">set Request Obj</MDTypography>{" "}
                          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                            <MDButton variant="outlined" onClick={() => onAddRequestPaths(i1)}>
                              Add Paths
                            </MDButton>
                          </MDBox>
                        </Stack>
                        {x1?.setRequestObj?.map((x3, i3) => (
                          <Stack direction="row" spacing={1} p={1}>
                            <MDTypography variant="h6">{i3 + 1}</MDTypography>

                            <MDInput
                              label="Json Path"
                              value={x3.from}
                              onChange={(e) =>
                                onComponentChange(
                                  `customOnChange.${i1}.setRequestObj.${i3}.from`,
                                  e.target.value
                                )
                              }
                            />
                            <MDInput
                              label="Request Object Path"
                              value={x3.to}
                              onChange={(e) =>
                                onComponentChange(
                                  `customOnChange.${i1}.setRequestObj.${i3}.to`,
                                  e.target.value
                                )
                              }
                            />
                            {/* <IconButton onClick={() => onDeleteSetRequestObjPaths(i1, i3)}>
                            <DeleteIcon />
                          </IconButton> */}
                          </Stack>
                        ))}
                      </Grid>
                    )}

                    {x1.bindingType === "Individual" && (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Stack direction="row" spacing={2}>
                          <MDTypography variant="h6">Paths to Bind</MDTypography>{" "}
                          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                            <MDButton variant="outlined" onClick={() => onAddApiPaths(i1)}>
                              Add Paths
                            </MDButton>
                          </MDBox>
                        </Stack>
                        {x1?.pathsToBind?.map((x2, i2) => (
                          <Stack direction="row" spacing={1} p={1}>
                            <MDInput
                              label="from"
                              value={x2.from}
                              onChange={(e) =>
                                onComponentChange(
                                  `customOnChange.${i1}.pathsToBind.${i2}.form`,
                                  e.target.value
                                )
                              }
                            />
                            <MDInput
                              label="to"
                              value={x2.to}
                              onChange={(e) =>
                                onComponentChange(
                                  `customOnChange.${i1}.pathsToBind.${i2}.to`,
                                  e.target.value
                                )
                              }
                            />
                            {/* <IconButton onClick={() => onDeleteApiPaths(i, i1)}>
                            <DeleteIcon />
                          </IconButton> */}
                          </Stack>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              ))}
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Path"
                value={addProperties.path}
                onChange={(e) => onDataType("path", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                options={dataTypes}
                sx={autoStyle}
                value={addProperties.dataType}
                onChange={(e, a) => onDataType("dataType", a)}
                renderInput={(params) => <MDInput {...params} label="Data Type" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Value"
                value={addProperties.data}
                onChange={(e) => onDataType("data", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <MDButton onClick={onAddProperties}>Add</MDButton>
            </Grid> */}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <ReactJson
            src={componentProp}
            displayDataTypes={0}
            displayArrayKey={0}
            displayObjectSize={0}
            // enableClipboard={0}
            onAdd={(e) => setComponentProp({ ...e.updated_src })}
            onDelete={(e) => setComponentProp({ ...e.updated_src })}
            onEdit={(e) => setComponentProp({ ...e.updated_src })}
            style={{ fontSize: 15 }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}
