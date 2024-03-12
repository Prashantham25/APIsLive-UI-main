import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, UpdatedUserData, setUpdatedUserData }) {
  const UpdatedUserDataL = UpdatedUserData;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  // const ComboValue = [
  //   { mID: 1, mValue: "Option1" },
  //   { mID: 2, mValue: "Option2" },
  // ];

  const handleSetAutoComplete = (e, type, value) => {
    UpdatedUserDataL.UpdateInsuredContactDetails[type] = value.mValue;
    setUpdatedUserData({ ...UpdatedUserDataL });
    console.log(value.mValue, type);
  };

  const handlechangeData = (e) => {
    UpdatedUserDataL.UpdateInsuredContactDetails[e.target.name] = e.target.value;
    setUpdatedUserData((prev) => ({ ...prev, ...UpdatedUserDataL }));
    console.log("UpdatedUserDataL", UpdatedUserDataL);
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
                value={UpdatedUserDataL.UpdateInsuredContactDetails[item.name]}
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
                options={item.options}
                // groupBy={(option) => option.firstLetter}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                getOptionLabel={(option) => option.mValue}
                value={{ mValue: UpdatedUserDataL.UpdateInsuredContactDetails[item.name] }}
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
function IntimationDetails() {
  const [UpdatedUserData, setUpdatedUserData] = useState(processingData);
  const Areaddl = [
    { mID: 1, mValue: "Bhubaneswar" },
    { mID: 2, mValue: "Jaydev Vihar" },
  ];
  const controlItems = [
    { type: "Input", label: "Insured Email Id", visible: true, name: "insuredEmailId" },
    { type: "Input", label: "Costumer Mobile Number", visible: true, name: "costumerMobileNumber" },
    {
      type: "Input",
      label: "Costumer Alternate Mobile number",
      visible: true,
      name: "costumerAlternateMobileNumber",
    },
    { type: "Input", label: "Insured Email Id*", visible: true, name: "insuredEmailIdnew" },
    { type: "Input", label: "Insured address*", visible: true, name: "insuredaddress" },
    { type: "Input", label: "Pin Code*", visible: true, name: "pinCode" },
    { type: "AutoComplete", label: "Area", visible: true, name: "area", options: Areaddl },
    { type: "Input", label: "Landmark", visible: true, name: "landmark" },
    { type: "Input", label: "City", visible: true, name: "city", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "District",
      visible: true,
      name: "district",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "State", visible: true, name: "state", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Country",
      visible: true,
      name: "country",
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
              UpdatedUserData={UpdatedUserData}
              setUpdatedUserData={setUpdatedUserData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default IntimationDetails;
