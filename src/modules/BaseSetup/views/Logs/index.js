import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";

import MDBox from "../../../../components/MDBox";
import { postRequest } from "../../../../core/clients/axiosclient";
import MDTypography from "../../../../components/MDTypography";
import MDDatePicker from "../../../../components/MDDatePicker";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import MDDataGrid from "../../../../components/MDDataGrid";
import MDLoader from "../../../../components/MDLoader";

const GetUploadStatus = async (obj) => {
  try {
    const res = await postRequest(`CustomerProvisioning/GetLogs`, obj);

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const LogType = ["RequestLog", "ResponseLog", "Error"];
const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "contollerName", headerName: "contollerName", width: 150 },
  { field: "correlationId", headerName: "correlationId", width: 310 },
  { field: "createdDate", headerName: "createdDate", width: 200 },
  { field: "customerId", headerName: "customerId", width: 100 },
  { field: "data", headerName: "data", width: 200 },
  { field: "details", headerName: "details", width: 200 },
  { field: "envId", headerName: "envId", width: 60 },
  { field: "innerException", headerName: "innerException", width: 200 },
  { field: "ipAddress", headerName: "ipAddress", width: 150 },
  { field: "logType", headerName: "logType", width: 120 },
  { field: "logid", headerName: "logid", width: 310 },
  { field: "methodName", headerName: "methodName", width: 140 },
  { field: "source", headerName: "source", width: 200 },
  { field: "stackTrace", headerName: "stackTrace", width: 200 },
  { field: "traceId", headerName: "traceId", width: 200 },
  { field: "userName", headerName: "userName", width: 200 },
  { field: "message", headerName: "message", width: 200 },
];
export default function Logs() {
  const [loader, setLoader] = useState(false);
  const [rows, setRows] = useState([]);
  const [obj, setObj] = useState({
    id: "0",
    key: "",
    value: "",
    logType: "",
    traceId: "",
    correlationId: "",
    contollerName: "",
    methodName: "",
    userName: "",
    fromDate: "",
    toDate: "",
  });

  const onChange = (e) => {
    obj[e.target.name] = e.target.value;
    setObj({ ...obj });
  };
  const onChange1 = (e, v, name) => {
    obj[name] = v === null ? "" : v;
    setObj({ ...obj });
  };
  const onSearch = async () => {
    setLoader(true);
    const obj1 = { ...obj };
    if (obj1.fromDate !== "") obj1.fromDate = obj.fromDate.concat("T06:56:35.869Z");
    if (obj1.toDate !== "") obj1.toDate = obj.toDate.concat("T06:56:35.869Z");
    await GetUploadStatus(obj1).then((res) => {
      if (res?.data && Array.isArray(res.data)) setRows([...res.data]);
      else setRows([]);
    });
    setLoader(false);
  };
  return (
    <MDBox sx={{ bgcolor: "#ffffff" }} p={2}>
      <MDLoader loader={loader} />
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>Logs</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput label="id" name="id" value={obj.id} onChange={onChange} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            options={LogType}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            getOptionLabel={(option) => option}
            onChange={(e, a) => onChange1(e, a, "logType")}
            renderInput={(params) => <MDInput {...params} label="Charts Name" />}
          />{" "}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput label="traceId" name="traceId" value={obj.traceId} onChange={onChange} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="correlationId"
            name="correlationId"
            value={obj.correlationId}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="contollerName"
            name="contollerName"
            value={obj.contollerName}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="methodName"
            name="methodName"
            value={obj.methodName}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput label="userName" name="userName" value={obj.userName} onChange={onChange} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            fullWidth
            onChange={(e, date) => onChange1(e, date, "fromDate")}
            value={obj.fromDate}
            input={{ value: obj.fromDate, label: "fromDate" }}
            options={{
              dateFormat: "Y-m-d",
              altFormat: "d/m/Y",
              altInput: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            fullWidth
            onChange={(e, date) => onChange1(e, date, "toDate")}
            value={obj.toDate}
            input={{ value: obj.toDate, label: "toDate" }}
            options={{
              dateFormat: "Y-m-d",
              altFormat: "d/m/Y",
              altInput: true,
              minDate: obj.fromDate,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "" }}>
            <MDButton onClick={onSearch}>Search Log</MDButton>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDDataGrid columns={columns} rows={rows} rowID="id" />
        </Grid>
      </Grid>
    </MDBox>
  );
}
