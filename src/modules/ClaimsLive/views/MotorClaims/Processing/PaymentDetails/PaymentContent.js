import { useState } from "react";
import { Autocomplete, Grid, Stack, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
import { processingData } from "../data/JsonData";

function RenderControl({ item, paydata, setpaydata }) {
  const [datevalue, setDateValue] = useState("");
  const payD = paydata;
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];
  const handledatachange = (e) => {
    payD.PaymentDetails[e.target.name] = e.target.value;
    setpaydata((prev) => ({ ...prev, ...payD }));
  };

  const handleSetAutoComplete = (e, type, value) => {
    payD.PaymentDetails[type] = value.mValue;
    setpaydata({ ...payD });
    console.log("payD", payD);
    console.log(value.mValue, type);
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                label={item.label}
                name={item.name}
                value={payD.PaymentDetails[item.name]}
                onChange={handledatachange}
              />
            );
          case "DateTime":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy hh:mm:ss a"
                  value={datevalue}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "Date":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy"
                  value={datevalue}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "RadioGroup":
            return (
              <Grid>
                {item.radioLabel.labelVisible && (
                  <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mb: 2 }}>
                    {item.radioLabel.label}
                  </MDTypography>
                )}
                <Stack direction="row" spacing={2}>
                  <RadioGroup row>
                    {item.radioList.map((rlist) => (
                      <FormControlLabel
                        key={rlist.value}
                        value={rlist.value}
                        label={rlist.label}
                        control={<Radio />}
                      />
                    ))}
                  </RadioGroup>
                </Stack>
              </Grid>
            );
          case "AutoComplete":
            return (
              <Autocomplete
                // id="Salutation"
                options={ComboValue}
                // groupBy={(option) => option.firstLetter}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={{ mValue: payD.PaymentDetails[item.name] }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, item.name, value)}
                renderInput={(params) => <MDInput {...params} label={item.label} />}
              />
            );

          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function PaymentContent() {
  const [paydata, setpaydata] = useState(processingData);
  const controlItems = [
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { label: "Bank Type", labelVisible: true },
      radioList: [
        { value: "NationalBank", label: "National Bank" },
        { value: "LocalBank", label: "Local Bank" },
      ],
    },
    { type: "AutoComplete", label: "Reserve Type", visible: true, name: "reserveType" },
    { type: "AutoComplete", label: "Payee Type", visible: true, name: "payeeType" },
    { type: "AutoComplete", label: "Payee Name", visible: true, name: "payeeName" },
    { type: "AutoComplete", label: "Invoice Number", visible: true, name: "invoiceNumber" },
    { type: "AutoComplete", label: "Payment Type", visible: true, name: "paymentType" },
    { type: "AutoComplete", label: "Payment Mode", visible: true, name: "paymentMode" },
    { type: "AutoComplete", label: "Dispatch to", visible: true, name: "dispatchTo" },
    {
      type: "AutoComplete",
      label: "Payment description",
      visible: true,
      name: "paymentDescription",
    },
    { type: "AutoComplete", label: "Currency", visible: true, name: "currency" },
    { type: "Input", label: "Assessed Amount (INR) A", visible: true, name: "assessedAmountINRA" },
    { type: "Input", label: "CGST - B", visible: true, name: "CGSTB" },
    { type: "Input", label: "SGST - C    ", visible: true, name: "SGSTC" },
    { type: "Input", label: "IGST - D", visible: true, name: "IGSTD" },
    { type: "Input", label: "UGST - E", visible: true, name: "UGSTE" },
    { type: "Input", label: "TDS - F", visible: true, name: "TDSF" },
    {
      type: "Input",
      label: "Final payable amount - G",
      visible: true,
      name: "finalPayableAmountG",
    },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { label: "Priority payment", labelVisible: true },
      radioList: [
        { value: "priorityyes", label: "Yes" },
        { value: "priorityno", label: "No" },
      ],
    },
    { type: "Input", label: "Payment created by", visible: true, name: "paymentCreatedBy" },
    { type: "Input", label: "LTDS Balance", visible: true, name: "ltdsBalance" },
  ];

  const columns = [
    {
      field: "paymentreferencenumber",
      headerName: "Payment reference number",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "banktype",
      headerName: "	Bank Type",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "reservetype",
      headerName: "  	Reserve type",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "payeetype",
      headerName: "Payee type",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "modeofpayment",
      headerName: "	  Mode of payment	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "paymentdescription",
      headerName: "	Payment description  ",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "dispatchto",
      headerName: "	  Dispatch To",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "intrestamt",
      headerName: "	  	Interest Amount",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "assessedamt",
      headerName: "	  Assessed Amount (INR) A",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "cgst",
      headerName: "	 CGST - B ",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "sgst",
      headerName: "SGST - C",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "igst",
      headerName: "IGST - D",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "ugst",
      headerName: "UGST - E	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "tds",
      headerName: "TDS - F",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "finalg",
      headerName: "Final payable amount - G	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "ltds",
      headerName: "LTDS Balance",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "reversalnumber",
      headerName: "	Payment reversal number	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "reversedby",
      headerName: "Reversed by",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "reversaldate",
      headerName: "	Payment reversal date	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "reversalreason",
      headerName: "Payment reversal reason",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "transactionnumber",
      headerName: "Transaction number",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "transactiondate",
      headerName: "Transaction date	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "paymentcreateddate",
      headerName: "PaymentCreatedDate	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "paymentproceseeddate",
      headerName: "	Payment processed date	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "holdpayment",
      headerName: "	Hold Payment",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "holdremarks",
      headerName: "	 Hold Remarks	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "reissuepayment",
      headerName: "		Reissue Payment",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "reissueremarks",
      headerName: "	Reissue Remarks	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "phexcessflag",
      headerName: "	Phexcessflag	",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "	Action",
      width: 270,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];
  const rows = [{ id: 1 }];

  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} paydata={paydata} setpaydata={setpaydata} />
          </Grid>
        ) : null
      )}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" justifyContent="center">
          <MDButton sx={{ mt: 3 }}>ADD PAYEE</MDButton>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            mt: 3,

            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#64b5f6",
            },
          }}
        >
          <DataGrid
            autoHeight
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" justifyContent="center">
          <MDButton sx={{ mt: 3 }}>SUBMIT</MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default PaymentContent;
