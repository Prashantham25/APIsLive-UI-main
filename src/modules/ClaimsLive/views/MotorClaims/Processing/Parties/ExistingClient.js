import { useState } from "react";
import { Accordion, AccordionDetails, Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import { processingData } from "../data/JsonData";

function RenderControl({ item, clientdata, setclientdata }) {
  const clientD = clientdata;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  const handlechange = (e) => {
    clientD.SerachExistingclient[e.target.name] = e.target.value;
    setclientdata((prev) => ({ ...prev, ...clientD }));
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    clientD.SerachExistingclient[type] = value.mValue;
    setclientdata({ ...clientD });
    console.log("clientD", clientD);
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
                value={clientD.SerachExistingclient[item.name]}
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
                value={{ mValue: clientD.SerachExistingclient[item.name] }}
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

function ExistingClient() {
  const [clientdata, setclientdata] = useState(processingData);
  const totalLossItems = [
    { type: "AutoComplete", label: "Payee Type", visible: true, name: "payeeType" },
    {
      type: "Input",
      label: "Client ID",
      visible: true,
      name: "clientID",
    },
    {
      type: "Input",
      label: "Name",
      visible: true,
      name: "name",
    },
    { type: "Input", label: "Mobile Number", visible: true, name: "mobileNo" },
  ];
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        {/* <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderBottom: 1, borderColor: "primary.main" }}
        /> */}
        <AccordionDetails>
          <Grid container spacing={1.5}>
            {totalLossItems.map((item) =>
              item.visible ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl
                    item={item}
                    clientdata={clientdata}
                    setclientdata={setclientdata}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default ExistingClient;
