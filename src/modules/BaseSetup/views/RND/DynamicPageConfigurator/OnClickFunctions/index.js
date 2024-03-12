// import { useState } from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  Stack,
  IconButton,
  Icon,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
import objectPath from "object-path";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import ReactJson from "react-json-view";

// import MDInput from "../../../../../components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { autoStyle, httpMethods, whereToBind, requestObj, functionType } from "../data";
// import "./style.css";

// functionalityData, setFunctionalityData, buttonArr
export default function OnClickFunctions({ functionalityData, setFunctionalityData }) {
  const FData = functionalityData;
  const onAddNewFunction = () => {
    const obj1 = FData?.customOnClick ? { ...FData.customOnClick } : {};
    objectPath.set(FData, "customOnClick", {
      ...obj1,
      [`Function ${Object.keys(obj1).length + 1}`]: [{}],
    });
    console.log("Fdata", FData);
    setFunctionalityData({ ...FData });
  };

  const onChangeFunctionName = (e, ind) => {
    let obj1 = {};
    Object.keys(FData?.customOnClick ? FData.customOnClick : {}).forEach((x1, i1) => {
      if (i1 === ind) {
        obj1 = { ...obj1, [e.target.value]: FData.customOnClick[x1] };
      } else {
        obj1 = { ...obj1, [x1]: FData.customOnClick[x1] };
      }
    });
    FData.customOnClick = { ...obj1 };
    setFunctionalityData({ ...FData });
  };

  const onDeleteFunction = (fName) => {
    objectPath.del(FData, `customOnClick.${fName}`);
    setFunctionalityData({ ...FData });
  };

  const onAddPaths = (name1, index, name2, obj1) => {
    const obj = FData?.customOnClick?.[name1]?.[index]?.[name2]
      ? FData.customOnClick[name1][index][name2]
      : [];
    objectPath.set(FData, `customOnClick.${name1}.${index}.${name2}`, [...obj, { ...obj1 }]);
    setFunctionalityData({ ...FData });
  };

  const onDeletePaths = (name1, ind1, ind2, name2) => {
    const arr = FData.customOnClick[name1][ind1][name2].filter((x1, i1) => i1 !== ind2);
    FData.customOnClick[name1][ind1][name2] = [...arr];
    setFunctionalityData({ ...FData });
  };

  const onChangeApi = (value, name1, ind, name2) => {
    if (name2 === "requestObj") {
      objectPath.set(FData, `customOnClick.${name1}.${ind}.${name2}`, JSON.parse(value));
    } else objectPath.set(FData, `customOnClick.${name1}.${ind}.${name2}`, value);
    setFunctionalityData({ ...FData });
  };
  const onChangeApiPaths = (value, x1, i2, name1, i3, name2) => {
    FData.customOnClick[x1][i2][name1][i3][name2] = value;
    setFunctionalityData({ ...FData });
  };

  return (
    <MDBox p={1}>
      <Grid container spacing={1} p={1} m={0.5}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDButton variant="outlined" onClick={onAddNewFunction}>
            Add New onClick Function
          </MDButton>
        </Grid>
      </Grid>
      {Object.keys(FData?.customOnClick ? FData.customOnClick : {})?.map((x1, i1) => (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" color="primary">
              {`Function ${i1 + 1} - ${x1}`}
            </MDTypography>
            <MDTypography variant="h6" color="error">
              {!Array.isArray(FData?.customOnClick[x1]) && ` -  Local Static Function`}
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            {Array.isArray(FData?.customOnClick[x1]) && (
              <Grid container spacing={1} p={1} m={0.5}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Function Name"
                    value={x1}
                    onChange={(e) => onChangeFunctionName(e, i1)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Function name should be uniq">
                            <IconButton>
                              <Icon>info</Icon>
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    disabled={!Array.isArray(FData?.customOnClick[x1])}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <Autocomplete
                    options={functionType}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    onChange={(e, a) => onChangeApi(a, x1, 0, "functionType")}
                    value={FData.customOnClick?.[x1]?.[0]?.functionType}
                    renderInput={(params) => <MDInput {...params} label="Function Type" />}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                  <Stack direction="row" spacing={2}>
                    <MDButton variant="outlined" onClick={() => onDeleteFunction(x1)}>
                      Delete Function
                    </MDButton>
                  </Stack>
                </Grid>
              </Grid>
            )}

            {Array.isArray(FData?.customOnClick?.[x1]) &&
              FData.customOnClick[x1].map((x2, i2) => (
                <MDBox>
                  {x2.functionType === "ApiCall" && (
                    <Grid container spacing={1} p={1} m={0.5} sx={{ border: "solid" }}>
                      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                        <Grid container spacing={1} p={1} m={0.5}>
                          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                            <Autocomplete
                              options={httpMethods}
                              sx={autoStyle}
                              getOptionLabel={(option) => option}
                              onChange={(e, a) => onChangeApi(a, x1, i2, "method")}
                              value={x2.method}
                              renderInput={(params) => <MDInput {...params} label="Method" />}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                            <MDInput
                              label="URL"
                              value={x2.url}
                              onChange={(e) => onChangeApi(e.target.value, x1, i2, "url")}
                            />
                          </Grid>

                          {x2.method === "post" && (
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                              <Autocomplete
                                options={requestObj}
                                sx={autoStyle}
                                getOptionLabel={(option) => option}
                                onChange={(e, a) => onChangeApi(a, x1, i2, "requestObjType")}
                                value={x2.requestObjType}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Request Object Type" />
                                )}
                              />
                            </Grid>
                          )}

                          {x2.method === "post" && x2.requestObjType === "custom" && (
                            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                              <MDInput
                                label="Request Object"
                                value={JSON.stringify(x2.requestObj)}
                                multiline
                                row={3}
                                onChange={(e) => onChangeApi(e.target.value, x1, i2, "requestObj")}
                              />
                            </Grid>
                          )}

                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Stack direction="row" spacing={2}>
                              <MDTypography variant="h6">set Query String parameters</MDTypography>
                              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                                <MDButton
                                  variant="outlined"
                                  onClick={() =>
                                    onAddPaths(x1, i2, "parameters", { from: "", path: "" })
                                  }
                                >
                                  Add parameters
                                </MDButton>
                              </MDBox>
                            </Stack>
                            {x2?.parameters?.map((x3, i3) => (
                              <Stack direction="row" spacing={1} p={1}>
                                <MDTypography variant="h6">{`P${i3 + 1}`}</MDTypography>

                                <Autocomplete
                                  fullWidth
                                  options={whereToBind}
                                  sx={autoStyle}
                                  getOptionLabel={(option) => option}
                                  onChange={(e, a) =>
                                    onChangeApiPaths(a, x1, i2, "parameters", i3, "from")
                                  }
                                  value={x3.from}
                                  renderInput={(params) => (
                                    <MDInput {...params} label="Value From" />
                                  )}
                                />

                                <MDInput
                                  label="Path"
                                  value={x3.path}
                                  onChange={(e) =>
                                    onChangeApiPaths(
                                      e.target.value,
                                      x1,
                                      i2,
                                      "parameters",
                                      i3,
                                      "path"
                                    )
                                  }
                                />
                                <IconButton onClick={() => onDeletePaths(x1, i2, i3, "parameters")}>
                                  <Icon>delete</Icon>
                                </IconButton>
                              </Stack>
                            ))}
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Stack direction="row" spacing={2}>
                              <MDTypography variant="h6">set Request Obj</MDTypography>{" "}
                              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                                <MDButton
                                  variant="outlined"
                                  onClick={() =>
                                    onAddPaths(x1, i2, "setRequestObj", { from: "", to: "" })
                                  }
                                >
                                  Add Paths
                                </MDButton>
                              </MDBox>
                            </Stack>
                            {x2?.setRequestObj?.map((x3, i3) => (
                              <Stack direction="row" spacing={1} p={1}>
                                <MDTypography variant="h6">{i3 + 1}</MDTypography>

                                <MDInput
                                  label="Json Path"
                                  value={x3.from}
                                  onChange={(e) =>
                                    onChangeApiPaths(
                                      e.target.value,
                                      x1,
                                      i2,
                                      "setRequestObj",
                                      i3,
                                      "from"
                                    )
                                  }
                                />
                                <MDInput
                                  label="Request Object Path"
                                  value={x3.to}
                                  onChange={(e) =>
                                    onChangeApiPaths(
                                      e.target.value,
                                      x1,
                                      i2,
                                      "setRequestObj",
                                      i3,
                                      "to"
                                    )
                                  }
                                />
                                <IconButton
                                  onClick={() => onDeletePaths(x1, i2, i3, "setRequestObj")}
                                >
                                  <Icon>delete</Icon>{" "}
                                </IconButton>
                              </Stack>
                            ))}
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Stack direction="row" spacing={2}>
                              <MDTypography variant="h6">Paths to Bind</MDTypography>
                              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                                <MDButton
                                  variant="outlined"
                                  onClick={() =>
                                    onAddPaths(x1, i2, "pathsToBind", {
                                      from: "",
                                      to: "",
                                      whereToBind: "",
                                    })
                                  }
                                >
                                  Add Paths
                                </MDButton>
                              </MDBox>
                            </Stack>

                            {x2?.pathsToBind?.map((x3, i3) => (
                              <Stack direction="row" spacing={1} p={1}>
                                <MDTypography variant="h6">{i3 + 1}</MDTypography>
                                <Autocomplete
                                  fullWidth
                                  options={whereToBind}
                                  sx={autoStyle}
                                  getOptionLabel={(option) => option}
                                  onChange={(e, a) =>
                                    onChangeApiPaths(a, x1, i2, "pathsToBind", i3, "whereToBind")
                                  }
                                  value={x3.whereToBind}
                                  renderInput={(params) => (
                                    <MDInput {...params} label="Response, Where To Bind" />
                                  )}
                                />
                                <MDInput
                                  label="Response path"
                                  value={x3.from}
                                  onChange={(e) =>
                                    onChangeApiPaths(
                                      e.target.value,
                                      x1,
                                      i2,
                                      "pathsToBind",
                                      i3,
                                      "from"
                                    )
                                  }
                                />
                                <MDInput
                                  label={x3.whereToBind === "variable" ? "To Path" : "Json Path"}
                                  value={x3.to}
                                  onChange={(e) =>
                                    onChangeApiPaths(
                                      e.target.value,
                                      x1,
                                      i2,
                                      "pathsToBind",
                                      i3,
                                      "to"
                                    )
                                  }
                                />
                                <IconButton
                                  onClick={() => onDeletePaths(x1, i2, i3, "pathsToBind")}
                                >
                                  <Icon>delete</Icon>
                                </IconButton>
                              </Stack>
                            ))}
                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Stack direction="row" spacing={2}>
                              <MDTypography variant="h6">Reset Values</MDTypography>
                              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                                <MDButton
                                  variant="outlined"
                                  onClick={() =>
                                    onAddPaths(x1, i2, "resetValues", {
                                      path: "",
                                      value: "",
                                      whereToRest: "",
                                    })
                                  }
                                >
                                  Add Paths
                                </MDButton>
                              </MDBox>
                            </Stack>

                            {x2?.resetValues?.map((x3, i3) => (
                              <Stack direction="row" spacing={1} p={1}>
                                <MDTypography variant="h6">{i3 + 1}</MDTypography>
                                <Autocomplete
                                  fullWidth
                                  options={whereToBind}
                                  sx={autoStyle}
                                  getOptionLabel={(option) => option}
                                  onChange={(e, a) =>
                                    onChangeApiPaths(a, x1, i2, "resetValues", i3, "whereToRest")
                                  }
                                  value={x3.whereToRest}
                                  renderInput={(params) => (
                                    <MDInput {...params} label="Response, Where To Rest" />
                                  )}
                                />
                                <MDInput
                                  label="Path"
                                  value={x3.path}
                                  onChange={(e) =>
                                    onChangeApiPaths(
                                      e.target.value,
                                      x1,
                                      i2,
                                      "resetValues",
                                      i3,
                                      "path"
                                    )
                                  }
                                />
                                <MDInput
                                  label="value"
                                  value={x3.value}
                                  onChange={(e) =>
                                    onChangeApiPaths(
                                      e.target.value,
                                      x1,
                                      i2,
                                      "resetValues",
                                      i3,
                                      "value"
                                    )
                                  }
                                />
                                <IconButton
                                  onClick={() => onDeletePaths(x1, i2, i3, "resetValues")}
                                >
                                  <Icon>delete</Icon>
                                </IconButton>
                              </Stack>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDBox sx={{ display: "flex", height: "100%" }}>
                          <ReactJson
                            src={x2}
                            collapsed={0}
                            displayDataTypes={0}
                            displayArrayKey={0}
                            displayObjectSize={0}
                            enableClipboard={0}
                            style={{ fontSize: 15 }}
                          />
                        </MDBox>
                      </Grid>
                    </Grid>
                  )}

                  {x2.functionType === "SetValues" && (
                    <MDBox>
                      <MDButton
                        onClick={() =>
                          onAddPaths(x1, i2, "paths", { valueFrom: "", path: "", value: "" })
                        }
                      >
                        Add Paths
                      </MDButton>
                      {Array.isArray(x2.paths) &&
                        x2.paths.map((x3, i3) => (
                          <Grid container spacing={2} p={2}>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                              <Autocomplete
                                options={["Yes", "No"]}
                                sx={autoStyle}
                                getOptionLabel={(option) => option}
                                onChange={(e, a) =>
                                  onChangeApiPaths(a, x1, i2, "paths", i3, "isConditionBased")
                                }
                                value={x3.isConditionBased}
                                renderInput={(params) => (
                                  <MDInput {...params} label="Is Condition Based" />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                              <MDInput
                                label="condition"
                                value={x3.condition}
                                onChange={(e) =>
                                  onChangeApiPaths(e.target.value, x1, i2, "paths", i3, "condition")
                                }
                                helperText="condition is executing in eval function "
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                              <Autocomplete
                                options={["dto", "value"]}
                                sx={autoStyle}
                                getOptionLabel={(option) => option}
                                onChange={(e, a) =>
                                  onChangeApiPaths(a, x1, i2, "paths", i3, "valueFrom")
                                }
                                value={x3.valueFrom}
                                renderInput={(params) => <MDInput {...params} label="Value From" />}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                label="Value"
                                value={
                                  typeof x3.value === "string" ? x3.value : JSON.stringify(x3.value)
                                }
                                onChange={(e) =>
                                  onChangeApiPaths(
                                    e.target.value.indexOf("{") !== -1 &&
                                      e.target.value.indexOf("}") !== -1
                                      ? JSON.parse(e.target.value)
                                      : e.target.value,
                                    x1,
                                    i2,
                                    "paths",
                                    i3,
                                    "value"
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <MDInput
                                label="Json Path"
                                value={x3.path}
                                onChange={(e) =>
                                  onChangeApiPaths(e.target.value, x1, i2, "paths", i3, "path")
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                              <IconButton onClick={() => onDeletePaths(x1, i2, i3, "paths")}>
                                <Icon>delete</Icon>
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                    </MDBox>
                  )}
                </MDBox>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </MDBox>
  );
}
