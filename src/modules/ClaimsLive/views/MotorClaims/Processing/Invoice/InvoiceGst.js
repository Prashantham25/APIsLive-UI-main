import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";

function RenderControl({ item }) {
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    console.log(value.mValue, type);
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return <MDInput label={item.label} />;
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
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, item.label, value)}
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

function InvoiceGstDetails() {
  const controlItems = [
    { type: "Input", label: "Invoice Number", visible: true },
    { type: "Input", label: "Invoice Date", visible: true },
    { type: "AutoComplete", label: "Company GSTIN", visible: true },
    { type: "Input", label: "Company State Code", visible: true },
    { type: "Input", label: "Vender GSTIN No", visible: true },
    { type: "Input", label: "Vender State Code", visible: true },
    { type: "Input", label: "Total Amount Without Tax", visible: true },
    { type: "Input", label: "Total Amount with Tax", visible: true },
    { type: "Input", label: "CGST%", visible: true },
    { type: "Input", label: "IGST%", visible: true },
    { type: "Input", label: "UGST%", visible: true },
    { type: "Input", label: "SGST%", visible: true },
    { type: "Input", label: "CGST Amount", visible: true },
    { type: "Input", label: "IGST Amount", visible: true },
    { type: "Input", label: "UGST Amount", visible: true },
    { type: "Input", label: "SGST Amount", visible: true },
    { type: "Input", label: "Total GST%", visible: true },
    { type: "Input", label: "Total GST Amount", visible: true },
    { type: "Input", label: "Total Payable Amount", visible: true },
  ];
  return (
    <Grid container spacing={1}>
      {controlItems.map(
        (item) =>
          // item.visible && item.type === "space" ? (
          item.type === "space" ? (
            <Grid item xs={12} sm={12} md={0.75} lg={0.75} xl={0.75} xxl={0.75}>
              <RenderControl item={item} />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={2.25} lg={2.25} xl={2.25} xxl={2.25}>
              <RenderControl item={item} />
            </Grid>
          )
        // ) : null
      )}
    </Grid>
  );
}
export default InvoiceGstDetails;
