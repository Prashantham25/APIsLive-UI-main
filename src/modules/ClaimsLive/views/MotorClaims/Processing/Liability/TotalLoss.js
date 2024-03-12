import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
// import { FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import { processingData } from "../data/JsonData";

function RenderControl({ item }) {
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];
  // const handlechange = (e) => {
  //   totallossD.TotalLossInfo[e.target.name] = e.target.value;
  //   settotallossdata((prev) => ({ ...prev, ...totallossD }));
  //   console.log("totallossdata", totallossD);
  // };

  const handleSetAutoComplete = (e, type, value) => {
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
                value={item.value}
                onChange={item.onchange}
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

function TotalLoss() {
  const [totallossdata, settotallossdata] = useState(processingData);
  const handlechange1 = (e) => {
    totallossdata.TotalLossInfo[e.target.name] = e.target.value;
    settotallossdata((prev) => ({ ...prev, ...totallossdata }));
    console.log("totallossdata", totallossdata);
  };
  const handlechange2 = (e) => {
    totallossdata.TotalLossDeductions[e.target.name] = e.target.value;
    settotallossdata((prev) => ({ ...prev, ...totallossdata }));
    console.log("totallossdata", totallossdata);
  };
  const totalLossItems = [
    { type: "AutoComplete", label: "RTI", visible: true },
    {
      type: "Input",
      label: "Ex Showroom Value",
      visible: true,
      name: "exshowroomvalue",
      value: totallossdata.TotalLossInfo.exshowroomvalue,
      onchange: handlechange1,
    },
    {
      type: "Input",
      label: "Registration Charges",
      visible: true,
      name: "registrationcharges",
      value: totallossdata.TotalLossInfo.registrationcharges,
      onchange: handlechange1,
    },
    {
      type: "Input",
      label: "Road Tax",
      visible: true,
      name: "roadtax",
      value: totallossdata.TotalLossInfo.roadtax,
      onchange: handlechange1,
    },
    {
      type: "Input",
      label: "Others",
      visible: true,
      name: "others",
      value: totallossdata.TotalLossInfo.others,
      onchange: handlechange1,
    },
    {
      type: "Input",
      label: "Invoice price*",
      visible: true,
      name: "invoicePrice",
      value: totallossdata.TotalLossInfo.invoicePrice,
      onchange: handlechange1,
    },
    {
      type: "Input",
      label: "Current price*",
      visible: true,
      name: "currentprice",
      value: totallossdata.TotalLossInfo.currentprice,
      onchange: handlechange1,
    },
    {
      type: "Input",
      label: "IDV",
      visible: true,
      name: "idv",
      value: totallossdata.TotalLossInfo.idv,
      onchange: handlechange1,
    },
    {
      type: "Input",
      label: "RTI Addon amount",
      visible: true,
      name: "rtiAddon",
      value: totallossdata.TotalLossInfo.rtiAddon,
      onchange: handlechange1,
    },
    {
      type: "Input",
      label: "Non Standard deduction %",
      visible: true,
      name: "nonStandardDeduction",
      value: totallossdata.TotalLossInfo.nonStandardDeduction,
      onchange: handlechange1,
    },
    {
      type: "Input",
      label: "Non standard settlement amount",
      visible: true,
      name: "nonStandardSettlement",
      value: totallossdata.TotalLossInfo.nonStandardSettlement,
      onchange: handlechange1,
    },
  ];
  const deductionsItems = [
    {
      type: "Input",
      label: "Compulsory Excess",
      visible: true,
      name: "compulsory",
      value: totallossdata.TotalLossDeductions.compulsory,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Voluntary excess*",
      visible: true,
      name: "voluntary",
      value: totallossdata.TotalLossDeductions.voluntary,
      onchange: handlechange2,
    },
    { type: "AutoComplete", label: "Whether salvage retained by Insured?", visible: true },
    {
      type: "Input",
      label: "Salvage Value",
      visible: true,
      name: "salvagevalue",
      value: totallossdata.TotalLossDeductions.salvagevalue,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Additional excess",
      visible: false,
      name: "additional",
      value: totallossdata.TotalLossDeductions.additional,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Total payable amount",
      visible: true,
      name: "totalPayable",
      value: totallossdata.TotalLossDeductions.totalPayable,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Remarks",
      visible: true,
      name: "remarks",
      value: totallossdata.TotalLossDeductions.remarks,
      onchange: handlechange2,
    },
  ];
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <RadioGroup row>
            <FormControlLabel value="withRC" control={<Radio />} label="With RC" />
            <FormControlLabel value="WithoutRc" control={<Radio />} label="Without RC" />
          </RadioGroup>
        </Stack>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderBottom: 1, borderColor: "primary.main" }}
        >
          {/* <MDTypography color="primary">Total Loss</MDTypography> */}
          <MDTypography color="primary" />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            {totalLossItems.map((item) =>
              item.visible ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl
                    item={item}
                    totallossdata={totallossdata}
                    settotallossdata={settotallossdata}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderBottom: 1, borderColor: "primary.main" }}
        >
          <MDTypography color="primary">Deductions</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            {deductionsItems.map((item) =>
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
export default TotalLoss;
