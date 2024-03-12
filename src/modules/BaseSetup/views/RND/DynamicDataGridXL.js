// import Dropzone from "react-dropzone-uploader";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import "react-dropzone-uploader/dist/styles.css";
import { read, utils } from "xlsx";
import { NumBetween } from "../../../../Common/Validations";
import MDButton from "../../../../components/MDButton";

function DynamicDataGridXL() {
  const ratingJson = {
    rates: [
      { FromAge: 1, ToAge: 5, rate: 0.1 },
      { FromAge: 6, ToAge: 10, rate: 0.2 },
      { FromAge: 11, ToAge: 15, rate: 0.3 },
      { FromAge: 16, ToAge: 20, rate: 0.4 },
      { FromAge: 21, ToAge: 25, rate: 0.5 },
      { FromAge: 26, ToAge: 30, rate: 0.6 },
    ],
  };
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const onUploadArr = async (files) => {
    const fileReader = await new FileReader();
    fileReader.readAsArrayBuffer(files.target.files[0]);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = utils.sheet_to_json(ws);
      console.log("data", data);

      const c1 = [];
      Object.keys(data[0]).forEach((x1) => {
        c1.push({ field: x1, headerName: x1, width: 200 });
      });
      c1.push({ field: "Premium", headerName: "Premium", width: 200 });
      setColumns([...c1]);

      data.forEach((x1, i1) => {
        ratingJson.rates.forEach((x2) => {
          if (NumBetween(x1.Age, x2.FromAge, x2.ToAge, true)) data[i1].Premium = x2.rate * x1.SI;
        });
      });
      setRows([...data]);
    };
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDButton variant="outlined" component="label">
          Upload Page
          <input hidden type="file" onChange={onUploadArr} />
        </MDButton>
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Dropzone
          maxFiles={1}
          //   onChangeStatus={handleChangeStatus}
          onSubmit={onUploadArr}
          inputContent="Drop A File"
          styles={{
            dropzone: { height: 300 },
            dropzoneActive: { borderColor: "green" },
          }}
          accept=""
        />
      </Grid>{" "} */}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          getRowId={(option) => option.SNo}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: GridToolbar }}
          editField="inEdit"
        />
      </Grid>
    </Grid>
  );
}
export default DynamicDataGridXL;
