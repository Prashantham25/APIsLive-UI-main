import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, RiData, setRiData }) {
  const RiDataL = RiData;
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
    RiDataL.PolicyInsuredDetails.RIDetails[e.target.name] = e.target.value;
    setRiData((prev) => ({ ...prev, ...RiDataL }));
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
                value={RiDataL.PolicyInsuredDetails.RIDetails[item.name]}
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

function RiDetails() {
  const [RiData, setRiData] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: " Account Number",
      visible: true,
      name: "accountNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: " Account Name",
      visible: true,
      name: "accountName",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Reinsurance Indicator",
      visible: true,
      name: "reinsuranceIndicator",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Reinsurance Type",
      visible: true,
      name: "reinsuranceType",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Percentage/Deductible",
      visible: true,
      name: "percentageDeductible",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Upper Limit",
      visible: true,
      name: "upperLimit",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Balance O/S",
      visible: true,
      name: "balanceOS",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "Paid", visible: true, name: "paid", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: " RI Claim Reference No",
      visible: true,
      name: "rIClaimReferenceNo",
      InputProps: { readOnly: true },
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} RiData={RiData} setRiData={setRiData} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default RiDetails;
