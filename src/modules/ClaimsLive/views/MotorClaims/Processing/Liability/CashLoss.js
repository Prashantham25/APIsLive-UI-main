import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { processingData } from "../data/JsonData";

function RenderControl({ item, cashlossdata, setcashlossdata }) {
  const cashlossD = cashlossdata;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  const handlechange = (e) => {
    cashlossD.cashLossInfo[e.target.name] = e.target.value;
    setcashlossdata((prev) => ({ ...prev, ...cashlossD }));
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    cashlossD.cashLossInfo[type] = value.mValue;
    setcashlossdata({ ...cashlossD });
    console.log("cashlossD", cashlossD);
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
                value={cashlossD.cashLossInfo[item.name]}
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
                value={{ mValue: cashlossD.cashLossInfo[item.name] }}
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

function CashLoss() {
  const [cashlossdata, setcashlossdata] = useState(processingData);
  const totalLossItems = [
    { type: "AutoComplete", label: "Add On policy", visible: true, name: "addOnPolicy" },
    {
      type: "Input",
      label: "Net Spares Cost after Depreciation",
      visible: true,
      name: "netSparesCost",
    },
    {
      type: "Input",
      label: "Paint Material after Depreciation",
      visible: true,
      name: "paintMaterial",
    },
    { type: "Input", label: "Salvage Of Spares", visible: true, name: "salvageSpares" },
    { type: "Input", label: "Labour Without GST", visible: true, name: "labourGst" },
    { type: "Input", label: "Cashloss Margin %", visible: true, name: "marginPercent" },
    { type: "Input", label: "Cashloss Margin Value", visible: true, name: "marginValue" },
    { type: "Input", label: "Cash Loss Amount", visible: true, name: "cashLossAmt" },
    { type: "Input", label: "Towing Charges", visible: true, name: "towingCharges" },
    { type: "Input", label: "Compulsory Excess", visible: true, name: "cumpulsoryExcess" },
    { type: "Input", label: "Voluntory Excess*", visible: true, name: "voluntaryAccess" },
    { type: "Input", label: "Additional excess", visible: false, name: "additional" },
    { type: "Input", label: "Total Payable Amount (Rs.)", visible: true, name: "totalPayable" },
  ];
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderBottom: 1, borderColor: "primary.main" }}
        >
          <MDTypography color="primary">Cash Loss Assessment</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            {totalLossItems.map((item) =>
              item.visible ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl
                    item={item}
                    cashlossdata={cashlossdata}
                    setcashlossdata={setcashlossdata}
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
export default CashLoss;
