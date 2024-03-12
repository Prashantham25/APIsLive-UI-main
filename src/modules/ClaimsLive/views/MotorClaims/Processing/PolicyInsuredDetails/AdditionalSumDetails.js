import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, AdditionalData, setAdditionalData }) {
  const AdditionalDataL = AdditionalData;
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
    AdditionalDataL.PolicyInsuredDetails.AdditionalSumDetails[e.target.name] = e.target.value;
    setAdditionalData((prev) => ({ ...prev, ...AdditionalDataL }));
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
                value={AdditionalDataL.PolicyInsuredDetails.AdditionalSumDetails[item.name]}
                onChange={handlechangeData}
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

function AdditionalSumDetails() {
  const [AdditionalData, setAdditionalData] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Electical accessory code",
      visible: true,
      name: "electricalaccessorycode",
    },
    { type: "Input", label: "Electical SI", visible: true, name: "electricalSI" },
    { type: "Input", label: "Non Electical SI", visible: true, name: "nonElectricalSI" },
    { type: "Input", label: "CNG Flag", visible: true, name: "cNGFlag" },
    { type: "Input", label: "CNG SI", visible: true, name: "cNGSI" },
    { type: "Input", label: "Trailer SI", visible: true, name: "trailerSI" },
    { type: "Input", label: "Reinst TPPD", visible: true, name: "cngSI" },
    { type: "Input", label: "Rests TPPD", visible: true, name: "reinstTPPD" },
    { type: "Input", label: "RTI", visible: true, name: "rTI" },
    { type: "Input", label: "RSA", visible: true, name: "rSA" },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl
              item={item}
              AdditionalData={AdditionalData}
              setAdditionalData={setAdditionalData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default AdditionalSumDetails;
