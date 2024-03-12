import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import {
  IsAlpha,
  IsAlphaNum,
  IsAlphaSpace,
  IsNumeric,
  NumBetween,
  DateValidation,
} from "../../../../../Common/Validations";

const dataToExcel = (arr, fileName) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws = XLSX.utils.json_to_sheet(arr);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, `${fileName}${fileExtension}`);
};

const valInArray = (val, arr) => arr.includes(val);

const columns = [
  {
    field: "Symbol Number/Tag Number",
    headerName: "Symbol Number/Tag Number",
    width: 200,
  },
  { field: "Purpose of Usage", headerName: "Purpose of Usage", width: 200 },
  { field: "Name of Cattle", headerName: "Name of Cattle", width: 200 },
  { field: "Category", headerName: "Category", width: 200 },
  { field: "Breed/Caste/Variety", headerName: "Breed/Caste/Variety", width: 200 },
  { field: "Farming Type", headerName: "Farming Type", width: 200 },
  { field: "Color", headerName: "Color", width: 200 },
  { field: "Height", headerName: "Height", width: 200 },
  { field: "Weight", headerName: "Weight", width: 200 },
  { field: "Age - Year", headerName: "Age - Year", width: 200 },
  { field: "Age - Month", headerName: "Age - Month", width: 200 },
  { field: "Age - Days", headerName: "Age - Days", width: 200 },
  { field: "Remarks", headerName: "Remarks", width: 200 },
  {
    field: "Current Health Status",
    headerName: "Current Health Status",
    width: 200,
  },
  { field: "SumInsured", headerName: "SumInsured", width: 200 },
  { field: "Rate(%)", headerName: "Rate(%)", width: 200 },
  { field: "Premium Amount", headerName: "Premium Amount", width: 200 },
  { field: "Other Company Tag", headerName: "Other Company Tag", width: 200 },
  { field: "Purchase Date", headerName: "Purchase Date", width: 200 },
  { field: "Purchase Amount", headerName: "Purchase Amount", width: 200 },
];

const ColumnInfo = {
  "Symbol Number/Tag Number": {
    mandatory: true,
    mandatoryErrMes: "(Symbol Number/Tag Number field is Mandatory Field)",
    validationErrMes: "(Symbol Number/Tag Number field Allows only Alpha Numeric data)",
  }, // mandatory
  "Purpose of Usage": {
    mandatory: true,
    mandatoryErrMes: "(Purpose of Usage is Mandatory Field)",
    validationErrMes: "(Purpose of Usage Allows only Alpha Numeric)",
    ValidationFun: IsAlphaNum,
  }, // mandatory
  "Name of Cattle": {
    mandatory: false,
    validationErrMes: "(Name of Cattle Accepts Alphanumeric values only)",
    ValidationFun: IsAlphaNum,
  }, // non mandatory
  Category: {
    mandatory: true,
    mandatoryErrMes: "(Category is Mandatory Field)",
    validationErrMes: `(Category Accept only COW`,
  }, // mandatory
  "Breed/Caste/Variety": {
    mandatory: true,
    mandatoryErrMes: "(Breed/Caste/Variety is Mandatory Field)",
    validationErrMes: "(Breed/Caste/Variety filed Allows only Alpha Numeric)",
  }, // mandatory
  "Farming Type": {
    mandatory: true,
    mandatoryErrMes: "(Farming Type is Mandatory Field)",
    validationErrMes: "(Farming Type fieldAccept only Alpha Numeric)",
  }, // mandatory
  Color: {
    mandatory: false,
    mandatoryErrMes: "",
    validationErrMes: "(Color Accepts alphabets only)",
    ValidationFun: IsAlphaSpace,
  }, // non mandatory
  Height: {
    mandatory: false,
    mandatoryErrMes: "",
    validationErrMes: "(Height Allows only Alpha Numeric)",
  }, // non mandatory
  Weight: {
    mandatory: false,
    mandatoryErrMes: "",
    validationErrMes: "(Weight Allows only Alpha Numeric)",
  }, // non mandatory
  "Age - Year": {
    mandatory: true,
    mandatoryErrMes: "(Age - Year is Mandatory Field)",
    validationErrMes: "(Age - Year Allows only 1-7 Numeric)",
    ValidationFun: (num) => NumBetween(parseInt(num, 10), 1, 7, true),
  }, //  mandatory
  "Age - Month": {
    mandatory: true,
    mandatoryErrMes: "(Age - Month is Mandatory Field)",
    validationErrMes: "(Age - Month Allows only 1-12 Numeric)",
    ValidationFun: (num) => NumBetween(parseInt(num, 10), 1, 12, true),
  }, // mandatory
  "Age - Days": {
    mandatory: true,
    mandatoryErrMes: "(Age - Days is Mandatory Field)",
    validationErrMes: "(Age - Days Allows only 1-31 Numeric)",
    ValidationFun: (num) => NumBetween(parseInt(num, 10), 1, 31, true),
  }, // mandatory
  Remarks: {
    mandatory: false,
    mandatoryErrMes: "",
    validationErrMes: "",
  }, // non mandatory
  "Current Health Status": {
    mandatory: true,
    mandatoryErrMes: "(Current Health Status is Mandatory Field)",
    validationErrMes: "(Current Health Status Allows only Alpha)",
    ValidationFun: IsAlpha,
  }, //  mandatory
  SumInsured: {
    mandatory: true,
    mandatoryErrMes: "(SumInsured is Mandatory Field)",
    validationErrMes: "(SumInsured Allows only Numeric)",
    ValidationFun: IsNumeric,
  }, // mandatory
  "Rate(%)": {
    mandatory: false,
    mandatoryErrMes: "",
    validationErrMes: "",
  },
  "Premium Amount": {
    mandatory: false,
    mandatoryErrMes: "",
    validationErrMes: "",
  },
  "Other Company Tag": {
    mandatory: false,
    mandatoryErrMes: "",
    validationErrMes: "(Other Company Tag Accepts Yes or No Values only)",
    ValidationFun: (val) => valInArray(val, ["Yes", "No"]),
  }, // non mandatory
  "Purchase Date": {
    mandatory: false,
    mandatoryErrMes: "",
    isDateField: true,
    validationErrMes: "(Purchase Date Invalid Date)",
    ValidationFun: DateValidation,
  }, // non mandatory
  "Purchase Amount": {
    mandatory: false,
    mandatoryErrMes: "",
    validationErrMes: "(Purchase Amount Accepts Numeric Value Only)",
    ValidationFun: IsNumeric,
  }, // non mandatory
};

export { columns, ColumnInfo, dataToExcel };
