const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

const modalStyle = {
  position: "absolute",
  //   top: "50%",
  //   left: "20%",
  //   transform: "translate(-50%, -50%)",
  //   width: 1400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  m: 4,
  display: "flex",
  width: "90%",
  height: "90%",
  overflowY: "auto",
};

const compTypes = [
  "Input",
  "AutoComplete",
  "MDDatePicker",
  "MDTimePicker",
  "MDDateTimePicker",
  "RadioGroup",
  "Checkbox",
  "DataGrid",
  "Button",
  "GroupButton",
  "IconButton",
  "Typography",
  "TypographyVal",
  "Mapper1",
  "Mapper2-Covers",
  "ValidationControl",
  "Tabs",
  "Divider",
  "StaticMerge",
  "Split",
  "Accordions",
];

const onChangeFuncOption = [
  "IsNumeric",
  "IsNumaricSpecial",
  "IsNumaricPercentage",
  "IsAlpha",
  "IsAlphaNum",
  "IsAlphaSpace",
  "IsAlphaNumSpace",
];
const onBlurFuncOption = ["IsGstNo", "IsPan", "IsPassport", "IsMobileNumber", "IsEmail"];

const operator = ["===", "<", ">", "<=", ">=", "!=="];

const dataTypes = ["Integer", "Floating", "String", "Boolean", "Object", "Array"];

const defaultValueFrom = ["value", "environment", "local storage", "context", "today date"];

const httpMethods = ["get", "post", "put"];

const whereToBind = ["variables", "json"];

const bindingType = ["All (mType-mData)", "Individual"];

const requestObj = ["dto", "custom"];

const variants = ["contained", "outlined", "text", "filled", "standard"];

const colors = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "info",
  "white",
  "black",
  "background",
];

const swalIcons = ["success", "error", "warning", "info", "question"];

const booleanDataType = ["True", "False"];

const justifyContent = [
  "center",
  "end",
  "flex-end",
  "flex-start",
  "inherit",
  "initial",
  "left",
  "normal",
  "revert",
  "revert-layer",
  "right",
  "space-around",
  "space-between",
  "space-evenly",
  "start",
  "stretch",
  "unset",
];

const functionType = ["ApiCall", "SetValues", "SetValuesOnCondition", "GenerateNumberArray"];

export {
  autoStyle,
  modalStyle,
  compTypes,
  onChangeFuncOption,
  onBlurFuncOption,
  operator,
  dataTypes,
  defaultValueFrom,
  httpMethods,
  whereToBind,
  requestObj,
  bindingType,
  variants,
  colors,
  swalIcons,
  booleanDataType,
  justifyContent,
  functionType,
};
