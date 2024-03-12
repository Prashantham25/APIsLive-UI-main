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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import objectPath from "object-path";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ReactJson from "react-json-view";

import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import {
  defaultValueFrom,
  autoStyle,
  httpMethods,
  whereToBind,
  bindingType,
  dataTypes,
  booleanDataType,
} from "./data";

export default function OnPageLoad({
  functionalityData,
  setFunctionalityData,
  variables,
  setVariables,
  prodDto,
}) {
  const FData = functionalityData;
  const onChange = (n, v) => {
    objectPath.set(FData, n, v);
    setFunctionalityData({ ...FData });
  };

  const onDefaultValue = (v, n, i) => {
    if (n === "value") {
      const v1 = parseInt(v, 10);
      if (v1 && v.length === v1.toString().length)
        FData.onPageLoad.setDefaultValues[i][n] = parseInt(v, 10);
      else FData.onPageLoad.setDefaultValues[i][n] = v;
    } else {
      FData.onPageLoad.setDefaultValues[i][n] = v;
    }
    setFunctionalityData({ ...FData });
  };
  const onDeleteDefaultValue = (i1) => {
    const arr = FData.onPageLoad.setDefaultValues.filter((x, i) => i !== i1);
    FData.onPageLoad.setDefaultValues = [...arr];
    setFunctionalityData({ ...FData });
  };
  const onAddDefaultValue = () => {
    const arr = FData?.onPageLoad?.setDefaultValues ? [...FData.onPageLoad.setDefaultValues] : [];
    objectPath.set(FData, `onPageLoad.setDefaultValues`, [
      ...arr,
      { valueFrom: "", fromPath: "", toPath: "", value: "" },
    ]);
    setFunctionalityData({ ...FData });
  };

  const onAddApi = () => {
    const arr = FData?.onPageLoad?.masters ? [...FData.onPageLoad.masters] : [];
    objectPath.set(FData, `onPageLoad.masters`, [
      ...arr,
      {
        method: "",
        url: "",
        whereToBind: "",
        pathsToBind: [
          {
            from: "",
            to: "",
          },
        ],
      },
    ]);

    setFunctionalityData({ ...FData });
  };

  const onDeleteApi = (ind) => {
    const arr = FData.onPageLoad.masters.filter((x, i) => i !== ind);
    FData.onPageLoad.masters = [...arr];
    setFunctionalityData({ ...FData });
  };

  const onAddApiPaths = (ind) => {
    FData.onPageLoad.masters[ind].pathsToBind.push({ from: "", to: "" });
    setFunctionalityData({ ...FData });
  };
  const onDeleteApiPaths = (ind1, ind2) => {
    const arr = FData.onPageLoad.masters[ind1].pathsToBind.filter((x1, i1) => i1 !== ind2);
    FData.onPageLoad.masters[ind1].pathsToBind = [...arr];
    setFunctionalityData({ ...FData });
  };

  const onChangeApi = (name, value, ind) => {
    if (name === "requestObj") {
      objectPath.set(FData, `onPageLoad.masters.${ind}.${name}`, JSON.parse(value));
    } else objectPath.set(FData, `onPageLoad.masters.${ind}.${name}`, value);
    setFunctionalityData({ ...FData });
  };
  const onChangeApiPaths = (name, value, ind1, ind2) => {
    FData.onPageLoad.masters[ind1].pathsToBind[ind2][name] = value;
    setFunctionalityData({ ...FData });
  };
  const onVariables = (e) => {
    setVariables(JSON.parse(e.target.value));
  };
  return (
    <MDBox>
      <Grid container spacing={1.5} p={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDInput
            label="Product Label"
            value={FData?.onPageLoad?.productLabel}
            onChange={(e) => onChange("onPageLoad.productLabel", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6">Enter Variables Object</MDTypography>
          <TextareaAutosize
            minRows={5}
            style={{
              display: "flex",
              width: "100%",
              border: "0.1px solid #ada5a5 ",
              height: "auto",
              overflow: "auto",
              resize: "none",
              padding: "8px",
            }}
            label="Enter Variables Object"
            value={JSON.stringify(variables)}
            onChange={onVariables}
            placeholder="Enter Variables Object"
          />
        </Grid>
      </Grid>

      <Accordion elevation={10}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Set Default Values
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} p={0.5}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {" "}
              <MDBox sx={{ display: "flex", justifyContent: "right", paddingBottom: 3 }}>
                <MDButton variant="outlined" onClick={onAddDefaultValue}>
                  Add
                </MDButton>
              </MDBox>
              {FData?.onPageLoad?.setDefaultValues?.map((x, i) => (
                <Grid container spacing={1} p={0.5}>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      options={defaultValueFrom}
                      sx={autoStyle}
                      getOptionLabel={(option) => option}
                      value={x.valueFrom}
                      onChange={(e, a) => onDefaultValue(a, "valueFrom", i)}
                      renderInput={(params) => <MDInput {...params} label="Value From" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      label="Policy Json Path"
                      value={x.toPath}
                      onChange={(e) => onDefaultValue(e.target.value, "toPath", i)}
                    />
                  </Grid>
                  {x.valueFrom !== "value" && (
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                      {/* eslint-disable */}
                      <MDInput
                        label={
                          x.valueFrom === "environment"
                            ? "Environment Variable Name"
                            : x.valueFrom === "local storage"
                            ? "Local Storage Key Name"
                            : x.valueFrom === "context"
                            ? "Context Path"
                            : x.valueFrom === "today date"
                            ? "date format"
                            : ""
                        }
                        value={x.fromPath}
                        onChange={(e) => onDefaultValue(e.target.value, "fromPath", i)}
                      />
                      {/* eslint-enable */}
                    </Grid>
                  )}
                  {x.valueFrom === "value" && (
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                      <Autocomplete
                        options={dataTypes}
                        sx={autoStyle}
                        value={x.valueType}
                        onChange={(e, a) => onDefaultValue(a, "valueType", i)}
                        renderInput={(params) => <MDInput {...params} label="Value DataType" />}
                      />
                    </Grid>
                  )}
                  {x.valueFrom === "value" && x.valueType !== "Boolean" && (
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Value"
                        value={x.value}
                        onChange={(e) => onDefaultValue(e.target.value, "value", i)}
                      />
                    </Grid>
                  )}
                  {x.valueFrom === "value" && x.valueType === "Boolean" && (
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <Autocomplete
                        options={booleanDataType}
                        sx={autoStyle}
                        value={x.value}
                        onChange={(e, a) => onDefaultValue(a, "value", i)}
                        renderInput={(params) => (
                          <MDInput {...params} label="Select boolean Value" />
                        )}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                    <IconButton onClick={() => onDeleteDefaultValue(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            {false && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <ReactJson
                  src={prodDto}
                  displayDataTypes={0}
                  displayArrayKey={0}
                  displayObjectSize={0}
                  enableClipboard={0}
                  // onAdd={onAddNodeToProperties}
                  // onDelete={onDeleteNodeFromProperties}
                  // onEdit={onEditNodeProperties}
                  style={{ fontSize: 15 }}
                />
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={10}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Get Masters
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <MDBox sx={{ display: "flex", justifyContent: "right", p: 2 }}>
            <MDButton variant="outlined" onClick={onAddApi}>
              <IconButton>
                <Icon>add</Icon>
              </IconButton>{" "}
              Add API
            </MDButton>
          </MDBox>
          {FData?.onPageLoad?.masters?.map((x, i) => (
            <Grid container spacing={1} p={0.5} m={0.5} sx={{ border: "solid" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing={2}>
                  <MDTypography variant="h5">{`Masters ${i + 1}`}</MDTypography>
                  <IconButton onClick={() => onDeleteApi(i)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                <Autocomplete
                  options={httpMethods}
                  sx={autoStyle}
                  getOptionLabel={(option) => option}
                  onChange={(e, a) => onChangeApi("method", a, i)}
                  value={x.method}
                  renderInput={(params) => <MDInput {...params} label="Method" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MDInput
                  label="URL"
                  value={x.url}
                  onChange={(e) => onChangeApi("url", e.target.value, i)}
                />
              </Grid>
              {x.method === "post" && (
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                  <MDInput
                    label="Request Object"
                    value={JSON.stringify(x.requestObj)}
                    multiline
                    row={3}
                    onChange={(e) => onChangeApi("requestObj", e.target.value, i)}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  options={bindingType}
                  sx={autoStyle}
                  getOptionLabel={(option) => option}
                  onChange={(e, a) => onChangeApi("bindingType", a, i)}
                  value={x.bindingType}
                  renderInput={(params) => <MDInput {...params} label="Binding Type" />}
                />
              </Grid>
              {x.bindingType === "Individual" && (
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                  <Autocomplete
                    options={whereToBind}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    onChange={(e, a) => onChangeApi("whereToBind", a, i)}
                    value={x.whereToBind}
                    renderInput={(params) => (
                      <MDInput {...params} label="Response, Where To Bind" />
                    )}
                  />
                </Grid>
              )}
              {x.bindingType === "Individual" && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack direction="row" spacing={2}>
                    <MDTypography variant="h6">Paths to Bind</MDTypography>{" "}
                    <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                      <MDButton variant="outlined" onClick={() => onAddApiPaths(i)}>
                        Add Paths
                      </MDButton>
                    </MDBox>
                  </Stack>
                  {x?.pathsToBind?.map((x1, i1) => (
                    <Stack direction="row" spacing={1} p={1}>
                      <MDInput
                        label="from"
                        value={x1.from}
                        onChange={(e) => onChangeApiPaths("from", e.target.value, i, i1)}
                      />
                      <MDInput
                        label="to"
                        value={x1.to}
                        onChange={(e) => onChangeApiPaths("to", e.target.value, i, i1)}
                      />
                      <IconButton onClick={() => onDeleteApiPaths(i, i1)}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                </Grid>
              )}
            </Grid>
          ))}
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
