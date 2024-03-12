import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import MDButton from "../../../../../../components/MDButton";

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

function InitialTechApproval() {
  const controlItems = [
    { type: "AutoComplete", label: "Action", visible: true },
    { type: "AutoComplete", label: "Claim Closure Reason", visible: true },
    { type: "Input", label: "Remark", visible: true },
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
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDButton>Submit</MDButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default InitialTechApproval;
