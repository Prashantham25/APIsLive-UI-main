import { useState, useEffect } from "react";
// import from "object-path";
// import object
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import {
  Grid,
  Stack,
  // FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  // Checkbox,
  Modal,
  Card,
  Tab,
  IconButton,
  Icon,
  Divider,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import objectPath from "object-path";

// MD Components
import MDInput from "components/MDInput";
import MDDatePicker from "components/MDDatePicker";

import MDAutocomplete from "components/MDAutocomplete";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDCheckbox from "../../../components/MDCheckbox";

import validationFunc from "../../Validations/ValidationFunctionV3";
import AddComponents from "../../../modules/PolicyLive/views/Retail/Layout/Version3/AddComponents";
import { ConditionLogicalValidation } from "./RenderControlFunctions";
// import { get, set } from "./CustomFunctions";
// import { set, get } from "./objectPath";

import ColorsSetting from "../../../assets/themes/BrokerPortal/ColorsSetting";

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
// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

function RenderControlV3({
  item,
  setDto,
  nextFlag,
  nextCount,
  dto,
  onMidNextValidation,
  midNextValidationId,
  customFunctions,
  masters,
}) {
  // console.log("item", item);
  const backgroundColor = ColorsSetting().primary.main;
  const textColor = ColorsSetting().white.focus;

  const currencyFormat = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const spacing = 3;
  const LPolicyDto = { ...dto };

  const val = item.value ? item.value : objectPath.get(LPolicyDto, item.path ? item.path : "");
  const value = val !== undefined ? val : "";
  const value1 = val !== undefined ? val : "";
  // const StaticMerge =
  //   item.type === "StaticMerge" ? lazy(() => import(item.import)) : <h6>Module Not Found</h6>;

  let required = false;
  let visible = false;

  if (
    item.required === true ||
    (item.required === "requiredDetails" &&
      item.requiredDetails &&
      ConditionLogicalValidation({ dto, details: item.requiredDetails })) === true
  ) {
    required = true;
  }

  if (
    item.visible === true ||
    (item.visible === "visibleDetails" &&
      item.visibleDetails &&
      ConditionLogicalValidation({ dto, details: item.visibleDetails })) === true
  ) {
    visible = true;
  }

  //  setDto, PolicyDto, onSaveFlag

  // if (item.numberFormat) {
  //   const formatter = new Intl.NumberFormat(item.numberFormat.code, {
  //     style: item.numberFormat.style,
  //     currency: item.numberFormat.currency,
  //   });
  //   value = formatter;
  //   value1 = formatter;
  // }

  const [errorText, setErrorText] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  useEffect(() => {
    setErrorText(item.helperText);
    // if (isBoolean(item.error)) setErrorFlag(item.error);
    setErrorFlag(item.error);
  }, [item.error, item.helperText]);

  useEffect(() => {
    if (nextFlag)
      if (visible && required) {
        if (
          midNextValidationId !== undefined &&
          midNextValidationId !== null &&
          midNextValidationId !== -1 &&
          item.subType === "ValidationControl"
        ) {
          setErrorText("");
          setErrorFlag(false);
        } else if (
          midNextValidationId !== undefined &&
          midNextValidationId !== null &&
          midNextValidationId !== -1 &&
          item.subType !== "ValidationControl"
        ) {
          if (
            midNextValidationId === item.validationId &&
            (value === "" ||
              value === undefined ||
              value === null ||
              (item.multiple && item.multiple === true && value.length === 0))
          ) {
            setErrorText("This field required");
            setErrorFlag(true);
          }
        } else if (
          value === "" ||
          value === undefined ||
          value === null ||
          (item.multiple && item.multiple === true && value.length === 0)
        ) {
          setErrorText("This field required");
          setErrorFlag(true);
        }
      } else {
        setErrorText("");
        setErrorFlag(false);
      }
  }, [nextFlag, nextCount, required, visible]);

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

  const onChangeFuncsValidation = (e) => {
    let validationStatus = true;
    const par = Array.isArray(item.parameters) ? item.parameters : [""];
    item.onChangeFuncs.every((fun) => {
      // const funName = valChangFunc.filter((x) => x.funName === fun || x.fun === fun);
      if (validationFunc[fun]) {
        if (validationFunc[fun](e.target.value, ...par) === true) {
          // LPolicyDto = set(LPolicyDto, item.path, e.target.value);
          setErrorFlag(false);
          setErrorText("");
        } else {
          validationStatus = false;
          setErrorFlag(true);
          setErrorText(validationFunc[fun](e.target.value));
          // setDto({ ...PolicyDto, [item.name]: "" });
          return false;
        }
      } else if (fun(e.target.value, ...par) === true) {
        // LPolicyDto = set(LPolicyDto, item.path, e.target.value);

        setErrorFlag(false);
        setErrorText("");
      } else {
        validationStatus = false;
        setErrorFlag(true);
        setErrorText(fun(e.target.value));
        // setDto({ ...PolicyDto, [item.name]: "" });
        return false;
      }
      return true;
    });
    // setDto({ ...LPolicyDto });
    return validationStatus;
  };
  const onChangeEvent1 = async (e, a) => {
    switch (item.type) {
      case "Input":
        if (Array.isArray(item.onChangeFuncs)) {
          if (onChangeFuncsValidation(e) === true) {
            objectPath.set(
              LPolicyDto,
              item.path,
              item.inputType === "number" ? parseInt(e.target.value, 10) : e.target.value
            );
          }
        } else {
          objectPath.set(
            LPolicyDto,
            item.path,
            item.inputType === "number" ? parseInt(e.target.value, 10) : e.target.value
          );
          setErrorFlag(false);
          setErrorText("");
        }
        break;
      case "AutoComplete":
        if (a === null) {
          if (item.multiple && item.multiple === true) objectPath.set(LPolicyDto, item.path, []);
          else objectPath.set(LPolicyDto, item.path, "");
        } else if (item.multiple && item.multiple === true)
          objectPath.set(LPolicyDto, item.path, a);
        else {
          objectPath.set(LPolicyDto, item.path, item.setOption ? a[item.setOption] : a.mValue);
          if (Array.isArray(item.paths)) {
            item.paths.forEach((x1) => {
              objectPath.set(LPolicyDto, x1.path, a[x1.parameter]);
            });
          }
          if (item.countPush) {
            const arr = [];
            validationFunc.arrayRange(1, parseInt(a.mValue, 10), 1).forEach(() => {
              arr.push({ ...item.countPush.obj });
            });
            objectPath.set(LPolicyDto, item.countPush.path, arr);
          }
        }
        setErrorFlag(false);
        setErrorText("");
        break;

      case "MDDatePicker":
        objectPath.set(LPolicyDto, item.path, a);
        if (item.isDOB && item.isDOB === true) {
          if (item.DOBpath)
            objectPath.set(LPolicyDto, item.DOBpath, validationFunc.AgeCalculator(new Date(e)));
          else {
            const agePath = item.path.split(".");
            agePath[agePath.length - 1] = "Age";
            objectPath.set(
              LPolicyDto,
              agePath.join("."),
              validationFunc.AgeCalculator(new Date(e))
            );
          }
        }
        if (item.endDate) {
          const date1 = new Date();
          // d-m-y   y-m-d
          date1.setFullYear(parseInt(a.split("-")[0], 10) + 1);
          date1.setMonth(parseInt(a.split("-")[1], 10) - 1);
          date1.setDate(parseInt(a.split("-")[2], 10) - 1);
          const date2 = validationFunc.DateFormatFromDateObject(date1, "y-m-d");
          objectPath.set(LPolicyDto, item.endDate.path, date2);
        }

        setErrorText("");
        setErrorFlag(false);
        break;

      case "RadioGroup":
        objectPath.set(LPolicyDto, item.path, e.target.value);
        setErrorFlag(false);
        setErrorText("");
        break;
      case "Checkbox":
        if (e.target.checked) objectPath.set(LPolicyDto, item.path, item.checkedVal);
        else objectPath.set(LPolicyDto, item.path, item.unCheckedVal);
        setErrorFlag(false);
        setErrorText("");
        break;

      default:
        console.log("Invalid component");
    }
    setDto({ ...LPolicyDto });
    try {
      if (Array.isArray(item.functionList)) {
        if (Array.isArray(item.onChangeFuncs)) {
          if (onChangeFuncsValidation(e) === true) {
            // objectPath.set(LPolicyDto, item.path, e.target.value);
            // item.customOnChange(e, a, setErrorFlag, setErrorText);
            customFunctions.onChangeEvents(
              e,
              a,
              setErrorFlag,
              setErrorText,
              item.functionList,
              LPolicyDto,
              setDto,
              "OnChange"
            );
          }
        } else
          customFunctions.onChangeEvents(
            e,
            a,
            setErrorFlag,
            setErrorText,
            item.functionList,
            LPolicyDto,
            setDto,
            "OnChange"
          );
      }
    } catch {
      console.log(" customFunctions.onChangeEvents error in render control");
      setDto({ ...LPolicyDto });
    }
  };

  const onBlurFuncsValidation = (e) => {
    let validationStatus = true;
    const par = Array.isArray(item.parameters) ? item.parameters : [""];
    item.onBlurFuncs.every((fun) => {
      // const funName = valChangFunc.filter((x) => x.funName === fun || x.fun === fun);
      if (validationFunc[fun]) {
        if (validationFunc[fun](e.target.value, ...par) === true) {
          // LPolicyDto = set(LPolicyDto, item.path, e.target.value);
          setErrorFlag(false);
          setErrorText("");
        } else {
          validationStatus = false;
          setErrorFlag(true);
          setErrorText(validationFunc[fun](e.target.value));
          // setDto({ ...PolicyDto, [item.name]: "" });
          return false;
        }
      } else if (fun(e.target.value, ...par) === true) {
        // LPolicyDto = set(LPolicyDto, item.path, e.target.value);

        setErrorFlag(false);
        setErrorText("");
      } else {
        validationStatus = false;
        setErrorFlag(true);
        setErrorText(fun(e.target.value));
        // setDto({ ...PolicyDto, [item.name]: "" });
        return false;
      }
      return true;
    });
    // setDto({ ...LPolicyDto });
    return validationStatus;
  };

  const onBlurEvent = (e, a) => {
    if (validationFunc.isFunction(item.customOnBlur)) {
      if (Array.isArray(item.noBlurFuncs)) {
        if (onBlurFuncsValidation(e) === true) {
          objectPath.set(LPolicyDto, item.path, e.target.value.trim());
          item.customOnBlur(e, a, setErrorFlag, setErrorText);
        } else {
          objectPath.set(LPolicyDto, item.path, "");
        }
      }
    } else
      switch (item.type) {
        case "Input":
          if (Array.isArray(item.onChangeFuncs)) {
            setErrorFlag(false);
            setErrorText("");
          }
          if (Array.isArray(item.onBlurFuncs)) {
            if (onBlurFuncsValidation(e) === true) {
              objectPath.set(LPolicyDto, item.path, e.target.value.trim());
            } else objectPath.set(LPolicyDto, item.path, "");
          } else
            objectPath.set(
              LPolicyDto,
              item.path,
              item.inputType === "number" ? parseInt(e.target.value, 10) : e.target.value.trim()
            );

          break;

        default:
          console.log("Invalid component");
      }
    setDto({ ...LPolicyDto });
    try {
      if (Array.isArray(item.functionList)) {
        if (Array.isArray(item.onChangeFuncs)) {
          if (onChangeFuncsValidation(e) === true) {
            // objectPath.set(LPolicyDto, item.path, e.target.value);
            // item.customOnChange(e, a, setErrorFlag, setErrorText);
            customFunctions.onChangeEvents(
              e,
              a,
              setErrorFlag,
              setErrorText,
              item.functionList,
              LPolicyDto,
              setDto,
              "OnBlur"
            );
          }
        } else
          customFunctions.onChangeEvents(
            e,
            a,
            setErrorFlag,
            setErrorText,
            item.functionList,
            LPolicyDto,
            setDto,
            "OnBlur"
          );
      }
    } catch {
      console.log(" customFunctions.onBlurEvents error in render control");
      setDto({ ...LPolicyDto });
    }
  };

  const onClickMidNextValidation = () => {
    console.log("test1");
    if (item.validationId) {
      console.log("test1");
      const res1 = onMidNextValidation(item.validationId);
      if (customFunctions && res1 === true)
        customFunctions.onChangeEvents(
          "",
          "",
          setErrorFlag,
          setErrorText,
          item.functionList,
          LPolicyDto,
          setDto,
          "OnClick"
        );
    } else
      customFunctions.onChangeEvents(
        "",
        "",
        setErrorFlag,
        setErrorText,
        item.functionList,
        LPolicyDto,
        setDto,
        "OnClick"
      );
    // item.onClick(res1);
  };

  // const onChangeMidNextValidation = (e, a) => {
  //   const res1 = onMidNextValidation(item.validationId);
  //   if (res1) onChangeEvent(e, a);
  // };

  const onChangeEvent = async (e, a) => {
    if (
      onMidNextValidation !== undefined &&
      onMidNextValidation !== null &&
      (item.subType === "ValidationControl" || item.type === "ValidationControl")
    ) {
      if (onMidNextValidation(item.validationId)) onChangeEvent1(e, a);
    } else onChangeEvent1(e, a);
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

  const getDropDownOptions = () => {
    let arr = [];

    if (Array.isArray(item.options)) arr = item.options;
    else if (masters?.[item.options]) arr = masters[item.options];

    if (item.filterCriteria) {
      const vFrom = item.filterCriteria.valueFrom;

      if (item.filterCriteria.parameterType === "Object") {
        if (vFrom === "Direct value")
          arr = arr.filter((x) => x[item.filterCriteria.keyName] === item.filterCriteria.value);
        if (vFrom === "Policy Json")
          arr = arr.filter(
            (x) => x[item.filterCriteria.keyName] === objectPath.get(dto, item.filterCriteria.value)
          );
      }
      if (item.filterCriteria.parameterType === "Index") {
        if (vFrom === "Direct value") arr = arr.filter((x, i) => i === item.filterCriteria.value);
        // if (vFrom === "Policy Json")
        //   arr = arr.filter((x) => i === objectPath.get(dto, item.filterCriteria.value));
      }
    }
    return Array.isArray(arr) ? arr : [];
  };

  const getDropDownOption = () => {
    const obj1 = item.optionLabel ? { [item.optionLabel]: "" } : { mValue: "" };
    let arr1 = [];
    if (item.setOption) arr1 = getDropDownOptions().filter((x1) => x1[item.setOption] === value);
    else arr1 = getDropDownOptions().filter((x1) => x1.mValue === value);

    return arr1.length > 0 ? arr1[0] : obj1;
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
                inputProps={{ ...item.InputProps }}
                error={errorFlag}
                placeholder={item.placeholder}
                helperText={errorText}
                required={required}
                maxLength={item.maxLength}
                multiline={item.multiline}
                rows={item.rows}
                disabled={
                  item.disabled === true ||
                  (item.disabled === "disabledDetails" &&
                    ConditionLogicalValidation({ dto, details: item.disabledDetails }) === true)
                }
                sx={redAsterisk}
                type={item.inputType}
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
                  allowInput: item.allowInput,
                  noCalendar: item.noCalendar,
                  enableTime: item.enableTime,
                }}
                input={{
                  label: item.label,
                  value: value1 === null ? "" : value1,
                  error: errorFlag,
                  helperText: errorText,
                  required,
                  inputProps: { ...item.InputProps },
                  sx: redAsterisk,
                  placeholder: datePlaceHolder(item.altFormat ? item.altFormat : "d-m-Y"),
                  // ref={InputRef}
                  InputLabelProps: { shrink: item.allowInput },
                }}
                value={value}
                disabled={
                  item.disabled === true ||
                  (item.disabled === "disabledDetails" &&
                    ConditionLogicalValidation({ dto, details: item.disabledDetails }) === true)
                }
                onChange={(e, a) => onChangeEvent(e, a)}
              />
            );
          }

          case "AutoComplete":
            return (
              <MDAutocomplete
                options={getDropDownOptions()}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiAutocomplete-tag": {
                    backgroundColor,
                  },
                  ...redAsterisk,
                }}
                multiple={item.multiple}
                optionLabel={item.optionLabel}
                // value={item.optionLabel ? { [item.optionLabel]: value } : { mValue: value }}
                value={item.multiple ? value : getDropDownOption()}
                onChange={(e, a) => onChangeEvent(e, a)}
                label={item.label}
                error={errorFlag}
                helperText={errorText}
                required={required}
                readOnly={item.readOnly}
                disabled={
                  item.disabled === true ||
                  (item.disabled === "disabledDetails" &&
                    ConditionLogicalValidation({ dto, details: item.disabledDetails }) === true)
                }
                disableCloseOnSelect={item.disableCloseOnSelect}
                open={item.open}
                onOpen={item.onOpen}
                onClose={item.onClose}
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
                    {item?.radioLabel?.labelVisible && (
                      <FormLabel
                        variant="body1"
                        sx={{
                          fontSize: item.radioLabel.fontSize ? item.radioLabel.fontSize : "",
                          fontWeight: item.radioLabel.fontWeight ? item.radioLabel.fontWeight : 400,
                          color: item.radioLabel.color ? item.radioLabel.color : "#000000",
                        }}
                      >
                        {item.radioLabel.label}
                      </FormLabel>
                    )}
                  </MDBox>
                  <MDBox sx={{ minWidth: 150 }}>
                    <RadioGroup row value={value} onChange={(e, a) => onChangeEvent(e, a)}>
                      <Stack direction="row" spacing={0.2}>
                        {item?.radioList?.map((r) => (
                          <FormControlLabel
                            value={r.value}
                            label={r.label}
                            control={
                              <Radio
                                disabled={
                                  r.disabled ||
                                  item.disabled === true ||
                                  (item.disabled === "disabledDetails" &&
                                    ConditionLogicalValidation({
                                      dto,
                                      details: item.disabledDetails,
                                    }) === true)
                                }
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
              <DataGrid
                autoHeight
                rows={Array.isArray(val) ? val : []}
                columns={item.columns}
                getRowId={(option) => option[item.rowId]}
                onRowClick={item.onRowClick}
                pageSize={item.rowPerPage ? item.rowPerPage : 5}
                getRowHeight={() => item.getRowHeight}
                // rowsPerPageOptions={[item.rowPerPage ? item.rowPerPage : 5, 10, 20, 50, 100]}
                experimentalFeatures={{ newEditingApi: true, columnGrouping: true }}
                components={{ Toolbar: item.GridToolbar ? GridToolbar : false }}
                editField="inEdit"
                checkboxSelection={item.checkboxSelection}
                columnGroupingModel={item.columnGroupingModel}
                onSelectionModelChange={item.onSelectionModelChange}
                disableSelectionOnClick={item.disableSelectionOnClick}
                selectionModel={item.selectionModel}
              />
            );
          case "Button":
            return (
              <MDBox
                sx={{
                  with: "100%",
                  display: "flex",
                  justifyContent: item.justifyContent,
                }}
              >
                <MDButton
                  sx={{ width: item.width }}
                  variant={item.variant}
                  startIcon={
                    typeof item.startIcon === "string" ? (
                      <Icon>{item.startIcon}</Icon>
                    ) : (
                      item.startIcon
                    )
                  }
                  endIcon={
                    typeof item.endIcon === "string" ? <Icon>{item.endIcon}</Icon> : item.endIcon
                  }
                  onClick={onClickMidNextValidation}
                  component={item.component}
                  color={item.color}
                  disabled={
                    item.disabled === true ||
                    (item.disabled === "disabledDetails" &&
                      ConditionLogicalValidation({ dto, details: item.disabledDetails }) === true)
                  }
                >
                  {item.label}
                  {item.typeFormat}
                </MDButton>
              </MDBox>
            );

          case "ValidationControl":
            return (
              <RenderControlV3
                item={{
                  ...item,

                  type: item.subType,
                  subType: item.subType ? "ValidationControl" : undefined,
                  //   onClick: item.onClick ? onClickMidNextValidation : undefined,
                  // customOnChange: item.customOnChange ? onChangeMidNextValidation : undefined,
                }}
                setDto={setDto}
                nextFlag={nextFlag}
                nextCount={nextCount}
                dto={dto}
                onMidNextValidation={onMidNextValidation}
                midNextValidationId={midNextValidationId}
                customFunctions={customFunctions}
                masters={masters}
              />
            );

          case "IconButton":
            return (
              <IconButton
                onClick={() => item.onClick(item.index)}
                component={item.component}
                color={item.color}
                disabled={
                  item.disabled === true ||
                  (item.disabled === "disabledDetails" &&
                    ConditionLogicalValidation({ dto, details: item.disabledDetails }) === true)
                }
              >
                {typeof item.icon === "string" ? <Icon>{item.icon}</Icon> : item.icon}
              </IconButton>
            );

          case "Typography":
            return (
              <MDTypography
                variant={item.variant}
                color={item.color}
                align={item.align}
                sx={item.sx}
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
                onClick={item.onClick}
              >
                {value}
              </MDTypography>
            );
          case "Checkbox":
            return (
              <MDBox>
                <MDBox display="flex" flexDirection="row">
                  <MDCheckbox
                    onChange={(e, a) => onChangeEvent(e, a)}
                    disabled={
                      item.disabled === true ||
                      (item.disabled === "disabledDetails" &&
                        ConditionLogicalValidation({ dto, details: item.disabledDetails }) === true)
                    }
                    checked={value === item.checkedVal}
                    color={item.color}
                  />
                  <MDTypography sx={{ fontSize: "1rem", marginTop: "5px" }}>
                    {item.label}
                  </MDTypography>
                </MDBox>

                {/* <FormControlLabel
                  control={
                    <MDCheckbox
                      checked={value === item.checkedVal}
                      onChange={(e, a) => onChangeEvent(e, a)}
                      disabled={item.disabled}
                    />
                  }
                  label={item.label}
                /> */}
                {errorFlag && (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>{errorText}</MDTypography>
                )}
              </MDBox>
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
                {Array.isArray(value) &&
                  value.map((x1, i1) =>
                    item.mapperComponents.map((x2) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={x2.spacing ? x2.spacing : spacing}
                        lg={x2.spacing}
                        xl={x2.spacing}
                        xxl={x2.spacing}
                      >
                        <RenderControlV3
                          item={{
                            ...x2,
                            path: `${item.path}.${i1}.${x2.path}`,
                            label: x2.label.replace("{index}", i1 + 1),
                            customOnChange: x2.customOnChange
                              ? (e, v, e1, e2) => x2.customOnChange(e, v, e1, e2, i1)
                              : undefined,
                          }}
                          setDto={setDto}
                          dto={dto}
                          nextFlag={nextFlag}
                          nextCount={nextCount}
                          customFunctions={customFunctions}
                          masters={masters}
                        />
                      </Grid>
                    ))
                  )}
              </Grid>
            );
          case "Mapper2-Covers":
            return (
              <Grid container spacing={4}>
                {Array.isArray(value) &&
                  value.map((x) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h4">{`Cover - ${x.CoverName}`}</MDTypography>
                      <MDTypography variant="h6" color="error">
                        {x.Clauses}
                      </MDTypography>
                      {x.BenefitDetail.length > 0 && (
                        <Grid container spacing={4}>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography variant="h5">Benefit</MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography variant="h5">Sum Insured</MDTypography>
                          </Grid>
                        </Grid>
                      )}
                      {x.BenefitDetail.map((x1, i1) => (
                        <Grid container spacing={4}>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography variant="h6">{`${i1 + 1})   ${x1.Benefit}`}</MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography variant="h6">{x1.SI}</MDTypography>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  ))}
              </Grid>
            );

          case "Mapper3":
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
                          <RenderControlV3 item={item2} />
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
          case "Tabs":
            return (
              <Tabs
                indicatorColor="white"
                textColor="white"
                value={item.value}
                onChange={(e, a) => onChangeEvent(e, a)}
                orientation={item.orientation ? item.orientation : "horizontal"}
                // variant="scrollable"
                // scrollButtons
                sx={{
                  m: 0,
                  p: 0,
                  borderRadius: 0,
                  "& .MuiTabs-indicator": item.orientation !== "vertical" && {
                    backgroundColor: ColorsSetting().secondary.main,
                    zIndex: 10,
                  },
                  // [`& .${tabsClasses.scrollButtons}`]: {
                  //   "&.Mui-disabled": { opacity: 0.3 },
                  // },
                }}
              >
                {item.tabs.map((x, i) => (
                  <Tab
                    value={x.value}
                    label={x.label}
                    component="a"
                    sx={{
                      "&.Mui-selected": {
                        color: "#ffffff",
                        bgcolor: backgroundColor,
                        transition: "all 1s",
                      },
                      borderRadius: 0,
                      color: "rgba(105, 105, 116, 0.6)",
                      fontWeight: 600,
                    }}
                    icon={
                      x.icon && (
                        <IconButton onClick={() => x.onClick(i)}>
                          <Icon>{x.icon}</Icon>
                        </IconButton>
                      )
                    }
                    iconPosition={x.iconPosition ? x.iconPosition : "end"}
                  >
                    <Divider />
                  </Tab>
                ))}
              </Tabs>
            );
          case "MultiQuoteCard":
            return (
              <Card sx={{ bgcolor: backgroundColor }}>
                <Table>
                  <TableRow>
                    {item?.columns?.map((x) => (
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: textColor,
                        }}
                      >
                        {x.name}
                      </TableCell>
                    ))}
                  </TableRow>
                  {Object.keys(item.rows[0]).map((x1) => (
                    <TableRow>
                      <TableCell sx={{ color: textColor }}>{x1}</TableCell>
                      {item.rows.map((x2) => (
                        <TableCell sx={{ color: textColor }}>{x2[x1]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </Table>
              </Card>
            );
          case "GroupButton":
            return (
              <Stack
                direction={item.direction ? item.direction : "row"}
                spacing={4}
                sx={{ display: "flex", justifyContent: item.justifyContent }}
              >
                {item?.buttons?.map(
                  (x) =>
                    x.visible === true && (
                      <MDButton
                        onClick={x.onClick}
                        variant={x.variant}
                        color={x.color}
                        disabled={x.disabled}
                        endIcon={<Icon>{x.endIcon}</Icon>}
                        startIcon={<Icon>{x.startIcon}</Icon>}
                      >
                        {x.label}
                      </MDButton>
                    )
                )}
              </Stack>
            );
          case "PdfViewer":
            return (
              <Modal open={item.open === true} onClose={item.onClose}>
                <MDBox sx={{ bgcolor: "#ffffff" }} height="90vh">
                  {/* {false && ( */}

                  <iframe
                    width="100%"
                    height="100%"
                    src={`data:application/pdf;base64,${encodeURI(item.src)}`}
                    title={item.title ? item.title : "PDF Viewer"}
                  />

                  {/* <embed
                    type="application/pdf"
                    src={`data:application/pdf;base64,${encodeURI(item.src)}`}
                  /> */}
                </MDBox>
              </Modal>
            );

          case "Divider":
            return <Divider sx={{ ...item.sx }} />;
          case "Custom":
            return item.return;

          case "StaticMerge": {
            const StaticMerge = AddComponents[item.componentName];
            return <StaticMerge dto={dto} setDto={setDto} />;
          }
          case "Split": {
            return (
              <MDBox
                sx={{
                  bgcolor: "#bbdefb",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <MDTypography variant="h6">{`Id: ${item?.splitDetails?.id}`}</MDTypography>
              </MDBox>
            );
          }
          case "Card1-Summary":
            return (
              <MDBox>
                <Stack direction="row" justifyContent="center">
                  <MDTypography>
                    <strong>{item.label}</strong>
                  </MDTypography>
                </Stack>
                <Stack direction="row" justifyContent="center" mt={2}>
                  <Card
                    // color="success"
                    sx={{
                      backgroundColor: item.color ? item.color : "#F0F0F0",
                      width: item.cardWidth ? item.cardWidth : "70%",
                    }}
                  >
                    <Grid container spacing={2} p={3}>
                      {item?.cardDetails?.map((x1) => (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <Stack
                            direction="row"
                            sx={{ display: "flex", justifyContent: "space-between" }}
                          >
                            <MDTypography>{x1.label}</MDTypography>
                            {x1.value && (
                              <MDTypography variant={x1.valueVariant} sx={{ textAlign: "right" }}>
                                {x1.isAmount && x1.isAmount === true
                                  ? `₹ ${currencyFormat.format(x1.value)}`
                                  : x1.value}
                              </MDTypography>
                            )}
                            {x1.path && (
                              <MDTypography variant={x1.pathVariant} sx={{ textAlign: "right" }}>
                                {x1.isAmount && x1.isAmount === true
                                  ? `₹ ${currencyFormat.format(objectPath.get(dto, x1.path))}`
                                  : objectPath.get(dto, x1.path)}
                              </MDTypography>
                            )}
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Card>
                </Stack>
              </MDBox>
            );

          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}
export default RenderControlV3;
