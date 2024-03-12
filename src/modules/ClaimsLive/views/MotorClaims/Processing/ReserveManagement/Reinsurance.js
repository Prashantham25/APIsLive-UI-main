import { React, useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, ReinsuranceData, setReinsuranceData }) {
  const ReinsuranceDataL = ReinsuranceData;
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
  const handlechangeData = (e) => {
    ReinsuranceDataL.reinsuranceFinancialSummary[e.target.name] = e.target.value;
    setReinsuranceData((prev) => ({ ...prev, ...ReinsuranceDataL }));
    console.log("ReinsuranceDataL", ReinsuranceDataL);
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
                value={ReinsuranceDataL.reinsuranceFinancialSummary[item.name]}
                onChange={handlechangeData}
                InputProps={{ ...item.InputProps }}
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

function Reinsurance() {
  const [ReinsuranceData, setReinsuranceData] = useState(processingData);
  const controlItems = [
    { type: "Input", label: "Gross", visible: true, name: "gross", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Less Insurance/CoInsurance",
      visible: true,
      name: "lessInsuranceCoinsurance",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Net Loss",
      visible: true,
      name: "netLoss",
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl
              item={item}
              ReinsuranceData={ReinsuranceData}
              setReinsuranceData={setReinsuranceData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default Reinsurance;
