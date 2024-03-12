import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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
function RenderControl({ item, setPreviouspolicyData, PreviouspolicyData }) {
  const PreviouspolicyDataL = PreviouspolicyData;
  const handleDateChange = (e, a) => {
    console.log("e", e, "a", a);

    if (typeof a === "string" && formatDate1(new Date(a))) {
      if (a.length >= 19)
        setPreviouspolicyData({ ...PreviouspolicyDataL, [item.name]: formatDate1(new Date(a)) });
    } else if (formatDate1(new Date(e))) {
      PreviouspolicyDataL.PolicyInsuredDetails.PreviousPolicydetails[item.name] = formatDate1(
        new Date(e)
      );
      setPreviouspolicyData((prev) => ({ ...prev, ...PreviouspolicyDataL }));
    } else setPreviouspolicyData({ ...PreviouspolicyDataL, [item.name]: null });
    console.log("PreviouspolicyDataL", PreviouspolicyDataL);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    console.log(value.mValue, type);
  };

  const handlechangeData = (e) => {
    PreviouspolicyDataL.PolicyInsuredDetails.PreviousPolicydetails[e.target.name] = e.target.value;
    setPreviouspolicyData((prev) => ({ ...prev, ...PreviouspolicyDataL }));
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
                value={PreviouspolicyDataL.PolicyInsuredDetails.PreviousPolicydetails[item.name]}
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
                  value={PreviouspolicyDataL.PolicyInsuredDetails.PreviousPolicydetails[item.name]}
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
                  value={PreviouspolicyDataL.PolicyInsuredDetails.PreviousPolicydetails[item.name]}
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

function PreviousPolicyDetails() {
  const [PreviouspolicyData, setPreviouspolicyData] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Previous Policy Cover type",
      visible: true,
      name: "previousPolicyCoverType",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "Previous Policy Number", visible: true, name: "previousPolicyNumber" },
    {
      type: "Date",
      label: "Previous Policy Start Date",
      visible: true,
      name: "previousPolicyStartDate",
      InputProps: { readOnly: true },
    },
    {
      type: "Date",
      label: "Previous Policy End Date",
      visible: true,
      name: "previousPolicyEndDate",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Policy Tenure",
      visible: true,
      name: "policyTenure",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "NCB % in Expriring Policy",
      visible: true,
      name: "nCBInExpiringPolicy",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Claim in Previous Policy",
      visible: true,
      name: "claimInPreviousPolicy",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Previous Insurer Name",
      visible: true,
      name: "previousInsurerName",
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
              PreviouspolicyData={PreviouspolicyData}
              setPreviouspolicyData={setPreviouspolicyData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default PreviousPolicyDetails;
