import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, settlementdata, setsettlementdata }) {
  const settlementD = settlementdata;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];
  const handlechange = (e) => {
    settlementD.Claimsettlement[e.target.name] = e.target.value;
    setsettlementdata((prev) => ({ ...prev, ...settlementD }));
    console.log("settlementD", settlementD);
  };

  const handleSetAutoComplete = (e, type, value) => {
    settlementD.Claimsettlement[type] = value.mValue;
    setsettlementdata({ ...settlementD });
    console.log("settlementD", settlementD);
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
                value={settlementdata.Claimsettlement[item.name]}
                onChange={handlechange}
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
                value={{ mValue: settlementD.Claimsettlement[item.name] }}
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
function Decision() {
  const [settlementdata, setsettlementdata] = useState(processingData);
  const controlItems = [
    { type: "AutoComplete", label: "Action", visible: true, name: "action" },
    {
      type: "AutoComplete",
      label: "Claim Repudiation Reason",
      visible: true,
      name: "claimReturnReason",
    },
    { type: "Input", label: "Remark", visible: true, name: "remark" },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl
              item={item}
              settlementdata={settlementdata}
              setsettlementdata={setsettlementdata}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default Decision;
