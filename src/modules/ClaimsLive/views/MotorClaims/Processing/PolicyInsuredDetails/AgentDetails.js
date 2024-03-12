import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, AgentData, setAgentData }) {
  const AgentDataL = AgentData;
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
    AgentDataL.PolicyInsuredDetails.AgentDetails[e.target.name] = e.target.value;
    setAgentData((prev) => ({ ...prev, ...AgentDataL }));
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
                value={AgentData.PolicyInsuredDetails.AgentDetails[item.name]}
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

function AgentDetails() {
  const [AgentData, setAgentData] = useState(processingData);
  const controlItems = [
    { type: "Input", label: " Name", visible: true, name: "name", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Client ID",
      visible: true,
      name: "clientid",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Agent Code",
      visible: true,
      name: "agentcode",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Address 1",
      visible: true,
      name: "address1",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Address 2",
      visible: true,
      name: "address2",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Nearst Landmark",
      visible: true,
      name: "nearstlandmark",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "City", visible: true, name: "city", InputProps: { readOnly: true } },
    { type: "Input", label: "State", visible: true, name: "state", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Country",
      visible: true,
      name: "country",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "PinCode",
      visible: true,
      name: "pincode",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Email ID",
      visible: true,
      name: "emailID",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Contact Number",
      visible: true,
      name: "contactNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Intermediary Code",
      visible: true,
      name: "intermediarycode",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Intermediary Name",
      visible: true,
      name: "intermediaryname",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Intermediary Category",
      visible: true,
      name: "intermediarycategory",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Intermediary Branch",
      visible: true,
      name: "intermediarybranch",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Business Vertical",
      visible: true,
      name: "businessvertical",
      InputProps: { readOnly: true },
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} AgentData={AgentData} setAgentData={setAgentData} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default AgentDetails;
