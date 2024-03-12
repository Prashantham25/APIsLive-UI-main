import { Grid } from "@mui/material";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getRequest, postRequest } from "../../../../core/clients/axiosclient";
import MDBox from "../../../../components/MDBox";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";

function QuotationError() {
  const [obj, setObj] = useState({
    quoteStatus: "",
    quoteNo: "",
    mobileNumber: "",
    email: "",
    customerName: "",
    fromDate: "2023-03-04T05:19:35.864Z",
    toDate: "2023-05-04T05:19:35.864Z",
  });
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "partnerName", headerName: "partnerName", width: 250 },
    { field: "errorCode", headerName: "errorCode", width: 100 },
    { field: "partnerProductCode", headerName: "partnerProductCode", width: 250 },
    { field: "errorText", headerName: "errorText", width: 600 },
  ];

  const onChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const onSearch1 = async () => {
    const res1 = await postRequest(`Quotation/SearchQuotation`, obj);
    console.log("res1", res1);
  };

  const onSearch = async () => {
    const res = await getRequest(`Quotation/GetQuoteICFailureData?QuoteNo=${obj.quoteNo}`);
    const data = res.data.quoteDetails;
    data.forEach((x, i) => {
      data[i].id = i;
    });
    setRows([...data]);
  };

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF" }} p={4}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Quotation Number"
            name="quoteNo"
            value={obj.quoteNo}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Customer Name"
            name="customerName"
            value={obj.customerName}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Quotation Status"
            name="quoteStatus"
            value={obj.quoteStatus}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <MDInput label="Email" name="email" value={obj.email} onChange={onChange} />
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Mobile Number"
            name="mobileNumber"
            value={obj.mobileNumber}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <MDButton onClick={onSearch1}>search1</MDButton>
        </Grid>

        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <MDButton onClick={onSearch}>search</MDButton>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
            editField="inEdit"
            getRowId={(row) => row.id}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default QuotationError;
