import { useState } from "react";
import { Accordion, AccordionDetails, Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";

function RenderControl({ item }) {
  //   const cashlossD = cashlossdata;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  //   const handlechange = (e) => {
  //     cashlossD.cashLossInfo[e.target.name] = e.target.value;
  //     setcashlossdata((prev) => ({ ...prev, ...cashlossD }));
  //   };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    // cashlossD.cashLossInfo[type] = value.mValue;
    // setcashlossdata({ ...cashlossD });
    // console.log("cashlossD", cashlossD);
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
                // value={cashlossD.cashLossInfo[item.name]}
                // onChange={handlechange}
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
                // value={{ mValue: cashlossD.cashLossInfo[item.name] }}
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

function Financiar() {
  //   const [cashlossdata, setcashlossdata] = useState(processingData);
  const totalLossItems = [
    { type: "AutoComplete", label: "Payee Type", visible: true },
    { type: "AutoComplete", label: "Payee Sub Type", visible: true },
    {
      type: "Input",
      label: "First Name",
      visible: true,
    },
    {
      type: "Input",
      label: "Middle Name",
      visible: true,
    },
    { type: "Input", label: "Last Name", visible: true },
    { type: "Input", label: "Payee Contact Number", visible: true },
    { type: "Input", label: "Account Holder Name", visible: true },
    { type: "Input", label: "Account Number", visible: true },
    { type: "Input", label: "Confirm Account Number", visible: true },
    { type: "AutoComplete", label: "Type Of Account", visible: true },
    { type: "Input", label: "IFSC Code", visible: true },
    { type: "Input", label: "Bank Name", visible: true },
    { type: "Input", label: "Adhaar Number", visible: true },
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
                  <RenderControl item={item} />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default Financiar;
