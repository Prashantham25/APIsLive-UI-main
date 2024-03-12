import { React, useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

const padTo2Digits = (num) => num.toString().padStart(2, "0");
const formatDate1 = (date) => {
  // yyyy-mm-ddThh:mm:ss
  if (new Date(date) !== "Invalid Date")
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())]
      .join("-")
      .concat(
        "T",
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(":")
      );
  return false;
};
function RenderControl({ item, ReserveData, setReserveData }) {
  const ReserveDataL = ReserveData;
  const handleDateChange = (e, a) => {
    console.log("e", e, "a", a);

    if (typeof a === "string" && formatDate1(new Date(a))) {
      if (a.length >= 19)
        setReserveData({ ...ReserveDataL, [item.name]: formatDate1(new Date(a)) });
    } else if (formatDate1(new Date(e))) {
      ReserveDataL.ReserveDetails[item.name] = formatDate1(new Date(e));
      setReserveData((prev) => ({ ...prev, ...ReserveDataL }));
    } else setReserveData({ ...ReserveDataL, [item.name]: null });
    console.log("ReserveDataL", ReserveDataL);
  };

  // const ComboValue = [
  //   { mID: 1, mValue: "Option1" },
  //   { mID: 2, mValue: "Option2" },
  // ];

  const handleSetAutoComplete = (e, type, value) => {
    ReserveDataL.ReserveDetails[type] = value.mValue;
    setReserveData({ ...ReserveDataL });
    console.log(value.mValue, type);
  };
  const handlechangeData = (e) => {
    ReserveDataL.ReserveDetails[e.target.name] = e.target.value;
    setReserveData((prev) => ({ ...prev, ...ReserveDataL }));
    console.log("RemaningReserveDataL", ReserveDataL);
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
                value={ReserveDataL.ReserveDetails[item.name]}
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
                  value={ReserveDataL.ReserveDetails[item.name]}
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
                  value={ReserveDataL.ReserveDetails[item.name]}
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
                onChange={(e, value) => handleSetAutoComplete(e, item.name, value)}
                value={{ mValue: ReserveDataL.ReserveDetails[item.name] }}
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

function ReserveDetails() {
  const [ReserveData, setReserveData] = useState(processingData);
  const reserveType = [
    { mID: 1, mValue: "Indenmity" },
    { mID: 2, mValue: "Expense" },
  ];
  const controlItems = [
    {
      type: "AutoComplete",
      label: "Reserve Type",
      visible: true,
      name: "reserveType",
      options: reserveType,
    },
    {
      type: "Input",
      label: "Type of Loss",
      visible: true,
      name: "typeOfLoss",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Default Reserve",
      visible: true,
      name: "defaultReserve",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Current Reserve",
      visible: true,
      name: "currentReserve",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "New Reserve", visible: true, name: "newReserve" },
    {
      type: "Input",
      label: "Differential Reserve",
      visible: true,
      name: "differentialReserve",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Recovery Amount",
      visible: true,
      name: "recoveryAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Default reserve",
      visible: true,
      name: "defaultReserve",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Total Paid",
      visible: true,
      name: "totalPaid",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Remaining reserve",
      visible: true,
      name: "remainingReserve",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Gross incurred",
      visible: true,
      name: "grossIncurred",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "Remark", visible: true, name: "remark" },
    {
      type: "Date",
      label: " Created Date",
      visible: true,
      name: "createdDate",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Created Time",
      visible: true,
      name: "createdTime",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "User Name",
      visible: true,
      name: "userName",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Employee ID",
      visible: true,
      name: "employeeID",
      InputProps: { readOnly: true },
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} ReserveData={ReserveData} setReserveData={setReserveData} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default ReserveDetails;
