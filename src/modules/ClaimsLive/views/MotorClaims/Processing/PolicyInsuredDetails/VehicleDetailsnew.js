import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
function RenderControl({ item, VehicleData, setVehicleData }) {
  const VehicleDataL = VehicleData;
  const handleDateChange = (e, a) => {
    console.log("e", e, "a", a);

    if (typeof a === "string" && formatDate1(new Date(a))) {
      if (a.length >= 19)
        setVehicleData({ ...VehicleDataL, [item.name]: formatDate1(new Date(a)) });
    } else if (formatDate1(new Date(e))) {
      VehicleDataL.PolicyInsuredDetails.VehicalDetails[item.name] = formatDate1(new Date(e));
      setVehicleData((prev) => ({ ...prev, ...VehicleDataL }));
    } else setVehicleData({ ...VehicleDataL, [item.name]: null });
    console.log("VehicleDataL", VehicleDataL);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    console.log(value.mValue, type);
  };

  const handlechangeData = (e) => {
    VehicleDataL.PolicyInsuredDetails.VehicalDetails[e.target.name] = e.target.value;
    setVehicleData((prev) => ({ ...prev, ...VehicleDataL }));
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
                value={VehicleDataL.PolicyInsuredDetails.VehicalDetails[item.name]}
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
                  value={VehicleDataL.PolicyInsuredDetails.VehicalDetails[item.name]}
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
                  value={VehicleDataL.PolicyInsuredDetails.VehicalDetails[item.name]}
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

function VehicleDetailsnew() {
  const [VehicleData, setVehicleData] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Vehical Registration No",
      visible: true,
      name: "vehicleRegistrationNo",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "RTO City",
      visible: true,
      name: "rtoCity",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Vehicle Class",
      visible: true,
      name: "vehicleClass",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Vehicle Make",
      visible: true,
      name: "vehicleMake",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Vehicle Model",
      visible: true,
      name: "vehicleModel",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Manufacturing Year",
      visible: true,
      name: "manufacturingYear",
      InputProps: { readOnly: true },
    },
    {
      type: "Date",
      label: "Purchase Date",
      visible: true,
      name: "purchaseDate",
      InputProps: { readOnly: true },
    },
    {
      type: "Date",
      label: "Registration Date ",
      visible: true,
      name: "registrationDate",
      InputProps: { readOnly: true },
    },

    {
      type: "Input",
      label: "Engine Number",
      visible: true,
      name: "engineNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Chasis Number",
      visible: true,
      name: "chasisNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Seating Capacity ",
      visible: true,
      name: "seatingCapacity",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "CC", visible: true, name: "CC", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Body Type",
      visible: true,
      name: "bodyType",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Fuel Type  ",
      visible: true,
      name: "fuelType",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Gross Vehical Weight",
      visible: true,
      name: "grossVehicleWeight",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Carrying Capacity",
      visible: true,
      name: "carryingCapacity",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Vehicle Color",
      visible: true,
      name: "vehicleColor",
      InputProps: { readOnly: true },
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} VehicleData={VehicleData} setVehicleData={setVehicleData} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default VehicleDetailsnew;
