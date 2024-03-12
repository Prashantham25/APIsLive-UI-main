import { useState, useEffect } from "react";
import objectPath from "object-path";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Grid,
  Stack,
  // FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Modal,
  Card,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

// MD Components
import MDInput from "components/MDInput";
import MDDatePicker from "components/MDDatePicker";
import MDAutocomplete from "components/MDAutocomplete";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDDataGrid from "../../components/MDDataGrid";

import {
  isFunction,
  IsNumeric,
  IsNumaricSpecial,
  IsNumaricPercentage,
  IsAlpha,
  IsAlphaNum,
  IsAlphaSpace,
  IsAlphaNumSpace,
  IsGstNo,
  IsPan,
  IsPassport,
  IsMobileNumber,
  IsEmail,
} from "../Validations";

const valChangFunc = [
  { funName: "IsNumeric", fun: IsNumeric },
  { funName: "IsNumaricSpecial", fun: IsNumaricSpecial },
  { funName: "IsNumaricPercentage", fun: IsNumaricPercentage },
  { funName: "IsAlpha", fun: IsAlpha },
  { funName: "IsAlphaNum", fun: IsAlphaNum },
  { funName: "IsAlphaSpace", fun: IsAlphaSpace },
  { funName: "IsAlphaNumSpace", fun: IsAlphaNumSpace },
];

const valBlurFunc = [
  { funName: "IsGstNo", fun: IsGstNo },
  { funName: "IsPan", fun: IsPan },
  { funName: "IsPassport", fun: IsPassport },
  { funName: "IsMobileNumber", fun: IsMobileNumber },
  { funName: "IsEmail", fun: IsEmail },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};

function RenderControlV1({
  item,
  setPolicyDto,
  nextFlag,
  nextCount,
  genericPolicyDto,
  resetCount,
  genericInfo,
  // setOnBlurFlag,
}) {
  const EndorsementFlag =
    genericInfo && genericInfo.Endorsement && genericInfo.Endorsement === true;
  const spacing = 3;
  const LPolicyDto = genericPolicyDto;

  const val = objectPath.get(LPolicyDto, item.value);
  const value = val !== undefined ? val : "";
  const value1 = val !== undefined ? val : "";
  //  setPolicyDto, PolicyDto, onSaveFlag

  // if (item.numberFormat) {
  //   const formatter = new Intl.NumberFormat(item.numberFormat.code, {
  //     style: item.numberFormat.style,
  //     currency: item.numberFormat.currency,
  //   });
  //   value = formatter;
  //   value1 = formatter;
  // }

  const EndorsementFun = () => {
    // if (genericInfo && genericInfo.EndorsementControlList && item.value) {
    //   const arr1 = [];
    //   genericInfo.EndorsementControlList.forEach((x) => {
    //     arr1.push(x.parameterPath.split("."));
    //   });

    //   arr1.forEach((x1) => {
    //     x1.forEach((x, i) => {
    //       const parsedInt = parseInt(x, 10);
    //       if (!Number.isNaN(parsedInt)) {
    //         x1.splice(i, 1);
    //       }
    //     });
    //   });

    //   const EndorsementControlListArray = arr1.map((x) => x.join("."));

    //   const itemValue = item.value
    //     .split(".")
    //     .filter((x) => {
    //       const parsedInt = parseInt(x, 10);
    //       return Number.isNaN(parsedInt);
    //     })
    //     .join(".");
    //   const found = EndorsementControlListArray.some((x1) => x1 === itemValue);

    //   return found;
    // }

    // return false;
    let flag1 = false;
    if (
      EndorsementFlag &&
      genericInfo.Endorsement &&
      item.value &&
      Array.isArray(genericInfo.EndorsementControlList)
    ) {
      const str2 = item.value.replace(/[0-9]/g, "").replace("..", ".");
      // let flag2 = true;
      let flag2 = !item.enableAtEndorsement === true;
      // flagVar = !genericInfo.EndorsementControlList.some((x) => x.path === item.value);
      genericInfo.EndorsementControlList.forEach((x) => {
        if (x.isArray === true) {
          const str1 = x.parameterPath.replace(/[0-9]/g, "").replace("..", ".");
          if (str1 === str2) flag2 = false;
        } else if (x.parameterPath === item.value) flag2 = false;
      });
      flag1 = flag2;
    }
    return item.disabled || flag1;
  };
  const datePlaceHolder = (format) => {
    const finalFormat = [];
    const deliMeter = format[1];
    const spiltFormat = format.split(deliMeter);
    spiltFormat.forEach((x) => {
      if (x === "d") finalFormat.push("DD");
      if (x === "m") finalFormat.push("MM");
      if (x === "Y") finalFormat.push("YYYY");
    });
    return finalFormat.join(deliMeter);
  };
  const [errorText, setErrorText] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  useEffect(() => {
    setErrorText(item?.errtext);
    // if (isBoolean(item.error)) setErrorFlag(item.error);
    setErrorFlag(item?.error);
  }, [genericInfo?.errCount, item?.errCount, item?.errtext, item?.error]);

  useEffect(() => {
    setErrorText("");
    setErrorFlag(false);
  }, [resetCount]);

  useEffect(() => {
    if (nextFlag)
      if (
        item.visible === true &&
        item.required === true &&
        !item.disableValidationOnProceed &&
        !item.disableValidationOnProceed === true
      )
        if (typeof value !== "string") {
          if (
            value === "" ||
            value === undefined ||
            (item.multiple && item.multiple === true && value.length === 0)
          ) {
            setErrorText("This field required");

            setErrorFlag(true);
          }
        } else if (typeof value === "string") {
          if (value.trim() === "") {
            setErrorText("This field required");

            setErrorFlag(true);
          }
        }
  }, [nextFlag, nextCount]);

  useEffect(() => {
    if (errorFlag === true && errorText === "This field required") {
      if (item.multiple && item.multiple === true && value.length !== 0) {
        setErrorText("");
        setErrorFlag(false);
      } else if (value !== "") {
        setErrorText("");
        setErrorFlag(false);
      }
    }
  }, [value]);

  const onChangeEvent = async (e, a) => {
    console.log("onChangeEvent");
    if (isFunction(item.customOnChange)) {
      item.customOnChange(e, a, setErrorFlag, setErrorText);
    } else {
      switch (item.type) {
        case "Input":
          if (Array.isArray(item.onChangeFuncs)) {
            // if (item.onChangeFuncs.length !== 0)
            const par = Array.isArray(item.parameters) ? item.parameters : [""];
            item.onChangeFuncs.every((fun) => {
              const funName = valChangFunc.filter((x) => x.funName === fun || x.fun === fun);
              if (funName.length > 0) {
                if (funName[0].fun(e.target.value, ...par) === true) {
                  objectPath.set(LPolicyDto, item.value, e.target.value);
                  setErrorFlag(false);
                  setErrorText("");
                } else {
                  setErrorFlag(true);
                  setErrorText(funName[0].fun(e.target.value));
                  // setPolicyDto({ ...PolicyDto, [item.name]: "" });
                  return false;
                }
              } else if (fun(e.target.value, ...par) === true) {
                objectPath.set(LPolicyDto, item.value, e.target.value);
                setErrorFlag(false);
                setErrorText("");
              } else {
                setErrorFlag(true);
                setErrorText(fun(e.target.value));
                // setPolicyDto({ ...PolicyDto, [item.name]: "" });
                return false;
              }
              return true;
            });
          } else {
            objectPath.set(LPolicyDto, item.value, e.target.value);
            setErrorFlag(false);
            setErrorText("");
          }
          break;
        case "AutoComplete":
          if (a === null) {
            if (item.multiple && item.multiple === true) objectPath.set(LPolicyDto, item.value, []);
            else
              objectPath.set(LPolicyDto, item.value, item.optionLabel ? a[item.optionLabel] : "");
          } else if (item.multiple && item.multiple === true)
            objectPath.set(LPolicyDto, item.value, a);
          else
            objectPath.set(
              LPolicyDto,
              item.value,
              item.optionLabel ? a[item.optionLabel] : a.mValue
            );

          setErrorFlag(false);
          setErrorText("");
          break;

        case "MDDatePicker":
          objectPath.set(LPolicyDto, item.value, a);
          setErrorText("");
          setErrorFlag(false);
          break;
        case "MDTimePicker":
          objectPath.set(LPolicyDto, item.value, a);
          setErrorText("");
          setErrorFlag(false);
          break;
        case "MDDateTimePicker":
          objectPath.set(LPolicyDto, item.value, a);
          setErrorText("");
          setErrorFlag(false);
          break;

        case "RadioGroup":
          objectPath.set(LPolicyDto, item.value, e.target.value);
          setErrorFlag(false);
          setErrorText("");
          break;
        case "Checkbox":
          if (e.target.checked) objectPath.set(LPolicyDto, item.value, item.checkedVal);
          else objectPath.set(LPolicyDto, item.value, item.unCheckedVal);
          setErrorFlag(false);
          setErrorText("");
          break;

        default:
          console.log("Invalid component");
      }
      setPolicyDto({ ...LPolicyDto });
    }
  };

  const onBlurEvent = (e, a) => {
    if (EndorsementFun() === false) {
      console.log("onBlurEvent");
      const enteredValue = e.target.value.trim();
      objectPath.set(LPolicyDto, item.value, enteredValue);
      setPolicyDto({ ...LPolicyDto });

      if (isFunction(item.customOnBlur)) {
        item.customOnBlur(e, a, setErrorFlag, setErrorText);
      } else {
        switch (item.type) {
          // case "Input1":
          //   if (Array.isArray(item.onBlurFuncs))
          //     item.onBlurFuncs.forEach((fun) => {
          //       if (fun(e.target.value) === true) {
          //         objectPath.set(LPolicyDto, item.value, e.target.value);
          //         setErrorFlag(false);
          //         setErrorText("");
          //       } else {
          //         objectPath.set(LPolicyDto, item.value, "");
          //         setErrorFlag(true);
          //         setErrorText(fun(e.target.value));
          //       }
          //     });

          //   break;
          case "Input":
            if (Array.isArray(item.onBlurFuncs)) {
              item.onBlurFuncs.forEach((fun) => {
                const funName = valBlurFunc.filter((x) => x.funName === fun);
                if (funName.length > 0) {
                  if (funName[0].fun(enteredValue) === true) {
                    objectPath.set(LPolicyDto, item.value, enteredValue);
                    setErrorFlag(false);
                    setErrorText("");
                  } else if (enteredValue !== "") {
                    objectPath.set(LPolicyDto, item.value, "");
                    setErrorFlag(true);
                    setErrorText(funName[0].fun(enteredValue));
                  }
                } else if (fun(enteredValue) === true) {
                  objectPath.set(LPolicyDto, item.value, enteredValue);
                  setErrorFlag(false);
                  setErrorText("");
                } else if (enteredValue !== "") {
                  // setOnBlurFlag()
                  objectPath.set(LPolicyDto, item.value, "");
                  setErrorFlag(true);
                  setErrorText(fun(enteredValue));
                } else {
                  setErrorFlag(false);
                  setErrorText("");
                }
              });
            } else {
              setErrorFlag(false);
              setErrorText("");
            }
            break;

          default:
            console.log("Invalid component");
        }
        setPolicyDto({ ...LPolicyDto });
      }
    }
  };

  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                // {...item.validations}
                label={item.label}
                name={item.name}
                value={value}
                onChange={(e, a) => onChangeEvent(e, a)}
                onBlur={(e, a) => onBlurEvent(e, a)}
                inputProps={{
                  readOnly: item.disabled || EndorsementFun() || item.readOnly,
                  ...item.InputProps,
                }}
                error={errorFlag}
                helperText={errorText}
                required={item.required}
                maxLength={item.maxLength}
                multiline={item.multiline}
                rows={item.rows}
                // disabled={(EndorsementFlag && item.Endorsement !== true) || item.disabled}
                disabled={EndorsementFun()}
                sx={redAsterisk}
              />
            );

          case "MDDatePicker": {
            return (
              <MDDatePicker
                fullWidth
                options={{
                  dateFormat: item.dateFormat ? item.dateFormat : "m-d-Y",
                  altFormat: item.altFormat ? item.altFormat : "d-m-Y",
                  altInput: true,
                  minDate: item.minDate,
                  maxDate: item.maxDate,
                  allowInput: EndorsementFun() !== true && item.allowInput === true,
                  clickOpens: !EndorsementFun(),
                  disableMobile: true,
                }}
                input={{
                  label: item.label,
                  value: value1,
                  error: errorFlag,
                  helperText: errorText,
                  required: item.required,
                  InputProps: { ...item.InputProps, disable: EndorsementFun() },
                  sx: redAsterisk,
                  placeholder: datePlaceHolder(item.altFormat ? item.altFormat : "d-m-Y"),
                  InputLabelProps: { shrink: item.allowInput },
                  readOnly: EndorsementFun(),
                }}
                value={value}
                readOnly={EndorsementFun()}
                disabled={EndorsementFun()}
                onChange={(e, a) => onChangeEvent(e, a)}
              />
            );
          }
          case "MDTimePicker": {
            return (
              <MDDatePicker
                fullWidth
                options={{
                  noCalendar: true,
                  enableTime: true,
                  dateFormat: "H:i:S",
                  altFormat: "H:i:S",
                  altInput: true,
                }}
                input={{
                  label: item.label,
                  value: value1,
                  error: errorFlag,
                  helperText: errorText,
                  InputProps: { ...item.InputProps, disable: EndorsementFun() },
                  sx: redAsterisk,
                  InputLabelProps: { shrink: item.allowInput },
                  readOnly: EndorsementFun(),
                }}
                value={value}
                readOnly={EndorsementFun()}
                disabled={EndorsementFun()}
                onChange={(e, a) => onChangeEvent(e, a)}
              />
            );
          }
          case "MDDateTimePicker": {
            return (
              <MDDatePicker
                fullWidth
                options={{
                  enableTime: true,
                  dateFormat: "Y-m-dTH:i:S",
                  altFormat: "Y-m-dTH:i:S",
                  altInput: true,
                }}
                input={{
                  label: item.label,
                  value: value1,
                  error: errorFlag,
                  helperText: errorText,
                }}
                value={value}
                // onChange={(e, a) => onChangeEvent(e, a)}
              />
            );
          }
          //                   item.optionLabel ? option[item.optionLabel] : option.mValue
          // item.optionLabel ? { [item.optionLabel]: value } :

          case "AutoComplete":
            return (
              <MDAutocomplete
                options={item.options ? item.options : []}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  ...redAsterisk,
                }}
                multiple={item.multiple}
                optionLabel={item.optionLabel}
                // value={item.optionLabel ? { [item.optionLabel]: value } : { mValue: value }}
                value={
                  item.multiple
                    ? value
                    : { [item.optionLabel ? item.optionLabel : "mValue"]: value }
                }
                onChange={(e, a) => onChangeEvent(e, a)}
                label={item.label}
                error={errorFlag}
                helperText={errorText}
                required={item.required}
                readOnly={item.readOnly}
                disableCloseOnSelect={item.disableCloseOnSelect}
                disableClearable={item.disableClearable}
                open={item.open}
                onOpen={item.onOpen}
                onClose={item.onClose}
                // disabled={(EndorsementFlag && item.Endorsement !== true) || item.disabled}
                disabled={EndorsementFun()}
              />
            );
          case "RadioGroup":
            return (
              <MDBox>
                {/* <FormControl
                  error={errorFlag}
                  helperText={errorText}
                  // sx={{
                  //   "& .MuiOutlinedInput-root": {
                  //     padding: "4px!important",
                  //   },
                  // }}
                > */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    display: "flex",
                    justifyContent: item.justifyContent ? item.justifyContent : "",
                  }}
                >
                  <MDBox>
                    {item.radioLabel.labelVisible && (
                      <FormLabel
                        variant="body1"
                        color="primary"
                        sx={{ fontSize: item.fontSize ? item.fontSize : "" }}
                      >
                        {item.radioLabel.label}
                      </FormLabel>
                    )}
                  </MDBox>
                  <MDBox>
                    <RadioGroup row value={value} onChange={(e, a) => onChangeEvent(e, a)}>
                      <Stack direction="row" spacing={0.2}>
                        {item.radioList.map((r) => (
                          <FormControlLabel
                            value={r.value}
                            label={r.label}
                            control={
                              <Radio
                                // disabled={
                                //   (EndorsementFlag && item.Endorsement !== true) || r.disabled
                                // }
                                disabled={EndorsementFun() || r.disabled}
                              />
                            }
                          />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </MDBox>
                </Stack>
                {/* </FormControl> */}
                {errorFlag && (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>{errorText}</MDTypography>
                )}
              </MDBox>
            );
          case "DataGrid":
            return (
              <MDDataGrid
                rows={item.value && Array.isArray(value) ? value : []}
                columns={item.columns}
                rowID={item.rowId}
                pageSize={item.rowPerPage ? item.rowPerPage : 5}
                onRowClick={item.onRowClick}
                onRowSelectionModelChange={item.onRowSelectionModelChange}
                rowSelectionModel={item.rowSelectionModel}
                getSelectedRows={item.getSelectedRows}
                onSelectionModelChange={item.onSelectionModelChange}
                onRowSelected={item.onRowSelected}
                autoHeight
                checkboxSelection={item.checkboxSelection}
                disableSelectionOnClick={item.disableSelectionOnClick}
                editField="inEdit"
                components={{ Toolbar: item.GridToolbar ? GridToolbar : false }}
                experimentalFeatures={{ newEditingApi: true }}
                rowHeight={item.rowHeight ? item.rowHeight : 50}
              />
            );
          case "DataGrid1":
            return (
              <DataGrid
                autoHeight
                rows={item.value ? value : []}
                columns={item.columns}
                getRowId={(option) => option[item.rowId]}
                onRowClick={item.onRowClick}
                onRowSelectionModelChange={item.onRowSelectionModelChange}
                getSelectedRows={item.getSelectedRows}
                onSelectionModelChange={item.onSelectionModelChange}
                onRowSelected={item.onRowSelected}
                pageSize={item.rowPerPage ? item.rowPerPage : 5}
                // rowsPerPageOptions={[item.rowPerPage ? item.rowPerPage : 5, 10, 20, 50, 100]}
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: item.GridToolbar ? GridToolbar : false }}
                editField="inEdit"
                checkboxSelection={item.checkboxSelection}
                disableSelectionOnClick={item.disableSelectionOnClick}
              />
            );
          case "Button":
            return (
              <MDButton
                variant={item.variant}
                startIcon={item.startIcon}
                endIcon={item.endIcon}
                onClick={item.onClick}
                component={item.component}
                color={item.color}
                sx={item.sx}
                // disabled={(EndorsementFlag && item.Endorsement !== true) || item.disabled}
                disabled={EndorsementFun()}
              >
                {item.label}
                {item.typeFormat}
              </MDButton>
            );
          case "Typography":
            return (
              <MDTypography
                variant={item.variant}
                color={item.color}
                align={item.align}
                sx={{ fontSize: item.fontSize }}
              >
                {item.label}
              </MDTypography>
            );
          case "TypographyVal":
            return (
              <MDTypography
                variant={item.variant}
                color={item.color}
                align={item.align}
                sx={item.sx}
              >
                {value}
              </MDTypography>
            );
          case "Checkbox":
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value === item.checkedVal}
                    onChange={(e, a) => onChangeEvent(e, a)}
                    // disabled={(EndorsementFlag && item.Endorsement !== true) || item.disabled}
                    disabled={EndorsementFun()}
                  />
                }
                label={item.label}
              />
            );
          case "Modal":
            return (
              <Modal open={item.open}>
                <MDBox sx={style}>{item.return}</MDBox>
              </Modal>
            );
          case "Mapper1":
            return (
              <Grid container display="flex" spacing={1.5}>
                {item.renderControl.map(
                  (item1) =>
                    item1.visible && (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={item1.spacing ? item1.spacing : spacing}
                        lg={item1.spacing}
                        xl={item1.spacing}
                        xxl={item1.spacing}
                      >
                        <RenderControlV1
                          item={item1}
                          setPolicyDto={setPolicyDto}
                          genericPolicyDto={genericPolicyDto}
                          nextFlag={nextFlag}
                          nextCount={nextCount}
                        />
                      </Grid>
                    )
                )}
              </Grid>
            );

          case "Mapper2":
            return (
              <Grid container display="flex" spacing={1.5}>
                {item.renderControl.map((item1) =>
                  item1.map(
                    (item2) =>
                      item2.visible && (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={item2.spacing ? item2.spacing : spacing}
                          lg={item2.spacing}
                          xl={item2.spacing}
                          xxl={item2.spacing}
                        >
                          <RenderControlV1 item={item2} />
                        </Grid>
                      )
                  )
                )}
              </Grid>
            );
          case "CardButton": {
            const [CompStatus, setCompStatus] = useState(false);
            const onCardClick = (e) => {
              setCompStatus(e.target.checked);
            };
            return (
              <Card sx={{ background: CompStatus ? "#42a5f5" : "#f5f5f5" }} component="label">
                <input type="checkbox" hidden onChange={(e) => onCardClick(e)} />
                <MDBox p={3}>
                  <MDTypography align="center">{item.label}</MDTypography>
                </MDBox>
              </Card>
            );
          }
          case "CardCountButton": {
            const [Count, setCount] = useState(0);
            const onAdd = () => setCount(Count + 1);
            const onSub = () => setCount(Count - 1);

            return (
              <Card sx={{ background: Count === 0 ? "#f5f5f5" : "#42a5f5" }}>
                <MDBox p={1} pl={3} pr={3}>
                  <MDTypography align="center">{item.label}</MDTypography>
                  <Stack direction="row">
                    <MDButton variant="text" onClick={onAdd}>
                      <Add />
                    </MDButton>
                    <MDTypography align="center">{Count}</MDTypography>
                    <MDButton variant="text" onClick={onSub} disabled={Count === 0}>
                      <Remove />
                    </MDButton>
                  </Stack>
                </MDBox>
              </Card>
            );
          }
          case "Img":
            return (
              <MDBox sx={{ width: "100%", height: "100%" }}>
                {" "}
                <MDBox
                  component="img"
                  src={item.src}
                  sx={{ width: "100%", height: "100%", ...item.sx }}
                />
              </MDBox>
            );
          case "Custom":
            return item.return;
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}
export default RenderControlV1;
