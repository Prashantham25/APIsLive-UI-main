import { useState, useEffect } from "react";
// import objectPath from "object-path";
// import object
import { GridToolbar } from "@mui/x-data-grid";
import objectPath from "object-path";

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
  ButtonGroup,
  InputAdornment,
  useMediaQuery,
  TableContainer,
  TableHead,
  TableBody,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";

// MD Components
import MDInput from "components/MDInput";
import MDDatePicker from "components/MDDatePicker";

import MDAutocomplete from "components/MDAutocomplete";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDCheckbox from "../../components/MDCheckbox";
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
  IsCKYC,
} from "../Validations";
// import { get, set } from "./CustomFunctions";
import { set, get } from "./objectPath";
import ColorsSetting from "../../assets/themes/BrokerPortal/ColorsSetting";
import CustomCurrencyInput from "../../components/CustomCurrencyInput";
import { useDataController } from "../../modules/BrokerPortal/context";
import GetTranslate from "../../components/Translation/GetTranslate";

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
  { funName: "IsCKYC", fun: IsCKYC },
];

const handleKeyDown = (e) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  // transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

function NewRenderControl({
  item,
  setDto,
  nextFlag,
  nextCount,
  dto,
  onMidNextValidation,
  midNextValidationId,
}) {
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  const matches = useMediaQuery("(min-width:450px)");

  // console.log("item", item);
  const backgroundColor = ColorsSetting().primary.main;
  const textColor = ColorsSetting().white.focus;

  const [control] = useDataController();
  const { genericInfo } = control;

  const disabledFunction = () => {
    let flag1 = false;
    if (genericInfo.Endorsement && item.path && Array.isArray(genericInfo.EndorsementControlList)) {
      const str2 = item.path.replace(/[0-9]/g, "").replace("..", ".");
      // let flag2 = true;
      let flag2 = !item.enableAtEndorsement === true;
      // flagVar = !genericInfo.EndorsementControlList.some((x) => x.path === item.path);
      genericInfo.EndorsementControlList.forEach((x) => {
        if (x.isArray === true) {
          const str1 = x.path.replace(/[0-9]/g, "").replace("..", ".");
          if (str1 === str2) flag2 = false;
        } else if (x.path === item.path) flag2 = false;
      });
      flag1 = flag2;
    }
    return item.disabled || flag1;
  };

  const spacing = 3;
  let LPolicyDto = { ...dto };

  const val = item.value ? item.value : get(LPolicyDto, item.path ? item.path : "");
  const value = val !== undefined ? val : "";
  const value1 = val !== undefined ? val : "";

  let required = false;
  let visible = false;

  if (
    item.required === true ||
    (item.required === "requiredDetails" &&
      item.requiredDetails &&
      get(dto, item.requiredDetails.path) === item.requiredDetails.value)
  ) {
    required = true;
  }

  if (
    item.visible === true ||
    (item.visible === "visibleDetails" &&
      item.visibleDetails &&
      get(dto, item.visibleDetails.path) === item.visibleDetails.value)
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
  const errorMes = "This field is required.";
  const [errorText, setErrorText] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  useEffect(() => {
    setErrorText(item.errtext);
    // if (isBoolean(item.error)) setErrorFlag(item.error);
    setErrorFlag(item.error);
  }, [item.error, item.errtext]);

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
              item.errorFlag === true ||
              (item.multiple && item.multiple === true && value.length === 0))
          ) {
            setErrorText(item.errorText ? item.errorText : errorMes);
            setErrorFlag(true);
          }
          if (
            midNextValidationId === item.validationId &&
            value !== "" &&
            value !== undefined &&
            value !== null &&
            item.errorFlag === true
          ) {
            setErrorText(item.errtext || item.errorText);
            setErrorFlag(true);
          }
        } else if (
          item.validationDisableOnProceed !== true &&
          (value === "" ||
            value === undefined ||
            value === null ||
            (item.multiple && item.multiple === true && value.length === 0))
        ) {
          setErrorText(errorMes);
          setErrorFlag(true);
        } else if (
          value !== "" &&
          value !== undefined &&
          value !== null &&
          item.errorFlag === true
        ) {
          setErrorText(item.errtext || item.errorText);
          setErrorFlag(true);
        }
      } else {
        setErrorText("");
        setErrorFlag(false);
      }
  }, [nextFlag, nextCount, required, visible]);

  useEffect(() => {
    if (errorFlag === true && errorText === errorMes) {
      if (item.multiple && item.multiple === true && value.length !== 0) {
        setErrorText("");
        setErrorFlag(false);
      } else if (value !== "") {
        setErrorText("");
        setErrorFlag(false);
      }
    }
  }, [value]);

  const onDynamicTableChange = (e, rowId, columnId) => {
    objectPath.set(dto, `${item.path}.${rowId}.${columnId}.Answer`, e.target.value);
    setDto({ ...dto });
  };

  const onChangeEvent1 = async (e, a) => {
    console.log("test e", e, item);

    if (isFunction(item.customOnChange) && item.type !== "Input") {
      item.customOnChange(e, a, setErrorFlag, setErrorText);
    } else {
      switch (item.type.replace("Currency", "").replace("SeparateLabel", "")) {
        case "Input":
          if (Array.isArray(item.onChangeFuncs)) {
            // if (item.onChangeFuncs.length !== 0)
            const par = Array.isArray(item.parameters) ? item.parameters : [""];
            item.onChangeFuncs.every((fun) => {
              const funName = valChangFunc.filter((x) => x.funName === fun || x.fun === fun);
              if (funName.length > 0) {
                if (funName[0].fun(e.target.value, ...par) === true) {
                  if (isFunction(item.customOnChange)) {
                    item.customOnChange(e, a, setErrorFlag, setErrorText);
                  } else {
                    LPolicyDto = set(LPolicyDto, item.path, e.target.value);
                    setDto({ ...LPolicyDto });
                  }
                  setErrorFlag(false);
                  setErrorText("");
                } else {
                  setErrorFlag(true);
                  setErrorText(funName[0].fun(e.target.value));
                  // setDto({ ...PolicyDto, [item.name]: "" });
                  return false;
                }
              } else if (fun(e.target.value, ...par) === true) {
                if (isFunction(item.customOnChange)) {
                  item.customOnChange(e, a, setErrorFlag, setErrorText);
                } else {
                  LPolicyDto = set(LPolicyDto, item.path, e.target.value);
                  setDto({ ...LPolicyDto });
                }
                setErrorFlag(false);
                setErrorText("");
              } else {
                setErrorFlag(true);
                setErrorText(fun(e.target.value));
                // setDto({ ...PolicyDto, [item.name]: "" });
                return false;
              }
              return true;
            });
          } else if (isFunction(item.customOnChange)) {
            item.customOnChange(e, a, setErrorFlag, setErrorText);
            setErrorFlag(false);
            setErrorText("");
          } else {
            LPolicyDto = set(LPolicyDto, item.path, e.target.value);
            setErrorFlag(false);
            setErrorText("");
            setDto({ ...LPolicyDto });
          }

          if (Array.isArray(item.paths)) {
            item.paths.forEach((x1) => {
              if (x1.parameter) LPolicyDto = set(LPolicyDto, x1.path, a[x1.parameter]);
              if (x1.value || x1.value === "") LPolicyDto = set(LPolicyDto, x1.path, x1.value);
            });
          }

          break;
        case "AutoComplete":
          if (a === null) {
            if (item.multiple && item.multiple === true)
              LPolicyDto = set(LPolicyDto, item.path, []);
            else
              LPolicyDto = set(LPolicyDto, item.path, item.optionLabel ? a[item.optionLabel] : "");
          } else if (item.multiple && item.multiple === true)
            LPolicyDto = set(LPolicyDto, item.path, a);
          else {
            LPolicyDto = set(
              LPolicyDto,
              item.path,
              item.optionLabel ? a[item.optionLabel] : a.mValue
            );
            if (Array.isArray(item.paths)) {
              item.paths.forEach((x1) => {
                if (x1.parameter) LPolicyDto = set(LPolicyDto, x1.path, a[x1.parameter]);
                if (x1.value || x1.value === "") LPolicyDto = set(LPolicyDto, x1.path, x1.value);
              });
            }
          }

          setErrorFlag(false);
          setErrorText("");
          setDto({ ...LPolicyDto });

          break;

        case "MDDatePicker":
          LPolicyDto = set(LPolicyDto, item.path, a);
          setErrorText("");
          setErrorFlag(false);
          setDto({ ...LPolicyDto });

          break;
        case "Gender":
          LPolicyDto = set(LPolicyDto, item.path, a);
          setErrorText("");
          setErrorFlag(false);
          setDto({ ...LPolicyDto });

          break;
        case "MDTimePicker":
          LPolicyDto = set(LPolicyDto, item.path, a);
          setErrorText("");
          setErrorFlag(false);
          setDto({ ...LPolicyDto });

          break;
        case "MDDateTimePicker":
          LPolicyDto = set(LPolicyDto, item.path, a);
          setErrorText("");
          setErrorFlag(false);
          setDto({ ...LPolicyDto });

          break;

        case "RadioGroup":
          LPolicyDto = set(LPolicyDto, item.path, e.target.value);
          setErrorFlag(false);
          setErrorText("");
          setDto({ ...LPolicyDto });

          break;
        case "Checkbox":
          if (e.target.checked) LPolicyDto = set(LPolicyDto, item.path, item.checkedVal);
          else LPolicyDto = set(LPolicyDto, item.path, item.unCheckedVal);
          setErrorFlag(false);
          setErrorText("");
          setDto({ ...LPolicyDto });

          break;

        default:
          console.log("Invalid component");
      }
    }
  };

  const onBlurEvent = (e, a) => {
    if (isFunction(item.customOnBlur)) {
      item.customOnBlur(e, a, setErrorFlag, setErrorText);
    } else {
      switch (item.type) {
        // case "Input1":
        //   if (Array.isArray(item.onBlurFuncs))
        //     item.onBlurFuncs.forEach((fun) => {
        //       if (fun(e.target.value) === true) {
        //         set(LPolicyDto, item.path, e.target.value);
        //         setErrorFlag(false);
        //         setErrorText("");
        //       } else {
        //         set(LPolicyDto, item.path, "");
        //         setErrorFlag(true);
        //         setErrorText(fun(e.target.value));
        //       }
        //     });

        //   break;
        case "Input":
          if (Array.isArray(item.onChangeFuncs)) {
            setErrorFlag(false);
            setErrorText("");
          }
          if (Array.isArray(item.onBlurFuncs) && e.target.value !== "") {
            item.onBlurFuncs.forEach((fun) => {
              const funName = valBlurFunc.filter((x) => x.funName === fun);
              if (funName.length > 0) {
                if (funName[0].fun(e.target.value) === true) {
                  LPolicyDto = set(LPolicyDto, item.path, e.target.value);
                  setErrorFlag(false);
                  setErrorText("");
                } else {
                  if (item.keepValueOnBlur !== true) LPolicyDto = set(LPolicyDto, item.path, "");
                  setErrorFlag(true);
                  setErrorText(funName[0].fun(e.target.value));
                }
              } else if (fun(e.target.value) === true) {
                LPolicyDto = set(LPolicyDto, item.path, e.target.value);
                setErrorFlag(false);
                setErrorText("");
              } else if (e.target.value !== "") {
                if (item.keepValueOnBlur !== true) LPolicyDto = set(LPolicyDto, item.path, "");
                setErrorFlag(true);
                setErrorText(fun(e.target.value));
              }
            });
          }
          if (e.target.value === "") {
            setErrorFlag(false);
            setErrorText("");
          }

          break;

        default:
          console.log("Invalid component");
      }
      setDto({ ...LPolicyDto });
    }
  };

  const onClickMidNextValidation = () => {
    const res1 = onMidNextValidation(item.validationId);
    item.onClick(res1);
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
                onFocus={item.customOnFocus}
                /* eslint-disable react/jsx-no-duplicate-props */

                inputProps={{
                  readOnly: item.disabled || disabledFunction() || item.readOnly,
                  maxLength: item.maxLength,
                  tabIndex: disabledFunction() === true || item.readOnly === true ? -1 : 0,

                  ...item.InputProps,
                }}
                InputProps={{
                  endAdornment: item.endAdornmentIcon && (
                    <InputAdornment position="end">
                      <IconButton disabled>
                        <Icon color="primary">{item.endAdornmentIcon}</Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                  ...item.InputProps,
                }}
                /* eslint-enable react/jsx-no-duplicate-props */

                error={errorFlag}
                placeholder={item.placeholder}
                helperText={errorText || item.helperText}
                required={!item.validationDisableOnProceed && required}
                maxLength={item.maxLength}
                multiline={item.multiline}
                rows={item.rows}
                disabled={disabledFunction()}
                sx={redAsterisk}
                type={item.inputType ? item.inputType : "text"}
              />
            );
          case "InputSeparateLabel":
            return (
              <Grid container spacing={2} pt={1} pb={1}>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                  <MDBox display="flex">
                    <FormLabel
                      variant="body1"
                      sx={{
                        color: "#000000",
                        fontWeight: 400,
                        fontSize: "1rem",
                        alignSelf: "center",
                      }}
                    >
                      {item.label}
                    </FormLabel>
                    {!item.validationDisableOnProceed && required && (
                      <MDTypography color="error" sx={{ fontSize: "0.8rem" }}>
                        *
                      </MDTypography>
                    )}
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    // {...item.validations}
                    label={null}
                    name={item.name}
                    value={value}
                    onChange={(e, a) => onChangeEvent(e, a)}
                    onBlur={(e, a) => onBlurEvent(e, a)}
                    onFocus={item.customOnFocus}
                    /* eslint-disable react/jsx-no-duplicate-props */

                    inputProps={{
                      readOnly: item.disabled || disabledFunction() || item.readOnly,
                      maxLength: item.maxLength,
                      tabIndex: disabledFunction() === true || item.readOnly === true ? -1 : 0,

                      ...item.InputProps,
                    }}
                    InputProps={{
                      endAdornment: item.endAdornmentIcon && (
                        <InputAdornment position="end">
                          <IconButton disabled>
                            <Icon color="primary">{item.endAdornmentIcon}</Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                      ...item.InputProps,
                    }}
                    /* eslint-enable react/jsx-no-duplicate-props */

                    error={errorFlag}
                    placeholder={item.placeholder}
                    helperText={errorText || item.helperText}
                    // required={!item.validationDisableOnProceed && required}
                    maxLength={item.maxLength}
                    multiline={item.multiline}
                    rows={item.rows}
                    disabled={disabledFunction()}
                    sx={redAsterisk}
                    type={item.inputType ? item.inputType : "text"}
                  />{" "}
                </Grid>
              </Grid>
            );

          case "CurrencyInput":
            return (
              <CustomCurrencyInput
                {...item}
                required={!item.validationDisableOnProceed && required}
                value={value}
                sx={redAsterisk}
                error={errorFlag}
                helperText={errorText}
                setErrorFlag={setErrorFlag}
                setErrorText={setErrorText}
                disabled={disabledFunction()}
                onChange={(e, a) => onChangeEvent(e, a)}
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
                  allowInput: disabledFunction() !== true && item.allowInput === true,
                  clickOpens: !disabledFunction(),
                  disableMobile: true,
                  noCalendar: item.noCalendar,
                }}
                input={{
                  label: item.label,
                  value: value1 === null ? "" : value1,
                  error: errorFlag,
                  helperText: errorText,
                  required: !item.validationDisableOnProceed && required,
                  inputProps: {
                    ...item.InputProps,
                    disable: disabledFunction(),
                    tabIndex: disabledFunction() === true || item.readOnly === true ? -1 : 0,
                  },
                  sx: redAsterisk,
                  placeholder: datePlaceHolder(item.altFormat ? item.altFormat : "d-m-Y"),
                  InputLabelProps: { shrink: item.allowInput },
                  readOnly: disabledFunction(),
                }}
                value={value}
                readOnly={disabledFunction()}
                disabled={disabledFunction()}
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
                }}
                value={value}
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
                options={Array.isArray(item.options) ? item.options : []}
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
                value={
                  item.multiple
                    ? value
                    : { [item.optionLabel ? item.optionLabel : "mValue"]: value }
                }
                onChange={(e, a) => onChangeEvent(e, a)}
                label={item.label}
                error={errorFlag}
                helperText={errorText}
                required={!item.validationDisableOnProceed && required}
                readOnly={item.readOnly}
                disabled={disabledFunction()}
                disableCloseOnSelect={item.disableCloseOnSelect}
                disableClearable={item.disableClearable}
                open={item.open}
                onOpen={item.onOpen}
                onClose={item.onClose}
                InputProps={{
                  endAdornment: item.endAdornmentIcon && (
                    <InputAdornment position="end">
                      <IconButton disabled>
                        <Icon color="primary">{item.endAdornmentIcon}</Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                  ...item.InputProps,
                }}
              />
            );

          case "AutoCompleteSeparateLabel":
            return (
              <Grid container spacing={2} pt={1} pb={1}>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                  <MDBox display="flex">
                    <FormLabel
                      variant="body1"
                      sx={{
                        color: "#000000",
                        fontWeight: 400,
                        fontSize: "1rem",
                        alignSelf: "center",
                      }}
                    >
                      {item.label}
                    </FormLabel>
                    {!item.validationDisableOnProceed && required && (
                      <MDTypography color="error" sx={{ fontSize: "0.8rem" }}>
                        *
                      </MDTypography>
                    )}
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDAutocomplete
                    options={Array.isArray(item.options) ? item.options : []}
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
                    value={
                      item.multiple
                        ? value
                        : { [item.optionLabel ? item.optionLabel : "mValue"]: value }
                    }
                    onChange={(e, a) => onChangeEvent(e, a)}
                    label={null}
                    error={errorFlag}
                    helperText={errorText}
                    // required={!item.validationDisableOnProceed && required}
                    readOnly={item.readOnly}
                    placeholder={item.placeholder}
                    disabled={disabledFunction()}
                    disableCloseOnSelect={item.disableCloseOnSelect}
                    disableClearable={item.disableClearable}
                    open={item.open}
                    onOpen={item.onOpen}
                    onClose={item.onClose}
                    InputProps={{
                      endAdornment: item.endAdornmentIcon && (
                        <InputAdornment position="end">
                          <IconButton disabled>
                            <Icon color="primary">{item.endAdornmentIcon}</Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                      ...item.InputProps,
                    }}
                  />
                </Grid>
              </Grid>
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
                  direction={matches ? "row" : "column"}
                  spacing={2}
                  sx={{
                    display: item.justifyContent ? "flex" : "",
                    justifyContent: item.justifyContent ? item.justifyContent : "",
                  }}
                  alignItems="center"
                >
                  <MDBox>
                    {item.radioLabel.labelVisible && (
                      <FormLabel
                        variant="body1"
                        sx={{
                          fontSize: item.radioLabel.fontSize ? item.radioLabel.fontSize : "",
                          fontWeight: item.radioLabel.fontWeight ? item.radioLabel.fontWeight : 400,
                          color: item.radioLabel.color ? item.radioLabel.color : "#000000",
                        }}
                      >
                        {GetTranslate(item.radioLabel.label)}
                      </FormLabel>
                    )}
                  </MDBox>
                  <MDBox sx={{ minWidth: 150 }}>
                    <RadioGroup row value={value} onChange={(e, a) => onChangeEvent(e, a)}>
                      {item.radioDirection === "column" ? (
                        <Stack direction="column">
                          {item.radioList.map((r) => (
                            <FormControlLabel
                              value={r.value}
                              label={GetTranslate(r.label)}
                              control={<Radio disabled={r.disabled || disabledFunction()} />}
                            />
                          ))}
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={0.2}>
                          {item.radioList.map((r) => (
                            <FormControlLabel
                              value={r.value}
                              label={GetTranslate(r.label)}
                              control={<Radio disabled={r.disabled || disabledFunction()} />}
                            />
                          ))}
                        </Stack>
                      )}
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
                autoHeight
                rows={Array.isArray(val) ? val : []}
                columns={
                  Array.isArray(item.columns)
                    ? item.columns.map((x) => ({ ...x, headerName: GetTranslate(x.headerName) }))
                    : []
                }
                getRowId={(option) => option[item.rowId]}
                onRowClick={item.onRowClick}
                pageSize={item.rowPerPage ? item.rowPerPage : 5}
                getRowHeight={() => item.getRowHeight}
                onCellKeyDown={{ handleKeyDown }}
                // rowsPerPageOptions={[item.rowPerPage ? item.rowPerPage : 5, 10, 20, 50, 100]}
                experimentalFeatures={{ newEditingApi: true, columnGrouping: true }}
                components={{ Toolbar: item.GridToolbar ? GridToolbar : false }}
                editField="inEdit"
                checkboxSelection={item.checkboxSelection}
                columnGroupingModel={item.columnGroupingModel}
                onSelectionModelChange={item.onSelectionModelChange}
                disableSelectionOnClick={item.disableSelectionOnClick}
                selectionModel={item.selectionModel}
                sx={{ ...item.sx }}
                hideFooterPagination={item.hideFooterPagination}
                hideFooterSelectedRowCount={item.hideFooterSelectedRowCount}
                isRowSelectable={item.isRowSelectable}
                rowHeight={item.rowHeight ? item.rowHeight : 50}
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
                  onClick={() => (item.onClick ? item.onClick(item.index) : console.log())}
                  component={item.component}
                  color={item.color}
                  disabled={disabledFunction()}
                  sx={{ ...item.sx }}
                >
                  {GetTranslate(item.label)}

                  {item.typeFormat}
                </MDButton>
              </MDBox>
            );

          case "ValidationControl":
            return (
              <NewRenderControl
                item={{
                  ...item,

                  type: item.subType,
                  subType: item.subType ? "ValidationControl" : undefined,
                  onClick: item.onClick ? onClickMidNextValidation : undefined,
                  // customOnChange: item.customOnChange ? onChangeMidNextValidation : undefined,
                }}
                setDto={setDto}
                nextFlag={nextFlag}
                nextCount={nextCount}
                dto={dto}
                onMidNextValidation={onMidNextValidation}
                midNextValidationId={midNextValidationId}
              />
            );

          case "IconButton":
            return (
              <MDBox
                sx={{
                  with: "100%",
                  display: "flex",
                  justifyContent: item.justifyContent,
                }}
              >
                <IconButton
                  onClick={() => item.onClick(item.index)}
                  component={item.component}
                  color={item.color}
                  disabled={disabledFunction()}
                >
                  {typeof item.icon === "string" ? <Icon>{item.icon}</Icon> : item.icon}
                </IconButton>
              </MDBox>
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
                <MDBox display="flex" flexDirection="row" sx={item.sx}>
                  <MDCheckbox
                    onChange={(e, a) => onChangeEvent(e, a)}
                    disabled={disabledFunction()}
                    checked={value === item.checkedVal}
                  />
                  <MDTypography
                    sx={
                      item.textSX
                        ? item.textSX
                        : {
                            fontSize: "1rem",
                            marginTop: "5px",
                            textAlign: "justify",
                            textJustify: "inter-word",
                          }
                    }
                  >
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
                <MDBox sx={{ ...style, ...item?.sx }}>{item.return}</MDBox>
              </Modal>
            );
          case "Mapper1":
            return (
              <Grid container display="flex" spacing={1.5}>
                {value.map((x1, i1) =>
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
                      <NewRenderControl
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
                      />
                    </Grid>
                  ))
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
                          <NewRenderControl item={item2} />
                        </Grid>
                      )
                  )
                )}
              </Grid>
            );
          case "CardButton": {
            return (
              <Card
                sx={{
                  background: value === item.cardValue ? ColorsSetting().primary.main : "#90caf9",
                  "&:hover": { cursor: "pointer" },
                }}
                component="label"
              >
                <MDBox sx={{ width: "100%", minHeight: "100%" }}>
                  <input
                    type="checkbox"
                    hidden
                    onChange={(e) => item.onClick(e.target.checked, item.cardValue)}
                  />
                  <MDBox p={3}>
                    <MDTypography align="center" sx={{ fontSize: "0.8rem" }}>
                      {item.label}
                    </MDTypography>
                  </MDBox>
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
                  position: "sticky",
                  top: "0",
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
                {item.tabs?.map((x, i) => (
                  <Tab
                    value={x.value}
                    disabled={x.disabled}
                    label={GetTranslate(x.label)}
                    component="a"
                    sx={{
                      "&.Mui-selected": {
                        color: item.color ? item.color : "#ffffff",
                        bgcolor: item.backgroundColor ? item.backgroundColor : backgroundColor,
                        transition: "all 1s",
                      },
                      borderRadius: 0,
                      color: x.inactiveColor ? x.inactiveColor : "rgba(105, 105, 116, 0.6)",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      minHeight: "3rem!important",
                      pl: "1rem",
                      justifyContent: item.justifyContent ? item.justifyContent : "center",
                    }}
                    /* eslint-disable no-nested-ternary */
                    icon={
                      x.icon && (
                        <IconButton onClick={(e) => x.onClick(i, e)}>
                          <Icon
                            sx={{
                              color:
                                x.value === item.value
                                  ? item.color
                                    ? item.color
                                    : "#ffffff"
                                  : "rgba(105, 105, 116, 0.6)",
                            }}
                          >
                            {x.icon}
                          </Icon>
                        </IconButton>
                      )
                    }
                    /* eslint-enable no-nested-ternary */
                    iconPosition={x.iconPosition ? x.iconPosition : "end"}
                  >
                    <Divider />
                  </Tab>
                ))}
              </Tabs>
            );
          case "CustomTabs":
            return (
              <Stack direction={item.direction ? item.direction : "row"}>
                {item.tabs.map((x, i) => (
                  <MDBox sx={{ display: "flex", width: item.width || "30%" }}>
                    {i !== 0 && <MDBox sx={{ bgcolor: "#bdbdbd", width: "2px" }} />}
                    <MDBox
                      sx={{
                        width: "100%",
                        bgcolor: x.value === item.value ? ColorsSetting().primary.main : "#F0F6FF",
                        boxShadow: `0px 3px 0px ${
                          x.value === item.value ? ColorsSetting().secondary.main : "#F0F6FF"
                        }`,
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "center",
                        "&:hover": { cursor: "pointer" },
                        transition: "all 1s ease",
                      }}
                      onClick={() => item.onClick(x.value, x)}
                    >
                      <Stack direction="row">
                        {x.startIcon && (
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              x.onStartIconClick(x.value);
                            }}
                          >
                            <Icon
                              sx={{
                                color:
                                  x.value === item.value
                                    ? ColorsSetting().secondary.main
                                    : "rgba(105, 105, 116, 0.7)",
                              }}
                            >
                              {x.startIcon}
                            </Icon>
                          </IconButton>
                        )}
                        <MDTypography
                          variant="h6"
                          p={1}
                          sx={{
                            color: x.value === item.value ? "#ffffff" : "rgba(105, 105, 116, 0.7)",
                            fontWeight: 800,
                            fontFamily: "Roboto",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {x.label}
                        </MDTypography>
                      </Stack>
                      {x.endIcon && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            x.onEndIconClick(x.value);
                          }}
                        >
                          <Icon
                            sx={{
                              color:
                                x.value === item.value
                                  ? ColorsSetting().white.main
                                  : "rgba(105, 105, 116, 0.7)",
                            }}
                          >
                            {x.endIcon}
                          </Icon>
                        </IconButton>
                      )}
                    </MDBox>
                  </MDBox>
                ))}
              </Stack>
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
                {item.buttons.map(
                  (x) =>
                    x.visible === true && (
                      <MDButton
                        onClick={x.onClick}
                        variant={x.variant}
                        color={x.color}
                        disabled={x.disabled}
                        endIcon={x.endIcon && <Icon>{x.endIcon}</Icon>}
                        startIcon={x.startIcon && <Icon>{x.startIcon}</Icon>}
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
            return (
              <Divider
                orientation={item.orientation}
                flexItem={item.flexItem}
                sx={{ ...item.sx }}
              />
            );

          case "Img":
            return (
              <MDBox sx={{ width: "100%", heigh: "100%" }}>
                {" "}
                <MDBox
                  component="img"
                  src={item.src}
                  sx={{ width: "100%", heigh: "100%", ...item.sx }}
                />
              </MDBox>
            );
          case "Gender":
            return (
              <MDBox>
                <ButtonGroup variant="contained" sx={{ margin: "2px" }}>
                  {item.options.map((x) => (
                    <MDButton
                      sx={{ padding: "0.4625rem 0.9rem" }}
                      variant={value === x.text ? "contained" : "outlined"}
                      startIcon={<Icon>{x.icon}</Icon>}
                      onClick={() => onChangeEvent("", x.text)}
                    >
                      {x.text}
                    </MDButton>
                  ))}
                </ButtonGroup>
                {errorFlag && (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>{errorText}</MDTypography>
                )}
              </MDBox>
            );

          case "DynamicTable":
            return (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {Array.isArray(item.columns) &&
                        item.columns.map((x) => <TableCell>{x.label}</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(value) &&
                      value.map((x1) => (
                        <TableRow>
                          {Array.isArray(x1) &&
                            x1.map((x2) => (
                              <TableCell>
                                <MDInput
                                  label=""
                                  value={x2.Answer}
                                  onChange={(e) => onDynamicTableChange(e, x1, x2)}
                                />
                              </TableCell>
                            ))}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
export default NewRenderControl;
