import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, driverdata, setdriverdata }) {
  console.log("item...", item.options);
  const [datevalue, setDateValue] = useState("");
  const driverD = driverdata;
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  const handledriverchange = (e) => {
    driverD.driverDetails[e.target.name] = e.target.value;
    setdriverdata((prev) => ({ ...prev, ...driverD }));
  };

  // const ComboValue = [
  //   { mID: 1, mValue: "Yes" },
  //   { mID: 2, mValue: "No" },
  // ];

  const handleSetAutoComplete = (e, type, value) => {
    driverD.driverDetails[type] = value.mValue;
    setdriverdata({ ...driverD });
    console.log("driverD", driverD);
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
                value={driverdata.driverDetails[item.name]}
                onChange={handledriverchange}
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
                options={item.options}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={{ mValue: driverD.driverDetails[item.name] }}
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

function DriverDetails() {
  const [driverdata, setdriverdata] = useState(processingData);
  const gender = [
    { mID: 1, mValue: "Male" },
    { mID: 2, mValue: "Female" },
  ];
  const isvalue = [
    { mID: 1, mValue: "Yes" },
    { mID: 2, mValue: "No" },
  ];
  const controlItems = [
    {
      type: "AutoComplete",
      label: "Is Vehicle Parked?",
      visible: true,
      name: "isVehicleParked",
      options: isvalue,
    },
    {
      type: "AutoComplete",
      label: "Is Vehicle Parked in Authorized Parking?",
      visible: true,
      name: "isVehicleParkedInAuthorizedParking",
      options: isvalue,
    },
    { type: "Input", label: "Driver's Name", visible: true, name: "driverName" },
    {
      type: "AutoComplete",
      label: "Driver gender",
      visible: true,
      name: "driverGender",
      options: gender,
    },
    {
      type: "Input",
      label: "Driver's License No",
      visible: true,
      name: "driverLicenseNo",
      InputProps: { readOnly: true },
    },
    { type: "Date", label: "License Issue Date", visible: true, InputProps: { readOnly: true } },
    { type: "Date", label: "License Expire Date", visible: true, InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Issuing RTO",
      visible: true,
      name: "issuingRto",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Driver's Father Name",
      visible: true,
      name: "driverFatherName",
      InputProps: { readOnly: true },
    },
    { type: "Date", label: "Driver DOB", visible: true, InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Driver Age",
      visible: true,
      name: "driverAge",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Driving Experience",
      visible: true,
      name: "drivingExperience",
      InputProps: { readOnly: true },
    },
    {
      type: "AutoComplete",
      label: "Driver Relationsip with Insured",
      visible: true,
      name: "driverRelationsipWithInsured",
      options: isvalue,
    },
    {
      type: "AutoComplete",
      label: "Driver authorized to drive",
      visible: true,
      name: "driverAuthorizedToDrive",
      options: isvalue,
    },
    {
      type: "AutoComplete",
      label: "Keys Availablity",
      visible: true,
      name: "keysAvailablity",
      options: isvalue,
    },
    {
      type: "AutoComplete",
      label: "Is Vehicle Locked ?",
      visible: true,
      name: "isVehicleLocked",
      options: isvalue,
    },
    {
      type: "AutoComplete",
      label: "Driver's License",
      visible: true,
      name: "driverLicense",
      options: isvalue,
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} driverdata={driverdata} setdriverdata={setdriverdata} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}
export default DriverDetails;
