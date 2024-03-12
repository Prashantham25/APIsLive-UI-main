import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, InvoiceData, setInvoiceData }) {
  const InvoiceDataL = InvoiceData;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const handleSetAutoComplete = (e, type, value) => {
    InvoiceDataL.invoiceInformation[type] = value.mValue;
    setInvoiceData({ ...InvoiceDataL });
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
                options={item.options}
                // groupBy={(option) => option.firstLetter}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                getOptionLabel={(option) => option.mValue}
                value={{ mValue: InvoiceDataL.invoiceInformation[item.name] }}
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
function Invoicedetails() {
  const [InvoiceData, setInvoiceData] = useState(processingData);
  const SPMddl = [
    { mID: 1, mValue: "Surveyor" },
    { mID: 2, mValue: "Investigator" },
  ];
  const SPMnameddl = [
    { mID: 1, mValue: "Manjunath M N" },
    { mID: 2, mValue: "B K Swain" },
  ];
  const controlItems = [
    { type: "AutoComplete", label: "SPM Type", visible: true, name: "spmType", options: SPMddl },
    {
      type: "AutoComplete",
      label: "SPM Name",
      visible: true,
      name: "spmName",
      options: SPMnameddl,
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} InvoiceData={InvoiceData} setInvoiceData={setInvoiceData} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default Invoicedetails;
