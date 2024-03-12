import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, CoveragesData, setCoveragesData }) {
  const CoveragesDataL = CoveragesData;
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
    CoveragesDataL.PolicyInsuredDetails.Coverages[e.target.name] = e.target.value;
    setCoveragesData((prev) => ({ ...prev, ...CoveragesDataL }));
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
                value={CoveragesDataL.PolicyInsuredDetails.Coverages[item.name]}
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

function Coverages() {
  const [CoveragesData, setCoveragesData] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Geographical Area",
      visible: true,
      name: "geographicalArea",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Own Premises",
      visible: true,
      name: "ownPremises",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Fiber Glass Tank",
      visible: true,
      name: "fiberGlassTank",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Handicapped Discount    ",
      visible: true,
      name: "handicappedDiscount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Driving Tuition",
      visible: true,
      name: "drivingTuition",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Embassy",
      visible: true,
      name: "embassy",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Anti Theft",
      visible: true,
      name: "antiTheft",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Side Car",
      visible: true,
      name: "sideCar",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "IMT 23",
      visible: true,
      name: "iMT23",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Rally/TRL",
      visible: true,
      name: "rallyTRL",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Special Rally",
      visible: true,
      name: "specialRally",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Vintage",
      visible: true,
      name: "vintage",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "AAI", visible: true, name: "aAI", InputProps: { readOnly: true } },
    { type: "Input", label: "Expy", visible: true, name: "expy", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Over Turning",
      visible: true,
      name: "overTurning",
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
              CoveragesData={CoveragesData}
              setCoveragesData={setCoveragesData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default Coverages;
