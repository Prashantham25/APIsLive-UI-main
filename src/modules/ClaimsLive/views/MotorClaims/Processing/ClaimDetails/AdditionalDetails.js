import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, additionaldata, setadditionaldata }) {
  const [datevalue, setDateValue] = useState("");
  const additionD = additionaldata;
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const handleadditionalchange = (val) => {
    additionD.AdditionalDetails[val.target.name] = val.target.value;
    setadditionaldata((prev) => ({ ...prev, ...additionD }));
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
            return (
              <MDInput
                label={item.label}
                name={item.name}
                value={additionaldata.AdditionalDetails[item.name]}
                onChange={handleadditionalchange}
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

function AdditionalDetails() {
  const [additionaldata, setadditionaldata] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Number Of Passenger",
      visible: true,
      name: "numberOfPassenger",
      InputProps: { readOnly: true },
    },
    { type: "AutoComplete", label: "Purpose Of Travel", visible: true },
    { type: "AutoComplete", label: "Trailer Attached", visible: true },
    {
      type: "Input",
      label: "Registered Laden Weight (KG)",
      visible: true,
      name: "registeredLadenWeight",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Registered UnLaden Weight (KG)",
      visible: true,
      name: "registeredUnLadenWeight",
      InputProps: { readOnly: true },
    },

    {
      type: "Input",
      label: "Weight Of Goods Carried (KG)",
      visible: true,
      name: "weightOfGoodsCarried",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Type Of Goods Carried",
      visible: true,
      name: "typeOfGoodsCarried",
      InputProps: { readOnly: true },
    },
    { type: "AutoComplete", label: "Nature Of Goods Carried", visible: true },
    {
      type: "Input",
      label: "Registered Passenger Carrying Capacity",
      visible: true,
      name: "registeredPassengerCarryingCapacity",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Passengers Carried",
      visible: true,
      name: "passengersCarried",
      InputProps: { readOnly: true },
    },
    { type: "AutoComplete", label: "Nature Of Permit", visible: true },
    { type: "AutoComplete", label: "Type Of Permit", visible: true },
    {
      type: "Input",
      label: "Permit Number",
      visible: true,
      name: "permitNumber",
      InputProps: { readOnly: true },
    },
    { type: "AutoComplete", label: "Permit Valid For Areas", visible: true },
    { type: "Date", label: "Permit Valid From", visible: true },
    { type: "Date", label: "Permit Valid Up To", visible: true },
    { type: "Date", label: "Fitness Valid Up To", visible: true },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl
              item={item}
              additionaldata={additionaldata}
              setadditionaldata={setadditionaldata}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}
export default AdditionalDetails;
