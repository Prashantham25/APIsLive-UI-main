import { IsNumeric } from "../Validations";

const ExcelColumID = [
  "A1",
  "B1",
  "C1",
  "D1",
  "E1",
  "F1",
  "G1",
  "H1",
  "I1",
  "J1",
  "K1",
  "L1",
  "M1",
  "N1",
  "O1",
  "P1",
  "Q1",
  "R1",
  "S1",
  "T1",
  "U1",
  "V1",
  "W1",
  "X1",
  "Y1",
  "Z1",
];

const headerValidation = (columnsList, excelColumnsList) => {
  let validationStatus = false;
  let excelColumnsListCount = 0;
  columnsList.forEach((x1) => {
    excelColumnsList.forEach((x2) => {
      if (x1 === x2) excelColumnsListCount += 1;
    });
  });
  if (
    excelColumnsListCount === columnsList.length &&
    columnsList.length === excelColumnsList.length
  )
    validationStatus = true;
  return validationStatus;
};

// const ExcelDateToJSDate = (serial, toFormat) => {
//   const utcDays = Math.floor(serial - 25569);
//   const utcValue = utcDays * 86400;
//   const dateInfo = new Date(utcValue * 1000);
//   return DateFormatFromDateObject(dateInfo, toFormat);
// };
function ExcelDateToJSDate(serial) {
  const date = new Date((serial - 1) * 24 * 3600 * 1000 + Date.UTC(1900, 0, 1));
  const options = { day: "2-digit", month: "short", year: "2-digit" };
  console.log(date.toLocaleDateString("en-IN", options));
  return date.toLocaleDateString("en-IN", options);
}

const GenericBulkUploadValidation = (data) => {
  console.log("data", data);
  const obj = {
    status: 0,
    statusMessage: "",
    successRecord: [],
    failureRecord: [],
    noOfRecordsUploaded: 0,
    successRecordCount: 0,
    failureRecordCount: 0,
  };
  const rowId = data.RowId;
  const excelData = data.ExcelData;
  //   const excelData = utils.sheet_to_json(data.WorkSheetObject);
  const columnInfo = data.ColumnInfo;
  const workSheetObject = data.WorkSheetObject;
  const columnsName = Object.keys(columnInfo);
  const inputColumnNames = [];
  console.log(workSheetObject, 43);
  Object.keys(workSheetObject).forEach((x1) => {
    ExcelColumID.forEach((x2) => {
      if (x1 === x2) inputColumnNames.push(workSheetObject[x1].v);
    });
  });
  console.log(inputColumnNames, 431);

  const res1 = headerValidation(Object.keys(columnInfo), inputColumnNames);
  if (res1 === false) {
    obj.status = 1;
    obj.statusMessage = "Invalid header Data";
  } else if (Array.isArray(excelData) && excelData.length === 0) {
    obj.status = 2;
    obj.statusMessage = "No record found";
  } else {
    const arrangedData = [];
    // arrange the missing data in order of columns
    excelData.forEach((x1) => {
      let obj1 = {};
      columnsName.forEach((x2) => {
        // if (x1[x2]||x1[x2]) obj1 = { ...obj1, [x2]: x1[x2] };
        // else {
        //   obj1 = { ...obj1, [x2]: " " };
        // }
        obj1 = x1[x2] !== undefined ? { ...obj1, [x2]: x1[x2] } : { ...obj1, [x2]: " " };
      });
      arrangedData.push(obj1);
    });
    if (rowId === "row_id") {
      arrangedData.forEach((x, i) => {
        if (x.row_id === undefined) {
          arrangedData[i].row_id = i;
        }
      });
    }
    // convert excel date sequence to not=rmal date string if it 'isDateField' is 'true'
    arrangedData.forEach((x1, i1) => {
      Object.keys(columnInfo).forEach((x2) => {
        if (
          columnInfo[x2].isDateField &&
          columnInfo[x2].isDateField === true &&
          IsNumeric(x1[x2]) &&
          x1[x2].toString().length === 5
        ) {
          const dd1 = ExcelDateToJSDate(arrangedData[i1][x2]);

          arrangedData[i1][x2] = dd1;
        }
      });
    });

    console.log("arrangedData", arrangedData);
    // separating failure record
    arrangedData.forEach((x1, i1) => {
      let unique = true;
      let manFlg = false;
      const man = [];
      arrangedData.forEach((x2, i2) => {
        if (i1 !== i2 && x1[rowId] === x2[rowId]) unique = false;
      });
      if (unique === false) {
        man.push(`(${rowId} should be unique value )`);
      }

      Object.keys(columnInfo).forEach((x2) => {
        if (columnInfo[x2].mandatory === true && x1[x2] === " ") {
          manFlg = true;
          man.push(columnInfo[x2].mandatoryErrMes);
        }
        if (
          x1[x2] !== "" &&
          x1[x2] !== " " &&
          columnInfo[x2].ValidationFun &&
          columnInfo[x2].ValidationFun(x1[x2], x1) !== true
        ) {
          manFlg = true;
          man.push(columnInfo[x2].validationErrMes(x1[x2], x1));
          if (data.ClearErrorData === true) {
            arrangedData[i1][x2] = " ";
          }
        }
      });

      if (manFlg || !unique)
        obj.failureRecord.push({ ...arrangedData[i1], ErrorStatus: man.join("-") });
      else obj.successRecord.push(x1);
    });

    obj.noOfRecordsUploaded = excelData.length;
    obj.successRecordCount = obj.successRecord.length;
    obj.failureRecordCount = obj.failureRecord.length;
    obj.status = 3;
    obj.statusMessage = "data processing success";
  }

  return obj;
};

export default GenericBulkUploadValidation;
