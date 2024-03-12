import { useState } from "react";
import { Grid, Stack, Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { read, utils } from "xlsx";
import swal from "sweetalert";

// import { IsNumeric } from "../../../../../Common/Validations";
import { columns, ColumnInfo, dataToExcel } from "./data";
import MDTypography from "../../../../../components/MDTypography";
import MDDataGrid from "../../../../../components/MDDataGrid";
import MDButton from "../../../../../components/MDButton";
// import GenericBulkUploadValidation from "./GenericBulkUploadValidation";
import GenericBulkUploadValidation from "../../../../../Common/GenericBulkUploadValidation";

export default function NepalBPCBulkUpload() {
  const [SuccessRec, setSuccessRec] = useState([]);
  const [FailureRec, setFailureRec] = useState([]);
  const idColumn = "Symbol Number/Tag Number";

  // const onUploadDoc = async (files) => {
  //   console.log(files, 433434);
  //   const file = files;
  //   const fileReader = new FileReader();
  //   fileReader.readAsArrayBuffer(files.target.files[0]);

  //   fileReader.onload = (e) => {
  //     const bufferArray = e.target.result;
  //     const wb = read(bufferArray, { type: "buffer" });
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     let data = [...SuccessRec];
  //     data = [...data, ...utils.sheet_to_json(ws)];
  //     console.log("inputData", data, wb, wsname, ws);
  //     // columns name in string format
  //     const inputColumnNames = [];
  //     Object.keys(ws).forEach((x1) => {
  //       ExcelColumID.forEach((x2) => {
  //         if (x1 === x2) inputColumnNames.push(ws[x1].v);
  //       });
  //     });
  //     console.log("columnsName", inputColumnNames);

  //     const columnsName = columns.map((x) => x.field);

  //     const sArr = [];
  //     const fArr = [];
  //     const arrangedData = [];
  //     console.log("data", data);
  //     if (data.length > 0) {
  //       data.forEach((x1) => {
  //         let obj1 = {};
  //         columnsName.forEach((x2) => {
  //           if (x1[x2]) obj1 = { ...obj1, [x2]: x1[x2] };
  //           else {
  //             obj1 = { ...obj1, [x2]: " " };
  //           }
  //         });
  //         arrangedData.push(obj1);
  //       });
  //     }
  //     console.log("arrangedData", arrangedData);

  //     arrangedData.forEach((x1, i1) => {
  //       Object.keys(ColumnInfo).forEach((x2) => {
  //         if (
  //           ColumnInfo[x2].isDateField &&
  //           ColumnInfo[x2].isDateField === true &&
  //           IsNumeric(x1[x2]) &&
  //           x1[x2].toString().length === 5
  //         ) {
  //           const dd1 = ExcelDateToJSDate(arrangedData[i1][x2], "m/d/y");

  //           arrangedData[i1][x2] = dd1;
  //         }
  //       });
  //     });

  //     // separating failure record
  //     arrangedData.forEach((x1, i1) => {
  //       let unique = true;
  //       let manFlg = false;
  //       const man = [];

  //       arrangedData.forEach((x2, i2) => {
  //         if (i1 !== i2 && x1[idColumn] === x2[idColumn]) unique = false;
  //       });
  //       if (unique === false) {
  //         man.push("(Duplicate Record)");
  //       }

  //       Object.keys(ColumnInfo).forEach((x2) => {
  //         if (ColumnInfo[x2].mandatory === true && x1[x2] === " ") {
  //           manFlg = true;
  //           man.push(ColumnInfo[x2].mandatoryText);
  //         }
  //         if (
  //           x1[x2] !== "" &&
  //           x1[x2] !== " " &&
  //           ColumnInfo[x2].ErrTextFun &&
  //           ColumnInfo[x2].ErrTextFun(x1[x2]) !== true
  //         ) {
  //           manFlg = true;
  //           man.push(ColumnInfo[x2].ErrorText);
  //         }
  //       });

  //       if (manFlg || !unique) fArr.push({ ...x1, ErrorStatus: man.join("-") });
  //       else sArr.push(x1);
  //     });
  //     console.log("sArr", sArr, fArr);

  //     // adding id key to maintain uniq record
  //     sArr.forEach((x, i) => {
  //       sArr[i].id = i;
  //     });
  //     // adding id key to maintain uniq record
  //     fArr.forEach((x, i) => {
  //       fArr[i].id = i;
  //     });
  //     setSuccessRec([...sArr]);
  //     setFailureRec([...fArr]);
  //   };

  //   const inputElement = document.getElementById("fileInput");
  //   if (inputElement) {
  //     console.log(1212, inputElement);
  //     inputElement.value = "";
  //   }
  //   file.target.value = "";
  // };

  const onClear = () => {
    setSuccessRec([]);
    setFailureRec([]);
  };

  const onDownloadErrRecord = () => {
    FailureRec.forEach((x, i) => {
      delete FailureRec[i].id;
    });
    dataToExcel(FailureRec, "ErrRecords");
  };

  const onUploadDoc1 = async (files1) => {
    const files = files1;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(files.target.files[0]);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws);
      const excelData = [...SuccessRec, ...data];
      const obj1 = {
        RowId: idColumn,
        ColumnInfo: { ...ColumnInfo },
        ExcelData: excelData,
        WorkSheetObject: ws,
      };
      const res = GenericBulkUploadValidation(obj1);
      if (res.status === 1) {
        swal({ icon: "error", text: res.statusMessage });
      } else if (res.status === 2) {
        swal({ icon: "warning", text: res.statusMessage });
      } else if (res.status === 3) {
        res.successRecord.forEach((x, i) => {
          res.successRecord[i].id = i;
        });
        res.failureRecord.forEach((x, i) => {
          res.failureRecord[i].id = i;
        });
        setSuccessRec([...res.successRecord]);
        setFailureRec([...res.failureRecord]);
      }
    };
    const inputElement = document.getElementById("fileInput");
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    files.target.value = "";
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack spacing={2} direction="row">
          <MDButton variant="outlined" component="label">
            Generic Upload Excel
            <input hidden id="fileInput" accept=".xlsx" type="file" onChange={onUploadDoc1} />
          </MDButton>
          <MDButton color="error" onClick={onDownloadErrRecord}>
            Download Error Excel
          </MDButton>
          <MDButton onClick={onClear}>Clear All</MDButton>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography>Success record</MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDDataGrid columns={columns} rows={SuccessRec} rowID="id" />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography>Failure record</MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDDataGrid
          columns={[
            ...columns,
            {
              field: "ErrorStatus",
              headerName: "ErrorStatus",
              width: 200,
              renderCell: (p) => {
                console.log(123);
                return (
                  <Tooltip title={p.row.ErrorStatus} placement="left">
                    <RemoveRedEyeIcon />
                  </Tooltip>
                );
              },
            },
          ]}
          rows={FailureRec}
          rowID="id"
        />
      </Grid>
    </Grid>
  );
}
