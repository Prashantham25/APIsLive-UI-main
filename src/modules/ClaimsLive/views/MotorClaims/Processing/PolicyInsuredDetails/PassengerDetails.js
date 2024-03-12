import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, PassengerData, setPassengerData }) {
  const PassengerDataL = PassengerData;
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
    PassengerDataL.PolicyInsuredDetails.PassengerDetails[e.target.name] = e.target.value;
    setPassengerData((prev) => ({ ...prev, ...PassengerDataL }));
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
                value={PassengerDataL.PolicyInsuredDetails.PassengerDetails[item.name]}
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
          // case "Time":
          //   return (
          //     <LocalizationProvider dateAdapter={AdapterDayjs}>
          //       <TimePicker label="Time" renderInput={(params) => <MDInput {...params} />} />
          //     </LocalizationProvider>
          //   );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function PassengerDetails() {
  const [PassengerData, setPassengerData] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Cumpulsory PA",
      visible: true,
      name: "compulsoryPA",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "PA Passenger",
      visible: true,
      name: "paPassenger",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Legal Liability Driver",
      visible: true,
      name: "legalLiabilityDriver",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Legal Liability  Non Fare  ",
      visible: true,
      name: "legalLiabilityNonFare",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "legal Liability Others",
      visible: true,
      name: "legalLiabilityOthers",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Limit Per Person SI",
      visible: true,
      name: "limitPerPersonSI",
      InputProps: { readOnly: true },
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl
              item={item}
              PassengerData={PassengerData}
              setPassengerData={setPassengerData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default PassengerDetails;
