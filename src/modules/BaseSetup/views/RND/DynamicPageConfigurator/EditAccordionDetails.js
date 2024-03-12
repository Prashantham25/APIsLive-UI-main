import { Grid, IconButton, Icon, Autocomplete, Stack, Paper } from "@mui/material";
import objectPath from "object-path";
import ReactJson from "react-json-view";
import MDInput from "components/MDInput";
import { modalStyle, autoStyle, operator } from "./data";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";

export default function EditAccordionDetails({
  setModelFlag,
  accordionProp,
  setAccordionProp,
  compEditFlg,
  accordionArr,
  setAccordionArr,
}) {
  const lAccordionArr = accordionArr;
  const lAccordionProp = accordionProp;

  const onUpdateAccordionProps = () => {
    lAccordionArr[compEditFlg.ind[0]][compEditFlg.ind[1]] = accordionProp;
    setAccordionArr([...lAccordionArr]);
    setModelFlag((p) => ({ ...p, editAccordionDetails: false }));
  };

  const onAddConditions = () => {
    const arr1 = Array.isArray(lAccordionProp?.visibleDetails?.conditions)
      ? [...lAccordionProp.visibleDetails.conditions]
      : [];
    const arr2 = Array.isArray(lAccordionProp?.visibleDetails?.logics)
      ? [...lAccordionProp.visibleDetails.logics]
      : [];
    const arr3 = Array.isArray(lAccordionProp?.visibleDetails?.logicsPrecedence)
      ? [...lAccordionProp.visibleDetails.logicsPrecedence]
      : [];

    if (arr1.length > 0) {
      objectPath.set(lAccordionProp, `visibleDetails.logics`, [...arr2, ""]);
      objectPath.set(lAccordionProp, `visibleDetails.logicsPrecedence`, [...arr3, arr3.length]);
    }
    objectPath.set(lAccordionProp, `visibleDetails.conditions`, [
      ...arr1,
      { path: "", operator: "", value: "" },
    ]);
    setAccordionProp({ ...lAccordionProp });
  };

  const onDeleteConditions = (ind) => {
    lAccordionProp.visibleDetails.conditions = lAccordionProp.visibleDetails.conditions.filter(
      (x, i) => i !== ind
    );
    lAccordionProp.visibleDetails.logics.pop();
    lAccordionProp.visibleDetails.logicsPrecedence.pop();
    setAccordionProp({ ...lAccordionProp });
  };

  const onComponentChange = (path, value) => {
    objectPath.set(lAccordionProp, path, value);
    setAccordionProp({ ...lAccordionProp });
  };

  return (
    <MDBox
      sx={{ ...modalStyle, left: "10%", top: "10%", width: "80%", bottom: "10%", height: "auto" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" justifyContent="space-between">
            <IconButton
              onClick={() => setModelFlag((p) => ({ ...p, editAccordionDetails: false }))}
            >
              <Icon color="error">close</Icon>
            </IconButton>
            <MDButton variant="outlined" onClick={onUpdateAccordionProps}>
              update
            </MDButton>
          </Stack>
        </Grid>{" "}
        <Grid item xs={12} md={12} lg={8} xl={8} xxl={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
              <MDInput
                label="label"
                value={accordionProp.name}
                onChange={(e) => setAccordionProp({ ...accordionProp, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                options={["true", "false", "visibleDetails"]}
                sx={autoStyle}
                value={accordionProp.visible}
                getOptionLabel={(option) => option}
                onChange={(e, a) => setAccordionProp({ ...accordionProp, visible: a })}
                renderInput={(params) => <MDInput {...params} label="Visibility" />}
              />
            </Grid>
            {accordionProp.visible === "visibleDetails" && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
                <Paper elevation={10}>
                  <MDBox p={3}>
                    <MDButton onClick={onAddConditions}>Add visible conditions</MDButton>
                    {accordionProp?.visibleDetails?.conditions?.map((x1, i1) => (
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
                                `visibleDetails.conditions.${i1}.path`,
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
                              onComponentChange(`visibleDetails.conditions.${i1}.operator`, a)
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
                                `visibleDetails.conditions.${i1}.value`,
                                e.target.value
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                          <IconButton onClick={() => onDeleteConditions(i1)}>
                            <Icon>delete</Icon>
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    {accordionProp?.visibleDetails?.conditions?.length > 1 && (
                      <Stack spacing={1} direction="row">
                        <MDTypography>Select Logical Operator : </MDTypography>
                        {accordionProp?.visibleDetails?.conditions?.map((x2, i2) => (
                          <Stack direction="row" spacing={1}>
                            <MDTypography>{`C${i2}`}</MDTypography>
                            {accordionProp.visibleDetails.conditions.length - 1 !== i2 &&
                              accordionProp.visibleDetails.conditions.length !== 0 && (
                                <Autocomplete
                                  fullWidth
                                  options={["&&", "||"]}
                                  sx={{ ...autoStyle, width: "120px" }}
                                  value={accordionProp?.visibleDetails?.logics?.[i2]}
                                  onChange={(e, a) =>
                                    onComponentChange(`visibleDetails.logics.${i2}`, a)
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
                    {accordionProp?.visibleDetails?.conditions?.length > 1 && (
                      <Stack spacing={1} direction="row" mt={1}>
                        <MDTypography>Logical Operator Precedence : </MDTypography>
                        {accordionProp?.visibleDetails?.logicsPrecedence?.map((x2, i2) => (
                          <MDInput
                            sx={{ width: "120px" }}
                            value={x2}
                            type="number"
                            label={`Precedence ${i2}`}
                            onChange={(e) =>
                              onComponentChange(
                                `visibleDetails.logicsPrecedence.${i2}`,
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
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <ReactJson
            src={accordionProp}
            displayDataTypes={0}
            displayArrayKey={0}
            displayObjectSize={0}
            // enableClipboard={0}
            onAdd={(e) => setAccordionProp({ ...e.updated_src })}
            onDelete={(e) => setAccordionProp({ ...e.updated_src })}
            onEdit={(e) => setAccordionProp({ ...e.updated_src })}
            style={{ fontSize: 15 }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}
