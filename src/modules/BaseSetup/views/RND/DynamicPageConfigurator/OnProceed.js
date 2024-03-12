import { useState } from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  Stack,
  IconButton,
  Icon,
  Paper,
  // FormLabel,
  // FormControlLabel,
  // RadioGroup,
  // Radio,
  Tabs,
  Tab,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import objectPath from "object-path";
import Swal from "sweetalert2";

// import TextareaAutosize from "@mui/material/TextareaAutosize";

// import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import {
  autoStyle,
  httpMethods,
  whereToBind,
  requestObj,
  variants,
  colors,
  swalIcons,
} from "./data";

// functionalityData, setFunctionalityData, buttonArr
export default function OnProceed({
  functionalityData,
  setFunctionalityData,
  buttonArr,
  setButtonArr,
}) {
  const FData = functionalityData;
  const buttonArr1 = buttonArr;
  const buttonDetails = [
    { label: "Reset", name: "reset" },
    { label: "Addition Btn 2", name: "button2" },
    { label: "Addition Btn 1", name: "button1" },
    { label: "Proceed", name: "next" },
  ];
  const [editButton, setEditButton] = useState({ activeStep: -1, buttonName: "" });
  const onNavBtnClick = (ind, name) => {
    editButton.activeStep = ind;
    editButton.buttonName = name;
    setEditButton({ ...editButton });
  };
  const onComponentChange = (name2, value, name1, ind) => {
    objectPath.set(buttonArr1, `${ind}.${name1}.${name2}`, value);
    setButtonArr([...buttonArr]);
  };

  const onAddTask = (x, i) => {
    objectPath.set(FData, `onProceedButton.${i}.${0}`, { method: "" });
    console.log("FData", FData);
    setFunctionalityData({ ...FData });
  };

  const onAddPathsToBind = (i) => {
    const arr = FData?.onProceedButton?.[i]?.[0]?.pathsToBind
      ? FData.onProceedButton[i][0].pathsToBind
      : [];
    objectPath.set(FData, `onProceedButton.${i}.${0}.pathsToBind`, [...arr, { from: "", to: "" }]);
    setFunctionalityData({ ...FData });
  };

  const onChangeApiPaths = (name, value, i, i1) => {
    objectPath.set(FData, `onProceedButton.${i}.${0}.pathsToBind.${i1}.${name}`, value);
    setFunctionalityData({ ...FData });
  };

  const onChangeApi = (name, value, index) => {
    objectPath.set(FData, `onProceedButton.${index}.${0}.${name}`, value);
    setFunctionalityData({ ...FData });
  };

  const onAddManualResetPaths = (i) => {
    const arr = buttonArr1?.[i]?.reset?.manualResetPaths
      ? buttonArr1[i].reset.manualResetPaths
      : [];
    buttonArr1[i].reset.manualResetPaths = [...arr, { path: "", value: "" }];
    setButtonArr([...buttonArr1]);
  };

  const [tabValue, setTabValue] = useState("success");
  const onTabChange = (e, v) => {
    setTabValue(v);
  };
  const onSwalPreview = (i) => {
    const data = FData?.onProceedButton?.[i]?.[0]?.[tabValue];
    Swal.fire({
      icon: data.icon,
      title: data.title,
      text: data.text,
      allowOutsideClick: false,
    });
  };
  console.log("functionalityData", functionalityData);

  return (
    <MDBox p={1}>
      {FData?.onProceedButton?.map((x, i) => (
        <Accordion elevation={10} expanded={editButton.activeStep === i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => onNavBtnClick(i, "prev")}
          >
            <MDTypography variant="h6" color="primary">
              {`Step ${i + 1}`}
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper elevation={10}>
              <Stack
                direction="row"
                sx={{ display: "flex", justifyContent: "space-between" }}
                spacing={2}
                p={2}
                m={2}
              >
                <MDButton
                  variant="outlined"
                  color={
                    editButton.buttonName === "prev" && editButton.activeStep === i
                      ? "success"
                      : "primary"
                  }
                  onClick={() => onNavBtnClick(i, "prev")}
                >
                  prev
                  <IconButton onClick={() => onNavBtnClick(i, "prev")}>
                    <Icon>edit</Icon>
                  </IconButton>
                </MDButton>
                <Stack direction="row" spacing={1}>
                  {buttonDetails.map((x1) => (
                    <MDButton
                      variant="outlined"
                      color={
                        editButton.buttonName === x1.name && editButton.activeStep === i
                          ? "success"
                          : "primary"
                      }
                      onClick={() => onNavBtnClick(i, x1.name)}
                    >
                      {x1.label}
                      <IconButton onClick={() => onNavBtnClick(i, x1.name)}>
                        <Icon>edit</Icon>
                      </IconButton>
                    </MDButton>
                  ))}
                </Stack>
              </Stack>
            </Paper>
            <Grid container spacing={1} p={0.5} m={0.5} mt={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing={2}>
                  <MDTypography>Visible</MDTypography>
                  <Switch
                    checked={buttonArr?.[i]?.[editButton.buttonName]?.visible}
                    onChange={(e) =>
                      onComponentChange("visible", e.target.checked, editButton.buttonName, i)
                    }
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <Stack direction="row" spacing={2}>
                  <MDTypography>label</MDTypography>
                  <MDInput
                    variant="standard"
                    label=""
                    value={buttonArr?.[i]?.[editButton.buttonName]?.label}
                    onChange={(e) =>
                      onComponentChange("label", e.target.value, editButton.buttonName, i)
                    }
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack spacing={3} direction="row">
                  <MDTypography>variant</MDTypography>
                  {variants.map((x1) => (
                    <MDButton
                      variant={x1}
                      onClick={() => onComponentChange("variant", x1, editButton.buttonName, i)}
                    >
                      {x1}
                    </MDButton>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack spacing={1} direction="row">
                  <MDTypography>color</MDTypography>
                  {colors.map((x1) => (
                    <MDButton
                      color={x1}
                      onClick={() => onComponentChange("color", x1, editButton.buttonName, i)}
                    >
                      {x1}
                    </MDButton>
                  ))}
                </Stack>
              </Grid>
            </Grid>
            {editButton.buttonName === "reset" && editButton.activeStep === i && (
              <Grid container spacing={1} p={0.5} m={0.5} mt={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography>Manual Reset Settings</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={5}>
                  <MDButton variant="outlined" onClick={() => onAddManualResetPaths(i)}>
                    Add Paths to reset
                  </MDButton>
                </Grid>
                {buttonArr?.[i]?.reset?.manualResetPaths?.map(() => (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Stack direction="row" spacing={2}>
                      <MDInput variant="standard" label="path" />
                      <MDInput variant="standard" label="value" />
                      <IconButton>
                        <Icon>delete</Icon>
                      </IconButton>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            )}

            {editButton.buttonName === "next" && editButton.activeStep === i && (
              <Grid container spacing={1} p={0.5} m={0.5} mt={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
                {buttonArr?.[i]?.next?.visible === true && (
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <MDButton variant="outlined" onClick={() => onAddTask(x, i)}>
                      Add Task
                    </MDButton>
                  </Grid>
                )}

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {x?.[0]?.method !== undefined && (
                    <Grid container spacing={1} p={0.5} m={0.5}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Stack direction="row" spacing={2}>
                          <MDTypography variant="h5">{`Task ${1}`}</MDTypography>
                          <IconButton>
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
                          value={x?.[0].method}
                          renderInput={(params) => (
                            <MDInput variant="standard" {...params} label="Method" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                        <MDInput
                          variant="standard"
                          label="URL"
                          value={x?.[0].url}
                          onChange={(e) => onChangeApi("url", e.target.value, i)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <Autocomplete
                          options={whereToBind}
                          sx={autoStyle}
                          getOptionLabel={(option) => option}
                          onChange={(e, a) => onChangeApi("whereToBind", a, i)}
                          value={x?.[0].whereToBind}
                          renderInput={(params) => (
                            <MDInput
                              variant="standard"
                              {...params}
                              label="Response, Where To Bind"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                        <Autocomplete
                          options={requestObj}
                          sx={autoStyle}
                          getOptionLabel={(option) => option}
                          onChange={(e, a) => onChangeApi("requestObjType", a, i)}
                          value={x?.[0].requestObjType}
                          renderInput={(params) => (
                            <MDInput variant="standard" {...params} label="Request Object Type" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Stack direction="row" spacing={2}>
                          <MDTypography variant="h6">Paths to Bind</MDTypography>
                          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                            <MDButton variant="outlined" onClick={() => onAddPathsToBind(i)}>
                              Add Paths
                            </MDButton>
                          </MDBox>
                        </Stack>
                        {x?.[0]?.pathsToBind?.map((x1, i1) => (
                          <Stack direction="row" spacing={1} p={1}>
                            <MDInput
                              variant="standard"
                              label="from"
                              value={x1.from}
                              onChange={(e) => onChangeApiPaths("from", e.target.value, i, i1)}
                            />
                            <MDInput
                              variant="standard"
                              label="to"
                              value={x1.to}
                              onChange={(e) => onChangeApiPaths("to", e.target.value, i, i1)}
                            />
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        ))}
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDButton variant="outlined">Configure SWAL Message</MDButton>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Tabs value={tabValue} onChange={onTabChange}>
                          <Tab label="Success" value="success" />
                          <Tab label="Failure" value="failure" />
                        </Tabs>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {tabValue === "success" && (
                          <MDInput
                            variant="standard"
                            label="Path"
                            value={x?.[0]?.success?.path}
                            onChange={(e) => onChangeApi(`success.path`, e.target.value, i)}
                          />
                        )}
                        {tabValue === "failure" && (
                          <MDInput
                            variant="standard"
                            label="Path"
                            value={x?.[0]?.failure?.path}
                            onChange={(e) => onChangeApi(`failure.path`, e.target.value, i)}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {tabValue === "success" && (
                          <MDInput
                            variant="standard"
                            label="Value"
                            value={x?.[0]?.success?.value}
                            onChange={(e) => onChangeApi(`success.value`, e.target.value, i)}
                          />
                        )}
                        {tabValue === "failure" && (
                          <MDInput
                            variant="standard"
                            label="Value"
                            value={x?.[0]?.failure?.value}
                            onChange={(e) => onChangeApi(`failure.value`, e.target.value, i)}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {tabValue === "success" && (
                          <Autocomplete
                            options={swalIcons}
                            sx={autoStyle}
                            getOptionLabel={(option) => option}
                            onChange={(e, a) => onChangeApi(`success.icon`, a, i)}
                            value={x?.[0]?.success?.icon}
                            renderInput={(params) => (
                              <MDInput variant="standard" {...params} label="Icon" />
                            )}
                          />
                        )}
                        {tabValue === "failure" && (
                          <Autocomplete
                            options={swalIcons}
                            sx={autoStyle}
                            getOptionLabel={(option) => option}
                            onChange={(e, a) => onChangeApi(`failure.icon`, a, i)}
                            value={x?.[0]?.failure?.icon}
                            renderInput={(params) => (
                              <MDInput variant="standard" {...params} label="Icon" />
                            )}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {tabValue === "success" && (
                          <MDInput
                            variant="standard"
                            label="Title"
                            value={x?.[0]?.success?.title}
                            onChange={(e) => onChangeApi(`success.title`, e.target.value, i)}
                          />
                        )}
                        {tabValue === "failure" && (
                          <MDInput
                            variant="standard"
                            label="Title"
                            value={x?.[0]?.failure?.title}
                            onChange={(e) => onChangeApi(`failure.title`, e.target.value, i)}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {tabValue === "success" && (
                          <MDInput
                            variant="standard"
                            label="Text"
                            value={x?.[0]?.success?.text}
                            onChange={(e) => onChangeApi(`success.text`, e.target.value, i)}
                          />
                        )}
                        {tabValue === "failure" && (
                          <MDInput
                            variant="standard"
                            label="Text"
                            value={x?.[0]?.failure?.text}
                            onChange={(e) => onChangeApi(`failure.text`, e.target.value, i)}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDButton onClick={() => onSwalPreview(i)}>Preview</MDButton>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </MDBox>
  );
}
